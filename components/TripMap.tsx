"use client";

import { useCallback, useEffect, useRef } from "react";
import * as d3 from "d3-geo";
import { line } from "d3-shape";
import { feature } from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";
import type { Trip, Leg, Stop, TransportMode } from "@/data/types";

const MODE_COLOR: Record<TransportMode, string> = {
  flight: "#D85A30",
  bus: "#1D9E75",
  train: "#1D9E75",
  ferry: "#1D9E75",
  car: "#6366F1",
};
const UPCOMING_COLOR = "#888780";
const PAD = 24;

interface XForm { x: number; y: number; k: number }
interface Props { trip: Trip; width?: number; height?: number }

function getLegColor(leg: Leg): string {
  return leg.upcoming ? UPCOMING_COLOR : MODE_COLOR[leg.mode];
}
function getStopCoords(name: string, stops: Stop[]): [number, number] | null {
  return stops.find((s) => s.name === name)?.coords ?? null;
}
function hasReturn(leg: Leg, legs: Leg[]): boolean {
  return legs.some((l) => l.number !== leg.number && l.from === leg.to && l.to === leg.from);
}
function offsetPoint(p: [number, number], dir: [number, number], offset: number): [number, number] {
  const len = Math.sqrt(dir[0] ** 2 + dir[1] ** 2);
  if (len === 0) return p;
  const perp: [number, number] = [-dir[1] / len, dir[0] / len];
  return [p[0] + perp[0] * offset, p[1] + perp[1] * offset];
}
function appendEl(parent: Element, tag: string, attrs: Record<string, string>): SVGElement {
  const el = document.createElementNS("http://www.w3.org/2000/svg", tag);
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  parent.appendChild(el);
  return el as SVGElement;
}

export default function TripMap({ trip, width = 430, height = 640 }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const gRef  = useRef<SVGGElement | null>(null);
  const xf    = useRef<XForm>({ x: 0, y: 0, k: 1 });

  // ── transform helpers ──────────────────────────────────────────────────────

  const applyXf = useCallback(() => {
    if (!gRef.current) return;
    const { x, y, k } = xf.current;
    gRef.current.setAttribute("transform", `translate(${x},${y}) scale(${k})`);
  }, []);

  const zoomAt = useCallback((factor: number, cx: number, cy: number) => {
    const { x, y, k } = xf.current;
    const newK = Math.min(Math.max(k * factor, 1), 14);
    const f = newK / k;
    xf.current = { x: cx - (cx - x) * f, y: cy - (cy - y) * f, k: newK };
    applyXf();
  }, [applyXf]);

  const zoomCenter = useCallback((factor: number) => {
    zoomAt(factor, width / 2, height / 2);
  }, [zoomAt, width, height]);

  const resetXf = useCallback(() => {
    xf.current = { x: 0, y: 0, k: 1 };
    applyXf();
  }, [applyXf]);

  // ── pointer / wheel events ─────────────────────────────────────────────────

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    let dragging = false;
    let lx = 0, ly = 0;
    let pinchDist0 = 0, pinchK0 = 1;

    // Convert client coords → SVG viewBox coords
    const toSvg = (cx: number, cy: number): [number, number] => {
      const r = svg.getBoundingClientRect();
      return [(cx - r.left) * (width / r.width), (cy - r.top) * (height / r.height)];
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const [mx, my] = toSvg(e.clientX, e.clientY);
      zoomAt(e.deltaY < 0 ? 1.25 : 1 / 1.25, mx, my);
    };

    const onMouseDown = (e: MouseEvent) => {
      if (e.button !== 0) return;
      dragging = true; lx = e.clientX; ly = e.clientY;
      svg.style.cursor = "grabbing";
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!dragging) return;
      const [nx, ny] = toSvg(e.clientX, e.clientY);
      const [ox, oy] = toSvg(lx, ly);
      xf.current = { ...xf.current, x: xf.current.x + nx - ox, y: xf.current.y + ny - oy };
      lx = e.clientX; ly = e.clientY;
      applyXf();
    };
    const onMouseUp = () => { dragging = false; svg.style.cursor = "grab"; };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        pinchDist0 = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        pinchK0 = xf.current.k;
      } else {
        dragging = true;
        lx = e.touches[0].clientX; ly = e.touches[0].clientY;
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      if (e.touches.length === 2) {
        const dist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        const mcx = (e.touches[0].clientX + e.touches[1].clientX) / 2;
        const mcy = (e.touches[0].clientY + e.touches[1].clientY) / 2;
        const [cmx, cmy] = toSvg(mcx, mcy);
        const targetK = Math.min(Math.max(pinchK0 * (dist / pinchDist0), 1), 14);
        const f = targetK / xf.current.k;
        xf.current = { x: cmx - (cmx - xf.current.x) * f, y: cmy - (cmy - xf.current.y) * f, k: targetK };
        applyXf();
      } else if (dragging && e.touches.length === 1) {
        const [nx, ny] = toSvg(e.touches[0].clientX, e.touches[0].clientY);
        const [ox, oy] = toSvg(lx, ly);
        xf.current = { ...xf.current, x: xf.current.x + nx - ox, y: xf.current.y + ny - oy };
        lx = e.touches[0].clientX; ly = e.touches[0].clientY;
        applyXf();
      }
    };
    const onTouchEnd = () => { dragging = false; };

    svg.addEventListener("wheel", onWheel, { passive: false });
    svg.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    svg.addEventListener("touchstart", onTouchStart, { passive: true });
    svg.addEventListener("touchmove", onTouchMove, { passive: false });
    svg.addEventListener("touchend", onTouchEnd);
    svg.style.cursor = "grab";

    return () => {
      svg.removeEventListener("wheel", onWheel);
      svg.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      svg.removeEventListener("touchstart", onTouchStart);
      svg.removeEventListener("touchmove", onTouchMove);
      svg.removeEventListener("touchend", onTouchEnd);
    };
  }, [width, height, zoomAt, applyXf]);

  // ── drawing ────────────────────────────────────────────────────────────────

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    xf.current = { x: 0, y: 0, k: 1 };

    const draw = async () => {
      const topo = (await fetch(
        "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json"
      ).then((r) => r.json())) as Topology;

      const countries = feature(topo, topo.objects.countries as GeometryCollection);
      const [[minLon, minLat], [maxLon, maxLat]] = trip.bounds;

      const projection = d3.geoMercator().fitExtent(
        [[PAD, PAD], [width - PAD, height - PAD]],
        { type: "MultiPoint", coordinates: [[minLon, minLat], [maxLon, maxLat]] }
      );
      const pathGen = d3.geoPath().projection(projection);

      while (svg.firstChild) svg.removeChild(svg.firstChild);
      gRef.current = null;

      const clipId = `mc-${Math.random().toString(36).slice(2, 8)}`;
      const defs = appendEl(svg, "defs", {});
      const clip = appendEl(defs, "clipPath", { id: clipId });
      appendEl(clip, "rect", { width: String(width), height: String(height) });

      appendEl(svg, "rect", { width: String(width), height: String(height), class: "map-ocean" });

      const g = appendEl(svg, "g", { "clip-path": `url(#${clipId})` }) as SVGGElement;
      gRef.current = g;

      // Land
      (countries.features as GeoJSON.Feature[]).forEach((feat) => {
        const [[x0, y0], [x1, y1]] = pathGen.bounds(feat);
        if (x1 < 0 || x0 > width || y1 < 0 || y0 > height) return;
        const d = pathGen(feat);
        if (!d) return;
        appendEl(g, "path", { d, class: "map-land" });
      });

      const straightLine = line<[number, number]>().x((d) => d[0]).y((d) => d[1]);
      const isOnMap = (name: string) => trip.stops.some((s) => s.name === name);

      function drawBadge(parent: Element, x: number, y: number, num: number, color: string) {
        appendEl(parent, "circle", { cx: String(x), cy: String(y), r: "10", fill: color, opacity: "0.9" });
        const t = appendEl(parent, "text", {
          x: String(x), y: String(y + 4),
          "text-anchor": "middle", "font-size": "9", "font-weight": "700", fill: "white",
        });
        t.textContent = String(num);
      }

      // Origin legs: arc in from right edge
      trip.legs.filter((leg) => !isOnMap(leg.from)).forEach((leg) => {
        const toCoords = getStopCoords(leg.to, trip.stops);
        if (!toCoords) return;
        const toPx = projection(toCoords) as [number, number];
        if (!toPx) return;
        const color = getLegColor(leg);
        const ex = width - PAD;
        const ey = toPx[1];
        const cx = (ex + toPx[0]) / 2;
        const cy = Math.min(ey, toPx[1]) - 24;
        appendEl(g, "path", {
          fill: "none", stroke: color, "stroke-width": "2", "stroke-dasharray": "6 3",
          d: `M ${ex} ${ey} Q ${cx} ${cy} ${toPx[0]} ${toPx[1]}`,
        });
        drawBadge(g, cx, cy + 14, leg.number, color);
        const lbl = appendEl(g, "text", {
          x: String(ex - 6), y: String(ey - 10),
          "font-size": "9", "text-anchor": "end", class: "map-label-muted",
        });
        lbl.textContent = `✈ from ${leg.from}`;
      });

      // Normal legs
      trip.legs.filter((leg) => isOnMap(leg.from)).forEach((leg) => {
        const fromCoords = getStopCoords(leg.from, trip.stops);
        const toCoords   = getStopCoords(leg.to,   trip.stops);
        if (!fromCoords || !toCoords) return;
        const fromPx = projection(fromCoords) as [number, number];
        const toPx   = projection(toCoords)   as [number, number];
        if (!fromPx || !toPx) return;

        const color = getLegColor(leg);
        const isRet = hasReturn(leg, trip.legs);
        const dir: [number, number] = [toPx[0] - fromPx[0], toPx[1] - fromPx[1]];
        const aFrom = isRet ? offsetPoint(fromPx, dir, 4) : fromPx;
        const aTo   = isRet ? offsetPoint(toPx,   dir, 4) : toPx;

        let d = "";
        if (leg.mode === "flight") {
          const mx = (aFrom[0] + aTo[0]) / 2;
          const my = (aFrom[1] + aTo[1]) / 2;
          const len = Math.sqrt(dir[0] ** 2 + dir[1] ** 2);
          const perp: [number, number] = [-dir[1] / len, dir[0] / len];
          d = `M ${aFrom[0]} ${aFrom[1]} Q ${mx + perp[0] * len * 0.18} ${my + perp[1] * len * 0.18} ${aTo[0]} ${aTo[1]}`;
        } else {
          d = straightLine([aFrom, aTo]) ?? "";
        }
        if (!d) return;

        const dash = leg.upcoming ? "4 4" : leg.mode === "flight" ? "6 3" : "none";
        const attrs: Record<string, string> = { fill: "none", stroke: color, "stroke-width": "2", d };
        if (dash !== "none") attrs["stroke-dasharray"] = dash;
        appendEl(g, "path", attrs);

        drawBadge(g, (aFrom[0] + aTo[0]) / 2, (aFrom[1] + aTo[1]) / 2, leg.number, color);
      });

      // City dots + labels
      trip.stops.forEach((stop) => {
        const px = projection(stop.coords);
        if (!px) return;
        const [dx, dy] = stop.labelOffset ?? [8, 4];
        const anchor   = stop.labelAnchor  ?? "start";
        appendEl(g, "circle", { cx: String(px[0]), cy: String(px[1]), r: "4", class: "map-city-dot" });
        const lbl = appendEl(g, "text", {
          x: String(px[0] + dx), y: String(px[1] + dy),
          "font-size": "11", "font-weight": "700", "text-anchor": anchor, class: "map-label",
        });
        lbl.textContent = stop.name;
      });
    };

    draw();
  }, [trip, width, height]);

  // ── render ─────────────────────────────────────────────────────────────────

  const btn = [
    "w-7 h-7 rounded-lg flex items-center justify-center",
    "bg-white/85 dark:bg-gray-800/85 backdrop-blur-sm",
    "border border-gray-200 dark:border-gray-600",
    "text-sm font-bold text-gray-700 dark:text-gray-200",
    "hover:bg-gray-100 dark:hover:bg-gray-700",
    "shadow-sm transition-colors",
  ].join(" ");

  return (
    <div className="relative select-none">
      <svg
        ref={svgRef}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="rounded-xl overflow-hidden w-full h-auto [touch-action:none]"
      />
      <div className="absolute bottom-3 right-3 flex flex-col gap-1">
        <button onClick={() => zoomCenter(1.5)}  className={btn} aria-label="Zoom in">+</button>
        <button onClick={resetXf}                className={btn} aria-label="Reset">↺</button>
        <button onClick={() => zoomCenter(1/1.5)} className={btn} aria-label="Zoom out">−</button>
      </div>
    </div>
  );
}

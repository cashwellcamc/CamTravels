import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";
import { createReadStream, existsSync } from "fs";
import { join, extname } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const ESRI_ASSETS_DIR = join(__dirname, "node_modules/@arcgis/core/assets");

const MIME: Record<string, string> = {
  ".wasm": "application/wasm",
  ".css":  "text/css; charset=utf-8",
  ".js":   "application/javascript",
  ".pbf":  "application/x-protobuf",
  ".ttf":  "font/ttf",
  ".woff": "font/woff",
  ".woff2":"font/woff2",
  ".png":  "image/png",
  ".json": "application/json",
  ".svg":  "image/svg+xml",
};

export default defineConfig({
  plugins: [
    react(),

    // Dev-server middleware: serve ESRI assets from node_modules with correct MIME types.
    // Must come BEFORE viteStaticCopy so the request never reaches Vite's SPA fallback.
    {
      name: "esri-assets-dev",
      apply: "serve",
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const url = req.url ?? "";
          if (!url.startsWith("/assets/")) return next();

          const rel  = url.replace("/assets/", "");
          const file = join(ESRI_ASSETS_DIR, rel.split("?")[0]);

          if (!existsSync(file)) return next();

          const mime = MIME[extname(file)] ?? "application/octet-stream";
          res.setHeader("Content-Type", mime);
          res.setHeader("Cache-Control", "public, max-age=86400");
          createReadStream(file).pipe(res);
        });
      },
    },

    // Build: copy assets into the dist folder so the app works after `vite build`
    viteStaticCopy({
      targets: [{ src: "node_modules/@arcgis/core/assets", dest: "./" }],
    }),
  ],

  server: { port: 5173 },

  // @arcgis/core uses its own module resolution — exclude from Vite's pre-bundler
  // so the browser doesn't stall on first load while Vite tries to analyse it
  optimizeDeps: {
    exclude: ["@arcgis/core"],
  },
});

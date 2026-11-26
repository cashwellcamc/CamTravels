import React from "react";
import ReactDOM from "react-dom/client";
import esriConfig from "@arcgis/core/config";
import "./App.css";
import App from "./App";

// Point ESRI SDK at the copied assets directory (workers, fonts, images, etc.)
esriConfig.assetsPath = "/assets";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

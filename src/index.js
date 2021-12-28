import React from "react";
import { render } from "react-dom";
import { PermissionProvider } from "./components/PermissionContext";
import App from "./components/App";


render(
  <PermissionProvider>
    <App />
  </PermissionProvider>,
  document.getElementById("root")
);

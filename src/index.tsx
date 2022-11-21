import { StrictMode } from "react";
import * as ReactDOMClient from "react-dom/client";

import App from "./app";
import "./index.css";

if (process.env.NODE_ENV === "development") {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require("./mocks");
}

const rootElement = document.getElementById("root")!;
const root = ReactDOMClient.createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

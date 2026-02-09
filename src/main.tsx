import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Theme } from "@radix-ui/themes";
import App from "./App";

import "@radix-ui/themes/styles.css";
import "./styles/index.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
    throw new Error("Root element #root not found");
}

createRoot(rootElement).render(
    <StrictMode>
        <Theme className="h-screen" appearance="dark">
            <App />
        </Theme>
    </StrictMode>,
);

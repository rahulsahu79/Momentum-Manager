import { ThemeProvider } from "next-themes";
import ReactDOM from "react-dom/client";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";   // ✅ this is required


ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <ThemeProvider attribute="class" defaultTheme="light">
                <App />
            </ThemeProvider>
        </BrowserRouter>
    </React.StrictMode>
);

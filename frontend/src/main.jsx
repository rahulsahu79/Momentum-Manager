import { ThemeProvider } from "next-themes";
import ReactDOM from "react-dom/client";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ToastContainer } from "react-toastify";

import "./index.css";   // ✅ this is required


ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <ThemeProvider attribute="class" defaultTheme="light">
                <App />
                <ToastContainer position="top-right" autoClose={3000} />

            </ThemeProvider>
        </BrowserRouter>
    </React.StrictMode>
);

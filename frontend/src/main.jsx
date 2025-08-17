import { ThemeProvider } from "next-themes";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <ThemeProvider attribute="class" defaultTheme="light">
                <App />
            </ThemeProvider>
        </BrowserRouter>
    </React.StrictMode>
);

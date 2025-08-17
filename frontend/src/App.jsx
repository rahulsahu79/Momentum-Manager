import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/Login";
import SignUpPage from "./pages/Signup";
import DashboardPage from "./pages/Dashboard";

export default function App() {
    return (
        <Routes>
            {/* Default route -> Login */}
            <Route path="/" element={<Navigate to="/login" />} />

            {/* Pages */}
            <Route path="/login" element={<LoginPage />} />
            
            <Route path="/signup" element={<SignUpPage />} />

            {/* 404 fallback */}
            <Route path="*" element={<h1 className="text-center mt-10">404 Not Found</h1>} />
        </Routes>
    );
}

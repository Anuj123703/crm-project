import { useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async () => {
        if (!email || !password) {
            setError("⚠️ Email and Password required");
            return;
        }

        try {
            setLoading(true);

            const res = await api.post("/auth/login", {
                email,
                password
            });

            login(res.data);
            navigate("/dashboard");

        } catch (err) {
            setError("❌ Invalid credentials");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center 
                        bg-gradient-to-br from-blue-100 to-gray-200 
                        dark:from-gray-900 dark:to-black transition-all duration-300">

            <div className="w-full max-w-md p-8 rounded-2xl shadow-2xl 
                            bg-white dark:bg-gray-900 
                            border border-gray-200 dark:border-gray-700">

                {/* HEADER */}
                <h2 className="text-3xl font-bold text-center mb-6 
                               text-gray-800 dark:text-white">
                    Welcome Back 👋
                </h2>

                {/* ERROR */}
                {error && (
                    <p className="mb-3 text-center text-red-500 text-sm">
                        {error}
                    </p>
                )}

                {/* EMAIL */}
                <input
                    className="w-full p-3 mb-3 rounded-lg border 
                               focus:ring-2 focus:ring-blue-500 outline-none
                               dark:bg-gray-800 dark:text-white"
                    placeholder="Email Address"
                    onChange={e => setEmail(e.target.value)}
                />

                {/* PASSWORD */}
                <input
                    type="password"
                    className="w-full p-3 mb-4 rounded-lg border 
                               focus:ring-2 focus:ring-blue-500 outline-none
                               dark:bg-gray-800 dark:text-white"
                    placeholder="Password"
                    onChange={e => setPassword(e.target.value)}
                />

                {/* BUTTON */}
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full p-3 rounded-lg text-white font-semibold
                               bg-gradient-to-r from-blue-500 to-indigo-600
                               hover:opacity-90 transition-all duration-300"
                >
                    {loading ? "Signing in..." : "Login"}
                </button>

                {/* REGISTER LINK */}
                <p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
                    Don’t have an account?{" "}
                    <Link
                        to="/register"
                        className="text-blue-600 hover:underline"
                    >
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    );
}
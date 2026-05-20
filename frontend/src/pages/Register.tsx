import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("Sales User");
    const [name, setName] = useState("");
    const [msg, setMsg] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        if (!name || !email || !password) {
            setMsg("⚠️ All fields are required");
            return;
        }

        try {
            setLoading(true);

            await api.post("/auth/register", {
                name,
                email,
                password,
                role
            });

            setMsg("✅ User registered successfully");

            setTimeout(() => {
                navigate("/");
            }, 1000);

        } catch (err) {
            setMsg("❌ Registration failed");
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
                            backdrop-blur-lg border border-gray-200 dark:border-gray-700">

                {/* HEADER */}
                <h2 className="text-3xl font-bold text-center mb-6 
                               text-gray-800 dark:text-white">
                    Create Account 🚀
                </h2>

                {/* NAME */}
                <input
                    className="w-full p-3 mb-3 rounded-lg border 
                               focus:ring-2 focus:ring-blue-500 outline-none
                               dark:bg-gray-800 dark:text-white"
                    placeholder="Full Name"
                    onChange={(e) => setName(e.target.value)}
                />

                {/* EMAIL */}
                <input
                    className="w-full p-3 mb-3 rounded-lg border 
                               focus:ring-2 focus:ring-blue-500 outline-none
                               dark:bg-gray-800 dark:text-white"
                    placeholder="Email Address"
                    onChange={(e) => setEmail(e.target.value)}
                />

                {/* PASSWORD */}
                <input
                    type="password"
                    className="w-full p-3 mb-3 rounded-lg border 
                               focus:ring-2 focus:ring-blue-500 outline-none
                               dark:bg-gray-800 dark:text-white"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                {/* ROLE */}
                <select
                    className="w-full p-3 mb-4 rounded-lg border 
                               focus:ring-2 focus:ring-blue-500 outline-none
                               dark:bg-gray-800 dark:text-white"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                >
                    <option value="Admin">Admin</option>
                    <option value="Sales User">Sales User</option>
                </select>

                {/* BUTTON */}
                <button
                    onClick={handleRegister}
                    disabled={loading}
                    className="w-full p-3 rounded-lg text-white font-semibold
                               bg-gradient-to-r from-green-500 to-blue-600
                               hover:opacity-90 transition-all duration-300"
                >
                    {loading ? "Creating..." : "Register"}
                </button>

                {/* MESSAGE */}
                {msg && (
                    <p className="mt-4 text-center text-sm 
                                  text-gray-600 dark:text-gray-300">
                        {msg}
                    </p>
                )}

                {/* LOGIN LINK */}
                <p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
                    Already have an account?{" "}
                    <span
                        onClick={() => navigate("/")}
                        className="text-blue-600 cursor-pointer hover:underline"
                    >
                        Login
                    </span>
                </p>
            </div>
        </div>
    );
}
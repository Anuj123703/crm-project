import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function CreateLead() {
    const navigate = useNavigate();
    const { darkMode } = useTheme();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("New");
    const [source, setSource] = useState("Website");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        try {
            setLoading(true);

            await api.post("/leads", {
                name,
                email,
                status,
                source
            });

            navigate("/dashboard");
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`min-h-screen flex items-center justify-center px-4 ${darkMode ? "bg-[#0f172a] text-white" : "bg-gray-100"}`}>

            {/* CARD */}
            <div className={`w-full max-w-md p-6 rounded-2xl shadow-xl ${darkMode ? "bg-[#1e293b]" : "bg-white"}`}>

                {/* HEADER */}
                <h2 className="text-2xl font-bold text-center mb-1">
                    Create New Lead
                </h2>
                <p className="text-center text-sm opacity-70 mb-6">
                    Add a new lead to your CRM
                </p>

                {/* NAME */}
                <div className="mb-3">
                    <label className="text-sm opacity-70">Name</label>
                    <input
                        className="w-full mt-1 p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                {/* EMAIL */}
                <div className="mb-3">
                    <label className="text-sm opacity-70">Email</label>
                    <input
                        className="w-full mt-1 p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                {/* STATUS */}
                <div className="mb-3">
                    <label className="text-sm opacity-70">Status</label>
                    <select
                        className="w-full mt-1 p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Qualified">Qualified</option>
                        <option value="Lost">Lost</option>
                    </select>
                </div>

                {/* SOURCE */}
                <div className="mb-5">
                    <label className="text-sm opacity-70">Source</label>
                    <select
                        className="w-full mt-1 p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={source}
                        onChange={(e) => setSource(e.target.value)}
                    >
                        <option value="Website">Website</option>
                        <option value="Instagram">Instagram</option>
                        <option value="Referral">Referral</option>
                    </select>
                </div>

                {/* BUTTON */}
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-medium transition"
                >
                    {loading ? "Creating..." : "Create Lead"}
                </button>

                {/* BACK */}
                <button
                    onClick={() => navigate("/dashboard")}
                    className="w-full mt-4 text-sm opacity-70 hover:opacity-100"
                >
                    ← Back to Dashboard
                </button>
            </div>
        </div>
    );
}
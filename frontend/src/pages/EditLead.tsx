import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

export default function EditLead() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("New");
    const [source, setSource] = useState("Website");
    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(true);

    useEffect(() => {
        const fetchLead = async () => {
            try {
                const res = await api.get(`/leads/${id}`);
                const lead = res.data;

                setName(lead.name);
                setEmail(lead.email);
                setStatus(lead.status);
                setSource(lead.source);
            } catch (err) {
                console.log(err);
            } finally {
                setFetchLoading(false);
            }
        };

        fetchLead();
    }, [id]);

    const handleUpdate = async () => {
        try {
            setLoading(true);

            await api.put(`/leads/${id}`, {
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

    if (fetchLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center 
                            dark:bg-black bg-gray-100">
                <p className="text-lg text-gray-600 dark:text-gray-300">
                    Loading lead...
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4
                        bg-gradient-to-br from-blue-100 to-gray-200
                        dark:from-gray-900 dark:to-black transition-all">

            <div className="w-full max-w-md p-8 rounded-2xl shadow-2xl
                            bg-white dark:bg-gray-900
                            border border-gray-200 dark:border-gray-700">

                {/* HEADER */}
                <h2 className="text-3xl font-bold text-center mb-6
                               text-gray-800 dark:text-white">
                    ✏️ Edit Lead
                </h2>

                {/* NAME */}
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 mb-3 rounded-lg border
                               focus:ring-2 focus:ring-blue-500 outline-none
                               dark:bg-gray-800 dark:text-white"
                    placeholder="Full Name"
                />

                {/* EMAIL */}
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 mb-3 rounded-lg border
                               focus:ring-2 focus:ring-blue-500 outline-none
                               dark:bg-gray-800 dark:text-white"
                    placeholder="Email Address"
                />

                {/* STATUS */}
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full p-3 mb-3 rounded-lg border
                               focus:ring-2 focus:ring-blue-500 outline-none
                               dark:bg-gray-800 dark:text-white"
                >
                    <option value="New">🆕 New</option>
                    <option value="Contacted">📞 Contacted</option>
                    <option value="Qualified">✅ Qualified</option>
                    <option value="Lost">❌ Lost</option>
                </select>

                {/* SOURCE */}
                <select
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                    className="w-full p-3 mb-5 rounded-lg border
                               focus:ring-2 focus:ring-blue-500 outline-none
                               dark:bg-gray-800 dark:text-white"
                >
                    <option value="Website">🌐 Website</option>
                    <option value="Instagram">📸 Instagram</option>
                    <option value="Referral">👥 Referral</option>
                </select>

                {/* BUTTONS */}
                <div className="flex gap-3">

                    <button
                        onClick={() => navigate("/dashboard")}
                        className="w-1/2 py-3 rounded-lg
                                   bg-gray-200 dark:bg-gray-700
                                   text-gray-700 dark:text-white
                                   hover:opacity-90"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleUpdate}
                        disabled={loading}
                        className="w-1/2 py-3 rounded-lg text-white font-semibold
                                   bg-gradient-to-r from-blue-500 to-indigo-600
                                   hover:opacity-90 transition"
                    >
                        {loading ? "Updating..." : "Update"}
                    </button>

                </div>
            </div>
        </div>
    );
}
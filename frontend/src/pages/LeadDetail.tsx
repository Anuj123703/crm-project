import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function LeadDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [lead, setLead] = useState<any>(null);

    useEffect(() => {
        const fetchLead = async () => {
            try {
                const res = await api.get(`/leads/${id}`);
                setLead(res.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchLead();
    }, [id]);

    if (!lead)
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-gray-500 animate-pulse">Loading lead...</p>
            </div>
        );

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                    Lead Details
                </h2>

                <button
                    onClick={() => navigate("/dashboard")}
                    className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
                >
                    Back
                </button>
            </div>

            {/* CARD */}
            <div className="max-w-xl mx-auto bg-white shadow-lg rounded-xl p-6 border">

                {/* NAME */}
                <div className="mb-4">
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="text-xl font-semibold text-gray-800">
                        {lead.name}
                    </p>
                </div>

                {/* EMAIL */}
                <div className="mb-4">
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-gray-700">{lead.email}</p>
                </div>

                {/* STATUS */}
                <div className="mb-4">
                    <p className="text-sm text-gray-500">Status</p>
                    <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-medium
                        ${lead.status === "New"
                                ? "bg-blue-100 text-blue-700"
                                : lead.status === "Contacted"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : lead.status === "Qualified"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                            }`}
                    >
                        {lead.status}
                    </span>
                </div>

                {/* SOURCE */}
                <div className="mb-4">
                    <p className="text-sm text-gray-500">Source</p>
                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                        {lead.source}
                    </span>
                </div>

                {/* CREATED AT */}
                <div className="mb-2">
                    <p className="text-sm text-gray-500">Created At</p>
                    <p className="text-gray-700">
                        {new Date(lead.createdAt).toLocaleString()}
                    </p>
                </div>
            </div>
        </div>
    );
}
import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Loading from "../components/ui/Loading";
import ErrorState from "../components/ui/ErrorState";
import EmptyState from "../components/ui/EmptyState";
import useDebounce from "../hooks/useDebounce";
import { useTheme } from "../context/ThemeContext";

interface Lead {
    _id: string;
    name: string;
    email: string;
    status: string;
    source: string;
}

export default function Dashboard() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [selected, setSelected] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // filters
    const [status, setStatus] = useState("");
    const [source, setSource] = useState("");
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("latest");

    // pagination
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState<string>("");

    const debouncedSearch = useDebounce(search, 500);

    const { darkMode, toggleTheme } = useTheme();
    // -----------------------------
    // FETCH LEADS
    // -----------------------------
    const fetchLeads = async () => {
        try {
            setLoading(true);

            const res = await api.get("/leads", {
                params: {
                    page,
                    status,
                    source,
                    search: debouncedSearch,
                    sort
                }
            });

            setLeads(res.data.leads || []);
            setTotalPages(res.data.totalPages || 1);

        } catch (err: any) {
            console.log("Fetch error:", err.response?.data);

            setError(
                err.response?.data?.message || "Failed to load leads"
            );
        } finally {
            setLoading(false);
        }
    };

    const applyFilters = () => {
        setPage(1);   // optional but BEST PRACTICE
        fetchLeads();
    };
    useEffect(() => {
        fetchLeads();
    }, [page, debouncedSearch]);

    // -----------------------------
    // RESET PAGE ON FILTER CHANGE
    // -----------------------------
    useEffect(() => {
        setPage(1);
    }, [status, source, search, sort]);

    // -----------------------------
    // SELECT TOGGLE
    // -----------------------------
    const toggleSelect = (id: string) => {
        setSelected((prev) =>
            prev.includes(id)
                ? prev.filter((x) => x !== id)
                : [...prev, id]
        );
    };

    // -----------------------------
    // DELETE SINGLE
    // -----------------------------
    const handleDelete = async (id: string) => {
        try {
            await api.delete(`/leads/${id}`);

            setLeads((prev) => prev.filter((l) => l._id !== id));
            setSelected((prev) => prev.filter((x) => x !== id));
        } catch (err: any) {
            console.log(err.response?.data);

            setError(
                err.response?.data?.message || "Delete failed"
            );
        }
    };

    // -----------------------------
    // BULK DELETE
    // -----------------------------
    const handleDeleteSelected = async () => {
        try {
            await Promise.all(
                selected.map((id) => api.delete(`/leads/${id}`))
            );

            setLeads((prev) =>
                prev.filter((l) => !selected.includes(l._id))
            );

            setSelected([]);
        } catch (err: any) {
            console.log(err.response?.data);

            setError(
                err.response?.data?.message || "Bulk delete failed"
            );
        }
    };

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    if (loading) return <Loading />;

    if (error) return <ErrorState message={error} />;

    if (!leads.length) return <EmptyState message="No Leads Found" />;
    

    return (
        <div className={`min-h-screen p-6 ${darkMode ? "bg-[#0f172a] text-white" : "bg-gray-100 text-black"}`}>

            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Leads Dashboard</h1>
                    <p className="text-sm opacity-70">Manage your leads efficiently</p>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={toggleTheme}
                        className="px-3 py-1 rounded-lg bg-gray-700 text-white hover:opacity-80"
                    >
                        {darkMode ? "☀️" : "🌙"}
                    </button>

                    <button
                        onClick={handleLogout}
                        className="px-4 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600"
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* ROLE */}
            <p className="mb-4 text-sm opacity-70">
                Logged in as: <b>{user?.role}</b>
            </p>

            {/* ACTIONS */}
            <div className="flex flex-wrap gap-3 mb-6">
                {user?.role === "Admin" && (
                    <button
                        onClick={handleDeleteSelected}
                        disabled={selected.length === 0}
                        className="bg-red-500 px-4 py-2 rounded-lg text-white disabled:bg-gray-400"
                    >
                        Delete ({selected.length})
                    </button>
                )}

                <button
                    onClick={() => navigate("/create-lead")}
                    className="bg-green-500 px-4 py-2 rounded-lg text-white hover:bg-green-600"
                >
                    + Create Lead
                </button>
            </div>

            {/* FILTERS CARD */}
            <div className={`p-4 rounded-xl shadow mb-6 ${darkMode ? "bg-[#1e293b]" : "bg-white"}`}>
                <div className="flex flex-wrap gap-3">

                    <input
                        type="text"
                        placeholder="Search name/email..."
                        className="border p-2 rounded-lg flex-1"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <select
                        className="border p-2 rounded-lg"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="">Status</option>
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Qualified">Qualified</option>
                        <option value="Lost">Lost</option>
                    </select>

                    <select
                        className="border p-2 rounded-lg"
                        value={source}
                        onChange={(e) => setSource(e.target.value)}
                    >
                        <option value="">Source</option>
                        <option value="Website">Website</option>
                        <option value="Instagram">Instagram</option>
                        <option value="Referral">Referral</option>
                    </select>

                    <select
                        className="border p-2 rounded-lg"
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                    >
                        <option value="latest">Latest</option>
                        <option value="oldest">Oldest</option>
                    </select>

                    <button
                        onClick={applyFilters}
                        className="bg-blue-500 text-white px-4 rounded-lg"
                    >
                        Apply
                    </button>
                </div>
            </div>

            {/* TABLE CARD */}
            <div className={`rounded-xl shadow overflow-hidden ${darkMode ? "bg-[#1e293b]" : "bg-white"}`}>
                <table className="min-w-full">

                    <thead className={`${darkMode ? "bg-[#334155]" : "bg-gray-200"}`}>
                        <tr>
                            {user?.role === "Admin" && <th className="p-3">✔</th>}
                            <th className="p-3 text-left">Name</th>
                            <th className="p-3 text-left">Email</th>
                            <th className="p-3 text-left">Status</th>
                            <th className="p-3 text-left">Source</th>
                            {user?.role === "Admin" && <th className="p-3">Actions</th>}
                        </tr>
                    </thead>

                    <tbody>
                        {leads.map((l) => (
                            <tr
                                key={l._id}
                                className={`border-t hover:${darkMode ? "bg-[#334155]" : "bg-gray-100"} transition`}
                            >
                                {user?.role === "Admin" && (
                                    <td className="p-3 text-center">
                                        <input
                                            type="checkbox"
                                            checked={selected.includes(l._id)}
                                            onChange={() => toggleSelect(l._id)}
                                        />
                                    </td>
                                )}

                                <td
                                    className="p-3 cursor-pointer text-blue-500 hover:underline"
                                    onClick={() => navigate(`/lead/${l._id}`)}
                                >
                                    {l.name}
                                </td>

                                <td className="p-3">{l.email}</td>

                                <td className="p-3">
                                    <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-600">
                                        {l.status}
                                    </span>
                                </td>

                                <td className="p-3">{l.source}</td>

                                {user?.role === "Admin" && (
                                    <td className="p-3 flex gap-3 justify-center">
                                        <button
                                            onClick={() => navigate(`/lead/edit/${l._id}`)}
                                            className="text-blue-500 hover:underline"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(l._id)}
                                            className="text-red-500 hover:underline"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* PAGINATION */}
            <div className="flex justify-center items-center gap-4 mt-6">
                <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className="px-4 py-1 rounded border"
                >
                    Prev
                </button>

                <span className="font-medium">
                    {page} / {totalPages}
                </span>

                <button
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                    className="px-4 py-1 rounded border"
                >
                    Next
                </button>
            </div>

        </div>
    );
}
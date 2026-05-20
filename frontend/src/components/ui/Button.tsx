interface Props {
    children: React.ReactNode;
    onClick?: () => void;
    loading?: boolean;
}

export default function Button({ children, onClick, loading }: Props) {
    return (
        <button
            onClick={onClick}
            disabled={loading}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
            {loading ? "Loading..." : children}
        </button>
    );
}
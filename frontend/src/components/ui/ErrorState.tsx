export default function ErrorState({ message }: { message: string }) {
    return (
        <div className="p-4 text-red-500 text-center">
            {message}
        </div>
    );
}
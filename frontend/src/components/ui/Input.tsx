import React from "react";

interface Props {
    label?: string;
    type?: string;
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
    label,
    type = "text",
    placeholder,
    value,
    onChange
}: Props) {
    return (
        <div className="mb-3">
            {label && (
                <label className="block mb-1 text-sm text-gray-700 dark:text-gray-300">
                    {label}
                </label>
            )}

            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="w-full p-2 border rounded bg-white dark:bg-gray-800 dark:text-white"
            />
        </div>
    );
}
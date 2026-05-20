import { createContext, useContext, useState, useEffect } from "react";

interface ThemeContextType {
    darkMode: boolean;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: any) => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            setDarkMode(true);
            document.body.classList.add("dark");
        }
    }, []);

    const toggleTheme = () => {
        setDarkMode((prev) => {
            const newTheme = !prev;

            if (newTheme) {
                document.body.classList.add("dark");
                localStorage.setItem("theme", "dark");
            } else {
                document.body.classList.remove("dark");
                localStorage.setItem("theme", "light");
            }

            return newTheme;
        });
    };

    return (
        <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error("ThemeContext not found");
    return ctx;
};
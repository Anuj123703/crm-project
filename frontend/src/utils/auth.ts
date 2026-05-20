import { jwtDecode } from "jwt-decode";

interface DecodedToken {
    exp: number;
    id: string;
    role: string;
}

export const checkTokenExpiry = () => {
    const token = localStorage.getItem("token");

    if (!token) return false;

    const decoded = jwtDecode<DecodedToken>(token);

    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
        localStorage.removeItem("token");
        return false;
    }

    return true;
};
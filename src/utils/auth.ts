import { redirect } from "react-router-dom";

export function logout(){
    localStorage.removeItem("token");
    return redirect("/");
}

export function tokenLoaders() {
    const token = localStorage.getItem("token");
    if (!token) {
        return null;
    }
    return token;
}
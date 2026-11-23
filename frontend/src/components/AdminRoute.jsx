
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
    const [authenticated, setAuthenticated] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8080/api/admin/me", {
            credentials: "include"
        })
            .then(response => {
                setAuthenticated(response.ok);
            })
            .catch(() => {
                setAuthenticated(false);
            });
    }, []);

    if (authenticated === null) {
        return <p>Шалгаж байна...</p>;
    }

    if (!authenticated) {
        return <Navigate to="/adminLogin" replace />;
    }

    return children;
}

export default AdminRoute;

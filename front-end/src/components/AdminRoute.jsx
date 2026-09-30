import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {

    const admin = localStorage.getItem("admin");

    if (!admin) {
        return <Navigate to="/adminLogin" replace />;
    }

    return children;
}

export default AdminRoute;
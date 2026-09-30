import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {

    const customer = localStorage.getItem("customer");

    if (!customer) {

        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;
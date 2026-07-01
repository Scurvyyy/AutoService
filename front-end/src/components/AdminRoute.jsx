    function ProtectedRoute({ children }) {

    const customer = localStorage.getItem("customer");

    if (!customer) {

        return <Navigate to="/login" replace />;
    }

    if (!customer && customer) {

        return <Navigate to="/adminLogin" replace />;
    }

    return children;
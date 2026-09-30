import Navbar from "../components/Navbar";
import "../styles/admin.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Admin() {
    const navigate = useNavigate();

    const [bookingCount, setBookingCount] = useState(0);
    const [partCount, setPartCount] = useState(0);
    const [mechanicCount, setMechanicCount] = useState(0);

    const [pendingCount, setPendingCount] = useState(0);
    const [assignedCount, setAssignedCount] = useState(0);
    const [completedCount, setCompletedCount] = useState(0);

    

    useEffect(() => {

    fetch("http://localhost:8080/api/bookings")
        .then((response) => response.json())
        .then((data) => {

            setBookingCount(data.length);

            setPendingCount(
                data.filter(
                    booking =>
                        booking.status === "Pending"
                ).length
            );

            setAssignedCount(
                data.filter(
                    booking =>
                        booking.status === "Assigned"
                ).length
            );

            

            setCompletedCount(
                data.filter(
                    booking =>
                        booking.status === "Completed"
                ).length
            );
        });

        fetch("http://localhost:8080/api/parts")
            .then((response) => response.json())
            .then((data) =>
                setPartCount(data.length)
            );

        fetch("http://localhost:8080/api/mechanics")
            .then((response) => response.json())
            .then((data) =>
                setMechanicCount(data.length)
            );

    }, []);
    

    return (

        <div>

            <Navbar />
            <div className="admin-container">

                <h1>
                    Admin Dashboard
                </h1>

               
                

                <div className="admin-grid">

                    <div className="admin-card" onClick={() => navigate("/admin/adminBookings")}>
                        <h2> Bookings</h2>
                        <h1>{bookingCount}</h1>
                        <p>
                            Захиалгууд удирдах
                        </p>
                    </div>

                    <div className="admin-card" onClick={() => navigate("/admin/parts")}>
                        <h2>Parts</h2>
                        <h1>{partCount}</h1>
                        <p>
                            Сэлбэг удирдах
                        </p>
                    </div>

                    <div className="admin-card" onClick={() => navigate("/admin/customer")}>
                        <h2>Customers</h2>
                        <p>
                            Харилцагчид
                        </p>
                    </div>

                    <div className="admin-card" onClick={() => navigate("/admin/mechanic")}>
                        <h2>Засварчин</h2>
                        <h1>{mechanicCount}</h1>
                        
                    </div>
                </div>

            </div>

        </div>

    );

}

export default Admin;
import { useEffect, useState } from "react";
import "../styles/adminBookings.css";
import { useNavigate } from "react-router-dom";

function AdminBookings() {

    const [bookings, setBookings] = useState([]);
    const navigate = useNavigate();
    const [mechanics, setMechanics] = useState([]);

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

        
    const handleComplete = async (id) => {
        try {
            const response = await fetch(
                `http://localhost:8080/api/bookings/${id}/complete`,
                { method: "POST" , credentials: "include"}
            );

            if (!response.ok) {
                throw new Error("Failed to complete booking");
            }

            setBookings(prev =>
                prev.map(booking =>
                    booking.id === id
                        ? { ...booking, status: "Completed" }
                        : booking
                )
            );
        } catch (error) {
            console.error(error);
            alert("Захиалгын төлөв өөрчлөхөд алдаа гарлаа");
        }
    };


    const handleAssign = async (
        id,
        mechanic
    ) => {

        await fetch(
            `http://localhost:8080/api/bookings/${id}/assign?mechanic=${mechanic}`,
            {
                credentials: "include",
                method: "PUT"
            }
        );

        setBookings(
            bookings.map((booking) =>
                booking.id === id
                    ? {
                        ...booking,
                        mechanic,
                        status: "Assigned"
                    }
                    : booking
            )
        );
    };

    useEffect(() => {

        fetch("http://localhost:8080/api/bookings")
            .then((response) => response.json())
            .then((data) => setBookings(data));

        fetch("http://localhost:8080/api/mechanics")
            .then((response) => response.json())
            .then((data) => setMechanics(data));

    }, []);



    const handleStart = async (id) => {
        try {
            const response = await fetch(
                `http://localhost:8080/api/bookings/${id}/start`,
                { method: "PUT", credentials: "include" }
            );

            if (!response.ok) {
                throw new Error("Failed to start repair");
            }

            setBookings(prev =>
                prev.map(booking =>
                    booking.id === id
                        ? { ...booking, status: "In Progress" }
                        : booking
                )
            );
        } catch (error) {
            console.error(error);
            alert("Засвар эхлүүлэхэд алдаа гарлаа");
        }
    };


    return (

        <div className="admin-bookings">

            <button className="getback" onClick={() => navigate  ("/admin")}>
                БУЦАХ
            </button>

            <h1>
                Захиалгын удирдлага
            </h1>

             <input className="search-btn"
                    type="text"
                    placeholder="Хэрэглэгч хайх..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value) }
                    
                />  


            <table>

                <thead>

                    <tr>
                        <th>ID</th>
                        <th>Нэр</th>
                        <th>Утас</th>
                        <th>Үйлчилгээ</th>
                        <th>Засварчин</th>
                        <th>Огноо</th>
                        <th>Төлөв</th>
                        <th>Үйлдэл</th>
                    </tr>

                </thead>

                <tbody>

                    

                   {bookings.filter((booking) => (booking.customerName || "")
                                .toLowerCase()
                                .includes(
                                    search.toLowerCase()
                                )
                        )
                        .filter((booking) =>
                            statusFilter === "All"
                                ? true
                                : booking.status === statusFilter
                        )
                        .map((booking) => (

                        <tr key={booking.id}>

                            <td>{booking.id}</td>

                            <td>
                                {booking.customerName}
                            </td>

                            <td>
                                {booking.customerPhone}
                            </td>

                            <td>
                                {booking.serviceName}
                            </td>

                           
                            <td>
                                <select
                                    value={booking.mechanic || ""}
                                    disabled={
                                        booking.status === "Completed" ||
                                        booking.status === "Cancelled"
                                    }
                                    onChange={(e) =>
                                        handleAssign(booking.id, e.target.value)
                                    }
                                >
                                    <option value="">Засварчин сонгох</option>

                                    {mechanics.map((mechanic) => (
                                        <option key={mechanic.id} value={mechanic.name}>
                                            {mechanic.name}
                                        </option>
                                    ))}
                                </select>
                            </td>

                            
                            <td>
                                {booking.bookingDate}
                            </td>
                            
                            <td>
                                <span className={(booking.status || "").toLowerCase().replace(/\s+/g, "-")}>
                                </span>
                                
                            </td>
                            
                           
                            <td>
                                {booking.status === "Assigned" && (
                                    <button onClick={() => handleStart(booking.id)}>
                                        Эхлүүлэх
                                    </button>
                                )}

                                {booking.status === "In Progress" && (
                                    <button onClick={() => handleComplete(booking.id)}>
                                        Дуусгах
                                    </button>
                                )}

                                {booking.status === "Completed" && (
                                    <span style={{ color: "#15803d", fontWeight: 600 }}>
                                        Дууссан
                                    </span>
                                )}
                            </td>



                        </tr>

                    ))}

                </tbody>    

            </table>        

        </div>
            
    );
}

export default AdminBookings;
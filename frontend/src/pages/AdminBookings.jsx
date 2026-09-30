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

    await fetch(
        `http://localhost:8080/api/bookings/${id}/complete`,
        {
            method: "POST"
        }
    );

    setBookings((prev) => prev.map((booking) => booking.id === id
                    ? {
                        ...booking,
                        status: "ДУУССАН"
                    }
                    : booking
            )
        );
    };

    const handleAssign = async (
        id,
        mechanic
    ) => {

        await fetch(
            `http://localhost:8080/api/bookings/${id}/assign?mechanic=${mechanic}`,
            {
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

                                {booking.mechanic ? (

                                    <span>
                                        {booking.mechanic}
                                    </span>

                                ) : (

                                    <select
                                        onChange={(e) =>
                                            handleAssign(
                                                booking.id,
                                                e.target.value
                                            )
                                        }
                                    >

                                        <option value="">
                                            Засварчин сонгох
                                        </option>

                                        {mechanics.map((mechanic) => (

                                            <option
                                                key={mechanic.id}
                                                value={mechanic.name}
                                            >
                                                {mechanic.name}
                                            </option>

                                        ))}

                                    </select>

                                )}

                            </td>
                            
                            <td>
                                {booking.bookingDate}
                            </td>
                            
                            <td>
                                <span className={booking.status.toLowerCase()}>
                                    {booking.status}
                                </span>
                                
                            </td>
                            
                            
                            
                            <td>

                                {booking.status === "Pending" && (

                                    <button onClick={() =>handleComplete(booking.id)}>  
                                        Дуусгах
                                    </button>

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
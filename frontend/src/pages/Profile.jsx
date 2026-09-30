import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Profile.css";

function Profile() {
    const [bookings, setBookings] = useState([]);
    const navigate = useNavigate();

    const handleLogout = ()=> {
        localStorage.removeItem("customer");
        navigate("/")
    }

    const customer = JSON.parse(
        localStorage.getItem("customer")
    );

    useEffect(() => {

        fetch(
            `http://localhost:8080/api/bookings/phone/${customer.phone}`
        )
            .then((response) => response.json())
            .then((data) => setBookings(data));

    }, [customer.phone]);


const handleCancel = async (id) => {

    try {

        const response = await fetch(
            `http://localhost:8080/api/bookings/${id}/cancel`,
            {
                method: "POST"
            }
        );

        console.log("Status:", response.status);
        console.log("OK:", response.ok);

        const text = await response.text();

        console.log("Response:", text);

        setBookings((prev) =>
            prev.map((booking) =>
                booking.id === id
                    ? {
                        ...booking,
                        status: "Cancelled"
                    }
                    : booking
            )
        );

    } catch (error) {

        console.error(error);

    }
};

    return (
        <div >   

           <div className="profile-header">

                <div className="profile-avatar">
                    {customer.name.charAt(0)}
                </div>

                <div>

                    <h1>
                        Сайн байна уу, {customer.name}
                    </h1>

                    <p>
                        Миний бүртгэл
                    </p>

                </div>

            </div>

            <hr />

            <div className="profile-container">

            <div className="profile-card">

                <h2 className="profile-title">
                    Хувийн мэдээлэл
                </h2>

                <p>
                    <b>Нэр:</b> {customer.name}
                </p>

                <p>
                    <b>Утас:</b> {customer.phone}
                </p>

                <p>
                    <b>И-мэйл:</b> {customer.email}
                </p>

                <div className="profile-actions">

                    
                    <button onClick={() => navigate("/")}>
                        Нүүр хуудас
                    </button>

                    <button>
                        Мэдээлэл засах
                    </button>

                    
                    <button
                        onClick={() => navigate("/bookings")}
                    >
                        Цаг захиалах
                    </button>


                    <button
                        onClick={handleLogout}
                    >
                        Гарах
                    </button>

                    

            </div>


        <h2>
            Цаг захиалгын түүх ({bookings.length})
        </h2>

        <div className="bookings-container">

            {bookings.length === 0 ? (

                <p>
                    Захиалга байхгүй байна.
                </p>

            ) : (

                bookings.map((booking) => (

                    <div
                        key={booking.id}
                        className="booking-card"
                    >

                        <h3>
                            {booking.serviceName}
                        </h3>

                        <p>
                            Огноо:
                            {booking.bookingDate}
                        </p>

                        {booking.mechanic && (

                            <p>
                                 Засварчин:
                                {booking.mechanic}
                            </p>

                        )}

                        <p
                            className={
                                booking.status.toLowerCase()
                            }
                        >
                            Төлөв:
                            {booking.status}
                        </p>


                        {
                            booking.status === "Pending" && (

                                <button
                                    onClick={() =>
                                        handleCancel(booking.id)
                                    }
                                >
                                    Цуцлах
                                </button>

                            )
                        }

                    </div>

                ))

            )}

        </div>

    </div>

</div>


            
        </div>
    );
}

export default Profile;
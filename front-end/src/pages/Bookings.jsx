import { useState } from "react";
import "../styles/booking.css";
import { useNavigate } from "react-router-dom";

function Booking() {

    const customer =
    JSON.parse(
        localStorage.getItem("customer")
    );
    
    if (!customer) {
        return <h2> Цаг захиалахын тулд нэвтэрнэ үү.</h2>;
    }

    const [serviceName, setServiceName] = useState("");
    const [bookingDate, setBookingDate] = useState("");
    const [customerName, setCustomerName] = useState(customer?.name || "");
    const [customerPhone, setCustomerPhone] = useState(customer?.phone ||"");
    const navigate = useNavigate();

    const isBookingValid =
    customerName.trim() !== "" &&
    customerPhone.trim() !== "" &&
    serviceName !== "" &&
    bookingDate !== "";

    const handleBooking = async () => {


        if (!isBookingValid) {

            alert("Бүх мэдээллийг бөглөнө үү");

            return;
        }

        const response = await fetch(
            "http://localhost:8080/api/bookings",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    customerName,
                    customerPhone,
                    serviceName,
                    bookingDate,
                    status: "Pending"
                })
            }
        );



        const data = await response.json();

        console.log(data);

        alert("Цаг амжилттай захиалагдлаа");

    
        navigate("/profile", {
            state: {
                success: true
            }
            });
        };

        

    return (


            <div className="booking-container">

                <div className="booking-card">

                    <h1>Цаг захиалах</h1>

                    <div className="form-group">
                        <label>Нэр</label>
                        <input
                            type="text"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)
                            }
                        />
                                
                    </div>

                    <div className="form-group">
                        <label>Утас</label>
                            <input
                                type="text"
                                placeholder="Утас"
                                value={customerPhone}
                                onChange={(e) =>
                                    setCustomerPhone(e.target.value)
                                }
                            />
                    </div>

                    <div className="form-group">
                        <label>Үйлчилгээ</label>
                        <select
                            value={serviceName}
                            onChange={(e) =>
                                setServiceName(e.target.value)
                            }
                            >
                            <option value="">
                                Үйлчилгээ сонгох
                            </option>

                            <option value="Тос солих">
                                Тос солих
                            </option>

                            <option value="Агрегат засвар">
                                Агрегат засвар
                            </option>

                            <option value="Тэнхлэг тохиргоо">
                                Тэнхлэг тохиргоо
                            </option>

                            <option value="Компьютер оношилгоо">
                                Компьютер оношилгоо
                            </option>
                            </select>
                    </div>

                        <div className="form-group">
                            <label>Огноо</label>
                            <input
                            type="date"
                            value={bookingDate}
                            onChange={(e) =>
                                setBookingDate(e.target.value)
                            }
                            />
                        </div>
                        

                        <button className="booking-btn"
                        onClick={handleBooking}
                        >
                            Цаг захиалах
                        </button>

                        <button className="get-back" onClick={() => navigate("/")}>
                            Буцах
                        </button>

                </div>

            </div>
        
    );
}

export default Booking;








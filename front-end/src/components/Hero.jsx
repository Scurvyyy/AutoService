import Booking from "../pages/Bookings";
import "../styles/hero.css";
import { useNavigate } from "react-router-dom";

function Hero() {

    const navigate = useNavigate();

    return (
        <section className="hero">

            <h1>
                Од Авто Засвар
            </h1>

            <p>
                Найдвартай автомашины засвар үйлчилгээ,
                онлайн цаг захиалга болон чанартай сэлбэгийн үйлчилгээ.
            </p>
            <button onClick={() => navigate = ("/Booking")}>
                Захиалга өгөх
            </button>

        </section>

        
    );
}

export default Hero;
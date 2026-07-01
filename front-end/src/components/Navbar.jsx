import "../styles/navbar.css";
import { Link } from "react-router-dom";


function Navbar() {

    const customer = JSON.parse( localStorage.getItem("customer") );

    return (
        <nav className="navbar">

            <div className="logo">
                Од Авто Засвар
            </div>

            <div className="nav-links">
                <Link to="/">Нүүр</Link>
                <Link to="/services">Үйлчилгээ</Link>
                <Link to="/parts">Сэлбэг</Link>
                <Link to="/contact">Холбоо барих</Link>
                <Link to="/bookings">Цаг захиалах</Link>
                    {
                        customer ? (

                            <Link to="/profile" className="profile-link" >

                                <div className="avatar">
                                    {customer?.name?.charAt(0)}
                                </div>

                                <span>
                                    {customer?.name}
                                </span>

                            </Link>

                        ) : (

                            <Link to="/login">
                                Нэвтрэх
                            </Link>

                        )
                    }

            </div>

        </nav>
    );
}

export default Navbar;
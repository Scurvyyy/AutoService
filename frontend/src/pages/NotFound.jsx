import { Link } from "react-router-dom";
import "../styles/notfound.css";

function NotFound() {
    return (
        <div className="notfound-container">

            <div className="notfound-card">

                <h1>404</h1>

                <h2>Хуудас олдсонгүй</h2>

                <p>
                    Таны хайсан хуудас байхгүй байна.
                </p>

                <Link
                    to="/"
                    className="notfound-btn"
                >
                    Нүүр хуудас руу буцах
                </Link>

            </div>

        </div>
    );
}

export default NotFound;
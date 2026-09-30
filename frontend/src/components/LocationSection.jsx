import "../styles/location.css";

function LocationSection() {
    return (
        <section className="location-section">

            <h2>
                Байршил & Цагийн хуваарь
            </h2>

            <div className="location-grid">

                <div className="location-card">

                    <h3>Хаяг</h3>

                    <p>
                        Од Авто Засвар
                    </p>

                    <p>
                        44.901278, 110.152842
                    </p>

                    <a
                        href="https://www.google.com/maps?q=44.901278,110.152842"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Google Maps нээх
                    </a>

                </div>

                <div className="location-card">

                    <h3>Цагийн хуваарь</h3>

                    <p>Даваа - Баасан: 09:00 - 18:00</p>

                    <p>Бямба: 10:00 - 16:00</p>

                    <p>Ням: Амарна</p>

                </div>

            </div>

        </section>
    );
}

export default LocationSection;
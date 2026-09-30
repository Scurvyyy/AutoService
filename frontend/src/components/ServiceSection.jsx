import "../styles/services.css";

function ServicesSection() {

    return (
        <section className="services-section">

            <h2 className="services-title">
                Манай үйлчилгээ
            </h2>

            <p className="services-subtitle">
                Автомашины бүх төрлийн засвар үйлчилгээ
            </p>

            <div className="services-grid">

                <div className="service-card">
                    <h3>Тос солих</h3>

                    <p>
                        Хөдөлгүүрийн тос болон
                        шүүлтүүр солих үйлчилгээ.
                    </p>
                </div>

                <div className="service-card">
                    <h3>Агрегат засвар</h3>

                    <p>
                        Хөдөлгүүр болон агрегатын
                        засвар үйлчилгээ.
                    </p>
                </div>

                <div className="service-card">
                    <h3>Тэнхлэг тохиргоо</h3>

                    <p>
                        Тэнхлэгийн тохиргоо болон
                        шалгалт.
                    </p>
                </div>

                <div className="service-card">
                    <h3>Компьютер оношилгоо</h3>

                    <p>
                        Орчин үеийн оношилгооны
                        төхөөрөмжөөр шалгана.
                    </p>
                </div>

            </div>

        </section>
    );
}

export default ServicesSection;
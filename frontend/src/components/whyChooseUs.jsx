import "../styles/whychooseus.css";

function WhyChooseUsSection() {
    return (
        <section className="why-section">

            <h2>Яагаад биднийг сонгох вэ?</h2>

            <div className="why-grid">

                <div className="why-card">
                    <h3>Түргэн үйлчилгээ</h3>
                    <p>
                        Цаг алдалгүй шуурхай үйлчилгээ.
                    </p>
                </div>

                <div className="why-card">
                    <h3>Туршлагатай баг</h3>
                    <p>
                        Мэргэжлийн засварчид.
                    </p>
                </div>

                <div className="why-card">
                    <h3>Ил тод үнэ</h3>
                    <p>
                        Урьдчилан тодорхой үнэ.
                    </p>
                </div>

                <div className="why-card">
                    <h3> Онлайн цаг захиалга</h3>
                    <p>
                        Хэзээ ч хаанаас ч захиалах боломжтой.
                    </p>
                </div>

            </div>

        </section>
    );
}

export default WhyChooseUsSection;
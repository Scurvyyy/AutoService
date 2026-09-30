import "../styles/howitwork.css"



function HowItWorks() {
  return (
    <section>

      <h2 className="how-title">Хэрхэн захиалах вэ?</h2>

        <div className="how-grid"> 

          <div className="how-card">
            <h3>1. Үйлчилгээ сонгох</h3>
            <p>
              Өөрт хэрэгтэй засвар үйлчилгээг сонгоно.
            </p>
          </div>

          <div className="how-card" >
            <h3>2. Цаг захиалах</h3>
            <p>
              Тохиромжтой өдөр, цагаа сонгоно.
            </p>
          </div>

          <div className="how-card">
            <h3>3. Баталгаажуулах</h3>
            <p>
              Захиалгаа баталгаажуулна.
            </p>
          </div>

          <div className="how-card">
            <h3>4. Үйлчилгээ авах</h3>
            <p>
              Засвар үйлчилгээнд ирж үйлчлүүлнэ.
            </p>
          </div>

        </div>

    </section>
  );
}

export default HowItWorks;
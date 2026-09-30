import Navbar from "../components/Navbar";
import "../styles/parts.css";

function Parts() {

    return (

        <div>w

            <Navbar />

            <div className="parts-page">

                <aside className="parts-sidebar">

                    <h3>Ангилал</h3>

                    <button>Хөдөлгүүр</button>

                    <button>Тос</button>

                    <button>Тоормос</button>

                    <button>Цахилгаан</button>

                    <button>Явах эд анги</button>

                </aside>

                <div className="parts-content">

                    <div className="parts-header">

                        <h1>Сэлбэг</h1>

                        <input
                            type="text"
                            placeholder="Сэлбэг хайх..."
                        />

                    </div>

                    <div className="parts-grid">

                        <div className="part-card">

                            
                            <img
                            src="oil_filter.jpg"
                            alt="Oil Filter"
                            className="part-image"
                        />
                            

                            <h3>
                                Oil Filter
                            </h3>

                            <p>
                                35,000₮
                            </p>

                        </div>

                        <div className="part-card">

                            <img
                            src="engine-oil.jpg"
                            alt="Engine Filter"
                            className="part-image"
                        />

                            <h3>
                                Engine Oil
                            </h3>

                            <p>
                                80,000₮
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default Parts;
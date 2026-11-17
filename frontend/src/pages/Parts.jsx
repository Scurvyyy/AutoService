import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "../styles/parts.css";

function Parts() {
    const [parts, setParts] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");

    useEffect(() => {
        fetch("http://localhost:8080/api/parts")
            .then(response => response.json())
            .then(data => setParts(data))
            .catch(error => console.error(error));
    }, []);

    const filteredParts = parts.filter(part =>
        part.name.toLowerCase().includes(search.toLowerCase()) &&
        (category === "" || part.category === category)
    );

    return (
        <div>
            <Navbar />

            <div className="parts-page">
                <aside className="parts-sidebar">
                    <h3>Ангилал</h3>

                    <button onClick={() => setCategory("")}>
                        Бүгд
                    </button>

                    <button onClick={() => setCategory("Engine")}>
                        Хөдөлгүүр
                    </button>

                    <button onClick={() => setCategory("Oil")}>
                        Тос
                    </button>

                    <button onClick={() => setCategory("Brake")}>
                        Тоормос
                    </button>

                    <button onClick={() => setCategory("Electrical")}>
                        Цахилгаан
                    </button>
                </aside>

                <div className="parts-content">
                    <div className="parts-header">
                        <h1>Сэлбэг</h1>

                        <input
                            type="text"
                            placeholder="Сэлбэг хайх..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>

                    <div className="parts-grid">
                        {filteredParts.map(part => (
                            <div className="part-card" key={part.id}>
                                {part.image && (
                                    <img
                                        src={`http://localhost:8080${part.image}`}
                                        alt={part.name}
                                        className="part-image"
                                    />
                                )}

                                <h3>{part.name}</h3>
                                <p>{part.price?.toLocaleString()}₮</p>
                                <p>Үлдэгдэл: {part.stock}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Parts;
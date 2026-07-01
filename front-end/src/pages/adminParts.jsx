import { useState } from "react";
import { useEffect } from "react";

function AdminParts() {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [parts, setParts] = useState([]);

    useEffect(() => {

    fetch("http://localhost:8080/api/parts")
        .then((response) => response.json())
        .then((data) => setParts(data));

    }, []);

    const handleSave = async () => {

        const response = await fetch(
            "http://localhost:8080/api/parts",
            {
                method: "POST",
                headers: {
                    "Content-Type":
                        "application/json"
                },
                body: JSON.stringify({
                    name,
                    price,
                    stock,
                    category,
                    description
                })
            }
        );

        const data = await response.json();
        setParts((prev) => [...prev, data]);

        console.log(data);

        alert("Сэлбэг амжилттай нэмэгдлээ");

        setName("");
        setPrice("");
        setStock("");
        setCategory("");
        setDescription("");
    };

    return (

        <div className="part-container">

            <h1>
                Сэлбэг нэмэх
            </h1>

            <input
                type="text"
                placeholder="Нэр"
                value={name}
                onChange={(e) =>
                    setName(e.target.value)
                }
            />

            <br /><br />

            <input
                type="number"
                placeholder="Үнэ"
                value={price}
                onChange={(e) =>
                    setPrice(e.target.value)
                }
            />

            <br /><br />

            <input
                type="number"
                placeholder="Үлдэгдэл"
                value={stock}
                onChange={(e) =>
                    setStock(e.target.value)
                }
            />

            <br /><br />

            <select
                value={category}
                onChange={(e) =>
                    setCategory(e.target.value)
                }
            >
                <option value="">
                    Ангилал сонгох
                </option>

                <option value="Engine">
                    Engine
                </option>

                <option value="Oil">
                    Oil
                </option>

                <option value="Brake">
                    Brake
                </option>

                <option value="Electrical">
                    Electrical
                </option>

            </select>

            <br /><br />

            <textarea
                placeholder="Тайлбар"
                value={description}
                onChange={(e) =>
                    setDescription(
                        e.target.value
                    )
                }
            />

            <br /><br />

            <button
                onClick={handleSave}
            >
                Хадгалах
            </button>

                        <h2>
                Нэмэгдсэн сэлбэгүүд
            </h2>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Нэр</th>
                        <th>Үнэ</th>
                        <th>Үлдэгдэл</th>
                        <th>Ангилал</th>
                    </tr>
                </thead>

                <tbody>
                    {parts.map((part) => (
                        <tr key={part.id}>
                            <td>{part.id}</td>
                            <td>{part.name}</td>
                            <td>{part.price}₮</td>
                            <td>{part.stock}</td>
                            <td>{part.category}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        

    );
}

export default AdminParts;
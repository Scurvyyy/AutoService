import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminParts() {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [parts, setParts] = useState([]);
    const [image, setImage] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [existingImage, setExistingImage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {

    fetch("http://localhost:8080/api/parts")
        .then((response) => response.json())
        .then((data) => setParts(data));

    }, []);

    const handleSave = async () => {
            if (!name.trim() || price === "" || stock === "") {
            alert("Нэр, үнэ болон үлдэгдлийг заавал бөглөнө үү!");
            return;
        }

        if (!Number.isFinite(Number(price)) || Number(price) <= 0 ||
            !Number.isInteger(Number(stock)) || Number(stock) < 0
        ) {
            alert("Үнэ 0-ээс их, үлдэгдэл 0 эсвэл эерэг бүхэл тоо байх ёстой!");
            return;
        }
        try {
            let imageUrl = editingId ? existingImage : "";

            if (image) {
                const formData = new FormData();
                formData.append("file", image);

                const uploadResponse = await fetch(
                    "http://localhost:8080/api/parts/upload",
                    {
                        method: "POST",
                        credentials: "include",
                        body: formData
                    }
                );

                if (!uploadResponse.ok) {
                    throw new Error("Image upload failed");
                }

                imageUrl = await uploadResponse.text();
            }

            const response = await fetch(
                editingId
                    ? `http://localhost:8080/api/parts/${editingId}`
                    : "http://localhost:8080/api/parts",
                {
                    method: editingId ? "PUT" : "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name,
                        price: Number(price),
                        stock: Number(stock),
                        category,
                        description,
                        image: imageUrl
                    })
                }
                
            );

            if (!response.ok) {
                throw new Error("Failed to save part");
            }

            const data = await response.json();
            setParts(prev =>
            editingId ? prev.map(part => part.id === editingId ? data : part) : [...prev, data]
                
        );

            alert("Сэлбэг амжилттай нэмэгдлээ");

            setName("");
            setPrice("");
            setStock("");
            setCategory("");
            setDescription("");
            setImage(null);
            setEditingId(null);
            setExistingImage("");

        } catch (error) {
            console.error(error);
            alert("Сэлбэг нэмэхэд алдаа гарлаа");
        }
    };

    // DELETE ITEM ,PART
        const handleDelete = async (id) => {
        if (!window.confirm("Энэ сэлбэгийг устгах уу?")) return;

        const response = await fetch(
            `http://localhost:8080/api/parts/${id}`,
            { method: "DELETE",credentials: "include" }
        );

        if (!response.ok) {
            alert("Сэлбэг устгахад алдаа гарлаа");
            return;
        }

        setParts(prev => prev.filter(part => part.id !== id));
        
    };

        const handleEdit = (part) => {
        setEditingId(part.id);
        setName(part.name ?? "");
        setPrice(part.price ?? "");
        setStock(part.stock ?? "");
        setCategory(part.category ?? "");
        setDescription(part.description ?? "");
        setExistingImage(part.image ?? "");
        setImage(null);
    };

        const handleSale = async (part) => {
        const input = prompt(`${part.name} — Борлуулах тоо ширхэг:`);

        if (input === null) return;

        const quantity = Number(input);

        if (!Number.isInteger(quantity) || quantity <= 0) {
            alert("Зөв тоо оруулна уу");
            return;
        }

        if (quantity > part.stock) {
            alert("Үлдэгдэл хүрэлцэхгүй байна");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/api/part-sales", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    partId: part.id,
                    quantity
                })
            });

            if (!response.ok) {
                throw new Error("Sale failed");
            }

            setParts(prev =>
                prev.map(item =>
                    item.id === part.id ? { ...item, stock: item.stock - quantity } : item
                )
            );

            alert("Борлуулалт амжилттай бүртгэгдлээ");
        } catch (error) {
            console.error(error);
            alert("Борлуулалт бүртгэхэд алдаа гарлаа");
        }
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
                required
                onChange={(e) => setName(e.target.value)}
            />

            <br /><br />

            <input
                type="number"
                placeholder="Үнэ"
                value={price}
                min="0.01"
                step="0.01"
                required
                onChange={(e) => setPrice(e.target.value)}
            />

            <br /><br />

           <input
                type="number"
                placeholder="Үлдэгдэл"
                value={stock}
                min="0"
                step="1"
                required
                onChange={(e) => setStock(e.target.value)}
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

            <textarea placeholder="Тайлбар"
                value={description}
                onChange={(e) =>
                    setDescription(e.target.value)
                }
            />

            <br /><br />

            <input type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={(e) => setImage(e.target.files[0] || null)}
            />

            <button onClick={handleSave}>
                {editingId ? "Шинэчлэх" : "Хадгалах"}
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
                        <th>Үйлдэл</th>
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
                            <td><button onClick={() => handleEdit(part)}>Засах</button>
                            <button onClick={() => handleDelete(part.id)}>Устгах</button>
                            <button onClick={() => handleSale(part)}>Борлуулах</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        

    );
}

export default AdminParts;
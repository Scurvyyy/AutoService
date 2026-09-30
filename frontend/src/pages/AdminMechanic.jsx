import { useEffect, useState } from "react";

function AdminMechanics() {

    const [mechanics, setMechanics] = useState([]);

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [major, setMajor] = useState("");

    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({ name: "", phone: "", address: "", major: "" });


    useEffect(() => {

        fetch(
            "http://localhost:8080/api/mechanics"
        )
            .then((response) => response.json())
            .then((data) =>
                setMechanics(data)
            );


    }, []);
        const handleSave = async () => {

            const response = await fetch(
                "http://localhost:8080/api/mechanics",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name,
                        phone,
                        address,
                        major
                    })
                }
            );

            const data = await response.json();

            setMechanics([
                ...mechanics,
                data
            ]);

            setName("");
            setPhone("");
            setAddress("");
            setMajor("");
        };

        const handleDelete = async (id) => {

            if (!window.confirm(
                "Устгах уу ?"
            )){
                return
            }

            await fetch(
                `http://localhost:8080/api/mechanics/${id}`,
                {
                    method: "DELETE"
                }
            );

            setMechanics(
                mechanics.filter(
                    (mechanic) =>
                        mechanic.id !== id
                )
            );
        };

        const startEdit = (mechanic) => {

            setEditingId(mechanic.id);

            setEditForm({
                name: mechanic.name,
                phone: mechanic.phone,
                address: mechanic.address,
                major: mechanic.major
            });
        };


        const cancelEdit = () => {

            setEditingId(null);

            setEditForm({
                name: "",
                phone: "",
                address: "",
                major: ""
            });
        };

        const saveEdit = async (id) => {

            const response = await fetch(
                `http://localhost:8080/api/mechanics/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(editForm)
                }
            );

            const updatedMechanic =
                await response.json();

            setMechanics(
                mechanics.map((mechanic) =>
                    mechanic.id === id
                        ? updatedMechanic
                        : mechanic
                )
            );

            setEditingId(null);
        };
            

    

    return (
        <div>

            <h1>
                Засварчдын удирдлага
            </h1>


            <h2>
                Засварчид
            </h2>

            <table>

                <thead>

                    <tr>

                        <th>Нэр</th>
                        <th>Утас</th>
                        <th>Хаяг</th>
                        <th>Мэргэжил</th>
                        <th>Устгах</th>

                    </tr>

                </thead>

                <tbody>
                        {mechanics.map((mechanic) => (
                            <tr key={mechanic.id}>
                            <td>
                                {editingId === mechanic.id ? (
                                <input
                                    value={editForm.name}
                                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                />
                                ) : (
                                mechanic.name
                                )}
                            </td>

                            <td>
                                {editingId === mechanic.id ? (
                                <input
                                    value={editForm.phone}
                                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                                />
                                ) : (
                                mechanic.phone
                                )}
                            </td>

                            <td>
                                {editingId === mechanic.id ? (
                                <input
                                    value={editForm.address}
                                    onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                                />
                                ) : (
                                mechanic.address
                                )}
                            </td>

                            <td>
                                {editingId === mechanic.id ? (
                                <input
                                    value={editForm.major}
                                    onChange={(e) => setEditForm({ ...editForm, major: e.target.value })}
                                />
                                ) : (
                                mechanic.major
                                )}
                            </td>

                            <td>
                                {editingId === mechanic.id ? (
                                <>
                                    <button onClick={() => saveEdit(mechanic.id)}>Хадгалах</button>
                                    <button onClick={cancelEdit}>Цуцлах</button>
                                </>
                                ) : (
                                <>
                                    <button onClick={() => handleDelete(mechanic.id)}>Устгах</button>
                                    <button onClick={() => startEdit(mechanic)}>Засах</button>
                                </>
                                )}
                            </td>
                            </tr>
                        ))}
                        </tbody>

            </table>


            <input
            placeholder="Нэр"
            value={name}
            onChange={(e) =>
                setName(e.target.value)
            }
        />

        <input
            placeholder="Утас"
            value={phone}
            onChange={(e) =>
                setPhone(e.target.value)
            }
        />

        <input
            placeholder="Хаяг"
            value={address}
            onChange={(e) =>
                setAddress(e.target.value)
            }
        />

        <input
            placeholder="Мэргэжил"
            value={major}
            onChange={(e) =>
                setMajor(e.target.value)
            }
        />

        <button
            onClick={handleSave}
        >
            Хадгалах
        </button>

        </div>

        
    );

    
}

export default AdminMechanics;
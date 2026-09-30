import { useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import "../styles/adminLogin.css";


function AdminLogin() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
 
    const isFormValid =
    username.trim() !== "" &&
    password.trim() != "" ;

    const handleLogin = async () => {

        if(!isFormValid) {

            alert("Бүх талбарыг зөв бөглөнө үү")

            return;
        }

        const response = await fetch(
            "http://localhost:8080/api/admin/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            }
        );


        const text = await response.text();

            console.log("Response:", text);

            if (!response.ok) {

            alert("Админ нэвтрэх нэр эсвэл нууц үг буруу байна");

            return;
        }

            const data = JSON.parse(text);

            localStorage.setItem(
                "admin",
                JSON.stringify(data)
            );

            navigate("/admin");

            console.log("Login success");
        
    };



    return (

        <div className="admin-container">
            <form
                    className="admin-card"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleLogin();
                    }}
                >

                
                <h1>Нэвтрэх</h1>
                <div className="admin-group">
                <label>
                    Нэвтрэх нэр
                </label>
                <input
                    type="text"
                    value={username}
                    placeholder="Нэвтрэх нэр"
                    onChange={(e) => setUsername(e.target.value)}
                />

                </div>

                    <div className="admin-group">

                        <label>
                            Нууц үг
                        </label>

                        <div className="password-wrapper">

                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                placeholder="Нууц үг"
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                            />

                        </div>

                    </div>

                

                <button
                    className="admin-btn"
                    type="submit"
                >
                    Нэвтрэх
                </button>

                <div className="ad-footer">
                    <Link to="/">
                         Нүүр хуудас руу буцах
                    </Link>

                </div>
            </form>
        </div>

    );
}

export default AdminLogin;
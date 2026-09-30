import { useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import "../styles/auth.css";
import {FaEye , FaEyeSlash } from "react-icons/fa"


function Login() {

    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
 
    const isFormValid =
    phone.trim() !== "" &&
    password.trim() != "" ;

    const handleLogin = async () => {

        if(!isFormValid) {

            alert("Бүх талбарыг зөв бөглөнө үү")

            return;
        }

        const response = await fetch(
            "http://localhost:8080/api/customers/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    phone: phone,
                    password: password
                })
            }
        );


        const text = await response.text();

            console.log("Response:", text);

            if (!text) {

                alert("Утасны дугаар эсвэл нууц үг буруу байна");
                return;
            }

            const data = JSON.parse(text);

            localStorage.setItem(
                "customer",
                JSON.stringify(data)
            );

            navigate("/");

            console.log("Login success");
        
    };



    return (

        <div className="auth-container">
            <form
                    className="auth-card"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleLogin();
                    }}
                >

                
                <h1>Нэвтрэх</h1>
                <div className="auth-group">
                <label>
                    Утасны дугаар
                </label>
                <input
                    type="text"
                    value={phone}
                    placeholder="утасны дугаар"
                    onChange={(e) => setPhone(e.target.value)}
                />

                </div>

                    <div className="auth-group">

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

                            <button
                                type="button"
                                tabIndex={-1}
                                className="eye-btn"
                                onClick={() =>
                                    setShowPassword(!showPassword)
                                }
                            >
                                {
                                    showPassword
                                        ? <FaEyeSlash /> : <FaEye />
                                }
                            </button>

                        </div>

                    </div>

                

                <button
                    className="auth-btn"
                    type="submit"
                >
                    Нэвтрэх
                </button>

                <div className="auth-footer">

                    <p>
                        Хэрэв та бүртгэлгүй бол {" "}
                        <Link to="/register" style={{textDecoration: 'underline'}}>
                        Бүртгүүлэх
                    </Link>
                    </p>

                    

                </div>
                <div className="auth-footer">
                    <Link to="/">
                         Нүүр хуудас руу буцах
                    </Link>

                </div>
            </form>
        </div>

    );
}

export default Login;
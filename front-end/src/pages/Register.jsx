import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {FaEye , FaEyeSlash} from "react-icons/fa";
import "../styles/auth.css"

function Register() {

        const [name, setName] = useState("");
        const [phone, setPhone] = useState("");
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [confirmPassword , setConfirmPassword] = useState("");
        const [showPassword, setShowPassword] = useState(false);
        const [showConfirmPassword, setShowConfirmPassword] = useState(false);

        const navigate = useNavigate();
        const isEmailValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

        const isPhoneValid = /^\d{8}$/.test(phone);

        const isFormValid =
        name.trim() !== "" &&
        phone.trim() !== "" &&
        isEmailValid &&
        password.trim() !== "" &&
        confirmPassword.trim() !== "" &&
        password === confirmPassword;

        const handleRegister = async () => {


            if (!name.trim()) {

                alert("Нэр оруулна уу");

                return;
            }

            if (!isPhoneValid) {

                alert("Утасны дугаар буруу байна");

                return;
            }

            if (!isEmailValid) {

                alert("Имэйл хаяг буруу байна");

                return;
            }

            if (password !== confirmPassword) {

                alert("Нууц үг таарахгүй байна");

                return;
                }


            if(!isFormValid) {

                alert("Бүх талбарыг зөв бөглөнө үү")

                return;
            }


            const response = await fetch(
                "http://localhost:8080/api/customers/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name,
                        phone,
                        email,
                        password
                    })
                }
            );   

            if (response.ok) {

            const data = await response.json();

            console.log(data);

            navigate("/verify", {
                state: { email }
            });

            } else {

            const error = await response.text();

            alert(error);

            console.log(error);
        }
};

        return (
            <div className="auth-container">
                <form
                    className="auth-card"
                    onSubmit={(e) => {e.preventDefault();
                        handleRegister();
                    }}
                >

            
                    <div className="auth-title">
                        <h1>Бүртгүүлэх</h1>
                    </div>
                    
                    <div className="auth-group"> 

                        <label>
                            Нэр
                        </label>

                        <input
                        type="text"
                        placeholder="Нэр"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    </div>
                    
                    <div className="auth-group">

                        <label>
                            Утасны дугаар
                        </label>

                        <input
                        type="text"
                        placeholder="Утас"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        />
                        {
                            phone && !isPhoneValid && (
                                <p className="error-text">
                                8 оронтой тоо байх ёстой.
                            </p>

                            )
                        }
                    

                    </div>
                    

                    <div className="auth-group">

                        <label>
                            И-Мэйл хаяг
                        </label>

                        <input
                        type="email"
                        placeholder="И-мэйл"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {
                        email &&
                        !isEmailValid && (
                            <p className="error-text">
                                Имэйл хаяг буруу байна
                            </p>
                        )
                    }

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
                            className="eye-btn"
                            tabIndex={-1}
                            onClick={() =>
                                setShowPassword(!showPassword)
                            }
                        >
                            {
                                showPassword
                                    ? <FaEyeSlash />
                                    : <FaEye />
                            }
                        </button>

                    </div>



                    </div>


                    <div className="auth-group">

                        <label>
                            Нууц үг давтах
                        </label>

                        <div className="password-wrapper">

                        <input
                            type={
                                showConfirmPassword
                                    ? "text"
                                    : "password"
                            }
                            value={confirmPassword}
                            placeholder="Нууц үг давтах"
                            onChange={(e) =>
                                
                                setConfirmPassword(e.target.value)
                            }
                        />

                        <button
                            type="button"
                            className="eye-btn"
                            tabIndex={-1}
                            onClick={() =>
                                setShowConfirmPassword(
                                    !showConfirmPassword
                                )
                            }
                        >
                            {
                                showConfirmPassword
                                    ? <FaEyeSlash />
                                    : <FaEye />
                            }
                        </button>

                    </div>

                        {
                            confirmPassword &&
                            password !== confirmPassword && (

                                <p className="error-text">
                                    Нууц үг таарахгүй байнаs
                                </p>

                            )
                        }

                    </div>

                    

                    <div>
                        <button
                            type= "submit"
                            className="auth-btn"
                        >
                            Бүртгүүлэх
                        </button>

                    </div>

                        

                        <div className="auth-footer">

                            <p>
                                Хэрэв та бүртгэлтэй бол{" "}
                                <Link to="/login" style={{textDecoration: 'underline'}}>
                                    Нэвтрэх.
                                </Link>
                            </p>

                            <Link  style={{textDecoration: 'underline'}}
                                className="auth-getBack"
                                to="/"
                            >
                                Нүүр хуудас руу буцах
                            </Link>

                        </div>
                    
                    </form>

            </div>
        );
    }


export default Register;
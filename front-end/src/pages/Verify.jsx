import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/verify.css";
import { useEffect } from "react";
import { useRef } from "react";

function Verify() {

    const location = useLocation();
    const navigate = useNavigate();

    const email = location.state?.email || "";

    const [code, setCode] = useState(["","","","","",""]);
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [timeLeft, setTimeLeft] = useState(60); 
    const inputRefs = useRef([]);

    const handleChange = (index, value) => {
        setIsError(false);

        if (!/^\d?$/.test(value))
            return;

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        if ( value && index < 5 ) {

                inputRefs.current[index + 1]?.focus();
        }
        const updatedCode = [...newCode];
        if (updatedCode.join("").length === 6 ){
            setTimeout(() => {
                handleVerify();
            }, 150);
        }
    };

    const handleKeyDown = (index, e) => {

        if (e.key === "Backspace" && !code[index] && index > 0)
            {
                inputRefs.current[index - 1]?.focus();
            }

        if (
            e.key === "Enter" &&
            code.join("").length === 6
        ) {
            handleVerify();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pasted = e.clipboardData
                .getData("text")
                .replace(/\D/g, "");

        if (pasted.length !== 6)
            return;

        setCode(pasted.split(""));
    };

    const handleVerify = async () => {

        setLoading(true);

        const response = await fetch(
            "http://localhost:8080/api/customers/verify",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    code: code.join("")
                })
            }
        );

        setLoading(false);

        if (response.ok) {

            setIsSuccess(true);

            setMessage(
                "Имэйл амжилттай баталгаажлаа."
            );

            setTimeout(() => {
                navigate("/login");
            }, 2000);

        } else {

            setIsError(true)

            setMessage(
                "Баталгаажуулах код буруу байна."
            );
        }
    };
            useEffect(() => {

                if(timeLeft <= 0)
                    return;

                const timer = setInterval(() => {

                    setTimeLeft(
                        prev => prev - 1
                    );

                },1000);

                return () =>
                    clearInterval(timer);

            },[timeLeft]);


            useEffect(()=>{
                inputRefs.current[0]?.focus();
            },[]);

            const handleResend = async () => {

        const response = await fetch(
            "http://localhost:8080/api/customers/resend-code",
            {
                method: "POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    email
                })
            }
        );

        if(response.ok){
            setTimeLeft(60);
            setMessage(
                "Шинэ код илгээгдлээ."
            );

        }
    };

    return (

        

        <div className="verify-container">

            <div className="verify-card">

                <h1>
                    Имэйл баталгаажуулах
                </h1>

                <p className="verify-text">
                    Баталгаажуулах код
                    <br />
                    <strong>{email}</strong>
                    хаяг руу илгээгдлээ.
                </p>

                <div className="verify-code">
                    {code.map((digit, index) => (
                        <input
                            key={index}
                            id={`code-${index}`}
                            ref={(el)=>inputRefs.current[index]=el}
                            className={isError ? "code-input error" : isSuccess  
                                                ? "code-input success" : "code-input"}
                            type="text"
                            maxLength="1"
                            value={digit}
                            onChange={(e) => handleChange(index, e.target.value)
                            }

                            onKeyDown={(e) => handleKeyDown(index,e)}
                            onPaste={handlePaste}
                        />
                    ))}
                </div>

                <button
                    className="verify-button"
                    onClick={handleVerify}
                    disabled={loading}
                >
                    {
                        loading ? "Баталгаажуулж байна..." : "Баталгаажуулах"
                    }

            
                    
                </button>

                <p className="verify-message">
                    {message}
                </p>

                <p className="timer">

                {timeLeft > 0 ? `Дахин илгээх боломжтой: ${timeLeft} сек`
                    : "Код ирээгүй юу?"}
                 </p>

                <button
                    className="resend-btn"
                    disabled={timeLeft > 0}
                    onClick={handleResend}
                >
                    Дахин код илгээх
                </button>

            </div>

        </div>

    );
}

export default Verify;
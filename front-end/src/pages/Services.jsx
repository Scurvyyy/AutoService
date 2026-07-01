import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/services.css"
import { useState } from "react";

function Services() {
    const [openService , setOpenService] = useState(null);


  return (
    <div>
        <Navbar/>

            <div className="services-page">
                    <h1 className="services-title">
                        Манай үйлчилгээ
                    </h1>



                    <div className="services-grid">

                        <div className="services-card" onClick={() => setOpenService
                            (openService === 1 ? null : 1)}> 
                            
                            <h2>Тос солих</h2>

                            <p>
                                Хөдөлгүүрийн тос болон шүүлтүүр солих үйлчилгээ.
                            </p>
                            {
                                openService === 1 && (
                                    <div className="service-details">
                                        <p>
                                            Хөдөлгүүрийн тос солих
                                        </p>

                                        <p>
                                            Моторын тос шүүлтүүр солих
                                        </p>

                                        <p>
                                            Моторын тосны түвшин шалгах
                                        </p>

                                        <p>
                                            Үнэ: 20,000₮
                                        </p>
                                    </div>
                                )
                            }
                            

                        </div>

                    </div>
                        
                    <div className="services-grid">
                        <div className="services-card" onClick={() => setOpenService
                            (openService === 1 ? null : 1)}>
                            <h2>Агергат засвар</h2>
                                <p>
                                    Хөдөлгүүр болон агрегатын засвар үйлчилгээ.
                                </p>
                                {
                                openService === 1 && (
                                    <div className="service-details">
                                        <p>
                                            Хөдөлгүүрийн тос солих
                                        </p>

                                        <p>
                                            Моторын тос шүүлтүүр солих
                                        </p>

                                        <p>
                                            Моторын тосны түвшин шалгах
                                        </p>

                                        <p>
                                            Үнэ: 20,000₮
                                        </p>
                                    </div>
                                )
                            }
                            
                        
                        </div>
                            
                    </div>
                        
                    <div className="services-grid">
                        <div className="services-card">
                            <h2>Тэнхлэг тохиргоо</h2>
                                <p>
                                    Тэнхлэгийн тохиргоо болон шалгалт.
                                </p>
                        </div>
                        

                    </div>

                    <div className="services-grid">
                        <div className="services-card">
                            <h2>Сэлбэг & компьтер оношилгоо</h2>
                                <p>
                                    Компьютер оношилгоо болон сэлбэг үйлчилгээ.
                                </p>
                        </div>
            
                    </div>
                    
            </div>
        
    </div>
  );
}

export default Services;
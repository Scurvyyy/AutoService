
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "../styles/adminReports.css";
import { useNavigate } from "react-router-dom";
import {
    BarChart, Bar, XAxis, YAxis,
    Tooltip, ResponsiveContainer, CartesianGrid
} from "recharts";

function AdminReports() {
    const [bookings, setBookings] = useState([]);
    const [parts, setParts] = useState([]);
    const [sales, setSales] = useState([]);
    const [selectedYear, setSelectedYear] = useState(2026);
    const navigate = useNavigate();
    
    

    useEffect(() => {
        fetch("http://localhost:8080/api/bookings")
            .then(res => res.json())
            .then(data => setBookings(data));

        fetch("http://localhost:8080/api/parts")
            .then(res => res.json())
            .then(data => setParts(data));

        fetch("http://localhost:8080/api/part-sales")
        .then(res => {
            if (!res.ok) { 
                throw new Error("Failed to fetch sales"); 
            }
            return res.json();
        })
        .then(data => {setSales(Array.isArray(data) ? data : []);
            })
        .catch(error => { console.error(error); 
            setSales([]);
        });

        }, []);


    const yearlyBookings = bookings.filter(booking => {
        if (!booking.date) return false;
        return new Date(booking.date).getFullYear() === selectedYear;
    });

    const yearlySales = sales.filter(sale => {
        if (!sale.soldAt) return false;
        return new Date(sale.soldAt).getFullYear() === selectedYear;
    });

    const completed = yearlyBookings.filter(
        booking => booking.status === "Completed"
    ).length;

    const totalPartsSold = yearlySales.reduce(
        (total, sale) => total + sale.quantity, 0
    );

    const totalRevenue = yearlySales.reduce(
        (total, sale) => total + sale.quantity * sale.unitPrice, 0
    );

    const monthlyData = Array.from({ length: 12 }, (_, index) => ({
        month: new Date(selectedYear, index).toLocaleString("en", {
            month: "short"
        }),
        completed: bookings.filter(booking => {
            if (booking.status !== "Completed" || !booking.date) {
                return false;
            }

            const date = new Date(booking.date);

            return !Number.isNaN(date.getTime()) &&
                date.getFullYear() === selectedYear &&
                date.getMonth() === index;
        }).length
        })
    );


    const monthlySalesData = Array.from({ length: 12 }, (_, index) => {
        const monthSales = sales.filter(sale => {
            if (!sale.soldAt) return false;

            const date = new Date(sale.soldAt);

            return !Number.isNaN(date.getTime()) &&
                date.getFullYear() === selectedYear &&
                date.getMonth() === index;
        });

        return {
            month: new Date(selectedYear, index).toLocaleString("en", {
                month: "short"
            }),
            sold: monthSales.reduce(
                (total, sale) => total + sale.quantity, 0
            ),
            revenue: monthSales.reduce(
                (total, sale) => total + sale.quantity * sale.unitPrice, 0
            )
        };
    });

    // тайлан excel рүү export хийх 
        const exportReport = () => {
        const rows = [
            ["Тайлангийн он", selectedYear],
            ["Нийт захиалга", yearlyBookings.length],
            ["Дууссан засвар", completed],
            ["Бүртгэлтэй сэлбэг", parts.length],
            ["Борлуулсан сэлбэг", totalPartsSold],
            ["Сэлбэгийн орлого (MNT)", totalRevenue],
            [],
            ["Сар", "Дууссан засвар", "Борлуулсан сэлбэг", "Орлого (MNT)"],
            ...monthlyData.map((item, index) => [
                item.month,
                item.completed,
                monthlySalesData[index].sold,
                monthlySalesData[index].revenue
            ])
        ];

        const csv = "\uFEFF" + rows
            .map(row => row.join(","))
            .join("\r\n");

        const blob = new Blob([csv], {
            type: "text/csv;charset=utf-8;"
        });

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.download = `auto-service-report-${selectedYear}.csv`;
        link.click();

        URL.revokeObjectURL(url);
    };
    const printReport = () => {
        window.print();
    };

    return (
        <div>
            <Navbar />
            

            <div className="reports-container">
                <h1>Тайлан, статистик</h1>
                <p>Авто засварын газрын үйл ажиллагааны тайлан</p>

                <div className="reports-filter">
                    <label htmlFor="report-year">Он сонгох:</label>
                    <select
                        id="report-year"
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(Number(e.target.value))}
                    >
                        {Array.from(
                            { length: new Date().getFullYear() - 2025 + 2 },
                            (_, i) => 2025 + i
                        ).map(year => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="reports-grid">
                    <div className="report-card">
                        <h3>Нийт захиалга</h3>
                        <h1>{yearlyBookings.length}</h1>
                    </div>

                    <div className="report-card">
                        <h3>Дууссан засвар</h3>
                        <h1>{completed}</h1>
                    </div>

                    <div className="report-card">
                        <h3>Бүртгэлтэй сэлбэг</h3>
                        <h1>{parts.length}</h1>
                    </div>
                    <div className="report-card">
                        <h3>Борлуулсан сэлбэг</h3>
                        <h1>{totalPartsSold}</h1>
                    </div>

                    <div className="report-card">
                        <h3>Сэлбэгийн борлуулалтын орлого</h3>
                        <h1>{totalRevenue.toLocaleString()}₮</h1>
                    </div>
                </div>

                <div className="reports-chart">
                    <h2>Сарын засварын статистик - {selectedYear}</h2>

                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={monthlyData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Bar
                                dataKey="completed"
                                name="Дууссан засвар"
                                fill="#dc2626"
                                radius={[5, 5, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>


                <div className="reports-chart">
                    <h2>Сарын сэлбэгийн борлуулалт - {selectedYear}</h2>

                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={monthlySalesData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Bar
                                dataKey="sold"
                                name="Борлуулсан сэлбэг"
                                fill="#dc2626"
                                radius={[5, 5, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="reports-chart">
                    <h2>Сарын сэлбэгийн орлого - {selectedYear}</h2>

                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={monthlySalesData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip formatter={(value) => `${Number(value).toLocaleString()}₮`} />
                            <Bar
                                dataKey="revenue"
                                name="Борлуулалтын орлого"
                                fill="#dc2626"
                                radius={[5, 5, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                
                <div className="reports-actions">
                    <button className="back-btn" onClick={() => navigate("/admin")} >
                        Буцах
                    </button>

                    <button className="export-btn" onClick={exportReport}>
                        Тайлан татах
                    </button>
                    <button className="print-btn" onClick={printReport}>
                        Тайлан хэвлэх
                    </button>
                </div>
            </div>
            
        </div>
        
    );
}

export default AdminReports;

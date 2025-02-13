import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css"; // Make sure to import the CSS file

const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-header">Welcome to your Dashboard</h1>
            <button className="logout-button" onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
};

export default Dashboard;

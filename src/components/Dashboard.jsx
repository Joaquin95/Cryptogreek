const Dashboard = () => {
    return (
        <div>
            <h1>Welcome to your Dashboard</h1>
            <button onClick={() => { localStorage.removeItem('token'); navigate('/login'); }}>Logout</button>
        </div>
    );
};

export default Dashboard;

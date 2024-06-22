import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h2>Welcome to Our Restaurant</h2>
            <p>
                <Link to="/menu">Browse Menu</Link>
            </p>
            <p>
                <Link to="/order">Place Order</Link>
            </p>
            <p>
                <Link to="/track">Track Order</Link>
            </p>
            <p>
                <Link to="/login">Admin Login</Link>
            </p>
        </div>
    );
};

export default Home;

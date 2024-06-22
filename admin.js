import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Admin = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios.get('/api/menu')
            .then(response => setMenuItems(response.data))
            .catch(error => console.error('Error fetching menu:', error));
        axios.get('/api/orders')
            .then(response => setOrders(response.data))
            .catch(error => console.error('Error fetching orders:', error));
    }, []);

    const handleMenuChange = (item, updatedItem) => {
        axios.put(`/api/menu/${item.id}`, updatedItem)
            .then(response => {
                setMenuItems(menuItems.map(i => i.id === item.id ? response.data : i));
            })
            .catch(error => console.error('Error updating menu item:', error));
    };

    return (
        <div>
            <h2>Admin Dashboard</h2>
            <h3>Manage Menu</h3>
            {menuItems.map(item => (
                <div key={item.id}>
                    <input
                        type="text"
                        value={item.name}
                        onChange={e => handleMenuChange(item, { ...item, name: e.target.value })}
                    />
                    <input
                        type="text"
                        value={item.description}
                        onChange={e => handleMenuChange(item, { ...item, description: e.target.value })}
                    />
                    <input
                        type="number"
                        value={item.price}
                        onChange={e => handleMenuChange(item, { ...item, price: parseFloat(e.target.value) })}
                    />
                </div>
            ))}
            <h3>Manage Orders</h3>
            {orders.map(order => (
                <div key={order.id}>
                    <h4>Order #{order.id}</h4>
                    <p>Status: {order.status}</p>
                    <p>Total: ${order.total.toFixed(2)}</p>
                </div>
            ))}
        </div>
    );
};

export default Admin;

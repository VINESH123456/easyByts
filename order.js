import React, { useState } from 'react';
import axios from 'axios';

const Order = () => {
    const [order, setOrder] = useState([]);

    const placeOrder = () => {
        axios.post('/api/order', { items: order })
            .then(response => {
                console.log('Order placed:', response.data);
            })
            .catch(error => console.error('Error placing order:', error));
    };

    return (
        <div>
            <h2>Your Order</h2>
            {order.map((item, index) => (
                <div key={index}>
                    <h3>{item.name}</h3>
                    <p>${item.price.toFixed(2)}</p>
                </div>
            ))}
            <button onClick={placeOrder} disabled={order.length === 0}>Place Order</button>
        </div>
    );
};

export default Order;

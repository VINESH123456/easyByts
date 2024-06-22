import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderTracking = () => {
    const [orderStatus, setOrderStatus] = useState(null);
    const [orderId, setOrderId] = useState('');

    const trackOrder = () => {
        axios.get(`/api/order/${orderId}`)
            .then(response => setOrderStatus(response.data))
            .catch(error => console.error('Error tracking order:', error));
    };

    return (
        <div>
            <h2>Track Your Order</h2>
            <input
                type="text"
                value={orderId}
                onChange={e => setOrderId(e.target.value)}
                placeholder="Enter your order ID"
            />
            <button onClick={trackOrder}>Track Order</button>
            {orderStatus && (
                <div>
                    <h3>Status: {orderStatus.status}</h3>
                    <p>Estimated delivery time: {orderStatus.estimatedDeliveryTime}</p>
                </div>
            )}
        </div>
    );
};

export default OrderTracking;

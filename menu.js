import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Menu = () => {
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        axios.get('/api/menu')
            .then(response => setMenuItems(response.data))
            .catch(error => console.error('Error fetching menu:', error));
    }, []);

    const addToOrder = (item) => {
        console.log('Add to order:', item);
    };

    return (
        <div>
            <h2>Menu</h2>
            {menuItems.map(item => (
                <div key={item.id} className="menu-item">
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <p>${item.price.toFixed(2)}</p>
                    <button onClick={() => addToOrder(item)}>Add to Order</button>
                </div>
            ))}
        </div>
    );
};

export default Menu;

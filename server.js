const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

// Dummy data
let menuItems = [
    { id: 1, name: 'Pizza', description: 'Delicious cheese pizza', price: 9.99 },
    { id: 2, name: 'Burger', description: 'Juicy beef burger', price: 7.99 },
];

let orders = [];
let users = [{ id: 1, email: 'admin@example.com', password: bcrypt.hashSync('password', 8) }];

// Middleware for verifying token
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, 'supersecret', (err, decoded) => {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        req.userId = decoded.id;
        next();
    });
};

// Routes
app.post('/api/login', (req, res) => {
    const user = users.find(u => u.email === req.body.email);
    if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
        return res.status(401).send({ token: null });
    }

    const token = jwt.sign({ id: user.id }, 'supersecret', { expiresIn: 86400 });
    res.status(200).send({ token });
});

app.get('/api/menu', (req, res) => {
    res.status(200).send(menuItems);
});

app.put('/api/menu/:id', verifyToken, (req, res) => {
    const item = menuItems.find(i => i.id === parseInt(req.params.id));
    if (item) {
        Object.assign(item, req.body);
        res.status(200).send(item);
    } else {
        res.status(404).send({ message: 'Item not found' });
    }
});

app.post('/api/order', (req, res) => {
    const newOrder = { id: orders.length + 1, items: req.body.items, status: 'Pending', total: req.body.items.reduce((sum, item) => sum + item.price, 0) };
    orders.push(newOrder);
    res.status(201).send(newOrder);
});

app.get('/api/order/:id', (req, res) => {
    const order = orders.find(o => o.id === parseInt(req.params.id));
    if (order) {
        res.status(200).send(order);
    } else {
        res.status(404).send({ message: 'Order not found' });
    }
});

app.get('/api/orders', verifyToken, (req, res) => {
    res.status(200).send(orders);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

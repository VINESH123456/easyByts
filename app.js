import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Menu from './components/Menu';
import Order from './components/Order';
import OrderTracking from './components/OrderTracking';
import Login from './components/Login';
import Admin from './components/Admin';

function App() {
    return (
        <Router>
            <div>
                <header>
                    <h1>Restaurant Ordering System</h1>
                </header>
                <div className="container">
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/menu" component={Menu} />
                        <Route path="/order" component={Order} />
                        <Route path="/track" component={OrderTracking} />
                        <Route path="/login" component={Login} />
                        <Route path="/admin" component={Admin} />
                    </Switch>
                </div>
            </div>
        </Router>
    );
}

export default App;

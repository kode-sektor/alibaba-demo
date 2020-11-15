import Header from './Header'
import Home from './Home'
import Checkout from './Checkout'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import './App.css';

function App() {
    return (
        <Router>
            <div className="app">
                <Switch>
                    <Route path="/checkout">
                        <Checkout />
                    </Route>
                    <Route path="/">
                        <Header />
                        <Home />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;

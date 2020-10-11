import React from 'react';
import './App.css';
import UserComponent from "./components/UserComponent";
import HealthComponent from "./components/HealthComponent";
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";

function App() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/" component={UserComponent} />
                    <Route path="/health" component={HealthComponent} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;

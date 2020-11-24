import React from 'react';
import Auth from 'views/Auth';
import Dialog from 'components/PromptDialog';
import Customer from 'views/Customer';
import {
    HashRouter as Router,
    Switch,
    Route
} from "react-router-dom";

function App() {
    return <div>
        <Router>
            <Switch>
                <Route exact path="/login" component={Auth} />
                <Route path="/" component={Customer}/>
            </Switch>
        </Router>
        <Dialog />
    </div>;
}

export default App;
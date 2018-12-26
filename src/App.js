import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import Home from './pages/Home';
import Detail from './pages/Detail';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Forbidden from './pages/Forbidden';
import store from './configs';

class App extends Component {
    
    render() {
        return (
            <Provider store={ store }>
                <div className="App">
                    <Router>
                        <Switch>
                            <Route exact path='/' component={Login} />
                            <Route path='/detail/:id' component={Detail} />
                            <Route path='/home' component={Home} />
                            <Route path='/403' component={Forbidden} />
                            <Route component={NotFound} />
                        </Switch>
                    </Router>
                </div>
            </Provider>
        );
    }
}

export default App;
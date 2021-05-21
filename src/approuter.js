import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AppContainer from './appcontainer.js';
import {createBrowserHistory} from 'history'
const  history= createBrowserHistory()
const AppRouter = (props) => {
    
    return(
        <>
            <Router  history={history}>
                <Route render={(props)=> <AppContainer {...props}/>} />
            </Router>
        </>
    );
    
}


export default AppRouter;
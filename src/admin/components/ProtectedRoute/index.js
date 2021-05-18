import React from 'react';
import {Route, Redirect} from 'react-router-dom';

function ProtectedRoute({
    component: Component,
    isAuth: isAuth,
    logout: logout,
    ...rest
}) {
    return (
        <Route
            {...rest}
            render={(props)=>{
                if(isAuth) {
                    return <Component logout={logout}/>
                } else {
                    return (
                        <Redirect to={{ pathname: '/admin', state: { from : props.location }}}/>
                    )
                }
            }}
        />

    );
}

export default ProtectedRoute;
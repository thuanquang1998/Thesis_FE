
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';

const PrivateRoute = ({component: Component,...rest}) => {
    const patient = useSelector(state=> state.patient);
    const { isLoggedIn } = patient;
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            isLoggedIn ?
                <Component {...props} />
            : <Redirect to="/dang-nhap" />
        )} />
    );
};

export default PrivateRoute;
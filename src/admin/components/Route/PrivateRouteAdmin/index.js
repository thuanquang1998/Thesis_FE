
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';

const PrivateRouteAdmin = ({component: Component, path, exact}) => {
    const admin = useSelector(state=> state.admin);
    const { isAdminLoggedIn } = admin;
    return (
        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        isAdminLoggedIn?
        (<Route  path={path}  exact={exact} component={Component} />)
        :
        (<Redirect  to="/admin/dang-nhap"  />) 
    );
};

export default PrivateRouteAdmin;
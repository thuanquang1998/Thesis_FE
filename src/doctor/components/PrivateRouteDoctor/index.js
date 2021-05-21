
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';

const PrivateRouteDoctor = ({component: Component, path, exact}) => {
    const admin = useSelector(state=> state.admin);
    const { isAdminLoggedIn } = admin;
    return (
        isAdminLoggedIn?
        (<Route  path={path}  exact={exact} component={Component} />)
        :
        (<Redirect  to="/quan-li/dang-nhap"  />) 
    );
};

export default PrivateRouteDoctor;
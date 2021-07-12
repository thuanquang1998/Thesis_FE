
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';

const PrivateRouteDoctor = ({component: Component, path, exact}) => {
    const doctor = useSelector(state=> state.doctor);
    const { isDoctorLoggedIn } = doctor;
    return (
        isDoctorLoggedIn?
        (<Route  path={path}  exact={exact}  render={() => <Component doctorData={doctor}/>}  />)
        :
        (<Redirect  to="/quan-li/dang-nhap"  />) 
    );
};

export default PrivateRouteDoctor;
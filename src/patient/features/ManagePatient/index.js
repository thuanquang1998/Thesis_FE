import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { Box } from '@material-ui/core';
import PatientInfo from './pages/PatientInfo';
import PatientSchedule from './pages/PatientSchedule';

function ManagePatient(props) {
    const match = useRouteMatch();
    return (
        <Box pt={4}>
            <Switch>
                <Route path={match.url} component={PatientInfo} exact></Route>
                <Route path={`${match.url}/lich-kham`} component={PatientSchedule}></Route>
            </Switch>
        </Box>
    );
}

export default ManagePatient;
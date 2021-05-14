import React from "react";
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import Admin from './admin/appAdmin'
import AppDoctor from "./doctor/appDoctor";
import AppPatient from "./patient/appPatient";

const AppContainer = function (props) {
  if (props) {
    const url = props.location.pathname.split("/")[1];
    return (
      <Router>
        { url === 'admin' ? 
          (
            <>
              <Switch>
                <Route path="/admin" component={Admin} />
              </Switch>
            </>
          )
          :
          (
            <>
              <AppPatient/>
            </>
          )
        }
      </Router>
    )
  }
  return null;
}

export default AppContainer;


// { url ==='admin' &&  
// <>
//   <Switch>
//     <Route path="/admin" component={Admin} />
//   </Switch>
// </>
// }
// { url ==='doctor' &&  
// <>
//   <Switch>
//     <Route  path="/doctor" component={AppDoctor} />
//   </Switch>
// </>
// }
// {/* routes for client */}
// { url ==='patient' &&  
// <>
//   <Switch>
//     <Route path="/patient" component={AppPatient} />
//   </Switch>
// </>
// }
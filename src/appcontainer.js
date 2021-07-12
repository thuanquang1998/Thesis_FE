import React from "react";
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import AppAdmin from './admin/appAdmin'
import AppDoctor from "./doctor/appDoctor";
import AppPatient from "./patient/appPatient";

import Actions from './redux/actions/index';

const AppContainer = function (props) {
  console.log('props AppContainer:>> ', props);
  console.log('Actions AppContainer:>> ', Actions);
  if (props) {
    const url = props.location.pathname.split("/")[1];
    return (
      <Router>
        { url === 'admin' ? 
          (
            <>
              <Switch>
                <Route path="/admin" component={AppAdmin} />
              </Switch>
            </>
          )
          :
          (  url === 'bac-si'? 
            <>
              <Switch>
                <Route path="/bac-si" component={AppDoctor} />
              </Switch>
            </>
            :<>
              <AppPatient/>
            </>
          )
          // :(
            
          // )
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
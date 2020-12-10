import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

// telas
import Landing from './pages/Landing';
import NursingHomesMap from './pages/NursingHomesMap';
import NursingHome from './pages/NursingHome';
import CreateNursingHomes from './pages/CreateNursingHomes';

// rotas das telas
function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing}/>
                <Route path="/app" component={NursingHomesMap}/>

                <Route path="/nursinghomes/create" component={CreateNursingHomes}/>
                <Route path="/nursinghomes/:id" component={NursingHome}/>
            </Switch>
        </BrowserRouter>
    )   
}

export default Routes;
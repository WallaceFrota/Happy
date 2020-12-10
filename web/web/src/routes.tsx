import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

// telas
import Landing from './pages/Landing';
import OrphanagesMap from './pages/OrphanagesMap';

// rotas das telas
function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing}/>
                <Route path="/orphanages" component={OrphanagesMap}/>
            </Switch>
        </BrowserRouter>
    )   
}

export default Routes;
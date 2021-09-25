// router
import { Route, Switch, Redirect } from 'react-router-dom'

// components
import DrugDetails from './components/DrugDetails/DrugDetails';
import DrugSearch from './components/DrugSearch/DrugSearch';

const App = () => {
  return (
    <div>
      <Switch>
        <Route path="/drugs/search" component={ DrugSearch }/>
        <Route path="/drugs/:id" component={ DrugDetails }/>
        <Route render={() => <Redirect to="/drugs/search"/> }/>
      </Switch>
    </div>
  );
}

export default App;

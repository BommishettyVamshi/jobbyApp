import {Switch, Route} from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Jobs from './pages/Jobs'
import JobItemDetails from './pages/JobItemDetails'
import NotFound from './pages/NotFound'

import './App.css'

const App = () => (
  <>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/" component={Home} />
      <Route exact path="/jobs" component={Jobs} />
      <Route exact path="/jobs/:id" component={JobItemDetails} />
      <Route component={NotFound} />
    </Switch>
  </>
)

export default App

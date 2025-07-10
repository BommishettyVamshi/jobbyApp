import {Switch, Route} from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Jobs from './pages/Jobs'
import JobItemDetails from './pages/JobItemDetails'
import NotFound from './pages/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

const App = () => (
  <>
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/jobs" component={Jobs} />
      <ProtectedRoute exact path="/jobs/:id" component={JobItemDetails} />
      <Route component={NotFound} />
    </Switch>
  </>
)

export default App

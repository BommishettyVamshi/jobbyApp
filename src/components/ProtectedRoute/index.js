import {Redirect, Route} from 'react-router-dom'
import {isAuthenticated} from '../../utils/auth'

const ProtectedRoute = props => {
  if (!isAuthenticated()) {
    return <Redirect to="/login" />
  }
  return <Route {...props} />
}

export default ProtectedRoute

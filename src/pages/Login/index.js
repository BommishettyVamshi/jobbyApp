import {Component} from 'react'
import {WEBSITE_LOGO_URL, API_STATUS_CONSTANTS} from '../../utils/constants'
import {setToken} from '../../utils/auth'
import {loginUser} from '../../services/api'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showErrorMessage: false,
    errorMessage: '',
  }

  changeUsername = event => {
    this.setState({
      username: event.target.value,
    })
  }

  changePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  onSubmitLogin = async event => {
    const {username, password} = this.state

    event.preventDefault()

    this.setState({
      showErrorMessage: false,
      errorMessage: '',
    })

    const loginResult = await loginUser(username, password)

    if (loginResult.status === API_STATUS_CONSTANTS.success) {
      const {history} = this.props
      setToken(loginResult.data)
      history.replace('/')
    } else if (loginResult.status === API_STATUS_CONSTANTS.failure) {
      this.setState({
        showErrorMessage: true,
        errorMessage: loginResult.data,
      })
    } else {
      this.setState({
        showErrorMessage: true,
        errorMessage: loginResult.data,
      })
    }
  }

  render() {
    const {username, password, showErrorMessage, errorMessage} = this.state

    return (
      <div className="login-container">
        <div className="login-card">
          <div className="logo-card">
            <img
              src={WEBSITE_LOGO_URL}
              className="website-logo"
              alt="website logo"
            />
          </div>
          <form className="login-form-card" onSubmit={this.onSubmitLogin}>
            <div className="input-card">
              <label htmlFor="username" className="label-field">
                USERNAME
              </label>
              <input
                type="text"
                value={username}
                placeholder="Username"
                id="username"
                className="input-field"
                onChange={this.changeUsername}
              />
            </div>
            <div className="input-card">
              <label htmlFor="password" className="label-field">
                PASSWORD
              </label>
              <input
                type="password"
                value={password}
                placeholder="Password"
                id="password"
                className="input-field"
                onChange={this.changePassword}
              />
            </div>
            <div className="error-submit-button-container">
              <button type="submit" className="login-submit-button">
                Login
              </button>
              {showErrorMessage && (
                <p className="error-msg">{`*${errorMessage}`}</p>
              )}
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Login

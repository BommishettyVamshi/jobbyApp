import {Link, withRouter} from 'react-router-dom'
import {FaBriefcase, FaHome} from 'react-icons/fa'
import {FiLogOut} from 'react-icons/fi'
import {WEBSITE_LOGO_URL} from '../../utils/constants'
import {logOutUser} from '../../services/api'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    logOutUser()
    const {history} = props
    history.replace('/login')
  }

  return (
    <div className="header-container">
      <div className="header-lg-container">
        <Link to="/" className="logo-card">
          <img
            src={WEBSITE_LOGO_URL}
            className="header-website-logo"
            alt="website logo"
          />
        </Link>
        <ul className="items-list-card">
          <Link to="/" className="item">
            <li>Home</li>
          </Link>
          <Link to="/jobs" className="item">
            <li>Jobs</li>
          </Link>
        </ul>
        <button type="button" className="logout-button" onClick={onClickLogout}>
          Logout
        </button>
      </div>
      <div className="header-sm-container">
        <div className="logo-card">
          <img
            src={WEBSITE_LOGO_URL}
            className="header-website-logo"
            alt="website logo"
          />
        </div>
        <ul className="items-sm-card">
          <Link to="/">
            <li>
              <FaHome className="icon" />
            </li>
          </Link>
          <Link to="/jobs">
            <li>
              <FaBriefcase className="icon" />
            </li>
          </Link>
        </ul>
        <button
          type="button"
          className="logout-sm-button"
          onClick={onClickLogout}
        >
          <FiLogOut className="icon" />
        </button>
      </div>
    </div>
  )
}

export default withRouter(Header)

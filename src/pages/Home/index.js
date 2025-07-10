import {Redirect} from 'react-router-dom'
import {isAuthenticated} from '../../utils/auth'
import Header from '../../components/Header'

import './index.css'

const Home = props => {
  const {location} = props
  if (!isAuthenticated() && location.path === '/login') {
    return <Redirect to="/" />
  }

  const onClickFindJobs = () => {
    const {history} = props
    history.push('/jobs')
  }

  return (
    <div className="home-container">
      <Header />
      <div className="home-details-container">
        <div className="home-details-card">
          <h1 className="home-heading">Find The Job That Fits Your Life</h1>
          <p className="home-description">
            Millions of people are searching for jobs, salary, information,
            company reviews. Find the job that fits your abilities and
            potential.
          </p>
          <div className="home-button-card">
            <button
              type="button"
              className="home-jobs-button"
              onClick={onClickFindJobs}
            >
              Find Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home

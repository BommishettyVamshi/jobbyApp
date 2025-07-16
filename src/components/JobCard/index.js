import {Link, withRouter} from 'react-router-dom'
import {FaStar, FaBriefcase, FaMapMarkerAlt} from 'react-icons/fa'

import './index.css'

const JobCard = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails

  return (
    <Link
      to={{
        pathname: `/jobs/${id}`,
      }}
      className="link-item"
    >
      <li className="job-card">
        <div className="card-1">
          <img
            src={companyLogoUrl}
            className="company-logo"
            alt="company logo"
          />
          <div className="details-card">
            <h1 className="job-title">{title}</h1>
            <div className="rating-card">
              <FaStar className="star-icon" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="card-2">
          <div className="sub-card-1">
            <div className="sub-card-2">
              <div className="location-card">
                <FaMapMarkerAlt className="location-icon" />
                <p className="location">{location}</p>
              </div>
              <div className="employment-type-card">
                <FaBriefcase className="job-icon" />
                <p className="employment-type">{employmentType}</p>
              </div>
            </div>
            <p className="salary">{packagePerAnnum}</p>
          </div>
        </div>
        <hr className="horizontal-line" />
        <div className="job-description-card">
          <h1 className="job-description-heading">Description</h1>
          <p className="job-description">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default withRouter(JobCard)

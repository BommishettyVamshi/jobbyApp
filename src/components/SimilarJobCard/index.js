import {Link} from 'react-router-dom'
import {FaStar, FaBriefcase, FaMapMarkerAlt} from 'react-icons/fa'

import '../JobCard/index.css'
import './index.css'

const SimilarJobCard = props => {
  const {similarJobDetails} = props

  const {
    id,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similarJobDetails

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
            alt="similar job company logo"
          />
          <div className="details-card">
            <h1 className="job-title">{title}</h1>
            <div className="rating-card">
              <FaStar className="star-icon" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="job-description-card">
          <h1 className="job-description-heading">Description</h1>
          <p className="job-description">{jobDescription}</p>
        </div>
        <div className="sub-card-2 similar-card">
          <div className="location-card">
            <FaMapMarkerAlt className="location-icon" />
            <p className="location">{location}</p>
          </div>
          <div className="employment-type-card">
            <FaBriefcase className="job-icon" />
            <p className="employment-type">{employmentType}</p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default SimilarJobCard

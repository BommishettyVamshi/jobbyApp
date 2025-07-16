import {Component} from 'react'
import {
  FaStar,
  FaBriefcase,
  FaMapMarkerAlt,
  FaExternalLinkAlt,
} from 'react-icons/fa'
import Header from '../../components/Header'
import SimilarJobCard from '../../components/SimilarJobCard'
import DotLoader from '../../components/DotLoader'
import {fetchJobDetails} from '../../services/api'
import {API_STATUS_CONSTANTS} from '../../utils/constants'

import '../../components/JobCard/index.css'
import '../Jobs/index.css'
import './index.css'

class JobItemDetails extends Component {
  state = {
    status: API_STATUS_CONSTANTS.initial,
    jobDetails: {},
    similarJobs: [],
    title: 'loading...',
    skills: [],
    lifeAtCompany: {},
  }

  componentDidMount() {
    const {location} = this.props
    const {title} = location.state
    this.setState({title})
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({
      status: API_STATUS_CONSTANTS.inProgress,
      jobDetails: {},
      similarJobs: [],
      skills: [],
      lifeAtCompany: {},
    })

    const {match} = this.props
    const {id} = match.params
    const result = await fetchJobDetails(id)

    if (result.status === API_STATUS_CONSTANTS.success) {
      const {formattedJobDetails, formattedSimilarJobs} = result.data
      this.setState({
        status: API_STATUS_CONSTANTS.success,
        jobDetails: formattedJobDetails,
        similarJobs: formattedSimilarJobs,
        skills: formattedJobDetails.skills,
        lifeAtCompany: formattedJobDetails.lifeAtCompany,
      })
    } else {
      this.setState({
        status: API_STATUS_CONSTANTS.failure,
        jobDetails: {},
        similarJobs: [],
        skills: [],
        lifeAtCompany: {},
      })
    }
  }

  onRetry = () => {
    this.getJobDetails()
  }

  renderJobDetailsSuccess = () => {
    const {jobDetails, similarJobs, title, skills, lifeAtCompany} = this.state

    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
    } = jobDetails

    const {description, imageUrl} = lifeAtCompany

    return (
      <div className="jobDetails-bottom-container">
        <div className="job-card">
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
              <h1 className="salary">{packagePerAnnum}</h1>
            </div>
          </div>
          <hr className="horizontal-line" />
          <div className="job-description-card">
            <div className="job-description-sub-card">
              <h1 className="job-description-heading">Description</h1>
              <div className="visit-card">
                <a
                  href={companyWebsiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="visit-item"
                >
                  Visit
                </a>
                <FaExternalLinkAlt className="visit-icon" />
              </div>
            </div>
            <p className="job-description">{jobDescription}</p>
          </div>
          <div className="skills-life-at-company-container">
            <div className="skills-container">
              <h1 className="job-description-heading">Skills</h1>
              <ul className="skills-list-card">
                {skills.map(each => (
                  <li className="skill-card" key={each.name}>
                    <img
                      src={each.imageUrl}
                      className="skill-image"
                      alt={each.name}
                    />
                    <p className="skill-name">{each.name}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="life-at-company-container">
              <h1 className="job-description-heading">Life at Company</h1>
              <div className="life-at-company-card">
                <p className="job-description">{description}</p>
                <div className="life-at-company-image-card">
                  <img
                    src={imageUrl}
                    className="life-at-company-image"
                    alt="life at company"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="similar-jobs-container">
          <h1 className="job-description-heading">Similar Jobs</h1>
          <ul className="similar-jobs-list-card">
            {similarJobs.map(each => (
              <SimilarJobCard similarJobDetails={each} key={each.id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderJobDetailsFailure = () => (
    <div className="jobs-failure-card">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        className="failure-image"
        alt="failure view"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you’re looking for.
      </p>
      <button
        type="button"
        className="profile-failure-button"
        onClick={this.onRetry}
      >
        Retry
      </button>
    </div>
  )

  renderLoader = () => (
    <div className="jobs-loader-container">
      <DotLoader />
    </div>
  )

  renderJobDetails = () => {
    const {status} = this.state
    switch (status) {
      case API_STATUS_CONSTANTS.success:
        return this.renderJobDetailsSuccess()
      case API_STATUS_CONSTANTS.failure:
        return this.renderJobDetailsFailure()
      case API_STATUS_CONSTANTS.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="jobdetails-container">
        <Header />
        {this.renderJobDetails()}
      </div>
    )
  }
}

export default JobItemDetails

import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'

import Header from '../../components/Header'
import Profile from '../../components/Profile'
import DotLoader from '../../components/DotLoader'
import EmploymentTypeFilter from '../../components/EmploymentTypeFilter'
import SalaryRangeFilter from '../../components/SalaryRangeFilter'
import JobCard from '../../components/JobCard'

import {API_STATUS_CONSTANTS} from '../../utils/constants'
import {fetchJobs} from '../../services/api'

import '../../components/Profile/index.css'
import './index.css'

class Jobs extends Component {
  state = {
    jobStatus: API_STATUS_CONSTANTS.initial,
    searchInput: '',
    employmentTypeList: [],
    minimumPackage: '',
    jobsList: [],
    message: '',
    isMobile: null,
  }

  componentDidMount() {
    this.getJobs()
    this.updateViewport()
    window.addEventListener('resize', this.updateViewport)
  }

  updateViewport = () => {
    const isMobile = window.innerWidth <= 768
    this.setState({isMobile})
  }

  getJobs = async () => {
    this.setState({
      jobStatus: API_STATUS_CONSTANTS.inProgress,
      jobsList: [],
      message: '',
    })

    const {searchInput, employmentTypeList, minimumPackage} = this.state

    const result = await fetchJobs(
      employmentTypeList,
      minimumPackage,
      searchInput,
    )

    if (result.status === API_STATUS_CONSTANTS.success) {
      const {data} = result
      const {formattedJobs} = data
      this.setState({
        jobStatus: API_STATUS_CONSTANTS.success,
        jobsList: formattedJobs,
      })
    } else if (result.status === API_STATUS_CONSTANTS.noJobs) {
      const {data} = result
      this.setState({
        jobStatus: API_STATUS_CONSTANTS.noJobs,
        message: data.message,
      })
    } else {
      const {data} = result
      this.setState({
        jobStatus: API_STATUS_CONSTANTS.failure,
        message: data.message,
      })
    }
  }

  changeEmploymentType = (employmentTypeId, checked) => {
    this.setState(
      prevState => ({
        employmentTypeList: checked
          ? [...prevState.employmentTypeList, employmentTypeId]
          : prevState.employmentTypeList.filter(
              each => each !== employmentTypeId,
            ),
      }),
      this.getJobs,
    )
  }

  changeSalaryRange = newPackage => {
    this.setState(
      {
        minimumPackage: newPackage,
      },
      this.getJobs,
    )
  }

  onChangeSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  onKeyDownSearchInput = event => {
    if (event.key === 'Enter') {
      this.getJobs()
    }
  }

  onClickSearch = () => {
    this.getJobs()
  }

  onRetry = () => {
    this.getJobs()
  }

  renderJobsSuccess = () => {
    const {jobsList} = this.state

    return (
      <ul className="jobs-list-container">
        {jobsList.map(each => (
          <JobCard jobDetails={each} key={each.id} />
        ))}
      </ul>
    )
  }

  renderJobsFailure = () => {
    const {message} = this.state
    return (
      <div className="jobs-failure-card">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          className="failure-image"
          alt="failure view"
        />
        <h1 className="failure-heading">{message}</h1>
        <p className="failure-description">
          We cannot seem to find the page you are looking for.
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
  }

  renderNoJobs = () => {
    const {message} = this.state
    return (
      <div className="nojobs-conatiner">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          className="nojobs-image"
          alt="no jobs"
        />
        <h1 className="failure-heading">{message}</h1>
        <p className="failure-description">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    )
  }

  renderLoarder = () => (
    <ul className="jobs-list-container">
      <div className="jobs-loader-container">
        <DotLoader />
      </div>
    </ul>
  )

  renderjobs = () => {
    const {jobStatus} = this.state
    switch (jobStatus) {
      case API_STATUS_CONSTANTS.success:
        return this.renderJobsSuccess()
      case API_STATUS_CONSTANTS.failure:
        return this.renderJobsFailure()
      case API_STATUS_CONSTANTS.noJobs:
        return this.renderNoJobs()
      case API_STATUS_CONSTANTS.inProgress:
        return this.renderLoarder()
      default:
        return null
    }
  }

  renderMobileView = () => {
    const {searchInput, minimumPackage, employmentTypeList} = this.state
    return (
      <div className="jobs-sm-container">
        <div className="jobs-sm-search-container">
          <div className="jobs-search-card">
            <input
              type="search"
              name="searchBar"
              value={searchInput}
              placeholder="Search"
              onChange={this.onChangeSearchInput}
              onKeyDown={this.onKeyDownSearchInput}
              className="search-input-field"
            />
            <button
              data-testid="searchButton"
              type="button"
              className="search-icon-button"
              onClick={this.onClickSearch}
            >
              <BsSearch className="search-icon" />
            </button>
          </div>
        </div>

        <div className="jobs-feature-container">
          <Profile />
          <hr className="jobs-filter-horizontal-line" />
          <EmploymentTypeFilter
            employmentTypeList={employmentTypeList}
            changeEmploymentType={this.changeEmploymentType}
          />
          <hr className="jobs-filter-horizontal-line" />
          <SalaryRangeFilter
            minimumPackage={minimumPackage}
            changeSalaryRange={this.changeSalaryRange}
          />
        </div>
        <div className="jobs-search-display-container">{this.renderjobs()}</div>
      </div>
    )
  }

  renderDesktopView = () => {
    const {searchInput, employmentTypeList, minimumPackage} = this.state
    return (
      <div className="jobs-lg-container">
        <div className="jobs-feature-container">
          <Profile />
          <hr className="jobs-filter-horizontal-line" />
          <EmploymentTypeFilter
            employmentTypeList={employmentTypeList}
            changeEmploymentType={this.changeEmploymentType}
          />
          <hr className="jobs-filter-horizontal-line" />
          <SalaryRangeFilter
            minimumPackage={minimumPackage}
            changeSalaryRange={this.changeSalaryRange}
          />
        </div>
        <div className="jobs-search-display-container">
          <div className="jobs-search-card">
            <input
              type="search"
              name="searchBar"
              value={searchInput}
              placeholder="Search"
              onChange={this.onChangeSearchInput}
              onKeyDown={this.onKeyDownSearchInput}
              className="search-input-field"
            />
            <button
              data-testid="searchButton"
              type="button"
              className="search-icon-button"
              onClick={this.onClickSearch}
            >
              <BsSearch className="search-icon" />
            </button>
          </div>
          {this.renderjobs()}
        </div>
      </div>
    )
  }

  render() {
    const {isMobile} = this.state
    return (
      <div className="jobs-container">
        <Header />
        {isMobile ? this.renderMobileView() : this.renderDesktopView()}
      </div>
    )
  }
}

export default Jobs

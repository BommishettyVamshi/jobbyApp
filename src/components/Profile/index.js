import {Component} from 'react'
import DotLoader from '../DotLoader'
import {API_STATUS_CONSTANTS} from '../../utils/constants'
import {fetchProfileDetails} from '../../services/api'

import './index.css'

class Profile extends Component {
  state = {
    status: API_STATUS_CONSTANTS.initial,
    profileData: {},
  }

  componentDidMount() {
    this.getProfileData()
  }

  getProfileData = async () => {
    this.setState({
      status: API_STATUS_CONSTANTS.inProgress,
      profileData: {},
    })

    const result = await fetchProfileDetails()
    const {profileDetails} = result
    if (Object.keys(profileDetails).length === 0) {
      this.setState({
        status: API_STATUS_CONSTANTS.failure,
        profileData: {},
      })
    } else {
      this.setState({
        status: API_STATUS_CONSTANTS.success,
        profileData: profileDetails,
      })
    }
  }

  onClickRetry = () => {
    this.getProfileData()
  }

  renderProfileSuccess = () => {
    const {profileData} = this.state
    const {name, profileImageUrl, shortBio} = profileData

    return (
      <div className="profile-success-container">
        <div>
          <img src={profileImageUrl} className="profile-image" alt="profile" />
          <h1 className="user-name">{name}</h1>
        </div>
        <p className="user-bio">{shortBio}</p>
      </div>
    )
  }

  renderProfileFailure = () => (
    <div className="profile-failure-container">
      <button
        type="button"
        className="profile-failure-button"
        onClick={this.onClickRetry}
      >
        Retry
      </button>
    </div>
  )

  renderLoader = () => (
    <div className="profile-loader-container">
      <DotLoader />
    </div>
  )

  render() {
    const {status} = this.state

    switch (status) {
      case API_STATUS_CONSTANTS.success:
        return this.renderProfileSuccess()
      case API_STATUS_CONSTANTS.failure:
        return this.renderProfileFailure()
      case API_STATUS_CONSTANTS.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }
}

export default Profile

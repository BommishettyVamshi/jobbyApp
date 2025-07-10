import {API_BASE_URL, API_STATUS_CONSTANTS} from '../utils/constants'

export const loginUser = async (username, password) => {
  try {
    const userCredentials = {username, password}
    const Url = `${API_BASE_URL}/login`
    const options = {
      method: 'POST',
      body: JSON.stringify(userCredentials),
    }
    const response = await fetch(Url, options)
    const data = await response.json()
    if (response.ok) {
      return {
        status: API_STATUS_CONSTANTS.success,
        data: data.jwt_token,
      }
    }
    return {
      status: API_STATUS_CONSTANTS.failure,
      data: data.error_msg,
    }
  } catch (error) {
    console.error('Login API failed:', error) // For debugging in console
    return {
      status: API_STATUS_CONSTANTS.failure,
      data: 'Something went wrong. Please try again later.',
    }
  }
}

export const hello = () => 'Hello'

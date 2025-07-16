import {API_BASE_URL, API_STATUS_CONSTANTS} from '../utils/constants'
import {getToken, removeToken} from '../utils/auth'

// logic of user login
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

// logging out the user
export const logOutUser = () => removeToken()

// logic of fetching the authenticated User profile details
export const fetchProfileDetails = async () => {
  const jwtToken = getToken()

  const url = `${API_BASE_URL}/profile`
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  }

  try {
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      const profileDetails = data.profile_details
      const formattedProfileDetails = {
        name: profileDetails.name,
        profileImageUrl: profileDetails.profile_image_url,
        shortBio: profileDetails.short_bio,
      }

      return {
        profileDetails: formattedProfileDetails,
      }
    }
    return {
      profileDetails: {},
    }
  } catch (error) {
    console.log(error)
    return {
      profileDetails: {},
    }
  }
}

// logic of fetching the jobs for the authenticated user
export const fetchJobs = async (
  employmentTypeList,
  minimumPackage,
  searchInput,
) => {
  const formattedEmploymentType = employmentTypeList.join(',') // employmentType is a array
  console.log(formattedEmploymentType)
  const jwtToken = getToken()
  const url = `${API_BASE_URL}/jobs?employment_type=${formattedEmploymentType}&minimum_package=${minimumPackage}&search=${searchInput}`
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  }

  try {
    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()

      if (
        !data ||
        Object.keys(data).length === 0 ||
        !Array.isArray(data.jobs)
      ) {
        return {
          status: API_STATUS_CONSTANTS.failure,
          data: {message: 'Oops! Something Went Wrong'},
        }
      }
      const {jobs, total} = data // jobs is a list

      if (jobs.length === 0) {
        return {
          status: API_STATUS_CONSTANTS.noJobs,
          data: {message: 'No Jobs Found'},
        }
      }

      const formattedJobs = jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))

      return {
        status: API_STATUS_CONSTANTS.success,
        data: {formattedJobs, total},
      }
    }
    return {
      status: API_STATUS_CONSTANTS.failure,
      data: {message: 'Oops! Something Went Wrong'},
    }
  } catch (error) {
    return {
      status: API_STATUS_CONSTANTS.failure,
      data: {message: 'Oops! Something Went Wrong'},
    }
  }
}

// logic for fecthing the job details of jobs of authenticated user
export const fetchJobDetails = async jobId => {
  const jwtToken = getToken()
  const url = `${API_BASE_URL}/jobs/${jobId}`
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  }

  try {
    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()

      if (!data || Object.keys(data).length === 0) {
        return {
          status: API_STATUS_CONSTANTS.failure,
          data: {message: 'Oops! Something Went Wrong'},
        }
      }

      const jobDetails = data.job_details

      if (!jobDetails || Object.keys(jobDetails).length === 0) {
        return {
          status: API_STATUS_CONSTANTS.failure,
          data: {message: 'Oops! Something Went Wrong'},
        }
      }

      const formattedJobDetails = {
        companyLogoUrl: jobDetails.company_logo_url,
        companyWebsiteUrl: jobDetails.company_website_url,
        employmentType: jobDetails.employment_type,
        id: jobDetails.id,
        jobDescription: jobDetails.job_description,
        skills: jobDetails.skills.map(each => ({
          imageUrl: each.image_url,
          name: each.name,
        })),
        lifeAtCompany: {
          description: jobDetails.life_at_company.description,
          imageUrl: jobDetails.life_at_company.image_url,
        },
        location: jobDetails.location,
        packagePerAnnum: jobDetails.package_per_annum,
        rating: jobDetails.rating,
      }

      const similarJobs = data.similar_jobs

      const formattedSimilarJobs = similarJobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        title: each.title,
      }))

      return {
        status: API_STATUS_CONSTANTS.success,
        data: {formattedJobDetails, formattedSimilarJobs},
      }
    }
    return {
      status: API_STATUS_CONSTANTS.failure,
      data: {message: 'Oops! Something Went Wrong'},
    }
  } catch (error) {
    return {
      status: API_STATUS_CONSTANTS.failure,
      data: {message: 'Oops! Something Went Wrong'},
    }
  }
}

// Implementing the logic for storing, accessing, removing the JWT token in cookies
// Logic for authentication

import Cookies from 'js-cookie'
import {TOKEN} from './constants'

export const setToken = jwtToken => Cookies.set(TOKEN, jwtToken, {expires: 30})

export const getToken = () => Cookies.get(TOKEN)

export const removeToken = () => Cookies.remove(TOKEN)

export const isAuthenticated = () => !!getToken()

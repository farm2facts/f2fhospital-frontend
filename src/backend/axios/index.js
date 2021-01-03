// here we give axios some global defaults and assign
// the Rails API URL as a constant which gets used
// in each request

import axios from 'axios'
const API_URL = 'http://localhost:3000'

// builds two wrappers around axios to do what we need
// passing through credentials that check against our CSRF tokens
// from Rails >> establish some logic on if the right criteria are
// met to log the user in and out, send the right data out etc.

const securedAxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

const plainAxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

securedAxiosInstance.interceptors.request.use(config => {
  const method = config.method.toUpperCase()
  if (method !== 'OPTIONS' && method !== 'GET') {
    config.headers = {
      ...config.headers,
      'X-CSRF-TOKEN': localStorage.csrf
    }
  }
  return config
})

securedAxiosInstance.interceptors.response.use(null, error => {
  if (error.response && error.response.config && error.response.status === 401) {
    // if 401 by expired access cookie, we do a refresh request
    return plainAxiosInstance.post('/refresh', {}, {headers: {'X-CSRF-TOKEN': localStorage.csrf}})
      .then(response => {
        localStorage.csrf = response.data.csrf
        localStorage.signedIn = true
        // after another successful refresh, repeat original request
        let retryConfig = error.response.config
        retryConfig.headers['X-CRSF-TOKEN'] = localStorage.csrf
        return plainAxiosInstance.request(retryConfig)
      }).catch(error =>{
        delete localStorage.csrf
        delete localStorage.signedIn
        // redirect to signin if refresh fails
        location.replace('/')
        return Promise.reject(error)
      })
  } else {
    return Promise.reject(error)
  }
})

export {securedAxiosInstance, plainAxiosInstance}


import axios from 'axios'
import NProgress from 'nprogress'
const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  timeout: 10000
})

// Axios interceptors act like middlemen (or middleare) allowing us to run some code when a request  is made or a response is received
apiClient.interceptors.request.use(config => { // this is called on request
  NProgress.start()
  return config
})
apiClient.interceptors.response.use(response => { // called on response
  NProgress.done()
  return response
})

export default {
  getEvents(perPage, page) {
    return apiClient.get('/events?_limit=' + perPage + '&_page=' + page)
  },
  getEvent(id) {
    return apiClient.get('/events/' + id)
  },
  postEvent(event) {
    return apiClient.post('/events', event)
  }
}

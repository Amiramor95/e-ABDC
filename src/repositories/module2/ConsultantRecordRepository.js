import axios from 'axios'

const base = '/api/module2'

export default {
  getConsultantRecord () {
    return axios.get(`${base}/consultant_records`)
  },
  getAllConsultantRecord () {
    return axios.get(`${base}/consultants`)
  },
  getFilterConsultantRecord () {
    return axios.get(`${base}/filter_consultant_record`)
  },
  getConsultantRecordByID (id) {
    return axios.get(`${base}/consultant_record`, id)
  },
  postConsultantRecord (data) {
    return axios.post(`${base}/consultant_record`, data)
  },
  postConsultantAppeal (data) {
    return axios.post(`${base}/appeals`, data)
      .catch(function (error) {
        if (error.response) {
        // Request made and server responded
          throw new Error(error.response.data.message)
        } else if (error.request) {
        // The request was made but no response was received
          console.log(error.request)
        } else {
        // Something happened in setting up the request that triggered an Error
          throw new Error(error.message)
        }
      })
  },
}

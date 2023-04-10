//
import axios from 'axios'

//* ******************* Authorization ********************/
export function header () {
  return axios.defaults.headers.common.Authorization =
       'Bearer ' + getToken()
}

function getToken () {
  const user = localStorage.getItem('user')
  console.log('access token :' + JSON.parse(user).access_token)
  return JSON.parse(user).access_token
}

//* *****************Report*******************/
export async function getReport (reportId) {
  await this.header()
  // return axios.get('/api/koolreport', {params: {
  //       REPORT_ID: reportId,
  //   }}).then(response => {
  //   return response.data
  // })
}

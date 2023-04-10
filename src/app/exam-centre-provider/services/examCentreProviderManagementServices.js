import axios from 'axios'
import Vue from 'vue'
import * as servicesModule0 from '../baseAuth'
import * as servicesModule1 from '../../module1/services'

const BASE_MODULE_PATH = '/api/module10/'

async function postAPI (path, data) {
  await servicesModule0.header()
  return axios.post(path, data).then(response => {
    Vue.$toast.open({
      message: response.data.message,
      type: 'success',
    })
    return response.data
  }).catch(function (error) {
    if (error.response) {
      Vue.$toast.open({
        message: error.response.data.message,
        type: 'error',
      })
      if (error.response.status == 401) {
        logout()
      } else {
        return 'error'
      }
    }
  })
}

export async function getAPI (path, params = {}) {
  await servicesModule0.header()
  return axios.get(path, {
    params: params,
  }).then(response => {
    console.log('data :' + JSON.stringify(response.data.data))
    return response.data.data
  }).catch(function (error) {
    if (error.response) {
      Vue.$toast.open({
        message: error.response.data.message,
        type: 'error',
      })
      if (error.response.status == 401) {
        logout()
      } else {
        return 'error'
      }
    }
  })
}

function processAPI (path, data, method = 'POST') {
  if (method === 'POST') {
    return postAPI(path, data)
  } else if (method === 'GET') {
    return getAPI(path, data)
  }
}

export async function createEscUser (data) {
  return axios.post(BASE_MODULE_PATH + 'create_user', data).then(response => {
    console.log(response.data)
    return response.data
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 500) {
        // console.log(JSON.stringify(error.response.data.message));
        if (error.response.data.message == 'Token expired.') {
          servicesModule0.logout()
        } else {
          console.log(error.response.data.message)
        }
      } else if (error.response.status == 401) {
        servicesModule0.logout()
      }
    }
  })
}

export async function verifyUser (data) {
  return axios.get('/api/module10/verify_user', {
    params: {
      username: data.username,
      USER_PASS_NUM: data.USER_PASS_NUM,
    },
  }).then(response => {
    localStorage.setItem('realmName', 'realm0')

    console.log('response=', response.data)
    return response.data
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 500) {
        // console.log(JSON.stringify(error.response.data.message));
        if (error.response.data.message == 'Token expired.') {
          console.log('logout')
          servicesModule0.logout()
        } else {
          console.log(error.response.data.message)
        }
      } else if (error.response.status == 401) {
        servicesModule0.logout()
      }
      return error.response
    }
  })
}

export async function updateSelfReg (data) {
  return axios.post('/api/module10/user_update', data).then(response => {
    console.log(response.data)
    return response.data
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status === 500) {
        // console.log(JSON.stringify(error.response.data.message));
        if (error.response.data.message === 'Token expired.') {
          console.log('logout')
          servicesModule0.logout()
        } else {
          console.log(error.response.data.message)
        }
      } else if (error.response.status === 401) {
        servicesModule0.logout()
      }
      return 'error'
    }
  })
}

export async function forgotPasswordEsc (data) {
  return axios.post('/api/module10/forgot_password_esc', data).then(response => {
    console.log(response.data)
    return response.data
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status === 500) {
        // console.log(JSON.stringify(error.response.data.message));
        if (error.response.data.message === 'Token expired.') {
          console.log('logout')
          servicesModule0.logout()
        } else {
          console.log(error.response.data.message)
        }
      } else if (error.response.status === 401) {
        servicesModule0.logout()
      }
      return 'error'
    }
  })
}

export async function checkDuplicateIC (data) {
  return axios.get('/api/module10/user_check_ic', {
    params: data,
  }).then(response => {
    localStorage.setItem('realmName', 'realm0')

    console.log('response=', response.data)
    return response.data
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 500) {
        // console.log(JSON.stringify(error.response.data.message));
        if (error.response.data.message == 'Token expired.') {
          console.log('logout')
          servicesModule0.logout()
        } else {
          console.log(error.response.data.message)
        }
      } else if (error.response.status == 401) {
        servicesModule0.logout()
      }
      return error.response
    }
  })
}

export async function checkDuplicateEmail (data) {
  return axios.get('/api/module10/user_check_email', {
    params: data,
  }).then(response => {
    localStorage.setItem('realmName', 'realm0')

    console.log('response=', response.data)
    return response.data
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 500) {
        // console.log(JSON.stringify(error.response.data.message));
        if (error.response.data.message == 'Token expired.') {
          console.log('logout')
          servicesModule0.logout()
        } else {
          console.log(error.response.data.message)
        }
      } else if (error.response.status == 401) {
        servicesModule0.logout()
      }
      return error.response
    }
  })
}

export async function checkDuplicateUserID (data) {
  return axios.get('/api/module10/user_check_userID', {
    params: data,
  }).then(response => {
    localStorage.setItem('realmName', 'realm0')

    console.log('response=', response.data)
    return response.data
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 500) {
        // console.log(JSON.stringify(error.response.data.message));
        if (error.response.data.message == 'Token expired.') {
          console.log('logout')
          servicesModule0.logout()
        } else {
          console.log(error.response.data.message)
        }
      } else if (error.response.status == 401) {
        servicesModule0.logout()
      }
      return error.response
    }
  })
}

export async function requestProfileUpdate (data) {
  return processAPI(BASE_MODULE_PATH + 'request_profile_update', data)
}

export async function getEscProfileById (data) {
  return processAPI(BASE_MODULE_PATH + 'get_esc_profile_by_id', data, 'GET')
}

export async function getAllCompanies (data) {
  return processAPI(BASE_MODULE_PATH + 'get_all_companies', data, 'GET')
}

export async function listAllProfile (data) {
  return processAPI(BASE_MODULE_PATH + 'list_all_profiles', data, 'GET')
}

export async function listProfileByGroupId (data) {
  return processAPI(BASE_MODULE_PATH + 'list_esc_profile_by_group_id', data, 'GET')
}

export async function getAllCentresByCentreMode (data) {
  return processAPI(BASE_MODULE_PATH + 'get_all_centres_by_centre_mode', data, 'GET')
}

export async function getCompanyUsersByCentreId (data) {
  return processAPI(BASE_MODULE_PATH + 'list_esc_users_by_centre_id', data, 'GET')
}

export async function approveEscProfile (data) {
  return processAPI(BASE_MODULE_PATH + 'approve_esc_profile', data)
}

export async function saveEscRoles (data) {
  return processAPI(BASE_MODULE_PATH + 'save_esc_roles', data)
}

export async function rejectEscProfile (data) {
  return processAPI(BASE_MODULE_PATH + 'reject_esc_profile', data)
}

export async function isGeneratedDateValid (data) {
  return processAPI(BASE_MODULE_PATH + 'is_conflicting_schedule', data, 'GET')
}

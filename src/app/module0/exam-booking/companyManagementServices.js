import axios from 'axios'
import Vue from 'vue'
import * as servicesModule0 from '../../module0/services'

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
    // console.log('data :' + JSON.stringify(response.data.data))
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

export async function createCompany (data) {
  return processAPI(BASE_MODULE_PATH + 'create_company', data)
}

export async function updateCompanyProfile (data) {
  return processAPI(BASE_MODULE_PATH + 'update_company_profile', data)
}

export async function reviewCompanyProfile (data) {
  return processAPI(BASE_MODULE_PATH + 'review_company_profile', data)
}

export async function returnCompanyProfile (data) {
  return processAPI(BASE_MODULE_PATH + 'return_company_profile', data)
}

export async function rejectCompanyProfile (data) {
  return processAPI(BASE_MODULE_PATH + 'reject_company_profile', data)
}

export async function approveCompanyProfile (data) {
  return processAPI(BASE_MODULE_PATH + 'approve_company_profile', data)
}

export async function listAllCompany (data) {
  return processAPI(BASE_MODULE_PATH + 'list_company', data, 'GET')
}

export async function getCompanyById (data) {
  return processAPI(BASE_MODULE_PATH + 'get_company_profile_by_id', data, 'GET')
}

export async function viewCompanyProfile (data) {
  return processAPI(BASE_MODULE_PATH + 'view_company_profile', data, 'GET')
}

export async function listCompanyProfileByGroupId (data) {
  return processAPI(BASE_MODULE_PATH + 'list_company_by_group_id', data, 'GET')
}

export async function getAuditLogByCompanyProfileId (data) {
  return processAPI(BASE_MODULE_PATH + 'get_audit_log_by_id', data, 'GET')
}

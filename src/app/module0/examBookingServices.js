import axios from 'axios'
import Vue from 'vue'
import * as servicesModule0 from '../module0/services'
import { TaskStatusConstants } from '../constants/TaskStatusConstants'

const BASE_MODULE_PATH = '/api/module10/'

export async function createExamTypeDetails (data) {
  await servicesModule0.header()
  return axios.post(BASE_MODULE_PATH + 'exam_type_details', data).then(response => {
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

export async function updateExamTypeDetails (data) {
  await servicesModule0.header()
  return axios.post(BASE_MODULE_PATH + 'update_exam_type_details', data).then(response => {
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

export async function listExamTypeDetails () {
  await servicesModule0.header()
  return axios.get(BASE_MODULE_PATH + 'exam_type_details').then(response => {
    // console.log('Record list :' + JSON.stringify(response.data.data));
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

export async function reviewExamTypeDetails (data) {
  await servicesModule0.header()
  return axios.post(BASE_MODULE_PATH + 'review_exam_type_details', data).then(response => {
    // console.log("exception create :" + JSON.stringify(response.data));
    Vue.$toast.open({
      message: response.data.message,
      type: 'success',
    })
    return response.data
  }).catch(function (error) {
    if (error.response) {
      if (error.response.status == 401) {
        logout()
      } else {
        return 'error'
      }
    }
  })
}

export async function approveExamTypeDetails (data) {
  await servicesModule0.header()
  return axios.post(BASE_MODULE_PATH + 'approve_exam_type_details', data).then(response => {
    // console.log("exception create :" + JSON.stringify(response.data));
    Vue.$toast.open({
      message: response.data.message,
      type: 'success',
    })
    return response.data
  }).catch(function (error) {
    if (error.response) {
      if (error.response.status == 401) {
        logout()
      } else {
        return 'error'
      }
    }
  })
}
async function postAPI (path, data) {
  await servicesModule0.header()
  return axios.post(path, data).then(response => {
    // console.log("exception create :" + JSON.stringify(response.data));
    Vue.$toast.open({
      message: response.data.message,
      type: 'success',
    })
    return response.data
  }).catch(function (error) {
    if (error.response) {
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

export async function rejectExamTypeDetails (data) {
  return processAPI(BASE_MODULE_PATH + 'reject_exam_type_details', data)
}

export async function returnExamTypeDetails (data) {
  return processAPI(BASE_MODULE_PATH + 'return_exam_type_details', data)
}

export async function getPDSApprovalLevel () {
  return processAPI(BASE_MODULE_PATH + 'get_pds_approval', {}, 'GET')
}

export async function getExamTypesDetails () {
  return processAPI(BASE_MODULE_PATH + 'get_exam_types_details', {}, 'GET')
}

export async function getActiveExamTypesDetails ($data) {
  return processAPI(BASE_MODULE_PATH + 'get_active_exam_types_details', $data, 'GET')
}

export async function filterExamTypeDetails ($data) {
  return processAPI(BASE_MODULE_PATH + 'exam_type_details', $data, 'GET')
}

export async function getConsultantTypeById ($data) {
  return processAPI(BASE_MODULE_PATH + 'get_consultant_type_by_id', $data, 'GET')
}

export async function getAuditLogById ($data) {
  return processAPI(BASE_MODULE_PATH + 'get_exam_audit_log_by_id', $data, 'GET')
}

export async function getExamTypeDetailListByGroupId (data) {
  await servicesModule0.header()
  return axios.get(BASE_MODULE_PATH + 'get_exam_type_details_list_by_group', {
    params: {
      APPR_GROUP_ID: data,
    },
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
export async function filterExamTypeDetailListByGroupId (data, filters) {
  await servicesModule0.header()
  return axios.get(BASE_MODULE_PATH + 'get_exam_type_details_list_by_group', {
    params: {
      APPR_GROUP_ID: data,
      FILTERS: JSON.stringify(filters),
    },
  }).then(response => {
    console.log('data :' + JSON.stringify(response.data.data))
    return response.data.data
  }).catch(function (error) {
    if (error.response) {
      Vue.$toast.open({
        message: error.response.data.message,
        type: 'error',
      })
      if (error.response.status === 401) {
        logout()
      } else {
        return 'error'
      }
    }
  })
}

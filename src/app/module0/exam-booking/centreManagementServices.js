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

export async function createNewCenter (data) {
  return processAPI(BASE_MODULE_PATH + 'centre_management_create', data)
}
export async function updateNewCenter (data) {
  return processAPI(BASE_MODULE_PATH + 'centre_management_update_centre', data)
}

export async function submitCentre (data) {
  return processAPI(BASE_MODULE_PATH + 'centre_management_update', data)
}

export async function createNewExamId (data) {
  return processAPI(BASE_MODULE_PATH + 'exam_id_create', data)
}

export async function createClassMarkerAPI (data) {
  return processAPI(BASE_MODULE_PATH + 'create_class_marker', data)
}
export async function getClassMarkerApi (data) {
  return processAPI(BASE_MODULE_PATH + 'get_class_marker', data, 'GET')
}

export async function dispatchExamNo (data) {
  return processAPI(BASE_MODULE_PATH + 'dispatch_exam_no', data)
}

export async function getAllLanguages (data) {
  return processAPI(BASE_MODULE_PATH + 'get_all_languages', data, 'GET')
}

export async function updateExamId (data) {
  return processAPI(BASE_MODULE_PATH + 'exam_id_update', data)
}

export async function listExamIdByCentreId (data) {
  return processAPI(BASE_MODULE_PATH + 'exam_id_list_by_centre_id', data, 'GET')
}

export async function viewByCentreId (data) {
  return processAPI(BASE_MODULE_PATH + 'centre_management_view_by_id', data, 'GET')
}

export async function listAll (data) {
  return processAPI(BASE_MODULE_PATH + 'centre_management_get', data, 'GET')
}

export async function listAllById (data) {
  return processAPI(BASE_MODULE_PATH + 'centre_management_get_by_id', data, 'GET')
}

export async function listCentresById (data) {
  return processAPI(BASE_MODULE_PATH + 'centre_management_get_by_id', data, 'GET')
}

export async function getAllCentresByCentreMode (data) {
  return processAPI(BASE_MODULE_PATH + 'get_all_centres_by_centre_mode', data, 'GET')
}

export async function getCentreById (data) {
  return processAPI(BASE_MODULE_PATH + 'get_centre_by_id', data, 'GET')
}

export async function getTimeByDay (data) {
  return processAPI(BASE_MODULE_PATH + 'get_time_by_day', data, 'GET')
}

export async function isGeneratedDateValid (data) {
  return processAPI(BASE_MODULE_PATH + 'is_conflicting_schedule', data, 'GET')
}

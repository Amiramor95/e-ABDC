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

export async function listAllExamTime (data) {
  return processAPI(BASE_MODULE_PATH + 'list_exam_time', data, 'GET')
}

export async function createExamTime (data) {
  return processAPI(BASE_MODULE_PATH + 'create_exam_time', data)
}

export async function updateExamTime (data) {
  return processAPI(BASE_MODULE_PATH + 'update_exam_time', data)
}

import axios from 'axios'
import Vue from 'vue'
import * as servicesModule0 from '../../module0/services'

const BASE_MODULE_PATH = '/api/module10/'

async function postAPI(path, data) {
    await servicesModule0.header()
    return axios.post(path, data).then(response => {
        Vue.$toast.open({
            message: response.data.message,
            type: 'success',
        })
        return response.data
    }).catch(function(error) {
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

export async function getAPI(path, params = {}) {
    await servicesModule0.header()
    return axios.get(path, {
        params: params,
    }).then(response => {
        console.log('data :' + JSON.stringify(response.data.data))
        return response.data.data
    }).catch(function(error) {
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

function processAPI(path, data, method = 'POST') {
    if (method === 'POST') {
        return postAPI(path, data)
    } else if (method === 'GET') {
        return getAPI(path, data)
    }
}

export async function listExamIdByCentreId(data) {
    return processAPI(BASE_MODULE_PATH + 'exam_id_list_by_centre_id', data, 'GET')
}

export async function getExamResultForApproval(data) {
    return processAPI(BASE_MODULE_PATH + 'get_exam_result_approvals', data, 'GET')
}

export async function approveExamResult(data) {
    return processAPI(BASE_MODULE_PATH + 'approve_exam_result', data)
}

export async function saveAsDraftExamResult(data) {
    return processAPI(BASE_MODULE_PATH + 'save_exam_result_as_draft', data)
}

export async function listAll($data) {
    return processAPI(BASE_MODULE_PATH + 'list_exam_result', $data, 'GET')
}

export async function listExamAppeal ($data) {
  return processAPI(BASE_MODULE_PATH + 'list_exam_appeal', $data, 'GET')
}

export async function approveExamAppeal (data) {
  return processAPI(BASE_MODULE_PATH + 'approve_exam_appeal', data)
}

export async function rejectExamAppeal (data) {
  return processAPI(BASE_MODULE_PATH + 'reject_exam_appeal', data)
}

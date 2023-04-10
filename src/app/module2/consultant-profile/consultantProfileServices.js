import axios from 'axios'
import Vue from 'vue'
import * as servicesModule0 from '../../module2/services'

const BASE_MODULE_PATH = '/api/module2/'

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

export async function listConsultantProfileByGroupId (data) {
  return processAPI(BASE_MODULE_PATH + 'list_consultant_profiles_by_group_id', data, 'GET')
}

export async function isConsultantProfileUpdateInProgress (data) {
  return processAPI(BASE_MODULE_PATH + 'is_consultant_update_profile_in_progress', data, 'GET')
}

export async function getProfileDocumentByIds (data) {
  return processAPI(BASE_MODULE_PATH + 'get_profile_documents_by_ids', data, 'GET')
}

export async function getVerifyDocsByConsultantId (data) {
  return processAPI(BASE_MODULE_PATH + 'get_verify_docs_by_consultant_id', data, 'GET')
}

export async function getAllUploadedDocsByConsultantId (data) {
  return processAPI(BASE_MODULE_PATH + 'get_all_uploaded_docs_by_consultant_id', data, 'GET')
}

export async function getDraftedDocsByConsultantIdAndTableName (data) {
  return processAPI(BASE_MODULE_PATH + 'get_all_drafted_docs_by_consultant_id_and_table_name', data, 'GET')
}

export async function reviewProfileUpdate (data) {
  return processAPI(BASE_MODULE_PATH + 'review_profile_update', data)
}

export async function rejectProfileUpdate (data) {
  return processAPI(BASE_MODULE_PATH + 'reject_profile_update', data)
}

export async function returnProfileUpdate (data) {
  return processAPI(BASE_MODULE_PATH + 'return_profile_update', data)
}
// export async function review (data) {
//   return processAPI(BASE_MODULE_PATH + 'approve_exam_appeal', data)
// }
//
// export async function rejectExamAppeal (data) {
//   return processAPI(BASE_MODULE_PATH + 'reject_exam_appeal', data)
// }

export function b64toBlobPDF (b64Data, contentType, sliceSize) {
  contentType = contentType || ''
  sliceSize = sliceSize || 512

  var byteCharacters = atob(b64Data)
  var byteArrays = []

  for (
    var offset = 0;
    offset < byteCharacters.length;
    offset += sliceSize
  ) {
    var slice = byteCharacters.slice(offset, offset + sliceSize)

    var byteNumbers = new Array(slice.length)
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i)
    }

    var byteArray = new Uint8Array(byteNumbers)

    byteArrays.push(byteArray)
  }

  return new File(byteArrays, 'pot', { type: contentType })
}

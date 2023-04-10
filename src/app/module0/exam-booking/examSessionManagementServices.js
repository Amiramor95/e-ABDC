import axios from 'axios'
import Vue from 'vue'
import * as servicesModule0 from '../../module0/services'
import * as servicesModule1 from '@/app/module1/services'

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

export async function listAllExamSessionSetting (data) {
  return processAPI(BASE_MODULE_PATH + 'list_all_exam_session_setting', data, 'GET')
}

export async function createExamSessionSetting (data) {
  return processAPI(BASE_MODULE_PATH + 'create_exam_session_setting', data)
}

// exam session generation
export async function listAllExamSessionGeneratedByCentreId (data) {
  return processAPI(BASE_MODULE_PATH + 'list_all_exam_session_generated_by_centre_id', data, 'GET')
}

export async function listCentreBasedExamSessionGenerated () {
  return processAPI(BASE_MODULE_PATH + 'list_centre_based_exam_session_generated', {}, 'GET')
}

export async function listAllExamSessionGeneratedByGroupId (data) {
  return processAPI(BASE_MODULE_PATH + 'list_all_exam_session_generated_by_group_id', data, 'GET')
}

export async function listExamSessionDetailsGenerated (data) {
  return processAPI(BASE_MODULE_PATH + 'get_exam_session_details', data, 'GET')
}

export async function getExamSessionDetailsForEdit (data) {
  return processAPI(BASE_MODULE_PATH + 'get_exam_session_details_for_edit', data, 'GET')
}

export async function getGeneralExamSessionDetails (data) {
  return processAPI(BASE_MODULE_PATH + 'get_general_exam_session_details', data, 'GET')
}

export async function getExamSessionDetailsForView (data) {
  return processAPI(BASE_MODULE_PATH + 'get_exam_session_details_for_view', data, 'GET')
}

export async function cancelExamSession (data) {
  return processAPI(BASE_MODULE_PATH + 'cancel_exam_session_details', data)
}

export async function editExamSession (data) {
  return processAPI(BASE_MODULE_PATH + 'edit_exam_session_details', data)
}

export async function saveSingleLink (data) {
  return processAPI(BASE_MODULE_PATH + 'save_inviligation_sinlge_link', data)
}

export async function saveAsDraftExamSessionDetail (data) {
  return processAPI(BASE_MODULE_PATH + 'draft_exam_session_details', data)
}

export async function submitExamSession (data) {
  return processAPI(BASE_MODULE_PATH + 'accept_exam_session_details', data)
}

export async function saveLinks (data) {
  return processAPI(BASE_MODULE_PATH + 'save_inviligation_link', data)
}

export async function sendEmailToConsultant (data) {
  return processAPI(BASE_MODULE_PATH + 'send_email_to_consultant', data)
}

export async function reviewExamSession (data) {
  return processAPI(BASE_MODULE_PATH + 'review_exam_batch_session', data)
}

export async function approveExamSession (data) {
  return processAPI(BASE_MODULE_PATH + 'approve_exam_batch_session', data)
}

export async function rejectExamSession (data) {
  return processAPI(BASE_MODULE_PATH + 'reject_exam_batch_session', data)
}

export async function returnExamSession (data) {
  return processAPI(BASE_MODULE_PATH + 'return_exam_batch_session', data)
}

export async function approverRejectExamSession (data) {
  return processAPI(BASE_MODULE_PATH + 'approver_reject_exam_batch_session', data)
}

export async function approverReturnExamSession (data) {
  return processAPI(BASE_MODULE_PATH + 'approver_return_exam_batch_session', data)
}

export async function isGeneratedDateValid (data) {
  return processAPI(BASE_MODULE_PATH + 'is_date_generated_valid', data, 'GET')
}

export async function createNewExamSession (data) {
  return processAPI(BASE_MODULE_PATH + 'create_new_exam_session', data)
}

export async function listCandidateSession (data) {
  return processAPI(BASE_MODULE_PATH + 'list_candidate_session', data, 'GET')
}

export async function saveCandidateAttendance (data) {
  return processAPI(BASE_MODULE_PATH + 'save_candidate_attendance', data)
}

// exam session generation
export async function listApprovedExamSessionGeneratedByUserId (data) {
  return processAPI(BASE_MODULE_PATH + 'list_approved_session_by_user_id', data, 'GET')
}

export async function exportCandidateSessionList (data) {
  await servicesModule0.header()
  return axios
    .get(BASE_MODULE_PATH + 'export_candidate_session_list', {
      params: data,
      responseType: 'arraybuffer',
    })
    .then(response => {
      var fileURL = window.URL.createObjectURL(new Blob([response.data]))
      var fileLink = document.createElement('a')

      fileLink.href = fileURL
      fileLink.setAttribute('download', 'download-candidate-session-list.xlsx')

      fileLink.click()
    })
    .catch(function (error) {
      if (error.response) {
        Vue.$toast.open({
          message: error.response.data.message,
          type: 'error',
        })
      }
    })
}

export async function exportCandidateSessionListPDF (data) {
  await servicesModule0.header()
  return axios
    .get(BASE_MODULE_PATH + 'export_candidate_session_list_pdf', {
      params: data,
      responseType: 'blob',
    })
    .then(response => {
      const file = new Blob([response.data], { type: 'application/pdf' })
      const fileURL1 = URL.createObjectURL(file)
      const link = document.createElement('a')
      link.href = fileURL1
      link.download = 'download-candidate-session-list-' + new Date().getDate() + '.pdf'
      link.click()
    })
    .catch(function (error) {
      if (error.response) {
        Vue.$toast.open({
          message: error.response.data.message,
          type: 'error',
        })
      }
    })
}

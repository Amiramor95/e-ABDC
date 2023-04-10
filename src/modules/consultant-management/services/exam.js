import * as ConsultantAPI from './api_client'
import * as data_exams_preferences from '../stubs/exams_preferences.json'
import * as data_exams_sites from '../stubs/exams_sites.json'
import * as data_exams_states from '../stubs/exams_states.json'
import * as data_exams_exemption from '../stubs/exams_exemption.json'
import axios from 'axios'
import * as servicesModule2 from '@/app/module2/services'

const API = ConsultantAPI.get_client()

const IS_STUB = false

/*
GET	api/module2/exams
GET	api/module2/exams/courses
GET	api/module2/exams/sites
GET	api/module2/exams/preferences
POST	api/module2/exams
*/

/*
params:
"CONSULTANT_EXAM_ID:1 || CONSULTANT_ID:26 || APPLICATION_ID:1001"
*/

export async function getConsultantExamType (userId) {
  return API.get('/consultant-exam-type', {
    params: {
      user_id: userId,
    },
  })
    .then(response => {
      return response.data
    })
    .catch(function (error) {
      throw error
    })
}

export async function getConsultantExamDetails (userId) {
  return API.get('/consultant-exam-details', {
    params: {
      user_id: userId,
    },
  })
    .then(response => {
      return response.data
    })
    .catch(function (error) {
      throw error
    })
}

export async function get_exams () {
  return API.get('/exams')
    .then(response => {
      return response.data
    })
    .catch(function (error) {
      throw error
    })
}

export async function get_exams_center (state) {
  const data = {
    STATE: state,
  }
  if (IS_STUB) {
    return data_exams_sites.default
  }
  return API.get('/exams/sites', {
    params: data,
  })
    .then(response => {
      return response.data
    })
    .catch(function (error) {
      throw error
    })
}

export async function get_exams_exemption () {
  if (IS_STUB) {
    return data_exams_exemption.default
  }
  return API.get('/exemption-categories')
    .then(response => {
      return response.data
    })
    .catch(function (error) {
      throw error
    })
}

export async function get_exams_states () {
  if (IS_STUB) {
    return data_exams_states.default
  }
  return API.get('/exams/sites/states')
    .then(response => {
      return response.data
    })
    .catch(function (error) {
      throw error
    })
}

/*
params:
"CONSULTANT_LICENSE_ID:1
SITEID:ASLC
STARTFROM:13/09/2021"
*/
export async function get_exams_preferences (consultant_license_id, site_id, start_from) {
  const data = {
    CONSULTANT_LICENSE_ID: consultant_license_id,
    SITEID: site_id,
    STARTFROM: start_from,
  }
  if (IS_STUB) {
    return data_exams_preferences.default
  }
  return API.get('/exams/preferences', {
    params: data,
  })
    .then(response => {
      return response.data
    })
    .catch(function (error) {
      throw error
    })
}

export async function get_exams_result (consultant_id) {
  return API
    .get('/exams/candidate/result', {
      params: {
        CONSULTANT_ID: consultant_id,
      },
    }).then((response) => {
      return response.data
    })
    .catch(function (error) {
      throw error
    })
}

export async function saveConsultantBookedSessions (data) {
  return API
    .post('/exams/consultant_booked_sessions', data)
    .then((response) => {
      return response.data
    })
    .catch(function (error) {
      throw error
    })
}

export async function get_booked_exams_sessions (consultant_id, bookingType) {
  return API
    .get('/exams/booked-exam-sessions', {
      params: {
        CONSULTANT_ID: consultant_id,
        BOOKING_TYPE: bookingType,
      },
    })
    .then((response) => {
      return response.data
    })
    .catch(function (error) {
      throw error
    })
}

export async function get_confirmed_exam_sessions (consultant_id, bookingType) {
  return API
    .get('/exams/confirmed-exam-sessions', {
      params: {
        CONSULTANT_ID: consultant_id,
        BOOKING_TYPE: bookingType,
      },
    })
    .then((response) => {
      return response.data
    })
    .catch(function (error) {
      throw error
    })
}

export async function delete_booked_exams_sessions (exam_id) {
  return API
    .delete(`/exams/delete-exam-sessions/${exam_id}`)
    .then((response) => {
      return response
    })
    .catch(function (error) {
      throw error
    })
}

export async function saveConsultantresitExamSessions (data) {
  return API
    .post('/exams/consultant-resit-exam-sessions', data)
    .then((response) => {
      return response.data
    })
    .catch(function (error) {
      throw error
    })
}

// Api related to Exam Booking Module (Module 10)
const BASE_MODULE_PATH_EXAM_BOOKING = '/api/module10/'

export async function getExamCentersByState (data) {
  await servicesModule2.header()
  return axios
    .get(BASE_MODULE_PATH_EXAM_BOOKING + 'get_exam_center_lists', {
      params: {
        STATE_ID: data,
      },
    })
    .then((response) => {
      return response.data
    })
    .catch(function (error) {
      throw error
    })
}

export async function getExamListsByCenterAndDate (stateId, centreId, date, endDate = null) {
  await servicesModule2.header()
  return axios
    .get(BASE_MODULE_PATH_EXAM_BOOKING + 'get_exam_center_details', {
      params: {
        STATE_ID: stateId,
        CENTRE_ID: centreId,
        DATE: date,
        END_DATE: endDate,
      },
    })
    .then((response) => {
      return response.data
    })
    .catch(function (error) {
      throw error
    })
}

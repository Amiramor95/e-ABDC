import * as ConsultantAPI from './api_client'

let API = ConsultantAPI.get_client()

add_header()

function add_header () {
  API = ConsultantAPI.add_header()
}

function remove_header () {
  API = ConsultantAPI.remove_header()
}

// Pass data to the API Client - to set local-storage
function update_api_client (data) {
  API = ConsultantAPI.update_api_client(data)
}

export async function login (data) {
  remove_header()

  return API.post('/auth/login', data)
    .then(response => {
      update_api_client(response.data.data)
      add_header()

      return response.data
    })
    .catch(function (error) {
      throw error
    })
}

export async function me () {
  return API.get('/auth/user')
    .then(response => {
      return response.data
    })
    .catch(function (error) {
      throw error
    })
}

export async function logout () {
  remove_header()
}

export async function signup (data) {
  return API.post('/auth/signup', data)
    .then(response => {
      return response.data
    })
    .catch(function (error) {
      throw error
    })
}

// Get securoty questions
export async function security_questions () {
  return API.get('/auth/security_question')
    .then(response => {
      return response.data
    })
    .catch(function (error) {
      throw error
    })
}

// Get mobile One Time Password
export async function trigger_otp (data) {
  return API.post('/auth/otp', data)
    .then(response => {
      return response.data
    })
    .catch(function (error) {
      throw error
    })
}// Get mobile One Time Password

export async function trigger_email_otp (data) {
  return API.post('/auth/email_otp', data)
    .then(response => {
      return response.data
    })
    .catch(function (error) {
      throw error
    })
}

// Setup security. This for reset password for first time login
export async function setup_security (data) {
  return API.post('/auth/setup_security', data)
    .then(response => {
      return response.data
    })
    .catch(function (error) {
      throw error
    })
}

export function get_token () {
  return API.defaults.headers.common.Authorization
}

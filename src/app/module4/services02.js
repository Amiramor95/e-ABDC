// nurul - 5 modules

import axios from 'axios';
import Vue from 'vue'
import * as servicesModule0 from '../module0/services';
import $ from 'jquery'

export async function getModule(USER_ID=null, MODULE_TYPE = 1) {
  await servicesModule0.header();
  return axios.get("/api/module4/modules", {
    params: {
      CREATE_BY: USER_ID,
      MODULE_TYPE: MODULE_TYPE
    }
  }).then(response => {
    // console.log('data :' + JSON.stringify(response.data.data));
    return response.data.data;
  }).catch(function (error) {
    if (error.response) {

      Vue.$toast.open({
        message: error.response.data.message,
        type: 'error',
      });
      if (error.response.status == 401) {
        logout();
      } else {
        return 'error'
      }
    }
  });
}


/**
 * get module
 * @param {*} id
 * @returns
 */
export async function getModuleByID(id) {
  await servicesModule0.header();
  return axios.get(`/api/module4/modules/${id}`).then(response => {
    // console.log('data :' + JSON.stringify(response.data));
    return response.data;
  }).catch(function (error) {
    if (error.response) {

      Vue.$toast.open({
        message: error.response.data.message,
        type: 'error',
      });
      if (error.response.status == 401) {
        logout();
      } else {
        return 'error'
      }
    }
  });
}

export async function updateApproval(data) {
  await servicesModule0.header()
  return axios.post(`/api/module4/module-approval/approval`, data).then(response => {
    // console.log("exception create :" + JSON.stringify(response.data));
    Vue.$toast.open({
      message: response.data.message,
      type: 'success',
    })
    return response.data
  }).catch(function (error) {
    if (error.response) {
      if (error.response.status == 422) {
        let text = ''
        if(error.response.data.errors) {
          let errors = error.response.data.errors

          $.each(errors, function(key, value) {
            text += value + "<br/>"
          });
        }
        Vue.$toast.open({
          message: text,
          type: 'error',
        });
      } else {
        Vue.$toast.open({
          message: error.response.data.message,
          type: 'error',
        });
      }

      if (error.response.status == 401) {
        logout()
      } else {
        return 'error'
      }
    }
  })
}

export async function returnSubmission(data) {
  await servicesModule0.header()
  return axios.post('/api/module4/module-approval/return-submission', data).then(response => {
    // console.log("exception create :" + JSON.stringify(response.data));
    Vue.$toast.open({
      message: 'Successfully request return.',
      type: 'success',
    })
    return response.data
  }).catch(function (error) {
    if (error.response) {
      if (error.response.status == 422) {
        let text = ''
        if(error.response.data.errors) {
          let errors = error.response.data.errors

          $.each(errors, function(key, value) {
            text += value + "<br/>"
          });
        }
        Vue.$toast.open({
          message: text,
          type: 'error',
        });
      } else {
        Vue.$toast.open({
          message: error.response.data.message,
          type: 'error',
        });
      }

      if (error.response.status == 401) {
        logout()
      } else {
        return 'error'
      }
    }
  })
}

export async function getModuleAprovalByModuleID(id) {
  await servicesModule0.header();
  return axios.get(`/api/module4/module_approval_showByModuleId/`, {
    params: {
      MODULE_ID: id,
    },
  }).then(response => {
    // console.log('data :' + JSON.stringify(response.data));
    return response.data.data;
  }).catch(function (error) {
    if (error.response) {

      Vue.$toast.open({
        message: error.response.data.message,
        type: 'error',
      });
      if (error.response.status == 401) {
        logout();
      } else {
        return 'error'
      }
    }
  });
}

export async function getParticipantDetails(programType, passportNo, nricNo) {
  await servicesModule0.header();
  return axios.get(`/api/module4/participant`, {
    params: {
      PROGRAM_TYPE: programType,
      PASSPORT_NO: passportNo,
      NRIC: nricNo,
    },
  }).then(response => {
    // console.log('data :' + JSON.stringify(response.data));
    return response.data;
  }).catch(function (error) {
    if (error.response) {

      Vue.$toast.open({
        message: error.response.data.message,
        type: 'error',
      });
      if (error.response.status == 401) {
        logout();
      } else {
        return 'error'
      }
    }
  });
}

export async function consultantList() {
  await servicesModule0.header();
  return axios.get(`/api/module4/consultant`).then(response => {
    // console.log('data :' + JSON.stringify(response.data));
    return response.data.data;
  }).catch(function (error) {
    if (error.response) {

      Vue.$toast.open({
        message: error.response.data.message,
        type: 'error',
      });
      if (error.response.status == 401) {
        logout();
      } else {
        return 'error'
      }
    }
  });
}

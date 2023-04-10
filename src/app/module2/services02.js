//

import axios from 'axios'
import Vue from 'vue'
import * as servicesModule2 from '../module2/services'
import * as servicesModule1 from '../module1/services'
import * as servicesModule0 from '../module0/services'
import { logout } from '../module4/services01'

export async function postRegisterConsultant (data) {
  await servicesModule2.header()
  return axios
    .post('/api/module2/consultant', data)
    .then((response) => {
      // console.log('data :' + JSON.stringify(response.data.data));
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
      if (error.response) {
        // Vue.$toast.open({
        //   message: error.response.data.message,
        //   type: 'error',
        // });
        if (error.response.status == 401) {
          logout()
        } else {
          return 'error'
        }
      }
    })
}
export async function updateRegisterConsultant (data) {
  await servicesModule2.header()
  return axios
    .put(`/api/module2/consultant/${data.CONSULTANT_ID}`)
    .then((response) => {
      // console.log('data :' + JSON.stringify(response.data.data));
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
      if (error.response) {
        // Vue.$toast.open({
        //   message: error.response.data.message,
        //   type: 'error',
        // });
        if (error.response.status == 401) {
          logout()
        } else {
          return 'error'
        }
      }
    })
}

export async function postRegistrationStatus (data) {
  await servicesModule2.header()
  return axios
    .post('/api/module2/distributorReview', data)
    .then((response) => {
      Vue.$toast.open({
        message: response.data.message,
        type: 'success',
      })
      return response.data
    })
    .catch(function (error) {
      console.log(error)
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

export async function updateRegistrationStatus (data) {
  await servicesModule2.header()
  return axios
    .post('/api/module2/applicationApproval', data)
    .then((response) => {
      Vue.$toast.open({
        message: response.data.message,
        type: 'success',
      })
      return response.data
    })
    .catch(function (error) {
      console.log(error)
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

export async function approveRegistrationStatus (data) {
  await servicesModule2.header()
  return axios
    .post('/api/module2/applicationRdReview', data)
    .then((response) => {
      Vue.$toast.open({
        message: response.data.message,
        type: 'success',
      })
      return response.data
    })
    .catch(function (error) {
      console.log(error)
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

export async function getConsultant () {
  await servicesModule2.header()
  return axios
    .get('/api/module2/consultant_records')
    .then((response) => {
      // console.log('data :' + JSON.stringify(response.data.data));
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
      if (error.response) {
        // Vue.$toast.open({
        //   message: error.response.data.message,
        //   type: 'error',
        // });
        if (error.response.status == 401) {
          logout()
        } else {
          return 'error'
        }
      }
    })
}

export async function getConsultantApprTermination (data) {
  await servicesModule2.header()
  return axios
    .get('/api/module2/get-consultant-approval-termination', {
      params: {
        TS_ID: data,
      },
    })
    .then((response) => {
      // console.log('data :' + JSON.stringify(response.data.data));
      Vue.$toast.open({
        message: response.data.message,
        type: 'success',
      })
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
      if (error.response) {
        // Vue.$toast.open({
        //   message: error.response.data.message,
        //   type: 'error',
        // });
        if (error.response.status == 401) {
          logout()
        } else {
          return 'error'
        }
      }
    })
}
export async function getConsultantApprByHOD () {
  await servicesModule2.header()
  return axios
    .get('/api/module2/get-consultant-approvaled-by-HOD')
    .then((response) => {
      // console.log('data :' + JSON.stringify(response.data.data));
      Vue.$toast.open({
        message: response.data.message,
        type: 'success',
      })
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
      if (error.response) {
        // Vue.$toast.open({
        //   message: error.response.data.message,
        //   type: 'error',
        // });
        if (error.response.status == 401) {
          logout()
        } else {
          return 'error'
        }
      }
    })
}
export async function getAllConsultant () {
  await servicesModule2.header()
  return axios
    .get('/api/module2/consultants')
    .then((response) => {
      // console.log('data :' + JSON.stringify(response.data.data));
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
      if (error.response) {
        // Vue.$toast.open({
        //   message: error.response.data.message,
        //   type: 'error',
        // });
        if (error.response.status == 401) {
          logout()
        } else {
          return 'error'
        }
      }
    })
}
export async function getConsultantByID (consultId, other_documents) {
  await servicesModule2.header()
  return axios
    .get('/api/module2/consultant_record', {
      responseType: 'application/json',
      params: {
        CONSULTANT_ID: consultId,
        TABLE_NAME: other_documents,
      },
    })
    .then((response) => {
      // console.log('data :' + JSON.stringify(response.data.data));
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
      if (error.response) {
        // Vue.$toast.open({
        //   message: error.response.data.message,
        //   type: 'error',
        // });
        if (error.response.status == 401) {
          logout()
        } else {
          return 'error'
        }
      }
    })
}
export async function getConsultantDocuments (consultId, tableName, fieldName, documentID) {
  if (consultId || tableName || fieldName || documentID) {
    await servicesModule2.header()
    return axios
      .get('/api/module2/consultantDocuments', {
        params: {
          CONSULTANT_ID: consultId,
          TABLE_NAME: tableName,
          FIELD_NAME: fieldName, // Optional Third Params
          CA_DOCUMENT_ID: documentID, // Optional Fourth Params
        },
      })
      .then((response) => {
        return response.data.data
      })
      .catch(function (error) {
        console.log(error)
        if (error.response) {
          if (error.response.status == 401) {
            logout()
          } else {
            return 'error'
          }
        }
      })
  }
}

export async function getConsultantDocumentsForConsultantProfile (consultId, tableName, consultProfileId) {
  await servicesModule2.header()
  return axios
    .get('/api/module2/consultantDocumentsForProfile', {
      params: {
        CONSULTANT_ID: consultId,
        TABLE_NAME: tableName,
        CONSULTANT_PROFILE_ID: consultProfileId,
      },
    })
    .then((response) => {
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
      if (error.response) {
        if (error.response.status == 401) {
          logout()
        } else {
          return 'error'
        }
      }
    })
}

export async function getApplicationApprovalLog (consultId, consultantType, applicationType) {
  await servicesModule2.header()
  return axios
    .get('/api/module2/applicationApproval', {
      responseType: 'application/json',
      params: {
        CONSULTANT_ID: consultId,
        CONSULTANT_TYPE_ID: consultantType,
        CONSULTANT_APPLICATION_TYPE: applicationType,
      },
    })
    .then((response) => {
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
      if (error.response) {
        if (error.response.status == 401) {
          logout()
        } else {
          return 'error'
        }
      }
    })
}

export async function getDistributorRecords () {
  await servicesModule2.header()
  return axios
    .get('/api/module2/distributor_list')
    .then((response) => {
      // console.log('data :' + JSON.stringify(response));
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
      if (error.response) {
        // Vue.$toast.open({
        //   message: error.response.data.message,
        //   type: 'error',
        // });
        if (error.response.status == 401) {
          logout()
        } else {
          return 'error'
        }
      }
    })
}
export async function getHodDistributorRecords () {
  await servicesModule2.header()
  return axios
    .get('/api/module2/get-hod-distributor-list')
    .then((response) => {
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
      if (error.response) {
        // Vue.$toast.open({
        //   message: error.response.data.message,
        //   type: 'error',
        // });
        if (error.response.status == 401) {
          logout()
        } else {
          return 'error'
        }
      }
    })
}

export async function getDistributorsFromTermination () {
  await servicesModule2.header()
  return axios
    .get('/api/module2/distributor_list_from_termination')
    .then((response) => {
      // console.log('data :' + JSON.stringify(response));
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
      if (error.response) {
        // Vue.$toast.open({
        //   message: error.response.data.message,
        //   type: 'error',
        // });
        if (error.response.status == 401) {
          logout()
        } else {
          return 'error'
        }
      }
    })
}

export async function getConsultantType () {
  await servicesModule2.header()
  return axios
    .get(
      '/api/module2/get-consultant-type',
    )
    .then((response) => {
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
      if (error.response) {
        if (error.response.status == 401) {
          alert('you are logged out')
          logout()
        } else {
          return 'error'
        }
      }
    })
}

export async function addConsultantType (consultantId) {
  await servicesModule2.header()
  return axios
    .get(
      '/api/module2/add-consultant-type',{
        params: {
            CONSULTANT_ID: consultantId,
        },
    })
    .then((response) => {
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
      if (error.response) {
        if (error.response.status == 401) {
          alert('you are logged out')
          logout()
        } else {
          return 'error'
        }
      }
    })
}

export async function getAllDistributorList () {
  await servicesModule2.header()
  return axios
    .get('/api/module2/all_distributor_list')
    .then((response) => {
      // console.log('data :' + JSON.stringify(response));
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
      if (error.response) {
        // Vue.$toast.open({
        //   message: error.response.data.message,
        //   type: 'error',
        // });
        if (error.response.status == 401) {
          logout()
        } else {
          return 'error'
        }
      }
    })
}

export async function getDistributorByNRIC (NRIC, license_type) {
  await servicesModule2.header()
  return axios
    .get(
      `/api/module2/distributor-by-nric/${NRIC}/distributors/${license_type}`,
    )
    .then((response) => {
      // console.log(" licens type data check  data :" + JSON.stringify(response));
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
      if (error.response) {
        // Vue.$toast.open({
        //   message: error.response.data.message,
        //   type: 'error',
        // });
        if (error.response.status == 401) {
          alert('you are logged out')
          logout()
        } else {
          return 'error'
        }
      }
    })
}
export async function getDistributorPointsByNRIC (distID, NRIC, license_type) {
  await servicesModule2.header()
  return axios
    .get('/api/module2/distributor-points-by-nric', {
      params: {
        DISTRIBUTOR_ID: distID,
        CONSULTANT_NRIC: NRIC,
        CONSULTANT_TYPE_ID: license_type,
      },
    })
    .then((response) => {
      // console.log("data :" + JSON.stringify(response));
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
      if (error.response) {
        // Vue.$toast.open({
        //   message: error.response.data.message,
        //   type: 'error',
        // });
        if (error.response.status == 401) {
          alert('you are logged out')
          logout()
        } else {
          return 'error'
        }
      }
    })
}

export async function getDistributorByPASSPORT (PASSPORT, license_type) {
  await servicesModule2.header()
  return axios
    .get(
      `/api/module2/distributor-by-passport/${PASSPORT}/distributors/${license_type}`,
    )
    .then((response) => {
      // console.log(" licens type data check  data :" + JSON.stringify(response));
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
      if (error.response) {
        // Vue.$toast.open({
        //   message: error.response.data.message,
        //   type: 'error',
        // });
        if (error.response.status == 401) {
          alert('you are logged out')
          logout()
        } else {
          return 'error'
        }
      }
    })
}
export async function getDistributorPointsByPASSPORT (distID, PASSPORT, license_type) {
  await servicesModule2.header()
  return axios
    .get('/api/module2/distributor-points-by-passport', {
      params: {
        DISTRIBUTOR_ID: distID,
        CONSULTANT_PASSPORT: PASSPORT,
        CONSULTANT_TYPE_ID: license_type,
      },
    })
    .then((response) => {
      // console.log("data :" + JSON.stringify(response));
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
      if (error.response) {
        // Vue.$toast.open({
        //   message: error.response.data.message,
        //   type: 'error',
        // });
        if (error.response.status == 401) {
          alert('you are logged out')
          logout()
        } else {
          return 'error'
        }
      }
    })
}

export async function getConsultantByDistributorID (id) {
  await servicesModule2.header()
  return axios
    .get(`/api/module2/distributor/${id}`)
    .then((response) => {
      console.log('data :' + JSON.stringify(response))
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
      if (error.response) {
        // Vue.$toast.open({
        //   message: error.response.data.message,
        //   type: 'error',
        // });
        if (error.response.status == 401) {
          alert('you are logged out')
          logout()
        } else {
          return 'error'
        }
      }
    })
}

// GM audit log
export async function getGMAuditLogByID (data) {
  await servicesModule2.header()
  return axios.get('/api/module2/gm_audit_log', {
    params: {
      TERMINATION_ID: data,
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

// GM draft termination
export async function getDraftTerminationApproval (DIST_ID, SUBMISSION_ID) {
  return axios.get('/api/module2/get-draft-termination-approval', {
    params: {
      DIST_ID: DIST_ID,
      SUBMISSION_ID: SUBMISSION_ID,
    },
  })
    .then((response) => {
      Vue.$toast.open({
        message: response.data.message,
        type: 'success',
      })
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
      if (error.response) {
        // Vue.$toast.open({
        //   message: error.response.data.message,
        //   type: 'error',
        // });
        if (error.response.status == 401) {
          logout()
        } else {
          return 'error'
        }
      }
    })
}
// CEO draft termination
export async function getDraftTerminationApprovalCEO (DIST_ID, SUBMISSION_ID) {
  return axios.get('/api/module2/get-draft-termination-approval-ceo', {
    params: {
      DIST_ID: DIST_ID,
      SUBMISSION_ID: SUBMISSION_ID,
    },
  })
    .then((response) => {
      Vue.$toast.open({
        message: response.data.message,
        type: 'success',
      })
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
      if (error.response) {
        // Vue.$toast.open({
        //   message: error.response.data.message,
        //   type: 'error',
        // });
        if (error.response.status == 401) {
          logout()
        } else {
          return 'error'
        }
      }
    })
}

export async function getAllHodConsultantTermination (data) {
  await servicesModule2.header()
  return axios
    .get('/api/module2/get-hod-termination-status', {
      params: {
        DIST_ID: data,
      },
    })
    .then((response) => {
      // console.log('data :' + JSON.stringify(response.data.data));
      Vue.$toast.open({
        message: response.data.message,
        type: 'success',
      })
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
      if (error.response) {
        // Vue.$toast.open({
        //   message: error.response.data.message,
        //   type: 'error',
        // });
        if (error.response.status == 401) {
          logout()
        } else {
          return 'error'
        }
      }
    })
}
export async function getAllConsultantList (distId, TS_ID, submissionId) {
  await servicesModule2.header()
  return axios
    .get('/api/module2/get-consultant-list', {
      params: {
        DIST_ID: distId,
        TS_ID: TS_ID,
        SUBMISSION_ID: submissionId,
      },
    })
    .then((response) => {
      // console.log('data :' + JSON.stringify(response.data.data));
      Vue.$toast.open({
        message: response.data.message,
        type: 'success',
      })
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
      if (error.response) {
        // Vue.$toast.open({
        //   message: error.response.data.message,
        //   type: 'error',
        // });
        if (error.response.status == 401) {
          logout()
        } else {
          return 'error'
        }
      }
    })
}
export async function getAllConsultantListFIMMStatus (distId, TS_ID, submissionId) {
  await servicesModule2.header()
  return axios
    .get('/api/module2/get-consultant-list-fimm-status', {
      params: {
        DIST_ID: distId,
        TS_ID: TS_ID,
        SUBMISSION_ID: submissionId,
      },
    })
    .then((response) => {
      // console.log('data :' + JSON.stringify(response.data.data));
      Vue.$toast.open({
        message: response.data.message,
        type: 'success',
      })
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
      if (error.response) {
        // Vue.$toast.open({
        //   message: error.response.data.message,
        //   type: 'error',
        // });
        if (error.response.status == 401) {
          logout()
        } else {
          return 'error'
        }
      }
    })
}
export async function getAllHODTerminationList (DIST_ID, TS_ID, SUBMISSION_ID) {
  await servicesModule2.header()
  return axios
    .get('/api/module2/get-hod-consultant-termination', {
      params: {
        DIST_ID: DIST_ID,
        TS_ID: TS_ID,
        SUBMISSION_ID: SUBMISSION_ID,
      },
    })
    .then((response) => {
      // console.log('data :' + JSON.stringify(response.data.data));
      Vue.$toast.open({
        message: response.data.message,
        type: 'success',
      })
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
      if (error.response) {
        // Vue.$toast.open({
        //   message: error.response.data.message,
        //   type: 'error',
        // });
        if (error.response.status == 401) {
          logout()
        } else {
          return 'error'
        }
      }
    })
}
export async function getAllApprovalTerminationCEO (data) {
  await servicesModule2.header()
  return axios
    .get(`/api/module2/get-termination-by-dist-ceo/${data}`)
    .then((response) => {
      Vue.$toast.open({
        message: response.data.message,
        type: 'success',
      })
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
      if (error.response) {
        // Vue.$toast.open({
        //   message: error.response.data.message,
        //   type: 'error',
        // });
        if (error.response.status == 401) {
          logout()
        } else {
          return 'error'
        }
      }
    })
}

export async function getAllApprovalTermination (data) {
  await servicesModule2.header()
  return axios
    .get(`/api/module2/get-termination-by-dist/${data}`)
    .then((response) => {
      Vue.$toast.open({
        message: response.data.message,
        type: 'success',
      })
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
      if (error.response) {
        // Vue.$toast.open({
        //   message: error.response.data.message,
        //   type: 'error',
        // });
        if (error.response.status == 401) {
          logout()
        } else {
          return 'error'
        }
      }
    })
}

export async function getApprovalTerminationStatus (data) {
  await servicesModule2.header()
  return axios
    .get('/api/module2/get-approval-termination-by-status')
    .then((response) => {
      // console.log('data :' + JSON.stringify(response.data.data));
      Vue.$toast.open({
        message: response.data.message,
        type: 'success',
      })
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
      if (error.response) {
        // Vue.$toast.open({
        //   message: error.response.data.message,
        //   type: 'error',
        // });
        if (error.response.status == 401) {
          logout()
        } else {
          return 'error'
        }
      }
    })
}
export async function getAllTerminationBySubmission_id (data) {
  await servicesModule2.header()
  return axios
    .get(`/api/module2/consultant_termination_by_submissionID/${data}`)
    .then((response) => {
      // console.log('data :' + JSON.stringify(response.data.data));
      Vue.$toast.open({
        message: response.data.message,
        type: 'success',
      })
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
      if (error.response) {
        // Vue.$toast.open({
        //   message: error.response.data.message,
        //   type: 'error',
        // });
        if (error.response.status == 401) {
          logout()
        } else {
          return 'error'
        }
      }
    })
}
export async function getTerminationType () {
  await servicesModule2.header()
  return axios
    .get('/api/module2/termination_type')
    .then((response) => {
      // console.log('data :' + JSON.stringify(response.data.data));
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
      if (error.response) {
        // Vue.$toast.open({
        //   message: error.response.data.message,
        //   type: 'error',
        // });
        if (error.response.status == 401) {
          logout()
        } else {
          return 'error'
        }
      }
    })
}
export async function getAllTermination (data) {
  return axios.get('/api/module2/consultant_termination', {
    params: {
      DIST_ID: data,
    },
  })
    .then((response) => {
      Vue.$toast.open({
        message: response.data.message,
        type: 'success',
      })
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
      if (error.response) {
        // Vue.$toast.open({
        //   message: error.response.data.message,
        //   type: 'error',
        // });
        if (error.response.status == 401) {
          logout()
        } else {
          return 'error'
        }
      }
    })
}

export async function getAllTerminationForAdmin (data) {
  return axios.get('/api/module2/consultant_termination_admin', {
    params: {
      DIST_ID: data,
    },
  })
    .then((response) => {
      Vue.$toast.open({
        message: response.data.message,
        type: 'success',
      })
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
      if (error.response) {
        // Vue.$toast.open({
        //   message: error.response.data.message,
        //   type: 'error',
        // });
        if (error.response.status == 401) {
          logout()
        } else {
          return 'error'
        }
      }
    })
}

export async function getAllTerminationForManager (data) {
  return axios.get('/api/module2/consultant_termination_manager', {
    params: {
      DIST_ID: data,
    },
  })
    .then((response) => {
      Vue.$toast.open({
        message: response.data.message,
        type: 'success',
      })
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
      if (error.response) {
        // Vue.$toast.open({
        //   message: error.response.data.message,
        //   type: 'error',
        // });
        if (error.response.status == 401) {
          logout()
        } else {
          return 'error'
        }
      }
    })
}

export async function postTerminateConsultant (data) {
  await servicesModule2.header()
  return axios
    .post('/api/module2/consultant_termination', data)
    .then((response) => {
      // console.log('data :' + JSON.stringify(response.data.data));
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
      if (error.response) {
        // Vue.$toast.open({
        //   message: error.response.data.message,
        //   type: 'error',
        // });
        if (error.response.status == 401) {
          logout()
        } else {
          return 'error'
        }
      }
    })
}

export async function updateTerminateApprovalConsultant (data, id) {
  await servicesModule2.header()
  return axios
    .post(`/api/module2/consultant_termination_approval/${id}`, data)
    .then((response) => {
      Vue.$toast.open({
        message: response.data.message,
        type: 'success',
      })
      console.log('list : ' + JSON.stringify(response.data))
      return response.data
    })
}

export async function updateTerminateConsultant (data, id) {
  await servicesModule2.header()
  return axios
    .post(`/api/module2/consultant_termination/${id}`, data)
    .then((response) => {
      console.log('list : ' + JSON.stringify(response.data))
      return response.data
    })
}

export async function updateTerminateConsultantApproval (data) {
  await servicesModule2.header()
  return axios
    .post('/api/module2/bulk_termination_approval', data)
    .then((response) => {
      console.log('list : ' + JSON.stringify(response.data))
      Vue.$toast.open({
        message: response.data.message,
        type: 'success',
      })
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
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

export async function postResignConsultant (data) {
  await servicesModule2.header()
  return axios
    .post('/api/module2/consultant_resignation', data)
    .then((response) => {
      // console.log('data :' + JSON.stringify(response.data.data));
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
      if (error.response) {
        // Vue.$toast.open({
        //   message: error.response.data.message,
        //   type: 'error',
        // });
        if (error.response.status == 401) {
          logout()
        } else {
          return 'error'
        }
      }
    })
}

export async function deleteResignConsultantDocument (data) {
  await servicesModule2.header()
  return axios
    .delete('/api/module2/consultant_resignation_delete', {
      params: {
        RESIGNATION_DOCUMENT_ID: data,
      },
    })
    .then((response) => {
      Vue.$toast.open({
        message: response.data.message,
        type: 'success',
      })
      // console.log('data :' + JSON.stringify(response.data.data));
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
      if (error.response) {
        // Vue.$toast.open({
        //   message: error.response.data.message,
        //   type: 'error',
        // });
        if (error.response.status == 401) {
          logout()
        } else {
          return 'error'
        }
      }
    })
}

export async function putResignConsultant (data) {
  await servicesModule2.header()
  return axios
    .put('/api/module2/consultant_resignation', data)
    .then((response) => {
      // console.log('data :' + JSON.stringify(response.data.data));
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
      if (error.response) {
        // Vue.$toast.open({
        //   message: error.response.data.message,
        //   type: 'error',
        // });
        if (error.response.status == 401) {
          logout()
        } else {
          return 'error'
        }
      }
    })
}

export async function getConsultantResignationApprovedDatas (data) {
  await servicesModule2.header()
  return axios
    .get('/api/module2/consultant_resignation_approved_datas', {
      params: {
        DISTRIBUTOR_ID: data,
      },
    })
    .then((response) => {
      // console.log('data :' + JSON.stringify(response.data.data));
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
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

export async function postResignApprovalConsultant (data) {
  await servicesModule2.header()
  return axios
    .post('/api/module2/consultant_resignation_approval', data)
    .then((response) => {
      // console.log('data :' + JSON.stringify(response.data.data));
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
      if (error.response) {
        // Vue.$toast.open({
        //   message: error.response.data.message,
        //   type: 'error',
        // });
        if (error.response.status == 401) {
          logout()
        } else {
          return 'error'
        }
      }
    })
}

export async function putResignApprovalConsultant (data) {
  await servicesModule2.header()
  return axios
    .put('/api/module2/consultant_resignation_approval', data)
    .then((response) => {
      // console.log('data :' + JSON.stringify(response.data.data));
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
      if (error.response) {
        // Vue.$toast.open({
        //   message: error.response.data.message,
        //   type: 'error',
        // });
        if (error.response.status == 401) {
          logout()
        } else {
          return 'error'
        }
      }
    })
}

export async function getConsultantResignationApproval () {
  await servicesModule2.header()
  return axios
    .get('/api/module2/consultant_resignation_approval')
    .then((response) => {
      // console.log('data :' + JSON.stringify(response.data.data));
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
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

export async function registrationStatus () {
  await servicesModule2.header()
  return axios
    .get('/api/module2/registration_status')
    .then((response) => {
      // console.log('data :' + JSON.stringify(response.data.data));
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
      if (error.response) {
        // Vue.$toast.open({
        //   message: error.response.data.message,
        //   type: 'error',
        // });
        if (error.response.status == 401) {
          logout()
        } else {
          return 'error'
        }
      }
    })
}

export async function updateSelfReg (data) {
  return axios
    .post('/api/module2/update_register', data)
    .then((response) => {
      console.log(response.data)
      return response.data
    })
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status == 500) {
          // console.log(JSON.stringify(error.response.data.message));
          if (error.response.data.message == 'Token expired.') {
            console.log('logout')
            servicesModule1.logout()
          } else {
            console.log(error.response.data.message)
          }
        } else if (error.response.status == 401) {
          servicesModule1.logout()
        }
        return 'error'
      }
    })
}

export async function verifyUser (data) {
  return axios
    .get('/api/module2/verify_user', {
      params: {
        LOGIN_ID: data.LOGIN_ID,
        USER_PASS_NUM: data.USER_PASS_NUM,
      },
    })
    .then((response) => {
      // localStorage.setItem('realmName', 'realm1');

      console.log(response.data)
      return response.data
    })
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status == 500) {
          // console.log(JSON.stringify(error.response.data.message));
          if (error.response.data.message == 'Token expired.') {
            console.log('logout')
            servicesModule1.logout()
          } else {
            console.log(error.response.data.message)
          }
        } else if (error.response.status == 401) {
          servicesModule1.logout()
        }
        return 'error'
      }
    })
}

export async function updatePassword(data) {
  return axios.post('/api/module2/user_update', data).then(response => {
      Vue.$toast.open({
        message: response.data.message,
        type: 'success',
      });
      return response.data;
  }).catch(function(error) {
      if (error.response) {
        Vue.$toast.open({
          message: error.response.data.message,
          type: 'error',
        });
      }
  });
}

export async function getPaymentStatus () {
  await servicesModule2.header()
  return axios
    .get('/api/module2/payment_status')
    .then((response) => {
      // console.log('data :' + JSON.stringify(response.data.data));
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
      if (error.response) {
        // Vue.$toast.open({
        //   message: error.response.data.message,
        //   type: 'error',
        // });
        if (error.response.status == 401) {
          logout()
        } else {
          return 'error'
        }
      }
    })
}

export async function getTerminationByConsultantID (id) {
  await servicesModule2.header()
  return axios
    .get(`/api/module2/termination/${id}`)
    .then((response) => {
      // console.log('data :' + JSON.stringify(response.data.data));
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
      if (error.response) {
        // Vue.$toast.open({
        //   message: error.response.data.message,
        //   type: 'error',
        // });
        if (error.response.status == 401) {
          logout()
        } else {
          return 'error'
        }
      }
    })
}

export async function getDistributorTerminationList () {
  await servicesModule2.header()
  return axios
    .get('/api/module2/getDistributorTermination')
    .then((response) => {
      // console.log('data :' + JSON.stringify(response.data.data));
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
      if (error.response) {
        // Vue.$toast.open({
        //   message: error.response.data.message,
        //   type: 'error',
        // });
        if (error.response.status == 401) {
          logout()
        } else {
          return 'error'
        }
      }
    })
}

export async function getDistributorApproval () {
  await servicesModule2.header()
  return axios
    .get('/api/module2/getDistributorApproval')
    .then((response) => {
      // console.log('data :' + JSON.stringify(response.data.data));
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
      if (error.response) {
        // Vue.$toast.open({
        //   message: error.response.data.message,
        //   type: 'error',
        // });
        if (error.response.status == 401) {
          logout()
        } else {
          return 'error'
        }
      }
    })
}

export async function getConsultantsResignationForAdminApproval (data) {
  await servicesModule2.header()
  return axios
    .get('/api/module2/consultants-resignation-for-admin-approval', {
      params: {
        DISTRIBUTOR_ID: data,
      },
    })
    .then((response) => {
      // console.log('data :' + JSON.stringify(response.data.data));
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
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
export async function getConsultantsResignationForManagerApproval (data) {
  await servicesModule2.header()
  return axios
    .get('/api/module2/consultants-resignation-for-manager-approval', {
      params: {
        DISTRIBUTOR_ID: data,
      },
    })
    .then((response) => {
      // console.log('data :' + JSON.stringify(response.data.data));
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
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

export async function consultantResignationApprovalData (consultId, resignId, groupId) {
  await servicesModule2.header()
  return axios
    .get('/api/module2/consultant_resignation_approval_datas', {
      params: {
        CONSULTANT_ID: consultId,
        RESIGNATION_ID: resignId,
        APPR_GROUP_ID: groupId,
      },
    })
    .then((response) => {
      return response.data.data
    })
    .catch(function (error) {
      throw error
    })
}

export async function getResignationApprovalLog (consultId, resignId) {
  await servicesModule2.header()
  return axios
    .get('/api/module2/resignation-approval-logs', {
      responseType: 'application/json',
      params: {
        CONSULTANT_ID: consultId,
        RESIGNATION_ID: resignId,
      },
    })
    .then((response) => {
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
      if (error.response) {
        if (error.response.status == 401) {
          logout()
        } else {
          return 'error'
        }
      }
    })
}

export async function getTerminationByDistributor (data) {
  await servicesModule2.header()
  return axios
    .get(`/api/module2/getTerminationByDistributor/${data}`)
    .then((response) => {
      console.log('list : ' + JSON.stringify(response.data.data))
      return response.data.data
    })
}

export async function getAllDraftedTermination (DIST_ID, SUBMISSION_ID) {
  await servicesModule2.header()
  return axios
    .get('/api/module2/getAllDraftedTermination', {
      params: {
        DIST_ID: DIST_ID,
        SUBMISSION_ID: SUBMISSION_ID,
      },
    })
    .then((response) => {
      console.log('list : ' + JSON.stringify(response.data.data))
      return response.data.data
    })
}
export async function getAllDraftedTerminationDistAdmin (DIST_ID, SUBMISSION_ID) {
  await servicesModule2.header()
  return axios
    .get('/api/module2/getAllDraftedTerminationDistAdmin', {
      params: {
        DIST_ID: DIST_ID,
        SUBMISSION_ID: SUBMISSION_ID,
      },
    })
    .then((response) => {
      console.log('list : ' + JSON.stringify(response.data.data))
      return response.data.data
    })
}

export async function getAllTerminationAdminBySubmissionId (DIST_ID, TS_ID, SUBMISSION_ID) {
  await servicesModule2.header()
  return axios
    .get('/api/module2/consultant_termination_admin_by_submissionID', {
      params: {
        DIST_ID: DIST_ID,
        TS_ID: TS_ID,
        SUBMISSION_ID: SUBMISSION_ID,
      },
    })
    .then((response) => {
      // console.log('data :' + JSON.stringify(response.data.data));
      Vue.$toast.open({
        message: response.data.message,
        type: 'success',
      })
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
      if (error.response) {
        // Vue.$toast.open({
        //   message: error.response.data.message,
        //   type: 'error',
        // });
        if (error.response.status == 401) {
          logout()
        } else {
          return 'error'
        }
      }
    })
}
export async function getAllTerminationManagerBySubmissionId (DIST_ID, TS_ID, SUBMISSION_ID) {
  await servicesModule2.header()
  return axios
    .get('/api/module2/consultant_termination_manager_by_submissionID', {
      params: {
        DIST_ID: DIST_ID,
        TS_ID: TS_ID,
        SUBMISSION_ID: SUBMISSION_ID,
      },
    })
    .then((response) => {
      // console.log('data :' + JSON.stringify(response.data.data));
      Vue.$toast.open({
        message: response.data.message,
        type: 'success',
      })
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
      if (error.response) {
        // Vue.$toast.open({
        //   message: error.response.data.message,
        //   type: 'error',
        // });
        if (error.response.status == 401) {
          logout()
        } else {
          return 'error'
        }
      }
    })
}

export async function getPendingApprovalDataManager (DIST_ID, TS_ID, SUBMISSION_ID) {
  await servicesModule2.header()
  return axios
    .get('/api/module2/getPendingApprovalDataManager', {
      params: {
        DIST_ID: DIST_ID,
        TS_ID: TS_ID,
        SUBMISSION_ID: SUBMISSION_ID,
      },
    })
    .then((response) => {
      console.log('list : ' + JSON.stringify(response.data.data))
      return response.data.data
    })
}
export async function getAllDraftedHODTermination (DIST_ID, SUBMISSION_ID) {
  await servicesModule2.header()
  return axios
    .get('/api/module2/getAllDraftedHODTermination', {
      params: {
        DIST_ID: DIST_ID,
        SUBMISSION_ID: SUBMISSION_ID,
      },
    })
    .then((response) => {
      console.log('list : ' + JSON.stringify(response.data.data))
      return response.data.data
    })
}

export async function getApprovalStatus (data) {
  await servicesModule2.header()
  return axios
    .get('/api/module2/get-approval-status/' + data)
    .then((response) => {
      console.log('list : ' + JSON.stringify(response.data.data))
      return response.data.data
    })
}

export async function getConsultantsByDistributorID (data) {
  await servicesModule2.header()
  return axios
    .get(`/api/module2/consultants-by-distributor-except-terminated/${data}`)
    .then((response) => {
      console.log('list : ' + JSON.stringify(response.data.data))
      return response.data.data
    })
}

export async function getConsultantByDistributor (data) {
  await servicesModule2.header()
  return axios
    .get(`/api/module2/consultants-by-distributor/${data}`)
    .then((response) => {
      console.log('list : ' + JSON.stringify(response.data.data))
      return response.data.data
    })
}

export async function getConsultantUnderDistributor (distId) {
  await servicesModule2.header()
  return axios
    .get(`/api/module2/consultants-under-distributor/${distId}`)
    .then((response) => {
      // console.log("Consultant Under distributors : " + JSON.stringify(response.data.data));
      return response.data.data
    })
}

export async function getConsultantsFromTermination () {
  await servicesModule2.header()
  return axios
    .get('/api/module2/consultant_list_from_termination', {
      params: {
        CATEGORY: 2, // refer cm_TERMINATION_TYPE TABLE -> CATEGORY 2 = DISTRIBUTOR
      },
    })
    .then((response) => {
      console.log('list : ' + JSON.stringify(response.data.data))
      return response.data.data
    })
}

export async function getAppealTypes () {
  await servicesModule2.header()
  return axios
    .get('/api/module2/appeal_types')
    .then((response) => {
      return response.data.data
    })
}

export async function getAppealTypesExamRelated (data) {
  await servicesModule2.header()
  return axios
    .get('/api/module2/appeal_types_exam_related', {
      responseType: 'application/json',
      params: {
        CONSULTANT_ID: data,
      },
    })
    .then((response) => {
      return response.data.data
    })
}

export async function getConsultantAppeal (data) {
  await servicesModule2.header()
  return axios
    .get('/api/module2/consultant_appeal', {
      params: {
        CONSULTANT_ID: data,
      },
    })
    .then((response) => {
      return response.data.data
    })
}

export async function postAppeal (data) {
  await servicesModule2.header()
  return axios
    .post('/api/module2/appeal', data)
    .then((response) => {
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
      if (error.response) {
        if (error.response.status == 401) {
          logout()
        } else {
          return 'error'
        }
      }
    })
}

export async function putAppeal (data) {
  await servicesModule2.header()
  return axios
    .put('/api/module2/appeal', data)
    .then((response) => {
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
      if (error.response) {
        if (error.response.status == 401) {
          logout()
        } else {
          return 'error'
        }
      }
    })
}

export async function getAppeal (distributorId) {
  await servicesModule2.header()
  return axios
    .get('/api/module2/appeal', {
      params: {
        DISTRIBUTOR_ID: distributorId,
      },
    })
    .then((response) => {
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
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

export async function postAppealApproval (data) {
  await servicesModule2.header()
  return axios
    .post('/api/module2/appeal_approval', data)
    .then((response) => {
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
      if (error.response) {
        if (error.response.status == 401) {
          logout()
        } else {
          return 'error'
        }
      }
    })
}

export async function putAppealApproval (data) {
  await servicesModule2.header()
  return axios
    .put('/api/module2/appeal_approval', data)
    .then((response) => {
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
      if (error.response) {
        if (error.response.status == 401) {
          logout()
        } else {
          return 'error'
        }
      }
    })
}
//* ******************************** renewable list*********************************/
export async function uploadNewRenewList (data) {
  await servicesModule2.header()
  return axios.post('/api/module1/import_new_renewable', data).then(response => {
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

export async function getRenewalConsultantManager (distId, TS_ID, submissionDate) {
  await servicesModule2.header()
  return axios
    .get('/api/module2/consultant-renewal-manager', {
      params: {
        DISTRIBUTOR_ID: distId,
        TS_ID: TS_ID,
        SUBMISSION_DATE: submissionDate,
      },
    })
    .then((response) => {
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
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

export async function getRenewalConsultantReviewer (distId, TS_ID, submissionDate) {
  await servicesModule2.header()
  return axios
    .get('/api/module2/consultant-renewal-reviewer', {
      params: {
        DISTRIBUTOR_ID: distId,
        TS_ID: TS_ID,
        SUBMISSION_DATE: submissionDate,
      },
    })
    .then((response) => {
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
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

export async function getRenewalStatusList () {
  await servicesModule2.header()
  return axios
    .get('/api/module2/consultant-renewal-status')
    .then((response) => {
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
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
export async function getRenewalReviewerStatusList (distId) {
  await servicesModule2.header()
  return axios
    .get('/api/module2/consultant-renewal-reviewer-status', {
      params: {
        DISTRIBUTOR_ID: distId,
      },
    })
    .then((response) => {
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
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

export async function getRenewalManagerStatusList (distId) {
  await servicesModule2.header()
  return axios
    .get('/api/module2/consultant-renewal-manager-status', {
      params: {
        DISTRIBUTOR_ID: distId,
      },
    })
    .then((response) => {
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
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
export async function getAllRenewalForAdmin (data) {
  return axios.get('/api/module2/consultant_renewal_admin', {
    params: {
      DIST_ID: data,
    },
  })
    .then((response) => {
      Vue.$toast.open({
        message: response.data.message,
        type: 'success',
      })
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
      if (error.response) {
        // Vue.$toast.open({
        //   message: error.response.data.message,
        //   type: 'error',
        // });
        if (error.response.status == 401) {
          logout()
        } else {
          return 'error'
        }
      }
    })
}

export async function getAllRenewalAdminByStatus (DIST_ID, TS_ID) {
  await servicesModule2.header()
  return axios
    .get('/api/module2/consultant_renewal_admin_by_status', {
      params: {
        DIST_ID: DIST_ID,
        TS_ID: TS_ID,
      },
    })
    .then((response) => {
      // console.log('data :' + JSON.stringify(response.data.data));
      Vue.$toast.open({
        message: response.data.message,
        type: 'success',
      })
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
      if (error.response) {
        // Vue.$toast.open({
        //   message: error.response.data.message,
        //   type: 'error',
        // });
        if (error.response.status == 401) {
          logout()
        } else {
          return 'error'
        }
      }
    })
}

export async function getRenewalConsultant (distId) {
  await servicesModule2.header()
  return axios
    .get('/api/module2/consultant-renewal', {
      params: {
        DISTRIBUTOR_ID: distId,
      },
    })
    .then((response) => {
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
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
export async function getDraftedRenewalReviewerConsultant (distId, SUBMISSION_DATE = null, TS_ID = null) {
  await servicesModule2.header()
  return axios
    .get('/api/module2/consultant-drafted-renewal-reviewer', {
      params: {
        DISTRIBUTOR_ID: distId,
        SUBMISSION_DATE: SUBMISSION_DATE,
        TS_ID: TS_ID,
      },
    })
    .then((response) => {
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
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

export async function getDraftedRenewalConsultant (distId, SUBMISSION_DATE = null, TS_ID = null) {
  await servicesModule2.header()
  return axios
    .get('/api/module2/consultant-drafted-renewal', {
      params: {
        DISTRIBUTOR_ID: distId,
        SUBMISSION_DATE: SUBMISSION_DATE,
        TS_ID: TS_ID,
      },
    })
    .then((response) => {
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
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
export async function getDraftinsufficientList (distId, SUBMISSION_DATE = null, TS_ID = null) {
  await servicesModule2.header()
  return axios
    .get('/api/module2/insufficient-drafted-list', {
      params: {
        DISTRIBUTOR_ID: distId,
        SUBMISSION_DATE: SUBMISSION_DATE,
        TS_ID: TS_ID,
      },
    })
    .then((response) => {
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
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
export async function getInsufficientRecord (distId) {
  await servicesModule2.header()
  return axios
    .get('/api/module2/insufficient-list', {
      params: {
        DISTRIBUTOR_ID: distId,
      },
    })
    .then((response) => {
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
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
export async function getAppealApproval () {
  await servicesModule2.header()
  return axios
    .get('/api/module2/appeal_approval')
    .then((response) => {
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
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

export async function postConsultantRenewal (data) {
  await servicesModule2.header()
  return axios
    .post('/api/module2/consultant-renewal', data)
    .then((response) => {
      Vue.$toast.open({
        message: response.data.message,
        type: 'success',
      })
      return response.data.data
    })
    .catch(function (error) {
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
export async function postConsultantRenewalManager (data) {
  await servicesModule2.header()
  return axios
    .post('/api/module2/consultant-renewal-manager', data)
    .then((response) => {
      Vue.$toast.open({
        message: response.data.message,
        type: 'success',
      })
      return response.data.data
    })
    .catch(function (error) {
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

export async function postConsultantRenewalReviewer (data) {
  await servicesModule2.header()
  return axios
    .post('/api/module2/consultant-renewal-reviewer', data)
    .then((response) => {
      Vue.$toast.open({
        message: response.data.message,
        type: 'success',
      })
      return response.data.data
    })
    .catch(function (error) {
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

export async function postRenewal (data) {
  await servicesModule2.header()
  return axios
    .post('/api/module2/renewal', data)
    .then((response) => {
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
      if (error.response) {
        if (error.response.status == 401) {
          logout()
        } else {
          return 'error'
        }
      }
    })
}

export async function putRenewal (data) {
  await servicesModule2.header()
  return axios
    .put('/api/module2/renewal', data)
    .then((response) => {
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
      if (error.response) {
        if (error.response.status == 401) {
          logout()
        } else {
          return 'error'
        }
      }
    })
}

export async function getRenewal () {
  await servicesModule2.header()
  return axios
    .get('/api/module2/renewal')
    .then((response) => {
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
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

export async function postRenewalApproval (data) {
  await servicesModule2.header()
  return axios
    .post('/api/module2/renewal_approval', data)
    .then((response) => {
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
      if (error.response) {
        if (error.response.status == 401) {
          logout()
        } else {
          return 'error'
        }
      }
    })
}

export async function putRenewalApproval (data) {
  await servicesModule2.header()
  return axios
    .put('/api/module2/renewal_approval', data)
    .then((response) => {
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
      if (error.response) {
        if (error.response.status == 401) {
          logout()
        } else {
          return 'error'
        }
      }
    })
}

export async function getRenewalApproval () {
  await servicesModule2.header()
  return axios
    .get('/api/module2/renewal_approval')
    .then((response) => {
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
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

export async function postBankruptcy (data) {
  await servicesModule2.header()
  return axios
    .post('/api/module2/bankruptcy', data)
    .then((response) => {
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
      if (error.response) {
        if (error.response.status == 401) {
          logout()
        } else {
          return 'error'
        }
      }
    })
}

export async function putBankruptcy (data) {
  await servicesModule2.header()
  return axios
    .put('/api/module2/bankruptcy', data)
    .then((response) => {
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
      if (error.response) {
        if (error.response.status == 401) {
          logout()
        } else {
          return 'error'
        }
      }
    })
}

export async function getBankruptcy () {
  await servicesModule2.header()
  return axios
    .get('/api/module2/bankruptcy')
    .then((response) => {
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
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

export async function postBankruptcyApproval (data) {
  await servicesModule2.header()
  return axios
    .post('/api/module2/bankruptcy_approval', data)
    .then((response) => {
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
      if (error.response) {
        if (error.response.status == 401) {
          logout()
        } else {
          return 'error'
        }
      }
    })
}

export async function putBankruptcyApproval (data) {
  await servicesModule2.header()
  return axios
    .put('/api/module2/bankruptcy_approval', data)
    .then((response) => {
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
      if (error.response) {
        if (error.response.status == 401) {
          logout()
        } else {
          return 'error'
        }
      }
    })
}

export async function getBankruptcyApproval () {
  await servicesModule2.header()
  return axios
    .get('/api/module2/bankruptcy_approval')
    .then((response) => {
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
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

// get distributor wallet
export async function getDistributorWallet () {
  await servicesModule2.header()
  return axios
    .get('/api/module2/distributorWallets')
    .then((response) => {
      // console.log('data :' + JSON.stringify(response.data.data));
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
      if (error.response) {
        // Vue.$toast.open({
        //   message: error.response.data.message,
        //   type: 'error',
        // });
        if (error.response.status == 401) {
          logout()
        } else {
          return 'error'
        }
      }
    })
}

export async function createNewConsultant (data) {
  const config = {
    header: {
      'Content-Type': 'multipart/form-data',
    },
  }
  await servicesModule2.header()
  return axios
    .post('/api/module2/consultant', data, config)
    .then((response) => {
      // console.log(
      //   "create consultant response data :" + JSON.stringify(response.data.data)
      // );
      return response.data
    })
    .catch(function (error) {
      console.log(error)
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

export async function uploadConsultantDocuments (data) {
  await servicesModule2.header()
  return axios
    .post('/api/module2/consultantDocuments', data)
    .then((response) => {
      return response.data
    })
    .catch(function (error) {
      console.log(error)
    })
}

export async function uploadConsultantExtraDocuments (data) {
  await servicesModule2.header()
  return axios
    .post('/api/module2/consultantExtraDocuments', data)
    .then((response) => {
      return response.data
    })
    .catch(function (error) {
      console.log(error)
    })
}

export async function uploadConsultantEducation (data) {
  await servicesModule2.header()
  return axios
    .post('/api/module2/consultant_education', data)
    .then((response) => {
      return response.data
    })
    .catch(function (error) {
      console.log(error)
    })
}

export async function uploadConsultantQualification (data) {
  await servicesModule2.header()
  return axios
    .post('/api/module2/consultant_qualification', data)
    .then((response) => {
      return response.data
    })
    .catch(function (error) {
      console.log(error)
    })
}

export async function getConsultantQualification (consultantId) {
  await servicesModule2.header()
  return axios
    .get('/api/module2/get_consultant_qualification', {
      params: {
        CONSULTANT_ID: consultantId,
      },
    })
    .then((response) => {
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
      if (error.response) {
        if (error.response.status == 401) {
          logout()
        } else {
          return 'error'
        }
      }
    })
}

export async function deleteSavedQualificationData (data) {
  await servicesModule2.header()
  return axios
    .delete('/api/module2/qualification_data_delete', {
      params: {
        QUALIFICATION_ID: data,
      },
    })
    .then((response) => {
      Vue.$toast.open({
        message: response.data.message,
        type: 'success',
      })
      return response.data
    })
    .catch(function (error) {
      console.log(error)
      if (error.response) {
        if (error.response.status == 401) {
          logout()
        } else {
          return 'error'
        }
      }
    })
}

export async function deleteSavedCreditSubject (data) {
  await servicesModule2.header()
  return axios
    .delete('/api/module2/credit-subject_delete', {
      params: {
        CREDIT_SUBJECT_ID: data,
      },
    })
    .then((response) => {
      Vue.$toast.open({
        message: response.data.message,
        type: 'success',
      })
      return response.data
    })
    .catch(function (error) {
      console.log(error)
      if (error.response) {
        if (error.response.status == 401) {
          logout()
        } else {
          return 'error'
        }
      }
    })
}

export async function deleteConsultantUploadedDocument (data) {
  await servicesModule2.header()
  return axios
    .delete('/api/module2/consultant_document_delete', {
      params: {
        CA_DOCUMENT_ID: data,
      },
    })
    .then((response) => {
      Vue.$toast.open({
        message: response.data.message,
        type: 'success',
      })
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
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

export async function deleteConsultantTerminationDocument (data) {
  await servicesModule2.header()
  return axios
    .delete('/api/module2/consultant_termination_document_delete', {
      params: {
        TERMINATION_DOCUMENT_ID: data,
      },
    })
    .then((response) => {
      Vue.$toast.open({
        message: response.data.message,
        type: 'success',
      })
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
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

export async function consultantProfileUpdate (data) {
  await servicesModule2.header()
  return axios
    .post('/api/module2/profileUpdate', data)
    .then((response) => {
      Vue.$toast.open({
        message: response.data.message,
        type: 'success',
      })
      return response.data.data
    })
    .catch(function (error) {
      // console.log(error);
      if (error.response) {
        // throw error
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

export async function checkConsultantUserByNric (data) {
  await servicesModule2.header()
  alert('checkConsultantUserByNric')
  return axios
    .post('/api/module2/user_check_ic', data)
    .then((response) => {
      console.log(
        'check user nric data  :' + JSON.stringify(response.data.data),
      )

      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
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
export async function getCountry () {
  return axios.get('/api/module2/countries').then((response) => {
    // console.log('findConsultantByUserId data :' + JSON.stringify(response.data.data));
    return response.data.data
  })
    .catch(function (error) {
      alert('error occoured')
      console.log(error)
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

export async function findConsultantByUserId (userId) {
  await servicesModule2.header()
  return axios
    .get(`/api/module2/get_consultant_user/${userId}`)
    .then((response) => {
      // console.log('findConsultantByUserId data :' + JSON.stringify(response.data.data));
      return response.data.data
    })
    .catch(function (error) {
      alert('error occoured')
      console.log(error)
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

export async function findConsultantByUserIdForProfileUpdateApproval (userId) {
  await servicesModule2.header()
  return axios
    .get(`/api/module2/get_consultant_user_for_profile_update/${userId}`)
    .then((response) => {
      // console.log('findConsultantByUserId data :' + JSON.stringify(response.data.data));
      return response.data.data
    })
    .catch(function (error) {
      alert('error occoured')
      console.log(error)
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

export async function getDistributorDetails (userId) {
  await servicesModule2.header()
  return axios
    .get(`/api/module2/getyDistributorsByConsultant/${userId}`)
    .then((response) => {
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
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

export async function getActiveLicenses (userId) {
  await servicesModule2.header()
  return axios
    .get(`/api/module2/getConsultantActiveLicenses/${userId}`)
    .then((response) => {
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
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

export async function storeApplicantLicenses (data) {
  await servicesModule2.header()
  return axios
    .post('/api/module2/applicants/licenses', data)
    .then((response) => {
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
    })
}

export async function addConsultantLicense (data) {
  await servicesModule2.header()
  return axios
    .post('/api/module2/applicants/add_license_type', data)
    .then((response) => {
      return response.data
    })
    .catch(function (error) {
      console.log(error)
    })
}

export async function getAcceptanceList (consultantNric, consultantPassport) {
  // await servicesModule1.header();
  await servicesModule2.header()
  return axios.get('/api/module2/getAcceptanceListByID', {
    params: {
      CONSULTANT_NRIC: consultantNric,
      CONSULTANT_PASSPORT_NO: consultantPassport,
    },
  }).then(response => {
    console.log(JSON.stringify(response.data.data))
    return response.data.data
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 500) {
        // console.log(JSON.stringify(error.response.data.message));
        if (error.response.data.message == 'Token expired.') {
          console.log('logout')
          // logout();
        } else {
          console.log(error.response.data.message)
        }
      } else if (error.response.status == 401) {
        // logout();
      }
      return 'error'
    }
  })
}

export async function getDistributorsConsultantRecords () {
  await servicesModule2.header()
  return axios
    .get('/api/module2/distributor_records')
    .then((response) => {
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
      if (error.response) {
        if (error.response.status == 401) {
          logout()
        } else {
          return 'error'
        }
      }
    })
}

export async function getConsultantDataByDistributor (data) {
  await servicesModule2.header()
  return axios
    .get('/api/module2/getConsultantsByDistributor', {
      responseType: 'application/json',
      params: {
        DISTRIBUTOR_ID: data.DISTRIBUTOR_ID,
        CONSULTANT_APPLICATION_TYPE: data.CONSULTANT_APPLICATION_TYPE,
      },
    })
    .then((response) => {
      console.log('list : ' + JSON.stringify(response.data.data))
      return response.data.data
    })
}

// Consultant CPD POINT

export async function getFpCategory () {
  await servicesModule2.header()
  return axios.get('/api/module2/get_fp_categories').then(response => {
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

export async function getCumulativePoint (CONSULTANT) {
  await servicesModule2.header()
  return axios.get(`/api/module2/get_cumulative_point/${CONSULTANT}`).then(response => {
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

export async function getConsultantLicenseWithDist (CONSULTANT_ID) {
  await servicesModule2.header()
  return axios.get(`/api/module2/get_consultant_license_with_dist/${CONSULTANT_ID}`).then(response => {
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

export async function getConsultantCPDDetails (VALUE = null, CONSULTANT_ID) {
  await servicesModule2.header()
  return axios.get('/api/module2/consultant_cpd_point_details', {
    params: {
      VALUE: VALUE,
      CONSULTANT_ID: CONSULTANT_ID,
    },
  }).then(response => {
    Vue.$toast.open({
      message: response.data.message,
      type: 'success',
    })
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
// Exam Declaration Integration By Tahmina
export async function getConsulatntDeclaration(data_set, data_type) {
  await servicesModule2.header()
  return axios
    .get('/api/module2/get_consultant_declaration', {
      responseType: 'application/json',
      params: {
        DECLARATION_SET_PARAM: data_set,
        DECLARATION_SET_TYPE: data_type,
      },
    })
    .then((response) => {
      // console.log('data :' + JSON.stringify(response.data.data));
      return response.data.data
    })
    .catch(function (error) {
      console.log(error)
      if (error.response) {
        // Vue.$toast.open({
        //   message: error.response.data.message,
        //   type: 'error',
        // });
        if (error.response.status == 401) {
          logout()
        } else {
          return 'error'
        }
      }
    })
}
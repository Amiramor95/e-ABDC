// ros

import axios from 'axios'
import * as servicesModule6 from '../module0/services'

// Distributor registration payment

export async function getAllDistributorRegistration (data={}) {
  await servicesModule6.header()
  return axios.get('/api/module6/distributor_registration',{params:data}).then(response => {
    return response.data.data
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 401) {
        // logout()
      } else {
        return 'error'
      }
    }
  })
}


//update
export async function updatedistReg (data) {
  await servicesModule6.header()
  return axios.post('/api/module6/update_distReg', data).then(response => {
    // console.log("exception create :" + JSON.stringify(response.data));
    return response.data
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 401) {
        // logout()
      } else {
        return 'error'
      }
    }
  })
}

// consultant registration payment

export async function getAllConsultantRegistration (data={}) {
  await servicesModule6.header()
  return axios.get('/api/module6/consultant_registration',{params:data}).then(response => {
    return response.data.data
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 401) {
        // logout()
      } else {
        return 'error'
      }
    }
  })
}

export async function getAllConsultantRegistrationExcell () {
  await servicesModule6.header()
  return axios.get('/api/module6/consultant_registration_Excell').then(response => {
    console.log('Record list :' + JSON.stringify(response.data.data))
    return response.data.data
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 401) {
        // logout()
      } else {
        return 'error'
      }
    }
  })
}


export async function getAllConsultantRegList (data) {
  await servicesModule6.header()
  return axios.get('/api/module6/consultant_registration_List', {
    params: {
      LEDGER_ID: data,
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

export async function updateConsultantReg (data) {
  await servicesModule6.header()
  return axios.post('/api/module6/updateConsultantReg', data).then(response => {
    // console.log("exception create :" + JSON.stringify(response.data));
    return response.data
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 401) {
        // logout()
      } else {
        return 'error'
      }
    }
  })
}

// Pre-payment topup

export async function getIssueingBank () {
  await servicesModule6.header()
  return axios.get('/api/module6/issueingbank').then(response => {
    return response.data.data
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 401) {
        // logout()
      } else {
        return 'error'
      }
    }
  })
}

export async function getBallance (data) {
  await servicesModule6.header()
  return axios.get('/api/module6/ballance', {
    params: {
      DIST_ID: data,
    },
  }).then(response => {
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

export async function createPrepayment (data) {
  await servicesModule6.header()
  return axios.post('/api/module6/create_topup', data).then(response => {
    return response.data
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 401) {
        // logout()
      } else {
        return 'error'
      }
    }
  })
}

export async function getAllPrepaymentTopup (data={}) {
  await servicesModule6.header()
  return axios.get('/api/module6/prepayment_topup',{params:data}).then(response => {
    return response.data.data
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 401) {
        // logout()
      } else {
        return 'error'
      }
    }
  })
}

export async function checkFinanceCode (DIST_ID) {
  await servicesModule6.header()
  return new Promise((resolve, reject) => {
    axios.get('/api/module6/checkFinanceCode?DIST_ID=' + DIST_ID).then(res => resolve(res)).catch(err => reject(err))
  })
}


export async function prepayment_topup_distributor (userId) {
  await servicesModule6.header()
  return new Promise((resolve, reject) => {
    axios.get('/api/module6/prepayment_topup_distributor?DIST_ID=' + userId).then(res => resolve(res)).catch(err => reject(err))
  })
}

export function getPrepaymentTopDocument (ledgerId) {
  return new Promise(async function (resolve, reject) {
    await servicesModule6.header()
    axios.get('/api/module6/prepayment_topup_document/' + ledgerId).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}

export function getAMSFLedgerAndDocumentDetail(ledgerId){
  return new Promise(async function (resolve, reject) {
    await servicesModule6.header()
    axios.get('/api/module6/getAMSFLedgerAndDocumentDetail?LEDGER_ID=' + ledgerId).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}

export async function getAllPrepaymentTopupExcell () {
  await servicesModule6.header()
  return axios.get('/api/module6/prepayment_topup_Excell').then(response => {
    return response.data.data
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 401) {
        // logout()
      } else {
        return 'error'
      }
    }
  })
}

//
export async function updatetopup (data) {
  await servicesModule6.header()
  return axios.post('/api/module6/update_topup', data).then(response => {
    return response
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 401) {
        // logout()
      } else {
        return 'error'
      }
    }
  })
}

// return_topup

export async function returntopup (data) {
  await servicesModule6.header()
  return axios.post('/api/module6/return_topup', data).then(response => {
    // console.log("exception create :" + JSON.stringify(response.data));
    return response.data
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 401) {
        // logout()
      } else {
        return 'error'
      }
    }
  })
}

// AMSF collection

//
export async function getAMSFDetails (data) {
  await servicesModule6.header()
  return axios.get('/api/module6/amsfDetails', {
    params: {
      USER_ID: data,
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


//submission createAMSF

export async function createAMSF (data) {
  await servicesModule6.header()
  return axios.post('/api/module6/createAMSF', data).then(response => {
    // console.log("exception create :" + JSON.stringify(response.data));
    return response.data
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 401) {
        // logout()
      } else {
        return 'error'
      }
    }
  })
}

export async function updateAMSF (data) {
  await servicesModule6.header()
  return axios.post('/api/module6/updateAMSF', data).then(response => {
    // console.log("exception create :" + JSON.stringify(response.data));
    return response.data
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 401) {
        // logout()
      } else {
        return 'error'
      }
    }
  })
}

export async function getAllAMSFCollection (data={}) {
  await servicesModule6.header()
  return axios.get('/api/module6/AMSF_Collection',{params:data}).then(response => {
    return response.data.data
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 401) {
        // logout()
      } else {
        return 'error'
      }
    }
  })
}

export async function getAMSF_Collection2_Distributor (userId) {
  await servicesModule6.header()
  return new Promise((resolve, reject) => {
    axios.get('/api/module6/AMSF_Collection2_Distributor?DIST_ID=' + userId).then(res => resolve(res)).catch(err => reject(err))
  })
}

export async function getDistributorLedgerDetail (DIST_ID,DIST_TYPE_ID) {
  await servicesModule6.header()
  return new Promise((resolve, reject) => {
    axios.get('/api/module6/distributor-ledger-details?DIST_ID=' + DIST_ID + '&DIST_TYPE_ID='+DIST_TYPE_ID).then(res => resolve(res)).catch(err => reject(err))
  })
}



export async function getAllAMSFCollectionExcell () {
  await servicesModule6.header()
  return axios.get('/api/module6/AMSF_Collection_Excell').then(response => {
    console.log('Record list :' + JSON.stringify(response.data.data))
    return response.data.data
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 401) {
        // logout()
      } else {
        return 'error'
      }
    }
  })
}

//
export async function update_amsf (data) {
  await servicesModule6.header()
  return axios.post('/api/module6/update_amsf', data).then(response => {
    // console.log("exception create :" + JSON.stringify(response.data));
    return response.data
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 401) {
        // logout()
      } else {
        return 'error'
      }
    }
  })
}

export function getAsmfDocument (ledgerId) {
  return new Promise(async (resolve, reject) => {
    await servicesModule6.header()
    axios.get('/api/module6/amsfDetails_document/' + ledgerId).then(res => resolve(res)).catch(err => reject(err))
  })
}

// return_amsf

export async function return_amsf (data) {
  await servicesModule6.header()
  return axios.post('/api/module6/return_amsf', data).then(response => {
    // console.log("exception create :" + JSON.stringify(response.data));
    return response.data
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 401) {
        // logout()
      } else {
        return 'error'
      }
    }
  })
}

export async function amsfPayment (data) {
  await servicesModule6.header()
  return axios.post('/api/module6/amsf_Payment', data).then(response => {
    // console.log("exception create :" + JSON.stringify(response.data));
    return response.data
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 401) {
        // logout()
      } else {
        return 'error'
      }
    }
  })
}

export async function getRefundDistributorTerminationList (data={}) {
  await servicesModule6.header()
  return axios.get('/api/module6/refund_distributor_termination',{params:data}).then(response => {
    return response.data.data
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 401) {
        // logout()
      } else {
        return 'error'
      }
    }
  })
}


export async function refundDist (data) {
  await servicesModule6.header()
  return axios.post('/api/module6/refund_Dist', data).then(response => {
    // console.log("exception create :" + JSON.stringify(response.data));
    return response.data
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 401) {
        // logout()
      } else {
        return 'error'
      }
    }
  })
}

// Refund exam

export async function getAllRefundExamWaiver (data) {
  await servicesModule6.header()
  return axios.get('/api/module6/refund_exam_waiver',{params:data}).then(response => {
    return response.data.data
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status === 401) {
        // logout()
      } else {
        return 'error'
      }
    }
  })
}

export async function refund_exam_waiverExcel () {
  await servicesModule6.header()
  return new Promise((resolve, reject) => {
    axios.get('/api/module6/refund_exam_waiverExcel').then(res => resolve(res)).catch(err => reject(err))
  })
}


export async function getAllExamWaiverList (data) {
  await servicesModule6.header()
  return axios.get('/api/module6/refund_exam_waiver_List', {
    params: {
      LEDGER_ID: data,
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

export async function updateExamWaiver (data) {
  await servicesModule6.header()
  return axios.post('/api/module6/updateExamWaiver', data).then(response => {
    // console.log("exception create :" + JSON.stringify(response.data));
    return response.data
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status === 401) {
        // logout()
      } else {
        return 'error'
      }
    }
  })
}

// distributor ledger

export async function getAllDistributorledgerList (data) {
  await servicesModule6.header()
  return axios.get('/api/module6/distributor_ledger', {
    params: {
      USER_ID: data,
    },
  }).then(response => {
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

export async function getPrepaymentRefundSubmission (distributorID) {
  await servicesModule6.header()
  return new Promise((resolve, reject) => {
    axios.get('/api/module6/GetPrepayment_RefundSubmission/' + distributorID).then(res => resolve(res)).catch(err => reject(err))
  })
}

export async function getPrepaymentRefundSubmissionDetails (distributorId, groupByTimeStamp) {
  await servicesModule6.header()
  return new Promise((resolve, reject) => {
    axios.post('/api/module6/GetPrepayment_RefundSubmissionDetail', {
      DISTRIBUTOR_ID: distributorId,
      CREATED_TIMESTAMP: groupByTimeStamp,
    }).then(res => resolve(res)).catch(err => reject(err))
  })
}

export async function saveRefundSubmissionExamWaiver (payload) {
  await servicesModule6.header()
  return new Promise((resolve, reject) => {
    axios.post('/api/module6/SaveRefundSubmissionExamWaiver', payload).then(res => resolve(res)).catch(err => reject(err))
  })
}

export async function acknowledgeRejectPrepaymentRefundSubmissionForExamWaiver (payload) {
  await servicesModule6.header()
  return new Promise((resolve, reject) => {
    axios.post('/api/module6/AcknowledgeRejectPrepaymentRefundSubmissionForExamWaiver', payload).then(res => resolve(res)).catch(err => reject(err))
  })
}

export async function getdistributordetails (data) {
  await servicesModule6.header()
  return axios.get('/api/module6/distributor_details', {
    params: {
      USER_ID: data,
    },
  }).then(response => {
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
      } else if (error.response.status === 401) {
        // logout();
      }
      return 'error'
    }
  })
}

//ledger distributor registration & AMSF collection

export async function getDistRegandAMSFLedger () {
  await servicesModule6.header()
  return axios.get('/api/module6/ledger_distreg_amsf').then(response => {
    console.log('Record list :' + JSON.stringify(response.data.data))
    return response.data.data
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status === 401) {
        // logout()
      } else {
        return 'error'
      }
    }
  })
}

export async function distributor_reg_amfs_trans (userId) {
  await servicesModule6.header()
  return new Promise((resolve, reject) => {
    axios.get('/api/module6/distributor_reg_amfs_trans?DIST_USER_ID=' + userId).then(res => resolve(res.data.data)).catch(err => reject(err))
  })
}

//filter_DistRegandAMSFLedger
export async function filter_DistRegandAMSFLedger (data) {
  await servicesModule6.header()
  return axios.get('/api/module6/filter_DistRegandAMSFLedger', { params: data }).then(response => {
    console.log('data :' + JSON.stringify(response.data.data))
    return response.data.data
  }).catch(function (error) {
    if (error.response) {
      // Vue.$toast.open({
      //   message: error.response.data.message,
      //   type: 'error',
      // })
      if (error.response.status == 500) {
        // console.log(JSON.stringify(error.response.data.message));
        if (error.response.data.message == 'Token expired.') {
          console.log('logout')
          logout()
        } else {
          console.log(error.response.data.message)
        }
      } else if (error.response.status == 401) {
        logout()
      }
      return 'error'
    }
  })
}

//ledger prepayment

export async function getPrepaymentLedger () {
  await servicesModule6.header()
  return axios.get('/api/module6/ledger_prepayment').then(response => {
    console.log('Record list :' + JSON.stringify(response.data.data))
    return response.data.data
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 401) {
        // logout()
      } else {
        return 'error'
      }
    }
  })
}

//filter_prepayment_transaction
export async function filter_prepayment_transaction (data) {
  await servicesModule6.header()
  return axios.get('/api/module6/filter_prepayment_transaction', { params: data }).then(response => {
    console.log('data :' + JSON.stringify(response.data.data))
    return response.data.data
  }).catch(function (error) {
    if (error.response) {
      if (error.response.status == 500) {
        // console.log(JSON.stringify(error.response.data.message));
        if (error.response.data.message == 'Token expired.') {
          console.log('logout')
          logout()
        } else {
          console.log(error.response.data.message)
        }
      } else if (error.response.status == 401) {
        logout()
      }
      return 'error'
    }
  })
}

//csv
export async function getCSV1 () {
  await servicesModule6.header()
  return axios.get('/api/module6/distributor_registration_CSV').then(response => {
    return response.data.data
  }).catch(function (error) {
    if (error.response) {
      if (error.response.status === 401) {
      } else {
        return 'error'
      }
    }
  })
}

export async function getCSV2 () {
  await servicesModule6.header()
  return axios.get('/api/module6/consultant_registration_CSV').then(response => {
    console.log('Record list :' + JSON.stringify(response.data.data))
    return response.data.data
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 401) {
        // logout()
      } else {
        return 'error'
      }
    }
  })
}

export async function getCSV3 () {
  await servicesModule6.header()
  return axios.get('/api/module6/prepayment_topup_CSV').then(response => {
    return response.data.data
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 401) {
        // logout()
      } else {
        return 'error'
      }
    }
  })
}

export async function getCSV4 () {
  await servicesModule6.header()
  return axios.get('/api/module6/refund_distributor_termination_CSV').then(response => {
    console.log('Record list :' + JSON.stringify(response.data.data))
    return response.data.data
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 401) {
        // logout()
      } else {
        return 'error'
      }
    }
  })
}

export async function getCSV5 () {
  await servicesModule6.header()
  return axios.get('/api/module6/refund_exam_waiver_CSV').then(response => {
    console.log('Record list :' + JSON.stringify(response.data.data))
    return response.data.data
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 401) {
        // logout()
      } else {
        return 'error'
      }
    }
  })
}

export async function getCSV6 () {
  await servicesModule6.header()
  return axios.get('/api/module6/AMSF_Collection_CSV').then(response => {
    console.log('Record list :' + JSON.stringify(response.data.data))
    return response.data.data
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 401) {
        // logout()
      } else {
        return 'error'
      }
    }
  })
}

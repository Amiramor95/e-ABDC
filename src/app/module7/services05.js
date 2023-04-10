import axios from 'axios'
import * as servicesModule7 from '../module0/services'


export async function getFundList () {
  await servicesModule7.header()
  return axios.get('/api/module7/fundsubmission').then(response => {
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


export async function getAMSFYearForAnnualFees () {
  await servicesModule7.header()
  return new Promise((resolve, reject) => {
    axios.get('/api/module7/amsfYear').then(res => resolve(res)).catch(err => reject(err))
  })
}

export async function getAnnualFeeFinance () {
  await servicesModule7.header()
  return new Promise((resolve, reject) => {
    axios.get('/api/module7/annualfeefinance').then(res => resolve(res)).catch(err => reject(err))
  })
}

export async function getAnnualFeeHodFinance () {
  await servicesModule7.header()
  return new Promise((resolve, reject) => {
    axios.get('/api/module7/annualfeehodfinance').then(res => resolve(res)).catch(err => reject(err))
  })
}

export async function getAumEntryForDistManager (DIST_ID = '') {
  await servicesModule7.header()
  return new Promise((resolve, reject) => {
    axios.get('/api/module7/getAumEntryForDistManager?DIST_ID='+DIST_ID).then(res => resolve(res)).catch(err => reject(err))
  })
}

export async function getFundSumaryDetail (DIST_ID) {
  await servicesModule7.header()
  return new Promise((resolve, reject) => {
    axios.get('/api/module7/fund-sumary-details?DIST_ID='+DIST_ID).then(res => resolve(res)).catch(err => reject(err))
  })
}

export async function postRemarksForDistributorAumEntry (data = {}) {
  await servicesModule7.header()
  return new Promise((resolve, reject) => {
    axios.post('/api/module7/postRemarksForDistributorAumEntry', data).then(res => resolve(res)).catch(err => reject(err))
  })
}


export async function postfinVerification (data = {}) {
  await servicesModule7.header()
  return new Promise((resolve, reject) => {
    axios.post('/api/module7/postfinVerification', data).then(res => resolve(res)).catch(err => reject(err))
  })
}

export async function submitSaveDraftForDistributorManagerTGSEntry (data = {}) {
  await servicesModule7.header()
  return new Promise((resolve, reject) => {
    axios.post('/api/module7/submitSaveDraftForDistributorManagerTGSEntry', data).then(res => resolve(res)).catch(err => reject(err))
  })
}

export async function getTGSEntryForDistributorManager (DIST_ID='') {
  await servicesModule7.header()
  return new Promise((resolve, reject) => {
    axios.get('/api/module7/getTGSEntryForDistributorManager?DIST_ID='+DIST_ID).then(res => resolve(res)).catch(err => reject(err))
  })
}

export async function getTgsComment (DIST_ID='') {
  await servicesModule7.header()
  return new Promise((resolve, reject) => {
    axios.get('/api/module7/getTgsComment?DIST_ID='+DIST_ID).then(res => resolve(res)).catch(err => reject(err))
  })
}

export async function getAumFundEntry () {
  await servicesModule7.header()
  return new Promise((resolve, reject) => {
    axios.get('/api/module7/aum_fund_entry').then(res => resolve(res)).catch(err => reject(err))
  })
}

export async function saveAUMDEntryInSaveDraft (data) {
  await servicesModule7.header()
  return new Promise((resolve, reject) => {
    axios.post('/api/module7/saveAUMDEntryInSaveDraft', data).then(res => resolve(res)).catch(err => reject(err))
  })
}

export async function getTGSFundList (data = null) {
  await servicesModule7.header()
  return new Promise((resolve, reject) => {
    axios.get('/api/module7/tgs_fund_list', { params: data }).then(res => resolve(res)).catch(err => reject(err))
  })
}

export async function saveAndDraftTotalGrossSales (data) {
  await servicesModule7.header()
  return new Promise((resolve, reject) => {
    axios.post('/api/module7/saveAndDraftTotalGrossSales', data).then(res => resolve(res)).catch(err => reject(err))
  })
}

export async function getDistributorDetails (module_name = 'FUND_VALUE_ENTRY') {
  await servicesModule7.header()
  return new Promise((resolve, reject) => {
    axios.get('/api/module7/getDistributorDetails?MODULE_NAME=' + module_name).then(res => resolve(res)).catch(err => reject(err))
  })
}

export async function getPageActionInfo (module_name = 'FUND_VALUE_ENTRY') {
  await servicesModule7.header()
  return new Promise((resolve, reject) => {
    axios.get('/api/module7/getPageActionInfo?MODULE_NAME=' + module_name).then(res => resolve(res)).catch(err => reject(err))
  })
}

export async function getFundValueSubmissionByDistributor () {
  await servicesModule7.header()
  return new Promise((resolve, reject) => {
    axios.get('/api/module7/getFundValueSubmissionByDistributor').then(res => resolve(res)).catch(err => reject(err))
  })
}

export async function saveAMFSAnnualFeeSubmission (data = {}) {
  await servicesModule7.header()
  return new Promise((resolve, reject) => {
    axios.post('/api/module7/saveAMFSAnnualFeeSubmission', data).then(res => resolve(res)).catch(err => reject(err))
  })
}

/**
 *  Fimm Submission service implementation
 * */

export async function getAmfsSubmissionDetailFromFimm (moduleName) {
  await servicesModule7.header()
  const { MODULE_NAME } = moduleName
  return new Promise((resolve, reject) => {
    axios.get('/api/module7/amfsSubmissionDetailsFimm?MODULE_NAME='+MODULE_NAME).then(res => resolve(res)).catch(err => reject(err))
  })
}

export async function aumFundEntryFimm (DIST_ID) {
  await servicesModule7.header()
  return new Promise((resolve, reject) => {
    axios.get('/api/module7/aumFundEntryFimm?DIST_ID='+DIST_ID).then(res => resolve(res)).catch(err => reject(err))
  })
}

export async function getTGSEntryFimm (DIST_ID) {
  await servicesModule7.header()
  return new Promise((resolve, reject) => {
    axios.get('/api/module7/tgsFundEntryFimm?DIST_ID='+DIST_ID).then(res => resolve(res)).catch(err => reject(err))
  })
}

export async function postAumEntryFimm (data) {
  await servicesModule7.header()
  return new Promise((resolve, reject) => {
    axios.post('/api/module7/postAumEntryFimm',data).then(res => resolve(res)).catch(err => reject(err))
  })
}

export async function postTgsEntryFimm (data) {
  await servicesModule7.header()
  return new Promise((resolve, reject) => {
    axios.post('/api/module7/postTgsEntryFimm',data).then(res => resolve(res)).catch(err => reject(err))
  })
}

export async function distributorDetail (distId) {
  await servicesModule7.header()
  return new Promise((resolve, reject) => {
    axios.get('/api/module7/distributorDetails?DIST_ID='+distId).then(res => resolve(res)).catch(err => reject(err))
  })
}

export async function postConsultantDetailByRD (data) {
  await servicesModule7.header()
  return new Promise((resolve, reject) => {
    axios.post('/api/module7/postConsultantDetailByRD',data).then(res => resolve(res)).catch(err => reject(err))
  })
}

export async function consultantDetailsByDistributor (DIST_ID) {
  await servicesModule7.header()
  return new Promise((resolve, reject) => {
    axios.get('/api/module7/consultantDetailsByDistributor?DIST_ID='+DIST_ID).then(res => resolve(res)).catch(err => reject(err))
  })
}


export async function postRdSubmissionVerification (data) {
  await servicesModule7.header()
  return new Promise((resolve, reject) => {
    axios.post('/api/module7/postRdSubmissionVerification',data).then(res => resolve(res)).catch(err => reject(err))
  })
}



export async function getAmsfCalculation (DIST_ID='', METHOD='') {
  await servicesModule7.header()
  return new Promise((resolve, reject) => {
    axios.get('/api/module7/amsfCalculation?DIST_ID='+DIST_ID + '&METHOD='+METHOD).then(res => resolve(res)).catch(err => reject(err))
  })
}

//filter
export async function filter_submission_record (data) {
  await servicesModule7.header()
  return axios.get('/api/module7/filter_submission_record', { params: data }).then(response => {
    return response.data.data
  }).catch(function (error) {
    if (error.response) {
      // Vue.$toast.open({
      //   message: error.response.data.message,
      //   type: 'error',
      // })
      if (error.response.status === 500) {
        // console.log(JSON.stringify(error.response.data.message));
        if (error.response.data.message === 'Token expired.') {
          console.log('logout')
          logout()
        } else {
          console.log(error.response.data.message)
        }
      } else if (error.response.status === 401) {
        logout()
      }
      return 'error'
    }
  })
}

export async function update_submission (data) {
  await servicesModule7.header()
  return axios.post('/api/module7/update_submission', data).then(response => {
    // console.log("exception create :" + JSON.stringify(response.data));
    return response
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

export async function returnFund (data) {
  await servicesModule7.header()
  return axios.post('/api/module7/returnFund', data).then(response => {
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

// aum submission

export async function getaumdetails (data) {
  await servicesModule7.header()
  return axios.get('/api/module7/getaumdetails', {
    params: {
      USER_DIST_ID: data,
    },
  }).then(response => {
    return response.data.data
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status === 500) {
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

//manager approval

export async function getManagerList (data) {
  await servicesModule7.header()
  return axios.get('/api/module7/ManagerList', {
    params: {
      DIST_ID: data,
    },
  }).then(response => {
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

export async function updateSubmission (data) {
  await servicesModule7.header()
  return axios.post('/api/module7/ManagerUpdateApproval', data).then(response => {
    return response
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

export async function manager_aum_update (data) {
  await servicesModule7.header()
  return axios.post('/api/module7/aumEntrySubmission', data).then(response => {
    return response
  }).catch(function (error) {
    if (error.response) {
      if (error.response.status === 401) {
      } else {
        return 'error'
      }
    }
  })
}


export async function manager_tgs_update (data) {
  await servicesModule7.header()
  return axios.post('/api/module7/ManagerTgsSubmission', data).then(response => {
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

// complience officer
export async function getComplienceList (data) {
  await servicesModule7.header()
  return axios.get('/api/module7/ComplienceList', {
    params: {
      DIST_ID: data,
    },
  }).then(response => {
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

export async function complience_aum_update (data) {
  await servicesModule7.header()
  return axios.post('/api/module7/complienceAumSubmission', data).then(response => {
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

export async function complience_tgs_update (data) {
  await servicesModule7.header()
  return axios.post('/api/module7/complienceTgsSubmission', data).then(response => {
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

export async function complienceupdateSubmission (data) {
  await servicesModule7.header()
  return axios.post('/api/module7/complienceUpdateApproval', data).then(response => {
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

export async function getFundSummaryList () {
  await servicesModule7.header()
  return axios.get('/api/module7/getFundSummaryList').then(response => {
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

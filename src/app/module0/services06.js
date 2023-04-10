/* eslint-disable semi */
/* eslint-disable eqeqeq */
/* eslint-disable dot-notation */
//
import axios from 'axios';
import * as servicesModule0 from './services';
import Vue from 'vue';
const generalAlert = (msg) => {
  return Vue.$toast.open({
    message: msg,
    type: 'success',
  });
}
const generalAlertError = (msg) => {
  return Vue.$toast.open({
    message: msg,
    type: 'error',
  });
}
export async function getTAC (data) {
  return axios.post('/api/module0/get_sms_TAC', data).then(response => {
    console.log(response.data);
    return response.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 500) {
        // console.log(JSON.stringify(error.response.data.message));
        if (error.response.data.message == 'Token expired.') {
          console.log('logout');
          // logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        // logout();
      }
      return 'error';
    }
  });
}

export async function getEmailOTP (data) {
  return axios.post('/api/module0/get_email_otp', data).then(response => {
    console.log(response.data);
    return response.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 500) {
        // console.log(JSON.stringify(error.response.data.message));
        if (error.response.data.message == 'Token expired.') {
          console.log('logout');
          // logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        // logout();
      }
      return 'error';
    }
  });
}

export async function verifyTAC (data) {
  console.log('data : ' + data);
  // await servicesModule0.header();
  return axios.get('/api/module0/sms_verify_TAC', {
    params: {
      SMS_TAC_NUMBER: data,
    },
  }).then(response => {
    console.log(response.data);
    return response.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 500) {
        // console.log(JSON.stringify(error.response.data.message));
        if (error.response.data.message == 'Token expired.') {
          console.log('logout');
          // logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        // logout();
      }
      return 'error';
    }
  });
}

export async function setPasswordSetting (data) {
  console.log('data : ' + data);
  await servicesModule0.header();
  return axios.post('/api/module0/setting_password', data).then(response => {
    generalAlert(response.data.message);
    return response.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 500) {
        // console.log(JSON.stringify(error.response.data.message));
        if (error.response.data.message == 'Token expired.') {
          console.log('logout');
          // logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        // logout();
      }
      return 'error';
    }
  });
}

export async function updatePasswordSetting (data) {
  console.log('data : ' + data);
  await servicesModule0.header();
  return axios.post('/api/module0/setting_password', data).then(response => {
    // console.log(response.data);
    generalAlert(response.data.message);
    return response.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 500) {
        // console.log(JSON.stringify(error.response.data.message));
        if (error.response.data.message == 'Token expired.') {
          console.log('logout');
          // logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        // logout();
      }
      return 'error';
    }
  });
}

export async function getPasswordSetting (isLogin) {
  isLogin == 1 ? await servicesModule0.header() : '';
  return axios.get('/api/module0/setting_password').then(response => {
    console.log(response.data);
    return response.data.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 500) {
        // console.log(JSON.stringify(error.response.data.message));
        if (error.response.data.message == 'Token expired.') {
          console.log('logout');
          // logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        // logout();
      }
      return 'error';
    }
  });
}
export async function getSecurityQuestionAll (isLogin) {
  isLogin == 1 ? await servicesModule0.header() : '';
  return axios.get('/api/module0/security_question_all').then(response => {
    console.log(response.data);
    return response.data.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 500) {
        // console.log(JSON.stringify(error.response.data.message));
        if (error.response.data.message == 'Token expired.') {
          console.log('logout');
          // logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        // logout();
      }
      return 'error';
    }
  });
}

export async function getUserIdSetting (isLogin) {
  isLogin == 1 ? await servicesModule0.header() : '';
  return axios.get('/api/module0/user_id').then(response => {
    console.log(response.data);
    return response.data.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 500) {
        // console.log(JSON.stringify(error.response.data.message));
        if (error.response.data.message == 'Token expired.') {
          console.log('logout');
          // logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        // logout();
      }
      return 'error';
    }
  });
}

export async function getUserIdtById (data) {
  await servicesModule0.header();
  return axios.get('/api/module0/user_id', {
    params: {
      SETTING_USERID_ID: data,
    },
  }).then(response => {
    console.log('days :' + JSON.stringify(response.data.data));
    return response.data.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 401) {
        servicesModule0.logout();
      } else {
        return 'error'
      }
    }
  });
}

export async function setUserIdSetting (data) {
  console.log('data : ' + data);
  await servicesModule0.header();
  return axios.post('/api/module0/user_id', data).then(response => {
    generalAlert(response.data.message);
    return response.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 500) {
        // console.log(JSON.stringify(error.response.data.message));
        if (error.response.data.message == 'Token expired.') {
          console.log('logout');
          // logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        // logout();
      }
      return 'error';
    }
  });
}

export async function updateUseridSetting (data) {
  console.log('data : ' + data);
  await servicesModule0.header();
  return axios.post('/api/module0/user_id', data).then(response => {
    console.log(response.data);
    return response.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 500) {
        // console.log(JSON.stringify(error.response.data.message));
        if (error.response.data.message == 'Token expired.') {
          console.log('logout');
          // logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        // logout();
      }
      return 'error';
    }
  });
}

export async function getSettingGeneral (data) {
  console.log('data : ' + data);
  await servicesModule0.header();
  return axios.get('/api/module0/setting_generals', {
    params: {
      SET_TYPE: data,
    },
  }).then(response => {
    console.log(JSON.stringify(response.data.data));
    return response.data.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 500) {
        // console.log(JSON.stringify(error.response.data.message));
        if (error.response.data.message == 'Token expired.') {
          console.log('logout');
          // logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        // logout();
      }
      return 'error';
    }
  });
}

export async function getPostcodeByID (data) {
  console.log('data : ' + data);
  await servicesModule0.header();
  return axios.get('/api/module0/setting_postalByID', {
    params: {
      SETTING_CITY_ID: data,
    },
  }).then(response => {
    console.log(JSON.stringify(response.data.data));
    return response.data.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 500) {
        // console.log(JSON.stringify(error.response.data.message));
        if (error.response.data.message == 'Token expired.') {
          console.log('logout');
          // logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        // logout();
      }
      return 'error';
    }
  });
}

export async function getPostcode (data) {
  console.log('data : ' + data);
  await servicesModule0.header();
  return axios.get('/api/module0/setting_postal', {
    params: {
      SETTING_CITY_ID: data,
    },
  }).then(response => {
    console.log(JSON.stringify(response.data.data));
    return response.data.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 500) {
        // console.log(JSON.stringify(error.response.data.message));
        if (error.response.data.message == 'Token expired.') {
          console.log('logout');
          // logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        // logout();
      }
      return 'error';
    }
  });
}

export async function getCity (data) {
  console.log('data : ' + data);
  await servicesModule0.header();
  return axios.get('/api/module0/setting_city', {
    params: {
      SETTING_GENERAL_ID: data,
    },
  }).then(response => {
    console.log(JSON.stringify(response.data.data));
    return response.data.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 500) {
        // console.log(JSON.stringify(error.response.data.message));
        if (error.response.data.message == 'Token expired.') {
          console.log('logout');
          // logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        // logout();
      }
      return 'error';
    }
  });
}

export async function getStateById (data) {
  console.log('data : ' + data);
  // await servicesModule0.header();
  return axios.get('/api/module0/setting_generals', {
    params: data,
  }).then(response => {
    console.log(JSON.stringify(response.data.data));
    return response.data.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 500) {
        // console.log(JSON.stringify(error.response.data.message));
        if (error.response.data.message == 'Token expired.') {
          console.log('logout');
          // logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        // logout();
      }
      return 'error';
    }
  });
}

export async function getAllCitizenship (data) {
  console.log('data : ' + data);
  return axios.get('/api/module0/get_all_citizenship').then(response => {
    console.log(JSON.stringify(response.data.data));
    return response.data.data;
  }).catch(function (error) {
    if (error.response) {
      if (error.response.status == 500) {
        if (error.response.data.message == 'Token expired.') {
          console.log('logout');
          // logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        // logout();
      }
      return 'error';
    }
  });
}

export async function getApplicationType () {
  await servicesModule0.header();
  return axios.get('/api/module0/distributor_typess').then(response => {
    console.log(JSON.stringify(response.data.data));
    return response.data.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 500) {
        // console.log(JSON.stringify(error.response.data.message));
        if (error.response.data.message == 'Token expired.') {
          console.log('logout');
          // logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        // logout();
      }
      return 'error';
    }
  });
}

export async function getDefaultCountry () {
  return axios.get('/api/module0/default_country').then(response => {
    console.log(response.data.data);
    return response.data.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 500) {
        // console.log(JSON.stringify(error.response.data.message));
        if (error.response.data.message == 'Token expired.') {
          console.log('logout');
          servicesModule1.logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        servicesModule1.logout();
      }
      return 'error';
    }
  });
}

export async function getApprovalLevel (data, index) {
  console.log('data : ' + data);
  await servicesModule0.header();
  return axios.get('/api/module0/approval_level_byindex', {
    params: {
      APPR_PROCESSFLOW_ID: data,
      APPR_INDEX: index,
    },
  }).then(response => {
    console.log(JSON.stringify(response.data.data));
    return response.data.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 500) {
        // console.log(JSON.stringify(error.response.data.message));
        if (error.response.data.message == 'Token expired.') {
          console.log('logout');
          // logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        // logout();
      }
      return 'error';
    }
  });
}

export async function getApprovalLevelNM (data, index) {
  console.log('data : ' + data);
  return axios.get('/api/module0/approval_level_byindexNM', {
    params: {
      APPR_PROCESSFLOW_ID: data,
      APPR_INDEX: index,
    },
  }).then(response => {
    console.log(JSON.stringify(response.data.data));
    return response.data.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 500) {
        // console.log(JSON.stringify(error.response.data.message));
        if (error.response.data.message == 'Token expired.') {
          console.log('logout');
          // logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        // logout();
      }
      return 'error';
    }
  });
}

// ros
export async function getApprovalLevelDistributor (data, index) {
  console.log('data : ' + data);
  await servicesModule0.header();
  return axios.get('/api/module0/dist_approval_level_byindex', {
    params: {
      APPR_PROCESSFLOW_ID: data,
      APPR_INDEX: index,
    },
  }).then(response => {
    console.log(JSON.stringify(response.data.data));
    return response.data.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 500) {
        // console.log(JSON.stringify(error.response.data.message));
        if (error.response.data.message == 'Token expired.') {
          console.log('logout');
          // logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        // logout();
      }
      return 'error';
    }
  });
}

export async function getDistributorApplicationList (data) {
  await servicesModule0.header();
  return axios.get('/api/module0/distributor_new_application', {
    params: {
      APPR_GROUP_ID: data,
    },
  }).then(response => {
    console.log(JSON.stringify(response.data.data));
    return response.data.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 500) {
        // console.log(JSON.stringify(error.response.data.message));
        if (error.response.data.message == 'Token expired.') {
          console.log('logout');
          // logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        // logout();
      }
      return 'error';
    }
  });
}

export async function getDocumentProposalUpdate (data) {
  // await servicesModule0.header();
  return axios.get('/api/module0/required_document_proposal_update', {
    params: data,
  }).then(response => {
    console.log('doc list : ' + JSON.stringify(response.data.data));
    return response.data.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 500) {
        // console.log(JSON.stringify(error.response.data.message));
        if (error.response.data.message == 'Token expired.') {
          console.log('logout');
          // logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        // logout();
      }
      return 'error';
    }
  });
}
// export async function getDocumentProposalUpdate(data) {
//     await servicesModule0.header();
//     return axios.get('/api/module0/required_document_proposal_update', {
//         params: data
//     }).then(response => {
//         console.log("doc list : " + JSON.stringify(response.data.data));
//         return response.data.data;
//     }).catch(function(error) {
//         if (error.response) {
//             // The request was made and the server responded with a status code
//             // that falls out of the range of 2xx
//             if (error.response.status == 500) {
//                 // console.log(JSON.stringify(error.response.data.message));
//                 if (error.response.data.message == 'Token expired.') {
//                     console.log('logout');
//                     //logout();
//                 } else {
//                     console.log(error.response.data.message);
//                 }
//             } else if (error.response.status == 401) {
//                 //logout();
//             }
//             return 'error';
//         }
//     });
// }

export async function getDocumentProposalFile (data) {
  // await servicesModule0.header();
  return axios.get('/api/module0/getDocumentProposalFile', {
    params: data,
  }).then(response => {
    console.log('doc list : ' + JSON.stringify(response.data.data));
    return response.data.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 500) {
        // console.log(JSON.stringify(error.response.data.message));
        if (error.response.data.message == 'Token expired.') {
          console.log('logout');
          // logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        // logout();
      }
      return 'error';
    }
  });
}

export async function getDocumentRequired (data) {
  // await servicesModule0.header();
  return axios.get('/api/module0/getDocumentRequired', {
    params: data,
  }).then(response => {
    console.log('doc list : ' + JSON.stringify(response.data.data));
    return response.data.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 500) {
        // console.log(JSON.stringify(error.response.data.message));
        if (error.response.data.message == 'Token expired.') {
          console.log('logout');
          // logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        // logout();
      }
      return 'error';
    }
  });
}

export async function getDocumentDataReview (data) {
  // await servicesModule0.header();
  return axios.get('/api/module0/getDocumentDataReview', {
    params: data,
  }).then(response => {
    console.log('doc list : ' + JSON.stringify(response.data.data));
    return response.data.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 500) {
        // console.log(JSON.stringify(error.response.data.message));
        if (error.response.data.message == 'Token expired.') {
          console.log('logout');
          // logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        // logout();
      }
      return 'error';
    }
  });
}

export async function getDocumentProposalData (data) {
  // await servicesModule0.header();
  return axios.get('/api/module0/getDocumentProposalData', {
    params: data,
  }).then(response => {
    console.log('doc list : ' + JSON.stringify(response.data.data));
    return response.data.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 500) {
        // console.log(JSON.stringify(error.response.data.message));
        if (error.response.data.message == 'Token expired.') {
          console.log('logout');
          // logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        // logout();
      }
      return 'error';
    }
  });
}

export async function getDocumentProposal (data) {
  // await servicesModule0.header();
  return axios.get('/api/module0/required_document_proposal', {
    params: data,
  }).then(response => {
    console.log('doc list : ' + JSON.stringify(response.data.data));
    return response.data.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 500) {
        // console.log(JSON.stringify(error.response.data.message));
        if (error.response.data.message == 'Token expired.') {
          console.log('logout');
          // logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        // logout();
      }
      return 'error';
    }
  });
}

export async function getAllCurrency () {
  await servicesModule0.header();
  return axios.get('/api/module5/getAllCurrencyFormat').then(response => {
    console.log('Currency List :' + JSON.stringify(response.data.data));
    return response.data.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
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
      return 'error';
    }
  });
}

export async function getCurrencyFormat (data) {
  await servicesModule0.header();
  return axios.get('/api/module0/currency_format', {
    params: {
      SET_TYPE: 'CURRENCY',
      SET_PARAM: data,
    },
  }).then(response => {
    console.log(JSON.stringify(response.data.data));
    return response.data.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 500) {
        // console.log(JSON.stringify(error.response.data.message));
        if (error.response.data.message == 'Token expired.') {
          console.log('logout');
          // logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        // logout();
      }
      return 'error';
    }
  });
}

export async function getDistFee (data, financial) {
  return axios.get('/api/module0/getDistFeeByIDType', {
    params: {
      DIST_TYPE_ID: data,
      DIST_FINANCIAL_INSTITUTION: financial,
    },
  }).then(response => {
    console.log('doc list : ' + JSON.stringify(response.data.data));
    return response.data.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 500) {
        // console.log(JSON.stringify(error.response.data.message));
        if (error.response.data.message == 'Token expired.') {
          console.log('logout');
          // logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        // logout();
      }
      return 'error';
    }
  });
}
// Distributor Dashboard Setting

export async function createDistributorDashboardSetting (data, userid, usertype, usergroup, accessuserDivision, accessuserDepartment, accessuserGROUP) {
  // await servicesModule1.header();
  return axios.post('/api/module0/distributor_dashboard_setting', {
    params: data,
    userid: userid,
    usertype: usertype,
    usergroup: usergroup,
    ACCESS_USER_DIVISION: accessuserDivision,
    ACCESS_USER_DEPARTMENT: accessuserDepartment,
    ACCESS_USER_GROUP: accessuserGROUP,

  }).then(response => {
    console.log(JSON.stringify(response.data));
    Vue.$toast.open({
      message: response.data.message,
      type: 'success',
    });
    return response.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 500) {
        // console.log(JSON.stringify(error.response.data.message));
        if (error.response.data.message == 'Token expired.') {
          console.log('logout');
          // logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        // logout();
      }
      return 'error';
    }
  });
}
export async function getDistributorSetting (userID, userTYPE, userGroup, userDepartment, userDIVISION) {
  // await servicesModule1.header();
  //  console.log("ID=", userid);
  return axios.get('/api/module0/get_distributor_dashboard_setting', {
    params: {
      SETTING_USER_ID: userID,
      SETTING_USER_TYPE: userTYPE,
      ACCESS_USER_GROUP: userGroup,
      ACCESS_USER_DEPARTMENT: userDepartment,
      ACCESS_USER_DIVISION: userDIVISION,
      // SETTING_USER_GROUP: typeID,
    },
  }).then(response => {
    console.log(JSON.stringify(response.data));

    return response.data.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 500) {
        // console.log(JSON.stringify(error.response.data.message));
        if (error.response.data.message == 'Token expired.') {
          console.log('logout');
          // logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        // logout();
      }
      return 'error';
    }
  });
}
export async function deleteDistributorDashboardSetting (postid) {
  // await servicesModule1.header();
  return axios.post('/api/module0/delete_distributor_dashboard_setting', {
    DISPLAY_SETTING_ID: postid,
  }).then(response => {
    console.log(JSON.stringify(response.data));

    return response.data.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 500) {
        // console.log(JSON.stringify(error.response.data.message));
        if (error.response.data.message == 'Token expired.') {
          console.log('logout');
          // logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        // logout();
      }
      return 'error';
    }
  });
}
// Finance dashboard
export async function getFinanceSetting (userID, userTYPE, userGroup, userDepartment, userDIVISION) {
  // await servicesModule1.header();
  // console.log("ID=", userid);
  return axios.get('/api/module0/get_finance_dashboard_setting', {
    params: {
      SETTING_USER_ID: userID,
      SETTING_USER_TYPE: userTYPE,
      SETTING_USER_GROUP: userGroup,
      ACCESS_USER_DEPARTMENT: userDepartment,
      ACCESS_USER_DIVISION: userDIVISION,
    },
  }).then(response => {
    console.log(JSON.stringify(response.data));

    return response.data.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 500) {
        // console.log(JSON.stringify(error.response.data.message));
        if (error.response.data.message == 'Token expired.') {
          console.log('logout');
          // logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        // logout();
      }
      return 'error';
    }
  });
}
export async function getFinanceChartSettingOne (userid, usertype, chartview) {
  // await servicesModule1.header();
  // console.log("ID=", userid);
  return axios.get('/api/module0/get_finance_chart_setting_one', {
    params: {
      SETTING_USER_ID: userid,
      SETTING_USER_TYPE: usertype,
      CHART_VIEW: chartview,
    },
  }).then(response => {
    // console.log(JSON.stringify(response.data));

    return response.data.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 500) {
        // console.log(JSON.stringify(error.response.data.message));
        if (error.response.data.message == 'Token expired.') {
          console.log('logout');
          // logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        // logout();
      }
      return 'error';
    }
  });
}
export async function getFinanceChartSettingTwo (userid, usertype, chartview) {
  // await servicesModule1.header();
  // console.log("ID=", userid);
  return axios.get('/api/module0/get_finance_chart_setting_two', {
    params: {
      SETTING_USER_ID: userid,
      SETTING_USER_TYPE: usertype,
      CHART_VIEW: chartview,
    },
  }).then(response => {
    // console.log(JSON.stringify(response.data));

    return response.data.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 500) {
        // console.log(JSON.stringify(error.response.data.message));
        if (error.response.data.message == 'Token expired.') {
          console.log('logout');
          // logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        // logout();
      }
      return 'error';
    }
  });
}
export async function getFinanceChartSettingSeven (userid, usertype, chartview) {
  // await servicesModule1.header();
  // console.log("ID=", userid);
  return axios.get('/api/module0/get_finance_chart_setting_seven', {
    params: {
      SETTING_USER_ID: userid,
      SETTING_USER_TYPE: usertype,
      CHART_VIEW: chartview,
    },
  }).then(response => {
    // console.log(JSON.stringify(response.data));

    return response.data.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 500) {
        // console.log(JSON.stringify(error.response.data.message));
        if (error.response.data.message == 'Token expired.') {
          console.log('logout');
          // logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        // logout();
      }
      return 'error';
    }
  });
}

// Consultant dashboard
export async function getConsultantSetting (userID, userTYPE, userGroup, userDepartment, userDIVISION) {
  // await servicesModule1.header();
  // console.log("ID=", userid);
  return axios.get('/api/module0/get_consultant_dashboard_setting', {
    params: {
      SETTING_USER_ID: userID,
      SETTING_USER_TYPE: userTYPE,
      SETTING_USER_GROUP: userGroup,
      ACCESS_USER_DEPARTMENT: userDepartment,
      ACCESS_USER_DIVISION: userDIVISION,
    },
  }).then(response => {
    console.log(JSON.stringify(response.data));

    return response.data.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 500) {
        // console.log(JSON.stringify(error.response.data.message));
        if (error.response.data.message == 'Token expired.') {
          console.log('logout');
          // logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        // logout();
      }
      return 'error';
    }
  });
}
export async function getConsultantChartSettingOne (userid, usertype, chartview) {
  // await servicesModule1.header();
  // console.log("ID=", userid);
  return axios.get('/api/module0/get_consultant_chart_setting_one', {
    params: {
      SETTING_USER_ID: userid,
      SETTING_USER_TYPE: usertype,
      CHART_VIEW: chartview,
    },
  }).then(response => {
    // console.log(JSON.stringify(response.data));

    return response.data.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 500) {
        // console.log(JSON.stringify(error.response.data.message));
        if (error.response.data.message == 'Token expired.') {
          console.log('logout');
          // logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        // logout();
      }
      return 'error';
    }
  });
}
export async function getConsultantChartSettingFour (userid, usertype, chartview) {
  // await servicesModule1.header();
  // console.log("ID=", userid);
  return axios.get('/api/module0/get_consultant_chart_setting_four', {
    params: {
      SETTING_USER_ID: userid,
      SETTING_USER_TYPE: usertype,
      CHART_VIEW: chartview,
    },
  }).then(response => {
    // console.log(JSON.stringify(response.data));

    return response.data.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 500) {
        // console.log(JSON.stringify(error.response.data.message));
        if (error.response.data.message == 'Token expired.') {
          console.log('logout');
          // logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        // logout();
      }
      return 'error';
    }
  });
}
export async function getConsultantChartSettingFive (userid, usertype, chartview) {
  // await servicesModule1.header();
  // console.log("ID=", userid);
  return axios.get('/api/module0/get_consultant_chart_setting_five', {
    params: {
      SETTING_USER_ID: userid,
      SETTING_USER_TYPE: usertype,
      CHART_VIEW: chartview,
    },
  }).then(response => {
    // console.log(JSON.stringify(response.data));

    return response.data.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 500) {
        // console.log(JSON.stringify(error.response.data.message));
        if (error.response.data.message == 'Token expired.') {
          console.log('logout');
          // logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        // logout();
      }
      return 'error';
    }
  });
}
export async function getDistributorChartSettingThree (userid, usertype, chartview) {
  // await servicesModule1.header();
  // console.log("ID=", userid);
  return axios.get('/api/module0/get_distributor_chart_setting_three', {
    params: {
      SETTING_USER_ID: userid,
      SETTING_USER_TYPE: usertype,
      CHART_VIEW: chartview,
    },
  }).then(response => {
    // console.log(JSON.stringify(response.data));

    return response.data.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 500) {
        // console.log(JSON.stringify(error.response.data.message));
        if (error.response.data.message == 'Token expired.') {
          console.log('logout');
          // logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        // logout();
      }
      return 'error';
    }
  });
}
export async function getDistributorChartSettingSix (userid, usertype, chartview) {
  // await servicesModule1.header();
  // console.log("ID=", userid);
  return axios.get('/api/module0/get_distributor_chart_setting_six', {
    params: {
      SETTING_USER_ID: userid,
      SETTING_USER_TYPE: usertype,
      CHART_VIEW: chartview,
    },
  }).then(response => {
    // console.log(JSON.stringify(response.data));

    return response.data.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 500) {
        // console.log(JSON.stringify(error.response.data.message));
        if (error.response.data.message == 'Token expired.') {
          console.log('logout');
          // logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        // logout();
      }
      return 'error';
    }
  });
}
export async function getDistributorChartSettingSeven (userid, usertype, chartview) {
  // await servicesModule1.header();
  // console.log("ID=", userid);
  return axios.get('/api/module0/get_distributor_chart_setting_seven', {
    params: {
      SETTING_USER_ID: userid,
      SETTING_USER_TYPE: usertype,
      CHART_VIEW: chartview,
    },
  }).then(response => {
    // console.log(JSON.stringify(response.data));

    return response.data.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 500) {
        // console.log(JSON.stringify(error.response.data.message));
        if (error.response.data.message == 'Token expired.') {
          console.log('logout');
          // logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        // logout();
      }
      return 'error';
    }
  });
}
export async function getDistributorChartSettingEight (userid, usertype, chartview) {
  // await servicesModule1.header();
  // console.log("ID=", userid);
  return axios.get('/api/module0/get_distributor_chart_setting_eight', {
    params: {
      SETTING_USER_ID: userid,
      SETTING_USER_TYPE: usertype,
      CHART_VIEW: chartview,
    },
  }).then(response => {
    console.log('daaaaaaaaaaaaaa=', response.data);

    return response.data.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 500) {
        // console.log(JSON.stringify(error.response.data.message));
        if (error.response.data.message == 'Token expired.') {
          console.log('logout');
          // logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        // logout();
      }
      return 'error';
    }
  });
}
export async function getDistributorChartSettingTwelve (userid, usertype, chartview) {
  // await servicesModule1.header();
  // console.log("ID=", userid);
  return axios.get('/api/module0/get_distributor_chart_setting_twelve', {
    params: {
      SETTING_USER_ID: userid,
      SETTING_USER_TYPE: usertype,
      CHART_VIEW: chartview,
    },
  }).then(response => {
    // console.log(JSON.stringify(response.data));

    return response.data.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 500) {
        // console.log(JSON.stringify(error.response.data.message));
        if (error.response.data.message == 'Token expired.') {
          console.log('logout');
          // logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        // logout();
      }
      return 'error';
    }
  });
}
export async function getDistributorChartSettingFourteen (userid, usertype, chartview) {
  // await servicesModule1.header();
  // console.log("ID=", userid);
  return axios.get('/api/module0/get_distributor_chart_setting_fourteen', {
    params: {
      SETTING_USER_ID: userid,
      SETTING_USER_TYPE: usertype,
      CHART_VIEW: chartview,
    },
  }).then(response => {
    // console.log(JSON.stringify(response.data));

    return response.data.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 500) {
        // console.log(JSON.stringify(error.response.data.message));
        if (error.response.data.message == 'Token expired.') {
          console.log('logout');
          // logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        // logout();
      }
      return 'error';
    }
  });
}

export async function verifyTACESC (tac, phone) {
  // console.log('tac : ' + tac);
  console.log('phone : ' + phone);
  // isLogin == 1 ? await servicesModule0.header() : '';
  return axios.get('/api/module0/verify_TAC', {
    params: {
      SMS_TAC_NUMBER: tac,
      SMS_TAC_RECIPIENT: phone,
    },
  }).then(response => {
    // console.log("aaaaaaaaaaaa=",response);
    return response.data.message;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 500) {
        // console.log(JSON.stringify(error.response.data.message));
        if (error.response.data.message == 'Token expired.') {
          console.log('logout');
          // logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        // logout();
      }
      return error.response.data.message;
    }
  });
}

export async function getTACForgot (data) {
  return axios.post('/api/module0/get_sms_TAC_forgot', data).then(response => {
    console.log(response.data);
    return response.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 500) {
        // console.log(JSON.stringify(error.response.data.message));
        if (error.response.data.message == 'Token expired.') {
          console.log('logout');
          // logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        // logout();
      }
      return 'error';
    }
  });
}

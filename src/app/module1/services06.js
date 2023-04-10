/* eslint-disable semi */
/* eslint-disable eqeqeq */
/* eslint-disable dot-notation */
//
import axios from 'axios';
import Vue from 'vue'
import * as servicesModule1 from './services';
import * as servicesModule0 from '../module0/services'

//* *Self Register distributor**/
export async function selfRegister (data) {
  return axios.post('/api/module1/user', data).then(response => {
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

export async function updateSelfReg (data) {
  return axios.post('/api/module1/user_update', data).then(response => {
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

export async function verifyUser (data) {
  return axios.get('/api/module1/verify_user', {
    params: {
      username: data.username,
      USER_PASS_NUM: data.USER_PASS_NUM,
    },
  }).then(response => {
    localStorage.setItem('realmName', 'realm0');

    console.log('response=', response.data);
    return response.data;
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
      return error.response;
    }
  });
}

export async function checkDuplicateIC (data) {
  return axios.get('/api/module1/user_check_ic', {
    params: {
      USER_NRIC: data,
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

export async function checkDuplicateEmail (data) {
  return axios.get('/api/module1/user_check_email', {
    params: {
      USER_EMAIL: data,
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

export async function checkDuplicateUserID (data) {
  return axios.get('/api/module1/user_check_userID', {
    params: {
      USER_USER_ID: data,
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

export async function securityQuestion () {
  return axios.get('/api/module1/user_security_quest').then(response => {
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

export async function distributor_fee () {
  return axios.get('/api/module1/distributor_fee').then(response => {
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

export async function getIssueingBank () {
  return axios.get('/api/module6/issueingbank').then(response => {
    console.log('Record list :' + JSON.stringify(response.data.data))
    return response.data.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 401) {
        // logout()
      } else {
        return 'error';
      }
    }
  })
}

export async function saveDraftReg (data) {
  // await servicesModule1.header();
  return axios.post('/api/module1/distributorSaveDraftReg', data).then(response => {
    console.log(JSON.stringify(response.data));
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

export async function createDistributorProfile (data) {
  // await servicesModule1.header();
  return axios.post('/api/module1/distributor', data).then(response => {
    console.log(JSON.stringify(response.data));
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

export async function distributor_docs (data) {
  // await servicesModule1.header();
  return axios.post('/api/module1/distributor_docs', data).then(response => {
    // console.log(JSON.stringify(response.data));
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

export async function updateDistributorRegProfile (data) {
  // await servicesModule1.header();
  return axios.post('/api/module1/distributor_reg_update', data).then(response => {
    console.log(JSON.stringify(response.data));
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

export async function updateDistributorProfile (data) {
  // await servicesModule1.header();
  return axios.post('/api/module1/distributor_update', data).then(response => {
    console.log(JSON.stringify(response.data));
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
          throw new Error(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        // logout();
      }
      return 'error';
    }
  });
}
export async function getDocumentProposalDataDist (data) {
  // await servicesModule0.header();
  return axios.get('/api/module1/required_document_proposal', {
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

export async function getDistributorUpdateList (data) {
  // await servicesModule1.header();
  return axios.get('/api/module1/getDistributorUpdateList', {
    params: {
      DISTRIBUTOR_ID: data.DISTRIBUTOR_ID,
      USER_GROUP_ID: data.USER_GROUP_ID,
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

export async function getIsDistributorUpdateProgress (data) {
  // await servicesModule1.header();
  return axios.get('/api/module1/is_distributor_update_in_process', {
    params: {
      DISTRIBUTOR_ID: data.DISTRIBUTOR_ID,
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

export async function getDistributorUpdateListRD (data) {
  // await servicesModule1.header();
  return axios.get('/api/module1/getDistributorUpdateListRD', {
    params: {
      USER_GROUP_ID: data,
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

export async function createDistributorInfo (data) {
  // await servicesModule1.header();
  return axios.post('/api/module1/distributor_info', data).then(response => {
    console.log(JSON.stringify(response.data));
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

export async function getUserSalutation () {
  // await servicesModule1.header();
  return axios.get('/api/module1/user_salutation').then(response => {
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

export async function getApplicationTypeById (DIST_ID) {
  return axios.get(`/api/module1/distributor_types/${DIST_ID}`).then(response => {
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

export async function getDistributorById (data) {
  // await servicesModule1.header();
  return axios.get('/api/module1/distributor', {
    params: {
      USER_ID: data,
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

export async function deleteDistributorDocument (data) {
  return axios.delete('/api/module1/delete_distributor_document', {
    params: {
      DISTRIBUTOR_ID: data,
    },
  })
    .then(response => {
      console.log('data :' + JSON.stringify(response.data));
      return response.data;
    }).catch(function (error) {
      if (error.response) {
        if (error.response.status == 500) {
          if (error.response.data.message == 'Token expired.') {
            logout();
          } else {
            console.log(error.response.data.message);
          }
        } else if (error.response.status == 401) {
          logout();
        }
      }
    });
}

export async function getDistributorByIdforUpdateProfile (userId, distTempCategory) {
  // await servicesModule1.header();
  return axios.get('/api/module1/distributorUpdateProfileDatas', {
    params: {
      USER_ID: userId,
      DIST_TEMP_CATEGORY: distTempCategory,
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

export async function getDistTypeByDistTypeId (data) {
  // await servicesModule1.header();
  return axios.get('/api/module1/getDistTypeByDistTypeId', {
    params: {
      USER_DIST_ID: data,
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
export async function getTypeRegByDistId (data, groupId) {
  // await servicesModule1.header();
  return axios.get('/api/module1/getTypeRegByDistId', {
    params: {
      DIST_ID: data,
      APPR_GROUP_ID: groupId,
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

export async function getDistributorByIdAppr (data, groupId) {
  // await servicesModule1.header();
  return axios.get('/api/module1/distributor_application_detail', {
    params: {
      DIST_ID: data,
      APPR_GROUP_ID: groupId,
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
export async function getDistributorByIdApprTemp (data) {
  // await servicesModule1.header();
  return axios.get('/api/module1/distributor_temp_application_detail', {
    params: {
      DIST_ID: data.dist_id,
      DIST_TEMP_ID: data.dist_temp_id,
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

export async function deleteDirector (data) {
  // await servicesModule1.header();
  return axios
    .delete('/api/module1/distributor_director', {
      data: { DIST_DIR_ID: data },
    })
    .then(response => {
      console.log('data :' + JSON.stringify(response.data));
      return response.data;
    }).catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status == 500) {
          // console.log(JSON.stringify(error.response.data.message));
          if (error.response.data.message == 'Token expired.') {
            logout();
          } else {
            console.log(error.response.data.message);
          }
        } else if (error.response.status == 401) {
          logout();
        }
      }
    });
}

export async function getDocumentProposal (data) {
  // await servicesModule1.header();
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

export async function createDistributorReview (data) {
  // await servicesModule1.header();
  return axios.post('/api/module1/distributor_review', data).then(response => {
    console.log(JSON.stringify(response.data));
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
export async function createDistributorUpdateReview (data) {
  // await servicesModule1.header();
  return axios.post('/api/module1/distributor_update_review', data).then(response => {
    console.log(JSON.stringify(response.data));
    Vue.$toast.open({
      message: response.data.message,
      type: 'success',
    })
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

export async function createFIMMUpdateReview (data) {
  // await servicesModule1.header();
  return axios.post('/api/module1/fimm_update_review', data).then(response => {
    console.log(JSON.stringify(response.data));
    Vue.$toast.open({
      message: response.data.message,
      type: 'success',
    })
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

export async function getDistributorApplicationList (data, params = {}) {
  return axios.get('/api/module1/distributor_new_application_list', {
    params: {
      APPR_GROUP_ID: data,
      filters: params,
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

export async function getDistributorDocumentRemark (data) {
  // await servicesModule1.header();
  return axios.get('/api/module1/distributor_document_remark', {
    params: {
      DIST_APPR_ID: data,
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

export async function getDistributorReviewData (dist_id, group_id, level_id) {
  // await servicesModule1.header();
  return axios.get('/api/module1/distributor_review_data', {
    params: {
      dist_id: dist_id,
      group_id: group_id,
      level_id: level_id,
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

export async function getDistType (data) {
  // await servicesModule1.header();
  return axios.get('/api/module1/getDistType', {
    params: {
      USER_DIST_ID: data,
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

export async function getAcceptanceList (data) {
  // await servicesModule1.header();
  return axios.get('/api/module1/distributor_candidate_acceptance', {
    params: {
      DIST_ID: data,
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

export async function createAcceptanceList (data) {
  // await servicesModule1.header();
  return axios.post('/api/module1/distributor_candidate_acceptance', data).then(response => {
    console.log(JSON.stringify(response.data));
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

export async function getAcceptanceListByBatch (DIST_ID, BATCH_NO) {
  // await servicesModule1.header();
  return axios.get('/api/module1/distributor_candidate_acceptance_byBatch', {
    params: {
      DIST_ID: DIST_ID,
      BATCH_NO: BATCH_NO,
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

export async function getReviewRemark (distTempId, userGroupID) {
  // await servicesModule1.header();
  return axios.get('/api/module1/getReviewRemark', {
    params: {
      DIST_TEMP_ID: distTempId,
      USER_GROUP_ID: userGroupID,
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
export async function deleteCandidateAcceptance (data) {
  await servicesModule1.header();
  return axios.delete('/api/module1/delete_CandidateAcceptance', {
    params: {
      DISTRIBUTOR_CANDIDATE_ACCEPTANCE_ID: data,
    },
  })
    .then(response => {
      console.log('data :' + JSON.stringify(response.data));
      return response.data;
    }).catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status == 500) {
          // console.log(JSON.stringify(error.response.data.message));
          if (error.response.data.message == 'Token expired.') {
            logout();
          } else {
            console.log(error.response.data.message);
          }
        } else if (error.response.status == 401) {
          logout();
        }
      }
    });
}

export async function updateUserProfile (data) {
  return axios.post('/api/module1/UpdateUserProfile', data).then(response => {
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
export async function updateUserProfilePost (data) {
  return axios.post('/api/module1/updateUserProfileData', data).then(response => {
    return response.data;
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

export async function createRegisterTypeApplication (data) {
  // await servicesModule1.header();
  return axios.post('/api/module1/createRegisterTypeApplication', data).then(response => {
    console.log(JSON.stringify(response.data));
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

export async function createDistributorRegisterTypeReview (data) {
  // await servicesModule1.header();
  return axios.post('/api/module1/distributor_register_type_review', data).then(response => {
    console.log(JSON.stringify(response.data));
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

export async function getRegisterTypeApplicationList (data, params = {}) {
  // await servicesModule1.header();
  return axios.get('/api/module1/getRegisterTypeApplicationList', {
    params: {
      APPR_GROUP_ID: data,
      filters: params,
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

export async function sendEmailNotification (data) {
  // await servicesModule1.header();
  return axios.post('/api/module1/sendEmailNotification', data).then(response => {
    console.log(JSON.stringify(response.data));
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

export async function updateDistStatus (data) {
  // await servicesModule1.header();
  return axios.post('/api/module1/updateDistStatus', data).then(response => {
    console.log(JSON.stringify(response.data));
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

export async function getDistGroup () {
  // await servicesModule1.header();
  return axios.get('/api/module1/getDistGroup').then(response => {
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

export async function updateApproval (data) {
  // await servicesModule1.header();
  return axios.post('/api/module1/updateApprovalUserReg', data).then(response => {
    console.log(JSON.stringify(response.data));
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

export async function getUserRegList (data) {
  // await servicesModule1.header();
  return axios.get('/api/module1/getUserRegList', {
    params: {
      USER_DIST_ID: data,
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

export async function getUserRegListStatus (data) {
  // await servicesModule1.header();
  return axios.get('/api/module1/getUserRegListStatus', {
    params: {
      USER_ID: data,
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

export async function getUserRegListStatusDoc (data) {
  // await servicesModule1.header();
  return axios.get('/api/module1/getUserRegListStatusDoc', {
    params: {
      USER_ID: data,
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

export async function get_distributor_user_info(data) {
    return axios.post('/api/module1/get_distributor_user_info', data).then(response => {
        console.log(response);
        return response.data.data;
    }).catch(function(error) {
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
export async function get_distributor_last_pass(data) {
  return axios.post('/api/module1/get_distributor_last_pass', data).then(response => {
      console.log(response);
      return response.data.data;
  }).catch(function(error) {
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
//Get Email TAC
export async function getEmailTAC (data) {
  return axios.post('/api/module1/get_email_tac', data).then(response => {
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
// Change Distributor Password
export async function changeDistributorPassword(data) {
  return axios.post('/api/module1/user_update_password', data).then(response => {
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

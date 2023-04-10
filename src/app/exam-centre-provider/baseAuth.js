/* eslint-disable no-undef */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable semi */
/* eslint-disable eqeqeq */
/* eslint-disable dot-notation */
//
import Vue from 'vue';
import axios from 'axios';
// axios.defaults.baseURL = 'http://localhost:7000/';

export function header () {
  // eslint-disable-next-line no-return-assign
  // do not modify this
  axios.defaults.headers.common.Authorization = 'Bearer ' + getToken();
  axios.defaults.headers.common.realmName = localStorage.getItem('realmName');

  axios.defaults.headers.common.UID = JSON.parse(localStorage.getItem('user')).user_id;
  axios.defaults.headers.common.GID = JSON.parse(localStorage.getItem('user')).USER_GROUP_ID;
  axios.defaults.headers.common.PANELTRACK = JSON.parse(localStorage.getItem('user')).PANEL_TRACK;
}

//* ***************HAIZAD*******************/
//* *********Authorization******************/
export async function checkTokenValidation () {
  await this.header();
  return axios.get('/api/module0/checkTokenValidation').then(response => {
    console.log('response :' + JSON.stringify(response.data));
    return response.data;
  }).catch(function (error) {
    console.log('error response :' + JSON.stringify(error.response));
    if (error.response) {
      if (error.response.status == 401) {
        logout();
        return 'not valid';
      } else if (error.response.status == 500) {
        logout();
        // Vue.$toast.open({
        //     message: 'The server encountered an internal error and was unable to complete your request. Please contact the server administrator.',
        //     type: 'error',
        // });
        return 'not valid';
      } else {
        return 'not valid';
      }
    }
  });
}

export function getUser () {
  const user = localStorage.getItem('user');
  return user;
}

export function getUserType () {
  const user = localStorage.getItem('user');
  return JSON.parse(user).user_type;
}

function getToken () {
  // do not modify this
  const user = localStorage.getItem('user');

  if (user) { // if have token
    // directly fetching access token from local storage
    // const access_token = localStorage.getItem('access_token')
    // return access_token;
  } else { // redirect to default page
    localStorage.removeItem('user');
    localStorage.removeItem('realmName');
  }
  // console.log('access token :' + JSON.parse(user).access_token);
  return JSON.parse(user).access_token;
}

export function isLoggedIn () {
  const user = localStorage.getItem('user');
  return user != null;
}

export function setUser (user) {
  localStorage.setItem('user', user);
}

export async function login (data) {
  delete axios.defaults.headers.common['Authorization'];
  delete axios.defaults.headers.common['realmName'];

  return axios.post('/api/module0/login', data).then(response => {
    //
    // this.setUser(response.data.data);
    localStorage.setItem('realmName', 'realm0');
    // this.$store.commit('change', JSON.stringify(response.data.data))
    // console.log('user store :' + localStorage.getItem('user'))
    console.log('Login Response Service=', response)
    return response.data.data;
  }).catch(function (error) {
    localStorage.removeItem('user');
    localStorage.removeItem('realmName');

    if (error.response.status === 500) {
      // Vue.$toast.open({
      //     message: 'The server encountered an internal error and was unable to complete your request. Please contact the server administrator.',
      //     type: 'error',
      // });
    } else {
      // Vue.$toast.open({
      //     message: error.response.data.message,
      //     type: 'error',
      // });
    }
    // console.log(error)
    return error.response.data.message;
  });
}

export async function logout (uid, utype) {
  console.log('Logout Console');
  return axios.get('/api/module10/logout', {
    params: {
      USER_ID: uid,
      USER_TYPE: utype,
    },
  }).then(response => {
    Vue.$toast.open({
      message: response.data.message,
      type: 'success',
    });
    console.log('Logout Console1');
    localStorage.removeItem('user');
    localStorage.removeItem('realmName');
    localStorage.removeItem('recover-password');
    delete axios.defaults.headers.common['Authorization'];
    delete axios.defaults.headers.common['realmName'];

    return response.data.message
  }).catch(function (error) {
    // if (error.response.status === 500)
    //     Vue.$toast.open({
    //         message: 'The server encountered an internal error and was unable to complete your request. Please contact the server administrator.',
    //         type: 'error',
    //     });

    // else
    //     Vue.$toast.open({
    //         message: error.response.data.message,
    //         type: 'error',
    //     });
    // console.log(error)
    return error.response.data.message;
  });
}

export async function userDetail () {
  await this.header();
  return axios.get('/api/module0/user').then(response => {
    console.log('user detail :' + JSON.stringify(response.data));
    return response.data;
  }).catch(function (error) {
    if (error.response) {
      console.log('error response :' + error.response);
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 500) {} else if (error.response.status == 401) {
        logout();
      }
    }
  });
}

//* ********** Audit Trail ****************/

export async function audit_trail (data) {
  await this.header();
  return axios.post('/api/module0/audit_trail', data).then(response => {
    return response.data;
  }).catch(function (error) {
    if (error.response) {
      console.log('error : ' + error.response);
      if (error.response.status == 500) {
        if (error.response.data.message == 'Token expired.') {
          console.log('logout');
          logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        logout();
      }
      return 'error';
    }
  });
}
//* ********** User management ************/

export async function getFiMMUser () {
  await this.header();
  return axios.get('/api/module0/fimm_user').then(response => {
    console.log('data :' + JSON.stringify(response.data.data));
    return response.data.data;
  }).catch(function (error) {
    if (error.response) {
      if (error.response.status == 500) {
        if (error.response.data.message == 'Token expired.') {
          console.log('logout');
          logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        logout();
      }
      return 'error';
    }
  });
}

export async function getAllScreens () {
  await this.header();
  return axios.get('/api/module0/fimm_users').then(response => {
    console.log('user detail :' + JSON.stringify(response.data));
    return response.data;
  }).catch(function (error) {
    if (error.response) {
      console.log('error response :' + error.response);
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 500) {} else if (error.response.status == 401) {
        logout();
      }
    }
  });
}

export async function getScreenAccess (id) {
  await this.header();
  return axios.get('/api/module0/screen_access', {
    params: {
      MANAGE_SCREEN_ACCESS_ID: id,
    },
  }).then(response => {
    console.log('data :' + JSON.stringify(response.data.data));
    return response.data.data;
  }).catch(function (error) {
    if (error.response) {
      if (error.response.status == 500) {
        if (error.response.data.message == 'Token expired.') {
          console.log('logout');
          logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        logout();
      }
      return 'error';
    }
  });
}

export async function getScreenAccesses () {
  await this.header();
  return axios.get('/api/module0/screen_accesses').then(response => {
    console.log('data :' + JSON.stringify(response.data.data));
    return response.data.data;
  }).catch(function (error) {
    if (error.response) {
      if (error.response.status == 500) {
        if (error.response.data.message == 'Token expired.') {
          console.log('logout');
          logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        logout();
      }
      return 'error';
    }
  });
}

export async function createScreenAccess (data) {
  await this.header();
  return axios.post('/api/module0/screen_access', data).then(response => {
    Vue.$toast.open({
      message: response.data.message,
      type: 'success',
    });
    return response.data;
  }).catch(function (error) {
    if (error.response) {
      Vue.$toast.open({
        message: error.response.data.message,
        type: 'error',
      });
      if (error.response.status == 500) {
        if (error.response.data.message == 'Token expired.') {
          console.log('logout');
          logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        logout();
      }
      return 'error';
    }
  });
}

export async function deleteScreenAccess (data) {
  return axios
    .delete('/api/module0/screen_access', {
      data: { SCREEN_ACCESS_ID: data },
    })
    .then(response => {
      // console.log("data :" + JSON.stringify(response.data));
      Vue.$toast.open({
        message: response.data.message,
        type: 'success',
      });
      return response.data;
    }).catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status == 401) {
          servicesModule0.logout();
        } else {
          return 'error';
        }
      }
    });
}

//* ********** Sub module management ***************/
export async function getSubmodule (data) {
  await this.header();
  return axios.get('/api/module0/submodule', {
    params: {
      MANAGE_MODULE_ID: data,
    },
  }).then(response => {
    console.log('data :' + JSON.stringify(response.data.data));
    return response.data.data;
  }).catch(function (error) {
    if (error.response) {
      if (error.response.status == 500) {
        if (error.response.data.message == 'Token expired.') {
          console.log('logout');
          logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        logout();
      }
      return 'error';
    }
  });
}

export async function getAllSubmoduleList () {
  return axios.get('/api/module0/submodulesrequire')
    .then(response => {
      // console.log('data :' + JSON.stringify(response.data.data));
      return response.data.data;
    }).catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status == 401) {
          logout();
        } else {
          return 'error';
        }
      }
    });
}
//* *****************************************/

//* ***************DAYAT*********************/
//* ******Calendar Management ***************/
export async function getAllExceptionList () {
  await this.header();
  return axios.get('/api/module0/calendar_settings').then(response => {
    console.log('exception list :' + JSON.stringify(response.data.data));
    return response.data.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 500) {} else if (error.response.status == 401) {
        logout();
      }
      return 'error';
    }
  });
}

export async function getExceptionById (data) {
  await this.header();
  return axios.get('/api/module0/calendar_setting_ById', {
    params: {
      SETTING_CALENDAR_ID: data,
    },
  }).then(response => {
    console.log('data :' + JSON.stringify(response.data.data));
    return response.data.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 500) {} else if (error.response.status == 401) {
        logout();
      }
      return 'error';
    }
  });
}

const generalAlert = (msg) => {
  return Vue.$toast.open({
    message: msg,
    type: 'success',
  });
};

const generalAlertError = (msg) => {
  return Vue.$toast.open({
    message: msg,
    type: 'error',
  });
};

export async function createException (data) {
  await this.header();
  return axios.post('/api/module0/calendar_setting', data).then(response => {
    // console.log("exception create :" + JSON.stringify(response.data));
    generalAlert(response.data.message);
    return response.data;
  }).catch(function (error) {
    if (error.response) {
      console.log('error : ' + error.response);
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 500) {
        // console.log(JSON.stringify(error.response.data.message));
        if (error.response.data.message == 'Token expired.') {
          console.log('logout');
          logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        logout();
      }
      return 'error';
    }
  });
}

export async function createMultiCalender (data) {
  await this.header();
  return axios.post('/api/module0/multi_calendar_setting', data)
    .then(response => {
      // console.log("exception create :" + response.data.message);
      generalAlert(response.data.message);
      return response.data;
    }).catch(function (error) {
      if (error.response) {
        console.log('error : ' + error.response);
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status == 500) {
          // console.log(JSON.stringify(error.response.data.message));
          if (error.response.data.message == 'Token expired.') {
            console.log('logout');
            logout();
          } else {
            console.log(error.response.data.message);
          }
        } else if (error.response.status == 401) {
          logout();
        }
        return 'error';
      }
    });
}

export async function deleteException (data) {
  return axios
    .delete('/api/module0/calendar_setting', {
      data: { SETTING_CALENDAR_ID: data },
    })
    .then(response => {
      console.log('data :' + JSON.stringify(response.data));
      generalAlert(response.data.message);
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

export async function updateException (data) {
  return axios.post('/api/module0/calendar_setting_update', data).then(response => {
    console.log('data :' + JSON.stringify(response.data));
    generalAlert(response.data.message);
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

export async function filterException (data) {
  await this.header();
  return axios.get('/api/module0/filter_calendar_setting', { params: data }).then(response => {
    console.log('data :' + JSON.stringify(response.data.data));
    return response.data.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 500) {
        // console.log(JSON.stringify(error.response.data.message));
        if (error.response.data.message == 'Token expired.') {
          console.log('logout');
          logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        logout();
      }
      return 'error';
    }
  });
}
//* ***end calendar management**********/

//* ******Manage Template Form *********/
export async function createExcelTemplate (data) {
  await this.header();
  return axios.post('/api/module0/template', data).then(response => {
    generalAlert(response.data.message);
    return response.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 500) {
        // console.log(JSON.stringify(error.response.data.message));
        if (error.response.data.message == 'Expired token.') {
          console.log('logout');
          logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        logout();
      }
      return 'error';
    }
  });
}

export async function getAllExcelTemplate () {
  await this.header();
  return axios.get('/api/module0/templates')
    .then(response => {
      // console.log(response.statusText);
      console.log('list template: ' + JSON.stringify(response.data.data));
      return response.data.data;
    })
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status == 500) {
          // console.log(JSON.stringify(error.response.data.message));
          if (error.response.data.message == 'Expired token.') {
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

export async function getExcelTemplateById (data) {
  await this.header();
  return axios.get('/api/module0/template', {
    params: {
      MANAGE_FORM_TEMPLATE_ID: data,
    },
  })
    .then(response => {
      console.log('data : ' + JSON.stringify(response.data.data));
      return response.data.data;
    })
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status == 500) {
          // console.log(JSON.stringify(error.response.data.message));
          if (error.response.data.message == 'Expired token.') {
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

export async function downloadTemplate (tid) {
  await this.header();
  return axios
    .get('/api/module0/download/template_file?id=' + tid, {
      responseType: 'arraybuffer',
    })
    .then(response => {
      console.log('datadownload =' + JSON.stringify(response.data));
      return response;
    }).catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status == 400) {
          // generalAlertError(error.response.data.message);
          alert('File not Exists!');
        } else if (error.response.status == 500) {
          // console.log(JSON.stringify(error.response.data.message));
          if (error.response.data.message.includes('Expired token')) {
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

export async function deleteTemplate (data) {
  if (confirm('Do you really want to delete?')) {
    return axios
      .delete('/api/module0/template_file', {
        data: { MANAGE_FORM_TEMPLATE_ID: data },
      })
      .then(response => {
        // console.log('data :' + JSON.stringify(response.data));
        generalAlert(response.data.message);
        return response.data;
      }).catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          if (error.response.status == 401) {
            logout();
          } else {
            return 'error';
          }
        }
      });
  }
}

export async function updateExcelTemplate (data) {
  await this.header();
  return axios.post('/api/module0/template_file', data)
    .then(response => {
      console.log('data :' + JSON.stringify(response.data));
      generalAlert(response.data.message);
      return response.data;
    }).catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status == 400) {
          generalAlertError(error.response.data.message);
        }
        if (error.response.status == 401) {
          logout();
        } else {
          return 'error';
        }
      }
    });
}

export async function getFilteredTemplate (data) {
  await this.header();
  return axios.post('/api/module0/filter_template', data).then(response => {
    console.log('data :' + JSON.stringify(response.data.data));
    return response.data.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 500) {
        // console.log(JSON.stringify(error.response.data.message));
        if (error.response.data.message == 'Token expired.') {
          console.log('logout');
          logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        logout();
      }
      return 'error';
    }
  });
}
//* **********end manage template***********/

//* **********Manage required document******/
export async function createDocument (data) {
  return axios.post('/api/module0/required_document', data).then(response => {
    console.log('data :' + JSON.stringify(response.data));
    generalAlert(response.data.message);
    return response.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 401) {
        logout();
      } else {
        return 'error';
      }
    }
  });
}

export async function getDocument (data) {
  await this.header();
  return axios.get('/api/module0/required_document', { params: data }).then(response => {
    // console.log('data document :' + JSON.stringify(response.data.data));
    return response.data.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 500) {
        // console.log(JSON.stringify(error.response.data.message));
        if (error.response.data.message == 'Token expired.') {
          console.log('logout');
          logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        logout();
      }
      return 'error';
    }
  });
}

export async function getSubmoduleByRequiredDocument (data) {
  await this.header();
  return axios.get('/api/module0/sub_modules', { params: data }).then(response => {
    console.log('data :' + JSON.stringify(response.data.data));
    return response.data.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 500) {
        // console.log(JSON.stringify(error.response.data.message));
        if (error.response.data.message == 'Token expired.') {
          console.log('logout');
          logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        logout();
      }
      return 'error';
    }
  });
}

export async function getManageModuleDataById (data) {
  await servicesModule0.header();
  return axios.get('/api/module0/sub_modules_data', {
    params: {
      MANAGE_REQUIRED_DOCUMENT_ID: data,
    },
  })
    .then(response => {
      console.log('data : ' + JSON.stringify(response.data.data));
      return response.data.data;
    })
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status == 500) {
          // console.log(JSON.stringify(error.response.data.message));
          if (error.response.data.message == 'Expired token.') {
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

export async function getDocType (data) {
  await this.header();
  return axios.get('/api/module0/doc_type', { params: data }).then(response => {
    console.log('data :' + JSON.stringify(response.data.data));
    return response.data.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 500) {
        // console.log(JSON.stringify(error.response.data.message));
        if (error.response.data.message == 'Token expired.') {
          console.log('logout');
          logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        logout();
      }
      return 'error';
    }
  });
}

export async function deleteRequiredDocument (data) {
  if (confirm('Do you really want to delete?')) {
    await this.header();
    return axios.delete('/api/module0/required_document', { data: { MANAGE_REQUIRED_DOCUMENT_ID: data } }).then(response => {
      console.log('data :' + JSON.stringify(response.data.data));
      generalAlert(response.data.message);
      return response.data.data;
    }).catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status == 500) {
          // console.log(JSON.stringify(error.response.data.message));
          if (error.response.data.message == 'Token expired.') {
            console.log('logout');
            logout();
          } else {
            console.log(error.response.data.message);
          }
        } else if (error.response.status == 401) {
          logout();
        }
        return 'error';
      }
    });
  }
}

export async function getRequiredDocumentById (data) {
  await this.header();
  return axios.get('/api/module0/required_document_byId', {
    params: {
      MANAGE_REQUIRED_DOCUMENT_ID: data,
    },
  }).then(response => {
    console.log('data :' + JSON.stringify(response.data.data));
    return response.data.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 500) {
        // console.log(JSON.stringify(error.response.data.message));
        if (error.response.data.message == 'Token expired.') {
          console.log('logout');
          logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        logout();
      }
      return 'error';
    }
  });
}
export async function getRequiredDocumentEditById (data) {
  await this.header();
  return axios.get('/api/module0/required_document_byEditId', {
    params: {
      MANAGE_REQUIRED_DOCUMENT_ID: data,
    },
  }).then(response => {
    console.log('data :' + JSON.stringify(response.data.data));
    return response.data.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 500) {
        // console.log(JSON.stringify(error.response.data.message));
        if (error.response.data.message == 'Token expired.') {
          console.log('logout');
          logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        logout();
      }
      return 'error';
    }
  });
}

export async function updateRequiredDocument (data) {
  return axios.post('/api/module0/required_document_update', data).then(response => {
    console.log('data :' + JSON.stringify(response.data));
    generalAlert(response.data.message);
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

export async function filterRequiredDocument (data) {
  await this.header();
  return axios.get('/api/module0/filter_required_document', { params: data }).then(response => {
    console.log('data :' + JSON.stringify(response.data.data));
    return response.data.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 500) {
        // console.log(JSON.stringify(error.response.data.message));
        if (error.response.data.message == 'Token expired.') {
          console.log('logout');
          logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        logout();
      }
      return 'error';
    }
  });
}
//* *******end Manage required document*********/

//* ********Manage module***********************/
export async function getAllModule () {
  await this.header();
  return axios.get('/api/module0/modules').then(response => {
    console.log('list : ' + JSON.stringify(response.data.data));
    return response.data.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 401) {
        logout();
      } else {
        return 'error';
      }
    }
  });
}

//* **********Event Management***************/
export async function createEvent (data) {
  return axios.post('/api/module0/create_event_management', data).then(response => {
    // console.log('data :' + JSON.stringify(response.data));
    Vue.$toast.open({
      message: response.data.message,
      type: 'success',
    });
    return response.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      Vue.$toast.open({
        message: error.response.data.message,
        type: 'error',
      });
      // that falls out of the range of 2xx
      if (error.response.status == 401) {
        logout();
      } else {
        return 'error';
      }
    }
  });
}

export async function updateEvent (data) {
  console.log('Data for Update==', data);
  return axios.post('/api/module0/event_management', data).then(response => {
    Vue.$toast.open({
      message: response.data.message,
      type: 'success',
    });
    return response.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      Vue.$toast.open({
        message: error.response.data.message,
        type: 'error',
      });
      // that falls out of the range of 2xx
      if (error.response.status == 401) {
        logout();
      } else {
        return 'error';
      }
    }
  });
}

// export async function getAllEvent(data) {
//     await this.header();
//     return axios.get('/api/module0/event_managements').then(response => {
//         params: {
//             EVENT_TYPE: data

//         }
//         console.log('data document :' + JSON.stringify(response.data.data));
//         return response.data.data;
//     }).catch(function(error) {
//         if (error.response) {
//             // The request was made and the server responded with a status code
//             // that falls out of the range of 2xx
//             if (error.response.status == 500) {
//                 // console.log(JSON.stringify(error.response.data.message));
//                 if (error.response.data.message == 'Token expired.') {
//                     console.log('logout');
//                     logout();
//                 } else {
//                     console.log(error.response.data.message);
//                 }
//             } else if (error.response.status == 401) {
//                 logout();
//             }
//         }
//     }, );
// }

export async function getAllEvent (data) {
  await this.header();
  return axios.get('/api/module0/event_managements', {
    params: { DEPARTMENT: data },
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
export async function getEventById (data) {
  await this.header();
  return axios.get('/api/module0/event_management', {
    params: {
      MANAGE_EVENT_ID: data,
    },
  }).then(response => {
    console.log(response.data);
    return response.data.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 401) {
        logout();
      } else {
        return 'error';
      }
    }
  });
}
export async function getDocumentById (data) {
  await this.header();
  return axios.get('/api/module0/event_document', {
    params: {
      MANAGE_EVENT_ID: data,
    },
  }).then(response => {
    // console.log("Dococument list : "+JSON.stringify(response.data.data));
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

// Get all event from database
export async function getApprList (data, index) {
  await this.header();
  return axios.get('/api/module0/event_approvalss', {
    params: {
      // APPROVAL_LEVEL_ID:data,
      EVENT_TYPE: data,
      APPR_PUBLISH_STATUS: index,
      // APPR_GROUP_ID: data
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

export async function deleteEventAppr (data) {
  return axios.post('/api/module0/delete_event_appr', data).then(response => {
    console.log(response.data);
    Vue.$toast.open({
      message: response.data.message,
      type: 'success',
    });
    return response.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 401) {
        logout();
      } else {
        return 'error';
      }
    }
  });
}
//* **********end Event Management***********/

//* **********Distributor Type***************/
export async function getDistributorType () {
  await this.header();
  return axios.get('/api/module0/distributor_typess').then(response => {
    console.log('data :' + JSON.stringify(response.data.data));
    return response.data.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 401) {
        logout();
      } else {
        return 'error';
      }
    }
  });
}
//* **********Consultant Type***************/
export async function getConsultantType () {
  await this.header();
  return axios.get('/api/module0/consultant_type').then(response => {
    console.log('data :' + JSON.stringify(response.data.data));
    return response.data.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 401) {
        logout();
      } else {
        return 'error';
      }
    }
  });
}
//* ************other type ***************/
export async function getOtherType () {
  await this.header();
  return axios.get('/api/module0/other_type', {
    params: {
      SET_TYPE: 'USERCATEGORY',
      SET_CODE: 'other',
    },
  }).then(response => {
    console.log('data :' + JSON.stringify(response.data.data));
    return response.data.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 401) {
        logout();
      } else {
        return 'error';
      }
    }
  });
}
//* ***********view document ****************/
export async function viewDocument (data) {
  await this.header();
  return axios.get('/api/module0/document/' + data).then(response => {
    console.log('data :' + JSON.stringify(response.data.data));
    return response.data.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 500) {
        // console.log(JSON.stringify(error.response.data.message));
        if (error.response.data.message == 'Token expired.') {
          console.log('logout');
          logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        logout();
      }
      return 'error';
    }
  });
}

//* ***************NURUL*********************/
//* **Division Management***/
export async function getAllDivisionList () {
  await this.header();
  return axios.get('/api/module0/division_managements').then(response => {
    console.log('division list :' + JSON.stringify(response.data.data));
    return response.data.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 401) {
        logout();
      } else {
        return 'error';
      }
    }
  });
}

export async function getDivisionById (data) {
  await this.header();
  return axios.get('/api/module0/division_management', {
    params: {
      MANAGE_DIVISION_ID: data,
    },
  }).then(response => {
    console.log('data :' + JSON.stringify(response.data.data));
    return response.data.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 401) {
        logout();
      } else {
        return 'error';
      }
    }
  });
}

export async function createDivision (data) {
  await this.header();
  return axios.post('/api/module0/division_management', data).then(response => {
    // console.log("exception create :" + JSON.stringify(response.data));
    Vue.$toast.open({
      message: response.data.message,
      type: 'success',
    });
    return response.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 401) {
        logout();
      } else {
        return 'error';
      }
    }
  });
}

export async function updateDivision (data) {
  const jsonObject = {};

  for (const [key, value] of data) {
    jsonObject[key] = value;
  }
  return axios
    .put('/api/module0/division_management', jsonObject)
    .then(response => {
      // console.log('data :' + JSON.stringify(response.data));
      Vue.$toast.open({
        message: response.data.message,
        type: 'success',
      });
      return response.data;
    }).catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status == 401) {
          logout();
        } else {
          return 'error';
        }
      }
    });
}

export async function deleteDivision (data) {
  return axios
    .delete('/api/module0/division_management', {
      data: { MANAGE_DIVISION_ID: data },
    })
    .then(response => {
      // console.log('data :' + JSON.stringify(response.data));
      Vue.$toast.open({
        message: response.data.message,
        type: 'success',
      });
      return response.data;
    }).catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status == 401) {
          logout();
        } else {
          return 'error';
        }
      }
    });
}

//* *****************************************/

//* ***************NURUL*********************/
//* *****************Department********/
export async function createDepartment (data) {
  await this.header();
  return axios.post('/api/module0/department_management', data).then(response => {
    // console.log("exception create :" + JSON.stringify(response.data));
    Vue.$toast.open({
      message: response.data.message,
      type: 'success',
    });
    return response.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      Vue.$toast.open({
        message: error.response.data.message,
        type: 'error',
      });
      // that falls out of the range of 2xx
      if (error.response.status == 401) {
        logout();
      } else {
        return 'error';
      }
    }
  });
}
export async function getAllDepartmentList () {
  await this.header();
  return axios.get('/api/module0/department_managements').then(response => {
    console.log('department list :' + JSON.stringify(response.data.data));
    return response.data.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 500) {
        // console.log(JSON.stringify(error.response.data.message));
        if (error.response.data.message == 'Token expired.') {
          console.log('logout');
          logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        logout();
      }
      return 'error';
    }
  });
}

export async function getDepartmentById (data) {
  await this.header();
  return axios.get('/api/module0/department_management', {
    params: {
      MANAGE_DEPARTMENT_ID: data,
    },
  }).then(response => {
    console.log('data :' + JSON.stringify(response.data.data));
    return response.data.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 500) {
        // console.log(JSON.stringify(error.response.data.message));
        if (error.response.data.message == 'Token expired.') {
          console.log('logout');
          logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        logout();
      }
      return 'error';
    }
  });
}

export async function deleteDepartment (data) {
  return axios
    .delete('/api/module0/department_management', {
      data: { MANAGE_DEPARTMENT_ID: data },
    })
    .then(response => {
      // console.log('data :' + JSON.stringify(response.data));
      Vue.$toast.open({
        message: response.data.message,
        type: 'success',
      });
      return response.data;
    }).catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        Vue.$toast.open({
          message: error.response.data.message,
          type: 'error',
        });
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

export async function updateDepartment (data) {
  const jsonObject = {};

  for (const [key, value] of data) {
    jsonObject[key] = value;
  }
  return axios
    .put('/api/module0/department_management', jsonObject)
    .then(response => {
      // console.log('data :' + JSON.stringify(response.data));
      Vue.$toast.open({
        message: response.data.message,
        type: 'success',
      });
      return response.data;
    }).catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        Vue.$toast.open({
          message: error.response.data.message,
          type: 'error',
        });
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
export async function getFilteredDepartment (data) {
  await this.header();
  return axios.get('/api/module0/filter_department_management', { params: data }).then(response => {
    console.log('data :' + JSON.stringify(response.data.data));
    return response.data.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 500) {
        // console.log(JSON.stringify(error.response.data.message));
        if (error.response.data.message == 'Token expired.') {
          console.log('logout');
          logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        logout();
      }
      return 'error';
    }
  });
}
//* *****************Group*******************/
export async function createGroup (data) {
  await this.header();
  return axios.post('/api/module0/group_management', data).then(response => {
    // console.log("exception create :" + JSON.stringify(response.data));
    Vue.$toast.open({
      message: response.data.message,
      type: 'success',
    });
    return response.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      Vue.$toast.open({
        message: error.response.data.message,
        type: 'error',
      });
      // that falls out of the range of 2xx
      if (error.response.status == 401) {
        logout();
      } else {
        return 'error';
      }
    }
  });
}
export async function getAllGroupList () {
  await this.header();
  return axios.get('/api/module0/group_managements').then(response => {
    // console.log('group list :' + JSON.stringify(response.data.data));
    return response.data.data;
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

export async function getGroupById (data) {
  await this.header();
  return axios.get('/api/module0/group_management', {
    params: {
      MANAGE_GROUP_ID: data,
    },
  }).then(response => {
    // console.log('data :' + JSON.stringify(response.data.data));
    return response.data.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 500) {
        // console.log(JSON.stringify(error.response.data.message));
        if (error.response.data.message == 'Token expired.') {
          console.log('logout');
          logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        logout();
      }
      return 'error';
    }
  });
}

export async function updateGroup (data) {
  const jsonObject = {};

  for (const [key, value] of data) {
    jsonObject[key] = value;
  }
  return axios
    .put('/api/module0/group_management', jsonObject)
    .then(response => {
      // console.log('data :' + JSON.stringify(response.data));
      Vue.$toast.open({
        message: response.data.message,
        type: 'success',
      });
      return response.data;
    }).catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        Vue.$toast.open({
          message: error.response.data.message,
          type: 'error',
        });
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
export async function deleteGroup (data) {
  return axios
    .delete('/api/module0/group_management', {
      data: { MANAGE_GROUP_ID: data },
    })
    .then(response => {
      // console.log('data :' + JSON.stringify(response.data));
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

//* ********** Screen Access management ************/
export async function getScreen (moduleSelection, submoduleSelection) {
  await this.header();
  return axios.get('/api/module0/screen', {
    params: {
      MANAGE_MODULE_ID: moduleSelection,
      MANAGE_SUBMODULE_ID: submoduleSelection,
    },
  }).then(response => {
    // console.log('data :' + JSON.stringify(response.data.data));
    return response.data.data;
  }).catch(function (error) {
    if (error.response) {
      if (error.response.status == 500) {
        if (error.response.data.message == 'Token expired.') {
          console.log('logout');
          logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        logout();
      }
      return 'error';
    }
  });
}

export async function getSettingGeneralById (data) {
  await this.header();
  return axios.get('/api/module0/setting_general', {
    params: {
      SETTING_GENERAL_ID: data,
    },
  }).then(response => {
    // console.log('data :' + JSON.stringify(response.data.data));
    return response.data.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 500) {
        // console.log(JSON.stringify(error.response.data.message));
        if (error.response.data.message == 'Token expired.') {
          console.log('logout');
          logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        logout();
      }
      return 'error';
    }
  });
}
export async function deleteSettingGeneral (data) {
  return axios
    .delete('/api/module0/setting_general', {
      data: { SETTING_GENERAL_ID: data },
    })
    .then(response => {
      // console.log('data :' + JSON.stringify(response.data));
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

export async function getFilteredGroup (data) {
  await this.header();
  return axios.get('/api/module0/filter_group_management', { params: data }).then(response => {
    // console.log('data :' + JSON.stringify(response.data.data));
    return response.data.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 500) {
        // console.log(JSON.stringify(error.response.data.message));
        if (error.response.data.message == 'Token expired.') {
          console.log('logout');
          logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        logout();
      }
      return 'error';
    }
  });
}
//* ********** Setting General ***************/
export async function getAllSettingGeneralList (data) {
  await this.header();
  return axios.get('/api/module0/setting_generals', {
    params: {
      SET_TYPE: data,
    },
  }).then(response => {
    // console.log('setting general list :' + JSON.stringify(response.data.data));
    return response.data.data;
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
export async function createSettingGeneral (data) {
  await this.header();
  return axios.post('/api/module0/setting_general', data).then(response => {
    // console.log("exception create :" + JSON.stringify(response.data));
    return response.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 500) {
        // console.log(JSON.stringify(error.response.data.message));
        if (error.response.data.message == 'Token expired.') {
          console.log('logout');
          logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        logout();
      }
      return 'error';
    }
  });
}
export async function updateSettingGeneral (data) {
  const jsonObject = {};

  for (const [key, value] of data) {
    jsonObject[key] = value;
  }
  return axios
    .put('/api/module0/setting_general', jsonObject)
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
//* *****************************************/

//* ***************ROS***********************/
//* *****************************************/
//* ***************ASHRAF********************/
//* *****************************************/
//* ***************SYASYA********************/
export async function getAllAuthorizationLevelList (data) {
  await this.header();
  return axios.get('/api/module0/authorization_levels', {
    params: {

    },
  }).then(response => {
    // console.log('setting general list :' + JSON.stringify(response.data.data));
    return response.data.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 500) {
        // console.log(JSON.stringify(error.response.data.message));
        if (error.response.data.message == 'Token expired.') {
          servicesModule0.logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        servicesModule0.logout();
      }
    }
  });
}
export async function createAuthorizationLevel (data) {
  await this.header();
  return axios.post('/api/module0/authorization_level', data).then(response => {
    Vue.$toast.open({
      message: response.data.message,
      type: 'success',
    });
    return response.data;
  }).catch(function (error) {
    // console.log("exception create eroor  :", error.response);

    if (error.response) {
      Vue.$toast.open({
        message: error.response.data.message,
        type: 'error',
      });
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 500) {
        // console.log(JSON.stringify(error.response.data.message));
        if (error.response.data.message == 'Token expired.') {
          console.log('logout');
          servicesModule0.logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        servicesModule0.logout();
      }
      return 'error';
    }
  });
}
export async function getAuthorizationById (data) {
  await this.header();
  return axios.get('/api/module0/authorization_level', {
    params: {
      AUTHORIZATION_LEVEL_ID: data,
    },
  }).then(response => {
    // console.log("data :" + JSON.stringify(response.data.data));
    return response.data.data;
  }).catch(function (error) {
    if (error.response) {
      // Vue.$toast.open({
      //     message: error.response.data.message,
      //     type: 'error',
      // });
      if (error.response.status == 401) {
        servicesModule0.logout();
      } else {
        return 'error';
      }
    }
  });
}
export async function deleteAuthorizationLevel (data) {
  return axios
    .delete('/api/module0/authorization_level', {
      data: { AUTHORIZATION_LEVEL_ID: data },
    })
    .then(response => {
      // console.log("data :" + JSON.stringify(response.data));
      Vue.$toast.open({
        message: response.data.message,
        type: 'success',
      });
      return response.data;
    }).catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status == 401) {
          servicesModule0.logout();
        } else {
          return 'error';
        }
      }
    });
}
export async function updateAuthorizationLevel (data) {
  const jsonObject = {};

  for (const [key, value] of data) {
    jsonObject[key] = value;
  }
  return axios
    .put('/api/module0/authorization_level', jsonObject)
    .then(response => {
      // console.log('data :' + JSON.stringify(response.data));
      Vue.$toast.open({
        message: response.data.message,
        type: 'success',
      });
      return response.data;
    }).catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        Vue.$toast.open({
          message: error.response.data.message,
          type: 'error',
        });
        // that falls out of the range of 2xx
        if (error.response.status == 500) {
          // console.log(JSON.stringify(error.response.data.message));
          if (error.response.data.message == 'Token expired.') {
            logout();
          } else {
            // console.log(error.response.data.message);
          }
        } else if (error.response.status == 401) {
          logout();
        }
      }
    });
}

//* *****************************************/

//* ***Email Setting *************/
export async function getEmailSettingList () {
  await this.header();
  return axios.get('/api/module0/email_setting').then(response => {
    console.log('email list :' + JSON.stringify(response.data.data));
    return response.data.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 500) {
        // console.log(JSON.stringify(error.response.data.message));
        if (error.response.data.message == 'Token expired.') {
          console.log('logout');
          logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        logout();
      }
      return 'error';
    }
  });
}
//* *** Email Setting Update*****/
export async function createEmailSetting (data) {
  console.log('data : ' + data);
  await this.header();
  return axios.post('/api/module0/email_setting', data).then(response => {
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
        if (error.response.data.message.includes('Expired token')) {
          console.log('logout');
          logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        logout();
      }
      return 'error';
    }
  });
}
//* *** Email Setting update *****/
export async function updateEmailSetting (data) {
  console.log('data : ' + data);
  await this.header();
  return axios.post('/api/module0/email_setting_update', data).then(response => {
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
        if (error.response.data.message.includes('Expired token')) {
          console.log('logout');
          logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        logout();
      }
      return 'error';
    }
  });
}
//* *** Email Setting update *****/
export async function testConnectionEmailSetting (data) {
  console.log('data : ', data);
  await this.header();
  return axios.post('/api/module0/email_setting_test', data)
    .then(response => {
      console.log('Response=', response);
      if (response.status == 200) {
        Vue.$toast.open({
          message: 'Email setting successfully connected',
          type: 'success',
        });
      } else {
        Vue.$toast.open({
          message: 'Email connection failed to be configured.',
          type: 'error',
        });
      }
      return response.status;
    }).catch(error => {
      console.log('Error Response =', error);
      return 'error';
      // if (error) {
      //     // The request was made and the server responded with a status code
      //     // that falls out of the range of 2xx
      //     if (error.includes('500')) {
      //         // console.log(JSON.stringify(error.response.data.message));
      //         if (error.includes('Expired token')) {
      //             console.log('logout');
      //             logout();
      //         } else {
      //             console.log("Error error.response.data.message: ", error);
      //         }
      //     } else if (error.includes('401')) {
      //         logout();
      //     }
      //     return 'error';
      // }
    });
}
//* *** end Email Setting *****/

//* *** LDAP test connection *****/
export async function getLDAPTestConnection (data) {
  await this.header();
  return axios.post('/api/module0/ldap_testing', data).then(response => {
    console.log('LDAP data :' + JSON.stringify(response.data));
    return response.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 500) {
        // console.log(JSON.stringify(error.response.data.message));
        if (error.response.data.message == 'Token expired.') {
          console.log('logout');
          logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        logout();
      }
      return 'error';
    }
  });
}

//* *** LDAP Setting *****/
export async function getLDAPSettingList () {
  await this.header();
  return axios.get('/api/module0/ldap_setting').then(response => {
    console.log('LDAP data :' + JSON.stringify(response.data.data));
    return response.data.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 500) {
        // console.log(JSON.stringify(error.response.data.message));
        if (error.response.data.message == 'Token expired.') {
          console.log('logout');
          logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        logout();
      }
      return 'error';
    }
  });
}

// Ldap Setting Create
export async function createLDAPSetting (data) {
  console.log('data : ' + data);
  await this.header();
  return axios.post('/api/module0/ldap_setting_create', data).then(response => {
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
        if (error.response.data.message.includes('Expired token')) {
          console.log('logout');
          logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        logout();
      }
      return 'error';
    }
  });
}
// Ldap Setting update
export async function updateLDAPSetting (data) {
  console.log('data : ' + data);
  await this.header();
  return axios.post('/api/module0/ldap_setting_update', data).then(response => {
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
        if (error.response.data.message.includes('Expired token')) {
          console.log('logout');
          logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        logout();
      }
      return 'error';
    }
  });
}

// File Size Setting Create
export async function createFileSizeSetting (data) {
  console.log('data : ' + data);
  await this.header();
  return axios.post('/api/module0/filesize_setting_create', data).then(response => {
    generalAlert(response.data.message);
    return response.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 500) {
        // console.log(JSON.stringify(error.response.data.message));
        if (error.response.data.message.includes('Expired token')) {
          console.log('logout');
          logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        logout();
      }
      return 'error';
    }
  });
}
// File Size Setting Get
export async function getFileSizeSettingList () {
  await this.header();
  return axios.get('/api/module0/file_size_setting').then(response => {
    console.log('File data :' + JSON.stringify(response.data.data));
    return response.data.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 500) {
        // console.log(JSON.stringify(error.response.data.message));
        if (error.response.data.message == 'Token expired.') {
          console.log('logout');
          logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        logout();
      }
      return 'error';
    }
  });
}

export async function updateFileSizeSetting (data) {
  console.log('data : ' + data);
  await this.header();
  return axios.post('/api/module0/file_size_setting_update', data).then(response => {
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
        if (error.response.data.message.includes('Expired token')) {
          console.log('logout');
          logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        logout();
      }
      return 'error';
    }
  });
}

//* *** END LDAP Setting *****/

//* ***SMS Setting *************/

export async function getSmsSettingList () {
  await this.header();
  return axios.get('/api/module0/sms_setting').then(response => {
    console.log('sms list :' + JSON.stringify(response.data.data));
    return response.data.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 500) {
        // console.log(JSON.stringify(error.response.data.message));
        if (error.response.data.message == 'Token expired.') {
          console.log('logout');
          logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        logout();
      }
      return 'error';
    }
  });
}

export async function createSmsSetting (data) {
  console.log('data : ' + data);
  await this.header();
  return axios.post('/api/module0/sms_setting_create', data).then(response => {
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
          logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        logout();
      }
      return 'error';
    }
  });
}

export async function updateSmsException (data) {
  /* const jsonObject = {};

    for (const [key, value] of data) {
        jsonObject[key] = value;
    } */
  return axios
    .post('/api/module0/sms_setting_update', data)
    .then(response => {
      console.log('data :' + JSON.stringify(response.data));
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
            services.logout();
          } else {
            console.log(error.response.data.message);
          }
        } else if (error.response.status == 401) {
          services.logout();
        }
      }
    });
}
export async function testSmsSetting (data) {
  /* const jsonObject = {};

    for (const [key, value] of data) {
        jsonObject[key] = value;
    } */
  return axios
    .post('/api/module0/sms_setting_test', data)
    .then(response => {
      console.log('data11111111 :' + response);
      if (response.data.status == 202) {
        Vue.$toast.open({
          message: 'SMS Send Successfull',
          type: 'success',
        });
      }
      return response.data;
    }).catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status == 500) {
          // console.log(JSON.stringify(error.response.data.message));
          if (error.response.data.message == 'Token expired.') {
            services.logout();
          } else {
            console.log(error.response.data.message);
          }
        } else if (error.response.status == 401) {
          services.logout();
        }
      }
    });
}

//* ***Http Setting *************/

export async function getHttpSettingList () {
  await this.header();
  return axios.get('/api/module0/http_setting').then(response => {
    return response.data.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 500) {
        // console.log(JSON.stringify(error.response.data.message));
        if (error.response.data.message == 'Token expired.') {
          console.log('logout');
          logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        logout();
      }
      return 'error';
    }
  });
}

export async function createHttpSetting (data) {
  console.log('data : ' + data);
  await this.header();
  return axios.post('/api/module0/http_setting_create', data).then(response => {
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
          logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        logout();
      }
      return 'error';
    }
  });
}

export async function updateHttpSetting (data) {
  /* const jsonObject = {};

    for (const [key, value] of data) {
        jsonObject[key] = value;
    } */
  return axios
    .post('/api/module0/http_setting_update', data)
    .then(response => {
      // console.log('data :' + JSON.stringify(response.data));
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
            services.logout();
          } else {
            console.log(error.response.data.message);
          }
        } else if (error.response.status == 401) {
          services.logout();
        }
      }
    });
}

// circular management

export async function getAllCircular (data) {
  await this.header();
  return axios.get('/api/module0/circular_managements', {
    params: {
      DEPARTMENT: data,
    },
  }).then(response => {
    // console.log(JSON.stringify(response.data.data));
    return response.data.data;
  }).catch(function (error) {
    if (error.response) {
      if (error.response.status == 500) {
        if (error.response.data.message == 'Token expired.') {
          console.log('logout');
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {}
      return 'error';
    }
  });
}

export async function getCircularById (data) {
  await this.header();
  return axios.get('/api/module0/circular_by_id', {
    params: {
      CIRCULAR_EVENT_ID: data,
    },
  }).then(response => {
    return response.data;
  }).catch(function (error) {
    if (error.response) {
      if (error.response.status == 500) {
        if (error.response.data.message == 'Token expired.') {
          console.log('logout');
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {}
      return 'error';
    }
  });
}

export async function updateCircular (data) {
  return axios.post('/api/module0/update_circular_management', data).then(response => {
    console.log(response.data);
    Vue.$toast.open({
      message: response.data.message,
      type: (response.data.status != 0) ? 'success' : 'error',
    });
    return response.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 401) {
        logout();
      } else {
        return 'error';
      }
    }
  });
}

// Delete Circular Event
export async function deleteCircular (data) {
  return axios.post('/api/module0/delete_circular_management', data).then(response => {
    console.log(response.data);
    Vue.$toast.open({
      message: response.data.message,
      type: 'success',
    });
    return response.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 401) {
        logout();
      } else {
        return 'error';
      }
    }
  });
}

export async function updateEventApproval (data) {
  return axios.post('/api/module0/event_approval', data).then(response => {
    console.log(response.data);
    Vue.$toast.open({
      message: response.data.message,
      type: 'success',
    });
    return response.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 401) {
        logout();
      } else {
        return 'error';
      }
    }
  });
}

export async function createCircular (data) {
  await this.header();
  return axios.post('/api/module0/create_circular_management', data).then(response => {
    Vue.$toast.open({
      message: response.data.message,
      type: 'success',
    });
    return response.data.data;
  }).catch(function (error) { // console.log('error : ', + error);
    if (error.response) {
      Vue.$toast.open({
        message: error.response.data.message,
        type: 'error',
      });

      if (error.response.status == 500) {
        if (error.response.data.message == 'Token expired.') {
          console.log('logout');
          servicesModule0.logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        servicesModule0.logout();
      }
      return 'error';
    }
  });
}

export async function getCircularDocumentById (data) {
  await this.header();
  return axios.get('/api/module0/circular_document', {
    params: {
      CIRCULAR_EVENT_DOCUMENT_ID: data,
    },
  }).then(response => {
    console.log('Dococument list : ' + JSON.stringify(response.data.data));
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

export async function CirculargetApprList (data, index) {
  await this.header();
  return axios.get('/api/module0/circular_approval', {
    params: {

      EVENT_TYPE: data,
      APPR_PUBLISH_STATUS: index,

    },
  }).then(response => {
    // console.log(JSON.stringify(response.data.data));
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

export async function getTaskStatus () {
  await this.header();
  return axios.get('/api/module0/get_task_status').then(response => {
    // console.log(JSON.stringify(response.data.data));
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

export async function getActiveInactiveTaskStatus () {
  await this.header();
  return axios.get('/api/module0/get_active_inactive_task_status').then(response => {
    // console.log(JSON.stringify(response.data.data));
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

export async function searchCircular (dept, title, status) {
  await this.header();
  return axios.get('/api/module0/search_circular', {
    params: {
      TITLE: title,
      STATUS: status,
      DEPARTMENT: dept,
    },
  }).then(response => {
    // console.log(JSON.stringify(response.data.data));
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

export async function getAllReviewCircular (title, status, dept) {
  await this.header();
  return axios.get('/api/module0/review_circular', {
    params: {
      TITLE: title,
      STATUS: status,
      MANAGE_DEPARTMENT_ID: dept,
    },
  }).then(response => {
    // console.log(JSON.stringify(response.data.data));
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

export async function getGmReviewCircular (title, status, dept) {
  await this.header();
  return axios.get('/api/module0/gm_review_circular', {
    params: {
      TITLE: title,
      STATUS: status,
      MANAGE_DEPARTMENT_ID: dept,
    },
  }).then(response => {
    // console.log(JSON.stringify(response.data.data));
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

export async function reviewCircularUpdate (data) {
  return axios.post('/api/module0/review_circular_update', data).then(response => {
    // console.log(response.data);
    Vue.$toast.open({
      message: response.data.message,
      type: 'success',
    });
    return response.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      Vue.$toast.open({
        message: error.response.data.message,
        type: 'error',
      });
      // that falls out of the range of 2xx
      if (error.response.status == 401) {
        logout();
      } else {
        return 'error';
      }
    }
  });
}

export async function gmReviewCircularUpdate (data) {
  return axios.post('/api/module0/gm_review_circular_update', data).then(response => {
    // console.log(response.data);
    Vue.$toast.open({
      message: response.data.message,
      type: 'success',
    });
    return response.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      Vue.$toast.open({
        message: error.response.data.message,
        type: 'error',
      });
      // that falls out of the range of 2xx
      if (error.response.status == 401) {
        logout();
      } else {
        return 'error';
      }
    }
  });
}

export async function searchAnnouce (dept, title, status) {
  await this.header();
  return axios.get('/api/module0/search_annouce_management', {
    params: {
      TITLE: title,
      STATUS: status,
      DEPARTMENT: dept,
    },
  }).then(response => {
    // console.log(JSON.stringify(response.data.data));
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

export async function getannouncementById (data) {
  await this.header();
  return axios.get('/api/module0/announcement_by_id', {
    params: {
      MANAGE_EVENT_ID: data,
    },
  }).then(response => {
    return response.data;
  }).catch(function (error) {
    if (error.response) {
      if (error.response.status == 500) {
        if (error.response.data.message == 'Token expired.') {
          console.log('logout');
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {}
      return 'error';
    }
  });
}

// Delete Announcement Event
export async function deleteAnnouncement (data) {
  return axios.post('/api/module0/event_management_delete', { MANAGE_EVENT_ID: data }).then(response => {
    // console.log(response.data);
    Vue.$toast.open({
      message: response.data.message,
      type: 'success',
    });
    return response.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 401) {
        logout();
      } else {
        return 'error';
      }
    }
  });
}

export async function getReviewAnnouncement (title, status, dept) {
  await this.header();
  return axios.get('/api/module0/review_announcement', {
    params: {
      TITLE: title,
      STATUS: status,
      DEPARTMENT: dept,
    },
  }).then(response => {
    // console.log(JSON.stringify(response.data.data));
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

export async function reviewEventUpdate (data) {
  return axios.post('/api/module0/review_event_update', data).then(response => {
    // console.log(response.data);
    Vue.$toast.open({
      message: response.data.message,
      type: 'success',
    });
    return response.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      Vue.$toast.open({
        message: error.response.data.message,
        type: 'error',
      });
      // that falls out of the range of 2xx
      if (error.response.status == 401) {
        logout();
      } else {
        return 'error';
      }
    }
  });
}
export async function getUserLoginStatus (uid, utype) {
  // await this.header();
  return axios.get('/api/module0/get_fimm_login_status', {
    params: {
      USER_ID: uid,
      USER_TYPE: utype,
    },
  }).then(response => {
    if (response.data.data.ISLOGIN == 0) {
      localStorage.removeItem('user');
      localStorage.removeItem('realmName');
      localStorage.removeItem('recover-password');
      delete axios.defaults.headers.common['Authorization'];
      delete axios.defaults.headers.common['realmName'];
    }
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
export async function bankruptcyCheck (EntityType, EntityName, EntityId, MobileNo, EmailAddress, LastKnownAddress, Ref2) {
  await this.header();
  return axios.get('/api/module0/check', {
    // return axios.get('http://192.168.3.24/api/module0/check', {
    params: {
      EntityType: EntityType,
      EntityName: EntityName,
      EntityId: EntityId,
      MobileNo: MobileNo,
      EmailAddress: EmailAddress,
      LastKnownAddress: LastKnownAddress,
      Ref2: Ref2,
    },
  }).then(response => {
    Vue.$toast.open({
      message: response.data.message,
      type: 'success',
    });
    // console.log('Bankruptcy Check Response', response.data.data);
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

export async function bulkBankruptcyCheck (data) {
  await this.header();
  // return axios.get('/api/module0/check', {
  return axios.post('/api/module0/bulkBankruptcyCheck', data).then(response => {
    Vue.$toast.open({
      message: response.data.message,
      type: 'success',
    });
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

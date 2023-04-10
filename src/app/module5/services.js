//
import axios from 'axios'
import Vue from 'vue'

//* ******************* Authorization ********************/
export async function login(data) {
    delete axios.defaults.headers.common['Authorization'];

    return axios.post('/api/module5/login', data).then(response => {

        // localStorage.setItem('realmName', 'realm1');

        console.log(response.data.data);
        return response.data.data;
    }).catch(function(error) {
        // console.log(error)
        return error.response.data.message;
    });
}
// export function header () {
//   return axios.defaults.headers.common.Authorization =
//        'Bearer ' + getToken()
// }
export function header() {
    // const headers = {
    //   'realmName': 'realm1',
    //   'Authorization': 'Bearer ' + getToken()
    // }
    axios.defaults.headers.common.Authorization = 'Bearer ' + getToken();
    axios.defaults.headers.common.realmName = localStorage.getItem('realmName');

    axios.defaults.headers.common.UID = JSON.parse(localStorage.getItem('user')).user_id;
    axios.defaults.headers.common.GID = JSON.parse(localStorage.getItem('user')).USER_GROUP_ID;
    axios.defaults.headers.common.PANELTRACK = JSON.parse(localStorage.getItem('user')).PANEL_TRACK;
    // return headers;
}

export function getUser() {
    const user = localStorage.getItem('user');
    // this.$store.commit("change", user);
    // console.log("user store :" + this.$store.getters.userDetail);
    return user;
}

function getToken() {
    const user = localStorage.getItem('user')
    console.log('access token :' + JSON.parse(user).access_token);
    return JSON.parse(user).access_token;
}

export function isLoggedIn() {
    const user = localStorage.getItem('user');
    return user != null;
}

export function setUser(user) {
    localStorage.setItem('user', user);
}

export async function checkTokenValidation() {
    await this.header();
    return axios.get('/api/module5/checkTokenValidation').then(response => {
        console.log('response :' + JSON.stringify(response.data));
        return response.data;
    }).catch(function(error) {
        console.log('error response :' + JSON.stringify(error.response));
        if (error.response) {
            if (error.response.status == 500) {
                if (error.response.data.message.includes('Expired token')) {
                    // logout();
                } else {
                    console.log(error.response.data.message);
                }
            } else if (error.response.status == 401) {
                // logout();
            }
            return 'not valid';
        }
    })
}

export function logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('realmName');
}

export async function userDetail() {
    await this.header()
    return axios.get('/api/module5/user').then(response => {
        console.log('user detail :' + JSON.stringify(response.data));
        return response.data;
    }).catch(function(error) {
        if (error.response) {
            console.log('error response :' + error.response);
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 500) {
                // console.log(JSON.stringify(error.response.data.message));
                if (error.response.data.message.includes('Expired token')) {
                    services.logout();
                } else {
                    console.log(error.response.data.message)
                }
            } else if (error.response.status == 401) {
                services.logout();
            }
        }
    })
}
//* ***************end authorization**************************/


//* *************Start Others Self Registration*******************/
//**Self Register distributor**/
export async function selfRegister(data) {
    return axios.post('/api/module1/user', data).then(response => {
        console.log(response.data);
        return response.data;
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

export async function updateSelfReg(data) {
    return axios.post('/api/module5/user', data).then(response => {
        console.log(response.data);
        return response.data;
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

export async function verifyUser(data) {
    return axios.get('/api/module5/verify_user', {
        params: {
            username: data.username,
            USER_PASS_NUM: data.USER_PASS_NUM
        },
    }).then(response => {

        localStorage.setItem('realmName', 'realm0');

        console.log(response.data);
        return response.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 500) {
                // console.log(JSON.stringify(error.response.data.message));
                if (error.response.data.message == 'Token expired.') {
                    console.log('logout');
                    servicesModule1.logout();
                    return error.response.data.message;
                } else {
                    console.log(error.response.data.message);
                    return error.response.data.message;
                }
            } else if (error.response.status == 401) {
                servicesModule1.logout();
                return error.response.data.message;
            }
            return error.response;
        }
    });
}

export async function checkDuplicateIC(data) {
    return axios.get('/api/module5/user_check_ic', {
        params: {
            USER_NRIC: data,
        },
    }).then(response => {
        console.log(response.data);
        return response.data;
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

export async function checkDuplicateEmail(data) {
    return axios.get('/api/module5/user_check_email_others', {
        params: {
            USER_EMAIL: data,
        },
    }).then(response => {
        console.log(response.data);
        return response.data;
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

export async function checkDuplicateUserID(data) {
    return axios.get('/api/module5/user_check_userID', {
        params: {
            USER_USER_ID: data,
        },
    }).then(response => {
        console.log(response.data);
        return response.data;
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
export async function securityQuestion() {
    return axios.get('/api/module1/user_security_quest').then(response => {
        console.log(response.data.data);
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
//* *************End Others Self Registration ***************/

//* ***************Calendar Management ***********************/
export async function getAllExceptionList() {
    await this.header()
    return axios.get('/api/module0/calendar_settings').then(response => {
        console.log('exception list :' + JSON.stringify(response.data))
        return response.data
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 500) {
                // console.log(JSON.stringify(error.response.data.message));
                if (error.response.data.message.includes('Expired token')) {
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
//* **********************end calendar management************************/

//* *********************Document & Form Template ***********************/
//get document blob
export async function getDocumentById(data) {
    return axios.get('/api/module5/get_documentTP', {
        params: {
            TRP_COMP_ID: data,
        },
    }).then(response => {
        console.log("Document list : " + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 500) {
                // console.log(JSON.stringify(error.response.data.message));
                if (error.response.data.message == 'Token expired.') {
                    console.log('logout');
                    //logout();
                } else {
                    console.log(error.response.data.message);
                }
            } else if (error.response.status == 401) {
                //logout();
            }
            return 'error';
        }
    });
}


//delete doc

export async function deleteDocument(data) {
    return axios.delete('/api/module5/delete_document', {
            params: {
                CA_DOCUMENT_ID: data,
            },
        })
        .then(response => {
            console.log('data :' + JSON.stringify(response.data));
            return response.data;
        }).catch(function(error) {
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

export async function createExcelTemplate(data) {
    await this.header()
    return axios.post('/api/module0/template', data).then(response => {
        console.log(response.data)
        return response.data
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 500) {
                // console.log(JSON.stringify(error.response.data.message));
                if (error.response.data.message.includes('Expired token')) {
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

export async function getAllExcelTemplate() {
    await this.header()
    return axios.get('/api/module0/templates')
        .then(response => {
            console.log(response.statusText)
            console.log('list template: ' + response.data)
            return response.data
                // this.templateList = response.data;
        })
        .catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 500) {
                    // console.log(JSON.stringify(error.response.data.message));
                    if (error.response.data.message.includes('Expired token')) {
                        services.logout()
                    } else {
                        console.log(error.response.data.message)
                    }
                } else if (error.response.status == 401) {
                    services.logout()
                }
            }
        })
}

export async function downloadTemplate(data) {
    await this.header()
    return axios
        .get('/api/module0/template_file', {
            responseType: 'arraybuffer',
            params: {
                template_id: data,
            },
        })
        .then(response => {
            console.log('data :' + JSON.stringify(response))
            return response
        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 500) {
                    // console.log(JSON.stringify(error.response.data.message));
                    if (error.response.data.message.includes('Expired token')) {
                        services.logout()
                    } else {
                        console.log(error.response.data.message)
                    }
                } else if (error.response.status == 401) {
                    services.logout()
                }
            }
        })
}

export async function deleteTemplate(data) {
    return axios
        .delete('/api/module0/template_file', {
            data: { id: data },
        })
        .then(response => {
            console.log('data :' + JSON.stringify(response.data))
            return response.data
        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 500) {
                    // console.log(JSON.stringify(error.response.data.message));
                    if (error.response.data.message.includes('Expired token')) {
                        services.logout()
                    } else {
                        console.log(error.response.data.message)
                    }
                } else if (error.response.status == 401) {
                    services.logout()
                }
            }
        })
}
export async function getUserSalutation() {
    return axios.get('/api/module5/salutationAll').then(response => {
        console.log(JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 500) {
                // console.log(JSON.stringify(error.response.data.message));
                if (error.response.data.message == 'Token expired.') {
                    console.log('logout');
                    //logout();
                } else {
                    console.log(error.response.data.message);
                }
            } else if (error.response.status == 401) {
                //logout();
            }
            return 'error';
        }
    });
}

//* *****************module*******************/
export async function getAllModule() {
    await this.header()
    return axios.get('/api/module0/modules').then(response => {
        console.log('list : ' + JSON.stringify(response.data))
        return response.data
    });
}

// Third Party Approval

export async function updateApprovalThirdPartyFiMM(data) {
  return axios.post('/api/module5/updateApprovalThirdPartyFiMM', data).then(response => {
      console.log(response.data);
      return response.data;
  }).catch(function(error) {
      if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          if (error.response.status == 500) {
              // console.log(JSON.stringify(error.response.data.message));
              if (error.response.data.message.includes('Expired token')) {
                  console.log('logout');
                  logout();
              } else {
                  console.log(error.response.data.message)
              }
          } else if (error.response.status == 401) {
              logout();
          }
          return 'error';
      }
  });
}


export async function getApprovalRemarkThirdParty(data) {
  return axios.get('/api/module5/getApprovalRemarkThirdParty', {
      params: {
          TP_APPR_ID: data,
      },
  }).then(response => {
      console.log(response.data);
      return response.data.data;
  }).catch(function(error) {
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
export async function getThirdPartyDetail(data) {
    return axios.get('/api/module5/getThirdPartyDetail', {
        params: {
            TP_COMP_ID: data,
        },
    }).then(response => {
        console.log(response.data);
        return response.data.data;
    }).catch(function(error) {
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

// TRP APPROVAL --

export async function getApprovalRemarkTRP(data) {
    return axios.get('/api/module5/getApprovalRemarkTRP', {
        params: {
            TP_USER_COMP_ID: data,
        },
    }).then(response => {
        console.log(response.data);
        return response.data.data;
    }).catch(function(error) {
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

export async function updateApprovalTRPFiMM(data) {
    return axios.post('/api/module5/updateApprovalTRPFiMM', data).then(response => {
        console.log(response.data);
        Vue.$toast.open({
          message: response.data.message,
          type: 'success',
        })
        return response.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 500) {
                // console.log(JSON.stringify(error.response.data.message));
                if (error.response.data.message.includes('Expired token')) {
                    console.log('logout');
                    logout();
                } else {
                    console.log(error.response.data.message)
                }
            } else if (error.response.status == 401) {
                logout();
            }
            return 'error';
        }
    });
}

//* *****************Without Middleware*******************/
export async function getNAVlistMedia() {
    return axios.get('/api/module5/navlistMedia').then(response => {
        console.log('data : ' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 500) {
                // console.log(JSON.stringify(error.response.data.message));
                if (error.response.data.message.includes('Expired token')) {
                    services.logout()
                } else {
                    console.log(error.response.data.message)
                }
            } else if (error.response.status == 401) {
                services.logout()
            }
        }
    });
}

export async function getAllPostcodeList() {
    return axios.get('/api/module5/get_postcode').then(response => {
        console.log('postcode list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 500) {
                // console.log(JSON.stringify(error.response.data.message));
                if (error.response.data.message == 'Token expired.') {
                    services.logout()
                } else {
                    console.log(error.response.data.message);
                }
            } else if (error.response.status == 401) {
                services.logout()
            }
        }
    });
}

export async function getAllCityList() {
    return axios.get('/api/module5/get_city').then(response => {
        console.log('postcode list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 500) {
                // console.log(JSON.stringify(error.response.data.message));
                if (error.response.data.message == 'Token expired.') {
                    services.logout()
                } else {
                    console.log(error.response.data.message);
                }
            } else if (error.response.status == 401) {
                services.logout()
            }
        }
    });
}

export async function getAllStateList(data) {
    return axios.get('/api/module5/get_state', {params: data,}).then(response => {
        console.log('postcode list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 500) {
                // console.log(JSON.stringify(error.response.data.message));
                if (error.response.data.message == 'Token expired.') {
                    services.logout()
                } else {
                    console.log(error.response.data.message);
                }
            } else if (error.response.status == 401) {
                services.logout()
            }
        }
    });
}

export async function getAllCountryList() {
    return axios.get('/api/module5/get_country').then(response => {
        console.log('postcode list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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
export async function updatePassword(data) {
    return axios.post('/api/module5/others_reg_update', data).then(response => {
        console.log(response.data);
        return response.data;
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

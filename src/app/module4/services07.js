import axios from "axios";
import Vue from "vue";
import * as servicesModule1 from "../module1/services";
import $ from "jquery";



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
    return axios.get('/api/module4/checkTokenValidation').then(response => {
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

/**
 * MODULE
 * */
export async function getModules(USER_ID = null, MODULE_TYPE = 1, CATEGORY=2,FP_CATEGORY = null,) {
    await this.header();
    return axios
        .get("/api/module4/modules", {
            params: {
                CREATE_BY: USER_ID,
                MODULE_TYPE: MODULE_TYPE,
                FP_CATEGORY: FP_CATEGORY,
                CATEGORY:CATEGORY
            }
        })
        .then(response => {
            // console.log('data :' + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error"
                });
                if (error.response.status == 401) {
                    servicesModule1.logout();
                } else {
                    return "error";
                }
            }
        });
}

export async function getModule(moduleId) {
    await this.header();
    return axios
        .get(`/api/module4/modules/${moduleId}`)
        .then(response => {
            // console.log('data :' + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error"
                });
                if (error.response.status == 401) {
                    servicesModule1.logout();
                } else {
                    return "error";
                }
            }
        });
}

export async function getModuleByDistributor(moduleType) {
    await this.header();
    return axios
        .get(`/api/module4/modules/${moduleType}/distributor`)
        .then(response => {
            // console.log('data :' + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error"
                });
                if (error.response.status == 401) {
                    servicesModule1.logout();
                } else {
                    return "error";
                }
            }
        });
}


export async function getModuleByTRPReading() {
  await this.header();
  return axios
    .get('/api/module4/getModuleByTRPReading')
    .then(response => {
      // console.log('data :' + JSON.stringify(response.data.data));
      return response.data.data;
    })
    .catch(function(error) {
      if (error.response) {
        Vue.$toast.open({
          message: error.response.data.message,
          type: "error"
        });
        if (error.response.status == 401) {
          servicesModule1.logout();
        } else {
          return "error";
        }
      }
    });
}

/**
 * MODULE APPROVAL
 */
export async function getModuleApprovalTotalPending(moduleType = 1,category=null) {
    await this.header();
    return axios
        .get(`/api/module4/module_approval/get-total-pending/${moduleType}`,{
          params:{
            CATEGORY:category
          }
        })
        .then(response => {
            // console.log('data :' + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error"
                });
                if (error.response.status == 401) {
                    servicesModule1.logout();
                } else {
                    return "error";
                }
            }
        });
}

export async function getModuleApprovalTotalPendingApproval(moduleType = 1) {
  await this.header();
  return axios
    .get(`/api/module4/module_approval/get-total-pending-approval/${moduleType}`)
    .then(response => {
      // console.log('data :' + JSON.stringify(response.data.data));
      return response.data.data;
    })
    .catch(function(error) {
      if (error.response) {
        Vue.$toast.open({
          message: error.response.data.message,
          type: "error"
        });
        if (error.response.status == 401) {
          servicesModule1.logout();
        } else {
          return "error";
        }
      }
    });
}
export async function getModuleApprovalPendingApprovalFReading(moduleType = 2) {
  await this.header();
  return axios
    .get(`/api/module4/module_approval/get-pending-approval-ftrp-reading/${moduleType}`)
    .then(response => {
      return response.data.data;
    })
    .catch(function(error) {
      if (error.response) {
        Vue.$toast.open({
          message: error.response.data.message,
          type: "error"
        });
        if (error.response.status == 401) {
          servicesModule1.logout();
        } else {
          return "error";
        }
      }
    });
}

export async function getModuleApprovalByCompanyNModuleType(companyId, moduleType, FP_CATEGORY = null) {
    await this.header();
    return axios
        .get(`/api/module4/module_approval/${companyId}/${moduleType}`, {
            params: {
                FP_CATEGORY: FP_CATEGORY
            }
        })
        .then(response => {
            // console.log('data :' + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error"
                });
                if (error.response.status == 401) {
                    servicesModule1.logout();
                } else {
                    return "error";
                }
            }
        });
}
export async function getModuleApprovaledByCompanyNModuleType(companyId, moduleType, FP_CATEGORY = null) {
    await this.header();
    return axios
        .get(`/api/module4/module_approval/approved/${companyId}/${moduleType}`, {
            params: {
                FP_CATEGORY: FP_CATEGORY
            }
        })
        .then(response => {
            // console.log('data :' + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error"
                });
                if (error.response.status == 401) {
                    servicesModule1.logout();
                } else {
                    return "error";
                }
            }
        });
}
export async function getModuleApprovalByTRPReading(companyId) {
    await this.header();
    return axios
        .get(`/api/module4/module_approval/TRPReadingApproval/${companyId}`)
        .then(response => {
            // console.log('data :' + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error"
                });
                if (error.response.status == 401) {
                    servicesModule1.logout();
                } else {
                    return "error";
                }
            }
        });
}

export async function moduleApproval(data) {
    await this.header();
    return axios
        .post(`/api/module4/module-approval/approval`, data)
        .then(response => {
            // console.log('data :' + JSON.stringify(response.data.data));
            Vue.$toast.open({
                message: response.data.message,
                type: 'success',
            })
            return response.data;
        })
        .catch(function(error) {
            if (error.response) {
                if (error.response.status == 422) {
                    let text = "";
                    if (error.response.data.errors) {
                        let errors = error.response.data.errors;

                        $.each(errors, function(key, value) {
                            text += value + "<br/>";
                        });
                    }
                    Vue.$toast.open({
                        message: text,
                        type: "error"
                    });
                } else {
                    Vue.$toast.open({
                        message: error.response.data.message,
                        type: "error"
                    });
                }
                if (error.response.status == 401) {
                    servicesModule1.logout();
                } else {
                    return "error";
                }
            }
        });
}

export async function moduleApprovalReturn(data) {
    await this.header();
    return axios
        .post(`/api/module4/module-approval/return-submission`, data)
        .then(response => {
            // console.log('data :' + JSON.stringify(response.data.data));
            Vue.$toast.open({
                message: response.data.message,
                type: 'success',
            })
            return response.data;
        })
        .catch(function(error) {
            if (error.response) {
                if (error.response.status == 422) {
                    let text = "";
                    if (error.response.data.errors) {
                        let errors = error.response.data.errors;

                        $.each(errors, function(key, value) {
                            text += value + "<br/>";
                        });
                    }
                    Vue.$toast.open({
                        message: text,
                        type: "error"
                    });
                } else {
                    Vue.$toast.open({
                        message: error.response.data.message,
                        type: "error"
                    });
                }
                if (error.response.status == 401) {
                    servicesModule1.logout();
                } else {
                    return "error";
                }
            }
        });
}

/**
 * WRITING MODULE
 */
export async function writingSubmit(data) {
    await this.header();
    return axios
        .post(`/api/module4/writing_modules/submit`, data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        .then(response => {
            Vue.$toast.open({
                message: response.data.message,
                type: "success"
            });
            return response.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error"
                });
                if (error.response.status == 401) {
                    servicesModule1.logout();
                } else {
                    return error.response;
                }
            }
        });
}

export async function writingDownloadRejectedList(id) {
    await this.header();
    return axios
        .get(`/api/module4/writing_modules/${id}/participant-rejected`, {
            responseType: "blob"
        })
        .then(response => {
            var fileURL = window.URL.createObjectURL(new Blob([response.data]));
            var fileLink = document.createElement("a");

            fileLink.href = fileURL;
            fileLink.setAttribute("download", "rejected_users.xlsx");
            document.body.appendChild(fileLink);

            fileLink.click();
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error"
                });
                if (error.response.status == 401) {
                    servicesModule1.logout();
                } else {
                    return "error";
                }
            }
        });
}

export async function removeWritingParticipant(data) {
    await this.header();
    return axios
        .delete(`/api/module4/writing_modules/${data}/participant`, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        .then(response => {
            Vue.$toast.open({
                message: response.data.message,
                type: "success"
            });
            return response.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error"
                });
                if (error.response.status == 401) {
                    servicesModule1.logout();
                } else {
                    return "error";
                }
            }
        });
}

export async function getWritingParticipantList(moduleId) {
    await this.header();
    return axios
        .get(`/api/module4/writing_modules/${moduleId}/participant`)
        .then(response => {
            return response.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error"
                });
                if (error.response.status == 401) {
                    servicesModule1.logout();
                } else {
                    return "error";
                }
            }
        });
}

export async function addWritingParticipant(data) {
    await this.header();
    return axios
        .post(`/api/module4/writing_modules/add-participant`, data)
        .then(response => {
            // console.log('data :' + JSON.stringify(response.data));

            Vue.$toast.open({
                message: "Successfully add new participant.",
                type: "success"
            });
            return response.data;
        })
        .catch(function(error) {
            if (error.response) {
                if (error.response.status == 422) {
                    let text = "";
                    if (error.response.data.errors) {
                        let errors = error.response.data.errors;

                        $.each(errors, function(key, value) {
                            text += value + "<br/>";
                        });
                    }
                    Vue.$toast.open({
                        message: text,
                        type: "error"
                    });
                } else {
                    Vue.$toast.open({
                        message: error.response.data.message,
                        type: "error"
                    });
                }
                if (error.response.status == 401) {
                    servicesModule1.logout();
                } else {
                    return error.response;
                }
            }
        });
}

export async function deleteWritingDocument(id) {
    await this.header();
    return axios.delete(`/api/module4/writing_modules/document/${id}`)
        .then(response => {
            Vue.$toast.open({
                message: 'Document deleted.',
                type: 'success',
            })
            return response.data;
        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 500) {
                    // console.log(JSON.stringify(error.response.data.message));
                    if (error.response.data.message == 'Token expired.') {
                        servicesModule1.logout();
                    } else {
                        console.log(error.response.data.message);
                    }
                }
            }
        });
}

export async function uploadWritingDocument(data) {
    let config = {
        header: {
            'Content-Type': 'multipart/form-data'
        }
    }
    await this.header()
    return axios.post('/api/module4/writing_modules/document', data, config)
        .then(response => {
            Vue.$toast.open({
                message: 'Successfully support document uploaded.',
                type: 'success',
            })
        }).catch(function(error) {
            if (error.response) {
                // Vue.$toast.open({
                //   message: error.response.data.message,
                //   type: 'error',
                // })
                if (error.response.status == 401) {
                    logout()
                } else {
                    return 'error'
                }
            }
        })
}

/**
 * READING MODULE
 */
export async function getReadingParticipantList(moduleId) {
    await this.header();
    return axios
        .get(`/api/module4/reading_module/${moduleId}/participant`)
        .then(response => {
            return response.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error"
                });
                if (error.response.status == 401) {
                    servicesModule1.logout();
                } else {
                    return "error";
                }
            }
        });
}

export async function addReadingParticipant(data) {
    await this.header();
    return axios
        .post(`/api/module4/reading_module/add-participant`, data)
        .then(response => {
            // console.log('data :' + JSON.stringify(response.data));

            Vue.$toast.open({
                message: "Successfully add new participant.",
                type: "success"
            });
            return response.data;
        })
        .catch(function(error) {
            if (error.response) {
                if (error.response.status == 422) {
                    let text = "";
                    if (error.response.data.errors) {
                        let errors = error.response.data.errors;

                        $.each(errors, function(key, value) {
                            text += value + "<br/>";
                        });
                    }
                    Vue.$toast.open({
                        message: text,
                        type: "error"
                    });
                } else {
                    Vue.$toast.open({
                        message: error.response.data.message,
                        type: "error"
                    });
                }
                if (error.response.status == 401) {
                    servicesModule1.logout();
                } else {
                    return error.response;
                }
            }
        });
}

export async function removeReadingParticipant(data) {
    await this.header();
    return axios
        .delete(`/api/module4/reading_module/${data}/participant`, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        .then(response => {
            Vue.$toast.open({
                message: response.data.message,
                type: "success"
            });
            return response.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error"
                });
                if (error.response.status == 401) {
                    servicesModule1.logout();
                } else {
                    return "error";
                }
            }
        });
}

export async function readingSubmit(data) {
    await this.header();
    return axios
        .post(`/api/module4/reading_module/submit`, data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        .then(response => {
            Vue.$toast.open({
                message: response.data.message,
                type: "success"
            });
            return response.data;
        })
        .catch(function(error) {
            if (error.response) {
              Vue.$toast.open({
                message: error.response.data.message,
                type: "error"
              });
              if (error.response.status == 401) {
                servicesModule1.logout();
              } else {
                return error.response;
              }
            }
            // if (error.response) {
            //     if (error.response.status == 422) {
            //         let text = "";
            //         if (error.response.data.errors) {
            //             let errors = error.response.data.errors;
            //
            //             $.each(errors, function(key, value) {
            //                 text += value + "<br/>";
            //             });
            //         }
            //         Vue.$toast.open({
            //             message: text,
            //             type: "error"
            //         });
            //     } else {
            //         Vue.$toast.open({
            //             message: error.response.data.message,
            //             type: "error"
            //         });
            //         if (error.response.status == 401) {
            //             servicesModule1.logout();
            //         }
            //         return error.response;
            //     }
            // }
        });
}

export async function readingDownloadRejectedList(id) {
    await this.header();
    return axios
        .get(`/api/module4/reading_module/${id}/participant-rejected`, {
            responseType: "blob"
        })
        .then(response => {
            var fileURL = window.URL.createObjectURL(new Blob([response.data]));
            var fileLink = document.createElement("a");

            fileLink.href = fileURL;
            fileLink.setAttribute("download", "rejected_users.xlsx");
            document.body.appendChild(fileLink);

            fileLink.click();
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error"
                });
                if (error.response.status == 401) {
                    servicesModule1.logout();
                } else {
                    return "error";
                }
            }
        });
}

export async function deleteReadingDocument(id) {
    await this.header();
    return axios.delete(`/api/module4/reading_module/document/${id}`)
        .then(response => {
            Vue.$toast.open({
                message: 'Document deleted.',
                type: 'success',
            })
            return response.data;
        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 500) {
                    // console.log(JSON.stringify(error.response.data.message));
                    if (error.response.data.message == 'Token expired.') {
                        servicesModule1.logout();
                    } else {
                        console.log(error.response.data.message);
                    }
                }
            }
        });
}

export async function uploadReadingDocument(data) {
    let config = {
        header: {
            'Content-Type': 'multipart/form-data'
        }
    }
    await this.header()
    return axios.post('/api/module4/reading_module/document', data, config)
        .then(response => {
            Vue.$toast.open({
                message: 'Successfully support document uploaded.',
                type: 'success',
            })
        }).catch(function(error) {
            if (error.response) {
                // Vue.$toast.open({
                //   message: error.response.data.message,
                //   type: 'error',
                // })
                if (error.response.status == 401) {
                    logout()
                } else {
                    return 'error'
                }
            }
        })
}

export async function getOneReadingDocument(moduleId) {
    await this.header();
    return axios
        .get(`/api/module4/reading_module/document/${moduleId}`)
        .then(response => {
            return response.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error"
                });
                if (error.response.status == 401) {
                    servicesModule1.logout();
                } else {
                    return "error";
                }
            }
        });
}
export async function getOneTeachingDocument(moduleId) {
    await this.header();
    return axios
        .get(`/api/module4/teaching_module/document/${moduleId}`)
        .then(response => {
            return response.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error"
                });
                if (error.response.status == 401) {
                    servicesModule1.logout();
                } else {
                    return "error";
                }
            }
        });
}

/**
 * TEACHING MODULE
 */
export async function teachingSubmit(data) {
    await this.header();
    return axios
        .post(`/api/module4/teaching_module/submit`, data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        .then(response => {
            Vue.$toast.open({
                message: response.data.message,
                type: "success"
            });
            return response.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error"
                });
                if (error.response.status == 401) {
                    servicesModule1.logout();
                } else {
                    return error.response;
                }
            }
        });
}

export async function teachingDownloadRejectedList(id) {
    await this.header();
    return axios
        .get(`/api/module4/teaching_module/${id}/participant-rejected`, {
            responseType: "blob"
        })
        .then(response => {
            var fileURL = window.URL.createObjectURL(new Blob([response.data]));
            var fileLink = document.createElement("a");

            fileLink.href = fileURL;
            fileLink.setAttribute("download", "rejected_users.xlsx");
            document.body.appendChild(fileLink);

            fileLink.click();
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error"
                });
                if (error.response.status == 401) {
                    servicesModule1.logout();
                } else {
                    return "error";
                }
            }
        });
}

export async function removeTeachingParticipant(data) {
    await this.header();
    return axios
        .delete(`/api/module4/teaching_module/${data}/participant`, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        .then(response => {
            Vue.$toast.open({
                message: response.data.message,
                type: "success"
            });
            return response.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error"
                });
                if (error.response.status == 401) {
                    servicesModule1.logout();
                } else {
                    return "error";
                }
            }
        });
}

export async function getTeachingParticipantList(moduleId) {
    await this.header();
    return axios
        .get(`/api/module4/teaching_module/${moduleId}/participant`)
        .then(response => {
            return response.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error"
                });
                if (error.response.status == 401) {
                    servicesModule1.logout();
                } else {
                    return "error";
                }
            }
        });
}

export async function addTeachingParticipant(data) {
    await this.header();
    return axios
        .post(`/api/module4/teaching_module/add-participant`, data)
        .then(response => {
            // console.log('data :' + JSON.stringify(response.data));

            Vue.$toast.open({
                message: "Successfully add new participant.",
                type: "success"
            });
            return response.data;
        })
        .catch(function(error) {
            if (error.response) {
                if (error.response.status == 422) {
                    let text = "";
                    if (error.response.data.errors) {
                        let errors = error.response.data.errors;

                        $.each(errors, function(key, value) {
                            text += value + "<br/>";
                        });
                    }
                    Vue.$toast.open({
                        message: text,
                        type: "error"
                    });
                } else {
                    Vue.$toast.open({
                        message: error.response.data.message,
                        type: "error"
                    });
                }
                if (error.response.status == 401) {
                    servicesModule1.logout();
                } else {
                    return error.response;
                }
            }
        });
}

export async function deleteTeachingDocument(id) {
    await this.header();
    return axios.delete(`/api/module4/teaching_module/document/${id}`)
        .then(response => {
            Vue.$toast.open({
                message: 'Document deleted.',
                type: 'success',
            })
            return response.data;
        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 500) {
                    // console.log(JSON.stringify(error.response.data.message));
                    if (error.response.data.message == 'Token expired.') {
                        servicesModule1.logout();
                    } else {
                        console.log(error.response.data.message);
                    }
                }
            }
        });
}

export async function uploadTeachingDocument(data) {
    let config = {
        header: {
            'Content-Type': 'multipart/form-data'
        }
    }
    await this.header()
    return axios.post('/api/module4/teaching_module/document', data, config)
        .then(response => {
            Vue.$toast.open({
                message: 'Successfully support document uploaded.',
                type: 'success',
            })
        }).catch(function(error) {
            if (error.response) {
                // Vue.$toast.open({
                //   message: error.response.data.message,
                //   type: 'error',
                // })
                if (error.response.status == 401) {
                    logout()
                } else {
                    return 'error'
                }
            }
        })
}

/**
 * ACADEMIC MODULE
 */
export async function academicSubmit(data) {
    await this.header();
    return axios
        .post(`/api/module4/qualification_module/submit`, data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        .then(response => {
            Vue.$toast.open({
                message: response.data.message,
                type: "success"
            });
            return response.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error"
                });
                if (error.response.status == 401) {
                    servicesModule1.logout();
                } else {
                    return error.response;
                }
            }
        });
}

export async function academicDownloadRejectedList(id) {
    await this.header();
    return axios
        .get(`/api/module4/qualification_module/${id}/participant-rejected`, {
            responseType: "blob"
        })
        .then(response => {
            var fileURL = window.URL.createObjectURL(new Blob([response.data]));
            var fileLink = document.createElement("a");

            fileLink.href = fileURL;
            fileLink.setAttribute("download", "rejected_users.xlsx");
            document.body.appendChild(fileLink);

            fileLink.click();
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error"
                });
                if (error.response.status == 401) {
                    servicesModule1.logout();
                } else {
                    return "error";
                }
            }
        });
}

export async function removeAcademicParticipant(data) {
    await this.header();
    return axios
        .delete(`/api/module4/qualification_module/${data}/participant`, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        .then(response => {
            Vue.$toast.open({
                message: response.data.message,
                type: "success"
            });
            return response.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error"
                });
                if (error.response.status == 401) {
                    servicesModule1.logout();
                } else {
                    return "error";
                }
            }
        });
}

export async function getAcademicParticipantList(moduleId) {
    await this.header();
    return axios
        .get(`/api/module4/qualification_module/${moduleId}/participant`)
        .then(response => {
            return response.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error"
                });
                if (error.response.status == 401) {
                    servicesModule1.logout();
                } else {
                    return "error";
                }
            }
        });
}

export async function addAcademicParticipant(data) {
    await this.header();
    return axios
        .post(`/api/module4/qualification_module/add-participant`, data)
        .then(response => {
            // console.log('data :' + JSON.stringify(response.data));

            Vue.$toast.open({
                message: "Successfully add new participant.",
                type: "success"
            });
            return response.data;
        })
        .catch(function(error) {
            if (error.response) {
                if (error.response.status == 422) {
                    let text = "";
                    if (error.response.data.errors) {
                        let errors = error.response.data.errors;

                        $.each(errors, function(key, value) {
                            text += value + "<br/>";
                        });
                    }
                    Vue.$toast.open({
                        message: text,
                        type: "error"
                    });
                } else {
                    Vue.$toast.open({
                        message: error.response.data.message,
                        type: "error"
                    });
                }
                if (error.response.status == 401) {
                    servicesModule1.logout();
                } else {
                    return error.response;
                }
            }
        });
}

export async function deleteAcademicDocument(id) {
    await this.header();
    return axios.delete(`/api/module4/qualification_module/document/${id}`)
        .then(response => {
            Vue.$toast.open({
                message: 'Document deleted.',
                type: 'success',
            })
            return response.data;
        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 500) {
                    // console.log(JSON.stringify(error.response.data.message));
                    if (error.response.data.message == 'Token expired.') {
                        servicesModule1.logout();
                    } else {
                        console.log(error.response.data.message);
                    }
                }
            }
        });
}

export async function uploadAcademicDocument(data) {
    let config = {
        header: {
            'Content-Type': 'multipart/form-data'
        }
    }
    await this.header()
    return axios.post('/api/module4/qualification_module/document', data, config)
        .then(response => {
            Vue.$toast.open({
                message: 'Successfully support document uploaded.',
                type: 'success',
            })
        }).catch(function(error) {
            if (error.response) {
                // Vue.$toast.open({
                //   message: error.response.data.message,
                //   type: 'error',
                // })
                if (error.response.status == 401) {
                    logout()
                } else {
                    return 'error'
                }
            }
        })
}

/**
 * FINANCIAL PLANNER MODULE
 */
export async function fpSubmit(data) {
    await this.header();
    return axios
        .post(`/api/module4/fp_module/submit`, data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        .then(response => {
            Vue.$toast.open({
                message: response.data.message,
                type: "success"
            });
            return response.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error"
                });
                if (error.response.status == 401) {
                    servicesModule1.logout();
                } else {
                    return error.response;
                }
            }
        });
}

export async function fpDownloadRejectedList(id) {
    await this.header();
    return axios
        .get(`/api/module4/fp_module/${id}/participant-rejected`, {
            responseType: "blob"
        })
        .then(response => {
            var fileURL = window.URL.createObjectURL(new Blob([response.data]));
            var fileLink = document.createElement("a");

            fileLink.href = fileURL;
            fileLink.setAttribute("download", "rejected_users.xlsx");
            document.body.appendChild(fileLink);

            fileLink.click();
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error"
                });
                if (error.response.status == 401) {
                    servicesModule1.logout();
                } else {
                    return "error";
                }
            }
        });
}

export async function removeFPParticipant(data) {
    await this.header();
    return axios
        .delete(`/api/module4/fp_module/${data}/participant`, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        .then(response => {
            Vue.$toast.open({
                message: response.data.message,
                type: "success"
            });
            return response.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error"
                });
                if (error.response.status == 401) {
                    servicesModule1.logout();
                } else {
                    return "error";
                }
            }
        });
}

export async function getFPParticipantList(moduleId) {
    await this.header();
    return axios
        .get(`/api/module4/fp_module/${moduleId}/participant`)
        .then(response => {
            return response.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error"
                });
                if (error.response.status == 401) {
                    servicesModule1.logout();
                } else {
                    return "error";
                }
            }
        });
}

export async function addFPParticipant(data) {
    await this.header();
    return axios
        .post(`/api/module4/fp_module/add-participant`, data)
        .then(response => {
            // console.log('data :' + JSON.stringify(response.data));

            Vue.$toast.open({
                message: "Successfully add new participant.",
                type: "success"
            });
            return response.data;
        })
        .catch(function(error) {
            if (error.response) {
                if (error.response.status == 422) {
                    let text = "";
                    if (error.response.data.errors) {
                        let errors = error.response.data.errors;

                        $.each(errors, function(key, value) {
                            text += value + "<br/>";
                        });
                    }
                    Vue.$toast.open({
                        message: text,
                        type: "error"
                    });
                } else {
                    Vue.$toast.open({
                        message: error.response.data.message,
                        type: "error"
                    });
                }
                if (error.response.status == 401) {
                    servicesModule1.logout();
                } else {
                    return error.response;
                }
            }
        });
}

export async function countAppealPendingFpCategory(categoryId,companyId) {
    await this.header();
    return axios
        .get(`/api/module4/fp_module/appeal/${categoryId}/${companyId}/category`)
        .then(response => {
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error"
                });
                if (error.response.status == 401) {
                    servicesModule1.logout();
                } else {
                    return "error";
                }
            }
        });
}
export async function getAppealPendingFpCategory(categoryId,companyId) {
  await this.header();
  return axios
    .get(`/api/module4/fp_module/get_appeal/${categoryId}/${companyId}/category`)
    .then(response => {
      return response.data.data;
    })
    .catch(function(error) {
      if (error.response) {
        Vue.$toast.open({
          message: error.response.data.message,
          type: "error"
        });
        if (error.response.status == 401) {
          servicesModule1.logout();
        } else {
          return "error";
        }
      }
    });
}

export async function countApprovalFpCategory(categoryId,companyId) {
    await this.header();
    return axios
        .get(`/api/module4/fp_module/approval/${categoryId}/${companyId}/category`)
        .then(response => {
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error"
                });
                if (error.response.status == 401) {
                    servicesModule1.logout();
                } else {
                    return "error";
                }
            }
        });
}
export async function countPendingFpCategory(categoryId,companyId) {
    await this.header();
    return axios
        .get(`/api/module4/fp_module/${categoryId}/${companyId}/category`)
        .then(response => {
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error"
                });
                if (error.response.status == 401) {
                    servicesModule1.logout();
                } else {
                    return "error";
                }
            }
        });
}

export async function deleteFpDocument(id) {
    await this.header();
    return axios.delete(`/api/module4/fp_module/document/${id}`)
        .then(response => {
            Vue.$toast.open({
                message: 'Document deleted.',
                type: 'success',
            })
            return response.data;
        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 500) {
                    // console.log(JSON.stringify(error.response.data.message));
                    if (error.response.data.message == 'Token expired.') {
                        servicesModule1.logout();
                    } else {
                        console.log(error.response.data.message);
                    }
                }
            }
        });
}

export async function uploadFpDocument(data) {
    let config = {
        header: {
            'Content-Type': 'multipart/form-data'
        }
    }
    await this.header()
    return axios.post('/api/module4/fp_module/document', data, config)
        .then(response => {
            Vue.$toast.open({
                message: 'Successfully support document uploaded.',
                type: 'success',
            })
        }).catch(function(error) {
            if (error.response) {
                // Vue.$toast.open({
                //   message: error.response.data.message,
                //   type: 'error',
                // })
                if (error.response.status == 401) {
                    logout()
                } else {
                    return 'error'
                }
            }
        })
}

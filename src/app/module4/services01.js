// Nurul - post & pre

import axios from 'axios';
import Vue from 'vue'
import * as servicesModule0 from '../module0/services';

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

export async function getCompanyId(data) {
    await this.header();
    return axios.get("/api/module4/company_record", {
        params: {
            USER_ID: data,
        },
    }).then(response => {
        console.log('data :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {

            // Vue.$toast.open({
            //   message: error.response.data.message,
            //   type: 'error',
            // });
            if (error.response.status == 401) {
                logout();
            } else {
                return 'error'
            }
        }
    });
}

export async function getProgramById(data, category, type) {
    await this.header();
    return axios.get("/api/module4/program_record", {
        params: {
            COMPANY_ID: data,
            CATEGORY: category,
            PROG_TYPE: type,
        },
    }).then(response => {
        console.log('data :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {

            // Vue.$toast.open({
            //   message: error.response.data.message,
            //   type: 'error',
            // });
            if (error.response.status == 401) {
                logout();
            } else {
                return 'error'
            }
        }
    });
}

export async function filterRecordList(data) {
    await this.header();
    return axios.get('/api/module4/filter_record', { params: data }).then(response => {
        console.log('data :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // Vue.$toast.open({
            //   message: error.response.data.message,
            //   type: 'error',
            // });
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

//cpd Details
export async function getEventByProgramId(data) {
    await this.header();
    return axios.get("/api/module4/program_details_record", {
        params: {
            PROGRAM_ID: data,
        },
    }).then(response => {
        console.log('data :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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

// get details writing program by distributor
export async function getModuleByDistId(data, category, type) {
    await this.header();
    return axios.get("/api/module4/writing_modules/appeal_module_DetailsByDist", {
        params: {
            COMPANY_ID: data,
            CATEGORY: category,
            MODULE_TYPE: type,
        },
    }).then(response => {
        console.log('data :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {

            // Vue.$toast.open({
            //   message: error.response.data.message,
            //   type: 'error',
            // });
            if (error.response.status == 401) {
                logout();
            } else {
                return 'error'
            }
        }
    });
}

export async function getReadingModuleByDistId(data, category, type) {
    await this.header();
    return axios.get("/api/module4/reading_module/appeal_reading_module_DetailsByDist", {
        params: {
            COMPANY_ID: data,
            CATEGORY: category,
            MODULE_TYPE: type,
        },
    }).then(response => {
        console.log('data :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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

export async function getTeachingModuleByDistId(data, category, type) {
  await this.header();
  return axios.get("/api/module4/teaching_module/appeal_teaching_module_DetailsByDist", {
    params: {
      COMPANY_ID: data,
      CATEGORY: category,
      MODULE_TYPE: type,
    },
  }).then(response => {
    console.log('data :' + JSON.stringify(response.data.data));
    return response.data.data;
  }).catch(function(error) {
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


export async function getAcademicModuleByDistId(data, category, type) {
  await this.header();
  return axios.get("/api/module4/qualification_module/appeal_qualification_module_DetailsByDist", {
    params: {
      COMPANY_ID: data,
      CATEGORY: category,
      MODULE_TYPE: type,
    },
  }).then(response => {
    console.log('data :' + JSON.stringify(response.data.data));
    return response.data.data;
  }).catch(function(error) {
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

//get all program_details record by dist
export async function getAllProgramByDistId(data, category, type) {
    await this.header();
    return axios.get("/api/module4/program_AllProgramByDist", {
        params: {
            COMPANY_ID: data,
            CATEGORY: category,
            PROG_TYPE: type,
        },
    }).then(response => {
        console.log('data :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            if (error.response.status == 401) {
                logout();
            } else {
                return 'error'
            }
        }
    });
}
//get all writing program_details record by dist
export async function reviewForPendingApproval(data, category, type) {
    await this.header();
    return axios.get("/api/module4/review_for_pending_approval", {
        params: {
            COMPANY_ID: data,
            CATEGORY: category,
            MODULE_TYPE: type,
        },
    }).then(response => {
        console.log('data :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            if (error.response.status == 401) {
                logout();
            } else {
                return 'error'
            }
        }
    });
}

export async function getDocumentByModuleId(data) {
    await this.header();
    return axios.get("/api/module4/writing_modules/writing_document", {
        params: {
            MODULE_ID: data,
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

export async function getAcademicDocumentByModuleId(data) {
  await this.header();
  return axios.get("/api/module4/qualification_module/qualification_document", {
    params: {
      MODULE_ID: data,
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


export async function uploadWritingAppealDocument(data) {
    await this.header()
    return axios.post('/api/module4/writing_modules/upload_writing_appeal_document', data).then(response => {
        return response.data
    }).catch(function(error) {
        if (error.response) {
            if (error.response.status == 401) {
                logout()
            } else {
                return 'error'
            }
        }
    })
}

export async function uploadReadingAppealDocument(data) {
  await this.header()
  return axios.post('/api/module4/reading_module/upload_reading_appeal_document', data).then(response => {
    return response.data
  }).catch(function(error) {
    if (error.response) {
      if (error.response.status == 401) {
        logout()
      } else {
        return 'error'
      }
    }
  })
}



//distributor
export async function checkRunNo(data) {
    await this.header();
    return axios.get("/api/module4/dist_runNumber", {
        params: {
            DISTRIBUTOR_ID: data,
        },
    }).then(response => {
        console.log('data :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {

            // Vue.$toast.open({
            //   message: error.response.data.message,
            //   type: 'error',
            // });
            if (error.response.status == 401) {
                logout();
            } else {
                return 'error'
            }
        }
    });
}

//frp
export async function checkFrpRunNo() {
    await this.header();
    return axios.get("/api/module4/frp_runNumber").then(response => {
        console.log('data :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {

            // Vue.$toast.open({
            //   message: error.response.data.message,
            //   type: 'error',
            // });
            if (error.response.status == 401) {
                logout();
            } else {
                return 'error'
            }
        }
    });
}

//TRP
export async function checkTrpRunNo(data) {
    await this.header();
    return axios.get("/api/module4/trp_runNumber", {
        params: {
            TP_COMP_ID: data,
        },
    }).then(response => {
        console.log('data :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            if (error.response.status == 401) {
                logout();
            } else {
                return 'error'
            }
        }
    });
}


//get All
export async function getAllDeliveryMode() {
    await this.header();
    return axios.get("/api/module4/delivery_mode").then(response => {
        console.log("Delivery Mode list :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // Vue.$toast.open({
            //   message: error.response.data.message,
            //   type: 'error',
            // });
            if (error.response.status == 401) {
                logout();
            } else {
                return "error"
            }
        }
    });
}
export async function getAllProgramType() {
    await this.header();
    return axios.get("/api/module4/program_type").then(response => {
        console.log("Program Type list :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // Vue.$toast.open({
            //   message: error.response.data.message,
            //   type: 'error',
            // });
            if (error.response.status == 401) {
                logout();
            } else {
                return "error"
            }
        }
    });
}
export async function getAllMethod() {
    await this.header();
    return axios.get("/api/module4/slo_method").then(response => {
        console.log("Slo Method list :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // Vue.$toast.open({
            //   message: error.response.data.message,
            //   type: 'error',
            // });
            if (error.response.status == 401) {
                logout();
            } else {
                return "error"
            }
        }
    });
}
export async function getAllMedia() {
    await this.header();
    return axios.get("/api/module4/slo_media").then(response => {
        console.log("Slo Media list :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // Vue.$toast.open({
            //   message: error.response.data.message,
            //   type: 'error',
            // });
            if (error.response.status == 401) {
                logout();
            } else {
                return "error"
            }
        }
    });
}

export async function getTotalRejected(ID) {
  await this.header();
  return axios.get("/api/module4/get_total_rejected_programs",{
    params:{
      PROG_DETAILS_ID:ID
    }
  }).then(response => {
    return response.data.data;
  }).catch(function(error) {
    if (error.response) {
      // Vue.$toast.open({
      //   message: error.response.data.message,
      //   type: 'error',
      // });
      if (error.response.status == 401) {
        logout();
      } else {
        return "error";
      }
    }
  });
}

export async function getAllAssessment() {
    await this.header();
    return axios.get("/api/module4/slo_assessment").then(response => {
        console.log("Slo Method list :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // Vue.$toast.open({
            //   message: error.response.data.message,
            //   type: 'error',
            // });
            if (error.response.status == 401) {
                logout();
            } else {
                return "error"
            }
        }
    });
}

export async function getMaxPoint(data) {
    await this.header();
    return axios.get('/api/module4/getMax_point', {
        params: {
            TR_MODE_ID: data
        },
    }).then(response => {
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            if (error.response.status == 500) {
                if (error.response.data.message == 'Token expired.') {
                    console.log('logout');
                    servicesModule4.logout();
                } else {
                    console.log(error.response.data.message);
                }
            } else if (error.response.status == 401) {
                servicesModule4.logout();
            }
            return 'error';
        }
    });
}

export async function getSlo(data) {
    await this.header();
    return axios.get('/api/module4/slo_record', {
        params: {
            SLO_LIST: data
        },
    }).then(response => {
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 500) {
                // console.log(JSON.stringify(error.response.data.message));
                if (error.response.data.message == 'Token expired.') {
                    console.log('logout');
                    servicesModule2.logout();
                } else {
                    console.log(error.response.data.message);
                }
            } else if (error.response.status == 401) {
                servicesModule2.logout();
            }
            return 'error';
        }
    });
}
export async function getParticipant(data) {
    await this.header();
    return axios.get('/api/module4/participant_record', {
        params: {
            PARTICIPANT_LIST: data
        },
    }).then(response => {
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 500) {
                // console.log(JSON.stringify(error.response.data.message));
                if (error.response.data.message == 'Token expired.') {
                    console.log('logout');
                    servicesModule2.logout();
                } else {
                    console.log(error.response.data.message);
                }
            } else if (error.response.status == 401) {
                servicesModule2.logout();
            }
            return 'error';
        }
    });
}
export async function getFeedback(data) {
    await this.header();
    return axios.get('/api/module4/feedback_record', {
        params: {
            FEEDBACK_LIST: data
        },
    }).then(response => {
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 500) {
                // console.log(JSON.stringify(error.response.data.message));
                if (error.response.data.message == 'Token expired.') {
                    console.log('logout');
                    servicesModule2.logout();
                } else {
                    console.log(error.response.data.message);
                }
            } else if (error.response.status == 401) {
                servicesModule2.logout();
            }
            return 'error';
        }
    });
}

export async function createNewPostVet(data) {
    await this.header();
    return axios.post("/api/module4/create_newPostVet", data).then(response => {
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
            if (error.response.status == 401) {
                logout();
            } else {
                return "error"
            }
        }
    });
}

// get list of distributor
export async function getProgramByDist(category, type) {
    await this.header();
    return axios.get("/api/module4/program_byDist", {
        params: {
            CATEGORY: category,
            PROG_TYPE: type,
        },
    }).then(response => {
        console.log('data :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {

            // Vue.$toast.open({
            //   message: error.response.data.message,
            //   type: 'error',
            // });
            if (error.response.status == 401) {
                logout();
            } else {
                return 'error'
            }
        }
    });
}

// get list of TRP
export async function getProgramByTRP(category, type) {
  await this.header();
  return axios.get("/api/module4/program_byTRP", {
    params: {
      CATEGORY: category,
      PROG_TYPE: type,
    },
  }).then(response => {
    console.log('data :' + JSON.stringify(response.data.data));
    return response.data.data;
  }).catch(function(error) {
    if (error.response) {

      // Vue.$toast.open({
      //   message: error.response.data.message,
      //   type: 'error',
      // });
      if (error.response.status == 401) {
        logout();
      } else {
        return 'error'
      }
    }
  });
}

//Get list of program by distID
export async function getProgramByDistID(COMPANY_ID, category, type) {
    await this.header();
    return axios.get("/api/module4/program_byDistID", {
        params: {
            COMPANY_ID: COMPANY_ID,
            CATEGORY: category,
            PROG_TYPE: type,
        },
    }).then(response => {
        console.log('data :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {

            // Vue.$toast.open({
            //   message: error.response.data.message,
            //   type: 'error',
            // });
            if (error.response.status == 401) {
                logout();
            } else {
                return 'error'
            }
        }
    });
}
//get list of distributor teaching
export async function getTeachingByDist(category, type) {
  await this.header();
  return axios.get("/api/module4/teaching_module/teaching_appeal_byDist", {
    params: {
      CATEGORY: category,
      MODULE_TYPE: type,
    },
  }).then(response => {
    console.log('data :' + JSON.stringify(response.data.data));
    return response.data.data;
  }).catch(function(error) {
    if (error.response) {

      // Vue.$toast.open({
      //   message: error.response.data.message,
      //   type: 'error',
      // });
      if (error.response.status == 401) {
        logout();
      } else {
        return 'error'
      }
    }
  });
}

//get list of distributor Academic
export async function getAcademicByDist(category, type) {
  await this.header();
  return axios.get("/api/module4/qualification_module/qualification_appeal_byDist", {
    params: {
      CATEGORY: category,
      MODULE_TYPE: type,
    },
  }).then(response => {
    console.log('data :' + JSON.stringify(response.data.data));
    return response.data.data;
  }).catch(function(error) {
    if (error.response) {

      // Vue.$toast.open({
      //   message: error.response.data.message,
      //   type: 'error',
      // });
      if (error.response.status == 401) {
        logout();
      } else {
        return 'error'
      }
    }
  });
}


// get list of distributor
export async function getWritingByDist(category, type) {
    await this.header();
    return axios.get("/api/module4/writing_modules/module_appeal_byDist", {
        params: {
            CATEGORY: category,
            MODULE_TYPE: type,
        },
    }).then(response => {
        console.log('data :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {

            // Vue.$toast.open({
            //   message: error.response.data.message,
            //   type: 'error',
            // });
            if (error.response.status == 401) {
                logout();
            } else {
                return 'error'
            }
        }
    });
}

export async function getReadingListByDist(category, type) {
  await this.header();
  return axios.get("/api/module4/reading_module/reading_appeal_byDist", {
    params: {
      CATEGORY: category,
      MODULE_TYPE: type,
    },
  }).then(response => {
    console.log('data :' + JSON.stringify(response.data.data));
    return response.data.data;
  }).catch(function(error) {
    if (error.response) {

      // Vue.$toast.open({
      //   message: error.response.data.message,
      //   type: 'error',
      // });
      if (error.response.status == 401) {
        logout();
      } else {
        return 'error'
      }
    }
  });
}

export async function getFPListByDist(category, type) {
  await this.header();
  return axios.get("/api/module4/fp_module/fp_appeal_byDist", {
    params: {
      CATEGORY: category,
      MODULE_TYPE: type,
    },
  }).then(response => {
    console.log('data :' + JSON.stringify(response.data.data));
    return response.data.data;
  }).catch(function(error) {
    if (error.response) {

      // Vue.$toast.open({
      //   message: error.response.data.message,
      //   type: 'error',
      // });
      if (error.response.status == 401) {
        logout();
      } else {
        return 'error'
      }
    }
  });
}

export async function getDetailsByID(data) {
    await this.header();
    return axios.get("/api/module4/program_details_byId", {
        params: {
            PROG_DETAILS_ID: data,
        },
    }).then(response => {
        console.log('data :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            if (error.response.status == 401) {
                logout();
            } else {
                return 'error'
            }
        }
    });
}

export async function getLatestDetailsByID(data) {
    await this.header();
    return axios.get("/api/module4/program_latestDetails_byId", {
        params: {
            PROGRAM_ID: data,
        },
    }).then(response => {
        console.log('data :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            if (error.response.status == 401) {
                logout();
            } else {
                return 'error'
            }
        }
    });
}

export async function getNewDetailsByID(data, status) {
    await this.header();
    return axios.get("/api/module4/repeatProgram_details_byId", {
        params: {
            PROGRAM_ID: data,
            PROG_DETAILS_REPEAT: status,
        },
    }).then(response => {
        console.log('data :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {

            // Vue.$toast.open({
            //   message: error.response.data.message,
            //   type: 'error',
            // });
            if (error.response.status == 401) {
                logout();
            } else {
                return 'error'
            }
        }
    });
}

export async function getSloByID(data) {
    await this.header();
    return axios.get('/api/module4/slo_recordById', {
        params: {
            PROG_DETAILS_ID: data
        },
    }).then(response => {
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 500) {
                // console.log(JSON.stringify(error.response.data.message));
                if (error.response.data.message == 'Token expired.') {
                    console.log('logout');
                    servicesModule2.logout();
                } else {
                    console.log(error.response.data.message);
                }
            } else if (error.response.status == 401) {
                servicesModule2.logout();
            }
            return 'error';
        }
    });
}

export async function getTotalSloHours(data) {
    await this.header();
    return axios.get('/api/module4/slo_total_hours', {
        params: {
            PROG_DETAILS_ID: data
        },
    }).then(response => {
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            if (error.response.status == 500) {
                if (error.response.data.message == 'Token expired.') {
                    console.log('logout');
                    servicesModule4.logout();
                } else {
                    console.log(error.response.data.message);
                }
            } else if (error.response.status == 401) {
                servicesModule4.logout();
            }
            return 'error';
        }
    });
}

export async function getFeedbackByID(data) {
    await this.header();
    return axios.get('/api/module4/feedback_recordById', {
        params: {
            PROG_DETAILS_ID: data
        },
    }).then(response => {
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 500) {
                // console.log(JSON.stringify(error.response.data.message));
                if (error.response.data.message == 'Token expired.') {
                    console.log('logout');
                    servicesModule2.logout();
                } else {
                    console.log(error.response.data.message);
                }
            } else if (error.response.status == 401) {
                servicesModule2.logout();
            }
            return 'error';
        }
    });
}

export async function getProgramDetailsID(data) {
    await this.header();
    return axios.get('/api/module4/get_ProgramDetailsId', {
        params: {
            PROGRAM_ID: data
        },
    }).then(response => {
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 500) {
                // console.log(JSON.stringify(error.response.data.message));
                if (error.response.data.message == 'Token expired.') {
                    console.log('logout');
                    servicesModule2.logout();
                } else {
                    console.log(error.response.data.message);
                }
            } else if (error.response.status == 401) {
                servicesModule2.logout();
            }
            return 'error';
        }
    });
}


export async function updateApproval(data) {
    await this.header()
    return axios.post('/api/module4/Program_approval_update', data).then(response => {
        Vue.$toast.open({
            message: response.data.message,
            type: 'success',
        });
        return response.data
    }).catch(function(error) {
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

export async function returnSubmission(data) {
    await this.header()
    return axios.post('/api/module4/return_submission', data).then(response => {
        Vue.$toast.open({
            message: response.data.message,
            type: 'success',
        });
        return response.data
    }).catch(function(error) {
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

export async function importExcelPreVetting(data) {
    await this.header();
    return axios.post("/api/module4/import_pre_vetting", data,{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {

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
            if (error.response.status == 401) {
                logout();
            } else {
                return "error"
            }
        }
    });
}

export async function submitPrevettingParticipant(data) {
  await this.header();
  return axios.post("/api/module4/submit_prevetting_participant", data).then(response => {
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
      })

      if (error.response.status == 401) {
        logout();
      } else {
        return "error"
      }
    }
  });
}


export async function importExcelPostVet(data) {
    await this.header();
    return axios.post("/api/module4/import_post_vetting", data).then(response => {
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
            if (error.response.status == 401) {
                logout();
            } else {
                return "error"
            }
        }
    });
}

export async function importExcelPostVetUpdate(data) {
    await this.header();
    return axios.post("/api/module4/update_post_vetting", data).then(response => {
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
            if (error.response.status == 401) {
                logout();
            } else {
                return "error"
            }
        }
    });
}

//get document blob
export async function getDocumentById(data) {
    await this.header();
    return axios.get('/api/module4/get_document', {
        params: {
            PROG_DETAILS_ID: data,
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
    await this.header();
    return axios.delete('/api/module4/delete_document', {
            params: {
                PROG_DOCUMENT_ID: data,
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
export async function deleteSlo(data) {
    await this.header();
    return axios.delete('/api/module4/delete_slo', {
            params: {
                PROG_SLO_ID: data,
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

//edit SLo
export async function updateSlo(data) {
    await this.header()
    return axios.post('/api/module4/slo_update', data).then(response => {
        Vue.$toast.open({
            message: response.data.message,
            type: 'success',
        });
        return response.data
    }).catch(function(error) {
        if (error.response) {
            Vue.$toast.open({
                message: error.response.data.message,
                type: 'error',
            });
            if (error.response.status == 401) {
                logout()
            } else {
                return 'error'
            }
        }
    })
}

export async function getSloByRow(data) {
    await this.header();
    return axios.get('/api/module4/slo_recordBySloId', {
        params: {
            PROG_SLO_ID: data
        },
    }).then(response => {
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 500) {
                // console.log(JSON.stringify(error.response.data.message));
                if (error.response.data.message == 'Token expired.') {
                    console.log('logout');
                    servicesModule2.logout();
                } else {
                    console.log(error.response.data.message);
                }
            } else if (error.response.status == 401) {
                servicesModule2.logout();
            }
            return 'error';
        }
    });
}

export async function createSlo(data) {
    await this.header();
    return axios.post("/api/module4/create_slo", data).then(response => {
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
            if (error.response.status == 401) {
                logout();
            } else {
                return "error"
            }
        }
    });
}

export async function cancelProgram(data) {
    await this.header();
    return axios.post("/api/module4/cancel_program", data).then(response => {
        Vue.$toast.open({
            message: response.data.message,
            type: 'success',
        });
        return response.data;
    }).catch(function(error) {
        if (error.response) {
            // Vue.$toast.open({
            //   message: error.response.data.message,
            //   type: 'error',
            // });
            if (error.response.status == 401) {
                logout();
            } else {
                return "error"
            }
        }
    });
}

export async function updateProgram(data) {
    await this.header();
    return axios.post("/api/module4/update_program", data).then(response => {
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
            if (error.response.status == 401) {
                logout();
            } else {
                return "error"
            }
        }
    });
}

export async function updatePrevettingParticipant(data) {
  await this.header();
  return axios.post("/api/module4/updatePrevettingParticipant", data).then(response => {
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
      })

      if (error.response.status == 401) {
        logout();
      } else {
        return "error"
      }
    }
  });
}


export async function updateRepeatedPreVetting(data) {
    await this.header();
    return axios.post("/api/module4/update_repeatedPreVetting", data).then(response => {
        Vue.$toast.open({
            message: response.data.message,
            type: 'success',
        });
        return response.data;
    }).catch(function(error) {
      console.log(error.response)
        if (error.response) {
            Vue.$toast.open({
              message: error.response.data.message,
              type: 'error',
            });
            if (error.response.status == 401) {
                logout();
            } else {
                return "error"
            }
        }
    });
}

export async function getAuditLogByID(data) {
    await this.header()
    return axios.get('/api/module4/audit_log', {
        params: {
            PROG_DETAILS_ID: data,
        },
    }).then(response => {
        console.log('data :' + JSON.stringify(response.data.data))
        return response.data.data
    }).catch(function(error) {
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

export async function getModuleAuditLogByID(data) {
    await this.header()
    return axios.get('/api/module4/audit_module_log', {
        params: {
            MODULE_ID: data,
        },
    }).then(response => {
        console.log('data :' + JSON.stringify(response.data.data))
        return response.data.data
    }).catch(function(error) {
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

export async function createRepeatedPreVetting(data) {
    await this.header();
    return axios.post("/api/module4/repeated_preVetting", data).then(response => {
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
            if (error.response.status == 401) {
                logout();
            } else {
                return "error"
            }
        }
    });
}

export async function getReadingParticipantByID(data) {
  await this.header();
  return axios.get(`/api/module4/reading_module/${data}/participant`, {
    params: {
      MODULE_ID: data,
    },
  }).then(response => {
    console.log('data :' + JSON.stringify(response.data.data));
    return response.data.data;
  }).catch(function(error) {
    if (error.response) {

      // Vue.$toast.open({
      //   message: error.response.data.message,
      //   type: 'error',
      // });
      if (error.response.status == 401) {
        logout();
      } else {
        return 'error'
      }
    }
  });
}

export async function getTeachingParticipantByID(data) {
  await this.header();
  return axios.get(`/api/module4/teaching_module/${data}/participant`, {
    params: {
      MODULE_ID: data,
    },
  }).then(response => {
    console.log('data :' + JSON.stringify(response.data.data));
    return response.data.data;
  }).catch(function(error) {
    if (error.response) {

      // Vue.$toast.open({
      //   message: error.response.data.message,
      //   type: 'error',
      // });
      if (error.response.status == 401) {
        logout();
      } else {
        return 'error'
      }
    }
  });
}

export async function getQualificationParticipantByID(data) {
  await this.header();
  return axios.get(`/api/module4/qualification_module/${data}/participant`, {
    params: {
      MODULE_ID: data,
    },
  }).then(response => {
    console.log('data :' + JSON.stringify(response.data.data));
    return response.data.data;
  }).catch(function(error) {
    if (error.response) {

      // Vue.$toast.open({
      //   message: error.response.data.message,
      //   type: 'error',
      // });
      if (error.response.status == 401) {
        logout();
      } else {
        return 'error'
      }
    }
  });
}


export async function getParticipantByID(data) {
    await this.header();
    return axios.get(`/api/module4/writing_modules/${data}/participant`, {
        params: {
            MODULE_ID: data,
        },
    }).then(response => {
        console.log('data :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {

            // Vue.$toast.open({
            //   message: error.response.data.message,
            //   type: 'error',
            // });
            if (error.response.status == 401) {
                logout();
            } else {
                return 'error'
            }
        }
    });
}

export async function getProgramParticipantByID(data) {
    await this.header();
    return axios.get(`/api/module4/get_participantByID`, {
        params: {
            PROG_DETAILS_ID: data,
        },
    }).then(response => {
        console.log('data :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {

            // Vue.$toast.open({
            //   message: error.response.data.message,
            //   type: 'error',
            // });
            if (error.response.status == 401) {
                logout();
            } else {
                return 'error'
            }
        }
    });
}

export async function getRejectedListByID(data) {
    await this.header();
    return axios.get("/api/module4/get_rejectedByID", {
        params: {
            PROG_DETAILS_ID: data,
        },
    }).then(response => {
        console.log('data :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {

            // Vue.$toast.open({
            //   message: error.response.data.message,
            //   type: 'error',
            // });
            if (error.response.status == 401) {
                logout();
            } else {
                return 'error'
            }
        }
    });
}


export async function deleteParticipant(data) {
    await this.header();
    return axios.delete('/api/module4/delete_participant', {
            params: {
                PROG_PARTICIPANT_ID: data,
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


export async function getCountPrevetDistributor() {
    await this.header()
    return axios.get('/api/module4/get_CountPreVettingDistributor').then(response => {
        console.log('data :' + JSON.stringify(response.data.data))
        return response.data.data
    }).catch(function(error) {
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

export async function updatePostVetting(data) {
    await this.header();
    return axios.post("/api/module4/update_postVetting", data).then(response => {
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
            if (error.response.status == 401) {
                logout();
            } else {
                return "error"
            }
        }
    });
}

export async function createFb(data) {
    await this.header();
    return axios.post("/api/module4/create_fb", data).then(response => {
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
            if (error.response.status == 401) {
                logout();
            } else {
                return "error"
            }
        }
    });
}

export async function updateFb(data) {
    await this.header()
    return axios.post('/api/module4/fb_update', data).then(response => {
        Vue.$toast.open({
            message: response.data.message,
            type: 'success',
        });
        return response.data
    }).catch(function(error) {
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

export async function addParticipant(data) {
    await this.header();
    return axios.post("/api/module4/add_participant", data).then(response => {
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
            if (error.response.status == 401) {
                logout();
            } else {
                return "error"
            }
        }
    });
}

export async function searchParticipant(data) {
    await this.header();
    return axios.post("/api/module4/search_participant", data).then(response => {
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
            if (error.response.status == 401) {
                logout();
            } else {
                return "error"
            }
        }
    });
}

export async function uploadProgramDocument(data) {
    await this.header()
    return axios.post('/api/module4/upload_program_document', data).then(response => {
        return response.data
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

export async function editPostVetting(data) {
    await this.header();
    return axios.post("/api/module4/edit_postVetting", data).then(response => {
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
            })

            if (error.response.status == 401) {
                logout();
            } else {
                return "error"
            }
        }
    });
}

export async function submitRepeatedPostVetting(data) {
    await this.header();
    return axios.post("/api/module4/submit_repeated_postVetting", data).then(response => {
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
            })

            if (error.response.status == 401) {
                logout();
            } else {
                return "error"
            }
        }
    });
}
//********************************************waiver************************************************************** */

export async function getWaiverReason() {
    await this.header()
    return axios.get('/api/module4/get_waiver_reason').then(response => {
        console.log('Waiver Reason list :' + JSON.stringify(response.data.data))
        return response.data.data
    }).catch(function(error) {
        if (error.response) {

            if (error.response.status == 401) {
                logout()
            } else {
                return 'error'
            }
        }
    })
}

export async function getWaiverByDistID(data) {
    await this.header();
    return axios.get("/api/module4/waiver_record_byDistID", {
        params: {
            DISTRIBUTOR_ID: data,
        },
    }).then(response => {
        console.log('data :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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

export async function uploadNewWaiver(data) {
    await this.header();
    return axios.post("/api/module4/import_new_waiver", data).then(response => {
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
            if (error.response.status == 401) {
                logout();
            } else {
                return "error"
            }
        }
    });
}

export async function importExcelWaiverUpdate(data) {
    await this.header();
    return axios.post("/api/module4/import_update_waiver", data).then(response => {
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
            if (error.response.status == 401) {
                logout();
            } else {
                return "error"
            }
        }
    });
}

export async function getWaiverListByWaiverID(data) {
    await this.header()
    return axios.get('/api/module4/get_listByWaiverID', {
        params: {
            WAIVER_ID: data,
        },
    }).then(response => {
        console.log('data :' + JSON.stringify(response.data.data))
        return response.data.data
    }).catch(function(error) {
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

export async function getWaiverRejectedListByID(data) {
    await this.header();
    return axios.get("/api/module4/get_waiverRejectedByID", {
        params: {
            WAIVER_ID: data,
        },
    }).then(response => {
        console.log('data :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            if (error.response.status == 401) {
                logout();
            } else {
                return 'error'
            }
        }
    });
}

export async function discardWaiverRecord(data) {
    await this.header();
    return axios.delete('/api/module4/discard_waiver_record', {
            params: {
                WAIVER_ID: data,
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

export async function submitWaiverRecord(data) {
    await this.header();
    return axios.post("/api/module4/submit_waiver_record", data).then(response => {
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
            if (error.response.status == 401) {
                logout();
            } else {
                return "error"
            }
        }
    });
}

export async function deleteConsultantWaiver(data) {
    await this.header();
    return axios.delete('/api/module4/delete_record_waiver', {
            params: {
                WAIVER_PARTICIPANT_ID: data,
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

// upload support document
export async function uploadWaiverDocument(data) {
    let config = {
        header: {
            'Content-Type': 'multipart/form-data'
        }
    }
    await this.header()
    return axios.post('/api/module4/upload_waiver_document', data, config)
        .then(response => {
            Vue.$toast.open({
                message: 'Successfully support document uploaded.',
                type: 'success',
            })
        }).catch(function(error) {
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

//approval
export async function getWaiverListByDist() {
    await this.header();
    return axios.get("/api/module4/waiver_byDist").then(response => {
        console.log('data :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            if (error.response.status == 401) {
                logout();
            } else {
                return 'error'
            }
        }
    });
}

export async function getWaiverSubmissionList() {
    await this.header();
    return axios.get("/api/module4/waiver_submissionList").then(response => {
        console.log('data :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            if (error.response.status == 401) {
                logout();
            } else {
                return 'error'
            }
        }
    });
}

export async function getWaiverApprovalList() {
  await this.header();
  return axios.get("/api/module4/waiver_approvalList").then(response => {
    console.log('data :' + JSON.stringify(response.data.data));
    return response.data.data;
  }).catch(function(error) {
    if (error.response) {
      if (error.response.status == 401) {
        logout();
      } else {
        return 'error'
      }
    }
  });
}

export async function updateWaiverSubmission(data) {
    await this.header()
    return axios.post('/api/module4/update_waiver_submission', data).then(response => {
        Vue.$toast.open({
            message: response.data.message,
            type: 'success',
        });
        return response.data
    }).catch(function(error) {
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

export async function getWaiverAuditLogByID(data) {
    await this.header()
    return axios.get('/api/module4/audit_waiver_record', {
        params: {
            WAIVER_ID: data,
        },
    }).then(response => {
        console.log('data :' + JSON.stringify(response.data.data))
        return response.data.data
    }).catch(function(error) {
        if (error.response) {
            if (error.response.status == 401) {
                logout()
            } else {
                return 'error'
            }
        }
    })
}

export async function getPIC(data) {
    await this.header()
    return axios.get('/api/module4/get_personInCharge', {
        params: {
            DIST_CREATE_BY: data,
        },
    }).then(response => {
        console.log('data :' + JSON.stringify(response.data.data))
        return response.data.data
    }).catch(function(error) {
        if (error.response) {
            if (error.response.status == 401) {
                logout()
            } else {
                return 'error'
            }
        }
    })
}

export async function editWaiverRecord(data) {
    await this.header();
    return axios.post("/api/module4/edit_waiver_record", data).then(response => {
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
            if (error.response.status == 401) {
                logout();
            } else {
                return "error"
            }
        }
    });
}

export async function addWaiverParticipant(data) {
    await this.header();
    return axios.post("/api/module4/add_waiver_participant", data).then(response => {
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
            if (error.response.status == 401) {
                logout();
            } else {
                return "error"
            }
        }
    });
}

export async function searchWaiverParticipant(data) {
    await this.header();
    return axios.post("/api/module4/search_waiver_participant", data).then(response => {
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
            if (error.response.status == 401) {
                logout();
            } else {
                return "error"
            }
        }
    });
}

export async function getCountWaiverRecord(data) {
    await this.header()
    return axios.get('/api/module4/get_count_waiverRecord', {
        params: {
            WAIVER_ID: data,
        },
    }).then(response => {
        console.log('data :' + JSON.stringify(response.data.data))
        return response.data.data
    }).catch(function(error) {
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

export async function getWaiverDocumentById(data) {
    await this.header();
    return axios.get('/api/module4/get_waiver_document', {
        params: {
            WAIVER_PARTICIPANT_ID: data,
        },
    }).then(response => {
        console.log("Document list : " + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            if (error.response.status == 500) {
                if (error.response.data.message == 'Token expired.') {
                    console.log('logout');
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

export async function uncheckWaiverSelection(data) {
    await this.header()
    return axios.post('/api/module4/uncheck_waiver_selection', data).then(response => {
        Vue.$toast.open({
            message: response.data.message,
            type: 'success',
        });
        return response.data
    }).catch(function(error) {
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

//*******************************approval count*********************************** */

export async function getWaiverApprovalTotalPending() {
    await this.header()
    return axios.get('/api/module4/waiver_approval_total_pending').then(response => {
        return response.data.data
    }).catch(function(error) {
        if (error.response) {
            if (error.response.status == 401) {
                logout()
            } else {
                return 'error'
            }
        }
    })
}

export async function getProgramApprovalTotalPending(category, type) {
    await this.header();
    return axios.get("/api/module4/program_approval_total_pending", {
        params: {
            CATEGORY: category,
            PROG_TYPE: type,
        },
    }).then(response => {
        console.log('data :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            if (error.response.status == 401) {
                logout();
            } else {
                return 'error'
            }
        }
    });
}

export async function getAppealProgramTotalPending(category, type) {
    await this.header();
    return axios.get("/api/module4/appeal_program_total_pending", {
        params: {
            CATEGORY: category,
            PROG_TYPE: type,
        },
    }).then(response => {
        console.log('data :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            if (error.response.status == 401) {
                logout();
            } else {
                return 'error'
            }
        }
    });
}


//*********************************Revocation PostVetting**************************** */
export async function uploadRevokeDocument(data) {
    await this.header()
    return axios.post('/api/module4/upload_revoke_document', data).then(response => {
        return response.data
    }).catch(function(error) {
        if (error.response) {
            if (error.response.status == 401) {
                logout()
            } else {
                return 'error'
            }
        }
    })
}

export async function revokeProgram(data) {
    await this.header()
    return axios.post('/api/module4/revoke_program', data).then(response => {
        Vue.$toast.open({
            message: response.data.message,
            type: 'success',
        });
        return response.data
    }).catch(function(error) {
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
export async function revokeWritingProgram(data) {
    await this.header()
    return axios.post('/api/module4/revoke_writing_program', data).then(response => {
        Vue.$toast.open({
            message: response.data.message,
            type: 'success',
        });
        return response.data
    }).catch(function(error) {
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

export async function getRevokeDocumentById(data) {
    await this.header();
    return axios.get('/api/module4/get_revoke_document', {
        params: {
            PROG_DETAILS_ID: data,
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


export async function revokeReadingProgram(data) {
  await this.header()
  return axios.post('/api/module4/revoke_reading_program', data).then(response => {
    Vue.$toast.open({
      message: response.data.message,
      type: 'success',
    });
    return response.data
  }).catch(function(error) {
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

export async function revokeFPProgram(data) {
  await this.header()
  return axios.post('/api/module4/fp_module/revoke_FP_program', data).then(response => {
    Vue.$toast.open({
      message: response.data.message,
      type: 'success',
    });
    return response.data
  }).catch(function(error) {
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

//*****************************writing revoke document Program****************************/

export async function uploadWritingRevokeDocument(data) {
    await this.header()
    return axios.post('/api/module4/writing_modules/upload_writing_revoke_document', data).then(response => {
        return response.data
    }).catch(function(error) {
        if (error.response) {
            if (error.response.status == 401) {
                logout()
            } else {
                return 'error'
            }
        }
    })
}

export async function getWritingRevokeDocumentById(data) {
    await this.header();
    return axios.get('/api/module4/writing_modules/get_writing_revoke_document', {
        params: {
            MODULE_ID: data,
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

export async function getWritingAppealDocumentById(data) {
    await this.header();
    return axios.get('/api/module4/writing_modules/get_writing_appeal_document', {
        params: {
            MODULE_ID: data,
        },
    }).then(response => {
        console.log("Document list : " + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            if (error.response.status == 500) {
                if (error.response.data.message == 'Token expired.') {
                    console.log('logout');
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
export async function getWritingAppealApprovalDocumentById(data) {
    await this.header();
    return axios.get('/api/module4/writing_modules/get_writing_appeal_approval_document', {
        params: {
            MODULE_ID: data,
        },
    }).then(response => {
        console.log("Document list : " + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            if (error.response.status == 500) {
                if (error.response.data.message == 'Token expired.') {
                    console.log('logout');
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


//*****************************reading revoke document Program****************************/

// export async function uploadWritingRevokeDocument(data) {
//   await this.header()
//   return axios.post('/api/module4/writing_modules/upload_writing_revoke_document', data).then(response => {
//     return response.data
//   }).catch(function(error) {
//     if (error.response) {
//       if (error.response.status == 401) {
//         logout()
//       } else {
//         return 'error'
//       }
//     }
//   })
// }

export async function getReadingRevokeDocumentById(data) {
  await this.header();
  return axios.get('/api/module4/reading_module/get_reading_revoke_document', {
    params: {
      MODULE_ID: data,
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

export async function getReadingAppealDocumentById(data) {
  await this.header();
  return axios.get('/api/module4/reading_module/get_reading_appeal_document', {
    params: {
      MODULE_ID: data,
    },
  }).then(response => {
    console.log("Document list : " + JSON.stringify(response.data.data));
    return response.data.data;
  }).catch(function(error) {
    if (error.response) {
      if (error.response.status == 500) {
        if (error.response.data.message == 'Token expired.') {
          console.log('logout');
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

export async function updateReadingModuleAppealApproval(data) {
  await this.header()
  return axios.post('/api/module4/reading_module/reading_appeal_approval_update', data).then(response => {
    Vue.$toast.open({
      message: response.data.message,
      type: 'success',
    });
    return response.data
  }).catch(function(error) {
    if (error.response) {
      if (error.response.status == 401) {
        logout()
      } else {
        return 'error'
      }
    }
  })
}
//***************************** Teaching revoke document Program****************************/
export async function getTeachingRevokeDocumentById(data) {
  await this.header();
  return axios.get('/api/module4/teaching_module/get_teaching_revoke_document', {
    params: {
      MODULE_ID: data,
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
export async function getTeachingAppealDocumentById(data) {
  await this.header();
  return axios.get('/api/module4/teaching_module/get_teaching_appeal_document', {
    params: {
      MODULE_ID: data,
    },
  }).then(response => {
    console.log("Document list : " + JSON.stringify(response.data.data));
    return response.data.data;
  }).catch(function(error) {
    if (error.response) {
      if (error.response.status == 500) {
        if (error.response.data.message == 'Token expired.') {
          console.log('logout');
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

export async function revokeTeachingProgram(data) {
  await this.header()
  return axios.post('/api/module4/teaching_module/revoke_teaching_program', data).then(response => {
    Vue.$toast.open({
      message: response.data.message,
      type: 'success',
    });
    return response.data
  }).catch(function(error) {
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

export async function updateTeachingModuleAppealApproval(data) {
  await this.header()
  return axios.post('/api/module4/teaching_module/teaching_appeal_approval_update', data).then(response => {
    Vue.$toast.open({
      message: response.data.message,
      type: 'success',
    });
    return response.data
  }).catch(function(error) {
    if (error.response) {
      if (error.response.status == 401) {
        logout()
      } else {
        return 'error'
      }
    }
  })
}

//***************************** Academic revoke document Program****************************/

export async function revokeQualificationProgram(data) {
  await this.header()
  return axios.post('/api/module4/qualification_module/revoke_qualification_program', data).then(response => {
    Vue.$toast.open({
      message: response.data.message,
      type: 'success',
    });
    return response.data
  }).catch(function(error) {
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

export async function updateAcademicModuleAppealApproval(data) {
  await this.header()
  return axios.post('/api/module4/qualification_module/qualification_appeal_approval_update', data).then(response => {
    Vue.$toast.open({
      message: response.data.message,
      type: 'success',
    });
    return response.data
  }).catch(function(error) {
    if (error.response) {
      if (error.response.status == 401) {
        logout()
      } else {
        return 'error'
      }
    }
  })
}

export async function getAcademicRevokeDocumentById(data) {
  await this.header();
  return axios.get('/api/module4/qualification_module/get_qualification_revoke_document', {
    params: {
      MODULE_ID: data,
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

export async function getAcademicAppealDocumentById(data) {
  await this.header();
  return axios.get('/api/module4/qualification_module/get_qualification_appeal_document', {
    params: {
      MODULE_ID: data,
    },
  }).then(response => {
    console.log("Document list : " + JSON.stringify(response.data.data));
    return response.data.data;
  }).catch(function(error) {
    if (error.response) {
      if (error.response.status == 500) {
        if (error.response.data.message == 'Token expired.') {
          console.log('logout');
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


export async function getFPRevokeDocumentById(data) {
  await this.header();
  return axios.get('/api/module4/fp_module/get_fp_revoke_document', {
    params: {
      MODULE_ID: data,
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

export async function getFPAppealDocumentById(data) {
  await this.header();
  return axios.get('/api/module4/fp_module/get_fp_appeal_document', {
    params: {
      MODULE_ID: data,
    },
  }).then(response => {
    console.log("Document list : " + JSON.stringify(response.data.data));
    return response.data.data;
  }).catch(function(error) {
    if (error.response) {
      if (error.response.status == 500) {
        if (error.response.data.message == 'Token expired.') {
          console.log('logout');
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

export async function updateFPModuleAppealApproval(data) {
  await this.header()
  return axios.post('/api/module4/fp_module/fp_appeal_approval_update', data).then(response => {
    Vue.$toast.open({
      message: response.data.message,
      type: 'success',
    });
    return response.data
  }).catch(function(error) {
    if (error.response) {
      if (error.response.status == 401) {
        logout()
      } else {
        return 'error'
      }
    }
  })
}

//*****************************appeal Program****************************/


export async function appealProgram(data) {
    await this.header()
    return axios.post('/api/module4/appeal_program', data).then(response => {
        Vue.$toast.open({
            message: response.data.message,
            type: 'success',
        });
        return response.data
    }).catch(function(error) {
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

export async function appealWritingProgram(data) {
    await this.header()
    return axios.post('/api/module4/writing_modules/appeal_writing_program', data).then(response => {
        Vue.$toast.open({
            message: response.data.message,
            type: 'success',
        });
        return response.data
    }).catch(function(error) {
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

export async function appealReadingProgram(data) {
  await this.header()
  return axios.post('/api/module4/reading_module/appeal_reading_program', data).then(response => {
    Vue.$toast.open({
      message: response.data.message,
      type: 'success',
    });
    return response.data
  }).catch(function(error) {
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

export async function appealTeachingProgram(data) {
  await this.header()
  return axios.post('/api/module4/teaching_module/appeal_teaching_program', data).then(response => {
    Vue.$toast.open({
      message: response.data.message,
      type: 'success',
    });
    return response.data
  }).catch(function(error) {
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
export async function appealAcademicProgram(data) {
  await this.header()
  return axios.post('/api/module4/qualification_module/appeal_qualification_program', data).then(response => {
    Vue.$toast.open({
      message: response.data.message,
      type: 'success',
    });
    return response.data
  }).catch(function(error) {
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

export async function appealFPProgram(data) {
  await this.header()
  return axios.post('/api/module4/fp_module/appeal_FP_program', data).then(response => {
    Vue.$toast.open({
      message: response.data.message,
      type: 'success',
    });
    return response.data
  }).catch(function(error) {
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

export async function updateModuleAppealApproval(data) {
    await this.header()
    return axios.post('/api/module4/writing_modules/writing_appeal_approval_update', data).then(response => {
        Vue.$toast.open({
            message: response.data.message,
            type: 'success',
        });
        return response.data
    }).catch(function(error) {
        if (error.response) {
            if (error.response.status == 401) {
                logout()
            } else {
                return 'error'
            }
        }
    })
}

export async function uploadAppealDocument(data) {
    await this.header()
    return axios.post('/api/module4/upload_appeal_document', data).then(response => {
        return response.data
    }).catch(function(error) {
        if (error.response) {
            if (error.response.status == 401) {
                logout()
            } else {
                return 'error'
            }
        }
    })
}

export async function getAppealProgramByDist(category, type) {
    await this.header();
    return axios.get("/api/module4/program_appeal_byDist", {
        params: {
            CATEGORY: category,
            PROG_TYPE: type,
        },
    }).then(response => {
        console.log('data :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            if (error.response.status == 401) {
                logout();
            } else {
                return 'error'
            }
        }
    });
}

export async function getAppealProgramByDistId(data, category, type) {
    await this.header();
    return axios.get("/api/module4/appeal_program_DetailsByDist", {
        params: {
            COMPANY_ID: data,
            CATEGORY: category,
            PROG_TYPE: type,
        },
    }).then(response => {
        console.log('data :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            if (error.response.status == 401) {
                logout();
            } else {
                return 'error'
            }
        }
    });
}

export async function deleteAppealApprovalWritingDocument(data) {
    await this.header();
    return axios.delete('/api/module4/writing_modules/delete_appealWriting_document', {
            params: {
                WRITING_APPEAL_DOC_ID: data,
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


export async function deleteAppealApprovalDocument(data) {
    await this.header();
    return axios.delete('/api/module4/delete_appealApproval_document', {
            params: {
                PROG_REVOKE_DOC_ID: data,
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

export async function getAppealDocumentById(data) {
    await this.header();
    return axios.get('/api/module4/get_appeal_document', {
        params: {
            PROG_DETAILS_ID: data,
        },
    }).then(response => {
        console.log("Document list : " + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            if (error.response.status == 500) {
                if (error.response.data.message == 'Token expired.') {
                    console.log('logout');
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
export async function getAmendDocumentById(data) {
    await this.header();
    return axios.get('/api/module4/get_amend_document', {
        params: {
            PROG_DETAILS_ID: data,
        },
    }).then(response => {
        console.log("Document list : " + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            if (error.response.status == 500) {
                if (error.response.data.message == 'Token expired.') {
                    console.log('logout');
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

export async function updateAppealApproval(data) {
    await this.header()
    return axios.post('/api/module4/program_appeal_approval_update', data).then(response => {
        Vue.$toast.open({
            message: response.data.message,
            type: 'success',
        });
        return response.data
    }).catch(function(error) {
        if (error.response) {
            if (error.response.status == 401) {
                logout()
            } else {
                return 'error'
            }
        }
    })
}


export async function getApprovalAppealDocumentById(data) {
    await this.header();
    return axios.get('/api/module4/get_approval_appeal_document', {
        params: {
            PROG_DETAILS_ID: data,
        },
    }).then(response => {
        console.log("Document list : " + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            if (error.response.status == 500) {
                if (error.response.data.message == 'Token expired.') {
                    console.log('logout');
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

//**********************************FRP*************************************************** */

export async function getApprID(data) {
    await this.header();
    return axios.get("/api/module4/program_approval_id", {
        params: {
            PROG_DETAILS_ID: data,
        },
    }).then(response => {
        console.log('data :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            if (error.response.status == 401) {
                logout();
            } else {
                return 'error'
            }
        }
    });
}

export async function getSubmissionByFrpProgramId(data) {
    await this.header();
    return axios.get("/api/module4/program_frp_record", {
        params: {
            PROGRAM_ID: data,
        },
    }).then(response => {
        console.log('data :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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

export async function getConsultantLicenseWithDist(CONSULTANT_ID) {
  await this.header();
  return axios.get(`/api/module4/get_consultant_license_with_dist/${CONSULTANT_ID}`,).then(response => {
    return response.data.data;
  }).catch(function(error) {
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
export async function getAllDistributors() {
  await this.header();
  return axios.get("/api/module4/get_all_distributors",).then(response => {
    Vue.$toast.open({
      message: response.data.message,
      type: 'success',
    });
    return response.data.data;
  }).catch(function(error) {
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

export async function getConsultantCPD(DIST_ID) {
  await this.header();
  return axios.get(`/api/module4/get_consultant_cpd_point/${DIST_ID}`,).then(response => {
    Vue.$toast.open({
      message: response.data.message,
      type: 'success',
    });
    return response.data.data;
  }).catch(function(error) {
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
export async function getConsultantCPDDetails(VALUE=null,CONSULTANT_ID) {
  await this.header();
  return axios.get("/api/module4/consultant_cpd_point_details",{
    params:{
      VALUE:VALUE,
      CONSULTANT_ID:CONSULTANT_ID,
    }
  }).then(response => {
    Vue.$toast.open({
      message: response.data.message,
      type: 'success',
    });
    return response.data.data;
  }).catch(function(error) {
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

export async function getFpCategory() {
  await this.header();
  return axios.get("/api/module4/get_fp_categories",).then(response => {
    return response.data.data;
  }).catch(function(error) {
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


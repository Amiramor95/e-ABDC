// syasya
import axios from 'axios';
import * as servicesModule0 from "./services";
import Vue from 'vue';


//* ***SMS Setting *************/

// export async function getSmsSettingList() {
//     await this.header();
//     return axios.get('/api/module0/sms_setting').then(response => {
//         console.log('sms list :' + JSON.stringify(response.data.data));
//         return response.data.data;
//     }).catch(function(error) {
//         if (error.response) {
//             // The request was made and the server responded with a status code
//             // that falls out of the range of 2xx
//             if (error.response.status == 500) {
//                 // console.log(JSON.stringify(error.response.data.message));
//                 if (error.response.data.message == 'Token expired.') {
//                     console.log('logout');
//                     servicesModule0.logout();
//                 } else {
//                     console.log(error.response.data.message);
//                 }
//             } else if (error.response.status == 401) {
//                 servicesModule0.logout();
//             }
//             return 'error';
//         }
//     });
// }

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
export async function getSmsSettingList(data) {
    await servicesModule0.header();
    return axios.get("/api/module0/sms_setting", {
        params: {
            SETTING_SMS_ID: data
        }
    }).then(response => {
        console.log("data :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}

export async function createSmsSetting() {
    console.log('data : ' + data);
    await this.header();
    return axios.post('/api/module0/sms_setting', data).then(response => {
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

export async function updateSmsException(data) {
    let jsonObject = {};

    for (const [key, value] of data) {
        jsonObject[key] = value;
    }
    return axios
        .put("/api/module0/sms_setting", jsonObject)
        .then(response => {
            console.log("data :" + JSON.stringify(response.data));
            return response.data;
        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 500) {
                    // console.log(JSON.stringify(error.response.data.message));
                    if (error.response.data.message == "Token expired.") {
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
// ****  Dummy Distributor ****** /



export async function getDummyDistributorType() {
    // await this.header();
    return axios.get("/api/module0/dummy_distributor_type").then(response => {
        // console.log("division list :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}

//* *** city Setting *************/
export async function getAllCity() {
    await this.header();
    return axios.get("/api/module0/setting_city").then(response => {
        console.log("division list :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}

export async function getCityById(data) {
    await this.header();
    return axios.get("/api/module0/setting_city", {
        params: {
            SETTING_CITY_ID: data
        }
    }).then(response => {
        console.log("data :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}

export async function createCity(data) {
    await this.header();
    return axios.post("/api/module0/setting_city", data).then(response => {
        // console.log("exception create :" + JSON.stringify(response.data));
        return response.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}

export async function deleteCity(data) {
    return axios
        .delete("/api/module0/setting_city", {
            data: { SETTING_CITY_ID: data }
        })
        .then(response => {
            console.log("data :" + JSON.stringify(response.data));
            return response.data;
        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 401) {
                    servicesModule0.logout();
                } else {
                    return "error"
                }
            }
        });
}

export async function updateCity(data) {
    let jsonObject = {};

    for (const [key, value] of data) {
        jsonObject[key] = value;
    }
    return axios
        .put("/api/module0/setting_city", jsonObject)
        .then(response => {
            console.log("data :" + JSON.stringify(response.data));
            return response.data;
        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 401) {
                    servicesModule0.logout();
                } else {
                    return "error"
                }
            }
        });
}

//* *** ID Masking Setting *************/
export async function getAllMasking(data) {
    // await this.header();
    return axios.get("/api/module0/all_masking", {
        params: {
            MASKING_TYPE: data
        }
    }).then(response => {
        // console.log("division list :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}
export async function getLatestMasking(data) {
    // await this.header();
    return axios.get("/api/module0/latest_masking", {
        params: {
            MASKING_TYPE: data
        }
    }).then(response => {
        // console.log("division list :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}

export async function getMaskingById(data) {
    // await this.header();
    return axios.get("/api/module0/masking_by_id", {
        params: {
            MASKING_ID: data
        }
    }).then(response => {
        console.log("data :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}

export async function createIdMasking(data) {
    //await this.header();
    return axios.post("/api/module0/create_masking", data).then(response => {
        if (response.data.message == "Data Already Exist!!") {
            generalAlertError(response.data.message);
        } else {
            generalAlert(response.data.message);
        }
        return response.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}

export async function deleteMasking(data) {
    return axios
        .delete("/api/module0/masking_delete", {
            data: { MASKING_ID: data }
        })
        .then(response => {
            generalAlert(response.data.message);
            return response.data;
        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 401) {
                    servicesModule0.logout();
                } else {
                    return "error"
                }
            }
        });
}

export async function updateMasking(data) {
    let jsonObject = {};

    for (const [key, value] of data) {
        jsonObject[key] = value;
    }
    return axios
        .put("/api/module0/masking_update", jsonObject)
        .then(response => {
            generalAlert(response.data.message);
            return response.data;
        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 401) {
                    servicesModule0.logout();
                } else {
                    return "error"
                }
            }
        });
}

//* ***Approval Level *************/
export async function getAllDepartmentList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/get_department', {
        params: {
            MANAGE_DEPARTMENT_ID: data
        },
    }).then(response => {
        console.log('data :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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

export async function getAllGroupList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/get_group', {
        params: {
            MANAGE_DEPARTMENT_ID: data
        },

    }).then(response => {
        console.log('data :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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

// export async function getAllApprovalList(data) {
//   await servicesModule0.header();
//   return axios.get('/api/module0/approval_level', {
//     params: {
//       APPR_PROCESSFLOW_NAME: data,
//       APPR_LEVEL_NAME: data
//     },

//   }).then(response => {
//       console.log('data :' + JSON.stringify(response.data.data));
//       return response.data.data;
//     }).catch(function (error) {
//       if (error.response) {
//         // The request was made and the server responded with a status code
//         // that falls out of the range of 2xx
//         if (error.response.status == 401) {
//           servicesModule0.logout();
//         } else {
//           return 'error'
//         }
//       }
//     });
// }


export async function getAllApprovalList(index, data) {
    await servicesModule0.header();
    return axios.get('/api/module0/approval_levels', {
        params: {
            // APPROVAL_LEVEL_ID:data,
            APPR_PROCESSFLOW_ID: index,
            APPR_LEVEL_NAME: data
        },
    }).then(response => {
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

export async function getAllDistApprovalList(index, data) {
    await servicesModule0.header();
    return axios.get('/api/module0/dist_approvals', {
        params: {
            // APPROVAL_LEVEL_ID:data,
            DIST_APPR_PROCESSFLOW_ID: index,
            DIST_APPR_LEVEL_NAME: data
        },
    }).then(response => {
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

// Get Distribute submodule by module
export async function getDistManageSubModule(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/dis_submodule_data', {
        params: {
            DISTRIBUTOR_MANAGE_MODULE_ID: data
        },
    }).then(response => {
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            //console.log('error response :' + error.response);
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 500) {} else if (error.response.status == 401) {
                logout();
            }
        }
    });
}

export async function updateApprovalList(data) {
    await servicesModule0.header();
    return axios.post('/api/module0/approval_level', data).then(response => {
        generalAlert(response.data.message);
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            console.log('error : ' + error.response);
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

export async function updatedistApprovalList(data) {
    await servicesModule0.header();
    return axios.post('/api/module0/dist_approval', data).then(response => {
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            console.log('error : ' + error.response);
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

// export async function updateApprovalList(data){
//   let jsonObject = {};

//   for (const [key, value]  of data) {
//       jsonObject[key] = value;
//   }
//   return axios
//   .put("/api/module0/approval_level", jsonObject)
//   .then(response => {
//     console.log("data :" + JSON.stringify(response.data));
//    return response.data;
//   }).catch(function(error) {
//    if (error.response) {
//      // The request was made and the server responded with a status code
//      // that falls out of the range of 2xx
//      if (error.response.status == 401) {
//       servicesModule0.logout();
//     }else {
//       return "error"
//     }
//    }
//   });
// }



//----------------------------------Create 5 module CPD Point Module---------------------------------------------

export async function createFiveModule(data) {
    await servicesModule0.header();
    return axios.post('/api/module0/cpd_point', data).then(response => {
        generalAlert(response.data.message);
        return response.data;
    }).catch(function(error) {
        if (error.response) {
            // Vue.$toast.open({
            //     message: error.response.data.message,
            //     type: 'error',
            // });
            console.log('error : ' + error.response);
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

export async function getAllFiveModuleList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/five_modules', {
        params: {
            CPD_PROGRAM_TYPE: data,
        },
    }).then(response => {
        console.log('CPD 5 module list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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

export async function updateFiveModule(data) {
    let jsonObject = {};

    for (const [key, value] of data) {
        jsonObject[key] = value;
    }
    return axios
        .put("/api/module0/cpd_point", jsonObject)
        .then(response => {
            generalAlert(response.data.message);
            return response.data;
        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 401) {
                    servicesModule0.logout();
                } else {
                    return "error"
                }
            }
        });
}
export async function deleteFiveModule(data) {
    return axios
        .delete('/api/module0/cpd_point', {
            data: { CPD_HOURS_ID: data },
        })
        .then(response => {
            generalAlert(response.data.message);
            return response.data;
        }).catch(function(error) {
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

export async function getFiveModuleById(data) {
    await servicesModule0.header();
    return axios.get("/api/module0/cpd_point", {
        params: {
            CPD_HOURS_ID: data
        }
    }).then(response => {
        console.log("data :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            Vue.$toast.open({
                message: error.response.data.message,
                type: 'error',
            });
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}


//-----------------------CPD PROGRAM HOURS CALCULATION ----------------------------
export async function getAllCPDProgramList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/cpd_points', {
        params: {
            CPD_PROGRAM_TYPE: data,
        },
    }).then(response => {
        console.log('CPD Program list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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

export async function createCpdProgram(data) {
    await servicesModule0.header();
    return axios.post('/api/module0/cpd_point', data).then(response => {
        generalAlert(response.data.message);
        return response.data;
    }).catch(function(error) {
        if (error.response) {
            console.log('error : ' + error.response);
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

export async function updateCpdProgram(data) {
    let jsonObject = {};

    for (const [key, value] of data) {
        jsonObject[key] = value;
    }
    return axios
        .put("/api/module0/cpd_point", jsonObject)
        .then(response => {
            generalAlert(response.data.message);
            return response.data;
        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 401) {
                    servicesModule0.logout();
                } else {
                    return "error"
                }
            }
        });
}
export async function deleteCpdProgram(data) {
    return axios
        .delete('/api/module0/cpd_point', {
            data: { CPD_HOURS_ID: data },
        })
        .then(response => {
            generalAlert(response.data.message);
            return response.data;
        }).catch(function(error) {
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
export async function getCpdProgramById(data) {
    await servicesModule0.header();
    return axios.get("/api/module0/cpd_point", {
        params: {
            CPD_HOURS_ID: data
        }
    }).then(response => {
        console.log("data :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}






//------------------- WAIVER REASON

export async function createWaiverReason(data) {
    await servicesModule0.header();
    return axios.post('/api/module0/cpd_waiver', data).then(response => {
        generalAlert(response.data.message);
        return response.data;
    }).catch(function(error) {
        if (error.response) {
            console.log('error : ' + error.response);
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

export async function getAllWaiverReasonList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/cpd_waivers', {
        params: {
            WAIVER_REASON_ID: data,
        },
    }).then(response => {
        console.log('CPD Point list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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

export async function updateWaiverReason(data) {
    let jsonObject = {};

    for (const [key, value] of data) {
        jsonObject[key] = value;
    }
    return axios
        .put("/api/module0/cpd_waiver", jsonObject)
        .then(response => {
            generalAlert(response.data.message);
            return response.data;
        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 401) {
                    servicesModule0.logout();
                } else {
                    return "error"
                }
            }
        });
}


export async function deleteWaiverReason(data) {
    return axios
        .delete('/api/module0/cpd_waiver', {
            data: { WAIVER_REASON_ID: data },
        })
        .then(response => {
            generalAlert(response.data.message);
            return response.data;
        }).catch(function(error) {
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
export async function getWaiverReasonById(data) {
    await servicesModule0.header();
    return axios.get("/api/module0/cpd_waiver", {
        params: {
            WAIVER_REASON_ID: data
        }
    }).then(response => {
        console.log("data :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}

// RENEWAL CPD CALCULATION
export async function createRenewalCPD(data) {
    await servicesModule0.header();
    return axios.post('/api/module0/cpd_renewal', data).then(response => {
        generalAlert(response.data.message);
        return response.data;
    }).catch(function(error) {
        if (error.response) {
            console.log('error : ' + error.response);
            if (error.response.status == 400) {
                generalAlertError(error.response.data.message);
            }
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

export async function getAllRenewalCPDList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/cpd_renewals', data).then(response => {
        console.log('CPD Renewal list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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

export async function updateCPDRenewal(data) {
    let jsonObject = {};

    for (const [key, value] of data) {
        jsonObject[key] = value;
    }
    return axios
        .put("/api/module0/cpd_renewal", jsonObject)
        .then(response => {
            generalAlert(response.data.message);
            return response.data;
        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 401) {
                    servicesModule0.logout();
                } else {
                    return "error"
                }
            }
        });
}

export async function deleteCPDRenewal(data) {
    return axios
        .delete('/api/module0/cpd_renewal', {
            data: { CPD_RENEWAL_CALC_ID: data },
        })
        .then(response => {
            generalAlert(response.data.message);
            return response.data;
        }).catch(function(error) {
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

export async function getCPDRenewalById(data) {
    await servicesModule0.header();
    return axios.get("/api/module0/cpd_renewal", {
        params: {
            CPD_RENEWAL_CALC_ID: data
        }
    }).then(response => {
        console.log("data :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}


//----------------- CPD Rule ---------------------

export async function getAllCPDRuleList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/cpd_rules', data).then(response => {
        console.log('CPD Rule list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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
export async function createCpdRulePoint(data) {
    await servicesModule0.header();
    return axios.post('/api/module0/cpd_rule', data).then(response => {
        generalAlert(response.data.message);
        return response.data;
    }).catch(function(error) {
        if (error.response) {
            console.log('error : ' + error.response);
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

export async function getCPDRuleById(data) {
    await servicesModule0.header();
    return axios.get("/api/module0/cpd_rule", {
        params: {
            CPD_RULE_CALC_ID: data
        }
    }).then(response => {
        console.log("data :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}
export async function updateCPDRule(data) {
    let jsonObject = {};

    for (const [key, value] of data) {
        jsonObject[key] = value;
    }
    return axios
        .put("/api/module0/cpd_rule", jsonObject)
        .then(response => {
            generalAlert(response.data.message);
            return response.data;
        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 401) {
                    servicesModule0.logout();
                } else {
                    return "error"
                }
            }
        });
}
export async function deleteCPDRule(data) {
    return axios
        .delete('/api/module0/cpd_rule', {
            data: { CPD_RULE_CALC_ID: data },
        })
        .then(response => {
            generalAlert(response.data.message);
            return response.data;
        }).catch(function(error) {
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
// -------------------------TR MODE PRE/POST VETTING--------------

export async function getAllTRModeList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/tr_modess', {
        params: {

        },
    }).then(response => {
        console.log('list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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

export async function createTRMode(data) {
    await servicesModule0.header();
    return axios.post('/api/module0/tr_mode', data).then(response => {
        generalAlert(response.data.message);
        return response.data;
    }).catch(function(error) {
        if (error.response) {
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
export async function getTRModeById(data) {
    await servicesModule0.header();
    return axios.get("/api/module0/tr_mode", {
        params: {
            TR_MODE_ID: data
        }
    }).then(response => {
        console.log("data :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}

export async function updateTRMode(data) {
    const jsonObject = {};

    for (const [key, value] of data) {
        jsonObject[key] = value;
    }
    return axios
        .put('/api/module0/tr_mode', jsonObject)
        .then(response => {
            console.log('data :' + JSON.stringify(response.data));
            generalAlert(response.data.message);
            return response.data;
        }).catch(function(error) {
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
export async function deleteTRMode(data) {
    return axios
        .delete("/api/module0/tr_mode", {
            data: { TR_MODE_ID: data }
        })
        .then(response => {
            generalAlert(response.data.message);
            return response.data;
        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 401) {
                    servicesModule0.logout();
                } else {
                    return "error"
                }
            }
        });
}


//-------------------------- TR MODE READING -----------------------
export async function getAllReadingTRModeList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/reading_trss', {
        params: {

        },
    }).then(response => {
        console.log('list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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

export async function createReadingTRMode(data) {
    await servicesModule0.header();
    return axios.post('/api/module0/reading_tr', data).then(response => {
        generalAlert(response.data.message);
        return response.data;
    }).catch(function(error) {
        if (error.response) {
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
export async function getReadingTRModeById(data) {
    await servicesModule0.header();
    return axios.get("/api/module0/reading_tr", {
        params: {
            READING_TR_MODE_ID: data
        }
    }).then(response => {
        console.log("data :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}

export async function updateReadingTRMode(data) {
    const jsonObject = {};

    for (const [key, value] of data) {
        jsonObject[key] = value;
    }
    return axios
        .put('/api/module0/reading_tr', jsonObject)
        .then(response => {
            generalAlert(response.data.message);
            return response.data;
        }).catch(function(error) {
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
export async function deleteReadingTRMode(data) {
    return axios
        .delete("/api/module0/reading_tr", {
            data: { READING_TR_MODE_ID: data }
        })
        .then(response => {
            generalAlert(response.data.message);
            return response.data;
        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 401) {
                    servicesModule0.logout();
                } else {
                    return "error"
                }
            }
        });
}





//--------------------- 5 Module TR MODE ---------------------------

export async function getAll5moduleTRModeList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/five_trs', {
        params: {

        },
    }).then(response => {
        console.log('cpd setting  list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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

export async function create5moduleTRMode(data) {
    await servicesModule0.header();
    return axios.post('/api/module0/five_tr', data).then(response => {
        generalAlert(response.data.message);
        return response.data;
    }).catch(function(error) {
        if (error.response) {
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
export async function get5moduleTRModeById(data) {
    await servicesModule0.header();
    return axios.get("/api/module0/five_tr", {
        params: {
            FIVE_MODULE_TR_MODE_ID: data
        }
    }).then(response => {
        console.log("data :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}

export async function update5moduleTRMode(data) {
    const jsonObject = {};

    for (const [key, value] of data) {
        jsonObject[key] = value;
    }
    return axios
        .put('/api/module0/five_tr', jsonObject)
        .then(response => {
            generalAlert(response.data.message);
            return response.data;
        }).catch(function(error) {
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
export async function delete5moduleTRMode(data) {
    return axios
        .delete("/api/module0/five_tr", {
            data: { FIVE_MODULE_TR_MODE_ID: data }
        })
        .then(response => {
            generalAlert(response.data.message);
            return response.data;
        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 401) {
                    servicesModule0.logout();
                } else {
                    return "error"
                }
            }
        });
}




// --------------------------------TR Program Type --------------------------

export async function getAllTRTypeList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/tr_programs', {
        params: {
            // TR_PROGRAM_TYPE_ID: data,
        },
    }).then(response => {
        console.log('cpd setting  list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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

export async function createTRType(data) {
    await servicesModule0.header();
    return axios.post('/api/module0/tr_program', data).then(response => {
        generalAlert(response.data.message);
        return response.data;
    }).catch(function(error) {
        if (error.response) {
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
export async function getTRTypeById(data) {
    await servicesModule0.header();
    return axios.get("/api/module0/tr_program", {
        params: {
            TR_PROGRAM_TYPE_ID: data
        }
    }).then(response => {
        console.log("data :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}
export async function deleteTRType(data) {
    return axios
        .delete("/api/module0/tr_program", {
            data: { TR_PROGRAM_TYPE_ID: data }
        })
        .then(response => {
            generalAlert(response.data.message);
            return response.data;
        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 401) {
                    servicesModule0.logout();
                } else {
                    return "error"
                }
            }
        });
}

export async function updateTRType(data) {
    const jsonObject = {};

    for (const [key, value] of data) {
        jsonObject[key] = value;
    }
    return axios
        .put('/api/module0/tr_program', jsonObject)
        .then(response => {
            generalAlert(response.data.message);
            return response.data;
        }).catch(function(error) {
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


// --------------------- Module Code -------------------
export async function getAllModuleCodeList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/module_codes', {
        params: {},
    }).then(response => {
        console.log('cpd setting  list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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

export async function createModuleCode(data) {
    await servicesModule0.header();
    return axios.post('/api/module0/module_code', data).then(response => {
        generalAlert(response.data.message);
        return response.data;
    }).catch(function(error) {
        if (error.response) {
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
export async function getModuleCodeById(data) {
    await servicesModule0.header();
    return axios.get("/api/module0/module_code", {
        params: {
            MODULE_CODE_ID: data
        }
    }).then(response => {
        console.log("data :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}
export async function deleteModuleCode(data) {
    return axios
        .delete("/api/module0/module_code", {
            data: { MODULE_CODE_ID: data }
        })
        .then(response => {
            generalAlert(response.data.message);
            return response.data;
        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 401) {
                    servicesModule0.logout();
                } else {
                    return "error"
                }
            }
        });
}

export async function updateModuleCode(data) {
    const jsonObject = {};

    for (const [key, value] of data) {
        jsonObject[key] = value;
    }
    return axios
        .put('/api/module0/module_code', jsonObject)
        .then(response => {
            generalAlert(response.data.message);
            return response.data;
        }).catch(function(error) {
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





/// -------- CPD CUT OFF DATE --------
export async function getAllCutOffList() {
    await servicesModule0.header();
    return axios.get('/api/module0/cpd_dates').then(response => {
        console.log('Cut off date list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
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

export async function createCutOffDate(data) {
    const jsonObject = {};

    for (const [key, value] of data) {
        jsonObject[key] = value;
    }
    return axios
        .post('/api/module0/cpd_date', jsonObject)
        .then(response => {
            console.log('data :' + JSON.stringify(response.data));
            Vue.$toast.open({
                message: response.data.message,
                type: 'success',
            });
            return response.data;
        }).catch(function(error) {
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


export async function getDateById(data) {
    await servicesModule0.header();
    return axios.get("/api/module0/cpd_dates", {
        params: {
            CPD_CUT_OFF_DATE_ID: data,
        }
    }).then(response => {
        console.log("data cut off date :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}
//  ---------------------------- Account Code --------------
export async function getAllAccCodeList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/finance_account_code', {
        params: {},
    }).then(response => {
        console.log('account code list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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
export async function getAllAccCodeNameList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/finance_account_name', {
        params: {},
    }).then(response => {
        console.log('account code list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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
export async function getAllAccCodeTypeList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/finance_account_type', {
        params: {},
    }).then(response => {
        return response.data.data;
    }).catch(function(error) {
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
export async function createAccCode(data) {
    await servicesModule0.header();
    return axios.post('/api/module0/finance_account_code', data).then(response => {
        // console.log("exception create :" + JSON.stringify(response.data));
        generalAlert(response.data.message);
        return response.data;
    }).catch(function(error) {
        if (error.response) {
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
export async function updateAccCode(data) {
    const jsonObject = {};

    for (const [key, value] of data) {
        jsonObject[key] = value;
    }
    return axios
        .put('/api/module0/finance_account_code', jsonObject)
        .then(response => {
            generalAlert(response.data.message);
            return response.data;
        }).catch(function(error) {
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

export async function deleteAccCode(data) {
    return axios
        .delete("/api/module0/finance_account_code", {
            data: { FINANCE_ACC_CODE_ID: data }
        })
        .then(response => {
            generalAlert(response.data.message);
            return response.data;
        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 401) {
                    servicesModule0.logout();
                } else {
                    return "error"
                }
            }
        });
}


// ------------------------- SETTING CODE ----------------------------
export async function getAllGlCodeList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/finance_setting_codes', {
        params: {
            FINANCE_ACC_GLCODE_ID: data,
        },
    }).then(response => {
        console.log('account code list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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
export async function getAllDistributorList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/distributor_list', {
        params: {
            DIST_ID: data,
        },
    }).then(response => {
        console.log('distributor list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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
export async function getAllCodeTabelList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/fin_code_table', {
        params: {

        },
    }).then(response => {
        console.log('distributor list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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
export async function createGLCode(data) {
    await servicesModule0.header();
    return axios.post('/api/module0/finance_setting_code', data).then(response => {
        // console.log("exception create :" + JSON.stringify(response.data));
        return response.data;
    }).catch(function(error) {
        if (error.response) {
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
export async function updateGLCode(data) {
    const jsonObject = {};

    for (const [key, value] of data) {
        jsonObject[key] = value;
    }
    return axios
        .put('/api/module0/finance_setting_code', jsonObject)
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

export async function deleteAccGLCode(data) {
    return axios
        .delete("/api/module0/finance_setting_code", {
            data: { FINANCE_ACC_GLCODE_ID: data }
        })
        .then(response => {
            console.log("data :" + JSON.stringify(response.data));
            return response.data;
        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 401) {
                    servicesModule0.logout();
                } else {
                    return "error"
                }
            }
        });
}


// --------------------- Setting General for Country and State --------------------
export async function getAllSettingGeneralList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/setting_generals', {
        params: {
            SET_TYPE: data,
        },
    }).then(response => {
        console.log('setting general list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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
/*    Create All Address    */
export async function createSettingGeneral(data) {
    await servicesModule0.header();
    return axios.post('/api/module0/setting_general', data).then(response => {
        // console.log("exception create :" + JSON.stringify(response.data));
        generalAlert(response.data.message);
        return response.data;
    }).catch(function(error) {
        if (error.response) {
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
/*  Bulk Upload Country */
export async function bulkUploadCountry(data) {
    await servicesModule0.header();
    return axios.post('/api/module0/bulk_upload_country', data).then(response => {
        generalAlert(response.data.message);
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
/*  Bulk Upload State */
export async function bulkUploadState(data) {
    await servicesModule0.header();
    return axios.post('/api/module0/bulk_upload_state', data).then(response => {
        generalAlert(response.data.message);
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

/*  Bulk Upload State */
export async function bulkUploadPostal(data) {
    await servicesModule0.header();
    return axios.post('/api/module0/bulk_upload_post_code', data).then(response => {
        generalAlert(response.data.message);
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


// export async function getbulkCountry(data) {
//     await servicesModule0.header();
//     return axios.post('/api/module0/bulk_upload', data).then(response => {
//         // console.log("exception create :" + JSON.stringify(response.data));
//         return response.data;
//     }).catch(function(error) {
//         if (error.response) {
//             // The request was made and the server responded with a status code
//             // that falls out of the range of 2xx
//             if (error.response.status == 500) {
//                 // console.log(JSON.stringify(error.response.data.message));
//                 if (error.response.data.message == 'Token expired.') {
//                     console.log('logout');
//                     servicesModule0.logout();
//                 } else {
//                     console.log(error.response.data.message);
//                 }
//             } else if (error.response.status == 401) {
//                 servicesModule0.logout();
//             }
//             return 'error';
//         }
//     });
// }

export async function getbulkCountrylist(data) {
    await servicesModule0.header();
    return axios.post('/api/module0/bulk_upload', {
        params: {
            COUNTRY_LIST: data
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

export async function updateSettingGeneral(data) {
    let jsonObject = {};

    for (const [key, value] of data) {
        jsonObject[key] = value;
    }
    return axios
        .put("/api/module0/setting_general", jsonObject)
        .then(response => {
            console.log("data :" + JSON.stringify(response.data));
            generalAlert(response.data.message);
            return response.data;
        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 401) {
                    servicesModule0.logout();
                } else {
                    return "error"
                }
            }
        });
}



export async function getSettingGeneralById(data) {
    await servicesModule0.header();
    return axios.get("/api/module0/setting_general", {
        params: {
            SETTING_GENERAL_ID: data
        }
    }).then(response => {
        console.log("data :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // Vue.$toast.open({
            //     message: error.response.data.message,
            //     type: 'error',
            // });
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}

export async function getAllCountryList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/get_country', {
        params: {
            SET_TYPE: 'COUNTRY',
        }
    }).then(response => {
        // console.log('country list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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
export async function getCountryById(data) {
    await servicesModule0.header();
    return axios.get("/api/module0/get_countrys", {
        params: {
            SETTING_GENERAL_ID: data,
        }
    }).then(response => {
        console.log("data :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // Vue.$toast.open({
            //     message: error.response.data.message,
            //     type: 'error',
            // });
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}

export async function getStateById(data) {
    await servicesModule0.header();
    return axios.get("/api/module0/get_states", {
        params: {
            SETTING_GENERAL_ID: data,
        }
    }).then(response => {
        console.log("data :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // Vue.$toast.open({
            //     message: error.response.data.message,
            //     type: 'error',
            // });
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}

export async function deleteSettingGeneral(data) {
    return axios
        .delete("/api/module0/setting_general", {
            data: { SETTING_GENERAL_ID: data }
        })
        .then(response => {
            console.log("data :" + JSON.stringify(response.data));
            generalAlert(response.data.message);
            return response.data;
        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 401) {
                    servicesModule0.logout();
                } else {
                    return "error"
                }
            }
        });
}

export async function getAllStateList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/get_state', {
        params: {
            SET_TYPE: 'STATE',
        },
    }).then(response => {
        // console.log('setting state list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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

export async function getFilteredCountry(data) {
    await servicesModule0.header();
    return axios.post('/api/module0/filter_country', data).then(response => {
        console.log('data :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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

export async function getFilteredState(data) {
    await servicesModule0.header();
    console.log("service=", data);
    return axios.post('/api/module0/filter_setting_postcode', data).then(response => {
        console.log('data :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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

// --------------- postcode and city -------------

export async function getAllPostcodeList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/setting_postcodes', {
        params: {
            SETTING_POSTCODE_ID: data,
            // SETTING_CITY_ID: data,
        },
    }).then(response => {
        // console.log('setting postcode list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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
export async function createPostcode(data) {
    await servicesModule0.header();
    return axios.post('/api/module0/setting_postcode', data).then(response => {
        // console.log("exception create :" + JSON.stringify(response.data));
        generalAlert(response.data.message);
        return response.data;
    }).catch(function(error) {
        if (error.response) {
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

export async function updatePostcode(data) {
    let jsonObject = {};

    for (const [key, value] of data) {
        jsonObject[key] = value;
    }
    return axios
        .post("/api/module0/setting_postcode_update", jsonObject)
        .then(response => {
            console.log("data :" + JSON.stringify(response.data));
            generalAlert(response.data.message);
            return response.data;
        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 401) {
                    servicesModule0.logout();
                } else {
                    return "error"
                }
            }
        });
}

// export async function getPostcodeById(data){
//   await servicesModule0.header();
//       return axios.get("/api/module0/setting_postcode", {params: {
//         SETTING_POSTCODE_ID: data
//       }}).then(response => {
//       console.log("data :" + JSON.stringify(response.data.data));
//       return response.data.data;
//   }).catch(function(error) {
//       if (error.response) {
//         // The request was made and the server responded with a status code
//         // that falls out of the range of 2xx
//         if (error.response.status == 401) {
//           servicesModule0.logout();
//         }else {
//           return "error"
//         }
//       }
//     });
//   }

export async function getPostcodeById(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/setting_postcode', {
            params: {
                SETTING_POSTCODE_ID: data,
            },
        })
        .then(response => {
            console.log('data : ' + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
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

export async function deletePostcode(data) {
    return axios
        .delete("/api/module0/setting_postcode", {
            data: { SETTING_POSTCODE_ID: data }
        })
        .then(response => {
            console.log("data :" + JSON.stringify(response.data));
            return response.data;
        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 401) {
                    servicesModule0.logout();
                } else {
                    return "error"
                }
            }
        });
}

// export async function getFilteredPostcode (data) {
//   await servicesModule0.header();
//   return axios.get('/api/module0/filter_setting_postcode', { params: data }).then(response => {
//     console.log('data :' + JSON.stringify(response.data.data));
//     return response.data.data;
//   }).catch(function (error) {
//     if (error.response) {
//       // The request was made and the server responded with a status code
//       // that falls out of the range of 2xx
//       if (error.response.status == 500) {
//         // console.log(JSON.stringify(error.response.data.message));
//         if (error.response.data.message == 'Token expired.') {
//           console.log('logout');
//           logout();
//         } else {
//           console.log(error.response.data.message);
//         }
//       } else if (error.response.status == 401) {
//         logout();
//       }
//       return 'error';
//     }
//   });
// }

//---------------DISTRIBUTOR SETTING -------------------

export async function createDistributorSetting(data) {
    await servicesModule0.header();
    return axios.post('/api/module0/dist_setting', data).then(response => {
        generalAlert(response.data.message);
        return response.data;
    }).catch(function(error) {
        if (error.response) {
            // Vue.$toast.open({
            //     message: error.response.data.message,
            //     type: 'error',
            // });
            console.log('error : ' + error.response);
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

export async function getAllDistributorSettingList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/dist_settings', {
        params: {
            DIST_SET_TYPE: data,
        },
    }).then(response => {
        console.log('Distributor Setting list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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

export async function getAllDistributorDeclareList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/dist_declare', {
        params: {
            DIST_SET_TYPE: data,
        },
    }).then(response => {
        console.log('Distributor Setting list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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
export async function getAllDistributorAppealList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/dist_appeal', {
        params: {
            DIST_SET_TYPE: data,
        },
    }).then(response => {
        console.log('Distributor Setting list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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
export async function getAllDistributorAppealListRevovation(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/dist_appeal_revoke', {
        params: {
            DIST_SET_TYPE: data,
        },
    }).then(response => {
        console.log('Distributor Setting list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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
export async function getAllDistributorReturnList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/dist_return', {
        params: {
            DIST_SET_TYPE: data,
        },
    }).then(response => {
        console.log('Distributor Setting list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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
export async function updateDistributorSetting(data) {
    let jsonObject = {};

    for (const [key, value] of data) {
        jsonObject[key] = value;
    }
    return axios
        .put("/api/module0/dist_setting", jsonObject)
        .then(response => {
            console.log("data :" + JSON.stringify(response.data));
            generalAlert(response.data.message);
            return response.data;
        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 401) {
                    servicesModule0.logout();
                } else {
                    return "error"
                }
            }
        });
}

export async function getDistributorSettingById(data) {
    await servicesModule0.header();
    return axios.get("/api/module0/dist_setting", {
        params: {
            DISTRIBUTOR_SETTING_ID: data
        }
    }).then(response => {
        console.log("data :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // Vue.$toast.open({
            //     message: error.response.data.message,
            //     type: 'error',
            // });
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}
export async function getEditDistributorSettingById(data) {
    await servicesModule0.header();
    return axios.get("/api/module0/dist_setting_by_id", {
        params: {
            DISTRIBUTOR_SETTING_ID: data
        }
    }).then(response => {
        console.log("data :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // Vue.$toast.open({
            //     message: error.response.data.message,
            //     type: 'error',
            // });
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}
export async function deleteDistributorSetting(data) {
    return axios
        .delete("/api/module0/dist_setting", {
            data: { DISTRIBUTOR_SETTING_ID: data }
        })
        .then(response => {
            console.log("data :" + JSON.stringify(response.data));
            generalAlert(response.data.message);
            return response.data;
        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 401) {
                    servicesModule0.logout();
                } else {
                    return "error"
                }
            }
        });
}

//------------------Declaration Setting-------------

export async function createDistributorRegistrationDeclaration(data) {
    await servicesModule0.header();
    return axios.post('/api/module0/setting_declaration_create', data).then(response => {
        // console.log("exception create :" + JSON.stringify(response.data));
        generalAlert(response.data.message);
        return response.data;
    }).catch(function(error) {
        if (error.response) {
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

export async function getAllDistributorRegistrationDeclaration(data_set, data_type) {
    await servicesModule0.header();
    return axios.get('/api/module0/declaration_setting', {
        params: {
            DECLARATION_SET_PARAM: data_set,
            DECLARATION_SET_TYPE: data_type,
        },
    }).then(response => {
        console.log('setting general list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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
export async function updateDistributorRegistrationDeclaration(data) {

    await servicesModule0.header();
    return axios.post('/api/module0/declaration_setting_update', data).then(response => {
        generalAlert(response.data.message);
        return response.data;
    }).catch(function(error) {
        if (error.response) {
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

export async function deleteDeclarationSetting(data) {
    return axios
        .delete("/api/module0/declaration_setting", {
            data: { DECLARATION_SETTING_ID: data }
        })
        .then(response => {
            console.log("data :" + JSON.stringify(response.data));
            generalAlert(response.data.message);
            return response.data;
        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 401) {
                    servicesModule0.logout();
                } else {
                    return "error"
                }
            }
        });
}

// ------------- Distributor Type ----------------

export async function getAllConsultantTypeList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/consultant_type', {
        params: {
            CONSULTANT_TYPE_ID: data,
        },
    }).then(response => {
        console.log('Consultant type list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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

export async function createDistributorType(data) {
    await servicesModule0.header();
    return axios.post('/api/module0/distributor_type', data).then(response => {
        generalAlert(response.data.message);
        return response.data;
    }).catch(function(error) {
        if (error.response) {
            // Vue.$toast.open({
            //     message: error.response.data.message,
            //     type: 'error',
            // });
            console.log('error : ' + error.response);
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

export async function getAllDistributorTypeList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/distributor_types', {
        params: {
            DISTRIBUTOR_TYPE_ID: data,
        },
    }).then(response => {
        console.log('Distributor Setting list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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

export async function getDistributorTypeById(data) {
    await servicesModule0.header();
    return axios.get("/api/module0/distributor_type_by_id", {
        params: {
            DISTRIBUTOR_TYPE_ID: data
        }
    }).then(response => {
        console.log("data :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // Vue.$toast.open({
            //     message: error.response.data.message,
            //     type: 'error',
            // });
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}

export async function deleteDistributorType(data) {
    return axios
        .delete("/api/module0/distributor_type", {
            data: { DISTRIBUTOR_TYPE_ID: data }
        })
        .then(response => {
            console.log("data :" + JSON.stringify(response.data));
            generalAlert(response.data.message);
            return response.data;
        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 401) {
                    servicesModule0.logout();
                } else {
                    return "error"
                }
            }
        });
}
export async function updateDistributorType(data) {
    let jsonObject = {};

    for (const [key, value] of data) {
        jsonObject[key] = value;
    }
    console.log('data11111111 : ' + data);
    return axios
        .post("/api/module0/distributor_type_update", data)
        .then(response => {
            console.log("data :" + JSON.stringify(response.data));
            generalAlert(response.data.message);
            return response.data;
        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 401) {
                    servicesModule0.logout();
                } else {
                    return "error"
                }
            }
        });
}


// ------------------- ANNUAL FEE CONFIGURATION ------------------

export async function createAnnualFeeDate(data) {
    await servicesModule0.header();
    return axios.post('/api/module0/annual_date', data).then(response => {
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
            console.log('error : ' + error.response);
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

export async function getAllAnnualDateFirst(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/annual_date', {
        params: {
            ANNUAL_FEES_DATE_ID: data,
        },
    }).then(response => {
        //console.log('list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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

export async function getAllListDate(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/annual_datess', {
        params: {
            ANNUAL_FEES_DATE_ID: data,
        },
    }).then(response => {
        //console.log('list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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

export async function getAnnualFeeById(data) {
    await servicesModule0.header();
    return axios.get("/api/module0/annual_date_by_id", {
        params: {
            ANNUAL_FEES_DATE_ID: data,
        }
    }).then(response => {
        //console.log("data :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}

export async function updateAnnualFee(data) {
    const jsonObject = {};

    for (const [key, value] of data) {
        jsonObject[key] = value;
    }
    return axios
        .put('/api/module0/annual_date', jsonObject)
        .then(response => {
            //console.log('data :' + JSON.stringify(response.data));
            Vue.$toast.open({
                message: response.data.message,
                type: 'success',
            });
            return response.data;
        }).catch(function(error) {
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


// ------------------ QR Mode ----------------

export async function getAllQrModeList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/qr_modes', {
        params: {

        },
    }).then(response => {
        console.log('Qr Mode Tr Mode  list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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

export async function createQrMode(data) {
    await servicesModule0.header();
    return axios.post('/api/module0/qr_mode', data).then(response => {
        generalAlert(response.data.message);
        return response.data;
    }).catch(function(error) {
        if (error.response) {
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
export async function getQrModeById(data) {
    await servicesModule0.header();
    return axios.get("/api/module0/qr_mode", {
        params: {
            QR_MODE_ID: data
        }
    }).then(response => {
        console.log("data :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}

export async function updateQrMode(data) {
    const jsonObject = {};

    for (const [key, value] of data) {
        jsonObject[key] = value;
    }
    return axios
        .put('/api/module0/qr_mode', jsonObject)
        .then(response => {
            generalAlert(response.data.message);
            return response.data;
        }).catch(function(error) {
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
export async function deleteQrMode(data) {
    return axios
        .delete("/api/module0/qr_mode", {
            data: { QR_MODE_ID: data }
        })
        .then(response => {
            generalAlert(response.data.message);
            return response.data;
        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 401) {
                    servicesModule0.logout();
                } else {
                    return "error"
                }
            }
        });
}


// --------------------- Fp Code --------------------
export async function getAllFpCodeList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/fp_codes', {
        params: {

        },
    }).then(response => {
        console.log('Qr Mode Tr Mode  list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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

export async function createFpCode(data) {
    await servicesModule0.header();
    return axios.post('/api/module0/fp_code', data).then(response => {
        generalAlert(response.data.message);
        return response.data;
    }).catch(function(error) {
        if (error.response) {
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
export async function getFpCodeById(data) {
    await servicesModule0.header();
    return axios.get("/api/module0/fp_code", {
        params: {
            FP_CODE_ID: data
        }
    }).then(response => {
        console.log("data :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}

export async function updateFpCode(data) {
    const jsonObject = {};

    for (const [key, value] of data) {
        jsonObject[key] = value;
    }
    return axios
        .put('/api/module0/fp_code', jsonObject)
        .then(response => {
            generalAlert(response.data.message);
            return response.data;
        }).catch(function(error) {
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
export async function deleteFpCode(data) {
    return axios
        .delete("/api/module0/fp_code", {
            data: { FP_CODE_ID: data }
        })
        .then(response => {
            generalAlert(response.data.message);
            return response.data;
        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 401) {
                    servicesModule0.logout();
                } else {
                    return "error"
                }
            }
        });
}



// ------------ LS MEDIA ---------------

export async function getAllLsMediaList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/ls_medias', {
        params: {

        },
    }).then(response => {
        console.log('Qr Mode Tr Mode  list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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

export async function createLsMedia(data) {
    await servicesModule0.header();
    return axios.post('/api/module0/ls_media', data).then(response => {
        // console.log("exception create :" + JSON.stringify(response.data));
        return response.data;
    }).catch(function(error) {
        if (error.response) {
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
export async function getLsMediaById(data) {
    await servicesModule0.header();
    return axios.get("/api/module0/ls_media", {
        params: {
            LS_MEDIA_ID: data
        }
    }).then(response => {
        console.log("data :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}

export async function updateLsMedia(data) {
    const jsonObject = {};

    for (const [key, value] of data) {
        jsonObject[key] = value;
    }
    return axios
        .put('/api/module0/ls_media', jsonObject)
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
export async function deleteLsMedia(data) {
    return axios
        .delete("/api/module0/ls_media", {
            data: { LS_MEDIA_ID: data }
        })
        .then(response => {
            console.log("data :" + JSON.stringify(response.data));
            return response.data;
        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 401) {
                    servicesModule0.logout();
                } else {
                    return "error"
                }
            }
        });
}

//---------- LS METHOD


export async function getAllLsMethodList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/ls_methods', {
        params: {

        },
    }).then(response => {
        console.log(' list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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

export async function createLsMethod(data) {
    await servicesModule0.header();
    return axios.post('/api/module0/ls_method', data).then(response => {
        // console.log("exception create :" + JSON.stringify(response.data));
        return response.data;
    }).catch(function(error) {
        if (error.response) {
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
export async function getLsMethodById(data) {
    await servicesModule0.header();
    return axios.get("/api/module0/ls_method", {
        params: {
            LS_METHOD_ID: data
        }
    }).then(response => {
        console.log("data :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}

export async function updateLsMethod(data) {
    const jsonObject = {};

    for (const [key, value] of data) {
        jsonObject[key] = value;
    }
    return axios
        .put('/api/module0/ls_media', jsonObject)
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
export async function deleteLsMethod(data) {
    return axios
        .delete("/api/module0/ls_media", {
            data: { LS_METHOD_ID: data }
        })
        .then(response => {
            console.log("data :" + JSON.stringify(response.data));
            return response.data;
        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 401) {
                    servicesModule0.logout();
                } else {
                    return "error"
                }
            }
        });
}

// LS ASSESSMENT


export async function getAllLsAssessmentList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/ls_assessments', {
        params: {

        },
    }).then(response => {
        console.log(' list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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

export async function createLsAssessment(data) {
    await servicesModule0.header();
    return axios.post('/api/module0/ls_assessment', data).then(response => {
        // console.log("exception create :" + JSON.stringify(response.data));
        return response.data;
    }).catch(function(error) {
        if (error.response) {
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
export async function getLsAssessmentById(data) {
    await servicesModule0.header();
    return axios.get("/api/module0/ls_assessment", {
        params: {
            LS_ASSESSMENT_ID: data
        }
    }).then(response => {
        console.log("data :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}

export async function updateLsAssessment(data) {
    const jsonObject = {};

    for (const [key, value] of data) {
        jsonObject[key] = value;
    }
    return axios
        .put('/api/module0/ls_assessment', jsonObject)
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
export async function deleteLsAssessment(data) {
    return axios
        .delete("/api/module0/ls_assessment", {
            data: { LS_ASSESSMENT_ID: data }
        })
        .then(response => {
            console.log("data :" + JSON.stringify(response.data));
            return response.data;
        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 401) {
                    servicesModule0.logout();
                } else {
                    return "error"
                }
            }
        });
}


//-------- RNA Verification date -----
export async function getAllRnaDatelist(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/rna_dates', {
        params: {},
    }).then(response => {
        console.log('list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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

// Qualification Consultant

export async function getAllQualificationList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/cons_quals', {
        params: {

        },
    }).then(response => {
        console.log(' list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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

export async function createQualification(data) {
    await servicesModule0.header();
    return axios.post('/api/module0/cons_qual', data).then(response => {
        generalAlert(response.data.message);
        // console.log("exception create :" + JSON.stringify(response.data));
        return response.data;
    }).catch(function(error) {
        if (error.response) {
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
export async function getQualificationById(data) {
    await servicesModule0.header();
    return axios.get("/api/module0/cons_qual", {
        params: {
            CONSULTANT_QUALIFICATION_ID: data
        }
    }).then(response => {
        console.log("data :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}

export async function updateQualification(data) {
    const jsonObject = {};

    for (const [key, value] of data) {
        jsonObject[key] = value;
    }
    return axios
        .put('/api/module0/cons_qual', jsonObject)
        .then(response => {
            console.log('data :' + JSON.stringify(response.data));
            generalAlert(response.data.message);
            return response.data;
        }).catch(function(error) {
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
export async function deleteQualification(data) {
    return axios
        .delete("/api/module0/cons_qual", {
            data: { CONSULTANT_QUALIFICATION_ID: data }
        })
        .then(response => {
            console.log("data :" + JSON.stringify(response.data));
            generalAlert(response.data.message);
            return response.data;
        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 401) {
                    servicesModule0.logout();
                } else {
                    return "error"
                }
            }
        });
}


// CONSULTANT DESIGNATION OF EXAMEPTION

export async function getAllDesignationList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/cons_designs', {
        params: {

        },
    }).then(response => {
        console.log(' list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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

export async function createDesignation(data) {
    await servicesModule0.header();
    return axios.post('/api/module0/cons_design', data).then(response => {
        generalAlert(response.data.message);
        // console.log("exception create :" + JSON.stringify(response.data));
        return response.data;
    }).catch(function(error) {
        if (error.response) {
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
export async function getDesignationById(data) {
    await servicesModule0.header();
    return axios.get("/api/module0/cons_design", {
        params: {
            CONSULTANT_DESIGNATION_EXEMPTION_ID: data
        }
    }).then(response => {
        console.log("data :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}

export async function updateDesignation(data) {
    const jsonObject = {};

    for (const [key, value] of data) {
        jsonObject[key] = value;
    }
    return axios
        .put('/api/module0/cons_design', jsonObject)
        .then(response => {
            console.log('data :' + JSON.stringify(response.data));
            generalAlert(response.data.message);
            return response.data;
        }).catch(function(error) {
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
export async function deleteDesignation(data) {
    return axios
        .delete("/api/module0/cons_design", {
            data: { CONSULTANT_DESIGNATION_EXEMPTION_ID: data }
        })
        .then(response => {
            console.log("data :" + JSON.stringify(response.data));
            generalAlert(response.data.message);
            return response.data;
        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 401) {
                    servicesModule0.logout();
                } else {
                    return "error"
                }
            }
        });
}


//CONSULTANT APPEAL DAY


export async function getAppealDayById(data) {
    await servicesModule0.header();
    return axios.get("/api/module0/cons_appeal", {
        params: {
            CONSULTANT_APPEAL_ID: data,
        }
    }).then(response => {
        console.log("days :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}
export async function createAppealDay(data) {
    await servicesModule0.header();
    return axios.post('/api/module0/cons_appeal', data).then(response => {
        generalAlert(response.data.message);
        // console.log("exception create :" + JSON.stringify(response.data));
        return response.data;
    }).catch(function(error) {
        if (error.response) {
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

//Consultant Type

export async function getAllConsTypeList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/cons_types', {
        params: {

        },
    }).then(response => {
        console.log(' list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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
export async function getAllConsTypeListEXAM(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/cons_types_all', {
        params: {

        },
    }).then(response => {
        console.log(' list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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

export async function createConsType(data) {
    await servicesModule0.header();
    return axios.post('/api/module0/cons_type', data).then(response => {
        generalAlert(response.data.message);
        // console.log("exception create :" + JSON.stringify(response.data));
        return response.data;
    }).catch(function(error) {
        if (error.response) {
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
export async function getConsTypeById(data) {
    await servicesModule0.header();
    return axios.get("/api/module0/cons_type", {
        params: {
            CONSULTANT_TYPE_ID: data
        }
    }).then(response => {
        console.log("data :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}

export async function updateConsType(data) {
    const jsonObject = {};

    for (const [key, value] of data) {
        jsonObject[key] = value;
    }
    return axios
        .put('/api/module0/cons_type', jsonObject)
        .then(response => {
            console.log('data :' + JSON.stringify(response.data));
            generalAlert(response.data.message);
            return response.data;
        }).catch(function(error) {
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
export async function deleteConsType(data) {
    return axios
        .delete("/api/module0/cons_type", {
            data: { CONSULTANT_TYPE_ID: data }
        })
        .then(response => {
            console.log("data :" + JSON.stringify(response.data));
            generalAlert(response.data.message);
            return response.data;
        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 401) {
                    servicesModule0.logout();
                } else {
                    return "error"
                }
            }
        });
}
// --------- Consultant Bankruptcy Day--------
export async function getBankruptcyById(data) {
    await servicesModule0.header();
    return axios.get("/api/module0/cons_bankruptcy", {
        params: {
            CONSULTANT_BANKRUPTCY_ID: data,
        }
    }).then(response => {
        console.log("days :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}
export async function createBankruptcyDay(data) {
    await servicesModule0.header();
    return axios.post('/api/module0/cons_bankruptcy', data).then(response => {
        Vue.$toast.open({
            message: response.data.message,
            type: 'success',
        });
        // console.log("exception create :" + JSON.stringify(response.data));
        return response.data;
    }).catch(function(error) {
        if (error.response) {
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

//----------- Consultant Appeal Exam ----
export async function getAppealExamById(data) {
    await servicesModule0.header();
    return axios.get("/api/module0/cons_appeal_exam", {
        params: {
            CONSULTANT_APPEAL_EXAMINATION_ID: data,
        }
    }).then(response => {
        console.log("days :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}
export async function createAppealExam(data) {
    await servicesModule0.header();
    return axios.post('/api/module0/cons_appeal_exam', data).then(response => {
        Vue.$toast.open({
            message: response.data.message,
            type: 'success',
        });
        // console.log("exception create :" + JSON.stringify(response.data));
        return response.data;
    }).catch(function(error) {
        if (error.response) {
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

//------- PRS UNIT Familiarisation ---------
export async function getPrsById(data) {
    await servicesModule0.header();
    return axios.get("/api/module0/cons_prs", {
        params: {
            CONSULTANT_PRS_FAMILIARISATION_ID: data,
        }
    }).then(response => {
        console.log("days :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}
export async function createPrs(data) {
    await servicesModule0.header();
    return axios.post('/api/module0/cons_prs', data).then(response => {
        Vue.$toast.open({
            message: response.data.message,
            type: 'success',
        });
        // console.log("exception create :" + JSON.stringify(response.data));
        return response.data;
    }).catch(function(error) {
        if (error.response) {
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
export async function getPrsFormerById(data) {
    await servicesModule0.header();
    return axios.get("/api/module0/cons_prs_former", {
        params: {
            CONSULTANT_PRS_FORMER_FAMILIARISATION_ID: data,
        }
    }).then(response => {
        console.log("days :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}
export async function createPrsFormer(data) {
    await servicesModule0.header();
    return axios.post('/api/module0/cons_prs_former', data).then(response => {
        Vue.$toast.open({
            message: response.data.message,
            type: 'success',
        });
        // console.log("exception create :" + JSON.stringify(response.data));
        return response.data;
    }).catch(function(error) {
        if (error.response) {
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

export async function getActiveById(data) {
    await servicesModule0.header();
    return axios.get("/api/module0/cons_ceilli", {
        params: {
            CONSULTANT_ACTIVE_CEILLI_ID: data,
        }
    }).then(response => {
        console.log("days :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}
export async function createActiveCeilli(data) {
    await servicesModule0.header();
    return axios.post('/api/module0/cons_ceilli', data).then(response => {
        Vue.$toast.open({
            message: response.data.message,
            type: 'success',
        });
        // console.log("exception create :" + JSON.stringify(response.data));
        return response.data;
    }).catch(function(error) {
        if (error.response) {
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

///------------ Exam Type
export async function getAllExamTypeList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/cons_exam_types', {
        params: {

        },
    }).then(response => {
        console.log(' list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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

export async function createExamType(data) {
    await servicesModule0.header();
    return axios.post('/api/module0/cons_exam_type', data).then(response => {
        generalAlert(response.data.message);
        return response.data;
    }).catch(function(error) {
        if (error.response) {
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
export async function getExamTypeById(data) {
    await servicesModule0.header();
    return axios.get("/api/module0/cons_exam_type", {
        params: {
            CONSULTANT_EXAM_TYPE_ID: data
        }
    }).then(response => {
        console.log("data :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}

export async function getExamTypesByConsultantId(data) {
    await servicesModule0.header();
    return axios.get("/api/module0/cons_exam_type_by_consultant_id", {
        params: {
            CONSULTANT_TYPE_ID: data
        }
    }).then(response => {
        console.log("data :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}

export async function updateExamType(data) {
    const jsonObject = {};

    for (const [key, value] of data) {
        jsonObject[key] = value;
    }
    return axios
        .put('/api/module0/cons_exam_type', jsonObject)
        .then(response => {
            generalAlert(response.data.message);
            return response.data;
        }).catch(function(error) {
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
export async function deleteExamType(data) {
    return axios
        .delete("/api/module0/cons_exam_type", {
            data: { CONSULTANT_EXAM_TYPE_ID: data }
        })
        .then(response => {
            generalAlert(response.data.message);
            return response.data;
        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 401) {
                    servicesModule0.logout();
                } else {
                    return "error"
                }
            }
        });
}

//------ Exam Session ----------
export async function getAllExamSessionList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/cons_exam_sessions', {
        params: {

        },
    }).then(response => {
        console.log(' list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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

export async function createExamSession(data) {
    await servicesModule0.header();
    return axios.post('/api/module0/cons_exam_session', data).then(response => {
        generalAlert(response.data.message);
        return response.data;
    }).catch(function(error) {
        if (error.response) {
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
export async function getExamSessionById(data) {
    await servicesModule0.header();
    return axios.get("/api/module0/cons_exam_session", {
        params: {
            CONSULTANT_EXAM_ESSION_ID: data
        }
    }).then(response => {
        console.log("data :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}
export async function getBulkUploadById(data) {
    await servicesModule0.header();
    return axios.get("/api/module0/cons_bulk_upload", {
        params: {
            BULK_ID: data
        }
    }).then(response => {
        console.log("data :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}

export async function updateBulkUpdateTermination(data) {
    await servicesModule0.header();
    return axios.post('/api/module0/cons_bulk_upload_termination', data).then(response => {
        generalAlert(response.data.message);
        return response.data;
    }).catch(function(error) {
        if (error.response) {
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

export async function updateExamSession(data) {
    const jsonObject = {};

    for (const [key, value] of data) {
        jsonObject[key] = value;
    }
    return axios
        .put('/api/module0/cons_exam_session', jsonObject)
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
export async function deleteExamSession(data) {
    return axios
        .delete("/api/module0/cons_exam_session", {
            data: { CONSULTANT_EXAM_SESSION_ID: data }
        })
        .then(response => {
            console.log("data :" + JSON.stringify(response.data));
            return response.data;
        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 401) {
                    servicesModule0.logout();
                } else {
                    return "error"
                }
            }
        });
}
// Type of Appplication
export async function getAllTypeApplList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/cons_type_appls', {
        params: {

        },
    }).then(response => {
        console.log(' list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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

export async function createTypeAppl(data) {
    await servicesModule0.header();
    return axios.post('/api/module0/cons_type_appl', data).then(response => {
        generalAlert(response.data.message);
        // console.log("exception create :" + JSON.stringify(response.data));
        return response.data;
    }).catch(function(error) {
        if (error.response) {
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
export async function getTypeApplById(data) {
    await servicesModule0.header();
    return axios.get("/api/module0/cons_type_appl", {
        params: {
            TYPE_OF_APPLICATION_ID: data
        }
    }).then(response => {
        console.log("data :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}

export async function updateTypeAppl(data) {
    const jsonObject = {};

    for (const [key, value] of data) {
        jsonObject[key] = value;
    }
    return axios
        .put('/api/module0/cons_type_appl', jsonObject)
        .then(response => {
            generalAlert(response.data.message);
            return response.data;
        }).catch(function(error) {
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
export async function deleteTypeAppl(data) {
    return axios
        .delete("/api/module0/cons_type_appl", {
            data: { TYPE_OF_APPLICATION_ID: data }
        })
        .then(response => {
            console.log("data :" + JSON.stringify(response.data));
            generalAlert(response.data.message);
            return response.data;
        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 401) {
                    servicesModule0.logout();
                } else {
                    return "error"
                }
            }
        });
}


// --------TERMINATION TYPE

export async function getAllTerminationList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/cons_terminates', {
        params: {

        },
    }).then(response => {
        console.log(' list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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

export async function createTermination(data) {
    await servicesModule0.header();
    return axios.post('/api/module0/cons_terminate', data).then(response => {
        generalAlert(response.data.message);
        // console.log("exception create :" + JSON.stringify(response.data));
        return response.data;
    }).catch(function(error) {
        if (error.response) {
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
export async function getTerminationById(data) {
    await servicesModule0.header();
    return axios.get("/api/module0/cons_terminate", {
        params: {
            CONSULTANT_TERMINATION_TYPE_ID: data
        }
    }).then(response => {
        console.log("data :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}

export async function updateTermination(data) {
    const jsonObject = {};

    for (const [key, value] of data) {
        jsonObject[key] = value;
    }
    return axios
        .put('/api/module0/cons_terminate', jsonObject)
        .then(response => {
            generalAlert(response.data.message);
            return response.data;
        }).catch(function(error) {
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
export async function deleteTermination(data) {
    return axios
        .delete("/api/module0/cons_terminate", {
            data: { CONSULTANT_TERMINATION_TYPE_ID: data }
        })
        .then(response => {
            generalAlert(response.data.message);
            return response.data;
        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 401) {
                    servicesModule0.logout();
                } else {
                    return "error"
                }
            }
        });
}

//--------- Consultant Renewal Date
export async function getConsRenewalById(data) {
    await servicesModule0.header();
    return axios.get("/api/module0/cons_renewal", {
        params: {
            CONSULTANT_RENEWAL_DATE_ID: data,
        }
    }).then(response => {
        console.log("days :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}
export async function createConsRenewal(data) {
    await servicesModule0.header();
    return axios.post('/api/module0/cons_renewal', data).then(response => {
        Vue.$toast.open({
            message: response.data.message,
            type: 'success',
        });
        // console.log("exception create :" + JSON.stringify(response.data));
        return response.data;
    }).catch(function(error) {
        if (error.response) {
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

// -------FUND TYPE

export async function getAllFundTypeList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/fund_types', {
        params: {

        },
    }).then(response => {
        console.log(' list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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

export async function createFundType(data) {
    await servicesModule0.header();
    return axios.post('/api/module0/fund_type', data).then(response => {
        generalAlert(response.data.message);
        return response.data;
    }).catch(function(error) {
        if (error.response) {
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
export async function getFundTypeById(data) {
    await servicesModule0.header();
    return axios.get("/api/module0/fund_type", {
        params: {
            FMS_FUNDTYPE_ID: data
        }
    }).then(response => {
        console.log("data :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}

export async function updateFundType(data) {
    const jsonObject = {};

    for (const [key, value] of data) {
        jsonObject[key] = value;
    }
    return axios
        .put('/api/module0/fund_type', jsonObject)
        .then(response => {
            generalAlert(response.data.message);
            return response.data;
        }).catch(function(error) {
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
export async function deleteFundType(data) {
    return axios
        .delete("/api/module0/fund_type", {
            data: { FMS_FUNDTYPE_ID: data }
        })
        .then(response => {
            generalAlert(response.data.message);
            return response.data;
        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 401) {
                    servicesModule0.logout();
                } else {
                    return "error"
                }
            }
        });
}
//---------- Fund  Category
export async function getAllFundCategoryList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/fund_categorys', {
        params: {

        },
    }).then(response => {
        console.log(' list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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

export async function createFundCategory(data) {
    await servicesModule0.header();
    return axios.post('/api/module0/fund_category', data).then(response => {
        generalAlert(response.data.message);
        return response.data;
    }).catch(function(error) {
        if (error.response) {
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
export async function getFundCategoryById(data) {
    await servicesModule0.header();
    return axios.get("/api/module0/fund_category", {
        params: {
            AMSF_FUNDCATEGORY_ID: data
        }
    }).then(response => {
        console.log("data :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}

export async function updateFundCategory(data) {
    const jsonObject = {};

    for (const [key, value] of data) {
        jsonObject[key] = value;
    }
    return axios
        .put('/api/module0/fund_category', jsonObject)
        .then(response => {
            generalAlert(response.data.message);
            return response.data;
        }).catch(function(error) {
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
export async function deleteFundCategory(data) {
    return axios
        .delete("/api/module0/fund_category", {
            data: { AMSF_FUNDCATEGORY_ID: data }
        })
        .then(response => {
            generalAlert(response.data.message);
            return response.data;
        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 401) {
                    servicesModule0.logout();
                } else {
                    return "error"
                }
            }
        });
}

// --- fund group
export async function getAllFundGroupList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/fund_groups', {
        params: {

        },
    }).then(response => {
        console.log(' list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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

export async function createFundGroup(data) {
    await servicesModule0.header();
    return axios.post('/api/module0/fund_group', data).then(response => {
        generalAlert(response.data.message);
        return response.data;
    }).catch(function(error) {
        if (error.response) {
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
export async function getFundGroupById(data) {
    await servicesModule0.header();
    return axios.get("/api/module0/fund_group", {
        params: {
            FMS_FUNDCATEGORY_ID: data
        }
    }).then(response => {
        console.log("data :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}

export async function updateFundGroup(data) {
    const jsonObject = {};

    for (const [key, value] of data) {
        jsonObject[key] = value;
    }
    return axios
        .put('/api/module0/fund_group', jsonObject)
        .then(response => {
            generalAlert(response.data.message);
            return response.data;
        }).catch(function(error) {
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
export async function deleteFundGroup(data) {
    return axios
        .delete("/api/module0/fund_group", {
            data: { FMS_FUNDCATEGORY_ID: data }
        })
        .then(response => {
            generalAlert(response.data.message);
            return response.data;
        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 401) {
                    servicesModule0.logout();
                } else {
                    return "error"
                }
            }
        });
}

//----------------- NAV Cut off Time
export async function getNavTimeById(data) {
    await servicesModule0.header();
    return axios.get("/api/module0/fund_cuttime", {
        params: {
            FMS_CUTOFF_TIME_ID: data,
        }
    }).then(response => {
        console.log("days :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}
export async function createNavTime(data) {
    await servicesModule0.header();
    return axios.post('/api/module0/fund_cuttime', data).then(response => {
        Vue.$toast.open({
            message: response.data.message,
            type: 'success',
        }); // console.log("exception create :" + JSON.stringify(response.data));
        return response.data;
    }).catch(function(error) {
        if (error.response) {
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


//--------fund Notes
export async function getAllFundNotesList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/fund_notes', {
        params: {

        },
    }).then(response => {
        console.log(' list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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

export async function createFundNotes(data) {
    await servicesModule0.header();
    return axios.post('/api/module0/fund_note', data).then(response => {
        generalAlert(response.data.message);
        return response.data;
    }).catch(function(error) {
        if (error.response) {
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
export async function getFundNotesById(data) {
    await servicesModule0.header();
    return axios.get("/api/module0/fund_note", {
        params: {
            FUNDNOTES_ID: data
        }
    }).then(response => {
        console.log("data :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}

export async function updateFundNotes(data) {
    const jsonObject = {};

    for (const [key, value] of data) {
        jsonObject[key] = value;
    }
    return axios
        .put('/api/module0/fund_note', jsonObject)
        .then(response => {
            generalAlert(response.data.message);
            return response.data;
        }).catch(function(error) {
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
export async function deleteFundNotes(data) {
    return axios
        .delete("/api/module0/fund_note", {
            data: { FUNDNOTES_ID: data }
        })
        .then(response => {
            generalAlert(response.data.message);
            return response.data;
        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 401) {
                    servicesModule0.logout();
                } else {
                    return "error"
                }
            }
        });
}

//-----fund domicile
export async function getAllFundDomicileList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/fund_domiciles', {
        params: {

        },
    }).then(response => {
        console.log(' list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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

export async function createFundDomicile(data) {
    await servicesModule0.header();
    return axios.post('/api/module0/fund_domicile', data).then(response => {
        Vue.$toast.open({
            message: response.data.message,
            type: 'success',
        }); // console.log("exception create :" + JSON.stringify(response.data));
        return response.data;
    }).catch(function(error) {
        if (error.response) {
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
export async function getFundDomicileById(data) {
    await servicesModule0.header();
    return axios.get("/api/module0/fund_domicile", {
        params: {
            FUND_DOMICILE_ID: data
        }
    }).then(response => {
        console.log("data :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}

export async function updateFundDomicile(data) {
    const jsonObject = {};

    for (const [key, value] of data) {
        jsonObject[key] = value;
    }
    return axios
        .put('/api/module0/fund_domicile', jsonObject)
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
export async function deleteFundDomicile(data) {
    return axios
        .delete("/api/module0/fund_domicile", {
            data: { FUND_DOMICILE_ID: data }
        })
        .then(response => {
            console.log("data :" + JSON.stringify(response.data));
            return response.data;
        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 401) {
                    servicesModule0.logout();
                } else {
                    return "error"
                }
            }
        });
}

//---- fund scheme structure
export async function getAllSchemeList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/fund_schemes', {
        params: {

        },
    }).then(response => {
        console.log(' list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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

export async function createScheme(data) {
    await servicesModule0.header();
    return axios.post('/api/module0/fund_scheme', data).then(response => {
        generalAlert(response.data.message);
        return response.data;
    }).catch(function(error) {
        if (error.response) {
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
export async function getSchemeById(data) {
    await servicesModule0.header();
    return axios.get("/api/module0/fund_scheme", {
        params: {
            FMS_SCHEME_ID: data
        }
    }).then(response => {
        console.log("data :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}

export async function updateScheme(data) {
    const jsonObject = {};

    for (const [key, value] of data) {
        jsonObject[key] = value;
    }
    return axios
        .put('/api/module0/fund_scheme', jsonObject)
        .then(response => {
            generalAlert(response.data.message);
            return response.data;
        }).catch(function(error) {
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
export async function deleteScheme(data) {
    return axios
        .delete("/api/module0/fund_scheme", {
            data: { FMS_SCHEME_ID: data }
        })
        .then(response => {
            generalAlert(response.data.message);
            return response.data;
        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 401) {
                    servicesModule0.logout();
                } else {
                    return "error"
                }
            }
        });
}

//----Remark Option
export async function getAllRemarkList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/fund_remarks', {
        params: {

        },
    }).then(response => {
        console.log(' list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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

export async function createRemark(data) {
    await servicesModule0.header();
    return axios.post('/api/module0/fund_remark', data).then(response => {
        generalAlert(response.data.message);
        return response.data;
    }).catch(function(error) {
        if (error.response) {
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
export async function getRemarkById(data) {
    await servicesModule0.header();
    return axios.get("/api/module0/fund_remark", {
        params: {
            FMS_REMARK_OPTION_ID: data
        }
    }).then(response => {
        console.log("data :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}

export async function updateRemark(data) {
    const jsonObject = {};

    for (const [key, value] of data) {
        jsonObject[key] = value;
    }
    return axios
        .put('/api/module0/fund_remark', jsonObject)
        .then(response => {
            generalAlert(response.data.message);
            return response.data;
        }).catch(function(error) {
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
export async function deleteRemark(data) {
    return axios
        .delete("/api/module0/fund_remark", {
            data: { FMS_REMARK_OPTION_ID: data }
        })
        .then(response => {
            generalAlert(response.data.message);
            return response.data;
        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 401) {
                    servicesModule0.logout();
                } else {
                    return "error"
                }
            }
        });
}

// Reason Option

export async function getAllReasonList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/fund_reasons', {
        params: {

        },
    }).then(response => {
        console.log(' list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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

export async function createReason(data) {
    await servicesModule0.header();
    return axios.post('/api/module0/fund_reason', data).then(response => {
        generalAlert(response.data.message);
        return response.data;
    }).catch(function(error) {
        if (error.response) {
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
export async function getReasonById(data) {
    await servicesModule0.header();
    return axios.get("/api/module0/fund_reason", {
        params: {
            FMS_REASON_OPTION_ID: data
        }
    }).then(response => {
        console.log("data :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}

export async function updateReason(data) {
    const jsonObject = {};

    for (const [key, value] of data) {
        jsonObject[key] = value;
    }
    return axios
        .put('/api/module0/fund_reason', jsonObject)
        .then(response => {
            generalAlert(response.data.message);
            return response.data;
        }).catch(function(error) {
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
export async function deleteReason(data) {
    return axios
        .delete("/api/module0/fund_reason", {
            data: { FMS_REASON_OPTION_ID: data }
        })
        .then(response => {
            generalAlert(response.data.message);
            return response.data;
        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 401) {
                    servicesModule0.logout();
                } else {
                    return "error"
                }
            }
        });
}

//-------Distributor Fee
export async function getAllDistributorTypeeList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/dist_fee_type', {
        params: {

        },
    }).then(response => {
        console.log(' list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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

export async function getAllDistributorFeeList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/dist_fees', {
        params: {

        },
    }).then(response => {
        console.log(' list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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
export async function createDistributorFee(data) {
    await servicesModule0.header();
    return axios.post('/api/module0/dist_fee', data).then(response => {
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
export async function getDistFeeById(data) {
    await servicesModule0.header();
    return axios.get("/api/module0/dist_fee", {
        params: {
            DISTRIBUTOR_FEE_ID: data
        }
    }).then(response => {
        //console.log("data :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}

export async function updateDistFee(data) {
    const jsonObject = {};

    for (const [key, value] of data) {
        jsonObject[key] = value;
    }
    return axios
        .put('/api/module0/dist_fee', jsonObject)
        .then(response => {
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
export async function deleteDistFee(data) {
    return axios
        .delete("/api/module0/dist_fee", {
            data: { DISTRIBUTOR_FEE_ID: data }
        })
        .then(response => {
            Vue.$toast.open({
                message: response.data.message,
                type: 'success',
            });
            return response.data;
        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 401) {
                    servicesModule0.logout();
                } else {
                    return "error"
                }
            }
        });
}

//---------- Waiver Fee

export async function getAllWaiverConsultantTypeList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/waiver_cons_type', {
        params: {
            CONSULTANT_TYPE_ID: data
        },
    }).then(response => {
        //console.log(' list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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
export async function getAllWaiverExamTypeList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/waiver_exam_type', {
        params: {

        },
    }).then(response => {
        //console.log(' list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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

export async function getAllWaiverFeeTypeList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/fee_type', {
        params: {
            SET_TYPE: data
        },
    }).then(response => {
        //console.log(' list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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
export async function getAllWaiverTypeList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/waiver_type', {
        params: {

        },
    }).then(response => {
        //console.log(' list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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

export async function getAllWaiverFeeList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/waiver_fees', {
        params: {

        },
    }).then(response => {
        //console.log(' list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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
export async function createWaiverFee(data) {
    await servicesModule0.header();
    return axios.post('/api/module0/waiver_fee', data).then(response => {
        // console.log("exception create :" + JSON.stringify(response.data));
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
export async function getWaiverFeeById(data) {
    await servicesModule0.header();
    return axios.get("/api/module0/waiver_fee", {
        params: {
            WAIVER_FEE_ID: data
        }
    }).then(response => {
        //console.log("data :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}

export async function updateWaiverFee(data) {
    const jsonObject = {};

    for (const [key, value] of data) {
        jsonObject[key] = value;
    }
    return axios
        .put('/api/module0/waiver_fee', jsonObject)
        .then(response => {
            Vue.$toast.open({
                message: response.data.message,
                type: 'success',
            });
            //console.log('data :' + JSON.stringify(response.data));
            return response.data;
        }).catch(function(error) {
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
export async function deleteWaiverFee(data) {
    return axios
        .delete("/api/module0/waiver_fee", {
            data: { WAIVER_FEE_ID: data }
        })
        .then(response => {
            //console.log("data :" + JSON.stringify(response.data));
            Vue.$toast.open({
                message: response.data.message,
                type: 'success',
            });
            return response.data;
        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 401) {
                    servicesModule0.logout();
                } else {
                    return "error"
                }
            }
        });
}

//---------------- Consultant Fee


export async function getAllConsultantsTypeList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/cons_type_fee', {
        params: {
            CONSULTANT_TYPE_ID: data,
        },
    }).then(response => {
        //console.log(' list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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
export async function getAllConsExamTypeList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/cons_exam_type', {
        params: {
            CONSULTANT_EXAM_TYPE_ID: data,
        },
    }).then(response => {
        //console.log(' list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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

export async function getAllConsFeeList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/cons_fees', {
        params: {

        },
    }).then(response => {
        //console.log(' list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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
export async function createConsFee(data) {
    await servicesModule0.header();
    return axios.post('/api/module0/cons_fee', data).then(response => {
        // console.log("exception create :" + JSON.stringify(response.data));
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
export async function getConsFeeById(data) {
    await servicesModule0.header();
    return axios.get("/api/module0/cons_fee", {
        params: {
            CONSULTANT_FEE_ID: data
        }
    }).then(response => {
        //console.log("data :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}

export async function updateConsFee(data) {
    const jsonObject = {};

    for (const [key, value] of data) {
        jsonObject[key] = value;
    }
    return axios
        .put('/api/module0/cons_fee', jsonObject)
        .then(response => {
            Vue.$toast.open({
                message: response.data.message,
                type: 'success',
            });
            //console.log('data :' + JSON.stringify(response.data));
            return response.data;
        }).catch(function(error) {
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
export async function deleteConsFee(data) {
    return axios
        .delete("/api/module0/cons_fee", {
            data: { CONSULTANT_FEE_ID: data }
        })
        .then(response => {
            //console.log("data :" + JSON.stringify(response.data));
            Vue.$toast.open({
                message: response.data.message,
                type: 'success',
            });
            return response.data;
        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 401) {
                    servicesModule0.logout();
                } else {
                    return "error"
                }
            }
        });
}


//-------Annual Fee Invoice

export async function getAllAnnualInvoiceList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/annual_invoices', {
        params: {

        },
    }).then(response => {
        console.log(' list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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
export async function createAnnualInvoice(data) {
    await servicesModule0.header();
    return axios.post('/api/module0/annual_invoice', data).then(response => {
        // console.log("exception create :" + JSON.stringify(response.data));
        Vue.$toast.open({
            message: response.data.message,
            type: 'success',
        });
        return response.data;
    }).catch(function(error) {
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
export async function getAnnualInvoiceById(data) {
    await servicesModule0.header();
    return axios.get("/api/module0/annual_invoice", {
        params: {
            ANNUAL_FEE_INVOICE_ID: data
        }
    }).then(response => {
        //console.log("data :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}

export async function updateAnnualInvoice(data) {
    const jsonObject = {};

    for (const [key, value] of data) {
        jsonObject[key] = value;
    }
    return axios
        .put('/api/module0/annual_invoice', jsonObject)
        .then(response => {
            //console.log('data :' + JSON.stringify(response.data));
            Vue.$toast.open({
                message: response.data.message,
                type: 'success',
            });
            return response.data;
        }).catch(function(error) {
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
export async function deleteAnnualInvoice(data) {
    return axios
        .delete("/api/module0/annual_invoice", {
            data: { ANNUAL_FEE_INVOICE_ID: data }
        })
        .then(response => {
            //console.log("data :" + JSON.stringify(response.data));
            Vue.$toast.open({
                message: response.data.message,
                type: 'success',
            });
            return response.data;
        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 401) {
                    servicesModule0.logout();
                } else {
                    return "error"
                }
            }
        });
}

//-------- FMS Nav Cut off Time
export async function createFmsCutTimeDate(data) {
    const jsonObject = {};

    for (const [key, value] of data) {
        jsonObject[key] = value;
    }
    return axios
        .put('/api/module0/fund_cuttime', jsonObject)
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


export async function getFmsCutTimeById(data) {
    await servicesModule0.header();
    return axios.get("/api/module0/fund_cuttime", {
        params: {
            FMS_CUTOFF_TIME_ID: data,
        }
    }).then(response => {
        console.log("data cut off date :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}

//-------- FMS Umbrella Fund

export async function getAllUmbrellafundList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/umbrella_funds', {
        params: {

        },
    }).then(response => {
        console.log(' list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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

export async function getAllUmbrellafundLists() {
    return axios.get('/api/module0/umbrella_funds').then(response => {
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

export async function createUmbrellafund(data) {
    await servicesModule0.header();
    return axios.post('/api/module0/umbrella_fund', data).then(response => {
        generalAlert(response.data.message);
        return response.data;
    }).catch(function(error) {
        if (error.response) {
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
export async function getUmbrellafundById(data) {
    await servicesModule0.header();
    return axios.get("/api/module0/umbrella_fund", {
        params: {
            FMS_UMBRELLA_FUND_ID: data
        }
    }).then(response => {
        console.log("data :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}

export async function updateUmbrellafund(data) {
    const jsonObject = {};

    for (const [key, value] of data) {
        jsonObject[key] = value;
    }
    return axios
        .put('/api/module0/umbrella_fund', jsonObject)
        .then(response => {
            generalAlert(response.data.message);
            return response.data;
        }).catch(function(error) {
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
export async function deleteUmbrellafund(data) {
    return axios
        .delete("/api/module0/umbrella_fund", {
            data: { FMS_UMBRELLA_FUND_ID: data }
        })
        .then(response => {
            generalAlert(response.data.message);
            return response.data;
        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 401) {
                    servicesModule0.logout();
                } else {
                    return "error"
                }
            }
        });
}

// -------Login Setting

export async function getBLoginSettingyById(data) {
    await servicesModule0.header();
    return axios.get("/api/module0/login_setting", {
        params: {
            LOGIN_SETTING_ID: data,
        }
    }).then(response => {
        console.log("days :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}
export async function createLoginSetting(data) {
    await servicesModule0.header();
    return axios.post('/api/module0/login_setting', data).then(response => {
        // console.log("exception create :" + JSON.stringify(response.data));
        Vue.$toast.open({
            message: response.data.message,
            type: 'success',
        });
        return response.data;
    }).catch(function(error) {
        if (error.response) {
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

// System Block duration

export async function getSystemBlockById(data) {
    await servicesModule0.header();
    return axios.get("/api/module0/login_duration", {
        params: {
            SYSTEM_BLOCK_DURATION_ID: data,
        }
    }).then(response => {
        console.log("days :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}
export async function createBlockDuration(data) {
    await servicesModule0.header();
    return axios.post('/api/module0/login_duration', data).then(response => {
        // console.log("exception create :" + JSON.stringify(response.data));
        Vue.$toast.open({
            message: response.data.message,
            type: 'success',
        });
        return response.data;
    }).catch(function(error) {
        if (error.response) {
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

//----- Idle Session (Login)
export async function getIdleById(data) {
    await servicesModule0.header();
    return axios.get("/api/module0/login_session", {
        params: {
            LOGIN_IDLE_SESSION_ID: data,
        }
    }).then(response => {
        console.log("days :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}
export async function createIdle(data) {
    await servicesModule0.header();
    return axios.post('/api/module0/login_session', data).then(response => {
        // console.log("exception create :" + JSON.stringify(response.data));
        Vue.$toast.open({
            message: response.data.message,
            type: 'success',
        });
        return response.data;
    }).catch(function(error) {
        if (error.response) {
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

//--- Password History

export async function getPasswordHistoryById(data) {
    await servicesModule0.header();
    return axios.get("/api/module0/password_history", {
        params: {
            PASSWORD_HISTORY_ID: data,
        }
    }).then(response => {
        console.log("days :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}
export async function createPasswordHistory(data) {
    await servicesModule0.header();
    return axios.post('/api/module0/password_history', data).then(response => {
        // console.log("exception create :" + JSON.stringify(response.data));
        Vue.$toast.open({
            message: response.data.message,
            type: 'success',
        });
        return response.data;
    }).catch(function(error) {
        if (error.response) {
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
// ------- Security Question Insert
export async function createSecurityQuestion(data) {
    await servicesModule0.header();
    return axios.post('/api/module0/security_question', data).then(response => {
        // console.log("exception create :" + JSON.stringify(response.data));
        Vue.$toast.open({
            message: response.data.message,
            type: 'success',
        });
        return response.data;
    }).catch(function(error) {
        if (error.response) {
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
// ------- Security Question
export async function getSecurityQuestionById(data) {
    await servicesModule0.header();
    return axios.get("/api/module0/security_question", {
        params: {
            SECURITY_ID: data,
        }
    }).then(response => {
        console.log("days :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}

// ------- Security Question Update
export async function updateSecurityQuestion(data) {
    return axios.post('/api/module0/security_question_update', data).then(response => {
        console.log('data :' + JSON.stringify(response.data));
        Vue.$toast.open({
            message: response.data.message,
            type: 'success',
        });
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
// ------- Security Question Delete
export async function deleteSecurityQuestion(data) {
    if (confirm("Do you really want to delete?")) {
        return axios
            .delete('/api/module0/security_question', {
                data: { SECURITY_ID: data },
            })
            .then(response => {
                console.log('data :' + JSON.stringify(response.data));
                Vue.$toast.open({
                    message: response.data.message,
                    type: 'success',
                });
                return response.data;
            }).catch(function(error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    if (error.response.status == 401) {
                        logout();
                    } else {
                        return 'error'
                    }
                }
            });
    }
}
// ------- Password Default
export async function getPasswordDefaultById(data) {
    await servicesModule0.header();
    return axios.get("/api/module0/password_default", {
        params: {
            PASSWORD_DEFAULT_ID: data,
        }
    }).then(response => {
        console.log("days :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}
export async function createPasswordDefault(data) {
    await servicesModule0.header();
    return axios.post('/api/module0/password_default', data).then(response => {
        // console.log("exception create :" + JSON.stringify(response.data));
        Vue.$toast.open({
            message: response.data.message,
            type: 'success',
        });
        return response.data;
    }).catch(function(error) {
        if (error.response) {
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

//--------- Dist Manage Group

export async function getAllDistManageGroupList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/dist_manage_groups', {
        params: {

        },
    }).then(response => {
        console.log(' list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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

export async function createDistManageGroup(data) {
    await servicesModule0.header();
    return axios.post('/api/module0/dist_manage_group', data).then(response => {
        console.log("exception create :" + JSON.stringify(response.data));
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
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 500) {
                console.log(JSON.stringify(error.response.data.message));
                if (error.response.data.message == 'Token expired.') {} else {
                    console.log(error.response.data.message);
                }
            } else if (error.response.status == 401) {
                servicesModule0.logout();
            }
            return 'error';
        }
    });
}
export async function getDistManageGroupById(data) {
    await servicesModule0.header();
    return axios.get("/api/module0/dist_manage_group", {
        params: {
            DISTRIBUTOR_MANAGE_GROUP_ID: data
        }
    }).then(response => {
        console.log("data :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}

export async function updateDistManageGroup(data) {
    const jsonObject = {};

    for (const [key, value] of data) {
        jsonObject[key] = value;
    }
    return axios
        .put('/api/module0/dist_manage_group', jsonObject)
        .then(response => {
            //console.log('data :' + JSON.stringify(response.data));
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
export async function deleteDistManageGroup(data) {
    return axios
        .delete("/api/module0/dist_manage_group", {
            data: { DISTRIBUTOR_MANAGE_GROUP_ID: data }
        })
        .then(response => {
            //console.log("data :" + JSON.stringify(response.data));
            Vue.$toast.open({
                message: response.data.message,
                type: 'success',
            });
            return response.data;
        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 401) {
                    servicesModule0.logout();
                } else {
                    return "error"
                }
            }
        });
}

//--------- Dist Module

export async function getAllDistManageModuleList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/dist_manage_modules', {
        params: {

        },
    }).then(response => {
        console.log(' list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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

export async function createDistManageModule(data) {
    await servicesModule0.header();
    return axios.post('/api/module0/dist_manage_module', data).then(response => {
        // console.log("exception create :" + JSON.stringify(response.data));
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
export async function getDistManageModuleById(data) {
    await servicesModule0.header();
    return axios.get("/api/module0/dist_manage_module", {
        params: {
            DISTRIBUTOR_MANAGE_MODULE_ID: data
        }
    }).then(response => {
        console.log("data :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}

export async function updateDistManageModule(data) {
    const jsonObject = {};

    for (const [key, value] of data) {
        jsonObject[key] = value;
    }
    return axios
        .put('/api/module0/dist_manage_module', jsonObject)
        .then(response => {
            //console.log('data :' + JSON.stringify(response.data));
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
export async function deleteDistManageModule(data) {
    return axios
        .delete("/api/module0/dist_manage_module", {
            data: { DISTRIBUTOR_MANAGE_MODULE_ID: data }
        })
        .then(response => {
            //console.log("data :" + JSON.stringify(response.data));
            Vue.$toast.open({
                message: response.data.message,
                type: 'success',
            });
            return response.data;
        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 401) {
                    servicesModule0.logout();
                } else {
                    return "error"
                }
            }
        });
}

// --- Dist Manage Submodule

export async function getAllDistModuleList() {
    await servicesModule0.header();
    return axios.get('/api/module0/dist_get_module').then(response => {
        //console.log(' list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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


export async function getAllDistManageSubModuleList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/dist_manage_submodules', {
        params: {

        },
    }).then(response => {
        console.log(' list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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

export async function createDistManageSubModule(data) {
    await servicesModule0.header();
    return axios.post('/api/module0/dist_manage_submodule', data).then(response => {
        // console.log("exception create :" + JSON.stringify(response.data));
        Vue.$toast.open({
            message: response.data.message,
            type: 'success',
        });
        return response.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            Vue.$toast.open({
                message: error.response.data.message,
                type: 'error',
            });
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
export async function getDistManageSubModuleById(data) {
    await servicesModule0.header();
    return axios.get("/api/module0/dist_manage_submodule", {
        params: {
            DISTRIBUTOR_MANAGE_SUBMODULE_ID: data
        }
    }).then(response => {
        //console.log("data :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}

export async function updateDistManageSubModule(data) {
    const jsonObject = {};

    for (const [key, value] of data) {
        jsonObject[key] = value;
    }
    return axios
        .put('/api/module0/dist_manage_submodule', jsonObject)
        .then(response => {
            //console.log('data :' + JSON.stringify(response.data));
            Vue.$toast.open({
                message: response.data.message,
                type: 'success',
            });
            return response.data;
        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: 'error',
                });
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
export async function deleteDistManageSubModule(data) {
    return axios
        .delete("/api/module0/dist_manage_submodule", {
            data: { DISTRIBUTOR_MANAGE_SUBMODULE_ID: data }
        })
        .then(response => {
            //console.log("data :" + JSON.stringify(response.data));
            Vue.$toast.open({
                message: response.data.message,
                type: 'success',
            });
            return response.data;
        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 401) {
                    servicesModule0.logout();
                } else {
                    return "error"
                }
            }
        });
}
//------------------ Dist Manage screen Page

export async function getAllDistsubModuleList() {
    await servicesModule0.header();
    return axios.get('/api/module0/dist_get_submodule').then(response => {
        //console.log(' list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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
export async function getAllDistProcessFlowList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/dist_get_processflow', {
        params: {
            PROCESS_FLOW_ID: data
        },
    }).then(response => {
        console.log(' list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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


export async function getAllDistManageScreenList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/dist_manage_screens', {
        params: {

        },
    }).then(response => {
        console.log(' list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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

export async function createDistManageScreen(data) {
    await servicesModule0.header();
    return axios.post('/api/module0/dist_manage_screen', data).then(response => {
        // console.log("exception create :" + JSON.stringify(response.data));
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
export async function getDistManageScreenById(data) {
    await servicesModule0.header();
    return axios.get("/api/module0/dist_manage_screen", {
        params: {
            DISTRIBUTOR_MANAGE_SCREEN_ID: data
        }
    }).then(response => {
        //console.log("data :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}

export async function updateDistManageScreen(data) {
    const jsonObject = {};

    for (const [key, value] of data) {
        jsonObject[key] = value;
    }
    return axios
        .put('/api/module0/dist_manage_screen', jsonObject)
        .then(response => {
            //console.log('data :' + JSON.stringify(response.data));
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
export async function deleteDistManageScreen(data) {
    return axios
        .delete("/api/module0/dist_manage_screen", {
            data: { DISTRIBUTOR_MANAGE_SCREEN_ID: data }
        })
        .then(response => {
            //console.log("data :" + JSON.stringify(response.data));
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
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 401) {
                    servicesModule0.logout();
                } else {
                    return "error"
                }
            }
        });
}

//-------------------------- Dist Screen Access
export async function getScreen(moduleSelection, submoduleSelection) {
    await servicesModule0.header();
    return axios.get('/api/module0/dist_manage_screens', {
        params: {
            DISTRIBUTOR_MANAGE_SUBMODULE_ID: submoduleSelection,
            DISTRIBUTOR_MANAGE_MODULE_ID: moduleSelection
        },
    }).then(response => {
        //console.log('data :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
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

export async function getAllDistAuthLevelList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/dist_screen_access_auth', {
        params: {
            AUTHORIZATION_LEVEL_ID: data
        },
    }).then(response => {
        console.log(' list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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
export async function getAllDistAuthPageList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/dist_screen_access_authpage', {
        params: {

        },
    }).then(response => {
        console.log(' list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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
export async function getAllDistUser(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/dist_screen_access_user', {
        params: {
            USER_ID: data
        },
    }).then(response => {
        console.log(' list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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

export async function createScreenAccess(data) {
    await servicesModule0.header();
    return axios.post('/api/module0/dist_screen_access', data).then(response => {
        // console.log("exception create :" + JSON.stringify(response.data));
        Vue.$toast.open({
            message: response.data.message,
            type: 'success',
        });
        return response.data;
    }).catch(function(error) {
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

export async function getDistScreenAuthPageById(data) {
    await servicesModule0.header();
    return axios.get("/api/module0/dist_screen_access", {
        params: {
            DISTRIBUTOR_SCREEN_ACCESS_ID: data
        }
    }).then(response => {
        //console.log("data :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}

export async function updateDistManageScreenAccess(data) {
    const jsonObject = {};

    for (const [key, value] of data) {
        jsonObject[key] = value;
    }
    return axios
        .put('/api/module0/dist_screen_access', jsonObject)
        .then(response => {
            //console.log('data :' + JSON.stringify(response.data));
            Vue.$toast.open({
                message: response.data.message,
                type: 'success',
            });
            return response.data;
        }).catch(function(error) {
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

export async function deleteDistAccess(data) {
    return axios
        .delete("/api/module0/dist_screen_access", {
            data: { DISTRIBUTOR_SCREEN_ACCESS_ID: data }
        })
        .then(response => {
            //console.log("data :" + JSON.stringify(response.data));
            Vue.$toast.open({
                message: response.data.message,
                type: 'success',
            });
            return response.data;
        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 401) {
                    servicesModule0.logout();
                } else {
                    return "error"
                }
            }
        });
}







//---------------------------------

// Consultant Manage Group
export async function getAllConsManageGroupList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/cons_manage_groups', {
        params: {

        },
    }).then(response => {
        //console.log(' list :' + JSON.stringify(response.data.data));

        return response.data.data;
    }).catch(function(error) {
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

export async function createConsManageGroup(data) {
    await servicesModule0.header();
    return axios.post('/api/module0/cons_manage_group', data).then(response => {
        // console.log("exception create :" + JSON.stringify(response.data));
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
export async function getConsManageGroupById(data) {
    await servicesModule0.header();
    return axios.get("/api/module0/cons_manage_group", {
        params: {
            CONSULTANT_MANAGE_GROUP_ID: data
        }
    }).then(response => {
        console.log("data :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}

export async function updateConsManageGroup(data) {
    const jsonObject = {};

    for (const [key, value] of data) {
        jsonObject[key] = value;
    }
    return axios
        .put('/api/module0/cons_manage_group', jsonObject)
        .then(response => {
            //console.log('data :' + JSON.stringify(response.data));
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
export async function deleteConsManageGroup(data) {
    return axios
        .delete("/api/module0/cons_manage_group", {
            data: { CONSULTANT_MANAGE_GROUP_ID: data }
        })
        .then(response => {
            //console.log("data :" + JSON.stringify(response.data));
            Vue.$toast.open({
                message: response.data.message,
                type: 'success',
            });
            return response.data;
        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 401) {
                    servicesModule0.logout();
                } else {
                    return "error"
                }
            }
        });
}

//---------- Cons Manage Module

export async function getAllConsManageModuleList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/cons_manage_modules', {
        params: {

        },
    }).then(response => {
        console.log(' list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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

export async function createConsManageModule(data) {
    await servicesModule0.header();
    return axios.post('/api/module0/cons_manage_module', data).then(response => {
        // console.log("exception create :" + JSON.stringify(response.data));
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
export async function getConsManageModuleById(data) {
    await servicesModule0.header();
    return axios.get("/api/module0/cons_manage_module", {
        params: {
            CONSULTANT_MANAGE_MODULE_ID: data
        }
    }).then(response => {
        console.log("data :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}

export async function updateConsManageModule(data) {
    const jsonObject = {};

    for (const [key, value] of data) {
        jsonObject[key] = value;
    }
    return axios
        .put('/api/module0/cons_manage_module', jsonObject)
        .then(response => {
            //console.log('data :' + JSON.stringify(response.data));
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
export async function deleteConsManageModule(data) {
    return axios
        .delete("/api/module0/cons_manage_module", {
            data: { CONSULTANT_MANAGE_MODULE_ID: data }
        })
        .then(response => {
            //console.log("data :" + JSON.stringify(response.data));
            Vue.$toast.open({
                message: response.data.message,
                type: 'success',
            });
            return response.data;
        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 401) {
                    servicesModule0.logout();
                } else {
                    return "error"
                }
            }
        });
}

//----------- COns Manage Submodule

export async function getAllConsModuleList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/cons_get_module', {
        params: {
            CONSULTANT_MANAGE_MODULE_ID: data
        },
    }).then(response => {
        console.log(' list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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


export async function getAllConsManageSubModuleList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/cons_manage_submodules', {
        params: {

        },
    }).then(response => {
        console.log(' list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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

export async function getConsManageSubModuleByModule(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/cons_manage_submodules_by_module', {
        params: {
            CONSULTANT_MANAGE_MODULE_ID: data
        },
    }).then(response => {
        console.log(' list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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




export async function createConsManageSubModule(data) {
    await servicesModule0.header();
    return axios.post('/api/module0/cons_manage_submodule', data).then(response => {
        // console.log("exception create :" + JSON.stringify(response.data));
        Vue.$toast.open({
            message: response.data.message,
            type: 'success',
        });
        return response.data;
    }).catch(function(error) {
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
export async function getConsManageSubModuleById(data) {
    await servicesModule0.header();
    return axios.get("/api/module0/cons_manage_submodule", {
        params: {
            CONSULTANT_MANAGE_SUBMODULE_ID: data
        }
    }).then(response => {
        //console.log("data :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}

export async function updateConsManageSubModule(data) {
    const jsonObject = {};

    for (const [key, value] of data) {
        jsonObject[key] = value;
    }
    return axios
        .put('/api/module0/cons_manage_submodule', jsonObject)
        .then(response => {
            //console.log('data :' + JSON.stringify(response.data));
            Vue.$toast.open({
                message: response.data.message,
                type: 'success',
            });
            return response.data;
        }).catch(function(error) {
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
export async function deleteConsManageSubModule(data) {
    return axios
        .delete("/api/module0/cons_manage_submodule", {
            data: { CONSULTANT_MANAGE_SUBMODULE_ID: data }
        })
        .then(response => {
            //console.log("data :" + JSON.stringify(response.data));
            Vue.$toast.open({
                message: response.data.message,
                type: 'success',
            });
            return response.data;
        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 401) {
                    servicesModule0.logout();
                } else {
                    return "error"
                }
            }
        });
}

//------- Cons Manage Screen Page

export async function getAllConssubModuleList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/cons_get_submodule', {
        params: {
            CONSULTANT_MANAGE_SUBMODULE_ID: data
        },
    }).then(response => {
        console.log(' list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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
export async function getAllConsProcessFlowList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/cons_get_processflow', {
        params: {
            PROCESS_FLOW_ID: data
        },
    }).then(response => {
        console.log(' list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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


export async function getAllConsManageScreenList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/cons_manage_screens', {
        params: {

        },
    }).then(response => {
        console.log(' list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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

export async function getConsManageScreenByModule(module, submodule) {
    await servicesModule0.header();
    return axios.get('/api/module0/cons_manage_screens_by_module', {
        params: {
            CONSULTANT_MANAGE_MODULE_ID: module,
            CONSULTANT_MANAGE_SUBMODULE_ID: submodule
        },
    }).then(response => {
        console.log(' list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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

export async function createConsManageScreen(data) {
    await servicesModule0.header();
    return axios.post('/api/module0/cons_manage_screen', data).then(response => {
        // console.log("exception create :" + JSON.stringify(response.data));
        Vue.$toast.open({
            message: response.data.message,
            type: 'success',
        });
        return response.data;
    }).catch(function(error) {
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
export async function getConsManageScreenById(data) {
    await servicesModule0.header();
    return axios.get("/api/module0/cons_manage_screen", {
        params: {
            CONSULTANT_MANAGE_SCREEN_ID: data
        }
    }).then(response => {
        console.log("data :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}

export async function updateConsManageScreen(data) {
    const jsonObject = {};

    for (const [key, value] of data) {
        jsonObject[key] = value;
    }
    return axios
        .put('/api/module0/cons_manage_screen', jsonObject)
        .then(response => {
            //console.log('data :' + JSON.stringify(response.data));
            Vue.$toast.open({
                message: response.data.message,
                type: 'success',
            });
            return response.data;
        }).catch(function(error) {
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
export async function deleteConsManageScreen(data) {
    return axios
        .delete("/api/module0/cons_manage_screen", {
            data: { CONSULTANT_MANAGE_SCREEN_ID: data }
        })
        .then(response => {
            //console.log("data :" + JSON.stringify(response.data));
            Vue.$toast.open({
                message: response.data.message,
                type: 'success',
            });
            return response.data;
        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 401) {
                    servicesModule0.logout();
                } else {
                    return "error"
                }
            }
        });
}

//----------------------- Cons Screen Access
export async function createConsScreenAccess(data) {
    await servicesModule0.header();
    return axios.post('/api/module0/cons_screen_access', data).then(response => {
        // console.log("exception create :" + JSON.stringify(response.data));
        Vue.$toast.open({
            message: response.data.message,
            type: 'success',
        });
        return response.data;
    }).catch(function(error) {
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

export async function getConsScreenAuthPageById(data) {
    await servicesModule0.header();
    return axios.get("/api/module0/cons_screen_access", {
        params: {
            COSULTANT_SCREEN_ACCESS_ID: data
        }
    }).then(response => {
        console.log("data :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}

export async function updateConsManageScreenAccess(data) {
    const jsonObject = {};

    for (const [key, value] of data) {
        jsonObject[key] = value;
    }
    return axios
        .put('/api/module0/cons_screen_access', jsonObject)
        .then(response => {
            //console.log('data :' + JSON.stringify(response.data));
            Vue.$toast.open({
                message: response.data.message,
                type: 'success',
            });
            return response.data;
        }).catch(function(error) {
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

export async function getAllConsAuthPageList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/cons_screen_access_authpage', {
        params: {

        },
    }).then(response => {
        console.log(' list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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

export async function deleteConsultantAccess(data) {
    return axios
        .delete("/api/module0/cons_screen_access", {
            data: { CONSULTANT_SCREEN_ACCESS_ID: data }
        })
        .then(response => {
            //console.log("data :" + JSON.stringify(response.data));
            Vue.$toast.open({
                message: response.data.message,
                type: 'success',
            });
            return response.data;
        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 401) {
                    servicesModule0.logout();
                } else {
                    return "error"
                }
            }
        });
}















//-----------------------

//------------------------------ 3rd Party Manage Group------------------

export async function getAllThirdManageGroupList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/third_manage_groups', {
        params: {

        },
    }).then(response => {
        console.log(' list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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

export async function createThirdManageGroup(data) {
    await servicesModule0.header();
    return axios.post('/api/module0/third_manage_group', data).then(response => {
        // console.log("exception create :" + JSON.stringify(response.data));
        Vue.$toast.open({
            message: response.data.message,
            type: 'success',
        });
        return response.data;
    }).catch(function(error) {
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
export async function getThirdManageGroupById(data) {
    await servicesModule0.header();
    return axios.get("/api/module0/third_manage_group", {
        params: {
            THIRDPARTY_MANAGE_GROUP_ID: data
        }
    }).then(response => {
        //console.log("data :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}

export async function updateThirdManageGroup(data) {
    const jsonObject = {};

    for (const [key, value] of data) {
        jsonObject[key] = value;
    }
    return axios
        .put('/api/module0/third_manage_group', jsonObject)
        .then(response => {
            //console.log('data :' + JSON.stringify(response.data));
            Vue.$toast.open({
                message: response.data.message,
                type: 'success',
            });
            return response.data;
        }).catch(function(error) {
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
export async function deleteThirdManageGroup(data) {
    return axios
        .delete("/api/module0/third_manage_group", {
            data: { THIRDPARTY_MANAGE_GROUP_ID: data }
        })
        .then(response => {
            //console.log("data :" + JSON.stringify(response.data));
            Vue.$toast.open({
                message: response.data.message,
                type: 'success',
            });
            return response.data;
        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 401) {
                    servicesModule0.logout();
                } else {
                    return "error"
                }
            }
        });
}

//------------ Third Party manage module

export async function getAllThirdManageModuleList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/third_manage_modules', {
        params: {

        },
    }).then(response => {
        //console.log(' list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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

export async function createThirdManageModule(data) {
    await servicesModule0.header();
    return axios.post('/api/module0/third_manage_module', data).then(response => {
        // console.log("exception create :" + JSON.stringify(response.data));
        Vue.$toast.open({
            message: response.data.message,
            type: 'success',
        });
        return response.data;
    }).catch(function(error) {
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
export async function getThirdManageModuleById(data) {
    await servicesModule0.header();
    return axios.get("/api/module0/Third_manage_module", {
        params: {
            THIRDPARTY_MANAGE_MODULE_ID: data
        }
    }).then(response => {
        //console.log("data :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                //servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}

export async function updateThirdManageModule(data) {
    const jsonObject = {};

    for (const [key, value] of data) {
        jsonObject[key] = value;
    }
    return axios
        .put('/api/module0/third_manage_module', jsonObject)
        .then(response => {
            //console.log('data :' + JSON.stringify(response.data));
            Vue.$toast.open({
                message: response.data.message,
                type: 'success',
            });
            return response.data;
        }).catch(function(error) {
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
export async function deleteThirdManageModule(data) {
    return axios
        .delete("/api/module0/third_manage_module", {
            data: { THIRDPARTY_MANAGE_MODULE_ID: data }
        })
        .then(response => {
            //console.log("data :" + JSON.stringify(response.data));
            Vue.$toast.open({
                message: response.data.message,
                type: 'success',
            });
            return response.data;
        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 401) {
                    servicesModule0.logout();
                } else {
                    return "error"
                }
            }
        });
}

//------------- third party manage submodule

export async function getAllThirdModuleList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/third_get_module', {
        params: {
            THIRDPARTY_MANAGE_MODULE_ID: data
        },
    }).then(response => {
        //console.log(' list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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


export async function getAllThirdManageSubModuleList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/third_manage_submodules', {
        params: {

        },
    }).then(response => {
        //console.log(' list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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

export async function getThirdManageSubModuleByModule(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/third_manage_submodules_by_Module', {
        params: {
            THIRDPARTY_MANAGE_MODULE_ID: data
        },
    }).then(response => {
        //console.log(' list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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



export async function createThirdManageSubModule(data) {
    await servicesModule0.header();
    return axios.post('/api/module0/third_manage_submodule', data).then(response => {
        // console.log("exception create :" + JSON.stringify(response.data));
        Vue.$toast.open({
            message: response.data.message,
            type: 'success',
        });
        return response.data;
    }).catch(function(error) {
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
export async function getThirdManageSubModuleById(data) {
    await servicesModule0.header();
    return axios.get("/api/module0/third_manage_submodule", {
        params: {
            THIRDPARTY_SUBMODULE_ID: data
        }
    }).then(response => {
        //console.log("data :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}

export async function updateThirdManageSubModule(data) {
    const jsonObject = {};

    for (const [key, value] of data) {
        jsonObject[key] = value;
    }
    return axios
        .put('/api/module0/third_manage_submodule', jsonObject)
        .then(response => {
            //console.log('data :' + JSON.stringify(response.data));
            Vue.$toast.open({
                message: response.data.message,
                type: 'success',
            });
            return response.data;
        }).catch(function(error) {
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
export async function deleteThirdManageSubModule(data) {
    return axios
        .delete("/api/module0/third_manage_submodule", {
            data: { THIRDPARTY_SUBMODULE_ID: data }
        })
        .then(response => {
            //console.log("data :" + JSON.stringify(response.data));
            Vue.$toast.open({
                message: response.data.message,
                type: 'success',
            });
            return response.data;
        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 401) {
                    servicesModule0.logout();
                } else {
                    return "error"
                }
            }
        });
}

export async function getThirManageScreenByModule(module, submodule) {
    await servicesModule0.header();
    return axios.get('/api/module0/third_manage_screen_by_Module', {
        params: {
            THIRDPARTY_MANAGE_MODULE_ID: module,
            THIRDPARTY_SUBMODULE_ID: submodule,
        },
    }).then(response => {
        //console.log(' list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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




//------------- third party manage screen

export async function getAllThirdsubModuleList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/third_get_submodule', {
        params: {
            THIRDPARTY_SUBMODULE_ID: data
        },
    }).then(response => {
        //console.log(' list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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
export async function getAllThirdProcessFlowList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/third_get_processflow', {
        params: {
            PROCESS_FLOW_ID: data
        },
    }).then(response => {
        //console.log(' list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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


export async function getAllThirdManageScreenList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/third_manage_screens', {
        params: {

        },
    }).then(response => {
        console.log(' list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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

export async function createThirdManageScreen(data) {
    await servicesModule0.header();
    return axios.post('/api/module0/third_manage_screen', data).then(response => {
        // console.log("exception create :" + JSON.stringify(response.data));
        Vue.$toast.open({
            message: response.data.message,
            type: 'success',
        });
        return response.data;
    }).catch(function(error) {
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
export async function getThirdManageScreenById(data) {
    await servicesModule0.header();
    return axios.get("/api/module0/third_manage_screen", {
        params: {
            THIRDPARTY_MANAGE_SCREEN_ID: data
        }
    }).then(response => {
        //console.log("data :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}

export async function updateThirdManageScreen(data) {
    const jsonObject = {};

    for (const [key, value] of data) {
        jsonObject[key] = value;
    }
    return axios
        .put('/api/module0/third_manage_screen', jsonObject)
        .then(response => {
            //console.log('data :' + JSON.stringify(response.data));
            Vue.$toast.open({
                message: response.data.message,
                type: 'success',
            });
            return response.data;
        }).catch(function(error) {
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
export async function deleteThirdManageScreen(data) {
    return axios
        .delete("/api/module0/third_manage_screen", {
            data: { THIRDPARTY_MANAGE_SCREEN_ID: data }
        })
        .then(response => {
            //console.log("data :" + JSON.stringify(response.data));
            Vue.$toast.open({
                message: response.data.message,
                type: 'success',
            });
            return response.data;
        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 401) {
                    servicesModule0.logout();
                } else {
                    return "error"
                }
            }
        });
}

//------------- Third Party Screen Access -------
export async function createThirdScreenAccess(data) {
    await servicesModule0.header();
    return axios.post('/api/module0/third_screen_access', data).then(response => {
        // console.log("exception create :" + JSON.stringify(response.data));
        Vue.$toast.open({
            message: response.data.message,
            type: 'success',
        });
        return response.data;
    }).catch(function(error) {
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

export async function getThirdScreenAuthPageById(data) {
    await servicesModule0.header();
    return axios.get("/api/module0/third_screen_access", {
        params: {
            THIRDPARTY_SCREEN_ACCESS_ID: data
        }
    }).then(response => {
        //console.log("data :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}

export async function updateThirdManageScreenAccess(data) {
    const jsonObject = {};

    for (const [key, value] of data) {
        jsonObject[key] = value;
    }
    return axios
        .put('/api/module0/third_screen_access', jsonObject)
        .then(response => {
            //console.log('data :' + JSON.stringify(response.data));
            Vue.$toast.open({
                message: response.data.message,
                type: 'success',
            });
            return response.data;
        }).catch(function(error) {
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

export async function deleteThirdpartyAccess(data) {
    return axios
        .delete("/api/module0/third_screen_access", {
            data: { THIRDPARTY_SCREEN_ACCESS_ID: data }
        })
        .then(response => {
            //console.log("data :" + JSON.stringify(response.data));
            Vue.$toast.open({
                message: response.data.message,
                type: 'success',
            });
            return response.data;
        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 401) {
                    servicesModule0.logout();
                } else {
                    return "error"
                }
            }
        });
}



export async function getAllThirdAuthPageList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/third_screen_access_authpage', {
        params: {

        },
    }).then(response => {
        console.log(' list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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





//-----------------------------


//------------ Training Provider Manage Group------------
export async function getAllTpManageGroupList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/tp_manage_groups', {
        params: {

        },
    }).then(response => {
        //console.log(' list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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

export async function createTpManageGroup(data) {
    await servicesModule0.header();
    return axios.post('/api/module0/tp_manage_group', data).then(response => {
        // console.log("exception create :" + JSON.stringify(response.data));
        Vue.$toast.open({
            message: response.data.message,
            type: 'success',
        });
        return response.data;
    }).catch(function(error) {
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
export async function getTpManageGroupById(data) {
    await servicesModule0.header();
    return axios.get("/api/module0/tp_manage_group", {
        params: {
            TP_MANAGE_GROUP_ID: data
        }
    }).then(response => {
        //console.log("data :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}

export async function updateTpManageGroup(data) {
    const jsonObject = {};

    for (const [key, value] of data) {
        jsonObject[key] = value;
    }
    return axios
        .put('/api/module0/tp_manage_group', jsonObject)
        .then(response => {
            //console.log('data :' + JSON.stringify(response.data));
            Vue.$toast.open({
                message: response.data.message,
                type: 'success',
            });
            return response.data;
        }).catch(function(error) {
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
export async function deleteTpManageGroup(data) {
    return axios
        .delete("/api/module0/tp_manage_group", {
            data: { TP_MANAGE_GROUP_ID: data }
        })
        .then(response => {
            //console.log("data :" + JSON.stringify(response.data));
            Vue.$toast.open({
                message: response.data.message,
                type: 'success',
            });
            return response.data;
        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 401) {
                    servicesModule0.logout();
                } else {
                    return "error"
                }
            }
        });
}

//--------- Training Provider Manage Module
export async function getAllTpManageModuleList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/tp_manage_modules', {
        params: {

        },
    }).then(response => {
        //console.log(' list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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

export async function createTpManageModule(data) {
    await servicesModule0.header();
    return axios.post('/api/module0/tp_manage_module', data).then(response => {
        // console.log("exception create :" + JSON.stringify(response.data));
        Vue.$toast.open({
            message: response.data.message,
            type: 'success',
        });
        return response.data;
    }).catch(function(error) {
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
export async function getTpManageModuleById(data) {
    await servicesModule0.header();
    return axios.get("/api/module0/tp_manage_module", {
        params: {
            TP_MANAGE_MODULE_ID: data
        }
    }).then(response => {
        //console.log("data :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}

export async function updateTpManageModule(data) {
    const jsonObject = {};

    for (const [key, value] of data) {
        jsonObject[key] = value;
    }
    return axios
        .put('/api/module0/tp_manage_module', jsonObject)
        .then(response => {
            //console.log('data :' + JSON.stringify(response.data));
            Vue.$toast.open({
                message: response.data.message,
                type: 'success',
            });
            return response.data;
        }).catch(function(error) {
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
export async function deleteTpManageModule(data) {
    return axios
        .delete("/api/module0/tp_manage_module", {
            data: { TP_MANAGE_MODULE_ID: data }
        })
        .then(response => {
            //console.log("data :" + JSON.stringify(response.data));
            Vue.$toast.open({
                message: response.data.message,
                type: 'success',
            });
            return response.data;
        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 401) {
                    servicesModule0.logout();
                } else {
                    return "error"
                }
            }
        });
}

//------------- training Provider manage submodule

export async function getAllTpModuleList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/tp_get_module', {
        params: {
            TP_MANAGE_MODULE_ID: data
        },
    }).then(response => {
        //console.log(' list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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


export async function getAllTpManageSubModuleList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/tp_manage_submodules', {
        params: {

        },
    }).then(response => {
        //console.log(' list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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

export async function createTpManageSubModule(data) {
    await servicesModule0.header();
    return axios.post('/api/module0/tp_manage_submodule', data).then(response => {
        // console.log("exception create :" + JSON.stringify(response.data));
        Vue.$toast.open({
            message: response.data.message,
            type: 'success',
        });
        return response.data;
    }).catch(function(error) {
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
export async function getTpManageSubModuleById(data) {
    await servicesModule0.header();
    return axios.get("/api/module0/tp_manage_submodule", {
        params: {
            TP_SUBMODULE_ID: data
        }
    }).then(response => {
        //console.log("data :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}

export async function updateTpManageSubModule(data) {
    const jsonObject = {};

    for (const [key, value] of data) {
        jsonObject[key] = value;
    }
    return axios
        .put('/api/module0/tp_manage_submodule', jsonObject)
        .then(response => {
            //console.log('data :' + JSON.stringify(response.data));
            Vue.$toast.open({
                message: response.data.message,
                type: 'success',
            });
            return response.data;
        }).catch(function(error) {
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
export async function deleteTpManageSubModule(data) {
    return axios
        .delete("/api/module0/tp_manage_submodule", {
            data: { TP_SUBMODULE_ID: data }
        })
        .then(response => {
            //console.log("data :" + JSON.stringify(response.data));
            Vue.$toast.open({
                message: response.data.message,
                type: 'success',
            });
            return response.data;
        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                Vue.$toast.open({
                    message: response.data.message,
                    type: 'success',
                });
                // that falls out of the range of 2xx
                if (error.response.status == 401) {
                    servicesModule0.logout();
                } else {
                    return "error"
                }
            }
        });
}
export async function getTpManageSubModulByModule(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/tp_manage_submodules_by_module', {
        params: {
            TP_MANAGE_MODULE_ID: data
        },
    }).then(response => {
        //console.log(' list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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

export async function getTpScreenByModule(moduleSelection, submoduleSelection) {
    await servicesModule0.header();
    return axios.get('/api/module0/tp_manage_screens_by_module', {
        params: {
            TP_MANAGE_MODULE_ID: moduleSelection,
            TP_MANAGE_SUBMODULE_ID: submoduleSelection
        },
    }).then(response => {
        //console.log('data :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
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






//------------- third party manage screen

export async function getAllTpsubModuleList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/tp_get_submodule', {
        params: {
            TP_SUBMODULE_ID: data
        },
    }).then(response => {
        //console.log(' list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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
export async function getAllTpProcessFlowList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/tp_get_processflow', {
        params: {
            PROCESS_FLOW_ID: data
        },
    }).then(response => {
        //console.log(' list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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


export async function getAllTpManageScreenList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/tp_manage_screens', {
        params: {

        },
    }).then(response => {
        //console.log(' list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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

export async function createTpManageScreen(data) {
    await servicesModule0.header();
    return axios.post('/api/module0/tp_manage_screen', data).then(response => {
        // console.log("exception create :" + JSON.stringify(response.data));
        Vue.$toast.open({
            message: response.data.message,
            type: 'success',
        });
        return response.data;
    }).catch(function(error) {
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
export async function getTpManageScreenById(data) {
    await servicesModule0.header();
    return axios.get("/api/module0/tp_manage_screen", {
        params: {
            TP_MANAGE_SCREEN_ID: data
        }
    }).then(response => {
        //console.log("data :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}

export async function updateTpManageScreen(data) {
    const jsonObject = {};

    for (const [key, value] of data) {
        jsonObject[key] = value;
    }
    return axios
        .put('/api/module0/tp_manage_screen', jsonObject)
        .then(response => {
            //console.log('data :' + JSON.stringify(response.data));
            Vue.$toast.open({
                message: response.data.message,
                type: 'success',
            });
            return response.data;
        }).catch(function(error) {
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
export async function deleteTpManageScreen(data) {
    return axios
        .delete("/api/module0/tp_manage_screen", {
            data: { TP_MANAGE_SCREEN_ID: data }
        })
        .then(response => {
            //console.log("data :" + JSON.stringify(response.data));
            Vue.$toast.open({
                message: response.data.message,
                type: 'success',
            });
            return response.data;
        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 401) {
                    servicesModule0.logout();
                } else {
                    return "error"
                }
            }
        });
}
//-------------- Training Provider Screen Access -----
export async function createTpScreenAccess(data) {
    await servicesModule0.header();
    return axios.post('/api/module0/tp_screen_access', data).then(response => {
        // console.log("exception create :" + JSON.stringify(response.data));
        Vue.$toast.open({
            message: response.data.message,
            type: 'success',
        });
        return response.data;
    }).catch(function(error) {
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

export async function getTpScreenAuthPageById(data) {
    await servicesModule0.header();
    return axios.get("/api/module0/tp_screen_access", {
        params: {
            TP_SCREEN_ACCESS_ID: data
        }
    }).then(response => {
        console.log("data :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}

export async function updateTpManageScreenAccess(data) {
    const jsonObject = {};

    for (const [key, value] of data) {
        jsonObject[key] = value;
    }
    return axios
        .put('/api/module0/tp_screen_access', jsonObject)
        .then(response => {
            //console.log('data :' + JSON.stringify(response.data));
            Vue.$toast.open({
                message: response.data.message,
                type: 'success',
            });
            return response.data;
        }).catch(function(error) {
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

export async function getAllTpAuthPageList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/tp_screen_access_authpage', {
        params: {

        },
    }).then(response => {
        //console.log(' list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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

export async function deleteTPAccess(data) {
    return axios
        .delete("/api/module0/tp_screen_access", {
            data: { TP_SCREEN_ACCESS_ID: data }
        })
        .then(response => {
            //console.log("data :" + JSON.stringify(response.data));
            Vue.$toast.open({
                message: response.data.message,
                type: 'success',
            });
            return response.data;
        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 401) {
                    servicesModule0.logout();
                } else {
                    return "error"
                }
            }
        });
}


//--- screen access

export async function getStaffList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/screen_access_user', {
        params: {

        },
    }).then(response => {
        console.log(' list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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

//-------- Page Maintenance

export async function getAllPageMaintenanceList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/page_list', {
        params: {

        },
    }).then(response => {
        console.log(' list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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

export async function searchAllPageMaintenanceList(data) {
    const jsonObject = {};

    for (const [key, value] of data) {
        jsonObject[key] = value;
    }

    await servicesModule0.header();
    return axios.post('/api/module0/search_page_list', jsonObject).then(response => {
        console.log(' list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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

export async function createPageMaintenance(data) {
    await servicesModule0.header();
    return axios.post('/api/module0/page_create', data).then(response => {
        // console.log("exception create :" + JSON.stringify(response.data));
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
export async function getPageMaintenanceById(data) {
    await servicesModule0.header()
    return axios.get('/api/module0/edit_page', {
        params: {
            PAGE_MAINTENANCE_ID: data
        },
    }).then(response => {
        console.log(response.data)
        return response.data.data
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                logout()
            } else {
                return 'error'
            }
        }
    })
}
// export async function getPageMaintenanceById(data) {
//     await servicesModule0.header();
//     return axios.get("/api/module0/edit_page", {
//         params: {
//             PAGE_MAINTENANCE_ID: data
//         }
//     }).then(response => {
//         console.log("data :" + JSON.stringify(response.data.data));
//         return response.data.data;
//     }).catch(function(error) {
//         if (error.response) {
//             // The request was made and the server responded with a status code
//             // that falls out of the range of 2xx
//             if (error.response.status == 401) {
//                 servicesModule0.logout();
//             } else {
//                 return "error"
//             }
//         }
//     });
// }

export async function updatePageMaintenance(data) {
    const jsonObject = {};

    for (const [key, value] of data) {
        jsonObject[key] = value;
    }
    return axios
        .put('/api/module0/update_page', jsonObject)
        .then(response => {
            //console.log('data :' + JSON.stringify(response.data));
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
export async function deletePageMaintenance(data) {
    return axios
        .delete("/api/module0/delete_page", {
            data: { PAGE_MAINTENANCE_ID: data }
        })
        .then(response => {
            Vue.$toast.open({
                message: response.data.message,
                type: 'success',
            });
            return response.data;
        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 401) {
                    servicesModule0.logout();
                } else {
                    return "error"
                }
            }
        });
}

export async function getAllAudienceList(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/get_audience', {
        params: {
            SET_TYPE: data
        },
    }).then(response => {
        console.log(' list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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

export async function deleteDocument(data) {
    await servicesModule0.header();
    return axios.delete('/api/module0/delete_document', {
            params: {
                CIRCULAR_EVENT_DOCUMENT_ID: data,
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

//* *** COLOUR TEMPLATE Setting *************/
export async function getAllColor() {
    // await this.header();
    return axios.get("/api/module0/all_color_code").then(response => {
        // console.log("division list :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}
export async function getColourById(data,user_id,user_type) {
    // await this.header();
    return axios.get("/api/module0/color_by_id", {
        params: {
            COLOUR_SETTING_ID : data,
            USER_ID : user_id,
            USER_TYPE:user_type
        }
    }).then(response => {
        //console.log("data :" + JSON.stringify(response.data.data));
        generalAlert(response.data.message);
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}

export async function createColorSetting(data) {
    //await this.header();
    return axios.post("/api/module0/create_color_code", data).then(response => {
        generalAlert(response.data.message);
        // generalAlertError(response.data.message);
        return response.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 400) {
                generalAlertError(error.response.data.message);
            }
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}

export async function deleteColourCode(data) {
    return axios
        .delete("/api/module0/color_delete", {
            data: { COLOUR_SETTING_ID: data }
        })
        .then(response => {
            generalAlert(response.data.message);
            return response.data;
        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 401) {
                    servicesModule0.logout();
                } else {
                    return "error"
                }
            }
        });
}
export async function setDefaultColourCode(data) {
    return axios
        .get("/api/module0/color_set_default", {
            params: { COLOUR_SETTING_ID: data }
        })
        .then(response => {
            generalAlert(response.data.message);
            return response.data;
        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 401) {
                    servicesModule0.logout();
                } else {
                    return "error"
                }
            }
        });
}


export async function updateColourCode(data) {
    let jsonObject = {};
    for (const [key, value] of data) {
        jsonObject[key] = value;
    }
    return axios
        .put("/api/module0/color_update", jsonObject)
        .then(response => {
            generalAlert(response.data.message);
            return response.data;
        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 400) {
                    generalAlertError(error.response.data.message);
                }
                if (error.response.status == 401) {
                    servicesModule0.logout();
                } else {
                    return "error"
                }
            }
        });
}
export async function getAllColorCode() {
    // await this.header();
    return axios.get("/api/module0/all_color_code_active").then(response => {
        // console.log("division list :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}
export async function getActiveColorCode(user_id,user_type) {
    // await this.header();
    return axios.get("/api/module0/color_code_active", {
        params: {
            USER_ID : user_id,
            USER_TYPE:user_type
        }
    }).then(response => {
        // console.log("division list :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}

//    Dummy Distributor   //
export async function createDummyDistributor(data) {
    // await servicesModule1.header();
    return axios.post('/api/module0/dummy_distributor', data).then(response => {
        //generalAlert(response.message);
        console.log("Dummy Status=", response.status);

        Vue.$toast.open({
            message: "Data Successfully Created",
            type: 'success',
        });
        return response.data;
    }).catch(function(error) {
        if (error.response) {
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

export async function getAllDummyDistributor() {
    // await this.header();

    return axios.get("/api/module0/get_dummy_distributor").then(response => {
        console.log("Dummy list :" + JSON.stringify(response));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}

export async function deleteDummyDistributor(data) {
    console.log("DISTRIBUTOR_ID1=", data);
    return axios.post('/api/module0/dummy_distributor_delete', {
        DISTRIBUTOR_ID: data
    }).then(response => {
        generalAlert(response.data.message);
        return response.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}
export async function updateDummyDistributor(data) {
    //console.log("DISTRIBUTOR_ID1=",data);
    return axios.post('/api/module0/dummy_distributor_update', data).then(response => {
        generalAlert(response.data.message);
        return response.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}


//  Inactive User Manage

export async function getAllActiveInactiveData(type) {
    await servicesModule0.header();
    return axios.get('/api/module0/active_inactive_user', {
        params: { TYPE: type }
    }).then(response => {
        //console.log('user detail :' + JSON.stringify(response.data));
        return response.data;
    }).catch(function(error) {
        if (error.response) {
            //console.log('error response :' + error.response);
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 500) {} else if (error.response.status == 401) {
                logout();
            }
        }
    });
}

export async function createUserAI(data) {
    await servicesModule0.header();
    return axios.post('/api/module0/UserAI_create', data).then(response => {
        // console.log("exception create :" + JSON.stringify(response.data));
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

export async function updateUserAI(data) {
    await servicesModule0.header();
    const jsonObject = {};

    for (const [key, value] of data) {
        jsonObject[key] = value;
    }
    return axios.put('/api/module0/UserAI_update', jsonObject).then(response => {
        // console.log("exception create :" + JSON.stringify(response.data));
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

export async function deleteActiveInactiveData(data) {
    return axios
        .delete("/api/module0/delete_user_AI", {
            data: { USER_ACTIVE_INACTIVE_ID: data }
        })
        .then(response => {
            //console.log("data :" + JSON.stringify(response.data));
            Vue.$toast.open({
                message: response.data.message,
                type: 'success',
            });
            return response.data;
        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 401) {
                    servicesModule0.logout();
                } else {
                    return "error"
                }
            }
        });
}
// ---------------------  Dashboard Chart List --------------------

export async function getChartList() {
    await servicesModule0.header();
    return axios.get('/api/module0/dashboard_chart_list').then(response => {
        console.log('setting general list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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
// --------------------- Distributor Dashboard Setting --------------------
export async function getDistributorSettingList(uid,utype,typeid,accessuserDivision,accessuserDepartment,accessuserGROUP) {
    await servicesModule0.header();
    return axios.get('/api/module0/dashboard_setting_distributor', {
        params: {
            SETTING_USER_ID: uid,
            SETTING_USER_TYPE: utype,
            DASHBOARD_SUB_TYPE: typeid,
            ACCESS_USER_DIVISION: accessuserDivision,
            ACCESS_USER_DEPARTMENT: accessuserDepartment,
            ACCESS_USER_GROUP: accessuserGROUP,
        }
    }).then(response => {
        console.log('setting general list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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

export async function getDistributorDashboardSetting(data) {
    // await this.header();
    return axios.get("/api/module0/all_distributor_dashboard_list", {
        params: {
            DASHBOARD_TYPE: data
        }
    }).then(response => {
        // console.log("division list :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}

export async function createDashboardSetting(data) {
    //await this.header();
    return axios.post("/api/module0/create_dashboard_setting", data).then(response => {
        if (response.data.message == "Data Already Exist!!") {
            generalAlertError(response.data.message);
        } else {
            generalAlert(response.data.message);
        }
        return response.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}
export async function getDashboardById(data) {
    // await this.header();
    return axios.get("/api/module0/dashboard_setting_by_id", {
        params: {
            DASHBOARD_MAIN_ID: data
        }
    }).then(response => {
        console.log("data :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}
export async function updateDashboardSetting(data) {
    let jsonObject = {};
    for (const [key, value] of data) {
        jsonObject[key] = value;
    }
    return axios
        .put("/api/module0/dashboard_update", jsonObject)
        .then(response => {
            generalAlert(response.data.message);
            return response.data;
        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 401) {
                    servicesModule0.logout();
                } else {
                    return "error"
                }
            }
        });
}
export async function deleteDashboardSetting(data) {
    return axios
        .delete("/api/module0/dashboard_setting_delete", {
            data: { DASHBOARD_MAIN_ID: data }
        })
        .then(response => {
            if (response.data.message == "Failed to delete data") {
                generalAlertError("Failed To Delete Data. Already Used.");
            } else {
                generalAlert(response.data.message);
            }
            return response.data;
        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 401) {
                    servicesModule0.logout();
                } else {
                    return "error"
                }
            }
        });
}
// CPD REVOCATION
export async function createCPDRevocation(data) {
    return axios
        .post('/api/module0/cpd_revocation_day', data)
        .then(response => {
            console.log('data :' + JSON.stringify(response.data));
            Vue.$toast.open({
                message: response.data.message,
                type: 'success',
            });
            return response.data;
        }).catch(function(error) {
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
export async function getCPDRevocationById(data) {
    await servicesModule0.header();
    return axios.get("/api/module0/cpd_revocation_day_get", {
        params: {
            REVOCATION_ID: data,
        }
    }).then(response => {
        // console.log("data cut off date :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}

// --------------------- CPD Dashboard Setting --------------------
export async function getCPDSettingList(uid, utype,accessuserDivision,accessuserDepartment,accessuserGROUP) {
    await servicesModule0.header();
    return axios.get('/api/module0/dashboard_setting_cpd', {
        params: {
            SETTING_USER_ID: uid,
            SETTING_USER_TYPE: utype,
            ACCESS_USER_DIVISION: accessuserDivision,
            ACCESS_USER_DEPARTMENT: accessuserDepartment,
            ACCESS_USER_GROUP: accessuserGROUP,
        }
    }).then(response => {
        console.log('setting general list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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

export async function createCpdDashboardSetting(data, userid, usertype,accessuserDivision,accessuserDepartment,accessuserGROUP) {
    // await servicesModule1.header();
    return axios.post('/api/module0/cpd_dashboard_setting_create', {
        params: data,
        userid: userid,
        usertype: usertype,
        ACCESS_USER_DIVISION: accessuserDivision,
        ACCESS_USER_DEPARTMENT: accessuserDepartment,
        ACCESS_USER_GROUP: accessuserGROUP

    }).then(response => {
        // console.log(JSON.stringify(response.data));
        // Vue.$toast.open({
        //     message: response.data.message,
        //     type: 'success',
        // });
        return response.data;
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
export async function getCpdSetting(userID,userTYPE,userGroup,userDepartment,userDIVISION) {
    // await servicesModule1.header();
   // console.log("ID=", userid);
    return axios.get('/api/module0/get_cpd_dashboard_setting', {
        params: {
            SETTING_USER_ID: userID,
            SETTING_USER_TYPE: userTYPE,
            SETTING_USER_GROUP: userGroup,
            ACCESS_USER_DEPARTMENT: userDepartment,
            ACCESS_USER_DIVISION: userDIVISION
        }
    }).then(response => {
        console.log(JSON.stringify(response.data));

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
export async function deleteCpdDashboardSetting(postid) {
    // await servicesModule1.header();
    return axios.post('/api/module0/delete_cpd_dashboard_setting', {
        DISPLAY_SETTING_ID: postid
    }).then(response => {
        console.log(JSON.stringify(response.data));

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
export async function deleteCasDashboardSetting(postid) {
    // await servicesModule1.header();
    return axios.post('/api/module0/delete_cas_dashboard_setting', {
        DISPLAY_SETTING_ID: postid
    }).then(response => {
        console.log(JSON.stringify(response.data));

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
export async function getCpdChartSetting(userid, usertype, chartview) {
    // await servicesModule1.header();
    // console.log("ID=", userid);
    return axios.get('/api/module0/get_cpd_chart_setting', {
        params: {
            SETTING_USER_ID: userid,
            SETTING_USER_TYPE: usertype,
            CHART_VIEW: chartview
        }
    }).then(response => {
        //console.log(JSON.stringify(response.data));

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
export async function getCpdChartSettingtwo(userid, usertype, chartview) {
    // await servicesModule1.header();
    // console.log("ID=", userid);
    return axios.get('/api/module0/get_cpd_chart_setting_two', {
        params: {
            SETTING_USER_ID: userid,
            SETTING_USER_TYPE: usertype,
            CHART_VIEW: chartview
        }
    }).then(response => {
        //console.log(JSON.stringify(response.data));

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
export async function getCpdChartSettingthree(userid, usertype, chartview) {
    // await servicesModule1.header();
    // console.log("ID=", userid);
    return axios.get('/api/module0/get_cpd_chart_setting_three', {
        params: {
            SETTING_USER_ID: userid,
            SETTING_USER_TYPE: usertype,
            CHART_VIEW: chartview
        }
    }).then(response => {
        //console.log(JSON.stringify(response.data));

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
export async function getCpdChartSettingfour(userid, usertype, chartview) {
    // await servicesModule1.header();
    // console.log("ID=", userid);
    return axios.get('/api/module0/get_cpd_chart_setting_four', {
        params: {
            SETTING_USER_ID: userid,
            SETTING_USER_TYPE: usertype,
            CHART_VIEW: chartview
        }
    }).then(response => {
        //console.log(JSON.stringify(response.data));

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

export async function getCpdChartSettingfive(userid, usertype, chartview) {
    // await servicesModule1.header();
    // console.log("ID=", userid);
    return axios.get('/api/module0/get_cpd_chart_setting_five', {
        params: {
            SETTING_USER_ID: userid,
            SETTING_USER_TYPE: usertype,
            CHART_VIEW: chartview
        }
    }).then(response => {
        //console.log(JSON.stringify(response.data));

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
export async function getCpdChartSettingSix(userid, usertype, chartview) {
    // await servicesModule1.header();
    // console.log("ID=", userid);
    return axios.get('/api/module0/get_cpd_chart_setting_six', {
        params: {
            SETTING_USER_ID: userid,
            SETTING_USER_TYPE: usertype,
            CHART_VIEW: chartview
        }
    }).then(response => {
        //console.log(JSON.stringify(response.data));

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
export async function getCpdChartSettingSeven(userid, usertype, chartview) {
    // await servicesModule1.header();
    // console.log("ID=", userid);
    return axios.get('/api/module0/get_cpd_chart_setting_seven', {
        params: {
            SETTING_USER_ID: userid,
            SETTING_USER_TYPE: usertype,
            CHART_VIEW: chartview
        }
    }).then(response => {
        //console.log(JSON.stringify(response.data));

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
export async function getCpdChartSettingEight(userid, usertype, chartview) {
    // await servicesModule1.header();
    // console.log("ID=", userid);
    return axios.get('/api/module0/get_cpd_chart_setting_eight', {
        params: {
            SETTING_USER_ID: userid,
            SETTING_USER_TYPE: usertype,
            CHART_VIEW: chartview
        }
    }).then(response => {
        //console.log(JSON.stringify(response.data));

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

// --------------------- CAS Dashboard Setting --------------------
export async function getCASSettingList(uid, utype,accessuserDivision,accessuserDepartment,accessuserGROUP) {
    await servicesModule0.header();
    return axios.get('/api/module0/dashboard_setting_cas', {
        params: {
            SETTING_USER_ID: uid,
            SETTING_USER_TYPE: utype,
            ACCESS_USER_DIVISION: accessuserDivision,
            ACCESS_USER_DEPARTMENT: accessuserDepartment,
            ACCESS_USER_GROUP: accessuserGROUP,
        }
    }).then(response => {
        console.log('setting general list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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
export async function createCasDashboardSetting(data, userid, usertype,accessuserDivision,accessuserDepartment,accessuserGROUP) {
    // await servicesModule1.header();
    return axios.post('/api/module0/cas_dashboard_setting_create', {
        params: data,
        userid: userid,
        usertype: usertype,
        ACCESS_USER_DIVISION: accessuserDivision,
        ACCESS_USER_DEPARTMENT: accessuserDepartment,
        ACCESS_USER_GROUP: accessuserGROUP,

    }).then(response => {
        // console.log(JSON.stringify(response.data));
        // Vue.$toast.open({
        //     message: response.data.message,
        //     type: 'success',
        // });
        return response.data;
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

export async function getCasSetting(userID,userTYPE,userGroup,userDepartment,userDIVISION) {
    // await servicesModule1.header();
    //console.log("ID=", userid);
    return axios.get('/api/module0/get_cas_dashboard_setting', {
        params: {
            SETTING_USER_ID: userID,
            SETTING_USER_TYPE: userTYPE,
            SETTING_USER_GROUP: userGroup,
            ACCESS_USER_DEPARTMENT: userDepartment,
            ACCESS_USER_DIVISION: userDIVISION
        }
    }).then(response => {
        console.log(JSON.stringify(response.data));

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
export async function getCasChartSetting(userid, usertype, chartview) {
    // await servicesModule1.header();
    // console.log("ID=", userid);
    return axios.get('/api/module0/get_cas_chart_setting', {
        params: {
            SETTING_USER_ID: userid,
            SETTING_USER_TYPE: usertype,
            CHART_VIEW: chartview
        }
    }).then(response => {
        //console.log(JSON.stringify(response.data));

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

export async function getCasChartSettingtwo(userid, usertype, chartview) {
    // await servicesModule1.header();
    // console.log("ID=", userid);
    return axios.get('/api/module0/get_cas_chart_setting_two', {
        params: {
            SETTING_USER_ID: userid,
            SETTING_USER_TYPE: usertype,
            CHART_VIEW: chartview
        }
    }).then(response => {
        //console.log(JSON.stringify(response.data));

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
export async function getCasChartSettingthree(userid, usertype, chartview) {
    // await servicesModule1.header();
    // console.log("ID=", userid);
    return axios.get('/api/module0/get_cas_chart_setting_three', {
        params: {
            SETTING_USER_ID: userid,
            SETTING_USER_TYPE: usertype,
            CHART_VIEW: chartview
        }
    }).then(response => {
        //console.log(JSON.stringify(response.data));

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
export async function getCasChartSettingfour(userid, usertype, chartview) {
    // await servicesModule1.header();
    // console.log("ID=", userid);
    return axios.get('/api/module0/get_cas_chart_setting_four', {
        params: {
            SETTING_USER_ID: userid,
            SETTING_USER_TYPE: usertype,
            CHART_VIEW: chartview
        }
    }).then(response => {
        //console.log(JSON.stringify(response.data));

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

    // --------------------- FMS Dashboard Setting --------------------
    export async function getFMSSettingList(uid,utype,ugroup,accessuserDepartment,typeID,accessuserDivision,accessuserGROUP) {
        await servicesModule0.header();
        return axios.get('/api/module0/dashboard_setting_fms', {
            params: {
                SETTING_USER_ID: uid,
                SETTING_USER_TYPE: utype,
                SETTING_USER_GROUP: ugroup,
                ACCESS_USER_DEPARTMENT: accessuserDepartment,
                SETTING_USER_TYPE_GROUP: typeID,
                ACCESS_USER_DIVISION: accessuserDivision,
                ACCESS_USER_GROUP: accessuserGROUP,
            }
        }).then(response => {
            console.log('setting general list :' + JSON.stringify(response.data.data));
            return response.data.data;
        }).catch(function(error) {
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
                    //logout();
                }
                return 'error';
            }


        });
    }
export async function createFmsDashboardSetting(data, userid, usertype, ugroup,typeID,accessuserDivision,accessuserDepartment,accessuserGROUP) {
    // await servicesModule1.header();
    return axios.post('/api/module0/fms_dashboard_setting_create', {
        params: data,
        userid: userid,
        usertype: usertype,
        usergroup: ugroup,
        SETTING_USER_TYPE_GROUP: typeID,
        ACCESS_USER_DIVISION: accessuserDivision,
        ACCESS_USER_DEPARTMENT: accessuserDepartment,
        ACCESS_USER_GROUP: accessuserGROUP,
    }).then(response => {
        // console.log(JSON.stringify(response.data));
        // Vue.$toast.open({
        //     message: response.data.message,
        //     type: 'success',
        // });
        return response.data;
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
    export async function getFmsSetting(userid,usertype,usergroup,userDepartment,userDIVISION) {
        // await servicesModule1.header();
        console.log("ID=", userid);
        return axios.get('/api/module0/get_fms_dashboard_setting', {
            params: {
                SETTING_USER_ID: userid,
                SETTING_USER_TYPE: usertype,
                SETTING_USER_GROUP: usergroup,
                ACCESS_USER_DEPARTMENT: userDepartment,
                ACCESS_USER_DIVISION: userDIVISION
            }
        }).then(response => {
            console.log(JSON.stringify(response.data));
    
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
// RD Chart Setting
    export async function getFmsRdChartSetting(userid,usertype,chartview) {
        // await servicesModule1.header();
       // console.log("ID=", userid);
        return axios.get('/api/module0/get_fms_rd_chart_setting', {
            params: {
                SETTING_USER_ID: userid,
                SETTING_USER_TYPE: usertype,
                CHART_VIEW: chartview
            }
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
    export async function getFmsRdChartSettingtwo(userid,usertype,chartview) {
        // await servicesModule1.header();
       // console.log("ID=", userid);
        return axios.get('/api/module0/get_fms_rd_chart_setting_two', {
            params: {
                SETTING_USER_ID: userid,
                SETTING_USER_TYPE: usertype,
                CHART_VIEW: chartview
            }
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

   
    
    export async function getFmsIdChartSettingThree(userid,usertype,chartview) {
        // await servicesModule1.header();
       // console.log("ID=", userid);
        return axios.get('/api/module0/get_fms_id_chart_setting_three', {
            params: {
                SETTING_USER_ID: userid,
                SETTING_USER_TYPE: usertype,
                CHART_VIEW: chartview
            }
        }).then(response => {
            //console.log(JSON.stringify(response.data));
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
    export async function getFmsIdChartSettingFour(userid,usertype,chartview) {
        // await servicesModule1.header();
       // console.log("ID=", userid);
        return axios.get('/api/module0/get_fms_id_chart_setting_four', {
            params: {
                SETTING_USER_ID: userid,
                SETTING_USER_TYPE: usertype,
                CHART_VIEW: chartview
            }
        }).then(response => {
            //console.log(JSON.stringify(response.data));
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
    export async function getFmsIdChartSettingFive(userid,usertype,chartview) {
        // await servicesModule1.header();
       // console.log("ID=", userid);
        return axios.get('/api/module0/get_fms_id_chart_setting_five', {
            params: {
                SETTING_USER_ID: userid,
                SETTING_USER_TYPE: usertype,
                CHART_VIEW: chartview
            }
        }).then(response => {
            //console.log(JSON.stringify(response.data));
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

// --------------------- ADMIN Dashboard Setting --------------------
export async function getADMINSettingList(uid,utype,accessuserDivision,accessuserDepartment,accessuserGROUP) {
    await servicesModule0.header();
    return axios.get('/api/module0/dashboard_setting_admin', {
        params: {
            SETTING_USER_ID: uid,
            SETTING_USER_TYPE: utype,
            ACCESS_USER_DIVISION: accessuserDivision,
            ACCESS_USER_DEPARTMENT: accessuserDepartment,
            ACCESS_USER_GROUP: accessuserGROUP,
        }
    }).then(response => {
        console.log('setting general list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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
                //logout();
            }
            return 'error';
        }


    });
}
export async function deleteFmsDashboardSetting(postid) {
    // await servicesModule1.header();
    return axios.post('/api/module0/delete_fms_dashboard_setting', {
        DISPLAY_SETTING_ID: postid
    }).then(response => {
        console.log(JSON.stringify(response.data));
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


export async function getAdminSetting(userID,userTYPE,userGroup,userDepartment,userDIVISION) {
    // await servicesModule1.header();
   // console.log("ID=", userid);
    return axios.get('/api/module0/get_admin_dashboard_setting', {
        params: {
            SETTING_USER_ID: userID,
            SETTING_USER_TYPE: userTYPE,
            ACCESS_USER_GROUP: userGroup,
            ACCESS_USER_DEPARTMENT: userDepartment,
            ACCESS_USER_DIVISION: userDIVISION

        }
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

export async function getFmsIdChartSetting(userid, usertype, chartview) {
    // await servicesModule1.header();
    // console.log("ID=", userid);
    return axios.get('/api/module0/get_fms_id_chart_setting', {
        params: {
            SETTING_USER_ID: userid,
            SETTING_USER_TYPE: usertype,
            CHART_VIEW: chartview
        }
    }).then(response => {
        //console.log(JSON.stringify(response.data));
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
export async function getFmsIdChartSettingTwo(userid, usertype, chartview) {
    // await servicesModule1.header();
    // console.log("ID=", userid);
    return axios.get('/api/module0/get_fms_id_chart_setting_two', {
        params: {
            SETTING_USER_ID: userid,
            SETTING_USER_TYPE: usertype,
            CHART_VIEW: chartview
        }
    }).then(response => {
        //console.log(JSON.stringify(response.data));
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



export async function getFmsIdChartSettingSix(userid, usertype, chartview) {
    // await servicesModule1.header();
    // console.log("ID=", userid);
    return axios.get('/api/module0/get_fms_id_chart_setting_six', {
        params: {
            SETTING_USER_ID: userid,
            SETTING_USER_TYPE: usertype,
            CHART_VIEW: chartview
        }
    }).then(response => {
        //console.log(JSON.stringify(response.data));
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


export async function createAdminDashboardSetting(data, userid, usertype,accessuserDivision,accessuserDepartment,accessuserGROUP) {
    // await servicesModule1.header();
    return axios.post('/api/module0/admin_dashboard_setting_create', {
        params: data,
        userid: userid,
        usertype: usertype,
        ACCESS_USER_DIVISION: accessuserDivision,
        ACCESS_USER_DEPARTMENT: accessuserDepartment,
        ACCESS_USER_GROUP: accessuserGROUP,

    }).then(response => {
        // console.log(JSON.stringify(response.data));
        // Vue.$toast.open({
        //     message: response.data.message,
        //     type: 'success',
        // });
        return response.data;
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
export async function deleteAdminDashboardSetting(postid) {
    // await servicesModule1.header();
    return axios.post('/api/module0/delete_admin_dashboard_setting', {
        DISPLAY_SETTING_ID: postid
    }).then(response => {
        console.log(JSON.stringify(response.data));

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

export async function getAdminChartSetting(userid, usertype, chartview) {
    // await servicesModule1.header();
    // console.log("ID=", userid);
    return axios.get('/api/module0/get_admin_chart_setting_one', {
        params: {
            SETTING_USER_ID: userid,
            SETTING_USER_TYPE: usertype,
            CHART_VIEW: chartview
        }
    }).then(response => {
        //console.log(JSON.stringify(response.data));

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
export async function getAdminChartSettingtwo(userid, usertype, chartview) {
    // await servicesModule1.header();
    // console.log("ID=", userid);
    return axios.get('/api/module0/get_admin_chart_setting_two', {
        params: {
            SETTING_USER_ID: userid,
            SETTING_USER_TYPE: usertype,
            CHART_VIEW: chartview
        }
    }).then(response => {
        //console.log(JSON.stringify(response.data));

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
export async function getAdminChartSettingfour(userid, usertype, chartview) {
    // await servicesModule1.header();
    // console.log("ID=", userid);
    return axios.get('/api/module0/get_admin_chart_setting_four', {
        params: {
            SETTING_USER_ID: userid,
            SETTING_USER_TYPE: usertype,
            CHART_VIEW: chartview
        }
    }).then(response => {
        //console.log(JSON.stringify(response.data));

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
export async function getAdminChartSettingfive(userid, usertype, chartview) {
    // await servicesModule1.header();
    // console.log("ID=", userid);
    return axios.get('/api/module0/get_admin_chart_setting_five', {
        params: {
            SETTING_USER_ID: userid,
            SETTING_USER_TYPE: usertype,
            CHART_VIEW: chartview
        }
    }).then(response => {
        //console.log(JSON.stringify(response.data));

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

export async function getSystemInformation(data) {
    // await this.header();
    return axios.get("/api/module0/system_information_admin", {
        //  params: {
        //     INFO_ID: data
        //  }
    }).then(response => {
        // console.log("division list :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}

export async function createSystemInformation(data) {
    //await this.header();
    return axios.post("/api/module0/create_system_information", data).then(response => {
        if (response.data.message == "Data Already Exist!!") {
            generalAlertError(response.data.message);
        } else {
            generalAlert(response.data.message);
        }
        return response.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}
export async function getSystemInformationById(data) {
    // await this.header();
    return axios.get("/api/module0/system_information_by_id", {
        params: {
            SYSTEM_INFORMATION_ID: data
        }
    }).then(response => {
        console.log("data :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}
export async function updateSystemInformation(data) {
    let jsonObject = {};
    for (const [key, value] of data) {
        jsonObject[key] = value;
    }
    return axios
        .put("/api/module0/system_information_update", jsonObject)
        .then(response => {
            generalAlert(response.data.message);
            return response.data;
        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 401) {
                    servicesModule0.logout();
                } else {
                    return "error"
                }
            }
        });
}
export async function deleteSystemInformation(data) {
    return axios
        .delete("/api/module0/system_information_delete", {
            data: { SYSTEM_INFORMATION_ID: data }
        })
        .then(response => {
            if (response.data.message == "Failed to delete data") {
                generalAlertError("Failed To Delete Data. Already Used.");
            } else {
                generalAlert(response.data.message);
            }
            return response.data;
        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 401) {
                    servicesModule0.logout();
                } else {
                    return "error"
                }
            }
        });
}

// --------------------- Consultant Dashboard Setting --------------------
export async function getConsultantSettingList(uid, utype, ugroup,accessuserDivision,accessuserDepartment,accessuserGROUP) {
    await servicesModule0.header();
    return axios.get('/api/module0/dashboard_setting_consultant', {
        params: {
            SETTING_USER_ID: uid,
            SETTING_USER_TYPE: utype,
            SETTING_USER_GROUP: ugroup,
            ACCESS_USER_DIVISION: accessuserDivision,
            ACCESS_USER_DEPARTMENT: accessuserDepartment,
            ACCESS_USER_GROUP: accessuserGROUP,
            //ACCESS_USER_ROLE: accessuserRole,
        }
    }).then(response => {
        console.log('setting general list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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
export async function createConsultantDashboardSetting(data, userid, usertype, usergroup,accessuserDivision,accessuserDepartment,accessuserGROUP,accessuserRole) {
    // await servicesModule1.header();
    return axios.post('/api/module0/consultant_dashboard_setting_create', {
        params: data,
        userid: userid,
        usertype: usertype,
        usergroup: usergroup,
        ACCESS_USER_DIVISION: accessuserDivision,
        ACCESS_USER_DEPARTMENT:accessuserDepartment,
        ACCESS_USER_GROUP: accessuserGROUP,
        ACCESS_USER_ROLE: accessuserRole, 
    }).then(response => {
        // console.log(JSON.stringify(response.data));
        // Vue.$toast.open({
        //     message: response.data.message,
        //     type: 'success',
        // });
        return response.data;
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
export async function deleteConsultantDashboardSetting(postid) {
    // await servicesModule1.header();
    return axios.post('/api/module0/delete_consultant_dashboard_setting', {
        DISPLAY_SETTING_ID: postid
    }).then(response => {
        console.log(JSON.stringify(response.data));

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

// --------------------- Finance Dashboard Setting --------------------
export async function getFinanceSettingList(userID,userTYPE,accessuserDivision,accessuserDepartment,accessuserGROUP) {
    await servicesModule0.header();
    return axios.get('/api/module0/dashboard_setting_finance', {
        params: {
            SETTING_USER_ID: userID,
            SETTING_USER_TYPE: userTYPE,
            ACCESS_USER_GROUP: accessuserGROUP,
            ACCESS_USER_DIVISION: accessuserDivision,
            ACCESS_USER_DEPARTMENT: accessuserDepartment,
        }
    }).then(response => {
        console.log('setting general list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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
export async function createFinanceDashboardSetting(data, userid, usertype,usergroup,accessuserDivision,accessuserDepartment,accessuserGROUP) {
    // await servicesModule1.header();
    return axios.post('/api/module0/finance_dashboard_setting_create', {
        params: data,
        userid: userid,
        usertype: usertype,
        usergroup: usergroup,
        ACCESS_USER_DIVISION: accessuserDivision,
        ACCESS_USER_DEPARTMENT: accessuserDepartment,
        ACCESS_USER_GROUP: accessuserGROUP,
    }).then(response => {
        // console.log(JSON.stringify(response.data));
        // Vue.$toast.open({
        //     message: response.data.message,
        //     type: 'success',
        // });
        return response.data;
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
export async function deleteFinanceDashboardSetting(postid) {
    // await servicesModule1.header();
    return axios.post('/api/module0/delete_finance_dashboard_setting', {
        DISPLAY_SETTING_ID: postid
    }).then(response => {
        console.log(JSON.stringify(response.data));

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
// --------------------- Annual Dashboard Setting --------------------
export async function getAnnualSettingList(uid, utype, ugroup,accessuserDivision,accessuserDepartment,accessuserGROUP,typeID) {
    await servicesModule0.header();
    return axios.get('/api/module0/dashboard_setting_annual', {
        params: {
            SETTING_USER_ID: uid,
            SETTING_USER_TYPE: utype,
            SETTING_USER_GROUP: ugroup,
            SETTING_USER_TYPE_GROUP: typeID,
            ACCESS_USER_DIVISION: accessuserDivision,
            ACCESS_USER_DEPARTMENT: accessuserDepartment,
            ACCESS_USER_GROUP: accessuserGROUP,
        }
    }).then(response => {
        console.log('setting general list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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
export async function createAnnualDashboardSetting(data, userid, usertype, usergroup,accessuserDivision,accessuserDepartment,accessuserGROUP,typeID) {
    // await servicesModule1.header();
    return axios.post('/api/module0/annual_dashboard_setting_create', {
        params: data,
        userid: userid,
        usertype: usertype,
        usergroup: usergroup,
        SETTING_USER_TYPE_GROUP: typeID,
        ACCESS_USER_DIVISION: accessuserDivision,
        ACCESS_USER_DEPARTMENT: accessuserDepartment,
        ACCESS_USER_GROUP: accessuserGROUP,
    }).then(response => {
        // console.log(JSON.stringify(response.data));
        // Vue.$toast.open({
        //     message: response.data.message,
        //     type: 'success',
        // });
        return response.data;
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
export async function deleteAnnualDashboardSetting(postid) {
    // await servicesModule1.header();
    return axios.post('/api/module0/delete_annual_dashboard_setting', {
        DISPLAY_SETTING_ID: postid
    }).then(response => {
        console.log(JSON.stringify(response.data));
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
        // Consultant Alert Report

    });
}

// --------------------- Main Dashboard Setting --------------------
export async function getMAINDASHBOARDSettingList(uid,utype) {
    await servicesModule0.header();
    return axios.get('/api/module0/dashboard_setting_main', {
        params: {
            SETTING_USER_ID: uid,
            SETTING_USER_TYPE: utype,
            // SETTING_USER_GROUP: ugroup,
            // SETTING_USER_DEPARTMENT: userDepartment,
            // SETTING_USER_TYPE_GROUP: typeID,
        }
    }).then(response => {
        console.log('setting general list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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
                //logout();
            }
            return 'error';
        }


    });
}
export async function createMainDashboardSetting(data, userid, usertype) {
    // await servicesModule1.header();
    return axios.post('/api/module0/main_dashboard_setting_create', {
        params: data,
        userid: userid,
        usertype: usertype

    }).then(response => {
        // console.log(JSON.stringify(response.data));
        // Vue.$toast.open({
        //     message: response.data.message,
        //     type: 'success',
        // });
        return response.data;
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
export async function deleteMainDashboardSetting(postid) {
    // await servicesModule1.header();
    return axios.post('/api/module0/delete_main_dashboard_setting', {
        DISPLAY_SETTING_ID: postid
    }).then(response => {
        console.log(JSON.stringify(response.data));

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
export async function getAllDistributorGroup() {
    await servicesModule0.header();
    return axios.get('/api/module0/get_distributor_group').then(response => {
      // console.log('data :' + JSON.stringify(response.data.data));
      return response.data.data;
    }).catch(function (error) {
      if (error.response) {
        // Vue.$toast.open({
        //     message: error.response.data.message,
        //     type: 'error',
        // });
  
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
  // Page Maintance By Tahmina
  export async function getAllModuleList() {
    await servicesModule0.header();
    return axios.get('/api/module0/modules', {
        // params: {
        //     USER_TYPE: data
        // },
    }).then(response => {
        console.log(' list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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
export async function getAllModuleListByType(data) {
    await servicesModule0.header();
    return axios.get('/api/module0/modulesbytype', {
        params: {
            USER_TYPE: data
        },
    }).then(response => {
        console.log(' list :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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

export async function getMaintanceNotification(user_type,menutitle) {
    //await servicesModule0.header();
    console.log('data11');
    return axios.get('/api/module0/getMaintanceNotificationlist', {
      params: {
        USER_TYPE:user_type,
        menutitle:menutitle,
      },
    }).then(response => {
      console.log('data11111111111 :' ,response.data.data);
      return response.data.data;
    }).catch(function (error) {
      if (error.response) {
        // Vue.$toast.open({
        //     message: error.response.data.message,
        //     type: 'error',
        // });
  
        if (error.response.status == 500) {
          if (error.response.data.message == 'Token expired.') {
            console.log('logout');
            servicesModule0.logout();
          }
          // else {
          //     // console.log(error.response.data.message); disabled
          // }
        } else if (error.response.status == 401) {
          servicesModule0.logout();
        }
        return 'error';
      }
    });
  }

  export async function getPageNotificationListByType(user_type) {
    await servicesModule0.header();
    return axios.get('/api/module0/getPageNotificationListByType', {
      params: {
        USER_TYPE:user_type,
      },
    }).then(response => {
      //console.log('data11111111111 :' + JSON.stringify(response.data));
      return response.data.data;
    }).catch(function (error) {
      if (error.response) {
        // Vue.$toast.open({
        //     message: error.response.data.message,
        //     type: 'error',
        // });
  
        if (error.response.status == 500) {
          if (error.response.data.message == 'Token expired.') {
            console.log('logout');
            servicesModule0.logout();
          }
          // else {
          //     // console.log(error.response.data.message); disabled
          // }
        } else if (error.response.status == 401) {
          servicesModule0.logout();
        }
        return 'error';
      }
    });
  }
  export async function getPageMaintenanceDetailById(data) {
    await servicesModule0.header()
    return axios.get('/api/module0/detail_page', {
        params: {
            PAGE_MAINTENANCE_ID: data
        },
    }).then(response => {
        console.log(response.data)
        return response.data.data
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                logout()
            } else {
                return 'error'
            }
        }
    })
}

export async function getPageNotificationListByTypeOthers(user_type) {
   // await servicesModule0.header();
    return axios.get('/api/module0/getPageNotificationListByTypeOthers', {
      params: {
        USER_TYPE:user_type,
      },
    }).then(response => {
      //console.log('data11111111111 :' + JSON.stringify(response.data));
      return response.data.data;
    }).catch(function (error) {
      if (error.response) {
        // Vue.$toast.open({
        //     message: error.response.data.message,
        //     type: 'error',
        // });
  
        if (error.response.status == 500) {
          if (error.response.data.message == 'Token expired.') {
            console.log('logout');
          //  servicesModule0.logout();
          }
          // else {
          //     // console.log(error.response.data.message); disabled
          // }
        } else if (error.response.status == 401) {
        //  servicesModule0.logout();
        }
        return 'error';
      }
    });
  }

  //* *** Distributor ID Masking Setting *************/
export async function getDistributorAllMasking() {
    // await this.header();
    return axios.get("/api/module0/distributor_all_masking", {
        // params: {
        //     MASKING_TYPE: data
        // }
    }).then(response => {
        // console.log("division list :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}

export async function getDistributorLatestMasking() {
    // await this.header();
    return axios.get("/api/module0/distributor_latest_masking", {
        // params: {
        //     MASKING_TYPE: data
        // }
    }).then(response => {
        // console.log("division list :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}
export async function createDistributorIdMasking(data) {
    //await this.header();
    return axios.post("/api/module0/create_distributor_masking", data).then(response => {
        if (response.data.message == "Data Already Exist!!") {
            generalAlertError(response.data.message);
        } else {
            generalAlert(response.data.message);
        }
        return response.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}
export async function getDistributorMaskingById(data) {
    // await this.header();
    return axios.get("/api/module0/distributor_masking_by_id", {
        params: {
            DISTRIBUTOR_MASKING_ID: data
        }
    }).then(response => {
        console.log("data :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}
export async function updateDistributorMasking(data) {
    let jsonObject = {};

    for (const [key, value] of data) {
        jsonObject[key] = value;
    }
    return axios
        .put("/api/module0/distributor_masking_update", jsonObject)
        .then(response => {
            generalAlert(response.data.message);
            return response.data;
        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 401) {
                    servicesModule0.logout();
                } else {
                    return "error"
                }
            }
        });
}
 //* *** Consultant ID Masking Setting *************/
 export async function getConsultantAllMasking() {
    // await this.header();
    return axios.get("/api/module0/consultant_all_masking", {
        // params: {
        //     MASKING_TYPE: data
        // }
    }).then(response => {
        // console.log("division list :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}

export async function getConsultantLatestMasking() {
    // await this.header();
    return axios.get("/api/module0/consultant_latest_masking", {
        // params: {
        //     MASKING_TYPE: data
        // }
    }).then(response => {
        // console.log("division list :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}
export async function createConsultantIdMasking(data) {
    //await this.header();
    return axios.post("/api/module0/create_consultant_masking", data).then(response => {
        if (response.data.message == "Data Already Exist!!") {
            generalAlertError(response.data.message);
        } else {
            generalAlert(response.data.message);
        }
        return response.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}
export async function getConsultantMaskingById(data) {
    // await this.header();
    return axios.get("/api/module0/consultant_masking_by_id", {
        params: {
            CONSULTANT_MASKING_ID: data
        }
    }).then(response => {
        console.log("data :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}
export async function updateConsultantMasking(data) {
    let jsonObject = {};

    for (const [key, value] of data) {
        jsonObject[key] = value;
    }
    return axios
        .put("/api/module0/consultant_masking_update", jsonObject)
        .then(response => {
            generalAlert(response.data.message);
            return response.data;
        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 401) {
                    servicesModule0.logout();
                } else {
                    return "error"
                }
            }
        });
}

export async function getMainModuleList() {
    // await this.header();
    return axios.get("/api/module0/main_module_type").then(response => {
        // console.log("division list :" + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}
export async function getAuditTrailData(data) {
    //console.log("DISTRIBUTOR_ID1=",data);
    return axios.post('/api/module0/get_audit_trail_data', data).then(response => {
       // generalAlert(response.data.message);
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                servicesModule0.logout();
            } else {
                return "error"
            }
        }
    });
}

export async function searchConsFee(data) {
    await servicesModule0.header();
    return axios.post('/api/module0/cons_fee_filter', data).then(response => {
        // console.log("exception create :" + JSON.stringify(response.data));
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
export async function searchDistFee(data) {
    await servicesModule0.header();
    return axios.post('/api/module0/dist_fee_filter', data).then(response => {
        // console.log("exception create :" + JSON.stringify(response.data));
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
export async function searchWaiverFee(data) {
    await servicesModule0.header();
    return axios.post('/api/module0/waiver_fee_filter', data).then(response => {
        // console.log("exception create :" + JSON.stringify(response.data));
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



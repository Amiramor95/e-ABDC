import axios from "axios";
import Vue from 'vue'
import * as servicesModule0 from '../module0/services'
import { logout } from "../module1/services03";

export async function getAllCompany() {
    return axios.get('/api/module5/get_company_list').then(response => {
        console.log('Company list :' + JSON.stringify(response.data.data))
        return response.data.data
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

export async function createNewCompany(data) {
    return axios.post('/api/module5/create_newCompany', data).then(response => {
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

export async function deleteRecord(data) {
    return axios.delete('/api/module5/delete_company', {
            params: {
                COMPANY_ID: data,
            },
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

export async function getCompanyById(data) {
    return axios.get('/api/module5/get_companyById', {
            params: {
                COMPANY_ID: data,
            },
        })
        .then(response => {
            console.log('data :' + JSON.stringify(response.data));
            return response.data;
        }).catch(function(error) {
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

export async function updateCompany(data) {
    return axios.post('/api/module5/update_Company', data).then(response => {
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

//************************************************User************************************************************** */
export async function getAllUser() {
    return axios.get('/api/module5/get_user_list').then(response => {
        console.log('User list :' + JSON.stringify(response.data.data))
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

export async function newUserRegistration(data) {
    return axios.post('/api/module5/newUser_mediaRegistration', data).then(response => {
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

export async function getNewSubmission() {
    return axios.get('/api/module5/get_newSubmission_list').then(response => {
        console.log('new User list :' + JSON.stringify(response.data.data))
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

export async function updateUser(data) {
    return axios.post('/api/module5/update_media_user', data).then(response => {
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

export async function rejectUser(data) {
    return axios.post('/api/module5/reject_media_user', data)
        .then(response => {
            console.log('data :' + JSON.stringify(response.data));
            Vue.$toast.open({
                message: response.data.message,
                type: 'success',
            });
            return response.data;
        }).catch(function(error) {
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

export async function deleteUser(data) {
    return axios.delete('/api/module5/delete_media_user', {
            params: {
                MEDIA_USERID: data,
            },
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

export async function getResetCount() {
    return axios.get("/api/module5/count_rest").then(response => {
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

export async function resetUserPassword(data) {
    return axios.post('/api/module5/reset_media_user', data).then(response => {
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

export async function rejectResetPassword(data) {
    return axios.post('/api/module5/rejectReset_media_user', data).then(response => {
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

//************************************************new Registration******************************************** */

export async function checkDuplicateEmail(data) {
    return axios.get('/api/module5/user_check_email', {
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

export async function checkDuplicateMediaUserID(data) {
    return axios
        .get("/api/module5/user_check_mediaUserID", {
            params: {
                USER_ID: data,
            },
        })
        .then((response) => {
            console.log(response.data);
            return response.data;
        })
        .catch(function(error) {
            if (error.response) {
                if (error.response.status == 500) {
                    if (error.response.data.message == "Token expired.") {
                        console.log("logout");
                        logout();
                    } else {
                        console.log(error.response.data.message);
                    }
                } else if (error.response.status == 401) {
                    logout();
                }
                return error.response.data;
            }
        });
}

//*********************************************login page******************************************************** */

export async function verifyMediaUser(data) {
    return axios.get('/api/module5/verify_media_user', {
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
            if (error.response.status == 500) {
                if (error.response.data.message == 'Token expired.') {
                    console.log('logout');
                    return error.response.data.message;
                } else {
                    console.log(error.response.data.message);
                    return error.response.data.message;
                }
            } else if (error.response.status == 401) {
                return error.response.data.message;
            }
            return error.response;
        }
    });
}

//*********************************************NAV Management******************************************************** */
export async function getAllRecordById(data) {
    return axios.get('/api/module5/get_allRecordById', {
        params: {
            DIST_ID: data,
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

export async function getDistApprRecordById(data, distId) {
    return axios.get('/api/module5/get_distApprRecordById', {
        params: {
            APPR_GROUP_ID: data,
            DIST_ID: distId,
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

export async function getSubmissionRecordByID(data) {
    return axios.get('/api/module5/get_submissionRecordById', {
        params: {
            NAV_TEMP_MASTER_ID: data,
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

export async function getDistAuditLog(data) {
    return axios.get('/api/module5/get_distAuditLog', {
        params: {
            NAV_TEMP_MASTER_ID: data,
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

export async function updateVerify(data) {
    return axios.post('/api/module5/nav_verify_update', data).then(response => {
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

//************************************FIMM Approval Nav **************************************/
export async function getFimmApprRecordById(data) {
    return axios.get('/api/module5/get_fimmApprRecordById').then(response => {
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
export async function getAllRecord() {
    return axios.get('/api/module5/get_allRecord').then(response => {
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

export async function getFimmAuditLog(data) {
    return axios.get('/api/module5/get_fimmAuditLog', {
        params: {
            NAV_TEMP_MASTER_ID: data,
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

export async function updateFimmVerify(data) {
    return axios.post('/api/module5/nav_fimm_verify', data).then(response => {
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

export async function updateFimmApproval(data) {
    return axios.post('/api/module5/nav_fimm_approval', data).then(response => {
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
// Nurul
import axios from 'axios'
import Vue from 'vue'
import * as servicesModule0 from '../module0/services'

//*********************************distribution point*************************/
export async function getDistPointByDistID(data) {
    await servicesModule0.header()
    return axios.get('/api/module1/getDistributionPointByDistID', {
        params: {
            DISTRIBUTOR_ID: data,
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

export async function getStatus() {
    await servicesModule0.header()
    return axios.get('/api/module1/getStatus').then(response => {
        console.log('Status list :' + JSON.stringify(response.data.data))
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

export async function getAllByID(data) {
    await servicesModule0.header()
    return axios.get('/api/module1/getAllByID', {
        params: {
            DIST_POINT_ID: data,
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

export async function getAllCountry() {
    await servicesModule0.header()
    return axios.get('/api/module1/getAllCountry').then(response => {
        console.log('Country list :' + JSON.stringify(response.data.data))
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

export async function getCountryByID(data) {
    await servicesModule0.header()
    return axios.get('/api/module1/getCountryByID', {
        params: {
            SETTING_GENERAL_ID: data,
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

export async function getStateByID(data) {
    await servicesModule0.header()
    return axios.get('/api/module1/getStateByID', {
        params: {
            SET_VALUE: data,
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

export async function getCityByID(data) {
    await servicesModule0.header()
    return axios.get('/api/module1/getCityByID', {
        params: {
            SETTING_GENERAL_ID: data,
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

export async function getPostcodeByID(data) {
    await servicesModule0.header()
    return axios.get('/api/module1/getPostcodeByID', {
        params: {
            SETTING_CITY_ID: data,
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

export async function createDP(data) {
    await servicesModule0.header();
    return axios.post("/api/module1/create_distributorPoint", data).then(response => {
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

export async function updateDP(data) {
    await servicesModule0.header();
    return axios.post("/api/module1/update_distributorPoint", data).then(response => {
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

//*********************************acceptance list*********************************/
export async function uploadNewAcceptance(data) {
    await servicesModule0.header();
    return axios.post("/api/module1/import_new_acceptance", data).then(response => {
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

export async function getAcceptanceListByDistID(data) {
    await servicesModule0.header()
    return axios.get('/api/module1/getAcceptanceListByDistID', {
        params: {
            DISTRIBUTOR_ID: data,
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

export async function getCompanyId(data) {
    await servicesModule0.header();
    return axios.get("/api/module1/company_record", {
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

export async function checkRunNo(data) {
    await servicesModule0.header();
    return axios.get("/api/module1/dist_runNumber", {
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

export async function getCandidateListByDistID(data) {
    await servicesModule0.header()
    return axios.get('/api/module1/getCandidateListByDistID', {
        params: {
            CANDIDATE_ACCEPTANCE_ID: data,
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

export async function deleteCandidate(data) {
    await servicesModule0.header();
    return axios.delete('/api/module1/delete_candidate', {
            params: {
                ACCEPTANCE_DETAILS_ID: data,
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

export async function getRejectedListByID(data) {
    await servicesModule0.header();
    return axios.get("/api/module1/get_rejectedByID", {
        params: {
            CANDIDATE_ACCEPTANCE_ID: data,
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

export async function getAcceptedListByID(data) {
    await servicesModule0.header();
    return axios.get("/api/module1/get_acceptedByID", {
        params: {
            CANDIDATE_ACCEPTANCE_ID: data,
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

export async function discardRecord(data) {
    await servicesModule0.header();
    return axios.delete('/api/module1/discard_record', {
            params: {
                CANDIDATE_ACCEPTANCE_ID: data,
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

export async function acceptRecord(data) {
    await servicesModule0.header();
    return axios.post("/api/module1/accept_record", data).then(response => {
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

export async function deleteRecord(data) {
    await servicesModule0.header();
    return axios.delete('/api/module1/delete_record', {
            params: {
                CANDIDATE_ACCEPTANCE_ID: data,
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

export async function filterRecordList(data) {
    await servicesModule0.header();
    return axios.get('/api/module1/filter_record', { params: data }).then(response => {
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

export async function emailCandidate(data) {
    await servicesModule0.header();
    return axios.post("/api/module1/email_candidate", data).then(response => {
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

//*******************************************************Suspend/revocation************************************************************************ */

export async function getAllDistributor() {
    await servicesModule0.header()
    return axios.get('/api/module1/get_distributor_records').then(response => {
        console.log('Record list :' + JSON.stringify(response.data.data))
        return response.data.data
    }).catch(function(error) {
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

export async function submitSubmission(data) {
    await servicesModule0.header();
    return axios.post("/api/module1/create_suspend_revoke_submission", data).then(response => {
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

export async function getAllList() {
    await servicesModule0.header()
    return axios.get('/api/module1/suspend_revoke_records').then(response => {
        console.log('Record list :' + JSON.stringify(response.data.data))
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

export async function getDocumentById(data) {
    await servicesModule0.header();
    return axios.get('/api/module1/get_document', {
        params: {
            SUSPEND_REVOKE_ID: data,
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

export async function deleteDocument(data) {
    await servicesModule0.header();
    return axios.delete('/api/module1/delete_document', {
            params: {
                SR_DOCUMENT_ID: data,
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

export async function updateSubmission(data) {
    await servicesModule0.header();
    return axios.post("/api/module1/update_suspend_revoke_submission", data).then(response => {
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

export async function getApprRecordById(data, type) {
    await servicesModule0.header()
    return axios.get('/api/module1/appr_record', {
        params: {
            APPR_GROUP_ID: data,
            SUBMISSION_TYPE: type,
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

export async function getAuditApprovalByID(data) {
    await servicesModule0.header()
    return axios.get('/api/module1/audit_approval_record', {
        params: {
            SUSPEND_REVOKE_ID: data,
        },
    }).then(response => {
        console.log('data :' + JSON.stringify(response.data.data))
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

export async function updateApproval(data) {
    await servicesModule0.header()
    return axios.post('/api/module1/approval_update', data).then(response => {
        // console.log("exception create :" + JSON.stringify(response.data));
        Vue.$toast.open({
            message: response.data.message,
            type: 'success',
        });
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

export async function createDocument(data) {
    await servicesModule0.header()
    return axios.post('/api/module1/create_document', data).then(response => {
        // console.log("exception create :" + JSON.stringify(response.data));
        // Vue.$toast.open({
        //   message: response.data.message,
        //   type: 'success',
        // });
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

export async function updateApprovalCeo(data) {
    await servicesModule0.header()
    return axios.post('/api/module1/approval_update_ceo', data).then(response => {
        // console.log("exception create :" + JSON.stringify(response.data));
        Vue.$toast.open({
            message: response.data.message,
            type: 'success',
        });
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

export async function getDocumentByApprover(data, user) {
    await servicesModule0.header();
    return axios.get('/api/module1/get_document_byApprover', {
        params: {
            SUSPEND_REVOKE_ID: data,
            CREATE_BY: user,
        },
    }).then(response => {
        console.log("Dococument list : " + JSON.stringify(response.data.data));
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

export async function suspendDistributorConsultant(data) {
    await servicesModule0.header()
    return axios.post('/api/module1/suspend_distributorConsultant', data).then(response => {
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

export async function filterSuspendRevokeRecordList(data) {
    await servicesModule0.header()
    return axios.get('/api/module1/filter_suspendRevoke_record', { params: data }).then(response => {
        console.log('data :' + JSON.stringify(response.data.data))
        return response.data.data
    }).catch(function(error) {
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

export async function getAppealDays(data) {
    await servicesModule0.header();
    return axios.get('/api/module1/get_appealDays', {
        params: {
            DIST_SET_TYPE: data,
        },
    }).then(response => {
        console.log("appeal days: " + JSON.stringify(response.data.data));
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


//*******************************************************Suspend/revocation Appeal************************************************************************ */

export async function getListForAppeal(data) {
    await servicesModule0.header();
    return axios.get('/api/module1/get_list_byID', {
        params: {
            DISTRIBUTOR_ID: data,
        },
    }).then(response => {
        console.log("Dococument list : " + JSON.stringify(response.data.data));
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

export async function acceptSuspendRevoke(data) {
    await servicesModule0.header()
    return axios.post('/api/module1/accept_suspendRevoke', data).then(response => {
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

export async function updateAppeal(data) {
    await servicesModule0.header()
    return axios.post('/api/module1/appeal_update', data).then(response => {
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

export async function createDocumentAppeal(data) {
    await servicesModule0.header()
    return axios.post('/api/module1/create_document_appeal', data).then(response => {
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

export async function getAppealDocById(data) {
    await servicesModule0.header();
    return axios.get('/api/module1/get_appeal_document', {
        params: {
            SUSPEND_REVOKE_APPEAL_ID: data,
        },
    }).then(response => {
        console.log("Dococument list : " + JSON.stringify(response.data.data));
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

export async function deleteAppealDocument(data) {
    await servicesModule0.header();
    return axios.delete('/api/module1/delete_appeal_document', {
            params: {
                SR_APPEAL_DOC_ID: data,
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

//*******************************************************Appeal Approval****************************************************************************** */
export async function getAllListAppeal() {
    await servicesModule0.header()
    return axios.get('/api/module1/appeal_suspend_revoke_records').then(response => {
        console.log('Record list :' + JSON.stringify(response.data.data))
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

export async function filterSuspenRevokeRecordAppealList(data) {
    await servicesModule0.header()
    return axios.get('/api/module1/filter_suspendRevokeAppeal_record', { params: data }).then(response => {
        console.log('data :' + JSON.stringify(response.data.data))
        return response.data.data
    }).catch(function(error) {
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

export async function getDocumentByAppealApprover(data, user) {
    await servicesModule0.header();
    return axios.get('/api/module1/get_appeal_approver_document', {
        params: {
            SUSPEND_REVOKE_APPEAL_ID: data,
            CREATE_BY: user,
        },
    }).then(response => {
        console.log("Dococument list : " + JSON.stringify(response.data.data));
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

export async function getAllDocumentByAppealApprover(data) {
    await servicesModule0.header();
    return axios.get('/api/module1/getAll_appeal_approver_document', {
        params: {
            SUSPEND_REVOKE_APPEAL_ID: data,
        },
    }).then(response => {
        console.log("Dococument list : " + JSON.stringify(response.data.data));
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

export async function getAuditAppealApprovalByID(data) {
    await servicesModule0.header()
    return axios.get('/api/module1/audit_appeal_approval_record', {
        params: {
            SUSPEND_REVOKE_APPEAL_ID: data,
        },
    }).then(response => {
        console.log('data :' + JSON.stringify(response.data.data))
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

export async function updateAppealApproval(data) {
    await servicesModule0.header()
    return axios.post('/api/module1/appeal_approval_update', data).then(response => {
        // console.log("exception create :" + JSON.stringify(response.data));
        Vue.$toast.open({
            message: response.data.message,
            type: 'success',
        });
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

export async function updateAppealReview(data) {
    await servicesModule0.header()
    return axios.post('/api/module1/appeal_approval_review', data).then(response => {
        // console.log("exception create :" + JSON.stringify(response.data));
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

export async function updateAppealRejectRevoke(data) {
    await servicesModule0.header()
    return axios.post('/api/module1/appeal_approval_reject_revoke', data).then(response => {
        // console.log("exception create :" + JSON.stringify(response.data));
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

export async function getAppealComment(data, group) {
    await servicesModule0.header();
    return axios.get('/api/module1/get_appealComment', {
        params: {
            SUSPEND_REVOKE_APPEAL_ID: data,
            APPR_GROUP_ID: group,
        },
    }).then(response => {
        console.log("Dococument list : " + JSON.stringify(response.data.data));
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

export async function createDocumentAppealApproval(data) {
    await servicesModule0.header()
    return axios.post('/api/module1/create_document_appeal_approval', data).then(response => {
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

export async function deleteAppealApprovalDocument(data) {
    await servicesModule0.header();
    return axios.delete('/api/module1/delete_appealApproval_document', {
            params: {
                SR_APPRD_ID: data,
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

export async function getAppealApprRecordById(data, type) {
    await servicesModule0.header()
    return axios.get('/api/module1/appeal_appr_record', {
        params: {
            APPR_GROUP_ID: data,
            SUBMISSION_TYPE: type,
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

export async function updateAppealApprovalCeo(data) {
    await servicesModule0.header()
    return axios.post('/api/module1/appeal_approval_update_ceo', data).then(response => {
        // console.log("exception create :" + JSON.stringify(response.data));
        Vue.$toast.open({
            message: response.data.message,
            type: 'success',
        });
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

export async function unSuspendDistributorConsultant(data) {
    await servicesModule0.header()
    return axios.post('/api/module1/action_unSuspend', data).then(response => {
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

export async function actionRevoke(data) {
    await servicesModule0.header()
    return axios.post('/api/module1/action_revoke', data).then(response => {
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

//*******************************************************Cessation****************************************************************************** */

//distributor

export async function getSubmissionList(data) {
    await servicesModule0.header();
    return axios.get('/api/module1/cessation_list_byDistributor', {
        params: {
            DISTRIBUTOR_ID: data,
        },
    }).then(response => {
        console.log("Dococument list : " + JSON.stringify(response.data.data));
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

export async function getActiveDistributor() {
    await servicesModule0.header()
    return axios.get('/api/module1/get_active_distributor').then(response => {
        console.log('Record list :' + JSON.stringify(response.data.data))
        return response.data.data
    }).catch(function(error) {
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

export async function getCessationType() {
    await servicesModule0.header()
    return axios.get('/api/module1/get_cessation_type').then(response => {
        console.log('Record list :' + JSON.stringify(response.data.data))
        return response.data.data
    }).catch(function(error) {
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

export async function getDistributorInfo(data) {
    await servicesModule0.header();
    return axios.get("/api/module1/get_distributor_info", {
        params: {
            USER_DIST_ID: data,
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

export async function getBankList() {
    await servicesModule0.header()
    return axios.get('/api/module1/get_bank_list').then(response => {
        console.log('Record list :' + JSON.stringify(response.data.data))
        return response.data.data
    }).catch(function(error) {
        if (error.response) {
            if (error.response.status == 401) {} else {
                return 'error'
            }
        }
    })
}

export async function submitCessationForm(data) {
    await servicesModule0.header();
    return axios.post("/api/module1/create_cessation_submission", data).then(response => {
        Vue.$toast.open({
            message: response.data.message,
            type: 'success',
        });
        return response.data;
    }).catch(function(error) {
        if (error.response) {
            if (error.response.status == 401) {
                logout();
            } else {
                return "error"
            }
        }
    });
}

export async function getCessationDocById(data) {
    await servicesModule0.header();
    return axios.get('/api/module1/get_cessation_document', {
        params: {
            CESSATION_ID: data,
        },
    }).then(response => {
        console.log("Dococument list : " + JSON.stringify(response.data.data));
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

export async function getLetterDocById(data) {
    await servicesModule0.header();
    return axios.get('/api/module1/get_letter_document', {
        params: {
            CESSATION_ID: data,
        },
    }).then(response => {
        console.log("Dococument list : " + JSON.stringify(response.data.data));
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

export async function getDistributorAuditLogByID(data) {
    await servicesModule0.header()
    return axios.get('/api/module1/audit_cessation_record', {
        params: {
            CESSATION_ID: data,
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

export async function getCessationDetailsByID(data) {
    await servicesModule0.header()
    return axios.get('/api/module1/get_cessation_details_byID', {
        params: {
            CESSATION_ID: data,
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

export async function updateCessationForm(data) {
    await servicesModule0.header();
    return axios.post("/api/module1/update_cessation_submission", data).then(response => {
        Vue.$toast.open({
            message: response.data.message,
            type: 'success',
        });
        return response.data;
    }).catch(function(error) {
        if (error.response) {
            if (error.response.status == 401) {
                logout();
            } else {
                return "error"
            }
        }
    });
}

export async function deleteAuthorizationLetter(data) {
    await servicesModule0.header();
    return axios.delete('/api/module1/delete_authorization_letter', {
            params: {
                CAL_DOCUMENT_ID: data,
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

export async function deleteAuthorizationLetterById(data) {
    await servicesModule0.header();
    return axios.delete('/api/module1/delete_authorization_letter_byCessationId', {
            params: {
                CESSATION_ID: data,
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

export async function uploadCessationDocument(data) {
    await servicesModule0.header()
    return axios.post('/api/module1/upload_cessation_document', data).then(response => {
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

export async function uploadLetterDocument(data) {
    await servicesModule0.header()
    return axios.post('/api/module1/upload_letter_document', data).then(response => {
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

export async function deleteCessationDocument(data) {
    await servicesModule0.header();
    return axios.delete('/api/module1/delete_cessation_document', {
            params: {
                CD_DOCUMENT_ID: data,
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

export async function getSubmissionListByGroupID(data, groupId) {
    await servicesModule0.header();
    return axios.get('/api/module1/cessation_list_byGroupId', {
        params: {
            DISTRIBUTOR_ID: data,
            APPR_GROUP_ID: groupId
        },
    }).then(response => {
        console.log("Dococument list : " + JSON.stringify(response.data.data));
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

export async function updateManagerApproval(data) {
    await servicesModule0.header()
    return axios.post('/api/module1/update_manager_approval', data).then(response => {
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

export async function getDocumentByManagerApprover(data, user) {
    await servicesModule0.header();
    return axios.get('/api/module1/get_document_byManagerApprover', {
        params: {
            CESSATION_ID: data,
            CREATE_BY: user,
        },
    }).then(response => {
        console.log("Dococument list : " + JSON.stringify(response.data.data));
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

//fimm approval (rd)
export async function getCessationOverviewList() {
    await servicesModule0.header();
    return axios.get('/api/module1/cessation_all_list').then(response => {
        console.log("record list : " + JSON.stringify(response.data.data));
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

export async function getCessationSubmissionList(data) {
    await servicesModule0.header();
    return axios.get('/api/module1/cessation_list_byFimmGroupId', {
        params: {
            APPR_GROUP_ID: data
        },
    }).then(response => {
        console.log("record list : " + JSON.stringify(response.data.data));
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

export async function getFimmAuditLogByID(data) {
    await servicesModule0.header()
    return axios.get('/api/module1/fimm_audit_cessation_record', {
        params: {
            CESSATION_ID: data,
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

export async function getAllDocumentByFimmApprover(data) {
    await servicesModule0.header();
    return axios.get('/api/module1/get_fimm_cessation_document', {
        params: {
            CESSATION_ID: data,
        },
    }).then(response => {
        console.log("Dococument list : " + JSON.stringify(response.data.data));
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

export async function getDocumentByFimmApprover(data, user) {
    await servicesModule0.header();
    return axios.get('/api/module1/get_fimm_cessation_document_byID', {
        params: {
            CESSATION_ID: data,
            CREATE_BY: user,
        },
    }).then(response => {
        console.log("Dococument list : " + JSON.stringify(response.data.data));
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

export async function uploadFimmCessationDocument(data) {
    await servicesModule0.header()
    return axios.post('/api/module1/fimm_upload_cessation_document', data).then(response => {
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

export async function fimmUpdateApproval(data) {
    await servicesModule0.header()
    return axios.post('/api/module1/update_fimm_approval', data).then(response => {
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

export async function deleteFimmCessationDocument(data) {
    await servicesModule0.header();
    return axios.delete('/api/module1/delete_fimm_cessation_document', {
            params: {
                CFD_DOCUMENT_ID: data,
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

//Fimm approval(hod)
export async function fimmUpdateHodApproval(data) {
    await servicesModule0.header()
    return axios.post('/api/module1/update_fimm_hod_approval', data).then(response => {
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

export async function actionCease(data) {
    await servicesModule0.header()
    return axios.post('/api/module1/action_cease', data).then(response => {
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

// Get distributor template
export async function getDistTemplate() {
    await servicesModule0.header()
    return axios.get('/api/module1/dist_templates')
        .then(response => {
            // console.log(response.statusText);
            console.log('list template: ' + JSON.stringify(response.data.data));
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

export async function getCompanyStatusID(data) {
    await servicesModule0.header()
    return axios.get("/api/module1/company_status", {
        params: {
            DIST_ID: data,
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

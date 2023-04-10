// Nurul - MODULE 3

import axios from 'axios'
import Vue from 'vue'
import * as servicesModule0 from '../module0/services'

// Consultant Alert
// 1. Consultant alert record
export async function getAllClassification() {
    await servicesModule0.header()
    return axios.get('/api/module3/ca_classification').then(response => {
        console.log('Classification list :' + JSON.stringify(response.data.data))

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
export async function getAllRecordList() {
    await servicesModule0.header()
    return axios.get('/api/module3/ca_records').then(response => {
        console.log('Record list :' + JSON.stringify(response.data.data))

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

export async function getAllOverviewList() {
    await servicesModule0.header()
    return axios.get('/api/module3/ca_records_overview').then(response => {
        console.log('Record list :' + JSON.stringify(response.data.data))

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

export async function getCaRecordById(data) {
    await servicesModule0.header()
    return axios.get('/api/module3/ca_record', {
        params: {
            CONSULTANT_ID: data,
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

export async function filterCaRecordList(data) {
    await servicesModule0.header()
    return axios.get('/api/module3/filter_ca_record', { params: data }).then(response => {
        console.log('data :' + JSON.stringify(response.data.data))
        return response.data.data
    }).catch(function(error) {
        if (error.response) {
            // Vue.$toast.open({
            //   message: error.response.data.message,
            //   type: 'error',
            // })
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

export async function filterCaOverviewList(data) {
    await servicesModule0.header()
    return axios.get('/api/module3/filter_ca_overview', { params: data }).then(response => {
        console.log('data :' + JSON.stringify(response.data.data))
        return response.data.data
    }).catch(function(error) {
        if (error.response) {
            // Vue.$toast.open({
            //   message: error.response.data.message,
            //   type: 'error',
            // })
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

export async function createExistingCase(data) {
    await servicesModule0.header()
    return axios.post('/api/module3/create_existingCase', data).then(response => {
        // console.log("exception create :" + JSON.stringify(response.data));
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

export async function createNewCase(data) {
    await servicesModule0.header()
    return axios.post('/api/module3/create_newCase', data).then(response => {
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

// CA DETAILS
export async function getCaDetailsByID(data) {
    await servicesModule0.header()
    return axios.get('/api/module3/ca_detail_record', {
        params: {
            CA_RECORD_DETAILS_ID: data,
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

export async function updateCase(data) {
    await servicesModule0.header()
    return axios.post('/api/module3/ca_detail_update', data).then(response => {
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

// CA APPROVAL

export async function getCaApprovalByID(data) {
    await servicesModule0.header()
    return axios.get('/api/module3/ca_approval_record', {
        params: {
            CA_RECORD_DETAILS_ID: data,
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

export async function getDetailsLog(data) {
    await servicesModule0.header()
    return axios.get('/api/module3/ca_approvalAudit_record', {
        params: {
            CA_RECORD_DETAILS_ID: data,
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

export async function getApprRecordById(data) {
    await servicesModule0.header()
    return axios.get('/api/module3/ca_verification_record', {
        params: {
            APPR_GROUP_ID: data,
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
    return axios.post('/api/module3/ca_approval_update', data).then(response => {
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

export async function updateGmApproval(data) {
    await servicesModule0.header()
    return axios.post('/api/module3/ca_approvalGm_update', data).then(response => {
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

export async function updateVerify(data) {
    await servicesModule0.header()
    return axios.post('/api/module3/ca_verify_update', data).then(response => {
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


//GENERATE LETTER

export async function getAllTemplate() {
    await servicesModule0.header()
    return axios.get('/api/module3/ca_letter').then(response => {
        console.log('Letter Template list :' + JSON.stringify(response.data.data))

        return response.data.data

    }).catch(function(error) {
        if (error.response) {
            //   Vue.$toast.open({
            //     message: error.response.data.message,
            //     type: 'error',
            //   })
            if (error.response.status == 401) {
                logout()
            } else {
                return 'error'
            }
        }
    })
}

export async function getLetterById(data) {
    await servicesModule0.header();
    return axios.get('/api/module3/ca_letterById', {
        params: {
            CAS_LETTER_ID: data,
        },
    }).then(response => {
        console.log("Letter list : " + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            if (error.response.status == 500) {
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


//get document blob
export async function getDocumentById(data) {
    await servicesModule0.header();
    return axios.get('/api/module3/get_document', {
        params: {
            CA_RECORD_DETAILS_ID: data,
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


//delete doc

export async function deleteDocument(data) {
    await servicesModule0.header();
    return axios.delete('/api/module3/delete_document', {
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

//Consultant Alert
//1. Consultant alert record
export async function getAllConsultant() {
    await servicesModule0.header();
    return axios.get("/api/module3/consultant_records").then(response => {
        console.log("Consultant list :" + JSON.stringify(response.data.data));
        return response.data.data;
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

export async function filterConsultantRecordList(data) {
    await servicesModule0.header();
    return axios.get('/api/module3/filter_consultant_record', { params: data }).then(response => {
        console.log('data :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
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

export async function getConsultantById(data) {
    await servicesModule0.header();
    return axios.get("/api/module3/consultant_record", {
        params: {
            CONSULTANT_ID: data,
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

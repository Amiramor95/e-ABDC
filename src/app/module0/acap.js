/* eslint-disable no-undef */
import axios from 'axios';

//* ************* Setting By Module - Distributor  ***************//
export async function getDistributorType() {
    await this.header();
    return axios.get('/api/module0/distributor_type').then(response => {
        console.log('data :' + JSON.stringify(response.data.data));
        return response.data.data;
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
export async function getDistributorMarketingApproach() {

}
export async function getDistributorTypeOfStructure() {}
export async function DeleteDistributorMarketingApproach() {

}
export async function DeleteDistributorTypeOfStructure() {

}
export async function DeleteDistributorType() {

}
export async function createDistributorType() {
    console.log('data : ' + data)
    await this.header()
    return axios.post('/api/module0/sbm_distributor ', data).then(response => {
        console.log(response.data)
        return response.data
    }).catch(function(error) {
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
            return 'error'
        }
    })
}
export async function createDistributorMarketingApproach() {
    console.log('data : ' + data);
    await this.header();
    return axios.post('/api/module0/sms_setting ', data).then(response => {
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
export async function createDistributorTypeOfStructure() {
    console.log('data : ' + data);
    await this.header();
    return axios.post('/api/module0/sms_setting ', data).then(response => {
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
//* ************* Setting By Module - Fund Malaysia  ***************//
export async function getAllFundType() {
    await this.header()
    return axios.get('/api/module0/sbm_fundmalaysiaFundType').then(response => {
        console.log('Fund Type List :' + JSON.stringify(response.data.data))
        return response.data.data
    }).catch(function(error) {
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
            return 'error'
        }
    })
}
export async function deleteFundType(data) {
    return axios
        .delete('/api/module0/sbm_fundmalaysiaFundType', {
            data: { FMS_FUNDTYPE_ID: data },
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
                    if (error.response.data.message == 'Token expired.') {
                        logout()
                    } else {
                        console.log(error.response.data.message)
                    }
                } else if (error.response.status == 401) {
                    logout()
                }
            }
        })
}
export async function createFundType(data) {
    await this.header();
    return axios.post('/api/module0/sbm_fundmalaysiaFundType', data).then(response => {
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
export async function updateFundTypeAPI(data) {
    const jsonObject = {};

    for (const [key, value] of data) {
        jsonObject[key] = value;
    }
    return axios
        .put('/api/module0/sbm_fundmalaysiaFundType', jsonObject)
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

//
import axios from 'axios';

//* ******************* Authorization ********************/
export async function login(data) {
    delete axios.defaults.headers.common['Authorization'];
    return axios.post('/api/module10/login', data).then(response => {
        // localStorage.setItem('realmName', 'realm1');
        console.log(response.data.data)
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
    // return headers;
}

export function getUser() {
    const user = localStorage.getItem('user')
        // this.$store.commit("change", user);
        // console.log("user store :" + this.$store.getters.userDetail);
    return user
}

function getToken() {
    const user = localStorage.getItem('user')
    return JSON.parse(user).access_token
}

export function isLoggedIn() {
    const user = localStorage.getItem('user')
    return user != null
}

export function setUser(user) {
    localStorage.setItem('user', user)
}

export async function checkTokenValidation() {
    await this.header()
    return axios.get('/api/module10/checkTokenValidation').then(response => {
        return response.data
    }).catch(function(error) {
        if (error.response) {
            if (error.response.status == 500) {
                if (error.response.data.message.includes('Expired token')) {
                    // logout();
                } else {
                    console.log(error.response.data.message)
                }
            } else if (error.response.status == 401) {
                // logout();
            }
            return 'not valid'
        }
    })
}

export function logout() {
    localStorage.removeItem('user')
    localStorage.removeItem('realmName');
}

export async function userDetail() {
    await this.header()
    return axios.get('/api/module10/user').then(response => {
        console.log('user detail :' + JSON.stringify(response.data))
        return response.data
    }).catch(function(error) {
        if (error.response) {
            console.log('error response :' + error.response)
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
//* ***************end authorization**************************/

//* ***************Calendar Management ***********************/
export async function getAllExceptionList() {
    await this.header()
    return axios.get('/api/module10/calendar_settings').then(response => {
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
export async function createExcelTemplate(data) {
    await this.header()
    return axios.post('/api/module10/template', data).then(response => {
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
    return axios.get('/api/module10/templates')
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
        .get('/api/module10/template_file', {
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
        .delete('/api/module10/template_file', {
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

//* *****************module*******************/
export async function getAllModule() {
    await this.header()
    return axios.get('/api/module10/modules').then(response => {
        console.log('list : ' + JSON.stringify(response.data))
        return response.data
    })
}

//* *****************Without Middleware*******************/
export async function getDistributorMedia() {
    return axios.get('/api/module10/getDistributorMedia').then(response => {
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
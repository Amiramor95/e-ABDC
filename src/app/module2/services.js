import axios from "axios";
const API = axios.create({
    baseURL: "/api/module2",
});

//* ******************* Authorization ********************/
// export function header() {
//     axios.defaults.headers.common.Authorization =
//         "Bearer " + getToken();
//     // axios.defaults.headers.common.Authorization = 'Bearer ' + getToken();
//     axios.defaults.headers.common.realmName = "realm0";
//     // axios.defaults.headers.common.realmName = localStorage.getItem('realmName');
//     axios.defaults.headers.common.PANELTRACK = getPanelTrack();
//     // axios.defaults.headers.common.UID = JSON.parse(localStorage.getItem('user_id'));
//     axios.defaults.headers.common.UID = JSON.parse(
//         localStorage.getItem("user")
//     ).user_id;
//     axios.defaults.headers.common.GID = JSON.parse(
//         localStorage.getItem("user")
//     ).USER_GROUP_ID;
//     //   axios.defaults.headers.common.UID = 103;
//     //   axios.defaults.headers.common.GID = 1;
//     // axios.defaults.headers.common.realmName = localStorage.getItem("realmName");
//     // axios.defaults.headers.common.UID = JSON.parse(
//     //   localStorage.getItem("user")
//     // ).user_id;
//     // axios.defaults.headers.common.GID = JSON.parse(
//     //   localStorage.getItem("user")
//     // ).USER_GROUP_ID;
//     // new code
//     // const access_token = localStorage.getItem("access_token");
//     // const refresh_token = localStorage.getItem("refresh_token");
//     // const token_data = localStorage.getItem("token_data");
//     // console.log("Token access_token: "+ access_token ,"refresh_token: "+ refresh_token, "token data: "+token_data);
//     // if (access_token) {
//     //   console.log("Token exist: ", access_token);
//     //   API.defaults.headers.common["Authorization"] = "Bearer " + access_token;
//     // }
//     // if (token_data) {
//     //   console.log(token_data);
//     //   API.defaults.data = JSON.parse(token_data);
//     // }
//     // return API;
// }

export function header() {
    const access_token = localStorage.getItem("access_token");
    const refresh_token = localStorage.getItem("refresh_token");
    const token_data = localStorage.getItem("token_data");
    const PANEL_TRACK = localStorage.getItem("PANEL_TRACK");
    const user_id = localStorage.getItem("user_id");
    if (access_token) {
        axios.defaults.headers.common.Authorization = "Bearer " + access_token;
    }
    if (token_data) {
      API.defaults.data = JSON.parse(token_data);
    }
    if (PANEL_TRACK) {
        axios.defaults.headers.common.PANELTRACK = PANEL_TRACK;
    }
    if (user_id) {
        axios.defaults.headers.common.UID = user_id;
    }
    //return API;
}
function getPanelTrack() {
    const user = localStorage.getItem("user");
    return JSON.parse(user).PANEL_TRACK;
}

export function getUser() {
    const user = localStorage.getItem("user");
    // this.$store.commit("change", user);
    // console.log("user store :" + this.$store.getters.userDetail);
    return user;
}

function getToken() {
    const user = localStorage.getItem('user');
    return JSON.parse(user).access_token;
}

export function isLoggedIn() {
    const user = localStorage.getItem("user");
    return user != null;
}

// parameter should convert string object using JSON.stringify before save it here
export function setUser(user) {
    localStorage.setItem("user", user);
    // localStorage.setItem('realmName', 'realm0');
}

export async function login(data) {

    delete axios.defaults.headers.common.Authorization;
    delete axios.defaults.headers.common.realmName;



    return axios
        .post("/api/module2/auth/login", data)
        .then((response) => {
            //
            // this.setUser(response.data.data);
            // localStorage.setItem('realmName', 'realm0');
            // this.$store.commit('change', JSON.stringify(response.data.data))
            // console.log('user store :' + localStorage.getItem('user'))
            console.log(response.data.data);
            return response.data.data;
        })
        .catch(function(error) {
            localStorage.removeItem("user");
            localStorage.removeItem("realmName");

            // if (error.response.status === 500) {
            //     Vue.$toast.open({
            //         message: 'The server encountered an internal error and was unable to complete your request. Please contact the server administrator.',
            //         type: 'error',
            //     })
            // } else {
            //     Vue.$toast.open({
            //         message: error.response.data.message,
            //         type: 'error',
            //     })
            // }
            // console.log(error)
            return error.response.data.message;
        });
}

export async function checkTokenValidation() {
    await this.header();
    return axios
        .get("/api/module2/checkTokenValidation")
        .then((response) => {
            console.log("response :" + JSON.stringify(response.data));
            return response.data;
        })
        .catch(function(error) {
            console.log("error response :" + JSON.stringify(error.response));
            if (error.response) {
                if (error.response.status == 500) {
                    if (error.response.data.message.includes("Expired token")) {
                        // logout();
                    } else {
                        console.log(error.response.data.message);
                    }
                } else if (error.response.status == 401) {
                    // logout();
                }
                return "not valid";
            }
        });
}

export function logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("realmName");
}

export async function userDetail() {
    await this.header();
    return axios
        .get("/api/module2/user")
        .then((response) => {
            console.log("user detail :" + JSON.stringify(response.data));
            return response.data;
        })
        .catch(function(error) {
            if (error.response) {
                console.log("error response :" + error.response);
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 500) {
                    // console.log(JSON.stringify(error.response.data.message));
                    if (error.response.data.message.includes("Expired token")) {
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
//* ***************end authorization**************************/

//* ***************Calendar Management ***********************/
export async function getAllExceptionList() {
    await this.header();
    return axios
        .get("/api/module0/calendar_settings")
        .then((response) => {
            console.log("exception list :" + JSON.stringify(response.data));
            return response.data;
        })
        .catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 500) {
                    // console.log(JSON.stringify(error.response.data.message));
                    if (error.response.data.message.includes("Expired token")) {
                        console.log("logout");
                        logout();
                    } else {
                        console.log(error.response.data.message);
                    }
                } else if (error.response.status == 401) {
                    logout();
                }
                return "error";
            }
        });
}
//* **********************end calendar management************************/

//* *********************Document & Form Template ***********************/
export async function createExcelTemplate(data) {
    await this.header();
    return axios
        .post("/api/module0/template", data)
        .then((response) => {
            console.log(response.data);
            return response.data;
        })
        .catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 500) {
                    // console.log(JSON.stringify(error.response.data.message));
                    if (error.response.data.message.includes("Expired token")) {
                        console.log("logout");
                        logout();
                    } else {
                        console.log(error.response.data.message);
                    }
                } else if (error.response.status == 401) {
                    logout();
                }
                return "error";
            }
        });
}

export async function getAllExcelTemplate() {
    await this.header();
    return axios
        .get("/api/module0/templates")
        .then((response) => {
            console.log(response.statusText);
            console.log("list template: " + response.data);
            return response.data;
            // this.templateList = response.data;
        })
        .catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 500) {
                    // console.log(JSON.stringify(error.response.data.message));
                    if (error.response.data.message.includes("Expired token")) {
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

export async function downloadTemplate(data) {
    await this.header();
    return axios
        .get("/api/module0/template_file", {
            responseType: "arraybuffer",
            params: {
                template_id: data,
            },
        })
        .then((response) => {
            console.log("data :" + JSON.stringify(response));
            return response;
        })
        .catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 500) {
                    // console.log(JSON.stringify(error.response.data.message));
                    if (error.response.data.message.includes("Expired token")) {
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

export async function deleteTemplate(data) {
    return axios
        .delete("/api/module0/template_file", {
            data: { id: data },
        })
        .then((response) => {
            console.log("data :" + JSON.stringify(response.data));
            return response.data;
        })
        .catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 500) {
                    // console.log(JSON.stringify(error.response.data.message));
                    if (error.response.data.message.includes("Expired token")) {
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

//* *****************module*******************/
export async function getAllModule() {
    await this.header();
    return axios.get("/api/module0/modules").then((response) => {
        console.log("list : " + JSON.stringify(response.data));
        return response.data;
    });
}

export async function updateConsultantRegistration(data) {
    await this.header();
    return axios
        .put("/api/module2/updateConsultantRegistration")
        .then((response) => {
            console.log("list : " + JSON.stringify(response.data));
            return response.data;
        });
}

// export async function getImage() {
//     await this.header()
//     return axios.get('/api/module2/getImage').then(response => {
//         console.log(JSON.stringify(response.data));
//         return response.data;
//     })
// }

//* ****************** api ENVY FORMULA ************/
let configEF = {
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Accept",
    },
};

let data = {
    HTTP_CONTENT_LANGUAGE: self.language,
};
export async function getExamCourses() {
    // alert(configEF);
    console.log("configEF", configEF);
    try {
        axios
            .get("https://ems-stg.fimm.com.my/api/v1/registration/exam/courses")
            .then((response) => {
                console.log(JSON.stringify(response.data));
                console.log(response.data);
                console.log(response.status);
                console.log(response.statusText);
                console.log(response.headers);
                console.log(response.config);
                return response.data;
            });
    } catch (error) {
        console.log(error);
    }
}

export async function getExamCoursesProxy() {
    // alert(configEF);
    console.log("configEF", configEF);
    try {
        axios.get("/api/module2/exam_courses").then((response) => {
            console.log(JSON.stringify(response.data));
            console.log(response.data);
            console.log(response.status);
            console.log(response.statusText);
            console.log(response.headers);
            console.log(response.config);
            return response.data;
        });
    } catch (error) {
        console.log(error);
    }
}

export function getSite() {
    axios
        .get("https://ems-stg.fimm.com.my/api/v1/registration/site/sites")
        .then((response) => {
            console.log(JSON.stringify(response.data));
            console.log(response.data);
            console.log(response.status);
            console.log(response.statusText);
            console.log(response.headers);
            console.log(response.config);
            return response.data;
        });
}

export async function getSiteProxy() {
    return axios.get("/api/module2/exam_sites").then((response) => {
        // console.log(JSON.stringify(response.data));
        // console.log(response.data);
        // console.log(response.status);
        // console.log(response.statusText);
        // console.log(response.headers);
        // console.log(response.config);
        return response;
    });
}
export async function getExamListPreference() {
    await this.header();
    axios
        .get(
            "https://ems-stg.fimm.com.my/api/v1/registration/exam/list/preference", {
                responseType: "application/json",
                params: {
                    coursetypeid: "1",
                    siteid: "PSITCP0X",
                    startfrom: "1624147200",
                },
            }
        )
        .then((response) => {
            console.log(JSON.stringify(response.data));
            console.log(response.data);
            console.log(response.status);
            console.log(response.statusText);
            console.log(response.headers);
            console.log(response.config);
            return response.data;
        });
}

export async function getExamListPreferenceProxy(data) {
    await this.header();
    axios
        .get(
            `/api/v1/registration/exam/list/preference?coursename=${data.coursename}&siteid=${data.siteid}&startfrom=${data.startfrom}`, {
                responseType: "application/json",
                params: {
                    token: data.token,
                },
            }
        )
        .then((response) => {
            console.log(JSON.stringify(response.data));
            console.log(response.data);
            console.log(response.status);
            console.log(response.statusText);
            console.log(response.headers);
            console.log(response.config);
            return response.data;
        });
}
// export async function getExamListPreferenceProxy(data) {
//   await this.header();
//   axios
//     .get('/api/module2/list_preferences?', {
//       responseType: 'application/json',
//       params: {
//         token: data.token,
//         coursename: data.coursename,
//         siteid: data.siteid,
//         startfrom: data.startfrom,
//       },
//     })
//     .then(response => {
//       console.log(JSON.stringify(response.data));
//       console.log(response.data);
//       console.log(response.status);
//       console.log(response.statusText);
//       console.log(response.headers);
//       console.log(response.config);
//       return response.data;
//     });
// }
export async function postCandidateRegisterPreference(data) {
    await this.header();
    axios
        .post(
            "https://ems-stg.fimm.com.my/api/v1/registration/candidate/register/preference",
            data, {
                headers: { "Content-Type": "multipart/form-data" },
            }
        )
        .then((response) => {
            console.log(JSON.stringify(response.data));
            console.log(response.data);
            console.log(response.status);
            console.log(response.statusText);
            console.log(response.headers);
            console.log(response.config);
            return response.data;
        })
        .catch((error) => console.log(error));
}

export async function postCandidateRegisterPreferenceProxy(data) {
    await this.header();
    axios
        .post("/api/module2/register_preference", data, {
            headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
            console.log(JSON.stringify(response.data));
            console.log(response.data);
            console.log(response.status);
            console.log(response.statusText);
            console.log(response.headers);
            console.log(response.config);
            return response.data;
        })
        .catch((error) => console.log(error));
}
export async function postRegisterDirect(data) {
    await this.header();
    axios
        .post(
            "https://ems-stg.fimm.com.my/api/v1/registration/candidate/register/direct",
            data, {
                headers: { "Content-Type": "multipart/form-data" },
            }
        )
        .then((response) => {
            console.log(JSON.stringify(response.data));
            console.log(response.data);
            console.log(response.status);
            console.log(response.statusText);
            console.log(response.headers);
            console.log(response.config);
            return response.data;
        });
}

export async function postRegisterDirectProxy(data) {
    await this.header();
    axios
        .post("/api/module2/register_direct", data, {
            headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
            console.log(JSON.stringify(response.data));
            console.log(response.data);
            console.log(response.status);
            console.log(response.statusText);
            console.log(response.headers);
            console.log(response.config);
            return response.data;
        });
}
export async function getProcessPreference(data) {
    await this.header();
    axios
        .get(
            "https://ems-stg.fimm.com.my/api/v1/registration/candidate/process/preference", {
                responseType: "application/json",
                params: {
                    applicationid: data,
                },
            }
        )
        .then((response) => {
            console.log(JSON.stringify(response.data));
            console.log(response.data);
            console.log(response.status);
            console.log(response.statusText);
            console.log(response.headers);
            console.log(response.config);
            return response.data;
        });
}
export async function getProcessPreferenceProxy(data) {
    await this.header();
    axios
        .get("/api/module2/process_preference", {
            responseType: "application/json",
            params: {
                applicationid: data,
            },
        })
        .then((response) => {
            console.log(JSON.stringify(response.data));
            console.log(response.data);
            console.log(response.status);
            console.log(response.statusText);
            console.log(response.headers);
            console.log(response.config);
            return response.data;
        });
}
export async function getCertificate(data) {
    await this.header();
    axios
        .get(
            "https://ems-stg.fimm.com.my/api/v1/registration/candidate/certificate", {
                // responseType: 'application/pdf',
                params: {
                    applicationid: data,
                },
            }
        )
        .then((response) => {
            console.log(JSON.stringify(response.data));
            console.log(response.data);
            console.log(response.status);
            console.log(response.statusText);
            console.log(response.headers);
            console.log(response.config);
            var fileURL = window.URL.createObjectURL(
                new Blob([response.data], { type: "application/pdf" })
            );
            var fileLink = document.createElement("a");
            fileLink.href = fileURL;
            fileLink.setAttribute("download", "file.pdf");
            document.body.appendChild(fileLink);
            fileLink.click();
        });
}

export async function getCertificateProxy(data) {
    await this.header();
    axios
        .get("/api/module2/candidate_certificate", {
            // responseType: 'application/pdf',
            params: {
                applicationid: data,
            },
        })
        .then((response) => {
            console.log(JSON.stringify(response.data));
            console.log(response.data);
            console.log(response.status);
            console.log(response.statusText);
            console.log(response.headers);
            console.log(response.config);
            var fileURL = window.URL.createObjectURL(
                new Blob([response.data], { type: "application/pdf" })
            );
            var fileLink = document.createElement("a");
            fileLink.href = fileURL;
            fileLink.setAttribute("download", "file.pdf");
            document.body.appendChild(fileLink);
            fileLink.click();
        });
}
export async function getResult(data) {
    await this.header();
    axios
        .get("https://ems-stg.fimm.com.my/api/v1/registration/candidate/result", {
            responseType: "application/json",
            params: {
                applicationid: data,
            },
        })
        .then((response) => {
            console.log("data : " + JSON.stringify(response.data));
            console.log(response.status);
            return response.data;
        });
}
export async function getResultProxy(data) {
    await this.header();
    axios
        .get(
            `http://127.0.0.1:8000/api/v1/registration/candidate/result?applicationid=${data.applicationid}`, {
                responseType: "application/json",
                params: {
                    token: data.token,
                },
            }
        )
        .then((response) => {
            console.log("data : " + JSON.stringify(response.data));
            console.log(response.status);
            return response.data;
        });
}
// export async function getResultProxy(data) {
//   await this.header();
//   axios
//     .get('/api/module2/candidate_result', {
//       responseType: 'application/json',
//       params: {
//         applicationid: data,
//       },
//     })
//     .then(response => {
//       console.log('data : ' + JSON.stringify(response.data));
//       console.log(response.status);
//       return response.data;
//     });
// }
export async function postAppeal(data) {
    await this.header();
    axios
        .post(
            "https://ems-stg.fimm.com.my/api/v1/registration/candidate/appeal",
            data, {
                headers: { "Content-Type": "multipart/form-data" },
            }
        )
        .then((response) => {
            console.log(JSON.stringify(response.data));
            console.log(response.data);
            console.log(response.status);
            console.log(response.statusText);
            console.log(response.headers);
            console.log(response.config);
            return response.data;
        });
}
export async function postAppealProxy(data) {
    await this.header();
    axios
        .post("/api/module2/candidate_appeal", data, {
            headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
            console.log(JSON.stringify(response.data));
            console.log(response.data);
            console.log(response.status);
            console.log(response.statusText);
            console.log(response.headers);
            console.log(response.config);
            return response.data;
        });
}

export async function getAppeal(data) {
    await this.header();
    axios
        .get(
            "https://ems-stg.fimm.com.my/api/v1/registration/candidate/appealstatus"
        )
        .then((response) => {
            console.log(JSON.stringify(response.data));
            console.log(response.data);
            console.log(response.status);
            console.log(response.statusText);
            console.log(response.headers);
            console.log(response.config);
            return response.data;
        });
}

export async function getAppealProxy(data) {
    await this.header();
    axios.get("/api/module2/candidate_appealstatus").then((response) => {
        console.log(JSON.stringify(response.data));
        console.log(response.data);
        console.log(response.status);
        console.log(response.statusText);
        console.log(response.headers);
        console.log(response.config);
        return response.data;
    });
}

export async function getUserLoginStatus(uid, utype) {
    return axios.get('/api/module2/get_fimm_login_status', {
        params: {
            USER_ID: uid,
            USER_TYPE: utype,
        },
    }).then(response => {
        console.log('Data Logout=', response);
        if (response.data.data.ISLOGIN == 0) {
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            localStorage.removeItem("token_data");
            localStorage.removeItem('user');
            localStorage.removeItem('realmName');
            localStorage.removeItem('recover-password');

            delete axios.defaults.headers.common['Authorization'];
            delete axios.defaults.headers.common['realmName'];

        }
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

export async function consultlogout(uid) {
    return axios.post('/api/module2/logoutfirst', {
        USER_ID: uid,
    }).then(response => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("token_data");
        localStorage.removeItem('user');
        localStorage.removeItem('realmName');
        localStorage.removeItem('recover-password');

        delete axios.defaults.headers.common['Authorization'];
        delete axios.defaults.headers.common['realmName'];

        return response.data.message

    }).catch(function(error) {
        console.log("Response Error=", error);
        return error.response.data.message;
    });


}

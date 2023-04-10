// Tahmina
import axios from 'axios';
import * as servicesModule0 from "./services";
import Vue from 'vue';


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

// --------------------- Main Dashboard Setting --------------------
export async function getMainDashboardSetting(uid,utype) {
    await servicesModule0.header();
    return axios.get('/api/module0/get_main_dashboard_setting', {
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
// Main Dashboard for CPD
export async function getMainChartSettingCPDOne(userid, usertype, chartview) {
    // await servicesModule1.header();
    // console.log("ID=", userid);
    return axios.get('/api/module0/get_main_chart_setting_cpd_one', {
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
export async function getMainChartSettingCPDTwo(userid, usertype, chartview) {
    // await servicesModule1.header();
    // console.log("ID=", userid);
    return axios.get('/api/module0/get_main_chart_setting_cpd_two', {
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
export async function getMainChartSettingCPDThree(userid, usertype, chartview) {
    // await servicesModule1.header();
    // console.log("ID=", userid);
    return axios.get('/api/module0/get_main_chart_setting_cpd_three', {
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
export async function getMainChartSettingCPDFour(userid, usertype, chartview) {
    // await servicesModule1.header();
    // console.log("ID=", userid);
    return axios.get('/api/module0/get_main_chart_setting_cpd_four', {
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
export async function getMainChartSettingCPDFive(userid, usertype, chartview) {
    // await servicesModule1.header();
    // console.log("ID=", userid);
    return axios.get('/api/module0/get_main_chart_setting_cpd_five', {
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
export async function getMainChartSettingCPDSix(userid, usertype, chartview) {
    // await servicesModule1.header();
    // console.log("ID=", userid);
    return axios.get('/api/module0/get_main_chart_setting_cpd_six', {
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
export async function getMainChartSettingCPDSeven(userid, usertype, chartview) {
    // await servicesModule1.header();
    // console.log("ID=", userid);
    return axios.get('/api/module0/get_main_chart_setting_cpd_seven', {
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
export async function getMainChartSettingCPDEight(userid, usertype, chartview) {
    // await servicesModule1.header();
    // console.log("ID=", userid);
    return axios.get('/api/module0/get_main_chart_setting_cpd_eight', {
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
export async function getMainChartSettingCASOne(userid, usertype, chartview) {
    // await servicesModule1.header();
    // console.log("ID=", userid);
    return axios.get('/api/module0/get_main_chart_setting_cas_one', {
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
export async function getMainChartSettingCASTwo(userid, usertype, chartview) {
    // await servicesModule1.header();
    // console.log("ID=", userid);
    return axios.get('/api/module0/get_main_chart_setting_cas_two', {
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
export async function getMainChartSettingCASThree(userid, usertype, chartview) {
    // await servicesModule1.header();
    // console.log("ID=", userid);
    return axios.get('/api/module0/get_main_chart_setting_cas_three', {
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
export async function getMainChartSettingCASFour(userid, usertype, chartview) {
    // await servicesModule1.header();
    // console.log("ID=", userid);
    return axios.get('/api/module0/get_main_chart_setting_cas_four', {
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
export async function getMainChartSettingCASFive(userid, usertype, chartview) {
    // await servicesModule1.header();
    // console.log("ID=", userid);
    return axios.get('/api/module0/get_main_chart_setting_cas_five', {
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
export async function getMainChartSettingDISTRIBUTOROne(userid, usertype, chartview) {
    // await servicesModule1.header();
    // console.log("ID=", userid);
    return axios.get('/api/module0/get_main_chart_setting_distributor_one', {
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
export async function getMainChartSettingDISTRIBUTORTwo(userid, usertype, chartview) {
    // await servicesModule1.header();
    // console.log("ID=", userid);
    return axios.get('/api/module0/get_main_chart_setting_distributor_two', {
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
export async function getMainChartSettingDISTRIBUTORThree(userid, usertype, chartview) {
    // await servicesModule1.header();
    // console.log("ID=", userid);
    return axios.get('/api/module0/get_main_chart_setting_distributor_three', {
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
export async function getMainChartSettingDISTRIBUTORFour(userid, usertype, chartview) {
    // await servicesModule1.header();
    // console.log("ID=", userid);
    return axios.get('/api/module0/get_main_chart_setting_distributor_four', {
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
export async function getMainChartSettingDISTRIBUTORFive(userid, usertype, chartview) {
    // await servicesModule1.header();
    // console.log("ID=", userid);
    return axios.get('/api/module0/get_main_chart_setting_distributor_five', {
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
export async function getMainChartSettingDISTRIBUTORSix(userid, usertype, chartview) {
    // await servicesModule1.header();
    // console.log("ID=", userid);
    return axios.get('/api/module0/get_main_chart_setting_distributor_six', {
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
export async function getMainChartSettingDISTRIBUTORSeven(userid, usertype, chartview) {
    // await servicesModule1.header();
    // console.log("ID=", userid);
    return axios.get('/api/module0/get_main_chart_setting_distributor_seven', {
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
export async function getMainChartSettingDISTRIBUTOREight(userid, usertype, chartview) {
    // await servicesModule1.header();
    // console.log("ID=", userid);
    return axios.get('/api/module0/get_main_chart_setting_distributor_eight', {
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
export async function getMainChartSettingDISTRIBUTORNine(userid, usertype, chartview) {
    // await servicesModule1.header();
    // console.log("ID=", userid);
    return axios.get('/api/module0/get_main_chart_setting_distributor_nine', {
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
export async function getMainChartSettingDISTRIBUTORTen(userid, usertype, chartview) {
    // await servicesModule1.header();
    // console.log("ID=", userid);
    return axios.get('/api/module0/get_main_chart_setting_distributor_ten', {
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
export async function getMainChartSettingDISTRIBUTOREleven(userid, usertype, chartview) {
    // await servicesModule1.header();
    // console.log("ID=", userid);
    return axios.get('/api/module0/get_main_chart_setting_distributor_eleven', {
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
export async function getMainChartSettingDISTRIBUTORTwelve(userid, usertype, chartview) {
    // await servicesModule1.header();
    // console.log("ID=", userid);
    return axios.get('/api/module0/get_main_chart_setting_distributor_twelve', {
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
export async function getMainChartSettingDISTRIBUTORThirteen(userid, usertype, chartview) {
    // await servicesModule1.header();
    // console.log("ID=", userid);
    return axios.get('/api/module0/get_main_chart_setting_distributor_thirteen', {
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
export async function getMainChartSettingDISTRIBUTORFourteen(userid, usertype, chartview) {
    // await servicesModule1.header();
    // console.log("ID=", userid);
    return axios.get('/api/module0/get_main_chart_setting_distributor_fourteen', {
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
export async function getMainChartSettingCONSULTANTOne(userid, usertype, chartview) {
    // await servicesModule1.header();
    // console.log("ID=", userid);
    return axios.get('/api/module0/get_main_chart_setting_consultant_one', {
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
export async function getMainChartSettingCONSULTANTTwo(userid, usertype, chartview) {
    // await servicesModule1.header();
    // console.log("ID=", userid);
    return axios.get('/api/module0/get_main_chart_setting_consultant_two', {
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
export async function getMainChartSettingCONSULTANTThree(userid, usertype, chartview) {
    // await servicesModule1.header();
    // console.log("ID=", userid);
    return axios.get('/api/module0/get_main_chart_setting_consultant_three', {
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
export async function getMainChartSettingCONSULTANTFour(userid, usertype, chartview) {
    // await servicesModule1.header();
    // console.log("ID=", userid);
    return axios.get('/api/module0/get_main_chart_setting_consultant_four', {
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
export async function getMainChartSettingCONSULTANTFive(userid, usertype, chartview) {
    // await servicesModule1.header();
    // console.log("ID=", userid);
    return axios.get('/api/module0/get_main_chart_setting_consultant_five', {
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
export async function getMainChartSettingFMSOne(userid, usertype, chartview) {
    // await servicesModule1.header();
    // console.log("ID=", userid);
    return axios.get('/api/module0/get_main_chart_setting_fms_one', {
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
export async function getMainChartSettingFMSTwo(userid, usertype, chartview) {
    // await servicesModule1.header();
    // console.log("ID=", userid);
    return axios.get('/api/module0/get_main_chart_setting_fms_two', {
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
export async function getMainChartSettingFMSThree(userid, usertype, chartview) {
    // await servicesModule1.header();
    // console.log("ID=", userid);
    return axios.get('/api/module0/get_main_chart_setting_fms_three', {
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
export async function getMainChartSettingFMSFour(userid, usertype, chartview) {
    // await servicesModule1.header();
    // console.log("ID=", userid);
    return axios.get('/api/module0/get_main_chart_setting_fms_four', {
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
export async function getMainChartSettingFMSFive(userid, usertype, chartview) {
    // await servicesModule1.header();
    // console.log("ID=", userid);
    return axios.get('/api/module0/get_main_chart_setting_fms_five', {
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
export async function getMainChartSettingFMSSix(userid, usertype, chartview) {
    // await servicesModule1.header();
    // console.log("ID=", userid);
    return axios.get('/api/module0/get_main_chart_setting_fms_six', {
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
export async function getMainChartSettingFMSSeven(userid, usertype, chartview) {
    // await servicesModule1.header();
    // console.log("ID=", userid);
    return axios.get('/api/module0/get_main_chart_setting_fms_seven', {
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
export async function getMainChartSettingFMSEight(userid, usertype, chartview) {
    // await servicesModule1.header();
    // console.log("ID=", userid);
    return axios.get('/api/module0/get_main_chart_setting_fms_eight', {
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
export async function getMainChartSettingFMSNine(userid, usertype, chartview) {
    // await servicesModule1.header();
    // console.log("ID=", userid);
    return axios.get('/api/module0/get_main_chart_setting_fms_nine', {
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
export async function getMainChartSettingFINANCEOne(userid, usertype, chartview) {
    // await servicesModule1.header();
    // console.log("ID=", userid);
    return axios.get('/api/module0/get_main_chart_setting_finance_one', {
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
export async function getMainChartSettingFINANCETwo(userid, usertype, chartview) {
    // await servicesModule1.header();
    // console.log("ID=", userid);
    return axios.get('/api/module0/get_main_chart_setting_finance_two', {
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

// Annual Fee Dashboard

export async function getAnnualFeeSetting(userid,usertype,usergroup,userDepartment,userDIVISION) {
    // await servicesModule1.header();
   // console.log("ID=", userid);
    return axios.get('/api/module0/get_annualfee_dashboard_setting', {
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

// Annual Fee dashboard record
export async function getAnnualRDChartSettingSeven(userid, usertype, chartview) {
    // await servicesModule1.header();
    // console.log("ID=", userid);
    return axios.get('/api/module0/get_annual_chart_setting_seven', {
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
export async function getAnnualRDChartSettingEight(userid, usertype, chartview) {
    // await servicesModule1.header();
    // console.log("ID=", userid);
    return axios.get('/api/module0/get_annual_chart_setting_eight', {
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
export async function getAnnualRDChartSettingNine(userid, usertype, chartview) {
    // await servicesModule1.header();
    // console.log("ID=", userid);
    return axios.get('/api/module0/get_annual_chart_setting_nine', {
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
export async function getAnnualRDChartSettingTen(userid, usertype, chartview) {
    // await servicesModule1.header();
    // console.log("ID=", userid);
    return axios.get('/api/module0/get_annual_chart_setting_ten', {
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
export async function getAnnualRAChartSettingOne(userid, usertype, chartview) {
    // await servicesModule1.header();
    // console.log("ID=", userid);
    return axios.get('/api/module0/get_annual_chart_setting_one', {
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
export async function getAnnualRAChartSettingTwo(userid, usertype, chartview) {
    // await servicesModule1.header();
    // console.log("ID=", userid);
    return axios.get('/api/module0/get_annual_chart_setting_two', {
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
export async function getAnnualRAChartSettingThree(userid, usertype, chartview) {
    // await servicesModule1.header();
    // console.log("ID=", userid);
    return axios.get('/api/module0/get_annual_chart_setting_three', {
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
export async function getAnnualRAChartSettingFour(userid, usertype, chartview) {
    // await servicesModule1.header();
    // console.log("ID=", userid);
    return axios.get('/api/module0/get_annual_chart_setting_four', {
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
export async function getAnnualRAChartSettingFive(userid, usertype, chartview) {
    // await servicesModule1.header();
    // console.log("ID=", userid);
    return axios.get('/api/module0/get_annual_chart_setting_five', {
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
export async function getAnnualRAChartSettingSix(userid, usertype, chartview) {
    // await servicesModule1.header();
    // console.log("ID=", userid);
    return axios.get('/api/module0/get_annual_chart_setting_six', {
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

export async function getCircularListByDepartment(userDepart) {
    // await servicesModule1.header();
    // console.log("ID=", userid);
    return axios.get('/api/module0/get_circular_by_dept_id', {
        params: {
            USER_DEPARTMENT_ID: userDepart,
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
export async function getDepartment(userDepart) {
    // await servicesModule1.header();
    // console.log("ID=", userid);
    return axios.get('/api/module0/get_dept_name', {
        params: {
            USER_DEPARTMENT_ID: userDepart,
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

export async function getAllCircular(data) {
   // await this.header();
    return axios.get('/api/module0/circular_management_fimm', {
        params: {
            DEPARTMENT: data,
        },
    }).then(response => {
        //console.log(JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {
            if (error.response.status == 500) {
                if (error.response.data.message == 'Token expired.') {
                    console.log('logout');
                } else {
                    console.log(error.response.data.message);
                }
            } else if (error.response.status == 401) {}
            return 'error';
        }
    });
}
export async function getAnnouncementListByDepartment(userDepart) {
    // await servicesModule1.header();
    // console.log("ID=", userid);
    return axios.get('/api/module0/get_announcement_by_dept_id', {
        params: {
            USER_DEPARTMENT_ID: userDepart,
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
export async function getAllEvent(data) {
   // await this.header();
    return axios.get('/api/module0/event_management_department', {
        params: { DEPARTMENT: data },
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

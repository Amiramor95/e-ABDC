// Nurul
import axios from 'axios';
import * as servicesModule0 from '../module0/services';

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

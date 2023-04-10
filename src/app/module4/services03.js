// acap
import axios from 'axios';
import Vue from 'vue';

export async function getWaiverSubmissionList(data) {
    await servicesModule0.header();
    return axios.get("/api/module4/waiversubmissionlist", {

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

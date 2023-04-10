// ros
import Vue from 'vue';
import axios from 'axios';

export async function demo(data) {
    return axios
        .post('/api/module5/uploadFile', data)
        .then(response => {
            console.log('data :' + JSON.stringify(response.data.data));
            return response.data.data;
        }).catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: 'error',
                });
                if (error.response.status == 500) {
                    // console.log(JSON.stringify(error.response.data.message));
                    if (error.response.data.message == 'Token expired.') {
                        logout();
                    } else {
                        console.log(error.response.data.message)
                    }
                } else if (error.response.status == 401) {
                    logout();
                }
            }
        });
}


export async function uploadFile(data) {
    console.log('data : ' + data);
    return axios.post('/api/module5/uploadFile ', data).then(response => {
        console.log(response.data);

        Vue.$toast.open({
            message: response.data.message,
            type: 'success',
        });
        return response.data;

    }).catch(function(error) {
        if (error.response) {

            // Vue.$toast.open({
            //     message: error.response.data.message,
            //     type: 'error',
            // });

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

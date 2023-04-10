/* eslint-disable semi */
/* eslint-disable eqeqeq */
/* eslint-disable dot-notation */
//
import axios from 'axios';
import * as servicesModule0 from "./services";



export async function verifyTAC (data) {
    console.log('data : ' + data);
    await servicesModule0.header();
    return axios.get('/api/module0/sms_verify_TAC', {
        params: {
            SMS_TAC_NUMBER: data,
        },
      }).then(response => {
      console.log(response.data);
      return response.data;
    }).catch(function (error) {
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

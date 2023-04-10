// dayat
import axios from 'axios';
import Vue from 'vue' 
import * as servicesModule0 from '../module0/services';

export async function getConsultantCaRecord (data) {
    await servicesModule0.header();
    return axios.get('/api/module3/consultant_caRecord', {
      params: {
        CONSULTANT_LIST: data
    },
    }).then(response => {
      return response.data.data;
    }).catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status == 500) {
          // console.log(JSON.stringify(error.response.data.message));
          if (error.response.data.message == 'Token expired.') {
            console.log('logout');
            servicesModule2.logout();
          } else {
            console.log(error.response.data.message);
          }
        } else if (error.response.status == 401) {
            servicesModule2.logout();
        }
        return 'error';
      }
    });
  }
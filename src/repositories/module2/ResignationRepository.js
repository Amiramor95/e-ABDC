import axios from 'axios';
import * as servicesModule1 from '../../app/module1/services'
import Vue from 'vue'
import * as servicesModule0 from '../../app/module0/services'

// const base = 'http://localhost:7002/api/module2';


export default {

  getApprovalLevelDistributor(data, index) {
    //console.log('data : ' + data);
    return axios.get('/api/module0/dist_approval_level_byindex', {
      params: {
        APPR_PROCESSFLOW_ID: data,
        APPR_INDEX: index
      },
    }).then(response => {
      //console.log(JSON.stringify(response.data.data));
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
  },

  postResignation(data) {
    return axios.post(`/api/module2/consultant_resignation`, data)
    .then((response) => {
      //console.log("list : " + JSON.stringify(response.data));
      Vue.$toast.open({
        message: response.data.message,
        type: "success",
      });
      return response.data.data;
    })
      .catch(function(error) {
        console.log(error);
        if (error.response) {
          Vue.$toast.open({
            message: error.response.data.message,
            type: "error",
          });
          if (error.response.status == 401) {
            logout();
          } else {
            return "error";
          }
        }
      });
  },

  getResignation(data) {
    return axios.get(`/api/module2/consultant_single_resignation`,{
      params: {
        CONSULTANT_LICENSE_ID: data,
      },
    }).then(response => {
      //console.log(JSON.stringify(response.data.data))
      // Vue.$toast.open({
      //   message: response.data.message,
      //   type: "success",
      // });
      return response.data.data
    }).catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status == 500) {
          // console.log(JSON.stringify(error.response.data.message));
          if (error.response.data.message == 'Token expired.') {
            console.log('logout')
            // logout();
          } else {
            console.log(error.response.data.message)
          }
        } else if (error.response.status == 401) {
          // logout();
        }
        return 'error'
      }
    });
  },


  getResignationDocumentByID(data) {
    return axios.get(`/api/module2/consultant_resignation_document`, {
      params: {
        RESIGNATION_ID: data,
      },
    }).then(response => {
      //console.log("Dococument list : " + JSON.stringify(response.data.data));
      // Vue.$toast.open({
      //   message: response.data.message,
      //   type: "success",
      // });
      return response.data.data;
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
  },

  //resignation approval
  postResignationAdminApproval(data){
    return axios.post(`/api/module2/consultant_resignation_admin_approval`, data)
      .then((response) => {
        //console.log("list : " + JSON.stringify(response.data));
        Vue.$toast.open({
          message: response.data.message,
          type: "success",
        });
        return response.data.data;
      })
      .catch(function(error) {
        console.log(error);
        if (error.response) {
          Vue.$toast.open({
            message: error.response.data.message,
            type: "error",
          });
          if (error.response.status == 401) {
            logout();
          } else {
            return "error";
          }
        }
      });
  },

  postResignationManagerApproval(data){
    return axios.post(`/api/module2/consultant_resignation_manager_approval`, data)
      .then((response) => {
        //console.log("list : " + JSON.stringify(response.data));
        Vue.$toast.open({
          message: response.data.message,
          type: "success",
        });
        return response.data.data;
      })
      .catch(function(error) {
        console.log(error);
        if (error.response) {
          Vue.$toast.open({
            message: error.response.data.message,
            type: "error",
          });
          if (error.response.status == 401) {
            logout();
          } else {
            return "error";
          }
        }
      });
  },

};

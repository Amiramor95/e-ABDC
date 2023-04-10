import axios from 'axios';
import Vue from 'vue'

const base = 'http://localhost:7002/api/module2';

export default {
  getAllTermination() {
    return axios.get(`/api/module2/consultant_termination`)
      .then((response) => {
        Vue.$toast.open({
          message: response.data.message,
          type: 'success',
        });
        return response.data.data;
      })
      .catch(function(error) {
        console.log(error);
        if (error.response) {
          // Vue.$toast.open({
          //   message: error.response.data.message,
          //   type: 'error',
          // });
          if (error.response.status == 401) {
            logout();
          } else {
            return "error";
          }
        }
      });
  },
  postTermination(data) {
    return axios.post(`/api/module2/consultant_termination`, data)
      .then((response) => {
        Vue.$toast.open({
          message: response.data.message,
          type: 'success',
        });
        return response.data.status;
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

  getTerminationDocumentByID(terminationId, tableName) {
    return axios.get(`/api/module2/consultant_termination_document`, {
      params: {
        TERMINATION_ID: terminationId,
        TABLE_NAME: tableName, // Optional Second Params
      },
    }).then(response => {
      return response.data.data;
    }).catch(function (error) {
      console.log(error)
      if (error.response) {
        if (error.response.status == 401) {
          logout()
        } else {
          return 'error'
        }
      }
    });
  },

  //GM approval
  GMApprovalTermination(data) {
    return axios.post(`/api/module2/termination-approval-gm`, data)
      .then((response) => {
        Vue.$toast.open({
          message: response.data.message,
          type: 'success',
        });
        return response.data.data;
      })
      .catch(function(error) {
        console.log(error);
        if (error.response) {
          // Vue.$toast.open({
          //   message: error.response.data.message,
          //   type: 'error',
          // });
          if (error.response.status == 401) {
            logout();
          } else {
            return "error";
          }
        }
      });
  },
};

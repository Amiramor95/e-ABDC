/* eslint-disable no-unused-vars */
// acap
import axios from 'axios';
import Vue from 'vue';

export async function logout(uid, utype) {
  console.log("Logout Console");
  return axios.get('/api/module0/logout', {
      params: {
          USER_ID: uid,
          USER_TYPE: utype,
      },
  }).then(response => {
      Vue.$toast.open({
          message: response.data.message,
          type: 'success',
      });
      console.log("Logout Console1");
      localStorage.removeItem('user');
      localStorage.removeItem('realmName');
      localStorage.removeItem('recover-password');
      delete axios.defaults.headers.common['Authorization'];
      delete axios.defaults.headers.common['realmName'];

      return response.data.message

  }).catch(function(error) {

      // if (error.response.status === 500)
      //     Vue.$toast.open({
      //         message: 'The server encountered an internal error and was unable to complete your request. Please contact the server administrator.',
      //         type: 'error',
      //     });

      // else
      //     Vue.$toast.open({
      //         message: error.response.data.message,
      //         type: 'error',
      //     });
      // console.log(error)
      return error.response.data.message;
  });


}
// Distributor list

export async function getDistributorList() {
  await this.header();
  return axios.get('/api/module1/distributor_users').then(response => {
          console.log('data :' + JSON.stringify(response.data.data));
          return response.data.data;
      }).catch(function(error) {
          if (error.response) {
              Vue.$toast.open({
                  message: error.response.data.message,
                  type: 'error',
              });
              if (error.response.status === 401) {
                  logout();
              } else {
                  return 'error';
              }
          }
      });
}

export async function getDistUserInfo(data) {
  return axios.get('/api/module1/getDistUserInfo',{
            params: {
              USER_ID: data
          },
          }).then(response => {
          console.log('data :' + JSON.stringify(response.data.data));
          return response.data.data;
      }).catch(function(error) {
          if (error.response) {
            if (error.response.status == 500) {
              // console.log(JSON.stringify(error.response.data.message));
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

export async function getDistributor(params = {}) {
  return axios.get('/api/module1/getDistributor',{
    params:params
  }).then(response => {
          console.log('data :' + JSON.stringify(response.data.data));
          return response.data.data;
      }).catch(function(error) {
          if (error.response) {
            if (error.response.status == 500) {
              // console.log(JSON.stringify(error.response.data.message));
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
// export async function getDistributorList () {
//   await this.header();
//   return axios.get('/api/module1/distributor_users').then(response => {
//     console.log('data :' + JSON.stringify(response.data.data));
//     return response.data.data;
//   }).catch(function (error){
//     if (error.response) {
//       if (error.response.status == 500) {
//         // console.log(JSON.stringify(error.response.data.message));
//         if (error.response.data.message == 'Token expired.') {
//           console.log('logout');
//           logout();
//         } else {
//           console.log(error.response.data.message);
//         }
//       } else if (error.response.status == 401) {
//         logout();
//       }
//       return 'error';
//     }
//   });
// }

// roles assign

export async function getMemberRoles () {
  await this.header();
  return axios.get('/api/module1/setting_postal').then(response => {
    console.log('data :' + JSON.stringify(response.data.data));
    return response.data.data
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 500) {
        // console.log(JSON.stringify(error.response.data.message));
        if (error.response.data.message == 'Token expired.') {
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
export async function getDidtributorPointById(data) {
  console.log('data : ' + data);
  // await servicesModule0.header();
  return axios.get('/api/module1/distributor_point_by_id', {
    params: data,
  }).then(response => {
    console.log(JSON.stringify(response.data.data));
    return response.data.data;
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 500) {
        // console.log(JSON.stringify(error.response.data.message));
        if (error.response.data.message == 'Token expired.') {
          console.log('logout');
          // logout();
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status == 401) {
        // logout();
      }
      return 'error';
    }
  });
}

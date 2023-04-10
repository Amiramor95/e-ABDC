// dayat
import axios from 'axios';
import * as servicesModule0 from '../module0/services';
import * as servicesModule2 from '../module2/services';
import * as servicesModule1 from '../module1/services';

export async function checkDuplicateIC (data) {
    return axios.get('/api/module2/user_check_ic', {
      params: {
        CONSULTANT_NRIC: data,
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
             servicesModule1.logout();
          } else {
            console.log(error.response.data.message);
          }
        } else if (error.response.status == 401) {
           servicesModule1.logout();
        }
         return error.response.data;
      }
    });
  }

  export async function checkDuplicateEmail (data) {
    return axios.get('/api/module2/user_check_email', {
      params: {
        CONSULTANT_EMAIL: data,
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
             servicesModule1.logout();
          } else {
            console.log(error.response.data.message);
          }
        } else if (error.response.status == 401) {
           servicesModule1.logout();
        }
         return error.response.data;
      }
    });
  }

  export async function checkDuplicateUserID (data) {
    return axios.get('/api/module2/check_userID', {
      params: {
        USER_USER_ID: data,
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
             servicesModule1.logout();
          } else {
            console.log(error.response.data.message);
          }
        } else if (error.response.status == 401) {
           servicesModule1.logout();
        } 
        
        return error.response.data;
      }
    });
  }

  export async function selfRegister (data) {
    return axios.post('/api/module2/consultant_register', data).then(response => {
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
             servicesModule1.logout();
          } else {
            console.log(error.response.data.message);
          }
        } else if (error.response.status == 401) {
           servicesModule1.logout();
        }
        return 'error:' + error.response;
      }
    });
  }

  export async function updatePassword(data) {
    return axios.post('/api/module2/user_update', data).then(response => {
        console.log(response.data);
        return response.data;
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 500) {
                // console.log(JSON.stringify(error.response.data.message));
                if (error.response.data.message == 'Token expired.') {
                    console.log('logout');
                    servicesModule1.logout();
                } else {
                    console.log(error.response.data.message);
                }
            } else if (error.response.status == 401) {
                servicesModule1.logout();
            }
            return 'error';
        }
    });
}

  export async function verifyUser (data) {
    return axios.get('/api/module2/verify_user', {
      params: {
        LOGIN_ID: data.LOGIN_ID,
        USER_PASS_NUM: data.USER_PASS_NUM
    },
    }).then(response => {

      // .setItem('realmName', 'realm2');
      
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

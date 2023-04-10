// ros

import axios from 'axios'
import * as servicesModule0 from './services'
import Vue from 'vue'

// letter Template

export async function getAllLetterList (data) {
  await servicesModule0.header()
  return axios.get('/api/module0/letter_list', {
    params: {

    },
  }).then(response => {
    console.log(' list :' + JSON.stringify(response.data.data))
    return response.data.data
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 500) {
        // console.log(JSON.stringify(error.response.data.message));
        if (error.response.data.message == 'Token expired.') {
          servicesModule0.logout()
        } else {
          console.log(error.response.data.message)
        }
      } else if (error.response.status == 401) {
        servicesModule0.logout()
      }
    }
  })
}
export async function createLetter (data) {
  await servicesModule0.header()
  return axios.post('/api/module0/letter_create', data).then(response => {
    // console.log("exception create :" + JSON.stringify(response.data));
    Vue.$toast.open({
      message: response.data.message,
      type: 'success',
  });
    return response.data
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      Vue.$toast.open({
        message: error.response.data.message,
        type: 'error',
    });
      // that falls out of the range of 2xx
      if (error.response.status == 500) {
        // console.log(JSON.stringify(error.response.data.message));
        if (error.response.data.message == 'Token expired.') {
          console.log('logout')
          servicesModule0.logout()
        } else {
          console.log(error.response.data.message)
        }
      } else if (error.response.status == 401) {
        servicesModule0.logout()
      }
      return 'error'
    }
  })
}
export async function getAnnualInvoiceById (data) {
  await servicesModule0.header()
  return axios.get('/api/module0/annual_invoice', {
    params: {
      ANNUAL_FEE_INVOICE_ID: data,
    },
  }).then(response => {
    console.log('data :' + JSON.stringify(response.data.data))
    return response.data.data
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 401) {
        servicesModule0.logout()
      } else {
        return 'error'
      }
    }
  })
}

export async function getLetterById (data) {
  await servicesModule0.header()
  return axios.get('/api/module0/edit_Letter', {
    params: {
      CAS_LETTER_ID: data,
    },
  }).then(response => {
    console.log(response.data)
    return response.data.data
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 401) {
        logout()
      } else {
        return 'error'
      }
    }
  })
}

export async function deleteLetter (data) {
  return axios
    .delete('/api/module0/delete_Letter', {
      data: { CAS_LETTER_ID: data },
    })
    .then(response => {
      //console.log('data :' + JSON.stringify(response.data))
      Vue.$toast.open({
        message: response.data.message,
        type: 'success',
      });
      return response.data
    }).catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status == 500) {
          // console.log(JSON.stringify(error.response.data.message));
          if (error.response.data.message == 'Token expired.') {
            servicesModule0.logout()
          } else {
            console.log(error.response.data.message)
          }
        } else if (error.response.status == 401) {
          servicesModule0.logout()
        }
      }
    })
}

export async function updateLetter(data) {
  const jsonObject = {};

  for (const [key, value] of data) {
      jsonObject[key] = value;
  }
  return axios
      .put('/api/module0/update_letter', jsonObject)
      .then(response => {
          //console.log('data :' + JSON.stringify(response.data));
          Vue.$toast.open({
            message: response.data.message,
            type: 'success',
        });
          return response.data;
      }).catch(function(error) {
          if (error.response) {
              // The request was made and the server responded with a status code
              Vue.$toast.open({
                message: error.response.data.message,
                type: 'error',
            });
              // that falls out of the range of 2xx
              if (error.response.status == 500) {
                  // console.log(JSON.stringify(error.response.data.message));
                  if (error.response.data.message == 'Token expired.') {
                      servicesModule0.logout();
                  } else {
                      console.log(error.response.data.message);
                  }
              } else if (error.response.status == 401) {
                  servicesModule0.logout();
              }
          }
      });
}
// ros

import axios from 'axios'
import * as servicesModule1 from './services'
import * as servicesModule0 from '../module0/services'

// cessation

export async function CessationType() {
    await servicesModule1.header()
    return axios.get('/api/module1/CessationType').then(response => {
        console.log('Cessation list :' + JSON.stringify(response.data.data))
        return response.data.data
    }).catch(function(error) {
        if (error.response) {
            // Vue.$toast.open({
            //   message: error.response.data.message,
            //   type: 'error',
            // })
            if (error.response.status == 401) {
                logout()
            } else {
                return 'error'
            }
        }
    })
}

export async function filterRecordList(data) {
  await servicesModule0.header()
  return axios.get('/api/module1/filter_divestment_record',{params:data}).then(response => {
    console.log('data :' + JSON.stringify(response.data.data))
    return response.data.data
  }).catch(function(error) {
    if (error.response) {
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




//RD filter
export async function RDfilterRecordList(data) {
  await servicesModule0.header()
  return axios.get('/api/module1/filter_divestment_record-rd',{params:data}).then(response => {
    console.log('data :' + JSON.stringify(response.data.data))
    return response.data.data
  }).catch(function(error) {
    if (error.response) {
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

export async function DivestmentApprovalFilter(data) {
  await servicesModule0.header()
  return axios.get('/api/module1/filter_divestment_approval',{params:data}).then(response => {
    console.log('data :' + JSON.stringify(response.data.data))
    return response.data.data
  }).catch(function(error) {
    if (error.response) {
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


export async function distributorMerger() {
    await servicesModule1.header()
    return axios.get('/api/module1/distributorMerger').then(response => {
        console.log('Classification list :' + JSON.stringify(response.data.data))
        return response.data.data
    }).catch(function(error) {
        if (error.response) {
            // Vue.$toast.open({
            //   message: error.response.data.message,
            //   type: 'error',
            // })
            if (error.response.status == 401) {
                logout()
            } else {
                return 'error'
            }
        }
    })
}

// distributor list

export async function getAllDistributor() {
    await servicesModule1.header()
    return axios.get('/api/module1/distributor_records').then(response => {
        console.log('Record list :' + JSON.stringify(response.data.data))
        return response.data.data
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                // logout()
            } else {
                return 'error'
            }
        }
    })
}


export async function createnewcessation(data) {
    await servicesModule1.header()
    return axios.post('/api/module1/createnewcessation', data).then(response => {
        // console.log("exception create :" + JSON.stringify(response.data));
        return response.data
    }).catch(function(error) {
        if (error.response) {
            // Vue.$toast.open({
            //   message: error.response.data.message,
            //   type: 'error',
            // })
            if (error.response.status == 401) {
                logout()
            } else {
                return 'error'
            }
        }
    })
}

export async function getAllCessList(data) {
    await servicesModule1.header()
    return axios.get('/api/module1/cess_verification_record', {
        params: {
            APPR_GROUP_ID: data,
        },
    }).then(response => {
        console.log('data :' + JSON.stringify(response.data.data))
        return response.data.data
    }).catch(function(error) {
        if (error.response) {
            // Vue.$toast.open({
            //   message: error.response.data.message,
            //   type: 'error',
            // })
            if (error.response.status == 401) {
                logout()
            } else {
                return 'error'
            }
        }
    })
}

// suspension list

export async function createnewSuspension(data) {
    await servicesModule1.header()
    return axios.post('/api/module1/createnewSuspension', data).then(response => {
        // console.log("exception create :" + JSON.stringify(response.data));
        return response.data
    }).catch(function(error) {
        if (error.response) {
            // Vue.$toast.open({
            //   message: error.response.data.message,
            //   type: 'error',
            // })
            if (error.response.status == 401) {
                logout()
            } else {
                return 'error'
            }
        }
    })
}

export async function filterCancellationRecordList(data) {
    await servicesModule1.header()
    return axios.get('/api/module1/filter_record', { params: data }).then(response => {
        console.log('data :' + JSON.stringify(response.data.data))
        return response.data.data
    }).catch(function(error) {
        if (error.response) {
            // Vue.$toast.open({
            //   message: error.response.data.message,
            //   type: 'error',
            // })
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
    })
}

export async function getAllCancellationRecordList(data) {
    await servicesModule1.header()
    return axios.get('/api/module1/suspension_records', {
        params: {
            APPR_GROUP_ID: data,
        },
    }).then(response => {
        console.log('data :' + JSON.stringify(response.data.data))
        return response.data.data
    }).catch(function(error) {
        if (error.response) {
            // Vue.$toast.open({
            //   message: error.response.data.message,
            //   type: 'error',
            // })
            if (error.response.status == 401) {
                logout()
            } else {
                return 'error'
            }
        }
    })
}
// end suspension list

// suspension appeal
export async function getSuspensionDetails(data) {
    await servicesModule1.header()
    return axios.get('/api/module1/suspension_record_details', {
        params: {
            USER_ID: data,
        },
    }).then(response => {
        console.log(JSON.stringify(response.data.data))
        return response.data.data
    }).catch(function(error) {
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
    })
}

export async function getSuspensionDetails2(data) {
    await servicesModule1.header()
    return axios.get('/api/module1/suspension_record_details', {
        params: {
            USER_ID: data,
        },
    }).then(response => {
        console.log(JSON.stringify(response.data.data))
        return response.data.data
    }).catch(function(error) {
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
    })
}

export async function createSuspensionAppeal(data) {
    await servicesModule1.header()
    return axios.post('/api/module1/create_SuspensionAppeal', data).then(response => {
        // console.log("exception create :" + JSON.stringify(response.data));
        return response.data
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                // logout()
            } else {
                return 'error'
            }
        }
    })
}

export async function createSuspensionAccept(data) {
    await servicesModule1.header()
    return axios.post('/api/module1/create_SuspensionAccept', data).then(response => {
        // console.log("exception create :" + JSON.stringify(response.data));
        return response.data
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                // logout()
            } else {
                return 'error'
            }
        }
    })
} // end suspension appeal

export async function getTransactionLog(data) {
    await servicesModule1.header()
    return axios.post('/api/module1/transaction_log', data).then(response => {
        // console.log("exception create :" + JSON.stringify(response.data));
        return response.data.data
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 401) {
                // logout()
            } else {
                return 'error'
            }
        }
    })
}


export async function getdistributordetails (data) {
    await servicesModule1.header()
    return axios.get('/api/module1/distributordetails', {
      params: {
        USER_ID: data,
      },
    }).then(response => {
      console.log(JSON.stringify(response.data.data))
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
    })
  }

  export async function getDivestmentApproval (data) {
    await servicesModule1.header()
    return axios.get('/api/module1/divestment-approval', {
      params: {
        DIVE_ID: data.DIVE_ID,
        TS_ID:data.TS_ID,
      },
    }).then(response => {
      console.log(JSON.stringify(response.data.data))
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
    })
  }

  export async function distributordetailsfimm (data) {
    await servicesModule1.header()
    return axios.get('/api/module1/distributordetailsfimm', {
      params: {
        DIST_ID: data,
      },
    }).then(response => {
      console.log(JSON.stringify(response.data.data))
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
    })
  }

  //
  export async function distributorMergeDetails (data) {
    await servicesModule1.header()
    return axios.get('/api/module1/distributorMergeDetails', {
      params: {
        DIVE_ID: data,
      },
    }).then(response => {
      console.log(JSON.stringify(response.data.data))
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
    })
  }

  // Divestment

  // divestment list
export async function getAllDivestmentList (data) {
  await servicesModule1.header()
  return axios.get('/api/module1/Divestment_List', {
    params: {
      DIST_ID: data,
    },
  }).then(response => {
    return response.data
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
  })
}

  export async function getDistributor_fundDivestment (data) {
    await servicesModule1.header()
    return axios.get('/api/module1/Distributor_fundDivestment', { params: { USER_ID: data, },
    }).then(response => {
      console.log(JSON.stringify(response.data.data))
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
    })
  }

export async function getDistributor_fundConsultantDivestment (data) {
  await servicesModule1.header()
  return axios.get('/api/module1/Distributor_fundConsultantDivestment', { params: { USER_ID: data, },
  }).then(response => {
    console.log(JSON.stringify(response.data.data))
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
  })
}

  //getstatus fund
  export async function getDivestmentFundStatus (data) {
    await servicesModule1.header()
    return axios.get('/api/module1/Divestment_FundStatus', {
      params: {
        USER_ID: data,
      },
    }).then(response => {
      console.log(JSON.stringify(response.data.data))
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
    })
  }

  //clear selection fund
  export async function ClearFundSelection (data) {
    await servicesModule1.header()
    return axios.get('/api/module1/Clear_Fund_Selection', {
      params: {
        USER_ID: data,
      },
    }).then(response => {
      console.log(JSON.stringify(response.data.data))
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
    })
  }

  //getstatus Consultant
  export async function getDivestmentConsStatus (data) {
    await servicesModule1.header()
    return axios.get('/api/module1/Divestment_ConsStatus', {
      params: {
        USER_ID: data,
      },
    }).then(response => {
      console.log(JSON.stringify(response.data.data))
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
    })
  }

  // list fund
  export async function getDistributor_fund_list (data) {
    await servicesModule1.header()
    return axios.get('/api/module1/fund_list', {
      params: {
        USER_ID: data,
      },
    }).then(response => {
      console.log(JSON.stringify(response.data.data))
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
    })
  }

  // list fund selected fund
  export async function getDistributor_selected_fund_list (data) {
    await servicesModule1.header()
    return axios.get('/api/module1/selected_fund_list', {
      params: {
        USER_ID: data,
      },
    }).then(response => {
      console.log(JSON.stringify(response.data.data))
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
    })
  }

  // list selected fund submission
  export async function Submission_fund_list (data) {
    await servicesModule1.header()
    return axios.get('/api/module1/Submission_fund_list', {
      params: {
        DIVE_ID: data,
      },
    }).then(response => {
      console.log(JSON.stringify(response.data.data))
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
    })
  }

  // list selected consultant submission
  export async function Submission_cons_list (data) {
    await servicesModule1.header()
    return axios.get('/api/module1/Submission_cons_list', {
      params: {
        DIVE_ID: data,
      },
    }).then(response => {
      console.log(JSON.stringify(response.data.data))
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
    })
  }

  export async function getDistributor_consultantDivestment (data) {
    await servicesModule1.header()
    return axios.get('/api/module1/Distributor_consultantDivestment', {
      params: {
        USER_ID: data,
      },
    }).then(response => {
      console.log(JSON.stringify(response.data.data))
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
    })
  }

  // list consultant
  export async function getDistributor_consultant_list (data) {
    await servicesModule1.header()
    return axios.get('/api/module1/consultant_list', {
      params: {
        USER_ID: data,
      },
    }).then(response => {
      console.log(JSON.stringify(response.data.data))
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
    })
  }

  // list fund selected fund
  export async function getselected_consultant_list (data) {
    await servicesModule1.header()
    return axios.get('/api/module1/selected_cons_list', {
      params: {
        USER_ID: data,
      },
    }).then(response => {
      console.log(JSON.stringify(response.data.data))
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
    })
  }

  //clear selection consultant
  export async function ClearConsSelection (data) {
    await servicesModule1.header()
    return axios.get('/api/module1/Clear_Cons_Selection', {
      params: {
        USER_ID: data,
      },
    }).then(response => {
      console.log(JSON.stringify(response.data.data))
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
    })
  }

  // divestment fund add
  export async function fund_add (data) {
    await servicesModule1.header()
    return axios.post('/api/module1/fund_add', data).then(response => {
      // console.log("exception create :" + JSON.stringify(response.data));
      return response.data
    }).catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status == 401) {
          // logout()
        } else {
          return 'error'
        }
      }
    })
  }

  // divestment fund remove
  export async function fund_remove (data) {
    await servicesModule1.header()
    return axios.post('/api/module1/fund_remove', data).then(response => {
      // console.log("exception create :" + JSON.stringify(response.data));
      return response.data
    }).catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status == 401) {
          // logout()
        } else {
          return 'error'
        }
      }
    })
  }

  // divestment fund add All
  export async function SelectAllFund (data) {
    await servicesModule1.header()
    return axios.post('/api/module1/SelectAllFund', data).then(response => {
      // console.log("exception create :" + JSON.stringify(response.data));
      return response.data
    }).catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status == 401) {
          // logout()
        } else {
          return 'error'
        }
      }
    })
  }

  // divestment fund remove all
  export async function UnselectAllFund (data) {
    await servicesModule1.header()
    return axios.post('/api/module1/UnselectAllFund', data).then(response => {
      // console.log("exception create :" + JSON.stringify(response.data));
      return response.data
    }).catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status == 401) {
          // logout()
        } else {
          return 'error'
        }
      }
    })
  }

  // divestment consultant add
  export async function Cons_add (data) {
    await servicesModule1.header()
    return axios.post('/api/module1/Cons_add', data).then(response => {
      // console.log("exception create :" + JSON.stringify(response.data));
      return response.data
    }).catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status == 401) {
          // logout()
        } else {
          return 'error'
        }
      }
    })
  }

  // divestment consultant remove
  export async function Cons_remove (data) {
    await servicesModule1.header()
    return axios.post('/api/module1/Cons_remove', data).then(response => {
      // console.log("exception create :" + JSON.stringify(response.data));
      return response.data
    }).catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status == 401) {
          // logout()
        } else {
          return 'error'
        }
      }
    })
  }

   // divestment Cons add All
   export async function SelectAllCons (data) {
    await servicesModule1.header()
    return axios.post('/api/module1/SelectAllCons', data).then(response => {
      // console.log("exception create :" + JSON.stringify(response.data));
      return response.data
    }).catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status == 401) {
          // logout()
        } else {
          return 'error'
        }
      }
    })
  }

  // divestment Cons remove all
  export async function UnselectAllCons (data) {
    await servicesModule1.header()
    return axios.post('/api/module1/UnselectAllCons', data).then(response => {
      // console.log("exception create :" + JSON.stringify(response.data));
      return response.data
    }).catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status == 401) {
          // logout()
        } else {
          return 'error'
        }
      }
    })
  }

  // divestment fund selection
  export async function fund_selection (data) {
    await servicesModule1.header()
    return axios.post('/api/module1/fund_selection', data).then(response => {
      // console.log("exception create :" + JSON.stringify(response.data));
      return response.data
    }).catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status == 401) {
          // logout()
        } else {
          return 'error'
        }
      }
    })
  }

  //update submission
  export async function fund_submission (data) {
    await servicesModule1.header()
    return axios.post('/api/module1/fund_submission', data).then(response => {
      // console.log("exception create :" + JSON.stringify(response.data));
      return response.data
    }).catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status == 401) {
          // logout()
        } else {
          return 'error'
        }
      }
    })
  }

//convert fundto temp fund submission
export async function convertFundToFundTemp (data) {
  await servicesModule1.header()
  return axios.post('/api/module1/convertFundToFundTemp', data).then(response => {
    // console.log("exception create :" + JSON.stringify(response.data));
    return response.data
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 401) {
        // logout()
      } else {
        return 'error'
      }
    }
  })
}

//convert fundto temp fund submission
export async function convertConsultantToConsultantTemp (data) {
  await servicesModule1.header()
  return axios.post('/api/module1/convertConsultantToConsultantTemp', data).then(response => {
    // console.log("exception create :" + JSON.stringify(response.data));
    return response.data
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status == 401) {
        // logout()
      } else {
        return 'error'
      }
    }
  })
}

  //fund discard
  export async function discard (data) {
    await servicesModule1.header()
    return axios.post('/api/module1/discard', data).then(response => {
      // console.log("exception create :" + JSON.stringify(response.data));
      return response.data
    }).catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status == 401) {
          // logout()
        } else {
          return 'error'
        }
      }
    })
  }

  //update approval
  export async function updateApproval (data) {
    await servicesModule1.header()
    return axios.post('/api/module1/update_Approval', data).then(response => {
      // console.log("exception create :" + JSON.stringify(response.data));
      return response.data
    }).catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status == 401) {
          // logout()
        } else {
          return 'error'
        }
      }
    })
  }

  //update approval rd
  export async function update_Approvalrd (data) {
    await servicesModule1.header()
    return axios.post('/api/module1/update_Approvalrd', data).then(response => {
      // console.log("exception create :" + JSON.stringify(response.data));
      return response.data
    }).catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status == 401) {
          // logout()
        } else {
          return 'error'
        }
      }
    })
  }

  //update approval hod rd
  export async function update_Approvalhodrd (data) {
    await servicesModule1.header()
    return axios.post('/api/module1/update_Approvalhodrd', data).then(response => {
      // console.log("exception create :" + JSON.stringify(response.data));
      return response.data
    }).catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status == 401) {
          // logout()
        } else {
          return 'error'
        }
      }
    })
  }

  // document by id (1)
  export async function getDocumentByIdOne(data) {
    await servicesModule1.header();
    return axios.get('/api/module1/get_document_Divestment_One', {
      params: {
        DIVE_ID: data,
      },
    }).then(response => {
      console.log("Dococument list : " + JSON.stringify(response.data.data));
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
  }

  // document by id (2)
  export async function getDocumentByIdTwo(data) {
    await servicesModule1.header();
    return axios.get('/api/module1/get_document_Divestment_Two', {
      params: {
        DIVE_ID: data,
      },
    }).then(response => {
      console.log("Dococument list : " + JSON.stringify(response.data.data));
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
  }

  // document by id (3)
  export async function getDocumentByIdThree(data) {
    await servicesModule1.header();
    return axios.get('/api/module1/get_document_Divestment_Three', {
      params: {
        DIVE_ID: data,
      },
    }).then(response => {
      console.log("Dococument list : " + JSON.stringify(response.data.data));
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
  }

  // document by id (4)
  export async function getDocumentByIdFour(data) {
    await servicesModule1.header();
    return axios.get('/api/module1/get_document_Divestment_Four', {
      params: {
        DIVE_ID: data,
      },
    }).then(response => {
      console.log("Dococument list : " + JSON.stringify(response.data.data));
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
  }

  // document by id 2nd level
  export async function getDocumentByIdSecondLevel(data) {
    await servicesModule1.header();
    return axios.get('/api/module1/get_document_Divestment_SecondLevel', {
      params: {
        DIVE_ID: data,
      },
    }).then(response => {
      console.log("Dococument list : " + JSON.stringify(response.data.data));
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
  }

  // document by id dist approver
  export async function getDocumentByIdDistApprover(data) {
    await servicesModule1.header();
    return axios.get('/api/module1/get_document_Dist_Approver', {
      params: {
        DIVE_ID: data,
      },
    }).then(response => {
      console.log("Dococument list : " + JSON.stringify(response.data.data));
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
  }

  // document by id RD approver
  export async function getDocumentByIdRDApprover(data) {
    await servicesModule1.header();
    return axios.get('/api/module1/get_document_RD_Approver', {
      params: {
        DIVE_ID: data,
      },
    }).then(response => {
      console.log("Dococument list : " + JSON.stringify(response.data.data));
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
  }

  // document by id HOD RD approver
  export async function getDocumentByIdHODRDApprover(data) {
    await servicesModule1.header();
    return axios.get('/api/module1/get_document_HODRD_Approver', {
      params: {
        DIVE_ID: data,
      },
    }).then(response => {
      console.log("Dococument list : " + JSON.stringify(response.data.data));
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
  }


  export async function deleteDocument(data) {
    await servicesModule1.header();
    return axios.delete('/api/module1/delete_Divestment_document', {
      params: {
        DIVE_DOCU_ID: data,
      },
    })
      .then(response => {
        console.log('data :' + JSON.stringify(response.data));
        return response.data;
      }).catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          if (error.response.status == 500) {
            // console.log(JSON.stringify(error.response.data.message));
            if (error.response.data.message == 'Token expired.') {
              logout();
            } else {
              console.log(error.response.data.message);
            }
          } else if (error.response.status == 401) {
            logout();
          }
        }
      });
  }


// divestment approval
export async function getAllDivestmentApprList(data) {
  await servicesModule1.header()
  return axios.get('/api/module1/divestmentAppr_List', {
      params: {
          USER_ID: data,
      },
  }).then(response => {
      console.log('data :' + JSON.stringify(response.data.data))
      return response.data.data
  }).catch(function(error) {
      if (error.response) {
          // Vue.$toast.open({
          //   message: error.response.data.message,
          //   type: 'error',
          // })
          if (error.response.status == 401) {
              logout()
          } else {
              return 'error'
          }
      }
  })
}

// divestment fimm approval
export async function getAllDivestmentFimmApprList(data) {
  await servicesModule1.header()
  return axios.get('/api/module1/divestmentApprFimm_List', {
      params: {
          USER_ID: data,
      },
  }).then(response => {
      console.log('data :' + JSON.stringify(response.data.data))
      return response.data.data
  }).catch(function(error) {
      if (error.response) {
          // Vue.$toast.open({
          //   message: error.response.data.message,
          //   type: 'error',
          // })
          if (error.response.status == 401) {
              logout()
          } else {
              return 'error'
          }
      }
  })
}




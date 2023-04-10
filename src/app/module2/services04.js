
import axios from "axios";
import Vue from "vue";
import * as servicesModule2 from "../module2/services";

export async function getDistributorType(data) {
    await servicesModule2.header();
    return axios
    .get('/api/module2/distributionType', {
        params: {
            DISTRIBUTOR_ID: data,
        },
    })
    .then((response) => {
        // Vue.$toast.open({
        //     message: response.data.message,
        //     type: 'success',
        // });
        return response.data.data;
    });
}

export async function getDistributorCmsrlDatas(data) {
    await servicesModule2.header();
    return axios
    .get('/api/module2/distributorCmsrlDatas', {
        params: {
            DISTRIBUTOR_ID: data,
        },
    })
    .then((response) => {
        // Vue.$toast.open({
        //     message: response.data.message,
        //     type: 'success',
        // });
        return response.data.data;
    });
}

export async function getConsultantForAdminApproval(data) {
    await servicesModule2.header();
    return axios
    .get('/api/module2/consultants-for-admin-approval', {
        params: {
            DISTRIBUTOR_ID: data,
        },
    })
    .then((response) => {
        // Vue.$toast.open({
        //     message: response.data.message,
        //     type: 'success',
        // });
        return response.data.data;
    });
}

export async function getConsultantForManagerApproval(data) {
    await servicesModule2.header();
    return axios
    .get('/api/module2/consultants-for-manager-approval', {
        params: {
            DISTRIBUTOR_ID: data,
        },
    })
    .then((response) => {
        // Vue.$toast.open({
        //     message: response.data.message,
        //     type: 'success',
        // });
        return response.data.data;
    });
}

export async function consultantApprovalData(consultId, groupId, consultantType, applicationType) {
    await servicesModule2.header();
    return axios
    .get('/api/module2/consultant_approval_datas', {
        params: {
            CONSULTANT_ID: consultId,
            APPR_GROUP_ID: groupId,
            CONSULTANT_TYPE_ID: consultantType,
            CONSULTANT_APPLICATION_TYPE: applicationType
        },
    })
    .then((response) => {
        return response.data.data;
    })
    .catch(function(error) {
        throw error;
    });
}

export async function consultantLatestApprovalData(consultId) {
    await servicesModule2.header();
    return axios
    .get('/api/module2/consultant_latest_approval_datas', {
        params: {
            CONSULTANT_ID: consultId,
        },
    })
    .then((response) => {
        return response.data.data;
    })
    .catch(function(error) {
        throw error;
    });
}

export async function consultantFIMMApprovalData(consultId, consultantType, applicationType) {
    await servicesModule2.header();
    return axios
    .get('/api/module2/consultant_fimm_approval_datas', {
        params: {
            CONSULTANT_ID: consultId,
            CONSULTANT_TYPE_ID: consultantType,
            CONSULTANT_APPLICATION_TYPE: applicationType
        },
    })
    .then((response) => {
        return response.data.data;
    })
    .catch(function(error) {
        throw error;
    });
}

export async function consultantApprovalDocument(consultId, consultantType, applicationType, tableName, fieldName) {
    await servicesModule2.header();
    return axios
    .get("/api/module2/consultantApprovalDocuments", {
        params: {
            CONSULTANT_ID: consultId,
            CONSULTANT_TYPE_ID: consultantType,
            CONSULTANT_APPLICATION_TYPE: applicationType,
            TABLE_NAME: tableName,
            FIELD_NAME: fieldName, //Optional Third Params
        },
    })
    .then((response) => {
        return response.data.data;
    })
    .catch(function(error) {
        console.log(error);
        if (error.response) {
            if (error.response.status == 401) {
                logout();
            } else {
                return "error";
            }
        }
    });
}

export async function consultantLicenseType(consultId, typeId, applicationType) {
    await servicesModule2.header();
    return axios
    .get("/api/module2/consultant_license_details", {
        params: {
            CONSULTANT_ID: consultId,
            CONSULTANT_TYPE_ID: typeId,
            CONSULTANT_APPLICATION_TYPE: applicationType,
        },
    })
    .then((response) => {
        return response.data.data;
    })
    .catch(function(error) {
        console.log(error);
        if (error.response) {
            if (error.response.status == 401) {
                logout();
            } else {
                return "error";
            }
        }
    });
}

export async function updateConsultantLicenseDetail (data) {
    await servicesModule2.header()
    return axios
    .post('/api/module2/update_consultant_license_details', data)
    .then((response) => {
        Vue.$toast.open({
            message: response.data.message,
            type: 'success',
        })
        return response.data;
    })
    .catch(function (error) {
        console.log(error)
        if (error.response) {
                Vue.$toast.open({
                message: error.response.data.message,
                type: 'error',
            })
            if (error.response.status == 401) {
                logout()
            } else {
             return 'error'
            }
        }
    })
}

export async function get_booked_exams_sessions(consultant_id, bookingType) {
    await servicesModule2.header();
    return axios
    .get("/api/module2/exams/booked-exam-sessions", {
        params: {
            CONSULTANT_ID: consultant_id,
            BOOKING_TYPE: bookingType
        },
    })
    .then((response) => {
        return response.data;
    })
    .catch(function(error) {
      throw error;
    });
}

export async function get_approved_exams_sessions(consultant_id) {
    await servicesModule2.header();
    return axios
    .get("/api/module2/exams/approved-exam-sessions", {
        params: {
            CONSULTANT_ID: consultant_id,
        },
    })
    .then((response) => {
        return response.data;
    })
    .catch(function(error) {
      throw error;
    });
}

export async function get_candidate_exams_sessionDetails(consultant_id) {
    await servicesModule2.header();
    return axios
    .get("/api/module2/exams/candidate-exam-session_details", {
        params: {
            CONSULTANT_ID: consultant_id,
        },
    })
    .then((response) => {
        return response.data;
    })
    .catch(function(error) {
      throw error;
    });
}


export async function getConsultantNotification(data) {
    await servicesModule2.header();
    return axios.get('/api/module0/consultant_notifications', {
        params: {
            _RECEIVER_ID: data,
        },
    }).then(response => {
        console.log('data :' + JSON.stringify(response.data.data));
        return response.data.data;
    }).catch(function(error) {
        if (error.response) {

            //   Vue.$toast.open({
            //     message: error.response.data.message,
            //     type: 'error',
            // });

            if (error.response.status == 500) {
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

export async function updateConstNotification(data) {
    await servicesModule2.header();
    return axios.post('/api/module0/update_consultant_notifications', data).then(response => {
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
    });
}

export async function notifyApplicantandDistributor(data){
    await servicesModule2.header();
    return axios
    .post("/api/module2/approvalNotificationFailed", data)
    .then((response) => {
        return response.data;
    })
    .catch(function (error) {
        console.log(error);
        if (error.response) {
            if (error.response.status == 401) {
                logout();
            } else {
                return "error";
            }
        }
    });
}

export async function notifyFimmRd(data){
    await servicesModule2.header();
    return axios
    .post("/api/module2/approvalNotificationPassed", data)
    .then((response) => {
        return response.data;
    })
    .catch(function (error) {
        console.log(error);
        if (error.response) {
            if (error.response.status == 401) {
                logout();
            } else {
                return "error";
            }
        }
    });
}

export async function getAppealForAdminApproval (distributorId) {
    await servicesModule2.header()
    return axios
        .get('/api/module2/appeal-for-admin-approval', {
        params: {
            DISTRIBUTOR_ID: distributorId,
        },
        })
        .then((response) => {
        return response.data.data
        })
        .catch(function (error) {
        console.log(error)
        if (error.response) {
            Vue.$toast.open({
                message: error.response.data.message,
                type: 'error',
            })
            if (error.response.status == 401) {
            logout()
            } else {
            return 'error'
            }
        }
    })
}  

export async function getAppealForManagerApproval (distributorId) {
    await servicesModule2.header()
    return axios
        .get('/api/module2/appeal-for-manager-approval', {
        params: {
            DISTRIBUTOR_ID: distributorId,
        },
        })
        .then((response) => {
        return response.data.data
        })
        .catch(function (error) {
        console.log(error)
        if (error.response) {
            Vue.$toast.open({
                message: error.response.data.message,
                type: 'error',
            })
            if (error.response.status == 401) {
            logout()
            } else {
            return 'error'
            }
        }
    })
}  

export async function getAppealForRDApproval (distributorId, appealType) {
    await servicesModule2.header()
    return axios
        .get('/api/module2/appeal-for-rd-approval', {
        params: {
            DISTRIBUTOR_ID: distributorId,
            APPEAL_TYPE: appealType,
        },
        })
        .then((response) => {
        return response.data.data
        })
        .catch(function (error) {
        console.log(error)
        if (error.response) {
            Vue.$toast.open({
                message: error.response.data.message,
                type: 'error',
            })
            if (error.response.status == 401) {
            logout()
            } else {
            return 'error'
            }
        }
    })
}  

export async function getAppealApprovalLog (data) {
    await servicesModule2.header()
    return axios
      .get('/api/module2/appealApprovalDatas', {
        responseType: 'application/json',
        params: {
          CONSULTANT_ID: data,
        },
      })
      .then((response) => {
        return response.data.data
      })
      .catch(function (error) {
        console.log(error)
        if (error.response) {
          if (error.response.status == 401) {
            logout()
          } else {
            return 'error'
          }
        }
      })
  }

export async function appealdistributorAdminReview(data){
    await servicesModule2.header();
    return axios
    .post("/api/module2/appeal_approval_distributorAdmin", data)
    .then((response) => {
        return response.data;
    })
    .catch(function (error) {
        console.log(error);
        if (error.response) {
            if (error.response.status == 401) {
                logout();
            } else {
                return "error";
            }
        }
    });
}

export async function appealdistributorManagerReview(data){
    await servicesModule2.header();
    return axios
    .post("/api/module2/appeal_approval_distributorManager", data)
    .then((response) => {
        return response.data;
    })
    .catch(function (error) {
        console.log(error);
        if (error.response) {
            if (error.response.status == 401) {
                logout();
            } else {
                return "error";
            }
        }
    });
}

export async function appealRDReview(data){
    await servicesModule2.header();
    return axios
    .post("/api/module2/appeal_approval_RD", data)
    .then((response) => {
        return response.data;
    })
    .catch(function (error) {
        console.log(error);
        if (error.response) {
            if (error.response.status == 401) {
                logout();
            } else {
                return "error";
            }
        }
    });
}

export async function getDistributorAppealDetails () {
    await servicesModule2.header()
    return axios
      .get('/api/module2/distributor_records_for_appeal')
      .then((response) => {
        return response.data.data
      })
      .catch(function (error) {
        console.log(error)
        if (error.response) {
          if (error.response.status == 401) {
            logout()
          } else {
            return 'error'
          }
        }
      })
  }

export async function consultantTerminationCheck(data){
    await servicesModule2.header();
    return axios
    .get("/api/module2/consultant_termination_check", {
        params: {
            CONSULTANT_NRIC: data,
        },
    })
    .then((response) => {
        return response.data;
    })
    .catch(function (error) {
        console.log(error);
        if (error.response) {
            if (error.response.status == 401) {
                logout();
            } else {
                return "error";
            }
        }
    });
}

export async function consultantReregisterCheck(data){
    await servicesModule2.header();
    return axios
    .get("/api/module2/consultant_reRegister_check", {
        params: {
            CONSULTANT_NRIC: data,
        },
    })
    .then((response) => {
        return response.data;
    })
    .catch(function (error) {
        console.log(error);
        if (error.response) {
            if (error.response.status == 401) {
                logout();
            } else {
                return "error";
            }
        }
    });
}

export async function getConsultantsForBankruptcyCheck(distId) {
    await servicesModule2.header();
    return axios
    .get('/api/module2/consultants-for-bankruptcyCheck', {
        params: {
          DISTRIBUTOR_ID: distId,
        },
    })
    .then((response) => {
        //console.log("Consultant Under distributors : " + JSON.stringify(response.data.data));
        return response.data.data;
    });
}

export async function getBankruptcyCheckedConsultants(distId) {
    await servicesModule2.header();
    return axios
    .get('/api/module2/bankruptcy-checked-consultants', {
        params: {
          DISTRIBUTOR_ID: distId,
        },
    })
    .then((response) => {
        //console.log("Consultant Under distributors : " + JSON.stringify(response.data.data));
        return response.data.data;
    });
}

export async function getConsultantsForBankruptcyAdminReview(distId) {
    await servicesModule2.header();
    return axios
    .get('/api/module2/consultants-for-bankruptcy-adminReview', {
        params: {
          DISTRIBUTOR_ID: distId,
        },
    })
    .then((response) => {
        //console.log("Consultant Under distributors : " + JSON.stringify(response.data.data));
        return response.data.data;
    });
}

export async function getConsultantsBankruptcyCheckedByAdmin(distId) {
    await servicesModule2.header();
    return axios
    .get('/api/module2/consultants-for-bankruptcy-checked-byAdmin', {
        params: {
          DISTRIBUTOR_ID: distId,
        },
    })
    .then((response) => {
        //console.log("Consultant Under distributors : " + JSON.stringify(response.data.data));
        return response.data.data;
    });
}


export async function saveConsultantBankruptcyData(data) {
    await servicesModule2.header();
    return axios.post('/api/module2/save-consultant-bankruptcyData', data).then(response => {
        return response.data
    }).catch(function(error) {
        if (error.response) {
            if (error.response.status == 401) {
                // logout()
            } else {
                return 'error'
            }
        }
    });
}

export async function saveConsultantBankruptcyDetails (data) {
    await servicesModule2.header()
    return axios
    .post('/api/module2/save_consultant_bankruptcy_details', data)
    .then((response) => {
        Vue.$toast.open({
            message: response.data.message,
            type: 'success',
        })
        return response.data.data;
    })
    .catch(function (error) {
        console.log(error)
        if (error.response) {
                Vue.$toast.open({
                message: error.response.data.message,
                type: 'error',
            })
            if (error.response.status == 401) {
                logout()
            } else {
             return 'error'
            }
        }
    })
}

export async function saveConsultantBankruptcyApproval (data) {
    await servicesModule2.header()
    return axios
    .post('/api/module2/save_consultant_bankruptcy_approval', data)
    .then((response) => {
        Vue.$toast.open({
            message: response.data.message,
            type: 'success',
        })
        return response.data.data;
    })
    .catch(function (error) {
        console.log(error)
        if (error.response) {
                Vue.$toast.open({
                message: error.response.data.message,
                type: 'error',
            })
            if (error.response.status == 401) {
                logout()
            } else {
             return 'error'
            }
        }
    })
}

export async function saveBulkConsultantBankruptcyApproval (data) {
    await servicesModule2.header()
    return axios
    .post('/api/module2/save_bulkConsultant_bankruptcy_approval', data)
    .then((response) => {
        Vue.$toast.open({
            message: response.data.message,
            type: 'success',
        })
        return response.data.data;
    })
    .catch(function (error) {
        console.log(error)
        if (error.response) {
                Vue.$toast.open({
                message: error.response.data.message,
                type: 'error',
            })
            if (error.response.status == 401) {
                logout()
            } else {
             return 'error'
            }
        }
    })
}

export async function consultantBankruptcyCheckData (data) {
    await servicesModule2.header()
    return axios
      .get('/api/module2/consultant-bankruptcy-checkData', {
        params: {
          CONSULTANT_ID: data,
        },
      })
      .then((response) => {
        return response.data.data
      })
      .catch(function (error) {
        console.log(error)
        if (error.response) {
          if (error.response.status == 401) {
            logout()
          } else {
            return 'error'
          }
        }
      })
  }

export async function consultantBankruptcyApprovalData (data) {
    await servicesModule2.header()
    return axios
      .get('/api/module2/consultant-bankruptcy-approvalData', {
        params: {
          CONSULTANT_ID: data,
        },
      })
      .then((response) => {
        return response.data.data
      })
      .catch(function (error) {
        console.log(error)
        if (error.response) {
          if (error.response.status == 401) {
            logout()
          } else {
            return 'error'
          }
        }
      })
  }

export async function getConsultantCpdPoint (data) {
    await servicesModule2.header()
    return axios
      .get('/api/module2/consultant-cpd-points', {
        params: {
          CONSULTANT_ID: data,
        },
      })
      .then((response) => {
        return response.data.data
      })
      .catch(function (error) {
        console.log(error)
        if (error.response) {
          if (error.response.status == 401) {
            logout()
          } else {
            return 'error'
          }
        }
      })
  }



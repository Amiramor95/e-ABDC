/* eslint-disable semi */
/* eslint-disable eqeqeq */
/* eslint-disable dot-notation */

// Shah

import axios from 'axios';
import { type } from 'jquery';
import * as servicesModule1 from './services'

export async function submitForm(data) {
  await servicesModule1.header()

  // console.log(data);
  // return;
  return axios.post('/api/module1/distributor_extension_request', data).then((response) => {
    // console.log(response);
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
      return 'error';
    }
  });

}

export async function submitSubsequentForm(data) {
  await servicesModule1.header()

  let toastMessage = "Successfully";

  if(data.get('TS_ID') === "Pending") {
    toastMessage = `${toastMessage} submit Extension Request Entry.`;
  }else if(data.get('TS_ID') === 'Draft') {
    toastMessage = `${toastMessage} save Extension Request as draft.`;
  }

  return axios.post('/api/module1/subsequent/distributor_extension_request', data).then((response) => {
    this.$toast.success(toastMessage);
    return response.data;
  }).catch(function (error) {
    if (error.response) {
      this.$toast.error(toastMessage.replace('Successfully', 'Failed'));

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

export async function updateExtensionRequest(data) {
  await servicesModule1.header()

  // console.log(data);
  // return data;
  return axios.post(`/api/module1/distributor_extension_request/${data.get('EXTENSION_REQUEST_ID')}`, data, {headers: {'Content-Type': 'multipart/form-data'}}).then((response) => {
    // console.log(response);
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
      return 'error';
    }
  });

}

export async function updateSubsequentExtensionRequest(data) {
  await servicesModule1.header();

  return axios.post(`/api/module1/subsequent/distributor_extension_request/${data.get('SUBSEQUENT_EXTENSION_REQUEST_ID')}`, data, {headers: {'Content-Type': 'multipart/form-data'}}).then((response) => {

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
      this.$toast.error(toastMessage.replace('Successfully', 'Failed'));
      return 'error';
    }
  });

}

export async function fetchExtensionLists() {

  let distributorId = JSON.parse(localStorage.getItem("user")).USER_DIST_ID

  return axios.get(`/api/module1/distributor_extension_request`, {params: {DISTRIBUTOR_ID: distributorId}}).then((response) => {
    return response.data
  }).catch((error) => {
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
  })
}

export async function getById(id, action = null) {

  let user = JSON.parse(localStorage.getItem("user"));
  let data = {
    USER_GROUP_NAME: user.USER_GROUP_NAME,
    USER_GROUP_ID: user.USER_GROUP_ID ?? user.USER_GROUP,
    ACTION: action,
    IS_FIMM: user.hasOwnProperty('user_type') && user.user_type !== 'DISTRIBUTOR' ? true : false,
    DEPARTMENT: user.USER_GROUP_NAME
  };

  return axios.get(`/api/module1/distributor_extension_request/${id}`, {params: data}).then((response) => {
    return response.data.data;
  });
}

export async function getByIdCorrection(id, action = null) {

  let user = JSON.parse(localStorage.getItem("user"));
  let data = {
    USER_GROUP_NAME: user.USER_GROUP_NAME,
    USER_GROUP_ID: user.USER_GROUP_ID ?? user.USER_GROUP,
    ACTION: action,
    IS_FIMM: user.hasOwnProperty('user_type') && user.user_type !== 'DISTRIBUTOR' ? true : false,
    DEPARTMENT: user.USER_GROUP_NAME,
    CORRECTION: true
  };

  return axios.get(`/api/module1/distributor_extension_request/${id}`, {params: data}).then((response) => {
    return response.data.data;
  });
}

export async function getSubsequentById(id, action = null) {

  let user = JSON.parse(localStorage.getItem("user"));
  let data = {
    USER_GROUP_NAME: user.USER_GROUP_NAME,
    USER_GROUP_ID: user.USER_GROUP_ID ?? user.USER_GROUP,
    ACTION: action,
    IS_FIMM: user.hasOwnProperty('user_type') && user.user_type !== 'DISTRIBUTOR' ? true : false,
    DEPARTMENT: user.USER_GROUP_NAME
  };

  return axios.get(`/api/module1/subsequent/distributor_extension_request/${id}`, {params: data}).then((response) => {
    return response.data.data;
  });
}

export async function getSubsequentCorrectionById(id, action = null) {

  let user = JSON.parse(localStorage.getItem("user"));
  let data = {
    USER_GROUP_NAME: user.USER_GROUP_NAME,
    USER_GROUP_ID: user.USER_GROUP_ID ?? user.USER_GROUP,
    ACTION: action,
    IS_FIMM: user.hasOwnProperty('user_type') && user.user_type !== 'DISTRIBUTOR' ? true : false,
    DEPARTMENT: user.USER_GROUP_NAME,
    CORRECTION: true
  };

  return axios.get(`/api/module1/subsequent/distributor_extension_request/${id}`, {params: data}).then((response) => {
    return response.data.data;
  });
}

export async function submitExtensionRequestApproval(data) {
  await servicesModule1.header()

  // console.log(data);
  // return data;
  return axios.post('/api/module1/distributor_extension_request_approval', data).then((response) => {
    // console.log(response);
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
      return 'error';
    }
  });

}

export async function submitSubsequentExtensionRequestApproval(data) {
  await servicesModule1.header()

  // console.log(data);
  // return data;
  return axios.post('/api/module1/subsequent/distributor_extension_request_approval', data).then((response) => {
    // console.log(response);
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
      return 'error';
    }
  });

}

export async function deleteUploadedDocument(isActionPlan, item) {
  if(typeof item !== "undefined") {
    let body = {
      IS_ACTION_PLAN: isActionPlan,
      IS_SUBSEQUENT: false
    };
    return axios.delete(`/api/module1/distributor_extension_request/${item}`, {data: body}).then((res) => {
      console.log(res);
    });
  }
}
export async function deleteSubsequentUploadedDocument(isActionPlan, item) {
  if(typeof item !== "undefined") {
    let body = {
      IS_SUBSEQUENT: true,
      IS_ACTION_PLAN: isActionPlan
    };

    return axios.delete(`/api/module1/distributor_extension_request/${item}`, {data: body}).then((res) => {
      console.log(res);
    })
  }
}
export async function deleteApprovalUploadedDocument(isActionPlan, item) {
  if(typeof item !== "undefined") {
    return axios.delete(`/api/module1/distributor_extension_request_approval_docs/${item}`).then((res) => {
      console.log(res);
    });
  }
}

export async function approvalLists(subsequent = false) {
  let user = JSON.parse(localStorage.getItem("user"));
  let data = {
    DISTRIBUTOR_ID: JSON.parse(localStorage.getItem("user")).USER_DIST_ID,
    USER_GROUP_NAME: user.USER_GROUP_NAME,
    USER_GROUP_ID: user.USER_GROUP_ID ?? user.USER_GROUP,
    IS_FIMM: user.hasOwnProperty('user_type') && user.user_type !== 'DISTRIBUTOR' ? true : false,
    DEPARTMENT: user.USER_GROUP_NAME,
    STATUS: 'null'
  };

  return axios.get(`/api/module1${subsequent === true ? '/subsequent' : ''}/distributor_extension_request_approval_list`, {params: data}).then((response) => {
    return response.data;
  })
}

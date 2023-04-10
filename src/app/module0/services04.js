/* eslint-disable semi */
/* eslint-disable eqeqeq */
/* eslint-disable dot-notation */
//
import Vue from "vue";
import axios from "axios";
import * as servicesModule0 from "./services";

export function setUser(user) {
  localStorage.setItem("user", user);

  // setTokenCookie();
}

/** HAIZAD START DIVISION */
export async function getDepartmentByDivisionId(data) {
  await servicesModule0.header();
  return axios
    .get("/api/module0/department_management_by_division", {
      params: {
        MANAGE_DIVISION_ID: data,
      },
    })
    .then((response) => {
      console.log("data :" + JSON.stringify(response.data.data));
      return response.data.data;
    })
    .catch(function (error) {
      if (error.response) {
        // Vue.$toast.open({
        //     message: error.response.data.message,
        //     type: 'error',
        // });

        if (error.response.status == 500) {
          if (error.response.data.message == "Token expired.") {
            console.log("logout");
            servicesModule0.logout();
          } else {
            console.log(error.response.data.message);
          }
        } else if (error.response.status == 401) {
          servicesModule0.logout();
        }
        return "error";
      }
    });
}

export async function getNotification(data) {
  await servicesModule0.header();
  return axios
    .get("/api/module0/notifications", {
      params: {
        NOTIFICATION_RECEIVER_ID: data,
      },
    })
    .then((response) => {
      console.log("data :" + JSON.stringify(response.data.data));
      return response.data.data;
    })
    .catch(function (error) {
      if (error.response) {
        //   Vue.$toast.open({
        //     message: error.response.data.message,
        //     type: 'error',
        // });

        if (error.response.status == 500) {
          if (error.response.data.message == "Token expired.") {
            console.log("logout");
            servicesModule0.logout();
          } else {
            console.log(error.response.data.message);
          }
        } else if (error.response.status == 401) {
          servicesModule0.logout();
        }
        return "error";
      }
    });
}

export async function getNotificationByGroupAndModule(data, module) {
  await servicesModule0.header();
  return axios
    .get("/api/module0/notifications_by_group_and_module", {
      params: {
        NOTIFICATION_RECEIVER_ID: data,
        MODULE: module,
      },
    })
    .then((response) => {
      console.log("data :" + JSON.stringify(response.data.data));
      return response.data.data;
    })
    .catch(function (error) {
      if (error.response) {
        //   Vue.$toast.open({
        //     message: error.response.data.message,
        //     type: 'error',
        // });

        if (error.response.status == 500) {
          if (error.response.data.message == "Token expired.") {
            console.log("logout");
            servicesModule0.logout();
          } else {
            console.log(error.response.data.message);
          }
        } else if (error.response.status == 401) {
          servicesModule0.logout();
        }
        return "error";
      }
    });
}

export async function updateNotification(data) {
  await servicesModule0.header();
  return axios
    .post("/api/module0/update_notifications", data)
    .then((response) => {
      // console.log("exception create :" + JSON.stringify(response.data));
      return response.data;
    })
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status == 401) {
          // logout()
        } else {
          return "error";
        }
      }
    });
}

export async function getDistNotification(data) {
  await servicesModule0.header();
  return axios
    .get("/api/module0/distributor_notifications", {
      params: {
        NOTIFICATION_RECEIVER_ID: data,
      },
    })
    .then((response) => {
      console.log("data :" + JSON.stringify(response.data.data));
      return response.data.data;
    })
    .catch(function (error) {
      if (error.response) {
        //   Vue.$toast.open({
        //     message: error.response.data.message,
        //     type: 'error',
        // });

        if (error.response.status == 500) {
          if (error.response.data.message == "Token expired.") {
            console.log("logout");
            servicesModule0.logout();
          } else {
            console.log(error.response.data.message);
          }
        } else if (error.response.status == 401) {
          servicesModule0.logout();
        }
        return "error";
      }
    });
}

export async function updateDistNotification(data) {
  await servicesModule0.header();
  return axios
    .post("/api/module0/update_distributor_notifications", data)
    .then((response) => {
      // console.log("exception create :" + JSON.stringify(response.data));
      return response.data;
    })
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status == 401) {
          // logout()
        } else {
          return "error";
        }
      }
    });
}

export async function getOthersNotification(data) {
  await servicesModule0.header();
  return axios
    .get("/api/module0/others_notifications", {
      params: {
        NOTIFICATION_RECEIVER_ID: data,
      },
    })
    .then((response) => {
      console.log("data :" + JSON.stringify(response.data.data));
      return response.data.data;
    })
    .catch(function (error) {
      if (error.response) {
        //   Vue.$toast.open({
        //     message: error.response.data.message,
        //     type: 'error',
        // });

        if (error.response.status == 500) {
          if (error.response.data.message == "Token expired.") {
            console.log("logout");
            servicesModule0.logout();
          } else {
            console.log(error.response.data.message);
          }
        } else if (error.response.status == 401) {
          servicesModule0.logout();
        }
        return "error";
      }
    });
}

export async function updateOtherNotification(data) {
  await servicesModule0.header();
  return axios
    .post("/api/module0/update_others_notifications", data)
    .then((response) => {
      // console.log("exception create :" + JSON.stringify(response.data));
      return response.data;
    })
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status == 401) {
          // logout()
        } else {
          return "error";
        }
      }
    });
}

export async function getSubmoduleAll() {
  await servicesModule0.header();
  return axios
    .get("/api/module0/submodules")
    .then((response) => {
      return response.data.data;
    })
    .catch(function (error) {
      if (error.response) {
        //   Vue.$toast.open({
        //     message: error.response.data.message,
        //     type: 'error',
        // });

        if (error.response.status == 500) {
          if (error.response.data.message == "Token expired.") {
            console.log("logout");
            servicesModule0.logout();
          } else {
            console.log(error.response.data.message);
          }
        } else if (error.response.status == 401) {
          servicesModule0.logout();
        }
        return "error";
      }
    });
}

export async function getSubmodule(data) {
  await servicesModule0.header();
  return axios
    .get("/api/module0/submodule", {
      params: {
        MANAGE_MODULE_ID: data,
      },
    })
    .then((response) => {
      return response.data.data;
    })
    .catch(function (error) {
      if (error.response) {
        // Vue.$toast.open({
        //     message: error.response.data.message,
        //     type: 'error',
        // });

        if (error.response.status == 500) {
          if (error.response.data.message == "Token expired.") {
            console.log("logout");
            servicesModule0.logout();
          } else {
            console.log(error.response.data.message);
          }
        } else if (error.response.status == 401) {
          servicesModule0.logout();
        }
        return "error";
      }
    });
}

export async function getGroupByDepartmentId(data) {
  await servicesModule0.header();
  return axios
    .get("/api/module0/group_management_by_department", {
      params: {
        MANAGE_DEPARTMENT_ID: data,
      },
    })
    .then((response) => {
      return response.data.data;
    })
    .catch(function (error) {
      if (error.response) {
        // Vue.$toast.open({
        //     message: error.response.data.message,
        //     type: 'error',
        // });

        if (error.response.status == 500) {
          if (error.response.data.message == "Token expired.") {
            console.log("logout");
            servicesModule0.logout();
          } else {
            console.log(error.response.data.message);
          }
        } else if (error.response.status == 401) {
          servicesModule0.logout();
        }
        return "error";
      }
    });
}

export async function getAllModule() {
  await servicesModule0.header();
  return axios
    .get("/api/module0/modules")
    .then((response) => {
      return response.data.data;
    })
    .catch(function (error) {
      if (error.response) {
        // Vue.$toast.open({
        //     message: error.response.data.message,
        //     type: 'error',
        // });

        if (error.response.status == 401) {
          servicesModule0.logout();
        } else {
          return "error";
        }
      }
    });
}
export async function getManageModuleById(data) {
  await servicesModule0.header();
  return axios
    .get("/api/module0/module", {
      params: {
        MANAGE_MODULE_ID: data,
      },
    })
    .then((response) => {
      console.log("data :" + JSON.stringify(response.data.data));
      return response.data.data;
    })
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status == 401) {
          servicesModule0.logout();
        } else {
          return "error";
        }
      }
    });
}

export async function updateManageModule(data) {
  const jsonObject = {};

  for (const [key, value] of data) {
    jsonObject[key] = value;
  }
  return axios
    .put("/api/module0/module", jsonObject)
    .then((response) => {
      Vue.$toast.open({
        message: response.data.message,
        type: "success",
      });
      return response.data;
    })
    .catch(function (error) {
      if (error.response) {
        Vue.$toast.open({
          message: error.response.data.message,
          type: "error",
        });
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status == 500) {
          // console.log(JSON.stringify(error.response.data.message));
          if (error.response.data.message == "Token expired.") {
            servicesModule0.logout();
          } else {
            // console.log(error.response.data.message);
          }
        } else if (error.response.status == 401) {
          servicesModule0.logout();
        }
      }
    });
}
export async function deleteManageModule(data) {
  return axios
    .delete("/api/module0/module", {
      data: { MANAGE_MODULE_ID: data },
    })
    .then((response) => {
      console.log("data :" + JSON.stringify(response.data));
      return response.data;
    })
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status == 401) {
          servicesModule0.logout();
        } else {
          return "error";
        }
      }
    });
}

// ---------------------- MANAGE SCREEN ----------
export async function getAllsubModuleList(data) {
  await servicesModule0.header();
  return axios
    .get("/api/module0/screen_submodule", {
      params: {
        MANAGE_SUBMODULE_ID: data,
      },
    })
    .then((response) => {
      console.log(" list :" + JSON.stringify(response.data.data));
      return response.data.data;
    })
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status == 500) {
          // console.log(JSON.stringify(error.response.data.message));
          if (error.response.data.message == "Token expired.") {
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
export async function getAllProcessFlowList(data) {
  await servicesModule0.header();
  return axios
    .get("/api/module0/screen_processFlow", {
      params: {
        PROCESS_FLOW_ID: data,
      },
    })
    .then((response) => {
      console.log(" list :" + JSON.stringify(response.data.data));
      return response.data.data;
    })
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status == 500) {
          // console.log(JSON.stringify(error.response.data.message));
          if (error.response.data.message == "Token expired.") {
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
export async function getAllScreens() {
  await servicesModule0.header();
  return axios
    .get("/api/module0/screens")
    .then((response) => {
      return response.data.data;
    })
    .catch(function (error) {
      if (error.response) {
        Vue.$toast.open({
          message: error.response.data.message,
          type: "error",
        });

        console.log("error response :" + error.response);
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status == 500) {
        } else if (error.response.status == 401) {
          servicesModule0.logout();
        }
      }
    });
}
export async function getManageScreenById(data) {
  await servicesModule0.header();
  return axios
    .get("/api/module0/screen_byId", {
      params: {
        MANAGE_SCREEN_ID: data,
      },
    })
    .then((response) => {
      console.log("data :" + JSON.stringify(response.data.data));
      return response.data.data;
    })
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status == 401) {
          servicesModule0.logout();
        } else {
          return "error";
        }
      }
    });
}
// export async function getManageScreenById(data) {
//     await servicesModule0.header();
//     return axios.get("/api/module0/screen", {
//         params: {
//             MANAGE_SCREEN_ID: data
//         }
//     }).then(response => {
//         console.log("data :" + JSON.stringify(response.data.data));
//         return response.data.data;
//     }).catch(function(error) {
//         if (error.response) {
//             // The request was made and the server responded with a status code
//             // that falls out of the range of 2xx
//             if (error.response.status == 401) {
//                 servicesModule0.logout();
//             } else {
//                 return "error"
//             }
//         }
//     });
//   }

export async function updateManageScreen(data) {
  const jsonObject = {};

  for (const [key, value] of data) {
    jsonObject[key] = value;
  }
  return axios
    .put("/api/module0/screen", jsonObject)
    .then((response) => {
      // console.log('data :' + JSON.stringify(response.data));
      Vue.$toast.open({
        message: response.data.message,
        type: "success",
      });
      return response.data;
    })
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        Vue.$toast.open({
          message: error.response.data.message,
          type: "error",
        });
        // that falls out of the range of 2xx
        if (error.response.status == 500) {
          // console.log(JSON.stringify(error.response.data.message));
          if (error.response.data.message == "Token expired.") {
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
export async function deleteManageScreen(data) {
  return axios
    .delete("/api/module0/screen", {
      data: { MANAGE_SCREEN_ID: data },
    })
    .then((response) => {
      Vue.$toast.open({
        message: response.data.message,
        type: "success",
      });
      return response.data;
    })
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status == 401) {
          servicesModule0.logout();
        } else {
          return "error";
        }
      }
    });
}
// ------------------------------------------
export async function uploadDemoDoc(data) {
  console.log("data : " + data);
  await servicesModule0.header();
  return axios
    .post("/api/module0/demo-upload ", data)
    .then((response) => {
      console.log(response.data);

      Vue.$toast.open({
        message: response.data.message,
        type: "success",
      });
      return response.data;
    })
    .catch(function (error) {
      if (error.response) {
        // Vue.$toast.open({
        //     message: error.response.data.message,
        //     type: 'error',
        // });

        if (error.response.status == 500) {
          // console.log(JSON.stringify(error.response.data.message));
          if (error.response.data.message == "Token expired.") {
            console.log("logout");
            servicesModule0.logout();
          } else {
            console.log(error.response.data.message);
          }
        } else if (error.response.status == 401) {
          servicesModule0.logout();
        }
        return "error";
      }
    });
}
export async function uploadDemoExcel(data) {
  console.log("data : " + data);
  await servicesModule0.header();
  return axios
    .post("/api/module0/demo-upload-excel", data, {
      headers: { "content-type": "multipart/form-data" },
    })
    .then((response) => {
      console.log(response.data);

      Vue.$toast.open({
        message: response.data.message,
        type: "success",
      });
      return response.data;
    })
    .catch(function (error) {
      if (error.response) {
        // Vue.$toast.open({
        //     message: error.response.data.message,
        //     type: 'error',
        // });

        if (error.response.status == 500) {
          // console.log(JSON.stringify(error.response.data.message));
          if (error.response.data.message == "Token expired.") {
            console.log("logout");
            servicesModule0.logout();
          } else {
            console.log(error.response.data.message);
          }
        } else if (error.response.status == 401) {
          servicesModule0.logout();
        }
        return "error";
      }
    });
}

export async function createScreen(data) {
  console.log("data : " + data);
  await servicesModule0.header();
  return axios
    .post("/api/module0/screen ", data)
    .then((response) => {
      console.log(response.data);

      Vue.$toast.open({
        message: response.data.message,
        type: "success",
      });
      return response.data;
    })
    .catch(function (error) {
      if (error.response) {
        Vue.$toast.open({
          message: error.response.data.message,
          type: "error",
        });
        if (error.response.status == 500) {
          // console.log(JSON.stringify(error.response.data.message));
          if (error.response.data.message == "Token expired.") {
            console.log("logout");
            servicesModule0.logout();
          } else {
            console.log(error.response.data.message);
          }
        } else if (error.response.status == 401) {
          servicesModule0.logout();
        }
        return "error";
      }
    });
}

export async function getScreen(moduleSelection, submoduleSelection) {
  await servicesModule0.header();
  return axios
    .get("/api/module0/screen", {
      params: {
        MANAGE_MODULE_ID: moduleSelection,
        MANAGE_SUBMODULE_ID: submoduleSelection,
      },
    })
    .then((response) => {
      console.log("data :" + JSON.stringify(response.data.data));
      return response.data.data;
    })
    .catch(function (error) {
      if (error.response) {
        if (error.response.status == 500) {
          if (error.response.data.message == "Token expired.") {
            console.log("logout");
            servicesModule0.logout();
          } else {
            console.log(error.response.data.message);
          }
        } else if (error.response.status == 401) {
          servicesModule0.logout();
        }
        return "error";
      }
    });
}
export async function getStaffList(data) {
  await servicesModule0.header();
  return axios
    .get("/api/module0/screen_access_user", {
      params: {},
    })
    .then((response) => {
      console.log(" list :" + JSON.stringify(response.data.data));
      return response.data.data;
    })
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status == 500) {
          // console.log(JSON.stringify(error.response.data.message));
          if (error.response.data.message == "Token expired.") {
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

// export async function getStaffList() {
//     await servicesModule0.header();
//     return axios.get('/api/module0/screen_access_user').then(response => {
//         console.log('data :' + JSON.stringify(response.data.data));
//         return response.data.data;
//     }).catch(function(error) {
//         if (error.response) {
//             if (error.response.status == 500) {
//                 if (error.response.data.message == 'Token expired.') {
//                     console.log('logout');
//                     servicesModule0.logout();
//                 } else {
//                     console.log(error.response.data.message);
//                 }
//             } else if (error.response.status == 401) {
//                 servicesModule0.logout();
//             }
//             return 'error';
//         }
//     });
// }

export async function createModule(data) {
  await servicesModule0.header();
  return axios
    .post("/api/module0/module ", data)
    .then((response) => {
      Vue.$toast.open({
        message: response.data.message,
        type: "success",
      });
      return response.data;
    })
    .catch(function (error) {
      if (error.response) {
        Vue.$toast.open({
          message: error.response.data.message,
          type: "error",
        });

        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status == 500) {
          if (error.response.data.message == "Token expired.") {
            servicesModule0.logout();
          } else {
            // console.log(error.response.data.message);
          }
        } else if (error.response.status == 401) {
          servicesModule0.logout();
        }
        return "error";
      }
    });
}

// ---------- manage Submodule

export async function createSubmodule(data) {
  await servicesModule0.header();
  return axios
    .post("/api/module0/submodule ", data)
    .then((response) => {
      Vue.$toast.open({
        message: response.data.message,
        type: "success",
      });
      return response.data;
    })
    .catch(function (error) {
      if (error.response) {
        Vue.$toast.open({
          message: error.response.data.message,
          type: "error",
        });
        if (error.response.status == 500) {
          if (error.response.data.message == "Token expired.") {
            servicesModule0.logout();
          } else {
          }
        } else if (error.response.status == 401) {
          servicesModule0.logout();
        }
        return "error";
      }
    });
}
export async function getManageSubModuleById(data) {
  await servicesModule0.header();
  return axios
    .get("/api/module0/submoduless", {
      params: {
        MANAGE_SUBMODULE_ID: data,
      },
    })
    .then((response) => {
      // console.log("data :" + JSON.stringify(response.data.data));
      return response.data.data;
    })
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status == 401) {
          servicesModule0.logout();
        } else {
          return "error";
        }
      }
    });
}

export async function updateManageSubModule(data) {
  const jsonObject = {};

  for (const [key, value] of data) {
    jsonObject[key] = value;
  }
  return axios
    .put("/api/module0/submodule", jsonObject)
    .then((response) => {
      // console.log('data :' + JSON.stringify(response.data));
      Vue.$toast.open({
        message: response.data.message,
        type: "success",
      });
      return response.data;
    })
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status == 500) {
          // console.log(JSON.stringify(error.response.data.message));
          if (error.response.data.message == "Token expired.") {
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
export async function deleteManageSubModule(data) {
  return axios
    .delete("/api/module0/submodule", {
      data: { MANAGE_SUBMODULE_ID: data },
    })
    .then((response) => {
      // console.log("data :" + JSON.stringify(response.data));
      Vue.$toast.open({
        message: response.data.message,
        type: "success",
      });
      return response.data;
    })
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status == 401) {
          servicesModule0.logout();
        } else {
          return "error";
        }
      }
    });
}

// -----------
export async function createDistributorType() {
  console.log("data : " + data);
  await servicesModule0.header();
  return axios
    .post("/api/module0/sbm_distributor ", data)
    .then((response) => {
      // console.log(response.data);
      return response.data;
    })
    .catch(function (error) {
      if (error.response) {
        // Vue.$toast.open({
        //     message: error.response.data.message,
        //     type: 'error',
        // });

        if (error.response.status == 500) {
          // console.log(JSON.stringify(error.response.data.message));
          if (error.response.data.message == "Token expired.") {
            console.log("logout");
            servicesModule0.logout();
          } else {
            console.log(error.response.data.message);
          }
        } else if (error.response.status == 401) {
          servicesModule0.logout();
        }
        return "error";
      }
    });
}

export async function getAuthorizationLevel() {
  await servicesModule0.header();
  return axios
    .get("/api/module0/screen_access_auth")
    .then((response) => {
      // console.log('data :' + JSON.stringify(response.data.data));
      return response.data.data;
    })
    .catch(function (error) {
      if (error.response) {
        // Vue.$toast.open({
        //     message: error.response.data.message,
        //     type: 'error',
        // });

        if (error.response.status == 500) {
          if (error.response.data.message == "Token expired.") {
            console.log("logout");
            servicesModule0.logout();
          } else {
            console.log(error.response.data.message);
          }
        } else if (error.response.status == 401) {
          servicesModule0.logout();
        }
        return "error";
      }
    });
}
export async function getAllManageGroupList() {
  await servicesModule0.header();
  return axios
    .get("/api/module0/screen_access_group")
    .then((response) => {
      console.log("data :" + JSON.stringify(response.data.data));
      return response.data.data;
    })
    .catch(function (error) {
      if (error.response) {
        // Vue.$toast.open({
        //     message: error.response.data.message,
        //     type: 'error',
        // });

        if (error.response.status == 500) {
          if (error.response.data.message == "Token expired.") {
            console.log("logout");
            servicesModule0.logout();
          } else {
            console.log(error.response.data.message);
          }
        } else if (error.response.status == 401) {
          servicesModule0.logout();
        }
        return "error";
      }
    });
}
export async function getAuthLevelById(data) {
  await servicesModule0.header();
  return axios
    .get("/api/module0/screen_access", {
      params: {
        MANAGE_SCREEN_ACCESS_ID: data,
      },
    })
    .then((response) => {
      console.log("data :" + JSON.stringify(response.data.data));
      return response.data.data;
    })
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status == 401) {
          servicesModule0.logout();
        } else {
          return "error";
        }
      }
    });
}
export async function updateAccessScreen(data) {
  const jsonObject = {};

  for (const [key, value] of data) {
    jsonObject[key] = value;
  }
  return axios
    .put("/api/module0/screen_access", jsonObject)
    .then((response) => {
      // console.log('data :' + JSON.stringify(response.data));
      Vue.$toast.open({
        message: response.data.message,
        type: "success",
      });
      return response.data;
    })
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        Vue.$toast.open({
          message: error.response.data.message,
          type: "error",
        });
        // that falls out of the range of 2xx
        if (error.response.status == 500) {
          // console.log(JSON.stringify(error.response.data.message));
          if (error.response.data.message == "Token expired.") {
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
export async function getScreenAccesses(data) {
  await servicesModule0.header();
  return axios
    .get("/api/module0/screen_accesses", {
      params: {
        MANAGE_DIVISION_ID: data.MANAGE_DIVISION_ID,
        MANAGE_DEPARTMENT_ID: data.MANAGE_DEPARTMENT_ID,
        MANAGE_GROUP_ID: data.MANAGE_GROUP_ID,
        TEXT: data.TEXT,
      },
    })
    .then((response) => {
      // console.log('data :' + JSON.stringify(response.data.data));
      return response.data.data;
    })
    .catch(function (error) {
      if (error.response) {
        // Vue.$toast.open({
        //     message: error.response.data.message,
        //     type: 'error',
        // });

        if (error.response.status == 500) {
          if (error.response.data.message == "Token expired.") {
            console.log("logout");
            servicesModule0.logout();
          } else {
            console.log(error.response.data.message);
          }
        } else if (error.response.status == 401) {
          servicesModule0.logout();
        }
        return "error";
      }
    });
}

export async function getSideBarList(group_id, user_id, user_type) {
  await servicesModule0.header();
  return axios
    .get("/api/module0/sidebar", {
      params: {
        MANAGE_GROUP_ID: group_id,
        USER_ID: user_id,
        USER_TYPE: user_type,
      },
    })
    .then((response) => {
      console.log("data :" + JSON.stringify(response.data.data));
      return response.data.data;
    })
    .catch(function (error) {
      if (error.response) {
        // Vue.$toast.open({
        //     message: error.response.data.message,
        //     type: 'error',
        // });

        if (error.response.status == 500) {
          if (error.response.data.message == "Token expired.") {
            console.log("logout");
            servicesModule0.logout();
          }
          // else {
          //     // console.log(error.response.data.message); disabled
          // }
        } else if (error.response.status == 401) {
          servicesModule0.logout();
        }
        return "error";
      }
    });
}

export async function getAllDivisionList() {
  await servicesModule0.header();
  return axios
    .get("/api/module0/division_managements")
    .then((response) => {
      // console.log('data :' + JSON.stringify(response.data.data));
      return response.data.data;
    })
    .catch(function (error) {
      if (error.response) {
        // Vue.$toast.open({
        //     message: error.response.data.message,
        //     type: 'error',
        // });

        if (error.response.status == 500) {
          if (error.response.data.message == "Token expired.") {
            console.log("logout");
            servicesModule0.logout();
          } else {
            console.log(error.response.data.message);
          }
        } else if (error.response.status == 401) {
          servicesModule0.logout();
        }
        return "error";
      }
    });
}

export async function getAllSettingGeneralList(data) {
  await servicesModule0.header();
  return axios
    .get("/api/module0/setting_generals", {
      params: {
        SET_TYPE: data,
      },
    })
    .then((response) => {
      console.log(
        "setting general list :" + JSON.stringify(response.data.data)
      );
      return response.data.data;
    })
    .catch(function (error) {
      if (error.response) {
        // Vue.$toast.open({
        //     message: error.response.data.message,
        //     type: 'error',
        // });
        if (error.response.status == 500) {
          // console.log(JSON.stringify(error.response.data.message));
          if (error.response.data.message == "Token expired.") {
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

export async function getUserAdiScreen(user_id, screen_id) {
  await servicesModule0.header();
  return axios
    .get("/api/module0/user_additional_screen", {
      params: {
        user_id: user_id,
        screen_id: screen_id,
      },
    })
    .then((response) => {
      console.log("data :" + JSON.stringify(response.data.data));
      return response.data.data;
    })
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status == 401) {
          servicesModule0.logout();
        } else {
          return "error";
        }
      }
    });
}

export async function createAdditionalUserScreen(data) {
  // console.log('data : ' + data);
  await servicesModule0.header();
  return axios
    .post("/api/module0/save_user_additional_screen", data)
    .then((response) => {
      // console.log(response.data);
      Vue.$toast.open({
        message: response.data.message,
        type: "success",
      });
      return response.data;
    })
    .catch(function (error) {
      if (error.response) {
        Vue.$toast.open({
          message: error.response.data.message,
          type: "error",
        });

        if (error.response.status == 500) {
          // console.log(JSON.stringify(error.response.data.message));
          if (error.response.data.message == "Token expired.") {
            console.log("logout");
            servicesModule0.logout();
          } else {
            console.log(error.response.data.message);
          }
        } else if (error.response.status == 401) {
          servicesModule0.logout();
        }
        return "error";
      }
    });
}

export async function savePurgeData(data) {
  // console.log('data : ' + data);
  await servicesModule0.header();
  return axios
    .post("/api/module0/save_purge_data", data)
    .then((response) => {
      // console.log(response.data);
      Vue.$toast.open({
        message: response.data.message,
        type: "success",
      });
      return response.data;
    })
    .catch(function (error) {
      if (error.response) {
        Vue.$toast.open({
          message: error.response.data.message,
          type: "error",
        });

        if (error.response.status == 500) {
          // console.log(JSON.stringify(error.response.data.message));
          if (error.response.data.message == "Token expired.") {
            console.log("logout");
            servicesModule0.logout();
          } else {
            console.log(error.response.data.message);
          }
        } else if (error.response.status == 401) {
          servicesModule0.logout();
        }
        return "error";
      }
    });
}

export async function getPurgeData(user_id, screen_id) {
  await servicesModule0.header();
  return axios
    .get("/api/module0/get_purge_data", {
      params: {
        user_id: user_id,
        screen_id: screen_id,
      },
    })
    .then((response) => {
      console.log("data :" + JSON.stringify(response.data.data));
      return response.data.data;
    })
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status == 401) {
          servicesModule0.logout();
        } else {
          return "error";
        }
      }
    });
}

// User Change Password User Management
export async function changePassword(data) {
  // console.log('data : ' + data);
  await servicesModule0.header();
  return axios
    .post("/api/module0/demo-reset-password", data)
    .then((response) => {
      // console.log(response.data);
      Vue.$toast.open({
        message: response.data.message,
        type: "success",
      });
      return response.data;
    })
    .catch(function (error) {
      if (error.response) {
        Vue.$toast.open({
          message: error.response.data.message,
          type: "error",
        });

        if (error.response.status == 500) {
          // console.log(JSON.stringify(error.response.data.message));
          if (error.response.data.message == "Token expired.") {
            console.log("logout");
            servicesModule0.logout();
          } else {
            console.log(error.response.data.message);
          }
        } else if (error.response.status == 401) {
          servicesModule0.logout();
        }
        return "error";
      }
    });
}

export async function getAllCity(user_id, screen_id) {
  await servicesModule0.header();
  return axios
    .get("/api/module0/get_all_city")
    .then((response) => {
      // console.log("data :" + JSON.stringify(response.data.data));
      return response.data.data;
    })
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status == 401) {
          servicesModule0.logout();
        } else {
          return "error";
        }
      }
    });
}

export async function getAllPostcode(user_id, screen_id) {
  await servicesModule0.header();
  return axios
    .get("/api/module0/get_all_postcode")
    .then((response) => {
      // console.log("data :" + JSON.stringify(response.data.data));
      return response.data.data;
    })
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status == 401) {
          servicesModule0.logout();
        } else {
          return "error";
        }
      }
    });
}

export async function userManageRoleSubmit(data) {
  // console.log('data : ' + data);
  await servicesModule0.header();
  return axios
    .post("/api/module0/submit_user_role", data)
    .then((response) => {
      // console.log(response.data);
      Vue.$toast.open({
        message: response.data.message,
        type: "success",
      });
      return response.data;
    })
    .catch(function (error) {
      if (error.response) {
        Vue.$toast.open({
          message: error.response.data.message,
          type: "error",
        });

        if (error.response.status == 500) {
          // console.log(JSON.stringify(error.response.data.message));
          if (error.response.data.message == "Token expired.") {
            console.log("logout");
            servicesModule0.logout();
          } else {
            console.log(error.response.data.message);
          }
        } else if (error.response.status == 401) {
          servicesModule0.logout();
        }
        return "error";
      }
    });
}

export async function getUserManagementData(data) {
  await servicesModule0.header();
  return axios
    .post("/api/module0/get_user_manage_data", data)
    .then((response) => {
      return response.data.data;
    })
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status == 401) {
          servicesModule0.logout();
        } else {
          return "error";
        }
      }
    });
}

export async function getUserInformation(dept) {
  await servicesModule0.header();
  return axios
    .get("/api/module0/get_user_info", {
      params: {
        MANAGE_DEPARTMENT_ID: dept,
      },
    })
    .then((response) => {
      return response.data.data;
    })
    .catch(function (error) {
      if (error.response) {
        // that falls out of the range of 2xx
        if (error.response.status == 401) {
          servicesModule0.logout();
        } else {
          return "error";
        }
      }
    });
}

export async function getUserById(userId) {
  await servicesModule0.header();
  return axios
    .get("/api/module0/get_user_by_id", {
      params: {
        USER_ID: userId,
      },
    })
    .then((response) => {
      return response.data.data;
    })
    .catch(function (error) {
      if (error.response) {
        // that falls out of the range of 2xx
        if (error.response.status == 401) {
          servicesModule0.logout();
        } else {
          return "error";
        }
      }
    });
}

export async function saveUserApprove(data) {
  // console.log('data : ' + data);
  await servicesModule0.header();
  return axios
    .post("/api/module0/save_user_approve", data)
    .then((response) => {
      // console.log(response.data);
      Vue.$toast.open({
        message: response.data.message,
        type: "success",
      });
      return response.data;
    })
    .catch(function (error) {
      if (error.response) {
        Vue.$toast.open({
          message: error.response.data.message,
          type: "error",
        });

        if (error.response.status == 500) {
          // console.log(JSON.stringify(error.response.data.message));
          if (error.response.data.message == "Token expired.") {
            console.log("logout");
            servicesModule0.logout();
          } else {
            console.log(error.response.data.message);
          }
        } else if (error.response.status == 401) {
          servicesModule0.logout();
        }
        return "error";
      }
    });
}

// User Matrix Role
export async function getAllUserInfo(divId, deptId, grpId) {
  await servicesModule0.header();
  return axios
    .get("/api/module0/get_all_user_info", {
      params: {
        divId: divId,
        deptId: deptId,
        grpId: grpId,
      },
    })
    .then((response) => {
      return response.data.data;
    })
    .catch(function (error) {
      if (error.response) {
        // that falls out of the range of 2xx
        if (error.response.status == 401) {
          servicesModule0.logout();
        } else {
          return "error";
        }
      }
    });
}

export async function getUserMatrixScreen(data) {
  await servicesModule0.header();
  return axios
    .get("/api/module0/get_user_matrix_screen", {
      params: {
        MANAGE_DIVISION_ID: data.MANAGE_DIVISION_ID,
        MANAGE_DEPARTMENT_ID: data.MANAGE_DEPARTMENT_ID,
        MANAGE_GROUP_ID: data.MANAGE_GROUP_ID,
        USER_ID: data.USER_ID,
      },
    })
    .then((response) => {
      // console.log('data :' + JSON.stringify(response.data.data));
      return response.data.data;
    })
    .catch(function (error) {
      if (error.response) {
        // Vue.$toast.open({
        //     message: error.response.data.message,
        //     type: 'error',
        // });

        if (error.response.status == 500) {
          if (error.response.data.message == "Token expired.") {
            console.log("logout");
            servicesModule0.logout();
          } else {
            console.log(error.response.data.message);
          }
        } else if (error.response.status == 401) {
          servicesModule0.logout();
        }
        return "error";
      }
    });
}

export async function saveUserRoleMatrix(data) {
  // console.log('data : ' + data);
  await servicesModule0.header();
  return axios
    .post("/api/module0/save_user_role_matrix", data)
    .then((response) => {
      // console.log(response.data);
      Vue.$toast.open({
        message: response.data.message,
        type: "success",
      });
      return response.data;
    })
    .catch(function (error) {
      if (error.response) {
        Vue.$toast.open({
          message: error.response.data.message,
          type: "error",
        });
        if (error.response.status == 500) {
          // console.log(JSON.stringify(error.response.data.message));
          if (error.response.data.message == "Token expired.") {
            console.log("logout");
            servicesModule0.logout();
          } else {
            console.log(error.response.data.message);
          }
        } else if (error.response.status == 401) {
          servicesModule0.logout();
        }
        return "error";
      }
    });
}

export async function setAnnouncementStatus(data) {
  // console.log('data : ' + data);
  await servicesModule0.header();
  return axios
    .post("/api/module0/set_announcement_status", data)
    .then((response) => {
      // console.log(response.data);
      Vue.$toast.open({
        message: response.data.message,
        type: "success",
      });
      return response.data;
    })
    .catch(function (error) {
      if (error.response) {
        Vue.$toast.open({
          message: error.response.data.message,
          type: "error",
        });
        if (error.response.status == 500) {
          // console.log(JSON.stringify(error.response.data.message));
          if (error.response.data.message == "Token expired.") {
            console.log("logout");
            servicesModule0.logout();
          } else {
            console.log(error.response.data.message);
          }
        } else if (error.response.status == 401) {
          servicesModule0.logout();
        }
        return "error";
      }
    });
}

export async function getAnnounceDept() {
  await servicesModule0.header();
  return axios
    .get("/api/module0/get_announce_dept")
    .then((response) => {
      // console.log("data :" + JSON.stringify(response.data.data));
      return response.data.data;
    })
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status == 401) {
          servicesModule0.logout();
        } else {
          return "error";
        }
      }
    });
}

export async function setCircularStatus(data) {
  // console.log('data : ' + data);
  await servicesModule0.header();
  return axios
    .post("/api/module0/set_circular_status", data)
    .then((response) => {
      // console.log(response.data);
      Vue.$toast.open({
        message: response.data.message,
        type: "success",
      });
      return response.data;
    })
    .catch(function (error) {
      if (error.response) {
        Vue.$toast.open({
          message: error.response.data.message,
          type: "error",
        });
        if (error.response.status == 500) {
          // console.log(JSON.stringify(error.response.data.message));
          if (error.response.data.message == "Token expired.") {
            console.log("logout");
            servicesModule0.logout();
          } else {
            console.log(error.response.data.message);
          }
        } else if (error.response.status == 401) {
          servicesModule0.logout();
        }
        return "error";
      }
    });
}

export async function getCircularDept() {
  await servicesModule0.header();
  return axios
    .get("/api/module0/get_circular_dept")
    .then((response) => {
      // console.log("data :" + JSON.stringify(response.data.data));
      return response.data.data;
    })
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status == 401) {
          servicesModule0.logout();
        } else {
          return "error";
        }
      }
    });
}
// Data Retention Settings
export async function saveDataRetention(data) {
  // console.log('data : ' + data);
  await servicesModule0.header();
  return axios
    .post("/api/module0/save_data_retention", data)
    .then((response) => {
      // console.log(response.data);
      Vue.$toast.open({
        message: response.data.message,
        type: "success",
      });
      return response.data;
    })
    .catch(function (error) {
      if (error.response) {
        Vue.$toast.open({
          message: error.response.data.message,
          type: "error",
        });

        if (error.response.status == 500) {
          // console.log(JSON.stringify(error.response.data.message));
          if (error.response.data.message == "Token expired.") {
            console.log("logout");
            servicesModule0.logout();
          } else {
            console.log(error.response.data.message);
          }
        } else if (error.response.status == 401) {
          servicesModule0.logout();
        }
        return "error";
      }
    });
}

export async function getDataRetention() {
  await servicesModule0.header();
  return axios
    .get("/api/module0/get_data_retention")
    .then((response) => {
      console.log("data :" + JSON.stringify(response.data.data));
      return response.data.data;
    })
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status == 401) {
          servicesModule0.logout();
        } else {
          return "error";
        }
      }
    });
}

export async function archiveDataRetention(data) {
  // console.log('data : ' + data);
  await servicesModule0.header();
  return axios
    .post("/api/module0/archive_data_retention", data)
    .then((response) => {
      // console.log(response.data);
      Vue.$toast.open({
        message: response.data.message,
        type: "success",
      });
      return response.data;
    })
    .catch(function (error) {
      if (error.response) {
        Vue.$toast.open({
          message: error.response.data.message,
          type: "error",
        });

        if (error.response.status == 500) {
          // console.log(JSON.stringify(error.response.data.message));
          if (error.response.data.message == "Token expired.") {
            console.log("logout");
            servicesModule0.logout();
          } else {
            console.log(error.response.data.message);
          }
        } else if (error.response.status == 401) {
          servicesModule0.logout();
        }
        return "error";
      }
    });
}

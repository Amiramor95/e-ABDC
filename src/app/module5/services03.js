// acap
import axios from "axios";
import Vue from "vue";
import * as servicesModule0 from "../module0/services";
import { logout } from "../module1/services03";

import * as servicesModule5 from "./services";

export async function FPisActive(data) {
    return axios
        .get("/api/module5/FPisActive", {
            params: {
                DIST_ID: data,
            },
        })
        .then((response) => {
            console.log("data :" + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                });
                if (error.response.status === 401) {
                    logout();
                } else {
                    return "error";
                }
            }
        });
}

export async function getFundHouseList() {
    return axios
        .get("/api/module5/getFundHouseList")
        .then((response) => {
            console.log("data :" + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                });
                if (error.response.status === 401) {
                    logout();
                } else {
                    return "error";
                }
            }
        });
}

export async function getDistributorList(data,data2) {
    return axios
        .get("/api/module5/getDistributor_list", {
            params: {
                DistType: data,
                changeViewStatus: data2,
            },
        })
        .then((response) => {
            console.log("data :" + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                });
                if (error.response.status === 401) {
                    logout();
                } else {
                    return "error";
                }
            }
        });
}

//get document blob
export async function getDocumentById(data) {
    // await servicesModule0.header();
    console.log(data);
    return axios
        .get("/api/module5/get_document", {
            params: {
                FundProfileID: data,
            },
        })
        .then((response) => {
            console.log("Document list : " + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 500) {
                    // console.log(JSON.stringify(error.response.data.message));
                    if (error.response.data.message == "Token expired.") {
                        console.log("logout");
                        //logout();
                    } else {
                        console.log(error.response.data.message);
                    }
                } else if (error.response.status == 401) {
                    //logout();
                }
                return "error";
            }
        });
}
//get temp document blob
export async function getTempDocumentById(data) {
    // await servicesModule0.header();
    console.log(data);
    return axios
        .get("/api/module5/get_temp_document", {
            params: {
                FUND_TEMP_ID: data,
            },
        })
        .then((response) => {
            console.log("Document list : " + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 500) {
                    // console.log(JSON.stringify(error.response.data.message));
                    if (error.response.data.message == "Token expired.") {
                        console.log("logout");
                        //logout();
                    } else {
                        console.log(error.response.data.message);
                    }
                } else if (error.response.status == 401) {
                    //logout();
                }
                return "error";
            }
        });
}
//get document blob
export async function getDocForFundCreation(data) {
    // await servicesModule0.header();
    console.log(data);
    return axios
        .get("/api/module5/getDocForFundCreation", {
            params: {
                FundProfileID: data,
            },
        })
        .then((response) => {
            console.log("Document list : " + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 500) {
                    // console.log(JSON.stringify(error.response.data.message));
                    if (error.response.data.message == "Token expired.") {
                        console.log("logout");
                        //logout();
                    } else {
                        console.log(error.response.data.message);
                    }
                } else if (error.response.status == 401) {
                    //logout();
                }
                return "error";
            }
        });
}

export async function getDocForFundManagement(data) {
    // await servicesModule0.header();
    console.log(data);
    return axios
        .get("/api/module5/getDocForFundManagement", {
            params: {
                FundTempId: data,
            },
        })
        .then((response) => {
            console.log("Document list : " + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 500) {
                    // console.log(JSON.stringify(error.response.data.message));
                    if (error.response.data.message == "Token expired.") {
                        console.log("logout");
                        //logout();
                    } else {
                        console.log(error.response.data.message);
                    }
                } else if (error.response.status == 401) {
                    //logout();
                }
                return "error";
            }
        });
}

export async function getLodgeDocumentById(data) {
    // await servicesModule0.header();
    console.log(data);
    return axios
        .get("/api/module5/getLodgeDocumentById", {
            params: {
                BulkID: data,
            },
        })
        .then((response) => {
            console.log("Document list : " + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 500) {
                    // console.log(JSON.stringify(error.response.data.message));
                    if (error.response.data.message == "Token expired.") {
                        console.log("logout");
                        //logout();
                    } else {
                        console.log(error.response.data.message);
                    }
                } else if (error.response.status == 401) {
                    //logout();
                }
                return "error";
            }
        });
}

//delete doc

export async function deleteDocument(data) {
    await servicesModule0.header();
    return axios
        .delete("/api/module5/delete_document", {
            params: {
                FundProfileID: data,
            },
        })
        .then((response) => {
            console.log("data :" + JSON.stringify(response.data));
            return response.data;
        })
        .catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 500) {
                    // console.log(JSON.stringify(error.response.data.message));
                    if (error.response.data.message == "Token expired.") {
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
// 1. fund creation ( distributor )
export async function createFundProfile(data) {
    return axios
        .post("/api/module5/fund_profile", data)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            return response.data;
        })
        .catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 500) {
                    // console.log(JSON.stringify(error.response.data.message));
                    if (error.response.data.message == "Token expired.") {
                        console.log("logout");
                        //logout();
                    } else {
                        console.log(error.response.data.message);
                    }
                } else if (error.response.status == 401) {
                    //logout();
                }
                return "error";
            }
        });
}

// 2. fund creation get data (distributor )

export async function getRunningNoFundCode() {
    return axios
        .get("/api/module5/getRunningNoFundCode")
        .then((response) => {
            console.log(JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 500) {
                    // console.log(JSON.stringify(error.response.data.message));
                    if (error.response.data.message == "Token expired.") {
                        console.log("logout");
                        //logout();
                    } else {
                        console.log(error.response.data.message);
                    }
                } else if (error.response.status == 401) {
                    //logout();
                }
                return "error";
            }
        });
}

export async function updateRunningNoFundCode(data) {
    return axios
        .post("/api/module5/updateRunningNoFundCode", data)
        .then((response) => {
            console.log("data :" + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                });
                if (error.response.status == 500) {
                    // console.log(JSON.stringify(error.response.data.message));
                    if (error.response.data.message == "Token expired.") {
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

export async function getFundNoteDetail(data) {
    return axios
        .get("/api/module5/getFundNoteDetail", {
            params: {
                FUND_PROFILE_ID: data,
            },
        })
        .then((response) => {
            console.log("data :" + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                });
                if (error.response.status === 401) {
                    logout();
                } else {
                    return "error";
                }
            }
        });
}

export async function getFundProfileInfo(data) {
    return axios
        .get("/api/module5/getFundProfileInfo", {
            params: {
                FUND_PROFILE_ID: data,
            },
        })
        .then((response) => {
            console.log("data :" + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                });
                if (error.response.status === 401) {
                    logout();
                } else {
                    return "error";
                }
            }
        });
}

export async function getAllCurrencyFormat() {
    return axios
        .get("/api/module5/getAllCurrency")
        .then((response) => {
            console.log("data :" + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                });
                if (error.response.status === 401) {
                    logout();
                } else {
                    return "error";
                }
            }
        });
}

export async function getFundProfile(data) {
    return axios
        .get("/api/module5/fund_profile", {
            params: {
                DIST_ID: data,
            },
        })
        .then((response) => {
            console.log("data :" + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                });
                if (error.response.status === 401) {
                    logout();
                } else {
                    return "error";
                }
            }
        });
}

export async function getFundProfileActiveLodge(data) {
    return axios
        .get("/api/module5/getFundProfileActiveLodge", {
            params: {
                DIST_ID: data,
            },
        })
        .then((response) => {
            // console.log('data :' + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                });
                if (error.response.status === 401) {
                    logout();
                } else {
                    return "error";
                }
            }
        });
}

export async function getFundNavValue(data) {
    return axios
        .post("/api/module5/getNavByDraftID", {
            NAV_SUBMIT_TIMESTAMP: data,
        })
        .then((response) => {
            // console.log('data :' + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                });
                if (error.response.status === 401) {
                    logout();
                } else {
                    return "error";
                }
            }
        });
}

export async function getNAVDailyListByTotalFund(data) {
    console.log("my body data", data);
    return axios
        .post("/api/module5/getNAVDailyListByTotalFund", {
            //   params: {
            DIST_ID: data.DIST_ID,
            NAV_SUBMIT_TIMESTAMP: data.NAV_SUBMIT_TIMESTAMP,
            TS_PARAM: data.TS_PARAM,
            //   },
        })
        .then((response) => {
            console.log("data22 :" + JSON.stringify(response.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                });
                if (error.response.status === 401) {
                    logout();
                } else {
                    return "error";
                }
            }
        });
}
export async function getNAVApprovalListByFundItem(data) {
    console.log("my body 55000", data);
    return axios
        .post("/api/module5/getNAVApprovalListByFundItem", {
            //   params: {
            DIST_ID: data.DIST_ID,
            NAV_SUBMIT_TIMESTAMP: data.NAV_SUBMIT_TIMESTAMP,
            TS_PARAM: data.TS_PARAM,
            //   },
        })
        .then((response) => {
            console.log("data22 :" + JSON.stringify(response.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                });
                if (error.response.status === 401) {
                    logout();
                } else {
                    return "error";
                }
            }
        });
}

export async function getFundProfileForManageFM(data) {
    return axios
        .get("/api/module5/fund_profile_manage_FM", {
            params: {
                DIST_ID: data,
            },
        })
        .then((response) => {
            console.log("data :" + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                });
                if (error.response.status === 401) {
                    logout();
                } else {
                    return "error";
                }
            }
        });
}
export async function getDistributorListForFundManage(data) {
    return axios
        .get("/api/module5/getDistributorListForFundManage", {
            params: {
                DistType: data,
            },
        })
        .then((response) => {
            console.log("data :" + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                });
                if (error.response.status === 401) {
                    logout();
                } else {
                    return "error";
                }
            }
        });
}
export async function getFundProfileForManageFIMM(data) {
    return axios
        .get("/api/module5/fund_profile_manage_FIMM", {
            params: {
                DIST_ID: data,
            },
        })
        .then((response) => {
            console.log("data :" + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                });
                if (error.response.status === 401) {
                    logout();
                } else {
                    return "error";
                }
            }
        });
}

export async function getFundProfileForManage(data) {
    return axios
        .get("/api/module5/fund_profile_manage", {
            params: {
                DIST_ID: data,
            },
        })
        .then((response) => {
            console.log("data :" + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                });
                if (error.response.status === 401) {
                    logout();
                } else {
                    return "error";
                }
            }
        });
}

export async function getFundProfileActive(data) {
    return axios
        .get("/api/module5/fund_profile_active", {
            params: {
                DIST_ID: data,
            },
        })
        .then((response) => {
            console.log("data :" + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                });
                if (error.response.status === 401) {
                    logout();
                } else {
                    return "error";
                }
            }
        });
}

export async function getRemark(data) {
    // await servicesModule1.header();
    return axios
        .get("/api/module5/getRemark", {
            params: {
                FUND_PROFILE_ID: data,
            },
        })
        .then((response) => {
            console.log(JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 500) {
                    // console.log(JSON.stringify(error.response.data.message));
                    if (error.response.data.message == "Token expired.") {
                        console.log("logout");
                        //logout();
                    } else {
                        console.log(error.response.data.message);
                    }
                } else if (error.response.status == 401) {
                    //logout();
                }
                return "error";
            }
        });
}

export async function getFundProfileReviewFIMM(data,data2,fund_code_fimm,fund_code_member,fund_name,umbrella_fund_name) {
    return axios
        .get("/api/module5/fund_profile_review_FIMM", {
            params: {
                DIST_ID: data,
                changeViewStatus: data2,
                FUND_CODE_FIMM: fund_code_fimm,
                FUND_CODE_member: fund_code_member,
                FUND_name: fund_name,
                UMBRELLA_FUND_NAME: umbrella_fund_name,
            },
        })
        .then((response) => {
            console.log("data :" + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                });
                if (error.response.status === 401) {
                    logout();
                } else {
                    return "error";
                }
            }
        });
}
export async function fund_profile_review_FIMM_filter(data,data2,fund_code_fimm,fund_code_member,fund_name,umbrella_fund_name) {
  return axios
      .get("/api/module5/fund_profile_review_FIMM_filter", {
          params: {
              DIST_ID: data,
              changeViewStatus: data2,
              FUND_CODE_FIMM: fund_code_fimm,
              FUND_CODE_member: fund_code_member,
              FUND_name: fund_name,
              UMBRELLA_FUND_NAME: umbrella_fund_name,
          },
      })
      .then((response) => {
          console.log("data :" + JSON.stringify(response.data.data));
          return response.data.data;
      })
      .catch(function(error) {
          if (error.response) {
              Vue.$toast.open({
                  message: error.response.data.message,
                  type: "error",
              });
              if (error.response.status === 401) {
                  logout();
              } else {
                  return "error";
              }
          }
      });
}

export async function getFundProfileReview(data) {
    return axios
        .get("/api/module5/fund_profile_review", {
            params: {
                DIST_ID: data,
            },
        })
        .then((response) => {
            console.log("data :" + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                });
                if (error.response.status === 401) {
                    logout();
                } else {
                    return "error";
                }
            }
        });
}

export async function getFundAppDetails(data) {
    return axios
        .get("/api/module5/getFundAppDetails", {
            params: {
                FUND_PROFILE_ID: data,
            },
        })
        .then((response) => {
            console.log("data :" + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                });
                if (error.response.status === 401) {
                    logout();
                } else {
                    return "error";
                }
            }
        });
}
export async function getFundProfileReviewDetails(data) {
    return axios
        .get("/api/module5/fund_profile_review2", {
            params: {
                FUND_PROFILE_ID: data,
            },
        })
        .then((response) => {
            console.log("data :" + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                });
                if (error.response.status === 401) {
                    logout();
                } else {
                    return "error";
                }
            }
        });
}

export async function updateApprovalFundCreation(data) {
    return axios
        .post("/api/module5/fund_creation_approvalFM", data)
        .then((response) => {
            console.log("data :" + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                });
                if (error.response.status == 500) {
                    // console.log(JSON.stringify(error.response.data.message));
                    if (error.response.data.message == "Token expired.") {
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
export async function updateApprovalFundCreationFiMM(data) {
    return axios
        .post("/api/module5/fund_creation_approvalFiMM", data)
        .then((response) => {
            console.log("data :" + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                });
                if (error.response.status == 500) {
                    // console.log(JSON.stringify(error.response.data.message));
                    if (error.response.data.message == "Token expired.") {
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

export async function updateNAVApproval(data) {
    return axios
        .post("/api/module5/updateNAVApproval", data)
        .then((response) => {
            console.log("data :" + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                });
                if (error.response.status == 500) {
                    // console.log(JSON.stringify(error.response.data.message));
                    if (error.response.data.message == "Token expired.") {
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

export async function submitNAV(data) {
    return axios
        .post("/api/module5/submitNAV", data)
        .then((response) => {
            console.log("data :" + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                });
                if (error.response.status == 500) {
                    // console.log(JSON.stringify(error.response.data.message));
                    if (error.response.data.message == "Token expired.") {
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

export async function submitExcel(data) {
    return axios
        .post("/api/module5/submitExcel", data)
        .then((response) => {
            console.log("data :" + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                });
                if (error.response.status == 500) {
                    // console.log(JSON.stringify(error.response.data.message));
                    if (error.response.data.message == "Token expired.") {
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

// fund Update

export async function updateFundProfile(data) {
    return axios
        .post("/api/module5/fund_profile_update", data)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            return response.data;
        })
        .catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 500) {
                    // console.log(JSON.stringify(error.response.data.message));
                    if (error.response.data.message == "Token expired.") {
                        console.log("logout");
                        //logout();
                    } else {
                        console.log(error.response.data.message);
                    }
                } else if (error.response.status == 401) {
                    //logout();
                }
                return "error";
            }
        });
}

// 3.fund lodgement create
export async function createFundLodgement(data) {
    await servicesModule0.header();
    return axios
        .post("/api/module5/fund_lodge_creation", data)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            return response.data;
        })
        .catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 500) {
                    // console.log(JSON.stringify(error.response.data.message));
                    if (error.response.data.message == "Token expired.") {
                        console.log("logout");
                        //logout();
                    } else {
                        console.log(error.response.data.message);
                    }
                } else if (error.response.status == 401) {
                    //logout();
                }
                return "error";
            }
        });
}

export async function submitHoldDisLodge(data) {
    await servicesModule0.header();
    return axios
        .post("/api/module5/submitHoldDisLodge", data)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            return response.data;
        })
        .catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 500) {
                    // console.log(JSON.stringify(error.response.data.message));
                    if (error.response.data.message == "Token expired.") {
                        console.log("logout");
                        //logout();
                    } else {
                        console.log(error.response.data.message);
                    }
                } else if (error.response.status == 401) {
                    //logout();
                }
                return "error";
            }
        });
}
export async function submitHoldLodge(data) {
    await servicesModule0.header();
    return axios
        .post("/api/module5/submitHoldLodge", data)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            return response.data;
        })
        .catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 500) {
                    // console.log(JSON.stringify(error.response.data.message));
                    if (error.response.data.message == "Token expired.") {
                        console.log("logout");
                        //logout();
                    } else {
                        console.log(error.response.data.message);
                    }
                } else if (error.response.status == 401) {
                    //logout();
                }
                return "error";
            }
        });
}

export async function submitRemoveHoldDisLodge(data) {
    await servicesModule0.header();
    return axios
        .post("/api/module5/submitRemoveHoldDisLodge", data)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            return response.data;
        })
        .catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 500) {
                    // console.log(JSON.stringify(error.response.data.message));
                    if (error.response.data.message == "Token expired.") {
                        console.log("logout");
                        //logout();
                    } else {
                        console.log(error.response.data.message);
                    }
                } else if (error.response.status == 401) {
                    //logout();
                }
                return "error";
            }
        });
}

export async function submitRemoveHoldLodge(data) {
    await servicesModule0.header();
    return axios
        .post("/api/module5/submitRemoveHoldLodge", data)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            return response.data;
        })
        .catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 500) {
                    // console.log(JSON.stringify(error.response.data.message));
                    if (error.response.data.message == "Token expired.") {
                        console.log("logout");
                        //logout();
                    } else {
                        console.log(error.response.data.message);
                    }
                } else if (error.response.status == 401) {
                    //logout();
                }
                return "error";
            }
        });
}

export async function getDistributorBasedOnFundHouseSubmit(distType) {
    return axios.get('/api/module5/getDistributorBasedOnFundHouseSubmit', {
            params: { DistType: distType, }
        })
        .then(response => {
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
export async function getDistributorBasedOnFundHouse(distType) {
    return axios
        .get("/api/module5/getDistributorBasedOnFundHouse", {
            params: { DistType: distType },
        })
        .then((response) => {
            console.log("data :" + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                });
                if (error.response.status === 401) {
                    logout();
                } else {
                    return "error";
                }
            }
        });
}
export async function getDistributorBasedOnFundHouseForDislodge(distType) {
    return axios
        .get("/api/module5/getDistributorBasedOnFundHouseForDislodge", {
            params: { DistType: distType },
        })
        .then((response) => {
            console.log("data :" + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                });
                if (error.response.status === 401) {
                    logout();
                } else {
                    return "error";
                }
            }
        });
}
// 4. fund lodgement get data

export async function getAllFundLodgementFIMM(data, data2) {
    return axios.get('/api/module5/getAllFundLodgementFIMM', {
            params: {
                DIST_ID: data,
                changeViewStatus: data2,
            }
        })
        .then(response => {
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
    if (error.response.status === 401) {
        logout();
    } else {
        return "error";
    }
}

export async function getAllFundDislodgement(data) {
    return axios
        .get("/api/module5/getAllFundDislodgement", {
            params: {
                DIST_ID: data,
            },
        })
        .then((response) => {
            console.log("data :" + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                });
                if (error.response.status === 401) {
                    logout();
                } else {
                    return "error";
                }
            }
        });
}
export async function fund_DislodgeHold(data) {
    return axios
        .get("/api/module5/fund_DislodgeHold", {
            params: { DIST_ID: data },
        })
        .then((response) => {
            console.log("data :" + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                });
                if (error.response.status === 401) {
                    logout();
                } else {
                    return "error";
                }
            }
        });
}
export async function fund_lodgeHold(data) {
    return axios
        .get("/api/module5/fund_lodgeHold", {
            params: { DIST_ID: data },
        })
        .then((response) => {
            console.log("data :" + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                });
                if (error.response.status === 401) {
                    logout();
                } else {
                    return "error";
                }
            }
        });
}

export async function getAllFundDislodgementAdmin(data) {
    return axios
        .get("/api/module5/getAllFundDislodgementAdmin", {
            params: { DIST_ID: data },
        })
        .then((response) => {
            console.log("data :" + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                });
                if (error.response.status === 401) {
                    logout();
                } else {
                    return "error";
                }
            }
        });
}
export async function getAllFundLodgement(data) {
    return axios
        .get("/api/module5/fund_lodge", {
            params: { DIST_ID: data },
        })
        .then((response) => {
            console.log("data :" + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                });
                if (error.response.status === 401) {
                    logout();
                } else {
                    return "error";
                }
            }
        });
}

export async function getActiveLodge(data) {
    return axios
        .get("/api/module5/fund_lodgeActive", {
            params: { DIST_ID: data },
        })
        .then((response) => {
            console.log("data :" + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                });
                if (error.response.status === 401) {
                    logout();
                } else {
                    return "error";
                }
            }
        });
}

export async function getFundLodgementList(data) {
    return axios
        .get("/api/module5/getfund_lodgeList", {
            params: { DIST_ID: data },
        })
        .then((response) => {
            console.log("data :" + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                });
                if (error.response.status === 401) {
                    logout();
                } else {
                    return "error";
                }
            }
        });
}


export async function getLodgedFund(data, data2) {
    return axios
        .get("/api/module5/getLodgedFund", {
            params: {
                DIST_ID: data2,
                USER_DIST_ID: data,
            },
        })
        .then((response) => {
            console.log("data :" + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                });
                if (error.response.status === 401) {
                    logout();
                } else {
                    return "error";
                }
            }
        });
}
export async function getFPLodge(data, data2) {
    return axios
        .get("/api/module5/getFPLodge", {
            params: {
                DIST_ID: data,
                USER_DIST_ID: data2,
            },
        })
        .then((response) => {
            console.log("data :" + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                });
                if (error.response.status === 401) {
                    logout();
                } else {
                    return "error";
                }
            }
        });
}

export async function approveFundLodgeDist(data) {
    await servicesModule0.header();
    return axios
        .post("/api/module5/approveFundLodgeDist", data)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            return response.data;
        })
        .catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 500) {
                    // console.log(JSON.stringify(error.response.data.message));
                    if (error.response.data.message == "Token expired.") {
                        console.log("logout");
                        //logout();
                    } else {
                        console.log(error.response.data.message);
                    }
                } else if (error.response.status == 401) {
                    //logout();
                }
                return "error";
            }
        });
}

export async function approvalFundLodgeFimm(data) {
    await servicesModule0.header();
    return axios
        .post("/api/module5/approveFundLodgeFIMM", data)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            return response.data;
        })
        .catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 500) {
                    // console.log(JSON.stringify(error.response.data.message));
                    if (error.response.data.message == "Token expired.") {
                        console.log("logout");
                        //logout();
                    } else {
                        console.log(error.response.data.message);
                    }
                } else if (error.response.status == 401) {
                    //logout();
                }
                return "error";
            }
        });
}

export async function getLodgeFund(data) {
    return axios
        .get("/api/module5/getLodgeFund")
        .then((response) => {
            console.log("data :" + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                });
                if (error.respose.status === 401) {
                    logout();
                } else {
                    return "error";
                }
            }
        });
}

export async function createFundDislodgement(data) {
    await servicesModule0.header();
    return axios
        .post("/api/module5/createFundDislodgement", data)
        .then((response) => {
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                console.log("error : " + error.response);
                if (error.response.status == 500) {
                    if (error.response.data.message == "Token expired.") {
                        console.log("logout");
                        logout();
                    } else {
                        console.log(error.response.data.message);
                    }
                } else if (error.response.status == 401) {
                    logout();
                }
                return "error";
            }
        });
}

export async function approveFundDisLodgeDist(data) {
    await servicesModule0.header();
    return axios
        .post("/api/module5/approveFundDisLodgeDist", data)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            return response.data;
        })
        .catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 500) {
                    // console.log(JSON.stringify(error.response.data.message));
                    if (error.response.data.message == "Token expired.") {
                        console.log("logout");
                        //logout();
                    } else {
                        console.log(error.response.data.message);
                    }
                } else if (error.response.status == 401) {
                    //logout();
                }
                return "error";
            }
        });
}

// 5. fund Application ( Deletion / Suspension / Closure)
export async function createFundApplication(data) {
    await servicesModule0.header();
    return axios
        .post("/api/module5/fund_application_creation", data)
        .then((response) => {
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                console.log("error : " + error.response);
                if (error.response.status == 500) {
                    if (error.response.data.message == "Token expired.") {
                        console.log("logout");
                        logout();
                    } else {
                        console.log(error.response.data.message);
                    }
                } else if (error.response.status == 401) {
                    logout();
                }
                return "error";
            }
        });
}

export async function getSuppDoc(data) {
    return axios
        .get("/api/module5/getSuppDoc", {
            params: {
                FUND_APPL_ID: data,
            },
        })
        .then((response) => {
            console.log("data :" + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                });
                if (error.respose.status === 401) {
                    logout();
                } else {
                    return "error";
                }
            }
        });
}
export async function getRemarkFundApplication(data) {
    return axios
        .get("/api/module5/getRemarkFundApplication", {
            params: {
                APPL_APPR_ID: data,
            },
        })
        .then((response) => {
            console.log("data :" + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                });
                if (error.respose.status === 401) {
                    logout();
                } else {
                    return "error";
                }
            }
        });
}
export async function fund_application_status(data) {
    return axios
        .get("/api/module5/fund_application_status", {
            params: {
                DIST_ID: data,
            },
        })
        .then((response) => {
            console.log("data :" + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                });
                if (error.respose.status === 401) {
                    logout();
                } else {
                    return "error";
                }
            }
        });
}
export async function nav_list() {
    return axios
        .get("/api/module5/getNAVDailyList")
        .then((response) => {
            console.log("datamanishh :" + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                });
                if (error.respose.status === 401) {
                    logout();
                } else {
                    return "error";
                }
            }
        });
}
export async function fund_application_fimm() {
    return axios
        .get("/api/module5/fund_application_fimm")
        .then((response) => {
            console.log("datamanishh :" + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                });
                if (error.respose.status === 401) {
                    logout();
                } else {
                    return "error";
                }
            }
        });
}
export async function getAllFundApplication(data) {
    return axios
        .get("/api/module5/fund_application", {
            params: {
                DIST_ID: data,
            },
        })
        .then((response) => {
            console.log("data :" + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                });
                if (error.response.status === 401) {
                    logout();
                } else {
                    return "error";
                }
            }
        });
}
export async function getAllFundApplicationJoin() {
    console.log("called fund application get method");
    return axios
        .get("/api/module5/fund_application_get")
        .then((response) => {
            console.log(
                "fund application data :" + JSON.stringify(response.data.data)
            );
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                });
                if (error.response.status === 401) {
                    logout();
                } else {
                    return "error";
                }
            }
        });
}
export async function updateApprovalFundApplication(data) {
    return axios
        .post("/api/module5/fund_application_approvalFM", data)
        .then((response) => {
            console.log("data :" + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                });
                if (error.response.status == 500) {
                    // console.log(JSON.stringify(error.response.data.message));
                    if (error.response.data.message == "Token expired.") {
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
export async function updateApprovalFundApplicationFiMM(data) {
    return axios
        .post("/api/module5/fund_application_approvalFiMM", data)
        .then((response) => {
            console.log("data :" + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                });
                if (error.response.status == 500) {
                    // console.log(JSON.stringify(error.response.data.message));
                    if (error.response.data.message == "Token expired.") {
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
// Fund Management
export async function getAllFundTempData() {
    return axios
        .get("/api/module5/fund_temp")
        .then((response) => {
            console.log("data :" + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                });
                if (error.response.status === 401) {
                    logout();
                } else {
                    return "error";
                }
            }
        });
}
export async function fund_tempDataDetail(data) {
    return axios
        .get("/api/module5/fund_tempDataDetail", {
            params: {
                FUND_TEMP_ID: data,
            },
        })
        .then((response) => {
            console.log("data :" + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                });
                if (error.response.status === 401) {
                    logout();
                } else {
                    return "error";
                }
            }
        });
}

export async function submitFundNotesChangeDetails(data) {
    return axios
        .post("/api/module5/submitFundNotesChangeDetails", data)
        .then((response) => {
            console.log("data :" + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                });
                if (error.response.status == 500) {
                    // console.log(JSON.stringify(error.response.data.message));
                    if (error.response.data.message == "Token expired.") {
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
export async function submitFundChangeDetails(data) {
    return axios
        .post("/api/module5/submitFundChangeDetails", data)
        .then((response) => {
            console.log("data :" + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                });
                if (error.response.status == 500) {
                    // console.log(JSON.stringify(error.response.data.message));
                    if (error.response.data.message == "Token expired.") {
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
export async function updateApprovalFundManagementFM(data) {
    return axios
        .post("/api/module5/fund_temp_approval_update", data)
        .then((response) => {
            console.log("data :" + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                });
                if (error.response.status == 500) {
                    // console.log(JSON.stringify(error.response.data.message));
                    if (error.response.data.message == "Token expired.") {
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
export async function updateApprovalFundManagementFIMM(data) {
    return axios
        .post("/api/module5/fund_temp_approval_update_fimm", data)
        .then((response) => {
            console.log("data :" + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                });
                if (error.response.status == 500) {
                    // console.log(JSON.stringify(error.response.data.message));
                    if (error.response.data.message == "Token expired.") {
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

export async function updateApprovalFundManagementFundNotesSecondLevel(data) {
    return axios
        .post("/api/module5/fund_temp_fund_notes_approval_update", data)
        .then((response) => {
            console.log("data :" + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                });
                if (error.response.status == 500) {
                    // console.log(JSON.stringify(error.response.data.message));
                    if (error.response.data.message == "Token expired.") {
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
export async function updateApprovalFundManagementFundNotesFIMM(data) {
    return axios
        .post("/api/module5/fund_temp_fund_notes_approval_update_fimm", data)
        .then((response) => {
            console.log("data :" + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                });
                if (error.response.status == 500) {
                    // console.log(JSON.stringify(error.response.data.message));
                    if (error.response.data.message == "Token expired.") {
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

// 3rd party company registration
export async function getTRPRegData(data) {
    return axios
        .get("/api/module5/getTRPRegData", {
            params: {
                USER_ID: data,
            },
        })
        .then((response) => {
            console.log("data :" + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                });
                if (error.response.status === 401) {
                    logout();
                } else {
                    return "error";
                }
            }
        });
}

export async function getTRPRegDraft(data) {
    return axios
        .get("/api/module5/getTRPRegDraft", {
            params: {
                USER_ID: data,
            },
        })
        .then((response) => {
            console.log("data :" + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                });
                if (error.response.status === 401) {
                    logout();
                } else {
                    return "error";
                }
            }
        });
}

export async function getTRPRegStatus(data) {
    return axios
        .get("/api/module5/getTRPRegStatus", {
            params: {
                USER_ID: data,
            },
        })
        .then((response) => {
            console.log("data :" + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                });
                if (error.response.status === 401) {
                    logout();
                } else {
                    return "error";
                }
            }
        });
}

export async function getTRPRemark(data) {
    return axios
        .get("/api/module5/getTRPRemark", {
            params: {
                TP_USER_COMP_ID: data,
            },
        })
        .then((response) => {
            console.log("data :" + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                });
                if (error.response.status === 401) {
                    logout();
                } else {
                    return "error";
                }
            }
        });
}

export async function createOtherUser(data) {
    return axios
        .post("/api/module5/others_reg", data)
        .then((response) => {
            return response.data;
        })
        .catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 500) {
                    // console.log(JSON.stringify(error.response.data.message));
                    if (error.response.data.message == "Token expired.") {
                        console.log("logout");
                        servicesModule5.logout();
                    } else {
                        console.log(error.response.data.message);
                    }
                } else if (error.response.status == 401) {
                    servicesModule5.logout();
                }
                return "error";
            }
        });
}
export async function createTPUser(data) {
    return axios
        .post("/api/module5/others_reg", data)
        .then((response) => {
            return response.data;
        })
        .catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 500) {
                    // console.log(JSON.stringify(error.response.data.message));
                    if (error.response.data.message == "Token expired.") {
                        console.log("logout");
                        servicesModule5.logout();
                    } else {
                        console.log(error.response.data.message);
                    }
                } else if (error.response.status == 401) {
                    servicesModule5.logout();
                }
                return "error";
            }
        });
}
export async function createTRPProfile(data) {
    return axios
        .post("/api/module5/createTRPProfile", data)
        .then((response) => {
            Vue.$toast.open({
                message: response.data.message,
                type: 'success',
            })
            return response.data;
        })
        .catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 500) {
                    // console.log(JSON.stringify(error.response.data.message));
                    if (error.response.data.message == "Token expired.") {
                        console.log("logout");
                        servicesModule5.logout();
                    } else {
                        console.log(error.response.data.message);
                    }
                } else if (error.response.status == 401) {
                    servicesModule5.logout();
                }
                return "error";
            }
        });
}
export async function getAllTPRegData(params = {}) {
    return axios
        .get("/api/module5/getAllTPCompany", {
            params: {
                filters: params,
            },
        })
        .then((response) => {
            console.log("data :" + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                });
                if (error.response.status === 401) {
                    logout();
                } else {
                    return "error";
                }
            }
        });
}
export async function getTPRegDataUser(data, data2) {
    return axios
        .get("/api/module5/getTPCompanyUser", {
            params: {
                TP_COMP_ID: data,
                USER_ID: data2,
            },
        })
        .then((response) => {
            console.log("data :" + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                });
                if (error.response.status === 401) {
                    logout();
                } else {
                    return "error";
                }
            }
        });
}
export async function createTPCompany(data) {
    return axios
        .post("/api/module5/createTPCompany", data)
        .then((response) => {
            return response.data;
        })
        .catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 500) {
                    // console.log(JSON.stringify(error.response.data.message));
                    if (error.response.data.message == "Token expired.") {
                        console.log("logout");
                        servicesModule5.logout();
                    } else {
                        console.log(error.response.data.message);
                    }
                } else if (error.response.status == 401) {
                    servicesModule5.logout();
                }
                return "error";
            }
        });
}
export async function getThirdPartyCompanyApplicationList() {
    return axios
        .get("/api/module5/getThirdPartyCompanyApplicationList")
        .then((response) => {
            console.log("data :" + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                });
                if (error.response.status === 401) {
                    logout();
                } else {
                    return "error";
                }
            }
        });
}
export async function checkDuplicateUserID(data) {
    return axios
        .get("/api/module5/check_userID", {
            params: {
                USER_USER_ID: data,
            },
        })
        .then((response) => {
            console.log(response.data);
            return response.data;
        })
        .catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status == 500) {
                    // console.log(JSON.stringify(error.response.data.message));
                    if (error.response.data.message == "Token expired.") {
                        console.log("logout");
                        servicesModule5.logout();
                    } else {
                        console.log(error.response.data.message);
                    }
                } else if (error.response.status == 401) {
                    servicesModule5.logout();
                }
                return error.response.data;
            }
        });
}
// NAV Daily Publish

// NAV Daily Update

export async function getNAVApprovalList(data) {
    return axios
        .get("/api/module5/getNAVApprovalList", {
            params: {
                DIST_ID: data,
            },
        })
        .then((response) => {
            console.log("data :" + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                });
                if (error.response.status === 401) {
                    logout();
                } else {
                    return "error";
                }
            }
        });
}

export async function getNAVdata(data) {
    return axios
        .get("/api/module5/getNAVdata")
        .then((response) => {
            console.log("data :" + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                });
                if (error.response.status === 401) {
                    logout();
                } else {
                    return "error";
                }
            }
        });
}

export async function getfilterNAVLIST(data) {
    console.log("my data", data);
    return axios
        .post("/api/module5/getfilterNAVLIST", {
            params: {
                FUND_CODE_FIMM: data.FUND_CODE_FIMM,
                FUND_CODE_MEMBER: data.FUND_CODE_MEMBER,
                FUND_NAME: data.FUND_NAME,
                UMBRELLA_FUND_NAME: data.UMBRELLA_FUND_NAME,
            },
        })
        .then((response) => {
            console.log("data :" + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                });
                if (error.response.status === 401) {
                    logout();
                } else {
                    return "error";
                }
            }
        });
}

// NAV Management
export async function getNAVManageList(data) {
    return axios
        .get("/api/module5/getNAVManageList", {
            params: {
                DIST_ID: data,
            },
        })
        .then((response) => {
            console.log("data :" + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                });
                if (error.response.status === 401) {
                    logout();
                } else {
                    return "error";
                }
            }
        });
}
export async function getNAVManageListFM(data) {
    return axios
        .get("/api/module5/getNAVManageListFM", {
            params: {
                DIST_ID: data,
            },
        })
        .then((response) => {
            console.log("data :" + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                });
                if (error.response.status === 401) {
                    logout();
                } else {
                    return "error";
                }
            }
        });
}
export async function getNAVManageListID(data) {
    return axios
        .get("/api/module5/getNAVManageListID", {
            params: {
                DIST_ID: data,
            },
        })
        .then((response) => {
            console.log("data :" + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                });
                if (error.response.status === 401) {
                    logout();
                } else {
                    return "error";
                }
            }
        });
}
export async function getNAVManageListHODID(data) {
    return axios
        .get("/api/module5/getNAVManageListHODID", {
            params: {
                DIST_ID: data,
            },
        })
        .then((response) => {
            console.log("data :" + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                });
                if (error.response.status === 401) {
                    logout();
                } else {
                    return "error";
                }
            }
        });
}
export async function getForNAVManage(data) {
    return axios
        .get("/api/module5/getForNAVManage", {
            params: {
                DIST_ID: data,
            },
        })
        .then((response) => {
            console.log("data :" + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                });
                if (error.response.status === 401) {
                    logout();
                } else {
                    return "error";
                }
            }
        });
}

export async function getDistributorListSubmitNAVID(data) {
    return axios
        .get("/api/module5/getDistributorListSubmitNAVID", {
            params: {
                DIST_ID: data,
            },
        })
        .then((response) => {
            console.log("data :" + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                });
                if (error.response.status === 401) {
                    logout();
                } else {
                    return "error";
                }
            }
        });
}

export async function getDistributorListSubmitNAVHODID(data) {
    return axios
        .get("/api/module5/getDistributorListSubmitNAVHODID", {
            params: {
                DIST_ID: data,
            },
        })
        .then((response) => {
            console.log("data :" + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                });
                if (error.response.status === 401) {
                    logout();
                } else {
                    return "error";
                }
            }
        });
}

export async function getForNAVManageSubmitData(data) {
    return axios
        .get("/api/module5/getForNAVManageSubmitData", {
            params: {
                NAV_TEMP_BULK_ID: data,
            },
        })
        .then((response) => {
            console.log("data :" + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                });
                if (error.response.status === 401) {
                    logout();
                } else {
                    return "error";
                }
            }
        });
}
export async function getremarksDataNAVManagement(data) {
    return axios
        .get("/api/module5/getremarksDataNAVManagement", {
            params: {
                NAV_TEMP_BULK_ID: data,
            },
        })
        .then((response) => {
            console.log("data :" + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                });
                if (error.response.status === 401) {
                    logout();
                } else {
                    return "error";
                }
            }
        });
}
export async function createNAVManageApplication(data) {
    return axios
        .post("/api/module5/createNAVManageApplication", data)
        .then((response) => {
            console.log("data :" + JSON.stringify(response.data.data));
            Vue.$toast.open({
                message: response.data.message,
                type: 'success',
            });
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                });
                if (error.response.status === 401) {
                    logout();
                } else {
                    return "error";
                }
            }
        });
}
export async function submitTempNavApprovalFM(data) {
    return axios
        .post("/api/module5/submitTempNavApprovalFM", data)
        .then((response) => {
            console.log("data :" + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                });
                if (error.response.status === 401) {
                    logout();
                } else {
                    return "error";
                }
            }
        });
}
export async function submitTempNavApprovalID(data) {
    return axios
        .post("/api/module5/submitTempNavApprovalID", data)
        .then((response) => {
            console.log("data :" + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                });
                if (error.response.status === 401) {
                    logout();
                } else {
                    return "error";
                }
            }
        });
}
export async function submitTempNavApprovalHODID(data) {
    return axios
        .post("/api/module5/submitTempNavApprovalHODID", data)
        .then((response) => {
            console.log("data :" + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                });
                if (error.response.status === 401) {
                    logout();
                } else {
                    return "error";
                }
            }
        });
}
// nav lIST
export async function getNAVList() {
    return axios
        .get("/api/module5/getNAVLIST")
        .then((response) => {
            console.log("data :" + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                });
                if (error.response.status === 401) {
                    logout();
                } else {
                    return "error";
                }
            }
        });
}
export async function getNAVListData() {
    return axios
        .get("/api/module5/getAllNavList")
        .then((response) => {
            console.log("data :" + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                });
                if (error.response.status === 401) {
                    logout();
                } else {
                    return "error";
                }
            }
        });
}
export async function getNAVListForPdf() {
    return axios
        .get("/api/module5/getNavListPdf")
        .then((response) => {
            console.log("data :" + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                });
                if (error.response.status === 401) {
                    logout();
                } else {
                    return "error";
                }
            }
        });
}

// without middleware
export async function getFundProfileFilter(data) {
    return axios
        .get("/api/module5/fundlistMedia", {
            params: {
                DISTRIBUTOR_ID: data,
            },
        })
        .then((response) => {
            console.log("data :" + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                });
                if (error.response.status === 401) {
                    logout();
                } else {
                    return "error";
                }
            }
        });
}

export async function updatePassworduser(data) {
    return axios.post('/api/module5/updatePassword_user', data).then(response => {
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

export async function updateDetailuser(data) {
    return axios.post('/api/module5/updateDetail_user', data).then(response => {
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
export async function getMediaUserDetail(data) {
    return axios
        .get("/api/module5/getMediaUserDetail", {
            params: {
                TP_USER_ID: data,
            },
        })
        .then((response) => {
            console.log("data :" + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                });
                if (error.response.status === 401) {
                    logout();
                } else {
                    return "error";
                }
            }
        });
}

export async function getDistributorDetail(data) {
    return axios
        .get("/api/module5/getDistributorDetail", {
            params: {
                DISTRIBUTOR_ID: data,
            },
        })
        .then((response) => {
            console.log("data :" + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                });
                if (error.response.status === 401) {
                    logout();
                } else {
                    return "error";
                }
            }
        });
}

export async function fundDetailsMedia(data, data2) {
    return axios
        .get("/api/module5/fundDetailsMedia", {
            params: {
                DISTRIBUTOR_ID: data,
                FUND_PROFILE_ID: data2,
            },
        })
        .then((response) => {
            console.log("data :" + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                });
                if (error.response.status === 401) {
                    logout();
                } else {
                    return "error";
                }
            }
        });
}

export async function filterFundDistributorList(data) {
    await servicesModule0.header();
    return axios
        .get("/api/module5/filterFundDistributorList", { params: data })
        .then((response) => {
            console.log("data :" + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
            if (error.response) {
                if (error.response.status == 500) {
                    // console.log(JSON.stringify(error.response.data.message));
                    if (error.response.data.message == "Token expired.") {
                        console.log("logout");
                        logout();
                    } else {
                        console.log(error.response.data.message);
                    }
                } else if (error.response.status == 401) {
                    logout();
                }
                return "error";
            }
        });
}

export async function checkDuplicateISIN(data, FPID) {
    return axios
        .get("/api/module5/checkDuplicateISIN", {
            params: {
                FUND_ISIN: data,
                FUND_PROFILE_ID: FPID,
            },
        })
        .then((response) => {
            console.log(response.data);
            return response.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                });
                if (error.response.status === 401) {
                    logout();
                } else {
                    return "error";
                }
            }
        });
}
export async function checkDuplicateSC(data, FPID) {
    return axios
        .get("/api/module5/checkDuplicateSC", {
            params: {
                FUND_SC_CODE: data,
                FUND_PROFILE_ID: FPID,
            },
        })
        .then((response) => {
            console.log(response.data);
            return response.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                });
                if (error.response.status === 401) {
                    logout();
                } else {
                    return "error";
                }
            }
        });
}
export async function checkDuplicateLipper(data, FPID) {
    return axios
        .get("/api/module5/checkDuplicateLipper", {
            params: {
                FUND_LIPPER: data,
                FUND_PROFILE_ID: FPID,
            },
        })
        .then((response) => {
            console.log(response.data);
            return response.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                });
                if (error.response.status === 401) {
                    logout();
                } else {
                    return "error";
                }
            }
        });
}

export async function checkDuplicateMemberFundCode(data, FPID) {
    return axios
        .get("/api/module5/checkDuplicateMemberFundCode", {
            params: {
                FUND_CODE_MEMBER: data,
                FUND_PROFILE_ID: FPID,
            },
        })
        .then((response) => {
            console.log(response.data);
            return response.data;
        })
        .catch(function(error) {
            if (error.response) {
                Vue.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                });
                if (error.response.status === 401) {
                    logout();
                } else {
                    return "error";
                }
            }
        });
}

export async function getAllunitStructure() {
    return axios
        .get("/api/module5/getUnitsStructure", {
            params: {},
        })
        .then((response) => {
            console.log(" list :" + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
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
export async function getAllinvestmentFocus() {
    return axios
        .get("/api/module5/getInvestmentFocus", {
            params: {},
        })
        .then((response) => {
            console.log(" list :" + JSON.stringify(response.data.data));
            return response.data.data;
        })
        .catch(function(error) {
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


export async function importExcelNavManage(data) {
    return axios.post("/api/module5/importExcelNavManage", data).then(response => {
        Vue.$toast.open({
            message: response.data.message,
            type: 'success',
        });

        return response.data;
    }).catch(function(error) {
        if (error.response) {
            Vue.$toast.open({
                message: error.response.data.message,
                type: 'error',
            });
            if (error.response.status == 401) {
                logout();
            } else {
                return "error"
            }
        }
    });
}

export async function importExcelNavManageUpdate(data) {
    return axios.post("/api/module5/importExcelNavManageUpdate", data).then(response => {
        Vue.$toast.open({
            message: response.data.message,
            type: 'success',
        });

        return response.data;
    }).catch(function(error) {
        if (error.response) {
            Vue.$toast.open({
                message: error.response.data.message,
                type: 'error',
            });
            if (error.response.status == 401) {
                logout();
            } else {
                return "error"
            }
        }
    });
}

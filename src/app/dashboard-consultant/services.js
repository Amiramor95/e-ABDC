//
import axios from 'axios'
import servicesModule from '../module0/services'

//* ******************* Authorization ********************/

export async function getCharts(module,userId){
  await servicesModule.header();
      return axios.get("/api/"+module+"/dashboard", {params: {
        USER_ID: userId,
      }}).then(response => {
      console.log("data :" + JSON.stringify(response.data.data));
      return response.data.data;
  }).catch(function(error) {
      if (error.response) {
        if (error.response.status == 500) {
          if (error.response.data.message == "Token expired.") {
              console.log("logout");
            logout();
          } else {
            console.log(error.response.data.message);
          }
        } else if (error.response.status == 401) {
          logout();
          console.log("logout");
        }
        return "error";
      }
    });
  }



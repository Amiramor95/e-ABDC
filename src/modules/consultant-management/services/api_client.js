import axios from "axios";
const API = axios.create({
  baseURL: "/api/module2",
});

window.API_CONSULTANT = API;

export function get_client() {
  // console.log(API.defaults.data)
  return API;
}

export function update_client() {
  return API;
}

export function add_header() {
  const access_token = localStorage.getItem("access_token");
  const refresh_token = localStorage.getItem("refresh_token");
  const token_data = localStorage.getItem("token_data");
  const PANEL_TRACK = localStorage.getItem("PANEL_TRACK");
  const user_id = localStorage.getItem("user_id");
 // axios.defaults.headers.common.PANELTRACK = JSON.parse(localStorage.getItem('PANEL_TRACK'));
 // axios.defaults.headers.common.UID = JSON.parse(localStorage.getItem('user_id'));
  if (access_token) {
    // console.log("Token exist: ", access_token);
    API.defaults.headers.common["Authorization"] = "Bearer " + access_token;
  }
  if (token_data) {
    API.defaults.data = JSON.parse(token_data);
  }
  if (PANEL_TRACK) {
    API.defaults.headers.common["PANELTRACK"] = PANEL_TRACK;
  }
  if (user_id) {
    API.defaults.headers.common["UID"] = user_id;
  }
  return API;
}

export function remove_header() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("token_data");

  delete API.defaults.headers.common["Authorization"];

  return API;
}

export function update_api_client(data) {
  const access_token = data.access_token;
  const refresh_token = data.refresh_token;
  const panel_track = data.PANEL_TRACK;
  const user_id= data.user_id;

  localStorage.setItem("access_token", access_token);
  localStorage.setItem("refresh_token", refresh_token);
  localStorage.setItem("token_data", JSON.stringify(data));
  localStorage.setItem("PANEL_TRACK", panel_track);
  localStorage.setItem("user_id", user_id);

  API.defaults.data = data;
  API.defaults.headers.common["Authorization"] = "Bearer " + access_token;
  API.defaults.headers.common["UID"] = user_id;
  API.defaults.headers.common["PANELTRACK"] = panel_track;
  return API;
}
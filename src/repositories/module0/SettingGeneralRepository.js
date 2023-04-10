import axios from 'axios';

const base = 'http://localhost:7000/api/module0';

export default {
  getAllStates() {
    return axios.get(`${base}/get_state`);
  },
  getAllCountries() {
    return axios.get(`${base}/get_country`);
  },
};

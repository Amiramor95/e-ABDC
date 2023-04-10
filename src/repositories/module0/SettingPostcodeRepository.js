import axios from 'axios';

const base = 'http://localhost:7000/api/module0';

export default {
  getAllPostcodes() {
    return axios.get(`${base}/setting_postcodes`);
  },
};

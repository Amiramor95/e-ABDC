import axios from 'axios';

const base = 'http://localhost:7000/api/module0';

export default {
  getDistributorType() {
    return axios.get(`${base}/distributor_types`);
  },
};

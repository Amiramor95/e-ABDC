import axios from 'axios';

const base = 'http://localhost:7002/api/module2';

export default {
  getDistributorRecords() {
    return axios.get(`${base}/distributor_records`);
  },
};

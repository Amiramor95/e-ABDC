import axios from 'axios';

const base = 'http://localhost:7000/api/module0';

export default {
  getAllApprovalLevel() {
    return axios.get(`${base}/approval_levels`);
  },
  getDistributor() {
    return axios.get(`${base}/get_distributor`);
  },
};

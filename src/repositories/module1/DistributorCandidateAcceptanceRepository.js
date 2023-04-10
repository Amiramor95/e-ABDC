import axios from 'axios';

const base = 'http://localhost:7001/api/module1';

export default {
  getAllDistributorCandidateAcceptance() {
    return axios.get(`${base}/distributor_candidate_acceptance`);
  },
};

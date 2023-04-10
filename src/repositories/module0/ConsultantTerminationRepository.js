import axios from 'axios';

const base = 'http://localhost:7000/api/module0';

export default {
  getAllConsultantTermination() {
    return axios.get(`${base}/cons_terminates`);
  },
};

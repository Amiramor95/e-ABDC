import axios from 'axios';

const base = 'http://localhost:7000/api/module0';

export default {
  getRequiredDocument() {
    return axios.get(`${base}/required_document`);
  },
};

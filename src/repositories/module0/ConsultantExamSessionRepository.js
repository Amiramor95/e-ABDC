import axios from 'axios';

const base = 'http://localhost:7000/api/module0';

export default {
  getAllConsultantExamSessions() {
    return axios.get(`${base}/cons_exam_sessions`);
  },
};

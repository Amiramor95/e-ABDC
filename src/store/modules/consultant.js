import * as GeneralAPI from "../../modules/consultant-management/services/general";

const state = {
  dev: "Keris",
  general_settings: null,
  applicant_details: null,
};

const mutations = {
  setGeneral(state, general) {
    state.general_settings = general;
  },
  setApplicantParticulars(state, data) {
    state.applicant_details = data;
  },
};

const actions = {
  async setGeneral(state) {
    try {
      const response = await GeneralAPI.get_general_settings();
      state.commit("setGeneral", response.data);
    } catch (error) {
      console.log("Error loading Consultant Management general settings");
    }
  },
};

const getters = {
  getDev: (state) => state.dev,
  getGeneralSettings: (state) => state.general_settings,
  getApplicantDetails: (state) => state.applicant_details,
};

export default {
  state,
  mutations,
  actions,
  getters,
};

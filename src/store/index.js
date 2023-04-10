import Vue from "vue";
import Vuex from "vuex";
import VuexI18n from "vuex-i18n"; // load vuex i18n module
import app from "./modules/app";
import consultant from "./modules/consultant";

import * as getters from "./getters";
import * as service05 from '../app/module7/services05'

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  getters,
  modules: {
    app,
    consultant: consultant,
  },
  // state: {},
  // mutations: {},
  state: {
    userDetail: {},
    totalNotificationController: 0,
    colorTextController: "#FFFFFF",
    colorActiveController: "#4F5E7F",
    colorPassiveController: "#8497B0",
    amsfYear:null
  },
  mutations: {
    change(state, userDetail) {
      state.userDetail = userDetail;
    },
    setTotalNotification(state, totalNotificationController) {
      state.totalNotificationController = totalNotificationController;
    },
    colorText(state, colorTextController) {
      state.colorTextController = colorTextController;
    },
    colorPassive(state, colorPassiveController) {
      state.colorPassiveController = colorPassiveController;
    },
    colorActive(state, colorActiveController) {
      state.colorActiveController = colorActiveController;
    },
    setUser(state, data) {
      state.userDetail = data;
    },
    setAMSFYear(state,data){
      state.amsfYear = data
    }
  },
  getters: {
    userDetail: (state) => state.userDetail,
    palette: (state) => state.colorController,
    paletteActive: (state) => state.colorActiveController,
    palettePassive: (state) => state.colorPassiveController,
    paletteText: (state) => state.colorTextController,
    totalNotification: (state) => state.totalNotificationController,
  },
  actions:{
    getAMSFYearForAnnualFee({commit}){
      service05.getAMSFYearForAnnualFees().then(res => {
          commit('setAMSFYear',res.data.amsfYear)
        });
     }
  }
});

Vue.use(VuexI18n.plugin, store);

export default store;

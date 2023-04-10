<template>
  <div class="card-body">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <h4 slot="header">Login Settings</h4>
      </div>
      <va-card class=" ml-4 col-lg-10 my-1 px-1">
        <h5><i class="fa fa-lock"></i>&nbsp;&nbsp; <b>Login & Security</b></h5>
        <hr />

        <div class="ml-5">
          <div>
            <span>Login Attempt</span>
            <button
              v-if="visibleLogin == false"
              v-b-toggle.collapse-1
              type="button"
              class="float-right  btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <button
              v-if="visibleLogin == true"
              v-b-toggle.collapse-1
              type="button"
              class="float-right  btn-fill btn-md"
            >
              <i class="fa fa-times"></i>
            </button>
            <b-collapse v-model="visibleLogin" class="mt-4" id="collapse-1">
              <b-card>
                <tr>
                  <td colspan="2">
                    <div class="row">
                      <div class="ml-4 col-md-12">
                        <span class="col mt-1 description"
                          >No. Of Invalid Sign-On Allowed</span
                        >
                        <input
                          v-model="model.LOGIN_SETTING_NO"
                          type="text"
                          placeholder="0"
                          @keypress="onlyNumber"
                          class=" float-right col-5 form-control form-control-md"
                          required
                        />
                        <input type ="hidden" v-model ="model.LOGIN_SETTING_ID" />
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colspan="2">
                      <br />
                    <button
                      @click="submit"
                      type="button"
                      class="ml-2 float-left btn btn-primary btn-fill btn-md"
                    >
                      <i class="fa fa-save" />&nbsp; save
                    </button>
                  </td>
                </tr>
              </b-card>
            </b-collapse>
            <hr />
          </div>
          <div>
            <span>System Block Duration</span>
            <button
              v-if="visibleBlockDuration == false"
              v-b-toggle.collapse-2
              type="button"
              class="float-right  btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <button
              v-if="visibleBlockDuration == true"
              v-b-toggle.collapse-2
              type="button"
              class="float-right  btn-fill btn-md"
            >
              <i class="fa fa-times"></i>
            </button>
            <b-collapse
              class="mt-4"
              id="collapse-2"
              v-model="visibleBlockDuration"
            >
              <b-card>
                <tr>
                  <td colspan="2">
                    <div class="row">
                      <div class="ml-4 col-md-12">
                        <span class="col mt-1 description"
                          >Duration (hour)</span
                        >
                        <input
                          v-model="model.SYSTEM_BLOCK_DURATION_DAYS"
                          type="text"
                          placeholder="0"
                           @keypress="onlyNumber"
                          class=" float-right col-7 form-control form-control-md"
                          required
                        />
                         <input type ="hidden" v-model ="model.SYSTEM_BLOCK_DURATION_ID" />
                      </div>

                    </div>
                  </td>
                </tr>
                <tr>
                  <td colspan="2">
                     <br />
                    <button
                    @click="submitDuration"
                      type="button"
                      class="ml-2 float-left btn btn-primary btn-fill btn-md"
                    >
                      <i class="fa fa-save" />&nbsp; save
                    </button>
                  </td>
                </tr>
              </b-card>
            </b-collapse>
            <hr />
          </div>
          <div>
            <span>Idle Session Timeout</span>
            <button
              v-if="visibleSessionTimeout == false"
              v-b-toggle.collapse-3
              type="button"
              class="float-right  btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <button
              v-if="visibleSessionTimeout == true"
              v-b-toggle.collapse-3
              type="button"
              class="float-right  btn-fill btn-md"
            >
              <i class="fa fa-times"></i>
            </button>
            <b-collapse
              id="collapse-3"
              class="mt-4"
              v-model="visibleSessionTimeout"
            >
              <b-card>
                <tr>
                  <td colspan="2">
                    <div class="row">
                      <div class="ml-4 col-md-12">
                        <span class="col mt-1 description"
                          >Duration (minute)</span
                        >
                        <input
                        v-model="model.LOGIN_IDLE_SESSION_MIN"
                          type="text"
                          placeholder="0"
                           @keypress="onlyNumber"
                          class=" float-right col-5 form-control form-control-md"
                          required
                        />
                         <input type ="hidden" v-model ="model.LOGIN_IDLE_SESSION_ID" />
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colspan="2">
                     <br/>
                    <button
                    @click="submitSession"
                      type="button"
                      class="ml-2 float-left btn btn-primary btn-fill btn-md"
                    >
                      <i class="fa fa-save" />&nbsp; save
                    </button>
                  </td>
                </tr>
              </b-card>
            </b-collapse>
            <hr />
          </div>
        </div>
      </va-card>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import Vue from "vue";
import "vue-form-generator/dist/vfg.css";
import Spacing from "../../../components/ui/spacing/Spacing.vue";
import * as services06Module0 from "../../../app/module0/services06";
import * as servicesModule0 from "../../../app/module0/services02";

export default {
  // eslint-disable-next-line vue/no-unused-components
  mounted() {
    this.getLoginSetting();
    this.getLoginDuration();
    this.getLoginSession();
  },

  components: { Spacing },
  watch: {
    selectedMinLength: function(val) {
      if (val == false) {
        this.passwordSetting.MIN_LENGTH = 0;
      }
    },
    selectedMaxLength: function(val) {
      if (val == false) {
        this.passwordSetting.MAX_LENGTH = 0;
      }
    }
  },
  // DATA SCHEMA
  data() {
    return {

      dataToggle: true,
      visibleLogin: false,
      visibleBlockDuration: false,
      visibleSessionTimeout: false,
      LoginList: [],
      DurationList: [],
      SessionList: [],

      model: {
        LOGIN_SETTING_ID: 0,
        LOGIN_SETTING_NO: 0,
        SYSTEM_BLOCK_DURATION_ID: 0,
        SYSTEM_BLOCK_DURATION_DAYS: 0,
        LOGIN_IDLE_SESSION_ID: 0,
        LOGIN_IDLE_SESSION_MIN: 0,
      }
    };
  },
  methods: {
     onlyNumber ($event) {
          let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
          if(keyCode < 48 || keyCode > 57) { // 46 is dot
          $event.preventDefault();
          }
          },
      getLoginSetting: async function () {
      const response = await servicesModule0.getBLoginSettingyById();
      this.LoginList = response;
      this.model.LOGIN_SETTING_NO = response.LOGIN_SETTING_NO;
       this.model.LOGIN_SETTING_ID = response.LOGIN_SETTING_ID;
    },
    async submit() {
      let app = this;
      var param = app.model;
      const data = new FormData();
      data.append("LOGIN_SETTING_NO", this.model.LOGIN_SETTING_NO);
       data.append("LOGIN_SETTING_ID", this.model.LOGIN_SETTING_ID);
      try {
        // eslint-disable-next-line no-unused-vars
       const response = await servicesModule0.createLoginSetting(data);
        this.getLoginSetting();
        // this.$modals.simpleModal.$hide()
      } catch (error) {
        console.log(error);
      }
    },
    getLoginDuration: async function () {
      const response = await servicesModule0.getSystemBlockById();
      this.DurationList = response;
      this.model.SYSTEM_BLOCK_DURATION_ID = response.SYSTEM_BLOCK_DURATION_ID;
      this.model.SYSTEM_BLOCK_DURATION_DAYS = response.SYSTEM_BLOCK_DURATION_DAYS;
    },
    async submitDuration() {
      let app = this;
      var param = app.model;
      const data = new FormData();
      data.append("SYSTEM_BLOCK_DURATION_DAYS", this.model.SYSTEM_BLOCK_DURATION_DAYS);
      data.append("SYSTEM_BLOCK_DURATION_ID", this.model.SYSTEM_BLOCK_DURATION_ID);
      try {
        // eslint-disable-next-line no-unused-vars
        const response = await servicesModule0.createBlockDuration(data);
        this.getLoginDuration();
        // this.$modals.simpleModal.$hide()
      } catch (error) {
        console.log(error);
      }
    },
    getLoginSession: async function () {
      const response = await servicesModule0.getIdleById();
      this.SessionList = response;
      this.model.LOGIN_IDLE_SESSION_MIN = response.LOGIN_IDLE_SESSION_MIN;
      this.model.LOGIN_IDLE_SESSION_ID = response.LOGIN_IDLE_SESSION_ID;
    },
    async submitSession() {
      let app = this;
      var param = app.model;
      const data = new FormData();
      data.append("LOGIN_IDLE_SESSION_MIN", this.model.LOGIN_IDLE_SESSION_MIN);
      data.append("LOGIN_IDLE_SESSION_ID", this.model.LOGIN_IDLE_SESSION_ID);
      try {
        // eslint-disable-next-line no-unused-vars
        const response = await servicesModule0.createIdle(data);
        this.getLoginSession();
        // this.$modals.simpleModal.$hide()
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss">
.app-layout__main {
  background: #e8e8e8;
}
</style>

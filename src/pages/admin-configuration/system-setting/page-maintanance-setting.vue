<template>
  <div class="card-body">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <h4 slot="header">System Settings</h4>
      </div>

      <va-card class=" ml-4 col-lg-10 my-1 px-1">
        <h5>
          <i class="fa fa-cogs"></i>&nbsp;&nbsp;
          <b>Page Maintenance Management</b>
        </h5>
        <hr />
        <div class="ml-5">
          <div>
            <div class="row">
              <div class="col-md-6">
                <span>Setup your page maintenance here</span>
              </div>

              <div class="col">
                <button
                  @click.prevent="settingPageMaintenance"
                  type="button"
                  class="float-right  btn-fill btn-md"
                >
                  <i class="fa fa-edit"></i>
                </button>
              </div>
            </div>
            <b-collapse
              id="collapse-33"
              class="mt-4"
              v-model="visibleUploadFormTemp"
            >
              <b-card> </b-card>
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

export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { Spacing },
  mounted() {
    this.getPasswordSetting();
    this.getUserIdSetting();
  },
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
      passwordSetting: {
        SETTING_PASSWORD_ID: null,
        MIN_LENGTH: 0,
        MAX_LENGTH: 0,
        UPPERCASE_LOWERCASE: false,
        ALPHANUMERIC: false,
        SPECIAL_CHARACTERS: false,
        updatePasswordSetting: false
      },
      selectedMinLength: false,
      selectedMaxLength: false,

      userIdSetting: {
        SETTING_USERID_ID: null,
        MIN_LENGTH: 0,
        MAX_LENGTH: 0,
        UPPERCASE_LOWERCASE: false,
        ALPHANUMERIC: false,
        SPECIAL_CHARACTERS: false,
        updateUseridSetting: false
      },

      dataToggle: true,
      visibleLogin: false,
      visibleUserId: false,
      visibleBlockDuration: false,
      visibleSessionTimeout: false,
      visiblePassCharacter: false,
      visiblePassHistory: false,
      visibleDefaultPass: false,
      visibleDivDepPos: false,
      visibleScreenMgmt: false,
      visibleRolesnMatrix: false,
      visibleScreenMgmtnRole: false,
      visibleConsScreenMgmtnRole: false,
      visible3rdPartyMgmtnRole: false,
      visibleTraiProvMgmtnRole: false,
      visibleLdapActiveDir: false,
      visibleEmailNoty: false,
      visibleSMSNoty: false,
      visibleAddrHere: false,
      visibleCalendar: false,
      visibleRegDep: false,
      visibleLegalnRegAffair: false,
      visibleSupervision: false,
      visibleIndustriDev: false,
      visibleProfDev: false,
      visibleResearchnAnalytic: false,
      visiblelegalnRegAffairs: false,
      visibleUploadFormTemp: false,
      visibleReqDoc: false,
      visibleFinance: false,
      visibleITMgmt: false
    };
  },
  methods: {
    eventManagement() {
      this.$router.push("/fimm/event-list");
    },
    settingPageMaintenance() {
      this.$router.push("/fimm/maintenance-list");
    },
    addRequiredDoc() {
      this.$router.push("/fimm/setting-required-document");
    },
    uploadFormTemplate() {
      this.$router.push("/fimm/template-setting");
    },
    emaiNotification() {
      this.$router.push("/fimm/email-notification");
    },
    ldapConfiguration() {
      this.$router.push("/fimm/ldap-configuration");
    },
    groupManagement() {
      this.$router.push("/fimm/group-management");
    },
    approvalLevel() {
      this.$router.push("/fimm/approval-mainList");
    },
    addressManagement() {
      this.$router.push("/fimm/address-management");
    },
    async setPasswordSetting() {
      const data = new FormData();
      data.append(
        "SETTING_PASSWORD_ID",
        this.passwordSetting.SETTING_PASSWORD_ID
      );
      data.append("MIN_LENGTH", this.passwordSetting.MIN_LENGTH);
      data.append("MAX_LENGTH", this.passwordSetting.MAX_LENGTH);
      data.append(
        "UPPERCASE_LOWERCASE",
        this.passwordSetting.UPPERCASE_LOWERCASE
      );
      data.append("ALPHANUMERIC", this.passwordSetting.ALPHANUMERIC);
      data.append(
        "SPECIAL_CHARACTERS",
        this.passwordSetting.SPECIAL_CHARACTERS
      );

      if (this.passwordSetting.updatePasswordSetting == false) {
        const response = await services06Module0.setPasswordSetting(data);
      } else {
        data.append("_method", "PUT");
        const response = await services06Module0.updatePasswordSetting(data);
        this.$toasts.success("This is my favorite toasts plugin.", {
          // width: "400px",
          // position: "bottom-right",
          // padding: "1rem"
        });
      }
    },

    async setUserIdSetting() {
      const data = new FormData();
      data.append("SETTING_USERID_ID", this.userIdSetting.SETTING_USERID_ID);
      data.append("MIN_LENGTH", this.userIdSetting.MIN_LENGTH);
      data.append("MAX_LENGTH", this.userIdSetting.MAX_LENGTH);
      data.append(
        "UPPERCASE_LOWERCASE",
        this.userIdSetting.UPPERCASE_LOWERCASE
      );
      data.append("ALPHANUMERIC", this.userIdSetting.ALPHANUMERIC);
      data.append("SPECIAL_CHARACTERS", this.userIdSetting.SPECIAL_CHARACTERS);
      if (this.passwordSetting.updateUseridSetting == false) {
        const response = await services06Module0.setUserIdSetting(data);
      } else {
        data.append("_method", "PUT");
        const response = await services06Module0.updateUseridSetting(data);
        this.$toasts.success("This is my favorite toasts plugin.", {
          // width: "400px",
          // position: "bottom-right",
          // padding: "1rem"
        });
      }
    },

    async getUserIdSetting() {
      const response = await services06Module0.getUserIdSetting(1);
      if (response != null) {
        this.userIdSetting = response;
        // alert(JSON.stringify(this.userIdSetting));
        this.userIdSetting.updateUseridSetting = true;
        response.MIN_LENGTH != null
          ? (this.selectedMinLength = true)
          : (this.selectedMinLength = false);
        response.MAX_LENGTH != null
          ? (this.selectedMaxLength = true)
          : (this.selectedMaxLength = false);
      } else {
        this.passwordSetting.updateUseridSetting = false;
      }
    },

    async getPasswordSetting() {
      const response = await services06Module0.getPasswordSetting(1);
      if (response != null) {
        this.passwordSetting = response;
        this.passwordSetting.updatePasswordSetting = true;
        response.MIN_LENGTH != null
          ? (this.selectedMinLength = true)
          : (this.selectedMinLength = false);
        response.MAX_LENGTH != null
          ? (this.selectedMaxLength = true)
          : (this.selectedMaxLength = false);
      } else {
        this.passwordSetting.updatePasswordSetting = false;
      }
    }
  }
};
</script>

<style lang="scss">
.app-layout__main {
  background: #e8e8e8;
}
</style>

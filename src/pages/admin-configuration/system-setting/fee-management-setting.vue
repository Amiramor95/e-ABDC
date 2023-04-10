<template>
  <div class="card-body">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <h4 slot="header">System Settings</h4>
      </div>
      
      <!-- 10 -->
      <va-card class=" ml-4 col-lg-10 my-1 px-1">
        <h5>
          <i class="fa fa-map-o"></i>&nbsp;&nbsp; <b>Fee Management</b>
        </h5>
        <hr />
        <div class="ml-5">
          <div>
            <span>Distributor Fee</span>
            <button
              @click="DistributorFee"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
        </div>
        <div class="ml-5">
          <div>
            <span>Waiver Fee</span>
            <button
              @click="WaiverFee"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
        </div>
        <div class="ml-5">
          <div>
            <span>Consultant Fee</span>
            <button
              @click="ConsultantFee"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
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
    
    DistributorFee() {
      this.$router.push("/fimm/distributor-fee");
    },
    WaiverFee() {
      this.$router.push("/fimm/waiver-fee");
    },
    ConsultantFee() {
      this.$router.push("/fimm/consultant-fee");
    },



    
    

   

    

    
  }
};
</script>

<style lang="scss">
.app-layout__main {
  background: #e8e8e8;
}
</style>

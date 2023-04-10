<template>
  <div class="card-body">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <h4 slot="header">System Settings</h4>
      </div>

      <va-card class=" ml-4 col-lg-10 my-1 px-1">
        <h5><i class="fa fa-lock"></i>&nbsp;&nbsp; <b>User Id</b></h5>
        <hr />

        <div class="ml-5">
          <div>
            <span>User Id Characteristic</span>
            <button
              v-if="visibleUserId == false"
              v-b-toggle.collapse-29
              type="button"
              class="float-right  btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <button
              v-if="visibleUserId == true"
              v-b-toggle.collapse-29
              type="button"
              class="float-right  btn-fill btn-md"
            >
              <i class="fa fa-times"></i>
            </button>
            <b-collapse v-model="visibleUserId" class="mt-4" id="collapse-29">
              <va-card>
                <br />
                <tr>
                  <td colspan="2">
                    <div class="row">
                      <div class="ml-4 col-md-12">
                        <div class="row mb-1">
                          <va-checkbox
                            class="col-2"
                            v-model="selectedMinLength"
                          ></va-checkbox>
                          <span class="col mt-2 description">
                            Minimum User Id Length</span
                          >
                          <input
                            :disabled="this.selectedMinLength == false"
                            v-model="userIdSetting.MIN_LENGTH"
                            type="text"
                            placeholder="0"
                            @keypress="onlyNumber"
                            @change="checkNumber"
                            class="col-2 form-control form-control-md"
                            required
                          />
                        </div>
                        <div class="row mb-1">
                          <va-checkbox
                            class="col-2"
                            v-model="selectedMaxLength"
                          ></va-checkbox>
                          <span class="col mt-2 description">
                            Maximum User Id Length</span
                          >
                          <input
                            :disabled="this.selectedMaxLength == false"
                            v-model="userIdSetting.MAX_LENGTH"
                            type="text"
                            placeholder="0"
                            @keypress="onlyNumber"
                            @change="checkNumber"
                            class="col-2 form-control form-control-md"
                            required
                          />
                        </div>
                        <div class="row mb-1">
                          <va-checkbox
                            class="col-2"
                            v-model="userIdSetting.UPPERCASE_LOWERCASE"
                          ></va-checkbox>
                          <span class="col mt-2 description">
                            Required Uppercase and Lowercase Letters</span
                          >
                        </div>
                        <div class="row mb-1">
                          <va-checkbox
                            class="col-2"
                            v-model="userIdSetting.ALPHANUMERIC"
                          ></va-checkbox>
                          <span class="col mt-2 description">
                            Required Alphanumeric</span
                          >
                        </div>
                        <div class="row mb-1">
                          <va-checkbox
                            class="col-2"
                            v-model="userIdSetting.SPECIAL_CHARACTERS"
                          ></va-checkbox>
                          <span class="col mt-2 description">
                            Required Special Characters " _ "</span
                          >
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colspan="2">
                     <br />
                      <br />
                    <button
                      @click="setUserIdSetting"
                      type="submit"
                      class="ml-2 float-left btn btn-primary btn-fill btn-md"
                    >
                      <i class="fa fa-save" />&nbsp; SAVE
                    </button>
                  </td>
                </tr>
              </va-card>
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
   // this.getPasswordSetting();
    //this.getUserIdSetting();
    this.getAllUserID();
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
      visibleITMgmt: false,

      UserIdList: [],
    };
  },
  methods: {
    onlyNumber ($event) {
          let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
            if(keyCode < 48 || keyCode > 57) { // 46 is dot
          $event.preventDefault();
          }
          },
      checkNumber(){
        let minNumber=this.userIdSetting.MIN_LENGTH;
        let maxNumber=this.userIdSetting.MAX_LENGTH;
        console.log("Min=",this.userIdSetting.MIN_LENGTH);
        console.log("Max=",this.userIdSetting.MAX_LENGTH);
        if(minNumber >= maxNumber)
        {
          alert("Minimum Length Always less than Maximum Length");
           this.userIdSetting.MIN_LENGTH=3;
           this.userIdSetting.MAX_LENGTH=5;
        }
        else{

        }

      },
    eventManagement() {
      this.$router.push("/fimm/event-list");
    },
    settingPageMaintenance() {
      this.$router.push("/fimm/setting-pageMaintenanceList");
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
    distributorapproval() {
      this.$router.push("/fimm/distributor-mainList");
    },
        getAllUserID: async function () {
      const response = await services06Module0.getUserIdtById();
      this.UserIdList = response;
      this.userIdSetting.MIN_LENGTH=response.MIN_LENGTH;
      this.userIdSetting.MAX_LENGTH=response.MAX_LENGTH;
       response.MIN_LENGTH != null
          ? (this.selectedMinLength = true)
          : (this.selectedMinLength = false);
        response.MAX_LENGTH != null
          ? (this.selectedMaxLength = true)
          : (this.selectedMaxLength = false);
      if(response.UPPERCASE_LOWERCASE == 1)
      {
        this.userIdSetting.UPPERCASE_LOWERCASE = true;
      }
      else{
        this.userIdSetting.UPPERCASE_LOWERCASE = false;
      }
      if(response.ALPHANUMERIC == 1)
      {
        this.userIdSetting.ALPHANUMERIC = true;
      }
      else{
        this.userIdSetting.ALPHANUMERIC = false;
      }
      if(response.SPECIAL_CHARACTERS == 1)
      {
        this.userIdSetting.SPECIAL_CHARACTERS = true;
      }
      else{
        this.userIdSetting.SPECIAL_CHARACTERS = false;
      }
     // this.userIdSetting.UPPERCASE_LOWERCASE=response.UPPERCASE_LOWERCASE;
     // this.userIdSetting.ALPHANUMERIC=response.ALPHANUMERIC;
      //this.userIdSetting.SPECIAL_CHARACTERS=response.SPECIAL_CHARACTERS;
      
    },

    async setUserIdSetting() {
        let minNumber=this.userIdSetting.MIN_LENGTH;
        let maxNumber=this.userIdSetting.MAX_LENGTH;
        if(minNumber >= maxNumber)
        {
          alert("Minimum Length Always less than Maximum Length");
           this.userIdSetting.MIN_LENGTH=1;
           this.userIdSetting.MAX_LENGTH=3;
        }
        else{
            const data = new FormData();
            data.append("SETTING_USERID_ID", this.userIdSetting.SETTING_USERID_ID);
            data.append("MIN_LENGTH", this.userIdSetting.MIN_LENGTH);
            data.append("MAX_LENGTH", this.userIdSetting.MAX_LENGTH);
            if(this.userIdSetting.UPPERCASE_LOWERCASE == true)
            {
              data.append("UPPERCASE_LOWERCASE",1);
            }
            else{
             data.append("UPPERCASE_LOWERCASE",0);
            }
            if(this.userIdSetting.ALPHANUMERIC == true)
            {
              data.append("ALPHANUMERIC",1);
            }
            else{
             data.append("ALPHANUMERIC",0);
            }
            if(this.userIdSetting.SPECIAL_CHARACTERS == true)
            {
              data.append("SPECIAL_CHARACTERS",1);
            }
            else{
              data.append("SPECIAL_CHARACTERS",0);
            }

            try {
            console.log(data);
           const response = await services06Module0.setUserIdSetting(data);
            this.getAllUserID();
            // this.$modals.simpleModal.$hide();
            } catch (error) {
            console.log(error);
            }
        }
    },

    async getUserIdSetting() {
      const response = await services06Module0.getUserIdSetting(1);
       console.log("USERID=",response);
      if (response != null) {
        let res = response;
        res.ALPHANUMERIC = true;
        this.userIdSetting = res;
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
  }
};
</script>

<style lang="scss">
.app-layout__main {
  background: #e8e8e8;
}
input[type="checkbox"] {
 background-color: blue;
}

</style>

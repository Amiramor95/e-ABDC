<template>
  <div class="card-body">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <h4 slot="header">System Settings</h4>
      </div>
      
      <!-- 6 -->
      <va-card class=" ml-4 col-lg-10 my-1 px-1">

        <div class="text-center text-danger my-2" v-if="!isDataReady">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </div>
        <div v-else >

          <h5>
            <i class="fa fa-bullhorn"></i>&nbsp;&nbsp;
            <b>Announcement HOD Review Setting</b>
          </h5>
          <hr />
          <div class="ml-5">

            <div v-for="dept in departmentList">
              <div class="row">
                <div class="col-md-6">
                  <span>{{ dept.DPMT_NAME }}</span>
                </div>

                <div class="col">
                <button
                    @click="targetRoute(dept.MANAGE_DEPARTMENT_ID,dept.DPMT_NAME)"
                    type="button"
                    class="float-right btn-fill btn-md"
                  >
                    <i class="fa fa-edit"></i>
                  </button>
                </div>
              </div>
              <b-collapse id="collapse-21" class="mt-4" v-model="visibleRegDep">
                <b-card> </b-card>
              </b-collapse>
              <hr />
            </div>
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
import * as servicesModule0 from "../../../app/module0/services";
import * as servicesModule04 from "../../../app/module0/services04";

export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { Spacing },
  mounted() {
    this.getPasswordSetting();
    this.getUserIdSetting();
    this.getAllDepartment();
  },
  watch: {
    
  },
  // DATA SCHEMA
  data() {
    return {
      // Data for loder
      isDataReady:false,
      departmentList: [],
      IS_ACTIVE: [],

    };
  },
  methods: {

    targetRoute(dpt,name) {
      this.$router.push({
        name: "event-review-list",
        params: { 
          MANAGE_DEPARTMENT_ID: dpt,
          DPMT_NAME : name
        }
      })
    },
    // Toggle Event
    async onToggleChange(dept){
      if (confirm("Are you sure you want to update ?")) {
        const data = new FormData();
        data.append("STATUS",  this.IS_ACTIVE[dept]);
        data.append("DEPT_ID",dept);
        const response = await servicesModule04.setAnnouncementStatus(data);
        //alert(dept);
      }
      this.getAllDepartment();
      
    },

    // Get all Depaartment
    getAllDepartment: async function () {
      this.isDataReady = false; // Kill Loader
      const response = await servicesModule04.getAnnounceDept();
      response.forEach((item) => {
        this.IS_ACTIVE[item.MANAGE_DEPARTMENT_ID] = (item.ANNOUNCEMENT_STATUS == 1) ? true : false;
      });
      this.departmentList = response;
      //this.DepartmentCount = this.departmentList.length;
      this.isDataReady = true; // Kill Loader
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

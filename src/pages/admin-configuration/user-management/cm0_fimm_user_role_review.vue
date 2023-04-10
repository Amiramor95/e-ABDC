<template>
  <div class="content">
    <div class="container-fluid">
      <div class="card-body">
        <div class="row justify-content-center">
          <div class="col-lg-12">
            <va-card
              class="striped-tabled-with-hover"
              body-classes="table-full-width table-responsive"
            >
            <loder v-show="isLoader" />
            <div class="text-center text-danger my-2" v-if="!isDataReady">
              <b-spinner class="align-middle"></b-spinner>
              <strong>Loading...</strong>
            </div>
            <div v-else>

                <h4 slot="header" class="card-title">
                  FIMM User Registration Details
                </h4>

                <br />
                <div>
                  <tabs
                    :tabs="tabs"
                    :currentTab="currentTab"
                    :wrapper-class="'default-tabs'"
                    :tab-class="'default-tabs__item'"
                    :tab-active-class="'default-tabs__item_active'"
                    :line-class="'default-tabs__active-line'"
                    @onClick="handleClick"
                  />
                  <div class="content">
                    <div v-if="currentTab === 'tab1'">
                      <div class="ml-4">
                        <br />
                        <table class="table table-striped">
                          <tbody>
                            <tr>
                              <td style="width:20%">Status</td>
                              <td style="width:2%">:</td>
                              <td ><span style="background-color: yellow;">
                              {{ CURRENT_STATUS }}
                              </span></td>
                            </tr>
                            <tr>
                              <td style="width:20%">Name</td>
                              <td style="width:2%">:</td>
                              <td>{{ USER_DATA.USER_NAME }}</td>
                            </tr>
                            <tr>
                              <td>User Citizen</td>
                              <td>:</td>
                              <td>{{ (USER_DATA.USER_CITIZEN == 1) ? "Malaysian" : "Non-Malaysian" }}</td>
                            </tr>
                            <tr v-if="USER_DATA.USER_CITIZEN == 1">
                              <td>NRIC No</td>
                              <td>:</td>
                              <td>{{ USER_DATA.USER_NRIC }}</td>
                            </tr>
                            <tr v-else>
                              <td>Passport No</td>
                              <td>:</td>
                              <td>{{ USER_DATA.USER_PASS_NUM }}</td>
                            </tr>
                            <tr>
                              <td>Telephone Number</td>
                              <td>:</td>
                              <td>{{ USER_DATA.USER_PHONE }}</td>
                            </tr>
                            <tr>
                              <td>Email</td>
                              <td>:</td>
                              <td>{{ USER_DATA.USER_EMAIL }}</td>
                            </tr>
                            <tr>
                              <td>Address</td>
                              <td>:</td>
                              <td>{{ USER_DATA.COUNTRY_NAME }}</td>
                            </tr>
                            <tr>
                              <td>Address</td>
                              <td>:</td>
                              <td>{{ USER_DATA.USER_ADDR_1 }}</td>
                            </tr>
                            <tr>
                              <td>Postcode</td>
                              <td>:</td>
                              <td>{{ USER_DATA.POSTCODE_NO }}</td>
                            </tr>
                            <tr>
                              <td>City</td>
                              <td>:</td>
                              <td>{{ USER_DATA.POSTCODE_NO }}</td>
                            </tr>
                            <tr>
                              <td>State</td>
                              <td>:</td>
                              <td>{{ USER_DATA.STATE_NAME }}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div v-if="currentTab === 'tab2'">
                      <div class="ml-4">
                        <br />
                        <table class="table table-striped">
                          <tbody>
                            <tr>
                              <td style="width:20%">Division</td>
                              <td style="width:2%">:</td>
                              <td>{{ USER_DATA.DIV_NAME }}</td>
                            </tr>
                            <tr>
                              <td>Department</td>
                              <td>:</td>
                              <td>{{ USER_DATA.DPMT_NAME }}</td>
                            </tr>
                            <tr>
                              <td>Group</td>
                              <td>:</td>
                              <td>{{ USER_DATA.GROUP_NAME }}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div v-if="currentTab === 'tab3'">
                      <div class="ml-4">
                        <br />
                        <table class="table table-striped">
                          <tbody>
                            <tr>
                              <td style="width:20%">Roles</td>
                              <td style="width:2%">:</td>
                              <td>{{ USER_DATA.AUTHORIZATION_LEVEL_NAME}}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

              </div>  
            </va-card>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <div class="card-body">
        <div class="row justify-content-center">
          <div class="col-lg-12">
            <va-card
              class="striped-tabled-with-hover"
              body-classes="table-full-width table-responsive"
            >
              <h4 slot="header" class="card-title">Registration Approval</h4>
              <form>
                <vue-form-generator
                  :model="model"
                  :schema="schema"
                  :options="formOptions"
                  @model-updated="onModelUpdated"
                  ref="statusForm"
                >
                </vue-form-generator>

                <button
                  @click="back"
                  type="submit"
                  class=" ml-3 btn btn-primary btn-fill float-left btn-md"
                >
                  <i class="fa fa-step-backward" /> &nbsp; Back
                </button>
                <div class="float-right">
                  <button
                    @click="submit('return')"
                    type="button"
                    class="mr-2 btn btn-warning btn-fill btn-md"
                  >
                    <i class="fa fa-reply" /> &nbsp; Return
                  </button>
                  <button
                    @click="submit('approve')"
                    type="button"
                    class="btn btn-success btn-fill btn-md"
                  >
                    <i class="fa fa-paper-plane" /> &nbsp; Approve
                  </button>
                </div>
              </form>
            </va-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import "vue-form-generator/dist/vfg.css";
import Tabs from "vue-tabs-with-active-line";
import * as servicesModule04 from "../../../app/module0/services04";
import loder from "../../request_loader";
const TABS = [
  {
    title: "User Profile",
    value: "tab1"
  },
  {
    title: "Division & Department",
    value: "tab2"
  },

  {
    title: "Roles",
    value: "tab3"
  }
];
export default {
  components: {
    Tabs,loder
  },

  mounted() {
    this.getUserManagementData();
  },

  data() {
    return {
      isDataReady:false,
      isLoader : false,

      tabs: TABS,
      currentTab: "tab1",
      CURRENT_STATUS:"",
      USER_DATA : {
        USER_ID:"",
        MANAGE_GROUP_ID:"",
        USER_NAME:"",
        USER_NRIC:"",
        USER_PASS_NUM:"",
        USER_PHONE:"",
        USER_EMAIL:"",
        USER_ADDR_1:"",
        POSTCODE_NO:"",
        COUNTRY_NAME:"",
        DIV_NAME:"",
        DPMT_NAME:"",
        GROUP_NAME:"",
        STATE_NAME:"",
      },
      model:{
        APPR_REMARK:"",
      },

      //FORM
      schema: {
        fields: [
          {
            type: "textArea",
            label: "Remark",
            model: "APPR_REMARK",
            hint: "Max 500 characters",
            max: 500,
            rows: 4,
            required: true,
            validator: "string"
          }
        ]
      },

      formOptions: {
        validateAfterLoad: false,
        validateAfterChanged: true,
        validateAsync: true
      }
    };
  },

  methods: {

    back() {
      this.$router.go(-1);
    }, // back button
    validatestatusForm() {
      return this.$refs.statusForm.validate();
    },
    return: async function() {

    },

    getUserManagementData: async function () {
      var userId = this.$route.params.USER_ID; 
      const response = await servicesModule04.getUserById(userId);
      this.USER_DATA = response;
      this.CURRENT_STATUS = this.getStatus(response.USER_STATUS);
      this.isDataReady = true; // loader Kill
    },
    
    submit: async function(type) {
      this.isLoader = true; // loader
      const data = new FormData();
      data.append("USER_ID", this.USER_DATA.USER_ID);
      const user = localStorage.getItem("user");
      data.append("APPR_ID",JSON.parse(user).user_id);
      data.append("USER_GROUP", this.USER_DATA.MANAGE_GROUP_ID);
      data.append("APPR_REMARK", this.model.APPR_REMARK);
      if(type == 'approve'){
        data.append("APPR_STATUS", 2);
      }else{
        data.append("APPR_STATUS", 3);
      }
      try {
        // eslint-disable-next-line no-unused-vars
        const response = await servicesModule04.saveUserApprove(data);
        if(response != 'error'){
          this.back();
        }
        
        this.isLoader = false; // Kill Loder
      } catch (error) {
        //console.log(error);
      }
    },

    getStatus(type){
      if(type == 0){
        return "Inactive";
      }else if(type == 1){
        return "Pending For Approval";
      }else if(type == 2){
        return "Approved";
      }else if(type == 3){
        return "Returned";
      }else{
        return "";
      }
    },

    handleClick(newTab) {
      this.currentTab = newTab;
    }, // end tab
    onModelUpdated(newVal, schema) {
      console.log(schema);
      if (schema == "document") {
        console.log(newVal.replace("C:\\fakepath\\", ""));
        this.model.document = newVal.replace("C:\\fakepath\\", "");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.default-tabs {
  position: relative;
  margin: 0 auto;
  &__item {
    display: inline-block;
    margin: 0 5px;
    padding: 10px;
    padding-bottom: 8px;
    font-size: 16px;
    letter-spacing: 0.8px;
    color: gray;
    text-decoration: none;
    border: none;
    background-color: transparent;
    border-bottom: 2px solid transparent;
    cursor: pointer;
    transition: all 0.25s;
    &_active {
      color: black;
    }
    &:hover {
      border-bottom: 2px solid gray;
      color: black;
    }
    &:focus {
      outline: none;
      border-bottom: 2px solid gray;
      color: black;
    }
    &:first-child {
      margin-left: 20px;
    }
    &:last-child {
      margin-right: 0;
    }
  }
  &__active-line {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    background-color: black;
    transition: transform 0.4s ease, width 0.4s ease;
  }
}
</style>

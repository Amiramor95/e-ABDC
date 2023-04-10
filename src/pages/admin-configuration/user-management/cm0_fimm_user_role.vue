<template>
<div>
    <loder v-show="isLoader" />
    <div class="container-fluid">
        <div class="card-body">
          <div class="row justify-content-center">
            <div class="col-lg-12">
              <va-card  class="striped-tabled-with-hover" 
              body-classes="table-full-width table-responsive">
              <div class="text-center text-danger my-2" v-if="!isDataReady">
                <b-spinner class="align-middle"></b-spinner>
                <strong>Loading...</strong>
              </div>
              <div v-else>

                    <h4 slot="header" class="card-title">User Role Application </h4>
                    <br>
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
                      <div class="">
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
                                    <td>{{USER_FAST_NAME + ' ' + USER_LAST_NAME}}</td>
                                  </tr>
                                  <tr>
                                    <td>Email</td>
                                    <td>:</td>
                                    <td>
                                      {{model.EMAIL}}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Citizen</td>
                                    <td>:</td>
                                    <td>
                                      <vue-form-generator
                                      :model="model"
                                      :schema="schemaCitizen"
                                      :options="formOptions"
                                      ref="nricForm" 
                                      @model-updated="changeField"
                                      >
                                      </vue-form-generator>
                                    </td>
                                  </tr>
                                  <tr v-if="showNrc">
                                    <td>NRIC No</td>
                                    <td>:</td>
                                    <td>
                                      <vue-form-generator
                                      :model="model"
                                      :schema="schemaNric"
                                      :options="formOptions"
                                      ref="nricForm" 
                                      >
                                      </vue-form-generator>
                                    </td>
                                  </tr>
                                  <tr v-if="showPass">
                                      <td>Passport No</td>
                                      <td>:</td>
                                      <td>
                                        <vue-form-generator
                                        :model="model"
                                        :schema="schemaPassport"
                                        :options="formOptions"
                                        ref="nricForm" 
                                        >
                                        </vue-form-generator>
                                      </td>
                                  </tr>
                                  <tr>
                                    <td>Telephone Number</td>
                                    <td>:</td>
                                    <td>
                                      <vue-form-generator
                                      :model="model"
                                      :schema="schemaPhone"
                                      :options="formOptions"
                                      ref="nricForm" 
                                      >
                                      </vue-form-generator>
                                    </td>
                                  </tr>
                                  
                                  <tr>
                                    <td>Country</td>
                                    <td>:</td>
                                    <td>
                                      <vue-form-generator
                                      :model="model"
                                      :schema="schemaCountry"
                                      :options="formOptions"
                                      ref="nricForm" 
                                      @model-updated="getState"
                                      >
                                      </vue-form-generator>
                                    </td>
                                  </tr>

                                  <tr>
                                    <td>State</td>
                                    <td>:</td>
                                    <td>
                                      <vue-form-generator
                                      :model="model"
                                      :schema="schemaState"
                                      :options="formOptions"
                                      @model-updated="getCity"
                                      ref="nricForm" 
                                      >
                                      </vue-form-generator>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>City</td>
                                    <td>:</td>
                                    <td>
                                      <vue-form-generator
                                      :model="model"
                                      :schema="schemaCity"
                                      :options="formOptions"
                                      @model-updated="getPostalcode"
                                      ref="nricForm" 
                                      >
                                      </vue-form-generator>
                                    </td>
                                  </tr>
                                  <tr> 
                                    <td>Postcode</td>
                                    <td>:</td>
                                    <td>
                                      <vue-form-generator
                                      :model="model"
                                      :schema="schemaPostcode"
                                      :options="formOptions"
                                      ref="nricForm" 
                                      >
                                      </vue-form-generator>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Address</td>
                                    <td>:</td>
                                    <td>
                                      <vue-form-generator
                                      :model="model"
                                      :schema="schemaAddress"
                                      :options="formOptions"
                                      ref="address" 
                                      >
                                      </vue-form-generator>
                                    </td>
                                  </tr>
                                  
                                </tbody>
                              </table>

                          </div>
                        </div>
                      </div>
                      </br></br>
                      <hr>
                      <div class="">
                          <h4 slot="header" class="card-title">Roles Submission</h4></div>
                            <vue-form-generator
                              :model="model"
                              :schema="schema"
                              :options="formOptions"
                              @model-updated="onModelUpdated"
                              ref="statusForm" >
                            </vue-form-generator>
                            <br>

                              
                            <div class="float-right">
                              <button  @click="submit"  type="button"  class="ml-2 btn btn-primary btn-fill btn-md">
                              <i class="fa fa-paper-plane" /> &nbsp; Submit
                              </button>
                            </div>

                  </div>
                </div>  
                </va-card>
            </div>
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
import * as servicesModule02 from "../../../app/module0/services02";
import * as services06Module0 from "../../../app/module0/services06";
import loder from "../../request_loader";
import userRoleDetails from "./cm0_fimm_user_role_details";
const TABS = [{
  title: 'User Profile',
  value: 'tab1',
}

];
export default {
  components: {Tabs,loder,userRoleDetails },

    mounted() {
        this.getAuthorizationLevel();
        this.getCountrys();
        //this.getState();
        //this.getCity();
        //this.getPostalcode();
        this.getDivision();
        //this.getDepartment();
        //this.getGroup();
        this.getUserManagementData();
    },
  

   data() {
    return {
      isDataReady:false,
      isLoader : false,

      tabs: TABS,
      currentTab: 'tab1',
      rolesType:[],
      countryList:[],
      stateList:[],
      cityList:[],
      postalcodeList:[],
      divisionList:[],
      departmentList:[],
      groupList:[],
      citizenList:[
        {ID: 1, NAME: 'Malaysian'},
        {ID: 0, NAME: 'Non Malaysian'}
      ],
      showPass:false,
      showNrc:false,

    model:{
      CITIZEN:"",
      ROLE:"",
      DIV_ID:"",
      DEPT_ID:"",
      GROUP_ID:"",
      NRIC_NUMBER:"",
      PASSPORT_NUMBER:"",
      PHONE_NUMBER:"",
      EMAIL:"",
      ADDRESS:"",
      COUNTRY:"",
      POSTCODE:"",
      CITY:"",
      STATE:"",
      USER_ID:"",
    },
    CURRENT_STATUS:'',
    USER_FAST_NAME:'',
    USER_LAST_NAME:'',
    isFirst:"",
    //FORM
     schema: {
        fields: [
          {
            type: "vueMultiSelect",
            model: "DIV_ID",
            label: "Division",
            placeholder: "Select Division",
            required: true,
            validator: "required",
            selectOptions: {
              multiple: false,
              key: "MANAGE_DIVISION_ID",
              label: "DIV_NAME",
              searchable: true
            },
            values: (model, schema) => {return this.divisionList;},
            styleClasses: "col-md-6"
          },
          {
            type: "vueMultiSelect",
            model: "DEPT_ID",
            label: "Department",
            placeholder: "Select Department",
            required: true,
            validator: "required",
            selectOptions: {
              multiple: false,
              key: "MANAGE_DEPARTMENT_ID",
              label: "DPMT_NAME",
              searchable: true
            },
            disabled: (model, schema) => {
              if (this.model.DIV_ID) {
                return false;
              } else {
                return true;
              }
            },
            values: (model, schema) => {return this.departmentList;},
            styleClasses: "col-md-6"
          },
          {
            type: "vueMultiSelect",
            model: "GROUP_ID",
            label: "Group",
            placeholder: "Select Group",
            required: true,
            validator: "required",
            selectOptions: {
              multiple: false,
              key: "MANAGE_GROUP_ID",
              label: "GROUP_NAME",
              searchable: true
            },
            disabled: (model, schema) => {
              if (this.model.DEPT_ID) {
                return false;
              } else {
                return true;
              }
            },
            values: (model, schema) => {return this.groupList;},
            styleClasses: "col-md-6"
          },
          {
            type: "vueMultiSelect",
            model: "ROLE",
            label: "Roles",
            placeholder: "Select Role",
            required: true,
            validator: "required",
            selectOptions: {
              multiple: false,
              key: "AUTHORIZATION_LEVEL_ID",
              label: "AUTHORIZATION_LEVEL_NAME",
              searchable: true
            },
            values: (model, schema) => {return this.rolesType;},
            styleClasses: "col-md-6"
          },

        ]
      },

      schemaNric: {
        fields: [
          {
            type: "input",
            inputType: "text",
            model: "NRIC_NUMBER",
            placeholder: "Enter NRIC",
            styleClasses: "col-md-6",
            required: true,
            validator: ["required"],
          },

        ]
      },
      schemaCitizen: {
        fields: [
          {
            type: "vueMultiSelect",
            model: "CITIZEN",
            placeholder: "Enter Citizen",
            required: true,
            validator: "required",
            selectOptions: {
              multiple: false,
              key: "ID",
              label: "NAME",
              searchable: true
            },
            values: (model, schema) => {return this.citizenList;},
            styleClasses: "col-md-6"
          },

        ]
      },
      schemaPassport: {
        fields: [
          {
            type: "input",
            inputType: "text",
            model: "PASSPORT_NUMBER",
            placeholder: "Enter Passport",
            styleClasses: "col-md-6",
            required: true,
            validator: ["required"],
          },

        ]
      },
      schemaPhone: {
        fields: [
          {
            type: "input",
            inputType: "text",
            model: "PHONE_NUMBER",
            placeholder: "Enter Phone",
            styleClasses: "col-md-6",
            required: true,
            validator: ["required"],
          },

        ]
      },
      schemaEmail: {
        fields: [
          {
            type: "input",
            inputType: "text",
            model: "EMAIL",
            placeholder: "Enter Email",
            styleClasses: "col-md-6",
            required: true,
            validator: ["required"],
          },

        ]
      },
      schemaAddress: {
        fields: [
          {
            type: "input",
            inputType: "text",
            model: "ADDRESS",
            placeholder: "Enter Address",
            styleClasses: "col-md-6",
            required: true,
            validator: ["required"],
          },

        ]
      },
      schemaCountry: {
        fields: [
          {
            type: "vueMultiSelect",
            model: "COUNTRY",
            placeholder: "Enter Country",
            required: true,
            validator: "required",
            selectOptions: {
              multiple: false,
              key: "SETTING_GENERAL_ID",
              label: "SET_PARAM",
              searchable: true
            },
            values: (model, schema) => {return this.countryList;},
            styleClasses: "col-md-6"
          },

        ]
      },
      schemaPostcode: {
        fields: [
          {
            type: "vueMultiSelect",
            model: "POSTCODE",
            placeholder: "Select Postcode",
            required: true,
            validator: "required",
            selectOptions: {
              multiple: false,
              key: "SETTING_POSTCODE_ID",
              label: "POSTCODE_NO",
              searchable: true
            },
            disabled: (model, schema) => {
              if (this.model.CITY) {
                return false;
              } else {
                return true;
              }
            }, 
            values: (model, schema) => {return this.postalcodeList;},
            styleClasses: "col-md-6"
          },
        ]
      },
      schemaCity: {
        fields: [
          {
            type: "vueMultiSelect",
            model: "CITY",
            placeholder: "Select City",
            required: true,
            validator: "required",
            selectOptions: {
                    multiple: false,
                    key: "SETTING_CITY_ID",
                    label: "SET_CITY_NAME",
                    searchable: true
                },
            disabled: (model, schema) => {
              if (this.model.STATE) {
                return false;
              } else {
                return true;
              }
            },    
            values: (model, schema) => {return this.cityList;},
            styleClasses: "col-md-6"
          },
        ]
      },
      schemaState: {
        fields: [
          {
            type: "vueMultiSelect",
            model: "STATE",
            placeholder: "Select State",
            required: true,
            validator: "required",
            selectOptions: {
                multiple: false,
                key: "SETTING_GENERAL_ID",
                label: "SET_STATE",
                searchable: true
            },
            disabled: (model, schema) => {
              if (this.model.COUNTRY) {
                return false;
              } else {
                return true;
              }
            },
            values: (model, schema) => {return this.stateList;},
            styleClasses: "col-md-6"
          },
        ]
      },

      formOptions: {
          validateAfterLoad: false,
          validateAfterChanged: true,
          validateAsync: true
      },
    }
  },

  methods: {
        saveAsDraft(){},
        validatestatusForm()
        {
            return this.$refs.statusForm.validate();
        },

        submit:async function(){ 
          this.isLoader = true; // Loader
          const data = new FormData();
          data.append("USER_ID", this.model.USER_ID);
          data.append("ROLE", this.model.ROLE.AUTHORIZATION_LEVEL_ID);
          data.append("CITIZEN", this.model.CITIZEN.ID);
          data.append("DIV_ID", this.model.DIV_ID.MANAGE_DIVISION_ID);
          data.append("DEPT_ID", this.model.DEPT_ID.MANAGE_DEPARTMENT_ID);
          data.append("GROUP_ID", this.model.GROUP_ID.MANAGE_GROUP_ID);
          data.append("NRIC_NUMBER", this.model.NRIC_NUMBER);
          data.append("PASSPORT_NUMBER", this.model.PASSPORT_NUMBER);
          data.append("PHONE_NUMBER", this.model.PHONE_NUMBER);
          data.append("EMAIL", this.model.EMAIL);
          data.append("ADDRESS", this.model.ADDRESS);
          data.append("COUNTRY", this.model.COUNTRY.SETTING_GENERAL_ID);
          data.append("POSTCODE", this.model.POSTCODE.SETTING_POSTCODE_ID);
          data.append("CITY", this.model.CITY.SETTING_CITY_ID);
          data.append("STATE", this.model.STATE.SETTING_GENERAL_ID);
          var dept = this.model.DEPT_ID.MANAGE_DEPARTMENT_ID;
          const approvalLevel = await this.getApprovalLevel(dept);
          data.append("APPR_LIST", JSON.stringify(approvalLevel));
          data.append("NOTI_LOCATION", "user-management-list/"+ dept);
      	  data.append("NOTI_REMARK","(USER ROLE APPROVAL) New Entry for HOD approval");
          try {
            // eslint-disable-next-line no-unused-vars
            const response= await servicesModule04.userManageRoleSubmit(data);
            this.isLoader = false; // Kill Loder
          } catch (error) {
            //console.log(error);
          }
        },

        getApprovalLevel(dept){
          if(dept == 1){
            return services06Module0.getApprovalLevel(83,1);
          }else if(dept == 2){
            return services06Module0.getApprovalLevel(85,1);
          }else if(dept == 3){
            return services06Module0.getApprovalLevel(84,1);
          }else if(dept == 4){
            return services06Module0.getApprovalLevel(86,1);
          }else if(dept == 5){
            return services06Module0.getApprovalLevel(87,1);
          }else if(dept == 6){
            return services06Module0.getApprovalLevel(88,1);
          }else if(dept == 7){
            return services06Module0.getApprovalLevel(89,1);
          }else if(dept == 8){
            return services06Module0.getApprovalLevel(90,1);
          }else{
            return [];
          }
        },

        handleClick(newTab) {
          this.currentTab = newTab;
        },// end tab
        onModelUpdated(newVal, schema) {
          this.isLoader = true; // Loader
          if (schema == "DIV_ID") {
              this.getDepartment(newVal.MANAGE_DIVISION_ID);
          }
          if(schema == "DEPT_ID"){
            this.getGroup(newVal.MANAGE_DEPARTMENT_ID);
          }
          this.isLoader = false; // Kill Loader
        },
        changeField(newVal, schema){
          if(newVal.ID == 1){
            this.showNrc  = true;
            this.showPass = false;
          }else{
            this.showPass = true;
            this.showNrc  = false;
          };
        },
        getAuthorizationLevel: async function () {
            const response = await servicesModule04.getAuthorizationLevel(); 
            this.rolesType = response;
            
        },
        getCountrys: async function () {
            const response = await servicesModule02.getAllCountryList(); 
            this.countryList = response;
        },
        getState: async function () { 
          this.isLoader = true; // Loader
          this.stateList = []; 
          var val = this.model.COUNTRY.SET_PARAM;  
            const response = await servicesModule02.getAllStateList(); 
            var screenData = response;
            screenData.forEach((item) => {
              if(item.SET_COUNTRY === val){ 
                this.stateList.push(item);
              }
            });
            this.isLoader = false; // Loader
        },
        getCity: async function (){ 
          this.isLoader = true; // Loader
            this.cityList = []; 
            var val = this.model.STATE.SETTING_GENERAL_ID; 
            const response = await servicesModule04.getAllCity(); 
            var screenData = response;
            screenData.forEach((item) => {
              if(item.SETTING_GENERAL_ID === val){ 
                this.cityList.push(item);
              }
            });
            this.isLoader = false; // Loader
        },
        getPostalcode: async function () { 
          this.isLoader = true; // Loader
            this.postalcodeList = [];
            var val = this.model.CITY.SETTING_GENERAL_ID;
            const response = await servicesModule04.getAllPostcode(); 
            var screenData = response;
            screenData.forEach((item) => {
              if(item.SETTING_CITY_ID === val){ 
                this.postalcodeList.push(item);
              }
            });
            this.isLoader = false; // Loader
        },
        getDivision: async function () {
          const response = await servicesModule04.getAllDivisionList();
          this.divisionList = response;
          //this.searchDivisionList = response;
        },
        getDepartment: async function (DIV_ID) {
          const response = await servicesModule04.getDepartmentByDivisionId(DIV_ID);
          this.departmentList = response;
        },
        getGroup: async function (DEPT_ID) {
          const response = await servicesModule04.getGroupByDepartmentId(DEPT_ID);
          this.groupList = response;
        },
        getUserManagementData: async function () {
          //  User 
          const data = new FormData();
          const user = localStorage.getItem("user");
          data.append("USER_ID",JSON.parse(user).user_id);
          data.append("USER_EMAIL",JSON.parse(user).email);
          data.append("KEYCLOAK",JSON.parse(user).keycloak_id);
          this.model.USER_ID = JSON.parse(user).user_id;
          const response = await servicesModule04.getUserManagementData(data);
          if(response.userInfo.USER_ISLOGIN == 0 || response.userInfo.USER_STATUS == 3){
            this.USER_FAST_NAME = response.userData.FIRST_NAME;
            this.USER_LAST_NAME = response.userData.LAST_NAME;
            this.model.EMAIL = response.userData.EMAIL;
            this.CURRENT_STATUS = this.getStatus(response.userInfo.USER_STATUS);
          }else{
            this.$router.push({
              name: 'user-management-details',
              params: { USER_ID : this.model.USER_ID },
            })
          }
          this.isDataReady = true; // Kill Loader
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
        
    }
}

</script>


<style lang="scss" scoped>
.card-title{
  color:black;
}
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

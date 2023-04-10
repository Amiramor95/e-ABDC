 <template>
  <div class="card-body">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <h4 slot="header">Dashboard Settings</h4>
      </div>
      <!-- 10 -->
     <!-- <loder v-show="isLoader" />
     <div class="text-center text-danger my-2 align-center" v-if="!isDataReady">
      <b-spinner class="align-middle"></b-spinner>
      <strong>Loading...</strong>
    </div> -->
      <va-card class=" ml-4 col-lg-10 my-1 px-1">
        <h5>
          <i class="va-icon app-sidebar-link__item-icon vuestic-iconset vuestic-iconset-dashboard"></i>&nbsp;&nbsp; <b>CAS Dashboard Setting</b>
        </h5>
        <hr />
        <div class="ml-5">
             <form @submit.prevent="submit"  id="distid">
               <vue-form-generator
              :model="model"
              :schema="Tab1ConfigSchema"
              :options="formOptions"
              @model-updated="onConfigUpdated"
              ref="Tab3Form"
            >
            </vue-form-generator>
             <div class="float-right1">
              <button
              @click ="searchRecord"
               :disabled=isDisable1
              type="button" 
              class="ml-2 btn btn-primary btn-fill btn-md">
              <i class="fa fa-save" /> &nbsp; Search
              </button>
              </div>
            <br/>
            <br/>
            <table class="va-table">
                <thead>
                <tr>
                <th>No. </th>
                <th>Name</th>
                <th>Description</th>
                <th>Display Type</th>
                <th>Active</th>
                <th>Index</th>
                <!-- <th>Size</th> -->
                </tr>
                </thead>
                <tbody>
                <tr v-for="(distributorSetting, k) in distributorSettingList" :key="k">
                <td class="displaye_size_small">{{ k+1 }}</td>
                <td class="displaye_size_small">{{ distributorSetting.DASHBOARD_LIST }}</td>
                <td class="displaye_size_big">{{ distributorSetting.DASHBOARD_DESCRIPTION }}</td>
                <td class="displaye_size_big">
                  <div v-if="typeof distributorSetting.setting_setup === 'object'">
                  <select name="SETTING_CHART_ID" v-model='distributorSetting.setting_setup["SETTING_CHART_ID"]' :id="k" class="form-control control chart_box">
                  <option v-for="chart in chartlist" v-bind:value="chart.CHART_ID" :key="chart.CHART_ID">
                  {{ chart.CHART_NAME }}
                  </option>
                  </select>
                  </div>
                  </td>
                <td class="displaye_size" v-if="typeof distributorSetting.setting_setup === 'object'"><input type="checkbox" true-value="1" false-value="0" :id="k"   v-model='distributorSetting.setting_setup["SETTING_STATUS"]'  @click='checkStatus($event,k,distributorSetting.setting_setup["DISPLAY_SETTING_ID"])' class="index_box"></td>
                <td class="displaye_size" v-if="typeof distributorSetting.setting_setup === 'object'"> <input type="text"  name="SETTING_INDEX"  v-model='distributorSetting.setting_setup["SETTING_INDEX"]' @keypress="onlyNumber" :id="k"   @change='checkNumber(distributorSetting.setting_setup["SETTING_INDEX"],k)'  class="index_box"/>
                <input type="hidden"  name="DASHBOARD_MAIN_ID"  v-model="distributorSetting.DASHBOARD_MAIN_ID" :id="k" />
                     <input type="hidden"  name="DISPLAY_SETTING_ID"  v-model='distributorSetting.setting_setup["DISPLAY_SETTING_ID"]' :id="k" />
                      <input type="hidden"  name="SETTING_USER_ID"  v-model='distributorSetting.setting_setup["SETTING_USER_ID"]' :id="k" />
                       <input type="hidden"  name="SETTING_CHART_ID1"  v-model='distributorSetting.setting_setup["DISPLAY_SETTING_STYLE"]' :id="k" />
                </td>
                <!-- <td class="displaye_size_small">Small</td> -->
                    <!-- <td class="displaye_size_medium" v-if="typeof distributorSetting.setting_setup === 'object'">
                      <select name="SETTING_CHART_ID1" v-model='distributorSetting.setting_setup["DISPLAY_SETTING_STYLE"]' :id="k" class="form-control control chart_box">
                  <option v-for="disarray in Display_Array" v-bind:value="disarray.name" :key="disarray.name">
                  {{ disarray.name }}
                  </option>
                  </select>
                                  </td> -->
                </tr>
                </tbody>

        <!-- <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.country }}</td>
            <td>
              <va-badge :color="getStatusColor(user.status)">
                {{ user.status }}
              </va-badge>
            </td>
          </tr>
        </tbody> -->
      </table>
      <br>
       <button
          @click="back"
          type="button"
          class="btn btn-primary btn-fill btn-md"
        >
          <i class="fa fa-step-backward" /> &nbsp; Previous
        </button>
        <div class="float-right">
        <button
        type="submit"
        :disabled=isDisable
        class="ml-2 btn btn-primary btn-fill btn-md">
        <i class="fa fa-save" /> &nbsp; Save
        </button>
    </div>
      </form>
        </div>
      </va-card>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import Vue from "vue";
import "vue-form-generator/dist/vfg.css";
import Spacing from "../../../../components/ui/spacing/Spacing.vue";
import * as servicesModule0 from "../../../../app/module0/services02"
import * as services06Module1 from "../../../../app/module1/services06";
import * as servicesModule04 from "../../../../app/module0/services04";
import loder from "../../../request_loader";
import jQuery from "jquery";

export default {
  // eslint-disable-next-line vue/no-unused-components
    mounted() {
        this.userdata = JSON.parse(localStorage.getItem("user"));
         this.getAllChart();
        this.getCASSetting();
        this.getDivision();
        this.getDepartment();
        this.getGroup();
    },
  components: { Spacing,loder },
  computed: {
     filteredDataDistributor() {
      if (!this.term || this.term.length < 1) {
        return this.distributorSettingList;
      }
     }
  },
  // DATA SCHEMA
  data() {
    return {
        term:null,
        isDataReady: false,
        isDisable: false,
        isDisable1: false,
        isLoader: false,
        userdata: {},
        chartlist: [],
        SETTING_CHART_ID :'',
        divisionList: [],
        departmentList: [],
        authorizationList: [],
        groupList: [],
        Display_Array: [
        {name: "Weekly", selected: true },
        {name: "Monthly", selected: false },
        {name: "Yearly", selected: false },
        ],
        model:{
          divisionSelection:"",
          departmentSelection: "",
          groupSelection: "",
          authorizationSelection: "",
        },
        distributorSettingList: [
                  {
                    SETTING_CHART_ID: 1,
                    SETTING_STATUS: 0,
                    SETTING_INDEX: 0,
                    DASHBOARD_MAIN_ID: 0,
                    DISPLAY_SETTING_ID: 0,
                    DISPLAY_SETTING_STYLE: 'Daily',
                    SETTING_USER_ID: 0,
                    SETTING_USER_TYPE: '',
                  }
                ],
      Tab1ConfigSchema: {
        groups: [
          {
            styleClasses: "row mt-2",
            fields: [
              {
                type: "vueMultiSelect",
                model: "divisionSelection",
                label: "Division Name",
                required: true,
                placeholder: "Select Division",
                selectOptions: {
                  multiple: false,
                  key: "MANAGE_DIVISION_ID",
                  label: "DIV_NAME",
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.divisionList;
                },
                styleClasses: "col-md-6",
                required: true,
                validator: "required",
              },
              {
                type: "vueMultiSelect",
                model: "departmentSelection",
                label: "Department Name",
                disabled: (model, schema) => {
                  if (this.model.divisionSelection) {
                    return false;
                  } else {
                    return true;
                  }
                },
                required: true,
                placeholder: "Select Department",
                selectOptions: {
                  multiple: false,
                  key: "MANAGE_DEPARTMENT_ID",
                  label: "DPMT_NAME",
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.departmentList;
                },
                styleClasses: "col-md-6",
                required: true,
                validator: "required",
              },
            ],
          },
          {
            styleClasses: "row mt-2",
            fields: [
              {
                type: "vueMultiSelect",
                model: "groupSelection",
                label: "Group Name",
                required: true,
                disabled: (model, schema) => {
                  if (this.model.departmentSelection) {
                    return false;
                    

                  } else {
                    return true;
                  }
                },
                placeholder: "Select Group",
                selectOptions: {
                  multiple: false,
                  key: "MANAGE_GROUP_ID",
                  label: "GROUP_NAME",
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.groupList;
                },
                styleClasses: "col-md-6",
                required: true,
                validator: "required",
              },
              // {
              //   type: "vueMultiSelect",
              //   model: "authorizationSelection",
              //   label: "User Role",
              //   required: true,
              //   placeholder: "Select Authorization Level",
              //   selectOptions: {
              //     multiple: false,
              //     key: "AUTHORIZATION_LEVEL_ID",
              //     label: "AUTHORIZATION_LEVEL_NAME",
              //     searchable: true,
              //   },
              //   disabled: (model, schema) => {
              //     if (this.model.groupSelection) {
              //       return false;
              //     } else {
              //       return true;
              //     }
              //   },
              //   values: (model, schema) => {
              //     return this.authorizationList;
              //   },
              //   styleClasses: "col-md-6",
              //   required: true,
              //   validator: "required",
              // },
            ],
          },
        ],
      },

       formOptions: {
        validateAfterChanged: true,
      },
    };
  },
  methods: {
    back() {
    this.$router.push("/fimm/consultant-alert-main-setting");
    },
     onConfigUpdated: async function (newVal, schema) {
      this.isLoader = true; // Loder
      console.log("scheme=",schema)
      if (schema == "divisionSelection" || schema == "editAccess.divisionSelection" && newVal) {
        // this.model.departmentSelection = "";
        // this.model.groupSelection = "";
        // this.model.authorizationSelection = "";
        this.departmentList = [];
    
        var DIVISION_ID = '';
        (newVal == null) ? DIVISION_ID = "" : DIVISION_ID = newVal.MANAGE_DIVISION_ID;
        const response = await servicesModule04.getDepartmentByDivisionId(DIVISION_ID);
        this.departmentList = response;
        this.getDepartment();
        this.getCASSetting();
        //this.isDisable1 = true;

      } else if (schema == "departmentSelection" || schema == "editAccess.departmentSelection" && newVal) {
        this.groupList = [];

        var DEPARTMENT_ID = '';
        (newVal == null) ? DEPARTMENT_ID = "" : DEPARTMENT_ID = newVal.MANAGE_DEPARTMENT_ID;
        const response = await servicesModule04.getGroupByDepartmentId(DEPARTMENT_ID);
        this.groupList = response;
        //this.getGroup();
         this.getCASSetting();
      } else  if(schema == "groupSelection"){
         this.getCASSetting();

      }
      else {
         
      }
      if(newVal && schema == "ALL_ACCESS" || schema == "editAccess.ALL_ACCESS"){
          this.screenList = [];
          this.screenListCount = this.screenList.length;
          this.screenListSave = [];
          this.screenListSaveCount = this.screenList.length;
      }
      this.isLoader = false; // Kill Loder
    },
     getDivision: async function () {
      const response = await servicesModule04.getAllDivisionList();
      this.divisionList = response;
      this.searchDivisionList = response;
       this.isDisable = true;
      // alert(this.divisionList)
    },
     getDepartment: async function () {
      const response = await servicesModule04.getDepartmentByDivisionId(
        this.model.divisionSelection.MANAGE_DIVISION_ID
      );
      this.departmentList = response;
       this.isDisable = true;
    },
    getGroup: async function () {
      const response = await servicesModule04.getGroupByDepartmentId(
        this.model.departmentSelection.MANAGE_DEPARTMENT_ID
      );
      this.groupList = response;
       this.isDisable = true;
    },
     getAuthorizationLevel: async function () {
        this.isDisable = true;
      const response = await servicesModule04.getAuthorizationLevel(); 
      this.authorizationList = response;
    },
    async checkStatus(event, k,id){

      if(event.target.checked) {
       let checklist = this.distributorSettingList.filter( (distributorSetting) => distributorSetting.setting_setup['SETTING_STATUS']== 1);
       // console.log("Checklist1=",this.distributorSettingList);
        let totalcheck= checklist.length;
        console.log("Checklist=",checklist);
        console.log("total=",totalcheck);
        if (totalcheck <= 5) {
            this.isDisable = false;
        }
        else{
            this.isDisable = true;
            // alert("You cannot Check More Than 6");
                Vue.$toast.open({
                message: "You cannot Check More Than 6",
                type: 'error',
                });
        }
      } else {
         console.log("ID=",id);
         if(id != '')
         {
         const response = await servicesModule0.deleteCasDashboardSetting(id);
          this.getCASSetting();
         }
         // this.distributorSettingList[k].SETTING_STATUS=0;
          this.distributorSettingList[k].setting_setup["SETTING_STATUS"]=0;
          let unchecklist = this.distributorSettingList.filter( (distributorSetting) => distributorSetting.setting_setup['SETTING_STATUS'] == 1);
          let totaluncheck= unchecklist.length;

           console.log("UnChecklist=",unchecklist);
           console.log("UnTotal=",totaluncheck);
          if (totaluncheck <= 6) {
            this.isDisable = false;
        }
        else{
            this.isDisable = true;
              Vue.$toast.open({
                message: "You cannot Check More Than 6",
                type: 'error',
                });
        }
      }

    },
     onlyNumber ($event) {
          let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
          if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) { // 46 is dot
          $event.preventDefault();
          }
      },
      checkNumber(indexnumber,k){
          console.log("indexnumber=",indexnumber);
          console.log("k=", this.distributorSettingList);
          if(indexnumber<=6)
          {
            this.isDisable = false;
          }
          else{
             Vue.$toast.open({
                          message: "You cannot Enter More Than 6",
                          type: 'error',
                          });
           // alert("You cannot Enter More Than 6");
            this.isDisable = true;
            //this.distributorSettingList[k].SETTING_INDEX=0;
            this.distributorSettingList[k].setting_setup["SETTING_INDEX"]=0;
          }
     },
    getCASSetting: async function() {
       // console.log("UserTYPE=",this.userdata.user_type);
        const userID=this.userdata.user_id;
        const userTYPE=this.userdata.user_type;
        const accessuserGROUP=this.model.groupSelection.MANAGE_GROUP_ID;
        const accessuserDivision= this.model.divisionSelection.MANAGE_DIVISION_ID;
        const accessuserDepartment=this.model.departmentSelection.MANAGE_DEPARTMENT_ID;
        const accessuserRole=this.model.authorizationSelection.AUTHORIZATION_LEVEL_ID;
          if(typeof accessuserDivision != 'undefined' && typeof accessuserDepartment != 'undefined' && typeof accessuserGROUP != 'undefined')
          {
        const response = await servicesModule0.getCASSettingList(userID,userTYPE,accessuserDivision,accessuserDepartment,accessuserGROUP);
        console.log("CAS REsponse=",response);
      
        this.distributorSettingList = response;
         let checklist = this.distributorSettingList.filter( (distributorSetting) => distributorSetting.setting_setup['SETTING_STATUS'] == 1);
        let chklength = checklist.length;
        console.log("chklength111=",chklength);
        if(chklength < 6)
        {
          this.isDisable = false;
        }
        else
        {
          // this.isDisable = true;
        }
        this.isDataReady = true;
       console.log("Distributor List=",this.distributorSettingList);
        }
    },
     getAllChart: async function() {
        const response = await servicesModule0.getChartList();
        this.chartlist = response;
        console.log("Chart List=",response);
    },
    async searchRecord(){
    var f3 = this.$refs.Tab3Form.validate();
    if(f3){
        const userID=this.userdata.user_id;
        const userTYPE=this.userdata.user_type;
        const userGROUP=this.userdata.USER_GROUP_ID;
        const accessuserGROUP=this.model.groupSelection.MANAGE_GROUP_ID;
        const accessuserDivision= this.model.divisionSelection.MANAGE_DIVISION_ID;
        const accessuserDepartment=this.model.departmentSelection.MANAGE_DEPARTMENT_ID;
       // const accessuserRole=this.model.authorizationSelection.AUTHORIZATION_LEVEL_ID;
        const response = await servicesModule0.getCASSettingList(userID,userTYPE,userGROUP,accessuserDivision,accessuserDepartment,accessuserGROUP);
        console.log("CAS REsponse=",response);
        this.distributorSettingList = response;
         let checklist = this.distributorSettingList.filter( (distributorSetting) => distributorSetting.setting_setup['SETTING_STATUS'] == 1);
        let chklength = checklist.length;
        console.log("chklength111=",chklength);
        if(chklength < 6)
        {
          this.isDisable = false;
        }
        else
        {
          // this.isDisable = true;
        }
        this.isDataReady = true;
       console.log("Distributor List=",this.distributorSettingList);
    //this.isDisable = true;
    }
    else
    {
       alert("Please Check All");
    }
  },
   async submit() {
      var f3 = this.$refs.Tab3Form.validate();
      if(f3){
      const userID=this.userdata.user_id;
      const userTYPE=this.userdata.user_type;
       const accessuserGROUP=this.model.groupSelection.MANAGE_GROUP_ID;
      const accessuserDivision= this.model.divisionSelection.MANAGE_DIVISION_ID;
      const accessuserDepartment=this.model.departmentSelection.MANAGE_DEPARTMENT_ID;
      let checklist = this.distributorSettingList.filter( (distributorSetting) => distributorSetting.setting_setup['SETTING_STATUS'] == 1);
      let allCheckedSetting = checklist.length;
      console.log("formContents=",checklist);
      let proceedSave = true;
      checklist.forEach(element => {
         //console.log("element=",element.setting_setup.DISPLAY_SETTING_STYLE);
        if(element.setting_setup.SETTING_CHART_ID == null || element.setting_setup.SETTING_INDEX == null){
          proceedSave = false;
          return;
        }
      });
      if (!proceedSave){
        Vue.$toast.open({
          message: "Fields can not be empty!",
          type: 'error',
        });
        return;
      }
       if(allCheckedSetting == 0)
      {
         proceedSave = false;
         Vue.$toast.open({
          message: "Fields can not be empty!",
          type: 'error',
        });
        return;
      }
      console.log("userID=",userID);
      console.log("allCheckedSetting=",allCheckedSetting);
      if(allCheckedSetting <=6)
      {
        try {
              // eslint-disable-next-line no-unused-vars
            const response = await servicesModule0.createCasDashboardSetting(checklist,userID,userTYPE,accessuserDivision,accessuserDepartment,accessuserGROUP);
            this.getCASSetting();

                  Vue.$toast.open({
                            message: "Data successfully updated.",
                            type: 'success',
                            });
                            this.getCASSetting();
          } catch (error) {
            console.log(error);
                Vue.$toast.open({
                message: "Choose Data",
                type: 'error',
            });
          }
        }
        else{
          Vue.$toast.open({
            message: "You cannot Check More Than 6",
            type: 'error',
          });
        }
      }
      else
      {
            Vue.$toast.open({
            message: "Please Select Division, Department, Group and User Role",
            type: 'error',
            });
      } 
   },
  }
};
</script>

<style lang="scss">
.app-layout__main {
  background: #e8e8e8;
}
.va-table{
    width: 100%;
}
.text-center{
text-align: center !important;
}
.align-center{
justify-content: center;
}
.chart_box{
  width: 70%;
}
.index_box{
  width: 50%;
  height: 30px;
  text-align: center;
}
.displaye_size{
  width: 7%;
 // text-align: center;
}
.displaye_size_medium{
  width: 12%;
  text-align: center;
}
.displaye_size_big{
  width: 20%;
  text-align: left;
}
.displaye_size_small{
  width: 6%;
}
/* Absolute Center Spinner */
.loading {
  position: fixed;
  z-index: 999;
  height: 2em;
  width: 2em;
  overflow: show;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

/* Transparent Overlay */
.loading:before {
  content: '';
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
    background: radial-gradient(rgba(20, 20, 20,.8), rgba(0, 0, 0, .8));

  background: -webkit-radial-gradient(rgba(20, 20, 20,.8), rgba(0, 0, 0,.8));
}

/* :not(:required) hides these rules from IE9 and below */
.loading:not(:required) {
  /* hide "loading..." text */
  font: 0/0 a;
  color: transparent;
  text-shadow: none;
  background-color: transparent;
  border: 0;
}

.loading:not(:required):after {
  content: '';
  display: block;
  font-size: 10px;
  width: 1em;
  height: 1em;
  margin-top: -0.5em;
  -webkit-animation: spinner 150ms infinite linear;
  -moz-animation: spinner 150ms infinite linear;
  -ms-animation: spinner 150ms infinite linear;
  -o-animation: spinner 150ms infinite linear;
  animation: spinner 150ms infinite linear;
  border-radius: 0.5em;
  -webkit-box-shadow: rgba(255,255,255, 0.75) 1.5em 0 0 0, rgba(255,255,255, 0.75) 1.1em 1.1em 0 0, rgba(255,255,255, 0.75) 0 1.5em 0 0, rgba(255,255,255, 0.75) -1.1em 1.1em 0 0, rgba(255,255,255, 0.75) -1.5em 0 0 0, rgba(255,255,255, 0.75) -1.1em -1.1em 0 0, rgba(255,255,255, 0.75) 0 -1.5em 0 0, rgba(255,255,255, 0.75) 1.1em -1.1em 0 0;
box-shadow: rgba(255,255,255, 0.75) 1.5em 0 0 0, rgba(255,255,255, 0.75) 1.1em 1.1em 0 0, rgba(255,255,255, 0.75) 0 1.5em 0 0, rgba(255,255,255, 0.75) -1.1em 1.1em 0 0, rgba(255,255,255, 0.75) -1.5em 0 0 0, rgba(255,255,255, 0.75) -1.1em -1.1em 0 0, rgba(255,255,255, 0.75) 0 -1.5em 0 0, rgba(255,255,255, 0.75) 1.1em -1.1em 0 0;
}

/* Animation */

@-webkit-keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@-moz-keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@-o-keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
.avoid-clicks {
  pointer-events: none;
}
.float-right1{
float: right !important;
margin-top: 40px !important;
margin-bottom: 20px;
}
</style>

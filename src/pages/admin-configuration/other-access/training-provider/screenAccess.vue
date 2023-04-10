/* eslint-disable no-unused-expressions */
<template>
  <va-card>
    <loder v-show="isLoader" />
    <!-- authorization -->
    <vudal name="simpleModalEditAuthPage" class="widthModal">
      <loder v-show="isLoader" />
      <div class="header">
        Edit Screen<i class="close icon">&times;</i>
      </div>
      <div class=" ">
        <!-- <br />
        <vue-form-generator
          :model="model"
          :schema="editTab1SelectStaff"
          :options="formOptions"
          ref="editStaffForm"
        >
        </vue-form-generator>
        <br /> -->
        <vue-form-generator
          :model="model"
          :schema="editTab1Schema"
          :options="formOptions"
          @model-updated="onModuleData"
          ref="EditTab1Form"
        >
        </vue-form-generator>
        <br />
        <!-- list -->
        <va-card class="mt-2">
          <va-data-table
            :datacount="screenListCount"
            :dataperpage="parseInt(perPage)"
            :fields="moduleFields"
            :data="moduleFilteredData"
            no-data-label="No data found"
            :per-page="parseInt(perPage)"
            clickable
          >
            <template slot="no" slot-scope="row">
              {{ row.rowIndex + 1 }}
            </template>

            <template slot="actions" slot-scope="props">
              <input 
                  type="checkbox" 
                  v-model="props.rowData.selected" 
                  @change="checkScreen($event,props.rowData)"
                >
            </template>
          </va-data-table>
        </va-card>
        <br />
        <va-card class="mt-2">
          <va-data-table
            :datacount="screenListSaveCount"
            :dataperpage="parseInt(perPage)"
            :fields="moduleFields"
            :data="screenListSave"
            no-data-label="No data found"
            :per-page="parseInt(perPage)"
            clickable
          >
            <template slot="no" slot-scope="row">
              {{ row.rowIndex + 1 }}
            </template>

            <template slot="actions" slot-scope="props">
              <input 
                  type="checkbox" 
                  v-model="props.rowData.selected" 
                >
            </template>
          </va-data-table>
        </va-card>
        <br />
        <vue-form-generator
          :model="model"
          :schema="editTab2Schema"
          :options="formOptions"
          
          ref="editTab2Form"
        >
        </vue-form-generator>
        <br /><br />

      </div>
      <div class="actions">
        <button
          type="button"
          class="cancel vudal-btn mr-2 btn btn-danger btn-fill btn-md"
        >
          <i class="fa fa-times" /> &nbsp; Close
        </button>
        <button
          @click="updateAuthPageAPI"
          type="button"
          class="cancel vudal-btn mr-2 btn btn-primary btn-fill btn-md"
        >
          <i class="fa fa-edit" /> &nbsp; Update
        </button>
      </div>
    </vudal>
    <!-- group -->

    <vudal name="viewScreen" class="widthModal">
      <div class="header">
        View Screen<i class="close icon">&times;</i>
      </div>
      <div class=" ">
        <br />
        <table class="table">
          <tbody>
            <tr>
              <td scope="col" class="font-weight-bold">Group: </td>
              <td scope="col">{{ model.editScreen.TP_MANAGE_GROUP_ID.TP_MANAGE_GROUP_NAME }}</td>
            </tr>
            <tr>
              <td scope="col" class="font-weight-bold">Authorization: </td>
              <td scope="col">{{ model.editScreen.TP_AUTHORISATION_ID.AUTHORIZATION_LEVEL_NAME }}</td>
            </tr>
          </tbody>
        </table>
        <br />
        <!-- list -->
        <va-card class="mt-2 avoid-clicks">
          <va-data-table
            :datacount="screenListSaveCount"
            :dataperpage="parseInt(perPage)"
            :fields="viewmoduleFields"
            :data="screenListSave"
            no-data-label="No data found"
            :per-page="parseInt(perPage)"
            clickable
          >
            <template slot="no" slot-scope="row">
              {{ row.rowIndex + 1 }}
            </template>

            <template slot="actions" slot-scope="props">
              <va-checkbox
                @change="checkBox"
                class="col-2"
                v-model="props.rowData.selected"
              />
            </template>
          </va-data-table>
        </va-card>
        <br />

      </div>
      <div class="actions">
        <button
          type="button"
          class="cancel vudal-btn mr-2 btn btn-danger btn-fill btn-md"
        >
          <i class="fa fa-times" /> &nbsp; Close
        </button>
      </div>
    </vudal>

    <div class="text-center text-danger my-2" v-if="!isDataReady">
        <b-spinner class="align-middle"></b-spinner>
        <strong>Loading...</strong>
    </div>
    <div v-else>

      <h4 slot="header" class="card-title">Screen Access</h4>
      <div class="">
        <br />
        <tabs
          :tabs="tabs"
          :currentTab="currentTab"
          :wrapper-class="'default-tabs'"
          :tab-class="'default-tabs__item'"
          :tab-active-class="'default-tabs__item_active'"
          :line-class="'default-tabs__active-line'"
          @onClick="handleClick"
        />

        <div v-if="currentTab === 'tab1'">
          <!-- <br />
          <vue-form-generator
            :model="model"
            :schema="Tab1SelectStaff"
            :options="formOptions"
            ref="staffForm"
          >
          </vue-form-generator>
          <br /> -->
          <vue-form-generator
            :model="model"
            :schema="Tab1Schema"
            :options="formOptions"
            @model-updated="onModuleData"
            ref="Tab1Form"
          >
          </vue-form-generator>
          <br />
          <!-- list -->
          <va-card class="mt-2">
            <va-data-table
              :datacount="screenListCount"
              :dataperpage="parseInt(perPage)"
              :fields="moduleFields"
              :data="moduleFilteredData"
              no-data-label="No data found"
              :per-page="parseInt(perPage)"
              clickable
            >
              <template slot="no" slot-scope="row">
                {{ row.rowIndex + 1 }}
              </template>

              <template slot="actions" slot-scope="props">
                <input 
                  type="checkbox" 
                  v-model="props.rowData.selected" 
                  @change="checkScreen($event,props.rowData)"
                >
              </template>
            </va-data-table>
          </va-card>
          <br />
          <va-card class="mt-2">
            <va-data-table
              :datacount="screenListSaveCount"
              :dataperpage="parseInt(perPage)"
              :fields="moduleFields"
              :data="screenListSave"
              no-data-label="No data found"
              :per-page="parseInt(perPage)"
              clickable
            >
              <template slot="no" slot-scope="row">
                {{ row.rowIndex + 1 }}
              </template>

              <template slot="actions" slot-scope="props">
                <input 
                  type="checkbox" 
                  v-model="props.rowData.selected" 
                >
              </template>
            </va-data-table>
          </va-card>
          <br />
          
          <vue-form-generator
            :model="model"
            :schema="Tab2Schema"
            :options="formOptions"
            
            ref="Tab2Form"
          >
          </vue-form-generator>
          <br /><br />
          <button
              @click="back"
              type="button"
              class="btn btn-primary btn-fill btn-md"
          >
              <i class="fa fa-step-backward" /> &nbsp; Previous
          </button>
          <button
            type="submit"
            @click.prevent="submit"
            class="ml-2 btn btn-primary btn-fill float-right btn-md"
          >
            &nbsp; Submit
          </button>
        </div>
        <div v-if="currentTab === 'tab2'">
          <br />
          <vue-form-generator
            :model="model"
            
            :options="formOptions"
      
            ref="AuthTab2Form"
          >
          </vue-form-generator>
          <va-card class="mt-2">
            <va-data-table
              :datacount="screenAccessListCount"
              :dataperpage="parseInt(perPage)"
              :fields="groupAuthorizationSchema"
              :data="groupAuthorizationFilteredData"
              :per-page="parseInt(perPage)"
              clickable
            >
              <template slot="no" slot-scope="row">
                {{ row.rowIndex + 1 }}
              </template>

              <template slot="actions" slot-scope="props">
                  <h4 class="mt-2">
                  <span
                      class="badge badge-primary mr-1"
                      v-on:click="viewScreen(props.rowData)"
                    >
                      <i class="fa fa-info-circle"></i
                    ></span>
                    <span
                      class="badge badge-primary mr-1"
                      v-on:click="editAuthPage(props.rowData)"
                      
                    >
                      <i class="fa fa-edit"></i
                    ></span>
                    <span
                      class="badge badge-primary mr-1"
                      v-on:click="deleteScreen(props.rowData)"
                    >
                      <i class="fa fa-trash"></i
                    ></span>

                    
    
                  </h4>
                </template>
            </va-data-table>
          </va-card>
        </div>
      </div>

    </div>  
  </va-card>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import Vudal from "vudal";
import "vue-form-generator/dist/vfg.css";
import Tabs from "vue-tabs-with-active-line";
import * as servicesModule04 from "../../../../app/module0/services04";
import * as servicesModule0 from "../../../../app/module0/services02";
import loder from "../../../request_loader";

const TABS = [
  { title: "Setting 1 : Access Screen", value: "tab1" },
  { title: "Setting 2 : Authorization Level Screen", value: "tab2" }
];

export default {
  mounted() {
    this.getScreen();
    this.getAllModule();
    this.getGroup();
    this.getAuthorizationLevel();
    // this.getUser();
    this.getAllSubmodule();
    this.getStaffList();
    this.getAuthorizationPage();
  },

  watch : {
    // 'model.moduleSelection': function(val) {
    //   if(val) {

    //   }else{
    //     this.getAllScreens();
    //   }
    // },
    // 'model.submoduleSelection': function(val) {
    //   if(val) {

    //   }else{
    //     // alert('ss')
    //     this.getScreenByModule();
    //   }
    // },
  },
  components: {
    Tabs,
    Vudal,
    loder
  },
  methods: {
    // Check Box Function for set to save
    checkScreen(val,data){
      var screenArr = this.screenListSave;
      if(event.target.checked){
          //Remove if exist element
          screenArr = screenArr.filter(function( obj ) {
            return obj.TP_MANAGE_SCREEN_ID !== data.TP_MANAGE_SCREEN_ID;
          });
          // Push the selected element
          screenArr.push(data);
          this.screenListSaveCount = screenArr.length; 
      }else{
        // deselect element
        screenArr = screenArr.filter(function( obj ) {
            return obj.TP_MANAGE_SCREEN_ID !== data.TP_MANAGE_SCREEN_ID;
        });
      }
      this.screenListSave = screenArr;
    },
    // Access Screen Inser
    async submit() { 
      //var f1 = this.$refs.Tab1Form.validate();
      var f2 = this.$refs.Tab2Form.validate();
      //var f3 = this.$refs.staffForm.validate();
      if (f2) {
        this.isLoader = true; // Loder 
        this.checkboxArray = [];
        if(!(this.model.ALL_ACCESS)){
            this.screenListSave.forEach((item) => {
              if (item.selected == true) {
                this.checkboxArray.push(item.TP_MANAGE_SCREEN_ID);
              }
            });
          }else{
            this.checkboxArray.push(0);
          }
        // alert(this.checkboxArray)
        const data = new FormData();
        data.append("TP_MANAGE_GROUP_ID", this.model.TP_MANAGE_GROUP_ID.TP_MANAGE_GROUP_ID);
        data.append("TP_AUTHORISATION_ID", this.model.TP_AUTHORISATION_ID.AUTHORIZATION_LEVEL_ID);
        data.append("TP_MANAGE_SCREEN_ID", JSON.stringify(this.checkboxArray));
        data.append("TP_USER_ID", this.model.USER.USER_ID);
        try {
          const response = await servicesModule0.createTpScreenAccess(data);
          if(response != 'error'){
            this.dataReset();
            this.getAuthorizationPage();
          }  
          this.isLoader = false; // Kill Loder 
        } catch (error) {
          console.log(error);
        }
      }
    },

    dataReset(){
      this.model.TP_MANAGE_GROUP_ID = '';
      this.model.TP_AUTHORISATION_ID = '';
      this.model.USER = '';
      this.model.moduleSelection = '';
      this.model.submoduleSelection = '';
      this.screenListSave = []; 
      this.screenList = [];
      this.screenListSaveCount = 0; 
      this.screenListCount = 0;
    },

    checkBox(screenId, id) {
      if (document.getElementById("checkboxId_" + id).checked) {
        this.checkboxArray.push(screenId);
      } else {
        const indexToRemove = this.checkboxArray.indexOf(screenId);
        if (indexToRemove > -1) {
          this.checkboxArray.splice(indexToRemove, 1);
        }
      }
    },

    

    getStaffList: async function() {
      const response = await servicesModule0.getStaffList();
      this.staffList = response;
    },
    

    getAuthorizationLevel: async function() {
      const response = await servicesModule0.getAllDistAuthLevelList();
      this.AuthList = response;
    },

    getAuthorizationPage: async function() {
      const response = await servicesModule0.getAllTpAuthPageList();
      this.AuthPageList = response;
      this.screenAccessListCount = this.AuthPageList.length;

      this.isDataReady = true; // Kill Component loader
    },

    
    handleClick(newTab) {
      this.currentTab = newTab;
      this.dataReset();
    }, // end tab
    back() {
      this.$router.go(-1);
    }, // back button

    //--------------------module---------------------------/
    getAllModule: async function() {
      const response = await servicesModule0.getAllTpManageModuleList();
      this.moduleList = response;
    },
    getScreenByModule: async function() {
      const response = await servicesModule0.getTpScreenByModule(
        this.model.moduleSelection.TP_MANAGE_MODULE_ID,
        this.model.submoduleSelection.TP_MANAGE_SUBMODULE_ID
      );
      var screenData = response;
       // for selected exist
      var arrData = this.screenListSave;
      var arr = [];
      arrData.forEach((item) => {  
         arr.push(item.TP_MANAGE_SCREEN_ID);
      });
      screenData.forEach((item) => {  
        if(arr.includes(item.TP_MANAGE_SCREEN_ID)){ 
          item.selected = true;
        }
      });
      this.screenList = screenData;
      this.screenListCount = this.screenList.length;
    },
    getScreenByModuleEdit: async function() {
      const response = await servicesModule0.getTpScreenByModule(
        this.model.editScreen.moduleSelection.TP_MANAGE_MODULE_ID,
        this.model.editScreen.submoduleSelection.TP_MANAGE_SUBMODULE_ID
      );
      var screenData = response;
       // for selected exist
      var arrData = this.screenListSave;
      var arr = [];
      arrData.forEach((item) => {  
         arr.push(item.TP_MANAGE_SCREEN_ID);
      });
      screenData.forEach((item) => {  
        if(arr.includes(item.TP_MANAGE_SCREEN_ID)){ 
          item.selected = true;
        }
      });
      this.screenList = screenData;
      this.screenListCount = this.screenList.length;
    },

    getScreen: async function() {
      const response = await servicesModule0.getAllTpManageScreenList(
      );
      this.screenList = response;
      this.screenListCount = this.screenList.length;
    },

   
    getGroup: async function() {
      const response = await servicesModule0.getAllTpManageGroupList(
      );
      this.groupList = response;
    },

    getAllSubmodule: async function() {
      const response = await servicesModule0.getAllTpManageSubModuleList();
      this.submoduleList = response;
      this.submoduleListCount = this.submoduleList.length;
    },
    // getSubmoduleByModule: async function(data) {
    //   const response = await servicesModule0.getTpManageSubModulByModule(data);
    //   this.submoduleList = response;
    //   this.submoduleListCount = this.submoduleList.length;
    // },

    onModuleData: async function (newVal, schema) { //alert(schema);  
      this.isLoader = true; // Loder 

      if (schema == "moduleSelection" || schema == "editScreen.moduleSelection" && newVal) {
        this.model.submoduleSelection = "";
        const response = await servicesModule0.getTpManageSubModulByModule(newVal.TP_MANAGE_MODULE_ID);
        this.submoduleList = response;
      }

      if (schema == "submoduleSelection" || schema == "moduleSelection") {
        this.getScreenByModule();
      }
      if(schema == "editScreen.submoduleSelection" || schema == "editScreen.moduleSelection"){
        this.getScreenByModuleEdit();
      }
       
      this.isLoader = false; // Kill Loder
    },
    onConfigUpdated: async function (newVal, schema) {
      this.isLoader = true; // Loder
      if(newVal && schema == "ALL_ACCESS" || schema == "editAccess.ALL_ACCESS"){
          this.screenList = [];
          this.screenListCount = this.screenList.length;
          this.screenListSave = [];
          this.screenListSaveCount = this.screenList.length;
      }
      this.isLoader = false; // Kill Loder
    },
    
    async editAuthPage(data) {
      this.isLoader = true; // Loder 
      const response = await servicesModule0.getTpScreenAuthPageById(
        data.TP_SCREEN_ACCESS_ID
      );
      
      this.TP_SCREEN_ACCESS_ID = data.TP_SCREEN_ACCESS_ID;
      this.setEditData(response);
      this.isLoader = false; // Kill Loder 
      this.$modals.simpleModalEditAuthPage.$show();
    },

    async viewScreen(data) {
      this.isLoader = true; // Loder 
      const response = await servicesModule0.getTpScreenAuthPageById(
        data.TP_SCREEN_ACCESS_ID
      );
      this.setEditData(response);
      this.isLoader = false; // Kill Loder 
      this.$modals.viewScreen.$show();
    },

    // Set Edit Value 
    setEditData(response){
      this.screenList = [];
      this.screenListCount = this.screenList.length;
      this.model.editScreen.moduleSelection = "";
      this.model.editScreen.submoduleSelection = "";

       this.model.editScreen.USER = {
         USER_ID: response.ScreenAccess.USER_ID,
         USER_NAME: response.ScreenAccess.USER_NAME
       }
        // if(response.allScreenByModule.length > 0){
        //   this.model.editScreen.moduleSelection = {
        //     TP_MANAGE_MODULE_ID: response.allScreenByModule[0].TP_MANAGE_MODULE_ID,
        //     TP_MOD_NAME: response.allScreenByModule[0].TP_MOD_NAME
        //   }
        //   this.model.editScreen.submoduleSelection = {
        //     TP_MANAGE_SUBMODULE_ID: response.allScreenByModule[0].TP_MANAGE_SUBMODULE_ID,
        //     TP_SUBMOD_NAME: response.allScreenByModule[0].TP_SUBMOD_NAME
        //   }
        // } 
       this.model.editScreen.TP_MANAGE_GROUP_ID = {
         TP_MANAGE_GROUP_ID: response.ScreenAccess.TP_MANAGE_GROUP_ID,
         TP_MANAGE_GROUP_NAME: response.ScreenAccess.TP_MANAGE_GROUP_NAME
       }
       this.model.editScreen.TP_AUTHORISATION_ID = {
         AUTHORIZATION_LEVEL_ID: response.ScreenAccess.AUTHORIZATION_LEVEL_ID,
         AUTHORIZATION_LEVEL_NAME: response.ScreenAccess.AUTHORIZATION_LEVEL_NAME
       }

      // for selected 
      this.model.editScreen.ALL_ACCESS = response.allAccess;
        var screenData = response.Screen;
        this.screenListSaveCount = screenData.length;

        screenData.forEach((item) => {  
          var arrData =  response.ScreenArr;
          arrData = arrData.map(Number);
          if(arrData.includes(item.TP_MANAGE_SCREEN_ID)){ 
            item.selected = true;
          }
        });
        this.screenListSave = screenData;
    },

    async updateAuthPageAPI() {
      try {
        this.isLoader = true; // Loder 
        this.checkboxArray = [];
        const data = new FormData();
        if(!(this.model.editScreen.ALL_ACCESS)){
            this.screenListSave.forEach((item) => {
              if (item.selected == true) {
                this.checkboxArray.push(item.TP_MANAGE_SCREEN_ID);
              }
            });
          }else{
            this.checkboxArray.push(0);
          }
        // alert(this.checkboxArray)
        
        data.append("TP_SCREEN_ACCESS_ID", this.TP_SCREEN_ACCESS_ID);
        data.append("TP_MANAGE_GROUP_ID", this.model.editScreen.TP_MANAGE_GROUP_ID.TP_MANAGE_GROUP_ID);
        data.append("TP_AUTHORISATION_ID", this.model.editScreen.TP_AUTHORISATION_ID.AUTHORIZATION_LEVEL_ID);
        data.append("TP_MANAGE_SCREEN_ID", JSON.stringify(this.checkboxArray));
        data.append("TP_USER_ID", this.model.editScreen.USER.USER_ID);
        const response = await servicesModule0.updateTpManageScreenAccess(data);

        this.getAuthorizationPage();
        this.isLoader = false; // Kill Loder 
      } catch (error) {
        console.log(error);
      }
    },

    async deleteScreen(data){
      // eslint-disable-next-line no-unused-vars
      if (confirm("Are you sure you want to delete?")){
        this.isLoader = true; // Loder 
        const response = await servicesModule0.deleteTPAccess(data.TP_SCREEN_ACCESS_ID);
        this.getAuthorizationPage();
        this.isLoader = false; // Kill Loder 
      }
    },
    //----------------------department-----------------/
    // getAllDepartment: async function() {
    //   const response = await servicesModule0.getAllDepartmentList();
    //   this.departmentList = response;
    // },
    
    
    //----------------------group-----------------/
  },

  computed: {
    //tab1
    moduleFields() {
      return [
        {
          name: "__slot:no",
          title: "No"
        },
        {
          name: "TP_MOD_NAME",
          title: "Module Name"
        },
        {
          name: "TP_SUBMOD_NAME",
          title: "Submodule Name"
        },
        {
          name: "TP_SCREEN_NAME",
          title: "Screen Name"
        },
        {
          name: "TP_SCREEN_DESC",
          title: "Description"
        },
        {
          name: "__slot:actions",
          title: "Action",
          dataClass: "justify-content-center",
          width: "15%"
        }
      ];
    },
    viewmoduleFields() {
      return [
         {
          name: "__slot:no",
          title: "No"
        },

        {
          name: "TP_MOD_NAME",
          title: "Module Name"
        },
        {
          name: "TP_SUBMOD_NAME",
          title: "Submodule Name"
        },
        {
          name: "TP_SCREEN_NAME",
          title: "Screen Name"
        },
        {
          name: "TP_SCREEN_DESC",
          title: "Description"
        },
        {
          name: "__slot:actions",
          title: "Action",
          dataClass: "justify-content-center",
          width: "15%"
        }
      ];
    },
    moduleFilteredData() {
      if (!this.term || this.term.length < 1) {
        return this.screenList;
      }
    },
    //tab2
    groupAuthorizationSchema() {
      return [
        {
          name: "__slot:no",
          title: "No"
        },
        {
          name: "TP_MANAGE_GROUP_NAME",
          title: "Group"
        },
        {
          name: "AUTHORIZATION_LEVEL_NAME",
          title: "Authorization Level"
        },
        {
          name: "__slot:actions",
          title: "Action",
          dataClass: "justify-content-center",
          width: "15%"
        }
      ];
    },
    groupAuthorizationFilteredData() {
      if (!this.term || this.term.length < 1) {
        return this.AuthPageList;
      }
    },
    //tab3
    groupFields() {
      return [
        {
          name: "__slot:no",
          title: "No"
        },
        {
          name: "MOD_NAME",
          title: "Module Name"
        },
        {
          name: "DPMT_NAME",
          title: "Department Name"
        },
        {
          name: "GROUP_NAME",
          title: "Group Name"
        },
        {
          name: "__slot:actions",
          title: "Action",
          dataClass: "justify-content-center",
          width: "15%"
        }
      ];
    },
    groupFilteredData() {
      if (!this.term || this.term.length < 1) {
        return this.groupList;
      }
    }
  },

  data() {
    return {
      // Data for loder
      isLoader: false,
      isDataReady:false,

      screenListCount: null,
      screenAccessListCount: null,
      checkboxArray: [],
      authorizationLevel: null,
      screenListCurrentCount: null,
      header: "",
      field: [],
      count: 1,
      term: null,
      hasModule: false,
      perPage: "10",
      perPageOptions: ["4", "6", "10", "20"],
      moduleList: [],
      screenList: [],
      submoduleList: [],
      screenAccessList: [],
      divisionList: [],
      authorizationList: [],
      staffList: [],
      departmentList: [],
      groupList: [],
      currentPage: 1,
      AuthList: [],
      AuthPageList: [],
      screenListSave: [],
      screenListSaveCount: null,

      tabs: TABS,
      currentTab: "tab1",
      TP_SCREEN_ACCESS_ID:"",

      model: {
        divisionName: "",
        editDivisionName: "",

        USER: '',

        moduleSelection: "",
        submoduleSelection: "",
        departmentSelection: "",
        groupSelection: "",
        authorizationSelection: "",
        departmentName: "",
        editDepartmentName: "",
         TP_MANAGE_GROUP_ID:'',
        TP_SCREEN_ID: '',
        TP_MANAGE_GROUP_ID: '',
        TP_AUTHORISATION_ID: '',
        TP_MANAGE_SCREEN_ID: '',
        USER: '',
        ALL_ACCESS:false,
        editScreen: {
          moduleSelection: "",
          submoduleSelection: "",
          groupSelection: "",
          authorizationSelection: "",
          TP_MANAGE_GROUP_ID:'',
          TP_SCREEN_ID: '',
          TP_MANAGE_GROUP_ID: '',
          TP_AUTHORISATION_ID: '',
          TP_MANAGE_SCREEN_ID: '',
          USER: '',
          ALL_ACCESS:false,
        },

      },

      //Module & submodule
      Tab1Schema: {
        groups: [
          {
            styleClasses: "row mt-2",
            fields: [
              {
                label: "Module Name",
                type: "vueMultiSelect",
                model: "moduleSelection",
                placeholder: "Select Module",
                selectOptions: {
                  multiple: false,
                  key: "TP_MANAGE_MODULE_ID",
                  label: "TP_MOD_NAME",
                  searchable: true
                },
                values: (model, schema) => {
                  return this.moduleList;
                },
                styleClasses: "col-md-6",
                required: true,
                validator: "required",
              },
              {
                label: "Submodule Name",
                type: "vueMultiSelect",
                model: "submoduleSelection",
                placeholder: "Select Submodule",
                selectOptions: {
                  multiple: false,
                  key: "TP_MANAGE_SUBMODULE_ID",
                  label: "TP_SUBMOD_NAME",
                  searchable: true
                },
                values: (model, schema) => {
                  return this.submoduleList;
                },
                styleClasses: "col-md-6",
                required: true,
                validator: "required",
              }
            ]
          }
        ]
      },
      Tab2Schema: {
        groups: [
          {
            styleClasses: "row mt-2",
            fields: [
              {
                label: "Group Name",
                type: "vueMultiSelect",
                model: "TP_MANAGE_GROUP_ID",
                placeholder: "Select Group",
                selectOptions: {
                  multiple: false,
                  key: "TP_MANAGE_GROUP_ID",
                  label: "TP_MANAGE_GROUP_NAME",
                  searchable: true
                },

                values: (model, schema) => {
                  return this.groupList;
                },
                styleClasses: "col-md-6",
                required: true,
                validator: "required",
              },
              {
                label: "Authorization Level Name",
                type: "vueMultiSelect",
                model: "TP_AUTHORISATION_ID",
                placeholder: "Select Authorisation",
                selectOptions: {
                  multiple: false,
                  key: "AUTHORIZATION_LEVEL_ID",
                  label: "AUTHORIZATION_LEVEL_NAME",
                  searchable: true
                },

                values: (model, schema) => {
                  return this.AuthList;
                },
                styleClasses: "col-md-6",
                required: true,
                validator: "required",
              },
            ]
          }
        ]
      },
      Tab1SelectStaff: {
        groups: [
                    {
            styleClasses: "row mt-2",
            fields: [
              {
                type: "vueMultiSelect",
                model: "USER",
                label: "Staff Name",
                placeholder: "Select Staff",
                selectOptions: {
                  multiple: false,
                  key: "USER_ID",
                  label: "USER_NAME",
                  searchable: true
                },
                values: (model, schema) => {
                  return this.staffList;
                },
                styleClasses: "col-md-12"
              }
            ]
          }
        ]
      },

      //Module & submodule
      editTab1Schema: {
        groups: [
          {
            styleClasses: "row mt-2",
            fields: [
              {
                label: "Module Name",
                type: "vueMultiSelect",
                model: "editScreen.moduleSelection",
                placeholder: "Select Module",
                selectOptions: {
                  multiple: false,
                  key: "TP_MANAGE_MODULE_ID",
                  label: "TP_MOD_NAME",
                  searchable: true
                },
                values: (model, schema) => {
                  return this.moduleList;
                },
                styleClasses: "col-md-6",
                required: true,
                validator: "required",
              },
              {
                label: "Submodule Name",
                type: "vueMultiSelect",
                model: "editScreen.submoduleSelection",
                placeholder: "Select Submodule",
                selectOptions: {
                  multiple: false,
                  key: "TP_MANAGE_SUBMODULE_ID",
                  label: "TP_SUBMOD_NAME",
                  searchable: true
                },
                values: (model, schema) => {
                  return this.submoduleList;
                },
                styleClasses: "col-md-6",
                required: true,
                validator: "required",
              }
            ]
          }
        ]
      },
      editTab2Schema: {
        groups: [
          {
            styleClasses: "row mt-2",
            fields: [
              {
                label: "Group Name",
                type: "vueMultiSelect",
                model: "editScreen.TP_MANAGE_GROUP_ID",
                placeholder: "Select Group",
                selectOptions: {
                  multiple: false,
                  key: "TP_MANAGE_GROUP_ID",
                  label: "TP_MANAGE_GROUP_NAME",
                  searchable: true
                },

                values: (model, schema) => {
                  return this.groupList;
                },
                styleClasses: "col-md-6",
                required: true,
                validator: "required",
              },
              {
                label: "Authorization Level Name",
                type: "vueMultiSelect",
                model: "editScreen.TP_AUTHORISATION_ID",
                placeholder: "Select Authorisation",
                selectOptions: {
                  multiple: false,
                  key: "AUTHORIZATION_LEVEL_ID",
                  label: "AUTHORIZATION_LEVEL_NAME",
                  searchable: true
                },

                values: (model, schema) => {
                  return this.AuthList;
                },
                styleClasses: "col-md-6",
                required: true,
                validator: "required",
              },
            ]
          }
        ]
      },
      editTab1SelectStaff: {
        groups: [
                    {
            styleClasses: "row mt-2",
            fields: [
              {
                type: "vueMultiSelect",
                model: "editScreen.USER",
                label: "Staff Name",
                placeholder: "Select Staff",
                selectOptions: {
                  multiple: false,
                  key: "USER_ID",
                  label: "USER_NAME",
                  searchable: true
                },
                values: (model, schema) => {
                  return this.staffList;
                },
                styleClasses: "col-md-12",
                required: true,
                validator: "required",
              }
            ]
          }
        ]
      },

      //Group

      formOptions: {
        validateAfterChanged: true
      }
    };
  }
};
</script>
<style lang="scss">
.va-data-table__pagination {
  margin-top: 1rem;
  display: -webkit-box;
  display: -ms-flexbox;
  display: inherit;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: flex-end;
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

    &__active {
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
      margin-left: 0;
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

.content {
  margin-top: 30px;
  font-size: 20px;
}

.inline {
  display: inline-flex;
  float: right;
}
.avoid-clicks {
  pointer-events: none;
}
</style>

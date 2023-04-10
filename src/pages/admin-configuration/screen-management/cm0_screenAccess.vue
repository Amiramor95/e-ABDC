/* eslint-disable no-unused-expressions */
<template>
  <va-card>
    <loder v-show="isLoader" />

    
      <!-- authorization userAdditionalScreen -->
      <vudal name="userAdditionalScreen" class="widthModal" >
        <loder v-show="isLoader" />
        <div class="header">
          User Group <i class="close icon">&times;</i>
        </div>
        <table class="table">
          <tbody>
              <tr>
              <td scope="col" class="font-weight-bold">Division: </td>
                <td scope="col">{{ model.editAccess.divisionSelection.DIV_NAME }}</td>
              </tr>
              <tr>
                <td scope="col" class="font-weight-bold">Department: </td>
                <td scope="col">{{ model.editAccess.departmentSelection.DPMT_NAME }}</td>
              </tr>
              <tr>
                <td scope="col" class="font-weight-bold">Group: </td>
                <td scope="col">{{ model.editAccess.groupSelection.GROUP_NAME }}</td>
              </tr>
              <tr>
                <td scope="col" class="font-weight-bold">Authorization: </td>
                <td scope="col">{{ model.editAccess.authorizationSelection.AUTHORIZATION_LEVEL_NAME }}</td>
              </tr>
            </tbody>
          </table>  
          <br />

          <!-- list -->
          <va-card class="mt-2">
            <va-data-table
              :datacount="groupUserListCount"
              :dataperpage="parseInt(perPage)"
              :fields="groupUserFields"
              :data="groupUserList"
              no-data-label="No data found"
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
                      v-on:click="addUserScreen(props.rowData)"
                    >
                      <i class="fa fa-edit"></i
                    ></span>
                </h4>      
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
      <!-- View Screen Modal -->
      <!-- authorization userAdditionalAddScreen -->
      <vudal name="userAdditionalAddScreen" class="widthModal">
        <loder v-show="isLoader" />
        <div class="header">
          Add User Access Screen <i class="close icon">&times;</i>
        </div>
        <table class="table">
          <tbody>
              <td scope="col" class="font-weight-bold">Division: </td>
                <td scope="col">{{ model.editAccess.divisionSelection.DIV_NAME }}</td>
              </tr>
              <tr>
                <td scope="col" class="font-weight-bold">Department: </td>
                <td scope="col">{{ model.editAccess.departmentSelection.DPMT_NAME }}</td>
              </tr>
              <tr>
                <td scope="col" class="font-weight-bold">Group: </td>
                <td scope="col">{{ model.editAccess.groupSelection.GROUP_NAME }}</td>
              </tr>
              <tr>
                <td scope="col" class="font-weight-bold">Authorization: </td>
                <td scope="col">{{ model.editAccess.authorizationSelection.AUTHORIZATION_LEVEL_NAME }}</td>
              </tr>
            </tbody>
          </table>  
          <br />

          <vue-form-generator
            :model="model"
            :schema="editTab1Schema"
            :options="formOptions"
            @model-updated="onModuleUpdated"
            ref="eTab2Form"
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
          <br />
            <h4>&nbsp;&nbsp;&nbsp; Additional Screen Access Page</h4>
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
          <br />

        </div>
        <div class="actions">
          <button
            type="button"
            class="cancel vudal-btn mr-2 btn btn-danger btn-fill btn-md"
          >
            <i class="fa fa-times" /> &nbsp; Close
          </button>
          <button
            @click="addUserAccessScreen"
            type="button"
            class="vudal-btn mr-2 btn btn-primary btn-fill btn-md"
          >
            <i class="fa fa-edit" /> &nbsp; Save
          </button>
        </div>

      </vudal>
      <!-- View Screen Modal -->

      <!-- authorization -->
      <vudal name="editAuthorizationLevel" class="widthModal">
        <loder v-show="isLoader" />
        <div class="header">
          Edit Authorization Level Screen <i class="close icon">&times;</i>
        </div>

          <!-- <br />
          <vue-form-generator
            :model="model"
            :schema="editTab1SelectStaff"
            :options="formOptions"
            ref="eTab1Form"
          >
          </vue-form-generator>
          <br /> -->
          <vue-form-generator
            :model="model"
            :schema="editTab1Schema"
            :options="formOptions"
            @model-updated="onModuleUpdated"
            ref="eTab2Form"
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
          <br />
            <h4>&nbsp;&nbsp;&nbsp; Screen Access Page</h4>
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
          <br />
          <vue-form-generator
            :model="model"
            :schema="editTab1ConfigSchema"
            :options="formOptions"
            @model-updated="onConfigUpdated"
            ref="eTab3Form"
          >
          </vue-form-generator>
          <br/><br/>

        </div>
        <div class="actions">
          <button
            type="button"
            class="cancel vudal-btn mr-2 btn btn-danger btn-fill btn-md"
          >
            <i class="fa fa-times" /> &nbsp; Close
          </button>
          <button
            @click="updateAccessScreenAPI"
            type="button"
            class="cancel vudal-btn mr-2 btn btn-primary btn-fill btn-md"
          >
            <i class="fa fa-edit" /> &nbsp; Update
          </button>
        </div>

      </vudal>
      <!-- View Screen Modal -->
      <!-- authorization -->
      <vudal name="viewScreen" class="widthModal">
        <div class="header">
          View Screen Details <i class="close icon">&times;</i>
        </div>

        <table class="table">
          <tbody>
            <tr>
              <td scope="col" class="font-weight-bold">All Access: </td>
              <td scope="col">{{ (model.editAccess.ALL_ACCESS) ? 'Yes' : 'No' }}</td>
            </tr>
            <tr>
              <td scope="col" class="font-weight-bold">Division: </td>
              <td scope="col">{{ model.editAccess.divisionSelection.DIV_NAME }}</td>
            </tr>
            <tr>
              <td scope="col" class="font-weight-bold">Department: </td>
              <td scope="col">{{ model.editAccess.departmentSelection.DPMT_NAME }}</td>
            </tr>
            <tr>
              <td scope="col" class="font-weight-bold">Group: </td>
              <td scope="col">{{ model.editAccess.groupSelection.GROUP_NAME }}</td>
            </tr>
            <tr>
              <td scope="col" class="font-weight-bold">Authorization: </td>
              <td scope="col">{{ model.editAccess.authorizationSelection.AUTHORIZATION_LEVEL_NAME }}</td>
            </tr>

          </tbody>
        </table>

          <br />
          <!-- list -->
          <va-card class="mt-2 avoid-clicks" v-if="! model.editAccess.ALL_ACCESS">
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
              <va-checkbox
                @change="checkBox"
                class="col-2"
                v-model="props.rowData.selected"
              />
            </template>

            </va-data-table>
          </va-card>
          

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
      <!-- department -->

      <div class="text-center text-danger my-2" v-if="!isDataReady">
        <b-spinner class="align-middle"></b-spinner>
        <strong>Loading...</strong>
      </div>
      <div v-else>
        <!-- group -->
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
              ref="Tab1Form"
            >
            </vue-form-generator>
            <br /> -->
            <vue-form-generator
              :model="model"
              :schema="Tab1Schema"
              :options="formOptions"
              @model-updated="onModuleUpdated"
              ref="Tab2Form"
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
                  <!-- <va-checkbox
                    class="col-2"
                    v-model="props.rowData.selected"
                    v-on:change="checkScreen('eeee')"
                  /> -->
                  <input 
                    type="checkbox" 
                    v-model="props.rowData.selected" 
                    @change="checkScreen($event,props.rowData)"
                  >
                </template>
                
              </va-data-table>
            </va-card>
            <br />
            <br />
              <h4>Screen Access Page</h4>
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
              :schema="Tab1ConfigSchema"
              :options="formOptions"
              @model-updated="onConfigUpdated"
              ref="Tab3Form"
            >
            </vue-form-generator>
            <br/><br/>
            <button
              type="submit"
              @click.prevent="submit"
              class="ml-2 btn btn-primary btn-fill float-right btn-md"
            >
            <i class="fa fa-save" /> &nbsp; Save
            </button>
          </div>

          <div v-if="currentTab === 'tab2'">
            <br />
            <va-card class="mt-2">
              <vue-form-generator
                :model="model"
                :schema="searchSchema"
                :options="formOptions"
                @model-updated="onChangeSearch"
              >
              </vue-form-generator>

              <br/><br/>
              <button
                type="submit"
                @click.prevent="searchData"
                class="ml-2 btn btn-primary btn-fill float-right btn-md"
              >
              <i class="fa fa-search" /> &nbsp; Search
              </button>
            </va-card>

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
                        v-on:click="editAuth(props.rowData)"
                      >
                        <i class="fa fa-edit"></i
                      ></span>

                      <span
                        class="badge badge-primary mr-1"
                        v-on:click="viewScreen(props.rowData)"
                      >
                        <i class="fa fa-info-circle"></i
                      ></span>
                      <span
                        class="badge badge-primary mr-1"
                        v-on:click="deleteScreen(props.rowData)"
                      >
                        <i class="fa fa-trash"></i
                      ></span>
                      <span
                        class="badge badge-primary mr-1"
                        v-on:click="userScreen(props.rowData)"
                      >
                        <i class="fa fa-users"></i
                      ></span>
                    </h4>
                </template>
              </va-data-table>
            </va-card>
          </div>
        </div>
        </br></br></br>
        <button @click="back" type="button" class="btn btn-primary btn-fill btn-md"><i class="fa fa-step-backward" /> &nbsp; Previous </button> 
      </div>
  </va-card>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import Vudal from "vudal";
import "vue-form-generator/dist/vfg.css";
import Tabs from "vue-tabs-with-active-line";
import * as servicesModule04 from "../../../app/module0/services04";
import * as servicesModule0 from "../../../app/module0/services";
import * as servicesModule1 from "../../../app/module1/services";
import loder from "../../request_loader";

const TABS = [
  { title: "Setting 1 : Access Screen", value: "tab1" },
  { title: "Setting 2 : Authorization Level Screen", value: "tab2" },
];

export default {
  mounted() {
    this.getAllScreens();
    this.getAllModule();
    this.getDivision();
    this.getScreenAccesses();
    this.getAuthorizationLevel();
    // this.getUser();
    this.getAllSubmodule();
    this.getStaffList();
    this.getAllGroup();
  },

  watch: {
    "model.moduleSelection": function (val) {
      if (val) {
      } else {
        this.getAllScreens();
      }
    },
    "model.submoduleSelection": function (val) {
      if (val) {
      } else {
        // alert('ss')
        this.getScreenByModule();
      }
    },
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
      if(event.target.checked){ console.log('SCREEN',screenArr);  
          //Remove if exist element  
          screenArr = screenArr.filter(function( obj ) {
            return obj.MANAGE_SCREEN_ID !== data.MANAGE_SCREEN_ID;
          });
          // Push the selected element
          screenArr.push(data);
          this.screenListSaveCount = screenArr.length; 
      }else{
        // deselect element
        screenArr = screenArr.filter(function( obj ) {
            return obj.MANAGE_SCREEN_ID !== data.MANAGE_SCREEN_ID;
        });
      }
      this.screenListSave = screenArr;
    },

    async submit() { 
      //var f1 = this.$refs.Tab1Form.validate();
      var f2 = this.$refs.Tab2Form.validate();
      var f3 = this.$refs.Tab3Form.validate();
      if (f2 && f3) {
        this.isLoader = true; // Loder
        this.checkboxArray = [];
        if(!this.model.ALL_ACCESS){
          this.checkboxArray = [];
          this.screenListSave.forEach((item) => {
            if (item.selected == true) {
              this.checkboxArray.push(item.MANAGE_SCREEN_ID);
            }
          });
        }else{
          this.checkboxArray.push(0);
        }
        
        //alert(this.checkboxArray);
        const data = new FormData();
        data.append("MANAGE_GROUP_ID", this.model.groupSelection.MANAGE_GROUP_ID);
        data.append("AUTHORIZATION_LEVEL_ID", this.model.authorizationSelection.AUTHORIZATION_LEVEL_ID);
        data.append("MANAGE_SCREEN_ID", JSON.stringify(this.checkboxArray));
        data.append("USER_ID", this.model.USER.USER_ID);
        try {
          const response = await servicesModule0.createScreenAccess(data);
          if(response != 'error'){
            this.resetData();
            this.model.ALL_ACCESS = false;
            this.getScreenAccesses();
          }
          
          this.isLoader = false; // Kill Loder

        } catch (error) {
          console.log(error);
        }
      }  
    },

    resetData(){
      this.model.groupSelection = '';
      this.model.moduleSelection = '';
      this.model.divisionSelection = '';
      this.model.departmentSelection = '';
      this.model.authorizationSelection = '';
      this.screenListSave = []; 
      this.screenList = [];
      this.screenListSaveCount = 0; 
      this.screenListCount = 0;
    },

    checkBox() {
      // console.log(this.selected);
      if (document.getElementById("checkboxId_" + id).checked) {
        this.checkboxArray.push(screenId);
      } else {
        const indexToRemove = this.checkboxArray.indexOf(screenId);
        if (indexToRemove > -1) {
          this.checkboxArray.splice(indexToRemove, 1);
        }
      }
    },

    getScreenAccesses: async function () {
      const response = await servicesModule04.getScreenAccesses({});
      this.screenAccessList = response;
      this.screenAccessListCount = this.screenAccessList.length;

      this.isDataReady = true; // Kill component loader
    },

    searchData: async function (){

      this.isLoader = true; // Loder
      
      if(this.model.searchAccess.divisionSelection)
      var div = this.model.searchAccess.divisionSelection.MANAGE_DIVISION_ID;

      if(this.model.searchAccess.departmentSelection)
      var dept = this.model.searchAccess.departmentSelection.MANAGE_DEPARTMENT_ID;

      if(this.model.searchAccess.groupSelection)
      var grp = this.model.searchAccess.groupSelection.MANAGE_GROUP_ID;

      var text = this.model.searchAccess.searchText;
      const data = {
        MANAGE_DIVISION_ID : div,
        MANAGE_DEPARTMENT_ID : dept,
        MANAGE_GROUP_ID : grp,
        TEXT : text
      }; 
      const response = await servicesModule04.getScreenAccesses(data);
      this.screenAccessList = response;
      this.screenAccessListCount = this.screenAccessList.length;
      this.model.searchAccess.groupSelection = '';
      this.model.searchAccess.departmentSelection = '';
      this.model.searchAccess.divisionSelection = '';
      this.isLoader = false; // Kill Loder
    },


    getStaffList: async function () {
      const response = await servicesModule04.getStaffList();
      this.staffList = response;
    },
    getDivision: async function () {
      const response = await servicesModule04.getAllDivisionList();
      this.divisionList = response;
      this.searchDivisionList = response;
      // alert(this.divisionList)
    },

    getAuthorizationLevel: async function () {
      const response = await servicesModule04.getAuthorizationLevel(); 
      this.authorizationList = response;
    },

    // ------------------ Edit Auth Level ----------------------- 
    getAllGroup: async function() {
      const response = await servicesModule04.getAllManageGroupList(
      );
      this.groupAllList = response;
    },
    async editAuth(data) { 
      this.isLoader = true; // Loder
      const response = await servicesModule04.getAuthLevelById(
         data.MANAGE_SCREEN_ACCESS_ID
      );

      this.MANAGE_SCREEN_ACCESS_ID = response.ScreenAccess.MANAGE_SCREEN_ACCESS_ID;

      this.setEditData(response);
      this.isLoader = false; // Kill Loder
      this.$modals.editAuthorizationLevel.$show();  
    },

    async viewScreen(data) { 
      this.isLoader = true; // Loder
      const response = await servicesModule04.getAuthLevelById(
         data.MANAGE_SCREEN_ACCESS_ID
      );
      this.MANAGE_SCREEN_ACCESS_ID = response.ScreenAccess.MANAGE_SCREEN_ACCESS_ID;
      this.setEditData(response);
      this.isLoader = false; // Kill Loder
      this.$modals.viewScreen.$show(); 
    },


    //
    setEditData(response){
      this.screenList = [];
      this.screenListCount = this.screenList.length;
      this.model.editAccess.moduleSelection = "";

       this.model.editAccess.USER = {
        USER_ID : response.ScreenAccess.USER_ID,
        USER_NAME : response.ScreenAccess.USER_NAME,
      }
      // if(response.allScreenByModule.length > 0){
      //   this.model.editAccess.moduleSelection = {
      //     MANAGE_MODULE_ID : response.allScreenByModule[0].MANAGE_MODULE_ID,
      //     MOD_NAME : response.allScreenByModule[0].MOD_NAME,
      //   }

      //   this.model.editAccess.submoduleSelection = {
      //     MANAGE_SUBMODULE_ID : response.allScreenByModule[0].MANAGE_SUBMODULE_ID,
      //     SUBMOD_NAME : response.allScreenByModule[0].SUBMOD_NAME,
      //   }
      // }
      this.model.editAccess.divisionSelection = {
        MANAGE_DIVISION_ID : response.ScreenAccess.MANAGE_DIVISION_ID,
        DIV_NAME : response.ScreenAccess.DIV_NAME,
      }
      this.model.editAccess.departmentSelection = {
        MANAGE_DEPARTMENT_ID : response.ScreenAccess.MANAGE_DEPARTMENT_ID,
        DPMT_NAME : response.ScreenAccess.DPMT_NAME,
      }
      this.model.editAccess.groupSelection = {
        MANAGE_GROUP_ID : response.ScreenAccess.MANAGE_GROUP_ID,
        GROUP_NAME : response.ScreenAccess.GROUP_NAME,
      }
      this.model.editAccess.authorizationSelection = {
        AUTHORIZATION_LEVEL_ID : response.ScreenAccess.AUTHORIZATION_LEVEL_ID,
        AUTHORIZATION_LEVEL_NAME : response.ScreenAccess.AUTHORIZATION_LEVEL_NAME,
      }
      this.model.editAccess.ALL_ACCESS = response.allAccess;

      var screenData = response.Screen;
      this.screenListSaveCount = screenData.length;

      // for selected 
      screenData.forEach((item) => {  
        var arrData =  response.ScreenArr;
        arrData = arrData.map(Number);
        if(arrData.includes(item.MANAGE_SCREEN_ID)){ 
          item.selected = true;
        }
      });
      this.screenListSave = screenData;
    },

    async updateAccessScreenAPI() {
      try {
      //var f1 = this.$refs.eTab1Form.validate();
      //var f2 = this.$refs.eTab2Form.validate();
      //var f3 = this.$refs.eTab3Form.validate();
        //if (f2 && f3) { 
          //console.log(this.MANAGE_SCREEN_ACCESS_ID);
          this.isLoader = true; // Loder

          const data = new FormData();
          data.append(
            "MANAGE_SCREEN_ACCESS_ID",
            this.MANAGE_SCREEN_ACCESS_ID
          );
          this.checkboxArray = [];
          if(!this.model.editAccess.ALL_ACCESS){
            this.checkboxArray = [];
            this.screenListSave.forEach((item) => {
              if (item.selected == true) {
                this.checkboxArray.push(item.MANAGE_SCREEN_ID);
              }
            });
          }else{
            this.checkboxArray.push(0);
          }
            // this.checkboxArray = [];
            // this.screenList.forEach((item) => {
            //   if (item.selected == true) {
            //     this.checkboxArray.push(item.MANAGE_SCREEN_ID);
            //   }
            // });
            data.append("MANAGE_GROUP_ID", this.model.editAccess.groupSelection.MANAGE_GROUP_ID);
            data.append("AUTHORIZATION_LEVEL_ID", this.model.editAccess.authorizationSelection.AUTHORIZATION_LEVEL_ID);
            data.append("MANAGE_SCREEN_ID", JSON.stringify(this.checkboxArray));
            data.append("USER_ID", this.model.editAccess.USER.USER_ID);
          
          const response = await servicesModule04.updateAccessScreen(data);

          this.screenListSave = [];
          this.getScreenAccesses();
          this.isLoader = false; // Kill Loder
        //}  
      } catch (error) {
        console.log(error);
      }
    },
    //-----------------------------------

    onModuleUpdated: async function (newVal, schema) { 

      this.isLoader = true; // Loder 
      if (schema == "moduleSelection" || schema == "editAccess.moduleSelection") {
        this.submoduleList = [];
        var MOD_ID = '';
        (newVal == null) ? MOD_ID = "" : MOD_ID = newVal.MANAGE_MODULE_ID;
        const response = await servicesModule04.getSubmodule(MOD_ID);
        this.submoduleList = response;
        this.getScreen();
      }
      if (schema == "submoduleSelection" || schema == "editAccess.submoduleSelection" && newVal) {
        this.getScreen();
      }

      this.getScreen();
      this.isLoader = false; // Kill Loder
    },

    onChangeSearch: async function (newVal, schema) {  
      this.isLoader = true; // Loder

      if (schema == "searchAccess.divisionSelection"  && newVal) {
        this.searchDepartmentList = [];
        var DIVISION_ID = '';
        (newVal == null) ? DIVISION_ID = "" : DIVISION_ID = newVal.MANAGE_DIVISION_ID;
        const response = await servicesModule04.getDepartmentByDivisionId(DIVISION_ID);
        this.searchDepartmentList = response;
      }
      if (schema == "searchAccess.departmentSelection" && newVal) {
        this.searchGroupList = [];
        var DEPARTMENT_ID = '';
        (newVal == null) ? DEPARTMENT_ID = "" : DEPARTMENT_ID = newVal.MANAGE_DEPARTMENT_ID;
        const response = await servicesModule04.getGroupByDepartmentId(DEPARTMENT_ID);
        this.searchGroupList = response;
      }
      this.isLoader = false; // Kill Loder
    },

    onConfigUpdated: async function (newVal, schema) {
      this.isLoader = true; // Loder

      if (schema == "divisionSelection" || schema == "editAccess.divisionSelection" && newVal) {
        // this.model.departmentSelection = "";
        // this.model.groupSelection = "";
        // this.model.authorizationSelection = "";
        this.departmentList = [];
    
        var DIVISION_ID = '';
        (newVal == null) ? DIVISION_ID = "" : DIVISION_ID = newVal.MANAGE_DIVISION_ID;
        const response = await servicesModule04.getDepartmentByDivisionId(DIVISION_ID);
        this.departmentList = response;
        //this.getDepartment();

      } else if (schema == "departmentSelection" || schema == "editAccess.departmentSelection" && newVal) {
        this.groupList = [];

        var DEPARTMENT_ID = '';
        (newVal == null) ? DEPARTMENT_ID = "" : DEPARTMENT_ID = newVal.MANAGE_DEPARTMENT_ID;
        const response = await servicesModule04.getGroupByDepartmentId(DEPARTMENT_ID);
        this.groupList = response;
        //this.getGroup();
      } else  {

      }
      if(newVal && schema == "ALL_ACCESS" || schema == "editAccess.ALL_ACCESS"){
          this.screenList = [];
          this.screenListCount = this.screenList.length;
          this.screenListSave = [];
          this.screenListSaveCount = this.screenList.length;
      }
      this.isLoader = false; // Kill Loder
    },
    handleClick(newTab) {
      this.resetData();
      this.currentTab = newTab;
    }, // end tab
    back() {
      this.$router.go(-1);
    }, // back button

    //--------------------module---------------------------/
    getAllModule: async function () {
      const response = await servicesModule04.getAllModule();
      this.moduleList = response;
    },
    getScreenByModule: async function () {
      const response = await servicesModule04.getScreen(
        this.model.moduleSelection.MANAGE_MODULE_ID
      );
      this.screenList = response;
      this.screenListCount = this.screenList.length;
    },

    getScreen: async function () { 
      var MOD_ID = this.model.moduleSelection.MANAGE_MODULE_ID ? 
          this.model.moduleSelection.MANAGE_MODULE_ID : 
          this.model.editAccess.moduleSelection.MANAGE_MODULE_ID;

      var SUB_MOD_ID = this.model.submoduleSelection.MANAGE_SUBMODULE_ID ? 
          this.model.submoduleSelection.MANAGE_SUBMODULE_ID : 
          this.model.editAccess.submoduleSelection.MANAGE_SUBMODULE_ID;

      const response = await servicesModule04.getScreen(MOD_ID,SUB_MOD_ID);
      var screenData = response;

      // for selected exist
      var arrData =  this.screenListSave;
      var arr = [];
      arrData.forEach((item) => {  
         arr.push(item.MANAGE_SCREEN_ID);
      });
      screenData.forEach((item) => {  
        if(arr.includes(item.MANAGE_SCREEN_ID)){ 
          item.selected = true;
        }
      });
      this.screenList = screenData;
      this.screenListCount = this.screenList.length;
    },

    getAllScreens: async function () {
      const response = await servicesModule04.getAllScreens();
      this.screenList = response;
      this.screenListCount = this.screenList.length;
    },

    getDepartment: async function () {
      const response = await servicesModule04.getDepartmentByDivisionId(
        this.model.divisionSelection.MANAGE_DIVISION_ID
      );
      this.departmentList = response;
    },
    getGroup: async function () {
      const response = await servicesModule04.getGroupByDepartmentId(
        this.model.departmentSelection.MANAGE_DEPARTMENT_ID
      );
      this.groupList = response;
    },

    getAllSubmodule: async function () {
      if (this.hasModule) {
        // const response = await servicesModule0.getSubmodule(
        //   this.model.moduleSelection.MANAGE_MODULE_ID
        // );
        // this.submoduleList = response;
      }
    },
    async updateDivisionAPI() {
      try {
        const data = new FormData();
        data.append("MANAGE_MODULE_ID", this.MANAGE_MODULE_ID);
        data.append("MOD_NAME", this.model.editDivisionName);

        // console.log("data :" + data);
        // eslint-disable-next-line no-unused-vars
        const response = await servicesModule0.updateDivision(data);
        this.getAllModule();
      } catch (error) {
        console.log(error);
      }
    },
    //----------------------department-----------------/
    // getAllDepartment: async function() {
    //   const response = await servicesModule0.getAllDepartmentList();
    //   this.departmentList = response;
    // },
    async addDepartment() {
      if (this.$refs.Tab2Form.validate()) {
        const data = new FormData();
        data.append(
          "MANAGE_MODULE_ID",
          this.model.divisionSelection.MANAGE_MODULE_ID
        );
        data.append("DPMT_NAME", this.model.departmentName);
        try {
          // eslint-disable-next-line no-unused-vars
          const response = await servicesModule0.createDepartment(data);
          this.getDepartment();
        } catch (error) {
          console.log(error);
        }
      }
    },
    async deleteDepartment(data) {
      // eslint-disable-next-line no-unused-vars
      const response = await servicesModule0.deleteDepartment(
        data.MANAGE_DEPARTMENT_ID
      );
      this.getDepartment();
    },
    // async showAuthorizationLevelDetails(data) {
    //   this.$modals.editAuthorizationLevel.$show();
    // },
    async showScreenDetails(data) {
      // eslint-disable-next-line no-unused-vars
      const response = await servicesModule0.getDepartmentById(
        data.MANAGE_DEPARTMENT_ID
      );
      this.$modals.simpleModalEditDepartment.$show();
      this.MANAGE_DEPARTMENT_ID = response.MANAGE_DEPARTMENT_ID;
      this.model.DIVISION = response;
      this.model.DPMT_NAME = response.DPMT_NAME;
    },
    async updateDepartmentAPI() {
      try {
        const data = new FormData();
        data.append("MANAGE_DEPARTMENT_ID", this.MANAGE_DEPARTMENT_ID);
        data.append(
          "MANAGE_MODULE_ID",
          this.model.moduleSelection.MANAGE_MODULE_ID
        );
        data.append("DPMT_NAME", this.model.editDepartmentName);

        // console.log("data :" + data);
        // eslint-disable-next-line no-unused-vars
        const response = await servicesModule0.updateDepartment(data);
        this.getDepartment();
      } catch (error) {
        console.log(error);
      }
    },
    async deleteScreen(data){
      // eslint-disable-next-line no-unused-vars
      if (confirm("Are you sure you want to delete?")){
        this.isLoader = true; // Loder 
        const response = await servicesModule0.deleteScreenAccess(data.MANAGE_SCREEN_ACCESS_ID);
        this.getScreenAccesses();
        this.isLoader = false; // Kill Loder 
      }
    },
    async userScreen(data){
      // eslint-disable-next-line no-unused-vars
      this.isLoader = true; // Loder
      const response = await servicesModule04.getAuthLevelById(
         data.MANAGE_SCREEN_ACCESS_ID
      );
      this.MANAGE_SCREEN_ACCESS_ID = response.ScreenAccess.MANAGE_SCREEN_ACCESS_ID;
      this.setEditData(response);

      // Get Group User
      var userArray = this.staffList;
        userArray = userArray.filter(function( obj ) {
          return obj.USER_GROUP == data.MANAGE_GROUP_ID;
        });

      this.groupUserList = userArray;
      this.groupUserListCount = this.groupUserList.length;

      this.isLoader = false; // Kill Loder
      this.$modals.userAdditionalScreen.$show();
      
    },

  async addUserScreen(data){
    this.isLoader = true; // Kill Loder
    //this.moduleList = [];
    //this.submoduleList = [];
    this.model.editAccess.moduleSelection = "";
    this.model.editAccess.submoduleSelection = "";
    this.model.userAccess.USER_NAME = data.USER_NAME;
    var user_id = this.model.userAccess.USER_ID = data.USER_ID;
    var screen_id = this.model.userAccess.MANAGE_SCREEN_ACCESS_ID = this.MANAGE_SCREEN_ACCESS_ID;
    const response = await servicesModule04.getUserAdiScreen(user_id,screen_id);

    var screenData = response.Screen;
    this.screenListSaveCount = screenData.length;
    screenData.forEach((item) => { item.selected = true; });
    this.screenListSave = screenData;

    this.$modals.userAdditionalScreen.$hide();
    this.$modals.userAdditionalAddScreen.$show();
    this.isLoader = false; // Kill Loder

  },  

  // Insert function Additional Screen 
   async addUserAccessScreen(){
      this.isLoader = true; // Kill Loder
      this.checkboxArray = [];
      this.screenListSave.forEach((item) => {
        if (item.selected == true) {
          this.checkboxArray.push(item.MANAGE_SCREEN_ID);
        }
      });
      const data = new FormData();
      data.append("USER_ID", this.model.userAccess.USER_ID);
      data.append("SCREEN_ACCESS_ID", this.model.userAccess.MANAGE_SCREEN_ACCESS_ID);
      data.append("ADDITIONAL_SCREEN_ID", JSON.stringify(this.checkboxArray));
      const user = localStorage.getItem("user");
      data.append("CREATE_BY",JSON.parse(user).user_id);
      try {
          const response = await servicesModule04.createAdditionalUserScreen(data);
          if(response != 'error'){
            this.screenListSave = []; 
            this.getScreenAccesses();
            this.$modals.userAdditionalAddScreen.$hide();
          }
          
          this.isLoader = false; // Kill Loder

        } catch (error) {
          console.log(error);
        }

      
    }
    //----------------------group-----------------/
  },

  computed: {
    //tab1
    moduleFields() {
      return [
        {
          name: "__slot:no",
          title: "No",
        },
        {
          name: "MOD_NAME",
          title: "Module Name",
        },
        {
          name: "SUBMOD_NAME",
          title: "Submodule Name",
        },
        {
          name: "SCREEN_NAME",
          title: "Screen Name",
        },
        {
          name: "SCREEN_DESCRIPTION",
          title: "Description",
        },
        // {
        //   name: "__checkbox",
        //   titleClass: "center aligned",
        //   dataClass: "center aligned",
        // },
        {
          name: "__slot:actions",
          //name: "__checkbox:actions",
          title: "Action",
          dataClass: "justify-content-center",
        }
      ];
    },
    moduleFilteredData() {
      if (!this.term || this.term.length < 1) {
        return this.screenList;
      }
    },

    //Group User Field
    groupUserFields(){
      return [
        {
          name: "__slot:no",
          title: "No",
        },
        {
          name: "USER_NAME",
          title: "User Name",
        },
        {
          name: "__slot:actions",
          title: "Action",
          dataClass: "justify-content-center",
          width: "15%",
        }
      ]  
    },
    //tab2 
    groupAuthorizationSchema() {
      return [
        {
          name: "__slot:no",
          title: "No",
        },
        {
          name: "DIV_NAME",
          title: "DIVISION",
          sortField:"DIV_NAME",
        },
        {
          name: "DPMT_NAME",
          title: "DEPARTMENT",
          sortField:"DPMT_NAME",
        },
        {
          name: "GROUP_NAME",
          title: "GROUP",
          sortField:"GROUP_NAME",
        },
        {
          name: "AUTHORIZATION_LEVEL_NAME",
          title: "Authorization Level",
          sortField:"AUTHORIZATION_LEVEL_NAME",
        },
        {
          name: "__slot:actions",
          title: "Action",
          dataClass: "justify-content-center",
          width: "15%",
        },
      ];
    },
    groupAuthorizationFilteredData() {
      if (!this.term || this.term.length < 1) {
        return this.screenAccessList;
      }
    },
    //tab3
    groupFields() {
      return [
        {
          name: "__slot:no",
          title: "No",
        },
        {
          name: "MOD_NAME",
          title: "Module Name",
        },
        {
          name: "DPMT_NAME",
          title: "Department Name",
        },
        {
          name: "GROUP_NAME",
          title: "Group Name",
        },
        {
          name: "__slot:actions",
          title: "Action",
          dataClass: "justify-content-center",
          width: "200px",
        },
      ];
    },
    groupFilteredData() {
      if (!this.term || this.term.length < 1) {
        return this.groupList;
      }
    },
  },

  data() {
    return {
      // Data for loder
      isLoader: false,
      isDataReady:false,

      selected: [],
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
      groupUserList:[],
      groupUserListCount:null,
      departmentList: [],
      groupList: [],
      currentPage: 1,
      groupAllList: [],
      screenListSave: [],
      screenListSaveCount: null,

      searchDivisionList:[],
      searchDepartmentList:[],
      searchGroupList:[],

      tabs: TABS,
      currentTab: "tab1",

      MANAGE_SCREEN_ACCESS_ID:"",
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

        DIVISION: "",
        DPMT_NAME: "",
        ALL_ACCESS:false,

        editAuthLevel: {
          MANAGE_GROUP_ID: '',
          AUTHORIZATION_LEVEL_ID: '',
        },

        editAccess: {
          divisionName: "",
          editDivisionName: "",
          USER: '',
          moduleSelection: "",
          submoduleSelection: "",
          divisionSelection:"",
          departmentSelection: "",
          groupSelection: "",
          authorizationSelection: "",
          departmentName: "",
          editDepartmentName: "",
          DIVISION: "",
          DPMT_NAME: "",
          ALL_ACCESS:false
        },
        searchAccess: {
          divisionSelection:"",
          departmentSelection: "",
          groupSelection: "",
          searchText:"",
        },
        userAccess: {
          USER_NAME:"",
          USER_ID: "",
          ACCESS_ID: "",
          MANAGE_SCREEN_ACCESS_ID:"",
        },

      },
      //Module
      editAuthSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "vueMultiSelect",
                model: "editAuthLevel.MANAGE_GROUP_ID",
                label: "Group",
                placeholder: "Select Group",
                selectOptions: {
                  multiple: false,
                  key: "MANAGE_GROUP_ID",
                  label: "GROUP_NAME",
                  searchable: true
                },
                values: (model, schema) => {
                  return this.groupAllList;
                },
                styleClasses: "col-md-12"
              },
              {
                type: "vueMultiSelect",
                model: "editAuthLevel.AUTHORIZATION_LEVEL_ID",
                label: "Authorization Level",
                placeholder: "Select Authorization Level",
                selectOptions: {
                  multiple: false,
                  key: "AUTHORIZATION_LEVEL_ID",
                  label: "AUTHORIZATION_LEVEL_NAME",
                  searchable: true
                },
                values: (model, schema) => {
                  return this.authorizationList;
                },
                styleClasses: "col-md-12"
              },
            ],
          },
        ],
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
                  key: "MANAGE_MODULE_ID",
                  label: "MOD_NAME",
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.moduleList;
                },
                styleClasses: "col-md-6",
                required: true,
                validator: "required",
              },
              {
                label: "Sub Module Name",
                type: "vueMultiSelect",
                model: "submoduleSelection",
                placeholder: "Select Submodule",
                selectOptions: {
                  multiple: false,
                  key: "MANAGE_SUBMODULE_ID",
                  label: "SUBMOD_NAME",
                  searchable: true,
                },
                disabled: (model, schema) => {
                  if (this.model.moduleSelection) {
                    return false;
                  } else {
                    return true;
                  }
                },
                values: (model, schema) => {
                  return this.submoduleList;
                },
                styleClasses: "col-md-6",
              },
            ],
          },
        ],
      },
 
      searchSchema: {
        groups: [
          {
            styleClasses: "row mt-2",
            fields: [
              {
                type: "vueMultiSelect",
                model: "searchAccess.divisionSelection",
                placeholder: "Select Division",
                selectOptions: {
                  multiple: false,
                  key: "MANAGE_DIVISION_ID",
                  label: "DIV_NAME",
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.searchDivisionList;
                },
                styleClasses: "col-md-4",
                required: true,
                validator: "required",
              },
              {
                type: "vueMultiSelect",
                model: "searchAccess.departmentSelection",
                placeholder: "Select Department",
                selectOptions: {
                  multiple: false,
                  key: "MANAGE_DEPARTMENT_ID",
                  label: "DPMT_NAME",
                  searchable: true,
                },
                disabled: (model, schema) => {
                  if (this.model.searchAccess.divisionSelection) {
                    return false;
                  } else {
                    return true;
                  }
                },
                values: (model, schema) => {
                  return this.searchDepartmentList;
                },
                styleClasses: "col-md-4",
                required: true,
                validator: "required",
              },
              {
                type: "vueMultiSelect",
                model: "searchAccess.groupSelection",
                placeholder: "Select Group",
                selectOptions: {
                  multiple: false,
                  key: "MANAGE_GROUP_ID",
                  label: "GROUP_NAME",
                  searchable: true,
                },
                disabled: (model, schema) => {
                  if (this.model.searchAccess.departmentSelection) {
                    return false;
                  } else {
                    return true;
                  }
                },
                values: (model, schema) => {
                  return this.searchGroupList;
                },
                styleClasses: "col-md-4",
                required: true,
                validator: "required",
              },
              // {
              //   type: "vfg-search",
              //   model: "searchAccess.searchText",
              //   placeholder: "Search",
              //   styleClasses: "col-md-3",
              // },
            ],
          },
        ],
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
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.staffList;
                },
                styleClasses: "col-md-12",
              },
            ],
          },
        ],
      },
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
              {
                type: "vueMultiSelect",
                model: "authorizationSelection",
                label: "Authorization Level",
                required: true,
                placeholder: "Select Authorization Level",
                selectOptions: {
                  multiple: false,
                  key: "AUTHORIZATION_LEVEL_ID",
                  label: "AUTHORIZATION_LEVEL_NAME",
                  searchable: true,
                },
                disabled: (model, schema) => {
                  if (this.model.groupSelection) {
                    return false;
                  } else {
                    return true;
                  }
                },
                values: (model, schema) => {
                  return this.authorizationList;
                },
                styleClasses: "col-md-6",
                required: true,
                validator: "required",
              },
              {
                type: 'checkbox',
                label: 'Give All Access',
                model: 'ALL_ACCESS',
              }
            ],
          },
        ],
      },

      editTab1Schema: {
        groups: [
          {
            styleClasses: "row mt-2",
            fields: [
              {
                label: "Module Name",
                type: "vueMultiSelect",
                model: "editAccess.moduleSelection",
                placeholder: "Select Module",
                selectOptions: {
                  multiple: false,
                  key: "MANAGE_MODULE_ID",
                  label: "MOD_NAME",
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.moduleList;
                },
                styleClasses: "col-md-6",
                required: true,
                validator: "required",
              },
              {
                label: "Sub Module Name",
                type: "vueMultiSelect",
                model: "editAccess.submoduleSelection",
                placeholder: "Select Submodule",
                selectOptions: {
                  multiple: false,
                  key: "MANAGE_SUBMODULE_ID",
                  label: "SUBMOD_NAME",
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.submoduleList;
                },
                styleClasses: "col-md-6",
              },
            ],
          },
        ],
      },
      
      editTab1SelectStaff: {
        groups: [
          {
            styleClasses: "row mt-2",
            fields: [
              {
                type: "vueMultiSelect",
                model: "editAccess.USER",
                label: "Staff Name",
                placeholder: "Select Staff",
                selectOptions: {
                  multiple: false,
                  key: "USER_ID",
                  label: "USER_NAME",
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.staffList;
                },
                styleClasses: "col-md-12",
              },
            ],
          },
        ],
      },
      editTab1ConfigSchema: {
        groups: [
          {
            styleClasses: "row mt-2",
            fields: [
              {
                type: "vueMultiSelect",
                model: "editAccess.divisionSelection",
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
                model: "editAccess.departmentSelection",
                label: "Department Name",
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
                model: "editAccess.groupSelection",
                label: "Group Name",
                required: true,
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
              {
                type: "vueMultiSelect",
                model: "editAccess.authorizationSelection",
                label: "Authorization Level",
                required: true,
                placeholder: "Select Authorization Level",
                selectOptions: {
                  multiple: false,
                  key: "AUTHORIZATION_LEVEL_ID",
                  label: "AUTHORIZATION_LEVEL_NAME",
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.authorizationList;
                },
                styleClasses: "col-md-6",
                required: true,
                validator: "required",
              },
              {
                type: 'checkbox',
                label: '&nbsp;&nbsp; Give All Access',
                model: 'editAccess.ALL_ACCESS',
              }
            ],
          },
        ],
      },

      //Group

      formOptions: {
        validateAfterChanged: true,
      },
    };
  },
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

/* eslint-disable no-unused-expressions */
<template>
  <va-card>
    <loder v-show="isLoader" />
    <div class="text-center text-danger my-2" v-if="!isDataReady">
      <b-spinner class="align-middle"></b-spinner>
      <strong>Loading...</strong>
    </div>
    <div v-else>

      <!-- Module -->
      <vudal name="EditModulePage" class="widthModal">
        <div class="header">
          Edit Screen and Module Management<i class="close icon">&times;</i>
        </div>
        <div class="">
          <vue-form-generator
            :model="model"
            :schema="editModuleSchema"
            :options="formOptions"
            ref="Tab1FormUpdate"
          />
          <br />
          <b-form-group label="SELECT MENU ICON" v-slot="{ ariaDescribedby }" style="padding-left: 10px">
            <horizontal-scroll>
              <div style="margin: 10px 10px 10px 10px;">
                <b-form-radio-group
                  id="radio-slots"
                  v-model="selectedIcon2"
                  :aria-describedby="ariaDescribedby"
                  name="radio-options-slots"
                >
                  <b-form-radio
                    v-for="icon in icons1"
                    :key="icon"
                    name="some-radios"
                    :value="icon"
                  >
                    <i :class="icon"></i>
                  </b-form-radio>
                </b-form-radio-group>
                <br />
                <b-form-radio-group
                  id="radio-slots"
                  v-model="selectedIcon2"
                  :aria-describedby="ariaDescribedby"
                  name="radio-options-slots"
                >
                  <b-form-radio
                    v-for="icon in icons2"
                    :key="icon"
                    name="some-radios"
                    :value="icon"
                  >
                    <i :class="icon"></i>
                  </b-form-radio>
                </b-form-radio-group>
                <br />
                <b-form-radio-group
                  id="radio-slots"
                  v-model="selectedIcon2"
                  :aria-describedby="ariaDescribedby"
                  name="radio-options-slots"
                >
                  <b-form-radio
                    v-for="icon in icons3"
                    :key="icon"
                    name="some-radios"
                    :value="icon"
                  >
                    <i :class="icon"></i>
                  </b-form-radio>
                </b-form-radio-group>
              </div>
            </horizontal-scroll>
          </b-form-group>
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
            @click="updateModuleAPI"
            type="button"
            class="vudal-btn mr-2 btn btn-primary btn-fill btn-md"
          >
            <i class="fa fa-edit" /> &nbsp; {{ updateButton }}
          </button>
        </div>
      </vudal>
      <!-- submodule -->
      <vudal name="simpleModalEditSubmodule" class="widthModal">
        <div class="header">
          Edit Division<i class="close icon">&times;</i>
        </div>
        <div class="content">
          <vue-form-generator
            :model="model"
            :schema="editSubmoduleSchema"
            :options="formOptions"
            ref="Tab2FormUpdate"
          />
        </div>
        <div class="actions">
          <button
            type="button"
            class="cancel vudal-btn mr-2 btn btn-danger btn-fill btn-md"
            @click="isLoader = false"
          >
            <i class="fa fa-times" /> &nbsp; Close
          </button>
          <button
            @click="updateSubmoduleAPI"
            type="button"
            class="vudal-btn mr-2 btn btn-primary btn-fill btn-md"
          >
            <i class="fa fa-edit" /> &nbsp; {{ updateButton }}
          </button>
        </div>
      </vudal>
      <!-- department -->
      <vudal name="simpleModalEditScreen" class="widthModal">
        <loder v-show="isLoader" />
        <div class="header">
          Screen Authorization Details<i class="close icon">&times;</i>
        </div>
        <div class=" ">
          <vue-form-generator
            :model="model"
            :schema="editScreenSchema"
            :options="formOptions"
            @model-updated="onModuleUpdated"
            ref="editScreenForm"
          />
        </div>
        <div class="actions">
          <button
            type="button"
            class="cancel vudal-btn mr-2 btn btn-danger btn-fill btn-md"
          >
            <i class="fa fa-times" /> &nbsp; Close
          </button>
          <button
            @click="updateScreenAPI"
            type="button"
            class="vudal-btn mr-2 btn btn-primary btn-fill btn-md"
          >
            <i class="fa fa-edit" /> &nbsp; {{ updateButton }}
          </button>
        </div>
      </vudal>
      <!-- group -->

      <h4 slot="header" class="card-title">Screen and Module Management</h4>
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
          <br />
          <vue-form-generator 
            :model="model"
            :schema="Tab1Schema"
            :options="formOptions"
            ref="Tab1Form"
          >
          </vue-form-generator>
          <br />
          <b-form-group label="SELECT MENU ICON *" v-slot="{ ariaDescribedby }">
            <horizontal-scroll>
              <div style="margin: 10px 10px 10px 10px;">
                <b-form-radio-group
                  id="radio-slots"
                  v-model="selectedIcon1"
                  :aria-describedby="ariaDescribedby"
                  name="radio-options-slots"
                >
                  <b-form-radio
                    v-for="icon in icons1"
                    :key="icon"
                    name="some-radios"
                    :value="icon"
                  >
                    <i :class="icon"></i>
                  </b-form-radio>
                </b-form-radio-group>
                <br />
                <b-form-radio-group
                  id="radio-slots"
                  v-model="selectedIcon1"
                  :aria-describedby="ariaDescribedby"
                  name="radio-options-slots"
                >
                  <b-form-radio
                    v-for="icon in icons2"
                    :key="icon"
                    name="some-radios"
                    :value="icon"
                  >
                    <i :class="icon"></i>
                  </b-form-radio>
                </b-form-radio-group>
                <br />
                <b-form-radio-group
                  id="radio-slots"
                  v-model="selectedIcon1"
                  :aria-describedby="ariaDescribedby"
                  name="radio-options-slots"
                >
                  <b-form-radio
                    v-for="icon in icons3"
                    :key="icon"
                    name="some-radios"
                    :value="icon"
                  >
                    <i :class="icon"></i>
                  </b-form-radio>
                </b-form-radio-group>
              </div>
            </horizontal-scroll>
          </b-form-group>
          <br />
          <div class="text-center">
              <button
                @click="addModule"
                type="button"
                class="btn btn-warning btn-fill btn-md"
              >
                <i class="fa fa-plus" /> &nbsp; Add Parameter
              </button>
            </div>
          <br />
          <div class="float-right">
            <va-input
              :value="term"
              :placeholder="$t('Search')"
              @input="searchModule" 
              removable
            >
              <va-icon name="fa fa-search" slot="prepend" />
            </va-input>
          </div>
          <br />
          <h4>List of Module</h4>
          <br />
          <!-- list -->
          <va-card class="mt-2">
            <va-data-table
              :datacount="moduleListCount"
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
              <template slot="icons" slot-scope="props">
                <i :class="props.rowData.MOD_ICON"></i>
              </template>
              <template slot="actions" slot-scope="props">
                  <h4 class="mt-2">
                    <span
                      class="badge badge-primary mr-1"
                      v-on:click="editModule(props.rowData)"
                    >
                      <i class="fa fa-edit"></i
                    ></span>
                    <span
                      class="badge badge-danger mr-1"
                      v-on:click="deleteModule(props.rowData)"
                    >
                      <i class="fa fa-trash"></i
                    ></span>
                  </h4>
                </template>
            </va-data-table>
          </va-card>
          <br /><br />
        </div>
        
        <div v-if="currentTab === 'tab2'">
          <br />
          <vue-form-generator
            :model="model"
            :schema="Tab2Schema"
            :options="formOptions"
            ref="Tab2Form"
          >
          </vue-form-generator>

          <br/>
          <div class="text-center">
              <button
                @click="addSubmodule"
                type="button"
                class="btn btn-warning btn-fill btn-md"
              >
                <i class="fa fa-plus" /> &nbsp; Add Parameter
              </button>
            </div>
          <br/>
          <div class="float-right">
            <va-input
              :value="term"
              :placeholder="$t('Search')"
              @input="searchSubModule" 
              removable
            >
              <va-icon name="fa fa-search" slot="prepend" />
            </va-input>
          </div>
          <br />
          <h4>List of Sub Module</h4>
          <va-card class="mt-2">
            <va-data-table
              :datacount="submoduleListCount"
              :dataperpage="parseInt(perPage)"
              :fields="submoduleSchema"
              :data="submoduleFilteredData"
              :per-page="parseInt(perPage)"
              @page-size="getChangePage"
              clickable
            >
              <template slot="no" slot-scope="row">
                {{ row.rowIndex + 1 }}
              </template>

              <template slot="actions" slot-scope="props">
                  <h4 class="mt-2">
                    <span
                      class="badge badge-primary mr-1"
                      v-on:click="editSubmodule(props.rowData)"
                    >
                      <i class="fa fa-edit"></i
                    ></span>
                    <span
                      class="badge badge-danger mr-1"
                      v-on:click="deleteSubmodule(props.rowData)"
                    >
                      <i class="fa fa-trash"></i
                    ></span>
                  </h4>
              </template>
            </va-data-table>
          </va-card>
        </div>
        <div v-if="currentTab === 'tab3'">
          <br />
          <vue-form-generator
            :model="model"
            :schema="Tab3Schema"
            :options="formOptions"
            @model-updated="onModuleUpdated"
            ref="Tab3Form"
          >
          </vue-form-generator>
          <br/>
          <div class="text-center">
              <button
                @click="addScreen"
                type="button"
                class="btn btn-warning btn-fill btn-md"
              >
                <i class="fa fa-plus" /> &nbsp; Add Parameter
              </button>
            </div>
          <br />
          <div class="float-right">
            <va-input
              :value="term"
              :placeholder="$t('Search')"
              @input="searchSubModule" 
              removable
            >
              <va-icon name="fa fa-search" slot="prepend" />
            </va-input>
          </div>
          <br />
          <h4>List of Screen Management</h4>
          <!-- list -->
          <va-card class="mt-2">
            <va-data-table
              :datacount="screenPageListCount"
              :dataperpage="parseInt(perPage)"
              :fields="screenPageFields"
              :data="screenPageFilteredData"
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
                      v-on:click="editScreen(props.rowData)"
                    >
                      <i class="fa fa-edit"></i
                    ></span>
                    <span
                      class="badge badge-danger mr-1"
                      v-on:click="deleteScreen(props.rowData)"
                    >
                      <i class="fa fa-trash"></i
                    ></span>
                  </h4>
              </template>
            </va-data-table>
          </va-card>
          <br /><br />
        </div>
      </div>
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
import { debounce } from "lodash";
import loder from "../../request_loader";

import data1 from "./data1.json";
import data2 from "./data2.json";
import data3 from "./data3.json";
import HorizontalScroll from "vue-horizontal-scroll";
import "vue-horizontal-scroll/dist/vue-horizontal-scroll.css";

import Vue from "vue";
import VueToast from "vue-toast-notification";
// Import one of the available themes
//import 'vue-toast-notification/dist/theme-default.css';
import "vue-toast-notification/dist/theme-sugar.css";

Vue.use(VueToast);

const TABS = [
  { title: "Setting 1 : Module", value: "tab1" },
  { title: "Setting 2 : Sub Module", value: "tab2" },
  { title: "Setting 3 : Screen Page", value: "tab3" }
];

export default {
  watch: {},
  mounted() {
    (this.icons1 = data1), (this.icons2 = data2), (this.icons3 = data3);
    this.getAllSubmodule();
    this.getAllPageList();
    this.getAllProcessflow();
    this.getAllModule();
  },
  components: {
    Tabs,
    Vudal,
    HorizontalScroll,
    loder
  },
  props: {
    id: {
      default: "N/A"
    }
  },

  methods: {
    getChangePage(value) {
      this.perPage = value;
    },
    async submit() {
      this.checkboxArray = [];
      this.screenList.forEach(item => {
        if (item.selected == true) {
          this.checkboxArray.push(item.MANAGE_SCREEN_ID);
        }
      });
      // alert(this.checkboxArray)
      const data = new FormData();
      data.append("MANAGE_GROUP_ID", this.model.groupSelection.MANAGE_GROUP_ID);
      data.append("AUTHORIZATION_LEVEL_ID", this.authorizationLevel);
      data.append("MANAGE_SCREEN_ID", JSON.stringify(this.checkboxArray));
      try {
        const response = await servicesModule0.createScreenAccess(data);
      } catch (error) {
        console.log(error);
      }
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

    getDivision: async function() {
      const response = await servicesModule04.getAllDivisionList();
      this.divisionList = response;

      // alert(this.divisionList)
    },

    getAuthorizationLevel: async function() {
      const response = await servicesModule04.getAllSettingGeneralList(
        "AUTHORIZATIONLEVEL"
      );
      this.authorizationList = response;
    },

    onModuleUpdated: async function(newVal, schema) {  
      this.isLoader = true; // Loader
      if(newVal == null){
        var id = '';
      }else{
        var id = newVal.MANAGE_MODULE_ID;
      }
      if (schema == "moduleSelection" || schema == "editScreen.moduleSelection") {
        this.model.submoduleSelection = [];
        const response = await servicesModule04.getSubmodule(id);
        this.getSubmoduleList = response;
      }
      this.isLoader = false; // Kill Loader
    },

    handleClick(newTab) {
      this.currentTab = newTab;
    }, // end tab
    back() {
      this.$router.go(-1);
    }, // back button

  
    //--------------------module---------------------------/
    //search Module
    searchModule: debounce(function (term) {
      this.term = term;
    }, 400),

    getAllModule: async function() {
      const response = await servicesModule04.getAllModule();
      this.moduleList = response;
      this.moduleListCount = this.moduleList.length;
      // Loder before component load
      this.isDataReady = true; 
    },
    async addModule() {
      if (this.$refs.Tab1Form.validate()) {
        try {
          this.isLoader = true; // Loder Before Add
          const data = new FormData();
          data.append("MOD_CODE", this.model.MOD_CODE);
          data.append("MOD_NAME", this.model.MOD_NAME);
          data.append("MOD_SNAME", this.model.MOD_SNAME);
          data.append("MOD_INDEX", this.model.MOD_INDEX);
          data.append("MOD_ICON", this.selectedIcon1);
          // console.log("data :" + data);
          // eslint-disable-next-line no-unused-vars
          const response = await servicesModule04.createModule(data);
          //console.log(response);
          if(response != 'error'){
            this.resetModule();
            this.getAllModule();
          }
          
          this.isLoader = false; // Kill Add Loader
        } catch (error) {
          console.log(error);
        }
      }  
    },
    // Form reset method
    resetModule(){
        this.model.MOD_CODE = '';
        this.model.MOD_NAME = '';
        this.model.MOD_SNAME = '';
        this.model.MOD_INDEX = '';
        this.selectedIcon1 = '';
    },

     async editModule(data) {
       this.isLoader = true; // Loder Before Edit
      const response = await servicesModule04.getManageModuleById(
        data.MANAGE_MODULE_ID
      );
      this.$modals.EditModulePage.$show();
      this.MANAGE_MODULE_ID = response.MANAGE_MODULE_ID;
      this.model.editModule = response;
      this.selectedIcon2 = response.MOD_ICON;
      // this.model.editModule.MOD_CODE = response.MOD_CODE;
      // this.model.editModule.MOD_NAME = response.MOD_NAME;
      // this.model.editModule.MOD_SNMAE = response.MOD_SNAME;
      // this.model.editModule.MOD_INDEX = response.MOD_INDEX;
      //console.log(response);

      this.isLoader = false; // Kill Before Edit
    },

    async updateModuleAPI() {
      try {
        if (this.$refs.Tab1FormUpdate.validate()) {
          this.updateButton = 'Loading...'; // Loder Button before update
          const data = new FormData();
          data.append(
            "MANAGE_MODULE_ID",
            this.MANAGE_MODULE_ID
          );
          data.append("MOD_CODE", this.model.editModule.MOD_CODE);
          data.append("MOD_NAME", this.model.editModule.MOD_NAME);
          data.append("MOD_SNAME", this.model.editModule.MOD_SNAME);
          data.append("MOD_INDEX", this.model.editModule.MOD_INDEX); 
          data.append("MOD_ICON", this.selectedIcon2);       
          const response = await servicesModule04.updateManageModule(data);
          this.getAllModule();
          this.updateButton = 'Update'; // Loder Button before update
          this.$modals.EditModulePage.$hide();
        }  
      } catch (error) {
        console.log(error);
      }
    },
    async deleteModule(data) {
      // eslint-disable-next-line no-unused-vars
      if (confirm("Are you sure you want to delete?")){
        this.isLoader = true; // Loder before delete
        const response = await servicesModule04.deleteManageModule(
          data.MANAGE_MODULE_ID
        );
        this.getAllModule();
        this.isLoader = false; // Kill before delete
      }
    },


    //------------- submodule 
    //search Sub Module
    searchSubModule: debounce(function (term) {
      this.term = term;
    }, 400),

    getAllSubmodule: async function() {
      const response = await servicesModule04.getSubmoduleAll();
      this.submoduleList = response;
      this.submoduleListCount = this.submoduleList.length;
    },

    async addSubmodule() {
      if (this.$refs.Tab2Form.validate()) {
        try {
          this.isLoader = true; // Loder Before Add
          const data = new FormData();
          data.append("SUBMOD_CODE", this.model.SUBMOD_CODE);
          data.append("SUBMOD_NAME", this.model.SUBMOD_NAME);
          data.append(
            "MANAGE_MODULE_ID",
            this.model.moduleSelection.MANAGE_MODULE_ID
          );
          // console.log("data :" + data);
          // eslint-disable-next-line no-unused-vars
          const response = await servicesModule04.createSubmodule(data);
          //console.log(response);
          this.resetSubModule();
          this.getAllSubmodule();
          this.isLoader = false; // Kill Loder
        } catch (error) {
          console.log(error);
        }
      }  
    },
    // Reset submodule add form
    resetSubModule(){
      this.model.SUBMOD_CODE = '';
      this.model.SUBMOD_NAME = '';
      this.model.moduleSelection = '';
    },
    async editSubmodule(data) {
      this.isLoader = true; // Loder Before edit
      const response = await servicesModule04.getManageSubModuleById(
        data.MANAGE_SUBMODULE_ID
      );
      this.$modals.simpleModalEditSubmodule.$show();
      this.MANAGE_SUBMODULE_ID = response.MANAGE_SUBMODULE_ID;
      this.model.editSubmodule = response;
      this.model.editSubmodule.moduleSelection = {
        MANAGE_MODULE_ID: response.MANAGE_MODULE_ID,
        MOD_NAME: response.MOD_NAME,
      };
      this.model.editSubmodule.SUBMOD_CODE = response.SUBMOD_CODE;
      this.model.editSubmodule.SUBMOD_NAME = response.SUBMOD_NAME;
      this.$modals.simpleModalEditSubmodule.$show();

      this.isLoader = false; // Kill Loder
    },
    async updateSubmoduleAPI() {
      try {
        if (this.$refs.Tab2FormUpdate.validate()) {
          //this.isLoader = true; // Loder Before Add
          this.updateButton = "Loding..."; // Loder update button
          const data = new FormData();
          data.append(
            "MANAGE_SUBMODULE_ID",
            this.MANAGE_SUBMODULE_ID
          );
          data.append("MANAGE_MODULE_ID", this.model.editSubmodule.moduleSelection.MANAGE_MODULE_ID);
          data.append("SUBMOD_NAME", this.model.editSubmodule.SUBMOD_NAME);
          data.append("SUBMOD_CODE", this.model.editSubmodule.SUBMOD_CODE);
          const response = await servicesModule04.updateManageSubModule(data);

          this.getAllSubmodule();

          //this.isLoader = false; // Kill Loder Before Add
          this.updateButton = "Update"; // Kill Loder update button
          this.$modals.simpleModalEditSubmodule.$hide(); // Kill Modal
        }  
      } catch (error) {
        console.log(error);
      }
    },
    async deleteSubmodule(data) {
      // eslint-disable-next-line no-unused-vars
      if (confirm("Are you sure you want to delete?")){
        this.isLoader = true; // Loder before delete
        const response = await servicesModule04.deleteManageSubModule(
        data.MANAGE_SUBMODULE_ID
        );
        this.getAllSubmodule();
        this.isLoader = false; // Kill before delete
      }
      
    },

  //------------- Manage Screen --
   getAllGetSubmodule: async function() {
      const response = await servicesModule04.getAllsubModuleList();
      this.getSubmoduleList = response;
    },
  getAllProcessflow: async function() {
      const response = await servicesModule04.getAllProcessFlowList();
      this.processflowList = response;
    },

  getAllPageList: async function() {
      const response = await servicesModule04.getAllScreens();
      this.screenPageList = response;
      this.screenPageListCount = this.screenPageList.length;
    },
async addScreen() {
    if (this.$refs.Tab3Form.validate()) {
      this.isLoader = true; // Loder Before add
          try {
            const data = new FormData();
            data.append("MANAGE_MODULE_ID", this.model.moduleSelection.MANAGE_MODULE_ID);
            data.append("MANAGE_SUBMODULE_ID", this.model.submoduleSelection.MANAGE_SUBMODULE_ID);
            data.append("SCREEN_NAME", this.model.SCREEN_NAME);
            data.append("SCREEN_ROUTE", this.model.PAGE_ROUTE);
            data.append("SCREEN_PROCESS", this.model.SCREEN_PROCESS.PROCESS_FLOW_ID);
            data.append("SCREEN_DESCRIPTION", this.model.SCREEN_DESCRIPTION);
            data.append("SCREEN_CODE", this.model.SCREEN_CODE);
            // console.log("data :" + data);
            // eslint-disable-next-line no-unused-vars
            const response = await servicesModule04.createScreen(data);
            if(response != 'error'){
              this.resetScreen();
              this.getAllPageList();
            }
            this.isLoader = false; // Kill Loder 
          } catch (error) {
            //console.log(error);
          }
    }    
  },

resetScreen(){
    this.model.moduleSelection = '';
    this.model.submoduleSelection = '';
    this.model.SCREEN_NAME = '';
    this.model.PAGE_ROUTE = '';
    this.model.SCREEN_PROCESS = '';
    this.model.SCREEN_DESCRIPTION = '';
    this.model.SCREEN_CODE = "";
},
async editScreen(data) { 
      this.isLoader = true; // Loder Before edit
      const response = await servicesModule04.getManageScreenById(
        data.MANAGE_SCREEN_ID
      );
      console.log('Edit Data Here -------',response);
      this.$modals.simpleModalEditScreen.$show();
      this.MANAGE_SCREEN_ID = response.MANAGE_SCREEN_ID;
      this.model.editScreen.SCREEN_NAME = response.SCREEN_NAME;
      this.model.editScreen.PAGE_ROUTE = response.SCREEN_ROUTE;
      this.model.editScreen.SCREEN_DESCRIPTION = response.SCREEN_DESCRIPTION;
      
      this.model.editScreen.moduleSelection = {
        MANAGE_MODULE_ID : response.MANAGE_MODULE_ID,
        MOD_NAME : response.MOD_NAME
      }
      this.model.editScreen.submoduleSelection = {
        MANAGE_SUBMODULE_ID : response.MANAGE_SUBMODULE_ID,
        SUBMOD_NAME : response.SUBMOD_NAME
      }
      this.model.editScreen.SCREEN_PROCESS = {
        PROCESS_FLOW_ID : response.PROCESS_FLOW_ID,
        PROCESS_FLOW_NAME : response.PROCESS_FLOW_NAME
      }
      this.model.editScreen.SCREEN_CODE = response.SCREEN_CODE;
      

      // this.model.editScreen.moduleSelection = response.MOD_NAME;
      // this.model.editScreen.submoduleSelection = response.SUBMOD_NAME;
      // this.model.editScreen.PROCESS_FLOW = response.PROCESS_FLOW_NAME;

      this.isLoader = false; // Kill Before edit
    },

    async updateScreenAPI() {
      try {
        if (this.$refs.editScreenForm.validate()) {
          this.isLoader = true; // Loder Before edit
          this.updateButton = "Loding..."; // Loder update button
          const data = new FormData();
          data.append("MANAGE_SCREEN_ID", this.MANAGE_SCREEN_ID);
          data.append("MANAGE_MODULE_ID", this.model.editScreen.moduleSelection.MANAGE_MODULE_ID);
          data.append("MANAGE_SUBMODULE_ID", this.model.editScreen.submoduleSelection.MANAGE_SUBMODULE_ID);
          data.append("SCREEN_NAME", this.model.editScreen.SCREEN_NAME);
          data.append("SCREEN_ROUTE", this.model.editScreen.PAGE_ROUTE);
          data.append("SCREEN_PROCESS", this.model.editScreen.SCREEN_PROCESS.PROCESS_FLOW_ID);
          data.append("SCREEN_DESCRIPTION", this.model.editScreen.SCREEN_DESCRIPTION);
          data.append("SCREEN_CODE", this.model.editScreen.SCREEN_CODE);
          
          const response = await servicesModule04.updateManageScreen(data);
          this.updateButton = "Update"; // Kill Loder update button
          this.getAllPageList();
          this.updateButton = "Update"; // Kill Loder update button
          this.isLoader = false; // Kill Loader Before edit
          this.$modals.simpleModalEditScreen.$hide();

        }  
      } catch (error) {
        console.log(error);
      }
    },
    async deleteScreen(data) {
      // eslint-disable-next-line no-unused-vars
      if (confirm("Are you sure you want to delete?")){
        this.isLoader = true; // Loder before delete
        const response = await servicesModule04.deleteManageScreen(
          data.MANAGE_SCREEN_ID
        );
        this.getAllPageList();
        this.isLoader = false; // Kill Loader
      }  
    },
      




    //------------ 
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
      if (confirm("Are you sure you want to delete?")){
        this.isLoader = true; // Loder before delete
        const response = await servicesModule0.deleteDepartment(
        data.MANAGE_DEPARTMENT_ID
        );
        this.getDepartment();
        this.isLoader = false; // Kill before delete
      }
      
    },
    async showAuthorizationLevelDetails(data) {
      this.$modals.editAuthorizationLevel.$show();
    },
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
    }
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
          name: "MOD_CODE",
          title: "Code"
        },
        {
          name: "MOD_NAME",
          title: "Module Name"
        },
        {
          name: "MOD_SNAME",
          title: "Short Name"
        },
        {
          name: "MOD_INDEX",
          title: "Index"
        },
        {
          name: "__slot:icons",
          title: "Icon",
          dataClass: "justify-content-center",
          width: "15%"
        },
        {
          name: "__slot:actions",
          title: "Action",
          dataClass: "justify-content-center",
          width: "15%"
        }
      ];
    },

    // Module Data Filter
    moduleFilteredData() {
      if (!this.term || this.term.length < 1) {
        return this.moduleList
      }

      return this.moduleList.filter((item) => {
        return this.term
          .toLowerCase()
          .split(" ")
          .every(
            (v) =>
              item.MOD_CODE.toLowerCase().includes(v) || 
              item.MOD_NAME.toLowerCase().includes(v) || 
              item.MOD_SNAME.toLowerCase().includes(v)
          );
      });
    },

    //tab2
    submoduleSchema() {
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
          name: "SUBMOD_CODE",
          title: "Sub Module Code"
        },
        {
          name: "SUBMOD_NAME",
          title: "Sub Module Name"
        },
        {
          name: "__slot:actions",
          title: "Action",
          dataClass: "justify-content-center",
          width: "15%"
        }
      ];
    },
    // sub module filter
    submoduleFilteredData() {
      if (!this.term || this.term.length < 1) {
        return this.submoduleList
      }

      return this.submoduleList.filter((item) => {
        return this.term
          .toLowerCase()
          .split(" ")
          .every(
            (v) =>
              item.SUBMOD_NAME.toLowerCase().includes(v) || 
              item.SUBMOD_CODE.toLowerCase().includes(v) || 
              item.MOD_NAME.toLowerCase().includes(v) || 
              item.MOD_CODE.toLowerCase().includes(v)
          );
      });
    },
  
    //tab3
    screenPageFields() {
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
          name: "SUBMOD_NAME",
          title: "Submodule Name"
        },
        {
          name: "SCREEN_NAME",
          title: "Screen Name"
        },
        {
          name: "SCREEN_CODE",
          title: "Code"
        },
        
        {
          name: "SCREEN_ROUTE",
          title: "Page Route"
        },
        {
          name: "PROCESS_FLOW_NAME",
          title: "Process Flow"
        },
        {
          name: "SCREEN_DESCRIPTION",
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
    // sub module filter
    screenPageFilteredData() {
      if (!this.term || this.term.length < 1) {
        return this.screenPageList
      }

      return this.screenPageList.filter((item) => {
        return this.term
          .toLowerCase()
          .split(" ")
          .every(
            (v) =>
              item.SUBMOD_NAME.toLowerCase().includes(v) || 
              item.MOD_NAME.toLowerCase().includes(v) || 
              item.SCREEN_NAME.toLowerCase().includes(v) || 
              item.SCREEN_ROUTE.toLowerCase().includes(v) || 
              item.PROCESS_FLOW_NAME.toLowerCase().includes(v) || 
              item.SCREEN_DESCRIPTION.toLowerCase().includes(v) || 
              item.SCREEN_CODE.toLowerCase().includes(v)  
          );
      });
    },
  },

  data() {
    return {
      // Data for loder
      isLoader: false,
      isDataReady:false,
      updateButton : 'Update',
      addButton : 'Add',

      valueId: this.id,
      editSelectedIcon: "",
      moduleListCount: null,
      selectedIcon1: null,
      selectedIcon2: null,
      selectedIcon3: null,
      icons1: [],
      icons2: [],
      icons3: [],
      screenAccessListCount: null,
      screenPageListCount: null,
      checkboxArray: [],
      authorizationLevel: null,
      moduleListCurrentCount: null,
      header: "",
      field: [],
      count: 1,
      term: null,
      hasModule: false,
      perPage: "10",
      moduleList: [],
      screenList: [],
      screenPageList: [],
      submoduleList: [],
      submoduleListSelect: [],
      submoduleListCount: null,
      divisionList: [],
      authorizationList: [],
      staffList: [],
      departmentList: [],
      groupList: [],
      currentPage: 1,

      processflowList: [],
      getSubmoduleList: [],

      tabs: TABS,
      currentTab: "tab1",

      model: {
        MOD_CODE: "",
        MOD_NAME: "",
        MOD_SNAME: "",
        MOD_INDEX: '',
        MOD_ICON: "",

        editModule: {
        MOD_CODE: "",
        MOD_NAME: "",
        MOD_SNAME: "",
        MOD_INDEX: '',
        MOD_ICON: "",
        },

        SUBMOD_NAME: "",
        SUBMOD_CODE: "",
        moduleSelection: "",

        editSubmodule: {
          SUBMOD_NAME: "",
          SUBMOD_CODE: "",
          moduleSelection: "",
        },

        editScreen: {
          moduleSelection: "",
          submoduleSelection: "",
          SCREEN_NAME: "",
          PAGE_ROUTE: "",
          SCREEN_PROCESS: "",
          SCREEN_DESCRIPTION: "",
          SCREEN_CODE:"",
        },



        divisionName: "",
        editDivisionName: "",

        submoduleSelection: "",
        departmentSelection: "",
        groupSelection: "",
        authorizationSelection: "",
        departmentName: "",
        editDepartmentName: "",

        MOD_NAME_FIRST: "",
        SUBMOD_NAME_FIRST: "",
        SCREEN_NAME: "",
        PAGE_ROUTE: "",
        PROCESS_FLOW: "",
        SCREEN_DESCRIPTION: "",
        SCREEN_CODE:"",

        DIVISION: "",
        DPMT_NAME: ""
      },
      //Module
      editDivisionSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "input",
                inputType: "Text",
                model: "editDivisionName",
                label: "Module Name",
                placeholder: "Enter division",
                required: true,
                styleClasses: "col-md-12"
              }
            ]
          }
        ]
      },
      //Module & submodule
      Tab1Schema: {
        groups: [
          {
            styleClasses: "row mt-2",
            fields: [
              {
                type: "input",
                inputType: "text",
                label: "CODE",
                model: "MOD_CODE",
                placeholder: "Enter code",
                required: true,
                validator: "required",
                styleClasses: "col-md-6"
              },
              {
                type: "input",
                inputType: "text",
                label: "MODULE NAME",
                model: "MOD_NAME",
                placeholder: "Enter module name",
                required: true,
                validator: "required",
                styleClasses: "col-md-6"
              },
              {
                type: "input",
                inputType: "text",
                label: "MODULE SHORT NAME",
                model: "MOD_SNAME",
                placeholder: "Enter module short name",
                required: true,
                validator: "required",
                styleClasses: "col-md-6"
              },
              {
                type: "input",
                inputType: "number",
                min: 0,
                label: "INDEX",
                model: "MOD_INDEX",
                required: true,
                
                styleClasses: "col-md-4"
              }
            ]
          }
        ]
      },
      editModuleSchema: {
        groups: [
          {
            styleClasses: "row mt-2",
            fields: [
              {
                type: "input",
                inputType: "text",
                label: "CODE",
                model: "editModule.MOD_CODE",
                placeholder: "Enter code",
                validator: "required",
                required: true,
                styleClasses: "col-md-12"
              },
              {
                type: "input",
                inputType: "text",
                label: "MODULE NAME",
                model: "editModule.MOD_NAME",
                placeholder: "Enter module name",
                validator: "required",
                required: true,
                styleClasses: "col-md-12"
              },
              {
                type: "input",
                inputType: "text",
                label: "MODULE SHORT NAME",
                model: "editModule.MOD_SNAME",
                placeholder: "Enter module short name",
                validator: "required",
                required: true,
                styleClasses: "col-md-12"
              },
              {
                type: "input",
                inputType: "number",
                min: 0,
                label: "INDEX",
                validator: "required",
                required: true,
                model: "editModule.MOD_INDEX",
                styleClasses: "col-md-12"
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
                type: "vueMultiSelect",
                model: "moduleSelection",
                label: "Module",
                placeholder: "Select module",
                selectOptions: {
                  multiple: false,
                  key: "MANAGE_MODULE_ID",
                  label: "MOD_NAME",
                  searchable: true
                },
                values: (model, schema) => {
                  return this.moduleList;
                },
                required: true,
                validator: "required",
                styleClasses: "col-md-6"
              },
              {
                type: "input",
                inputType: "text",
                label: "Sub Module Code",
                model: "SUBMOD_CODE",
                placeholder: "Enter code",
                required: true,
                validator: "required",
                styleClasses: "col-md-6"
              },
              {
                type: "input",
                inputType: "text",
                label: "Sub Module Name",
                model: "SUBMOD_NAME",
                placeholder: "Enter name",
                required: true,
                validator: "required",
                styleClasses: "col-md-6"
              }
            ]
          }
        ]
      },
      editSubmoduleSchema: {
        groups: [
          {
            styleClasses: "row mt-2",
            fields: [
              {
                type: "vueMultiSelect",
                model: "editSubmodule.moduleSelection",
                label: "Module",
                placeholder: "Select module",
                selectOptions: {
                  multiple: false,
                  key: "MANAGE_MODULE_ID",
                  label: "MOD_NAME",
                  searchable: true
                },
                values: (model, schema) => {
                  return this.moduleList;
                },
                required: true,
                validator: "required",
                styleClasses: "col-md-12"
              },
              {
                type: "input",
                inputType: "text",
                label: "Sub Module Code",
                model: "editSubmodule.SUBMOD_CODE",
                placeholder: "Enter code",
                required: true,
                validator: "required",
                styleClasses: "col-md-12"
              },
              {
                type: "input",
                inputType: "text",
                label: "Sub Module Name",
                model: "editSubmodule.SUBMOD_NAME",
                placeholder: "Enter name",
                required: true,
                validator: "required",
                styleClasses: "col-md-12"
              }
            ]
          }
        ]
      },
      Tab3Schema: {
        groups: [
          {
            styleClasses: "row mt-2",
            fields: [
              {
                type: "vueMultiSelect",
                model: "moduleSelection",
                label: "Module",
                placeholder: "Select module",
                selectOptions: {
                  multiple: false,
                  key: "MANAGE_MODULE_ID",
                  label: "MOD_NAME",
                  searchable: true
                },
                values: (model, schema) => {
                  return this.moduleList;
                },
                styleClasses: "col-md-6"
              },
              {
                type: "vueMultiSelect",
                model: "submoduleSelection",
                label: "Sub submodule",
                placeholder: "Select Sub module",
                selectOptions: {
                  multiple: false,
                  key: "MANAGE_SUBMODULE_ID",
                  label: "SUBMOD_NAME",
                  searchable: true
                },
                values: (model, schema) => {
                  return this.getSubmoduleList;
                },
                styleClasses: "col-md-6"
              },
              {
                type: "input",
                inputType: "text",
                label: "Screen Name",
                model: "SCREEN_NAME",
                placeholder: "Enter screen name",
                required: true,
                validator: "required",
                styleClasses: "col-md-6"
              },
              {
                type: "input",
                inputType: "text",
                label: "Page Route",
                model: "PAGE_ROUTE",
                placeholder: "Enter page route. Example: screen-access",
                required: true,
                validator: "required",
                styleClasses: "col-md-6"
              },
              {
              type: "vueMultiSelect",
                model: "SCREEN_PROCESS",
                label: "Process FLow",
                placeholder: "Select Process",
                selectOptions: {
                  multiple: false,
                  key: "PROCESS_FLOW_ID",
                  label: "PROCESS_FLOW_NAME",
                  searchable: true
                },
                values: (model, schema) => {
                  return this.processflowList;
                },
                styleClasses: "col-md-6"
              },
              {
                type: "input",
                inputType: "text",
                label: "Description",
                model: "SCREEN_DESCRIPTION",
                placeholder: "Enter description",
                required: false,
                validator: "required",
                styleClasses: "col-md-6"
              },
              {
                type: "input",
                inputType: "text",
                label: "Code",
                model: "SCREEN_CODE",
                placeholder: "Enter page code",
                required: true,
                validator: "required",
                styleClasses: "col-md-6"
              },
            ]
          }
        ]
      },
      editScreenSchema: {
        groups: [
          {
            styleClasses: "row mt-2",
            fields: [
              {
                type: "vueMultiSelect",
                model: "editScreen.moduleSelection",
                label: "Module",
                placeholder: "Select module",
                selectOptions: {
                  multiple: false,
                  key: "MANAGE_MODULE_ID",
                  label: "MOD_NAME",
                  searchable: true
                },
                values: (model, schema) => {
                  return this.moduleList;
                },
                styleClasses: "col-md-12"
              },
              {
                type: "vueMultiSelect",
                model: "editScreen.submoduleSelection",
                label: "Sub submodule",
                placeholder: "Select Sub module",
                selectOptions: {
                  multiple: false,
                  key: "MANAGE_SUBMODULE_ID",
                  label: "SUBMOD_NAME",
                  searchable: true
                },
                values: (model, schema) => {
                  return this.getSubmoduleList;
                },
                styleClasses: "col-md-12"
              },
              {
                type: "input",
                inputType: "text",
                label: "Screen Name",
                model: "editScreen.SCREEN_NAME",
                placeholder: "Enter screen name",
                required: true,
                validator: "required",
                styleClasses: "col-md-12"
              },
              {
                type: "input",
                inputType: "text",
                label: "Page Route",
                model: "editScreen.PAGE_ROUTE",
                placeholder: "Enter page route. Example: screen-access",
                required: true,
                validator: "required",
                styleClasses: "col-md-12"
              },
              {
              type: "vueMultiSelect",
                model: "editScreen.SCREEN_PROCESS",
                label: "Process FLow",
                placeholder: "Select Process",
                selectOptions: {
                  multiple: false,
                  key: "PROCESS_FLOW_ID",
                  label: "PROCESS_FLOW_NAME",
                  searchable: true
                },
                values: (model, schema) => {
                  return this.processflowList;
                },
                styleClasses: "col-md-12"
              },
              {
                type: "input",
                inputType: "text",
                label: "Description",
                model: "editScreen.SCREEN_DESCRIPTION",
                placeholder: "Enter description",
                required: false,
                validator: "required",
                styleClasses: "col-md-12"
              },
              {
                type: "input",
                inputType: "text",
                label: "Code",
                model: "editScreen.SCREEN_CODE",
                placeholder: "Enter page code",
                required: true,
                validator: "required",
                styleClasses: "col-md-6"
              },
            ]
          }
        ]
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
                  searchable: true
                },
                values: (model, schema) => {
                  return this.divisionList;
                },
                styleClasses: "col-md-6"
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
                  searchable: true
                },
                values: (model, schema) => {
                  return this.departmentList;
                },
                styleClasses: "col-md-6"
              }
            ]
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
                  searchable: true
                },
                values: (model, schema) => {
                  return this.groupList;
                },
                styleClasses: "col-md-6"
              },
              {
                type: "vueMultiSelect",
                model: "authorizationSelection",
                label: "Authorization Level",
                required: true,
                placeholder: "Select Authorization Level",
                selectOptions: {
                  multiple: false,
                  key: "SETTING_GENERAL_ID",
                  label: "SET_PARAM",
                  searchable: true
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
                styleClasses: "col-md-6"
              }
            ]
          },
          {
            styleClasses: "row mt-2",
            fields: [
              {
                type: "vueMultiSelect",
                model: "staffSelection",
                label: "Staff Name",
                placeholder: "Select Staff",
                selectOptions: {
                  multiple: false,
                  key: "MANAGE_STAFF_ID",
                  label: "STAFF_NAME",
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
      editDepartmentSchema: {
        groups: [
          {
            styleClasses: "row mt-2",
            fields: [
              {
                type: "vueMultiSelect",
                model: "DIVISION",
                label: "Module Name",
                placeholder: "Select Division",
                selectOptions: {
                  multiple: false,
                  key: "MANAGE_MODULE_ID",
                  label: "MOD_NAME",
                  searchable: true
                },
                values: (model, schema) => {
                  return this.moduleList;
                },
                styleClasses: "col-md-12",
                required: true,
                validator: "required"
              },
              {
                type: "input",
                inputType: "Text",
                model: "DPMT_NAME",
                label: "Department Name",
                placeholder: "Enter department",
                required: true,
                styleClasses: "col-md-12",
                validator: "required"
              }
            ]
          }
        ]
      },

      dpmtFilterSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "vueMultiSelect",
                model: "editDivisionSelection",
                label: "Module Name",
                placeholder: "Select Division",
                selectOptions: {
                  multiple: false,
                  key: "MANAGE_MODULE_ID",
                  label: "MOD_NAME",
                  searchable: true
                },
                values: (model, schema) => {
                  return this.divisionList;
                },
                styleClasses: "col-md-6",
                required: true,
                validator: "required"
              }
            ]
          }
        ]
      },
      //Group
      formOptions: {
        validateAfterChanged: true,
      },
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
</style>

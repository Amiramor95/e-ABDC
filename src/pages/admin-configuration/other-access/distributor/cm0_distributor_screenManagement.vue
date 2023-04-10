/* eslint-disable no-unused-expressions */
<template>
  <va-card>
    <loder v-show="isLoader" />

    <div class="text-center text-danger my-2" v-if="!isDataReady">
      <b-spinner class="align-middle"></b-spinner>
      <strong>Loading...</strong>
    </div>

    <div v-else>
      <!-- group -->
      <vudal name="simpleModalEditGroup" class="widthModal">
        <div class="header">
          Edit Group Name<i class="close icon">&times;</i>
        </div>
        <div class="content">
          <vue-form-generator
            :model="model"
            :schema="editGroupSchema"
            :options="formOptions"
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
            @click="updateGroupAPI"
            type="button"
            class="cancel vudal-btn mr-2 btn btn-primary btn-fill btn-md"
          >
            <i class="fa fa-edit" /> &nbsp; Update
          </button>
        </div>
      </vudal>
      <!-- Module  -->
      <vudal name="simpleModalEditModule" class="widthModal">
        <div class="header">
          Edit Screen and Module Management<i class="close icon">&times;</i>
        </div>
        <div class="content">
          <vue-form-generator
            :model="model"
            :schema="editModuleSchema"
            :options="formOptions"
            ref="editTab1Form"
          />

          <br />
          <b-form-group label="SELECT MENU ICON" v-slot="{ ariaDescribedby }">
            <horizontal-scroll>
              <div style="margin: 10px 10px 10px 10px;">
                <b-form-radio-group
                  id="radio-slots"
                  v-model="model.selectedIcon2"
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
                  v-model="model.selectedIcon2"
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
                  v-model="model.selectedIcon2"
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
            class="cancel vudal-btn mr-2 btn btn-primary btn-fill btn-md"
          >
            <i class="fa fa-edit" /> &nbsp; Update
          </button>
        </div>
      </vudal>
      <!-- Submodule -->
      <vudal name="simpleModalEditSubmodule" class="widthModal">
        <div class="header">
          Edit Submodule<i class="close icon">&times;</i>
        </div>
        <div class="">
          <vue-form-generator
            :model="model"
            :schema="editSubmoduleSchema"
            :options="formOptions"
            ref="editTab2Form"
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
            @click="updateSubmoduleAPI"
            type="button"
            class="cancel vudal-btn mr-2 btn btn-primary btn-fill btn-md"
          >
            <i class="fa fa-edit" /> &nbsp; Update
          </button>
        </div>
      </vudal>
      <!-- Screen Page -->
      <vudal name="simpleModalEditScreen" class="widthModal">
        <loder v-show="isLoader" />
        <div class="header">
          Edit Screen<i class="close icon">&times;</i>
        </div>
        </br></br></br> 
        <div class="">
          <vue-form-generator
            :model="model"
            :schema="editScreenSchema"
            :options="formOptions"
            @model-updated="onModuleData"
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
            class="cancel vudal-btn mr-2 btn btn-primary btn-fill btn-md"
          >
            <i class="fa fa-edit" /> &nbsp; Update
          </button>
        </div>
      </vudal>


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
            :schema="Tab4Schema"
            :options="formOptions"
            ref="Tab4Form"
          >
          </vue-form-generator>
          <br />
          <br />
          <button
            type="button"
            @click="addGroup"
            class="float-right btn btn-primary btn-fill btn-md"
          >
            <i class="fa fa-plus" /> &nbsp; Add Parameter
          </button>
          
          
          <br/>
          <br/>
          <br/>

          <!-- list -->
          <div class="float-right">
            <va-input
              :value="term"
              :placeholder="$t('Search')"
              @input="searchGroup" 
              removable
            >
              <va-icon name="fa fa-search" slot="prepend" />
            </va-input>
          </div>
          <br />
          <h4>List of Group</h4>
          <br />
          <va-card class="mt-2">
            <va-data-table
              :datacount="groupCount"
              :dataperpage="parseInt(perPage)"
              :fields="GroupFields"
              :data="GroupNameFilteredData"
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
                      v-on:click="editGroup(props.rowData)"
                      
                    >
                      <i class="fa fa-edit"></i
                    ></span>
                    <span
                      class="badge badge-danger mr-1"
                      v-on:click="deleteGroup(props.rowData)"
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
            :schema="Tab1Schema"
            :options="formOptions"
            ref="Tab1Form"
          >
          </vue-form-generator>
          <br />
          <b-form-group label="SELECT MENU ICON" v-slot="{ ariaDescribedby }">
            <horizontal-scroll>
              <div style="margin: 10px 10px 10px 10px;">
                <b-form-radio-group
                  id="radio-slots"
                  v-model="model.selectedIcon1"
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
                  v-model="model.selectedIcon1"
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
                  v-model="model.selectedIcon1"
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
          <button
            type="button"
            @click="addModule"
            class="float-right btn btn-primary btn-fill btn-md"
          >
            <i class="fa fa-plus" /> &nbsp; Add Parameter
          </button>
          <br/>
          
          

          <!-- list -->
          <br/>
          <br/> 
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
                <i :class="props.rowData.DISTRIBUTOR_MOD_ICON"></i>
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
        
        <div v-if="currentTab === 'tab3'">
          <br />
          <vue-form-generator
            :model="model"
            :schema="Tab2Schema"
            :options="formOptions"
            ref="Tab2Form"
          >
          </vue-form-generator>

          <br />
          <button
            type="button"
            @click="addSubmodule"
            class="float-right btn btn-primary btn-fill btn-md"
          >
            <i class="fa fa-plus" /> &nbsp; Add Parameter
          </button>
          <br />
        
          <br/>
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
          <br />
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
        <div v-if="currentTab === 'tab4'">
          <br />
          <vue-form-generator
            :model="model"
            :schema="Tab3Schema"
            :options="formOptions"
            @model-updated="onModuleData"
            ref="Tab3Form"
          >
          </vue-form-generator>
          <br />
          <button
            type="button"
            @click="addScreen"
            class="float-right btn btn-primary btn-fill btn-md"
          >
            <i class="fa fa-plus" /> &nbsp; Add Parameter
          </button>
          <br/>
          <!-- list -->
          <br/>
          <br/> 
          <div class="float-right">
            <va-input
              :value="term"
              :placeholder="$t('Search')"
              @input="searchScreen" 
              removable
            >
              <va-icon name="fa fa-search" slot="prepend" />
            </va-input>
          </div>
          <br />
          <h4>List of Sub Module</h4>
          <br />

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

      <br />
      <button
          @click="back"
          type="button"
          class="btn btn-primary btn-fill btn-md"
      >
          <i class="fa fa-step-backward" /> &nbsp; Previous
      </button>
      
    </div>  
  </va-card>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import Vudal from "vudal";
import "vue-form-generator/dist/vfg.css";
import Tabs from "vue-tabs-with-active-line";
import * as servicesModule04 from "../../../../app/module0/services04";
// import * as servicesModule0 from "../../../../app/module0/services";
import * as servicesModule0 from "../../../../app/module0/services02";
import loder from "../../../request_loader";
import { debounce } from "lodash";

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
  { title: "Setting 1 : Group", value: "tab1" },
  { title: "Setting 2 : Module", value: "tab2" },
  { title: "Setting 3 : Sub Module", value: "tab3" },
  { title: "Setting 4 : Screen Page", value: "tab4" }
];

export default {
  watch: {
     
  },
  mounted() {
    (this.icons1 = data1), (this.icons2 = data2), (this.icons3 = data3);
    this.getAllModulee();
    this.getAllSubModule();
    this.getAllGroupName();
    this.getAllModuleforSubmodule();
    this.getAllProcessflow();
    this.getAllGetSubmodule();
    this.getAllScreen();
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
    
    

    
    handleClick(newTab) {
      this.currentTab = newTab;
    }, // end tab
    back() {
      this.$router.go(-1);
    }, // back button


    // ----------------- Dist module code ----------  
    //search searchModule
    searchModule: debounce(function (term) {
      this.term = term;
    }, 400),
    
    getAllModulee: async function() {
      const response = await servicesModule0.getAllDistManageModuleList();
      this.moduleList = response;
      this.moduleListCount = this.moduleList.length;
    },
        
    async addModule() {
      try {
        if (this.$refs.Tab1Form.validate()) {
          this.isLoader = true; // loder
          const data = new FormData();
          data.append("DISTRIBUTOR_MOD_CODE", this.model.DISTRIBUTOR_MOD_CODE);
          data.append("DISTRIBUTOR_MOD_NAME", this.model.DISTRIBUTOR_MOD_NAME);
          data.append("DISTRIBUTOR_MOD_SNAME", this.model.DISTRIBUTOR_MOD_SNAME);
          data.append("DISTRIBUTOR_MOD_INDEX", this.model.DISTRIBUTOR_MOD_INDEX);
          data.append("DISTRIBUTOR_MOD_ICON", this.model.selectedIcon1);
          // console.log("data :" + data);
          // eslint-disable-next-line no-unused-vars
          const response = await servicesModule0.createDistManageModule(data);
          //console.log(response);
          if(response != 'error'){
            this.getAllModulee();
            this.getAllModuleforSubmodule();
            this.formDataReset();
          }
          this.isLoader = false; // Kill loder
        }  
      } catch (error) {
        console.log(error);
      }
    },

    async editModule(data) {
        this.isLoader = true; // loder
        const response = await servicesModule0.getDistManageModuleById(
          data.DISTRIBUTOR_MANAGE_MODULE_ID
        );
        this.$modals.simpleModalEditModule.$show();
        this.DISTRIBUTOR_MANAGE_MODULE_ID = response.DISTRIBUTOR_MANAGE_MODULE_ID;
        this.model.editModule = response;
        this.model.selectedIcon2 = response.DISTRIBUTOR_MOD_ICON;
        //console.log(response);
        this.isLoader = false; // Kill loder
    },
    async updateModuleAPI() {
      try {
        if (this.$refs.editTab1Form.validate()) {
          this.isLoader = true; // loder
          const data = new FormData();
          data.append(
            "DISTRIBUTOR_MANAGE_MODULE_ID",
            this.DISTRIBUTOR_MANAGE_MODULE_ID
          );
          data.append("DISTRIBUTOR_MOD_CODE", this.model.editModule.DISTRIBUTOR_MOD_CODE);
          data.append("DISTRIBUTOR_MOD_NAME", this.model.editModule.DISTRIBUTOR_MOD_NAME);
          data.append("DISTRIBUTOR_MOD_SNAME", this.model.editModule.DISTRIBUTOR_MOD_SNAME);
          data.append("DISTRIBUTOR_MOD_INDEX", this.model.editModule.DISTRIBUTOR_MOD_INDEX);
          data.append("DISTRIBUTOR_MOD_ICON", this.model.selectedIcon2);        
          const response = await servicesModule0.updateDistManageModule(data);
          this.getAllModulee();
          this.getAllModuleforSubmodule();
          this.isLoader = false; // Kill loder
        }  
      } catch (error) {
        console.log(error);
      }
    },
    async deleteModule(data) {
      // eslint-disable-next-line no-unused-vars
      if (confirm("Are you sure you want to delete?")) {
        this.isLoader = true; // loder
        const response = await servicesModule0.deleteDistManageModule(
          data.DISTRIBUTOR_MANAGE_MODULE_ID
        );
        this.getAllModulee();
        this.getAllModuleforSubmodule();
        this.isLoader = false; // Kill loder
      }  
    },

        //--------------------- Dist Submodule

    searchSubModule: debounce(function (term) {
      this.term = term;
    }, 400), 

    getAllModuleforSubmodule: async function() {
      const response = await servicesModule0.getAllDistModuleList();
      this.getmoduleList = response;
    },

    getAllSubModule: async function() {
      const response = await servicesModule0.getAllDistManageSubModuleList();
      this.submoduleList = response;
      this.submoduleListCount = this.submoduleList.length;
    },
        
    async addSubmodule() {
      try {
        if (this.$refs.Tab2Form.validate()) {
          this.isLoader = true; // loder
          const data = new FormData();
          data.append("DISTRIBUTOR_MODULE_ID", this.model.DISTRIBUTOR_MODULE_ID.DISTRIBUTOR_MANAGE_MODULE_ID);
          data.append("DISTRIBUTOR_SUBMODULE_NAME", this.model.DISTRIBUTOR_SUBMODULE_NAME);
          data.append("DISTRIBUTOR_SUBMODULE_CODE", this.model.DISTRIBUTOR_SUBMODULE_CODE);
      
          const response = await servicesModule0.createDistManageSubModule(data);
          this.formDataReset();
          this.getAllSubModule();
          this.getAllGetSubmodule();
          this.isLoader = false; // Kill loder
        }  
      } catch (error) {
        console.log(error);
      }
    },

    async editSubmodule(data) {
      this.isLoader = true; // loder
      const response = await servicesModule0.getDistManageSubModuleById(
        data.DISTRIBUTOR_MANAGE_SUBMODULE_ID
      );
      this.DISTRIBUTOR_MANAGE_SUBMODULE_ID = response.DISTRIBUTOR_MANAGE_SUBMODULE_ID;
      this.model.EDIT_DISTRIBUTOR_MODULE_ID = {
        DISTRIBUTOR_MODULE_ID : response.DISTRIBUTOR_MODULE_ID,
        DISTRIBUTOR_MOD_NAME : response.DISTRIBUTOR_MOD_NAME
      };
      this.model.EDIT_DISTRIBUTOR_SUBMODULE_CODE = response.DISTRIBUTOR_SUBMODULE_CODE;
      this.model.EDIT_DISTRIBUTOR_SUBMODULE_NAME = response.DISTRIBUTOR_SUBMODULE_NAME;
      this.$modals.simpleModalEditSubmodule.$show();
      this.isLoader = false; // Kill loder
    },
    async updateSubmoduleAPI() {
        try {
        if (this.$refs.editTab2Form.validate()) {
          this.isLoader = true; // loder  
            const data = new FormData();
            data.append(
              "DISTRIBUTOR_MANAGE_SUBMODULE_ID",
              this.DISTRIBUTOR_MANAGE_SUBMODULE_ID
            );
            data.append("DISTRIBUTOR_MODULE_ID", this.model.EDIT_DISTRIBUTOR_MODULE_ID.DISTRIBUTOR_MODULE_ID);
            data.append("DISTRIBUTOR_SUBMODULE_NAME", this.model.EDIT_DISTRIBUTOR_SUBMODULE_NAME);
            data.append("DISTRIBUTOR_SUBMODULE_CODE", this.model.EDIT_DISTRIBUTOR_SUBMODULE_CODE);
            const response = await servicesModule0.updateDistManageSubModule(data);
            this.getAllSubModule();
            this.getAllGetSubmodule();
            this.isLoader = false; // Kill loder
        }    
      } catch (error) {
        console.log(error);
      }
    },
    async deleteSubmodule(data) {
      // eslint-disable-next-line no-unused-vars
      if (confirm("Are you sure you want to delete?")) {
        this.isLoader = true; // loder
        const response = await servicesModule0.deleteDistManageSubModule(
          data.DISTRIBUTOR_MANAGE_SUBMODULE_ID
        );
        this.getAllSubModule();
        this.isLoader = false; // Kill loder
      }  
    },

    //------------- Dist Screen Page 
    searchScreen: debounce(function (term) {
      this.term = term;
    }, 400),

    getAllProcessflow: async function() {
      const response = await servicesModule0.getAllDistProcessFlowList();
      this.processflowList = response;
    },
    getAllGetSubmodule: async function() {
        const response = await servicesModule0.getAllDistsubModuleList();
        this.getSubmoduleList = response;
    },

    getAllModuleforSubmodule: async function() {
      const response = await servicesModule0.getAllDistModuleList();
      this.getmoduleList = response;
    },

    getAllScreen: async function() {
      const response = await servicesModule0.getAllDistManageScreenList();
      this.screenList = response;
      this.screenPageListCount = this.screenList.length;
      this.isDataReady = true; // Compnent Loader kill
    },
        
    async addScreen() {
      try {
        if (this.$refs.Tab3Form.validate()) {  
          this.isLoader = true; // loder
          const data = new FormData();
          data.append("DISTRIBUTOR_MODULE_ID", this.model.addScreen.DISTRIBUTOR_MODULE_ID.DISTRIBUTOR_MANAGE_MODULE_ID);
          data.append("DISTRIBUTOR_MANAGE_SUBMODULE_ID", this.model.addScreen.DISTRIBUTOR_MANAGE_SUBMODULE_ID.DISTRIBUTOR_MANAGE_SUBMODULE_ID);
          data.append("DISTRIBUTOR_SCREEN_PROCESS_ID", this.model.addScreen.DISTRIBUTOR_SCREEN_PROCESS_ID.PROCESS_FLOW_ID);
          data.append("DISTRIBUTOR_SCREEN_NAME", this.model.addScreen.DISTRIBUTOR_SCREEN_NAME);
          data.append("DISTRIBUTOR_SCREEN_ROUTE", this.model.addScreen.DISTRIBUTOR_SCREEN_ROUTE);
          data.append("DISTRIBUTOR_SCREEN_DESC", this.model.addScreen.DISTRIBUTOR_SCREEN_DESC);
          data.append("DISTRIBUTOR_SCREEN_CODE", this.model.addScreen.DISTRIBUTOR_SCREEN_CODE);
          const response = await servicesModule0.createDistManageScreen(data);
          //console.log(response);
          if(response != 'error'){
            this.formDataReset();
            this.getAllScreen();
          }
          
          this.isLoader = false; // Kill loder
        }  
      } catch (error) {
        //console.log(error);
      }
    },

    async editScreen(data) {
      this.isLoader = true; // loder
      const response = await servicesModule0.getDistManageScreenById(
        data.DISTRIBUTOR_MANAGE_SCREEN_ID
      );
      
      this.DISTRIBUTOR_MANAGE_SCREEN_ID = response.DISTRIBUTOR_MANAGE_SCREEN_ID;
      this.model.editScreen = response;

      this.model.editScreen.DISTRIBUTOR_MODULE_ID = {
        DISTRIBUTOR_MANAGE_MODULE_ID : response.DISTRIBUTOR_MANAGE_MODULE_ID,
        DISTRIBUTOR_MOD_NAME : response.DISTRIBUTOR_MOD_NAME
      };
      this.model.editScreen.DISTRIBUTOR_MANAGE_SUBMODULE_ID = {
        DISTRIBUTOR_MANAGE_SUBMODULE_ID : response.DISTRIBUTOR_MANAGE_SUBMODULE_ID,
        DISTRIBUTOR_SUBMODULE_NAME : response.DISTRIBUTOR_SUBMODULE_NAME
      };
      this.model.editScreen.DISTRIBUTOR_SCREEN_PROCESS_ID = {
        PROCESS_FLOW_ID : response.PROCESS_FLOW_ID,
        PROCESS_FLOW_NAME : response.PROCESS_FLOW_NAME
      };
      this.model.editScreen.DISTRIBUTOR_SCREEN_NAME = response.DISTRIBUTOR_SCREEN_NAME;
      this.model.editScreen.DISTRIBUTOR_SCREEN_ROUTE = response.DISTRIBUTOR_SCREEN_ROUTE;
      this.model.editScreen.DISTRIBUTOR_SCREEN_DESC = response.DISTRIBUTOR_SCREEN_DESC;
      this.model.editScreen.DISTRIBUTOR_SCREEN_CODE = response.DISTRIBUTOR_SCREEN_CODE;

      this.$modals.simpleModalEditScreen.$show();

      this.isLoader = false; // Kill loder
    },
    async updateScreenAPI() {
      try {
        this.isLoader = true; // loder
        const data = new FormData();
        data.append(
          "DISTRIBUTOR_MANAGE_SCREEN_ID",
          this.DISTRIBUTOR_MANAGE_SCREEN_ID
        );
        data.append("DISTRIBUTOR_MODULE_ID", this.model.editScreen.DISTRIBUTOR_MODULE_ID.DISTRIBUTOR_MANAGE_MODULE_ID);
        data.append("DISTRIBUTOR_MANAGE_SUBMODULE_ID", this.model.editScreen.DISTRIBUTOR_MANAGE_SUBMODULE_ID.DISTRIBUTOR_MANAGE_SUBMODULE_ID);
        data.append("DISTRIBUTOR_SCREEN_PROCESS_ID", this.model.editScreen.DISTRIBUTOR_SCREEN_PROCESS_ID.PROCESS_FLOW_ID);
        data.append("DISTRIBUTOR_SCREEN_NAME", this.model.editScreen.DISTRIBUTOR_SCREEN_NAME);
        data.append("DISTRIBUTOR_SCREEN_ROUTE", this.model.editScreen.DISTRIBUTOR_SCREEN_ROUTE);
        data.append("DISTRIBUTOR_SCREEN_DESC", this.model.editScreen.DISTRIBUTOR_SCREEN_DESC);
        data.append("DISTRIBUTOR_SCREEN_CODE", this.model.editScreen.DISTRIBUTOR_SCREEN_CODE);
        
        const response = await servicesModule0.updateDistManageScreen(data);
        this.getAllScreen();
        this.isLoader = false; // Kill loder
      } catch (error) {
        console.log(error);
      }
    },
    async deleteScreen(data) {
      if (confirm("Are you sure you want to delete?")){
        // eslint-disable-next-line no-unused-vars
        this.isLoader = true; // loder
        const response = await servicesModule0.deleteDistManageScreen(
          data.DISTRIBUTOR_MANAGE_SCREEN_ID
        );
        this.getAllScreen();
        this.isLoader = false; // Kill loder
      }
    },
      




    //----------------------group-----------------/
    
    //search Group
    searchGroup: debounce(function (term) {
      this.term = term;
    }, 400),
    

    getAllGroupName: async function () {
      const response = await servicesModule0.getAllDistManageGroupList();
      this.groupList = response;
      this.groupCount = this.groupList.length;
    },
    

   
    async addGroup() {
      if (this.$refs.Tab4Form.validate()) {
        this.isLoader = true; // loder
        const data = new FormData();
        data.append("DISTRIBUTOR_MANAGE_GROUP_NAME", this.model.DISTRIBUTOR_MANAGE_GROUP_NAME);
        try {
          //console.log(data);
          const response = await servicesModule0.createDistManageGroup(data);
          this.formDataReset();
          this.getAllGroupName();
          // this.$modals.simpleModal.$hide();
          this.isLoader = false; // Kill loder
        } catch (error) {
          console.log(error);
        }
      }
    },

    async editGroup(data) {
      this.isLoader = true; // loder
      const response = await servicesModule0.getDistManageGroupById(
        data.DISTRIBUTOR_MANAGE_GROUP_ID
      );
      this.$modals.simpleModalEditGroup.$show();
      this.DISTRIBUTOR_MANAGE_GROUP_ID = response.DISTRIBUTOR_MANAGE_GROUP_ID;
      this.model.editGroup = response;
      console.log(response);
      this.isLoader = false; // Kill loder
    },
    async updateGroupAPI() {
      try {
        this.isLoader = true; // loder
        const data = new FormData();
        data.append(
          "DISTRIBUTOR_MANAGE_GROUP_ID",
          this.DISTRIBUTOR_MANAGE_GROUP_ID
        );
        data.append("DISTRIBUTOR_MANAGE_GROUP_NAME", this.model.editGroup.DISTRIBUTOR_MANAGE_GROUP_NAME);
        
        const response = await servicesModule0.updateDistManageGroup(data);
        this.getAllGroupName();
        this.isLoader = false; // Kill loder
      } catch (error) {
        console.log(error);
      }
    },
    async deleteGroup(data) {
      if (confirm("Are you sure you want to delete?")){
        this.isLoader = true; // loder
        // eslint-disable-next-line no-unused-vars
        const response = await servicesModule0.deleteDistManageGroup(
          data.DISTRIBUTOR_MANAGE_GROUP_ID
        );
        this.getAllGroupName();
        this.isLoader = false; // Kill loder
      }
    },

    onModuleData: async function (newVal, schema) { 
      //alert(schema);
      this.isLoader = true; // Loder 

      if (schema == "addScreen.DISTRIBUTOR_MODULE_ID" || schema == "editScreen.DISTRIBUTOR_MODULE_ID" && newVal) {
        this.model.submoduleSelection = "";
        const response = await servicesModule0.getDistManageSubModule(newVal.DISTRIBUTOR_MANAGE_MODULE_ID);
        this.getSubmoduleList = response;
      }
      this.isLoader = false; // Kill Loder
    },

    // Form Data Reset
    formDataReset(){
      this.model.DISTRIBUTOR_MOD_CODE = '';
      this.model.DISTRIBUTOR_MOD_NAME = '';
      this.model.DISTRIBUTOR_MOD_SNAME = '';
      this.model.DISTRIBUTOR_MOD_INDEX = '';
      this.model.selectedIcon1 = '';
      this.model.DISTRIBUTOR_MODULE_ID = '';
      this.model.DISTRIBUTOR_SUBMODULE_NAME = '';
      this.model.DISTRIBUTOR_SUBMODULE_CODE = '';
      this.model.addScreen.DISTRIBUTOR_MODULE_ID = '';
      this.model.addScreen.DISTRIBUTOR_MANAGE_SUBMODULE_ID = '';
      this.model.addScreen.DISTRIBUTOR_SCREEN_PROCESS_ID = '';
      this.model.addScreen.DISTRIBUTOR_SCREEN_NAME = '';
      this.model.addScreen.DISTRIBUTOR_SCREEN_ROUTE = '';
      this.model.addScreen.DISTRIBUTOR_SCREEN_DESC = '';
      this.model.DISTRIBUTOR_MANAGE_GROUP_NAME = '';
      this.model.addScreen.DISTRIBUTOR_SCREEN_CODE = '';
    },



  },

  computed: {
      // Group name
      GroupFields() {
      return [
        {
          name: "__slot:no",
          title: "No"
        },
        {
          name: "DISTRIBUTOR_MANAGE_GROUP_NAME",
          title: "GROUP NAME"
        },
        {
          name: "__slot:actions",
          title: "Action",
          dataClass: "justify-content-center",
          width: "15%"
        }
      ];
    },

    // Filter Division Data From Here===
    GroupNameFilteredData() {
      if (!this.term || this.term.length < 1) {
        return this.groupList
      }

      return this.groupList.filter((item) => {
        return this.term
          .toLowerCase()
          .split(" ")
          .every(
            (v) =>
              item.DISTRIBUTOR_MANAGE_GROUP_NAME.toLowerCase().includes(v) 
          );
      });
    },
    //tab1
    moduleFields() {
      return [
        {
          name: "__slot:no",
          title: "No"
        },
        {
          name: "DISTRIBUTOR_MOD_CODE",
          title: "Code"
        },
        {
          name: "DISTRIBUTOR_MOD_NAME",
          title: "Module Name"
        },
        {
          name: "DISTRIBUTOR_MOD_SNAME",
          title: "Short Name"
        },
        {
          name: "DISTRIBUTOR_MOD_INDEX",
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
    // Filter Division Data From Here===
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
              item.DISTRIBUTOR_MOD_CODE.toLowerCase().includes(v) ||
              item.DISTRIBUTOR_MOD_NAME.toLowerCase().includes(v) ||
              item.DISTRIBUTOR_MOD_SNAME.toLowerCase().includes(v)
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
          name: "DISTRIBUTOR_MOD_NAME",
          title: "Module Name"
        },
        {
          name: "DISTRIBUTOR_SUBMODULE_CODE",
          title: "Sub Module Code"
        },
        {
          name: "DISTRIBUTOR_SUBMODULE_NAME",
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
    // Filter Division Data From Here===
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
              item.DISTRIBUTOR_MOD_NAME.toLowerCase().includes(v) ||
              item.DISTRIBUTOR_SUBMODULE_NAME.toLowerCase().includes(v) ||
              item.DISTRIBUTOR_SUBMODULE_CODE.toLowerCase().includes(v)
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
          name: "DISTRIBUTOR_SUBMODULE_NAME",
          title: "Submodule Name"
        },
        {
          name: "DISTRIBUTOR_SCREEN_NAME",
          title: "Screen Name"
        },
        {
          name: "DISTRIBUTOR_SCREEN_CODE",
          title: "Code"
        },
        {
          name: "DISTRIBUTOR_SCREEN_ROUTE",
          title: "Page Route"
        },
        {
          name: "PROCESS_FLOW_NAME",
          title: "Process Flow"
        },
        {
          name: "DISTRIBUTOR_SCREEN_DESC",
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

    // Filter Division Data From Here===
    screenPageFilteredData() {
      if (!this.term || this.term.length < 1) {
        return this.screenList
      }

      return this.screenList.filter((item) => {
        return this.term
          .toLowerCase()
          .split(" ")
          .every(
            (v) =>
              item.DISTRIBUTOR_SCREEN_NAME.toLowerCase().includes(v) ||
              item.DISTRIBUTOR_SCREEN_DESC.toLowerCase().includes(v) ||
              item.DISTRIBUTOR_MOD_NAME.toLowerCase().includes(v) ||
              item.DISTRIBUTOR_SUBMODULE_NAME.toLowerCase().includes(v) ||
              item.DISTRIBUTOR_SCREEN_ROUTE.toLowerCase().includes(v)
          );
      });
    },

  },

  data() {
    return {
      // Data for loder
      isLoader: false,
      isDataReady:false,

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

      groupList: [],
      groupCount: null,

     getmoduleList: [],
     getSubmoduleList: [],
     processflowList: [],

      tabs: TABS,
      currentTab: "tab1",

      model: {
        DISTRIBUTOR_MOD_CODE: "",
        DISTRIBUTOR_MOD_NAME: "",
        DISTRIBUTOR_MOD_SNAME:"",
        DISTRIBUTOR_MOD_INDEX:"",
        DISTRIBUTOR_MOD_ICON: "",
        selectedIcon1: '',
        selectedIcon2:'',

        editModule: {
          DISTRIBUTOR_MOD_CODE: "",
          DISTRIBUTOR_MOD_NAME: "",
          DISTRIBUTOR_MOD_SNAME: "",
          DISTRIBUTOR_MOD_INDEX: "",
          DISTRIBUTOR_MOD_ICON: "", 
        },

        DISTRIBUTOR_MODULE_ID: '',
        DISTRIBUTOR_SUBMODULE_NAME: "",
        DISTRIBUTOR_SUBMODULE_CODE: "",

        editSubModule: {
          moduleSelection: '',
          DISTRIBUTOR_SUBMODULE_NAME: "dddd",
          DISTRIBUTOR_SUBMODULE_CODE: "ggg",
        },
        EDIT_DISTRIBUTOR_SUBMODULE_CODE: "",
        EDIT_DISTRIBUTOR_MODULE_ID : "",
        EDIT_DISTRIBUTOR_SUBMODULE_NAME: "",

        addScreen: {
          DISTRIBUTOR_MODULE_ID: '',
          DISTRIBUTOR_MANAGE_SUBMODULE_ID: '',
          DISTRIBUTOR_SCREEN_PROCESS_ID: '',
          DISTRIBUTOR_SCREEN_NAME: '',
          DISTRIBUTOR_SCREEN_ROUTE: '',
          DISTRIBUTOR_SCREEN_DESC: '',
          DISTRIBUTOR_SCREEN_CODE:'',
        },

        editScreen: {
          DISTRIBUTOR_MODULE_ID: '',
          DISTRIBUTOR_MANAGE_SUBMODULE_ID: '',
          DISTRIBUTOR_SCREEN_PROCESS_ID: '',
          DISTRIBUTOR_SCREEN_NAME: '',
          DISTRIBUTOR_SCREEN_ROUTE: '',
          DISTRIBUTOR_SCREEN_DESC: '',
          DISTRIBUTOR_SCREEN_CODE:'',
        },

        DISTRIBUTOR_MANAGE_GROUP_NAME: '',
        editGroup: {
            DISTRIBUTOR_MANAGE_GROUP_NAME: '',
        },

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
      Tab4Schema: {
        groups: [
          {
            styleClasses: "row mt-2",
            fields: [
              {
                type: "input",
                inputType: "text",
                label: "Group Name",
                model: "DISTRIBUTOR_MANAGE_GROUP_NAME",
                placeholder: "Enter code",
                required: true,
                validator: "string",
                styleClasses: "col-md-10"
              },
              
            ]
          }
        ]
      },
      Tab1Schema: {
        groups: [
          {
            styleClasses: "row mt-2",
            fields: [
              {
                type: "input",
                inputType: "text",
                label: "CODE",
                model: "DISTRIBUTOR_MOD_CODE",
                placeholder: "Enter code",
                required: true,
                validator: "string",
                styleClasses: "col-md-6"
              },
              {
                type: "input",
                inputType: "text",
                label: "MODULE NAME",
                model: "DISTRIBUTOR_MOD_NAME",
                placeholder: "Enter module name",
                required: true,
                validator: "string",
                styleClasses: "col-md-6"
              },
              {
                type: "input",
                inputType: "text",
                label: "MODULE SHORT NAME",
                model: "DISTRIBUTOR_MOD_SNAME",
                placeholder: "Enter module short name",
                required: true,
                validator: "string",
                styleClasses: "col-md-6"
              },
              {
                type: "input",
                inputType: "number",
                min: 0,
                label: "INDEX",
                model: "DISTRIBUTOR_MOD_INDEX",
                required: true,
                validator: "number",
                styleClasses: "col-md-6"
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
                model: "DISTRIBUTOR_MODULE_ID",
                label: "Module",
                placeholder: "Select module",
                selectOptions: {
                  multiple: false,
                  key: "DISTRIBUTOR_MODULE_ID",
                  label: "DISTRIBUTOR_MOD_NAME",
                  searchable: true
                },
                values: (model, schema) => {
                  return this.getmoduleList;
                },
                styleClasses: "col-md-6"
              },
              {
                type: "input",
                inputType: "text",
                label: "Sub Module Code",
                model: "DISTRIBUTOR_SUBMODULE_CODE",
                placeholder: "Enter code",
                required: true,
                validator: "string",
                styleClasses: "col-md-6"
              },
              {
                type: "input",
                inputType: "text",
                label: "Sub Module Name",
                model: "DISTRIBUTOR_SUBMODULE_NAME",
                placeholder: "Enter name",
                required: true,
                validator: "string",
                styleClasses: "col-md-6"
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
                model: "addScreen.DISTRIBUTOR_MODULE_ID",
                label: "Module",
                placeholder: "Select module",
                selectOptions: {
                  multiple: false,
                  key: "DISTRIBUTOR_MANAGE_MODULE_ID",
                  label: "DISTRIBUTOR_MOD_NAME",
                  searchable: true
                },
                values: (model, schema) => {
                  return this.getmoduleList;
                },
                styleClasses: "col-md-6"
              },
              {
                type: "vueMultiSelect",
                model: "addScreen.DISTRIBUTOR_MANAGE_SUBMODULE_ID",
                label: "Submodule",
                placeholder: "Select Sub module",
                selectOptions: {
                  multiple: false,
                  key: "DISTRIBUTOR_MANAGE_SUBMODULE_ID",
                  label: "DISTRIBUTOR_SUBMODULE_NAME",
                  searchable: true
                },
                disabled: (model, schema) => {
                  if (this.model.addScreen.DISTRIBUTOR_MODULE_ID.DISTRIBUTOR_MANAGE_MODULE_ID) {
                    return false;
                  } else {
                    return true;
                  }
                },
                values: (model, schema) => {
                  return this.getSubmoduleList;
                },
                styleClasses: "col-md-6",
                required: true,
                validator: "required",
              },
              {
                type: "input",
                inputType: "text",
                label: "Screen Name",
                model: "addScreen.DISTRIBUTOR_SCREEN_NAME",
                placeholder: "Enter screen name",
                required: true,
                validator: "string",
                styleClasses: "col-md-6"
              },
              {
                type: "input",
                inputType: "text",
                label: "Page Route",
                model: "addScreen.DISTRIBUTOR_SCREEN_ROUTE",
                placeholder: "Enter page route. Example: screen-access",
                required: true,
                validator: "string",
                styleClasses: "col-md-6"
              },
              {
                type: "vueMultiSelect",
                model: "addScreen.DISTRIBUTOR_SCREEN_PROCESS_ID",
                label: "Process Flow",
                placeholder: "Select Sub module",
                selectOptions: {
                  multiple: false,
                  key: "PROCESS_FLOW_ID",
                  label: "PROCESS_FLOW_NAME",
                  searchable: true
                },
                values: (model, schema) => {
                  return this.processflowList;
                },
                styleClasses: "col-md-6",
                required: true,
                validator: "required",
              },
              {
                type: "input",
                inputType: "text",
                label: "Description",
                model: "addScreen.DISTRIBUTOR_SCREEN_DESC",
                placeholder: "Enter description",
                required: false,
                validator: "string",
                styleClasses: "col-md-6"
              },
              {
                type: "input",
                inputType: "text",
                label: "Code",
                model: "addScreen.DISTRIBUTOR_SCREEN_CODE",
                placeholder: "Enter Code",
                required: true,
                validator: "string",
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
                model: "editScreen.DISTRIBUTOR_MODULE_ID",
                label: "Module",
                placeholder: "Select module",
                selectOptions: {
                  multiple: false,
                  key: "DISTRIBUTOR_MANAGE_MODULE_ID",
                  label: "DISTRIBUTOR_MOD_NAME",
                  searchable: true
                },
                values: (model, schema) => {
                  return this.getmoduleList;
                },
                styleClasses: "col-md-6",
                required: true,
                validator: "required",
              },
              {
                type: "vueMultiSelect",
                model: "editScreen.DISTRIBUTOR_MANAGE_SUBMODULE_ID",
                label: "Submodule",
                placeholder: "Select Sub module",
                selectOptions: {
                  multiple: false,
                  key: "DISTRIBUTOR_MANAGE_SUBMODULE_ID",
                  label: "DISTRIBUTOR_SUBMODULE_NAME",
                  searchable: true
                },
                values: (model, schema) => {
                  return this.getSubmoduleList;
                },
                styleClasses: "col-md-6",
                required: true,
                validator: "required",
              },
              {
                type: "input",
                inputType: "text",
                label: "Screen Name",
                model: "editScreen.DISTRIBUTOR_SCREEN_NAME",
                placeholder: "Enter screen name",
                required: true,
                validator: "string",
                styleClasses: "col-md-6",
                required: true,
                validator: "required",
              },
              {
                type: "input",
                inputType: "text",
                label: "Page Route",
                model: "editScreen.DISTRIBUTOR_SCREEN_ROUTE",
                placeholder: "Enter page route. Example: screen-access",
                required: true,
                validator: "string",
                styleClasses: "col-md-6",
                required: true,
                validator: "required",
              },
              {
                type: "vueMultiSelect",
                model: "editScreen.DISTRIBUTOR_SCREEN_PROCESS_ID",
                label: "Process Flow",
                placeholder: "Select Sub module",
                selectOptions: {
                  multiple: false,
                  key: "PROCESS_FLOW_ID",
                  label: "PROCESS_FLOW_NAME",
                  searchable: true
                },
                values: (model, schema) => {
                  return this.processflowList;
                },
                styleClasses: "col-md-6",
                required: true,
                validator: "required",
              },
              {
                type: "input",
                inputType: "text",
                label: "Description",
                model: "editScreen.DISTRIBUTOR_SCREEN_DESC",
                placeholder: "Enter description",
                required: false,
                validator: "string",
                styleClasses: "col-md-6"
              },
              {
                type: "input",
                inputType: "text",
                label: "Code",
                model: "editScreen.DISTRIBUTOR_SCREEN_CODE",
                placeholder: "Enter Code",
                required: true,
                validator: "string",
                styleClasses: "col-md-6"
              },
            ]
          }
        ]
      },

      //Group
      editGroupSchema: {
        groups: [
          {
            styleClasses: "row mt-2",
            fields: [
            {
                type: "input",
                inputType: "Text",
                model: "editGroup.DISTRIBUTOR_MANAGE_GROUP_NAME",
                label: "Group Name",
                placeholder: "Enter Group Name",
                required: true,
                styleClasses: "col-md-12",
                
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
                inputType: "Text",
                model: "editModule.DISTRIBUTOR_MOD_CODE",
                label: "Code",
                placeholder: "Enter Module Code",
                required: true,
                styleClasses: "col-md-12",
                
              },
              {
                type: "input",
                inputType: "Text",
                model: "editModule.DISTRIBUTOR_MOD_NAME",
                label: "Module Name",
                placeholder: "Enter Module Name",
                required: true,
                styleClasses: "col-md-12",
                
              },
              {
                type: "input",
                inputType: "Text",
                model: "editModule.DISTRIBUTOR_MOD_SNAME",
                label: "Module Short Name",
                placeholder: "Enter Module Short Name",
                required: true,
                styleClasses: "col-md-12",
                
              },
              {
                type: "input",
                inputType: "Text",
                model: "editModule.DISTRIBUTOR_MOD_INDEX",
                label: "Index",
                placeholder: "Enter Index",
                required: true,
                styleClasses: "col-md-12",
                
              },
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
                model: "EDIT_DISTRIBUTOR_MODULE_ID",
                label: "Module",
                placeholder: "Select module",
                selectOptions: {
                  multiple: false,
                  key: "DISTRIBUTOR_MODULE_ID",
                  label: "DISTRIBUTOR_MOD_NAME",
                  searchable: true
                },
                values: (model, schema) => {
                  return this.getmoduleList;
                },
                styleClasses: "col-md-12"
              },
              {
                type: "input",
                inputType: "text",
                label: "Sub Module Code",
                model: "EDIT_DISTRIBUTOR_SUBMODULE_CODE",
                placeholder: "Enter code",
                required: true,
                validator: "string",
                styleClasses: "col-md-12"
              },
              {
                type: "input",
                inputType: "text",
                label: "Sub Module Name",
                model: "EDIT_DISTRIBUTOR_SUBMODULE_NAME",
                placeholder: "Enter name",
                required: true,
                validator: "string",
                styleClasses: "col-md-12"
              }
            ]
          }
        ]
      },

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
</style>

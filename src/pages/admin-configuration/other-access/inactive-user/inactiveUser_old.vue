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
              ref="editTab4Form"
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
            Edit Module<i class="close icon">&times;</i>
          </div>
          <div class="content">
            <vue-form-generator
              :model="model"
              :schema="editModuleSchema"
              :options="formOptions"
              ref="editTab1Form"
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
          <div class="header">
            Edit Screen<i class="close icon">&times;</i>
          </div>
          <div class="">
            <vue-form-generator
              :model="model"
              :schema="editScreenSchema"
              :options="formOptions"
              ref="editTab3Form"
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
            <br/>
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
                  <i :class="props.rowData.CONSULTANT_MOD_ICON"></i>
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
            <br/>
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
  watch: {},
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
    getAllModulee: async function() {
      const response = await servicesModule0.getAllConsManageModuleList();
      this.moduleList = response;
      this.moduleListCount = this.moduleList.length;
    },
        
    async addModule() {
      if (this.$refs.Tab1Form.validate()) {
        try {
          this.isLoader = true; // loder 
          const data = new FormData();
          data.append("CONSULTANT_MOD_CODE", this.model.CONSULTANT_MOD_CODE);
          data.append("CONSULTANT_MOD_NAME", this.model.CONSULTANT_MOD_NAME);
          data.append("CONSULTANT_MOD_SNAME", this.model.CONSULTANT_MOD_SNAME);
          data.append("CONSULTANT_MOD_INDEX", this.model.CONSULTANT_MOD_INDEX);
          data.append("CONSULTANT_MOD_ICON", this.model.selectedIcon1);
          // console.log("data :" + data);
          // eslint-disable-next-line no-unused-vars
          const response = await servicesModule0.createConsManageModule(data);
          console.log(response);
          this.getAllModulee();
          this.isLoader = false; // Kill loder 
        } catch (error) {
          console.log(error);
        }
      }  
    },

    async editModule(data) {
      this.isLoader = true; // loder
      const response = await servicesModule0.getConsManageModuleById(
        data.CONSULTANT_MANAGE_MODULE_ID
      );
      this.$modals.simpleModalEditModule.$show();
      this.CONSULTANT_MANAGE_MODULE_ID = response.CONSULTANT_MANAGE_MODULE_ID;
      this.model.editModule = response;
      console.log(response);
      this.isLoader = false; // Kill loder
    },
    async updateModuleAPI() {
      if (this.$refs.editTab1Form.validate()) {
        try {
          this.isLoader = true; // loder 
          const data = new FormData();
          data.append(
            "CONSULTANT_MANAGE_MODULE_ID",
            this.CONSULTANT_MANAGE_MODULE_ID
          );
          data.append("CONSULTANT_MOD_CODE", this.model.editModule.CONSULTANT_MOD_CODE);
          data.append("CONSULTANT_MOD_NAME", this.model.editModule.CONSULTANT_MOD_NAME);
          data.append("CONSULTANT_MOD_SNAME", this.model.editModule.CONSULTANT_MOD_SNAME);
          data.append("CONSULTANT_MOD_INDEX", this.model.editModule.CONSULTANT_MOD_INDEX);        
          const response = await servicesModule0.updateConsManageModule(data);
          this.getAllModulee();
          this.isLoader = false; // Kill loder 
        } catch (error) {
          console.log(error);
        }
      }  
    },
    async deleteModule(data) {
      if (confirm("Are you sure you want to delete?")) {
        // eslint-disable-next-line no-unused-vars
        this.isLoader = true; // loder 
        const response = await servicesModule0.deleteConsManageModule(
          data.CONSULTANT_MANAGE_MODULE_ID
        );
        this.getAllModulee();
        this.isLoader = false; // Kill loder 
      }  
    },

        //--------------------- Dist Submodule

        getAllModuleforSubmodule: async function() {
      const response = await servicesModule0.getAllConsModuleList();
      this.getmoduleList = response;
    },

    getAllSubModule: async function() {
      const response = await servicesModule0.getAllConsManageSubModuleList();
      this.submoduleList = response;
      this.submoduleListCount = this.submoduleList.length;
    },
        
    async addSubmodule() {
      if (this.$refs.Tab2Form.validate()) {
        try {
          this.isLoader = true; // loder
          const data = new FormData();
          data.append("CONSULTANT_MODULE_ID", this.model.CONSULTANT_MODULE_ID.CONSULTANT_MANAGE_MODULE_ID);
          data.append("CONSULTANT_SUBMODULE_NAME", this.model.CONSULTANT_SUBMODULE_NAME);
          data.append("CONSULTANT_SUBMODULE_CODE", this.model.CONSULTANT_SUBMODULE_CODE);
      
          const response = await servicesModule0.createConsManageSubModule(data);
          console.log(response);
          this.getAllSubModule();
          this.isLoader = false; // Kill loder 
        } catch (error) {
          console.log(error);
        }
      }  
    },

    async editSubmodule(data) {
      this.isLoader = true; // loder
      const response = await servicesModule0.getConsManageSubModuleById(
        data.CONSULTANT_MANAGE_SUBMODULE_ID
      );
       this.CONSULTANT_MANAGE_SUBMODULE_ID =  data.CONSULTANT_MANAGE_SUBMODULE_ID;
      this.model.EDIT_CONSULTANT_MODULE_ID = {
        CONSULTANT_MANAGE_MODULE_ID : response.CONSULTANT_MANAGE_MODULE_ID,
        CONSULTANT_MOD_NAME : response.CONSULTANT_MOD_NAME,
      },
      this.model.EDIT_CONSULTANT_SUBMODULE_NAME = response.CONSULTANT_SUBMODULE_NAME;
      this.model.EDIT_CONSULTANT_SUBMODULE_CODE = response.CONSULTANT_SUBMODULE_CODE;
      this.$modals.simpleModalEditSubmodule.$show();
      this.isLoader = false; // Kill loder 
    },
    async updateSubmoduleAPI() {
      if (this.$refs.editTab2Form.validate()) {
        try {
          this.isLoader = true; // loder
          const data = new FormData();
          data.append(
            "CONSULTANT_MANAGE_SUBMODULE_ID",
            this.CONSULTANT_MANAGE_SUBMODULE_ID
          );
          data.append("CONSULTANT_MODULE_ID", this.model.EDIT_CONSULTANT_MODULE_ID.CONSULTANT_MANAGE_MODULE_ID);
          data.append("CONSULTANT_SUBMODULE_NAME", this.model.EDIT_CONSULTANT_SUBMODULE_NAME);
          data.append("CONSULTANT_SUBMODULE_CODE", this.model.EDIT_CONSULTANT_SUBMODULE_CODE);
          const response = await servicesModule0.updateConsManageSubModule(data);
          this.getAllSubModule();
          this.isLoader = false; // Kill loder 
        } catch (error) {
          console.log(error);
        }
      }  
    },
    async deleteSubmodule(data) {
      if (confirm("Are you sure you want to delete?")) {
        // eslint-disable-next-line no-unused-vars
        this.isLoader = true; // loder
        const response = await servicesModule0.deleteConsManageSubModule(
          data.CONSULTANT_MANAGE_SUBMODULE_ID
        );
        this.getAllSubModule();
        this.isLoader = false; // Kill loder 
      }  
    },

    //------------- Dist Screen Page 
    getAllProcessflow: async function() {
      const response = await servicesModule0.getAllConsProcessFlowList();
      this.processflowList = response;
    },
    getAllGetSubmodule: async function() {
      const response = await servicesModule0.getAllConssubModuleList();
      this.getSubmoduleList = response;
    },

    getAllModuleforSubmodule: async function() {
      const response = await servicesModule0.getAllConsModuleList();
      this.getmoduleList = response;
    },

    getAllScreen: async function() {
      const response = await servicesModule0.getAllConsManageScreenList();
      this.screenList = response;
      this.screenPageListCount = this.screenList.length;
      this.isDataReady = true; // Kill Page Loader
    },
        
    async addScreen() {
      if (this.$refs.Tab3Form.validate()) {
        try {
          this.isLoader = true; // loder
          const data = new FormData();
          data.append("CONSULTANT_MODULE_ID", this.model.addScreen.CONSULTANT_MODULE_ID.CONSULTANT_MANAGE_MODULE_ID);
          data.append("CONSULTANT_MANAGE_SUBMODULE_ID", this.model.addScreen.CONSULTANT_MANAGE_SUBMODULE_ID.CONSULTANT_MANAGE_SUBMODULE_ID);
          data.append("CONSULTANT_SCREEN_PROCESS_ID", this.model.addScreen.CONSULTANT_SCREEN_PROCESS_ID.PROCESS_FLOW_ID);
          data.append("CONSULTANT_SCREEN_NAME", this.model.addScreen.CONSULTANT_SCREEN_NAME);
          data.append("CONSULTANT_SCREEN_ROUTE", this.model.addScreen.CONSULTANT_SCREEN_ROUTE);
          data.append("CONSULTANT_SCREEN_DESC", this.model.addScreen.CONSULTANT_SCREEN_DESC);
          const response = await servicesModule0.createConsManageScreen(data);
          console.log(response);
          this.getAllScreen();
          this.isLoader = false; // Kill loder 
        } catch (error) {
          console.log(error);
        }
      }  
    },

    async editScreen(data) {
      this.isLoader = true; // loder
      const response = await servicesModule0.getConsManageScreenById(
        data.CONSULTANT_MANAGE_SCREEN_ID
      );
      console.log(response);
        this.CONSULTANT_MANAGE_SCREEN_ID = response.CONSULTANT_MANAGE_SCREEN_ID;
        this.model.editScreen.CONSULTANT_SC_MODULE_ID = {
          CONSULTANT_MANAGE_MODULE_ID : response.CONSULTANT_MANAGE_MODULE_ID,
          CONSULTANT_MOD_NAME : response.CONSULTANT_MOD_NAME,
        }
        this.model.editScreen.CONSULTANT_MANAGE_SUBMODULE_ID = {
          CONSULTANT_MANAGE_SUBMODULE_ID : response.CONSULTANT_MANAGE_SUBMODULE_ID,
          CONSULTANT_SUBMODULE_NAME : response.CONSULTANT_SUBMODULE_NAME,
        }
        this.model.editScreen.CONSULTANT_SCREEN_PROCESS_ID = {
          PROCESS_FLOW_ID : response.PROCESS_FLOW_ID,
          PROCESS_FLOW_NAME : response.PROCESS_FLOW_NAME,
        }
        this.model.editScreen.CONSULTANT_SCREEN_NAME = response.CONSULTANT_SCREEN_NAME;
        this.model.editScreen.CONSULTANT_SCREEN_DESC = response.CONSULTANT_SCREEN_DESC;
        this.model.editScreen.CONSULTANT_SCREEN_ROUTE = response.CONSULTANT_SCREEN_ROUTE;


      this.$modals.simpleModalEditScreen.$show();
      //this.model = response;
      console.log(response);
      this.isLoader = false; // Kill loder 
    },
    async updateScreenAPI() {
      if (this.$refs.editTab3Form.validate()) {
        try {
          this.isLoader = true; // loder
          const data = new FormData();
          data.append(
            "CONSULTANT_MANAGE_SCREEN_ID",
            this.CONSULTANT_MANAGE_SCREEN_ID
          );
          data.append("CONSULTANT_MODULE_ID", this.model.editScreen.CONSULTANT_SC_MODULE_ID.CONSULTANT_MANAGE_MODULE_ID);
          data.append("CONSULTANT_MANAGE_SUBMODULE_ID", this.model.editScreen.CONSULTANT_MANAGE_SUBMODULE_ID.CONSULTANT_MANAGE_SUBMODULE_ID);
          data.append("CONSULTANT_SCREEN_PROCESS_ID", this.model.editScreen.CONSULTANT_SCREEN_PROCESS_ID.PROCESS_FLOW_ID);
          data.append("CONSULTANT_SCREEN_NAME", this.model.editScreen.CONSULTANT_SCREEN_NAME);
          data.append("CONSULTANT_SCREEN_ROUTE", this.model.editScreen.CONSULTANT_SCREEN_ROUTE);
          data.append("CONSULTANT_SCREEN_DESC", this.model.editScreen.CONSULTANT_SCREEN_DESC);
          
          const response = await servicesModule0.updateConsManageScreen(data);
          this.getAllScreen();
          this.isLoader = false; // Kill loder 
        } catch (error) {
          console.log(error);
        }
      }  
    },
    async deleteScreen(data) {
      if (confirm("Are you sure you want to delete?")) {
        // eslint-disable-next-line no-unused-vars
        this.isLoader = true; // loder
        const response = await servicesModule0.deleteConsManageScreen(
          data.CONSULTANT_MANAGE_SCREEN_ID
        );
        this.getAllScreen();
        this.isLoader = false; // Kill loder 
      }  
    },
      




    //----------------------group-----------------/
    getAllGroupName: async function () {
      const response = await servicesModule0.getAllConsManageGroupList();
      this.groupList = response;
      this.groupCount = this.groupList.length;
    },
    

   
    async addGroup() {
      if (this.$refs.Tab4Form.validate()) {
        this.isLoader = true; // loder
        const data = new FormData();
        data.append("CONSULTANT_GROUP_NAME", this.model.CONSULTANT_GROUP_NAME);
        try {
          console.log(data);
          const response = await servicesModule0.createConsManageGroup(data);
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
      const response = await servicesModule0.getConsManageGroupById(
        data.CONSULTANT_MANAGE_GROUP_ID
      );
      this.$modals.simpleModalEditGroup.$show();
      this.CONSULTANT_MANAGE_GROUP_ID = response.CONSULTANT_MANAGE_GROUP_ID;
      this.model.EDIT_CONSULTANT_GROUP_NAME =  response.CONSULTANT_GROUP_NAME; //this.model.editGroup = response;
      //console.log( this.model.editGroup);
      this.isLoader = false; // Kill loder 
    },
    async updateGroupAPI() {
      if (this.$refs.editTab4Form.validate()) {
        try {
          this.isLoader = true; // loder
          const data = new FormData();
          data.append(
            "CONSULTANT_MANAGE_GROUP_ID",
            this.CONSULTANT_MANAGE_GROUP_ID
          );
          data.append("CONSULTANT_GROUP_NAME", this.model.EDIT_CONSULTANT_GROUP_NAME);
          
          const response = await servicesModule0.updateConsManageGroup(data);
          this.getAllGroupName();
          this.isLoader = false; // Kill loder 
        } catch (error) {
          console.log(error);
        }
      }  
    },
    async deleteGroup(data) {
      if (confirm("Are you sure you want to delete?")) {
        // eslint-disable-next-line no-unused-vars
        this.isLoader = true; // loder
        const response = await servicesModule0.deleteConsManageGroup(
          data.CONSULTANT_MANAGE_GROUP_ID
        );
        this.getAllGroupName();
        this.isLoader = false; // Kill loder 
      }  
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
          name: "CONSULTANT_GROUP_NAME",
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
    GroupNameFilteredData() {
      if (!this.term || this.term.length < 1) {
        return this.groupList;
      }
    },
    //tab1
    moduleFields() {
      return [
        {
          name: "__slot:no",
          title: "No"
        },
        {
          name: "CONSULTANT_MOD_CODE",
          title: "Code"
        },
        {
          name: "CONSULTANT_MOD_NAME",
          title: "Module Name"
        },
        {
          name: "CONSULTANT_MOD_SNAME",
          title: "Short Name"
        },
        {
          name: "CONSULTANT_MOD_INDEX",
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
    moduleFilteredData() {
      if (!this.term || this.term.length < 1) {
        return this.moduleList;
      }
    },
    // submoduleFilteredData() {
    //   if (!this.term || this.term.length < 1) {
    //     return this.submoduleList;
    //   }
    // },
    //tab2
    submoduleSchema() {
      return [
        {
          name: "__slot:no",
          title: "No"
        },
        {
          name: "CONSULTANT_MOD_NAME",
          title: "Module Name"
        },
        {
          name: "CONSULTANT_SUBMODULE_CODE",
          title: "Sub Module Code"
        },
        {
          name: "CONSULTANT_SUBMODULE_NAME",
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
    submoduleFilteredData() {
      if (!this.term || this.term.length < 1) {
        return this.submoduleList;
      }
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
          name: "CONSULTANT_SUBMODULE_NAME",
          title: "Submodule Name"
        },
        {
          name: "CONSULTANT_SCREEN_NAME",
          title: "Screen Name"
        },
        {
          name: "CONSULTANT_SCREEN_ROUTE",
          title: "Page Route"
        },
        {
          name: "PROCESS_FLOW_NAME",
          title: "Process Flow"
        },
        {
          name: "CONSULTANT_SCREEN_DESC",
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
    screenPageFilteredData() {
      if (!this.term || this.term.length < 1) {
        return this.screenList;
      }
    }
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
        CONSULTANT_MOD_CODE: "",
        CONSULTANT_MOD_NAME: "",
        CONSULTANT_MOD_SNAME:"",
        CONSULTANT_MOD_INDEX:"",
        CONSULTANT_MOD_ICON: "",
        selectedIcon1: '',

        editModule: {
        CONSULTANT_MOD_CODE: "",
        CONSULTANT_MOD_NAME: "",
        CONSULTANT_MOD_SNAME: "",
        CONSULTANT_MOD_INDEX: "",
        CONSULTANT_MOD_ICON: "", 
        },

        CONSULTANT_MODULE_ID: '',
        CONSULTANT_SUBMODULE_NAME: "",
        CONSULTANT_SUBMODULE_CODE: "",

        EDIT_CONSULTANT_MODULE_ID: '',
        EDIT_CONSULTANT_SUBMODULE_NAME: "",
        EDIT_CONSULTANT_SUBMODULE_CODE: "",

        addScreen: {
          CONSULTANT_MODULE_ID: '',
          CONSULTANT_MANAGE_SUBMODULE_ID: '',
          CONSULTANT_SCREEN_PROCESS_ID: '',
          CONSULTANT_SCREEN_NAME: '',
          CONSULTANT_SCREEN_ROUTE: '',
          CONSULTANT_SCREEN_DESC: '',
        },

        editScreen: {
          CONSULTANT_SC_MODULE_ID: '',
          CONSULTANT_MANAGE_SUBMODULE_ID: '',
          CONSULTANT_SCREEN_PROCESS_ID: '',
          CONSULTANT_SCREEN_NAME: '',
          CONSULTANT_SCREEN_ROUTE: '',
          CONSULTANT_SCREEN_DESC: '',
        },

        // EDIT_CONSULTANT_SC_MODULE_ID: '',
        // EDIT_CONSULTANT_MANAGE_SUBMODULE_ID: '',
        // EDIT_CONSULTANT_SCREEN_PROCESS_ID: '',
        // EDIT_CONSULTANT_SCREEN_NAME: '',
        // EDIT_CONSULTANT_SCREEN_ROUTE: '',
        // EDIT_CONSULTANT_SCREEN_DESC: '',

        CONSULTANT_GROUP_NAME: '',
        EDIT_CONSULTANT_GROUP_NAME:'',

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
                validator: "string",
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
                model: "CONSULTANT_GROUP_NAME",
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
                model: "CONSULTANT_MOD_CODE",
                placeholder: "Enter code",
                required: true,
                validator: "string",
                styleClasses: "col-md-6"
              },
              {
                type: "input",
                inputType: "text",
                label: "MODULE NAME",
                model: "CONSULTANT_MOD_NAME",
                placeholder: "Enter module name",
                required: true,
                validator: "string",
                styleClasses: "col-md-6"
              },
              {
                type: "input",
                inputType: "text",
                label: "MODULE SHORT NAME",
                model: "CONSULTANT_MOD_SNAME",
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
                model: "CONSULTANT_MOD_INDEX",
                required: true,
                validator: "required",
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
                model: "CONSULTANT_MODULE_ID",
                label: "Module",
                placeholder: "Select module",
                selectOptions: {
                  multiple: false,
                  key: "CONSULTANT_MANAGE_MODULE_ID",
                  label: "CONSULTANT_MOD_NAME",
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
                type: "input",
                inputType: "text",
                label: "Sub Module Code",
                model: "CONSULTANT_SUBMODULE_CODE",
                placeholder: "Enter code",
                required: true,
                validator: "string",
                styleClasses: "col-md-6"
              },
              {
                type: "input",
                inputType: "text",
                label: "Sub Module Name",
                model: "CONSULTANT_SUBMODULE_NAME",
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
                model: "addScreen.CONSULTANT_MODULE_ID",
                label: "Module",
                placeholder: "Select module",
                selectOptions: {
                  multiple: false,
                  key: "CONSULTANT_MANAGE_MODULE_ID",
                  label: "CONSULTANT_MOD_NAME",
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
                model: "addScreen.CONSULTANT_MANAGE_SUBMODULE_ID",
                label: "Submodule",
                placeholder: "Select Sub module",
                selectOptions: {
                  multiple: false,
                  key: "CONSULTANT_MANAGE_SUBMODULE_ID",
                  label: "CONSULTANT_SUBMODULE_NAME",
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
                model: "addScreen.CONSULTANT_SCREEN_NAME",
                placeholder: "Enter screen name",
                required: true,
                validator: "string",
                styleClasses: "col-md-6"
              },
              {
                type: "input",
                inputType: "text",
                label: "Page Route",
                model: "addScreen.CONSULTANT_SCREEN_ROUTE",
                placeholder: "Enter page route. Example: screen-access",
                required: true,
                validator: "string",
                styleClasses: "col-md-6"
              },
              {
                type: "vueMultiSelect",
                model: "addScreen.CONSULTANT_SCREEN_PROCESS_ID",
                label: "Process Flow",
                placeholder: "Select Process Flow",
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
                model: "addScreen.CONSULTANT_SCREEN_DESC",
                placeholder: "Enter description",
                required: false,
                validator: "string",
                styleClasses: "col-md-6"
              }
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
                model: "editScreen.CONSULTANT_SC_MODULE_ID",
                label: "Module",
                placeholder: "Select module",
                selectOptions: {
                  multiple: false,
                  key: "CONSULTANT_MANAGE_MODULE_ID",
                  label: "CONSULTANT_MOD_NAME",
                  searchable: true
                },
                values: (model, schema) => {
                  return this.getmoduleList;
                },
                styleClasses: "col-md-6"
              },
              {
                type: "vueMultiSelect",
                model: "editScreen.CONSULTANT_MANAGE_SUBMODULE_ID",
                label: "Submodule",
                placeholder: "Select Sub module",
                selectOptions: {
                  multiple: false,
                  key: "CONSULTANT_MANAGE_SUBMODULE_ID",
                  label: "CONSULTANT_SUBMODULE_NAME",
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
                model: "editScreen.CONSULTANT_SCREEN_NAME",
                placeholder: "Enter screen name",
                required: true,
                validator: "string",
                styleClasses: "col-md-6"
              },
              {
                type: "input",
                inputType: "text",
                label: "Page Route",
                model: "editScreen.CONSULTANT_SCREEN_ROUTE",
                placeholder: "Enter page route. Example: screen-access",
                required: true,
                validator: "string",
                styleClasses: "col-md-6"
              },
              {
                type: "vueMultiSelect",
                model: "editScreen.CONSULTANT_SCREEN_PROCESS_ID",
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
                styleClasses: "col-md-6"
              },
              {
                type: "input",
                inputType: "text",
                label: "Description",
                model: "editScreen.CONSULTANT_SCREEN_DESC",
                placeholder: "Enter description",
                required: false,
                validator: "string",
                styleClasses: "col-md-6"
              }
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
                model: "EDIT_CONSULTANT_GROUP_NAME",
                label: "Group Name",
                placeholder: "Enter Group Name",
                required: true,
                validator: "required",
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
                model: "editModule.CONSULTANT_MOD_CODE",
                label: "Module Code",
                placeholder: "Enter Module Code",
                required: true,
                validator: "required",
                styleClasses: "col-md-12",
                
              },
              {
                type: "input",
                inputType: "Text",
                model: "editModule.CONSULTANT_MOD_NAME",
                label: "Module Name",
                placeholder: "Enter Module Name",
                required: true,
                validator: "required",
                styleClasses: "col-md-12",
                
              },
              {
                type: "input",
                inputType: "Text",
                model: "editModule.CONSULTANT_MOD_SNAME",
                label: "Module Short Name",
                placeholder: "Enter Module Short Name",
                required: true,
                validator: "required",
                styleClasses: "col-md-12",
                
              },
              {
                type: "input",
                inputType: "Text",
                model: "editModule.CONSULTANT_MOD_INDEX",
                label: "Index",
                placeholder: "Enter Index",
                required: true,
                validator: "required",
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
                model: "EDIT_CONSULTANT_MODULE_ID",
                label: "Module",
                placeholder: "Select module",
                selectOptions: {
                  multiple: false,
                  key: "CONSULTANT_MANAGE_MODULE_ID",
                  label: "CONSULTANT_MOD_NAME",
                  searchable: true
                },
                values: (model, schema) => {
                  return this.getmoduleList;
                },
                styleClasses: "col-md-12",
                required: true,
                validator: "required",
              },
              {
                type: "input",
                inputType: "text",
                label: "Sub Module Code",
                model: "EDIT_CONSULTANT_SUBMODULE_CODE",
                placeholder: "Enter code",
                required: true,
                validator: "string",
                styleClasses: "col-md-12"
              },
              {
                type: "input",
                inputType: "text",
                label: "Sub Module Name",
                model: "EDIT_CONSULTANT_SUBMODULE_NAME",
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

/* eslint-disable no-unused-expressions */
<template>
  <va-card>
   <loder v-show="isLoader" />

    <div class="text-center text-danger my-2" v-if="!isDataReady">
      <b-spinner class="align-middle"></b-spinner>
      <strong>Loading...</strong>
    </div>
    <div v-else>
      <!-- division -->
      <vudal name="loadingModal" class="widthModal">
        <div class="header">Edit Division<i class="close icon">&times;</i></div>
        <div class="">
          <div class="text-center text-danger my-2" v-if="!isDataReady">
            <b-spinner class="align-middle"></b-spinner>
            <strong>Loading...</strong>
          </div>
        </div>
      </vudal>

      <!-- division -->
      <vudal name="simpleModalEditDivision" class="widthModal">
        <div class="header">Edit Division<i class="close icon">&times;</i></div>
        <div class="">
          <vue-form-generator
            :model="model"
            :schema="editDivisionSchema"
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
            @click="updateDivisionAPI"
            type="button"
            class="vudal-btn mr-2 btn btn-primary btn-fill btn-md"
          >
            <i class="fa fa-edit" /> &nbsp; {{ updateButton }}
          </button>
        </div>
      </vudal>
      <!-- department -->
      <vudal name="simpleModalEditDepartment" class="widthModal">
        <div class="header">Edit Department<i class="close icon">&times;</i></div>
        <div class="">
          <vue-form-generator
            :model="model"
            :schema="editDepartmentSchema"
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
            @click="updateDepartmentAPI"
            type="button"
            class="vudal-btn mr-2 btn btn-primary btn-fill btn-md"
          >
            <i class="fa fa-edit" /> &nbsp; {{updateButton}}
          </button>
        </div>
      </vudal>
      <!-- group -->
      <vudal name="simpleModalEditGroup" class="widthModal">
        <div class="header">Edit Group<i class="close icon">&times;</i></div>
        <div class="">
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
            class="vudal-btn mr-2 btn btn-primary btn-fill btn-md"
          >
            <i class="fa fa-edit" /> &nbsp; {{updateButton}}
          </button>
        </div>
      </vudal>
      <!-- auth -->
      <vudal name="simpleModalEditAuth" class="widthModal">
        <div class="header">
          Edit Authorization Level<i class="close icon">&times;</i>
        </div>
        <div class="content">
          <vue-form-generator
            :model="model"
            :schema="editAuthSchema"
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
            @click="updateAuthAPI"
            type="button"
            class="vudal-btn mr-2 btn btn-primary btn-fill btn-md"
          >
            <i class="fa fa-edit" /> &nbsp; {{updateButton}}
          </button>
        </div>
      </vudal>
      <h4 slot="header" class="card-title">Group Management</h4>
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
          <div class="text-center">
            <button
              @click="addDivision"
              type="button"
              class="btn btn-warning btn-fill btn-md"
            >
              <i class="fa fa-plus" /> &nbsp; {{ addButton }} Division
            </button>
          </div>
          <br />
          <div class="float-right">
            <va-input
              :value="term"
              :placeholder="$t('Search')"
              @input="searchDivision" 
              removable
            >
              <va-icon name="fa fa-search" slot="prepend" />
            </va-input>
          </div>
          <br />
          <h4>List of Divisions</h4>
          <br />

          <!-- list -->
          <va-card class="mt-2">
            <va-data-table
              :fields="divisionFields"
              :data="divisionFilteredData"
              :per-page="parseInt(perPage)"
              :datacount="DivisionCount"
              :dataperpage="parseInt(perPage)"
              clickable
            >
              <template slot="no" slot-scope="row">
                {{ row.rowIndex + 1 }}
              </template>

              <template slot="actions" slot-scope="props">
                <h4 class="mt-2">
                  <span
                    v-b-tooltip.hover
                    title="edit"
                    v-on:click="editDivision(props.rowData)"
                    class="badge badge-primary mr-2"
                  >
                    <i class="fa fa-edit"></i
                  ></span>
                  <span
                    v-b-tooltip.hover
                    title="delete"
                    v-on:click="deleteDivision(props.rowData)"
                    class="badge badge-danger mr-1"
                  >
                    <i class="fa fa-trash"></i
                  ></span>
                </h4>
              </template>
            </va-data-table>
          </va-card>
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
          <br />
          <div class="text-center">
            <button
              @click="addDepartment"
              type="button"
              class="btn btn-warning btn-fill btn-md"
            >
              <i class="fa fa-plus" /> &nbsp;  {{addButton}} Department
            </button>
          </div>
          <br />
          <div class="float-right">
            <va-input
              :value="term"
              :placeholder="$t('Search')"
              @input="searchDepartment" 
              removable
            >
              <va-icon name="fa fa-search" slot="prepend" />
            </va-input>
          </div>
          <br />

          <h4>List of Departments</h4>
          <br />
          <!-- 
          <vue-form-generator
            :model="model"
            :schema="dpmtFilterSchema"
            :options="formOptions"
            ref="dpmtForm"
            @model-updated="onModelUpdatedDpmt"
          >
          </vue-form-generator>
          <div class="float-right">
            <button
              @click="filterDpmtSearch"
              type="button"
              class="ml-2 btn btn-primary"
            >
              Search
            </button>
          </div>
          -->
          <br /><br />
          <va-card class="mt-2">
            <va-data-table
              :fields="departmentFields"
              :data="dpmtFilteredData"
              :per-page="parseInt(perPage)"
              :datacount="DepartmentCount"
              :dataperpage="parseInt(perPage)"
              clickable
            >
              <br />
              <template slot="no" slot-scope="row">
                {{ row.rowIndex + 1 }}
              </template>

              <template slot="actions" slot-scope="props">
                <h4 class="mt-1">
                  <span
                    v-b-tooltip.hover
                    title="edit"
                    v-on:click="editDepartment(props.rowData)"
                    class="badge badge-primary mr-2"
                  >
                    <i class="fa fa-edit"></i
                  ></span>
                  <span
                    v-b-tooltip.hover
                    title="delete"
                    v-on:click="deleteDepartment(props.rowData)"
                    class="badge badge-danger mr-1"
                  >
                    <i class="fa fa-trash"></i
                  ></span>
                </h4>
              </template>
            </va-data-table>
          </va-card>
        </div>
      </div>
      <div v-if="currentTab === 'tab3'">
        <br />
        <vue-form-generator
          :model="model"
          :schema="Tab3Schema"
          :options="formOptions"
          ref="Tab3Form"
        >
        </vue-form-generator>
        <br />
        <div class="text-center">
          <button
            @click="addGroup"
            type="button"
            class="btn btn-warning btn-fill btn-md"
          >
            <i class="fa fa-plus" /> &nbsp;  {{ addButton }} Group
          </button>
        </div>
        <br />
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

        <h4>List of Groups</h4>
        <br />
        <!-- 
        <vue-form-generator
          :model="model"
          :schema="groupFilterSchema"
          :options="formOptions"
          ref="groupForm"
          @model-updated="onModelUpdatedGroup"
        >
        </vue-form-generator>
        <div class="float-right">
          <button
            @click="filterGroupSearch"
            type="button"
            class="ml-2 btn btn-primary"
          >
            Search
          </button>
        </div>
        -->

        <br /><br />
        <va-card class="mt-2">
          <va-data-table
            :fields="groupFields"
            :data="groupFilteredData"
            :per-page="parseInt(perPage)"
            :datacount="GroupCount"
            :dataperpage="parseInt(perPage)"
            clickable
          >
            <template slot="no" slot-scope="row">
              {{ row.rowIndex + 1 }}
            </template>

            <template slot="actions" slot-scope="props">
              <h4 class="mt-1">
                <span
                  v-b-tooltip.hover
                  title="edit"
                  v-on:click="editGroup(props.rowData)"
                  class="badge badge-primary mr-2"
                >
                  <i class="fa fa-edit"></i
                ></span>
                <span
                  v-b-tooltip.hover
                  title="delete"
                  v-on:click="deleteGroup(props.rowData)"
                  class="badge badge-danger mr-1"
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
          :schema="Tab4Schema"
          :options="formOptions"
          ref="Tab4Form"
        >
        </vue-form-generator>
        <br />
        <div class="text-center">
          <button
            @click="addLevel"
            type="button"
            class="btn btn-warning btn-fill btn-md"
          >
            <i class="fa fa-plus" /> &nbsp;  Add Authorization Level
          </button>
        </div>
        <br />
        <div class="float-right">
          <va-input
            :value="term"
            :placeholder="$t('Search')"
            @input="searchLevel" 
            removable
          >
            <va-icon name="fa fa-search" slot="prepend" />
          </va-input>
        </div>
        <br />

        <h4>List of Authorization Level</h4>
        <br />

        <va-card class="mt-2">
          <va-data-table
            :fields="authFields"
            :data="authFilteredData"
            :per-page="parseInt(perPage)"
            :datacount="AuthCount"
            :dataperpage="parseInt(perPage)"
            clickable
          >
            <template slot="no" slot-scope="row">
              {{ row.rowIndex + 1 }}
            </template>

            <template slot="actions" slot-scope="props">
              <h4 class="mt-1">
                <span
                  v-b-tooltip.hover
                  title="edit"
                  v-on:click="editAuth(props.rowData)"
                  class="badge badge-primary mr-2"
                >
                  <i class="fa fa-edit"></i
                ></span>
                <span
                  v-b-tooltip.hover
                  title="delete"
                  v-on:click="deleteAuth(props.rowData)"
                  class="badge badge-danger mr-1"
                >
                  <i class="fa fa-trash"></i
                ></span>
              </h4>
            </template>
          </va-data-table>
        </va-card>
      </div>

      <br />
      <button @click="back" type="button" class="btn btn-primary btn-fill btn-md">
        <i class="fa fa-step-backward" /> &nbsp; Previous
      </button>
    </div>  
  </va-card>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import Vue from "vue";
import Vudal from "vudal";
import "vue-form-generator/dist/vfg.css";
import Tabs from "vue-tabs-with-active-line";
import * as servicesModule0 from "../../../app/module0/services";
import { debounce } from "lodash";
import loder from "../../request_loader";
const TABS = [
  { title: "Setting 1 : Division", value: "tab1" },
  { title: "Setting 2 : Department", value: "tab2" },
  { title: "Setting 3 : Group", value: "tab3" },
  { title: "Setting 4 : Authorization Level", value: "tab4" },
];

export default {
  mounted() {
    this.getAllDivision();
    this.getAllDepartment();
    this.getAllGroup();
    this.getAllAuth();
  },
  components: {
    Tabs,
    Vudal,loder,
  },

  methods: {
    handleClick(newTab) {
      this.currentTab = newTab;
    }, // end tab
    back() {
      this.$router.go(-1);
    }, // back button

    // --------------------division---------------------------/
    //search Division
    searchDivision: debounce(function (term) {
      this.term = term;
    }, 400),

    getAllDivision: async function () {
      const response = await servicesModule0.getAllDivisionList();
      this.divisionList = response;
      this.DivisionCount = this.divisionList.length;
      this.isDataReady = true; // Loader before get data 
    },
    async addDivision() {
      if (this.$refs.Tab1Form.validate()) {
         this.isLoader = true; // Loder
        this.addButton = "Loading..."; // Data add Loading
        const data = new FormData();
        data.append("DIV_NAME", this.model.divisionName);
        try {
          // eslint-disable-next-line no-unused-vars
          const response = await servicesModule0.createDivision(data);
          this.getAllDivision();
          this.model.divisionName = "";
          this.addButton = "Add"; // Data add Loading
           this.isLoader = false; // kill Loder
        } catch (error) {
          console.log(error);
        }
      }
    },

    async deleteDivision(data) {
      if (confirm("Are you sure you want to delete?")){
        this.isLoader = true; // Loder Before Delete
        // eslint-disable-next-line no-unused-vars
        const response = await servicesModule0.deleteDivision(
          data.MANAGE_DIVISION_ID
        );
        this.getAllDivision();
        this.isLoader = false; // Kill Loder
      }
    },
    async editDivision(data) {
      this.isLoader = true; // Loder Before Edit data load..
      const response = await servicesModule0.getDivisionById(
        data.MANAGE_DIVISION_ID
      );
      this.isLoader = false; // Kill Edit data load..
      this.$modals.simpleModalEditDivision.$show();
      this.MANAGE_DIVISION_ID = response.MANAGE_DIVISION_ID;
      this.model.DIV_NAME = response.DIV_NAME;
    },
    async updateDivisionAPI() {
      try {
        this.updateButton = 'Loading...';
        const data = new FormData();
        data.append("MANAGE_DIVISION_ID", this.MANAGE_DIVISION_ID);
        data.append("DIV_NAME", this.model.DIV_NAME);
        const response = await servicesModule0.updateDivision(data);
        this.getAllDivision();
        this.updateButton = 'Update';
        this.$modals.simpleModalEditDivision.$hide();
      } catch (error) {
        console.log(error);
      }
    },
    // ----------------------department-----------------/
    // Filter Depart Ment
    searchDepartment: debounce(function (term) {
      this.term = term;
    }, 400),

    getAllDepartment: async function () {
      const response = await servicesModule0.getAllDepartmentList();
      this.departmentList = response;
      this.DepartmentCount = this.departmentList.length;
    },
    async getFilteredDepartment() {
      const response = await servicesModule0.getFilteredDepartment();
      this.departmentList = response;
    },
    async addDepartment() {
      if (this.$refs.Tab2Form.validate()) {
         this.isLoader = true; // Loder
        this.addButton = "Loading..."; // Data add Loading
        const data = new FormData();
        data.append(
          "MANAGE_DIVISION_ID",
          this.model.divisionSelection.MANAGE_DIVISION_ID
        );
        data.append("DPMT_NAME", this.model.departmentName);
        try {
          // eslint-disable-next-line no-unused-vars
          const response = await servicesModule0.createDepartment(data);
          this.getAllDepartment();
          this.model.divisionSelection = "";
          this.model.departmentName = "";
          this.addButton = "Add"; // Data add Loading
           this.isLoader = false; // Kill Loder
        } catch (error) {
          console.log(error);
        }
      }
    },
    async deleteDepartment(data) {
      if (confirm("Are you sure you want to delete?")){
        this.isLoader = true; // Loder Before Delete
      // eslint-disable-next-line no-unused-vars
      const response = await servicesModule0.deleteDepartment(
        data.MANAGE_DEPARTMENT_ID
      );
      this.getAllDepartment();
      this.isLoader = false; // Kill Loder Before Delete
      }
    },
    async editDepartment(data) {
      // eslint-disable-next-line no-unused-vars
      this.isLoader = true; // Loder Before Edit data load
      const response = await servicesModule0.getDepartmentById(
        data.MANAGE_DEPARTMENT_ID
      );
      this.$modals.simpleModalEditDepartment.$show();
      this.MANAGE_DEPARTMENT_ID = response.MANAGE_DEPARTMENT_ID;
      this.model.DIVISION = response;
      this.model.DPMT_NAME = response.DPMT_NAME;
      this.isLoader = false; // Kill Loder ...
    },
    async updateDepartmentAPI() {
      try {
        this.updateButton = 'Loading...'; // Data update loader
        const data = new FormData();
        data.append("MANAGE_DEPARTMENT_ID", this.MANAGE_DEPARTMENT_ID);
        data.append(
          "MANAGE_DIVISION_ID",
          this.model.DIVISION.MANAGE_DIVISION_ID
        );
        data.append("DPMT_NAME", this.model.DPMT_NAME);

        // console.log("data :" + data);
        // eslint-disable-next-line no-unused-vars
        const response = await servicesModule0.updateDepartment(data);
        this.updateButton = 'Update'; // Data update loader
        this.getAllDepartment();
        this.$modals.simpleModalEditDepartment.$hide();
        
      } catch (error) {
        console.log(error);
      }
    },
    async filterDpmtSearch(data) {
      const filterData = {
        MANAGE_DIVISION_ID: this.model.modelFilterDpmt.MANAGE_DIVISION
          .MANAGE_DIVISION_ID,
      };
      const response = await servicesModule0.getFilteredDepartment(filterData);
      this.departmentList = response;
    },
    onModelUpdatedDpmt(newVal, schema) {
      if (schema == "modelFilterDpmt.MANAGE_DIVISION") {
        console.log("Department filter " + JSON.stringify(newVal));

        this.filterDpmtSearch();
      }
    },
    // ----------------------group-----------------/
    // Filter GRP Ment
    searchGroup: debounce(function (term) {
      this.term = term;
    }, 400),
    
    getAllGroup: async function () {
      const response = await servicesModule0.getAllGroupList();
      this.groupList = response;
      this.GroupCount = this.groupList.length;
    },
    async addGroup() {
      if (this.$refs.Tab3Form.validate()) {
         this.isLoader = true; // Loder

        this.addButton = "Loading..."; // Data add Loading
        const data = new FormData();
        data.append(
          "MANAGE_DEPARTMENT_ID",
          this.model.departmentSelection.MANAGE_DEPARTMENT_ID
        );
        data.append("GROUP_NAME", this.model.groupName);
        try {
          // eslint-disable-next-line no-unused-vars
          const response = await servicesModule0.createGroup(data);
          this.getAllGroup();
          this.model.departmentSelection = "";
          this.model.groupName = "";
          this.addButton = "Add"; // Data add Loading
        } catch (error) {
          console.log(error);
        }
         this.isLoader = false; // Kill Loder
      }
    },
    async deleteGroup(data) {
      if (confirm("Are you sure you want to delete?")){
        this.isLoader = true; // Loder Before Delete
      // eslint-disable-next-line no-unused-vars
      const response = await servicesModule0.deleteGroup(data.MANAGE_GROUP_ID);
      this.getAllGroup();
      this.isLoader = false; // Kill Loder Before Delete
      }
    },
    async editGroup(data) {
      this.isLoader = true; // Loder Before Edit data load
      // eslint-disable-next-line no-unused-vars
      const response = await servicesModule0.getGroupById(data.MANAGE_GROUP_ID);
      this.$modals.simpleModalEditGroup.$show();
      this.MANAGE_GROUP_ID = response.MANAGE_GROUP_ID;
      this.model.DEPARTMENT = response;
      this.model.GROUP_NAME = response.GROUP_NAME;
      this.isLoader = false; // Kill Loder
    },
    async updateGroupAPI() {
      try {
        this.updateButton = 'Loading...'; // Data update loader
        const data = new FormData();
        data.append("MANAGE_GROUP_ID", this.MANAGE_GROUP_ID);
        data.append(
          "MANAGE_DEPARTMENT_ID",
          this.model.DEPARTMENT.MANAGE_DEPARTMENT_ID
        );
        data.append("GROUP_NAME", this.model.GROUP_NAME);

        // console.log("data :" + data);
        // eslint-disable-next-line no-unused-vars
        const response = await servicesModule0.updateGroup(data);
        this.getAllGroup();
        this.updateButton = 'Update'; // Data update loader
        // Hide edit modal
        this.$modals.simpleModalEditGroup.$hide(); 
      } catch (error) {
        console.log(error);
      }
    },
    async filterGroupSearch(data) {
      const filterData = {
        MANAGE_DEPARTMENT_ID: this.model.modelFilterGroup.MANAGE_DEPARTMENT
          .MANAGE_DEPARTMENT_ID,
      };
      const response = await servicesModule0.getFilteredGroup(filterData);
      this.groupList = response;
    },
    onModelUpdatedGroup(newVal, schema) {
      if (schema == "modelFilterGroup.MANAGE_DEPARTMENT") {
        console.log("Group filter " + JSON.stringify(newVal));

        this.filterGroupSearch();
      }
    },
    // --------------------authorization Level---------------------------/
    // Filter Level Ment
    searchLevel: debounce(function (term) {
      this.term = term;
    }, 400),
    
    getAllAuth: async function () {
      const response = await servicesModule0.getAllAuthorizationLevelList();
      this.authList = response;
      this.AuthCount = this.authList.length;
    },
    
    async addLevel() {
      if (this.$refs.Tab4Form.validate()) {
         this.isLoader = true; // Loder
        this.addButton = "Loading..."; // Data add Loading
        const data = new FormData();
        data.append("AUTHORIZATION_LEVEL_NAME", this.model.authName);
        try {
          // eslint-disable-next-line no-unused-vars
          const response = await servicesModule0.createAuthorizationLevel(data);
          this.getAllAuth();  
          this.model.authName = "";
          this.addButton = "Add"; // Data add Loading
           this.isLoader = false; // Kill Loder
        } catch (error) {
          console.log(error);
        }
      }
    },
    async deleteAuth(data) {
      if (confirm("Are you sure you want to delete?")){
        this.isLoader = true; // Loder Before Delete
      // eslint-disable-next-line no-unused-vars
      const response = await servicesModule0.deleteAuthorizationLevel(
        data.AUTHORIZATION_LEVEL_ID
      );
      this.getAllAuth();
      this.isLoader = false; // Kill Loder Before Delete
      }
    },

    async editAuth(data) {
      this.isLoader = true; // Loder Before Edit data load
      const response = await servicesModule0.getAuthorizationById(
        data.AUTHORIZATION_LEVEL_ID
      );
      this.$modals.simpleModalEditAuth.$show();
      this.AUTHORIZATION_LEVEL_ID = response.AUTHORIZATION_LEVEL_ID;
      this.model.SET_PARAM = response.AUTHORIZATION_LEVEL_NAME;
      this.isLoader = false; // Kill Loder
    },
    async updateAuthAPI() {
      try {
        this.updateButton = 'Loading...'; // Data update loader
        const data = new FormData();
        data.append("AUTHORIZATION_LEVEL_ID", this.AUTHORIZATION_LEVEL_ID);
        data.append("AUTHORIZATION_LEVEL_NAME", this.model.SET_PARAM);

        // console.log("data :" + data);
        // eslint-disable-next-line no-unused-vars
        const response = await servicesModule0.updateAuthorizationLevel(data);
        this.getAllAuth();
        this.updateButton = 'Update'; // Data update loader
        //Hide edit Modal
        this.$modals.simpleModalEditAuth.$hide();
      } catch (error) {
        console.log(error);
      }
    },
  },

  computed: {
    // tab1
    divisionFields() {
      return [
        {
          name: "__slot:no",
          title: "No",
        },
        {
          name: "DIV_NAME",
          title: "Division Name",
        },
        {
          name: "__slot:actions",
          title: "Action",
          dataClass: "justify-content-center",
          width: "15%",
        },
      ];
    },

    // Filter Division Data From Here===
    divisionFilteredData() {
      if (!this.term || this.term.length < 1) {
        return this.divisionList
      }

      return this.divisionList.filter((item) => {
        return this.term
          .toLowerCase()
          .split(" ")
          .every(
            (v) =>
              item.DIV_NAME.toLowerCase().includes(v) 
          );
      });
    },
    
    // tab2
    departmentFields() {
      return [
        {
          name: "__slot:no",
          title: "No",
        },
        {
          name: "DIV_NAME",
          title: "Division Name",
        },
        {
          name: "DPMT_NAME",
          title: "Department Name",
        },
        {
          name: "__slot:actions",
          title: "Action",
          dataClass: "justify-content-center",
          width: "15%",
        },
      ];
    },
    // Department Data Filter
    dpmtFilteredData() {
      if (!this.term || this.term.length < 1) {
        return this.departmentList
      }

      return this.departmentList.filter((item) => {
        return this.term
          .toLowerCase()
          .split(" ")
          .every(
            (v) =>
              item.DIV_NAME.toLowerCase().includes(v) || 
              item.DPMT_NAME.toLowerCase().includes(v)
          );
      });
    },
    // tab3
    groupFields() {
      return [
        {
          name: "__slot:no",
          title: "No",
        },
        {
          name: "DIV_NAME",
          title: "Division Name",
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
          width: "15%",
        },
      ];
    },
    // eslint-disable-next-line vue/return-in-computed-property
    groupFilteredData() {
      if (!this.term || this.term.length < 1) {
        return this.groupList
      }

      return this.groupList.filter((item) => {
        return this.term
          .toLowerCase()
          .split(" ")
          .every(
            (v) =>
              item.DIV_NAME.toLowerCase().includes(v) || 
              item.DPMT_NAME.toLowerCase().includes(v) || 
              item.GROUP_NAME.toLowerCase().includes(v)
          );
      });
    },
    // tab4
    authFields() {
      return [
        {
          name: "__slot:no",
          title: "No",
        },
        {
          name: "AUTHORIZATION_LEVEL_NAME",
          title: "Authorization Level",
        },
        {
          name: "__slot:actions",
          title: "Action",
          dataClass: "justify-content-center",
          width: "15%",
        },
      ];
    },
    // eslint-disable-next-line vue/return-in-computed-property
    authFilteredData() {
      if (!this.term || this.term.length < 1) {
        return this.authList
      }

      return this.authList.filter((item) => {
        return this.term
          .toLowerCase()
          .split(" ")
          .every(
            (v) =>
              item.AUTHORIZATION_LEVEL_NAME.toLowerCase().includes(v)
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
      //------
      term: null,
      header: "",
      field: [],
      perPage: "10",
      perPageOptions: ["4", "6", "10", "20"],
      divisionList: [],
      departmentList: [],
      groupList: [],
      filterGrouplist: [],
      authList: [],
      currentPage: 1,
      DivisionCount: null,
      DepartmentCount: null, 
      GroupCount: null,
      AuthCount: null,
      count: 1,
      tabs: TABS,
      currentTab: "tab1",

      model: {
        divisionName: "",
        DIV_NAME: "",

        departmentName: "",
        editDepartmentName: "",

        DIVISION: "",
        DPMT_NAME: "",

        groupName: "",
        departmentSelection: "",

        DEPARTMENT: "",
        GROUP_NAME: "",

        authName: "",
        SET_PARAM: "",

        modelFilterDpmt: {
          MANAGE_DIVISION: "",
        },
        modelFilterGroup: {
          MANAGE_DEPARTMENT: "",
        },
      },
      // Division
      Tab1Schema: {
        groups: [
          {
            styleClasses: "row mt-2",
            fields: [
              {
                type: "input",
                inputType: "Text",
                model: "divisionName",
                label: "Division Name",
                placeholder: "Enter division",
                required: true,
                validator: "required",
                styleClasses: "col-md-12",
                onChanged: function(model) {
                  this.model.divisionName = model.divisionName.toUpperCase();
                },
              },
            ],
          },
        ],
      },
      editDivisionSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "input",
                inputType: "Text",
                model: "DIV_NAME",
                label: "Division Name",
                placeholder: "Enter division",
                required: true,
                validator: "required",
                styleClasses: "col-md-12",
                onChanged: function(model) {
                  this.model.DIV_NAME = model.DIV_NAME.toUpperCase();
                },
              },
            ],
          },
        ],
      },
      // Department
      Tab2Schema: {
        groups: [
          {
            styleClasses: "row mt-2",
            fields: [
              {
                type: "vueMultiSelect",
                model: "divisionSelection",
                label: "Division Name",
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
                type: "input",
                inputType: "Text",
                model: "departmentName",
                label: "Department Name",
                placeholder: "Enter department",
                required: true,
                validator: "required",
                styleClasses: "col-md-6",
                onChanged: function(model) {
                  this.model.departmentName = model.departmentName.toUpperCase();
                },
              },
            ],
          },
        ],
      },
      editDepartmentSchema: {
        groups: [
          {
            styleClasses: "row mt-2",
            fields: [
              {
                type: "vueMultiSelect",
                model: "DIVISION",
                label: "Division Name",
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
                styleClasses: "col-md-12",
                required: true,
                validator: "required",
              },
              {
                type: "input",
                inputType: "Text",
                model: "DPMT_NAME",
                label: "Department Name",
                placeholder: "Enter department",
                required: true,
                styleClasses: "col-md-12",
                validator: "required",
                onChanged: function(model) {
                  this.model.DPMT_NAME = model.DPMT_NAME.toUpperCase();
                },
              },
            ],
          },
        ],
      },

      dpmtFilterSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "vueMultiSelect",
                model: "modelFilterDpmt.MANAGE_DIVISION",
                label: "Division Name",
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
                required: true,
                validator: "required",
                styleClasses: "col-md-4",
              },
            ],
          },
        ],
      },
      // Group
      Tab3Schema: {
        groups: [
          {
            styleClasses: "row mt-2",
            fields: [
              {
                type: "vueMultiSelect",
                model: "departmentSelection",
                label: "Department Name",
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
              {
                type: "input",
                inputType: "Text",
                model: "groupName",
                label: "Group Name",
                placeholder: "Enter group",
                styleClasses: "col-md-6",
                required: true,
                validator: "required",
                onChanged: function(model) {
                  this.model.groupName = model.groupName.toUpperCase();
                },
              },
            ],
          },
        ],
      },
      groupFilterSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "vueMultiSelect",
                model: "modelFilterGroup.MANAGE_DEPARTMENT",
                label: "Department Name",
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
                styleClasses: "col-md-4",
                required: true,
                validator: "required",
              },
            ],
          },
        ],
      },
      editGroupSchema: {
        groups: [
          {
            styleClasses: "row mt-2",
            fields: [
              {
                type: "vueMultiSelect",
                model: "DEPARTMENT",
                label: "Department Name",
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
                styleClasses: "col-md-12",
                required: true,
                validator: "required",
              },
              {
                type: "input",
                inputType: "Text",
                model: "GROUP_NAME",
                label: "Group Name",
                placeholder: "Enter group",
                required: true,
                styleClasses: "col-md-12",
                validator: "required",
                onChanged: function(model) {
                  this.model.GROUP_NAME = model.GROUP_NAME.toUpperCase();
                },
              },
            ],
          },
        ],
      },

      // authlevel
      Tab4Schema: {
        groups: [
          {
            styleClasses: "row mt-2",
            fields: [
              {
                type: "input",
                inputType: "Text",
                model: "authName",
                label: "Authorization Level ",
                placeholder: "Enter Authorization Level",
                required: true,
                validator: "required",
                styleClasses: "col-md-12",
                onChanged: function(model) {
                  this.model.authName = model.authName.toUpperCase();
                },
              },
            ],
          },
        ],
      },
      editAuthSchema: {
        groups: [
          {
            styleClasses: "row mt-2",
            fields: [
              {
                type: "input",
                inputType: "Text",
                model: "SET_PARAM",
                label: "Authorization Level ",
                placeholder: "Enter Authorization Level",
                required: true,
                validator: "required",
                styleClasses: "col-md-12",
                onChanged: function(model) {
                  this.model.SET_PARAM = model.SET_PARAM.toUpperCase();
                },
              },
            ],
          },
        ],
      },

      formOptions: {
        validateAfterChanged: true,
      },
    };
  },
};
</script>
<style lang="scss">
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
</style>

<template>
  <va-card>
    <loder v-show="isLoader" />

    <!-- Save User Roles Matrix -->
      <vudal name="saveUserRoleMatrix" class="widthModal">
        <loder v-show="isLoader" />
        <div class="header">
           Edit User Matrix <i class="close icon">&times;</i>
        </div>

          <vue-form-generator
            :model="model"
            :schema="editSchema"
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
              :data="screenList"
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
            <h4> &nbsp;&nbsp;&nbsp; Screen Access Page </h4>
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
            @click="saveUserMatrix"
            type="button"
            class="cancel vudal-btn mr-2 btn btn-primary btn-fill btn-md"
          >
            <i class="fa fa-edit" /> &nbsp; Save
          </button>
        </div>

      </vudal>
    <!-- View Screen Modal -->

    <!-- User Roles Matrix View-->
      <vudal name="viewUserRoleMatrix" class="widthModal">
        <loder v-show="isLoader" />
        <div class="header">
           Details User Matrix <i class="close icon">&times;</i>
        </div>

        <table class="table">
          <tbody>
          <tr>
              <td scope="col" class="font-weight-bold">User Name: </td>
              <td scope="col">{{ model.editRoleMatrix.USER_NAME }}</td>
            </tr>
            <tr>
              <td scope="col" class="font-weight-bold">Division: </td>
              <td scope="col">{{ model.editRoleMatrix.divisionSelection.DIV_NAME }}</td>
            </tr>
            <tr>
              <td scope="col" class="font-weight-bold">Department: </td>
              <td scope="col">{{ model.editRoleMatrix.departmentSelection.DPMT_NAME }}</td>
            </tr>
            <tr>
              <td scope="col" class="font-weight-bold">Group: </td>
              <td scope="col">{{ model.editRoleMatrix.groupSelection.GROUP_NAME }}</td>
            </tr>
            <tr>
              <td scope="col" class="font-weight-bold">Authorization: </td>
              <td scope="col">{{ model.editRoleMatrix.authorizationSelection.AUTHORIZATION_LEVEL_NAME }}</td>
            </tr>
          </tbody>
        </table>

          <!-- list -->
          <br />
          <br />
            <h4> &nbsp;&nbsp;&nbsp; Screen Access Page </h4>
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
        </div>

      </vudal>
    <!-- View Screen Modal -->

    <template slot="header">
    <br />
    <div class="row">
        <div class="col">
        <h4 class="card-title">List of User Matrix</h4>
        </div>
        <div class="col float-right">
        <div class="float-right">
            <h5>
            <b-badge v-b-toggle.collapse-1 class="ml-1 mr-1" variant="secondary"
            ><i class="fa fa-search"></i
            ></b-badge>
            </h5>
        </div>
        </div>
    </div>

    </template>

    <!-- advanced search form -->
    <b-collapse id="collapse-1" class="mt-2">
        <b-card>
        <vue-form-generator
            :model="model"
            :schema="advancedSearchSchema"
            ref="advancedSearchForm"
            @model-updated="onChangeSearch"
        >
        </vue-form-generator>
        <br /><br /><br />
        <button
            v-on:click="searchData()"
            type="button"
            class="ml-2 btn btn-sm btn-primary"
        >
            Search
        </button>
        <button
            v-on:click="reset()"
            type="button"
            class="ml-2 btn btn-sm btn-danger"
        >
            Reset
        </button>
        </b-card>
    </b-collapse>
    
    <br />
    <div class="text-center text-danger my-2" v-if="!isDataReady">
    <b-spinner class="align-middle"></b-spinner>
    <strong>Loading...</strong>
    </div>

    <!-- Loader Before Data Load -->
    <div v-else>

    <!-- <div class="row">
        <div class="flex md3 offset--md9">
        <va-input
            :value="term"
            :placeholder="$t('Search')"
            @input="searchPage"
            removable
        >
            <va-icon name="fa fa-search" slot="prepend" />
        </va-input>
        </div>
    </div>
    <br /> -->
    <!-- <div class="float-left">
        <va-date-picker
        :value="term"
        @input="searchDate"
        :config="{ enableTime: false, dateFormat: 'd-m-Y' }"
        v-model="dateFormat"
        />
    </div> -->
    <!-- Main table element -->
    <!-- <div class="col-ml-2"> -->
    <va-data-table
        :datacount="MatrixUserListCount"
        :fields="fields"
        :data="filteredData"
        :per-page="parseInt(perPage)"
    >
        <!-- A virtual column -->
        <template slot="no" slot-scope="row">
        {{ row.rowIndex + 1 }}
        </template>
        <template slot="actions" slot-scope="props">
        <h4 class="mt-2">
            <!-- <span
            v-b-tooltip.hover
            title="detail"
            v-on:click="details(props.rowData)"
            class="badge badge-success mr-2"
            >
            <i class="fa fa-bars"></i
            ></span> -->
            
            <span
            v-b-tooltip.hover
            title="view detail"
            v-on:click="details(props.rowData)"
            class="badge badge-danger mr-1"
            >
            <i class="fa fa-bars"></i
            ></span>
            <span
            v-b-tooltip.hover
            title="edit"
            v-on:click="edit(props.rowData)"
            class="badge badge-primary mr-2"
            >
            <i class="fa fa-edit"></i
            ></span>
        </h4>
        </template>
    </va-data-table>
    <br />
    <br />
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
import Vue from 'vue'
import VueFormGenerator from 'vue-form-generator'
import 'vue-form-generator/dist/vfg.css'
import { debounce } from 'lodash'
import moment from 'moment'
import * as servicesModule0 from '../../../app/module0/services02';
import * as servicesModule04 from "../../../app/module0/services04";
import loder from "../../request_loader";
import Vudal from "vudal";
Vue.use(VueFormGenerator)


export default {
  components: {
    loder,Vudal
  },

  mounted () {
    this.getAllUser();
    this.getDivision();
    this.getAuthorizationLevel();
    this.getAllModule();
  },
  methods: {
    saveUserMatrix(){

    },
    back() {
      this.$router.go(-1);
    },
    clear () {
      this.dateFormat = null
      this.term = null
    },

    async getAllUser(div=null,dept=null,group=null) {
        const response = await servicesModule04.getAllUserInfo(div,dept,group);
        response.forEach((item) => {
            item.LIST_STATUS = this.getStatus(item.USER_STATUS);
        });
        this.MatrixUserList = response;
        this.MatrixUserListCount = this.MatrixUserList.length;
        // console.log("get all event : " + response);
        this.isDataReady = true; // Kill Component Loder
    },
    getStatus(type){
      if(type == 0){
        return "Inactive";
      }else if(type == 1){
        return "Pending";
      }else if(type == 2){
        return "Approved";
      }else if(type == 3){
        return "Return";
      }else{
        return "";
      }
    },
    searchPage: debounce(function (term) {
      this.term = term
      //console.log(this.term)
    }, 400),

    async deleteItem (data) {
      if (confirm("Are you sure you want to delete?")){
        this.isLoader = true; // Loder Before add
        // eslint-disable-next-line no-unused-vars
        const response = await servicesModule0.deletePageMaintenance(
          data.PAGE_MAINTENANCE_ID,
        )
        this.getAllList();
        this.isLoader = false; // kill Loder
      }
    },

    async saveUserMatrix() { 
      //var f1 = this.$refs.Tab1Form.validate();
      //var f2 = this.$refs.Tab2Form.validate();
      //var f3 = this.$refs.Tab3Form.validate();
      //if (f3) {
        this.isLoader = true; // Loder
        
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
        data.append("MANAGE_GROUP_ID", this.model.editRoleMatrix.groupSelection.MANAGE_GROUP_ID);
        data.append("AUTHORIZATION_LEVEL_ID", this.model.editRoleMatrix.authorizationSelection.AUTHORIZATION_LEVEL_ID);
        data.append("MANAGE_SCREEN_ID", JSON.stringify(this.checkboxArray));
        data.append("USER_ID", this.model.editRoleMatrix.USER_ID);
        const user = localStorage.getItem("user");
        data.append("CREATE_BY",JSON.parse(user).user_id);
        try {
          const response = await servicesModule04.saveUserRoleMatrix(data);
          if(response != 'error'){
            this.model.groupSelection = '';
            this.model.moduleSelection = '';
            this.screenList = []; 
          }
          
          this.isLoader = false; // Kill Loder

        } catch (error) {
          console.log(error);
        }
      //}  
    },
  
    edit(data) {  
      this.isLoader = true; // Loder
      this.screenListSave = [];
      this.screenListSaveCount = this.screenListSave.length;  

      this.setData(data);  
      this.isLoader = false; // Kill Loder
      this.$modals.saveUserRoleMatrix.$show();  
    },

    details(data) {  
      this.isLoader = true; // Loder
      this.screenListSave = [];
      this.screenListSaveCount = this.screenListSave.length; 
      
      this.setData(data);  
      this.isLoader = false; // Kill Loder
      this.$modals.viewUserRoleMatrix.$show();    
    },

    async setData(data) {  
       this.model.editRoleMatrix.divisionSelection = {
        MANAGE_DIVISION_ID : data.MANAGE_DIVISION_ID,
        DIV_NAME : data.DIV_NAME,
      }
      this.model.editRoleMatrix.departmentSelection = {
        MANAGE_DEPARTMENT_ID : data.MANAGE_DEPARTMENT_ID,
        DPMT_NAME : data.DPMT_NAME,
      }
      this.model.editRoleMatrix.groupSelection = {
        MANAGE_GROUP_ID : data.MANAGE_GROUP_ID,
        GROUP_NAME : data.GROUP_NAME,
      }
      this.model.editRoleMatrix.authorizationSelection = {
        AUTHORIZATION_LEVEL_ID : data.AUTHORIZATION_LEVEL_ID,
        AUTHORIZATION_LEVEL_NAME : data.AUTHORIZATION_LEVEL_NAME,
      }
      this.model.editRoleMatrix.USER_NAME = data.USER_NAME;
      this.model.editRoleMatrix.USER_ID = data.USER_ID;
      this.model.editRoleMatrix.moduleSelection = "";
      this.model.editRoleMatrix.submoduleSelection = "";

      const response = await servicesModule04.getUserMatrixScreen(data);
      response.forEach((item) => {
        item.selected = true
      });
      this.screenListSave = response;
      this.screenListSaveCount = this.screenListSave.length;  
    },



    getDivision: async function () {
      const response = await servicesModule04.getAllDivisionList();
      this.divisionList = response;
      this.searchDivisionList = response;
      // alert(this.divisionList)
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

    searchData: async function (){

      this.isLoader = true; // Loder
      
      if(this.model.searchAccess.divisionSelection)
      var div = this.model.searchAccess.divisionSelection.MANAGE_DIVISION_ID;

      if(this.model.searchAccess.departmentSelection)
      var dept = this.model.searchAccess.departmentSelection.MANAGE_DEPARTMENT_ID;

      if(this.model.searchAccess.groupSelection)
      var grp = this.model.searchAccess.groupSelection.MANAGE_GROUP_ID;

      var text = this.model.searchAccess.searchText;

      const response = await servicesModule04.getAllUserInfo(div,dept,grp);

      this.MatrixUserList = response;
      this.MatrixUserListCount = this.MatrixUserList.length;
      this.reset();
      this.isLoader = false; // Kill Loder
    },
    getScreen: async function () { 
      var MOD_ID = this.model.editRoleMatrix.moduleSelection.MANAGE_MODULE_ID;
      var SUB_MOD_ID = this.model.editRoleMatrix.submoduleSelection.MANAGE_SUBMODULE_ID;
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

    onModuleUpdated: async function (newVal, schema) { 
      this.isLoader = true; // Loder 
      if (schema == "editRoleMatrix.moduleSelection") {
        this.submoduleList = [];
        var MOD_ID = '';
        (newVal == null) ? MOD_ID = "" : MOD_ID = newVal.MANAGE_MODULE_ID;
        const response = await servicesModule04.getSubmodule(MOD_ID);
        this.submoduleList = response;
        this.getScreen();
      }
      if (schema == "editRoleMatrix.submoduleSelection") {
        this.getScreen();
      }  

      if (schema == "editRoleMatrix.divisionSelection"  && newVal) {
        this.searchDepartmentList = [];
        var DIVISION_ID = '';
        (newVal == null) ? DIVISION_ID = "" : DIVISION_ID = newVal.MANAGE_DIVISION_ID;
        const response = await servicesModule04.getDepartmentByDivisionId(DIVISION_ID);
        this.searchDepartmentList = response;
      }
      if (schema == "editRoleMatrix.departmentSelection" && newVal) {
        this.searchGroupList = [];
        var DEPARTMENT_ID = '';
        (newVal == null) ? DEPARTMENT_ID = "" : DEPARTMENT_ID = newVal.MANAGE_DEPARTMENT_ID;
        const response = await servicesModule04.getGroupByDepartmentId(DEPARTMENT_ID);
        this.searchGroupList = response;
      }

      this.isLoader = false; // Kill Loder
    },
    // Check Box Function for set to save
    checkScreen(val,data){
      var screenArr = this.screenListSave;
      if(event.target.checked){
          //Remove if exist element
          screenArr = screenArr.filter(function( obj ) {
            return obj.MANAGE_MODULE_ID !== data.MANAGE_MODULE_ID;
          });
          // Push the selected element
          screenArr.push(data);
          this.screenListSaveCount = screenArr.length; 
      }else{
        // deselect element
        screenArr = screenArr.filter(function( obj ) {
            return obj.MANAGE_MODULE_ID !== data.MANAGE_MODULE_ID;
        });
      }
      this.screenListSave = screenArr;
    },
    getAuthorizationLevel: async function () {
      const response = await servicesModule04.getAuthorizationLevel(); 
      this.authorizationList = response;
    },
    getAllModule: async function () {
      const response = await servicesModule04.getAllModule();
      this.moduleList = response;
    },

    reset(){
        this.model.searchAccess.groupSelection = '';
        this.model.searchAccess.departmentSelection = '';
        this.model.searchAccess.divisionSelection = '';
    },

  },

  computed: {
    fields () {
      return [
        {
          name: '__slot:marker',
          width: '30px',
          dataClass: 'text-center',
        },
        {
          name: '__slot:no',
          title: 'No',
          // width: "30px"
          // height: "45px"
          // dataClass: "text-center"
        },
        {
          name: 'USER_NAME',
          title: 'NAME',
          
        },
        {
          name: 'DIV_NAME',
          title: 'DIVISION',
        },
        {
          name: 'DPMT_NAME',
          title: 'DEPARTMENT',
        },
        {
          name: 'GROUP_NAME',
          title: 'GROUP',
        },
        {
          name: 'LIST_STATUS',
          title: 'STATUS',
        },
        {
          name: '__slot:actions',
          title: 'Action',
          dataClass: 'justify-content-center',
          width: '15%',
        },
      ]
    },
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

    filteredData() {
      if (!this.term || this.term.length < 1) {
        return this.MatrixUserList
      }

      return this.MatrixUserList.filter((item) => {
        return this.term
          .toLowerCase()
          .split(" ")
          .every(
            (v) => 
              (item.USER_NAME) ? item.USER_NAME.toLowerCase().includes(v) : '' ||
              (item.SET_PARAM) ? item.SET_PARAM.toLowerCase().includes(v) : ''
              // item.START_DATE.toLowerCase().startsWith(this.term.toLowerCase()) ||
              // (item.END_DATE) ? item.END_DATE.toString().includes(v) : ''
          );
      });
    },

  },
  data () {
    return {
      // Data for loder
      isLoader: false,
      isDataReady:false,
      MatrixUserList:[],
      MatrixUserListCount:'',
      searchDivisionList:[],
      searchDepartmentList:[],
      searchGroupList:[],
      screenListSave:[],
      screenListSaveCount:0,
      screenListCount:0,
      screenList:[],
      authorizationList:[],
      moduleList:[],
      submoduleList:[],


      dateFormat: '',
      term: null,
      perPage: '10',
      perPageOptions: ['4', '6', '10', '20'],
      eventListCount: null,
      items: [],
      AudienceList:[],

      model: {
        searchAccess: {
          divisionSelection:"",
          departmentSelection: "",
          groupSelection: "",
        },
        editRoleMatrix: {
          USER_NAME:"",
          USER_ID:"",
          moduleSelection: "",
          submoduleSelection: "",
          divisionSelection:"",
          departmentSelection: "",
          groupSelection: "",
          authorizationSelection: "",
        },
      },
      VARIATION: [
        { id: "1", name: "ALL", selected: false },
        { id: "2", name: "Administration", selected: false },
        { id: "3", name: "Distributor Management", selected: false },
        { id: "4", name: "Consultant Management", selected: false },
        { id: "5", name: "Fund Management", selected: false },
        { id: "6", name: "CPD Management", selected: false },
        { id: "7", name: "Finance Management", selected: false },
        { id: "8", name: "Annual Fee Management", selected: false },
      ],


      advancedSearchSchema: {
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
            ],
          },
        ],
      },
      editSchema: {
        groups: [
          {
            styleClasses: "row mt-2",
            fields: [
              {
                type: "input",
                inputType: "text",
                model: "editRoleMatrix.USER_NAME",
                label: "User Name",
                placeholder: "",
                styleClasses: "col-md-12",
                readonly: true,
              },
              {
                type: "vueMultiSelect",
                label: "Division",
                model: "editRoleMatrix.divisionSelection",
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
                styleClasses: "col-md-6",
                required: true,
                validator: "required",
              },
              {
                type: "vueMultiSelect",
                label: "Department",
                model: "editRoleMatrix.departmentSelection",
                placeholder: "Select Department",
                selectOptions: {
                  multiple: false,
                  key: "MANAGE_DEPARTMENT_ID",
                  label: "DPMT_NAME",
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.searchDepartmentList;
                },
                styleClasses: "col-md-6",
                required: true,
                validator: "required",
              },
              {
                type: "vueMultiSelect",
                
                model: "editRoleMatrix.groupSelection",
                label: "Group",
                placeholder: "Select Group",
                selectOptions: {
                  multiple: false,
                  key: "MANAGE_GROUP_ID",
                  label: "GROUP_NAME",
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.searchGroupList;
                },
                styleClasses: "col-md-6",
                required: true,
                validator: "required",
              },
              {
                type: "vueMultiSelect",
                model: "editRoleMatrix.authorizationSelection",
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
                label: "Module Name",
                type: "vueMultiSelect",
                model: "editRoleMatrix.moduleSelection",
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
                model: "editRoleMatrix.submoduleSelection",
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

      formOptions: {
        validateAfterChanged: true,
      },

    }
  },
}
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

.bgcolor {
  background-color: white !important;
}

.alignleft {
  display: flex;
  justify-content: flex-end;
}
.alignright {
  display: flex;
  justify-content: flex-start;
}
</style>


<template>
  <va-card>
    <!-- Country -->
    <vudal name="simpleModalEditCountry" class="widthModal">
      <div class="header">Edit Country<i class="close icon">&times;</i></div>
      <div class="content">
        <vue-form-generator
          :model="model"
          :schema="editCountrySchema"
          :options="formOptions"
           ref="editCountryForm"
        />
      </div>
      <div class="actions">
        <button
          type="button"
          value="PUT"
          class="cancel vudal-btn mr-2 btn btn-danger btn-fill btn-md"
        >
          <i class="fa fa-times" /> &nbsp; Close
        </button>
        <button
          @click="updateCountryAPI"
          type="button"
          class="cancel vudal-btn mr-2 btn btn-primary btn-fill btn-md"
        >
          <i class="fa fa-edit" /> &nbsp; Update
        </button>
      </div>
    </vudal>
    <!-- State -->
     <vudal name="simpleModalEditState" class="widthModal">
      <div class="header">Edit State<i class="close icon">&times;</i></div>
      <div class="content">
        <vue-form-generator
          :model="model"
          :schema="editStateSchema"
          :options="formOptions"
           ref="editStateForm"
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
          @click="updateStateAPI"
          type="button"
          class="cancel vudal-btn mr-2 btn btn-primary btn-fill btn-md" 
        >
          <i class="fa fa-edit" /> &nbsp; Update
        </button>
      </div>
    </vudal> 

    <!-- POSTCODE & CITY -->

    <vudal name="simpleModalEditPostcode" class="widthModal">
      <div class="header">Edit Postcode<i class="close icon">&times;</i></div>
      <div class="content">
        <vue-form-generator
          :model="model"
          :schema="editPostcodeSchema"
          :options="formOptions"
          ref="editPostForm"
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
          @click="updatePostcodeAPI"
          type="button"
          class="cancel vudal-btn mr-2 btn btn-primary btn-fill btn-md"
        >
          <i class="fa fa-edit" /> &nbsp; Update
        </button>
      </div>
    </vudal> 

    <h4 slot="header" class="card-title">Address Setting</h4>
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
       <!-- <tabs
        :tabs="tabs"
        :currentTab="currentTab"
        :wrapper-class="'default-tabs'"
        :tab-class="'default-tabs__item'"
        :tab-active-class="'newActiveTabStyle'"
        :line-class="'default-tabs__active-line'"
        @onClick="handleClick"
      /> -->
    
      <!-- <div class="content"> -->
      <div v-if="currentTab === 'tab1'">
        <div class="ml-5">
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
              @click="addCountry"
              type="button"
              class="btn btn-warning btn-fill btn-md"
            >
              <i class="fa fa-plus" /> &nbsp; Add Parameter
            </button>
          </div>
          <div class="float-right"></div>
          <div class="float-right">
      <va-input
        :value="term"
        :placeholder="$t('Search')"
        @input="search"
        removable
      >
        <va-icon name="fa fa-search" slot="prepend" />
      </va-input>
    </div>
          <br />
          <h4>List of Country</h4>

          <br/>
          <!-- list -->
          <va-card class="mt-2">
            <va-data-table
              :fields="countryfields"
              :data="filteredDataCountry"
              :per-page="parseInt(perPage)"
              :datacount="CountryCount"
              :dataperpage="parseInt(perPage)"
              clickable
            >
              <template slot="no" slot-scope="row">
                {{ row.rowIndex + 1 }}
              </template>

              <template slot="actions" slot-scope="props">
                <h4 class="mt-2">
                  <span
                    class="badge badge-primary mr-1"
                    v-on:click="editCountry(props.rowData)"
                  >
                    <i class="fa fa-edit"></i
                  ></span>
                  <span
                    class="badge badge-danger mr-1"
                    v-on:click="deleteCountry(props.rowData)"
                  >
                    <i class="fa fa-trash"></i
                  ></span>
                </h4>
              </template>
            </va-data-table>
            <br />
          </va-card>
          <br/>
          <br/>
          <va-card>
          <VueFileAgent
          ref="vueFileAgent"
          :theme="'list'"
          :multiple="false"
          :deletable="true"
          :meta="true"
          :linkable="true"
          :accept="'application/*,.xls,.xlsx,.csv'"
          :maxSize="'2MB'"
          :helpText="'Choose document'"
          :errorText="{
            type: 'Invalid file type. Only .xlsx is Allowed',
            size: 'Files should not exceed 2MB in size'
          }"
          @select="filesSelected($event)"
          @beforedelete="onBeforeDelete($event)"
          v-model="fileRecords"
        ></VueFileAgent>
        <br/>
            <div class="float-right">
            <button
            @click="bulkUploadCountry"
            type="button"
            class="ml-1 btn btn-success btn-fill btn-md"
          >
            <i class="fa fa-paper-plane" /> &nbsp; Bulk Upload
          </button>
            </div>
          </va-card>
        </div>
      </div>

      <!-- State -->
       <div v-if="currentTab === 'tab2'">
        <div class="ml-5">
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
              @click="addState"
              type="button"
              class="btn btn-warning btn-fill btn-md"
            >
              <i class="fa fa-plus" /> &nbsp; Add Parameter
            </button>
          </div>
          <br />
          <h4>List of State</h4>
              <div class="float-right">
              <va-input
              :value="term"
              :placeholder="$t('Search')"
              @input="searchState"
              removable
              >
              <va-icon name="fa fa-search" slot="prepend" />
              </va-input>
              </div>

          <vue-form-generator
          :model="model"
          :schema="CountryFilterSchema"
          :options="formOptions"
          ref="countryForm"
          @model-updated="onModelUpdatedCountry"
        >
        </vue-form-generator>
       <!-- <div class="float-right">
          <button
            @click="filterCountrySearch"
            type="button"
            class="ml-2 btn btn-primary"
          >
            Search
          </button>
        </div> -->

        <br/>
        <br/>
          <va-card class="mt-2">
            <va-data-table
              :fields="statefields"
              :data="filteredDataState"
              :per-page="parseInt(perPage)"
              :datacount="StateCount"
              :dataperpage="parseInt(perPage)"
              clickable
            >
              <template slot="no" slot-scope="row">
                {{ row.rowIndex + 1 }}
              </template>
              <template slot="actions" slot-scope="props">
                <h4 class="mt-1">
                  <span
                    class="badge badge-primary mr-1"
                    v-on:click="editState(props.rowData)"
                  >
                    <i class="fa fa-edit"></i
                  ></span>
                  <span
                    class="badge badge-danger mr-1"
                    v-on:click="deleteState(props.rowData)"
                  >
                    <i class="fa fa-trash"></i
                  ></span>
                </h4>
              </template>
            </va-data-table>
          </va-card>
          <br/>
          <br/>
          <va-card>

              <VueFileAgent
              ref="vueFileAgent"
              :theme="'list'"
              :multiple="false"
              :deletable="true"
              :meta="true"
              :linkable="true"
              :accept="'application/*,.xls,.xlsx,.csv'"
              :maxSize="'2MB'"
              :helpText="'Choose document'"
              :errorText="{
              type: 'Invalid file type. Only .xlsx is Allowed',
              size: 'Files should not exceed 2MB in size'
              }"
              @select="filesSelected($event)"
              @beforedelete="onBeforeDelete($event)"
              v-model="fileRecords"
              ></VueFileAgent>
        <br/>
            <div class="float-right">
            <button
            @click="bulkUploadState"
            type="button"
            class="ml-1 btn btn-success btn-fill btn-md"
          >
            <i class="fa fa-paper-plane" /> &nbsp; Bulk Upload
          </button>
            </div>
          </va-card>
        </div>
      </div>

      <!-- Postcode -->

      <div v-if="currentTab === 'tab3'">
        <div class="ml-5">
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
              @click="addPostcode"
              type="button"
              class="btn btn-warning btn-fill btn-md"
            >
              <i class="fa fa-plus" /> &nbsp; Add Parameter
            </button>
          </div>


          <h4>List of Postcode</h4>

            <br/>
          <vue-form-generator
          :model="model"
          :schema="StateFilterSchema"
          :options="formOptions"
          ref="StateForm"
          @model-updated="onModelUpdatedState"
        >
        </vue-form-generator>
        <div class="float-right">
      <va-input
        :value="term"
        :placeholder="$t('Search')"
        @input="searchPostcode"
        removable
      >
        <va-icon name="fa fa-search" slot="prepend" />
      </va-input>
    </div>
    <br/>
        <!--<div class="float-right">
          <button
            @click="filterStateSearch"
            type="button"
            class="ml-2 btn btn-primary"
          >
            Search
          </button>
        </div> -->

        <br/>
        <br/>

          <va-card class="mt-2">
            <va-data-table
              :fields="postcodefields"
              :data="filteredDataPostcode"
              :per-page="parseInt(perPage)"
              :datacount="PostcodeCount"
              :dataperpage="parseInt(perPage)"
            >
              <template slot="no" slot-scope="row">
                {{ row.rowIndex + 1 }}
              </template>
              <template slot="actions" slot-scope="props">
                <h4 class="mt-2">
                  <span
                    class="badge badge-primary mr-1"
                    v-on:click="editPostcode(props.rowData)"
                    ><i class="fa fa-edit"></i
                  ></span>
                  <span
                    class="badge badge-danger mr-1"
                    v-on:click="deletePostcode(props.rowData)"
                    ><i class="fa fa-trash"></i
                  ></span>
                </h4>
              </template>
            </va-data-table>
            <br />
             <br/>
          <br/>
          </va-card>
          <br/>
           <va-card>
        <VueFileAgent
          ref="vueFileAgent"
          :theme="'list'"
          :multiple="false"
          :deletable="true"
          :meta="true"
          :linkable="true"
          :accept="'application/*,.xls,.xlsx,.csv'"
          :maxSize="'2MB'"
          :helpText="'Choose document'"
          :errorText="{
            type: 'Invalid file type. Only .xlsx is Allowed',
            size: 'Files should not exceed 2MB in size'
          }"
          @select="filesSelected($event)"
          @beforedelete="onBeforeDelete($event)"
          v-model="fileRecords"
        ></VueFileAgent>
        <br/>
            <div class="float-right">
            <button
            @click="bulkUploadPostalcode"
            type="button"
            class="ml-1 btn btn-success btn-fill btn-md"
          >
            <i class="fa fa-paper-plane" /> &nbsp; Bulk Upload
          </button>
            </div>
          </va-card>
        </div>
      </div>
      <!-- </div> -->
    </div>
    <br/>
    <br/>
     <button @click="back" type="button" class="btn btn-primary btn-fill btn-md">
      <i class="fa fa-step-backward" /> &nbsp; Previous
    </button>
  </va-card>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import Vue from "vue";
import Multiselect from 'vue-multiselect';
import "vue-form-generator/dist/vfg.css";
import Vudal from "vudal";
import { debounce } from "lodash";
import * as servicesModule0 from "../../../app/module0/services02";
import Tabs from "vue-tabs-with-active-line";
import XLSX from "xlsx";
// import jQuery from "jquery";
const TABS = [
  { title: "Setting 1 : Country", value: "tab1" },
  { title: "Setting 2 : State", value: "tab2" },
  { title: "Setting 3 : Postcode", value: "tab3" },
];

export default {
  mounted() {
    this.getAllCountry();
    this.getAllState();
    this.getAllPostcode();
    // console.log('>>>>>>>>>>>>>>>>>>>', this.backgroundColor);
    // jQuery('.default-tabs__item_active').removeAttr('style');
    // jQuery('.default-tabs__item_active').attr('style', 'color: '+this.colorText+' !important;background-color: '+this.backgroundColor+' !important;');
  },
  watch: {
    // '$store.getters.paletteText': function() {
    //   this.colorText = this.$store.getters.paletteText;
    // },
    // '$store.getters.paletteActive': function() {
    //   this.backgroundColor = this.$store.getters.paletteActive;
    // },
  
  },
  components: {
    Tabs,
    Vudal,
    Multiselect,
  },

  computed: {
    countryfields() {
      return [
        {
          name: "__slot:marker",
          width: "15px",
          dataClass: "text-center",
        },
        {
          name: "__slot:no",
          title: "No",
        },
        {
          name: "SET_PARAM",
          title: "Country Name",
          sortField: "SET_PARAM",
          width: "50%",
        },
        {
          name: "SET_CODE",
          title: "Country Code",
          sortField: "SET_CODE",
         //  width: "20%",
        },
        {
          name: "__slot:actions",
          title: "Action",
          dataClass: "justify-content-center",
          width: "15%",
        },
      ];
    },
    filteredDataCountry() {
      if (!this.term || this.term.length < 1) {
        return this.CountryList;
      }

      return this.CountryList.filter((item) => {
        return this.term
          .toLowerCase()
          .split(" ")
          .every(
            (v) =>
              item.SET_PARAM.toLowerCase().includes(v) ||
              item.SET_CODE.toLowerCase().includes(v)
          );
      });
    },

    statefields() {
      return [
        {
          name: "__slot:marker",
          width: "30px",
          dataClass: "text-center",
        },
        {
          name: "__slot:no",
          title: "No",
        },
        {
          name: "SET_COUNTRY",
          title: "Country Name",
          sortField: "SET_COUNTRY",
        },
        {
          name: "SET_STATE",
          title: "State Name",
          sortField: "SET_STATE",
        },
        {
          name: "__slot:actions",
          title: "Action",
          dataClass: "justify-content-center",
          width: "15%",
        },
      ];
    },
    filteredDataState() {
      if (!this.term || this.term.length < 1) {
        return this.stateList;
      }

      return this.stateList.filter((item) => {
        return this.term
          .toLowerCase()
          .split(" ")
          .every(
            (v) =>
              item.SET_STATE.toLowerCase().includes(v) ||
              item.SET_COUNTRY.toLowerCase().includes(v)
          );
      });
    },

    postcodefields() {
      return [
        {
          name: "__slot:marker",
          width: "30px",
          dataClass: "text-center",
        },
        {
          name: "__slot:no",
          title: "No",
        },
        {
          name: "COUNTRY",
          title: "COUNTRY NAME",
          sortField: "COUNTRY",
        },
        {
          name: "STATE",
          title: "STATE NAME",
          sortField: "STATE",
        },
        {
          name: "POSTCODE",
          title: "POSTCODE",
          sortField: "POSTCODE",
        },
        {
          name: "CITY",
          title: "CITY NAME",
          sortField: "CITY",
        },
        {
          name: "__slot:actions",
          title: "Action",
          dataClass: "justify-content-center",
          width: "15%",
        },
      ];
    },
    filteredDataPostcode() {
      if (!this.term || this.term.length < 1) {
        return this.postcodeList;
      }

      return this.postcodeList.filter((item) => {
        return this.term
          .toLowerCase()
          .split(" ")
          .every(
            (v) =>
              item.COUNTRY.toLowerCase().includes(v) ||
              item.STATE.toLowerCase().includes(v) || item.POSTCODE.includes(v) || item.CITY.toLowerCase().includes(v)
          );
      });
    },
  },

  data() {
    return {
      term: null,
      perPage: 10,
     // perPageOptions: ["4", "6", "10", "20"],
      tabs: TABS,
      currentTab: "tab1",
      tabActiveClass: "abc",
      CountryList: [],
      stateList: [],
      stateListPostCode: [],
      stateListPostCodeEdit: [],
      postcodeList: [],
      bulkData: null,
      CountryCount : null,
      StateCount: null,
      PostcodeCount: null,
     // count: 1,
      fileRecordsForUpload: [],
      uploadFileObject: [],
      fileRecords: [],
     // colorText: this.$store.getters.paletteText,
     // backgroundColor: this.$store.getters.paletteActive,
     //  wrapperClass: this.$store.getters.paletteText,
      // tab-active-class:'color: red',
     // wrapperClassStyle: 'color: red',
      model: {

              SET_PARAM: '',
              SET_CODE: '',
              SET_TYPE: '',

          addCOUNTRY: {

              SET_PARAM: '',
              SET_CODE: '',
          },
          editCOUNTRY: {
              SET_CODE: '',
              SET_PARAM: '',
          },
          SET_PARAM: '',
          SET_CODE:'',

        addSTATE: {
            SET_PARAM: '',
            SET_VALUE: '',
        },
        editSTATE: {
            STATE_PARAM: '',
        },
        editStateCountry: '',

        SET_STATE: '',
        SET_COUNTRY: '',

        addPOSTCODE: {
          POSTCODE_NO: '',
          SET_CITY_NAME: '',
          STATE_NAME: '',
          COUNTRY_NAME: '',

        },
        addPostcodeState: '',

        editPostcodeVudal: {
          POSTCODE_NO: '',
          SET_CITY_NAME: '',
          COUNTRY_PARAM: '',

        },

        modelFilterCountry: {
          SET_COUNTRY: '',
        },
        modelFilterState: {
          SET_PARAM: '',
        },

        editPostcodeCountry: '',
        editPostcodeState: '',
        SETTING_GENERAL_ID: '',
        editPostcodeCity: '',
        editPostcodeNo: '',
        editPostcodeId: '',
        editPostcodeCityId: '',
      },

      formOptions: {
        validateAfterChanged: true,
      },

      Tab1Schema: {
        groups: [
          {
            styleClasses: "row mt-2",
            fields: [
              {
                type: "input",
                inputType: "Text",
                model: "addCOUNTRY.SET_PARAM",
                label: "Country Name",
                placeholder: "Enter country Name",
                required: true,
                validator: "string",
                styleClasses: "col-md-6",
                hint: "e.g. Malaysia ",
              },
              {
                type: "input",
                inputType: "text",
                model: "addCOUNTRY.SET_CODE",
                label: "Country Code",
                placeholder: "Enter country code",
                required: true,
                validator: "string",
                styleClasses: "col-md-6",
                hint: "e.g. +06 ",
              },
            ],
          },
        ],
      },

      Tab2Schema: {
        groups: [
          {
            styleClasses: "row mt-2",
            fields: [
              {
                type: "vueMultiSelect",
                inputType: "Text",
                model: "addSTATE.SET_VALUE",
                label: "Country Name",
                placeholder: "Enter Country Name",
                selectOptions: {
                  multiple: false,
                  key: "SETTING_GENERAL_ID",
                  label: "SET_PARAM",
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.CountryList ;
                },
                required: true,
                validator: "required",
                styleClasses: "col-md-6",
              },
              {
                type: "input",
                inputType: "text",
                model: "addSTATE.SET_PARAM",
                label: "State Name",
                placeholder: "Enter State Name",
                required: true,
                validator: "string",
                styleClasses: "col-md-6",
                hint: "e.g. Selangor ",
              },
            ],
          },
        ],
      },
      CountryFilterSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "vueMultiSelect",
                model: "modelFilterCountry.SET_COUNTRY",
                label: "Country Name",
                placeholder: "Select Country",
                selectOptions: {
                  multiple: false,
                  key: "SETTING_GENERAL_ID",
                  label: "SET_PARAM",
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.CountryList;
                },
                styleClasses: "col-md-4",
              },
            ],
          },
        ],
      },
      Tab3Schema: {
        groups: [
          {
            styleClasses: "row mt-2",
            fields: [
              {
                type: "vueMultiSelect",
                inputType: "Text",
                model: "addPOSTCODE.COUNTRY_NAME",
                label: "COUNTRY NAME",
                placeholder: "Select Country",
                selectOptions: {
                  multiple: false,
                  key: "COUNTRY_ID",
                  label: "SET_PARAM",
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.CountryList
                },
                required: true,
                validator: "required",
                styleClasses: "col-md-3",
                onChanged: (model, newVal, oldVal, field) =>{
                    const filterData = {
                      SETTING_GENERAL_ID: this.model.addPOSTCODE.COUNTRY_NAME.SETTING_GENERAL_ID,
                    };
                     this.model.addPOSTCODE.STATE_NAME="";
                    servicesModule0.getFilteredCountry(filterData)
                    .then(response =>{
                      console.log('response = ', response);
                      this.stateListPostCode = response;
                    });
                },
              },
              {
                type: "vueMultiSelect",
                model: "addPOSTCODE.STATE_NAME",
                label: "STATE NAME",
                placeholder: "Select State",
                selectOptions: {
                  multiple: false,
                  key: "STATE_ID",
                  label: "SET_STATE",
                  searchable: true,
                },
                values: (model, schema) => {
                 // return this.stateList
                    return this.stateListPostCode
                },
                required: true,
                validator: "required",
                styleClasses: "col-md-3",
              },
              {
                type: "input",
                inputType: "text",
                model: "addPOSTCODE.SET_CITY_NAME",
                label: "CITY NAME",
                placeholder: "Enter City Name",
                styleClasses: "col-md-3",
                hint: "e.g. Gombak ",
                required: true,
                validator: "string",
              },
              {
                type: "input",
                inputType: "text",
                model: "addPOSTCODE.POSTCODE_NO",
                label: "Postcode",
                placeholder: "Enter Postcode Number",
                styleClasses: "col-md-3",
                hint: "e.g. 68100 ",
                required: true,
                validator: "string",
              },
            ],
          },
        ],
      },
      StateFilterSchema: {
        
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "vueMultiSelect",
                model: "modelFilterState.SET_PARAM",
                label: "State Name",
                placeholder: "Select State",
                selectOptions: {
                  multiple: false,
                  key: "SETTING_GENERAL_ID",
                  label: "SET_STATE",
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.stateList;
                },
                styleClasses: "col-md-4",
              },
            ],
          },
        ],
      },
      editCountrySchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "input",
                inputType: "Text",
                model: "editCOUNTRY.SET_PARAM",
                label: "Country Name ",
                placeholder: "Enter Country Name",
                required: true,
                validator: "required",
                styleClasses: "col-md-12",
              },
              {
                type: "input",
                inputType: "Text",
                model: "editCOUNTRY.SET_CODE",
                label: "Country  Code ",
                placeholder: "Enter Country Code",
                required: true,
                validator: "required",
                styleClasses: "col-md-12",
              },
            ],
          },
        ],
      },
      editStateSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "vueMultiSelect",
                inputType: "Text",
                model: "editStateCountry",
                label: "Country Name",
                placeholder: "Select Country",
                required: true,
                validator: "required",
                selectOptions: {
                  multiple: false,
                  key: "SETTING_GENERAL_ID",
                  label: "SET_PARAM",
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.CountryList ;
                },
                styleClasses: "col-md-12",
              },
              {
                type: "input",
                inputType: "Text",
                model: "editSTATE.STATE_PARAM",
                label: "State Name ",
                placeholder: "Enter State Name",
                styleClasses: "col-md-12",
                required: true,
                validator: "required",

              },
            ],
          },
        ],
      },

     editPostcodeSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "input",
                inputType: "Text",
                model: "editPostcodeCountry",
                label: "Country Name",
                placeholder: "Select Country Name",
                disabled: true,
                styleClasses: "col-md-12",
                required: true,
                validator: "required",
              
              },
              {
                type: "vueMultiSelect",
                inputType: "Text",
                model: "editPostcodeState",
                label: "State Name",
                placeholder: "Select State Name",
                 required: true,
                validator: "required",
                selectOptions: {
                  multiple: false,
                  key: "SETTING_GENERAL_ID",
                  label: "SET_STATE",
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.stateListPostCodeEdit;
                },
                styleClasses: "col-md-12",
              },
              {
                type: "input",
                inputType: "Text",
                model: "editPostcodeCity",
                label: "City Name ",
                placeholder: "Enter City Name",
                styleClasses: "col-md-12",
                 required: true,
                validator: "required",
              },
              {
                type: "input",
                inputType: "Text",
                model: "editPostcodeNo",
                label: "Postcode Number ",
                placeholder: "Enter Postcode Number",
                styleClasses: "col-md-12",
                required: true,
                validator: "required",
              },
              {
                type: "input",
                inputType: "hidden",
                model: "editPostcodeCityId",
                //label: "Postcode Number ",
               // placeholder: "Enter Postcode Number",
                //styleClasses: "col-md-12",
              },

            ],
          },
        ],
      },
    };
  },

  methods: {
    excelDataCountry(country) {

      var country = JSON.parse(country);

      // this.bulkAddCountry(obj.SET_PARAM,obj.SET_CODE)
      for(var i = 0; i < country.length; i++) {
          var obj = country[i];
          this.bulkAddCountry(obj.SET_PARAM,obj.SET_CODE)
      }

      // alert(JSON.stringify(variable).SET_PARAM);
      // this.bulkAddCountry(SET_PARAM,SET_CODE)
      this.getAllCountry();
      // alert(variable)

    },
    excelData(variable) {
        alert('data :')
        alert(variable)
    },


    handleClick (newTab) {
      // jQuery(this).dblclick();
      // console.log('new ' + newTab);
      // jQuery('.default-tabs__item_active').removeAttr("style");
      // //jQuery('.default-tabs__item').removeClass('default-tabs__item_active');
      // jQuery('.default-tabs__item').removeAttr("style");
      // jQuery('.default-tabs__item_active').attr('style', 'color: '+this.colorText+' !important;background-color: '+this.backgroundColor+' !important;');
      this.currentTab = newTab;
      this.term='';
      this.fileRecords=[];
       }, // end tab
    back () { this.$router.go(-1) }, // end tab
 //searh
    search: debounce(function (term) {
      this.term = term;
    }, 400),

    searchState: debounce(function (term) {
      this.term = term;
    }, 400),

    searchPostcode: debounce(function (term) {
      this.term = term;
      console.log(this.term);
    }, 400),

    //Add Country

    getAllCountry: async function () {
      //console.log("sadsadsf");
      const response = await servicesModule0.getAllCountryList("COUNTRY");
      this.CountryList = response;
      this.CountryCount = this.CountryList.length;
    },

    filesSelected: function (fileRecordsNewlySelected) {
      console.log(fileRecordsNewlySelected);
      //  this.uploadFileObject = [];
      var validFileRecords = fileRecordsNewlySelected.filter(
        (fileRecord) => !fileRecord.error
      );
      this.fileRecordsForUpload = this.fileRecordsForUpload.concat(
        validFileRecords
      );
      console.log(fileRecordsNewlySelected);
      this.uploadFileObject = this.fileRecordsForUpload[0].file;
    },

    async bulkUploadCountry() {
      var content = [];
      const files = this.uploadFileObject;
      console.log("filename:",files);
      const fileReader = new FileReader(); // construction function that can read the file content
      var vm = this;
      fileReader.onload = async function (e) {
        const data = e.target.result;
        //console.log("target file", e);
        const workbook = XLSX.read(data, {
          type: "binary", // binary
          cellDates: true,
          cellNF: false,
          cellText: false
        });
        console.log("Data=",workbook.SheetNames.length);
        var i;
        for (i = 0; i < workbook.SheetNames.length; i++) {
          const wsname = workbook.SheetNames[i]; //take the first sheet
          console.log("wsname=",wsname);
         const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname], {raw: false});//XLSX.utils.sheet_to_json(workbook.Sheets[wsname]); //Get the data in this table
          console.log("ws=",ws);
          if( typeof ws != 'array' && ws.length > 0){
            ws.forEach(w => content.push(w));
          }
        }
        console.log("Finaldata="+JSON.stringify(content));

        await servicesModule0.bulkUploadCountry(JSON.stringify(content));
          //this.holidayList = response1;
          this.getAllCountry();

      }.bind(this);
      fileReader.readAsBinaryString(files);
    },
    async addCountry() {
      if(this.$refs.Tab1Form.validate()) {
        const data = new FormData();
        data.append("SET_PARAM", this.model.addCOUNTRY.SET_PARAM);
        data.append("SET_CODE", this.model.addCOUNTRY.SET_CODE);
        data.append("SET_TYPE", "COUNTRY");
        try {
          // eslint-disable-next-line no-unused-vars
          const response = await servicesModule0.createSettingGeneral(data);
          this.getAllCountry();
        } catch (error) {
          console.log(error);
        }
      }
    },

    async deleteCountry(data) {
       if (confirm("Are you sure you want to delete?")) {
        const response = await servicesModule0.deleteSettingGeneral(
        data.SETTING_GENERAL_ID
      );
      this.getAllCountry();
       }
      // eslint-disable-next-line no-unused-vars
    },

    async editCountry(data) {
      const response = await servicesModule0.getCountryById(
        data.SETTING_GENERAL_ID
      );
      this.$modals.simpleModalEditCountry.$show();
      this.SETTING_GENERAL_ID = response.SETTING_GENERAL_ID;
      this.model.editCOUNTRY = response;
    },

    async updateCountryAPI() {
          const data = new FormData();
          data.append("SETTING_GENERAL_ID", this.SETTING_GENERAL_ID);
          data.append("SET_PARAM", this.model.editCOUNTRY.SET_PARAM);
          data.append("SET_CODE", this.model.editCOUNTRY.SET_CODE);
      if(this.$refs.editCountryForm.validate()) {
        console.log("tests");
          try {
            const response = await servicesModule0.updateSettingGeneral(data);
            this.getAllCountry();
          } catch (error) {
            console.log(error);
          }
      }
      else{
          this.$modals.simpleModalEditCountry.$show();
          this.editCountry(data);
      }
    },

    filesSelected: function(fileRecordsNewlySelected) {
      console.log(fileRecordsNewlySelected);
      //  this.uploadFileObject = [];
      var validFileRecords = fileRecordsNewlySelected.filter(
        fileRecord => !fileRecord.error
      );
      this.fileRecordsForUpload = this.fileRecordsForUpload.concat(
        validFileRecords
      );
      console.log(fileRecordsNewlySelected);
      this.uploadFileObject = this.fileRecordsForUpload[0].file;
    },
    //---------State

    async bulkUploadState() {

      var content = [];
      const files = this.uploadFileObject;
      console.log("filename:",files);
      const fileReader = new FileReader(); // construction function that can read the file content
      var vm = this;
      fileReader.onload = async function (e) {
        const data = e.target.result;
        //console.log("target file", e);
        const workbook = XLSX.read(data, {
          type: "binary", // binary
          cellDates: true,
          cellNF: false,
          cellText: false
        });
        console.log("Data=",workbook.SheetNames.length);
        var i;
        for (i = 0; i < workbook.SheetNames.length; i++) {
          const wsname = workbook.SheetNames[i]; //take the first sheet
          console.log("wsname=",wsname);
         const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname], {raw: false});//XLSX.utils.sheet_to_json(workbook.Sheets[wsname]); //Get the data in this table
          console.log("ws=",ws);
          if( typeof ws != 'array' && ws.length > 0){
            ws.forEach(w => content.push(w));
          }
        }
        console.log("Finaldata="+JSON.stringify(content));

        await servicesModule0.bulkUploadState(JSON.stringify(content));
          //this.holidayList = response1;
          this.getAllState();

      }.bind(this);
      fileReader.readAsBinaryString(files);


    },

    async addState() {
      if (this.$refs.Tab2Form.validate()) {
        const data = new FormData();
        data.append("SET_PARAM", this.model.addSTATE.SET_PARAM);
        data.append("SET_VALUE", this.model.addSTATE.SET_VALUE.SETTING_GENERAL_ID);
        data.append("SET_TYPE", "STATE");
        try {
          // eslint-disable-next-line no-unused-vars
          const response = await servicesModule0.createSettingGeneral(data);
          this.getAllState();
          this.model.addSTATE.SET_PARAM='';
          this.model.addSTATE.SET_VALUE='';
        //   this.model.SET_PARAM = '';
        //   this.model.STATE_NAME ='';
        } catch (error) {
          console.log(error);
        }
      }
    },
    getAllState: async function () {
      const response = await servicesModule0.getAllStateList("STATE");
      this.stateList = response;
      this.stateListPostCode=response;
      this.StateCount = this.stateList.length;
      //console.log("state data=",this.stateList);
    },
     async getFilteredCountry() {
      const response = await servicesModule0.getFilteredCountry();
      this.CountryList = response;
    },

    async deleteState(data) {
      if (confirm("Are you sure you want to delete?")) {

      const response = await servicesModule0.deleteSettingGeneral(
        data.SETTING_GENERAL_ID
      );
      this.getAllState();
      }
    },

    async editState(data) {
      const response = await servicesModule0.getStateById(
        data.SETTING_GENERAL_ID
      );
      this.$modals.simpleModalEditState.$show();
      this.SETTING_GENERAL_ID = response.SETTING_GENERAL_ID;
      this.model.editSTATE.STATE_PARAM = response.STATE_PARAM;

      console.log("editState=",response);
      //this.model.editStateCountry = response;

      this.model.editStateCountry = {
          SETTING_GENERAL_ID: response.COUNTRY_ID,
          SET_PARAM: response.SET_PARAM,
          //MANAGE_GROUP_ID:response.APPR_GROUP_ID,
       };
    },

    async updateStateAPI() {
      //console.log("Contry ID=",this.model.editStateCountry.SETTING_GENERAL_ID);
       const data = new FormData();
          data.append("SETTING_GENERAL_ID", this.SETTING_GENERAL_ID);
          data.append("SET_PARAM", this.model.editSTATE.STATE_PARAM);
          data.append("SET_VALUE", this.model.editStateCountry.SETTING_GENERAL_ID );
         if(this.$refs.editStateForm.validate()) {
            try {
           const response = await servicesModule0.updateSettingGeneral(data);
            this.getAllState();
            } catch (error) {
            console.log(error);
            }
       }
        else{
            this.$modals.simpleModalEditState.$show();
            this.editState(data);
      }
    },
    async filterCountrySearch() {

     const filterData = {
        SETTING_GENERAL_ID: this.model.modelFilterCountry.SET_COUNTRY
          .SETTING_GENERAL_ID,

      };
       this.getAllState();
       console.log("Filterdata=",filterData);
     // const filterData = this.model.modelFilterCountry.SET_COUNTRY.SETTING_GENERAL_ID;

       //console.log("State Search=",filterData);
      const response = await servicesModule0.getFilteredCountry(filterData);
      this.stateList = response;
      this.StateCount = this.stateList.length;
    },
    onModelUpdatedCountry(newVal, schema) {
      if (schema == "modelFilterCountry.SET_COUNTRY") {
        const newValcon=JSON.stringify(newVal);
       console.log("Country filter ", newValcon);
         if(newValcon == 'null'){
            console.log("Country filter1 ", newValcon);
           this.getAllState();
         }else{
            console.log("Country filter2 ", newValcon);
        this.filterCountrySearch();
         }
      }
    },



    // -------------- postcode ---------------
    async bulkUploadPostalcode() {
       var content = [];
      const files = this.uploadFileObject;
      console.log("filename:",files);
      const fileReader = new FileReader(); // construction function that can read the file content
      var vm = this;
      fileReader.onload = async function (e) {
        const data = e.target.result;
        //console.log("target file", e);
        const workbook = XLSX.read(data, {
          type: "binary", // binary
          cellDates: true,
          cellNF: false,
          cellText: false
        });
        console.log("Data=",workbook.SheetNames.length);
        var i;
        for (i = 0; i < workbook.SheetNames.length; i++) {
          const wsname = workbook.SheetNames[i]; //take the first sheet
          console.log("wsname=",wsname);
         const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname], {raw: false});//XLSX.utils.sheet_to_json(workbook.Sheets[wsname]); //Get the data in this table
          console.log("ws=",ws);
          if( typeof ws != 'array' && ws.length > 0){
            ws.forEach(w => content.push(w));
          }
        }
        console.log("Finaldata="+JSON.stringify(content));

        await servicesModule0.bulkUploadPostal(JSON.stringify(content));
          //this.holidayList = response1;
          this.getAllPostcode();

      }.bind(this);
      fileReader.readAsBinaryString(files);
    },
    getAllPostcode: async function () {
      const response = await servicesModule0.getAllPostcodeList();
      this.postcodeList = response;
      this.PostcodeCount = this.postcodeList.length;
    },

    async getFilteredPostcode () {
      const response = await servicesModule0.getFilteredPostcode()
      this.postcodeList = response
    },

    async addPostcode() {
      if (this.$refs.Tab3Form.validate()) {
        const data = new FormData();
        data.append("SET_CITY_NAME", this.model.addPOSTCODE.SET_CITY_NAME);
        data.append("POSTCODE_NO", this.model.addPOSTCODE.POSTCODE_NO);
        data.append("SETTING_GENERAL_ID", this.model.addPOSTCODE.STATE_NAME.SETTING_GENERAL_ID)
        try {
          // eslint-disable-next-line no-unused-vars
          const response = await servicesModule0.createPostcode(data);
          // const response2 = await servservicesModule0.createCity(data)
          this.getAllPostcode();
          this.model.addPOSTCODE.SET_CITY_NAME="";
          this.model.addPOSTCODE.POSTCODE_NO="";
          this.model.addPOSTCODE.STATE_NAME="";
          this.model.addPOSTCODE.COUNTRY_NAME="";
        } catch (error) {
          console.log(error);
        }
      }
    },
    async editPostcode(data) {
      // eslint-disable-next-line no-unused-vars
      const response = await servicesModule0.getPostcodeById(
        data.SETTING_POSTCODE_ID
      );
      console.log("Postcode=",response);
      this.$modals.simpleModalEditPostcode.$show();
      this.SETTING_GENERAL_ID = response.SETTING_GENERAL_ID;
      this.SETTING_POSTCODE_ID = response.SETTING_POSTCODE_ID;
      // this.model.editPostcodeCountry = {
      //   COUNTRY_ID: response.COUNTRY_ID,
      //   COUNTRY: response.COUNTRY,
      // };
     this.model.editPostcodeState = {
         SETTING_GENERAL_ID: response.STATE_ID,
         SET_STATE: response.SET_STATE,
      };
      this.model.editPostcodeCountry = response.COUNTRY;
     // this.model.editPostcodeState = response.SET_STATE;
      this.model.editPostcodeCity = response.CITY;
      this.model.editPostcodeNo = response.POSTCODE;
      //this.model.editPostcodeId = response.SETTING_POSTCODE_ID;
      this.model.editPostcodeCityId = response.CITY_ID;
          const filterData = {
                SETTING_GENERAL_ID: response.COUNTRY_ID,

          };
         await  servicesModule0.getFilteredCountry(filterData)
                    .then(responseCon =>{
                      console.log('responseCon = ', responseCon);
                      this.stateListPostCodeEdit = responseCon;
                    });

    },

    async updatePostcodeAPI() {
       const data = new FormData();
        data.append("SETTING_POSTCODE_ID", this.SETTING_POSTCODE_ID);
        data.append("SET_CITY_NAME", this.model.editPostcodeCity);
        data.append("POSTCODE_NO", this.model.editPostcodeNo);
        data.append("SETTING_GENERAL_ID", this.model.editPostcodeState.SETTING_GENERAL_ID)
         data.append("SETTING_CITY_ID", this.model.editPostcodeCityId)
        if(this.$refs.editPostForm.validate()) {
          try {
            const response = await servicesModule0.updatePostcode(data);
            this.getAllPostcode();
          } catch (error) {
            console.log(error);
          }
        }
        else{
          this.$modals.simpleModalEditPostcode.$show();
          this.editPostcode(data);
        }
    },

    async deletePostcode(data) {
      if (confirm("Are you sure you want to delete?")) {
      // eslint-disable-next-line no-unused-vars
      const response = await servicesModule0.deletePostcode(
        data.SETTING_POSTCODE_ID
      );
      this.getAllPostcode();
      }
    },
     onBeforeDelete: function (fileRecord) {
      var i = this.fileRecordsForUpload.indexOf(fileRecord);
      if (i !== -1) {
        console.log("before delete");
        // queued file, not yet uploaded. Just remove from the arrays
        this.fileRecordsForUpload.splice(i, 1);
        var k = this.fileRecords.indexOf(fileRecord);
        if (k !== -1) this.fileRecords.splice(k, 1);
        this.uploadFileOject = [];
        for (i = 0; i < this.fileRecordsForUpload.length; i++) {
          this.uploadFileOject.push(this.fileRecordsForUpload[i].file);
        }
        console.log(this.uploadFileOject);

        this.value = this.uploadFileOject;
      } else {
        this.$refs.vueFileAgent.deleteFileRecord(fileRecord);
      }
    },

    async filterStateSearch(data) {
      const filterData = {
        SETTING_GENERAL_ID: this.model.modelFilterState.SET_PARAM
          .SETTING_GENERAL_ID,

      };
      const response = await servicesModule0.getFilteredState(filterData);
      this.postcodeList = response;
      this.PostcodeCount = this.postcodeList.length;
    },
    onModelUpdatedState(newVal, schema) {
      if (schema == "modelFilterState.SET_PARAM") {
        const newValcon=JSON.stringify(newVal);
        //console.log("State filter111 " + JSON.stringify(newVal));
          if(newValcon == 'null'){
           console.log("Country filter1 ", newValcon);
           this.getAllPostcode();
          }else{
           console.log("Country filter2 ", newValcon);
           this.filterStateSearch();
          }
       
      }
    },
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
    background-color: $dropdown-background;
    transition: transform 0.4s ease, width 0.4s ease;
  }
}



.content {
  margin-top: 30px;
  font-size: 20px;
}

.inline {
  display: inline-flex;
 // float: right;
}
.default-tabs__item{
border-radius: 40px 40px 40px 40px !important;
}

</style>

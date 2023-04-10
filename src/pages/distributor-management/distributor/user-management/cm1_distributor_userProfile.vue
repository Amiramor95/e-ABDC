<template>
  <va-card>
    <h4 slot="header" class="card-title">User Profile</h4>
    <br />
    <div class="row">
      <div class="col-12">
        <form-wizard
          @on-complete="onComplete"
          color="#FF5050"
          error-color="#a94442"
          finish-button-text="Submit"
          ref="wizardForm"
        >
          <h3 slot="title"></h3>
          <tab-content icon="fa fa-user" title="User Profile">
            <br />
            <vue-form-generator
              :model="model"
              :schema="firstTabSchema"
              :options="formOptions"
              ref="firstTabForm"
              @model-updated="onModelUpdated"
            >
            </vue-form-generator>
          </tab-content>
          <tab-content
            icon="fa fa-folder-open"
            title="Upload Document and Choose File"
          >
            <br />
            <div class="col-12">
              <div style="overflow-x: auto">
                <table class="table">
                  <thead>
                    <slot name="columns">
                      <tr>
                        <th></th>
                        <th><b>Document</b></th>
                        <th><b>Choose file</b></th>
                      </tr>
                    </slot>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in photoUploadList" :key="index">
                      <slot :row="item">
                        <td>
                          <base-checkbox
                            class=""
                            v-model="item.selected"
                            disabled="true"
                          ></base-checkbox>
                        </td>
                        <td>
                          <span class="description"
                            >{{ item.fileName }} &nbsp;
                            <a
                              target="blank"
                              v-if="
                                item.type == 'file' && item.selected == true
                              "
                              href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
                              >View</a
                            ></span
                          >
                        </td>
                        <td v-if="item.type == 'photo'">
                            <template>
                            <VueFileAgent
                            ref="vueFileAgent"
                            :theme="'list'"
                            :multiple="false"
                            :deletable="true"
                            :meta="true"
                            :accept="'image/*'"
                            :maxSize="'10MB'"
                            :maxFiles="14"
                            :helpText="'Choose Passport Size Photo'"
                            :errorText="{
                            type: 'Invalid file type',
                            size: 'Files should not exceed 10MB in size'
                            }"
                            @select="filesSelected($event)"
                            @beforedelete="onBeforeDelete($event)"
                            @delete="fileDeleted($event)"
                            v-model="fileRecords"
                            ></VueFileAgent>
                            </template>
                        </td>
                        <td v-if="item.type == 'file'">
                          <form enctype="multipart/form-data">
                            <div id="app">
                              <VueFileAgent
                                ref="vueFileAgentEdit"
                                :theme="'list'"
                                :multiple="false"
                                :deletable="true"
                                :meta="true"
                                :linkable="true"
                                :accept="'.pdf,.docx,.doc,.EPS,.EXE,.csv,.xlsx,.xls,.zip'"
                                   :maxSize="'10MB'"
                                 :maxFiles="14"
                                :helpText="'Choose document'"
                                :errorText="{
                                  type: 'Invalid file type. Only pdf or doc, docx Allowed',
                                  size: 'Files should not exceed 10MB in size',
                                }"
                                  @select="editfilesSelected($event)"
                                  @beforedelete="editonBeforeDelete($event)"
                                  @delete="editfileDeleted($event)"
                                  v-model="editFileRecords"
                              ></VueFileAgent>
                            </div>
                          </form>
                        </td>
                      </slot>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!-- </card> -->
            </div>
          </tab-content>

          <tab-content icon="fa fa-location-arrow" title="Declaration" v-if="distid == 0">
            <br />
            <vue-form-generator
              :model="model"
              :schema="thirdTabSchema"
              :options="formOptions"
              ref="thirdTabForm"
              @model-updated="onModelUpdated"
            >
            </vue-form-generator>
            <br />
          </tab-content>
          <template
            slot="footer"
            slot-scope="{ activeTabIndex, isLastStep, nextTab, prevTab }"
          >
            <div class="float-left">
              <button
                v-if="activeTabIndex > 0"
                @click="prevTab"
                type="button"
                class="btn btn-primary btn-fill btn-md"
              >
                <i class="fa fa-step-backward" /> &nbsp; Previous
              </button>
            </div>
            <div class="float-right" >
              <button
                v-if="!isLastStep"
                @click="nextTab"
                type="button"
                class="ml-2 btn btn-primary btn-fill btn-md"
              >
                Next &nbsp; <i class="fa fa-step-forward" />
              </button>
              <div v-if="distid == 0">
              <button
                v-if="isLastStep"
                v-show="showSubmitBtn"
                @click="beginSubmit"
                type="button"
                class="ml-2 btn btn-primary btn-fill btn-md"
              >
                Submit
              </button>
              </div>
              <div v-else>
              <button
                v-if="isLastStep"
                v-show="showUpdateBtn"
                @click="beginUpdate"
                type="button"
                :disabled ="updatedisable"
                class="ml-2 btn btn-primary btn-fill btn-md"
              >
                Update
              </button>
                <button
                  v-if="isLastStep"
                  v-show="showUpdateBtn"
                  @click="beginDraft"
                  type="button"
                  :disabled ="updatedisable"
                  class="ml-2 btn btn-info btn-fill btn-md"
                >
                  Save as Draft
                </button>
              </div>
            </div>


          </template>

        </form-wizard>
      </div>
    </div>
  </va-card>
</template>

<script>
import Multiselect from "vue-multiselect";
import Vudal from "vudal";
import VueFormGenerator from "vue-form-generator";
import "vue-form-generator/dist/vfg-core.css";
import VueFormWizard from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
import Vue from "vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

// Import Bootstrap an BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import HorizontalScroll from "vue-horizontal-scroll";
import "vue-horizontal-scroll/dist/vue-horizontal-scroll.css";
import moment from "moment";
import { parse } from "vue-currency-input";

import * as services06Module0 from "../../../../app/module0/services06";
import * as services06Module1 from "../../../../app/module1/services06";
import * as services03Module1 from "../../../../app/module1/services03";
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
Vue.use(VueFormGenerator);
Vue.use(VueFormWizard);
Vue.component(Vudal);
// register globally
Vue.component("multiselect", Multiselect);

export default {
  mounted() {
    this.getDistributor();
    this.getDistUserInfo();

    this.getCountry();

    this.getDistManageGroup();
    this.getDefaultCountry();
    this.getDistributorPoint()
  },
  props: {
    value: File,
  },
  data() {
    return {
      showView: false,
      visibleIc: true,
      showSubmitBtn: true,
      showUpdateBtn: true,
      visiblePassport: false,
      updatedisable: true,
      timestamp: "",
      country: [],
      postcode: [],
      city: [],
      states: "",
      state: [],
      distributorpoint: [],

      selected1: false,
      selected2: false,
      selected3: false,
      selected4: false,
      selected5: false,

      file1: "",
      file2: "",
      file3: "",
      file4: "",

      photoUploadList: [
        {
          id: "1",
          fileName: "Passport Size Photo",
          type: "photo",
          filePath: "",
          selected: false,
        },
        {
          id: "2",
          fileName: "Supporting Document",
          type: "file",
          filePath: "",
          selected: false,
        },
        // {id: "3",fileName: "Letter of Undertaking for variation due to Merger",type: "file",filePath:"",selected: false},
        // {id: "4",fileName: "Printed online application",type: "file",filePath:"",selected: false},
        // {id: "5",fileName: "Statutory Declaration",type: "file",filePath:"",selected: false }
      ],

      applicantPhoto: "",

      // division: [
      //   { id: "Finance", name: "Finance" },
      //   { id: "Payroll", name: "Payroll" }
      // ],
      // department: [
      //   { id: "Human Resource", name: "Human Resource" },
      //   { id: "Sales", name: "Sales" }
      // ],

      distributor: [],

      distGroup: [],
      appstatus: '',
      userrole: 0,
       distid: 0,
       fileRecords: [],
       // fileRecordsDoc: [],

      uploadUrl: "https://www.mocky.io/v2/5d4fb20b3000005c111099e3",
      uploadHeaders: {
        "X-Test-Header": "vue-file-agent"
      },
      editFileRecords: [],
      fileRecordsForUpload: [],
      editFileRecordsForUpload: [],

      content: "<h5></h5>",

       uploadFileName: "",
      uploadFileOject: "",
      editUploadFileObject: "",
      editUploadFileName: "",

       uploadFileName1: "",
      uploadFileOject1: "",
      editUploadFileObject1: "",
      editUploadFileName1: "",
      citizenship: [
        {
          name: "Malaysian",
          value: 1,
          selected: true
        },
        {
          name: "Non Malaysian",
          value: 2
        }
      ],
      model: {
        citizenship: 1,
        name: "",
        nric: "",
        passportNo: "",
        passportExpiry: "",
        email: "",
        USER_ADDR_1: "",
        USER_ADDR_2: "",
        USER_ADDR_3: "",
        DIST_POSTAL: "",
        DIST_COUNTRY: 33,
        DIST_CITY: "",
        DIST_STATE: "",
        distributor: "",
        distributorpoint: "",
        division: "",
        department: "",
        USER_GROUP: "",
        username: "",
        confirmPassword: "",
        USER_MOBILE_NUM: "",
        USER_OFFICE_NUM: "",
        USER_EXTENSION_NUM: "",
        USER_CHECK1: false,
        USER_CHECK2: false,
      },

      formOptions: {
        // validateAfterLoad: true,
        validateAfterChanged: true,
       // validateAsync: true
      },

      firstTabSchema: {
        groups: [
          {
            legend: "",
            fields: [
              // {
              //   type: "select",
              //   label: "Division",
              //   model: "division",
              //   values: () => {
              //     return this.division;
              //   },
              //   required: true,
              //   validator: "string",
              //   styleClasses: "ml-3 col-md-11"
              // },
              {
                type: "input",
                inputType: "text",
                label: "Name",
                model: "name",
                placeholder: "Enter Your name",
                required: true,
                validator: "string",
                styleClasses: "col-md-12 name-capitalize",
              },
              {
                type: "vfg-the-mask",
                labels: "NRIC Number",
                model: "nric",
                disabled: true,
                placeholder: "Enter NRIC No.",
                mask: "######-##-####",
                validator: ["required", this.validateIC],
                required: true,
                styleClasses: "col-md-12",
                visible: (model, field, form) => {
                  return model.citizenship === 1;
                }
              },
              {
                type: "radios",
                label: "Citizenship",
                model: "citizenship",
                required: true,
                values: () => {
                  return this.citizenship;
                },
                styleClasses: "col-md-3 display-inline"
              },
              {
                type: "input",
                inputType: "text",
                label: "Passport No",
                model: "passportNo",
                placeholder: "Enter Your passport No",
                validator: "string",
                styleClasses: "col-md-11",
                visible: (model, field, form) => {
                  return model.citizenship === 2;
                }
              },
              {
                labels: "Passport Expiry Date",
                type: "vfg-functional-date",
                placeholder: "Passport Expiry Date",
                model: "passportExpiry",
                noLabel: true,
                noClearButton: true,
                format: "dd-MMM-yyyy",
                styleClasses: "col-md-4",
                visible: (model, field, form) => {
                  return model.citizenship === 2;
                },
                required: true,
                validator: ["required", this.validateExpiryDate]
              },
              {
                type: "input",
                inputType: "email",
                label: "Email",
                model: "email",
                disabled: true,
                placeholder: "Enter Your email",
                required: true,
                validator: "string",
                styleClasses: "col-md-12",
              },
              {
               // type: "input",
                 type: "vfg-the-mask2",
                 mask: "01#-########",
                inputType: "text",
                label: "Mobile Number",
                model: "USER_MOBILE_NUM",
                disabled: false,
                placeholder: "Enter Your Mobile Number",
                required: true,
                validator: "string",
                styleClasses: "col-md-12",
              },
              {
               // type: "input",
                type: "vfg-the-mask2",
                  mask: "01-########",
                inputType: "text",
                label: "Office Number",
                model: "USER_OFFICE_NUM",
                disabled: false,
                placeholder: "Enter Your Office Number",
                required: true,
                validator: "string",
                styleClasses: "col-md-12",
              },
               {
                type: "input",
                inputType: "number",
                label: "Extension Number",
                min:0,
                model: "USER_EXTENSION_NUM",
                disabled: false,
                placeholder: "Enter Your Extension Number",
               // required: true,
               // validator: "string",
                styleClasses: "col-md-12",
              },
              {
                type: "input",
                inputType: "text",
                label: "Address",
                model: "USER_ADDR_1",
                placeholder: "Enter street address",
                hint: "Street Address",
                required: true,
                validator: "string",
                styleClasses: "col-md-12",
              },
              {
                type: "input",
                inputType: "text",
                model: "USER_ADDR_2",
                placeholder: "Enter street address",
                hint: "Street Address line 2",
                styleClasses: "col-md-12",
              },
              {
                type: "input",
                inputType: "text",
                model: "USER_ADDR_3",
                placeholder: "Enter street address",
                hint: "Street Address line 3",
                styleClasses: "col-md-12",
              },
              {
                type: "vueMultiSelect",
                model: "DIST_COUNTRY",
                label: "Country",
                placeholder: "Enter Your Country",
                required: true,
                validator: "required",
                styleClasses: "col-md-6",
               // value: 33,
                selectOptions: {
                  multiple: false,
                  key: "SETTING_GENERAL_ID",
                  label: "SET_PARAM",
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.country;
                },
              },
              {
                label: "State",
                type: "input",
                inputType: "text",
                model: "DIST_STATE",
                placeholder: "Enter Your State",
                styleClasses: "col-md-6",
                 visible: (model, field, form) => {
                  return model.DIST_COUNTRY.SET_CODE != "MY";
                },
                 required: true,
              validator: "required",

              },
              {
                type: "vueMultiSelect",
                model: "DIST_STATE",
                label: "State",
                placeholder: "Select Your state",
                selectOptions: {
                  multiple: false,
                  key: "SETTING_GENERAL_ID",
                  label: "SET_PARAM",
                  searchable: true,
                },
                visible: (model, field, form) => {
                  return model.DIST_COUNTRY.SET_CODE == "MY";
                },
                values: (model, schema) => {
                  return this.state;
                },
                required: true,
                validator: "required",
                styleClasses: "col-md-6",
              },
              {
                type: "vueMultiSelect",
                model: "DIST_CITY",
                label: "City",
                placeholder: "Enter Your City",
                required: true,
                validator: "required",
                styleClasses: "col-md-6",
                selectOptions: {
                  multiple: false,
                  key: "SETTING_CITY_ID",
                  label: "SET_CITY_NAME",
                  searchable: true,
                },
                visible: (model, field, form) => {
                  return model.DIST_COUNTRY.SET_CODE == "MY";
                },
                values: (model, schema) => {
                  return this.city;
                },
              },
              {
                label: "City",
                type: "input",
                inputType: "text",
                model: "DIST_CITY",
                placeholder: "Enter Your City",
                styleClasses: "col-md-6",
                required: true,
                validator: "required",
                visible: (model, field, form) => {
                  return model.DIST_COUNTRY.SET_CODE != "MY";
                },
              },
              {
                label: "Postcode",
                type: "input",
                inputType: "text",
                model: "DIST_POSTAL",
                placeholder: "Enter Your Postcode",
                styleClasses: "col-md-6",
                required: true,
                validator: "required",
                visible: (model, field, form) => {
                  return model.DIST_COUNTRY.SET_CODE != "MY";
                },
              },
              {
                type: "vueMultiSelect",
                model: "DIST_POSTAL",
                label: "Postcode",
                placeholder: "Enter Your Postcode",
                required: true,
                validator: "required",
                styleClasses: "col-md-6",
                selectOptions: {
                  multiple: false,
                  key: "POSTCODE_ID",
                  label: "POSTCODE",
                  searchable: true,
                },
                visible: (model, field, form) => {
                  return model.DIST_COUNTRY.SET_CODE == "MY";
                },
                values: (model, schema) => {
                  return this.postcode;
                },
              },
              {
                type: "vueMultiSelect",
                label: "Distributor",
                model: "distributor",
                placeholder: "Select Distributor",
                required: true,
                validator: "required",
                styleClasses: "col-md-12",
                selectOptions: {
                  multiple: false,
                  key: "DISTRIBUTOR_ID",
                  label: "DIST_NAME",
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.distributor;
                },
              },
              {
                type: "vueMultiSelect",
                label: "Distributor Point Name",
                model: "distributorpoint",
                placeholder: "Select Distributor Point Name",
               // required: true,
               // validator: "required",
                styleClasses: "col-md-12",
                selectOptions: {
                  multiple: false,
                  key: "DIST_POINT_ID",
                  label: "DIST_POINT_NAME",
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.distributorpoint;
                },
              },
              {
                type: "vueMultiSelect",
                label: "Role",
                model: "USER_GROUP",
                placeholder: "Select Role",
                selectOptions: {
                  multiple: false,
                  key: "DISTRIBUTOR_MANAGE_GROUP_ID",
                  label: "DISTRIBUTOR_MANAGE_GROUP_NAME",
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.distGroup;
                },
                required: true,
                validator: "required",
                styleClasses: "col-md-12",
              },
              // {
              //   type: "vueMultiSelect",
              //   label: "Division",
              //   model: "distributor",
              //   placeholder: "Select Distributor",
              //   required: true,
              //   validator: "required",
              //   styleClasses: "col-md-12",
              //   selectOptions: {
              //     multiple: false,
              //     key: "DISTRIBUTOR_ID",
              //     label: "DIST_NAME",
              //     searchable: true
              //   },
              //   values: (model, schema) => {
              //     return this.distributor;
              //   }
              // },
            ],
          },
        ],
      },

      thirdTabSchema: {
        fields: [
          {
            type: "checkbox",
            styleClasses: "ml-1 col-md-1",
             model: "USER_CHECK1",
             required: true,
             validator: "required",
            // default: true
          },
          {
            label:
              " I agree to abide by the applicable Terms and Condition of use for this system and relevant laws and rules issued by FIMM",
            styleClasses: "col-md-10",
          },
          {
            type: "checkbox",
            styleClasses: "ml-1 col-md-1",
               model: "USER_CHECK2",
             required: true,
            validator: "required",
            // default: true
          },
          {
            label:
              " I hereby confirm that the information given herein and in any other document provided for purposes of my application and registration with FIMM is true and accurate",
            styleClasses: "col-md-10",
          },
        ],
      },
    };
  },

  methods: {
    async getDistManageGroup() {
      const response = await services06Module1.getDistGroup();
      console.log(response.data);
      this.distGroup = response.data;
    },
    async getDistUserInfo() {
      const response = await services03Module1.getDistUserInfo(
        JSON.parse(localStorage.getItem("user")).user_id
      );
      //console.log("Info=",response);
      // console.log("Info1=",response.USER_NRIC);
       this.appstatus = response.APPR_STATUS;
       this.userrole = response.USER_GROUP;
       this.distid = response.USER_DIST_ID;
      this.model.nric = response.USER_NRIC;
      this.model.citizenship = this.model.nric ? 1 : 2;
      this.model.email = response.USER_EMAIL;
      this.model.name = response.USER_NAME;
      this.model.USER_MOBILE_NUM = response.USER_MOBILE_NUM;
      this.model.USER_OFFICE_NUM = response.USER_OFFICE_NUM;
      this.model.USER_EXTENSION_NUM = response.USER_EXTENSION_NUM;
      this.model.USER_ADDR_1 = response.USER_ADDR_1;
      this.model.USER_ADDR_2 = response.USER_ADDR_2;
      this.model.USER_ADDR_3 = response.USER_ADDR_3;
      if(this.appstatus == 3)
      {
        this.updatedisable = false;
      }
      else{
         this.updatedisable = false;
      }
      if(response.USER_ADDR_COUNTRY == null)
      {
         console.log("COUNTRY111=",response.USER_ADDR_COUNTRY);
         this.model.DIST_COUNTRY = {
          SETTING_GENERAL_ID: 33,
            SET_PARAM: 'MALAYSIA',
      };
      }
      else{
        this.model.DIST_COUNTRY = {
          SETTING_GENERAL_ID: response.USER_ADDR_COUNTRY,
            SET_PARAM: response.COUNTRYNAME,
      };
      }
      this.model.DIST_COUNTRY.SET_CODE = "MY";
       if(response.USER_DIST_ID != null){
        this.model.distributor = {
          DISTRIBUTOR_ID: response.USER_DIST_ID,
            DIST_NAME: response.DIST_NAME,
      };

    }
    this.model.distributorpoint = {
          DIST_POINT_ID: response.DIST_POINT,
          DIST_POINT_NAME: response.DIST_POINT_NAME,
      };
      this.model.DIST_STATE = {
          SETTING_GENERAL_ID: response.USER_ADDR_STATE,
            SET_PARAM: response.STATENAME,
      };
       this.model.DIST_CITY = {
          SETTING_CITY_ID: response.USER_ADDR_CITY,
            SET_CITY_NAME: response.SET_CITY_NAME,
      };
       this.model.DIST_POSTAL = {
          POSTCODE_ID: response.USER_ADDR_POSTAL,
            POSTCODE: response.POSTCODE_NO,
      };
      this.model.USER_GROUP = {
          DISTRIBUTOR_MANAGE_GROUP_ID: response.USER_GROUP,
            DISTRIBUTOR_MANAGE_GROUP_NAME: response.DISTRIBUTOR_MANAGE_GROUP_NAME,
      };
    },
    async getDistributor() {
      console.log("get distributor");
      const response = await services03Module1.getDistributor();
      this.distributor = response;
      this.getDistributorPoint(this.distributor.DISTRIBUTOR_ID);
    },
    async getCountry() {
      const response = await services06Module0.getSettingGeneral("COUNTRY");
      this.country = response;

      this.getState(this.country.SETTING_GENERAL_ID);
    },
    async getCity(data) {
      // const data = {
      //   SETTING_GENERAL_ID: data
      // };
      const response = await services06Module0.getCity(data);
      this.city = response;
    },
    async getPostcode(data) {
      const response = await services06Module0.getPostcodeByID(data);
      this.postcode = response;
    },
    async getState(id) {
      const data = {
        SETTING_GENERAL_ID: id,
        SET_TYPE: "STATE",
      };
      const response = await services06Module0.getStateById(data);
      this.state = response;
    },
     async getDistributorPoint(id) {
      const data = {
        DISTRIBUTOR_ID: id,
       // SET_TYPE: "STATE",
      };
      const response = await services03Module1.getDidtributorPointById(data);
      console.log("Point=",response);
      this.distributorpoint = response;
    },
    async getDefaultCountry() {
      try {
        const response = await services06Module0.getDefaultCountry();
      } catch (error) {
        //console.log(error);
      }
    },
    async beginSubmit() {
     console.log("begin validation=", this.model.USER_CHECK1);
       console.log("begin validation1=", this.model.USER_CHECK2);
      if (this.validateFirstTab() == true) {
          console.log("begin=", this.model.USER_CHECK2);
        if(this.model.DIST_STATE.SETTING_GENERAL_ID == null)
        {
          alert("Please check your User Profile Form And Fillup All  * Fields");
          return false;
        }
         if(this.model.DIST_CITY.SETTING_CITY_ID == null)
        {
          alert("Please check your User Profile Form And Fillup All  * Fields");
          return false;
        }
         if(this.model.DIST_POSTAL.POSTCODE_ID == null)
        {
          alert("Please check your User Profile Form And Fillup All  * Fields");
          return false;
        }
         if(this.model.distributor.DISTRIBUTOR_ID == 0)
        {
          alert("Please check your User Profile Form And Fillup All  * Fields");
          return false;
        }
          if(this.model.USER_GROUP.DISTRIBUTOR_MANAGE_GROUP_ID == null)
        {
          alert("Please check your User Profile Form And Fillup All  * Fields");
          return false;
        }
        if(this.model.USER_CHECK1 == false && this.model.USER_CHECK2 == false)
        {
          alert("Please check your both declaration.");
          return false;
        }
          if(this.model.USER_CHECK1 == true && this.model.USER_CHECK2 == false)
        {
          alert("Please check your both declaration.");
          return false;
        }
          if(this.model.USER_CHECK1 == false && this.model.USER_CHECK2 == true)
        {
          alert("Please check your both declaration.");
          return false;
        }
          if(this.model.USER_CHECK1 == true && this.model.USER_CHECK2 == true)
          {
            //alert("sssssssssssssssss");
            this.submitUserUpdate();

        } else {
           alert("Please check your both declaration.");
           return false;
         }
      } else {
        alert("Please check your User Profile Form.");
         return false;
      }
    },
    async submitUserUpdate(submitType = 'UPDATE') {
      const vm = this;
      // alert("Validation Ok.");
      // alert(JSON.stringify(this.model.companyLogo));
      const user = localStorage.getItem("user");
      const data = new FormData();
      data.append("FILEOBJECT", this.uploadFileOject);
      data.append("FILEOBJECTDOC", this.editUploadFileObject);
      data.append("USER_ID", JSON.parse(user).user_id);
      data.append("USER_NAME", this.model.name ?? "");
      data.append("USER_NRIC", this.model.nric ?? "");
      data.append("USER_EMAIL", this.model.email ?? "");
      data.append("USER_MOBILE_NUM", this.model.USER_MOBILE_NUM ?? "");
      data.append("USER_OFFICE_NUM", this.model.USER_OFFICE_NUM ?? "");
      data.append("USER_EXTENSION_NUM", this.model.USER_EXTENSION_NUM ?? "");
      data.append("USER_ADDR_1", this.model.USER_ADDR_1 ?? "");
      data.append("USER_ADDR_2", this.model.USER_ADDR_2 ?? "");
      data.append("USER_ADDR_3", this.model.USER_ADDR_3 ?? "");
      data.append("USER_ADDR_COUNTRY", this.model.DIST_COUNTRY.SETTING_GENERAL_ID ?? "");
      data.append("USER_ADDR_CITY", this.model.DIST_CITY.SETTING_CITY_ID ?? "");
      data.append("USER_ADDR_STATE", this.model.DIST_STATE.SETTING_GENERAL_ID ?? "");
      data.append("USER_ADDR_POSTAL", this.model.DIST_POSTAL.POSTCODE_ID ?? "");
      let message;
      if(submitType ==='DRAFT') {
        data.append("DRAFT", 1);
        message = 'Draft operation successful.';
      } else {
        message = 'Your registration and role application has been submitted. Please wait for approval.';
      }

     // data.append("NRIC_IMAGE", this.applicantPhoto ?? "");
      //data.append("USER_DOCS", this.uploadFileObject ?? "");

      data.append("USER_DIST_ID", this.model.distributor.DISTRIBUTOR_ID ?? "");
       data.append("DIST_POINT", this.model.distributorpoint.DIST_POINT_ID ?? "");

      data.append(
        "USER_GROUP",
        this.model.USER_GROUP.DISTRIBUTOR_MANAGE_GROUP_ID ?? ""
      );
      // data.append("USER_DIVISION", this.model.division ?? "");

      data.append("APPR_STATUS", 2);

      //notification

      data.append("NOTI_LOCATION", "distributor-user-management-list");
      var remarkEntry = "(DIST-USER)NEW USER REGISTRATION";
      data.append("NOTI_REMARK", remarkEntry);
      data.append("DISTRIBUTOR_ID", this.model.distributor.DISTRIBUTOR_ID);

      //console.log(data);

      try {
        this.showSubmitBtn = false;
        const response = await services06Module1.updateUserProfile(data);
        alert(message);
        this.$router.push(
          "/distributor/distributor-user-management-list-status"
        );
      } catch (error) {
        console.log(error);
      }
    },
     async beginUpdate(submitType ='Update') {
      if (this.validateFirstTab()) {

            this.updateUserProfile();

      } else {
        alert("Please check your User Profile Form.");
      }
    },
    async beginDraft() {
      if (this.validateFirstTab()) {
            this.updateUserProfile("DRAFT");
      } else {
        alert("Please check your User Profile Form.");
      }
    },
     async updateUserProfile(submitType ='Update') {
      const vm = this;
     // alert("Validation Ok.");
      // alert(JSON.stringify(this.model.companyLogo));
      const user = localStorage.getItem("user");
      const data = new FormData();
      // data.append("FILEOBJECT2", this.uploadFileOject2);\]
        data.append("FILEOBJECT", this.uploadFileOject);
      data.append("FILEOBJECTDOC", this.editUploadFileObject);
      data.append("USER_ID", JSON.parse(user).user_id);
      data.append("USER_NAME", this.model.name ?? "");
      data.append("USER_NRIC", this.model.nric ?? "");
      data.append("USER_EMAIL", this.model.email ?? "");
      data.append("USER_MOBILE_NUM", this.model.USER_MOBILE_NUM ?? "");
      data.append("USER_OFFICE_NUM", this.model.USER_OFFICE_NUM ?? "");
      data.append("USER_EXTENSION_NUM", this.model.USER_EXTENSION_NUM ?? "");
      data.append("USER_ADDR_1", this.model.USER_ADDR_1 ?? "");
      data.append("USER_ADDR_2", this.model.USER_ADDR_2 ?? "");
      data.append("USER_ADDR_3", this.model.USER_ADDR_3 ?? "");
      data.append("USER_ADDR_COUNTRY", this.model.DIST_COUNTRY.SETTING_GENERAL_ID ?? "");
      data.append("USER_ADDR_CITY", this.model.DIST_CITY.SETTING_CITY_ID ?? "");
      data.append("USER_ADDR_STATE", this.model.DIST_STATE.SETTING_GENERAL_ID ?? "");
      data.append("USER_ADDR_POSTAL", this.model.DIST_POSTAL.POSTCODE_ID ?? "");

      data.append("NRIC_IMAGE", this.applicantPhoto ?? "");
      data.append("USER_DOCS", this.uploadFileObject ?? "");

      data.append("USER_DIST_ID", this.model.distributor.DISTRIBUTOR_ID ?? "");
       data.append("DIST_POINT", this.model.distributorpoint.DIST_POINT_ID ?? "");

      data.append(
        "USER_GROUP",
        this.model.USER_GROUP.DISTRIBUTOR_MANAGE_GROUP_ID ?? ""
      );
       let message;
       if(submitType ==='DRAFT') {
         data.append("DRAFT", 1);
         message = 'Draft operation successful.';
       } else {
         message = 'Profile Updated Successfully.';
       }
      // data.append("USER_DIVISION", this.model.division ?? "");

     // data.append("APPR_STATUS", 2);

      //notification

     // console.log(data);

      try {
        this.showUpdateBtn = false;
        const response = await services06Module1.updateUserProfilePost(data);
        alert(message);
        this.$router.push(
          "/distributor/distributor-user-management-list-status"
        );
      } catch (error) {
        console.log(error);
      }
    },
    validateExpiryDate(value) {
      console.log("value : " + value);
      if (value != null) {
        const today = new Date();
        const date =
          today.getFullYear() +
          "-" +
          (today.getMonth() + 1) +
          "-" +
          today.getDate();
        const time =
          today.getHours() +
          ":" +
          today.getMinutes() +
          ":" +
          today.getSeconds() +
          " GMT";
        const dateTime = date + " " + time;

        const unixTimeNow = Date.parse(dateTime);
        console.log(unixTimeNow);

        // date expiry
        const expiryDate = value;
        const dateExpiry =
          expiryDate.getFullYear() +
          "-" +
          (expiryDate.getMonth() + 1) +
          "-" +
          expiryDate.getDate();
        const timeExpiry =
          expiryDate.getHours() +
          ":" +
          expiryDate.getMinutes() +
          ":" +
          expiryDate.getSeconds() +
          " GMT";
        const dateTimeExpiry = dateExpiry + " " + timeExpiry;
        const unixTimeExpiryDate = Date.parse(dateTimeExpiry);
        console.log(unixTimeExpiryDate);

        // compare
        if (unixTimeExpiryDate < unixTimeNow) {
          console.log("expired");
          return ["Expired"];
        } else {
          console.log("not expired");
          // return ["Expired"];
        }
      } else {
        console.log("ssdfdsf");
      }
    },

    validateIC(value) {
      //* * must contain letter only (lowercase and uppercase) */
      const expression1 = /^[0-9]+$/;
      if (value.length != 12) {
        return ["NRIC number must contain 12 digit"];
      }
      // let expression2 = /^[a-zA-Z]*[A-Z]+[a-zA-Z]*$/;
      // //** must contain at least one uppercase letter, one lower case letter and one number */
      // let expression4 = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]+)$/;
      // //** must contain at least one uppercase letter, one lower case letter, one number and one character */
      // let expression5 = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*?[#?!@$%^&*-])([a-zA-Z0-9#?!@$%^&*-]+)$/;
      // //** must contain at least one uppercase letter, one lower case letter, one number and one character with minimum length*/
      // let expression6 = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*?[#?!@$%^&*-])([a-zA-Z0-9#?!@$%^&*-]+).{8}$/;

      //console.log(expression1.test(value));
      if (!expression1.test(value)) {
        // this.passwordStrength = "";
        return ["Ic must contain number only"];
      }
    },

    onModelUpdated(newVal, schema) {
      console.log("Modal=",newVal);
       console.log("Modal1=",schema);
      if (schema == "citizenship" && newVal == "Malaysian") {
        this.visibleNRICNo = true;
        this.visiblePassportNo = false;
        // eslint-disable-next-line eqeqeq
      } else if (schema == "citizenship" && newVal == "Non-Malaysian") {
        this.visibleNRICNo = false;
        this.visiblePassportNo = true;
      } else if (schema === "DIST_COUNTRY") {
        this.model.DIST_POSTAL = null;
        this.city = [];
        this.model.DIST_CITY = null;
        this.model.DIST_STATE = null;
        if (newVal.SET_CODE === "MY") {
          // this.getPostcode();
          // this.getState(newVal.SETTING_GENERAL_ID);
        }
      } else if (schema === "DIST_POSTAL") {
        // this.model.city = null;
        //  this.model.state = null;
        if (this.model.DIST_COUNTRY.SET_CODE === "MY") {
          this.getCity(this.model.DIST_POSTAL.SETTING_CITY_ID);
        }
      } else if (schema === "DIST_CITY") {
        if (this.model.DIST_COUNTRY.SET_CODE === "MY") {
          this.getPostcode(this.model.DIST_CITY.SETTING_CITY_ID);
        }
      } else if (schema === "DIST_STATE") {
        // this.model.city = null;
        if (this.model.DIST_COUNTRY.SET_CODE === "MY") {
          this.getCity(this.model.DIST_STATE.SETTING_GENERAL_ID);
        }
      }
      else if (schema === "distributor") {
        // this.model.city = null;
       // if (this.model.DIST_COUNTRY.SET_CODE === "MY") {
          this.getDistributorPoint(this.model.distributor.DISTRIBUTOR_ID);
        //}
      }
    },

    switchView(type) {
      this.viewType = type;
    },

    uploadImage(index, item) {
      item.selected = true;
      // eslint-disable-next-line eqeqeq
      if (index == 0) {
        // console.log(this.$refs.applicantPhoto[0].files[0]);
        this.applicantPhoto = this.$refs.applicantPhoto[0].files[0];
        const reader = new FileReader();
        reader.addEventListener(
          "load",
          function () {
            this.$refs.applicantPhotoDisplay[0].src = reader.result;
          }.bind(this),
          false
        );

        reader.readAsDataURL(this.applicantPhoto);
        console.log(item.selected);
        // item.selected = true;
      }
    },

    handleFileChange(e) {
      this.$emit("input", e.target.files[0]);
      this.fileName1 = e.target.files[0].name;
      console.log(e.target.files[0].name);
      // if (this.$refs.fileName1.files[0]) {
      //   console.log(this.$refs.fileName1.files[0].name);
      //   this.model.fileName1 = this.$refs.fileName1.files[0].name;
      // }
      // if (this.$refs.fileName2.files[0]) {
      //   console.log(this.$refs.fileName2.files[0].name);
      //   this.model.fileName2 = this.$refs.fileName2.files[0].name;
      // }
      // if (this.$refs.fileName3.files[0]) {
      //   console.log(this.$refs.fileName3.files[0].name);
      //   this.model.fileName3 = this.$refs.fileName3.files[0].name;
      // }
      // if (this.$refs.fileName4.files[0]) {
      //   console.log(this.$refs.fileName4.files[0].name);
      //   this.model.fileName4 = this.$refs.fileName4.files[0].name;
      // }
    },
    onComplete() {
      // alert(JSON.stringify(this.model));
    },
    validatePassword(value) {
      //* * must contain letter only (lowercase and uppercase) */
      const expression1 = /^[a-zA-Z]+$/;
      const expression2 = /^[a-zA-Z]*[A-Z]+[a-zA-Z]*$/;
      //* * must contain at least one uppercase letter, one lower case letter and one number */
      const expression4 = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]+)$/;
      //* * must contain at least one uppercase letter, one lower case letter, one number and one character */
      const expression5 =
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*?[#?!@$%^&*-])([a-zA-Z0-9#?!@$%^&*-]+)$/;
      //* * must contain at least one uppercase letter, one lower case letter, one number and one character with minimum length*/
      const expression6 =
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*?[#?!@$%^&*-])([a-zA-Z0-9#?!@$%^&*-]+).{8}$/;

      console.log(expression1.test(value));
      if (!expression1.test(value)) {
        this.passwordStrength = "";
        return ["Password must contain letter only"];
      }
    },
    isEqualTo(value, field, model) {
      if (!_.has(field, "equals")) return ["Confirm password is required"];
      const a = _.get(model, _.get(field, "equals"));
      const b = value;
      if (_.isEqual(a, b)) return [];
      return ["Password do not match"];
    },

    validateFirstTab() {
      if (this.$refs.firstTabForm.validate() == true) {
        return true;
      } else {
        return false;
      }
    },
    validateThirdTab: function () {
      if (this.$refs.thirdTabForm.validate() == true) {
        return true;
      } else {
        return false;
      }
    },
     filesSelected: function(fileRecordsNewlySelected) {
      var validFileRecords = fileRecordsNewlySelected.filter(
        fileRecord => !fileRecord.error
      );
      this.fileRecordsForUpload = this.fileRecordsForUpload.concat(
        validFileRecords
      );
      this.uploadFileName = this.fileRecordsForUpload[0].file.name;
      this.uploadFileOject = this.fileRecordsForUpload[0].file;
      console.log(this.fileRecordsForUpload[0].file);
    },

    onBeforeDelete: function(fileRecord) {
      var i = this.fileRecordsForUpload.indexOf(fileRecord);
      console.log(this.fileRecords);
      if (i !== -1) {
        // queued file, not yet uploaded. Just remove from the arrays

        this.fileRecordsForUpload.splice(i, 1);
        var k = this.fileRecords.indexOf(fileRecord);
        if (k !== -1) this.fileRecords.splice(k, 1);
      } else {
        this.$refs.vueFileAgent.deleteFileRecord(fileRecord);
        // if (confirm("Are you sure you want to delete?")) {
        //   this.$refs.vueFileAgent.deleteFileRecord(fileRecord); // will trigger 'delete' event
        // }
      }
    },
    fileDeleted: function(fileRecord) {
      var i = this.fileRecordsForUpload.indexOf(fileRecord);
      if (i !== -1) {
        this.fileRecordsForUpload.splice(i, 1);
      } else {
        this.deleteUploadedFile(fileRecord);
      }
    },

    editdeleteUploadedFile: function(fileRecord) {
      this.$refs.vueFileAgent.deleteUpload(
        this.uploadUrl,
        this.uploadHeaders,
        fileRecord
      );
    },

    editfilesSelected: function(fileRecordsNewlySelected) {
      console.log(fileRecordsNewlySelected);
      var validFileRecords = fileRecordsNewlySelected.filter(
        fileRecord => !fileRecord.error
      );
      this.editFileRecordsForUpload = this.editFileRecordsForUpload.concat(
        validFileRecords
      );
      this.editUploadFileName = this.editFileRecordsForUpload[0].file.name;
      this.editUploadFileObject = this.editFileRecordsForUpload[0].file;
      console.log("file");
      console.log(this.editFileRecordsForUpload[0].file);
    },

    editonBeforeDelete: function(fileRecord) {
      var i = this.editFileRecordsForUpload.indexOf(fileRecord);
      if (i !== -1) {
        // queued file, not yet uploaded. Just remove from the arrays
        this.editFileRecordsForUpload.splice(i, 1);
        var k = this.editFileRecords.indexOf(fileRecord);
        if (k !== -1) this.editFileRecords.splice(k, 1);
      } else {
        this.$refs.vueFileAgentEdit.deleteFileRecord(fileRecord);
        // if (confirm("Are you sure you want to delete?")) {
        //   this.$refs.vueFileAgent.deleteFileRecord(fileRecord); // will trigger 'delete' event
        // }
      }
    },
    editfileDeleted: function(fileRecord) {
      var i = this.editFileRecordsForUpload.indexOf(fileRecord);
      if (i !== -1) {
        this.editFileRecordsForUpload.splice(i, 1);
      } else {
        this.editdeleteUploadedFile(fileRecord);
      }
    }

  },
};
</script>

<style lang="scss">
.w-150px {
  width: 150px;
  height: 150px;
}

.vue-form-wizard .wizard-icon-circle .wizard-icon-container {
  border-radius: 50% !important;
  margin: -4px;
}

.field-vfg-the-mask2 .width label{
  display:none;
}
// .col-md-12 input{
//   text-transform: uppercase;
// }
</style>

/* eslint-disable no-debugger, no-console */
<template>
  <va-inner-loading :loading="statusLoad">
    <div class="">
      <div class="">
        <va-modal
          v-model="showStaticModal"
          title=""
          message=""
          no-dismiss
          cancel-text=""
          ok-text="Submit"
          @ok="proceedToSubmit"
        >
          <vue-form-generator
            :model="model"
            :schema="declarationSchema"
            :options="formOptions"
            ref="declarationTabForm"
            @model-updated="onModelUpdated"
          >
          </vue-form-generator>
        </va-modal>
        <vudal name="simpleModal" class="widthModal">
          <div class="header">
            <i class="close icon">&times;</i>
            <br />
          </div>
          <div>
            <va-card>
              <div>
                <horizontal-scroll>
                  <va-button-toggle
                    :round="false"
                    outline
                    v-model="tabValue"
                    :options="options"
                    color="primary"
                  />
                </horizontal-scroll>
              </div>
              <br />
              <div v-if="tabValue === 1" class="tabcontent">
                <table class="table">
                  <tbody>
                    <tr>
                      <td style="width: 20%"><b>Trainig Provider Name</b></td>
                      <td style="width: 2%">:</td>
                      <td>
                        {{ model.TRP_NAME }}
                      </td>
                    </tr>
                    <tr>
                      <td style="width: 20%"><b>Registration Number</b></td>
                      <td style="width: 2%">:</td>
                      <td>
                        {{ model.TRP_REGI_NUM1 }}
                      </td>
                    </tr>
                    <tr>
                      <td style="width: 20%"><b>New Registration Number</b></td>
                      <td style="width: 2%">:</td>
                      <td>
                        {{ model.TRP_REGI_NUM2 }}
                      </td>
                    </tr>
                    <tr>
                      <td style="width: 20%"><b>Training Provider Type</b></td>
                      <td style="width: 2%">:</td>
                      <td v-if="model.TRP_TYPE_SETUP == 1">Local</td>
                      <td v-if="model.TRP_TYPE_SETUP == 2">Non Local</td>
                    </tr>
                    <tr>
                      <td style="width: 20%"><b>Address</b></td>
                      <td style="width: 2%">:</td>
                      <td>
                        {{ model.TRP_ADDR_1 }} {{ model.TRP_ADDR_2 }}
                        {{ model.TRP_ADDR_3 }}
                      </td>
                    </tr>
                    <tr>
                      <td style="width: 20%"><b>Country</b></td>
                      <td style="width: 2%">:</td>
                      <td>
                        {{ model.TRP_COUNTRY.SET_PARAM }}
                      </td>
                    </tr>
                    <tr>
                      <td style="width: 20%"><b>State</b></td>
                      <td style="width: 2%">:</td>
                      <!-- <td v-if="model.TRP_COUNTRY.SET_CODE == 'MY'">

                    </td>
                    <td v-if="model.TRP_COUNTRY.SET_CODE != 'MY'">

                    </td> -->
                      <td>{{ model.TRP_STATE }}</td>
                    </tr>
                    <tr>
                      <td style="width: 20%"><b>City</b></td>
                      <td style="width: 2%">:</td>
                      <!-- <td v-if="model.TRP_COUNTRY.SET_CODE == 'MY'">

                    </td>
                    <td v-if="model.TRP_COUNTRY.SET_CODE != 'MY'">

                    </td> -->
                      <td>
                        {{ model.TRP_CITY }}
                      </td>
                    </tr>
                    <tr>
                      <td style="width: 20%"><b>Postal</b></td>
                      <td style="width: 2%">:</td>
                      <!-- <td v-if="model.TRP_COUNTRY.SET_CODE == 'MY'">

                    </td>
                    <td v-if="model.TRP_COUNTRY.SET_CODE != 'MY'">

                    </td> -->
                      <td>
                        {{ model.TRP_POSTAL }}
                      </td>
                    </tr>
                    <tr>
                      <td style="width: 20%"><b>Mobile Phone Number</b></td>
                      <td style="width: 2%">:</td>
                      <td>
                      <div v-if="model.TRP_COMPANY_MOBILE_NO != NULL && model.TRP_COMPANY_MOBILE_NO.length > 1">
                       01{{ model.TRP_COMPANY_MOBILE_NO.substring(0,1) + "-" + model.TRP_COMPANY_MOBILE_NO.substring(1,11) }}
                      </div>
                      <div v-else>-</div>
                      </td>
                    </tr>
                    <tr>
                      <td style="width: 20%"><b>Fax Number</b></td>
                      <td style="width: 2%">:</td>
                      <td>
                      <div v-if="model.TRP_FAX_NUMBER != NULL && model.TRP_FAX_NUMBER.length > 1">
                        0{{ model.TRP_FAX_NUMBER.substring(0,1) + "-" + model.TRP_FAX_NUMBER.substring(1,10)  }}
                      </div>
                      <div v-else>-</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div v-if="tabValue === 2" class="tabcontent">
                <h4>CEO Profile</h4>
                <table class="table">
                  <tbody>
                    <tr>
                      <td style="width: 20%"><b>Name</b></td>
                      <td style="width: 2%">:</td>
                      <td>
                        {{ model.CEO_REPR_SALUTATION.SET_PARAM }}
                        {{ model.CEO_REPR_NAME }}
                      </td>
                    </tr>
                    <tr>
                      <td style="width: 20%"><b>Position</b></td>
                      <td style="width: 2%">:</td>
                      <td>
                        {{ model.CEO_REPR_POSITION }}
                      </td>
                    </tr>
                    <tr v-if="model.CEO_REPR_CITIZEN == 1">
                      <td style="width: 20%"><b>NRIC No</b></td>
                      <td style="width: 2%">:</td>
                      <td>

                         <div v-if="model.CEO_REPR_NRIC != NULL && model.CEO_REPR_NRIC.length > 1">
                           {{
                              (model.CEO_REPR_NRIC) ? (
                                model.CEO_REPR_NRIC.substring(0, 6) +
                                "-" +
                                model.CEO_REPR_NRIC.substring(6, 8) +
                                "-" +
                                model.CEO_REPR_NRIC.substring(8, 13)
                              ) : ''
                            }}
                         </div>
                         <div v-else>-</div>
                      </td>
                    </tr>
                    <tr v-if="model.CEO_REPR_CITIZEN == 2">
                      <td style="width: 20%"><b>Passport No</b></td>
                      <td style="width: 2%">:</td>
                      <td>
                        {{ model.CEO_REPR_PASS_NUM }}
                      </td>
                    </tr>
                    <tr v-if="model.CEO_REPR_CITIZEN == 2">
                      <td style="width: 20%"><b>Passport Expiry Date</b></td>
                      <td style="width: 2%">:</td>
                      <td>
                        {{ model.CEO_REPR_PASS_EXP }}
                      </td>
                    </tr>
                    <tr>
                      <td v-if="model.CEO_REPR_TELEPHONE == null"> - </td>
                    </tr>
                    <tr>
                      <td style="width: 20%"><b>Mobile Phone Number</b></td>
                      <td style="width: 2%">:</td>

                      <td v-if="model.CEO_REPR_MOBILE_NUMBER != NULL && model.CEO_REPR_MOBILE_NUMBER.length > 1">
                        01{{
                              model.CEO_REPR_MOBILE_NUMBER.substring(0, 1) +
                              "-" +
                              model.CEO_REPR_MOBILE_NUMBER.substring(1, 10)
                            }}
                      </td>
                      <td v-if=" model.CEO_REPR_MOBILE_NUMBER == NULL && model.CEO_REPR_MOBILE_NUMBER.length < 1">-</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div v-if="tabValue === 3" class="tabcontent">
                <span>Form 49s</span>
                <br />
                <VueFileAgent
                  :uploadUrl="'https://example.com'"
                  :uploadHeaders="{}"
                  :multiple="false"
                  :deletable="true"
                  :editable="false"
                  :linkable="false"
                  :accept="'.pdf'"
                  :maxSize="'2MB'"
                  :maxFiles="8"
                  :helpText="'Select files'"
                  :errorText="{
                          type: 'Please select images, videos, pdf or zip files',
                          size: 'You selected a larger file!',
                        }"
                  :thumbnailSize="120"
                  :theme="'list'"
                  @select="filesSelected2($event)"
                  @beforedelete="onBeforeDelete2($event, 8)"
                  v-model="fileRecords"
                ></VueFileAgent>
<!--                <vue-form-generator-->
<!--                    :model="model"-->
<!--                    :schema="previewUploadSchema"-->
<!--                    :options="formOptions"-->
<!--                    ref="previewUploadForm"-->
<!--                    @model-updated="onModelUpdated"-->
<!--                  >-->
<!--                  </vue-form-generator>-->
                <br />
              </div>
            </va-card>
          </div>
          <div class="actions">
            <div class="cancel vudal-btn">Close</div>
          </div>
        </vudal>
        <br />
        <div class="row">
          <div class="col-12">
            <va-card>
              <div v-if="this.isStatus == 8">
                <table class="table">
                  <tbody>
                    <tr>
                      <td style="width: 10%"><b>Remark</b></td>
                      <td style="width: 2%">:</td>
                      <td>
                        {{ isRemark }}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <va-separator></va-separator>
              </div>
              <form-wizard
                @on-complete="onComplete"
                color="#FF5050"
                error-color="#a94442"
                finish-button-text="Submit"
                ref="wizardForm"
              >
                <h3 slot="title"></h3>
                <tab-content
                  icon="fa fa-university"
                  title="1. Create Training Provider Profile"
                  :before-change="validateFirstTab"
                >
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
                  icon="fa fa-user"
                  title="2. CEO Profile"
                  :before-change="validateThirdTab"
                >
                  <br />
                  <vue-form-generator
                    :model="model"
                    :schema="thirdTabSchemaCEO"
                    :options="formOptions"
                    ref="thirdTabFormCEO"
                    @model-updated="onModelUpdated"
                  >
                  </vue-form-generator>
                  <br />
                </tab-content>
                <tab-content
                  icon="fa fa-file-text"
                  title="3. Upload Document"
                  :before-change="validate"
                >
                  <span>Form 49s</span>

                  <br />
                  <VueFileAgent
                    :uploadUrl="'https://example.com'"
                    :uploadHeaders="{}"
                    :multiple="false"
                    :deletable="true"
                    :editable="false"
                    :required="true"
                    :linkable="true"
                    :accept="'.pdf'"
                    :maxSize="'2MB'"
                    :maxFiles="8"
                    :helpText="'Select files'"
                    :errorText="{
                            type: 'Please select images, videos, pdf or zip files',
                            size: 'You selected a larger file!',
                          }"
                    :thumbnailSize="120"
                    :theme="'list'"
                    @select="filesSelected2($event)"
                    @beforedelete="onBeforeDelete2($event, 8)"
                    v-model="fileRecords"
                  ></VueFileAgent>
<!--                  <vue-form-generator-->
<!--                    :model="model"-->
<!--                    :schema="uploadSchema"-->
<!--                    :options="formOptions"-->
<!--                    ref="uploadForm"-->
<!--                    @model-updated="onModelUpdated"-->
<!--                  >-->
<!--                  </vue-form-generator>-->
                  <br />
                </tab-content>
                <br />
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
                  <div class="float-right">
                    <!-- <button
                    :disabled="model.TRP_PUBLISH_STATUS"
                    @click="submit(1)"
                    type="button"
                    class="btn btn-info btn-fill btn-md"
                  >
                    <i class="fa fa-edit" /> &nbsp;Save as Draft
                  </button> -->
                    <!-- <div
                      v-if="
                        this.isStatus == 3 &&
                        this.isStatus == 2 &&
                        this.isStatus == 15
                      "
                    > -->
                    <button
                      v-if="isLastStep"
                      @click="saveAsDraft"
                      type="button"
                      class="ml-2 btn btn-info btn-fill btn-md"
                    >
                      <i class="fa fa-pencil-square-o" /> &nbsp; Save as draft
                    </button>
                    <!-- </div> -->

                    <button
                      v-if="isLastStep"
                      @click="showmodal"
                      type="button"
                      class="ml-2 btn btn-warning btn-fill btn-md"
                    >
                      <i class="fa fa-play-circle" /> &nbsp;Preview
                    </button>
                    <button
                      v-if="!isLastStep"
                      @click="saveAsDraft"
                      type="button"
                      class="ml-2 btn btn-info btn-fill btn-md"
                    >
                      <i class="fa fa-pencil-square-o" /> &nbsp; Save as draft
                    </button>
                    <button
                      v-if="!isLastStep"
                      @click="nextTab"
                      type="button"
                      class="ml-2 btn btn-primary btn-fill btn-md"
                    >
                      Next &nbsp; <i class="fa fa-step-forward" />
                    </button>
                    <button
                      v-if="isLastStep"
                      @click="submitTrainingProvider"
                      type="button"
                      class="ml-2 btn btn-primary btn-fill btn-md"
                    >
                      Submit
                    </button>
                  </div>
                </template>
              </form-wizard>
            </va-card>
          </div>
        </div>
      </div>
    </div>
  </va-inner-loading>
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
import * as services06Module0 from "../../../app/module0/services06";
import * as services06Module1 from "../../../app/module1/services06";
import * as servicesModule5 from "../../../app/module5/services";
import * as services03Module5 from "../../../app/module5/services03";
import moment from "moment";
import { parse } from "vue-currency-input";

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
  watch: {
    "model.ssmForm9": function (value) {},
  },

  computed: {
    filteredData() {
      return this.directorList;
    },

    fieldsFile1() {
      return [
        {
          name: "__slot:marker",
          width: "30px",
          dataClass: "text-center",
        },
        {
          name: "__slot:no",
          title: "No",
          width: "30px",
        },
        {
          name: "REQ_DOCU_NAME", // "REQ_DOCU_NAME",
          title: "Name",
          width: "50%",
        },
        {
          name: "__slot:actions",
          title: "Choose File",
          // dataClass: "float-right"
        },
      ];
    },
    filteredDataFile1() {
      return this.uploadFileItems1;
    },

    fieldsFile2() {
      return [
        {
          name: "__slot:marker",
          width: "30px",
          dataClass: "text-center",
        },
        {
          name: "__slot:no",
          title: "No",
          width: "30px",
          // height: "45px"
          // dataClass: "text-center"
        },
        {
          name: "fileName",
          title: "Name",
          width: "50%",
        },
        {
          name: "__slot:actions",
          title: "Choose File",
          // dataClass: "float-right"
        },
      ];
    },
    filteredDataFile2() {
      return this.uploadFileItems2;
    },
    fieldsFile3() {
      return [
        {
          name: "__slot:marker",
          width: "30px",
          dataClass: "text-center",
        },
        {
          name: "__slot:no",
          title: "No",
          width: "30px",
          // height: "45px"
          // dataClass: "text-center"
        },
        {
          name: "fileName",
          title: "Name",
          width: "50%",
        },
        {
          name: "__slot:actions",
          title: "Choose File",
          // dataClass: "float-right"
        },
      ];
    },
    filteredDataFile3() {
      return this.uploadFileItems3;
    },
  },
  components: {
    Vudal,
    HorizontalScroll,
  },
  mounted() {
    this.getUserSalutation();
    this.getDefaultCountry();
    this.getCountry();
    this.getTRPRegData();
    // if ((this.isStatus = "8")) {
    //   alert("run this");
    //   this.getRemarkData();
    // } else {
    // }
    this.showStaticModal = false;
    this.statusLoad = false;
  },
  props: {
    value: File,
  },
  data() {
    return {
      statusLoad: true,
      isDraft: null,
      isStatus: null,
      isRemark: "-",
      showStaticModal: true,
      documentIdArray: [],
      uploadFileOject: [],
      companyLogo: "",
      ssmForm49: "",
      ssmForm9: "",
      BODApprove: "",
      receipt: "",
      file1: [],
      file2: [],
      file3: [],
      updateDistributor: false,
      pdfURL: "blob:http://localhost:8080/03ae069e-59ff-44ac-946a-e130c4fcd6e3",
      fileRecords: [],
      fileRecords2: [],
      fileRecords3: [],
      fileRecordsForUpload: [],
      fileRecordsForUpload2: [],
      fileRecordsForUpload3: [],

      uploadFileOject2: "",

      uploadUrl: "https://www.mocky.io/v2/5d4fb20b3000005c111099e3",
      uploadHeaders: {
        "X-Test-Header": "vue-file-agent",
      },
      state: [],
      country: [],
      options: [
        { label: "Training Provider Profile", value: 1 },
        { label: "CEO Profile", value: 2 },
        { label: "Uploaded Document", value: 3 },
      ],
      tabValue: 1,
      activePage: 4,
      activetab: 1,
      applicantPhoto: "",
      show: false,
      show_second: false,
      show_third: false,
      modalClass: "modal-90per",
      currentPage: 1,
      filter: null,
      showView: false,
      contactPersonValue: null,
      visibleIc: true,
      visiblePassport: false,
      visibleIcAAR: true,
      visiblePassportAAR: false,
      visiblePassportCEO: false,
      visibleIcCEO: true,
      visiblePassportOther: false,
      visibleIcOther: true,
      citizenship: [
        {
          name: "Malaysian",
          value: 1,
          selected: true,
        },
        {
          name: "Non Malaysian",
          value: 2,
        },
      ],
      postcode: [],
      city: [],
      states: "",
      setupType: [
        { value: 1, name: "Local" },
        { value: 2, name: "Non Local " },
      ],
      salutations: [],
      transType: [
        {
          name: "ONLINE TRANSACTION",
          value: 1,
        },
        {
          name: "CASH DEPOSIT",
          value: 2,
        },
      ],
      department: [],
      structureType: [
        { value: 1, name: "Single-tier" },
        { value: 2, name: "Multi-tier" },
      ],
      approachType: [
        { value: 1, name: "Direct" },
        { value: 2, name: "Nominee" },
      ],

      model: {
        file1: "",
        show1: true,
        //* *Particulars of Applicant (Corporate)*/
        TRP_PUBLISH_STATUS: "",
        companyLogo: [],
        DISTRIBUTOR_ID: "",
        TRP_NAME: "",
        TRP_REGI_NUM1: "",
        TRP_REGI_NUM2: "",
        TRP_DATE_INCORP: "",
        TRP_TYPE_SETUP: "1",
        TRP_PHONE_NUMBER: "",
        TRP_PHONE_EXTENSION: null,
        TRP_MOBILE_NUMBER: "",
        TRP_EMAIL: "",
        TRP_FAX_NUMBER: "",

        TRP_ADDR_1: "",
        TRP_ADDR_2: "",
        TRP_ADDR_3: "",
        TRP_POSTAL: "",
        TRP_COUNTRY: "",
        TRP_CITY: "",
        TRP_STATE: "",
        applicationType: null,

        //* * Ceo Detail */
        CEO_REPR_SALUTATION: "",
        CEO_REPR_NAME: "",
        CEO_REPR_POSITION: "",
        CEO_REPR_NRIC: "",
        CEO_REPR_PASS_NUM: "",
        CEO_REPR_PASS_EXP: null,
        CEO_REPR_CITIZEN: 1,
        CEO_REPR_TELEPHONE: "",
        CEO_REPR_MOBILE_NUMBER: "",
        CEO_REPR_EMAIL: "",

        ssmForm49: [],
      },
      formOptions: {
        // validationErrorClass: "has-error",
        // validationSuccessClass: "has-`success`",
        validateAfterChanged: true,
      },
      firstTabSchema: {
        groups: [
          {
            styleClasses: "row",
            // legend: "Create Company Profile",
            fields: [
              {
                type: "input",
                inputType: "text",
                label: "Training Provider Name",
                model: "TRP_NAME",
                placeholder: "Enter Training Provider name",
                required: true,
                validator: "string",
                styleClasses: "col-md-12",
              },
              {
                type: "input",
                inputType: "text",
                label: "Registration Number",
                model: "TRP_REGI_NUM1",
                placeholder: "Enter distributor registration number",
                required: true,
                validator: "string",
                styleClasses: "col-md-4",
              },
              {
                type: "input",
                inputType: "text",
                label: "New Registration Number",
                model: "TRP_REGI_NUM2",
                placeholder: "Enter new distributor registration number",
                required: true,
                validator: "string",
                styleClasses: "col-md-3",
              },
              {
                type: "radios",
                label: "Training Provider Type",
                model: "TRP_TYPE_SETUP",
                required: true,
                validator: "required",
                styleClasses: "col-md-3 display-inline",
                values: () => {
                  return this.setupType;
                },
              },

              {
                type: "input",
                inputType: "text",
                label: "Address",
                model: "TRP_ADDR_1",
                placeholder: "Enter street address",
                hint: "Street Address",
                required: true,
                validator: "string",
                styleClasses: "col-md-12",
              },
              {
                type: "input",
                inputType: "text",
                model: "TRP_ADDR_2",
                placeholder: "Enter street address",
                hint: "Street Address line 2",
                styleClasses: "col-md-12",
              },
              {
                type: "input",
                inputType: "text",
                model: "TRP_ADDR_3",
                placeholder: "Enter street address",
                hint: "Street Address line 3",
                styleClasses: "col-md-12",
              },
              {
                type: "vueMultiSelect",
                model: "TRP_COUNTRY",
                label: "Country",
                placeholder: "Enter Your Country",
                required: true,
                validator: "required",
                styleClasses: "col-md-6",
                selectOptions: {
                  multiple: false,
                  key: "SET_PARAM",
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
                model: "TRP_STATE",
                placeholder: "Enter Your State",
                styleClasses: "col-md-6",
                required: true,
                validator: "required",
                // visible: (model, field, form) => {
                //   return model.TRP_COUNTRY.SET_CODE != "MY";
                // }
              },
              // {
              //   type: "vueMultiSelect",
              //   model: "TRP_STATE",
              //   label: "State",
              //   placeholder: "Select Your state",
              //   required: true,
              //   validator: "required",
              //   styleClasses: "col-md-6",
              //   selectOptions: {
              //     multiple: false,
              //     key: "SET_PARAM",
              //     label: "SET_PARAM",
              //     searchable: true
              //   },
              //   // visible: (model, field, form) => {
              //   //   return model.TRP_COUNTRY.SET_CODE == "MY";
              //   // },
              //   values: (model, schema) => {
              //     return this.state;
              //   }
              // },
              // {
              //   type: "vueMultiSelect",
              //   model: "TRP_CITY",
              //   label: "City",
              //   placeholder: "Enter Your City",
              //   required: true,
              //   validator: "required",
              //   styleClasses: "col-md-6",
              //   selectOptions: {
              //     multiple: false,
              //     key: "SET_CITY_NAME",
              //     label: "SET_CITY_NAME",
              //     searchable: true
              //   },
              //   visible: (model, field, form) => {
              //     return model.TRP_COUNTRY.SET_CODE == "MY";
              //   },
              //   values: (model, schema) => {
              //     return this.city;
              //   }
              // },
              {
                label: "City",
                type: "input",
                inputType: "text",
                model: "TRP_CITY",
                placeholder: "Enter Your City",
                styleClasses: "col-md-6",
                required: true,
                validator: "required",
                // visible: (model, field, form) => {
                //   return model.TRP_COUNTRY.SET_CODE != "MY";
                // }
              },
              {
                label: "Postcode",
                type: "input",
                inputType: "text",
                model: "TRP_POSTAL",
                placeholder: "Enter Your Postcode",
                styleClasses: "col-md-6",
                required: true,
                validator: "required",
                // visible: (model, field, form) => {
                //   return model.TRP_COUNTRY.SET_CODE != "MY";
                // }
              },
              // {
              //   type: "vueMultiSelect",
              //   model: "TRP_POSTAL",
              //   label: "Postcode",
              //   placeholder: "Enter Your Postcode",
              //   required: true,
              //   validator: "required",
              //   styleClasses: "col-md-6",
              //   visible: (model, field, form) => {
              //     return model.TRP_COUNTRY.SET_CODE == "MY";
              //   },
              //   selectOptions: {
              //     multiple: false,
              //     key: "POSTCODE_NO",
              //     label: "POSTCODE_NO",
              //     searchable: true
              //   },
              //   values: (model, schema) => {
              //     return this.postcode;
              //   }
              // },
              {
                labels: "Mobile Phone Number",
                model: "TRP_COMPANY_MOBILE_NO",
                type: "vfg-the-mask",
                placeholder: "Enter telephone number",
                mask: "01#-########",
                styleClasses: "col-md-6",
                required: true,
                validator: "string",
              },
              {
                type: "vfg-the-mask",
                inputType: "text",
                mask: "0#-########",
                labels: "Fax Number",
                model: "TRP_FAX_NUMBER",
                placeholder: "Enter fax number",
                required: false,
                styleClasses: "col-md-6",
              },
              {
                type: "input",
                inputType: "email",
                label: "Email Address",
                model: "TRP_EMAIL",
                placeholder: "Enter email address",
                required: true,
                validator: "string",
                styleClasses: "col-md-6",
              },
            ],
          },
        ],
      },
      thirdTabSchemaCEO: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "vueMultiSelect",
                model: "CEO_REPR_SALUTATION",
                label: "Salutation",
                placeholder: "Enter Your Salutation",
                required: true,
                validator: "required",
                styleClasses: "col-md-3",
                selectOptions: {
                  multiple: false,
                  key: "SETTING_GENERAL_ID",
                  label: "SET_PARAM",
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.salutations;
                },
              },
              {
                type: "input",
                inputType: "text",
                label: "Name",
                model: "CEO_REPR_NAME",
                placeholder: "Please enter name",
                required: true,
                validator: "string",
                styleClasses: "col-md-9",
              },
              {
                type: "input",
                inputType: "text",
                label: "Position",
                model: "CEO_REPR_POSITION",
                placeholder: "Enter position",
                required: true,
                validator: "string",
                styleClasses: "col-md-12",
              },
              {
                type: "radios",
                label: "Citizenship",
                model: "CEO_REPR_CITIZEN",
                values: () => {
                  return this.citizenship;
                },
                styleClasses: "col-md-3 display-inline",
                required: true,
                validator: "required",
              },
              {
                type: "vfg-the-mask",
                inputType: "text",
                mask: "######-##-####",
                labels: "NRIC No",
                model: "CEO_REPR_NRIC",
                placeholder: "Enter NRIC No.",
                required: true,
                validator: ["required", this.validateIC],
                styleClasses: "col-md-9",
                visible: (model, field, form) => {
                  return model.CEO_REPR_CITIZEN == 1;
                },
              },
              {
                type: "input",
                inputType: "text",
                label: "Passport No.",
                model: "CEO_REPR_PASS_NUM",
                placeholder: "Enter Passport No.",
                required: true,
                validator: "string",
                styleClasses: "col-md-5",
                visible: (model, field, form) => {
                  return model.CEO_REPR_CITIZEN == 2;
                },
              },
              {
                labels: "Passport Expiry Date",
                type: "vfg-functional-date",
                placeholder: "Passport Expiry Date",
                model: "CEO_REPR_PASS_EXP",
                noLabel: true,
                noClearButton: true,
                format: "dd-MM-yyyy",
                styleClasses: "col-md-4",
                visible: (model, field, form) => {
                  return model.CEO_REPR_CITIZEN == 2;
                },
                required: true,
                validator: "required",
              },
              {
                labels: "Telephone Number",
                model: "CEO_REPR_MOBILE_NUMBER",
                type: "vfg-the-mask",
                placeholder: "Enter telephone number",
                mask: "01#-########",
                styleClasses: "col-md-6",
                required: true,
                validator: "string",
              },
              {
                type: "input",
                inputType: "email",
                label: "Email Address",
                model: "CEO_REPR_EMAIL",
                placeholder: "Enter email address",
                required: true,
                validator: "string",
                styleClasses: "col-md-6",
              },
            ],
          },
        ],
      },
      uploadSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                // accept: ".pdf,.xlsx,.xls",
                // multiple: false,
                // text: "Choose a File",
                // model: "ssmForm49",
                // type: "vfg-custom-file",
                // styleClasses: "col-md-12",

                labels: "Form 49",
                text: "Choose a File",
                model: "ssmForm49",
                type: "vfg-custom-file",
                styleClasses: "col-md-12",
              },
            ],
          },
        ],
      },
      previewUploadSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                accept: ".pdf,.xlsx,.xls",
                multiple: false,
                text: "Choose a File",
                model: "ssmForm49",
                type: "vfg-custom-file",
                styleClasses: "col-md-12",
              },
            ],
          },
        ],
      },

      declarationSchema: {
        groups: [
          {
            styleClasses: ["row col"],
            legend: "",
            fields: [
              {
                type: "checkbox",
                model: "AI_term1",
                default: false,
                // required: true,
                // validator: "required",
                styleClasses: "col-sm-1 mt-1",
              },
              {
                type: "label",
                label:
                  "We agree to abide by the applicable Terms and Conditions  of use for this system and relevant laws and rules issued by FIMM.",
                // validator: "required",
                styleClasses: "col-sm-11",
              },
            ],
          },
          {
            styleClasses: ["row col"],
            legend: "",
            fields: [
              {
                type: "checkbox",
                model: "AI_term2",
                default: false,
                // required: true,
                // validator: "required",
                styleClasses: "col-sm-1 mt-1",
              },
              {
                type: "label",
                label:
                  "We hereby confirm that the information given herein and in any other document provided by us for purposes of our application and registration with FIMM is true and accurate.",
                // validator: "required",
                styleClasses: "col-sm-11",
              },
            ],
          },
          {
            styleClasses: ["row col"],
            legend: "",
            fields: [
              {
                type: "checkbox",
                model: "AI_term3",
                default: false,
                required: true,
                // validator: "required",
                styleClasses: "col-sm-1 mt-1",
              },
              {
                type: "label",
                label:
                  "Further, we hereby confirm and under take to ensure that, pursuant to the Personal Data Protection Act 2010, we have the consent of our officers, employees and unit trust consultants for the disclosure to and use by FIMM of their personal data.",
                // validator: "required",
                styleClasses: "col-sm-11",
              },
            ],
          },
        ],
      },

    };
  },
  methods: {
    filesSelected2: function (fileRecordsNewlySelected) {
      // alert(docId)
      // this.docIdArray.push(docId);

      // this.uploadFileOject2 = [];
      // this.uploadFileOjectId.push(docId);
      var validFileRecords = fileRecordsNewlySelected.filter(
        (fileRecord) => !fileRecord.error
      );
      this.fileRecordsForUpload =
        this.fileRecordsForUpload.concat(validFileRecords);
      var i;
      for (i = 0; i < this.fileRecordsForUpload.length; i++) {
        this.uploadFileOject2 = this.fileRecordsForUpload[i].file;
        // var data = {

        // alert(this.docIdArray[i])
        //   docId: docId,
        //   file: this.fileRecordsForUpload[i].file
        // };

        // this.uploadFileOject[i]['docId'] = this.docIdArray[i];
        // this.uploadFileOject[i]['file'] = this.fileRecordsForUpload[i].file;

        //  this.uploadFileOject.push(data);
        // this.uploadFileOject.push({docId:this.fileRecordsForUpload[i].file})
        //  this.uploadFileOjectId.push(this.docIdArray[i]);
        // this.uploadFileOject2.push(this.fileRecordsForUpload[i].file);
      }
    },
    onBeforeDelete2: function (fileRecord, group) {
      //alert(fileRecordsForUpload);
      this.fileDeleted = [];
      this.fileDeleted.push(group);
    },
    showOverlay(show) {
      Event.$emit("trp-register:overlay", show);
    },
    getBlobFile: function (fileRecords) {},
    b64toBlobPDF(b64Data, contentType, sliceSize) {
      contentType = contentType || "";
      sliceSize = sliceSize || 512;

      var byteCharacters = atob(b64Data);
      var byteArrays = [];

      for (
        var offset = 0;
        offset < byteCharacters.length;
        offset += sliceSize
      ) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
      }

      console.log(byteArrays);

      return new File(byteArrays, "pot", { type: contentType });
    },
    deleteUploadedFile: function (fileRecord) {
      // Using the default uploader. You may use another uploader instead.
      this.uploadFileOject = [];
      this.$refs.vueFileAgent.deleteUpload(
        this.uploadUrl,
        this.uploadHeaders,
        fileRecord
      );
      var i;
      for (i = 0; i < this.fileRecordsForUpload.length; i++) {
        this.uploadFileOject.push(this.fileRecordsForUpload[i].file);
      }
    },
    filesSelected: function (fileRecordsNewlySelected, fileRecords, docId) {
      this.uploadFileOject = [];
      this.uploadFileOjectId.push(docId);
      var validFileRecords = fileRecordsNewlySelected.filter(
        (fileRecord) => !fileRecord.error
      );
      this.fileRecordsForUpload =
        this.fileRecordsForUpload.concat(validFileRecords);
      var i;
      for (i = 0; i < this.fileRecordsForUpload.length; i++) {
        this.uploadFileOject.push(this.fileRecordsForUpload[i].file);
      }
    },
    onBeforeDelete: function (fileRecord, fileRecords, docId) {
      this.fileDeleted = [];
      this.fileDeleted.push(docId);
    },
    fileDeleted: function (fileRecord, fileRecords, docId) {
      var i = this.fileRecordsForUpload.indexOf(fileRecord);
      if (i !== -1) {
        this.fileRecordsForUpload.splice(i, 1);
      } else {
        this.deleteUploadedFile(fileRecord);
      }
    },
    async submitTrainingProvider() {
      if (!this.$refs.firstTabForm.validate()) {
        if (!this.$refs.thirdTabFormCEO.validate()) {
          if (!this.$refs.uploadForm.validate()) {
          } else {
            // alert("submit");
            this.submit(2);
          }
        } else {
          //alert("submit");
          this.submit(2);
        }
      } else {
        // alert("submit");
        this.submit(2);
      }
    },
    dataURItoBlob(dataurl, filename) {
      var arr = dataurl.split(",");
      var mime = arr[0].match(/:(.*?);/)[1];
      var bstr = atob(arr[1]);
      var n = bstr.length;
      var u8arr = new Uint8Array(n);

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }

      return new File([u8arr], filename, { type: mime });
    },
    async getUserSalutation() {
      const response = await servicesModule5.getUserSalutation();
      this.salutations = response;
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
    async getApplicationType() {
      console.log("app type");
      const response = await services06Module0.getApplicationType();
      this.applicationType = response;
    },
    async getCountry() {
      const response = await servicesModule5.getAllCountryList();
      this.country = response;
      // this.getState(this.country.SETTING_GENERAL_ID);
    },
    async getCity(data) {
      const response = await services06Module0.getCity(data);
      this.city = response;
    },
    async getPostcode(data) {
      const response = await services06Module0.getPostcode(data);
      this.postcode = response;
    },
    async getDefaultCountry() {
      try {
        const response = await services06Module0.getDefaultCountry();
        this.TRP_COUNTRY = response;
      } catch (error) {
        console.log(error);
      }
    },
    async getTRPRegStatus() {
      try {
        const user = localStorage.getItem("user");

        var USER_ID = JSON.parse(user).user_id;
        const response = await services03Module5.getTRPRegStatus(USER_ID);
        console.log(JSON.stringify(response));
        this.isStatus = response.TS_ID;
      } catch (error) {
        console.log(error);
      }
    },
    async getTRPRegDraft() {
      try {
        const user = localStorage.getItem("user");

        var USER_ID = JSON.parse(user).user_id;
        const response = await services03Module5.getTRPRegDraft(USER_ID);
        console.log(JSON.stringify(response));
        this.isDraft = response.TS_ID;
      } catch (error) {
        console.log(error);
      }
    },
    async getRemarkData() {
      alert("run here ");

      const user = localStorage.getItem("user");

      var USER_ID = JSON.parse(user).user_id;
      const getRemark = await services03Module5.getTRPRemark(USER_ID);
      this.isRemark = getRemark.APPR_REMARK;
    },
    async getTRPRegData() {
      try {
        const user = localStorage.getItem("user");

        var USER_ID = JSON.parse(user).user_id;
        const response = await services03Module5.getTRPRegData(USER_ID);
        console.log(JSON.stringify(response));
        //page1
        this.isStatus = response.TS_ID;

        // Document for FORM 49
        response.DOCU_BLOB = this.b64toBlobPDF(
          response.DOCU_BLOB,
          response.DOCU_MIMETYPE
        );
        // console.log("mula");
        // console.log(element.DOCU_BLOB); // <----- cuba tgk ini
        // console.log("habis");
        response.DOCU_BLOB = new File(
          [response.DOCU_BLOB],
          response.DOCU_ORIGINAL_NAME + "." + response.DOCU_FILETYPE,
          { type: response.DOCU_BLOB.type }
        );
        //console.log(element.DOCU_BLOB);
        const data = {
          docID:response.DIST_DOCU_ID,
          name: response.DOCU_ORIGINAL_NAME + "." + response.DOCU_FILETYPE,
          size: response.DOCU_FILESIZE,
          type: response.DOCU_FILETYPE,
          ext: "exe",
          url: window.URL.createObjectURL(response.DOCU_BLOB),
        };
        //console.log("data blob : " + data);

        this.fileRecords = [];
        this.fileRecords.push(data);


        this.model.TRP_NAME = response.TP_NAME;
        this.model.TRP_REGI_NUM1 = response.TP_REG_NO;
        this.model.TRP_REGI_NUM2 = response.TP_NEW_REG_NO;
        this.model.TRP_TYPE_SETUP = response.TP_TYPE;
        this.model.TRP_ADDR_1 = response.TP_ADDRESS_1;
        this.model.TRP_ADDR_2 = response.TP_ADDRESS_2;
        this.model.TRP_ADDR_3 = response.TP_ADDRESS_3;
        this.model.TRP_COUNTRY = {
          SETTING_GENERAL_ID: response.COUNTRY_ID,
          SET_CODE: response.SET_CODE_COUNTRY,
          SET_PARAM: response.SET_PARAM_COUNTRY,
        };
        this.model.TRP_STATE = response.TP_STATE;
        this.model.TRP_CITY = response.TP_CITY;
        this.model.TRP_POSTAL = response.TP_POSTCODE;
        this.model.TRP_COMPANY_MOBILE_NO = response.TP_COMPANY_MOBILE_NO;
        this.model.TRP_FAX_NUMBER = response.TP_FAX_NO;
        this.model.TRP_EMAIL = response.TP_EMAIL;
        //page 2
        // this.model.CEO_REPR_SALUTATION.USER_SAL_ID =
        this.model.CEO_REPR_SALUTATION = {
          SETTING_GENERAL_ID: response.USER_SAL_ID,
          SET_PARAM: response.USER_SAL_NAME,
        };
        this.model.CEO_REPR_NAME = response.TP_CEO_NAME;
        this.model.CEO_REPR_POSITION = response.TP_CEO_POSITION;
        this.model.CEO_REPR_NRIC = response.TP_CEO_NRIC;
        this.model.CEO_REPR_PASS_NUM = response.TP_CEO_PASSPORT_NO;
        this.model.CEO_REPR_PASS_EXP = response.TP_CEO_PASSPORT_EXPIRY;
        this.model.CEO_REPR_MOBILE_NUMBER = response.TP_CEO_MOBILE;
        this.model.CEO_REPR_EMAIL = response.TP_CEO_EMAIL;
        this.model.CEO_REPR_CITIZEN.value = response.TP_CEO_CITIZENSHIP;
        if ((response.TS_ID = "8")) {
          const getRemark = await services03Module5.getTRPRemark(
            JSON.stringify(response.TP_USER_COMP_ID)
          );
          this.isRemark = getRemark.APPR_REMARK;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async saveAsDraft() {
      const vm = this;
      const data = new FormData();
      const user = localStorage.getItem("user");

      data.append("USER_ID", JSON.parse(user).user_id);
      data.append("TRP_NAME", this.model.TRP_NAME);
      data.append("TRP_REGI_NUM1", this.model.TRP_REGI_NUM1);
      data.append("TRP_REGI_NUM2", this.model.TRP_REGI_NUM2);
      data.append("TRP_TYPE_SETUP", this.model.TRP_TYPE_SETUP);
      data.append("TRP_ADDR_1", this.model.TRP_ADDR_1);
      data.append("TRP_ADDR_2", this.model.TRP_ADDR_2);
      data.append("TRP_ADDR_3", this.model.TRP_ADDR_3);
      data.append("TRP_COUNTRY", this.model.TRP_COUNTRY.SETTING_GENERAL_ID);
      data.append("TRP_STATE", this.model.TRP_STATE);
      data.append("TRP_CITY", this.model.TRP_CITY);
      data.append("TRP_POSTAL", this.model.TRP_POSTAL);
      data.append("TRP_COMPANY_MOBILE_NO", this.model.TRP_COMPANY_MOBILE_NO);
      data.append("TRP_FAX_NUMBER", this.model.TRP_FAX_NUMBER);
      data.append("TRP_EMAIL", this.model.TRP_EMAIL);
      this.model.CEO_REPR_SALUTATION != ""
        ? data.append(
            "CEO_REPR_SALUTATION",
            this.model.CEO_REPR_SALUTATION.SET_PARAM
          )
        : null;
      data.append("CEO_REPR_NAME", this.model.CEO_REPR_NAME);
      data.append("CEO_REPR_POSITION", this.model.CEO_REPR_POSITION);
      data.append("CEO_REPR_CITIZEN", this.model.CEO_REPR_CITIZEN);
      data.append("CEO_REPR_NRIC", this.model.CEO_REPR_NRIC);
      data.append("CEO_REPR_PASS_NUM", this.model.CEO_REPR_PASS_NUM);
      data.append("CEO_REPR_PASS_EXP", this.model.CEO_REPR_PASS_EXP);
      data.append("CEO_REPR_MOBILE_NUMBER", this.model.CEO_REPR_MOBILE_NUMBER);
      data.append("CEO_REPR_EMAIL", this.model.CEO_REPR_EMAIL);
      // if (this.model.ssmForm49.length != 0) {
      //   for (let i = 0; i < this.model.ssmForm49.length; i++) {
      //     data.append("file1[]", this.model.ssmForm49[i]);
      //   }
      // }
      // data.append('SSMFORM49',this.model.ssmForm49);
      data.append("SSMFORM49", this.uploadFileOject2);

      data.append("IS_DRAFT", 1);
      data.append("IS_STATUS", this.isStatus);
      try {
        if (confirm("Are you sure you want to save as draft?")) {
          const response = await services03Module5.createTRPProfile(data);
          this.getTRPRegData();
          // alert("This submission has been save as draft.");
        }
      } catch (error) {
        console.log(error);
      }
    },
    async submit(status) {
      // alert(JSON.stringify(this.model.companyLogo));
      const vm = this;
      const data = new FormData();
      if (confirm("Submit this registration ?")) {
        // vm.showOverlay(true);
        // vm.showOverlay(false);
        // vm.showStaticModal = true;
        const user = localStorage.getItem("user");

        data.append("USER_ID", JSON.parse(user).user_id);
        data.append("TRP_NAME", this.model.TRP_NAME);
        data.append("TRP_REGI_NUM1", this.model.TRP_REGI_NUM1);
        data.append("TRP_REGI_NUM2", this.model.TRP_REGI_NUM2);
        data.append("TRP_TYPE_SETUP", this.model.TRP_TYPE_SETUP);
        data.append("TRP_ADDR_1", this.model.TRP_ADDR_1);
        data.append("TRP_ADDR_2", this.model.TRP_ADDR_2);
        data.append("TRP_ADDR_3", this.model.TRP_ADDR_3);
        data.append("TRP_COUNTRY", this.model.TRP_COUNTRY.SETTING_GENERAL_ID);
        data.append("TRP_STATE", this.model.TRP_STATE);
        data.append("TRP_CITY", this.model.TRP_CITY);
        data.append("TRP_POSTAL", this.model.TRP_POSTAL);
        data.append("TRP_COMPANY_MOBILE_NO", this.model.TRP_COMPANY_MOBILE_NO);
        data.append("TRP_FAX_NUMBER", this.model.TRP_FAX_NUMBER);
        data.append("TRP_EMAIL", this.model.TRP_EMAIL);
        this.model.CEO_REPR_SALUTATION != ""
          ? data.append(
              "CEO_REPR_SALUTATION",
              this.model.CEO_REPR_SALUTATION.SET_PARAM
            )
          : null;
        data.append("CEO_REPR_NAME", this.model.CEO_REPR_NAME);
        data.append("CEO_REPR_POSITION", this.model.CEO_REPR_POSITION);
        data.append("CEO_REPR_CITIZEN", this.model.CEO_REPR_CITIZEN);
        data.append("CEO_REPR_NRIC", this.model.CEO_REPR_NRIC);
        data.append("CEO_REPR_PASS_NUM", this.model.CEO_REPR_PASS_NUM);
        data.append("CEO_REPR_PASS_EXP", this.model.CEO_REPR_PASS_EXP);
        data.append(
          "CEO_REPR_MOBILE_NUMBER",
          this.model.CEO_REPR_MOBILE_NUMBER
        );
        data.append("CEO_REPR_EMAIL", this.model.CEO_REPR_EMAIL);
        // if (this.model.file1.length != 0) {
        //   for (let i = 0; i < this.model.file1.length; i++) {
        //     data.append("file1[]", this.model.file1[i]);
        //   }
        // }

        // data.append('SSMFORM49',this.model.ssmForm49);
        data.append("SSMFORM49", this.uploadFileOject2);

        data.append("IS_DRAFT", 2);
        data.append("IS_STATUS", this.isStatus);
        try {
          const response = await services03Module5.createTRPProfile(data);
          alert("Your application have been sent, You will received notification from FIMM for approval");
          // this.$router.push({ name: "dashboard" });
          // this.$router.go(-1);
          localStorage.removeItem('realmName')
          localStorage.removeItem('user')
          this.$router.go(-1);

          // window.location.href="/auth-others/login-others"

        } catch (error) {
          console.log(error);
        }
      } else {
      }
    },
    showmodal() {
      this.$modals.simpleModal.$show();
    },
    uploadFile() {
      // console.log(this.$refs.file.files[0]);
      if (this.$refs.file.files[0] !== undefined) {
        this.showView = true;
      } else {
        this.showView = false;
      }
    },

    validateIC(value) {
      const expression1 = /^[0-9]+$/;

      console.log(expression1.test(value));
      if (!expression1.test(value)) {
        return ["Ic must contain number only"];
      }
    },
    onModelUpdated(newVal, schema) {
      console.log("modell : ");

      console.log(newVal);
      if (schema === "AR_citizenship") {
        if (newVal === 1) {
          this.visiblePassport = false;
          this.visibleIc = true;
        } else {
          this.visiblePassport = true;
          this.visibleIc = false;
        }
      } else if (schema === "AAR_citizenship") {
        if (newVal === 1) {
          this.visiblePassportAAR = false;
          this.visibleIcAAR = true;
        } else {
          this.visiblePassportAAR = true;
          this.visibleIcAAR = false;
        }
      } else if (schema === "AI_contactPerson") {
        console.log("valuee :" + newVal);
        if (newVal != null) {
          this.contactPersonValue = newVal.value;
        } else {
          this.contactPersonValue = null;
        }
      } else if (schema === "CEO_REPR_CITIZEN") {
        if (newVal === 1) {
          this.visiblePassportCEO = false;
          this.visibleIcCEO = true;
        } else {
          this.visiblePassportCEO = true;
          this.visibleIcCEO = false;
        }
      } else if (schema === "Other_citizenship") {
        if (newVal === 1) {
          this.visiblePassportOther = false;
          this.visibleIcOther = true;
        } else {
          this.visiblePassportOther = true;
          this.visibleIcOther = false;
        }
      } else if (schema === "TRP_COUNTRY") {
        // s
      } else if (schema === "TRP_POSTAL") {
        // this.model.city = null;
        //  this.model.state = null;
        // if (this.model.TRP_COUNTRY.SET_CODE === "MY") {
        //   this.getCity(this.model.TRP_POSTAL.SETTING_CITY_ID);
        // }
      } else if (schema === "TRP_CITY") {
        // if (this.model.TRP_COUNTRY.SET_CODE === "MY") {
        //   this.getPostcode(this.model.TRP_CITY.SETTING_CITY_ID);
        // }
      } else if (schema === "TRP_STATE") {
        // this.model.city = null;
        // if (this.model.TRP_COUNTRY.SET_CODE === "MY") {
        //   this.getCity(this.model.TRP_STATE.SETTING_GENERAL_ID);
        // }
      } else if (schema == "fileRecordsForUpload") {
        console.log("custom upload");
        console.log(this.model.fileRecordsForUpload);
      } else if (schema == "TRP_NAME") {
        this.model.TRP_NAME = String(newVal).toUpperCase();
      } else if (schema == "TRP_REGI_NUM1") {
        this.model.TRP_REGI_NUM1 = String(newVal).toUpperCase();
      } else if (schema == "TRP_REGI_NUM2") {
        this.model.TRP_REGI_NUM2 = String(newVal).toUpperCase();
      } else if (schema == "CEO_REPR_NAME") {
        this.model.CEO_REPR_NAME = String(newVal).toUpperCase();
      } else if (schema == "CEO_REPR_POSITION") {
        this.model.CEO_REPR_POSITION = String(newVal).toUpperCase();
      }
    },
    handleFileChange(e) {
      this.$emit("input", e.target.files[0]);
      this.fileName1 = e.target.files[0].name;
      console.log(e.target.files[0].name);
    },
    onComplete() {
      alert(JSON.stringify(this.model));
    },
    validatePassword(value) {
      //* * must contain letter only (lowercase and uppercase) */
      const expression1 = /^[a-zA-Z]+$/;
      // eslint-disable-next-line no-unused-vars
      const expression2 = /^[a-zA-Z]*[A-Z]+[a-zA-Z]*$/;
      //* * must contain at least one uppercase letter, one lower case letter and one number */
      // eslint-disable-next-line no-unused-vars
      const expression4 = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]+)$/;
      //* * must contain at least one uppercase letter, one lower case letter, one number and one character */
      // eslint-disable-next-line no-unused-vars
      const expression5 =
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*?[#?!@$%^&*-])([a-zA-Z0-9#?!@$%^&*-]+)$/;
      //* * must contain at least one uppercase letter, one lower case letter, one number and one character with minimum length*/
      // eslint-disable-next-line no-unused-vars
      const expression6 =
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*?[#?!@$%^&*-])([a-zA-Z0-9#?!@$%^&*-]+).{8}$/;

      console.log(expression1.test(value));
      if (!expression1.test(value)) {
        this.passwordStrength = "";
        return ["Password must contain letter only"];
      }
    },
    isEqualTo(value, field, model) {
      // eslint-disable-next-line no-undef
      if (!_.has(field, "equals")) return ["Confirm password is required"];
      // eslint-disable-next-line no-undef
      const a = _.get(model, _.get(field, "equals"));
      const b = value;
      // eslint-disable-next-line no-undef
      if (_.isEqual(a, b)) return [];
      return ["Password do not match"];
    },
    validateFirstTab() {
      return this.$refs.firstTabForm.validate();
    },
    validateThirdTab: function () {
      return this.$refs.thirdTabFormCEO.validate();
    },
    validateFourthTab() {
      return this.$refs.uploadForm.validate();
    },
    validateFifthTab() {
      return this.$refs.fifthTabForm.validate();
    },
  },
};
</script>
<!-- New step!
     Add Multiselect CSS. Can be added as a static asset or inside a component. -->
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="scss" scoped>
.l2 {
  display: block;
  width: 100%;
  max-width: 100%;
  padding: 0;
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
  line-height: inherit;
  color: inherit;
  white-space: normal;
}
.display-inline label {
  display: inline !important;
  padding: 5px;
}
.app-layout__main {
  background: #e8e8e8;
}
.container {
  max-width: 620px;
  min-width: 420px;
  margin: 40px auto;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.9em;
  color: #888;
}

/* Style the tabs */
.tabs {
  overflow: hidden;
  margin-left: 20px;
  margin-bottom: -2px; // hide bottom border
}

.tabs ul {
  list-style-type: none;
  margin-left: 20px;
}

.tabs a {
  float: left;
  cursor: pointer;
  padding: 12px 24px;
  transition: background-color 0.2s;
  border: 1px solid #ccc;
  border-right: none;
  background-color: #f1f1f1;
  border-radius: 10px 10px 0 0;
  font-weight: bold;
}
.tabs a:last-child {
  border-right: 1px solid #ccc;
}

/* Change background color of tabs on hover */
.tabs a:hover {
  background-color: #aaa;
  color: #fff;
}

/* Styling for active tab */
.tabs a.active {
  background-color: #fff;
  color: #484848;
  border-bottom: 2px solid #fff;
  cursor: default;
}

/* Style the tab content */
.tabcontent {
  padding: 30px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 3px 3px 6px #e1e1e1;
}
</style>
<style scoped>
.widthModal {
  width: 80%;
}
.width {
  width: 100%;
}
.widthName {
  width: 5%;
}
</style>

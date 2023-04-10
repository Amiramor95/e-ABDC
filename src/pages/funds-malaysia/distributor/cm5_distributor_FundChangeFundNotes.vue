<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <vudal name="showStaticModalOK" class="widthModal">
            <div class="content">
              <p>
                Your submission has been submitted, please wait for approval.
              </p>
              <div class="actions">
                <button
                  type="button"
                  class="cancel vudal-btn mr-2 btn btn-primary btn-fill btn-md"
                >
                  <i class="fa fa-edit" /> &nbsp; Ok
                </button>
              </div>
            </div>
          </vudal>
          <vudal name="showStaticModalSaveAsDraft" class="widthModal">
            <div class="content">
              <p>Your submission has been save as draft.</p>
              <div class="actions">
                <button
                  type="button"
                  class="cancel vudal-btn mr-2 btn btn-primary btn-fill btn-md"
                >
                  <i class="fa fa-edit" /> &nbsp; Ok
                </button>
              </div>
            </div>
          </vudal>
          <vudal name="showStaticModal" class="widthModal">
            <div class="content">
              <vue-form-generator
                :model="model"
                :schema="declarationSchema"
                :options="formOptions"
                ref="declarationRef"
                @model-updated="onModelUpdated"
              ></vue-form-generator>
            </div>
            <div class="actions">
              <button
                type="button"
                class="cancel vudal-btn mr-2 btn btn-danger btn-fill btn-md"
              >
                <i class="fa fa-times" /> &nbsp; Disagree
              </button>
              <button
                @click="submitDistributor"
                type="button"
                class="vudal-btn mr-2 btn btn-success btn-fill btn-md"
              >
                <i class="fa fa-edit" /> &nbsp; Agree
              </button>
            </div>
          </vudal>
          <va-card>
            <h4 slot="header" class="card-title">Fund Management</h4>
            <br />
            <div>
              <vue-form-generator
                v-if="newFund == true"
                :model="model"
                :schema="schemaUmbrellaFund"
                :options="formOptions"
                @model-updated="onModelUpdated"
                ref="dropdownformUmbrellaFund"
              >
              </vue-form-generator>
            </div>
            <va-separator></va-separator>
            <div>
              <!-- Tabs with card integration -->

              <b-tabs
                v-if="
                  ((newFund == false || newFund == true) &&
                    model.selectedUmbrellaFund != null) ||
                  model.inputUmbrellaFund != null ||
                  model.setVisibleUmbrellaFund == true ||
                  model.selectedFund != null
                "
                v-model="tabIndex"
                content-class="mt-3"
                v-on:activate-tab="tabActivated"
                ref="tabs"
              >
                <b-tab v-on:click="tabIndex == 0" title="Fund Notes">
                  <br />
                  <div>
                    <div
                      class="col-md-12 mb-3"
                      v-for="(fundnote, eindex) in fundNotes"
                      :key="eindex"
                    >
                      <b-form-group
                        label-for="highest-education"
                        description=""
                        class="required"
                      >
                        <label v-if="eindex == 0"
                          >Fund Notes: <span class="text-danger">*</span></label
                        >
                        <label v-else>Fund Notes:</label>
                        <b-form-select
                          id="highest-education"
                          v-model="fundnote.FUNDNOTES_ID"
                          class="form-group bgcolor mb-0"
                          placeholder="Select Fund Notes"
                        >
                          <template>
                            <option
                              v-for="fundnotes in FundNoteList"
                              v-bind:key="fundnotes.FUNDNOTES_ID"
                              :value="fundnotes.FUNDNOTES_ID"
                            >
                              {{ fundnotes.FUNDNOTES_DESC }}
                            </option>
                          </template>
                        </b-form-select>
                        <div class="row mt-3" v-if="fundnote.FUNDNOTES_ID == 6">
                          <b-form-group
                            class="required col-md-6"
                            id="fieldset-degree-major"
                            label="Date 1"
                            label-for="input-degree-major"
                          >
                            <b-form-datepicker
                              id="datepicker1"
                              v-model="fundnote.DATE1"
                              class="mb-2"
                            ></b-form-datepicker>
                          </b-form-group>

                          <b-form-group
                            class="required col-md-6"
                            id="fieldset-degree-minor"
                            label="Date 2"
                            label-for="input-degree-minor"
                          >
                            <b-form-datepicker
                              id="datepicker2"
                              v-model="fundnote.DATE2"
                              class="mb-2"
                            ></b-form-datepicker>
                          </b-form-group>
                        </div>
                        <div class="row mt-3" v-if="fundnote.FUNDNOTES_ID == 7">
                          <b-form-group
                            class="required col-md-6"
                            id="fieldset-degree-major"
                            label="Date 1"
                            label-for="input-degree-major"
                          >
                            <b-form-datepicker
                              id="datepicker1"
                              v-model="fundnote.DATE1"
                              class="mb-2"
                            ></b-form-datepicker>
                          </b-form-group>

                          <b-form-group
                            class="required col-md-6"
                            id="fieldset-degree-minor"
                            label="Date 2"
                            label-for="input-degree-minor"
                          >
                            <b-form-datepicker
                              id="datepicker1"
                              v-model="fundnote.DATE2"
                              class="mb-2"
                            ></b-form-datepicker>
                          </b-form-group>
                          <b-form-group
                            class="required col-md-6"
                            id="fieldset-degree-minor"
                            label="Date 3"
                            label-for="input-degree-minor"
                          >
                            <b-form-datepicker
                              id="datepicker1"
                              v-model="fundnote.DATE3"
                              class="mb-2"
                            ></b-form-datepicker>
                          </b-form-group>
                        </div>
                        <div class="row mt-3" v-if="fundnote.FUNDNOTES_ID == 8">
                          <b-form-group
                            class="required col-md-6"
                            id="fieldset-degree-major"
                            label="Date 1"
                            label-for="input-degree-major"
                          >
                            <b-form-datepicker
                              id="datepicker1"
                              v-model="fundnote.DATE1"
                              class="mb-2"
                            ></b-form-datepicker>
                          </b-form-group>

                          <b-form-group
                            class="required col-md-6"
                            id="fieldset-degree-minor"
                            label="Date 2"
                            label-for="input-degree-minor"
                          >
                            <b-form-datepicker
                              id="datepicker1"
                              v-model="fundnote.DATE2"
                              class="mb-2"
                            ></b-form-datepicker>
                          </b-form-group>
                          <b-form-group
                            class="required col-md-6"
                            id="fieldset-degree-minor"
                            label="Date 3"
                            label-for="input-degree-minor"
                          >
                            <b-form-datepicker
                              id="datepicker1"
                              v-model="fundnote.DATE3"
                              class="mb-2"
                            ></b-form-datepicker>
                          </b-form-group>
                          <b-form-group
                            class="required col-md-6"
                            id="fieldset-degree-minor"
                            label="Date 4"
                            label-for="input-degree-minor"
                          >
                            <b-form-datepicker
                              id="datepicker1"
                              v-model="fundnote.DATE4"
                              class="mb-2"
                            ></b-form-datepicker>
                          </b-form-group>
                        </div>
                        <div class="row mt-3" v-if="fundnote.FUNDNOTES_ID == 9">
                          <b-form-group
                            class="required col-md-6"
                            id="fieldset-degree-major"
                            label="Date 1"
                            label-for="input-degree-major"
                          >
                            <b-form-datepicker
                              id="datepicker1"
                              v-model="fundnote.DATE1"
                              class="mb-2"
                            ></b-form-datepicker>
                          </b-form-group>

                          <b-form-group
                            class="required col-md-6"
                            id="fieldset-degree-minor"
                            label="Date 2"
                            label-for="input-degree-minor"
                          >
                            <b-form-datepicker
                              id="datepicker1"
                              v-model="fundnote.DATE2"
                              class="mb-2"
                            ></b-form-datepicker>
                          </b-form-group>
                          <b-form-group
                            class="required col-md-6"
                            id="fieldset-degree-minor"
                            label="Date 3"
                            label-for="input-degree-minor"
                          >
                            <b-form-datepicker
                              id="datepicker1"
                              v-model="fundnote.DATE3"
                              class="mb-2"
                            ></b-form-datepicker>
                          </b-form-group>
                          <b-form-group
                            class="required col-md-6"
                            id="fieldset-degree-minor"
                            label="Date 4"
                            label-for="input-degree-minor"
                          >
                            <b-form-datepicker
                              id="datepicker1"
                              v-model="fundnote.DATE4"
                              class="mb-2"
                            ></b-form-datepicker>
                          </b-form-group>
                          <b-form-group
                            class="required col-md-6"
                            id="fieldset-degree-minor"
                            label="Date 5"
                            label-for="input-degree-minor"
                          >
                            <b-form-datepicker
                              id="datepicker1"
                              v-model="fundnote.DATE5"
                              class="mb-2"
                            ></b-form-datepicker>
                          </b-form-group>
                        </div>
                        <div
                          class="row mt-3"
                          v-if="fundnote.FUNDNOTES_ID == 21"
                        >
                          <b-form-group
                            class="required col-md-6"
                            id="fieldset-degree-major"
                            label="Date"
                            label-for="input-degree-major"
                          >
                            <b-form-datepicker
                              id="datepicker1"
                              v-model="fundnote.DATE1"
                              class="mb-2"
                            ></b-form-datepicker>
                          </b-form-group>

                          <b-form-group
                            class="required col-md-6"
                            id="fieldset-degree-minor"
                            label="N%"
                            label-for="input-degree-minor"
                          >
                            <b-form-input
                              id="input-degree-minor"
                              placeholder="x%"
                              v-mask="'##%'"
                              @Focus="checkMask(id, mask)"
                            ></b-form-input>
                          </b-form-group>
                        </div>
                        <div
                          class="row mt-3"
                          v-if="fundnote.FUNDNOTES_ID == 24"
                        >
                          <b-form-group
                            class="required col-md-6"
                            id="fieldset-degree-major"
                            label="Date"
                            label-for="input-degree-major"
                          >
                            <b-form-datepicker
                              id="datepicker1"
                              v-model="fundnote.DATE1"
                              class="mb-2"
                            ></b-form-datepicker>
                          </b-form-group>
                        </div>
                      </b-form-group>

                      <div class="text-right">
                        <button
                          size="sm"
                          class="btn btn-primary"
                          @click="addFundNotes()"
                          type="button"
                        >
                          <i class="fa fa-plus mr-2"></i>Add
                        </button>

                        <button
                          size="sm"
                          class="btn btn-danger ml-2"
                          type="button"
                          @click="deleteFundNotes(fundnote)"
                          v-if="eindex != 0"
                        >
                          <i class="fa fa-trash mr-2"></i>Delete
                        </button>
                      </div>
                    </div>

                    <div class="col-md-12">
                      <div class="border-bottom my-3"></div>
                    </div>

                    <br />
                    <button
                      type="submit"
                      class="ml-2 btn btn-primary btn-fill float-left btn-md"
                      @click="back"
                    >
                      <i class="fa fa-step-backward" />
                      Previous &nbsp;
                      <!-- <i class="fa fa-step-forward" /> -->
                    </button>
                  </div>
                  <div class="float-right">
                    <!-- <button
                      @click="saveAsDraft"
                      type="button"
                      class="mr-2 btn btn-info btn-fill btn-md"
                    >
                      <i class="fa fa-pencil-square-o" /> &nbsp; Save as draft
                    </button> -->
                    <button
                      type="submit"
                      class="btn btn-primary btn-fill float-right btn-md"
                      @click.prevent="onSubmit"
                    >
                      <i class="fa fa-paper-plane" /> &nbsp; Submit
                    </button>
                    </div>
                </b-tab>
              </b-tabs>
            </div>
          </va-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import moment from "moment";
import { debounce } from "lodash";
import * as servicesModule0main from "../../../app/module0/services";
import * as servicesModule0second from "../../../app/module0/services02";
import * as servicesModule0sixth from "../../../app/module0/services06";
import * as servicesModule5 from "../../../app/module5/services03";
import Multiselect from "vue-multiselect";
import Vudal from "vudal";

import { parse } from "vue-currency-input";

export default {
  computed: {},
  components: {},
  mounted() {
    const fund = localStorage.getItem("FUNDPROFILE");
    this.getAllFundNotesList();
    this.getFundProfileDataById();
    this.$nextTick(function () {
      // Code that will run only after the
      // entire view has been rendered
      this.getAllUmbrellafundLists();
    });
    this.checkStatus();
  },
  props: {},
  data() {
    return {
      tabIndex: 1,
      statusLoad: true,
      newFund: true,
      DRAFT_UPDATE: false,
      // existingFund:false,

      showumbrellaFund: false,
      showFundList: false,
      showFundMER: false,
      showEPF: false,
      showSRIESG: false,
      showPerformanceFee: false,
      showAMF: false,
      showRatio: false,
      showHurdleRate: false,
      showSalesCharge: false,
      showFundDateExpiry: false,
      showDate1: false,
      showDate2: false,
      showDate3: false,
      showDate4: false,
      showDate5: false,
      maxsalechargemask: false,
      minsalechargemask: false,
      maxsalechargena: false,
      minsalechargena: false,
      visibleFundUmbrellaForm: false,
      visibleFundUmbrellaDD: true,
      visibleCISUpload: false,
      setVisibleUmbrellaFund: false,
      tabIndex: 0,
      tabModal: 0,
      FUND_DATE_EXPIRY: null,
      FUND_DATE_LAUNCH: null,
      FUND_YEAR_END: null,
      FUND_CODE_FIMM: "",
      FundTypeList: [],
      FundCategoryList: [],
      FundDomicileList: [],
      FundCurrencyList: [],
      FundSchemeList: [],
      FundNoteList: [],
      documentIdArray: [],
      uploadFileOject: [],
      CURRENT_NO: [],
      FPData: [],
      selected: [],
      options: [],

      PerformanceFee: [
        {
          name: "1%",
        },
        {
          name: "2%",
        },
        {
          name: "3%",
        },
        {
          name: "4%",
        },
        {
          name: "5%",
        },
        {
          name: "6%",
        },
        {
          name: "7%",
        },
        {
          name: "8%",
        },
        {
          name: "9%",
        },
        {
          name: "10%",
        },
      ],
      fee: [
        {
          name: "1%",
        },
        {
          name: "2%",
        },
        {
          name: "3%",
        },
        {
          name: "4%",
        },
        {
          name: "5%",
        },
        {
          name: "6%",
        },
        {
          name: "7%",
        },
        {
          name: "8%",
        },
        {
          name: "9%",
        },
        {
          name: "10%",
        },
      ],
      FUND_SYARIAH_COMP: [
        {
          value: "1",
          name: "Yes",
        },
        {
          value: "2",
          name: "No",
        },
      ],
      anualMgmtStatus: [
        {
          value: "1",
          name: "Yes",
        },
        {
          value: "2",
          name: "No",
        },
      ],
      FUND_FUND_PERFORMANCE: [
        {
          value: "1",
          name: "Yes",
        },
        {
          value: "2",
          name: "No",
        },
      ],
      FUND_STATUS_EPF: [
        {
          value: "1",
          name: "Yes",
        },
        {
          value: "2",
          name: "No",
        },
      ],
      FUND_STATUS_MER: [
        {
          value: "1",
          name: "Yes",
        },
        {
          value: "2",
          name: "No",
        },
      ],
      FUND_STATUS_SALE_CHARGE: [
        {
          value: "1",
          name: "Yes",
        },
        {
          value: "2",
          name: "No",
        },
      ],
      FUND_STATUS_MINIMUM_SALE_CHARGE: [
        {
          value: "1",
          name: "Yes",
        },
        {
          value: "2",
          name: "No",
        },
      ],
      FUND_STATUS_MAXIMUM_SALE_CHARGE: [
        {
          value: "1",
          name: "Yes",
        },
        {
          value: "2",
          name: "No",
        },
      ],
      FUND_STATUS_HURDLE_RATE: [
        {
          value: "1",
          name: "Yes",
        },
        {
          value: "2",
          name: "No",
        },
      ],
      FUND_STATUS_RATIO: [
        {
          value: "1",
          name: "Yes",
        },
        {
          value: "2",
          name: "No",
        },
      ],
      FUND_STATUS_SRI_ESG: [
        {
          value: "1",
          name: "Yes",
        },
        {
          value: "2",
          name: "No",
        },
      ],
      FUND_STATUS_PERFORMANCE_FEE: [
        {
          value: "1",
          name: "Yes",
        },
        {
          value: "2",
          name: "No",
        },
      ],
      FUND_DAILY_NAV: [
        {
          value: "1",
          name: "Yes",
        },
        {
          value: "2",
          name: "No",
        },
      ],
      FUND_FEEDER: [
        {
          value: "1",
          name: "Yes",
        },
        {
          value: "2",
          name: "No",
        },
      ],
      FUND_ASEAN_CIS_STATUS: [
        {
          value: "1",
          name: "Yes",
        },
        {
          value: "2",
          name: "No",
        },
      ],
      fields: [
        // A virtual column that doesn't exist in items
        { key: "index", label: "No" },
        // A column that needs custom formatting
        { key: "FUND_NAME", label: "Fund Name" },
        { key: "actions", label: "" },
      ],
      fundNotes: [
        {
          FUNDNOTES_ID: "",
          FUNDNOTES_DESC: "",
          DATE1: "",
          DATE2: "",
          DATE3: "",
          DATE4: "",
          DATE5: "",
          PERCENTAGE: "",
        },
      ],
      umbrellaList: [],
      fundList: [],
      fundDomicile: [],
      fundCategory: [
        {
          name: "Alternatives",
          id: "1",
        },
      ],
      schemaStructure: [],
      unitStructure: [],
      investmentFocus: [],
      model: {
        file0: [],
        file1: [],
        file2: [],
        file3: [],
        file4: [],
        mgmtCompany: null,

        selectedFund: null,
        selectedUmbrellaFund: null,
        inputUmbrellaFund: null,
        FUND_NAME: "",
        //
        FUND_CODE_FIMM: "1001",
        FUND_CODE_MEMBER: "",
        LIPPER_CODE_MEMBER: "",
        ISIN: "",
        SC_CODE_MEMBER: "",
        //
        FUND_NAME_CHINESE: "",
        FUND_NAME_SHORT: "",
        //
        FUND_TYPE: "",
        FUND_CATEGORY: "",
        FUND_DOMICILE: "",
        FUND_CURR_DENOMINATION: "",
        FUND_DATE_EXPIRY: "",
        //
        FUND_SUB_MANAGER: "",
        FUND_DAILY_NAV: "",
        FUND_SYARIAH_COMP: "",
        DECLARE_FUND_PERFORMANCE: "",
        //
        FUND_STATUS_SRI_ESG: "",
        FUND_STATUS_EPF: "",
        FUND_DATE_SRI_ESG_EFFECTIVE_DATE: "",
        FUND_EPF_CODE: "",
        //
        FUND_ANNUAL_MGMT: "",
        FUND_STATUS_MER: "",
        FUND_STATUS_FEE_PERFORMANCE: "",
        FUND_FEE_ANNUAL: "",
        FUND_MER: "",
        FUND_FEE_PERFORMANCE: "",
        FUND_STATUS_RATIO: "",
        FUND_RATIO: "",
        //
        FUND_STATUS_HURDLE_RATE: "",
        FUND_STATUS_SALE_CHARGE: "",
        FUND_STATUS_MINIMUM_SALE_CHARGE: "",
        FUND_STATUS_MAXIMUM_SALE_CHARGE: "",
        FUND_HURDLE: "",
        FUND_SALES_CHARGE_MINIMUM: "",
        FUND_SALES_CHARGE_MAXIMUM: "",
        FUND_SALES_CHARGE_EFFECTIVE: "",
        //
        FUND_DATE_LAUNCH: "",
        FUND_PRICE_PERUNIT: "",
        FUND_YEAR_END: "",
        FUND_SCHEME: "",
        FUND_UNITS: "",
        FUND_FOCUS_INVESTMENT: "",
        //
        FUND_FEEDER: "",
        FUND_FOF: "",
        FUND_UCITS: "",
        FUND_ASEAN_CIS_STATUS: "",
        //
        FUND_NOTES: "",
        DATE_1: "",
        DATE_2: "",
        DATE_3: "",
        DATE_4: "",
        DATE_5: "",
      },

      fileUploadSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                id: "1",
                labels: "New Fund Notification Letter to FIMM",
                accept: ".pdf,.doc,.docx",
                multiple: false,
                text: "Choose a File",
                model: "file0",
                type: "vfg-custom-file2",
                styleClasses: "col-md-12",
                required: true,
                validator: "required",
              },
              {
                id: "2",
                labels: "New Fund Application Form to FIMM",
                accept: ".pdf,.doc,.docx",
                multiple: false,
                text: "Choose a File",
                model: "file1",
                type: "vfg-custom-file2",
                styleClasses: "col-md-12",
                required: true,
                validator: "required",
              },
              {
                id: "3",
                labels:
                  "Approval Letter from the Security Commission (SC)/ Fund Lodgement Summary from the SC’s LOLA Online Submission System for New Fund",
                accept: ".pdf,.doc,.docx",
                multiple: false,
                text: "Choose a File",
                model: "file2",
                type: "vfg-custom-file2",
                styleClasses: "col-md-12",
                required: true,
                validator: "required",
              },
              {
                id: "4",
                labels:
                  "Prospectus/ Information Memorandum/ Product Highlight Sheet/ Disclosure Document (in the same form as distributed to potential investors)",
                accept: ".pdf,.doc,.docx",
                multiple: false,
                text: "Choose a File",
                model: "file3",
                type: "vfg-custom-file2",
                styleClasses: "col-md-12",
                required: true,
                validator: "required",
              },
              {
                id: "5",
                labels:
                  "For Funds Approval under the ASEAN CIS, a copy of approval letter from the SC for the appointment of the company as Local Representative",
                accept: ".pdf,.doc,.docx",
                multiple: false,
                text: "Choose a File",
                model: "file4",
                type: "vfg-custom-file2",
                styleClasses: "col-md-12",
                required: true,
                validator: "required",
                visible: (model, field, form) => {
                  return this.visibleCISUpload;
                },
              },
            ],
          },
        ],
      },

      schemaUmbrellaFund: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              // {
              //   type: "checkbox",
              //   label: "Tick if To Register New Umbrella Fund",
              //   model: "setVisibleUmbrellaFund",
              //   styleClasses: "col-md-12",
              //   default: true,
              // },
              // {
              //   type: "vueMultiSelect",
              //   model: "selectedUmbrellaFund",
              //   label: "Umbrella Fund",
              //   placeholder: "Select Umbrella Fund",
              //   required: false,
              //   validator: "required",
              //   styleClasses: "col-md-12",
              //   selectOptions: {
              //     multiple: false,
              //     key: "FMS_UMBRELLA_FUND_ID",
              //     label: "UMBRELLA_FUND_NAME",
              //     searchable: true,
              //   },
              //   values: (model, schema) => {
              //     return this.umbrellaList;
              //   },
              //   visible: (model, field, form) => {
              //     return this.visibleFundUmbrellaDD;
              //   },
              // },
              // {
              //   type: "input",
              //   inputType: "text",
              //   label: "Umbrella Fund",
              //   model: "inputUmbrellaFund",
              //   placeholder: "Enter umbrella fund name",
              //   required: false,
              //   validator: "string",
              //   styleClasses: "col-md-12",
              //   visible: (model, field, form) => {
              //     return this.visibleFundUmbrellaForm;
              //   },
              // },
              {
                type: "input",
                inputType: "text",
                label: "Fund Name",
                model: "FUND_NAME",
                disabled: "TRUE",
                placeholder: "Enter fund name",
                required: true,
                validator: "string",
                styleClasses: "col-md-12",
              },
            ],
          },
        ],
      },

      schemaNewFund: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "input",
                inputType: "text",
                label: "FiMM Fund Code",
                model: "FUND_CODE_FIMM",
                disabled: true,
                validator: "string",
                styleClasses: "col-xs-3 col-sm-2",
                required: true,
              },
              {
                type: "input",
                inputType: "text",
                label: "Member Fund Code",
                model: "FUND_CODE_MEMBER",
                placeholder: "Enter member fund code",
                required: true,
                disabled: false,
                validator: ["required", this.checkDuplicateMemberFundCode],
                styleClasses: "col-xs-3 col-sm-2",
              },
              {
                type: "vfg-the-mask3",
                mask: "LPXXXXXXXX",
                label: "Lipper Fund Code",
                model: "LIPPER_CODE_MEMBER",
                placeholder: "Enter lipper fund code",
                disabled: false,
                required: true,
                validator: ["required", this.checkDuplicateLipper],
                styleClasses: "col-xs-3 col-sm-2",
              },
              {
                type: "input",
                inputType: "text",
                label: "ISIN",
                model: "ISIN",
                placeholder: "Enter ISIN",
                validator: ["string", this.checkDuplicateISIN],
                styleClasses: "col-xs-3 col-sm-2",
              },
              {
                type: "input",
                inputType: "text",
                label: "SC Fund Code",
                model: "SC_CODE_MEMBER",
                placeholder: "Enter SC fund code",
                disabled: false,
                validator: [this.checkDuplicateSC],
                styleClasses: "col-xs-3 col-sm-2",
              },

              // add previous
            ],
          },
        ],
      },
      schemaNewFund2: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "input",
                inputType: "text",
                label: "Fund Chinese Name (Traditional)",
                model: "FUND_NAME_CHINESE",
                placeholder: "Enter fund chinese name",
                required: false,
                validator: "string",
                styleClasses: "col-md-12",
              },
              {
                type: "input",
                inputType: "text",
                label: "Fund Short Name",
                model: "FUND_NAME_SHORT",
                placeholder: "Enter fund short name",
                required: true,
                validator: ["string", this.validateInput],
                styleClasses: "col-md-12",
              },
            ],
          },
        ],
      },
      schemaNewFund3: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "vueMultiSelect",
                model: "FUND_TYPE",
                label: "Fund Type",
                placeholder: "Select fund type",
                required: true,
                validator: ["required", this.validateInput],
                styleClasses: "col-md-2",
                selectOptions: {
                  multiple: false,
                  key: "FMS_FUNDTYPE_ID",
                  label: "FUND_TYPE_FULLNAME",
                  searchable: false,
                },
                values: (model, schema) => {
                  return this.FundTypeList;
                },
              },
              {
                type: "vueMultiSelect",
                model: "FUND_CATEGORY",
                label: "Fund Category",
                placeholder: "Select fund type",
                required: true,
                validator: ["required", this.validateInput],
                styleClasses: "col-md-2",
                selectOptions: {
                  multiple: false,
                  key: "FMS_FUNDCATEGORY_ID",
                  label: "GROUP_ASSET",
                  searchable: false,
                },
                values: (model, schema) => {
                  return this.FundCategoryList;
                },
              },
              {
                type: "vueMultiSelect",
                model: "FUND_DOMICILE",
                label: "Fund Domicile",
                placeholder: "Select domicile",
                required: true,
                validator: ["required", this.validateInput],
                styleClasses: "col-md-2",
                selectOptions: {
                  multiple: false,
                  key: "FUND_DOMICILE_ID",
                  label: "FUND_DOMICILE_NAME",
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.FundDomicileList;
                },
              },
              {
                type: "vueMultiSelect",
                model: "FUND_CURR_DENOMINATION",
                label: "Currency Denomination",
                placeholder: "Select currency denomination",
                required: true,
                validator: ["required", this.validateInput],
                styleClasses: "col-md-3",
                selectOptions: {
                  multiple: false,
                  key: "SETTING_GENERAL_ID",
                  label: "SET_PARAM",
                  searchable: false,
                },
                values: (model, schema) => {
                  return this.FundCurrencyList;
                },
              },
              {
                labels: "Fund Expiry Date",
                type: "vfg-functional-date",
                placeholder: "DD-MM-YYYY",
                model: "FUND_DATE_EXPIRY",
                noLabel: true,
                noClearButton: true,
                format: "dd-MM-yyyy",
                styleClasses: "col-md-3",
                visible: (model, field, form) => {
                  return this.showFundDateExpiry;
                },
              },
            ],
          },
        ],
      },
      schemaNewFund4: {
        groups: [
          {
            styleClasses: "row",
            fields: [],
          },
        ],
      },
      schemaNewFund5: {
        groups: [
          {
            styleClasses: "row",
            fields: [],
          },
        ],
      },
      schemaNewFund6: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "input",
                inputType: "text",
                label: "Sub Manager Name",
                model: "FUND_SUB_MANAGER",
                required: false,
                validator: "string",
                styleClasses: "col-md-12",
              },
              {
                type: "radios",
                label: "Disclosure of Daily NAV in the newspaper",
                model: "FUND_DAILY_NAV",
                required: true,
                validator: ["string", this.validateInput],
                styleClasses: "col-xs-6 col-sm-4 display-inline",
                values: () => {
                  return this.FUND_DAILY_NAV;
                },
              },
              {
                type: "radios",
                label: "Syariah Compliant",
                model: "FUND_SYARIAH_COMP",
                required: true,
                validator: ["string", this.validateInput],
                styleClasses: "col-xs-6 col-sm-4 display-inline",
                values: () => {
                  return this.FUND_SYARIAH_COMP;
                },
              },
              {
                type: "radios",
                label: "Declaration of Fund Performance",
                model: "DECLARE_FUND_PERFORMANCE",
                required: true,
                validator: ["string", this.validateInput],
                styleClasses: "col-xs-6 col-sm-4 display-inline",
                values: () => {
                  return this.FUND_FUND_PERFORMANCE;
                },
              },
            ],
          },
        ],
      },
      schemaNewFund7: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "radios",
                label: "SRI/ESG Status",
                model: "FUND_STATUS_SRI_ESG",
                required: true,
                validator: ["string", this.validateInput],
                styleClasses: "col-md-2 display-inline",
                values: () => {
                  return this.FUND_STATUS_SRI_ESG;
                },
              },
              {
                type: "radios",
                label: "EPF Status",
                model: "FUND_STATUS_EPF",
                required: false,
                validator: "string",
                styleClasses: "col-md-2 display-inline",
                values: () => {
                  return this.FUND_STATUS_EPF;
                },
              },
              {
                labels: "SRI/ESG Effective Date",
                type: "vfg-functional-date",
                placeholder: "DD-MM-YYYY",
                model: "FUND_DATE_SRI_ESG_EFFECTIVE_DATE",
                noLabel: true,
                noClearButton: true,
                format: "dd-MM-yyyy",
                styleClasses: "col-md-3",
                required: true,
                visible: (model, field, form) => {
                  return this.showSRIESG;
                },
              },
              {
                type: "input",
                inputType: "text",
                label: "Fund EPF Code",
                model: "FUND_EPF_CODE",
                placeholder: "Enter EPF code",
                required: true,
                validator: "string",
                styleClasses: "col-md-3",
                visible: (model, field, form) => {
                  return this.showEPF;
                },
              },
            ],
          },
        ],
      },
      schemaNewFund8: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "radios",
                label: "Annual Management Status",
                model: "FUND_ANNUAL_MGMT",
                required: true,
                validator: ["string", this.validateInput],
                styleClasses: "col-md-3 display-inline",
                values: () => {
                  return this.anualMgmtStatus;
                },
              },
              {
                type: "radios",
                label: "MER Status",
                model: "FUND_STATUS_MER",
                required: true,
                validator: ["string", this.validateInput],
                styleClasses: "col display-inline",
                values: () => {
                  return this.FUND_STATUS_MER;
                },
              },
              {
                type: "radios",
                label: "Performance Fee Status",
                model: "FUND_STATUS_FEE_PERFORMANCE",
                required: true,
                validator: ["string", this.validateInput],
                styleClasses: "col display-inline",
                values: () => {
                  return this.FUND_STATUS_PERFORMANCE_FEE;
                },
              },
              {
                type: "vfg-the-mask3",
                mask: "#.##%",
                model: "FUND_FEE_ANNUAL",
                label: "Annual Management Fee",
                placeholder: "e.g x.xx%",
                required: true,
                validator: "required",
                styleClasses: "col-md-4",
                visible: (model, field, form) => {
                  return this.showAMF;
                },
              },
              {
                type: "vfg-the-mask3",
                mask: "#.###%",
                label: "MER",
                model: "FUND_MER",
                placeholder: "Enter MER",
                required: true,
                validator: "string",
                styleClasses: "col display-inline",
                visible: (model, field, form) => {
                  return this.visibleMer;
                },
              },
              {
                type: "vfg-the-mask3",
                mask: "#.##%",
                model: "FUND_FEE_PERFORMANCE",
                label: "Performance Fee",
                placeholder: "e.g x.xx%",
                required: true,
                validator: "required",
                styleClasses: "col-md-6",
                visible: (model, field, form) => {
                  return this.showPerformanceFee;
                },
              },
              {
                type: "radios",
                label: "Ratio Status",
                model: "FUND_STATUS_RATIO",
                required: true,
                validator: ["string", this.validateInput],
                styleClasses: "col display-inline",
                values: () => {
                  return this.FUND_STATUS_RATIO;
                },
              },
              {
                type: "vfg-the-mask3",
                mask: "##:##",
                label: "Ratio",
                model: "FUND_RATIO",
                placeholder: "e.g 20:80 with UTMC portion comes first",

                validator: "string",
                styleClasses: "col-md-6",
                visible: (model, field, form) => {
                  return this.showRatio;
                },
              },
            ],
          },
        ],
      },
      schemaNewFund9: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "radios",
                label: "Hurdle Rate Status",
                model: "FUND_STATUS_HURDLE_RATE",
                required: true,
                validator: ["required", this.validateInput],
                styleClasses: "col display-inline",
                values: () => {
                  return this.FUND_STATUS_EPF;
                },
              },
              {
                type: "vfg-the-mask3",
                mask: "#.###%",
                label: "Hurdle Rate",
                model: "FUND_HURDLE",
                placeholder: "e.g x.xxx%",
                validator: "string",
                styleClasses: "col display-inline",
                visible: (model, field, form) => {
                  return this.showHurdleRate;
                },
              },
              {
                type: "radios",
                label: "Sale Charge Status",
                model: "FUND_STATUS_SALE_CHARGE",
                required: true,
                validator: ["required", this.validateInput],
                styleClasses: "col display-inline",
                values: () => {
                  return this.FUND_STATUS_SALE_CHARGE;
                },
              },
              {
                type: "radios",
                label: "Minimum Sale Charge Status",
                model: "FUND_STATUS_MINIMUM_SALE_CHARGE",
                required: true,
                validator: "string",
                styleClasses: "col display-inline",
                values: () => {
                  return this.FUND_STATUS_MINIMUM_SALE_CHARGE;
                },
                visible: (model, field, form) => {
                  return this.showSalesCharge;
                },
              },

              {
                type: "radios",
                label: "Maximum Sale Charge Status",
                model: "FUND_STATUS_MAXIMUM_SALE_CHARGE",
                required: true,
                validator: "string",
                styleClasses: "col display-inline",
                values: () => {
                  return this.FUND_STATUS_MAXIMUM_SALE_CHARGE;
                },
                visible: (model, field, form) => {
                  return this.showSalesCharge;
                },
              },
              {
                type: "vfg-the-mask3",
                mask: "#.###%",
                label: "Minimum Sales Charge",
                model: "FUND_SALES_CHARGE_MINIMUM",
                placeholder: "e.g x.xxx%",
                validator: ["string", this.validateMinSaleCharge],
                styleClasses: "col",
                visible: (model, field, form) => {
                  return this.minsalechargemask;
                },
              },
              {
                type: "input",
                inputType: "text",
                label: "Minimum Sales Charge",
                model: "FUND_SALES_CHARGE_MINIMUM",
                validator: "string",
                disabled: true,
                styleClasses: "col",
                visible: (model, field, form) => {
                  return this.minsalechargena;
                },
              },
              {
                type: "vfg-the-mask3",
                mask: "#.###%",
                label: "Maximum Sales Charge",
                model: "FUND_SALES_CHARGE_MAXIMUM",
                placeholder: "e.g x.xxx%",
                required: true,
                validator: ["string", this.validateMaxSaleCharge],
                styleClasses: "col",
                visible: (model, field, form) => {
                  return this.maxsalechargemask;
                },
              },
              {
                type: "input",
                inputType: "text",
                label: "Maximum Sales Charge",
                model: "FUND_SALES_CHARGE_MAXIMUM",
                disabled: true,
                validator: "string",
                styleClasses: "col",
                visible: (model, field, form) => {
                  return this.maxsalechargena;
                },
              },
              {
                type: "vfg-the-mask3",
                mask: "#.###%",
                label: "Effective Sales Charge",
                model: "FUND_SALES_CHARGE_EFFECTIVE",
                placeholder: "e.g x.xxx%",
                required: true,
                validator: ["string", this.validateEffectiveSaleCharge],
                styleClasses: "col",
                visible: (model, field, form) => {
                  return this.showSalesCharge;
                },
              },
            ],
          },
        ],
      },
      schemaNewFund10: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                labels: "Launch Date",
                type: "vfg-functional-date",
                placeholder: "DD-MM-YYYY",
                model: "FUND_DATE_LAUNCH",
                noLabel: true,
                noClearButton: true,
                format: "dd-MM-yyyy",
                styleClasses: "col",
                required: true,
                validator: ["date", this.validateInput],
              },
              {
                type: "vfg-the-mask3",
                mask: "#.####",
                label: "Launch Price per unit",
                model: "FUND_PRICE_PERUNIT",
                placeholder: "e.g x.xxxx",
                validator: ["string", this.validateInput],
                styleClasses: "col-md-6",
              },
              {
                labels: "Financial Year End",
                type: "vfg-functional-date",
                placeholder: "MM-YYYY",
                model: "FUND_YEAR_END",
                noLabel: true,
                noClearButton: true,
                initview: "year",
                view: "month",
                maxview: "year",
                format: "MM-yyyy",
                styleClasses: "col-md-6",
                required: true,
                validator: ["date", this.validateInput],
              },
              {
                type: "vueMultiSelect",
                model: "FUND_SCHEME",
                label: "Scheme Structure",
                placeholder: "Select scheme structure",
                required: true,
                validator: ["required", this.validateInput],
                styleClasses: "col-md-6",
                selectOptions: {
                  multiple: false,
                  key: "FMS_SCHEME_ID",
                  label: "FMS_SCHEME_NAME",
                  searchable: false,
                },
                values: (model, schema) => {
                  return this.FundSchemeList;
                },
              },
              {
                type: "vueMultiSelect",
                model: "FUND_UNITS",
                label: "Units Structure",
                placeholder: "Select units structure",
                required: true,
                validator: ["required", this.validateInput],
                styleClasses: "col-md-6",
                selectOptions: {
                  multiple: false,
                  key: "SETTING_GENERAL_ID",
                  label: "SET_PARAM",
                  searchable: false,
                },
                values: (model, schema) => {
                  return this.unitStructure;
                },
              },
              {
                type: "vueMultiSelect",
                model: "FUND_FOCUS_INVESTMENT",
                label: "Investment Focus",
                placeholder: "Select investment focus",
                required: true,
                validator: ["required", this.validateInput],
                styleClasses: "col-md-6",
                selectOptions: {
                  multiple: false,
                  key: "SETTING_GENERAL_ID",
                  label: "SET_PARAM",
                  searchable: false,
                },
                values: (model, schema) => {
                  return this.investmentFocus;
                },
              },
            ],
          },
        ],
      },
      schemaNewFund11: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "radios",
                label: "Feeder Fund",
                model: "FUND_FEEDER",
                required: true,
                validator: ["string", this.validateInput],
                styleClasses: "col display-inline",
                values: () => {
                  return this.FUND_FEEDER;
                },
              },
              {
                type: "radios",
                label: "FOF",
                model: "FUND_FOF",
                required: true,
                validator: ["string", this.validateInput],
                styleClasses: "col-md-6 display-inline",
                values: () => {
                  return this.FUND_SYARIAH_COMP;
                },
              },
              {
                type: "radios",
                label: "UCITS",
                model: "FUND_UCITS",
                required: true,
                validator: ["string", this.validateInput],
                styleClasses: "col-md-6 display-inline",
                values: () => {
                  return this.FUND_SYARIAH_COMP;
                },
              },
              {
                type: "radios",
                label: "ASEAN CIS",
                model: "FUND_ASEAN_CIS_STATUS",
                required: true,
                validator: ["string", this.validateInput],
                styleClasses: "col-md-6 display-inline",
                values: () => {
                  return this.FUND_ASEAN_CIS_STATUS;
                },
              },
            ],
          },
        ],
      },
      schemaNewFund12: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "vueMultiSelect",
                model: "FUND_NOTES",
                label: "Fund Notes",
                placeholder: "Select fund notes",
                required: true,
                styleClasses: "col-md-10",
                selectOptions: {
                  multiple: false,
                  key: "FUNDNOTES_ID",
                  label: "FUNDNOTES_DESC",
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.FundNoteList;
                },
                validator: ["required", this.validateFundNotes],
              },
              {
                labels: "Date 1",
                type: "vfg-functional-date",
                placeholder: "DD-MM-YYYY",
                model: "DATE_1",
                noLabel: true,
                noClearButton: true,
                format: "dd-MM-yyyy",
                styleClasses: "col-md-6",
                required: true,
                visible: (model, field, form) => {
                  return this.showDate1;
                },
              },
              {
                labels: "Date 2",
                type: "vfg-functional-date",
                placeholder: "DD-MM-YYYY",
                model: "DATE_2",
                noLabel: true,
                noClearButton: true,
                format: "dd-MM-yyyy",
                styleClasses: "col-md-6",
                required: true,
                visible: (model, field, form) => {
                  return this.showDate2;
                },
              },
              {
                labels: "Date 3",
                type: "vfg-functional-date",
                placeholder: "DD-MM-YYYY",
                model: "DATE_3",
                noLabel: true,
                noClearButton: true,
                format: "dd-MM-yyyy",
                styleClasses: "col-md-6",
                required: true,
                visible: (model, field, form) => {
                  return this.showDate3;
                },
              },
              {
                labels: "Date 4",
                type: "vfg-functional-date",
                placeholder: "DD-MM-YYYY",
                model: "DATE_4",
                noLabel: true,
                noClearButton: true,
                format: "dd-MM-yyyy",
                styleClasses: "col-md-6",
                required: true,
                visible: (model, field, form) => {
                  return this.showDate4;
                },
              },
              {
                labels: "Date 5",
                type: "vfg-functional-date",
                placeholder: "DD-MM-YYYY",
                model: "DATE_5",
                noLabel: true,
                noClearButton: true,
                format: "dd-MM-yyyy",
                styleClasses: "col-md-6",
                required: true,
                visible: (model, field, form) => {
                  return this.showDate5;
                },
              },
            ],
          },
        ],
      },
      formOptions: {
        // validationErrorClass: "has-error",
        // validationSuccessClass: "has-`success`",
        validateAfterChanged: true,
      },
    };
  },
  methods: {

    back2() {
      this.$router.push("fundManagementList");
    }, // back button
    back() {
      this.$router.push("fundManagementFundList");
    },
    addFundNotes() {
      this.fundNotes.push({
        FUNDNOTES_ID: "",
        FUNDNOTES_DESC: "",
        DATE1: "",
        DATE2: "",
        DATE3: "",
        DATE4: "",
        DATE5: "",
        PERCENTAGE: "",
      });
    },
    checkMask(mask, id) {
      let el = document.getElementById(id);
      el.setAttribute("v-mask", mask);
    },

    deleteFundNotes(fundnote) {
      // alert(JSON.stringify(fundnote));
      // alert(JSON.stringify(this.fundNotes))

      // if(education.CONSULTANT_EDUCATIONAL_QUALIFICATION_ID){
      if (confirm("Are you sure to delete the selected Fund Notes?")) {
        // services02module2.deleteSavedQualificationData(education.CONSULTANT_EDUCATIONAL_QUALIFICATION_ID, education.CA_DOCUMENT_ID);
        this.fundNotes.splice(this.fundNotes.indexOf(fundnote), 1);
      }
      // } else {
      //   this.educations.splice(this.educations.indexOf(education), 1)
      // }
    },
    getDocumentById: async function () {
      const fund = localStorage.getItem("FUNDPROFILE");
      const response = await servicesModule5.getDocForFundCreation(
        JSON.parse(fund).FUND_PROFILE_ID
      );
      response.DATADOC.forEach((element) => {
        element.DOCU_BLOB = this.b64toBlobPDF(
          element.DOCU_BLOB,
          element.DOCU_MIMETYPE
        );
        element.DOCU_BLOB = new File(
          [element.DOCU_BLOB],
          element.DOCU_ORIGINAL_NAME + "." + element.DOCU_FILETYPE,
          { type: element.DOCU_BLOB.type }
        );
        const data = {
          name: element.DOCU_ORIGINAL_NAME + "." + element.DOCU_FILETYPE,
          size: element.DOCU_FILESIZE,
          type: element.DOCU_FILETYPE,
          ext: "exe",
          url: window.URL.createObjectURL(element.DOCU_BLOB),
        };
        if (element.DOCU_GROUP == 1) {
          this.file0 = element.DOCU_BLOB;
          this.model.file0.push(data);
        } else if (element.DOCU_GROUP == 2) {
          this.file1 = element.DOCU_BLOB;
          this.model.file1.push(data);
        } else if (element.DOCU_GROUP == 3) {
          this.file2 = element.DOCU_BLOB;
          this.model.file2.push(data);
        } else if (element.DOCU_GROUP == 4) {
          this.file3 = element.DOCU_BLOB;
          this.model.file3.push(data);
        } else if (element.DOCU_GROUP == 5) {
          this.file4 = element.DOCU_BLOB;
          this.model.file4.push(data);
        }
      });
    },

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
      // alert(byteArrays);
      console.log(byteArrays);

      return new File(byteArrays, "pot", { type: contentType });
    },
    async readDateStr(value) {
      var str = value;
      var ch = "/DATE";

      var count = str.split("/DATE").length - 1;
      console.log(count);
      return count;
    },
    async checkMemberFundCode() {
      console.log("checking Member Fund Code");
    },
    async checkStatus() {
      console.log("begin check status");
      const status = JSON.stringify(
        this.$route.params.FUNDPROFILE.FUND_STATUS_FUND
      );
      if (status == "RETURNED") {
        // alert("Returned");
        console.log("This is returned");
      } else if (status == "DRAFT") {
        // alert("Draft");
        console.log("This is draft");
        this.DRAFT_UPDATE = true;
        // alert(this.DRAFT_UPDATE);
      }
    },
    async getRunningNoFundCode() {
      const vm = this;
      const response = await servicesModule5.getRunningNoFundCode();
      // alert(JSON.stringify(response));
      var dataFundCode = JSON.stringify(response.data);
      this.model.FUND_CODE_FIMM = dataFundCode;
    },
    getAllUmbrellafundLists: async function () {
      const response = await servicesModule0second.getAllUmbrellafundLists();
      this.umbrellaList = response;
      console.log(this.umbrellaList);

      this.statusLoad = false;
    },
    getAllFundCategoryList: async function () {
      const response = await servicesModule0second.getAllFundGroupList();
      this.FundCategoryList = response;
      console.log(this.FundCategoryList);
    },
    getAllSchemeList: async function () {
      const response = await servicesModule0second.getAllSchemeList();
      this.FundSchemeList = response;
      console.log(this.FundSchemeList);
    },

    getAllCurrencyFormat: async function () {
      const response = await servicesModule5.getAllCurrencyFormat();
      this.FundCurrencyList = response;
      console.log(this.FundCurrencyList);
    },
    getAllFundTypeList: async function () {
      const response = await servicesModule0second.getAllFundTypeList();
      this.FundTypeList = response;
      console.log(this.FundTypeList);
    },
    getAllFundDomicileList: async function () {
      const response = await servicesModule0second.getAllFundDomicileList();
      this.FundDomicileList = response;
      console.log(this.FundDomicileList);
    },
    getAllFundNotesList: async function () {
      const response = await servicesModule0second.getAllFundNotesList();
      this.FundNoteList = response;
      this.options = response;
      console.log(this.FundNoteList);
    },
    getAllinvestmentFocus: async function () {
      const response = await servicesModule5.getAllinvestmentFocus();
      this.investmentFocus = response;
      console.log(this.investmentFocus);
    },
    getAllunitStructure: async function () {
      const response = await servicesModule5.getAllunitStructure();
      this.unitStructure = response;
      console.log(this.unitStructure);
    },
    async getDistributorType() {
      const response = await servicesModule0main.getDistributorType();
      this.DistributorType = response;
      console.log(this.DistributorType);
    },
    async enforceAPI() {
      data.append(
        "FUND_DATE_EXPIRY",
        moment(this.model.FUND_DATE_EXPIRY).format("YYYY-MM-DD")
      );
    },

    nextTab() {
      this.tabModal = this.tabs.findIndex((tab) => tab === this.$route.hash);
    },
    next(value) {
      if (value != undefined) {
        this.tabIndex = 0;
        this.selectedFund = value;
      }
      this.disabledPrev = false;
      this.filterConsultant = null;
      this.filter = null;
      if (this.nextValue < 3) {
        this.nextValue++;
      }
      if (this.nextValue == 3) {
        this.disabledNext = true;
      }
    },
    async checkDuplicateSC(value) {
      if (value === "") {
        return;
      }
      const fund = localStorage.getItem("FUNDPROFILE");

      if (fund == null) {
        var fpid = null;
      } else {
        var fpid = JSON.parse(fund).FUND_PROFILE_ID;
      }
      const response = await servicesModule5.checkDuplicateSC(value, fpid);
      if (response != "") {
        return ["This SC Code already exists in our record"];
      } else if (response == "") {
        return;
      }
    },
    async checkDuplicateLipper(value) {
      if (value === "") {
        return;
      }
      const fund = localStorage.getItem("FUNDPROFILE");

      // alert (fund);
      if (fund == null) {
        var fpid = null;
      } else {
        var fpid = JSON.parse(fund).FUND_PROFILE_ID;
      }
      const response = await servicesModule5.checkDuplicateLipper(value, fpid);
      if (response != "") {
        return ["This Fund Lipper Code already exists in our record"];
      } else if (response == "") {
        return;
      }
    },
    async checkDuplicateISIN(value) {
      if (value === "") {
        return;
      }
      const fund = localStorage.getItem("FUNDPROFILE");

      if (fund == null) {
        var fpid = null;
      } else {
        var fpid = JSON.parse(fund).FUND_PROFILE_ID;
      }
      const response = await servicesModule5.checkDuplicateISIN(value, fpid);
      if (response != "") {
        return ["This Fund ISIN already exists in our record"];
      } else if (response == "") {
        return;
      }
    },
    async checkDuplicateMemberFundCode(value) {
      if (value === "") {
        return;
      }

      const fund = localStorage.getItem("FUNDPROFILE");

      // alert (fund);
      if (fund == null) {
        var fpid = null;
      } else {
        var fpid = JSON.parse(fund).FUND_PROFILE_ID;
      }
      const response = await servicesModule5.checkDuplicateMemberFundCode(
        value,
        fpid
      );
      if (response != "") {
        return ["This Member Fund Code already exists in our record"];
      } else if (response == "") {
        return;
      }
    },
    validateFundName() {
      if (this.$refs.dropdownformUmbrellaFund.validate() == true) {
        return true;
      } else {
        return false;
      }
    },
    validateEffectiveSaleCharge(value) {
      const maxSaleCharge = this.model.FUND_SALES_CHARGE_MAXIMUM;
      const minSaleCharge = this.model.FUND_SALES_CHARGE_MINIMUM;
      const effectSaleCharge = this.model.FUND_SALES_CHARGE_EFFECTIVE;
      if (
        this.model.FUND_STATUS_MAXIMUM_SALE_CHARGE == 1 &&
        this.model.FUND_STATUS_MINIMUM_SALE_CHARGE == 1
      ) {
        console.log("Effective Sale Charge");
        console.log(
          maxSaleCharge + "||" + minSaleCharge + "||" + effectSaleCharge
        );
        console.log(effectSaleCharge < minSaleCharge);
        console.log(effectSaleCharge > maxSaleCharge);
        if (effectSaleCharge < minSaleCharge) {
          console.log("validate max sale charge");
          return [
            "Effective Sale Charge Must Be In Between Minimum Sale Charge and Maximum Sale Charge.",
          ];
        } else if (effectSaleCharge > maxSaleCharge) {
          console.log("validate max sale charge");
          return [
            "Effective Sale Charge Must Be In Between Minimum Sale Charge and Maximum Sale Charge.",
          ];
        }
      }
    },
    validateMaxSaleCharge(value) {
      const maxSaleCharge = this.model.FUND_SALES_CHARGE_MAXIMUM;
      const minSaleCharge = this.model.FUND_SALES_CHARGE_MINIMUM;

      if (this.model.FUND_STATUS_MAXIMUM_SALE_CHARGE == 1) {
        console.log("Max Sale Charge");
        if (maxSaleCharge < minSaleCharge) {
          console.log("validate max sale charge");
          return ["Maximum Sale Charge Cannot below Minimum Sale Charge."];
        }
      }
    },
    validateMinSaleCharge(value) {
      const maxSaleCharge = this.model.FUND_SALES_CHARGE_MAXIMUM;
      const minSaleCharge = this.model.FUND_SALES_CHARGE_MINIMUM;

      if (this.model.FUND_STATUS_MINIMUM_SALE_CHARGE == 1) {
        console.log("Min Sale Charge");
        if (minSaleCharge > maxSaleCharge) {
          console.log("validate max sale charge");
          return ["Minimum Sale Charge Cannot Above Maximum Sale Charge."];
        }
      }
    },
    validateFundDetails() {
      if (this.$refs.profileFundForm.validate() == true) {
        if (this.$refs.profileFundForm2.validate() == true) {
          if (this.$refs.profileFundForm3.validate() == true) {
            if (this.$refs.profileFundForm4.validate() == true) {
              if (this.$refs.profileFundForm5.validate() == true) {
                if (this.$refs.profileFundForm6.validate() == true) {
                  if (this.$refs.profileFundForm7.validate() == true) {
                    if (this.$refs.profileFundForm8.validate() == true) {
                      if (this.$refs.profileFundForm9.validate() == true) {
                        if (this.$refs.profileFundForm10.validate() == true) {
                          if (this.$refs.profileFundForm11.validate() == true) {
                            // if (
                            //   this.$refs.profileFundForm12.validate() == true
                            // ) {
                            return true;
                            // }
                          } else {
                            return false;
                          }
                        } else {
                          return false;
                        }
                      } else {
                        return false;
                      }
                    } else {
                      return false;
                    }
                  } else {
                    return false;
                  }
                } else {
                  return false;
                }
              } else {
                return false;
              }
            } else {
              return false;
            }
          } else {
            return false;
          }
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    validateInput(value) {
      if (value != null) {
        console.log("validated");
      } else {
        return ["Field is required"];
      }
    },
    validateFundNotes(value) {
      if (value != null) {
        console.log("validated");
      } else {
        return ["Fund Notes must be selected before submit"];
      }
    },
    async getFundProfileDataById() {
      const fund = localStorage.getItem("FUNDPROFILE");
      const response = await servicesModule5.getFundProfileInfo(
        JSON.parse(fund).FUND_PROFILE_ID
      );
      const response2 = await servicesModule5.getFundNoteDetail(
        JSON.parse(fund).FUND_PROFILE_ID
      );
      if (response2) {
        this.fundNotes = response2;
        if (this.fundNotes.length <= 0) {
          this.fundNotes.push({
            FUNDNOTES_ID: "",
            FUNDNOTES_DESC: "",
            DATE1: "",
            DATE2: "",
            DATE3: "",
            DATE4: "",
            DATE5: "",
            N: "",
            T_1: "",
          });
        }
      }
      // alert(this.FPData);
      console.log("here is the data :" + JSON.stringify(response));
      if (response == null) {
      } else {
        if (response.FMS_UMBRELLA_FUND_ID != null) {
          this.model.selectedUmbrellaFund = {
            FMS_UMBRELLA_FUND_ID: response.FMS_UMBRELLA_FUND_ID,
            UMBRELLA_FUND_NAME: response.UMBRELLA_FUND_NAME,
          };
        }
        this.model.FUND_NAME = response.FUND_NAME;
        this.model.FUND_CODE_FIMM = response.FUND_CODE_FIMM;
        this.model.FUND_CODE_MEMBER = response.FUND_CODE_MEMBER;
        this.model.LIPPER_CODE_MEMBER = response.FUND_LIPPER_CODE;
        this.model.ISIN = response.FUND_ISIN;
        this.model.SC_CODE_MEMBER = response.FUND_SC_CODE;
        // //add old fund detail append

        this.model.FUND_NAME_CHINESE = response.FUND_NAME_CHINESE;
        this.model.FUND_NAME_SHORT = response.FUND_NAME_SHORT;

        if (response.FUND_TYPE != null) {
          this.model.FUND_TYPE = {
            FMS_FUNDTYPE_ID: response.FUND_TYPE,
            FUND_TYPE_FULLNAME: response.FUND_TYPE_FULLNAME,
          };
        }

        this.model.FUND_CATEGORY = {
          FMS_FUNDCATEGORY_ID: response.FUND_CATEGORY,
          GROUP_ASSET: response.GROUP_ASSET,
        };

        if (response.FUND_CATEGORY == 1) {
          this.showFundDateExpiry = true;
          this.model.FUND_DATE_EXPIRY = response.FUND_DATE_EXPIRY;
        } else if (response.FUND_CATEGORY == 3) {
          this.showFundDateExpiry = true;
          this.model.FUND_DATE_EXPIRY = response.FUND_DATE_EXPIRY;
        } else {
          this.showFundDateExpiry = false;
        }
        this.model.FUND_DOMICILE = {
          FUND_DOMICILE_ID: response.FUND_DOMICILE_ID,
          FUND_DOMICILE_NAME: response.FUND_DOMICILE_NAME,
        };

        this.model.FUND_CURR_DENOMINATION = {
          SETTING_GENERAL_ID: response.CURR_DENOMINATION_ID,
          SET_PARAM: response.CURR_DENOMINATION_PARAM,
        };

        this.model.FUND_DATE_EXPIRY = response.FUND_DATE_EXPIRY;

        this.model.FUND_SUB_MANAGER = response.FUND_SUB_MANAGER;
        this.model.FUND_DAILY_NAV = response.FUND_DAILY_NAV;
        this.model.FUND_SYARIAH_COMP = response.FUND_SYARIAH_COMP;
        this.model.DECLARE_FUND_PERFORMANCE = response.FUND_FUND_PERFORMANCE;
        this.model.FUND_ANNUAL_MGMT = response.FUND_STATUS_ANNUAL_MGMT;
        if (response.FUND_STATUS_SRI_ESG == 1) {
          this.showAMF = true;
          this.model.FUND_FEE_ANNUAL = response.FUND_ANNUAL_MGMT;
        }
        this.model.FUND_STATUS_SRI_ESG = response.FUND_STATUS_SRI_ESG;
        if (response.FUND_STATUS_SRI_ESG == 1) {
          this.showSRIESG = true;
          this.model.FUND_DATE_SRI_ESG_EFFECTIVE_DATE =
            response.FUND_DATE_SRI_ESG_EFFECTIVE_DATE;
        }
        this.model.FUND_STATUS_EPF = response.FUND_STATUS_EPF;
        if (response.FUND_STATUS_EPF == 1) {
          this.showEPF = true;
          this.model.FUND_EPF_CODE = response.FUND_EPF_CODE;
        }
        this.model.FUND_STATUS_MER = response.FUND_STATUS_MER;
        if (response.FUND_STATUS_MER == 1) {
          this.visibleMer = true;
          this.model.FUND_MER = response.FUND_MER;
        }
        this.model.FUND_STATUS_FEE_PERFORMANCE =
          response.FUND_STATUS_FEE_PERFORMANCE;
        if (response.FUND_STATUS_FEE_PERFORMANCE == 1) {
          this.showPerformanceFee = true;
          this.model.FUND_FEE_PERFORMANCE = response.FUND_FEE_PERFORMANCE;
        }

        this.model.FUND_STATUS_RATIO = response.FUND_STATUS_RATIO;
        if (response.FUND_STATUS_RATIO == 1) {
          this.showRatio = true;
          this.model.FUND_RATIO = response.FUND_RATIO;
        }

        this.model.FUND_STATUS_HURDLE_RATE = response.FUND_STATUS_HURDLE_RATE;
        if (response.FUND_STATUS_HURDLE_RATE == 1) {
          this.showHurdleRate = true;
          this.model.FUND_HURDLE = response.FUND_HURDLE;
        }
        this.model.FUND_STATUS_SALE_CHARGE = response.FUND_STATUS_SALE_CHARGE;
        if (response.FUND_STATUS_SALE_CHARGE == 1) {
          this.showSalesCharge = true;
          this.model.FUND_SALES_CHARGE_EFFECTIVE = response.FUND_SALES_CHARGE;
        } else if (response.FUND_STATUS_SALE_CHARGE == 0) {
          this.showSalesCharge = false;
          this.minsalechargena = false;
          this.minsalechargemask = false;
          this.maxsalechargena = false;
          this.maxsalechargemask = false;
        }
        this.model.FUND_STATUS_MINIMUM_SALE_CHARGE =
          response.FUND_STATUS_MINIMUM_SALE_CHARGE;
        if (response.FUND_STATUS_MINIMUM_SALE_CHARGE == 0) {
          this.minsalechargena = true;
          this.minsalechargemask = false;
          this.model.FUND_SALES_CHARGE_MINIMUM =
            response.FUND_MINIMUM_SALE_CHARGE;
        } else if (response.FUND_STATUS_MINIMUM_SALE_CHARGE == 1) {
          this.minsalechargena = false;
          this.minsalechargemask = true;
          this.model.FUND_SALES_CHARGE_MINIMUM =
            response.FUND_MINIMUM_SALE_CHARGE;
        } else {
          this.minsalechargena = false;
          this.minsalechargemask = false;
        }
        this.model.FUND_STATUS_MAXIMUM_SALE_CHARGE =
          response.FUND_STATUS_MAXIMUM_SALE_CHARGE;
        if (response.FUND_STATUS_MAXIMUM_SALE_CHARGE == 0) {
          this.maxsalechargena = true;
          this.maxsalechargemask = false;
          this.model.FUND_SALES_CHARGE_MAXIMUM =
            response.FUND_MAXIMUM_SALE_CHARGE;
        } else if (response.FUND_STATUS_MAXIMUM_SALE_CHARGE == 1) {
          this.maxsalechargena = false;
          this.maxsalechargemask = true;
          this.model.FUND_SALES_CHARGE_MAXIMUM =
            response.FUND_MAXIMUM_SALE_CHARGE;
        } else {
          this.maxsalechargena = false;
          this.maxsalechargemask = false;
        }
        // this.model.FUND_SALES_CHARGE_MINIMUM = response.FUND_MINIMUM_SALE_CHARGE;
        // this.model.FUND_SALES_CHARGE_MAXIMUM = response.FUND_MAXIMUM_SALE_CHARGE;
        // this.model.FUND_SALE_CHARGE_EFFECTIVE

        this.model.FUND_DATE_LAUNCH = response.FUND_DATE_LAUNCH;
        this.model.FUND_PRICE_PERUNIT = response.FUND_PRICE_PERUNIT;
        this.model.FUND_YEAR_END = response.FUND_YEAR_END;

        this.model.FUND_SCHEME = {
          FMS_SCHEME_ID: response.FUND_SCHEME,
          FMS_SCHEME_NAME: response.FMS_SCHEME_NAME,
        };
        this.model.FUND_UNITS = {
          SETTING_GENERAL_ID: response.FUND_UNITS,
          SET_PARAM: response.FUND_UNITS_PARAM,
        };

        this.model.FUND_FOCUS_INVESTMENT = {
          SETTING_GENERAL_ID: response.FUND_FOCUS,
          SET_PARAM: response.FUND_INVESTMENT_FOCUS_PARAM,
        };

        this.model.FUND_FEEDER = response.FUND_FEEDER;
        this.model.FUND_FOF = response.FUND_FOF_STATUS;
        this.model.FUND_UCITS = response.FUND_UCITS_STATUS;
        this.model.FUND_ASEAN_CIS_STATUS = response.FUND_ASEAN_CIS_STATUS;
        if (response.FUND_ASEAN_CIS_STATUS == 1) {
          this.showAseanCIS = true;
          this.visibleCISUpload = true;
        }
        console.log(this.selected);
        this.getDocumentById();
        // FUND NOTES SECTION
      }
    },
    onModelUpdated(newVal, schema) {
      console.log(schema);
      if (schema == "registrationType") {
        if (newVal == "1") {
          this.visibleIc = false;
        } else {
          this.visibleIc = true;
        }
      } else if (schema == "applicationType") {
        this.model.applicationType = newVal;
        if (newVal == "2") {
          this.visibleCatExemption = true;
        } else {
          this.visibleCatExemption = false;
        }
      } else if (schema == "mgmtCompany") {
        console.log(newVal);
        this.model.selectedUmbrellaFund = null;
        this.model.selectedFund = true;
        if (newVal != null) {
          this.showumbrellaFund = true;
          this.showFundList = false;
        } else {
          this.showumbrellaFund = false;
          this.showFundList = false;
        }
      } else if (schema == "selectedUmbrellaFund") {
        this.model.selectedFund = true;
        if (newVal != 0) {
          this.showFundList = true;
        } else {
          this.showFundList = false;
        }
      } else if (schema == "FUND_CATEGORY") {
        if (this.model.FUND_CATEGORY.FMS_FUNDCATEGORY_ID === 1) {
          this.showFundDateExpiry = true;
        } else if (this.model.FUND_CATEGORY.FMS_FUNDCATEGORY_ID === 3) {
          this.showFundDateExpiry = true;
        } else {
          this.showFundDateExpiry = false;
        }
      } else if (schema == "FUND_STATUS_MER") {
        if (newVal == 1) {
          this.visibleMer = true;
        } else {
          this.visibleMer = false;
        }
      } else if (schema == "FUND_STATUS_EPF") {
        if (newVal == 1) {
          this.showEPF = true;
        } else {
          this.showEPF = false;
        }
      } else if (schema == "FUND_STATUS_HURDLE_RATE") {
        if (newVal == 1) {
          this.showHurdleRate = true;
        } else {
          this.showHurdleRate = false;
        }
      } else if (schema == "FUND_STATUS_SALE_CHARGE") {
        if (newVal == 1) {
          this.showSalesCharge = true;
        } else {
          this.showSalesCharge = false;
        }
      } else if (schema == "FUND_STATUS_MINIMUM_SALE_CHARGE") {
        if (newVal == 1) {
          this.minsalechargena = false;
          this.minsalechargemask = true;
        } else if (newVal == 0) {
          this.minsalechargena = true;
          this.minsalechargemask = false;
          this.model.FUND_SALES_CHARGE_MINIMUM = "N/A";
        }
      } else if (schema == "FUND_STATUS_MAXIMUM_SALE_CHARGE") {
        if (newVal == 1) {
          this.maxsalechargena = false;
          this.maxsalechargemask = true;
        } else if (newVal == 0) {
          this.maxsalechargena = true;
          this.maxsalechargemask = false;
          this.model.FUND_SALES_CHARGE_MAXIMUM = "N/A";
        }
      } else if (schema == "FUND_ANNUAL_MGMT") {
        if (newVal == 1) {
          this.showAMF = true;
        } else {
          this.showAMF = false;
        }
      } else if (schema == "FUND_STATUS_FEE_PERFORMANCE") {
        if (newVal == 1) {
          this.showPerformanceFee = true;
        } else {
          this.showPerformanceFee = false;
        }
      } else if (schema == "FUND_STATUS_RATIO") {
        if (newVal == 1) {
          this.showRatio = true;
        } else {
          this.showRatio = false;
        }
      } else if (schema == "FUND_STATUS_SRI_ESG") {
        if (newVal == 1) {
          this.showSRIESG = true;
        } else {
          this.showSRIESG = false;
        }
      } else if (schema == "FUND_ASEAN_CIS_STATUS") {
        if (newVal == 1) {
          this.visibleCISUpload = true;
          this.showAseanCIS = true;
        } else {
          this.visibleCISUpload = false;
          this.showAseanCIS = false;
        }
      } else if (schema == "FUND_NOTES") {
        console.log(this.model.FUND_NOTES.FUNDNOTES_DESC);
        // var length = this.readDateStr(this.model.FUND_NOTES.FUNDNOTES_DESC);
        // console.log(length.PromiseResult);
        var str = this.model.FUND_NOTES.FUNDNOTES_DESC;
        var ch = "/DATE";

        var length = str.split("/DATE").length - 1;
        console.log(length);
        if (length === 1) {
          this.showDate1 = true;
          this.showDate2 = false;
          this.showDate3 = false;
          this.showDate4 = false;
          this.showDate5 = false;
        } else if (length === 2) {
          this.showDate1 = true;
          this.showDate2 = true;
          this.showDate3 = false;
          this.showDate4 = false;
          this.showDate5 = false;
        } else if (length === 3) {
          this.showDate1 = true;
          this.showDate2 = true;
          this.showDate3 = true;
          this.showDate4 = false;
          this.showDate5 = false;
        } else if (length === 4) {
          this.showDate1 = true;
          this.showDate2 = true;
          this.showDate3 = true;
          this.showDate4 = true;
          this.showDate5 = false;
        } else if (length === 5) {
          this.showDate1 = true;
          this.showDate2 = true;
          this.showDate3 = true;
          this.showDate4 = true;
          this.showDate5 = true;
        } else if (length === 0) {
          this.showDate1 = false;
          this.showDate2 = false;
          this.showDate3 = false;
          this.showDate4 = false;
          this.showDate5 = false;
        }
      } else if (schema == "setVisibleUmbrellaFund") {
        this.model.setVisibleUmbrellaFund = true;
        if (newVal == true) {
          this.showFundList = true;
          this.visibleFundUmbrellaForm = true;
          this.visibleFundUmbrellaDD = false;
        } else {
          this.showFundList = false;
          this.visibleFundUmbrellaForm = false;
          this.visibleFundUmbrellaDD = true;
        }
      } else if (schema == "FUND_NAME") {
        this.model.FUND_NAME = String(newVal).toUpperCase();
      } else if (schema == "FUND_SUB_MANAGER") {
        this.model.FUND_SUB_MANAGER = String(newVal).toUpperCase();
      } else if (schema == "FUND_NAME_SHORT") {
        this.model.FUND_NAME_SHORT = String(newVal).toUpperCase();
      } else if (schema == "FUND_NAME_CHINESE") {
        this.model.FUND_NAME_CHINESE = String(newVal).toUpperCase();
      }
    },
    saveAsDraft: async function () {
      console.log("Start Save As Draft");
      if (this.model.FUND_NAME == null || this.model.FUND_NAME == "") {
        alert("Please fill in Fund Name to save as draft");
      } else {
        const data = new FormData();
        const user = localStorage.getItem("user");
        const fundprofile = localStorage.getItem("FUNDPROFILE");
        console.log(JSON.stringify(this.user));
        // alert (fundprofile);

          data.append(
            "FUND_PROFILE_ID",
            JSON.parse(fundprofile).FUND_PROFILE_ID
          );
        // data.append("FUND_PROFILE_ID", JSON.parse(fundprofile).FUND_PROFILE_ID ?? null);
        data.append("DIST_ID", JSON.parse(user).USER_DIST_ID);
        data.append("DIST_USER_ID", JSON.parse(user).user_id);
        data.append("DIST_USER_GROUP", JSON.parse(user).USER_GROUP_ID);

        // FUND NOTES SECTION
        data.append("FUND_NOTES", JSON.stringify(this.fundNotes) ?? "");

        data.append("FUND_STATUS_FUND", "1");

        data.append("FUND_ISSUBMIT", "1");


        try {
          console.log("current data" + JSON.stringify(data));
          if (confirm("Save fund notes management application as draft?")) {
            data.append("isSubmit", 1);
            const response = await servicesModule5.submitFundNotesChangeDetails(data);
            // console.log(response);
              this.back2();
          } else {
          }
        } catch (error) {
          console.log(error);
        }
      }
    },
    onSubmit: async function () {
      this.statusLoad = true;
      console.log("Start function submit");

      const data = new FormData();
      const user = localStorage.getItem("user");
      const fundprofile = localStorage.getItem("FUNDPROFILE");
      console.log(JSON.stringify(this.user));

      data.append("FUND_PROFILE_ID", JSON.parse(fundprofile).FUND_PROFILE_ID);
      data.append("DIST_ID", JSON.parse(user).USER_DIST_ID);
      data.append("DIST_USER_ID", JSON.parse(user).user_id);
      data.append("DIST_USER_GROUP", JSON.parse(user).USER_GROUP_ID);


      // FUND NOTES SECTION
      data.append("FUND_NOTES", JSON.stringify(this.fundNotes) ?? "");

      //notification
      data.append(
        "NOTI_LOCATION",
        "/distributor/fundCreationSecondLevelReviewList"
      );

      var remarkEntry = "M - New Fund Creation";

      data.append("NOTI_REMARK", remarkEntry);

      var notiTitle = "New entry pending Approval";
      data.append("NOTI_TITLE", notiTitle);

      if (this.validateFundName() == true) {
          try {
            console.log("current data" + JSON.stringify(data));
            if (confirm("Are you sure to submit?")) {
              data.append("isSubmit", 2);
              const response = await servicesModule5.submitFundNotesChangeDetails(data);
              // console.log(response);
              alert("Fund Notes Management Application has been submitted.");
              this.statusLoad = false;
              this.back2();
              // this.$router.push("/distri");
            } else {
            }
          } catch (error) {
            this.statusLoad = false;
            console.log(error);
          }
        }
       else {
        alert("Please recheck your Fund Notes Name.");
      }
    },
  },
};
</script>

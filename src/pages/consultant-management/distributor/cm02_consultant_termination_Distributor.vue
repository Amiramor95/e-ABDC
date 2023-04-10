<template>
  <div class="">
    <div class="">
      <div class="row">
        <div class="col-12">
          <b-overlay :show="show_overlay" rounded="sm">
            <template v-if="!isBulk">
              <div v-if="!isReady" style="margin-top: 25%">
                <div class="text-center text-success my-2">
                  <b-spinner class="align-middle mr-1"></b-spinner>
                  <strong>Loading...</strong>
                </div>
              </div>

              <div v-else>
                <va-card>
                  <h4 style="margin-top: 0px; margin-bottom: 20px">
                    List of Consultant Termination Request
                  </h4>

                  <div
                    style="
                      display: flex;
                      justify-content: flex-end;
                      align-items: center;
                    "
                  >
                    <div class="flex md3 offset--md3">
                      <div style="display: flex; justify-content: flex-end">
                        <h4 style="margin: 0; margin-bottom: 10px">
                          <span
                            v-b-tooltip.hover
                            title="Bulk"
                            class="badge badge-success mr-2"
                            @click="bulkList"
                          >
                            <i class="fa fa-plus"></i>
                          </span>
                        </h4>
                      </div>
                    </div>
                  </div>

                  <!-- CONSULTANT TABLE -->
                  <va-data-table
                    :fields="consultantSubmissionFields"
                    :data="filteredSubmissionConsultant"
                    no-data-label="No data found"
                    :per-page="parseInt(perPage)"
                    :datacount="filteredSubmissionConsultant.length"
                    :dataperpage="parseInt(perPage)"
                    clickable
                  >
                    <!-- <template slot="actions" slot-scope="props">
                            <b-form-checkbox
                            v-model="props.rowData.selected"
                            @change="setCurrentConsultant(props)"
                            />
                        </template> -->

                    <template slot="checkbox" slot-scope="props">
                      <b-form-checkbox
                        v-model="props.rowData.selected"
                        @change="setCurrentConsultant(props)"
                      >
                      </b-form-checkbox>
                    </template>

                    <template slot="index" slot-scope="row">
                      {{ row.rowIndex + 1 }}
                    </template>

                    <template slot="ACTION" slot-scope="props">
                      <h4 style="margin: 0; font-size: 20px">
                        <span
                          v-b-tooltip.hover
                          title="edit"
                          class="badge badge-primary mr-2"
                          @click="bulkListByDraft(props)"
                          v-if="props.rowData.TERMINATION_STATUS == 1"
                        >
                          <i class="fa fa-edit"></i>
                        </span>
                        <span
                          v-b-tooltip.hover
                          title="View"
                          class="badge badge-primary mr-2"
                          v-else
                          @click="viewListPage(props)"
                        >
                          <i class="fa fa-eye"></i>
                        </span>
                      </h4>
                    </template>
                  </va-data-table>
                </va-card>
              </div>
            </template>

            <template v-else>
              <template v-if="!currentConsultant">
                <va-card>
                  <!-- <template v-if="!isBulk">
                      <h4 style="margin-top:0">List of Consultant Termination Submission</h4>
                    </template> -->

                  <template>
                    <h4 style="margin-top: 0">
                      List of Consultant Termination Submission
                    </h4>
                  </template>

                  <div
                    style="
                      display: flex;
                      justify-content: flex-end;
                      align-items: center;
                    "
                  >
                    <div class="flex md3 offset--md3">
                      <div style="display: flex; justify-content: flex-end">
                        <h4
                          v-if="!isBulk"
                          @click="isBulk = true"
                          style="margin: 0; margin-bottom: 10px"
                        >
                          <span
                            v-b-tooltip.hover
                            title="Bulk"
                            class="badge badge-success mr-2"
                          >
                            <i class="fa fa-plus"></i>
                          </span>
                        </h4>
                      </div>

                      <va-input
                        :placeholder="$t('Search')"
                        v-model="search.consultant"
                        removable
                      >
                        <va-icon
                          name="fa fa-search"
                          slot=".consultantprepend"
                        />
                      </va-input>
                    </div>
                  </div>

                  <div class="col-ml-2">
                    <div v-if="isBulk && isDraft">
                      <va-data-table
                        :fields="consultantFields"
                        :data="filteredConsultant"
                        no-data-label="No data found"
                        :per-page="parseInt(perPage)"
                        :datacount="filteredConsultant.length"
                        :dataperpage="parseInt(perPage)"
                        clickable
                      >
                        <template slot="checkbox" slot-scope="props">
                          <b-form-checkbox
                            v-model="props.rowData.STATUS"
                            @change="setCurrentConsultant(props)"
                            :checked="true"
                            :disabled="true"
                          >
                          </b-form-checkbox>
                        </template>

                        <template slot="index" slot-scope="row">
                          {{ row.rowIndex + 1 }}
                        </template>

                        <template slot="ACTION" slot-scope="props">
                          <h4
                            @click="viewCurrentConsultant(props)"
                            style="margin: 0; font-size: 20px"
                          >
                            <span
                              v-b-tooltip.hover
                              title="View"
                              class="badge badge-success mr-2"
                            >
                              <i class="fa fa-eye"></i>
                            </span>
                          </h4>
                        </template>
                      </va-data-table>
                    </div>

                    <!-- CONSULTANT TABLE -->
                    <div v-else>
                      <va-data-table-extended
                        :fields="consultantFields"
                        :data="filteredConsultant"
                        no-data-label="No data found"
                        :per-page="parseInt(perPage)"
                        :datacount="filteredConsultant.length"
                        :dataperpage="parseInt(perPage)"
                        clickable
                        @checkboxToggledAllExtended="toggleCheckboxAll"
                        @checkboxToggledExtended="toggleCheckbox"
                        :track-by="'UNIQUE_CONSULTANT_LICENSE_ID'"
                      >
                        <!-- <template slot="actions" slot-scope="props">
                            <b-form-checkbox
                              v-model="props.rowData.selected"
                              @change="setCurrentConsultant(props)"
                            />
                          </template> -->

                        <template slot="checkbox" slot-scope="props">
                          <b-form-checkbox
                            v-model="props.rowData.STATUS"
                            @change="setCurrentConsultant(props)"
                          >
                          </b-form-checkbox>
                        </template>

                        <template slot="index" slot-scope="row">
                          {{ row.rowIndex + 1 }}
                        </template>

                        <template slot="ACTION" slot-scope="props">
                          <h4 style="margin: 0; font-size: 20px">
                            <span
                              v-b-tooltip.hover
                              title="edit"
                              class="badge badge-primary mr-2"
                              @click="editCurrentConsultant(props)"
                              v-if="props.rowData.TERMINATION_STATUS == 1"
                            >
                              <i class="fa fa-edit"></i>
                            </span>
                            <span
                              v-b-tooltip.hover
                              title="View"
                              class="badge badge-primary mr-2"
                              v-else
                              @click="viewCurrentConsultant(props)"
                            >
                              <i class="fa fa-eye"></i>
                            </span>
                          </h4>
                        </template>
                      </va-data-table-extended>
                    </div>
                  </div>
                </va-card>

                <va-card class="mt-4">
                  <vue-form-generator
                    :model="model"
                    :schema="tabSchema2"
                    :options="formOptions"
                    ref="bulkForm"
                    @model-updated="onModelUpdated"
                    @validated="onValidated"
                  >
                  </vue-form-generator>
                  <br />

                  <div class="float-left">
                    <button
                      @click="resetForm()"
                      type="button"
                      class="btn btn-primary btn-fill btn-md"
                    >
                      <i class="fa fa-step-backward" /> &nbsp; Previous
                    </button>
                  </div>
                  <div class="float-right">
                    <button
                      @click="saveAsDraft"
                      type="button"
                      class="btn btn-info btn-fill btn-md"
                    >
                      <i class="fa fa-edit" /> &nbsp;Save as Draft
                    </button>

                    <button
                      @click="submitTerminationForm"
                      type="button"
                      class="ml-1 btn btn-danger btn-fill btn-md"
                    >
                      <i class="fa fa-ban" /> &nbsp; Terminate
                    </button>
                  </div>
                </va-card>
              </template>

              <template v-else>
                <va-card>
                  <h4 style="margin-top: 0">Consultant Details</h4>
                  <br />
                  <div>
                    <!-- <tabs
                      :tabs="tabs"
                      :currentTab="currentTab"
                      :wrapper-class="'default-tabs'"
                      :tab-class="'default-tabs__item'"
                      :tab-active-class="'default-tabs__item_active'"
                      :line-class="'default-tabs__active-line'"
                      @onClick="handleClick"
                    /> -->

                    <div class="content">
                      <div v-if="currentTab === 'tab1'">
                        <div class="ml-4">
                          <br />
                          <table
                            id="consultant-profile"
                            class="table table-striped"
                          >
                            <tbody>
                              <tr>
                                <td style="width: 25%">Name</td>
                                <td>{{ currentConsultant.CONSULTANT_NAME }}</td>
                              </tr>

                              <tr
                                v-if="
                                  currentConsultant.CONSULTANT_CITIZEN == 286 &&
                                  currentConsultant.CONSULTANT_NRIC
                                "
                              >
                                <td>New NRIC</td>
                                <td>{{ currentConsultant.CONSULTANT_NRIC }}</td>
                              </tr>
                              <tr
                                v-if="
                                  currentConsultant.CONSULTANT_CITIZEN == 286 &&
                                  currentConsultant.CONSULTANT_NRIC_OLD
                                "
                              >
                                <td>Old NRIC Number</td>
                                <td>
                                  {{ currentConsultant.CONSULTANT_NRIC_OLD }}
                                </td>
                              </tr>

                              <tr
                                v-if="
                                  currentConsultant.CONSULTANT_CITIZEN == 287 &&
                                  currentConsultant.CONSULTANT_PASSPORT_NO
                                "
                              >
                                <td>Passport no</td>
                                <td>
                                  {{ currentConsultant.CONSULTANT_PASSPORT_NO }}
                                </td>
                              </tr>

                              <tr
                                v-if="
                                  currentConsultant.CONSULTANT_CITIZEN == 287 &&
                                  currentConsultant.CONSULTANT_PASSPORT_EXPIRY_NO
                                "
                              >
                                <td>Passport Expiry Date</td>
                                <td>
                                  {{
                                    date(
                                      currentConsultant.CONSULTANT_PASSPORT_EXPIRY_NO
                                    )
                                  }}
                                </td>
                              </tr>
                              <tr>
                                <td>Date of Birth</td>
                                <td>
                                  {{ date(currentConsultant.CONSULTANT_DOB) }}
                                </td>
                              </tr>

                              <tr>
                                <td>Race</td>
                                <td>
                                  {{ currentConsultant.CONSULTANT_RACE_VALUE }}
                                  <span
                                    v-if="
                                      currentConsultant.CONSULTANT_RACE_VALUE ==
                                      'OTHERS'
                                    "
                                  >
                                    -
                                    {{
                                      currentConsultant.CONSULTANT_OTHER_RACE
                                    }}</span
                                  >
                                </td>
                              </tr>

                              <tr>
                                <td>Mobile Phone Number</td>
                                <td>
                                  {{ currentConsultant.CONSULTANT_MOBILE_NO }}
                                </td>
                              </tr>

                              <tr>
                                <td>House Number</td>
                                <td>
                                  {{ currentConsultant.CONSULTANT_HOUSE_NO }}
                                </td>
                              </tr>

                              <tr>
                                <td>Email</td>
                                <td>
                                  {{ currentConsultant.CONSULTANT_EMAIL }}
                                </td>
                              </tr>

                              <!-- Correspondent Address -->
                              <tr>
                                <td colspan="4" style="font-weight: bold">
                                  Correspondent Address
                                </td>
                              </tr>

                              <tr>
                                <td>Country</td>
                                <td>
                                  {{ currentConsultant.CORRESPONDENT_COUNTRY }}
                                </td>
                              </tr>
                              <tr>
                                <td>State</td>
                                <td>
                                  {{ currentConsultant.CORRESPONDENT_STATE }}
                                </td>
                              </tr>
                              <tr>
                                <td>City</td>
                                <td>
                                  {{ currentConsultant.CORRESPONDENT_CITY }}
                                </td>
                              </tr>
                              <tr>
                                <td>Postcode</td>
                                <td>
                                  {{ currentConsultant.CORRESPONDENT_POSTAL }}
                                </td>
                              </tr>
                              <tr>
                                <td>Address</td>
                                <td>
                                  {{
                                    currentConsultant.CONSULTANT_CORRESPONDENT_ADDR1
                                  }}
                                </td>
                              </tr>
                              <tr
                                v-if="
                                  currentConsultant.CONSULTANT_CORRESPONDENT_ADDR2
                                "
                              >
                                <td>Address 2</td>
                                <td>
                                  {{
                                    currentConsultant.CONSULTANT_CORRESPONDENT_ADDR2
                                  }}
                                </td>
                              </tr>
                              <tr
                                v-if="
                                  currentConsultant.CONSULTANT_CORRESPONDENT_ADDR3
                                "
                              >
                                <td>Address 3</td>
                                <td>
                                  {{
                                    currentConsultant.CONSULTANT_CORRESPONDENT_ADDR3
                                  }}
                                </td>
                              </tr>
                            </tbody>
                          </table>

                          <!-- <vue-form-generator
                            :model="model"
                            :schema="fileUploadSchema"
                            :options="formOptions"
                            ref="fileUploadForm"
                          >
                          </vue-form-generator> -->
                        </div>
                      </div>
                    </div>
                  </div>

                  <br />
                  <br />
                  <br />

                  <vue-form-generator
                    :model="model"
                    v-if="isEditable"
                    :schema="tabSchema2"
                    :options="formOptions"
                    ref="singleForm"
                    @model-updated="onModelUpdated"
                    @validated="onValidated"
                  >
                  </vue-form-generator>

                  <div class="row" v-else>
                    <div class="col-6">
                      <strong>TERMINATION TYPE</strong><br />
                      {{ currentConsultant.TERMINATION_TYPE }}
                    </div>
                    <div class="col-6">
                      <strong for="">TERMINATION DATE</strong><br />
                      {{ currentConsultant.TERMINATION_DATE }}
                    </div>
                    <div class="col-12 mt-4">
                      <vue-form-generator
                        :model="model"
                        :schema="disabledRemark"
                        :options="formOptions"
                        ref="singleForm"
                        @model-updated="onModelUpdated"
                      >
                      </vue-form-generator>
                    </div>
                  </div>

                  <br />

                  <div class="float-left">
                    <button
                      @click="resetForm()"
                      type="button"
                      class="btn btn-primary btn-fill btn-md"
                    >
                      <i class="fa fa-step-backward" /> &nbsp; Previous
                    </button>
                  </div>
                  <div class="float-right" v-if="isEditable">
                    <button
                      @click="saveAsDraft"
                      type="button"
                      class="btn btn-info btn-fill btn-md"
                    >
                      <i class="fa fa-edit" /> &nbsp;Save as Draft
                    </button>
                    <button
                      @click="submitTerminationForm"
                      type="button"
                      class="ml-1 btn btn-danger btn-fill btn-md"
                    >
                      <i class="fa fa-ban" /> &nbsp; Terminate
                    </button>
                  </div>
                </va-card>
              </template>
            </template>
          </b-overlay>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
import Vudal from "vudal";
import VueFormGenerator from "vue-form-generator";
import "vue-form-generator/dist/vfg-core.css";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
import Vue from "vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

// Import Bootstrap an BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import "vue-horizontal-scroll/dist/vue-horizontal-scroll.css";
import * as services06Module0 from "../../../app/module0/services06";
import moment from "moment";
import { parse } from "vue-currency-input";
import * as servicesmodule0 from "../../../app/module0/services";
import * as servicesmodule2 from "../../../app/module2/services";
import * as services02module2 from "../../../app/module2/services02";
import * as servicesModule3 from "../../../app/module3/services01";
import * as services05module1 from "@/app/module1/services05";
import RepositoryFactory from "../../../repositories/RepositoryFactory";

import Tabs from "vue-tabs-with-active-line";

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
Vue.use(VueFormGenerator);
Vue.component(Vudal);
// register globally
Vue.component("multiselect", Multiselect);
const Termination = RepositoryFactory.get("termination");

/* -------------------------------------------------------------------------- */
/*                            endpointrepositories                            */
/* -------------------------------------------------------------------------- */
// const ConsultantRecord = RepositoryFactory.get('consultantrecord');

export default {
  components: { Tabs },
  data() {
    return {
      show_overlay: false,
      isReady: false,
      tabs: [
        {
          title: "Applicant Profile",
          value: "tab1",
        },
        {
          title: "Type of Applicant",
          value: "tab2",
        },
        {
          title: "Uploaded Document",
          value: "tab3",
        },
        {
          title: "Examination & Bankruptcy Check",
          value: "tab4",
        },
      ],

      currentTab: "tab1",

      terminationType: [
        {
          label: "Misconduct",
          value: 1,
        },
        {
          label: "Resignation",
          value: 2,
        },
        {
          label: "Contractual",
          value: 3,
        },
        {
          label: "Non-renewal",
          value: 4,
        },
        {
          label: "Bankruptcy",
          value: 5,
        },
        {
          label: "Deceased",
          value: 6,
        },
      ],

      formOptions: {
        validateAfterLoad: false,
        validateAfterChanged: true,
        validateAsync: true,
      },

      search: {
        consultant: "",
      },

      isBulk: false,
      isDraft: false,
      isEditable: true,
      current_date: new Date(),
      consultantSubmissionAPI: [],
      consultantsAPI: [],
      consultantsTerminateAPI: [],
      currentConsultant: null,
      draftedTerminationCount: 0,
      draftedTerminationData: [],
      logAPI: [],
      currentPage: 1,
      perPage: "10",
      selectedConsultant: null,
      justificationRequired: false,
      visible: {
        terminationDate: true,
        bankruptcyDate: false,
        bankruptcyDocument: false,
      },
      model: {
        REMARK: "",
        TERMINATION_SUBMISSION_ID: "",
        DIST_ID: "",
        TERMINATION_TYPE: "",
        TERMINATION_DATE: "",
        CONSULTANT_ID: [],
        CONSULTANTS: [],
        TERMINATION_REMARK: "",
        TERMINATION_DOCUMENT: [],
        BANKRUPTCY_DATE: "",
        BANKRUPTCY_DOCUMENT: [],
        CREATE_BY: JSON.parse(localStorage.getItem("user")).user_id,
      },

      tabSchema2: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "vueMultiSelect",
                label: "Termination Type",
                model: "TERMINATION_TYPE",
                placeholder: "Enter Termination Type",
                styleClasses: "col-md-6",
                required: true,
                validator: "required",
                selectOptions: {
                  multiple: false,
                  label: "label",
                  value: "value",
                  searchable: false,
                },
                values: (model, schema) => {
                  return this.terminationType;
                },
              },

              {
                type: "vfg-functional-date2",
                inputType: "date",
                labels: "Termination Date",
                placeholder: "Enter Termination Date",
                model: "TERMINATION_DATE",
                styleClasses: "col-md-6",
                format: "dd-MMM-yyyy",
                required: true,
                validator: "date",
                visible: (model, field, form) => {
                  return this.visible.terminationDate;
                },
              },

              {
                type: "vfg-functional-date2",
                inputType: "date",
                labels: "Bankruptcy Date",
                placeholder: "Enter Bankruptcy Date",
                model: "BANKRUPTCY_DATE",
                styleClasses: "col-md-6",
                format: "dd-MMM-yyyy",
                required: true,
                validator: "date",
                visible: (model, field, form) => {
                  return this.visible.bankruptcyDate;
                },
              },

              {
                theme: "list",
                labels: "Upload Document for Bankruptcy",
                accept: ".pdf",
                multiple: true,
                text: "Choose a File",
                model: "BANKRUPTCY_DOCUMENT",
                type: "vfg-consultant-termination-file",
                styleClasses: "col-md-12",
                hint: "Accepted format : (.pdf)",
                required: false,
                visible: (model, field, form) => {
                  return this.visible.bankruptcyDocument;
                },
              },

              {
                type: "textArea",
                rows: 10,
                max: 1000,
                label: "Remarks / Comments",
                model: "TERMINATION_REMARK",
                validator: "string",
                placeholder: "Enter Remarks or Comments",
                hint: "Max 1000 characters",
                // validator: 'number',
                styleClasses: "col-md-12",
              },
              {
                theme: "list",
                labels: "Upload Document",
                accept: ".pdf",
                multiple: true,
                text: "Choose a File",
                model: "TERMINATION_DOCUMENT",
                type: "vfg-consultant-termination-file",
                styleClasses: "col-md-12",
                hint: "Accepted format : (.pdf)",
                required: false,
              },
            ],
          },
        ],
      },

      disabledRemark: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "textArea",
                rows: 10,
                max: 1000,
                label: "Remarks / Comments",
                hint: "Max 1000 characters",
                model: "TERMINATION_REMARK",
                placeholder: "Enter Remarks or Comments",
                // validator: 'number',
                disabled: true,
              },
              {
                theme: "list",
                labels: "Uploaded Document",
                accept: ".pdf",
                multiple: true,
                text: "Choose a File",
                model: "TERMINATION_DOCUMENT",
                type: "vfg-custom-file-view2",
                required: false,
                disabled: true,
              },
            ],
          },
        ],
      },

      fileUploadSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                accept: ".pdf",
                multiple: true,
                text: "Choose a File",
                model: "PROFILE_UPLOADED_DOCUMENTS",
                type: "vfg-custom-file-view",
                styleClasses: "col-md-12",
                required: false,
                disabled: true,
              },
            ],
          },
        ],
      },
    };
  },

  watch: {
    "model.TERMINATION_TYPE": function (val) {
      if (this.model.TERMINATION_TYPE.value == 1) {
        this.justificationRequired = true;
      } else if (this.model.TERMINATION_TYPE.value == 4) {
        this.justificationRequired = false;
      } else {
        var date1 = moment(this.current_date, "YYYY-MM-DD");
        var date2 = moment(this.model.TERMINATION_DATE, "YYYY-MM-DD");
        var date_diff = moment.duration(date1.diff(date2)).asDays();
        //console.log('Days different', date_diff);
        if (date_diff >= 1) {
          if (
            this.model.TERMINATION_TYPE.value == 2 ||
            this.model.TERMINATION_TYPE.value == 3 ||
            this.model.TERMINATION_TYPE.value == 5 ||
            this.model.TERMINATION_TYPE.value == 6
          ) {
            this.justificationRequired = true;
          }
        } else {
          this.justificationRequired = false;
        }
      }
    },

    "model.TERMINATION_DATE": function (val) {
      var date1 = moment(this.current_date, "YYYY-MM-DD");
      var date2 = moment(this.model.TERMINATION_DATE, "YYYY-MM-DD");
      var date_diff = moment.duration(date1.diff(date2)).asDays();
      //console.log('Days different', date_diff);
      if (date_diff >= 1) {
        if (
          this.model.TERMINATION_TYPE.value == 2 ||
          this.model.TERMINATION_TYPE.value == 3 ||
          this.model.TERMINATION_TYPE.value == 5 ||
          this.model.TERMINATION_TYPE.value == 6
        ) {
          this.justificationRequired = true;
        }
      } else if (this.model.TERMINATION_TYPE.value == 1) {
        this.justificationRequired = true;
      } else {
        this.justificationRequired = false;
      }
    },
  },

  async created() {
    const user_info = JSON.parse(localStorage.getItem("user"));
    this.model.DIST_ID = user_info.USER_DIST_ID;
    this.getConsultantSubmissionList(user_info.USER_DIST_ID);

    // await this.getConsultantRecord().then(res=>{
    //   this.isReady = true;
    // });
    // await this.getTerminationType();
    // await this.getRegistrationStatus();

    // await this.getAllTermination();
    // await this.getAllDistributorCandidateAcceptance();
    // await this.getDocumentByID();

    // this.consultants = await services02module2.getConsultant();
    // await console.log(this.consultants)
  },

  async mounted() {},

  computed: {
    consultantSubmissionFields() {
      return [
        { name: "__slot:index", title: "NO" },
        { name: "SUBMISSION_DATE", title: "SUBMISSION DATE" },
        { name: "TOTAL_CONSULTANT", title: "TOTAL CONSULTANT" },
        { name: "TS_PARAM", title: "STATUS" },
        { name: "__slot:ACTION", title: "ACTION" },
      ];
    },

    consultantFields() {
      if (this.isBulk && !this.isDraft) {
        return [
          {
            name: "__checkbox",
            titleClass: "center aligned",
            dataClass: "center aligned",
          },
          //{ name: '__slot:checkbox', title: 'SELECTED' },
          { name: "__slot:index", title: "NO" },
          { name: "CONSULTANT_NAME", title: "CONSULTANT NAME" },
          { name: "CONSULTANT_NRIC", title: "NRIC NUMBER" },
          { name: "CONSULTANT_PASSPORT_NO", title: "PASSPORT NUMBER" },
          { name: "CONSULTANT_FIMM_NO", title: "FIMM NUMBER" },
          { name: "CONSULTANT_TYPE", title: "CONSULTANT TYPE" },
          { name: "__slot:ACTION", title: "ACTION" },
        ];
      } else if (this.isBulk && this.isDraft) {
        return [
          {
            name: "__slot:checkbox",
            title: "DRAFTED",
          },
          { name: "__slot:index", title: "NO" },
          { name: "CONSULTANT_NAME", title: "CONSULTANT NAME" },
          { name: "CONSULTANT_NRIC", title: "NRIC NUMBER" },
          { name: "CONSULTANT_PASSPORT_NO", title: "PASSPORT NUMBER" },
          { name: "CONSULTANT_FIMM_NO", title: "FIMM NUMBER" },
          { name: "CONSULTANT_TYPE", title: "CONSULTANT TYPE" },
          // { name: 'TERMINATION_TYPE', title: 'TERMINATION TYPE' },
          // { name: 'TERMINATION_DATE', title: 'EFFECTIVE DATE' },
          // { name: 'STATUS', title: 'STATUS' },
          { name: "__slot:ACTION", title: "ACTION" },
        ];
      } else {
        return [
          { name: "__slot:index", title: "NO" },
          { name: "CONSULTANT_NAME", title: "CONSULTANT NAME" },
          { name: "CONSULTANT_NRIC", title: "NRIC NUMBER" },
          { name: "CONSULTANT_PASSPORT_NO", title: "PASSPORT NUMBER" },
          { name: "CONSULTANT_FIMM_NO", title: "FIMM NUMBER" },
          { name: "CONSULTANT_TYPE", title: "CONSULTANT TYPE" },
          { name: "TERMINATION_TYPE", title: "TERMINATION TYPE" },
          { name: "TERMINATION_DATE", title: "EFFECTIVE DATE" },
          { name: "STATUS", title: "STATUS" },
          { name: "__slot:ACTION", title: "ACTION" },
        ];
      }
    },

    // consultants() {
    //   if (this.consultantsAPI) return this.consultantsAPI;
    //   return [];
    // },

    filteredConsultant() {
      if (this.isBulk && !this.isDraft) {
        const search = this.search.consultant.toLowerCase();
        if (this.search && this.consultantsAPI) {
          return this.consultantsAPI.filter((el) => {
            return Object.keys(el).some((key) =>
              `${el[key]}`.toLowerCase().match(search)
            );
          });
        }
        return this.consultantsAPI;
      } else if (this.isBulk && this.isDraft) {
        const search = this.search.consultant.toLowerCase();
        if (this.search && this.draftedTerminationData) {
          return this.draftedTerminationData.filter((el) => {
            return Object.keys(el).some((key) =>
              `${el[key]}`.toLowerCase().match(search)
            );
          });
        }
        return this.draftedTerminationData;
      }

      const search = this.search.consultant.toLowerCase();
      if (this.search && this.consultantsTerminateAPI) {
        return this.consultantsTerminateAPI.filter((el) => {
          return Object.keys(el).some((key) =>
            `${el[key]}`.toLowerCase().match(search)
          );
        });
      }
      return this.consultantsTerminateAPI;
    },

    filteredSubmissionConsultant() {
      // const search = this.search.consultant.toLowerCase();
      // if (this.search) {
      //   return this.consultantsAPI.filter(el => {
      //     return Object.keys(el).some(key => `${el[key]}`.toLowerCase().match(search));
      //   });
      // }

      return this.consultantSubmissionAPI;
    },

    // mappedSelectedConsultantArray() {
    //   if (this.model.CONSULTANT_ID.length)
    //     return this.model.CONSULTANT_ID.map(el => el.CONSULTANT_ID);

    //   return [];
    // },
  },

  methods: {
    getConsultantSubmissionList: async function (distId) {
      this.consultantSubmissionAPI =
        await services02module2.getAllTerminationForAdmin(distId);
      //this.getConsultantsFromTermination();
      this.isReady = true;
    },

    bulkList() {
      this.isBulk = true;
      this.show_overlay = true;
      this.getConsultantRecord(this.model.DIST_ID);
    },

    async getConsultantRecord(id) {
      const response = await services02module2.getConsultantByDistributor(id);
      this.consultantsAPI = response;
      this.show_overlay = false;
    },

    bulkListByDraft(props) {
      this.getDraftedData(
        this.model.DIST_ID,
        props.rowData.TERMINATION_SUBMISSION_ID
      );
      this.isBulk = true;
      this.isDraft = true;
    },

    async viewListPage(props) {
      localStorage.setItem(
        "TERMINATION_STATUS",
        props.rowData.TERMINATION_STATUS
      );
      localStorage.setItem(
        "SUBMISSION_ID",
        props.rowData.TERMINATION_SUBMISSION_ID
      );
      this.$router.push(
        "/distributor/consultant-termination-viewList-Distributor"
      );
    },

    async getDraftedData(DIST_ID, SUBMISSION_ID) {
      const response =
        await services02module2.getAllDraftedTerminationDistAdmin(
          DIST_ID,
          SUBMISSION_ID
        );
      this.draftedTerminationData = response;
      this.draftedTerminationCount = response.length;

      response.forEach((element) => {

        //Get Termination Document
        if (element.TERMINATION_ID) {
          this.getTerminationDocument(
            element.TERMINATION_ID,
            "TERMINATION_DOCUMENT"
          );
        }

        //Get Bankruptcy Document
        this.getBankruptcyDocument(
          element.TERMINATION_ID,
          "BANKRUPTCY_DOCUMENT"
        );


        this.model.CONSULTANTS.push({
          CONSULTANT_ID: element.CONSULTANT_ID,
          CONSULTANT_TYPE_ID: element.CONSULTANT_TYPE_ID,
        });
        this.model.TERMINATION_DATE=element.TERMINATION_DATE;
        this.model.BANKRUPTCY_DATE=element.BANKRUPTCY_DATE;
        this.model.TERMINATION_REMARK=element.TERMINATION_REMARK;
        this.model.TERMINATION_SUBMISSION_ID=element.TERMINATION_SUBMISSION_ID;

        if(element.TERMINATION_TYPE==1){
          this.model.TERMINATION_TYPE={
            label: 'Resignation',
            value: 2,
          };
        }
        else if(element.TERMINATION_TYPE==2){
          this.model.TERMINATION_TYPE={
            label: 'Misconduct',
            value: 1,
          };
        }
        else if(element.TERMINATION_TYPE==3){
          this.model.TERMINATION_TYPE={
            label: 'Contractual',
            value: 3,
          };
        }
        else if(element.TERMINATION_TYPE==4){
          this.model.TERMINATION_TYPE={
            label: 'Non-renewal',
            value: 4,
          };
        }
        else if(element.TERMINATION_TYPE==5){
          this.model.TERMINATION_TYPE={
            label: 'Bankruptcy',
            value: 5,
          };
          this.visible.bankruptcyDate = true;
          this.visible.bankruptcyDocument = true;
        }
        else if(element.TERMINATION_TYPE==6){
          this.model.TERMINATION_TYPE={
            label: 'Deceased',
            value: 6,
          };
        }
      });
    },

    back() {
      this.$router.push(
        "/distributor/consultant-termination-statusList-Distributor"
      );
    },

    resetForm() {
      if (this.isBulk && this.currentConsultant) {
        this.isBulk = true;
      } else if (this.isBulk && this.isDraft && this.currentConsultant) {
        this.isBulk = true;
      } else {
        this.isBulk = false;
        this.isDraft = false;
      }
      this.currentConsultant = null;
      this.model.REMARK = "";
      this.model.TERMINATION_SUBMISSION_ID = "";
      this.model.TERMINATION_TYPE = "";
      this.model.TERMINATION_DATE = "";
      this.model.CONSULTANT_ID = [];
      this.model.CONSULTANTS = [];
      this.model.TERMINATION_REMARK = "";
      this.model.TERMINATION_DOCUMENT = [];
      this.model.BANKRUPTCY_DATE = "";
      this.model.BANKRUPTCY_DOCUMENT = [];
    },

    handleClick(newTab) {
      this.currentTab = newTab;
    },

    date: function (date) {
      return moment(date).format("DD-MMM-yyyy");
    },

    getRegistrationStatus: async function () {
      const response = await services02module2.registrationStatus();
    },

    getTerminationRecords: async function (id) {
      const response = await services02module2.getTerminationByConsultantID(id);
      if (response) {
        this.model.TERMINATION_TYPE = response.TERMINATION_TYPE;
        this.model.TERMINATION_REMARK = response.TERMINATION_REMARK;
        this.model.TERMINATION_DATE = response.TERMINATION_DATE;
      }
      console.log("getTerminationRecords: ", response);
    },

    // async getAllDistributorCandidateAcceptance() {
    //   console.log('inside get consultant record');
    //   const response = await DistributorCandidateAcceptance.getAllDistributorCandidateAcceptance();
    //   console.log('distributor candidate acceptance: ', response.data.data);

    //   // this.isBusy = false;
    //   console.log(this.consultantsAPI);
    // },

    async getTerminationType() {
      const response = await services02module2.getTerminationType();
      console.log("get Termination Type: ", response);
    },

    async getConsultantsFromTermination() {
      const response = await services02module2.getConsultantsFromTermination();
      this.consultantsTerminateAPI = response;
      this.isReady = true;
      //console.log('getConsultantsFromTermination: ', response.data.data);
    },

    async getAllTermination() {
      const termination = await services02module2.getAllTermination();
      console.log("this is termination", termination.data.data);
    },

    editCurrentConsultant(props) {
      this.isEditable = true;
      this.currentConsultant = props.rowData;
      this.model.TERMINATION_REMARK = props.rowData.TERMINATION_REMARK;
      this.model.TERMINATION_DATE = props.rowData.TERMINATION_DATE;
      this.model.BANKRUPTCY_DATE = props.rowData.BANKRUPTCY_DATE;
      if (props.rowData.TERMINATION_TYPE_ID == 1) {
        this.model.TERMINATION_TYPE = {
          label: "Misconduct",
          value: 1,
        };
      } else if (props.rowData.TERMINATION_TYPE_ID == 2) {
        this.model.TERMINATION_TYPE = {
          label: "Resignation",
          value: 2,
        };
      } else if (props.rowData.TERMINATION_TYPE_ID == 3) {
        this.model.TERMINATION_TYPE = {
          label: "Contractual",
          value: 3,
        };
      } else if (props.rowData.TERMINATION_TYPE_ID == 4) {
        this.model.TERMINATION_TYPE = {
          label: "Non-renewal",
          value: 4,
        };
      } else if (props.rowData.TERMINATION_TYPE_ID == 5) {
        this.model.TERMINATION_TYPE = {
          label: "Bankruptcy",
          value: 5,
        };
        this.visible.bankruptcyDate = true;
        this.visible.bankruptcyDocument = true;
      } else if (props.rowData.TERMINATION_TYPE_ID == 6) {
        this.model.TERMINATION_TYPE = {
          label: "Deceased",
          value: 6,
        };
      }
      this.model.CONSULTANTS = [];
      this.model.TERMINATION_DOCUMENT = [];
      this.model.CONSULTANTS.push({
        CONSULTANT_ID: props.rowData.CONSULTANT_ID,
        CONSULTANT_TYPE_ID: props.rowData.CONSULTANT_TYPE_ID,
      });
      //Get Termination Document
      if (props.rowData.TERMINATION_ID) {
        this.getTerminationDocument(
          props.rowData.TERMINATION_ID,
          "TERMINATION_DOCUMENT"
        );
      }
      // this.getTerminationRecords(this.currentConsultant.CONSULTANT_ID)
      // localStorage.setItem('currentConsultant',JSON.stringify(props.rowData));
    },

    viewCurrentConsultant(props) {
      if (
        this.isBulk ||
        props.rowData.TERMINATION_STATUS == 5 ||
        props.rowData.TERMINATION_STATUS == 7
      ) {
        this.isEditable = true;
      } else {
        this.isEditable = false;
      }
      this.currentConsultant = props.rowData;
      this.model.TERMINATION_REMARK = props.rowData.TERMINATION_REMARK;
      this.model.TERMINATION_DATE = props.rowData.TERMINATION_DATE;
      this.model.BANKRUPTCY_DATE = props.rowData.BANKRUPTCY_DATE;
      if (props.rowData.TERMINATION_TYPE_ID == 1) {
        this.model.TERMINATION_TYPE = {
          label: "Misconduct",
          value: 1,
        };
      } else if (props.rowData.TERMINATION_TYPE_ID == 2) {
        this.model.TERMINATION_TYPE = {
          label: "Resignation",
          value: 2,
        };
      } else if (props.rowData.TERMINATION_TYPE_ID == 3) {
        this.model.TERMINATION_TYPE = {
          label: "Contractual",
          value: 3,
        };
      } else if (props.rowData.TERMINATION_TYPE_ID == 4) {
        this.model.TERMINATION_TYPE = {
          label: "Non-renewal",
          value: 4,
        };
      } else if (props.rowData.TERMINATION_TYPE_ID == 5) {
        this.model.TERMINATION_TYPE = {
          label: "Bankruptcy",
          value: 5,
        };
        this.visible.bankruptcyDate = true;
        this.visible.bankruptcyDocument = true;
        //Get Bankruptcy Document
        this.getBankruptcyDocument(
          props.rowData.TERMINATION_ID,
          "BANKRUPTCY_DOCUMENT"
        );
      } else if (props.rowData.TERMINATION_TYPE_ID == 6) {
        this.model.TERMINATION_TYPE = {
          label: "Deceased",
          value: 6,
        };
      }
      this.model.CONSULTANTS = [];
      this.model.TERMINATION_DOCUMENT = [];
      this.model.CONSULTANTS.push({
        CONSULTANT_ID: props.rowData.CONSULTANT_ID,
        CONSULTANT_TYPE_ID: props.rowData.CONSULTANT_TYPE_ID,
      });
      //Get Termination Document
      if (props.rowData.TERMINATION_ID) {
        this.getTerminationDocument(
          props.rowData.TERMINATION_ID,
          "TERMINATION_DOCUMENT"
        );
      }
      // this.getTerminationRecords(this.currentConsultant.CONSULTANT_ID)
      // localStorage.setItem('currentConsultant',JSON.stringify(props.rowData));
    },

    setCurrentConsultant(props) {
      if (this.draftedTerminationCount != 0) {
        alert("You have already drafted termination!");
        this.$router.go();
      } else {
        const index = this.model.CONSULTANT_ID.findIndex(
          (el) => el === props.rowData.CONSULTANT_ID
        );

        if (index >= 0) {
          this.model.CONSULTANT_ID.splice(index, 1);
        } else {
          this.model.CONSULTANT_ID.push(props.rowData.CONSULTANT_ID);
        }
        console.log(this.model.CONSULTANT_ID);
      }
    },

    toggleCheckboxAll(isChecked) {
      const consultant_id = this.consultantsAPI.reduce((acc, element) => {
        return acc.concat({
          CONSULTANT_ID: element.CONSULTANT_ID,
          CONSULTANT_TYPE_ID: element.CONSULTANT_TYPE_ID,
        });
      }, []);

      this.model.CONSULTANTS = isChecked ? consultant_id : [];
    },

    toggleCheckbox(payload) {
      const { fieldName, isChecked } = payload;

      if (!isChecked) {
        const elIndex = this.model.CONSULTANTS.findIndex((x) => {
          return x.CONSULTANT_ID === fieldName.CONSULTANT_ID;
        });

        if (elIndex > -1) {
          this.model.CONSULTANTS.splice(elIndex, 1);
        }
      } else {
        this.model.CONSULTANTS.push({
          CONSULTANT_ID: fieldName.CONSULTANT_ID,
          CONSULTANT_TYPE_ID: fieldName.CONSULTANT_TYPE_ID,
        });
      }
    },

    // toggleCheckbox(payload){
    //   const {fieldName,isChecked} = payload
    //   const consultId = fieldName.CONSULTANT_ID

    //   if(!isChecked){
    //       const elIndex = this.model.CONSULTANT_ID.findIndex(x => {
    //         return x === fieldName.CONSULTANT_ID
    //       })
    //       if(elIndex > -1){
    //         this.model.CONSULTANT_ID.splice(elIndex,1)
    //       }
    //   }else{
    //     this.model.CONSULTANT_ID.push(fieldName.CONSULTANT_ID)
    //   }
    // },

    onModelUpdated(newVal, schema) {
      if (schema == "TERMINATION_TYPE") {
        this.visible.bankruptcyDate = false;
        this.visible.bankruptcyDocument = false;
        if (newVal.value == 5) {
          this.visible.bankruptcyDate = true;
          this.visible.bankruptcyDocument = true;
        } else {
          this.visible.bankruptcyDate = false;
          this.visible.bankruptcyDocument = false;
        }
      }
    },

    validateBulkForm() {
      return this.$refs["bulkForm"].validate();
    },
    validateSingleForm() {
      return this.$refs["singleForm"].validate();
    },

    onValidated(isValid, errors) {
      //console.log("Validation result: ", isValid, ", Errors:", errors);
    },

    getTerminationDocument: async function (termination_id, tablename) {
      const response = await Termination.getTerminationDocumentByID(
        termination_id,
        tablename
      );
      response.forEach((element) => {
        element.DOC_BLOB = this.b64toBlobPDF(
          element.DOC_BLOB,
          "application/pdf"
        );
        //console.log(element.DOC_BLOB); // <----- cuba tgk ini
        element.DOC_BLOB = new File(
          [element.DOC_BLOB],
          element.DOC_ORIGINAL_NAME + "." + element.DOC_FILETYPE,
          { type: element.DOC_BLOB.type }
        );
        const data = {
          docID: element.TERMINATION_DOCUMENT_ID,
          name:
            element.DOC_ORIGINAL_NAME +
            " - By " +
            element.CREATE_BY +
            "." +
            element.DOC_FILETYPE,
          size: element.DOC_FILESIZE,
          type: element.DOC_FILETYPE,
          ext: "exe",
          url: window.URL.createObjectURL(element.DOC_BLOB),
        };
        this.model.TERMINATION_DOCUMENT.push(data);
      });
    },

    getBankruptcyDocument: async function (termination_id, tablename) {
      const response = await Termination.getTerminationDocumentByID(
        termination_id,
        tablename
      );
      response.forEach((element) => {
        element.DOC_BLOB = this.b64toBlobPDF(
          element.DOC_BLOB,
          "application/pdf"
        );
        //console.log(element.DOC_BLOB); // <----- cuba tgk ini
        element.DOC_BLOB = new File(
          [element.DOC_BLOB],
          element.DOC_ORIGINAL_NAME + "." + element.DOC_FILETYPE,
          { type: element.DOC_BLOB.type }
        );
        const data = {
          docID: element.TERMINATION_DOCUMENT_ID,
          name:
            element.DOC_ORIGINAL_NAME +
            " - By " +
            element.CREATE_BY +
            "." +
            element.DOC_FILETYPE,
          size: element.DOC_FILESIZE,
          type: element.DOC_FILETYPE,
          ext: "exe",
          url: window.URL.createObjectURL(element.DOC_BLOB),
        };
        this.model.BANKRUPTCY_DOCUMENT.push(data);
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

      console.log(byteArrays);

      return new File(byteArrays, "pot", { type: contentType });
    },

    saveAsDraft: async function () {
      if (this.model.CONSULTANTS.length > 0) {
        if (confirm("Are you sure you want to save as draft?")) {
          this.show_overlay = true;
          const data = new FormData();
          data.append("TERMINATION_STATUS", 1);
          data.append("CONSULTANTS", JSON.stringify(this.model.CONSULTANTS));
          data.append("DIST_ID", this.model.DIST_ID);
          data.append("CREATE_BY", this.model.CREATE_BY);
          data.append("PUBLISH_STATUS", 0);
          data.append("APPROVAL_STATUS", 0);
          data.append(
            "TERMINATION_REMARK",
            this.model.TERMINATION_REMARK ? this.model.TERMINATION_REMARK : ""
          );
          data.append(
            "TERMINATION_SUBMISSION_ID",
            this.model.TERMINATION_SUBMISSION_ID
          );
          data.append(
            "TERMINATION_DATE",
            this.model.TERMINATION_DATE
              ? moment(this.model.TERMINATION_DATE).format("YYYY-MM-DD")
              : ""
          );
          data.append(
            "BANKRUPTCY_DATE",
            this.model.BANKRUPTCY_DATE
              ? moment(this.model.BANKRUPTCY_DATE).format("YYYY-MM-DD")
              : ""
          );
          data.append(
            "TERMINATION_TYPE",
            this.model.TERMINATION_TYPE ? this.model.TERMINATION_TYPE.value : ""
          );
          data.append("TYPE", "DISTRIBUTOR");
          for (let i = 0; i < this.model.TERMINATION_DOCUMENT.length; i++) {
            data.append(
              "TERMINATION_DOCUMENT[]",
              this.model.TERMINATION_DOCUMENT[i]
            );
          }
          for (let i = 0; i < this.model.BANKRUPTCY_DOCUMENT.length; i++) {
            data.append(
              "BANKRUPTCY_DOCUMENT[]",
              this.model.BANKRUPTCY_DOCUMENT[i]
            );
          }

          if (
            this.model.TERMINATION_TYPE == "" ||
            this.model.TERMINATION_TYPE == null
          ) {
            Vue.$toast.open({
              message: "Please select anyone Termination type.",
              type: "error",
            });
            this.show_overlay = false;
          } else {
            const response = await Termination.postTermination(data);
            this.show_overlay = false;

            if (response == "error") {
              this.isBulk = true;
            } else {
              //this.$router.go();
              this.resetForm();
              this.isBulk = false;
            }

            await this.getConsultantSubmissionList(this.model.DIST_ID);
          }
        }
      } else {
        alert("Please select consultants for action");
      }
    },

    submitTerminationForm: async function () {
      if (this.model.CONSULTANTS.length > 0) {
        if (confirm("Are you sure to terminate?")) {
          this.show_overlay = true;
          const data = new FormData();
          data.append("TERMINATION_STATUS", 15);
          data.append("CONSULTANTS", JSON.stringify(this.model.CONSULTANTS));
          data.append("DIST_ID", this.model.DIST_ID);
          data.append("CREATE_BY", this.model.CREATE_BY);
          data.append("PUBLISH_STATUS", 1);
          data.append("APPROVAL_STATUS", 15);
          data.append(
            "TERMINATION_REMARK",
            this.model.TERMINATION_REMARK ? this.model.TERMINATION_REMARK : ""
          );
          data.append(
            "TERMINATION_SUBMISSION_ID",
            this.model.TERMINATION_SUBMISSION_ID
          );
          data.append(
            "TERMINATION_DATE",
            this.model.TERMINATION_DATE
              ? moment(this.model.TERMINATION_DATE).format("YYYY-MM-DD")
              : ""
          );
          data.append(
            "BANKRUPTCY_DATE",
            this.model.BANKRUPTCY_DATE
              ? moment(this.model.BANKRUPTCY_DATE).format("YYYY-MM-DD")
              : ""
          );
          data.append(
            "TERMINATION_TYPE",
            this.model.TERMINATION_TYPE ? this.model.TERMINATION_TYPE.value : ""
          );
          data.append("TERMINATION_BY", "DISTRIBUTOR");
          data.append("DISTRIBUTOR", true);
          for (let i = 0; i < this.model.TERMINATION_DOCUMENT.length; i++) {
            data.append(
              "TERMINATION_DOCUMENT[]",
              this.model.TERMINATION_DOCUMENT[i]
            );
          }
          for (let i = 0; i < this.model.BANKRUPTCY_DOCUMENT.length; i++) {
            data.append(
              "BANKRUPTCY_DOCUMENT[]",
              this.model.BANKRUPTCY_DOCUMENT[i]
            );
          }

          if (
            this.model.TERMINATION_TYPE == "" ||
            this.model.TERMINATION_TYPE == null
          ) {
            Vue.$toast.open({
              message: "Please select anyone Termination type.",
              type: "error",
            });

            this.show_overlay = false;
          } else if (
            this.model.TERMINATION_DATE == "" ||
            this.model.TERMINATION_DATE == null
          ) {
            Vue.$toast.open({
              message: "Please enter termination date",
              type: "error",
            });
            this.show_overlay = false;
          } else if (
            this.justificationRequired == true &&
            (this.model.TERMINATION_REMARK == "" ||
              this.model.TERMINATION_REMARK == null)
          ) {
            if (this.model.TERMINATION_TYPE.value != 1) {
              Vue.$toast.open({
                message:
                  "Please write justification remark on late submission.",
                type: "error",
              });
            } else {
              Vue.$toast.open({
                message: "Please elaborate the misconduct involve in remarks.",
                type: "error",
              });
            }
            this.show_overlay = false;
          } else {
            //(processflowID,approval_level_index)
            const approvalLevel =
              await services06Module0.getApprovalLevelDistributor(9, 2);
            data.append("APPR_LIST", JSON.stringify(approvalLevel));

            //dashboard notification
            data.append("NOTI_LOCATION", "consultant-termination-Second_Level");
            data.append(
              "NOTI_REMARK",
              "(CONSULTANT-TERMINATION) New entry pending for Approval"
            );

            const response = await Termination.postTermination(data);
            this.show_overlay = false;

            if (response == "error") {
              this.isBulk = true;
            } else {
              this.resetForm();
              this.isBulk = false;
              //this.$router.go();
            }

            await this.getConsultantSubmissionList(this.model.DIST_ID);
          }
        }
      } else {
        alert("Please select consultants for action");
      }
    },
  },
};
</script>

<style scoped>
a {
  margin-left: 15px;
}
</style>

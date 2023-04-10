<template>
  <div class="">
    <div class="">
      <div class="row">
        <div class="col-12">
          <template v-if="!currentDistributor">
            <div v-if="!isReady" style="margin-top: 25%">
              <div class="text-center text-success my-2" >
                <b-spinner class="align-middle mr-2"></b-spinner>
                <strong>Loading...</strong>
              </div>
            </div>

            <va-card  v-else>
              <div>
                <template v-if="!isBulk">
                  <h4 style="margin-top:0">List of Consultant Termination</h4>
                </template>
                <template v-else>
                  <h4 style="margin-top:0">List of Distributor</h4>
                </template>

                <div style="display:flex; justify-content:flex-end; align-items:center">
                  <div class="flex md3 offset--md3">
                    <div style="display:flex; justify-content:flex-end">
                      <h4
                        v-if="!isBulk"
                        @click="isBulk = true"
                        style="margin:0; margin-bottom:10px; "
                      >
                        <span v-b-tooltip.hover title="Bulk" class="badge badge-success mr-2">
                          <i class="fa fa-plus"></i>
                        </span>
                      </h4>
                    </div>
                    <va-input :placeholder="$t('Search')" v-model="search.distributor" removable>
                      <va-icon name="fa fa-search" slot="prepend" />
                    </va-input>
                  </div>
                </div>

                <!-- DISTRIBUTOR TABLE -->
                <va-data-table
                  :fields="distributorFields"
                  :data="filteredDistributor"
                  no-data-label="No data found"
                  :per-page="parseInt(perPage)"
                  :datacount="filteredDistributor.length"
                  :dataperpage="parseInt(perPage)"
                  clickable
                >
                  <template slot="index" slot-scope="row">
                    {{ row.rowIndex + 1 }}
                  </template>

                  <template slot="ACTION" slot-scope="props">
                    <template v-if="!isBulk">
                      <h4 @click="setCurrentDistributor(props)" style="margin:0; font-size:20px">
                        <span v-b-tooltip.hover title="View" class="badge badge-primary mr-2">
                          <i class="fa fa-eye"></i>
                        </span>
                      </h4>
                    </template>
                    <template v-else>
                      <h4 @click="setCurrentDistributor(props)" style="margin:0; font-size:20px">
                        <span v-b-tooltip.hover title="View" class="badge badge-primary mr-2">
                          <i class="fa fa-plus"></i>
                        </span>
                      </h4>
                    </template>
                  </template>
                </va-data-table>

                <br />

                <div v-if="isBulk" class="float-left">
                  <button
                    @click="isBulk = false"
                    type="button"
                    class="btn btn-primary btn-fill btn-md"
                  >
                    <i class="fa fa-step-backward" /> &nbsp; Previous
                  </button>
                </div>
              </div>
            </va-card>
          </template>

          <template v-else>
            <template v-if="!currentConsultant">
              <va-card>
                <template v-if="isBulk">
                  <h4 style="margin-top:0px; margin-bottom:20px">
                    List of Consultant Termination
                  </h4>
                </template>
                <template v-else>
                  <h4 style="margin-top:0px; margin-bottom:20px">
                    List of Consultant Termination Submission
                  </h4>
                </template>

                <p style="margin:0; font-size: 1.1rem">
                  DISTRIBUTOR NAME - {{ currentDistributor.toUpperCase() }}
                </p>
                <div style="display:flex; justify-content:flex-end; align-items:center">
                  <div class="flex md3 offset--md3">
                    <va-input :placeholder="$t('Search')" v-model="search.consultant" removable>
                      <va-icon name="fa fa-search" slot="prepend" />
                    </va-input>
                  </div>
                </div>

                <!-- CONSULTANT TABLE -->
                <!-- select-mode="single" -->
                <va-data-table
                  :fields="consultantFields"
                  :data="filteredConsultant"
                  no-data-label="No data found"
                  :per-page="parseInt(perPage)"
                  :datacount="filteredConsultant.length"
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
                    <h4 @click="viewCurrentConsultant(props)" style="margin:0; font-size:20px">
                      <span v-b-tooltip.hover title="View" class="badge badge-success mr-2">
                        <i class="fa fa-eye"></i>
                      </span>
                    </h4>
                  </template>
                </va-data-table>
                <br />
                
                <template v-if="isBulk">
                  <vue-form-generator
                    :model="model"
                    :schema="tabSchema2"
                    :options="formOptions"
                    ref="bulkForm"
                    @model-updated="onModelUpdated"
                  >
                  </vue-form-generator>

                  <br />

                  <div class="float-left">
                    <button
                      @click="currentDistributor = false"
                      type="button"
                      class="btn btn-primary btn-fill btn-md"
                    >
                      <i class="fa fa-step-backward" /> &nbsp; Previous
                    </button>
                  </div>

                  <div class="float-right">
                    <button @click="saveAsDraft" type="button" class="btn btn-info btn-fill btn-md">
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
                </template>

                <template v-else>
                  <div class="float-left">
                    <button
                      @click="currentDistributor = false"
                      type="button"
                      class="btn btn-primary btn-fill btn-md"
                    >
                      <i class="fa fa-step-backward" /> &nbsp; Previous
                    </button>
                  </div>
                </template>
              </va-card>
            </template>
            
            <template v-else>
              <va-card>
                <h4 style="margin-top:0">Consultant Details</h4>
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
                        <table id="consultant-profile" class="table table-striped">
                          <tbody>
                            <tr>
                              <td style="width: 15%">Name</td>
                              <td>{{ currentConsultant.CONSULTANT_NAME }}</td>
                            </tr>
                            <tr>
                              <td>New NRIC</td>
                              <td>{{ currentConsultant.CONSULTANT_NRIC }}</td>
                            </tr>
                            <tr>
                              <td>Date of Birth</td>
                              <td>{{ currentConsultant.CONSULTANT_DOB }}</td>
                            </tr>

                            <tr>
                              <td>Address</td>
                              <td>{{ currentConsultant.CONSULTANT_CORRESPONDENT_ADDR1 }}</td>
                            </tr>
                            <tr>
                              <td>Postcode</td>
                              <td>{{ currentConsultant.CONSULTANT_CORRESPONDENT_POSTAL }}</td>
                            </tr>
                            <tr>
                              <td>City</td>
                              <td>{{ currentConsultant.CONSULTANT_CORRESPONDENT_CITY }}</td>
                            </tr>
                            <tr>
                              <td>State</td>
                              <td>{{ currentConsultant.CONSULTANT_CORRESPONDENT_STATE }}</td>
                            </tr>
                            <tr>
                              <td>Telephone Number</td>
                              <td>{{ currentConsultant.CONSULTANT_PHONENO }}</td>
                            </tr>
                            <tr>
                              <td>Email</td>
                              <td>{{ currentConsultant.CONSULTANT_EMAIL }}</td>
                            </tr>
                            <tr>
                              <td>Highest Qualification</td>
                              <td>{{ currentConsultant.CONSULTANT_HIGHEST_QUALIFICATION }}</td>
                            </tr>
                            <tr>
                              <td>Examination Type</td>
                              <td>{{ currentConsultant.COURSE_TYPE }}</td>
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
                  :schema="tabSchema2"
                  :options="formOptions"
                  ref="singleForm"
                  @model-updated="onModelUpdated"
                >
                </vue-form-generator>

                <br />

                <div class="float-left">
                  <button
                    @click="
                      currentConsultant = null;
                      model.PROFILE_UPLOADED_DOCUMENTS = null;
                    "
                    type="button"
                    class="btn btn-primary btn-fill btn-md"
                  >
                    <i class="fa fa-step-backward" /> &nbsp; Previous
                  </button>
                </div>
                <div class="float-right">
                  <button @click="saveAsDraft" type="button" class="btn btn-info btn-fill btn-md">
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
              <!-- <va-card>
                <h4 style="margin-top:0">Consultant Details</h4>
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
                  <div class="content">
                    <div v-if="currentTab === 'tab1'">
                      <div class="ml-4">
                        <br />
                        <table id="consultant-profile" class="table table-striped">
                          <tbody>
                            <tr>
                              <td style="width: 15%">Name</td>
                              <td>{{ currentConsultant.CONSULTANT_NAME }}</td>
                            </tr>
                            <tr>
                              <td>New NRIC</td>
                              <td>{{ currentConsultant.CONSULTANT_NRIC }}</td>
                            </tr>
                            <tr>
                              <td>Date of Birth</td>
                              <td>{{ currentConsultant.CONSULTANT_DOB }}</td>
                            </tr>

                            <tr>
                              <td>Address</td>
                              <td>{{ currentConsultant.CONSULTANT_CORRESPONDENT_ADDR1 }}</td>
                            </tr>
                            <tr>
                              <td>Postcode</td>
                              <td>{{ currentConsultant.CONSULTANT_CORRESPONDENT_POSTAL }}</td>
                            </tr>
                            <tr>
                              <td>City</td>
                              <td>{{ currentConsultant.CONSULTANT_CORRESPONDENT_CITY }}</td>
                            </tr>
                            <tr>
                              <td>State</td>
                              <td>{{ currentConsultant.CONSULTANT_CORRESPONDENT_STATE }}</td>
                            </tr>
                            <tr>
                              <td>Telephone Number</td>
                              <td>{{ currentConsultant.CONSULTANT_MOBILE_NO }}</td>
                            </tr>
                            <tr>
                              <td>Email</td>
                              <td>{{ currentConsultant.CONSULTANT_EMAIL }}</td>
                            </tr>
                            <tr>
                              <td>Highest Qualification</td>
                              <td>{{ currentConsultant.CONSULTANT_HIGHEST_QUALIFICATION }}</td>
                            </tr>
                            <tr>
                              <td>Consultant Status</td>
                              <td></td>
                            </tr>
                          </tbody>
                        </table>
                        <vue-form-generator
                          :model="model"
                          :schema="fileUploadSchema"
                          :options="formOptions"
                          ref="fileUploadForm"
                        >
                        </vue-form-generator>
                      </div>
                    </div>
                    <div v-if="currentTab === 'tab2'">
                      <div class="ml-4">
                        <br />
                        <table class="table table-striped">
                          <tbody>
                            <tr>
                              <td style="width: 15%">Category</td>
                              <td>{{ currentConsultant.CATEGORY }}</td>
                            </tr>
                            <tr>
                              <td>Apprienticeship Program</td>
                              <td>Yes</td>
                            </tr>
                            <tr>
                              <td>Company Distributor</td>
                              <td>{{ currentConsultant.DISTRIBUTOR }}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div v-if="currentTab === 'tab3'">
                      <div class="ml-4">
                        <br />
                        <table class="table table-striped">
                          <tbody>
                            <tr style="width: 100%">
                              <vue-form-generator
                                :model="model"
                                :schema="fileUploadSchema"
                                :options="formOptions"
                                ref="fileUploadForm"
                              >
                              </vue-form-generator>
                            </tr>
                             <tr>
                            <th>No</th>
                            <th>Document</th>
                          </tr>
               <tr>
                            <td>1</td>
                            <td>
                              Cover letter for Former and Variation PRS consultant
                              <a
                                href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
                                target="_blank"
                              >
                                View</a
                              >
                            </td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td>
                              Letter of Undertaking for variation due to Merger
                              <a
                                href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
                                target="_blank"
                              >
                                View</a
                              >
                            </td>
                          </tr>
                          <tr>
                            <td>3</td>
                            <td>
                              Printed online application
                              <a
                                href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
                                target="_blank"
                              >
                                View</a
                              >
                            </td>
                          </tr>
                          <tr>
                            <td>4</td>
                            <td>
                              Statutory Declaration
                              <a
                                href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
                                target="_blank"
                              >
                                View</a
                              >
                            </td>
                          </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div v-if="currentTab === 'tab4'">
                      <div class="ml-3">
                        <br />
                        <table class="table table-striped">
                          <tbody>
                            <tr>
                              <td style="width: 15%">Examination Type</td>
                              <td>CUTE</td>
                            </tr>

                            <tr>
                              <td>Result</td>
                              <td>
                                FAIL
                              </td>
                            </tr>
                            <tr>
                              <td>
                                Certificate
                              </td>
                              <td>
                                Not Available
                                <a
                                  href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
                                  target="_blank"
                                >
                                  View</a
                                >
                              </td>
                            </tr>
                            <tr>
                              <td>
                                Bankruptcy Check
                              </td>
                              <td>
                                Pass
                                <a
                                  href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
                                  target="_blank"
                                >
                                  View</a
                                >
                              </td>
                            </tr>
                            <tr>
                              <td>
                                Bankruptcy Remark
                              </td>
                              <td>
                                Insert remark here
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </va-card>
              <br />
              <va-card>
                <h4 style="margin-top:0">Termination Request Form</h4>
                <br />

                <vue-form-generator
                  :model="model"
                  :schema="tabSchema2"
                  :options="formOptions"
                  ref="tabForm2"
                  @model-updated="onModelUpdated"
                  @validated="onValidated"
                >
                </vue-form-generator>
                <br />

                <div class="float-left">
                  <button
                    @click="currentConsultant = null"
                    type="button"
                    class="btn btn-primary btn-fill btn-md"
                  >
                    <i class="fa fa-step-backward" /> &nbsp; Previous
                  </button>
                </div>
                <div class="float-right">
                  <button
                    @click="submitTerminationForm"
                    type="button"
                    class="ml-1 btn btn-danger btn-fill btn-md"
                  >
                    <i class="fa fa-paper-plane" /> &nbsp; Terminate
                  </button>
                </div>
              </va-card> -->
            </template>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect';
import Vudal from 'vudal';
import VueFormGenerator from 'vue-form-generator';
import 'vue-form-generator/dist/vfg-core.css';
import VueFormWizard from 'vue-form-wizard';
import 'vue-form-wizard/dist/vue-form-wizard.min.css';
import Vue from 'vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import HorizontalScroll from 'vue-horizontal-scroll';
import 'vue-horizontal-scroll/dist/vue-horizontal-scroll.css';
import * as services06Module0 from '../../../../../app/module0/services06';
import moment from 'moment';
import * as servicesmodule0 from '../../../../../app/module0/services';
import * as servicesmodule2 from '../../../../../app/module2/services';
import * as services02module2 from '../../../../../app/module2/services02';
import RepositoryFactory from '../../../../../repositories/RepositoryFactory';
import TerminationRepository from '../../../../../repositories/module2/TerminationRepository';
import * as servicesModule3 from '../../../../../app/module3/services01';

import Tabs from 'vue-tabs-with-active-line';

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
Vue.use(VueFormGenerator);
Vue.component(Vudal);
// register globally
Vue.component('multiselect', Multiselect);

/* -------------------------------------------------------------------------- */
/*                            endpointrepositories                            */
/* -------------------------------------------------------------------------- */
const ConsultantRecord = RepositoryFactory.get('consultantrecord');
const Termination = RepositoryFactory.get('termination');

export default {
  components: { Tabs },

  data() {
    return {
      isReady: false,
      tabs: [
        {
          title: 'Applicant Profile',
          value: 'tab1',
        },
        {
          title: 'Type of Applicant',
          value: 'tab2',
        },
        {
          title: 'Uploaded Document',
          value: 'tab3',
        },
        {
          title: 'Examination & Bankruptcy Check',
          value: 'tab4',
        },
      ],

      currentTab: 'tab1',
      currentConsultant: null,
      currentDistributor: null,
      isBulk: false,
      isBusy: true,
      terminationType: [
        {
          label: 'Non-compliance',
          value: '7',
        },
        {
          label: 'Bankruptcy',
          value: '8',
        },
        {
          label: 'Misconduct',
          value: '9',
        },
        {
          label: 'Other (please specify)',
          value: '10',
        },
      ],

      formOptions: {
        validateAfterChanged: true,
      },

      fields: {
        distributor: [
          { name: '__slot:index', title: 'NO' },
          // A column that needs custom formatting
          { name: 'SUBMISSION_DATE', title: 'SUBMISSION DATE' },
          { name: 'DIST_NAME', title: 'DISTRIBUTOR NAME' },
          { name: 'DIST_PHONE_NO', title: 'PHONE NUMBER' },
          // { name: 'TOTAL_CONSULTANT', title: 'TOTAL CONSULTANT' },
          { name: '__slot:ACTION', title: 'ACTION' },
        ],
        consultant: [
          {
            name: '__slot:checkbox',
            title: 'NO',
          },
          { name: '__slot:index', title: 'NO' },
          { name: 'CONSULTANT_NAME', title: 'CONSULTANT NAME' },
          { name: 'CONSULTANT_NRIC', title: 'NRIC NUMBER' },
          { name: 'CONSULTANT_PASSPORT_NO', title: 'PASSPORT NUMBER' },
          { name: 'CONSULTANT_FIMM_NO', title: 'FIMM NUMBER' },
          { name: 'CONSULTANT_TYPE', title: 'CONSULTANT TYPE' },
          { name: '__slot:ACTION', title: 'ACTION' },
        ],
      },

      search: {
        distributor: '',
        consultant: '',
      },

      consultantsAPI: [],

      distributorsAPI: null,
      distributorsTerminationAPI: null,

      currentPage: 1,
      perPage: '10',
      visible: {
        TERMINATION_FORM: false,
        TERMINATION_TYPE_OTHER_SPECIFY: false,
      },
      model: {
        PROFILE_UPLOADED_DOCUMENTS: [],

        TERMINATION_TYPE: '',
        TERMINATION_TYPE_OTHER_SPECIFY: '',
        TERMINATION_DATE: '',
        CONSULTANT_ID: [],
        TERMINATION_REMARK: '',
        CREATE_BY: JSON.parse(localStorage.getItem('user')).user_id,
      },

      tabSchema2: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'vueMultiSelect',
                label: 'Termination Type',
                model: 'TERMINATION_TYPE',
                placeholder: 'Enter Termination Type',
                styleClasses: 'col-md-6',
                required: true,
                selectOptions: {
                  multiple: false,
                  label: 'label',
                  value: 'value',
                  searchable: false,
                },
                values: (model, schema) => {
                  return this.terminationType;
                },
              },
              {
                type: 'input',
                inputType: 'date',
                label: 'Termination Date',
                model: 'TERMINATION_DATE',
                placeholder: 'Enter Termination Date',
                required: true,
                validator: 'date',
                styleClasses: 'col-md-6',
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Other',
                model: 'TERMINATION_TYPE_OTHER_SPECIFY',
                placeholder: 'Please specify',
                required: true,
                validator: 'string',
                styleClasses: 'col-md-6',
                visible: (model, field, form) => {
                  return this.visible.TERMINATION_TYPE_OTHER_SPECIFY;
                },
              },
              {
                styleClasses: 'col-md-6',
                visible: (model, field, form) => {
                  return this.visible.TERMINATION_TYPE_OTHER_SPECIFY;
                },
              },

              {
                type: 'textArea',

                rows: 10,
                max: 1000,
                label: 'Remarks / Comments',
                hint: 'Max 1000 characters',
                model: 'TERMINATION_REMARK',
                placeholder: 'Enter Remarks or Comments',
                // validator: 'number',
                styleClasses: 'col-md-12',
              },
            ],
          },
        ],
      },
      fileUploadSchema: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                accept: '.pdf',
                multiple: true,
                text: 'Choose a File',
                model: 'PROFILE_UPLOADED_DOCUMENTS',
                type: 'vfg-custom-file-view',
                styleClasses: 'col-md-12',
                required: false,
                disabled: true,
              },
            ],
          },
        ],
      },
    };
  },
  async created() {
    // await this.getConsultantRecord();
    await this.getDistributors();
    await this.getDistributorsFromTermination();
  },
  computed: {
    distributorFields() {
      if (this.isBulk) {
        return [
          { name: '__slot:index', title: 'NO' },
          // A column that needs custom formatting
          { name: 'DIST_NAME', title: 'DISTRIBUTOR NAME' },
          { name: '__slot:ACTION', title: 'ACTION' },
        ];
      }

      return [
        { name: '__slot:index', title: 'NO' },
        // A column that needs custom formatting
        { name: 'DIST_NAME', title: 'DISTRIBUTOR NAME' },
        { name: 'DIST_MOBILE_NUMBER', title: 'PHONE NUMBER' },
        // { name: 'TOTAL_CONSULTANT', title: 'TOTAL CONSULTANT' },
        { name: '__slot:ACTION', title: 'ACTION' },
      ];
    },
    consultantFields() {
      if (this.isBulk) {
        return [
          {
            name: '__slot:checkbox',
            title: 'SELECTED',
          },
          { name: '__slot:index', title: 'NO' },
          { name: 'CONSULTANT_NAME', title: 'CONSULTANT NAME' },
          { name: 'CONSULTANT_NRIC', title: 'NRIC NUMBER' },
          { name: 'CONSULTANT_PASSPORT_NO', title: 'PASSPORT NUMBER' },
          { name: 'CONSULTANT_FIMM_NO', title: 'FIMM NUMBER' },
          { name: 'CONSULTANT_TYPE', title: 'CONSULTANT TYPE' },
          { name: '__slot:ACTION', title: 'ACTION' },
        ];
      }

      return [
        { name: '__slot:index', title: 'NO' },
        { name: 'SUBMISSION_DATE', title: 'SUBMISSION DATE' },
        { name: 'CONSULTANT_NAME', title: 'CONSULTANT NAME' },
        { name: 'CONSULTANT_NRIC', title: 'NRIC NUMBER' },
        { name: 'CONSULTANT_PASSPORT_NO', title: 'PASSPORT NUMBER' },
        { name: 'CONSULTANT_FIMM_NO', title: 'FIMM NUMBER' },
        { name: 'CONSULTANT_TYPE', title: 'CONSULTANT TYPE' },
        { name: 'TERMINATION_TYPE', title: 'TERMINATION TYPE' },
        { name: 'EFFECTIVE_DATE', title: 'EFFECTIVE DATE' },
        { name: '__slot:ACTION', title: 'ACTION' },
      ];
    },
    filteredDistributor() {
      if (this.isBulk) {
        const search = this.search.distributor.toLowerCase();
        if (this.search && this.distributorsAPI) {
          return this.distributorsAPI.filter(el => {
            return Object.keys(el).some(key => `${el[key]}`.toLowerCase().match(search));
          });
        }
        return this.distributorsAPI;
      }
      const search = this.search.distributor.toLowerCase();
      if (this.search && this.distributorsTerminationAPI) {
        return this.distributorsTerminationAPI.filter(el => {
          return Object.keys(el).some(key => `${el[key]}`.toLowerCase().match(search));
        });
      }

      return this.distributorsTerminationAPI;
    },
    filteredConsultant() {
      const search = this.search.consultant.toLowerCase();
      if (this.search) {
        return this.consultantsAPI.filter(el => {
          return Object.keys(el).some(key => `${el[key]}`.toLowerCase().match(search));
        });
      }

      return this.consultantsAPI;
    },
    // mappedSelectedConsultantArray() {
    //   if (this.model.CONSULTANT_ID.length)
    //     return this.model.CONSULTANT_ID.map(el => el.CONSULTANT_ID);

    //   return [];
    // },
  },
  methods: {
    handleClick(newTab) {
      this.currentTab = newTab;
    },
    async getConsultantRecord(id) {
      console.log('inside get consultant record');
      const response = await services02module2.getConsultantsByDistributor(id);
      this.consultantsAPI = response;
      // this.isBusy = false;
      console.log(this.consultantsAPI);
    },
    async getTerminationType() {
      const response = await services02module2.getTerminationType();
      console.log('get Termination Type: ', response.data);
    },

    async getAllTermination() {
      const termination = await services02module2.getAllTermination();
      console.log('this is termination', termination.data);
    },

    async getDistributors() {
      this.distributorsAPI = await services02module2.getDistributorRecords();
      this.isReady = true;
      //console.log('this is distributors', this.distributorsAPI);
    },

    async getDistributorsFromTermination() {
      this.distributorsTerminationAPI = await services02module2.getDistributorsFromTermination();
      this.isReady = true;
      //console.log('this is distributors', this.distributorsTerminationAPI);
    },

    async viewCurrentConsultant(props) {
      try {
        this.currentConsultant = props.rowData;
        await this.getDocumentByID(props.rowData.CONSULTANT_ID);
      } catch (error) {
        console.log(error);
      }
    },
    async setCurrentDistributor(props) {
      localStorage.setItem('DIST_INFO',JSON.stringify(props.rowData));
      // await this.getConsultantRecord(props.rowData.DISTRIBUTOR_ID);
      this.$router.push('/fimm/consultant-termination-statusList-RD');
      this.currentDistributor = props.rowData.DIST_NAME;
    },
    setCurrentConsultant(props) {
      const index = this.model.CONSULTANT_ID.findIndex(
        el => el.CONSULTANT_ID === props.rowData.CONSULTANT_ID,
      );

      if (index >= 0) {
        this.model.CONSULTANT_ID.splice(index, 1);
      } else {
        this.model.CONSULTANT_ID.push(props.rowData);
      }
      //console.log(this.model.CONSULTANT_ID);
    },

    onModelUpdated(newVal, schema) {
      console.log(schema);
      if (schema === 'TERMINATION_TYPE') {
        // this.visible.TERMINATION_TYPE = newVal.value;
        this.visible.TERMINATION_TYPE_OTHER_SPECIFY = false;
        if (newVal.label.match('Other')) {
          this.visible.TERMINATION_TYPE_OTHER_SPECIFY = true;
        }
      }
    },
    validateBulkForm() {
      return this.$refs['bulkForm'].validate();
    },
    validateSingleForm() {
      return this.$refs['singleForm'].validate();
    },

    saveAsDraft: async function() {
      // if (this.isBulk) {
      //   const isBulkValidated = await this.validateBulkForm();
      // }
      //
      // const isSingleValidated = await this.validateSingleForm();
      const isBulkValidated=true;
      const isSingleValidated=true;
      if (isBulkValidated || isSingleValidated) {
        let data = {
          TERMINATION_TYPE: this.model.TERMINATION_TYPE.value,
          TERMINATION_TYPE_OTHER_SPECIFY: this.model.TERMINATION_TYPE_OTHER_SPECIFY,
          CONSULTANT_ID: this.model.CONSULTANT_ID.map(el => el.CONSULTANT_ID),
          CREATE_BY: this.model.CREATE_BY,
          TERMINATION_REMARK: this.model.TERMINATION_REMARK,
          TERMINATION_DATE: moment(this.model.TERMINATION_DATE).format(),
          APPROVAL_STATUS: 1,
        };

        if (this.currentConsultant) data.CONSULTANT_ID = this.currentConsultant.CONSULTANT_ID;
        console.log(this.model.TERMINATION_TYPE.value);

        console.log(data);

        const response = await services02module2.postTerminateConsultant(data);
        return response;
      }

      return false;
    },
    submitTerminationForm: async function() {
      if (this.isBulk) {
        const isBulkValidated = await this.validateBulkForm();
      }

      const isSingleValidated = await this.validateSingleForm();

      if (isBulkValidated || isSingleValidated) {
        let data = {
          TERMINATION_TYPE: this.model.TERMINATION_TYPE.value,
          TERMINATION_TYPE_OTHER_SPECIFY: this.model.TERMINATION_TYPE_OTHER_SPECIFY,
          CONSULTANT_ID: this.model.CONSULTANT_ID.map(el => el.CONSULTANT_ID),
          CREATE_BY: this.model.CREATE_BY,
          TERMINATION_REMARK: this.model.TERMINATION_REMARK,
          TERMINATION_DATE: moment(this.model.TERMINATION_DATE).format(),
          APPROVAL_STATUS: 2,
        };

        if (this.currentConsultant) data.CONSULTANT_ID = this.currentConsultant.CONSULTANT_ID;

        const response = await services02module2.postTerminateConsultant(data);
        return response;
      }

      return false;
      // }
    },

    getDocumentByID: async function(data) {
      console.log('inside get consultant by id');
      const response = await services02module2.getConsultantByID(data);

      response.DOCUMENTS.forEach(el => {
        el.DOC_BLOB = this.b64toBlobPDF(el.DOC_BLOB, 'application/pdf');

        el.DOC_BLOB = new File([el.DOC_BLOB], el.DOC_ORIGINAL_NAME + '.' + el.DOC_FILETYPE, {
          type: el.DOC_BLOB.type,
        });

        const data = {
          name: el.DOC_ORIGINAL_NAME + '.' + el.DOC_FILETYPE,
          size: el.DOC_FILESIZE,
          type: el.DOC_FILETYPE,
          ext: 'exe',
          url: window.URL.createObjectURL(el.DOC_BLOB),
        };

        this.model.PROFILE_UPLOADED_DOCUMENTS.push(data);
      });

      console.log('getConsultantRecords: ', this.model.PROFILE_UPLOADED_DOCUMENTS);
    },

    b64toBlobPDF(b64Data, contentType, sliceSize) {
      contentType = contentType || '';
      sliceSize = sliceSize || 512;

      var byteCharacters = atob(b64Data);
      var byteArrays = [];

      for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
      }

      console.log(byteArrays);

      return new File(byteArrays, 'pot', { type: contentType });
    },

    async getFilterConsultantRecord() {
      const filter_cons_records = await ConsultantRecord.getFilterConsultantRecord();
      console.log('this is filter cons records', filter_cons_records);
    },

    // fix this
    // setCurrentConsultantAll(scope) {
    //   if (this.mappedSelectedConsultantArray.length) {
    //     this.$refs['consultantTable'].clearSelected();
    //   } else {
    //     this.$refs['consultantTable'].selectAllRows();
    //   }
    //   // this.mappedSelectedConsultantArray.length
    //   // ? this.$refs['consultantTable'].clearSelected()
    //   // : this.$refs['consultantTable'].selectAllRows();
    // },

    // setCurrentConsultant() {
    //   console.log(this.selected);
    //   // alert("here");
    //   // console.log(this.selected);
    //   if (document.getElementById('checkboxId_' + id).checked) {
    //     this.checkboxArray.push(screenId);
    //   } else {
    //     const indexToRemove = this.checkboxArray.indexOf(screenId);
    //     if (indexToRemove > -1) {
    //       this.checkboxArray.splice(indexToRemove, 1);
    //     }
    //   }
    // },

    // onRowSelected(items) {
    //   this.model.CONSULTANT_ID = items;
    //   console.log(this.model.CONSULTANT_ID);
    // },
  },
};
</script>
<style scoped></style>

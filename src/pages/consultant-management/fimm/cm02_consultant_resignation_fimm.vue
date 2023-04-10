<template>
  <div class="">
    <div class="">
      <div class="row">
        <div class="col-12">
          <va-card>
          <div v-if="!dataReady">
            <div class="text-center text-danger my-2">
                  <b-spinner class="align-middle"></b-spinner>
                  <strong>Loading...</strong>
              </div>
          </div>
            <div v-else>
            <h4 style="margin-top:0">Consultant Details</h4>
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
                          <td>Consultant Status</td>
                          <td>{{ currentConsultant.REGISTRATION_STATUS }}</td>
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
                          <td>{{ currentConsultant.CONSULTANT_CATEGORY }}</td>
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
                          <td>{{ currentConsultant.COURSE_TYPE }}</td>
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
            </div>
          </va-card>
          <br />
          <va-card>
            <h4 style="margin-top:0">Resignation Request And Justification</h4>
            <br />
            <vue-form-generator
              :model="model"
              :schema="tabSchema2"
              :options="formOptions"
              ref="resignationForm"
              @model-updated="onModelUpdated"
            >
            </vue-form-generator>
            <br />
            <br />
            <button
            @click="$router.go(-1)"
            type="submit" class="btn btn-primary btn-fill float-left btn-md">
            <i class="fa fa-step-backward" /> &nbsp; Previous
            </button>
            <div class="float-right">
              <button @click="saveAsDraft" type="button" class="btn btn-info btn-fill btn-md">
                <i class="fa fa-edit" /> &nbsp;Save as Draft
              </button>
              <button
                @click="submitResignationRequest"
                type="button"
                class="ml-2 btn btn-primary btn-fill btn-md"
              >
                <i class="fa fa-paper-plane" /> Submit
              </button>
            </div>
          </va-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import pdf from 'vue-pdf';
import 'vue-form-generator/dist/vfg.css';
import Tabs from 'vue-tabs-with-active-line';
import VueFormGenerator from 'vue-form-generator';
import * as servicesmodule0 from '../../../app/module0/services';
import * as servicesmodule2 from '../../../app/module2/services';
import RepositoryFactory from '../../../repositories/RepositoryFactory';
import * as services02module2 from '../../../app/module2/services02';

// const Resignation = RepositoryFactory.get('resignation');

Vue.use(VueFormGenerator);

export default {
 async created() {
    await this.getConsultantRecordByID(this.$route.params.id).then(res => {
      this.dataReady = true
    });
    const response = servicesmodule2.getCertificate(data);
    console.log('Success', response);
    const blob = new Blob([response.data]);
    const objectUrl = URL.createObjectURL(blob);
    this.pdfsrc = objectUrl;
    return pdfsrc;
  },

  mounted() {
    this.getExamResult();

    console.log(JSON.stringify(this));
  },

  components: {
    Tabs,
    pdf,
  },

  data() {
    return {
      dataReady: false,
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
      currentConsultant: {},

      pdfsrc: null,

      CONSULTANT_PROFILE: {
        NAME: 'NoorHiyadah Binti Mohd Faizal',
        NRIC: '890408-03-5556',
        DOB: '08-04-1989',
        ADDRESS: '3, Jalan Dato Abdul Aziz, Seksyen 14',
        POSTCODE: '46100',
        CITY: 'Petaling Jaya',
        STATE: 'Selangor',
        TELEPHONE_NO: '014-6218910',
        EMAIL: 'hidayah@gmail.com',
        HIGHEST_QUALIFICATION: 'Degree',
      },

      TYPE_OF_APPLICANT: {
        CATEGORY: 'Agent',
        APPERENTICESHIP_PROGRAM: 'Yes',
        COMPANY_DISTRIBUTOR: 'A.D.Fincancial Sdn. Bhd.',
      },

      model: {
        // RESIGNATION_ID
        // USER_ID
        // CONSULTANT_ID
        // RESIGNATION_DATE
        // RESIGNATION_REMARK
        // CREATE_TIMESTAMP
        RESIGNATION_ID: '',
        USER_ID: '',
        CONSULTANT_ID: '',
        RESIGNATION_DATE: '',
        RESIGNATION_REMARK: '',
        RESIGNATION_DOCUMENT: '',
      },

      formOptions: {
        validateAfterLoad: false,
        validateAfterChanged: true,
        validateAsync: true,
      },

      tabSchema2: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'input',
                inputType: 'date',
                label: 'Effective Date',
                model: 'RESIGNATION_DATE',
                placeholder: 'Enter Effective Date',
                required: true,
                validator: 'string',
                styleClasses: 'col-md-6',
              },
              {
                type: 'textArea',
                rows: 10,
                max: 1000,
                hint: 'Maximum characters of 1000',
                label: 'Remarks / Comments',
                model: 'RESIGNATION_REMARK',
                validator: 'required',

                placeholder: 'Enter Remarks or Comments',
                required: true,

                styleClasses: 'col-md-12',
              },
              {
                labels: 'Resignation Document',
                text: 'Choose file(s)',
                model: 'RESIGNATION_DOCUMENT',
                validator: 'required',
                type: 'vfg-custom-multiple-file',
                styleClasses: 'col-md-12',
                required: true,
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

  methods: {
    prevTab() {
      this.$router.go(-1);
    },
    getConsultantRecordByID: async function(data) {
      const response = await services02module2.getConsultantByID(data);
      console.log(response);
      console.log('test', response.data);

      this.currentConsultant = response;

      console.log('LATEST', this.currentConsultant);

    },
    saveAsDraft() {},
    validateResignationForm() {
      console.log('inside validateResignationForm');
      return this.$refs['resignationForm'].validate();
    },
    submitResignationRequest: async function() {
      console.log('inside submitResignationRequest');
      const validate = await this.validateResignationForm();

      console.log(validate);

      if (validate) {
        let data = {
          RESIGNATION_ID: '',
          USER_ID: '',
          CONSULTANT_ID: '',
          RESIGNATION_DATE: this.model.RESIGNATION_DATE,
          RESIGNATION_REMARK: this.model.RESIGNATION_REMARK,
          RESIGNATION_DOCUMENT: this.model.RESIGNATION_DOCUMENT,
        };

        // const response = await Resignation.postResignation(data);

        console.log(response);
      }
    },
    handleClick(newTab) {
      this.currentTab = newTab;
    }, // end tab
    onModelUpdated(newVal, schema) {
      console.log(schema);
      if (schema == 'document') {
        console.log(newVal.replace('C:\\fakepath\\', ''));
        this.model.document = newVal.replace('C:\\fakepath\\', '');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.input-label-td {
  width: 30%;
}
#consultant-profile input,
#type-of-applicant input {
  width: 70%;
  border: none;
  background: transparent;
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
    &_active {
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
      margin-left: 20px;
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
</style>

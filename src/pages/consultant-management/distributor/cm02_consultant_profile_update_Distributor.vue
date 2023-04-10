<template>
  <div class="">
    <div class="">
      <div class="row">
        <div class="col-12">
          <template v-if="!consultant">
            <va-card>
              <h4 style="margin-top:0">List of Consultant Profile Update</h4>
              <br />
              <div class="col-3">
                <div
                  style="display: flex; align-items:center"
                  class="form-group form-group-sm has-search"
                >
                  <span style="margin-right:10px" class="fa fa-search form-control-feedback"></span>
                  <input
                    v-model="search.consultant"
                    type="text"
                    class="form-control"
                    placeholder="Search"
                  />
                </div>
              </div>
              <va-data-table
                :fields="fields.consultant"
                :data="filteredConsultant"
                no-data-label="No data found"
                :per-page="parseInt(10)"
                :datacount="filteredConsultant.length"
                :dataperpage="parseInt(10)"
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
                <template slot="CONSULTANT_NRIC" slot-scope="props">
                  {{ props.rowData.CONSULTANT_NRIC == '""' ?"":props.rowData.CONSULTANT_NRIC}}
                </template>
                <template slot="CONSULTANT_PASSPORT_NO" slot-scope="props">
                  {{ props.rowData.CONSULTANT_PASSPORT_NO == '""' ?"":props.rowData.CONSULTANT_PASSPORT_NO}}
                </template>
                <template slot="ACTION" slot-scope="props">
                  <h5 class="mt-1">
                    <span
                      v-b-tooltip.hover
                      title="edit"
                      v-on:click="setCurrentConsultant(props)"
                      class="badge badge-primary mr-2"
                    >
                      <i class="fa fa-eye"></i
                      ></span>
                  </h5>
                </template>
              </va-data-table>
            </va-card>
          </template>

          <template v-else>
            <va-card
              class="strpied-tabled-with-hover"
              body-classes="table-full-width table-responsive"
            >
              <h4 style="margin-top:0">Applicant Profile</h4>
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
                            <td><b>FIELD</b></td>
                            <td><b>OLD DATA</b></td>
                            <td><b>NEW DATA</b></td>
                          </tr>
                          <tr>
                            <td><b>Personal Particulars</b></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td>Name</td>
                            <td>{{consultant.CONSULTANT_NAME}}</td>
                            <td>{{consultant.NEW_CONSULTANT_NAME}}</td>
                          </tr>
                          <tr>
                            <td>Citizenship</td>
                            <td>{{consultant.OLD_CONSULTANT_CITIZEN}}</td>
                            <td>{{consultant.NEW_CONSULTANT_CITIZEN}}</td>
                          </tr>
                          <tr>
                            <td>New NRIC</td>
                            <td>{{consultant.CONSULTANT_NRIC}}</td>
                            <td>{{consultant.NEW_CONSULTANT_NRIC}}</td>
                          </tr>
                          <tr>
                            <td>Old NRIC</td>
                            <td>{{consultant.CONSULTANT_NRIC_OLD}}</td>
                            <td></td>
                          </tr>
                          <tr>
                            <td>Passport No</td>
                            <td>{{consultant.CONSULTANT_PASSPORT_NO}}</td>
                            <td>{{consultant.NEW_CONSULTANT_PASSPORT_NO}}</td>
                          </tr>
                          <tr>
                            <td>Passport Expiry No</td>
                            <td>{{consultant.CONSULTANT_PASSPORT_EXPIRY_NO}}</td>
                            <td>{{consultant.NEW_CONSULTANT_PASSPORT_EXPIRY_NO}}</td>
                          </tr>
                          <tr>
                            <td>Gender</td>
                            <td>{{consultant.CONSULTANT_GENDER === 288 ? 'MALE': 'FEMALE'}}</td>
                            <td></td>
                          </tr>
                          <tr>
                            <td>Date of Birth</td>
                            <td>{{consultant.CONSULTANT_DOB}}</td>
                            <td></td>
                          </tr>
                          <tr>
                            <td>Mobile Number</td>
                            <td>{{consultant.CONSULTANT_MOBILE_NO}}</td>
                            <td>{{consultant.NEW_CONSULTANT_MOBILE_NO}}</td>
                          </tr>
                          <tr>
                            <td>House Number</td>
                            <td>{{consultant.CONSULTANT_HOUSE_NO}}</td>
                            <td>{{consultant.NEW_CONSULTANT_HOUSE_NO}}</td>
                          </tr>
                          <tr>
                            <td>Email</td>
                            <td>{{consultant.OLD_CONSULTANT_EMAIL}}</td>
                            <td>{{consultant.NEW_CONSULTANT_EMAIL}}</td>
                          </tr>
                          <tr>
                            <td>Highest / Educational Qualification</td>
                            <td>
                              <p v-for="(item,index) in consultant.OLD_EDUCATIONAL_QUALIFICATION" :key="item.CONSULTANT_HIGHEST_QUALIFICATION">

                                {{ index === 0 ? 'Highest' : 'Educational'}} Qualification : {{ item.QUAL_NAME }}</br>
                                <template v-if="index > 0 ">
                                  Major in : {{ item.DEGREE_MAJOR }} </br>
                                  Minor in : {{ item.DEGREE_MINOR }} </br>
                                </template>
                              </p>
                            </td>
                            <td>
                              <p v-for="item in consultant.NEW_EDUCATIONAL_QUALIFICATION" :key="item.CONSULTANT_HIGHEST_QUALIFICATION">
                                Qualification : {{ item.QUAL_NAME }} </br>
                                Major in : {{ item.DEGREE_MAJOR }} </br>
                                Minor in : {{ item.DEGREE_MINOR }} </br>
                              </p>
                            </td>
                          </tr>
                          <tr>
                            <td>Credit in Mathematics</td>
                            <td>{{consultant.OLD_EDUCATIONAL_DETAILS.MATH  === 1 ? 'Yes' : 'No'}}</td>
                            <td>{{ this.displayNewMath(consultant.NEW_MATH, consultant.OLD_EDUCATIONAL_DETAILS.MATH)}}</td>
                          </tr>
                          <tr>
                            <td>Credit in Language</td>
                            <td>{{consultant.OLD_EDUCATIONAL_DETAILS.LANGUAGE}}</td>
                            <td>{{consultant.NEW_LANGUAGE}}</td>
                          </tr>
                          <tr>
                            <td>Other Language</td>
                            <td>{{consultant.OLD_EDUCATIONAL_DETAILS.OTHER_LANGUAGE}}</td>
                            <td>{{consultant.NEW_OTHER_LANGUAGE !== 'null'?consultant.NEW_OTHER_LANGUAGE:''}}</td>
                          </tr>
                          <tr>
                            <td>Credit In Other Subject</td>
                            <td>{{this.displayCreditInOtherSubject(consultant.OLD_EDUCATIONAL_DETAILS.CREDIT_SUBJECT)}}</td>
                            <td>{{this.displayCreditInOtherSubject(consultant.NEW_CREDIT_SUBJECT)}}</td>
                          </tr>
                          <tr>
                            <td>Professional Certificates</td>
                            <td>{{this.displayCertificate(consultant.OLD_EDUCATIONAL_DETAILS.PROFESSIONAL_CERTIFICATE)}}</td>
                            <td>{{this.displayCertificate(consultant.NEW_PROFESSIONAL_CERTIFICATE)}}</td>
                          </tr>
                          <tr>
                            <td>Subjects</td>
                            <td><p v-for="subject in consultant.OLD_SUBJECTS" :key="subject.ID">
                              {{subject.SUBJECT}}
                            </p></td>
                            <td>
                              <p v-for="subject in consultant.NEW_SUBJECTS" :key="subject.ID">
                                {{subject}}
                              </p></td>
                          </tr>
                          <tr>
                            <td><b>Correspondent Address</b></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td>Address 1</td>
                            <td>{{consultant.CONSULTANT_CORRESPONDENT_ADDR1}}</td>
                            <td>{{consultant.NEW_CONSULTANT_CORRESPONDENT_ADDR1}}</td>
                          </tr>
                          <tr>
                            <td>Address 2</td>
                            <td>{{consultant.CONSULTANT_CORRESPONDENT_ADDR2}}</td>
                            <td>{{consultant.NEW_CONSULTANT_CORRESPONDENT_ADDR2 !== 'null'?consultant.NEW_CONSULTANT_CORRESPONDENT_ADDR2:''}}</td>
                          </tr>
                          <tr>
                            <td>Address 3</td>
                            <td>{{consultant.CONSULTANT_CORRESPONDENT_ADDR3}}</td>
                            <td>{{consultant.NEW_CONSULTANT_CORRESPONDENT_ADDR3 !== 'null'?consultant.NEW_CONSULTANT_CORRESPONDENT_ADDR3:''}}</td>
                          </tr>
                          <tr>
                            <td>Country</td>
                            <td>{{consultant.OLD_COUNTRY_NAME}}</td>
                            <td>{{consultant.NEW_COUNTRY_NAME}}</td>
                          </tr>
                          <tr>
                            <td>State</td>
                            <td>{{consultant.OLD_STATE_NAME}}</td>
                            <td>{{consultant.NEW_STATE_NAME}}</td>
                          </tr>
                          <tr>
                            <td>City</td>
                            <td>{{consultant.OLD_CITY_NAME}}</td>
                            <td>{{consultant.NEW_CITY_NAME}}</td>
                          </tr>
                          <tr>
                            <td>Postcode</td>
                            <td>{{consultant.OLD_POSTAL_CODE}}</td>
                            <td>{{consultant.NEW_POSTAL_CODE}}</td>
                          </tr>
                          <tr>
                            <td><b>Permanent Address</b></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td>Address 1</td>
                            <td>{{consultant.CONSULTANT_PERMANENT_ADDR1}}</td>
                            <td>{{consultant.NEW_CONSULTANT_PERMANENT_ADDR1}}</td>
                          </tr>
                          <tr>
                            <td>Address 2</td>
                            <td>{{consultant.CONSULTANT_PERMANENT_ADDR2}}</td>
                            <td>{{consultant.NEW_CONSULTANT_PERMANENT_ADDR2 !== 'null'?consultant.NEW_CONSULTANT_PERMANENT_ADDR2:''}}</td>
                          </tr>
                          <tr>
                            <td>Address 3</td>
                            <td>{{consultant.CONSULTANT_PERMANENT_ADDR3}}</td>
                            <td>{{consultant.NEW_CONSULTANT_PERMANENT_ADDR3 !== 'null'?consultant.NEW_CONSULTANT_PERMANENT_ADDR3:''}}</td>
                          </tr>
                          <tr>
                            <td>Country</td>
                            <td>{{consultant.OLD_PERMANENT_COUNTRY_NAME}}</td>
                            <td>{{consultant.NEW_PERMANENT_COUNTRY_NAME}}</td>
                          </tr>
                          <tr>
                            <td>State</td>
                            <td>{{consultant.OLD_PERMANENT_STATE_NAME}}</td>
                            <td>{{consultant.NEW_PERMANENT_STATE_NAME}}</td>
                          </tr>
                          <tr>
                            <td>City</td>
                            <td>{{consultant.OLD_PERMANENT_CITY_NAME}}</td>
                            <td>{{consultant.NEW_PERMANENT_CITY_NAME}}</td>
                          </tr>
                          <tr>
                            <td>Postcode</td>
                            <td>{{consultant.OLD_PERMANENT_POSTAL_CODE}}</td>
                            <td>{{consultant.NEW_PERMANENT_POSTAL_CODE}}</td>
                          </tr>
                          <!--                          <tr>-->
                          <!--                            <td>Bankruptcy</td>-->
                          <!--                            <td>{{consultant.OLD_BANKRUPTCY_STATUS}}</td>-->
                          <!--                          </tr>-->
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div v-if="currentTab === 'tab2'">
                    <div class="ml-4" >
                      <table class="table table-striped">
                        <thead>
                          <tr>
                            <th scope="col">No</th>
                            <th scope="col">Agent Type</th>
                            <th scope="col">Position</th>
                            <th scope="col">License Type</th>
                            <th scope="col">Distributor</th>
                            <th scope="col">Application Type</th>
                            <th scope="col">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(item,index) in consultant.EXAM_DETAILS" :key="index">
                            <td scope="row">{{++index}}</td>
                            <td>{{ item.CANDIDATE_CATEGORY }}</td>
                            <td v-if="item.CANDIDATE_CATEGORY == 'STAFF'">
                              {{ item.CANDIDATE_POSITION_CATEGORY }}
                              <span v-if="item.CANDIDATE_POSITION_CATEGORY=='OTHERS'"> - {{ item.CANDIDATE_POSITION}}</span>
                            </td>
                            <td v-else>-</td>
                            <td>{{item.TYPE_FULL_NAME}}</td>
                            <td>{{item.DIST_NAME}}</td>
                            <td>{{item.APPLICATION_TYPE_NAME}}</td>
                            <td>{{item.LICENSE_STATUS}}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div v-if="currentTab === 'tab3'">
                    <div class="ml-4" >
                      <table class="table table-striped">
                        <thead>
                          <tr>
                            <th scope="col">No</th>
                            <th scope="col">License Type</th>
                            <th scope="col">Application Type</th>
                            <th scope="col">Examination Type</th>
                            <th scope="col">Result</th>
                            <th scope="col">Certificate</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(item,index) in consultant.EXAM_DETAILS" :key="index">
                            <td scope="row">{{++index}}</td>
                            <td>{{item.TYPE_FULL_NAME}}</td>
                            <td>{{item.APPLICATION_TYPE_NAME}}</td>
                            <td>{{item.EXAMINATION_TYPE }}</td>
                            <td>{{item.RESULT}}</td>
                            <td>Not Available</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div v-if="currentTab === 'tab4'">
                    <div class="ml-4">
                      <br />
                      <table class="table table-striped">
                        <tbody>
                          <tr style="width: 100%">
                            <vue-form-generator
                              :model="model"
                              :schema="UploadedFileSchema"
                              :options="formOptions"
                              ref="UploadedFileView"
                            >
                            </vue-form-generator>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </va-card>
            <br />

            <va-card
              class="strpied-tabled-with-hover"
              body-classes="table-full-width table-responsive"
            >
              <h4 style="margin-top:0">Applicant Review</h4>
              <br />
              <vue-form-generator
                :model="model"
                :schema="tabSchema2"
                :options="formOptions"
                ref="tabForm2"
                @model-updated="onModelUpdated"
              >
              </vue-form-generator>
              <br />
              <br />
              <div class="float-left">
                <button @click="consultant = null;" type="button" class="btn btn-primary btn-fill btn-md">
                  <i class="fa fa-step-backward" /> &nbsp; Previous
                </button>
              </div>
              <div class="float-right">
                <button
                  :disabled="model.DIST_PUBLISH_STATUS"
                  @click="submitForm('DRAFT')"
                  type="button"
                  class="mr-2 btn btn-info btn-fill btn-md"
                  v-if="checkIfSubmitApplicable"
                >
                  <i class="fa fa-edit" /> &nbsp;Save as Draft
                </button>
                <button
                  @click="returned"
                  type="button"
                  class="mr-2 btn btn-warning btn-fill btn-md"
                  v-if="checkIfSubmitApplicable"
                >
                  <i class="fa fa-reply" /> &nbsp; Return
                </button>
                <button
                  @click="reject"
                  type="button"
                  class="mr-2 btn btn-danger btn-fill btn-md"
                  v-if="checkIfSubmitApplicable"
                >
                  <i class="fa fa-ban" /> &nbsp; Reject
                </button>
                <button
                  @click="submitForm('REVIEW')"
                  type="button"
                  class="mr-2 btn btn-success btn-fill btn-md"
                  v-if="checkIfSubmitApplicable"
                >
                  <i class="fa fa-paper-plane" /> Approve
                </button>
              </div>
            </va-card>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import 'vue-form-generator/dist/vfg.css'
import Tabs from 'vue-tabs-with-active-line'
import VueFormGenerator from 'vue-form-generator'
import * as consultantProfileServices from '../../../app/module2/consultant-profile/consultantProfileServices'
import * as services02module2 from '../../../app/module2/services02'

Vue.use(VueFormGenerator)
const TABS = [
  {
    title: 'Applicant Profile',
    value: 'tab1',
  },
  {
    title: 'Type of Consultant',
    value: 'tab2',
  },
  {
    title: 'Examination',
    value: 'tab3',
  },
  {
    title: 'Uploaded Document',
    value: 'tab4',
  },
]
export default {
  created () {
  },

  async mounted () {
    await this.getConsultantRecord()
    this.documentLoaded = false
  },

  components: {
    Tabs,
  },

  data () {
    return {
      documentLoaded: false,
      cpaID: null,
      consultantStatus: true,
      checkIfSubmitApplicable: false,
      tabs: TABS,
      currentTab: 'tab1',
      pdfsrc: null,
      getResult: [],
      getResultPDF: [],
      consultant: null,
      fields: {
        consultant: [
          { name: '__slot:index', title: 'NO' },
          { name: 'SUBMISSION_DATE', title: 'SUBMISSION DATE' },
          { name: 'CONSULTANT_NAME', title: 'CONSULTANT NAME' },
          { name: '__slot:CONSULTANT_NRIC', title: 'NRIC' },
          { name: '__slot:CONSULTANT_PASSPORT_NO', title: 'PASSPORT NO' },
          { name: 'CONSULTANT_APPEAL_TYPE', title: 'APPEAL TYPE' },
          { name: 'STATUS', title: 'STATUS' },
          { name: '__slot:ACTION', title: 'ACTION' },
        ],
      },
      filter: {
        distributor: null,
        consultant: null,
      },

      consultantsAPI: [],

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
        REMARKS_COMMENTS: '',
        REVIEW_DOCS: [],
        PROFILE_UPLOADED_DOCUMENTS: [],
      },
      status: [
        {
          id: 'Exam',
          name: 'Exam Related',
        },
        {
          id: 'Termination',
          name: 'Termination',
        },
        {
          id: 'Bankruptcy',
          name: 'Bankruptcy',
        },
      ],
      search: {
        distributor: '',
        consultant: '',
      },
      examrelated: [
        {
          id: 'examResults',
          name: 'Exam Results',
        },
        {
          id: 'Others',
          name: 'Others (Waiver)',
        },
      ],
      tabSchema2: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'textArea',
                required: false,
                rows: 10,
                max: 1000,
                hint: 'MAXIMUM CHARACTERS OF 1000',
                label: 'REMARKS / COMMENTS',
                model: 'REMARKS_COMMENTS',
                placeholder: 'ENTER REMARKS OR COMMENTS',
                styleClasses: 'col-md-12',
              },
              {
                labels: 'Choose Document',
                model: 'REVIEW_DOCS',
                type: 'vfg-custom-multiple-file-general',
                styleClasses: 'col-md-12',
                hint: 'Accepted format : (.pdf)',
                required: false,
              },
            ],
          },
        ],
      },

      UploadedFileSchema: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                // accept: '.pdf,',
                multiple: true,
                model: 'PROFILE_UPLOADED_DOCUMENTS',
                disabled: true,
                // labels: 'Upload NRIC Photo (Back)',
                theme: 'list',
                text: 'Choose a File',
                type: 'vfg-custom-file-view',
                styleClasses: 'col-md-12',
              },
            ],
          },
        ],
      },

      formOptions: {
        validateAfterLoad: false,
        validateAfterChanged: true,
        validateAsync: true,
      },
    }
  },
  computed: {
    filteredConsultant () {
      const search = this.search.consultant.toLowerCase()
      if (this.search && this.consultantsAPI) {
        return this.consultantsAPI.filter(el => {
          return Object.keys(el).some(key => `${el[key]}`.toLowerCase().match(search))
        })
      }

      return this.consultants
    },
  },

  methods: {
    displayNewMath (newMath, old) {
      if (newMath === null) {
        return ''
      }
      if (old == newMath) {
        return ''
      }
      return newMath === 0 ? 'No' : 'Yes'
    },
    displayCreditInOtherSubject (item) {
      switch (item) {
        case 1:
          return 'CREDIT IN SEJARAH'
        case 2:
          return 'CREDIT IN PENDIDIKAN ISLAM'
        case 3:
          return 'OTHERS'
      }
    },
    displayCertificate (item) {
      switch (item) {
        case 1:
          return 'CERTIFIED FINANCIAL PLANNER (CFP)'
        case 2:
          return 'ISLAMIC FINANCIAL PLANNER (IFP)'
        case 3:
          return 'REGISTERED FINANCIAL PLANNER (RFP)'
        case 4:
          return 'SHARIAH REGISTERED FINANCIAL PLANNER (SRFP)'
      }
    },
    getProfileDocuments: async function (ids) {
      const response = await consultantProfileServices.getProfileDocumentByIds({
        DOCUMENT_IDS: ids,

      })
      // alert(JSON.stringify(response));
      response.forEach(element => {
        element.DOC_BLOB = this.b64toBlobPDF(
          element.DOC_BLOB,
          'application/pdf',
        )
        element.DOC_BLOB = new File(
          [element.DOC_BLOB],
          element.DOC_ORIGINAL_NAME,
          { type: element.DOC_BLOB.type },
        )
        const data = {
          docID: element.CA_DOCUMENT_ID,
          name: element.DOC_ORIGINAL_NAME,
          size: element.DOC_FILESIZE,
          type: element.DOC_FILETYPE,
          ext: 'exe',
          url: window.URL.createObjectURL(element.DOC_BLOB),
        }

        // this.model.REVIEW_DOCS = []
        this.model.REVIEW_DOCS.push(data)
      })
    },
    getVerifyDocuments: async function (ids) {
      const response = await consultantProfileServices.getProfileDocumentByIds({
        DOCUMENT_IDS: ids,
        CONSULTANT_ID: this.consultant.CONSULTANT_ID,
      })
      response.forEach(el => {
        el.DOC_BLOB = this.b64toBlobPDF(el.DOC_BLOB, 'application/pdf')

        el.DOC_BLOB = new File(
          [el.DOC_BLOB],
          // el.DOC_ORIGINAL_NAME + "." + el.DOC_FILETYPE,
          el.DOC_ORIGINAL_NAME,
          {
            type: el.DOC_BLOB.type,
          },
        )

        const data = {
          docID: el.CA_DOCUMENT_ID,
          name: el.DOC_ORIGINAL_NAME,
          size: el.DOC_FILESIZE,
          type: el.DOC_FILETYPE,
          ext: 'exe',
          url: window.URL.createObjectURL(el.DOC_BLOB),
        }

        this.model.PROFILE_UPLOADED_DOCUMENTS.push(data)
      })
    },
    getDocumentByID: async function (consultId) {
      const response = await consultantProfileServices.getAllUploadedDocsByConsultantId(
        {
          CONSULTANT_PROFILE_ID: consultId,
        })
      response.forEach(el => {
        if (el.DOC_MIMETYPE == 'image/jpeg') {
          el.DOC_BLOB = consultantProfileServices.b64toBlobPDF(el.DOC_BLOB, 'image/jpeg')
        } else if (el.DOC_MIMETYPE == 'image/png') {
          el.DOC_BLOB = consultantProfileServices.b64toBlobPDF(el.DOC_BLOB, 'image/png')
        } else if (el.DOC_MIMETYPE == 'application/pdf') {
          el.DOC_BLOB = consultantProfileServices.b64toBlobPDF(el.DOC_BLOB, 'application/pdf')
        } else {
          el.DOC_BLOB = consultantProfileServices.b64toBlobPDF(el.DOC_BLOB, 'application/pdf')
        }

        el.DOC_BLOB = new File(
          [el.DOC_BLOB],
          // el.DOC_ORIGINAL_NAME + "." + el.DOC_FILETYPE,
          el.DOC_ORIGINAL_NAME,
          {
            type: el.DOC_BLOB.type,
          },
        )

        const data = {
          docID: el.CA_DOCUMENT_ID,
          name: el.DOC_ORIGINAL_NAME,
          size: el.DOC_FILESIZE,
          type: el.DOC_FILETYPE,
          ext: 'exe',
          url: window.URL.createObjectURL(el.DOC_BLOB),
        }

        this.model.PROFILE_UPLOADED_DOCUMENTS.push(data)
      })
    },
    b64toBlobPDF (b64Data, contentType, sliceSize) {
      contentType = contentType || ''
      sliceSize = sliceSize || 512

      var byteCharacters = atob(b64Data)
      var byteArrays = []

      for (
        var offset = 0;
        offset < byteCharacters.length;
        offset += sliceSize
      ) {
        var slice = byteCharacters.slice(offset, offset + sliceSize)

        var byteNumbers = new Array(slice.length)
        for (var i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i)
        }

        var byteArray = new Uint8Array(byteNumbers)

        byteArrays.push(byteArray)
      }

      return new File(byteArrays, 'pot', { type: contentType })
    },
    setCurrentDistributor (prop) {
      this.distributor = prop.rowData
    },
    setCurrentConsultant (prop) {
      this.consultant = prop.rowData
      this.model.REMARKS_COMMENTS = ''
      if (this.consultant.REMARK) {
        this.model.REMARKS_COMMENTS = this.consultant.REMARK
      }

      this.model.REVIEW_DOCS = []
      this.model.PROFILE_UPLOADED_DOCUMENTS = []
      if (this.consultant.CA_DOCUMENT_ID) {
        this.getProfileDocuments(this.consultant.CA_DOCUMENT_ID)
        this.documentLoaded = true
      }
      if (this.consultant.VERIFY_DOCS_IDS) {
        this.getVerifyDocuments(this.consultant.VERIFY_DOCS_IDS)
        this.documentLoaded = true
      }
      this.getDocumentByID(this.consultant.CONSULTANT_PROFILE_ID)
      this.checkSubmitApplicable()
    },
    checkSubmitApplicable () {
      this.checkIfSubmitApplicable = (this.consultant.STATUS === 'DRAFT' || this.consultant.STATUS === 'PENDING')
      this.consultantStatus = this.checkIfSubmitApplicable
    },
    async getConsultantRecord () {
      const data = JSON.parse(localStorage.getItem('user')).USER_GROUP_ID
      this.consultantsAPI = await consultantProfileServices.listConsultantProfileByGroupId(
        { GROUP_ID: data },
      )
    },
    // prevTab () {
    //   this.$router.go(-1)
    // },
    saveAsDraft () {},
    validateForm () {
      return this.$refs.tabForm2.validate()
    },
    submitForm: async function (savetype) {
      this.validateForm()
      if (confirm('Are you sure you want to proceed the Submission?')) {
        const data = new FormData()
        data.append('SAVE_DATA_TYPE', savetype)
        data.append('CONSULTANT_PROFILE_APPROVAL_ID', this.consultant.CONSULTANT_PROFILE_APPROVAL_ID)
        data.append('REMARKS', this.model.REMARKS_COMMENTS)
        const user = localStorage.getItem('user')
        data.append('CREATE_BY', JSON.parse(user).user_id)
        data.append('USER_GROUP_ID', JSON.parse(user).USER_GROUP_ID)
        const documentArr = []
        for (let i = 0; i < this.model.REVIEW_DOCS.length; i++) {
          const val = this.stringifyDataIfComplexObject(this.model.REVIEW_DOCS[i])
          if (val) {
            documentArr.push(val)
          }
        }
        for (let i = 0; i < documentArr.length; i++) {
          data.append('DOCUMENT[' + i + ']', documentArr[i])
        }
        await consultantProfileServices.reviewProfileUpdate(data)
        this.consultant = null
        this.getConsultantRecord()
        this.model.REVIEW_DOCS = []
        this.model.REMARKS_COMMENTS = null
        this.documentLoaded = false
      }
    },
    reject: async function () {
      this.validateForm()
      if (confirm('Are you sure you want to reject the Submission?')) {
        const data = new FormData()
        data.append('CONSULTANT_PROFILE_APPROVAL_ID', this.consultant.CONSULTANT_PROFILE_APPROVAL_ID)
        data.append('REMARKS', this.model.REMARKS_COMMENTS)
        const user = localStorage.getItem('user')
        data.append('CREATE_BY', JSON.parse(user).user_id)
        data.append('USER_GROUP_ID', JSON.parse(user).USER_GROUP_ID)
        const documentArr = []
        for (let i = 0; i < this.model.REVIEW_DOCS.length; i++) {
          const val = this.stringifyDataIfComplexObject(this.model.REVIEW_DOCS[i])
          if (val) {
            documentArr.push(val)
          }
        }
        for (let i = 0; i < documentArr.length; i++) {
          data.append('DOCUMENT[' + i + ']', documentArr[i])
        }
        await consultantProfileServices.rejectProfileUpdate(data)
        this.consultant = null
        this.getConsultantRecord()
        this.model.REVIEW_DOCS = []
        this.model.REMARKS_COMMENTS = null
        this.documentLoaded = false
      }
    },
    returned: async function () {
      this.validateForm()
      if (confirm('Are you sure you want to return the Submission?')) {
        const data = new FormData()
        data.append('CONSULTANT_PROFILE_APPROVAL_ID', this.consultant.CONSULTANT_PROFILE_APPROVAL_ID)
        data.append('REMARKS', this.model.REMARKS_COMMENTS)
        const user = localStorage.getItem('user')
        data.append('CREATE_BY', JSON.parse(user).user_id)
        data.append('USER_GROUP_ID', JSON.parse(user).USER_GROUP_ID)
        const documentArr = []
        for (let i = 0; i < this.model.REVIEW_DOCS.length; i++) {
          const val = this.stringifyDataIfComplexObject(this.model.REVIEW_DOCS[i])
          if (val) {
            documentArr.push(val)
          }
        }
        for (let i = 0; i < documentArr.length; i++) {
          data.append('DOCUMENT[' + i + ']', documentArr[i])
        }
        await consultantProfileServices.returnProfileUpdate(data)
        this.consultant = null
        this.getConsultantRecord()
        this.model.REVIEW_DOCS = []
        this.model.REMARKS_COMMENTS = null
        this.documentLoaded = false
      }
    },
    stringifyDataIfComplexObject (data) {
      if ('docID' in data) {
        return JSON.stringify(data)
      } else if ('file' in data) {
        return data.file
      }
    },
    handleClick (newTab) {
      this.currentTab = newTab
    }, // end tab
    onModelUpdated (newVal, schema) {
      // console.log(schema)
      // if (schema == 'document') {
      //   console.log(newVal.replace('C:\\fakepath\\', ''))
      //   this.model.document = newVal.replace('C:\\fakepath\\', '')
      // }
    },
  },
}
</script>
<style lang="css">
  textarea {
    text-transform: uppercase;
  }
</style>

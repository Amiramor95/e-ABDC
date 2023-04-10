<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <va-card>
            <div
              style="display:flex; justify-content: space-between;
    align-items: center; "
            >
              <h4 style="margin-top:0">Applicant Profile</h4>
              <button
                @click="goToEditProfilePage"
                type="button"
                class="ml-2 btn btn-primary btn-fill btn-md"
              >
                <i class="fa fa-edit" /> &nbsp;Edit
              </button>
            </div>
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
                  </div>
                </div>
                <div v-if="currentTab === 'tab2'">
                  <div class="ml-4">
                    <br />
                    <table class="table table-striped">
                      <tbody>
                        <tr>
                          <td>Category</td>
                          <td>Agent</td>
                        </tr>
                        <tr>
                          <td>Apprienticeship Program</td>
                          <td>Yes</td>
                        </tr>
                        <tr>
                          <td>Company Distributor</td>
                          <td>A.D.Fincancial Sdn. Bhd.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div v-if="currentTab === 'tab3'">
                  <div class="ml-4">
                    <br />
                    <table class="table table-striped">
                      <tr>
                        <th>No</th>
                        <th>Document</th>
                      </tr>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>
                            Cover letter for Former and Variation PRS consultant &nbsp; &nbsp;
                            &nbsp;
                            <a
                              href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
                              target="_blank"
                              class="row"
                            >
                              view</a
                            >
                          </td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td>
                            Letter of Undertaking for variation due to Merger &nbsp; &nbsp; &nbsp;
                            <a
                              href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
                              target="_blank"
                              class="row"
                            >
                              view</a
                            >
                          </td>
                        </tr>
                        <tr>
                          <td>3</td>
                          <td>
                            Printed online application &nbsp; &nbsp; &nbsp;
                            <a
                              href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
                              target="_blank"
                              class="row"
                            >
                              view</a
                            >
                          </td>
                        </tr>
                        <tr>
                          <td>4</td>
                          <td>
                            Statutory Declaration &nbsp; &nbsp; &nbsp;
                            <a
                              href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
                              target="_blank"
                              class="row"
                            >
                              view</a
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
                          <td>Examination Type</td>
                          <td>CUTE</td>
                        </tr>
                        <!-- <tr>
                                    <td>Exam Date</td>
                                    <td>Not Available</td>
                                  </tr>
                                   <tr>
                                    <td>Exam Session</td>
                                    <td>Not Available</td>
                                  </tr>
                                   <tr>
                                    <td>Exam Location</td>
                                    <td>Not Available</td>
                                  </tr> -->
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
                          </td>
                          <!-- <td> <a href="" target="_blank" >View</a></td> -->
                        </tr>
                        <tr>
                          <td>
                            Re-sit Exam
                          </td>
                          <td>
                            <button
                              @click="goToRegisterResitExamPage"
                              type="button"
                              class="mr-2 btn btn-info btn-fill btn-md"
                            >
                              Register
                            </button>
                          </td>
                          <!-- <td> <a href="" target="_blank" >View</a></td> -->
                        </tr>
                        <!-- <tr>
                          <td>
                            Appeal
                          </td>
                          <td>
                            <button
                              @click="appeal"
                              type="button"
                              class="mr-2 btn btn-info btn-fill btn-md"
                            >
                              Request Appeal
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            Appeal Status
                          </td>
                          <td>
                            Not Available
                          </td>
                        </tr> -->
                      </tbody>
                    </table>
                  </div>
                </div>
                <div v-if="currentTab === 'tab5'">
                  <div class="ml-3">
                    <br />
                    <table class="table table-striped">
                      <tbody>
                        <tr>
                          <td>
                            Appeal
                          </td>
                          <td>
                            <!-- Not Available -->
                            <button
                              @click="goToAppealPage"
                              type="button"
                              class="mr-2 btn btn-info btn-fill btn-md"
                            >
                              Request Appeal
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            Appeal Status
                          </td>
                          <td>
                            Not Available
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
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

Vue.use(VueFormGenerator);
const TABS = [
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
    title: 'Examination',
    value: 'tab4',
  },
  {
    title: 'Appeal',
    value: 'tab5',
  },
];
export default {
  created() {
    // const response = servicesmodule2.getCertificate(292);
    // console.log('Success', response);
    // const blob = new Blob([response.data]);
    // const objectUrl = URL.createObjectURL(blob);
    // this.pdfsrc = objectUrl;
    // return pdfsrc;

    const data = JSON.parse(localStorage.getItem("user"));
    this.currentConsultant = data.consultant;
  },

  mounted() {
    // this.getExamResult();
    console.log(JSON.stringify(this));
  },

  components: {
    Tabs,
    pdf,
  },

  data() {
    return {
      tabs: TABS,
      currentTab: 'tab1',
      pdfsrc: null,
      getResult: [],
      getResultPDF: [],

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
        REVIEW_DOCS: '',
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
                required: true,
                rows: 10,
                max: 1000,
                hint: 'Maximum characters of 1000',
                label: 'Remarks / Comments',
                model: 'REMARKS_COMMENTS',
                placeholder: 'Enter Remarks or Comments',
                styleClasses: 'col-md-12',
              },
              {
                text: 'Choose Document',
                model: 'REVIEW_DOCS',
                type: 'vfg-custom-multiple-file',
                styleClasses: 'col-md-12',
                required: true,
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
    };
  },

  methods: {
    goToAppealPage() {
      this.$router.push({ path: 'consultant-appeal-Consultant' });
    },
    goToRegisterResitExamPage() {
      this.$router.push({ path: 'consultant-resit-Consultant' });
    },
    goToEditProfilePage() {
      this.$router.push({ path: 'consultant-profile-update-Consultant' });
    },
    prevTab() {
      this.$router.go(-1);
    },
    saveAsDraft() {},
    validatestatusForm() {
      return this.$refs.statusForm.validate();
    },
    submitForm: async function() {
      const response = await this.validatestatusForm();
      if (response) {
        //
        const returnresponse = await services02module2.postResignConsultant(this.model);
      } else {
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

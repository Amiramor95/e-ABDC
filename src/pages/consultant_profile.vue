<template>
  <div class="content">
    <div class="container-fluid">
      <div class="card-body">
        <div class="row justify-content-center">
          <div class="col-lg-12">
            <va-card
              class="strpied-tabled-with-hover"
              body-classes="table-full-width table-responsive"
            >
              <h4 slot="header" class="card-title">
                Consultant Profile
              </h4>

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
                      <table class="table table-striped">
                        <tbody>
                          <tr>
                            <td>Name</td>
                            <td>NoorHidayah Binti Mohd Faizal</td>
                          </tr>
                          <tr>
                            <td>New NRIC</td>
                            <td>890408-03-5556</td>
                          </tr>
                          <tr>
                            <td>Date of Birth</td>
                            <td>08/04/1989</td>
                          </tr>

                          <tr>
                            <td>Address</td>
                            <td>3, Jalan Dato Abdul Aziz, Seksyen 14</td>
                          </tr>
                          <tr>
                            <td>Postcode</td>
                            <td>46100</td>
                          </tr>
                          <tr>
                            <td>City</td>
                            <td>Petaling Jaya,</td>
                          </tr>
                          <tr>
                            <td>State</td>
                            <td>Selangor</td>
                          </tr>
                          <tr>
                            <td>Telephone Number</td>
                            <td>014-6218910</td>
                          </tr>
                          <tr>
                            <td>Email</td>
                            <td>hidayah@gmail.com</td>
                          </tr>
                          <tr>
                            <td>Highest Qualification</td>
                            <td>Degree</td>
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
                            <td>Cover letter for Former and Variation PRS consultant
                              &nbsp;
                              &nbsp; &nbsp;
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
                            <td>Letter of Undertaking for variation due to Merger
                              &nbsp;
                              &nbsp; &nbsp;
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
                            <td>Printed online application
                              &nbsp;
                              &nbsp; &nbsp;
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
                            <td>Statutory Declaration
                              &nbsp;
                              &nbsp; &nbsp;
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
                    <div class="ml-4">
                      <br />
                      <table class="table table-striped">
                        <tbody>
                          <tr>
                            <td>Bankruptcy Check</td>
                            <td>Pass
                              &nbsp;
                              &nbsp; &nbsp;
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
                            <td>Remark</td>
                            <td>Bankruptcy Remark</td>
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
    <div class="container-fluid">
      <div class="card-body">
        <div class="row justify-content-center">
          <div class="col-lg-12">
            <va-card
              class="strpied-tabled-with-hover"
              body-classes="table-full-width table-responsive"
            >
              <h4 slot="header" class="card-title"></h4>
              <form class="ml-3">
                <div class="form-group">
                  <br />
                  <vue-form-generator
                    :model="model"
                    :schema="schema"
                    :options="formOptions"
                    @model-updated="onModelUpdated"
                    ref="statusForm"
                  >
                  </vue-form-generator>
                </div>
                <button
                  type="submit"
                  class="btn btn-primary btn-fill float-left btn-md"
                >
                  <i class="fa fa-step-backward" /> &nbsp; Previous
                </button>
                <div class="float-right">
                  <button
                    @click="saveAsDraft"
                    type="button"
                    class="mr-2 btn btn-info btn-fill btn-md"
                  >
                    <i class="fa fa-pencil-square-o" /> &nbsp; Save as draft
                  </button>

                  <button
                    @click="returnFile"
                    type="button"
                    class="btn btn-warning btn-fill btn-md"
                  >
                    <i class="fa fa-reply" /> &nbsp; Return
                  </button>
                  &nbsp;
                  <button
                    @click="submit"
                    type="button"
                    class="btn btn-success btn-fill btn-md"
                  >
                    <i class="fa fa-paper-plane" /> &nbsp; Discharge Consultant
                  </button>
                </div>
              </form>
            </va-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import VueFormGenerator from 'vue-form-generator'
import 'vue-form-generator/dist/vfg.css'
import Tabs from 'vue-tabs-with-active-line'
Vue.use(VueFormGenerator)
const TABS = [
  {
    title: 'Applicant Information',
    value: 'tab1',
  },
  {
    title: 'Type of Consultant',
    value: 'tab2',
  },
  {
    title: 'Uploaded Document',
    value: 'tab3',
  },
  {
    title: 'Bankruptcy Check Result',
    value: 'tab4',
  },
]
export default {
  components: {
    Tabs,
  },

  data () {
    return {
      tabs: TABS,
      currentTab: 'tab4',

      status: [
        {
          id: 'Discharge Consultant',
          name: 'Dishcharged Consultant',
        },
        {
          id: 'Un Discharged Consultant',
          name: 'Undischarged Consultant',
        },
      ],
      tagging: [
        {
          id: 'remove',
          name: 'Remove Tagging',
        },
        {
          id: 'special',
          name: 'Special Case',
        },
        {
          id: 'teminate',
          name: 'Terminate Consultant Under Bankruptcy',
        },
      ],

      schema: {
        fields: [
          // {
          //   type: "select",
          //   label: "Select",
          //   model: "status",
          //   styleClasses: "col-md-6",

          //   values: (model, schema) => {
          //     return this.status;
          //   },
          //   required: true,
          //   validator: "string",
          // },
          // {
          //         type: "select",
          //         label: "Label Tagging",
          //         model: "tagging",
          //         styleClasses: "col-md-6",

          //         values: (model, schema) => {
          //           return this.tagging;
          //         },
          //          required: true,
          //     validator: "string"
          //       },

          {
            type: 'textArea',
            label: 'Remark',
            model: 'Remark',
            hint: 'Max 500 characters',
            max: 500,
            rows: 4,
            required: true,
            validator: 'string',
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

  methods: {
    saveAsDraft () {},
    validatestatusForm () {
      return this.$refs.statusForm.validate()
    },
    returnFile: async function () {
      const reponse = await this.validatestatusForm()
      if (response) {
        //
      } else {
      }
    },
    submit: async function () {
      const response = await this.validatestatusForm()
      if (response) {
        //
      } else {
      }
    },
    handleClick (newTab) {
      this.currentTab = newTab
    }, // end tab
    onModelUpdated (newVal, schema) {
      console.log(schema)
      if (schema == 'document') {
        console.log(newVal.replace('C:\\fakepath\\', ''))
        this.model.document = newVal.replace('C:\\fakepath\\', '')
      }
    },
  },
}
</script>

<style lang="scss" scoped>

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
    color: black;
    text-decoration: none;
    border: none;
    background-color: transparent;
    border-bottom: 2px solid transparent;
    cursor: pointer;
    transition: all 0.25s;
    font-weight: bold !important;

    &_active {
      color: white !important;
      background-color: rgb(79, 94, 127) !important;
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
    background-color: transparent;
    transition: transform 0.4s ease, width 0.4s ease;
  }
}
</style>

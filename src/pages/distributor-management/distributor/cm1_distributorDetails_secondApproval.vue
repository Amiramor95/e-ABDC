<template>
  <div class="content">
    <div class="container-fluid">
      <div class="card-body">
        <div class="row justify-content-center">
          <div class="col-lg-12">
            <card
              class="strpied-tabled-with-hover"
              body-classes="table-full-width table-responsive"
            >
              <h4 slot="header" class="card-title">
                Distributor Details
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
                            <td style="width: 20%;">Distributor Name</td>
                            <td style="width: 1%;">:</td>
                            <td>A.D.Fincancial Sdn. Bhd.</td>
                          </tr>
                          <tr>
                            <td>Registration No</td>
                            <td>:</td>
                            <td>871180-W</td>
                          </tr>
                          <tr>
                            <td>New Registration No</td>
                            <td>:</td>
                            <td>871180-W</td>
                          </tr>
                          <tr>
                            <td>Address</td>
                            <td>:</td>
                            <td>3, Jalan Dato Abdul Aziz, Seksyen 14</td>
                          </tr>
                          <tr>
                            <td>Postcode</td>
                            <td>:</td>
                            <td>46100</td>
                          </tr>
                          <tr>
                            <td>City</td>
                            <td>:</td>
                            <td>Petaling Jaya</td>
                          </tr>
                          <tr>
                            <td>State</td>
                            <td>:</td>
                            <td>Selangor</td>
                          </tr>
                          <tr>
                            <td>Country</td>
                            <td>:</td>
                            <td>Malaysia</td>
                          </tr>
                          <tr>
                            <td>Telephone Number</td>
                            <td>:</td>
                            <td>0379568833</td>
                          </tr>
                          <tr>
                            <td>Fax Number</td>
                            <td>:</td>
                            <td>0379568853</td>
                          </tr>
                          <tr>
                            <td>Email</td>
                            <td>:</td>
                            <td>info@adfinance.my</td>
                          </tr>
                          <tr>
                            <td>Application Type</td>
                            <td>:</td>
                            <td>Member</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div v-if="currentTab === 'tab2'">
                    <div class="ml-4">
                      <br />
                      <button v-b-toggle.collapse-1 type="button" class="btn btn-warning btn-fill btn-md" >
                        Authorised Representative &nbsp;
                        <i class="fa fa-caret-square-o-down" />
                      </button>
                              &nbsp;
                      <button v-b-toggle.collapse-2 type="button" class="btn btn-warning btn-fill btn-md" >
                        Alternate Authorised Representative &nbsp;
                        <i class="fa fa-caret-square-o-down" />
                      </button>
                      <br>
                      <b-collapse id="collapse-1" class="mt-2">
                        <br>
                        <h4>Authorised Representative (AR)</h4>
                        <table class="table table-striped">
                          <tbody>
                            <tr>
                              <td style="width: 20%;">Name</td>
                              <td style="width: 1%;">:</td>
                              <td>Mr. Muhammad Ali Bin Mokhtar</td>
                            </tr>
                            <tr>
                              <td>Citizenship</td>
                              <td>:</td>
                              <td>Malaysian</td>
                            </tr>
                            <tr>
                              <td>NRIC No</td>
                              <td>:</td>
                              <td>770907-14-7887</td>
                            </tr>
                            <tr>
                              <td>Position</td>
                              <td>:</td>
                              <td>Sr Manager</td>
                            </tr>

                            <tr>
                              <td>Address</td>
                              <td>:</td>
                              <td>No 53,Jalan Kajang Perdan 2/5,Taman Kajang Perdana</td>
                            </tr>
                            <tr>
                              <td>Postcode</td>
                              <td>:</td>
                              <td>53000</td>
                            </tr>
                            <tr>
                              <td>City</td>
                              <td>:</td>
                              <td>Kajang</td>
                            </tr>
                            <tr>
                              <td>State</td>
                              <td>:</td>
                              <td>Selangor</td>
                            </tr>
                            <tr>
                              <td>Country</td>
                              <td>:</td>
                              <td>Malaysia</td>
                            </tr>
                            <tr>
                              <td>Telephone Number</td>
                              <td>:</td>
                              <td>0146328970</td>
                            </tr>
                            <tr>
                              <td>Fax Number</td>
                              <td>:</td>
                              <td>-</td>
                            </tr>
                            <tr>
                              <td>Email</td>
                              <td>:</td>
                              <td>ali@adfinance.my</td>
                            </tr>
                          </tbody>
                        </table>
                      </b-collapse>

                      <b-collapse id="collapse-2" class="mt-2">
                        <br>
                        <h4>Alternative Representative (AAR)</h4>
                        <table class="table table-striped">
                          <tbody>
                            <tr>
                              <td style="width: 20%;">Name</td>
                              <td style="width: 1%;">:</td>
                              <td>Mrs. Kelly Smith</td>
                            </tr>
                            <tr>
                              <td>Citizenship</td>
                              <td>:</td>
                              <td>Non-Malaysian</td>
                            </tr>
                            <tr>
                              <td>Passport No</td>
                              <td>:</td>
                              <td>A123456</td>
                            </tr>
                            <tr>
                              <td>Passport Expiry Date</td>
                              <td>:</td>
                              <td>20/11/2025</td>
                            </tr>
                            <tr>
                              <td>Position</td>
                              <td>:</td>
                              <td>Sr Manager</td>
                            </tr>

                            <tr>
                              <td>Address</td>
                              <td>:</td>
                              <td>No 53,Jalan Kajang Perdan 2/5,Taman Kajang Perdana</td>
                            </tr>
                            <tr>
                              <td>Postcode</td>
                              <td>:</td>
                              <td>53000</td>
                            </tr>
                            <tr>
                              <td>City</td>
                              <td>:</td>
                              <td>Kajang</td>
                            </tr>
                            <tr>
                              <td>State</td>
                              <td>:</td>
                              <td>Selangor</td>
                            </tr>
                            <tr>
                              <td>Country</td>
                              <td>:</td>
                              <td>Malaysia</td>
                            </tr>
                            <tr>
                              <td>Telephone Number</td>
                              <td>:</td>
                              <td>0146328970</td>
                            </tr>
                            <tr>
                              <td>Fax Number</td>
                              <td>:</td>
                              <td>-</td>
                            </tr>
                            <tr>
                              <td>Email</td>
                              <td>:</td>
                              <td>kelly@adfinance.my</td>
                            </tr>
                          </tbody>
                        </table>
                      </b-collapse>
                    </div>
                  </div>
                  <div v-if="currentTab === 'tab3'">
                    <div class="ml-4">
                      <br />
                      <button v-b-toggle.collapse-1 type="button" class="btn btn-warning btn-fill btn-md" >
                        CEO Profile &nbsp;
                        <i class="fa fa-caret-square-o-down" />
                      </button>
                              &nbsp;
                      <button v-b-toggle.collapse-2 type="button" class="btn btn-warning btn-fill btn-md" >
                        Director Details &nbsp;
                        <i class="fa fa-caret-square-o-down" />
                      </button>
                      <br>
                      <b-collapse id="collapse-1" class="mt-2">
                        <br>
                        <h4>CEO Profile</h4>
                        <table class="table table-striped">
                          <tbody>
                            <tr>
                              <td style="width: 20%;">Name</td>
                              <td style="width: 1%;">:</td>
                              <td>Mr. Ali Bin Mokhtar</td>
                            </tr>
                            <tr>
                              <td>Citizenship</td>
                              <td>:</td>
                              <td>Malaysian</td>
                            </tr>
                            <tr>
                              <td>NRIC No</td>
                              <td>:</td>
                              <td>770907-14-7887</td>
                            </tr>
                            <tr>
                              <td>Position</td>
                              <td>:</td>
                              <td>Chief Executive Officer (CEO)</td>
                            </tr>

                            <tr>
                              <td>Address</td>
                              <td>:</td>
                              <td>No 53,Jalan Kajang Perdan 2/5,Taman Kajang Perdana</td>
                            </tr>
                            <tr>
                              <td>Postcode</td>
                              <td>:</td>
                              <td>53000</td>
                            </tr>
                            <tr>
                              <td>City</td>
                              <td>:</td>
                              <td>Kajang</td>
                            </tr>
                            <tr>
                              <td>State</td>
                              <td>:</td>
                              <td>Selangor</td>
                            </tr>
                            <tr>
                              <td>Country</td>
                              <td>:</td>
                              <td>Malaysia</td>
                            </tr>
                            <tr>
                              <td>Telephone Number</td>
                              <td>:</td>
                              <td>0146328970</td>
                            </tr>
                            <tr>
                              <td>Fax Number</td>
                              <td>:</td>
                              <td>-</td>
                            </tr>
                            <tr>
                              <td>Email</td>
                              <td>:</td>
                              <td>ali@adfinance.my</td>
                            </tr>
                          </tbody>
                        </table>
                      </b-collapse>
                      <b-collapse id="collapse-2" class="mt-2">
                        <br>
                        <h4>Director Details</h4>
                        <table class="table">
                          <tbody>
                            <tr style="background-color: lightgrey;">
                              <th>No</th>
                              <th>Name</th>
                              <th>NRIC No</th>
                              <th>Effective Date</th>
                              <th>End Date</th>
                            </tr>
                            <tr>
                              <td style="width: 10%;">1</td>
                              <td style="width: 30%;">Dr Haslinda Binti Haji Azmi</td>
                              <td style="width: 20%;">560807-10-3345</td>
                              <td style="width: 20%;">20/01/2018</td>
                              <td style="width: 20%;">20/01/2025</td>
                            </tr>
                            <tr>
                              <td>2</td>
                              <td>Dato Hashim Binti Dato Harun</td>
                              <td>570807-10-3345</td>
                              <td>01/01/2019</td>
                              <td>20/01/2023</td>
                            </tr>
                          </tbody>
                        </table>
                      </b-collapse>

                    </div>
                  </div>
                  <div v-if="currentTab === 'tab4'">
                    <div class="ml-4">
                      <br />
                      <h4>Contact Person</h4>
                      <table class="table table-striped">
                        <tbody>
                          <tr>
                            <td style="width: 20%;">Name</td>
                            <td style="width: 1%;">:</td>
                            <td>Mr. Najwan Bin Sudi</td>
                          </tr>
                          <tr>
                            <td>Citizenship</td>
                            <td>:</td>
                            <td>Malaysian</td>
                          </tr>
                          <tr>
                            <td>NRIC No</td>
                            <td>:</td>
                            <td>870907-04-7887</td>
                          </tr>
                          <tr>
                            <td>Position</td>
                            <td>:</td>
                            <td>Manager</td>
                          </tr>

                          <tr>
                            <td>Address</td>
                            <td>:</td>
                            <td>No 53,Jalan Kajang Perdan 2/5,Taman Kajang Perdana</td>
                          </tr>
                          <tr>
                            <td>Postcode</td>
                            <td>:</td>
                            <td>53000</td>
                          </tr>
                          <tr>
                            <td>City</td>
                            <td>:</td>
                            <td>Kajang</td>
                          </tr>
                          <tr>
                            <td>State</td>
                            <td>:</td>
                            <td>Selangor</td>
                          </tr>
                          <tr>
                            <td>Country</td>
                            <td>:</td>
                            <td>Malaysia</td>
                          </tr>
                          <tr>
                            <td>Telephone Number</td>
                            <td>:</td>
                            <td>0146328970</td>
                          </tr>
                          <tr>
                            <td>Fax Number</td>
                            <td>:</td>
                            <td>-</td>
                          </tr>
                          <tr>
                            <td>Email</td>
                            <td>:</td>
                            <td>najwan@adfinance.my</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                  </div>
                  <div v-if="currentTab === 'tab5'">
                    <div class="ml-5">
                      <br>
                      <!-- <vue-form-generator
                            :model="model"
                            :schema="Tab5Schema"
                            :options="formOptions"
                            ref="Tab5Form" >
                          </vue-form-generator> -->
                      <table class="table table-striped">
                        <tbody>
                          <tr>
                            <td style="width: 20%;">Reference</td>
                            <td style="width: 1%;">:</td>
                            <td> 456765678 </td>
                          </tr>
                          <tr>
                            <td style="width: 20%;">Transaction Date</td>
                            <td style="width: 1%;">:</td>
                            <td> 20/10/2020 </td>
                          </tr>
                          <tr>
                            <td style="width: 20%;">Transaction Type</td>
                            <td style="width: 1%;">:</td>
                            <td> Online Transaction </td>
                          </tr>
                          <tr>
                            <td style="width: 20%;">Account Type</td>
                            <td style="width: 1%;">:</td>
                            <td> Saving Account </td>
                          </tr>
                          <tr>
                            <td style="width: 20%;">Reference</td>
                            <td style="width: 1%;">:</td>
                            <td> Federation of Investment Managers Malaysia </td>
                          </tr>
                          <tr>
                            <td style="width: 20%;">Beneficiary Bank</td>
                            <td style="width: 1%;">:</td>
                            <td> Maybank </td>
                          </tr>
                          <tr>
                            <td style="width: 20%;">Beneficiary Account No.</td>
                            <td style="width: 1%;">:</td>
                            <td> 234567876567 </td>
                          </tr>
                          <tr>
                            <td style="width: 20%;">Receipient Reference</td>
                            <td style="width: 1%;">:</td>
                            <td> A.D Financial Sdn Bhd </td>
                          </tr>
                          <tr>
                            <td style="width: 20%;">Other Payment Details</td>
                            <td style="width: 1%;">:</td>
                            <td>  </td>
                          </tr>
                          <tr>
                            <td style="width: 20%;">Amount</td>
                            <td style="width: 1%;">:</td>
                            <td> RM 5,000.00 </td>
                          </tr>
                        </tbody>
                      </table>

                      <br>
                      <table class="ml-4 mt-2">
                        <tr>
                          <td><a href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" class="row" target="_blank"> View Receipt Payment &nbsp; <i class="fa fa-eye" /></a></td>
                        </tr>
                      </table>

                    </div>
                  </div>

                  <div v-if="currentTab === 'tab6'">
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
                            <td>Board of Directors' Resolution approving the appointment of the AR
                              &nbsp; &nbsp; &nbsp; <a href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" target="_blank" class="row"> view</a> </td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td>Certified true copy of relevant CMSL and approval that verify the eligibility of the applicant (if applicable)
                              &nbsp; &nbsp; &nbsp; <a href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" target="_blank" class="row"> view</a>
                            </td>
                          </tr>
                          <tr>
                            <td>3</td>
                            <td>Payment of application and annual fees
                              &nbsp; &nbsp; &nbsp; <a href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" target="_blank" class="row"> view</a>
                            </td>
                          </tr>
                          <tr>
                            <td>4</td>
                            <td>Printed online applicationType
                              &nbsp; &nbsp; &nbsp; <a href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" target="_blank" class="row"> view</a></td>
                          </tr>
                          <tr>
                            <td>5</td>
                            <td>
                              Logo
                              &nbsp; &nbsp; &nbsp; <a href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" target="_blank" class="row"> view</a> </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </card>
          </div>
        </div>
      </div>
    </div>

    <div class="container-fluid">
      <div class="card-body">
        <div class="row justify-content-center">
          <div class="col-lg-12">
            <card
              class="strpied-tabled-with-hover"
              body-classes="table-full-width table-responsive"
            >
              <form class="ml-3">
                <h4 slot="header" class="card-title">Second Level Approval</h4>
                <vue-form-generator
                  :model="model"
                  :schema="applicationtypeschema"
                  :options="formOptions"
                  @model-updated="onModelUpdated"
                  ref="statusForm"
                >
                </vue-form-generator>

                <button type="submit"  class="btn btn-primary btn-fill float-left btn-md">
                  <i class="fa fa-step-backward" /> &nbsp; Previous
                </button>
                <div class="float-right">
                  <button @click="saveAsDraft" type="button" class="mr-2 btn btn-secondary btn-fill btn-md">
                    <i class="fa fa-download" /> &nbsp; Download
                  </button>
                  <button @click="saveAsDraft" type="button" class="mr-2 btn btn-info btn-fill btn-md">
                    <i class="fa fa-pencil-square-o" /> &nbsp; Save as draft
                  </button>
                  <button type="submit"  class="mr-2 btn btn-warning btn-fill btn-md" @click.prevent="submit">
                    <i class="fa fa-reply" /> &nbsp; return
                  </button>
                  <button  @click="submit" type="button"  class="ml-2 btn btn-success btn-fill btn-md">
                    <i class="fa fa-paper-plane" /> &nbsp; Approve
                  </button>
                </div>
              </form>
            </card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import VueFormGenerator from 'vue-form-generator'
import 'vue-form-generator/dist/vfg.css'
import Vue from 'vue'
import Tabs from 'src/VueTabsWithActiveLine.vue'
const TABS = [
  {
    title: 'Distributor Profile',
    value: 'tab1',
  },
  {
    title: 'Authorised Representative',
    value: 'tab2',
  },
  {
    title: 'CEO & Director',
    value: 'tab3',
  },
  {
    title: 'Additional Information',
    value: 'tab4',
  },
  {
    title: 'Payment Information',
    value: 'tab5',
  },

  {
    title: 'Uploaded Document',
    value: 'tab6',
  },
]
const TABS2 = [
  {
    title: 'Respond And Justification',
    value: 'tab1',
  },
  {
    title: 'Suspension Details',
    value: 'tab2',
  },
]
export default {
  components: {
    Tabs,
  },

  data () {
    return {
      tabs: TABS,
      currentTab: 'tab1',

      tabs2: TABS2,
      currentTab2: 'tab1',

      model: {
        remark: '',
        // TAB 5: payment information

        referenceNo: '456765678',
        transactionType: 'Online Transaction',
        transactionDate: '20/10/2020',
        accountType: 'Saving Account',
        beneficiaryName: 'Federation of Investment Managers Malaysia',
        beneficiaryBank: 'Maybank',
        beneficiaryAccNo: '234567876567',
        receipientRef: 'A.D Financial Sdn Bhd',
        otherPaymentDetails: '',
        amount: 'RM 5,000.00',
      },
      applicationtypeschema: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'textArea',
                label: 'Remarks/ Comments',
                model: 'Remark',
                hint: 'Max 500 characters',
                max: 500,
                rows: 4,
                required: false,
                validator: 'string',
              },
              {
                type: 'input',
                inputType: 'file',
                label: 'Document Upload',
                model: 'file',
              },
            ],
          },
        ],
      },

      Tab5Schema: {
        fields: [
          {
            type: 'input',
            inputType: 'text',
            label: 'Reference No',
            model: 'referenceNo',
            styleClasses: 'col-md-5',
            disabled: true,
          },
          {
            type: 'input',
            inputType: 'text',
            label: 'Transaction Date',
            model: 'transactionDate',
            styleClasses: 'col-md-5',
            disabled: true,
          },
          {
            type: 'input',
            inputType: 'text',
            label: 'Transaction Type',
            model: 'transactionType',
            styleClasses: 'col-md-10',
            disabled: true,
          },
          {
            type: 'input',
            inputType: 'text',
            label: 'Account Type',
            model: 'accountType',
            styleClasses: 'col-md-10',
            disabled: true,
          },
          {
            type: 'input',
            inputType: 'text',
            label: 'Beneficiary Name',
            model: 'beneficiaryName',
            styleClasses: 'col-md-10',
            disabled: true,
          },
          {
            type: 'input',
            inputType: 'text',
            label: 'Beneficiary Bank',
            model: 'beneficiaryBank',
            styleClasses: 'col-md-5',
            disabled: true,
          },
          {
            type: 'input',
            inputType: 'text',
            label: 'Beneficiary Account No',
            model: 'beneficiaryAccNo',
            styleClasses: 'col-md-5',
            disabled: true,
          },
          {
            type: 'input',
            inputType: 'text',
            label: 'Receipient Reference',
            model: 'receipientRef',
            styleClasses: 'col-md-5',
            disabled: true,
          },
          {
            type: 'input',
            inputType: 'text',
            label: 'Other Payment Details',
            model: 'otherPaymentDetails',
            styleClasses: 'col-md-5',
            disabled: true,
          },
          {
            type: 'input',
            inputType: 'text',
            label: 'Amount',
            model: 'amount',
            styleClasses: 'col-md-5',
            disabled: true,
          },
        ],
      },
      formOptions: {
        // validateAfterLoad: false,
        validateAfterChanged: true,
        // validateAsync: true,
      },
    }
  },

  methods: {
    saveAsDraft () {},
    validatestatusForm () {
      return this.$refs.statusForm.validate()
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
    handleClick2 (newTab) {
      this.currentTab2 = newTab
    },
    onModelUpdated (newVal, schema) {
      console.log(newVal)

      if (schema == 'status') {
        this.model.applicationType = newVal
        if (newVal == '2') {
          this.visibledatesuspension = true
        } else this.visibledatesuspension = true
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

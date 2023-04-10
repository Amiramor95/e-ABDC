<template>
          <va-card>
            <br/>
            <h4 slot="header" class="card-title">
              Divestment Submission
            </h4>

            <va-card>
              <div class="ml-3 col-md-12">Distributor Details
                <span v-if="visibleProfile == false">:<b> BANK MUAMALAT </b></span>
        <button
          v-if="visibleProfile == true"
          v-b-toggle.collapse-3
          type="button"
          class="float-right btn-fill btn-md"
        >
          <i class="fa fa-eye-slash"></i>
        </button>
        <button
          v-if="visibleProfile == false"
          v-b-toggle.collapse-3
          type="button"
          class="float-right btn-fill btn-md"
        >
          <i class="fa fa-eye"></i>
        </button>

                <hr />

                <b-collapse id="collapse-3" class="mt-2" v-model="visibleProfile">
                  <table class="table table-striped">
                  <tbody>
              <tr>
                <td style="width: 15%">Distributor Name</td>
                <td>BANK MUAMALAT</td>
              </tr>
              <tr>
                <td>Company Registration No</td>
                <td></td>
              </tr>
              <tr>
                <td>New Company Registration No</td>
                <td></td>
              </tr>
              <tr>
                <td>Address</td>
                <td></td>
              </tr>
              <tr>
                <td>Postcode</td>
                <td ></td>
              </tr>
              <tr>
                <td>City</td>
                <td ></td>
              </tr>
              <tr>
                <td>State</td>
                <td ></td>
              </tr>
              <tr>
                <td>Country</td>
                <td></td>
              </tr>
              <tr>
                <td>Telephone Number</td>
                <td ></td>
              </tr>
              <tr>
                <td>Fax Number</td>
                <td></td>
              </tr>
              <tr>
                <td>Email</td>
                <td></td>
              </tr>
            </tbody>
                </table>
                </b-collapse>

              </div>
            </va-card>
            <br /><br />
            <va-card>
              <div class="ml-3 col-md-12">Divestment Details
                <hr />
                <div>
                  <div class="row m-2">
                    <h6>Merger and Acquisition</h6>
                  </div>
                        <div class="ml-4">
                          <table class="table table-striped">
                            <tbody>
                              <tr>
                                <td style="width: 35%">
                                  Company Name involved in merger and
                                  acquisition 
                                </td>
                                <td >: A.D.Fincancial Sdn. Bhd.</td>
                              </tr>
                              <tr>
                                <td style="width: 35%">Legal Day One </td>
                                <td>: </td>
                              </tr>
                              <tr>
                                <td style="width: 35%">Cessation Date </td>
                                <td>: 30-10-2020</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      
                      <br/>
                      <div class="row m-2">
                        <h6>Fund</h6>
                      </div>
                      <div class="col-ml-2">
                      <b-table
                        hover
                        :items="fundList"
                        :fields="fields"
                        :current-page="currentPage"
                        :per-page="perPage"
                        :filter="filter"
                        responsive="md"
                      >
                        <template #cell(index)="data">
                          {{ data.index + 1 }}
                        </template>
                        <template #cell()="data">
                          <span class="description">{{ data.value }}</span>
                        </template>
                        <template #cell(actions)="data">
                          <base-checkbox
                            v-model="data.selected"
                          ></base-checkbox>
                        </template>
                      </b-table>
                    </div>
                      <br/>
                      <div class="row m-2">
                        <h6>Consultant</h6>
                      </div>
                      <div class="col-ml-2">
                      <b-table
                        hover
                        :items="ConsultantList"
                        :fields="fieldsConsultant"
                        :current-page="currentPage"
                        :per-page="perPageConsultant"
                        :filter="filterConsultant"
                        responsive="md"
                      >
                        <template #cell(index)="data">
                          {{ data.index + 1 }}
                        </template>
                        <template #cell()="data">
                          <span class="description">{{ data.value }}</span>
                        </template>
                        <template #cell(actions)="data">
                          <base-checkbox
                            v-model="data.selected"
                          ></base-checkbox>
                        </template>
                      </b-table>
                    </div>

                </div>

            </va-card>
            <br /><br />
            <va-card>
              <div class="ml-3 col-md-12">Document Checklist
                <hr />
               </div>
                <div class="row m-2">
                  <span class="col mt-2 description"
                      >Notification letter to FIMM including the following
                      information:- &nbsp;
                      <a
                        href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
                        >View</a
                      ><br /><br />
                      i. To indicate the registration of Unit Trust Scheme
                      Consultants/Private Retirement Scheme Consultants have
                      been terminated. <br />
                      ii. Existing investors have been informed of alternatives
                      available to them if they wish to deal with their unit
                      trust schemes / private retirement schemes including
                      redemption/withdrawal, transfer and switching. <br />
                      iii. Provision for termination under the distribution
                      arrangement with UTMC/IUTA/PRS Provider/IPRA has been
                      fulfilled
                    </span>
                </div>
            </va-card>
            <br /><br />
            <va-card>
              <br />
            <vue-form-generator
              :model="model"
              :schema="fourthTabSchema"
              :options="formOptions"
              ref="regForm"
              @model-updated="onModelUpdated"
            >
            </vue-form-generator>
            <br />
            </va-card>
            <br/>
            <br/>
            <button
              @click="back"
              type="button"
              class="btn btn-primary btn-fill btn-md"
            >
              <i class="fa fa-step-backward" /> &nbsp; Previous
            </button>
            <div class="float-right">
              <button  type="button" class="mr-2 btn btn-info btn-fill btn-md">
                    <i class="fa fa-pencil-square-o" /> &nbsp; Save as draft
                  </button>
                  <button type="submit" class="mr-2 btn btn-warning btn-fill btn-md"  @click.prevent="submit">
                    <i class="fa fa-reply" /> &nbsp; Return
                  </button>
                   <button type="submit" class="mr-2 btn btn-danger btn-fill btn-md"  @click.prevent="submit">
                    <i class="fa fa-reply" /> &nbsp; Reject
                  </button>
                  <button type="button" class="ml-2 btn btn-success btn-fill btn-md">
                    <i class="fa fa-paper-plane" /> &nbsp; Approve
                  </button>
            </div>
            <br />
          </va-card>
</template>
<script>
import VueFormGenerator from "vue-form-generator";
import "vue-form-generator/dist/vfg-core.css";
import "bootstrap/dist/css/bootstrap.css";
import Vue from "vue";
import * as servicesModule6 from "../../../../app/module6/services05";
import * as services06Module0 from "../../../../app/module0/services06";
Vue.use(VueFormGenerator);
export default {
  mounted() {
    this.getIssueingBank();
    this.getBallance();
  },

  components: {},

  data() {
    return {
      visibleProfile: false,
      details: [],
      RecordBank: [],

      fields: [
        // A virtual column that doesn't exist in items
        { key: "index", label: "No" },
        // A column that needs custom formatting
        { key: "fundName", label: "Fund Name" },
        { key: "actions", label: "" }
      ],
      fieldsConsultant: [
        // A virtual column that doesn't exist in items
        { key: "index", label: "No" },
        // A column that needs custom formatting
        { key: "consultantName", label: "Consultant Name" },
        { key: "actions", label: "" }
      ],
      ConsultantList: [
        {
          id: "1",
          consultantName: "Dr. Nor Asyikin binti Ahmad",
          selected: false
        },
        {
          id: "2",
          consultantName: "Mohd shukur Zaman",
          selected: false
        }
      ],
      fundList: [
        {
          id: "1",
          fundName: "AFFIN HWANG FLEXIBLE MATURITY INCOME 20",
          selected: false
        },
        {
          id: "2",
          fundName: "AFFIN HWANG SHARIAH GOLD TRACKER",
          selected: false
        },
        {
          id: "3",
          fundName: "EASTSPRING INVESTMENTS TARGET INCOME 12",
          selected: false
        }
      ],

      formOptions: {
        // validationErrorClass: "has-error",
        // validationSuccessClass: "has-`success`",
        validateAfterChanged: true,
      },

      model: {
        details: "",
        IssueBank: "",
        prepaymentAmount: "",
        ReffNumber: "",
        remarks: "",
      },

      fourthTabSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "textArea",
                label: "Remarks/Comments",
                model: "remarks",
                hint: "Max 1000 characters",
                max: 500,
                rows: 4,
                required: false,
                validator: "string",
                styleClasses: "col-md-11",
              },
              {
                labels: 'Upload Document',
                accept: '.pdf',
                multiple: true,
                text: 'Choose a File',
                model: 'file',
                type: 'vfg-custom-multiple-file',
                styleClasses: 'col-md-12',
                required: false,
              },
            ],
          },
        ],
      },
    };
  },
  methods: {
    // get issueing bank
    getIssueingBank: async function () {
      const response = await servicesModule6.getIssueingBank();
      this.RecordBank = response;
    },

    // Get ballance
    getBallance: async function () {
      const user = localStorage.getItem("user");
      const response = await servicesModule6.getBallance(
        JSON.parse(user).user_id
      );
      this.details = response;
    },

    handleFileChange(e) {
      this.$emit("input", e.target.files[0]);
      this.fileName1 = e.target.files[0].name;
      console.log(e.target.files[0].name);
    },
    validateRegisterForm() {
      return this.$refs.regForm.validate();
    },

    // back button
    back() {
      this.$router.go(-1);
    },

    async submit() {
      if (this.$refs.regForm.validate()) {
        const data = new FormData();
        const user = localStorage.getItem("user");
        data.append("DIST_USER_ID", JSON.parse(user).user_id);
        data.append("DEBIT_AMOUNT", this.model.prepaymentAmount);
        data.append("PREPAYMENT_PAYMENT_REFERENCE", this.model.ReffNumber);
        data.append("TRANS_REMARK", this.model.remarks);
        data.append("DIST_TRANS_TYPE", "1");
        data.append("CREDIT_AMOUNT", "0");
        data.append("FIN_TRANS_TYPE", "3");
        data.append("CURRENCY", "1");
        data.append("TRANS_STATUS", "15");
        data.append("TRANS_BANK", this.model.IssueBank.SETTING_GENERAL_ID);

        const approvalLevel = await services06Module0.getApprovalLevel(19, 1);
        data.append("APPR_LIST", JSON.stringify(approvalLevel));
        //notification
        data.append("NOTI_LOCATION", "PrepaymentTopup-list");
        var code = "";
        code = this.details.DIST_NAME;
        var remarkEntry = "(FN) Prepayment Topup Submission for " + code;

        data.append("NOTI_REMARK", remarkEntry);
        try {
          // eslint-disable-next-line no-unused-vars
          const response = await servicesModule6.createPrepayment(data);
          this.$router.push("/distributor/DistributorDivestment-Approval");
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
};
</script>

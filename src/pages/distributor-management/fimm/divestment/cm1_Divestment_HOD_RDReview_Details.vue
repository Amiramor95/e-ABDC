<template>
  <va-card>
    <br />
    <span v-if="DIVESTMENTDETAILS.DIVE_TYPE == '35'"
      ><h4 slot="header" class="card-title">
        Fund Divestment Submission
      </h4></span
    >
    <span v-if="DIVESTMENTDETAILS.DIVE_TYPE == '36'"
      ><h4 slot="header" class="card-title">
        Consultant Divestment Submission
      </h4></span
    >
    <span v-if="DIVESTMENTDETAILS.DIVE_TYPE == '37'"
      ><h4 slot="header" class="card-title">
        Fund and Consultant Divestment Submission
      </h4></span
    >
    <br />

    <va-card>
      <div class="ml-3 col-md-12">
        Distributor Details
        <span v-if="visibleProfile == false"
          >:<b> {{ DIVESTMENTDETAILS.DIST_DIVE_NAME }} </b></span
        >
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
                <td style="width: 20%">Distributor Name</td>
                <td>: {{ details.DIST_NAME }}</td>
              </tr>
              <tr>
                <td>Company Registration No</td>
                <td>: {{ details.DIST_REGI_NUM1 }}</td>
              </tr>
              <tr>
                <td>New Company Registration No</td>
                <td>: {{ details.DIST_REGI_NUM2 }}</td>
              </tr>
              <tr>
                <td>Address</td>
                <td>:
                      {{ details.DIST_ADDR_1 }}
                      {{ details.DIST_ADDR_2 }}
                      {{ details.DIST_ADDR_3 }} {{ details.POSTCODE_NO }}{{ details.DIST_POSTAL2 }}<br />
                      {{ details.SET_CITY_NAME }}{{ details.DIST_CITY2}}<br />
                      {{ details.STATE_NAME }}{{ details.DIST_STATE2 }}<br />
                      {{ details.COUNTRY_NAME }}{{ details.DIST_COUNTRY2 }}
                </td>
              </tr>
              <tr>
                <td>Telephone Number</td>
                <td>: {{ details.DIST_PHONE_NUMBER }}</td>
              </tr>
              <tr>
                <td>Fax Number</td>
                <td>: {{ details.DIST_FAX_NUMBER }}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>: {{ details.DIST_EMAIL }}</td>
              </tr>
            </tbody>
          </table>
        </b-collapse>
      </div>
    </va-card>
    <br /><br />
    <va-card>
      <div class="ml-3 col-md-12">
        Divestment Details
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
                    Company Name involved in merger and acquisition
                  </td>
                  <td>: {{ DIVESTMENTDETAILS.DIST_MERGE_NAME }}</td>
                </tr>
                <tr>
                  <td style="width: 35%">
                    Cease Operation
                  </td>
                  <td v-if="DIVESTMENTDETAILS.CEASE_STATUS == 2">: NO</td>
                  <td v-if="DIVESTMENTDETAILS.CEASE_STATUS == 1">: YES</td>
                </tr>
              </tbody>
            </table>
            <br />
          </div>
        </div>

        <br />
        <div v-if="DIVESTMENTDETAILS.DIVE_TYPE == '35' || DIVESTMENTDETAILS.DIVE_TYPE == '37' ">
          <div class="row m-2">
            <h6>Fund</h6>
          </div>

          <div class="col-ml-2">
            <va-card>
              <va-data-table
                :fields="RecordFields"
                :data="RecordFilteredData"
                no-data-label="No data found"
                :datacount="RecordCount"
                clickable
              >
                <template slot="no" slot-scope="row">
                  {{ row.rowIndex + 1 }}
                </template>
              </va-data-table>
            </va-card>
          </div>

          <br />
          <div>
            <!-- second level agreement item to be added -->
            <vue-form-generator
              :model="model"
              :schema="secondLevelSchema"
              :options="formOptions"
              ref="regForm"
              @model-updated="onModelUpdated"
            >
            </vue-form-generator>
          </div>
        </div>
        <br/>
        <div v-if="DIVESTMENTDETAILS.DIVE_TYPE == '36' || DIVESTMENTDETAILS.DIVE_TYPE == '37' ">
          <div class="row m-2">
            <h6>Consultant</h6>
          </div>

          <div class="col-ml-2">
            <va-card>
              <va-data-table
                :fields="ConsultantRecordFields"
                :data="ConsultantFilteredData"
                no-data-label="No data found"
                :datacount="RecordCount"
                clickable
              >
                <template slot="no" slot-scope="row">
                  {{ row.rowIndex + 1 }}
                </template>
              </va-data-table>
            </va-card>
          </div>
        </div>
      </div>
    </va-card>
    <br /><br />
    <va-card>
      <div class="ml-3 col-md-12">
        Document Checklist
        <hr />
      </div>
      <div>
        <div class="row m-2">
          <span class="col mt-2 description"
            >1. Notification letter to FIMM including the following
            information:- &nbsp; <br /><br />
            i. To indicate the registration of Unit Trust Scheme
            Consultants/Private Retirement Scheme Consultants have been
            terminated. <br />
            ii. Existing investors have been informed of alternatives available
            to them if they wish to deal with their unit trust schemes / private
            retirement schemes including redemption/withdrawal, transfer and
            switching. <br />
            iii. Provision for termination under the distribution arrangement
            with UTMC/IUTA/PRS Provider/IPRA has been fulfilled
          </span>
        </div>
        <br />
        <vue-form-generator
          :model="model"
          :schema="fileUploadSchemaOne"
          :options="formOptions"
          ref="regForm"
        >
        </vue-form-generator>
        <br />
      </div>
      <div>
        <div class="row m-2">
          <span class="col mt-2 description">
            2. Court Vesting Order (for Merger and acqusition only)
          </span>
        </div>
        <br />
        <vue-form-generator
          :model="model"
          :schema="fileUploadSchemaTwo"
          :options="formOptions"
          ref="regForm"
        >
        </vue-form-generator>
        <br />
      </div>
      <div>
        <div class="row m-2">
          <span class="col mt-2 description">
            3. A copy of Form 13 (for merger and acquisition only)
          </span>
        </div>
        <br />
        <vue-form-generator
          :model="model"
          :schema="fileUploadSchemaThree"
          :options="formOptions"
          ref="regForm"
        >
        </vue-form-generator>
        <br />
      </div>
      <div>
        <div class="row m-2">
          <span class="col mt-2 description">
            4. A copy of Form 13 from Securities Commission (for CMSL Holder, if
            applicable)
          </span>
        </div>
        <br />
        <vue-form-generator
          :model="model"
          :schema="fileUploadSchemaFour"
          :options="formOptions"
          ref="regForm"
        >
        </vue-form-generator>
        <br />
      </div>
    </va-card>
    <br /><br />
    <va-card>
      <!-- review section -->
      <div
        class="ml-3 col-md-12"
        v-if="DIVESTMENTDETAILS.APPR_PUBLISH_STATUS == 0"
      >
        Approval Section
        <hr />
        <vue-form-generator
          :model="model"
          :schema="reviewSchema"
          :options="formOptions"
          ref="verificationForm"
        >
        </vue-form-generator>
        <br />
      </div>
      <div
        class="ml-3 col-md-12"
        v-if="DIVESTMENTDETAILS.APPR_PUBLISH_STATUS == 1"
      >
        Approval Section
        <hr />
        <vue-form-generator
          :model="model"
          :schema="reviewSchemaView"
          :options="formOptions"
          ref="verificationForm"
        >
        </vue-form-generator>
        <br />
      </div>
    </va-card>
    <br />
    <br />
    <button @click="back" type="button" class="btn btn-primary btn-fill btn-md">
      <i class="fa fa-step-backward" /> &nbsp; Previous
    </button>
    <div class="float-right" v-if="DIVESTMENTDETAILS.APPR_PUBLISH_STATUS == 0">
      <button
        @click="SaveAsDraft"
        type="button"
        class="mr-2 btn btn-info btn-fill btn-md"
      >
        <i class="fa fa-pencil-square-o" /> &nbsp; Save as draft
      </button>
      <button
      @click="returnSubmission"
      type="button" class="mr-2 btn btn-warning btn-fill btn-md">
        <i class="fa fa-reply" /> &nbsp; Return
      </button>
      <button
      @click="rejectSubmission"
      type="button" class="mr-2 btn btn-danger btn-fill btn-md">
        <i class="fa fa-ban" /> &nbsp; Reject
      </button>
      <button
        @click="reviewSubmission"
        type="button"
        class="ml-2 btn btn-success btn-fill btn-md"
      >
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
import * as servicesModule1 from "../../../../app/module1/services05";
import * as services06Module0 from "../../../../app/module0/services06";
import moment from "moment";
Vue.use(VueFormGenerator);
export default {
  mounted() {
    var data = localStorage.getItem("details");
    this.DIVESTMENTDETAILS = JSON.parse(data);
    // alert(JSON.stringify(this.DIVESTMENTDETAILS.SECOND_LEVEL));
    this.getDistributorDetails();
    this.getDistributorMergeDetails();
    this.getFundRecord();
    this.getAllRecordConsultant();
    this.getDocumentByIdOne();
    this.getDocumentByIdTwo();
    this.getDocumentByIdThree();
    this.getDocumentByIdFour();
    this.getDocumentByIdSecondLevel();
    this.getDocumentByApproval();

    // comment

    // alert(JSON.stringify(this.DIVESTMENTDETAILS.TS_PARAM));
    if (this.DIVESTMENTDETAILS.APPR_REMARK != null){
      this.model.commentview = this.DIVESTMENTDETAILS.APPR_REMARK;
      this.model.comment = this.DIVESTMENTDETAILS.APPR_REMARK;
    }

    this.model.SecondLevelAgreement = JSON.stringify(
      this.DIVESTMENTDETAILS.SECOND_LEVEL
    );
    if (JSON.stringify(this.DIVESTMENTDETAILS.SECOND_LEVEL) == 1) {
      this.visibleSecondLevel = true;
    }
  },

  components: {},

  computed: {
    RecordFields() {
      return [
        {
          name: "FUND_CODE_FIMM",
          title: "FIMM FUND CODE",
          sortField: "FUND_CODE_FIMM"
        },
        {
          name: "FUND_NAME",
          title: "FUND NAME",
          sortField: "FUND_NAME"
        },
        {
          name: "FUND_ASEAN_CIS",
          title: "CIS STRUCTURE",
          sortField: "FUND_ASEAN_CIS"
        }
      ];
    },

    // eslint-disable-next-line vue/return-in-computed-property
    RecordFilteredData() {
      if (!this.term || this.term.length < 1) {
        return this.RecordList;
      }
      return this.RecordList.filter(item => {
        return this.term
          .toLowerCase()
          .split(" ")
          .every(
            v =>
              item.STATUS_DISPLAY.toLowerCase().includes(v) ||
              item.DIST_NAME.toLowerCase().includes(v) ||
              item.FUND_NAME.toLowerCase().includes(v) ||
              item.FUND_ASEAN_CIS.toLowerCase().includes(v) ||
              item.FUND_CATEGORY.toLowerCase().includes(v) ||
              item.GROUP_ASSET.toLowerCase().includes(v) ||
              item.GROUP_FUND.toLowerCase().includes(v) ||
              item.TS_PARAM.toLowerCase().includes(v) ||
              item.FUND_CODE_FIMM.includes(v) ||
              item.FUND_MAXIMUM_SALE_CHARGE.includes(v)
          );
      });
    },

    //consultant fields
    ConsultantRecordFields() {
      return [
        {
          name: "__slot:no",
          title: "NO",
        },
        {
          name: "CONSULTANT_NAME",
          title: "CONSULTANT NAME",
          sortField: "CONSULTANT_NAME",
        },
        {
          name: "CONSULTANT_NRIC",
          title: "NIRC NUMBER",
          sortField: "CONSULTANT_NRIC",
        },
        {
          name: "CONSULTANT_PASSPORT_NO",
          title: "PASSPORT NUMBER",
          sortField: "CONSULTANT_PASSPORT_NO",
        },
        {
          name: "TYPE_NAME",
          title: "CONSULTANT TYPE",
          sortField: "TYPE_NAME",
        },
      ];
    },

    ConsultantFilteredData() {
      if (!this.term || this.term.length < 1) {
        return this.RecordConsultantList;
      }
      return this.RecordConsultantList.filter((item) => {
        return this.term
          .toLowerCase()
          .split(" ")
          .every(
            (v) =>
              item.STATUS_DISPLAY.toLowerCase().includes(v) ||
              item.DIST_NAME.toLowerCase().includes(v) ||
              item.FUND_NAME.toLowerCase().includes(v) ||
              item.FUND_ASEAN_CIS.toLowerCase().includes(v) ||
              item.FUND_CATEGORY.toLowerCase().includes(v) ||
              item.GROUP_ASSET.toLowerCase().includes(v) ||
              item.GROUP_FUND.toLowerCase().includes(v) ||
              item.TS_PARAM.toLowerCase().includes(v) ||
              item.FUND_CODE_FIMM.includes(v) ||
              item.FUND_MAXIMUM_SALE_CHARGE.includes(v)
          );
      });
    },

  },

  data() {
    return {
      visibleProfile: false,
      details: [],
      DIVESTMENTDETAILS: "",
      RecordList: [],
      RecordConsultantList:[],

      CeaseOperationValue: [
        { name: "No", value: "2" },
        { name: "Yes", value: "1" }
      ],

      secondLevelAgreement: [
        { name: "No", value: "2" },
        { name: "Yes", value: "1" }
      ],

      formOptions: {
        // validationErrorClass: "has-error",
        // validationSuccessClass: "has-`success`",
        validateAfterChanged: true
      },

      model: {
        details: "",
        mergerdetails: "",
        cessationDate: "",
        CeaseOperation: "",
        SecondLevelAgreement: "",
        LegalDay: "",
        fileOne: [],
        fileTwo: [],
        fileThree: [],
        fileFour: [],
        fileSecondLevel: [],
        comment: "",
        commentview: "",
        FileSecondReview: [],
        FileSecondReviewView: []
      },

      // second level Schema
      secondLevelSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "radios",
                label: "Second Level Agreement",
                model: "SecondLevelAgreement",
                values: () => {
                  return this.secondLevelAgreement;
                },
                styleClasses: "col-md-12 display-inline",
                required: false,
                disabled: true
              },
              {
                labels: "Document :",
                accept: ".PDF",
                multiple: true,
                text: "Choose a File",
                model: "fileSecondLevel",
                type: "vfg-custom-file-view",
                styleClasses: "col-md-12",
                required: false,
                disabled: true,
                visible: (model, field, form) => {
                  return this.visibleSecondLevel;
                }
              }
            ]
          }
        ]
      },

      //file 1
      fileUploadSchemaOne: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                labels: "Document :",
                accept: ".PDF",
                multiple: true,
                text: "Choose a File",
                model: "fileOne",
                type: "vfg-custom-file-view",
                styleClasses: "col-md-12",
                required: false,
                disabled: true
              }
            ]
          }
        ]
      },

      //file 2
      fileUploadSchemaTwo: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                labels: "Document :",
                accept: ".PDF",
                multiple: true,
                text: "Choose a File",
                model: "fileTwo",
                type: "vfg-custom-file-view",
                styleClasses: "col-md-12",
                required: false,
                disabled: true
              }
            ]
          }
        ]
      },

      //file 3
      fileUploadSchemaThree: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                labels: "Document :",
                accept: ".PDF",
                multiple: true,
                text: "Choose a File",
                model: "fileThree",
                type: "vfg-custom-file-view",
                styleClasses: "col-md-12",
                required: false,
                disabled: true
              }
            ]
          }
        ]
      },

      //file 4
      fileUploadSchemaFour: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                labels: "Document :",
                accept: ".PDF",
                multiple: true,
                text: "Choose a File",
                model: "fileFour",
                type: "vfg-custom-file-view",
                styleClasses: "col-md-12",
                required: false,
                disabled: true
              }
            ]
          }
        ]
      },

      // review section
      reviewSchema: {
        fields: [
          {
            type: "textArea",
            model: "comment",
            label: "Remark/Comments",
            hint: "Max 1000 characters",
            max: 1000,
            placeholder: "Enter Remark/Comments",
            rows: 5,
            validator: "string",
            styleClasses: "col-md-12"
          },
          {
            labels: "Upload Document",
            accept: ".PDF",
            multiple: true,
            text: "Choose a File",
            model: "FileSecondReview",
            type: "vfg-custom-multiple-file",
            styleClasses: "col-md-12",
            required: false,
            hint: "Accepted format : (.pdf)"
          }
        ]
      },

      // review section view
      reviewSchemaView: {
        fields: [
          {
            type: "textArea",
            model: "commentview",
            label: "Remark/Comments",
            max: 1000,
            rows: 5,
            validator: "string",
            styleClasses: "col-md-12",
            disabled: true
          },
          {
            labels: "Document :",
            accept: ".PDF",
            multiple: true,
            text: "Choose a File",
            model: "FileSecondReviewView",
            type: "vfg-custom-file-view",
            styleClasses: "col-md-12",
            required: false,
            disabled: true
          }
        ]
      }
    };
  },
  methods: {
    // get details
    getDistributorDetails: async function () {
      const user = localStorage.getItem("details");
      const response = await servicesModule1.distributordetailsfimm(JSON.parse(user).DIST_ID);
      this.details = response;
    },

    // getAllRecord (consultant)
    getAllRecordConsultant: async function () {
      const user = localStorage.getItem("user");
      const response = await servicesModule1.getDistributor_consultant_list(
        JSON.parse(user).user_id
      );
      this.RecordConsultantList = response;
      this.RecordConsultantCount = this.RecordConsultantList.length;

      this.getDistributorList();
    },

    //getDistributorMergeDetails
    getDistributorMergeDetails: async function() {
      const divestmentdetails = localStorage.getItem("details");
      // alert(divestmentdetails);
      const response = await servicesModule1.distributorMergeDetails(
        JSON.parse(divestmentdetails).DIVE_ID
      );
      this.mergerdetails = response;
    },

     // getAllRecord (fund)
   getFundRecord: async function () {
      const dive_id = localStorage.getItem("details");
      const response = await servicesModule1.Submission_fund_list(JSON.parse(dive_id).DIVE_ID );
      this.RecordList = response;details
      this.RecordCount = this.RecordList.length;
    },

    // getAllRecord (consultant)
    getAllRecordConsultant: async function () {
      const dive_id = localStorage.getItem("details");
      const response = await servicesModule1.Submission_cons_list(JSON.parse(dive_id).DIVE_ID );
      this.RecordConsultantList = response;
      this.RecordConsultantCount = this.RecordConsultantList.length;

    },

    // file 1
    getDocumentByIdOne: async function() {
      // alert("here")
      const dive_id = localStorage.getItem("details");
      const response = await servicesModule1.getDocumentByIdOne(
        JSON.parse(dive_id).DIVE_ID
      );
      // alert(JSON.stringify(response));
      response.forEach(element => {
        console.log(element.DOC_BLOB);
        element.DOC_BLOB = this.b64toBlobPDF(
          element.DOC_BLOB,
          "application/pdf"
        );
        console.log("mula");
        console.log(element.DOC_BLOB); // <----- cuba tgk ini
        console.log("habis");
        element.DOC_BLOB = new File(
          [element.DOC_BLOB],
          element.DOC_ORIGINAL_NAME + "." + element.DOC_FILETYPE,
          { type: element.DOC_BLOB.type }
        );
        console.log(element.DOC_BLOB);
        const data = {
          docID: element.DIVE_DOCU_ID,
          name: element.DOC_ORIGINAL_NAME + "." + element.DOC_FILETYPE,
          size: element.DOC_FILESIZE,
          type: element.DOC_FILETYPE,
          ext: "exe",
          url: window.URL.createObjectURL(element.DOC_BLOB)
        };

        this.fileOne = element.DOC_BLOB;
        //alert(JSON.stringify(element.DOC_BLOB));
        this.model.fileOne.push(data);
        //alert(JSON.stringify(data));
      });
    },

    // file 2
    getDocumentByIdTwo: async function() {
      // alert("here")
      const dive_id = localStorage.getItem("details");
      const response = await servicesModule1.getDocumentByIdTwo(
        JSON.parse(dive_id).DIVE_ID
      );
      // alert(JSON.stringify(response));
      response.forEach(element => {
        console.log(element.DOC_BLOB);
        element.DOC_BLOB = this.b64toBlobPDF(
          element.DOC_BLOB,
          "application/pdf"
        );
        console.log("mula");
        console.log(element.DOC_BLOB); // <----- cuba tgk ini
        console.log("habis");
        element.DOC_BLOB = new File(
          [element.DOC_BLOB],
          element.DOC_ORIGINAL_NAME + "." + element.DOC_FILETYPE,
          { type: element.DOC_BLOB.type }
        );
        console.log(element.DOC_BLOB);
        const data = {
          docID: element.DIVE_DOCU_ID,
          name: element.DOC_ORIGINAL_NAME + "." + element.DOC_FILETYPE,
          size: element.DOC_FILESIZE,
          type: element.DOC_FILETYPE,
          ext: "exe",
          url: window.URL.createObjectURL(element.DOC_BLOB)
        };

        this.fileTwo = element.DOC_BLOB;
        //alert(JSON.stringify(element.DOC_BLOB));
        this.model.fileTwo.push(data);
        //alert(JSON.stringify(data));
      });

      this.recordCount = response;

      if (this.recordCount.length == 0) {
        //  alert(" doc 2 x ada record");
      }
    },

    // file 3
    getDocumentByIdThree: async function() {
      // alert("here")
      const dive_id = localStorage.getItem("details");
      const response = await servicesModule1.getDocumentByIdThree(
        JSON.parse(dive_id).DIVE_ID
      );
      // alert(JSON.stringify(response));
      response.forEach(element => {
        console.log(element.DOC_BLOB);
        element.DOC_BLOB = this.b64toBlobPDF(
          element.DOC_BLOB,
          "application/pdf"
        );
        console.log("mula");
        console.log(element.DOC_BLOB); // <----- cuba tgk ini
        console.log("habis");
        element.DOC_BLOB = new File(
          [element.DOC_BLOB],
          element.DOC_ORIGINAL_NAME + "." + element.DOC_FILETYPE,
          { type: element.DOC_BLOB.type }
        );
        console.log(element.DOC_BLOB);
        const data = {
          docID: element.DIVE_DOCU_ID,
          name: element.DOC_ORIGINAL_NAME + "." + element.DOC_FILETYPE,
          size: element.DOC_FILESIZE,
          type: element.DOC_FILETYPE,
          ext: "exe",
          url: window.URL.createObjectURL(element.DOC_BLOB)
        };

        this.fileThree = element.DOC_BLOB;
        //alert(JSON.stringify(element.DOC_BLOB));
        this.model.fileThree.push(data);
        //alert(JSON.stringify(data));
      });
    },

    // file 4
    getDocumentByIdFour: async function() {
      // alert("here")
      const dive_id = localStorage.getItem("details");
      const response = await servicesModule1.getDocumentByIdFour(
        JSON.parse(dive_id).DIVE_ID
      );
      // alert(JSON.stringify(response));
      response.forEach(element => {
        console.log(element.DOC_BLOB);
        element.DOC_BLOB = this.b64toBlobPDF(
          element.DOC_BLOB,
          "application/pdf"
        );
        console.log("mula");
        console.log(element.DOC_BLOB); // <----- cuba tgk ini
        console.log("habis");
        element.DOC_BLOB = new File(
          [element.DOC_BLOB],
          element.DOC_ORIGINAL_NAME + "." + element.DOC_FILETYPE,
          { type: element.DOC_BLOB.type }
        );
        console.log(element.DOC_BLOB);
        const data = {
          docID: element.DIVE_DOCU_ID,
          name: element.DOC_ORIGINAL_NAME + "." + element.DOC_FILETYPE,
          size: element.DOC_FILESIZE,
          type: element.DOC_FILETYPE,
          ext: "exe",
          url: window.URL.createObjectURL(element.DOC_BLOB)
        };

        this.fileFour = element.DOC_BLOB;
        //alert(JSON.stringify(element.DOC_BLOB));
        this.model.fileFour.push(data);
        //alert(JSON.stringify(data));
      });
    },

    //2nd level
    getDocumentByIdSecondLevel: async function() {
      // alert("here")
      const dive_id = localStorage.getItem("details");
      const response = await servicesModule1.getDocumentByIdSecondLevel(
        JSON.parse(dive_id).DIVE_ID
      );
      // alert(JSON.stringify(response));
      response.forEach(element => {
        console.log(element.DOC_BLOB);
        element.DOC_BLOB = this.b64toBlobPDF(
          element.DOC_BLOB,
          "application/pdf"
        );
        console.log("mula");
        console.log(element.DOC_BLOB); // <----- cuba tgk ini
        console.log("habis");
        element.DOC_BLOB = new File(
          [element.DOC_BLOB],
          element.DOC_ORIGINAL_NAME + "." + element.DOC_FILETYPE,
          { type: element.DOC_BLOB.type }
        );
        console.log(element.DOC_BLOB);
        const data = {
          docID: element.DIVE_DOCU_ID,
          name: element.DOC_ORIGINAL_NAME + "." + element.DOC_FILETYPE,
          size: element.DOC_FILESIZE,
          type: element.DOC_FILETYPE,
          ext: "exe",
          url: window.URL.createObjectURL(element.DOC_BLOB)
        };

        this.fileSecondLevel = element.DOC_BLOB;
        //alert(JSON.stringify(element.DOC_BLOB));
        this.model.fileSecondLevel.push(data);
        //alert(JSON.stringify(data));
      });
    },

    // approval document
    getDocumentByApproval: async function() {
      // alert("here")
      const dive_id = localStorage.getItem("details");
      const response = await servicesModule1.getDocumentByIdDistApprover(
        JSON.parse(dive_id).DIVE_ID
      );
      // alert(JSON.stringify(response));
      response.forEach(element => {
        console.log(element.DOC_BLOB);
        element.DOC_BLOB = this.b64toBlobPDF(
          element.DOC_BLOB,
          "application/pdf"
        );
        console.log("mula");
        console.log(element.DOC_BLOB); // <----- cuba tgk ini
        console.log("habis");
        element.DOC_BLOB = new File(
          [element.DOC_BLOB],
          element.DOC_ORIGINAL_NAME + "." + element.DOC_FILETYPE,
          { type: element.DOC_BLOB.type }
        );
        console.log(element.DOC_BLOB);
        const data = {
          docID: element.DIVE_DOCU_ID,
          name: element.DOC_ORIGINAL_NAME + "." + element.DOC_FILETYPE,
          size: element.DOC_FILESIZE,
          type: element.DOC_FILETYPE,
          ext: "exe",
          url: window.URL.createObjectURL(element.DOC_BLOB)
        };

        this.fileSecondLevel = element.DOC_BLOB;
        //alert(JSON.stringify(element.DOC_BLOB));
        this.model.FileSecondReviewView.push(data);
        this.model.FileSecondReview.push(data);
        //alert(JSON.stringify(data));
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
      this.$router.push("/fimm/distributor-DivestmentList-Hod-rdApproval");
    },

    //save as draft
    SaveAsDraft: async function() {
      if (confirm("Are you sure you want to save this as draft?")) {
        const data = new FormData();
        data.append("DIVE_DIST_APPR_ID",this.DIVESTMENTDETAILS.DIVE_DIST_APPR_ID);

        data.append("DIVE_APPR_ID", this.DIVESTMENTDETAILS.DIVE_APPR_ID);
        data.append("APPR_REMARK", this.model.comment);
        data.append("APPR_PUBLISH_STATUS", "0");
        data.append("TS_ID", "1");
        const user = localStorage.getItem("user");
        data.append("CREATE_BY", JSON.parse(user).user_id);
        data.append("DIVE_ID", this.DIVESTMENTDETAILS.DIVE_ID);

        //File upload FileApprover
        if (this.model.FileSecondReview.length != 0) {
          for (let i = 0; i < this.model.FileSecondReview.length; i++) {
            data.append("FileSecondReview[]", this.model.FileSecondReview[i]);
            data.append("FILE_NO", "6");
          }
        }

        try {
          const response = await servicesModule1.update_Approvalhodrd(data);
          this.$router.push("/fimm/distributor-DivestmentList-Hod-rdApproval");
        } catch (error) {
          console.log(error);
        }
      }
    },

    reviewSubmission: async function() {
      if (confirm("Are you sure you want to proceed this Approval?")) {
        const data = new FormData();
        // data.append("DIVE_DIST_APPR_ID",this.DIVESTMENTDETAILS.DIVE_DIST_APPR_ID);

        data.append("DIVE_APPR_ID", this.DIVESTMENTDETAILS.DIVE_APPR_ID);
        data.append("DIVE_ID", this.DIVESTMENTDETAILS.DIVE_ID);

        data.append("APPR_REMARK", this.model.comment);
        data.append("APPR_PUBLISH_STATUS", "1");
        data.append("TS_ID", "3"); // 2nd level approved

        const user = localStorage.getItem("user");
        data.append("CREATE_BY", JSON.parse(user).user_id);

        //Send to distributor for acknowledgement
        const approvalLevel = await services06Module0.getApprovalLevelDistributor(5, 1);
        data.append("APPR_LIST", JSON.stringify(approvalLevel));

        data.append("NOTI_LOCATION", "DistributorDivestment-List");
        if (this.DIVESTMENTDETAILS.DIVE_TYPE == '35'){
          data.append("NOTI_REMARK","(FUND DIVESTMENT) Approved Submission By HOD");
        } else if (this.DIVESTMENTDETAILS.DIVE_TYPE == '36'){
          data.append("NOTI_REMARK","(CONSULTANT DIVESTMENT) Approved Submission By HOD");
        }else {
          data.append("NOTI_REMARK","(FUND & CONSULTANT DIVESTMENT) Approved Submission By HOD");
        }

        //File upload FileApprover
        if (this.model.FileSecondReview.length != 0) {
          for (let i = 0; i < this.model.FileSecondReview.length; i++) {
            data.append("FileSecondReview[]", this.model.FileSecondReview[i]);
            data.append("FILE_NO", "8");
          }
        }

        try {
          const response = await servicesModule1.update_Approvalhodrd(data);
          this.$router.push("/fimm/distributor-DivestmentList-Hod-rdApproval");
        } catch (error) {
          console.log(error);
        }
      }
    },

    rejectSubmission: async function () {
      if(this.model.comment.length>0) {

        if (confirm("Are you sure you want to reject this submission?")) {
          const data = new FormData();
          // data.append("DIVE_DIST_APPR_ID",this.DIVESTMENTDETAILS.DIVE_DIST_APPR_ID);

          data.append("DIVE_APPR_ID", this.DIVESTMENTDETAILS.DIVE_APPR_ID);
          data.append("DIVE_ID", this.DIVESTMENTDETAILS.DIVE_ID);

          data.append("APPR_REMARK", this.model.comment);
          data.append("APPR_PUBLISH_STATUS", "1");
          data.append("TS_ID", "5"); // reject

          const user = localStorage.getItem("user");
          data.append("CREATE_BY", JSON.parse(user).user_id);

          //Send to rd for approval
          const approvalLevel = await services06Module0.getApprovalLevelDistributor(5, 1);
          data.append("APPR_LIST", JSON.stringify(approvalLevel));

          data.append("NOTI_LOCATION", "DistributorDivestment-List");

          if (this.DIVESTMENTDETAILS.DIVE_TYPE == '35') {
            data.append("NOTI_REMARK", "(FUND DIVESTMENT) Rejected Submission By HOD ");
          } else if (this.DIVESTMENTDETAILS.DIVE_TYPE == '36') {
            data.append("NOTI_REMARK", "(CONSULTANT DIVESTMENT) Rejected Submission By HOD");
          } else {
            data.append("NOTI_REMARK", "(FUND & CONSULTANT DIVESTMENT) Rejected Submission By HOD");
          }

          //File upload FileApprover
          if (this.model.FileSecondReview.length != 0) {
            for (let i = 0; i < this.model.FileSecondReview.length; i++) {
              data.append("FileSecondReview[]", this.model.FileSecondReview[i]);
              data.append("FILE_NO", "6");
            }
          }

          try {
            const response = await servicesModule1.update_Approvalhodrd(data);
            this.$router.push("/fimm/distributor-DivestmentList-Hod-rdApproval");
          } catch (error) {
            console.log(error);
          }
        }
      }else{
        alert("The remark/comment field required.");
      }
    },

    returnSubmission: async function () {
      if(this.model.comment.length>0) {

        if (confirm("Are you sure you want to return this submission?")) {
          const data = new FormData();
          // data.append("DIVE_DIST_APPR_ID",this.DIVESTMENTDETAILS.DIVE_DIST_APPR_ID);

          data.append("DIVE_APPR_ID", this.DIVESTMENTDETAILS.DIVE_APPR_ID);
          data.append("DIVE_ID", this.DIVESTMENTDETAILS.DIVE_ID);

          data.append("APPR_REMARK", this.model.comment);
          data.append("APPR_PUBLISH_STATUS", "1");
          data.append("TS_ID", "9"); // return

          const user = localStorage.getItem("user");
          data.append("CREATE_BY", JSON.parse(user).user_id);

          //Send to rd for approval
          const approvalLevel = await services06Module0.getApprovalLevelDistributor(5, 1);
          data.append("APPR_LIST", JSON.stringify(approvalLevel));

          data.append("NOTI_LOCATION", "DistributorDivestment-List");

          if (this.DIVESTMENTDETAILS.DIVE_TYPE == '35') {
            data.append("NOTI_REMARK", "(FUND DIVESTMENT) Returned Submission By HOD");
          } else if (this.DIVESTMENTDETAILS.DIVE_TYPE == '36') {
            data.append("NOTI_REMARK", "(CONSULTANT DIVESTMENT) Return Submission By HOD");
          } else {
            data.append("NOTI_REMARK", "(FUND & CONSULTANT DIVESTMENT) Return Submission By HOD");
          }

          //File upload FileApprover
          if (this.model.FileSecondReview.length != 0) {
            for (let i = 0; i < this.model.FileSecondReview.length; i++) {
              data.append("FileSecondReview[]", this.model.FileSecondReview[i]);
              data.append("FILE_NO", "6");
            }
          }

          try {
            const response = await servicesModule1.update_Approvalhodrd(data);
            this.$router.push("/fimm/distributor-DivestmentList-Hod-rdApproval");
          } catch (error) {
            console.log(error);
          }
        }
      }else{
        alert("The remark/comment field required.");
      }
    },



    // --------------------------------------------------------------------
    // model updated
    onModelUpdated(newVal, schema) {
      //SecondLevelAgreement
      if (schema == "SecondLevelAgreement") {
        if (newVal == 1) {
          this.visibleSecondLevel = true;
        } else {
          this.visibleSecondLevel = false;
        }
      }
    }
  }
};
</script>

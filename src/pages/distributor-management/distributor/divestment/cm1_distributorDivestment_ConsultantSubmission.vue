<template>
  <va-card>
    <br />
    <h4 slot="header" class="card-title">Consultant Divestment Submission</h4>

    <va-card>
      <div class="ml-3 col-md-12">
        Distributor Details
        <span v-if="visibleProfile == false"
          >:<b> {{ details.DIST_NAME }} </b></span
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
                  <td>: {{ mergerdetails.DIST_NAME }}</td>
                </tr>
              </tbody>
            </table>
            <br />
            <vue-form-generator
              :model="model"
              :schema="DivestmentDetailsSchema"
              :options="formOptions"
              ref="regForm"
              @model-updated="onModelUpdated"
            >
            </vue-form-generator>
          </div>
        </div>

        <br />
        <div class="row m-2">
          <h6>Consultant</h6>
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
            4. A copy of Form 13 from Securities Commission (for CMSL Holder, if applicable)
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
      <div
        v-if="this.DIVESTMENTDETAILS !=null && (this.DIVESTMENTDETAILS.TS_ID==7 || this.DIVESTMENTDETAILS.TS_ID==28 || this.DIVESTMENTDETAILS.TS_ID==9) && (this.DIVESTMENTDETAILS.APPR_REMARK.length>0) "
        class="col-md-12"
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
    <div class="float-right" v-if="mergerdetails.TS_ID == 1">
      <button
        @click="discardRecord"
        type="button"
        class="mr-2 btn btn-danger btn-fill btn-md"
      >
        <i class="fa fa-trash" /> &nbsp; Discard
      </button>
      <button

       @click="SaveAsDraft"
        type="button"
        class="mr-2 btn btn-info btn-fill btn-md">
        <i class="fa fa-pencil-square-o" /> &nbsp; Save as draft
      </button>
      <button
        @click="Submission"
        type="button"
        class="ml-2 btn btn-success btn-fill btn-md"
      >
        <i class="fa fa-paper-plane" /> &nbsp; Submit
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
import * as consultantSelection from './cm1_distributorDivestment_ConsultantSelection';
import moment from "moment";
Vue.use(VueFormGenerator);
export default {
  mounted() {
    var data = localStorage.getItem("test");
    this.DIVESTMENTDETAILS = JSON.parse(data);
    this.DIVE_ID = JSON.parse(data);
    this.getDistributorDetails();
    this.getDistributorMergeDetails();
    this.getConsultantRecord();
    this.getDocumentByIdOne();
    this.getDocumentByIdTwo();
    this.getDocumentByIdThree();
    this.getDocumentByIdFour();
    if (this.DIVESTMENTDETAILS.APPR_REMARK != null){
      this.model.commentview = this.DIVESTMENTDETAILS.APPR_REMARK;
    }

  },

  components: {},

  computed: {
    RecordFields() {
      return [
        {
          name: '__slot:no',
          title: 'NO',
        },
        {
          name: 'CONSULTANT_NAME',
          title: 'CONSULTANT NAME',
          sortField: 'CONSULTANT_NAME',
        },
        {
          name: 'CONSULTANT_NRIC',
          title: 'NIRC NUMBER',
          sortField: 'CONSULTANT_NRIC',
        },
        {
          name: 'CONSULTANT_PASSPORT_NO',
          title: 'PASSPORT NUMBER',
          sortField: 'CONSULTANT_PASSPORT_NO',
        },
        {
          name: 'TYPE_NAME',
          title: 'CONSULTANT TYPE',
          sortField: 'TYPE_NAME',
        },
      ];
    },

    // eslint-disable-next-line vue/return-in-computed-property
    RecordFilteredData() {
      if (!this.term || this.term.length < 1) {
        return this.RecordList;
      }
      return this.RecordList.filter((item) => {
        return this.term
          .toLowerCase()
          .split(" ")
          .every(
            (v) =>
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
      visibleMergerDetails: false,
      details: [],
      mergerdetails: [],
      DIVESTMENTDETAILS: "",
      RecordList: [],
      RecordCount:null,

      CeaseOperationValue: [
        {name: "No", value: "2" ,selected: true},
        {name: "Yes",value: "1", },
      ],

      formOptions: {
        // validationErrorClass: "has-error",
        // validationSuccessClass: "has-`success`",
        validateAfterChanged: true,
      },

      model: {
        details: "",
        CeaseOperation:"2",
        mergerdetails: "2",
        commentview:"",
        cessationDate: "",
        LegalDay: "",
        fileOne: [],
        fileTwo: [],
        fileThree: [],
        fileFour: [],
      },

      // legal date & cessation date
      DivestmentDetailsSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "radios",
                label: "Cease Operation",
                model: "CeaseOperation",
                values: () => {
                  return this.CeaseOperationValue;
                },
                styleClasses: "col-md-12 display-inline",
                required: false,
              },
              // {
              //   type: "input",
              //   inputType: "date",
              //   model: "cessationDate",
              //   label: "Cessation Date",
              //   styleClasses: "col-md-4",
              //   required: true,
              //   visible: (model, field, form) => {
              //   return this.visibleMergerDetails
              //   },
              // },
              // {
              //   type: "input",
              //   inputType: "date",
              //   model: "LegalDay",
              //   label: "Legal Day (1)",
              //   styleClasses: "col-md-4",
              //   required: true,
              //   visible: (model, field, form) => {
              //   return this.visibleMergerDetails
              //   },
              // },

            ],
          },
        ],
      },

      //File 1
      fileUploadSchemaOne: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                labels: "Upload Document",
                accept: ".PDF",
                multiple: true,
                text: "Choose a File",
                model: "fileOne",
                type: "vfg-custom-multiple-file-edit-Divestment",
                styleClasses: "col-md-12",
                required: true,
                hint: "Accepted format : (.pdf)",
              },
            ],
          },
        ],
      },

      //file 2
      fileUploadSchemaTwo: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                labels: "Upload Document",
                accept: ".PDF",
                multiple: true,
                text: "Choose a File",
                model: "fileTwo",
                type: "vfg-custom-multiple-file-edit-Divestment",
                styleClasses: "col-md-12",
                required: false,
                hint: "Accepted format : (.pdf)",
              },
            ],
          },
        ],
      },

      //file 3
      fileUploadSchemaThree: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                labels: "Upload Document",
                accept: ".PDF",
                multiple: true,
                text: "Choose a File",
                model: "fileThree",
                type: "vfg-custom-multiple-file-edit-Divestment",
                styleClasses: "col-md-12",
                required: false,
                hint: "Accepted format : (.pdf)",
              },
            ],
          },
        ],
      },

      //file 4
      fileUploadSchemaFour: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                labels: "Upload Document",
                accept: ".PDF",
                multiple: true,
                text: "Choose a File",
                model: "fileFour",
                type: "vfg-custom-multiple-file-edit-Divestment",
                styleClasses: "col-md-12",
                required: false,
                hint: "Accepted format : (.pdf)",
              },
            ],
          },
        ],
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

        ]
      }

    };
  },
  methods: {
    // get details
    getDistributorDetails: async function () {
      const user = localStorage.getItem("user");
      const response = await servicesModule1.getdistributordetails(
        JSON.parse(user).user_id
      );
      this.details = response;
    },

    //getDistributorMergeDetails
    getDistributorMergeDetails: async function () {
      const distid = localStorage.getItem("DIVE_ID");
      // alert(distid);
      const response = await servicesModule1.distributorMergeDetails(
        JSON.parse(distid)
      );
      this.mergerdetails = response;


      if (this.mergerdetails.CEASE_STATUS != null) {
        this.model.CeaseOperation = JSON.stringify(
          this.mergerdetails.CEASE_STATUS
        );
      }

      if (this.mergerdetails.CEASE_STATUS != null) {
        this.model.CeaseOperation=JSON.stringify(
          response.CEASE_STATUS
        );
      }
    },

    // getAllRecord (consultant)
    getConsultantRecord: async function () {
      const user = localStorage.getItem("user");
      const response = await servicesModule1.getselected_consultant_list(
        JSON.parse(user).user_id
      );
      this.RecordList = response;
      this.RecordCount = this.RecordList.length;
    },

    // file 1
    getDocumentByIdOne: async function () {
      // alert("here")
      const dive_id = localStorage.getItem("DIVE_ID");
      const response = await servicesModule1.getDocumentByIdOne(JSON.parse(dive_id));
      // alert(JSON.stringify(response));
      response.forEach((element) => {
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
          name:
            element.DOC_ORIGINAL_NAME +
            "." +
            element.DOC_FILETYPE,
          size: element.DOC_FILESIZE,
          type: element.DOC_FILETYPE,
          ext: "exe",
          url: window.URL.createObjectURL(element.DOC_BLOB),
        };

        this.fileOne = element.DOC_BLOB;
        this.model.fileOne.push(data);
      });
    },

    // file 2
    getDocumentByIdTwo: async function () {
      // alert("here")
      const dive_id = localStorage.getItem("DIVE_ID");
      const response = await servicesModule1.getDocumentByIdTwo(JSON.parse(dive_id));
      // alert(JSON.stringify(response));
      response.forEach((element) => {
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
          name:
            element.DOC_ORIGINAL_NAME +
            "." +
            element.DOC_FILETYPE,
          size: element.DOC_FILESIZE,
          type: element.DOC_FILETYPE,
          ext: "exe",
          url: window.URL.createObjectURL(element.DOC_BLOB),
        };

        this.fileTwo = element.DOC_BLOB;
        //alert(JSON.stringify(element.DOC_BLOB));
        this.model.fileTwo.push(data);
        //alert(JSON.stringify(data));
      });
    },

    // file 3
    getDocumentByIdThree: async function () {
      // alert("here")
      const dive_id = localStorage.getItem("DIVE_ID");
      const response = await servicesModule1.getDocumentByIdThree(JSON.parse(dive_id));
      // alert(JSON.stringify(response));
      response.forEach((element) => {
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
          name:
            element.DOC_ORIGINAL_NAME +
            "." +
            element.DOC_FILETYPE,
          size: element.DOC_FILESIZE,
          type: element.DOC_FILETYPE,
          ext: "exe",
          url: window.URL.createObjectURL(element.DOC_BLOB),
        };

        this.fileThree = element.DOC_BLOB;
        //alert(JSON.stringify(element.DOC_BLOB));
        this.model.fileThree.push(data);
        //alert(JSON.stringify(data));
      });
    },

    // four
    getDocumentByIdFour: async function () {
      // alert("here")
      const dive_id = localStorage.getItem("DIVE_ID");
      const response = await servicesModule1.getDocumentByIdFour(JSON.parse(dive_id));
      // alert(JSON.stringify(response));
      response.forEach((element) => {
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
          name:
            element.DOC_ORIGINAL_NAME +
            "." +
            element.DOC_FILETYPE,
          size: element.DOC_FILESIZE,
          type: element.DOC_FILETYPE,
          ext: "exe",
          url: window.URL.createObjectURL(element.DOC_BLOB),
        };

        this.fileFour = element.DOC_BLOB;
        //alert(JSON.stringify(element.DOC_BLOB));
        this.model.fileFour.push(data);
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
      localStorage.setItem('DIVE_ID', this.DIVE_ID);
      this.UnselectAll();
      this.$router.push("/distributor/DistributorDivestment-EditConsultant");
    },

    //SaveAsDraft
    SaveAsDraft: async function () {
      if (confirm("Are you sure you want to proceed this action?")) {

        // this.$router.push("/distributor/DistributorDivestment-FundSubmission");
        const data = new FormData();

        const dive_id = localStorage.getItem("DIVE_ID");
        data.append("DIVE_ID", JSON.parse(dive_id));
        data.append("TS_ID", "1"); // change from draft to pending
        data.append("PUBLISH_STATUS", "0");
        data.append("CEASE_STATUS", this.model.CeaseOperation);
        const user = localStorage.getItem("user");
        data.append("CREATE_BY", JSON.parse(user).user_id);
        this.model.cessationDate != null
          ? data.append(
          "CESSATION_DATE",
          moment(this.model.cessationDate).format("YYYY-MM-DD")
          )
          : null;
        this.model.LegalDay != null
          ? data.append(
          "LEGAL_DATE",
          moment(this.model.LegalDay).format("YYYY-MM-DD")
          )
          : null;

        //File upload one
        if (this.model.fileOne.length != 0) {
          for (let i = 0; i < this.model.fileOne.length; i++) {
            data.append("fileOne[]", this.model.fileOne[i]);
            data.append("FILE_NO_ONE", "1");
          }
        }

        //File upload 2
        if (this.model.fileTwo.length != 0) {
          for (let i = 0; i < this.model.fileTwo.length; i++) {
            data.append("fileTwo[]", this.model.fileTwo[i]);
            data.append("FILE_NO_TWO", "2");
          }
        }
        //File upload 3
        if (this.model.fileThree.length != 0) {
          for (let i = 0; i < this.model.fileThree.length; i++) {
            data.append("fileThree[]", this.model.fileThree[i]);
            data.append("FILE_NO_THREE", "3");
          }
        }
        //File upload 4
        if (this.model.fileFour.length != 0) {
          for (let i = 0; i < this.model.fileFour.length; i++) {
            data.append("fileFour[]", this.model.fileFour[i]);
            data.append("FILE_NO_FOUR", "4");
          }
        }

        try {
          const response = await servicesModule1.fund_submission(data);
          this.$router.push("/distributor/DistributorDivestment-List");
        } catch (error) {
          console.log(error);
        }

      }
    },

    // Submit
    Submission: async function () {

      if (confirm("Are you sure you want to proceed this submission?")) {

        // this.$router.push("/distributor/DistributorDivestment-FundSubmission");
        const data = new FormData();

        const dive_id = localStorage.getItem("DIVE_ID");
        data.append("DIVE_ID", JSON.parse(dive_id));
        data.append("TS_ID", "15"); // change from draft to pending
        data.append("PUBLISH_STATUS", "1");
        data.append("CEASE_STATUS", this.model.CeaseOperation);
        const user = localStorage.getItem("user");
        data.append("CREATE_BY", JSON.parse(user).user_id);
        this.model.cessationDate != null
          ? data.append(
          "CESSATION_DATE",
          moment(this.model.cessationDate).format("YYYY-MM-DD")
          )
          : null;
        this.model.LegalDay != null
          ? data.append(
          "LEGAL_DATE",
          moment(this.model.LegalDay).format("YYYY-MM-DD")
          )
          : null;

        //File upload one
        if (this.model.fileOne.length != 0) {
          for (let i = 0; i < this.model.fileOne.length; i++) {
            data.append("fileOne[]", this.model.fileOne[i]);
            data.append("FILE_NO_ONE", "1");
          }
        }
        //File upload 2
        if (this.model.fileTwo.length != 0) {
          for (let i = 0; i < this.model.fileTwo.length; i++) {
            data.append("fileTwo[]", this.model.fileTwo[i]);
            data.append("FILE_NO_TWO", "2");
          }
        }
        //File upload 3
        if (this.model.fileThree.length != 0) {
          for (let i = 0; i < this.model.fileThree.length; i++) {
            data.append("fileThree[]", this.model.fileThree[i]);
            data.append("FILE_NO_THREE", "3");
          }
        }
        //File upload 4
        if (this.model.fileFour.length != 0) {
          for (let i = 0; i < this.model.fileFour.length; i++) {
            data.append("fileFour[]", this.model.fileFour[i]);
            data.append("FILE_NO_FOUR", "4");
          }
        }

        //(processflowID,approval_level index)
        const approvalEntryLevel = await services06Module0.getApprovalLevelDistributor(5, 1);
        data.append("ENTRY_LIST", JSON.stringify(approvalEntryLevel));

        const approvalLevel = await services06Module0.getApprovalLevelDistributor(5, 2);
        data.append("APPR_LIST", JSON.stringify(approvalLevel));

        //dashboard notification
        data.append("NOTI_LOCATION", "DistributorDivestment-ApprovalList");
        data.append("NOTI_REMARK", "(CONSULTANT DIVESTMENT) New entry pending for Approval");

        try {
          if (this.model.fileOne.length == 0) {
            alert("Document Upload for Notification letter to FIMM");
          } else {
            const response = await servicesModule1.fund_submission(data);
            this.$router.push("/distributor/DistributorDivestment-List");
          }
        } catch (error) {
          console.log(error);
        }
      }
    },

    // model updated
    onModelUpdated (newVal, schema) {

      if (schema == "CeaseOperation") {
        if (newVal == 1) {
          this.visibleMergerDetails = true
        } else {
          this.visibleMergerDetails = false
        }
      }

    },
    //discard
    discardRecord:async function(){
      if (confirm("Are you sure you want to proceed this action?")) {

        const data = new FormData();
        // alert(this.model.CeaseOperation);
        const dive_id = localStorage.getItem("DIVE_ID");
        data.append("DIVE_ID", JSON.parse(dive_id));
        data.append("TS_ID", "1"); // change from draft to pending
        data.append("DISTRIBUTOR_ID_TO", this.mergerdetails.DISTRIBUTOR_ID);
        data.append("PUBLISH_STATUS", "0");
        data.append("CEASE_STATUS", this.model.CeaseOperation);
        data.append("SECOND_LEVEL", this.model.SecondLevelAgreement);
        const user = localStorage.getItem("user");
        data.append("CREATE_BY", JSON.parse(user).user_id);
        try {
          const response = await servicesModule1.discard(data);
          this.$router.push("/distributor/DistributorDivestment-List");
        } catch (e) {
          console.log(e);
        }
      }
    },
    //unselectAll
    UnselectAll: async function() {

      const data = new FormData();
      const user = localStorage.getItem("user");
      data.append("USER_DIST_ID", JSON.parse(user).USER_DIST_ID);
      try {
        const response = await servicesModule1.UnselectAllCons(data);
      } catch (error) {
        console.log(error);
      }
    },


  },
};
</script>

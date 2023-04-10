<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">Edit Cessation Submission Form</h4>
    </div>
    <br />
    <va-card>
      <vudal name="simpleModal" class="widthModal">
        <div class="header">
          Divestment Reminder<i class="close icon">&times;</i>
        </div>
        <div class="content">
          <h5>
            You are advised to perform the divestment process prior to
            cessation. <br />
            <br />
            Kindly disregard this message if you have done so.
          </h5>
        </div>
        <div class="actions">
          <button
            type="button"
            class="cancel vudal-btn mr-2 btn btn-danger btn-fill btn-md"
          >
            <i class="fa fa-times" /> &nbsp; Close
          </button>
        </div>
      </vudal>
      <vudal name="simpleModal2" class="widthModal">
        <div class="header">
          Remark/Comments<i class="close icon">&times;</i>
        </div>
        <div class="content">
          <vue-form-generator
            :model="model"
            :schema="readMoreSchema"
            :options="formOptions"
          />
        </div>
        <div class="actions">
          <button
            type="button"
            class="cancel vudal-btn mr-2 btn btn-danger btn-fill btn-md"
          >
            <i class="fa fa-times" /> &nbsp; Close
          </button>
        </div>
      </vudal>
      <div class="ml-3">
        <vue-form-generator
          :model="model"
          :schema="cessationSchema"
          :options="formOptions"
          ref="cessationForm"
          @model-updated="onModelUpdated"
        >
        </vue-form-generator>
        <br />
        <vue-form-generator
          :model="model"
          :schema="registerNewSchema"
          :options="formOptions"
          ref="registerNewForm"
        >
        </vue-form-generator>
      </div>
      <br />
      <!-- file upload -->
      <div class="ml-1 col-md-12">
        <vue-form-generator
          :model="model"
          :schema="fileUploadSchema"
          :options="formOptions"
          ref="fileUploadForm"
        >
        </vue-form-generator>
      </div>
    </va-card>
    <br />
    <va-card>
      <div class="ml-2 col-md-12">
        Pre-Payment Refund Details
        <hr />
        <vue-form-generator
          :model="model"
          :schema="refundSchema"
          :options="formOptions"
          ref="refundForm"
          @model-updated="onModelUpdated"
        >
        </vue-form-generator>
        <br />
        <!-- file upload -->

        <vue-form-generator
          :model="model"
          :schema="letterSchema"
          :options="formOptions"
          ref="letterForm"
        >
        </vue-form-generator>
      </div>
    </va-card>
    <br />
    <va-card>
      <div class="ml-2 col-md-12">
        Transaction/Audit Log
        <downloadExcel
          :json_data="RecordList"
          :excelname="excelname"
          :sheetname="sheetname"
          :column="column"
        ></downloadExcel>
        <button
          v-if="visibleLog == true"
          v-b-toggle.collapse-3
          type="button"
          class="float-right btn-fill btn-md"
        >
          <i class="fa fa-eye-slash"></i>
        </button>
        <button
          v-if="visibleLog == false"
          v-b-toggle.collapse-3
          type="button"
          class="float-right btn-fill btn-md"
        >
          <i class="fa fa-eye"></i>
        </button>

        <hr />
        <b-collapse id="collapse-3" class="mt-2" v-model="visibleLog">
          <div class="row">
            <div class="flex md2 offset--md10">
              <va-input
                :value="term"
                :placeholder="$t('Search')"
                @input="search"
                removable
              >
                <va-icon name="fa fa-search" slot="prepend" />
              </va-input>
            </div>
          </div>
          <va-data-table
            :fields="RecordFields"
            :data="RecordFilteredData"
            no-data-label="No data found"
            :per-page="parseInt(perPage)"
            :datacount="RecordCount"
            :dataperpage="parseInt(perPage)"
            clickable
          >
            <template slot="no" slot-scope="row">
              {{ row.rowIndex + 1 }}
            </template>
            <template slot="remark" slot-scope="props">
              {{ props.rowData.APPR_REMARK }}
              <span
                v-if="props.rowData.APPR_REMARK != '-'"
                v-b-tooltip.hover
                v-on:click="readMore(props.rowData)"
                title="Read more"
                class="badge mr-2"
              >
                <i class="fa fa-window-restore"></i
              ></span>
            </template>
          </va-data-table>
        </b-collapse>
      </div>
    </va-card>
    <br />
    <br />
    <button @click="back" type="button" class="btn btn-primary btn-fill btn-md">
      <i class="fa fa-step-backward" /> &nbsp; Previous
    </button>
    <div class="float-right">
      <button
        @click="saveAsDraft"
        type="button"
        class="mr-1 btn btn-info btn-fill btn-md"
      >
        <i class="fa fa-pencil-square-o" /> &nbsp; Save as draft
      </button>
      <button
        @click="register"
        type="button"
        class="ml-1 btn btn-success btn-fill btn-md"
      >
        <i class="fa fa-paper-plane" /> &nbsp; Submit
      </button>
    </div>
  </va-card>
</template>


<script>
import "vue-form-generator/dist/vfg.css";
import * as servicesModule1 from "../../../../app/module1/services01";
import * as services06Module0 from "../../../../app/module0/services06";
import moment from "moment";
import Vudal from "vudal";
import { debounce } from "lodash";

export default {
  mounted() {
    var data = localStorage.getItem("edit-cessation-submission");
    this.DISTDATA = JSON.parse(data);
    //alert(JSON.stringify(this.DISTDATA));

    this.$modals.simpleModal.$show();
    this.getAllCessation();
    this.getAllDistributor();
    this.getDistributorInfo();
    this.getBankList();

    this.getCessationDetailsById();
    this.getCessationDocById();
    this.getLetterDocById();
    this.getAuditLog();
  },

  components: { Vudal },

  methods: {
    search: debounce(function (term) {
      this.term = term;
      console.log(this.term);
    }, 400),

    async readMore(data) {
      //alert(JSON.stringify(data));
      this.$modals.simpleModal2.$show();
      this.model.showRemark = data.APPR_FULL;
    },

    getAllCessation: async function () {
      const response = await servicesModule1.getCessationType();
      this.cessationList = response;
    },

    getAllDistributor: async function () {
      const response = await servicesModule1.getActiveDistributor();
      this.distributorList = response;
    },

    getDistributorInfo: async function () {
      const user = localStorage.getItem("user");
      const response = await servicesModule1.getDistributorInfo(
        JSON.parse(user).USER_DIST_ID
      );
      this.model.distributorName = response.DIST_NAME;
    },

    getBankList: async function () {
      const response = await servicesModule1.getBankList();
      this.bankList = response;
    },

    getCessationDetailsById: async function () {
      const response = await servicesModule1.getCessationDetailsByID(
        this.DISTDATA.CESSATION_ID
      );
      // alert(response.CESSATION_DATE);
      this.model.cessation = {
        SETTING_GENERAL_ID: response.CESSATION_TYPE,
        SET_PARAM: response.CESSATION_NAME,
      };
      this.model.cessationDate = response.CESSATION_DATE;
      this.model.legalDate = response.LEGAL_DATE;
      this.model.distMerger = {
        DISTRIBUTOR_ID: response.DISTRIBUTOR_MERGER_ID,
        DIST_NAME: response.DISTRIBUTOR_MERGER_NAME,
      };
      this.model.remark = response.OTHER_REMARK;
      this.model.recipientName = response.RECIPIENT_NAME;
      this.model.bank = {
        SETTING_GENERAL_ID: response.BANK_ID,
        SET_PARAM: response.BANK_NAME,
      };
      this.model.accountNo = response.ACCOUNT_NO;

      if (response.CESSATION_TYPE == "679") {
        //merger
        this.visibleRemark = false;
        this.visibleDistMerger = true;
      } else if (response.CESSATION_TYPE == "680") {
        //withdraw
        this.visibleRemark = false;
        this.visibleDistMerger = false;
      } else if (response.CESSATION_TYPE == "681") {
        //other
        this.visibleRemark = true;
        this.visibleDistMerger = false;
      }

      if (
        String(this.model.recipientName).toUpperCase() !=
        this.model.distributorName
      ) {
        this.model.chkIsSame = false;
        this.visibleLetter = true;
      } else if (
        String(this.model.recipientName).toUpperCase() ==
        this.model.distributorName
      ) {
        this.model.chkIsSame = true;
        this.visibleLetter = false;
      }
    },

    back() {
      this.$router.go(-1);
    }, // back button

    onModelUpdated(newVal, schema) {
      if (schema == "cessation") {
        newVal = this.model.cessation.SETTING_GENERAL_ID;

        if (newVal == "679") {
          //merger
          this.visibleRemark = false;
          this.visibleDistMerger = true;
          this.model.remark = "";
          if (
            this.DISTDATA.DISTRIBUTOR_MERGER_ID != null ||
            this.DISTDATA.DISTRIBUTOR_MERGER_ID != "" ||
            this.DISTDATA.DISTRIBUTOR_MERGER_ID != 0
          ) {
            this.model.distMerger = {
              DISTRIBUTOR_ID: this.DISTDATA.DISTRIBUTOR_MERGER_ID,
              DIST_NAME: this.DISTDATA.DISTRIBUTOR_MERGER_NAME,
            };
          } else {
            this.model.distMerger = "";
          }
        } else if (newVal == "680") {
          //withdraw
          this.visibleRemark = false;
          this.visibleDistMerger = false;
          this.model.remark = "";
          this.model.distMerger = "";
        } else if (newVal == "681") {
          //other
          this.visibleRemark = true;
          this.visibleDistMerger = false;
          this.model.distMerger = "";
          this.model.remark = this.DISTDATA.OTHER_REMARK;
        }
      }

      if (schema == "chkIsSame") {
        if (newVal == true) {
          this.model.recipientName = this.model.distributorName;
          this.visibleLetter = false;
        } else {
          this.model.recipientName = "";
          this.visibleLetter = true;
        }
      }

      if (schema == "recipientName") {
        if (String(newVal).toUpperCase() != this.model.distributorName) {
          this.model.chkIsSame = false;
          this.visibleLetter = true;
        } else if (String(newVal).toUpperCase() == this.model.distributorName) {
          this.model.chkIsSame = true;
          this.visibleLetter = false;
        }
      }
    },
    //Validation
    validateCessationDate(value) {
      if (this.model.cessationDate != null) {
        if (moment(this.model.cessationDate).isSameOrAfter(moment())) {
          console.log("Valid");
        } else {
          console.log("not Valid");
          return ["Date cannot be backdated"];
        } // true
      } else {
        console.log("not Valid");
        return ["This field is required"];
      }
    },
    validateLegalDate(value) {
      if (this.model.legalDate != null) {
        if (moment(this.model.legalDate).isSameOrAfter(moment())) {
          console.log("Valid");
        } else {
          console.log("not Valid");
          return ["Date cannot be backdated"];
        } // true
      } else {
        console.log("not Valid");
        return ["This field is required"];
      }
    },

    validateType(value) {
      if (this.model.cessation != null || this.model.cessation != "") {
        console.log("Valid");
      } else {
        console.log("not Valid");
        return ["This field is required"];
      }
    },

    validateDistMerger(value) {
      if (value != null) {
        console.log("validated");
      } else {
        return ["This field is required!"];
      }
    },

    validateRecipientName(value) {
      if (this.model.recipientName != null || this.model.recipientName != "") {
        console.log("Valid");
      } else {
        console.log("not Valid");
        return ["This field is required"];
      }
    },

    validateBank(value) {
      if (this.model.bank != null || this.model.bank != "") {
        console.log("Valid");
      } else {
        console.log("not Valid");
        return ["This field is required"];
      }
    },

    async validateAccount(value) {
       if(!/^[0-9]+$/.test(value)){
          return ["Numbers only"];
        }
    },
    validateLetter(value) {
      if (this.model.fileLetter.length != 0) {
        console.log("Valid");
      } else {
        console.log("not Valid");
        return ["This field is required"];
      }
    },

    getCessationDocById: async function () {
      const response = await servicesModule1.getCessationDocById(
        this.DISTDATA.CESSATION_ID
      );
      //alert(JSON.stringify(response));
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
          docID: element.CD_DOCUMENT_ID,
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

        this.file = element.DOC_BLOB;
        //alert(JSON.stringify(element.DOC_BLOB));
        this.model.file.push(data);
        //alert(JSON.stringify(data));
      });
    },

    getLetterDocById: async function () {
      const response = await servicesModule1.getLetterDocById(
        this.DISTDATA.CESSATION_ID
      );
      //alert(JSON.stringify(response));
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
          docID: element.CAL_DOCUMENT_ID,
          name: element.DOC_ORIGINAL_NAME + "." + element.DOC_FILETYPE,
          size: element.DOC_FILESIZE,
          type: element.DOC_FILETYPE,
          ext: "exe",
          url: window.URL.createObjectURL(element.DOC_BLOB),
        };

        this.fileLetter = element.DOC_BLOB;
        //alert(JSON.stringify(element.DOC_BLOB));
        this.model.fileLetter.push(data);
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

    getAuditLog: async function () {
      const response = await servicesModule1.getDistributorAuditLogByID(
        this.DISTDATA.CESSATION_ID
      );
      this.RecordList = response;
      this.RecordCount = this.RecordList.length;
    },

    saveAsDraft: async function () {
    
      if (confirm("Are you sure you want to save as draft?")) {
        const data = new FormData();
        data.append("CESSATION_ID", this.DISTDATA.CESSATION_ID);
        const user = localStorage.getItem("user");

        if (
          this.model.cessation.SETTING_GENERAL_ID != null ||
          this.model.cessation.SETTING_GENERAL_ID != ""
        ) {
          data.append(
            "CESSATION_TYPE",
            this.model.cessation.SETTING_GENERAL_ID
          );
        }

        if (this.model.distMerger.DISTRIBUTOR_ID == undefined) {
          data.append("DISTRIBUTOR_MERGER", this.DISTDATA.DISTRIBUTOR_MERGER);
        } else {
          data.append(
            "DISTRIBUTOR_MERGER",
            this.model.distMerger.DISTRIBUTOR_ID
          );
        }
     
        data.append("OTHER_REMARK", this.model.remark);

        this.model.cessationDate != null
          ? data.append(
              "CESSATION_DATE",
              moment(this.model.cessationDate).format("YYYY-MM-DD")
            )
          : null;
        this.model.legalDate != null
          ? data.append(
              "LEGAL_DATE",
              moment(this.model.legalDate).format("YYYY-MM-DD")
            )
          : null;
        data.append("DISTRIBUTOR_ID", JSON.parse(user).USER_DIST_ID);

        data.append("PUBLISH_STATUS", "0");
        data.append("TS_ID", "1");
        data.append("CREATE_BY", JSON.parse(user).user_id);

        data.append("RECIPIENT_NAME", this.model.recipientName);
        data.append("BANK_ID", this.model.bank.SETTING_GENERAL_ID);
        data.append("ACCOUNT_NO", this.model.accountNo);

        //File upload
        if (this.model.file.length != 0) {
          for (let i = 0; i < this.model.file.length; i++) {
            data.append("file[]", this.model.file[i]);
          }
        }
        if (this.model.fileLetter.length != 0) {
          for (let i = 0; i < this.model.fileLetter.length; i++) {
            data.append("fileLetter[]", this.model.fileLetter[i]);
          }
        }

        try {
          const response = await servicesModule1.updateCessationForm(data);
          const response1 = await servicesModule1.uploadCessationDocument(data);
          
          if (this.model.chkIsSame == true) {
            const response3 =
              await servicesModule1.deleteAuthorizationLetterById(this.DISTDATA.CESSATION_ID);
          } else if(this.model.chkIsSame == false) {
            const response2 = await servicesModule1.uploadLetterDocument(data);
          }
          this.$router.push("/distributor/cessation-submission");
        } catch (error) {
          console.log(error);
        }
      }
    },

    register: async function () {
      if (confirm("Are you sure you want to submit this entry?")) {
        const data = new FormData();
        data.append("CESSATION_ID", this.DISTDATA.CESSATION_ID);
        const user = localStorage.getItem("user");

        if (
          this.model.cessation.SETTING_GENERAL_ID != null ||
          this.model.cessation.SETTING_GENERAL_ID != ""
        ) {
          data.append(
            "CESSATION_TYPE",
            this.model.cessation.SETTING_GENERAL_ID
          );
        }

        if (this.model.distMerger.DISTRIBUTOR_ID == undefined) {
          data.append("DISTRIBUTOR_MERGER", this.DISTDATA.DISTRIBUTOR_MERGER);
        } else {
          data.append(
            "DISTRIBUTOR_MERGER",
            this.model.distMerger.DISTRIBUTOR_ID
          );
        }
        data.append("OTHER_REMARK", this.model.remark);

        this.model.cessationDate != null
          ? data.append(
              "CESSATION_DATE",
              moment(this.model.cessationDate).format("YYYY-MM-DD")
            )
          : null;
        this.model.legalDate != null
          ? data.append(
              "LEGAL_DATE",
              moment(this.model.legalDate).format("YYYY-MM-DD")
            )
          : null;
        data.append("DISTRIBUTOR_ID", JSON.parse(user).USER_DIST_ID);

        data.append("PUBLISH_STATUS", "1");
        data.append("TS_ID", "15");
        data.append("CREATE_BY", JSON.parse(user).user_id);

        data.append("RECIPIENT_NAME", this.model.recipientName);
        data.append("BANK_ID", this.model.bank.SETTING_GENERAL_ID);
        data.append("ACCOUNT_NO", this.model.accountNo);

        //File upload
        if (this.model.file.length != 0) {
          for (let i = 0; i < this.model.file.length; i++) {
            data.append("file[]", this.model.file[i]);
          }
        }
        if (this.model.fileLetter.length != 0) {
          for (let i = 0; i < this.model.fileLetter.length; i++) {
            data.append("fileLetter[]", this.model.fileLetter[i]);
          }
        }

        //(processflowID,approval_level index)
        const approvalEntryLevel =
          await services06Module0.getApprovalLevelDistributor(3, 1);
        data.append("ENTRY_LIST", JSON.stringify(approvalEntryLevel));

        const approvalLevel =
          await services06Module0.getApprovalLevelDistributor(3, 2);
        data.append("APPR_LIST", JSON.stringify(approvalLevel));

        data.append("NOTI_LOCATION", "cessation-submission-manager-approval");
        data.append("NOTI_REMARK", "(CESSATION) New entry pending approval");

        try {
          const response = await servicesModule1.updateCessationForm(data);
          const response1 = await servicesModule1.uploadCessationDocument(data);
          if (this.model.chkIsSame == true) {
            const response3 =
              await servicesModule1.deleteAuthorizationLetterById(this.DISTDATA.CESSATION_ID);
          } else if(this.model.chkIsSame == false) {
            const response2 = await servicesModule1.uploadLetterDocument(data);
          }
          this.$router.push("/distributor/cessation-submission");
        } catch (error) {
          console.log(error);
        }
      }
    },
  },

  computed: {
    RecordFields() {
      return [
        {
          name: "__slot:no",
          title: "NO",
        },
        {
          name: "CREATE_TIMESTAMP",
          title: "Date",
          sortField: "CREATE_TIMESTAMP",
        },
        {
          name: "GROUP_NAME",
          title: "Group",
          sortField: "GROUP_NAME",
        },
        {
          name: "USER_NAME",
          title: "Creation By",
          sortField: "USER_NAME",
        },
        {
          name: "TS_PARAM",
          title: "Activity",
          sortField: "TS_PARAM",
        },
        {
          name: "__slot:remark",
          title: "Remarks/Comments",
        },
        {
          name: "LATEST_UPDATE",
          title: "Latest Update",
          sortField: "LATEST_UPDATE",
        },
      ];
    },
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
              item.USER_NAME.toLowerCase().includes(v) ||
              item.TS_PARAM.toLowerCase().includes(v) ||
              item.APPR_REMARK.toLowerCase().includes(v) ||
              item.GROUP_NAME.toLowerCase().includes(v)
          );
      });
    },
  },

  data() {
    return {
      cessationList: [],
      distributorList: [],
      bankList: [],
      uploadFileOject: [],
      fileRecordsForUpload: [],

      visibleRemark: false,
      visibleDistMerger: false,
      visibleLetter: false,
      visibleLog: true,

      column: [
        "APPROVAL ID",
        "DATE",
        "GROUP",
        "CREATION BY",
        "ACTIVITY",
        "LATEST UPDATE",
        "REMARK/COMMENTS",
      ],
      excelname: "download-TransactionList",
      sheetname: "TransactionList",

      RecordList: [],
      count: 1,
      RecordCount: null,
      field: [],
      term: null,
      perPage: "10",
      currentPage: 1,
      header: "",

      model: {
        cessation: "",
        cessationDate: null,
        legalDate: null,
        remark: "",
        distMerger: "",
        fileUpload: "",
        file: [],
        fileLetter: [],

        distributorName: "",
        recipientName: "",
        chkIsSame: false,
        bank: "",
        accountNo: "",

        showRemark: "",
      },

      cessationSchema: {
        fields: [
          {
            type: "vueMultiSelect",
            model: "cessation",
            label: "Cessation Type",
            placeholder: "Select Cessation Type",
            selectOptions: {
              multiple: false,
              key: "SETTING_GENERAL_ID",
              label: "SET_PARAM",
              searchable: true,
            },
            values: (model, schema) => {
              return this.cessationList;
            },
            styleClasses: "col-md-12",
            required: true,
            validator: "required",
            //validator: ["required", this.validateType],
          },
        ],
      },
      registerNewSchema: {
        fields: [
          {
            type: "input",
            inputType: "date",
            model: "cessationDate",
            label: "Cessation Date",
            styleClasses: "col-md-6",
            required: true,
            validator: ["required", this.validateCessationDate],
          },
          {
            type: "input",
            inputType: "date",
            model: "legalDate",
            label: "Legal Day(1)",
            styleClasses: "col-md-6",
            required: true,
            validator: ["required", this.validateLegalDate],
          },
          {
            type: "vueMultiSelect",
            model: "distMerger",
            label:
              "Name of the distributor involved in the merger and acquisition",
            placeholder: "Select Distributor",
            selectOptions: {
              multiple: false,
              key: "DISTRIBUTOR_ID",
              label: "DIST_NAME",
              searchable: true,
            },
            values: (model, schema) => {
              return this.distributorList;
            },
            styleClasses: "col-md-12",
            required: true,
            validator: "required",
            visible: (model, field, form) => {
              return this.visibleDistMerger;
            },
            validator: ["required", this.validateDistMerger],
          },

          {
            type: "textArea",

            model: "remark",
            label: "Please Specify",
            hint: "Max 1000 characters",
            max: 1000,
            placeholder: "Enter remark",
            rows: 5,
            validator: "string",
            styleClasses: "col-md-12",
            visible: (model, field, form) => {
              return this.visibleRemark;
            },
          },
        ],
      },

      fileUploadSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                labels: "Upload Document",
                accept: ".PDF",
                multiple: true,
                text: "Choose a File",
                model: "file",
                type: "vfg-custom-multiple-file-edit-cease",
                styleClasses: "col-md-12",
                required: false,
                hint: "Accepted format : (.PDF)",
              },
            ],
          },
        ],
      },

      refundSchema: {
        fields: [
          {
            type: "input",
            inputType: "text",
            model: "distributorName",
            label: "Distributor Name",
            styleClasses: "col-md-12",
            disabled: true,
          },
          {
            type: "input",
            inputType: "text",
            model: "recipientName",
            label: "Recipient Name",
            styleClasses: "col-md-12",
            required: true,
            validator: ["required", this.validateRecipientName],
          },
          {
            model: "chkIsSame",
            type: "vfg-custom-checkboxRefund",
            placeholder: "",
            styleClasses: "col-md-7",
          },
          {
            type: "vueMultiSelect",
            model: "bank",
            label: "Beneficiary Bank",
            placeholder: "Select Beneficiary Bank",
            selectOptions: {
              multiple: false,
              key: "SETTING_GENERAL_ID",
              label: "SET_PARAM",
              searchable: true,
            },
            values: (model, schema) => {
              return this.bankList;
            },
            styleClasses: "col-md-6",
            required: true,
            validator: "required",
            //validator: ["required", this.validateBank],
          },
          {
            type: "input",
            inputType: "text",
            model: "accountNo",
            label: "Account Number",
            styleClasses: "col-md-6",
            required: true,
            validator: ["required", this.validateAccount],
          },
        ],
      },

      letterSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                labels: "Authorization Letter",
                accept: ".PDF",
                multiple: true,
                text: "Choose a File",
                model: "fileLetter",
                type: "vfg-custom-file-edit-authorizationLetter",
                styleClasses: "col-md-12",
                required: true,
                hint: "Accepted format : (.PDF)",
                visible: (model, field, form) => {
                  return this.visibleLetter;
                },
                //validator: ["required", this.validateLetter],
              },
            ],
          },
        ],
      },

      readMoreSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "textArea",
                model: "showRemark",
                rows: 5,
                validator: "string",
                styleClasses: "col-md-12",
              },
            ],
          },
        ],
      },

      formOptions: {
        validateAfterChanged: true,
      },
    };
  },
};
</script>
<style lang="scss">
.va-data-table__vuetable th.sortable {
  color: #34495e !important;
}

.va-table th,
.content table th {
  text-transform: uppercase;
  color: #34495e !important;
  border-bottom: 2px solid #34495e;
}
.va-data-table__pagination {
  margin-top: 1rem;
  display: -webkit-box;
  display: -ms-flexbox;
  display: inherit;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: flex-end;
}

.content {
  margin-top: 30px;
  font-size: 20px;
}
.inline {
  display: inline-flex;
  float: right;
}
.display-inline label {
  display: inline !important;
  padding: 5px;
}
</style>

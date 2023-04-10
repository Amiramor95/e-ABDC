<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">Consultant Alert : Update Case</h4>
      <br />
      <br />
    </div>
    <va-card>
      <vudal name="simpleModal" class="widthModal">
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
      <div class="ml-3 col-md-12">
        Consultant Profile
        <span v-if="visibleProfile == false"
          >:
          <b
            >{{ consDetail.CONSULTANT_NAME }} (
            {{ consDetail.CONSULTANT_FIMM_NO }} )</b
          ></span
        >
        <button
          v-if="visibleProfile == true"
          v-b-toggle.collapse-1
          type="button"
          class="float-right btn-fill btn-md"
        >
          <i class="fa fa-eye-slash"></i>
        </button>
        <button
          v-if="visibleProfile == false"
          v-b-toggle.collapse-1
          type="button"
          class="float-right btn-fill btn-md"
        >
          <i class="fa fa-eye"></i>
        </button>

        <hr />
        <b-collapse id="collapse-1" class="mt-2" v-model="visibleProfile">
          <table class="table table-striped">
            <tbody>
              <tr>
                <td style="width: 25%">Consultant Name</td>
                <td>{{ consDetail.CONSULTANT_NAME }}</td>
              </tr>
              <tr>
                <td>NRIC Number</td>
                <td>{{ consDetail.CONSULTANT_NRIC }}</td>
              </tr>
              <tr>
                <td>FIMM Number</td>
                <td>{{ consDetail.CONSULTANT_FIMM_NO }}</td>
              </tr>

              <tr>
                <td>Passport Number</td>
                <td>{{ consDetail.CONSULTANT_PASSPORT_NO }}</td>
              </tr>
              <tr>
                <td>Citizenship</td>
                <td>{{ consDetail.CITIZEN }}</td>
              </tr>
              <tr>
                <td>Company Distributor</td>
                <td>{{ consDetail.DIST_NAME }}</td>
              </tr>
              <tr>
                <td>Consultant Type</td>
                <td>{{ consDetail.TYPE_FULL_NAME }}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{{ consDetail.CONSULTANT_EMAIL }}</td>
              </tr>
              <tr>
                <td>Phone Number</td>
                <td>{{ consDetail.CONSULTANT_PHONENO }}</td>
              </tr>
              <tr>
                <td>Status</td>
                <td>{{ consDetail.STATUS }}</td>
              </tr>
            </tbody>
          </table>
        </b-collapse>
      </div>
    </va-card>
    <br />
    <va-card>
      <div class="ml-3">
        <vue-form-generator
          :model="model"
          :schema="registerNewCaseSchema"
          :options="formOptions"
          ref="registerNewCaseForm"
        >
        </vue-form-generator>
      </div>
      <br />
      <div id="app" class="ml-1 col-md-11">
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
    <br />
    <div class="float-right">
      <button
        @click="saveAsDraft"
        type="button"
        class="ml-1 btn btn-info btn-fill btn-md"
      >
        <i class="fa fa-pencil-square-o" /> &nbsp; Save as draft
      </button>
      <button
        @click="registerCase"
        type="button"
        class="ml-1 btn btn-success btn-fill btn-md"
      >
        <i class="fa fa-paper-plane" /> &nbsp; Submit
      </button>
    </div>
    <br />
    <br />
    <va-card>
      <div class="ml-2 col-md-12">
        Transaction/Audit Log
        <downloadExcel
          :json_data="caDetailsRecordList"
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
            :fields="caRecordFields"
            :data="caRecordFilteredData"
            no-data-label="No data found"
            :per-page="parseInt(perPage)"
            :datacount="caRecordCount"
            :dataperpage="parseInt(perPage)"
            clickable
          >
            <template slot="no" slot-scope="row">
              {{ row.rowIndex + 1 }}
            </template>
            <template slot="remarks" slot-scope="props">
              {{ props.rowData.APPR_REMARK }}

            </template>
            <template slot="updates" slot-scope="props">
              {{ props.rowData.LATEST_UPDATE }}
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
  </va-card>
</template>

<script>

import Vudal from "vudal";
import "vue-form-generator/dist/vfg.css";
import * as services06Module0 from "../../../app/module0/services06";
import * as servicesModule3 from "../../../app/module3/services01";
import moment from "moment";
import { debounce } from "lodash";

export default {
  mounted() {
    var data = localStorage.getItem("consultantAlert-editCaRecord");
    this.EDITCONS = JSON.parse(data);
    this.getAllClassification();
    this.getConsultantById();
    this.getCaDetailsById();
    this.getcaAuditLog();
    this.getDocumentById();
    this.getDetailsAuditLog();
  },
  components: {Vudal},

  methods: {
    search: debounce(function (term) {
      this.term = term;
      console.log(this.term);
    }, 400),

    getAllClassification: async function () {
      const response = await servicesModule3.getAllClassification();
      this.classificationList = response;
    },
    getConsultantById: async function () {
      const response = await servicesModule3.getConsultantById(
        this.EDITCONS.CONSULTANT_ID
      );
      this.consDetail = response;
      //alert(JSON.stringify(response));
    },
    getDocumentById: async function () {
      const response = await servicesModule3.getDocumentById(
        this.EDITCONS.CA_RECORD_DETAILS_ID
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
          docID: element.CA_DOCUMENT_ID,
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
    getcaAuditLog: async function () {
      const response = await servicesModule3.getCaApprovalByID(
        this.EDITCONS.CA_RECORD_DETAILS_ID
      );
      this.caRecordList = response;
      //alert(JSON.stringify( this.caRecordList))
      this.caRecordCount = this.caRecordList.length;
    },

    getDetailsAuditLog: async function () {
      const response = await servicesModule3.getDetailsLog(
        this.EDITCONS.CA_RECORD_DETAILS_ID
      );
      this.caDetailsRecordList = response;

      //alert(response);
    },

    getCaDetailsById: async function () {
      const response = await servicesModule3.getCaDetailsByID(
        this.EDITCONS.CA_RECORD_DETAILS_ID
      );
      //alert(JSON.stringify(response));
      this.model.classification = {
        SETTING_GENERAL_ID: response.CA_CLASSIFICATION,
        SET_PARAM: response.SET_PARAM,
      };
      this.model.startDate = response.CA_DATE_START;
      this.model.endDate = response.CA_DATE_END;
      this.model.reason = response.CA_REASON;
      this.model.remark = response.CA_REMARK;
      //alert(response.CA_CLASSIFICATION);
    },

    async back() {
      this.$router.push({
        name: "consultantAlert-consultantCaRecord",
      });
    },

    validateStatusForm() {
      return this.$refs.registerNewCaseForm.validate();
    },

    validateEntryForm() {
      return this.$refs.registerNewCaseForm.validate();
    },

    saveAsDraft: async function () {
      if (confirm("Are you sure you want to save as draft?")) {
        if (this.$refs.registerNewCaseForm.validate()) {
          const data = new FormData();
          data.append("CA_RECORD_DETAILS_ID", this.EDITCONS.CA_RECORD_DETAILS_ID);
          this.model.startDate != null
            ? data.append(
                "CA_DATE_START",
                moment(this.model.startDate).format("YYYY-MM-DD")
              )
            : null;
          this.model.endDate != null
            ? data.append(
                "CA_DATE_END",
                moment(this.model.endDate).format("YYYY-MM-DD")
              )
            : null;
          data.append(
            "CA_CLASSIFICATION",
            this.model.classification.SETTING_GENERAL_ID
          );
          data.append("CA_REASON", this.model.reason);
          data.append("CA_REMARK", this.model.remark);
          data.append("CA_PUBLISH_STATUS", "0");
          data.append("TS_ID", "1");
          const user = localStorage.getItem("user");
          data.append("CREATE_BY", JSON.parse(user).user_id);

          //File upload
          if (this.model.file.length != 0) {
            for (let i = 0; i < this.model.file.length; i++) {
              data.append("file[]", this.model.file[i]);
            }

            data.append("isFile", "1");
          } else {
            data.append("isFile", "0");
          }

          try {
            const response = await servicesModule3.updateCase(data);
            console.log(response);

            localStorage.setItem(
              "consultantAlert-editCaRecord",
              JSON.stringify(data)
            );
            this.$router.push("/fimm/consultantAlert-overviewList");
          } catch (error) {
            console.log(error);
          }
        }
      }
    },

    registerCase: async function () {
      if (confirm("Are you sure you want to save this record?")) {
        if (this.$refs.registerNewCaseForm.validate()) {
          const data = new FormData();
          data.append("CA_RECORD_DETAILS_ID", this.EDITCONS.CA_RECORD_DETAILS_ID);
          this.model.startDate != null
            ? data.append(
                "CA_DATE_START",
                moment(this.model.startDate).format("YYYY-MM-DD")
              )
            : null;
          this.model.endDate != null
            ? data.append(
                "CA_DATE_END",
                moment(this.model.endDate).format("YYYY-MM-DD")
              )
            : null;
          data.append(
            "CA_CLASSIFICATION",
            this.model.classification.SETTING_GENERAL_ID
          );
          data.append("CA_REASON", this.model.reason);
          data.append("CA_REMARK", this.model.remark);
          data.append("CA_PUBLISH_STATUS", "1");
          data.append("TS_ID", "15");
          const user = localStorage.getItem("user");
          data.append("CREATE_BY", JSON.parse(user).user_id);

          data.append("STATUS_RETURN", this.EDITCONS.TS_ID);

          const approvalEntryLevel = await services06Module0.getApprovalLevel(
            6,
            1
          );
          data.append("ENTRY_LIST", JSON.stringify(approvalEntryLevel));

          const approvalLevel = await services06Module0.getApprovalLevel(6, 2);
          data.append("APPR_LIST", JSON.stringify(approvalLevel));

          //File upload
          if (this.model.file.length != 0) {
            for (let i = 0; i < this.model.file.length; i++) {
              data.append("file[]", this.model.file[i]);
            }

            data.append("isFile", "1");
          } else {
            data.append("isFile", "0");
          }

          //notification
          data.append("NOTI_LOCATION", "consultantAlert-hodLraRecordList");
          var code = "";
          // if (this.consDetail.CONSULTANT_NRIC != null) {
          //   code = this.consDetail.CONSULTANT_NRIC;
          // } else if (this.consDetail.CONSULTANT_PASSPORT_NO != null) {
          //   code = this.consDetail.CONSULTANT_PASSPORT_NO;
          // }
          code = this.consDetail.CONSULTANT_NAME;
          var remarkEntry = "(CA)New entry pending verification for " + code;

          data.append("NOTI_REMARK", remarkEntry);

          data.append("CA_RECORD_ID", this.consDetail.CA_RECORD_ID);
          data.append("CONSULTANT_ID", this.consDetail.CONSULTANT_ID);
          data.append("CONSULTANT_NAME", this.consDetail.CONSULTANT_NAME);
          data.append("CONSULTANT_NRIC", this.consDetail.CONSULTANT_NRIC);
          data.append(
            "CONSULTANT_PASSPORT",
            this.consDetail.CONSULTANT_PASSPORT_NO
          );

          var notiTitle = "New entry pending verification";
          data.append("NOTI_TITLE", notiTitle);

          try {
            const response = await servicesModule3.updateCase(data);

            localStorage.setItem(
              "consultantAlert-editCaRecord",
              JSON.stringify(data)
            );
          this.$router.push("/fimm/consultantAlert-overviewList");
          } catch (error) {
            console.log(error);
          }
        }
      }
    },

    async readMore(data) {
      //alert(data.APPR_FULL);
      this.$modals.simpleModal.$show();
      this.model.showRemark = data.APPR_FULL;
    },
  },

  computed: {
    caRecordFields() {
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

        // {
        //   name: "LATEST_UPDATE",
        //   title: "Latest Update",
        //   sortField: "LATEST_UPDATE",
        // },
        {
          name: "__slot:remarks",
          title: "Remarks/Comments",
          sortField: "APPR_REMARK",
        },
        {
          name: "__slot:updates",
          title: "Latest Update",
          sortField: "LATEST_UPDATE",
        },
      ];
    },
    caRecordFilteredData() {
      if (!this.term || this.term.length < 1) {
        return this.caRecordList;
      }

      return this.caRecordList.filter((item) => {
        return this.term
          .toLowerCase()
          .split(" ")
          .every(
            (v) =>
              item.USER_NAME.toLowerCase().includes(v) ||
              item.TS_PARAM.toLowerCase().includes(v) ||
              item.APPR_REMARK.toLowerCase().includes(v)
          );
      });
    },
  },

  data() {
    return {
      column: [
        "APPROVAL ID",
        "DATE",
        "GROUP",
        "CREATION BY",
        "ACTIVITY",
        "LATEST UPDATE",
        "APPROVER REMARK/COMMENTS",
        "CLASSIFICATION",
        "START DATE",
        "END DATE",
        "REASON",
        "REMARK",
      ],
      excelname: "download-CaTransactionList",
      sheetname: "CaTransactionList",
      classificationList: [],
      uploadFileOject: [],
      visibleProfile: false,
      visibleLog: true,
      startDate: null,
      endDate: null,
      consDetail: "",
      EDITCONS: "",
      CONSULTANT_ID: "",
      CA_RECORD_DETAILS_ID: "",
      caRecordList: [],
      caDetailsRecordList: [],
      count: 1,
      caRecordCount: null,
      field: [],
      term: null,
      perPage: "10",
      currentPage: 1,
      header: "",

      model: {
        classification: "",
        startDate: null,
        endDate: null,
        reason: "",
        remark: "",
        fileUpload: "",
        file: [],
        showRemark: "",
      },

      registerNewCaseSchema: {
        fields: [
          {
            type: "vueMultiSelect",
            model: "classification",
            label: "Classification",
            placeholder: "Select Classification",
            selectOptions: {
              multiple: false,
              key: "SETTING_GENERAL_ID",
              label: "SET_PARAM",
              searchable: true,
            },
            values: (model, schema) => {
              return this.classificationList;
            },
            styleClasses: "col-md-6",
            required: true,
            validator: "required",
          },
          {
            type: "input",
            inputType: "date",
            model: "startDate",
            label: "Start Date",
            styleClasses: "col-md-3",
          },
          {
            type: "input",
            inputType: "date",
            model: "endDate",
            label: "End Date",
            styleClasses: "col-md-3",
          },
          {
            type: "textArea",

            model: "reason",
            label: "Reason",
            hint: "Max 1000 characters",
            max: 1000,
            placeholder: "Enter Reason",
            rows: 5,
            validator: "string",
            styleClasses: "col-md-12",
          },

          {
            type: "textArea",
            inputType:"text",
            model: "remark",
            label: "Remark",
            hint: "Max 1000 characters",
            max: 1000,
            placeholder: "Enter Remark",
            rows: 5,
            validator: "string",
            styleClasses: "col-md-12",
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
                accept: ".PNG,.PDF,.XLSX,.XLS,.JPG,.JPEG,.CSV,.DOC,.DOCX",
                multiple: true,
                text: "Choose a File",
                model: "file",
                type: "vfg-custom-multiple-file-edit",
                styleClasses: "col-md-12",
                required: false,
                hint:"Maximum uploaded file size is 5MB. Accepted format : (.PNG,.PDF,.XLSX,.XLS,.JPG,.JPEG,.CSV,.DOC,.DOCX)",
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
</style>

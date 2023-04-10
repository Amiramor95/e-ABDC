
<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">
        Repeat TPre-Vetting Program Submission
      </h4>
    </div>
    <br />
    <div v-if="dataUploadReady">
      <div class="text-center text-danger my-2">
        <b-spinner class="align-middle"></b-spinner>
        <strong>Loading...</strong>
      </div>
    </div>
    <div v-else>
      <va-card>
        <div class="ml-2 col-md-12">
          Program Details
          <button
            v-if="visibleProgram == true"
            v-b-toggle.collapse-1
            type="button"
            class="float-right btn-fill btn-md"
          >
            <i class="fa fa-eye-slash"></i>
          </button>
          <button
            v-if="visibleProgram == false"
            v-b-toggle.collapse-1
            type="button"
            class="float-right btn-fill btn-md"
          >
            <i class="fa fa-eye"></i>
          </button>

          <hr />
          <b-collapse id="collapse-1" class="mt-2" v-model="visibleProgram">
            <div class="ml-2">
              <vue-form-generator
                :model="model"
                :schema="registerNewSchema"
                :options="formOptions"
                ref="registerNewForm"
                @model-updated="onModelUpdated"
              >
              </vue-form-generator>
            </div>
            <br />
            <div class="ml-1 col-md-11">
              <vue-form-generator
                :model="model"
                :schema="fileUploadSchema"
                :options="formOptions"
                ref="fileUploadForm"
              >
              </vue-form-generator>
            </div>
          </b-collapse>
        </div>
      </va-card>
      <br />
      <va-card>
        <div class="ml-2 col-md-12">
          Sub-Learning Objectives
          <button
            v-if="visibleSlo == true"
            v-b-toggle.collapse-2
            type="button"
            class="float-right btn-fill btn-md"
          >
            <i class="fa fa-eye-slash"></i>
          </button>
          <button
            v-if="visibleSlo == false"
            v-b-toggle.collapse-2
            type="button"
            class="float-right btn-fill btn-md"
          >
            <i class="fa fa-eye"></i>
          </button>

          <hr />
          <br />
          <b-collapse id="collapse-2" class="mt-2" v-model="visibleSlo">
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
              :fields="SloFields"
              :data="SloFilteredData"
              no-data-label="No data found"
              :per-page="parseInt(perPage)"
              :datacount="SloRecordCount"
              :dataperpage="parseInt(perPage)"
              clickable
            >
              <template slot="no" slot-scope="row">
                {{ row.rowIndex + 1 }}
              </template>

              <template slot="speaker" slot-scope="row">
                <textarea
                  class="form-control"
                  id="speakerName"
                  rows="2"
                  placeholder="Enter Speaker"
                  v-model="row.rowData.SPEAKER"
                ></textarea>
              </template>
            </va-data-table>
            <br />
          </b-collapse>
        </div>
      </va-card>
    </div>

    <br />
    <button @click="back" type="button" class="btn btn-primary btn-fill btn-md">
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
        @click="submit"
        type="button"
        class="ml-1 btn btn-success btn-fill btn-md"
      >
        <i class="fa fa-paper-plane" /> &nbsp; Submit
      </button>
    </div>
  </va-card>
</template>

<script>
import { debounce } from "lodash";
import * as servicesModule4 from "../../../../app/module4/services01";
import * as services06Module0 from "../../../../app/module0/services06";
import moment from "moment";
import DataTableLoadingVue from '../../../../components/data-tables/scenarios/DataTableLoading.vue';

export default {
  props: {},
  mounted() {
    var data = localStorage.getItem("t-preVettingRepeatSubmission");
    this.PROGDATA = JSON.parse(data);
    //alert(JSON.stringify( this.PROGDATA));

    this.getAllDeliveryMode();
    this.getAllProgramType();

    this.getAllRecord();
    this.getSlo();
    this.getDocumentById();

    this.getAllMethod();
    this.getAllMedia();
    this.getAllAssessment();
  },
  components: {},
  methods: {
    // searh
    search: debounce(function (term) {
      this.term = term;
      console.log(this.term);
    }, 400),

    onModelUpdated(newVal, schema) {
      if (schema == "venue") {
        this.model.venue = String(newVal).toUpperCase();
      }
      if (schema == "sloSpeaker") {
        this.model.sloSpeaker = String(newVal).toUpperCase();
      }
    },
    //get all
    getAllDeliveryMode: async function () {
      const response = await servicesModule4.getAllDeliveryMode();
      this.deliveryModeList = response;
    },
    getAllProgramType: async function () {
      const response = await servicesModule4.getAllProgramType();
      this.programTypeList = response;
    },
    getAllMethod: async function () {
      const response = await servicesModule4.getAllMethod();
      this.methodList = response;
    },
    getAllMedia: async function () {
      const response = await servicesModule4.getAllMedia();
      this.mediaList = response;
    },
    getAllAssessment: async function () {
      const response = await servicesModule4.getAllAssessment();
      this.assessmentList = response;
    },
    getAllRecord: async function () {
      const response = await servicesModule4.getNewDetailsByID(
        this.PROGDATA.PROGRAM_ID, 0
      );

      //alert(JSON.stringify(response));


      this.model.deliveryMode = {
        TR_MODE_ID: response.PROG_DELMODE,
        TR_MODE_NAME: response.TR_MODE_NAME,
      };

      this.model.programType = {
        TR_PROGRAM_TYPE_ID: response.PROG_PROGRAM_TYPE,
        TR_PROGRAM_TYPE_NAME: response.TR_PROGRAM_TYPE_NAME,
      };

      this.model.title = response.PROG_TITLE;

      this.model.venue = response.PROG_VENUE;
      this.model.hours = response.PROG_HOURS;
      this.model.target = response.PROG_TARGET;
      this.model.outcome = response.PROG_OUTCOME;
      this.model.PDID= response.PROG_DETAILS_ID;
    },

    //get record
    getSlo: async function () {
       const response1 = await servicesModule4.getNewDetailsByID(
        this.PROGDATA.PROGRAM_ID, 0
      );

      const response = await servicesModule4.getSloByID(response1.PROG_DETAILS_ID);
      //alert(JSON.stringify());

      this.sloList = response;
      this.sloRecordCount = this.sloList.length;
    },
    getDocumentById: async function () {
      const response = await servicesModule4.getDocumentById(
        this.PROGDATA.PROG_DETAILS_ID
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
          docID: element.PROG_DOCUMENT_ID,
          name: element.DOC_ORIGINAL_NAME + "." + element.DOC_FILETYPE,
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

    //Validation
    validateHours(value) {
      const expression1 = /^[-+]?[0-9]+\.[0-9]+$/;

      console.log(expression1.test(value));
      if (!expression1.test(value)) {
        return ["Numbers only"];
      }
    },
    validateEndDate(value) {
      if (moment(this.model.startDate).isSameOrBefore(this.model.endDate)) {
        console.log("Valid");
      } else {
        console.log("not Valid");
        return ["Date is Not Valid"];
      } // true
    },
    validateStartDate(value) {
      if (this.model.startDate != null) {
        if (moment(this.model.startDate).isSameOrAfter(moment(), "day")) {
          console.log("Valid");
        } else {
          console.log("not Valid");
          return ["Date is Not Valid"];
        }
      }
      if (this.model.endDate != null) {
        if (moment(this.model.startDate).isSameOrBefore(this.model.endDate)) {
          console.log("Valid");
        } else {
          console.log("not Valid");
          return ["Date is Not Valid"];
        } // true
      }
    },

    //action save
    saveAsDraft: async function () {
      //upload
      if (confirm("Are you sure you want to save this as draft?")) {
        this.dataActionReady = true;

        const data = new FormData();
        data.append("PROGRAM_ID", this.PROGDATA.PROGRAM_ID);
        data.append("PROG_DETAILS_ID", this.PROGDATA.PROG_DETAILS_ID);
        data.append("VENUE", this.model.venue);
        data.append("PROGRAM_TITLE", this.model.title);
        data.append("DELIVERY_MODE", this.model.deliveryMode.TR_MODE_ID);
        data.append("PROGRAM_TYPE", this.model.programType.TR_PROGRAM_TYPE_ID);
        this.model.startDate != null
          ? data.append(
          "START_DATE",
          moment(this.model.startDate).format("YYYY-MM-DD")
          )
          : null;
        this.model.endDate != null
          ? data.append(
          "END_DATE",
          moment(this.model.endDate).format("YYYY-MM-DD")
          )
          : null;
        data.append("TOTAL_HOURS", this.model.hours);
        data.append("TARGET_PARTICIPANT", this.model.target);
        data.append("LEARNING_OUTCOME", this.model.outcome);

        const user = JSON.parse(localStorage.getItem("user"));
        const res = await servicesModule4.getCompanyId(user).user_id;

        data.append("CREATE_BY", user.user_id);
        data.append("COMPANY_ID", user.TP_COMP_ID);
        data.append("PROG_TYPE", 2);
        data.append("CATEGORY", 3);
        data.append("SLOLIST", JSON.stringify(this.sloList));
        const resMaxPoint = await servicesModule4.getMaxPoint(
          this.model.deliveryMode.TR_MODE_ID
        );

        if (this.model.hours > resMaxPoint.MAX_POINT) {
          data.append("POINT", resMaxPoint.MAX_POINT);
        } else {
          data.append("POINT", this.model.hours);
        }

        //alert(JSON.stringify(this.sloList));

        data.append("PUBLISH_STATUS", 0);
        data.append("TS_ID", "1");

        //File upload
        if (this.model.file.length != 0) {
          for (let i = 0; i < this.model.file.length; i++) {
            data.append("file[]", this.model.file[i]);
          }
        }

        try {
          const response = await servicesModule4.createRepeatedPreVetting(data);
          this.$router.go(-1);
          this.dataActionReady = false;

        } catch (error) {
          console.log(error);
        }
      }
    },
    //update
    submit: async function () {
    //upload
      if (confirm("Are you sure you want to submit")) {
        this.dataActionReady = true;

        const data = new FormData();
        data.append("PROGRAM_ID", this.PROGDATA.PROGRAM_ID);
        data.append("PROG_DETAILS_ID", this.PROGDATA.PROG_DETAILS_ID);
        data.append("VENUE", this.model.venue);
        data.append("PROGRAM_TITLE", this.model.title);
        data.append("DELIVERY_MODE", this.model.deliveryMode.TR_MODE_ID);
        data.append("PROGRAM_TYPE", this.model.programType.TR_PROGRAM_TYPE_ID);
        this.model.startDate != null
          ? data.append(
          "START_DATE",
          moment(this.model.startDate).format("YYYY-MM-DD")
          )
          : null;
        this.model.endDate != null
          ? data.append(
          "END_DATE",
          moment(this.model.endDate).format("YYYY-MM-DD")
          )
          : null;
        data.append("TOTAL_HOURS", this.model.hours);
        data.append("TARGET_PARTICIPANT", this.model.target);
        data.append("LEARNING_OUTCOME", this.model.outcome);

        const user = JSON.parse(localStorage.getItem("user"));
        const res = await servicesModule4.getCompanyId(user);
        const resMaxPoint = await servicesModule4.getMaxPoint(
          this.model.deliveryMode.TR_MODE_ID
        );

        if (this.model.hours > resMaxPoint.MAX_POINT) {
          data.append("POINT", resMaxPoint.MAX_POINT);
        } else {
          data.append("POINT", this.model.hours);
        }

        data.append("CREATE_BY", user.user_id);
        data.append("COMPANY_ID", user.TP_COMP_ID);
        data.append("PROG_TYPE", 2);
        data.append("CATEGORY", 3);
        data.append("SLOLIST", JSON.stringify(this.sloList));

        //alert(JSON.stringify(this.sloList));

        data.append("PUBLISH_STATUS", 1);
        data.append("TS_ID", "15");

        //File upload
        if (this.model.file.length != 0) {
          for (let i = 0; i < this.model.file.length; i++) {
            data.append("file[]", this.model.file[i]);
          }
        }

        try {
          const response = await servicesModule4.createRepeatedPreVetting(data);
          this.$router.go(-1);
          this.dataActionReady = false;

        } catch (error) {
          console.log(error);
        }
      }
    },

    //general
    back() {
      this.$router.go(-1);
    },
  },
  computed: {
    SloFields() {
      return [
        {
          name: "__slot:no",
          title: "NO",
        },
        {
          name: "SUB_LEARNING_OBJECTIVE",
          title: "SUB LEARNING OBJECTIVE",
          sortField: "SUB_LEARNING_OBJECTIVE",
        },
        {
          name: "TOPIC",
          title: "TOPIC",
          sortField: "TOPIC",
        },
        // {
        //   name: "METHOD",
        //   title: "METHOD",
        //   sortField: "METHOD",
        // },
        // {
        //   name: "MEDIA",
        //   title: "MEDIA",
        //   sortField: "MEDIA",
        // },
        // {
        //   name: "ASSESSMENT",
        //   title: "ASSESSMENT",
        //   sortField: "ASSESSMENT",
        // },
        {
          name: "LS_METHOD_NAME",
          title: "METHOD",
          sortField: "LS_METHOD_NAME",
        },
        {
          name: "LS_MEDIA_NAME",
          title: "MEDIA",
          sortField: "LS_MEDIA_NAME",
        },
        {
          name: "LS_ASSESSMENT_NAME",
          title: "ASSESSMENT",
          sortField: "LS_ASSESSMENT_NAME",
        },
        {
          name: "__slot:speaker",
          title: "SPEAKER",
          sortField: "SPEAKER",
          width: "15%",
        },
        {
          name: "HOURS",
          title: "HOURS",
          sortField: "HOURS",
        },
      ];
    },
    SloFilteredData() {
      if (!this.term || this.term.length < 1) {
        return this.sloList;
      }
      return this.sloList.filter((item) => {
        return this.term
          .toLowerCase()
          .split(" ")
          .every(
            (v) =>
              item.SUB_LEARNING_OBJECTIVE.toLowerCase().includes(v) ||
              item.TOPIC.toLowerCase().includes(v) ||
              item.MEDIA.toLowerCase().includes(v) ||
              item.METHOD.toLowerCase().includes(v) ||
              item.ASSESSMENT.toLowerCase().includes(v) ||
              item.SPEAKER.toLowerCase().includes(v)
          );
      });
    },
  },
  data() {
    return {
      dataUploadReady: false,

      visibleProgram: true,
      visibleSlo: true,

      deliveryModeList: [],
      programTypeList: [],
      methodList: [],
      mediaList: [],
      assessmentList: [],
      sloList: [],
      perPage: "10",
      currentPage: 1,
      count: 1,
      SloRecordCount: null,
      PROGDATA: "",

      term: null,

      model: {
        deliveryMode: "",
        programType: "",
        title: "",
        startDate: null,
        endDate: null,
        target: "",
        outcome: "",
        venue: "",
        hours: "1",
        fileUpload: "",
        file: [],
        PDID:"",
      },

      registerNewSchema: {
        fields: [
          {
            type: "input",
            inputType: "date",
            model: "startDate",
            label: "Proposed Start Date",
            styleClasses: "col-md-6",
            required: true,
            validator: ["required", this.validateStartDate],
          },
          {
            type: "input",
            inputType: "date",
            model: "endDate",
            label: "Proposed End Date",
            styleClasses: "col-md-6",
            required: true,
            validator: ["required", this.validateEndDate],
          },
          {
            type: "input",
            inputType: "text",
            model: "venue",
            label: "Venue",
            placeholder: "Enter Venue",
            styleClasses: "col-md-12",
            required: true,
          },
          {
            type: "input",
            inputType: "text",
            model: "title",
            label: "Program Title",
            placeholder: "Enter Program Title",
            styleClasses: "col-md-6",
            required: true,
            disabled: true,
          },

          {
            type: "input",
            inputType: "text",
            model: "hours",
            label: "Total Hours",
            placeholder: "Enter Total Hours",
            styleClasses: "col-md-6",
            required: true,
            validator: ["required", this.validateHours],
            disabled: true,
          },
          {
            type: "vueMultiSelect",
            model: "deliveryMode",
            label: "Mode of Delivery",
            placeholder: "Select Mode of Delivery",
            selectOptions: {
              multiple: false,
              key: "TR_MODE_ID",
              label: "TR_MODE_NAME",
              searchable: true,
            },
            values: (model, schema) => {
              return this.deliveryModeList;
            },
            styleClasses: "col-md-6",
            required: true,
            disabled: true,
          },
          {
            type: "vueMultiSelect",
            model: "programType",
            label: "Type of Program",
            placeholder: "Select Type of Program",
            selectOptions: {
              multiple: false,
              key: "TR_PROGRAM_TYPE_ID",
              label: "TR_PROGRAM_TYPE_NAME",
              searchable: true,
            },
            values: (model, schema) => {
              return this.programTypeList;
            },
            styleClasses: "col-md-6",
            required: true,
            disabled: true,
          },
          {
            type: "textArea",

            model: "target",
            label: "Target Participant",
            hint: "Max 250 characters",
            max: 250,
            placeholder: "Enter Target Participant ( E.g : Unit Trust Consultant,Private Retirement Scheme Consultant,Remisiers,CMSRL License Holders, Fund Manager, Bankers,Financial Planners, Investment Advisers, Other related target participants)",
            rows: 5,
            validator: "string",
            styleClasses: "col-md-6",
            required: true,
            disabled: true,
          },

          {
            type: "textArea",
            model: "outcome",
            label: "Learning Outcome",
            hint: "Max 1000 characters",
            max: 1000,
            placeholder: "Enter Learning Outcome",
            rows: 5,
            validator: "string",
            styleClasses: "col-md-6",
            required: true,
            disabled: true,
          },
           {
            type: "input",
            inputType: "hidden",
            model: "PDID",
            styleClasses: "col-md-6",
          },

        ],
      },
      fileUploadSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                labels: "Upload Supported Document",
                accept: ".pdf",
                multiple: true,
                text: "Choose a File",
                model: "file",
                type: "vfg-custom-multiple-file-edit-cpd",
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
.color {
  color: red;
}
</style>

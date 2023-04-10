<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">Post-Vetting : Repeat Program</h4>
    </div>
    <br />
    <va-card>
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
        <div>
          <div v-if="currentTab === 'tab1'">
            <div>
              <br />
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
            </div>
          </div>
          <div v-if="currentTab === 'tab2'">
            <div>
              <br />
              <va-data-table
                id="tblSlo"
                :fields="SloFields"
                :data="SloFilteredData"
                no-data-label="No data found"
                :per-page="parseInt(perPage)"
                :datacount="sloRecordCount"
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
            </div>
          </div>
          <div v-if="currentTab === 'tab3'">
            <br />
            <va-data-table
              id="tblFB"
              :fields="FeedbackFields"
              :data="FeedbackFilteredData"
              no-data-label="No data found"
              :per-page="parseInt(perPageFb)"
              :datacount="FeedbackRecordCount"
              :dataperpage="parseInt(perPageFb)"
              clickable
            >
              <template slot="rating" slot-scope="row">
                <textarea
                  class="form-control"
                  id="rating"
                  rows="2"
                  placeholder="Enter Rating"
                  v-model="row.rowData.RATING"
                ></textarea>
              </template>
            </va-data-table>
          </div>

        </div>
      </div>
    </va-card>
    <br>
    <va-card>
        <br />
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
    </va-card>
    <br />

    <div v-if="dataActionReady">
      <div class="text-center text-danger my-2">
        <b-spinner class="align-middle"></b-spinner>
        <strong>Loading...</strong>
      </div>
    </div>
    <div v-else>
      <div class="float-right">
        <button
          @click="saveAsDraft"
          type="button"
          class="m1-1 btn btn-info btn-fill btn-md"
        >
          <i class="fa fa-pencil-square-o" /> &nbsp; Save as draft
        </button>
        <button
          @click="uploadParticipant"
          type="button"
          class="ml-1 btn btn-success btn-fill btn-md"
        >
          <i class="fa fa-users" /> &nbsp; Upload Participant
        </button>
      </div>
    </div>
    <button @click="back" type="button" class="btn btn-primary btn-fill btn-md">
      <i class="fa fa-step-backward" /> &nbsp; Previous
    </button>
  </va-card>
</template>

<script>
import "vue-form-generator/dist/vfg-core.css";
import "vue-form-generator/dist/vfg.css";
import { debounce } from "lodash";
import * as servicesModule4 from "../../../../app/module4/services01";
import moment from "moment";
import Tabs from "vue-tabs-with-active-line";

const TABS = [
  {
    title: "Program Details",
    value: "tab1",
  },
  {
    title: "Sub Learning Objective",
    value: "tab2",
  },

  {
    title: "Feedback",
    value: "tab3",
  },

];

export default {
  props: {},
  mounted() {
    var data = localStorage.getItem("d-postVettingRepeatSubmission");
    this.PROGDATA = JSON.parse(data);

    //alert(JSON.stringify(this.PROGDATA));

    this.getAllDeliveryMode();
    this.getAllProgramType();
    this.checkRunNo();

    this.getAllRecord();

    this.getAllMethod();
    this.getAllMedia();
    this.getAllAssessment();
  },
  components: { Tabs },
  methods: {
    handleClick(newTab) {
      this.currentTab = newTab;
    }, // end tab

    // searh
    search: debounce(function (term) {
      this.term = term;
      console.log(this.term);
    }, 400),

    onModelUpdated(newVal, schema) {
      if (schema == "title") {
        this.model.title = String(newVal).toUpperCase();
      }
      if (schema == "venue") {
        this.model.venue = String(newVal).toUpperCase();
      }
      if (schema == "target") {
        this.model.target = String(newVal).toUpperCase();
      }
      if (schema == "outcome") {
        this.model.outcome = String(newVal).toUpperCase();
      }
      if (schema == "sloTitle") {
        this.model.sloTitle = String(newVal).toUpperCase();
      }
      if (schema == "sloTopic") {
        this.model.sloTopic = String(newVal).toUpperCase();
      }
      if (schema == "sloSpeaker") {
        this.model.sloSpeaker = String(newVal).toUpperCase();
      }
      if (schema == "item") {
        this.model.item = String(newVal).toUpperCase();
      }
    },
    checkRunNo: async function () {
      const user = JSON.parse(localStorage.getItem("user")).user_id;
      const res = await servicesModule4.getCompanyId(user);
      const response = await servicesModule4.checkRunNo(res.USER_DIST_ID);
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
      const response = await servicesModule4.getLatestDetailsByID(
        this.PROGDATA.PROGRAM_ID
      );

      this.model.deliveryMode = {
        TR_MODE_ID: response.PROG_DELMODE,
        TR_MODE_NAME: response.TR_MODE_NAME,
      };

      this.model.programType = {
        TR_PROGRAM_TYPE_ID: response.PROG_PROGRAM_TYPE,
        TR_PROGRAM_TYPE_NAME: response.TR_PROGRAM_TYPE_NAME,
      };

      this.model.title = response.PROG_TITLE;
      this.model.hours = response.PROG_HOURS;
      this.model.target = response.PROG_TARGET;
      this.model.outcome = response.PROG_OUTCOME;
      this.model.status = response.PROG_STATUS;
      this.PROG_DETAILS_ID = response.PROG_DETAILS_ID;

      var num = response.PROG_HOURS.toString();
      num = num.slice(0, num.indexOf(".") + 1);
      this.model.point = Number(num);

      this.getSlo();
      this.getFeedback();
      //this.getDocumentById();
    },

    //get record
    getSlo: async function () {
      const response = await servicesModule4.getSloByID(this.PROG_DETAILS_ID);
      this.sloList = response;
      this.sloRecordCount = this.sloList.length;
    },
    getFeedback: async function () {
      const responseFB = await servicesModule4.getFeedbackByID(
        this.PROG_DETAILS_ID
      );
      this.feedbackList = responseFB;
      this.feedbackRecordCount = this.feedbackList.length;
    },

    getDocumentById: async function () {
      const response = await servicesModule4.getDocumentById(
        this.PROG_DETAILS_ID
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
        this.model.file.push(data);
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
        return ["Decimal only"];
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
        if (moment(this.model.startDate).isBefore(moment(), "day")) {
          console.log("Valid");
        } else {
          console.log("not Valid");
          return ["Date is Not Valid"];
        }
      }

      if (this.model.endDate != null) {
        if (moment(this.model.startDate).isSameOrAfter(this.model.endDate)) {
          console.log("Valid");
        } else {
          console.log("not Valid");
          return ["Date is Not Valid"];
        } // true
      }
    },

    async validateNumber(value) {
      if (!/^[0-9]+$/.test(value)) {
        return ["Numbers only"];
      }
    },

    //action save
    saveAsDraft: async function () {
      if (confirm("Are you sure you want to save this as draft?")) {
        this.dataActionReady = true;
        const data = new FormData();
        data.append("VENUE", this.model.venue);
        // data.append("PROGRAM_TITLE", this.model.title);
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
        //data.append("TARGET_PARTICIPANT", this.model.target);
        data.append("LEARNING_OUTCOME", this.model.outcome);

        const resMaxPoint = await servicesModule4.getMaxPoint(
          this.model.deliveryMode.TR_MODE_ID
        );
        if (this.model.hours > resMaxPoint.MAX_POINT) {
          data.append("POINT", resMaxPoint.MAX_POINT);
        } else {
          data.append("POINT", this.model.hours);
        }
        const user = JSON.parse(localStorage.getItem("user")).user_id;
        const res = await servicesModule4.getCompanyId(user);

        data.append("CREATE_BY", user);
        data.append("COMPANY_ID", res.USER_DIST_ID);
        data.append("PROG_TYPE", 1);
        data.append("CATEGORY", 2);

        data.append("SLOLIST", JSON.stringify(this.sloList));
        data.append("FBLIST", JSON.stringify(this.feedbackList));
        data.append("PUBLISH_STATUS", 0);
        data.append("TS_ID", "1");
        data.append("PROG_DETAILS_REPEAT", 1);
        data.append("PROGRAM_ID", this.PROGDATA.PROGRAM_ID);

        var yr = new Date().getFullYear().toString().substr(2, 2);
        data.append("YEAR", yr);

        //File upload
        if (this.model.file.length != 0) {
          for (let i = 0; i < this.model.file.length; i++) {
            data.append("file[]", this.model.file[i]);
          }
        }

        try {
          const response = await servicesModule4.createNewPostVet(data);
          this.$router.go(-1);
          this.dataActionReady = false;
        } catch (error) {
          console.log(error);
        }
      }
    },

    uploadParticipant: async function () {
      this.dataActionReady = true;
      const data = new FormData();
      data.append("VENUE", this.model.venue);
      // data.append("PROGRAM_TITLE", this.model.title);
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
      //data.append("TARGET_PARTICIPANT", this.model.target);
      data.append("LEARNING_OUTCOME", this.model.outcome);

      const resMaxPoint = await servicesModule4.getMaxPoint(
        this.model.deliveryMode.TR_MODE_ID
      );

      if (this.model.hours > resMaxPoint.MAX_POINT) {
        data.append("POINT", resMaxPoint.MAX_POINT);
      } else {
        data.append("POINT", this.model.hours);
      }

      const user = JSON.parse(localStorage.getItem("user")).user_id;
      const res = await servicesModule4.getCompanyId(user);

      data.append("CREATE_BY", user);
      data.append("COMPANY_ID", res.USER_DIST_ID);
      data.append("PROG_TYPE", 1);
      data.append("CATEGORY", 2);

      data.append("SLOLIST", JSON.stringify(this.sloList));
      data.append("FBLIST", JSON.stringify(this.feedbackList));
      data.append("PUBLISH_STATUS", 0);
      data.append("TS_ID", "1");
      data.append("PROG_DETAILS_REPEAT", 1);
      data.append("PROGRAM_ID", this.PROGDATA.PROGRAM_ID);

      var yr = new Date().getFullYear().toString().substr(2, 2);
      data.append("YEAR", yr);

      //File upload
      if (this.model.file.length != 0) {
        for (let i = 0; i < this.model.file.length; i++) {
          data.append("file[]", this.model.file[i]);
        }
      }

      try {
        if (
          this.model.startDate == "" ||
          this.model.endDate == "" ||
          this.model.venue == "" || this.model.file == ""
        ) {
          alert("Field with (*) is required!");
        } else {
          const response = await servicesModule4.createNewPostVet(data);

          localStorage.setItem(
            "d-postVettingRepeatedViewParticipant",
            response.PROG_DETAILS
          );
          this.$router.push({ name: "d-postVettingRepeatedViewParticipant" });
        }

        this.dataActionReady = false;
      } catch (error) {
        console.log(error);
      }
    },

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
          name: "SPEAKER",
          title: "SPEAKER",
          sortField: "SPEAKER",
        },
        {
          name: "HOURS",
          title: "HOURS",
          sortField: "HOURS",
        },
        {
          name: "__slot:speaker",
          title: "SPEAKER",
          sortField: "SPEAKER",
          width: "15%",
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

    FeedbackFields() {
      return [
        {
          name: "ITEM",
          title: "ITEM",
        },

        {
          name: "__slot:rating",
          title: "RATING",
          sortField: "RATING",
          width: "15%",
        },
      ];
    },
    FeedbackFilteredData() {
      if (!this.term || this.term.length < 1) {
        return this.feedbackList;
      }
    },
  },
  data() {
    return {
      dataActionReady: false,
      visibleProgram: false,
      visibleSlo: false,
      visibleFB: false,

      tabs: TABS,
      currentTab: "tab1",

      deliveryModeList: [],
      programTypeList: [],
      methodList: [],
      mediaList: [],
      assessmentList: [],
      sloList: [],
      PROGDATA: "",

      term: null,
      perPage: "10",
      currentPage: 1,
      header: "",
      count: 1,
      sloRecordCount: null,

      feedbackList: [],
      FeedbackRecordCount: null,
      perPageFb: "10",

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

        repeat: "",
        status: "",
        point: "",

        PROG_DETAILS_ID: "",
      },

      registerNewSchema: {
        fields: [
          {
            type: "input",
            inputType: "hidden",
            model: "repeat",
            styleClasses: "col-md-3",
          },
          {
            type: "input",
            inputType: "hidden",
            model: "status",
            styleClasses: "col-md-3",
          },
          {
            type: "input",
            inputType: "hidden",
            model: "point",
            styleClasses: "col-md-3",
          },
          {
            type: "vfg-functional-date2",
            inputType: "date",
            model: "startDate",
            labels: "Proposed Start Date",
            styleClasses: "col-md-6",
            format: "dd-MMM-yyyy",
            required: true,
            validator: ["required", this.validateStartDate],
          },
          {
            type: "vfg-functional-date2",
            inputType: "date",
            model: "endDate",
            labels: "Proposed End Date",
            styleClasses: "col-md-6",
            format: "dd-MMM-yyyy",
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
            disabled: (model, field, form) => {
              return model.status == "3";
            },
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
            disabled: (model, field, form) => {
              return model.status == "3";
            },
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
            disabled: (model, field, form) => {
              return model.status == "3";
            },
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
            disabled: (model, field, form) => {
              return model.status == "3";
            },
          },
          {
            type: "textArea",

            model: "target",
            label: "Target Participant",
            hint: "Max 250 characters",
            max: 250,
            placeholder:
              "Enter Target Participant ( E.g : Unit Trust Consultant,Private Retirement Scheme Consultant,Remisiers,CMSRL License Holders, Fund Manager, Bankers,Financial Planners, Investment Advisers, Other related target participants)",
            rows: 5,
            validator: "string",
            styleClasses: "col-md-6",
            required: true,
            disabled: (model, field, form) => {
              return model.status == "3";
            },
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
            disabled: (model, field, form) => {
              return model.status == "3";
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
                labels: "Upload speaker profile and  program brochures *",
                accept: ".pdf",
                multiple: true,
                text: "Choose a File",
                model: "file",
                type: "vfg-custom-multiple-file",
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

    &__active {
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
      margin-left: 0;
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

.alignright {
  display: flex;
  justify-content: flex-end;
}

.alignleft {
  display: flex;
  justify-content: flex-start;
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
.color {
  color: red;
}
</style>

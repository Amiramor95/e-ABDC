<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">TPre-Vetting : Amend Submission</h4>
    </div>
    <br />
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
          <va-card>
            <vue-form-generator
              :model="model"
              :schema="editSloSchema"
              :options="formOptions"
              @model-updated="onModelUpdated"
            />
            <br />

            <div class="float-right">
              <button
                @click="reset"
                type="button"
                class="mr-2 btn btn-info btn-fill btn-md"
              >
                <i class="fa fa-refresh" /> &nbsp; Reset
              </button>
              <button
                @click="saveSlo"
                type="button"
                class="ml-1 btn btn-success btn-fill btn-md"
              >
                <i class="fa fa-save" /> &nbsp; Save
              </button>
            </div>
          </va-card>
          <br />
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

            <template slot="actions" slot-scope="props">
              <h4 class="mt-2">
                <span
                  v-b-tooltip.hover
                  title="edit record"
                  v-on:click="editSlo(props.rowData)"
                  class="badge badge-primary mr-2"
                >
                  <i class="fa fa-edit"></i
                ></span>
              </h4>
            </template>
          </va-data-table>
          <br />
        </b-collapse>
      </div>
    </va-card>
    <br />
    <va-card>
      <div class="ml-2 col-md-12">
        Upload Participant
        <button
          v-if="visibleParticipant == true"
          v-b-toggle.collapse-3
          type="button"
          class="float-right btn-fill btn-md"
        >
          <i class="fa fa-eye-slash"></i>
        </button>
        <button
          v-if="visibleParticipant == false"
          v-b-toggle.collapse-3
          type="button"
          class="float-right btn-fill btn-md"
        >
          <i class="fa fa-eye"></i>
        </button>
        <hr />
        <br />
        <div class="ml-1 col-md-12">
          <vue-form-generator
            :model="model"
            :schema="participantUploadSchema"
            :options="formOptions"
            ref="participantUploadForm"
          >
          </vue-form-generator>
          <br />
          <div class="float-right">
            <button
              @click="upload"
              type="button"
              class="ml-1 btn btn-success btn-fill btn-md"
            >
              <i class="fa fa-paper-plane" /> &nbsp; Upload
            </button>
          </div>
        </div>
        <br />
        <br />

        <b-collapse id="collapse-3" class="mt-2" v-model="visibleParticipant">
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
            :fields="PartFields"
            :data="PartFilteredData"
            no-data-label="No data found"
            :per-page="parseInt(perPage)"
            :datacount="PartRecordCount"
            :dataperpage="parseInt(perPage)"
            clickable
          >
            <template slot="no" slot-scope="row">
              {{ row.rowIndex + 1 }}
            </template>

            <template slot="point">
              <textarea
                class="form-control"
                id="pendingPoint"
                rows="1"
                disabled="true"
                v-model="this.model.point"
              ></textarea>
            </template>

            <template slot="actions" slot-scope="props">
              <h4 class="mt-2">
                <span
                  v-b-tooltip.hover
                  title="delete record"
                  v-on:click="removePart(props.rowData)"
                  class="badge badge-danger mr-2"
                >
                  <i class="fa fa-trash"></i
                ></span>
              </h4>
            </template>
          </va-data-table>
          <br />
          <br />
          <div>
            <table class="table table-striped"></table>
            <table class="table table-striped">
              <tbody>
                <tr>
                  <td style="width: 20%">
                    <b
                      >Total Rejected List
                      <downloadExcel
                        :json_data="prevetRejectedList"
                        :excelname="excelname"
                        :sheetname="sheetname"
                        :column="column"
                      ></downloadExcel>
                    </b>
                  </td>
                  <td>:</td>
                  <td>{{this.rejectedCount}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </b-collapse>
      </div>
    </va-card>
    <br />
    <button @click="back" type="button" class="btn btn-primary btn-fill btn-md">
      <i class="fa fa-step-backward" /> &nbsp; Previous
    </button>
    <div class="float-right">
      <button
        @click="saveAsDraft"
        type="button"
        class="m1-1 btn btn-info btn-fill btn-md"
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

export default {
  props: {},
  mounted() {
    var data = localStorage.getItem("t-preVettingAmendProgram");
    this.PROGDATA = JSON.parse(data);
    //alert(JSON.stringify( this.PROGDATA));

    this.getAllDeliveryMode();
    this.getAllProgramType();
    this.checkRunNo();

    this.getAllRecord();
    this.getSlo();
    this.getDocumentById();

    this.getAllMethod();
    this.getAllMedia();
    this.getAllAssessment();

    this.getAllParticipant();
    this.getRejectedList();
  },
  components: {},
  methods: {
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
      const response = await servicesModule4.getDetailsByID(
        this.PROGDATA.PROG_DETAILS_ID
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
      this.model.startDate = response.PROG_DATE_START;
      this.model.endDate = response.PROG_DATE_END;

      this.model.venue = response.PROG_VENUE;
      this.model.hours = response.PROG_HOURS;

      var num = response.PROG_HOURS.toString();
      num = num.slice(0, num.indexOf(".") + 1);
      this.model.point = Number(num);

      this.model.target = response.PROG_TARGET;
      this.model.outcome = response.PROG_OUTCOME;
      this.model.repeat = response.PROG_DETAILS_REPEAT;
      this.model.status = this.PROGDATA.PROG_STATUS;
    },

    //get record
    getSlo: async function () {
      const response = await servicesModule4.getSloByID(
        this.PROGDATA.PROG_DETAILS_ID
      );
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

    //get participant
    getAllParticipant: async function () {
      const response = await servicesModule4.getProgramParticipantByID(
        this.PROGDATA.PROG_DETAILS_ID
      );
      this.partList = response;
      this.partRecordCount = this.partList.length;
    },
    getRejectedList: async function () {
      const response = await servicesModule4.getRejectedListByID(
        this.PROGDATA.PROG_DETAILS_ID
      );
      this.prevetRejectedList= response;
      this.rejectedCount = this.prevetRejectedList.length;
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
      if (confirm("Are you sure you want to save as draft?")) {

        const data = new FormData();
        data.append("PROG_DETAILS_ID", this.PROGDATA.PROG_DETAILS_ID);
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

        data.append("VENUE", this.model.venue);
        const user = JSON.parse(localStorage.getItem("user")).user_id;
        const res = await servicesModule4.getCompanyId(user);

        data.append("CREATE_BY", user);
        data.append("COMPANY_ID", res.USER_DIST_ID);
        data.append("TS_ID", "1");
        data.append("PUBLISH_STATUS", 0);

        //File upload
        if (this.model.file.length != 0) {
          for (let i = 0; i < this.model.file.length; i++) {
            data.append("file[]", this.model.file[i]);
          }
        }
        data.append("PARTLIST", JSON.stringify(this.partList));
        data.append("POINT", this.model.point);
        data.append("TOTAL_PARTICIPANT", this.partRecordCount);
        try {
          const response = await servicesModule4.updateRepeatedPreVetting(data);
          this.$router.go(-1);
        } catch (error) {
          console.log(error);
        }
      }
    },

    //update
    submit: async function () {
      //upload
      if (confirm("Are you sure you want to submit?")) {

        const data = new FormData();
        data.append("PROG_DETAILS_ID", this.PROGDATA.PROG_DETAILS_ID);
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

        data.append("VENUE", this.model.venue);
        const user = JSON.parse(localStorage.getItem("user")).user_id;
        const res = await servicesModule4.getCompanyId(user);

        data.append("CREATE_BY", user);
        data.append("COMPANY_ID", res.USER_DIST_ID);
        data.append("TS_ID", "3");
        data.append("PUBLISH_STATUS", 1);

        // untuk submit participant
        data.append("PARTLIST", JSON.stringify(this.partList));
        data.append("POINT", this.model.point);
        data.append("TOTAL_PARTICIPANT", this.partRecordCount);
        const approvalLevel = await services06Module0.getApprovalLevel(13, 1);
        data.append("APPR_LIST1", JSON.stringify(approvalLevel));

        const approvalLevel2 = await services06Module0.getApprovalLevel(13, 2);
        data.append("APPR_LIST2", JSON.stringify(approvalLevel2));

        //notification
        data.append("NOTI_LOCATION", "approvalPreVettingDistributorList");
        var code = "";
        var remarkEntry = "(CPD-PRE)New entry pending approval";

        data.append("NOTI_REMARK", remarkEntry);

        //File upload
        if (this.model.file.length != 0) {
          for (let i = 0; i < this.model.file.length; i++) {
            data.append("file[]", this.model.file[i]);
          }
        }

        try {
          const response = await servicesModule4.updateRepeatedPreVetting(data);
          this.$router.go(-1);
        } catch (error) {
          console.log(error);
        }
      }
    },

    //action slo
    async editSlo(data) {
      this.model.sloSpeaker = data.SPEAKER;
      this.model.sloID = data.PROG_SLO_ID;

      this.model.sloTitle = data.SUB_LEARNING_OBJECTIVE;
      this.model.sloTopic = data.TOPIC;
      this.model.sloHours = data.HOURS;
      this.model.sloMethod = {
        METHOD: data.METHOD,
        LS_METHOD_NAME: data.LS_METHOD_NAME,
      };

      this.model.sloMedia = {
        MEDIA: data.MEDIA,
        LS_MEDIA_NAME: data.LS_MEDIA_NAME,
      };
      this.model.sloAssessment = {
        ASSESSMENT: data.ASSESSMENT,
        LS_ASSESSMENT_NAME: data.LS_ASSESSMENT_NAME,
      };
    },
    async reset() {
      this.model.sloSpeaker = "";
      this.model.sloID = "";

      this.model.sloTitle = "";
      this.model.sloTopic = "";
      this.model.sloHours = "";
      this.model.sloMethod = "";
      this.model.sloMedia = "";
      this.model.sloAssessment = "";
    },
    async saveSlo() {
      const data = new FormData();
      data.append("SUB_LEARNING_OBJECTIVE", this.model.sloTitle);
      data.append("TOPIC", this.model.sloTopic);
      data.append("HOURS", this.model.sloHours);
      data.append("SPEAKER", this.model.sloSpeaker);

      data.append("METHOD", this.model.sloMethod.METHOD);
      data.append("MEDIA", this.model.sloMedia.MEDIA);
      data.append("ASSESSMENT", this.model.sloAssessment.ASSESSMENT);
      data.append("PROG_SLO_ID", this.model.sloID);
      data.append("PROG_DETAILS_ID", this.PROGDATA.PROG_DETAILS_ID);

      if (this.model.sloID == "") {
        const response = await servicesModule4.createSlo(data);
        this.getSlo();
      } else {
        const response = await servicesModule4.updateSlo(data);
        this.getSlo();
      }
    },
    async removeSlo(data) {
      if (this.model.repeate == 0) {
        if (confirm("Are you sure you want to delete this record?")) {
          const response = await servicesModule4.deleteSlo(data.PROG_SLO_ID);
          this.getSlo();
        }
      } else {
        if (
          confirm(
            "Sorry, This function is not applicable for approved or repeated program."
          )
        ) {
        }
      }
    },

    //participant
    async removePart(data) {
      if (confirm("Are you sure you want to delete this record?")) {
        const response = await servicesModule4.deleteParticipant(
          data.PROG_PARTICIPANT_ID
        );
        this.getAllParticipant();
      }
    },

    //upload participant
    async upload() {
      if (confirm("Are you sure you want to upload this file?")) {

        const data = new FormData();
        data.append("file", this.model.fileParticipant);
        data.append("PROG_DETAILS_ID", this.PROGDATA.PROG_DETAILS_ID);

        try {
          const response = await servicesModule4.importExcelPreVetting(data);
          //this.$router.go(-1);
          this.getAllParticipant();
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
          name: "__slot:actions",
          title: "Action",
          dataClass: "justify-content-center",
          width: "8%",
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
    //PARTICIPANT
    PartFields() {
      return [
        {
          name: "__slot:no",
          title: "NO",
        },
        {
          name: "NAME",
          title: "CONSULTANT NAME",
          sortField: "NAME",
        },
        {
          name: "NRIC_NUMBER",
          title: "NRIC NUMBER",
          sortField: "NRIC_NUMBER",
        },
        {
          name: "PASSPORT_NUMBER",
          title: "PASSPORT NUMBER",
          sortField: "PASSPORT_NUMBER",
        },
        {
          name: "__slot:point",
          title: "POINT",
          dataClass: "justify-content-center",
          width: "8%",
        },

        {
          name: "__slot:actions",
          title: "Action",
          dataClass: "justify-content-center",
          width: "8%",
        },
      ];
    },
    PartFilteredData() {
      if (!this.term || this.term.length < 1) {
        return this.partList;
      }
      return this.partList.filter((item) => {
        return this.term
          .toLowerCase()
          .split(" ")
          .every(
            (v) =>
              item.NAME.toLowerCase().includes(v) ||
              item.NRIC_NUMBER.toLowerCase().includes(v) ||
              item.PASSPORT_NUMBER.toLowerCase().includes(v)
          );
      });
    },
  },
  data() {
    return {
      visibleProgram: true,
      visibleSlo: false,
      visibleParticipant: true,

      deliveryModeList: [],
      programTypeList: [],
      methodList: [],
      mediaList: [],
      assessmentList: [],
      sloList: [],
      partList: [],
      perPage: "10",
      currentPage: 1,
      count: 1,
      SloRecordCount: null,
      PartRecordCount: null,
      rejectedCount:null,
      PROGDATA: "",

      term: null,

      prevetRejectedList:[],
       column: [
        "NAME",
        "NRIC_NUMBER",
        "PASSPORT_NUMBER",
        "REASON",
      ],
      excelname: "download-RejectedList",
      sheetname: "RejectedList",

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
        fileParticipant: "",
        point: "",

        sloTitle: "",
        sloTopic: "",
        sloHours: "0",
        sloMethod: "",
        sloMedia: "",
        sloAssessment: "",
        sloSpeaker: "",
        sloID: "",
        sloProgDetailsID: "",

        repeat: "",
        status: "",
      },

      registerNewSchema: {
        fields: [
          {
            type: "input",
            inputType: "hidden",
            model: "repeat",
            styleClasses: "col-md-6",
          },
          {
            type: "input",
            inputType: "hidden",
            model: "status",
            styleClasses: "col-md-6",
          },
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
            disabled: (model, field, form) => {
              return model.status == "3";
            },
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
            disabled: (model, field, form) => {
              return model.status == "3";
            },
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
            disabled: (model, field, form) => {
              return model.status == "3";
            },
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
            disabled: (model, field, form) => {
              return model.status == "3";
            },
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
            disabled: (model, field, form) => {
              return model.status == "3";
            },
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
            disabled: (model, field, form) => {
              return model.status == "3";
            },
            disabled: true,
          },
          {
            type: "input",
            inputType: "hidden",
            model: "point",
            styleClasses: "col-md-12",
            disabled: true,
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

      participantUploadSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                labels: "Upload Participant",
                accept: ".xlxs",
                multiple: true,
                text: "Choose a File",
                model: "fileParticipant",
                type: "vfg-custom-file-excel",
                styleClasses: "col-md-12",
              },
            ],
          },
        ],
      },
      formOptions: {
        validateAfterChanged: true,
      },
      editSloSchema: {
        fields: [
          {
            type: "textArea",
            inputType: "text",
            model: "sloTitle",
            label: "Sub Learning Objective",
            placeholder: "Enter Sub Learning Objective",
            styleClasses: "col-md-6",
            rows: 3,
            required: true,
            disabled: (model, field, form) => {
              return model.status == "3";
            },
          },
          {
            type: "textArea",
            inputType: "text",
            model: "sloTopic",
            label: "Topic",
            rows: 3,
            placeholder: "Enter Topic",
            styleClasses: "col-md-6",
            required: true,
            disabled: (model, field, form) => {
              return model.status == "3";
            },
          },
          {
            type: "input",
            inputType: "text",
            model: "sloHours",
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
            model: "sloMethod",
            label: "Method",
            placeholder: "Select Method",
            selectOptions: {
              multiple: false,
              key: "METHOD",
              label: "LS_METHOD_NAME",
              searchable: true,
            },
            values: (model, schema) => {
              return this.methodList;
            },
            styleClasses: "col-md-6",
            required: true,
            disabled: (model, field, form) => {
              return model.status == "3";
            },
          },
          {
            type: "vueMultiSelect",
            model: "sloMedia",
            label: "Media",
            placeholder: "Select Media",
            selectOptions: {
              multiple: false,
              key: "LS_MEDIA_ID",
              label: "LS_MEDIA_NAME",
              searchable: true,
            },
            values: (model, schema) => {
              return this.mediaList;
            },
            styleClasses: "col-md-6",
            required: true,
            disabled: (model, field, form) => {
              return model.status == "3";
            },
          },
          {
            type: "vueMultiSelect",
            model: "sloAssessment",
            label: "Assessment",
            placeholder: "Select Assessment",
            selectOptions: {
              multiple: false,
              key: "LS_ASSESSMENT_ID",
              label: "LS_ASSESSMENT_NAME",
              searchable: true,
            },
            values: (model, schema) => {
              return this.assessmentList;
            },
            styleClasses: "col-md-6",
            required: true,
            disabled: (model, field, form) => {
              return model.status == "3";
            },
          },
          {
            type: "input",
            inputType: "text",
            model: "sloSpeaker",
            label: "Speaker",
            placeholder: "Enter Speaker",
            styleClasses: "col-md-12",
            required: true,
          },
          {
            type: "input",
            inputType: "hidden",
            model: "sloID",
            placeholder: "EnterID",
            styleClasses: "col-md-6",
          },
          {
            type: "input",
            inputType: "hidden",
            model: "sloProgDetailsID",
            placeholder: "EnterID",
            styleClasses: "col-md-6",
          },
        ],
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

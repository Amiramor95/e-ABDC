<template>
  <div v-if="!dataReady" style="margin-top: 25%">
    <div class="text-center text-success my-2">
      <b-spinner class="align-middle mr-1"></b-spinner>
      <strong>Loading...</strong>
    </div>
  </div>
  <va-card v-else>
    <div class="row">
      <h4 slot="header" class="card-title">Writing and Publishing Books/Articles : View Program Details</h4>
    </div>
    <br>
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
      <div class="ml-2 col-md-12">
        Distributor's Person In Charge
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
              <td style="width: 15%">Name</td>
              <td>{{ PROGDATA.USERNAME }}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{{ PROGDATA.USER_EMAIL }}</td>
            </tr>
            <tr>
              <td>Mobile Phone Number</td>
              <td>{{ PROGDATA.USER_MOBILE_NUM }}</td>
            </tr>
            <tr>
              <td>Office Phone Number</td>
              <td>{{ PROGDATA.USER_OFFICE_NUM }}</td>
            </tr>
            <tr>
              <td>Office Extension Number</td>
              <td>{{ PROGDATA.USER_EXTENSION_NUM }}</td>
            </tr>
            </tbody>
          </table>
        </b-collapse>
      </div>
    </va-card>
    <div v-show="!dataReady">
      <div class="text-center text-danger my-2">
        <b-spinner class="align-middle"></b-spinner>
        <strong>Loading...</strong>
      </div>
    </div>
    <br />
    <DetailSubmittedProgram
    :module="module"
    :participantLists="participantList"
    :route="'f-approvalWritingViewDetailParticipant'"
    />
    <br />
    <!-- 2. list participant -->
    <br />
    <va-card>
      <div class="ml-2 col-md-12">
        List Of Participants
        <hr />
        <br />
        <ParticipantList
          :fields="fields"
          :filter-data="filterData"
          :count="count"
          @view-document="viewPdf"
          @filter="filter"
          @filter-date="filterDate"
          @clear="clearFilter"
        />
        <br />
      </div>
    </va-card>
    <br />

    <!-- Review Section -->
    <va-card>
      <div class="ml-2 col-md-12">
        Approval Section
        <hr />
        <vue-form-generator
          :model="model"
          :schema="reviewSchema"
          :options="formOptions"
          ref="reviewForm"
          @model-updated="onModelUpdated"
        >
        </vue-form-generator>
        <br />
        <br />
        <button
          @click="back"
          type="button"
          class="btn btn-primary btn-fill btn-md"
        >
          <i class="fa fa-step-backward" /> &nbsp; Previous
        </button>
        <div class="float-right">
          <button
            @click="saveAsDraft"
            type="button"
            class="ml-2 btn btn-info btn-fill btn-md"
          >
            <i class="fa fa-pencil-square-o" /> &nbsp; Save as draft
          </button>
          <button
            @click="returnCpd"
            type="button"
            style="background: #dc3546; color: #ffffff"
            class="ml-1 btn btn-fill btn-md"
          >
            <i class="fa fa-reply" /> &nbsp; Return
          </button>
          <button
            @click="rejectCpd"
            type="button"
            style="background: #ff4a55; color: #ffffff"
            class="ml-1 btn btn-fill btn-md"
          >
            <i class="fa fa-ban" /> &nbsp; Reject
          </button>
          <button
            v-if="this.module.TS_ID == 19"
            disabled=""
            v-b-tooltip.hover title="This button is disabled for this status"
            @click="approveCpd"
            type="button"
            style="background: #87cb16; color: #ffffff"
            class="ml-1 btn btn-fill btn-md"
          >
            <i class="fa fa-paper-plane" /> &nbsp; Approve
          </button>
          <button
            v-else
            @click="approveCpd"
            type="button"
            style="background: #87cb16; color: #ffffff"
            class="ml-1 btn btn-fill btn-md"
          >
            <i class="fa fa-paper-plane" /> &nbsp; Approve
          </button>
        </div>
      </div>

      <div v-show="submitApproval">
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Approving...</strong>
        </div>
      </div>
    </va-card>
  </va-card>
</template>


<script>
import "vue-form-generator/dist/vfg.css";
import * as services07Module4 from "../../../../../app/module4/services07";
import ParticipantList from "../components/participantList.vue";
import DetailSubmittedProgram from "../../../distributor/modules/components/detailSubmittedProgram.vue";
import * as servicesModule4 from '../../../../../app/module4/services01'

export default {
  mounted() {
    var data = localStorage.getItem("approvalWritingViewDetails");
    this.PROGDATA = JSON.parse(data);
    this.getModuleByID(this.PROGDATA.MODULE_ID);

  },
  components: {
    ParticipantList,
    DetailSubmittedProgram
  },
  methods: {

    clearFilter(){
      this.term=""
    },


    async readMore(data) {
      this.$modals.simpleModal.$show();
      this.model.showRemark = data.APPR_FULL;
    },
    filter(value) {
      if(value.includes('-')){
        this.term =  value.substr(0,6)+value.substr(7,2)+value.substr(10,4);
      }
      else{
        this.term = value;
      }
    },

    filterDate(value) {
      this.termDate = value;
    },

    viewPdf(document) {
      var byteCharacters = atob(document["DOC_BLOB"]);
      var byteNumbers = new Array(byteCharacters.length);
      for (var i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      var file = new Blob([byteArray], {
        type: "application/pdf;base64",
      });
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    },

    onModelUpdated(newVal, schema) {
      if (schema == "comment") {
        this.model.comment = String(newVal).toUpperCase();
      }
    },

    getModuleByID: async function (id) {
      const resModule = await services07Module4.getModule(id);
      const resParticipant = await services07Module4.getWritingParticipantList(
        id
      );
      this.module = resModule;
      let remark = resModule.APPR_REMARK;
      this.participantList = resParticipant.data;
      this.dataReady = true;
      if (remark != null) {
        this.model.comment = remark;
      } else if (remark == null) {
        this.model.comment = "";
      }
    },

    async back() {
      this.$router.go(-1);
    },
    saveAsDraft: async function () {
      const data = new FormData();
      var r = confirm("Are you sure to save as draft?");
      if (r == true) {
        const data = new FormData();
        data.append("APPR_PUBLISH_STATUS", 0); // save as draft
        data.append("TS_ID", 1); // draft
        data.append("APPR_REMARK", this.model.comment);
        const user = localStorage.getItem("user");
        data.append("CREATE_BY", JSON.parse(user).user_id);
        var noted = JSON.parse(user).USER_GROUP_NAME + " ON REVIEW";
        data.append("NOTE", noted);
        data.append("MODULE_ID", this.PROGDATA.MODULE_ID);

        try {
          const response = await services07Module4.moduleApproval(data);
          console.log("test", response);
          if (response) {
            this.submitApproval = false;
          }
          if (response.status) {
            // console.log(response);
            this.$router.push({
              name: "approvalWritingModuleList",
            });
          }
        } catch (error) {
          this.submitApproval = false;
        }
      }
    },
    approveCpd: async function () {
      if (confirm("Are you sure to approve of this submission?")) {
        this.submitApproval = true;
        const data = new FormData();
        data.append("DISTRIBUTOR_ID", this.module.COMPANY_ID);
        data.append("DIST_CREATE_BY", this.module.CREATE_BY);
        data.append("APPR_PUBLISH_STATUS", 1);
        var remarkEntry = "(CPD-Writing)This entry has been approved by FIMM";
        data.append("NOTI_REMARK", remarkEntry);
        data.append("APPR_REMARK", this.model.comment);
        data.append("NOTI_LOCATION", "d-writingModuleList");
        const user = localStorage.getItem("user");
        data.append("APPR_GROUP_ID", JSON.parse(user).USER_GROUP_ID);

        data.append("CREATE_BY", JSON.parse(user).user_id);
        var noted = "APPROVED BY " + JSON.parse(user).USER_GROUP_NAME;
        data.append("NOTE", noted);
        data.append("TS_ID", 3);
        data.append("MODULE_ID", this.PROGDATA.MODULE_ID);

        try {
          const response = await services07Module4.moduleApproval(data);
          if (response) {
            this.submitApproval = false;
          }
          if (response.status) {
            // console.log(response);
            this.$router.push({
              name: "approvalWritingModuleList",
            });
          }
        } catch (error) {
          this.submitApproval = false;
        }
      }
    },
    returnCpd: async function () {
      if (confirm("Are you sure to return of this submission?")) {
        const data = new FormData();
        const user = localStorage.getItem("user");
        data.append("APPR_GROUP_ID", JSON.parse(user).USER_GROUP_ID);

        data.append("DISTRIBUTOR_ID", this.module.COMPANY_ID);
        data.append("CREATE_BY", JSON.parse(user).user_id);
        data.append("DIST_CREATE_BY", this.module.CREATE_BY);
        data.append("APPR_PUBLISH_STATUS", 0); // draft
        data.append("APPR_REMARK", this.model.comment);
        var remarkEntry = "(CPD-Writing)This Entry has been returned by FIMM";
        data.append("NOTI_REMARK", remarkEntry);
        data.append("NOTI_LOCATION", "d-writingModuleList");
        var noted = "REVIEWED BY " + JSON.parse(user).USER_GROUP_NAME;
        data.append("NOTE", noted);
        data.append("TS_ID", 7);
        data.append("MODULE_ID", this.PROGDATA.MODULE_ID);

        try {
          const response = await services07Module4.moduleApprovalReturn(data);
           if (response) {
            this.submitApproval = false;
          }
          if (response.status) {
            // console.log(response);
            this.$router.push({
              name: "approvalWritingModuleList",
            });
          }
        } catch (error) {
          this.submitApproval = false;
        }
      }
    },

    rejectCpd: async function () {
      if (confirm("Are you sure to reject this submission?")) {
        const data = new FormData();
        const user = localStorage.getItem("user");
        data.append("APPR_GROUP_ID", JSON.parse(user).USER_GROUP_ID);

        data.append("DISTRIBUTOR_ID", this.module.COMPANY_ID);
        data.append("CREATE_BY", JSON.parse(user).user_id);
        data.append("DIST_CREATE_BY", this.module.CREATE_BY);
        data.append("APPR_PUBLISH_STATUS", 1);
        data.append("APPR_REMARK", this.model.comment);
        var remarkEntry = "(CPD-Writing)This Entry has been rejected by FIMM";
        data.append("NOTI_REMARK", remarkEntry);
        data.append("NOTI_LOCATION", "d-writingModuleList");
        var noted = "REVIEWED BY " + JSON.parse(user).USER_GROUP_NAME;
        data.append("NOTE", noted);
        data.append("TS_ID", 5);
        data.append("MODULE_ID", this.PROGDATA.MODULE_ID);

        try {
          const response = await services07Module4.moduleApprovalReturn(data);
           if (response) {
            this.submitApproval = false;
          }
          if (response.status) {
            // console.log(response);
            this.$router.push({
              name: "approvalWritingModuleList",
            });
          }
        } catch (error) {
          this.submitApproval = false;
        }
      }
    },

    formatDateTimestampToDate(datetimestamp) {
      var datetimestamp = new Date(datetimestamp);
      var dd = String(datetimestamp.getDate()).padStart(2, "0");
      var mm = String(datetimestamp.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = datetimestamp.getFullYear();

      return dd + "-" + mm + "-" + yyyy;
    },
  },
  computed: {
    filterData() {
      this.count = this.participantList.length;
      if (!(this.term || this.termDate)) {
        return this.participantList;
      }

      return this.participantList.filter((item) => {
        if (this.termDate) {
          let convertDate = this.formatDateTimestampToDate(
            item.DATE
          );
          return convertDate == this.termDate;
        } else if (item.PASSPORT_NUMBER && this.term.toLowerCase() == item.PASSPORT_NUMBER.toLowerCase() ) {
          return this.term.toLowerCase() == item.PASSPORT_NUMBER.toLowerCase()
        } else {
          return this.term
            .toLowerCase()
            .split(" ")
            .every(
              (v) =>
                // item.CREATE_BY_NAME.toLowerCase().includes(v) ||
                item.WRITING_TITLE.toLowerCase().includes(v) ||
                item.WRITING_MODE_DESCRIPTION.toLowerCase().includes(v) ||
                item.PUBLISHER.toLowerCase().includes(v) ||
                item.NAME.toLowerCase().includes(v) ||
                item.NRIC_NUMBER.toLowerCase().includes(v)
            );
        }
      });
    },
    fields() {
      return [
        {
          name: "__slot:no",
          title: "NO",
        },
        {
          name: "__slot:DATE",
          title: "PUBLISH DATE",
          dataClass: "justify-content-center",
          width: "8%",
        },

        {
          name: "NAME",
          title: "NAME",
        },
        {
          name: "__slot:NRIC_NUMBER",
          title: "NRIC NUMBER",
        },
        {
          name: "PASSPORT_NUMBER",
          title: "PASSPORT NUMBER",
        },
        {
          name: "WRITING_TITLE",
          title: "TITLE",
        },
        {
          name: "WRITING_MODE_DESCRIPTION",
          title: "WRITING MODE",
        },
        {
          name: "PUBLISHER",
          title: "PUBLISHER",
        },
        {
          name: "__slot:actions_support_docs",
          title: "Support Document",
          dataClass: "justify-content-center",
          width: "4%",
        },
      ];
    },

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
      visibleLog: true,
      visibleProfile: false,
      participantList: [],
      module: null,
      approval: null,
      term: null,
      termDate: null,
      PROGDATA: "",
      dataReady: false,
      submitApproval: false,
      model: {
        comment: "",

        fileUpload: "",
        file: [],
        showRemark: "",
      },
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
            styleClasses: "col-md-12",
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

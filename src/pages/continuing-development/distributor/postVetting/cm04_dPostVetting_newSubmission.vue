<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">
        Post-Vetting : New Program Application
      </h4>
    </div>
    <br />
    <va-card>
      <div class="ml-1 col-md-12">
        <vue-form-generator
          :model="model"
          :schema="uploadExcelSchema"
          :options="formOptions"
          ref="uploadExcelForm"
        >
        </vue-form-generator>
        <br />
        <div class="float-right">
          <button
            v-if="this.model.fileExcel != ''"
            @click="upload"
            type="button"
            class="ml-1 btn btn-success btn-fill btn-md"
          >
            <i class="fa fa-paper-plane" /> &nbsp; Upload
          </button>
        </div>
      </div>
    </va-card>
    <br />
    <div v-if="dataUploadReady">
      <div class="text-center text-danger my-2">
        <b-spinner class="align-middle"></b-spinner>
        <strong>Loading...</strong>
      </div>
    </div>
    <div v-else>
      <va-card v-if="showDetailsForm">
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
                <div class="ml-2 col-md-12">
                  <table class="table table-striped"></table>
                  <table class="table table-striped">
                    <tbody>
                      <tr>
                        <td style="width: 15%">
                          <b>Total Participant </b> &nbsp; &nbsp;
                          <span
                            v-b-tooltip.hover
                            title="View Participant"
                            @click="viewParticipant"
                            class="badge badge-primary mr-2"
                          >
                            <i class="fa fa-external-link"></i
                          ></span>
                        </td>
                        <td style="width: 1%">:</td>
                        <td>{{ this.model.totalParticipant }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <br />
              </div>
            </div>
            <div v-if="currentTab === 'tab2'">
              <br />
              <div class="ml-1 col-md-12">
                <table class="table table-striped"></table>
                <table class="table table-striped">
                  <tbody>
                    <tr>
                      <td style="width: 20%">
                        <b>Total Hours of SLO </b>
                      </td>
                      <td style="width: 1%">:</td>
                      <td>{{ this.totalSloHours.TOTALSLOHOURS }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
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
                      <span
                        v-b-tooltip.hover
                        title="delete record"
                        v-on:click="removeSlo(props.rowData)"
                        class="badge badge-danger mr-2"
                      >
                        <i class="fa fa-trash"></i
                      ></span>
                    </h4>
                  </template>
                </va-data-table>
                <br />
                <br />
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
                      style="background: #ff4a55; color: #ffffff"
                      class="mr-2 btn btn-fill btn-md"
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
                <template slot="actions" slot-scope="props">
                  <h4 class="mt-2">
                    <span
                      v-b-tooltip.hover
                      title="edit record"
                      v-on:click="editFb(props.rowData)"
                      class="badge badge-primary mr-2"
                    >
                      <i class="fa fa-edit"></i
                    ></span>
                  </h4>
                </template>
              </va-data-table>
              <br />
              <br />
              <va-card>
                <vue-form-generator
                  :model="model"
                  :schema="editFBSchema"
                  :options="formOptions"
                  @model-updated="onModelUpdated"
                />
                <br />

                <div class="float-right">
                  <button
                    @click="resetFb"
                    type="button"
                    style="background: #ff4a55; color: #ffffff"
                    class="mr-2 btn btn-fill btn-md"
                  >
                    <i class="fa fa-refresh" /> &nbsp; Reset
                  </button>
                  <button
                    @click="saveFb"
                    type="button"
                    class="ml-1 btn btn-success btn-fill btn-md"
                  >
                    <i class="fa fa-save" /> &nbsp; Save
                  </button>
                </div>
              </va-card>
            </div>
          </div>
        </div>
      </va-card>
      <br />
      <va-card v-if="showDetailsForm">
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
            v-if="showDetailsForm"
            @click="saveAsDraft"
            type="button"
            class="ml-1 btn btn-info btn-fill btn-md"
          >
            <i class="fa fa-pencil-square-o" /> &nbsp; Save as draft
          </button>
          <button
            v-if="showDetailsForm"
            @click="submit"
            type="button"
            class="ml-1 btn btn-success btn-fill btn-md"
          >
            <i class="fa fa-paper-plane" /> &nbsp; Submit
          </button>
        </div>
      </div>
      <button
        @click="back"
        type="button"
        class="btn btn-primary btn-fill btn-md"
      >
        <i class="fa fa-step-backward" /> &nbsp; Previous
      </button>
    </div>
  </va-card>
</template>

<script>
import "vue-form-generator/dist/vfg-core.css";
import "vue-form-generator/dist/vfg.css";
import Tabs from "vue-tabs-with-active-line";
import * as servicesModule4 from "../../../../app/module4/services01";
import * as services06Module0 from "../../../../app/module0/services06";
import moment from "moment";

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
    this.getAllDeliveryMode();
    this.getAllProgramType();
    this.checkRunNo();

    this.getAllMethod();
    this.getAllMedia();
    this.getAllAssessment();
  },
  components: {
    Tabs,
  },
  methods: {
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
    getAllDeliveryMode: async function () {
      const response = await servicesModule4.getAllDeliveryMode();
      this.deliveryModeList = response;
    },
    getAllProgramType: async function () {
      const response = await servicesModule4.getAllProgramType();
      this.programTypeList = response;
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

    //get record
    getSlo: async function () {
      const response = await servicesModule4.getSloByID(
        this.model.progDetailsID
      );
      this.sloList = response;
      this.sloRecordCount = this.sloList.length;

      const responseSloHours = await servicesModule4.getTotalSloHours(
        this.model.progDetailsID
      );

      this.totalSloHours = responseSloHours;

          if (this.model.hours != this.totalSloHours.TOTALSLOHOURS) {
            this.model.hours = this.totalSloHours.TOTALSLOHOURS;
          }
    },
    getFeedback: async function () {
      const responseFB = await servicesModule4.getFeedbackByID(
        this.model.progDetailsID
      );
      this.feedbackList = responseFB;
      this.feedbackRecordCount = this.feedbackList.length;
    },

    //*************************************************************** */

    validateHours(value) {
      const expression1 = /^[-+]?[0-9]+\.[0-9]+$/;
      console.log(expression1.test(value));
      if (!expression1.test(value)) {
        return ["Decimal only"];
      }
    },
    //Validation
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
        if (moment(this.model.startDate).isSameOrBefore(moment(), "day")) {
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

    viewParticipant: async function () {
      const data = new FormData();
      data.append("PROG_DETAILS_ID", this.model.progDetailsID);

      localStorage.setItem(
        "d-postVettingViewParticipant",
        this.model.progDetailsID
      );

      // let routeData = this.$router.resolve({
      //   name: "d-postVettingViewParticipant",
      // });
      // window.open(routeData.href, "_parent");
     this.$router.push({
        name: "d-postVettingViewParticipant",
      });
     // window.open(routeData.href, "_parent");
    },

    async validateNumber(value) {
      if (!/^[0-9]+$/.test(value)) {
        return ["Numbers only"];
      }
    },

    back() {
      this.$router.go(-1);
    }, // back button

    handleClick(newTab) {
      this.currentTab = newTab;
    }, // end tab

    //SAVE AS DRAFT
    saveAsDraft: async function () {
      if (confirm("Are you sure you want to save this as draft?")) {
        this.dataActionReady = true;
        //upload
        const data = new FormData();
        data.append("PROGRAM_ID", this.model.progID);
        data.append("PROG_DETAILS_ID", this.model.progDetailsID);
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
        data.append("TARGET_PARTICIPANT", this.model.target);
        data.append("LEARNING_OUTCOME", this.model.outcome);

        const user = JSON.parse(localStorage.getItem("user")).user_id;
        const res = await servicesModule4.getCompanyId(user);

        data.append("CREATE_BY", user);
        data.append("COMPANY_ID", res.USER_DIST_ID);
        data.append("PROG_TYPE", 1);
        data.append("CATEGORY", 2);

        data.append("PUBLISH_STATUS", 0);
        data.append("TS_ID", "1");
        data.append("PROG_DETAILS_REPEAT", 0);

        var yr = new Date().getFullYear().toString().substr(2, 2);
        data.append("YEAR", yr);

          if (this.model.hours != this.totalSloHours.TOTALSLOHOURS) {
            data.append("TOTAL_HOURS", this.totalSloHours.TOTALSLOHOURS);
        }else{
              data.append("TOTAL_HOURS", this.model.hours);
        }

        const resMaxPoint = await servicesModule4.getMaxPoint(
          this.model.deliveryMode.TR_MODE_ID
        );

        if (this.model.hours > resMaxPoint.MAX_POINT) {
          data.append("POINT", resMaxPoint.MAX_POINT);
        } else {
        data.append("POINT", this.model.hours);
        }

        //File upload
        if (this.model.file.length != 0) {
          for (let i = 0; i < this.model.file.length; i++) {
            data.append("file[]", this.model.file[i]);
          }
        }

        try {
          const response = await servicesModule4.updatePostVetting(data);

          this.dataActionReady = false;
          this.$router.go(-1);

        } catch (error) {
          console.log(error);
        }
      }
    },
    //SUBMIT NEW CASE
    submit: async function () {
      if (confirm("Are you sure you want to submit this entry?")) {
        this.dataActionReady = true;
        //upload
        const data = new FormData();
        const responsePart = await servicesModule4.getProgramParticipantByID(
          this.model.progDetailsID
        );

        data.append("PARTLIST", JSON.stringify(responsePart));

        data.append("PROGRAM_ID", this.model.progID);
        data.append("PROG_DETAILS_ID", this.model.progDetailsID);
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

        if (this.model.hours != this.totalSloHours.TOTALSLOHOURS) {
            data.append("TOTAL_HOURS", this.totalSloHours.TOTALSLOHOURS);
        }else{
              data.append("TOTAL_HOURS", this.model.hours);
        }
        const resMaxPoint = await servicesModule4.getMaxPoint(
          this.model.deliveryMode.TR_MODE_ID
        );

        if (this.model.hours > resMaxPoint.MAX_POINT) {
          data.append("POINT", resMaxPoint.MAX_POINT);
        } else {
        data.append("POINT", this.model.hours);
        }

        data.append("TARGET_PARTICIPANT", this.model.target);
        data.append("LEARNING_OUTCOME", this.model.outcome);

        const user = JSON.parse(localStorage.getItem("user")).user_id;
        const res = await servicesModule4.getCompanyId(user);

        const userinfo = localStorage.getItem("user");
        data.append("APPR_GROUP_ID", JSON.parse(userinfo).USER_GROUP_ID);

        data.append("CREATE_BY", user);
        data.append("COMPANY_ID", res.USER_DIST_ID);
        data.append("PROG_TYPE", 1);
        data.append("CATEGORY", 2);


        data.append("PUBLISH_STATUS", 1);
        data.append("TS_ID", "15");
        data.append("PROG_DETAILS_REPEAT", 0);

        //(process flow, index)
        const approvalLevel = await services06Module0.getApprovalLevel(12, 1);
        data.append("APPR_LIST1", JSON.stringify(approvalLevel));

        const approvalLevel2 = await services06Module0.getApprovalLevel(12, 2);
        data.append("APPR_LIST2", JSON.stringify(approvalLevel2));

        var yr = new Date().getFullYear().toString().substr(2, 2);
        data.append("YEAR", yr);

        //File upload
        if (this.model.file.length != 0) {
          for (let i = 0; i < this.model.file.length; i++) {
            data.append("file[]", this.model.file[i]);
          }
        }

        //notification
        var remarkEntry =
          "(CPD-POST)New entry pending approval for " + res.DIST_NAME;

        data.append("NOTI_LOCATION", "approval-postVetting-distributorList");

        data.append("NOTI_REMARK", remarkEntry);

        try {
         const response = await servicesModule4.updatePostVetting(data);
          this.dataActionReady = false;
          this.$router.go(-1);

        } catch (error) {
          console.log(error);
        }
      }
    },
    //UPLOAD EXCEL
    async upload() {
      if (confirm("Are you sure you want to upload this record?")) {
        this.dataUploadReady = true;
        const data = new FormData();
        data.append("file", this.model.fileExcel);
        data.append("PROG_TYPE", 1);
        data.append("CATEGORY", 2);
        const user = JSON.parse(localStorage.getItem("user")).user_id;
        const res = await servicesModule4.getCompanyId(user);

        data.append("CREATE_BY", user);
        data.append("COMPANY_ID", res.USER_DIST_ID);

        try {
          const response1 = await servicesModule4.importExcelPostVet(data);

          //get data TAB 1
          const response = await servicesModule4.getDetailsByID(
            response1.PROG_DETAILS
          );


          this.model.progID = response1.PROG_ID;

          (this.model.progDetailsID = response1.PROG_DETAILS),
            (this.model.deliveryMode = {
              TR_MODE_ID: response.PROG_DELMODE,
              TR_MODE_NAME: response.TR_MODE_NAME,
            });

          this.model.programType = {
            TR_PROGRAM_TYPE_ID: response.PROG_PROGRAM_TYPE,
            TR_PROGRAM_TYPE_NAME: response.TR_PROGRAM_TYPE_NAME,
          };

          this.model.title = response.PROG_TITLE.toUpperCase();
          this.model.startDate = response.PROG_DATE_START;
          this.model.endDate = response.PROG_DATE_END;

          this.model.venue = response.PROG_VENUE.toUpperCase();
          this.model.target = response.PROG_TARGET.toUpperCase();
          this.model.outcome = response.PROG_OUTCOME.toUpperCase();

          const responseSloHours = await servicesModule4.getTotalSloHours(
            response1.PROG_DETAILS
          );

          const resMaxPoint = await servicesModule4.getMaxPoint(
            response.PROG_DELMODE
          );

          this.totalSloHours = responseSloHours;

          // if (response.PROG_HOURS != this.totalSloHours.TOTALSLOHOURS) {
          //   if (this.totalSloHours.TOTALSLOHOURS >= resMaxPoint.MAX_POINT) {
          //     this.model.hours = resMaxPoint.MAX_POINT;
          //   } else if (this.totalSloHours.TOTALSLOHOURS < resMaxPoint.MAX_POINT) {
          //     this.model.hours = this.totalSloHours.TOTALSLOHOURS;
          //   }
          // } else{
          //   this.model.hours = response.PROG_HOURS;
          // }
          if (response.PROG_HOURS != this.totalSloHours.TOTALSLOHOURS) {
              this.model.hours = this.totalSloHours.TOTALSLOHOURS;
          } else{
            this.model.hours = response.PROG_HOURS;
          }

          var num = this.model.hours.toString();
          num = num.slice(0, num.indexOf(".") + 1);
          this.model.point = Number(num);

          this.model.totalParticipant = response.TOTAL_PARTICIPANT;

          this.model.status = response.TS_PARAM;

          //slo
          const responseSlo = await servicesModule4.getSloByID(
            response1.PROG_DETAILS
          );
          this.sloList = responseSlo;
          this.sloRecordCount = this.sloList.length;

          //FB
          const responseFB = await servicesModule4.getFeedbackByID(
            response1.PROG_DETAILS
          );
          this.feedbackList = responseFB;
          //alert(JSON.stringify(this.feedbackList));

          this.feedbackRecordCount = this.feedbackList.length;

          this.dataUploadReady = false;
          this.showDetailsForm = true;
        } catch (error) {
          console.log(error);
        }
      }
    },

    //*********************SLO************************ */

    async removeSlo(data) {
      if (confirm("Are you sure you want to delete this record?")) {
        const response = await servicesModule4.deleteSlo(data.PROG_SLO_ID);
        this.getSlo();
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
      if (confirm("Are you sure you want to save this?")) {
        const data = new FormData();
        data.append("SUB_LEARNING_OBJECTIVE", this.model.sloTitle);
        data.append("TOPIC", this.model.sloTopic);
        data.append("HOURS", this.model.sloHours);
        data.append("SPEAKER", this.model.sloSpeaker);

        data.append("METHOD", this.model.sloMethod.METHOD);
        data.append("MEDIA", this.model.sloMedia.MEDIA);
        data.append("ASSESSMENT", this.model.sloAssessment.ASSESSMENT);
        data.append("PROG_SLO_ID", this.model.sloID);
        data.append("PROG_DETAILS_ID", this.model.progDetailsID);

        if (this.model.sloID == "") {
          const response = await servicesModule4.createSlo(data);
          this.getSlo();
        } else {
          const response = await servicesModule4.updateSlo(data);
          this.getSlo();
        }
      }
    },

    //*********************FB************************ */
    //action fb
    async editFb(data) {
      this.model.FbID = data.PROG_FEEDBACK_ID;
      this.model.item = data.ITEM;
      this.model.rating = data.RATING;
    },
    async resetFb() {
      this.model.FbID = "";
      this.model.item = "";
      this.model.rating = "";
    },
    async saveFb() {
      if (confirm("Are you sure you want to save this?")) {
        const data = new FormData();
        data.append("PROG_FEEDBACK_ID", this.model.FbID);
        data.append("ITEM", this.model.item);
        data.append("RATING", this.model.rating);
        data.append("PROG_DETAILS_ID", this.model.progDetailsID);

        if (this.model.FbID == "") {
          const response = await servicesModule4.createFb(data);
          this.getFeedback();
        } else {
          const response = await servicesModule4.updateFb(data);
          this.getFeedback();
        }
      }
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

    FeedbackFields() {
      return [
        {
          name: "ITEM",
          title: "ITEM",
        },
        {
          name: "RATING",
          title: "RATING",
        },
        {
          name: "__slot:actions",
          title: "Action",
          dataClass: "justify-content-center",
          width: "8%",
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
      dataUploadReady: false,
      showDetailsForm: false,

      tabs: TABS,
      currentTab: "tab1",

      deliveryModeList: [],
      programTypeList: [],
      methodList: [],
      mediaList: [],
      assessmentList: [],

      sloList: [],
      term: null,
      perPage: "10",
      currentPage: 1,
      header: "",
      count: 1,
      sloRecordCount: null,

      feedbackList: [],
      FeedbackRecordCount: null,
      perPageFb: "10",

      totalSloHours: "",
      maxPoint: "0",

      model: {
        deliveryMode: "",
        programType: "",
        title: "",
        startDate: null,
        endDate: null,
        target: "",
        outcome: "",
        venue: "",
        hours: "",
        file: [],
        code: "",
        fileExcel: "",
        point: "0",
        totalParticipant: "0",
        status: "",
        progDetailsID: "",
        progID: "",

        sloTitle: "",
        sloTopic: "",
        sloHours: "0",
        sloMethod: "",
        sloMedia: "",
        sloAssessment: "",
        sloSpeaker: "",
        sloID: "",
        sloProgDetailsID: "",

        item: "",
        rating: "",
        FbID: "",
        fbProgDetailsID: "",
      },

      registerNewSchema: {
        fields: [
          {
            type: "vfg-functional-date2",
            inputType: "date",
            model: "startDate",
            labels: "Start Date",
            styleClasses: "col-md-6",
            required: true,
            format: "dd-MMM-yyyy",
            validator: ["required", this.validateStartDate],
          },
          {
            type: "vfg-functional-date2",
            inputType: "date",
            model: "endDate",
            labels: "End Date",
            styleClasses: "col-md-6",
            required: true,
            format: "dd-MMM-yyyy",
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
            hint: "Total hours must be equal to total SLO hours",
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
          },
          {
            type: "input",
            inputType: "hidden",
            model: "point",
            styleClasses: "col-md-3",
          },
          {
            type: "input",
            inputType: "hidden",
            model: "totalParticipant",
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
            model: "progDetailsID",
            styleClasses: "col-md-3",
          },
          {
            type: "input",
            inputType: "hidden",
            model: "progID",
            styleClasses: "col-md-3",
          },
        ],
      },
      fileUploadSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                labels: "Upload Speaker Profile and Program Brochure",
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
      uploadExcelSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                labels: "Upload Excel",
                accept: ".xlxs,.xls",
                multiple: true,
                text: "Choose a File",
                model: "fileExcel",
                type: "vfg-custom-file-excel",
                styleClasses: "col-md-12",
                hint: "*Please use excel template provided by FIMM",
              },
            ],
          },
        ],
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
            validator: ["required", this.validateNumber],
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

      editFBSchema: {
        fields: [
          {
            type: "input",
            inputType: "text",
            model: "item",
            label: "Item",
            placeholder: "Enter Item",
            styleClasses: "col-md-6",
            required: true,
          },
          {
            type: "input",
            inputType: "text",
            model: "rating",
            label: "Rating",
            placeholder: "Enter Rating",
            styleClasses: "col-md-6",
            required: true,
          },

          {
            type: "input",
            inputType: "hidden",
            model: "FbID",
            placeholder: "EnterID",
            styleClasses: "col-md-6",
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
  .vue-file-agent.file-input-wrapper{
    z-index: 0;
  }

</style>

<style scoped>
  .vue-file-agent.file-input-wrapper{
    z-index: 0;
  }
.widthModal {
  width: 80%;
}
</style>

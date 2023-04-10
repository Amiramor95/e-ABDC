<template>
    <b-overlay :show="overlay_show" rounded="sm">
      <div class="row">
        <div class="col-12">
          <va-card>
            <h4 style="margin-top:0">Consultant: Resit</h4>
            <br />
            <form-wizard
              color="#FF5050"
              error-color="#a94442"
              finish-button-text="Submit"
              ref="wizardForm"
            >
              <h3 slot="title"></h3>

              <tab-content
                icon="fa fa-info"
                title="1. Type of Consultant"
              >
                <form-distributors
                    ref="refResitChangeDistributor"
                    :savedConsultantData="savedConsultantData"
                    :savedConsultantLicenseData="savedConsultantData.license"
                    :showLicenseData="true">
                </form-distributors>

              </tab-content>

              <tab-content
                  icon="fa fa-tasks"
                  title="2. Examination"
              >
                  <h5 class="mb-4">Exam Sessions</h5>

                  <!-- Fetching API Data Form Input -->
                  <div class="row">
                    <div class="col-md-4">
                        <b-form-group label="State:" label-for="exam-state" description="">
                        <multiselect
                            id="exam-state"
                            v-model="selected_state"
                            :options="option_states"
                            placeholder="Select a state"
                            track-by="SETTING_GENERAL_ID"
                            label="SET_PARAM"
                            @select="onStateSelected"
                        >
                        </multiselect>
                        </b-form-group>
                    </div>

                    <div class="col-md-4">
                        <b-form-group
                        label="Exam Center:"
                        label-for="exam-center"
                        description=""
                        >
                        <multiselect
                            v-model="selected_center"
                            :options="exam_centers"
                            track-by="ID"
                            label="CENTRE_NAME"
                            placeholder="Select one"
                            @select="onCenterSelected"
                        >
                        </multiselect>
                        </b-form-group>
                    </div>

                    <div class="col-md-4">
                        <b-form-group
                        label="Start from:"
                        label-for="exam-center"
                        description=""
                        >
                        <datepicker
                            placeholder="dd-MM-yyyy"
                            format="dd-MMM-yyyy"
                            input-class="form-control bgcolor col-md-12"
                            :typeable="false"
                            @selected="isDatePicked"
                            :value="calendar_selected"
                        ></datepicker>
                        </b-form-group>
                    </div>
                  </div>

                  <!-- Switch Table and Calender View -->
                  <div class="row">
                    <div class="col-md-12">
                        <div class="d-flex justify-content-end">
                        <h5 class="table-icon">
                            <b-badge @click="switchSessionView(1)" class="mr-1" variant="secondary">
                            <i class="fa fa-table"></i>
                            </b-badge>
                        </h5>
                        <h5 class="calender-icon">
                            <b-badge @click="switchSessionView(2)" class="mr-1" variant="secondary">
                            <i class="fa fa-calendar-o"></i>
                            </b-badge>
                        </h5>
                        </div>
                    </div>
                  </div>
                  
                  <!-- Booked Sessions in Table and Calender View -->
                  <div class="row min-500">
                    <div class="col-md-12">
                        <div class="">* Choose 3 exam sessions</div>

                        <!-- Session Table View -->
                        <div v-if="sessionViewType == 1">
                          <b-table
                              bordered
                              outlined
                              hover
                              :items="exam_sessions"
                              :fields="fields"
                              show-empty
                              head-variant="light"
                              sticky-header
                              class="mt-4"
                          >
                              <template #empty="data">
                              <span>No record available.</span>
                              </template>

                              <!-- index column -->
                              <template #cell(index)="data">
                              {{ data.index + 1 }}
                              </template>

                              <!-- Session Time column -->
                              <template #cell(SESSION_TIME)="data">
                              {{ data.item.START_TIME }} - {{ data.item.END_TIME }}
                              </template>

                              <!-- Location column -->
                              <template #cell(GOOGLE_MAP_LINK)="data">
                              <a :href="data.item.GOOGLE_MAP_LINK" target="_blank">{{data.item.GOOGLE_MAP_LINK}}</a>
                              </template>

                              <!-- Action column -->
                              <template #cell(action)="data">
                              <a @click="setSelectedExamSession(data)" style="margin:0; font-size:20px">
                                  <span class="badge badge-success mr-1">
                                  <i class="fa fa-plus"></i>
                                  </span>
                              </a>
                              </template>
                          </b-table>
                        </div>

                        <!-- Session Calender View -->
                        <div v-if="sessionViewType == 2">
                            <FullCalendar :options="calendarOptions">
                                <template v-slot:eventContent='arg'>
                                <div style="cursor: pointer;">
                                    <p class="mb-0">Center Name: {{ arg.event.title }}</p>
                                    <p class="mb-0">Session Time: {{ arg.event.extendedProps.START_TIME }} - {{ arg.event.extendedProps.END_TIME }}</p>
                                    <p class="mb-0">Mode: {{ arg.event.extendedProps.CENTER_MODE }}</p>
                                </div>
                                </template>
                            </FullCalendar>
                        </div>
                    </div>

                    <!-- Selected sessions tabled -->
                    <div class="col-md-12 mt-5">
                        <div class="">Selected Exam Sessions:</div>
                        <b-table
                            bordered
                            outlined
                            hover
                            :items="selected_sessions"
                            :fields="fields"
                            show-empty
                            head-variant="light"
                            sticky-header
                            class="mt-2"
                        >
                            <template #empty="data">
                            <span>No record available.</span>
                            </template>

                            <!-- index column -->
                            <template #cell(index)="data">
                            {{ data.index + 1 }}
                            </template>

                            <!-- Session Time column -->
                            <template #cell(SESSION_TIME)="data">
                            {{ data.item.START_TIME }} - {{ data.item.END_TIME }}
                            </template>

                            <!-- Location column -->
                            <template #cell(GOOGLE_MAP_LINK)="data">
                            <a :href="data.item.GOOGLE_MAP_LINK" target="_blank">{{data.item.GOOGLE_MAP_LINK}}</a>
                            </template>

                            <!-- Action column -->
                            <template #cell(action)="data">
                            <div v-if="data.item.BOOKING_CONFIRMATION_STATUS == 3">
                                <span class="badge badge-danger mr-1">
                                Booked
                                </span>
                            </div>

                            <div v-else>
                                <a @click="removeSelectedExamSession(data)" style="margin:0; font-size:20px">
                                <span class="badge badge-danger mr-1">
                                    <i class="fa fa-minus"></i>
                                </span>
                                </a>
                            </div>
                            </template>
                        </b-table>
                    </div>

                    <!-- <div class="col-md-12" v-if="selected_sessions && selected_sessions.length>=1">
                        <div class="float-right">
                        <button
                            @click="resitExamSessions('confirm')"
                            type="button"
                            class="ml-2 btn btn-success btn-fill btn-md"
                            >
                            Confirm Sessions
                            </button>
                        </div>
                    </div> -->
                  </div>
              </tab-content>

              <br />
              <br />

              <!-- button -->
              <template slot="footer" slot-scope="{ activeTabIndex, isLastStep, nextTab, prevTab }">
                  <div class="float-left">
                    <button
                        v-if="activeTabIndex > 0"
                        @click="prevTab"
                        type="button"
                        class="btn btn-primary btn-fill btn-md"
                    >
                        <i class="fa fa-step-backward" /> &nbsp; Previous
                    </button>

                    <button v-else
                        @click="goback"
                        type="button"
                        class="btn btn-primary btn-fill btn-md"
                    >
                        <i class="fa fa-step-backward" /> &nbsp; Previous
                    </button>
                  </div>

                  <div class="float-right">
                    <button
                        v-if="confirmed_exam_sessions.length<1"
                        @click="resitExamSessions('draft', 'Are you sure to save as Draft?')"
                        type="button"
                        class="btn btn-info btn-fill btn-md"
                    >
                        <i class="fa fa-edit" /> &nbsp;Save as Draft
                    </button>

                    <button
                        v-if="!isLastStep"
                        @click="nextTab"
                        type="button"
                        class="ml-2 btn btn-primary btn-fill btn-md"
                    >
                        Next &nbsp; <i class="fa fa-step-forward" />
                    </button>

                    <button
                        @click="resitExamSessions('confirm', 'Are you sure to confirm exam sessions?')"
                        v-if="isLastStep && confirmed_exam_sessions.length<1"
                        type="button"
                        class="ml-2 btn btn-primary btn-fill btn-md"
                    >
                        <i class="fa fa-paper-plane" /> Confirm Sessions
                    </button>
                  </div>
              </template>
            </form-wizard>
          </va-card>

          <b-modal v-model="modalSessionEvent" centered>
            <template #modal-header>
              <h5>Center Details</h5>
            </template>

            <div>
              <p><b>Center Name :</b> {{modalSessionEventData.CENTRE_NAME}}</p>
              <p><b>Session Time :</b> {{modalSessionEventData.START_TIME}} - {{modalSessionEventData.END_TIME}}</p>
              <p><b>Mode :</b>  {{modalSessionEventData.CENTER_MODE}}</p>
              <p><b>Available Seat :</b> {{modalSessionEventData.AVAILABLE_SEAT}}</p>
              <p><b>Centre Location :</b> <a :href="modalSessionEventData.GOOGLE_MAP_LINK" target="_blank">{{modalSessionEventData.GOOGLE_MAP_LINK}}</a></p>
              <a @click="setSelectedExamSessionFromCalender(modalSessionEventData)" style="margin: 0px;font-size: 20px;cursor: pointer;">
                  <span class="badge badge-success mr-1 py-2">
                    <i class="fa fa-plus mr-2"></i>Book Session
                  </span>
                </a>
            </div>
            <template #modal-footer>
              <div class="w-100">
                <b-button
                  variant="primary"
                  size="sm"
                  class="float-right"
                  @click="modalSessionEvent=false"
                >
                  Close
                </b-button>
              </div>
            </template>
          </b-modal>
        </div>
      </div>
    </b-overlay>
</template>

<script>
import Vue from "vue";
import VueFormWizard from 'vue-form-wizard';
import 'vue-form-wizard/dist/vue-form-wizard.min.css';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import moment from "moment";
import FullCalendar from '@fullcalendar/vue';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import * as ExamAPI from "../services/exam";
import * as AuthenticatedUserAPI from "../services/auth";
import * as GeneralSettingsAPI from "../services/general";

import FormDistributors from '../components/applications/type-of-consultant/form-distributors.vue'

Vue.use(VueFormWizard);

export default {
  components: {
    FullCalendar,
    FormDistributors,
  },

  data() {
    return {
      savedConsultantData: "",
      consultantLicenseData: "",
      sessionViewType: 1,
      modalSessionEvent: false,
      modalSessionEventData: '',
      option_states: [],
      states: [],
      selected_state: null,
      exam_centers: [],
      selected_center: null,
      overlay_show: true,
      fields: [
        { key: "index", class: "text-center" },
        { key: "DATE", label: "Exam Date", class: "text-center" },
        { key: "EXAM_DAY", label: "DAY", class: "text-center" },
        { key: "SESSION_TIME", label: "Session Time", class: "text-center" },
        { key: "CENTER_MODE", label: "Center Mode", class: "text-center" },
        { key: "CENTRE_NAME", label: "Centre Name", class: "text-center" },
        { key: "GOOGLE_MAP_LINK", label: "Centre Location", class: "text-center" },
        {
          key: "AVAILABLE_SEAT",
          label: "Available Seats",
          class: "text-center",
        },
        { key: "action", label: "Action", class: "text-center" },
      ],
      exam_sessions: [],

      //calendar_selected: new Date(), //new Date(2021, 8, 15)
      //date_start_from: new Date(),
      calendar_selected: "",
      date_start_from: "",

      selected_sessions: [],
      confirmed_exam_sessions: [],
      model: {
        CONSULTANT_ID: '',
        CONSULTANT_LICENSE_ID: '',
      },

      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        backgroundColor: '#ff0000',
        eventColor: '#378006',
        eventClick: this.handleEventClick,
        //eventsSet: this.handleEvents,
        events: [],
        // events: [
        //   { title: 'JOHOR SAL', date: '2022-05-25'},
        //   { title: 'JOHOR SAL', date: '2020-11-02'},
        // ],
      },
      currentEvents: []
    };
  },
  methods: {
    goback(){
      this.$router.push('/consultant/applicant-profile')
    },

    switchSessionView(type) {
      this.sessionViewType = type;
    },

    handleEventClick: function(info) {
      console.log(info.event);
      this.modalSessionEvent = true;
      this.modalSessionEventData = info.event.extendedProps;
    },

    // handleEvents(events) {
    //   this.currentEvents = events
    // },

    async fetchStates(country_id) {
      try {
        const res_states = await GeneralSettingsAPI.get_states(country_id);
        this.option_states = res_states.data;
        //this.mapDropDownToModel();
      } catch (error) {
        console.log(error);
      }
    },

    async getExamCenters(state) {
      try {
        const response = await ExamAPI.getExamCentersByState(state);
        this.exam_centers = response.data;
        this.overlay_show = false;
      } catch (error) {
        console.log(error);
      }
    },

    async getExamListDetails() {
      if (
        this.selected_state.SETTING_GENERAL_ID &&
        this.selected_center.ID &&
        this.date_start_from
      ) {
        try {
          this.overlay_show = true;
          const response = await ExamAPI.getExamListsByCenterAndDate(
            this.selected_state.SETTING_GENERAL_ID,
            this.selected_center.ID,
            this.date_start_from
          );
          this.exam_sessions = response.data;

          this.calendarOptions.events = [];
          this.calendarOptions.events = response.data;
          this.overlay_show = false;
        } catch (error) {
          console.log(error);
        }
      }
    },

    onStateSelected(state, id) {
      this.overlay_show = true;
      //console.log("State:",state.SETTING_GENERAL_ID);
      this.selected_state = state;
      this.selected_center = null;
      this.exam_centers = [];
      this.exam_sessions = [];
      this.getExamCenters(state.SETTING_GENERAL_ID);
    },

    onCenterSelected(center, id) {
      //console.log("Center:", center.ID);
      this.selected_center = center;
      this.exam_sessions = [];
      this.getExamListDetails();
      //this.getExamListPreference();
    },

    isDatePicked(selected_date) {
      this.calendar_selected = selected_date;
      this.date_start_from = moment(this.calendar_selected).format(
        "YYYY-MM-DD"
      );

      this.getExamListDetails();
    },

    setSelectedExamSession(data) {
      if (this.confirmed_exam_sessions && this.confirmed_exam_sessions.length>=1){
        alert('You have already confirmed your sessions. So you cannot book new sessions.');
        return;
      };

      if (this.selected_sessions.length >= 3){
        alert('You cannnot book more than 3 Sesions');
        return;
      };

      if (this.selected_sessions.some(el => el.EXAM_SESSION_DETAIL_ID == data.item.EXAM_SESSION_DETAIL_ID)){
         alert('You cannnot book same session two times');
         return;
      }

      this.selected_sessions.push(data.item);
    },

    setSelectedExamSessionFromCalender(data) {
      if (this.confirmed_exam_sessions && this.confirmed_exam_sessions.length>=1){
        alert('You have already confirmed your sessions. So you cannot book new sessions.');
        return;
      };

      if (this.selected_sessions.length >= 3){
        alert('You cannnot book more than 3 Sesions');
        return;
      };

      if (this.selected_sessions.some(el => el.EXAM_SESSION_DETAIL_ID == data.EXAM_SESSION_DETAIL_ID)){
         alert('You cannnot book same session two times');
         return;
      }

      this.selected_sessions.push(data);
      this.modalSessionEvent = false;
    },

    removeSelectedExamSession(data) {
      if(confirm("Do you really want to remove this exam session?")){
        const index = this.selected_sessions.findIndex(
          el => el.EXAM_SESSION_DETAIL_ID === data.item.EXAM_SESSION_DETAIL_ID,
        );

        if(data.item.CONSULTANT_BOOKED_EXAM_SESSION_ID){
          this.selected_sessions.splice(index, 1);
          ExamAPI
          .delete_booked_exams_sessions(data.item.CONSULTANT_BOOKED_EXAM_SESSION_ID)
            .then((response)=>{
              Vue.$toast.open({
                  message: 'Sesssions successfully removed.',
                  type: 'success',
                  position: "bottom-right",
              });
            });
        }else{
          this.selected_sessions.splice(index, 1);
          Vue.$toast.open({
              message: 'Sesssions successfully removed.',
              type: 'success',
              position: "bottom-right",
          });
        }
      }
    },

    // saveResitExamDatas(){
    //   const consultant_type_form_data = this.$refs.refResitChangeDistributor.getDataToSave();
    //   console.log(consultant_type_form_data);
    // },

    async resitExamSessions(action, confirm_text){
      const consultant_type_form_data = this.$refs.refResitChangeDistributor.getDataToSave();

      if(this.$refs.wizardForm.activeTabIndex == 1){
        if(this.selected_sessions.length>0){
          if(confirm(confirm_text)){
            this.overlay_show = true;
            const data = new FormData();
            data.append('CONSULTANT_TYPE_ID', consultant_type_form_data.CONSULTANT_TYPE_ID);
            data.append('DISTRIBUTOR_ID', consultant_type_form_data.DISTRIBUTOR_ID);
            data.append('DIST_POINT_ID', consultant_type_form_data.DIST_POINT_ID);

            data.append("BOOKED_EXAM_SESSIONS", JSON.stringify(this.selected_sessions));
            data.append('CONSULTANT_ID', this.savedConsultantData.CONSULTANT_ID);
            data.append('USER_ID', this.savedConsultantData. USER_ID);
            data.append('CONSULTANT_NRIC', this.savedConsultantData.CONSULTANT_NRIC);
            data.append('EXAM_TYPE', consultant_type_form_data.CONSULTANT_TYPE_ID);
            data.append('CONSULTANT_TYPE_ID', consultant_type_form_data.CONSULTANT_TYPE_ID);
            data.append('DISTRIBUTOR_ID', consultant_type_form_data.DISTRIBUTOR_ID);
            data.append('DIST_POINT_ID', consultant_type_form_data.DIST_POINT_ID);
            data.append('CANDIDATE_CATEGORY', this.consultantLicenseData.CANDIDATE_CATEGORY ? this.consultantLicenseData.CANDIDATE_CATEGORY : '');
            data.append('CANDIDATE_POSITION_CATEGORY', this.consultantLicenseData.CANDIDATE_POSITION_CATEGORY ? this.consultantLicenseData.CANDIDATE_POSITION_CATEGORY : '');
            data.append('CANDIDATE_POSITION', this.consultantLicenseData.CANDIDATE_POSITION ? this.consultantLicenseData.CANDIDATE_POSITION : '');
            data.append('CMSRL', consultant_type_form_data.CMSRL ? consultant_type_form_data.CMSRL : '');
            data.append('CMSRL_NO', consultant_type_form_data.CMSRL_NO ? consultant_type_form_data.CMSRL_NO : '');
            data.append('CMSRL_EXPIRE_DATE', consultant_type_form_data.CMSRL_EXPIRE_DATE ? consultant_type_form_data.CMSRL_EXPIRE_DATE : '');
            data.append('RECRUITER_NRIC_NO', consultant_type_form_data.RECRUITER_NRIC_NO ? consultant_type_form_data.RECRUITER_NRIC_NO : '');
            data.append('RECRUITER_CMSRL_NO', consultant_type_form_data.RECRUITER_CMSRL_NO ? consultant_type_form_data.RECRUITER_CMSRL_NO : '');
            if(action=='draft'){
              data.append('BOOKING_CONFIRMATION_STATUS', 1); //Draft
            }else if(action=='confirm'){
              data.append('BOOKING_CONFIRMATION_STATUS', 3); //Confirmed
            }
            data.append('BOOKING_TYPE', 5); // // Resit (consultant_management=CONSULTANT_APPLICATION_TYPES TABLE)
            await ExamAPI.saveConsultantresitExamSessions(data)
            .then((response) => {
                Vue.$toast.open({
                    message: response.message,
                    type: 'success',
                    position: "bottom-right",
                });
                this.fetchStates(33); // 33 = Country Id of Malaysia
                this.getConfirmedExamSessions();
                this.getExamSessions();
                this.overlay_show = false;
            });
          }
        }else{
          alert('Please select sessions to submit');
        }
      }else{
        this.overlay_show = true;
        const data = new FormData();
        data.append('CONSULTANT_ID', this.savedConsultantData.CONSULTANT_ID);
        data.append('USER_ID', this.savedConsultantData. USER_ID);
        data.append('CONSULTANT_NRIC', this.savedConsultantData.CONSULTANT_NRIC);
        data.append('CONSULTANT_TYPE_ID', consultant_type_form_data.CONSULTANT_TYPE_ID);
        data.append('DISTRIBUTOR_ID', consultant_type_form_data.DISTRIBUTOR_ID);
        data.append('DIST_POINT_ID', consultant_type_form_data.DIST_POINT_ID);
        data.append('CANDIDATE_CATEGORY', this.consultantLicenseData.CANDIDATE_CATEGORY ? this.consultantLicenseData.CANDIDATE_CATEGORY : '');
        data.append('CANDIDATE_POSITION_CATEGORY', this.consultantLicenseData.CANDIDATE_POSITION_CATEGORY ? this.consultantLicenseData.CANDIDATE_POSITION_CATEGORY : '');
        data.append('CANDIDATE_POSITION', this.consultantLicenseData.CANDIDATE_POSITION ? this.consultantLicenseData.CANDIDATE_POSITION : '');
        data.append('CMSRL', consultant_type_form_data.CMSRL ? consultant_type_form_data.CMSRL : '');
        data.append('CMSRL_NO', consultant_type_form_data.CMSRL_NO ? consultant_type_form_data.CMSRL_NO : '');
        data.append('CMSRL_EXPIRE_DATE', consultant_type_form_data.CMSRL_EXPIRE_DATE ? consultant_type_form_data.CMSRL_EXPIRE_DATE : '');
        data.append('RECRUITER_NRIC_NO', consultant_type_form_data.RECRUITER_NRIC_NO ? consultant_type_form_data.RECRUITER_NRIC_NO : '');
        data.append('RECRUITER_CMSRL_NO', consultant_type_form_data.RECRUITER_CMSRL_NO ? consultant_type_form_data.RECRUITER_CMSRL_NO : '');
        data.append('BOOKING_TYPE', 5); // // Resit (consultant_management=CONSULTANT_APPLICATION_TYPES TABLE)
        await ExamAPI.saveConsultantresitExamSessions(data)
        .then((response) => {
            Vue.$toast.open({
                message: response.message,
                type: 'success',
                position: "bottom-right",
            });
            this.overlay_show = false;
        });
      }
    },

    convertToDateTimeObject(value){
      let date_time = moment(value, "DD/MM/YYYY hh:mm:ss")
      let session_time = {
        date: date_time.format("hh:mm:ss a"),
        time: date_time.format("DD/MM/YYYY"),
        day: date_time.format("dddd")
      }
      return session_time
    },

    async getExamSessions() {
      try {
        const authUser = await AuthenticatedUserAPI.me();
        //this.consultant_id = authUser.data.user.CONSULTANT_ID;
        this.getBookedExamLists(
          this.savedConsultantData.CONSULTANT_ID
        );
      } catch (error) {
        console.log(error);
      }
    },

    getBookedExamLists(consult_id){
      ExamAPI
        .get_booked_exams_sessions(consult_id, 5) // Resit (consultant_management=CONSULTANT_APPLICATION_TYPES TABLE)
        .then((response) =>{
          this.selected_sessions = [];
          this.selected_sessions=response.data;
          this.overlay_show = false;
        });
    },

    getConfirmedExamSessions(){
      ExamAPI
        .get_confirmed_exam_sessions(this.savedConsultantData.CONSULTANT_ID, 5) // Resit (consultant_management=CONSULTANT_APPLICATION_TYPES TABLE)
        .then((response) =>{
          this.confirmed_exam_sessions = [];
          this.confirmed_exam_sessions=response.data;
        });
    },
  },

  created() {
    this.savedConsultantData= JSON.parse(localStorage.getItem('savedConsultantData'));
    if(this.savedConsultantData){
      this.consultantLicenseData = this.savedConsultantData.license;
    }

    this.fetchStates(33); // 33 = Country Id of Malaysia
    this.getConfirmedExamSessions();
    this.getExamSessions();
  },
};
</script>

<style lang="scss">
.table thead th {
  font-weight: bold;
  font-size: 1rem;
}

.min-500 {
  min-height: 500px;
}
input::placeholder {
  /* Recent browsers */
  text-transform: none;
}
.text-uppercase input {
  text-transform: uppercase !important;
}
.text-uppercase label {
  /* Recent browsers */
  text-transform: none;
}
.display-inline label {
  display: inline !important;
  padding: 5px;
}

.app-layout__main {
  background: #e8e8e8;
}
.container {
  max-width: 620px;
  min-width: 420px;
  margin: 40px auto;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.9em;
  color: #888;
}

/* Style the tabs */
.tabs {
  overflow: hidden;
  margin-left: 20px;
  margin-bottom: -2px; // hide bottom border
}

.tabs ul {
  list-style-type: none;
  margin-left: 20px;
}

.tabs a {
  float: left;
  cursor: pointer;
  padding: 12px 24px;
  transition: background-color 0.2s;
  border: 1px solid #ccc;
  border-right: none;
  background-color: #f1f1f1;
  border-radius: 10px 10px 0 0;
  font-weight: bold;
}
.tabs a:last-child {
  border-right: 1px solid #ccc;
}

/* Change background color of tabs on hover */
.tabs a:hover {
  background-color: #aaa;
  color: #fff;
}

/* Styling for active tab */
.tabs a.active {
  background-color: #fff;
  color: #484848;
  border-bottom: 2px solid #fff;
  cursor: default;
}

/* Style the tab content */
.tabcontent {
  padding: 30px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 3px 3px 6px #e1e1e1;
}
</style>

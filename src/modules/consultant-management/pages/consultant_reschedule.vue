<template>
  <b-overlay :show="overlay_show" rounded="sm">
    <div class="row">
      <div class="col-12">
        <va-card>
          <h4 style="margin-top:0">Consultant: Reschedule</h4>
          <br />

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
              <div class="">* Choose 1 exam sessions</div>

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
          </div>

          <div class="float-left">
            <button
              @click="goback"
              type="button"
              class="btn btn-primary btn-fill btn-md"
            >
              <i class="fa fa-step-backward" /> &nbsp; Previous
            </button>
          </div>

          <div class="float-right" v-if="confirmed_exam_sessions.length<1">
            <button

              @click="rescheduleExamSessions('draft', 'Are you sure to save as Draft?')"
              type="button"
              class="btn btn-info btn-fill btn-md"
            >
              <i class="fa fa-edit" /> &nbsp;Save as Draft
            </button>

            <button type="button" class="ml-2 btn btn-success btn-fill btn-md" @click="rescheduleExamSessions('confirm', 'Are you sure to confirm exam sessions?')">
              <i class="fa fa-paper-plane" /> Confirm Sessions
            </button>
          </div>
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
import Vue from 'vue'
import moment from 'moment'
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import * as ExamAPI from '../services/exam'
import * as AuthenticatedUserAPI from '../services/auth'
import * as GeneralSettingsAPI from '../services/general'

export default {
  components: {
    FullCalendar,
  },

  data () {
    return {
      savedConsultantData: '',
      savedConsultantLicenseData: '',
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
        { key: 'index', class: 'text-center' },
        { key: 'DATE', label: 'Exam Date', class: 'text-center' },
        { key: 'EXAM_DAY', label: 'DAY', class: 'text-center' },
        { key: 'SESSION_TIME', label: 'Session Time', class: 'text-center' },
        { key: 'CENTER_MODE', label: 'Center Mode', class: 'text-center' },
        { key: 'CENTRE_NAME', label: 'Centre Name', class: 'text-center' },
        { key: 'GOOGLE_MAP_LINK', label: 'Centre Location', class: 'text-center' },
        {
          key: 'AVAILABLE_SEAT',
          label: 'Available Seats',
          class: 'text-center',
        },
        { key: 'action', label: 'Action', class: 'text-center' },
      ],
      exam_sessions: [],

      // calendar_selected: new Date(), //new Date(2021, 8, 15)
      // date_start_from: new Date(),
      calendar_selected: '',
      date_start_from: '',

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
        // eventsSet: this.handleEvents,
        events: [],
      },
      currentEvents: [],
    }
  },
  methods: {
    goback () {
      this.$router.push('/consultant/applicant-profile')
    },

    switchSessionView (type) {
      this.sessionViewType = type
    },

    handleEventClick: function (info) {
      console.log(info.event)
      this.modalSessionEvent = true
      this.modalSessionEventData = info.event.extendedProps
    },

    // handleEvents(events) {
    //   this.currentEvents = events
    // },

    async fetchStates (country_id) {
      try {
        const res_states = await GeneralSettingsAPI.get_states(country_id)
        this.option_states = res_states.data
        // this.mapDropDownToModel();
      } catch (error) {
        console.log(error)
      }
    },

    async getExamCenters (state) {
      try {
        const response = await ExamAPI.getExamCentersByState(state)
        this.exam_centers = response.data
        this.overlay_show = false
      } catch (error) {
        console.log(error)
      }
    },

    async getExamListDetails () {
      if (
        this.selected_state.SETTING_GENERAL_ID &&
        this.selected_center.ID &&
        this.date_start_from
      ) {
        try {
          this.overlay_show = true
          const response = await ExamAPI.getExamListsByCenterAndDate(
            this.selected_state.SETTING_GENERAL_ID,
            this.selected_center.ID,
            this.date_start_from,
          )
          this.exam_sessions = response.data

          this.calendarOptions.events = []
          this.calendarOptions.events = response.data
          this.overlay_show = false
        } catch (error) {
          console.log(error)
        }
      }
    },

    onStateSelected (state, id) {
      this.overlay_show = true
      // console.log("State:",state.SETTING_GENERAL_ID);
      this.selected_state = state
      this.selected_center = null
      this.exam_centers = []
      this.exam_sessions = []
      this.getExamCenters(state.SETTING_GENERAL_ID)
    },

    onCenterSelected (center, id) {
      // console.log("Center:", center.ID);
      this.selected_center = center
      this.exam_sessions = []
      this.getExamListDetails()
      // this.getExamListPreference();
    },

    isDatePicked (selected_date) {
      this.calendar_selected = selected_date
      this.date_start_from = moment(this.calendar_selected).format(
        'YYYY-MM-DD',
      )

      this.getExamListDetails()
    },

    setSelectedExamSession (data) {
      if (this.selected_sessions.length >= 1) {
        alert('You cannnot reschedule more than 1 Sesions')
        return
      };

      if (this.selected_sessions.some(el => el.EXAM_SESSION_DETAIL_ID == data.item.EXAM_SESSION_DETAIL_ID)) {
        alert('You cannnot reschedule same session two times')
        return
      }

      if (!moment(data.item.CSL_DATE).isBefore(moment())) {
        alert('No reshedule is allowed')
        return
      }

      this.selected_sessions.push(data.item)
    },

    setSelectedExamSessionFromCalender (data) {
      if (this.selected_sessions.length >= 1) {
        alert('You cannnot reschedule more than 1 Sesions')
        return
      };

      if (this.selected_sessions.some(el => el.EXAM_SESSION_DETAIL_ID == data.EXAM_SESSION_DETAIL_ID)) {
        alert('You cannnot reschedule same session two times')
        return
      }

      if (data.DATE > data.CSL_DATE) {
        alert('No reshedule is allowed')
        return
      }

      this.selected_sessions.push(data)
      this.modalSessionEvent = false
    },

    removeSelectedExamSession (data) {
      if (confirm('Do you really want to remove this exam session?')) {
        const index = this.selected_sessions.findIndex(
          el => el.EXAM_SESSION_DETAIL_ID === data.item.EXAM_SESSION_DETAIL_ID,
        )

        if (data.item.CONSULTANT_BOOKED_EXAM_SESSION_ID) {
          this.selected_sessions.splice(index, 1)
          ExamAPI
            .delete_booked_exams_sessions(data.item.CONSULTANT_BOOKED_EXAM_SESSION_ID)
            .then((response) => {
              Vue.$toast.open({
                message: 'Sesssions successfully removed.',
                type: 'success',
                position: 'bottom-right',
              })
            })
        } else {
          this.selected_sessions.splice(index, 1)
          Vue.$toast.open({
            message: 'Sesssions successfully removed.',
            type: 'success',
            position: 'bottom-right',
          })
        }
      }
    },

    async rescheduleExamSessions (action, confirm_text) {
      if (this.selected_sessions.length > 0) {
        if (confirm(confirm_text)) {
          this.overlay_show = true
          const data = new FormData()
          data.append('BOOKED_EXAM_SESSIONS', JSON.stringify(this.selected_sessions))
          data.append('CONSULTANT_ID', this.savedConsultantData.CONSULTANT_ID)
          data.append('CONSULTANT_LICENSE_ID', this.savedConsultantLicenseData.CONSULTANT_LICENSE_ID)
          data.append('EXAM_TYPE', this.savedConsultantLicenseData.CONSULTANT_TYPE_ID)
          if (action == 'draft') {
            data.append('BOOKING_CONFIRMATION_STATUS', 1) // Draft
          } else if (action == 'confirm') {
            data.append('BOOKING_CONFIRMATION_STATUS', 3) // Confirmed
          }
          data.append('BOOKING_TYPE', 6) // Reschedule (consultant_management=CONSULTANT_APPLICATION_TYPES TABLE)
          await ExamAPI.saveConsultantBookedSessions(data)
            .then((response) => {
              Vue.$toast.open({
                message: response.message,
                type: 'success',
                position: 'bottom-right',
              })
              this.fetchStates(33) // 33 = Country Id of Malaysia
              this.getConfirmedExamSessions()
              this.getExamSessions()
              this.overlay_show = false
            })
        }
      } else {
        alert('Please select sessions to submit')
      }
    },

    convertToDateTimeObject (value) {
      const date_time = moment(value, 'DD/MM/YYYY hh:mm:ss')
      const session_time = {
        date: date_time.format('hh:mm:ss a'),
        time: date_time.format('DD/MM/YYYY'),
        day: date_time.format('dddd'),
      }
      return session_time
    },

    async getExamSessions () {
      try {
        const authUser = await AuthenticatedUserAPI.me()
        // this.consultant_id = authUser.data.user.CONSULTANT_ID;
        this.getBookedExamLists(
          this.savedConsultantData.CONSULTANT_ID,
        )
      } catch (error) {
        console.log(error)
      }
    },

    getBookedExamLists (consult_id) {
      ExamAPI
        .get_booked_exams_sessions(consult_id, 6) // Reschedule (consultant_management=CONSULTANT_APPLICATION_TYPES TABLE)
        .then((response) => {
          this.selected_sessions = []
          this.selected_sessions = response.data
          this.overlay_show = false
        })
    },

    getConfirmedExamSessions () {
      ExamAPI
        .get_confirmed_exam_sessions(this.savedConsultantData.CONSULTANT_ID, 6) // Reschedule (consultant_management=CONSULTANT_APPLICATION_TYPES TABLE)
        .then((response) => {
          this.confirmed_exam_sessions = []
          this.confirmed_exam_sessions = response.data
        })
    },
  },

  created () {
    this.savedConsultantData = JSON.parse(localStorage.getItem('savedConsultantData'))
    if (this.savedConsultantData) {
      this.savedConsultantLicenseData = this.savedConsultantData.license
    }

    this.fetchStates(33) // 33 = Country Id of Malaysia
    this.getConfirmedExamSessions()
    this.getExamSessions()
  },
}
</script>

<style lang="scss">
.table thead th {
  font-weight: bold;
  font-size: 1rem;
}

.min-500 {
  min-height: 500px;
}
</style>

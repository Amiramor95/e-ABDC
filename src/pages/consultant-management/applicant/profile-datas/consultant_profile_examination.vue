<template>
  <div>
    <b-overlay :show="overlay_show" rounded="sm">
      <div class="mt-5 no-shadow">
        <h5 class="mb-4">Exam Sessions</h5>

        <div class="row">
          <div class="col-md-4">
            <b-form-group label="State:" label-for="exam-state" description="">
              <multiselect
                id="exam-state"
                v-model="selected_state"
                :options="states"
                placeholder="Select a state"
                @select="onStateSelected"
                :disabled="true"
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
                track-by="siteid"
                label="sitename"
                placeholder="Select one"
                @select="onCenterSelected"
                :disabled="true"
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
                :disabled="true"
              ></datepicker>
            </b-form-group>
          </div>
        </div>
        
        <div class="row min-500">
            <!-- Selected sessions tabled -->
            <div class="col-md-12 mt-2">
                <div class="">Booked Exam Sessions:</div>
                
                <b-table
                    bordered
                    outlined
                    hover
                    :items="selected_sessions"
                    :fields="fields"
                    show-empty
                    head-variant="light"
                    sticky-header
                >
                <template #empty="data">
                    <span>No record available.</span>
                </template>
                <!-- index column -->
                <template #cell(index)="data">
                    {{ data.index + 1 }}
                </template>

                <!-- date column -->
                <template #cell(date)="data">
                    {{data.item.date}}
                    <!-- {{ convertToDateTimeObject(data.item.timeopen).date }} -->
                </template>

                <!-- date column -->
                <template #cell(time)="data">
                    {{data.item.time}}
                    <!-- {{ convertToDateTimeObject(data.item.timeopen).time }} -->
                </template>

                <!-- date column -->
                <template #cell(day)="data">
                    {{data.item.day}}
                    <!-- {{ convertToDateTimeObject(data.item.timeopen).day }} -->
                </template>

                <!-- date column -->
                <!-- <template #cell(action)="data">
                    <a
                        @click="removeSelectedExamSession(data)"
                        style="margin:0; font-size:20px"
                    >
                        <span class="badge badge-danger mr-1">
                        <i class="fa fa-minus"></i>
                        </span>
                    </a>
                </template> -->
                </b-table>
            </div>
        </div>
      </div>
    </b-overlay>
  </div>
</template>
<script>
import Vue from "vue";
import moment from "moment";
import * as ExamAPI from "../../../../modules/consultant-management/services/exam";
import * as AuthenticatedUserAPI from "../../../../modules/consultant-management/services/auth";

export default {
  props: {
    savedConsultantData: Object,
    savedConsultantExamData: {
      type: Array,
    },
  },
  data() {
    return {
      states: [],
      selected_state: null,
      exam_centers: [],
      selected_center: null,
      overlay_show: true,
      // Note `isActive` is left out and will not appear in the rendered table
      fields: [
        { key: "index", class: "text-center" },
        { key: "date", label: "Exam Date", class: "text-center" },
        { key: "time", label: "Session Time", class: "text-center" },
        { key: "day", label: "Day", class: "text-center" },
        { key: "centreName", label: "Centre Name", class: "text-center" },
        { key: "centreLocation", label: "Centre Location", class: "text-center" },
        {
          key: "availableseat",
          label: "Available Seats",
          class: "text-center",
        },
        // { key: "action", label: "Action", class: "text-center" },
      ],
      //exam_sessions: [],
      exam_sessions: [
        {
          id: '1',
          sessionid: '232',
          siteid: 'ASLC',
          date: '23-7-2021',
          time: '9:00 am - 11:00 am',
          day: 'Friday',
          centreName: 'Alor Setar Learning Centre',
          centreLocation: 'Open University Malaysia (OUM), Alor Star, Kedah',
          availableseat: '25',
        },
        {
          id: '2',
          sessionid: '237',
          siteid: 'ASLC',
          date: '2-8-2021',
          time: '9:00 am - 11:00 am',
          day: 'Monday',
          centreName: 'Alor Setar Learning Centre',
          centreLocation: 'Open University Malaysia (OUM), Alor Star, Kedah',
          availableseat: '15',
        },
        {
          id: '3',
          sessionid: '238',
          siteid: 'ASLC',
          date: '2-8-2021',
          time: '9:00 am - 11:00 am',
          day: 'Monday',
          centreName: 'Alor Setar Learning Centre',
          centreLocation: 'Open University Malaysia (OUM), Alor Star, Kedah',
          availableseat: '8',
        },
        {
          id: '4',
          sessionid: '216',
          siteid: 'PSITCP0X',
          date: '15-7-2021',
          time: '9:00 am - 11:00 am',
          day: 'Thursday',
          centreName: 'Alor Setar Learning Centre',
          centreLocation: 'Open University Malaysia (OUM), Alor Setar, Kedah',
          availableseat: '2',
        },
        {
          id: '5',
          sessionid: '229',
          siteid: 'PSITCP0X',
          date: '16-7-2021',
          time: '9:00 am - 11:00 am',
          day: 'Friday',
          centreName: 'Alor Setar Learning Centre',
          centreLocation: 'Open University Malaysia (OUM), Alor Setar, Kedah',
          availableseat: '20',
        },
      ],
      calendar_selected: new Date(2021, 8, 15),
      date_start_from: new Date(),

      selected_sessions: [],
      model: {
        CONSULTANT_ID: '',
        CONSULTANT_LICENSE_ID: '',
      },
    };
  },
  methods: {
    async getExamStates() {
      try {
        const response = await ExamAPI.get_exams_states();
        console.log(response);
        this.states = response.data;
      } catch (error) {
        console.log(error);
      }
    },

    async getExamCenter(state) {
      try {
        const response = await ExamAPI.get_exams_center(state);
        console.log("Exam Centers:",response);
        this.exam_centers = response.data;
      } catch (error) {
        console.log(error);
      }
    },

    // async getExamListPreference() {
    //   if (
    //     this.model.CONSULTANT_LICENSE_ID &&
    //     this.selected_center &&
    //     this.date_start_from
    //   ) {
    //     try {
    //       const response = await ExamAPI.get_exams_preferences(
    //         this.model.CONSULTANT_LICENSE_ID,
    //         // this.selected_center.siteid,
    //         this.selected_center,
    //         this.date_start_from
    //       );
    //       console.log('Exam Sessions', response);
    //       this.exam_sessions = response.data;
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   }
    // },

    onCenterSelected(center, id) {
      console.log("Center:", center.siteid);
      this.selected_center = center.siteid;
      this.exam_sessions = [];
      this.getExamListPreference();
    },
    onStateSelected(state, id) {
      console.log("State:",state);
      this.selected_state = state;
      this.selected_center = null;
      this.exam_centers = [];
      this.exam_sessions = [];
      this.getExamCenter(state);
    },

    selectSession(session) {
      this.selected_sessions = _.unionBy(
        this.selected_sessions,
        [session],
        "sessionid"
      );

       //remove
       this.exam_sessions = _.reject(this.exam_sessions, {
        sessionid: session.sessionid,
      });
      // this.removeSession(session);
    },

    removeSession(session) {
      this.selected_sessions = _.reject(this.selected_sessions, {
        sessionid: session.sessionid,
      });

     this.exam_sessions = _.unionBy(
        this.exam_sessions,
        [session],
        "sessionid"
      );

    },

    setSelectedExamSession(data) {
      if (this.selected_sessions.length >= 3){
        alert('You cannnot book more than 3 Sesions');
        return;
      };

      this.selected_sessions.push(data.item);
    },

    removeSelectedExamSession(data) {
      if(confirm("Do you really want to remove this exam session?")){
        const index = this.selected_sessions.findIndex(
          el => el.sessionid === data.item.sessionid,
        );
        this.selected_sessions.splice(index, 1);

        ExamAPI
        .delete_booked_exams_sessions(data.item.id)
        .then(response=>{
          Vue.$toast.open({
              message: 'Sesssions successfully removed.',
              type: 'success',
              position: "bottom-right",
          });
        });
      }
    },

    isDatePicked(selected_date) {
      this.calendar_selected = selected_date;
      this.date_start_from = moment(this.calendar_selected).format(
        "DD/MM/YYYY"
      );

      this.getExamListPreference();
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
          this.model.CONSULTANT_ID
        );
      } catch (error) {
        console.log(error);
      }
    },

    getBookedExamLists(consult_id){
      ExamAPI
        .get_booked_exams_sessions(consult_id)
        .then(response=>{
          this.selected_sessions=response.data;
          this.overlay_show = false;
        });
    },
  },

  created() {
    if(this.savedConsultantData){
      this.model = _.cloneDeep(this.savedConsultantData);
      console.log('Model clone Deep Examination Datas', this.model);
    }
    //this.getExamStates();
    //this.getExamCenter();
    this.getExamSessions();
  },

  mounted(){
    // this.onStateSelected("Kedah");
    // this.onCenterSelected("ASLC");
  }
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
</style>

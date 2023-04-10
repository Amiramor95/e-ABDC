<template>
  <div>
    <!-- Approved exam sessions table -->
    <div
      class="booked-exam-sessions"
      v-if="aproved_sessions && aproved_sessions.length >= 1"
    >
      <div class="mb-2">Approved Exam Session:</div>

      <b-table
        bordered
        outlined
        hover
        :items="aproved_sessions"
        :fields="fields.aproved_exam_sessions"
        show-empty
        head-variant="light"
        sticky-header
      >
        <template #empty="data">
          <span>No approved Exam Sessions.</span>
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
          <a
            :href="data.item.GOOGLE_MAP_LINK"
            class="text-primary"
            target="_blank"
            >{{ data.item.GOOGLE_MAP_LINK }}</a
          >
        </template>

        <!-- Login Link column -->
        <template #cell(LOGIN_LINKS)="data">
          <a
            :href="data.item.LOGIN_LINKS"
            class="text-primary"
            target="_blank"
            >{{ data.item.LOGIN_LINKS }}</a
          >
        </template>
      </b-table>
    </div>

    <!-- Booked sessions table -->
    <div class="booked-exam-sessions" v-else>
      <div class="">Booked Exam Sessions:</div>

      <b-table
        bordered
        outlined
        hover
        :items="booked_sessions"
        :fields="fields.booked_exam_sessions"
        show-empty
        head-variant="light"
        sticky-header
      >
        <template #empty="data">
          <span>No Booked Sessions.</span>
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
          <a
            :href="data.item.GOOGLE_MAP_LINK"
            target="_blank"
            style="color: #007bff"
            >{{ data.item.GOOGLE_MAP_LINK }}</a
          >
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
    import * as services04module2 from '@/app/module2/services04'
    
    export default {
        props: {
            // The parameters the component accepts
            consultantData: Object,
        },

        data(){
            return{
                booked_sessions: [],
                aproved_sessions: [],

                fields: {
                    booked_exam_sessions: [
                        { key: 'index', class: 'text-center' },
                        { key: 'DATE', label: 'Exam Date', class: 'text-center' },
                        { key: 'EXAM_DAY', label: 'DAY', class: 'text-center' },
                        { key: 'SESSION_TIME', label: 'Session Time', class: 'text-center' },
                        { key: 'CENTER_MODE', label: 'Center Mode', class: 'text-center' },
                        { key: 'CENTRE_NAME', label: 'Centre Name', class: 'text-center' },
                        { key: 'GOOGLE_MAP_LINK', label: 'Centre Location', class: 'text-center' },
                    ],

                    aproved_exam_sessions: [
                        { key: 'index', class: 'text-center' },
                        { key: 'DATE', label: 'Exam Date', class: 'text-center' },
                        { key: 'EXAM_DAY', label: 'DAY', class: 'text-center' },
                        { key: 'SESSION_TIME', label: 'Session Time', class: 'text-center' },
                        { key: 'CENTER_MODE', label: 'Center Mode', class: 'text-center' },
                        { key: 'CENTRE_NAME', label: 'Centre Name', class: 'text-center' },
                        { key: 'GOOGLE_MAP_LINK', label: 'Centre Location', class: 'text-center' },
                        // {
                        //   key: "AVAILABLE_SEAT",
                        //   label: "Available Seats",
                        //   class: "text-center",
                        // },
                        { key: 'LOGIN_LINKS', label: 'Exam Link', class: 'text-center' },
                    ],
                },
            }
        },

        created(){
            if (this.consultantData) {
                this.getBookedExamSessions(this.consultantData.CONSULTANT_ID);
                this.getApprovedExamSession(this.consultantData.CONSULTANT_ID);
            }
        },

        methods: {
            async getBookedExamSessions (consultantId) {
                try {
                    if(this.consultantData.CONSULTANT_APPLICATION_TYPE){
                      var applicationType = this.consultantData.CONSULTANT_APPLICATION_TYPE;
                    }else{
                      var applicationType = 1 ; // Initial New Booking
                    }
                    
                    await services04module2.get_booked_exams_sessions(consultantId, applicationType)
                    .then((response) => {
                        this.booked_sessions = []
                        this.booked_sessions = response.data
                    })
                } catch (error) {
                    console.log(error)
                }
            },

            async getApprovedExamSession (consultantId) {
                try {
                    await services04module2.get_approved_exams_sessions(consultantId)
                    .then((response) => {
                        this.aproved_sessions = []
                        this.aproved_sessions = response.data
                    })
                } catch (error) {
                    console.log(error)
                }
            },
        }
    };
</script>

<style>
</style>
<template>
  <div>
    <va-card>
      <div class="row">
        <h4 slot="header" class="card-title">View Participant Details Module</h4>
      </div>
      <div class="ml-1 col-md-12">
        <table class="table table-striped"></table>
        <table class="table table-striped">
          <tbody>
            <tr>
              <td style="width: 15%"><b>Name </b></td>
              <td style="width: 1%">:</td>
              <td>
                <span v-if="consultant">{{ consultant.CONSULTANT_NAME }}</span>
              </td>
              <td style="width: 15%"><b>FiMM No </b></td>
              <td style="width: 1%">:</td>
              <td>
                <span v-if="consultant">{{ consultant.CONSULTANT_FIMM_NO }}</span>
              </td>
            </tr>
            <tr>
              <td style="width: 15%"><b>Company Name </b></td>
              <td style="width: 1%">:</td>
              <td>
                <span v-if="consultant">{{ consultant.DISTRIBUTOR.DIST_NAME }}</span>
              </td>
              <td style="width: 15%"><b>Cumulative Point </b></td>
              <td style="width: 1%">:</td>
              <td>{{ cumulativePoint }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </va-card>
    <br />
    <va-card>
      <div class="ml-2 col-md-12">
        Activity
        <hr />
        <div v-show="!dataReady">
          <div class="text-center text-danger my-2">
                <b-spinner class="align-middle"></b-spinner>
                <strong>Loading...</strong>
            </div>
        </div>
        <br />
        <va-data-table
          :fields="ParticipantFields"
          :data="ActivityFilteredData"
          no-data-label="No data found"
          :per-page="parseInt(perPage)"
          :datacount="ActivityRecordCount"
          :dataperpage="parseInt(perPage)"
          clickable
        >
          <template slot="no" slot-scope="row">
            {{ row.rowIndex + 1 }}
          </template>
          <template slot="DATE_EVENT" slot-scope="props">
            {{ props.rowData.DATE_EVENT }}
          </template>

        </va-data-table>
          <br/>
          <br/>
          <button @click="back" type="button" class="btn btn-primary btn-fill btn-md">
            <i class="fa fa-step-backward" /> &nbsp; Previous
          </button>
      </div>
    </va-card>
  </div>
</template>

<script>
  import * as services02Module4 from "../../../../../app/module4/services02";
  export default {
    mounted() {
      this.getParticipantData()
    },
    methods: {
      async back() {
        this.$router.go(-1);
      },
      getParticipantData: async function() {
        let programType = null
        let passportNo = null
        let nricNo = null
        if(this.$route.query) {
          programType = this.$route.query.programType
          passportNo = this.$route.query.passportNo
          nricNo = this.$route.query.nric
        }
        const res = await services02Module4.getParticipantDetails(programType, passportNo, nricNo)
        this.consultant = res.data.consultant
        this.cumulativePoint = res.data.cumulative_point
        this.activityList = res.data.activity_lists
        this.dataReady = true
      },
    },
    computed: {
      ParticipantFields() {
        return [
          {
            name: "__slot:no",
            title: "NO",
          },
          {
            name: "__slot:DATE_EVENT",
            title: "DATE OF EVENT DATE",
            dataClass: "justify-content-center",
            width: "8%",
          },
          {
            name: "TITLE",
            title: "DESCRIPTION OF ACTIVITY",
          },
          {
            name: "STATUS_DESCRIPTION",
            title: "STATUS",
          },
          {
            name: "APPROVE_DATE",
            title: "APPROVED DATE",
          },
          {
            name: "APPROVE_BY",
            title: "TITLE",
          },
          {
            name: "PENDING_POINT",
            title: "PENDING POINT",
          },
          {
            name: "DEDUCTION_POINT",
            title: "DEDUCTION POINT",
          },
          {
            name: "CPD_POINT",
            title: "CPD POINT",
          }
        ];
      },
      ActivityFilteredData() {
        this.ActivityRecordCount = this.activityList.length;
        return this.activityList;
      }
    },
    data() {
      return {
        consultant: null,
        cumulativePoint: 0,
        activityList: [],
        ActivityRecordCount: 0,
        perPage: "10",
        dataReady: false,
      }
    },
  }
</script>

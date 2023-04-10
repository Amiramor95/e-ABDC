<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">Candidate Session List (CSL)</h4>
      <br />
    </div>
    <vudal name="simpleModal" class="widthModal">
      <div class="header">
        Copied<i class="close icon">&times;</i>
      </div>
      <div class="content">
        <h5>
          <vue-form-generator
            :model="model"
            :schema="descriptionSchema"
            :options="formOptions"
          />
        </h5>
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
    <br />
    <va-card>
      <div class="ml-3 col-md-12">
        <table class="table table-striped">
          <tbody>
            <tr>
              <td style="width: 15%">Centre Name</td>
              <td>:&nbsp;&nbsp;&nbsp;&nbsp;{{centreName}}</td>
            </tr>
            <tr>
              <td>Date</td>
              <td>:&nbsp;&nbsp;&nbsp;&nbsp;{{date}}</td>
            </tr>
            <tr>
              <td>Time</td>
              <td>:&nbsp;&nbsp;&nbsp;&nbsp;{{time}}</td>
            </tr>
            <tr>
              <td>CSL ID</td>
              <td>:&nbsp;&nbsp;&nbsp;&nbsp;{{cslId}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </va-card>

    <!-- list table-->
    <va-card class="mt-5 col-12">
      <va-data-table
        :fields="RecordFields"
        :data="RecordFilteredData"
        no-data-label="No data found"
        :per-page="parseInt(perPage)"
        :dataperpage="parseInt(perPage)"
        :datacount="RecordCount"
        clickable
      >
        <template slot="no" slot-scope="row">
          {{ row.rowIndex + 1 }}
        </template>
      </va-data-table>

      <br />
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
          v-if="isCslExpired"
          @click="copyExamNo"
          type="button"
          class="btn btn-success btn-fill btn-md mr-2"
          style="background-color:#ef7d2f;color:black;"
        >&nbsp; <b>COPY EXAM NO</b>
        </button>
        <button
          v-if="isCslExpired"
          @click="exportExcel"
          type="button"
          class="btn btn-secondary btn-fill btn-md"
        >
          <i class="fa fa fa-download"/> &nbsp; Download
        </button>
      </div>
    </va-card>
  </va-card>
</template>

<script>
import * as examSessionManagementServices from '../../../app/module0/exam-booking/examSessionManagementServices'
import moment from 'moment'
import Vudal from 'vudal'

export default {
  mounted () {
    this.getAllRecord()
  },
  components: { Vudal },

  methods: {
    // back button
    back () {
      this.$router.go(-1)
    },
    async copyExamNo () {
      if (this.RecordCount > 0) {
        try {
          const examNo = this.RecordList.map(record => record.EXAM_NO).join(',')
          await navigator.clipboard.writeText(examNo)
          this.model.description = examNo
          this.$modals.simpleModal.$show()
        } catch ($e) {
          console.log($e)
        }
      }
    },
    async exportExcel () {
      await examSessionManagementServices.exportCandidateSessionList(
        { SESSION_DETAILS_ID: localStorage.getItem('EXAM_SESSION_DETAILS_ID') })
      await examSessionManagementServices.exportCandidateSessionListPDF(
        { SESSION_DETAILS_ID: localStorage.getItem('EXAM_SESSION_DETAILS_ID') })
    },
    // getAllRecord
    getAllRecord: async function () {
      this.RecordList = await examSessionManagementServices.listCandidateSession(
        { SESSION_DETAILS_ID: localStorage.getItem('EXAM_SESSION_DETAILS_ID') })
      this.RecordCount = this.RecordList.length
      if (this.RecordCount > 0) {
        this.centreName = this.RecordList[0].CENTRE_NAME
        this.date = this.RecordList[0].DATE
        this.time = this.RecordList[0].TIME
        this.cslId = this.RecordList[0].CSL_ID
        this.isCslExpired = moment(this.RecordList[0].CSL_DATE).isBefore(moment())
        if (!this.isCslExpired) {
          this.$router.go(-1)
        }
      }
    },
  },

  computed: {
    RecordFields () {
      return [
        {
          name: '__slot:no',
          title: 'NO',
        },
        {
          name: 'DISTRIBUTOR_NAME',
          title: 'DISTRIBUTOR NAME',
        },
        {
          name: 'EXAM_TYPE',
          title: 'EXAM TYPE',
        },
        {
          name: 'CANDIDATE_NAME',
          title: 'CANDIDATE NAME',
        },
        {
          name: 'NRIC_NO',
          title: 'NRIC NO',
        },
        {
          name: 'PASSPORT_NO',
          title: 'PASSPORT NO',
        },
        {
          name: 'PHONE_NUMBER',
          title: 'PHONE NUMBER',
        },
        {
          name: 'EMAIL',
          title: 'EMAIL',
        },
        {
          name: 'LANGUAGE',
          title: 'LANGUAGE',
        }, {
          name: 'LOGIN_LINKS',
          title: 'LOGIN LINKS',
        },
        {
          name: 'EXAM_NO',
          title: 'EXAM NO',
        },
        {
          name: 'EXAM_NO_STATUS',
          title: 'EXAM NO STATUS',
        },
        {
          name: 'ATTENDANCE',
          title: 'ATTENDANCE',
        },
      ]
    },

    // eslint-disable-next-line vue/return-in-computed-property
    RecordFilteredData () {
      if (!this.term || this.term.length < 1) {
        return this.RecordList
      }

      return this.RecordList.filter((item) => {
        return this.term

          .split(' ')
          .every(
            // (v) =>
          )
      })
    },
  },

  data () {
    return {
      header: '',
      field: [],
      term: null,
      perPage: '10',
      perPageOptions: ['50', '100', '150', '200'],
      currentPage: 1,
      RecordList: [],
      items: [],
      filters: [],
      count: 1,
      RecordCount: null,
      centreName: '',
      date: '',
      time: '',
      cslId: '',
      isCslExpired: false,
      model: {
        description: '',
      },
      descriptionSchema: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'textArea',
                model: 'description',
                rows: 2,
                validator: 'string',
                styleClasses: 'col-md-12',
                readonly: true,
              },
            ],
          },
        ],
      },

      formOptions: {
        validateAfterChanged: true,
      },
    }
  },
}
</script>
<style lang="css">
.va-data-table__pagination {
  margin-top: 1rem;
  display: -webkit-box;
  display: -ms-flexbox;
  display: inherit;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: flex-end;
}

</style>

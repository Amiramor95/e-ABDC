<template>
  <va-inner-loading :loading="statusLoad">
    <va-card>
      <div class="row">
        <h4 class="card-title" slot="header">Exam Session Generated</h4>
      </div>

      <!-- list table-->
      <va-card class="mt-5 col-12">
        <va-data-table
          :data="RecordFilteredData"
          :datacount="RecordCount"
          :dataperpage="parseInt(perPage)"
          :fields="RecordFields"
          :per-page="parseInt(perPage)"
          clickable
          no-data-label="No data found"
        >
          <template slot="no" slot-scope="row">
            {{ row.rowIndex + 1 }}
          </template>

          <template slot="actions" slot-scope="props">
            <span
              v-b-tooltip.hover
              title="View List of Exam Session Generated"
              class="badge badge-primary mr-2"
              v-on:click="viewRecord(props.rowData)"
            >
              <i class="fa fa-eye"></i
              ></span>
          </template>
        </va-data-table>
      </va-card>
    </va-card>
  </va-inner-loading>
</template>

<script>
import 'vue-form-generator/dist/vfg.css'
import * as examSessionManagementServices from '../../../app/module0/exam-booking/examSessionManagementServices'

export default {
  mounted () {
    this.getAllRecord()
  },
  components: {},

  methods: {
    // getAllRecord
    getAllRecord: async function () {
      this.RecordList = await examSessionManagementServices.listApprovedExamSessionGeneratedByUserId(
        {
          USER_ID: JSON.parse(localStorage.getItem('user')).user_id,
        },
      )
      this.RecordCount = this.RecordList.length
      this.statusLoad = false
    },
    async viewRecord (data) {
      localStorage.setItem('SESSION_ID', data.ID)
      localStorage.setItem('DATE_GENERATED', data.DATE_GENERATED)
      localStorage.setItem('CENTRE_NAME', data.CENTRE_NAME)
      localStorage.setItem('APPROVAL_STATUS', data.APPROVAL_STATUS)
      localStorage.setItem('SESSION_END_DATE', data.END_DATE)
      localStorage.setItem('FREQUENCY', data.FREQUENCY)
      await this.$router.push({ name: 'list-exam-session-generation-esc' })
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
          name: 'CENTRE_NAME',
          title: 'CENTRE NAME',
        },
        {
          name: 'BATCH_NO',
          title: 'BATCH NO',
          sortField: 'BATCH_NO',
        },
        {
          name: 'DATE_GENERATED',
          title: 'DATE GENERATED',
          sortField: 'DATE_GENERATED',
        },
        {
          name: 'STATUS',
          title: 'STATUS',
          sortField: 'STATUS',
        },
        {
          name: 'APPROVAL_STATUS',
          title: 'APPROVAL STATUS',
          sortField: 'APPROVAL_STATUS',
        },
        {
          name: '__slot:actions',
          title: 'ACTIONS',
          dataClass: 'justify-content-center',
          width: '8%',
        },
      ]
    },

    RecordFilteredData () {
      if (!this.term || this.term.length < 1) {
        return this.RecordList
      }
    },
  },

  data () {
    return {
      term: '',
      statusLoad: true,
      header: '',
      perPage: '10',
      currentPage: 1,
      count: 1,
      RecordCount: null,
      RecordList: [],
    }
  },
}
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

</style>

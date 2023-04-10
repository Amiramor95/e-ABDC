<template>
  <va-inner-loading :loading="statusLoad">
    <va-card>
      <div class="row">
        <h4 class="card-title" slot="header">Centre Based Exam Session Generated</h4>
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
              title="View List of Centre Based Exam Session Batch"
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
      this.RecordList = await examSessionManagementServices.listCentreBasedExamSessionGenerated()
      this.RecordCount = this.RecordList.length
      this.statusLoad = false
    },
    async viewRecord (data) {
      localStorage.setItem('SESSION_BATCH_CENTRE_ID', data.CENTRE_ID)
      await this.$router.push({ name: 'exam-session-generation-approver' })
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
          sortField: 'CENTRE_NAME',
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

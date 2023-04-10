<template>
  <va-inner-loading :loading="statusLoad">
    <va-card>
      <div class="row">
        <h4 class="card-title" slot="header">List of Consultant Appeal Review</h4>
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
            <h5 class="mt-1">
              <span
                v-b-tooltip.hover
                title="Edit Appeal"
                v-if="props.rowData.STATUS === 'PENDING'"
                @click="editRecord(props.rowData)"
                class="badge badge-primary mr-2"
              >
                <i class="fa fa-edit"></i
                ></span>
            </h5>
          </template>
        </va-data-table>
        <br />
        <br />
        <br />
        <button
          @click="back"
          class="btn btn-primary btn-fill btn-md"
          type="button"
        >
          <i class="fa fa-step-backward" /> &nbsp; Previous
        </button>
      </va-card>
    </va-card>
  </va-inner-loading>
</template>

<script>
import 'vue-form-generator/dist/vfg.css'
import * as resultManagementServices from '../../../app/module0/exam-booking/resultManagementServices'

export default {
  mounted () {
    this.getAllRecord()
  },

  components: {},

  methods: {
    submit () {},
    back () {
      this.$router.go(-1)
    }, // back button

    // getAllRecord
    getAllRecord: async function () {
      const user = localStorage.getItem('user')
      this.RecordList = await resultManagementServices.listExamAppeal(
        { APPR_GROUP_ID: JSON.parse(user).USER_GROUP_ID })
      this.RecordCount = this.RecordList.length
      this.statusLoad = false
    },
    editRecord (data) {
      localStorage.setItem(
        'edit-exam-appeal', JSON.stringify(data))
      this.$router.push({ name: 'edit-consultant-appeal-review' })
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
          name: 'SUBMISSION_DATE',
          title: 'SUBMISSION DATE',
        },
        {
          name: 'NAME',
          title: 'NAME',
        },
        {
          name: 'NRIC_NO',
          title: 'NRIC NO.',
        },
        {
          name: 'PASSPORT_NUMBER',
          title: 'PASSPORT NO.',
        },
        {
          name: 'EXAM_NO',
          title: 'EXAM NO',
        },
        {
          name: 'ATTENDANCE',
          title: 'ATTENDANCE',
        },
        {
          name: 'RESULT',
          title: 'RESULT',
        },
        {
          name: 'SCORE',
          title: 'SCORE',
        },
        {
          name: 'FINAL_RESULT',
          title: 'FINAL RESULT',
        },
        {
          name: 'APPEAL_TYPE',
          title: 'APPEAL TYPE',
        },
        {
          name: 'STATUS',
          title: 'STATUS',
        },
        {
          name: '__slot:actions',
          title: 'ACTION',
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
      statusLoad: true,
      header: '',
      field: [],
      term: null,
      perPage: '10',
      currentPage: 1,
      count: 1,
      RecordCount: null,
      RecordList: [],

      model: {
        modelFilter: {},
      },

      formOptions: {
        validateAfterChanged: true,
      },
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

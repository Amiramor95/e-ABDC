<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">Exam Result for Approval</h4>
      <br />
    </div>
    <br />
    <va-card>
      <div class="ml-3 col-md-12">
        <table class="table table-striped">
          <tbody>
            <tr>
              <td style="width: 15%">EXAM SESSION NO</td>
              <td>:&nbsp;&nbsp;&nbsp;&nbsp;{{resultDetails.EXAM_NO}}</td>
            </tr>
            <tr>
              <td>EXAM CENTRE NAME</td>
              <td>:&nbsp;&nbsp;&nbsp;&nbsp;{{resultDetails.EXAM_CENTRE_NAME}}</td>
            </tr>
            <!--            <tr>-->
            <!--              <td style="width: 15%">EXAM NAME</td>-->
            <!--              <td>:&nbsp;&nbsp;&nbsp;&nbsp;{{resultDetails.EXAM_NAME}}</td>-->
            <!--            </tr>-->
            <tr>
              <td>SESSION DATE</td>
              <td>:&nbsp;&nbsp;&nbsp;&nbsp;{{resultDetails.DATE}}</td>
            </tr>
            <tr>
              <td>TIME</td>
              <td>:&nbsp;&nbsp;&nbsp;&nbsp;{{resultDetails.START_TIME}} - {{resultDetails.END_TIME}}</td>
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
        <template slot="FINAL_RESULT" slot-scope="props" >
          <h5 class="mt-1">
            <select style="width:90px"
              :csl="[props.rowData.CSL_ID]"
              class="form-control final-result"
              @change="isValueChanged(props)"
              required>
              <option disabled selected value=""></option>
              <option value="1" :selected="props.rowData.RESULT === 'PASS'">PASS</option>
              <option value="0" :selected="props.rowData.RESULT === 'FAIL'">FAIL</option>
              <option hidden>{{props.rowData.CSL_ID}}</option>
            </select>
          </h5>
        </template>
        <template slot="REMARKS" slot-scope="props">
          <textarea placeholder="Remarks" :csl="[props.rowData.CSL_ID]" ref="regForm"
            class="form-control remarks" required :value="[props.rowData.REMARKS]"></textarea>
        </template>
        <template slot="actions" slot-scope="props">
          <h5 class="mt-1">
            <span
              v-b-tooltip.hover
              title="Edit Result Approval"
              v-on:click="editRecord(props.rowData)"
              v-if="props.rowData.STATUS === 'PENDING'"
              class="badge badge-primary mr-2"
            >
              <i class="fa fa-edit"></i></span>
            <span
              v-b-tooltip.hover
              title="View Exam Result"
              v-on:click="viewRecord(props.rowData)"
              class="badge badge-primary mr-2"
            >
              <i class="fa fa-eye"></i
              ></span>
          </h5>
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
          @click="saveAsDraft"
          type="button"
          style="background-color:#1dc3f5"
          class="mr-2 btn btn-info btn-fill btn-md"
        >
          <i class="fa fa-pencil-square-o" /> &nbsp; Save as draft
        </button>
        <button
          @click="submit"
          type="button"
          class="ml-1 btn btn-success btn-fill btn-md"
        >
          <i class="fa fa-paper-plane"/> &nbsp; Approve
        </button>
      </div>
    </va-card>
  </va-card>
</template>

<script>
import 'vue-form-generator/dist/vfg.css'
import * as resultManagementServices from '../../../app/module0/exam-booking/resultManagementServices'
import { TaskStatusConstants } from '@/app/constants/TaskStatusConstants'
import * as services06Module0 from '@/app/module0/services06'
import { ApprovalLevelConstants } from '@/app/constants/ApprovalLevelConstants'
import * as examBookingServices from '@/app/module0/examBookingServices'

export default {
  mounted () {
    this.resultDetails = JSON.parse(localStorage.getItem('edit-exam-result'))
    this.getAllRecord()
  },
  components: {},

  methods: {
    // back button
    back () {
      this.$router.go(-1)
    },
    async viewRecord (data) {
      localStorage.setItem(
        'edit-exam-result-approval', JSON.stringify(data))
      this.$router.push({
        name: 'view-exam-result-for-approval',
      })
    },

    async editRecord (data) {
      localStorage.setItem(
        'edit-exam-result-approval', JSON.stringify(data))
      this.$router.push({
        name: 'edit-exam-result-for-approval',
      })
    },
    isValueChanged (data) {
      const finalResults = document.querySelectorAll('select.final-result')
      for (let index = 0; index < finalResults.length; index++) {
        const cslId = finalResults[index].getAttribute('csl')
        if (cslId === String(data.rowData.CSL_ID)) {
          const result = (finalResults[index].value == 0 ? 'PASS' : 'FAIL')
          if (data.rowData.RESULT === result) {
            const findSpan = document.querySelector('.value-changed-' + cslId)
            if (findSpan === null) {
              const span = document.createElement('span')
              span.textContent = 'Value Changed'
              span.style.fontSize = '12px'
              span.style.fontStyle = 'italic'
              span.style.color = 'crimson'
              span.classList.add('value-changed-' + cslId)
              finalResults[index].parentNode.insertBefore(span, finalResults[index].nextSibling)
            }
          } else {
            const findSpan = document.querySelector('.value-changed-' + cslId)
            if (findSpan) {
              findSpan.parentNode.removeChild(findSpan)
            }
          }
        }
      }
      this.validateTextAreaIfChanged()
    },
    validateRegisterForm () {
      return this.$refs.regForm.validate()
    },
    getDatas () {
      this.data = []
      const finalResults = document.querySelectorAll('select.final-result')
      const remarks = document.querySelectorAll('textarea.remarks')
      for (let index = 0; index < finalResults.length; index++) {
        const cslId = finalResults[index].getAttribute('csl')
        const cslId1 = remarks[index].getAttribute('csl')
        if (cslId === cslId1) {
          const finalResult = finalResults[index].value !== ''
            ? finalResults[index].value
            : finalResults[0].parentElement.parentElement.previousElementSibling.previousElementSibling.textContent
          this.data.push(
            { csl_id: cslId, remarks: remarks[index].value, result: finalResult },
          )
        }
      }
    },
    validateTextAreaIfChanged () {
      this.validateTextAreas = []
      const textAreas = document.querySelectorAll('textarea.remarks')
      textAreas.forEach(textarea => {
        const isValueChangedSpan = textarea.parentNode.previousElementSibling.querySelector('span')
        if (isValueChangedSpan && !textarea.value.length) {
          const span = document.createElement('span')
          span.textContent = '*Please fill Remarks.'
          span.style.fontSize = '12px'
          span.style.fontStyle = 'italic'
          span.style.color = 'crimson'
          textarea.parentNode.insertBefore(span, textarea.nextSibling)
          this.validateTextAreas.push(1)
        } else {
          const findSpan = textarea.parentElement.querySelector('span')
          if (findSpan) {
            findSpan.parentNode.removeChild(findSpan)
          }
        }
      })
      if (this.validateTextAreas.length) {
        return false
      }
      return true
    },
    // getAllRecord
    getAllRecord: async function () {
      const response = await resultManagementServices.getExamResultForApproval({
        SESSION_DETAILS_ID: this.resultDetails.EXAM_SESSION_DETAILS_ID,
      })
      this.RecordList = response
      this.RecordCount = this.RecordList.length
    },
    submit: async function () {
      this.getDatas()
      console.log(this.data)
      if (this.validateTextAreaIfChanged()) {
        if (confirm('Are you sure you want to proceed this submission?')) {
          const data = new FormData()
          data.append('NEW_DATA', JSON.stringify(this.data))
          data.append('ID', this.resultDetails.EXAM_RESULT_ID)
          data.append('APPR_PUBLISH_STATUS', '1')
          data.append('TS_ID', String(TaskStatusConstants.APPROVED))

          const user = localStorage.getItem('user')
          data.append('LATEST_UPDATE_BY', JSON.parse(user).user_id)

          try {
            await resultManagementServices.approveExamResult(data)
            this.back()
          } catch (error) {
            console.log(error)
          }
        }
      }
    },
    saveAsDraft: async function () {
      this.getDatas()
      if (this.validateTextAreaIfChanged) {
        if (confirm('Are you sure you want to draft this submission?')) {
          const data = new FormData()
          data.append('NEW_DATA', JSON.stringify(this.data))
          data.append('ID', this.resultDetails.EXAM_RESULT_ID)
          data.append('APPR_PUBLISH_STATUS', String(TaskStatusConstants.PUBLISH_STATUS_DRAFT))
          data.append('TS_ID', String(TaskStatusConstants.DRAFT_GENERAL))

          const user = localStorage.getItem('user')
          data.append('LATEST_UPDATE_BY', JSON.parse(user).user_id)

          try {
            await resultManagementServices.saveAsDraftExamResult(data)
            this.back()
          } catch (error) {
            console.log(error)
          }
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
        { // DIST_TRANS_DATE
          name: 'CANDIDATE_NAME',
          title: 'CANDIDATE NAME',
        },
        {
          name: 'NRIC_NO',
          title: 'NRIC NO.',
        },
        {
          name: 'PASSPORT_NO',
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
          name: '__slot:FINAL_RESULT',
          title: 'FINAL RESULT',
        },
        {
          name: '__slot:REMARKS',
          title: 'REMARKS',
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
      return this.RecordList
    },
  },

  data () {
    return {
      validateTextAreas: [],
      data: [],
      result: '',
      resultDetails: '',
      header: '',
      field: [],
      term: null,
      perPage: '10',
      perPageOptions: ['50', '100', '150', '200'],
      currentPage: 1,
      RecordList: [],
      count: 1,
      RecordCount: null,
      model: {
        remark: '',

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

.content {
  margin-top: 30px;
  font-size: 20px;
}
.inline {
  display: inline-flex;
  float: right;
}
</style>

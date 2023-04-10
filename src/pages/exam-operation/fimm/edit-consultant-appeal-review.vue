<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">Exam Details</h4>
      <br/>
      <br/>
    </div>
    <br/>
    <va-card>
      <div class="col-md-12">
        <table class="table table-striped">
          <tbody>
            <tr>
              <td style="width: 40%">EXAM NAME</td>
              <td>:&nbsp;&nbsp;&nbsp;&nbsp;{{examName}}</td>
            </tr>
            <tr>
              <td>SESSION DATE</td>
              <td>:&nbsp;&nbsp;&nbsp;&nbsp;{{sessionDate}}</td>
            </tr>
            <tr>
              <td>TIME</td>
              <td>:&nbsp;&nbsp;&nbsp;&nbsp;{{time}}</td>
            </tr>
          </tbody>
        </table>
        </br>
        <table class="table table-striped">
          <tbody>
            <tr>
              <td style="width: 40%">CANDIDATE NAME</td>
              <td>:&nbsp;&nbsp;&nbsp;&nbsp;{{appealData.NAME}}</td>
            </tr>
            <tr>
              <td>NRIC NO.</td>
              <td>:&nbsp;&nbsp;&nbsp;&nbsp;{{appealData.NRIC_NO}}</td>
            </tr>
            <tr>
              <td>PASSPORT NO.</td>
              <td>:&nbsp;&nbsp;&nbsp;&nbsp;{{appealData.PASSPORT_NUMBER}}</td>
            </tr>
            <tr>
              <td>EXAM NO.</td>
              <td>:&nbsp;&nbsp;&nbsp;&nbsp;{{appealData.EXAM_NO}}</td>
            </tr>
            <tr>
              <td>ATTENDANCE</td>
              <td>:&nbsp;&nbsp;&nbsp;&nbsp;{{appealData.ATTENDANCE}}</td>
            </tr>
            <tr>
              <td>RESULT</td>
              <td>:&nbsp;&nbsp;&nbsp;&nbsp;{{appealData.RESULT}}</td>
            </tr>
            <tr>
              <td>SCORE</td>
              <td>:&nbsp;&nbsp;&nbsp;&nbsp;{{appealData.SCORE}}</td>
            </tr>
            <tr>
              <td>FINAL RESULT</td>
              <td>:&nbsp;&nbsp;&nbsp;&nbsp;{{appealData.FINAL_RESULT}}</td>
            </tr>
            <tr>
              <td>REMARK/COMMENTS</td>
              <td>:&nbsp;&nbsp;&nbsp;&nbsp;{{appealData.REASON ? appealData.REASON : '-'}}</td>
            </tr>
          </tbody>
        </table>
        <hr>
        <h5>Appeal Details</h5>
        </br>
        <table class="table table-striped">
          <tbody>
            <tr>
              <td style="width: 40%;">Appeal Type</td>
              <td>:&nbsp;&nbsp;&nbsp;&nbsp;{{appealData.APPEAL_TYPE}}</td>
            </tr>
            <tr>
              <td>Remark By Consultant</td>
              <td>:&nbsp;&nbsp;&nbsp;&nbsp;{{appealData.REMARK}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <br/>
    </va-card>
    <br/>
    <br/>
    <div>
      <vue-form-generator
        :model="model"
        :schema="remarkSchema"
        :options="formOptions"
        ref="statusForm"
      >
      </vue-form-generator>
    </div>
    <br/>
    <br/>
    <button
      @click="back"
      type="button"
      class="btn btn-primary btn-fill btn-md"
    >
      <i class="fa fa-step-backward"/> &nbsp; Previous
    </button>
    <div class="float-right">
      <button
        @click="reject"
        type="button"
        class="mr-2 btn btn-danger btn-fill btn-md"
      >
        <i class="fa fa-reply"/> &nbsp; Reject
      </button>
      <button
        type="submit"
        class="btn btn-success btn-fill float-right btn-md"
        @click.prevent="approve"
      >
        <i class="fa fa-paper-plane"/> &nbsp; Approve
      </button>
    </div>
  </va-card>
</template>

<script>
import 'vue-form-generator/dist/vfg.css'
import * as examSessionManagementServices from '@/app/module0/exam-booking/examSessionManagementServices'
import * as resultManagementServices from '@/app/module0/exam-booking/resultManagementServices'
import { TaskStatusConstants } from '@/app/constants/TaskStatusConstants'

export default {

  mounted () {
    const data = localStorage.getItem('edit-exam-appeal')
    this.appealData = JSON.parse(data)
    this.getSessionDetails(this.appealData.SESSION_DETAILS_ID)
  },
  methods: {
    approve: async function () {
      if (confirm('Are you sure you want to approve this submission?')) {
        const data = new FormData()
        data.append('EXAM_APPEAL_APPROVAL_ID', this.appealData.EXAM_APPEAL_APPROVAL_ID)
        data.append('APPR_PUBLISH_STATUS', '1')
        data.append('APPR_REMARK', this.model.REMARKS_COMMENTS)

        const user = localStorage.getItem('user')
        data.append('CREATE_BY', JSON.parse(user).user_id)

        try {
          await resultManagementServices.approveExamAppeal(data)
          this.back()
        } catch (error) {
          console.log(error)
        }
      }
    },
    reject: async function () {
      if (confirm('Are you sure you want to reject this submission?')) {
        const data = new FormData()
        data.append('EXAM_APPEAL_APPROVAL_ID', this.appealData.EXAM_APPEAL_APPROVAL_ID)
        data.append('APPR_PUBLISH_STATUS', '1')
        data.append('APPR_REMARK', this.model.REMARKS_COMMENTS)

        const user = localStorage.getItem('user')
        data.append('CREATE_BY', JSON.parse(user).user_id)
        try {
          await resultManagementServices.rejectExamAppeal(data)
          this.back()
        } catch (error) {
          console.log(error)
        }
      }
    },
    getSessionDetails (sessionDetailId) {
      this.sessionDetails = examSessionManagementServices.getGeneralExamSessionDetails(
        { SESSION_DETAILS_ID: sessionDetailId }).then(
        (data) => {
          this.examName = data.EXAM_NAME
          this.time = data.TIME
          this.sessionDate = data.DATE
        },
      )
    },
    back () {
      this.$router.push({
        name: 'list-consultant-appeal-review',
      })
    }, // back button
  },

  data () {
    return {
      appealData: '',
      sessionDetails: '',
      time: '',
      sessionDate: '',
      examName: '',
      header: '',
      field: [],
      term: null,
      model: {
        REMARKS_COMMENTS: '',
      },
      remarkSchema: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'textArea',
                required: false,
                rows: 8,
                max: 1000,
                hint: 'MAXIMUM CHARACTERS OF 1000',
                label: 'REMARKS / COMMENTS FOR APPEAL APPROVAL',
                model: 'REMARKS_COMMENTS',
                placeholder: 'ENTER REMARKS OR COMMENTS',
                styleClasses: 'col-md-12',
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

  .content {
    margin-top: 30px;
    font-size: 20px;
  }

  .inline {
    display: inline-flex;
    float: right;
  }

  .default-tabs {
    position: relative;
    margin: 0 auto;

    &__item {
      display: inline-block;
      margin: 0 5px;
      padding: 10px;
      padding-bottom: 8px;
      font-size: 16px;
      letter-spacing: 0.8px;
      color: gray;
      text-decoration: none;
      border: none;
      background-color: transparent;
      border-bottom: 2px solid transparent;
      cursor: pointer;
      transition: all 0.25s;

      &_active {
        color: black;
      }

      &:hover {
        border-bottom: 2px solid gray;
        color: black;
      }

      &:focus {
        outline: none;
        border-bottom: 2px solid gray;
        color: black;
      }

      &:first-child {
        margin-left: 20px;
      }

      &:last-child {
        margin-right: 0;
      }
    }

    &__active-line {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 2px;
      background-color: black;
      transition: transform 0.4s ease, width 0.4s ease;
    }
  }

  textarea {
    text-transform: uppercase;
  }
</style>

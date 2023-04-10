<template>
  <va-inner-loading :loading="statusLoad">
    <va-card>
      <div class="row">
        <h4 class="card-title" slot="header">List of Exam Session Generated</h4>
        <br />

        <div class="col float-right">
          <div class="float-right">
            <h5>
              <b-badge v-b-toggle.collapse-1 class="ml-1 mr-1" variant="secondary"
              ><i class="fa fa-search"></i></b-badge>
            </h5>
          </div>
        </div>
      </div>
      <div class="row">
        <h6 class="col-12">Centre Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;{{centreName}}</h6><br/>
        <h6 class="col-12">Date Generated :&nbsp;&nbsp;{{dateGenerated}}</h6>
      </div>
      <b-collapse id="collapse-1" class="mt-2">
        <b-card>
          <vue-form-generator
            :model="model"
            :schema="advancedSearchSchema"
            ref="advancedSearchForm"
          >
          </vue-form-generator>
          <br />
          <button
            @click="filterRecord"
            type="button"
            class="ml-2 btn btn-sm btn-primary"
          >
            Search
          </button>
          <button
            @click.prevent="reset"
            type="button"
            class="ml-2 btn btn-sm btn-danger"
          >
            Reset
          </button>
        </b-card>
      </b-collapse>

      <!-- list table-->
      <va-card class="mt-5 col-12">
        <div class="row">
          <div class="flex md2 offset--md10 exam-type-list-search">
            <va-input
              :placeholder="$t('Search')"
              :value="term"
              @input="search"
              removable
              class="exam-type-input"
            >
              <va-icon name="fa fa-search" slot="prepend" />
            </va-input>
          </div>
        </div>
        <va-data-table
          :data="filteredData"
          :datacount="RecordCount"
          :dataperpage="parseInt(perPage)"
          :fields="fields"
          :per-page="parseInt(perPage)"
          clickable
          no-data-label="No data found"
        >
          <template slot="no" slot-scope="row">
            {{ row.rowIndex + 1 }}
          </template>
          <template slot="csl" slot-scope="props">
            <h5 class="mt-1">
              <span
                v-b-tooltip.hover
                title="View Candidate Session List"
                v-on:click="viewCSL(props.rowData.SESSION_DETAILS_ID)"
                class="badge badge-primary mr-2">
                <i class="fa fa-eye"></i>
              </span>
            </h5>
          </template>
          <template slot="inviligation_link" slot-scope="props" >
            <h5 class="mt-1">
              <input type='text' style="width:90px;text-transform:none;"
                :sessionDetailsId="[props.rowData.SESSION_DETAILS_ID]"
                :value="[props.rowData.INVILIGATION_LINK]"
                class="form-control inviligation-link"
                @input="isValueChanged(props)">
              </input>
            </h5>
          </template>
          <template slot="actions" slot-scope="props">
            <h5 class="mt-1">
              <span
                v-b-tooltip.hover
                title="Edit Session"
                v-on:click="editRecord(props.rowData)"
                class="badge badge-primary mr-2">
                <i class="fa fa-edit"></i>
              </span>
              <button
                class="btn btn-secondary mr-2 mt-2"
                v-on:click="sendEmail(props.rowData.SESSION_DETAILS_ID)">
                RESEND EMAIL
              </button>
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
        <div class="float-right">
          <button
            @click="submit"
            type="button"
            class="btn btn-success btn-fill btn-md"
          >
            <i class="fa fa fa-paper-plane"/> &nbsp; Save
          </button>
        </div>
      </va-card>
    </va-card>
  </va-inner-loading>
</template>

<script>
import 'vue-form-generator/dist/vfg.css'
import * as examSessionManagementServices from '../../../app/module0/exam-booking/examSessionManagementServices'
import { TaskStatusConstants } from '@/app/constants/TaskStatusConstants'
import * as services06Module0 from '@/app/module0/services06'
import { ApprovalLevelConstants } from '@/app/constants/ApprovalLevelConstants'
import { debounce } from 'lodash'
import * as servicesModule0 from '../../../app/module0/services'

export default {
  mounted () {
    this.getAllRecord()
    this.centreName = localStorage.getItem('CENTRE_NAME')
    this.dateGenerated = localStorage.getItem('DATE_GENERATED')
    this.getActiveInactiveTaskStatus()
  },

  components: {},

  methods: {
    create () {
      this.$router.push({ name: 'create-exam-session' })
    },
    back () {
      this.$router.go(-1)
    }, // back button
    // search
    search: debounce(function (term) {
      this.term = term
    }, 400),
    // getAllRecord
    getAllRecord: async function () {
      this.RecordList = await examSessionManagementServices.listExamSessionDetailsGenerated(
        {
          ID: localStorage.getItem('SESSION_ID'),
        })
      this.RecordCount = this.RecordList.length
      this.statusLoad = false
    },
    async viewCSL (id) {
      localStorage.setItem('EXAM_SESSION_DETAILS_ID', id)
      this.$router.push({ name: 'candidate-session-list-esc' })
    },
    async viewExamSessionDetails (id) {
      localStorage.setItem('EXAM_SESSION_DETAILS_ID', id)
      this.$router.push({ name: 'view-exam-session-details' })
    },
    async cancelSession (id) {
      if (confirm('Are you sure you want to cancel the exam session?')) {
        const data = new FormData()
        data.append('ID', id)
        try {
          await examSessionManagementServices.cancelExamSession(data)
          await this.getAllRecord()
        } catch (e) {
          console.log(e)
        }
      }
    },
    isValueChanged (data) {
      const inviligationLinks = document.querySelectorAll('input.inviligation-link')
      for (let index = 0; index < inviligationLinks.length; index++) {
        const sessionDetailsId = inviligationLinks[index].getAttribute('sessionDetailsId')
        if (sessionDetailsId === String(data.rowData.SESSION_DETAILS_ID)) {
          const inviligationLinkValue = inviligationLinks[index].value
          if (inviligationLinkValue && data.rowData.INVILIGATION_LINK !== inviligationLinkValue) {
            inviligationLinks[index].parentNode.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.querySelector('button').classList.remove('btn-secondary')
            inviligationLinks[index].parentNode.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.querySelector('button').classList.add('btn-primary')
          } else {
            inviligationLinks[index].parentNode.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.querySelector('button').classList.remove('btn-primary')
            inviligationLinks[index].parentNode.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.querySelector('button').classList.add('btn-secondary')
          }
        }
      }
      this.validateInputIfChanged()
    },
    validateInputIfChanged () {
      this.validateTextAreas = []
      const textAreas = document.querySelectorAll('input.inviligation-link')
      textAreas.forEach(textarea => {
        const isSpanExist = textarea.parentElement.querySelector('span')
        if (!isSpanExist) {
          console.log('validateLink', this.validateLink(textarea.value))
          if (this.validateLink(textarea.value)) {
            const span = document.createElement('span')
            span.textContent = '*Link Not Invalid.'
            span.style.fontSize = '12px'
            span.style.fontStyle = 'italic'
            span.style.color = 'crimson'
            textarea.parentNode.insertBefore(span, textarea.nextSibling)
            this.validateTextAreas.push(1)
          }
        } else {
          console.log('validateLink', this.validateLink(textarea.value))
          if (!this.validateLink(textarea.value)) {
            const findSpan = textarea.parentElement.querySelector('span')
            if (findSpan) {
              findSpan.parentNode.removeChild(findSpan)
            }
          } else {
            this.validateTextAreas.push(1)
          }
        }
      })
      console.log(this.validateTextAreas.length)
      if (this.validateTextAreas.length) {
        return false
      }
      return true
    },
    validateLink (value) {
      if (value) {
        const Reg = /^(https?):\/\/[^\s$.?#].[^\s]*$/
        if (!value.match(Reg)) {
          return true
        }
      }
      return false
    },

    async editRecord (data) {
      localStorage.setItem('EDIT_EXAM_SESSION_ESC', JSON.stringify(data))
      this.$router.push({ name: 'edit-exam-session-esc' })
    },
    async sendEmail (sessionDetailsId) {
      const data = new FormData()
      data.append('SESSION_DETAILS_ID', sessionDetailsId)

      const invigilInputs = document.querySelectorAll('input.inviligation-link')
      for (let index = 0; index < invigilInputs.length; index++) {
        const sessionDetailsIdInput = invigilInputs[index].getAttribute('sessionDetailsId')
        if (parseInt(sessionDetailsIdInput) === sessionDetailsId) {
          if (invigilInputs[index].value.length) {
            data.append('INVILIGATION_LINK', invigilInputs[index].value)
          }
        }
      }

      try {
        await examSessionManagementServices.sendEmailToConsultant(data)
        // this.$router.go(-1)
      } catch (error) {
        console.log(error)
      }
    },
    submit: async function () {
      if (this.RecordCount === 0) {
        alert('Please add at least one exam session details.')
        return
      }
      if (this.validateInputIfChanged() && ('Are you sure you want to proceed the submission?')) {
        this.getDatas()
        if (this.data.length == 0) {
          alert('Please add atleast one inviligation link')
          return
        }
        const data = new FormData()
        data.append('NEW_DATA', JSON.stringify(this.data))
        const user = localStorage.getItem('user')
        data.append('UPDATE_BY', JSON.parse(user).user_id)
        try {
          await examSessionManagementServices.saveLinks(data)
          // this.$router.go(-1)
        } catch (error) {
          console.log(error)
        }
      }
    },
    getDatas () {
      this.data = []
      const invigilInputs = document.querySelectorAll('input.inviligation-link')
      for (let index = 0; index < invigilInputs.length; index++) {
        const sessionDetailsId = invigilInputs[index].getAttribute('sessionDetailsId')
        if (invigilInputs[index].value.length) {
          this.data.push(
            { sessionDetailsId: sessionDetailsId, value: invigilInputs[index].value },
          )
        }
      }
    },
    async reset () {
      this.model.DAY = ''
      this.model.START_TIME = ''
      this.model.END_TIME = ''
      this.model.STATUS = ''
      this.model.APPROVAL_STATUS = ''
      this.getAllRecord()
    },
    async filterRecord () {
      this.statusLoad = true
      try {
        const response = await examSessionManagementServices.listExamSessionDetailsGenerated(
          {
            ID: localStorage.getItem('SESSION_ID'),
            FILTERS: this.model,
          })
        if (response !== 'error') {
          this.RecordList = response
          this.RecordCount = this.RecordList.length
        }
      } catch (error) {}
      this.statusLoad = false
    },
    async getActiveInactiveTaskStatus () {
      this.status = await servicesModule0.getActiveInactiveTaskStatus()
    },
  },

  computed: {
    fields () {
      return [
        {
          name: '__slot:marker',
          width: '30px',
          dataClass: 'text-center',
        },
        {
          name: '__slot:no',
          title: 'No',
          width: '30px',
        },
        {
          name: 'EXAM_NO',
          title: 'EXAM NO',
          sortField: 'EXAM_NO',
        },
        {
          name: 'CENTRE_MODE',
          title: 'CENTRE MODE',
          sortField: 'CENTRE_MODE',
        },
        {
          name: 'DATE_GENERATED',
          title: 'DATE',
          sortField: 'DATE_GENERATED',
        },
        {
          name: 'DAY',
          title: 'DAY',
          sortField: 'DAY',

        },
        {
          name: 'START_TIME',
          title: 'START TIME',
        },
        {
          name: 'END_TIME',
          title: 'END TIME',
        },
        {
          name: 'ECL_DATE',
          title: 'EXAM CLOSING',
          sortField: 'ECL_DATE',
        },
        {
          name: 'CSL_DATE',
          title: 'CSL DATE',
          sortField: 'CSL_DATE',
        },
        {
          name: '__slot:csl',
          title: 'CSL',
        },
        {
          name: '__slot:inviligation_link',
          title: 'INVILIGATION LINK',
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
          title: 'ACTION',
        },
      ]
    },
    filteredData () {
      if (!this.term || this.term.length < 1) {
        return this.RecordList
      }
      return this.RecordList.filter((item) => {
        return this.term
          .split(' ')
          .every(
            (v) => {
              if (item) {
                return (
                  (item.CENTRE_MODE.toLowerCase().includes(v)) ||
                  (item.CENTRE_MODE.toUpperCase().includes(v)) ||
                  (item.DAY.toLowerCase() === v) || (item.DAY.toUpperCase() === v) ||
                  item.APPROVAL_STATUS.toLowerCase().includes(v) || item.APPROVAL_STATUS.toUpperCase().includes(v) ||
                  (item.STATUS.toLowerCase() === v) || (item.STATUS.toUpperCase() === v)
                )
              }
            },
          )
      })
    },
  },

  data () {
    return {
      data: [],
      taskStatus: localStorage.getItem('APPROVAL_STATUS'),
      approvalStatus: [
        { name: 'PENDING', TS_ID: TaskStatusConstants.PENDING },
        { name: 'DRAFT', TS_ID: TaskStatusConstants.DRAFT_GENERAL },
        { name: 'APPROVED', TS_ID: TaskStatusConstants.APPROVED },
        { name: 'REVIEWED', TS_ID: TaskStatusConstants.REVIEWED },
        { name: 'RETURNED', TS_ID: TaskStatusConstants.RETURNED },
        { name: 'REJECTED', TS_ID: TaskStatusConstants.REJECTED },
      ],
      taskStatusConstants: TaskStatusConstants,
      day: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      status: [],
      centreName: '',
      dateGenerated: '',
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
        STATUS: '',
        APPROVAL_STATUS: '',
        DAY: '',
        START_TIME: '',
        END_TIME: '',
      },
      advancedSearchSchema: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'vueMultiSelect',
                model: 'DAY',
                label: 'DAY',
                placeholder: 'Select Day',
                required: false,
                validator: 'required',
                styleClasses: 'col-md-12',
                selectOptions: {
                  multiple: false,
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.day
                },
              },
              {
                type: 'input',
                inputType: 'text',
                model: 'START_TIME',
                label: 'START TIME',
                styleClasses: 'col-md-6',
                required: false,
              },
              {
                type: 'input',
                inputType: 'text',
                model: 'END_TIME',
                label: 'END TIME',
                styleClasses: 'col-md-6',
                required: false,
              },
              {
                type: 'vueMultiSelect',
                placeholder: 'Select Status',
                model: 'STATUS',
                label: 'STATUS',
                required: false,
                validator: 'required',
                styleClasses: 'col-md-6',
                selectOptions: {
                  multiple: false,
                  key: 'TS_ID',
                  label: 'TS_PARAM',
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.status
                },
              },
              {
                type: 'vueMultiSelect',
                placeholder: 'Select Approval Status',
                model: 'APPROVAL_STATUS',
                label: 'APPROVAL STATUS',
                required: false,
                validator: 'required',
                styleClasses: 'col-md-6',
                selectOptions: {
                  multiple: false,
                  key: 'TS_ID',
                  label: 'name',
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.approvalStatus
                },
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
</style>

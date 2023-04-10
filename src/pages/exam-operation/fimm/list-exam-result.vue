<template>
  <va-inner-loading :loading="statusLoad">
    <va-card>
      <div class="row">
        <h4 class="card-title" slot="header">List of Exam Result</h4>
        <br/>
        <div class="col float-right">
          <div class="float-right">
            <h5>
              <b-badge v-b-toggle.collapse-1 class="ml-1 mr-1" variant="secondary"
              ><i class="fa fa-search"></i></b-badge>
            </h5>
          </div>
        </div>
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

          <template slot="actions" slot-scope="props">
            <h5 class="mt-1">
              <span
                v-b-tooltip.hover
                title="Edit Result"
                v-if="props.rowData.STATUS !== 'APPROVED'"
                v-on:click="editRecord(props.rowData)"

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
      </va-card>
    </va-card>
  </va-inner-loading>
</template>

<script>
import 'vue-form-generator/dist/vfg.css'
import * as resultManagementServices from '../../../app/module0/exam-booking/resultManagementServices'
import { TaskStatusConstants } from '@/app/constants/TaskStatusConstants'
import { debounce } from 'lodash'

export default {
  components: {},
  mounted () {
    this.getAllRecord()
  },
  methods: {
    search: debounce(function (term) {
      this.term = term
    }, 400),
    // getAllRecord
    getAllRecord: async function () {
      const user = localStorage.getItem('user')
      this.RecordList = await resultManagementServices.listAll({
        APPR_GROUP_ID: JSON.parse(user).USER_GROUP_ID,
      })
      this.RecordCount = this.RecordList.length
      this.statusLoad = false
    },
    async viewRecord (data) {
      localStorage.setItem(
        'view-exam-result', JSON.stringify(data))
      this.$router.push({
        name: 'view-exam-result',
      })
    },

    async editRecord (data) {
      localStorage.setItem(
        'edit-exam-result', JSON.stringify(data))
      this.$router.push({
        name: 'list-exam-result-for-approval',
      })
    },
    async reset () {
      this.model.DAY = ''
      this.model.START_TIME = ''
      this.model.END_TIME = ''
      this.model.STATUS = ''
      this.model.CENTRE_NAME = ''
      this.getAllRecord()
    },
    async filterRecord () {
      this.statusLoad = true
      try {
        const user = localStorage.getItem('user')
        const response = await resultManagementServices.listAll({
          APPR_GROUP_ID: JSON.parse(user).USER_GROUP_ID,
          FILTERS: this.model,
        })
        if (response !== 'error') {
          this.RecordList = response
          this.RecordCount = this.RecordList.length
        }
      } catch (error) {}
      this.statusLoad = false
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
          title: 'EXAM SESSION NO',
        },
        {
          name: 'EXAM_CENTRE_NAME',
          title: 'Exam Centre Name',
        },
        {
          name: 'DATE',
          title: 'DATE',
        },
        {
          name: 'DAY',
          title: 'DAY',
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
          name: 'STATUS',
          title: 'STATUS',
        },
        {
          name: '__slot:actions',
          title: 'ACTION',
          // dataClass: "float-right"
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
                  (item.EXAM_CENTRE_NAME.toLowerCase().includes(v)) ||
                  (item.EXAM_CENTRE_NAME.toUpperCase().includes(v)) ||
                  (item.START_TIME === v) || (item.END_TIME === v) ||
                  (item.DAY.toLowerCase() === v) || (item.DAY.toUpperCase() === v) ||
                  item.STATUS.toLowerCase().includes(v) || item.STATUS.toUpperCase().includes(v)
                )
              }
            },
          )
      })
    },
  },

  data () {
    return {
      taskStatusConstants: TaskStatusConstants,
      approvalStatus: [
        { name: 'PENDING', TS_ID: TaskStatusConstants.PENDING },
        { name: 'DRAFT', TS_ID: TaskStatusConstants.DRAFT_GENERAL },
        { name: 'APPROVED', TS_ID: TaskStatusConstants.APPROVED },
        { name: 'REVIEWED', TS_ID: TaskStatusConstants.REVIEWED },
        { name: 'RETURNED', TS_ID: TaskStatusConstants.RETURNED },
        { name: 'REJECTED', TS_ID: TaskStatusConstants.REJECTED },
      ],
      day: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      statusLoad: true,
      header: '',
      field: [],
      term: null,
      perPage: '10',
      currentPage: 1,
      count: 1,
      RecordCount: null,
      classificationList: [],
      RecordList: [],

      model: {
        CENTRE_NAME: '',
        STATUS: '',
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
                type: 'input',
                inputType: 'text',
                model: 'CENTRE_NAME',
                label: 'CENTRE NAME',
                styleClasses: 'col-md-6',
                required: false,
              },
              {
                type: 'vueMultiSelect',
                model: 'DAY',
                label: 'DAY',
                placeholder: 'Select Day',
                required: false,
                validator: 'required',
                styleClasses: 'col-md-6',
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
.inline {
  display: inline-flex;
  float: right;
}
</style>

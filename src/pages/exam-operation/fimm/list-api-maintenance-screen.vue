<template>
  <va-inner-loading :loading="statusLoad">
    <va-card>
      <div class="row">
        <h4 class="card-title" slot="header">List of ClassMarker Test Information</h4>
        <br />
        <div class="col float-right">
          <div class="float-right">
            <h5>
              <b-badge v-b-toggle.collapse-1 class="ml-1 mr-1" variant="secondary"
              ><i class="fa fa-search"></i></b-badge>
              <span
                class="badge badge-primary"
                title="Add API Maintenance Screen"
                v-b-tooltip.hover
                v-on:click="create"
              >
                <i class="fa fa-plus"></i>
              </span>
              <button
                @click.prevent="dispatchExamNo"
                type="button"
                class="ml-2 btn btn-sm btn-info"
              >
                DISPATCH EXAM NO
              </button>
            </h5>
          </div>
        </div>
      </div>
      <!-- advanced search form -->
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
            @click="filterExamRecord"
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

      <vudal name="simpleModal" class="widthModal">
        <div class="header">
          Description<i class="close icon">&times;</i>
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
          <template slot="CLASSMARKER_TEST_LINK" slot-scope="props">
            <router-link :to="props.rowData.CLASSMARKER_TEST_LINK" target="_blank">{{props.rowData.CLASSMARKER_TEST_LINK}}</router-link>
          </template>
          <template slot="actions" slot-scope="props">
            <h5 class="mt-1">
              <span
                v-b-tooltip.hover
                title="Edit Exam Type Details"
                v-on:click="editRecord(props.rowData)"
                v-if="(props.rowData.APPROVAL_STATUS === taskStatusConstants.APPROVED_DISPLAY
                  || props.rowData.APPROVAL_STATUS === taskStatusConstants.RETURNED_DISPLAY)"
                class="badge badge-primary mr-2"
              >
                <i class="fa fa-edit"></i
                ></span>
              <span
                v-b-tooltip.hover
                title="View Exam Type Details"
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
import * as examBookingServices from '../../../app/module0/examBookingServices'
import Vudal from 'vudal'
import { debounce } from 'lodash'
import { TaskStatusConstants } from '../../../app/constants/TaskStatusConstants'
import * as servicesModule0 from '../../../app/module0/services'
import * as centreManagementServices from '../../../app/module0/exam-booking/centreManagementServices'

export default {
  mounted () {
    this.getAllExamType()
    this.getAllLanguages()

    this.getAllRecord()
    this.getActiveInactiveTaskStatus()
  },
  components: { Vudal },

  methods: {
    // create
    create () {
      this.$router.push({ name: 'add-api-maintenance-screen' })
    },
    async getAllExamType () {
      this.examType = await examBookingServices.getActiveExamTypesDetails()
      if (!this.examType) {
        alert('Active Exam Type Details not found. Please add Active Exam Types.')
        this.back()
      }
    },

    async getAllLanguages () {
      this.LANGUAGE = await centreManagementServices.getAllLanguages()
    },
    // search
    search: debounce(function (term) {
      this.term = term
      console.log(this.term)
    }, 400),
    back () {
      this.$router.go(-1)
    }, // back button
    async getActiveInactiveTaskStatus () {
      // const response = await servicesModule0.getActiveInactiveTaskStatus()
      // this.status = response
    },
    // getAllRecord
    getAllRecord: async function () {
      const response = await centreManagementServices.getClassMarkerApi()
      this.RecordList = response
      this.RecordCount = this.RecordList.length
      this.statusLoad = false
    },
    async viewDescription (description) {
      this.model.description = description
      this.$modals.simpleModal.$show()
    },
    async viewRecord (data) {
      localStorage.setItem('view-exam-type-details', JSON.stringify(data))
      this.$router.push({
        name: 'view-exam-type-details',
      })
    },
    async editRecord (data) {
      localStorage.setItem('edit-exam-type-details', JSON.stringify(data))
      this.$router.push({
        name: 'edit-exam-type-details',
      })
    },
    async reset () {
      this.model.examType = ''
      this.model.LANGUAGE = ''
      this.model.effectiveDate = ''
      this.model.status = ''
      this.getAllRecord()
    },
    async dispatchExamNo () {
      try {
        await centreManagementServices.dispatchExamNo()
      } catch (error) {
        console.log(error)
      }
    },
    async filterExamRecord () {
      this.statusLoad = true
      try {
        // alert(JSON.stringify(this.model));
        const response = await centreManagementServices.getClassMarkerApi(
          { filters: this.model })
        if (response !== 'error') {
          this.RecordList = response
          this.RecordCount = this.RecordList.length
        }
      } catch (error) {}
      this.statusLoad = false
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
          name: 'EXAM_TYPE',
          title: 'EXAM TYPE',
        },
        {
          name: 'LANGUAGE',
          title: 'LANGUAGE',
        },
        {
          name: '__slot:CLASSMARKER_TEST_LINK',
          title: 'CLASSMARKER TEST LINK',
        },
        {
          name: 'ACCESS_LIST_ID',
          title: 'ACCESS LIST ID',
        },
        {
          name: 'DURATION',
          title: 'DURATION(MINUTES)',
        },
        {
          name: 'EFFECTIVE_DATE',
          title: 'EFFECTIVE DATE',
        },
        {
          name: 'STATUS',
          title: 'STATUS',
        },
      ]
    },

    RecordFilteredData () {
      if (!this.term || this.term.length < 1) {
        return this.RecordList
      }
      return this.RecordList.filter((item) => {
        console.log(item)
        return this.term
          .toLowerCase()
          .split(' ')
          .every(
            (v) => {
              if (item) {
                return (
                  (item.EXAM_TYPE ? item.EXAM_TYPE.toLowerCase().includes(v) : false) ||
                  (item.ACCESS_LIST_ID ? item.ACCESS_LIST_ID.toString().toLowerCase().includes(v) : false) ||
                  (item.CLASSMARKER_TEST_LINK ? item.CLASSMARKER_TEST_LINK.toLowerCase().includes(v) : false) ||
                  (item.LANGUAGE ? item.LANGUAGE.toString().toLowerCase().includes(v) : false) ||
                  (item.STATUS ? item.STATUS.toLowerCase().includes(v) : false) ||
                  (item.DURATION ? item.DURATION.toString().toLowerCase().includes(v) : false)
                )
              }
            },
          )
      })
    },
  },
  data () {
    return {
      examType: [],

      LANGUAGE: [

      ],
      STATUS: [
        {
          label: 'ACTIVE',
          value: 26,
        },
        {
          label: 'INACTIVE',
          value: 25,
        },
      ],
      taskStatusConstants: TaskStatusConstants,
      statusLoad: true,
      header: '',
      field: [],
      perPage: '10',
      currentPage: 1,
      term: null,
      count: 1,
      RecordCount: null,
      RecordList: [],
      licenseType: [],
      status: [],
      approvalStatus: [
        { name: 'PENDING', TS_ID: TaskStatusConstants.PENDING },
        { name: 'APPROVED', TS_ID: TaskStatusConstants.APPROVED },
        { name: 'REVIEWED', TS_ID: TaskStatusConstants.REVIEWED },
        { name: 'RETURNED', TS_ID: TaskStatusConstants.RETURNED },
        { name: 'REJECTED', TS_ID: TaskStatusConstants.REJECTED },
      ],
      model: {
        status: '',
        examType: '',
        LANGUAGE: '',
        effectiveDate: '',
      },

      descriptionSchema: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'textArea',
                model: 'description',
                rows: 5,
                validator: 'string',
                styleClasses: 'col-md-12',
                readonly: true,
              },
            ],
          },
        ],
      },
      advancedSearchSchema: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'vueMultiSelect',
                model: 'examType',
                label: 'EXAM TYPE',
                placeholder: 'Select Exam Type',
                required: false,
                validator: 'required',
                styleClasses: 'col-md-6',
                selectOptions: {
                  multiple: false,
                  key: 'ID',
                  label: 'SHORT_NAME',
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.examType
                },
              },
              {
                type: 'vueMultiSelect',
                model: 'LANGUAGE',
                label: 'LANGUAGE',
                placeholder: 'Select Language Type',
                required: false,
                validator: 'required',
                styleClasses: 'col-md-6',
                selectOptions: {
                  multiple: false,
                  label: 'label',
                  value: 'value',
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.LANGUAGE
                },
              },

              {
                label: 'EFFECTIVE DATE',
                type: 'vfg-functional-date2',
                placeholder: 'EFFECTIVE DATE',
                model: 'effectiveDate',
                noLabel: true,
                format: 'dd-MMM-yyyy',
                styleClasses: 'col-md-6',
                required: false,
              },
              {
                type: 'vueMultiSelect',
                placeholder: 'Select Status',
                model: 'status',
                label: 'STATUS',
                required: false,
                validator: 'required',
                styleClasses: 'col-md-6',
                selectOptions: {
                  multiple: false,
                  label: 'label',
                  value: 'value',
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.STATUS
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
  .width label {
    display: none;
  }
  input {
    text-transform: uppercase;
  }
</style>

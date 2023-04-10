<template>
  <va-inner-loading :loading="statusLoad">
    <va-card>
      <div class="row">
        <h4 class="card-title" slot="header">List of Company User</h4>
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
            @click="filterUserRecord"
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
                title="View ESC Profile"
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
import { debounce } from 'lodash'
import * as examCentreProviderManagementServices
from '../../app/exam-centre-provider/services/examCentreProviderManagementServices'
import { TaskStatusConstants } from '../../app/constants/TaskStatusConstants'

export default {
  mounted () {
    this.centreId = JSON.parse(localStorage.getItem('view-centre-user-list'))
    this.getAllRecord()
  },

  methods: {
    // search
    search: debounce(function (term) {
      this.term = term
      console.log(this.term)
    }, 400),
    back () {
      this.$router.go(-1)
    }, // back button
    // getAllRecord
    getAllRecord: async function () {
      const response = await examCentreProviderManagementServices.getCompanyUsersByCentreId(
        {
          CENTRE_ID: this.centreId.CENTRE_ID,
        },
      )
      // const response = []
      this.RecordList = response
      this.RecordCount = this.RecordList.length
      this.statusLoad = false
    },
    async viewRecord (data) {
      localStorage.setItem('view-esc-user-details', JSON.stringify(data))
      this.$router.push({
        name: 'view-esc-user-details',
      })
    },
    async editRecord (data) {
      localStorage.setItem('edit-exam-type-details', JSON.stringify(data))
      this.$router.push({
        name: 'edit-exam-type-details',
      })
    },
    async reset () {
      this.model.USER_NAME = ''
      this.model.CITIZENSHIP = ''
      this.model.ROLE = ''
      this.model.EMAIL = ''
      this.getAllRecord()
    },
    async filterUserRecord () {
      this.statusLoad = true
      try {
        const response = await examCentreProviderManagementServices.getCompanyUsersByCentreId(
          {
            CENTRE_ID: this.centreId.CENTRE_ID,
            FILTERS: this.model,
          },
        )
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
          name: 'EXAM_SITE_COORDINATOR_NAME',
          title: 'EXAM SITE COORDINATOR NAME',
        },
        {
          name: 'ROLE',
          title: 'ROLE',
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
      return this.RecordList.filter((item) => {
        return this.term
          .split(' ')
          .every(
            (v) => {
              if (item) {
                return ((item.EXAM_SITE_COORDINATOR_NAME ? item.EXAM_SITE_COORDINATOR_NAME.toLowerCase().includes(v) : false) ||
                  (item.EXAM_SITE_COORDINATOR_NAME ? item.EXAM_SITE_COORDINATOR_NAME.toUpperCase().includes(v) : false) ||
                  item.EMAIL.toLowerCase().includes(v) || item.EMAIL.toUpperCase().includes(v) ||
                  item.ROLE.toLowerCase().includes(v) || item.ROLE.toUpperCase().includes(v) ||
                  item.PHONE_NUMBER.toLowerCase().includes(v) || item.PHONE_NUMBER.toUpperCase().includes(v)
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
        USER_NAME: '',
        CITIZENSHIP: '',
        ROLE: '',
        EMAIL: '',
      },
      advancedSearchSchema: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'input',
                inputType: 'text',
                model: 'USER_NAME',
                label: 'EXAM SITE COORDINATOR NAME',
                styleClasses: 'col-md-6',
                required: false,
              },
              {
                type: 'vueMultiSelect',
                model: 'CITIZENSHIP',
                label: 'CITIZENSHIP',
                required: false,
                styleClasses: 'col-md-6 ',
                selectOptions: {
                  multiple: false,
                  key: 'value',
                  label: 'name',
                  searchable: true,
                },
                values: (model, schema) => {
                  return [
                    {
                      name: 'MALAYSIAN',
                      value: 286,
                    },
                    {
                      name: 'NON-MALAYSIAN',
                      value: 287,
                    },
                  ]
                },
              },
              {
                type: 'vueMultiSelect',
                placeholder: 'Select Role',
                model: 'ROLE',
                label: 'ROLE',
                required: false,
                validator: 'required',
                styleClasses: 'col-md-6',
                selectOptions: {
                  multiple: false,
                  key: 'value',
                  label: 'name',
                  searchable: true,
                },
                values: (model, schema) => {
                  return [
                    {
                      name: 'Exam Centre Admin',
                      value: 'exam_centre_admin',
                    },
                    {
                      name: 'ESC',
                      value: 'esc',
                    },
                  ]
                },
              },
              {
                type: 'input',
                inputType: 'text',
                model: 'EMAIL',
                label: 'EMAIL',
                styleClasses: 'col-md-6',
                required: false,
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

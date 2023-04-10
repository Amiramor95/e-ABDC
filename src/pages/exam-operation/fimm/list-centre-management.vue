<template>
  <va-inner-loading :loading="statusLoad">
    <va-card>
      <div class="row">
        <h4 class="card-title" slot="header">List of Centre</h4>
        <br />
        <div class="col float-right">
          <div class="float-right">
            <h5>
              <b-badge v-b-toggle.collapse-1 class="ml-1 mr-1" variant="secondary"
              ><i class="fa fa-search"></i></b-badge>
              <span
                class="badge badge-primary"
                title="Add New Centre"
                v-b-tooltip.hover
                v-on:click="create"
              >
                <i class="fa fa-plus"></i
                ></span>
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
            @click="filterCentreRecord"
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
      <p style="margin-top: 19px;display: block;"><b>Company Name: {{companyName}}</b></p>

      <!-- list table-->
      <va-card class="mt-3 col-12">
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
          <template slot="CENTRE_user" slot-scope="props">
            <h4 class="mt-1 ml-1">
              <span
                v-b-tooltip.hover
                title="View CENTRE User"
                v-on:click="viewCentreUserList(props.rowData)"
                class="badge badge-info mr-2"
              >
                <i class="fa fa-group"></i></span>
            </h4>
          </template>
          <template slot="actions" slot-scope="props">
            <h5 class="mt-1">
              <span
                v-b-tooltip.hover
                title="Edit Centre Details"
                v-on:click="editRecord(props.rowData)"
                class="badge badge-primary mr-2"
              >
                <i class="fa fa-edit"></i
                ></span>
              <span
                v-b-tooltip.hover
                title="View Centre Details"
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
import * as centreManagementServices from '../../../app/module0/exam-booking/centreManagementServices'
import * as services02module0 from '../../../app/module0/services02'
import * as servicesModule0 from '../../../app/module0/services'

export default {
  mounted () {
    const data = JSON.parse(localStorage.getItem('view-exam-centre-list'))
    this.companyProfileId = data.COMPANY_PROFILE_ID
    this.companyName = data.COMPANY_NAME
    this.getAllRecord()
    this.getAllStates()
    this.getActiveInactiveTaskStatus()
  },
  components: {},

  methods: {
    // create
    create () {
      this.$router.push({ name: 'create-exam-centre' })
    },
    // search
    search: debounce(function (term) {
      this.term = term
      console.log(this.term)
    }, 400),

    back () {
      this.$router.go(-1)
    },
    // back button

    // getAllRecord
    getAllRecord: async function () {
      this.RecordList = await centreManagementServices.listAll({
        COMPANY_PROFILE_ID: this.companyProfileId,
      })
      this.RecordCount = this.RecordList.length
      this.statusLoad = false
    },
    async viewCentreUserList (data) {
      localStorage.setItem('view-centre-user-list', JSON.stringify({
        CENTRE_ID: data.ID,
      },
      ))
      this.$router.push({
        name: 'list-esc-company-user',
      })
    },
    async editRecord (data) {
      localStorage.setItem('CENTRE_ID', data.ID)
      this.$router.push({ name: 'edit-exam-centre' })
    },
    async viewRecord (data) {
      localStorage.setItem('CENTRE_ID', data.ID)
      this.$router.push({ name: 'view-exam-centre' })
    },
    async reset () {
      this.model.CENTRE_STATE = ''
      this.model.CENTRE_NAME = ''
      this.model.CENTRE_STATUS = ''
      this.model.CENTRE_MODE = ''
      this.getAllRecord()
    },
    async filterCentreRecord () {
      this.statusLoad = true
      try {
        const response = await centreManagementServices.listAll({
          COMPANY_PROFILE_ID: this.companyProfileId,
          FILTERS: this.model,
        })
        if (response !== 'error') {
          this.RecordList = response
          this.RecordCount = this.RecordList.length
        }
      } catch (error) {}
      this.statusLoad = false
    },
    async getAllStates () {
      try {
        this.states = await services02module0.getAllStateList()
      } catch (error) {
        console.log(error)
      }
    },
    async getActiveInactiveTaskStatus () {
      this.status = await servicesModule0.getActiveInactiveTaskStatus()
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
          name: 'CENTRE_MODE',
          title: 'CENTRE MODE',
        },
        {
          name: 'STATE',
          title: 'STATE',
        },
        {
          name: 'OPERATIONAL_CAPACITY',
          title: 'OPERATIONAL CAPACITY',
        },
        {
          name: 'MAXIMUM_CAPACITY',
          title: 'MAXIMUM CAPACITY',
        },
        {
          name: '__slot:CENTRE_user',
          title: 'USER LIST',
        },
        {
          name: 'STATUS',
          title: 'STATUS',
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
            (v) =>
              item.CENTRE_MODE.toLowerCase().includes(v) || item.CENTRE_MODE.toUpperCase().includes(v) ||
                        item.CENTRE_NAME.toLowerCase().includes(v) || item.CENTRE_NAME.toUpperCase().includes(v) ||
                        item.STATE.toLowerCase().includes(v) || item.STATE.toUpperCase().includes(v) ||
                        (item.STATUS.toLowerCase() == v) || (item.STATUS.toUpperCase() == v),
          )
      })
    },
  },

  data () {
    return {
      companyProfileId: '',
      companyName: '',
      statusLoad: true,
      header: '',
      field: [],
      term: null,
      perPage: '10',
      currentPage: 1,
      count: 1,
      RecordCount: null,
      RecordList: [],
      status: [],
      states: [],
      centreMode: [
        { value: 1, name: 'Virtual' },
        { value: 2, name: 'Physical' },
      ],
      model: {
        CENTRE_NAME: '',
        CENTRE_STATE: '',
        CENTRE_STATUS: '',
        CENTRE_MODE: '',
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
                model: 'CENTRE_STATE',
                label: 'STATE',
                required: false,
                styleClasses: 'col-md-6 ',
                selectOptions: {
                  multiple: false,
                  key: 'SET_GENERAL_ID',
                  label: 'SET_STATE',
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.states
                },
              },
              {
                type: 'vueMultiSelect',
                placeholder: 'Select Status',
                model: 'CENTRE_STATUS',
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
                model: 'CENTRE_MODE',
                label: 'CENTRE MODE',
                required: false,
                styleClasses: 'col-md-6 ',
                selectOptions: {
                  multiple: false,
                  key: 'name',
                  value: 'value',
                  label: 'name',
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.centreMode
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

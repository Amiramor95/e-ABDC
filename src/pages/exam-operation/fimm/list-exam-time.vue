<template>
  <va-inner-loading :loading="statusLoad">
    <va-card>
      <div class="row">
        <h4 class="card-title" slot="header">List of Exam Time</h4>
        <br/>
        <div class="col float-right">
          <div class="float-right">
            <h5>
              <b-badge v-b-toggle.collapse-1 class="ml-1 mr-1" variant="secondary"
              ><i class="fa fa-search"></i></b-badge>
              <span
                class="badge badge-primary"
                title="Add New Exam Time"
                v-b-tooltip.hover
                v-on:click="create"
              >
                <i class="fa fa-plus"></i></span>
            </h5>
          </div>
        </div>
      </div>
      <!-- advanced search form -->
      <b-collapse id="collapse-1" class="mt-2">
        <b-card>
          <vue-form-generator
            :model="model1"
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
                title="Edit time"
                v-on:click="editRecord(props.rowData)"
                class="badge badge-primary mr-2"
              >
                <i class="fa fa-edit"></i></span>
            </h5>
          </template>
        </va-data-table>
        <br/>
        <button
          type="button"
          @click="back"
          class="ml-2 btn btn-primary btn-fill float-left btn-md"
        >
          <i class="fa fa-step-backward" /> &nbsp; Previous
        </button>
      </va-card>
    </va-card>
  </va-inner-loading>
</template>

<script>
import 'vue-form-generator/dist/vfg.css'
import * as examTimeManagementServices from '../../../app/module0/exam-booking/examTimeManagementServices'
import * as companyManagementServices from '../../../app/module0/exam-booking/companyManagementServices'
import { debounce } from 'lodash'

export default {
  components: {},
  mounted () {
    this.getAllRecord()
  },
  methods: {
    create () {
      this.$router.push({ name: 'create-exam-time' })
    },
    // search
    search: debounce(function (term) {
      this.term = term
    }, 400),
    back () {
      this.$router.push({ name: 'list-exam-session-setting' })
    },
    submit () {},
    // getAllRecord
    getAllRecord: async function () {
      this.RecordList = await examTimeManagementServices.listAllExamTime()
      this.RecordCount = this.RecordList.length
      this.statusLoad = false
    },
    async editRecord (data) {
      localStorage.setItem(
        'edit-exam-time', JSON.stringify(data))
      this.$router.push({
        name: 'edit-exam-time',
      })
    },
    async filterRecord () {
      this.statusLoad = true
      try {
        const response = await examTimeManagementServices.listAllExamTime(
          { FILTERS: this.model1 },
        )
        if (response !== 'error') {
          this.RecordList = response
          this.RecordCount = this.RecordList.length
        }
      } catch (error) {}
      this.statusLoad = false
    },
    async reset () {
      this.model1.DAY = ''
      this.model1.START_TIME = ''
      this.model1.END_TIME = ''
      this.getAllRecord()
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
      console.log(this.term)
      return this.RecordList.filter((item) => {
        return this.term
          .split(' ')
          .every(
            (v) => {
              if (item) {
                return (item.DAY.toLowerCase().includes(v) || item.DAY.toUpperCase().includes(v) ||
                  (item.START_TIME == v) || (item.END_TIME == v)
                )
              }
            },
          )
      })
    },
  },

  data () {
    return {
      statusLoad: true,
      day: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
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
      model1: {
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

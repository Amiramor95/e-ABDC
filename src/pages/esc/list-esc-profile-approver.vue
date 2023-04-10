<template>
  <va-inner-loading :loading="statusLoad">
    <va-card>
      <div class="row">
        <h4 class="card-title" slot="header">List of Company User</h4>
        <br />
        <div class="col float-right">
          <div class="float-right">
          </div>
        </div>
      </div>

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
                title="Approve ESC Profile"
                v-on:click="editRecord(props.rowData)"
                v-if="(props.rowData.APPROVAL_STATUS !== taskStatusConstants.PENDING_DISPLAY)"
                class="badge badge-primary mr-2"
              >
                <i class="fa fa-edit"></i
                ></span>
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
    this.getAllRecord()
    this.isCompanyAdmin = JSON.parse(localStorage.getItem('user')).USER_ISADMIN === 1
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
      const user = localStorage.getItem('user')
      this.RecordList = await examCentreProviderManagementServices.listProfileByGroupId(
        {
          USER_GROUP_ID: JSON.parse(user).USER_GROUP_ID,
          ESC_USER_ID: JSON.parse(user).user_id,
        },
      )
      this.RecordCount = this.RecordList.length
      this.statusLoad = false
    },
    async viewRecord (data) {
      localStorage.setItem('view-esc-profile', JSON.stringify(data))
      this.$router.push({
        name: 'view-esc-profile',
      })
    },
    async editRecord (data) {
      localStorage.setItem('edit-esc-profile-approver', JSON.stringify(data))
      this.$router.push({
        name: 'edit-esc-profile-approver',
      })
    },
    async filterExamRecord () {
      // this.statusLoad = true
      // try {
      // alert(JSON.stringify(this.model));
      // const response = await examBookingServices.filterExamTypeDetails(
      //   { filters: this.model })
      // if (response !== 'error') {
      //   this.RecordList = response
      //   this.RecordCount = this.RecordList.length
      // }
      // } catch (error) {}
      // this.statusLoad = false
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
          name: 'CREATE_TIMESTAMP',
          title: 'SUBMISSION DATE',
        },
        {
          name: 'FULL_NAME',
          title: 'FULL NAME',
          sortField: 'FULL_NAME',
        },
        {
          name: 'APPROVAL_STATUS',
          title: 'APPROVAL STATUS',
        },
        {
          name: 'UPDATE_BY',
          title: 'LAST UPDATE BY',
        },
        {
          name: 'LATEST_UPDATE',
          title: 'LATEST UPDATE',
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
        console.log(item)
        return this.term
          .split(' ')
          .every(
            (v) => {
              if (item) {
                return ((item.FULL_NAME ? item.FULL_NAME.toLowerCase().includes(v) : false) ||
                  (item.FULL_NAME ? item.FULL_NAME.toUpperCase().includes(v) : false) ||
                  item.APPROVAL_STATUS.toLowerCase().includes(v) || item.APPROVAL_STATUS.toUpperCase().includes(v)
                )
              }
            },
          )
      })
    },
  },
  data () {
    return {
      isCompanyAdmin: false,
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

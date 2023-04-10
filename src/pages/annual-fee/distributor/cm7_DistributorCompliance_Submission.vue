<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">
        AMSF/ Annual Fees Submissions Year {{ this.$store.state.amsfYear }}
      </h4>
      <br/>
    </div>

    <ClipLoader :loading="LOADING"/>
    <va-card v-if="!LOADING">
      <div class="row justify-content-center">
        <table class="table table-striped">
          <thead>
          <tr>
            <th style="width: 15%">TYPE OF REGISTRATION</th>
            <th style="width: 15%">SUBMISSION</th>
            <th>ACTION BY DISTRIBUTOR</th>
            <th>UPDATE BY</th>
            <th>LATEST UPDATE</th>
            <th>ACTION BY FIMM</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style="width: 15%"> {{ AUM_TYPES.toString() }}</td>
            <td style="width: 15%">
              <router-link  class="text-color" :to="{ name: 'DistributorCompliance-AUM-Submission' }">
                  {{ $t('AUM')}}
                </router-link>
            </td>
            <td>
              {{ AUM_STATUS ? AUM_STATUS.STATUS.toUpperCase() : 'PENDING' }}
            </td>
            <td> {{ AUM_STATUS ? AUM_STATUS.USER_USER_ID : '-' }}</td>
            <td> {{ AUM_STATUS ? AUM_STATUS.LATEST_UPDATE : '-' }}</td>
            <td> {{ AUM_STATUS.FIMM_STATUS.toUpperCase() }} </td>
          </tr>
          <tr>
            <td style="width: 15%"> {{ TSG_TYPES ? TSG_TYPES.toString() : '-' }}</td>
            <td style="width: 15%">
              <router-link  class="text-color" :to="{ name: 'DistributorCompliance-TGS-Submission' }">
                    {{ $t('TOTAL GROSS SALES')}}
                </router-link>
            </td>
            <td>
              {{ TGS_STATUS ? TGS_STATUS.STATUS.toUpperCase() : 'PENDING' }}
            </td>
            <td> {{ TGS_STATUS ? TGS_STATUS.USER_USER_ID : '-' }}</td>
            <td> {{ TGS_STATUS ? TGS_STATUS.LATEST_UPDATE : '-' }}</td>
            <td> {{ TGS_STATUS.FIMM_STATUS.toUpperCase() }} </td>
            
          </tr>
          </tbody>
        </table>
      </div>
      <div class="float-right">
        <button
          :style="{display:'flex','align-items':'center'}"
          @click="submit"
          type="button"
          class="btn btn-primary btn-fill btn-md"
          :disabled="BTN_DISABLE_MODE"
        >
          <ClipLoader :loading="BTN_LOADING" :size="'20px'"/> &nbsp;
          <i class="fa fa-paper-plane"/> &nbsp; Submit
        </button>
      </div>
    </va-card>
  </va-card>
</template>


<script>
  import 'vue-form-generator/dist/vfg.css'
  import { debounce } from 'lodash'
  import * as servicesModule7 from '../../../app/module7/services05'

  export default {

    data () {
      return {
        header: '',
        field: [],
        term: null,
        count: 1,
        RecordCount: null,
        model: {
          TS_PARAM: '',
        },
        BTN_DISABLE_MODE: true,
        formOptions: {
          validateAfterChanged: true,
        },

        AUM_TGS_STATUS: null,
        AUM_TYPES: [],
        TSG_TYPES: [],
        LOADING: false,
        BTN_LOADING: false,

      }
    },

    created () {
      this.getDistributorDetails()
      this.$store.dispatch('getAMSFYearForAnnualFee')
    },

    components: {},

    methods: {
      search: debounce(function (term) {
        this.term = term
        console.log(this.term)
      }, 400),

      submit: async function () {
        const data = new FormData()
        data.append('SUB_TYPE', 'COMP_MANAGER')
        try {
          const response = await servicesModule7.updateSubmission(data)
          this.getDistributorDetails()
        } catch (error) {
          console.log(error)
        }
      },

      async getDistributorDetails () {
        try {
          this.LOADING = true
          const response = await servicesModule7.getDistributorDetails('FUND_VALUE_APPROVAL_DIST_COMP_OFFICER')
          this.AUM_TGS_STATUS = response.data.aumTgsStatus
          this.BTN_DISABLE_MODE = response.data.btnDisableMode
          const AUM = ['UTMC', 'PRP']
          response.data.data.forEach(x => {
            if (AUM.includes(x.DIST_TYPE_NAME)) {
              this.AUM_TYPES.push(x.DIST_TYPE_NAME)
            } else {
              this.TSG_TYPES.push(x.DIST_TYPE_NAME)
            }
          })
          this.LOADING = false
        } catch (e) {
          this.LOADING = false
        }

      },

      async viewAUMRecord (data) {
        this.$router.push({
          name: 'DistributorCompliance-AUM-Submission',
        })
      },

      async viewTGSRecord (data) {
        this.$router.push({
          name: 'DistributorCompliance-TGS-Submission',
        })
      },

    },

    computed: {
      AUM_STATUS () {
        if (!this.AUM_TGS_STATUS) {
          return
        }
        return this.AUM_TGS_STATUS.filter(x => {
          return x.ACTION_FOR === 'AUM'
        })[0]
      },
      TGS_STATUS () {
        if (!this.AUM_TGS_STATUS) {
          return
        }
        return this.AUM_TGS_STATUS.filter(x => {
          return x.ACTION_FOR === 'TGS'
        })[0]
      },
      BOTH_COMPLETED () {
        if (!this.AUM_TGS_STATUS) {
          return
        }
        return this.AUM_TGS_STATUS.every(x => {
          return x.TASK_ID === 38
        })
      }
    },

  }
</script>
<style lang="scss">
  .va-data-table__vuetable th.sortable {
    color: #34495e !important;
  }

  .va-table th,
  .content table th {
    text-transform: uppercase;
    color: #34495e !important;
    border-bottom: 2px solid #34495e;
  }

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

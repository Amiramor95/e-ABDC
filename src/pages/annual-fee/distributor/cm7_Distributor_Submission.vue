<template>
  <va-card>
    <h5 slot="header" class="card-title">
      AMSF/ Annual Fees Submission Year {{ this.$store.state.amsfYear }}
    </h5>
    <div>
      <br/>
      <br/>
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
                <router-link  class="text-color" :to="{ name: 'distributor-AUM-Submission' }">
                  {{ $t('AUM')}}
                </router-link>
              </td>
              <td>
                {{  AUM_STATUS.STATUS.toUpperCase() }}
              </td>
              <td> {{  AUM_STATUS.USER_USER_ID  }}</td>
              <td> {{  AUM_STATUS.LATEST_UPDATE }}</td>
              <td> {{  AUM_STATUS.FIMM_STATUS.toUpperCase() }} </td>
            </tr>
            <tr>
              <td style="width: 15%"> {{ TSG_TYPES.toString() }}</td>
              <td style="width: 15%">
                <router-link class="text-color" :to="{ name: 'distributor-TGS-Submission' }">{{ $t('TOTAL GROSS SALES') }}
                </router-link>
              </td>
              <td>
                {{  TGS_STATUS.STATUS.toUpperCase() }}
              </td>
              <td> {{  TGS_STATUS.USER_USER_ID  }}</td>
              <td> {{  TGS_STATUS.LATEST_UPDATE  }}</td>
              <td>  {{  TGS_STATUS.FIMM_STATUS.toUpperCase()  }} </td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="float-right">
          <button
            :style="{display:'flex','align-items':'center'}"
            @click="saveAMFSFeeSubmission"
            type="button"
            class="btn btn-primary btn-fill btn-md"
            :disabled="SUBMIT_BTN_DISABLE_MODE"
          >
            <ClipLoader :loading="BTN_LOADING" :size="'20px'"/> &nbsp;
            <i class="fa fa-paper-plane"/> &nbsp; Submit
          </button>

        </div>
      </va-card>
      <br/>
      <br/>
    </div>
  </va-card>
</template>

<script>
  import * as servicesModule7 from '../../../app/module7/services05'

  export default {
    data () {
      return {
        LOADING: false,
        BTN_LOADING: false,
        DISTRIBUTOR_DETAILS: [],
        AUM_TYPES: [],
        TSG_TYPES: [],
        AUM_TGS_STATUS: null,
        SUBMIT_BTN_DISABLE_MODE:true
      }
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
    created () {
      this.getDistributorDetail()
      this.$store.dispatch('getAMSFYearForAnnualFee')
    },
    methods: {
      async getDistributorDetail () {
        this.LOADING = true
        try {
          const response = await servicesModule7.getDistributorDetails()
          this.DISTRIBUTOR_DETAILS = response.data.data
          this.AUM_TGS_STATUS = response.data.aumTgsStatus
          this.SUBMIT_BTN_DISABLE_MODE = response.data.btnDisableMode
          this.filterDistTypeName()
          this.LOADING = false
        } catch (e) {
          this.LOADING = false
        }
      },

      async saveAMFSFeeSubmission () {
        try {
          this.BTN_LOADING = true
          const res = await servicesModule7.saveAMFSAnnualFeeSubmission({})
          if (res.status === 200) {
            this.BTN_LOADING = false
            this.$toast.success('AMSF/Annual Fees Submission successfully submit.')
            this.getDistributorDetail()
          } else {
            this.$toast.error('AMSF/Annual Fees Submission got problem.')
          }
        } catch (e) {
          this.BTN_LOADING = false
          this.$toast.error('AMSF/Annual Fees Submission got problem.')
        }

      },

      filterDistTypeName () {
        const AUM = ['UTMC', 'PRP']
        this.DISTRIBUTOR_DETAILS.forEach(x => {
          if (AUM.includes(x.DIST_TYPE_NAME)) {
            this.AUM_TYPES.push(x.DIST_TYPE_NAME)
          } else {
            this.TSG_TYPES.push(x.DIST_TYPE_NAME)
          }
        })
      },
    },
  }
</script>

<style scoped>
  .icon-flex,
  .icon-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .icon-wrapper {
    border-radius: 50%;
    overflow: hidden;
    border: 1px solid blue;
    font-size: 2rem;
    width: 80px;
    height: 80px;
  }

  .icon-wrapper i {
    color: blue;
  }

  .icon-wrapperConsultant {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .icon-wrapperBoth {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .icon-wrapperBoth {
    border-radius: 50%;
    overflow: hidden;
    border: 1px solid #6600ff;
    font-size: 2rem;
    width: 80px;
    height: 80px;
  }

  .icon-wrapperBoth i {
    color: #6600ff;
  }
</style>

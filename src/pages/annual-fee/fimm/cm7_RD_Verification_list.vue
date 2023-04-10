<template>
  <va-card>
    <h5 slot="header" class="card-title">AMSF/ ANNUAL FEES SUBMISSION YEAR {{ this.$store.state.amsfYear }} </h5>
    <div>
      <br/>
      <br/>
      <va-card>
        <div class="row justify-content-center">
          <table class="table table-striped">
            <thead>
            <tr>
              <th>NO</th>
              <th style="width: 15%">DISTRIBUTOR NAME</th>
              <th style="width: 15%">DATE SUBMISSION</th>
              <th style="width: 15%">AMSF</th>
              <th style="width: 15%">ANNUAL FEES</th>
              <th style="width: 15%">TOTAL CONSULTANT</th>
              <th>STATUS</th>
            </tr>

            </thead>
           <tbody v-if="!LOADING">
            <tr v-for="(ROW,INDEX) in SUBMISSION_DETAIL">
              <td> {{ INDEX + 1 }}</td>
              <td style="width: 15%">{{ ROW.DIST_NAME }}</td>
              <td style="width: 15%"> 10 Dec 2020 </td>

              <td style="width: 15%">
                <span v-if="!ROW.ACTION_INFO.aum.entry">
                      -
                </span>

                <span v-else>
                  <router-link class="text-color" :to="{ name: 'AnnualFee-RD-AUMVerification-list', params:{DIST_ID:ROW.DIST_ID} }">
                      {{ ROW.ACTION_INFO.aum.showStatus }}
                  </router-link>
                </span>
              </td>

              <td style="width: 15%">
                <span v-if="!ROW.ACTION_INFO.tgs.entry">
                  -
                </span>

                <span v-else>
                  <router-link class="text-color" :to="{ name: 'AnnualFee-RD-TGSVerification-list', params:{DIST_ID:ROW.DIST_ID} }">
                    {{ ROW.ACTION_INFO.tgs.showStatus }}
                  </router-link>
                </span>

              </td>

              <td style="width: 15%">
                <span>
                    <router-link class="text-color" :to="{ name: 'AnnualFee-RD-ConsultantVerification-list', params:{DIST_ID:ROW.DIST_ID} }">
                      {{ ROW.ACTION_INFO.consultant_info.showStatus }}
                    </router-link>
                </span>
              </td>

              <td> {{ MAIN_PAGE_DETAIL ? MAIN_PAGE_DETAIL.TS_PARAM : null }}</td>

            </tr>
            </tbody>
            <tbody v-else>
                <tr>
                   <td colspan="7">
                       <ClipLoader :loading="LOADING"></ClipLoader>
                   </td>
                </tr>
            </tbody>
          </table>

        </div>
        <div class="float-right">
          <button @click="verify" :disabled="!IS_VERIFY_BUTTON_ACTIVE" type="button"
                  class="btn btn-primary btn-fill btn-md">
            <i class="fa fa-paper-plane"/> &nbsp; Verify
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
import { setTimeout } from 'timers'

  export default {
    data () {
      return {
        SUBMISSION_DETAIL: [],
        MAIN_PAGE_DETAIL: null,
        LOADING:false
      }
    },
    created () {
      this.getSubmissionDetail()
      this.$store.dispatch('getAMSFYearForAnnualFee')
    },
    computed: {
      SUBMISSION_DETAILS () {
        return this.SUBMISSION_DETAIL;
      },

      IS_VERIFY_BUTTON_ACTIVE () {
        return false
      },
    },

    methods: {
      manipulateStatus (rowData) {
        if (!rowData.STATUS) {
          return
        }
        return rowData.STATUS.split(',')
      },

      async getSubmissionDetail () {
        this.LOADING = true
        const response = await servicesModule7.getAmfsSubmissionDetailFromFimm({
          MODULE_NAME:'ANNUAL_FEE_VERIFICATION_RD'
        })
        this.SUBMISSION_DETAIL = response.data.data
        this.MAIN_PAGE_DETAIL = response.data.verificationStatus
        this.LOADING = false
      },

      async verify () {
        const response = await servicesModule7.postRdSubmissionVerification({
          LOG_INFO: 'ANNUAL_FEE_VERIFICATION_RD_SUBMISSION',
          MODULE_NAME : 'ANNUAL_FEE_VERIFICATION_RD'
        })
        if (response.status === 200) {
          this.getSubmissionDetail()
          this.$toast.success('RD Verification process completed successfully.')

        }
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

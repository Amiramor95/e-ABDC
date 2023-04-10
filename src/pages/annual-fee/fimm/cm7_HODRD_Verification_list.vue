
<template>
  <va-card>
    <h5 slot="header" class="card-title">AMSF/ ANNUAL FEES SUBMISSION YEAR  {{ this.$store.state.amsfYear }}</h5>
    <div>
      <br/>
      <br/>
      <va-card>
        <div class="row justify-content-center">
        <table class="table table-striped">
          <thead>
            <tr>
            <th >NO</th>
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
                <td > {{ INDEX + 1}} </td>

                <td style="width: 15%" > {{ ROW.DIST_NAME}} </td>

                <td style="width: 15%" > 10 Dec 2021 </td>

                <td style="width: 15%">
                   <span v-if="!ROW.ACTION_INFO.aum.entry">
                     -
                   </span>
                   <span v-else>
                      <router-link class="text-color" :to="{ name: 'AnnualFee-HODRD-AUMVerification-list',params:{DIST_ID:ROW.DIST_ID} }">
                         {{ ROW.ACTION_INFO.aum.showStatus }}
                      </router-link>
                   </span>
                </td>
                <td style="width: 15%"> 
                   <span v-if="!ROW.ACTION_INFO.tgs.entry">
                     -
                   </span>

                   <span v-else>
                      <router-link class="text-color" :to="{ name: 'AnnualFee-HODRD-TGSVerification-list',params:{DIST_ID:ROW.DIST_ID} }">
                        {{ ROW.ACTION_INFO.tgs.showStatus }}
                      </router-link>
                   </span>
                  
                </td>

                <td style="width: 15%"> 
                   <span>
                     <router-link class="text-color" :to="{ name: 'AnnualFee-HODRD-ConsultantVerification-list', params:{DIST_ID:ROW.DIST_ID} }">
                         {{ ROW.ACTION_INFO.consultant_info.showStatus }}
                      </router-link>
                   </span
                </td>
                <td> {{ MAIN_PAGE_DETAIL ? MAIN_PAGE_DETAIL.TS_PARAM : null }} </td>
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
            <button @click="verify" :disabled="!IS_VERIFY_BUTTON_ACTIVE" type="button" class="btn btn-primary btn-fill btn-md">
              <i class="fa fa-paper-plane" /> &nbsp; Verify
            </button>
        </div>

      <div class="col-4">
         <h5>  Generate Calculation For Specific Distributor </h5>
          <form class="form-row">
              <select v-model="SELECTED_DISTRIBUTOR" class="form-control">
              <option value="">  Select Option  </option>
              <option value="2"> RHB ASSET MANAGEMENT SDN BHD </option>
              <option value="130"> PUBLIC MUTUAL BERHAD </option>
              <option value="139"> PRINCIPAL ASSET MANAGEMENT BERHAD </option>
              <option value="151"> AMBANK (M) BERHAD </option>
              <option value="408"> Company 10 Sdn Bhd </option>
              <option value="404"> Company 9 Sdn Bhd </option>
              <option value="403"> BLUEPRINT PLANNING SDN BHD </option>
              <option value="402"> Company 7 Sdn Bhd </option>
              <option value="401"> OCBC AL-AMIN BANK BERHAD </option>
              <option value="400"> AIA PENSION AND ASSET MANAGEMENT SDN. BHD. </option>
              <option value="406"> PUBLIC BANK BERHAD </option>
              <option value="100"> PHILLIP MUTUAL BERHAD </option>
              <option value="399"> AMFUNDS MANAGEMENT BERHAD </option>
              <option value="395"> MAYBANK ASSET MANAGEMENT SDN BHD </option>
            </select>
            <br> <br>
            <select v-model="METHOD" class="form-control"> 
                <option value=""> Select Option </option>
                <option value="1"> 1 </option>
                <option value="2"> 2 </option>
                <option value="3"> 3 </option>
                <option value="4"> 4 </option>
                <option value="5"> 5 </option>
                <option value="6"> 6 </option>
                <option value="7"> 7 </option>
                <option value="8"> 8 </option>
                <option value="9"> 9 </option>
                <option value="10"> 10 </option>
            </select>
              <br> <br>
            <button type="button" @click="saveSample" class="btn btn-info"> CAL RESULT </button> 
          </form>  
          
      </div>
      <div class="col-8">
             <pre> 
                  {{ outputRes }}
             </pre>
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
        SUBMISSION_DETAIL: [],
        MAIN_PAGE_DETAIL: null,

        SELECTED_DISTRIBUTOR:'',
        METHOD:'',
        outputRes:'',
        LOADING:false
      }
    },
    created () {
      this.getSubmissionDetail()
      this.$store.dispatch('getAMSFYearForAnnualFee')
    },
    computed: {
      SUBMISSION_DETAILS () {
          return false;
      },
      IS_VERIFY_BUTTON_ACTIVE () {
        let status = []
        const SUBMISSION_DETAILS = this.SUBMISSION_DETAIL.map(x => {
          return {
            ...x,
            SHOW_STATUS: x.STATUS ? x.STATUS.split(',') : null,
          }
        })

        if (SUBMISSION_DETAILS && SUBMISSION_DETAILS.length) {
          SUBMISSION_DETAILS.forEach(x => {
            const inneerStatus = x.SHOW_STATUS ?  (x.SHOW_STATUS.every(y => {
              return y === 'COMPLETED'
            })):false
            status.push(inneerStatus)
          })
          return status.every(x => {
            return x === true
          })
        }
      },
    },
    methods: {
      async saveSample(){
         const DIST_ID  = this.SELECTED_DISTRIBUTOR
         const METHOD = this.METHOD
         const res =  await servicesModule7.getAmsfCalculation(DIST_ID,METHOD)
         this.outputRes = res.data
         
      },
      manipulateStatus (rowData) {
        if (!rowData.STATUS) {
          return
        }
        return rowData.STATUS.split(',')
      },

      async getSubmissionDetail () {
        this.LOADING = true
        const response = await servicesModule7.getAmfsSubmissionDetailFromFimm({
          MODULE_NAME:'ANNUAL_FEE_VERIFICATION_HOD_RD'
        })
        this.SUBMISSION_DETAIL = response.data.data
        this.MAIN_PAGE_DETAIL = response.data.verificationStatus
        this.LOADING = false
      },

      async verify () {
        const response = await servicesModule7.postRdSubmissionVerification({
          LOG_INFO: 'ANNUAL_FEE_VERIFICATION_HOD_RD_SUBMISSION',
          MODULE_NAME:'ANNUAL_FEE_VERIFICATION_HOD_RD'
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

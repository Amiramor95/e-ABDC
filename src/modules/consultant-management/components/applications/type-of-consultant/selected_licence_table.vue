<template>
  <div>
    <!-- Selected License -->
    <div class="selected-license-types">
      <div class="row mt-0 mb-2">
        <div class="col-md-6">
          <h5 class="">Applied License:</h5>
        </div>
        <div class="col-md-6 text-right" v-if="distinctLicenses.length<2">
          <b-button variant="success" @click="showLicenseAddForm">Add License</b-button>
        </div>
      </div>

      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">License Type</th>
            <th scope="col">Distributor</th>
            <th scope="col">Distribution Point</th>
            <th scope="col">Application Type</th>
            <th scope="col">Status</th>
            <!-- <th scope="col"></th> -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="(consultant_license, index) in consultantLicenses" :key="index">
            <td scope="row">{{++index}}</td>
            <td>{{consultant_license.TYPE_FULL_NAME}}</td>
            <td>{{consultant_license.DIST_NAME}}</td>
            <td>
              <span v-if="consultant_license.DIST_POINT_NAME">{{consultant_license.DIST_POINT_NAME}}</span>
              <span v-else class="text-center">-</span>
            </td>
            <td>{{consultant_license.APPLICATION_TYPE_NAME}}</td>
            <td>{{consultant_license.LICENSE_STATUS}}</td>
            <!-- <td v-if="consultantLicenses.length<2">
              <b-button variant="primary">Update</b-button>
            </td> -->
          </tr>
        </tbody>
      </table>
    </div>

    <b-modal v-model="showLicenseAddModal" centered title="">
      <div class="d-block text-center">
        <h5>Sorry, You cannot add new License until your registration is approved!</h5>
      </div>

      <template #modal-footer>
        <b-button variant="primary" @click="showLicenseAddModal = false">OK</b-button>
      </template>
    </b-modal>

    <b-modal v-model="showLicenseCannotAddModal" centered title="">
      <div class="d-block text-center">
        <h5>Sorry, You cannot add more than two License!</h5>
      </div>

      <template #modal-footer>
        <b-button variant="primary" @click="showLicenseCannotAddModal = false">OK</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import * as DistributorAPI from '@/app/module2/services02'
import * as services04module2 from '@/app/module2/services04'
export default {
  props: {
    consultantData: Object,
    license: Object,
    licenseExmeption: Object,
  },

  data () {
    return {
      consultantLicenses: [], // storing API Data
      distinctLicenses: [],
      consultantApprovalData: '',
      showLicenseAddModal: false,
      showLicenseCannotAddModal: false,
    }
  },

  methods: {
    async getDistributorDetails () {
      try {
        const res_distributor = await DistributorAPI.getDistributorDetails(this.license.USER_ID)
        this.consultantLicenses = res_distributor

        const ids = [...new Set(this.consultantLicenses.map(x => x.CONSULTANT_TYPE_ID))]

        const distinctLicenses = ids.map(id => this.consultantLicenses.find(x => x.CONSULTANT_TYPE_ID === id))
        this.distinctLicenses = distinctLicenses
      } catch (error) {
        console.log(error)
      }
    },

    async getConsultantLatestApprovalData () {
      try {
        await services04module2.consultantLatestApprovalData(this.consultantData.CONSULTANT_ID)
          .then((response) => {
            this.consultantApprovalData = response
          })
      } catch (error) {
        console.log(error)
      }
    },

    showLicenseAddForm (event) {
      this.$emit('openLicenseAddFormModel', '')
    },
  },

  created () {
    this.getDistributorDetails()
    this.getConsultantLatestApprovalData()
  },

  mounted () {
  },
}
</script>

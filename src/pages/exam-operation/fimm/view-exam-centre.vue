<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">Centre Details</h4>
      <br />
      <br />
    </div>
    <br/>
    <va-card>
      <div class="col-md-12">
        <table id="new-centre-registration" class="table table-striped">
          <tbody>
            <tr>
              <td style="width: 25%">Centre Name</td>
              <td>:     {{data.CENTRE_NAME}}</td>
            </tr>
            <tr>
              <td>Centre Mode</td>
              <td>:     {{data.CENTRE_MODE}}</td>
            </tr>
            <tr>
              <td><b>Centre Address</b></td>
              <td></td>
            </tr>
            <tr>
              <td>Address</td>
              <td>:     {{data.ADDR_1}}<br>{{data.ADDR_2}}<br>{{data.ADDR_3}}</td>
            </tr>
            <tr>
              <td>Country</td>
              <td>:     {{data.COUNTRY_NAME}}</td>
            </tr>
            <tr>
              <td>State</td>
              <td>:     {{data.STATE_NAME}}</td>
            </tr>
            <tr>
              <td>City</td>
              <td>:     {{data.CITY_NAME}}</td>
            </tr>
            <tr>
              <td>Post Code</td>
              <td>:      {{data.POSTAL_NAME}}</td>
            </tr>
            <tr>
              <td>Google Map Link</td>
              <td>:      {{data.GOOGLE_MAP_LINK}}</td>
            </tr>
            <tr>
              <td>Office Phone Number</td>
              <td>:      {{data.PHONE_NUMBER | phoneNumberFormat}}</td>
            </tr>
            <tr>
              <td>Extension Number</td>
              <td>:      {{data.EXTENSION_NUMBER}}</td>
            </tr>
            <tr>
              <td>Fax Number</td>
              <td>:       {{data.FAX_NUMBER | phoneNumberFormat }}</td>
            </tr>
            <tr>
              <td>Operational Capacity</td>
              <td>:       {{data.OPERATIONAL_CAPACITY}}</td>
            </tr>
            <tr>
              <td>Maximum Capacity</td>
              <td>:       {{data.MAXIMUM_CAPACITY}}</td>
            </tr>
            <tr>
              <td>Status</td>
              <td>:       {{data.STATUS}}</td>
            </tr>
            <tr>
              <td>Day Operating</td>
              <td style="white-space: pre;">:       {{dayOperating}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <br />
    </va-card>
    <br />
    <br />
    <button
      @click="back"
      type="button"
      class="btn btn-primary btn-fill btn-md"
    >
      <i class="fa fa-step-backward" /> &nbsp; Previous
    </button>
    <br />
  </va-card>
</template>
<script>
import Vue from 'vue'
import 'vue-form-generator/dist/vfg.css'
import VueFormGenerator from 'vue-form-generator'
import * as centreManagementServices from '../../../app/module0/exam-booking/centreManagementServices'
Vue.use(VueFormGenerator)

export default {
  mounted () {
    this.capitalize()
    const CENTRE_ID = localStorage.getItem('CENTRE_ID')
    this.centreId = CENTRE_ID
    this.loadData(CENTRE_ID)
  },
  updated () {
    this.capitalize()
    this.removeUnncesarryStyle()
  },
  filters: {
    phoneNumberFormat: function (value) {
      if (!value) return ''
      value = value.toString()
      return '0' + value.charAt(0) + '-' + value.slice(1)
    },
  },
  data () {
    return {
      centreId: '',
      dayOperating: '',
      country: '',
      data: '',
      term: null,
      perPage: '10',
      currentPage: 1,
      count: 1,
      RecordCount: null,
      model: {
      },
    }
  },

  methods: {
    capitalize () {
      const elems = document.querySelectorAll('td')
      let index = 0; const length = elems.length
      for (; index < length; index++) {
        elems[index].style.textTransform = 'uppercase'
        elems[index].style.fontSize = '16px'
      }
    },
    removeUnncesarryStyle () {
      const li = document.querySelectorAll('.multi-row-header ul li')
      for (let i = 0; i < li.length; i++) {
        li[i].style.padding = 0
      }
    },
    async loadData (centreId) {
      this.isLoad = true
      this.data = await centreManagementServices.viewByCentreId({ CENTRE_ID: centreId })
      this.filterDayOperating(this.data.DAYS_OPERATING)
      this.isLoad = false
    },
    filterDayOperating (data) {
      if (data.charAt(0) === '"' && data.charAt(data.length - 1) === '"') {
        data = data.substr(1, data.length - 2).replaceAll(',', '\n  ')
      }
      this.dayOperating = data
    },
    back () {
      this.$router.go(-1)
    },
  },
}
</script>

<style scoped>
   div.v-pagination>ul>li {
    padding-left: 0;
  }
</style>

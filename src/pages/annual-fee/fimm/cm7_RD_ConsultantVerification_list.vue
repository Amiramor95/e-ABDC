<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">Consultant Renewal Year {{ this.$store.state.amsfYear -1 }} </h4>
      <br/>
      <br/>
    </div>
    <br/>
    <va-card>
      <div class="ml-3 col-md-12">
        Distributor Name : {{ DIST_DETAIL ? DIST_DETAIL.USER_USER_ID:'' }}
        <br> <br>
        <table class="table table-striped">
          <tbody>
          <tr v-for="INFO in CONSULTANT_DETAIL">
            <td style="width: 20%">{{ INFO.name }}</td>
            <td>{{ INFO.count }}</td>
          </tr>
          </tbody>
        </table>
      </div>
      <br/>
    </va-card>
    <br/>
    <br/>
    <button @click="back" type="button" class="btn btn-primary btn-fill btn-md">
      <i class="fa fa-step-backward"/> &nbsp; Previous
    </button>

    <div class="float-right">
      <button
        @click="acknowledge"
        type="button"
        class="ml-2 btn btn-success btn-fill btn-md"
      >
        <i class="fa fa-paper-plane"/> &nbsp; COMPLETE
      </button>
    </div>

    <br/>
  </va-card>
</template>

<script>
  import 'vue-form-generator/dist/vfg.css'
  import * as servicesModule7 from '../../../app/module7/services05'

  export default {
    data () {
      return {
        DIST_DETAIL: null,
        CONSULTANT_DETAIL: [],
      }
    },

    created () {
      this.getDestributorDetail()
      this.getConsultantByDistributor()
      this.$store.dispatch('getAMSFYearForAnnualFee')
    },

    components: {},

    methods: {
      async getConsultantByDistributor(){
         const res = await servicesModule7.consultantDetailsByDistributor(this.$route.params.DIST_ID)
         this.CONSULTANT_DETAIL = res.data.data
      },

      handleClick (newTab) {
        this.currentTab = newTab
      },

      async getDestributorDetail () {
        const response = await servicesModule7.distributorDetail(this.$route.params.DIST_ID)
        this.DIST_DETAIL = response.data.data
      },

      back () {
        this.$router.push({
          name: 'AnnualFee-RD-Verification-list',
        })
      },

      async acknowledge () {
        const consDetail = this.CONSULTANT_DETAIL.map(({ attr, count }) => {
          return { [attr]: count }
        })
        const payload = {
          DIST_ID: this.$route.params.DIST_ID,
          DATA: JSON.stringify(consDetail),
          MODULE_NAME:'ANNUAL_FEE_VERIFICATION_RD'
        }
        const res = await servicesModule7.postConsultantDetailByRD(payload)
        if (res.status) {
          this.$toast.success('Consultant data successfully save')
        }
      },
    },

    computed: {},

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

  .default-tabs {
    position: relative;
    margin: 0 auto;

    &__item {
      display: inline-block;
      margin: 0 5px;
      padding: 10px;
      padding-bottom: 8px;
      font-size: 16px;
      letter-spacing: 0.8px;
      color: gray;
      text-decoration: none;
      border: none;
      background-color: transparent;
      border-bottom: 2px solid transparent;
      cursor: pointer;
      transition: all 0.25s;

      &_active {
        color: black;
      }

      &:hover {
        border-bottom: 2px solid gray;
        color: black;
      }

      &:focus {
        outline: none;
        border-bottom: 2px solid gray;
        color: black;
      }

      &:first-child {
        margin-left: 20px;
      }

      &:last-child {
        margin-right: 0;
      }
    }

    &__active-line {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 2px;
      background-color: black;
      transition: transform 0.4s ease, width 0.4s ease;
    }
  }
</style>

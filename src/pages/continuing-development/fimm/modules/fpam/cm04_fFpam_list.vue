<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title"> List of Passing FPAM Modules </h4>
    </div>

     <va-card class="mt-5 col-12">
      <table class="table table-striped">
        <tbody>
          <tr>
            <td style="text-align: center">
              <button
                @click="clickCertified"
                type="button"
                class="ml-2 btn btn-info btn-fill btn-md"
              >
                <i class="fa fa-external-link" />
                &nbsp;Certified Financial Planner <span class="badge badge-light p-2">{{ certified }}</span>
              </button>
            </td>
            <td></td>
          </tr>
          <tr>
            <td style="text-align: center">
              <button
                @click="clickIslamic"
                type="button"
                class="ml-2 btn btn-info btn-fill btn-md"
              >
                <i class="fa fa-external-link" />
                &nbsp;Islamic Financial Planner <span class="badge badge-light p-2">{{ islamic }}</span>
              </button>
            </td>
            <td></td>
          </tr>
          <tr>
            <td style="text-align: center">
              <button
                @click="clickRegistered"
                type="button"
                class="ml-2 btn btn-info btn-fill btn-md"
              >
                <i class="fa fa-external-link" />
                &nbsp;Registered Financial Planner <span class="badge badge-light p-2">{{ registered }}</span>
              </button>
            </td>
            <td></td>
          </tr>
          <tr>
            <td style="text-align: center">
              <button
                @click="clickShariah"
                type="button"
                class="ml-2 btn btn-info btn-fill btn-md"
              >
                <i class="fa fa-external-link" />
                &nbsp;Shariah Registered Financial Planner <span class="badge badge-light p-2">{{ shariah }}</span>
              </button>
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </va-card>
    <br />
    <button
      @click="back"
      type="button"
      class="btn btn-primary btn-fill btn-md"
    >
      <i class="fa fa-step-backward" /> &nbsp; Previous
    </button>
  </va-card>
</template>

<script>
import * as services07Module4 from "../../../../../app/module4/services07";
export default {
  methods: {
    back() {
      this.$router.push('/fimm/approvalFPDistributorList')
    }, // back button

    clickCertified: async function () {
      this.$router.push({
        name: "f-fpamCertifiedModuleList",
        query: {
          fpCategory: 1
        }
      });
    },
    clickIslamic: async function () {
      this.$router.push({
        name: "f-fpamIslamicModuleList",
        query: {
          fpCategory: 2
        }
      });
    },
    clickRegistered: async function () {
      this.$router.push({
        name: "f-fpamRegisteredModuleList",
        query: {
          fpCategory: 3
        }
      });
    },
    clickShariah: async function () {
       this.$router.push({
        name: "f-fpamShariahModuleList",
        query: {
          fpCategory: 4
        }
      });
    },

    counter: async function() {
      this.certified = await services07Module4.countPendingFpCategory(1,this.PROGDATA.COMPANY_ID);
      this.islamic = await services07Module4.countPendingFpCategory(2,this.PROGDATA.COMPANY_ID);
      this.registered = await services07Module4.countPendingFpCategory(3,this.PROGDATA.COMPANY_ID);
      this.shariah = await services07Module4.countPendingFpCategory(4,this.PROGDATA.COMPANY_ID);
    }
  },
  data() {
    return {
      PROGDATA:"",
      certified: 0,
      islamic: 0,
      registered: 0,
      shariah: 0
    }
  },
  mounted() {
    var data = localStorage.getItem("approvalFPModuleList");
    this.PROGDATA = JSON.parse(data);
    this.counter()
  },
};
</script>

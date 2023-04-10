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
                &nbsp;Certified Financial Planner
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
                &nbsp;Islamic Financial Planner
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
                &nbsp;Registered Financial Planner
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
                &nbsp;Shariah Registered Financial Planner
              </button>
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </va-card>
    <br />
    <button @click="back" type="button" class="btn btn-primary btn-fill btn-md">
      <i class="fa fa-step-backward" /> &nbsp; Previous
    </button>
  </va-card>
</template>

<script>
export default {
  methods: {
    back() {
      // this.$router.go(-1);
      this.$router.push('/distributor/d-moduleSelectionList')
    }, // back button
    clickCertified: async function () {
      this.$router.push({
        name:"d-fpamCertifiedModuleList",
        query: {
          fpCategory: 1
        }
      });
    },
    clickIslamic: async function () {
      this.$router.push({
        name:"d-fpamIslamicModuleList",
        query: {
          fpCategory: 2
        }
      });
    },
    clickRegistered: async function () {
      this.$router.push({
        name:"d-fpamRegisteredModuleList",
        query: {
          fpCategory: 3
        }
      });
    },
    clickShariah: async function () {
       this.$router.push({
         name:"d-fpamShariahModuleList",
         query: {
           fpCategory: 4
         }
       });
    },
  },
};
</script>

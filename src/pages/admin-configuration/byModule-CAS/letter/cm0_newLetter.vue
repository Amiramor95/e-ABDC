<template>
  <va-card>
    <loder v-show="isLoader" />
    <div class="row">
      <div class="col-md-6">
        <b><h2 class="card-title">Create New Letter Template</h2></b>
      </div>
      <div class="col-md-6">
        <!-- <div class="form-group"> -->
          <b-badge
              v-b-toggle.collapse-1
              class="mr-1 float-right"
              variant="primary"
            >
              <i class="fa fa-info"></i>
          </b-badge>
        <b-collapse id="collapse-1" class="ml-1">
          <va-card style="background-color: lightgrey;">
            <table>
              <tr>
                <td><b>CONSULTANT_NAME:</b></td>
                <td>To add the chosen Consultant</td>
              </tr>
              <tr>
                <td><b>CONSULTANT_FIMM_NO:</b></td>
                <td>To add the Consultant's FIMM No</td>
              </tr>
              <tr>
                <td><b>CASE_CLASSIFICATION:</b></td>
                <td>To add Case Classification of the Consultants</td>
              </tr>
              <tr>
                <td><b>CASE_REMARK:</b></td>
                <td>To add Remarks of the case</td>
              </tr>
              <tr>
                <td><b>CASE_REASON:</b></td>
                <td>To add Reason of the case</td>
              </tr>
              <tr>
                <td><b>CASE_START_DATE:</b></td>
                <td>To add Start Date</td>
              </tr>
              <tr>
                <td><b>CASE_END_DATE:</b></td>
                <td>To add End Date</td>
              </tr>
            </table>

          </va-card>
        </b-collapse>
        <!-- </div> -->
      </div>
      
    </div>
    </br></br>

    <div class="row">
      <div class="col-md-3">
        <b><h5 class="card-title">Title :</h5></b>
      </div>
      <div class="col-md-9">
        <!-- <div class="form-group"> -->
        <input
          type="text"
          v-model="model.LETTER_TITLE"
          class="form-control form-control-md"
        />
        <!-- </div> -->
      </div>
    </div>
    <br />

    <div class="row">
      <div class="col-md-3">
        <b><h5 class="card-title">Content :</h5></b>
      </div>
      <div id="app" class="col-md-9">
        <vue-editor v-model="model.CAS_LETTER_DESC"></vue-editor>
      </div>
    </div>
    <br />
    <br />

    <button
      @click="back"
      type="button"
      class="float-left btn btn-primary btn-fill btn-md"
    >
      <i class="fa fa-step-backward" /> &nbsp; Previous
    </button>
    <div class="ml-2 float-right">
      <b-button
        @click="save"
        type="button"
        class="ml-2 btn btn-primary btn-fill btn-md"
      >
        <i class="fa fa-paper-plane" /> &nbsp; Save
      </b-button>
    </div>
  </va-card>
</template>

<script>
// Import Bootstrap an BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import { debounce } from "lodash"
import moment from "moment"
import * as servicesModule0 from "../../../../app/module0/services05"
import loder from "../../../request_loader";
export default {

  components: {
    loder
  },
  mounted() {
    // this.getAllEvent();
  },
  methods: {

    async save () {
      this.isLoader = true; // Loader
      const data = new FormData()
      data.append("CAS_LETTER_TITTLE", this.model.LETTER_TITLE)
      data.append("CAS_LETTER_DESC", this.model.CAS_LETTER_DESC)
      const user = localStorage.getItem("user");
      data.append("CREATE_BY",JSON.parse(user).user_id);
      try {
        // eslint-disable-next-line no-unused-vars
        const response = await servicesModule0.createLetter(data);
        this.isLoader = false; // Kill Loader
      } catch (error) {
        //console.log(error)
      }
      this.$router.push("/fimm/letter-list");
    },
    
    back () {
      this.$router.push("/fimm/letter-list");
    },

  },
  data() {
    return {
      // Data for loder
      isLoader: false,
      model: {
        LETTER_TITLE: "",
        CAS_LETTER_DESC: "<h5></h5>",
      },

    }
  }

}
</script>
<style lang="scss">
.bgcolor {
  background-color: white !important;
}
</style>

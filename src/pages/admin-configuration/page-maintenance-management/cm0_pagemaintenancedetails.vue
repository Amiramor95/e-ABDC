<template>
  <va-card>
    <loder v-show="isLoader" />

    <div class="text-center text-danger my-2" v-if="!isDataReady">
      <b-spinner class="align-middle"></b-spinner>
      <strong>Loading...</strong>
    </div>
    <div v-else >
      <h4 slot="header" class="card-title">
        Page Maintenance Detail
      </h4>
      <br />
      <div class="row">
        <div class="col-md-3">
          <b><h5 class="card-title">Start Date <span class="text-danger"> * </span>:</h5></b>
        </div>
        <div class="col-md-9">
          <!-- <div class="form-group"> -->
         {{model.MAINTENANCE_START_DATE}}
          <!-- </div> -->
        </div>
      </div>
      <br/>

      <div class="row">
        <div class="col-md-3">
          <b><h5 class="card-title">End Date <span class="text-danger"> * </span>:</h5></b>
        </div>
        <div class="col-md-9">
          <!-- <div class="form-group"> -->
         {{model.MAINTENANCE_END_DATE}}
          <!-- </div> -->
        </div>
      </div>
      <br/>
      <br/>
      <div class="row">
        <div class="col-md-3">
          <b><h5 class="card-title">Notification Title <span class="text-danger"> * </span>:</h5></b>
        </div>
        <div  class="col-md-9">
          {{model.NOTIFICATION_TITLE}}
        </div>
      </div>
      <br />
      <div class="row">
        <div class="col-md-3">
          <b><h5 class="card-title">Notification Description <span class="text-danger"> * </span>:</h5></b>
        </div>
        <div id="app" class="col-md-9">
         <p class="text-left" v-html="model.NOTIFICATION_DESC"></p>
        </div>
      </div>
      <br />
      <div class="row">
        <div class="col-md-3">
          <b><h5 class="card-title">Audience <span class="text-danger"> * </span>:</h5></b>
        </div>
        <div class="col-md-9">
            {{model.AUDIENCE.SET_PARAM}}
          <!-- <div class="form-group"> -->
        <!-- <multiselect
          v-model="model.AUDIENCE"
          :options="AudienceList"
          placeholder="Select Audience"
          track-by="SET_CODE"
          label="SET_PARAM"
          class="float-left"
        ></multiselect> -->
          <!-- </div> -->
        </div>
      </div>
      <br />
      <br/>
      <br/>
      <div class="row">
        <div class="col-md-3">
          <b><h5 class="card-title">Module Under Maintenance <span class="text-danger"> * </span>:</h5></b>
        </div>
        <div class="col-md-9">
          <div class="row">
           {{model.MAINTENANCE_MODULE}}
          </div>
        </div>
      </div>

      <button
        @click="back"
        type="button"
        class="float-left btn btn-primary btn-fill btn-md"
      >
        <i class="fa fa-step-backward" /> &nbsp; Previous
      </button>

    </div>  
  </va-card>
</template>

<script>
// Import Bootstrap an BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import { debounce } from "lodash"
import moment from "moment"
import Vue from "vue";
Vue.component("field-vfg-functional-date", VfgFunctionalDate);
import VfgFunctionalDate from "../../component/VfgFunctionalCalendar.vue";
import * as servicesModule0 from "../../../app/module0/services02";
import FullCalendar from "@fullcalendar/vue";
import loder from "../../request_loader";

export default {
  mounted() {
   
   this.getPageMaintenanceDetailById();
     // this.getAllAudience();
    // this.getAllModule();
    //  this.getDataById();
  },
  components: {
    FullCalendar,loder
  },
  methods: {

 
    async getPageMaintenanceDetailById () { 
      //console.log('id: ' + this.$route.params.PAGE_MAINTENANCE_ID)
      const response = await servicesModule0.getPageMaintenanceDetailById(
        this.$route.params.PAGE_MAINTENANCE_ID
      );
      this.PAGE_MAINTENANCE_ID = response.PAGE_MAINTENANCE_ID;
      this.model.MAINTENANCE_START_DATE = response.MAINTENANCE_START_DATE;
      this.model.MAINTENANCE_END_DATE = response.MAINTENANCE_END_DATE;
      this.model.NOTIFICATION_DESC = response.NOTIFICATION_DESC;
       this.model.NOTIFICATION_TITLE = response.NOTIFICATION_TITLE;
      this.model.AUDIENCE = {
        SET_CODE: response.AUDIENCE,
        SET_PARAM: response.SET_PARAM,
      };
      this.model.MAINTENANCE_MODULE =response.MAINTENANCE_MODULE,
    //   var arrData = JSON.parse(response.MAINTENANCE_MODULE);
    //   console.log("arrData=",arrData);

    //   this.model.VARIATION.forEach(item => {
    //     if(arrData.includes(item.id)){
    //       item.selected = true;
    //     }
    //   });
      //console.log('Variation Data',this.model.VARIATION);
      this.isDataReady = true; // Kill component loader
    },

    async update(item) {
      this.isLoader = true; // loder before update
       this.VARIATION = [];
        this.model.VARIATION.forEach((element) => {
        if (element.selected == true) {
                this.VARIATION.push(element.id);
              }
      });
      const data = new FormData()
      const user = localStorage.getItem('user')
      data.append("PAGE_MAINTENANCE_ID", this.PAGE_MAINTENANCE_ID);
      data.append("VARIATION", JSON.stringify(this.VARIATION));
      data.append("MAINTENANCE_START_DATE", moment(this.model.MAINTENANCE_START_DATE).format("YYYY-MM-DD"));
      data.append("MAINTENANCE_END_DATE", moment(this.model.MAINTENANCE_END_DATE).format("YYYY-MM-DD"));
       data.append("NOTIFICATION_TITLE", this.model.NOTIFICATION_TITLE);
      data.append("NOTIFICATION_DESC", this.model.NOTIFICATION_DESC);
      data.append("MAINTENANCE_MODULE", JSON.stringify(this.VARIATION));
      data.append("CREATION_BY", JSON.parse(user).user_id);
      data.append("AUDIENCE", this.model.AUDIENCE.SET_CODE);

      try {
        // eslint-disable-next-line no-unused-vars
        const response = await servicesModule0.updatePageMaintenance(data);

        this.isLoader = false; // Kill loder updated
      } catch (error) {
        console.log(error)
      }
    //   this.$router.push("/fimm/maintenance-list");
    },
    getAllAudience: async function () {
      const response = await servicesModule0.getAllAudienceList(
        "AUDIENCE"
      );
      this.AudienceList = response;
    },

    back () {
      this.$router.push("/fimm/maintenance-list");
    },

  },
  data() {
    return {
      // Data for loder
        isLoader: false,
        isDataReady:false,

        AudienceList: [],
        term: null,
        VARIATION: [
        // { id: "1", name: "ALL", selected: false },
        // { id: "2", name: "Administration", selected: false },
        // { id: "3", name: "Distributor Management", selected: false },
        // { id: "4", name: "Consultant Management", selected: false },
        // { id: "5", name: "Fund Management", selected: false },
        // { id: "6", name: "CPD Management", selected: false },
        // { id: "7", name: "Finance Management", selected: false },
        // { id: "8", name: "Annual Fee Management", selected: false },
        ],
        PAGE_MAINTENANCE: '',

      model: {
        PAGE_MAINTENANCE_ID: '',
        MAINTENANCE_START_DATE: "",
        MAINTENANCE_END_DATE: "",
        NOTIFICATION_DESC: '',
         NOTIFICATION_TITLE: '',
        AUDIENCE: '',
        MAINTENANCE_MODULE: '',
        CREATION_BY: '',
        VARIATION: [
        // { id: "1", name: "ALL", selected: false },
        // { id: "2", name: "Administration", selected: false },
        // { id: "3", name: "Distributor Management", selected: false },
        // { id: "4", name: "Consultant Management", selected: false },
        // { id: "5", name: "Fund Management", selected: false },
        // { id: "6", name: "CPD Management", selected: false },
        // { id: "7", name: "Finance Management", selected: false },
        // { id: "8", name: "Annual Fee Management", selected: false },
        ],
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

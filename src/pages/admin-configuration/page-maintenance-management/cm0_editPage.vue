<template>
  <va-card>
    <loder v-show="isLoader" />

    <div class="text-center text-danger my-2" v-if="!isDataReady">
      <b-spinner class="align-middle"></b-spinner>
      <strong>Loading...</strong>
    </div>
    <div v-else >
      <h4 slot="header" class="card-title">
        Edit Page Maintenance
      </h4>
      <br />
      <div class="row">
        <div class="col-md-3">
          <b><h5 class="card-title">Start Date <span class="text-danger"> * </span>:</h5></b>
        </div>
        <div class="col-md-9">
          <!-- <div class="form-group"> -->
          <datepicker
          :value="term"
          @input="dateValidation('start')"
          placeholder="dd-MM-yyyy"
          format="dd MMM yyyy"
          input-class="form-control float-left bgcolor"
          v-model="model.MAINTENANCE_START_DATE"
          :typeable="false"
          ></datepicker>
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
          <datepicker
          :value="term"
          @input="dateValidation('end')"
          placeholder="dd-MM-yyyy"
          format="dd MMM yyyy"
          input-class="form-control float-left bgcolor"
          v-model="model.MAINTENANCE_END_DATE"
          :typeable="false"
          ></datepicker>
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
          <input  type="text" v-model="model.NOTIFICATION_TITLE" class="form-control"  required/>
        </div>
      </div>
      <br />
      <div class="row">
        <div class="col-md-3">
          <b><h5 class="card-title">Notification Description <span class="text-danger"> * </span>:</h5></b>
        </div>
        <div id="app" class="col-md-9">
          <vue-editor v-model="model.NOTIFICATION_DESC"></vue-editor>
        </div>
      </div>
      <br />
      <div class="row">
        <div class="col-md-3">
          <b><h5 class="card-title">Audience <span class="text-danger"> * </span>:</h5></b>
        </div>
        <div class="col-md-9">
          <!-- <div class="form-group"> -->
        <multiselect
          v-model="model.AUDIENCE"
          :options="AudienceList"
          placeholder="Select Audience"
          track-by="SET_CODE"
          label="SET_PARAM"
          class="float-left"
           v-on:input="onChange"
        ></multiselect>
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
            <div class="col-4" v-for="(item, index) in model.VARIATION" :key="index">
              <div class="row mb-2">
                <va-checkbox class="col-2" v-model="item.selected" :disabled="isDisable" />
                <span class="col mt-2 description">
                  {{ item.name }}
                </span>
              </div>
            </div>
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
      <div class="ml-2 float-right">
        <b-button
          @click="update"
          type="button"
          class="btn btn-primary btn-fill btn-md"
        >
          <i class="fa fa-paper-plane" /> &nbsp; Save
        </b-button>
      </div>
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
   
    this.getAllAudience();
    
    //this.getAllModule('fimm');
     this.getDataById();
   
  },
  components: {
    FullCalendar,loder
  },
  methods: {
     onChange(selectedItems){
     // console.log("selectedItems=",selectedItems.SET_CODE);
      if(selectedItems.SET_CODE == 1 || selectedItems.SET_CODE == 2)
      {
        if(selectedItems.SET_CODE == 1){
        this.getAllModule('fimm');
        }
        if(selectedItems.SET_CODE == 2){
        this.getAllModule('DISTRIBUTOR');
        }
        this.isDisable = false;
      }
      else{
        this.getAllModule('fimm');
        this.isDisable = true;
      }

    },
    // Date Validation ===
    dateValidation(type){
      var sDate = this.model.MAINTENANCE_START_DATE;
      var eDate = this.model.MAINTENANCE_END_DATE;
      if(eDate && (sDate > eDate)){
        if(type == 'start'){
          this.model.MAINTENANCE_START_DATE = '';
        }else{
          this.model.MAINTENANCE_END_DATE =  "";
        }
        Vue.$toast.open({
            message: 'Valid date range required !!',
            type: 'error',
        });
      }
    },
      searchDate(date) {
      this.term = moment(date).format("DD MMM y");
      //alert(this.term);
    },

    beforeRouteEnter(to, from, next) {
    next(vm => {
      alert("Notification");
      vm.model.PAGE_MAINTENANCE_ID = to.params.PAGE_MAINTENANCE_ID;
      console.log("event id : " + JSON.stringify(vm.model.PAGE_MAINTENANCE_ID));
      vm.getDataById();
      if (vm.id != undefined) {
        vm.cirTitle =
          "Cancellation of FIMM Examination Sessions on 21 November and 12 December 2020 – Kota Bharu";
        vm.content =
          "<h5>The Federation of Investment Managers Malaysia (FIMM) launched of its first ever full-fledged public service awareness campaign which aims to educate the public on FIMM’s role as a self-regulatory organisation (SRO).Investors interest in Unit Trust (UT) and Private Retirement Scheme (PRS) is one of our top priorities. The timing of this campaign is also very pertinent to the public, as we see more and more people do not mind handing over cash for investments and signing incomplete forms for their convenience, which are against standard practice of UT and PRS investments. Hence, this campaign acts as a platform to educate the public on their rights as an investor and to let people know that FIMM is the authorised regulatory body in charge of managing Unit Trust Companies and their consultant’s code of conduct,” said Dato’ Norazharuddin Abu Talib, the newly appointed Chief Executive Officer of FIMM.</h5>";
        vm.startDate = "2020-12-10";
        vm.endDate = "2020-12-30";
      }
    });
  },
 async getAllModule(data) {
      const response = await servicesModule0.getAllModuleListByType(data);
      this.model.VARIATION = [];
      if(data == 'fimm'){
      response.forEach((element) => {
       this.model.VARIATION.push({'id': element.MANAGE_MODULE_ID, 'name': element.MOD_NAME, selected: false});
      });
      }
     if(data == 'DISTRIBUTOR'){
        response.forEach((element) => {
       this.model.VARIATION.push({'id': element.DISTRIBUTOR_MANAGE_MODULE_ID, 'name': element.DISTRIBUTOR_MOD_NAME, selected: false});
      }); 
      }

       this.model.VARIATION.forEach(item => {
        if(this.arrData.includes(item.id)){
        item.selected = true;
        }
        });
    },
    async getDataById () { 
      //console.log('id: ' + this.$route.params.PAGE_MAINTENANCE_ID)
      let utype = "";
      const response = await servicesModule0.getPageMaintenanceById(
        this.$route.params.PAGE_MAINTENANCE_ID
      );
      if(response.AUDIENCE == 1){
        //this.getAllModule('fimm');
        utype = 'fimm';
        }
        if(response.AUDIENCE == 2){
        //this.getAllModule('DISTRIBUTOR');
         utype = 'DISTRIBUTOR';
        }
      this.PAGE_MAINTENANCE_ID = response.PAGE_MAINTENANCE_ID;
      this.model.MAINTENANCE_START_DATE = response.MAINTENANCE_START_DATE;
      this.model.MAINTENANCE_END_DATE = response.MAINTENANCE_END_DATE;
      this.model.NOTIFICATION_DESC = response.NOTIFICATION_DESC;
       this.model.NOTIFICATION_TITLE = response.NOTIFICATION_TITLE;
      this.model.AUDIENCE = {
        SET_CODE: response.AUDIENCE,
        SET_PARAM: response.SET_PARAM,
      };
     this.arrData = JSON.parse(response.MAINTENANCE_MODULE);
       this.model.VARIATION = [];
  if(utype == 'fimm' || utype == 'DISTRIBUTOR'){
        const response = await servicesModule0.getAllModuleListByType(utype);
     
      if(utype == 'fimm'){
      response.forEach((element) => {
       this.model.VARIATION.push({'id': element.MANAGE_MODULE_ID, 'name': element.MOD_NAME, selected: false});
      });
      }
     if(utype == 'DISTRIBUTOR'){
        response.forEach((element) => {
       this.model.VARIATION.push({'id': element.DISTRIBUTOR_MANAGE_MODULE_ID, 'name': element.DISTRIBUTOR_MOD_NAME, selected: false});
      }); 
      }       
        this.model.VARIATION.forEach(item => {
        if(this.arrData.includes(item.id)){
        item.selected = true;
        }
        });
      
  }    

      if(response.AUDIENCE == 1 || response.AUDIENCE == 2)
      {
       this.isDisable = false;
      }
      else{
        this.isDisable = true;
      }


      

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
      if(this.model.AUDIENCE.SET_CODE == 1 || this.model.AUDIENCE.SET_CODE == 2)
      {
      data.append("MAINTENANCE_MODULE", JSON.stringify(this.VARIATION));
      }
      else{
        data.append("MAINTENANCE_MODULE", JSON.stringify([0]));
      }
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
        isDisable: false,
        AudienceList: [],
        term: null,
        arrData: [],
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

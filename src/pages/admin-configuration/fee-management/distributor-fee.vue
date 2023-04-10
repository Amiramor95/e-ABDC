<template>
  <va-card>
  <loder v-show="isLoader" />

    <div class="text-center text-danger my-2" v-if="!isDataReady">
      <b-spinner class="align-middle"></b-spinner>
      <strong>Loading...</strong>
    </div>

    <div v-else>
      <div class="float-right">
        
        <span
                v-b-tooltip.hover
                title ="New Distributor Fee"
                v-on:click="distributor_fee_add"
                class="badge badge-success float-right"
                ><i class="fa fa-plus"></i
              ></span>
      </div>
       <br>
      <div class="col-lg-10">
        <h4 slot="header">FEE MANAGEMENT</h4>
      </div>
      <br />
      <br />

      <h5>
        <i class="fa fa-bank"></i>&nbsp;&nbsp;
        <b>DISTRIBUTOR FEE</b>
      </h5>
      <hr />
 <div class="row">
        <div class="col-md-3">
          <b><h5 class="card-title float-right">Start Date <span class="text-danger"> * </span>:</h5></b>
        </div>
        <div class="col-md-4">
          <!-- <div class="form-group"> -->
          <datepicker
          :value="term"

          @input="dateValidation('start')"
          placeholder="dd-MM-yyyy"
          format="dd MMM yyyy"
          input-class="form-control float-left bgcolor"
          v-model="model.START_DATE"
          :typeable="false"
          required
          ></datepicker>
          <!-- </div> -->
        </div>
      </div>
      <br/>

      <div class="row">
        <div class="col-md-3">
          <b><h5 class="card-title float-right">End Date <span class="text-danger"> * </span>:</h5></b>
        </div>
        <div class="col-md-4">
          <!-- <div class="form-group"> -->
          <datepicker
          :value="term"

          placeholder="dd-MM-yyyy"
          format="dd MMM yyyy"
          input-class="form-control float-left bgcolor"
          v-model="model.END_DATE"
          :typeable="false"
          @input="dateValidation('end')"
          ></datepicker>
          <!-- </div> -->
        </div>
       
      </div>
          
            <br/>
            <br/>
            <div class="row">
                <div class="col-md-3">
         
        </div>
        <div class="col-md-4">
              <button
                @click="search"
                type="button"
                class="ml-2 btn btn-primary btn-fill btn-md float-right"
                :disabled ="isDisabled"
              >
                <i class="fa fa-search" /> &nbsp; SEARCH
              </button>
        </div>
            </div>
      <div class="ml-5">
            <br />
            <h4>List of Distributor Fee </h4>
            <br/>
            <!-- list -->
            <va-card class="mt-2">
              <va-data-table
                :fields="DistFeeList"
                :data="filteredDistFee"
                :per-page="parseInt(perPage)"
                :datacount="DistFeeCount"
                :dataperpage="parseInt(perPage)"
                clickable
              >
                <template slot="no" slot-scope="row">
                  {{ row.rowIndex + 1 }}
                </template>

                <template slot="actions" slot-scope="props">
                  <h4 class="mt-2">
                    <span
                      class="badge badge-primary mr-1"
                      v-on:click="editDistFee(props.rowData)"
                      
                    >
                      <i class="fa fa-edit"></i
                    ></span>
                    <span
                      class="badge badge-danger mr-1"
                      v-on:click="deleteDistFee(props.rowData)"
                    >
                      <i class="fa fa-trash"></i
                    ></span>
                  </h4>
                </template>
              </va-data-table>
              <br />
              <br/>
            
            </va-card>
            <br/>
            <br/>
      
      </div>

     

      <br />
      <button
          @click="back"
          type="button"
          class="btn btn-primary btn-fill btn-md"
      >
          <i class="fa fa-step-backward" /> &nbsp; Previous
      </button>

    </div>
  </va-card>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import Vue from "vue";
import Vudal from "vudal";
import "vue-form-generator/dist/vfg.css";
import * as servicesModule0 from "../../../app/module0/services02";
import { debounce } from "lodash";
Vue.component("field-vfg-functional-date", VfgFunctionalDate);
import VfgFunctionalDate from "../../component/VfgFunctionalCalendar.vue";
import moment from "moment";
import FullCalendar from "@fullcalendar/vue";
import VueCurrencyInput from 'vue-currency-input';
import loder from "../../request_loader";

export default {
  mounted() {
    // this.getAllmarketingApproach();
    this.getAllDistributorType();
    this.getAllDistFee();
  },
  components: {
    FullCalendar,
    Vudal,loder
  },
  // DATA SCHEMA
  data() {
    return {
      // Data for loder
      isLoader: false,
      isDataReady:false,
      isDisabled:false,

      term: null,
      visibleLogin: false,
      visibleBlockDuration: false,
      visibleBlockDuration2: false,
      perPage: "10",
      perPageOptions: ["4", "6", "10", "20"],
      DistributorTypelist: [],
      AnnualPreviousYear: [],
      DateList: [],
      RnaDateList: [],
      DistFeelist: [],

      MarketingApproachList: [],
      DateCount: null,
      RnaDateCount: null,
      DistFeeCount: null,


      StatusCount: null,
      loading: false,

      count: 1,
      model: {
          DIST_TYPE: '',
          FEE_START_DATE:'',
          FEE_END_DATE: '',
          APPLICATION_FEE: '',
          TAX_APPLICATION_FEE: '',
          TOTAL_APPLICATION_FEE: '',
          ANNUAL_FEE: '',
          TAX_ANNUAL_FEE: '',
          TOTAL_ANNUAL_FEE: '',
           START_DATE: '',
          END_DATE: '',


        editDist: {
         DIST_TYPE: '',
        FEE_START_DATE:'',
        FEE_END_DATE: '',
        APPLICATION_FEE: '',
        TAX_APPLICATION_FEE: '',
        TOTAL_APPLICATION_FEE: '',
        ANNUAL_FEE: '',
        TAX_ANNUAL_FEE: '',
        TOTAL_ANNUAL_FEE: '',
        },
        
        
      },

  

      formOptions: {
        validateAfterChanged: true,
      },
      //5 Module CPD Calculation
      Tab1Schema: {
        groups: [
          {
            // styleClasses: "row mt-2",
            fields: [
              {
                type:  'vueMultiSelect',
                model: 'DIST_TYPE',
                label: 'Distributor Type',
                placeholder: 'SELECT DISTRIBUTOR',
                selectOptions: { multiple: false, key: 'DISTRIBUTOR_TYPE_ID', label: 'DIST_TYPE_NAME', searchable: true},
                values: (model, schema) => { return this.DistributorTypelist},
                required: true,
                validator: "required",
                styleClasses: 'col-md-6',
                
              },
            ],
          },
        ],
        
      },
      Tab2Schema: {
        groups: [
          {
            // styleClasses: "row mt-2",
            fields: [
              {

                labels:"Start Date",
                type: 'vfg-functional-date',
                placeholder: 'Enter Start Date',
                model: 'FEE_START_DATE',
                styleClasses: "col-md-4",
                required: true,
                validator: "required",
                onChanged: function(model) {
                  var start = model.FEE_START_DATE;
                  var end = model.FEE_END_DATE;
                  if(end && start > end){
                    model.FEE_END_DATE = '';
                    Vue.$toast.open({
                        message: 'Please give valid date range',
                        type: 'error',
                    });
                  }
                },
              },
              { 
                labels:"End Date",
                type: 'vfg-functional-date',
                placeholder: 'Enter Start Date',
                model: 'FEE_END_DATE',
                styleClasses: "col-md-6",
                required: true,
                validator: "required",
                onChanged: function(model) {
                  var end = model.FEE_END_DATE;
                  var start = model.FEE_START_DATE;
                  if(start > end){
                    model.FEE_START_DATE = '';
                    Vue.$toast.open({
                        message: 'Please give valid date range',
                        type: 'error',
                    });
                  }
                },
              },
            ],
          },
        ],
        
      },
      Tab3Schema: {
        groups: [
          {
            styleClasses: "row mt-2",
            fields: [
              {
               type: "input",
                inputType: "number",
                model: "APPLICATION_FEE",
                label: "Application Fee (RM) ",
                placeholder: "Enter Fee",
                styleClasses: "col-md-6",
                required: true,
                validator: ["required","number"],
                onChanged: function(model) {
                  var application_fee = model.APPLICATION_FEE;
                  var application_tax = model.TAX_APPLICATION_FEE;
                  model.TOTAL_APPLICATION_FEE = (application_fee + application_tax);
                },
              },
              {
                type: "input",
                inputType: "number",
                model: "TAX_APPLICATION_FEE",
                label: "Tax (RM) ",
                placeholder: "Enter Tax",
                styleClasses: "col-md-6",
                required: true,
                validator: ["required","number"],
                onChanged: function(model) {
                  var application_fee = model.APPLICATION_FEE;
                  var application_tax = model.TAX_APPLICATION_FEE;
                  model.TOTAL_APPLICATION_FEE = (application_fee + application_tax);
                },
              },
              {
                type: "input",
                inputType: "number",
                model: "TOTAL_APPLICATION_FEE",
                label: "Total (RM) ",
                placeholder: "Enter Total",
                styleClasses: "col-md-6",
                required: true,
                readonly: true,
              },
            ],
          },
        ],
        
      },
      Tab4Schema: {
        groups: [
          {
            styleClasses: "row mt-2",
            fields: [
              {
                type: "input",
                inputType: "number",
                model: "ANNUAL_FEE",
                label: "Annual Fee (RM) ",
                placeholder: "Enter Total",
                styleClasses: "col-md-6",
                required: true,
                validator: ["required","number"],
                onChanged: function(model) {
                  var annual_fee = model.ANNUAL_FEE;
                  var annual_tax = model.TAX_ANNUAL_FEE;
                  model.TOTAL_ANNUAL_FEE = (annual_fee + annual_tax);
                },
              },
              {
                type: "input",
                inputType: "number",
                model: "TAX_ANNUAL_FEE",
                label: "Tax (RM) ",
                placeholder: "Enter Total",
                styleClasses: "col-md-6",
                required: true,
                validator: ["required","number"],
                onChanged: function(model) {
                  var annual_fee = model.ANNUAL_FEE;
                  var annual_tax = model.TAX_ANNUAL_FEE;
                  model.TOTAL_ANNUAL_FEE = (annual_fee + annual_tax);
                },
              },
               {
                type: "input",
                inputType: "number",
                model: "TOTAL_ANNUAL_FEE",
                label: "Total (RM) ",
                placeholder: "Enter Total",
                styleClasses: "col-md-6",
                required: true,
                readonly: true,
              },
            ],
          },
        ],
        
      },
      
      

      editDistFeeSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type:  'vueMultiSelect',
                model: 'editDist.DIST_TYPE',
                label: 'DISTRIBUTOR TYPE',
                placeholder: 'SELECT DISTRIBUTOR',
                selectOptions: { multiple: false, key: 'DISTRIBUTOR_TYPE_ID', label: 'DIST_TYPE_NAME', searchable: true},
                values: (model, schema) => { return this.DistributorTypelist},
                required: true,
                validator: 'required',
                styleClasses: 'col-md-12',
                
              },
              {

                labels:"Start Date",
                type: 'vfg-functional-date',
                placeholder: 'Enter Start Date',
                model: 'editDist.FEE_START_DATE',
                noLabel: false,
                styleClasses: "col-md-12",
                required: true,
                validator: "required",
                onChanged: function(model) {
                  var start = model.editDist.FEE_START_DATE;
                  var end = model.editDist.FEE_END_DATE;
                  if(end && start > end){
                    model.editDist.FEE_END_DATE = '';
                    Vue.$toast.open({
                        message: 'Please give valid date range',
                        type: 'error',
                    });
                  }
                },
              },
              { 
                labels:"End Date",
                type: 'vfg-functional-date',
                placeholder: 'Enter Start Date',
                model: 'editDist.FEE_END_DATE',
                 noLabel: false,
                styleClasses: "col-md-12",
                required: true,
                validator: "required",
                onChanged: function(model) {
                  var start = model.editDist.FEE_START_DATE;
                  var end = model.editDist.FEE_END_DATE;
                  if(start > end){
                    model.editDist.FEE_END_DATE = '';
                    Vue.$toast.open({
                        message: 'Please give valid date range',
                        type: 'error',
                    });
                  }
                },
              },
              {
                type: "input",
                inputType: "number",
                model: "editDist.APPLICATION_FEE",
                label: "Application Fee (RM) ",
                placeholder: "Enter Fee",
                styleClasses: "col-md-12",
                required: true,
                validator: ["required","number"],
                onChanged: function(model) {
                  console.log('Model from Edit',model);
                  var application_fee = model.editDist.APPLICATION_FEE;
                  var application_tax = model.editDist.TAX_APPLICATION_FEE;
                  model.editDist.TOTAL_AMOUNT_APPLICATION = (application_fee + application_tax);
                },
                
              },
              {
                type: "input",
                inputType: "number",
                model: "editDist.TAX_APPLICATION_FEE",
                label: "Tax (RM) ",
                placeholder: "Enter Tax",
                styleClasses: "col-md-12",
                required: true,
                validator: ["required","number"],
                onChanged: function(model) {
                  var application_fee = model.editDist.APPLICATION_FEE;
                  var application_tax = model.editDist.TAX_APPLICATION_FEE;
                  model.editDist.TOTAL_AMOUNT_APPLICATION = (application_fee + application_tax);
                },
              },
              {
                type: "input",
                inputType: "number",
                model: "editDist.TOTAL_AMOUNT_APPLICATION",
                label: "Total (RM) ",
                placeholder: "Enter Total",
                styleClasses: "col-md-12",
                required: true,
                validator: ["required","number"],
                readonly:true
              },
              {
                type: "input",
                inputType: "number",
                model: "editDist.ANNUAL_FEE",
                label: "Annual Fee (RM) ",
                placeholder: "Enter Total",
                styleClasses: "col-md-12",
                required: true,
                validator: ["required","number"],
                onChanged: function(model) {
                  var annual_fee = model.editDist.ANNUAL_FEE;
                  var annual_tax = model.editDist.TAX_ANNUAL_FEE;
                  model.editDist.TOTAL_AMOUNT_ANNUAL_FEE = (annual_fee + annual_tax);
                },
              },
              {
                type: "input",
                inputType: "number",
                model: "editDist.TAX_ANNUAL_FEE",
                label: "Tax (RM) ",
                placeholder: "Enter Total",
                styleClasses: "col-md-12",
                required: true,
                validator: ["required","number"],
                onChanged: function(model) {
                  var annual_fee = model.editDist.ANNUAL_FEE;
                  var annual_tax = model.editDist.TAX_ANNUAL_FEE;
                  model.editDist.TOTAL_AMOUNT_ANNUAL_FEE = (annual_fee + annual_tax);
                },
              },
               {
                type: "input",
                inputType: "number",
                model: "editDist.TOTAL_AMOUNT_ANNUAL_FEE",
                label: "Total (RM) ",
                placeholder: "Enter Total",
                styleClasses: "col-md-12",
                required: true,
                validator: ["required","number"],
                readonly:true
              },
            ],
          },
        ],
      },
    };
  },
  methods: {
  back() {
    this.$router.go(-1);
  },
   distributor_fee_add() {
    this.$router.push("/fimm/distributor-fee-add");
    },
    dateValidation(type){
      var sDate = this.model.START_DATE;
      var eDate = this.model.END_DATE;
      if(eDate && (sDate > eDate)){
        if(type == 'start'){
          this.model.START_DATE = '';
        }else{
          this.model.END_DATE =  "";
        }
        this.isDisabled = true;
        Vue.$toast.open({
            message: 'Valid date range required !!',
            type: 'error',
        });
      }
      else{
         this.isDisabled = false;
      }
    },
  // total calculation for app
  getTotal(){
    var application_fee = this.model.APPLICATION_FEE;
    var application_tax = this.model.TAX_APPLICATION_FEE;
    this.model.TOTAL_APPLICATION_FEE = (application_fee + application_tax);
    var annual_fee = this.model.APPLICATION_FEE;
    var annual_tax = this.model.TAX_APPLICATION_FEE;
    this.model.TOTAL_ANNUAL_FEE = (annual_fee + annual_tax);
    console.log('TOTAL', this.model.TOTAL_APPLICATION_FEE,this.model.TOTAL_ANNUAL_FEE );
  },  

  getAllDistributorType: async function () {
      const response = await servicesModule0.getAllDistributorTypeeList();
      this.DistributorTypelist = response;
      // this.CountryCount = this.CountryList.length;
      this.isDataReady = true; // Kill Component loader
    },

    getAllDistFee: async function () {
      const response = await servicesModule0.getAllDistributorFeeList();
      response.forEach(item => {
        item.ANNUAL_FEE = this.format_number(item.ANNUAL_FEE);
        item.APPLICATION_FEE = this.format_number(item.APPLICATION_FEE)
        item.TAX_ANNUAL_FEE = this.format_number(item.TAX_ANNUAL_FEE)
        item.TAX_APPLICATION_FEE = this.format_number(item.TAX_APPLICATION_FEE)
        item.TOTAL_AMOUNT_ANNUAL_FEE = this.format_number(item.TOTAL_AMOUNT_ANNUAL_FEE)
        item.TOTAL_AMOUNT_APPLICATION = this.format_number(item.TOTAL_AMOUNT_APPLICATION)
      });
      this.DistFeelist = response;
      this.DistFeeCount = this.DistFeelist.length;
    },

  format_number: function (value){
   return parseInt(value).toLocaleString()
  },   
    
async search() {
      //  this.isLoader = true; // Loader Before submit
      var sDate = this.model.START_DATE;
      var eDate = this.model.END_DATE;
      if(sDate == "")
      {
         Vue.$toast.open({
            message: 'Please Select Start Date',
            type: 'error',
        });
        return;
      }
       if(eDate == "")
      {
         Vue.$toast.open({
            message: 'Please Select End Date',
            type: 'error',
        });
        return;
      }
        const data = new FormData();
        data.append("START_DATE", moment(this.model.START_DATE).format("YYYY-MM-DD"));
        data.append("END_DATE", moment(this.model.END_DATE).format("YYYY-MM-DD"));
        try {
          //console.log(data);
          const response = await servicesModule0.searchDistFee(data);
          response.forEach(item => {
        item.ANNUAL_FEE = this.format_number(item.ANNUAL_FEE);
        item.APPLICATION_FEE = this.format_number(item.APPLICATION_FEE)
        item.TAX_ANNUAL_FEE = this.format_number(item.TAX_ANNUAL_FEE)
        item.TAX_APPLICATION_FEE = this.format_number(item.TAX_APPLICATION_FEE)
        item.TOTAL_AMOUNT_ANNUAL_FEE = this.format_number(item.TOTAL_AMOUNT_ANNUAL_FEE)
        item.TOTAL_AMOUNT_APPLICATION = this.format_number(item.TOTAL_AMOUNT_APPLICATION)
      });
      this.DistFeelist = response;
      this.DistFeeCount = this.DistFeelist.length;
           this.model.START_DATE = '';
            this.model.END_DATE = '';
          //this.getAllConsFee();
         // this.perPage = 10;
         // this.isLoader = false; // Kill Loader Before submit
        } catch (error) {
          console.log(error);
        }
      
    },

    resetFormData(){
        this.model.DIST_TYPE = '';
        this.model.FEE_START_DATE = '';
        this.model.FEE_END_DATE = '';
        this.model.APPLICATION_FEE = '';
        this.model.TAX_APPLICATION_FEE = '';
        this.model.TOTAL_APPLICATION_FEE = '';
        this.model.ANNUAL_FEE = '';
        this.model.TAX_ANNUAL_FEE = '';
        this.model.TOTAL_ANNUAL_FEE = '';
    },

    async editDistFee(data) {
      this.$router.push({
        name: 'distributor-fee-edit',
        params: { DISTRIBUTOR_FEE_ID: data.DISTRIBUTOR_FEE_ID }
      });
      // this.isLoader = true; // Loader Before submit
      // const response = await servicesModule0.getDistFeeById(
      //   data.DISTRIBUTOR_FEE_ID
      // );
      // this.$modals.simpleModalEditDistFee.$show();
      // this.DISTRIBUTOR_FEE_ID = response.DISTRIBUTOR_FEE_ID;
      // this.DISTRIBUTOR_FEE_ID = response.DISTRIBUTOR_FEE_ID;
      // this.model.editDist = response;
      // this.model.editDist.DIST_TYPE =  {
      //   DISTRIBUTOR_TYPE_ID : response.DISTRIBUTOR_TYPE_ID,
      //   DIST_TYPE_NAME : response.DIST_TYPE_NAME
      // };


      // this.isLoader = false; // Kill Loader Before submit
      // //console.log('Distributor ID',response.DIST_TYPE_ID);
    },
    async updateDistFeeAPI() {
      try {
        if (this.$refs.editForm.validate()) {
          this.isLoader = true; // Loader Before submit
          const data = new FormData();
          data.append(
            "DISTRIBUTOR_FEE_ID",
            this.DISTRIBUTOR_FEE_ID
          );
          data.append("DIST_TYPE_ID", this.model.editDist.DIST_TYPE.DISTRIBUTOR_TYPE_ID);
          data.append("FEE_START_DATE",  moment(this.model.editDist.FEE_START_DATE).format("YYYY-MM-DD"));
          data.append("FEE_END_DATE",  moment(this.model.editDist.FEE_END_DATE).format("YYYY-MM-DD"));
          data.append("APPLICATION_FEE", this.model.editDist.APPLICATION_FEE ?? "");
          data.append("TAX_APPLICATION_FEE", this.model.editDist.TAX_APPLICATION_FEE ?? "");
          data.append("TOTAL_AMOUNT_APPLICATION", this.model.editDist.TOTAL_AMOUNT_APPLICATION ?? "");
          data.append("ANNUAL_FEE", this.model.editDist.ANNUAL_FEE ?? "");
          data.append("TAX_ANNUAL_FEE", this.model.editDist.TAX_ANNUAL_FEE ?? "");
          data.append("TOTAL_AMOUNT_ANNUAL_FEE", this.model.editDist.TOTAL_AMOUNT_ANNUAL_FEE ?? "");
          const response = await servicesModule0.updateDistFee(data);
          this.getAllDistFee();
          this.isLoader = false; // Loader Before submit
        }
      } catch (error) {
        console.log(error);
      }
    },
    async deleteDistFee(data) {
      if (confirm("Are you sure you want to delete?")) {
        this.isLoader = true; // Loader Before submit
        // eslint-disable-next-line no-unused-vars
        const response = await servicesModule0.deleteDistFee(
          data.DISTRIBUTOR_FEE_ID
        );
        this.getAllDistFee();
      this.isLoader = false; // Kill Loader Before submit
      }
    },

    

  

  },

  computed: {
     DistFeeList() {
      return [
        {
          name: "__slot:marker",
          width: "30px",
          dataClass: "text-center",
        },
        {
          name: "__slot:no",
          title: "No",
        },
        {
          name: "FEE_START_DATE",
          title: "START DATE ",
          sortField: "FEE_START_DATE",
        },
        {
          name: "FEE_END_DATE",
          title: "END DATE ",
          sortField: "FEE_END_DATE",
        },
        {
          name: "DIST_TYPE_NAME",
          title: "DISTRIBUTOR TYPE ",
          sortField: "DIST_TYPE_NAME",
        },
        {
          name: "APPLICATION_FEE",
          title: "APPLICATION FEE ",
          sortField: "APPLICATION_FEE",
        },
        {
          name: "TAX_APPLICATION_FEE",
          title: "TAX",
          sortField: "TAX_APPLICATION_FEE",
        },
        {
          name: "TOTAL_AMOUNT_APPLICATION",
          title: "TOTAL ",
          sortField: "TOTAL_AMOUNT_APPLICATION",
        },
        {
          name: "ANNUAL_FEE",
          title: "ANNUAL FEE ",
          sortField: "ANNUAL_FEE",
        },
        {
          name: "TAX_ANNUAL_FEE",
          title: "TAX ",
          sortField: "TAX_ANNUAL_FEE",
        },
        {
          name: "TOTAL_AMOUNT_ANNUAL_FEE",
          title: "TOTAL ",
          sortField: "TOTAL_AMOUNT_ANNUAL_FEE",
        },
        {
          name: "__slot:actions",
          title: "Action",
          dataClass: "justify-content-center",
          width: "10%",
        },
      ];
    },
    filteredDistFee() {
      if (!this.term || this.term.length < 1) {
        return this.DistFeelist;
      }
    },
   
    



  },
};
</script>
<template>
  <va-card>
  <loder v-show="isLoader" />

   

    <div>
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

      <div class="ml-5">
        <!-- Marketing Approach -->
          <va-card>
            <br />
            <vue-form-generator
              :model="model"
              :schema="Tab1Schema"
              :options="formOptions"
              ref="Tab1Form"
            ></vue-form-generator>
            <br/>
            <vue-form-generator
              :model="model"
              :schema="Tab2Schema"
              :options="formOptions"
              ref="Tab2Form"
            ></vue-form-generator>
            <br/>
            <vue-form-generator
              :model="model"
              :schema="Tab3Schema"
              :options="formOptions"
              ref="Tab3Form"
            ></vue-form-generator>
            <br/>
            <vue-form-generator
              :model="model"
              :schema="Tab4Schema"
              :options="formOptions"
              ref="Tab4Form"
            ></vue-form-generator>
            <br/>
            
          </va-card>
          
          
            <br/>
            <br/>
            <div class="float-right">
              <button
                @click="submit"
                type="button"
                class="ml-2 btn btn-primary btn-fill btn-md"
              >
                <i class="fa fa-save" /> &nbsp; SAVE
              </button>
            </div>

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
    //this.getAllDistFee();
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
          APPLICATION_FEE: 0,
          TAX_APPLICATION_FEE: 0,
          TOTAL_APPLICATION_FEE: 0,
          ANNUAL_FEE: 0,
          TAX_ANNUAL_FEE: 0,
          TOTAL_ANNUAL_FEE: 0,


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
                min:0,
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
                min:0,
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
                min:0,
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
    
async submit() {
      let f1 = this.$refs.Tab1Form.validate();
      let f2 = this.$refs.Tab2Form.validate();
      let f3 = this.$refs.Tab3Form.validate();
      let f4 = this.$refs.Tab4Form.validate();
      if (f1 && f2 && f3 && f4) {
        this.isLoader = true; // Loader Before submit
        const data = new FormData();
        data.append("DIST_TYPE_ID", this.model.DIST_TYPE.DISTRIBUTOR_TYPE_ID);
        data.append("FEE_START_DATE",  moment(this.model.FEE_START_DATE).format("YYYY-MM-DD"));
        data.append("FEE_END_DATE",  moment(this.model.FEE_END_DATE).format("YYYY-MM-DD"));
        data.append("APPLICATION_FEE", this.model.APPLICATION_FEE ?? "");
        data.append("TAX_APPLICATION_FEE", this.model.TAX_APPLICATION_FEE ?? "");
        data.append("TOTAL_AMOUNT_APPLICATION", this.model.TOTAL_APPLICATION_FEE ?? "");
        data.append("ANNUAL_FEE", this.model.ANNUAL_FEE ?? "");
        data.append("TAX_ANNUAL_FEE", this.model.TAX_ANNUAL_FEE ?? "");
        data.append("TOTAL_AMOUNT_ANNUAL_FEE", this.model.TOTAL_ANNUAL_FEE ?? "");
        try {
          const response = await servicesModule0.createDistributorFee(data);
          this.resetFormData();
         // this.getAllDistFee();
          this.$router.push(
        "/fimm/distributor-fee"
      );
         // this.isLoader = false; // Kill Loader Before submit
        } catch (error) {
          console.log(error);
        }
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
      this.isLoader = true; // Loader Before submit
      const response = await servicesModule0.getDistFeeById(
        data.DISTRIBUTOR_FEE_ID
      );
      this.$modals.simpleModalEditDistFee.$show();
      this.DISTRIBUTOR_FEE_ID = response.DISTRIBUTOR_FEE_ID;
      this.DISTRIBUTOR_FEE_ID = response.DISTRIBUTOR_FEE_ID;
      this.model.editDist = response;
      this.model.editDist.DIST_TYPE =  {
        DISTRIBUTOR_TYPE_ID : response.DISTRIBUTOR_TYPE_ID,
        DIST_TYPE_NAME : response.DIST_TYPE_NAME
      };


      this.isLoader = false; // Kill Loader Before submit
      //console.log('Distributor ID',response.DIST_TYPE_ID);
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
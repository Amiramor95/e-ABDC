<template>
  <va-card>
  <loder v-show="isLoader" />



    <div >

      <div class="col-lg-10">
        <h4 slot="header">FEE MANAGEMENT</h4>
      </div>
      <br />
      <br />

      <h5>
        <i class="fa fa-bank"></i> &nbsp;&nbsp;
        <b>WAIVER FEE</b>
      </h5>
      <hr />

      <div class="ml-5">
        <!-- Marketing Approach -->
        <div class="">
            <va-card>
          <vue-form-generator
            :model="model"
            :schema="editWaiverFeeSchema"
            :options="formOptions"
          />
            </va-card>
        </div>

        <br/>
        <br/>

       <br/>
            <br/>
            <div class="float-right">
             <button
            @click="updateWaiverFeeAPI"
            type="button"
            class="cancel vudal-btn mr-2 btn btn-primary btn-fill btn-md"
          >
            <i class="fa fa-edit" /> &nbsp; UPDATE
          </button>
            </div>
        <!-- list -->
        
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
     this.getDataById();
    this.getAllWaiverType();
    this.getAllConsType();
    this.getAllExamType();
    //this.getAllWaiverFee();
    this.getAllFeeType();
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
      ConsultantTypelist: [],
      waiverTypelist: [],
      ExamTypelist: [],
      waiverFee: [],
      feeTypelist: [],
    
      WaiverFeeCount: null,


      StatusCount: null,
      loading: false,

      count: 1,
      model: {
          WAIVER_FEE_TYPE_ID: '',
          WAIVER_TYPE_ID : '',
          CONSULTANT_TYPE_ID: '',
          EXAM_TYPE_ID:'',
          EXAM_FEE: '',
          ANNUAL_FEE:'',
          PROCESSING_FEE: '',
          VARIATION_FEE: '',
          AUTHORISATION_CARD_FEE: '',
          TOTAL_FEE: '',
          TAX_FEE: '',
          TOTAL_AMOUNT_FEE: '',
          WAIVER_START_DATE: '',
          WAIVER_END_DATE: '',


        editWaiver: {
          WAIVER_FEE_TYPE_ID:"",
          WAIVER_TYPE_ID : '',
          CONSULTANT_TYPE_ID: '',
          EXAM_TYPE_ID:'',
          EXAM_FEE: 0,
          ANNUAL_FEE:0,
          PROCESSING_FEE: 0,
          VARIATION_FEE: 0,
          AUTHORISATION_CARD_FEE: 0,
          TOTAL_FEE: 0,
          TAX_FEE: 0,
          TOTAL_AMOUNT_FEE: 0,
          WAIVER_START_DATE: '',
          WAIVER_END_DATE: '',
        },
        
        
      },

  

      formOptions: {
        validateAfterChanged: true,
      },
      //5 Module CPD Calculation
      Tab5Schema: {
        groups: [
          {
            // styleClasses: "row mt-2",
            fields: [
              {
                type:  'vueMultiSelect',
                model: 'WAIVER_FEE_TYPE_ID',
                label: 'Fee Type',
                placeholder: 'SELECT FEE TYPE',
                selectOptions: { multiple: false, key: 'FEE_ID', label: 'FEE_NAME', searchable: true},
                values: (model, schema) => { return this.feeTypelist},
                required: true,
                validator: "required",
                styleClasses: 'col-md-6',
                
              },
              {
                type:  'vueMultiSelect',
                model: 'WAIVER_TYPE_ID',
                label: 'Waiver Type',
                placeholder: 'SELECT WAIVER TYPE',
                selectOptions: { multiple: false, key: 'WAIVER_ID', label: 'WAIVER_NAME', searchable: true},
                values: (model, schema) => { return this.waiverTypelist},
                required: true,
                validator: "required",
                styleClasses: 'col-md-6',
                
              },
            ],
          },
        ],
        
      },
      Tab1Schema: {
        groups: [
          {
            // styleClasses: "row mt-2",
            fields: [
              {
                type:  'vueMultiSelect',
                model: 'CONSULTANT_TYPE_ID',
                label: 'Consultant Type',
                placeholder: 'SELECT CONSULTANT',
                selectOptions: { multiple: false, key: 'CONSULTANT_TYPE_ID', label: 'TYPE_NAME', searchable: true},
                values: (model, schema) => { return this.ConsultantTypelist},
                required: true,
                validator: "required",
                styleClasses: 'col-md-6',
                
              },
              {
                type:  'vueMultiSelect',
                model: 'EXAM_TYPE_ID',
                label: 'Exam Type',
                placeholder: 'SELECT EXAM TYPE',
                selectOptions: { multiple: false, key: 'CONSULTANT_EXAM_TYPE_ID', label: 'EXAM_TYPE_NAME', searchable: true},
                values: (model, schema) => { return this.ExamTypelist},
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
                model: 'WAIVER_START_DATE',
                styleClasses: "col-md-6",
                required: true,
                validator: "required",
                onChanged: function(model) {
                  var start = model.WAIVER_START_DATE;
                  var end = model.WAIVER_END_DATE;
                  if(end && start > end){
                    model.WAIVER_END_DATE = '';
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
                placeholder: 'Enter End Date',
                model: 'WAIVER_END_DATE',
                styleClasses: "col-md-6",
                required: true,
                validator: "required",
                onChanged: function(model) {
                  var start = model.WAIVER_START_DATE;
                  var end = model.WAIVER_END_DATE;
                  if(start > end){
                    model.WAIVER_START_DATE = '';
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
                inputType: "Number",
                model: "EXAM_FEE",
                label: "Exam Fee (RM) ",
                placeholder: "Enter Exam Fee",
                styleClasses: "col-md-6",
                required: true,
                validator: ["required","number"],
                onChanged: function(model) {
                  var EXAM_FEE = model.EXAM_FEE;
                  var ANNUAL_FEE = model.ANNUAL_FEE;
                  var PROCESSING_FEE = model.PROCESSING_FEE;
                  var VARIATION_FEE = model.VARIATION_FEE;
                  var AUTHORISATION_CARD_FEE = model.AUTHORISATION_CARD_FEE;
                  model.TOTAL_FEE = (EXAM_FEE + ANNUAL_FEE + PROCESSING_FEE + VARIATION_FEE + AUTHORISATION_CARD_FEE);
                },
              },
              {
                type: "input",
                inputType: "Number",
                model: "ANNUAL_FEE",
                label: "Annual Fee (RM) ",
                placeholder: "Enter Annual Fee",
                styleClasses: "col-md-6",
                required: true,
                validator: ["required","number"],
                onChanged: function(model) {
                  var EXAM_FEE = model.EXAM_FEE;
                  var ANNUAL_FEE = model.ANNUAL_FEE;
                  var PROCESSING_FEE = model.PROCESSING_FEE;
                  var VARIATION_FEE = model.VARIATION_FEE;
                  var AUTHORISATION_CARD_FEE = model.AUTHORISATION_CARD_FEE;
                  model.TOTAL_FEE = (EXAM_FEE + ANNUAL_FEE + PROCESSING_FEE + VARIATION_FEE + AUTHORISATION_CARD_FEE);
                },
              },
              {
                type: "input",
                inputType: "Number",
                model: "PROCESSING_FEE",
                label: "Processing Fee (RM) ",
                placeholder: "Enter Processing Fee",
                styleClasses: "col-md-6",
                required: true,
                validator: ["required","number"],
                onChanged: function(model) {
                  var EXAM_FEE = model.EXAM_FEE;
                  var ANNUAL_FEE = model.ANNUAL_FEE;
                  var PROCESSING_FEE = model.PROCESSING_FEE;
                  var VARIATION_FEE = model.VARIATION_FEE;
                  var AUTHORISATION_CARD_FEE = model.AUTHORISATION_CARD_FEE;
                  model.TOTAL_FEE = (EXAM_FEE + ANNUAL_FEE + PROCESSING_FEE + VARIATION_FEE + AUTHORISATION_CARD_FEE);
                },
              },
              {
                type: "input",
                inputType: "Number",
                model: "VARIATION_FEE",
                label: "Variation Fee (RM) ",
                placeholder: "Enter Variation Fee",
                styleClasses: "col-md-6",
                required: true,
                validator: ["required","number"],
                onChanged: function(model) {
                  var EXAM_FEE = model.EXAM_FEE;
                  var ANNUAL_FEE = model.ANNUAL_FEE;
                  var PROCESSING_FEE = model.PROCESSING_FEE;
                  var VARIATION_FEE = model.VARIATION_FEE;
                  var AUTHORISATION_CARD_FEE = model.AUTHORISATION_CARD_FEE;
                  model.TOTAL_FEE = (EXAM_FEE + ANNUAL_FEE + PROCESSING_FEE + VARIATION_FEE + AUTHORISATION_CARD_FEE);
                },
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
                inputType: "Number",
                model: "AUTHORISATION_CARD_FEE",
                label: "Authorisation Card Fee (RM) ",
                placeholder: "Enter Authorisation Card Fee",
                styleClasses: "col-md-6",
                required: true,
                validator: ["required","number"],
                onChanged: function(model) {
                  var EXAM_FEE = model.EXAM_FEE;
                  var ANNUAL_FEE = model.ANNUAL_FEE;
                  var PROCESSING_FEE = model.PROCESSING_FEE;
                  var VARIATION_FEE = model.VARIATION_FEE;
                  var AUTHORISATION_CARD_FEE = model.AUTHORISATION_CARD_FEE;
                  model.TOTAL_FEE = (EXAM_FEE + ANNUAL_FEE + PROCESSING_FEE + VARIATION_FEE + AUTHORISATION_CARD_FEE);
                },
              },
              {
                type: "input",
                inputType: "Number",
                model: "TOTAL_FEE",
                label: "Total (RM) ",
                placeholder: "Enter Total",
                styleClasses: "col-md-6",
                required: true,
                validator: ["required","number"],
                readonly: true,
              },
               {
                type: "input",
                inputType: "Number",
                model: "TAX_FEE",
                label: "Tax (RM) ",
                placeholder: "Enter Tax",
                styleClasses: "col-md-6",
                required: true,
                validator: ["required","number"],
                onChanged: function(model) {
                  var TAX_FEE = model.TAX_FEE;
                  var TOTAL_FEE = model.TOTAL_FEE;
                  model.TOTAL_AMOUNT_FEE = (TAX_FEE + TOTAL_FEE);
                },
              },
              {
                type: "input",
                inputType: "Number",
                model: "TOTAL_AMOUNT_FEE",
                label: "Total Amount (RM) ",
                placeholder: "Enter Total Amount",
                styleClasses: "col-md-6",
                required: true,
                validator: ["required","number"],
                readonly: true,
              },
            ],
          },
        ],
        
      },
      
      

      editWaiverFeeSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type:  'vueMultiSelect',
                model: 'editWaiver.WAIVER_FEE_TYPE_ID',
                label: 'Fee Type',
                placeholder: 'SELECT FEE TYPE',
                selectOptions: { multiple: false, key: 'FEE_ID', label: 'FEE_NAME', searchable: true},
                values: (model, schema) => { return this.feeTypelist},
                required: true,
                validator: "required",
                styleClasses: 'col-md-12',
                
              },
              // {
              //   type:  'vueMultiSelect',
              //   model: 'editWaiver.WAIVER_TYPE_ID',
              //   label: 'Waiver Type',
              //   placeholder: 'SELECT waiver Type',
              //   selectOptions: { multiple: false, key: 'WAIVER_ID', label: 'WAIVER_NAME', searchable: true},
              //   values: (model, schema) => { return this.waiverTypelist},
              //   required: true,
              //   validator: "required",
              //   styleClasses: 'col-md-12',
                
              // },

              {
                type:  'vueMultiSelect',
                model: 'editWaiver.CONSULTANT_TYPE_ID',
                label: 'Consultant Type',
                placeholder: 'SELECT DISTRIBUTOR',
                selectOptions: { multiple: false, key: 'CONSULTANT_TYPE_ID', label: 'TYPE_NAME', searchable: true},
                values: (model, schema) => { return this.ConsultantTypelist},
                required: true,
                validator: "required",
                styleClasses: 'col-md-12',
                
              },
              {
                type:  'vueMultiSelect',
                model: 'editWaiver.EXAM_TYPE_ID',
                label: 'Exam Type',
                placeholder: 'SELECT EXAM TYPE',
                selectOptions: { multiple: false, key: 'CONSULTANT_EXAM_TYPE_ID', label: 'EXAM_TYPE_NAME', searchable: true},
                values: (model, schema) => { return this.ExamTypelist},
                required: true,
                validator: "required",
                styleClasses: 'col-md-12',
                
              },
              {

                labels:"Start Date",
                type: 'vfg-functional-date',
                placeholder: 'Enter Start Date',
                model: 'editWaiver.WAIVER_START_DATE',
                styleClasses: "col-md-12",
                required: true,
                validator: "required",
                onChanged: function(model) {
                  var start = model.editWaiver.WAIVER_START_DATE;
                  var end = model.editWaiver.WAIVER_END_DATE;
                  if(end && start > end){
                    model.editWaiver.WAIVER_END_DATE = '';
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
                placeholder: 'Enter End Date',
                model: 'editWaiver.WAIVER_END_DATE',
                styleClasses: "col-md-12",
                required: true,
                validator: "required",
                onChanged: function(model) {
                  var start = model.editWaiver.WAIVER_START_DATE;
                  var end = model.editWaiver.WAIVER_END_DATE;
                  if(end && start > end){
                    model.editWaiver.WAIVER_START_DATE = '';
                    Vue.$toast.open({
                        message: 'Please give valid date range',
                        type: 'error',
                    });
                  }
                },
              },
              {
               type: "input",
                inputType: "Number",
                model: "editWaiver.EXAM_FEE",
                label: "Exam Fee (RM) ",
                placeholder: "Enter Exam Fee",
                styleClasses: "col-md-12",
                  min:0,
                required: true,
                validator: ["required","number"],
                onChanged: function(model) {
                  var EXAM_FEE = model.editWaiver.EXAM_FEE;
                  var ANNUAL_FEE = model.editWaiver.ANNUAL_FEE;
                  var PROCESSING_FEE = model.editWaiver.PROCESSING_FEE;
                  var VARIATION_FEE = model.editWaiver.VARIATION_FEE;
                  var AUTHORISATION_CARD_FEE = model.editWaiver.AUTHORISATION_CARD_FEE;
                  model.editWaiver.TOTAL_FEE = (EXAM_FEE + ANNUAL_FEE + PROCESSING_FEE + VARIATION_FEE + AUTHORISATION_CARD_FEE);
                  var TAX_FEE = model.editWaiver.TAX_FEE;
                   model.editWaiver.TOTAL_AMOUNT_FEE = (TAX_FEE + TOTAL_FEE);
                },
              },
              {
                type: "input",
                inputType: "Number",
                model: "editWaiver.ANNUAL_FEE",
                label: "Annual Fee (RM) ",
                placeholder: "Enter Annual Fee",
                styleClasses: "col-md-12",
                  min:0,
                required: true,
                validator: ["required","number"],
                onChanged: function(model) {
                  var EXAM_FEE = model.editWaiver.EXAM_FEE;
                  var ANNUAL_FEE = model.editWaiver.ANNUAL_FEE;
                  var PROCESSING_FEE = model.editWaiver.PROCESSING_FEE;
                  var VARIATION_FEE = model.editWaiver.VARIATION_FEE;
                  var AUTHORISATION_CARD_FEE = model.editWaiver.AUTHORISATION_CARD_FEE;
                  model.editWaiver.TOTAL_FEE = (EXAM_FEE + ANNUAL_FEE + PROCESSING_FEE + VARIATION_FEE + AUTHORISATION_CARD_FEE);
                  var TAX_FEE = model.editWaiver.TAX_FEE;
                   model.editWaiver.TOTAL_AMOUNT_FEE = (TAX_FEE + TOTAL_FEE);
                },
              },
              {
                type: "input",
                inputType: "Number",
                model: "editWaiver.PROCESSING_FEE",
                label: "Processing Fee (RM) ",
                placeholder: "Enter Processing Fee",
                styleClasses: "col-md-12",
                  min:0,
                required: true,
                validator: ["required","number"],
                onChanged: function(model) {
                  var EXAM_FEE = model.editWaiver.EXAM_FEE;
                  var ANNUAL_FEE = model.editWaiver.ANNUAL_FEE;
                  var PROCESSING_FEE = model.editWaiver.PROCESSING_FEE;
                  var VARIATION_FEE = model.editWaiver.VARIATION_FEE;
                  var AUTHORISATION_CARD_FEE = model.editWaiver.AUTHORISATION_CARD_FEE;
                  model.editWaiver.TOTAL_FEE = (EXAM_FEE + ANNUAL_FEE + PROCESSING_FEE + VARIATION_FEE + AUTHORISATION_CARD_FEE);
                  var TAX_FEE = model.editWaiver.TAX_FEE;
                   model.editWaiver.TOTAL_AMOUNT_FEE = (TAX_FEE + TOTAL_FEE);
                },
              },
              {
                type: "input",
                inputType: "Number",
                model: "editWaiver.VARIATION_FEE",
                label: "Variation Fee (RM) ",
                placeholder: "Enter Variation Fee",
                styleClasses: "col-md-12",
                  min:0,
                required: true,
                validator: ["required","number"],
                onChanged: function(model) {
                  var EXAM_FEE = model.editWaiver.EXAM_FEE;
                  var ANNUAL_FEE = model.editWaiver.ANNUAL_FEE;
                  var PROCESSING_FEE = model.editWaiver.PROCESSING_FEE;
                  var VARIATION_FEE = model.editWaiver.VARIATION_FEE;
                  var AUTHORISATION_CARD_FEE = model.editWaiver.AUTHORISATION_CARD_FEE;
                  model.editWaiver.TOTAL_FEE = (EXAM_FEE + ANNUAL_FEE + PROCESSING_FEE + VARIATION_FEE + AUTHORISATION_CARD_FEE);
                  var TAX_FEE = model.editWaiver.TAX_FEE;
                   model.editWaiver.TOTAL_AMOUNT_FEE = (TAX_FEE + TOTAL_FEE);
                },
              },
              {
                type: "input",
                inputType: "Number",
                model: "editWaiver.AUTHORISATION_CARD_FEE",
                label: "Authorisation Card Fee (RM) ",
                placeholder: "Enter Authorisation Card Fee",
                styleClasses: "col-md-12",
                  min:0,
                required: true,
                validator: ["required","number"],
                onChanged: function(model) {
                  var EXAM_FEE = model.editWaiver.EXAM_FEE;
                  var ANNUAL_FEE = model.editWaiver.ANNUAL_FEE;
                  var PROCESSING_FEE = model.editWaiver.PROCESSING_FEE;
                  var VARIATION_FEE = model.editWaiver.VARIATION_FEE;
                  var AUTHORISATION_CARD_FEE = model.editWaiver.AUTHORISATION_CARD_FEE;
                  model.editWaiver.TOTAL_FEE = (EXAM_FEE + ANNUAL_FEE + PROCESSING_FEE + VARIATION_FEE + AUTHORISATION_CARD_FEE);
                  var TAX_FEE = model.editWaiver.TAX_FEE;
                   model.editWaiver.TOTAL_AMOUNT_FEE = (TAX_FEE + TOTAL_FEE);
                },
              },
              {
                type: "input",
                inputType: "Number",
                model: "editWaiver.TOTAL_FEE",
                label: "Total (RM) ",
                placeholder: "Enter Total",
                styleClasses: "col-md-12",
                  min:0,
                required: true,
                validator: ["required","number"],
                readonly:true,
              },
               {
                type: "input",
                inputType: "Number",
                model: "editWaiver.TAX_FEE",
                label: "Tax (RM) ",
                placeholder: "Enter Tax",
                styleClasses: "col-md-12",
                  min:0,
                required: true,
                validator: ["required","number"],
                onChanged: function(model) {
                  var TAX_FEE = model.editWaiver.TAX_FEE;
                  var TOTAL_FEE = model.editWaiver.TOTAL_FEE;
                  model.editWaiver.TOTAL_AMOUNT_FEE = (TAX_FEE + TOTAL_FEE);
                },
              },
              {
                type: "input",
                inputType: "Number",
                model: "editWaiver.TOTAL_AMOUNT_FEE",
                label: "Total Amount (RM) ",
                placeholder: "Enter Total Amount",
                styleClasses: "col-md-12",
                  min:0,
                required: true,
                validator: ["required","number"],
                readonly:true,
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
  getAllWaiverType: async function () {
      const response = await servicesModule0.getAllWaiverTypeList();
      this.waiverTypelist = response;
      // this.CountryCount = this.CountryList.length;
    },
    getAllConsType: async function () {
      const response = await servicesModule0.getAllWaiverConsultantTypeList();
      this.ConsultantTypelist = response;
      // this.CountryCount = this.CountryList.length;
    },
    getAllExamType: async function () {
      const response = await servicesModule0.getAllWaiverExamTypeList();
      this.ExamTypelist = response;
      // this.CountryCount = this.CountryList.length;
    },
    getAllFeeType: async function () {
      const response = await servicesModule0.getAllWaiverFeeTypeList();
      this.feeTypelist = response;
      // this.CountryCount = this.CountryList.length;
    },


    getAllWaiverFee: async function () {
      const response = await servicesModule0.getAllWaiverFeeList();
      response.forEach(item => {
        item.EXAM_FEE = this.format_number(item.EXAM_FEE);
        item.PROCESSING_FEE = this.format_number(item.PROCESSING_FEE)
        item.ANNUAL_FEE = this.format_number(item.ANNUAL_FEE)
        item.VARIATION_FEE = this.format_number(item.VARIATION_FEE)
        item.AUTHORISATION_CARD_FEE = this.format_number(item.AUTHORISATION_CARD_FEE)
        item.TOTAL_FEE = this.format_number(item.TOTAL_FEE)
        item.TAX_FEE = this.format_number(item.TAX_FEE)
        item.TOTAL_AMOUNT_FEE = this.format_number(item.TOTAL_AMOUNT_FEE)
      });
      this.waiverFee = response;
      this.WaiverFeeCount = this.waiverFee.length;
      this.isDataReady = true; // Kill component loder
    },

    format_number: function (value){
      return parseInt(value).toLocaleString()
    },
    

   


    resetFormData(){
      this.model.WAIVER_FEE_TYPE_ID = '';
        this.model.WAIVER_TYPE_ID = '';
        this.model.CONSULTANT_TYPE_ID = '';
        this.model.EXAM_TYPE_ID = '';
        this.model.WAIVER_START_DATE = '';
        this.model.WAIVER_END_DATE = '';
        this.model.EXAM_FEE = '';
        this.model.ANNUAL_FEE = '';
        this.model.PROCESSING_FEE = '';
        this.model.VARIATION_FEE = '';
        this.model.AUTHORISATION_CARD_FEE = '';
        this.model.TOTAL_FEE = '';
        this.model.TAX_FEE = '';
        this.model.TOTAL_AMOUNT_FEE = '';
    },
    async getDataById () { 
     // this.isLoader = true; // Loader Before submit
       //this.perPage = 10;
      // console.log("Perpage=",props.pageSize);
      // this.isLoader = true; // L
      const response = await servicesModule0.getWaiverFeeById(
        this.$route.params.WAIVER_FEE_ID
      );
      
      this.WAIVER_FEE_ID = response.WAIVER_FEE_ID;
      this.model.editWaiver = response;

      this.model.editWaiver.WAIVER_FEE_TYPE_ID = {
        FEE_ID : response.WAIVER_FEE_ID,
        FEE_NAME : response.SET_PARAM,
      };
      // this.model.editWaiver.WAIVER_TYPE_ID = {
      //   WAIVER_ID : response.WAIVER_FEE_TYPE_ID,
      //   WAIVER_NAME : response.SET_TYPE,
      // };
      this.model.editWaiver.CONSULTANT_TYPE_ID = {
        CONSULTANT_TYPE_ID : response.CONSULTANT_TYPE_ID,
        TYPE_NAME : response.TYPE_NAME,
      };
      this.model.editWaiver.EXAM_TYPE_ID = {
        CONSULTANT_EXAM_TYPE_ID : response.CONSULTANT_EXAM_TYPE_ID,
        EXAM_TYPE_NAME : response.EXAM_TYPE_NAME,
      };

      this.$modals.simpleModalEditWaiverFee.$show();

       //this.isLoader = false; // Kill Loader Before submit
      

     // this.$modals.simpleModalEditConsFee.$show();

      //this.isLoader = false; // Kill Loader Before submit
    },

    async editWaiverFee(data) {

       this.isLoader = true; // Loader 
      const response = await servicesModule0.getWaiverFeeById(
        data.WAIVER_FEE_ID
      );
      
      this.WAIVER_FEE_ID = response.WAIVER_FEE_ID;
      this.model.editWaiver = response;

      this.model.editWaiver.WAIVER_FEE_TYPE_ID = {
        FEE_ID : response.WAIVER_FEE_ID,
        FEE_NAME : response.SET_PARAM,
      };
      // this.model.editWaiver.WAIVER_TYPE_ID = {
      //   WAIVER_ID : response.WAIVER_FEE_TYPE_ID,
      //   WAIVER_NAME : response.SET_TYPE,
      // };
      this.model.editWaiver.CONSULTANT_TYPE_ID = {
        CONSULTANT_TYPE_ID : response.CONSULTANT_TYPE_ID,
        TYPE_NAME : response.TYPE_NAME,
      };
      this.model.editWaiver.EXAM_TYPE_ID = {
        CONSULTANT_EXAM_TYPE_ID : response.CONSULTANT_EXAM_TYPE_ID,
        EXAM_TYPE_NAME : response.EXAM_TYPE_NAME,
      };

      this.$modals.simpleModalEditWaiverFee.$show();

       this.isLoader = false; // Kill Loader Before submit

      
    },
    async updateWaiverFeeAPI() {
      try {
        this.isLoader = true; // Loader Before submit
        const data = new FormData();
        data.append("WAIVER_FEE_ID",this.WAIVER_FEE_ID);
        data.append("WAIVER_TYPE_ID", this.model.editWaiver.WAIVER_TYPE_ID.WAIVER_ID);
        data.append("CONSULTANT_TYPE_ID", this.model.editWaiver.CONSULTANT_TYPE_ID.CONSULTANT_TYPE_ID);
        data.append("EXAM_TYPE_ID", this.model.editWaiver.EXAM_TYPE_ID.CONSULTANT_EXAM_TYPE_ID);
        data.append("WAIVER_START_DATE",  moment(this.model.editWaiver.WAIVER_START_DATE).format("YYYY-MM-DD"));
        data.append("WAIVER_END_DATE",  moment(this.model.editWaiver.WAIVER_END_DATE).format("YYYY-MM-DD"));
        data.append("EXAM_FEE", this.model.editWaiver.EXAM_FEE ?? "");
        data.append("ANNUAL_FEE", this.model.editWaiver.ANNUAL_FEE ?? "");
        data.append("PROCESSING_FEE", this.model.editWaiver.PROCESSING_FEE ?? "");
        data.append("VARIATION_FEE", this.model.editWaiver.VARIATION_FEE ?? "");
        data.append("AUTHORISATION_CARD_FEE", this.model.editWaiver.AUTHORISATION_CARD_FEE ?? "");
        data.append("TOTAL_FEE", this.model.editWaiver.TOTAL_FEE ?? "");
        data.append("TAX_FEE", this.model.editWaiver.TAX_FEE ?? "");
        data.append("TOTAL_AMOUNT_FEE", this.model.editWaiver.TOTAL_AMOUNT_FEE ?? "");
        const response = await servicesModule0.updateWaiverFee(data);
       // this.getAllWaiverFee();
         this.$router.push(
        "/fimm/waiver-fee"
      );
        this.isLoader = false; // Kill Loader Before submit
      } catch (error) {
        console.log(error);
      }
    },
    async deleteWaiverFee(data) {
      if (confirm("Are you sure you want to delete?")){
          this.isLoader = true; // Loader Before submit
        // eslint-disable-next-line no-unused-vars
        const response = await servicesModule0.deleteWaiverFee(
          data.WAIVER_FEE_ID
        );
        this.getAllWaiverFee();
        this.isLoader = false; // Kill Loader Before submit
      }
    },

    

  

  },

  computed: {
     WaiverFeeListing() {
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
          name: "FEE_TYPE",
          title: "FEE TYPE",
          sortField: "FEE_TYPE",
        },
        {
          name: "WAIVER_TYPE",
          title: "WAIVER TYPE",
          sortField: "WAIVER_TYPE",
        },
        {
          name: "TYPE_NAME",
          title: "CONSULTANT TYPE ",
          sortField: "TYPE_NAME",
        },
        {
          name: "EXAM_TYPE_NAME",
          title: "EXAM TYPE",
          sortField: "EXAM_TYPE_NAME",
        },
        {
          name: "EXAM_FEE",
          title: "EXAM FEE",
          sortField: "EXAM_FEE",
        },
        {
          name: "ANNUAL_FEE",
          title: "ANNUAL FEE",
          sortField: "ANNUAL_FEE",
        },
        {
          name: "PROCESSING_FEE",
          title: "PROCESSING FEE",
          sortField: "PROCESSING_FEE",
        },
        {
          name: "AUTHORISATION_CARD_FEE",
          title: "AUTHORISATION CARD FEE ",
          sortField: "AUTHORISATION_CARD_FEE",
        },
        {
          name: "TOTAL_FEE",
          title: "TOTAL",
          sortField: "TOTAL_FEE",
        },
        {
          name: "TAX_FEE",
          title: "TAX",
          sortField: "TAX_FEE",
        },
        {
          name: "TOTAL_AMOUNT_FEE",
          title: "TOTAL AMOUNT",
          sortField: "TOTAL_AMOUNT_FEE",
        },
        {
          name: "WAIVER_START_DATE",
          title: "START DATE",
          sortField: "WAIVER_START_DATE",
        },
        {
          name: "WAIVER_END_DATE",
          title: "END DATE",
          sortField: "WAIVER_END_DATE",
        },
        {
          name: "__slot:actions",
          title: "Action",
          dataClass: "justify-content-center",
          width: "200px",
        },
      ];
    },
    filteredWaiverFee() {
      if (!this.term || this.term.length < 1) {
        return this.waiverFee;
      }
    },
   
    



  },
};
</script>
<template>
  <va-card>

    <div>

      <div class="col-lg-10">
        <h4 slot="header">FEE MANAGEMENT</h4>
      </div>
      <br />
      <br />

      <h5>
        <i class="fa fa-bank"></i>&nbsp;&nbsp;
        <b>CONSULTANT FEE EDIT</b>
      </h5>
      <hr />

      <div class="ml-5">
        <!-- Marketing Approach -->
          <va-card>
             <div class=" ">
          <vue-form-generator
            :model="model"
            :schema="editConsFeeSchema"
            :options="formOptions"
          />
        </div>
            
          </va-card>
          
          
            <br/>
            <br/>
            <div class="float-right">
             <button
            @click="updateConsFeeAPI"
            type="button"
            class="cancel vudal-btn mr-2 btn btn-primary btn-fill btn-md"
          >
            <i class="fa fa-edit" /> &nbsp; UPDATE
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
    this.getDataById();
    this.getAllConsType();
    this.getAllExamType();
    //this.getAllConsFee();
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
      perPage: 10,
      currentPage:1,
      //perPageOptions: [4, "6", "10", "20"],
      DistributorTypelist: [],
      AnnualPreviousYear: [],
      ConsultantTypelist: [],
      waiverTypelist: [],
      ExamTypelist: [],
      Conslist: [],
      feeTypelist: [],
    
      ConsFeeCount: null,


      StatusCount: null,
      loading: false,

      count: 1,
      model: {
         
         CONSULTANT_FEE_TYPE_ID: '',
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
          CONS_EFFECTIVE_DATE: 0,


        editCons: {
          CONSULTANT_FEE_TYPE_ID:"",
          CONSULTANT_TYPE_ID: '',
          EXAM_TYPE_ID:'',
          EXAM_FEE: 0,
          ANNUAL_FEE:0,
          PROCESSING_FEE: 0,
          VARIATION_FEE: '',
          AUTHORISATION_CARD_FEE: 0,
          TOTAL_FEE: 0,
          TAX_FEE: 0,
          TOTAL_AMOUNT_FEE: 0,
          CONS_EFFECTIVE_DATE: '',
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
                model: 'CONSULTANT_FEE_TYPE_ID',
                label: 'Fee Type',
                placeholder: 'SELECT FEE TYPE',
                selectOptions: { multiple: false, key: 'FEE_ID', label: 'FEE_NAME', searchable: true},
                values: (model, schema) => { return this.feeTypelist},
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
                min:0,
                validator: ["required","number"],
                onChanged: function(model) {
                  var EXAM_FEE = model.EXAM_FEE;
                  var ANNUAL_FEE = model.ANNUAL_FEE;
                  var PROCESSING_FEE = model.PROCESSING_FEE;
                  var VARIATION_FEE = model.VARIATION_FEE;
                  var AUTHORISATION_CARD_FEE = model.AUTHORISATION_CARD_FEE;
                  var TAX_FEE = model.TAX_FEE;
                  model.TOTAL_FEE = (EXAM_FEE + ANNUAL_FEE + PROCESSING_FEE + VARIATION_FEE + AUTHORISATION_CARD_FEE);
                   model.TOTAL_AMOUNT_FEE = (TAX_FEE +  model.TOTAL_FEE);
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
                 min:0,
                onChanged: function(model) {
                  var EXAM_FEE = model.EXAM_FEE;
                  var ANNUAL_FEE = model.ANNUAL_FEE;
                  var PROCESSING_FEE = model.PROCESSING_FEE;
                  var VARIATION_FEE = model.VARIATION_FEE;
                  var AUTHORISATION_CARD_FEE = model.AUTHORISATION_CARD_FEE;
                  var TAX_FEE = model.TAX_FEE;
                  model.TOTAL_FEE = (EXAM_FEE + ANNUAL_FEE + PROCESSING_FEE + VARIATION_FEE + AUTHORISATION_CARD_FEE);
                   model.TOTAL_AMOUNT_FEE = (TAX_FEE +  model.TOTAL_FEE);
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
                 min:0,
                onChanged: function(model) {
                  var EXAM_FEE = model.EXAM_FEE;
                  var ANNUAL_FEE = model.ANNUAL_FEE;
                  var PROCESSING_FEE = model.PROCESSING_FEE;
                  var VARIATION_FEE = model.VARIATION_FEE;
                  var AUTHORISATION_CARD_FEE = model.AUTHORISATION_CARD_FEE;
                  var TAX_FEE = model.TAX_FEE;
                  model.TOTAL_FEE = (EXAM_FEE + ANNUAL_FEE + PROCESSING_FEE + VARIATION_FEE + AUTHORISATION_CARD_FEE);
                   model.TOTAL_AMOUNT_FEE = (TAX_FEE +  model.TOTAL_FEE);
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
                 min:0,
                onChanged: function(model) {
                  var EXAM_FEE = model.EXAM_FEE;
                  var ANNUAL_FEE = model.ANNUAL_FEE;
                  var PROCESSING_FEE = model.PROCESSING_FEE;
                  var VARIATION_FEE = model.VARIATION_FEE;
                  var AUTHORISATION_CARD_FEE = model.AUTHORISATION_CARD_FEE;
                  var TAX_FEE = model.TAX_FEE;
                  model.TOTAL_FEE = (EXAM_FEE + ANNUAL_FEE + PROCESSING_FEE + VARIATION_FEE + AUTHORISATION_CARD_FEE);
                   model.TOTAL_AMOUNT_FEE = (TAX_FEE +  model.TOTAL_FEE);
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
                 min:0,
                onChanged: function(model) {
                  var EXAM_FEE = model.EXAM_FEE;
                  var ANNUAL_FEE = model.ANNUAL_FEE;
                  var PROCESSING_FEE = model.PROCESSING_FEE;
                  var VARIATION_FEE = model.VARIATION_FEE;
                  var AUTHORISATION_CARD_FEE = model.AUTHORISATION_CARD_FEE;
                  var TAX_FEE = model.TAX_FEE;
                  model.TOTAL_FEE = (EXAM_FEE + ANNUAL_FEE + PROCESSING_FEE + VARIATION_FEE + AUTHORISATION_CARD_FEE);
                   model.TOTAL_AMOUNT_FEE = (TAX_FEE +  model.TOTAL_FEE);
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
                 min:0,
                onChanged: function(model) {
                  var TOTAL_FEE = model.TOTAL_FEE;
                  var TAX_FEE = model.TAX_FEE;
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
      Tab2Schema: {
        groups: [
          {
            // styleClasses: "row mt-2",
            fields: [
              {

                labels:"Effective Date",
                type: 'vfg-functional-date',
                placeholder: 'Enter Effective Date',
                model: 'CONS_EFFECTIVE_DATE',
                styleClasses: "col-md-6",
                required: true,
                validator: "required",
              },
            ],
          },
        ],
        
      },
      
      

      editConsFeeSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type:  'vueMultiSelect',
                model: 'editCons.CONSULTANT_FEE_TYPE_ID',
                label: 'Fee Type',
                placeholder: 'SELECT FEE TYPE',
                selectOptions: { multiple: false, key: 'FEE_ID', label: 'FEE_NAME', searchable: true},
                values: (model, schema) => { return this.feeTypelist},
                required: true,
                validator: "required",
                styleClasses: 'col-md-12',
                
              },
              {
                type:  'vueMultiSelect',
                model: 'editCons.CONSULTANT_TYPE_ID',
                label: 'Consultant Type',
                placeholder: 'SELECT DISTRIBUTOR',
                selectOptions: { multiple: false, key: 'CONSULTANT_TYPE_ID', label: 'TYPE_NAME', searchable: true},
                values: (model, schema) => { return this.ConsultantTypelist},
                styleClasses: 'col-md-12',
                required: true,
                validator: "required",
                
              },
              {
                type:  'vueMultiSelect',
                model: 'editCons.EXAM_TYPE_ID',
                label: 'Exam Type',
                placeholder: 'SELECT EXAM TYPE',
                selectOptions: { multiple: false, key: 'CONSULTANT_EXAM_TYPE_ID', label: 'EXAM_TYPE_NAME', searchable: true},
                values: (model, schema) => { return this.ExamTypelist},
                styleClasses: 'col-md-12',
                required: true,
                validator: "required",
                
              },
              {

                labels:"Effective Date",
                type: 'vfg-functional-date',
                placeholder: 'Enter Effective Date',
                model: 'editCons.CONS_EFFECTIVE_DATE',
                styleClasses: "col-md-12",
                noLabel: true,
                required: true,
                validator: "required",
                  // onChanged: function(model) {
                  //   var EXAM_FEE = model.editCons.EXAM_FEE;
                  //   var ANNUAL_FEE = model.editCons.ANNUAL_FEE;
                  //   var PROCESSING_FEE = model.editCons.PROCESSING_FEE;
                  //   var VARIATION_FEE = model.editCons.VARIATION_FEE;
                  //   var AUTHORISATION_CARD_FEE = model.editCons.AUTHORISATION_CARD_FEE;
                  //   var TAX_FEE = model.editCons.TAX_FEE;
                  //   model.editCons.TOTAL_FEE = (EXAM_FEE + ANNUAL_FEE + PROCESSING_FEE + VARIATION_FEE + AUTHORISATION_CARD_FEE);
                  //    model.editCons.TOTAL_AMOUNT_FEE = (TAX_FEE + model.editCons.TOTAL_FEE);
                  // },
                },
              {
               type: "input",
                inputType: "Number",
                model: "editCons.EXAM_FEE",
                label: "Exam Fee (RM) ",
                placeholder: "Enter Exam Fee",
                styleClasses: "col-md-12",
                required: true,
                validator: ["required","number"],
                 min:0,
                onChanged: function(model) {
                    var EXAM_FEE = model.editCons.EXAM_FEE;
                    var ANNUAL_FEE = model.editCons.ANNUAL_FEE;
                    var PROCESSING_FEE = model.editCons.PROCESSING_FEE;
                    var VARIATION_FEE = model.editCons.VARIATION_FEE;
                    var AUTHORISATION_CARD_FEE = model.editCons.AUTHORISATION_CARD_FEE;
                    var TAX_FEE = model.editCons.TAX_FEE;
                    model.editCons.TOTAL_FEE = (EXAM_FEE + ANNUAL_FEE + PROCESSING_FEE + VARIATION_FEE + AUTHORISATION_CARD_FEE);
                     model.editCons.TOTAL_AMOUNT_FEE = (TAX_FEE + model.editCons.TOTAL_FEE);
                  },
                
              },
              {
                type: "input",
                inputType: "Number",
                model: "editCons.ANNUAL_FEE",
                label: "Annual Fee (RM) ",
                placeholder: "Enter Annual Fee",
                styleClasses: "col-md-12",
                required: true,
                validator: ["required","number"],
                 min:0,
                onChanged: function(model) {
                    var EXAM_FEE = model.editCons.EXAM_FEE;
                    var ANNUAL_FEE = model.editCons.ANNUAL_FEE;
                    var PROCESSING_FEE = model.editCons.PROCESSING_FEE;
                    var VARIATION_FEE = model.editCons.VARIATION_FEE;
                    var AUTHORISATION_CARD_FEE = model.editCons.AUTHORISATION_CARD_FEE;
                    var TAX_FEE = model.editCons.TAX_FEE;
                    model.editCons.TOTAL_FEE = (EXAM_FEE + ANNUAL_FEE + PROCESSING_FEE + VARIATION_FEE + AUTHORISATION_CARD_FEE);
                     model.editCons.TOTAL_AMOUNT_FEE = (TAX_FEE + model.editCons.TOTAL_FEE);
                  },
              
              },
              {
                type: "input",
                inputType: "Number",
                model: "editCons.PROCESSING_FEE",
                label: "Processing Fee (RM) ",
                placeholder: "Enter Processing Fee",
                styleClasses: "col-md-12",
                required: true,
                validator: ["required","number"],
                 min:0,
                onChanged: function(model) {
                    var EXAM_FEE = model.editCons.EXAM_FEE;
                    var ANNUAL_FEE = model.editCons.ANNUAL_FEE;
                    var PROCESSING_FEE = model.editCons.PROCESSING_FEE;
                    var VARIATION_FEE = model.editCons.VARIATION_FEE;
                    var AUTHORISATION_CARD_FEE = model.editCons.AUTHORISATION_CARD_FEE;
                    var TAX_FEE = model.editCons.TAX_FEE;
                    model.editCons.TOTAL_FEE = (EXAM_FEE + ANNUAL_FEE + PROCESSING_FEE + VARIATION_FEE + AUTHORISATION_CARD_FEE);
                     model.editCons.TOTAL_AMOUNT_FEE = (TAX_FEE + model.editCons.TOTAL_FEE);
                  },
               
              },
              {
                type: "input",
                inputType: "Number",
                model: "editCons.VARIATION_FEE",
                label: "Variation Fee (RM) ",
                placeholder: "Enter Variation Fee",
                styleClasses: "col-md-12",
                required: true,
                validator: ["required","number"],
                 min:0,
                  onChanged: function(model) {
                    var EXAM_FEE = model.editCons.EXAM_FEE;
                    var ANNUAL_FEE = model.editCons.ANNUAL_FEE;
                    var PROCESSING_FEE = model.editCons.PROCESSING_FEE;
                    var VARIATION_FEE = model.editCons.VARIATION_FEE;
                    var AUTHORISATION_CARD_FEE = model.editCons.AUTHORISATION_CARD_FEE;
                    var TAX_FEE = model.editCons.TAX_FEE;
                    model.editCons.TOTAL_FEE = (EXAM_FEE + ANNUAL_FEE + PROCESSING_FEE + VARIATION_FEE + AUTHORISATION_CARD_FEE);
                     model.editCons.TOTAL_AMOUNT_FEE = (TAX_FEE + model.editCons.TOTAL_FEE);
                  },
              },
              {
                type: "input",
                inputType: "Number",
                model: "editCons.AUTHORISATION_CARD_FEE",
                label: "Authorisation Card Fee (RM) ",
                placeholder: "Enter Authorisation Card Fee",
                styleClasses: "col-md-12",
                required: true,
                validator: ["required","number"],
                 min:0,
                  onChanged: function(model) {
                    var EXAM_FEE = model.editCons.EXAM_FEE;
                    var ANNUAL_FEE = model.editCons.ANNUAL_FEE;
                    var PROCESSING_FEE = model.editCons.PROCESSING_FEE;
                    var VARIATION_FEE = model.editCons.VARIATION_FEE;
                    var AUTHORISATION_CARD_FEE = model.editCons.AUTHORISATION_CARD_FEE;
                    var TAX_FEE = model.editCons.TAX_FEE;
                    model.editCons.TOTAL_FEE = (EXAM_FEE + ANNUAL_FEE + PROCESSING_FEE + VARIATION_FEE + AUTHORISATION_CARD_FEE);
                     model.editCons.TOTAL_AMOUNT_FEE = (TAX_FEE + model.editCons.TOTAL_FEE);
                  },
              
              },
              {
                type: "input",
                inputType: "Number",
                model: "editCons.TOTAL_FEE",
                label: "Total (RM) ",
                placeholder: "Enter Total",
                styleClasses: "col-md-12",
                required: true,
                validator: ["required","number"],
                readonly:true,
               
              },
               {
                type: "input",
                inputType: "Number",
                model: "editCons.TAX_FEE",
                label: "Tax (RM) ",
                placeholder: "Enter Tax",
                styleClasses: "col-md-12",
                required: true,
                validator: ["required","number"],
                 min:0,
                onChanged: function(model) {
                  var TOTAL_FEE = model.editCons.TOTAL_FEE;
                  var TAX_FEE = model.editCons.TAX_FEE;
                  model.editCons.TOTAL_AMOUNT_FEE = (TAX_FEE + TOTAL_FEE);
                },
               
              },
              {
                type: "input",
                inputType: "Number",
                model: "editCons.TOTAL_AMOUNT_FEE",
                label: "Total Amount (RM) ",
                placeholder: "Enter Total Amount",
                styleClasses: "col-md-12",
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
    emitPageValue(value){
      console.log("current:",value);
   this.$emit('update:current-page', value)
 },
  onlyNumber ($event) {
          let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
          if(keyCode < 48 || keyCode > 57) { // 46 is dot
          $event.preventDefault();
          }
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
      const response = await servicesModule0.getAllWaiverFeeTypeList('FEETYPE');
      this.feeTypelist = response;
      // this.CountryCount = this.CountryList.length;
    },

    getAllConsFee: async function () {
      const response = await servicesModule0.getAllConsFeeList();
      response.forEach(item => {
        item.EXAM_FEE = this.format_number(item.EXAM_FEE)
        item.PROCESSING_FEE = this.format_number(item.PROCESSING_FEE)
        item.TAX_FEE = this.format_number(item.TAX_FEE)
        item.TOTAL_AMOUNT_FEE = this.format_number(item.TOTAL_AMOUNT_FEE)
        item.TOTAL_FEE = this.format_number(item.TOTAL_FEE)
      });
      this.Conslist = response;
      this.ConsFeeCount = this.Conslist.length;
      this.isDataReady = true; // kill Component Loader
    },
    format_number: function (value){
      return parseInt(value).toLocaleString()
    },
    
async submit() {
      var f1 = this.$refs.Tab1Form.validate();
      var f2 = this.$refs.Tab2Form.validate();
      var f3 = this.$refs.Tab3Form.validate();
      var f4 = this.$refs.Tab4Form.validate();
      var f5 = this.$refs.Tab5Form.validate();
      if (f1 && f2 && f3 && f4 && f5 ) {
      //  this.isLoader = true; // Loader Before submit
        const data = new FormData();
        data.append("CONSULTANT_FEE_TYPE_ID", this.model.CONSULTANT_FEE_TYPE_ID.FEE_ID);
        data.append("CONSULTANT_TYPE_ID", this.model.CONSULTANT_TYPE_ID.CONSULTANT_TYPE_ID);
        data.append("EXAM_TYPE_ID", this.model.EXAM_TYPE_ID.CONSULTANT_EXAM_TYPE_ID);
        data.append("CONS_EFFECTIVE_DATE",  moment(this.model.CONS_EFFECTIVE_DATE).format("YYYY-MM-DD"));
        data.append("EXAM_FEE", this.model.EXAM_FEE);
        data.append("ANNUAL_FEE", this.model.ANNUAL_FEE);
        data.append("PROCESSING_FEE", this.model.PROCESSING_FEE);
        data.append("VARIATION_FEE", this.model.VARIATION_FEE);
        data.append("AUTHORISATION_CARD_FEE", this.model.AUTHORISATION_CARD_FEE);
        data.append("TOTAL_FEE", this.model.TOTAL_FEE);
        data.append("TAX_FEE", this.model.TAX_FEE);
        data.append("TOTAL_AMOUNT_FEE", this.model.TOTAL_AMOUNT_FEE);
        try {
          //console.log(data);
          const response = await servicesModule0.createConsFee(data);
          this.resetFormData();
          
          this.getAllConsFee();
         // this.perPage = 10;
         // this.isLoader = false; // Kill Loader Before submit
        } catch (error) {
          console.log(error);
        }
      }
    },

    resetFormData(){
        this.model.CONSULTANT_FEE_TYPE_ID = '';
        this.model.CONSULTANT_TYPE_ID = '';
        this.model.EXAM_TYPE_ID = '';
        this.model.CONS_EFFECTIVE_DATE = '';
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
      const response = await servicesModule0.getConsFeeById(
         this.$route.params.CONSULTANT_FEE_ID
      );
      
      this.CONSULTANT_FEE_ID = response.CONSULTANT_FEE_ID;
      this.model.editCons = response;

      this.model.editCons.CONSULTANT_FEE_TYPE_ID = {
        FEE_ID : response.CONSULTANT_FEE_TYPE_ID,
        FEE_NAME : response.SET_PARAM,
      };
      this.model.editCons.CONSULTANT_TYPE_ID = {
        CONSULTANT_TYPE_ID : response.CONSULTANT_TYPE_ID,
        TYPE_NAME : response.TYPE_NAME,
      };
      this.model.editCons.EXAM_TYPE_ID = {
        CONSULTANT_EXAM_TYPE_ID : response.CONSULTANT_EXAM_TYPE_ID,
        EXAM_TYPE_NAME : response.EXAM_TYPE_NAME,
      };
      

      this.$modals.simpleModalEditConsFee.$show();

      //this.isLoader = false; // Kill Loader Before submit
    },
    async updateConsFeeAPI() {
      try {
       // this.isLoader = true; // Loader Before submit
        const data = new FormData();
        data.append(
          "CONSULTANT_FEE_ID",
          this.CONSULTANT_FEE_ID
        );
        data.append("CONSULTANT_FEE_TYPE_ID", this.model.editCons.CONSULTANT_FEE_TYPE_ID.FEE_ID);
        data.append("CONSULTANT_TYPE_ID", this.model.editCons.CONSULTANT_TYPE_ID.CONSULTANT_TYPE_ID);
        data.append("EXAM_TYPE_ID", this.model.editCons.EXAM_TYPE_ID.CONSULTANT_EXAM_TYPE_ID);
        data.append("CONS_EFFECTIVE_DATE",  moment(this.model.editCons.CONS_EFFECTIVE_DATE).format("YYYY-MM-DD"));
        data.append("EXAM_FEE", this.model.editCons.EXAM_FEE ?? "");
        data.append("ANNUAL_FEE", this.model.editCons.ANNUAL_FEE ?? "");
        data.append("PROCESSING_FEE", this.model.editCons.PROCESSING_FEE ?? "");
        data.append("VARIATION_FEE", this.model.editCons.VARIATION_FEE ?? "");
        data.append("AUTHORISATION_CARD_FEE", this.model.editCons.AUTHORISATION_CARD_FEE ?? "");
        data.append("TOTAL_FEE", this.model.editCons.TOTAL_FEE);
        data.append("TAX_FEE", this.model.editCons.TAX_FEE);
        data.append("TOTAL_AMOUNT_FEE", this.model.editCons.TOTAL_AMOUNT_FEE ?? "");
        const response = await servicesModule0.updateConsFee(data);
        
        
     // this.getAllConsFee();
        // this.perPage = 10;
       // this.isLoader = false; // KIll Loader Before submit
        this.$router.push(
        "/fimm/consultant-fee"
      );
      } catch (error) {
        console.log(error);
      }
    },
    async deleteConsFee(data) {
      if (confirm("Are you sure you want to delete?")) {
       // this.isLoader = true; // Loader Before submit
      // eslint-disable-next-line no-unused-vars
      const response = await servicesModule0.deleteConsFee(
        data.CONSULTANT_FEE_ID
      );
      
      this.getAllConsFee();
       //this.perPage = 10;
     // this.isLoader = false; //Kill Loader Before submit
      }
    },

    

  

  },

  computed: {
     ConsFeelist() {
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
          name: "SET_PARAM",
          title: "FEE TYPE ",
          sortField: "SET_PARAM",
        },
        {
          name: "TYPE_NAME",
          title: "CONSULTANT TYPE ",
          sortField: "TYPE_NAME",
        },
        {
          name: "EXAM_TYPE_NAME",
          title: "EXAM TYPE ",
          sortField: "EXAM_TYPE_NAME",
        },
        {
          name: "EXAM_FEE",
          title: "EXAM FEE ",
          sortField: "EXAM_FEE",
        },
        {
          name: "ANNUAL_FEE",
          title: "ANNUAL FEE ",
          sortField: "ANNUAL_FEE",
        },
        {
          name: "PROCESSING_FEE",
          title: "PROCESSING FEE ",
          sortField: "PROCESSING_FEE",
        },
        {
          name: "AUTHORISATION_CARD_FEE",
          title: "AUTHORISATION CARD FEE ",
          sortField: "AUTHORISATION_CARD_FEE",
        },
        {
          name: "TOTAL_FEE",
          title: "TOTAL ",
          sortField: "TOTAL_FEE",
        },
        {
          name: "TAX_FEE",
          title: "TAX ",
          sortField: "TAX_FEE",
        },
        {
          name: "TOTAL_AMOUNT_FEE",
          title: "TOTAL AMOUNT",
          sortField: "TOTAL_AMOUNT_FEE",
        },
        {
          name: "CONS_EFFECTIVE_DATE",
          title: "EFFECTIVE  DATE",
          sortField: "CONS_EFFECTIVE_DATE",
        },
        {
          name: "__slot:actions",
          title: "Action",
          dataClass: "justify-content-center",
          width: "",
        },
      ];
    },
    filteredConsFee() {
      if (!this.term || this.term.length < 1) {
        return this.Conslist;
      }
    },
   
    



  },
};
</script>
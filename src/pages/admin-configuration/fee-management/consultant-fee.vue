<template>
  <va-card>
    <loder v-show="isLoader" />

  <div class="text-center text-danger my-2" v-if="!isDataReady">
      <b-spinner class="align-middle"></b-spinner>
      <strong>Loading...</strong>
    </div>
     <!-- advanced search form -->

    <div v-else>
      <div class="float-right">
        
        <span
                v-b-tooltip.hover
                title ="New Consultant Fee"
                v-on:click="consultant_fee_add"
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
        <b>CONSULTANT FEE</b>
      </h5>
      <hr />

      <div class="ml-5">
        <!-- Marketing Approach -->
          <!-- <va-card>
            <vue-form-generator
              :model="model"
              :schema="Tab5Schema"
              :options="formOptions"
              ref="Tab5Form"
            ></vue-form-generator>
            <br/>
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
            <vue-form-generator
              :model="model"
              :schema="Tab2Schema"
              :options="formOptions"
              ref="Tab2Form"
            ></vue-form-generator>
            <br/>
            
          </va-card> -->
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
            <div class="float-right"></div>
            <br />
            <h4>List of Consultant Fee </h4>
            <br/>
            <!-- list -->
            <va-card class="mt-2">
              <va-data-table
                :fields="ConsFeelist"
                :data="filteredConsFee"
                :per-page="parseInt(perPage)"
                :datacount="ConsFeeCount"
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
                      v-on:click="editConsFee(props.rowData)"
                      
                    >
                      <i class="fa fa-edit"></i
                    ></span>
                    <span
                      class="badge badge-danger mr-1"
                      v-on:click="deleteConsFee(props.rowData)"
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
  
    this.getAllConsType();
    this.getAllExamType();
    this.getAllConsFee();
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
      isDisabled:false,

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
          START_DATE: '',
          END_DATE: '',


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
     consultant_fee_add() {
    this.$router.push("/fimm/consultant-fee-add");
    },
    emitPageValue(value){
      console.log("current:",value);
   this.$emit('update:current-page', value)
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
          const response = await servicesModule0.searchConsFee(data);
          console.log("fee response=",response);
            this.Conslist = response;
            this.ConsFeeCount = this.Conslist.length;
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

    async editConsFee(data) {
     // this.isLoader = true; // Loader Before submit
       //this.perPage = 10;
      // console.log("Perpage=",props.pageSize);
      this.$router.push({
        name: 'consultant-fee-edit',
        params: { CONSULTANT_FEE_ID: data.CONSULTANT_FEE_ID }
      });
      // const response = await servicesModule0.getConsFeeById(
      //   data.CONSULTANT_FEE_ID
      // );
      
      // this.CONSULTANT_FEE_ID = response.CONSULTANT_FEE_ID;
      // this.model.editCons = response;

      // this.model.editCons.CONSULTANT_FEE_TYPE_ID = {
      //   FEE_ID : response.CONSULTANT_FEE_TYPE_ID,
      //   FEE_NAME : response.SET_PARAM,
      // };
      // this.model.editCons.CONSULTANT_TYPE_ID = {
      //   CONSULTANT_TYPE_ID : response.CONSULTANT_TYPE_ID,
      //   TYPE_NAME : response.TYPE_NAME,
      // };
      // this.model.editCons.EXAM_TYPE_ID = {
      //   CONSULTANT_EXAM_TYPE_ID : response.CONSULTANT_EXAM_TYPE_ID,
      //   EXAM_TYPE_NAME : response.EXAM_TYPE_NAME,
      // };
      

      // this.$modals.simpleModalEditConsFee.$show();

      //this.isLoader = false; // Kill Loader Before submit
    },
    async updateConsFeeAPI() {
      try {
        this.isLoader = true; // Loader Before submit
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
        
        
      this.getAllConsFee();
        // this.perPage = 10;
        this.isLoader = false; // KIll Loader Before submit
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
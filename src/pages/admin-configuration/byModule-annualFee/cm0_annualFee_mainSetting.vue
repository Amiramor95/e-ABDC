<template>
  <va-card>
    <loder v-show="isLoader" />

    <div class="text-center text-danger my-2" v-if="!isDataReady">
      <b-spinner class="align-middle"></b-spinner>
      <strong>Loading...</strong>
    </div>

    <div v-else>

      <div class="col-lg-10">
        <h4 slot="header">SETTING BY MODULE</h4>
      </div>
      <br />
      <br />

      <h5>
        <i class="fa fa-bank"></i>&nbsp;&nbsp;
        <b>ANNUAL FEES PERIOD SETTING</b>
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
              ref="Tab1Form"
            ></vue-form-generator>
            <br/>
            <vue-form-generator
              :model="model"
              :schema="Tab3Schema"
              :options="formOptions"
              ref="Tab1Form"
            ></vue-form-generator>
            <br />
          </va-card>
          
            <br />
            <va-card style="display:none;">
            <vue-form-generator
              :model="model"
              :schema="Tab4Schema"
              :options="formOptions"
              ref="Tab2Form"
            ></vue-form-generator>
            <br/>
            <vue-form-generator
              :model="model"
              :schema="Tab5Schema"
              :options="formOptions"
              ref="Tab2Form"
            ></vue-form-generator>
            <br/>
            <vue-form-generator
              :model="model"
              :schema="Tab6Schema"
              :options="formOptions"
              ref="Tab2Form"
            ></vue-form-generator>
            <br />
            </va-card>
            <br/>
            <br/>
            <div class="float-right">
              <button
                :disabled=disabled
                @click="submit"
                type="button"
                class="ml-2 btn btn-primary btn-fill btn-md"
              >
                <i class="fa fa-save" /> &nbsp; SAVE
              </button>
            </div>
            <div class="float-right"></div>
            
            <div style="margin-bottom:50px">
              <!-- list -->
              <va-card class="col-lg-6 float-left">
                <br />
                <h4>List of Freeze Period </h4>
                <br/>
                <va-data-table
                  :fields="DateFields"
                  :data="filteredDataDateFields"
                  :per-page="parseInt(perPage)"
                  :datacount="DateCount"
                  :dataperpage="parseInt(perPage)"
                  clickable
                >
                  <template slot="no" slot-scope="row">
                    {{ row.rowIndex + 1 }}
                  </template>

                  <template slot="actions" slot-scope="props" >
                    <h4 class="mt-2">
                      <span
                        class="badge badge-primary mr-1"
                        v-on:click="editAnnualFeee(props.rowData)"
                      >
                        <i class="fa fa-edit"></i
                      ></span>
                    </h4>
                  </template>
                </va-data-table>

                <button
                  @click="back"
                  type="button"
                  class="btn btn-primary btn-fill btn-md"
                  style="float: left;margin-top: 30px;"
                >
                  <i class="fa fa-step-backward" /> &nbsp; Previous
                </button>

              </va-card>

              <!-- list -->
              <va-card class="col-lg-6 float-right">
                <h4>R&A Verification Period </h4>
                <br/>
                <va-data-table
                  :fields="RNADateList"
                  :data="filteredDataRNADateList"
                  :per-page="parseInt(perPage)"
                  :datacount="DateCount"
                  :dataperpage="parseInt(perPage)"
                  clickable
                >
                  <template slot="no" slot-scope="row">
                      {{ row.rowIndex + 1 }}
                  </template>
                </va-data-table>
                <br />
              </va-card>
            </div>  
      </div>
      

      <!-- Marketing Approach  -->
      <vudal name="simpleModalEditAnnualFeeDate" class="widthModal">
        <div class="header">
          EDIT ANNUAL FEE DATE<i class="close icon">&times;</i>
        </div>
        <div class="content">
          <vue-form-generator
            :model="model"
            :schema="editAnnualFeeSchema"
            :options="formOptions"
          />
        </div>
        <div class="actions">
          <button
            type="button"
            class="cancel vudal-btn mr-2 btn btn-danger btn-fill btn-md"
          >
            <i class="fa fa-times" /> &nbsp; CLOSE
          </button>
          <button
            :disabled=disabled
            @click="updateAnnualFeeAPI"
            type="button"
            class="cancel vudal-btn mr-2 btn btn-primary btn-fill btn-md"
          >
            <i class="fa fa-edit" /> &nbsp; UPDATE
          </button>
        </div>
      </vudal>
      <br/>
      <br/>
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
import interactionPlugin from "@fullcalendar/interaction";
import { DeleteDistributorMarketingApproach } from "../../../app/module0/acap";
import loder from "../../request_loader";

export default {
  mounted() {
    // this.getAllmarketingApproach();
    this.getAllAnnualPrevious();
    this.getAllListDate();
    //this.getAllListRnaDate();
  },
  components: {
    FullCalendar,
    Vudal,
    loder
  },
  // DATA SCHEMA
  data() {
    return {
      // Data for loder
      isLoader: false,
      isDataReady:false,
      disabled:false,

      term: null,
      visibleLogin: false,
      visibleBlockDuration: false,
      visibleBlockDuration2: false,
      perPage: "6",
      perPageOptions: ["4", "6", "10", "20"],
      AnnualPreviousYear: [],
      DateList: [],
      RnaDateList: [],

      MarketingApproachList: [],
      DateCount: null,
      RnaDateCount: null,


      StatusCount: null,
      loading: false,

      count: 1,
      model: {
        addCurrent: {
          YEAR: '',
          ASSESSMENT_START_DATE: '',
          ASSESSMENT_END_DATE: '',
          SUBMISSION_START_DATE: '',
          SUBMISSION_END_DATE: '',
        },
        addPrevious: {
          YEAR: '',
          ASSESSMENT_START_DATE: '',
          ASSESSMENT_END_DATE: '',
          SUBMISSION_START_DATE: '',
          SUBMISSION_END_DATE: '',
        },

        editCurrent: {
          YEAR: '',
          ASSESSMENT_START_DATE: '',
          ASSESSMENT_END_DATE: '',
          SUBMISSION_START_DATE: '',
          SUBMISSION_END_DATE: '',
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
                labels:"Year",
                type: 'vfg-functional-date',
                placeholder: 'Enter Start Date',
                model: 'addCurrent.YEAR',
                noLabel: true,
                styleClasses: "col-md-6",
                required: true,
                dateFormat: 'YYYY',
                view: 'year',
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

                labels:"Assessment Start Date",
                type: 'vfg-functional-date',
                placeholder: 'Enter Start Date',
                model: 'addCurrent.ASSESSMENT_START_DATE',
                styleClasses: "col-md-6",
                required: true,
              },
              { 
                labels:"Assessment End Date",
                type: 'vfg-functional-date',
                placeholder: 'Enter End Date',
                model: 'addCurrent.ASSESSMENT_END_DATE',
                styleClasses: "col-md-6",
                required: true,
                onChanged: function(model) { //console.log(model);
                  var start = this.model.addCurrent.ASSESSMENT_START_DATE;
                  var end = this.model.addCurrent.ASSESSMENT_END_DATE;
                  if(start > end ){
                    model.addCurrent.ASSESSMENT_START_DATE = '';
                    Vue.$toast.open({
                        message: 'Please give valid assesment date range',
                        type: 'error',
                    });
                    this.disabled = true;
                  }else{ this.disabled = false; }

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
                labels:"Submission Start Date",
                type: 'vfg-functional-date',
                placeholder: 'Enter Start Date',
                model: 'addCurrent.SUBMISSION_START_DATE',
                styleClasses: "col-md-6",
                required: true,
                onChanged: function(model) { 
                  var end = this.model.addCurrent.ASSESSMENT_END_DATE;
                  var sStart = this.model.addCurrent.SUBMISSION_START_DATE;

                  if(end > sStart ){
                    model.addCurrent.ASSESSMENT_END_DATE = '';
                    Vue.$toast.open({
                        message: 'Please give valid assesment & submission date range',
                        type: 'error',
                    });
                    this.disabled = true;
                  }else{ this.disabled = false; }
                  
                },
              },
              {
                 labels:"Submission End Date",
                type: 'vfg-functional-date',
                placeholder: 'Enter Start Date',
                model: 'addCurrent.SUBMISSION_END_DATE',
                styleClasses: "col-md-6",
                required: true,
                onChanged: function(model) {
                  var sStart = this.model.addCurrent.SUBMISSION_START_DATE;
                  var sEnd = this.model.addCurrent.SUBMISSION_END_DATE;

                  if(sStart > sEnd ){
                    model.addCurrent.SUBMISSION_START_DATE = '';
                    Vue.$toast.open({
                        message: 'Please give valid submission date range',
                        type: 'error',
                    });
                    this.disabled = true;
                  }else{ this.disabled = false; }
                  
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
                labels:"Previous Year",
                type: 'vfg-functional-date',
                placeholder: 'Enter Start Date',
                model: 'addPrevious.YEAR',
                noLabel: true,
                styleClasses: "col-md-6",
                 disabled: true,
              
              },
            ],
          },
        ],
        
      },
      Tab5Schema: {
        groups: [
          {
            styleClasses: "row mt-2",
            fields: [
              {
                labels:"Assessment Start Date",
                type: 'vfg-functional-date',
                placeholder: 'Enter Start Date',
                model: 'addPrevious.ASSESSMENT_START_DATE',
                noLabel: true,
                styleClasses: "col-md-6",
                 disabled: true,
              },
              {
                 labels:"Assessment End Date",
                type: 'vfg-functional-date',
                placeholder: 'Enter Start Date',
                model: 'addPrevious.ASSESSMENT_END_DATE',
                noLabel: true,
                styleClasses: "col-md-6",
                 disabled: true,
              },
            ],
          },
        ],
        
      },
      Tab6Schema: {
        groups: [
          {
            styleClasses: "row mt-2",
            fields: [
              {
                labels:"Submission Start Date",
                type: 'vfg-functional-date',
                placeholder: 'Enter Start Date',
                model: 'addPrevious.SUBMISSION_START_DATE',
                noLabel: true,
                styleClasses: "col-md-6",
                 disabled: true,
              },
              {
                labels:"Submission End Date",
                type: 'vfg-functional-date',
                placeholder: 'Enter Start Date',
                model: 'addPrevious.SUBMISSION_END_DATE',
                noLabel: true,
                styleClasses: "col-md-6",
                 disabled: true,
              },
            ],
          },
        ],
        
      },
      editAnnualFeeSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                labels:"Year",
                type: 'vfg-functional-date',
                placeholder: 'Enter Start Date',
                model: 'editCurrent.YEAR',
                styleClasses: "col-md-12",    
                dateFormat: 'YYYY',
                view: 'year',
              },
              {

                labels:"Assessment Start Date",
                type: 'vfg-functional-date',
                placeholder: 'Enter Start Date',
                model: 'editCurrent.ASSESSMENT_START_DATE',
                noLabel: true,
                styleClasses: "col-md-12",
              
              },
              { 
                labels:"Assessment End Date",
                type: 'vfg-functional-date',
                placeholder: 'Enter End Date',
                model: 'editCurrent.ASSESSMENT_END_DATE',
                styleClasses: "col-md-12",
                onChanged: function(model) {
                  var start = this.model.editCurrent.ASSESSMENT_START_DATE;
                  var end = this.model.editCurrent.ASSESSMENT_END_DATE;
                  if(start > end ){
                    model.editCurrent.ASSESSMENT_START_DATE = '';
                    Vue.$toast.open({
                        message: 'Please give valid assesment date range',
                        type: 'error',
                    });
                    this.disabled = true;
                  }else{ this.disabled = false; }
                }  
              },
              {
                labels:"Submission Start Date",
                type: 'vfg-functional-date',
                placeholder: 'Enter Start Date',
                model: 'editCurrent.SUBMISSION_START_DATE',
    
                styleClasses: "col-md-12",
                onChanged: function(model) {
                  var end = this.model.editCurrent.ASSESSMENT_END_DATE;
                  var sStart = this.model.editCurrent.SUBMISSION_START_DATE;

                  if(end > sStart ){
                    model.editCurrent.ASSESSMENT_END_DATE = '';
                    Vue.$toast.open({
                        message: 'Please give valid assesment & submission date range',
                        type: 'error',
                    });
                    this.disabled = true;
                  }else{ this.disabled = false; }
                  
                },
               
              },
              {
                 labels:"Submission End Date",
                type: 'vfg-functional-date',
                placeholder: 'Enter Start Date',
                model: 'editCurrent.SUBMISSION_END_DATE',
                styleClasses: "col-md-12",
                 onChanged: function(model) {
                  var sStart = this.model.editCurrent.SUBMISSION_START_DATE;
                  var sEnd = this.model.editCurrent.SUBMISSION_END_DATE;

                  if(sStart > sEnd ){
                    model.editCurrent.SUBMISSION_START_DATE = '';
                    Vue.$toast.open({
                        message: 'Please give valid submission date range',
                        type: 'error',
                    });
                    this.disabled = true;
                  }else{ this.disabled = false; }
                 }  
              },
            ],
          },
        ],
      },

      
  
      
    };
  },
  methods: {
    onModuleData(schema,data){
      var start = this.model.addCurrent.ASSESSMENT_START_DATE;
      var end = this.model.addCurrent.ASSESSMENT_END_DATE;

      var sStart = this.model.addCurrent.SUBMISSION_START_DATE;
      var sEnd = this.model.addCurrent.SUBMISSION_END_DATE;

      if(start < end &&  end < sStart && sStart < sEnd ){
        this.disabled = false;
      }else{
        Vue.$toast.open({
            message: 'Please give valid assesment & submission date range',
            type: 'error',
        });
        this.disabled = true;
      }
    },
    onEditData(schema,data){
      var start = this.model.editCurrent.ASSESSMENT_START_DATE;
      var end = this.model.editCurrent.ASSESSMENT_END_DATE;

      var sStart = this.model.editCurrent.SUBMISSION_START_DATE;
      var sEnd = this.model.editCurrent.SUBMISSION_END_DATE;

      if(start < end &&  end < sStart && sStart < sEnd ){
        this.disabled = false;
      }else{
        Vue.$toast.open({
            message: 'Please give valid assesment & submission date range',
            type: 'error',
        });
        this.disabled = true;
      }
    },

    back() {
      this.$router.go(-1);
    },
  getAllAnnualPrevious: async function () {
      const response = await servicesModule0.getAllAnnualDateFirst();
      this.AnnualPreviousYear = response;
      this.model.addPrevious = response;
      this.model.addPrevious.YEAR = "12-01-"+response.ASSESSMENT_YEAR;
      // this.CountryCount = this.CountryList.length;
    },

    getAllListDate: async function () {
      const response = await servicesModule0.getAllListDate();
      this.DateList = response;
      this.DateCount = this.DateList.length;
      this.isDataReady = true; // Kill component loder
    },
    // getAllListRnaDate: async function () {
    //   const response = await servicesModule0.getAllRnaDatelist();
    //   this.RnaDateList = response;
    //   this.RnaDateCount = this.RnaDateList.length;
    // },

   
    async submit() {
      if (this.$refs.Tab1Form.validate()) {
        this.isLoader = true; // Loder
        const data = new FormData();
        data.append("ASSESSMENT_YEAR", moment(this.model.addCurrent.YEAR).format("YYYY"));
        data.append(
          "ASSESSMENT_START_DATE",
          moment(this.model.addCurrent.ASSESSMENT_START_DATE).format("YYYY-MM-DD")
        );
        data.append(
          "ASSESSMENT_END_DATE",
          moment(this.model.addCurrent.ASSESSMENT_END_DATE).format("YYYY-MM-DD")
        );
        data.append(
          "SUBMISSION_START_DATE",
          moment(this.model.addCurrent.SUBMISSION_START_DATE).format("YYYY-MM-DD")
        );
        data.append(
          "SUBMISSION_END_DATE",
          moment(this.model.addCurrent.SUBMISSION_END_DATE).format("YYYY-MM-DD")
        );
        data.append(
          "RNA_START_DATE",
          moment(this.model.addCurrent.SUBMISSION_END_DATE).subtract(1, 'year').format("YYYY-MM-DD")
        );
        data.append(
          "RNA_END_DATE",
          moment(this.model.addCurrent.SUBMISSION_END_DATE).format("YYYY-MM-DD")
        );
        try {
          console.log(data);
          const response = await servicesModule0.createAnnualFeeDate(data);
          this.resetFormData();
          this.getAllListDate();
          // this.$modals.simpleModal.$hide();
          this.isLoader = false; // Loder
        } catch (error) {
          console.log(error);
        }
      }
    },

    resetFormData(){
      this.model.addCurrent.YEAR = '';
      this.model.addCurrent.ASSESSMENT_START_DATE = '';
      this.model.addCurrent.ASSESSMENT_END_DATE = '';
      this.model.addCurrent.SUBMISSION_START_DATE = '';
      this.model.addCurrent.SUBMISSION_END_DATE = '';
      this.model.addCurrent.SUBMISSION_END_DATE = '';
      this.model.addCurrent.SUBMISSION_END_DATE = '';
    },

     async editAnnualFeee(data) {
       this.isLoader = true; // Loder
      const response = await servicesModule0.getAnnualFeeById(
        data.ANNUAL_FEES_DATE_ID
      );
      
      this.ANNUAL_FEES_DATE_ID = response.ANNUAL_FEES_DATE_ID;
      this.RNA_VERIFICATION_PERIOD_ID = response.RNA_VERIFICATION_PERIOD_ID;
      this.model.editCurrent = response;
      this.model.editCurrent.YEAR = "12-01-"+response.ASSESSMENT_YEAR;
      // this.model.editCurrent.YEAR = response.ASSESSMENT_YEAR;
      // this.model.editCurrent.ASSESSMENT_START_DATE = response.ASSESSMENT_START_DATE;
      // this.model.editCurrent.ASSESSMENT_END_DATE = response.ASSESSMENT_END_DATE;
      // this.model.editCurrent.SUBMISSION_START_DATE = response.SUBMISSION_START_DATE;
      // this.model.editCurrent.SUBMISSION_END_DATE = response.SUBMISSION_END_DATE;
      //console.log(response);
      this.isLoader = false; // Kill Loder
      this.$modals.simpleModalEditAnnualFeeDate.$show();
    },
  
    async updateAnnualFeeAPI() {
      try {
        this.isLoader = true; // Loder
        const data = new FormData();
        data.append( "ANNUAL_FEES_DATE_ID",this.ANNUAL_FEES_DATE_ID );
        data.append( "RNA_VERIFICATION_PERIOD_ID",this.RNA_VERIFICATION_PERIOD_ID );
        data.append("ASSESSMENT_YEAR", moment(this.model.editCurrent.YEAR).format("YYYY"));
        data.append(
          "ASSESSMENT_START_DATE",
          moment(this.model.editCurrent.ASSESSMENT_START_DATE).format("YYYY-MM-DD")
        );
        data.append(
          "ASSESSMENT_END_DATE",
          moment(this.model.editCurrent.ASSESSMENT_END_DATE).format("YYYY-MM-DD")
        );
        data.append(
          "SUBMISSION_START_DATE",
          moment(this.model.editCurrent.SUBMISSION_START_DATE).format("YYYY-MM-DD")
        );
        data.append(
          "SUBMISSION_END_DATE",
          moment(this.model.editCurrent.SUBMISSION_END_DATE).format("YYYY-MM-DD")
        );
        data.append(
          "RNA_START_DATE",
          moment(this.model.editCurrent.SUBMISSION_END_DATE).subtract(1, 'year').format("YYYY-MM-DD")
        );
        data.append(
          "RNA_END_DATE",
          moment(this.model.editCurrent.SUBMISSION_END_DATE).format("YYYY-MM-DD")
        );
        const response = await servicesModule0.updateAnnualFee(data);
        this.getAllListDate();
        this.isLoader = false; // Kill Loder
      } catch (error) {
        console.log(error);
      }
    },

    

    

  

  },

  computed: {
    DateFields() {
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
          name: "ASSESSMENT_YEAR",
          title: "YEAR",
          // sortField: "DIST_SET_PARAM",
        },
        {
          name: "ASSESSMENT_START_DATE",
          title: "ASSESSMENT START DATE ",
          // sortField: "DIST_SET_PARAM",
        },
        {
          name: "ASSESSMENT_END_DATE",
          title: "ASSESSMENT END DATE ",
          // sortField: "DIST_SET_PARAM",
        },
        {
          name: "SUBMISSION_START_DATE",
          title: "SUBMISSION START DATE ",
          // sortField: "DIST_SET_PARAM",
        },
        {
          name: "SUBMISSION_END_DATE",
          title: "SUBMISSION END DATE",
          // sortField: "DIST_SET_PARAM",
        },

        {
          name: "__slot:actions",
          title: "Action",
          dataClass: "justify-content-center",
          width: "15%",
        },
      ];
    },
    filteredDataDateFields() {
      if (!this.term || this.term.length < 1) {
        return this.DateList;
      }
    },
   RNADateList() {
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
          name: "RNA_START_DATE",
          title: "START DATE ",
          // sortField: "DIST_SET_PARAM",
        },
        {
           name: "RNA_END_DATE",
          title: "END DATE ",
          // sortField: "DIST_SET_PARAM",
        },
        
      ];
    },
    filteredDataRNADateList() {
      if (!this.term || this.term.length < 1) {
        return this.DateList;
      }
    },
    



  },
};
</script>
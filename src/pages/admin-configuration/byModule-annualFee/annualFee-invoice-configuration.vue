<template>
  <va-card>
    <loder v-show="isLoader" />
    <div class="col-lg-10">
      <h4 slot="header">SETTING BY MODULE</h4>
    </div>
    <br />
    <br />

      <div class="text-center text-danger my-2" v-if="!isDataReady">
        <b-spinner class="align-middle"></b-spinner>
        <strong>Loading...</strong>
      </div>

      <div v-else>

        <h5>
          <i class="fa fa-bank"></i>&nbsp;&nbsp;
          <b>ANNUAL FEE INVOICE SETTING</b>
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
            </va-card>
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
              <div class="float-right"></div>
              <br />
              <h4>List of Invoice Setting </h4>
              <br/>
              <!-- list -->
              <va-card class="mt-2">
                <va-data-table
                  :fields="InvoiceFields"
                  :data="filteredInvoiceFields"
                  :per-page="parseInt(perPage)"
                  :datacount="InvoiceCount"
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
                        v-on:click="editAnnualInvoice(props.rowData)"
                      >
                        <i class="fa fa-edit"></i
                      ></span>
                      <span
                        class="badge badge-danger mr-1"
                        v-on:click="deleteAnnualInvoice(props.rowData)"
                        ><i class="fa fa-trash"></i
                      ></span>
                    </h4>
                  </template>
                </va-data-table>
                <br />
                <br/>
              
              </va-card> 
          
        

        
        </div>

        <!-- Marketing Approach  -->
        <vudal name="simpleModalEditAnnualFeeInvoice" class="widthModal">
          <div class="header">
            EDIT ANNUAL FEE INVOICE<i class="close icon">&times;</i>
          </div>
          <div class="content">
            <vue-form-generator
              :model="model"
              :schema="editAnnualInvoiceSchema"
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
              @click="updateAnnualInvoiceAPI"
              type="button"
              class="cancel vudal-btn mr-2 btn btn-primary btn-fill btn-md"
            >
              <i class="fa fa-edit" /> &nbsp; UPDATE
            </button>
          </div>
        </vudal>
        <br/>
        <br/>
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
import interactionPlugin from "@fullcalendar/interaction";
import { DeleteDistributorMarketingApproach } from "../../../app/module0/acap";
import loder from "../../request_loader";

export default {

  mounted() {
    
    this.getAllInvoice();
    
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

      term: null,
      visibleLogin: false,
      visibleBlockDuration: false,
      visibleBlockDuration2: false,
      perPage: "6",
      perPageOptions: ["4", "6", "10", "20"],
      InvoiceList: [],
    
      InvoiceCount: null,


      StatusCount: null,
      loading: false,

      count: 1,
      model: {
        ANNUAL_FEE_PREFIX: '',
        ANNUAL_FEE_NUMBER: '',
        ANNUAL_FEE_YEAR: '',

        editInvoice: {
        ANNUAL_FEE_PREFIX: '',
        ANNUAL_FEE_NUMBER: '',
        ANNUAL_FEE_YEAR: '',

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
                type: "input",
                inputType: "text",
                model: "ANNUAL_FEE_PREFIX",
                label: "PREFIX",
                placeholder: "Enter prefix",
                styleClasses: "col-md-6",
              },
              {
                type: "input",
                inputType: "number",
                model: "ANNUAL_FEE_NUMBER",
                label: "RUNNING NUMBER",
                placeholder: "Enter Running Number",
                styleClasses: "col-md-6",
              },
               {
                labels:"YEAR ",
                type: 'vfg-functional-date',
                placeholder: 'Enter Year',
                model: 'ANNUAL_FEE_YEAR',
                styleClasses: "col-md-6",
                view: 'year',
              },
            ],
          },
        ],
        
      },
      
     
      editAnnualInvoiceSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
             {
                type: "input",
                inputType: "text",
                model: "editInvoice.ANNUAL_FEE_PREFIX",
                label: "PREFIX",
                placeholder: "Enter prefix",
                styleClasses: "col-md-12",
              },
              {
                type: "input",
                inputType: "number",
                model: "editInvoice.ANNUAL_FEE_NUMBER",
                label: "RUNNING NUMBER",
                placeholder: "Enter Running Number",
                styleClasses: "col-md-12",
              },
               {
                labels:"YEAR",
                type: 'vfg-functional-date',
                placeholder: 'Enter Year',
                model: 'editInvoice.ANNUAL_FEE_YEAR',
                styleClasses: "col-md-12",
                view: 'year',
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
  

    getAllInvoice: async function () {
      const response = await servicesModule0.getAllAnnualInvoiceList();
      this.InvoiceList = response;
      this.InvoiceCount = this.InvoiceList.length;

      this.isDataReady = true; // Kill component loader
    },
    

   
async submit() {
      if (this.$refs.Tab1Form.validate()) {
        this.isLoader = true; // Loder
        const data = new FormData();
        data.append("ANNUAL_FEE_PREFIX", this.model.ANNUAL_FEE_PREFIX);
        data.append("ANNUAL_FEE_NUMBER", this.model.ANNUAL_FEE_NUMBER);
        data.append(
          "ANNUAL_FEE_YEAR",
          moment(this.model.ANNUAL_FEE_YEAR).format("YYYY")
        );
        
        try { 
          //console.log(data);
          const response = await servicesModule0.createAnnualInvoice(data);
          this.model.ANNUAL_FEE_PREFIX = '';
          this.model.ANNUAL_FEE_NUMBER = '';
          this.model.ANNUAL_FEE_YEAR = '';
          this.getAllInvoice();
          // this.$modals.simpleModal.$hide();
          this.isLoader = false; // Loder
        } catch (error) {
          console.log(error);
        }
      }
    },


     async editAnnualInvoice(data) {
       this.isLoader = true; // Loder
      const response = await servicesModule0.getAnnualInvoiceById(
        data.ANNUAL_FEE_INVOICE_ID
      );
      this.$modals.simpleModalEditAnnualFeeInvoice.$show();
      this.ANNUAL_FEE_INVOICE_ID = response.ANNUAL_FEE_INVOICE_ID;
      this.model.editInvoice = response;
      var year = '01-01-'+(response.ANNUAL_FEE_YEAR);
      this.model.editInvoice.ANNUAL_FEE_YEAR = year;
      //console.log(response);
      this.isLoader = false; // Loder
    },
  
    async updateAnnualInvoiceAPI() {
      try {
        this.isLoader = true; // Loder
        const data = new FormData();
        data.append(
          "ANNUAL_FEE_INVOICE_ID",
          this.ANNUAL_FEE_INVOICE_ID
        );
        data.append("ANNUAL_FEE_PREFIX", this.model.editInvoice.ANNUAL_FEE_PREFIX);
        data.append("ANNUAL_FEE_NUMBER", this.model.editInvoice.ANNUAL_FEE_NUMBER);
        data.append(
          "ANNUAL_FEE_YEAR",
          moment(this.model.editInvoice.ANNUAL_FEE_YEAR).format("YYYY")
        );
        const response = await servicesModule0.updateAnnualInvoice(data);
        this.getAllInvoice();
        this.isLoader = false; // Kill Loder
      } catch (error) {
        console.log(error);
      }
    },
 async deleteAnnualInvoice(data) {
      // eslint-disable-next-line no-unused-vars
      if (confirm("Are you sure you want to delete?")) {
        this.isLoader = true; // Loder
        const response = await servicesModule0.deleteAnnualInvoice(
          data.ANNUAL_FEE_INVOICE_ID
        );
        this.getAllInvoice();
        this.isLoader = false; // Kill Loder
      }  
    },
    

    

  

  },

  computed: {
    InvoiceFields() {
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
          name: "ANNUAL_FEE_PREFIX",
          title: "PREFIX",
          // sortField: "DIST_SET_PARAM",
        },
        {
          name: "ANNUAL_FEE_NUMBER",
          title: "RUNNING NUMBER",
          // sortField: "DIST_SET_PARAM",
        },
        {
          name: "ANNUAL_FEE_YEAR",
          title: "YEAR",
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
    filteredInvoiceFields() {
      if (!this.term || this.term.length < 1) {
        return this.InvoiceList;
      }
    },
   
    



  },
};
</script>
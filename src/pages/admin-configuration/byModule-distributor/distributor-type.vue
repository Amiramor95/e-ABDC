<template>
  <va-card>
    <div class="col-lg-10">

    </div>
    <br />
    <br />

    <h5>
      <i class="fa fa-bank"></i>&nbsp;&nbsp;
      <b>DISTRIBUTOR TYPE</b>
    </h5>
    <hr />

    <div class="ml-5">
      <!-- Marketing Approach -->
       <br/>
       <br/>
        <form @submit.prevent="submitDistributorType">
            <div class="row">
              <div class="ml-4 col-md-8">
                <span class="col mt-3 description">DISTRIBUTOR TYPE <span class="star">*</span></span>
                <input
                  type="text"
                  v-model="model.DIST_TYPE_NAME"
                  placeholder="ENTER DISTRIBUTOR TYPE"
                  class="float-right col-8 form-control form-control-md"
                  required
                />
              </div>
              
            <div class="clear"></div>
               <div class="ml-4 col-md-8 row">
              <span class="col mt-3 description">TYPE OF VARIATION</span>
              <div class="col-md-9">
                <div class="row">
                  <div
                    class="col-4"
                    v-for="(item, index) in model.VARIATION"
                    :key="index"
                  >
                    <div class="row mb-2">
                      <va-checkbox
                        class="col-2"
                        v-model="item.selected"
                      ></va-checkbox>
                      <span class="col">
                        {{ item.name }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
              <div class="clear"></div>
            <div class="ml-4 col-md-8 row">
                <span class="col mt-3 description">SCHEME</span>
                <multiselect
                  v-model="model.SCHEME"
                  :options="ConsultantTypeList"
                  placeholder="SELECT SCHEME"
                  label="TYPE_SCHEME"
                  class="float-right col-8 form-multiselect"
                   :multiple="false"
                   :allow-empty="false"
                ></multiselect>
              </div>
               <div class="clear"></div>
              <div class="ml-4 col-md-8">
                <span class="col mt-3 description">MARKETING APPROACH </span>
                <multiselect
                  v-model="model.MARKETING_APPROACH_ID"
                  :options="MarketingApproachList"
                  placeholder="Select Marketing Group"
                  label="DIST_SET_PARAM"
                  class="float-right col-8 form-multiselect"
                  :multiple="false"
                  :allow-empty="false"
                ></multiselect>
              </div>
             <div class="cleartype"></div>
              <div class="ml-4 col-md-8">
                <span class="col mt-3 description">TYPE STRUCTURE </span>
                <multiselect
                  v-model="model.TYPE_STRUCTURE_ID"
                  :options="TypeStructure"
                  placeholder="Select Type Structure"
                  label="DIST_SET_PARAM"
                  class="float-right col-8 form-multiselect"
                   :multiple="false"
                  :allow-empty="false"
                ></multiselect>
              </div>
            </div>
            <br>
              <div class="ml-4 col-md-8 row form-gap">
                <span class="col mt-3 description">ANNUAL FEE REFFERENCE</span>
                <input
                  type="text"
                  v-model="model.ANNUALFEES_ID"
                  placeholder="ENTER ANNUALFEES REFFERENCE"
                  class="float-right col-8 form-control form-control-md annual"
                />
              </div>
            <br />
            <br /><br />
            <div class="row">
              <div class="col-10">
                <button
                  type="submit"
                  class="float-right btn btn-primary btn-fill btn-md"
                >
                  <i class="fa fa-save" />&nbsp; SAVE
                </button>
              </div>
            </div>
            </form>
            <br>
            <br>
      <br />
      <div class="float-right">
              <va-input
              :value="term"
              :placeholder="$t('Search')"
              @input="searchType"
              removable
              >
              <va-icon name="fa fa-search" slot="prepend" />
              </va-input>
              </div>
      <br>
      <br>
            <va-card class="mt-2">
              <va-data-table
                :fields="distributorType"
                :data="filteredDistributorType"
                :per-page="parseInt(perPage)"
                :datacount="DistributorCount"
                :dataperpage="parseInt(perPage)"
                clickable
              >
                <template slot="no" slot-scope="row">
                  {{ row.rowIndex + 1 }}
                </template>

                <template slot="actions" slot-scope="props">
                  <h4 class="mt-2">
                    <span
                      v-b-tooltip.hover
                      title="edit"
                      class="badge badge-primary mr-1"
                      v-on:click="editDistributorType(props.rowData)"
                    >
                      <i class="fa fa-edit"></i
                    ></span>
                    <span
                      v-b-tooltip.hover
                      title="edit"
                      class="badge badge-danger mr-1"
                      v-on:click="deleteDistType(props.rowData)"
                    >
                      <i class="fa fa-trash"></i
                    ></span>
                  </h4>
                </template>
              </va-data-table>
              <br />
            </va-card>
        <hr />
      </div>
          <br/>
          <br/>

    <vudal name="simpleModalEditDistFee" class="widthModal">
              <div class="header">
                EDIT DISTRIBUTOR TYPE<i class="close icon">&times;</i>
              </div>
        <div class="content">
            <div class="row">
              <div class="ml-4 col-md-10 edit_col">
                <span class="col mt-3 description">DISTRIBUTOR TYPE <span class="star">*</span></span>
                <input
                  type="text"
                  v-model="model.editDistType.DIST_TYPE_NAME"
                  placeholder="ENTER DISTRIBUTOR TYPE"
                  class="float-right col-8 form-control form-control-md"
                  required
                />
                <input
                  type="hidden"
                  v-model="model.editDistType.DISTRIBUTOR_TYPE_ID"
                />
              </div>
               <div class="clear"></div>
              <div class="ml-4 col-md-10 row">
              <span class="col mt-3 description">TYPE OF VARIATION</span>
              <div class="col-md-9">
                <div class="row">
                  <div
                    class="col-4"
                    v-for="(item, index) in model.EdiVARIATION"
                    :key="index"
                  >
                    <div class="row mb-2">
                        <input type="checkbox" v-bind:id="index"  v-model="item.selected" v-on:change="varlistpopulate($event, item.name)" >
                        <span class="col">
                        {{ item.name }}
                        </span>
                      <!-- <va-checkbox
                        class="col-2"
                        v-model="item.selected"
                       v-on:change="itemCheck($event.target.checked)"
                      ></va-checkbox>
                      <span class="col">
                        {{ item.name }}
                      </span> -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
             <div class="clear"></div>
             <div class="ml-4 col-md-10 row">
                <span class="col mt-3 description">SCHEME</span>
                <multiselect
                  v-model="model.editDistType.SCHEME"
                  :options="ConsultantTypeList"
                  placeholder="SELECT SCHEME"
                  label="TYPE_SCHEME"
                  class="float-right col-8 form-multiselect"
                   :multiple="false"
                   :allow-empty="false"
                ></multiselect>
              </div>
               <div class="clear"></div>
              <div class="ml-4 col-md-10">
                <span class="col mt-3 description">MARKETING APPROACH </span>
                <multiselect
                  v-model="model.editDistType.MARKETING_APPROACH_ID"
                  :options="MarketingApproachList"
                  placeholder="Select Marketing Group"
                  label="DIST_SET_PARAM"
                  class="float-right col-8 form-multiselect"
                  :multiple="false"
                  :allow-empty="false"
                ></multiselect>
              </div>
              <br />
              <br />
              <div class="ml-4 col-md-10">
                <span class="col mt-3 description">TYPE STRUCTURE </span>
                <multiselect
                  v-model="model.editDistType.TYPE_STRUCTURE_ID"
                  :options="TypeStructure"
                  placeholder="Select Type Structure"
                  label="DIST_SET_PARAM"
                  class="float-right col-8 form-multiselect"
                   :multiple="false"
                  :allow-empty="false"
                ></multiselect>
              </div>
            </div>
          <br>
          <div class="ml-4 col-md-10 row">
                <span class="col mt-3 description">ANNUAL FEE REFFERENCE</span>
                 <input
                  type="text"
                  v-model="model.editDistType.ANNUALFEES_ID"
                  placeholder="ENTER ANNUALFEES REFFERENCE"
                  class="float-right col-8 form-control form-control-md"
                />
              </div>
            </div>
              <div class="actions">
                <button
                  type="button"
                  class="cancel vudal-btn mr-2 btn btn-danger btn-fill btn-md"
                >
                  <i class="fa fa-times" /> &nbsp; CLOSE
                </button>
                <button
                  type="button"
                  v-on:click="updateDistTypeAPI"
                  class="cancel vudal-btn mr-2 btn btn-primary btn-fill btn-md"
                >
                  <i class="fa fa-edit" /> &nbsp; UPDATE
                </button>
              </div>

            </vudal>
     <button
          @click="back"
          type="button"
          class="btn btn-primary btn-fill btn-md"
        >
          <i class="fa fa-step-backward" /> &nbsp; Previous
        </button>
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




export default {
  mounted() {
    // this.getAllmarketingApproach();
    this.getAllDistributorType();
    this.getAllmarketingApproach();
    this.getAllTypeStructure();
    this.getAllConsultantType();
  },
  components: {
    FullCalendar,
    Vudal,
  },
  // DATA SCHEMA
  data() {
    return {
      term: null,
      visibleLogin: false,
      visibleBlockDuration: false,
      visibleBlockDuration2: false,
      perPage: 10,
     // perPageOptions: ["4", "6", "10", "20"],
      DistributorTypelist: [],
      AnnualPreviousYear: [],
     TypeStructure: [],
     MarketingApproachList: [],
     ConsultantTypeList: [],
     distributorTypeList: [],
     DistributorCount: null,

      MarketingApproachList: [],
      DateCount: null,
      RnaDateCount: null,
      DistFeeCount: null,
      AnnualFeeList:[],


      StatusCount: null,
      loading: false,

      count: 1,
      VARIATION: [

      ],
       VARIATIONEDIT: [

      ],
      model: {
        DIST_TYPE_VARIATION: "",
        MARKETING_APPROACH_ID: "",
        TYPE_STRUCTURE_ID: "",
        DIST_TYPE_NAME: "",
       // DIST_MARKETING_ID: "",
        SCHEME: "",
        ANNUALFEES_ID:"",
        AnnualFeeList:[
          { "id": "1", "name_fee": "Annual Fee1"},
         // { id: "2", name_fee: "Annual Fee2"},
          ],
        VARIATION: [
        {name: "UTMC", selected: false },
        {name: "IUTA", selected: false },
        {name: "CUTA", selected: false },
        {name: "CPRA", selected: false },
        {name: "PRP", selected: false },
        {name: "IPRA", selected: false },
        ],
        EdiVARIATION: [],


        editDistType: {

        DIST_TYPE_VARIATION: "",
        MARKETING_APPROACH_ID: "",
        TYPE_STRUCTURE_ID: "",
        DIST_TYPE_NAME: "",
       // DIST_MARKETING_ID: "",
        SCHEME: "",
        ANNUALFEES_ID:"",
        DISTRIBUTOR_TYPE_ID:"",
        },
      },

      formOptions: {
        validateAfterChanged: true,
      },
      //5 Module CPD Calculation
       
      // Tab1Schema: {
      //   groups: [
      //     {
      //       styleClasses: "row",
      //       fields: [
      //         {
      //           type: "vueMultiSelect",
      //           inputType: "Text",
      //           model: "SCHEME",
      //           label: "SCHEME",
      //           placeholder: "ENTER SCHEME",
      //           styleClasses: "col-md-12",
      //           selectOptions: {
      //             multiple: false,
      //             key: "CONSULTANT_TYPE_ID",
      //             label: "CONS_NAME",
      //             searchable: true,
      //           },
      //           values: (model, schema) => {
      //             return this.ConsultantTypeList;
      //           },
      //         },
      //       ],
      //     },
      //   ],
      // },
    };
  },
  methods: {
    back() {
      this.$router.push("/fimm/distributor-configuration");
    },
    varlistpopulate(event, name){
      console.log("Event=",event.target.checked);
      console.log("Index=",name);

      this.model.EdiVARIATION.find((o, i) => {
        if(name == o.name){
            this.model.EdiVARIATION[i] = {name: o.name, selected: event.target.checked};
            return true;
        }
      });
      console.log('this.model.EdiVARIATION = ', this.model.EdiVARIATION);
    },

  getAllmarketingApproach: async function () {
      const response = await servicesModule0.getAllDistributorSettingList(
        "MARKETING_APPROACH"
      );
      this.MarketingApproachList = response;
    },
    getAllTypeStructure: async function () {
      const response = await servicesModule0.getAllDistributorSettingList(
        "TYPE_STRUCTURE"
      );
      this.TypeStructure = response;
    },

    getAllConsultantType: async function () {
      const response = await servicesModule0.getAllConsultantTypeList();
      this.ConsultantTypeList = response;
    },

    async submitDistributorType(item) {
      // this.selectedType = [];
      let VARIATION=[];
      this.model.VARIATION.forEach((element) => {
        if (element.selected == true) {
                VARIATION.push(element.name);
              }
      });
      let variation = "";
      if(VARIATION.length > 0){
        variation = VARIATION.join(" | ");
      }
      console.log("MARKETING_APPROACH_ID=", JSON.stringify(this.VARIATION));
      console.log("SCHEME=", this.model.SCHEME.CONSULTANT_TYPE_ID);
      const data = new FormData();
     // data.append("VARIATION", JSON.stringify(this.selectedType));
      data.append("DIST_TYPE_NAME", this.model.DIST_TYPE_NAME);
      data.append("DIST_TYPE_VARIATION", variation);
      data.append(
        "MARKETING_APPROACH_ID",
         this.model.MARKETING_APPROACH_ID.DISTRIBUTOR_SETTING_ID
      );
      data.append(
        "TYPE_STRUCTURE_ID",
        this.model.TYPE_STRUCTURE_ID.DISTRIBUTOR_SETTING_ID
      );
      data.append(
        "SCHEME",
        this.model.SCHEME.CONSULTANT_TYPE_ID
      );
       data.append(
        "ANNUALFEES_ID",
        this.model.ANNUALFEES_ID
      );
      try {
        // eslint-disable-next-line no-unused-vars
        await servicesModule0.createDistributorType(data);
        this.getAllDistributorType();
        this.model.DIST_TYPE_NAME="";
        this.model.ANNUALFEES_ID="";
        this.model.MARKETING_APPROACH_ID=[];
        this.model.TYPE_STRUCTURE_ID=[];
        this.model.SCHEME=[];
        this.model.VARIATION = [
          {name: "UTMC", selected: false },
          {name: "IUTA", selected: false },
          {name: "CUTA", selected: false },
          {name: "CPRA", selected: false },
          {name: "PRP", selected: false },
          {name: "IPRA", selected: false },
        ];
      } catch (error) {
        console.log(error);
      }
    },
    getAllDistributorType: async function () {
      const response = await servicesModule0.getAllDistributorTypeList();
      this.distributorTypeList = response;
      this.DistributorCount = this.distributorTypeList.length;
      console.log("getAllDistributorType=",this.distributorTypeList);
    },

    async editDistributorType(data) {
    const response = await servicesModule0.getDistributorTypeById(
      data.DISTRIBUTOR_TYPE_ID
    );
    console.log("Edit Data=",response.DIST_TYPE_VARIATION);
    this.$modals.simpleModalEditDistFee.$show();
    this.model.EdiVARIATION = [{name: "UTMC", selected: false },
        {name: "IUTA", selected: false },
        {name: "CUTA", selected: false },
        {name: "CPRA", selected: false },
        {name: "PRP", selected: false },
        {name: "IPRA", selected: false }];
    if(response){
        let rdtv = response.DIST_TYPE_VARIATION.split('|');
        rdtv.forEach(elem => {
          this.model.EdiVARIATION.find((o, i) => {
            if(elem.trim() == o.name){
                this.model.EdiVARIATION[i] = {name: o.name, selected: true};
                return true;
            }
          });
        });
    }
    this.model.editDistType.DISTRIBUTOR_TYPE_ID = response.DISTRIBUTOR_TYPE_ID;
    this.model.editDistType.DIST_TYPE_NAME = response.DIST_TYPE_NAME;
    //this.model.editDistType = response;
     this.model.editDistType.MARKETING_APPROACH_ID = {
         SETTING_GENERAL_ID: response.MARKETING_APPROACH_ID,
         DIST_SET_PARAM: response.DIST_SET_PARAM,
        DISTRIBUTOR_SETTING_ID:response.MARKETING_APPROACH_ID,
      };
     this.model.editDistType.TYPE_STRUCTURE_ID = {
         SETTING_GENERAL_ID: response.TYPE_STRUCTURE_ID,
         DIST_SET_PARAM: response.DIST_SET_PARAM1,
         DISTRIBUTOR_SETTING_ID:response.TYPE_STRUCTURE_ID,
      };
      this.model.editDistType.SCHEME = {
          CONSULTANT_TYPE_ID: response.SCHEME,
         TYPE_SCHEME: response.TYPE_SCHEME,
      };
      this.model.editDistType.ANNUALFEES_ID = response.ANNUALFEES_ID;
    //this.model.editDistType.TYPE_STRUCTURE_ID = response.TYPE_STRUCTURE_ID;
    console.log(response);
    },

    async updateDistTypeAPI() {
      let ve = [];
      try {
         this.model.EdiVARIATION.forEach((element) => {
        if (element.selected == true) {
                ve.push(element.name);
              }
      });
      let variationedit = "";
      if(ve.length > 0){
        variationedit = ve.join(" | ");
      }
        const data = new FormData();
        data.append("DISTRIBUTOR_TYPE_ID", this.model.editDistType.DISTRIBUTOR_TYPE_ID);
        data.append("DIST_TYPE_VARIATION", variationedit);
        data.append("DIST_TYPE_NAME", this.model.editDistType.DIST_TYPE_NAME);
         data.append("ANNUALFEES_ID", this.model.editDistType.ANNUALFEES_ID);
       // data.append("DIST_TYPE_VARIATION", variation);
        data.append(
          "MARKETING_APPROACH_ID",
          this.model.editDistType.MARKETING_APPROACH_ID.DISTRIBUTOR_SETTING_ID
        );
        data.append(
          "TYPE_STRUCTURE_ID",
          this.model.editDistType.TYPE_STRUCTURE_ID.DISTRIBUTOR_SETTING_ID
        );
        data.append(
          "SCHEME",
          this.model.editDistType.SCHEME.CONSULTANT_TYPE_ID
        );
        //this.model.editDistType.MARKETING_APPROACH_ID
        console.log("Formdata=",this.model.editDistType);
        console.log("Update=",this.model.editDistType.MARKETING_APPROACH_ID.DISTRIBUTOR_SETTING_ID);
         console.log("Update1=",this.model.editDistType.TYPE_STRUCTURE_ID.DISTRIBUTOR_SETTING_ID);
         const response = await servicesModule0.updateDistributorType(data);
        this.getAllDistributorType();
      } catch (error) {
        console.log(error);
      }
    },

    async deleteDistType(data) {
      if (confirm("Are you sure you want to delete?")) {
      // eslint-disable-next-line no-unused-vars
      const response = await servicesModule0.deleteDistributorType(
        data.DISTRIBUTOR_TYPE_ID
      );
      this.getAllDistributorType();
      }
    },
    searchType: debounce(function (term) {
      this.term = term;
      console.log("term=", this.term);
      }, 400),


  },

  computed: {
    distributorType() {
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
          name: "TYPE_NAME",
          title: "DISTRIBUTOR TYPE ",
          sortField: "TYPE_NAME",
        },
        {
          name: "VARIATION",
          title: "VARIATION TYPE ",
          sortField: "VARIATION",
        },
        // {
        //   name: "CONS_NAME",
        //   title: "SCHEME",
        //   sortField: "CONS_NAME",
        // },
        {
          name: "MARKETING_APPROACH",
          title: "MARKETING APPROACH",
          sortField: "MARKETING_APPROACH",
        },
        {
          name: "TYPE_STRUCTURE",
          title: "STRUCTURE TYPE",
          sortField: "TYPE_STRUCTURE",
        },
         {
          name: "ANNUALFEE",
          title: "ANNUAL FEE REFERENCES ",
          sortField: "ANNUALFEE",
          dataClass: "text-center",
        },

        {
          name: "__slot:actions",
          title: "Action",
          dataClass: "justify-content-center",
          width: "15%",
        },
      ];
    },
    filteredDistributorType() {
      if (!this.term || this.term.length < 1) {
        return this.distributorTypeList;
      }
      console.log("dsfds",this.term);
       return this.distributorTypeList.filter((item) => {
        return this.term
          .toLowerCase()
          .split(" ")
          .every(
            (v) =>
              item.TYPE_NAME.toLowerCase().includes(v) ||
              item.CONS_NAME.toLowerCase().includes(v) ||
              item.MARKETING_APPROACH.toLowerCase().includes(v) ||
              item.ANNUALFEE.toString().toLowerCase().includes(v) ||
              item.TYPE_STRUCTURE.toString().toLowerCase().includes(v) ||
              item.VARIATION.toString().toLowerCase().includes(v)
          );
      });
    },
  },
};
</script>
<style>
.star{
  color: red;
}
.col-md-10{

}
.form-multiselect{
  border:none !important;
  margin: 10px -10px 10px 0px;
}
.multiselect__select{
  right: 10px !important;
}
.vudal{
  width: 970px !important;
}
.edit_col{
  margin-top:10px;
}
.form-gap{
  margin: 12px !important;
}
.clear{
  margin-bottom: 100px;
}
.cleartype{
  margin-bottom: 80px;
}
.col-md-9{
  max-width: 71% !important;
}
.annual{
  left: 10px;
}
</style>
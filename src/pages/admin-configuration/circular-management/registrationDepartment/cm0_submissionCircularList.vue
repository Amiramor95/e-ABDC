<template>
  <va-card>
    <loder v-show="isLoader" />

    <div class="text-center text-danger my-2" v-if="!isDataReady">
      <b-spinner class="align-middle"></b-spinner>
      <strong>Loading...</strong>
    </div>
    <div v-else >
        <br />
        <div class="row">
          <div class="col">
            <h4 class="card-title">  REVIEW: LIST OF {{ DIPT_NAME }} DEPARTMENT CIRCULAR </h4>
          </div>
          <div class="col float-right">
            <div class="float-right">
              <h5>
              <b-badge v-b-toggle.collapse-1 class="ml-1 mr-1" variant="secondary"
                ><i class="fa fa-search"></i
                ></b-badge>
              </h5>
            </div>
          </div>
        </div>

      <b-collapse id="collapse-1" class="mt-2">
        <b-card>
          <vue-form-generator 
          :model="model" 
          :schema="SearchSchema" 
          >
          </vue-form-generator>
          </br></br></br>
          <button type="button" class="ml-2 btn btn-sm btn-primary" @click.prevent="searchCircular">
            Search
          </button>
          <button
            @click.prevent="reset"
            type="button"
            class="ml-2 btn btn-sm btn-danger"
          >
            Reset
          </button>
        </b-card>
      </b-collapse>
      <br />

      <va-data-table
        :datacount="eventListCount"
        :fields="fields"
        :data="filteredData"
        :per-page="parseInt(perPage)"
      >
        <!-- A virtual column -->
        <template slot="no" slot-scope="row">
          {{ row.rowIndex + 1 }}
        </template>
        <template slot="actions" slot-scope="props">
          <h4 class="mt-2">
            <span
              v-if="
                props.rowData.PUBLISH_STATUS ==2  || 
                props.rowData.PUBLISH_STATUS == 3 ||
                props.rowData.PUBLISH_STATUS == 4 ||
                props.rowData.PUBLISH_STATUS == 5 ||
                props.rowData.PUBLISH_STATUS == 6 
              "
              v-b-tooltip.hover
              title="View Circular"
              v-on:click="details(props.rowData)"
              class="badge badge-success mr-2"
            >
              <i class="fa fa-bars"></i
            ></span>
            <span
              v-if="
                props.rowData.PUBLISH_STATUS == 1 ||
                props.rowData.PUBLISH_STATUS == 7
              "
              v-b-tooltip.hover
              title="Review"
              v-on:click="edit(props.rowData)"
              class="badge badge-primary mr-2"
            >
              <i class="fa fa-edit"></i
            ></span>

          </h4>
        </template>
      </va-data-table>
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
import Vue from "vue";
import Vudal from "vudal";
import VueFormGenerator from "vue-form-generator";
import "vue-form-generator/dist/vfg.css";
import { debounce } from "lodash";
import moment from "moment";
import * as servicesModule0 from "../../../../app/module0/services";
import updatecircular from './cm0_updateCircular';  
import loder from "../../../request_loader";

Vue.use(VueFormGenerator);

export default {

  components: {
    Vudal,updatecircular,loder
  },

  mounted() {
    this.getAllEvent();
    this.getTaskStatus();
    this.getAllDepartment(this.$route.params.MANAGE_DEPARTMENT_ID);
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    clear() {
      this.dateFormat = null;
      this.term = null;
    },
    // Get all Depaartment
    getAllDepartment: async function (dept) {
      this.isDataReady = false; // Kill Loader
      const response = await servicesModule04.getAnnounceDept();
      response.forEach((item) => {
        if(item.MANAGE_DEPARTMENT_ID == dept){
          this.DIPT_NAME = item.DPMT_NAME;
        }
      });
    },
    async getAllEvent() {
      //1:RD , 2:LRA, 3:SUPERVISION, 4:IDS, 5:PDS, 6:RA, 7:IT, 8:FIN	
      var title=null; 
      var status=null;
      var dept = this.$route.params.MANAGE_DEPARTMENT_ID; 
      const response = await servicesModule0.getAllReviewCircular(title,status,dept);
      this.items = response;
      this.eventListCount = this.items.length;
      this.isDataReady = true;
    },

   search: debounce(function (term) {
      this.term = term;
      console.log(this.term);
    }, 400),

    async searchCircular() {
      //1:RD , 2:LRA, 3:SUPERVISION, 4:IDS, 5:PDS, 6:RA, 7:IT, 8:FIN
      this.isLoader = true; // Loder
      var title = this.model.searchData.title;
      var status = this.model.searchData.status.TS_ID;
      var dept = this.$route.params.MANAGE_DEPARTMENT_ID; 
      //1:RD , 2:LRA, 3:SUPERVISION, 4:IDS, 5:PDS, 6:RA, 7:IT, 8:FIN 
      const response = await servicesModule0.getAllReviewCircular(title,status,dept);
      this.items = response;
      this.eventListCount = this.items.length;
      this.model.searchData.title = '';
      this.model.searchData.status = '';
      this.isLoader = false // Kill Loader
    },

    async getTaskStatus(){
      const response = await servicesModule0.getTaskStatus();
      this.statusItems = response;
    },

    async deleteItem(data) {
      if (confirm("Are you sure you want to delete?")){
        this.isLoader = true; // Loder
        const response = await servicesModule0.deleteCircular(data);
        this.getAllEvent();
        this.isLoader = false; // Kill Loder
      }
    },

    edit(data) {
      this.$router.push({
        name: "rd-review-update-circular",
        params: { CIRCULAR_EVENT_ID: data.CIRCULAR_EVENT_ID }
      });
    },
    details(data) {
      this.$router.push({
        name: "rd-circular-details",
        params: { CIRCULAR_EVENT_ID: data.CIRCULAR_EVENT_ID }
      });
    },

    getCirculatStatus(status){
      //1: SUBMIT 0:SAVE AS DRAFT 2:HOD APPROVED 3:HOD RETURN 4:GM APPROVED 5:GM RETURN 6:REJECTED
      if(status == 1){
        return "PENDING FOR HOD APPROVAL";
      }else if(status == 2){
          return "PENDING FOR GM APPROVAL";
      }else if(status == 3){
          return "RETURN BY HOD";
      }else if(status == 4){
          return "APPROVED BY GM";
      }else if(status == 5){
          return "RETURN BY GM";
      }else if(status == 6){
          return "REJECTED";              
      }else if(status == 7){
          return "HOD SAVE AS DRAFT";              
      }else if(status == 8){
          return "GM SAVE AS DRAFT";              
      }else{
        return "DRAFT";  
      }
    },

    create() {
      this.$router.push("/fimm/rd-new-circular");
    },

    reset() {
      this.model.searchData.title = '';
      this.model.searchData.status.TS_ID = '';
      this.model.searchData.status.TS_PARAM = '';
    },
  },

  computed: {
    fields() {
      return [
        {
          name: "__slot:no",
          title: "No"
          
        },
         {
          name: "CREATE_TIMESTAMP",
          title: "CREATION DATE",
          sortField: "CREATE_TIMESTAMP",
        },
        {
          name: "EVENT_TITLE",
          title: "TITLE",
          sortField: "EVENT_TITLE",
        },
        
        {
          name: "EVENT_DATE_START",
          title: "START DATE",
          sortField:"EVENT_DATE_START",
        },
        {
          name: "EVENT_DATE_END",
          title: "END DATE",
           sortField:"EVENT_DATE_END",
        },
        
        {
          name: "TS_PARAM",
          title: "STATUS",
          sortField:"TS_PARAM",
        },

       {
          name: "USER_NAME",
          title: "LATEST UPDATE BY",
          sortField: "USER_NAME",
        },

        
        {
          name: "__slot:actions",
          title: "Action",
          dataClass: "justify-content-center",
        }
      ];
    },
    filteredData() {
      if (!this.term || this.term.length < 1) {
        return this.items;
      }

      return this.items.filter(item => {
        return this.term
          .toLowerCase()
          .split(" ")
          .every(
            v =>
              item.EVENT_TITLE.toLowerCase().includes(v) ||
              item.EVENT_DATE_END.toLowerCase().startsWith(
                this.term.toLowerCase()
              ) ||
              item.EVENT_DATE_START.toLowerCase().startsWith(
                this.term.toLowerCase()
              )
          );
      });
    }
  },
  data() {
    return {
      // Data for loder
      isLoader: false,
      isDataReady:false,

      DIPT_NAME:'',
      circularData:{},
      dateFormat: "",
      term: null,
      perPage: "6",
      perPageOptions: ["4", "6", "10", "20"],
      eventListCount: null,
      items: [
       
      ],
      statusItems : [],

      model: {
        title: "",
        dateCreated: "",
        createdBy: "",
        status: "",

        searchData:{
          title:"",
          status:"",
        },
      },

      SearchSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "input",
                inputType: "text",
                model: "searchData.title",
                label: "Title",
                styleClasses: "col-md-6"
              },
              {
                label: "Status",
                type: "vueMultiSelect",
                model: "searchData.status",
                placeholder: "Select Audience",
                selectOptions: {
                  multiple: false,
                  key: "TS_ID",
                  label: "TS_PARAM",
                  searchable: true
                },
                values: (model, schema) => {
                  return this.statusItems;
                },
                styleClasses: "col-md-6",
              },
            ]
          }
        ]
      },

      
     
    };
  }
};
</script>
<style lang="scss">
.va-data-table__pagination {
  margin-top: 1rem;
  display: -webkit-box;
  display: -ms-flexbox;
  display: inherit;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: flex-end;
}

.bgcolor {
  background-color: white !important;
}

.alignleft {
  display: flex;
  justify-content: flex-end;
}
.alignright {
  display: flex;
  justify-content: flex-start;
}
</style>


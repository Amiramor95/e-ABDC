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
            <h4 class="card-title">LIST OF {{ this.$route.params.DPMT_NAME }} DEPARTMENT ANNOUNCEMENT</h4>
          </div>
          <div class="col float-right">
            <div class="float-right">
              <h5>
              <b-badge v-b-toggle.collapse-1 class="ml-1 mr-1" variant="secondary"
                ><i class="fa fa-search"></i
                ></b-badge>
                <span
                  v-b-tooltip.hover
                  title="create"
                  v-on:click="create"
                  class="badge badge-primary"
                >
                  <i class="fa fa-plus"></i
                ></span>
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
          <button type="button" class="ml-2 btn btn-sm btn-primary" @click.prevent="searchAnnouce">
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
                props.rowData.PUBLISH_STATUS == 1 || 
                props.rowData.PUBLISH_STATUS == 2 || 
                props.rowData.PUBLISH_STATUS == 3
              "
              v-b-tooltip.hover
              title="View Announcement"
              v-on:click="details(props.rowData)"
              class="badge badge-success mr-2"
            >
              <i class="fa fa-bars"></i
            ></span>
            <span
              v-if="props.rowData.PUBLISH_STATUS == 0 || props.rowData.PUBLISH_STATUS == 3"
              v-b-tooltip.hover
              title="edit"
              v-on:click="edit(props.rowData)"
              class="badge badge-primary mr-2"
            >
              <i class="fa fa-edit"></i
            ></span>
            <span
              v-if="props.rowData.PUBLISH_STATUS == 0 || props.rowData.PUBLISH_STATUS == 3"
              v-b-tooltip.hover
              title="delete"
              v-on:click="deleteItem(props.rowData)"
              class="badge badge-danger mr-1"
            >
              <i class="fa fa-trash"></i
            ></span>
          </h4>
        </template>
      </va-data-table>
      <br />
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
import Vue from "vue";
import Vudal from "vudal";
import VueFormGenerator from "vue-form-generator";
import "vue-form-generator/dist/vfg.css";
import { debounce } from "lodash";
import moment from "moment";
import * as servicesModule0 from "../../../app/module0/services"; 
import loder from "../../request_loader";

Vue.use(VueFormGenerator);

export default {

  components: {
    Vudal,loder
  },

  mounted() {
    this.getAllEvent();
    this.getTaskStatus();
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    clear() {
      this.dateFormat = null;
      this.term = null;
    },
    async getAllEvent() {
      //1:RD , 2:LRA, 3:SUPERVISION, 4:IDS, 5:PDS, 6:RA, 7:IT, 8:FIN
      var dept = this.$route.params.MANAGE_DEPARTMENT_ID; 	
      const response = await servicesModule0.getAllEvent(dept);
      this.items = response;
      this.eventListCount = this.items.length;
      this.isDataReady = true;
    },

   search: debounce(function (term) {
      this.term = term;
      console.log(this.term);
    }, 400),

    async searchAnnouce() {
      //1:RD , 2:LRA, 3:SUPERVISION, 4:IDS, 5:PDS, 6:RA, 7:IT, 8:FIN
      this.isLoader = true; // Loder
      var title = this.model.searchData.title;
      var status = this.model.searchData.status.TS_ID;
      var dept = this.$route.params.MANAGE_DEPARTMENT_ID; 
      const response = await servicesModule0.searchAnnouce(dept,title,status);
      this.items = response;
      this.eventListCount = this.items.length;

      var title = this.model.searchData.title = '';
      var status = this.model.searchData.status = '';

      this.isLoader = false // Kill Loader
    },

    async getTaskStatus(){
      const response = await servicesModule0.getTaskStatus();
      this.statusItems = response;
    },

    async deleteItem(data) {
      if (confirm("Are you sure you want to delete?")){
        this.isLoader = true;  // Loder before delete
        const response = await servicesModule0.deleteAnnouncement(data.MANAGE_EVENT_ID);
        this.getAllEvent();
        this.isLoader = false;  // Kill Loder
      }
    },

    edit(data) {
      this.$router.push({
        name: "update-event",
        params: { MANAGE_EVENT_ID: data.MANAGE_EVENT_ID }
      });
    },
    details(data) {
      this.$router.push({
        name: "event-approval-details",
        params: { MANAGE_EVENT_ID: data.MANAGE_EVENT_ID }
      });
    },

    create() {
      var dept = this.$route.params.MANAGE_DEPARTMENT_ID; 
      this.$router.push({
        name: "new-event",
        params: { MANAGE_DEPARTMENT_ID : dept }
      });
      //this.$router.push("/fimm/new-event");
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
          dataClass: "status-color",
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

      circularData:{},
      dateFormat: "",
      term: null,
      perPage: "10",
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
.status-color {
  color: orange;
}
</style>

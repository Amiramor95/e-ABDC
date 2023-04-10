<template>
  <va-card>
    <template slot="header">
      <br />
      <div class="row">
        <div class="col">
          <h4 class="card-title">List of Circulars</h4>
        </div>
        <div class="col float-right">
          <div class="float-right">
            <h5>
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
    </template>
    <b-collapse id="collapse-1" class="mt-2">
      <b-card>
        <vue-form-generator :model="model" :schema="schema" ref="firstTabForm">
        </vue-form-generator>
        <button type="button" class="ml-2 btn btn-sm btn-primary">
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
    <div class="row">
      <div class="flex md6"> 
        <div class="row">
          <div class="flex xs12 md5">
            <datepicker
              :value="term"
              @input="searchDate"
              placeholder="dd MM yyyy"
              format="dd MMM yyyy"
              input-class="form-control bgcolor col-md-12"
              v-model="dateFormat"
              :typeable="false"
              name="uniquename"
            ></datepicker>
          </div>
          <div class="flex xs12 md7">
            <button
              @click.prevent="clear"
              type="button"
              class="btn btn-md btn-primary"
            >
             <va-icon name="fa fa-refresh"/>
              
            </button>
          </div>
        </div>
      </div>
      <div class="flex md3 offset--md3">
        <va-input
          :value="term"
          :placeholder="$t('Search')"
          @input="search"
          removable
        >
          <va-icon name="fa fa-search" slot="prepend" />
        </va-input>
      </div>
    </div>
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
            v-if="props.rowData.TS_ID != 1 "
            v-b-tooltip.hover
            title="detail"
            v-on:click="details(props.rowData)"
            class="badge badge-success mr-2"
          >
            <i class="fa fa-bars"></i
          ></span>
          <span
            v-if="props.rowData.TS_ID == 1"
            v-b-tooltip.hover
            title="edit"
            v-on:click="edit(props.rowData)"
            class="badge badge-primary mr-2"
          >
            <i class="fa fa-edit"></i
          ></span>
          <span
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
  
  </va-card>
</template>
<script>
import Vue from "vue";
import VueFormGenerator from "vue-form-generator";
import "vue-form-generator/dist/vfg.css";
import { debounce } from "lodash";
import moment from "moment";
import * as servicesModule0 from "../../../../app/module0/services";

Vue.use(VueFormGenerator);

export default {
  mounted() {
    this.getAllEvent();
  },
  methods: {
    clear() {
      this.dateFormat = null;
      this.term = null;
    },
    async getAllEvent() {
      //1:RD , 2:LRA, 3:SUPERVISION, 4:IDS, 5:PDS, 6:RA, 7:IT, 8:FIN	
      const response = await servicesModule0.getAllCircular(1);
      this.items = response;
      this.eventListCount = this.items.length;
    },

   search: debounce(function (term) {
      this.term = term;
      console.log(this.term);
    }, 400),

    searchDate(date) {
      this.term = moment(date).format("DD MMM y");
      //alert(this.term);
    },

    deleteItem(data) {
      console.log(JSON.stringify(data));
    },

    edit(data) {
      this.$router.push({
        name: "rd-update-circular",
        params: { CIRCULAR_EVENT_ID: data.CIRCULAR_EVENT_ID }
      });
    },

    create() {
      this.$router.push("/fimm/rd-new-circular");
    },

    reset() {}
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
      dateFormat: "",
      term: null,
      perPage: "6",
      perPageOptions: ["4", "6", "10", "20"],
      eventListCount: null,
      items: [
       
      ],

      model: {
        title: "",
        dateCreated: "",
        createdBy: "",
        status: ""
      },

      schema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "input",
                inputType: "text",
                model: "title",
                label: "Title",
                styleClasses: "col-md-6"
              },
              {
                type: "input",
                inputType: "date",
                label: "Date Created",
                model: "dateCreated",
                format: "YYYY-MM-DD HH:mm:ss",
                styleClasses: "col-md-6"
              },
              {
                type: "input",
                inputType: "text",
                model: "createdBy",
                label: "Created By",
                styleClasses: "col-md-6"
              },
              {
                type: "select",
                label: "Status",
                model: "status",
                styleClasses: "col-md-6",

                values: (model, schema) => {
                  return this.status;
                }
              }
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

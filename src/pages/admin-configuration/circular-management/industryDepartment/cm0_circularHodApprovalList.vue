<template>
  <va-card>
    <template slot="header">
      <br />
      <div class="row">
        <div class="col">
          <h4 class="card-title">List of Event Submission</h4>
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
      <template slot="ANNOUNCEMENT_STATUS" slot-scope="props">
        <div v-if="props.rowData.TS_ID == 1">
          Pending
        </div>
        <div v-if="props.rowData.TS_ID == 15">
          PENDING
        </div>
        <div v-if="props.rowData.TS_ID == 3">
          APPROVED
        </div>
        <div v-if="props.rowData.TS_ID == 9">
          RETURN
        </div>
      </template>
      <template slot="actions" slot-scope="props">
        <h4 class="mt-2">
          <span
            v-if="props.rowData.TS_ID == 3"
            v-b-tooltip.hover
            title="detail"
            v-on:click="edit(props.rowData)"
            class="badge badge-success mr-2"
          >
            <i class="fa fa-bars"></i
          ></span>
          <span
            v-b-tooltip.hover
            title="view"
            v-on:click="edit(props.rowData)"
            class="badge badge-primary mr-2"
          >
            <i class="fa fa-eye"></i
          ></span>
          
        </h4>
      </template>
    </va-data-table>
    <br />
    <br />
    <br />
    <br />
    <button @click="back" type="button" class="btn btn-primary btn-fill btn-md">
      <i class="fa fa-step-backward" /> &nbsp; Previous
    </button>
  </va-card>
</template>
<script>
import Vue from "vue";
import VueFormGenerator from "vue-form-generator";
import "vue-form-generator/dist/vfg.css";
import { debounce } from "lodash";
import moment from "moment";
import * as servicesModule0 from "../../../app/module0/services";

Vue.use(VueFormGenerator);

export default {
  mounted() {
    this.getAllEvent();
    this.APRROVAL = JSON.parse(data);
  },
  methods: {
    clear() {
      this.dateFormat = null;
      this.term = null;
    },
    async getAllEvent() {
      console.log("get all event : ");
      const response = await servicesModule0.getApprList('REGISTRATION DEPARTMENT', 0);
      this.items = response;
      this.eventListCount = this.items.length;
      //console.log("get all event : " + response);
    },

   search: debounce(function (term) {
      this.term = term;
      console.log(this.term);
    }, 400),

    searchDate(date) {
      this.term = moment(date).format("DD MMM y");
      //alert(this.term);
    },

    setting() {
      this.$router.push("/admin/approver_setting");
    },

    details() {
      console.log("jhdfj");
      this.$router.push("/admin/notification_detail");
    },

    deleteItem(data) {
      console.log(JSON.stringify(data));
    },

    edit(data) {
      // this.$router.push("/admin/announcement_details");
      this.$router.push({
        name: "event-hod-approval",
        params: { MANAGE_EVENT_ID: data.MANAGE_EVENT_ID }
      });
    },

    create() {
      this.$router.push("/fimm/new-event");
    },

    reset() {}
  },

  computed: {
    fields() {
      return [
        {
          name: "__slot:marker",
          width: "30px",
          dataClass: "text-center"
        },
        {
          name: "__slot:no",
          title: "No"
          // width: "30px"
          // height: "45px"
          // dataClass: "text-center"
        },
        {
          name: "EVENT_TITLE",
          title: "Event Title"
        },
        // {
        //   name: "EVENT_CONTENT",
        //   title: "Event Content"
        //   // width: "30%"
        // },
        {
          name: "EVENT_DATE_START",
          title: "Start Date"
          // width: "40%"
        },
        {
          name: "EVENT_DATE_END",
          title: "End Date"
          // width: "40%"
        },
        {
          name: "EVENT_DATE_END",
          title: "End Date"
          // width: "40%"
        },
        {
          name: "USER_NAME",
          title: "Creation By"
          // width: "40%"
        },
        {
          name: "__slot:TS_PARAM",
          title: "Status"
          // width: "40%"
        },
        // {
        //   name: "__slot:filename",
        //   title: "Document"s
        //   // width: "20%"
        // },
        {
          name: "__slot:actions",
          title: "Action",
          dataClass: "justify-content-center",
          width: "15%"
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
      APRROVAL: '',
    // fields: [],
    items:[],

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

      type: [
        {
          id: "UTMC",
          name: "UTMC"
        },
        {
          id: "IUTA",
          name: "IUTA"
        },
        {
          id: "CUTA",
          name: "CUTA"
        }
      ],
      
    
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

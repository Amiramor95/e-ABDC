<template>
  <va-card>
    <template slot="header">
      <br />
      <div class="row">
        <div class="col">
          <h4 class="card-title">List of Event</h4>
        </div>
        <div class="col float-right">
          <div class="float-right">
            <h5>
              <b-badge
                v-b-tooltip.hover
                title="Approval Setting"
                @click.prevent="setting"
                class="mr-1"
                variant="dark"
              >
                <i class="fa fa-cog"></i>
              </b-badge>
              <b-badge
                v-b-tooltip.hover
                title="search"
                v-b-toggle.collapse-1
                class="mr-1"
                variant="secondary"
              >
                <i class="fa fa-search"></i>
              </b-badge>
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
    <!-- <div class="alignleft">
      <div class="flex xs12 md3 right">
        <va-input
          :value="term"
          :placeholder="$t('Search By Event')"
          @input="search"
          removable
        >
          <va-icon name="fa fa-search" slot="prepend" />
        </va-input>
      </div>
    </div> -->
    <div class="row">
      <div class="flex md6">
        <!-- <va-date-picker
          :value="term"
          @input="searchDate"
          :config="{ enableTime: false, dateFormat: 'd M Y' }"
          v-model="dateFormat"
          placeholder="Search date"
        /> -->
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
    <!-- <br /> -->
    <!-- <div class="float-left">
      <va-date-picker
        :value="term"
        @input="searchDate"
        :config="{ enableTime: false, dateFormat: 'd-m-Y' }"
        v-model="dateFormat"
      />
    </div> -->
    <!-- Main table element -->
    <!-- <div class="col-ml-2"> -->
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
        <div v-if="props.rowData.ANNOUNCEMENT_STATUS == 1">
          Draft
        </div>
        <div v-if="props.rowData.ANNOUNCEMENT_STATUS == 2">
          Pending
        </div>
      </template>
      <template slot="actions" slot-scope="props">
        <h4 class="mt-2">
          <span
            v-if="props.rowData.ANNOUNCEMENT_STATUS == 2"
            v-b-tooltip.hover
            title="detail"
            v-on:click="edit(props.rowData)"
            class="badge badge-success mr-2"
          >
            <i class="fa fa-edit"></i
          ></span>
          <span
            v-if="props.rowData.ANNOUNCEMENT_STATUS == 1"
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
    <br />
    <br />
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
      console.log("get all event : ");
      const response = await servicesModule0.getAllEvent('FINANCE');
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
        name: "fin-update-event",
        params: { MANAGE_EVENT_ID: data.MANAGE_EVENT_ID }
      });
    },

    create() {
      this.$router.push("/fimm/fin-new-event");
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
        // {
        //   name: "EVENT_DATE_END",
        //   title: "End Date"
        //   // width: "40%"
        // },
        // {
        //   name: "CREATE_BY",
        //   title: "Creation By"
        //   // width: "40%"
        // },
        {
          name: "__slot:ANNOUNCEMENT_STATUS",
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
      items: [
        {
          no: 1,
          title:
            "Appointment of Chief Executive Officer hgfhfghfghfg dfgdfgdgdfg dfgdfgdfgdgdf sdgsgsdfsdfsdfsdfsdf sdfsdfsdf",
          content:
            "Mr. Kaleon Leong is the newly appointed Chief Executive Officer of the Federation of Investment Managers Malaysia (FIMM) effective 1 October 2018. He comes with over 20 years of experience in various senior management roles in the Malaysian investment management industry, specialising in the fields of unit trust and asset management, regulations and auditing.",
          dateCreated: "24-11-2020",
          createdBy: "Nur Suhaila",
          status: "Draft",
          startDate: "24-11-2020",
          endDate: "24-12-2020"
        },
        {
          no: 2,
          title: "Appointment of Chief Executive Officer",
          content:
            "Mr. Kaleon Leong is the newly appointed Chief Executive Officer of the Federation of Investment Managers Malaysia (FIMM) effective 1 October 2018. He comes with over 20 years of experience in various senior management roles in the Malaysian investment management industry, specialising in the fields of unit trust and asset management, regulations and auditing.",
          dateCreated: "24-11-2020",
          createdBy: "Nur Suhaila",
          status: "Draft",
          startDate: "24-11-2020",
          endDate: "24-12-2020"
        },
        {
          no: 3,
          title: "Appointment of Chief Executive Officer",
          content:
            "Mr. Kaleon Leong is the newly appointed Chief Executive Officer of the Federation of Investment Managers Malaysia (FIMM) effective 1 October 2018. He comes with over 20 years of experience in various senior management roles in the Malaysian investment management industry, specialising in the fields of unit trust and asset management, regulations and auditing.",
          dateCreated: "24-11-2020",
          createdBy: "Nur Suhaila",
          status: "Draft",
          startDate: "24-11-2020",
          endDate: "24-12-2020"
        },
        {
          no: 4,
          title: "Appointment of Chief Executive Officer",
          content:
            "Mr. Kaleon Leong is the newly appointed Chief Executive Officer of the Federation of Investment Managers Malaysia (FIMM) effective 1 October 2018. He comes with over 20 years of experience in various senior management roles in the Malaysian investment management industry, specialising in the fields of unit trust and asset management, regulations and auditing.",
          dateCreated: "24-11-2020",
          createdBy: "Nur Suhaila",
          status: "Draft",
          startDate: "24-11-2020",
          endDate: "24-12-2020"
        },
        {
          no: 5,
          title: "Appointment of Chief Executive Officer",
          content:
            "Mr. Kaleon Leong is the newly appointed Chief Executive Officer of the Federation of Investment Managers Malaysia (FIMM) effective 1 October 2018. He comes with over 20 years of experience in various senior management roles in the Malaysian investment management industry, specialising in the fields of unit trust and asset management, regulations and auditing.",
          dateCreated: "24-11-2020",
          createdBy: "Ahmad",
          status: "Publish",
          startDate: "24-11-2020",
          endDate: "24-12-2020"
        },
        {
          no: 6,
          title: "Appointment of Chief Executive Officer",
          content:
            "Mr. Kaleon Leong is the newly appointed Chief Executive Officer of the Federation of Investment Managers Malaysia (FIMM) effective 1 October 2018. He comes with over 20 years of experience in various senior management roles in the Malaysian investment management industry, specialising in the fields of unit trust and asset management, regulations and auditing.",
          dateCreated: "24-11-2020",
          createdBy: "Ahmad",
          status: "Publish",
          startDate: "24-11-2020",
          endDate: "24-12-2020"
        },
        {
          no: 7,
          title: "Appointment of Chief Executive Officer",
          content:
            "Mr. Kaleon Leong is the newly appointed Chief Executive Officer of the Federation of Investment Managers Malaysia (FIMM) effective 1 October 2018. He comes with over 20 years of experience in various senior management roles in the Malaysian investment management industry, specialising in the fields of unit trust and asset management, regulations and auditing.",
          dateCreated: "24-11-2020",
          createdBy: "Ahmad",
          status: "Publish",
          startDate: "24-11-2020",
          endDate: "24-12-2020"
        }
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
      status: [
        {
          id: "Publish",
          name: "Publish"
        },
        {
          id: "Draft",
          name: "Draft"
        }
      ],
      category: [
        {
          id: "Agent",
          name: "Agent"
        },
        {
          id: "Employee",
          name: "Employee"
        }
      ]
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

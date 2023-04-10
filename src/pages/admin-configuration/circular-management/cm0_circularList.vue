<template>
  <va-card>
    <template slot="header">
      <br />
      <div class="row">
        <div class="col">
          <h4 class="card-title">List of Circular</h4>
        </div>
        <div class="col float-right">
          <div class="float-right">
            <h5>
              <b-badge
                v-b-tooltip.hover
                title="search"
                v-b-toggle.collapse-1
                class="mr-1"
                variant="secondary"
              >
                <i class="fa fa-search"></i>
              </b-badge>
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
    <div class="alignleft">
      <div class="flex xs12 md3 left">
        <va-input
          :value="term"
          :placeholder="$t('Search By Event')"
          @input="search"
          removable
        >
          <va-icon name="fa fa-search" slot="prepend" />
        </va-input>
      </div>
    </div>
    <br />

    <!-- Main table element -->
    <va-data-table
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
            v-if="props.rowData.status != 'Draft'"
            v-b-tooltip.hover
            title="detail"
            v-on:click="details(props.rowData)"
            class="badge badge-success mr-2"
          >
            <i class="fa fa-bars"></i
          ></span>
          <span
            v-if="props.rowData.status == 'Draft'"
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
        <!-- <div class="row">
          <h4 v-if="props.rowData.status != 'Draft'">
            <span
              v-b-tooltip.hover
              title="detail"
              v-on:click="details(props.rowData)"
              class="badge badge-success mr-2"
            >
              <i class="fa fa-bars"></i
            ></span>
          </h4>
          <h4 v-if="props.rowData.status == 'Draft'">
            <span
              v-b-tooltip.hover
              title="edit"
              v-on:click="edit(props.rowData)"
              class="badge badge-primary mr-2"
            >
              <i class="fa fa-edit"></i
            ></span>
          </h4>
          <h4>
            <span
              v-b-tooltip.hover
              title="delete"
              v-on:click="deleteItem(props.rowData)"
              class="badge badge-danger mr-1"
            >
              <i class="fa fa-trash"></i
            ></span>
          </h4>
        </div> -->
      </template>
    </va-data-table>
    <br />
    <!-- <div class="flex xs12 md float-right"> -->
    <!-- <va-select
      class="col-md-4 float-right"
      v-model="perPage"
      :label="$t('tables.perPage')"
      :options="perPageOptions"
      noClear
    /> -->
    <!-- </div> -->
  </va-card>
</template>
<script>
import Vue from "vue";
import VueFormGenerator from "vue-form-generator";
import "vue-form-generator/dist/vfg.css";

Vue.use(VueFormGenerator);

export default {
  methods: {
    setting() {
      this.$router.push("/admin/approver_setting");
    },
    details() {
      console.log("jhdfj");
      this.$router.push("/admin/notification_HODReview");
    },

    deleteItem(data) {
      // delete this.items[index];
      console.log(JSON.stringify(data));
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
          name: "dateCreated",
          title: "Date Creation"
          // width: "30%"
        },
        {
          name: "title",
          // title: this.$t('tables.headings.date'),
          width: "20%"
        },
        {
          name: "startDate",
          title: "Start Date"
          // width: "40%"
        },
        {
          name: "endDate",
          title: "End Date"
          // width: "40%"
        },
        {
          name: "createdBy",
          title: "Creation By"
          // width: "40%"
        },
        {
          name: "status",
          title: "Status"
          // width: "40%"
        },
        {
          name: "__slot:actions",
          title: "Action",
          dataClass: "text-right"
        }
      ];
    },
    filteredData() {
      if (!this.term || this.term.length < 1) {
        return this.items;
      }

      return this.items.filter(item => {
        return item.title.toLowerCase().startsWith(this.term.toLowerCase());
      });
    }
  },
  data() {
    return {
      term: null,
      perPage: "6",
      perPageOptions: ["4", "6", "10", "20"],
      items: [
        {
          no: 1,
          title:
            "Cancellation of FIMM Examination Sessions on 21 November and 12 December 2020 – Kota Bharu",
          content: "",
          dateCreated: "24/11/2020",
          createdBy: "Nur Suhaila",
          status: "Draft",
          startDate: "24/11/2020",
          endDate: "24/12/2020"
        },
        {
          no: 2,
          title:
            "Cancellation of FIMM Examination Sessions – Kuching and Other Centres in Peninsular Malaysia except Kuantan and Kota Bharu",
          content: "",
          dateCreated: "24/11/2020",
          createdBy: "Nur Suhaila",
          status: "Draft",
          startDate: "24/11/2020",
          endDate: "24/12/2020"
        },
        {
          no: 3,
          title:
            "Cancellation of FIMM Examination Sessions on 7 to 19 November 2020 – Bayan Lepas",
          content: "",
          dateCreated: "24/11/2020",
          createdBy: "Nur Suhaila",
          status: "Publish",
          startDate: "24/11/2020",
          endDate: "24/12/2020"
        },
        {
          no: 4,
          title:
            "Cancellation of FIMM Examination Sessions on 7 November 2020 – Seremban",
          content: "",
          dateCreated: "24/11/2020",
          createdBy: "Nur Suhaila",
          status: "Publish",
          startDate: "24/11/2020",
          endDate: "24/12/2020"
        },
        {
          no: 3,
          title:
            "Cancellation of FIMM Examination Sessions on 7 to 19 November 2020 – Bayan Lepas",
          content: "",
          dateCreated: "24/11/2020",
          createdBy: "Nur Suhaila",
          status: "Publish",
          startDate: "24/11/2020",
          endDate: "24/12/2020"
        },
        {
          no: 4,
          title:
            "Cancellation of FIMM Examination Sessions on 7 November 2020 – Seremban",
          content: "",
          dateCreated: "24/11/2020",
          createdBy: "Nur Suhaila",
          status: "Publish",
          startDate: "24/11/2020",
          endDate: "24/12/2020"
        },
        {
          no: 3,
          title:
            "Cancellation of FIMM Examination Sessions on 7 to 19 November 2020 – Bayan Lepas",
          content: "",
          dateCreated: "24/11/2020",
          createdBy: "Nur Suhaila",
          status: "Publish",
          startDate: "24/11/2020",
          endDate: "24/12/2020"
        },
        {
          no: 4,
          title:
            "Cancellation of FIMM Examination Sessions on 7 November 2020 – Seremban",
          content: "",
          dateCreated: "24/11/2020",
          createdBy: "Nur Suhaila",
          status: "Publish",
          startDate: "24/11/2020",
          endDate: "24/12/2020"
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
.app-layout__main {
  background: #e8e8e8;
}

.va-data-table__pagination {
  margin-top: 1rem;
  display: -webkit-box;
  display: -ms-flexbox;
  display: inherit;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: flex-end;
}

.alignleft {
  display: flex;
  justify-content: flex-end;
}

.inline {
  display: inline-flex;
  float: right;
}
</style>

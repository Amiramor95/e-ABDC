<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <va-card>
            <div class="row">
              <h4 slot="header" class="card-title">Time Extension Request</h4>
            </div>
            <form @submit.prevent="onsubmit" enctype="multipart/form-data">
              <vue-form-generator
                :model="model"
                :schema="schema"
                :option="formOptions"
              ></vue-form-generator>

              <!-- <div v-if="model.type == 'Subsequent Request for Extension'">
                <va-card>
                  <h4 class="card-title" slot="header">
                    Time Extension Request Record
                  </h4>

                  <va-data-table
                    :fields="tableHeader"
                    :data="model.tableData"
                    :per-page="parseInt(10)"
                    :dataperpage="parseInt(10)"
                    clickable
                  >
                    <template slot="no" scope="item">
                      {{ item.rowIndex + 1 }}
                    </template>
                    <template slot="EXTENSION_APPROVAL_DATE" scope="item">
                    </template>
                    <template slot="action">
                      <b-button class="btn btn-info btn-md">
                        <i class="fa fa-eye"></i>
                      </b-button>
                      <b-button class="btn btn-info btn-md ml-2">
                        <i class="fa fa-plus"></i>
                      </b-button>
                    </template>
                  </va-data-table>
                </va-card>
              </div> -->
              <div>
                Supporting Documents<small style="color: red">*</small>
                <div class="m-1">
                  <vue-form-generator
                    :model="model"
                    :schema="justificationSchema"
                    :options="formOptions"
                  ></vue-form-generator>

                  <vue-form-generator
                    :model="model"
                    :schema="fileUploadSchema"
                    :options="formOptions"
                    ref="fileUploadForm"
                  >
                  </vue-form-generator>
                </div>
              </div>
              <div class="mt-2 row justify--end">
                <b-button
                  type="submit"
                  class="btn btn-info btn-fill btn-md mr-2"
                >
                  <i class="fa fa-edit" /> &nbsp; Save as Draft
                </b-button>

                <b-button type="submit" class="btn btn-success btn-fill btn-md">
                  <i class="fa fa-paper-plane" /> &nbsp; Submit
                </b-button>
              </div>
            </form>
          </va-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueFormGenerator from "vue-form-generator";
import "vue-form-generator/dist/vfg-core.css";
import Vue from "vue";
import Vudal from "vudal";
import moment from "moment";
import VfgDateForwardCalendar from "../../component/VfgDateForwardCalendar.vue";
import axios from 'axios';
import * as servicesModule1 from "../../../app/module1/services07";
import * as servicesModule0 from "../../../app/module0/services02";

Vue.use(VueFormGenerator);
Vue.component("field-vfg-date-forward-calendar", VfgDateForwardCalendar);
Vue.use(Vudal);

export default {
  components: {
    vudal: Vudal,
  },
  computed: {
  },
  data() {
    return {
      // Support Docs
      fileRecords: [],
      fileRecordsForUpload: [],
      uploadFileOject: [],

      // Action Docs
      fileActionPlanRecords: [],
      fileActionPlanRecordsForUpload: [],
      uploadActionPlanFileOject: [],

      // Table
      tableHeader: [
        {
          name: "__slot:no",
          title: "No",
          width: "5%",
        },
        {
          name: "EXTENSION_TYPE",
          title: "Extension Criteria",
          width: "30%",
          // dataClass: "text-center"
        },
        {
          name: "EXTENSION_APPROVAL_DATE",
          title: "Extension Approval Date",
          width: "30%",
          // dataClass: "text-center"
        },
        {
          name: "__slot:action",
          title: "Action",
          width: "10%",
          dataClass: "justify-content-center",
        },
      ],
      // tableData: [],
      perPage: "6",
      perPageOptions: ["4", "6", "10", "20"],

      term: null,
      dateFormat: "",

      schema: {
        fields: [
          {
            type: "radios",
            required: true,
            label: "Extension Type",
            model: "type",
            values: [
              "Commencement of Operation",
              "Document Submission",
              "AMSF and Annual Fee payment",
              "Others (Please Specify)",
              // "Subsequent Request for Extension",
            ],
            styleClasses: "col-md-12",
            onChanged: function (model, newVal, oldVal, field) {
              if (
                newVal == "Commencement of Operation"
              ) {
                this.model.actionPlanVisibility = true;
              } else {
                this.model.actionPlanVisibility = false;
                this.model.fileActionPlan = [];
              }

              if (newVal == "Others (Please Specify)") {
                this.model.otherExtensionFieldVisibility = true;
              }else {
                this.model.otherExtensionFieldVisibility = false;
                this.model.otherExtensionType = null;
              }
            },
          },
          {
            type: "input",
            inputType: "text",
            required: true,
            label: "Please Specify other Extension Type",
            model: "otherExtensionType",
            styleClasses: "col-md-12",
            visible: () => {
              return this.model.otherExtensionFieldVisibility;
            },
            onChanged: (model, newVal, oldVal, field) => {
              model.otherExtensionType = newVal.toUpperCase()
            }
          },
        ],
      },

      justificationSchema: {
        fields: [
          {
            type: "textArea",
            model: "justification",
            label: "Justification / rationale for the request",
            hint: "Max 1000 characters",
            max: 1000,
            rows: 5,
            placeholder: "Justification",
            required: true,
            validator: "string",
            styleClasses: "col-md-12",
            onChanged: (model, newVal, oldVal, field) => {
              model.justification = newVal.toUpperCase()
            }
          },
        ],
      },

      fileUploadSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                labels: "Upload Document",
                accept: ".pdf",
                multiple: true,
                text: "Choose a File",
                model: "file",
                type: "vfg-custom-multiple-file",
                styleClasses: "col-md-12",
                required: true,
              },
            ],
          },
          {
            styleClasses: "row",
            fields: [
              {
                labels: "Action Plan",
                accept: ".pdf",
                multiple: true,
                text: "Choose a File",
                model: "fileActionPlan",
                type: "vfg-custom-multiple-file",
                styleClasses: "col-md-12",
                required: true,
                visible: () => {
                  return this.model.actionPlanVisibility;
                },
              },
            ],
          },
          {
            styleClasses: "row",
            fields: [
              {
                type: "vfg-date-forward-calendar",
                model: "extensionDate",
                labels: "Extension End Date",
                required: true,
                styleClasses: "col-md-3",
                view: 'date',
              },
            ],
          },
        ],
      },

      state: {
        disabledDates: {
          to: new Date(Date.now() - 8640000),
        },
      },
      model: {
        type: "Commencement of Operation",
        otherExtensionType: null,
        name: "",
        justification: null,
        fileUpload: "",
        file: [],
        fileActionPlanUpload: "",
        fileActionPlan: [],
        extensionDate: null,
        visibleStartDate: false,
        actionPlanVisibility: true,
        tableData: [],
        otherExtensionFieldVisibility: false,
      },
      formOptions: {
        validateAfterChanged: true,
      },
    };
  },
  methods: {
    searchDate(date) {
      this.term = moment(date).format("DD MMM y");
    },
    onsubmit: async function() {
      let data = {
        EXTENSION_TYPE: this.model.type.toUpperCase(),
        OTHER_EXTENSION_TYPE: this.model.otherExtensionType,
        JUSTIFICATION: this.model.justification,
        EXTENSION_END_DATE: this.model.extensionDate.toISOString(),
        FILE: this.model.file,
        ACTION_FILE: this.model.fileActionPlan,
        DISTRIBUTOR_ID: JSON.parse(localStorage.getItem("user")).USER_DIST_ID
      };

      let form = new FormData();
      let keys = ['FILE', 'ACTION_FILE'];

      for (var key in data) {
          if (data.hasOwnProperty(key)) {
            if(keys.includes(key)) {
              for(let i = 0; i < data[key].length; i++) {
                form.append(`${key}[]`, data[key][i]);
              }
            } else {
              form.append(key, data[key]);
            }
          }
      }

      for (var pair of form.entries()) {
          console.log(pair[0]+ ', ' + pair[1]);
      }

      let res = await servicesModule1.submitForm(form);

      console.log(res);

    },
    showModal() {
      this.$modals.myModal.$show();
    },

    fetchExtensionList: async function() {
      // let res = await servicesModule1.fetchExtensionLists();
      console.log('here');
      // console.log(res);
    }
  },
};
</script>

<style lang="scss">
.w-150px {
  width: 150px;
  height: 150px;
}

.vue-form-wizard .wizard-icon-circle .wizard-icon-container {
  border-radius: 50% !important;
  margin: -4px;
}
</style>

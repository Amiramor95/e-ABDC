<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">
        Suspension/Revocation : New Submission
      </h4>
    </div>
    <br />
    <va-card>
      <div class="ml-2 col-md-12">
        Distributor Profile
        <span v-if="visibleProfile == false"
          >: <b>{{ DISTDATA.DIST_NAME }}</b></span
        >
        <button
          v-if="visibleProfile == true"
          v-b-toggle.collapse-1
          type="button"
          class="float-right btn-fill btn-md"
        >
          <i class="fa fa-eye-slash"></i>
        </button>
        <button
          v-if="visibleProfile == false"
          v-b-toggle.collapse-1
          type="button"
          class="float-right btn-fill btn-md"
        >
          <i class="fa fa-eye"></i>
        </button>

        <hr />
        <b-collapse id="collapse-1" class="mt-2" v-model="visibleProfile">
          <table class="table table-striped">
            <tbody>
              <tr>
                <td style="width: 20%">Distributor Name</td>
                <td>{{ DISTDATA.DIST_NAME }}</td>
              </tr>
              <tr>
                <td>Registration Number</td>
                <td>{{ DISTDATA.DIST_REGI_NUM1 }}</td>
              </tr>
              <tr>
                <td>New Registration Number</td>
                <td>{{ DISTDATA.DIST_REGI_NUM2 }}</td>
              </tr>
              <tr>
                <td>Phone number</td>
                <td>{{ DISTDATA.DIST_PHONE_NUMBER }}</td>
              </tr>
              <tr>
                <td>Address</td>
                <td>
                  {{ DISTDATA.DIST_ADDR_1 }}
                  {{ DISTDATA.DIST_ADDR_2 }}
                  {{ DISTDATA.DIST_ADDR_3 }} {{ DISTDATA.POSTCODE_NO }}{{ DISTDATA.DIST_POSTAL2 }}<br />
                  {{ DISTDATA.SET_CITY_NAME }}{{ DISTDATA.DIST_CITY2 }} {{ DISTDATA.STATE_NAME }}{{ DISTDATA.DIST_STATE2 }}<br />
                  {{ DISTDATA.COUNTRY_NAME }}{{ DISTDATA.DIST_COUNTRY2 }}
                </td>
              </tr>
              <tr>
                <td>Status</td>
                <td>{{ DISTDATA.TS_PARAM }}</td>
              </tr>
            </tbody>
          </table>
        </b-collapse>
      </div>
    </va-card>
    <br />
    <va-card>
      <div class="ml-3">
        <vue-form-generator
          :model="model"
          :schema="registerNewSchema"
          :options="formOptions"
          ref="registerNewForm"
          @model-updated="onModelUpdated"
        >
        </vue-form-generator>
      </div>
      <br />
      <!-- file upload -->
      <div class="ml-1 col-md-11">
        <vue-form-generator
          :model="model"
          :schema="fileUploadSchema"
          :options="formOptions"
          ref="fileUploadForm"
        >
        </vue-form-generator>
      </div>
    </va-card>
    <br />
    <br />
    <button @click="back" type="button" class="btn btn-primary btn-fill btn-md">
      <i class="fa fa-step-backward" /> &nbsp; Previous
    </button>
    <div class="float-right">
      <button
        @click="saveAsDraft"
        type="button"
        class="mr-1 btn btn-info btn-fill btn-md"
      >
        <i class="fa fa-pencil-square-o" /> &nbsp; Save as draft
      </button>
      <button
        @click="register"
        type="button"
        class="ml-1 btn btn-success btn-fill btn-md"
      >
        <i class="fa fa-paper-plane" /> &nbsp; Submit
      </button>
    </div>
  </va-card>
</template>


<script>
import "vue-form-generator/dist/vfg.css";
import * as servicesModule1 from "../../../../app/module1/services01";
import * as services06Module0 from "../../../../app/module0/services06";
import moment from "moment";

export default {
  mounted() {
    var data = localStorage.getItem("new-submission");
    this.DISTDATA = JSON.parse(data);
    //alert(JSON.stringify(this.DISTDATA));
  },

  components: {},

  methods: {
    back() {
      this.$router.go(-1);
    }, // back button

    onModelUpdated(newVal, schema) {
      if (schema == "SUBMISSION_TYPE") {
        if (newVal == 1) {
          this.visibleEffectiveDate = false;
          this.visibleStartDate = true;
          this.visibleEndDate = true;
        } else {
          this.visibleEffectiveDate = true;
          this.visibleStartDate = false;
          this.visibleEndDate = false;
        }
      }

    },
     //Validation

    validateStartDate(value) {
       if (this.model.startDate != null) {
        if (moment(this.model.startDate).isSameOrAfter(moment())) {
          console.log("Valid");
        } else {
          console.log("not Valid");
          return ["Date cannot be backdated"];
        } // true
      } else {
        console.log("not Valid");
        return ["This field is required"];
      }
    },
    validateEndDate(value) {
      if (moment(this.model.startDate).isSameOrBefore(this.model.endDate)) {
        console.log("Valid");
      } else {
        console.log("not Valid");
        return ["Date is Not Valid"];
      } // true
    },
    saveAsDraft: async function () {

      const data = new FormData();
        data.append("SUBMISSION_TYPE", this.model.SUBMISSION_TYPE);
        this.model.startDate != null
          ? data.append(
              "DATE_START",
              moment(this.model.startDate).format("YYYY-MM-DD")
            )
          : null;
        this.model.endDate != null
          ? data.append(
              "DATE_END",
              moment(this.model.endDate).format("YYYY-MM-DD")
            )
          : null;
        this.model.effectiveDate != null
          ? data.append(
              "EFFECTIVE_DATE",
              moment(this.model.effectiveDate).format("YYYY-MM-DD")
            )
          : null;
        data.append("REASON", this.model.reason);
        data.append("DISTRIBUTOR_ID", this.DISTDATA.DISTRIBUTOR_ID);

         data.append("PUBLISH_STATUS", "0");
        data.append("TS_ID", "1");
        const user = localStorage.getItem("user");
        data.append("CREATE_BY", JSON.parse(user).user_id);


        //File upload
        if (this.model.file.length != 0) {
          for (let i = 0; i < this.model.file.length; i++) {
            data.append("file[]", this.model.file[i]);
          }
        }

         try {
        const response = await servicesModule1.submitSubmission(data);
        this.$router.push("/fimm/suspension-revocation-list");
      } catch (error) {
        console.log(error);
      }
    },
    register: async function () {
      if (confirm("Are you sure you want to submit this entry?")) {
         const data = new FormData();
        data.append("SUBMISSION_TYPE", this.model.SUBMISSION_TYPE);
        this.model.startDate != null
          ? data.append(
              "DATE_START",
              moment(this.model.startDate).format("YYYY-MM-DD")
            )
          : null;
        this.model.endDate != null
          ? data.append(
              "DATE_END",
              moment(this.model.endDate).format("YYYY-MM-DD")
            )
          : null;
        this.model.effectiveDate != null
          ? data.append(
              "EFFECTIVE_DATE",
              moment(this.model.effectiveDate).format("YYYY-MM-DD")
            )
          : null;
        data.append("REASON", this.model.reason);
        data.append("DISTRIBUTOR_ID", this.DISTDATA.DISTRIBUTOR_ID);

         data.append("PUBLISH_STATUS", "1");
        data.append("TS_ID", "15");
        const user = localStorage.getItem("user");
        data.append("CREATE_BY", JSON.parse(user).user_id);
        data.append("ISSUBMIT", 1);


        //File upload
        if (this.model.file.length != 0) {
          for (let i = 0; i < this.model.file.length; i++) {
            data.append("file[]", this.model.file[i]);
          }
        }
        //(process flowID,approval_level index)
        const approvalEntryLevel = await services06Module0.getApprovalLevel(4, 1);
        data.append("ENTRY_LIST", JSON.stringify(approvalEntryLevel));

        const approvalLevel = await services06Module0.getApprovalLevel(4, 2);
        data.append("APPR_LIST", JSON.stringify(approvalLevel));

        //dashboard notification
        if (this.model.SUBMISSION_TYPE == "1"){
        data.append("NOTI_LOCATION", "suspension-hodApproval-list");
        var NotificationNote = "(SUSPENSION) New Entry pending for Recommendation for " + this.DISTDATA.DIST_NAME;
        data.append("NOTI_REMARK", NotificationNote);
        }else{
        data.append("NOTI_LOCATION", "revocation-hodApproval-list");
        var NotificationNote = "(REVOCATION) New Entry pending for Recommendation for " + this.DISTDATA.DIST_NAME;
        data.append("NOTI_REMARK", NotificationNote);
        }

        try {
        const response = await servicesModule1.submitSubmission(data);
        this.$router.push("/fimm/suspension-revocation-list");
      } catch (error) {
        console.log(error);
      }
      }
    },
  },

  computed: {},

  data() {
    return {
      visibleProfile: false,
      DISTDATA: "",
      visibleStartDate: false,
      visibleEndDate: false,
      visibleEffectiveDate: false,

      SUBMISSION_TYPE: [
        { name: "Suspension", value: "1" },
        { name: "Revocation", value: "2" },
      ],

      model: {
        startDate: null,
        endDate: null,
        effectiveDate: null,
        reason: "",
        file: [],
        SUBMISSION_TYPE: null,
      },

      registerNewSchema: {
        fields: [
          {
            type: "radios",
            label: "Submission Type",
            model: "SUBMISSION_TYPE",
            required: true,
            validator: "required",
            values: () => {
              return this.SUBMISSION_TYPE;
            },
            styleClasses: "col-md-3 display-inline",
          },

          {
            type: "input",
            inputType: "date",
            model: "startDate",
            label: "Start Date",
            styleClasses: "col-md-4",
            validator: ["required", this.validateStartDate],
            visible: (model, field, form) => {
              return this.visibleStartDate;
            },
            required: true,
          },
          {
            type: "input",
            inputType: "date",
            model: "endDate",
            label: "End Date",
            styleClasses: "col-md-4",
            validator: ["required", this.validateEndDate],
            visible: (model, field, form) => {
              return this.visibleEndDate;
            },
            required: true,
          },
          {
            type: "input",
            inputType: "date",
            model: "effectiveDate",
            label: "Effective Date",
            styleClasses: "col-md-4",
            visible: (model, field, form) => {
              return this.visibleEffectiveDate;
            },
            required: true,
          },

          {
            type: "textArea",
            model: "reason",
            label: "Reason",
            hint: "Max 1000 characters",
            max: 1000,
            placeholder: "Enter Reason",
            rows: 5,
            validator: "string",
            styleClasses: "col-md-12",
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
                accept: ".PDF",
                multiple: true,
                text: "Choose a File",
                model: "file",
                type: "vfg-custom-multiple-file",
                styleClasses: "col-md-12",
                required: false,
                hint: "Accepted format : (.PDF)",
              },
            ],
          },
        ],
      },

      formOptions: {
        validateAfterChanged: true,
      },
    };
  },
};
</script>
<style lang="scss">
.va-data-table__vuetable th.sortable {
  color: #34495e !important;
}

.va-table th,
.content table th {
  text-transform: uppercase;
  color: #34495e !important;
  border-bottom: 2px solid #34495e;
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

.content {
  margin-top: 30px;
  font-size: 20px;
}
.inline {
  display: inline-flex;
  float: right;
}
.display-inline label {
  display: inline !important;
  padding: 5px;
}
</style>

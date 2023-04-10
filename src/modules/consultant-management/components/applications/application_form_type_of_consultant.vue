<template>
  <div>
    <br />

    <div>
      <b-table striped hover :items="items"></b-table>
    </div>

    <vue-form-generator
      :model="model"
      :schema="tabSchema4"
      :options="formOptions"
      ref="tabForm4"
      @model-updated="onModelUpdated"
    >
    </vue-form-generator>
    <br />
    <br />

    <div class="ml-3">
      <h6>Choose your preferred distributor :</h6>
    </div>
    <br />
    <!-- <va-card> -->
    <div>
      <vue-form-generator
        :model="model"
        :schema="tabSchema5"
        :options="formOptions"
        ref="tabForm5"
        @model-updated="onModelUpdated"
      >
      </vue-form-generator>
    </div>

    <vue-form-generator
      :model="model"
      :schema="tabSchema6"
      :options="formOptions"
      ref="tabForm6"
      @model-updated="onModelUpdated"
    >
    </vue-form-generator>

    <b-modal
      ref="exemptionPASS"
      :hide-header="true"
      :hide-header-close="true"
      :hide-footer="true"
    >
      <div class="d-block text-center">
        <p>You have a valid Examination Certificate!</p>

        <p>
          You may proceed to registration without sitting the examination again.
        </p>
      </div>

      <div class="float-right">
        <button
          type="button"
          class="ml-2 btn btn-primary btn-fill btn-md"
          @click="hideModal('exemptionPASS')"
        >
          OK
        </button>
      </div>
    </b-modal>
    <b-modal
      ref="exemptionFAIL"
      :hide-header="true"
      :hide-header-close="true"
      :hide-footer="true"
    >
      <div class="d-block text-center">
        <p>Examination required!</p>

        <p>Please proceed to select your preferred examination sessions.</p>
      </div>

      <div class="float-right">
        <button
          type="button"
          class="ml-2 btn btn-primary btn-fill btn-md"
          @click="hideModal('exemptionFAIL')"
        >
          OK
        </button>
      </div>
    </b-modal>
  </div>
</template>
<script>
/*
Component flow

- Create formDataModel
- Create inputsModel
- Show loading
- APIsDependenciesCounter = 0
- Load APIs - inputs data
- Watch for props/parent data loaded - formDataModel
- When data loaded ->
- Map loaded Dependencies data to inputsModel - dropdowns/ checkboxes
- Map loaded ConsultantApplication data to formDataModel
- Update form UI
- Hide loading

Events
- data_loaded
- model_updated

*/

import * as services02module2 from "../../../../app/module2/services02";

export default {
  components: {},
  props: {
    // The parameters the component accepts
    parentDataLoaded: Boolean,
    formDataModel: Object,
  },
  data: function () {
    return {
      user: JSON.parse(localStorage.getItem("user")),
      overlay_show: true,
      formDataDependencyCounter: 0,

      /* -------------------------------------------------------------------------- */
      /*                             VISIBILITY_SECTION2                            */
      /* -------------------------------------------------------------------------- */
      visibleCategoryStaff: false,
      visibleConsultant: false,
      visibleCMSRL_Yes: false,
      visibleCMSRL_No: false,
      visibleUTS: false,
      visiblePRS: false,

      // section 2
      category: [
        { name: "Staff", value: 1 },
        { name: "Consultant", value: 2 },
      ],
      cmsrl: [
        { name: "Yes", value: 1 },
        { name: "No", value: 2 },
      ],

      distributorAPI: [
        // { id: 1, name: 'ENG JIA SECURITIES SDN BHD', LICENSE_TYPE: 'UTS' },
        // { id: '4', name: 'HONG LEONG ASSET FUND MANAGEMENT BHD', LICENSE_TYPE: 'PTS' },
      ],

      uts: [{ name: "UNIT TRUST SCHEME CONSULTANT", value: 1 }],
      prs: [{ name: "PRIVATE RETIREMENT SCHEME CONSULTANT", value: 2 }],

      model: {
        /* -------------------------------------------------------------------------- */
        /*                             MODEL_DATA_SECTION1                            */
        /* -------------------------------------------------------------------------- */

        CONSULTANT_CATEGORY: null,
        CONSULTANT_STATUS: null,
        STAFF_POSITION: null,
        CMSRL: null,
        CMSRL_NO: null,
        CMSRL_EXPIRY_DATE: null,
        CMSRL_CERT_DOCS: null,
        RECRUITER_NRIC_NO: null,
        RECRUITER_CMSRL_NO: null,
        APPRENTICESHIP_DOCS: null,

        DISTRIBUTOR: null,
        LICENSE_TYPE: [],
        UTS: false, // not used in post methods
        PRS: false, // not used in post methods
      },
      inputsModel: {
        /* -------------------------------------------------------------------------- */
        /*                             DROPDOWN_MODEL                                 */
        /* -------------------------------------------------------------------------- */
        DISTRIBUTOR_MODEL: null,
      },
      // section 2
      tabSchema4: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "radios",
                label: "Agent type",
                model: "CONSULTANT_CATEGORY",
                required: true,
                validator: "required",
                values: () => {
                  return this.category;
                },
                styleClasses: "col-md-7 display-inline",
              },
              {
                type: "input",
                inputType: "text",
                label: "Position",
                model: "STAFF_POSITION",
                placeholder: "Enter your position",
                required: true,
                validator: "required",

                styleClasses: "col-md-6 text-uppercase",
                visible: (model, field, form) => {
                  return this.visibleCategoryStaff;
                },
              },
            ],
          },
        ],
      },

      // form 1 - select distributor
      tabSchema5: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "vueMultiSelect",
                model: "DISTRIBUTOR_MODEL",
                label: "List of Distributor",
                placeholder: "Enter distributor",
                // required: true,
                // validator: "required",
                styleClasses: "col-md-12",
                selectOptions: {
                  multiple: false,
                  key: "DISTRIBUTOR_ID",
                  label: "DIST_NAME",
                  searchable: true,
                },
                values: (model, schema) => {
                  console.log("=========================================");
                  console.log(this.distributorAPI);
                  return this.distributorAPI;
                },
              },

              {
                type: "checklist",
                listBox: true,
                label: "Your Registration Type",
                model: "LICENSE_TYPE",
                required: true,
                validator: "required",
                styleClasses: "col-md-12",
                checklistOptions: {
                  value: "exam_type",
                  name: "label",
                },
                values: (model, schema) => {
                  return this.registrationType;
                },

                visible: (model, field, form) => {
                  return this.registrationType.length;
                },
              },
            ],
          },
        ],
      },

      tabSchema6: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "radios",
                label: "CMSRL",
                model: "CMSRL",
                required: true,
                validator: "required",

                values: () => {
                  return this.cmsrl;
                },
                styleClasses: "col-md-12 display-inline",
                visible: (model, field, form) => {
                  return this.visibleCategoryStaff;
                },
              },
              {
                type: "input",
                inputType: "text",
                label: "CMSRL No",
                model: "CMSRL_NO",
                placeholder: "Enter CMRSL Number",
                required: true,
                validator: "required",
                styleClasses: "col-md-6 text-uppercase",
                visible: (model, field, form) => {
                  return this.visibleCMSRL_Yes && this.visibleCategoryStaff;
                },
              },

              {
                type: "input",
                inputType: "date",
                label: "CMSRL Expiry Date",
                model: "CMSRL_EXPIRY_DATE",
                placeholder: "Enter CMSRL expiry date",
                format: "YYYY-MM-DD HH:mm:ss",
                required: true,
                validator: "required",

                styleClasses: "col-md-6 text-uppercase",
                visible: (model, field, form) => {
                  return this.visibleCMSRL_Yes && this.visibleCategoryStaff;
                },
              },
              {
                labels: "Upload CMSRL Certificate",
                text: "Choose a File",
                model: "CMSRL_CERT_DOCS",
                type: "vfg-custom-file",
                styleClasses: "col-md-12",
                required: true,
                validator: "required",
                visible: (model, field, form) => {
                  return this.visibleCMSRL_Yes && this.visibleCategoryStaff;
                },
              },

              {
                labels: "Recruiter NRIC Number",
                model: "RECRUITER_NRIC_NO",
                type: "vfg-the-mask",
                placeholder: "Enter Recruiter NRIC",
                mask: "######-##-####",
                styleClasses: "col-md-6 ",
                required: true,
                validator: "required",
                visible: (model, field, form) => {
                  return (
                    (this.visibleCMSRL_Yes || this.visibleCMSRL_No) &&
                    this.visibleCategoryStaff
                  );
                },
                required: true,
              },
              {
                type: "input",
                inputType: "text",
                label: "Recruiter CMSRL Number",
                model: "RECRUITER_CMSRL_NO",
                placeholder: "Enter Recruiter CMRSL Number",
                required: true,
                validator: "required",
                styleClasses: "col-md-6",

                visible: (model, field, form) => {
                  return (
                    (this.visibleCMSRL_Yes || this.visibleCMSRL_No) &&
                    this.visibleCategoryStaff
                  );
                },
              },

              {
                labels: "Apprenticenship Program",
                text: "Choose a File",
                model: "APPRENTICESHIP_DOCS",
                type: "vfg-custom-file",
                styleClasses: "col-md-12",
                required: true,
                validator: "required",
                visible: (model, field, form) => {
                  return this.visibleCMSRL_No && this.visibleCategoryStaff;
                },
                hint: "Upload Certificate from any Module 1 CFP/IFP/RFP/shariah RFP or Exemption Letter from FPAM",
              },
            ],
          },
        ],
      },

      formOptions: {
        validateAfterLoad: false,
        validateAfterChanged: true,
        validateAsync: true,
      },
    };
  },
  methods: {
    mapDropDownToModel: function () {
      this.model.DISTRIBUTOR_MODEL = this.model.DISTRIBUTOR;
    },

    mapParentDataToFormDataModel: function (payload) {
      console.log(payload);
      console.log(this.model);
      var properties = Object.keys(this.model);
      var vm = this.model;
      properties.forEach(function (key) {
        vm[key] = payload[key];
      });
    },

    onModelUpdated(newVal, schema) {
      console.log(`schema: ${schema}`, "value:", newVal);
      if (schema == "CONSULTANT_CATEGORY") {
        if (newVal == 1) {
          // this.visibleConsultant = false;
          this.visibleCategoryStaff = true;
          // this.visibleCMSRL_Yes = true;
        } else {
          // this.visibleConsultant = true;
          this.visibleCategoryStaff = false;
          // this.visibleCMSRL_Yes = false;
        }
      } else if (schema == "CMSRL") {
        if (newVal == 1) {
          this.visibleCMSRL_Yes = true;
          this.visibleCMSRL_No = false;
        } else {
          this.visibleCMSRL_Yes = false;
          this.visibleCMSRL_No = true;
        }
      } else if (schema == "DISTRIBUTOR") {
        const DIST_VARIATION_TYPE = ["UTMC", "PRP", "IPRA", "IUTA"];
        const DIST_TYPE =
          newVal.distributor_type.distributor_type.DIST_TYPE_VARIATION;
        // console.log(DIST_TYPE);
        this.visibleUTS = false;
        this.visiblePRS = false;

        const matched = DIST_VARIATION_TYPE.some((el) => DIST_TYPE.match(el));

        matched ? (this.visibleUTS = true) : (this.visiblePRS = true);
        // if (!matched) {
        //   this.visiblePRS = true;
        // } else {
        //   this.visibleUTS = true;
        // }
      } else if (schema == "LICENSE_TYPE") {
        console.log("this is LICENSE_TYPE: ", newVal);

        this.model.UTS = false;
        this.model.PRS = false;

        if (newVal.length === 2) {
          console.log("inside if");
          this.model.UTS = true;
          this.model.PRS = true;
        } else {
          console.log("inside else");
          if (newVal[0].match("CUTE")) this.model.UTS = true;
          if (newVal[0].match("CPRE")) this.model.PRS = true;

          console.log(this.model.UTS, this.model.PRS);
        }

        //  console.log('COURSE_TYPE: ', this.model.COURSE_TYPE);

        //   this.model.COURSE_TYPE = this.examType.filter(el =>
        //   el.COURSE_TYPE_NAME.match('CPRE'),
        // ).CONSULTANT_COURSE_TYPE_ID;
      } else if (schema == "UTS") {
        console.log(newVal);
      } else if (schema == "PRS") {
        console.log(newVal);
      } else if (schema == "EXEMPTION_CATEGORY") {
        console.log(schema, newVal);
        // this.visibleExemptionQualified = true;
      }
    },

    /* -------------------------------------------------------------------------- */
    /*                              callapimethods                                */
    /* -------------------------------------------------------------------------- */

    async getDistributorRecords() {
      try {
        const distributor_records =
          await services02module2.getDistributorRecords();
        this.distributorAPI = distributor_records;
        this.formDataDependencyCounter = this.formDataDependencyCounter + 1;
      } catch (error) {
        console.log(error);
      }
    },

    getFormData() {
      console.log(this.model);
      return this.model;
    },
  },

  computed: {
    registrationType() {
      if (this.visibleUTS && this.visiblePRS) {
        return [
          {
            exam_type: "CUTE",
            label: "UNIT TRUST SCHEME CONSULTANT",
            value: 1,
          },
          {
            exam_type: "CPRE",
            label: "PRIVATE RETIREMENT SCHEME CONSULTANT",
            value: 2,
          },
        ];
      } else if (this.visibleUTS) {
        return [
          {
            exam_type: "CUTE",
            label: "UNIT TRUST SCHEME CONSULTANT",
            value: "1",
          },
        ];
      } else if (this.visiblePRS) {
        return [
          {
            exam_type: "CPRE",
            label: "PRIVATE RETIREMENT SCHEME CONSULTANT",
            value: "2",
          },
        ];
      } else {
        return [];
      }
    },
  },
  watch: {
    parentDataLoaded: function (val) {
      this.formDataDependencyCounter = this.formDataDependencyCounter + 1;
      this.mapParentDataToFormDataModel(this.formDataModel);
    },
    formDataDependencyCounter: function (val) {
      // after all these APIs loaded, remove loader
      var total_dependent_apis = ["getDistributorRecords", "parentDataLoaded"];
      if (val >= total_dependent_apis.length) {
        this.overlay_show = false;
        this.mapDropDownToModel();
      }
    },
  },
  created() {
    console.log(this.user);
    /* ---------------------------------- TAB1 ---------------------------------- */
    this.getDistributorRecords();
  },
};
</script>

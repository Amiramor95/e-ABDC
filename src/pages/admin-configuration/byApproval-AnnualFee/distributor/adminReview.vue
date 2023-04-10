<template>
  <div id="layoutAuthentication_content">
    <main>
      <div class="container">
        <div class="card-body">
          <div class="row justify-content-center">
            <div class="col-lg-12">
              <va-card>
                <h4 slot="header" class="card-title">Administrator of Distributor Review</h4>
                <div class="ml-3">
                  <form>
                    <vue-form-generator
                      tag="div"
                      :schema="schema"
                      :model="model"
                      :options="formOptions"
                      ref="Form"
                    >
                    </vue-form-generator>
                    <br />

                    <br /><br />
                    <button
                      type="submit"
                      class="ml-2 btn btn-primary btn-fill float-left btn-md"
                    >
                      <i class="fa fa-step-backward" /> &nbsp; Previous
                    </button>

                    <div class="float-right">
                      <button
                        type="button"
                        @click="submit"
                        class="ml-2 btn btn-primary btn-fill btn-md"
                      >
                        <i class="fa fa-save" /> &nbsp; Save
                      </button>
                    </div>
                  </form>
                </div>
              </va-card>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
import Vue from "vue";
import "vue-form-generator/dist/vfg.css";
import * as servicesModule0 from "../../../../app/module0/services02";
export default {
  mounted() {
     this.getAllDistApproval();
    this.getAllGroupList();
  },
  // METHOD
  methods: {
    getAllGroupList: async function () {
      const response = await servicesModule0.getAllGroupList();
      this.GroupList = response;
      console.log(this.GroupList);
    },

    getAllDistApproval: async function() {
      const response = await servicesModule0.getAllDistApprovalList(27, "ADMINISTRATOR OF DISTRIBUTOR REVIEW");
    // this.approvalList = response;
  this.APPROVAL_LEVEL_ID = response.DIST_APPROVAL_LEVEL_ID;
      this.model.INDEX = response.DIST_APPR_INDEX;
      this.model.AUTO_APPROVAL_DAYS = response.DIST_APPR_AUTO_APPROVAL_DAYS;
      this.model.AUTO_REJECT_DAYS = response.DIST_APPR_AUTO_REJECT_DAYS;
    //   this.model.GROUP_NAME = response.APPR_GROUP_ID;
      this.model.GROUP_NAME = {
        APPR_GROUP_ID: response.APPR_GROUP_ID,
        COMBINE: response.COMBINE,
      };
    },


    async submit() {
      if (this.$refs.Form.validate()) {
       const data = new FormData();
    // data.append("DIST_APPROVAL_LEVEL_ID", this.APPROVAL_LEVEL_ID);
        data.append("DIST_APPR_GROUP_ID", this.model.GROUP_NAME.MANAGE_GROUP_ID);
        data.append("DIST_APPR_INDEX", this.model.INDEX);
        data.append(
          "DIST_APPR_AUTO_APPROVAL_DAYS",
          this.model.AUTO_APPROVAL_DAYS
        );
        data.append("DIST_APPR_AUTO_REJECT_DAYS", this.model.AUTO_REJECT_DAYS);
        data.append("DIST_APPR_LEVEL_NAME", "ADMINISTRATOR OF DISTRIBUTOR REVIEW");
        data.append("DIST_APPR_PROCESSFLOW_ID", 27);
        try {
          // eslint-disable-next-line no-unused-vars
          const response = await servicesModule0.updatedistApprovalList(data);
         this.getAllDistApproval();
        } catch (error) {
          console.log(error);
        }
      }
    },
  },

  // DATA SCHEMA
  data() {
    return {
      approvalList: [],
      GroupList: [],
      category: [
        { id: 1, name: "UTMC", selected: false },
        { id: 2, name: "IUTA", selected: false },
        { id: 3, name: "CUTA", selected: false },
        { id: 5, name: "CPRA", selected: false },
        { id: 6, name: "PRP", selected: false },
        // { id: 7, name: "THIRD PARTY", selected: false },
        // { id: 8, name: "TRAINING PROVIDER", selected: false },
      ],
      // DATA MODEL

      model: {
        APPROVAL_LEVEL_ID: "",
        INDEX: "",
        AUTO_APPROVAL_DAYS: "",
        AUTO_REJECT_DAYS: "",
        DISTRIBUTOR_CATEGORY: "",
        GROUP_NAME: "",
      },

      // FORM
      schema: {
    groups: [
        {
        fields: [
          {
            type: "input",
            inputType: "text",
            label: "Index",
            model: "INDEX",
            placeholder: "ENTER INDEX",
          },
          {
            type: "vueMultiSelect",
            inputType: "text",
            label: "Group Name",
            model: "GROUP_NAME",
            selectOptions: {
              multiple: false,
              key: "MANAGE_GROUP_ID",
              label: "COMBINE",
              searchable: true,
            },
            values: (model, schema) => {
              return this.GroupList;
            },
          },
          // {
          //   type: "input",
          //   inputType: "text",
          //   label: "Approval Days",
          //   model: "AUTO_APPROVAL_DAYS",
          //   placeholder: "ENTER APPROVAL DAYS",
          // },
          // {
          //   type: "input",
          //   inputType: "text",
          //   label: "Reject Days",
          //   model: "AUTO_REJECT_DAYS",
          //   placeholder: "ENTER REJECT DAYS",
          // },
        ],
        }
        ]
      },

      // FORM OPTION
      formOptions: {
        validateAfterLoad: false,
        validateAfterChanged: true,
        validateAsync: true,
      },
    };
  },
};
</script>

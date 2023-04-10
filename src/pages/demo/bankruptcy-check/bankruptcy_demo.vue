<template>
  <va-card>
    <div>
      <table>
        <tr>
          <td>Bankruptcy Check Output</td>
        </tr>
        <tr>
          <!-- <td>{{ dataResult }}</td> -->
        </tr>
      </table>
      <br />
      <vue-form-generator
        :model="model"
        :schema="schema"
        :options="formOptions"
        ref="regForm"
        @model-updated="onModelUpdated"
      >
      </vue-form-generator>
      <br />
      <button
        @click="submit"
        type="button"
        class="ml-2 btn btn-primary btn-fill btn-md"
      >
        Bankruptcy Check
      </button>
    </div>
    <br />
    <div class="panel panel-default">
      <div class="panel-heading">JSON Output</div>
      <div class="panel-body">
        <pre>{{ JSON.stringify(dataResult, null, 2) }}</pre>
      </div>
    </div>
  </va-card>
</template>
<script>
import Multiselect from "vue-multiselect";
import Vudal from "vudal";
import VueFormGenerator from "vue-form-generator";
import "vue-form-generator/dist/vfg-core.css";
import VueFormWizard from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
import Vue from "vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

// Import Bootstrap an BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import HorizontalScroll from "vue-horizontal-scroll";
import "vue-horizontal-scroll/dist/vue-horizontal-scroll.css";
import * as services0Module0 from "../../../app/module0/services";
import moment from "moment";
import { parse } from "vue-currency-input";

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
Vue.use(VueFormGenerator);
Vue.use(VueFormWizard);
Vue.component(Vudal);
// register globally
Vue.component("multiselect", Multiselect);
export default {
  data() {
    return {
      dataResult: "",
      model: {
        type: [
          {
            id: "C",
            value: "C",
          },
          {
            id: "B",
            value: "B",
          },
          {
            id: "I",
            value: "I",
          },
        ],
        EntityType: "I",
        EntityName: "ALI BIN ABU",
        EntityId: "999999-99-9999",
        EntityId2: "",
        MobileNo: "60123456789",
        EmailAddress: "ali.abu@email.com",
        LastKnownAddress:
          "199, Jalan Haji Harun,Kampung Baru Kepong,Kuala Lumpur",
        Ref1: "",
        Ref2: "FIMM10000001",
      },
      formOptions: {
        validateAfterChanged: true,
      },
      schema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "select",
                label:
                  "Entity Type (Always “I” for individual bankruptcy report)",
                model: "EntityType",
                values: ["C", "B", "I"],
              },
              {
                type: "input",
                inputType: "text",
                label: "Full Name (as per NRIC)",
                model: "EntityName",
                placeholder: "Please enter full name",
                required: true,
                validator: "string",
                styleClasses: "col-md-12",
              },
              {
                labels: "NRIC No",
                model: "EntityId",
                type: "vfg-the-mask",
                placeholder: "Enter NRIC No",
                mask: "######-##-####",
                styleClasses: "col-md-8",
                required: true,
                validator: "string",
              },
              {
                type: "input",
                inputType: "text",
                label: "Old IC No. / Police ID",
                model: "EntityId2",
                placeholder: "Enter Old IC No. / Police ID",
                required: true,
                validator: "string",
                styleClasses: "col-md-4",
              },
              {
                type: "input",
                inputType: "text",
                label: "Address",
                model: "LastKnownAddress",
                placeholder: "Enter address",
                required: true,
                styleClasses: "col-md-12",
              },
              {
                type: "input",
                inputType: "email",
                label: "Email Address",
                model: "EmailAddress",
                placeholder: "Enter email address",
                required: true,
                validator: "string",
                styleClasses: "col-md-12",
              },
              {
                type: "input",
                inputType: "text",
                label: "Ref 2",
                model: "Ref2",
                placeholder: "",
                required: true,
                styleClasses: "col-md-12",
              },
            ],
          },
        ],
      },
    };
  },
  methods: {
    async submit() {
      const data = new FormData();
      console.log(this.model.EntityType);
      try {
        const response = await services0Module0.bankruptcyCheck(
          this.model.EntityType, //required
          this.model.EntityName, //required
          this.model.EntityId, //required
          this.model.MobileNo, //either one
          this.model.EmailAddress, //either one
          this.model.LastKnownAddress, //either one
          this.model.Ref2 // Billing reference ( this should be a running number)
        );
        console.log(response);
        this.dataResult = response;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<!-- New step!
     Add Multiselect CSS. Can be added as a static asset or inside a component. -->
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss">
.display-inline label {
  display: inline !important;
  padding: 5px;
}
.app-layout__main {
  background: #e8e8e8;
}
.container {
  max-width: 620px;
  min-width: 420px;
  margin: 40px auto;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.9em;
  color: #888;
}

/* Style the tabs */
.tabs {
  overflow: hidden;
  margin-left: 20px;
  margin-bottom: -2px; // hide bottom border
}

.tabs ul {
  list-style-type: none;
  margin-left: 20px;
}

.tabs a {
  float: left;
  cursor: pointer;
  padding: 12px 24px;
  transition: background-color 0.2s;
  border: 1px solid #ccc;
  border-right: none;
  background-color: #f1f1f1;
  border-radius: 10px 10px 0 0;
  font-weight: bold;
}
.tabs a:last-child {
  border-right: 1px solid #ccc;
}

/* Change background color of tabs on hover */
.tabs a:hover {
  background-color: #aaa;
  color: #fff;
}

/* Styling for active tab */
.tabs a.active {
  background-color: #fff;
  color: #484848;
  border-bottom: 2px solid #fff;
  cursor: default;
}

/* Style the tab content */
.tabcontent {
  padding: 30px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 3px 3px 6px #e1e1e1;
}
</style>
<style scoped>
.widthModal {
  width: 80%;
}
.width {
  width: 100%;
}
.widthName {
  width: 5%;
}
pre {
  overflow: auto;
}
pre .string {
  color: #885800;
}
pre .number {
  color: blue;
}
pre .boolean {
  color: magenta;
}
pre .null {
  color: red;
}
pre .key {
  color: green;
}

h1 {
  text-align: center;
  font-size: 36px;
  margin-top: 20px;
  margin-bottom: 10px;
  font-weight: 500;
}

fieldset {
  border: 0;
}

.panel {
  margin-bottom: 20px;
  background-color: #fff;
  border: 1px solid transparent;
  border-radius: 4px;
  -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  border-color: #ddd;
}

.panel-heading {
  color: #333;
  background-color: #f5f5f5;
  border-color: #ddd;

  padding: 10px 15px;
  border-bottom: 1px solid transparent;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
}

.panel-body {
  padding: 15px;
}
</style>

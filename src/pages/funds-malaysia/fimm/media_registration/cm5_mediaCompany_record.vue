<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">Media Management : List of Company</h4>
    </div>
    <br>
    <va-card>
      <div class="ml-2 col-md-12">
        Register New Record
        <button
          v-if="visibleForm == true"
          v-b-toggle.collapse-2
          type="button"
          class="float-right btn-fill btn-md"
        >
          <i class="fa fa-eye-slash"></i>
        </button>
        <button
          v-if="visibleForm == false"
          v-b-toggle.collapse-2
          type="button"
          class="float-right btn-fill btn-md"
        >
          <i class="fa fa-eye"></i>
        </button>

        <hr />
        <br>
        <b-collapse id="collapse-2" class="mt-2" v-model="visibleForm">
          <vue-form-generator
            :model="model"
            :schema="registerNewSchema"
            :options="formOptions"
            ref="registerNewForm"
          >
          </vue-form-generator>
          <br>

        <div class="float-right">
            <button
            v-if="this.model.companyId == '' "
              @click="save"
              type="button"
              style="background: #87cb16; color: #ffffff"
              class="ml-1 btn btn-fill btn-md"
            >
              <i class="fa fa-save" /> &nbsp;Save
            </button>
            <button
            v-if="this.model.companyId != '' "
              @click="update"
              type="button"
              style="background: #87cb16; color: #ffffff"
              class="ml-1 btn btn-fill btn-md"
            >
              <i class="fa fa-save" /> &nbsp;Update
            </button>
        </div>

        </b-collapse>
      </div>
    </va-card>
    <br>
    <!-- list table-->
    <va-card class="mt-5 col-12">
      <div class="row">
        <div class="flex md2 offset--md10">
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
        :fields="caRecordFields"
        :data="caRecordFilteredData"
        no-data-label="No data found"
        :per-page="parseInt(perPage)"
        :datacount="caRecordCount"
        :dataperpage="parseInt(perPage)"
        clickable
      >
        <template slot="no" slot-scope="row">
          {{ row.rowIndex + 1 }}
        </template>

        <template slot="actions" slot-scope="props">
          <h5 class="mt-1">
            <span
              v-b-tooltip.hover
              title="Edit"
              v-on:click="editRecord(props.rowData)"
              class="badge badge-primary mr-2"
            >
              <i class="fa fa-edit"></i
            ></span>
            <span
              v-b-tooltip.hover
              title="Delete"
              v-on:click="deleteRecord(props.rowData)"
              class="badge badge-danger mr-2"
            >
              <i class="fa fa-trash"></i
            ></span>
          </h5>
        </template>
      </va-data-table>

      <br />
      <br />
      <br />
      <button
        @click="back"
        type="button"
        class="btn btn-primary btn-fill btn-md"
      >
        <i class="fa fa-step-backward" /> &nbsp; Previous
      </button>
    </va-card>
  </va-card>
</template>

<script>
import "vue-form-generator/dist/vfg.css";
import { debounce } from "lodash";
import * as services01Module5 from "../../../../app/module5/services01";

export default {
  mounted() {
    this.getAllRecord();
  },
  components: {},

  methods: {
    // search
    search: debounce(function (term) {
      this.term = term;
      console.log(this.term);
    }, 400),

    handleClick(newTab) {
      this.currentTab = newTab;
    }, // end tab
    back() {
      this.$router.go(-1);
    }, // back button

    // getAllRecord
    getAllRecord: async function () {
      const response = await services01Module5.getAllCompany();
      this.caRecordList = response;
      this.caRecordCount = this.caRecordList.length;
    },
    async editRecord(data) {

    },
    async deleteRecord(data) {
      if (confirm("Are you sure you want to delete this record?")) {

      const response = await services01Module5.deleteRecord(data.COMPANY_ID);
        this.getAllRecord();
      }
    },
    async editRecord(data) {

      this.model.companyName = data.COMPANY_NAME;
      this.model.designation = data.DESIGNATION;
      this.model.contactNo = data.CONTACT_NUMBER;
      this.model.email = data.EMAIL;
      this.model.companyId = data.COMPANY_ID;

    },
    save: async function () {
      if (confirm("Are you sure you want to save this record?")) {
        if (this.$refs.registerNewForm.validate()) {
        const data = new FormData();

        data.append("COMPANY_NAME", this.model.companyName);
        data.append("DESIGNATION", this.model.designation);
        data.append("CONTACT_NUMBER", this.model.contactNo);
        data.append("EMAIL",this.model.email);
        const user = localStorage.getItem("user");
        data.append("CREATE_BY", JSON.parse(user).user_id);


        try {
          const response = await services01Module5.createNewCompany(data);
          this.getAllRecord();

          this.model.companyName ="";
          this.model.designation ="";
          this.model.email="";
          this.model.contactNo="";

        } catch (error) {
          console.log(error);
        }

        }
      }

    },
    update: async function () {
      if (confirm("Are you sure you want to update this record?")) {
        if (this.$refs.registerNewForm.validate()) {
        const data = new FormData();

        data.append("COMPANY_ID", this.model.companyId);
        data.append("COMPANY_NAME", this.model.companyName);
        data.append("DESIGNATION", this.model.designation);
        data.append("CONTACT_NUMBER", this.model.contactNo);
        data.append("EMAIL",this.model.email);
        const user = localStorage.getItem("user");
        data.append("CREATE_BY", JSON.parse(user).user_id);

        try {
        const response = await services01Module5.updateCompany(data);
        this.getAllRecord();

          this.model.companyId ="";
          this.model.companyName ="";
          this.model.designation ="";
          this.model.email="";
          this.model.contactNo="";

        } catch (error) {
          console.log(error);
        }

        }
      }

    },

  },

  computed: {
    caRecordFields() {
      return [
        {
          name: "__slot:no",
          title: "NO",
        },
        {
          name: "COMPANY_NAME",
          title: "COMPANY NAME",
          sortField: "COMPANY_NAME",
        },
        {
          name: "DESIGNATION",
          title: "DESIGNATION",
          sortField: "DESIGNATION",
        },
        {
          name: "CONTACT_NUMBER",
          title: "CONTACT NUMBER",
          sortField: "CONTACT_NUMBER",
        },
        {
          name: "EMAIL",
          title: "EMAIL",
          sortField: "EMAIL",
        },
        {
          name: "CREATE_TIMESTAMP",
          title: "LATEST UPDATE",
          sortField: "CREATE_TIMESTAMP",
        },
        {
          name: "USER_NAME",
          title: "LATEST UPDATE BY",
          sortField: "USER_NAME",
        },

        {
          name: "__slot:actions",
          title: "ACTIONS",
          dataClass: "justify-content-center",
          width: "8%",
        },
      ];
    },

    // eslint-disable-next-line vue/return-in-computed-property
    caRecordFilteredData() {
      if (!this.term || this.term.length < 1) {
        return this.caRecordList;
      }

      return this.caRecordList.filter((item) => {
        return this.term
          .toLowerCase()
          .split(" ")
          .every(
            (v) =>
              item.COMPANY_NAME.toLowerCase().includes(v) ||
              item.DESIGNATION.toLowerCase().includes(v) ||
              item.CONTACT_NUMBER.toLowerCase().includes(v) ||
              item.EMAIL.toLowerCase().includes(v)||
              item.USER_NAME.toLowerCase().includes(v)
          );
      });
    },
  },

  data() {
    return {
      header: "",
      field: [],
      term: null,
      perPage: "10",
      currentPage: 1,
      caRecordList: [],
      count: 1,
      caRecordCount: null,
      visibleForm: true,

      model: {
          companyName: "",
          designation: "",
          contactNo: "",
          email: "",
          companyId:"",
      },

      registerNewSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "input",
                inputType: "text",
                model: "companyName",
                label: "Company Name",
                styleClasses: "col-md-6",
                placeholder:"Enter company name",
                required: true,
              },
              {
                type: "input",
                inputType: "text",
                model: "designation",
                label: "Designation",
                styleClasses: "col-md-6",
                placeholder:"Enter designation",
              },
              {
                type: "input",
                inputType: "text",
                model: "contactNo",
                label: "Contact Number",
                styleClasses: "col-md-6",
                placeholder:"Enter contact number",
              },
              {
                type: "input",
                inputType: "email",
                model: "email",
                label: "Email",
                styleClasses: "col-md-6",
                placeholder:"Enter email",
              },
              {
                type: "input",
                inputType: "hidden",
                model: "companyId",
                styleClasses: "col-md-6",
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
</style>

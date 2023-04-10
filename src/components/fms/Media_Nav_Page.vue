<template>
  <div>
    <div>
      <navbar></navbar>
    </div>
    <br /><br /><br />

    <div>
      <b-container fluid>
        <b-row class="justify-content-md-center">
          <b-col cols="10" align-v="baseline">
            <va-card>
              <div class="row">
                <h4 slot="header" class="card-title">Daily NAV List</h4>
                <br />
                <div class="col float-right">
                  <div class="float-right">
                    <h5></h5>
                    <span>
                      <h5>
                        <b-badge
                          v-b-tooltip.hover
                          title="Export as PDF"
                          class="mr-1"
                          variant="danger"
                          @click="generatePDF"
                        >
                          <i class="fa fa-file-pdf-o"></i>
                        </b-badge>
                        <!-- reference for excel download -->
                        <!-- <vue-json-to-csv :json-data="[
                                 { name: 'Joe', surname: 'Roe' },
                                 { name: 'John', surname: 'Doe' }
                               ]"
                :labels="{ name: { title: 'First name' } }"
                :csv-title="My_CSV"
              >
                <button>
                  <b>My custom Example</b>
                </button>
              </vue-json-to-csv> -->
                        <vue-json-to-csv
                          :json-data="fundProfileFilteredData"
                          :csv-title="'NAV_daily_publish'"
                          @success="(val) => handleSuccess(val)"
                          @error="(val) => handleError(val)"
                          :labels="{
                            DIST_NAME: { title: 'Management Company' },
                            FUND_CODE_FIMM: { title: 'FIMM Fund Code' },
                            FUND_NAME: { title: 'Fund Name' },
                            FUND_PRICE_PERUNIT: { title: 'Unit NAV' },
                            FUND_NOTES_DENOTATION: {
                              title: 'Fund Notes Denotation',
                            },
                            CURRENCY: { title: 'Global/Specific Fund Notes' },
                            FUNDNOTES_DESC: {
                              title: 'Specific Fund Notes Value',
                            },
                            FUND_NAME_CHINESE: { title: 'Fund Chinese Name' },
                          }"
                        >
                          <b-badge
                            v-b-tooltip.hover
                            title="Export as Excel"
                            class="mr-1"
                            variant="success"
                          >
                            <i class="fa fa-file-excel-o"></i>
                          </b-badge>
                        </vue-json-to-csv>
                        <b-badge
                          v-b-tooltip.hover
                          title="Advanced Search"
                          v-b-toggle.collapse-1
                          class="mr-1"
                          variant="secondary"
                          ><i class="fa fa-search"></i
                        ></b-badge>
                      </h5>
                    </span>
                  </div>
                </div>
              </div>
              <!-- advanced search form -->
              <b-collapse id="collapse-1" class="mt-2">
                <b-card>
                  <vue-form-generator
                    :model="model"
                    :schema="advancedSearchSchema"
                    ref="advancedSearchForm"
                  >
                  </vue-form-generator>
                  <br />
                  <button
                    @click="filterFundProfile"
                    type="button"
                    class="ml-2 btn btn-sm btn-primary"
                  >
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
              <div class="float-right">
                <va-input
                  :value="term"
                  :placeholder="$t('Search')"
                  @input="search"
                  removable
                >
                  <va-icon name="fa fa-search" slot="prepend" />
                </va-input>
              </div>

              <!-- list table-->
              <va-card class="mt-5 col-12">
                <va-data-table
                  :fields="fundProfile"
                  :data="fundProfileFilteredData"
                  no-data-label="No data found"
                  :per-page="parseInt(perPage)"
                  :datacount="fundprofileRecordCount"
                  :dataperpage="parseInt(perPage)"
                  clickable
                  name="dataTable"
                >
                  <template slot="no" slot-scope="row">
                    {{ row.rowIndex + 1 }}
                  </template>
                  <template slot="actions" slot-scope="props">
                    <h5 class="mt-1">
                      <span
                        v-b-tooltip.hover
                        title="View"
                        v-on:click="viewRecord(props.rowData)"
                        class="badge badge-primary mr-2"
                      >
                        <i class="fa fa-eye"></i
                      ></span>
                    </h5>
                  </template>
                </va-data-table>

                <br />
                <br />
                <br />
              </va-card>
            </va-card>
          </b-col>
        </b-row>
      </b-container>
      <!-- <footer_fundsmalaysia></footer_fundsmalaysia> -->
    </div>
  </div>
</template>

<script>
import axios from "axios";
import * as servicesModule0 from "@/app/module0/services";
import "vue-form-generator/dist/vfg.css";
import { debounce } from "lodash";
import * as servicesModule1 from "../../app/module1/services";
import * as servicesModule5 from "../../app/module5/services";

import * as services03Module5 from "../../app/module5/services03";

import navbar from "./default/navbarsignin";
import footer_fundsmalaysia from "./default/footer";

export default {
  components: {
    navbar,
    footer_fundsmalaysia,
  },
  name: "login",
  mounted() {
    this.getNAVlist();
    this.getDistributorMedia();
  },
  data() {
    return {
      showPass: false,
      email: "", // hidayatul@vn.my temporary for testing
      password: "", //@Bcd1234
      keepLoggedIn: false,
      emailErrors: [],
      passwordErrors: [],
      remember: false,

      header: "",
      field: [],
      term: null,
      perPage: "10",
      perPageOptions: ["50", "100", "150", "200"],
      currentPage: 1,
      navListRecordList: [],
      navListRecordCount: null,
      count: 1,

      distributor: [],
      fund: [],

      fields: [
        {
          key: "date",
          label: "DATE",
          sortable: false,
          class: "text-center",
        },
        {
          key: "NAV",
          label: "NAV",
          sortable: false,
          class: "text-center",
        },
      ],

      items: [],

      model: {
        modelFilter: {
          FUND_NAME: "",
          DISTRIBUTOR_NAME: "",
        },
      },

      Schema: {
        groups: [
          {
            fields: [
              {
                type: "vueMultiSelect",
                inputType: "text",
                model: "modelFilter.DISTRIBUTOR_NAME",
                label: "Distributor Name",
                placeholder: "Select Distributor",
                selectOptions: {
                  multiple: false,
                  trackBy: "DISTRIBUTOR_ID",
                  key: "DISTRIBUTOR_ID",
                  label: "DIST_NAME",
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.distributor;
                },
              },
              {
                type: "vueMultiSelect",
                inputType: "text",
                model: "modelFilter.FUND_NAME",
                label: "Fund Name",
                placeholder: "Select Fund",
                selectOptions: {
                  multiple: false,
                  key: "FUND_ID",
                  label: "FUND_NAME",
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.fund;
                },
              },
            ],
          },
        ],
      },
    };
  },
  watch: {
    ["modelFilter.DISTRIBUTOR_NAME"](value) {
      console.log(value);
      const data = this.modelFilter.DISTRIBUTOR_NAME;
      console.log(data);
      getFundProfileFilter(data);
    },
  },
  methods: {
    search: debounce(function (term) {
      this.term = term;
      console.log(this.term);
    }, 400),
    onSearch: async function () {},
    onsubmit: async function () {
      console.log(this.email);
      console.log(this.password);

      this.emailErrors = this.email ? [] : ["Email is required"];
      this.passwordErrors = this.password ? [] : ["Password is required"];
      if (!this.formReady) {
        return;
      }

      try {
        const data = {
          LOGIN_ID: this.email,
          USER_PASS_NUM: this.password,
        };
        console.log("start verify");
        const response = await servicesModule5.verifyUser(data);
        console.log(response.TP_USER_ISLOGIN);
        if (response.TP_USER_ISLOGIN == 0) {
          localStorage.setItem("recover-password", response.TP_USER_ID);
          this.$router.push({
            name: "recover-password",
            params: { TP_USER_ID: response.TP_USER_ID },
          });
        } else {
          // alert(JSON.stringify(response.data));
          if (response.TP_USESR_) console.log(JSON.stringify(response.data));
          servicesModule5.setUser(JSON.stringify(response.data));
          this.$store.commit("change", JSON.stringify(response.data));
          console.log("user store :" + localStorage.getItem("user"));
          this.$router.push({ name: "fms_website" });
          console.log("first");
        }
      } catch (error) {
        console.log(error);
      }
    },
    async filterNAV() {
      try {
        const response = await servicesModule5.getNAVlistMedia(
          this.model.modelFilter
        );
        if (response !== "error") {
          this.navListRecordList = response;
        }
      } catch (error) {}
    },
    getNAVlist: async function () {
      const response = await servicesModule5.getNAVlistMedia();
      this.navListRecordList = response;
      this.navListRecordCount = this.navListRecordList.length;
    },
    getDistributorMedia: async function () {
      const response = await servicesModule1.getDistributorMedia();
      this.distributor = response;
    },
    async getFundProfileFilterData(data) {
      console.log(data);
      const response = await services03Module5.getFundProfileFilter(data);
      this.fund = Response;
    },
    onModelUpdated(newVal, schema) {
      alert("this is changed");
      if (schema === "modelFilter.DISTRIBUTOR_NAME") {
        this.getFundProfileFilterData(DISTRIBUTOR_NAME.DISTRIBUTOR_ID);
      }
    },
  },
  // onChange: {
  //   if (this.distributor.state == 'change') {
  //     getFundProfileFilter (this.distributor);
  //   }
  // },
  computed: {
    formReady() {
      return !this.emailErrors.length && !this.passwordErrors.length;
    },
    navList() {
      return [
        {
          name: "__slot:no",
          title: "NO",
        },
        {
          name: "NAV_CREATE_TIMESTAMP",
          title: "LAUNCH DATE",
          sortField: "NAV_CREATE_TIMESTAMP",
        },
        {
          name: "FUND_NAME",
          title: "FUND NAME",
          sortField: "FUND_NAME",
        },
        {
          name: "DIST_NAME",
          title: "MANAGEMENT COMPANY",
          sortField: "DIST_NAME",
        },
        {
          name: "currency",
          title: "CURRENCY",
          sortField: "currency",
        },
      ];
    },
    onNewTag(newTag, id, options, value) {
      console.log("onNewTag", newTag, id, options, value);
    },
    onChanged: function (model, newVal, oldVal, field) {
      console.log(JSON.stringify(newVal, null, 2));
    },
    navListFilteredData() {
      if (!this.term || this.term.length < 1) {
        return this.navListRecordList;
      }
      return this.navListRecordList.filter((item) => {
        return this.term

          .split(" ")
          .every(
            (v) => item.DIST_NAME.includes(v) || item.FUND_NAME.includes(v)
          );
      });
    },

    formOptions: {
      validateAfterLoad: false,
      validateAfterChanged: false,
    },
  },
};
</script>
<style scoped>
.footer {
  color: black;
  position: absolute;
  padding: 20px;
  right: 0;
  left: 0;
  bottom: 0;
  justify-items: center;
  display: inline-block;
  align-self: flex-end;
  margin-left: 35%;
  font-weight: 800;
}
</style>

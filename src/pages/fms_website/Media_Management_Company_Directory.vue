<template>
  <div>
    <div>
      <br />

      <br />

      <br />

      <br />
      <b-container fluid>
        <b-row class="justify-content-md-center">
          <b-col cols="10" align-v="baseline">
            <va-card>
              <div>
                <h4 slot="header" class="card-title">
                  Management Company Directory Search
                </h4>
              </div>
              <br />
              <div>
                <vue-form-generator
                  :model="model"
                  :schema="Schema"
                  :options="formOptions"
                  ref="advancedSearchForm"
                  @model-updated="onModelUpdated"
                >
                </vue-form-generator>
                <br />
                <button
                  @click="onSearch"
                  type="button"
                  class="ml-2 btn btn-sm btn-primary"
                >
                  Search
                </button>
              </div>
              <va-separator />
              <div>
                <div class="col">
                  <div class="row mb-1">
                    <span class="description col-4">ORGANIZATION NAME : </span>
                    <span class="description col">{{ details.DIST_NAME }}</span>
                  </div>
                </div>
                <div class="col">
                  <div class="row mb-1">
                    <span class="description col-4">ADDRESS : </span>
                    <span class="description col">
                      <div v-if="details.DIST_BIZ_ADDR_1 != null">
                      {{
                      details.DIST_BIZ_ADDR_1 +
                      details.DIST_BIZ_ADDR_2 +
                      details.DIST_BIZ_ADDR_3
                      }}
                      </div>
                    </span>
                  </div>
                </div>
                <div class="col">
                  <div class="row mb-1">
                    <span class="description col-4">CONTACT PERSON : </span>
                    <span class="description col">
                      <div

                      >

                      {{ details.REPR_NAME }} 01{{ details.DIST_MOBILE_NUMBER }}
                      </div>
                    </span>
                  </div>
                </div>
                <div class="col">
                  <div class="row mb-1">
                    <span class="description col-4">DESIGNATION : </span>
                    <span class="description col">
                      <div
                      >
                        {{ details.REPR_POSITION }}
                      </div>
                    </span>
                  </div>
                </div>
                <div class="col">
                  <div class="row mb-1">
                    <span class="description col-4">OFFICE NUMBER : </span>
                    <span class="description col">
                      <div v-if="details.FUND_SYARIAH_COMP == 1">Yes</div>
                      <div v-if="details.FUND_SYARIAH_COMP == 2">No</div>
                      <div
                      >
                        0{{ details.DIST_PHONE_NUMBER }}
                      </div>
                    </span>
                  </div>
                </div>
                <div class="col">
                  <div class="row mb-1">
                    <span class="description col-4">PHONE NUMBER : </span>
                    <span class="description col">
                      <div
                      >
                        01{{ details.DIST_MOBILE_NUMBER }}
                      </div>
                    </span>
                  </div>
                </div>
                <div class="col">
                  <div class="row mb-1">
                    <span class="description col-4">EMAIL ADDRESS : </span>
                    <span class="description col">
                      <div
                      >
                        {{ details.DIST_EMAIL }}
                      </div>
                    </span>
                  </div>
                </div>
              </div>
            </va-card>
          </b-col>
        </b-row>
        <br />

        <br />

        <br />

        <br />
      </b-container>
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

import * as services03Module5 from "@/app/module5/services03";

export default {
  name: "mediaMgmntCmpny",
  mounted() {
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
      details: [{
        ISTRIBUTOR_ID:161,
        DIST_REGI_ID:null,
        DIST_NAME:"REYHART FINANCE ASSET ALT SDN BHD",
        DIST_CODE:1000001,
        DIST_REGI_NUM1:"12345623-W",
        DIST_REGI_NUM2:"123456789-W",
        DIST_DATE_INCORP:"2021-09-30",
        DIST_TYPE_SETUP:1,
        DIST_PHONE_NUMBER:"601320506",
        DIST_PHONE_EXTENSION:"1234",
        DIST_MOBILE_NUMBER:"32050638",
        DIST_FAX_NUMBER:"312151531",
        DIST_EMAIL:"ACAPXASYRAFX@YAHOO.COM",
        DIST_COMPANY_WEBSITE:"Self Interest",
        CREATE_TIMESTAMP:"2021-09-30 06:52:53",
        DIST_ADDR_ID:61,
        DIST_ID:161,
        DIST_ADDR_1:"C-02-07 APARTMENT LAKEVIEW",
        DIST_ADDR_2:"OFF JALAN SUNGAI TUA",
        DIST_ADDR_3:"TAMAN JASA PERWIRA",
        DIST_POSTAL:null,
        DIST_CITY:68,
        DIST_STATE:48,
        DIST_COUNTRY:33,
        DIST_POSTAL2:null,
        DIST_STATE2:null,
        DIST_CITY2:null,
        DIST_ADDR_SAME:"-",
        DIST_BIZ_ADDR_1:"C-02-07 APARTMENT LAKEVIEW",
        DIST_BIZ_ADDR_2:"OFF JALAN SUNGAI TUA",
        DIST_BIZ_ADDR_3:"TAMAN JASA PERWIRA",
        DIST_BIZ_POSTAL:null,
        DIST_BIZ_CITY:68,
        DIST_BIZ_STATE:48,
        DIST_BIZ_COUNTRY:33,
        DIST_BIZ_POSTAL2:null,
        DIST_BIZ_STATE2:null,
        DIST_BIZ_CITY2:null,
        SETTING_GENERAL_ID:48,
        SET_TYPE:"STATE",
        SET_CODE:"MY",
        SET_PARAM:"KEDAH",
        SET_VALUE:"33",
        SET_SUB_VALUE:null,
        SET_INDEX:null,
        SET_DESCRIPTION:null,
        SET_REMARK:null,
        SET_CREATE_BY:null,
        SET_CREATE_TIMESTAMP:"2021-03-12 16:46:57",
        SETTING_CITY_ID:null,
        SET_CITY_NAME:"\r\nALOR SETAR",
        CITY_CREATE_BY:"",
        CITY_CREATE_TIMESTAMP:"2021-03-15 16:34:55",
        SETTING_POSTCODE_ID:null,
        POSTCODE_NO:null,
        POSTCODE_CREATE_BY:null,
        POSTCODE_CREATE_TIMESTAMP:null,
        COUNTRY_NAME:"MALAYSIA",
        STATE_NAME:"KEDAH"
      }
      ],

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
        FUND_NAME: "",
        DISTRIBUTOR: "",
      },

      Schema: {
        groups: [
          {
            fields: [
              {
                type: "vueMultiSelect",
                inputType: "text",
                model: "DISTRIBUTOR",
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
            ],
          },
        ],
      },
    };
  },
  watch: {
    ["DISTRIBUTOR_NAME"](value) {
      console.log(value);
      const data = this.DISTRIBUTOR_NAME;
      console.log(data);
      getFundProfileFilter(data);
    },
  },
  methods: {
    search: debounce(function (term) {
      this.term = term;
      console.log(this.term);
    }, 400),
    onSearch: async function () {
      console.log(this.model.DISTRIBUTOR.DISTRIBUTOR_ID);
      const data = this.model.DISTRIBUTOR.DISTRIBUTOR_ID;
      const response = await services03Module5.getDistributorDetail(data);
      console.log(response);
      this.details = response;
    },

    getDistributorMedia: async function () {
      const response = await servicesModule1.getDistributorMedia();
      this.distributor = response;
    },
    onModelUpdated(newVal, schema) {
      if (schema === "DISTRIBUTOR") {
        this.model.FUND_NAME = "";
        console.log(this.model.DISTRIBUTOR.DISTRIBUTOR_ID);
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
          name: "CURRENCY_NAME",
          title: "CURRENCY",
          sortField: "CURRENCY_NAME",
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

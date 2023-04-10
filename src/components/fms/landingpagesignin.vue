<template>
  <div>
    <div>
      <navbar></navbar>
    </div>
    <br /><br /><br />
    <router-view />
    <div>
      <!-- <div v-show="navlist != false">
        <navlist></navlist>
      </div>
      <div v-show="userProfile != false">
        <userProfile></userProfile>
      </div>
      <div v-show="mediaMgmntCmpny != false"> -->
      <!-- <mediaMgmntCmpny></mediaMgmntCmpny>
      </div> -->

    <footer_fundsmalaysia></footer_fundsmalaysia>
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

import navlist from "./default/DailyNavReport";
import userProfile from "./default/Media_User_Profile";
import mediaMgmntCmpny from "./default/Media_Management_Company_Directory";

export default {
  components: {
    navbar,
    footer_fundsmalaysia,
    navlist,
    userProfile,
    mediaMgmntCmpny,
  },
  name: "login",
  mounted() {
    this.getNAVlist();
    this.getDistributorMedia();
  },
  data() {
    return {
      navlist: true,
      userProfile: false,
      mediaMgmntCmpny: false,
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
    navlistpage() {
      alert("trigger");

      console.log("show NAV list");
      this.navlist = true;
      this.userProfile = false;
      this.mediaMgmntCmpny = false;
    },
    mediaMgmntCmpny() {
      alert("trigger");
      console.log("show management company directory");

      this.navlist = false;
      this.userProfile = false;
      this.mediaMgmntCmpny = true;
    },
    userProfile() {
      alert("trigger");
      console.log("show User Profile");

      this.navlist = false;
      this.userProfile = true;
      this.mediaMgmntCmpny = false;
    },
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

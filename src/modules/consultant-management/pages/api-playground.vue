<template>
  <va-card class="p-4">
    <div class="row">
      <div class="col-6">
        <h2>{{ dev }}</h2>
        <h3>Consultant API Playground</h3>
        <b-list-group class="mt-3">
          <b-list-group-item button @click="get_consultant_record"
            >get_consultant_record</b-list-group-item
          >
          <b-list-group-item button @click="get_highest_qualifications"
            >get_highest_qualifications</b-list-group-item
          >
          <b-list-group-item button @click="get_countries"
            >get_countries</b-list-group-item
          >
          <b-list-group-item button @click="get_states"
            >get_states</b-list-group-item
          >
          <b-list-group-item button @click="get_cities"
            >get_cities</b-list-group-item
          >
          <b-list-group-item button @click="get_postcodes"
            >get_postcodes</b-list-group-item
          >
          <b-list-group-item button @click="get_races"
            >get_races</b-list-group-item
          >
          <b-list-group-item button @click="get_genders"
            >get_genders</b-list-group-item
          >
          <b-list-group-item button @click="get_citizenships"
            >get_citizenships</b-list-group-item
          >
          <b-list-group-item button @click="get_credit_languages"
            >get_credit_languages</b-list-group-item
          >
          <b-list-group-item button @click="get_exams_sites"
            >get_exams_sites</b-list-group-item
          >
        </b-list-group>
      </div>
      <div class="col-6">
        <input-address-section
          :country="consultant.CONSULTANT_CORRESPONDENT_COUNTRY"
          :state="consultant.CONSULTANT_CORRESPONDENT_STATE"
          :city="consultant.CONSULTANT_CORRESPONDENT_CITY"
          :postcode="consultant.CONSULTANT_CORRESPONDENT_POSTAL"
          :address_1="consultant.CONSULTANT_CORRESPONDENT_ADDR1"
          :address_2="consultant.CONSULTANT_CORRESPONDENT_ADDR2"
          :address_3="consultant.CONSULTANT_CORRESPONDENT_ADDR3"
          @update="on_address_update"
        ></input-address-section>

        <pre class="mt-3 mb-0 pre-area language-json">
          <code>
          {{ payload  }}
          {{ general_settings }}
          </code>
          </pre>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 col-mt-5">
        <exam-form></exam-form>
      </div>
    </div>
  </va-card>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import * as API from "../services/general";
import * as ExamAPI from "../services/exam";
import InputAddressSection from "../components/applications/personal-particulars/address";
import ExamForm from "../components/applications/form_examination";

export default {
  components: {
    InputAddressSection,
    ExamForm,
  },
  computed: {
    ...mapGetters({
      dev: "getDev",
      general_settings: "getGeneralSettings",
    }),
  },
  data() {
    return {
      payload: "",
      consultant: null,
      address_model: {},
    };
  },
  methods: {
    //  APIs
    get_general_settings: async function () {
      try {
        const response = await API.get_general_settings();
        this.payload = response;
      } catch (error) {
        this.payload = error;
      }
    },

    get_consultant_record: async function () {
      try {
        const response = await API.get_consultant_record();
        this.payload = response;
      } catch (error) {
        this.payload = error;
      }
    },

    get_highest_qualifications: async function () {
      try {
        const response = await API.get_highest_qualifications();
        this.payload = response;
      } catch (error) {
        this.payload = error;
      }
    },

    get_countries: async function () {
      try {
        const response = await API.get_countries();
        this.payload = response;
      } catch (error) {
        this.payload = error;
      }
    },

    get_states: async function () {
      try {
        const response = await API.get_states(33);
        this.payload = response;
      } catch (error) {
        this.payload = error;
      }
    },

    get_cities: async function () {
      try {
        const response = await API.get_cities(44);
        this.payload = response;
      } catch (error) {
        this.payload = error;
      }
    },

    get_postcodes: async function () {
      try {
        const response = await API.get_postcodes(1);
        this.payload = response;
      } catch (error) {
        this.payload = error;
      }
    },

    get_races: async function () {
      try {
        const response = await API.get_races();
        this.payload = response;
      } catch (error) {
        this.payload = error;
      }
    },

    get_genders: async function () {
      try {
        const response = await API.get_genders();
        this.payload = response;
      } catch (error) {
        this.payload = error;
      }
    },

    get_citizenships: async function () {
      try {
        const response = await API.get_citizenships();
        this.payload = response;
      } catch (error) {
        this.payload = error;
      }
    },

    get_credit_languages: async function () {
      try {
        const response = await API.get_credit_languages();
        this.payload = response;
      } catch (error) {
        this.payload = error;
      }
    },

    get_exams_sites: async function () {
      try {
        const response = await ExamAPI.get_exams_sites();
        this.payload = response;
      } catch (error) {
        this.payload = error;
      }
    },

    populate_data: function () {
      let data = JSON.parse(localStorage.getItem("user"));
      console.log(data);
      this.consultant = data.consultant;
    },
    on_address_update: function (value, schema) {
      console.log(value);
      console.log(model);
    },
  },
  created() {
    this.populate_data();
  },
};
</script>

<style lang="scss">
.pre-area {
  max-height: 800px;
}

code[class*="language-"],
pre[class*="language-"] {
  color: #000;
  text-shadow: 0 1px #fff;
  font-family: Consolas, Monaco, Andale Mono, Ubuntu Mono, monospace;
  direction: ltr;
  text-align: left;
  white-space: pre;
  word-spacing: normal;
  word-break: normal;
  word-wrap: normal;
  line-height: 1.5;
  -moz-tab-size: 4;
  -o-tab-size: 4;
  tab-size: 4;
  -webkit-hyphens: none;
  -ms-hyphens: none;
  hyphens: none;
}
:not(pre) > code[class*="language-"],
pre[class*="language-"] {
  background: #f3f5f6;
}
pre[class*="language-"] {
  padding: 1.3em 1em;
  margin: 0 0 20px;
  overflow: auto;
}
code[class*="language-"],
pre[class*="language-"] {
  color: #000;
  text-shadow: 0 1px #fff;
  font-family: Consolas, Monaco, Andale Mono, Ubuntu Mono, monospace;
  direction: ltr;
  text-align: left;
  white-space: pre;
  word-spacing: normal;
  word-break: normal;
  word-wrap: normal;
  line-height: 1.5;
  -moz-tab-size: 4;
  -o-tab-size: 4;
  tab-size: 4;
  -webkit-hyphens: none;
  -ms-hyphens: none;
  hyphens: none;
}

pre {
  font-size: 0.875rem;
}
</style>

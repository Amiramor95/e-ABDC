<template>
  <div class="row">
    <div class="col-md-12 pl-0">
      <div class="row">
        <b-form-group label="Country:" label-for="country" description class="col-md-6 required pl-0">
          <multiselect
            id="country"
            v-model="form.country"
            :options="option_countries"
            track-by="SETTING_GENERAL_ID"
            label="SET_PARAM"
            placeholder="Select one"
          ></multiselect>
        </b-form-group>

        <b-form-group label="State:" label-for="state" description class="col-md-6 required">
          <multiselect
            id="state"
            v-model="form.state"
            :options="option_states"
            track-by="SETTING_GENERAL_ID"
            label="SET_PARAM"
            placeholder="Select one"
          ></multiselect>
        </b-form-group>
      </div>

      <!-- City postcodes -->

      <div class="row">
        <b-form-group label="City:" label-for="city" description class="col-md-6 required pl-0">
          <multiselect
            id="city"
            v-model="form.city"
            :options="option_cities"
            track-by="SETTING_CITY_ID"
            label="SET_CITY_NAME"
            placeholder="Select one"
          ></multiselect>
        </b-form-group>

        <b-form-group label="Postcode:" label-for="postcode" description class="col-md-6 required">
          <multiselect
            id="postcode"
            v-model="form.postcode"
            :options="option_postcodes"
            track-by="SETTING_POSTCODE_ID"
            label="POSTCODE_NO"
            placeholder="Select one"
          ></multiselect>
        </b-form-group>
      </div>

      <div class="row">
        <b-form-group class="required" label="Address:" label-for="input-address1">
          <div class>
            <b-form-input class="text-uppercase" id="input-address1" v-model="model.address_1"></b-form-input>
            <small class="form-text text-muted">Street address.</small>
          </div>
          <div class="mt-3">
            <b-form-input class="text-uppercase" id="input-address2" v-model="model.address_2"></b-form-input>
            <small class="form-text text-muted">Street address line 2.</small>
          </div>

          <div class="mt-3">
            <b-form-input class="text-uppercase" id="input-address3" v-model="model.address_3"></b-form-input>
            <small class="form-text text-muted">Street address line 3.</small>
          </div>
        </b-form-group>
      </div>
    </div>
  </div>
</template>

<script>
import * as GeneralSettingsAPI from "../../../services/general";
export default {
  name: "consultant-address",
  props: {
    country: {
      type: Number,
    },
    state: {
      type: Number,
    },
    city: {
      type: Number,
    },
    postcode: {
      type: Number,
    },
    postcode_value: {
      type: Number,
    },
    address_1: {
      type: String,
    },
    address_2: {
      type: String,
    },
    address_3: {
      type: String,
    },
  },
  watch: {
    "form.country": function (val) {
      // console.log(val);
      if (val) {
        if (val.SETTING_GENERAL_ID != this.model.country) {
          this.model.country = val.SETTING_GENERAL_ID;
          this.fetchStates(this.model.country);
        }
      }
    },
    "form.state": function (val) {
      // console.log(val);
      if (val) {
        if (val.SETTING_GENERAL_ID != this.model.state) {
          this.model.state = val.SETTING_GENERAL_ID;
          this.fetchCities(this.model.state);
        }
      }
    },
    "form.city": function (val) {
      // console.log(val);
      if (val) {
        if (val.SETTING_CITY_ID != this.model.city) {
          this.model.city = val.SETTING_CITY_ID;
          this.fetchPostcodes(this.model.city);
        }
      }
    },
    "form.postcode": function (val) {
      // console.log(val);
      if (val) {
        if (val.SETTING_POSTCODE_ID != this.model.postcode) {
          this.model.postcode = val.SETTING_POSTCODE_ID;
        }
      }
    },
  },
  data() {
    return {
      option_countries: [],
      option_states: [],
      option_postcodes: [],
      option_cities: [],
      form: {
        country: null,
        state: null,
        city: null,
        postcode: null,
        postcode_value: null,
      },
      model: {
        country: this.country,
        state: this.state,
        city: this.city,
        postcode: this.postcode,
        postcode_value: this.postcode,
        address_1: this.address_1,
        address_2: this.address_2,
        address_3: this.address_3,
      },
    };
  },
  computed: {
    consultantNameValidation() {
      if (this.model.CONSULTANT_NAME) {
        return this.isValid(this.model.CONSULTANT_NAME);
      }
      return null;
    },
  },
  methods: {
    //FOR VALIDATIONS
    isRequiredValid(string) {
      return string.length > 0 ? true : false; //your validation criteria goes here
    },

    async fetchCountries() {
      try {
        const res_countries = await GeneralSettingsAPI.get_countries();
        this.option_countries = res_countries.data;
        this.mapDropDownToModel();
      } catch (error) {
        console.log(error);
      }
    },

    async fetchStates(country_id) {
      try {
        const res_states = await GeneralSettingsAPI.get_states(country_id);
        this.option_states = res_states.data;
        this.mapDropDownToModel();
      } catch (error) {
        console.log(error);
      }
    },

    async fetchCities(state_id) {
      try {
        const res_cities = await GeneralSettingsAPI.get_cities(state_id);
        this.option_cities = res_cities.data;
        this.mapDropDownToModel();
      } catch (error) {
        console.log(error);
      }
    },

    async fetchPostcodes(city_id) {
      try {
        const res_postcodes = await GeneralSettingsAPI.get_postcodes(city_id);
        this.option_postcodes = res_postcodes.data;
        this.mapDropDownToModel();
      } catch (error) {
        console.log(error);
      }
    },
    mapDropDownToModel: function () {
      this.form.country = this.option_countries.find(
        (country) => country.SETTING_GENERAL_ID == this.model.country
      );
      this.form.state = this.option_states.find(
        (state) => state.SETTING_GENERAL_ID == this.model.state
      );
      this.form.city = this.option_cities.find(
        (city) => city.SETTING_CITY_ID == this.model.city
      );
      this.form.postcode = this.option_postcodes.find(
        (postcode) => postcode.SETTING_POSTCODE_ID == this.model.postcode
      );
    },
    getDataToSave() {
      return this.model;
    },
    updateInputs(data) {
      this.model = _.cloneDeep(data);
      this.fetchStates(this.model.country);
      this.fetchCities(this.model.state);
      this.fetchPostcodes(this.model.city);
    },
  },
  created() {
    this.fetchCountries();
    this.fetchStates(this.country);
    this.fetchCities(this.state);
    this.fetchPostcodes(this.city);
    // console.log(this.model)
    
    // if(this.country){
    //   this.model.country = this.country;
    // }else{
    //   this.model.country = 33; //SETTING_GENERAL_ID for Country Malaysia
    // }
  },
};
</script>

<style></style>

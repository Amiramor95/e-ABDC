<template>
  <div>
    <vue-form-generator
      :model="form"
      :schema="schemaApplicantAddress"
      :options="formOptions"
      ref="formApplicantAddress"
      @model-updated="onModelUpdated"
    >
    </vue-form-generator>
    <div class="mt-3 hide" style="background-color: yellow;">
      <pre>
      {{ form }}
      </pre>
      <br />
      <pre>
        {{ model }}
      </pre>
    </div>
  </div>
</template>

<script>
import * as GeneralSettingsAPI from "../../../services/general";
export default {
  props: {
      country: {
        type: Number
      },
      state: {
        type: Number
      },
      city: {
        type: Number
      },
      postcode: {
        type: Number
      },
      address_1: {
        type: String
      },
      address_2: {
        type: String
      },
      address_3: {
        type: String
      },
  },
  data() {
    return {
      show: true,
      model: {
        country: this.country,
        state: this.state,
        city: this.city,
        postcode: this.postcode,
        address_1: this.address_1,
        address_2: this.address_2,
        address_3: this.address_3,
      },
      form: {
        country: null,
        state: null,
        city: null,
        postcode: null,
        address_1: null,
        address_2: null,
        address_3: null,
      },
      DS_countries: [],
      DS_states: [],
      DS_cities: [],
      DS_postcodes: [],
      formOptions: {
        validateAfterLoad: false,
        validateAfterChanged: true,
        validateAsync: true,
      },
      // form 1- address correspondent
      schemaApplicantAddress: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "vueMultiSelect",
                model: "country",
                label: "Country",
                placeholder: "Enter Country",
                required: true,
                validator: "required",
                styleClasses: "col-md-6",
                selectOptions: {
                  multiple: false,
                  key: "SETTING_GENERAL_ID",
                  label: "SET_PARAM",
                  // value: 'SETTING_GENERAL_ID',
                  searchable: true,
                },

                values: (model, schema) => {
                  return this.DS_countries;
                },
              },
              {
                type: "vueMultiSelect",
                model: "state",
                label: "State",
                placeholder: "Enter state",
                required: true,
                validator: "required",
                styleClasses: "col-md-6 ",
                selectOptions: {
                  multiple: false,
                  key: "SET_GENERAL_ID",
                  label: "SET_PARAM",
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.DS_states;
                },
              },
              {
                type: "vueMultiSelect",
                model: "city",
                label: "City",
                placeholder: "Enter City",
                required: true,
                validator: "required",
                styleClasses: "col-md-6 ",
                selectOptions: {
                  multiple: false,
                  key: "SETTING_CITY_ID",
                  label: "SET_CITY_NAME",
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.DS_cities;
                },
              },



              {
                type: "vueMultiSelect",
                model: "postcode",
                label: "Postcode",
                placeholder: "Enter postcode",
                required: true,
                validator: "required",
                styleClasses: "col-md-6 ",
                selectOptions: {
                  multiple: false,
                  key: "SETTING_POSTCODE_ID",
                  label: "POSTCODE_NO",
                  searchable: true,
                },
                values: (model, schema) => {
                  // if (this.postcode.POSTCODE) return this.postcode.POSTCODE;
                  return this.DS_postcodes;
                },
              },

              {
                type: "input",
                inputType: "text",
                label: "Address",
                model: "address_1",
                placeholder: "Enter street address",
                hint: "Street Address",
                required: true,
                validator: "required",
                styleClasses: "col-md-12 text-uppercase",
              },
              {
                type: "input",
                inputType: "text",
                model: "address_2",
                placeholder: "Enter street address",
                hint: "Street address line 2",
                styleClasses: "col-md-12 text-uppercase",
              },
              {
                type: "input",
                inputType: "text",
                model: "address_3",
                placeholder: "Enter street address",
                hint: "Street address line 3",
                styleClasses: "col-md-12 text-uppercase",
              },
            ],
          },
        ],
      },
    };
  },
  methods: {
    async fetchCountries() {
      try {
        const res_countries = await GeneralSettingsAPI.get_countries();
        this.DS_countries = res_countries.data;
        this.mapDropDownToModel()
      } catch (error) {
        console.log(error);
      }
    },

    async fetchStates(country_id) {
      try {
        const res_states = await GeneralSettingsAPI.get_states(country_id);
        this.DS_states = res_states.data;
        this.mapDropDownToModel()
      } catch (error) {
        console.log(error);
      }
    },

    async fetchCities(state_id) {
      try {
        const res_cities = await GeneralSettingsAPI.get_cities(state_id);
        this.DS_cities = res_cities.data;
        this.mapDropDownToModel()
      } catch (error) {
        console.log(error);
      }
    },

    async fetchPostcodes(city_id) {
      try {
        const res_postcodes = await GeneralSettingsAPI.get_postcodes(city_id);
        this.DS_postcodes = res_postcodes.data;
        this.mapDropDownToModel()
      } catch (error) {
        console.log(error);
      }
    },

    mapDropDownToModel: function () {

      this.form.country = this.DS_countries.find(
        (country) =>
          country.SETTING_GENERAL_ID == this.model.country
      );
      this.form.state = this.DS_states.find(
        (state) =>
          state.SETTING_GENERAL_ID == this.model.state
      );
      this.form.city = this.DS_cities.find(
        (city) =>
          city.SETTING_CITY_ID == this.model.city
      );
      this.form.postcode = this.DS_postcodes.find(
        (postcode) =>
          postcode.SETTING_POSTCODE_ID == this.model.postcode
      );
      this.form.address_1 = this.model.address_1;
      this.form.address_2 = this.model.address_2;
      this.form.address_3 = this.model.address_3;
    },

    onModelUpdated(newVal, schema) {
      // console.log(`schema: ${schema}`, "value:", newVal);
      if (schema == "country") {
        this.form.country = newVal;
        this.model.country = newVal.SETTING_GENERAL_ID;
        this.fetchStates(this.model.country);
        this.$emit("update", this.model.country, schema);
      }
      if (schema == "state") {
        this.form.state = newVal;
        this.model.state = newVal.SETTING_GENERAL_ID;
        this.fetchCities(this.model.state);
        this.$emit("update", this.model.state, schema);
      }
      if (schema == "city") {
        this.form.city = newVal;
        this.city = newVal.SETTING_CITY_ID;
        this.fetchPostcodes(this.model.city);
        this.$emit("update", this.model.city, "city");
      }
      if (schema == "postcode") {
        this.form.postcode = newVal;
        this.model.postcode = newVal.SETTING_POSTCODE_ID;
        this.$emit("update", this.model.postcode, schema);
      }
      if (schema == "address_1") {
        this.form.address_1 = newVal;
        this.model.address_1 = newVal;
        this.$emit("update", this.model.address_1, schema);
      }
      if (schema == "address_2") {
        this.form.address_2 = newVal;
        this.model.address_2 = newVal;
        this.$emit("update", this.model.address_2, schema);
      }
      if (schema == "address_3") {
        this.form.address_3 = newVal;
        this.model.address_3 = newVal;
        this.$emit("update", this.model.address_3, schema);
      }

      // let obj = {
      //   country: this.model.country,
      //   state: this.model.state,
      //   city: this.model.city,
      //   postcode: this.model.postcode,
      //   address_1: this.model.address_1,
      //   address_2: this.model.address_2,
      //   address_3: this.model.address_3,
      // };
      // this.$emit("update", obj);
    },
  },
  created() {
    this.fetchCountries();
    this.fetchStates(this.country);
    this.fetchCities(this.state);
    this.fetchPostcodes(this.city);
    // console.log(this.model)
  },
};
</script>
<style lang="scss">
.hide{
  display: none;
}
</style>

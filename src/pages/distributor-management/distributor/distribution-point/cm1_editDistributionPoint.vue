<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">
        Distribution Point : New Registration
      </h4>
    </div>
    <br />
    <va-card>
      <div>
        <vue-form-generator
          :model="model"
          :schema="registerNewSchema"
          :options="formOptions"
          ref="registerNewForm"
          @model-updated="onModelUpdated"
        >
        </vue-form-generator>
      </div>
    </va-card>
    <br />
    <br />
    <button @click="back" type="button" class="btn btn-primary btn-fill btn-md">
      <i class="fa fa-step-backward" /> &nbsp; Previous
    </button>
    <div class="float-right">
       <button
        @click="saveAsDraft"
        type="button"
        class="ml-2 btn btn-info btn-fill btn-md"
      >
        <i class="fa fa-pencil-square-o" /> &nbsp; Save as draft
      </button>
      <button
        @click="submit"
        type="button"
        style="background: #87cb16; color: #ffffff"
        class="ml-1 btn btn-fill btn-md"
      >
        <i class="fa fa-save" /> &nbsp; Save
      </button>
    </div>
  </va-card>
</template>

<script>
import "vue-form-generator/dist/vfg.css";
import * as servicesModule1 from "../../../../app/module1/services01";

export default {
  mounted() {
    var data = localStorage.getItem("edit-distributionPoint");
    this.DPDATA = JSON.parse(data);
   

    this.getCountry();
    this.getStatus();
    this.getState();
    this.getCity();
    this.getPostCode();
    
    this.model.DIST_COUNTRY = {
        SETTING_GENERAL_ID: this.DPDATA.DIST_COUNTRY,
        SET_PARAM: this.DPDATA.COUNTRY_NAME,
      };

      this.model.DIST_STATE = {
        SETTING_GENERAL_ID: this.DPDATA.DIST_STATE,
        SET_PARAM: this.DPDATA.STATE_NAME,
      };



       this.model.DIST_CITY = {
        SETTING_CITY_ID: this.DPDATA.DIST_CITY,
        SET_CITY_NAME: this.DPDATA.SET_CITY_NAME,
      };

       this.model.DIST_POSTAL = {
        SETTING_POSTCODE_ID: this.DPDATA.DIST_POSTAL,
        POSTCODE_NO: this.DPDATA.POSTCODE_NO,
      };


    this.model.dpCode = this.DPDATA.DIST_POINT_CODE;
    this.model.dpName = this.DPDATA.DIST_POINT_NAME;
    this.model.dpPhoneNo = this.DPDATA.PHONE_NUMBER;
    this.model.DIST_ADDR_1 = this.DPDATA.DIST_ADDR_1;
    this.model.DIST_ADDR_2 = this.DPDATA.DIST_ADDR_2;
    this.model.DIST_ADDR_3 = this.DPDATA.DIST_ADDR_3;

    this.model.OTHER_STATE= this.DPDATA.OTHER_STATE;
    this.model.OTHER_CITY= this.DPDATA.OTHER_CITY;
    this.model.OTHER_POSTAL= this.DPDATA.OTHER_POSTAL;

    this.model.status = {
        TS_ID: this.DPDATA.TS_ID,
        TS_PARAM: this.DPDATA.TS_PARAM,
      };

    this.model.code = this.DPDATA.SET_CODE;

  },

  components: {},
  methods: {
    async getStatus() {
      const response = await servicesModule1.getStatus();
      this.statusList = response;
    },

    async getCountry() {
      const response = await servicesModule1.getAllCountry();
      this.country = response;
    },

       async getState(){
       const response= await servicesModule1.getStateByID(
          this.DPDATA.DIST_COUNTRY
        );
        this.state = response;
    },

    async getCity(){
      const response = await servicesModule1.getCityByID(
          this.DPDATA.DIST_STATE
        );
        this.city = response;
    },

    async getPostCode(){

       const response = await servicesModule1.getPostcodeByID(
          this.DPDATA.DIST_CITY
        );
        this.postcode = response;

    },

    onModelUpdated: async function (newVal, schema) {
      if (schema == "dpCode") {
        this.model.dpCode = String(newVal).toUpperCase();
      }
      if (schema == "dpName") {
        this.model.dpName = String(newVal).toUpperCase();
      }
      if (schema == "OTHER_STATE") {
        this.model.OTHER_STATE = String(newVal).toUpperCase();
      }
      if (schema == "OTHER_CITY") {
        this.model.OTHER_CITY = String(newVal).toUpperCase();
      }
      if (schema == "OTHER_POSTAL") {
        this.model.OTHER_POSTAL = String(newVal).toUpperCase();
      }
      if (schema == "DIST_ADDR_1") {
        this.model.DIST_ADDR_1 = String(newVal).toUpperCase();
      }
      if (schema == "DIST_ADDR_2") {
        this.model.DIST_ADDR_2 = String(newVal).toUpperCase();
      }
      if (schema == "DIST_ADDR_3") {
        this.model.DIST_ADDR_3 = String(newVal).toUpperCase();
      }

      if (schema == "DIST_COUNTRY" && newVal) {
        
        const response1 = await servicesModule1.getCountryByID(
          newVal.SETTING_GENERAL_ID
        );

        this.model.code= response1.SET_CODE;

        const response = await servicesModule1.getStateByID(
          newVal.SETTING_GENERAL_ID
        );
        this.state = response;
      }

      if (schema == "DIST_STATE" && newVal) {
        const response = await servicesModule1.getCityByID(
          newVal.SETTING_GENERAL_ID
        );
        this.city = response;
      }

      if (schema == "DIST_CITY" && newVal) {
        const response = await servicesModule1.getPostcodeByID(
          newVal.SETTING_CITY_ID
        );
        this.postcode = response;
      }
    },

    async back() {
      this.$router.go(-1);
    },

     validatePostcode(value) {
      const expression1 = /^[0-9]+$/;
    
      console.log(expression1.test(value));
      if (!expression1.test(value)) {
        return ["Postcode must contain number only"];
      }
    },

      saveAsDraft: async function () {
      if (confirm("Are you sure you want to save as draft this entry?")) {
      const data = new FormData();
      data.append("DIST_POINT_ID", this.DPDATA.DIST_POINT_ID);
      data.append("DP_CODE", this.model.dpCode);
      data.append("DP_NAME", this.model.dpName);
      data.append("DP_PHONENO", this.model.dpPhoneNo);
      data.append("DIST_COUNTRY", this.model.DIST_COUNTRY.SETTING_GENERAL_ID);
      data.append("DIST_STATE", this.model.DIST_STATE.SETTING_GENERAL_ID);
      data.append("DIST_CITY", this.model.DIST_CITY.SETTING_CITY_ID);
      data.append("DIST_POSTAL", this.model.DIST_POSTAL.SETTING_POSTCODE_ID);

      data.append("OTHER_STATE", this.model.OTHER_STATE);
      data.append("OTHER_CITY", this.model.OTHER_CITY);
      data.append("OTHER_POSTAL", this.model.OTHER_POSTAL);

      data.append("DIST_ADDR1", this.model.DIST_ADDR_1);
      data.append("DIST_ADDR2", this.model.DIST_ADDR_2);
      data.append("DIST_ADDR3", this.model.DIST_ADDR_3);

      data.append("TS_ID", 1);

      const user = localStorage.getItem("user");
      data.append("CREATE_BY", JSON.parse(user).user_id);
      data.append("DISTRIBUTOR_ID", JSON.parse(user).USER_DIST_ID);

      try {
        const response = await servicesModule1.updateDP(data);
        console.log(response);
        this.$router.go(-1);
      } catch (error) {
        console.log(error);
      }
      }
    },

    submit: async function () {
      if (confirm("Are you sure you want to save this entry?")) {
      const data = new FormData();
      data.append("DIST_POINT_ID", this.DPDATA.DIST_POINT_ID);
      data.append("DP_CODE", this.model.dpCode);
      data.append("DP_NAME", this.model.dpName);
      data.append("DP_PHONENO", this.model.dpPhoneNo);
      data.append("DIST_COUNTRY", this.model.DIST_COUNTRY.SETTING_GENERAL_ID);
      data.append("DIST_STATE", this.model.DIST_STATE.SETTING_GENERAL_ID);
      data.append("DIST_CITY", this.model.DIST_CITY.SETTING_CITY_ID);
      data.append("DIST_POSTAL", this.model.DIST_POSTAL.SETTING_POSTCODE_ID);

      data.append("OTHER_STATE", this.model.OTHER_STATE);
      data.append("OTHER_CITY", this.model.OTHER_CITY);
      data.append("OTHER_POSTAL", this.model.OTHER_POSTAL);

      data.append("DIST_ADDR1", this.model.DIST_ADDR_1);
      data.append("DIST_ADDR2", this.model.DIST_ADDR_2);
      data.append("DIST_ADDR3", this.model.DIST_ADDR_3);

      data.append("TS_ID", this.model.status.TS_ID);

      const user = localStorage.getItem("user");
      data.append("CREATE_BY", JSON.parse(user).user_id);
      data.append("DISTRIBUTOR_ID", JSON.parse(user).USER_DIST_ID);

      try {
        const response = await servicesModule1.updateDP(data);
        console.log(response);
        this.$router.go(-1);
      } catch (error) {
        console.log(error);
      }
       }
    },
  },
  computed: {},
  data() {
    return {
      country: [],
      state: [],
      postcode: [],
      city: [],
      statusList: [],
      DPDATA: "",

      model: {
        dpCode: "",
        dpName: "",
        dpPhoneNo: "",

        DIST_ADDR_1: "",
        DIST_ADDR_2: "",
        DIST_ADDR_3: "",
        DIST_POSTAL: "",
        DIST_COUNTRY: "",
        DIST_CITY: "",
        DIST_STATE: "",

        OTHER_STATE: "",
        OTHER_CITY: "",
        OTHER_POSTAL: "",

        status: "",
        code:"",
      },
      registerNewSchema: {
        fields: [
          // {
          //   type: "input",
          //   inputType: "text",
          //   model: "dpCode",
          //   label: "Distribution Point Code",
          //   placeholder: "Enter distribution point code",
          //   styleClasses: "col-md-12",
           
          // },
          {
            type: "input",
            inputType: "text",
            model: "dpName",
            label: "Distribution Point Name",
            placeholder: "Enter distribution point name",
            styleClasses: "col-md-12",
            required: true,
            validator: "string",
          },
          {
            labels: "Office Phone Number",
            model: "dpPhoneNo",
            type: "vfg-the-mask",
            placeholder: "Enter phone number",
            mask: "##-########",
            styleClasses: "col-md-12",
            required: true,
            validator: "string",
          },
          {
            type: "vueMultiSelect",
            model: "DIST_COUNTRY",
            label: "Country",
            placeholder: "Enter Your Country",
            required: true,
            validator: "required",

            styleClasses: "col-md-6",
            selectOptions: {
              multiple: false,
              key: "SETTING_GENERAL_ID",
              label: "SET_PARAM",
              searchable: true,
            },
            values: (model, schema) => {
              return this.country;
            },
          },
          {
            label: "State",
            type: "input",
            inputType: "text",
            model: "OTHER_STATE",
            placeholder: "Enter Your State",
            styleClasses: "col-md-6",
            required: true,
            validator: "string",
            visible: (model, field, form) => {
              return model.code != "MY";
            },
          },
          {
            type: "vueMultiSelect",
            model: "DIST_STATE",
            label: "State",
            placeholder: "Select Your state",
            required: true,
            validator: "required",
            styleClasses: "col-md-6",
            selectOptions: {
              multiple: false,
              key: "SETTING_GENERAL_ID",
              label: "SET_PARAM",
              searchable: true,
            },
            visible: (model, field, form) => {
             return model.code == "MY";
            },
            values: (model, schema) => {
              return this.state;
            },
          },
          {
            type: "vueMultiSelect",
            model: "DIST_CITY",
            label: "City",
            placeholder: "Enter Your City",
            required: true,
            validator: "required",
            styleClasses: "col-md-6",
            selectOptions: {
              multiple: false,
              key: "SETTING_CITY_ID",
              label: "SET_CITY_NAME",
              searchable: true,
            },
            visible: (model, field, form) => {
              return model.code == "MY";
            },
            values: (model, schema) => {
              return this.city;
            },
          },
          {
            label: "City",
            type: "input",
            inputType: "text",
            model: "OTHER_CITY",
            placeholder: "Enter Your City",
            styleClasses: "col-md-6",
            required: true,
            validator: "string",
            visible: (model, field, form) => {
              return model.code != "MY";
            },
          },
          {
            label: "Postcode",
            type: "input",
            inputType: "text",
            model: "OTHER_POSTAL",
            placeholder: "Enter Your Postcode",
            styleClasses: "col-md-6",
            required: true,
            validator: ["required", this.validatePostcode],
            visible: (model, field, form) => {
              return model.code != "MY";
            },
          },
          {
            type: "vueMultiSelect",
            model: "DIST_POSTAL",
            label: "Postcode",
            placeholder: "Enter Your Postcode",
            required: true,
            validator: "required",
            styleClasses: "col-md-6",
            visible: (model, field, form) => {
              return model.code == "MY";
            },
            selectOptions: {
              multiple: false,
              key: "SETTING_POSTCODE_ID",
              label: "POSTCODE_NO",
              searchable: true,
            },
            values: (model, schema) => {
              return this.postcode;
            },
          },

          {
            type: "input",
            inputType: "text",
            label: "Address",
            model: "DIST_ADDR_1",
            placeholder: "Enter street address",
            hint: "Street Address",
            required: true,
            validator: "string",
            styleClasses: "col-md-12",
          },
          {
            type: "input",
            inputType: "text",
            model: "DIST_ADDR_2",
            placeholder: "Enter street address",
            hint: "Street Address line 2",
            styleClasses: "col-md-12",
          },
          {
            type: "input",
            inputType: "text",
            model: "DIST_ADDR_3",
            placeholder: "Enter street address",
            hint: "Street Address line 3",
            styleClasses: "col-md-12",
          },

          {
            type: "vueMultiSelect",
            model: "status",
            label: "Status",
            placeholder: "Enter Status",
            required: true,
            validator: "required",
            styleClasses: "col-md-6",
            selectOptions: {
              multiple: false,
              key: "TS_ID",
              label: "TS_PARAM",
              searchable: true,
            },
            values: (model, schema) => {
              return this.statusList;
            },
          },

           {
            type: "input",
            inputType: "hidden",
            model: "code",
            styleClasses: "col-md-12",
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
.default-tabs {
  position: relative;
  margin: 0 auto;

  &__item {
    display: inline-block;
    margin: 0 5px;
    padding: 10px;
    padding-bottom: 8px;
    font-size: 16px;
    letter-spacing: 0.8px;
    color: gray;
    text-decoration: none;
    border: none;
    background-color: transparent;
    border-bottom: 2px solid transparent;
    cursor: pointer;
    transition: all 0.25s;

    &__active {
      color: black;
    }

    &:hover {
      border-bottom: 2px solid gray;
      color: black;
    }

    &:focus {
      outline: none;
      border-bottom: 2px solid gray;
      color: black;
    }

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }
  }

  &__active-line {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    background-color: black;
    transition: transform 0.4s ease, width 0.4s ease;
  }
}

.alignright {
  display: flex;
  justify-content: flex-end;
}

.alignleft {
  display: flex;
  justify-content: flex-start;
}
</style>

<style scoped>
.widthModal {
  width: 80%;
}
</style>


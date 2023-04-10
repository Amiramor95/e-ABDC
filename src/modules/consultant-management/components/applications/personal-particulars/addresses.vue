<template>
  <div>
    <div class="row mt-4">
      <div class="col-md-12">
        <h5>Correspondent Address</h5>
        <input-address
          class="mt-4"
          ref="addressCorrespondent"
          :country="this.model.CONSULTANT_CORRESPONDENT_COUNTRY"
          :state="this.model.CONSULTANT_CORRESPONDENT_STATE"
          :city="this.model.CONSULTANT_CORRESPONDENT_CITY"
          :postcode="this.model.CONSULTANT_CORRESPONDENT_POSTAL"
          :postcode_value="this.model.CONSULTANT_CORRESPONDENT_POSTAL_VALUE"
          :address_1="this.model.CONSULTANT_CORRESPONDENT_ADDR1"
          :address_2="this.model.CONSULTANT_CORRESPONDENT_ADDR2"
          :address_3="this.model.CONSULTANT_CORRESPONDENT_ADDR3"
        ></input-address>
      </div>
    </div>

    <div class="row mt-5">
      <div class="col-md-12">
        <h5>Permanent Address</h5>

        <!-- <b-form-checkbox
          id="address-same"
          v-model="model.SELECTED_SAME_ADDRESS"
          name="checkbox-1"
          class="mt-3"
          value="1"
          checked
          @change="toggleSameAddress"
        >
          Tick if Permanent Address is same as Correspondence Address
        </b-form-checkbox> -->

        <input type="checkbox" id="address-same" v-model="model.SELECTED_SAME_ADDRESS" 
        class="mt-3 mr-2" @input="setCheck($event.target.checked)">
        <label for="address-same">Tick if Permanent Address is same as Correspondence Address</label>

        <input-address
          class="mt-4"
          ref="addressPermanent"
          :country="this.model.CONSULTANT_PERMANENT_COUNTRY"
          :state="this.model.CONSULTANT_PERMANENT_STATE"
          :city="this.model.CONSULTANT_PERMANENT_CITY"
          :postcode="this.model.CONSULTANT_PERMANENT_POSTAL"
          :postcode_value="this.model.CONSULTANT_PERMANENT_POSTAL_VALUE"
          :address_1="this.model.CONSULTANT_PERMANENT_ADDR1"
          :address_2="this.model.CONSULTANT_PERMANENT_ADDR2"
          :address_3="this.model.CONSULTANT_PERMANENT_ADDR3"
        ></input-address>
      </div>
    </div>
  </div>
</template>

<script>
import InputAddress from "./address2";
export default {
  name: "section-addresses",
  // props: ["personal_particulars", "general_settings"],
  props: {
  // parameters the component accepts
  personal_particulars: Object,
  general_settings: Object,
  savedConsultantData: Object,
},
  components: {
    InputAddress,
  },
  computed: {
    setConsultantPostalCode() {},
  },
  data() {
    return {
      checked: false,
      model: {
        SELECTED_SAME_ADDRESS: "",
        CONSULTANT_CORRESPONDENT_COUNTRY: "",
        CONSULTANT_CORRESPONDENT_STATE: "",
        CONSULTANT_CORRESPONDENT_CITY: "",
        CONSULTANT_CORRESPONDENT_POSTAL: "",
        CONSULTANT_CORRESPONDENT_POSTAL_VALUE: "",
        CONSULTANT_CORRESPONDENT_ADDR1: "",
        CONSULTANT_CORRESPONDENT_ADDR2: "",
        CONSULTANT_CORRESPONDENT_ADDR3: "",

        CONSULTANT_PERMANENT_COUNTRY: "",
        CONSULTANT_PERMANENT_STATE: "",
        CONSULTANT_PERMANENT_CITY: "",
        CONSULTANT_PERMANENT_POSTAL: "",
        CONSULTANT_PERMANENT_POSTAL_VALUE: "",
        CONSULTANT_PERMANENT_ADDR1: "",
        CONSULTANT_PERMANENT_ADDR2: "",
        CONSULTANT_PERMANENT_ADDR3: "",
      },
    };
  },
  methods: {
    isChecked(){
      if(this.model.SELECTED_SAME_ADDRESS == 1){
        this.checked = true;
      }else{
        this.checked = false;
      }
    },

    setCheck(check) {
      if (check) {
        this.checked = check;
        this.model.SELECTED_SAME_ADDRESS = 1;
        const data = this.$refs.addressCorrespondent.getDataToSave();
        this.$refs.addressPermanent.updateInputs(data);
      } else {
        this.checked = false;
        this.model.SELECTED_SAME_ADDRESS = 0;
      }
    },
    // toggleSameAddress(checked) {
    //   if (this.model.SELECTED_SAME_ADDRESS === true) {
    //     const data = this.$refs.addressCorrespondent.getDataToSave();
    //     this.$refs.addressPermanent.updateInputs(data);
    //   }
    // },
    getDataToSave() {
      const correspondent = this.$refs.addressCorrespondent;
      const permanent = this.$refs.addressPermanent;
      const data = {
        SELECTED_SAME_ADDRESS: this.model.SELECTED_SAME_ADDRESS,
        CONSULTANT_CORRESPONDENT_COUNTRY: correspondent.model.country,
        CONSULTANT_CORRESPONDENT_STATE: correspondent.model.state,
        CONSULTANT_CORRESPONDENT_CITY: correspondent.model.city,
        CONSULTANT_CORRESPONDENT_POSTAL: correspondent.model.postcode,
        CONSULTANT_CORRESPONDENT_POSTAL_VALUE:correspondent.model.postcode_value,
        CONSULTANT_CORRESPONDENT_ADDR1: correspondent.model.address_1,
        CONSULTANT_CORRESPONDENT_ADDR2: correspondent.model.address_2,
        CONSULTANT_CORRESPONDENT_ADDR3: correspondent.model.address_3,

        CONSULTANT_PERMANENT_COUNTRY: permanent.model.country,
        CONSULTANT_PERMANENT_STATE: permanent.model.state,
        CONSULTANT_PERMANENT_CITY: permanent.model.city,
        CONSULTANT_PERMANENT_POSTAL: permanent.model.postcode,
        CONSULTANT_PERMANENT_POSTAL_VALUE: permanent.model.postcode_value,
        CONSULTANT_PERMANENT_ADDR1: permanent.model.address_1,
        CONSULTANT_PERMANENT_ADDR2: permanent.model.address_2,
        CONSULTANT_PERMANENT_ADDR3: permanent.model.address_3,
      };
      console.log('address: ', data)
      return data;
    },
  },

  created() {
    // const vm = this;
    // this.model = _.cloneDeep(this.personal_particulars);
    // console.log("personal particular data ", this.personal_particulars);
    if(this.savedConsultantData){
        this.model = _.cloneDeep(this.savedConsultantData);
    }
    if(this.model.CONSULTANT_CORRESPONDENT_COUNTRY){
      this.model.CONSULTANT_CORRESPONDENT_COUNTRY = this.model.CONSULTANT_CORRESPONDENT_COUNTRY;
    }else{
      this.model.CONSULTANT_CORRESPONDENT_COUNTRY = 33; //SETTING_GENERAL_ID for Country Malaysia
    }
    this.isChecked();
  },
};
</script>

<style></style>

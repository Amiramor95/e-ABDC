<template>
  <div class="row mt-4">
    <div class="col-xs-12 col-md-8">
      <personal-info
        ref="personalInfo"
        :savedConsultantData="savedConsultantData"
        :personal_particulars="personal_particulars"
        :general_settings="general_settings"
      ></personal-info>
      <personal-education
        ref="personalEducation"
        :savedConsultantData="savedConsultantData"
        :savedConsultantEducationData="savedConsultantData.consultant_education"
        :consultantQualificationDatas="savedConsultantData.educational_qualifications"
        :consultantCreditSubject="savedConsultantData.credit_subjects"
        :personal_particulars="personal_particulars"
        :general_settings="general_settings"
        :qualification="general_settings.CONSULTANT_QUALIFICATIONS"
        class="mt-5"
      ></personal-education>
      <personal-addresses
        ref="personalAddresses"
        :savedConsultantData="savedConsultantData"
        :personal_particulars="personal_particulars"
        :general_settings="general_settings"
        class="mt-5"
      ></personal-addresses>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import PersonalInfo from "./personal-particulars/personal_info";
import PersonalEducation from "./personal-particulars/education";
import PersonalAddresses from "./personal-particulars/addresses";

export default {
  name: "form-personal-particulars",
  components: {
    PersonalInfo,
    PersonalEducation,
    PersonalAddresses,
  },
  data() {
    return {

    };
  },
  computed: {
    ...mapState({
      personal_particulars: (state) => state.consultant.applicant_details,
      general_settings: (state) => state.consultant.general_settings,
    }),

    //  objectifyObserver(observer) {
    //     var object = JSON.parse(JSON.stringify(observer));
    //     return object;
    //   },
  },
  props: {
    // The parameters the component accepts
    savedConsultantData: Object,
  },
  // props: [ 'savedConsultantData'],
  methods: {
    validateFirstTab() {
      var refToValidate = this.$refs.personalInfo;
      return refToValidate.validateFirstTab();
    },

    getDataToSave() {
      // console.log(this.$refs.personalInfo)
      const personal_info = this.$refs.personalInfo.getDataToSave();
      const personal_education = this.$refs.personalEducation.getDataToSave();
      const addresses = this.$refs.personalAddresses.getDataToSave();

      let dataToSave = {
        ...personal_info,
        ...addresses,
        ...personal_education,
      };
      return dataToSave;
    },

    uploadProfileNric(){
      this.$refs.personalInfo.uploadProfilePhoto();
      this.$refs.personalInfo.uploadNricPassportPhoto();
    },

    saveConsultantEducationDatas(){
      this.$refs.personalEducation.saveConsultantQualification();
      //this.$refs.personalEducation.saveConsultantQualificationDocument();
      this.$refs.personalEducation.saveConsultantEducation();
    }
  },
  created() {
    console.log("props observed on form personal (2nd component )");
    console.log("this.savedConsultantData");
    console.log(this.savedConsultantData);
    console.log("this.savedConsultantData.consultant_education");
    console.log(this.savedConsultantData.consultant_education);
  },
  updated() {
    // alert('props data');
    // console.log(savedConsultantData);
    // alert('props data');
    // const vm = this;
    // Event.$on("CONSULTANT:SAVE_DATA", function () {
    //   //if event is triggered
    //   alert("save as draft on personal particulars triggered");
    //   vm.getDataToSave();
    //   //sate should be maintained and form should be binded with state
    // });
  },
};
</script>

<style scoped>
.form-group.required > label:after {
  content: "*";
  font-weight: 400;
  color: red;
  padding-left: 0.2 em;
  font-size: 1em;
}
</style>

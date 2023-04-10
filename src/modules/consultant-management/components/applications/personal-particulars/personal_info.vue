<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <b-form-group
          class="required"
          id="fieldset-1"
          label="Applicant Name"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            class="text-uppercase"
            v-model="model.CONSULTANT_NAME"
            placeholder="Enter your name"
            :state="validateName('CONSULTANT_NAME')"
            aria-describedby="name-required-msg"
          ></b-form-input>

          <b-form-invalid-feedback id="name-required-msg">
            Please enter your full name.
          </b-form-invalid-feedback>
        </b-form-group>

        <div class="row">
          <div class="col-xl-3 p-0">
              <b-form-group
                label="Profile photo:"
                label-for="profile-photo"
                class="required"
              >
                <!-- <b-form-file
                  id="profile-photo"
                  placeholder="Choose a file or drop it here."
                  accept="image/jpeg, image/png, image/gif"
                  @change="onFileChange"
                ></b-form-file> -->

                <!-- <input type="file" name="profile-pic" class="form-control" id="profile-pic" @change="onFileChange"> -->

                <vue-form-generator
                  :model="model2"
                  :schema="fileUploadSchema1"
                  :options="formOptions"
                  ref="fileUploadForm1"
                >
                </vue-form-generator>
              </b-form-group>
          </div>
        </div>

        <!-- <div class="profile-image">
          <img :src="model.FILE_PROFILE_PHOTO" class="img-fluid image-circle" />
        </div> -->

        <!-- <b-form-group
          label="Profile photo:"
          label-for="profile-photo"
          description="Upload passport size photo"
          class="required"
        >
          <b-form-file
            id="profile-photo"
            v-model="model.FILE_PROFILE_PHOTO"
            class
            placeholder="Choose a file or drop it here."
            accept="image/jpeg, image/png, image/gif"
            :state="profiePhotoValidation"
          ></b-form-file>
        </b-form-group> -->

        <hr />

        <b-form-group
          label="Citizenship"
          class="required"
          label-for="radio-citizenship"
        >
          <b-form-radio-group
            id="radio-citizenship"
            v-model="model.CONSULTANT_CITIZEN"
            :options="general_settings.CITIZENSHIPS"
            name="radio-citizenship"
            value-field="SETTING_GENERAL_ID"
            text-field="SET_PARAM"
            :state="consultantCitizenValidation"
          ></b-form-radio-group>
        </b-form-group>


        <div v-if="selected_citizenship_state">
          <!-- <div
            class
            id="malaysian"
            v-if="selected_citizenship_state.SET_PARAM == 'MALAYSIAN'"
          > -->
          <div
            class
            id="malaysian"
            v-if="model.CONSULTANT_CITIZEN==286"
          >
            <b-form-group
              class="required col-md-6 pl-0"
              id="fieldset-ic-number-new"
              label="New NRIC Number"
              label-for="input-ic-number"
            >
              <b-form-input
                id="input-ic-number-new"
                placeholder="Enter new NRIC number"
                v-mask="'######-##-####'"
                :masked="false"
                v-model="model.CONSULTANT_NRIC"
                :state="newNricValidation"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              class="col-md-6"
              id="fieldset-ic-number"
              label="Old NRIC Number"
              label-for="input-ic-number-old"
            >
              <b-form-input
                id="input-ic-number-old"
                placeholder="Enter old NRIC number"
                v-model="model.CONSULTANT_NRIC_OLD"
              ></b-form-input>
            </b-form-group>

            <div class="row mt-3">
              <b-form-group
                class="required col-lg-6 pl-0"
                label="Upload NRIC Photo (Front)"
                description
              >
                <!-- <b-form-file
                  v-model="model.FILE_CONSULTANT_NRIC_PHOTO"
                  placeholder="Choose a file or drop it here."
                  accept=".jpg, .jpeg, .png, .gif, .pdf, .doc, .docx"
                ></b-form-file>
                <div class="mt-2">
                  <file-viewer
                    :file_id="model.CONSULTANT_NRIC_PHOTO"
                  ></file-viewer>
                </div> -->
                 <vue-form-generator
                  :model="model2"
                  :schema="fileUploadSchema2"
                  :options="formOptions"
                  ref="fileUploadForm2"
                >
                </vue-form-generator>
              </b-form-group>

              <b-form-group
                class="col-lg-6 required pr-0"
                label="Upload NRIC Photo (Back)"
                description
              >
                <!-- <b-form-file
                  v-model="model.FILE_CONSULTANT_NRIC_PHOTO_BACK"
                  placeholder="Choose a file or drop it here."
                  accept=".jpg, .jpeg, .png, .gif, .pdf, .doc, .docx"
                ></b-form-file>
                <div class="mt-2">
                  <file-viewer
                    :file_id="model.CONSULTANT_NRIC_PHOTO_BACK"
                  ></file-viewer>
                </div> -->
                <vue-form-generator
                  :model="model2"
                  :schema="fileUploadSchema3"
                  :options="formOptions"
                  ref="fileUploadForm3"
                >
                </vue-form-generator>
              </b-form-group>
            </div>
          </div>

          <div
            class
            id="non-malaysian"
            v-if="model.CONSULTANT_CITIZEN==287"
          >
            <div class="row mt-0">
              <b-form-group
                class="required col-md-6 pl-0"
                id="fieldset-passport-number"
                label="Passport Number"
                label-for="input-passport-number"
              >
                <b-form-input
                  id="input-passport-number"
                  placeholder="Enter your passport number"
                  type="number"
                  v-model="model.CONSULTANT_PASSPORT_NO"
                ></b-form-input>
              </b-form-group>

              <b-form-group
                class="required col-md-6"
                id="fieldset-passport-expiry-date"
                label="Passport Expiry Date"
                label-for="input-passport-expiry-date"
              >
                <datepicker
                  id="input-passport-expiry-date"
                  placeholder="dd-MM-yyyy"
                  format="dd-MMM-yyyy"
                  input-class="form-control bgcolor"
                  :typeable="false"
                  v-model="model.CONSULTANT_PASSPORT_EXPIRY_NO"
                ></datepicker>
              </b-form-group>

              <b-form-group
                label="Upload Passport photo:"
                label-for="passport-photo"
                class="required"
              >
                <vue-form-generator
                  :model="model2"
                  :schema="fileUploadSchema4"
                  :options="formOptions"
                  ref="fileUploadForm4"
                >
                </vue-form-generator>
              </b-form-group>
            </div>
          </div>
        </div>

        <hr />

        <div>
          <b-form-group
            label="Gender"
            class="required col-md-6 pl-0"
            label-for="radio-gender"
          >
            <b-form-radio-group
              id="radio-gender"
              v-model="model.CONSULTANT_GENDER"
              :options="general_settings.GENDERS"
              name="radio-options"
              value-field="SETTING_GENERAL_ID"
              text-field="SET_PARAM"
            ></b-form-radio-group>
          </b-form-group>

          <b-form-group
            class="required col-md-6"
            id="fieldset-passport-expiry-date"
            label="Date of Birth (required)"
            label-for="input-birth-date"
            :state="validateDOB('CONSULTANT_DOB')"
            aria-describedby="dob-required-msg"
          >
            <datepicker
              id="input-birth-date"
              placeholder="dd-MM-yyyy"
              format="dd-MMM-yyyy"
              input-class="form-control bgcolor col-md-12"
              :typeable="false"
              v-model="model.CONSULTANT_DOB"
            ></datepicker>

            <b-form-invalid-feedback id="dob-required-msg">
                Please enter Date of Birth. Age should be greater than 21 years.
            </b-form-invalid-feedback>
          </b-form-group>
        </div>

        <!-- Race -->
        <div class="row">
          <b-form-group
            label="Race:"
            label-for="race-category"
            description
            class="col-md-6 required pl-0"
            value-field="SETTING_GENERAL_ID"
          >
            <b-form-select
              v-model="model.CONSULTANT_RACE"
              class="form-group bgcolor mb-0"
              :state="validateRace('CONSULTANT_RACE')"
              aria-describedby="race-required-msg"
            >
              <template>
                <option
                  v-for="race in general_settings.RACES"
                  v-bind:key="race.SETTING_GENERAL_ID"
                  :value="race.SETTING_GENERAL_ID"
                >
                  {{ race.SET_PARAM }}
                </option>
              </template>
            </b-form-select>

            <b-form-invalid-feedback id="race-required-msg">
              Please select race.
            </b-form-invalid-feedback>
          </b-form-group>

          <div v-if="model.CONSULTANT_RACE" class="col-md-6">
            <b-form-group
              v-if="model.CONSULTANT_RACE == 293"
              class="required"
              id="fieldset-race-other"
              label="Other Race"
              label-for="input-race-other"
            >
              <b-form-input
                id="input-race-other"
                placeholder="Please specify"
                trim
                v-model="model.CONSULTANT_OTHER_RACE"
              ></b-form-input>
            </b-form-group>
          </div>
        </div>

        <!--  Phone number -->
        <div class="row">
          <b-form-group
            class="col-md-6 required pl-0"
            id="fieldset-phone-mobile"
            label="Mobile Phone Number"
            label-for="input-phone-mobile"
          >
            <b-form-input
              id="input-phone-mobile"
              v-mask="'###-########'"
              :masked="false"
              placeholder="Please specify"
              v-model="model.CONSULTANT_MOBILE_NO"
              :state="validateMobileNumber('CONSULTANT_MOBILE_NO')"
              aria-describedby="mobile-required-msg"
            ></b-form-input>

            <b-form-invalid-feedback id="mobile-required-msg">
              Please enter your mobile phone number.
            </b-form-invalid-feedback>
          </b-form-group>

          <b-form-group
            class="col-md-6"
            id="fieldset-house-number"
            label="House Number"
            label-for="input-house-number"
          >
            <b-form-input
              id="input-house-number"
              placeholder="Please specify"
              v-mask="'##-#########'"
              :masked="false"
              v-model="model.CONSULTANT_HOUSE_NO"
            ></b-form-input>
          </b-form-group>
        </div>

        <div class="row">
          <b-form-group
            class="col-md-6 required pl-0"
            id="fieldset-email"
            label="Email"
            label-for="input-email"
          >
            <b-form-input
              v-model="model.CONSULTANT_EMAIL"
              id="input-email"
              :state="consultantEmailValidation"
              placeholder="Please specify"
              trim
            ></b-form-input>
          </b-form-group>
        </div>
      </div>
    </div>

    <b-modal v-model="validateDobDate" centered title="">
      <div class="d-block text-center">
          <h5>Your age is less than 21 years.</h5>
          <h5>Sorry, You cannot proceed to further Registration Process.</h5>
      </div>
      <template #modal-footer="{ ok }">
        <b-button size="sm" variant="success" @click="ok()">
          OK
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import moment from "moment";
import FileViewer from "@/modules/consultant-management/components/ui/file_viewer";
import * as AuthenticatedUserAPI from "../../../services/auth";
import _ from "lodash";

import { validationMixin } from "vuelidate";
import { required } from 'vuelidate/lib/validators';
import * as services02module2 from "../../../../../app/module2/services02";

export default {
  mixins: [validationMixin],
  name: "personal-info",

  props: {
    // parameters the component accepts
    personal_particulars: Object,
    general_settings: Object,
    savedConsultantData: Object,
  },

  components: {
    FileViewer,
  },

  computed: {
    // all for data population
    setCitizenshipParam() {
      if (this.model.CONSULTANT_CITIZEN == 288) {
        this.selected_citizenship_state.SET_PARAM == "MALAYSIAN";
      } else {
        this.selected_citizenship_state.SET_PARAM == "NON-MALAYSIAN";
      }
    },
    // setConsultantRace() {
    //   this.model.CONSULTANT_RACE = this.general_settings.RACES.find(
    //     (item) => item.SETTING_GENERAL_ID === this.model.CONSULTANT_RACE
    //   );
    // },

    //all for validations
    newNricValidation() {
      if (this.model.CONSULTANT_NRIC) {
        return this.isValid(this.model.CONSULTANT_NRIC);
      }
      return false;
    },
    consultantPassportValidation() {
      if (this.model.CONSULTANT_PASSPORT_NO) {
        return this.isNricOrPassportNoValid(this.model.CONSULTANT_PASSPORT_NO);
      }
      return false;
    },

    consultantCitizenValidation() {
      if (this.model.CONSULTANT_CITIZEN) {
        return true;
      } else {
        return false;
      }
    },

    passportExpiryDateValidaiton() {
      if (this.model.CONSULTANT_PASSPORT_EXPIRY_NO) {
        return true;
      } else {
        return false;
      }
    },

    consultantDOBValidation() {
      if (this.model.CONSULTANT_DOB) {
        return true;
      } else {
        return false;
      }
    },
    consultantRaceValidation() {
      if (this.model.CONSULTANT_RACE) {
        return true;
      } else {
        return false;
      }
    },
    consultantMobilenoValidation() {
      // return true;
      if (this.model.CONSULTANT_MOBILE_NO) {
        return true;
      } else {
        return false;
      }
    },
    consultantEmailValidation() {
      if (this.model.CONSULTANT_EMAIL) {
        return true;
      } else {
        return false;
      }

      // if (this.model.CONSULTANT_EMAIL) {
      //   return this.isValidEmail(this.model.CONSULTANT_EMAIL);
      // } else {
      //   return false;
      // }
    },

    // ------------------------------

    // Workaround to get selected citizenship by SET_PARAMS because SETTING_GENERAL_ID can be different in database
    selected_citizenship_state() {
      const citizenship_options = this.general_settings.CITIZENSHIPS;
      const item = citizenship_options.find(
        (item) => item.SETTING_GENERAL_ID === this.model.CONSULTANT_CITIZEN
      );
      return item;
    },
    selected_race_state() {
      const races_options = this.general_settings.RACES;
      const item = races_options.find(
        (item) => item.SETTING_GENERAL_ID === this.model.CONSULTANT_RACE
      );
      return item;
    },
  },

  watch: {
    "model.CONSULTANT_NRIC": function (val) {
      // console.log("dob :" + this.model.CONSULTANT_DOB);
      if (val.substr(11, 1) != "") {
        // console.log("last character :" + val.substr(11, 1));
        var Year = val.substring(0, 2);
        var Month = val.substring(2, 4);
        var Day = val.substring(4, 6);

        var cutoff = new Date().getFullYear() - 2000;
        //console.log("Cutoff:" + cutoff);

        var dob = (Year > cutoff ? "19" : "20") + Year + "-" + Month + "-" + Day;
        //console.log("Converted dob :" + dob);
        this.model.CONSULTANT_DOB = dob;
        // console.log((Year > cutoff ? "19" : "20") + Year);
        const yearBirth = (Year > cutoff ? "19" : "20") + Year;
        if (parseInt(yearBirth) <= 1970) {
          // console.log("1970 and below");
          // this.visibleOldIc = true;
        } else {
          // console.log("above");
          // this.visibleOldIc = false;
        }
        if (parseInt(val.substr(11, 1)) % 2 == 0) {
          // console.log("The number is even. Female");
          this.model.CONSULTANT_GENDER = 289;
        } else {
          // console.log("The number is odd. Male");
          this.model.CONSULTANT_GENDER = 288;
        }
      }
    },

    "model.CONSULTANT_DOB": function (val) {
      var date1 = moment(this.current_date, "YYYY-MM-DD");
      var date2 = moment(this.model.CONSULTANT_DOB, "YYYY-MM-DD");
      var date_diff = moment.duration(date1.diff(date2)).asYears();
      console.log('DOB', date_diff);
      if(date_diff <= 21){
        this.validateDobDate = true;
        this.model.CONSULTANT_DOB = '';
      }
    },
  },


  data() {
    return {
      current_date: new Date(),
      validateDobDate: false,
      default_image: null,
      // personal_particulars_data: this.savedConsultantData,

      model: {
        // Other user data to maintain db //
        USER_ID: "",
        KEYCLOAK_ID: "",

        CONSULTANT_NAME: "",
        FILE_PROFILE_PHOTO: "",
        CONSULTANT_PROFILE_PHOTO: "",
        CONSULTANT_CITIZEN: "",
        CONSULTANT_NRIC: "",
        CONSULTANT_PASSPORT_PHOTO: "",
        CONSULTANT_NRIC_OLD: "",
        CONSULTANT_NRIC_PHOTO: "",
        CONSULTANT_NRIC_PHOTO_BACK: "",
        CONSULTANT_PASSPORT_NO: "",
        CONSULTANT_PASSPORT_EXPIRY_NO: "",
        CONSULTANT_PASSPORT_PHOTO: "",
        CONSULTANT_GENDER: "",
        CONSULTANT_DOB: "",
        CONSULTANT_RACE: "",
        CONSULTANT_OTHER_RACE: "",
        CONSULTANT_MOBILE_NO: "",
        CONSULTANT_PHONENO: "",
        CONSULTANT_EMAIL: "",
        CONSULTANT_HOUSE_NO: "",
      },

      model2: {
        CONSULTANT_PROFILE_PHOTO: [],
        CONSULTANT_NRIC_PHOTO: [],
        CONSULTANT_NRIC_PHOTO_BACK: [],
        CONSULTANT_PASSPORT_PHOTO: [],
      },

      formOptions: {
        validateAfterChanged: true
      },

      fileUploadSchema1: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                //accept: ".jpeg,.png",
                theme: "grid",
                multiple: false,
                text: "Upload passport size photo",
                model: "CONSULTANT_PROFILE_PHOTO",
                type: "vfg-consultant-custom-multiple-file",
                styleClasses: "col-md-10",
                required: false,
                hint: "Accepted format : (.jpeg,.png)"
              }
            ]
          }
        ]
      },

      fileUploadSchema2: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                //accept=".jpeg,.png,.pdf",
                theme: "list",
                multiple: false,
                text: 'Choose a File',
                model: 'CONSULTANT_NRIC_PHOTO',
                type: 'vfg-consultant-custom-multiple-file',
                required: false,
                hint: "Accepted format : (.jpeg,.png,.pdf)"
              },
            ]
          }
        ]
      },

      fileUploadSchema3: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                //accept=".jpeg,.png,.pdf",
                theme: "list",
                multiple: false,
                text: 'Choose a File',
                model: 'CONSULTANT_NRIC_PHOTO_BACK',
                type: 'vfg-consultant-custom-multiple-file',
                required: false,
                hint: "Accepted format : (.jpeg,.png,.pdf)"
              },
            ]
          }
        ]
      },

      fileUploadSchema4: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                //accept=".jpeg,.png,.pdf",
                theme: "list",
                multiple: false,
                text: 'Choose a File',
                model: 'CONSULTANT_PASSPORT_PHOTO',
                type: 'vfg-consultant-custom-multiple-file',
                required: false,
                hint: "Accepted format : (.jpeg,.png,.pdf)"
              },
            ]
          }
        ]
      },
    };
  },

  validations: {
    model: {
      CONSULTANT_NAME: { required },
      CONSULTANT_EMAIL: { required },
      //CONSULTANT_NRIC: { required },
      CONSULTANT_DOB: { required },
      CONSULTANT_MOBILE_NO: { required },
      CONSULTANT_RACE: { required }
    }
  },

  methods: {
    onFileChange(e) {
      this.model.CONSULTANT_PROFILE_PHOTO = e.target.files[0];
      // const file = e.target.files[0];
      // this.model.CONSULTANT_PROFILE_PHOTO = URL.createObjectURL(file);
      console.log('File uploaded', this.model.CONSULTANT_PROFILE_PHOTO.name)
    },

    //Form Data Validations
    validateFirstTab() {
      //console.log('$v Checking', this.$v.model);
      // if (this.$v.model.CONSULTANT_NAME.$invalid === true){
      //     return false;
      // }else{
      //     return true;
      // }

      this.$v.model.$touch();
      if (this.$v.model.$anyError) {
        return;
      }else{
        return true;
      }
    },

    validateName(CONSULTANT_NAME) {
      const { $dirty, $error } = this.$v.model[CONSULTANT_NAME];
      return $dirty ? !$error : null;
    },

    validateDOB(CONSULTANT_DOB){
      const { $dirty, $error } = this.$v.model[CONSULTANT_DOB];
      return $dirty ? !$error : null;
    },

    validateRace(CONSULTANT_RACE){
      const { $dirty, $error } = this.$v.model[CONSULTANT_RACE];
      return $dirty ? !$error : null;
    },

    validateMobileNumber(CONSULTANT_MOBILE_NO){
      const { $dirty, $error } = this.$v.model[CONSULTANT_MOBILE_NO];
      return $dirty ? !$error : null;
    },

    //newly edited
    isValid(string) {
      return string.length > 4 ? true : false; //your validation criteria goes here
    },
    isRequiredValid(string) {
      return string.length > 0 ? true : false; //your validation criteria goes here
    },
    isNricOrPassportNoValid(string) {
      return string.length > 5 ? true : false; //your validation criteria goes here
    },
    isValidEmail(email) {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
      // var mailformat = /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/;
      // if (email.value.match(mailformat)) {
      //   return true;
      // } else {
      //   return false;
      // }
    },
    async fetchUserDetails() {
      try {
        const authUser = await AuthenticatedUserAPI.me();

        this.model.USER_ID = authUser.data.user.USER_ID;
        this.model.KEYCLOAK_ID = authUser.data.user.KEYCLOAK_ID;

        this.model.CONSULTANT_EMAIL = authUser.data.email;
        // this.model.CONSULTANT_MOBILE_NO = authUser.data.user.USER_MOBILE_NUM;
        // this.model.CONSULTANT_NRIC = authUser.data.user.USER_NRIC;
        // this.model.CONSULTANT_NRIC_OLD = authUser.data.user.USER_NRIC_OLD;
        // this.model.CONSULTANT_PASSPORT_NO = authUser.data.user.USER_PASS_NUM;
        // this.model.USER_PASS_EXP = authUser.data.user.USER_PASS_EXP;
      } catch (error) {
        console.log(error);
      }
    },
    onClickButton(event) {
      this.$emit("clicked", "someValue");
    },

    onRaceSelected(item) {
      //this.model.CONSULTANT_RACE = item.SETTING_GENERAL_ID;
      // alert("consultant race id : " + this.model.CONSULTANT_RACE);
    },

    getDataToSave() {
      // console.log("PERSONAL_INFO :: populateDataToSave");
      let dataToSave = {
        CONSULTANT_NAME: this.model.CONSULTANT_NAME,
        CONSULTANT_PROFILE_PHOTO: this.model.CONSULTANT_PROFILE_PHOTO,
        //CONSULTANT_PROFILE_PHOTO: this.model.CONSULTANT_PROFILE_PHOTO.name,
        CONSULTANT_CITIZEN: this.model.CONSULTANT_CITIZEN,
        CONSULTANT_NRIC: this.model.CONSULTANT_NRIC,
        CONSULTANT_NRIC_OLD: this.model.CONSULTANT_NRIC_OLD,
        CONSULTANT_PASSPORT_NO: this.model.CONSULTANT_PASSPORT_NO,
        CONSULTANT_PASSPORT_EXPIRY_NO: this.model.CONSULTANT_PASSPORT_EXPIRY_NO,
        CONSULTANT_NRIC_PHOTO: this.model.CONSULTANT_NRIC_PHOTO,
        CONSULTANT_NRIC_PHOTO_BACK: this.model.CONSULTANT_NRIC_PHOTO_BACK,
        CONSULTANT_GENDER: this.model.CONSULTANT_GENDER,
        CONSULTANT_DOB: this.model.CONSULTANT_DOB,
        CONSULTANT_RACE: this.model.CONSULTANT_RACE,
        CONSULTANT_OTHER_RACE: this.model.CONSULTANT_OTHER_RACE,
        CONSULTANT_MOBILE_NO: this.model.CONSULTANT_MOBILE_NO,
        CONSULTANT_PHONENO: this.model.CONSULTANT_PHONENO,
        CONSULTANT_EMAIL: this.model.CONSULTANT_EMAIL,
        CONSULTANT_HOUSE_NO: this.model.CONSULTANT_HOUSE_NO,
      };
      return dataToSave;
    },

    //Upload Consultant Profile Photo and NRIC
    uploadProfilePhoto: async function() {
      const data = new FormData();
      data.append("CONSULTANT_ID", this.savedConsultantData.CONSULTANT_ID);
      data.append("TABLE_NAME", 'CONSULTANT_PROFILE_PHOTO');
      data.append("FIELD_NAME", 'CONSULTANT_PROFILE_PHOTO');
      for (let i = 0; i < this.model2.CONSULTANT_PROFILE_PHOTO.length; i++) {
        data.append("FILE[]", this.model2.CONSULTANT_PROFILE_PHOTO[i]);
      }

      //await services02module2.uploadConsultantDocuments(data);
      services02module2.uploadConsultantDocuments(data);
    },

    //Upload Consultant NRIC of PassPortPhoto
    uploadNricPassportPhoto(){
      if(this.model.CONSULTANT_CITIZEN==286){
        this.uploadNricFront();
        this.uploadNricBack();
      }else{
        this.uploadPasportPhoto();
      }
    },

    uploadNricFront: async function() {
      const data = new FormData();
      data.append("CONSULTANT_ID", this.savedConsultantData.CONSULTANT_ID);
      data.append("TABLE_NAME", 'CONSULTANT_NRIC_PHOTO_FRONT');
      data.append("FIELD_NAME", 'CONSULTANT_NRIC_PHOTO_FRONT');
      for (let i = 0; i < this.model2.CONSULTANT_NRIC_PHOTO.length; i++) {
        data.append("FILE[]", this.model2.CONSULTANT_NRIC_PHOTO[i]);
      }

      services02module2.uploadConsultantDocuments(data);
    },

    uploadNricBack: async function() {
      const data = new FormData();
      data.append("CONSULTANT_ID", this.savedConsultantData.CONSULTANT_ID);
      data.append("TABLE_NAME", 'CONSULTANT_NRIC_PHOTO_BACK');
      data.append("FIELD_NAME", 'CONSULTANT_NRIC_PHOTO_BACK');
      for (let i = 0; i < this.model2.CONSULTANT_NRIC_PHOTO_BACK.length; i++) {
        data.append("FILE[]", this.model2.CONSULTANT_NRIC_PHOTO_BACK[i]);
      }

      services02module2.uploadConsultantDocuments(data);
    },

    uploadPasportPhoto: async function() {
      const data = new FormData();
      data.append("CONSULTANT_ID", this.savedConsultantData.CONSULTANT_ID);
      data.append("TABLE_NAME", 'CONSULTANT_PASSPORT_PHOTO');
      data.append("FIELD_NAME", 'CONSULTANT_PASSPORT_PHOTO');
      for (let i = 0; i < this.model2.CONSULTANT_PASSPORT_PHOTO.length; i++) {
        data.append("FILE[]", this.model2.CONSULTANT_PASSPORT_PHOTO[i]);
      }

      services02module2.uploadConsultantDocuments(data);
    },


    onSubmit: function () {
      console.log("Form has been submitted!");
    },

    getProfilePhoto: async function() {
      const response = await services02module2.getConsultantDocuments(this.savedConsultantData.CONSULTANT_ID, 'CONSULTANT_PROFILE_PHOTO');
      response.forEach(el => {
        if(el.DOC_MIMETYPE=="image/jpeg"){
          el.DOC_BLOB = this.b64toBlobPDF(el.DOC_BLOB, "image/jpeg");
        }else if(el.DOC_MIMETYPE=="image/png"){
          el.DOC_BLOB = this.b64toBlobPDF(el.DOC_BLOB, "image/png");
        }

        el.DOC_BLOB = new File(
          [el.DOC_BLOB],
          //el.DOC_ORIGINAL_NAME + "." + el.DOC_FILETYPE,
          el.DOC_ORIGINAL_NAME,
          {
            type: el.DOC_BLOB.type
          }
        );

        const data = {
          docID: el.CA_DOCUMENT_ID,
          name: el.DOC_ORIGINAL_NAME,
          size: el.DOC_FILESIZE,
          type: el.DOC_FILETYPE,
          ext: "exe",
          url: window.URL.createObjectURL(el.DOC_BLOB)
        };

        this.model2.CONSULTANT_PROFILE_PHOTO.push(data);
      });
    },

    getNricFrontDoc: async function() {
      const response = await services02module2.getConsultantDocuments(this.savedConsultantData.CONSULTANT_ID, 'CONSULTANT_NRIC_PHOTO_FRONT');
      response.forEach(el => {
        if(el.DOC_MIMETYPE=="image/jpeg"){
          el.DOC_BLOB = this.b64toBlobPDF(el.DOC_BLOB, "image/jpeg");
        }else if(el.DOC_MIMETYPE=="image/png"){
          el.DOC_BLOB = this.b64toBlobPDF(el.DOC_BLOB, "image/png");
        }else if(el.DOC_MIMETYPE=="application/pdf"){
          el.DOC_BLOB = this.b64toBlobPDF(el.DOC_BLOB, "application/pdf");
        }else{
          el.DOC_BLOB = this.b64toBlobPDF(el.DOC_BLOB, "application/pdf");
        }

        el.DOC_BLOB = new File(
          [el.DOC_BLOB],
          //el.DOC_ORIGINAL_NAME + "." + el.DOC_FILETYPE,
          el.DOC_ORIGINAL_NAME,
          {
            type: el.DOC_BLOB.type
          }
        );

        const data = {
          docID: el.CA_DOCUMENT_ID,
          name: el.DOC_ORIGINAL_NAME,
          size: el.DOC_FILESIZE,
          type: el.DOC_FILETYPE,
          ext: "exe",
          url: window.URL.createObjectURL(el.DOC_BLOB)
        };

        this.model2.CONSULTANT_NRIC_PHOTO.push(data);
      });
    },

    getPassportPhoto: async function() {
      const response = await services02module2.getConsultantDocuments(this.savedConsultantData.CONSULTANT_ID, 'CONSULTANT_PASSPORT_PHOTO');
      response.forEach(el => {
        if(el.DOC_MIMETYPE=="image/jpeg"){
          el.DOC_BLOB = this.b64toBlobPDF(el.DOC_BLOB, "image/jpeg");
        }else if(el.DOC_MIMETYPE=="image/png"){
          el.DOC_BLOB = this.b64toBlobPDF(el.DOC_BLOB, "image/png");
        }else if(el.DOC_MIMETYPE=="application/pdf"){
          el.DOC_BLOB = this.b64toBlobPDF(el.DOC_BLOB, "application/pdf");
        }else{
          el.DOC_BLOB = this.b64toBlobPDF(el.DOC_BLOB, "application/pdf");
        }

        el.DOC_BLOB = new File(
          [el.DOC_BLOB],
          //el.DOC_ORIGINAL_NAME + "." + el.DOC_FILETYPE,
          el.DOC_ORIGINAL_NAME,
          {
            type: el.DOC_BLOB.type
          }
        );

        const data = {
          docID: el.CA_DOCUMENT_ID,
          name: el.DOC_ORIGINAL_NAME,
          size: el.DOC_FILESIZE,
          type: el.DOC_FILETYPE,
          ext: "exe",
          url: window.URL.createObjectURL(el.DOC_BLOB)
        };

        this.model2.CONSULTANT_PASSPORT_PHOTO.push(data);
      });
    },

    getNricBackDoc: async function() {
      const response = await services02module2.getConsultantDocuments(this.savedConsultantData.CONSULTANT_ID, 'CONSULTANT_NRIC_PHOTO_BACK');
      response.forEach(el => {
        if(el.DOC_MIMETYPE=="image/jpeg"){
          el.DOC_BLOB = this.b64toBlobPDF(el.DOC_BLOB, "image/jpeg");
        }else if(el.DOC_MIMETYPE=="image/png"){
          el.DOC_BLOB = this.b64toBlobPDF(el.DOC_BLOB, "image/png");
        }else if(el.DOC_MIMETYPE=="application/pdf"){
          el.DOC_BLOB = this.b64toBlobPDF(el.DOC_BLOB, "application/pdf");
        }else{
          el.DOC_BLOB = this.b64toBlobPDF(el.DOC_BLOB, "application/pdf");
        }

        el.DOC_BLOB = new File(
          [el.DOC_BLOB],
          //el.DOC_ORIGINAL_NAME + "." + el.DOC_FILETYPE,
          el.DOC_ORIGINAL_NAME,
          {
            type: el.DOC_BLOB.type
          }
        );

        const data = {
          docID: el.CA_DOCUMENT_ID,
          name: el.DOC_ORIGINAL_NAME,
          size: el.DOC_FILESIZE,
          type: el.DOC_FILETYPE,
          ext: "exe",
          url: window.URL.createObjectURL(el.DOC_BLOB)
        };

        this.model2.CONSULTANT_NRIC_PHOTO_BACK.push(data);
      });
    },

    b64toBlobPDF(b64Data, contentType, sliceSize) {
      contentType = contentType || "";
      sliceSize = sliceSize || 512;

      var byteCharacters = atob(b64Data);
      var byteArrays = [];

      for (
        var offset = 0;
        offset < byteCharacters.length;
        offset += sliceSize
      ) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
      }

      return new File(byteArrays, "pot", { type: contentType });
    }
  },

  created() {
    // this.fetchUserDetails(); //newly edited
    // console.log("props observed on personal info (3rd) component");
    // console.log(this.savedConsultantData);
    if(this.savedConsultantData){
      this.model = _.cloneDeep(this.savedConsultantData);
    }

    this.getProfilePhoto();
    this.getNricFrontDoc();
    this.getNricBackDoc();
    this.getPassportPhoto();
  },
};
</script>

<style></style>

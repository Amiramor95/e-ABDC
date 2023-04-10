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
            v-model="model.CONSULTANT_NAME"
            placeholder="Enter your name"
          ></b-form-input>
        </b-form-group>
        <!-- </validation-provider> -->
        <b-form-group
          label="Profile photo:"
          label-for="profile-photo"
          description="Upload passport size photo"
          class="required"
        >
          <!-- Plain mode -->
          <b-form-file
            id="profile-photo"
            v-model="model.FILE_PROFILE_PHOTO"
            class=""
            placeholder="Choose a file or drop it here."
            accept="image/jpeg, image/png, image/gif"
          ></b-form-file>
        </b-form-group>

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
          ></b-form-radio-group>
        </b-form-group>

        <!-- {{model.CONSULTANT_CITIZEN}} -->
        <!-- {{selected_citizenship_state}} -->
        <!-- IC -->
        <div v-if="selected_citizenship_state">
          <div
            class=""
            id="malaysian"
            v-if="selected_citizenship_state.SET_PARAM == 'MALAYSIAN'"
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
                trim
                v-model="model.CONSULTANT_NRIC"
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
                trim
                v-model="model.CONSULTANT_NRIC_OLD"
              ></b-form-input>
            </b-form-group>

            <div class="row mt-3">
              <b-form-group
                class="col-md-6 pl-0"
                label="Upload NRIC Photo (Front):"
                description=""
              >
                <b-form-file
                  v-model="model.FILE_CONSULTANT_NRIC_PHOTO"
                  placeholder="Choose a file or drop it here."
                  accept=".jpg, .jpeg, .png, .gif, .pdf, .doc, .docx"
                ></b-form-file>
                <div class="mt-2">
                  <file-viewer
                    :file_id="model.CONSULTANT_NRIC_PHOTO"
                  ></file-viewer>
                </div>
              </b-form-group>

              <b-form-group
                class="col-md-6"
                label="Upload NRIC Photo (Back):"
                description=""
              >
                <b-form-file
                  v-model="model.FILE_CONSULTANT_NRIC_PHOTO_BACK"
                  placeholder="Choose a file or drop it here."
                  accept=".jpg, .jpeg, .png, .gif, .pdf, .doc, .docx"
                ></b-form-file>
                <div class="mt-2">
                  <file-viewer
                    :file_id="model.CONSULTANT_NRIC_PHOTO_BACK"
                  ></file-viewer>
                </div>
              </b-form-group>
            </div>
          </div>

          <div
            class=""
            id="non-malaysian"
            v-if="selected_citizenship_state.SET_PARAM == 'NON-MALAYSIAN'"
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
                  trim
                  v-model="model.CONSULTANT_PASSPORT_NO"
                  :state="consultantPassportValidation"
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
                  format="dd-MM-yyyy"
                  input-class="form-control bgcolor"
                  :typeable="false"
                  v-model="model.CONSULTANT_PASSPORT_EXPIRY_NO"
                ></datepicker>
              </b-form-group>

              <b-form-group
                label="Passport photo:"
                label-for="passport-photo"
                description="Upload passport photo"
                class="required"
              >
                <!-- Plain mode -->
                <b-form-file
                  id="passport-photo"
                  v-model="model.FILE_CONSULTANT_PASSPORT_PHOTO"
                  class=""
                  placeholder="Choose a file or drop it here."
                  accept="image/jpeg, image/png, image/gif"
                ></b-form-file>
                <div class="mt-2">
                  <file-viewer
                    :file_id="model.CONSULTANT_PASSPORT_PHOTO"
                  ></file-viewer>
                </div>
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
            label="Date of Birth"
            label-for="input-birth-date"
          >
            <datepicker
              id="input-birth-date"
              placeholder="dd-MM-yyyy"
              format="dd-MM-yyyy"
              input-class="form-control bgcolor"
              :typeable="false"
              v-model="model.CONSULTANT_DOB"
            ></datepicker>
          </b-form-group>
        </div>

        <!-- Race -->
        <div class="row">
          <b-form-group
            label="Race:"
            label-for="race-category"
            description=""
            class="col-md-6 required pl-0"
          >
            <multiselect
              id="race-category"
              v-model="selected_race"
              :options="general_settings.RACES"
              label="SET_PARAM"
              track-by="SETTING_GENERAL_ID"
              placeholder="Select a category"
              @select="onRaceSelected"
            >
            </multiselect>
          </b-form-group>

          <div v-if="selected_race" class="col-md-6">
            <b-form-group
              v-if="selected_race.SET_PARAM === 'OTHERS'"
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
              placeholder="Please specify"
              trim
              v-model="model.CONSULTANT_MOBILE_NO"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            class="col-md-6"
            id="fieldset-phone-house"
            label="House Phone Number"
            label-for="input-phone-house"
          >
            <b-form-input
              id="input-phone-house"
              placeholder="Please specify"
              trim
              v-model="model.CONSULTANT_PHONENO"
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
              placeholder="Please specify"
              trim
            ></b-form-input>
          </b-form-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FileViewer from "@/modules/consultant-management/components/ui/file_viewer";
import * as AuthenticatedUserAPI from "../../../services/auth";
import _ from "lodash";

export default {
  name: "personal-info",
  props: ["personal_particulars", "general_settings"],
  components: {
    FileViewer,
  },
  computed: {
    //all for validations
    consultantNameValidation() {
      if (this.model.CONSULTANT_NAME) {
        return this.isValid(this.model.CONSULTANT_NAME);
      }
      return null;
    },

    consultantPassportValidation() {
      if (this.model.CONSULTANT_PASSPORT_NO) {
        return this.isValid(this.model.CONSULTANT_PASSPORT_NO);
      }
      return null;
    },

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
        // console.log("year :" + cutoff);

        var dob =
          (Year > cutoff ? "19" : "20") + Year + "-" + Month + "-" + Day;
        this.model.CONSULTANT_DOB = dob;
        // console.log("dob :" + dob);
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
  },

  data() {
    return {
      model: {
        CONSULTANT_NAME: "",
        FILE_PROFILE_PHOTO: "",
        PROFILE_PHOTO: "",
        CONSULTANT_CITIZEN: "",
        CONSULTANT_NRIC: "",
        FILE_CONSULTANT_NRIC_PHOTO: "",
        CONSULTANT_PASSPORT_PHOTO: "",
        CONSULTANT_NRIC_OLD: "",
        CONSULTANT_NRIC_PHOTO: "",
        FILE_CONSULTANT_NRIC_PHOTO: "",
        CONSULTANT_NRIC_PHOTO_BACK: "",
        FILE_CONSULTANT_NRIC_PHOTO_BACK: "",
        CONSULTANT_PASSPORT_NO: "",
        CONSULTANT_PASSPORT_EXPIRY_NO: "",
        FILE_CONSULTANT_PASSPORT_PHOTO: "",
        CONSULTANT_PASSPORT_PHOTO: "",
        CONSULTANT_GENDER: "",
        CONSULTANT_DOB: "",
        CONSULTANT_RACE: "",
        CONSULTANT_OTHER_RACE: "",
        CONSULTANT_MOBILE_NO: "",
        CONSULTANT_PHONENO: "",
        CONSULTANT_EMAIL: "",
      },
    };
  },
  methods: {
    //newly edited
    async fetchUserDetails() {
      try {
        const authUser = await AuthenticatedUserAPI.me();
        this.model.CONSULTANT_EMAIL = authUser.data.email;
        this.model.CONSULTANT_MOBILE_NO = authUser.data.user.USER_MOBILE_NUM;
        this.model.CONSULTANT_NRIC = authUser.data.user.USER_NRIC;
        this.model.CONSULTANT_NRIC_OLD = authUser.data.user.USER_NRIC_OLD;
        this.model.CONSULTANT_PASSPORT_NO = authUser.data.user.USER_PASS_NUM;
        this.model.USER_PASS_EXP = authUser.data.user.USER_PASS_EXP;
      } catch (error) {
        console.log(error);
      }
    },
    onClickButton(event) {
      this.$emit("clicked", "someValue");
    },

    //old codes
    onRaceSelected(item) {
      this.model.CONSULTANT_RACE = item.SETTING_GENERAL_ID;
    },
    getDataToSave() {
      // console.log("PERSONAL_INFO :: populateDataToSave");
      let dataToSave = {
        CONSULTANT_NAME: this.model.CONSULTANT_NAME,
        CONSULTANT_CITIZEN: this.model.CONSULTANT_CITIZEN,
        CONSULTANT_NRIC: this.model.CONSULTANT_NRIC,
        CONSULTANT_NRIC_OLD: this.model.CONSULTANT_NRIC_OLD,
        CONSULTANT_PASSPORT_NO: this.model.CONSULTANT_PASSPORT_NO,
        CONSULTANT_PASSPORT_NO: this.model.CONSULTANT_PASSPORT_EXPIRY_NO,
        CONSULTANT_NRIC_PHOTO: this.file_CONSULTANT_NRIC_PHOTO,
        CONSULTANT_NRIC_PHOTO_BACK: this.file_CONSULTANT_NRIC_PHOTO_BACK,
        CONSULTANT_PASSPORT_PHOTO: this.file_CONSULTANT_PASSPORT_PHOTO,
        CONSULTANT_GENDER: this.model.CONSULTANT_GENDER,
        CONSULTANT_DOB: this.model.CONSULTANT_DOB,
        CONSULTANT_RACE: this.model.CONSULTANT_RACE,
        CONSULTANT_OTHER_RACE: this.model.CONSULTANT_OTHER_RACE,
        CONSULTANT_MOBILE_NO: this.model.CONSULTANT_MOBILE_NO,
        CONSULTANT_PHONENO: this.model.CONSULTANT_PHONENO,
        CONSULTANT_EMAIL: this.model.CONSULTANT_EMAIL,
      };
      return dataToSave;
    },
    onSubmit: function () {
      console.log("Form has been submitted!");
    },
  },
  created() {
    this.fetchUserDetails(); //newly edited
    this.model = _.cloneDeep(this.personal_particulars);
    this.selected_race = this.general_settings.RACES.find(
      (item) => item.SETTING_GENERAL_ID === this.model.CONSULTANT_RACE
    );
  },
};
</script>

<style>
.dirty {
  border-color: #5a5;
  background: #efe;
}

.dirty:focus {
  outline-color: #8e8;
}

.error {
  border-color: red;
  background: #fdd;
}

.error:focus {
  outline-color: #f99;
}
</style>

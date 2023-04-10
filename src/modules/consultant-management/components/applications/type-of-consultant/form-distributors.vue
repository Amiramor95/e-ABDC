<template>
  <div>
      <!-- <div class="row">
        <div class="col-lg-8 col-md-12">
          <h5>Agent Type: <span class="text-danger">*</span></h5>
          <b-form-group id="input-group-category1" class="required"
            :state="validateAgent('CANDIDATE_CATEGORY')"
            aria-describedby="agent-required-msg1"
          >
            <b-form-radio-group
              v-model="model.CANDIDATE_CATEGORY"
              :options="agent_types"
              name="radio-agent-type"
            ></b-form-radio-group>

            <b-form-invalid-feedback id="agent-required-msg1">
              Please select one agent type.
            </b-form-invalid-feedback>
          </b-form-group>

          <div v-if="model.CANDIDATE_CATEGORY == 1">
              <b-form-group
                label="Select your position:"
                label-for="positions"
                label-cols-lg="3"
                label-cols-md="2"
                description=""
              >

                <select id="positions" class="form-control col-lg-9 col-md-10 p-0" 
                    v-model="model.CANDIDATE_POSITION_CATEGORY" placeholder="Select a position">
                      <option
                          v-for="position in staffPositions"
                          v-bind:key="position.ID"
                          :value="position.ID"
                        >
                          {{position.NAME}}
                        </option>
                </select>
              </b-form-group>

              <div v-if="model.CANDIDATE_POSITION_CATEGORY">
                <b-form-group
                  label="Position:"
                  label-cols-lg="3"
                  label-cols-md="2"
                  label-for="input-1"
                  description=""
                  v-if="model.CANDIDATE_POSITION_CATEGORY === 3"
                >
                  <b-form-input
                    id="positions"
                    v-model="model.CANDIDATE_POSITION"
                    placeholder="Position's name"
                    class="col-lg-9 col-md-10"
                  ></b-form-input>
                </b-form-group>
              </div>
          </div>
        </div>
      </div> -->

      <div class="row mt-5">
        <div class="col-lg-8 col-md-12">
          <!--  License type  -->
          <h5 class>Choose your License:</h5>
          <b-form-group
            id="input-group-license-type"
            label="License Type:"
            label-cols-lg="3"
            label-cols-md="2"
            label-for="input-1"
            description
            class="required"
          >
            <b-form-select
              v-model="model.CONSULTANT_TYPE_ID"
              class="col-lg-9 bgcolor"
              @change="getDistributorsAndDistributorPointsList"
              :state="validateLicense('CONSULTANT_TYPE_ID')"
              aria-describedby="license-required-msg"
            >
              <template>
                <option
                  v-for="license in LICENSE_TYPES"
                  v-bind:key="license.CONSULTANT_TYPE_ID"
                  :value="license.CONSULTANT_TYPE_ID"
                >
                  {{license.TYPE_FULL_NAME}}
                </option>
              </template>
            </b-form-select>

            <b-form-invalid-feedback id="license-required-msg">
              Please select on license before proceeding next.
            </b-form-invalid-feedback>
          </b-form-group>
        </div>
      </div>

      <div class="row mt-5">
        <div class="col-lg-8 col-md-12">
          <h5 class>Choose your preferred Distributor:</h5>

          <b-form-group
            id="input-group-1"
            label="List of Distributors:"
            label-cols-lg="3"
            label-cols-md="2"
            label-for="input-1"
            description
            class="required"
          >
            <b-form-select v-model="model.DISTRIBUTOR_ID" class="col-lg-9" 
            :state="validateDistributor('DISTRIBUTOR_ID')"
            aria-describedby="distributor-required-msg"
            @change="checkDistributorPointsAndType">
              <template>
                <option
                  v-for="distributor in DISTRIBUTORS"
                  v-bind:key="distributor.DISTRIBUTOR_ID"
                  :value="distributor.DISTRIBUTOR_ID"
                >
                  {{ distributor.DIST_NAME }}
                </option>
              </template>
            </b-form-select>

            <b-form-invalid-feedback id="distributor-required-msg">
              Please select one preferred distributor.
            </b-form-invalid-feedback>

            <div v-if="showLicenseData">
              <button
                  type="button"
                  class="btn btn-danger btn-fill btn-sm mt-1"
              >
                <i class="fa fa-ban" /> &nbsp; Reject Distributors
              </button>
            </div>
          </b-form-group>

          <b-form-group
            id="input-group-1"
            label="Distribution Point:"
            label-cols-lg="3"
            label-cols-md="2"
            label-for="input-1"
            description
          >
            <b-form-select v-model="model.DIST_POINT_ID" class="col-lg-9">
              <template>
                <option
                  v-for="distributor_point in DISTRIBUTOR_POINTS"
                  v-bind:key="distributor_point.DIST_POINT_ID"
                  :value="distributor_point.DIST_POINT_ID"
                >
                  {{ distributor_point.DIST_POINT_NAME }}
                </option>
              </template>
            </b-form-select>
          </b-form-group>
        </div>
      </div>

      <div class="row mt-5" v-if="cmsrl_load">
        <div class="col-lg-8 col-md-12">
          <h5 class>CMSRL:</h5>

          <b-form-group>
            <b-form-radio-group
              id="chk-is-cmsrl"
              v-model="model.CMSRL"
              :options="cmsrl"
              name="chk-is-cmsrl"
            ></b-form-radio-group>
          </b-form-group>
          
          <div v-if="model.CMSRL!=null">
            <section-cmsrl-true
              getCMSRLData="updateCMSRLData"
              :savedConsultantData="savedConsultantData"
              :distributorCmsrlData="distributorCmsrlData"
              ref="cmsrl_datas_true"
              v-if="model.CMSRL === 1"
            ></section-cmsrl-true>
            
            <section-cmsrl-false v-if="model.CMSRL === 0" 
            :savedConsultantData="savedConsultantData"
            :distributorCmsrlData="distributorCmsrlData"
            ref="cmsrl_datas_false">
            </section-cmsrl-false>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
/*
Component flow

- Create savedConsultantData
- Create inputsModel
- Show loading
- APIsDependenciesCounter = 0
- Load APIs - inputs data
- Watch for props/parent data loaded - savedConsultantData
- When data loaded ->
- Map loaded Dependencies data to inputsModel - dropdowns/ checkboxes
- Map loaded ConsultantApplication data to savedConsultantData
- Update form UI
- Hide loading

Events
- data_loaded
- model_updated

*/

import * as DistributorAPI from "@/app/module2/services02";
import * as AuthenticatedUserAPI from "../../../services/auth";
import * as services04Module2 from "@/app/module2/services04";
import SectionCmsrlTrue from "./cmsrl_true.vue";
import SectionCmsrlFalse from "./cmsrl_false.vue";

import { validationMixin } from "vuelidate";
import { required } from 'vuelidate/lib/validators';

export default {
  mixins: [validationMixin],

  components: {
    SectionCmsrlTrue,
    SectionCmsrlFalse,
  },

  props: {
    // The parameters the component accepts
    savedConsultantData: Object,
    savedConsultantLicenseData: Object,
    showLicenseData: Boolean,
    staffPositions: {
      type: Array,
    }
  },

  data: function () {
    return {
      user: JSON.parse(localStorage.getItem("user")),
      overlay_show: true,
      formDataDependencyCounter: 0,

      /* -------------------------------------------------------------------------- */
      /*                             VISIBILITY_SECTION2                            */
      /* -------------------------------------------------------------------------- */
      visibleCategoryStaff: false,
      visibleConsultant: false,
      visibleCMSRL_Yes: false,
      visibleCMSRL_No: false,
      visibleUTS: false,
      visiblePRS: false,

      //for agent types
      agent_types: [
        {
          text: "Staff",
          value: 1,
        },
        {
          text: "Consultant",
          value: 2,
        },
      ],

      //for cmsrl options
      cmsrl: [
        {
          text: "Yes",
          value: 1,
        },
        {
          text: "No",
          value: 0,
        },
      ],

      uts: [{ text: "UNIT TRUST SCHEME CONSULTANT", value: 1 }],
      prs: [{ text: "PRIVATE RETIREMENT SCHEME CONSULTANT", value: 2 }],

      selected: null,

      LICENSE_TYPES: [], //fetching api data
      DISTRIBUTORS: [], //fetching api data
      DISTRIBUTOR_POINTS: [], //fetching api data

      consultant_nric: null, //fetching form api
      license_type: "",
      distributor_id: "",
      dist_point_id: "",

      cmsrl_load: false,
      distributorTypeData: '',
      distributorCmsrlData: '',

      model: {
        /* -------------------------------------------------------------------------- */
        /*                             MODEL_DATA_SECTION1                            */
        /* -------------------------------------------------------------------------- */
        CONSULTANT_ID: '',
        USER_ID: '',
        CONSULTANT_NRIC: '',

        CONSULTANT_TYPE_ID: '', 

        CANDIDATE_CATEGORY: '',
        CANDIDATE_POSITION_CATEGORY: '',
        CANDIDATE_POSITION: '',

        DISTRIBUTOR_ID: '',
        DIST_POINT_ID: '',
        CMSRL: '',
      },

      inputsModel: {
        /* -------------------------------------------------------------------------- */
        /*                             DROPDOWN_MODEL                                 */
        /* -------------------------------------------------------------------------- */
        DISTRIBUTOR_MODEL: null,
      },

      formOptions: {
        validateAfterLoad: false,
        validateAfterChanged: true,
        validateAsync: true,
      },
    };
  },

  validations: {
    model: {
      //CANDIDATE_CATEGORY: { required },
      CONSULTANT_TYPE_ID: { required },
      DISTRIBUTOR_ID: { required },
    }
  },

  methods: {
    async getConstultantType() {
      try {
        const res_consultantType = await DistributorAPI.addConsultantType(this.savedConsultantData.CONSULTANT_ID);
        this.LICENSE_TYPES = res_consultantType;
      } catch (error) {
        console.log(error);
      }
    },

    async getNRICNo() {
      try {
        if(this.savedConsultantData.CONSULTANT_NRIC){
          this.consultant_nric = this.savedConsultantData.CONSULTANT_NRIC;
        }else{
          this.consultant_nric = this.savedConsultantData.CONSULTANT_PASSPORT_NO;
        }
        this.getDistributorsAndDistributorPointsList();
      } catch (error) {
        console.log(error);
      }
    },

    getDistributorsAndDistributorPointsList() {
      if (this.consultant_nric && this.model.CONSULTANT_TYPE_ID ) 
      {
        this.getDistributorsByNRICNoAndLicenseType(
          this.consultant_nric,
          this.model.CONSULTANT_TYPE_ID
        ).then(response=>{
          this.DISTRIBUTORS=response});

        if(this.model.DISTRIBUTOR_ID){
          this.checkDistributorPointsAndType(this.model.DISTRIBUTOR_ID);
        }
      }
    },
  
    getDistributorsByNRICNoAndLicenseType(nric_number, license_type) {
      return new Promise( (resolve, reject) => {
        if(this.savedConsultantData.CONSULTANT_NRIC){
          DistributorAPI.getDistributorByNRIC(
            nric_number,
            license_type
          ).then(response=>{resolve(response)})
        }else{
          DistributorAPI.getDistributorByPASSPORT(
            nric_number,
            license_type
          ).then(response=>{resolve(response)})
        }
      })
    },

    async checkDistributorPointsAndType(distId){
      if(distId){
          this.getDistributorPointsByNRICNoAndLicenseType(
            distId,
            this.consultant_nric,
            this.model.CONSULTANT_TYPE_ID
          ).then(response=>{
            this.DISTRIBUTOR_POINTS=response
          });

        this.checkDistributorType(distId);
      }else if(this.model.DISTRIBUTOR_ID){
        this.getDistributorPointsByNRICNoAndLicenseType(
            this.model.DISTRIBUTOR_ID,
            this.consultant_nric,
            this.model.CONSULTANT_TYPE_ID
          ).then(response=>{
            this.DISTRIBUTOR_POINTS=response
          });

        this.checkDistributorType(this.model.DISTRIBUTOR_ID);
      }
    },

    getDistributorPointsByNRICNoAndLicenseType(distId, nric_number, license_type) {
      return new Promise( (resolve, reject) => {
        if(this.savedConsultantData.CONSULTANT_NRIC){
          DistributorAPI.getDistributorPointsByNRIC(
            distId,
            nric_number,
            license_type
          ).then(response=>{resolve(response)})
        }else{
          DistributorAPI.getDistributorPointsByPASSPORT(
            distId,
            nric_number,
            license_type
          ).then(response=>{resolve(response)})
        }
      })
    },

    //Checking Distributor Type
    async checkDistributorType(distId){
      if(distId){
        try{
          const response = await services04Module2.getDistributorType(distId);
          this.distributorTypeData = response;
          if(this.distributorTypeData.CMSRL == false){
            this.cmsrl_load = false;
          }else{
            this.getDistributorCmsrlDetails(distId);
            this.cmsrl_load = true;
          }
        }catch(error){
          console.log(error);
        }
      }
    },

    async getDistributorCmsrlDetails(distId){
      if(distId){
        try{
          const response = await services04Module2.getDistributorCmsrlDatas(distId);
          this.distributorCmsrlData = response;
        }catch(error){
          console.log(error);
        }
      }
    },

    //Form Data Validations
    validateAddLicenseForm() {
      this.$v.model.$touch();
      if (this.$v.model.$anyError) {
        return;
      }else{
        return true;
      }
    },

    // validateAgent(CANDIDATE_CATEGORY){
    //   const { $dirty, $error } = this.$v.model[CANDIDATE_CATEGORY];
    //   return $dirty ? !$error : null;
    // },

    validateLicense(CONSULTANT_TYPE_ID){
      const { $dirty, $error } = this.$v.model[CONSULTANT_TYPE_ID];
      return $dirty ? !$error : null;
    },

    validateDistributor(DISTRIBUTOR_ID) {
      const { $dirty, $error } = this.$v.model[DISTRIBUTOR_ID];
      return $dirty ? !$error : null;
    },

    //get data to save
    getDataToSave() {
      //const agent_position = this.$refs.staff_position.getDataToSave();
      if(this.cmsrl_load){
        if(this.model.CMSRL == 1){
          const cmsrl_datas_true = this.$refs.cmsrl_datas_true.getDataToSave();
          this.$refs.cmsrl_datas_true.uploadCMSRLCertificate();
          let dataToSave = {
            CONSULTANT_ID: this.savedConsultantData.CONSULTANT_ID,
            USER_ID: this.savedConsultantData.USER_ID,
            CONSULTANT_NRIC: this.savedConsultantData.CONSULTANT_NRIC,
            CANDIDATE_CATEGORY: this.savedConsultantLicenseData.CANDIDATE_CATEGORY,
            CANDIDATE_POSITION_CATEGORY: this.savedConsultantLicenseData.CANDIDATE_POSITION_CATEGORY,
            CANDIDATE_POSITION: this.savedConsultantLicenseData.CANDIDATE_POSITION,

            CONSULTANT_TYPE_ID: this.model.CONSULTANT_TYPE_ID,
            DISTRIBUTOR_ID: this.model.DISTRIBUTOR_ID,
            DIST_POINT_ID: this.model.DIST_POINT_ID,
            
            CMSRL: this.model.CMSRL,
            ...cmsrl_datas_true,
          };
          return dataToSave;
        }else{
          const cmsrl_datas_false = this.$refs.cmsrl_datas_false.getDataToSave();
          this.$refs.cmsrl_datas_false.uploadApprenticenshipCertificate();
          let dataToSave = {
            CONSULTANT_ID: this.savedConsultantData.CONSULTANT_ID,
            USER_ID: this.savedConsultantData.USER_ID,
            CONSULTANT_NRIC: this.savedConsultantData.CONSULTANT_NRIC,
            CANDIDATE_CATEGORY: this.savedConsultantLicenseData.CANDIDATE_CATEGORY,
            CANDIDATE_POSITION_CATEGORY: this.savedConsultantLicenseData.CANDIDATE_POSITION_CATEGORY,
            CANDIDATE_POSITION: this.savedConsultantLicenseData.CANDIDATE_POSITION,

            CONSULTANT_TYPE_ID: this.model.CONSULTANT_TYPE_ID,
            DISTRIBUTOR_ID: this.model.DISTRIBUTOR_ID,
            DIST_POINT_ID: this.model.DIST_POINT_ID,
            
            CMSRL: this.model.CMSRL,
            ...cmsrl_datas_false,
          };
          return dataToSave;
        }
      }else{
        let dataToSave = {
          CONSULTANT_ID: this.savedConsultantData.CONSULTANT_ID,
          USER_ID: this.savedConsultantData.USER_ID,
          CONSULTANT_NRIC: this.savedConsultantData.CONSULTANT_NRIC,
          CANDIDATE_CATEGORY: this.savedConsultantLicenseData.CANDIDATE_CATEGORY,
          CANDIDATE_POSITION_CATEGORY: this.savedConsultantLicenseData.CANDIDATE_POSITION_CATEGORY,
          CANDIDATE_POSITION: this.savedConsultantLicenseData.CANDIDATE_POSITION,

          CONSULTANT_TYPE_ID: this.model.CONSULTANT_TYPE_ID,
          DISTRIBUTOR_ID: this.model.DISTRIBUTOR_ID,
          DIST_POINT_ID: this.model.DIST_POINT_ID,
        };
        return dataToSave;
      }
    },
  },

  created(){
    if(this.showLicenseData && this.savedConsultantLicenseData){
      this.model = _.cloneDeep(this.savedConsultantLicenseData);
    }

    this.getConstultantType();
    this.getNRICNo();
  },

  // mounted() {
  //   this.getNRICNo();
  // },
};
</script>

<style lang="scss">
.no-shadow {
  /* remove shadows by xomisse */
  -moz-box-shadow: none;
  -goog-ms-box-shadow: none;
  -webkit-box-shadow: none;
  box-shadow: none;
}
</style>

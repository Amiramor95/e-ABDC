<template>
  <div>
    <br />
    <div class="row">
      <div class="col-lg-8 col-md-12">
        <h5>Agent Type:</h5>
        <b-form-group id="input-group-category">
          <b-form-radio-group
            v-model="selected_agent_type"
            :options="agent_types"
            name="radio-agent-type"
          >
          </b-form-radio-group>
        </b-form-group>
        <template v-if="selected_agent_type == true">
          <div>
            <section-agent-position
              v-if="selected_agent_type === 1"
            ></section-agent-position>
          </div>
        </template>
      </div>
    </div>

    <div class="row mt-5">
      <div class="col-lg-8 col-md-12">
        <!--  License type  -->
        <h5 class="">Choose your License:</h5>
        <b-form-group
          id="input-group-license-type"
          label="License Type:"
          label-cols-lg="3"
          label-cols-md="2"
          label-for="input-1"
          description=""
        >
          <b-form-select
            v-model="model.LICENSE_TYPE"
            :options="license_type"
            class="mb-3 col-lg-9"
          >
          </b-form-select>
        </b-form-group>
      </div>
    </div>

    <div class="row mt-5">
      <div class="col-lg-8 col-md-12">
        <h5 class="">Choose your preferred Distributor:</h5>

        <b-form-group
          id="input-group-1"
          label="List of Distributors:"
          label-cols-lg="3"
          label-cols-md="2"
          label-for="input-1"
          description=""
        >
          <b-form-select v-model="model.DISTRIBUTORS" class="col-lg-9">
            <option value="1">TESTDISTR18 SDN BHD</option>
          </b-form-select>
        </b-form-group>

        <b-form-group
          id="input-group-1"
          label="Distribution Point:"
          label-cols-lg="3"
          label-cols-md="2"
          label-for="input-1"
          description=""
        >
          <b-form-select v-model="model.DISTRIBUTOR_POINTS" class="col-lg-9">
            <option value="1">A BERHAD1</option>
          </b-form-select>
        </b-form-group>
      </div>
    </div>

    <div class="row mt-5">
      <div class="col-lg-8 col-md-12">
        <h5 class="">CMSRL:</h5>

        <b-form-group>
          <b-form-radio-group
            id="chk-is-cmsrl"
            v-model="is_cmsrl"
            :options="cmsrl"
            name="chk-is-cmsrl"
          >
          </b-form-radio-group>
        </b-form-group>

        <div v-if="is_cmsrl">
          <section-cmsrl-true v-if="is_cmsrl === 1"></section-cmsrl-true>
          <section-cmsrl-false v-if="is_cmsrl === 2"></section-cmsrl-false>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-4 col-md-12">
        <pre class="hide d-none">
        {{ this.model }}
        </pre>
      </div>
    </div>
  </div>
</template>
<script>
/*
Component flow

- Create formDataModel
- Create inputsModel
- Show loading
- APIsDependenciesCounter = 0
- Load APIs - inputs data
- Watch for props/parent data loaded - formDataModel
- When data loaded ->
- Map loaded Dependencies data to inputsModel - dropdowns/ checkboxes
- Map loaded ConsultantApplication data to formDataModel
- Update form UI
- Hide loading

Events
- data_loaded
- model_updated

*/
import { mapActions, mapGetters } from "vuex";
import SectionAgentPosition from "./type-of-consultant/agent_position.vue";
import SectionCmsrlTrue from "./type-of-consultant/cmsrl_true.vue";
import SectionCmsrlFalse from "./type-of-consultant/cmsrl_false.vue";
// import { getDistributorRecords,getDistributorListByNRICNO } from '../../../../app/module2/services02';
import * as DistributorAPI from "../../../../app/module2/services02";
import * as AuthenticatedUserAPI from "../../services/auth";

export default {
  components: {
    SectionAgentPosition,
    SectionCmsrlTrue,
    SectionCmsrlFalse,
  },
  props: {
    // The parameters the component accepts
    parentDataLoaded: Boolean,
    formDataModel: Object,
  },
  computed: {
    ...mapGetters({ general_settings: "getGeneralSettings" }),
    //compute lazy load
  isAgentSelected(){
    if(this.selected_agent_type==1){
      load_selected_agent_type==true
    }else{
      load_selected_agent_type==true
    }
  }
    if()
  },
  data: function () {
    return {
      // lazy load
      load_selected_agent_type: false,

      consultant_nric: null,
      distributor_list: null,

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

      // section 2
      agent_types: [
        { text: "Staff", value: 1 },
        { text: "Consultant", value: 2 },
      ],
      selected_agent_type: null,
      cmsrl: [
        { text: "Yes", value: 1 },
        { text: "No", value: 2 },
      ],

      distributorAPI: [
        { name: "ENG JIA SECURITIES SDN BHD", LICENSE_TYPE: "UTS" },
        { name: "HONG LEONG ASSET FUND MANAGEMENT BHD", LICENSE_TYPE: "PTS" },
      ],

      license_type: [
        { text: "UNIT TRUST SCHEME CONSULTANT", value: 1 },
        { text: "PRIVATE RETIREMENT SCHEME CONSULTANT", value: 2 },
      ],

      uts: [{ text: "UNIT TRUST SCHEME CONSULTANT", value: 1 }],
      prs: [{ text: "PRIVATE RETIREMENT SCHEME CONSULTANT", value: 2 }],

      selected: null,
      is_cmsrl: null,
      options: [],

      model: {
        /* -------------------------------------------------------------------------- */
        /*                             MODEL_DATA_SECTION1                            */
        /* -------------------------------------------------------------------------- */

        CONSULTANT_CATEGORY: null,
        CONSULTANT_STATUS: null,
        STAFF_POSITION: null,
        CMSRL: null,
        CMSRL_NO: null,
        CMSRL_EXPIRY_DATE: null,
        CMSRL_CERT_DOCS: null,
        RECRUITER_NRIC_NO: null,
        RECRUITER_CMSRL_NO: null,
        APPRENTICESHIP_DOCS: null,

        DISTRIBUTORS: [
          { text: "TESTDISTR18 SDN BHD", value: "TESTDISTR18 SDN BHD" },
        ],
        DISTRIBUTOR_POINTS: [{ text: "A BERHAD1", value: "A BERHAD1" }],
        LICENSE_TYPE: [],
        UTS: false, // not used in post methods
        PRS: false, // not used in post methods
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
  methods: {
    //newly edited
    /*
    1. get Nric NO of the user
    2. check Nric no to the table Acceptance_Details of distributor db  to get acceptance_candidate_id
    3. match candidate_acceptance_id with distributor_id  and get distributor id
    4. get desitributor name form distributor table and list out options
     */
    async getNRICNo() {
      try {
        const authUser = await AuthenticatedUserAPI.me();
        const nric = authUser.data.user.USER_NRIC;
        this.getDistributorsByNRICNo(nric);
      } catch (error) {
        console.log(error);
      }
    },
    async getDistributorsByNRICNo(nric_number) {
      try {
        const response = await DistributorAPI.getDistributorByNRIC(nric_number);
        this.distributor_list = response.data.distributors;
        console.log(response.data.distributors);
        this.model.DISTRIBUTOR = response.data.distributors;
        console.log("distributors ko list" + this.model.DISTRIBUTOR);
        console.log("distributors ko list" + response.data["distributors"]);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.getNRICNo();
  },
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

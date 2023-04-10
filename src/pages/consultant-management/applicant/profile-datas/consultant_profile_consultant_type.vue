<template>
  <div>
    <div class="row">
        <div class="col-lg-8 col-md-12">
            <h5>Agent Type:</h5>
            <b-form-group id="input-group-category" class="required">
                <b-form-radio-group
                v-model="model.CANDIDATE_CATEGORY"
                :options="agent_types"
                name="radio-agent-type"
                disabled
                ></b-form-radio-group>
            </b-form-group>

            <div v-if="model.CANDIDATE_CATEGORY == 1">
                <b-form-group
                    label="Your position:"
                    label-for="positions"
                    label-cols-lg="3"
                    label-cols-md="2"
                    description=""
                >

                    <b-form-select
                        v-model="model.CANDIDATE_POSITION_CATEGORY"
                        class="col-lg-9 bgcolor"
                        disabled
                    >
                        <template>
                            <option
                            v-for="position in general_settings.STAFF_POSITIONS"
                            v-bind:key="position.ID"
                            :value="position.ID"
                            >
                            {{position.NAME}}
                            </option>
                        </template>
                    </b-form-select>
                </b-form-group>
            </div>

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
                        disabled
                    ></b-form-input>
                </b-form-group>
            </div>
        </div>
    </div>

    <div class="row mt-5">
        <div class="col-lg-8 col-md-12">
        <!--  License type  -->
        <h5 class>Your License:</h5>
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
            disabled
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
        </b-form-group>
        </div>
    </div>

    <div class="row mt-5">
        <div class="col-lg-8 col-md-12">
        <h5 class>Your preferred Distributor:</h5>

        <b-form-group
            id="input-group-1"
            label="Distributor:"
            label-cols-lg="3"
            label-cols-md="2"
            label-for="input-1"
            description
            class="required"
        >
            <b-form-select v-model="model.DISTRIBUTOR_ID" class="col-lg-9" disabled>
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
        </b-form-group>

        <b-form-group
            id="input-group-1"
            label="Distribution Point:"
            label-cols-lg="3"
            label-cols-md="2"
            label-for="input-1"
            description
            disabled
        >
            <b-form-select v-model="model.DIST_POINT_ID" class="col-lg-9" disabled>
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
                    :savedConsultantLicenseData="savedConsultantLicenseData"
                    ref="cmsrl_datas_true"
                    v-if="model.CMSRL === 1"
                ></section-cmsrl-true>
                
                <section-cmsrl-false v-else 
                    :savedConsultantLicenseData="savedConsultantLicenseData"
                    :savedConsultantData="savedConsultantData"
                    ref="cmsrl_datas_false">
                </section-cmsrl-false>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
    import * as DistributorAPI from "../../../../app/module2/services02";
    import * as services04Module2 from "../../../../app/module2/services04";
    import SectionCmsrlTrue from "./cmsrl_true.vue";
    import SectionCmsrlFalse from "./cmsrl_false.vue";

    export default {
        props: {
            // parameters the component accepts
            general_settings: Object,
            savedConsultantData: Object,
            savedConsultantLicenseData: Object,
        },

        components: {
            SectionCmsrlTrue,
            SectionCmsrlFalse
        },


        data(){
            return{
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

                cmsrl_load: false,
                LICENSE_TYPES: [], //fetching api data
                DISTRIBUTORS: [], //fetching api data
                DISTRIBUTOR_POINTS: [], //fetching api data
                consultant_nric: '',
                
                model: {

                },
            }
        },

        created(){
            this.getConstultantType();

            if(this.savedConsultantLicenseData){
                this.model = _.cloneDeep(this.savedConsultantLicenseData);
                this.checkDistributorType(this.savedConsultantLicenseData.DISTRIBUTOR_ID);
            }
        },

        mounted() {
            this.getNRICNo();
        },

        methods: {
            async getConstultantType() {
                try {
                    const res_consultantType = await DistributorAPI.getConsultantType();
                    //console.log('Consultant Type Datas', res_consultantType)
                    this.LICENSE_TYPES = res_consultantType;
                } catch (error) {
                    console.log(error);
                }
            },

            async getNRICNo() {
                try {
                    // const authUser = await AuthenticatedUserAPI.me();
                    // this.consultant_nric = authUser.data.user.USER_NRIC;
                    this.consultant_nric = this.savedConsultantData.CONSULTANT_NRIC;
                    this.getDistributorsAndDistributorPointsList();
                } catch (error) {
                    console.log(error);
                }
            },

            getDistributorsAndDistributorPointsList() {
                if(this.consultant_nric && this.savedConsultantLicenseData.CONSULTANT_TYPE_ID){
                    console.log('Checking selected license', this.savedConsultantLicenseData.CONSULTANT_TYPE_ID)

                    this.getDistributorsByNRICNoAndLicenseType(
                        this.consultant_nric,
                        this.savedConsultantLicenseData.CONSULTANT_TYPE_ID
                    ).then(response=>{
                        console.log(response);
                        this.DISTRIBUTORS=response});

                        this.getDistributorPointsByNRICNoAndLicenseType(
                        this.consultant_nric,
                        this.savedConsultantLicenseData.CONSULTANT_TYPE_ID
                    ).then(response=>{
                        console.log(response);
                        this.DISTRIBUTOR_POINTS=response
                    });
                }
            },
        
            getDistributorsByNRICNoAndLicenseType(nric_number, license_type) {
                return new Promise( (resolve, reject) => {
                    DistributorAPI.getDistributorByNRIC(
                        nric_number,
                        license_type
                    ).then(response=>{resolve(response)})
                })
            },

            getDistributorPointsByNRICNoAndLicenseType(nric_number, license_type) {
                return new Promise( (resolve, reject) => {
                    DistributorAPI.getDistributorPointsByNRIC(
                        nric_number,
                        license_type
                    ).then(response=>{resolve(response)})
                })
            },

            //Checking Distributor Type
            async checkDistributorType(value){
                if(value){
                    try{
                        const response = await services04Module2.getDistributorType(value);
                        this.distributorTypeData = response;
                        if(this.distributorTypeData.CMSRL == false){
                            this.cmsrl_load = false;
                        }else{
                            this.cmsrl_load = true;
                        }
                    }catch(error){
                            console.log(error);
                    }
                }
            },
        }
    }
</script>

<style>

</style>
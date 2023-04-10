<template>
  <div class="card-body">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <h4 slot="header">APPROVAL LEVEL</h4>
      </div>
      <va-card class="ml-4 col-lg-10 my-1 px-1">
        <div class="col-lg-10">
          <h4 slot="header">
            <i class="fa fa-sitemap"></i>&nbsp;&nbsp; New Member/Distributor - A(1)(a)
          </h4>
        </div>
        <br />
        <div class="ml-5">
          <div>
            <span>FIRST LEVEL REGISTRATION DEPARTMENT REVIEW </span>


           <!-- <toggle-button v-model="dataToggle" :value="true" :sync="true" :labels="{ checked: 'ON', uncheked: 'OFF' }" /> -->
              <!-- <template v-if="model.INDEX > 0">
              </template>
              <template v-else-if="model.INDEX == 0">
              </template> -->

            <button
              v-b-toggle.collapse-2
              type="button"
              class="float-right btn-fill btn-md"
              v-on:click="rdReview"
            >
              <i class="fa fa-edit"></i>
            </button>
            <!-- <div class="col-8">
                 <toggle-button class="float-right" :labels="{checked: 'ON', uncheked: 'OFF'}"/>
              </div>   -->

            <hr />
          </div>
          <div>
            <span>SECOND LEVEL HOD REGISTRATION DEPARTMENT REVIEW</span>
            <button
              v-b-toggle.collapse-2
              type="button"
              class="float-right btn-fill btn-md"
              v-on:click="HodRd"
            >
              <i class="fa fa-edit"></i>
            </button>
            <!-- <div class="col-8">
                 <toggle-button class="float-right" :labels="{checked: 'ON', uncheked: 'OFF'}"/>
              </div>   -->

            <hr />
          </div>
          <div>
            <span>LRA REVIEW</span>
            <button
              v-b-toggle.collapse-2
              type="button"
              class="float-right btn-fill btn-md"
              v-on:click="lraReview"
            >
              <i class="fa fa-edit"></i>
            </button>
            <!-- <div class="col-8">
                 <toggle-button class="float-right" :labels="{checked: 'ON', uncheked: 'OFF'}"/>
              </div>   -->

            <hr />
          </div>
          <div>
            <span>SUPERVISION REVIEW</span>
            <button
              v-b-toggle.collapse-2
              type="button"
              class="float-right btn-fill btn-md"
              v-on:click="superReview"
            >
              <i class="fa fa-edit"></i>
            </button>
            <!-- <div class="col-8">
                 <toggle-button class="float-right" :labels="{checked: 'ON', uncheked: 'OFF'}"/>
              </div>   -->

            <hr />
          </div>
          <div>
            <span>FIRST LEVEL REGISTRATION DEPARTMENT REVIEW</span>
            <button
              v-b-toggle.collapse-2
              type="button"
              class="float-right btn-fill btn-md"
              v-on:click="secondrdReview"
            >
              <i class="fa fa-edit"></i>
            </button>
            <!-- <div class="col-8">
                 <toggle-button class="float-right" :labels="{checked: 'ON', uncheked: 'OFF'}"/>
              </div>   -->

            <hr />
          </div>
          <div>
            <span>SECOND LEVEL HOD REGISTRATION DEPARTMENT REVIEW</span>
            <button
              v-b-toggle.collapse-2
              type="button"
              class="float-right btn-fill btn-md"
              v-on:click="secondHodrdReview"
            >
              <i class="fa fa-edit"></i>
            </button>
            <!-- <div class="col-8">
                 <toggle-button class="float-right" :labels="{checked: 'ON', uncheked: 'OFF'}"/>
              </div>   -->

            <hr />
          </div>
          <div>
            <span>THIRD LEVEL GENERAL MANAGER OF REGULATORY SERVICES DIVISION REVIEW</span>
            <button
              v-b-toggle.collapse-2
              type="button"
              class="float-right btn-fill btn-md"
              v-on:click="GmReview"
            >
              <i class="fa fa-edit"></i>
            </button>
            <!-- <div class="col-8">
                 <toggle-button class="float-right" :labels="{checked: 'ON', uncheked: 'OFF'}"/>
              </div>   -->

            <hr />
          </div>
          <div>
            <span>FOURTH LEVEL CEO REVIEW</span>
            <button
              v-b-toggle.collapse-2
              type="button"
              class="float-right btn-fill btn-md"
              v-on:click="CeoReview"
            >
              <i class="fa fa-edit"></i>
            </button>
            <!-- <div class="col-8">
                 <toggle-button class="float-right" :labels="{checked: 'ON', uncheked: 'OFF'}"/>
              </div>   -->

            <hr />
          </div>
          <div>
            <span>FIFTH LEVEL BOARD OF DIRECTOR APPROVAL</span>

            <button
              v-b-toggle.collapse-2
              type="button"
              class="float-right btn-fill btn-md"
              v-on:click="BodReview"
            >
              <i class="fa fa-edit"></i>
            </button>
            <!-- <div class="col-8">
                 <toggle-button class="float-right" :labels="{checked: 'ON', uncheked: 'OFF'}"/>
              </div>   -->

            <hr />
          </div>
        </div>
        <br />
        <button
          @click="back"
          type="button"
          class="btn btn-primary btn-fill btn-md"
        >
          <i class="fa fa-step-backward" /> &nbsp; Previous
        </button>
      </va-card>
    </div>
  </div>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import Vue from "vue";
import "vue-form-generator/dist/vfg.css";
import * as servicesModule0 from "../../../app/module0/services02";

export default {
  mounted() {
   // this.getAllApproval();
  // console.log("Return Url=",this.return);
  },
   props: [""],
  data() {
    return {
      visibleBlockDuration: false,
      visibleLogin: false,
      visibleRegDep: false,
      toggled: false,
      dataToggle: false,

      model: {
        APPROVAL_LEVEL_ID: "",
        INDEX: "",
        AUTO_APPROVAL_DAYS: "",
        AUTO_REJECT_DAYS: "",
        DISTRIBUTOR_CATEGORY: "",
        GROUP_NAME: "",
        //dataToggle: "",
      },
    };
  },

  methods: {
    back() {
      //this.$router.go(-1);
       this.$router.push("/fimm/approval-mainList");
    }, // back button

    rdReview() {
      this.$router.push("/fimm/newDistributor-first-rdReview");
    },
    HodRd() {
      this.$router.push("/fimm/newDistributor-first-HODrdReview");
    },
    lraReview() {
      this.$router.push("/fimm/newDistributor-LRAReview");
    },
    superReview() {
      this.$router.push("/fimm/newDistributor-SupervisionReview");
    },
    secondrdReview() {
      this.$router.push("/fimm/newDistributor-secondLevel-RdReview");
    },
    secondHodrdReview() {
      this.$router.push("/fimm/newDistributor-secondLevel-Hod-RdReview");
    },
    GmReview() {
      this.$router.push("/fimm/newDistributor-GMReview");
    },
    CeoReview() {
      this.$router.push("/fimm/newDistributor-CeoReview");
    },
    BodReview() {
      this.$router.push("/fimm/newDistributor-BodReview");
    },
    

    // onToggleChange(event) {
    //   let value = event.value;       
    //         console.log(value);
    //         if (value == false){
    //           this.dataToggle = 1;
    //         }else{
    //           this.dataToggle = 0; 
    //         }
    //       },

   /* getAllApproval: async function () {
      const response = await servicesModule0.getAllApprovalList(
        11,
        "REGISTRATION DEPARTMENT REVIEW"
      );
      console.log("dataTogglepre=",this.dataToggle);
      if (response.APPR_INDEX == 0)
      { this.dataToggle = false}
      else { this.dataToggle = true };
      // this.approvalList = response;
      this.APPROVAL_LEVEL_ID = response.APPROVAL_LEVEL_ID;
     this.model.INDEX = response.APPR_INDEX;
      this.model.AUTO_APPROVAL_DAYS = response.APPR_AUTO_APPROVAL_DAYS;
      this.model.AUTO_REJECT_DAYS = response.APPR_AUTO_REJECT_DAYS;
      console.log("APPR_STATUS=",response.APPR_STATUS);
      console.log("dataToggle=",this.dataToggle);
      //   this.model.GROUP_NAME = response.APPR_GROUP_ID;
      this.model.GROUP_NAME = {
        APPR_GROUP_ID: response.APPR_GROUP_ID,
        COMBINE: response.COMBINE,
      };
    },*/
  },
};
</script>

<style lang="scss" scoped>
.vue-js-switch {
  margin-left: 40%;
}
.app-layout__main {
  background: #e8e8e8;
}
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
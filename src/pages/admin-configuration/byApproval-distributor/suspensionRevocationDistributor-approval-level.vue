<template>
  <div class="card-body">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <h4 slot="header">APPROVAL LEVEL</h4>
      </div>
      <va-card class="ml-4 col-lg-10 my-1 px-1">
        <div class="col-lg-10">
          <h4 slot="header">
            <i class="fa fa-sitemap"></i>&nbsp;&nbsp; Suspension/Revocation by FIMM - A(1)(c)(ii)
          </h4>
        </div>
        <br />
        <div class="ml-5">
          <div>
            <span>FIRST LEVEL HOD REGISTRATION DEPARTMENT REVIEW</span>
            <button
              v-b-toggle.collapse-2
              type="button"
              class="float-right btn-fill btn-md"
              v-on:click="firstHodrdReview"
            >
              <i class="fa fa-edit"></i>
            </button>
            <!-- <div class="col-8">
                 <toggle-button class="float-right" :labels="{checked: 'ON', uncheked: 'OFF'}"/>
              </div>   -->

            <hr />
          </div>
          <div>
            <span>SECOND LEVEL GENERAL MANAGER REVIEW</span>
            <button
              v-b-toggle.collapse-2
              type="button"
              class="float-right btn-fill btn-md"
              v-on:click="firstGmReview"
            >
              <i class="fa fa-edit"></i>
            </button>
            <!-- <div class="col-8">
                 <toggle-button class="float-right" :labels="{checked: 'ON', uncheked: 'OFF'}"/>
              </div>   -->

            <hr />
          </div>
          <div>
            <span>THIRD LEVEL CEO REVIEW</span>
            <button
              v-b-toggle.collapse-2
              type="button"
              class="float-right btn-fill btn-md"
              v-on:click="firstCeoReview"
            >
              <i class="fa fa-edit"></i>
            </button>
            <!-- <div class="col-8">
                 <toggle-button class="float-right" :labels="{checked: 'ON', uncheked: 'OFF'}"/>
              </div>   -->

            <hr />
          </div>
          <div>
            <span>FOURTH LEVEL REGISTRATION DEPARTMENT REVIEW</span>
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
            <span>FIFTH LEVEL HOD REGISTRATION DEPARTMENT REVIEW</span>
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
            <span>SIXTH LEVEL GENERAL MANAGER REVIEW</span>
            <button
              v-b-toggle.collapse-2
              type="button"
              class="float-right btn-fill btn-md"
              v-on:click="SecondGmReview"
            >
              <i class="fa fa-edit"></i>
            </button>
            <!-- <div class="col-8">
                 <toggle-button class="float-right" :labels="{checked: 'ON', uncheked: 'OFF'}"/>
              </div>   -->

            <hr />
          </div>
          <div>
            <span>SEVENTH LEVEL CEO APPROVAL</span>
            <button
              v-b-toggle.collapse-2
              type="button"
              class="float-right btn-fill btn-md"
              v-on:click="SecondCeoReview"
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
    //this.getAllApproval();
  },

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
        dataToggle: "",
      },
    };
  },

  methods: {
    back() {
      this.$router.push("/fimm/approval-mainList");
    }, // back button

    firstHodrdReview() {
      this.$router.push("/fimm/suspensionRevocationDistributor-first-HodRdReview");
    },
    firstGmReview() {
      this.$router.push("suspensionRevocationDistributor-first-GMReview");
    },
    firstCeoReview() {
      this.$router.push("suspensionRevocationDistributor-first-CeoReview");
    },
    rdReview() {
      this.$router.push("/fimm/suspensionRevocationDistributor-RdReview");
    },
    secondHodrdReview() {
      this.$router.push("/fimm/suspensionRevocationDistributor-second-HodRdReview");
    },
    SecondGmReview() {
      this.$router.push("/fimm/suspensionRevocationDistributor-second-GMReview");
    },
    SecondCeoReview() {
      this.$router.push("/fimm/suspensionRevocationDistributor-second-CeoReview");
    },

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
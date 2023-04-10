<template>
  <div class="card-body">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <h4 slot="header">APPROVAL LEVEL</h4>
      </div>
      <va-card class="ml-4 col-lg-10 my-1 px-1">
        <div class="col-lg-10">
          <h4 slot="header">
            <i class="fa fa-sitemap"></i>&nbsp;&nbsp; CIRCULAR MANAGEMENT - L(1)(j)
          </h4>
        </div>
        <br />
        <div class="ml-5">
          <div>
            <span>FIRST LEVEL REGISTRATION DEPARTMENT APPROVAL</span>
            <button
              v-b-toggle.collapse-2
              type="button"
              class="float-right btn-fill btn-md"
              v-on:click="RD"
            >
              <i class="fa fa-edit"></i>
            </button>

            <hr />
          </div>
          <div>
            <span>SECOND LEVEL REGISTRATION DEPARTMENT APPROVAL</span>
            <button
              v-b-toggle.collapse-2
              type="button"
              class="float-right btn-fill btn-md"
              v-on:click="GMRD"
            >
              <i class="fa fa-edit"></i>
            </button>
            <!-- <div class="col-8">
                 <toggle-button class="float-right" :labels="{checked: 'ON', uncheked: 'OFF'}"/>
              </div>   -->

            <hr />
          </div>
          <div>
            <span>FIRST LEVEL LEGAL AND REGULATORY APPROVAL</span>
            <button
              v-b-toggle.collapse-2
              type="button"
              class="float-right btn-fill btn-md"
              v-on:click="LRA"
            >
              <i class="fa fa-edit"></i>
            </button>
            <!-- <div class="col-8">
                 <toggle-button class="float-right" :labels="{checked: 'ON', uncheked: 'OFF'}"/>
              </div>   -->

            <hr />
          </div>
          <div>
            <span>SECOND LEVEL LEGAL AND REGULATORY APPROVAL</span>
            <button
              v-b-toggle.collapse-2
              type="button"
              class="float-right btn-fill btn-md"
              v-on:click="GMLRA"
            >
              <i class="fa fa-edit"></i>
            </button>
            <!-- <div class="col-8">
                 <toggle-button class="float-right" :labels="{checked: 'ON', uncheked: 'OFF'}"/>
              </div>   -->

            <hr />
          </div>
           <div>
            <span>FIRST LEVEL SUPERVISION APPROVAL</span>
            <button
              v-b-toggle.collapse-2
              type="button"
              class="float-right btn-fill btn-md"
              v-on:click="supervision"
            >
              <i class="fa fa-edit"></i>
            </button>
            <!-- <div class="col-8">
                 <toggle-button class="float-right" :labels="{checked: 'ON', uncheked: 'OFF'}"/>
              </div>   -->

            <hr />
          </div>
           <div>
            <span>SECOND LEVEL SUPERVISION APPROVAL</span>
            <button
              v-b-toggle.collapse-2
              type="button"
              class="float-right btn-fill btn-md"
              v-on:click="GMsupervision"
            >
              <i class="fa fa-edit"></i>
            </button>
            <!-- <div class="col-8">
                 <toggle-button class="float-right" :labels="{checked: 'ON', uncheked: 'OFF'}"/>
              </div>   -->

            <hr />
          </div>
           <div>
            <span>FIRST LEVEL INDUSTRY DEVELOPMENT APPROVAL</span>
            <button
              v-b-toggle.collapse-2
              type="button"
              class="float-right btn-fill btn-md"
              v-on:click="ID"
            >
              <i class="fa fa-edit"></i>
            </button>
            <!-- <div class="col-8">
                 <toggle-button class="float-right" :labels="{checked: 'ON', uncheked: 'OFF'}"/>
              </div>   -->

            <hr />
          </div>
          <div>
            <span>SECOND LEVEL INDUSTRY DEVELOPMENT APPROVAL</span>
            <button
              v-b-toggle.collapse-2
              type="button"
              class="float-right btn-fill btn-md"
              v-on:click="GMID"
            >
              <i class="fa fa-edit"></i>
            </button>
            <!-- <div class="col-8">
                 <toggle-button class="float-right" :labels="{checked: 'ON', uncheked: 'OFF'}"/>
              </div>   -->

            <hr />
          </div>
           <div>
            <span>FIRST LEVEL PROFESSIONAL DEVELOPMENT APPROVAL</span>
            <button
              v-b-toggle.collapse-2
              type="button"
              class="float-right btn-fill btn-md"
              v-on:click="PD"
            >
              <i class="fa fa-edit"></i>
            </button>
            <!-- <div class="col-8">
                 <toggle-button class="float-right" :labels="{checked: 'ON', uncheked: 'OFF'}"/>
              </div>   -->

            <hr />
          </div>
          <div>
            <span>SECOND LEVEL PROFESSIONAL DEVELOPMENT APPROVAL</span>
            <button
              v-b-toggle.collapse-2
              type="button"
              class="float-right btn-fill btn-md"
              v-on:click="GMPD"
            >
              <i class="fa fa-edit"></i>
            </button>
            <!-- <div class="col-8">
                 <toggle-button class="float-right" :labels="{checked: 'ON', uncheked: 'OFF'}"/>
              </div>   -->

            <hr />
          </div>
           <div>
            <span>FIRST LEVEL RESEARCH AND ANALYTICS APPROVAL</span>
            <button
              v-b-toggle.collapse-2
              type="button"
              class="float-right btn-fill btn-md"
              v-on:click="RNA"
            >
              <i class="fa fa-edit"></i>
            </button>
            <!-- <div class="col-8">
                 <toggle-button class="float-right" :labels="{checked: 'ON', uncheked: 'OFF'}"/>
              </div>   -->

            <hr />
          </div>
          <div>
            <span>SECOND LEVEL RESEARCH AND ANALYTICS APPROVAL</span>
            <button
              v-b-toggle.collapse-2
              type="button"
              class="float-right btn-fill btn-md"
              v-on:click="GMRNA"
            >
              <i class="fa fa-edit"></i>
            </button>
            <!-- <div class="col-8">
                 <toggle-button class="float-right" :labels="{checked: 'ON', uncheked: 'OFF'}"/>
              </div>   -->

            <hr />
          </div>
           <div>
            <span>FIRST LEVEL IT PROJECT MANAGEMENT SYSTEM AND METHOD APPROVAL</span>
            <button
              v-b-toggle.collapse-2
              type="button"
              class="float-right btn-fill btn-md"
              v-on:click="IT"
            >
              <i class="fa fa-edit"></i>
            </button>
            <!-- <div class="col-8">
                 <toggle-button class="float-right" :labels="{checked: 'ON', uncheked: 'OFF'}"/>
              </div>   -->

            <hr />
          </div>
          <div>
            <span>SECOND LEVEL IT PROJECT MANAGEMENT SYSTEM AND METHOD APPROVAL</span>
            <button
              v-b-toggle.collapse-2
              type="button"
              class="float-right btn-fill btn-md"
              v-on:click="GMIT"
            >
              <i class="fa fa-edit"></i>
            </button>
            <!-- <div class="col-8">
                 <toggle-button class="float-right" :labels="{checked: 'ON', uncheked: 'OFF'}"/>
              </div>   -->

            <hr />
          </div>
           <div>
            <span>FIRST LEVEL FINANCE APPROVAL</span>
            <button
              v-b-toggle.collapse-2
              type="button"
              class="float-right btn-fill btn-md"
              v-on:click="finance"
            >
              <i class="fa fa-edit"></i>
            </button>
            <!-- <div class="col-8">
                 <toggle-button class="float-right" :labels="{checked: 'ON', uncheked: 'OFF'}"/>
              </div>   -->

            <hr />
          </div>
          <div>
            <span>SECOND LEVEL FINANCE APPROVAL</span>
            <button
              v-b-toggle.collapse-2
              type="button"
              class="float-right btn-fill btn-md"
              v-on:click="GMfinance"
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
  data() {
    return {
      visibleBlockDuration: false,
      visibleLogin: false,
      visibleRegDep: false,
    };
  },

  methods: {
    back() {
      this.$router.push("/fimm/approval-mainList");
    }, // back button
  RD() {
      this.$router.push("/fimm/circular-HodRdReview");
    },
    GMRD() {
      this.$router.push("/fimm/circular-GmRdReview");
    },
    LRA() {
      this.$router.push("/fimm/circular-HodLRAReview");
    },
   GMLRA() {
      this.$router.push("/fimm/circular-GmLRAReview");
    },
    supervision() {
      this.$router.push("/fimm/circular-HodSupervisionReview");
    },
    GMsupervision() {
      this.$router.push("/fimm/circular-GmSupervisionReview");
    },
    ID() {
      this.$router.push("/fimm/circular-HodIdReview");
    },
    GMID() {
      this.$router.push("/fimm/circular-GmIdReview");
    },
    PD() {
      this.$router.push("/fimm/circular-HodPdReview");
    },
    GMPD() {
      this.$router.push("/fimm/circular-GmPdReview");
    },
    GMRNA() {
      this.$router.push("/fimm/circular-GmRnaReview");
    },
    RNA() {
      this.$router.push("/fimm/circular-HodRnaReview");
    },
    IT() {
      this.$router.push("/fimm/circular-HodItReview");
    },
    GMIT() {
      this.$router.push("/fimm/circular-GmItReview");
    },
    finance() {
      this.$router.push("/fimm/circular-HodFinanceReview");
    },
    GMfinance() {
      this.$router.push("/fimm/circular-GmFinanceReview");
    },

  },
};
</script>

<style lang="scss">
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
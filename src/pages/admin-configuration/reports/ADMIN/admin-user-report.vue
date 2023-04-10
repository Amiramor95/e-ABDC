/* eslint-disable no-unused-expressions */
<template>
  <va-card>
    <h4 slot="header" class="card-title">
      <i class="va-icon app-sidebar-link__item-icon fa fa-gear"></i
      >&nbsp;&nbsp;List of User
    </h4>
    <br />
    <div>
      <!-- <div class="content"> -->
      <div>
        <div class="ml-5">
          <!-- list -->
          <loder v-show="isLoader" />
          <div
            class="text-center text-danger my-2 align-center"
            v-if="!isDataReady"
          >
            <b-spinner class="align-middle"></b-spinner>
            <strong>Loading...</strong>
          </div>
          <div v-html="legacySystemHTML" id="KOOL" v-else></div>
        </div>
      </div>
      <!-- </div> -->
    </div>
    <br />
    <br />
    <button @click="back" type="button" class="btn btn-primary btn-fill btn-md">
      <i class="fa fa-step-backward" /> &nbsp; Previous
    </button>
  </va-card>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import Vue from "vue";
import "vue-form-generator/dist/vfg.css";
import Vudal from "vudal";
import * as servicesModule0 from "../../../../app/module0/services02";
import Tabs from "vue-tabs-with-active-line";
import { debounce } from "lodash";
import loder from "../../../request_loader";
const TABS = [
  //   { title: 'Setting 1 : Account Code', value: 'tab1' },
];

export default {
  mounted() {
    this.userdata = JSON.parse(localStorage.getItem("user"));
    this.getCasUtcTaggingListReport();
  },
  components: {
    Tabs,
    Vudal,
    loder,
  },

  data() {
    return {
      term: null,
      isDataReady: false,
      isDisable: false,
      isLoader: false,
      perPage: 10,
      // ReportList:{},
      userdata: {},
      legacySystemHTML: ``,
      setReportList: null,
      model: {
        // TAB 1
        SYSTEM_INFORMATION_ID: "",
        SYSTEM_MAIN_LABEL: "",
        SYSTEM_SUB_LABEL: "",
        PARAM_VALUE: "",

        editList: {
          SYSTEM_MAIN_LABEL: "",
          SYSTEM_SUB_LABEL: "",
          PARAM_VALUE: "",
        },
      },
    };
  },

  methods: {
    back() {
      this.$router.push("/fimm/admin-report-main-setting");
    },
    getCasUtcTaggingListReport: async function() {
        const userID=this.userdata.user_id;
         const userTYPE=this.userdata.user_type;
      setTimeout(()=>{
        this.isDataReady = true;
      }, 20000);
        var encodedID = btoa(userID+'/'+userTYPE);
        this.legacySystemHTML = `<iframe id="report1" src="`+Vue.config.KoolServerURL+`adminuserlist?q=`+ encodedID +`" width="100%" ></iframe>`;

    },
  },
};
</script>
<style lang="scss">
.default-tabs {
  position: relative;
  margin: 0 auto;

  &__item {
    display: inline-block;
    margin: 0 5px;
    padding: 10px;
    padding-bottom: 8px;
    font-size: 16px;
    letter-spacing: 0.8px;
    color: gray;
    text-decoration: none;
    border: none;
    background-color: transparent;
    border-bottom: 2px solid transparent;
    cursor: pointer;
    transition: all 0.25s;

    &__active {
      color: black;
    }

    &:hover {
      border-bottom: 2px solid gray;
      color: black;
    }

    &:focus {
      outline: none;
      border-bottom: 2px solid gray;
      color: black;
    }

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }
  }

  &__active-line {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    background-color: black;
    transition: transform 0.4s ease, width 0.4s ease;
  }
}

.content {
  margin-top: 30px;
  font-size: 20px;
}

.inline {
  display: inline-flex;
  float: right;
}
.col-md-8 .field-wrap {
  display: inline-flex;
  //float: right;
  width: 70%;
}
.form-group label {
  width: 25%;
}
.card-title {
  text-transform: uppercase;
}
.table thead th {
  border-bottom: 2px solid #000 !important;
}
iframe {
  height: 110vh;
  border: none;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  word-wrap: break-word;
  background-color: #ffffff;
  position: relative;
  overflow: hidden;
  box-shadow: rgba(52, 56, 85, 0.25) 0px 2px 3px 0px;
 // padding-bottom: 20px;
}

/* Absolute Center Spinner */
.loading {
  position: fixed;
  z-index: 999;
  height: 2em;
  width: 2em;
  overflow: show;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

/* Transparent Overlay */
.loading:before {
  content: "";
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(rgba(20, 20, 20, 0.8), rgba(0, 0, 0, 0.8));

  background: -webkit-radial-gradient(
    rgba(20, 20, 20, 0.8),
    rgba(0, 0, 0, 0.8)
  );
}

/* :not(:required) hides these rules from IE9 and below */
.loading:not(:required) {
  /* hide "loading..." text */
  font: 0/0 a;
  color: transparent;
  text-shadow: none;
  background-color: transparent;
  border: 0;
}

.loading:not(:required):after {
  content: "";
  display: block;
  font-size: 10px;
  width: 1em;
  height: 1em;
  margin-top: -0.5em;
  -webkit-animation: spinner 150ms infinite linear;
  -moz-animation: spinner 150ms infinite linear;
  -ms-animation: spinner 150ms infinite linear;
  -o-animation: spinner 150ms infinite linear;
  animation: spinner 150ms infinite linear;
  border-radius: 0.5em;
  -webkit-box-shadow: rgba(255, 255, 255, 0.75) 1.5em 0 0 0,
    rgba(255, 255, 255, 0.75) 1.1em 1.1em 0 0,
    rgba(255, 255, 255, 0.75) 0 1.5em 0 0,
    rgba(255, 255, 255, 0.75) -1.1em 1.1em 0 0,
    rgba(255, 255, 255, 0.75) -1.5em 0 0 0,
    rgba(255, 255, 255, 0.75) -1.1em -1.1em 0 0,
    rgba(255, 255, 255, 0.75) 0 -1.5em 0 0,
    rgba(255, 255, 255, 0.75) 1.1em -1.1em 0 0;
  box-shadow: rgba(255, 255, 255, 0.75) 1.5em 0 0 0,
    rgba(255, 255, 255, 0.75) 1.1em 1.1em 0 0,
    rgba(255, 255, 255, 0.75) 0 1.5em 0 0,
    rgba(255, 255, 255, 0.75) -1.1em 1.1em 0 0,
    rgba(255, 255, 255, 0.75) -1.5em 0 0 0,
    rgba(255, 255, 255, 0.75) -1.1em -1.1em 0 0,
    rgba(255, 255, 255, 0.75) 0 -1.5em 0 0,
    rgba(255, 255, 255, 0.75) 1.1em -1.1em 0 0;
}

/* Animation */

@-webkit-keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@-moz-keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@-o-keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>

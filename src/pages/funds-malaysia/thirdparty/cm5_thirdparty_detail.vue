<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <va-card
            class="strpied-tabled-with-hover"
            body-classes="table-full-width table-responsive"
          >
            <div>
              <h4 slot="header" class="card-title">
                3rd Party Company Details
              </h4>
              <div>
                <div>
                  <div>
                    <br />
                    <table class="table table-striped">
                      <tbody>
                        <tr>
                          <td style="width: 20%">Company Name</td>
                          <td style="width: 1%">:</td>
                          <td>
                            <div v-if="TPDetailData.COMP_NAME != NULL">
                              {{ TPDetailData.COMP_NAME }}
                            </div>
                            <div v-else>-</div>
                          </td>
                        </tr>
                        <tr>
                          <td style="width: 20%">
                            Company Registration Number
                          </td>
                          <td style="width: 1%">:</td>
                          <td>
                            <div v-if="TPDetailData.COMP_REGI_NUM1 != NULL">
                              {{ TPDetailData.COMP_REGI_NUM1 }}
                            </div>
                            <div v-else>-</div>
                          </td>
                        </tr>
                        <tr>
                          <td style="width: 20%">Date Of Incorporation</td>
                          <td style="width: 1%">:</td>
                          <td>
                          <div v-if="TPDetailData.COMP_DATE_INCORP != NULL">
                            {{ TPDetailData.COMP_DATE_INCORP }}
                          </div>
                          <div v-else>-</div>
                          </td>
                        </tr>
                        <tr>
                          <td style="width: 20%">Company Registration Type</td>
                          <td style="width: 1%">:</td>
                          <td>
                          <div v-if="TPDetailData.COMP_TYPE != NULL">
                            <div v-if="TPDetailData.COMP_TYPE == 1">Local</div>
                            <div v-else-if="TPDetailData.COMP_TYPE == 2">
                              Non Local
                            </div>
                          </div>
                          </td>
                        </tr>
                        <tr>
                          <td style="width: 20%">Address</td>
                          <td style="width: 1%">:</td>
                          <td>
                            {{ TPDetailData.COMP_ADDR_LINE1 }}+{{
                              TPDetailData.COMP_ADDR_LINE2
                            }}+{{ TPDetailData.COMP_ADDR_LINE3 }}
                          </td>
                        </tr>
                          <tr>
                          <td style="width: 20%">City</td>
                          <td style="width: 1%">:</td>
                          <td>
                            <div>
                            {{ TPDetailData.OMP_ADDR_CITY_ALT }}
                            </div>
                            <div>{{ TPDetailData.CITY }}</div>
                            </td>
                        </tr>
                        <tr>
                          <td style="width: 20%">Postcode</td>
                          <td style="width: 1%">:</td>
                          <td>
                            <div>
                            {{ TPDetailData.COMP_ADDR_POSTALCODE_ALT }}
                            </div>
                            <div>{{ TPDetailData.POSTCODE }}</div>
                          </td>
                        </tr>

                        <tr>
                          <td style="width: 20%">State</td>
                          <td style="width: 1%">:</td>
                          <td>
                            <div>
                              {{ TPDetailData.COMP_ADDR_STATE_ALT }}
                            </div>
                            <div>{{ TPDetailData.STATE }}</div>
                          </td>
                        </tr>
                        <tr>
                          <td style="width: 20%">Country</td>
                          <td style="width: 1%">:</td>
                          <td>{{ TPDetailData.COUNTRY }}</td>
                        </tr>
                        <tr>
                          <td style="width: 20%">Telephone Number</td>
                          <td style="width: 1%">:</td>
                          <td>
                            <div
                              v-if="TPDetailData.COMP_CONT_TELEPHONE != NULL"
                            >
                              01{{ TPDetailData.COMP_CONT_TELEPHONE }}
                            </div>
                            <div v-else>-</div>
                          </td>
                        </tr>
                        <tr>
                          <td style="width: 20%">Fax Number</td>
                          <td style="width: 1%">:</td>
                          <td>
                            <div v-if="TPDetailData.COMP_CONT_FAX != NULL">
                              0{{ TPDetailData.COMP_CONT_FAX }}
                            </div>
                            <div v-else>-</div>
                          </td>
                        </tr>
                        <tr>
                          <td style="width: 20%">Email Address</td>
                          <td style="width: 1%">:</td>
                          <td>
                            <div v-if="TPDetailData.COMP_CONT_EMAIL != NULL">
                              {{ TPDetailData.COMP_CONT_EMAIL }}
                            </div>
                            <div v-else>-</div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </va-card>
          <br /><br /><br />
          <va-card>
            <button
              @click="back"
              type="button"
              class="btn btn-primary btn-fill float-left btn-md"
            >
              <i class="fa fa-step-backward" /> &nbsp; Previous
            </button>
            <!-- data : {{ this.approvalData }} -->

          </va-card>
        </div>
        <br />
      </div>
    </div>
  </div>
</template>

<script>
import VueFormGenerator from "vue-form-generator";
import "vue-form-generator/dist/vfg.css";
import Vue from "vue";
import Tabs from "vue-tabs-with-active-line";
import moment from "moment";
import { debounce } from "lodash";
import * as servicesModule5 from "../../../app/module5/services";
import * as services6Module0 from "../../../app/module5/services06";

const TABS = [
  {
    title: "Training Provider Profile",
    value: "tab1",
  },
];
export default {
  mounted() {
    this.getThirdPartyDetail();
    conosle.log(this.TPDetailData);
  },
  props: {
    TPDetailData: {},
  },
  methods: {
    getThirdPartyDetail: async function () {
      const tp = localStorage.getItem("TRP");
      const response = await servicesModule5
        .getThirdPartyDetail(JSON.parse(tp).TP_COMP_ID)
        .then((res) => {
          this.TPDetailData = res;
          console.log(this.TRP);
        });
    },
    back() {
      this.$router.go(-1);
    },
    handleClick(newTab) {
      this.currentTab = newTab;
    },
  },

  computed: {},

  data() {
    return {
      approvalData:"",
      TRP: "",
      model: {
        comment: "",
        Remark: "",
        fileUpload: "",
        file: [],
      },
      schema: {
        fields: [
          {
            type: "textArea",
            label: "ID Review",
            model: "comment",
            hint: "Max 500 characters",
            max: 500,
            rows: 5,
            placeholder: "Enter Remark",
            styleClasses: "col-md-12",
            required: true,
            validator: "string",
          },
        ],
      },
      schemaDisabled: {
        fields: [
          {
            type: "textArea",
            label: "ID Review",
            model: "comment",
            max: 500,
            rows: 5,
            styleClasses: "col-md-12",
            disabled: true,
          },
        ],
      },
      formOptions: {
        validateAfterChanged: true,
      },
    };
  },
};
</script>

<!-- New step! Add Multiselect CSS. Can be added as a static asset or inside a component. -->
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss">
.display-inline label {
  display: inline !important;
  padding: 5px;
}
.app-layout__main {
  background: #e8e8e8;
}
.container {
  max-width: 620px;
  min-width: 420px;
  margin: 40px auto;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.9em;
  color: #888;
}

/* Style the tabs */
.tabs {
  overflow: hidden;
  margin-left: 20px;
  margin-bottom: -2px; // hide bottom border
}

.tabs ul {
  list-style-type: none;
  margin-left: 20px;
}

.tabs a {
  float: left;
  cursor: pointer;
  padding: 12px 24px;
  transition: background-color 0.2s;
  border: 1px solid #ccc;
  border-right: none;
  background-color: #f1f1f1;
  border-radius: 10px 10px 0 0;
  font-weight: bold;
}
.tabs a:last-child {
  border-right: 1px solid #ccc;
}

/* Change background color of tabs on hover */
.tabs a:hover {
  background-color: #aaa;
  color: #fff;
}

/* Styling for active tab */
.tabs a.active {
  background-color: #fff;
  color: #484848;
  border-bottom: 2px solid #fff;
  cursor: default;
}

/* Style the tab content */
.tabcontent {
  padding: 30px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 3px 3px 6px #e1e1e1;
}
</style>
<style scoped>
.widthModal {
  width: 80%;
}
.width {
  width: 100%;
}
.widthName {
  width: 5%;
}
</style>
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
</style>

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
                Training Provider Details
              </h4>
              <div>
                <tabs
                  :tabs="tabs"
                  :currentTab="currentTab"
                  :wrapper-class="'default-tabs'"
                  :tab-class="'default-tabs__item'"
                  :tab-active-class="'default-tabs__item_active'"
                  :line-class="'default-tabs__active-line'"
                  @onClick="handleClick"
                />
                <div>
                  <div v-if="currentTab === 'tab1'">
                    <br />
                    <table class="table table-striped">
                      <tbody>
                        <tr>
                          <td style="width: 20%">Company Name</td>
                          <td style="width: 1%">:</td>
                          <td>{{ TRP.TP_NAME }}</td>
                        </tr>
                        <tr>
                          <td style="width: 20%">Company Registration No.</td>
                          <td style="width: 1%">:</td>
                          <td v-if="TRP.TP_REG_NO == null">-</td>
                          <td v-if="TRP.TP_REG_NO != null">
                            {{ TRP.TP_REG_NO }}
                          </td>
                        </tr>
                        <tr>
                          <td style="width: 20%">
                            New Company Registration No.
                          </td>
                          <td style="width: 1%">:</td>
                          <td v-if="TRP.TP_NEW_REG_NO == null">-</td>
                          <td v-if="TRP.TP_NEW_REG_NO != null">
                            {{ TRP.TP_NEW_REG_NO }}
                          </td>
                        </tr>
                        <tr>
                          <td style="width: 20%">Address</td>
                          <td style="width: 1%">:</td>
                          <td>
                            {{
                              TRP.TP_ADDRESS_1 +
                              " " +
                              TRP.TP_ADDRESS_2 +
                              TRP.TP_ADDRESS_3
                            }}
                          </td>
                        </tr>
                        <tr>
                          <td style="width: 20%">Postcode</td>
                          <td style="width: 1%">:</td>
                          <td v-if="TRP.TP_POSTCODE == null">-</td>
                          <td v-if="TRP.TP_POSTCODE != null">
                            {{ TRP.TP_POSTCODE }}
                          </td>
                        </tr>
                        <tr>
                          <td style="width: 20%">City</td>
                          <td style="width: 1%">:</td>
                          <td v-if="TRP.TP_CITY == null">-</td>
                          <td v-if="TRP.TP_CITY != null">
                            {{ TRP.TP_CITY }}
                          </td>
                        </tr>
                        <tr>
                          <td style="width: 20%">State</td>
                          <td style="width: 1%">:</td>
                          <td v-if="TRP.TP_STATE == null">-</td>
                          <td v-if="TRP.TP_STATE != null">
                            {{ TRP.TP_STATE }}
                          </td>
                        </tr>
                        <tr>
                          <td style="width: 20%">Country</td>
                          <td style="width: 1%">:</td>
                          <td v-if="TRP.TP_COUNTRY == null">-</td>
                          <td v-if="TRP.TP_COUNTRY != null">
                            {{ TRP.SET_PARAM }}
                          </td>
                        </tr>
                        <tr>
                          <td style="width: 20%">Telephone Number</td>
                          <td style="width: 1%">:</td>
                          <td v-if="TRP.TP_COMPANY_MOBILE_NO == null">-</td>
                          <td v-if="TRP.TP_COMPANY_MOBILE_NO != null">
                            {{
                              TRP.TP_COMPANY_MOBILE_NO.substring(0, 4) +
                              "-" +
                              TRP.TP_COMPANY_MOBILE_NO.substring(4, 14)
                            }}
                          </td>
                        </tr>
                        <tr>
                          <td style="width: 20%">Fax Number</td>
                          <td style="width: 1%">:</td>
                          <td v-if="TRP.TP_FAX_NO == null">-</td>
                          <td v-if="TRP.TP_FAX_NO != null">
                            {{
                              TRP.TP_FAX_NO.substring(0, 2) +
                              "-" +
                              TRP.TP_FAX_NO.substring(2, 14)
                            }}
                          </td>
                        </tr>
                        <tr>
                          <td style="width: 20%">Email</td>
                          <td style="width: 1%">:</td>
                          <td v-if="TRP.TP_EMAIL == null">-</td>
                          <td v-if="TRP.TP_EMAIL != null">
                            {{ TRP.TP_EMAIL }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div v-if="currentTab === 'tab2'">
                    <br />
                    <div>
                      <br />
                      <table class="table table-striped">
                        <tbody>
                          <tr>
                            <td style="width: 20%">Name</td>
                            <td style="width: 1%">:</td>
                            <td v-if="TRP.TP_CEO_NAME == null">-</td>
                            <td v-if="TRP.TP_CEO_NAME != null">
                              {{ TRP.TP_CEO_NAME }}
                            </td>
                          </tr>
                          <tr>
                            <td style="width: 20%">Citizenship</td>
                            <td style="width: 1%">:</td>
                            <td v-if="TRP.TP_CEO_CITIZENSHIP == null">-</td>
                            <td v-if="TRP.TP_CEO_CITIZENSHIP != null">
                              <div v-if="TRP.TP_CEO_CITIZENSHIP == 1">
                                Malaysian
                              </div>
                              <div v-if="TRP.TP_CEO_CITIZENSHIP == 2">
                                Non - Malaysian
                              </div>
                            </td>
                          </tr>
                          <tr v-if="TRP.TP_CEO_CITIZENSHIP == 1">
                            <td style="width: 20%">NRIC No</td>
                            <td style="width: 1%">:</td>
                            <td v-if="TRP.TP_CEO_NRIC == null">-</td>
                            <td v-if="TRP.TP_CEO_NRIC != null">
                              {{
                                TRP.TP_CEO_NRIC.substring(0, 6) +
                                "-" +
                                TRP.TP_CEO_NRIC.substring(6, 8) +
                                "-" +
                                TRP.TP_CEO_NRIC.substring(8, 13)
                              }}
                            </td>
                          </tr>
                          <div v-if="TRP.TP_CEO_CITIZENSHIP == 2">
                            <tr>
                              <td style="width: 20%">Passport No</td>
                              <td style="width: 1%">:</td>
                              <td v-if="TRP.TP_CEO_PASSPORT_NO == null">-</td>
                              <td v-if="TRP.TP_CEO_PASSPORT_NO != null">
                                {{ TRP.TP_CEO_PASSPORT_NO }}
                              </td>
                            </tr>
                            <tr>
                              <td style="width: 20%">Passport Expiry Date</td>
                              <td style="width: 1%">:</td>
                              <td v-if="TRP.TP_CEO_PASSPORT_EXPIRY == null">
                                -
                              </td>
                              <td v-if="TRP.TP_CEO_PASSPORT_EXPIRY != null">
                                {{ TRP.TP_CEO_PASSPORT_EXPIRY }}
                              </td>
                            </tr>
                          </div>

                          <tr>
                            <td style="width: 20%">Position</td>
                            <td style="width: 1%">:</td>
                            <td v-if="TRP.TP_CEO_POSITION == null">-</td>
                            <td v-if="TRP.TP_CEO_POSITION != null">
                              {{ TRP.TP_CEO_POSITION }}
                            </td>
                          </tr>
                          <tr>
                            <td style="width: 20%">Email</td>
                            <td style="width: 1%">:</td>
                            <td v-if="TRP.TP_CEO_EMAIL == null">-</td>
                            <td v-if="TRP.TP_CEO_EMAIL != null">
                              {{ TRP.TP_CEO_EMAIL }}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div v-if="currentTab === 'tab3'">
                    <br />
                    <table class="table table-striped">
                      <tbody>
                        <tr>
                          <td>
                            <vue-form-generator
                              :model="model"
                              :schema="fileUploadSchema"
                              :options="formOptions"
                              ref="fileUploadForm"
                            >
                            </vue-form-generator>
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
            <h4 slot="header" class="card-title">Application Approval</h4>
            <div v-if="TRP.TS_PARAM != 'ACTIVE' && TRP.TS_PARAM != 'RETURNED'">
              <vue-form-generator
                :model="model"
                :schema="schema"
                :options="formOptions"
                ref="ReviewRemark"
              ></vue-form-generator>
            </div>
            <div v-if="TRP.TS_PARAM == 'ACTIVE'">
              <vue-form-generator
                :model="model"
                :schema="schemaDisabled"
                :options="formOptions"
                ref="ReviewRemark"
              ></vue-form-generator>
            </div>
            <div v-if="TRP.TS_PARAM == 'RETURNED'">
              <vue-form-generator
                :model="model"
                :schema="schemaDisabled"
                :options="formOptions"
                ref="ReviewRemark"
              ></vue-form-generator>
            </div>
            <br />
            <button
              @click="back"
              type="button"
              class="btn btn-primary btn-fill float-left btn-md"
            >
              <i class="fa fa-step-backward" /> &nbsp; Previous
            </button>
            <div v-if="TRP.TS_PARAM != 'ACTIVE' && TRP.TS_PARAM != 'RETURNED'">
              <button
                @click="submit"
                type="button"
                class="ml-2 btn btn-success btn-fill float-right btn-md"
              >
                <i class="fa fa-paper-plane" /> &nbsp; Approve
              </button>
              <button
                @click="returnCase"
                type="button"
                class="ml-2 btn btn-warning btn-fill float-right btn-md"
              >
                <i class="fa fa-reply" /> &nbsp; Return
              </button>
              <button
                @click="saveAsDraft"
                type="button"
                class="ml-2 btn btn-info btn-fill float-right btn-md"
              >
                <i class="fa fa-pencil-square-o" /> &nbsp; Save as draft
              </button>
            </div>
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
  {
    title: "CEO Profile",
    value: "tab2",
  },
  {
    title: "Uploaded Document",
    value: "tab3",
  },
];
export default {
  props: {
    TRP: {},
  },
  mounted() {
    this.getDocumentById();
    this.getRemark();
    // if (this.TRP.TS_PARAM == 'ACTIVE' || this.TRP.TS_PARAM == 'RETURNED'){

    // }
  },
  components: {
    Tabs,
  },

  methods: {
    getRemark: async function () {
      const trp = localStorage.getItem("TRP");
      const response = await servicesModule5.getApprovalRemarkTRP(
        JSON.parse(trp).TP_USER_COMP_ID
      );

      this.model.comment = response.APPR_REMARK;
    },
    getDocumentById: async function () {
      const trp = localStorage.getItem("TRP");
      const response = await servicesModule5.getDocumentById(
        JSON.parse(trp).TP_USER_COMP_ID
      );
      response.forEach((element) => {
        console.log(element.DOCU_BLOB);
        element.DOCU_BLOB = this.b64toBlobPDF(
          element.DOCU_BLOB,
          "application/pdf"
        );
        console.log("mula");
        console.log(element.DOCU_BLOB); // <----- cuba tgk ini
        console.log("habis");
        element.DOCU_BLOB = new File(
          [element.DOCU_BLOB],
          element.DOCU_ORIGINAL_NAME + "." + element.DOCU_FILETYPE,
          { type: element.DOCU_BLOB.type }
        );
        console.log(element.DOCU_BLOB);
        const data = {
          name: element.DOCU_ORIGINAL_NAME + "." + element.DOCU_FILETYPE,
          size: element.DOCU_FILESIZE,
          type: element.DOCU_FILETYPE,
          ext: "exe",
          url: window.URL.createObjectURL(element.DOCU_BLOB),
        };

        this.file = element.DOCU_BLOB;
        //alert(JSON.stringify(element.DOC_BLOB));
        this.model.file.push(data);
        //alert(JSON.stringify(data));
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

      console.log(byteArrays);

      return new File(byteArrays, "pot", { type: contentType });
    },
    back() {
      this.$router.go(-1);
    },
    handleClick(newTab) {
      this.currentTab = newTab;
    },
    saveAsDraft: async function () {
      const data = new FormData();
      const user = localStorage.getItem("user");
      const trp = localStorage.getItem("TRP");
      data.append("TP_USER_COMP_ID", JSON.parse(trp).TP_USER_COMP_ID);
      data.append("APPR_REMARK", this.model.comment);
      data.append("APPR_PUBLISH_STATUS", 0);
      data.append("CREATE_BY", JSON.parse(user).user_id);
      data.append("TS_ID", 1);
      // const approvalLevel = await services06Module0.getApprovalLevel(6, 1);
      // data.append("APPR_LIST", JSON.stringify(approvalLevel));
      try {
        if (confirm("Save as draft for this approval ?")) {
          const response = await servicesModule5.updateApprovalTRPFiMM(data);
          // alert(
          //   "This Training provider registration approval has been save as draft"
          // );
          this.$router.push("/fimm/trp-submission-list");
        }
      } catch (error) {
        console.log(error);
      }
    },
    returnCase: async function () {
      const data = new FormData();
      const user = localStorage.getItem("user");
      const trp = localStorage.getItem("TRP");
      data.append("TP_USER_COMP_ID", JSON.parse(trp).TP_USER_COMP_ID);
      data.append("APPR_REMARK", this.model.comment);
      data.append("APPR_PUBLISH_STATUS", 1);
      data.append("TS_ID", 9);
      data.append("CREATE_BY", JSON.parse(user).user_id);
      // const approvalLevel = await services06Module0.getApprovalLevel(6, 2)
      // data.append('APPR_LIST', JSON.stringify(approvalLevel))
      try {
        if (
          confirm("Confirm to return this training provider registration ?")
        ) {
          const response = await servicesModule5.updateApprovalTRPFiMM(data);
          // alert("Training Provider Registration Returned");
          this.$router.push("/fimm/trp-submission-list");
        }
      } catch (error) {
        console.log(error);
      }
    },
    rejectCase: async function () {
      const data = new FormData();
      const user = localStorage.getItem("user");
      const trp = localStorage.getItem("TRP");
      data.append("TP_USER_COMP_ID", JSON.parse(trp).TP_USER_COMP_ID);
      data.append("APPR_REMARK", this.model.comment);
      data.append("APPR_PUBLISH_STATUS", 1);
      data.append("TS_ID", 5);
      data.append("CREATE_BY", JSON.parse(user).user_id);
      // const approvalLevel = await services6Module0.getApprovalLevel(6, 1);
      // data.append("APPR_LIST", JSON.stringify(approvalLevel));
      try {
        if (
          confirm("Confirm to reject this training provider registration ?")
        ) {
          const response = await servicesModule5.updateApprovalTRPFiMM(data);
          // alert("Training Provider Registration Rejected");
          this.$router.push("/fimm/trp-submission-list");
        }
      } catch (error) {
        console.log(error);
      }
    },
    submit: async function () {
      const data = new FormData();
      const user = localStorage.getItem("user");
      const trp = localStorage.getItem("TRP");
      data.append("TP_USER_COMP_ID", JSON.parse(trp).TP_USER_COMP_ID);
      data.append("APPR_REMARK", this.model.comment);
      data.append("APPR_PUBLISH_STATUS", 1);
      data.append("TS_ID", 3);
      data.append("CREATE_BY", JSON.parse(user).user_id);
      // const approvalLevel = await services06Module0.getApprovalLevel(6, 1);
      // data.append("APPR_LIST", JSON.stringify(approvalLevel));
      try {
        if (
          confirm("Confirm to approve this training provider registration ?")
        ) {
          const response = await servicesModule5.updateApprovalTRPFiMM(data);
          // alert("Training provider registration approved");
          this.$router.push("/fimm/trp-submission-list");
        }
      } catch (error) {
        console.log(error);
      }
    },
  },

  computed: {},

  data() {
    return {
      documentIdArray: [],
      uploadFileOject: [],

      tabs: TABS,
      currentTab: "tab1",

      model: {
        comment: "",
        Remark: "",
        fileUpload: "",
        file: [],
      },
      fileUploadSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                labels: "Form 49",
                accept: ".pdf",
                multiple: false,
                text: "Choose a File",
                model: "file",
                type: "vfg-custom-file-view",
                styleClasses: "col-md-12",
                required: false,
                disabled: true,
              },
            ],
          },
        ],
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

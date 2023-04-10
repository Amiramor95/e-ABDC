<template>
  <div>
    <div v-if="dataUploadReady">
      <div class="text-center text-danger my-2">
        <b-spinner class="align-middle"></b-spinner>
        <strong>Loading...</strong>
      </div>
    </div>
    <div v-else>
      <b-collapse id="collapse-3" class="mt-2" v-model="visible">
        <b-row class="justify-content-end">
          <b-col cols="3">
            <va-input
              :value="termSearch"
              :placeholder="$t('Search')"
              @input="search"
              removable
            >
              <va-icon name="fa fa-search" slot="prepend" />
            </va-input>
          </b-col>
          <b-col cols="3">
            <div class="input-group">
              <va-date-picker
                :value="termDate"
                @input="searchDate"
                :config="{ enableTime: false, dateFormat: 'd-m-Y' }"
                v-model="dateFormat"
                placeholder="Search date"
              />
              <div class="input-group-append">
                <button
                  @click.prevent="clear"
                  type="button"
                  class="btn btn-md btn-primary"
                >
                  <va-icon name="fa fa-refresh" />
                </button>
              </div>
            </div>
          </b-col>
        </b-row>
        <va-data-table
          :fields="fields"
          :data="filterData"
          no-data-label="No data found"
          :per-page="perPage"
          :datacount="count"
          :dataperpage="perPage"
          clickable
        >
          <template slot="no" slot-scope="row">
            {{ row.rowIndex + 1 }}
          </template>
          <template slot="DATE" slot-scope="props">
            {{ formatDate(new Date(props.rowData.DATE)) }}
          </template>
          <template slot="NRIC_NUMBER" slot-scope="props">
            {{ formatNRIC(props.rowData.NRIC_NUMBER) }}
          </template>

          <template slot="actions_support_docs" slot-scope="props">
            <!-- view support document -->
            <div
              v-if="props.rowData.DOCUMENT && module && module.PUBLISH_STATUS"
            >
              <span>
                <h4 class="mt-2">
                  <span
                    v-b-tooltip.hover
                    title="View Document"
                    v-on:click="viewPdf(props.rowData.DOCUMENT)"
                    class="badge badge-success mr-2"
                  >
                    <i class="fa fa-file-pdf-o"></i
                  ></span>
                </h4>
              </span>
            </div>
            <!-- edit support document-->
            <form
              id="uploadSupportDocForm"
              v-if="module && !module.PUBLISH_STATUS"
            >
              <VueFileAgent
                ref="vueFileAgent"
                :theme="'list'"
                :multiple="false"
                :deletable="true"
                :meta="true"
                :linkable="true"
                :accept="'.pdf'"
                :maxSize="'2MB'"
                :helpText="'Choose document'"
                :errorText="{
                  type: 'Invalid file type. Only .pdf is Allowed',
                  size: 'Files should not exceed 2MB in size',
                }"
                @select="filesSelectedSupportDoc($event, props.rowData)"
                @beforedelete="onBeforeDeleteSupportDoc($event, props.rowData)"
                v-model="props.rowData.DOCS"
              >
                {{ getDocumentById(props.rowData) }}
              </VueFileAgent>
            </form>
          </template>

          <template
            slot="actions"
            slot-scope="props"
            v-if="module && !module.PUBLISH_STATUS"
          >
            <h4 class="mt-2">
              <span
                v-b-tooltip.hover
                title="Remove"
                v-on:click="removeParticipant(props)"
                class="badge badge-danger mr-2"
              >
                <i class="fa fa-minus"></i
              ></span>
            </h4>
          </template>
        </va-data-table>
      </b-collapse>
    </div>

    <br />
    <div v-if="totalRejected > 0">
      Total Rejected : {{ totalRejected }}
      <button
        type="button"
        class="btn btn-primary btn-fill btn-md"
        @click="downloadRejectedList()"
      >
        Download
      </button>
    </div>
    <br />

    <button @click="back" type="button" class="btn btn-primary btn-fill btn-md">
      <i class="fa fa-step-backward" /> &nbsp; Previous
    </button>
    <div class="float-right" v-if="!module">
      <button
        @click="saveAsDraft"
        type="button"
        class="mr-2 btn btn-info btn-fill btn-md"
      >
        <i class="fa fa-pencil-square-o" /> &nbsp; Save as draft
      </button>
      <button
        @click="submit"
        type="button"
        class="ml-1 btn btn-success btn-fill btn-md"
      >
        <i class="fa fa-paper-plane" /> &nbsp; Submit
      </button>
    </div>
    <div class="float-right" v-else>
      <button
        v-if="!module.PUBLISH_STATUS"
        @click="saveAsDraft"
        type="button"
        class="mr-2 btn btn-info btn-fill btn-md"
      >
        <i class="fa fa-pencil-square-o" /> &nbsp; Save as draft
      </button>
      <button
        v-if="!module.PUBLISH_STATUS"
        @click="submit"
        type="button"
        class="ml-1 btn btn-success btn-fill btn-md"
      >
        <i class="fa fa-paper-plane" /> &nbsp; Submit
      </button>
      <button
        v-if="module.TS_ID == 15"
        @click="returnRecord"
        type="button"
        class="ml-1 btn btn-warning btn-fill btn-md"
      >
        <i class="fa fa-reply" /> &nbsp; Request for return
      </button>
    </div>
  </div>
</template>
<script>
import { debounce } from "lodash";
import * as services06Module0 from "../../../../../app/module0/services06";
export default {
  mounted() {
    this.visible = this.visibleOptionThree;
    this.fpCategory = this.$route.query.fpCategory
  },
  methods: {
    back() {
      // this.$router.push('/distributor/d-fpamModuleList')
      if(this.module){
        this.$router.push(this.backPage)
      }
      else {
        this.$router.go(-1);
      }
    },

    clear() {
      this.dateFormat = null;
      this.termDate = null;
      this.termSearch = null;
      this.clearFilter();
    },
    clearFilter(){
      this.$emit('clear');
    },

    search: debounce(function (value) {
      console.log(value);

      this.termSearch = value;
      this.$emit("filter", value);
    }, 400),

    searchDate: debounce(function (value) {
      console.log(value);

      this.termDate = value;
      this.$emit("filter-date", value);
    }, 400),

    //FUNCTION DATE
    formatDate: function (date) {
      var ms = [
        "JAN",
        "FEB",
        "MAR",
        "APR",
        "MAY",
        "JUN",
        "JUL",
        "AUG",
        "SEP",
        "OCT",
        "NOV",
        "DEC",
      ];
      return (
        date.getDate() + " " + ms[date.getMonth()] + " " + date.getFullYear()
      );
    },

    formatNRIC: function (nric) {
      let newNric = "";
      if (nric) {
        let date = nric.substr(0, 6);
        let state = nric.substr(6, 2);
        let identity = nric.substr(8, 4);
        newNric = date + "-" + state + "-" + identity;
      }
      return newNric;
    },

    async removeParticipant(prop) {
      this.$emit("remove-participant", prop);
    },

    viewPdf(document) {
      this.$emit("view-document", document);
    },

    filesSelectedSupportDoc: async function (
      fileRecordsNewlySelected,
      participant
    ) {
      this.$emit(
        "files-selected-support-doc",
        fileRecordsNewlySelected,
        participant
      );
    },

    onBeforeDeleteSupportDoc: function (fileRecord, participant) {
      this.$emit("on-before-delete-support-doc", fileRecord, participant);
    },

    getDocumentById: async function (data) {
      this.$emit("get-document-by-id", data);
    },

    async downloadRejectedList() {
      this.$emit("download-rejected", this.module.MODULE_ID);
    },

    async saveAsDraft() {
      var r = confirm("Are you sure to save as draft?");
      if (r == true) {
        // Vue.$toast.open({
        //     message: 'Saved As Draft',
        //     type: 'success',
        //   });
        const data = new FormData();
        data.append("TS_ID", 1); // save as draft
        data.append("USER", this.userId);
        data.append("COMPANY_ID", this.companyId);
        data.append("MODULE_ID", this.module.MODULE_ID);

        this.$emit("save-draft", data);
      }
    },

    async submit() {
      var r = confirm("Are you sure to submit?");
      if (r == true) {
        const data = new FormData();
        data.append("TS_ID", 15); // pending
        data.append("CATEGORY", 2);
        data.append("USER", this.userId);
        data.append("COMPANY_ID", this.companyId);
        data.append("MODULE_ID", this.module.MODULE_ID);

        data.append("NOTI_LOCATION", this.notiLocation);
        var remarkEntry =
          "(" + this.remarkTitle + ")New entry pending approval";
        data.append("NOTI_REMARK", remarkEntry);

        const approvalLevel = await services06Module0.getApprovalLevel(14, 3);
        data.append("APPR_LIST1", JSON.stringify(approvalLevel));

        const approvalLevel2 = await services06Module0.getApprovalLevel(14, 2);
        data.append("APPR_LIST2", JSON.stringify(approvalLevel2));

        this.$emit("submit-form", data);
      }
    },

    async returnRecord() {
      if (confirm("Are you sure to return of this submission?")) {
        const data = new FormData();
        data.append("MODULE_ID", this.module.MODULE_ID);
        data.append("TS_ID", 19);
        data.append("NOTI_LOCATION", this.notiLocation);
        var remarkEntry =
          "(" + this.remarkTitle + ")This Entry has been request for return";
        data.append("NOTI_REMARK", remarkEntry);

        const approvalLevel = await services06Module0.getApprovalLevel(13, 1);
        data.append("APPR_LIST1", JSON.stringify(approvalLevel));

        const approvalLevel2 = await services06Module0.getApprovalLevel(13, 2);
        data.append("APPR_LIST2", JSON.stringify(approvalLevel2));

        this.$emit("return-form", data);
      }
    },
  },
  computed: {
    notiLocation() {
      let loc = "";
      if (this.module.MODULE_TYPE == 1) {
        loc = "approvalWritingDistributorList";
      } else if (this.module.MODULE_TYPE == 2) {
        loc = "approvalReadingDistributorList";
      } else if (this.module.MODULE_TYPE == 3) {
        loc = "approvalTeachingDistributorList";
      } else if (this.module.MODULE_TYPE == 4) {
        loc = "approvalAcademicDistributorList";
      } else if (this.module.MODULE_TYPE == 5) {
        loc = "approvalFPDistributorList";
      }

      return loc;
    },
    remarkTitle() {
      let title = "";
      if (this.module.MODULE_TYPE == 1) {
        title = "CPD-Writing";
      } else if (this.module.MODULE_TYPE == 2) {
        title = "CPD-Reading";
      } else if (this.module.MODULE_TYPE == 3) {
        title = "CPD-Teaching";
      } else if (this.module.MODULE_TYPE == 4) {
        title = "CPD-Academic";
      } else if (this.module.MODULE_TYPE == 5) {
        title = "CPD-FP";
      }

      return title;
    },
    backPage() {
      let back = "";
      if (this.module.MODULE_TYPE == 1) {
        back = "/distributor/d-writingModuleList";
      } else if (this.module.MODULE_TYPE == 2) {
        back = "/distributor/d-readingModuleList";
      } else if (this.module.MODULE_TYPE == 3) {
        back = "/distributor/d-teachingModuleList";
      } else if (this.module.MODULE_TYPE == 4) {
        back = "/distributor/d-academicModuleList";
      } else if (this.module.MODULE_TYPE == 5) {
        if(this.fpCategory == 1) {
          back = "/distributor/d-fpamCertifiedModuleList";
        } else if(this.fpCategory == 2) {
          back = "/distributor/d-fpamIslamicModuleList";
        } else if(this.fpCategory == 3) {
          back = "/distributor/d-fpamRegisteredModuleList";
        } else if(this.fpCategory == 4) {
          back = "/distributor/d-fpamShariahModuleList";
        }
      }

      return back;
    },
  },
  data() {
    return {
      termSearch: null,
      termDate: null,
      dateFormat: null,
      visible: false,
      model: {
        file: [],
      },
      fileUploadSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                accept: ".pdf",
                multiple: false,
                text: "Choose a File",
                model: "file",
                type: "vfg-custom-multiple-file",
                styleClasses: "col-md-12 pl-0",
              },
            ],
          },
        ],
      },
      formOptions: {
        validateAfterChanged: true,
      },
      fpCategory: 1
    };
  },
  props: {
    module: {
      // required: true,
      type: Object,
    },
    fields: {
      required: true,
      type: Array,
    },
    filterData: {
      required: true,
      type: Array,
    },
    perPage: {
      required: true,
      type: Number,
    },
    count: {
      required: true,
      type: Number,
    },
    visibleOptionThree: {
      required: true,
      type: Boolean,
    },
    dataUploadReady: {
      required: true,
      type: Boolean,
    },
    totalRejected: {
      type: Number,
    },
    companyId: {
      type: Number,
    },
    userId: {
      type: Number,
    },
  },
};
</script>

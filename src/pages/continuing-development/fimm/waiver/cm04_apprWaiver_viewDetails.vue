<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">Waiver : View Submission</h4>
    </div>
    <br />
    <div v-if="dataUploadReady">
      <div class="text-center text-danger my-2">
        <b-spinner class="align-middle"></b-spinner>
        <strong>Loading...</strong>
      </div>
    </div>
    <div v-else>
      <va-card>
        <div>
          <div>
            <div class="row">
              <div class="flex md2 offset--md10">
                <va-input
                  :value="term"
                  :placeholder="$t('Search')"
                  @input="search"
                  removable
                >
                  <va-icon name="fa fa-search" slot="prepend" />
                </va-input>
              </div>
            </div>
            <va-data-table
              :fields="Fields"
              :data="FilteredData"
              no-data-label="No data found"
              :per-page="parseInt(perPage)"
              :datacount="RecordCount"
              :dataperpage="parseInt(perPage)"
              clickable
            >
              <template slot="no" slot-scope="row">
                {{ row.rowIndex + 1 }}
              </template>
              <template slot="document" slot-scope="row">
                <span>
                  <h4 class="mt-2">
                    <span
                      v-if="row.rowData.DOC_BLOB != '-'"
                      v-b-tooltip.hover
                      title="View Document"
                      v-on:click="viewPdf(row.rowData)"
                      class="badge badge-danger mr-2"
                    >
                      <i class="fa fa-file-pdf-o"></i
                      ></span>
                  </h4>
                </span>
              </template>
            </va-data-table>
          </div>
        </div>
      </va-card>
      <br />
      <br />
      <button
        @click="back"
        type="button"
        class="btn btn-primary btn-fill btn-md"
      >
        <i class="fa fa-step-backward" /> &nbsp; Previous
      </button>
    </div>
  </va-card>
</template>

<script>
  import { debounce } from "lodash";
  import "vue-form-generator/dist/vfg.css";
  import * as servicesModule4 from "../../../../app/module4/services01";

  export default {
    mounted() {
      var data = localStorage.getItem("view-waiver-approval");
      this.WDATA = JSON.parse(data);
      //alert(JSON.stringify(this.WDATA));

      this.getAcceptanceList();
    },
    components: {},

    methods: {
      // searh
      search: debounce(function (term) {
        this.term = term;
        console.log(this.term);
      }, 400),

      async back() {
        this.$router.go(-1);
      },

      getAcceptanceList: async function () {
        const response = await servicesModule4.getWaiverListByWaiverID(
          this.WDATA.WAIVER_ID
        );
        this.CandidateList = response;
        this.RecordCount = this.CandidateList.length;
      },
      viewPdf(document) {
        var byteCharacters = window.atob(document["DOC_BLOB"]);
        var byteNumbers = new Array(byteCharacters.length);
        for (var i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        var byteArray = new Uint8Array(byteNumbers);
        var file = new Blob([byteArray], {
          type: "application/pdf;base64",
        });
        var fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      },
    },

    computed: {
      Fields() {
        return [
          {
            name: "__slot:no",
            title: "NO",
          },
          {
            name: "NAME",
            title: "CONSULTANT NAME",
            sortField: "NAME",
          },
          {
            name: "NRIC_NUMBER",
            title: "NRIC NUMBER",
            sortField: "NRIC_NUMBER",
          },
          {
            name: "PASSPORT_NUMBER",
            title: "PASSPORT NUMBER",
            sortField: "PASSPORT_NUMBER",
          },

          {
            name: "WAIVER_REASON",
            title: "REASON",
            sortField: "WAIVER_REASON",
          },
          {
            name: "__slot:document",
            title: "SUPPORTING DOCUMENT",
          },
          {
            name: "TS_PARAM",
            title: "WAIVER STATUS",
            sortField: "TS_PARAM",
          },
        ];
      },
      FilteredData() {
        if (!this.term || this.term.length < 1) {
          return this.CandidateList;
        }
        return this.CandidateList.filter((item) => {
          return this.term
            .toLowerCase()
            .split(" ")
            .every(
              (v) =>
                item.NAME.toLowerCase().includes(v) ||
                item.NRIC_NUMBER.toLowerCase().includes(v) ||
                item.PASSPORT_NUMBER.toLowerCase().includes(v) ||
                item.WAIVER_REASON.toLowerCase().includes(v) ||
                item.TS_PARAM.toLowerCase().includes(v)
            );
        });
      },
    },

    data() {
      return {
        dataUploadReady: false,
        term: null,
        CandidateList: [],
        perPage: "10",
        currentPage: 1,
        count: 1,
        RecordCount: null,
        WDATA: "",

        model: {},

        formOptions: {
          validateAfterChanged: true,
        },
      };
    },
  };
</script>






<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">
        Pre-Vetting : View Participant List
      </h4>
    </div>
    <br />
    <va-card>
      <div class="ml-2 col-md-12">
        Upload Participant

        <hr />
        <br />
        <div class="ml-1 col-md-12">
          <vue-form-generator
            :model="model"
            :schema="participantUploadSchema"
            :options="formOptions"
            ref="participantUploadForm"
          >
          </vue-form-generator>
          <br />
          <div class="float-right">
            <button
              @click="upload"
              type="button"
              class="ml-1 btn btn-success btn-fill btn-md"
            >
              <i class="fa fa-paper-plane" /> &nbsp; Upload
            </button>
          </div>
        </div>
        <br />
        <br />

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
            :fields="PartFields"
            :data="PartFilteredData"
            no-data-label="No data found"
            :per-page="parseInt(perPage)"
            :datacount="partRecordCount"
            :dataperpage="parseInt(perPage)"
            clickable
          >
            <template slot="no" slot-scope="row">
              {{ row.rowIndex + 1 }}
            </template>

            <template slot="actions" slot-scope="props">
              <h4 class="mt-2">
                <span
                  v-b-tooltip.hover
                  title="delete record"
                  v-on:click="removePart(props.rowData)"
                  class="badge badge-danger mr-2"
                >
                  <i class="fa fa-trash"></i
                ></span>
              </h4>
            </template>
          </va-data-table>
        <div>
          <table class="table table-striped"></table>
          <table class="table table-striped">
            <tbody>
            <tr>
              <td style="width: 20%">
                <b
                >Total Rejected List
                  <downloadExcel
                    :json_data="RejectedList"
                    :excelname="excelname"
                    :sheetname="sheetname"
                    :column="column"
                  ></downloadExcel>
                </b>
              </td>
              <td>:</td>
              <td>{{ this.rejectedCount }}</td>
            </tr>
            </tbody>
          </table>
        </div>

      </div>
    </va-card>
    <br />
    <button @click="back" type="button" class="btn btn-primary btn-fill btn-md">
      <i class="fa fa-step-backward" /> &nbsp; Previous
    </button>
    <div class="float-right">
      <button
        @click="submit"
        type="button"
        class="ml-1 btn btn-success btn-fill btn-md"
      >
        <i class="fa fa-paper-plane" /> &nbsp; Submit
      </button>
    </div>

  </va-card>
</template>

<script>
import { debounce } from "lodash";
import * as servicesModule4 from "../../../../app/module4/services01";
import * as services06Module0 from '../../../../app/module0/services06'


export default {
  props: {},
  mounted() {

    this.getAllParticipant();
    this.getRejectedList();

  },
  components: {},
  methods: {

    getRejectedList: async function () {
      const response = await servicesModule4.getRejectedListByID(
        localStorage.getItem("d-preVettingViewParticipant")
      );
      this.RejectedList = response;
      this.rejectedCount = this.RejectedList.length;
    },

    // searh
    search: debounce(function (term) {
      this.term = term;
      console.log(this.term);
    }, 400),

    //get participant
    getAllParticipant: async function () {
      const response = await servicesModule4.getProgramParticipantByID(
        localStorage.getItem("d-preVettingViewParticipant")
      );
      this.partList = response;
      this.partRecordCount = this.partList.length;
    },

    //participant
    async removePart(data) {
      if (confirm("Are you sure you want to delete this record?")) {
        const response = await servicesModule4.deleteParticipant(
          data.PROG_PARTICIPANT_ID
        );
        this.getAllParticipant();
        this.getRejectedList();

      }
    },

    //upload participant
    async upload() {
      if (confirm("Are you sure you want upload this file?")) {

        const data = new FormData();
        data.append("file", this.model.fileParticipant);
        data.append("PROG_DETAILS_ID", localStorage.getItem("d-preVettingViewParticipant"));

        try {
          const response = await servicesModule4.importExcelPreVetting(data);
          //this.$router.go(-1);
          this.getAllParticipant();
          this.getRejectedList();

        } catch (error) {
          console.log(error);
        }
      }
    },

    submit: async function () {

      if (confirm("Are you sure you want to submit?")) {
        this.dataActionReady = true;

        //upload
        const data = new FormData();

        data.append("PROG_DETAILS_ID",localStorage.getItem("d-preVettingViewParticipant"));

        const responsePart = await servicesModule4.getProgramParticipantByID(
          localStorage.getItem("d-preVettingViewParticipant")
        );

        data.append("PARTLIST", JSON.stringify(responsePart));

        try {
          const response = await servicesModule4.submitPrevettingParticipant(data);
          // this.$router.go(-1);
          this.dataActionReady = false;
          this.getAllParticipant();
          this.getRejectedList();

        } catch (error) {
          console.log(error);
        }
      }
    },


    //general
    back() {
      this.$router.go(-1);
    },
  },
  computed: {
    //PARTICIPANT
    PartFields() {
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
          name: "PENDING_POINT",
          title: "PENDING_POINT",
          sortField: "PENDING_POINT",
        },
        {
          name: "APPROVE_POINT",
          title: "APPROVE_POINT",
          sortField: "APPROVE_POINT",
        },
        {
          name: "REVOKE_POINT",
          title: "REVOKE_POINT",
          sortField: "REVOKE_POINT",
        },
        {
          name: "__slot:actions",
          title: "Action",
          dataClass: "justify-content-center",
          width: "8%",
        },
      ];
    },
    PartFilteredData() {
      if (!this.term || this.term.length < 1) {
        return this.partList;
      }
      return this.partList.filter((item) => {
        return this.term
          .toLowerCase()
          .split(" ")
          .every((v) =>
          item.NAME.toLowerCase().includes(v)||
          item.NRIC_NUMBER.toLowerCase().includes(v)||
          item.PASSPORT_NUMBER.toLowerCase().includes(v)
          );
      });
    },
  },
  data() {
    return {
      term: null,
      perPage: "10",
      currentPage: 1,
      count: 1,
      partRecordCount: null,
      partList: [],

      RejectedList: [],
      rejectedCount: null,
      column: ["NAME", "NRIC_NUMBER", "PASSPORT_NUMBER", "REASON"],
      excelname: "download-RejectedList",
      sheetname: "RejectedList",


      model: {

      },

      participantUploadSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                labels: "Upload Participant",
                accept: ".xlxs",
                multiple: true,
                text: "Choose a File",
                model: "fileParticipant",
                type: "vfg-custom-file-excel",
                styleClasses: "col-md-12",
              },
            ],
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
<style lang="scss">
.va-data-table__pagination {
  margin-top: 1rem;
  display: -webkit-box;
  display: -ms-flexbox;
  display: inherit;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: flex-end;
}

.content {
  margin-top: 30px;
  font-size: 20px;
}
.inline {
  display: inline-flex;
  float: right;
}
.color {
  color: red;
}
</style>

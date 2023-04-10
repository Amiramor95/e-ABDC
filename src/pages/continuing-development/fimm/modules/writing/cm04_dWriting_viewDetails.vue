<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">View Details Module Writing and Publishing Books/Articles</h4>
    </div>
    <DetailSubmittedProgram
      :module="module"
      :participantLists="participantList"
      :route="'f-approvalWritingViewDetailParticipant'"
    />
    <br />
    <!-- 2. list participant -->
    <br />
    <va-card>
      <div class="ml-2 col-md-12">
        List Of Participants
        <hr />
        <br />
        <ParticipantList
          :fields="fields"
          :filter-data="filterData"
          :count="count"
          @view-document="viewPdf"
          @filter="filter"
          @filter-date="filterDate"
        />
        <br />
      </div>
    </va-card>
    <br />
    <!-- Review Section -->
    <va-card>
      <div class="ml-2 col-md-12">
        Approval Section
        <hr />
        <vue-form-generator
          :model="model"
          :schema="reviewSchema"
          :options="formOptions"
          ref="reviewForm"
          @model-updated="onModelUpdated"
        >
        </vue-form-generator>
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
  </va-card>
</template>


<script>
import "vue-form-generator/dist/vfg.css";
import * as services07Module4 from "../../../../../app/module4/services07";
import ParticipantList from "../components/participantList.vue";
import DetailSubmittedProgram from "../../../distributor/modules/components/detailSubmittedProgram.vue";
export default {
  mounted() {
    var data = localStorage.getItem("f-writingViewDetails");
    this.PROGDATA = JSON.parse(data);
    this.getModuleByID(this.PROGDATA.MODULE_ID);
  },
  components: {
    ParticipantList,
    DetailSubmittedProgram,
  },
  methods: {
    filter(value) {
      console.log('filter'+value);
      this.term = value;
    },

    filterDate(value) {
      this.termDate = value;
    },

    viewPdf(document) {
      var byteCharacters = window.atob(document["DOC_BLOB"]);
      var byteNumbers = new Array(byteCharacters.length);
      for (var i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      var file = new Blob([byteArray], { type: "application/pdf;base64" });
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    },

    onModelUpdated(newVal, schema) {
      if (schema == "comment") {
        this.model.comment = String(newVal).toUpperCase();
      }
    },

    getModuleByID: async function (id) {
      const resModule = await services07Module4.getModule(id);
      const resParticipant = await services07Module4.getWritingParticipantList(
        id
      );
      this.module = resModule;
      let remark = resModule.APPR_REMARK;
      this.participantList = resParticipant.data;
      this.dataReady = true;
      if (remark != null) {
        this.model.comment = remark;
      } else if (remark == null) {
        this.model.comment = "";
      }
    },





    async back() {
      // this.$router.go(-1);
      this.$router.push('/fimm/approvalWritingModuleList');
    },

    formatDateTimestampToDate(datetimestamp) {
      var datetimestamp = new Date(datetimestamp);
      var dd = String(datetimestamp.getDate()).padStart(2, "0");
      var mm = String(datetimestamp.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = datetimestamp.getFullYear();

      return dd + "-" + mm + "-" + yyyy;
    },
  },
  computed: {
    fields() {
      return [
        {
          name: "__slot:no",
          title: "NO",
        },
        {
          name: "__slot:DATE",
          title: "PUBLISH DATE",
          dataClass: "justify-content-center",
          width: "8%",
        },

        {
          name: "NAME",
          title: "NAME",
        },
        {
          name: "__slot:NRIC_NUMBER",
          title: "NRIC NUMBER",
        },
        {
          name: "PASSPORT_NUMBER",
          title: "PASSPORT NUMBER",
        },
        {
          name: "WRITING_TITLE",
          title: "TITLE",
        },
        {
          name: "WRITING_MODE_DESCRIPTION",
          title: "WRITING MODE",
        },
        {
          name: "PUBLISHER",
          title: "PUBLISHER",
        },
        {
          name: "__slot:actions_support_docs",
          title: "Support Document",
          dataClass: "justify-content-center",
          width: "4%",
        },
      ];
    },
    filterData() {
      this.count = this.participantList.length;
      if (!(this.term || this.termDate)) {
        return this.participantList;
      }

      return this.participantList.filter((item) => {
        console.log(item);
        if (this.termDate) {
          let convertDate = this.formatDateTimestampToDate(
            item.DATE
          );
          return convertDate == this.termDate;
        } else if (item.PASSPORT_NUMBER && this.term.toLowerCase() == item.PASSPORT_NUMBER.toLowerCase() ) {
          return this.term.toLowerCase() == item.PASSPORT_NUMBER.toLowerCase()
        } else {
          return this.term
            .toLowerCase()
            .split(" ")
            .every(
              (v) =>
                // item.CREATE_BY_NAME.toLowerCase().includes(v) ||
                item.WRITING_TITLE.toLowerCase().includes(v) ||
                item.WRITING_MODE_DESCRIPTION.toLowerCase().includes(v) ||
                item.PUBLISHER.toLowerCase().includes(v) ||
                item.NAME.toLowerCase().includes(v) ||
                item.NRIC_NUMBER.toLowerCase().includes(v)
            );
        }
      });
    },
  },
  data() {
    return {
      participantList: [],
      module: null,
      term: null,
      termDate: null,
      count: 0,
      PROGDATA: "",
      model: {
        comment: "",
      },
      reviewSchema: {
        fields: [
          {
            type: "textArea",
            model: "comment",
            disabled: true,
            label: "Remark/Comments",
            hint: "Max 1000 characters",
            max: 1000,
            placeholder: "Enter Remark/Comments",
            rows: 5,
            validator: "string",
            styleClasses: "col-md-12",
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

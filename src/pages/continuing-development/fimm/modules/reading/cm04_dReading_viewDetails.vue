<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">View Details Module Reading</h4>
    </div>
    <DetailSubmittedProgram
      :module="module"
      :participantLists="participantList"
      :route="'d-apprReadingViewDetailParticipant'"
    />
    <br />
    <!-- 2. list participant -->
    <br />
    <va-card>
      <div class="my-5 ml-2 col-md-12">
        <vue-form-generator
          :model="model"
          :schema="fileUploadSchema"
          :options="formOptions"
          ref="fileUploadForm"
        >
        </vue-form-generator>
      </div>
      <br/>

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
    var data = localStorage.getItem("d-readingViewDetails");
    this.PROGDATA = JSON.parse(data);
    this.getModuleByID(this.PROGDATA.MODULE_ID);
    this.getDocumentById(this.PROGDATA.MODULE_ID)
  },
  components: {
    ParticipantList,
    DetailSubmittedProgram,
  },
  methods: {
    filter(value) {
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
      const resParticipant = await services07Module4.getReadingParticipantList(
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
      this.$router.go(-1);
    },

    formatDateTimestampToDate(datetimestamp) {
      var datetimestamp = new Date(datetimestamp);
      var dd = String(datetimestamp.getDate()).padStart(2, "0");
      var mm = String(datetimestamp.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = datetimestamp.getFullYear();

      return dd + "-" + mm + "-" + yyyy;
    },

    getDocumentById: async function (moduleId) {
      const response = await services07Module4.getOneReadingDocument(moduleId);
      let document = response.data;
      if (document) {
        document.DOC_BLOB = this.b64toBlobPDF(
          document.DOC_BLOB,
          "application/pdf"
        );
        const data = {
          docID: document.MOD_DOCUMENT_ID,
          name: document.DOC_ORIGINAL_NAME + "." + document.DOC_FILETYPE,
          size: document.DOC_FILESIZE,
          type: document.DOC_FILETYPE,
          ext: "pdf",
          url: window.URL.createObjectURL(document.DOC_BLOB),
          urlResized: null,
          dimensions: {
            height: 0,
            width: 0,
          },
        };
        document.DOC_BLOB = new File(
          [document.DOC_BLOB],
          document.DOC_ORIGINAL_NAME + "." + document.DOC_FILETYPE,
          {
            type: document.DOC_BLOB.DOC_FILETYPE,
          }
        );
        this.file = document.DOC_BLOB;
        this.model.file.push(data);
      }
    },

    b64toBlobPDF(b64Data, contentType, sliceSize) {
      contentType = contentType || "";
      sliceSize = sliceSize || 512;
      var byteCharacters = window.atob(b64Data);
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
      return new File(byteArrays, "pot", {
        type: contentType,
      });
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
          title: "DATE",
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
          name: "TITLE",
          title: "TITLE",
        },
        {
          name: "ZINE_MODE_DESCRIPTION",
          title: "READING MODE",
        },
        {
          name: "PUBLISHER",
          title: "PUBLISHER",
        },
      ];
    },
    filterData() {
      this.count = this.participantList.length;
      if (!(this.term || this.termDate)) {
        return this.participantList;
      }

      return this.participantList.filter((item) => {
        if (this.termDate) {
          let convertDate = this.formatDateTimestampToDate(item.DATE);
          return convertDate == this.termDate;
        } else if (
          item.PASSPORT_NUMBER &&
          this.term.toLowerCase() == item.PASSPORT_NUMBER.toLowerCase()
        ) {
          return this.term.toLowerCase() == item.PASSPORT_NUMBER.toLowerCase();
        } else {
          return this.term
            .toLowerCase()
            .split(" ")
            .every(
              (v) =>
                item.NAME.toLowerCase().includes(v) ||
                item.NRIC_NUMBER.toLowerCase().includes(v) ||
                item.TITLE.toLowerCase().includes(v) ||
                item.ZINE_MODE_DESCRIPTION.toLowerCase().includes(v) ||
                item.PUBLISHER.toLowerCase().includes(v)
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
        file: []
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
      fileUploadSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                labels: "Upload Supporting Document",
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
    };
  },
};
</script>

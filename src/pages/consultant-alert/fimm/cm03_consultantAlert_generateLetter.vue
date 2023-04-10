<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">
        Consultant Alert Records :
        <b>
          {{ this.consDetail.CONSULTANT_NAME }} (
          {{ this.consDetail.CONSULTANT_FIMM_NO }} )
        </b>
      </h4>
    </div>
    <va-card class="mt-5 col-12">
      <div class="ml-2">
        <vue-form-generator
          :model="model"
          :schema="letterSchema"
          :options="formOptions"
          ref="letterForm"
          @model-updated="onModelUpdated"
        >
        </vue-form-generator>
      </div>
      <br />
      <div id="app" class="ml-2 col-md-12">
        <vue-editor v-model="LETTER.CAS_LETTER_DESC"></vue-editor>
      </div>
      <br />
      <br />
      <button
        @click="back"
        type="button"
        class="btn btn-primary btn-fill btn-md"
      >
        <i class="fa fa-step-backward" /> &nbsp; Previous
      </button>
      <div class="float-right">
        <button
          type="button"
          @click="exportHTML"
          class="cancel vudal-btn mr-2 btn btn-primary btn-fill btn-md"
        >
          <i class="fa fa-save" /> &nbsp; Generate Letter
        </button>
      </div>
    </va-card>
  </va-card>
</template> 
<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.10/vue.min.js"></script>
<script>
import "vue-form-generator/dist/vfg.css";
import moment from "moment";
import * as servicesModule3 from "../../../app/module3/services01";
import * as servicesModule2 from "../../../app/module2/services01";

export default {
  mounted() {
    var data = localStorage.getItem("consultantAlert-generateLetter");
    this.CONSULTANT = JSON.parse(data);
    //alert(JSON.stringify(this.CONSULTANT));
    this.getConsultantById();
    this.getAllLetter();
  },
  components: {},

  methods: {
    getAllLetter: async function () {
      const response = await servicesModule3.getAllTemplate();
      this.letterList = response;
    },
    getLetterById: async function () {
      const response = await servicesModule3.getLetterById(
        this.model.letterTitle.CAS_LETTER_ID
      );
      this.LETTER = response;
      //alert(this.LETTER.CAS_LETTER_DESC);

      //get recor by id
      const response2 = await servicesModule3.getCaDetailsByID(
        this.CONSULTANT.CA_RECORD_DETAILS_ID
      );
     // alert(JSON.stringify(response2));

      //mapping object
      var str = this.LETTER.CAS_LETTER_DESC;
      var mapObj = {
        CONSULTANT_NAME: this.consDetail.CONSULTANT_NAME,
        CONSULTANT_FIMM_NO : this.consDetail.CONSULTANT_FIMM_NO,
        CASE_CLASSIFICATION : response2.SET_PARAM,
        CASE_REMARK : response2.CA_REMARK,
        CASE_REASON : response2.CA_REASON,
        CASE_START_DATE : response2.CA_DATE_START,
        CASE_END_DATE : response2.CA_DATE_END,

      };
      str = str.replace(
        /\b(?:CONSULTANT_NAME|CONSULTANT_FIMM_NO|CASE_CLASSIFICATION|CASE_REMARK|CASE_REASON|CASE_START_DATE|CASE_END_DATE)\b/gi,
        (matched) => mapObj[matched]
      );
      this.LETTER.CAS_LETTER_DESC = str;
    },
    onModelUpdated(newVal, schema) {
      this.getLetterById();
    },

    getConsultantById: async function () {
      const response = await servicesModule2.getConsultantById(
        this.CONSULTANT.CONSULTANT_ID
      );
      // console.log(response);
      this.consDetail = response;
    },

    exportHTML() {
      var vm = this,
        word = `<html xmlns:o='urn:schemas-microsoft-com:office:office xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head>
      <body>${vm.LETTER.CAS_LETTER_DESC}</body></html>`;

      var source =
        "data:application/vnd.ms-word;charset=utf-8," +
        encodeURIComponent(word);
      var fileDownload = document.createElement("a");
      document.body.appendChild(fileDownload);
      fileDownload.href = source;
      fileDownload.download = "letter.doc";
      fileDownload.click();
      document.body.removeChild(fileDownload);
    },

    back() {
      this.$router.push({
        name: "consultantAlert-consultantCaRecord",
      });
    }, // back button
  },

  computed: {},

  data() {
    return {
      consDetail: "",
      CONSULTANT: "",
      letterList: [],
      LETTER: "",

      model: {
        letterTitle: "",
        letterContent: "",
      },

      letterSchema: {
        fields: [
          {
            type: "vueMultiSelect",
            model: "letterTitle",
            label: "Letter Template",
            placeholder: "Select Letter Template",
            selectOptions: {
              multiple: false,
              key: "CAS_LETTER_ID",
              label: "CAS_LETTER_TITLE",
              searchable: true,
            },
            values: (model, schema) => {
              return this.letterList;
            },
            styleClasses: "col-md-6",
            required: true,
            validator: "required",
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

.alignleft {
  display: flex;
  justify-content: flex-end;
}
.alignright {
  display: flex;
  justify-content: flex-start;
}
</style>

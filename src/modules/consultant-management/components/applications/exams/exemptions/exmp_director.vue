<template>
  <div>
    <b-form-group label="Years of experience:" description="Years of Experience in Unit Trust/Fund Management Industry">
      <b-form-input 
      v-model="model.DIRECTOR_YEAR" 
      type="number"
      :state="validateDirectorYear('DIRECTOR_YEAR')"
      aria-describedby="director-year-msg">
      </b-form-input>

      <!-- <b-form-invalid-feedback id="director-year-msg">
        Please enter Years of experience
      </b-form-invalid-feedback> -->

      <small class="text-danger" v-if="experience_year_check">Minimum of 10 years experience is required.</small>
    </b-form-group>

    <b-form-group
        label-for="exemption-director-docs"
        description="Resume or Curriculum Vitae"
        class="mt-2"
        v-if="model.DIRECTOR_YEAR>=10"
      >
          <vue-form-generator
            :model="model2"
            :schema="exemptionDocumentUpload"
            :options="formOptions"
            ref="exemptionDocument"
          >
          </vue-form-generator>
      </b-form-group>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required } from 'vuelidate/lib/validators';
import * as services02module2 from "@/app/module2/services02";
export default {
  mixins: [validationMixin],
  name: "exemption-category-director",
  props: {
    consultantExemptionData: Object,
    savedConsultantData: Object
  },

  data() {
    return {  
      experience_year_check: false,

      model: {
        DIRECTOR_YEAR: '',
      },

      model2:{
        EXEMPTION_DOCUMENT: [],
      },

      formOptions: {
        validateAfterChanged: true
      },

      exemptionDocumentUpload: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                labels: "Upload document:",
                accept: ".pdf",
                theme: "list",
                multiple: false,
                text: 'Choose a File',
                model: 'EXEMPTION_DOCUMENT',
                type: 'vfg-consultant-custom-multiple-file',
                required: false,
              },
            ]
          }
        ]
      },
    };
  },

  validations: {
    model: {
      DIRECTOR_YEAR: { 
        required,
      },
    }
  },

  watch: {
    "model.DIRECTOR_YEAR": function (val) {
      var year = this.model.DIRECTOR_YEAR;
      if(year < 10){
        this.experience_year_check = true;
        this.model.DIRECTOR_YEAR = null;
      }else{
        this.experience_year_check = false;
      }
    },
  },
  

  methods: {
    //Validate All Datas
    validateDirectorDatas(){
      this.$v.model.$touch();
      if (this.$v.model.$anyError) {
        return false;
      }else{
        return true;
      }
    },

    validateDirectorYear(DIRECTOR_YEAR) {
      const { $dirty, $error } = this.$v.model[DIRECTOR_YEAR];
      return $dirty ? !$error : null;
    },

    //get data to save
    getDataToSave() {
      let dataToSave = {
        EXEMPTION_CATEGORY_ID: null,
        STAFF_DIRECTOR_EXPERIENCE_YEARS: this.model.DIRECTOR_YEAR,
        EXEMPTION_CATEGORY_DOCUMENT_NAME: 'CONSULTANT_EXEMPTION_DIRECTOR_DOCUMENT',
      };
      return dataToSave;
    },

    //Save Exemption Data
    saveExemptionDocuments(){
      const data = new FormData();
      data.append("CONSULTANT_ID", this.savedConsultantData.CONSULTANT_ID);
      data.append("TABLE_NAME", 'CONSULTANT_EXEMPTION_DIRECTOR_DOCUMENT');
      data.append("FIELD_NAME", 'CONSULTANT_EXEMPTION_DIRECTOR');
      for (let i = 0; i < this.model2.EXEMPTION_DOCUMENT.length; i++) {
        data.append("FILE[]", this.model2.EXEMPTION_DOCUMENT[i]);
      }

      services02module2.uploadConsultantExtraDocuments(data);
    },

    getExemptionDocument: async function() {
      const response = await services02module2.getConsultantDocuments(this.savedConsultantData.CONSULTANT_ID, 'CONSULTANT_EXEMPTION_DIRECTOR_DOCUMENT');
      response.forEach(el => {
        el.DOC_BLOB = this.b64toBlobPDF(el.DOC_BLOB, "application/pdf");

        el.DOC_BLOB = new File(
          [el.DOC_BLOB],
          el.DOC_ORIGINAL_NAME,
          {
            type: el.DOC_BLOB.type
          }
        );

        const data = {
          docID: el.CA_DOCUMENT_ID,
          name: el.DOC_ORIGINAL_NAME,
          size: el.DOC_FILESIZE,
          type: el.DOC_FILETYPE,
          ext: "exe",
          url: window.URL.createObjectURL(el.DOC_BLOB)
        };
        
        this.model2.EXEMPTION_DOCUMENT.push(data);
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

      return new File(byteArrays, "pot", { type: contentType });
    }
  },

  created(){
    if(this.consultantExemptionData){
      this.model = _.cloneDeep(this.consultantExemptionData);
    }

    this.getExemptionDocument();
  },
};
</script>

<style></style>

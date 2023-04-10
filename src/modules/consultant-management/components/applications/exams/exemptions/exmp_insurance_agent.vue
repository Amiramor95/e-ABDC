<template>
  <div>
    <b-form-group label="Insurance Certificates:" label-for="insurance-certificates" description>
      <b-form-select
        id="insurance-certificates"
        v-model="model.PRSFP_IA_CERTIFICATE_ID"
        placeholder="Select a category"
        :state="validateInsuranceCertificate('PRSFP_IA_CERTIFICATE_ID')"
        aria-describedby="insurance-certificate-msg"
      >
        <template>
          <option
            v-for="insurance in general_settings.INSURANCE_CERTIFICATES"
            v-bind:key="insurance.INSURANCE_CERTIFICATE_ID"
            :value="insurance.INSURANCE_CERTIFICATE_ID"
          >
            {{insurance.NAME}}
          </option>
        </template>
      </b-form-select>

      <b-form-invalid-feedback id="insurance-certificate-msg">
        Please select Insurance Certificate and Upload related Documents
      </b-form-invalid-feedback>
    </b-form-group>

    <!-- <b-form-group label="Insurance Certificates:" label-for="insurance-certificates" description>
      <multiselect
        id="insurance-certificates"
        v-model="selected_certificate"
        :options="general_settings.INSURANCE_CERTIFICATES"
        placeholder="Select one"
        track-by="INSURANCE_CERTIFICATE_ID"
        label="NAME"
      ></multiselect>
    </b-form-group> -->

    
    <b-form-group v-if="model.PRSFP_IA_CERTIFICATE_ID"
      label-for="exemption-PRSFP-IA-docs"
      class="mt-2"
    >
        <vue-form-generator
          :model="model2"
          :schema="exemptionDocumentUpload"
          :options="formOptions"
          ref="exemptionDocument"
        >
        </vue-form-generator>
    </b-form-group>

    <b-form-group label="Completion Date:"
      :state="validateCompletionDate('PRSFP_IA_COMPLETION_DATE')"
      aria-describedby="completion-date-msg"
    >
      <datepicker
        placeholder="dd-MM-yyyy"
        format="dd-MMM-yyyy"
        input-class="form-control bgcolor"
        :typeable="false"
        v-model="model.PRSFP_IA_COMPLETION_DATE"
      ></datepicker>

      <b-form-invalid-feedback id="completion-date-msg">
        Please enter completion date
      </b-form-invalid-feedback>
    </b-form-group>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { validationMixin } from "vuelidate";
import { required } from 'vuelidate/lib/validators';
import * as services02module2 from "@/app/module2/services02";
export default {
  mixins: [validationMixin],
  name: "exemption-category-insurance-agent",

  props: {
    consultantExemptionData: Object,
    savedConsultantData: Object
  },

  computed: {
    ...mapGetters({ general_settings: "getGeneralSettings" }),
  },

  data() {
    return {
      disabledDates: {
        to: new Date(Date.now())
      },
      
      model: {
        PRSFP_IA_CERTIFICATE_ID: '',
        PRSFP_IA_COMPLETION_DATE: '',
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
                multiple: true,
                text: 'Choose a File',
                model: 'EXEMPTION_DOCUMENT',
                type: 'vfg-consultant-custom-multiple-file',
                required: false,
              },
            ]
          }
        ]
      }
    };
  },

  validations: {
    model: {
      PRSFP_IA_CERTIFICATE_ID: { required },
      PRSFP_IA_COMPLETION_DATE: { required },
    }
  },

  methods: {
    //Validate All Datas
    validatePRSFP_IA_Datas(){
      this.$v.model.$touch();
      if (this.$v.model.$anyError) {
        return false;
      }else{
        return true;
      }
    },

    validateInsuranceCertificate(PRSFP_IA_CERTIFICATE_ID) {
      const { $dirty, $error } = this.$v.model[PRSFP_IA_CERTIFICATE_ID];
      return $dirty ? !$error : null;
    },

    validateCompletionDate(PRSFP_IA_COMPLETION_DATE){
      const { $dirty, $error } = this.$v.model[PRSFP_IA_COMPLETION_DATE];
      return $dirty ? !$error : null;
    },

    //get data to save
    getDataToSave() {
      let dataToSave = {
        EXEMPTION_CATEGORY_ID: null,
        PRSFP_IA_CERTIFICATE_ID: this.model.PRSFP_IA_CERTIFICATE_ID,
        PRSFP_IA_COMPLETION_DATE: this.model.PRSFP_IA_COMPLETION_DATE,
        EXEMPTION_CATEGORY_DOCUMENT_NAME: 'CONSULTANT_EXEMPTION_PRSFP_IA_DOCUMENT',
      };
      return dataToSave;
    },

    //Save Exemption Data
    saveExemptionDocuments(){
      const data = new FormData();
      data.append("CONSULTANT_ID", this.savedConsultantData.CONSULTANT_ID);
      data.append("TABLE_NAME", 'CONSULTANT_EXEMPTION_PRSFP_IA_DOCUMENT');
      data.append("FIELD_NAME", 'CONSULTANT_EXEMPTION_PRSFP_IA');
      for (let i = 0; i < this.model2.EXEMPTION_DOCUMENT.length; i++) {
        data.append("FILE[]", this.model2.EXEMPTION_DOCUMENT[i]);
      }

      services02module2.uploadConsultantDocuments(data);
    },

    getExemptionDocument: async function() {
      const response = await services02module2.getConsultantDocuments(this.savedConsultantData.CONSULTANT_ID, 'CONSULTANT_EXEMPTION_PRSFP_IA_DOCUMENT');
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

<style>
</style>

<template>
  <div> 
      <b-form-group class="required">
        <b-form-input class="d-none"
          v-model="model.UTC_Registration_Date"
          type="number" 
          :state="validatePRSFP_UTC_Date('UTC_Registration_Date')"
          aria-describedby="utc-registraion-msg">
        </b-form-input>
          
        <b-form-invalid-feedback id="utc-registraion-msg">
          Sorry, You cannot proceed. Your UTS Registration date is less than 3 years to apply for PRS License.
          <br>
          Proceed with another Exemption Category.
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        label-for="exemption-PRSFP_UTC-docs"
        description="PRSFP Certificate of Attendance"
        class="mt-2"
      >
          <!-- <div>
            <vue-form-generator
              :model="model2"
              :schema="exemptionDocumentView"
              :options="formOptions"
              ref="exemptionDocumentView"
            >
            </vue-form-generator>
          </div> -->

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
import moment from "moment";
import { validationMixin } from "vuelidate";
import { required } from 'vuelidate/lib/validators';
import * as services02module2 from "@/app/module2/services02";
import * as services04module2 from "@/app/module2/services04";
export default {
  mixins: [validationMixin],
  name: 'exemption-category-unit-trust-consultant',

  props: {
    consultantExemptionData: Object,
    savedConsultantData: Object
  },

  data() {
    return {
      current_date: new Date(),

      model:{
        UTC_Registration_Date: '',
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

      // exemptionDocumentView: {
      //   groups: [
      //     {
      //       styleClasses: "row",
      //       fields: [
      //         {
      //           accept: ".pdf",
      //           theme: "list",
      //           multiple: false,
      //           text: 'Choose a File',
      //           model: 'EXEMPTION_DOCUMENT',
      //           type: 'vfg-custom-file-view2',
      //           required: false,
      //         },
      //       ]
      //     }
      //   ]
      // }
    }
  },

  validations: {
    model: {
      UTC_Registration_Date: { required },
    }
  },

  methods: {
    //Validate All Datas
    validatePRSFP_UTC_Datas(){
      if(this.savedConsultantData.license){
        this.checkUTSRegistrationData();
      }

      this.$v.model.$touch();
      if (this.$v.model.$anyError) {
        return false;
      }else{
        return true;
      }
    },

    validatePRSFP_UTC_Date(UTC_Registration_Date) {
      const { $dirty, $error } = this.$v.model[UTC_Registration_Date];
      return $dirty ? !$error : null;
    },

    checkUTSRegistrationData(){
      var date1 = moment(this.current_date, "YYYY-MM-DD");
      var UTSRegistrationDate = moment(this.savedConsultantData.license.CREATED_AT, "YYYY-MM-DD");
      //var UTSRegistrationStatus = this.savedConsultantData.license.STATUS;
      var date_diff = moment.duration(date1.diff(UTSRegistrationDate)).asYears();
      if(date_diff < 3){
        this.model.UTC_Registration_Date = '';
      }else{
        this.model.UTC_Registration_Date = date_diff;
      }
    },

    //Get datas to save
    getDataToSave() {
      let dataToSave = {
        EXEMPTION_CATEGORY_ID: null,
        EXEMPTION_CATEGORY_DOCUMENT_NAME: 'CONSULTANT_EXEMPTION_PRSFP_UTC_DOCUMENT',
      };
      return dataToSave;
    },

    //Save Exemption Data
    saveExemptionDocuments(){
      const data = new FormData();
      data.append("CONSULTANT_ID", this.savedConsultantData.CONSULTANT_ID);
      data.append("TABLE_NAME", 'CONSULTANT_EXEMPTION_PRSFP_UTC_DOCUMENT');
      data.append("FIELD_NAME", 'CONSULTANT_EXEMPTION_PRSFP_UTC');
      for (let i = 0; i < this.model2.EXEMPTION_DOCUMENT.length; i++) {
        data.append("FILE[]", this.model2.EXEMPTION_DOCUMENT[i]);
      }

      services02module2.uploadConsultantExtraDocuments(data);
    },

    getExemptionDocument: async function() {
      const response = await services02module2.getConsultantDocuments(this.savedConsultantData.CONSULTANT_ID, 'CONSULTANT_EXEMPTION_PRSFP_UTC_DOCUMENT');
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
    this.getExemptionDocument();
  },
};
</script>

<style>
</style>

<template>
  <div>
    
    <b-form-group class="required" label="CMSRL No:" description="CSMRL for Fund Manager">
      <b-form-input v-model="model.FM_CMSRL_NO"
      type="number" 
      :state="validateCmsrlNo('FM_CMSRL_NO')"
      placeholder="Enter CMSRL"
      aria-describedby="fm-cmsrl-msg">
      </b-form-input>
        
      <b-form-invalid-feedback id="fm-cmsrl-msg">
        Please enter CMSRL NO
      </b-form-invalid-feedback>
    </b-form-group>

    <b-form-group class="required mb-0" label="CMSRL Expiry Date:" 
      :state="validateFmExpiryData('FM_EXPIREY_DATE')"
      aria-describedby="fm-expiry-date-msg"
      description="CMSRL Expiry Date"
    >
      <datepicker
        placeholder="dd-MM-yyyy"
        format="dd-MMM-yyyy"
        input-class="form-control bgcolor"
        :typeable="false"
        :open-date="new Date()"
        :disabledDates="disabledDates"
        v-model="model.FM_EXPIREY_DATE"
      ></datepicker>

      <b-form-invalid-feedback id="fm-expiry-date-msg">
        Please submit a certificate with expiry date more than 1 month validity.
      </b-form-invalid-feedback>
    </b-form-group>

    <b-form-group
        label-for="exemption-FM-docs"
        description="CSMRL for Fund Manager"
        class="mt-4"
      >
          <vue-form-generator
            :model="model2"
            :schema="exemptionDocumentUpload"
            :options="formOptions"
            ref="exemptionDocument"
          >
          </vue-form-generator>
    </b-form-group>

    <b-modal v-model="checkCMSRLExpiryDate" centered title="">
      <div class="d-block text-center">
          <h5>Your Certificate will be expired in less than 1 month.</h5>
          <h5>Please submit a new certificate with expiry date more than 1 month validity.</h5>
      </div>
      <template #modal-footer>
        <b-button size="sm" variant="success" @click="confirmCmsrlExpiryDate()">
          OK
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import moment from "moment";
import { validationMixin } from "vuelidate";
import { required } from 'vuelidate/lib/validators';
import * as services02module2 from "@/app/module2/services02";
export default {
  mixins: [validationMixin],
  name: "exemption-category-fund-manager",
  props: {
    consultantExemptionData: Object,
    savedConsultantData: Object
  },

  data() {
    return {
      checkCMSRLExpiryDate: false,
      current_date: new Date(),

      disabledDates: {
        to: new Date(Date.now())
      },

      model: {
        FM_CMSRL_NO: null,
        FM_EXPIREY_DATE: null,
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
      }
    };
  },

  validations: {
    model: {
      FM_CMSRL_NO: { required },
      FM_EXPIREY_DATE: { required },
    }
  },

  watch: {
    "model.FM_EXPIREY_DATE": function (val) {
      var date1 = moment(this.current_date, "YYYY-MM-DD");
      var date2 = moment(this.model.FM_EXPIREY_DATE, "YYYY-MM-DD");
      var date_diff = moment.duration(date2.diff(date1)).asDays();
      if(date_diff <= 31){
        this.checkCMSRLExpiryDate = true;
        this.model.FM_EXPIREY_DATE = null;
      }
    },
  },
  
  methods: {
    // isDatePicked(){
    //   var date1 = moment(this.current_date, "YYYY-MM-DD");
    //   var date2 = moment(this.model.FM_EXPIREY_DATE, "YYYY-MM-DD");
    //   console.log(date1, date2);
    //   var date_diff = moment.duration(date1.diff(date2)).asDays();
    //   console.log('Date difference', date_diff);
    //   if(date_diff <= 31){
    //     this.checkCMSRLExpiryDate = true;
    //   }
    // },

    //Validate All Datas
    validateFMDatas(){
      this.$v.model.$touch();
      if (this.$v.model.$anyError) {
        return false;
      }else{
        return true;
      }
    },

    validateFmExpiryData(FM_EXPIREY_DATE) {
      const { $dirty, $error } = this.$v.model[FM_EXPIREY_DATE];
      return $dirty ? !$error : null;
    },

    validateCmsrlNo(FM_CMSRL_NO) {
      const { $dirty, $error } = this.$v.model[FM_CMSRL_NO];
      return $dirty ? !$error : null;
    },

    confirmCmsrlExpiryDate(){
        this.checkCMSRLExpiryDate = false;
        this.model.FM_EXPIREY_DATE = null;
    },

    //get data to save
    getDataToSave() {
      let dataToSave = {
        EXEMPTION_CATEGORY_ID: null,
        FM_CMSRL_NO: this.model.FM_CMSRL_NO,
        FM_EXPIREY_DATE: this.model.FM_EXPIREY_DATE,
        EXEMPTION_CATEGORY_DOCUMENT_NAME: 'CONSULTANT_EXEMPTION_FM_DOCUMENT',
      };
      return dataToSave;
    },

    //Save Exemption Data
    saveExemptionDocuments(){
      const data = new FormData();
      data.append("CONSULTANT_ID", this.savedConsultantData.CONSULTANT_ID);
      data.append("TABLE_NAME", 'CONSULTANT_EXEMPTION_FM_DOCUMENT');
      data.append("FIELD_NAME", 'CONSULTANT_EXEMPTION_FM');
      for (let i = 0; i < this.model2.EXEMPTION_DOCUMENT.length; i++) {
        data.append("FILE[]", this.model2.EXEMPTION_DOCUMENT[i]);
      }

      services02module2.uploadConsultantExtraDocuments(data);
    },

    getExemptionDocument: async function() {
      const response = await services02module2.getConsultantDocuments(this.savedConsultantData.CONSULTANT_ID, 'CONSULTANT_EXEMPTION_FM_DOCUMENT');
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

<template>
  <div>
    <b-form-group
      label-for="exemption-FP-docs"
      description="Active Membership of the Association/Organization"
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

    <!-- FPAM -CFP/IFP/Both -->
    <div class="row">
      <div class="col-md-12 mb-4">
        <strong>a) FPAM -CFP/IFP/Both</strong>
      </div>

      <div class="col-md-12">
        <!-- FP_FPAM_MODULE1 -->
        <div class="row mb-3">
          <div class="col-lg-6">
            <b-form-group label="Module 1 Completion Date:">
              <datepicker placeholder="dd-MM-yyyy" format="dd-MMM-yyyy" @selected="isDatePicked"
                input-class="form-control bgcolor" :typeable="false"
                v-model="model.FP_FPAM_MODULE1_DATE"></datepicker>
            </b-form-group>
          </div>

          <div class="col-lg-6">
            <b-form-group
              label-for="FP-module1-docs"
              class="mt-2"
            >
                <vue-form-generator
                  :model="model2"
                  :schema="FPModule1DocUpload"
                  :options="formOptions"
                  ref="FPModule1Doc"
                >
                </vue-form-generator>
            </b-form-group>
          </div>
        </div>

        <!-- FP_FPAM_MODULE3 -->
        <div class="row mb-3">
          <div class="col-lg-6">
            <b-form-group class label="Module 3 Completion Date:">
              <datepicker placeholder="dd-MM-yyyy" format="dd-MMM-yyyy" @selected="isDatePicked" 
                input-class="form-control bgcolor" :typeable="false" 
                v-model="model.FP_FPAM_MODULE3_DATE"></datepicker>
            </b-form-group>
          </div>

          <div class="col-lg-6">
            <b-form-group
              label-for="FP-module3-docs"
              class="mt-2"
            >
                <vue-form-generator
                  :model="model2"
                  :schema="FPModule3DocUpload"
                  :options="formOptions"
                  ref="FPModule3Doc"
                >
                </vue-form-generator>
            </b-form-group>
          </div>
        </div>

        <!-- FP_FPAM_CERTIFY -->
        <div class="row mb-3">
          <div class="col-lg-6">
            <b-form-group class label="CFP/IFP-Certified Completion Date:">
              <datepicker placeholder="dd-MM-yyyy" format="dd-MMM-yyyy" @selected="isDatePicked"
                input-class="form-control bgcolor" :typeable="false" 
                v-model="model.FP_FPAM_CERTIFY_DATE"></datepicker>
            </b-form-group>
          </div>

          <div class="col-lg-6">
            <b-form-group
              label-for="FP-Certify-docs"
              class="mt-2"
            >
                <vue-form-generator
                  :model="model2"
                  :schema="FPCertifyDocUpload"
                  :options="formOptions"
                  ref="FPCertifyDoc"
                >
                </vue-form-generator>
            </b-form-group>
          </div>
        </div>
      </div>
    </div>

    <hr />

    <!-- MFPC -->
    <div class="row">
      <div class="col-md-12 mb-4">
        <strong>b) MFPC</strong>
      </div>

      <!-- MFPC - RFP/Shariah RFP - Partial Completion -->
      <div class="col-md-12">
        <div class="mb-3">
          <p>
            <strong>i) RFP/Shariah RFP - Partial Completion</strong>
          </p>
        </div>

        <!-- FP_MFPC_MODULE1 -->
        <div class="row mb-3">
          <div class="col-lg-6">
            <b-form-group class label="Module 1 Completion Date:">
              <datepicker placeholder="dd-MM-yyyy" format="dd-MMM-yyyy" @selected="isDatePicked"
                input-class="form-control bgcolor" :typeable="false" 
                v-model="model.FP_MFPC_MODULE1_DATE"></datepicker>
            </b-form-group>
          </div>

          <div class="col-lg-6">
            <b-form-group
              label-for="MFPC-module1-docs"
              class="mt-2"
            >
                <vue-form-generator
                  :model="model2"
                  :schema="MFPCModule1DocUpload"
                  :options="formOptions"
                  ref="MFPCModule1Doc"
                >
                </vue-form-generator>
            </b-form-group>
          </div>
        </div>

        <!-- FP_MFPC_MODULE3 -->
        <div class="row mb-3">
          <div class="col-lg-6">
            <b-form-group class label="Module 3 Completion Date:">
              <datepicker placeholder="dd-MM-yyyy" format="dd-MMM-yyyy" @selected="isDatePicked"
                input-class="form-control bgcolor" :typeable="false" 
                v-model="model.FP_MFPC_MODULE3_DATE"></datepicker>
            </b-form-group>
          </div>

          <div class="col-lg-6">
            <b-form-group
              label-for="MFPC-module3-docs"
              class="mt-2"
            >
                <vue-form-generator
                  :model="model2"
                  :schema="MFPCModule3DocUpload"
                  :options="formOptions"
                  ref="MFPCModule3Doc"
                >
                </vue-form-generator>
            </b-form-group>
          </div>
        </div>

        <!-- FP_MFPC_MODULE6 -->
        <div class="row mb-3">
          <div class="col-lg-6">
            <b-form-group class label="Module 6 Completion Date:">
              <datepicker placeholder="dd-MM-yyyy" format="dd-MMM-yyyy" @selected="isDatePicked"
                input-class="form-control bgcolor" :typeable="false" 
                v-model="model.FP_MFPC_MODULE6_DATE"></datepicker>
            </b-form-group>
          </div>

          <div class="col-lg-6">
            <b-form-group
              label-for="MFPC-module6-docs"
              class="mt-2"
            >
                <vue-form-generator
                  :model="model2"
                  :schema="MFPCModule6DocUpload"
                  :options="formOptions"
                  ref="MFPCModule6Doc"
                >
                </vue-form-generator>
            </b-form-group>
          </div>
        </div>
      </div>

      <!-- RFP/Shairah RFP - Certified -->
      <div class="col-md-12">
        <div class="mb-3">
          <p>
            <strong>ii) RFP/Shairah RFP - Certified</strong>
          </p>
        </div>

        <!-- FP_MFPC_CERTIFY -->
        <div class="row mb-3">
          <div class="col-lg-6">
            <b-form-group class label="Completion Date:">
              <datepicker placeholder="dd-MM-yyyy" format="dd-MMM-yyyy" @selected="isDatePicked"
                input-class="form-control bgcolor" :typeable="false"
                v-model="model.FP_MFPC_CERTIFY_DATE"></datepicker>
            </b-form-group>
          </div>

          <div class="col-lg-6">
            <b-form-group
              label-for="MFPC-certify-docs"
              class="mt-2"
            >
                <vue-form-generator
                  :model="model2"
                  :schema="MFPCcertifyDocUpload"
                  :options="formOptions"
                  ref="MFPCCertifyDoc"
                >
                </vue-form-generator>
            </b-form-group>
          </div>
        </div>
      </div>
    </div>

    <hr />

    <!-- MFPAA -->
    <div class="row">
      <div class="col-md-12 mb-4">
        <strong>c) MFPAA</strong>
      </div>

      <div class="col-md-12">
        <!-- FP_MFPAA_CERTIFY -->
        <div class="row mb-3">
          <div class="col-lg-6">
            <b-form-group class label="Completion Date:">
              <datepicker placeholder="dd-MM-yyyy" format="dd-MMM-yyyy" @selected="isDatePicked"
                input-class="form-control bgcolor" :typeable="false" 
                v-model="model.FP_MFPAA_CERTIFY_DATE"></datepicker>
            </b-form-group>
          </div>

          <div class="col-lg-6">
            <b-form-group
              label-for="MFPAA-certify-docs"
              class="mt-2"
            >
                <vue-form-generator
                  :model="model2"
                  :schema="MFPAACertifyDocUpload"
                  :options="formOptions"
                  ref="MFPAACertifyDoc"
                >
                </vue-form-generator>
            </b-form-group>
          </div>
        </div>
      </div>
    </div>

    <div class="row" v-if="validation_msg">
      <div class="col-md-12">
        <small class="text-danger">** Please upload document and enter completion date according to your membership.</small>
      </div>
    </div>

    <b-modal v-model="checkCompletionDate" centered title="">
      <div class="d-block text-center">
          <h5>Sorry, Completion date is more than 3 years from the application date.</h5>
      </div>
      <template #modal-footer="{ ok }">
        <b-button size="sm" variant="success" @click="ok()">
          OK
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import moment from "moment";
import * as services02module2 from "@/app/module2/services02";
export default {
  name: "exemption-category-financial-planner",

  props: {
    consultantExemptionData: Object,
    savedConsultantData: Object
  },

  data() {
    return {
      validation_msg: false,
      checkCompletionDate: false,
      current_date: new Date(),

      disabledDates: {
        to: new Date(Date.now())
      },

      model: {
        FP_FPAM_MODULE1_DATE: null,
        FP_FPAM_MODULE3_DATE: null,
        FP_FPAM_CERTIFY_DATE: null,
        FP_MFPC_MODULE1_DATE: null,
        FP_MFPC_MODULE3_DATE: null,
        FP_MFPC_MODULE6_DATE: null,
        FP_MFPC_CERTIFY_DATE: null,
        FP_MFPAA_CERTIFY_DATE: null,
      },

      model2:{
        EXEMPTION_DOCUMENT: [],
        FPAM_MODULE1_DOCUMENT: [],
        FPAM_MODULE3_DOCUMENT: [],
        FPAM_CERTIFY_DOCUMENT: [],
        MFPC_MODULE1_DOCUMENT: [],
        MFPC_MODULE3_DOCUMENT: [],
        MFPC_MODULE6_DOCUMENT: [],
        MFPC_CERTIFY_DOCUMENT: [],
        MFPAA_CERTIFY_DOCUMENT: [],
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

      FPModule1DocUpload: {
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
                model: 'FPAM_MODULE1_DOCUMENT',
                type: 'vfg-consultant-custom-multiple-file',
                required: false,
              },
            ]
          }
        ]
      },

      FPModule3DocUpload: {
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
                model: 'FPAM_MODULE3_DOCUMENT',
                type: 'vfg-consultant-custom-multiple-file',
                required: false,
              },
            ]
          }
        ]
      },

      FPCertifyDocUpload: {
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
                model: 'FPAM_CERTIFY_DOCUMENT',
                type: 'vfg-consultant-custom-multiple-file',
                required: false,
              },
            ]
          }
        ]
      },

      MFPCModule1DocUpload: {
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
                model: 'MFPC_MODULE1_DOCUMENT',
                type: 'vfg-consultant-custom-multiple-file',
                required: false,
              },
            ]
          }
        ]
      },

      MFPCModule3DocUpload: {
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
                model: 'MFPC_MODULE3_DOCUMENT',
                type: 'vfg-consultant-custom-multiple-file',
                required: false,
              },
            ]
          }
        ]
      },

      MFPCModule6DocUpload: {
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
                model: 'MFPC_MODULE6_DOCUMENT',
                type: 'vfg-consultant-custom-multiple-file',
                required: false,
              },
            ]
          }
        ]
      },

      MFPCcertifyDocUpload: {
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
                model: 'MFPC_CERTIFY_DOCUMENT',
                type: 'vfg-consultant-custom-multiple-file',
                required: false,
              },
            ]
          }
        ]
      },

      MFPAACertifyDocUpload: {
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
                model: 'MFPAA_CERTIFY_DOCUMENT',
                type: 'vfg-consultant-custom-multiple-file',
                required: false,
              },
            ]
          }
        ]
      },

    };
  },

  watch: {
    "model.FP_FPAM_MODULE1_DATE": function (val) {
      var date1 = moment(this.model.FP_FPAM_MODULE1_DATE, "YYYY-MM-DD");
      var userRegistrationDate = moment(this.savedConsultantData.CREATE_TIMESTAMP, "YYYY-MM-DD");
      var date_diff = moment.duration(userRegistrationDate.diff(date1)).asYears();
      console.log('Application date', date_diff);
      if(date_diff > 3){
        this.checkCompletionDate = true;
        //this.model.FP_FPAM_MODULE1_DATE = null;
      }else{
        this.checkCompletionDate = false;
      }
    },

    "model.FP_FPAM_MODULE3_DATE": function (val) {
      var date1 = moment(this.model.FP_FPAM_MODULE3_DATE, "YYYY-MM-DD");
      var userRegistrationDate = moment(this.savedConsultantData.CREATE_TIMESTAMP, "YYYY-MM-DD");
      var date_diff = moment.duration(userRegistrationDate.diff(date1)).asYears();
      console.log('Application date', date_diff);
      if(date_diff > 3){
        this.checkCompletionDate = true;
        // this.model.FP_FPAM_MODULE3_DATE = '';
      }else{
        this.checkCompletionDate = false;
      }
    },

    "model.FP_MFPC_MODULE1_DATE": function (val) {
      var date1 = moment(this.model.FP_MFPC_MODULE1_DATE, "YYYY-MM-DD");
      var userRegistrationDate = moment(this.savedConsultantData.CREATE_TIMESTAMP, "YYYY-MM-DD");
      var date_diff = moment.duration(userRegistrationDate.diff(date1)).asYears();
      console.log('Application date', date_diff);
      if(date_diff > 3){
        this.checkCompletionDate = true;
        // this.model.FP_MFPC_MODULE1_DATE = '';
      }else{
        this.checkCompletionDate = false;
      }
    },

    "model.FP_MFPC_MODULE3_DATE": function (val) {
      var date1 = moment(this.model.FP_MFPC_MODULE3_DATE, "YYYY-MM-DD");
      var userRegistrationDate = moment(this.savedConsultantData.CREATE_TIMESTAMP, "YYYY-MM-DD");
      var date_diff = moment.duration(userRegistrationDate.diff(date1)).asYears();
      console.log('Application date', date_diff);
      if(date_diff > 3){
        this.checkCompletionDate = true;
        // this.model.FP_MFPC_MODULE3_DATE = '';
      }else{
        this.checkCompletionDate = false;
      }
    },

    
    "model.FP_MFPC_MODULE6_DATE": function (val) {
      var date1 = moment(this.model.FP_MFPC_MODULE6_DATE, "YYYY-MM-DD");
      var userRegistrationDate = moment(this.savedConsultantData.CREATE_TIMESTAMP, "YYYY-MM-DD");
      var date_diff = moment.duration(userRegistrationDate.diff(date1)).asYears();
      console.log('Application date', date_diff);
      if(date_diff > 3){
        this.checkCompletionDate = true;
        // this.model.FP_MFPC_MODULE6_DATE = '';
      }else{
        this.checkCompletionDate = false;
      }
    },
  },

  methods: {  
    isDatePicked(){
      if(this.model.FP_FPAM_MODULE1_DATE != null || this.model.FP_FPAM_MODULE3_DATE != null || this.model.FP_FPAM_CERTIFY_DATE != null 
        || this.model.FP_MFPC_MODULE1_DATE != null || this.model.FP_MFPC_MODULE3_DATE != null || this.model.FP_MFPC_MODULE6_DATE != null
        || this.model.FP_MFPC_CERTIFY_DATE != null || this.model.FP_MFPAA_CERTIFY_DATE != null)
      {
        this.validation_msg = false;
      }else{
        this.validation_msg = true;
      }
    },

    // validateEndDate (value) {
    //   if (!moment(this.model.startDate).isSameOrBefore(this.model.endDate)) {
    //     return ['End date should be more than start date.']
    //   }
    //   if (this.model.frequency != null && this.model.startDate != null && this.model.effectiveDate != null) {
    //     const validDate = moment(this.model.effectiveDate).add(this.model.frequency, 'M')
    //     if (!moment(this.model.endDate).isSameOrAfter(validDate)) {
    //       return ['Gap between effective date and end date should be at least ' + this.model.frequency + ' months.']
    //     }
    //   }
    // },

    //Validate All Datas
    validateFPDatas(){
      if(this.model.FP_FPAM_MODULE1_DATE == null && this.model.FP_FPAM_MODULE3_DATE == null && this.model.FP_FPAM_CERTIFY_DATE == null 
        && this.model.FP_MFPC_MODULE1_DATE == null && this.model.FP_MFPC_MODULE3_DATE == null && this.model.FP_MFPC_MODULE6_DATE == null
        && this.model.FP_MFPC_CERTIFY_DATE == null && this.model.FP_MFPAA_CERTIFY_DATE == null)
      {
        this.validation_msg = true;
        return false;
      }else{
        this.validation_msg = false;
        return true;
      }
    },


    //get data to save
    getDataToSave() {
      let dataToSave = {
        EXEMPTION_CATEGORY_ID: null,
        //FP_FPAM_MODULE1_DATE: moment(this.model.FP_FPAM_MODULE1_DATE).format("YYYY-MM-DD"),
        FP_FPAM_MODULE1_DATE: this.model.FP_FPAM_MODULE1_DATE,
        FP_FPAM_MODULE3_DATE: this.model.FP_FPAM_MODULE3_DATE,
        FP_FPAM_CERTIFY_DATE: this.model.FP_FPAM_CERTIFY_DATE,
        FP_MFPC_MODULE1_DATE: this.model.FP_MFPC_MODULE1_DATE,
        FP_MFPC_MODULE3_DATE: this.model.FP_MFPC_MODULE3_DATE,
        FP_MFPC_MODULE6_DATE: this.model.FP_MFPC_MODULE6_DATE,
        FP_MFPC_CERTIFY_DATE: this.model.FP_MFPC_CERTIFY_DATE,
        FP_MFPAA_CERTIFY_DATE: this.model.FP_MFPAA_CERTIFY_DATE,
        EXEMPTION_CATEGORY_DOCUMENT_NAME: 'CONSULTANT_EXEMPTION_FP_DOCUMENT',
      };
      return dataToSave;
    },

    //Save Exemption Data
    saveExemptionDocuments(){
      this.saveFPDocuments('EXEMPTION_FP');
      this.saveFPDocuments('EXEMPTION_FPAM_MODULE1');
      this.saveFPDocuments('EXEMPTION_FPAM_MODULE3');
      this.saveFPDocuments('EXEMPTION_FPAM_CERTIFY');
      this.saveFPDocuments('EXEMPTION_MFPC_MODULE1');
      this.saveFPDocuments('EXEMPTION_MFPC_MODULE3');
      this.saveFPDocuments('EXEMPTION_MFPC_MODULE6');
      this.saveFPDocuments('EXEMPTION_MFPC_CERTIFY');
      this.saveFPDocuments('EXEMPTION_MFPAA_CERTIFY');
    },

    saveFPDocuments(fieldName){
      const data = new FormData();
      data.append("CONSULTANT_ID", this.savedConsultantData.CONSULTANT_ID);
      data.append("TABLE_NAME", 'CONSULTANT_EXEMPTION_FP_DOCUMENT');
      data.append("FIELD_NAME", fieldName);

      if(fieldName=='EXEMPTION_FP'){
        for (let i = 0; i < this.model2.EXEMPTION_DOCUMENT.length; i++) {
          data.append("FILE[]", this.model2.EXEMPTION_DOCUMENT[i]);
        }
      }else if(fieldName=='EXEMPTION_FPAM_MODULE1'){ 
        for (let i = 0; i < this.model2.FPAM_MODULE1_DOCUMENT.length; i++) {
          data.append("FILE[]", this.model2.FPAM_MODULE1_DOCUMENT[i]);
        }
      }else if(fieldName=='EXEMPTION_FPAM_MODULE3'){ 
        for (let i = 0; i < this.model2.FPAM_MODULE3_DOCUMENT.length; i++) {
          data.append("FILE[]", this.model2.FPAM_MODULE3_DOCUMENT[i]);
        }
      }else if(fieldName=='EXEMPTION_FPAM_CERTIFY'){ 
        for (let i = 0; i < this.model2.FPAM_CERTIFY_DOCUMENT.length; i++) {
          data.append("FILE[]", this.model2.FPAM_CERTIFY_DOCUMENT[i]);
        }
      }
      else if(fieldName=='EXEMPTION_MFPC_MODULE1'){ 
        for (let i = 0; i < this.model2.MFPC_MODULE1_DOCUMENT.length; i++) {
          data.append("FILE[]", this.model2.MFPC_MODULE1_DOCUMENT[i]);
        }
      }
      else if(fieldName=='EXEMPTION_MFPC_MODULE3'){ 
        for (let i = 0; i < this.model2.MFPC_MODULE3_DOCUMENT.length; i++) {
          data.append("FILE[]", this.model2.MFPC_MODULE3_DOCUMENT[i]);
        }
      }
      else if(fieldName=='EXEMPTION_MFPC_MODULE6'){ 
        for (let i = 0; i < this.model2.MFPC_MODULE6_DOCUMENT.length; i++) {
          data.append("FILE[]", this.model2.MFPC_MODULE6_DOCUMENT[i]);
        }
      }
      else if(fieldName=='EXEMPTION_MFPC_CERTIFY'){ 
        for (let i = 0; i < this.model2.MFPC_CERTIFY_DOCUMENT.length; i++) {
          data.append("FILE[]", this.model2.MFPC_CERTIFY_DOCUMENT[i]);
        }
      }
      else if(fieldName=='EXEMPTION_MFPAA_CERTIFY'){ 
        for (let i = 0; i < this.model2.MFPAA_CERTIFY_DOCUMENT.length; i++) {
          data.append("FILE[]", this.model2.MFPAA_CERTIFY_DOCUMENT[i]);
        }
      }

      services02module2.uploadConsultantExtraDocuments(data);
    },

    getExemptionDocument: async function(consultantId, tableName) {
      const response = await services02module2.getConsultantDocuments(consultantId, tableName);
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
        if(el.FIELD_NAME=='EXEMPTION_FP'){
          this.model2.EXEMPTION_DOCUMENT.push(data);
        }else if(el.FIELD_NAME=='EXEMPTION_FPAM_MODULE1'){ 
          this.model2.FPAM_MODULE1_DOCUMENT.push(data);
        }else if(el.FIELD_NAME=='EXEMPTION_FPAM_MODULE3'){ 
          this.model2.FPAM_MODULE3_DOCUMENT.push(data);
        }else if(el.FIELD_NAME=='EXEMPTION_FPAM_CERTIFY'){ 
          this.model2.FPAM_CERTIFY_DOCUMENT.push(data);
        }else if(el.FIELD_NAME=='EXEMPTION_MFPC_MODULE1'){ 
          this.model2.MFPC_MODULE1_DOCUMENT.push(data);
        }
        else if(el.FIELD_NAME=='EXEMPTION_MFPC_MODULE3'){ 
          this.model2.MFPC_MODULE3_DOCUMENT.push(data);
        }
        else if(el.FIELD_NAME=='EXEMPTION_MFPC_MODULE6'){ 
          this.model2.MFPC_MODULE6_DOCUMENT.push(data);
        }
        else if(el.FIELD_NAME=='EXEMPTION_MFPC_CERTIFY'){ 
          this.model2.MFPC_CERTIFY_DOCUMENT.push(data);
        }
        else if(el.FIELD_NAME=='EXEMPTION_MFPAA_CERTIFY'){ 
          this.model2.MFPAA_CERTIFY_DOCUMENT.push(data);
        }
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

    this.getExemptionDocument(this.savedConsultantData.CONSULTANT_ID, 'CONSULTANT_EXEMPTION_FP_DOCUMENT');
  },
};
</script>

<style></style>

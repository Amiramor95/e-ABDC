<template>
  <div>
    <!--   CMSRL: No  -->
    <b-card class="no-shadow mb-4">    
      <b-form-group
        class="mt-2 col-md-6"
        label="Recruiter NRIC:"
        label-for="recruiter-nric-false"
      >
        <b-form-input
          id="recruiter-nric-false"
          v-mask="'######-##-####'"
          :masked="false"
          v-model="model.RECRUITER_NRIC_NO"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        class="mt-2 col-lg-6"
        id="input-group-1"
        label="Recruiter CMSRL No:"
        description=""
      >
        <b-form-input type="text" v-model="model.RECRUITER_CMSRL_NO"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        class="mt-2 pl-3 pr-3"
        label="Apprenticenship Program:"
        description="Upload Certificate from any Module 1 CFP/IFP/RFP/shariah RFP or Exemption Letter from FPAM"
      >
        <vue-form-generator
          :model="model2"
          :schema="fileUploadApprenticenship"
          :options="formOptions"
          ref="fileUploadApprenticenship"
        >
        </vue-form-generator>
      </b-form-group>
    </b-card>

    <!--   CMSRL: No  -->
  </div>
</template>

<script>
import Vue from "vue";
import * as services02module2 from "../../../../../app/module2/services02";
export default {
  name: "type-of-consultant-cmsrl-false",

  props: {
    savedConsultantData: Object,
    savedConsultantLicenseData: Object,
    distributorCmsrlData: Object,
  },

  data() {
    return {
      model:{
        RECRUITER_NRIC_NO: '',
        RECRUITER_CMSRL_NO: '',
      },

      model2: {
        APPRENTICESHIP_DOCS: [],
      },

      formOptions: {
        validateAfterChanged: true
      },

      fileUploadApprenticenship: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                theme: "list",
                multiple: false,
                text: 'Choose a File',
                model: 'APPRENTICESHIP_DOCS',
                type: 'vfg-consultant-custom-multiple-file',
                required: false,
              },
            ]
          }
        ]
      },
    };
  },

  created(){
    if(this.savedConsultantLicenseData){
      this.model = _.cloneDeep(this.savedConsultantLicenseData);
    }

    if(this.distributorCmsrlData){
      this.model.RECRUITER_CMSRL_NO = this.distributorCmsrlData.DIST_FP_CSMRL;
      this.model.RECRUITER_NRIC_NO = this.distributorCmsrlData.DIST_FP_NRIC;
    }
  },

  mounted(){
    if(this.savedConsultantLicenseData){
      this.getApprenticenshipCertificate();
    }
  },

  methods: {
    //get data to save
    getDataToSave() {
      let dataToSave = {
        RECRUITER_NRIC_NO: this.model.RECRUITER_NRIC_NO,
        RECRUITER_CMSRL_NO: this.model.RECRUITER_CMSRL_NO,
        CMSRL_CERT_DOCS_NAME: 'CONSULTANT_APPRENTICESHIP_CERTIFICATE',
        //APPRENTICESHIP_DOCS: this.model.APPRENTICESHIP_DOCS,
      };
      return dataToSave;
    },

    uploadApprenticenshipCertificate: async function() {
      const data = new FormData();
      data.append("CONSULTANT_ID", this.savedConsultantData.CONSULTANT_ID);
      data.append("TABLE_NAME", 'CONSULTANT_APPRENTICESHIP_CERTIFICATE');
      data.append("FIELD_NAME", 'CONSULTANT_APPRENTICESHIP_CERTIFICATE');
      for (let i = 0; i < this.model2.APPRENTICESHIP_DOCS.length; i++) {
        data.append("FILE[]", this.model2.APPRENTICESHIP_DOCS[i]);
      }

      const response = await services02module2.uploadConsultantDocuments(data);
      // if(response){
      //   if(response.message){
      //     Vue.$toast.open({
      //       message: 'Apprenticenship Certificate Uploaded Successfully',
      //       type: 'success',
      //     });
      //   }
      // }
    },

    getApprenticenshipCertificate: async function() {
      const response = await services02module2.getConsultantDocuments(this.savedConsultantData.CONSULTANT_ID, 'CONSULTANT_APPRENTICESHIP_CERTIFICATE');
      if(response && response.length>=1){
        response.forEach(el => {
          el.DOC_BLOB = this.b64toBlobPDF(el.DOC_BLOB, "application/pdf");

          el.DOC_BLOB = new File(
            [el.DOC_BLOB],
            //el.DOC_ORIGINAL_NAME + "." + el.DOC_FILETYPE,
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
          
          this.model2.APPRENTICESHIP_DOCS.push(data);
        });
      }
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

};
</script>

<style>
</style>

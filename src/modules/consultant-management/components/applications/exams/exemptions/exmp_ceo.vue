<template>
  <div>
      <b-form-group
        label-for="exemption-ceo-docs"
        description="Appointment approval by the SC/relevant authority for appointment"
        class="mt-2"
      >
          <vue-form-generator
            :model="model"
            :schema="exemptionDocumentUpload"
            :options="formOptions"
            ref="exemptionDocument"
          >
          </vue-form-generator>
      </b-form-group>
  </div>
</template>

<script>
import * as services02module2 from "@/app/module2/services02";
export default {
  name: "exemption-category-ceo",

  props: {
    savedConsultantData: Object
  },

  data() {
    return {
      model:{
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

  methods: {
    //get data to save
    getDataToSave() {
      let dataToSave = {
        EXEMPTION_CATEGORY_ID: null,
        EXEMPTION_CATEGORY_DOCUMENT_NAME: 'CONSULTANT_EXEMPTION_CEO_DOCUMENT',
      };
      return dataToSave;
    },

    //Save Exemption Data
    saveExemptionDocuments(){
      const data = new FormData();
      data.append("CONSULTANT_ID", this.savedConsultantData.CONSULTANT_ID);
      data.append("TABLE_NAME", 'CONSULTANT_EXEMPTION_CEO_DOCUMENT');
      data.append("FIELD_NAME", 'CONSULTANT_EXEMPTION_CEO');
      for (let i = 0; i < this.model.EXEMPTION_DOCUMENT.length; i++) {
        data.append("FILE[]", this.model.EXEMPTION_DOCUMENT[i]);
      }

      services02module2.uploadConsultantExtraDocuments(data);
    },

    getExemptionDocument: async function() {
      const response = await services02module2.getConsultantDocuments(this.savedConsultantData.CONSULTANT_ID, 'CONSULTANT_EXEMPTION_CEO_DOCUMENT');
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
        
        this.model.EXEMPTION_DOCUMENT.push(data);
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

  created() {
    this.getExemptionDocument();
  },
};
</script>

<style></style>

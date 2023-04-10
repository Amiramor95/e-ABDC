<template>
  <div>
    <br />

    <vue-form-generator :model="model" :schema="FileUploadSchema" :options="formOptions" 
      ref="tabForm7">
    </vue-form-generator>

    <br />
  </div>
</template>

<script>
import * as services02module2 from "../../../../app/module2/services02";

export default {
  props: {
    savedConsultantData: Object,
  },

  data() {
    return {
      model:{
        OTHERS_DOCUMENTS : [],
      },

      FileUploadSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                labels: "Upload Documents",
                accept: ".pdf",
                theme: "list",
                multiple: true,
                text: "Choose a File",
                model: "OTHERS_DOCUMENTS",
                type: "vfg-consultant-custom-multiple-file",
                styleClasses: "col-md-12",
                required: true,
                hint: "Accepted format : (.pdf)"
              },
            ],
          },
        ],
      },

      formOptions: {
        validateAfterChanged: true,
      },
    };
  },

  created(){
    this.getDocumentByID();
  },

  methods: {
    //Upload Consultant Other Documents
    uploadOtherDocuments: async function() {
      const data = new FormData();
      data.append("CONSULTANT_ID", this.savedConsultantData.CONSULTANT_ID);
      data.append("TABLE_NAME", 'CONSULTANT_OTHER_DOCUMENTS');
      data.append("FIELD_NAME", 'OTHER_DOCUMENT');
      for (let i = 0; i < this.model.OTHERS_DOCUMENTS.length; i++) {
        data.append("FILE[]", this.model.OTHERS_DOCUMENTS[i]);
      }

      await services02module2.uploadConsultantDocuments(data);
    },

    getDocumentByID: async function() {
      const response = await services02module2.getConsultantDocuments(this.savedConsultantData.CONSULTANT_ID, 'CONSULTANT_OTHER_DOCUMENTS');
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
        
        this.model.OTHERS_DOCUMENTS.push(data);
      });

      // console.log(
      //   "getConsultantDocuments: ",
      //   this.model.OTHERS_DOCUMENTS
      // );
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

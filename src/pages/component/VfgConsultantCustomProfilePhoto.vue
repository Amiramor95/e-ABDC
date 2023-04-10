
<template>
  <div class="row">
    <div class="p-2">
    <!-- <div id="app"> -->

     <label>{{ schema.labels }} </label>
     <label><span class="colors" v-if="schema.required"> *</span></label>
     <template>
      <VueFileAgent
        ref="vueFileAgent"
        :theme="schema.theme"
        :multiple="schema.multiple"
        :deletable="true"
        :downloadable="true"
        :linkable="true"
        :meta="true"
        :accept="'.jpeg,.png,.jpg'"
        :maxSize="'2MB'"
        :maxFiles="14"
        :helpText="schema.text"
        :errorText="{
          type: 'Invalid file type.',
          size: 'Files should not exceed 2MB in size'
        }"
        @select="filesSelected($event)"
                  @beforedelete="onBeforeDelete($event)"
          @delete="fileDeleted($event)"
        v-model="value"
      ></VueFileAgent>
<!--       </br>-->
    </template>
    <!-- </div> -->
    </div>
  </div>
</template>
<script>
import { abstractField } from "vue-form-generator";
import * as services02module2 from "../../app/module2/services02";
export default {
  data() {
    return {
      uploadFileOject: [],
      fileRecords: [],
      fileRecordsForUpload: [],
      uploadUrl: "https://www.mocky.io/v2/5d4fb20b3000005c111099e3",
      uploadHeaders: {
        "X-Test-Header": "vue-file-agent"
      }
    };
  },
  mixins: [abstractField],
  methods: {
    info() {
    },

    deleteUploadedFile: function(fileRecord) {
      this.uploadFileOject = [];
      //alert(fileRecord);
      this.$refs.vueFileAgent.deleteUpload(
        this.uploadUrl,
        this.uploadHeaders,
        fileRecord
      );
      var i;
      for (i = 0; i < this.fileRecordsForUpload.length; i++) {
        this.uploadFileOject.push(this.fileRecordsForUpload[i].file);
      }
      console.log(this.uploadFileOject);

      this.value = this.uploadFileOject;
    },
    filesSelected: function(fileRecordsNewlySelected) {
      this.uploadFileOject = [];
      //this.uploadFileOject = this.uploadFileOject.concat(this.value);
      var validFileRecords = fileRecordsNewlySelected.filter(
        fileRecord => !fileRecord.error
      );
      this.fileRecordsForUpload = this.fileRecordsForUpload.concat(
        validFileRecords
      );
      var i;

      for (i = 0; i < this.fileRecordsForUpload.length; i++) {
        this.uploadFileOject.push(this.fileRecordsForUpload[i].file);
      }
      console.log(this.uploadFileOject);

      this.value = this.uploadFileOject;

    },

    onBeforeDelete: function(fileRecord) {

      var i = this.fileRecordsForUpload.indexOf(fileRecord);
      console.log(i);
      if (i !== -1) {
        if (confirm("Are you sure you want to delete this document?")) {
          // queued file, not yet uploaded. Just remove from the arrays
          this.fileRecordsForUpload.splice(i, 1);
          var k = this.fileRecords.indexOf(fileRecord);
          if (k !== -1) this.fileRecords.splice(k, 1);
          this.uploadFileOject = [];
          for (i = 0; i < this.fileRecordsForUpload.length; i++) {
            this.uploadFileOject.push(this.fileRecordsForUpload[i].file);
          }
          console.log(this.uploadFileOject);

          this.value = this.uploadFileOject;
        }

      } else {

        if (confirm("Are you sure you want to delete this document?")) {
          this.$refs.vueFileAgent.deleteFileRecord(fileRecord); // will trigger 'delete' event
          // this.deleteDocument(fileRecord.docID);

        }
      }
    },

    // deleteDocument: async function (val) {
    //   const response = await services02module2.deleteConsultantUploadedDocument(val);
    // },

    fileDeleted: function(fileRecord) {
      console.log("file delete test",fileRecord);
      var i = this.fileRecordsForUpload.indexOf(fileRecord);
      if (i == -1) {
        this.fileRecordsForUpload.splice(i, 1);
      } else {
        this.deleteUploadedFile(fileRecord);
      }
    }
  }
};
</script>
<style scoped>
.hint {

}
.width {
  width: 175%;
}
.color {
  color: red;
}
</style>

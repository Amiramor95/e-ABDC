
<template>
  <div class="width">

    <label>{{ schema.labels }}</label>
    <template>
      <VueFileAgent
        ref="vueFileAgent"
        :theme="'list'"
        :multiple="false"
        :deletable="true"
        :downloadable="true"
        :linkable="true"
        :meta="true"
        :accept="'.pdf'"
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

    </template>
    <!-- </div> -->
  </div>
</template>
<script>
  import { abstractField } from "vue-form-generator";
  import * as servicesModule1 from "../../app/module1/services01";
  import * as servicesModule6 from "../../app/module1/services06";

  export default {
    data() {
      return {
        uploadFileOject: [],
        fileRecord: [],
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
        // console.log(this.value);
        //alert(this.value);
      },

      deleteUploadedFile: function(fileRecord) {
        this.$refs.vueFileAgent.deleteUpload(
          this.uploadUrl,
          this.uploadHeaders,
          fileRecord
        );
      },
      filesSelected: function(fileRecordsNewlySelected) {
        var validFileRecords = fileRecordsNewlySelected.filter(
          fileRecord => !fileRecord.error
        );
        this.fileRecordsForUpload = this.fileRecordsForUpload.concat(
          validFileRecords
        );
        //this.uploadFileName = this.fileRecordsForUpload[0].file.name;
        this.uploadFileOject = this.fileRecordsForUpload[0].file;
        this.value = this.uploadFileOject;
        // console.log(this.fileRecordsForUpload[0].file);

      },

      onBeforeDelete: function(fileRecord) {
        var i = this.fileRecordsForUpload.indexOf(fileRecord);
        if (i !== -1) {
          console.log("before delete");
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
        } else {
          //this.$refs.vueFileAgent.deleteFileRecord(fileRecord);
          if (confirm("Are you sure you want to delete this document?")) {
            this.$refs.vueFileAgent.deleteFileRecord(fileRecord); // will trigger 'delete' event
            this.deleteDocument(fileRecord.docID);
          }
        }
      },

      deleteDocument: async function (val) {
        //alert(val);
        const response = await servicesModule6.deleteDistributorDocument(val);
      },

      fileDeleted: function(fileRecord) {
        console.log("file delete");
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
  .width {
    width: 175%;
  }
  .color {
    color: red;
  }
</style>

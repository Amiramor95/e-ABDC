
<template>
  <div class="width">
    <!-- <div id="app"> -->
    <!-- <label>{{ schema.labels }} <span class="color">*</span></label> -->
    <label>{{ schema.labels }}</label>
    <template>
      <VueFileAgent
        ref="vueFileAgent"
        :uploadUrl="'https://example.com'"
        :theme="'list'"
        :multiple="false"
        :downloadable="true"
        :deletable="true"
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
        v-model="value"
      ></VueFileAgent>
      <!-- <VueFileAgent
          ref="vueFileAgentEdit"
          :theme="'list'"
          :multiple="false"
          :deletable="true"
          :meta="true"
          :accept="'image/*'"
          :maxSize="'10MB'"
          :maxFiles="14"
          :helpText="schema.text2"
          :errorText="{
            type: 'Invalid file type. Only excel Allowed',
            size: 'Files should not exceed 10MB in size'
          }"
          @select="editfilesSelected($event)"
          @beforedelete="editonBeforeDelete($event)"
          @delete="editfileDeleted($event)"
          v-model="fileRecords2"
        ></VueFileAgent> -->
    </template>
    <!-- </div> -->
  </div>
</template>
<script>
import { abstractField } from "vue-form-generator";
export default {
  data() {
    return {
      uploadFileOject: "",
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
        // queued file, not yet uploaded. Just remove from the arrays
        this.fileRecordsForUpload.splice(i, 1);
        var k = this.fileRecords.indexOf(fileRecord);
        if (k !== -1) this.fileRecords.splice(k, 1);
      } else {
        this.$refs.vueFileAgent.deleteFileRecord(fileRecord);
        // if (confirm("Are you sure you want to delete?")) {
        //   this.$refs.vueFileAgent.deleteFileRecord(fileRecord); // will trigger 'delete' event
        // }
      }
    },
    fileDeleted: function(fileRecord) {
      var i = this.fileRecordsForUpload.indexOf(fileRecord);
      if (i !== -1) {
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

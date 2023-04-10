
<template>
  <div class="width">
    <!-- <div id="app"> -->
    <!-- <label>{{ schema.labels }} <span class="color">*</span></label> -->
    <label>{{ schema.labels }}</label>
    <template>
      <VueFileAgent
        ref="vueFileAgent"
        :theme="schema.theme"
        :readonly="true"
        :multiple="false"
        :linkable="true"
        :meta="true"
        :accept="schema.accept"
        :maxSize="'5MB'"
        :maxFiles="14"
        :helpText="schema.text"
        :errorText="{
          type: 'Invalid file type.',
          size: 'Files should not exceed 5MB in size'
        }"
        @select="filesSelected($event)"
        v-model="value"
        @delete="fileDeleted($event)"
      ></VueFileAgent>
    </template>
    <!-- </div> -->
  </div>
</template>
<script>
import { abstractField } from "vue-form-generator";
import * as servicesModule1 from '../../app/module1/services05'
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

    fileDeleted: function(fileRecord) {
      console.log("file delete approval");
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

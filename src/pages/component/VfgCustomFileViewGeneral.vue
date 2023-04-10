<template>
  <div class="width">
    <!-- <div id="app"> -->

    <label>{{ schema.labels }} </label>
    <label><span class="colors" v-if="schema.required"> *</span></label>
    <template>
      <VueFileAgent
        ref="vueFileAgent"
        :theme="schema.theme"
        :multiple="schema.multiple"
        :deletable="false"
        :downloadable="true"
        :linkable="true"
        :readonly="true"
        :meta="true"
        :accept="'.pdf,.jpeg,.png'"
        :maxSize="'2MB'"
        :maxFiles="14"
        :helpText="schema.text"
        :errorText="{
          type: 'Invalid file type.',
          size: 'Files should not exceed 2MB in size'
        }"
        @select="filesSelected($event)"
        @delete="fileDeleted($event)"
        v-model="value"
      ></VueFileAgent>

    </template>
    <!-- </div> -->
  </div>
</template>
<script>
import { abstractField } from "vue-form-generator";
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

    deleteUploadedFile: function (fileRecord) {
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
      this.value = this.uploadFileOject;
    },
    filesSelected: function (fileRecordsNewlySelected) {
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

    fileDeleted: function (fileRecord) {
      var i = this.fileRecordsForUpload.indexOf(fileRecord);
      if (i == -1) {
        this.fileRecordsForUpload.splice(i, 1);
      } else {
        this.deleteUploadedFile(fileRecord);
      }
    }
  }
}
</script>
<style scoped>
.width {
  width: 175%;
}
.color {
  color: red;
}
</style>

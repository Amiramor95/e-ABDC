<template>
  <div>
    <div v-if="model">
      <a href="#" @click="openURL()">{{ model.DOC_ORIGINAL_NAME }}</a>
    </div>
  </div>
</template>

<script>
import * as GeneralSettingsAPI from "@/modules/consultant-management/services/general";

export default {
  name: "fimm-ui-file-viewer",
  props: ["file_id"],
  data() {
    return {
      model: null,
    };
  },
  computed: {},
  methods: {
    async loadFile() {
      console.log(this.file_id);
      try {
        const response = await GeneralSettingsAPI.get_file(this.file_id);
        this.model = response.data;
        console.log(this.model);
      } catch (error) {
        console.log(error);
      }
    },
    openURL() {
      var fileType = "";
      var item_type = this.model.DOC_FILETYPE;
      if (item_type == "png" || item_type == "jpg" || item_type == "jpeg") {
        fileType = "image/" + item_type + ";base64";
      } else {
        fileType = "application/" + item_type + ";base64";
      }
      // release existing URL object
      var byteCharacters = window.atob(this.model.DOC_BLOB);
      var byteNumbers = new Array(byteCharacters.length);
      for (var i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      var file = new Blob([byteArray], {
        type: fileType,
      });
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
      URL.revokeObjectURL(fileURL);
    },
  },
  created() {
    this.loadFile();
  },
};
</script>

<style>
</style>

<template>
  <div>
    <vue-form-generator
      :model="model"
      :schema="schema"
      :options="formOptions"
      ref="registerNewForm"
      @model-updated="onModelUpdated"
    >
    </vue-form-generator>

    <div class="ml-4 my-3">
      <vue-form-generator
        :model="model"
        :schema="fileUploadSchema"
        :options="formOptions"
        ref="fileUploadForm"
        @model-updated="onModelUpdated"
      >
      </vue-form-generator>
    </div>

    <div class="mb-3 mr-3 float-right">
      <button
        :disabled="!fileRecordsForUpload.length && !this.userId"
        @click="addParticipant"
        type="button"
        class="ml-1 btn btn-success btn-fill btn-md"
      >
        <i class="fa fa-plus" /> &nbsp; Add Participant
      </button>
    </div>
  </div>
</template>
<script>
export default {
  mounted() {},
  methods: {
    onModelUpdated(newVal, schema) {
      if (schema == "title") {
        this.model.title = String(newVal).toUpperCase();
      }
      if (schema == "passportNumber") {
        this.model.passportNumber = String(newVal).toUpperCase();
      }
      if (schema == "publisher") {
        this.model.publisher = String(newVal).toUpperCase();
      }
      if (schema == "consultantName") {
        this.model.consultantName = String(newVal).toUpperCase();
      }
      if (schema == "organization") {
        this.model.organization = String(newVal).toUpperCase();
      }
    },
    addParticipant() {
      this.$emit("upload-by-individual", this.model);
    },
  },
  props: {
    model: Object,
    schema: Object,
    fileRecordsForUpload: Array,
    userId: Number,
  },
  data() {
    return {
      fileUploadSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                labels: "Upload Supporting Document",
                accept: ".pdf",
                multiple: false,
                text: "Choose a File",
                model: "file",
                type: "vfg-custom-multiple-file",
                styleClasses: "col-md-12 pl-0",
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
};
</script>

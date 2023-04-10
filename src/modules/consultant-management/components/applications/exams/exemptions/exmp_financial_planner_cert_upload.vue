<template>
  <div>
    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <label>{{ label_date }}</label>
          <datepicker placeholder="dd-MM-yyyy" format="dd-MMM-yyyy" input-class="form-control bgcolor" :typeable="false" :value="date_selected"></datepicker>
        </div>
      </div>

      <div class="col-md-6">
        <div class="form-group">
          <label>Upload document:</label>
          <b-form-file v-model="file_upload" class></b-form-file>
          <small class="form-text text-muted">{{ description_file }}</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "exemption-category-financial-planner-upload",
  props: {
    label_date: {
      type: String,
    },
    description_file: {
      type: String,
    },
    date: {
      type: Date,
    },
  },
  data() {
    return {
      date_selected: null,
      file_upload: null,
    };
  },
  methods: {

  },
};
</script>

<style></style>

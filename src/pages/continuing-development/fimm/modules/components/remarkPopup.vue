<template>
  <vudal name="simpleModal" class="widthModal">
    <div class="header">Remark<i class="close icon">&times;</i></div>
    <div class="content">
      <vue-form-generator
        :model="model"
        :schema="readMoreSchema"
        :options="formOptions"
      />
    </div>
    <div class="actions">
      <button
        type="button"
        class="cancel vudal-btn mr-2 btn btn-danger btn-fill btn-md"
      >
        <i class="fa fa-times" /> &nbsp; Close
      </button>
    </div>
  </vudal>
</template>
<script>
import Vudal from "vudal";
export default {
  components: {
    Vudal,
  },
  props: ['model'],
  data() {
    return {
      formOptions: {
        validateAfterChanged: true,
      },

      readMoreSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "textArea",
                model: "showRemark",
                rows: 5,
                validator: "string",
                styleClasses: "col-md-12",
                readonly: true,
                disabled: true,
              },
            ],
          },
        ],
      },
    };
  },
};
</script>
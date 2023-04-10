/* eslint-disable */
<template>
  <!-- <div class="row col-md-12"> -->
  <!-- <br />
    <label>{{ schema.labels }} <span class="color">*</span></label>
   <datepicker
        placeholder="dd-MM-yyyy"
        :format="schema.format"
        input-class="form-control form-control-md bgcolor"
        v-model="value"
        :typeable="schema.typeable"
        name="uniquename"
      ></datepicker>
  </div> -->
  <div class="width">
    <!-- <div> -->
    <label>{{ schema.labels }} <span class="colors" v-if="schema.required">*</span></label>
    <!-- </div> -->
    <div>
      <datepicker
        placeholder="dd MMM yyyy"
        :format="schema.format"
        input-class="form-control"
        v-model="value"
        :typeable="schema.typeable"
        name="uniquename"
        :minimum-view="schema.view"
        :disabled-dates="disabledDates"
        :disabled="schema.disabled"
      ></datepicker>
    </div>
  </div>
</template>
<script>
import { abstractField } from "vue-form-generator";

export default {
  mixins: [abstractField],
  data() {
    return {
      disabledDates: {
        to: new Date(Date.now() - 8640000)
      }
    }
  }
};
</script>
<style lang="scss">
.width {
  width: 175%;
}

.colors {
  color: red;
}
</style>
/* eslint-disable */

/* eslint-disable */
<template>
  <div class="width">
    <!-- <div> -->
    <label>{{ schema.labels }} <span class="colors">*</span></label>
    <!-- </div> -->
    <div>
      <datepicker
        :placeholder="schema.placeholder"
        :format="schema.format"
        input-class="form-control calendar"
        v-model="value"
        :typeable="schema.typeable"
        name="uniquename"
        :minimum-view="schema.view"
        :disabled="schema.disabled"
      ></datepicker>
    </div>
  </div>
</template>
<script>
import { abstractField } from "vue-form-generator";
export default {
  mixins: [abstractField]
  //   data() {
  //         return {

  //         }
  //     },
};
</script>
<style lang="scss">
.calendar {
  background-color: #ffffff !important;
}
.width {
  width: 175%;
}

.colors {
  color: red;
}
</style>
/* eslint-disable */

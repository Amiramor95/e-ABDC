/* eslint-disable */
<template>
  <div class="width">
    <label>{{ schema.labels }} </label>
    <div>
      <datepicker
        placeholder="dd-mmm-yyyy"
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
};
</script>
<style lang="scss">
.calendar{
  background-color: #FFFFFF !important;
}
.width {
  width: 175%;
}

.colors {
  color: red;
}
</style>
/* eslint-disable */

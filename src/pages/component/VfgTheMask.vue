<template>
  <div class="width">
    <label>{{ schema.labels }} <span class="color">*</span></label>
    <div>
      <the-mask
        class="form-control"
        :mask="schema.mask"
        v-model="value"
        :placeholder="schema.placeholder"
        :tokens="schema.tokens"
        :disabled="schema.disabled"
        :masked="schema.masked"
      ></the-mask>
    </div>
  </div>
</template>
<script>
import { abstractField } from "vue-form-generator";
export default {
  mixins: [abstractField]
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


<template>
  <div class="width">
    <input
      ref="input"
      class="form-control form-control-md"
      v-model="value"
      :placeholder="schema.placeholder"
      v-currency="options"
    />
  </div>
</template>
<script>
import { abstractField } from "vue-form-generator";
export default {
  mixins: [abstractField],

  computed: {
    options() {
      return {
        currency: "MYR",
        locale: "ms"
      };
    }
  }
};
</script>
<style lang="scss">
.colors {
  color: red;
}
.width {
  width: 175%;
}
</style>

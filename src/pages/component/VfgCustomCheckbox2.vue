  
<template>
  <div class="width">
    <label>{{ schema.labels }}</label>
    <div class="col-12">
      <div class="row mb-2">
        <va-checkbox class="col-2" v-model="value" />
        <span class="col mt-1 description">
          Business Address is same as Registered Address
        </span>
      </div>
    </div>
    <!-- <input
      type="text"
      v-model="value"
      :placeholder="schema.placeholder"
      class="form-control form-control-md"
    /> -->
  </div>
</template>
<script>
import { abstractField } from "vue-form-generator";
export default {
  mixins: [abstractField],
  methods: {
    info(info) {
      console.log("infooo");
      alert(info);
    }
  }
};
</script>

<style lang="scss">
.width {
  width: 175%;
}
</style>
  
<template>
  <div class="col-md-12">
    <label
      >{{ schema.labels }}
      <span v-if="schema.hide != true" @click="info(schema.descInfo)"
        ><i class="fa fa-info-circle"></i></span
    ></label>
    <input
      type="text"
      v-model="value"
      :placeholder="schema.placeholder"
      class="form-control form-control-md"
    />
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
/* eslint-disable */
<template>
  <div class="width">
    <!-- <div> -->
    <label>{{ schema.labels }} <span class="colors">*</span></label>
    <!-- </div> -->
    <div>
      <b-time
        :value="term"
        input-class="form-control"
        format="h:m:s"
        @input="searchDate"
        v-model="value"
        name="uniquename"
        show-seconds
        :disabled="schema.disabled"
        locale="en"
      >
      </b-time>
    </div>
  </div>
</template>
<script>
import { abstractField } from "vue-form-generator";
import moment from "moment";
export default {
  mixins: [abstractField],
  data() {
    return {
      term: null,
    };
  },
  methods: {
    searchDate(time) {
      this.term = moment(time).format("h:m:s");
      //alert(this.term);
    },
  },
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

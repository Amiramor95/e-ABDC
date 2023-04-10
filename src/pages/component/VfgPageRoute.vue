/* eslint-disable */
<template>
<div class="input-group mb-12">
  <div class="input-group-prepend">
    <span class="input-group-text" id="basic-addon1">@</span>
  </div>
  <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">
</div>

</template>

<style>
.input-group {
  display: inline;
}
</style>
<script>
import { abstractField } from 'vue-form-generator'
export default {
  props: {
  },
  props: {
  },
  mixins: [abstractField],

  data() {
    return {
      term: null
    }
  },

  methods : {
    search(e) {

      this.term = e
      // alert(e)
    }
  }
}
</script>
<style lang="scss">
.color {
  color: red;
}

.bgcolor {
  background-color: white !important;
}
</style>
/* eslint-disable */

<template>
  <vue-json-to-csv :json-data="[ { name: 'Ibrahim', surname: 'Roe' }, { name: 'John', surname: 'Doe' } ]" :labels="{ name: { title: 'First name' } }" :csv-title="My_CSV">
    <b-badge v-b-tooltip.hover title="excel" class="mr-1" variant="success">
      <i class="fa fa-file-excel-o"></i>
    </b-badge>
  </vue-json-to-csv>
  <!-- <download-excel
    class="btn btn-default"
    :header="header"
    :data="json_data"
    :fields="json_fields"
    worksheet="sheet1"
    name="filename.xls"
  >
    Download Excel (you can customize this with html code!)
  </download-excel> -->
</template>

<script>
import Vue from 'vue'
import VueJsonToCsv from 'vue-json-to-csv'

Vue.use(VueJsonToCsv)
export default {
  props: ["json_fields", "json_data", "header"],
  name: "ExcelToCsv",
  methods: {},
  components: {
    VueJsonToCsv,
  },
  data() {
    return {};
  }
};
</script>
<style>
</style>

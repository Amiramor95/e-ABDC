<template>
      <b-badge v-b-tooltip.hover v-on:click="onexport" title="Export to Excel" class="mr-1" variant="success">
      <i class="fa fa-file-excel-o"></i>
    </b-badge>
</template>

<script>

import XLSX from 'xlsx' 
export default {
  props: ["json_data","excelname"],
  name: "exportExcel",
  methods: {
    onexport() {
      // alert(this.json_data)
      // alert(this.json_data.animals)
            // export json to Worksheet of Excel
      // only array possible
var sheetname = [];
      var value = [];

      this.json_data.forEach(element => {
        sheetname.push(element.sheet);
        value.push(XLSX.utils.json_to_sheet(element.value));

      });
      var wb = XLSX.utils.book_new() // make Workbook of Excel

      value.forEach((element,index, array) => {

        XLSX.utils.book_append_sheet(wb, value[index], sheetname[index]) 

      });

      XLSX.writeFile(wb, this.excelname+'.xlsx') // name of the file is 'book.xlsx'

    }
  },
  data() {
    return {};
  }
};
</script>
<style>
</style>

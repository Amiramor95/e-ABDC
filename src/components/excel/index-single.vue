<template>
  <b-badge
    v-b-tooltip.hover
    v-on:click="onexport"
    title="Export to Excel"
    class="mr-1"
    variant="success"
  >
    <i class="fa fa-file-excel-o"></i>
  </b-badge>
</template>

<script>
import XLSX from "xlsx";
export default {
  props: ["json_data", "excelname", "sheetname","column"],
  name: "exportExcel",
  methods: {
    onexport() {
      // Using same variables as the above answer

      var value = XLSX.utils.json_to_sheet(this.json_data, { origin: 'A2', skipHeader: true });

      XLSX.utils.sheet_add_aoa(value, [this.column]);
      var wb = XLSX.utils.book_new(); // make Workbook of Excel
          
        XLSX.utils.book_append_sheet(wb, value, this.sheetname);

      XLSX.writeFile(wb, this.excelname + ".xlsx"); // name of the file is 'book.xlsx'
    }
  },
  data() {
    return {};
  }
};
</script>
<style></style>

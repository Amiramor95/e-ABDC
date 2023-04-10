<template>
  <button
    v-on:click="onexport"
    type="button"
    class="btn btn-secondary btn-fill btn-md"
  >
    <i class="fa fa fa-download"/> &nbsp; Download
  </button>
</template>

<script>
import XLSX from "xlsx";
export default {
  props: ["json_data", "excelname", "sheetname","column","filters"],
  name: "exportExcel",
  methods: {
    onexport() {
      // Using same variables as the above answer
      let row = this.filters.length
      var value = XLSX.utils.json_to_sheet(this.json_data, { origin: 'A2', skipHeader: true });

      XLSX.utils.sheet_add_aoa(value, [this.column])
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

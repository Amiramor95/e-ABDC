<template>
  <div>
    <input 
      type="file" 
      :id="titleId" 
      hidden
      @change="excelExport"
      accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    />
    <label class="btn btn-primary btn-fill btn-md" :for="titleId">
      <i class="fa fa-upload" /> &nbsp; {{ titleButton }}
    </label>
  </div>
</template>

<script>
import XLSX from 'xlsx';
export default {
  name: "excelUpload",
  props: ["titleButton","titleId"],
  data() {
    return {
      excelData: []
    };
  },
  methods: {
    excelExport(event) {
      var input = event.target;
      var reader = new FileReader();
      reader.onload = () => {
        var fileData = reader.result;
        var wb = XLSX.read(fileData, {type : 'binary'});
        wb.SheetNames.forEach((sheetName) => {

	        var rowObj =XLSX.utils.sheet_to_json(wb.Sheets[sheetName]);	        
          this.excelData = JSON.stringify(rowObj)

          this.$emit('uploaded', this.excelData)
        })
      };
      reader.readAsBinaryString(input.files[0]);
    },
  }
};
</script>
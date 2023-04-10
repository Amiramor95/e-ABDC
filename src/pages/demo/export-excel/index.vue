<template>
  <div>
    <!-- <excelToCsv :json_data="Data" :csv-title="title"></excelToCsv> -->
    <downloadExcel
      :json_data="Data"
      :excelname="excelname"
      :sheetname="sheetname"
      :column="column"
    ></downloadExcel>

    <multiDownloadExcel
      :json_data="Datas"
      :excelname="excelname"
    ></multiDownloadExcel>
  </div>
</template>
<script>
export default {
  data() {
    return {
      column: ["FirstName", "Last Name"],
      excelname: "download-file",
      sheetname: "download-sheet",
      Data: [
        { col1: "Joe", surname: "Roe" },
        { col1: "John", surname: "Doe" }
      ],
      title: "test",
      labels: "labels",
      Datas: [
        {
          sheet: "animals",
          value: [
            { name: "cat", category: "animal" },
            { name: "dog", category: "animal" },
            { name: "mouse", category: "animal" }
          ]
        },
        {
          sheet: "pokemon",
          value: [
            { name: "pikachu", category: "pokemon" },
            { name: "Arbok", category: "pokemon" },
            { name: "Eevee", category: "pokemon" }
          ]
        }
      ]
    };
  }
};
</script>

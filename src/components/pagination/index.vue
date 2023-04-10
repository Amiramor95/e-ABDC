<template><v-page
    :total-row="totalRow"
    @page-change="pageChange"
  ></v-page>
</template>

<script>
export default {

  name: "pagination",
  data () {
    return {
      totalRow: 100 // required option
    }
  },
  methods: {
    // receive page info change callback
    pageChange (pInfo) {
      console.log(pInfo) // { pageNumber: 1, pageSize: 10 }
    }
  }
}
</script>
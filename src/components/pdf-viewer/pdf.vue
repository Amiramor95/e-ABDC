<template>
  <div>
    <pdf
      v-for="i in numPages"
      :key="i"
      :src="src"
      :page="i"
      style="display: inline-block; border-bottom: 1px dotted grey; width: 100%;"
    ></pdf>
  </div>
</template>

<script>
import pdf from "vue-pdf";

export default {
  components: {
    pdf
  },
  props: ["pdfURL"],
  name: "Pdf",
  data() {
    return {
      src: pdf.createLoadingTask(this.pdfURL),
      numPages: undefined
    };
  },
  mounted() {
    this.src.promise.then(pdf => {
      this.numPages = pdf.numPages;
    });
  }
};
</script>

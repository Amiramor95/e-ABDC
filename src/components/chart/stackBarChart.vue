<template>
  <div>
      <apexchart type="bar" 
      height="500"
      :options="chartOptionsPrestasiPeratus" 
      :series="seriesPrestasiPeratus">
      </apexchart>
  </div>
</template>

<script>
import * as serviceKoolreport from "../../app/koolreport/services";

export default {
  props: ["height"],
  name: "HorizontalBarChart",
  data() {
    return {
      chartOption: null
    };
  },
  mounted() {
    this.getReport();
  },
  methods: {
    getReport: async function() {
      const response = await serviceKoolreport.getReport(this.report);
      this.reportRawData = response;
    }
  }
};
</script>

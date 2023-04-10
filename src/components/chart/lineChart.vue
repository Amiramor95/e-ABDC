<template>
  <div>
      <apexchart type="bar" 
      height="this.height"
      :options="chartOptionsPrestasiPeratus" 
      :series="seriesPrestasiPeratus">
      </apexchart>
  </div>
</template>

<script>
import * as serviceKoolreport from "../../app/koolreport/services";

export default {
  props: ["reportId"],
  name: "LineChart",
  data() {
    return {
      report: this.reportId,
      reportRawData: null
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

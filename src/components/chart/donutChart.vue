<template>
  <div>
      <apexchart type="bar" 
      height="this.height"
      :options="chartOptions" 
      :series="chartSeries">
      </apexchart>
  </div>
</template>

<script>
import * as serviceKoolreport from "../../app/koolreport/services";
import { hex2rgb } from '../../services/vuestic-ui';
export default {
  watch: {
  },
  props: ["reportId"],
  name: "DonutChart",
  data() {
    return {
      chartOptions: null,
      chartSeries : [],
      report: this.reportId,
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

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
import { hex2rgb } from '../../services/vuestic-ui';
export default {
  watch: {
  },
  props: ["reportId"],
  name: "BubbleChart",
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

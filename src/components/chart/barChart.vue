<template>
  <div>
    <va-card stripe="info" :title="this.reportName">
      <apexchart width="500" :type="this.chartType" :options="options" :series="series"></apexchart>
    </va-card>
  </div>
</template>

<script>
import * as serviceKoolreport from "../../app/koolreport/services";
import { hex2rgb } from '../../services/vuestic-ui';
export default {
  watch: {
  },
  props: ["reportId","reportName","chartType"],
  name: "barChart",
  data() {
    return {
      options: {
        chart: {
          id: 'vuechart-example'
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        }
      },
      series: [{
        name: 'series-1',
        data: [30, 40, 45, 50, 49, 60, 70, 91]
      }]
    }
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

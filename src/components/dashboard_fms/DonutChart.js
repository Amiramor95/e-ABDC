import { Doughnut, mixins } from "vue-chartjs";
//import ChartDataLabels from 'chartjs-plugin-datalabels';
import 'chart.piecelabel.js';
export default {
  extends: Doughnut,
  props: ["data", "options"],
  mounted() {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    //this.renderChart(this.data, this.options);
   // this.addPlugin(ChartDataLabels);
    this.renderDonutChart();
  },
  computed: {
    chartData: function() {
      return this.data;
    }
  },
  methods: {
    renderDonutChart: function() {
    this.renderChart(
      this.chartData,
      this.options,
    );
    }
  },
  watch: {
    data: function() {
      //this.chart.destroy();
      this.renderDonutChart();
    }
  }
};
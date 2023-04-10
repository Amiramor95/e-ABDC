import { PolarArea, mixins } from "vue-chartjs";
import 'chart.piecelabel.js';
export default {
  extends: PolarArea,
  props: ["data", "options"],
  mounted() {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    //this.renderChart(this.data, this.options);
    this.renderAreaChart();
  },
  computed: {
    chartData: function() {
      return this.data;
    }
  },
  methods: {
    renderAreaChart: function() {
    this.renderChart(
      this.chartData,
      this.options,
    );
    }
  },
  watch: {
    data: function() {
      //this.chart.destroy();
      this.renderAreaChart();
    }
  }
};
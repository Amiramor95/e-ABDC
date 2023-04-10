import { Pie, mixins } from "vue-chartjs";
import 'chart.piecelabel.js';
export default {
  extends: Pie,
  props: ["data", "options"],
  mounted() {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    //this.renderChart(this.data, this.options);
    this.renderPieChart();
   // const HTML = this.$data._chart.generateLegend()
    //  this.$emit('generated', HTML)
  },
  computed: {
    chartData: function() {
      return this.data;
    }
  },
  methods: {
      renderPieChart: function() {
      this.renderChart(
      this.chartData,
      this.options,
    );
    },

  },
  watch: {
    data: function() {
      //this.chart.destroy();
      this.renderPieChart();
    }
  }
};

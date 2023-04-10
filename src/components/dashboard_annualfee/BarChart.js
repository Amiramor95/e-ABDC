import { Bar, mixins } from "vue-chartjs";
export default {
  extends: Bar,
  props: ["data", "options"],
  mounted() {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    //this.renderChart(this.data, this.options);
    this.renderBarChart();
  },
  computed: {
    chartData: function() {
      return this.data;
    }
  },
  methods: {
    renderBarChart: function() {
    this.renderChart(
      this.chartData,
      this.options,
    );
    }
  },
  watch: {
    data: function() {
      //this.chart.destroy();
      this.renderBarChart();
    }
  }
};
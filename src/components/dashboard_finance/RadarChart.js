import { Radar, mixins } from "vue-chartjs";
export default {
  extends: Radar,
  props: ["data", "options"],
  mounted() {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    //this.renderChart(this.data, this.options);
    this.renderRadarChart();
  },
  computed: {
    chartData: function() {
      return this.data;
    }
  },
  methods: {
    renderRadarChart: function() {
    this.renderChart(
      this.chartData,
      this.options,
    );
    }
  },
  watch: {
    data: function() {
      //this.chart.destroy();
      this.renderRadarChart();
    }
  }
};

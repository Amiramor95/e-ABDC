<template>
  <div>
      Hello from koolreport.
      <br>
      Hello from koolreport. {{ reportRawData }}
      <br>
      Hello from koolreport.
  </div>
</template>

<script>
import * as serviceKoolreport from "../../app/koolreport/services";

export default {
  props: ["reportId"],
  name: "VerticalBarChart",
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

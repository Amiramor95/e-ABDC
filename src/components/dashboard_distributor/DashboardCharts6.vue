<template>
  <div class="row row-equal">
    <!-- <div class="flex xs12 xl6">
      <va-card :title="$t('Test')">
        <koolreport :reportId=1></koolreport>
      </va-card>
    </div>
    <div class="flex xs12 xl6">
      <va-card :title="$t('Test')">
        <koolreport :reportId=1></koolreport>
      </va-card>  
    </div> -->

    <div class="flex xs12 md6 xl12">
      <va-card title="Graph 4">
        <!-- <va-button
          icon="fa fa-print"
          flat
          slot="actions"
          class="mr-0"
          @click="printChart"
        /> -->
        <!-- <va-chart
          class="chart chart--donut"
          :data="donutChartData"
          type="donut"
        /> -->
        <va-chart :data="verticalBarChartData" type="vertical-bar" />
      </va-card>
    </div>

    <!-- <div class="flex xs12 md6 xl3">
      <dashboard-contributors-chart />
    </div> -->
  </div>
</template>

<script>
import { getDonutChartData } from "../../data/charts/DonutChartData";
import { getLineChartData } from "../../data/charts/LineChartData";
import DashboardContributorsChart from "./DashboardContributorsList";
import { getVerticalBarChartData } from "../../data/charts/VerticalBarChartData";

export default {
  name: "dashboard-charts6",
  components: { DashboardContributorsChart },

  mounted() {
    $("#msgDiv").load("http://127.0.0.1:8000/home");
  },
  data() {
    return {
      htmlString: "<h1 style='color:red'>Hello Gowtham</h1>",
      lineChartData: getLineChartData(this.$themes),
      donutChartData: getDonutChartData(this.$themes),
      verticalBarChartData: getVerticalBarChartData(this.$themes),
      lineChartFirstMonthIndex: 0
    };
  },
  watch: {
    "$themes.primary"() {
      this.lineChartData = getLineChartData(this.$themes);
      this.donutChartData = getDonutChartData(this.$themes);
    },

    "$themes.info"() {
      this.lineChartData = getLineChartData(this.$themes);
      this.donutChartData = getDonutChartData(this.$themes);
    },

    "$themes.danger"() {
      this.donutChartData = getDonutChartData(this.$themes);
    }
  },
  methods: {
    deleteSection() {
      this.lineChartFirstMonthIndex += 1;
      this.lineChartData = getLineChartData(
        this.$themes,
        this.lineChartFirstMonthIndex
      );
      this.$refs.lineChart.$refs.chart.refresh();
    },
    printChart() {
      const win = window.open("", "Print", "height=600,width=800");
      win.document.write(`<br><img src='${this.donutChartDataURL}'/>`);
      // TODO: find better solution how to remove timeout
      setTimeout(() => {
        win.document.close();
        win.focus();
        win.print();
        win.close();
      }, 200);
    }
  },
  computed: {
    donutChartDataURL() {
      return document
        .querySelector(".chart--donut canvas")
        .toDataURL("image/png");
    }
  }
};
</script>

<style scoped>
.chart {
  height: 300px;
}

object {
  border: 0;
  margin: 0;
  overflow: hidden;
  padding: 0;
}

.container-iframe {
  margin: 0;
  padding: 0;
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  padding-top: 56.25%; /* 16:9 Aspect Ratio (divide 9 by 16 = 0.5625) */
}

.responsive-iframe {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
}
</style>

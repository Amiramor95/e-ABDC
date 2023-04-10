<template>
  <div>
    <va-card>
      <apexchart
        v-if="this.chartType == 'line'"
        :type="this.chartType"
        height="250"
        :options="optionsA"
        :series="seriesA"
      ></apexchart>
      <apexchart
        v-if="this.chartType == 'bar' && this.chartId == '1'"
        :type="this.chartType"
        height="250"
        :options="optionsA"
        :series="seriesA"
      ></apexchart>
      <apexchart
        v-if="this.chartType == 'bar' && this.chartId == '2'"
        :type="this.chartType"
        height="250"
        :options="optionsB"
        :series="seriesB"
      ></apexchart>
      <apexchart
        v-if="this.chartType == 'bar' && this.chartId == '3'"
        :type="this.chartType"
        height="250"
        :options="optionsC"
        :series="seriesC"
      ></apexchart>
      <apexchart
        v-if="this.chartType == 'bar' && this.chartId == '4'"
        :type="this.chartType"
        height="250"
        :options="optionsD"
        :series="seriesD"
      ></apexchart>
      <apexchart
        v-if="this.chartType == 'pie'  && this.chartId == '5'"
        :type="this.chartType"
        height="250"
        :options="options"
        :series="seriesPie"
      ></apexchart>
      <apexchart
        v-if="this.chartType == 'donut'  && this.chartId == '6'"
        :type="this.chartType"
        height="250"
        :options="optionsDonut"
        :series="seriesDonut"
      ></apexchart>
    </va-card>
  </div>
</template>

<script>
import * as serviceKoolreport from "../../app/koolreport/services";
import { hex2rgb } from "../../services/vuestic-ui";
export default {
  watch: {},
  props: ["chartId", "chartName", "chartType"],
  name: "chart",
  data() {
    return {
      seriesA: [
        {
          name: "By Year",
          data: [459, 503, 570, 450]
        },
        {
          name: "By License",
          data: [400, 490, 550, 400]
        }
      ],
      seriesB: [
        {
          name: "Total Active",
          data: [533, 400, 590, 350, 410]
        }
      ],
      seriesC: [
        {
          data: [23, 19]
        }
      ],
      seriesD: [
        {
          data: [12, 15, 20]
        }
      ],
      seriesDonut: [12, 33, 11, 33],
      seriesPie: [44, 55, 13, 43],
      optionsA: {
        title: {
          text: this.chartName,
          align: "left",
          margin: 10,
          offsetX: 0,
          offsetY: 0,
          floating: false,
          style: {
            fontSize: "14px",
            fontWeight: "bold",
            fontFamily: "sans-serif",
            color: "#41A3D5"
          }
        },
        chart: {
          id: "Total New Consultant", //name
          width: 380
        },
        colors: ["#E7982E", "#6B93E1"],
        labels: ["PRC", "UTC"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: "bottom"
              }
            }
          }
        ]
      },
      optionsB: {
        title: {
          text: this.chartName,
          align: "left",
          margin: 10,
          offsetX: 0,
          offsetY: 0,
          floating: false,
          style: {
            fontSize: "14px",
            fontWeight: "bold",
            fontFamily: "sans-serif",
            color: "#41A3D5"
          }
        },
        chart: {
          id: "Total Active Distributor", //name
          width: 380
        },
        colors: ["#EE1B7E", "#6B93E1", "#4F94D7"],
        labels: ["UTMC", "PRP", "IUTA", "CUTA", "CPRA"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: "bottom"
              }
            }
          }
        ]
      },
      optionsC: {
        title: {
          text: this.chartName,
          align: "left",
          margin: 10,
          offsetX: 0,
          offsetY: 0,
          floating: false,
          style: {
            fontSize: "14px",
            fontWeight: "bold",
            fontFamily: "sans-serif",
            color: "#41A3D5"
          }
        },
        chart: {
          id: "Total Consultant Termination", //name
          width: 380
        },
        colors: ["#C9DF83"],
        labels: ["PRC", "UTC"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: "bottom"
              }
            }
          }
        ]
      },
      optionsD: {
        title: {
          text: this.chartName,
          align: "left",
          margin: 10,
          offsetX: 0,
          offsetY: 0,
          floating: false,
          style: {
            fontSize: "14px",
            fontWeight: "bold",
            fontFamily: "sans-serif",
            color: "#41A3D5"
          }
        },
        chart: {
          id: "hee", //name
          width: 380
        },
        colors: ["#C9DF83"],
        labels: ["UTMC", "IUTA", "CPRA"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: "bottom"
              }
            }
          }
        ]
      },
      optionsDonut: {
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true,
                name: {
                  show: true
                },
                value: {
                  offsetY: -1,
                  show: true
                },
                total: {
                  show: true,
          showAlways: true,
          label: 'Total',
          fontSize: '22px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 600,
          color: '#373d3f',
          formatter: function (w) {
            return w.globals.seriesTotals.reduce((a, b) => {
              return a + b
            }, 0)
          }
                }
              }
            }
          }
        },
        title: {
          text: this.chartName,
          align: "left",
          margin: 10,
          offsetX: 0,
          offsetY: 0,
          floating: false,
          style: {
            fontSize: "14px",
            fontWeight: "bold",
            fontFamily: "sans-serif",
            color: "#41A3D5"
          }
        },
        chart: {
          id: "hee", //name
          width: 380
        },
        colors: ["#0EDBB4", "#00D3FF", "#EC307C", "#6073D5"],
        labels: ["UTS", "WSF", "PRS", "ETF"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: "bottom"
              }
            }
          }
        ]
      },
      options: {
        title: {
          text: this.chartName,
          align: "left",
          margin: 10,
          offsetX: 0,
          offsetY: 0,
          floating: false,
          style: {
            fontSize: "14px",
            fontWeight: "bold",
            fontFamily: "sans-serif",
            color: "#41A3D5"
          }
        },
        chart: {
          id: "hee", //name
          width: 380
        },
        colors: ["#0EDBB4", "#00D3FF", "#EC307C", "#6073D5"],
        labels: ["UTS", "WSF", "PRS", "ETF"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: "bottom"
              }
            }
          }
        ]
      }
    };
  },
  mounted() {
  
    //this.getReport();
    console.log("chartId=",this.chartId);
    console.log("chartName=",this.chartName);
     console.log("chartType=",this.chartType);

    // alert(this.chartClass)
  },
  methods: {
    // getReport: async function() {
    //   const response = await serviceKoolreport.getReport(this.report);
    //   this.reportRawData = response;
    // }
  }
};
</script>
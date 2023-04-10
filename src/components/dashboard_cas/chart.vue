<template>
             <va-card style="min-height:480px;">
                    <div v-if="this.chartId == '1'">
                        <div v-if="this.chartType == 'LINE' && this.chartId == '1'">
                            <line-chart  :data="linechartData" :options="linechartOptions" class="chart_style"></line-chart>
                        </div>
                        <div v-else-if="this.chartType == 'DONUT' && this.chartId == '1'">
                            <donut-chart  :data="donutchartData" :options="donutchartOptions" class="chart_style"></donut-chart>
                        </div>
                        <div v-else-if="this.chartType == 'PIE' && this.chartId == '1'">
                            <pie-chart   :data="piechartData" :options="piechartOptions"  class="chart_style"></pie-chart>
                        </div>
                        <div v-else-if="this.chartType == 'BAR' && this.chartId == '1'">
                            <bar-chart  :data="barchartData" :options="barchartOptions" class="chart_style"></bar-chart>
                        </div>
                        <div v-else-if="this.chartType == 'POLARAREA' && this.chartId == '1'">
                            <area-chart  :data="areachartData" :options="areachartOptions" class="chart_style"></area-chart>
                        </div>
                      <div v-else-if="this.chartType == 'TABLE' && this.chartId == '1'">
                          <div v-html="tableValueOne"></div>
                          <div class="header-title">{{ this.chartName}}</div>
                        </div>
                         <div v-else-if="this.chartType == 'Single-Value' && this.chartId == '1'">
                            <div v-html="singleValueOne"></div>
                            <div class="header-title">{{ this.chartName}}</div>
                        </div>
                       <div v-else>
                        </div>
                    </div>
                     <div v-else-if="this.chartId == '2'">
                        <div v-if="this.chartType == 'LINE' && this.chartId == '2'">
                            <line-chart  :data="linechartData" :options="linechartOptions" class="chart_style"></line-chart>
                        </div>
                        <div v-else-if="this.chartType == 'DONUT' && this.chartId == '2'">
                            <donut-chart  :data="donutchartData" :options="donutchartOptions" class="chart_style"></donut-chart>
                        </div>
                        <div v-else-if="this.chartType == 'PIE' && this.chartId == '2'">
                              <pie-chart  :data="piechartData" :options="piechartOptions" class="chart_style"></pie-chart>
                        </div>
                        <div v-else-if="this.chartType == 'BAR' && this.chartId == '2'">
                            <bar-chart  :data="barchartData" :options="barchartOptions" class="chart_style"></bar-chart>
                        </div>
                        <div v-else-if="this.chartType == 'POLARAREA' && this.chartId == '2'">
                            <area-chart  :data="areachartData" :options="areachartOptions" class="chart_style"></area-chart>
                        </div>
                          <div v-else-if="this.chartType == 'TABLE' && this.chartId == '2'">
                          <div v-html="tableValueTwo"></div>
                          <div class="header-title">{{ this.chartName}}</div>
                        </div>
                         <div v-else-if="this.chartType == 'Single-Value' && this.chartId == '2'">
                            <div v-html="singleValueTwo"></div>
                            <div class="header-title">{{ this.chartName}}</div>
                        </div>
                       <div v-else>
                        </div>
                    </div>
                     <div v-else-if="this.chartId == '3'">
                        <div v-if="this.chartType == 'LINE' && this.chartId == '3'">
                            <line-chart  :data="linechartData" :options="linechartOptions" class="chart_style"></line-chart>
                        </div>
                        <div v-else-if="this.chartType == 'DONUT' && this.chartId == '3'">
                            <donut-chart  :data="donutchartData" :options="donutchartOptions" class="chart_style"></donut-chart>
                        </div>
                        <div v-else-if="this.chartType == 'PIE' && this.chartId == '3'">
                             <pie-chart  :data="piechartData" :options="piechartOptions" class="chart_style"></pie-chart>
                        </div>
                        <div v-else-if="this.chartType == 'BAR' && this.chartId == '3'">
                            <bar-chart  :data="barchartData" :options="barchartOptions" class="chart_style"></bar-chart>
                        </div>
                        <div v-else-if="this.chartType == 'POLARAREA' && this.chartId == '3'">
                            <area-chart  :data="areachartData" :options="areachartOptions" class="chart_style"></area-chart>
                        </div>
                        <div v-else-if="this.chartType == 'TABLE' && this.chartId == '3'">
                          <div v-html="tableValueThree"></div>
                          <div class="header-title">{{ this.chartName}}</div>
                        </div>
                         <div v-else-if="this.chartType == 'Single-Value' && this.chartId == '3'">
                            <div v-html="singleValueThree"></div>
                            <div class="header-title">{{ this.chartName}}</div>
                        </div>
                       <div v-else>
                        </div>
                    </div>
                     <div v-else-if="this.chartId == '4'">
                        <div v-if="this.chartType == 'LINE' && this.chartId == '4'">
                            <line-chart  :data="linechartData" :options="linechartOptions" class="chart_style"></line-chart>
                        </div>
                        <div v-else-if="this.chartType == 'DONUT' && this.chartId == '4'">
                            <donut-chart  :data="donutchartData" :options="donutchartOptions" class="chart_style"></donut-chart>
                        </div>
                        <div v-else-if="this.chartType == 'PIE' && this.chartId == '4'">
                             <pie-chart  :data="piechartData" :options="piechartOptions" class="chart_style"></pie-chart>
                        </div>
                        <div v-else-if="this.chartType == 'BAR' && this.chartId == '4'">
                            <bar-chart  :data="barchartData" :options="barchartOptions" class="chart_style"></bar-chart>
                        </div>
                        <div v-else-if="this.chartType == 'POLARAREA' && this.chartId == '4'">
                            <area-chart  :data="areachartData" :options="areachartOptions" class="chart_style"></area-chart>
                        </div>
                        <div v-else-if="this.chartType == 'TABLE' && this.chartId == '4'">
                          <div v-html="tableValueFour"></div>
                          <div class="header-title">{{ this.chartName}}</div>
                        </div>
                         <div v-else-if="this.chartType == 'Single-Value' && this.chartId == '4'">
                            <div v-html="singleValueFour"></div>
                            <div class="header-title">{{ this.chartName}}</div>
                        </div>
                       <div v-else>
                        </div>
                    </div>
                      <div v-else-if="this.chartId == '5'">
                        <div v-if="this.chartType == 'LINE' && this.chartId == '5'">
                            <line-chart  :data="linechartData" :options="linechartOptions" class="chart_style"></line-chart>
                        </div>
                        <div v-else-if="this.chartType == 'DONUT' && this.chartId == '5'">
                            <donut-chart  :data="donutchartData" :options="donutchartOptions" class="chart_style"></donut-chart>
                        </div>
                        <div v-else-if="this.chartType == 'PIE' && this.chartId == '5'">
                             <pie-chart  :data="piechartData" :options="piechartOptions" class="chart_style"></pie-chart>
                        </div>
                        <div v-else-if="this.chartType == 'BAR' && this.chartId == '5'">
                            <bar-chart  :data="barchartData" :options="barchartOptions" class="chart_style"></bar-chart>
                              <bar-chart  :data="barchartDataBottom" :options="barchartOptions" class="chart_style"></bar-chart>
                        </div>
                        <div v-else-if="this.chartType == 'POLARAREA' && this.chartId == '5'">
                            <area-chart  :data="areachartData" :options="areachartOptions" class="chart_style"></area-chart>
                        </div>
                        <div v-else-if="this.chartType == 'TABLE' && this.chartId == '5'">
                          <div v-html="tableValueFive"></div>
                          <div class="header-title">{{ this.chartName}}</div>
                        </div>
                         <div v-else-if="this.chartType == 'Single-Value' && this.chartId == '5'">
                            <div v-html="singleValueFive"></div>
                            <div class="header-title">{{ this.chartName}}</div>
                        </div>
                       <div v-else>
                        </div>
                    </div>
                      <div v-else-if="this.chartId == '6'">
                        <div v-if="this.chartType == 'LINE' && this.chartId == '6'">
                            <line-chart  :data="linechartData" :options="linechartOptions" class="chart_style"></line-chart>
                        </div>
                        <div v-else-if="this.chartType == 'DONUT' && this.chartId == '6'">
                            <donut-chart  :data="donutchartData" :options="donutchartOptions" class="chart_style"></donut-chart>
                        </div>
                        <div v-else-if="this.chartType == 'PIE' && this.chartId == '6'">
                            <pie-chart  :data="piechartData" :options="piechartOptions" class="chart_style"></pie-chart>
                        </div>
                        <div v-else-if="this.chartType == 'BAR' && this.chartId == '6'">
                            <bar-chart  :data="barchartData" :options="barchartOptions" class="chart_style"></bar-chart>
                        </div>
                        <div v-else-if="this.chartType == 'POLARAREA' && this.chartId == '6'">
                            <area-chart  :data="areachartData" :options="areachartOptions" class="chart_style"></area-chart>
                        </div>
                       <div v-else-if="this.chartType == 'TABLE' && this.chartId == '6'">
                          <div v-html="tableValueSix"></div>
                          <div class="header-title">{{ this.chartName}}</div>
                        </div>
                         <div v-else-if="this.chartType == 'Single-Value' && this.chartId == '6'">
                            <div v-html="singleValueSix"></div>
                            <div class="header-title">{{ this.chartName}}</div>
                        </div>
                       <div v-else>
                        </div>
                    </div>
                <!-- <pie-chart  :data="chartData" :options="chartOptions"></pie-chart>


                <pie-chart  :data="chartData" :options="chartOptions"></pie-chart> -->

             </va-card>
</template>
 <script>
 import DonutChart from "./DonutChart.js";
 import PieChart from "./PieChart.js";
 import BarChart from "./BarChart.js";
 import LineChart from "./LineChart.js";
 import AreaChart from "./AreaChart.js";
 import RadarChart from "./RadarChart.js";
 import * as services06Module1 from "../../app/module1/services06";
 import * as servicesModule0 from "../../app/module0/services02"
 export default {
  name: 'cas-chart',
   props: ["chartId", "chartName", "chartType","chartView","chartStyle"],
    components: {
         DonutChart,
         PieChart,
         BarChart,
         LineChart,
         AreaChart,
         RadarChart
    },
  mounted(){
    this.userdata = JSON.parse(localStorage.getItem("user"));
    this.getChartSetting();
  },
  data333(){

  },
  data () {
    return {
      chartnumber: 6,
      userdata: {},
      chartlist: [],
      piechartLabel: [],
      piechartDataset: [],
      approvalstatus: [],
      totalConsultant: [],
      approve_data: 0,
      rejected_data: 0,
       singleValueOne:'',
      singleValueTwo:'',
      singleValueThree:'',
      singleValueFour:'',
      singleValueFive:'',
      singleValueSix:'',
      tableValueOne: '',
      tableValueTwo: '',
      tableValueThree: '',
      tableValueFour: '',
      tableValueFive: '',
      tableValueSix: '',
      //ctx:'',
      chartOptions: {
            responsive: true,
            legend: {
            display: false,
            position: 'right',
            },
             title: {
            display: true,
            text: this.chartName,
            position: 'bottom',

        }
      },
      chartData: {
        hoverBackgroundColor: "red",
        hoverBorderWidth: 10,
        labels: ["UTS", "WSF", "PRS", "ETF","WFS","TSE"],
        datasets: [{
            label: "Student A",
            backgroundColor: "rgba(200,0,0,0.2)",
            data: [65, 75, 70, 80, 60, 80]
            }, {
            label: "Student B",
            backgroundColor: "rgba(0,0,200,0.2)",
            data: [54, 65, 60, 70, 70, 75]
         }]
      },
       areachartOptions: {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
            display: true,
            position: 'right',
            },
             title: {
            display: true,
            text: this.chartName,
            position: 'bottom',
           },
            animation: {
            animateRotate: true,
            animateScale: true
            }

      },
      areachartData: {
        hoverBackgroundColor: "red",
        hoverBorderWidth: 10,
        labels: ["UTS", "WSF", "PRS", "ETF"],
        datasets: [
          {
            //label: "Data One",
            backgroundColor: ["#0EDBB4", "#00D3FF", "#EC307C", "#6073D5"],
            borderColor: ['#2196f38c', '#f443368c', '#3f51b570', '#00968896'],
            borderWidth: 1,
            data: [500,	50,	2424,	14040]
          }
        ]
      },
       linechartOptions: {
           responsive: true,
           maintainAspectRatio: false,
           legend: {
            display: true,
            position: 'bottom',
            },
             title: {
            display: true,
            text: this.chartName,
            position: 'bottom',

        },
        maintainAspectRatio: false,
        pieceLabel: {
        // mode: 'percentage',
        render: 'value',
        precision: 1,
        fontColor: '#fff',
        },

      },
      linechartData: {
        hoverBackgroundColor: "red",
        hoverBorderWidth: 10,
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            //label: "Data One",
            backgroundColor: "#f87979",
            data: [40, 39, 10, 40, 39, 80, 40]
          }
        ]
      },
       barchartOptions: {
            responsive: true,
            legend: {
            display: true,
            position: 'bottom',
            },
             title: {
            display: true,
            text: this.chartName,
            position: 'bottom',

        }

      },
      barchartData: {
        hoverBackgroundColor: "red",
        hoverBorderWidth: 10,
         labels: ["UTS", "WSF", "PRS", "ETF"],
        datasets: [
          {
            //label: "Data One",
            backgroundColor: ["#0EDBB4", "#00D3FF", "#EC307C", "#6073D5"],
            data: [1, 10, 5,20]
          }
        ]
      },
       barchartDataBottom: {
        hoverBackgroundColor: "red",
        hoverBorderWidth: 10,
         labels: ["UTS", "WSF", "PRS", "ETF"],
        datasets: [
          {
            //label: "Data One",
            backgroundColor: ["#0EDBB4", "#00D3FF", "#EC307C", "#6073D5"],
            data: [1, 10, 5,20]
          }
        ]
      },
    piechartOptions: {
       tooltips: {
     enabled: true
   },

   //allTooltipsOnce: true,
         responsive: true,
            legend: {
            display: true,
            position: 'right',
            },
            title: {
            display: true,
            text: this.chartName,
            position: 'bottom',
           },
            pieceLabel: {
            // mode: 'percentage',
            render: 'value',
            precision: 1,
            fontColor: '#fff',
            },
      },
      piechartData: {
          hoverBackgroundColor: "red",
          hoverBorderWidth: 10,
          labels: ['Members','Training Providers'], //this.piechartLabel,
          datasets: [{
          label: "Data One",
          backgroundColor:['#1E9600', '#99C802'],
          data: [30,20],//this.piechartDataset
          }]},
      donutchartOptions: {
         tooltip: {
      enabled: false
    },
        responsive: true,
            legend: {
            display: true,
            position: 'right',
            },
          title: {
            display: true,
            text: this.chartName,
            position: 'bottom',
        }
      },
      donutchartData: {  hoverBackgroundColor: "red",
        hoverBorderWidth: 10,
        labels:["UTMC", "IUTA", "CPRA"],
        datasets: [
          {
            label: "Data Two",
            backgroundColor: [ 'rgb(255, 99, 132)','rgb(54, 162, 235)','rgb(255, 205, 86)'],
            data: [50, 300, 100]
          }
        ]}
    }
  },
  methods: {
   getChartSetting: async function() {
        let settingArray = [];
        const userID=this.userdata.user_id;
        const userTYPE=this.userdata.user_type;
        console.log("Chart Data=",this.chartView);
        console.log("Chart Style=",this.chartStyle);
        if(this.chartView == 1){
            const responseCAS1 = await servicesModule0.getCasChartSetting(userID,userTYPE,this.chartStyle);
             let ds_first=[];
            let ds_second=[];
            let ds_third=[];
            let ds_fourth=[];
            let ds_fifth=[];
            let lbl=[];
            lbl = ['Watch List','Revoke and Barred','Barred','Suspension – Under Investigation','Suspension - Sanctioned','Blacklist','Whitelist'];
             //lbl = [responseCAS1.year[0],responseCAS1.year[1],responseCAS1.year[2],responseCAS1.year[3],responseCAS1.year[4]]
            //ds.push(responseCAS1.distributor_data);
           // ds.push(responseCAS1.training_provider); //= [responseCAS1.distributor_data, responseCAS1.training_provider];
            responseCAS1.firstYear.forEach(element => {
                ds_first.push(element.total);
            });
            responseCAS1.secondYear.forEach(element => {
                ds_second.push(element.total);
            });
            responseCAS1.thirdYear.forEach(element => {
                ds_third.push(element.total);
            });
            responseCAS1.fourthYear.forEach(element => {
                ds_fourth.push(element.total);
            });
             responseCAS1.fifthYear.forEach(element => {
                ds_fifth.push(element.total);
            });

            if(this.chartType == 'PIE'){
              this.piechartData = {
                hoverBackgroundColor: "red",
                hoverBorderWidth: 10,
                labels: lbl, //this.piechartLabel,
                datasets: [
              {
                label: responseCAS1.year[0],
                backgroundColor: ['#1E9600', '#99C802',"#6073D5","#EC307C","#146666","#21210e",'#000000','#7d6868','#4f1466'],
                data: ds_first
              },
               {
                label: responseCAS1.year[1],
                backgroundColor: ['#10899c', '#4fcfe8',"#246673","#715cdb","#aea3e6","#b8c474",'#636944','#de494e','#4f1466'],
                data: ds_second
              },
               {
                label: responseCAS1.year[2],
                backgroundColor: ['#f0c30e', '#395973',"#395973","#83aac9","#c9bd83","#877c45",'#877c45','#58cc8a','#9b9bc2'],
                data: ds_third
              },
               {
                label: responseCAS1.year[3],
                backgroundColor: ['#f00e0e', '#99C802',"#6073D5","#EC307C","#146666","#21210e",'#bdbb71','#7d6868','#4f1466'],
                data: ds_fourth
              },
               {
                label: responseCAS1.year[4],
                backgroundColor: ['#0e12f0', '#bdbb71',"#bd7175","#bd8d71","#146666","#21210e",'#f0c30e','#7d6868','#4f1466'],
                data: ds_fifth
              }
              ]
              };
            }
            if(this.chartType == 'DONUT'){
              this.donutchartData = {
              hoverBackgroundColor: "red",
              hoverBorderWidth: 10,
              labels: lbl,
              datasets: [
              {
                label: responseCAS1.year[0],
                backgroundColor: ['#1E9600', '#99C802',"#6073D5","#EC307C","#146666","#21210e",'#000000','#7d6868','#4f1466'],
                data: ds_first
              },
               {
                label: responseCAS1.year[1],
                backgroundColor: ['#10899c', '#4fcfe8',"#246673","#715cdb","#aea3e6","#b8c474",'#636944','#de494e','#4f1466'],
                data: ds_second
              },
               {
                label: responseCAS1.year[2],
                backgroundColor: ['#f0c30e', '#395973',"#395973","#83aac9","#c9bd83","#877c45",'#877c45','#58cc8a','#9b9bc2'],
                data: ds_third
              },
               {
                label: responseCAS1.year[3],
                backgroundColor: ['#f00e0e', '#99C802',"#6073D5","#EC307C","#146666","#21210e",'#bdbb71','#7d6868','#4f1466'],
                data: ds_fourth
              },
               {
                label: responseCAS1.year[4],
                backgroundColor: ['#0e12f0', '#bdbb71',"#bd7175","#bd8d71","#146666","#21210e",'#f0c30e','#7d6868','#4f1466'],
                data: ds_fifth
              }
              ]
              };
            }
            if(this.chartType == 'LINE'){
              this.linechartData = {
              hoverBackgroundColor: "red",
              hoverBorderWidth: 10,
              labels: lbl,
             datasets: [
              {
                label: responseCAS1.year[0],
                backgroundColor: ['#1E9600', '#99C802',"#6073D5","#EC307C","#146666","#21210e",'#000000','#7d6868','#4f1466'],
                data: ds_first
              },
               {
                label: responseCAS1.year[1],
                backgroundColor: ['#10899c', '#4fcfe8',"#246673","#715cdb","#aea3e6","#b8c474",'#636944','#de494e','#4f1466'],
                data: ds_second
              },
               {
                label: responseCAS1.year[2],
                backgroundColor: ['#f0c30e', '#395973',"#395973","#83aac9","#c9bd83","#877c45",'#877c45','#58cc8a','#9b9bc2'],
                data: ds_third
              },
               {
                label: responseCAS1.year[3],
                backgroundColor: ['#f00e0e', '#99C802',"#6073D5","#EC307C","#146666","#21210e",'#bdbb71','#7d6868','#4f1466'],
                data: ds_fourth
              },
               {
                label: responseCAS1.year[4],
                backgroundColor: ['#0e12f0', '#bdbb71',"#bd7175","#bd8d71","#146666","#21210e",'#f0c30e','#7d6868','#4f1466'],
                data: ds_fifth
              }
              ]
              };
            }
            if(this.chartType == 'BAR'){
             // ds.push(0);
              this.barchartData = {
              hoverBackgroundColor: "red",
              hoverBorderWidth: 10,
              labels: lbl,
              datasets: [
              {
                label: responseCAS1.year[0],
                backgroundColor: ['#1E9600', '#99C802',"#6073D5","#EC307C","#146666","#21210e",'#000000','#7d6868','#4f1466'],
                data: ds_first
              },
               {
                label: responseCAS1.year[1],
                backgroundColor: ['#10899c', '#4fcfe8',"#246673","#715cdb","#aea3e6","#b8c474",'#636944','#de494e','#4f1466'],
                data: ds_second
              },
               {
                label: responseCAS1.year[2],
                backgroundColor: ['#f0c30e', '#395973',"#395973","#83aac9","#c9bd83","#877c45",'#877c45','#58cc8a','#9b9bc2'],
                data: ds_third
              },
               {
                label: responseCAS1.year[3],
                backgroundColor: ['#f00e0e', '#99C802',"#6073D5","#EC307C","#146666","#21210e",'#bdbb71','#7d6868','#4f1466'],
                data: ds_fourth
              },
               {
                label: responseCAS1.year[4],
                backgroundColor: ['#0e12f0', '#bdbb71',"#bd7175","#bd8d71","#146666","#21210e",'#f0c30e','#7d6868','#4f1466'],
                data: ds_fifth
              }
              ]
              };
            }
            if(this.chartType == 'POLARAREA'){
              this.areachartData = {
              hoverBackgroundColor: "red",
              hoverBorderWidth: 10,
              labels: lbl,
              datasets: [
              {
                label: responseCAS1.year[0],
                backgroundColor: ["#0EDBB4", "#00D3FF", "#EC307C", "#6073D5","#21210e",'#000000','#7d6868','#4f1466'],
                borderColor: ['#2196f38c', '#f443368c', '#3f51b570', '#00968896'],
                borderWidth: 1,
                data: ds_first
              },
              {
                label: responseCAS1.year[1],
                backgroundColor: ["#0EDBB4", "#00D3FF", "#EC307C", "#6073D5","#21210e",'#000000','#7d6868','#4f1466'],
                borderColor: ['#2196f38c', '#f443368c', '#3f51b570', '#00968896'],
                borderWidth: 1,
                data: ds_second
              },
              {
                label: responseCAS1.year[2],
                backgroundColor: ["#0EDBB4", "#00D3FF", "#EC307C", "#6073D5","#21210e",'#000000','#7d6868','#4f1466'],
                borderColor: ['#2196f38c', '#f443368c', '#3f51b570', '#00968896'],
                borderWidth: 1,
                data: ds_third
              },
              {
                label: responseCAS1.year[3],
                backgroundColor: ["#0EDBB4", "#00D3FF", "#EC307C", "#6073D5","#21210e",'#000000','#7d6868','#4f1466'],
                borderColor: ['#2196f38c', '#f443368c', '#3f51b570', '#00968896'],
                borderWidth: 1,
                data: ds_fourth
              },
              {
                label: responseCAS1.year[4],
                backgroundColor: ["#0EDBB4", "#00D3FF", "#EC307C", "#6073D5","#21210e",'#000000','#7d6868','#4f1466'],
                borderColor: ['#2196f38c', '#f443368c', '#3f51b570', '#00968896'],
                borderWidth: 1,
                data: ds_fifth
              }
              ]
              };
            }
         }
          if(this.chartView == 2){
            const response2 = await servicesModule0.getCasChartSettingtwo(userID,userTYPE,this.chartStyle);
             console.log("response2 =",response2);
             this.approvalstatus = response2;
           let dstwo=[];
            let lbltwo=[];
             response2.forEach(element => {
                dstwo.push(element.total);
                 lbltwo.push(element.TS_PARAM);
            });

             let rcas2 = "";
            response2.forEach(
              (elementCAS, i) => {
                rcas2 += ` <div class="single_box bgclr`+ i +`">
                  <span>`+ elementCAS.total +`</span>
                  <label class="title">`+ elementCAS.TS_PARAM +`</label>
                </div>`;
                  }
              );
             if(this.chartType == 'Single-Value'){
                  this.singleValueOne =`<div class="box_container">` + rcas2 + `</div>`;
                  this.singleValueTwo = `<div class="box_container">` + rcas2 + `</div>`;
                  this.singleValueThree = `<div class="box_container">` + rcas2 + `</div>`;
                  this.singleValueFour = `<div class="box_container">` + rcas2 + `</div>`;
                  this.singleValueFive = `<div class="box_container">` + rcas2 + `</div>`;
                  this.singleValueSix = `<div class="box_container">` + rcas2 + `</div>`;
           }

            if(this.chartType == 'PIE'){
              this.piechartData = {
                hoverBackgroundColor: "red",
                hoverBorderWidth: 10,
                labels: lbltwo, //this.piechartLabel,
                datasets: [{
                  label: "Data One",
                  backgroundColor:['#1E9600', '#99C802',"#6073D5"],
                  data: dstwo,//this.piechartDataset
                }]
              };
            }
            if(this.chartType == 'DONUT'){
              this.donutchartData = {
              hoverBackgroundColor: "red",
              hoverBorderWidth: 10,
              labels: lbltwo,
              datasets: [
              {
              label: "Data Two",
              backgroundColor: [ 'rgb(255, 99, 132)','rgb(54, 162, 235)',"#6073D5"],
              data: dstwo
              }]
              };
            }
            if(this.chartType == 'LINE'){
              this.linechartData = {
              hoverBackgroundColor: "red",
              hoverBorderWidth: 10,
              labels: lbltwo,
              datasets: [
              {
              //label: "Data One",
                backgroundColor: "#f87979",
                data: dstwo
              }
              ]
              };
            }
            if(this.chartType == 'BAR'){
              dstwo.push(0);
              this.barchartData = {
              hoverBackgroundColor: "red",
              hoverBorderWidth: 10,
              labels: lbltwo,
              datasets: [
              {
              //label: "Data One",
                backgroundColor: ["#0EDBB4", "#00D3FF","#6073D5"],
                data: dstwo
              }
              ]
              };
            }
            if(this.chartType == 'POLARAREA'){
              this.areachartData = {
              hoverBackgroundColor: "red",
              hoverBorderWidth: 10,
              labels: lbltwo,
              datasets: [
              {
                //label: "Data One",
                backgroundColor: ["#0EDBB4", "#00D3FF", "#EC307C", "#6073D5"],
                borderColor: ['#2196f38c', '#f443368c', '#3f51b570', '#00968896'],
                borderWidth: 1,
                data: dstwo
              }
              ]
              };
            }
           // this.ctx = document.getElementById("pie-chart").getContext('2d');
            // console.log("ctx=",ctx);
       // this.chartlist = response;
         }
          if(this.chartView == 3){
            const response3 = await servicesModule0.getCasChartSettingthree(userID,userTYPE,this.chartStyle);
            this.totalConsultant = response3;
            let dstthree=[];
            let lblthree=[];
            lblthree = ['Distributor Submitted or Approved','Training Provider Submitted or Approved','Distributor Pending','Training Provider Pending'];
            dstthree.push(response3.distributor_submit_data);
            dstthree.push(response3.provide_submit_data);
            dstthree.push(response3.distributor_pending_data);
            dstthree.push(response3.provide_pending_data); //= [response.distributor_data, response.training_provider];
           // console.log("piechartDataset =",dstwo);
            let rcas3 = "";
            response3.forEach(
              (elementCAS3, i1) => {
                rcas3 += ` <div class="single_box bgclr`+ i1 +`">
                  <span>`+ elementCAS3.total +`</span>
                  <label class="title">`+ elementCAS3.SET_CODE +`</label>
                </div>`;
                  }
              );
             if(this.chartType == 'Single-Value'){
                  this.singleValueOne =`<div class="box_container">` + rcas3 + `</div>`;
                  this.singleValueTwo = `<div class="box_container">` + rcas3 + `</div>`;
                  this.singleValueThree = `<div class="box_container">` + rcas3 + `</div>`;
                  this.singleValueFour = `<div class="box_container">` + rcas3 + `</div>`;
                  this.singleValueFive = `<div class="box_container">` + rcas3 + `</div>`;
                  this.singleValueSix = `<div class="box_container">` + rcas3 + `</div>`;
           }

            if(this.chartType == 'PIE'){
              this.piechartData = {
                hoverBackgroundColor: "red",
                hoverBorderWidth: 10,
                labels: lblthree, //this.piechartLabel,
                datasets: [{
                  label: "Data One",
                  backgroundColor:['#1E9600', '#99C802',"#6073D5","#EC307C"],
                  data: dstthree,//this.piechartDataset
                }]
              };
            }
            if(this.chartType == 'DONUT'){
              this.donutchartData = {
              hoverBackgroundColor: "red",
              hoverBorderWidth: 10,
              labels: lblthree,
              datasets: [
              {
              label: "Data Two",
              backgroundColor: [ 'rgb(255, 99, 132)','rgb(54, 162, 235)',"#6073D5","#EC307C"],
              data: dstthree
              }]
              };
            }
            if(this.chartType == 'LINE'){
              this.linechartData = {
              hoverBackgroundColor: "red",
              hoverBorderWidth: 10,
              labels: lblthree,
              datasets: [
              {
              //label: "Data One",
                backgroundColor: "#f87979",
                data: dstthree
              }
              ]
              };
            }
            if(this.chartType == 'BAR'){
              dstthree.push(0);
              this.barchartData = {
              hoverBackgroundColor: "red",
              hoverBorderWidth: 10,
              labels: lblthree,
              datasets: [
              {
              //label: "Data One",
                backgroundColor: ["#0EDBB4", "#00D3FF","#6073D5","#EC307C"],
                data: dstthree
              }
              ]
              };
            }
            if(this.chartType == 'POLARAREA'){
              this.areachartData = {
              hoverBackgroundColor: "red",
              hoverBorderWidth: 10,
              labels: lblthree,
              datasets: [
              {
                //label: "Data One",
                backgroundColor: ["#0EDBB4", "#00D3FF", "#EC307C", "#6073D5"],
                borderColor: ['#2196f38c', '#f443368c', '#3f51b570', '#00968896'],
                borderWidth: 1,
                data: dstthree
              }
              ]
              };
            }
            if(this.chartType == 'RADAR'){
              this.chartData = {
                hoverBackgroundColor: "red",
                hoverBorderWidth: 10,
                labels: lblthree,
                datasets: [{
                label: "Distributor",
                backgroundColor: "rgba(200,0,0,0.2)",
                data: [response3.distributor_submit_data,response3.distributor_pending_data]
                },
                {
                label: "Training Provider",
                backgroundColor: "rgba(0,0,200,0.2)",
                data: [response3.provide_submit_data,response3.provide_pending_data]
                },
                ]
              };
            }
           // this.ctx = document.getElementById("pie-chart").getContext('2d');
            // console.log("ctx=",ctx);
       // this.chartlist = response;
         }
          if(this.chartView == 4){
            // Confused not done
            const response4 = await servicesModule0.getCasChartSettingfour(userID,userTYPE,this.chartStyle);
            console.log("response4=",response4);
            let dsfour=[];
            let lblfour=[];
            lblfour = ['January','February','March','April','May','June','July','August','September','October','November','December'];
             response4.month_data.forEach(element => {
                dsfour.push(element.total);
            });
            if(this.chartType == 'PIE'){
              this.piechartData = {
                hoverBackgroundColor: "red",
                hoverBorderWidth: 10,
                labels: lblfour, //this.piechartLabel,
                datasets: [{
                  label: "Data One",
                  backgroundColor:['#1E9600', '#99C802',"#6073D5","#EC307C","#146666","#21210e",'#000000','#7d6868','#4f1466'],
                  data: dsfour,//this.piechartDataset
                }]
              };
            }
            if(this.chartType == 'DONUT'){
              this.donutchartData = {
              hoverBackgroundColor: "red",
              hoverBorderWidth: 10,
              labels: lblfour,
              datasets: [
              {
              label: "Data Two",
              backgroundColor:['#1E9600', '#99C802',"#6073D5","#EC307C","#146666","#21210e",'#000000','#7d6868','#4f1466'],
              data: dsfour
              }]
              };
            }
            if(this.chartType == 'LINE'){
              this.linechartData = {
              hoverBackgroundColor: "red",
              hoverBorderWidth: 10,
              labels: lblfour,
              datasets: [
              {
                label: response4.year,
                backgroundColor: "#00D3FF",
                data: dsfour
              }
              ]
              };
            }
            if(this.chartType == 'BAR'){
              dsfour.push(0);
              this.barchartData = {
              hoverBackgroundColor: "red",
              hoverBorderWidth: 10,
              labels: lblfour,
              datasets: [
              {
              //label: "Data One",
                backgroundColor:['#1E9600', '#99C802',"#6073D5","#EC307C","#146666","#21210e",'#7d6868','#4f1466','#e8963f','#8c2c27','#52106e','#0f58a6'],
                data: dsfour
              }
              ]
              };
            }
            if(this.chartType == 'POLARAREA'){
              this.areachartData = {
              hoverBackgroundColor: "red",
              hoverBorderWidth: 10,
              labels: four,
              datasets: [
              {
                //label: "Data One",
                backgroundColor:['#1E9600', '#99C802',"#6073D5","#EC307C","#146666","#21210e",'#000000','#7d6868','#4f1466'],
                borderColor: ['#2196f38c', '#f443368c', '#3f51b570', '#00968896'],
                borderWidth: 1,
                data: dsfour
              }
              ]
              };
            }
           // this.ctx = document.getElementById("pie-chart").getContext('2d');
            // console.log("ctx=",ctx);
       // this.chartlist = response;
         }
    },
  },
 }
 </script>
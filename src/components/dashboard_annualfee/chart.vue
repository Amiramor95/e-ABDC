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
 import * as servicesModule0 from "../../app/module0/services02";
 import * as services07Module0 from "../../app/module0/services07"
 export default {
  name: 'annual-chart',
   props: ["chartId", "chartName", "chartType","chartView","chartStyle","chartGroup"],
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

  data () {
    return {
      chartnumber: 6,
      userdata: {},
      chartlist: [],
      piechartLabel: [],
      piechartDataset: [],
      lodgement_data: [],
      dislodgement_data: [],
      rejected_data: 0,
      ridone_data: [],
      category_data: [],
      fund_submission: 0,
      update_submission: 0,
      closure_submission: 0,
      nav_submission: 0,
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
            display: false,
            position: 'right',
            },
             title: {
            display: true,
            text: this.chartName,
            position: 'bottom',

        }

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
            label: "Data One",
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
        maintainAspectRatio: false,
        pieceLabel: {
        mode: 'percentage',
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
        },
        maintainAspectRatio: false,
        pieceLabel: {
        mode: 'percentage',
        precision: 1,
        fontColor: '#fff',
        },
         plugins: {
          datalabels: {
            color: 'white',
            textAlign: 'center',
            font: {
              weight: "bold",
              size: 16
            }
          }
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
         const userGROUP=this.userdata.USER_GROUP_ID;
         if(this.chartGroup == 1){
            // alert(this.chartView);
              if(this.chartView == 7 && this.chartGroup == 1){
                const responseanuual7 = await services07Module0.getAnnualRDChartSettingSeven(userID,userTYPE,this.chartStyle);
                console.log("responsefirst=",responseanuual7);

                let rfms7 = "";
            responseanuual7.utf_data.forEach(
              (elementannual7, i7) => {
                rfms7 += ` <div class="single_box bgclr`+ i7 +`">
                  <span>`+ elementannual7.total +`</span>
                  <label class="title">`+ elementannual7.AMSF_YEAR +`</label>
                </div>
                 <div class="header-title_single">UTS</div>
                `;
                  }
              );

               let rfms71 = "";
            responseanuual7.prc_data.forEach(
              (elementannual71, i71) => {
                rfms71 += ` <div class="single_box bgclr`+ i71 +`">
                  <span>`+ elementannual71.total +`</span>
                  <label class="title">`+ elementannual71.AMSF_YEAR +`</label>
                </div>
                 <div class="header-title_single1">PRS</div>
                `;
                  }
              );

             if(this.chartType == 'Single-Value'){
                  this.singleValueOne =`<div class="box_container">` + rfms7 + `</div><div class="box_container">` + rfms71 + `</div>`;
                  this.singleValueTwo = `<div class="box_container">` + rfms7 + `</div><div class="box_container">` + rfms71 + `</div>`;
                  this.singleValueThree = `<div class="box_container">` + rfms7 + `</div><div class="box_container">` + rfms71 + `</div>`;
                  this.singleValueFour = `<div class="box_container">` + rfms7 + `</div><div class="box_container">` + rfms71 + `</div>`;
                  this.singleValueFive = `<div class="box_container">` + rfms7 + `</div><div class="box_container">` + rfms71 + `</div>`;
                  this.singleValueSix = `<div class="box_container">` + rfms7 + `</div><div class="box_container">` + rfms71 + `</div>`;
           }
                let ds=[];
                let dsone=[];
                let lbl=[];
                let currentYear = new Date().getFullYear();
                let previousYear = currentYear-1;
                let previousYear1 = currentYear-2;
               // lbl = [currentYear+':UTS',currentYear+':PRS',previousYear+':UTS',previousYear+':PRS',previousYear1+':UTS',previousYear1+':PRS'];
                 lbl = ['',''];
               var q = [];
                responseanuual7.utf_data.forEach((u,i) =>{
                  var pr = [];
                  var color;
                  if(i == 0){
                    color = ['rgb(255, 205, 86)', 'rgb(255, 205, 86)', 'rgb(255, 205, 86)', 'rgb(255, 205, 86)','rgb(255, 205, 86)','rgb(255, 205, 86)','rgb(255, 205, 86)','rgb(255, 205, 86)','rgb(255, 205, 86)','rgb(255, 205, 86)','rgb(255, 205, 86)','rgb(255, 205, 86)'];
                  }
                   if(i == 1){
                    color = ["#00D3FF", "#00D3FF", "#00D3FF", "#00D3FF","#00D3FF",'#00D3FF','#00D3FF','#00D3FF','#00D3FF','#00D3FF','#00D3FF','#00D3FF'];
                  }
                 if(i == 2){
                     color = ["#a159d4", "#a159d4", "#a159d4", "#a159d4","#a159d4",'#a159d4','#a159d4','#a159d4','#a159d4','#a159d4','#a159d4','#a159d4'];
                  }
                  pr.push(u['total']);
                  q.push({label: `${u['AMSF_YEAR']} :: UTS`, data: pr, backgroundColor: color});
              });
              // // Training Provider
               responseanuual7.prc_data.forEach((u1,i1) =>{
                  var pr1 = [];
                  var color1;
                  if(i1 == 0){
                    color1 = ['#6073D5', '#6073D5', '#6073D5', '#6073D5','#6073D5','#6073D5','#6073D5','#6073D5','#6073D5','#6073D5','#6073D5','#6073D5'];
                  }
                if(i1 == 1){
                    color1 = ["rgb(255, 99, 132)", "rgb(255, 99, 132)", "rgb(255, 99, 132)", "rgb(255, 99, 132)","rgb(255, 99, 132)",'rgb(255, 99, 132)','rgb(255, 99, 132)','rgb(255, 99, 132)','rgb(255, 99, 132)','rgb(255, 99, 132)','rgb(255, 99, 132)','rgb(255, 99, 132)'];
                  }
                  if(i1 == 2){
                    color1 = ["#98ab07", "#98ab07", "#98ab07", "#98ab07","#98ab07",'#98ab07','#98ab07','#98ab07','#98ab07','#98ab07','#98ab07','#98ab07'];
                  }
                    pr1.push(u1['total']);
                  q.push({label: `${u1['AMSF_YEAR']} :: PRS`, data: pr1, backgroundColor: color1});
              });

            if(this.chartType == 'LINE'){
              this.linechartData = {
              hoverBackgroundColor: "red",
              hoverBorderWidth: 10,
              labels: lbl,
              datasets: q,
              };
            }

            if(this.chartType == 'BAR'){
              this.barchartData = {
              hoverBackgroundColor: "red",
              hoverBorderWidth: 10,
              labels: lbl,
              datasets: q,
              };
            }
            }
         if(this.chartView == 8 && this.chartGroup == 1){
                const responseanuual8 = await services07Module0.getAnnualRDChartSettingEight(userID,userTYPE,this.chartStyle);
               // console.log("responsefirst=",responseanuual8);

                let rfms7 = "";
            responseanuual8.utf_data_tgs.forEach(
              (elementannual7, i7) => {
                rfms7 += ` <div class="single_box bgclr`+ i7 +`">
                  <span>`+ elementannual7.total +`</span>
                  <label class="title">`+ elementannual7.AMSF_YEAR +`</label>
                </div>
                 <div class="header-title_single">UTS</div>
                `;
                  }
              );

               let rfms71 = "";
            responseanuual8.prc_data_tgs.forEach(
              (elementannual71, i71) => {
                rfms71 += ` <div class="single_box bgclr`+ i71 +`">
                  <span>`+ elementannual71.total +`</span>
                  <label class="title">`+ elementannual71.AMSF_YEAR +`</label>
                </div>
                 <div class="header-title_single1">PRS</div>
                `;
                  }
              );

             if(this.chartType == 'Single-Value'){
                  this.singleValueOne =`<div class="box_container">` + rfms7 + `</div><div class="box_container">` + rfms71 + `</div>`;
                  this.singleValueTwo = `<div class="box_container">` + rfms7 + `</div><div class="box_container">` + rfms71 + `</div>`;
                  this.singleValueThree = `<div class="box_container">` + rfms7 + `</div><div class="box_container">` + rfms71 + `</div>`;
                  this.singleValueFour = `<div class="box_container">` + rfms7 + `</div><div class="box_container">` + rfms71 + `</div>`;
                  this.singleValueFive = `<div class="box_container">` + rfms7 + `</div><div class="box_container">` + rfms71 + `</div>`;
                  this.singleValueSix = `<div class="box_container">` + rfms7 + `</div><div class="box_container">` + rfms71 + `</div>`;
           }
                let ds=[];
                let dsone=[];
                let lbl=[];
                let currentYear = new Date().getFullYear();
                let previousYear = currentYear-1;
                let previousYear1 = currentYear-2;
               // lbl = [currentYear+':UTS',currentYear+':PRS',previousYear+':UTS',previousYear+':PRS',previousYear1+':UTS',previousYear1+':PRS'];
                 lbl = ['',''];
               var q = [];
                responseanuual8.utf_data_tgs.forEach((u,i) =>{
                  var pr = [];
                  var color;
                  if(i == 0){
                    color = ['rgb(255, 205, 86)', 'rgb(255, 205, 86)', 'rgb(255, 205, 86)', 'rgb(255, 205, 86)','rgb(255, 205, 86)','rgb(255, 205, 86)','rgb(255, 205, 86)','rgb(255, 205, 86)','rgb(255, 205, 86)','rgb(255, 205, 86)','rgb(255, 205, 86)','rgb(255, 205, 86)'];
                  }
                   if(i == 1){
                    color = ["#00D3FF", "#00D3FF", "#00D3FF", "#00D3FF","#00D3FF",'#00D3FF','#00D3FF','#00D3FF','#00D3FF','#00D3FF','#00D3FF','#00D3FF'];
                  }
                 if(i == 2){
                     color = ["#a159d4", "#a159d4", "#a159d4", "#a159d4","#a159d4",'#a159d4','#a159d4','#a159d4','#a159d4','#a159d4','#a159d4','#a159d4'];
                  }
                  pr.push(u['total']);
                  q.push({label: `${u['AMSF_YEAR']} :: UTS`, data: pr, backgroundColor: color});
              });
              // // Training Provider
               responseanuual8.prc_data_tgs.forEach((u1,i1) =>{
                  var pr1 = [];
                  var color1;
                  if(i1 == 0){
                    color1 = ['#6073D5', '#6073D5', '#6073D5', '#6073D5','#6073D5','#6073D5','#6073D5','#6073D5','#6073D5','#6073D5','#6073D5','#6073D5'];
                  }
                if(i1 == 1){
                    color1 = ["rgb(255, 99, 132)", "rgb(255, 99, 132)", "rgb(255, 99, 132)", "rgb(255, 99, 132)","rgb(255, 99, 132)",'rgb(255, 99, 132)','rgb(255, 99, 132)','rgb(255, 99, 132)','rgb(255, 99, 132)','rgb(255, 99, 132)','rgb(255, 99, 132)','rgb(255, 99, 132)'];
                  }
                  if(i1 == 2){
                    color1 = ["#98ab07", "#98ab07", "#98ab07", "#98ab07","#98ab07",'#98ab07','#98ab07','#98ab07','#98ab07','#98ab07','#98ab07','#98ab07'];
                  }
                    pr1.push(u1['total']);
                  q.push({label: `${u1['AMSF_YEAR']} :: PRS`, data: pr1, backgroundColor: color1});
              });

            if(this.chartType == 'LINE'){
              this.linechartData = {
              hoverBackgroundColor: "red",
              hoverBorderWidth: 10,
              labels: lbl,
              datasets: q,
              };
            }

            if(this.chartType == 'BAR'){
              this.barchartData = {
              hoverBackgroundColor: "red",
              hoverBorderWidth: 10,
              labels: lbl,
              datasets: q,
              };
            }
            }
       
             if(this.chartView == 9 && this.chartGroup == 1){
                const responseanuual9 = await services07Module0.getAnnualRDChartSettingNine(userID,userTYPE,this.chartStyle);
               // console.log("responsefirst=",responseanuual8);

                let rfms7 = "";
            responseanuual9.amsf_data.forEach(
              (elementannual7, i7) => {
                rfms7 += ` <div class="single_box bgclr`+ i7 +`">
                  <span>`+ Number(elementannual7.total).toFixed(2) +`</span>
                  <label class="title">`+ elementannual7.AMSF_YEAR +`</label>
                </div>
                `;
                  }
              );

             
             if(this.chartType == 'Single-Value'){
                  this.singleValueOne =`<div class="box_container">` + rfms7 + `</div>`;
                  this.singleValueTwo = `<div class="box_container">` + rfms7 + `</div>`;
                  this.singleValueThree = `<div class="box_container">` + rfms7 + `</div>`;
                  this.singleValueFour = `<div class="box_container">` + rfms7 + `</div>`;
                  this.singleValueFive = `<div class="box_container">` + rfms7 + `</div>`;
                  this.singleValueSix = `<div class="box_container">` + rfms7 + `</div>`;
           }
                let ds=[];
                let dsone=[];
                let lbl=[];
                let currentYear = new Date().getFullYear();
                let previousYear = currentYear-1;
                let previousYear1 = currentYear-2;
               // lbl = [currentYear+':UTS',currentYear+':PRS',previousYear+':UTS',previousYear+':PRS',previousYear1+':UTS',previousYear1+':PRS'];
                 lbl = ['',''];
               var q = [];
                responseanuual9.amsf_data.forEach((u,i) =>{
                  var pr = [];
                  var color;
                  if(i == 0){
                    color = ['rgb(255, 205, 86)', 'rgb(255, 205, 86)', 'rgb(255, 205, 86)', 'rgb(255, 205, 86)','rgb(255, 205, 86)','rgb(255, 205, 86)','rgb(255, 205, 86)','rgb(255, 205, 86)','rgb(255, 205, 86)','rgb(255, 205, 86)','rgb(255, 205, 86)','rgb(255, 205, 86)'];
                  }
                   if(i == 1){
                    color = ["#00D3FF", "#00D3FF", "#00D3FF", "#00D3FF","#00D3FF",'#00D3FF','#00D3FF','#00D3FF','#00D3FF','#00D3FF','#00D3FF','#00D3FF'];
                  }
                 if(i == 2){
                     color = ["#a159d4", "#a159d4", "#a159d4", "#a159d4","#a159d4",'#a159d4','#a159d4','#a159d4','#a159d4','#a159d4','#a159d4','#a159d4'];
                  }
                  pr.push(u['total']);
                  q.push({label: `${u['AMSF_YEAR']} :: UTS`, data: pr, backgroundColor: color});
              });
            

            if(this.chartType == 'LINE'){
              this.linechartData = {
              hoverBackgroundColor: "red",
              hoverBorderWidth: 10,
              labels: lbl,
              datasets: q,
              };
            }

            if(this.chartType == 'BAR'){
              this.barchartData = {
              hoverBackgroundColor: "red",
              hoverBorderWidth: 10,
              labels: lbl,
              datasets: q,
              };
            }
            }
              if(this.chartView == 10 && this.chartGroup == 1){
           // Not Done
                const responseanuual10 = await services07Module0.getAnnualRDChartSettingTen(userID,userTYPE,this.chartStyle);
               // console.log("responsefirst=",responseanuual8);

                let rfms7 = "";
            responseanuual10.amsf_data.forEach(
              (elementannual7, i7) => {
                rfms7 += ` <div class="single_box bgclr`+ i7 +`">
                  <span>`+ Number(elementannual7.total).toFixed(2) +`</span>
                  <label class="title">`+ elementannual7.AMSF_YEAR +`</label>
                </div>
                `;
                  }
              );

             
             if(this.chartType == 'Single-Value'){
                  this.singleValueOne =`<div class="box_container">` + rfms7 + `</div>`;
                  this.singleValueTwo = `<div class="box_container">` + rfms7 + `</div>`;
                  this.singleValueThree = `<div class="box_container">` + rfms7 + `</div>`;
                  this.singleValueFour = `<div class="box_container">` + rfms7 + `</div>`;
                  this.singleValueFive = `<div class="box_container">` + rfms7 + `</div>`;
                  this.singleValueSix = `<div class="box_container">` + rfms7 + `</div>`;
           }
                let ds=[];
                let dsone=[];
                let lbl=[];
                let currentYear = new Date().getFullYear();
                let previousYear = currentYear-1;
                let previousYear1 = currentYear-2;
               // lbl = [currentYear+':UTS',currentYear+':PRS',previousYear+':UTS',previousYear+':PRS',previousYear1+':UTS',previousYear1+':PRS'];
                 lbl = ['',''];
               var q = [];
                responseanuual10.amsf_data.forEach((u,i) =>{
                  var pr = [];
                  var color;
                  if(i == 0){
                    color = ['rgb(255, 205, 86)', 'rgb(255, 205, 86)', 'rgb(255, 205, 86)', 'rgb(255, 205, 86)','rgb(255, 205, 86)','rgb(255, 205, 86)','rgb(255, 205, 86)','rgb(255, 205, 86)','rgb(255, 205, 86)','rgb(255, 205, 86)','rgb(255, 205, 86)','rgb(255, 205, 86)'];
                  }
                   if(i == 1){
                    color = ["#00D3FF", "#00D3FF", "#00D3FF", "#00D3FF","#00D3FF",'#00D3FF','#00D3FF','#00D3FF','#00D3FF','#00D3FF','#00D3FF','#00D3FF'];
                  }
                 if(i == 2){
                     color = ["#a159d4", "#a159d4", "#a159d4", "#a159d4","#a159d4",'#a159d4','#a159d4','#a159d4','#a159d4','#a159d4','#a159d4','#a159d4'];
                  }
                  pr.push(u['total']);
                  q.push({label: `${u['AMSF_YEAR']} :: UTS`, data: pr, backgroundColor: color});
              });
              // // Training Provider
              //  responseanuual9.prc_data_tgs.forEach((u1,i1) =>{
              //     var pr1 = [];
              //     var color1;
              //     if(i1 == 0){
              //       color1 = ['#6073D5', '#6073D5', '#6073D5', '#6073D5','#6073D5','#6073D5','#6073D5','#6073D5','#6073D5','#6073D5','#6073D5','#6073D5'];
              //     }
              //   if(i1 == 1){
              //       color1 = ["rgb(255, 99, 132)", "rgb(255, 99, 132)", "rgb(255, 99, 132)", "rgb(255, 99, 132)","rgb(255, 99, 132)",'rgb(255, 99, 132)','rgb(255, 99, 132)','rgb(255, 99, 132)','rgb(255, 99, 132)','rgb(255, 99, 132)','rgb(255, 99, 132)','rgb(255, 99, 132)'];
              //     }
              //     if(i1 == 2){
              //       color1 = ["#98ab07", "#98ab07", "#98ab07", "#98ab07","#98ab07",'#98ab07','#98ab07','#98ab07','#98ab07','#98ab07','#98ab07','#98ab07'];
              //     }
              //       pr1.push(u1['total']);
              //     q.push({label: `${u1['AMSF_YEAR']} :: PRS`, data: pr1, backgroundColor: color1});
              // });

            if(this.chartType == 'LINE'){
              this.linechartData = {
              hoverBackgroundColor: "red",
              hoverBorderWidth: 10,
              labels: lbl,
              datasets: q,
              };
            }

            if(this.chartType == 'BAR'){
              this.barchartData = {
              hoverBackgroundColor: "red",
              hoverBorderWidth: 10,
              labels: lbl,
              datasets: q,
              };
            }
            }
           }
           if(this.chartGroup == 2){
              if(this.chartView == 1 && this.chartGroup == 2){
                const responseanuual1 = await services07Module0.getAnnualRAChartSettingOne(userID,userTYPE,this.chartStyle);
               // console.log("responsefirst=",responseanuual8);

                let rfms7 = "";
            responseanuual1.amsf_total_data.forEach(
              (elementannual7, i7) => {
                rfms7 += ` <div class="single_box bgclr`+ i7 +`">
                  <span>`+ elementannual7.total +`</span>
                  <label class="title">`+ elementannual7.AMSF_YEAR +`</label>
                </div>
                `;
                  }
              );

             
             if(this.chartType == 'Single-Value'){
                  this.singleValueOne =`<div class="box_container">` + rfms7 + `</div>`;
                  this.singleValueTwo = `<div class="box_container">` + rfms7 + `</div>`;
                  this.singleValueThree = `<div class="box_container">` + rfms7 + `</div>`;
                  this.singleValueFour = `<div class="box_container">` + rfms7 + `</div>`;
                  this.singleValueFive = `<div class="box_container">` + rfms7 + `</div>`;
                  this.singleValueSix = `<div class="box_container">` + rfms7 + `</div>`;
           }
                let ds=[];
                let dsone=[];
                let lbl=[];
                let currentYear = new Date().getFullYear();
                let previousYear = currentYear-1;
                let previousYear1 = currentYear-2;
               // lbl = [currentYear+':UTS',currentYear+':PRS',previousYear+':UTS',previousYear+':PRS',previousYear1+':UTS',previousYear1+':PRS'];
                 lbl = ['',''];
               var q = [];
                responseanuual9.amsf_data.forEach((u,i) =>{
                  var pr = [];
                  var color;
                  if(i == 0){
                    color = ['rgb(255, 205, 86)', 'rgb(255, 205, 86)', 'rgb(255, 205, 86)', 'rgb(255, 205, 86)','rgb(255, 205, 86)','rgb(255, 205, 86)','rgb(255, 205, 86)','rgb(255, 205, 86)','rgb(255, 205, 86)','rgb(255, 205, 86)','rgb(255, 205, 86)','rgb(255, 205, 86)'];
                  }
                   if(i == 1){
                    color = ["#00D3FF", "#00D3FF", "#00D3FF", "#00D3FF","#00D3FF",'#00D3FF','#00D3FF','#00D3FF','#00D3FF','#00D3FF','#00D3FF','#00D3FF'];
                  }
                 if(i == 2){
                     color = ["#a159d4", "#a159d4", "#a159d4", "#a159d4","#a159d4",'#a159d4','#a159d4','#a159d4','#a159d4','#a159d4','#a159d4','#a159d4'];
                  }
                  pr.push(u['total']);
                  q.push({label: `${u['AMSF_YEAR']} :: UTS`, data: pr, backgroundColor: color});
              });
            

            if(this.chartType == 'LINE'){
              this.linechartData = {
              hoverBackgroundColor: "red",
              hoverBorderWidth: 10,
              labels: lbl,
              datasets: q,
              };
            }

            if(this.chartType == 'BAR'){
              this.barchartData = {
              hoverBackgroundColor: "red",
              hoverBorderWidth: 10,
              labels: lbl,
              datasets: q,
              };
            }
            }
             if(this.chartView == 2 && this.chartGroup == 2){
                const responseanuual2 = await services07Module0.getAnnualRAChartSettingTwo(userID,userTYPE,this.chartStyle);
                console.log("responsessssss=",responseanuual2);
          if(this.chartType == 'TABLE'){
               let tabval1 = "";
                responseanuual2.forEach(
              (elementAnnual, i8) => {
                i8 =i8+1;
                    tabval1 += `<tr class="text_center">
                    <td class="text_center">`+  elementAnnual.AMSF_YEAR +`</td>
                    <td class="text_center">`+ elementAnnual.total +`</td>
                    <td class="text_center">`+ elementAnnual.total1 +`</td>
                    </tr>`;
                  }
              );

            this.tableValueOne = `<table class="table table-totaluser">
                        <tr class="table_header ">
                        </tr>
                        <tr class="text_center table_header_title">
                        <td class="text_center">YEAR</td>
                        <td class="text_center">UTMC</td>
                        <td class="text_center">PRP</td>
                        </tr>
                        ` + tabval1 + `
                        </table>
                        `;
           this.tableValueTwo = `<table class="table table-totaluser">
                        <tr class="table_header ">
                        </tr>
                        <tr class="text_center table_header_title">
                        <td>YEAR</td>
                        <td class="text_center">UTMC</td>
                        <td class="text_center">PRP</td>
                        </tr>
                        ` + tabval1 + `
                        </table>
                        `;
          this.tableValueThree = `<table class="table table-totaluser">
                           <tr class="table_header ">
                        </tr>
                        <tr class="text_center table_header_title">
                        <td>YEAR</td>
                        <td class="text_center">UTMC</td>
                        <td class="text_center">PRP</td>
                        </tr>
                        ` + tabval1 + `
                        </table>
                        `;
           this.tableValueFour = `<table class="table table-totaluser">
                           <tr class="table_header ">
                        </tr>
                        <tr class="text_center table_header_title">
                        <td>YEAR</td>
                        <td class="text_center">UTMC</td>
                        <td class="text_center">PRP</td>
                        </tr>
                        ` + tabval1 + `
                        </table>
                        `;
          this.tableValueFive = `<table class="table table-totaluser">
                          <tr class="table_header ">
                        </tr>
                        <tr class="text_center table_header_title">
                        <td>YEAR</td>
                        <td class="text_center">UTMC</td>
                        <td class="text_center">PRP</td>
                        </tr>
                        ` + tabval1 + `
                        </table>
                        `;
          this.tableValueSix = `<table class="table table-totaluser">
                         <tr class="table_header ">
                        </tr>
                        <tr class="text_center table_header_title">
                        <td>YEAR</td>
                        <td class="text_center">UTMC</td>
                        <td class="text_center">PRP</td>
                        </tr>
                        ` + tabval1 + `
                        </table>
                        `;
            }    
                let rfms7 = "";
            responseanuual2.amsf_data.forEach(
              (elementannual7, i7) => {
                rfms7 += ` <div class="single_box bgclr`+ i7 +`">
                  <span>`+ Number(elementannual7.total).toFixed(2) +`</span>
                  <label class="title">`+ elementannual7.AMSF_YEAR +`</label>
                </div>
                `;
                  }
              );

             
             if(this.chartType == 'Single-Value'){
                  this.singleValueOne =`<div class="box_container">` + rfms7 + `</div>`;
                  this.singleValueTwo = `<div class="box_container">` + rfms7 + `</div>`;
                  this.singleValueThree = `<div class="box_container">` + rfms7 + `</div>`;
                  this.singleValueFour = `<div class="box_container">` + rfms7 + `</div>`;
                  this.singleValueFive = `<div class="box_container">` + rfms7 + `</div>`;
                  this.singleValueSix = `<div class="box_container">` + rfms7 + `</div>`;
           }
                let ds=[];
                let dsone=[];
                let lbl=[];
                let currentYear = new Date().getFullYear();
                let previousYear = currentYear-1;
                let previousYear1 = currentYear-2;
               // lbl = [currentYear+':UTS',currentYear+':PRS',previousYear+':UTS',previousYear+':PRS',previousYear1+':UTS',previousYear1+':PRS'];
                 lbl = ['',''];
               var q = [];
                responseanuual9.amsf_data.forEach((u,i) =>{
                  var pr = [];
                  var color;
                  if(i == 0){
                    color = ['rgb(255, 205, 86)', 'rgb(255, 205, 86)', 'rgb(255, 205, 86)', 'rgb(255, 205, 86)','rgb(255, 205, 86)','rgb(255, 205, 86)','rgb(255, 205, 86)','rgb(255, 205, 86)','rgb(255, 205, 86)','rgb(255, 205, 86)','rgb(255, 205, 86)','rgb(255, 205, 86)'];
                  }
                   if(i == 1){
                    color = ["#00D3FF", "#00D3FF", "#00D3FF", "#00D3FF","#00D3FF",'#00D3FF','#00D3FF','#00D3FF','#00D3FF','#00D3FF','#00D3FF','#00D3FF'];
                  }
                 if(i == 2){
                     color = ["#a159d4", "#a159d4", "#a159d4", "#a159d4","#a159d4",'#a159d4','#a159d4','#a159d4','#a159d4','#a159d4','#a159d4','#a159d4'];
                  }
                  pr.push(u['total']);
                  q.push({label: `${u['AMSF_YEAR']} :: UTS`, data: pr, backgroundColor: color});
              });
            

            if(this.chartType == 'LINE'){
              this.linechartData = {
              hoverBackgroundColor: "red",
              hoverBorderWidth: 10,
              labels: lbl,
              datasets: q,
              };
            }

            if(this.chartType == 'BAR'){
              this.barchartData = {
              hoverBackgroundColor: "red",
              hoverBorderWidth: 10,
              labels: lbl,
              datasets: q,
              };
            }
            }
           }
         if(this.chartGroup == 3){    
           if(this.chartView == 3 && this.chartGroup == 3){
                const responseanuual3 = await services07Module0.getAnnualRAChartSettingThree(userID,userTYPE,this.chartStyle);
                console.log("total_data=",responseanuual3);

                let rfms7 = "";
            responseanuual3.total_data.forEach(
              (elementannual7, i7) => {
                rfms7 += ` <div class="single_box bgclr`+ i7 +`">
                  <span>`+ elementannual7.utstotal +`</span>
                  <label class="title">`+ elementannual7.AMSF_YEAR +`(UTS)</label>
                </div>
                `;
                  }
              );
             let rfms8 = "";
            responseanuual3.total_data.forEach(
              (elementannual8, i8) => {
                rfms8 += ` <div class="single_box bgclr`+ i8 +`">
                  <span>`+ elementannual8.prstotal +`</span>
                  <label class="title">`+ elementannual8.AMSF_YEAR +`(PRS)</label>
                </div>
                `;
                  }
              );
                let rfms9 = "";
            responseanuual3.total_data.forEach(
              (elementannual9, i9) => {
                i9+=2;
                rfms9 += ` <div class="single_box bgclr`+ i9 +`">
                  <span>`+ elementannual9.dualtotal +`</span>
                  <label class="title">`+ elementannual9.AMSF_YEAR +`(Dual)</label>
                </div>
                `;
                  }
              );

             
             if(this.chartType == 'Single-Value'){
                  this.singleValueOne =`<div class="box_container">` + rfms7 + `</div><div class="box_container">` + rfms8 + `</div><div class="box_container">` + rfms9 + `</div>`;
                  this.singleValueTwo = `<div class="box_container">` + rfms7 + `</div><div class="box_container">` + rfms8 + `</div><div class="box_container">` + rfms9 + `</div>`;
                  this.singleValueThree = `<div class="box_container">` + rfms7 + `</div><div class="box_container">` + rfms8 + `</div><div class="box_container">` + rfms9 + `</div>`;
                  this.singleValueFour = `<div class="box_container">` + rfms7 + `</div><div class="box_container">` + rfms8 + `</div><div class="box_container">` + rfms9 + `</div>`;
                  this.singleValueFive = `<div class="box_container">` + rfms7 + `</div><div class="box_container">` + rfms8 + `</div><div class="box_container">` + rfms9 + `</div>`;
                  this.singleValueSix = `<div class="box_container">` + rfms7 + `</div><div class="box_container">` + rfms8 + `</div><div class="box_container">` + rfms9 + `</div>`;
           }
                let ds=[];
                let dsone=[];
                let lbl=[];
                let currentYear = new Date().getFullYear();
                let previousYear = currentYear-1;
                let previousYear1 = currentYear-2;
               // lbl = [currentYear+':UTS',currentYear+':PRS',previousYear+':UTS',previousYear+':PRS',previousYear1+':UTS',previousYear1+':PRS'];
                 lbl = ['',''];
               var q = [];
                responseanuual9.amsf_data.forEach((u,i) =>{
                  var pr = [];
                  var color;
                  if(i == 0){
                    color = ['rgb(255, 205, 86)', 'rgb(255, 205, 86)', 'rgb(255, 205, 86)', 'rgb(255, 205, 86)','rgb(255, 205, 86)','rgb(255, 205, 86)','rgb(255, 205, 86)','rgb(255, 205, 86)','rgb(255, 205, 86)','rgb(255, 205, 86)','rgb(255, 205, 86)','rgb(255, 205, 86)'];
                  }
                   if(i == 1){
                    color = ["#00D3FF", "#00D3FF", "#00D3FF", "#00D3FF","#00D3FF",'#00D3FF','#00D3FF','#00D3FF','#00D3FF','#00D3FF','#00D3FF','#00D3FF'];
                  }
                 if(i == 2){
                     color = ["#a159d4", "#a159d4", "#a159d4", "#a159d4","#a159d4",'#a159d4','#a159d4','#a159d4','#a159d4','#a159d4','#a159d4','#a159d4'];
                  }
                  pr.push(u['total']);
                  q.push({label: `${u['AMSF_YEAR']} :: UTS`, data: pr, backgroundColor: color});
              });
            

            if(this.chartType == 'LINE'){
              this.linechartData = {
              hoverBackgroundColor: "red",
              hoverBorderWidth: 10,
              labels: lbl,
              datasets: q,
              };
            }

            if(this.chartType == 'BAR'){
              this.barchartData = {
              hoverBackgroundColor: "red",
              hoverBorderWidth: 10,
              labels: lbl,
              datasets: q,
              };
            }
            }
          if(this.chartView == 4 && this.chartGroup == 3){
                const responseanuual4 = await services07Module0.getAnnualRAChartSettingFour(userID,userTYPE,this.chartStyle);
               // console.log("responsefirst=",responseanuual8);

                let rfms10 = "";
            responseanuual4.total_consultant_data.forEach(
              (elementannual7, i7) => {
                rfms10 += ` <div class="single_box bgclr`+ i7 +`">
                  <span>`+ elementannual7.dualtotal +`</span>
                  <label class="title">`+ elementannual7.AMSF_YEAR +`<br>(Total Consultant)</label>
                </div>
                `;
                  }
              );

             
             if(this.chartType == 'Single-Value'){
                  this.singleValueOne =`<div class="box_container">` + rfms10 + `</div>`;
                  this.singleValueTwo = `<div class="box_container">` + rfms10 + `</div>`;
                  this.singleValueThree = `<div class="box_container">` + rfms10 + `</div>`;
                  this.singleValueFour = `<div class="box_container">` + rfms10 + `</div>`;
                  this.singleValueFive = `<div class="box_container">` + rfms10 + `</div>`;
                  this.singleValueSix = `<div class="box_container">` + rfms10 + `</div>`;
           }
                let ds=[];
                let dsone=[];
                let lbl=[];
                let currentYear = new Date().getFullYear();
                let previousYear = currentYear-1;
                let previousYear1 = currentYear-2;
               // lbl = [currentYear+':UTS',currentYear+':PRS',previousYear+':UTS',previousYear+':PRS',previousYear1+':UTS',previousYear1+':PRS'];
                 lbl = ['',''];
               var q = [];
                responseanuual9.amsf_data.forEach((u,i) =>{
                  var pr = [];
                  var color;
                  if(i == 0){
                    color = ['rgb(255, 205, 86)', 'rgb(255, 205, 86)', 'rgb(255, 205, 86)', 'rgb(255, 205, 86)','rgb(255, 205, 86)','rgb(255, 205, 86)','rgb(255, 205, 86)','rgb(255, 205, 86)','rgb(255, 205, 86)','rgb(255, 205, 86)','rgb(255, 205, 86)','rgb(255, 205, 86)'];
                  }
                   if(i == 1){
                    color = ["#00D3FF", "#00D3FF", "#00D3FF", "#00D3FF","#00D3FF",'#00D3FF','#00D3FF','#00D3FF','#00D3FF','#00D3FF','#00D3FF','#00D3FF'];
                  }
                 if(i == 2){
                     color = ["#a159d4", "#a159d4", "#a159d4", "#a159d4","#a159d4",'#a159d4','#a159d4','#a159d4','#a159d4','#a159d4','#a159d4','#a159d4'];
                  }
                  pr.push(u['total']);
                  q.push({label: `${u['AMSF_YEAR']} :: UTS`, data: pr, backgroundColor: color});
              });
            

            if(this.chartType == 'LINE'){
              this.linechartData = {
              hoverBackgroundColor: "red",
              hoverBorderWidth: 10,
              labels: lbl,
              datasets: q,
              };
            }

            if(this.chartType == 'BAR'){
              this.barchartData = {
              hoverBackgroundColor: "red",
              hoverBorderWidth: 10,
              labels: lbl,
              datasets: q,
              };
            }
            }
         if(this.chartView == 5 && this.chartGroup == 3){
                const responseanuual5 = await services07Module0.getAnnualRAChartSettingFive(userID,userTYPE,this.chartStyle);
               // console.log("responsefirst=",responseanuual8);

          //       let rfms7 = "";
          //   responseanuual9.amsf_data.forEach(
          //     (elementannual7, i7) => {
          //       rfms7 += ` <div class="single_box bgclr`+ i7 +`">
          //         <span>`+ Number(elementannual7.total).toFixed(2) +`</span>
          //         <label class="title">`+ elementannual7.AMSF_YEAR +`</label>
          //       </div>
          //       `;
          //         }
          //     );

             
          //    if(this.chartType == 'Single-Value'){
          //         this.singleValueOne =`<div class="box_container">` + rfms7 + `</div>`;
          //         this.singleValueTwo = `<div class="box_container">` + rfms7 + `</div>`;
          //         this.singleValueThree = `<div class="box_container">` + rfms7 + `</div>`;
          //         this.singleValueFour = `<div class="box_container">` + rfms7 + `</div>`;
          //         this.singleValueFive = `<div class="box_container">` + rfms7 + `</div>`;
          //         this.singleValueSix = `<div class="box_container">` + rfms7 + `</div>`;
          //  }
          //       let ds=[];
          //       let dsone=[];
          //       let lbl=[];
          //       let currentYear = new Date().getFullYear();
          //       let previousYear = currentYear-1;
          //       let previousYear1 = currentYear-2;
          //      // lbl = [currentYear+':UTS',currentYear+':PRS',previousYear+':UTS',previousYear+':PRS',previousYear1+':UTS',previousYear1+':PRS'];
          //        lbl = ['',''];
          //      var q = [];
          //       responseanuual9.amsf_data.forEach((u,i) =>{
          //         var pr = [];
          //         var color;
          //         if(i == 0){
          //           color = ['rgb(255, 205, 86)', 'rgb(255, 205, 86)', 'rgb(255, 205, 86)', 'rgb(255, 205, 86)','rgb(255, 205, 86)','rgb(255, 205, 86)','rgb(255, 205, 86)','rgb(255, 205, 86)','rgb(255, 205, 86)','rgb(255, 205, 86)','rgb(255, 205, 86)','rgb(255, 205, 86)'];
          //         }
          //          if(i == 1){
          //           color = ["#00D3FF", "#00D3FF", "#00D3FF", "#00D3FF","#00D3FF",'#00D3FF','#00D3FF','#00D3FF','#00D3FF','#00D3FF','#00D3FF','#00D3FF'];
          //         }
          //        if(i == 2){
          //            color = ["#a159d4", "#a159d4", "#a159d4", "#a159d4","#a159d4",'#a159d4','#a159d4','#a159d4','#a159d4','#a159d4','#a159d4','#a159d4'];
          //         }
          //         pr.push(u['total']);
          //         q.push({label: `${u['AMSF_YEAR']} :: UTS`, data: pr, backgroundColor: color});
          //     });
            

          //   if(this.chartType == 'LINE'){
          //     this.linechartData = {
          //     hoverBackgroundColor: "red",
          //     hoverBorderWidth: 10,
          //     labels: lbl,
          //     datasets: q,
          //     };
          //   }

          //   if(this.chartType == 'BAR'){
          //     this.barchartData = {
          //     hoverBackgroundColor: "red",
          //     hoverBorderWidth: 10,
          //     labels: lbl,
          //     datasets: q,
          //     };
          //   }
            }
          if(this.chartView == 6 && this.chartGroup == 3){
                const responseanuual6 = await services07Module0.getAnnualRAChartSettingSix(userID,userTYPE,this.chartStyle);
               // console.log("responsefirst=",responseanuual8);

          //       let rfms7 = "";
          //   responseanuual9.amsf_data.forEach(
          //     (elementannual7, i7) => {
          //       rfms7 += ` <div class="single_box bgclr`+ i7 +`">
          //         <span>`+ Number(elementannual7.total).toFixed(2) +`</span>
          //         <label class="title">`+ elementannual7.AMSF_YEAR +`</label>
          //       </div>
          //       `;
          //         }
          //     );

             
          //    if(this.chartType == 'Single-Value'){
          //         this.singleValueOne =`<div class="box_container">` + rfms7 + `</div>`;
          //         this.singleValueTwo = `<div class="box_container">` + rfms7 + `</div>`;
          //         this.singleValueThree = `<div class="box_container">` + rfms7 + `</div>`;
          //         this.singleValueFour = `<div class="box_container">` + rfms7 + `</div>`;
          //         this.singleValueFive = `<div class="box_container">` + rfms7 + `</div>`;
          //         this.singleValueSix = `<div class="box_container">` + rfms7 + `</div>`;
          //  }
          //       let ds=[];
          //       let dsone=[];
          //       let lbl=[];
          //       let currentYear = new Date().getFullYear();
          //       let previousYear = currentYear-1;
          //       let previousYear1 = currentYear-2;
          //      // lbl = [currentYear+':UTS',currentYear+':PRS',previousYear+':UTS',previousYear+':PRS',previousYear1+':UTS',previousYear1+':PRS'];
          //        lbl = ['',''];
          //      var q = [];
          //       responseanuual9.amsf_data.forEach((u,i) =>{
          //         var pr = [];
          //         var color;
          //         if(i == 0){
          //           color = ['rgb(255, 205, 86)', 'rgb(255, 205, 86)', 'rgb(255, 205, 86)', 'rgb(255, 205, 86)','rgb(255, 205, 86)','rgb(255, 205, 86)','rgb(255, 205, 86)','rgb(255, 205, 86)','rgb(255, 205, 86)','rgb(255, 205, 86)','rgb(255, 205, 86)','rgb(255, 205, 86)'];
          //         }
          //          if(i == 1){
          //           color = ["#00D3FF", "#00D3FF", "#00D3FF", "#00D3FF","#00D3FF",'#00D3FF','#00D3FF','#00D3FF','#00D3FF','#00D3FF','#00D3FF','#00D3FF'];
          //         }
          //        if(i == 2){
          //            color = ["#a159d4", "#a159d4", "#a159d4", "#a159d4","#a159d4",'#a159d4','#a159d4','#a159d4','#a159d4','#a159d4','#a159d4','#a159d4'];
          //         }
          //         pr.push(u['total']);
          //         q.push({label: `${u['AMSF_YEAR']} :: UTS`, data: pr, backgroundColor: color});
          //     });
            

          //   if(this.chartType == 'LINE'){
          //     this.linechartData = {
          //     hoverBackgroundColor: "red",
          //     hoverBorderWidth: 10,
          //     labels: lbl,
          //     datasets: q,
          //     };
          //   }

          //   if(this.chartType == 'BAR'){
          //     this.barchartData = {
          //     hoverBackgroundColor: "red",
          //     hoverBorderWidth: 10,
          //     labels: lbl,
          //     datasets: q,
          //     };
          //   }
            }
         
         
     }
    },
  },
 
 }
 </script>
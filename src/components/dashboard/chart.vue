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
                              <!-- <bar-chart  :data="barchartDataBottom" :options="barchartOptions" class="chart_style"></bar-chart> -->
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
                        <div v-else-if="this.chartType == 'TABLE' && this.chartId == '6'">
                          <div v-html="tableValueFive"></div>
                          <div class="header-title">{{ this.chartName}}</div>
                        </div>
                         <div v-else-if="this.chartType == 'Single-Value' && this.chartId == '6'">
                            <div v-html="singleValueFive"></div>
                            <div class="header-title">{{ this.chartName}}</div>
                        </div>
                         <div v-else>
                        </div>
                    </div>

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
 import * as services07Module0 from "../../app/module0/services07"
 import moment from "moment";
 export default {
  name: 'fimm-chart',
   props: ["chartId", "chartName", "chartType","chartView","chartStyle","chartModule"],
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
      //ctx:''
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
       mode: 'percentage',
       // render: 'value',
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
            maintainAspectRatio: false,
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
            },
            label:{
             display: true,
            },
            pieceLabel: {
            // mode: 'percentage',
            render: 'value',
            precision: 1,
            fontColor: '#fff',
            },
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
        console.log("Chart Data=",this.chartView,this.chartModule);
        console.log("Chart Module=",this.chartModule);
        if(this.chartView == 1 && this.chartModule == 'CPD'){
            const response = await services07Module0.getMainChartSettingCPDOne(userID,userTYPE,this.chartStyle);
             let ds=[];
            let dsone=[];
            let lbl=[];
           // lbl = ['Members','Training Providers'];
               lbl = ['Jan','Feb','Mar','April','May','June','July','Aug','Sep','Oct','Nov','Dec'];
                    console.log("register_fimm=", response.distributor_data);
                   // Distributor Data
                   let newData = [];
                    newData =  response.distributor_data
                    .reduce(function (r, a) {
                    r[a.YEAR] = r[a.YEAR] || [];
                    r[a.YEAR].push(a);
                    return r;
                    }, Object.create(null));
                   // console.log("register_fimm=", newData);
                    var tableDataStruct = {};

                    Object.keys(newData).forEach((v) =>{
                    var p = {1:0 , 2:0, 3:0, 4: 0, 5:0,6:0,7:0,8:0,9:0,10:0,11:0,12:0};
                    newData[v].forEach((d)=>{
                    p[d.MONTH] = d.total;
                    });
                    tableDataStruct[v] = p;
                    });
                  let distributorYear= [];
                  let distributorMonth= {};
                  distributorYear = Object.keys(tableDataStruct).sort().reverse();
                  distributorMonth = tableDataStruct;

               // console.log("distributorMonth=", distributorMonth);
               // Training Provider Data
                 let newData1 = [];
                    newData1 =  response.training_provider
                    .reduce(function (r1, a1) {
                    r1[a1.YEAR] = r1[a1.YEAR] || [];
                    r1[a1.YEAR].push(a1);
                    return r1;
                    }, Object.create(null));
                   // console.log("register_fimm=", newData);
                    var tableDataStruct1 = {};

                    Object.keys(newData1).forEach((v1) =>{
                    var p1 = {1:0 , 2:0, 3:0, 4: 0, 5:0,6:0,7:0,8:0,9:0,10:0,11:0,12:0};
                    newData1[v1].forEach((d1)=>{
                    p1[d1.MONTH] = d1.total;
                    });
                    tableDataStruct1[v1] = p1;
                    });
                  let providerYear= [];
                  let providerMonth= {};
                  providerYear = Object.keys(tableDataStruct1).sort().reverse();
                  providerMonth = tableDataStruct1;
               // Distributor
               var q = [];
               distributorYear.forEach((u,i) =>{
                  var pr = [];
                  var color;
                  if(i % 2 == 0){
                    color = ['rgb(255, 205, 86)', 'rgb(255, 205, 86)', 'rgb(255, 205, 86)', 'rgb(255, 205, 86)','rgb(255, 205, 86)','rgb(255, 205, 86)','rgb(255, 205, 86)','rgb(255, 205, 86)','rgb(255, 205, 86)','rgb(255, 205, 86)','rgb(255, 205, 86)','rgb(255, 205, 86)'];
                  }else{
                    color = ["#00D3FF", "#00D3FF", "#00D3FF", "#00D3FF","#00D3FF",'#00D3FF','#00D3FF','#00D3FF','#00D3FF','#00D3FF','#00D3FF','#00D3FF'];
                  }
                  Object.keys(distributorMonth[u]).forEach((b, k) => {
                   // console.log(b,k);
                    pr.push(distributorMonth[u][b]);
                  });
                  q.push({label: `${u} :: DISTRIBUTOR`, data: pr, backgroundColor: color});
              });
              // Training Provider
               providerYear.forEach((u1,i1) =>{
                  var pr1 = [];
                  var color1;
                  if(i1 % 2 == 0){
                    color1 = ['#6073D5', '#6073D5', '#6073D5', '#6073D5','#6073D5','#6073D5','#6073D5','#6073D5','#6073D5','#6073D5','#6073D5','#6073D5'];
                  }else{
                    color1 = ["rgb(255, 99, 132)", "rgb(255, 99, 132)", "rgb(255, 99, 132)", "rgb(255, 99, 132)","rgb(255, 99, 132)",'rgb(255, 99, 132)','rgb(255, 99, 132)','rgb(255, 99, 132)','rgb(255, 99, 132)','rgb(255, 99, 132)','rgb(255, 99, 132)','rgb(255, 99, 132)'];
                  }
                  Object.keys(providerMonth[u1]).forEach((b1, k1) => {
                   // console.log(b,k);
                    pr1.push(providerMonth[u1][b1]);
                  });
                  q.push({label: `${u1} :: TRAINING PROVIDER`, data: pr1, backgroundColor: color1});
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
          if(this.chartView == 2 && this.chartModule == 'CPD'){
            const response2 = await services07Module0.getMainChartSettingCPDTwo(userID,userTYPE,this.chartStyle);
            let dstwo=[];
            let lbltwo=[];
            lbltwo = ['POST-VETTING','PRE-VETTING','5 MODULE'];
            dstwo.push(response2.post_data);
            dstwo.push(response2.pre_data);
            dstwo.push(response2.module_data); //= [response.distributor_data, response.training_provider];
            console.log("piechartDataset =",dstwo);
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
         }
           if(this.chartView == 3 && this.chartModule == 'CPD'){
            const response3 = await services07Module0.getMainChartSettingCPDThree(userID,userTYPE,this.chartStyle);
             let dstthree=[];
            let lblthree=[];
            //lblthree = ['Distributor Submitted or Approved','Training Provider Submitted or Approved','Distributor Pending','Training Provider Pending'];
            lblthree = ['Jan','Feb','Mar','April','May','June','July','Aug','Sep','Oct','Nov','Dec'];
            // dstthree.push(response3.distributor_submit_data);
            // dstthree.push(response3.provide_submit_data);
            // dstthree.push(response3.distributor_pending_data);
            // dstthree.push(response3.provide_pending_data);
              let newDataDistSub = [];
                    newDataDistSub =  response3.distributor_submit_data
                    .reduce(function (r3, a3) {
                    r3[a3.YEAR] = r3[a3.YEAR] || [];
                    r3[a3.YEAR].push(a3);
                    return r3;
                    }, Object.create(null));
                   // console.log("register_fimm=", newData);
                    var tableDataStructDistSub = {};

                    Object.keys(newDataDistSub).forEach((v3) =>{
                    var p3 = {1:0 , 2:0, 3:0, 4: 0, 5:0,6:0,7:0,8:0,9:0,10:0,11:0,12:0};
                    newDataDistSub[v3].forEach((d3)=>{
                    p3[d3.MONTH] = d3.total;
                    });
                    tableDataStructDistSub[v3] = p3;
                    });
                  let distributorSubYear= [];
                  let distributorSubMonth= {};
                  distributorSubYear = Object.keys(tableDataStructDistSub).sort().reverse();
                  distributorSubMonth = tableDataStructDistSub;
                 // Distributor Pending
                    let newDataDistPen = [];
                    newDataDistPen =  response3.distributor_pending_data
                    .reduce(function (r4, a4) {
                    r4[a4.YEAR] = r4[a4.YEAR] || [];
                    r4[a4.YEAR].push(a4);
                    return r4;
                    }, Object.create(null));
                   // console.log("register_fimm=", newData);
                    var tableDataStructDistPen = {};

                    Object.keys(newDataDistPen).forEach((v4) =>{
                    var p4 = {1:0 , 2:0, 3:0, 4: 0, 5:0,6:0,7:0,8:0,9:0,10:0,11:0,12:0};
                    newDataDistPen[v4].forEach((d4)=>{
                    p4[d4.MONTH] = d4.total;
                    });
                    tableDataStructDistPen[v4] = p4;
                    });
                  let distributorPenYear= [];
                  let distributorPenMonth= {};
                  distributorPenYear = Object.keys(tableDataStructDistPen).sort().reverse();
                  distributorPenMonth = tableDataStructDistPen;

                   // Training Provider Approve
                    let newDataTrainSub = [];
                    newDataTrainSub =  response3.provide_submit_data
                    .reduce(function (r5, a5) {
                    r5[a5.YEAR] = r5[a5.YEAR] || [];
                    r5[a5.YEAR].push(a5);
                    return r5;
                    }, Object.create(null));
                   // console.log("register_fimm=", newData);
                    var tableDataStructTrainSub = {};

                    Object.keys(newDataTrainSub).forEach((v5) =>{
                    var p5 = {1:0 , 2:0, 3:0, 4: 0, 5:0,6:0,7:0,8:0,9:0,10:0,11:0,12:0};
                    newDataTrainSub[v5].forEach((d5)=>{
                    p5[d5.MONTH] = d5.total;
                    });
                    tableDataStructTrainSub[v5] = p5;
                    });
                  let providerSubYear= [];
                  let providerSubMonth= {};
                  providerSubYear = Object.keys(tableDataStructTrainSub).sort().reverse();
                  providerSubMonth = tableDataStructTrainSub;

                   // Training Provider Pending
                    let newDataTrainPen = [];
                    newDataTrainPen =  response3.provide_pending_data
                    .reduce(function (r6, a6) {
                    r6[a6.YEAR] = r6[a6.YEAR] || [];
                    r6[a6.YEAR].push(a6);
                    return r6;
                    }, Object.create(null));
                   // console.log("register_fimm=", newData);
                    var tableDataStructTrainPen = {};

                    Object.keys(newDataTrainPen).forEach((v6) =>{
                    var p6 = {1:0 , 2:0, 3:0, 4: 0, 5:0,6:0,7:0,8:0,9:0,10:0,11:0,12:0};
                    newDataTrainPen[v6].forEach((d6)=>{
                    p6[d6.MONTH] = d6.total;
                    });
                    tableDataStructTrainPen[v6] = p6;
                    });
                  let providerPenYear= [];
                  let providerPenMonth= {};
                  providerPenYear = Object.keys(tableDataStructTrainPen).sort().reverse();
                  providerPenMonth = tableDataStructTrainPen;


               // Distributor Approve
               var q1 = [];
               distributorSubYear.forEach((u2,i2) =>{
                  var pr2 = [];
                  var color2;
                    color2 = ['#11610f', '#11610f', '#11610f', '#11610f','#11610f','#11610f','#11610f','#11610f','#11610f','#11610f','#11610f','#11610f'];
                  Object.keys(distributorSubMonth[u2]).forEach((b2, k2) => {
                   // console.log(b,k);
                    pr2.push(distributorSubMonth[u2][b2]);
                  });
                  q1.push({label: `DISTRIBUTOR APPROVE`, data: pr2, backgroundColor: color2});
              });
              // Distributor Pending
               distributorPenYear.forEach((u3,i3) =>{
                  var pr3 = [];
                  var color3;
                    color3 = ['#940f0f', '#940f0f', '#940f0f', '#940f0f','#940f0f','#940f0f','#940f0f','#940f0f','#940f0f','#940f0f','#940f0f','#940f0f'];
                  Object.keys(distributorPenMonth[u3]).forEach((b3, k3) => {
                   // console.log(b,k);
                    pr3.push(distributorPenMonth[u3][b3]);
                  });
                  q1.push({label: `DISTRIBUTOR PENDING`, data: pr3, backgroundColor: color3});
              });
               // Training Provider Approve
               providerSubYear.forEach((u4,i4) =>{
                  var pr4 = [];
                  var color4;
                    color4 = ['#ffcd56', '#ffcd56', '#ffcd56', '#ffcd56','#ffcd56','#ffcd56','#ffcd56','#ffcd56','#ffcd56','#ffcd56','#ffcd56','#ffcd56'];
                  Object.keys(providerSubMonth[u4]).forEach((b4, k4) => {
                   // console.log(b,k);
                    pr4.push(providerSubMonth[u4][b4]);
                  });
                  q1.push({label: `TRAINING PROVIDER APPROVE`, data: pr4, backgroundColor: color4});
              });
               // Training Provider Pendind
               providerPenYear.forEach((u5,i5) =>{
                  var pr5 = [];
                  var color5;
                    color5 = ['#6073D5', '#6073D5', '#6073D5', '#6073D5','#6073D5','#6073D5','#6073D5','#6073D5','#6073D5','#6073D5','#6073D5','#6073D5'];
                  Object.keys(providerPenMonth[u5]).forEach((b5, k5) => {
                   // console.log(b,k);
                    pr5.push(providerPenMonth[u5][b5]);
                  });
                  q1.push({label: `TRAINING PROVIDER PENDING`, data: pr5, backgroundColor: color5});
              });

            if(this.chartType == 'LINE'){
              this.linechartData = {
              hoverBackgroundColor: "red",
              hoverBorderWidth: 10,
              labels: lblthree,
              datasets: q1
              };
            }
            if(this.chartType == 'BAR'){
              dstthree.push(0);
              this.barchartData = {
              hoverBackgroundColor: "red",
              hoverBorderWidth: 10,
              labels: lblthree,
              datasets:q1
              };
            }
         }
          if(this.chartView == 4 && this.chartModule == 'CPD'){
            const response4 = await services07Module0.getMainChartSettingCPDFour(userID,userTYPE,this.chartStyle);
             let dsfour=[];
            let lblfour=[];
            lblfour = ['Pending','Approved','Return/Rejected'];
            dsfour.push(response4.pending_data);
            dsfour.push(response4.approve_data);
            dsfour.push(response4.rejected_data);
            // dsfour.push(response4.prevetting_pending_data);
            // dsfour.push(response4.prevetting_approve_data);
            // dsfour.push(response4.prevetting_rejected_data);
            // dsfour.push(response4.module_pending_data);
            // dsfour.push(response4.module_approve_data);
            // dsfour.push(response4.module_rejected_data); //= [response.distributor_data, response.training_provider];
           // console.log("piechartDataset =",dstwo);
           if(this.chartType == 'Single-Value'){
               this.singleValueOne = `
                                      <div class="box_container">
                                        <div class="single_box bgclr1">
                                        <span>`+response4.pending_data+`</span>
                                        <label class="title">PENDING</label>
                                        </div>
                                        <div class="single_box bgclr" >
                                        <span>`+response4.approve_data+`</span>
                                        <label class="title">APPROVED</label>
                                        </div>
                                        <div class="single_box bgclr4">
                                        <span>`+response4.rejected_data+`</span>
                                        <label class="title">RETURN / REJECTED</label>
                                        </div>
                                      </div>
                            `;
                this.singleValueTwo = `
                                      <div class="box_container">
                                        <div class="single_box bgclr1">
                                        <span>`+response4.pending_data+`</span>
                                        <label class="title">PENDING</label>
                                        </div>
                                        <div class="single_box bgclr" >
                                        <span>`+response4.approve_data+`</span>
                                        <label class="title">APPROVED</label>
                                        </div>
                                        <div class="single_box bgclr4">
                                        <span>`+response4.rejected_data+`</span>
                                        <label class="title">RETURN / REJECTED</label>
                                        </div>
                                      </div>
                            `;
                  this.singleValueThree = `
                                      <div class="box_container">
                                        <div class="single_box bgclr1">
                                        <span>`+response4.pending_data+`</span>
                                        <label class="title">PENDING</label>
                                        </div>
                                        <div class="single_box bgclr" >
                                        <span>`+response4.approve_data+`</span>
                                        <label class="title">APPROVED</label>
                                        </div>
                                        <div class="single_box bgclr4">
                                        <span>`+response4.rejected_data+`</span>
                                        <label class="title">RETURN / REJECTED</label>
                                        </div>
                                      </div>
                            `;
             this.singleValueFour = `
                                      <div class="box_container">
                                        <div class="single_box bgclr1">
                                        <span>`+response4.pending_data+`</span>
                                        <label class="title">PENDING</label>
                                        </div>
                                        <div class="single_box bgclr" >
                                        <span>`+response4.approve_data+`</span>
                                        <label class="title">APPROVED</label>
                                        </div>
                                        <div class="single_box bgclr4">
                                        <span>`+response4.rejected_data+`</span>
                                        <label class="title">RETURN / REJECTED</label>
                                        </div>
                                      </div>
                            `;
              this.singleValueFive = `
                                      <div class="box_container">
                                        <div class="single_box bgclr1">
                                        <span>`+response4.pending_data+`</span>
                                        <label class="title">PENDING</label>
                                        </div>
                                        <div class="single_box bgclr" >
                                        <span>`+response4.approve_data+`</span>
                                        <label class="title">APPROVED</label>
                                        </div>
                                        <div class="single_box bgclr4">
                                        <span>`+response4.rejected_data+`</span>
                                        <label class="title">RETURN / REJECTED</label>
                                        </div>
                                      </div>
                            `;
               this.singleValueSix = `
                                      <div class="box_container">
                                        <div class="single_box bgclr1">
                                        <span>`+response4.pending_data+`</span>
                                        <label class="title">PENDING</label>
                                        </div>
                                        <div class="single_box bgclr" >
                                        <span>`+response4.approve_data+`</span>
                                        <label class="title">APPROVED</label>
                                        </div>
                                        <div class="single_box bgclr4">
                                        <span>`+response4.rejected_data+`</span>
                                        <label class="title">RETURN / REJECTED</label>
                                        </div>
                                      </div>
                            `;
           }
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
              //label: "Data One",
                backgroundColor: "#f87979",
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
                backgroundColor:['#1E9600', '#99C802',"#6073D5","#EC307C","#146666","#21210e",'#000000','#7d6868','#4f1466'],
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

         }
           if(this.chartView == 5 && this.chartModule == 'CPD'){
           const response5 = await services07Module0.getMainChartSettingCPDFive(userID,userTYPE,this.chartStyle);
             let dsfive=[];
            let lblfive=[];
            let dsfive1=[];
            let lblfive1=[];
            let dsfive2=[];
            let lblfive2=[];
            // Object.values(response5.top_company_data).forEach(val => {
            //   console.log("Nishi");
            //   console.log(val.total);
            //   lblfive.push(val.DIST_NAME);
            //   dsfive.push(val.total);
            //   //sortable.push(val.total,val.DIST_NAME);
            // });
            let newData = [];
            Object.values(response5.top_company_data)
            .forEach(val => {
                newData.push({total: val.total, DIST_NAME: val.DIST_NAME});
            });
            newData.sort(function(a, b) {
                return a.total < b.total;
            });
           if(newData.length > 10){
            newData.length = 10;
           }
            newData.forEach(nd => {
                lblfive.push(nd.DIST_NAME);
                dsfive.push(nd.total);
            });

             let newBottomData = [];
            Object.values(response5.bottom_company_data)
            .forEach(valb => {
                newBottomData.push({total: valb.total, DIST_NAME: valb.DIST_NAME});
            });
            newBottomData.sort(function(a, b) {
                return b.total < a.total;
            });
           if(newBottomData.length > 10){
            newBottomData.length = 10;
           }
            newBottomData.forEach(ndb => {
                lblfive1.push(ndb.DIST_NAME);
                dsfive1.push(ndb.total);
            });
            // var uniqueLabel = [...new Set([...lblfive ,...lblfive1, ...lblfive2])];
            if(this.chartType == 'PIE'){
              this.piechartData = {
                hoverBackgroundColor: "red",
                hoverBorderWidth: 10,
                labels: lblfive, //this.piechartLabel,
                datasets: [{
                 // label: "Pre-Vetting",
                  backgroundColor: ["#0EDBB4", "#00D3FF", "#EC307C", "#6073D5","#f87979",'#1E9600'],
                  data: dsfive,//this.piechartDataset
                },
                ]
              };
            }
            if(this.chartType == 'DONUT'){
              this.donutchartData = {
              hoverBackgroundColor: "red",
              hoverBorderWidth: 10,
              labels: lblfive,
              datasets: [
              {
               // label: "Pre-Vetting",
                backgroundColor: ["#0EDBB4", "#00D3FF", "#EC307C", "#6073D5","#f87979",'#1E9600'],
                data: dsfive
              }
            ]
              };
            }
            if(this.chartType == 'LINE'){
              this.linechartData = {
              hoverBackgroundColor: "red",
              hoverBorderWidth: 10,
              labels: lblfive,
              datasets: [
              {
                //label: "Pre-vetting",
                backgroundColor: "#f87979",
                data: dsfive
              }
              ]
              };
            }
            if(this.chartType == 'BAR'){
              this. barchartOptions = {
              responsive: true,
              legend: {
              display: false,
              position: 'right',
              },
              title: {
              display: true,
              text: "TOP 10 SUBMISSION BY COMPANY",
              position: 'bottom',
              }
              };
              this.barchartData = {
              hoverBackgroundColor: "red",
              hoverBorderWidth: 10,
              labels: lblfive,
              datasets: [
              {
              label: "Pre-vetting",
                backgroundColor: ["#0EDBB4", "#00D3FF", "#EC307C", "#6073D5","#f87979",'#1E9600','#99C802','rgb(255, 205, 86)','#03fc45','#090a09'],
                data: dsfive
              }
              ]
              };
              // this. barchartBottomOptions = {
              // responsive: true,
              // legend: {
              // display: false,
              // position: 'right',
              // },
              // title: {
              // display: true,
              // text: "BOTTOM 10 SUBMISSION BY COMPANY",
              // position: 'bottom',
              // }
              // };
              // this.barchartDataBottom = {
              // hoverBackgroundColor: "red",
              // hoverBorderWidth: 10,
              // labels: lblfive1,
              // datasets: [
              // {
              // label: "Pre-vetting",
              //   backgroundColor: ["#0EDBB4", "#00D3FF", "#EC307C", "#6073D5","#f87979",'#1E9600','#99C802','rgb(255, 205, 86)','#03fc45','#090a09'],
              //   data: dsfive1
              // }
              // ]
              // };
            }
           }
            if(this.chartView == 6 && this.chartModule == 'CPD'){
            const response6 = await services07Module0.getMainChartSettingCPDSix(userID,userTYPE,this.chartStyle);
             console.log("response6=",response6);
            let dssix=[];
            let lblsix=[];
              // response6.prevetting_top_data.forEach(element => {
              // lblfive.push(element.COMPANY_ID);
              // dsfive.push(element.total);
              // });
           lblsix = ['PREVETTING','WRITING','READING','TEACHING','QUALIFICATION','FP'];
           dssix.push(response6.prevetting_pending_data);
           dssix.push(response6.writing_pending_data);
           dssix.push(response6.reading_pending_data);
           dssix.push(response6.teaching_pending_data);
           dssix.push(response6.quali_pending_data);
           dssix.push(response6.fp_pending_data); //= [response.distributor_data, response.training_provider];
          // console.log("piechartDataset =",dstwo);
            if(this.chartType == 'PIE'){
              this.piechartData = {
                hoverBackgroundColor: "red",
                hoverBorderWidth: 10,
                labels: lblsix, //this.piechartLabel,
                datasets: [{
                  label: "Data One",
                  backgroundColor:['#1E9600', '#99C802',"#6073D5","#EC307C",'#4287f5', '#6b91db'],
                  data: dssix,//this.piechartDataset
                }]
              };
            }
            if(this.chartType == 'DONUT'){
              this.donutchartData = {
              hoverBackgroundColor: "red",
              hoverBorderWidth: 10,
              labels: lblsix,
              datasets: [
              {
              label: "Data Two",
              backgroundColor: [ 'rgb(255, 99, 132)','rgb(54, 162, 235)',"#6073D5","#EC307C",'#4287f5', '#6b91db'],
              data: dssix
              }]
              };
            }
            if(this.chartType == 'LINE'){
              this.linechartData = {
              hoverBackgroundColor: "red",
              hoverBorderWidth: 10,
              labels: lblsix,
              datasets: [
              {
              //label: "Data One",
                backgroundColor: "#f87979",
                data: dssix
              }
              ]
              };
            }
            if(this.chartType == 'BAR'){
              dssix.push(0);
              this.barchartData = {
              hoverBackgroundColor: "red",
              hoverBorderWidth: 10,
              labels: lblsix,
              datasets: [
              {
                label: "2022",
                backgroundColor: ["#0EDBB4", "#00D3FF", "#EC307C", "#6073D5",'#6b91db', '#4287f5'],
                data: dssix
              }
              ]
              };
            }
         }
          if(this.chartView == 7 && this.chartModule == 'CPD'){
            const response7 = await services07Module0.getMainChartSettingCPDSeven(userID,userTYPE,this.chartStyle);
            console.log("response7=",response7);
            let dseight=[];
            let lbleight=[];
              // response6.prevetting_top_data.forEach(element => {
              // lblfive.push(element.COMPANY_ID);
              // dsfive.push(element.total);
              // });
           lbleight = ['> 16 CPD','CPD between 10 to 15','10 CPD','Waivers'];
           dseight.push(response7.program_data);
           dseight.push(response7.quali_data);
           dseight.push(response7.reading_data);
           dseight.push(response7.teaching_data);
          // dseight.push(response7.fp_data);
          // dseight.push(response7.writing_data);
          // dseight.push(response7.waiver_data); //= [response.distributor_data, response.training_provider];
          // console.log("piechartDataset =",dstwo);
            if(this.chartType == 'PIE'){
              this.piechartData = {
                hoverBackgroundColor: "red",
                hoverBorderWidth: 10,
                labels: lbleight, //this.piechartLabel,
                datasets: [{
                  label: "Data One",
                  backgroundColor:['#1E9600', '#99C802',"#6073D5","#EC307C",'#2196f38c', '#f443368c', '#00968896'],
                  data: dseight,//this.piechartDataset
                }]
              };
            }
            if(this.chartType == 'DONUT'){
              this.donutchartData = {
              hoverBackgroundColor: "red",
              hoverBorderWidth: 10,
              labels: lbleight,
              datasets: [
              {
              label: "Data Two",
              backgroundColor: [ 'rgb(255, 99, 132)','rgb(54, 162, 235)',"#6073D5","#EC307C",'#2196f38c', '#f443368c', '#00968896'],
              data: dseight
              }]
              };
            }
            if(this.chartType == 'LINE'){
              this.linechartData = {
              hoverBackgroundColor: "red",
              hoverBorderWidth: 10,
              labels: lbleight,
              datasets: [
              {
              //label: "Data One",
                backgroundColor: "#f87979",
                data: dseight
              }
              ]
              };
            }
            if(this.chartType == 'BAR'){
              dseight.push(0);
              this.barchartData = {
              hoverBackgroundColor: "red",
              hoverBorderWidth: 10,
              labels: lbleight,
              datasets: [
              {
              //label: "Data One",
                backgroundColor: ["#0EDBB4", "#00D3FF", "#EC307C", "#6073D5",'#2196f38c', '#f443368c', '#00968896'],
                data: dseight
              }
              ]
              };
            }
            if(this.chartType == 'POLARAREA'){
              this.areachartData = {
              hoverBackgroundColor: "red",
              hoverBorderWidth: 10,
              labels: lbleight,
              datasets: [
              {
                //label: "Data One",
                backgroundColor: ["#0EDBB4", "#00D3FF", "#EC307C", "#6073D5",'#2196f38c', '#f443368c', '#00968896'],
                borderColor: ['#2196f38c', '#f443368c', '#3f51b570', '#00968896'],
                borderWidth: 1,
                data: dseight
              }
              ]
              };
            }
         }
           if(this.chartView == 8 && this.chartModule == 'CPD'){
            //const response7 = await services07Module0.getMainChartSettingCPDEight(userID,userTYPE,this.chartStyle);
             if(this.chartType == 'Single-Value'){
               this.singleValueOne = `
                                      <div class="box_container">
                                        <div class="single_box bgclr1">
                                        <span>20</span>
                                        <label class="title">CUTA</label>
                                        </div>
                                        <div class="single_box bgclr" >
                                        <span>30</span>
                                        <label class="title">CPRA</label>
                                        </div>
                                        <div class="single_box bgclr4" >
                                        <span >4</span>
                                        <label class="title">By Module completion</label>
                                        </div>
                                        <div class="single_box bgclr2" >
                                        <span >2</span>
                                        <label class="title">By Module Pending</label>
                                        </div>
                                        <div class="single_box bgclr3" >
                                        <span >4</span>
                                        <label class="title">In Progress </label>
                                        </div>
                                        <div class="single_box bgclr5" >
                                        <span >2</span>
                                        <label class="title">Completed</label>
                                        </div>
                                        <div class="single_box bgclr6" >
                                        <span >0</span>
                                        <label class="title">Expired</label>
                                        </div>
                                      </div>
                            `;
                this.singleValueTwo = `
                                      <div class="box_container">
                                        <div class="single_box bgclr1">
                                        <span>20</span>
                                        <label class="title">CUTA</label>
                                        </div>
                                        <div class="single_box bgclr" >
                                        <span>30</span>
                                        <label class="title">CPRA</label>
                                        </div>
                                        <div class="single_box bgclr4" >
                                        <span >4</span>
                                        <label class="title">By Module completion</label>
                                        </div>
                                        <div class="single_box bgclr2" >
                                        <span >2</span>
                                        <label class="title">By Module Pending</label>
                                        </div>
                                        <div class="single_box bgclr3" >
                                        <span >4</span>
                                        <label class="title">In Progress </label>
                                        </div>
                                        <div class="single_box bgclr5" >
                                        <span >2</span>
                                        <label class="title">Completed</label>
                                        </div>
                                        <div class="single_box bgclr6" >
                                        <span >0</span>
                                        <label class="title">Expired</label>
                                        </div>
                                      </div>
                            `;
                  this.singleValueThree = `
                                      <div class="box_container">
                                          <div class="single_box bgclr1">
                                          <span>20</span>
                                          <label class="title">CUTA</label>
                                          </div>
                                          <div class="single_box bgclr" >
                                          <span>30</span>
                                          <label class="title">CPRA</label>
                                          </div>
                                          <div class="single_box bgclr4" >
                                          <span >4</span>
                                          <label class="title">By Module completion</label>
                                          </div>
                                          <div class="single_box bgclr2" >
                                          <span >2</span>
                                          <label class="title">By Module Pending</label>
                                          </div>
                                          <div class="single_box bgclr3" >
                                          <span >4</span>
                                          <label class="title">In Progress </label>
                                          </div>
                                          <div class="single_box bgclr5" >
                                          <span >2</span>
                                          <label class="title">Completed</label>
                                          </div>
                                          <div class="single_box bgclr6" >
                                          <span >0</span>
                                          <label class="title">Expired</label>
                                          </div>
                                      </div>
                            `;
             this.singleValueFour = `
                                      <div class="box_container">
                                      <div class="single_box bgclr1">
                                      <span>20</span>
                                      <label class="title">CUTA</label>
                                      </div>
                                      <div class="single_box bgclr" >
                                      <span>30</span>
                                      <label class="title">CPRA</label>
                                      </div>
                                      <div class="single_box bgclr4" >
                                      <span >4</span>
                                      <label class="title">By Module completion</label>
                                      </div>
                                      <div class="single_box bgclr2" >
                                      <span >2</span>
                                      <label class="title">By Module Pending</label>
                                      </div>
                                      <div class="single_box bgclr3" >
                                      <span >4</span>
                                      <label class="title">In Progress </label>
                                      </div>
                                      <div class="single_box bgclr5" >
                                      <span >2</span>
                                      <label class="title">Completed</label>
                                      </div>
                                      <div class="single_box bgclr6" >
                                      <span >0</span>
                                      <label class="title">Expired</label>
                                      </div>
                                      </div>
                            `;
              this.singleValueFive = `
                                      <div class="box_container">
                                        <div class="single_box bgclr1">
                                        <span>20</span>
                                        <label class="title">CUTA</label>
                                        </div>
                                        <div class="single_box bgclr" >
                                        <span>30</span>
                                        <label class="title">CPRA</label>
                                        </div>
                                        <div class="single_box bgclr4" >
                                        <span >4</span>
                                        <label class="title">By Module completion</label>
                                        </div>
                                        <div class="single_box bgclr2" >
                                        <span >2</span>
                                        <label class="title">By Module Pending</label>
                                        </div>
                                        <div class="single_box bgclr3" >
                                        <span >4</span>
                                        <label class="title">In Progress </label>
                                        </div>
                                        <div class="single_box bgclr5" >
                                        <span >2</span>
                                        <label class="title">Completed</label>
                                        </div>
                                        <div class="single_box bgclr6" >
                                        <span >0</span>
                                        <label class="title">Expired</label>
                                        </div>
                                      </div>
                            `;
               this.singleValueSix = `
                                      <div class="box_container">
                                        <div class="single_box bgclr1">
                                        <span>20</span>
                                        <label class="title">CUTA</label>
                                        </div>
                                        <div class="single_box bgclr" >
                                        <span>30</span>
                                        <label class="title">CPRA</label>
                                        </div>
                                        <div class="single_box bgclr4" >
                                        <span >4</span>
                                        <label class="title">By Module completion</label>
                                        </div>
                                        <div class="single_box bgclr2" >
                                        <span >2</span>
                                        <label class="title">By Module Pending</label>
                                        </div>
                                        <div class="single_box bgclr3" >
                                        <span >4</span>
                                        <label class="title">In Progress </label>
                                        </div>
                                        <div class="single_box bgclr5" >
                                        <span >2</span>
                                        <label class="title">Completed</label>
                                        </div>
                                        <div class="single_box bgclr6" >
                                        <span >0</span>
                                        <label class="title">Expired</label>
                                        </div>
                                      </div>
                            `;
           }
           }
           // CONSULTANT ALERT
          if(this.chartView == 1 && this.chartModule == 'CAS'){
           const responseCAS1 = await services07Module0.getMainChartSettingCASOne(userID,userTYPE,this.chartStyle);
           console.log("responseCAS1=",responseCAS1);
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
           if(this.chartView == 2 && this.chartModule == 'CAS'){
             const responseCAS2 = await services07Module0.getMainChartSettingCASTwo(userID,userTYPE,this.chartStyle);
             console.log("responseCAS2 =",responseCAS2);
             this.approvalstatus = responseCAS2;
             const approvalcount =0;
             const k=0;
           let dstwo=[];
            let lbltwo=[];
             responseCAS2.forEach(element => {
                dstwo.push(element.total);
                 lbltwo.push(element.TS_PARAM);
            });
            let rcas2 = "";
            responseCAS2.forEach(
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
           }
            if(this.chartView == 3 && this.chartModule == 'CAS'){
            const responseCAS3 = await services07Module0.getMainChartSettingCASThree(userID,userTYPE,this.chartStyle);
            this.totalConsultant = responseCAS3;
            let dstthree=[];
            let lblthree=[];
            lblthree = ['Distributor Submitted or Approved','Training Provider Submitted or Approved','Distributor Pending','Training Provider Pending'];
            dstthree.push(responseCAS3.distributor_submit_data);
            dstthree.push(responseCAS3.provide_submit_data);
            dstthree.push(responseCAS3.distributor_pending_data);
            dstthree.push(responseCAS3.provide_pending_data); //= [response.distributor_data, response.training_provider];
           // console.log("piechartDataset =",dstwo);
            let rcas3 = "";
            responseCAS3.forEach(
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
                data: [responseCAS3.distributor_submit_data,responseCAS3.distributor_pending_data]
                },
                {
                label: "Training Provider",
                backgroundColor: "rgba(0,0,200,0.2)",
                data: [responseCAS3.provide_submit_data,responseCAS3.provide_pending_data]
                },
                ]
              };
            } 
         }
           if(this.chartView == 4 && this.chartModule == 'CAS'){
             // Not done
            // const responseCAS4 = await services07Module0.getMainChartSettingCASFour(userID,userTYPE,this.chartStyle);;
            // console.log("responseCAS4=",responseCAS4);
            // let dsfour=[];
            // let lblfour=[];
            // lblfour = ['January','February','March','April','May','June','July','August','September','October','November','December'];
            //  responseCAS4.month_data.forEach(element => {
            //     dsfour.push(element.total);
            // });
            // if(this.chartType == 'PIE'){
            //   this.piechartData = {
            //     hoverBackgroundColor: "red",
            //     hoverBorderWidth: 10,
            //     labels: lblfour, //this.piechartLabel,
            //     datasets: [{
            //       label: "Data One",
            //       backgroundColor:['#1E9600', '#99C802',"#6073D5","#EC307C","#146666","#21210e",'#000000','#7d6868','#4f1466'],
            //       data: dsfour,//this.piechartDataset
            //     }]
            //   };
            // }
            // if(this.chartType == 'DONUT'){
            //   this.donutchartData = {
            //   hoverBackgroundColor: "red",
            //   hoverBorderWidth: 10,
            //   labels: lblfour,
            //   datasets: [
            //   {
            //   label: "Data Two",
            //   backgroundColor:['#1E9600', '#99C802',"#6073D5","#EC307C","#146666","#21210e",'#000000','#7d6868','#4f1466'],
            //   data: dsfour
            //   }]
            //   };
            // }
            // if(this.chartType == 'LINE'){
            //   this.linechartData = {
            //   hoverBackgroundColor: "red",
            //   hoverBorderWidth: 10,
            //   labels: lblfour,
            //   datasets: [
            //   {
            //     label: response4.year,
            //     backgroundColor: "#00D3FF",
            //     data: dsfour
            //   }
            //   ]
            //   };
            // }
            // if(this.chartType == 'BAR'){
            //   dsfour.push(0);
            //   this.barchartData = {
            //   hoverBackgroundColor: "red",
            //   hoverBorderWidth: 10,
            //   labels: lblfour,
            //   datasets: [
            //   {
            //   //label: "Data One",
            //     backgroundColor:['#1E9600', '#99C802',"#6073D5","#EC307C","#146666","#21210e",'#7d6868','#4f1466','#e8963f','#8c2c27','#52106e','#0f58a6'],
            //     data: dsfour
            //   }
            //   ]
            //   };
            // }
            // if(this.chartType == 'POLARAREA'){
            //   this.areachartData = {
            //   hoverBackgroundColor: "red",
            //   hoverBorderWidth: 10,
            //   labels: four,
            //   datasets: [
            //   {
            //     //label: "Data One",
            //     backgroundColor:['#1E9600', '#99C802',"#6073D5","#EC307C","#146666","#21210e",'#000000','#7d6868','#4f1466'],
            //     borderColor: ['#2196f38c', '#f443368c', '#3f51b570', '#00968896'],
            //     borderWidth: 1,
            //     data: dsfour
            //   }
            //   ]
            //   };
            // }
   
         }
          if(this.chartView == 5 && this.chartModule == 'CAS'){
             // Not done
            // const responseCAS5 = await services07Module0.getMainChartSettingCASFive(userID,userTYPE,this.chartStyle);;
            // console.log("responseCAS5=",responseCAS5);
            // let dsfour=[];
            // let lblfour=[];
            // lblfour = ['January','February','March','April','May','June','July','August','September','October','November','December'];
            //  responseCAS5.month_data.forEach(element => {
            //     dsfour.push(element.total);
            // });
            // if(this.chartType == 'PIE'){
            //   this.piechartData = {
            //     hoverBackgroundColor: "red",
            //     hoverBorderWidth: 10,
            //     labels: lblfour, //this.piechartLabel,
            //     datasets: [{
            //       label: "Data One",
            //       backgroundColor:['#1E9600', '#99C802',"#6073D5","#EC307C","#146666","#21210e",'#000000','#7d6868','#4f1466'],
            //       data: dsfour,//this.piechartDataset
            //     }]
            //   };
            // }
            // if(this.chartType == 'DONUT'){
            //   this.donutchartData = {
            //   hoverBackgroundColor: "red",
            //   hoverBorderWidth: 10,
            //   labels: lblfour,
            //   datasets: [
            //   {
            //   label: "Data Two",
            //   backgroundColor:['#1E9600', '#99C802',"#6073D5","#EC307C","#146666","#21210e",'#000000','#7d6868','#4f1466'],
            //   data: dsfour
            //   }]
            //   };
            // }
            // if(this.chartType == 'LINE'){
            //   this.linechartData = {
            //   hoverBackgroundColor: "red",
            //   hoverBorderWidth: 10,
            //   labels: lblfour,
            //   datasets: [
            //   {
            //     label: response4.year,
            //     backgroundColor: "#00D3FF",
            //     data: dsfour
            //   }
            //   ]
            //   };
            // }
            // if(this.chartType == 'BAR'){
            //   dsfour.push(0);
            //   this.barchartData = {
            //   hoverBackgroundColor: "red",
            //   hoverBorderWidth: 10,
            //   labels: lblfour,
            //   datasets: [
            //   {
            //   //label: "Data One",
            //     backgroundColor:['#1E9600', '#99C802',"#6073D5","#EC307C","#146666","#21210e",'#7d6868','#4f1466','#e8963f','#8c2c27','#52106e','#0f58a6'],
            //     data: dsfour
            //   }
            //   ]
            //   };
            // }
            // if(this.chartType == 'POLARAREA'){
            //   this.areachartData = {
            //   hoverBackgroundColor: "red",
            //   hoverBorderWidth: 10,
            //   labels: four,
            //   datasets: [
            //   {
            //     //label: "Data One",
            //     backgroundColor:['#1E9600', '#99C802',"#6073D5","#EC307C","#146666","#21210e",'#000000','#7d6868','#4f1466'],
            //     borderColor: ['#2196f38c', '#f443368c', '#3f51b570', '#00968896'],
            //     borderWidth: 1,
            //     data: dsfour
            //   }
            //   ]
            //   };
            // }
   
         }
         // For Distributor
          if(this.chartView == 1 && this.chartModule == 'DISTRIBUTOR'){
            const responseDIST1 = await services07Module0.getMainChartSettingDISTRIBUTOROne(userID,userTYPE,this.chartStyle);
          }
           if(this.chartView == 2 && this.chartModule == 'DISTRIBUTOR'){
            const responseDIST2 = await services07Module0.getMainChartSettingDISTRIBUTORTwo(userID,userTYPE,this.chartStyle);
          }
           if(this.chartView == 3 && this.chartModule == 'DISTRIBUTOR'){
            const responseDIST3 = await services07Module0.getMainChartSettingDISTRIBUTORThree(userID,userTYPE,this.chartStyle);
            console.log("Distributor1=",responseDIST3);
          // this.utc_pass = responseDIST3.utc_pass;
          // this.prc_pass = responseDIST3.prc_pass;
          // this.dual_same = responseDIST3.dual_pass_same;
          // this.dual_diff = responseDIST3.dual_pass_diff;
           if(this.chartType == 'Single-Value'){
               this.singleValueOne = `
                                      <div class="box_container">
                                        <div class="single_box bgclr1">
                                        <span>`+responseDIST3.utc_pass+`</span>
                                        <label class="title">UTC</label>
                                        </div>
                                        <div class="single_box bgclr3" >
                                        <span>`+responseDIST3.prc_pass+`</span>
                                        <label class="title">PRC</label>
                                        </div>
                                        <div class="single_box bgclr4" >
                                        <span >`+responseDIST3.dual_pass_same+`</span>
                                        <label class="title">Dual(Same Principle)</label>
                                        </div>
                                        <div class="single_box bgclr2" >
                                        <span >`+responseDIST3.dual_pass_diff+`</span>
                                        <label class="title">Dual(Diff Principle)</label>
                                        </div>
                                      </div>
                            `;
                this.singleValueTwo = `
                                      <div class="box_container">
                                        <div class="single_box bgclr1">
                                        <span>`+responseDIST3.utc_pass+`</span>
                                        <label class="title">UTC</label>
                                        </div>
                                        <div class="single_box bgclr3" >
                                        <span>`+responseDIST3.prc_pass+`</span>
                                        <label class="title">PRC</label>
                                        </div>
                                        <div class="single_box bgclr4" >
                                        <span >`+responseDIST3.dual_pass_same+`</span>
                                        <label class="title">Dual(Same Principle)</label>
                                        </div>
                                        <div class="single_box bgclr2" >
                                        <span >`+responseDIST3.dual_pass_diff+`</span>
                                        <label class="title">Dual(Diff Principle)</label>
                                        </div>
                                      </div>
                            `;
                  this.singleValueThree =`
                                      <div class="box_container">
                                        <div class="single_box bgclr1">
                                        <span>`+responseDIST3.utc_pass+`</span>
                                        <label class="title">UTC</label>
                                        </div>
                                        <div class="single_box bgclr3" >
                                        <span>`+responseDIST3.prc_pass+`</span>
                                        <label class="title">PRC</label>
                                        </div>
                                        <div class="single_box bgclr4" >
                                        <span >`+responseDIST3.dual_pass_same+`</span>
                                        <label class="title">Dual(Same Principle)</label>
                                        </div>
                                        <div class="single_box bgclr2" >
                                        <span >`+responseDIST3.dual_pass_diff+`</span>
                                        <label class="title">Dual(Diff Principle)</label>
                                        </div>
                                      </div>
                            `;
             this.singleValueFour = `
                                      <div class="box_container">
                                        <div class="single_box bgclr1">
                                        <span>`+responseDIST3.utc_pass+`</span>
                                        <label class="title">UTC</label>
                                        </div>
                                        <div class="single_box bgclr3" >
                                        <span>`+responseDIST3.prc_pass+`</span>
                                        <label class="title">PRC</label>
                                        </div>
                                        <div class="single_box bgclr4" >
                                        <span >`+responseDIST3.dual_pass_same+`</span>
                                        <label class="title">Dual(Same Principle)</label>
                                        </div>
                                        <div class="single_box bgclr2" >
                                        <span >`+responseDIST3.dual_pass_diff+`</span>
                                        <label class="title">Dual(Diff Principle)</label>
                                        </div>
                                      </div>
                            `;
              this.singleValueFive = `
                                      <div class="box_container">
                                        <div class="single_box bgclr1">
                                        <span>`+responseDIST3.utc_pass+`</span>
                                        <label class="title">UTC</label>
                                        </div>
                                        <div class="single_box bgclr3" >
                                        <span>`+responseDIST3.prc_pass+`</span>
                                        <label class="title">PRC</label>
                                        </div>
                                        <div class="single_box bgclr4" >
                                        <span >`+responseDIST3.dual_pass_same+`</span>
                                        <label class="title">Dual(Same Principle)</label>
                                        </div>
                                        <div class="single_box bgclr2" >
                                        <span >`+responseDIST3.dual_pass_diff+`</span>
                                        <label class="title">Dual(Diff Principle)</label>
                                        </div>
                                      </div>
                            `;
               this.singleValueSix = `
                                      <div class="box_container">
                                        <div class="single_box bgclr1">
                                        <span>`+responseDIST3.utc_pass+`</span>
                                        <label class="title">UTC</label>
                                        </div>
                                        <div class="single_box bgclr3" >
                                        <span>`+responseDIST3.prc_pass+`</span>
                                        <label class="title">PRC</label>
                                        </div>
                                        <div class="single_box bgclr4" >
                                        <span >`+responseDIST3.dual_pass_same+`</span>
                                        <label class="title">Dual(Same Principle)</label>
                                        </div>
                                        <div class="single_box bgclr2" >
                                        <span >`+responseDIST3.dual_pass_diff+`</span>
                                        <label class="title">Dual(Diff Principle)</label>
                                        </div>
                                      </div>
                            `;
           }
          }
           if(this.chartView == 4 && this.chartModule == 'DISTRIBUTOR'){
            const responseDIST4 = await services07Module0.getMainChartSettingDISTRIBUTORFour(userID,userTYPE,this.chartStyle);
          }
           if(this.chartView == 5 && this.chartModule == 'DISTRIBUTOR'){
            const responseDIST5 = await services07Module0.getMainChartSettingDISTRIBUTORFive(userID,userTYPE,this.chartStyle);
          }
           if(this.chartView == 6 && this.chartModule == 'DISTRIBUTOR'){
            const responseDIST6 = await services07Module0.getMainChartSettingDISTRIBUTORSix(userID,userTYPE,this.chartStyle);
             if(this.chartType == 'Single-Value'){
               this.singleValueOne = `
                                      <div class="box_container">
                                        <div class="single_box bgclr1">
                                        <span>`+responseDIST6.single_registration_utc+`</span>
                                        <label class="title">UTC</label>
                                        </div>
                                        <div class="single_box bgclr3" >
                                        <span>`+responseDIST6.single_registration_prc+`</span>
                                        <label class="title">PRC</label>
                                        </div>
                                        <div class="single_box bgclr4" >
                                        <span >`+responseDIST6.dual_registration_same+`</span>
                                        <label class="title">Dual(Same Principle)</label>
                                        </div>
                                        <div class="single_box bgclr2" >
                                        <span >`+responseDIST6.dual_registration_diff+`</span>
                                        <label class="title">Dual(Diff Principle)</label>
                                        </div>
                                      </div>
                            `;
                this.singleValueTwo = `
                                       <div class="box_container">
                                        <div class="single_box bgclr1">
                                        <span>`+responseDIST6.single_registration_utc+`</span>
                                        <label class="title">UTC</label>
                                        </div>
                                        <div class="single_box bgclr3" >
                                        <span>`+responseDIST6.single_registration_prc+`</span>
                                        <label class="title">PRC</label>
                                        </div>
                                        <div class="single_box bgclr4" >
                                        <span >`+responseDIST6.dual_registration_same+`</span>
                                        <label class="title">Dual(Same Principle)</label>
                                        </div>
                                        <div class="single_box bgclr2" >
                                        <span >`+responseDIST6.dual_registration_diff+`</span>
                                        <label class="title">Dual(Diff Principle)</label>
                                        </div>
                                      </div>
                            `;
                  this.singleValueThree =`
                                       <div class="box_container">
                                        <div class="single_box bgclr1">
                                        <span>`+responseDIST6.single_registration_utc+`</span>
                                        <label class="title">UTC</label>
                                        </div>
                                        <div class="single_box bgclr3" >
                                        <span>`+responseDIST6.single_registration_prc+`</span>
                                        <label class="title">PRC</label>
                                        </div>
                                        <div class="single_box bgclr4" >
                                        <span >`+responseDIST6.dual_registration_same+`</span>
                                        <label class="title">Dual(Same Principle)</label>
                                        </div>
                                        <div class="single_box bgclr2" >
                                        <span >`+responseDIST6.dual_registration_diff+`</span>
                                        <label class="title">Dual(Diff Principle)</label>
                                        </div>
                                      </div>
                            `;
             this.singleValueFour = `
                                       <div class="box_container">
                                        <div class="single_box bgclr1">
                                        <span>`+responseDIST6.single_registration_utc+`</span>
                                        <label class="title">UTC</label>
                                        </div>
                                        <div class="single_box bgclr3" >
                                        <span>`+responseDIST6.single_registration_prc+`</span>
                                        <label class="title">PRC</label>
                                        </div>
                                        <div class="single_box bgclr4" >
                                        <span >`+responseDIST6.dual_registration_same+`</span>
                                        <label class="title">Dual(Same Principle)</label>
                                        </div>
                                        <div class="single_box bgclr2" >
                                        <span >`+responseDIST6.dual_registration_diff+`</span>
                                        <label class="title">Dual(Diff Principle)</label>
                                        </div>
                                      </div>
                            `;
              this.singleValueFive = `
                                      <div class="box_container">
                                        <div class="single_box bgclr1">
                                        <span>`+responseDIST6.single_registration_utc+`</span>
                                        <label class="title">UTC</label>
                                        </div>
                                        <div class="single_box bgclr3" >
                                        <span>`+responseDIST6.single_registration_prc+`</span>
                                        <label class="title">PRC</label>
                                        </div>
                                        <div class="single_box bgclr4" >
                                        <span >`+responseDIST6.dual_registration_same+`</span>
                                        <label class="title">Dual(Same Principle)</label>
                                        </div>
                                        <div class="single_box bgclr2" >
                                        <span >`+responseDIST6.dual_registration_diff+`</span>
                                        <label class="title">Dual(Diff Principle)</label>
                                        </div>
                                      </div>
                            `;
               this.singleValueSix = `
                                       <div class="box_container">
                                        <div class="single_box bgclr1">
                                        <span>`+responseDIST6.single_registration_utc+`</span>
                                        <label class="title">UTC</label>
                                        </div>
                                        <div class="single_box bgclr3" >
                                        <span>`+responseDIST6.single_registration_prc+`</span>
                                        <label class="title">PRC</label>
                                        </div>
                                        <div class="single_box bgclr4" >
                                        <span >`+responseDIST6.dual_registration_same+`</span>
                                        <label class="title">Dual(Same Principle)</label>
                                        </div>
                                        <div class="single_box bgclr2" >
                                        <span >`+responseDIST6.dual_registration_diff+`</span>
                                        <label class="title">Dual(Diff Principle)</label>
                                        </div>
                                      </div>
                            `;
           }
          }
           if(this.chartView == 7 && this.chartModule == 'DISTRIBUTOR'){
            const responseDIST7 = await services07Module0.getMainChartSettingDISTRIBUTORSeven(userID,userTYPE,this.chartStyle);
             if(this.chartType == 'Single-Value'){
               this.singleValueOne = `
                                      <div class="box_container">
                                        <div class="single_box bgclr1">
                                        <span>`+responseDIST7.termination_data+`</span>
                                        <label class="title">TERMINATION</label>
                                        </div>
                                        <div class="single_box bgclr3" >
                                        <span>`+responseDIST7.resignation_data+`</span>
                                        <label class="title">RESIGNATION</label>
                                        </div>
                                      </div>
                            `;
                this.singleValueTwo = `
                                       <div class="box_container">
                                        <div class="single_box bgclr1">
                                        <span>`+responseDIST7.termination_data+`</span>
                                        <label class="title">TERMINATION</label>
                                        </div>
                                        <div class="single_box bgclr3" >
                                        <span>`+responseDIST7.resignation_data+`</span>
                                        <label class="title">RESIGNATION</label>
                                        </div>
                                      </div>
                            `;
                  this.singleValueThree =`
                                      <div class="box_container">
                                        <div class="single_box bgclr1">
                                        <span>`+responseDIST7.termination_data+`</span>
                                        <label class="title">TERMINATION</label>
                                        </div>
                                        <div class="single_box bgclr3" >
                                        <span>`+responseDIST7.resignation_data+`</span>
                                        <label class="title">RESIGNATION</label>
                                        </div>
                                      </div>
                            `;
             this.singleValueFour = `
                                      <div class="box_container">
                                        <div class="single_box bgclr1">
                                        <span>`+responseDIST7.termination_data+`</span>
                                        <label class="title">TERMINATION</label>
                                        </div>
                                        <div class="single_box bgclr3" >
                                        <span>`+responseDIST7.resignation_data+`</span>
                                        <label class="title">RESIGNATION</label>
                                        </div>
                                      </div>
                            `;
              this.singleValueFive = `
                                      <div class="box_container">
                                        <div class="single_box bgclr1">
                                        <span>`+responseDIST7.termination_data+`</span>
                                        <label class="title">TERMINATION</label>
                                        </div>
                                        <div class="single_box bgclr3" >
                                        <span>`+responseDIST7.resignation_data+`</span>
                                        <label class="title">RESIGNATION</label>
                                        </div>
                                      </div>
                            `;
               this.singleValueSix = `
                                      <div class="box_container">
                                        <div class="single_box bgclr1">
                                        <span>`+responseDIST7.termination_data+`</span>
                                        <label class="title">TERMINATION</label>
                                        </div>
                                        <div class="single_box bgclr3" >
                                        <span>`+responseDIST7.resignation_data+`</span>
                                        <label class="title">RESIGNATION</label>
                                        </div>
                                      </div>
                            `;
           }
          }
           if(this.chartView == 8 && this.chartModule == 'DISTRIBUTOR'){
            const responseDIST8 = await services07Module0.getMainChartSettingDISTRIBUTOREight(userID,userTYPE,this.chartStyle);
             if(this.chartType == 'Single-Value'){
               this.singleValueOne = `
                                      <div class="box_container">
                                        <div class="single_box bgclr1">
                                        <span>`+responseDIST8.prepaid_balance.OTHERS_AMOUNT+`</span>
                                        <label class="title">Prepaid Balance</label>
                                        </div> 
                                      </div>
                            `;
                this.singleValueTwo = `
                                       <div class="box_container">
                                        <div class="single_box bgclr1">
                                        <span>`+responseDIST8.prepaid_balance.OTHERS_AMOUNT+`</span>
                                        <label class="title">Prepaid Balance</label>
                                        </div> 
                                      </div>
                            `;
                  this.singleValueThree =`
                                       <div class="box_container">
                                        <div class="single_box bgclr1">
                                        <span>`+responseDIST8.prepaid_balance.OTHERS_AMOUNT+`</span>
                                        <label class="title">Prepaid Balance</label>
                                        </div> 
                                      </div>
                            `;
             this.singleValueFour = `
                                      <div class="box_container">
                                        <div class="single_box bgclr1">
                                        <span>`+responseDIST8.prepaid_balance.OTHERS_AMOUNT+`</span>
                                        <label class="title">Prepaid Balance</label>
                                        </div> 
                                      </div>
                            `;
              this.singleValueFive = `
                                      <div class="box_container">
                                        <div class="single_box bgclr1">
                                        <span>`+responseDIST8.prepaid_balance.OTHERS_AMOUNT+`</span>
                                        <label class="title">Prepaid Balance</label>
                                        </div> 
                                      </div>
                            `;
               this.singleValueSix = `
                                       <div class="box_container">
                                        <div class="single_box bgclr1">
                                        <span>`+responseDIST8.prepaid_balance.OTHERS_AMOUNT+`</span>
                                        <label class="title">Prepaid Balance</label>
                                        </div> 
                                      </div>
                            `;
           }
          }
           if(this.chartView == 9 && this.chartModule == 'DISTRIBUTOR'){
            const responseDIST9 = await services07Module0.getMainChartSettingDISTRIBUTORNine(userID,userTYPE,this.chartStyle);
           }
           if(this.chartView == 10 && this.chartModule == 'DISTRIBUTOR'){
            const responseDIST10 = await services07Module0.getMainChartSettingDISTRIBUTORTen(userID,userTYPE,this.chartStyle);
           }
           if(this.chartView == 11 && this.chartModule == 'DISTRIBUTOR'){
            const responseDIST11 = await services07Module0.getMainChartSettingDISTRIBUTOREleven(userID,userTYPE,this.chartStyle);
           }
            if(this.chartView == 12 && this.chartModule == 'DISTRIBUTOR'){
            const responseDIST12 = await services07Module0.getMainChartSettingDISTRIBUTORTwelve(userID,userTYPE,this.chartStyle);
             if(this.chartType == 'Single-Value'){
               this.singleValueOne = `
                                      <div class="box_container">
                                        <div class="single_box bgclr1">
                                        <span>`+responseDIST12.termination_data+`</span>
                                        <label class="title">TERMINATION</label>
                                        </div>
                                        <div class="single_box bgclr2" >
                                        <span>`+responseDIST12.resignation_data+`</span>
                                        <label class="title">RESIGNATION</label>
                                        </div>
                                        <div class="single_box bgclr3" >
                                        <span>`+responseDIST12.revocation_data+`</span>
                                        <label class="title">REVOCATION</label>
                                        </div>
                                      </div>
                            `;
                this.singleValueTwo = `
                                      <div class="box_container">
                                        <div class="single_box bgclr1">
                                        <span>`+responseDIST12.termination_data+`</span>
                                        <label class="title">TERMINATION</label>
                                        </div>
                                        <div class="single_box bgclr2" >
                                        <span>`+responseDIST12.resignation_data+`</span>
                                        <label class="title">RESIGNATION</label>
                                        </div>
                                        <div class="single_box bgclr3" >
                                        <span>`+responseDIST12.revocation_data+`</span>
                                        <label class="title">REVOCATION</label>
                                        </div>
                                      </div>
                            `;
                  this.singleValueThree =`
                                     <div class="box_container">
                                        <div class="single_box bgclr1">
                                        <span>`+responseDIST12.termination_data+`</span>
                                        <label class="title">TERMINATION</label>
                                        </div>
                                        <div class="single_box bgclr2" >
                                        <span>`+responseDIST12.resignation_data+`</span>
                                        <label class="title">RESIGNATION</label>
                                        </div>
                                        <div class="single_box bgclr3" >
                                        <span>`+responseDIST12.revocation_data+`</span>
                                        <label class="title">REVOCATION</label>
                                        </div>
                                      </div>
                            `;
             this.singleValueFour = `
                                      <div class="box_container">
                                        <div class="single_box bgclr1">
                                        <span>`+responseDIST12.termination_data+`</span>
                                        <label class="title">TERMINATION</label>
                                        </div>
                                        <div class="single_box bgclr2" >
                                        <span>`+responseDIST12.resignation_data+`</span>
                                        <label class="title">RESIGNATION</label>
                                        </div>
                                        <div class="single_box bgclr3" >
                                        <span>`+responseDIST12.revocation_data+`</span>
                                        <label class="title">REVOCATION</label>
                                        </div>
                                      </div>
                            `;
              this.singleValueFive = `
                                     <div class="box_container">
                                        <div class="single_box bgclr1">
                                        <span>`+responseDIST12.termination_data+`</span>
                                        <label class="title">TERMINATION</label>
                                        </div>
                                        <div class="single_box bgclr2" >
                                        <span>`+responseDIST12.resignation_data+`</span>
                                        <label class="title">RESIGNATION</label>
                                        </div>
                                        <div class="single_box bgclr3" >
                                        <span>`+responseDIST12.revocation_data+`</span>
                                        <label class="title">REVOCATION</label>
                                        </div>
                                      </div>
                            `;
               this.singleValueSix = `
                                     <div class="box_container">
                                        <div class="single_box bgclr1">
                                        <span>`+responseDIST12.termination_data+`</span>
                                        <label class="title">TERMINATION</label>
                                        </div>
                                        <div class="single_box bgclr2" >
                                        <span>`+responseDIST12.resignation_data+`</span>
                                        <label class="title">RESIGNATION</label>
                                        </div>
                                        <div class="single_box bgclr3" >
                                        <span>`+responseDIST12.revocation_data+`</span>
                                        <label class="title">REVOCATION</label>
                                        </div>
                                      </div>
                            `;
           }
           }
            if(this.chartView == 13 && this.chartModule == 'DISTRIBUTOR'){
            const responseDIST13 = await services07Module0.getMainChartSettingDISTRIBUTORThirteen(userID,userTYPE,this.chartStyle);
           }
            if(this.chartView == 14 && this.chartModule == 'DISTRIBUTOR'){
            const responseDIST14 = await services07Module0.getMainChartSettingDISTRIBUTORFourteen(userID,userTYPE,this.chartStyle);
             let ds=[];
            let lbl=[];
           // console.log("response14.data=", response14);
            responseDIST14.forEach(ndb => {
                lbl.push(ndb.CONSULTANT_NAME);
                ds.push(ndb.total);
            });

             if(this.chartType == 'BAR'){
              ds.push(0);
              this.barchartData = {
              hoverBackgroundColor: "red",
              hoverBorderWidth: 10,
              labels: lbl,
              datasets: [
              {
              //label: "Data One",
                backgroundColor: ["#0EDBB4", "#00D3FF", "#EC307C", "#6073D5","000000"],
                data: ds
              }
              ]
              };
            }
           }
           // Consultant Module
           if(this.chartView == 1 && this.chartModule == 'CONSULTANT'){
            const responseCon1 = await services07Module0.getMainChartSettingCONSULTANTOne(userID,userTYPE,this.chartStyle);
            console.log("Consultant=",responseCon1);
            let ds=[];
            let lbl=[];
            lbl = ['Single Registration',' Dual Registration (same principal)','Dual Registration (Diff principal)'];
            ds.push(responseCon1.single_registration);
            ds.push(responseCon1.dual_registration_same);
            ds.push(responseCon1.dual_registration_diff);

            if(this.chartType == 'PIE'){
              this.piechartData = {
                hoverBackgroundColor: "red",
                hoverBorderWidth: 10,
                labels: lbl, //this.piechartLabel,
                datasets: [
                  {
                  label:"",
                  backgroundColor:['#1E9600', '#99C802',"#6073D5","#EC307C","#146666","#21210e",'#000000','#7d6868','#4f1466'],
                  data: ds,//this.piechartDataset
                }
                ]
              };
            }
            if(this.chartType == 'DONUT'){
              this.donutchartData = {
              hoverBackgroundColor: "red",
              hoverBorderWidth: 10,
               labels: lbl, //this.piechartLabel,
                datasets: [
                  {
                  label:"",
                  backgroundColor:['#1E9600', '#99C802',"#6073D5","#EC307C","#146666","#21210e",'#000000','#7d6868','#4f1466'],
                  data: ds,//this.piechartDataset
                }
                ]
              };
            }
         }
        if(this.chartView == 2 && this.chartModule == 'CONSULTANT'){
            const responseCon2 = await services07Module0.getMainChartSettingCONSULTANTTwo(userID,userTYPE,this.chartStyle);
          }
          if(this.chartView == 3 && this.chartModule == 'CONSULTANT'){
            const responseCon3 = await services07Module0.getMainChartSettingCONSULTANTThree(userID,userTYPE,this.chartStyle);
          }
           if(this.chartView == 4 && this.chartModule == 'CONSULTANT'){
            const responseCon4 = await services07Module0.getMainChartSettingCONSULTANTFour(userID,userTYPE,this.chartStyle);
             
           if(this.chartType == 'Single-Value'){
               this.singleValueOne = `
                                      <div class="box_container">
                                        <div class="single_box bgclr1">
                                        <span>`+responseCon4.single_registration_utc+`</span>
                                        <label class="title">UTC</label>
                                        </div>
                                        <div class="single_box bgclr2" >
                                        <span>`+responseCon4.single_registration_prc+`</span>
                                        <label class="title">PRC</label>
                                        </div>
                                        <div class="single_box bgclr3" >
                                        <span>`+responseCon4.dual_registration_same+`</span>
                                        <label class="title">Dual (Same principal)</label>
                                        </div>
                                        <div class="single_box bgclr4" >
                                        <span>`+responseCon4.dual_registration_diff+`</span>
                                        <label class="title">Dual (Diff principal)</label>
                                        </div>
                                      </div>
                            `;
                this.singleValueTwo = `
                                      <div class="box_container">
                                        <div class="single_box bgclr1">
                                        <span>`+responseCon4.single_registration_utc+`</span>
                                        <label class="title">UTC</label>
                                        </div>
                                        <div class="single_box bgclr2" >
                                        <span>`+responseCon4.single_registration_prc+`</span>
                                        <label class="title">PRC</label>
                                        </div>
                                        <div class="single_box bgclr3" >
                                        <span>`+responseCon4.dual_registration_same+`</span>
                                        <label class="title">Dual (Same principal)</label>
                                        </div>
                                        <div class="single_box bgclr4" >
                                        <span>`+responseCon4.dual_registration_diff+`</span>
                                        <label class="title">Dual (Diff principal)</label>
                                        </div>
                                      </div>
                            `;
                  this.singleValueThree =`
                                    <div class="box_container">
                                        <div class="single_box bgclr1">
                                        <span>`+responseCon4.single_registration_utc+`</span>
                                        <label class="title">UTC</label>
                                        </div>
                                        <div class="single_box bgclr2" >
                                        <span>`+responseCon4.single_registration_prc+`</span>
                                        <label class="title">PRC</label>
                                        </div>
                                        <div class="single_box bgclr3" >
                                        <span>`+responseCon4.dual_registration_same+`</span>
                                        <label class="title">Dual (Same principal)</label>
                                        </div>
                                        <div class="single_box bgclr4" >
                                        <span>`+responseCon4.dual_registration_diff+`</span>
                                        <label class="title">Dual (Diff principal)</label>
                                        </div>
                                      </div>
                            `;
             this.singleValueFour = `
                                     <div class="box_container">
                                        <div class="single_box bgclr1">
                                        <span>`+responseCon4.single_registration_utc+`</span>
                                        <label class="title">UTC</label>
                                        </div>
                                        <div class="single_box bgclr2" >
                                        <span>`+responseCon4.single_registration_prc+`</span>
                                        <label class="title">PRC</label>
                                        </div>
                                        <div class="single_box bgclr3" >
                                        <span>`+responseCon4.dual_registration_same+`</span>
                                        <label class="title">Dual (Same principal)</label>
                                        </div>
                                        <div class="single_box bgclr4" >
                                        <span>`+responseCon4.dual_registration_diff+`</span>
                                        <label class="title">Dual (Diff principal)</label>
                                        </div>
                                      </div>
                            `;
              this.singleValueFive = `
                                     <div class="box_container">
                                        <div class="single_box bgclr1">
                                        <span>`+responseCon4.single_registration_utc+`</span>
                                        <label class="title">UTC</label>
                                        </div>
                                        <div class="single_box bgclr2" >
                                        <span>`+responseCon4.single_registration_prc+`</span>
                                        <label class="title">PRC</label>
                                        </div>
                                        <div class="single_box bgclr3" >
                                        <span>`+responseCon4.dual_registration_same+`</span>
                                        <label class="title">Dual (Same principal)</label>
                                        </div>
                                        <div class="single_box bgclr4" >
                                        <span>`+responseCon4.dual_registration_diff+`</span>
                                        <label class="title">Dual (Diff principal)</label>
                                        </div>
                                      </div>
                            `;
               this.singleValueSix = `
                                    <div class="box_container">
                                        <div class="single_box bgclr1">
                                        <span>`+responseCon4.single_registration_utc+`</span>
                                        <label class="title">UTC</label>
                                        </div>
                                        <div class="single_box bgclr2" >
                                        <span>`+responseCon4.single_registration_prc+`</span>
                                        <label class="title">PRC</label>
                                        </div>
                                        <div class="single_box bgclr3" >
                                        <span>`+responseCon4.dual_registration_same+`</span>
                                        <label class="title">Dual (Same principal)</label>
                                        </div>
                                        <div class="single_box bgclr4" >
                                        <span>`+responseCon4.dual_registration_diff+`</span>
                                        <label class="title">Dual (Diff principal)</label>
                                        </div>
                                      </div>
                            `;
           }
          }
           if(this.chartView == 5 && this.chartModule == 'CONSULTANT'){
            const responseCon5 = await services07Module0.getMainChartSettingCONSULTANTFive(userID,userTYPE,this.chartStyle);
           if(this.chartType == 'Single-Value'){
               this.singleValueOne = `
                                      <div class="box_container">
                                        <div class="single_box bgclr1">
                                        <span>`+responseCon5.active_data+`</span>
                                        <label class="title">Active</label>
                                        </div>
                                        <div class="single_box bgclr2" >
                                        <span>`+responseCon5.termination_data+`</span>
                                        <label class="title">Termination</label>
                                        </div>
                                        <div class="single_box bgclr3" >
                                        <span>`+responseCon5.resignation_data+`</span>
                                        <label class="title">Resignation</label>
                                        </div>
                                        <div class="single_box bgclr4" >
                                        <span>`+responseCon5.revocation_data+`</span>
                                        <label class="title">Revocation</label>
                                        </div>
                                      </div>
                            `;
                this.singleValueTwo = `
                                       <div class="box_container">
                                        <div class="single_box bgclr1">
                                        <span>`+responseCon5.active_data+`</span>
                                        <label class="title">Active</label>
                                        </div>
                                        <div class="single_box bgclr2" >
                                        <span>`+responseCon5.termination_data+`</span>
                                        <label class="title">Termination</label>
                                        </div>
                                        <div class="single_box bgclr3" >
                                        <span>`+responseCon5.resignation_data+`</span>
                                        <label class="title">Resignation</label>
                                        </div>
                                        <div class="single_box bgclr4" >
                                        <span>`+responseCon5.revocation_data+`</span>
                                        <label class="title">Revocation</label>
                                        </div>
                                      </div>
                            `;
                  this.singleValueThree =`
                                     <div class="box_container">
                                        <div class="single_box bgclr1">
                                        <span>`+responseCon5.active_data+`</span>
                                        <label class="title">Active</label>
                                        </div>
                                        <div class="single_box bgclr2" >
                                        <span>`+responseCon5.termination_data+`</span>
                                        <label class="title">Termination</label>
                                        </div>
                                        <div class="single_box bgclr3" >
                                        <span>`+responseCon5.resignation_data+`</span>
                                        <label class="title">Resignation</label>
                                        </div>
                                        <div class="single_box bgclr4" >
                                        <span>`+responseCon5.revocation_data+`</span>
                                        <label class="title">Revocation</label>
                                        </div>
                                      </div>
                            `;
             this.singleValueFour = `
                                     <div class="box_container">
                                        <div class="single_box bgclr1">
                                        <span>`+responseCon5.active_data+`</span>
                                        <label class="title">Active</label>
                                        </div>
                                        <div class="single_box bgclr2" >
                                        <span>`+responseCon5.termination_data+`</span>
                                        <label class="title">Termination</label>
                                        </div>
                                        <div class="single_box bgclr3" >
                                        <span>`+responseCon5.resignation_data+`</span>
                                        <label class="title">Resignation</label>
                                        </div>
                                        <div class="single_box bgclr4" >
                                        <span>`+responseCon5.revocation_data+`</span>
                                        <label class="title">Revocation</label>
                                        </div>
                                      </div>
                            `;
              this.singleValueFive = `
                                      <div class="box_container">
                                        <div class="single_box bgclr1">
                                        <span>`+responseCon5.active_data+`</span>
                                        <label class="title">Active</label>
                                        </div>
                                        <div class="single_box bgclr2" >
                                        <span>`+responseCon5.termination_data+`</span>
                                        <label class="title">Termination</label>
                                        </div>
                                        <div class="single_box bgclr3" >
                                        <span>`+responseCon5.resignation_data+`</span>
                                        <label class="title">Resignation</label>
                                        </div>
                                        <div class="single_box bgclr4" >
                                        <span>`+responseCon5.revocation_data+`</span>
                                        <label class="title">Revocation</label>
                                        </div>
                                      </div>
                            `;
               this.singleValueSix = `
                                     <div class="box_container">
                                        <div class="single_box bgclr1">
                                        <span>`+responseCon5.active_data+`</span>
                                        <label class="title">Active</label>
                                        </div>
                                        <div class="single_box bgclr2" >
                                        <span>`+responseCon5.termination_data+`</span>
                                        <label class="title">Termination</label>
                                        </div>
                                        <div class="single_box bgclr3" >
                                        <span>`+responseCon5.resignation_data+`</span>
                                        <label class="title">Resignation</label>
                                        </div>
                                        <div class="single_box bgclr4" >
                                        <span>`+responseCon5.revocation_data+`</span>
                                        <label class="title">Revocation</label>
                                        </div>
                                      </div>
                            `;
           }
          }
          // FMS MODULE
           if(this.chartView == 1 && this.chartModule == 'FMS'){
            const responseFms1 = await services07Module0.getMainChartSettingFMSOne(userID,userTYPE,this.chartStyle);
            //this.ridone_data = responseFms1.dataone;
           // console.log("ridone_data=",this.ridone_data);

            let ds=[];
            let lbl=[];
            responseFms1.dataone.forEach(ndb => {
                lbl.push(ndb.year);
                ds.push(ndb.total);
            });

             let rfms1 = "";
            responseFms1.dataone.forEach(
              (elementFMS1, i1) => {
                rfms1 += ` <div class="single_box bgclr`+ i1 +`">
                  <span>`+ elementFMS1.total +`</span>
                  <label class="title">`+ elementFMS1.year +`</label>
                </div>`;
                  }
              );
             if(this.chartType == 'Single-Value'){
                  this.singleValueOne =`<div class="box_container">` + rfms1 + `</div>`;
                  this.singleValueTwo = `<div class="box_container">` + rfms1 + `</div>`;
                  this.singleValueThree = `<div class="box_container">` + rfms1 + `</div>`;
                  this.singleValueFour = `<div class="box_container">` + rfms1 + `</div>`;
                  this.singleValueFive = `<div class="box_container">` + rfms1 + `</div>`;
                  this.singleValueSix = `<div class="box_container">` + rfms1 + `</div>`;
           }


            if(this.chartType == 'PIE'){
            this.piechartOptions = {
            tooltips: {
            enabled: true,
            mode: 'single',
            },
              hover: {
              animationDuration: 0
              },

              showTooltips: true,
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
              }
              this.piechartData = {
                hoverBackgroundColor: "red",
                hoverBorderWidth: 10,
                labels: lbl, //this.piechartLabel,
                datasets: [{
                 // label: "Members",
                  backgroundColor:['#1E9600', '#99C802'],
                  data: ds,//this.piechartDataset
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
             // label: "Data Two",
              backgroundColor: [ 'rgb(255, 99, 132)','rgb(54, 162, 235)'],
              data: ds
              }]
              };
            }
            if(this.chartType == 'LINE'){
              this.linechartData = {
              hoverBackgroundColor: "red",
              hoverBorderWidth: 10,
              labels: lbl,
              datasets: [
              {
              //label: "Data One",
                backgroundColor: "#f87979",
                data: ds
              }
              ]
              };
            }
            if(this.chartType == 'BAR'){
              ds.push(0);
              this.barchartData = {
              hoverBackgroundColor: "red",
              hoverBorderWidth: 10,
              labels: lbl,
              datasets: [
              {
              //label: "Data One",
                backgroundColor: ["#0EDBB4", "#00D3FF"],
                data: ds
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
                //label: "Data One",
                backgroundColor: ["#0EDBB4", "#00D3FF", "#EC307C", "#6073D5"],
                borderColor: ['#2196f38c', '#f443368c', '#3f51b570', '#00968896'],
                borderWidth: 1,
                data: ds
              }
              ]
              };
            }
           }
          if(this.chartView == 2 && this.chartModule == 'FMS'){
            const responseFms2 = await services07Module0.getMainChartSettingFMSTwo(userID,userTYPE,this.chartStyle);
            this.category_data = responseFms2;
           let dstwo=[];
            let lbltwo=[];
            responseFms2.forEach(cat => {
                lbltwo.push(cat.GROUP_ASSET);
                dstwo.push(cat.total);
            });
            let rfms2 = "";
            responseFms2.forEach(
              (elementFMS2, i2) => {
                rfms2 += ` <div class="single_box bgclr`+ i2 +`">
                  <span>`+ elementFMS2.total +`</span>
                  <label class="title">`+ elementFMS2.GROUP_ASSET +`</label>
                </div>`;
                  }
              );
             if(this.chartType == 'Single-Value'){
                  this.singleValueOne =`<div class="box_container">` + rfms2 + `</div>`;
                  this.singleValueTwo = `<div class="box_container">` + rfms2 + `</div>`;
                  this.singleValueThree = `<div class="box_container">` + rfms2 + `</div>`;
                  this.singleValueFour = `<div class="box_container">` + rfms2 + `</div>`;
                  this.singleValueFive = `<div class="box_container">` + rfms2 + `</div>`;
                  this.singleValueSix = `<div class="box_container">` + rfms2 + `</div>`;
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
             // label: "Data Two",
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
          }
          if(this.chartView == 3 && this.chartModule == 'FMS'){
          const responseFms3 = await services07Module0.getMainChartSettingFMSThree(userID,userTYPE,this.chartStyle);
            let dstthree=[];
            let lblthree=[];
            let fund_name=[];
            responseFms3.forEach(fund => {
              if(fund.FUND_SYARIAH_COMP == 0)
              {
                fund_name ="Conventional";
              }
              if(fund.FUND_SYARIAH_COMP == 1)
              {
                fund_name ="Islamic";
              }
              lblthree.push(fund_name);
              dstthree.push(fund.total);
            });
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
             // label: "Data Two",
              backgroundColor: [ '#ebc334','rgb(54, 162, 235)',"#6073D5","#EC307C"],
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
          }
          if(this.chartView == 4 && this.chartModule == 'FMS'){
          const responseFms4 = await services07Module0.getMainChartSettingFMSFour(userID,userTYPE,this.chartStyle);
          let dsfour=[];
            let lblfour=[];
            lblfour = ['New Fund submission','Fund Update submission','Fund Closure submission','NAV update submission'];
            dsfour.push(responseFms4.fund_submission);
            dsfour.push(responseFms4.update_submission);
            dsfour.push(responseFms4.closure_submission);
            dsfour.push(responseFms4.nav_submission);
           
           if(this.chartType == 'Single-Value'){
            this.singleValueOne = `
                                      <div class="box_container">
                                        <div class="single_box bgclr1">
                                        <span>`+responseFms4.fund_submission+`</span>
                                        <label class="title">New Fund submission</label>
                                        </div>
                                        <div class="single_box bgclr2" >
                                        <span>`+responseFms4.update_submission+`</span>
                                        <label class="title">Fund Update submission</label>
                                        </div>
                                        <div class="single_box bgclr3" >
                                        <span>`+responseFms4.closure_submission+`</span>
                                        <label class="title">Fund Closure submission</label>
                                        </div>
                                        <div class="single_box bgclr4" >
                                        <span>`+responseFms4.nav_submission+`</span>
                                        <label class="title">NAV update submission</label>
                                        </div>
                                      </div>
                            `;
                this.singleValueTwo = `
                                       <div class="box_container">
                                        <div class="single_box bgclr1">
                                        <span>`+responseFms4.fund_submission+`</span>
                                        <label class="title">New Fund submission</label>
                                        </div>
                                        <div class="single_box bgclr2" >
                                        <span>`+responseFms4.update_submission+`</span>
                                        <label class="title">Fund Update submission</label>
                                        </div>
                                        <div class="single_box bgclr3" >
                                        <span>`+responseFms4.closure_submission+`</span>
                                        <label class="title">Fund Closure submission</label>
                                        </div>
                                        <div class="single_box bgclr4" >
                                        <span>`+responseFms4.nav_submission+`</span>
                                        <label class="title">NAV update submission</label>
                                        </div>
                                      </div>
                            `;
                  this.singleValueThree =`
                                      <div class="box_container">
                                        <div class="single_box bgclr1">
                                        <span>`+responseFms4.fund_submission+`</span>
                                        <label class="title">New Fund submission</label>
                                        </div>
                                        <div class="single_box bgclr2" >
                                        <span>`+responseFms4.update_submission+`</span>
                                        <label class="title">Fund Update submission</label>
                                        </div>
                                        <div class="single_box bgclr3" >
                                        <span>`+responseFms4.closure_submission+`</span>
                                        <label class="title">Fund Closure submission</label>
                                        </div>
                                        <div class="single_box bgclr4" >
                                        <span>`+responseFms4.nav_submission+`</span>
                                        <label class="title">NAV update submission</label>
                                        </div>
                                      </div>
                            `;
             this.singleValueFour = `
                                     <div class="box_container">
                                        <div class="single_box bgclr1">
                                        <span>`+responseFms4.fund_submission+`</span>
                                        <label class="title">New Fund submission</label>
                                        </div>
                                        <div class="single_box bgclr2" >
                                        <span>`+responseFms4.update_submission+`</span>
                                        <label class="title">Fund Update submission</label>
                                        </div>
                                        <div class="single_box bgclr3" >
                                        <span>`+responseFms4.closure_submission+`</span>
                                        <label class="title">Fund Closure submission</label>
                                        </div>
                                        <div class="single_box bgclr4" >
                                        <span>`+responseFms4.nav_submission+`</span>
                                        <label class="title">NAV update submission</label>
                                        </div>
                                      </div>
                            `;
              this.singleValueFive = `
                                       <div class="box_container">
                                        <div class="single_box bgclr1">
                                        <span>`+responseFms4.fund_submission+`</span>
                                        <label class="title">New Fund submission</label>
                                        </div>
                                        <div class="single_box bgclr2" >
                                        <span>`+responseFms4.update_submission+`</span>
                                        <label class="title">Fund Update submission</label>
                                        </div>
                                        <div class="single_box bgclr3" >
                                        <span>`+responseFms4.closure_submission+`</span>
                                        <label class="title">Fund Closure submission</label>
                                        </div>
                                        <div class="single_box bgclr4" >
                                        <span>`+responseFms4.nav_submission+`</span>
                                        <label class="title">NAV update submission</label>
                                        </div>
                                      </div>
                            `;
               this.singleValueSix = `
                                     <div class="box_container">
                                        <div class="single_box bgclr1">
                                        <span>`+responseFms4.fund_submission+`</span>
                                        <label class="title">New Fund submission</label>
                                        </div>
                                        <div class="single_box bgclr2" >
                                        <span>`+responseFms4.update_submission+`</span>
                                        <label class="title">Fund Update submission</label>
                                        </div>
                                        <div class="single_box bgclr3" >
                                        <span>`+responseFms4.closure_submission+`</span>
                                        <label class="title">Fund Closure submission</label>
                                        </div>
                                        <div class="single_box bgclr4" >
                                        <span>`+responseFms4.nav_submission+`</span>
                                        <label class="title">NAV update submission</label>
                                        </div>
                                      </div>
                            `;
           }
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
                //console.log("Nishi=");
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
              //label: "Data One",
                backgroundColor: "#f87979",
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
                backgroundColor:['#1E9600', '#99C802',"#6073D5","#EC307C","#146666","#21210e",'#000000','#7d6868','#4f1466'],
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
          }
        if(this.chartView == 5 && this.chartModule == 'FMS'){
          const responseFms5 = await services07Module0.getMainChartSettingFMSFive(userID,userTYPE,this.chartStyle);
           let dsfive=[];
            let lblfive=[];
            let dsfive1=[];
            let lblfive1=[];
            let dsfive2=[];
            let lblfive2=[];
              // response5.top_company_data.forEach(element => {
              //   console.log("response111=",element);
              //   lblfive.push(element.DIST_NAME);
              //   dsfive.push(element.total);
              // });
               var sortable = [];
            //  sortable = response5.top_company_data;
            //  console.log("response5dd=",sortable);
            //   sortable.sort(function(a, b) {
            //   console.log("Test");
            //     return b[1]- a[1];
            // });
           // console.log("response5sort=",sortable);
            Object.values(responseFms5.top_company_data).forEach(val => {
            
              console.log(val.total);
              lblfive.push(val.DIST_NAME);
              dsfive.push(val.total);
              //sortable.push(val.total,val.DIST_NAME);
            });
            // dsfive.sort(function(a, b) {
            //   console.log("Test");
            //  return b - a;
            // });
            console.log("response5sort=",sortable);


             // dsfive.sort();

                // dsfive.sort((f, s) => s - f);
                //  lblfive.sort((f, s) => s - f);
              // response5.waiver_data.forEach(elementwaiver => {
              // if(elementwaiver.DISTRIBUTOR_ID == 0){elementwaiver.DIST_NAME = "FIMM"}
              //   lblfive2.push(elementwaiver.DIST_NAME);
              //   dsfive2.push(elementwaiver.total2);
              // });
              // var uniqueLabel = [...new Set([...lblfive ,...lblfive1, ...lblfive2])];
             


            if(this.chartType == 'PIE'){
              this.piechartData = {
                hoverBackgroundColor: "red",
                hoverBorderWidth: 10,
                labels: lblfive, //this.piechartLabel,
                datasets: [{
                 // label: "Pre-Vetting",
                  backgroundColor: ["#0EDBB4", "#00D3FF", "#EC307C", "#6073D5","#f87979",'#1E9600'],
                  data: dsfive,//this.piechartDataset
                },
                ]
              };
            }
            if(this.chartType == 'DONUT'){
              this.donutchartData = {
              hoverBackgroundColor: "red",
              hoverBorderWidth: 10,
              labels: lblfive,
              datasets: [
              {
               // label: "Pre-Vetting",
                backgroundColor: ["#0EDBB4", "#00D3FF", "#EC307C", "#6073D5","#f87979",'#1E9600'],
                data: dsfive
              }
            ]
              };
            }
            if(this.chartType == 'LINE'){
              this.linechartData = {
              hoverBackgroundColor: "red",
              hoverBorderWidth: 10,
              labels: lblfive,
              datasets: [
              {
                //label: "Pre-vetting",
                backgroundColor: "#f87979",
                data: dsfive
              }
              ]
              };
            }
            if(this.chartType == 'BAR'){
              this.barchartData = {
              hoverBackgroundColor: "red",
              hoverBorderWidth: 10,
              labels: lblfive,
              datasets: [
              {
              label: "Pre-vetting",
                backgroundColor: ["#0EDBB4", "#00D3FF", "#EC307C", "#6073D5","#f87979",'#1E9600','#99C802'],
                data: dsfive
              }
              ]
              };
              this.barchartDataBottom = {
              hoverBackgroundColor: "red",
              hoverBorderWidth: 10,
              labels: lblfive,
              datasets: [
              {
              label: "Pre-vetting",
                backgroundColor: ["#0EDBB4", "#00D3FF", "#EC307C", "#6073D5","#f87979",'#1E9600','#99C802'],
                data: dsfive
              }
              ]
              };
            }
            if(this.chartType == 'POLARAREA'){
              this.areachartData = {
              hoverBackgroundColor: "red",
              hoverBorderWidth: 10,
              labels: lblfive,
              datasets: [
              {
                label: "Pre-Vetting",
                 backgroundColor: ["#0EDBB4", "#00D3FF", "#EC307C", "#6073D5","#f87979",'#1E9600','#99C802'],
                borderWidth: 1,
                data: dsfive
              }
              ]
              };
            }
           }
        if(this.chartView == 6 && this.chartModule == 'FMS'){
          const responseFms6 = await services07Module0.getMainChartSettingFMSSix(userID,userTYPE,this.chartStyle);
           let dssix=[];
            let lblsix=[];
              // response6.prevetting_top_data.forEach(element => {
              // lblfive.push(element.COMPANY_ID);
              // dsfive.push(element.total);
          //     // });
          //  lblsix = ['PREVETTING','WRITING','READING','TEACHING','QUALIFICATION','FP'];
          //  dssix.push(response6.prevetting_pending_data);
          //  dssix.push(response6.writing_pending_data);
          //  dssix.push(response6.reading_pending_data);
          //  dssix.push(response6.teaching_pending_data);
          //  dssix.push(response6.quali_pending_data);
          //  dssix.push(response6.fp_pending_data); //= [response.distributor_data, response.training_provider];
          // console.log("piechartDataset =",dstwo);
            if(this.chartType == 'PIE'){
              this.piechartData = {
                hoverBackgroundColor: "red",
                hoverBorderWidth: 10,
                labels: lblsix, //this.piechartLabel,
                datasets: [{
                  label: "Data One",
                  backgroundColor:['#1E9600', '#99C802',"#6073D5","#EC307C",'#4287f5', '#6b91db'],
                  data: dssix,//this.piechartDataset
                }]
              };
            }
            if(this.chartType == 'DONUT'){
              this.donutchartData = {
              hoverBackgroundColor: "red",
              hoverBorderWidth: 10,
              labels: lblsix,
              datasets: [
              {
              label: "Data Two",
              backgroundColor: [ 'rgb(255, 99, 132)','rgb(54, 162, 235)',"#6073D5","#EC307C",'#4287f5', '#6b91db'],
              data: dssix
              }]
              };
            }
            if(this.chartType == 'LINE'){
              this.linechartData = {
              hoverBackgroundColor: "red",
              hoverBorderWidth: 10,
              labels: lblsix,
              datasets: [
              {
              //label: "Data One",
                backgroundColor: "#f87979",
                data: dssix
              }
              ]
              };
            }
            if(this.chartType == 'BAR'){
              this.barchartData = {
              hoverBackgroundColor: "red",
              hoverBorderWidth: 10,
              labels: ["RHB GLOBAL SHARIAH EQUITY", "PRINCIPAL ASIA PACIFIC DYNAMIC GROWTH FUND", "PRINCIPAL CHINA DIRECT OPPORTUNITIES FUND", "AFFIN HWANG WORLD SERIES"],
              datasets: [
              {
              label: "Pre-vetting",
                backgroundColor: ["#0EDBB4", "#00D3FF", "#EC307C", "#6073D5","#f87979",'#1E9600','#99C802'],
                data:[2,4,7,20,12]
              }
              ]
              };
            }
            if(this.chartType == 'POLARAREA'){
              this.areachartData = {
              hoverBackgroundColor: "red",
              hoverBorderWidth: 10,
              labels: lblsix,
              datasets: [
              {
                //label: "Data One",
                backgroundColor: ["#0EDBB4", "#00D3FF", "#EC307C", "#6073D5",'#112e29', '#4287f5'],
                borderColor: ['#2196f38c', '#f443368c', '#3f51b570', '#00968896'],
                borderWidth: 1,
                data: dssix
              }
              ]
              };
            }
          }
        if(this.chartView == 7 && this.chartModule == 'FMS'){
        const responseFms7 = await services07Module0.getMainChartSettingFMSSeven(userID,userTYPE,this.chartStyle);
                 let rfms7 = "";
            responseFms7.lodgement_data.forEach(
              (elementFMS7, i7) => {
                rfms7 += ` <div class="single_box bgclr`+ i7 +`">
                  <span>`+ elementFMS7.total +`</span>
                  <label class="title">`+ elementFMS7.TS_PARAM +`</label>
                </div>
                 <div class="header-title_single">FUND LODGEMENT STATUS</div>
                `;
                  }
              );
                let rfms71 = "";
            responseFms7.dislodgement_data.forEach(
              (elementFMS71, i71) => {
                rfms71 += ` <div class="single_box bgclr`+ i71 +`">
                  <span>`+ elementFMS71.total +`</span>
                  <label class="title">`+ elementFMS71.TS_PARAM +`</label>
                </div>
                 <div class="header-title_single1">FUND DISLODGEMENT STATUS</div>
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
                let lbl=[];
                let ds1=[];
                lbl = ['New / Pending','Rejected','Approved'];
                ds.push(responseFms7.lodgement_data);
                ds1.push(responseFms7.dislodgement_data); //= [response.distributor_data, response.training_provider];
                if(this.chartType == 'PIE'){
                  this.piechartOptions = {
                    tooltips: {
                    enabled: true,
                    mode: 'single',
                  },
                  hover: {
                  animationDuration: 0
                  },

                  showTooltips: true,
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
                  }
                  this.piechartData = {
                    hoverBackgroundColor: "red",
                    hoverBorderWidth: 10,
                    labels: lbl, //this.piechartLabel,
                    datasets: [
                      {
                     // label: "Members",
                      backgroundColor:['#1E9600', '#99C802','rgb(54, 162, 235)'],
                      data: ds,//this.piechartDataset
                    },
                     {
                     // label: "Members",
                      backgroundColor:['#1E9600', '#99C802','rgb(54, 162, 235)'],
                      data: ds1,//this.piechartDataset
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
                 // label: "Data Two",
                  backgroundColor: [ 'rgb(255, 99, 132)','rgb(54, 162, 235)', '#99C802'],
                  data: ds
                  },
                    {
                 // label: "Data Two",
                  backgroundColor: [ 'rgb(255, 99, 132)','rgb(54, 162, 235)', '#99C802'],
                  data: ds1
                  }]
                  };
                }
                if(this.chartType == 'LINE'){
                  this.linechartData = {
                  hoverBackgroundColor: "red",
                  hoverBorderWidth: 10,
                  labels: lbl,
                  datasets: [
                  {
                  //label: "Data One",
                    backgroundColor: "#f87979",
                    data: ds
                  },
                   {
                  //label: "Data One",
                    backgroundColor: "#00D3FF",
                    data: ds1
                  }
                  ]
                  };
                }
                if(this.chartType == 'BAR'){
                  ds.push(0);
                  this.barchartData = {
                  hoverBackgroundColor: "red",
                  hoverBorderWidth: 10,
                  labels: lbl,
                  datasets: [
                  {
                  //label: "Data One",
                    backgroundColor: ["#0EDBB4", "#00D3FF",'rgb(54, 162, 235)'],
                    data: ds
                  },
                   {
                  //label: "Data One",
                    backgroundColor: ["#0EDBB4", "#00D3FF",'rgb(54, 162, 235)'],
                    data: ds1
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
                    //label: "Data One",
                    backgroundColor: ["#0EDBB4", "#00D3FF", "#EC307C", "#6073D5"],
                    borderColor: ['#2196f38c', '#f443368c', '#3f51b570', '#00968896'],
                    borderWidth: 1,
                    data: ds
                  },
                  {
                    //label: "Data One",
                    backgroundColor: ["#0EDBB4", "#00D3FF", "#EC307C", "#6073D5"],
                    borderColor: ['#2196f38c', '#f443368c', '#3f51b570', '#00968896'],
                    borderWidth: 1,
                    data: ds1
                  }
                  ]
                  };
                }
        }
        if(this.chartView == 8 && this.chartModule == 'FMS'){
           const responseFms8 = await services07Module0.getMainChartSettingFMSEight(userID,userTYPE,this.chartStyle);
        }
        if(this.chartView == 9 && this.chartModule == 'FMS'){
           const responseFms9 = await services07Module0.getMainChartSettingFMSNine(userID,userTYPE,this.chartStyle);
            let dsrdtype=[];
                let lblrdtype=[];

                Object.values(responseFms9.lodgementtype_data).forEach(val => {
                lblrdtype.push(val.DIST_TYPE_NAME);
                dsrdtype.push(val.total);
                //sortable.push(val.total,val.DIST_NAME);
                });
                if(this.chartType == 'PIE'){
                  this.piechartOptions = {
                    tooltips: {
                    enabled: true,
                    mode: 'single',
                  },
                  hover: {
                  animationDuration: 0
                  },

                  showTooltips: true,
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
                  }
                  this.piechartData = {
                    hoverBackgroundColor: "red",
                    hoverBorderWidth: 10,
                    labels: lblrdtype, //this.piechartLabel,
                    datasets: [
                      {
                     // label: "Members",
                      backgroundColor:["#0EDBB4", "#00D3FF", "#EC307C", "#6073D5","#f87979",'#1E9600','#99C802','rgb(255, 205, 86)','#03fc45','#090a09'],
                      data: dsrdtype,//this.piechartDataset
                    }
                    ]
                  };
                }
                if(this.chartType == 'DONUT'){
                  this.donutchartData = {
                  hoverBackgroundColor: "red",
                  hoverBorderWidth: 10,
                  labels: lblrdtype,
                  datasets: [
                  {
                 // label: "Data Two",
                  backgroundColor: ["#0EDBB4", "#00D3FF", "#EC307C", "#6073D5","#f87979",'#1E9600','#99C802','rgb(255, 205, 86)','#03fc45','#090a09'],
                  data: dsrdtype
                  }]
                  };
                }
                if(this.chartType == 'LINE'){
                  this.linechartData = {
                  hoverBackgroundColor: "red",
                  hoverBorderWidth: 10,
                  labels: lblrdtype,
                  datasets: [
                  {
                  //label: "Data One",
                    backgroundColor: "#f87979",
                    data: dsrdtype
                  }
                  ]
                  };
                }
                if(this.chartType == 'BAR'){
                  //ds.push(0);
                  this.barchartData = {
                  hoverBackgroundColor: "red",
                  hoverBorderWidth: 10,
                  labels: lblrdtype,
                  datasets: [
                  {
                  //label: "Data One",
                    backgroundColor: ["#ebc334", "#00D3FF", "#EC307C", "#6073D5","#f87979",'#1E9600','#99C802','rgb(255, 205, 86)','#03fc45','#090a09'],
                    data: dsrdtype
                  }
                  ]
                  };
                }
                if(this.chartType == 'POLARAREA'){
                  this.areachartData = {
                  hoverBackgroundColor: "red",
                  hoverBorderWidth: 10,
                  labels: lblrdtype,
                  datasets: [
                  {
                    //label: "Data One",
                    backgroundColor: ["#0EDBB4", "#00D3FF", "#EC307C", "#6073D5","#f87979",'#1E9600','#99C802','rgb(255, 205, 86)','#03fc45','#090a09'],
                   // borderColor: ['#2196f38c', '#f443368c', '#3f51b570', '#00968896'],
                    borderWidth: 1,
                    data: dsrdtype
                  }
                  ]
                  };
                }
        }
        if(this.chartView == 1 && this.chartModule == 'FINANCE'){
           const responseFinance1 = await services07Module0.getMainChartSettingFINANCEOne(userID,userTYPE,this.chartStyle);
            let ds=[];
            let lbl=[];
            lbl = ['Topup Approved',' Topup Pending Approval'];
            ds.push(responseFinance1.approve_data);
            ds.push(responseFinance1.pending_data); //= [response.distributor_data, response.training_provider];

            if(this.chartType == 'PIE'){
              this.piechartData = {
                hoverBackgroundColor: "red",
                hoverBorderWidth: 10,
                labels: lbl, //this.piechartLabel,
                datasets: [
                  {
                  label:"",
                  backgroundColor:['#1E9600', '#99C802',"#6073D5","#EC307C","#146666","#21210e",'#000000','#7d6868','#4f1466'],
                  data: ds,//this.piechartDataset
                }
                ]
              };
            }
            if(this.chartType == 'DONUT'){
              this.donutchartData = {
              hoverBackgroundColor: "red",
              hoverBorderWidth: 10,
               labels: lbl, //this.piechartLabel,
                datasets: [
                  {
                  label:"",
                  backgroundColor:['#1E9600', '#99C802',"#6073D5","#EC307C","#146666","#21210e",'#000000','#7d6868','#4f1466'],
                  data: ds,//this.piechartDataset
                }
                ]
              };
            }
        }
         if(this.chartView == 2 && this.chartModule == 'FINANCE'){
           const responseFinance2 = await services07Module0.getMainChartSettingFINANCETwo(userID,userTYPE,this.chartStyle);
            //this.topDistributor = responseFinance2;
            console.log("responseFinance2=",responseFinance2);
            if(this.chartType == 'TABLE'){
               let tabval1 = "";
            responseFinance2.forEach(
              (elementFinance2, i8) => {
                i8 =i8+1;
                    tabval1 += `<tr class="text_center">
                    <td>`+ i8 +`.</td>
                    <td class="text_left">`+ elementFinance2.DIST_NAME +`</td>
                    <td class="text_right">`+ elementFinance2.OTHERS_AMOUNT +`</td>
                    </tr>`;
                  }
              );

            this.tableValueOne = `<table class="table table-totaluser">
                        <tr class="table_header ">
                        <th colspan="4" >Distributor Prepaid Balance (top 25 company)</th>
                        </tr>
                        <tr class="text_center table_header_title">
                        <td>NO.</td>
                        <td class="text_left">NAME</td>
                        <td class="text_right">BALANCE ( RM )</td>
                        </tr>
                        ` + tabval1 + `
                        </table>
                        `;
           this.tableValueTwo = `<table class="table table-totaluser">
                        <tr class="table_header ">
                        <th colspan="4" >Distributor Prepaid Balance (top 25 company)</th>
                        </tr>
                        <tr class="text_center table_header_title">
                        <td>NO.</td>
                        <td class="text_left">NAME</td>
                        <td class="text_right">BALANCE ( RM )</td>
                        </tr>
                        ` + tabval1 + `
                        </table>
                        `;
          this.tableValueThree = `<table class="table table-totaluser">
                        <tr class="table_header ">
                        <th colspan="4" >Distributor Prepaid Balance (top 25 company)</th>
                        </tr>
                        <tr class="text_center table_header_title">
                        <td>NO.</td>
                        <td class="text_left">NAME</td>
                        <td class="text_right">BALANCE ( RM )</td>
                        </tr>
                        ` + tabval1 + `
                        </table>
                        `;
           this.tableValueFour = `<table class="table table-totaluser">
                        <tr class="table_header ">
                        <th colspan="4" >Distributor Prepaid Balance (top 25 company)</th>
                        </tr>
                        <tr class="text_center table_header_title">
                        <td>NO.</td>
                        <td class="text_left">NAME</td>
                        <td class="text_right">BALANCE ( RM )</td>
                        </tr>
                        ` + tabval1 + `
                        </table>
                        `;
          this.tableValueFive = `<table class="table table-totaluser">
                        <tr class="table_header ">
                        <th colspan="4" >Distributor Prepaid Balance (top 25 company)</th>
                        </tr>
                        <tr class="text_center table_header_title">
                        <td>NO.</td>
                        <td class="text_left">NAME</td>
                        <td class="text_right">BALANCE ( RM )</td>
                        </tr>
                        ` + tabval1 + `
                        </table>
                        `;
          this.tableValueSix = `<table class="table table-totaluser">
                        <tr class="table_header ">
                        <th colspan="4" >Distributor Prepaid Balance (top 25 company)</th>
                        </tr>
                        <tr class="text_center table_header_title">
                        <td>NO.</td>
                        <td class="text_left">NAME</td>
                        <td class="text_right">BALANCE ( RM )</td>
                        </tr>
                        ` + tabval1 + `
                        </table>
                        `;
            }       

         }
    },
  },
 }
 </script>
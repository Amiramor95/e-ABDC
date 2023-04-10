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
                            <br>
                              <bar-chart  :data="barchartDataBottom" :options="barchartBottomOptions" class="chart_style"></bar-chart>
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
  name: 'cpd-chart',
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
      pending_data: 0,
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
            label: "Data One",
            backgroundColor: ["#0EDBB4", "#00D3FF", "#EC307C", "#6073D5"],
            data: [1, 10, 5,20]
          }
        ]
      },
       barchartBottomOptions: {
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
        //mode: 'percentage',
        render: ('value'),
        precision: 1,
        fontColor: '#fff',
        },
      },
      donutchartData: {  hoverBackgroundColor: "red",
        hoverBorderWidth: 10,
        labels:['Post-Vetting','Pre-Vetting','5 Module'],
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
            const response = await servicesModule0.getCpdChartSetting(userID,userTYPE,this.chartStyle);
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
          if(this.chartView == 2){
            const response2 = await servicesModule0.getCpdChartSettingtwo(userID,userTYPE,this.chartStyle);
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
          if(this.chartView == 3){
            const response3 = await servicesModule0.getCpdChartSettingthree(userID,userTYPE,this.chartStyle);
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
          if(this.chartView == 4){
            // Confused not done
            const response4 = await servicesModule0.getCpdChartSettingfour(userID,userTYPE,this.chartStyle);
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
          if(this.chartView == 5){
            const response5 = await servicesModule0.getCpdChartSettingfive(userID,userTYPE,this.chartStyle);
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
              this. barchartBottomOptions = {
              responsive: true,
              legend: {
              display: false,
              position: 'right',
              },
              title: {
              display: true,
              text: "BOTTOM 10 SUBMISSION BY COMPANY",
              position: 'bottom',
              }
              };
              this.barchartDataBottom = {
              hoverBackgroundColor: "red",
              hoverBorderWidth: 10,
              labels: lblfive1,
              datasets: [
              {
              label: "Pre-vetting",
                backgroundColor: ["#0EDBB4", "#00D3FF", "#EC307C", "#6073D5","#f87979",'#1E9600','#99C802','rgb(255, 205, 86)','#03fc45','#090a09'],
                data: dsfive1
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
          if(this.chartView == 6){
            const response6 = await servicesModule0.getCpdChartSettingSix(userID,userTYPE,this.chartStyle);
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
           // this.ctx = document.getElementById("pie-chart").getContext('2d');
            // console.log("ctx=",ctx);
       // this.chartlist = response;
         }
          if(this.chartView == 7){
            // Not Done
            const response7 = await servicesModule0.getCpdChartSettingSeven(userID,userTYPE,this.chartStyle);
            let dsseven=[];
            let lblseven=[];
              // response6.prevetting_top_data.forEach(element => {
              // lblfive.push(element.COMPANY_ID);
              // dsfive.push(element.total);
              // });
           lblseven = ['PREVETTING','WRITING','READING','TEACHING','QUALIFICATION','FP'];
           dsseven.push(response7.prevetting_pending_data);
           dsseven.push(response7.writing_pending_data);
           dsseven.push(response7.reading_pending_data);
           dsseven.push(response7.teaching_pending_data);
           dsseven.push(response7.quali_pending_data);
           dsseven.push(response7.fp_pending_data); //= [response.distributor_data, response.training_provider];
          // console.log("piechartDataset =",dstwo);
            if(this.chartType == 'PIE'){
              this.piechartData = {
                hoverBackgroundColor: "red",
                hoverBorderWidth: 10,
                labels: lblseven, //this.piechartLabel,
                datasets: [{
                  label: "Data One",
                  backgroundColor:['#1E9600', '#99C802',"#6073D5","#EC307C",'#2196f38c', '#f443368c'],
                  data: dsseven,//this.piechartDataset
                }]
              };
            }
            if(this.chartType == 'DONUT'){
              this.donutchartData = {
              hoverBackgroundColor: "red",
              hoverBorderWidth: 10,
              labels: lblseven,
              datasets: [
              {
              label: "Data Two",
              backgroundColor: [ 'rgb(255, 99, 132)','rgb(54, 162, 235)',"#6073D5","#EC307C",'#2196f38c', '#f443368c'],
              data: dsseven
              }]
              };
            }
            if(this.chartType == 'LINE'){
              this.linechartData = {
              hoverBackgroundColor: "red",
              hoverBorderWidth: 10,
              labels: lblseven,
              datasets: [
              {
              //label: "Data One",
                backgroundColor: "#f87979",
                data: dsseven
              }
              ]
              };
            }
            if(this.chartType == 'BAR'){
              dsseven.push(0);
              this.barchartData = {
              hoverBackgroundColor: "red",
              hoverBorderWidth: 10,
              labels: lblseven,
              datasets: [
              {
              //label: "Data One",
                backgroundColor: ["#0EDBB4", "#00D3FF", "#EC307C", "#6073D5",'#2196f38c', '#f443368c'],
                data: dsseven
              }
              ]
              };
            }
            if(this.chartType == 'POLARAREA'){
              this.areachartData = {
              hoverBackgroundColor: "red",
              hoverBorderWidth: 10,
              labels: lblseven,
              datasets: [
              {
                //label: "Data One",
                backgroundColor: ["#0EDBB4", "#00D3FF", "#EC307C", "#6073D5",'#2196f38c', '#f443368c'],
                borderColor: ['#2196f38c', '#f443368c', '#3f51b570', '#00968896'],
                borderWidth: 1,
                data: dsseven
              }
              ]
              };
            }
         }
           if(this.chartView == 8){
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
          if(this.chartView == 9){
            const response9 = await servicesModule0.getCpdChartSettingNine(userID,userTYPE,this.chartStyle);
          }
    },
  },
 
 }
 </script>
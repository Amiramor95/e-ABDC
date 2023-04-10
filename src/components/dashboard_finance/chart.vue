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
 import * as services06Module1 from "../../app/module0/services06";
 import * as servicesModule0 from "../../app/module0/services02"
 export default {
  name: 'finance-chart',
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
      topDistributor: [],
      financeResult: [],
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
            display: false,
            position: 'right',
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
            const response = await services06Module1.getFinanceChartSettingOne(userID,userTYPE,this.chartStyle);
            let ds=[];
            let lbl=[];
            lbl = ['Topup Approved',' Topup Pending Approval'];
            ds.push(response.approve_data);
            ds.push(response.pending_data); //= [response.distributor_data, response.training_provider];

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
        if(this.chartView == 2){
          const response2 = await services06Module1.getFinanceChartSettingTwo(userID,userTYPE,this.chartStyle);
          console.log("response2 =",response2);
         if(this.chartType == 'TABLE'){
            let tabval1 = "";
            response2.forEach(
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
        if(this.chartView == 3){
          // const response3 = await servicesModule0.getCasChartSettingthree(userID,userTYPE,this.chartStyle);
        }
        if(this.chartView == 4){
         // const response4 = await servicesModule0.getCasChartSettingfour(userID,userTYPE,this.chartStyle);
        }
        if(this.chartView == 7){
           const response7 = await services06Module1.getFinanceChartSettingSeven(userID,userTYPE,this.chartStyle);
           // this.financeResult = response7;
            if(this.chartType == 'TABLE'){
             let tabval2 = "";
            response7.forEach(
              (elementFinance3, i8) => {
                i8 =i8+1;
                    tabval2 += `<tr class="text_center">
                    <td>`+ i8 +`.</td>
                    <td class="text_left">`+ elementFinance3.CONSULTANT_NAME +`</td>
                     <td class="text_left">`+ elementFinance3.EXAM_TYPE_NAME +`</td>
                    <td class="text_right">`+ elementFinance3.FEE_AMOUNT +`</td>
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
                        <td class="text_left">EXAM TYPE</td>
                        <td class="text_right">FEES ( RM )</td>
                        </tr>
                        ` + tabval2 + `
                        </table>
                        `;
           this.tableValueTwo = `<table class="table table-totaluser">
                        <tr class="table_header ">
                        <th colspan="4" >Distributor Prepaid Balance (top 25 company)</th>
                        </tr>
                        <tr class="text_center table_header_title">
                        <td>NO.</td>
                        <td class="text_left">NAME</td>
                        <td class="text_left">EXAM TYPE</td>
                        <td class="text_right">FEES ( RM )</td>
                        </tr>
                        ` + tabval2 + `
                        </table>
                        `;
          this.tableValueThree = `<table class="table table-totaluser">
                        <tr class="table_header ">
                        <th colspan="4" >Distributor Prepaid Balance (top 25 company)</th>
                        </tr>
                        <tr class="text_center table_header_title">
                        <td>NO.</td>
                        <td class="text_left">NAME</td>
                        <td class="text_left">EXAM TYPE</td>
                        <td class="text_right">FEES ( RM )</td>
                        </tr>
                        ` + tabval2 + `
                        </table>
                        `;
           this.tableValueFour = `<table class="table table-totaluser">
                        <tr class="table_header ">
                        <th colspan="4" >Distributor Prepaid Balance (top 25 company)</th>
                        </tr>
                        <tr class="text_center table_header_title">
                        <td>NO.</td>
                        <td class="text_left">NAME</td>
                        <td class="text_left">EXAM TYPE</td>
                        <td class="text_right">FEES ( RM )</td>
                        </tr>
                        ` + tabval2 + `
                        </table>
                        `;
          this.tableValueFive = `<table class="table table-totaluser">
                        <tr class="table_header ">
                        <th colspan="4" >Distributor Prepaid Balance (top 25 company)</th>
                        </tr>
                        <tr class="text_center table_header_title">
                        <td>NO.</td>
                        <td class="text_left">NAME</td>
                        <td class="text_left">EXAM TYPE</td>
                        <td class="text_right">FEES ( RM )</td>
                        </tr>
                        ` + tabval2 + `
                        </table>
                        `;
          this.tableValueSix = `<table class="table table-totaluser">
                        <tr class="table_header ">
                        <th colspan="4" >Distributor Prepaid Balance (top 25 company)</th>
                        </tr>
                        <tr class="text_center table_header_title">
                        <td>NO.</td>
                        <td class="text_left">NAME</td>
                        <td class="text_left">EXAM TYPE</td>
                        <td class="text_right">FEES ( RM )</td>
                        </tr>
                        ` + tabval2 + `
                        </table>
                        `;
            }  
        }
    },
  },
 }
 </script>
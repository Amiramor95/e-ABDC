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
 import * as servicesModule0 from "../../app/module0/services02"
 export default {
  name: 'fms-chart',
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
        console.log("User11111=",this.userdata);
        const userID=this.userdata.user_id;
        const userTYPE=this.userdata.user_type;
         const userGROUP=this.userdata.USER_GROUP_ID;
         if(this.chartGroup == 2){
            // alert(this.chartView);
              if(this.chartView == 7 && this.chartGroup == 2){
                const responserd = await servicesModule0.getFmsRdChartSetting(userID,userTYPE,this.chartStyle);
                console.log("responsefirst=",responserd);
               // this.lodgement_data = responserd.lodgement_data;
               // this.dislodgement_data = responserd.dislodgement_data;

                let rfms7 = "";
            responserd.lodgement_data.forEach(
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
            responserd.dislodgement_data.forEach(
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
                ds.push(responserd.lodgement_data);
                ds1.push(responserd.dislodgement_data); //= [response.distributor_data, response.training_provider];
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
          if(this.chartView == 8 && this.chartGroup == 2){
          }
          if(this.chartView == 9 && this.chartGroup == 2){
                const responserdtype = await servicesModule0.getFmsRdChartSettingtwo(userID,userTYPE,this.chartStyle);
                console.log("response=",responserdtype);
               // this.lodgement_data = responserdtype.lodgement_data;
               // this.dislodgement_data = responserdtype.dislodgement_data;
                let dsrdtype=[];
                let lblrdtype=[];

                Object.values(responserdtype.lodgementtype_data).forEach(val => {
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
         }
        else{
        if(this.chartView == 1 && this.chartGroup == 1){
            const response = await servicesModule0.getFmsIdChartSetting(userID,userTYPE,this.chartStyle);
            this.ridone_data = response.dataone;
           let rfms1 = "";
            response.dataone.forEach(
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
            let ds=[];
            let lbl=[];
            response.dataone.forEach(ndb => {
                lbl.push(ndb.year);
                ds.push(ndb.total);
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
          if(this.chartView == 2 && this.chartGroup == 1){
            const response2 = await servicesModule0.getFmsIdChartSettingTwo(userID,userTYPE,this.chartStyle);
           //console.log("datacategory=",response2);
           this.category_data = response2;
            let rfms2 = "";
            response2.forEach(
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
           let dstwo=[];
            let lbltwo=[];
            response2.forEach(cat => {
                lbltwo.push(cat.GROUP_ASSET);
                dstwo.push(cat.total);
            });
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
          if(this.chartView == 3 && this.chartGroup == 1){
            const response3 = await servicesModule0.getFmsIdChartSettingThree(userID,userTYPE,this.chartStyle);
           console.log("Conventional=",response3);
          let dstthree=[];
          let lblthree=[];
          let fund_name=[];
            response3.forEach(fund => {
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
          if(this.chartView == 4 && this.chartGroup == 1){
            // Confused not done
            const response4 = await servicesModule0.getFmsIdChartSettingFour(userID,userTYPE,this.chartStyle);
            let dsfour=[];
            let lblfour=[];
            lblfour = ['New Fund submission','Fund Update submission','Fund Closure submission','NAV update submission'];
            dsfour.push(response4.fund_submission);
            dsfour.push(response4.update_submission);
            dsfour.push(response4.closure_submission);
            dsfour.push(response4.nav_submission);
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
                                        <span>`+response4.fund_submission+`</span>
                                        <label class="title">New Fund submission</label>
                                        </div>
                                        <div class="single_box bgclr2" >
                                        <span>`+response4.update_submission+`</span>
                                        <label class="title">Fund Update submission</label>
                                        </div>
                                        <div class="single_box bgclr3" >
                                        <span>`+response4.closure_submission+`</span>
                                        <label class="title">Fund Closure submission</label>
                                        </div>
                                        <div class="single_box bgclr4" >
                                        <span>`+response4.nav_submission+`</span>
                                        <label class="title">NAV update submission</label>
                                        </div>
                                      </div>
                            `;
                this.singleValueTwo = `
                                       <div class="box_container">
                                        <div class="single_box bgclr1">
                                        <span>`+response4.fund_submission+`</span>
                                        <label class="title">New Fund submission</label>
                                        </div>
                                        <div class="single_box bgclr2" >
                                        <span>`+response4.update_submission+`</span>
                                        <label class="title">Fund Update submission</label>
                                        </div>
                                        <div class="single_box bgclr3" >
                                        <span>`+response4.closure_submission+`</span>
                                        <label class="title">Fund Closure submission</label>
                                        </div>
                                        <div class="single_box bgclr4" >
                                        <span>`+response4.nav_submission+`</span>
                                        <label class="title">NAV update submission</label>
                                        </div>
                                      </div>
                            `;
                  this.singleValueThree =`
                                      <div class="box_container">
                                        <div class="single_box bgclr1">
                                        <span>`+response4.fund_submission+`</span>
                                        <label class="title">New Fund submission</label>
                                        </div>
                                        <div class="single_box bgclr2" >
                                        <span>`+response4.update_submission+`</span>
                                        <label class="title">Fund Update submission</label>
                                        </div>
                                        <div class="single_box bgclr3" >
                                        <span>`+response4.closure_submission+`</span>
                                        <label class="title">Fund Closure submission</label>
                                        </div>
                                        <div class="single_box bgclr4" >
                                        <span>`+response4.nav_submission+`</span>
                                        <label class="title">NAV update submission</label>
                                        </div>
                                      </div>
                            `;
             this.singleValueFour = `
                                     <div class="box_container">
                                        <div class="single_box bgclr1">
                                        <span>`+response4.fund_submission+`</span>
                                        <label class="title">New Fund submission</label>
                                        </div>
                                        <div class="single_box bgclr2" >
                                        <span>`+response4.update_submission+`</span>
                                        <label class="title">Fund Update submission</label>
                                        </div>
                                        <div class="single_box bgclr3" >
                                        <span>`+response4.closure_submission+`</span>
                                        <label class="title">Fund Closure submission</label>
                                        </div>
                                        <div class="single_box bgclr4" >
                                        <span>`+response4.nav_submission+`</span>
                                        <label class="title">NAV update submission</label>
                                        </div>
                                      </div>
                            `;
              this.singleValueFive = `
                                       <div class="box_container">
                                        <div class="single_box bgclr1">
                                        <span>`+response4.fund_submission+`</span>
                                        <label class="title">New Fund submission</label>
                                        </div>
                                        <div class="single_box bgclr2" >
                                        <span>`+response4.update_submission+`</span>
                                        <label class="title">Fund Update submission</label>
                                        </div>
                                        <div class="single_box bgclr3" >
                                        <span>`+response4.closure_submission+`</span>
                                        <label class="title">Fund Closure submission</label>
                                        </div>
                                        <div class="single_box bgclr4" >
                                        <span>`+response4.nav_submission+`</span>
                                        <label class="title">NAV update submission</label>
                                        </div>
                                      </div>
                            `;
               this.singleValueSix = `
                                     <div class="box_container">
                                        <div class="single_box bgclr1">
                                        <span>`+response4.fund_submission+`</span>
                                        <label class="title">New Fund submission</label>
                                        </div>
                                        <div class="single_box bgclr2" >
                                        <span>`+response4.update_submission+`</span>
                                        <label class="title">Fund Update submission</label>
                                        </div>
                                        <div class="single_box bgclr3" >
                                        <span>`+response4.closure_submission+`</span>
                                        <label class="title">Fund Closure submission</label>
                                        </div>
                                        <div class="single_box bgclr4" >
                                        <span>`+response4.nav_submission+`</span>
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
           // this.ctx = document.getElementById("pie-chart").getContext('2d');
            // console.log("ctx=",ctx);
       // this.chartlist = response;
         }
          if(this.chartView == 5 && this.chartGroup == 1){
            const response5 = await servicesModule0.getFmsIdChartSettingFive(userID,userTYPE,this.chartStyle);
             console.log("response5=",response5);
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
            console.log("response5sort=",sortable);
            Object.values(response5.top_company_data).forEach(val => {
            
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
          if(this.chartView == 6 && this.chartGroup == 1){
            const response6 = await servicesModule0.getFmsIdChartSettingSix(userID,userTYPE,this.chartStyle);
             console.log("response6=",response6);
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
     }
    },
  },
 
 }
 </script>
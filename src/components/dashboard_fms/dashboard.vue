<template>
  <div>
    <div class="dashboard">
        <!-- <card :array="cardArray"></card> -->
         <div class="row row-equal">
                <div v-for="(chart, id) in filteredDataCpd" :key="id" :class="chart.style">
                <chart :chartId="chart.id" :chartType="chart.type" :chartName= "chart.name" :chartView= "chart.graphid" :chartStyle= "chart.settingstyle" :chartGroup = "chart.chartgroup"></chart>
                </div>
         </div>
    </div>
    <footer><div class="footer-main" style="position: relative; top: 20px;">
      <p><span>&#169; 2021 </span>Federation Of Investment Managers Malaysia [199301017839 (272577-P)]</p>
    </div></footer>
  </div>
</template>

<script>
import card from '../card/card'
//import chart from '../chart/chart'
//import PieChart from "./PieChart.vue";
import chart from "./chart.vue";
import * as services06Module1 from "../../app/module1/services06";
import * as servicesModule0 from "../../app/module0/services02"

//import chart from '../components/chart/chart'
//import DashboardCharts from './DashboardCharts'
//import DashboardCharts2 from './DashboardCharts2'
//import DashboardCharts3 from './DashboardCharts3'
//import DashboardCharts4 from './DashboardCharts4'
//import DashboardCharts5 from './DashboardCharts5'
//import DashboardCharts6 from './DashboardCharts6'
//import DashboardInfoBlock from './DashboardInfoBlock'
// import DashboardTable from './DashboardTable'
//import DashboardTabs from './DashboardTabs'
//import DashboardMap from './DashboardMap'

export default {
  name: 'fms-dashboard',
    components: {
     card,
    chart, 
    //  DashboardCharts,
   //   DashboardCharts2,
   //   DashboardCharts3,
    //  DashboardCharts4,
    //  DashboardCharts5,
    //  DashboardCharts6,
    //  DashboardInfoBlock,
      // DashboardTable,
     // DashboardTabs,
     // DashboardMap,
  },
  mounted(){
    this.userdata = JSON.parse(localStorage.getItem("user"));
     
    this.getFmsSetting();
    //console.log("USERNISHI=",this.userdata);
  },
    computed: {
     filteredDataCpd() {
        return this.chartArray;
     }
  },
  data () {
    return {
      userdata: {},
      settinglist: [],
      cardArray: [
        {
          id: '1',
          type: 'text',
          style: 'flex xs12 md8 xl8',
          name: 'Announcement And Circular',
          description: 'This is Announcement section',
          icon: '',
          bgcolor: '#ffffff',
          color: "#00000",
        },
        {
          id: '2',
          type: 'progress',
          style: 'flex xs12 md4 xl4',
          name: 'Pending Task',
          description: 'This is Announcement section',
          icon: '',
          bgcolor: '#ffffff',
          value: '60',
          color: "#000000",
        },
      ],
     chartArray : [
        // {
        //   "id":"1",
        //   "type":"pie",
        //   "style":"flex xs12 md6 xl6",
        //   "name":"AUM by Types of Collective Investment Scheme 2018"
        // },
        // {
        //   "id":"2",
        //   "type":"donut",
        //   "style":"flex xs12 md6 xl6",
        //   "name":"AUM by Types of Collective Investment Scheme 2019"
        // },
        // {
        //   "id":"3",
        //   "type":"bar",
        //   "style":"flex xs12 md6 xl6",
        //   "name":"Total New Consultant"
        // },
        // {
        //   "id":"4",
        //   "type":"area",
        //   "style":"flex xs12 md6 xl6",
        //   "name":"Total Active Distributor"
        // },
        // {
        //   "id":"5",
        //   "type":"line",
        //   "style":"flex xs12 md6 xl6",
        //   "name":"Total Consultant Termination"
        // },
        // {
        //   "id":"6",
        //   "type":"radar",
        //   "style":"flex xs12 md6 xl6",
        //   "name":"Total Distributor Termination"
        // }
      ],
    }
  },
  methods: {
   getFmsSetting: async function() {
        let settingArray = [];
          const userID=this.userdata.user_id;
          const userTYPE=this.userdata.user_type;
          const userGROUP=this.userdata.USER_GROUP_ID;
          const userDepartment=this.userdata.MANAGE_DEPARTMENT_ID;
          const userDIVISION=this.userdata.MANAGE_DIVISION_ID;
        const response = await servicesModule0.getFmsSetting(userID,userTYPE,userGROUP,userDepartment,userDIVISION);
        console.log("Fms List=",response);
        this.settinglist = response;
         this.settinglist.forEach(element => {
          settingArray.push({
                id:element.SETTING_INDEX,
                type:element.CHART_NAME,
                graphid:element.GRAPH_ID,
                settingstyle:element.DISPLAY_SETTING_STYLE,
                style:"flex xs12 md6 xl6",
                name:element.DASHBOARD_DESCRIPTION,
                chartgroup:element.SETTING_USER_TYPE_GROUP,
          });
        });
        this.chartArray = settingArray;
       // console.log("Setting List=",response);
    },
  },
}
</script>
<style lang="scss">
.height {
  height: 50%;
}

.row-equal .flex {
  .va-card {
    height: 100%;
  }
}

.dashboard {
  .va-card {
    margin-bottom: 0 !important;
  }
}

.app-layout__main {
  background: #e8e8e8;
}
.footer-main {
  color: #b6b6b6 !important;
  position: absolute;
  padding: 0px;
  margin-left: 30%;
  justify-items: center;
  display: inline-block;
  -ms-flex-item-align: end;
  align-self: flex-end;
  font-weight: 800;
}
.chart_style{
    width: 450px;
    height: 450px;
    margin:0 auto
}
.card_title{
  color: #000000;
}
.box_container{
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
  margin-top: 30px;
}
.single_box{
   height: 100px;
  color: #ffffff;
  margin: 10px auto;
  width: 30%;
  border: 3px solid grey;
  padding: 10px;
  text-align: center;
  
}
.bgclr0{
  background-color: green;
}
.bgclr1{
  background-color: #ebc334;
}
.bgclr2{
  background-color: #940f0f;
}
.bgclr3{
  background-color: #0d0d0d;
}
.bgclr4{
  background-color: #0EDBB4;
}
.bgclr5{
   background-color: #00D3FF;
}
.bgclr6{
  background-color: #1655c9;
}
.bgclr7{
  background-color: #898f31;
}
.bgclr8{
  background-color: #7e10cc;
}
.single_box span{
  font-weight: bold;
   font-size: 20px;
  color: #ffffff;
}
.single_box .title{
  display: block;
  color: #ffffff;
  font-size: 13px;
 text-transform: capitalize;
}
.header-title{
  position: absolute;
  bottom: 26px;
  font-size: 13px;
  margin-left: 260px;
  font-weight: bold;
  color: #666060;

}

.clear{
  clear: both;
}
.header-title_single{
  position: absolute;
  clear: both;
  bottom: 295px;
  font-size: 13px;
  font-weight: bold;
  color: #4e524f;

}
.header-title_single1{
  position: absolute;
  clear: both;
  bottom: 105px;
  font-size: 13px;
  font-weight: bold;
  color: #4e524f;

}
.text_left{
  text-align: left;
}
.text_right{
  text-align: right;
}
.text_center{
  text-align: center;
}

</style>

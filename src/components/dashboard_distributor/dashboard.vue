<template>
  <div>
    <div class="dashboard">
      <!-- <card :array="cardArray"></card> -->
      <div class="row row-equal">
        <div v-for="(chart, id) in filteredDataDistributor" :key="id" :class="chart.style">
          <chart :chartId="chart.id" :chartType="chart.type" :chartName="chart.name" :chartView="chart.graphid"
            :chartStyle="chart.settingstyle"></chart>
        </div>
      </div>
    </div>
    <footer>
      <div class="footer-main" style="position: relative; top: 20px;">
        <p><span>&#169; 2021 </span>Federation Of Investment Managers Malaysia [199301017839 (272577-P)]</p>
      </div>
    </footer>
  </div>
</template>

<script>
import card from '../card/card'
//import chart from '../chart/chart'
//import PieChart from "./PieChart.vue";
import chart from "./chart.vue";
import * as services06Module1 from "../../app/module0/services06";
import * as servicesModule02 from "../../app/module0/services02";

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
  name: 'distributor-dashboard',
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
  mounted() {
    this.userdata = JSON.parse(localStorage.getItem("user"));
    this.getPMDashboardNotification();
    this.getDistributorSetting();

  },
  computed: {
    filteredDataDistributor() {
      return this.chartArray;
    }
  },
  data() {
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
      chartArray: [
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
    getPMDashboardNotification: async function () {
      const userTYPE = this.userdata.user_type;
      const menutitle = "DASHBOARD";
      if (userTYPE == 'fimm' || userTYPE == 'DISTRIBUTOR') {
        const responsepmnoti = await servicesModule02.getMaintanceNotification(userTYPE, menutitle);
        if (responsepmnoti.length != 0) {
          var html = responsepmnoti[0].NOTIFICATION_DESC;
          var div = document.createElement("div");
          div.innerHTML = html;
          var text = div.textContent || div.innerText || "";
          this.notifyTitleD = responsepmnoti[0].NOTIFICATION_TITLE;
          //  this.$router.push('/fimm/page-under-maintenance')
          // this.menuNotificationD = text;
          //this.showStaticModalPM = true;
        }
        else {

        }
      }
    },
    getDistributorSetting: async function () {
      let settingArray = [];
      const userID = this.userdata.user_id;
      const userTYPE = this.userdata.user_type;//"DISTRIBUTOR"
      const userGroup = this.userdata.USER_GROUP_ID;
      console.log("userTYPE=", userTYPE);
      // const userDepartment= 0;
      let userDepartment = this.userdata.MANAGE_DEPARTMENT_ID;
      let userDIVISION = this.userdata.MANAGE_DIVISION_ID;
      if (userTYPE == 'DISTRIBUTOR') {
        userDepartment = 0;
        userDIVISION = 0;
      }
      // else
      // {
      //    userDepartment=this.userdata.MANAGE_DEPARTMENT_ID;
      //    userDIVISION=this.userdata.MANAGE_DIVISION_ID;
      // }
      console.log("userGroup=", userGroup);
      console.log("userDepartment=", userDepartment);

      const response = await services06Module1.getDistributorSetting(userID, userTYPE, userGroup, userDepartment, userDIVISION);
      console.log("Setting List=", response);
      this.settinglist = response;
      this.settinglist.forEach(element => {
        settingArray.push({
          id: element.SETTING_INDEX,
          type: element.CHART_NAME,
          graphid: element.GRAPH_ID,
          settingstyle: element.DISPLAY_SETTING_STYLE,
          style: "flex xs12 md6 xl6",
          name: element.DASHBOARD_DESCRIPTION,
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

.chart_style {
  width: 450px;
  height: 450px;
  margin: 0 auto
}

.card_title {
  color: #000000;
}

.box_container {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
  margin-top: 60px;
}

.single_box {
  height: 100px;
  color: #ffffff;
  margin: 10px auto;
  width: 30%;
  border: 3px solid grey;
  padding: 10px;
  text-align: center;

}

.bgclr {
  background-color: green;
}

.bgclr1 {
  background-color: #00D3FF;
}

.bgclr2 {
  background-color: #0EDBB4;
}

.bgclr4 {
  background-color: #0d0d0d;
}

.bgclr3 {
  background-color: #940f0f;
}

.bgclr5 {
  background-color: #ebc334;
}

.bgclr6 {
  background-color: #1655c9;
}

.single_box span {
  font-weight: bold;
  font-size: 20px;
  color: #ffffff;
}

.single_box .title {
  display: block;
  color: #ffffff;
  font-size: 13px;
}

.header-title {
  position: absolute;
  bottom: 26px;
  font-size: 13px;
  margin-left: 200px;
  font-weight: bold;
  color: #666060;

}

.table_header {
  color: #fff;
  font-size: 15px;
  font-weight: bold;
  background-color: #8497B0;
  text-transform: uppercase;
}

.table_header_title {
  font-size: 13px;
  font-weight: bold;
  text-transform: uppercase;
}

.table td {
  font-size: 12px;
}

.chart_title {
  margin-left: 140px;
  text-align: center;
}

.header-title_single {
  position: absolute;
  clear: both;
  bottom: 260px;
  font-size: 13px;
  font-weight: bold;
  color: #4e524f;

}

.header-title_single1 {
  position: absolute;
  clear: both;
  bottom: 26px;
  font-size: 13px;
  font-weight: bold;
  color: #4e524f;

}</style>

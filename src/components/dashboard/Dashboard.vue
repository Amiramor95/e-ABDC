<template>
  <div>
    <div class="dashboard">
      <span v-if="utype == 'fimm'" v-b-tooltip.hover title="Main Dashboard Setting" v-on:click="main_dashboard_setting1"
        class="badge badge-success float-right"><i class="fa fa-cog"></i></span>
      <br>

      <card :array="cardArray"></card>
      <div class="row row-equal">
        <div v-for="(chart, id) in filteredDataCas" :key="id" :class="chart.style">
          <chart :chartId="chart.id" :chartType="chart.type" :chartName="chart.name" :chartView="chart.graphid"
            :chartStyle="chart.settingstyle" :chartModule="chart.module"></chart>
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
import card from './card.vue'
import chart from "./chart.vue";
import * as services06Module1 from "../../app/module1/services06";
import * as services07Module0 from "../../app/module0/services07"
import * as servicesModule02 from "../../app/module0/services02";
export default {
  name: 'dashboard',
  components: {
    card,
    chart,
  },
  mounted() {
    this.userdata = JSON.parse(localStorage.getItem("user"));
    //this.userDepart = this.userdata.MANAGE_DEPARTMENT_ID;
    this.utype = this.userdata.user_type;
    this.showStaticModalPM = false;
    this.getPMDashboardNotification();
    // this.getMainSetting();
  },
  computed: {
    filteredDataCas() {
      return this.chartArray;
    }
  },
  data() {
    return {
      userdata: {},
      utype: '',
      settinglist: [],
      menuNotificationD: '',
      notifyTitleD: '',
      userDepart: 0,
      cardArray: [
        {
          id: '1',
          type: 'announcement',
          style: 'flex xs12 md6 xl6',
          name: 'Announcement',
          description: 'This is Announcement section',
          icon: '',
          bgcolor: '#ffffff',
          color: "#00000",
        },
        {
          id: '2',
          type: 'circular',
          style: 'flex xs12 md6 xl6',
          name: 'Circular',
          description: 'This is Circular section',
          icon: '',
          bgcolor: '#ffffff',
          value: '60',
          color: "#000000",
        },
      ],
      chartArray: [],
    }
  },
  methods: {
    main_dashboard_setting1() {
      this.$router.push("/fimm/main-dashboard-setting-list");
    },
    getPMDashboardNotification: async function () {
      const userTYPE = this.userdata.user_type;
      const menutitle = "DASHBOARD";
      if (userTYPE == 'fimm' || userTYPE == 'DISTRIBUTOR') {
        const responsepmnoti = await servicesModule02.getMaintanceNotification(userTYPE, menutitle);
        // console.log("responsepmnoti=",responsepmnoti);
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
    getMainSetting: async function () {
      let settingArray = [];
      const userID = this.userdata.user_id;
      const userTYPE = this.userdata.user_type;
      const userGroup = this.userdata.USER_GROUP_ID;
      const userDepartment = this.userdata.MANAGE_DEPARTMENT_ID;
      // console.log("GLOBALuserTYPE=",userTYPE);
      const response = await services07Module0.getMainDashboardSetting(userID, userTYPE, userGroup, userDepartment);
      // console.log(" Main=",response);
      this.settinglist = response;
      this.settinglist.forEach(element => {
        settingArray.push({
          id: element.SETTING_INDEX,
          type: element.CHART_NAME,
          graphid: element.GRAPH_ID,
          settingstyle: element.DISPLAY_SETTING_STYLE,
          style: "flex xs12 md6 xl6",
          name: element.DASHBOARD_DESCRIPTION,
          module: element.DASHBOARD_TYPE,
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
  margin-top: 30px;
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

.bgclr0 {
  background-color: green;
}

.bgclr1 {
  background-color: #00D3FF;
}

.bgclr2 {
  background-color: #0EDBB4;
}

.bgclr3 {
  background-color: #0d0d0d;
}

.bgclr4 {
  background-color: #940f0f;
}

.bgclr5 {
  background-color: #00D3FF;
}

.bgclr6 {
  background-color: #1655c9;
}

.bgclr7 {
  background-color: #898f31;
}

.bgclr8 {
  background-color: #7e10cc;
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
  margin-left: 125px;
  font-weight: bold;
  color: #666060;

}

.table_header {
  color: #fff;
  font-size: 15px;
  font-weight: bold;
  background-color: #8497B0;
}

.table_sub_header {
  color: #000;
  font-size: 13px;
  font-weight: bold;
  background-color: #dde9ed;
}

.table-totaluser {
  font-size: 11px;
}

.table_type tr td {
  border-top: none;
}

.table_year {
  vertical-align: middle !important;
}

.text_center {
  text-align: center;
}

.table_type {}

.table_register tr td {
  vertical-align: middle !important;
}

.column_title {
  font-weight: bold;
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

}

.text_left {
  text-align: left;
}

.text_right {
  text-align: right;
}

.text_center {
  text-align: center;
}

.card_details {
  text-transform: uppercase;
  font-size: 13px;
  color: #007bff;
  cursor: pointer;
}

.card_no {
  color: #007bff;
  font-size: 14px;
  font-weight: bold;
}
</style>

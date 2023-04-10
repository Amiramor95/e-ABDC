<template>
  <div>
    <div class="dashboard">
      <!-- <card :array="cardArray"></card> -->

      <div class="row row-equal">
        <div v-for="(chart, id) in chartArray" :key="id" :class="chart.style">
         {{ chart }}
          <chart :chartId="chart.id" :chartType="chart.type" ></chart>
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
import chart from '../chart/chart'
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
    chart
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
console.log("usertype=", JSON.parse(localStorage.getItem("user")).user_type);
  },
  data () {
    return {
      cardArray: [
        {
          id: '1',
          type: 'text',
          style: 'flex xs12 md8 xl8',
          name: 'Announcement And Circular',
          description: 'This is Announcement section',
          icon: '',
          bgcolor: '',
          
        },
        {
          id: '2',
          type: 'progress',
          style: 'flex xs12 md4 xl4',
          name: 'Pending Task',
          description: 'This is Announcement section',
          icon: '',
          bgcolor: '',
          value: '60',
        },
      ],
      chartArray : [
        {
          "id":"5",
          "type":"pie",
          "style":"flex xs12 md6 xl6",
          "name":"AUM by Types of Collective Investment Scheme 2018"
        },
        {
          "id":"6",
          "type":"donut",
          "style":"flex xs12 md6 xl6",
          "name":"AUM by Types of Collective Investment Scheme 2019"
        },
        {
          "id":"1",
          "type":"bar",
          "style":"flex xs12 md6 xl6",
          "name":"Total New Consultant"
        },
        {
          "id":"2",
          "type":"bar",
          "style":"flex xs12 md6 xl6",
          "name":"Total Active Distributor"
        },
        {
          "id":"7",
          "type":"line",
          "style":"flex xs12 md6 xl6",
          "name":"Total Consultant Termination"
        },
        {
          "id":"4",
          "type":"bar",
          "style":"flex xs12 md6 xl6",
          "name":"Total Distributor Termination"
        }
      ],
    }
  },
  methods: {
   // addAddressToMap ({ city, country }) {
      //this.$refs.dashboardMap.addAddress({ city: city.text, country })
   // },
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
</style>

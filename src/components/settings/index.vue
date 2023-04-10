<template>
  <div class="row row-equal">
        
      <div v-for="(card, id) in array" :key="id" :class="card.style">
          <va-card :cardId="card.id" :color="card.bgcolor" :title="card.name">

        <div v-if="card.type == 'text'">
  <a href="#">1) Year 2021 Renewal And Annual Membership</a><br>
  <a href="#">2) Cancellation of FIMM Examination Sessions – Sarawak</a><br>
  <a href="#">3) Cancellation of FIMM Examination Sessions – Sabah</a><br>
  <a href="#">4) Cancellation of FIMM Examination Sessions – Johor</a><br>
  <a href="#">5) FIMM Examination Schedule – April to June 2021</a>
  <hr>
<b-button size="sm" variant="primary">See All</b-button>
</div> 
<div v-if="card.type == 'progress'">
  <b-badge pill variant="warning">Pending Approval for New Distributor Application</b-badge> <b-badge pill variant="primary">6</b-badge>
  <br>
  <b-badge pill variant="warning">Pending Approval for New Consultant Application</b-badge> <b-badge pill variant="primary">4</b-badge>
  <br>
  <b-badge pill variant="warning">Pending Distributor Cessation Request</b-badge> <b-badge pill variant="primary">2</b-badge>

</div>

        <va-progress-bar
              v-if="card.type == 'progress2'"
              :value="card.value1"
              color="warning"
              size="large"
            >
             Ongoing {{ card.value1 + '%' }}
        </va-progress-bar>   <br>
        <va-progress-bar
              v-if="card.type == 'progress2'"
              :value="card.value2"
              color="danger"
              size="large"
            >
             Pending {{ card.value2 + '%' }}
        </va-progress-bar>
        <div v-if="card.type == 'progress2'">
          {{ card.description }}
        </div>
          </va-card>
      </div>
    </div>
</template>

<script>
import * as serviceKoolreport from "../../app/koolreport/services";
import { hex2rgb } from '../../services/vuestic-ui';
export default {
  watch: {
  },
  props: ["array"],
  name: "card",
  data() {
    return {
      bgColor: 'background-color:' + this.cardBGColor + ';',
      value: 60,
      series: [{
          data: [44, 55, 41, 64, 22]
        }, {
          data: [53, 32, 33, 52, 13]
        }],
      // series: [{
      //   name: 'series-1',
      // //   // name: ['series-1','series-2','series-3','series-4','series-5'],
      // //   // labels: ["Apple", "Mango", "Banana", "Papaya", "Orange"],
      //   data: [44, 55, 13, 43, 22]
      // }],
      // series: [44, 55, 13, 43, 22],
          options: {
            chart: {
              id: 'hee',//name
              width: 380,
            },
            colors:['#F44336', '#E91E63', '#9C27B0', '#E91E63', '#9C27B0'],
            labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
            responsive: [{
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
                legend: {
                  position: 'bottom'
                }
              }
            }]
          }
    }
  },
  mounted() {
    this.getReport();

    // alert(this.chartClass)
  },
  methods: {
    getReport: async function() {
      const response = await serviceKoolreport.getReport(this.report);
      this.reportRawData = response;
    }
  }
};
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
</style>

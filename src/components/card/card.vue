<template>
  <div class="row row-equal">
    <div v-for="(card, id) in array" :key="id" :class="card.style">
    
      <va-card :cardId="card.id" :color="card.bgcolor" >
        <div v-if="card.type == 'text'">
          <h4 class="card_title">{{card.name}}</h4>
          <a href="#">1) Year 2021 Renewal And Annual Membership</a><br />
          <a href="#">2) Cancellation of FIMM Examination Sessions – Sarawak</a
          ><br />
          <a href="#">3) Cancellation of FIMM Examination Sessions – Sabah</a
          ><br />
          <a href="#">4) Cancellation of FIMM Examination Sessions – Johor</a
          ><br />
          <a href="#">5) FIMM Examination Schedule – April to June 2021</a>
          <hr />
          <b-button size="sm" variant="primary">See All</b-button>
        </div>
        <div v-if="card.type == 'progress'">
          <pending-task :pendingList="pendingList"></pending-task>
        </div>

        <div v-if="card.type == 'progress2'">
          {{ card.description }}
        </div>
      </va-card>
    </div>
  </div>
</template>

<script>
import * as serviceKoolreport from "../../app/koolreport/services";
import * as servicesModule0 from "../../app/module0/services";
import { hex2rgb } from "../../services/vuestic-ui";
export default {
  watch: {},
  props: ["array"],
  name: "card",
  data() {
    return {
      pendingList: []
    };
  },
  mounted() {
    //this.getPendingTask();
    //this.getReport();
  },
  methods: {
    // getPendingTask: async function() {
    //   const response = await servicesModule0.getPendingTask(this.report);
    //   this.pendingList = response;
    // },
    // getReport: async function() {
    //   const response = await serviceKoolreport.getReport(this.report);
    //   this.reportRawData = response;
    // }
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

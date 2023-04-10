<template>
<div>
    <loder v-show="isLoader" />
      <div class="text-center text-danger my-2" v-if="!isDataReady">
        <b-spinner class="align-middle"></b-spinner>
        <strong>Loading...</strong>
      </div>
      <div v-else>
            <!-- Data will load here -->
                <div class="pmnotification" v-for="(item, key) in listitems" :key="key">
                   <div class="not-title align-middle">{{ item.NOTIFICATION_TITLE}} ( {{ item.MAINTENANCE_START_DATE}} to {{ item.MAINTENANCE_END_DATE}} )</div>
                       <div> <p class="text-center" v-html="item.NOTIFICATION_DESC"></p></div>
                </div>
      </div>
</div>   
</template>

<script>
import Vue from "vue";

import * as servicesModule0 from '../../../app/module0/services02'
import loder from "../request_loader";
export default {
components: {
    loder
  },

  mounted() {
    this.getPageNotificationList();
  },
  data() {
    return {
     // Data for loder
      isLoader: false,
      isDataReady:false,
       eventListCount: null,
      listitems: [],

     
    };
  },
  methods: {
      proceedtodefault() {
      this.$router.push("/default");
    },
   async getPageNotificationList () {
       
           var user_type = "MEDIA";
      const response = await servicesModule0.getPageNotificationListByTypeOthers(user_type)
      this.listitems = response
      this.eventListCount = this.listitems.length
      //console.log("get all list : ",response);
      this.isDataReady = true; // Kill Component Loder
    },
  },
};
</script>

<style lang="scss">
#countdownclass{
color:red;
font-size: 12px;
font-weight: 600;
}
.tac_row1 input{
width: 80% !important;
}
.alignleft {
  display: flex;
  justify-content: flex-end;
}
.alignright {
  display: flex;
  justify-content: flex-start;
}
.pmnotification{
    display: block;
    margin-top: 10px;
  //  border-bottom: 1px solid #bab9b9;
    justify-content: center;
}
.not-title{
    text-align: center;
    font-weight: bold;
    margin-bottom: 20px;
    color: red;
}
</style>

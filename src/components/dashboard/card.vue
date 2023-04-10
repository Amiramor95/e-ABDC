<template>
  <div class="row row-equal">
    <div v-for="(card, id) in array" :key="id" :class="card.style">
    
      <va-card :cardId="card.id" :color="card.bgcolor" >
        <div v-if="card.type == 'announcement'">
          <h4 class="card_title">{{card.name}}</h4>
          <span v-for="(announcedata, k1) in announcementList" :key="k1">
             <span class="card_no">{{ k1+1 }}.</span> &nbsp; &nbsp;
            <span
              v-b-tooltip.hover
              title="details"
              v-on:click="detailsannounce(announcedata.MANAGE_EVENT_ID)"
              class="card_details"
            >
              {{ announcedata.EVENT_TITLE}}
            </span>
        <br />
          </span>
          <hr />
           <button
                    @click="targetRouteAnnounce(deptId, depName)"
                    type="button"
                    class="float-left btn btn-primary btn-sm"
                  >
                   See All
                  </button>
        </div>
       <div v-if="card.type == 'circular'">
          <h4 class="card_title">{{card.name}}</h4>
          <span v-for="(circulardata, k) in circularList" :key="k">
             <span class="card_no">{{ k+1 }}.</span> &nbsp; &nbsp;
            <span
              v-b-tooltip.hover
              title="details"
              v-on:click="details(circulardata.CIRCULAR_EVENT_ID)"
              class="card_details"
            >
              {{ circulardata.EVENT_TITLE}}
            </span>
        <br />
          </span>
          <hr />
          <button
                    @click="targetRoute(deptId, depName)"
                    type="button"
                    class="float-left btn btn-primary btn-sm"
                  >
                   See All
                  </button>
         
        </div>
      </va-card>
    </div>
  </div>
</template>

<script>
 import * as services07Module0 from "../../app/module0/services07"
export default {
  watch: {},
  props: ["array"],
  name: "card",
  data() {
    return {
      circularList: [],
      announcementList: [],
      userdatacard: {},
      deptId: 0,
      depName: '',
    };
  },
  mounted() {
      this.userdatacard = JSON.parse(localStorage.getItem("user"));
      this.getDepartmentName();
      this.getAnnouncementList();
      this.getCircularList();
   
  },
  methods: {
    getCircularList: async function() {
      const userDepart=this.userdatacard.MANAGE_DEPARTMENT_ID;
      //console.log("MANAGE_DEPARTMENT_ID=",userDepart);
      const response = await services07Module0.getCircularListByDepartment(userDepart);
      this.circularList = response;
      // console.log("circularList=",response);
    },
    getDepartmentName: async function() {
      const userDepart=this.userdatacard.MANAGE_DEPARTMENT_ID;
      const response = await services07Module0.getDepartment(userDepart);
      this.deptId = response.MANAGE_DEPARTMENT_ID;
      this.depName = response.DPMT_NAME;
      //console.log("department=",response.DPMT_NAME);
    },
    getAnnouncementList: async function() {
       const userDepart=this.userdatacard.MANAGE_DEPARTMENT_ID;
      //console.log("MANAGE_DEPARTMENT_ID=",userDepart);
      const response = await services07Module0.getAnnouncementListByDepartment(userDepart);
      this.announcementList = response;
       console.log("announcementList=",response);
    },
    details(data) {
      this.$router.push({
        name: "fimm-circular-details",
        params: { CIRCULAR_EVENT_ID: data }
      });
    },
     targetRoute(dpt,name) {
      //this.$router.push("/fimm/rd-circular-List");
      this.$router.push({
        name: "fimm-circular-List",
        params: { 
          MANAGE_DEPARTMENT_ID: dpt,
          DPMT_NAME : name
        }
      })
    },
     detailsannounce(data) {
      this.$router.push({
        name: "announcement-details",
        params: { MANAGE_EVENT_ID: data }
      });
    },
    targetRouteAnnounce(dpt,name) {
      //this.$router.push("/fimm/rd-circular-List");
      this.$router.push({
        name: "event-list-approved",
        params: { 
          MANAGE_DEPARTMENT_ID: dpt,
          DPMT_NAME : name
        }
      })
    },
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
.card_title {
  color: #575656;
  text-transform: uppercase;
}
.app-layout__main {
  background: #e8e8e8;
}
</style>

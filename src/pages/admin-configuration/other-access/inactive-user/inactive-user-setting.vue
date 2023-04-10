<template>
  <div class="card-body">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <h4 slot="header">System Settings</h4>
      </div>
        <!-- 2 -->
        <va-card class="ml-4 col-lg-10 my-1 px-1">
          <loder v-show="isLoader" />
          <div class="text-center text-danger my-2" v-if="!isDataReady">
            <b-spinner class="align-middle"></b-spinner>
            <strong>Loading...</strong>
          </div>
          <div v-else >

            <h5><i class="fa fa-key"></i>&nbsp;&nbsp;<b> INACTIVE USER SETTING </b></h5>
            <hr />

            <div class="ml-5">
              <div v-for="item in typeList">
                <div class="row">
                  <div class="col-md-6">
                    <span> {{ getType(item.TYPE) }}</span>
                  </div>
                  <div class="col"> 
                    <toggle-button
                      v-model="IS_ACTIVE[item.TYPE]"                 
                      :labels="{ checked: 'ON', uncheked:'OFF' }"
                      @change="onToggleChange(item.TYPE)"
                    />
                  </div>
                  <div class="col">
                  <button
                      v-if="item.IS_ACTIVE == 1"
                      @click="targetRoute(item.TYPE)"
                      type="button"
                      class="float-right btn-fill btn-md"
                    >
                      <i class="fa fa-edit"></i>
                    </button>
                  </div>
                </div>
                <b-collapse id="collapse-21" class="mt-4" v-model="visibleRegDep">
                  <b-card> </b-card>
                </b-collapse>
                <hr />
              </div>
            </div>

          </div>  
        </va-card>
    </div>
  </div>
</template>

<script>

import Vue from "vue";
import Vudal from "vudal";
import * as services06Module0 from "../../../../app/module0/services06";
import * as servicesModule0 from "../../../../app/module0/services02";
import * as servicesModule04 from "../../../../app/module0/services04";
import loder from "../../../request_loader";

export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { Vudal,loder},
  mounted() {
    //this.getPurgeData();
    this.getAllData();
  },
  computed: {
    fields() {
      return [
        {
          name: "__slot:marker",
          width: "30px",
          dataClass: "text-center"
        },
        {
          name: "__slot:no",
          title: "No"
        },
        {
          name: "SECURITY_QUESTION",
          title: "Question",
          sortField: "SECURITY_QUESTION"
        },
        {
          name: "__slot:actions",
          title: "Action",
          dataClass: "inline"
        }
      ];
    },
    filteredDataQuestion() {
    if (!this.term || this.term.length < 1) {
    return this.listQuestion;
    }

    // return this.users.filter(item => {
    //   return item.company.toLowerCase().startsWith(this.term.toLowerCase());
    // });
    }
  },
  watch: {
    selectedMinLength: function (val) {
      if (val == false) {
        this.passwordSetting.MIN_LENGTH = 0;
      }
    },
    selectedMaxLength: function (val) {
      if (val == false) {
        this.passwordSetting.MAX_LENGTH = 0;
      }
    },
  },
  // DATA SCHEMA
  data() {
    return {
      isLoader: false,
      isDataReady:false,

      visiblePassHistory: false,
      visiblePassHistory2: false,
      visiblePassHistory3: false,
      visiblePassHistory4: false,
      visiblePassHistory5:false,
      IS_ACTIVE: [],
      typeList:[],

      model: {
        DIST_DURATION: "",
        CONST_DURATION: "",
        THIRD_DURATION: "",
        TP_DURATION: "",
      },


      field: [],
      term: null,
      perPage: 10,
      perPageOptions: ["4", "6", "10", "20"],
      listQuestion: [],
      questionListCount:null,
      
      dataToggle: true,

    }
  },
  methods: {
    // Toggle Event
    async onToggleChange(type){
      if (confirm("Are you sure you want to update ?")) {
        this.isLoader = true; // Loder
        const data = new FormData();
        data.append("IS_ACTIVE",  this.IS_ACTIVE[type]);
        data.append("TYPE", type);
        const response = await servicesModule0.createUserAI(data);
        //alert(dept);
        this.isLoader = false; // Loder
      }
      this.getAllData();
    },
    targetRoute(type) {
      this.$router.push({
        name: "inactive-user",
        params: { 
          type_id: type
        }
      })
    },
    getAllData: async function() {
      this.isDataReady = false; // Start Loader
      var type = null; 
      const response = await servicesModule0.getAllActiveInactiveData(type);
      //console.log('ffffffffffff',response);
      response.data.forEach((item) => {
        this.IS_ACTIVE[item.TYPE] = (item.IS_ACTIVE == 1) ? true : false;
      });
      this.typeList = response.data;
      this.isDataReady = true; // Kill Loader
    },
    getType(type){
      //1:FiMM USER,2:Distributor,3:Consultant,4:Third party,5:Training Provider
      if(type == 1){
        return 'FiMM User';
      }else if(type == 2){
        return 'Distributor User';
      }else if(type == 3){
        return 'Consultant User';
      }else if(type == 4){
        return 'Third party User';
      }else if(type == 5){
        return 'Training Provider User';
      }else {
        return '';
      }
    },
    onlyNumber ($event) {
        let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
        if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) { // 46 is dot
        $event.preventDefault();
        }
    },
     checkNumber(){
        let minNumber=this.passwordSetting.MIN_LENGTH;
        let maxNumber=this.passwordSetting.MAX_LENGTH;
        console.log("Min=",this.passwordSetting.MIN_LENGTH);
        console.log("Max=",this.passwordSetting.MAX_LENGTH);
        if(minNumber >= maxNumber)
        {
          alert("Minimum Length Always less than Maximum Length");
          this.passwordSetting.MIN_LENGTH=3;
          this.passwordSetting.MAX_LENGTH=12;
        }

      },


    getPurgeData: async function () {
      const response = await servicesModule04.getPurgeData();
      this.model = response;
      this.isDataReady = true; // Kill component loader
    },

    async submitData(type) {
      this.isLoader = true; // Loder

      const data = new FormData();
      if(type == 1){
        data.append("PURGE_DATA", this.model.DIST_DURATION);
      }else if(type == 2){
        data.append("PURGE_DATA", this.model.CONST_DURATION);
      }else if(type == 3){
        data.append("PURGE_DATA", this.model.THIRD_DURATION);
      }else if(type == 4){
        data.append("PURGE_DATA", this.model.TP_DURATION);
      }else{
        data.append("PURGE_DATA", 0);
      }
      data.append("PURGE_DATA_TYPE", type);
      
      try {
        // eslint-disable-next-line no-unused-vars
        const response = await servicesModule04.savePurgeData(data);
        this.getPurgeData();
        this.isLoader = false; // Kill Loder
      } catch (error) {
        console.log(error);
      }
    },

  },
};
</script>

<style lang="scss" scoped>
.app-layout__main {
  background: #e8e8e8;
}
.buttonsave{
  margin-top: 40px;
}
.buttonsavequestion{
  float: left !important;

}
.historyarea{
  margin-top:10px;
}
.vue-form-generator{
  width: 60% !important;
}
.data-list{
  margin-top: 60px;
}
.inline {
  display: inline-flex;
}

.va-data-table__pagination {
  margin-top: 1rem;
  display: -webkit-box;
  display: -ms-flexbox;
  display: inherit;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: flex-end;
}
.form-group.error .errors{
  float: right;
}
</style>

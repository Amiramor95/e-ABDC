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

            <h5><i class="fa fa-key"></i>&nbsp;&nbsp;<b> PURGE DATA SETTING </b></h5>
            <hr />
            <div class="ml-5">

              <div>
                <span>Distributor New Application Data</span>
                <button
                  v-if="visiblePassHistory == false"
                  v-b-toggle.collapse-5
                  type="button"
                  class="float-right btn-fill btn-md"
                >
                  <i class="fa fa-edit"></i>
                </button>
                <button
                  v-if="visiblePassHistory == true"
                  v-b-toggle.collapse-5
                  type="button"
                  class="float-right btn-fill btn-md"
                >
                  <i class="fa fa-times"></i>
                </button>
                <b-collapse
                  id="collapse-5"
                  class="mt-4"
                  v-model="visiblePassHistory"
                >
                  <va-card >
                    <tr>
                      <td colspan="2" >
                        <div class="row ">
                          <div class="ml-4 col-md-12 historyarea">
                            <span class="col mt-1 description">Duration(Months)</span>
                            <input
                              v-model="model.DIST_DURATION"
                              type="text"
                              placeholder="0"
                              @keypress="onlyNumber"
                              class="float-right col-7 form-control form-control-md"
                            />
                          </div>
                          <br />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="2">
                        <button
                          @click="submitData(1)"
                          type="submit"
                          class="ml-2 float-left btn btn-primary btn-fill btn-md buttonsave"
                        >
                          <i class="fa fa-save" />&nbsp; SAVE
                        </button>
                      </td>
                    </tr>
                  </va-card>
                </b-collapse>
                <hr />
              </div>

              <div>
                <span>Consultant New Application Data</span>
                <button
                  v-if="visiblePassHistory2 == false"
                  v-b-toggle.collapse-2
                  type="button"
                  class="float-right btn-fill btn-md"
                >
                  <i class="fa fa-edit"></i>
                </button>
                <button
                  v-if="visiblePassHistory2 == true"
                  v-b-toggle.collapse-2
                  type="button"
                  class="float-right btn-fill btn-md"
                >
                  <i class="fa fa-times"></i>
                </button>
                <b-collapse
                  id="collapse-2"
                  class="mt-4"
                  v-model="visiblePassHistory2"
                >
                  <va-card >
                    <tr>
                      <td colspan="2" >
                        <div class="row ">
                          <div class="ml-4 col-md-12 historyarea">
                            <span class="col mt-1 description">Duration(Months)</span>
                            <input
                              v-model="model.CONST_DURATION"
                              type="text"
                              placeholder="0"
                              @keypress="onlyNumber"
                              class="float-right col-7 form-control form-control-md"
                            />
                          </div>
                          <br />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="2">
                        <button
                          @click="submitData(2)"
                          type="submit"
                          class="ml-2 float-left btn btn-primary btn-fill btn-md buttonsave"
                        >
                          <i class="fa fa-save" />&nbsp; SAVE
                        </button>
                      </td>
                    </tr>
                  </va-card>
                </b-collapse>
                <hr />
              </div>

              <div>
                <span>3rd Party New Application Data</span>
                <button
                  v-if="visiblePassHistory3 == false"
                  v-b-toggle.collapse-3
                  type="button"
                  class="float-right btn-fill btn-md"
                >
                  <i class="fa fa-edit"></i>
                </button>
                <button
                  v-if="visiblePassHistory3 == true"
                  v-b-toggle.collapse-3
                  type="button"
                  class="float-right btn-fill btn-md"
                >
                  <i class="fa fa-times"></i>
                </button>
                <b-collapse
                  id="collapse-3"
                  class="mt-4"
                  v-model="visiblePassHistory3"
                >
                  <va-card >
                    <tr>
                      <td colspan="2" >
                        <div class="row ">
                          <div class="ml-4 col-md-12 historyarea">
                            <span class="col mt-1 description">Duration(Months)</span>
                            <input
                              v-model="model.THIRD_DURATION"
                              type="text"
                              placeholder="0"
                              @keypress="onlyNumber"
                              class="float-right col-7 form-control form-control-md"
                            />
                          </div>
                          <br />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="2">
                        <button
                          @click="submitData(3)"
                          type="submit"
                          class="ml-2 float-left btn btn-primary btn-fill btn-md buttonsave"
                        >
                          <i class="fa fa-save" />&nbsp; SAVE
                        </button>
                      </td>
                    </tr>
                  </va-card>
                </b-collapse>
                <hr />
              </div>

              <div>
                <span>Training Provider New Application</span>
                <button
                  v-if="visiblePassHistory4 == false"
                  v-b-toggle.collapse-4
                  type="button"
                  class="float-right btn-fill btn-md"
                >
                  <i class="fa fa-edit"></i>
                </button>
                <button
                  v-if="visiblePassHistory4 == true"
                  v-b-toggle.collapse-4
                  type="button"
                  class="float-right btn-fill btn-md"
                >
                  <i class="fa fa-times"></i>
                </button>
                <b-collapse
                  id="collapse-4"
                  class="mt-4"
                  v-model="visiblePassHistory4"
                >
                  <va-card >
                    <tr>
                      <td colspan="2" >
                        <div class="row ">
                          <div class="ml-4 col-md-12 historyarea">
                            <span class="col mt-1 description">Duration(Months)</span>
                            <input
                              v-model="model.TP_DURATION"
                              type="text"
                              placeholder="0"
                              @keypress="onlyNumber"
                              class="float-right col-7 form-control form-control-md"
                            />
                          </div>
                          <br />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="2">
                        <button
                          @click="submitData(4)"
                          type="submit"
                          class="ml-2 float-left btn btn-primary btn-fill btn-md buttonsave"
                        >
                          <i class="fa fa-save" />&nbsp; SAVE
                        </button>
                      </td>
                    </tr>
                  </va-card>
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
import Spacing from "../../../components/ui/spacing/Spacing.vue";
import * as services06Module0 from "../../../app/module0/services06";
import * as servicesModule0 from "../../../app/module0/services02";
import * as servicesModule04 from "../../../app/module0/services04";
import loder from "../../request_loader";

export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { Spacing,Vudal,loder},
  mounted() {
    this.getPurgeData();
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

<template>
  <div class="card-body">
    <div class="row justify-content-center">
        <div class="col-lg-10">
        <h4 slot="header">APPROVAL LEVEL</h4>
        </div>
         <va-card class=" ml-4 col-lg-10 my-1 px-1">
            <div class="col-lg-10">
            <h4 slot="header">
              <i class="fa fa-sitemap"></i>&nbsp;&nbsp;
              WAIVER MODULE SUBMISSION- D(1)(d)
            </h4>
            </div>
            <br>
           <div class="ml-5">
              <div v-for="(item, index) in approvalLevelList" :key="index">
                    <div class="row">
                    <div class="col-md-1">
                         <span>{{index + 1}}</span>
                    </div>
                    <div class="col-md-6">
                         <span>{{item.name}}</span>
                    </div>
                    <div class="col">
                        <toggle-button v-model='item.datatoggle' :value="true"  @change="onToggleChange(item, $event)" :labels="{checked: 'ON', uncheked: 'OFF'}"/>
                    </div>
                   <div class="col">
                    <button v-b-toggle="item.id" type="button" class="float-right btn-fill btn-md"><i class="fa fa-edit"></i></button>
                    </div>
                    </div>
                    <b-collapse :id="item.id" style="background-color:#eeeeee;" class="mt-4" v-model="item.index">
                    <va-card style="background-color:#eeeeee;">
                      <tr>
                        <td colspan="2">
                        <div class="row mb-1">
                        <!-- <div class="col-md-12"> -->
                          <span class="col-3 mt-1 description"
                            >PREDECESSOR</span
                          >
                           <input
                           v-model="item.predecessor"
                            type="number"
                            placeholder="0"
                            class="float-right col-2 form-control form-control-md"
                          />
                        <!-- </div> -->
                         </div>
                        <!-- <br /> -->
                        <div class="row mb-1">
                        <!-- <div class="col-md-12"> -->
                          <span class="col-3 mt-1 description"
                            >AUTO APPROVAL DAY</span
                          >
                          <input
                          v-model="item.autoApprovalDay"
                            type="number"
                            placeholder="0"
                            class="float-right col-2 form-control form-control-md"
                          />
                        <!-- </div> -->
                        </div>

                        <div class="row mb-1">
                        <!-- <div class="col-md-12"> -->
                          <span class="col-3 mt-1 description"
                            >AUTO REJECT DAY</span
                          >
                          <input
                          v-model="item.autoRejectDay"
                            type="number"
                            placeholder="0"
                            class="float-right col-2 form-control form-control-md"
                          />
                        <!-- </div> -->
                        </div>

                        <br>
                        <br>
                         <div class="row">
                             <!-- <div class="col-md-12"> -->
                             <span class="col mt-1 description"
                            >CATEGORY</span>
                            <div class="col-md-9">
                                <div class="row">
                                <div class="col-4" v-for="(typeItem, index) in item.compType" :key="index">
                                <div class="row mb-2">
                                  <va-checkbox
                                class="col-2"
                                v-model="typeItem.selected"
                                ></va-checkbox>
                                <span class="col">
                                    {{typeItem.name}}
                                </span>
                                </div>
                                </div>
                                <!-- </div> -->
                            </div>
                            </div>
                         </div>
                        <br />

                       </td>
                    </tr>
                    <tr>
                        <td colspan="2"><button @click="submit(item)" type="submit" class="ml-2 float-right btn btn-primary btn-fill btn-md"><i class="fa fa-save" />&nbsp; save</button></td>
                    </tr>
                    </va-card>
                </b-collapse>

                <hr>
                </div>
            </div>
            <br />
            <button @click="back" type="button" class="btn btn-primary btn-fill btn-md"><i class="fa fa-step-backward" /> &nbsp; Previous </button>
         </va-card>
    </div>
 </div>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import Vue from "vue";
import "vue-form-generator/dist/vfg.css";
import * as servicesModule0 from "../../../app/module0/services02";



export default {

  mounted() {
    // this.getAllApprovalList()

  },

   data() {
        return {
          visibleLogin: false,
          visibleRegDep: false,

          approvalLevelList: [
        {
          id: "1", name: "PROFESSIONAL DEVELOPMENT SERVICES DEPARTMENT REVIEW", predecessor:"", autoApprovalDay:"", autoRejectDay:"", toggleStatus:0, datatoggle:false, compType: [
               {id: 1, name: "UTMC", selected: false},
                {id: 2, name: "IUTA", selected: false},
                {id: 3, name: "CUTA", selected: false},
                {id: 5, name: "CPRA", selected: false},
                {id: 6, name: "PRP", selected: false},
                {id: 7, name: "3rd Party", selected: false},
                {id: 8,name: "Training Provider", selected: false},
            ],
        },
        {
          id: "2", name: "GENERAL MANAGER OF INDUSTRY SERVICES DIVISION REVIEW", predecessor:"", autoApprovalDay:"", autoRejectDay:"", toggleStatus:0, datatoggle:false, compType: [
               {id: 1, name: "UTMC", selected: false},
                {id: 2, name: "IUTA", selected: false},
                {id: 3, name: "CUTA", selected: false},
                {id: 5, name: "CPRA", selected: false},
                {id: 6, name: "PRP", selected: false},
                {id: 7, name: "3rd Party", selected: false},
                {id: 8,name: "Training Provider", selected: false},
            ],
        },


      ],
        };
    },

     methods: {
        back() { this.$router.go(-1);}, // back button

        onToggleChange(item,event){
            let value = event.value;
            console.log(value);
            if (value == false){
              item.toggleStatus = 1;
            }else{
              item.toggleStatus = 0;
            }
          },

          async submit(item){
            this.selectedType=[];
            console.log(JSON.stringify(item.datatoggle));
            console.log(JSON.stringify(item.id));
            item.compType.forEach((element) => {
              if (element.selected == true) {
                this.selectedType.push(element.id);
              }

            });
            const data = new FormData();
                data.append("compType", JSON.stringify(this.selectedType));
                data.append('APPR_LEVEL_NAME', item.name);
                data.append('APPR_PREDECESSOR', item.predecessor);
                data.append('APPR_AUTO_APPROVAL_DAYS', item.autoApprovalDay);
                data.append('APPR_AUTO_REJECT_DAYS', item.autoRejectDay);
                data.append('APPR_STATUS', item.toggleStatus);
                data.append('APPR_DISTRIBUTOR_CATEGORY', JSON.stringify(this.selectedType));
                data.append('APPR_PROCESSFLOW_NAME','WAIVER MODULE SUBMISSION- D(1)(d)');
              try {
                // eslint-disable-next-line no-unused-vars
                const response = await servicesModule0.createApprovalList(data);
                // this.getAllApprovalList();

          }catch (error) {
        console.log(error);
      }
         }
     },
}

</script>

<style lang="scss">
.app-layout__main {
  background: #e8e8e8;
}
</style>

/* eslint-disable no-unused-expressions */
<template>
  <va-card>
    <h4 slot="header" class="card-title"> <i class="fa fa-bank"></i>&nbsp;&nbsp;Audit Trail</h4>
    <br />
    <div>
      <!-- <div class="content"> -->
      <div>
        <div class="ml-5">
          <br />
           <div class="row">
        <div class="col-md-3">
          <b><h5 class="card-title">Module <span class="text-danger"> * </span>:</h5></b>
        </div>
        <div class="col-md-6">
          <!-- <div class="form-group"> -->
        <multiselect
          v-model="model.MODULE_TYPE"
          :options="moduleList"
           :multiple="false"
            :taggable="true"
          placeholder="Select Module"
          track-by="MODULENAME"
          label="MODULENAME"
          class="float-left"
          :allow-empty="false"
          required
        ></multiselect>
          <!-- </div> -->
        </div>
      </div>
      <br />
           <div class="row">
        <div class="col-md-3">
          <b><h5 class="card-title">Start Date <span class="text-danger"> * </span>:</h5></b>
        </div>
        <div class="col-md-6">
          <!-- <div class="form-group"> -->
          <datepicker
          :value="term"

          @input="dateValidation('start')"
          placeholder="dd-MM-yyyy"
          format="dd MMM yyyy"
          input-class="form-control float-left bgcolor"
          v-model="model.START_DATE"
          :typeable="false"
          required
          ></datepicker>
          <!-- </div> -->
        </div>
      </div>
      <br/>
        <br/>

      <div class="row">
        <div class="col-md-3">
          <b><h5 class="card-title">End Date <span class="text-danger"> * </span>:</h5></b>
        </div>
        <div class="col-md-6">
          <!-- <div class="form-group"> -->
          <datepicker
          :value="term"

          placeholder="dd-MM-yyyy"
          format="dd MMM yyyy"
          input-class="form-control float-left bgcolor"
          v-model="model.END_DATE"
          :typeable="false"
          @input="dateValidation('end')"
          ></datepicker>
          <!-- </div> -->
        </div>
      </div>
      <br/>
     
          <!-- <vue-form-generator
            :model="model"
            :schema="Tab1Schema"
            :options="formOptions"
            ref="Tab1Form"
          >
          </vue-form-generator> -->
          <br />
          <div class="text-center">
            <button
              @click="searchAudit"
              type="button"
              class="btn btn-warning btn-fill btn-md"
            >
              <i class="fa fa-search" /> &nbsp; SEARCH
            </button>
          </div>
          <br />
         <!-- <div class="float-right">
            <va-input
            :value="term"
            :placeholder="$t('Search')"
            @input="searchMasking"
            removable
            >
        <va-icon name="fa fa-search" slot="prepend" />
      </va-input>
    </div> -->
          <br />
          <h4>LIST OF AUDIT TRAIL OF {{ this.model.MODULE_TYPE.MODULENAME}}</h4>
          <!-- list -->
          <!-- <div class="float-right">
              <va-input
              :value="term"
              :placeholder="$t('Search')"
              @input="searchDummy"
              removable
              >
              <va-icon name="fa fa-search" slot="prepend" />
              </va-input>
              </div> -->

          <!-- <vue-form-generator
          :model="model"
          :schema="SearchFilterSchema"
          :options="formOptions"
          ref="SearchForm"
          @model-updated="onModelUpdatedSearch"
        >
        </vue-form-generator> -->
        <br>
         <br>
          <va-card class="mt-2">
            <va-data-table
              :fields="Dummyfields"
              :data="filteredDataDummyDist"
              :per-page="parseInt(perPage)"
              :datacount="DummyDistCount"
               :dataperpage="parseInt(perPage)"
            clickable>
              <template slot="no" slot-scope="row">
                {{ row.rowIndex + 1 }}
              </template>

              <template slot="actions" slot-scope="props">
                <h4 class="mt-2">
                    <span
                    class="badge badge-primary mr-1"
                    v-on:click="editDummyDistributor(props.rowData)"
                  >
                    <i class="fa fa-edit"></i
                  ></span>
                  <span class="badge badge-danger mr-1" v-on:click="deleteDummyDist(props.rowData)">
                    <i class="fa fa-trash"></i></span>
                </h4>
              </template>
            </va-data-table>
            <br />
            <!-- <div class="float-left">
              <button
                type="button"
                class="btn btn-primary btn-fill btn-md"
              >
                <i class="fa fa-upload" /> &nbsp; Bulk Upload
              </button>
            </div> -->
          </va-card>
        </div>
      </div>
      <!-- </div> -->
    </div>
  </va-card>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import Vue from 'vue'
import 'vue-form-generator/dist/vfg.css'
import Vudal from 'vudal'
import * as servicesModule0 from "../../../app/module0/services02"
import * as services06Module1 from "../../../app/module1/services06";
import Tabs from 'vue-tabs-with-active-line'
import { debounce } from "lodash";
import moment from "moment";
const TABS = [
//   { title: 'Setting 1 : Account Code', value: 'tab1' },
]

export default {

  mounted() {
   // this.getAllDummyDistributor();
    this.getAllModule();

  },
  components: {
    Tabs,
    Vudal,
  },

  computed: {
    Dummyfields () {
      return [
        // {
        //   name: '__slot:marker',
        //   width: '30px',
        //   dataClass: 'text-center',
        // },
        // {
        //   name: '__slot:no',
        //   title: 'No',
        // },
         {
          name: 'AUDIT_ID',
          title: 'Audit ID',
        },
        {
          name: 'EVENT',
          title: 'Event',
        },
         {
          name: 'UPDATED_AT',
          title: 'Date',
        },
        // {
        //   name: 'DIST_TYPE_NAME',
        //   title: 'Audit Model',
        // },
         {
          name: 'NEW_VALUES',
          title: 'New Values',
        },
         {
          name: 'OLD_VALUES',
          title: 'Old Values',
        },
        
        // {
        //   name: '__slot:actions',
        //   title: 'Action',
        //   dataClass: 'justify-content-center',
        //   width: '15%',
        // },
      ]
    },
    filteredDataDummyDist() {
      if (!this.term || this.term.length < 1) {
        return this.DummyDistList;
      }
// console.log("term=",this.term);
//       return this.DummyDistList.filter((item) => {
//         return this.term
//           .toLowerCase()
//           .split(" ")
//           .every(
//             (v) =>
//               item.DIST_NAME.toLowerCase().includes(v)||
//                item.DIST_TYPE_NAME.toLowerCase().includes(v)
//           );
//       });
    },
  },

  data () {
    return {
      term: null,
      perPage: '10',
      DummyDistList: [],
      DummyDistCount: null,
      moduleList: [],
      count: 1,
      model: {
        // TAB 1
        MODULE_TYPE: '',
        START_DATE: '',
        END_DATE: '',
      },

      formOptions: {
        validateAfterChanged: true,
      },
    }
  },

  methods: {
    handleClick (newTab) { this.currentTab = newTab }, // end tab

     dateValidation(type){
      var sDate = this.model.START_DATE;
      var eDate = this.model.END_DATE;
      if(eDate && (sDate > eDate)){
        if(type == 'start'){
          this.model.START_DATE = '';
        }else{
          this.model.END_DATE =  "";
        }
        Vue.$toast.open({
            message: 'Valid date range required !!',
            type: 'error',
        });
      }
    },
    //ACC CODE
    getAllModule: async function () {
      const response = await servicesModule0.getMainModuleList();
      this.moduleList = response;
    },

    getAllDummyDistributor: async function() {
      const response = await servicesModule0.getAllDummyDistributor();
      console.log("DUMMY LIST=",response);
      this.DummyDistList = response;
      this.DummyDistCount = this.DummyDistList.length;
    },

    async searchAudit() {
        if(this.model.MODULE_TYPE == '')
        {
           Vue.$toast.open({
            message: 'Please Select Module Type !!',
            type: 'error',
        });
        return;
        }
         if(this.model.START_DATE == '')
        {
           Vue.$toast.open({
            message: 'Please Enter Start Date !!',
            type: 'error',
        });
        return;
        }
         if(this.model.END_DATE == '')
        {
           Vue.$toast.open({
            message: 'Please Enter End Date !!',
            type: 'error',
        });
        return;
        }
          console.log('data=', this.model.MODULE_TYPE);
            const data = new FormData()
            data.append('MODULE_TYPE', this.model.MODULE_TYPE.MODULEID)
            data.append('START_DATE', moment(this.model.START_DATE).format("YYYY-MM-DD"))
            data.append('END_DATE', moment(this.model.END_DATE).format("YYYY-MM-DD"))
            try {
              // eslint-disable-next-line no-unused-vars
              const response = await servicesModule0.getAuditTrailData(data)
              console.log("aresponse=",response);
             this.DummyDistList = response;
             this.DummyDistCount = this.DummyDistList.length;
            //  this.model.DIST_NAME="";
             // this.model.DIST_TYPE="";
             // this.model.PREFIX="";
            } catch (error) {
              console.log(error)
            }
       // }
    },

    async deleteDummyDist(data) {
      if (confirm("Are you sure you want to delete?")) {
      // eslint-disable-next-line no-unused-vars
      console.log("DISTRIBUTOR_ID=",data.DISTRIBUTOR_ID);
        const response = await servicesModule0.deleteDummyDistributor(data.DISTRIBUTOR_ID)
        this.getAllDummyDistributor()
      }
    },

    async editDummyDistributor(data) {
     // const response = await servicesModule0.getMaskingById(data.MASKING_ID)
      console.log("Edit List=",data)
      this.$modals.simpleModalEditDummy.$show()
      this.DISTRIBUTOR_ID = data.DISTRIBUTOR_ID
      this.DIST_TYPE_ID = data.DIST_TYPE_ID
      this.model.editDummyDist.DIST_NAME= data.DIST_NAME
      this.model.editDummyDist.DIST_TYPE = {
      DISTRIBUTOR_TYPE_ID: data.DIST_TYPE_ID,
      DIST_TYPE_NAME: data.DIST_TYPE_NAME,
       // MANAGE_GROUP_ID:response.APPR_GROUP_ID,
      };
    },

    async updateDummyDistAPI() {
      if (this.$refs.TabEditForm.validate()) {
        try {
          console.log("Type Id=",this.model.editDummyDist.DIST_TYPE.DISTRIBUTOR_TYPE_ID)
          const data = new FormData()
          data.append('DISTRIBUTOR_ID', this.DISTRIBUTOR_ID)
          data.append('DIST_TYPE_ID', this.DIST_TYPE_ID)
          
          data.append('DIST_NAME', this.model.editDummyDist.DIST_NAME)
          data.append('DIST_TYPE', this.model.editDummyDist.DIST_TYPE.DISTRIBUTOR_TYPE_ID)
          const response = await servicesModule0.updateDummyDistributor(data)
          this.getAllDummyDistributor()
        } catch (error) {
          console.log(error)
        }
     }
    },
     async filterModuleSearch() {

     const filterData = {
        DIST_TYPE: this.model.searchDummyDist.DIST_TYPE,
          //this.model.modelAdd.MODULE.MANAGE_MODULE_ID

      };
       this.getAllDummyDistributor();
       console.log("Filterdata=",filterData);
     // const filterData = this.model.modelFilterCountry.SET_COUNTRY.SETTING_GENERAL_ID;

       //console.log("State Search=",filterData);
      const response = await servicesModule0.getFilteredDummyData(filterData);
       console.log("State Search=",response);
      this.DummyDistList = response;
      this.DummyDistCount = this.DummyDistList.length;
    },
    onModelUpdatedSearch(newVal, schema) {
      if (schema == "searchDummyDist.DIST_TYPE") {
        const newValcon=JSON.stringify(newVal);
       console.log("Module filter ", newValcon);
         if(newValcon == 'null'){
            console.log("Module filter1 ", newValcon);
           this.getAllDummyDistributor();
         }else{
            console.log("Module filter2 ", newValcon);
            this.filterModuleSearch();
         }
      }
    },
    searchDummy: debounce(function (term) {
      this.term = term;
    }, 400),
    
}


}
</script>
<style lang="scss">
.default-tabs {
  position: relative;
  margin: 0 auto;

  &__item {
    display: inline-block;
    margin: 0 5px;
    padding: 10px;
    padding-bottom: 8px;
    font-size: 16px;
    letter-spacing: 0.8px;
    color: gray;
    text-decoration: none;
    border: none;
    background-color: transparent;
    border-bottom: 2px solid transparent;
    cursor: pointer;
    transition: all 0.25s;

    &__active {
      color: black;
    }

    &:hover {
      border-bottom: 2px solid gray;
      color: black;
    }

    &:focus {
      outline: none;
      border-bottom: 2px solid gray;
      color: black;
    }

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }
  }

  &__active-line {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    background-color: black;
    transition: transform 0.4s ease, width 0.4s ease;
  }
}

.content {
  margin-top: 30px;
  font-size: 20px;
}

.inline {
  display: inline-flex;
  float: right;
}
.col-md-8 .field-wrap{
 display: inline-flex;
  //float: right;
  width: 80%;
}
.form-group.error .errors{
  float: right;
  margin-right: 71px;
}
</style>



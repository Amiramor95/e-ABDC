/* eslint-disable no-unused-expressions */
<template>

  

  <va-card>
    <loder v-show="isLoader" />
    <h4 slot="header" class="card-title">Set {{ getType(type) }} Inactive Days </h4>

    <div class="text-center text-danger my-2" v-if="!isDataReady">
      <b-spinner class="align-middle"></b-spinner>
      <strong>Loading...</strong>
    </div>

    <div v-else>


      <br />
      <div class="row">
        <div class="col-md-6">
          <vue-form-generator
            :model="model"
            :schema="Tab1Schema"
            :options="formOptions"
            ref="Tab1Form"
          > 
          </vue-form-generator>
        </div>  
      </div>  

      <br />
      <br />
      <button
        type="button"
        @click="submit"
        class="float-right btn btn-primary btn-fill btn-md"
      >
      <i class="fa fa-save" /> &nbsp; {{model.actionButton}}
      </button>
      <div class="">
        <br />
        <div >
          <br />
          <br />
          <!-- list 
          <va-card class="mt-2">
            <va-data-table
              :datacount="AIListCount"
              :dataperpage="parseInt(perPage)"
              :fields="moduleFields"
              :data="moduleFilteredData"
              no-data-label="No data found"
              :per-page="parseInt(perPage)"
              clickable
            >
            <template slot="no" slot-scope="row">
                {{ row.rowIndex + 1 }}
              </template>

              <template slot="actions" slot-scope="props">
                <h4 class="mt-2">
                  <span
                    class="badge badge-primary mr-1"
                    v-on:click="editActiveInactive(props.rowData)"
                    
                  >
                    <i class="fa fa-edit"></i
                  ></span>
                  <span
                      class="badge badge-primary mr-1"
                      v-on:click="deleteData(props.rowData)"
                    >
                      <i class="fa fa-trash"></i
                    ></span>
                </h4>
              </template>
            </va-data-table>
          </va-card> -->
          <br />

        </div>

      </div>
      <br />
      <button
          @click="back"
          type="button"
          class="btn btn-primary btn-fill btn-md"
      >
          <i class="fa fa-step-backward" /> &nbsp; Previous
      </button>
    </div>  
  </va-card>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import Vudal from "vudal";
import "vue-form-generator/dist/vfg.css";
import * as servicesModule04 from "../../../../app/module0/services04";
import * as servicesModule0 from "../../../../app/module0/services02";
import moment from "moment";
import loder from "../../../request_loader";


export default {
  mounted() {
    //1:FiMM USER,2:Distributor,3:Consultant,4:Third party,5:Training Provider
    this.type = this.$route.params.type_id;
    this.getAllData();
    //this.getStaffList();
  },

  components: {
    Vudal,loder
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    async submit() {
      if (this.$refs.Tab1Form.validate()) {
        this.isLoader = true; // Loder 

        //1:FiMM USER,2:Distributor,3:Consultant,4:Third party,5:Training Provider
        var type = this.type; 
        const data = new FormData();
        data.append("DURATION", this.model.DURATION);
        //data.append("IS_ACTIVE", this.model.IS_ACTIVE);
        data.append("TYPE", type);
        
        try {
          const response = await servicesModule0.createUserAI(data);

          this.isLoader = false; // Kill Loder 
        } catch (error) {
          console.log(error);
        }
      }  
    },

    
    handleClick(newTab) {
      this.currentTab = newTab;
    }, // end tab
    back() {
      this.$router.go(-1);
    }, // back button



    getAllData: async function() {
      var type = this.type; 
      const response = await servicesModule0.getAllActiveInactiveData(type);
      this.model.DURATION = (response.data) ? (response.data.DURATION) : '';
      this.model.IS_ACTIVE = (response.data) ? (response.data.IS_ACTIVE) : 0;
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

   
    
    //----------------------group-----------------/
  },

  computed: {

  },

  data() {
    return {
      // Data for loder
      isLoader: false,
      isDataReady:false,

      AIListCount: null,
      screenAccessListCount: null,
      checkboxArray: [],
      authorizationLevel: null,
      AIListCurrentCount: null,
      header: "",
      field: [],
      count: 1,
      term: null,
      hasModule: false,
      perPage: "10",
      perPageOptions: ["4", "6", "10", "20"],
      AIList: [],
      staffList: [],
      type:'',


      model: {
        DURATION:"",
        IS_ACTIVE:false,
        actionButton:"Save",
      },
      //Module

      //Module & submodule
      Tab1Schema: {
        groups: [
          {
            styleClasses: "row mt-2",
            fields: [
              {
               type: "input",
                inputType: "Number",
                model: "DURATION",
                label: "Duration (Day)",
                placeholder: "00",
                styleClasses: "col-md-12",
                required: true,
                validator: ["required","number"],
              },
            ]
          }
        ]
      },
      

      //Group

      formOptions: {
        validateAfterChanged: true
      }
    };
  }
};
</script>
<style lang="scss">
.va-data-table__pagination {
  margin-top: 1rem;
  display: -webkit-box;
  display: -ms-flexbox;
  display: inherit;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: flex-end;
}

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
</style>

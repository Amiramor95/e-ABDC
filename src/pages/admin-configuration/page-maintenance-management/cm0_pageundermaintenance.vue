<template>
  <va-card>
    <loder v-show="isLoader" />
      <div class="text-center text-danger my-2" v-if="!isDataReady">
        <b-spinner class="align-middle"></b-spinner>
        <strong>Loading...</strong>
      </div>

      <!-- Loader Before Data Load -->
      <div v-else>
        <va-card
             
            >
            <!-- Data will load here -->
                <div class="pmnotification" v-for="(item, key) in listitems" :key="key">
                   <div class="not-title align-middle">{{ item.NOTIFICATION_TITLE}} ( {{ item.MAINTENANCE_START_DATE}} to {{ item.MAINTENANCE_END_DATE}} )</div>
                       <div> <p class="text-center" v-html="item.NOTIFICATION_DESC"></p></div>
                </div>
        <!-- <va-data-table
          :datacount="eventListCount"
          :fields="fields"
          :data="filteredData"
          :per-page="parseInt(perPage)"
        >

        </va-data-table> -->
        </va-card>
        <br />
        <br />
        <br />
        <br />
      </div>   
  </va-card>
</template>
<script>
import Vue from 'vue'
import VueFormGenerator from 'vue-form-generator'
import 'vue-form-generator/dist/vfg.css'
import { debounce } from 'lodash'
import moment from 'moment'
import * as servicesModule0 from '../../../app/module0/services02'
import loder from "../../request_loader";
Vue.use(VueFormGenerator)


export default {
  components: {
    loder
  },

  mounted () {
    this.getPageNotificationList();
    //this.getAllAudience();
  },
  methods: {
    clear () {
      this.dateFormat = null
      this.term = null
    },
   
    async getPageNotificationList () {
        var users = JSON.parse(localStorage.getItem("user"));
        var user_type = users.user_type;
        // if(user_type == "OTHERS")
        // {
        //   var tpuser_type = users.TP_USER_TYPE;
        //   console.log("tpuser_type=",tpuser_type);
        //   if(tpuser_type == 1)
        //   {
        //     user_type = "THIRDPARTY";
        //   }
        //   else{
        //     user_type = "TRAININGPROVIDER";
        //   }
        // }
      const response = await servicesModule0.getPageNotificationListByType(user_type)
      this.listitems = response
      this.eventListCount = this.listitems.length
      //console.log("get all list : ",response);
      this.isDataReady = true; // Kill Component Loder
    },

    details () {
      console.log('jhdfj')
      this.$router.push('/admin/notification_detail')
    },

  },

  computed: {
    

   

  },
  data () {
    return {
      // Data for loder
      isLoader: false,
      isDataReady:false,

      dateFormat: '',
      term: null,
      perPage: '10',
      perPageOptions: ['4', '6', '10', '20'],
      eventListCount: null,
      listitems: [],
      AudienceList:[],

      model: {
        title: '',
        dateCreated: '',
        createdBy: '',
        status: '',
        CAS_LETTER_TITTLE: '',

        adSearch : {
          AUDIENCE:'',
          VARIATION:'',
        },
      },
      VARIATION: [
        { id: "1", name: "ALL", selected: false },
        { id: "2", name: "Administration", selected: false },
        { id: "3", name: "Distributor Management", selected: false },
        { id: "4", name: "Consultant Management", selected: false },
        { id: "5", name: "Fund Management", selected: false },
        { id: "6", name: "CPD Management", selected: false },
        { id: "7", name: "Finance Management", selected: false },
        { id: "8", name: "Annual Fee Management", selected: false },
      ],

      advancedSearchSchema: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                label: "Audience",
                type: "vueMultiSelect",
                model: "adSearch.AUDIENCE",
                placeholder: "Select Audience",
                selectOptions: {
                  multiple: false,
                  key: "SETTING_GENERAL_ID",
                  label: "SET_PARAM",
                  searchable: true
                },
                values: (model, schema) => {
                  return this.AudienceList;
                },
                styleClasses: "col-md-6",
                required: true,
                validator: "required",
              },
              {
                label: "Module Under Maintenance",
                type: "vueMultiSelect",
                model: "adSearch.VARIATION",
                placeholder: "Select Audience",
                selectOptions: {
                  multiple: false,
                  key: "id",
                  label: "name",
                  searchable: true
                },
                values: (model, schema) => {
                  return this.VARIATION;
                },
                styleClasses: "col-md-6",
                required: true,
                validator: "required",
              },

            ],
          },
        ],
      },

    }
  },
}
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

.bgcolor {
  background-color: white !important;
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
    border-bottom: 1px solid #bab9b9;
    justify-content: center;
}
.not-title{
    text-align: center;
    font-weight: bold;
    margin-bottom: 20px;
    color: red;
}
</style>


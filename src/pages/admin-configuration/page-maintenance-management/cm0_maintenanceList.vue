<template>
  <va-card>
    <loder v-show="isLoader" />

      <template slot="header">
        <br />
        <div class="row">
          <div class="col">
            <h4 class="card-title">Page Maintenance</h4>
          </div>
          <div class="col float-right">
            <div class="float-right">
              <h5>
                <b-badge v-b-toggle.collapse-1 class="ml-1 mr-1" variant="secondary"
                ><i class="fa fa-search"></i
                ></b-badge>

                <span
                  v-b-tooltip.hover
                  title="create"
                  v-on:click="create"
                  class="badge badge-primary"
                >
                  <i class="fa fa-plus"></i
                  ></span>
              </h5>
            </div>
          </div>
        </div>

        

      </template>

      <!-- advanced search form -->
        <b-collapse id="collapse-1" class="mt-2">
          <b-card>
            <vue-form-generator
              :model="model"
              :schema="advancedSearchSchema"
              ref="advancedSearchForm"
            >
            </vue-form-generator>
            <br />
            <button
              v-on:click="searchData()"
              type="button"
              class="ml-2 btn btn-sm btn-primary"
            >
              Search
            </button>
            <button

              type="button"
              class="ml-2 btn btn-sm btn-danger"
            >
              Reset
            </button>
          </b-card>
        </b-collapse>
        
      <br />
      <div class="text-center text-danger my-2" v-if="!isDataReady">
        <b-spinner class="align-middle"></b-spinner>
        <strong>Loading...</strong>
      </div>

      <!-- Loader Before Data Load -->
      <div v-else>

        <div class="row">
          <div class="flex md3 offset--md9">
            <va-input
              :value="term"
              :placeholder="$t('Search')"
              @input="searchPage"
              removable
            >
              <va-icon name="fa fa-search" slot="prepend" />
            </va-input>
          </div>
        </div>
        <!-- <br /> -->
        <!-- <div class="float-left">
          <va-date-picker
            :value="term"
            @input="searchDate"
            :config="{ enableTime: false, dateFormat: 'd-m-Y' }"
            v-model="dateFormat"
          />
        </div> -->
        <!-- Main table element -->
        <!-- <div class="col-ml-2"> -->
        <va-data-table
          :datacount="eventListCount"
          :fields="fields"
          :data="filteredData"
          :per-page="parseInt(perPage)"
        >
          <!-- A virtual column -->
          <template slot="no" slot-scope="row">
            {{ row.rowIndex + 1 }}
          </template>
          <template slot="actions" slot-scope="props">
            <h4 class="mt-2">
              <span
                v-b-tooltip.hover
                title="detail"
                v-on:click="details(props.rowData)"
                class="badge badge-success mr-2"
              >
                <i class="fa fa-bars"></i
                ></span>
              <span
                v-b-tooltip.hover
                title="edit"
                v-on:click="edit(props.rowData)"
                class="badge badge-primary mr-2"
              >
                <i class="fa fa-edit"></i
                ></span>
              <span
                v-b-tooltip.hover
                title="delete"
                v-on:click="deleteItem(props.rowData)"
                class="badge badge-danger mr-1"
              >
                <i class="fa fa-trash"></i
                ></span>
            </h4>
          </template>
        </va-data-table>
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
    this.getAllList();
    this.getAllAudience();
  },
  methods: {
    clear () {
      this.dateFormat = null
      this.term = null
    },
    async searchData(){
      this.isLoader = true; // Loder 
      const data = new FormData()
      data.append("VARIETION", this.model.adSearch.VARIATION.name);
      data.append("AUDIENCE", this.model.adSearch.AUDIENCE.SETTING_GENERAL_ID);
      const response = await servicesModule0.searchAllPageMaintenanceList(data)
      this.items = response
      this.eventListCount = this.items.length;
      this.model.adSearch.VARIATION = '';
      this.model.adSearch.AUDIENCE = '';
      this.isLoader = false; // kill Loder
      
    },
    async getAllList () {
      const response = await servicesModule0.getAllPageMaintenanceList()
      this.items = response
      this.eventListCount = this.items.length
      // console.log("get all event : " + response);
      this.isDataReady = true; // Kill Component Loder
    },

    searchPage: debounce(function (term) {
      this.term = term
      //console.log(this.term)
    }, 400),

    details (data) {
      //this.$router.push('/admin/notification_detail')
      this.$router.push({
        name: "pmnotification-detail",
        params: {PAGE_MAINTENANCE_ID: data.PAGE_MAINTENANCE_ID }
      });
    },

    async deleteItem (data) {
      if (confirm("Are you sure you want to delete?")){
        this.isLoader = true; // Loder Before add
        // eslint-disable-next-line no-unused-vars
        const response = await servicesModule0.deletePageMaintenance(
          data.PAGE_MAINTENANCE_ID,
        )
        this.getAllList();
        this.isLoader = false; // kill Loder
      }
    },

    edit (data) {
      // this.$router.push("/admin/announcement_details");
      // this.$router.push({
      //   name: "edit-letter",
      //   params: { CAS_LETTER_ID: data.CAS_LETTER_ID }
      // });
      //localStorage.setItem('maintenance-edit', JSON.stringify(data))
      //console.log(data.PAGE_MAINTENANCE_ID);
      this.$router.push({
        name: 'maintenance-edit',
        params: { PAGE_MAINTENANCE_ID: data.PAGE_MAINTENANCE_ID }
      });
    },
    getAllAudience: async function () {
      const response = await servicesModule0.getAllAudienceList(
        "AUDIENCE"
      );
      this.AudienceList = response;
      this.isDataReady = true; // Kill Component Loder
    },

    create () {
      this.$router.push('/fimm/maintenance-newPage')
    },

    reset () {},
  },

  computed: {
    fields () {
      return [
        {
          name: '__slot:marker',
          width: '30px',
          dataClass: 'text-center',
        },
        {
          name: '__slot:no',
          title: 'No',
          // width: "30px"
          // height: "45px"
          // dataClass: "text-center"
        },
        {
          name: 'START_DATE',
          title: 'START DATE',
          
        },
        {
          name: 'END_DATE',
          title: 'END DATE',
        },
        {
          name: 'SET_PARAM',
          title: 'AUDIENCE',
        },
        // {
        //   name: 'MAINTENANCE_MODULE',
        //   title: 'MODULE',
        // },
        {
          name: 'USER_NAME',
          title: 'CREATION BY',
        },
        {
          name: '__slot:actions',
          title: 'Action',
          dataClass: 'justify-content-center',
          width: '15%',
        },
      ]
    },

    filteredData() {
      if (!this.term || this.term.length < 1) {
        return this.items
      }

      return this.items.filter((item) => {
        return this.term
          .toLowerCase()
          .split(" ")
          .every(
            (v) => 
              (item.USER_NAME) ? item.USER_NAME.toLowerCase().includes(v) : '' ||
              (item.SET_PARAM) ? item.SET_PARAM.toLowerCase().includes(v) : ''
              // item.START_DATE.toLowerCase().startsWith(this.term.toLowerCase()) ||
              // (item.END_DATE) ? item.END_DATE.toString().includes(v) : ''
          );
      });
    },

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
      items: [],
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
</style>


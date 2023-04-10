<template>
  <div v-if="!isReady" style="margin: 25% 0">
    <div class="text-center text-success my-2">
      <b-spinner class="align-middle mr-2"></b-spinner>
      <strong>Loading...</strong>
    </div>
  </div>

  <va-card  v-else>
    <div class="row">
      <h4 slot="header" class="card-title">
        List of Distributors
      </h4>
    </div>

    <!-- list table-->
    <b-row class="justify-content-end">

      <b-col cols="3">
        <va-input
          :value="term"
          :placeholder="$t('Search')"
          @input="search"
          removable
        >
          <va-icon name="fa fa-search" slot="prepend" />
        </va-input>
      </b-col>
    </b-row>
    <div>

      <va-card class="mt-5 col-12">
        <va-data-table
          :fields="RecordFields"
          :data="RecordModuleFilteredData"
          no-data-label="No data found"
          :per-page="parseInt(perPage)"
          :datacount="RecordCount"
          :dataperpage="parseInt(perPage)"
          clickable
        >
          <template slot="no" slot-scope="row">
            {{ row.rowIndex + 1 }}
          </template>
          <template slot="actions" slot-scope="props">
            <h5 class="mt-1">
            <span
              v-b-tooltip.hover
              title="View List of Consultants "
              v-on:click="viewRecord(props.rowData)"
              class="badge badge-primary mr-2"
            >
              <i class="fa fa-bars"></i
              ></span>
            </h5>
          </template>
        </va-data-table>
      </va-card>

    </div>

  </va-card>
</template>
<script>
  import * as servicesModule4 from '../../../../app/module4/services01'
  import Vue from 'vue'
  import Multiselect from 'vue-multiselect'
  import RemarkPopup from '../../distributor/modules/components/remarkPopup'
  import { debounce } from 'lodash'

  export default {
    mounted () {
      this.getDistributors();
    },
    methods: {
      // search
      search: debounce(function (term) {
        console.log('test',term);
        this.term = term
      }, 400),

      async getDistributors() {
        try {
          const all_distributors = await servicesModule4.getAllDistributors();
          this.RecordList = all_distributors;
          this.RecordCount=all_distributors.length;
          this.isReady=true;
        } catch (error) {
          console.log(error);
        }
      },

      viewRecord(data){
        this.$router.push({
          name:'f-consultant-points',
          query:{
            DIST_ID:data.DISTRIBUTOR_ID
          }
        });
      }


    },

    computed:{
      RecordFields () {
        return [
          {
            name: '__slot:no',
            title: 'NO',
          },
          {
            name: 'DIST_CODE',
            title: 'DISTRIBUTOR CODE',
            sortField: 'DIST_CODE',
          },
          {
            name: 'DIST_NAME',
            title: 'DISTRIBUTOR NAME',
            sortField: 'DIST_NAME',
          },

          {
            name: "__slot:actions",
            title: "ACTIONS",
            dataClass: "justify-content-center",
            width: "8%",
          },
        ]
      },

      // eslint-disable-next-line vue/return-in-computed-property
      RecordModuleFilteredData () {
        if (!(this.term || this.termDate)) {
          return this.RecordList
        }

        return this.RecordList.filter((item) => {
          if (this.termDate) {
            let convertDate = this.formatDateTimestampToDate(item.SUBMISSION_DATE);
            return convertDate == this.termDate;
          }
          else{
            return this.term
              .toLowerCase()
              .split(' ')
              .every(
                (v) =>
                  (item.DIST_CODE ? item.DIST_CODE.toString().toLowerCase().includes(v) : false) ||
                  (item.DIST_NAME ? item.DIST_NAME.toLowerCase().includes(v) : false)
              )
          }
        })
      },
    },

    components: {
      RemarkPopup,
    },
    data(){
      return{
        isReady:false,

        selected: null,
        title:"",
        MODULE_TYPE:null,
        PROG_TYPE:null,
        PROGDATA: "",
        header: '',
        field: [],
        perPage: '10',
        perPageOptions: ['50', '100', '150', '200'],
        currentPage: 1,
        RecordList: [],
        RecordCount:0,
        count: 1,

        term: null,

        formOptions: {
          validateAfterLoad: false,
          validateAfterChanged: true,
          validateAsync: true,
        },
      }
    }
  };
</script>


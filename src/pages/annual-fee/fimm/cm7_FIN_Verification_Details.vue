<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title"> SUMMARY OF COMPANY </h4>
      <br />
      <div class="col float-right">
        <div class="float-right">
          <h5>
            <b-badge v-b-toggle.collapse-1 class="mr-1" variant="secondary"
            ><i class="fa fa-search"></i
            ></b-badge>
          </h5>
        </div>
      </div>
    </div>
    <!-- list table-->
      <va-card class="mt-5 col-12">
        <va-data-table-extended
          :fields="RecordFields"
          :data="RecordFilteredData"
          no-data-label="No data found"
          :datacount="RecordCount"
          :showPagination="false"
          clickable
        >
          <template slot="no" slot-scope="row">
            {{ row.rowIndex + 1 }}
          </template>
        </va-data-table-extended>

        <br />
        <br />
        <br />
      </va-card>

      <va-card class="mt-5">
        <div class="col-4">

            <h5> UTMC/PRP </h5>
              <b-table stacked hover :items="[{ 
                'UTS GROUP A AUM' : 'RM 345343', 
                'PRS GROUP A AUM' : '	RM 443T4', 
                'TOTAL GROUP A AUM	RM' : 'RM 8494894' 
                }]"> 
              </b-table>
          
              <h5> IUTA/IPRA </h5>
              <b-table stacked :items="[
                {
                  'UTS NORMAL LOADS SALES AUM': 'RM 345343',
                  'PRS NORMAL LOADS SALES AUM': 'RM  4434',
                  'TOTAL NORMAL LOADS SALES AUM' : 'RM 8494894'
                }
              ]">
              </b-table>
              
              <b-table stacked :items="[{
                  'UTS LOW LOADS SALES AUM':'RM 94894',
                  'PRS LOW LOADS SALES AUM':'RM 3433',
                  'TOTAL LOW LOADS SALES AUM':'RM 2343'
                }]">
              </b-table>

              <b-table stacked :items="[{
                  'UTS NO LOADS SALES AUM':'RM 4344',
                  'PRS NO LOADS SALES AUM':'RM 6555',
                  'TOTAL NO LOADS SALES AUM':'RM 455'
               }]">
              </b-table>
        </div>

        <div class="col-12">
            <div class="mt-5">
                 <h5> AUM FUND LIST  </h5>
                 <va-data-table-extended
                  :fields="AUM_HEADERS"
                  :data="AUM_DATAS"
                  no-data-label="No data found"
                  :datacount="AUM_DATAS.length"
                  clickable
                >
                  <template slot="no" slot-scope="row">
                    {{ row.rowIndex + 1 }}
                  </template>
                </va-data-table-extended>
              </div> 

              <div class="mt-5">
                 <h5> TOTAL GROSS SALES FUND LIST  </h5>
                 <va-data-table-extended
                  :fields="TGS_HEADERS"
                  :data="TGS_DATAS"
                  no-data-label="No data found"
                  :datacount="TGS_DATAS.length"
                  clickable
                >
                  <template slot="no" slot-scope="row">
                    {{ row.rowIndex + 1 }}
                  </template>
                </va-data-table-extended>
              </div>  
        </div>
            <div class="mt-5">
                <button
                  @click="back"
                  type="button"
                  class="btn btn-primary btn-fill btn-md"
                  >
                  <i class="fa fa-step-backward" /> &nbsp; Previous
                </button> 
              </div>
     </va-card>




  </va-card>
</template>

<script>
import 'vue-form-generator/dist/vfg.css'
import { debounce } from 'lodash'
import * as servicesModule7 from '../../../app/module7/services05'

export default {
  created () {
    this.getAllRecord()
  },

  components: {},

  methods: {
    create () {
      this.$router.push('/fimm/distributor-Cancellation-Submission')
    },
    
    search: debounce(function (term) {
      this.term = term
    }, 400),

    back () {
      this.$router.go(-1)
    },

    getAllRecord: async function () {
       const aumResponse = await servicesModule7.getAumEntryForDistManager(this.$route.params.DIST_ID)
       const tgsResponse = await servicesModule7.getTGSEntryForDistributorManager(this.$route.params.DIST_ID)
       const fundSumaryDetail = await servicesModule7.getFundSumaryDetail(this.$route.params.DIST_ID)
       if(aumResponse.status === 200){
         this.AUM_DATAS = aumResponse.data.data
       }
       if(tgsResponse.status === 200){
         this.TGS_DATAS = tgsResponse.data.data
       }
       if(fundSumaryDetail.status === 200){
         this.RecordList.push(fundSumaryDetail.data.data)
       }
    },

  },

  computed: {
    
    RecordFields () {
      return [
        {
          name: '__slot:no',
          title: 'NO',
        },
        {
          name: "DIST_NAME",
          title: "DISTRIBUTOR NAME"
        },
        {
          name: "AUM_GROUP_A",
          title: "AUM GROUP A (RM)",
        },
        {
          name: 'AUM_GROUP_B',
          title: 'AUM GROUP B (RM)'
        },
        {
          name: 'NORMAL_LOAD_SALES',
          title: 'NORMAL LOADS SALES (RM)'
        },
        {
          name: 'LOW_LOAD_SALES',
          title: 'LOW LOADS SALES (RM)',
        },
        {
          name: 'NO_LOAD_SALES',
          title: 'NO LOADS SALES (RM)'
        },
        {
          name: 'LEVY_GROUP_A',
          title: 'LEVY GROUP A (RM)',
        },
        {
          name: 'LEVY_GROUP_B',
          title: 'LEVY GROUP B (RM)',
        },
        {
          name: 'ANNUAL_FEES',
          title: 'ANNUAL FEES (RM)'
        },
        {
          name: 'TOTAL_UTC',
          title: 'TOTAL UTC (RM)',
        },
        {
          name: 'TOTAL_PRC',
          title: 'TOTAL PRC (RM)'
        },
        {
          name: 'TOTAL_UTC_PRC',
          title: 'TOTAL UTC PRC (RM)'
        },
        {
          name: 'SPLIT_UTC',
          title: 'SPLIT TOTAL UTC (RM)'
        },
        {
          name: 'SPLIT_PRC',
          title: 'SPLIT TOTAL PRC (RM)'
        },
        {
          name: 'TOTAL_PRC_WAIVER',
          title: 'TOTAL PRC WAIVER (RM)'
        }
      ]
    },

    RecordFilteredData () {
      if (!this.term || this.term.length < 1) {
        return this.RecordList
      }

      return this.RecordList.filter((item) => {
        return this.term

          .split(' ')
          .every(
            // (v) =>
          )
      })
    },
  },

  data () {
    return {
      header: '',
      field: [],
      term: null,
      perPage: '10',
      perPageOptions: ['50', '100', '150', '200'],
      currentPage: 1,
      RecordList: [],
      count: 1,
      RecordCount: null,

      AUM_DATAS:[],
      AUM_HEADERS:[

          {
            name: '__slot:no',
            title: 'NO',
          },
          {
            name: 'FUND_CODE_FIMM',
            title: 'FIMM FUND CODE',
            sortField: 'FUND_CODE_FIMM',
          },
          {
            name: 'FUND_NAME',
            title: 'FUND NAME',
            sortField: 'FUND_NAME',
          },
          {
            name: 'FUND_ASEAN_CIS',
            title: 'CIS STRUCTURE',
            sortField: 'FUND_ASEAN_CIS',
          },
          {
            name: 'GROUP_ASSET',
            title: 'ASSET CLASS',
            sortField: 'GROUP_ASSET',
          },
          {
            name: 'GROUP_FUND',
            title: 'FUND GROUP',
            sortField: 'GROUP_FUND',
          },
          {
            name: 'FOREIGN_EXCHANGE_RATE',
            title: 'FOREIGN EXCHANGE RATE',
            sortField: 'FOREIGN_EXCHANGE_RATE',
          },
          {
            name: 'AUM_AMOUNT',
            title: 'AUM (RM)',
            sortField: 'AUM_AMOUNT',
          }
        ],

        TGS_DATAS:[],
        TGS_HEADERS:[

          {
            name: '__slot:no',
            title: 'NO',
          },
          {
            name: 'FUND_CODE_FIMM',
            title: 'FIMM FUND CODE',
            sortField: 'FUND_CODE_FIMM',
          },
          {
            name: 'FUND_NAME',
            title: 'FUND NAME',
            sortField: 'FUND_NAME',
          },
          {
            name: 'FUND_ASEAN_CIS',
            title: 'CIS STRUCTURE',
            sortField: 'FUND_ASEAN_CIS',
          },
          {
            name: 'GROUP_ASSET',
            title: 'ASSET CLASS',
            sortField: 'GROUP_ASSET',
          },
          {
            name: 'FUND_CATEGORY',
            title: 'FUND CATEGORY',
            sortField: 'FUND_CATEGORY',
          },
          {
            name: 'FOREIGN_EXCHANGE_RATE',
            title: 'FOREIGN EXCHANGE RATE',
            sortField: 'FOREIGN_EXCHANGE_RATE',
          },
          {
            name: 'TGS_AMOUNT',
            title: 'TOTAL GROSS SALES (RM)',
            sortField: 'TGS_AMOUNT',
          },
          {
            name: '__checkbox',
            titleClass: 'center aligned',
            dataClass: 'center aligned',
          },
        ]
    }
  },
}
</script>
<style lang="css">
.va-data-table__pagination {
  margin-top: 1rem;
  display: -webkit-box;
  display: -ms-flexbox;
  display: inherit;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: flex-end;
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

<template>
  <va-card>
    <h4 slot="header" class="card-title">FINANCE SETTING</h4>
    <br />
    <div>
      <tabs
        :tabs="tabs"
        :currentTab="currentTab"
        :wrapper-class="'default-tabs'"
        :tab-class="'default-tabs__item'"
        :tab-active-class="'default-tabs__item_active'"
        :line-class="'default-tabs__active-line'"
        @onClick="handleClick"
      />
      <!-- <div class="content"> -->
      <div v-if="currentTab === 'tab1'">
        <div class="ml-5">
          <br />
          <vue-form-generator
            :model="model"
            :schema="Tab1Schema"
            :options="formOptions"
            ref="Tab1Form"
            @model-updated="onModelUpdated"
          >
          </vue-form-generator>
          <br />
          <div class="text-center">
            <button
              @click="addAccCode"
              type="button"
              class="btn btn-warning btn-fill btn-md"
            >
              <i class="fa fa-plus" /> &nbsp; ADD PARAMETER
            </button>
          </div>
          <br />
          <div class="float-right">
            <va-input
            :value="term"
            :placeholder="$t('Search')"
            @input="searchAccCode"
            removable
            >
        <va-icon name="fa fa-search" slot="prepend" />
      </va-input>
          </div>
          
          <br />
          <h4>LIST OF ACCOUNT CODE</h4>
          <!-- list -->
          <va-card class="mt-2">
            <va-data-table
              :fields="AccCodefields"
              :data="filteredDataAccCode"
              :per-page="parseInt(perPage)"
              :datacount="AccCount"
              clickable>
              <template slot="no" slot-scope="row">
                {{ row.rowIndex + 1 }}
              </template>

              <template slot="actions" slot-scope="props">
                <h4 class="mt-2">
                  <span class="badge badge-danger mr-1" v-on:click="deleteAccCode(props.rowData)">
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

      <!-- State --> 
      <div v-if="currentTab === 'tab2'">
        <div class="ml-5">
          <br />
          <vue-form-generator
            :model="model"
            :schema="Tab2Schema"
            :options="formOptions"
            ref="Tab2Form"
          >
          </vue-form-generator>
          <br />
          <div class="text-center">
            <button
              @click="addGLCode"
              type="button"
              class="btn btn-warning btn-fill btn-md"
            >
              <i class="fa fa-plus" /> &nbsp; ADD PARAMETER
            </button>
          </div>
          <br />
          <div class="float-right">
      <va-input
        :value="term"
        :placeholder="$t('Search')"
        @input="searchGlCode"
        removable
      >
        <va-icon name="fa fa-search" slot="prepend" />
      </va-input>
    </div>
          
          <br />

      <h4>LIST OF COST CENTER</h4>
			  <va-card class="mt-2">
				<va-data-table
				  :fields="GlCodeFields"
				  :data="filteredDataGlCode"
				  :per-page="parseInt(perPage)"
          :datacount="GlCount"
          :dataperpage="parseInt(perPage)"
				clickable>
				  <template slot="no" slot-scope="row">
					{{ row.rowIndex + 1 }}
				  </template>
				  <template slot="actions" slot-scope="props">
					<h4 class="mt-1">
					  <span class="badge badge-danger mr-1" v-on:click="deleteAccGLCode(props.rowData)">
						<i class="fa fa-trash"></i
						></span>
					</h4>
				  </template>
				</va-data-table>
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
        <br />
      </div>

      <!-- </div> -->
    </div>
    <br/>
        <button
          @click="back"
          type="button"
          class="btn btn-primary btn-fill btn-md"
        >
          <i class="fa fa-step-backward" /> &nbsp; Previous
        </button>
  </va-card>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import Vue from 'vue'
import 'vue-form-generator/dist/vfg.css'
import Vudal from 'vudal'
import * as servicesModule0 from "../../../app/module0/services02"
import Tabs from 'vue-tabs-with-active-line'
import { debounce } from "lodash";
const TABS = [
  { title: 'Setting 1 : Account Code', value: 'tab1' },
  { title: 'Setting 2 : Finance Company Code', value: 'tab2' },
]

export default {

  mounted() {
    this.getAllAccCodeType()
    this.getAllAccGLCode()
    this.getAllAccCode()
    this.getAllDistributor()
    this.getAllAccCodeName()
    this.getAllCodeTable()
  },
  created(){
    
  },
  components: {
    Tabs,
    Vudal,
  },

  computed: {
    AccCodefields () {
      return [
        {
          name: '__slot:marker',
          width: '30px',
          dataClass: 'text-center',
        },
        {
          name: '__slot:no',
          title: 'No',
        },
        {
          name: 'REF_NUMBER',
          title: 'REFERENCE TYPE',
        },
        {
          name: 'CODE_TYPE',
          title: 'TRANSACTION TYPE',
        },
        {
          name: 'ACC_CODE',
          title: 'ACCOUNT CODE',
        },
        {
          name: 'FINANCE_ACC_CODE_NAME',
          title: 'ACCOUNT NAME',
        },
         {
          name: 'STATUS',
          title: 'STATUS'
        },
        /*{
          name: '__slot:actions',
          title: 'Action',
           dataClass: 'justify-content-center',
          width: '15%',
        },*/
      ]
    },
    filteredDataAccCode() {
      if (!this.term || this.term.length < 1) {
        return this.AccCodeList
      }
      return this.AccCodeList.filter((item) => {
        return this.term
          .toLowerCase()
          .split(" ")
          .every(
            (v) =>
              item.REF_NUMBER.toLowerCase().includes(v) ||
              item.FINANCE_ACC_CODE_NAME.toLowerCase().includes(v) ||
              item.ACC_CODE.includes(v) || 
              (item.CODE_TYPE ? item.CODE_TYPE.toLowerCase().includes(v) : false) ||
              item.STATUS.toLowerCase().includes(v)
          );
      });
    },

    GlCodeFields () {
      return [
        {
          name: '__slot:marker',
          width: '30px',
          dataClass: 'text-center',
        },
        {
          name: '__slot:no',
          title: 'No',
        },
        {
          name: 'DIST_CODE',
          title: 'DISTRIBUTOR CODE',
        },
        {
          name: 'DISTNAME',
          title: 'DISTRIBUTOR NAME',
        },
        {
          name: 'FIN_CODE',
          title: 'FINANCE COMPANY CODE',
        },
        {
          name: 'STATUS2',
          title: 'STATUS',
        },
      ]
    },

    filteredDataGlCode() {
      if (!this.term || this.term.length < 1) {
        return this.GlCodeList
      }
      return this.GlCodeList.filter((item) => {
        return this.term
          .toLowerCase()
          .split(" ")
          .every(
            (v) =>
              (item.DISTNAME ? item.DISTNAME.toLowerCase().includes(v) : false) ||
              (item.FIN_CODE ? item.FIN_CODE.toLowerCase().includes(v) : false) ||
              (item.STATUS2 ? item.STATUS2.toLowerCase().includes(v) : false ) 
          );
      });
    },

  },

  data () {
    return {
      term: null,
      perPage: '10',
      tabs: TABS,
      currentTab: 'tab1',
      AccCodeList: [],
      GlCodeList: [],
      Distributorlist:[],
      AccCount: null,
      GlCount: null,
      count: 1,
      CodeTypeList: [],
      CodeNameList: [],
      CodeTableList: [],

      referance_type: [
        { name: 'SI',id: '1',},
        { name: 'VC', id: '2' },
      ],
      model: {
        // TAB 1
        referance_type:'',
        ACC_CODE: '' ,
        REF_NUMBER:'',
        ACC_NAME: '' ,
        FINANCE_ACC_CODE_ID: '' ,
        FINANCE_ACC_CODE_TYPE_ID: '',
        FINANCE_ACC_CODE_NAME:'',
        DIST_ID: '',
        GL_CODE: '',
        distSelection: '',
        AccCodeID: '',
        DIST_NAME: '',
        DISTNAME: '',
        FIN_DISTRIBUTOR_NAME: '',
        	FIN_CODE: '',
     FIN_CODE_TABLE_ID: '',
      },

      formOptions: {
        validateAfterChanged: true,
      },

      Tab1Schema: {
        groups: [
          {
            styleClasses: 'row mt-2',
            fields: [
              {
                type: 'vueMultiSelect',
                model: 'referance_type',
                label: 'REFERENCE TYPE',
                placeholder: 'SELECT REFERENCE TYPE',
                required: true,
                validator: 'required',
                styleClasses: 'col-md-2',
                selectOptions: {
                  multiple: false,
                  key: 'id', // id yg nak simpan
                  label: 'name', // value nak display
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.referance_type // get value
                },
              },
              {
                type: "vueMultiSelect",
                inputType: "Text",
                model: "FINANCE_ACC_CODE_TYPE_ID",
                label: "TRANSACTION TYPE",
                placeholder: "SELECT TRANSACTION TYPE",
                selectOptions: {
                  multiple: false,
                  key: "FINANCE_ACC_CODE_TYPE_ID",
                  label: "CODE_TYPE",
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.CodeTypeList;
                },
                styleClasses: "col-md-3",
              },
              {
                type: 'input',
                inputType: 'Text',
                model: 'ACC_CODE',
                label: 'ACCOUNT CODE',
                placeholder: 'ENTER ACCOUNT CODE',
                required: true,
                validator: 'required',
                styleClasses: 'col-md-3',
              },
              {
                type: 'input',
                inputType: 'Text',
                model: 'FINANCE_ACC_CODE_NAME',
                label: 'ACCOUNT NAME',
                placeholder: 'ENTER ACCOUNT NAME',
                required: true,
                validator: 'required',
                styleClasses: 'col-md-4',
              },
            ]
          }
        ]
      },
      Tab2Schema: {
        groups: [
          {
            styleClasses: 'row mt-2',
            fields: [
              {
                type:  'vueMultiSelect',
                model: 'DISTNAME',
                label: 'DISTRIBUTOR NAME',
                placeholder: 'SELECT DISTRIBUTOR',
                selectOptions: { multiple: false, key: 'DIST_ID', label: 'DIST_NAME', searchable: true},
                values: (model, schema) => { return this.Distributorlist},
                required: true,
                validator: 'required',
                styleClasses: 'col-md-4',
              },
              {
                type: 'input',
                inputType: 'text',
                model: 'FIN_CODE',
                label: 'FINANCE COMPANY CODE',
                placeholder: 'Enter Finance Company Code',
                required: true,
                validator: 'required',
                styleClasses: 'col-md-4',
              },
            ]
          }
        ]
      },
    }
  },

  methods: {


      displayTransactionType(fieldId){
       const code =  this.CodeTypeList.filter(x => x.FINANCE_ACC_CODE_TYPE_ID === fieldId)
       return code.length ? code[0].CODE_TYPE : '-'
      
    },



    displayedAccountStatus(status){
      return parseInt(status) === 1 ? 'ACTIVE' : 'INACTIVE';
    },


    handleClick (newTab) { this.currentTab = newTab }, // end tab
    back () { this.$router.go(-1) }, // end tab

    //search Acc Code
    searchAccCode: debounce(function (term) {
      this.term = term;
      
    }, 400),

    //search gl code
    searchGlCode: debounce(function (term) {
      this.term = term;
    }, 400),
 
    //ACC CODE
    getAllAccCodeType: async function() {
    const response = await servicesModule0.getAllAccCodeTypeList();
    this.CodeTypeList = response;
    },
    getAllAccCodeName: async function() {
    const response = await servicesModule0.getAllAccCodeNameList();
    this.CodeNameList = response;
    },

    getAllAccCode: async function() {
      const response = await servicesModule0.getAllAccCodeList();
      this.AccCodeList = response;
      this.AccCount = this.AccCodeList.length;
    },

    async addAccCode () {
    if (this.$refs.Tab1Form.validate()) {
      const data = new FormData()
      data.append('REF_NUMBER', this.model.referance_type.name)
      data.append('ACC_CODE', this.model.ACC_CODE)
      data.append('ACC_NAME', this.model.ACC_NAME)
      data.append('FINANCE_ACC_CODE_TYPE_ID', this.model.FINANCE_ACC_CODE_TYPE_ID.FINANCE_ACC_CODE_TYPE_ID)
      data.append('FINANCE_ACC_CODE_NAME', this.model.FINANCE_ACC_CODE_NAME)
      data.append('STATUS', 1)
      try {
        // eslint-disable-next-line no-unused-vars
        const response = await servicesModule0.createAccCode(data)
        this.getAllAccCode()
      } catch (error) {
        
      }
    }
    },

    onModelUpdated(newVal, schema) {
      if (schema == "FINANCE_ACC_CODE_NAME") {
        this.model.FINANCE_ACC_CODE_NAME = String(newVal).toUpperCase();
      }
    },

    async deleteAccCode(data) {
      if (confirm("Are you sure you want to delete?")) {
    // eslint-disable-next-line no-unused-vars
        const response = await servicesModule0.deleteAccCode(data.FINANCE_ACC_CODE_ID)
        this.getAllAccCode()
      }
    },

  // ----------------- Code Setting---------------

  getAllCodeTable: async function() {
    const response = await servicesModule0.getAllCodeTabelList();
    this.CodeTableList = response;
    },

  getAllDistributor: async function() {
    const response = await servicesModule0.getAllDistributorList();
    this.Distributorlist = response;
    },

  getAllAccGLCode: async function() {
    const response = await servicesModule0.getAllGlCodeList();
    this.GlCodeList = response;
    this.GlCount = this.GlCodeList.length;
    },

    async addGLCode () {
    if (this.$refs.Tab2Form.validate()) {
      const data = new FormData()
      // data.append('FINANCE_ACC_CODE_ID', this.model.AccCodeID.FINANCE_ACC_CODE_ID)
	    data.append('DIST_ID', this.model.DISTNAME.DIST_ID)
      // data.append('FIN_DISTRIBUTOR_NAME', this.model.FIN_DISTRIBUTOR_NAME)
      data.append('FIN_CODE', this.model.FIN_CODE)
      data.append('FINANCE_CODE_TABLE_ID', this.model.FIN_CODE_TABLE_ID.FINANCE_CODE_TABLE_ID)
      data.append('STATUS', 1)
      try {
        // eslint-disable-next-line no-unused-vars
        const response = await servicesModule0.createGLCode(data)
        this.getAllAccGLCode()
      } catch (error) {
        
      }
    }
    },
    async deleteAccGLCode(data) {
    // eslint-disable-next-line no-unused-vars
    const response = await servicesModule0.deleteAccGLCode(data.FINANCE_ACC_GLCODE_ID)
    this.getAllAccGLCode()
    },
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
</style>



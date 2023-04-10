<template>
  <va-card>
    <h4 slot="header" class="card-title">Address Setting</h4>
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
          >
          </vue-form-generator>
          <br />
          <div class="text-center">
            <button
              @click="addCountry"
              type="button"
              class="btn btn-warning btn-fill btn-md"
            >
              <i class="fa fa-plus" /> &nbsp; Add Parameter
            </button>
          </div>
          <br />
          <h4>List of Country</h4>
          <!-- list -->
          <va-card class="mt-2">
            <va-data-table
              :fields="countryfields"
              :data="filteredDataCountry"
              :per-page="parseInt(perPage)"
            >
              <template slot="no" slot-scope="row">
                {{ row.rowIndex + 1 }}
              </template>

              <template slot="actions" slot-scope="">
                <h4 class="mt-2">
                  <span class="badge badge-primary mr-1">
                    <i class="fa fa-edit"></i
                    ></span>
                  <span class="badge badge-danger mr-1"
                  ><i class="fa fa-trash"></i
                  ></span>
                </h4>
              </template>
            </va-data-table>
            <br />
            <div class="float-left">
              <button
                @click="addPostcode"
                type="button"
                class="btn btn-primary btn-fill btn-md"
              >
                <i class="fa fa-upload" /> &nbsp; Bulk Upload
              </button>
            </div>
          </va-card>
        </div>
      </div>
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
              @click="addState"
              type="button"
              class="btn btn-warning btn-fill btn-md"
            >
              <i class="fa fa-plus" /> &nbsp; Add Parameter
            </button>
          </div>
          <br />

          <!-- list -->
          <h4>List of State</h4>
          <va-card class="mt-2">
            <va-data-table
              :fields="statefields"
              :data="filteredDataState"
              :per-page="parseInt(perPage)"
            >
              <template slot="no" slot-scope="row">
                {{ row.rowIndex + 1 }}
              </template>
              <template slot="actions" slot-scope="">
                <h4 class="mt-2">
                  <span class="badge badge-primary mr-1"
                  ><i class="fa fa-edit"></i
                  ></span>
                  <span class="badge badge-danger mr-1">
                    <i class="fa fa-trash"></i
                    ></span>
                </h4>
              </template>
            </va-data-table>
            <div class="float-left">
              <button
                @click="addPostcode"
                type="button"
                class="btn btn-primary btn-fill btn-md"
              >
                <i class="fa fa-upload" /> &nbsp; Bulk Upload
              </button>
            </div>
          </va-card>
        </div>
      </div>
      <div v-if="currentTab === 'tab3'">
        <div class="ml-5">
          <br />
          <vue-form-generator
            :model="model"
            :schema="Tab3Schema"
            :options="formOptions"
            ref="Tab3Form"
          >
          </vue-form-generator>
          <br />
          <div class="text-center">
            <button
              @click="addPostcode"
              type="button"
              class="btn btn-warning btn-fill btn-md"
            >
              <i class="fa fa-plus" /> &nbsp; Add Parameter
            </button>
          </div>
          <br />
          <!-- list -->
          <h4>List of Postcode</h4>
          <va-card class="mt-2">
            <va-data-table
              :fields="postcodefields"
              :data="filteredDataPostcode"
              :per-page="parseInt(perPage)"
            >
              <template slot="no" slot-scope="row">
                {{ row.rowIndex + 1 }}
              </template>
              <template slot="actions" slot-scope="">
                <h4 class="mt-2">
                  <span class="badge badge-primary mr-1"
                  ><i class="fa fa-edit"></i
                  ></span>
                  <span class="badge badge-danger mr-1">
                    <i class="fa fa-trash"></i
                    ></span>
                </h4>
              </template>
            </va-data-table>
            <br />
            <div class="float-left">
              <button
                @click="addPostcode"
                type="button"
                class="btn btn-primary btn-fill btn-md"
              >
                <i class="fa fa-upload" /> &nbsp; Bulk Upload
              </button>
            </div>
          </va-card>
        </div>
      </div>
      <!-- </div> -->
    </div>
  </va-card>
</template>
<script>
import Vue from 'vue'
import 'vue-form-generator/dist/vfg.css'
import Tabs from 'vue-tabs-with-active-line'
const TABS = [
  { title: 'Setting 1 : Country', value: 'tab1' },
  { title: 'Setting 2 : State', value: 'tab2' },
  { title: 'Setting 3 : Postcode', value: 'tab3' },
]
export default {
  components: {
    Tabs,
  },

  computed: {
    countryfields () {
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
          name: 'countryName',
          title: 'Country Name',
          // width: "30%"
        },
        {
          name: 'countryCode',
          title: 'Country Code',
          // width: "30%"
        },
        {
          name: '__slot:actions',
          title: 'Action',
          dataClass: 'justify-content-center',
          width: '15%',
        },
      ]
    },
    statefields () {
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
          name: 'stateCountry',
          title: 'Country Name',
          // width: "30%"
        },
        {
          name: 'state',
          title: 'State',
          // width: "30%"
        },
        {
          name: '__slot:actions',
          title: 'Action',
          dataClass: 'justify-content-center',
          width: '15%',
        },
      ]
    },
    postcodefields () {
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
          name: 'pCountry',
          title: 'State',
          // width: "30%"
        },
        {
          name: 'pPostcode',
          title: 'Postcode',
          // width: "30%"
        },
        {
          name: 'pCity',
          title: 'City',
          // width: "30%"
        },
        {
          name: '__slot:actions',
          title: 'Action',
          dataClass: 'justify-content-center',
          width: '15%',
        },
      ]
    },
    filteredDataCountry () {
      if (!this.term || this.term.length < 1) {
        return this.countryList
      }

      return this.countryList.filter(item => {
        return item.title.toLowerCase().startsWith(this.term.toLowerCase())
      })
    },
    filteredDataState () {
      if (!this.term || this.term.length < 1) {
        return this.stateList
      }

      return this.stateList.filter(item => {
        return item.title.toLowerCase().startsWith(this.term.toLowerCase())
      })
    },

    filteredDataPostcode () {
      if (!this.term || this.term.length < 1) {
        return this.postcodeList
      }

      return this.postcodeList.filter(item => {
        return item.title.toLowerCase().startsWith(this.term.toLowerCase())
      })
    },
  },

  data () {
    return {
      term: null,
      perPage: '6',
      perPageOptions: ['4', '6', '10', '20'],
      tabs: TABS,
      currentTab: 'tab1',

      currentPageCountry: 1,
      countryList: [],
      // countryAudienceList:[
      //                       { id:"0",name:"Global"},
      //                       { id:"1",name:"A.D.Fincancia Sdn. Bhd."},
      //                       { id:"2",name:"Affin Bank Berhad"},
      //                       { id:"3",name:"Affin Hwang Asset Management Berhad"},
      //                       { id:"4",name:"AIA Pension and Asset Management Sdn. Bhd."},
      //                       { id:"5",name:"Manulife Investment Management (M) Berhad"}
      //                     ],

      currentPageState: 1,
      stateList: [],
      stateFields: [
        // A virtual column that doesn't exist in items
        { key: 'index', label: 'No' },
        // A column that needs custom formatting
        { key: 'stateCountry', label: 'Country Name' },
        { key: 'state', label: 'State' },
        // { key: "stateAudience", label:"Audience Category"},
        { key: 'actions', label: 'Action' },
      ],
      // stateAudienceList:[
      //                       { id:"0",name:"Global"},
      //                       { id:"1",name:"A.D.Fincancia Sdn. Bhd."},
      //                       { id:"2",name:"Affin Bank Berhad"},
      //                       { id:"3",name:"Affin Hwang Asset Management Berhad"},
      //                       { id:"4",name:"AIA Pension and Asset Management Sdn. Bhd."},
      //                       { id:"5",name:"Manulife Investment Management (M) Berhad"}
      //                   ],
      countryStateList: [{ id: '1', name: 'Malaysia' }],

      currentPagePostCode: 1,
      postcodeList: [],
      postcodeFields: [
        // A virtual column that doesn't exist in items
        { key: 'index', label: 'No' },
        // A column that needs custom formatting
        { key: 'pCountry', label: 'Country Name' },
        { key: 'pState', label: 'State' },
        { key: 'pPostcode', label: 'Postcode' },
        { key: 'pCity', label: 'City' },
        { key: 'actions', label: 'Action' },
      ],

      pStateList: [
        { id: '1', name: 'Selangor' },
        { id: '2', name: 'Kelantan' },
        { id: '3', name: 'Pahang' },
        { id: '4', name: 'Melaka' },
      ],

      model: {
        // TAB 1
        // countryAudience:{ id:"0",name:"Global"},
        countryName: '',
        countryCode: '',
        // TAB 2
        // stateAudience:{ id:"0",name:"Global"},
        stateCountry: { id: '1', name: 'Malaysia' },
        state: '',

        // TAB 3
        pCountry: { id: '1', name: 'Malaysia' },
        pState: '',
        pPostcode: '',
        pCity: '',
      },

      formOptions: {
        validationErrorClass: 'has-error',
        validateAfterChanged: true,
      },

      Tab1Schema: {
        groups: [
          {
            styleClasses: 'row mt-2',
            fields: [
              //  {
              //              type: "vueMultiSelect",
              //             model: "countryAudience",
              //             label: "Audience Category",
              //     selectOptions: {multiple: false,key: "name",label: "name",searchable: true},
              //            values: (model, schema) => {return this.countryAudienceList;},
              //      styleClasses: "col-md-4"
              //  },
              {
                type: 'input',
                inputType: 'Text',
                model: 'countryName',
                label: 'Country Name',
                placeholder: 'Enter country Name',
                required: true,
                styleClasses: 'col-md-8',
                hint: 'e.g. Malaysia ',
              },
              {
                type: 'input',
                inputType: 'text',
                model: 'countryCode',
                label: 'Country Code',
                placeholder: 'Enter country code',
                styleClasses: 'col-md-2',
                hint: 'e.g. +06 ',
              },
            ],
          },
        ],
      },

      Tab2Schema: {
        groups: [
          {
            styleClasses: 'row mt-2',
            fields: [
              //  {
              //              type: "vueMultiSelect",
              //             model: "stateAudience",
              //             label: "Audience Category",
              //     selectOptions: {multiple: false,key: "name",label: "name",searchable: true},
              //            values: (model, schema) => {return this.stateAudienceList;},
              //      styleClasses: "col-md-4"
              //  },
              {
                type: 'vueMultiSelect',
                model: 'stateCountry',
                label: 'Country',
                selectOptions: {
                  multiple: false,
                  key: 'name',
                  label: 'name',
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.countryStateList
                },
                styleClasses: 'col-md-5',
              },
              {
                type: 'input',
                inputType: 'text',
                model: 'state',
                label: 'State Name',
                placeholder: 'Enter state name',
                styleClasses: 'col-md-5',
              },
            ],
          },
        ],
      },

      Tab3Schema: {
        groups: [
          {
            styleClasses: 'row mt-2',
            fields: [
              {
                type: 'vueMultiSelect',
                model: 'pCountry',
                label: 'Country',
                selectOptions: {
                  multiple: false,
                  key: 'name',
                  label: 'name',
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.countryStateList
                },
                styleClasses: 'col-md-3',
              },
              {
                type: 'vueMultiSelect',
                model: 'pState',
                label: 'State',
                selectOptions: {
                  multiple: false,
                  key: 'name',
                  label: 'name',
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.pStateList
                },
                styleClasses: 'col-md-3',
              },
              {
                type: 'input',
                inputType: 'text',
                model: 'pPostcode',
                label: 'Postcode',
                placeholder: 'Enter postcode',
                styleClasses: 'col-md-2',
              },
              {
                type: 'input',
                inputType: 'text',
                model: 'pCity',
                label: 'City',
                placeholder: 'Enter City',
                styleClasses: 'col-md-3',
              },
            ],
          },
        ],
      },
    }
  },

  methods: {
    handleClick (newTab) {
      this.currentTab = newTab
    }, // end tab

    addCountry () {
      if (this.$refs.Tab1Form.validate()) {
        var countryInfo = {
          countryName: this.model.countryName,
          countryCode: this.model.countryCode,
          // countryAudience:this.model.countryAudience.name
        }

        this.countryList.unshift(countryInfo)
        console.log(JSON.stringify(this.countryList));

        (this.model.countryName = ''), (this.model.countryCode = '')
        // this.model.countryAudience={ id:"0",name:"Global"}
      }
    },
    addState () {
      if (this.$refs.Tab2Form.validate()) {
        var stateInfo = {
          stateCountry: this.model.stateCountry.name,
          state: this.model.state,
          //  stateAudience:this.model.stateAudience.name
        }

        this.stateList.unshift(stateInfo)
        console.log(JSON.stringify(this.stateList));

        (this.model.stateCountry = ''), (this.model.state = '')
        //  this.model.stateAudience={ id:"0",name:"Global"}
      }
    },

    addPostcode () {
      if (this.$refs.Tab3Form.validate()) {
        var postcodeInfo = {
          pCountry: this.model.pCountry.name,
          pState: this.model.pState.name,
          pPostcode: this.model.pPostcode,
          pCity: this.model.pCity,
        }

        this.postcodeList.unshift(postcodeInfo)
        console.log(JSON.stringify(this.postcodeList));

        (this.model.pCountry = ''),
        (this.model.pState = ''),
        (this.model.pPostcode = ''),
        (this.model.pCity = '')
      }
    },
  },
}
</script>

<style lang="scss">
.app-layout__main {
  background: #e8e8e8;
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

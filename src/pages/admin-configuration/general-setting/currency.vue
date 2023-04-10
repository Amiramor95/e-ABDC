/* eslint-disable no-unused-expressions */
<template>
  <va-card>
      <vudal name="simpleModalEditSalutation" class="widthModal">
      <div class="header">Edit Currency<i class="close icon">&times;</i></div>
      <div class="content">
        <vue-form-generator
          :model="model"
          :schema="editCurrencySchema"
          :options="formOptions"
          ref="TabEditForm"
        />
      </div>
      <div class="actions">
        <button
          type="button"
          value="PUT"
          class="cancel vudal-btn mr-2 btn btn-danger btn-fill btn-md"
        >
          <i class="fa fa-times" /> &nbsp; Close
        </button>
        <button
          @click="updateCurrencyAPI"
          type="button"
          class="cancel vudal-btn mr-2 btn btn-primary btn-fill btn-md"
        >
          <i class="fa fa-edit" /> &nbsp; Update
        </button>
      </div>
    </vudal>
    <h4 slot="header" class="card-title">CURRENCY SETTING</h4>
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
              @click="addCurrency"
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
          @input="searchSalutation"
          removable
          >
        <va-icon name="fa fa-search" slot="prepend" />
      </va-input>
     </div>
          <br />
          <h4>LIST OF CURRENCY </h4>
          <!-- list -->
          <va-card class="mt-2">
            <va-data-table
              :fields="Currencyfields"
              :data="filteredDataCurrency"
              :per-page="parseInt(perPage)"
              :datacount="Currency"
              :dataperpage="parseInt(perPage)"
            clickable>
              <template slot="no" slot-scope="row">
                {{ row.rowIndex + 1 }}
              </template>

              <template slot="actions" slot-scope="props">
                <h4 class="mt-2">
                    <span
                    class="badge badge-primary mr-1"
                    v-on:click="editCurrency(props.rowData)"
                  >
                    <i class="fa fa-edit"></i
                  ></span>
                  <span class="badge badge-danger mr-1" v-on:click="deleteCurrency(props.rowData)">
                    <i class="fa fa-trash"></i></span>
                </h4>
              </template>
            </va-data-table>
            <br />
          </va-card>
        </div>
      </div>
      <!-- </div> -->
    </div>
    <br/>
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
//   { title: 'Setting 1 : Account Code', value: 'tab1' },
]

export default {

  mounted() {
    this.getAllCurrency()

  },
  components: {
    Tabs,
    Vudal,
  },

  computed: {
    Currencyfields () {
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
          name: 'SET_PARAM',
          title: 'CURRENCY',
        },
        {
          name: '__slot:actions',
          title: 'Action',
          dataClass: 'justify-content-center',
          width: '15%',
        },
      ]
    },
    filteredDataCurrency() {
      if (!this.term || this.term.length < 1) {
        return this.CurrencyList
      }

      return this.CurrencyList.filter((item) => {
        return this.term
          .toLowerCase()
          .split(" ")
          .every(
            (v) =>
              item.SET_PARAM.toLowerCase().includes(v) 
          );
      });
    },
  },
  data () {
    return {
      term: null,
      perPage: 10,
      tabs: TABS,
      currentTab: 'tab1',
      CurrencyList: [],
      GlCodeList: [],
      Distributorlist:[],
      Currency: null,
      GlCount: null,
      count: 1,
      model: {
        SET_PARAM: '',

        editCurrency: {
            SET_PARAM: '',
        },
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
                type: 'input',
                inputType: 'Text',
                model: 'SET_PARAM',
                label: 'CURRENCY',
                placeholder: 'ENTER CURRENCY',
                required: true,
                validator: "required",
                styleClasses: 'col-md-12',
              },
            ]
          }
        ]
      },
      editCurrencySchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "input",
                inputType: "Text",
                model: "editCurrency.SET_PARAM",
                label: "Currency",
                required: true,
                validator: "required",
                placeholder: "Enter Currency",
                styleClasses: "col-md-12",

              },
            ],
          },
        ],
      },
    }
  },

  methods: {
    handleClick (newTab) { this.currentTab = newTab }, // end tab
   back() {
      this.$router.push("/fimm/general-setting");
    },

    //search Acc Code
    searchSalutation: debounce(function (term) {
      this.term = term;
      console.log(this.term);
    }, 400),

    //search gl code
    searchGlCode: debounce(function (term) {
      this.term = term;
      console.log(this.term);
    }, 400),
    //ACC CODE

    getAllCurrency: async function() {
    const response = await servicesModule0.getAllSettingGeneralList("CURRENCY");
    this.CurrencyList = response;
    this.Currency = this.CurrencyList.length;
    },

    async addCurrency () {
    if (this.$refs.Tab1Form.validate()) {
      const data = new FormData()
      data.append('SET_PARAM', this.model.SET_PARAM)
	  data.append('SET_TYPE', 'CURRENCY')
      try {
        // eslint-disable-next-line no-unused-vars
        const response = await servicesModule0.createSettingGeneral(data)
        this.getAllCurrency()
      } catch (error) {
        console.log(error)
      }
    }
    },

    async deleteCurrency(data) {
      if (confirm("Are you sure you want to delete?")) {
    // eslint-disable-next-line no-unused-vars
    const response = await servicesModule0.deleteSettingGeneral(data.SETTING_GENERAL_ID)
    this.getAllCurrency()
      }
    },

    async editCurrency (data) {
    const response = await servicesModule0.getSettingGeneralById(data.SETTING_GENERAL_ID)
    this.$modals.simpleModalEditSalutation.$show()
    this.SETTING_GENERAL_ID = response.SETTING_GENERAL_ID
    this.model.editCurrency = response
    },

    async updateCurrencyAPI () {
      if (this.$refs.TabEditForm.validate()) {
        try {
        const data = new FormData()
        data.append('SETTING_GENERAL_ID', this.SETTING_GENERAL_ID)
        data.append('SET_PARAM', this.model.editCurrency.SET_PARAM)
        // console.log("data :" + data);
        // eslint-disable-next-line no-unused-vars
        const response = await servicesModule0.updateSettingGeneral(data)
        this.getAllCurrency()
        } catch (error) {
        console.log(error)
        }
      }
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



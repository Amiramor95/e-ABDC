

/* eslint-disable no-unused-expressions */
<template>
  <va-card>
    <loder v-show="isLoader" />

    <div class="text-center text-danger my-2" v-if="!isDataReady">
      <b-spinner class="align-middle"></b-spinner>
      <strong>Loading...</strong>
    </div>
    <div v-else >

        <vudal name="simpleModalEditGender" class="widthModal">
          <div class="header">Edit AMSF Declaration<i class="close icon">&times;</i></div>
          <div class="content">
            <vue-form-generator
              :model="model"
              :schema="editRegDecSchema"
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
              @click="updateDeclarationAPI"
              type="button"
              class="cancel vudal-btn mr-2 btn btn-primary btn-fill btn-md"
            >
              <i class="fa fa-edit" /> &nbsp; Update
            </button>
          </div>
        </vudal>
      <div class="col-lg-10">
          <h4 slot="header">SETTING BY MODULE</h4>
        </div>
          <h5>
            <i class="fa fa-bank"></i>&nbsp;&nbsp; <b>AMSF/ANNUAL FEES SUBMISSION DECLARATION</b>
          </h5>
          <hr />
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
                @click="addRegDec"
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
              @input="searchDeclaration"
              removable
              >
          <va-icon name="fa fa-search" slot="prepend" />
        </va-input>
        </div>
            <br />
            <h4>LIST OF DECLARATION</h4>
            <!-- list -->
            <va-card class="mt-2 col-lg-12">
              <va-data-table
                :fields="Declarationfields"
                :data="filteredDataRegistrationDeclaration"
                :per-page="parseInt(perPage)"
                :datacount="regDecCount"
                :dataperpage="parseInt(perPage)"
              clickable>
                <template slot="no" slot-scope="row">
                  {{ row.rowIndex + 1 }}
                </template>

                <template slot="actions" slot-scope="props">
                  <h4 class="mt-2">
                      <span
                      class="badge badge-primary mr-1"
                      v-on:click="editDistributorRegDec(props.rowData)"
                    >
                      <i class="fa fa-edit"></i
                    ></span>
                    <span class="badge badge-danger mr-1" v-on:click="deleteDeclaration(props.rowData)">
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
    </div>    
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
import loder from "../../request_loader";
const TABS = [
//   { title: 'Setting 1 : Account Code', value: 'tab1' },
]

export default {

  mounted() {
    this.getAllRegistrationDeclaration()

  },
  components: {
    Tabs,
    Vudal,
    loder
  },

  computed: {
    Declarationfields () {
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
          name: 'DECLARATION_DESCRIPTION',
          title: 'Declaration',
        },
         {
          name: 'DECLARATION_SET_INDEX',
          title: 'Index',
        },
        {
          name: '__slot:actions',
          title: 'Action',
          dataClass: 'justify-content-center',
          width: '15%',
        },
      ]
    },
    filteredDataRegistrationDeclaration() {
      if (!this.term || this.term.length < 1) {
        return this.disRegDecList
      }

      return this.disRegDecList.filter((item) => {
        return this.term
          .toLowerCase()
          .split(" ")
          .every(
            (v) =>
              item.DECLARATION_DESCRIPTION.toLowerCase().includes(v) ||
              item.DECLARATION_SET_INDEX.toString().includes(v)
          );
      });
    },
  },

  data () {
    return {
      // Data for loder
      isLoader: false,
      isDataReady:false,

      term: null,
      perPage: '10',
      tabs: TABS,
      currentTab: 'tab1',
      disRegDecList: [],
      GlCodeList: [],
      Distributorlist:[],
      regDecCount: null,
      GlCount: null,
      count: 1,
      model: {
        // TAB 1
        DECLARATION_DESCRIPTION: '',
        DECLARATION_SET_INDEX: '',

        editRegDec: {
        DECLARATION_DESCRIPTION: '',
        DECLARATION_SET_INDEX: '',
        DECLARATION_SETTING_ID: ','
        },
      },

      formOptions: {
        validateAfterChanged: true,
      },

      Tab1Schema: {
        groups: [
          {
            //styleClasses: 'row mt-2',
            fields: [
              {
                type: 'textArea',
                inputType: 'Text',
                model: 'DECLARATION_DESCRIPTION',
                label: 'Declaration',
                //placeholder: 'ENTER GENDER',
                required: true,
                validator: "required",
                styleClasses: 'col-md-6',
              },
               {
                type: 'input',
                inputType: 'number',
                model: 'DECLARATION_SET_INDEX',
                label: 'Index',
                //placeholder: 'ENTER GENDER',
                required: true,
                validator: "required",
                styleClasses: 'col-md-6',
              },
            ]
          }
        ]
      },
      editRegDecSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: 'textArea',
                inputType: 'Text',
                model: 'editRegDec.DECLARATION_DESCRIPTION',
                label: 'Declaration',
                //placeholder: 'ENTER GENDER',
                required: true,
                validator: "required",
                styleClasses: 'col-md-12',
              },
               {
                type: 'input',
                inputType: 'number',
                model: 'editRegDec.DECLARATION_SET_INDEX',
                label: 'Index',
                //placeholder: 'ENTER GENDER',
                required: true,
                validator: "required",
                styleClasses: 'col-md-6',
              },
              {
                type: 'input',
                inputType: 'hidden',
                model: 'editRegDec.DECLARATION_SETTING_ID',
               // label: 'ID',
                //placeholder: 'ENTER GENDER',
                //required: true,
               // validator: "required",
                //styleClasses: 'col-md-2',
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
      this.$router.go(-1);
    },

    //search Acc Code
    searchDeclaration: debounce(function (term) {
      this.term = term;
      console.log(this.term);
    }, 400),

    //search gl code
    searchGlCode: debounce(function (term) {
      this.term = term;
      console.log(this.term);
    }, 400),
    //ACC CODE

    getAllRegistrationDeclaration: async function() {
      const response = await servicesModule0.getAllDistributorRegistrationDeclaration("ANNUALFEE","amsf");
      this.disRegDecList = response;
      this.regDecCount = this.disRegDecList.length;

      this.isDataReady = true; // Kill loader
    },

    async addRegDec () {
        if (this.$refs.Tab1Form.validate()) {
            this.isLoader = true // Loader
            const data = new FormData()
            data.append('DECLARATION_DESCRIPTION', this.model.DECLARATION_DESCRIPTION)
            data.append('DECLARATION_SET_INDEX', this.model.DECLARATION_SET_INDEX)
            data.append('DECLARATION_SET_TYPE', 'amsf')
            data.append('DECLARATION_SET_PARAM', 'ANNUALFEE')
            try {
              // eslint-disable-next-line no-unused-vars
              const response = await servicesModule0.createDistributorRegistrationDeclaration(data)
              this.getAllRegistrationDeclaration()
              this.model.DECLARATION_DESCRIPTION = '';
              this.model.DECLARATION_SET_INDEX = '';
              this.isLoader = false; // Loader before add
            } catch (error) {
              console.log(error)
            }
        }
    },

    async deleteDeclaration(data) {
      if (confirm("Are you sure you want to delete?")) {
        // eslint-disable-next-line no-unused-vars
        this.isLoader = true // Loader before add
        const response = await servicesModule0.deleteDeclarationSetting(data.DECLARATION_SETTING_ID)
        this.getAllRegistrationDeclaration();
        this.isLoader = false // Loader before add
      }
    },

    async editDistributorRegDec (data) {
      this.isLoader = true // Loader
      this.$modals.simpleModalEditGender.$show()
      this.model.editRegDec = data;
      this.isLoader = false // Kill
    },

    async updateDeclarationAPI () {
      if (this.$refs.TabEditForm.validate()) {
        try {
          this.isLoader = true // Loader
          const data = new FormData()
            data.append('DECLARATION_DESCRIPTION', this.model.editRegDec.DECLARATION_DESCRIPTION)
            data.append('DECLARATION_SET_INDEX', this.model.editRegDec.DECLARATION_SET_INDEX)
            data.append('DECLARATION_SETTING_ID', this.model.editRegDec.DECLARATION_SETTING_ID)
            data.append('DECLARATION_SET_TYPE', 'amsf')
            data.append('DECLARATION_SET_PARAM', 'ANNUALFEE')
          const response = await servicesModule0.updateDistributorRegistrationDeclaration(data)
          this.getAllRegistrationDeclaration();
          this.isLoader = false // Loader
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



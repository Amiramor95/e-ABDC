/* eslint-disable no-unused-expressions */
<template>
  <va-card>
      <vudal name="simpleModalEditGender" class="widthModal">
      <div class="header">Edit Gender<i class="close icon">&times;</i></div>
      <div class="content">
        <vue-form-generator
          :model="model"
          :schema="editGenderSchema"
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
          @click="updateGenderAPI"
          type="button"
          class="cancel vudal-btn mr-2 btn btn-primary btn-fill btn-md"
        >
          <i class="fa fa-edit" /> &nbsp; Update
        </button>
      </div>
    </vudal>
    <h4 slot="header" class="card-title">GENDER SETTING</h4>
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
              @click="addGender"
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
            @input="searchGender"
            removable
            >
        <va-icon name="fa fa-search" slot="prepend" />
      </va-input>
    </div>
          <br />
          <h4>LIST OF GENDER</h4>
          <!-- list -->
          <va-card class="mt-2">
            <va-data-table
              :fields="Genderfields"
              :data="filteredDataGender"
              :per-page="parseInt(perPage)"
              :datacount="Gender"
               :dataperpage="parseInt(perPage)"
            clickable>
              <template slot="no" slot-scope="row">
                {{ row.rowIndex + 1 }}
              </template>

              <template slot="actions" slot-scope="props">
                <h4 class="mt-2">
                    <span
                    class="badge badge-primary mr-1"
                    v-on:click="editGender(props.rowData)"
                  >
                    <i class="fa fa-edit"></i
                  ></span>
                  <span class="badge badge-danger mr-1" v-on:click="deleteGender(props.rowData)">
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
    this.getAllGender()

  },
  components: {
    Tabs,
    Vudal,
  },

  computed: {
    Genderfields () {
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
          title: 'GENDER',
        },
        {
          name: '__slot:actions',
          title: 'Action',
          dataClass: 'justify-content-center',
          width: '15%',
        },
      ]
    },
    filteredDataGender() {
      if (!this.term || this.term.length < 1) {
        return this.GenderList
      }

      return this.GenderList.filter((item) => {
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
      GenderList: [],
      GlCodeList: [],
      Distributorlist:[],
      Gender: null,
      GlCount: null,
      count: 1,
      model: {
        // TAB 1
        SET_PARAM: '',

        editGender: {
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
                label: 'GENDER',
                placeholder: 'ENTER GENDER',
                required: true,
                validator: "required",
                styleClasses: 'col-md-12',
              },
            ]
          }
        ]
      },
      editGenderSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "input",
                inputType: "Text",
                model: "editGender.SET_PARAM",
                label: "Gender ",
                required: true,
                validator: "required",
                placeholder: "Enter Gender",
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
    searchGender: debounce(function (term) {
      this.term = term;
      console.log(this.term);
    }, 400),

    //search gl code
    searchGlCode: debounce(function (term) {
      this.term = term;
      console.log(this.term);
    }, 400),
    //ACC CODE

    getAllGender: async function() {
    const response = await servicesModule0.getAllSettingGeneralList("GENDER");
    this.GenderList = response;
    this.Gender = this.GenderList.length;
    },

    async addGender () {
        if (this.$refs.Tab1Form.validate()) {
            const data = new FormData()
            data.append('SET_PARAM', this.model.SET_PARAM)
            data.append('SET_TYPE', 'GENDER')
            try {
              // eslint-disable-next-line no-unused-vars
              const response = await servicesModule0.createSettingGeneral(data)
              this.getAllGender()
            } catch (error) {
              console.log(error)
            }
        }
    },

    async deleteGender(data) {
      if (confirm("Are you sure you want to delete?")) {
    // eslint-disable-next-line no-unused-vars
    const response = await servicesModule0.deleteSettingGeneral(data.SETTING_GENERAL_ID)
    this.getAllGender()
      }
    },

    async editGender (data) {
    const response = await servicesModule0.getSettingGeneralById(data.SETTING_GENERAL_ID)
    this.$modals.simpleModalEditGender.$show()
    this.SETTING_GENERAL_ID = response.SETTING_GENERAL_ID
    this.model.editGender = response
    },

    async updateGenderAPI () {
      if (this.$refs.TabEditForm.validate()) {
        try {
          const data = new FormData()
          data.append('SETTING_GENERAL_ID', this.SETTING_GENERAL_ID)
          data.append('SET_PARAM', this.model.editGender.SET_PARAM)
          const response = await servicesModule0.updateSettingGeneral(data)
          this.getAllGender()
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



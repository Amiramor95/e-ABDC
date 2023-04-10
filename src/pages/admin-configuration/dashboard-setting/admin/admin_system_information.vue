/* eslint-disable no-unused-expressions */
<template>
  <va-card>
      <vudal name="simpleModalEditSetting" class="widthModal">
      <div class="header">EDIT System Uptime, Server Usage, Versioning, System Information<i class="close icon">&times;</i></div>
      <div class="content">
        <vue-form-generator
          :model="model"
          :schema="editSettingSchema"
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
          @click="updateSettingAPI"
          type="button"
          class="cancel vudal-btn mr-2 btn btn-primary btn-fill btn-md"
        >
          <i class="fa fa-edit" /> &nbsp; Update
        </button>
      </div>
    </vudal>
    <h4 slot="header" class="card-title"> <i class="va-icon app-sidebar-link__item-icon vuestic-iconset vuestic-iconset-dashboard"></i>&nbsp;&nbsp;System Uptime, Server Usage, Versioning, System Information</h4>
    <br />
    <div>
      <!-- <div class="content"> -->
      <div>
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
              @click="addParam"
              type="button"
              class="btn btn-warning btn-fill btn-md"
            >
              <i class="fa fa-plus" /> &nbsp; SAVE
            </button>
          </div>
          <br />
          <br />
          <h4>LIST OF SYSTEM INFORMATION</h4>
            <div class="float-right">
            <va-input
            :value="term"
            :placeholder="$t('Search')"
            @input="searchSetting"
            removable
            >
            <va-icon name="fa fa-search" slot="prepend" />
            </va-input>
            </div>
        <br>
        <br>
        <br>
          <!-- list -->
          <va-card class="mt-2">
            <va-data-table
              :fields="Dashboardfields"
              :data="filteredDataDashboard"
              :per-page="parseInt(perPage)"
              :datacount="setList"
               :dataperpage="parseInt(perPage)"
            clickable>
              <template slot="no" slot-scope="row">
                {{ row.rowIndex + 1 }}
              </template>

              <template slot="actions" slot-scope="props">
                <h4 class="mt-2">
                    <span
                    class="badge badge-primary mr-1"
                    v-on:click="editSetting(props.rowData)"
                  >
                    <i class="fa fa-edit"></i
                  ></span>
                  <span class="badge badge-danger mr-1" v-on:click="deleteSetting(props.rowData)">
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
    <br>
    <br>
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
import * as servicesModule0 from "../../../../app/module0/services02"
import Tabs from 'vue-tabs-with-active-line'
import { debounce } from "lodash";
const TABS = [
//   { title: 'Setting 1 : Account Code', value: 'tab1' },
]

export default {

  mounted() {
    this.getSystemInformationAdmin();

  },
  components: {
    Tabs,
    Vudal,
  },

  computed: {
    Dashboardfields () {
      return [
        {
          name: '__slot:marker',
          width: '30px',
          dataClass: 'text-center',
        },
        {
          name: '__slot:no',
          title: 'No',
           width: '10%',
        },
        {
          name: 'SYSTEM_MAIN_LABEL',
          title: 'NAME',
          sortField: "SYSTEM_MAIN_LABEL",
           width: '30%',
        },
         {
          name: 'SYSTEM_SUB_LABEL',
          title: 'SUBNAME',
          sortField: "SYSTEM_SUB_LABEL",
           width: '30%',
        },
         {
          name: 'PARAM_VALUE',
          title: 'VALUE',
          sortField: "PARAM_VALUE",
           width: '20%',
        },
        {
          name: '__slot:actions',
          title: 'Action',
          dataClass: 'justify-content-center',
          width: '10%',
        },
      ]
    },
    filteredDataDashboard() {
      if (!this.term || this.term.length < 1) {
        return this.SettingList
      }

      return this.SettingList.filter((item) => {
        return this.term
          .toLowerCase()
          .split(" ")
          .every(
            (v) =>
              item.SYSTEM_MAIN_LABEL.toString().toLowerCase().includes(v) ||
              item.SYSTEM_SUB_LABEL.toString().toLowerCase().includes(v)
          );
      });
    },
  },

  data () {
    return {
      term: null,
      perPage: 10,
      SettingList: [],
      setList: null,
      model: {
        // TAB 1
        SYSTEM_INFORMATION_ID: '',
        SYSTEM_MAIN_LABEL: '',
        SYSTEM_SUB_LABEL: '',
        PARAM_VALUE: '',

        editList: {
        SYSTEM_MAIN_LABEL: '',
        SYSTEM_SUB_LABEL: '',
        PARAM_VALUE: '',
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
            //   {
            //     type: 'input',
            //     inputType: 'number',
            //     model: 'PREFIX',
            //     label: 'PREFIX',
            //     placeholder: 'ENTER PREFIX',
            //     required: true,
            //     validator: "number",
            //     styleClasses: 'col-md-8',
            //   },
              {
                type: 'input',
                inputType: 'text',
                model: 'SYSTEM_MAIN_LABEL',
                label: 'NAME',
                placeholder: 'ENTER NAME',
                required: true,
                validator: "string",
                styleClasses: 'col-md-8',
              },
              {
                type: 'input',
                inputType: 'text',
                model: 'SYSTEM_SUB_LABEL',
                label: 'SUB NAME',
                placeholder: 'ENTER SUB NAME',
                required: true,
                validator: "string",
                styleClasses: 'col-md-8',
              },
              {
                type: 'input',
                inputType: 'text',
                model: 'PARAM_VALUE',
                label: 'VALUE',
                placeholder: 'ENTER VALUE',
                required: true,
                validator: "string",
                styleClasses: 'col-md-8',
              },
            ]
          }
        ]
      },
      editSettingSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: 'input',
                inputType: 'text',
                model: 'editList.SYSTEM_MAIN_LABEL',
                label: 'NAME',
                placeholder: 'ENTER NAME',
                required: true,
                validator: "string",
                styleClasses: 'col-md-12',
              },
               {
                type: 'input',
                inputType: 'text',
                model: 'editList.SYSTEM_SUB_LABEL',
                label: 'NAME',
                placeholder: 'ENTER NAME',
                required: true,
                validator: "string",
                styleClasses: 'col-md-12',
              },
              {
                type: 'input',
                inputType: 'text',
                model: 'editList.PARAM_VALUE',
                label: 'VALUE',
                placeholder: 'ENTER VALUE',
                required: true,
                validator: "string",
                styleClasses: 'col-md-12',
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
      this.$router.push("/fimm/admin-dashboard-main-setting");
    },
    //search Acc Code
    searchSetting: debounce(function (term) {
      this.term = term;
      console.log(this.term);
    }, 400),

    //search gl code
    searchGlCode: debounce(function (term) {
      this.term = term;
      console.log(this.term);
    }, 400),
    //ACC CODE

    getSystemInformationAdmin: async function() {
    const response = await servicesModule0.getSystemInformation();
     console.log("Information =", response);
    this.SettingList = response;
    this.setList = this.SettingList.length;
    },

    async addParam () {
        if (this.$refs.Tab1Form.validate()) {
            const data = new FormData()
            data.append('SYSTEM_MAIN_LABEL', this.model.SYSTEM_MAIN_LABEL)
            data.append('SYSTEM_SUB_LABEL', this.model.SYSTEM_SUB_LABEL)
             data.append('PARAM_VALUE', this.model.PARAM_VALUE)
            try {
              // eslint-disable-next-line no-unused-vars
              const response = await servicesModule0.createSystemInformation(data)
              this.getSystemInformationAdmin();
              this.model.SYSTEM_MAIN_LABEL="";
              this.model.SYSTEM_SUB_LABEL="";
               this.model.PARAM_VALUE="";
            } catch (error) {
              console.log(error)
            }
        }
    },

    async deleteSetting(data) {
      if (confirm("Are you sure you want to delete?")) {
    // eslint-disable-next-line no-unused-vars
    const response = await servicesModule0.deleteSystemInformation(data.SYSTEM_INFORMATION_ID)
    this.getSystemInformationAdmin()
      }
    },

    async editSetting (data) {
    const response = await servicesModule0.getSystemInformationById(data.SYSTEM_INFORMATION_ID)
     console.log("SYSTEMEDIT =", Response.SYSTEM_MAIN_LABEL);
    this.$modals.simpleModalEditSetting.$show()
    this.SYSTEM_INFORMATION_ID = response.SYSTEM_INFORMATION_ID;
    this.model.editList = response;
    },

    async updateSettingAPI () {
      if (this.$refs.TabEditForm.validate()) {
        try {
            const data = new FormData()
            data.append('SYSTEM_INFORMATION_ID', this.SYSTEM_INFORMATION_ID)
            data.append('SYSTEM_MAIN_LABEL', this.model.editList.SYSTEM_MAIN_LABEL)
            data.append('SYSTEM_SUB_LABEL', this.model.editList.SYSTEM_SUB_LABEL)
            data.append('PARAM_VALUE', this.model.editList.PARAM_VALUE)

          const response = await servicesModule0.updateSystemInformation(data)
          this.getSystemInformationAdmin()
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
.col-md-8 .field-wrap{
 display: inline-flex;
  //float: right;
 width: 70%;
}
.form-group label{
    width: 25%;
}
.card-title{
    text-transform: uppercase;
}
</style>



/* eslint-disable no-unused-expressions */
<template>
  <va-card>
      <vudal name="simpleModalEditSetting" class="widthModal">
      <div class="header">EDIT FINANCE DASHBOARD SETTING<i class="close icon">&times;</i></div>
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
    <h4 slot="header" class="card-title"> <i class="va-icon app-sidebar-link__item-icon vuestic-iconset vuestic-iconset-dashboard"></i>&nbsp;&nbsp;FINANCE DASHBOARD STATISTICS</h4>
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
              @click="addStatistic"
              type="button"
              class="btn btn-warning btn-fill btn-md"
            >
              <i class="fa fa-plus" /> &nbsp; SAVE
            </button>
          </div>
          <br />
          <br />
          <h4>LIST OF FINANCE DASHBOARD</h4>

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
              :datacount="distributorList"
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
    this.getDistributorSetting();

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
          name: 'DASHBOARD_LIST',
          title: 'STATISTICS NAME',
          sortField: "DASHBOARD_LIST",
           width: '20%',
        },
         {
          name: 'DASHBOARD_DESCRIPTION',
          title: 'DESCRIPTION',
          sortField: "DASHBOARD_DESCRIPTION",
           width: '60%',
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
              item.DASHBOARD_LIST.toString().toLowerCase().includes(v) ||
              item.DASHBOARD_DESCRIPTION.toString().toLowerCase().includes(v)
          );
      });
    },
  },

  data () {
    return {
      term: null,
      perPage: 10,
      SettingList: [],
      distributorList: null,
      model: {
        // TAB 1
        DASHBOARD_MAIN_ID: '',
        DASHBOARD_TYPE: '',
        DASHBOARD_LIST: '',
        DASHBOARD_DESCRIPTION: '',

        editList: {
            DASHBOARD_LIST: '',
            DASHBOARD_DESCRIPTION: '',
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
                model: 'DASHBOARD_LIST',
                label: 'STATISTICS NAME',
                placeholder: 'ENTER NAME',
                required: true,
                validator: "string",
                styleClasses: 'col-md-8',
              },
              {
                type: 'input',
                inputType: 'text',
                model: 'DASHBOARD_DESCRIPTION',
                label: 'DESCRIPTION',
                placeholder: 'ENTER DESCRIPTION',
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
                model: 'editList.DASHBOARD_LIST',
                label: 'STATISTICS NAME',
                placeholder: 'ENTER NAME',
                required: true,
                validator: "string",
                styleClasses: 'col-md-12',
              },
               {
                type: 'input',
                inputType: 'text',
                model: 'editList.DASHBOARD_DESCRIPTION',
                label: 'DESCRIPTION',
                placeholder: 'ENTER Description',
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
      this.$router.push("/fimm/finance-dashboard-main-setting");
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

    getDistributorSetting: async function() {
    const response = await servicesModule0.getDistributorDashboardSetting("FINANCE");
     console.log("Distributor =", response);
    this.SettingList = response;
    this.distributorList = this.SettingList.length;
    },

    async addStatistic () {
        if (this.$refs.Tab1Form.validate()) {
            const data = new FormData()
            data.append('DASHBOARD_LIST', this.model.DASHBOARD_LIST)
            data.append('DASHBOARD_DESCRIPTION', this.model.DASHBOARD_DESCRIPTION)
             data.append('DASHBOARD_TYPE', 'FINANCE')
             data.append('DASHBOARD_SUB_TYPE', 0)
            try {
              // eslint-disable-next-line no-unused-vars
              const response = await servicesModule0.createDashboardSetting(data)
              this.getDistributorSetting();
              this.model.DASHBOARD_LIST="";
              this.model.DASHBOARD_DESCRIPTION="";
            } catch (error) {
              console.log(error)
            }
        }
    },

    async deleteSetting(data) {
      if (confirm("Are you sure you want to delete?")) {
    // eslint-disable-next-line no-unused-vars
    const response = await servicesModule0.deleteDashboardSetting(data.DASHBOARD_MAIN_ID)
    this.getDistributorSetting()
      }
    },

    async editSetting (data) {
    const response = await servicesModule0.getDashboardById(data.DASHBOARD_MAIN_ID)
     console.log("DistributorEdit =", response);
    this.$modals.simpleModalEditSetting.$show()
    this.DASHBOARD_MAIN_ID = response.DASHBOARD_MAIN_ID
    this.model.editList = response
    },

    async updateSettingAPI () {
      if (this.$refs.TabEditForm.validate()) {
        try {
            const data = new FormData()
            data.append('DASHBOARD_MAIN_ID', this.DASHBOARD_MAIN_ID)
            data.append('DASHBOARD_DESCRIPTION', this.model.editList.DASHBOARD_DESCRIPTION)
            data.append('DASHBOARD_LIST', this.model.editList.DASHBOARD_LIST)

          const response = await servicesModule0.updateDashboardSetting(data)
          this.getDistributorSetting()
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
</style>



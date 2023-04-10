/* eslint-disable no-unused-expressions */
<template>
  <va-card>
      <vudal name="simpleModalEditGender" class="widthModal">
      <div class="header">EDIT DISTRIBUTOR ID MASKING<i class="close icon">&times;</i></div>
      <div class="content">
        <vue-form-generator
          :model="model"
          :schema="editMaskingSchema"
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
          @click="updateMaskingAPI"
          type="button"
          class="cancel vudal-btn mr-2 btn btn-primary btn-fill btn-md"
        >
          <i class="fa fa-edit" /> &nbsp; Update
        </button>
      </div>
    </vudal>
    <h4 slot="header" class="card-title"> <i class="fa fa-bank"></i>&nbsp;&nbsp;DISTRIBUTOR ID MASKING SETTING</h4>
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
              @click="addMasking"
              type="button"
              class="btn btn-warning btn-fill btn-md"
            >
              <i class="fa fa-plus" /> &nbsp; SAVE
            </button>
          </div>
          <br />
         <!-- <div class="float-right">
            <va-input
            :value="term"
            :placeholder="$t('Search')"
            @input="searchMasking"
            removable
            >
        <va-icon name="fa fa-search" slot="prepend" />
      </va-input>
    </div> -->
          <br />
          <h4>LIST OF DISTRIBUTOR ID MASKING</h4>

           <div class="float-right">
              <va-input
              :value="term"
              :placeholder="$t('Search')"
              @input="searchMasking"
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
              :fields="Maskingfields"
              :data="filteredDataMasking"
              :per-page="parseInt(perPage)"
              :datacount="Masking"
               :dataperpage="parseInt(perPage)"
            clickable>
              <template slot="no" slot-scope="row">
                {{ row.rowIndex + 1 }}
              </template>

              <template slot="actions" slot-scope="props">
               <h4 class="mt-2" v-if="props.rowData.STATUS == 'ACTIVE' && props.rowData.RUN_NO == props.rowData.CURRENT_RUN_NO">
                    <span
                    class="badge badge-primary mr-1"
                    v-on:click="editMasking(props.rowData)"
                  >
                    <i class="fa fa-edit"></i
                  ></span>
                  <!-- <span class="badge badge-danger mr-1" v-on:click="deleteMasking(props.rowData)">
                    <i class="fa fa-trash"></i></span> -->
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
import * as servicesModule0 from "../../../app/module0/services02"
import Tabs from 'vue-tabs-with-active-line'
import { debounce } from "lodash";
const TABS = [
//   { title: 'Setting 1 : Account Code', value: 'tab1' },
]

export default {

  mounted() {
    this.getAllMasking();
   // this.getLatestMasking();

  },
  components: {
    Tabs,
    Vudal,
  },

  computed: {
    Maskingfields () {
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
        //  {
        //   name: 'PREFIX',
        //   title: 'PREFIX',
        //   sortField: "PREFIX",
        // },
        {
          name: 'RUN_NO',
          title: 'STARTING RUN NO',
          sortField: "RUN_NO",
        },
         {
          name: 'CURRENT_RUN_NO',
          title: 'CURRENT RUN NO',
          sortField: "CURRENT_RUN_NO",
        },
        {
          name: 'DESCRIPTION',
          title: 'DESCRIPTION',
          sortField: "DESCRIPTION",
        },
        {
          name: 'STATUS',
          title: 'STATUS',
          sortField: "STATUS",
         // dataClass: 'text-center',
        },
        {
          name: '__slot:actions',
          title: 'Action',
          dataClass: 'justify-content-center',
          width: '15%',
        },
      ]
    },
    filteredDataMasking() {
      if (!this.term || this.term.length < 1) {
        return this.MaskingList
      }

      return this.MaskingList.filter((item) => {
        return this.term
          .toLowerCase()
          .split(" ")
          .every(
            (v) =>
              item.RUN_NO.toString().toLowerCase().includes(v) ||
              item.PREFIX.toString().toLowerCase().includes(v) ||
              item.CURRENT_RUN_NO.toString().toLowerCase().includes(v)
          );
      });
    },
  },

  data () {
    return {
      term: null,
      perPage: 10,
      MaskingList: [],
      Masking: null,
      LatestMasking: 0,
      DISTRIBUTOR_MASKING_ID: 0,
      count: 1,
      model: {
        // TAB 1
        DISTRIBUTOR_MASKING_ID: '',
        PREFIX: '',
        RUN_NO: '',
        CURRENT_RUN_NO: '',
        DESCRIPTION: '',
        STATUS: 0,

        editMasking: {
          DISTRIBUTOR_MASKING_ID: '',
          PREFIX: '',
          RUN_NO: '',
          CURRENT_RUN_NO: '',
          STATUS: 0,
          DESCRIPTION: '',
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
                inputType: 'number',
                model: 'RUN_NO',
                label: 'STARTING RUN NO',
                placeholder: 'ENTER RUN NO',
                required: true,
                validator: "number",
                styleClasses: 'col-md-8',
                 onChanged: (model, newVal, oldVal, field) =>{
                    const run_no =  this.model.RUN_NO;
                  //  if(this.LatestMasking == 0)
                   // {
                     //  this.model.CURRENT_RUN_NO=this.model.RUN_NO;
                   // }
                   // else{
                      //  this.model.CURRENT_RUN_NO=thia.LatestMasking;
                    //}
                },
              },
              // {
              //   type: 'input',
              //   inputType: 'number',
              //   model: 'CURRENT_RUN_NO',
              //   label: 'CURRENT RUN NO',
              //   placeholder: 'ENTER CURRENT RUN NO',
              //   required: true,
              //   validator: "number",
              //   styleClasses: 'col-md-8',
              //    readonly: true,
              // },
               {
                type: 'input',
                inputType: 'text',
                model: 'DESCRIPTION',
                label: 'DESCRIPTION',
                placeholder: 'ENTER DESCRIPTION',
                required: true,
                validator: "string",
                styleClasses: 'col-md-8',
              },
              {
                type: 'input',
                inputType: 'hidden',
                model: 'STATUS',
               // label: 'CURRENT RUN NO',
               // placeholder: 'ENTER CURRENT RUN NO',
               // required: true,
               // validator: "number",
                //styleClasses: 'col-md-12',
              },
            ]
          }
        ]
      },
      editMaskingSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
            //   {
            //     type: 'input',
            //     inputType: 'number',
            //     model: 'editMasking.PREFIX',
            //     label: 'PREFIX',
            //     placeholder: 'ENTER PREFIX',
            //     required: true,
            //     validator: "number",
            //     styleClasses: 'col-md-12',
            //   },
              {
                type: 'input',
                inputType: 'number',
                model: 'editMasking.RUN_NO',
                label: 'STARTING RUN NO',
                placeholder: 'ENTER RUN NO',
                required: true,
                validator: "number",
                styleClasses: 'col-md-12',
              },
              // {
              //   type: 'input',
              //   inputType: 'number',
              //   model: 'editMasking.CURRENT_RUN_NO',
              //   label: 'CURRENT RUN NO',
              //   placeholder: 'ENTER CURRENT RUN NO',
              //   required: true,
              //   validator: "number",
              //   styleClasses: 'col-md-12',
              // },
              {
                type: 'input',
                inputType: 'text',
                model: 'editMasking.DESCRIPTION',
                label: 'DESCRIPTION',
                placeholder: 'ENTER DESCRIPTION',
                required: true,
                validator: "string",
                styleClasses: 'col-md-12',
              },
              {
                type: 'input',
                inputType: 'hidden',
                model: 'editMasking.STATUS',
               // label: 'CURRENT RUN NO',
               // placeholder: 'ENTER CURRENT RUN NO',
               // required: true,
               // validator: "number",
                //styleClasses: 'col-md-12',
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
      this.$router.push("/fimm/idmasking-mainlist");
    },
    //search Acc Code
    searchMasking: debounce(function (term) {
      this.term = term;
      console.log(this.term);
    }, 400),

    //search gl code
    searchGlCode: debounce(function (term) {
      this.term = term;
      console.log(this.term);
    }, 400),
    //ACC CODE

    getAllMasking: async function() {
    const response = await servicesModule0.getDistributorAllMasking();
     console.log("Distributor Masking=", response);
    this.MaskingList = response;
    this.Masking = this.MaskingList.length;
    },
     getLatestMasking: async function() {
        try {
        const response = await servicesModule0.getDistributorLatestMasking();
        if(response.DIST_RUN_NO != null)
         {
            this.LatestMasking=response.DIST_RUN_NO;
            this.model.CURRENT_RUN_NO= this.LatestMasking;
        }
        else{
            this.model.CURRENT_RUN_NO= this.LatestMasking;

        }
        } catch (error) {
        console.log(error)
        }

        },

    async addMasking () {
        if (this.$refs.Tab1Form.validate()) {
            const data = new FormData()
            data.append('RUN_NO', this.model.RUN_NO)
           // data.append('CURRENT_RUN_NO', this.model.CURRENT_RUN_NO)
            data.append('DESCRIPTION', this.model.DESCRIPTION)
            data.append('PREFIX', 0)
            data.append('STATUS', this.model.STATUS)
            // data.append('MASKING_TYPE', 'DISTRIBUTOR')
            try {
              // eslint-disable-next-line no-unused-vars
              const response = await servicesModule0.createDistributorIdMasking(data)
              this.getAllMasking();
               this.getLatestMasking();
              this.model.RUN_NO="";
              this.model.CURRENT_RUN_NO="";
              this.model.DESCRIPTION="";
              this.model.PREFIX="";
            } catch (error) {
              console.log(error)
            }
        }
    },

    async deleteMasking(data) {
      if (confirm("Are you sure you want to delete?")) {
    // eslint-disable-next-line no-unused-vars
    const response = await servicesModule0.deleteMasking(data.MASKING_ID)
    this.getAllMasking()
      }
    },

    async editMasking (data) {
     //  console.log("Masking=",data);
    const response = await servicesModule0.getDistributorMaskingById(data.DISTRIBUTOR_MASKING_ID)
    this.$modals.simpleModalEditGender.$show();
    //console.log("Edit Masking=",response);
    this.DISTRIBUTOR_MASKING_ID = response.DISTRIBUTOR_MASKING_ID;

    this.model.editMasking = response;
    },

    async updateMaskingAPI () {
      if (this.$refs.TabEditForm.validate()) {
        try {
          const data = new FormData()
          data.append('DISTRIBUTOR_MASKING_ID', this.DISTRIBUTOR_MASKING_ID)
           data.append('RUN_NO', this.model.editMasking.RUN_NO)
           // data.append('CURRENT_RUN_NO', this.model.editMasking.CURRENT_RUN_NO)
           data.append('DESCRIPTION', this.model.editMasking.DESCRIPTION)
           // data.append('STATUS', this.model.editMasking.STATUS)
          const response = await servicesModule0.updateDistributorMasking(data)
          this.getAllMasking()
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



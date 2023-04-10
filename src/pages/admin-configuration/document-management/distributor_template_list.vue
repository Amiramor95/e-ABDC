<template>
  <va-card>
    <h4>List of Template</h4>
    <div class="col-md-8 float-left">
      <!-- <vue-form-generator
          :model="model"
          :schema="SearchFilterSchema"
          :options="formOptions"
          ref="SearchForm"
          @model-updated="onModelUpdatedSearch"
          
        >
        </vue-form-generator> -->
    </div>
    <div class="col-md-4">
        <va-input
        :value="term"
        :placeholder="$t('Search')"
        @input="searchTemplate"
        removable
        >
        <va-icon name="fa fa-search" slot="prepend" />
        </va-input>
    </div>

          
        <br>
    <va-card>
        <va-data-table
          :fields="fields"
          :data="filteredData"
          :per-page="parseInt(perPage)"
          :datacount="templateListCount"
          :dataperpage="parseInt(perPage)"
          clickable
        >
        <template slot="no" slot-scope="row">
          {{ row.rowIndex + 1 }}
        </template>

        <template slot="filename" slot-scope="props">
          <!-- <router-link v-b-tooltip.hover title="Detail">View </router-link> -->
          <span>
                  <h4 class="mt-2">
                    <span
                      v-if="props.rowData.FILE_BLOB != '-'"
                      v-b-tooltip.hover
                      title="View Document"
                      v-on:click="viewPdf(props.rowData)"
                      class="badge badge-success mr-2"
                    >
                      <i class="fa fa-file-excel-o"></i
                      ></span>
                  </h4>
                </span>
        </template>

        <template slot="actions" slot-scope="props">
          <h4 class="mt-2">
             <va-button
            flat
            small
            color="white"
            @click="viewPdf(props.rowData)"
            class="badge badge-primary mr-2"
          >
           <i class="fa fa-download"></i>
          </va-button>
          </h4>
        </template>
      </va-data-table>
    </va-card>
    <br />
    <button @click="back" type="button" class="btn btn-primary btn-fill btn-md">
      <i class="fa fa-step-backward" /> &nbsp; Previous
    </button>
  </va-card>
  <!-- </div>
      </div>
    </div>
  </div> -->
</template>

<script>
// Import Bootstrap an BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
// eslint-disable-next-line no-unused-vars
import { debounce } from "lodash";
import * as servicesModule0 from "../../../app/module0/services";
import * as servicesModule1 from "../../../app/module1/services01";
// eslint-disable-next-line no-unused-vars
import * as fileServices from "../../../app/fileServices";
import Vudal from "vudal";
export default {
  components: {
    Vudal
  },
  mounted() {
    this.getModule();
    this.getTemplate();
  },

  methods: {

    viewPdf(document) {
        var byteCharacters = window.atob(document["FILE_BLOB"]);
        var byteNumbers = new Array(byteCharacters.length);
        for (var i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        var byteArray = new Uint8Array(byteNumbers);
        var file = new Blob([byteArray], {
          type: document["FILE_MIMETYPE"]+";base64",
        });
        var fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      },
    
     async downloadTemplate(data) {
      let self = this;
      this.downloadFileName = data.MANAGE_FORM_TEMPLATE_ID + '_' + data.TEMP_TITLE + '.xls';
      const response = await servicesModule0.downloadTemplate(
        data.MANAGE_FORM_TEMPLATE_ID
      );
      const blob = new Blob([response.data], { type: "xls,xlsx" });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute('download', self.downloadFileName)
      document.body.appendChild(link)
      link.click()
    },
    

    async getModule() {
      const response = await servicesModule0.getAllModule();
      this.moduleList = response;
    },

    async getTemplate() {
      const response = await servicesModule1.getDistTemplate();
      this.templateList = response;
      console.log("Template List=",response);
      this.templateListCount = this.templateList.length;
    },

    back() {
      this.$router.go(-1);
    },

    uploadFiles: function() {
      console.log(JSON.stringify(this.$refs.vueFileAgent));
    },
    deleteUploadedFile: function(fileRecord) {
      this.$refs.vueFileAgent.deleteUpload(
        this.uploadUrl,
        this.uploadHeaders,
        fileRecord
      );
    },
      async filterModuleSearch() {

     const filterData = {
        MANAGE_MODULE_ID: this.model.modelSearch.MODULE.MANAGE_MODULE_ID,
          //this.model.modelAdd.MODULE.MANAGE_MODULE_ID

      };
       this.getTemplate();
       console.log("Filterdata=",filterData);
     // const filterData = this.model.modelFilterCountry.SET_COUNTRY.SETTING_GENERAL_ID;

       //console.log("State Search=",filterData);
      const response = await servicesModule0.getFilteredTemplate(filterData);
      this.templateList = response;
      this.templateListCount = this.templateList.length;
    },
    onModelUpdatedSearch(newVal, schema) {
      if (schema == "modelSearch.MODULE") {
        const newValcon=JSON.stringify(newVal);
       console.log("Module filter ", newValcon);
         if(newValcon == 'null'){
            console.log("Module filter1 ", newValcon);
           this.getTemplate();
         }else{
            console.log("Module filter2 ", newValcon);
            this.filterModuleSearch();
         }
      }
    },
   searchTemplate: debounce(function (term) {
      this.term = term;
    }, 400),

    filesSelected: function(fileRecordsNewlySelected) {
      var validFileRecords = fileRecordsNewlySelected.filter(
        fileRecord => !fileRecord.error
      );
      this.fileRecordsForUpload = this.fileRecordsForUpload.concat(
        validFileRecords
      );
      this.uploadFileName = this.fileRecordsForUpload[0].file.name;
      this.uploadFileOject = this.fileRecordsForUpload[0].file;
      console.log(this.fileRecordsForUpload[0].file);
    },


  },

  computed: {
    fields() {
      return [
        {
          name: "__slot:marker",
          width: "30px",
          dataClass: "text-center"
        },
        {
          name: "__slot:no",
          title: "No"
          // width: "30px"
          // height: "45px"
          // dataClass: "text-center"
        },
        // {
        //   name: "MOD_NAME",
        //   title: "Module Name",
        //   // width: "30%"
        //   sortField: "MOD_NAME",
        // },
        {
          name: "TEMP_TITLE",
          title: "Template Title",
          sortField: "TEMP_TITLE",
          // width: "30%"
        },

        {
          name: "TEMP_DESCRIPTION",
          title: "Template Description",
          sortField: "TEMP_DESCRIPTION",
          // width: "40%"
        },
        // {
        //   name: "__slot:filename",
        //   title: "Document"
        //   // width: "20%"
        // },
        {
          name: "__slot:actions",
          title: "Document",
          dataClass: "justify-content-center",
          width: "15%"
        }
      ];
    },
    // eslint-disable-next-line vue/return-in-computed-property
    filteredData() {
      if (!this.term || this.term.length < 1) {
        return this.templateList;
      }
        return this.templateList.filter((item) => {
        return this.term
          .toLowerCase()
          .split(" ")
          .every(
            (v) =>
              item.MOD_NAME.toLowerCase().includes(v) ||
              item.TEMP_TITLE.toLowerCase().includes(v) || item.TEMP_DESCRIPTION.includes(v)
          );
      });

      // return this.users.filter(item => {
      //   return item.company.toLowerCase().startsWith(this.term.toLowerCase());
      // });
    }
  },
  data() {
    return {
      header: "",
      field: [],
      term: null,
      perPage: "10",
      perPageOptions: ["4", "6", "10", "20"],
      templateList: [],
      templateListCount:null,
      uploadFileName: "",
      uploadFileOject: "",
      editUploadFileObject: "",
      editUploadFileName: "",
      moduleList: [],
      currentPage: 1,

      id: "",
      fileRecords: [],
      editFileRecords: [],
      uploadUrl: "https://www.mocky.io/v2/5d4fb20b3000005c111099e3",
      uploadHeaders: {
        "X-Test-Header": "vue-file-agent"
      },
      fileRecordsForUpload: [],
      editFileRecordsForUpload: [],
      content: "<h5></h5>",

      model: {
        modelAdd: {
          MODULE: "",
          TEMP_TITLE: "",
          TEMP_DESCRIPTION: ""
        },
        modelSearch: {
          MODULE: "",
        },
        MODULE: "",
        modelEdit: {
           MODULE: "",
          MANAGE_FORM_TEMPLATE_ID: "",
          TEMP_TITLE: "",
          TEMP_DESCRIPTION: ""
        }
      },

      formOptions: {
        validateAfterChanged: true
      },

      editTemplateSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "vueMultiSelect",
                model: "modelEdit.MODULE",
                label: "Module",
                placeholder: "Select module",
                selectOptions: {
                  multiple: false,
                  key: "MANAGE_MODULE_ID",
                  label: "MOD_NAME",
                  searchable: true
                },
                values: (model, schema) => {
                  return this.moduleList;
                },
                styleClasses: "col-md-6",
                required: true,
                validator: "required"
              },
              {
                type: "input",
                inputType: "Text",
                model: "modelEdit.TEMP_TITLE",
                label: "Title",
                placeholder: "Enter title",
                required: true,
                validator: "string",
                styleClasses: "col-md-6"
              },
              {
                type: "input",
                inputType: "Text",
                model: "modelEdit.TEMP_DESCRIPTION",
                label: "Description",
                placeholder: "Enter description",
                //  required: true,
                styleClasses: "col-md-12"
              }
            ]
          }
        ]
      },

      templateSchema: {
        groups: [
          {
            styleClasses: "row mt-2",
            fields: [
              {
                type: "vueMultiSelect",
                model: "modelAdd.MODULE",
                label: "Module",
                placeholder: "Select module",
                selectOptions: {
                  multiple: false,
                  key: "MOD_NAME",
                  label: "MOD_NAME",
                  searchable: true
                },
                values: (model, schema) => {
                  return this.moduleList;
                },
                styleClasses: "col-md-6",
                required: true,
                validator: "required"
              },
              {
                type: "input",
                inputType: "Text",
                model: "modelAdd.TEMP_TITLE",
                label: "Title",
                placeholder: "Enter title",
                required: true,
                validator: "string",
                styleClasses: "col-md-6"
              },
              {
                type: "input",
                inputType: "Text",
                model: "modelAdd.TEMP_DESCRIPTION",
                label: "Description",
                placeholder: "Enter description",
                //  required: true,
                styleClasses: "col-md-12"
              }
            ]
          }
        ]
      },
       SearchFilterSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
               {
                type: "vueMultiSelect",
                model: "modelSearch.MODULE",
                label: "Module",
                placeholder: "Select module",
                selectOptions: {
                  multiple: false,
                  key: "MOD_NAME",
                  label: "MOD_NAME",
                  searchable: true
                },
                values: (model, schema) => {
                  return this.moduleList;
                },
                styleClasses: "col-md-6",
               // required: true,
               // validator: "required"
              },
            ],
          },
        ],
      },
    };
  }
};
</script>
<style lang="scss">
.app-layout__main {
  background: #e8e8e8;
}
// .file-error-message, .file-ext{
//   display: none !important;
// }
</style>

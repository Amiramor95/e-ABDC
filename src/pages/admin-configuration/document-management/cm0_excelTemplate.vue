<template>
  <va-card>
    <vudal name="simpleModal" class="widthModal">
      <div class="header">
        Edit Template
        <i class="close icon">&times;</i>
        <br />
      </div>
      <div class="content">
        <vue-form-generator
          :model="model"
          :schema="editTemplateSchema"
          :options="formOptions"
          ref="editTemplateForm"
        />
        <br />
        <div class="row">
          <div id="app">
            <template>
              <VueFileAgent
                ref="vueFileAgentEdit"
                :theme="'grid'"
                :multiple="false"
                :deletable="true"
                :meta="true"
                :accept="'.pdf,.xlsx,.xls'"
                :maxSize="'10MB'"
                :maxFiles="14"
                :helpText="'Choose  files'"
                :errorText="{
                  size: 'Files should not exceed 10MB in size'
                }"
                @select="editfilesSelected($event)"
                @beforedelete="editonBeforeDelete($event)"
                @delete="editfileDeleted($event)"
                v-model="editFileRecords"
              ></VueFileAgent>
            </template>
          </div>
        </div>
      </div>

      <div class="actions">
        <button
          type="button"
          class="cancel vudal-btn mr-2 btn btn-danger btn-fill btn-md"
        >
          <i class="fa fa-times" /> &nbsp; Close
        </button>
        <button
          @click="editTemplate()"
          type="button"
          class="mr-2 btn btn-primary btn-fill btn-md"
        >
          <i class="fa fa-edit" /> &nbsp; Update
        </button>
      </div>
    </vudal>
    <h4 slot="header" class="card-title">Upload Template Form</h4>
    <br />
    <div class="">
      <vue-form-generator
        :model="model"
        :schema="templateSchema"
        :options="formOptions"
        ref="templateForm"
      >
      </vue-form-generator>
    </div>
    <br />

    <div class="row">
      <div id="app" class="col-md-12">
        <template>
          <VueFileAgent
            ref="vueFileAgent"
            :theme="'list'"
            :multiple="false"
            :deletable="true"
            :meta="true"
            :accept="'.pdf,.xlsx,.xls'"
            :maxSize="'10MB'"
            :maxFiles="14"
            :helpText="'Choose  files'"
            :errorText="{
              type: 'Invalid file type',
              size: 'Files should not exceed 10MB in size'
            }"
            @select="filesSelected($event)"
            @beforedelete="onBeforeDelete($event)"
            @delete="fileDeleted($event)"
            v-model="fileRecords"
          ></VueFileAgent>
        </template>
      </div>
    </div>
    <br />
    <div class="text-center">
      <button
        @click="uploadTemplate"
        type="button"
        class="btn btn-warning btn-fill btn-md"
      >
        <i class="fa fa-plus" /> &nbsp; Upload
      </button>
    </div>
    <br />
    <h4>List of Template</h4>
    <div class="float-right">
              <va-input
              :value="term"
              :placeholder="$t('Search')"
              @input="searchTemplate"
              removable
              >
              <va-icon name="fa fa-search" slot="prepend" />
              </va-input>
              </div>

          <vue-form-generator
          :model="model"
          :schema="SearchFilterSchema"
          :options="formOptions"
          ref="SearchForm"
          @model-updated="onModelUpdatedSearch"
        >
        </vue-form-generator>
        <br>
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
            <span
              v-b-tooltip.hover
              title="edit"
              v-on:click="showEditModal(props.rowData)"
              class="badge badge-primary mr-2"
            >
              <i class="fa fa-edit"></i
            ></span>
            <span
              v-b-tooltip.hover
              title="delete"
              v-on:click="deleteFile(props.rowData)"
              class="badge badge-danger mr-1"
            >
              <i class="fa fa-trash"></i
            ></span>
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
    async showEditModal(data) {
      const response = await servicesModule0.getExcelTemplateById(
        data.MANAGE_FORM_TEMPLATE_ID
      );
       console.log("File Response=",response[0]);
      // this.editFileRecords = [
      //   {
      //     name: response.MANAGE_FORM_TEMPLATE_ID + "_" + response.TEMP_FILENAME,
      //     size: response.TEMP_FILESIZE,
      //     type: response.TEMP_FILEEXTENSION
      //   }
      // ];
      this.model.MODULE = response; //{ MANAGE_MODULE_ID: 1, MOD_NAME: "sadsad" };
       this.model.modelEdit.MODULE = {
          MANAGE_MODULE_ID: response[0]['MANAGE_MODULE_ID'],
         MOD_NAME: response[0]['MOD_NAME'],
      };
      this.model.modelEdit.TEMP_TITLE = response[0]['TEMP_TITLE'];
       this.model.modelEdit.TEMP_DESCRIPTION = response[0]['TEMP_DESCRIPTION'];
        this.model.modelEdit.MANAGE_FORM_TEMPLATE_ID = response[0]['MANAGE_FORM_TEMPLATE_ID'];
        response[0]['FILE_BLOB'] = new File(
          [response[0]['FILE_BLOB']],
          response[0]['TEMP_FILENAME'],
          { type: response[0]['FILE_MIMETYPE'] }
        );
         const data1 = {
          name: response[0]['TEMP_FILENAME'],
          size: response[0]['TEMP_FILESIZE'],
          type: response[0]['TEMP_FILEEXTENSION'],
          ext: "exe",
          url: window.URL.createObjectURL(response[0]['FILE_BLOB']),
        };
        this.editFileRecords.push(data1);
      this.$modals.simpleModal.$show();
    },

    async editTemplate() {
     // console.log("file : " + this.editUploadFileObject);
      if (this.$refs.editTemplateForm.validate()) {
        const data = new FormData();
        data.append(
          "MANAGE_FORM_TEMPLATE_ID",
          this.model.modelEdit.MANAGE_FORM_TEMPLATE_ID
        );
        data.append("FILEOBJECT", this.editUploadFileObject);
        data.append("MANAGE_MODULE_ID", this.model.modelEdit.MODULE.MANAGE_MODULE_ID);
        data.append("TEMP_TITLE", this.model.modelEdit.TEMP_TITLE);
        data.append("TEMP_DESCRIPTION", this.model.modelEdit.TEMP_DESCRIPTION);
        try {
          // eslint-disable-next-line no-unused-vars
          const response = await servicesModule0.updateExcelTemplate(
            data
          );
            this.editFileRecords.push("");
          this.getTemplate();
          this.$modals.simpleModal.hide();
          this.editUploadFileObject = "";
        } catch (error) {
          console.log(error);
        }
      }
    },

    async deleteFile(data) {
      // eslint-disable-next-line no-unused-vars
      const response = await servicesModule0.deleteTemplate(
        data.MANAGE_FORM_TEMPLATE_ID
      );
      this.getTemplate();
    },

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
    

    uploadTemplate: async function() {
      if (this.$refs.templateForm.validate()) {
        const data = new FormData();
        data.append("FILEOBJECT", this.uploadFileOject);
        data.append(
          "MANAGE_MODULE_ID",
          this.model.modelAdd.MODULE.MANAGE_MODULE_ID
        );
        data.append("TEMP_TITLE", this.model.modelAdd.TEMP_TITLE);
        data.append("TEMP_DESCRIPTION", this.model.modelAdd.TEMP_DESCRIPTION);
        try {
          // eslint-disable-next-line no-unused-vars
          const response = await servicesModule0.createExcelTemplate(data);
          this.getTemplate();
          this.model.modelAdd.TEMP_TITLE = "";
          this.model.modelAdd.TEMP_DESCRIPTION = "";
          this.model.modelAdd.MODULE = "";
          this.fileRecords = "";
          this.uploadFileOject= "";
        } catch (error) {
          console.log(error);
        }
      }
    },
    viewExcel(document) {
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
b64toBlobPDF(b64Data, contentType, sliceSize) {
      contentType = contentType || "";
      sliceSize = sliceSize || 512;

      var byteCharacters = atob(b64Data);
      var byteArrays = [];

      for (
        var offset = 0;
        offset < byteCharacters.length;
        offset += sliceSize
      ) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
      }

      console.log(byteArrays);

      return new File(byteArrays, "pot", { type: contentType });
    },
    async getModule() {
      const response = await servicesModule0.getAllModule();
      this.moduleList = response;
    },

    async getTemplate() {
      const response = await servicesModule0.getAllExcelTemplate();
      // response.TEMP_DESC= "TEST";
      this.templateList = response;
      console.log("Template List=",response);
      this.templateListCount = this.templateList.length;
      // this.templateList.forEach(element => {
      //   element.FILE_BLOB = this.b64toBlobPDF(
      //   element.FILE_BLOB,
      //   element.FILE_MIMETYPE
      // );
      // console.log("PDF=",element.FILE_BLOB);
      // element.FILE_BLOB = new File(
      //   [element.FILE_BLOB],
      //   element.TEMP_FILENAME + "." + element.TEMP_FILEEXTENSION,
      //   { type: element.FILE_MIMETYPE }
      // );
      // console.log("PDF1=",element.FILE_BLOB);
      // const data1 = {
      // name: element.TEMP_FILENAME + "." + element.TEMP_FILEEXTENSION,
      // size: element.TEMP_FILESIZE,
      // type: element.TEMP_FILEEXTENSION,
      // ext: "exe",
      // url: window.URL.createObjectURL(element.FILE_BLOB)
      // };
      // element.fileRecordsDisplay.push(data1);
      // });
      //     response.FILE_BLOB = new File(
      //     [response.FILE_BLOB],
      //     response.TEMP_FILENAME,
      //     { type: response.FILE_MIMETYPE }
      //     );
      //  const data1 = {
      //     name: response.TEMP_FILENAME,
      //     size: response.TEMP_FILESIZE,
      //     type: response.TEMP_FILEEXTENSION,
      //     ext: "exe",
      //     url: window.URL.createObjectURL(response.FILE_BLOB),
      //   };
      //   this.fileRecords.push(data1);
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
     filesSelectedDisplay: function(fileRecordsNewlySelected, fileRecords, docId) {
      this.uploadFileOject = [];
      this.uploadFileOjectId.push(docId);
      var validFileRecords = fileRecordsNewlySelected.filter(
        fileRecord => !fileRecord.error
      );
      this.fileRecordsForUpload = this.fileRecordsForUpload.concat(
        validFileRecords
      );
      var i;
      for (i = 0; i < this.fileRecordsForUpload.length; i++) {
        // var data = {

        // alert(this.docIdArray[i])
        //   docId: docId,
        //   file: this.fileRecordsForUpload[i].file
        // };

        // this.uploadFileOject[i]['docId'] = this.docIdArray[i];
        // this.uploadFileOject[i]['file'] = this.fileRecordsForUpload[i].file;

        //  this.uploadFileOject.push(data);
        // this.uploadFileOject.push({docId:this.fileRecordsForUpload[i].file})
        //  this.uploadFileOjectId.push(this.docIdArray[i]);
        this.uploadFileOject.push(this.fileRecordsForUpload[i].file);
      }
    },

    onBeforeDelete: function(fileRecord) {
      var i = this.fileRecordsForUpload.indexOf(fileRecord);
      console.log(this.fileRecords);
      if (i !== -1) {
        // queued file, not yet uploaded. Just remove from the arrays

        this.fileRecordsForUpload.splice(i, 1);
        var k = this.fileRecords.indexOf(fileRecord);
        if (k !== -1) this.fileRecords.splice(k, 1);
      } else {
        this.$refs.vueFileAgent.deleteFileRecord(fileRecord);
        // if (confirm("Are you sure you want to delete?")) {
        //   this.$refs.vueFileAgent.deleteFileRecord(fileRecord); // will trigger 'delete' event
        // }
      }
    },
    fileDeleted: function(fileRecord) {
      var i = this.fileRecordsForUpload.indexOf(fileRecord);
      if (i !== -1) {
        this.fileRecordsForUpload.splice(i, 1);
      } else {
        this.deleteUploadedFile(fileRecord);
      }
    },

    editdeleteUploadedFile: function(fileRecord) {
      this.$refs.vueFileAgent.deleteUpload(
        this.uploadUrl,
        this.uploadHeaders,
        fileRecord
      );
    },

    editfilesSelected: function(fileRecordsNewlySelected) {
      console.log(fileRecordsNewlySelected);
      var validFileRecords = fileRecordsNewlySelected.filter(
        fileRecord => !fileRecord.error
      );
      this.editFileRecordsForUpload = this.editFileRecordsForUpload.concat(
        validFileRecords
      );
      this.editUploadFileName = this.editFileRecordsForUpload[0].file.name;
      this.editUploadFileObject = this.editFileRecordsForUpload[0].file;
      console.log("file");
      console.log(this.editFileRecordsForUpload[0].file);
    },

    editonBeforeDelete: function(fileRecord) {
      var i = this.editFileRecordsForUpload.indexOf(fileRecord);
      if (i !== -1) {
        // queued file, not yet uploaded. Just remove from the arrays
        this.editFileRecordsForUpload.splice(i, 1);
        var k = this.editFileRecords.indexOf(fileRecord);
        if (k !== -1) this.editFileRecords.splice(k, 1);
      } else {
        this.$refs.vueFileAgentEdit.deleteFileRecord(fileRecord);
        // if (confirm("Are you sure you want to delete?")) {
        //   this.$refs.vueFileAgent.deleteFileRecord(fileRecord); // will trigger 'delete' event
        // }
      }
    },
    editfileDeleted: function(fileRecord) {
      var i = this.editFileRecordsForUpload.indexOf(fileRecord);
      if (i !== -1) {
        this.editFileRecordsForUpload.splice(i, 1);
      } else {
        this.editdeleteUploadedFile(fileRecord);
      }
    }
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
        {
          name: "MOD_NAME",
          title: "Module Name",
          // width: "30%"
          sortField: "MOD_NAME",
        },
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
        {
          name: "__slot:document",
          title: "Document"
          // width: "20%"
        },
        {
          name: "__slot:actions",
          title: "Action",
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
      fileRecordsDisplay: [
          // {
          //   "name":"Some Large File.zip",
          //   "size": 10, // 24 MB
          //   "type": "application/zip",
          //   "ext":"zip",
          // },
        ],
      templateListCount:null,
      uploadFileName: "",
      uploadFileOject: "",
      editUploadFileObject: "",
      editUploadFileName: "",
      moduleList: [],
      currentPage: 1,
      imgUrl: "",

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
 .file-error-message, .file-ext{
//   display: none !important;
 }

</style>

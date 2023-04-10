<template>
  <div class="">
    <!-- <div class="container-fluid"> -->
    <vudal name="simpleModal" class="widthModal">
      <div class="header">
        Add Exception
        <i class="close icon">&times;</i>
        <br />
      </div>
      <div class="content">
        <vue-form-generator
          :model="model"
          :schema="addExceptionSchema"
          :options="formOptions"
          ref="exceptionForm"
        />
      </div>
      <div class="actions">
        <button
          type="button"
          class="cancel vudal-btn mr-2 btn btn-danger btn-fill btn-md"
        >
          <i class="fa fa-times" /> &nbsp; Close
        </button>
        <button
          @click="add"
          type="button"
          class="mr-2 btn btn-primary btn-fill btn-md"
        >
          <i class="fa fa-plus" /> &nbsp; Add
        </button>
      </div>
    </vudal>
    <vudal name="simpleModalEdit" class="widthModal">
      <div class="header">
        Edit Exception
        <i class="close icon">&times;</i>
        <br />
      </div>
      <div class="content">
        <vue-form-generator
          :model="model"
          :schema="editExceptionSchema"
          :options="formOptions"
        />
      </div>
      <div class="actions">
        <button
          type="button"
          class="cancel vudal-btn mr-2 btn btn-danger btn-fill btn-md"
        >
          <i class="fa fa-times" /> &nbsp; Close
        </button>
        <button
          @click="editExceptionAPI"
          type="button"
          class="cancel vudal-btn mr-2 btn btn-primary btn-fill btn-md"
        >
          <i class="fa fa-edit" /> &nbsp; Update
        </button>
      </div>
    </vudal>
    <div class="row">
      <div class="col-12">
        <va-card>
          <h3 class="card-title">Calendar Management</h3>
          <br />
          <div class="row justify-content-center">
            <div class="widthCalendar">
              <FullCalendar :options="calendarOptions" />
            </div>
          </div>
          <br /><br />
          <div class="float-right">
            <button
              @click="addException"
              type="button"
              class="btn btn-primary btn-fill btn-md"
            >
              <i class="fa fa-plus" /> &nbsp; Add Exception
            </button>
          </div>
          <br /><br /><br />
          <!-- <div class="col float-right">
          </div>  -->

          <!-- <br /> -->
          <!-- <div class="col float-left"> -->
            <!-- <div class="float-right">
            <h5>
              <b-badge
                v-b-tooltip.hover
                title="search"
                v-b-toggle.collapse-1
                class="mr-1"
                variant="secondary"
              >
                <i class="fa fa-search"></i>
              </b-badge>
            </h5>
          </div>  -->
          <div class="float-right">
            <va-input
              :value="term"
              :placeholder="$t('Search')"
              @input="search"
              removable
            >
              <va-icon name="fa fa-search" slot="prepend" />
            </va-input>
          </div>
          <!-- </div> -->
          <br /><br /><br />
          <va-card class="mt-2">
              <va-data-table
                :fields="fields"
                :data="filteredData"
                :per-page="parseInt(perPage)"
                :datacount="CalendarCount"
                :dataperpage="parseInt(perPage)"

              clickable
              >
                <template slot="no" slot-scope="row">
                  {{ row.rowIndex + 1 }}
                </template>
                <template slot="actions" slot-scope="props">
                  <h4 class="mt-2">
                    <span
                      v-b-tooltip.hover
                      title="edit"
                      @click="editException(props.rowData)"
                      class="badge badge-primary mr-1"
                    >
                      <i class="fa fa-edit"></i
                    ></span>
                  </h4>
                  <h4 class="mt-2">
                    <span
                      v-b-tooltip.hover
                      title="delete"
                      @click="deleteException(props.rowData)"
                      class="badge badge-danger mr-1"
                    >
                      <i class="fa fa-trash"></i
                    ></span>
                  </h4>
                </template>
              </va-data-table>
              <!-- <div class="flex xs12 md float-right"> -->

              <!-- </div> -->
          </va-card>
          <br/>
          <br/>
          <va-card>
               <div class="ml-1 col-md-11">
          <div id="app">
            <VueFileAgent
              ref="vueFileAgent"
              :theme="'list'"
              :multiple="false"
              :deletable="true"
              :meta="true"
              :linkable="true"
              :accept="'application/*,.xls,.xlsx,.csv'"
              :maxSize="'2MB'"
              :helpText="'Choose document'"
              :errorText="{
                type: 'Invalid file type. Only .xlsx is Allowed',
                size: 'Files should not exceed 2MB in size',
              }"
              @select="filesSelected($event)"
              @beforedelete="onBeforeDelete($event)"
              v-model="fileRecords"
            ></VueFileAgent>
          </div>
        </div>
        <br/>
        <div class='float-right'>
         <button
              class="mr-2 btn btn-success btn-fill btn-md"
              type="button"
              @click="chooseFiles"
              :disabled='isDisabled'
            >
              <i class="fa fa-file-excel-o" /> &nbsp;Upload Excel
            </button>
        </div>
          </va-card>
        </va-card>
      </div>
    </div>
    <!-- </div> -->
  </div>
</template>

<script>
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import Vudal from "vudal";
import VfgFunctionalDate from "../../component/VfgFunctionalCalendar.vue";
import Vue from "vue";
import * as servicesModule0 from "../../../app/module0/services";
import moment from "moment";
import { debounce } from "lodash";
import XLSX from "xlsx";
Vue.component("field-vfg-functional-date", VfgFunctionalDate);
export default {

  components: {
    FullCalendar, // make the <FullCalendar> tag available
    Vudal
  },

  mounted() {
    this.getAllException();
    const user = localStorage.getItem('user')
    this.uid=JSON.parse(user).user_id;
   // console.log('name111111 :' + JSON.parse(user).nric)
  // console.log('userid2 :',this.uid)
  },

  computed: {
    fields() {
      return [
        {
          name: "__slot:marker",
          width: "15px",
          dataClass: "text-center"
        },
        {
          name: "__slot:no",
          title: "No"
        },
        {
          name: "CALENDAR_NAME",
          title: "Name",
          sortField: "CALENDAR_NAME"
        },
        {
          name: "CALENDAR_DATE_START",
          title: "Start Date"
        },
        {
          name: "CALENDAR_DATE_END",
          title: "Finish Date"
        },
        {
          name: "CALENDAR_DESCRIPTION",
          title: "Description"
        },
        {
          name: "__slot:actions",
          title: "Action",
          dataClass: "inline",
          //width: "15%",

        }
      ];
    },
    filteredData() {
      if (!this.term || this.term.length < 1) {
        return this.holidayList;
      }
      return this.holidayList.filter(item => {
        return this.term
          .toLowerCase()
          .split(" ")
          .every(
            v =>
              item.CALENDAR_NAME.toLowerCase().includes(v) ||
              item.CALENDAR_DATE_START.toLowerCase().includes(v) ||
              item.CALENDAR_DATE_END.toLowerCase().includes(v) ||
              item.CALENDAR_DESCRIPTION.toLowerCase().includes(v)
          );
      });
    }
  },
  data() {
   return {
      CalendarCount: null,
      isDisabled: true,
      id: null,
      uid:"",
      excelFile: "",
      term: null,
      perPage: 10,
      // perPageOptions: ["4", "6", "10", "20"],
      calendarOptions: {
        plugins: [ dayGridPlugin, interactionPlugin ],
        initialView: 'dayGridMonth',
        events: [],
       // displayEventTime: true,
       // eventBackgroundColor: '#378006',
      // eventDisplay:'block',
     // nextDayThreshold: '00:00:00',
      

      },
      holidayList: [],
      filter: "",
      currentPage: 1,
    //  perPageSelected: 5,
      fileRecords: [],
      fileRecordsForUpload: [],
      uploadFileObject: [],

      editExceptionSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "input",
                inputType: "text",
                label: "Name",
                model: "modelEdit.CALENDAR_NAME",
                placeholder: "Enter name",
                required: true,
                validator: "string",
                styleClasses: "col-md-12"
              },
              {
                labels: "Start Date",
                type: "vfg-functional-date",
                placeholder: "Start Date",
                model: "modelEdit.CALENDAR_DATE_START",
                noLabel: true,
                format: "dd-MM-yyyy",
                styleClasses: "col-md-12",
                required: true,
                validator: "date",
                 onChanged: (model, newVal, oldVal, field) =>{
                    var startdate= moment(this.model.modelEdit.CALENDAR_DATE_START).unix();
                    var enddate= moment(this.model.modelEdit.CALENDAR_DATE_END).unix();
                      if(startdate > enddate)
                      {
                        alert("Start Date Cannot Bigger Than End Date");
                        this.model.modelEdit.CALENDAR_DATE_START="";
                       // this.model.modelAdd.CALENDAR_DATE_END="";
                      }
                },
              },
              {
                labels: "Finish Date",
                type: "vfg-functional-date",
                placeholder: "Finish Date",
                model: "modelEdit.CALENDAR_DATE_END",
                noLabel: true,
                format: "dd-MM-yyyy",
                styleClasses: "col-md-12",
                required: true,
                validator: "date",
                 onChanged: (model, newVal, oldVal, field) =>{
                    var startdate= moment(this.model.modelEdit.CALENDAR_DATE_START).unix();
                    var enddate= moment(this.model.modelEdit.CALENDAR_DATE_END).unix();
                      if(startdate > enddate)
                      {
                        alert("End Date Cannot Less Than Start Date");
                       // this.model.modelAdd.CALENDAR_DATE_START="";
                        this.model.modelEdit.CALENDAR_DATE_END="";
                      }
                },
              },
              {
                type: "input",
                inputType: "text",
                label: "Description",
                model: "modelEdit.CALENDAR_DESCRIPTION",
                placeholder: "Enter discription",
                required: true,
                validator: "string",
                styleClasses: "col-md-12"
              }
            ]
          }
        ]
      },
      addExceptionSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "input",
                inputType: "text",
                label: "Name",
                model: "modelAdd.CALENDAR_NAME",
                placeholder: "Enter name",
                required: true,
                validator: "string",
                styleClasses: "col-md-12"
              },
              {
                labels: "Start Date",
                type: "vfg-functional-date",
                placeholder: "Start Date",
                model: "modelAdd.CALENDAR_DATE_START",
                typeable: false,
                noClearButton: true,
                format: "dd-MM-yyyy",
                styleClasses: "col-md-12",
                required: true,
                validator:"date",
                onChanged: (model, newVal, oldVal, field) =>{
                    var startdate= moment(this.model.modelAdd.CALENDAR_DATE_START).unix();
                    var enddate= moment(this.model.modelAdd.CALENDAR_DATE_END).unix();
                      if(startdate > enddate)
                      {
                        alert("Start Date Cannot Bigger Than End Date");
                        this.model.modelAdd.CALENDAR_DATE_START="";
                       // this.model.modelAdd.CALENDAR_DATE_END="";
                      }
                },
              },
              {
                labels: "Finish Date",
                type: "vfg-functional-date",
                placeholder: "Finish Date",
                model: "modelAdd.CALENDAR_DATE_END",
                typeable: false,
                noClearButton: true,
                format: "dd-MM-yyyy",
                styleClasses: "col-md-12",
                required: true,
                validator: "date",
                 onChanged: (model, newVal, oldVal, field) =>{
                    var startdate= moment(this.model.modelAdd.CALENDAR_DATE_START).unix();
                    var enddate= moment(this.model.modelAdd.CALENDAR_DATE_END).unix();
                      if(startdate > enddate)
                      {
                        alert("End Date Cannot Less Than Start Date");
                       // this.model.modelAdd.CALENDAR_DATE_START="";
                        this.model.modelAdd.CALENDAR_DATE_END="";
                      }
                },
              },
              {
                type: "input",
                inputType: "text",
                label: "Description",
                model: "modelAdd.CALENDAR_DESCRIPTION",
                placeholder: "Enter discription",
                required: true,
                validator: "string",
                styleClasses: "col-md-12"
              }
            ]
          }
        ]
      },

      schema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "input",
                inputType: "text",
                model: "modelFilter.CALENDAR_NAME",
                label: "Name",
                styleClasses: "col-md-6"
              },
              {
                labels: "Start Date",
                type: "vfg-functional-date",
                placeholder: "Start Date",
                model: "modelFilter.CALENDAR_DATE_START",
                noLabel: true,
                format: "dd-MM-yyyy",
                styleClasses: "col-md-6"
              },
              {
                labels: "Finish Date",
                type: "vfg-functional-date",
                placeholder: "Finish Date",
                model: "modelFilter.CALENDAR_DATE_END",
                noLabel: true,
                format: "dd-MM-yyyy",
                styleClasses: "col-md-6"
              },
              {
                type: "input",
                inputType: "text",
                model: "modelFilter.CALENDAR_DESCRIPTION",
                label: "Description",
                styleClasses: "col-md-6"
              }
            ]
          }
        ]
      },

      formOptions: {
        // validationErrorClass: "has-error",
        // validationSuccessClass: "has-`success`",
        validateAfterChanged: true
      },

      model: {
         CALENDAR_NAME: "",
          CALENDAR_DATE_START: '',
          CALENDAR_DATE_END: '',
          CALENDAR_DESCRIPTION: "",

        modelAdd: {
          CALENDAR_NAME: "",
          CALENDAR_DATE_START: null,
          CALENDAR_DATE_END: null,
          CALENDAR_DESCRIPTION: ""
        },

        modelEdit: {
          SETTING_CALENDAR_ID: null,
          CALENDAR_NAME: "",
          CALENDAR_DATE_START: null,
          CALENDAR_DATE_END: null,
          CALENDAR_DESCRIPTION: ""
        },

        modelFilter: {
          CALENDAR_NAME: "",
          CALENDAR_DATE_START: null,
          CALENDAR_DATE_END: null,
          CALENDAR_DESCRIPTION: ""
        }
      },

      dataExcel: []
    };
  },

  methods: {
    search: debounce(function(term) {
      this.term = term;
    }, 400),

   /* async filterException() {
      try {

        if (this.model.modelFilter.CALENDAR_DATE_START != null) {
          this.model.modelFilter.CALENDAR_DATE_START = moment(
            this.model.modelFilter.CALENDAR_DATE_START
          ).format("YYYY-MM-DD");
        }
        if (this.model.modelFilter.CALENDAR_DATE_END != null) {
          this.model.modelFilter.CALENDAR_DATE_END = moment(
            this.model.modelFilter.CALENDAR_DATE_END
          ).format("YYYY-MM-DD");
        }

        const response = await servicesModule0.filterException(
          this.model.modelFilter
        );
        if (response != "error") {
          this.holidayList = response;
        }
      } catch (error) {}
    },*/
    async getAllException() {
      const response = await servicesModule0.getAllExceptionList();
      console.log("Calendar Response=",response);
      if (response != "error") {
        this.holidayList = response;
        let events = [];
        let times="T00:00:00";
        let timeend="T11:59:59";
        this.holidayList.forEach(element => {
          events.push({
                title: element.CALENDAR_NAME,
                backgroundColor: "green",
                display: 'block',
                //start:element.CALENDAR_DATE_START_EVENT,
               // end:element.CALENDAR_DATE_END_EVENT,
                start: `${element.CALENDAR_DATE_START_EVENT}T00:00:00`,
                end: `${element.CALENDAR_DATE_END_EVENT}T11:59:59`,
          });
        });
        this.calendarOptions.events = events;
        console.log('this.events = ', this.calendarOptions.events);
        this.CalendarCount = this.holidayList.length;
      }
    },

    handleDateClick: function(calEvent, jsEvent, view) {
      // alert("testClick");
    },

    addException() {
      this.$modals.simpleModal.$show();
    },

    async add() {
      if (this.$refs.exceptionForm.validate()) {

          var startdate= moment(this.model.modelAdd.CALENDAR_DATE_START).unix();
          var enddate= moment(this.model.modelAdd.CALENDAR_DATE_END).unix();
          if(startdate > enddate)
          {
            alert("Start Date Cannot Bigger Than End Date");
             this.$modals.simpleModal.$show();
          }
          else{
            const data = new FormData();
            data.append("CALENDAR_NAME", this.model.modelAdd.CALENDAR_NAME);
            data.append(
            "CALENDAR_DATE_START",
            moment(this.model.modelAdd.CALENDAR_DATE_START).format("YYYY-MM-DD")
            );
            data.append(
            "CALENDAR_DATE_END",
            moment(this.model.modelAdd.CALENDAR_DATE_END).format("YYYY-MM-DD")
            );
            data.append(
            "CALENDAR_DESCRIPTION",
            this.model.modelAdd.CALENDAR_DESCRIPTION
            );
            data.append("CREATE_BY", this.uid);
         try {
          //console.log(data);
          const response = await servicesModule0.createException(data);
          this.getAllException();
          this.model.modelAdd.CALENDAR_NAME="";
          this.model.modelAdd.CALENDAR_DATE_START="";
          this.model.modelAdd.CALENDAR_DATE_END="";
          this.model.modelAdd.CALENDAR_DESCRIPTION="";
          this.$modals.simpleModal.$hide();
        } catch (error) {
          console.log(error);
        }
       }
      }
    },

    async deleteException(data) {
      if (confirm("Are you sure you want to delete?")) {
      const response = await servicesModule0.deleteException(
        data.SETTING_CALENDAR_ID
      );
      this.getAllException();
      }
    },

    deleteUploadedFile: function (fileRecord) {
    // Using the default uploader. You may use another uploader instead.
    this.$refs.vueFileAgent.deleteUpload(fileRecord);
    },
    async chooseFiles() {
      var content = [];
      const files = this.uploadFileObject;
      console.log("filename:",files);
       console.log("filenameOutside:",files.name);
      if(files != '')
      {
        const fileReader = new FileReader(); // construction function that can read the file content
        var vm = this;
        fileReader.onload = async function (e) {
          const data = e.target.result;
          //console.log("target file", e);
          const workbook = XLSX.read(data, {
            type: "binary", // binary
            cellDates: true,
            cellNF: false,
            cellText: false
          });
          console.log("Data=",workbook.SheetNames.length);
          var i;
          for (i = 0; i < workbook.SheetNames.length; i++) {
            const wsname = workbook.SheetNames[i]; //take the first sheet
            console.log("wsname=",wsname);
          const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname], {raw: false});//XLSX.utils.sheet_to_json(workbook.Sheets[wsname]); //Get the data in this table
            console.log("ws=",ws);
            if( typeof ws != 'array' && ws.length > 0){
              ws.forEach(w => content.push(w));
            }
          }
          console.log("Finaldata="+JSON.stringify(content));

          await servicesModule0.createMultiCalender(JSON.stringify(content));
            //this.holidayList = response1;
            this.isDisabled= true;
            this.fileRecords="";
            this.uploadFileObject="";
            this.onBeforeDelete(files);
          //files="";
            this.getAllException();

        }.bind(this);
        fileReader.readAsBinaryString(files);
      }else{
         this.getAllException();
         alert("Please Choose a File");
      }
    },


    async editException(data) {
      const response = await servicesModule0.getExceptionById(
        data.SETTING_CALENDAR_ID
      );
      this.$modals.simpleModalEdit.$show();
      this.model.modelEdit = response;
      // this.id = response.id;
      // this.model.editName = response.calendar_set_name;
      // this.model.editStartDate = response.calendar_set_start;
      // this.model.editFinishDate = response.calendar_set_end;
      // this.model.editDescription = response.calendar_set_desc;
    },

    async editExceptionAPI() {
       var startdate= moment(this.model.modelEdit.CALENDAR_DATE_START).unix();
          var enddate= moment(this.model.modelEdit.CALENDAR_DATE_END).unix();
          if(startdate > enddate)
          {
             this.$modals.simpleModalEdit.$show();
            alert("Start Date Cannot Bigger Than End Date");
          }
          else{
              try {
              const data = new FormData();
              data.append(
              "SETTING_CALENDAR_ID",
              this.model.modelEdit.SETTING_CALENDAR_ID
              );
              data.append("CALENDAR_NAME", this.model.modelEdit.CALENDAR_NAME);
              data.append(
              "CALENDAR_DATE_START",
              moment(this.model.modelEdit.CALENDAR_DATE_START).format("YYYY-MM-DD")
              );
              data.append(
              "CALENDAR_DATE_END",
              moment(this.model.modelEdit.CALENDAR_DATE_END).format("YYYY-MM-DD")
              );
              data.append(
              "CALENDAR_DESCRIPTION",
              this.model.modelEdit.CALENDAR_DESCRIPTION
              );
              data.append("CREATE_BY", this.uid);
              // data.append("_method", "PUT");

              const response = await servicesModule0.updateException(data);
              this.getAllException();
              // this.$modals.simpleModal.$hide();
              } catch (error) {
              console.log(error);
              }
        }
    },
    // fileDeleted: function (fileRecord) {
    //     var i = this.fileRecordsForUpload.indexOf(fileRecord);
    //     if (i !== -1) {
    //       this.fileRecordsForUpload.splice(i, 1);
    //     } else {
    //       this.deleteUploadedFile(fileRecord);
    //     }
    //   },
    filesSelected: function (fileRecordsNewlySelected) {
      console.log("File",fileRecordsNewlySelected);
      //  this.uploadFileObject = [];
      var validFileRecords = fileRecordsNewlySelected.filter(
        (fileRecord) => !fileRecord.error
      );
      const filename=validFileRecords[0].file.name
      this.isDisabled= false;
        if(filename != 'calendar.xlsx'){
          this.isDisabled= true;
          alert("Please Choose Correct File");
          this.onBeforeDelete(fileRecordsNewlySelected);
        }
        else{
          this.isDisabled= false;
          this.fileRecordsForUpload =
          this.fileRecordsForUpload.concat(validFileRecords);
          console.log(fileRecordsNewlySelected);
          this.uploadFileObject = this.fileRecordsForUpload[0].file;
        }

    },
    onBeforeDelete: function (fileRecord) {
      this.isDisabled= true;
      var i = this.fileRecordsForUpload.indexOf(fileRecord);
      if (i !== -1) {
        console.log("before delete");
        // queued file, not yet uploaded. Just remove from the arrays
        this.fileRecordsForUpload.splice(i, 1);
        var k = this.fileRecords.indexOf(fileRecord);
        if (k !== -1) this.fileRecords.splice(k, 1);
        this.uploadFileOject = [];
        for (i = 0; i < this.fileRecordsForUpload.length; i++) {
          this.uploadFileOject.push(this.fileRecordsForUpload[i].file);
        }
        console.log(this.uploadFileOject);

        this.value = this.uploadFileOject;
         this.uploadFileObject="";
      } else {
        this.$refs.vueFileAgent.deleteFileRecord(fileRecord);
      }
    },

    fileDeleted: function (fileRecord) {
      console.log("file delete");
      var i = this.fileRecordsForUpload.indexOf(fileRecord);
      if (i !== -1) {
        this.fileRecordsForUpload.splice(i, 1);
      } else {
        this.deleteUploadedFile(fileRecord);
      }
    },

  }
};
</script>

<style lang="scss">
.app-layout__main {
  background: #e8e8e8;
}

.widthCalendar {
  width: 50%;
  // height: 50%;
}

.fc-sat,
.fc-sun {
  background-color: red !important;
}

.weekend {
  color: #0000ff;
}

.inline {
  display: flex;
 // float: right;
}

.va-data-table__pagination {
  margin-top: 1rem;
  display: -webkit-box;
  display: -ms-flexbox;
  display: inherit;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: flex-end;
}


.fc-event-time{
  display: none;
}

</style>

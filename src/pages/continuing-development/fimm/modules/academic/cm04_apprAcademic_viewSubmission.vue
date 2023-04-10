<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">Academic : View Program Details</h4>
    </div>
    <div v-show="!dataReady">
      <div class="text-center text-danger my-2">
        <b-spinner class="align-middle"></b-spinner>
        <strong>Loading...</strong>
      </div>
    </div>
    <br />
    <DetailSubmittedProgram
      :module="module"
      :participantLists="participantList"
      :route="'f-apprAcademicViewDetailParticipant'"
    />
    <br />
    <!-- 2. list participant -->
    <br />
    <va-card>
      <div class="my-5 ml-2 col-md-12">
        <vue-form-generator
          :model="model"
          :schema="fileUploadSchema"
          :options="formOptions"
          ref="fileUploadForm"
        >
        </vue-form-generator>
      </div>
      <br/>

      <div class="ml-2 col-md-12">
        List Of Participants
        <hr />
        <br />
        <ParticipantList
          :fields="fields"
          :filter-data="filterData"
          :count="count"
          @view-document="viewPdf"
          @filter="filter"
          @filter-date="filterDate"
          @clear="clearFilter"
        />
        <br />
      </div>
      <div class="ml-2 col-md-12">
        <button
          @click="back"
          type="button"
          class="btn btn-primary btn-fill btn-md"
        >
          <i class="fa fa-step-backward" /> &nbsp; Previous
        </button>
      </div>
    </va-card>
    <br />
  </va-card>
</template>


<script>
  import "vue-form-generator/dist/vfg.css";
  import * as services07Module4 from "../../../../../app/module4/services07";
  import ParticipantList from "../components/participantList.vue";
  import DetailSubmittedProgram from "../../../distributor/modules/components/detailSubmittedProgram.vue";

  export default {
    mounted() {
      var data = localStorage.getItem("approval-academic-viewSubmission");
      this.PROGDATA = JSON.parse(data);
      this.getModuleByID(this.PROGDATA.MODULE_ID);
      this.getDocumentById(this.PROGDATA.MODULE_ID)
    },
    components: {
      ParticipantList,
      DetailSubmittedProgram
    },
    methods: {
      clearFilter(){
        this.term=''
      },
      filter(value) {
        if(value.includes('-')){
          this.term =  value.substr(0,6)+value.substr(7,2)+value.substr(10,4);
        }
        else{
          this.term = value;
        }
      },

      filterDate(value) {
        this.termDate = value;
      },

      viewPdf(document) {
        var byteCharacters = atob(document["DOC_BLOB"]);
        var byteNumbers = new Array(byteCharacters.length);
        for (var i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        var byteArray = new Uint8Array(byteNumbers);
        var file = new Blob([byteArray], {
          type: "application/pdf;base64",
        });
        var fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      },

      onModelUpdated(newVal, schema) {
        if (schema == "comment") {
          this.model.comment = String(newVal).toUpperCase();
        }
      },

      getModuleByID: async function (id) {
        const resModule = await services07Module4.getModule(id);
        const resParticipant = await services07Module4.getAcademicParticipantList(
          id
        );
        this.module = resModule;
        let remark = resModule.APPR_REMARK;
        this.participantList = resParticipant.data;
        this.dataReady = true;
        if (remark != null) {
          this.model.comment = remark;
        } else if (remark == null) {
          this.model.comment = "";
        }
      },

      async back() {
        this.$router.push('/fimm/approval-reading-allProgram');
      },
      saveAsDraft: async function () {
        const data = new FormData();
        var r = confirm("Are you sure to save as draft?");
        if (r == true) {
          const data = new FormData();
          data.append("APPR_PUBLISH_STATUS", 0); // save as draft
          data.append("TS_ID", 1); // draft
          data.append("APPR_REMARK", this.model.comment);
          const user = localStorage.getItem("user");
          data.append("CREATE_BY", JSON.parse(user).user_id);
          var noted = JSON.parse(user).USER_GROUP_NAME + " ON REVIEW";
          data.append("NOTE", noted);
          data.append("MODULE_ID", this.PROGDATA.MODULE_ID);

          try {
            const response = await services07Module4.moduleApproval(data);
            console.log("test", response);
            if (response) {
              this.submitApproval = false;
            }
            if (response.status) {
              // console.log(response);
              this.$router.push({
                name: "approvalReadingModuleList",
              });
            }
          } catch (error) {
            this.submitApproval = false;
          }
        }
      },
      approveCpd: async function () {
        if (confirm("Are you sure to approve of this submission?")) {
          this.submitApproval = true;
          const data = new FormData();
          data.append("DISTRIBUTOR_ID", this.module.COMPANY_ID);
          data.append("DIST_CREATE_BY", this.module.CREATE_BY);
          data.append("APPR_PUBLISH_STATUS", 1);
          var remarkEntry = "(CPD-Reading)This entry has been approved by FIMM";
          data.append("NOTI_REMARK", remarkEntry);
          data.append("APPR_REMARK", this.model.comment);
          data.append("NOTI_LOCATION", "d-readingModuleList");
          const user = localStorage.getItem("user");
          data.append("CREATE_BY", JSON.parse(user).user_id);
          var noted = "APPROVED BY " + JSON.parse(user).USER_GROUP_NAME;
          data.append("NOTE", noted);
          data.append("TS_ID", 3);
          data.append("MODULE_ID", this.PROGDATA.MODULE_ID);

          try {
            const response = await services07Module4.moduleApproval(data);
            if (response) {
              this.submitApproval = false;
            }
            if (response.status) {
              // console.log(response);
              this.$router.push({
                name: "approvalReadingModuleList",
              });
            }
          } catch (error) {
            this.submitApproval = false;
          }
        }
      },
      returnCpd: async function () {
        if (confirm("Are you sure to return of this submission?")) {
          const data = new FormData();
          const user = localStorage.getItem("user");

          data.append("DISTRIBUTOR_ID", this.module.COMPANY_ID);
          data.append("CREATE_BY", JSON.parse(user).user_id);
          data.append("DIST_CREATE_BY", this.module.CREATE_BY);
          data.append("APPR_PUBLISH_STATUS", 0); // draft
          data.append("APPR_REMARK", this.model.comment);
          var remarkEntry = "(CPD-Reading)This Entry has been returned by FIMM";
          data.append("NOTI_REMARK", remarkEntry);
          data.append("NOTI_LOCATION", "d-readingModuleList");
          var noted = "REVIEWED BY " + JSON.parse(user).USER_GROUP_NAME;
          data.append("NOTE", noted);
          data.append("TS_ID", 7);
          data.append("MODULE_ID", this.PROGDATA.MODULE_ID);

          try {
            const response = await services07Module4.moduleApprovalReturn(data);
            if (response) {
              this.submitApproval = false;
            }
            if (response.status) {
              // console.log(response);
              this.$router.push({
                name: "approvalReadingModuleList",
              });
            }
          } catch (error) {
            this.submitApproval = false;
          }
        }
      },

      rejectCpd: async function () {
        if (confirm("Are you sure to reject this submission?")) {
          const data = new FormData();
          const user = localStorage.getItem("user");

          data.append("DISTRIBUTOR_ID", this.module.COMPANY_ID);
          data.append("CREATE_BY", JSON.parse(user).user_id);
          data.append("DIST_CREATE_BY", this.module.CREATE_BY);
          data.append("APPR_PUBLISH_STATUS", 1);
          data.append("APPR_REMARK", this.model.comment);
          var remarkEntry = "(CPD-Reading)This Entry has been rejected by FIMM";
          data.append("NOTI_REMARK", remarkEntry);
          data.append("NOTI_LOCATION", "d-readingModuleList");
          var noted = "REVIEWED BY " + JSON.parse(user).USER_GROUP_NAME;
          data.append("NOTE", noted);
          data.append("TS_ID", 5);
          data.append("MODULE_ID", this.PROGDATA.MODULE_ID);

          try {
            const response = await services07Module4.moduleApprovalReturn(data);
            if (response) {
              this.submitApproval = false;
            }
            if (response.status) {
              // console.log(response);
              this.$router.push({
                name: "approvalReadingModuleList",
              });
            }
          } catch (error) {
            this.submitApproval = false;
          }
        }
      },

      formatDateTimestampToDate(datetimestamp) {
        var datetimestamp = new Date(datetimestamp);
        var dd = String(datetimestamp.getDate()).padStart(2, "0");
        var mm = String(datetimestamp.getMonth() + 1).padStart(2, "0"); //January is 0!
        var yyyy = datetimestamp.getFullYear();

        return dd + "-" + mm + "-" + yyyy;
      },

      getDocumentById: async function (moduleId) {
        const response = await services07Module4.getOneReadingDocument(moduleId);
        let document = response.data;
        if (document) {
          document.DOC_BLOB = this.b64toBlobPDF(
            document.DOC_BLOB,
            "application/pdf"
          );
          const data = {
            docID: document.MOD_DOCUMENT_ID,
            name: document.DOC_ORIGINAL_NAME + "." + document.DOC_FILETYPE,
            size: document.DOC_FILESIZE,
            type: document.DOC_FILETYPE,
            ext: "pdf",
            url: window.URL.createObjectURL(document.DOC_BLOB),
            urlResized: null,
            dimensions: {
              height: 0,
              width: 0,
            },
          };
          document.DOC_BLOB = new File(
            [document.DOC_BLOB],
            document.DOC_ORIGINAL_NAME + "." + document.DOC_FILETYPE,
            {
              type: document.DOC_BLOB.DOC_FILETYPE,
            }
          );
          this.file = document.DOC_BLOB;
          this.model.file.push(data);
        }
      },

      b64toBlobPDF(b64Data, contentType, sliceSize) {
        contentType = contentType || "";
        sliceSize = sliceSize || 512;
        var byteCharacters = window.atob(b64Data);
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
        return new File(byteArrays, "pot", {
          type: contentType,
        });
      },
    },
    computed: {
      filterData() {
        this.count = this.participantList.length;
        if (!(this.term || this.termDate)) {
          return this.participantList;
        }

        return this.participantList.filter((item) => {
          if (this.termDate) {
            let convertDate = this.formatDateTimestampToDate(item.DATE);
            return convertDate == this.termDate;
          } else if (
            item.PASSPORT_NUMBER &&
            this.term.toLowerCase() == item.PASSPORT_NUMBER.toLowerCase()
          ) {
            return this.term.toLowerCase() == item.PASSPORT_NUMBER.toLowerCase();
          } else {
            return this.term
              .toLowerCase()
              .split(" ")
              .every(
                (v) =>
                  item.NAME.toLowerCase().includes(v) ||
                  item.NRIC_NUMBER.toLowerCase().includes(v) ||
                  item.TITLE.toLowerCase().includes(v) ||
                  item.ZINE_MODE_DESCRIPTION.toLowerCase().includes(v) ||
                  item.PUBLISHER.toLowerCase().includes(v)
              );
          }
        });
      },
      fields() {
        return [
          {
            name: "__slot:no",
            title: "NO",
          },
          {
            name: "__slot:DATE",
            title: "DATE",
            dataClass: "justify-content-center",
            width: "8%",
          },

          {
            name: "NAME",
            title: "NAME",
          },
          {
            name: "__slot:NRIC_NUMBER",
            title: "NRIC NUMBER",
          },
          {
            name: "PASSPORT_NUMBER",
            title: "PASSPORT NUMBER",
          },
          {
            title: "QUALIFICATION TITLE",
            name: "QUALIFICATION_TITLE",
          },
          {
            name: "QUALIFICATION_MODE_DESCRIPTION",
            title: "QUALIFICATION MODE",
          },
          {
            name: "ORGANIZATION",
            title: "ORGANIZATION",
          },

        ];
      },
    },
    data() {
      return {
        participantList: [],
        module: null,
        approval: null,
        term: null,
        termDate: null,
        PROGDATA: "",
        dataReady: false,
        submitApproval: false,
        model: {
          comment: "",
          file: [],
        },
        reviewSchema: {
          fields: [
            {
              type: "textArea",
              model: "comment",
              label: "Remark/Comments",
              hint: "Max 1000 characters",
              max: 1000,
              placeholder: "Enter Remark/Comments",
              rows: 5,
              validator: "string",
              styleClasses: "col-md-12",
            },
          ],
        },
        formOptions: {
          validateAfterChanged: true,
        },
        fileUploadSchema: {
          groups: [
            {
              styleClasses: "row",
              fields: [
                {
                  labels: "Upload Supporting Document",
                  accept: ".pdf",
                  multiple: false,
                  text: "Choose a File",
                  model: "file",
                  type: "vfg-custom-multiple-file",
                  styleClasses: "col-md-12 pl-0",
                  disabled:true,
                },
              ],
            },
          ],
        },
      };
    },
  };
</script>

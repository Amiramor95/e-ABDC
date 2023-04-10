<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">
        Suspension/Revocation : View Form
      </h4>
    </div>
    <br />
    <va-card>
      <div class="ml-2 col-md-12">
        Details Form
        <hr />
        <table class="table table-striped">
          <tbody>
            <tr>
              <td style="width:20%">Effective Date</td>
              <td>{{ DISTDATA.EFFECTIVE_DATE }}</td>
              <td colspan="2"></td>
            </tr>
            <tr>
              <td>Date Start</td>
              <td style="width:20%">{{ DISTDATA.DATE_START }}</td>
               <td style="width:20%">Date End</td>
              <td>{{ DISTDATA.DATE_END }}</td>
            </tr>
            <tr>
              <td>Reason</td>
              <td colspan="3">{{ DISTDATA.REASON_FULL}}</td>

            </tr>
            <tr>
              <td>Status</td>
              <td colspan="3">{{ DISTDATA.SUBMISSION_TYPE }}</td>
            </tr>
             <tr>
              <td>Action by Distributor</td>
              <td colspan="3">{{ DISTDATA.DIST_ACTION }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </va-card>
    <br />
    <va-card v-if="dataActionReady" >
      <div class="ml-2 col-md-12">
        Appeal Status
        <hr />
        <table class="table table-striped">
          <tbody>
             <tr>
              <td style="width:20%">Submission Date</td>
              <td>{{ DISTDATA.DATE_APPEALED }}</td>
              <td colspan="2"></td>
            </tr>
            <tr>
              <td style="width:20%">Justification</td>
              <td>{{ DISTDATA.JUSTIFICATION }}</td>
              <td colspan="2"></td>
            </tr>
            <tr>
              <td>Documents Uploaded</td>
              <td colspan="3">

              <vue-form-generator
                :model="model"
                :schema="fileViewSchema"
                :options="formOptions"
                ref="fileUploadForm"
              >
              </vue-form-generator>

              </td>
            </tr>
            <tr>
              <td>Status</td>
              <td colspan="3">{{ DISTDATA.TS_PARAM }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </va-card>
    <br />
    <button @click="back" type="button" class="btn btn-primary btn-fill btn-md">
      <i class="fa fa-step-backward" /> &nbsp; Previous
    </button>

  </va-card>
</template>
<script>
import "vue-form-generator/dist/vfg.css";
import * as servicesModule1 from "../../../../app/module1/services01";

export default {
  mounted() {
    var data = localStorage.getItem("view-suspension-revocation-form");
    this.DISTDATA = JSON.parse(data);
    //alert(JSON.stringify(this.DISTDATA.DIST_ACTION));
    this.getAppealDocById();

    if (this.DISTDATA.DIST_ACTION == 'APPEALED'){
      this.dataActionReady = true;
      //alert(dataActionReady);
    }else{
      this.dataActionReady = false;
    }
  },

  components: {},

  methods: {
    back() {
      this.$router.go(-1);
    }, // back button

    getAppealDocById: async function () {
      const response = await servicesModule1.getAppealDocById(
        this.DISTDATA.SUSPEND_REVOKE_APPEAL_ID
      );
      //alert(JSON.stringify(response));
      response.forEach((element) => {
        console.log(element.DOC_BLOB);
        element.DOC_BLOB = this.b64toBlobPDF(
          element.DOC_BLOB,
          "application/pdf"
        );
        console.log("mula");
        console.log(element.DOC_BLOB); // <----- cuba tgk ini
        console.log("habis");
        element.DOC_BLOB = new File(
          [element.DOC_BLOB],
          element.DOC_ORIGINAL_NAME + "." + element.DOC_FILETYPE,
          { type: element.DOC_BLOB.type }
        );
        console.log(element.DOC_BLOB);
        const data = {
          docID: element.SR_APPEAL_DOC_ID,
          name: element.DOC_ORIGINAL_NAME + "." + element.DOC_FILETYPE,
          size: element.DOC_FILESIZE,
          type: element.DOC_FILETYPE,
          ext: "exe",
          url: window.URL.createObjectURL(element.DOC_BLOB),
        };

        this.file = element.DOC_BLOB;
        //alert(JSON.stringify(element.DOC_BLOB));
        this.model.file.push(data);
        //alert(JSON.stringify(data));
      });
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

  },

  computed: {

  },

  data() {
    return {
        DISTDATA:'',
        dataActionReady: false,

      model: {
        fileUpload: "",
        file: [],
      },

         fileViewSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                accept: ".PNG,.PDF,.XLSX,.XLS,.JPG,.JPEG,.CSV,.DOC,.DOCX",
                multiple: true,
                text: "Choose a File",
                model: "file",
                type: "vfg-custom-file-view",
                styleClasses: "col-md-12",
                required: false,
                disabled: true,
              },
            ],
          },
        ],
      },

       formOptions: {
        validateAfterChanged: true,
      },
  }
  },
};
</script>
<style lang="scss">
.va-data-table__vuetable th.sortable {
  color: #34495e !important;
}

.va-table th,
.content table th {
  text-transform: uppercase;
  color: #34495e !important;
  border-bottom: 2px solid #34495e;
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

.content {
  margin-top: 30px;
  font-size: 20px;
}
.inline {
  display: inline-flex;
  float: right;
}
.display-inline label {
  display: inline !important;
  padding: 5px;
}
</style>

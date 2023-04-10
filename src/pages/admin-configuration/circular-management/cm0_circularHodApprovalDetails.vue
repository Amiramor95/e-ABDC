<template>
  <va-card>
    <h4 slot="header" class="card-title">Circular Detail</h4>
    <br />
    <div class="row">
      <div class="col-md-3">
        <b><h5 class="card-title">Circular Title :</h5></b>
      </div>
      <div class="col-md-9">
        <p class="text-left">
          Cancellation of FIMM Examination Sessions on 21 November and 12
          December 2020 – Kota Bharu
        </p>
      </div>
    </div>
    <br />

    <div class="row">
      <div class="col-md-3">
        <b><h5 class="card-title">Content :</h5></b>
      </div>
      <div id="app" class="col-md-9">
        <p class="text-left">
          The Federation of Investment Managers Malaysia (FIMM) launched of its
          first ever full-fledged public service awareness campaign which aims
          to educate the public on FIMM’s role as a self-regulatory organisation
          (SRO). “Investors’ interest in Unit Trust (UT) and Private Retirement
          Scheme (PRS) is one of our top priorities. The timing of this campaign
          is also very pertinent to the public, as we see more and more people
          do not mind handing over cash for investments and signing incomplete
          forms for their convenience, which are against standard practice of UT
          and PRS investments. Hence, this campaign acts as a platform to
          educate the public on their rights as an investor and to let people
          know that FIMM is the authorised regulatory body in charge of managing
          Unit Trust Companies and their consultant’s code of conduct,” said
          Dato’ Norazharuddin Abu Talib, the newly appointed Chief Executive
          Officer of FIMM.
        </p>
        <!-- <vue-editor v-model="content"></vue-editor> -->
      </div>
    </div>
    <br />

    <div class="row">
      <div class="col-md-3">
        <b><h5 class="card-title">Document :</h5></b>
      </div>
      <div id="app" class="col-md-9">
        <VueFileAgent
          ref="vueFileAgent"
          :theme="'list'"
          :multiple="true"
          :deletable="false"
          :meta="true"
          :readonly="true"
          :linkable="true"
          :accept="'.pdf,.doc,.docx,.ods'"
          :maxSize="'10MB'"
          :helpText="'Choose document'"
          :errorText="{
            type: 'Invalid file type. Only pdf or doc, docx or ods Allowed',
            size: 'Files should not exceed 10MB in size'
          }"
          @beforedelete="onBeforeDelete($event)"
          @delete="fileDeleted($event)"
          v-model="fileRecords"
        ></VueFileAgent>
        <!-- <button :disabled="!fileRecordsForUpload.length" @click="uploadFiles()">
                    Upload {{ fileRecordsForUpload.length }} files
                </button> -->
      </div>
    </div>
    <br />

    <div class="row">
      <div class="col-md-3">
        <b><h5 class="card-title">Start Date :</h5></b>
      </div>
      <div class="col-md-9">
        <!-- <div class="form-group"> -->
        <p class="text-left">24-11-2020</p>
        <!-- </div> -->
      </div>
    </div>
    <br />
    <div class="row">
      <div class="col-md-3">
        <b><h5 class="card-title">End Date :</h5></b>
      </div>
      <div class="col-md-9">
        <!-- <div class="form-group"> -->
        <p class="text-left">24-12-2020</p>
        <!-- </div> -->
      </div>
    </div>
    <br />

    <div class="row">
      <div class="col-md-3">
        <b><h5 class="card-title">Set Audience Category :</h5></b>
      </div>
      <div class="col-md-9">
        <div class="row">
          <div class="col-4" v-for="(item, index) in compType" :key="index">
            <div class="row mb-2">
              <va-checkbox class="col-2" v-model="item.selected" />
              <span class="col mt-2 description">
                {{ item.name }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br />

    <div class="row">
      <div class="col-md-3">
        <b><h5 class="card-title">Remark :</h5></b>
      </div>
      <div class="col-md-9">
        <!-- <div class="form-group"> -->
        <textarea
          class="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
        ></textarea>
        <!-- </div> -->
      </div>
    </div>

    <br />
    <br />
    <button
      @click="back"
      type="button"
      class="float-left btn btn-primary btn-fill btn-md"
    >
      <i class="fa fa-step-backward" /> &nbsp; Previous
    </button>
    <div class="ml-2 float-right">
      <button
        @click="save"
        type="button"
        class="mr-2 btn btn-warning btn-fill btn-md"
      >
        <i class="fa fa-reply" /> &nbsp; Return
      </button>
      <b-button
        @click="submit"
        type="button"
        class="btn btn-success btn-fill btn-md"
      >
        <i class="fa fa-paper-plane" /> &nbsp; Approve
      </b-button>
    </div>
    <!-- <br />
                <br />
                <br />
                <br /> -->
  </va-card>
</template>

<script>
export default {
  methods: {
    save () {},
    submit () {},
    back () {},

    uploadFiles: function () {
      // Using the default uploader. You may use another uploader instead.
      // this.$refs.vueFileAgent.upload(this.uploadUrl, this.uploadHeaders, this.fileRecordsForUpload);
      // this.fileRecordsForUpload = [];
      console.log(JSON.stringify(this.$refs.vueFileAgent))
      // console.log(JSON.stringify(this.uploadHeaders));
      // console.log(JSON.stringify(this.$refs.vueFileAgent.file));
    },
    deleteUploadedFile: function (fileRecord) {
      // Using the default uploader. You may use another uploader instead.
      this.$refs.vueFileAgent.deleteUpload(
        this.uploadUrl,
        this.uploadHeaders,
        fileRecord,
      )
    },
    filesSelected: function (fileRecordsNewlySelected) {
      console.log('selected')
      var validFileRecords = fileRecordsNewlySelected.filter(
        fileRecord => !fileRecord.error,
      )
      this.fileRecordsForUpload = this.fileRecordsForUpload.concat(
        validFileRecords,
      )
    },
    onBeforeDelete: function (fileRecord) {
      var i = this.fileRecordsForUpload.indexOf(fileRecord)
      if (i !== -1) {
        // queued file, not yet uploaded. Just remove from the arrays
        this.fileRecordsForUpload.splice(i, 1)
        var k = this.fileRecords.indexOf(fileRecord)
        if (k !== -1) this.fileRecords.splice(k, 1)
      } else {
        if (confirm('Are you sure you want to delete?')) {
          this.$refs.vueFileAgent.deleteFileRecord(fileRecord) // will trigger 'delete' event
        }
      }
    },
    fileDeleted: function (fileRecord) {
      var i = this.fileRecordsForUpload.indexOf(fileRecord)
      if (i !== -1) {
        this.fileRecordsForUpload.splice(i, 1)
      } else {
        this.deleteUploadedFile(fileRecord)
      }
    },
  },
  data () {
    return {
      content: '<h5></h5>',
      fileRecords: [
        {
          name: 'example.pdf',
          size: 10,
          type: 'pdf',
          ext: 'exe',
          url:
            'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        },
        {
          name: 'example2.pdf',
          size: 10,
          type: 'pdf',
          ext: 'exe',
          url:
            'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        },
        {
          name: 'example3.pdf',
          size: 10,
          type: 'pdf',
          ext: 'exe',
          url:
            'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        },
      ],
      uploadUrl: 'https://www.mocky.io/v2/5d4fb20b3000005c111099e3',
      uploadHeaders: { 'X-Test-Header': 'vue-file-agent' },
      fileRecordsForUpload: [],
      content: '<h5></h5>',

      compType: [
        {
          id: '1',
          name: 'UTMC',
          selected: false,
        },
        {
          id: '2',
          name: 'IUTA',
          selected: false,
        },
        {
          id: '3',
          name: 'CUTA',
          selected: false,
        },
        // {
        //     id: "4",
        //     name: "IUTA",
        //     selected: true
        // },
        {
          id: '5',
          name: 'CPRA',
          selected: true,
        },
        {
          id: '6',
          name: 'PRP',
          selected: false,
        },
        {
          id: '7',
          name: 'UTC',
          selected: true,
        },
        {
          id: '8',
          name: 'PRC',
          selected: true,
        },
        {
          id: '9',
          name: '3rd Party',
          selected: true,
        },
        {
          id: '10',
          name: 'Training Provider',
          selected: true,
        },
      ],
    }
  },
}
</script>

<style lang="scss">
.app-layout__main {
  background: #e8e8e8;
}

.bgcolor {
  background-color: white !important;
}
</style>

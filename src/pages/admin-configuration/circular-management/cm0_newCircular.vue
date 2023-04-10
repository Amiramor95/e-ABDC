<template>
  <va-card>
    <h4 v-if="id == undefined" slot="header" class="card-title">
      Create New Circular
    </h4>
    <h4 v-if="id != undefined" slot="header" class="card-title">
      Edit Circular
    </h4>
    <br />
    <div class="row">
      <div class="col-md-3">
        <b><h5 class="card-title">Circular Title :</h5></b>
      </div>
      <div class="col-md-9">
        <!-- <div class="form-group"> -->
        <!-- <p v-if="id != undefined" class="text-left">{{title}}</p> -->
        <input
          v-model="cirTitle"
          type="text"
          class="form-control form-control-md"
        />
        <!-- </div> -->
      </div>
    </div>
    <br />
    <div class="row">
      <div class="col-md-3">
        <b><h5 class="card-title">Content :</h5></b>
      </div>
      <div id="app" class="col-md-9">
        <vue-editor v-model="content"></vue-editor>
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
          :deletable="true"
          :meta="true"
          :linkable="true"
          :accept="'.pdf,.doc,.docx,.ods'"
          :maxSize="'10MB'"
          :helpText="'Choose document'"
          :errorText="{
            type: 'Invalid file type. Only pdf or doc, docx or ods Allowed',
            size: 'Files should not exceed 10MB in size'
          }"
          @select="filesSelected($event)"
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
        <!-- <p v-if="id != undefined" class="text-left">{{title}}</p> -->
        <datepicker
          format="dd-MM-yyyy"
          input-class="form-control form-control-md bgcolor"
          v-model="startDate"
          :typeable="false"
          name="uniquename"
        ></datepicker>
        <!-- </div> -->
      </div>
    </div>
    <br />
    <div class="row">
      <div class="col-md-3">
        <b><h5 class="card-title">End Date :</h5></b>
      </div>
      <div class="col-md-9">
        <datepicker
          format="dd-MM-yyyy"
          input-class="form-control form-control-md bgcolor"
          v-model="endDate"
          :typeable="false"
          name="uniquename"
        ></datepicker>
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
        class="mr-2 btn btn-info btn-fill btn-md"
      >
        <i class="fa fa-pencil-square-o" /> &nbsp; Save as draft
      </button>
      <b-button
        @click="submit"
        type="button"
        class="btn btn-primary btn-fill btn-md"
      >
        <i class="fa fa-paper-plane" /> &nbsp; Publish
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
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.id = to.params.id
      console.log(JSON.stringify(vm.id))
      if (vm.id != undefined) {
        vm.cirTitle =
          'Cancellation of FIMM Examination Sessions on 21 November and 12 December 2020 – Kota Bharu'
        vm.content =
          '<h5>The Federation of Investment Managers Malaysia (FIMM) launched of its first ever full-fledged public service awareness campaign which aims to educate the public on FIMM’s role as a self-regulatory organisation (SRO).Investors interest in Unit Trust (UT) and Private Retirement Scheme (PRS) is one of our top priorities. The timing of this campaign is also very pertinent to the public, as we see more and more people do not mind handing over cash for investments and signing incomplete forms for their convenience, which are against standard practice of UT and PRS investments. Hence, this campaign acts as a platform to educate the public on their rights as an investor and to let people know that FIMM is the authorised regulatory body in charge of managing Unit Trust Companies and their consultant’s code of conduct,” said Dato’ Norazharuddin Abu Talib, the newly appointed Chief Executive Officer of FIMM.</h5>'
        vm.startDate = '2020-12-10'
        vm.endDate = '2020-12-30';
        (vm.compType = [
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
            selected: true,
          },
          // {
          //     id: "4",
          //     name: "UTMC",
          //     selected: false
          // },
          {
            id: '5',
            name: 'CPRA',
            selected: false,
          },
          {
            id: '6',
            name: 'PRP',
            selected: true,
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
        ]),
        (vm.fileRecords = [
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
        ])
      }
    })
  },

  // props: {
  //   id: String
  // },
  // computed(){
  //    console.log("ssssss :"+this.id);
  // },

  methods: {
    save () {},
    submit () {
      console.log(JSON.stringify(this.startDate))
    },
    back () {
      this.$router.go(-1)
    },

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
      console.log(fileRecordsNewlySelected)
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
      content: '',
      startDate: '',
      endDate: '',
      cirTitle: '',
      id: '',
      fileRecords: [],
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
        //     selected: false
        // },
        {
          id: '5',
          name: 'CPRA',
          selected: false,
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

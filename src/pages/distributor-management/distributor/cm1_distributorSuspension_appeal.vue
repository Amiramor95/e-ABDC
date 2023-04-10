<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">Suspension</h4>
      <br />
      <br />
    </div>
    <va-card>
      <div class="ml-3 col-md-12">
        Suspension Details
        <span v-if="visibleProfile == false">:<b> {{ model.DIST_NAME }} </b></span>
        <button
          v-if="visibleProfile == true"
          v-b-toggle.collapse-1
          type="button"
          class="float-right btn-fill btn-md"
        >
          <i class="fa fa-eye-slash"></i>
        </button>
        <button
          v-if="visibleProfile == false"
          v-b-toggle.collapse-1
          type="button"
          class="float-right btn-fill btn-md"
        >
          <i class="fa fa-eye"></i>
        </button>

        <hr />
        <b-collapse id="collapse-1" class="mt-2" v-model="visibleProfile">
          <table class="table table-striped">
            <tbody>
              <tr>
                <td style="width: 15%">Distributor Name</td>
                <td>{{ model.DIST_NAME }}</td>
              </tr>
              <tr>
                <td>Start Date</td>
                <td>{{ model.SUSP_DATE_START_DISPLAY }}</td>
              </tr>
              <tr>
                <td>End Date</td>
                <td>{{ model.SUSP_DATE_END_DISPLAY }}</td>
              </tr>
              <tr>
                <td >Remarks/Comments</td>
                <td>{{ model.SUSP_REASON }}</td>
              </tr>
            </tbody>
          </table>
        </b-collapse>
      </div>
    </va-card>
    <br />
    <br />
    <!-- v-if="SUSP_STATUS != '16'" -->
    <va-card  >
      <h4 slot="header" class="card-title">Respond and Justification</h4>
      <div class="ml-3">
        <vue-form-generator
          :model="model"
          :schema="submissionSchema"
          :options="formOptions"
          ref="submissionForm"
        >
        </vue-form-generator>
      </div>
      <br />
      <div id="app" class="ml-3 col-md-11">
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
            size: 'Files should not exceed 10MB in size',
          }"
          @select="filesSelected($event)"
          @beforedelete="onBeforeDelete($event)"
          @delete="fileDeleted($event)"
          v-model="fileRecords"
        ></VueFileAgent>
      </div>
    </va-card>
    <br />
    <br />
    <button @click="back" type="button" class="btn btn-primary btn-fill btn-md">
      <i class="fa fa-step-backward" /> &nbsp; Previous
    </button>
    <div class="float-right">
      <button @click="saveAsDraft" type="button" class="mr-2 btn btn-info btn-fill btn-md">
        <i class="fa fa-pencil-square-o" /> &nbsp; Save as draft
      </button>
      <button @click="cancellationAccept" type="button" class="ml-1 btn btn-success btn-fill btn-md">
        <i class="fa fa-paper-plane" /> &nbsp; Accept
      </button>
      <button @click="cancellationAppeal" type="button" class="ml-1 btn btn-success btn-fill btn-md">
        <i class="fa fa-paper-plane" /> &nbsp; Appeal
      </button>
    </div>
  </va-card>
</template>

<script>
import 'vue-form-generator/dist/vfg.css'
import * as services06Module1 from '../../../app/module1/services06'
import * as services05Module1 from '../../../app/module1/services05'
// import Tabs from 'vue-tabs-with-active-line'

export default {
  props: {},

  mounted () {
    this.getDistributorById()
    this.getSuspensionDetails()
  },
  components: {},

  methods: {
    async getDistributorById () {
      const user = localStorage.getItem('user')
      const response = await services06Module1.getDistributorById(
        JSON.parse(user).user_id)
      if (response == null) {
        this.updateDistributor = false
      } else {
        this.model.DIST_NAME = response.DIST_NAME
      }
    },

    async getSuspensionDetails () {
      const user = localStorage.getItem('user')
      const response = await services05Module1.getSuspensionDetails(
        JSON.parse(user).user_id)
      if (response == null) {
        this.updateDistributor = false
      } else {
        this.model.SUSPENSION_ID = response.SUSPENSION_ID
        this.model.SUSP_DATE_START_DISPLAY = response.SUSP_DATE_START_DISPLAY
        this.model.SUSP_DATE_END_DISPLAY = response.SUSP_DATE_END_DISPLAY
        this.model.SUSP_REASON = response.SUSP_REASON
        this.model.SUSP_STATUS = response.SUSP_STATUS
      }
    },

    back () {
      this.$router.go(-1)
    }, // back button

    cancellationAccept: async function () {
      if (this.$refs.submissionForm.validate()) {
        const data = new FormData()
        data.append('SUSP_ID', this.model.SUSPENSION_ID)
        data.append('SUSP_APPEAL', this.model.remark)
        const user = localStorage.getItem('user')
        data.append('DIST_USER_ID', JSON.parse(user).user_id)
        data.append('SUSP_APPEAL_STATUS', '3')
        data.append('SUSP_PUBLISH_STATUS', '1')
        data.append('SUSP_STATUS', '3')

        try {
          const response = await services05Module1.createSuspensionAccept(data)
        } catch (error) {
          console.log(error)
        }
      }
    },

    cancellationAppeal: async function () {
      if (this.$refs.submissionForm.validate()) {
        const data = new FormData()
        data.append('SUSP_ID', this.model.SUSPENSION_ID)
        data.append('SUSP_APPEAL', this.model.remark)
        const user = localStorage.getItem('user')
        data.append('DIST_USER_ID', JSON.parse(user).user_id)
        data.append('SUSP_APPEAL_STATUS', '15')
        data.append('SUSP_PUBLISH_STATUS', '1')
        data.append('SUSP_STATUS', '16')

        try {
          const response = await services05Module1.createSuspensionAppeal(data)
        } catch (error) {
          console.log(error)
        }
      }
    },

    saveAsDraft: async function () {
      if (this.$refs.submissionForm.validate()) {
        const data = new FormData()
        data.append('SUSP_ID', this.model.SUSPENSION_ID)
        data.append('SUSP_APPEAL', this.model.remark)
        const user = localStorage.getItem('user')
        data.append('DIST_USER_ID', JSON.parse(user).user_id)
        data.append('SUSP_APPEAL_STATUS', '0')
        data.append('SUSP_PUBLISH_STATUS', '0')

        try {
          const response = await services05Module1.createSuspensionAppeal(data)
        } catch (error) {
          console.log(error)
        }
      }
    },

    deleteUploadedFile: function (fileRecord) {
      this.$refs.vueFileAgent.deleteUpload(
        this.uploadUrl,
        this.uploadHeaders,
        fileRecord,
      )
    },
    filesSelected: function (fileRecordsNewlySelected) {
      console.log('selected')
      var validFileRecords = fileRecordsNewlySelected.filter(
        (fileRecord) => !fileRecord.error,
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

    validatestatusForm () {
      return this.$refs.submissionForm.validate()
    },

  },

  computed: {},

  data () {
    return {
      currentTab: 'tab1',
      fileRecords: [],
      visibleProfile: true,

      model: {
        SUSP_ID: '',
        DIST_NAME: '',
        SUSP_DATE_START_DISPLAY: null,
        SUSP_DATE_END_DISPLAY: null,
        SUSP_REASON: '',
        remark: '',
        fileUpload: '',
      },

      submissionSchema: {
        fields: [
          {
            type: 'textArea',
            model: 'remark',
            label: 'Remark',
            hint: 'Max 1000 characters',
            max: 1000,
            placeholder: 'Enter Remark',
            rows: 5,
            validator: 'string',
            styleClasses: 'col-md-12',
          },
        ],
      },

      formOptions: {
        validateAfterChanged: true,
      },
    }
  },
}
</script>
<style lang="scss">
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
</style>

<template>
  <b-overlay :show="show_overlay" rounded="sm">
    <div class="consultant-appeal-section">
      <div class="row">
        <div class="col-12">
          <va-card>
            <h4 style="margin-top:0px; margin-bottom:20px">
              Candidate Appeal Application
            </h4>

            <br />

            <div v-if="!isAppealInProcess">
              <vue-form-generator
                :model="model"
                :schema="appealSchema"
                :options="formOptions"
                ref="appealSchema"
                @model-updated="onModelUpdated"
              >
              </vue-form-generator>

              <vue-form-generator
                :model="model2"
                :schema="appealDocumentSchema"
                :options="formOptions"
                ref="appealDocumentSchema"
                @model-updated="onModelUpdated"
              >
              </vue-form-generator>
            </div>

            <div v-else>
              <vue-form-generator
                :model="model"
                :schema="appealDataViewSchema"
                :options="formOptions"
                ref="appealDataViewSchema"
                @model-updated="onModelUpdated"
              >
              </vue-form-generator>

              <vue-form-generator
                :model="model2"
                :schema="appealDocumentViewSchema"
                :options="formOptions"
                ref="appealDocumentViewSchema"
                @model-updated="onModelUpdated"
              >
              </vue-form-generator>
            </div>

            <br />

            <div class="float-right" v-if="model.PUBLISH_STATUS==0">
              <button
                @click="submitData(0, 'Are you sure to save as draft?')"
                type="button"
                class="btn btn-info btn-fill btn-md"
              >
                <i class="fa fa-edit" /> &nbsp;Save as Draft
              </button>

              <button
                @click="submitData(1, 'Are you sure to Submit?')"
                type="button"
                class="ml-1 btn btn-primary btn-fill btn-md"
              >
                <i class="fa fa-paper-plane" /> &nbsp; Submit
              </button>
            </div>

            <!-- <div class="float-left">
                <button
                  @click="goToViewProfilePage"
                  type="button"
                  class="btn btn-primary btn-fill btn-md"
                >
                  <i class="fa fa-step-backward" /> &nbsp; Previous
                </button>
              </div> -->
          </va-card>

          <va-card class="mt-4">
            <div class="ml-2">
              Approval Log

              <button
                v-if="visibleLog"
                v-b-toggle.appeal-approval-logs
                type="button"
                class="float-right btn-fill btn-md"
              >
                <i class="fa fa-eye-slash"></i>
              </button>
              <button
                v-else
                v-b-toggle.appeal-approval-logs
                type="button"
                class="float-right btn-fill btn-md"
              >
                <i class="fa fa-eye"></i>
              </button>

              <hr />
              <b-collapse id="appeal-approval-logs" class="mt-2" v-model="visibleLog">
                <div class="row">
                  <div class="flex md2 offset--md10">
                    <va-input
                      :placeholder="$t('Search')"
                      v-model="filter.log"
                      removable
                    >
                      <va-icon name="fa fa-search" slot="prepend" />
                    </va-input>
                  </div>
                </div>
                <va-data-table
                  :fields="fields.log"
                  :data="appeallogAPI"
                  no-data-label="No data found"
                  :per-page="parseInt(perPage)"
                  :datacount="appeallogAPI.length"
                  :dataperpage="parseInt(perPage)"
                  clickable
                >
                  <template slot="no" slot-scope="row">
                    {{ row.rowIndex + 1 }}
                  </template>
                  <template slot="APPR_REMARK" slot-scope="props">
                    <span
                      v-b-tooltip.hover
                      v-on:click="readMore(props.rowData)"
                      title="Read more"
                      class="mr-2"
                    >
                      <i class="fa fa-window-restore"></i>
                    </span>
                  </template>
                  <!-- <template slot="updates" slot-scope="props">
                        {{ props.rowData.LATEST_UPDATE }}
                      </template> -->
                </va-data-table>
              </b-collapse>
            </div>

            <br />
          </va-card>
        </div>
      </div>

      <vudal name="readMoreModal" class="widthModal">
        <div class="header">
          Remark<i class="close icon">&times;</i>
        </div>
        <div class="content">
          <b-textarea rows="5" v-model="read_remark" disabled></b-textarea>
        </div>
        <div class="actions">
          <button
            type="button"
            class="cancel vudal-btn mr-2 btn btn-danger btn-fill btn-md"
          >
            <i class="fa fa-times" /> &nbsp; Close
          </button>
        </div>
      </vudal>
    </div>
  </b-overlay>
</template>

<script>
import Multiselect from 'vue-multiselect'
import Vudal from 'vudal'
import VueFormGenerator from 'vue-form-generator'
import 'vue-form-generator/dist/vfg-core.css'
import VueFormWizard from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import HorizontalScroll from 'vue-horizontal-scroll'
import 'vue-horizontal-scroll/dist/vue-horizontal-scroll.css'
import moment from 'moment'

import * as services02module2 from '@/app/module2/services02'
import * as services04module2 from '@/app/module2/services04'

import RepositoryFactory from '../../../repositories/RepositoryFactory'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.use(VueFormGenerator)
Vue.component(Vudal)
// register globally
Vue.component('multiselect', Multiselect)

/* -------------------------------------------------------------------------- */
/*                            endpointrepositories                            */
/* -------------------------------------------------------------------------- */
const ConsultantRecord = RepositoryFactory.get('consultantrecord')
const ConsultantAppeal = RepositoryFactory.get('consultantappeal')

export default {
  components: { Vudal },

  props: {
    consultantData: Object,
  },

  data () {
    return {
      isAppealInProcess: false,
      show_overlay: false,
      appealTypes: [], // fetching API Data,
      examRelatedTypes: [], // fetching API Data,
      consultantAppealData: '', // fetching API Data,
      visibleLog: false,
      appeallogAPI: [],
      currentPage: 1,
      perPage: '10',
      read_remark: '',

      formOptions: {
        validateAfterChanged: true,
      },

      visible: {
        APPEAL_EXAM_TYPE: false,
        DATE: true,
        DISCHARGE_DATE: false,
      },

      model: {
        APPEAL_TYPE_ID: '',
        APPEAL_EXAM_TYPE: '',
        DATE: '',
        CONSULTANT_REMARK: '',
        CREATE_BY: '',
        PUBLISH_STATUS: '',
        FIMM_TS_ID: '',
      },

      model2: {
        APPEAL_DOCUMENT: [],
      },

      fields: {
        log: [
          {
            name: '__slot:no',
            title: 'NO',
          },
          {
            name: 'DATE',
            title: 'Date',
            sortField: 'CREATE_TIMESTAMP',
          },
          {
            name: 'GROUP_NAME',
            title: 'Group',
            sortField: 'GROUP_NAME',
          },
          {
            name: 'DIST_NAME',
            title: 'Creation By',
            sortField: 'USER_NAME',
          },
          {
            name: 'TS_PARAM',
            title: 'Activity',
            sortField: 'TS_PARAM',
          },

          // {
          //   name: "LATEST_UPDATE",
          //   title: "Latest Update",
          //   sortField: "LATEST_UPDATE",
          // },
          {
            name: '__slot:APPR_REMARK',
            title: 'Remarks/Comments',
            sortField: 'APPR_REMARK',
          },
          {
            name: 'CREATE_TIMESTAMP',
            title: 'Latest Update',
            sortField: 'LATEST_UPDATE',
          },
        ],
      },

      filter: {
        distributor: '',
        consultant: '',
        log: '',
      },

      appealSchema: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              // {
              //   type: 'vueMultiSelect',
              //   label: 'Appeal Type',
              //   model: 'APPEAL_TYPE_ID',
              //   styleClasses: 'col-md-6',
              //   required: true,
              //   selectOptions: {
              //     multiple: false,
              //     label: 'TYPE_NAME',
              //     value: 'TYPE_ID',
              //     searchable: false,
              //   },
              //   values: (model, schema) => {
              //     return this.appealTypes;
              //   },
              // },
              {
                type: 'select',
                label: 'Appeal Type',
                model: 'APPEAL_TYPE_ID',
                styleClasses: 'col-md-6',
                required: true,
                selectOptions: {
                  hideNoneSelectedText: true,
                  name: 'TYPE_NAME',
                  value: 'TYPE_ID',
                  searchable: false,
                },
                values: (model, schema) => {
                  return this.appealTypes
                },
              },
              {
                type: 'vfg-functional-date2',
                inputType: 'date',
                labels: 'Date',
                noLabel: true,
                model: 'DATE',
                format: 'dd-MMM-yyyy',
                styleClasses: 'col-md-6',
                required: false,
                validator: 'date',
                // validator: ["required", this.validateStartDate]
                visible: (model, field, form) => {
                  return this.visible.DATE
                },
              },
              {
                type: 'vfg-functional-date2',
                inputType: 'date',
                labels: 'Discharge Date',
                noLabel: true,
                model: 'DATE',
                format: 'dd-MMM-yyyy',
                styleClasses: 'col-md-6',
                required: false,
                validator: 'date',
                // validator: ["required", this.validateStartDate]
                visible: (model, field, form) => {
                  return this.visible.DISCHARGE_DATE
                },
              },
              {
                type: 'select',
                label: 'Exam related appeal type',
                model: 'APPEAL_EXAM_TYPE',
                placeholder: 'Please specify',
                required: true,
                styleClasses: 'col-md-6',
                selectOptions: {
                  hideNoneSelectedText: true,
                  name: 'TYPE_NAME',
                  value: 'TYPE_ID',
                  searchable: false,
                },
                values: (model, schema) => {
                  return this.examRelatedTypes
                },
                visible: (model, field, form) => {
                  return this.visible.APPEAL_EXAM_TYPE
                },
              },
              {
                styleClasses: 'col-md-6',
                visible: (model, field, form) => {
                  return this.visible.APPEAL_EXAM_TYPE
                },
              },

              {
                type: 'textArea',
                required: true,
                rows: 10,
                max: 1000,
                label: 'Remarks / Comments',
                hint: 'maximum of 1000 characters',
                model: 'CONSULTANT_REMARK',
                placeholder: 'Enter Remarks or Comments',
                // validator: 'number',
                styleClasses: 'col-md-12',
              },
            ],
          },
        ],
      },

      appealDocumentSchema: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                theme: 'list',
                labels: 'Upload Document',
                accept: '.pdf',
                multiple: false,
                text: 'Choose document(s)',
                model: 'APPEAL_DOCUMENT',
                type: 'vfg-consultant-custom-multiple-file',
                styleClasses: 'col-md-12',
                hint: 'Accepted format : (.pdf)',
                required: true,
              },
            ],
          },
        ],
      },

      appealDataViewSchema: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'select',
                label: 'Appeal Type',
                model: 'APPEAL_TYPE_ID',
                styleClasses: 'col-md-6',
                required: true,
                selectOptions: {
                  hideNoneSelectedText: true,
                  name: 'TYPE_NAME',
                  value: 'TYPE_ID',
                  searchable: false,
                },
                values: (model, schema) => {
                  return this.appealTypes
                },
                disabled: true,
              },
              {
                type: 'vfg-functional-date2',
                inputType: 'date',
                labels: 'Date',
                noLabel: true,
                model: 'DATE',
                format: 'dd-MMM-yyyy',
                styleClasses: 'col-md-6',
                required: true,
                validator: 'date',
                disabled: true,
                // validator: ["required", this.validateStartDate]
              },
              {
                type: 'select',
                label: 'Exam related appeal type',
                model: 'APPEAL_EXAM_TYPE',
                placeholder: 'Please specify',
                required: true,
                styleClasses: 'col-md-6',
                selectOptions: {
                  hideNoneSelectedText: true,
                  name: 'TYPE_NAME',
                  value: 'TYPE_ID',
                  searchable: false,
                },
                values: (model, schema) => {
                  return this.examRelatedTypes
                },
                visible: (model, field, form) => {
                  return this.visible.APPEAL_EXAM_TYPE
                },
                disabled: true,
              },
              {
                styleClasses: 'col-md-6',
                visible: (model, field, form) => {
                  return this.visible.APPEAL_EXAM_TYPE
                },
              },

              {
                type: 'textArea',
                required: true,
                rows: 10,
                max: 1000,
                label: 'Remarks / Comments',
                hint: 'maximum of 1000 characters',
                model: 'CONSULTANT_REMARK',
                placeholder: 'Enter Remarks or Comments',
                // validator: 'number',
                styleClasses: 'col-md-12',
                disabled: true,
              },
            ],
          },
        ],
      },

      appealDocumentViewSchema: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                theme: 'list',
                labels: 'Uploaded Document',
                accept: '.pdf',
                multiple: false,
                text: 'Choose document(s)',
                model: 'APPEAL_DOCUMENT',
                type: 'vfg-custom-file-view2',
                styleClasses: 'col-md-12',
                required: true,
                disabled: true,
              },
            ],
          },
        ],
      },
    }
  },
  created () {
    this.getappealTypes()
    this.getAppealTypesExamRelated()
    this.getAppealData(this.consultantData.CONSULTANT_ID)
  },

  async mounted () {
    // await this.getConsultantRecord();
    // await this.getFilterConsultantRecord();
    // this.consultants = await services02module2.getConsultant();
    // await console.log(this.consultants)
  },

  methods: {
    // goToViewProfilePage() {
    //   this.$router.push({ path: 'consultant-profile-Consultant' });
    // },
    async readMore (data) {
      this.$modals.readMoreModal.$show()
      this.read_remark = data.APPR_REMARK
    },

    async getappealTypes () {
      try {
        const res_appealType = await services02module2.getAppealTypes()
        this.appealTypes = res_appealType
      } catch (error) {
        console.log(error)
      }
    },

    async getAppealTypesExamRelated () {
      try {
        const res_appealTypeExam = await services02module2.getAppealTypesExamRelated(this.consultantData.CONSULTANT_ID)
        this.examRelatedTypes = res_appealTypeExam
      } catch (error) {
        console.log(error)
      }
    },
    async reset () {
      this.model.APPEAL_TYPE_ID = ''
      this.model.APPEAL_EXAM_TYPE = ''
      this.model.DATE = ''
      this.model.CONSULTANT_REMARK = ''
      this.model.CREATE_BY = ''
      this.model2.APPEAL_DOCUMENT = []
    },
    async isAppealInProcessMethod () {
      const APPEAL_TYPE = this.model.APPEAL_TYPE_ID
      const APPEAL_EXAM_TYPE = this.model.APPEAL_EXAM_TYPE
      if (this.model.PUBLISH_STATUS === 0 || this.model.FIMM_TS_ID === 3) {
        await this.reset()
        return false
      }
      if (this.model.TS_ID === 8) {
        await this.reset()
        return false
      }
      if (APPEAL_TYPE === 3 || APPEAL_TYPE === 2) {
        this.appealTypes = this.appealTypes.splice(APPEAL_TYPE - 1)
      }
      if (APPEAL_TYPE === 1) {
        this.examRelatedTypes = this.examRelatedTypes.splice(APPEAL_EXAM_TYPE - 1)
      }
      return true
    },
    async getAppealData (data) {
      try {
        const response = await services02module2.getConsultantAppeal(data)
        if (response) {
          this.model = response

          this.isAppealInProcess = await this.isAppealInProcessMethod()
          if (this.isAppealInProcess) {
            if (this.model.CA_DOCUMENT_ID) {
              this.getAppealDocuments(this.model.CA_DOCUMENT_ID)
            }
            this.loadModelUpdated(this.model.APPEAL_TYPE_ID)
          }
          await this.getAppealApprovalLog(this.consultantData.CONSULTANT_ID)
        }
      } catch (error) {
        console.log(error)
      }
    },

    getAppealApprovalLog: async function (consultId) {
      const response = await services04module2.getAppealApprovalLog(consultId)
      this.appeallogAPI = response
    },

    async getConsultantRecord () {
      const response = await ConsultantRecord.getConsultantRecord()
      this.consultants = response.data.data
      this.isBusy = false
      console.log(this.consultants)
    },

    // async getFilterConsultantRecord() {
    //   const filter_cons_records = await ConsultantRecord.getFilterConsultantRecord();
    //   console.log('this is filter cons records', filter_cons_records);
    // },

    onModelUpdated (newVal, schema) {
      if (schema == 'APPEAL_TYPE_ID') {
        this.visible.APPEAL_EXAM_TYPE = false
        if (newVal == 1) {
          this.visible.APPEAL_EXAM_TYPE = true
        } else if (newVal == 3) {
          this.visible.DATE = false
          this.visible.DISCHARGE_DATE = true
        } else {
          this.visible.DATE = true
          this.visible.DISCHARGE_DATE = false
        }
      }
      if (schema === 'APPEAL_EXAM_TYPE') {
        const date = this.examRelatedTypes.find(x => x.TYPE_ID === newVal).EXAM_DATE
        if (date) {
          this.model.DATE = date
        } else {
          this.model.DATE = ''
        }
      }
    },

    loadModelUpdated (appeal_type_id) {
      if (appeal_type_id == 1) {
        this.visible.APPEAL_EXAM_TYPE = true
      } else if (appeal_type_id == 3) {
        this.visible.DATE = false
        this.visible.DISCHARGE_DATE = true
      } else {
        this.visible.DATE = true
        this.visible.DISCHARGE_DATE = false
      }
    },

    submitData: async function (publishStatus, confirm_text) {
      // if (form1) {
      // let data = {
      //   APPEAL_TYPE_ID: this.model.APPEAL_TYPE.TYPE_ID,
      //   APPEAL_EXAM: this.model.APPEAL_EXAM_TYPE.TYPE_ID,
      //   CONSULTANT_ID: this.consultantData.CONSULTANT_ID,
      //   USER_ID: this.consultantData.USER_ID,
      //   REMARK: this.model.APPEAL_REMARK,
      //   DATE: moment(this.model.APPEAL_DATE).format(),
      //   DOCUMENT: this.model2.APPEAL_DOCUMENT,
      //   CREATE_BY: this.model.CREATE_BY,
      // };
      if (this.model.APPEAL_TYPE_ID === '') {
        alert('Please select at least one appeal type')
        return
      }

      if (this.model.CONSULTANT_REMARK === '') {
        alert('Please fill the remarks.')
        return
      }

      if (!this.model2.APPEAL_DOCUMENT.length) {
        alert('Please upload the document.')
        return
      }

      if (this.model.APPEAL_TYPE_ID === 1) {
        if (this.model.APPEAL_EXAM_TYPE === '') {
          alert('Appeal types does not exist. Please make sure you have given the exam.')
          return
        }
      }

      if (confirm(confirm_text)) {
        const data = new FormData()
        data.append('CONSULTANT_ID', this.consultantData.CONSULTANT_ID)
        data.append('DISTRIBUTOR_ID', this.consultantData.license.DISTRIBUTOR_ID)
        data.append('USER_ID', this.consultantData.USER_ID)
        data.append('CONSULTANT_LICENSE_ID', this.consultantData.license.CONSULTANT_LICENSE_ID)
        data.append('APPEAL_TYPE_ID', this.model.APPEAL_TYPE_ID)
        if (this.model.APPEAL_TYPE_ID == 1) {
          data.append('APPEAL_EXAM_TYPE', this.model.APPEAL_EXAM_TYPE)
        } else {
          data.append('APPEAL_EXAM_TYPE', '')
        }
        data.append('CONSULTANT_REMARK', this.model.CONSULTANT_REMARK == null ? '' : this.model.CONSULTANT_REMARK)
        if (this.model.DATE) {
          data.append('DATE', moment(this.model.DATE).format('YYYY-MM-DD'))
        } else {
          data.append('DATE', this.model.DATE == null ? '' : this.model.DATE)
        }
        data.append('CREATE_BY', this.consultantData.CONSULTANT_ID)
        data.append('PUBLISH_STATUS', publishStatus)
        if (publishStatus == 0) {
          data.append('TS_ID', 1) // Prefer admin_management DB -> TASK_STATUS for TS_ID
        } else {
          data.append('TS_ID', 15)
        }
        for (let i = 0; i < this.model2.APPEAL_DOCUMENT.length; i++) {
          data.append('DOCUMENT[]', this.model2.APPEAL_DOCUMENT[i])
        }

        if (this.model2.APPEAL_DOCUMENT.length == 0 && publishStatus == 1) {
          Vue.$toast.open({
            message: 'Please Upload Document to submit Appeal',
            type: 'error',
          })
        } else if (this.model2.APPEAL_DOCUMENT.length != 0 || publishStatus == 0) {
          // Saving data
          this.show_overlay = true
          try {
            const response = await ConsultantAppeal.postConsultantAppeal(data)
            if (response) {
              Vue.$toast.open({
                message: response.data.message,
                type: 'success',
              })

              this.show_overlay = false

              if (publishStatus == 0) {
                this.getAppealData(this.consultantData.CONSULTANT_ID)
              } else {
                this.getAppealData(this.consultantData.CONSULTANT_ID)
                // this.model.APPEAL_TYPE_ID = '';
                // this.model.APPEAL_EXAM_TYPE = '';
                // this.model.DATE = '';
                // this.model.CONSULTANT_REMARK = '';
                // this.mode2.APPEAL_DOCUMENT = [];
              }
            }
            console.log(response)
          } catch (e) {
            Vue.$toast.open({
              message: e.message,
              type: 'error',
            })
            this.show_overlay = false
            console.log(e.message)
          }
        }
      }
    },

    getAppealDocuments: async function (CA_DOCUMENT_ID) {
      const response = await services02module2.getConsultantDocuments('', '', '', CA_DOCUMENT_ID)
      response.forEach(el => {
        el.DOC_BLOB = this.b64toBlobPDF(el.DOC_BLOB, 'application/pdf')

        el.DOC_BLOB = new File(
          [el.DOC_BLOB],
          // el.DOC_ORIGINAL_NAME + "." + el.DOC_FILETYPE,
          el.DOC_ORIGINAL_NAME,
          {
            type: el.DOC_BLOB.type,
          },
        )

        const data = {
          docID: el.CA_DOCUMENT_ID,
          name: el.DOC_ORIGINAL_NAME,
          size: el.DOC_FILESIZE,
          type: el.DOC_FILETYPE,
          ext: 'exe',
          url: window.URL.createObjectURL(el.DOC_BLOB),
        }

        this.model2.APPEAL_DOCUMENT = []
        this.model2.APPEAL_DOCUMENT.push(data)
      })
    },

    b64toBlobPDF (b64Data, contentType, sliceSize) {
      contentType = contentType || ''
      sliceSize = sliceSize || 512

      var byteCharacters = atob(b64Data)
      var byteArrays = []

      for (
        var offset = 0;
        offset < byteCharacters.length;
        offset += sliceSize
      ) {
        var slice = byteCharacters.slice(offset, offset + sliceSize)

        var byteNumbers = new Array(slice.length)
        for (var i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i)
        }

        var byteArray = new Uint8Array(byteNumbers)

        byteArrays.push(byteArray)
      }

      return new File(byteArrays, 'pot', { type: contentType })
    },
  },
}
</script>

<style>
.consultant-appeal-section .v-pagination ul > li{
    padding-left: 0 !important;
}
.consultant-appeal-section .v-pagination ul > li:before{
    display: none !important;
}
</style>

<template>
  <div class="">
    <div class="">
      <div class="row">
        <div class="col-12">
          <b-overlay :show="show_overlay" rounded="sm">
            <template v-if="!currentConsultant">
              <va-card>
                <div class="row">
                  <div class="col-8">
                    <h4 style="margin-top:0">List of Approved Consultant Resignation</h4>
                  </div>
                  <div class="col-4 float-right">
                    <div class="float-right">
                      <h5>
                      <span
                        v-b-tooltip.hover
                        title="Change View List"
                        v-on:click="exchange"
                        class="badge badge-primary"
                      >
                        <i class="fa fa-exchange"></i
                        ></span>
                      </h5>
                    </div>
                  </div>
                </div>

                <div class="col-3">
                  <div
                    style="display: flex; align-items:center"
                    class="form-group form-group-sm has-search"
                  >
                    <span style="margin-right:10px" class="fa fa-search form-control-feedback"></span>
                    <input v-model="search" type="text" class="form-control" placeholder="Search" />
                  </div>
                </div>

                <div class="  col-ml-2">
                  <va-data-table
                    :fields="fields.consultant"
                    :data="filteredConsultant"
                    no-data-label="No data found"
                    :per-page="parseInt(perPage)"
                    :datacount="filteredConsultant.length"
                    :dataperpage="parseInt(perPage)"
                    clickable
                  >
                    <!-- <template slot="actions" slot-scope="props">
                      <b-form-checkbox
                        v-model="props.rowData.selected"
                        @change="setCurrentConsultant(props)"
                      />
                    </template> -->

                    <template slot="index" slot-scope="row">
                      {{ row.rowIndex + 1 }}
                    </template>

                    <template slot="ACTION" slot-scope="props">
                      <h4 @click="viewCurrentConsultant(props)" style="margin:0; font-size:20px">
                        <span v-b-tooltip.hover title="View" class="badge badge-primary mr-2">
                          <i class="fa fa-eye"></i>
                        </span>
                      </h4>
                    </template>
                  </va-data-table>
                  <br />
                </div>
              </va-card>
            </template>
            
            <template v-else>
              <va-card>
                <h4 style="margin-top:0">Consultant Resignation Form</h4>
                <br />
                <div>
                  <div class="content">
                    <div class="ml-4">
                      <br />
                      <table id="consultant-profile" class="table table-striped">
                        <tbody>
                          <tr>
                            <td style="width: 25%">FIMM No</td>
                            <td>{{ currentConsultant.CONSULTANT_FIMM_NO }}</td>
                          </tr>
                          <tr>
                            <td>Name</td>
                            <td>{{ currentConsultant.CONSULTANT_NAME }}</td>
                          </tr>
                          <tr v-if="currentConsultant.CONSULTANT_CITIZEN == 286 && currentConsultant.CONSULTANT_NRIC">
                            <td>New NRIC</td>
                            <td>{{ currentConsultant.CONSULTANT_NRIC }}</td>
                          </tr>
                          <tr v-if="currentConsultant.CONSULTANT_CITIZEN == 286 && currentConsultant.CONSULTANT_NRIC_OLD">
                            <td>Old NRIC Number</td>
                            <td>{{ currentConsultant.CONSULTANT_NRIC_OLD }}</td>
                          </tr>

                          <tr v-if="currentConsultant.CONSULTANT_CITIZEN == 287 && currentConsultant.CONSULTANT_PASSPORT_NO">
                            <td>Passport no</td>
                            <td>{{ currentConsultant.CONSULTANT_PASSPORT_NO }}</td>
                          </tr>

                          <tr v-if="currentConsultant.CONSULTANT_CITIZEN == 287 && currentConsultant.CONSULTANT_PASSPORT_EXPIRY_NO">
                            <td>Passport Expiry Date</td>
                            <td>{{ date(currentConsultant.CONSULTANT_PASSPORT_EXPIRY_NO) }}</td>
                          </tr>
                          <tr>
                            <td>Reason</td>
                            <td>{{ currentConsultant.RESIGNATION_REMARK }}</td>
                          </tr>

                          <tr>
                            <td>Effective Date</td>
                            <td>{{ date(currentConsultant.RESIGNATION_DATE) }}</td>
                          </tr>
                          <tr>
                            <td>Supported Document</td>
                            <td>
                              <vue-form-generator
                                :model="model"
                                :schema="resignationDocumentViewSchema"
                                :options="formOptions"
                                ref="regForm"
                              >
                              </vue-form-generator>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div class="float-left">
                  <button
                    @click="resetConsultantData"
                    type="button"
                    class="btn btn-primary btn-fill btn-md"
                  >
                    <i class="fa fa-step-backward" /> &nbsp; Previous
                  </button>
                </div>

              </va-card>
              <br />
            </template>
          </b-overlay>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import pdf from 'vue-pdf';
import "vue-form-generator/dist/vfg-core.css";
import 'vue-form-generator/dist/vfg.css';
import Tabs from 'vue-tabs-with-active-line';
import VueFormGenerator from 'vue-form-generator';
import * as services05module1 from "@/app/module1/services05";
import * as servicesmodule0 from '../../../app/module0/services';
import * as servicesmodule2 from '../../../app/module2/services';
import * as services02module2 from '../../../app/module2/services02';
import RepositoryFactory from '../../../repositories/RepositoryFactory';
import moment from 'moment'
const Resignation = RepositoryFactory.get('resignation');

Vue.use(VueFormGenerator);

/* -------------------------------------------------------------------------- */
/*                            endpointrepositories                            */
/* -------------------------------------------------------------------------- */
const ConsultantRecord = RepositoryFactory.get('consultantrecord');

export default {
  components: {
    Tabs,
    pdf,
  },

  data() {
    return {
      SELECTED_RESIGNATION_SESSION: [],

      show_overlay: false,
      currentTab: 'tab1',
      distributorData: "",
      consultantsAPI: [],
      currentConsultant: null,
      pdfsrc: null,
      user_id:null,

      formOptions: {
        validateAfterLoad: false,
        validateAfterChanged: true,
        validateAsync: true,
      },

      fields: {
        consultant: [
          { name: '__slot:index', title: 'NO' },
          { name: 'APPLIED_DATE', title: 'Date APPLIED',width:'15%' },
          { name: 'CONSULTANT_NAME', title: 'NAME' },
          { name: 'CONSULTANT_NRIC', title: 'NRIC' },
          { name: 'CONSULTANT_PASSPORT_NO', title: 'PASSPORT NO' },
          // { name: 'CONSULTANT_FIMM_NO', title: 'FIMM NO' },
          { name: 'CONSULTANT_MOBILE_NO', title: 'PHONE NO' },
          { name: 'CONSULTANT_TYPE', title: 'CONSULTANT TYPE' },
          { name: 'TS_PARAM', title: 'STATUS' },
          { name: '__slot:ACTION', title: 'ACTION' },

        ],
      },

      search: '',
      currentPage: 1,
      perPage: '10',

      model: {
        CONSULTANT_ID: [],
        REMARKS_COMMENTS: '',
        RESIGNATION_DOCUMENT: [],
      },

      tabSchema2: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'textArea',
                required: true,
                rows: 10,
                max: 1000,
                hint: 'Maximum characters of 1000',
                label: 'Remarks / Comments',
                model: 'REMARKS_COMMENTS',
                validator: 'required',
                placeholder: 'Enter Remarks or Comments',
                styleClasses: 'col-md-12',
              },
            ],
          },
        ],
      },

      resignationDocumentViewSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                theme: 'list',
                accept: ".PDF",
                multiple: true,
                text: "Choose a File",
                model: "RESIGNATION_DOCUMENT",
                type: "vfg-custom-file-view2",
                styleClasses: "col-md-12",
                required: false,
                disabled: true,
              },
            ],
          },
        ],
      },
    };
  },

  created() {
   this.getDistributorDetails();
  },

  computed: {
    filteredConsultant() {
      const search = this.search.toLowerCase();
      if (this.search) {
        return this.consultantsAPI.filter(el => {
          return Object.keys(el).some(key => `${el[key]}`.toLowerCase().match(search));
        });
      }

      return this.consultantsAPI;
    },

    // mappedSelectedConsultantArray() {
    //   if (this.model.SELECTED_CONSULTANTS.length)
    //     return this.model.SELECTED_CONSULTANTS.map(el => el.CONSULTANT_ID);

    //   return [];
    // },
  },

  methods: {
    exchange () {
      this.$router.push('/fimm/consultant-resignation-review-Manager')
    },

    handleClick(newTab) {
      this.currentTab = newTab;
    },

    date: function (date) {
        return moment(date).format("DD-MMM-yyyy");
    },

    resetConsultantData(){
      this.currentConsultant = null;
      this.model.CONSULTANT_ID=[];
      this.model.REMARKS_COMMENTS = '';
      this.model.RESIGNATION_DOCUMENT = []; 
    },

    // get distributor details
    getDistributorDetails: async function() {
      this.show_overlay = true;
      const user = localStorage.getItem("user");
      const response = await services05module1.getdistributordetails(JSON.parse(user).user_id);
      this.distributorData = response;
      await this.getConsultantRecord();
    },

    async getConsultantRecord() {
      const response = await services02module2.getConsultantResignationApprovedDatas(this.distributorData.DISTRIBUTOR_ID);
      this.consultantsAPI = response;
      this.show_overlay = false;
    },

    viewCurrentConsultant(props) {
      this.currentConsultant = props.rowData;
      this.model.CONSULTANT_ID.push(this.currentConsultant.CONSULTANT_ID);
      this.getResignationDocument(props.rowData.RESIGNATION_ID);
    },

    getResignationDocument: async function(resignation_id) {
      const response = await Resignation.getResignationDocumentByID(
        resignation_id
      );

      response.forEach(element => {
        element.DOC_BLOB = this.b64toBlobPDF(
          element.DOC_BLOB,
          "application/pdf"
        );
        //console.log(element.DOC_BLOB); // <----- cuba tgk ini
        element.DOC_BLOB = new File(
          [element.DOC_BLOB],
          element.DOC_ORIGINAL_NAME + "." + element.DOC_FILETYPE,
          { type: element.DOC_BLOB.type }
        );
        const data = {
          docID: element.RESIGNATION_DOCUMENT_ID,
          name: element.DOC_ORIGINAL_NAME + "." + element.DOC_FILETYPE,
          size: element.DOC_FILESIZE,
          type: element.DOC_FILETYPE,
          ext: "exe",
          url: window.URL.createObjectURL(element.DOC_BLOB)
        };
        this.model.RESIGNATION_DOCUMENT.push(data);
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

      return new File(byteArrays, "pot", { type: contentType });
    },

    setCurrentConsultant(props) {
      const index = this.model.CONSULTANT_ID.findIndex(
        el => el === props.rowData.CONSULTANT_ID,
      );

      if (index >= 0) {
        this.model.CONSULTANT_ID.splice(index, 1);
      } else {
        this.model.CONSULTANT_ID.push(props.rowData.CONSULTANT_ID);
      }
    },

    onModelUpdated(newVal, schema) {
      console.log(schema);
      if (schema == 'document') {
        console.log(newVal.replace('C:\\fakepath\\', ''));
        this.model.document = newVal.replace('C:\\fakepath\\', '');
      }
    },

    validateResignationForm() {
      return this.$refs['resignationForm'].validate();
    },
  },
};
</script>

<style lang="scss" scoped>
.input-label-td {
  width: 30%;
}
#consultant-profile input,
#type-of-applicant input {
  width: 70%;
  border: none;
  background: transparent;
}
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
    &_active {
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
      margin-left: 20px;
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
</style>

<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">
        List of Module Selection
      </h4>
    </div>
    <va-card>
      <table class="table table-striped">
        <tbody>
        <tr>
          <td style="width: 20%">CONSULTANT NAME</td>
          <td style="width: 1%">:</td>
          <td>{{ PROGDATA.CONSULTANT_NAME }}</td>
        </tr>
        <tr>
          <td style="width: 20%">FIMM NO</td>
          <td style="width: 1%">:</td>
          <td>{{ PROGDATA.CONSULTANT_FIMM_NO }}</td>
        </tr>
        <tr>
          <td style="width: 20%;font-weight: bold;">CUMULATIVE POINT</td>
          <td style="width: 1%">:</td>
          <td style="font-weight: bold">{{PROGDATA.TOTAL_CPD_POINT}}</td>
        </tr>
        <tr>
          <td style="width: 20%;font-weight: bold;">YEAR</td>
          <td style="width: 1%">:</td>
          <td style="font-weight: bold">{{this.termDate}}</td>
        </tr>
        </tbody>
      </table>

      <br>
      <br>
      <table class="table table-bordered">
        <tbody>
        <tr>
          <th>
            <strong>LICENSE TYPE</strong>
          </th>
          <th>
            <strong>DISTRIBUTOR NAME</strong>
          </th>
        </tr>
        <tr  v-for="item in consultantLicenses">
          <td style="width: 20%">{{item.TYPE_SCHEME}}</td>
          <td>{{ item.DIST_NAME }}</td>
        </tr>
        </tbody>
      </table>

    </va-card>
    <br>
    <br>


    <!-- list table-->
    <b-row class="justify-content-end">

      <b-col cols="6">
        <b-form-select @input="getFilteredData(selected)" v-model="selected" :options="options" class="mb-3">

        </b-form-select>

      </b-col>
      <b-col cols="3">
        <va-input
          :value="term"
          :placeholder="$t('Search')"
          @input="search"
          removable
        >
          <va-icon name="fa fa-search" slot="prepend" />
        </va-input>
      </b-col>
      <b-col cols="3">
        <div class="input-group">
          <va-date-picker
            :value="termDate"
            :config="{ enableTime: false, dateFormat: 'Y' }"
            @input="searchDate"
            v-model="dateFormat"
            placeholder="Search date"
          />
          <div class="input-group-append">
            <button
              @click="clear"
              type="button"
              class="btn btn-md btn-primary"
            >
              <va-icon name="fa fa-refresh" />
            </button>
          </div>
        </div>
      </b-col>
    </b-row>
    <div>
      <div v-if="isReady" style="margin: 5% 0">
        <div class="text-center text-success my-2">
          <b-spinner class="align-middle mr-2"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </div>

      <va-card v-else class="mt-5 col-12">

        <!-- Post Module -->
        <div v-show="selected=='post'"
        >
          <h5>Post Vetting Module</h5>
          <br>
          <va-data-table
            :fields="RecordProgramFields"
            :data="RecordModuleFilteredData"
            no-data-label="No data found"
            :per-page="parseInt(perPage)"
            :datacount="RecordCount"
            :dataperpage="parseInt(perPage)"
            clickable
          >
            <template slot="no" slot-scope="row">
              {{ row.rowIndex + 1 }}
            </template>
            <template slot="actions" slot-scope="props">
              <h5 class="mt-1">
            <span
              v-b-tooltip.hover
              title="View Submission Form"
              v-on:click="viewRecord(props.rowData)"
              class="badge badge-primary mr-2">
              <i class="fa fa-eye"></i>
			</span>
              </h5>
            </template>
          </va-data-table>
        </div>

        <!-- Pre Module -->
        <div v-show="selected=='pre'"
        >
          <h5>Pre vetting Module</h5>
          <br>
          <va-data-table
            :fields="RecordProgramFields"
            :data="RecordModuleFilteredData"
            no-data-label="No data found"
            :per-page="parseInt(perPage)"
            :datacount="RecordCount"
            :dataperpage="parseInt(perPage)"
            clickable
          >
            <template slot="no" slot-scope="row">
              {{ row.rowIndex + 1 }}
            </template>
            <template slot="actions" slot-scope="props">
              <h5 class="mt-1">
            <span
              v-b-tooltip.hover
              title="View Submission Form"
              v-on:click="viewRecord(props.rowData)"
              class="badge badge-primary mr-2">
              <i class="fa fa-eye"></i>
			</span>
              </h5>
            </template>
          </va-data-table>
        </div>

        <!-- Writing Module -->
        <div v-show="selected=='writing'"
        >
          <h5>Writing Module</h5>
          <br>
          <va-data-table
            :fields="RecordWritingFields"
            :data="RecordModuleFilteredData"
            no-data-label="No data found"
            :per-page="parseInt(perPage)"
            :datacount="RecordCount"
            :dataperpage="parseInt(perPage)"
            clickable
          >
            <template slot="no" slot-scope="row">
              {{ row.rowIndex + 1 }}
            </template>
            <template slot="actions_support_docs" slot-scope="props">
              <!-- view support document -->
              <div v-if="props.rowData.DOCUMENT">
              <span>
                <h4 class="mt-2">
                  <span
                    v-b-tooltip.hover
                    title="View Document"
                    v-on:click="viewPdf(props.rowData.DOCUMENT)"
                    class="badge badge-success mr-2"
                  >
                    <i class="fa fa-file-pdf-o"></i
                    ></span>
                </h4>
              </span>
              </div>
            </template>

            <template slot="actions" slot-scope="props">
              <h5 class="mt-1">
            <span
              v-b-tooltip.hover
              title="View Submission Form"
              v-on:click="viewRecord(props.rowData)"
              class="badge badge-primary mr-2">
              <i class="fa fa-eye"></i>
			</span>
              </h5>
            </template>
          </va-data-table>
        </div>


        <!-- Reading Module -->
        <div  v-show="selected=='reading'">
          <h5>Reading Module</h5>
          <br>
          <va-data-table
            :fields="RecordReadingFields"
            :data="RecordModuleFilteredData"
            no-data-label="No data found"
            :per-page="parseInt(perPage)"
            :datacount="RecordCount"
            :dataperpage="parseInt(perPage)"
            clickable
          >
            <template slot="no" slot-scope="row">
              {{ row.rowIndex + 1 }}
            </template>
            <template slot="actions_support_docs" slot-scope="props">
              <!-- view support document -->
              <div v-if="props.rowData.DOCUMENT">
              <span>
                <h4 class="mt-2">
                  <span
                    v-b-tooltip.hover
                    title="View Document"
                    v-on:click="viewPdf(props.rowData.DOCUMENT)"
                    class="badge badge-success mr-2"
                  >
                    <i class="fa fa-file-pdf-o"></i
                    ></span>
                </h4>
              </span>
              </div>
            </template>

            <template slot="actions" slot-scope="props">
              <h5 class="mt-1">
            <span
              v-b-tooltip.hover
              title="View Submission Form"
              v-on:click="viewRecord(props.rowData)"
              class="badge badge-primary mr-2">
              <i class="fa fa-eye"></i>
			</span>
              </h5>
            </template>
          </va-data-table>
        </div>

        <!-- Teaching Module -->
        <div v-show="selected=='teaching'">
          <h5>Teaching Module</h5>
          <br>
          <va-data-table
            :fields="RecordTeachingFields"
            :data="RecordModuleFilteredData"
            no-data-label="No data found"
            :per-page="parseInt(perPage)"
            :datacount="RecordCount"
            :dataperpage="parseInt(perPage)"
            clickable
          >
            <template slot="no" slot-scope="row">
              {{ row.rowIndex + 1 }}
            </template>
            <template slot="actions_support_docs" slot-scope="props">
              <!-- view support document -->
              <div v-if="props.rowData.DOCUMENT">
              <span>
                <h4 class="mt-2">
                  <span
                    v-b-tooltip.hover
                    title="View Document"
                    v-on:click="viewPdf(props.rowData.DOCUMENT)"
                    class="badge badge-success mr-2"
                  >
                    <i class="fa fa-file-pdf-o"></i
                    ></span>
                </h4>
              </span>
              </div>
            </template>

            <template slot="actions" slot-scope="props">
              <h5 class="mt-1">
            <span
              v-b-tooltip.hover
              title="View Submission Form"
              v-on:click="viewRecord(props.rowData)"
              class="badge badge-primary mr-2">
              <i class="fa fa-eye"></i>
			</span>
              </h5>
            </template>
          </va-data-table>

        </div>

        <!-- Academic Module -->
        <div v-show="selected=='academic'">
          <h5>Academic Module</h5>
          <br>
          <va-data-table
            :fields="RecordAcademicFields"
            :data="RecordModuleFilteredData"
            no-data-label="No data found"
            :per-page="parseInt(perPage)"
            :datacount="RecordCount"
            :dataperpage="parseInt(perPage)"
            clickable
          >
            <template slot="no" slot-scope="row">
              {{ row.rowIndex + 1 }}
            </template>
            <template slot="actions_support_docs" slot-scope="props">
              <!-- view support document -->
              <div v-if="props.rowData.DOCUMENT">
              <span>
                <h4 class="mt-2">
                  <span
                    v-b-tooltip.hover
                    title="View Document"
                    v-on:click="viewPdf(props.rowData.DOCUMENT)"
                    class="badge badge-success mr-2"
                  >
                    <i class="fa fa-file-pdf-o"></i
                    ></span>
                </h4>
              </span>
              </div>
            </template>

            <template slot="actions" slot-scope="props">
              <h5 class="mt-1">
            <span
              v-b-tooltip.hover
              title="View Submission Form"
              v-on:click="viewRecord(props.rowData)"
              class="badge badge-primary mr-2">
              <i class="fa fa-eye"></i>
			</span>
              </h5>
            </template>
          </va-data-table>

        </div>

        <!-- FPM Module -->
        <div v-show="selected==1 || selected==2 || selected==3 || selected==4">
          <h5 v-show="selected==1 ">Certified Financial Planner</h5>
          <h5 v-show="selected==2 ">Islamic Financial Planner</h5>
          <h5 v-show="selected==3 ">Registered Financial Planner</h5>
          <h5 v-show="selected==4 ">Shariah Registered Financial Planner</h5>
          <br>
          <va-data-table
            :fields="RecordFPMFields"
            :data="RecordModuleFilteredData"
            no-data-label="No data found"
            :per-page="parseInt(perPage)"
            :datacount="RecordCount"
            :dataperpage="parseInt(perPage)"
            clickable
          >
            <template slot="no" slot-scope="row">
              {{ row.rowIndex + 1 }}
            </template>
            <template slot="actions_support_docs" slot-scope="props">
              <!-- view support document -->
              <div v-if="props.rowData.DOCUMENT">
              <span>
                <h4 class="mt-2">
                  <span
                    v-b-tooltip.hover
                    title="View Document"
                    v-on:click="viewPdf(props.rowData.DOCUMENT)"
                    class="badge badge-success mr-2"
                  >
                    <i class="fa fa-file-pdf-o"></i
                    ></span>
                </h4>
              </span>
              </div>
            </template>
            <template slot="actions" slot-scope="props">
              <h5 class="mt-1">
            <span
              v-b-tooltip.hover
              title="View Submission Form"
              v-on:click="viewRecord(props.rowData)"
              class="badge badge-primary mr-2">
              <i class="fa fa-eye"></i>
			</span>
              </h5>
            </template>
          </va-data-table>

        </div>


        <br />
        <br />
        <br />
        <button
          @click="back"
          type="button"
          class="btn btn-primary btn-fill btn-md"
        >
          <i class="fa fa-step-backward" /> &nbsp; Previous
        </button>
      </va-card>

    </div>

  </va-card>
</template>
<script>
  import * as servicesModule4 from '../../../../app/module4/services01'
  import Vue from 'vue'
  import Multiselect from 'vue-multiselect'
  import RemarkPopup from '../modules/components/remarkPopup'
  import { debounce } from 'lodash'
  Vue.component('multiselect', Multiselect);
  import moment from "moment";

  export default {
    mounted () {
      var data=localStorage.getItem('cpd_details');
      this.PROGDATA=JSON.parse(data);


      this.getFPModules();
      this.getDistributorDetails();
      // this.getAllRecord();
      this.termDate=moment().format('YYYY');

    },
    methods: {
      async back(){
        this.$router.go(-1);
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
      async getFPModules(){
        try {
          const fpCategories = await servicesModule4.getFpCategory();
          const data={
            label: 'FPM MODULES',
              options:[
                  ...fpCategories
                ]
          }
          this.options.push(data);
        } catch (error) {
          console.log(error);
        }
      },

      clear() {
        this.term = null;
        this.termDate = null;
        this.dateFormat = null;

      },
      searchDate: debounce(function (value) {
        console.log('search date' +value);

        this.termDate = value;
      }, 400),
      // search
      search: debounce(function (term) {
        console.log('test',term);
        this.term = term
      }, 400),
      async getDistributorDetails() {
        try {
          const res_distributor = await servicesModule4.getConsultantLicenseWithDist(this.PROGDATA.CONSULTANT_ID);
          this.consultantLicenses = res_distributor;
        } catch (error) {
          console.log(error);
        }
      },

      // getAllRecord
      getFilteredData: async function (value) {
        this.isReady=true;
        const response = await servicesModule4.getConsultantCPDDetails(value,this.PROGDATA.CONSULTANT_ID,)
        this.GRAND_TOTAL_CPD_POINT=response.grand_total_cpd_point;
        this.RecordList = response;
        this.RecordCount = this.RecordList.length;

        this.isReady=false;
      },


      clickPost: async function () {
        this.$router.push({
          name:"consultant-cpd-points-details",
          query:{
            module_type:null,
            prog_type:1,
          }
        });
      },
      clickPre: async function () {
        this.$router.push({
          name:"consultant-cpd-points-details",
          query:{
            module_type:null,
            prog_type:2,
          }
        });
      },
      clickWriting: async function () {
        this.$router.push({
          name:"consultant-cpd-points-details",
          query:{
            module_type:1,
            prog_type:null,
          }
        });
      },
      clickReading: async function () {
        this.$router.push({
          name:"consultant-cpd-points-details",
          query:{
            module_type:2,
            prog_type:null,
          }
        });
      },
      clickTeaching: async function () {
        this.$router.push({
          name:"consultant-cpd-points-details",
          query:{
            module_type:3,
            prog_type:null,
          }
        });
      },

      clickAcademic: async function () {
        this.$router.push({
          name:"consultant-cpd-points-details",
          query:{
            module_type:4,
            prog_type:null,
          }
        });
      },
      clickFP: async function () {
        this.$router.push({
          name:"consultant-cpd-points-details",
          query:{
            module_type:5,
            prog_type:null,
          }
        });
      },
      formatDateTimestampToDate(datetimestamp) {
        var datetimestamp = new Date(datetimestamp);
        var dd = String(datetimestamp.getDate()).padStart(2, "0");
        var mm = String(datetimestamp.getMonth() + 1).padStart(2, "0"); //January is 0!
        var yyyy = datetimestamp.getFullYear();

        return yyyy;
      },
    },

    computed:{
      RecordWritingFields () {
        return [
          {
            name: '__slot:no',
            title: 'NO',
          },
          {
            name: 'SUBMISSION_DATE',
            title: 'SUBMISSION DATE',
          },
          {
            name: 'TITLE',
            title: 'TITLE',
            sortField: 'TITLE',
          },
          {
            name: 'CPD_CODE',
            title: 'CPD CODE',
            sortField: 'CPD_CODE',
          },

          {
            name: 'PUBLISH_DATE',
            title: 'PUBLISH DATE',
            sortField: 'PUBLISH_DATE',
          },
          {
            name: 'PUBLISHER',
            title: 'PUBLISHER',
            sortField: 'PUBLISHER',
          },

          {
            name: 'NRIC_NUMBER',
            title: 'NRIC NUMBER',
            sortField: 'NRIC_NUMBER',
          },
          {
            name: 'PASSPORT_NUMBER',
            title: 'PASSPORT NUMBER',
            sortField: 'PASSPORT_NUMBER',
          },
          {
            name: 'MODE',
            title: 'WRITING MODE',
            sortField: 'MODE',
          },
          {
            name: '__slot:actions_support_docs',
            title: 'SUPPORT DOCUMENT',
          },
          {
            name: 'PENDING_POINT',
            title: 'PENDING POINT',
            sortField: 'PENDING_POINT',
          },

          {
            name: 'APPROVE_POINT',
            title: 'APPROVED POINT',
            sortField: 'APPROVE_POINT',
          },
          {
            name: 'REVOKE_POINT',
            title: 'REVOKED POINT',
            sortField: 'REVOKE_POINT',
          },

          {
            name: 'TOTAL_CPD_POINT',
            title: 'TOTAL POINT',
            sortField: 'TOTAL_CPD_POINT',
          },
        ]
      },

      RecordReadingFields () {
        return [
          {
            name: '__slot:no',
            title: 'NO',
          },
          {
            name: 'SUBMISSION_DATE',
            title: 'SUBMISSION DATE',
          },
          {
            name: 'TITLE',
            title: 'TITLE',
            sortField: 'TITLE',
          },
          {
            name: 'CPD_CODE',
            title: 'CPD CODE',
            sortField: 'CPD_CODE',
          },

          {
            name: 'PUBLISH_DATE',
            title: 'PUBLISH DATE',
            sortField: 'PUBLISH_DATE',
          },
          {
            name: 'PUBLISHER',
            title: 'PUBLISHER',
            sortField: 'PUBLISHER',
          },

          {
            name: 'NRIC_NUMBER',
            title: 'NRIC NUMBER',
            sortField: 'NRIC_NUMBER',
          },
          {
            name: 'PASSPORT_NUMBER',
            title: 'PASSPORT NUMBER',
            sortField: 'PASSPORT_NUMBER',
          },
          {
            name: 'MODE',
            title: 'READING MODE',
            sortField: 'MODE',
          },
          {
            name: '__slot:actions_support_docs',
            title: 'SUPPORT DOCUMENT',
          },
          {
            name: 'PENDING_POINT',
            title: 'PENDING POINT',
            sortField: 'PENDING_POINT',
          },

          {
            name: 'APPROVE_POINT',
            title: 'APPROVED POINT',
            sortField: 'APPROVE_POINT',
          },
          {
            name: 'REVOKE_POINT',
            title: 'REVOKED POINT',
            sortField: 'REVOKE_POINT',
          },

          {
            name: 'TOTAL_CPD_POINT',
            title: 'TOTAL POINT',
            sortField: 'TOTAL_CPD_POINT',
          },
        ]
      },

      RecordTeachingFields () {
        return [
          {
            name: '__slot:no',
            title: 'NO',
          },
          {
            name: 'SUBMISSION_DATE',
            title: 'SUBMISSION DATE',
          },
          {
            name: 'TITLE',
            title: 'TITLE',
            sortField: 'TITLE',
          },
          {
            name: 'CPD_CODE',
            title: 'CPD CODE',
            sortField: 'CPD_CODE',
          },

          {
            name: 'TEACHING_DATE',
            title: 'PUBLISH DATE',
          },

          {
            name: 'NRIC_NUMBER',
            title: 'NRIC NUMBER',
            sortField: 'NRIC_NUMBER',
          },
          {
            name: 'PASSPORT_NUMBER',
            title: 'PASSPORT NUMBER',
            sortField: 'PASSPORT_NUMBER',
          },
          {
            name: 'MODE',
            title: 'TEACHING MODE',
            sortField: 'MODE',
          },
          {
            name: '__slot:actions_support_docs',
            title: 'SUPPORT DOCUMENT',
          },
          {
            name: 'PENDING_POINT',
            title: 'PENDING POINT',
            sortField: 'PENDING_POINT',
          },

          {
            name: 'APPROVE_POINT',
            title: 'APPROVED POINT',
            sortField: 'APPROVE_POINT',
          },
          {
            name: 'REVOKE_POINT',
            title: 'REVOKED POINT',
            sortField: 'REVOKE_POINT',
          },

          {
            name: 'TOTAL_CPD_POINT',
            title: 'TOTAL POINT',
            sortField: 'TOTAL_CPD_POINT',
          },
        ]
      },
      RecordAcademicFields () {
        return [
          {
            name: '__slot:no',
            title: 'NO',
          },
          {
            name: 'SUBMISSION_DATE',
            title: 'SUBMISSION DATE',
          },
          {
            name: 'TITLE',
            title: 'TITLE',
            sortField: 'TITLE',
          },
          {
            name: 'CPD_CODE',
            title: 'CPD CODE',
            sortField: 'CPD_CODE',
          },

          {
            name: 'DATE',
            title: 'PUBLISH DATE',
            sortField: 'DATEQUALIICATION',
          },

          {
            name: 'NRIC_NUMBER',
            title: 'NRIC NUMBER',
            sortField: 'NRIC_NUMBER',
          },
          {
            name: 'PASSPORT_NUMBER',
            title: 'PASSPORT NUMBER',
            sortField: 'PASSPORT_NUMBER',
          },
          {
            name: 'MODE',
            title: 'QUALIFICATION MODE',
            sortField: 'MODE',
          },
          {
            name: '__slot:actions_support_docs',
            title: 'SUPPORT DOCUMENT',
          },
          {
            name: 'PENDING_POINT',
            title: 'PENDING POINT',
            sortField: 'PENDING_POINT',
          },

          {
            name: 'APPROVE_POINT',
            title: 'APPROVED POINT',
            sortField: 'APPROVE_POINT',
          },
          {
            name: 'REVOKE_POINT',
            title: 'REVOKED POINT',
            sortField: 'REVOKE_POINT',
          },

          {
            name: 'TOTAL_CPD_POINT',
            title: 'TOTAL POINT',
            sortField: 'TOTAL_CPD_POINT',
          },
        ]
      },
      RecordFPMFields () {
        return [
          {
            name: '__slot:no',
            title: 'NO',
          },
          {
            name: 'SUBMISSION_DATE',
            title: 'SUBMISSION DATE',
          },
          {
            name: 'TITLE',
            title: 'TITLE',
            sortField: 'TITLE',
          },
          {
            name: 'CPD_CODE',
            title: 'CPD CODE',
            sortField: 'CPD_CODE',
          },

          {
            name: 'DATE',
            title: 'PUBLISH DATE',
            sortField: 'DATE',
          },

          {
            name: 'NRIC_NUMBER',
            title: 'NRIC NUMBER',
            sortField: 'NRIC_NUMBER',
          },
          {
            name: 'PASSPORT_NUMBER',
            title: 'PASSPORT NUMBER',
            sortField: 'PASSPORT_NUMBER',
          },
          {
            name: 'MODE',
            title: 'FP CATEGORY',
            sortField: 'MODE',
          },
          {
            name: '__slot:actions_support_docs',
            title: 'SUPPORT DOCUMENT',
          },
          {
            name: 'PENDING_POINT',
            title: 'PENDING POINT',
            sortField: 'PENDING_POINT',
          },

          {
            name: 'APPROVE_POINT',
            title: 'APPROVED POINT',
            sortField: 'APPROVE_POINT',
          },
          {
            name: 'REVOKE_POINT',
            title: 'REVOKED POINT',
            sortField: 'REVOKE_POINT',
          },

          {
            name: 'TOTAL_CPD_POINT',
            title: 'TOTAL POINT',
            sortField: 'TOTAL_CPD_POINT',
          },
        ]
      },


      RecordProgramFields () {
        return [
          {
            name: '__slot:no',
            title: 'NO',
          },
          {
            name: 'SUBMISSION_DATE',
            title: 'SUBMISSION DATE',
          },
          {
            name: 'TITLE',
            title: 'TITLE',
            sortField: 'TITLE',
          },

          {
            name: 'CPD_CODE',
            title: 'CPD CODE',
            sortField: 'CPD_CODE',
          },

          {
            name: 'MODULE_NAME',
            title: 'MODULE',
            sortField: 'MODULE_NAME',
          },
          {
            name: 'PROG_DATE_START',
            title: 'PROGRAM START DATE',
            sortField: 'PROG_DATE_START',
          },

          {
            name: 'PROG_DATE_END',
            title: 'PROGRAM END DATE',
            sortField: 'PROG_DATE_END',
          },

          {
            name: 'PROG_VENUE',
            title: 'VENUE',
            sortField: 'PROG_VENUE',
          },
          {
            name: 'MODE',
            title: 'MODE',
            sortField: 'MODE',
          },

          {
            name: 'TYPE',
            title: 'PROGRAM TYPE',
            sortField: 'TYPE',
          },

          {
            name: 'PROG_HOURS',
            title: 'TOTAL HOURS',
            sortField: 'PROG_HOURS',
          },

          {
            name: 'PENDING_POINT',
            title: 'PENDING POINT',
            sortField: 'PENDING_POINT',
          },

          {
            name: 'APPROVE_POINT',
            title: 'APPROVED POINT',
            sortField: 'APPROVE_POINT',
          },
          {
            name: 'REVOKE_POINT',
            title: 'REVOKED POINT',
            sortField: 'REVOKE_POINT',
          },

          {
            name: 'TOTAL_CPD_POINT',
            title: 'TOTAL CPD POINT',
            sortField: 'TOTAL_CPD_POINT',
          },
        ]
      },

      // eslint-disable-next-line vue/return-in-computed-property
      RecordModuleFilteredData () {
        if (!(this.term || this.termDate)) {
          return this.RecordList
        }

        return this.RecordList.filter((item) => {
        if(this.term){
            return this.term
              .toLowerCase()
              .split(' ')
              .every(
                (v) =>
                  (item.CPD_CODE ? item.CPD_CODE.toLowerCase().includes(v) : false) ||
                  (item.TITLE ? item.TITLE.toLowerCase().includes(v) : false) ||
                  (item.NRIC_NUMBER ? item.NRIC_NUMBER.toLowerCase().includes(v) : false) ||
                  (item.PASSPORT_NUMBER ? item.PASSPORT_NUMBER.toLowerCase().includes(v) : false) ||


                  (item.MODE ? item.MODE.toLowerCase().includes(v) : false) ||
                  (item.PUBLISHER ? item.PUBLISHER.toLowerCase().includes(v) : false)
              )
          }
          if (this.termDate) {
            let convertDate = this.formatDateTimestampToDate(item.SUBMISSION_DATE);
            return convertDate == this.termDate;
          }

        })
      },

    },

    components: {
      RemarkPopup,
    },
    data(){
      return{
        isReady:false,

        selected: null,
        options: [
          { value: null, text: 'Please select module type' },
          { value: 'post', text: 'POST VETTING' },
          { value: 'pre', text: 'PRE VETTING' },
          { value: 'writing', text: 'WRITING' },
          { value: 'reading', text: 'READING' },
          { value: 'teaching', text: 'TEACHING' },
          { value: 'academic', text: 'ACADEMIC' },

        ],

        GRAND_TOTAL_CPD_POINT:0,
        title:"",
        MODULE_TYPE:null,
        PROG_TYPE:null,
        PROGDATA: "",
        header: '',
        field: [],
        perPage: '10',
        perPageOptions: ['50', '100', '150', '200'],
        currentPage: 1,
        classificationList: [],
        RecordList: [],
        consultantLicenses: [],
        RecordCount:0,
        count: 1,

        term: null,
        termDate: null,
        dateFormat :null,

        tabSchema2: {
          groups: [
            {
              styleClasses: 'row',
              fields: [
                {
                  type: 'vueMultiSelect',
                  model: 'MODULE_TYPE',
                  placeholder: 'Select Module Type',
                  styleClasses: 'col-md-6',
                  required: true,
                  validator: 'required',
                  selectOptions: {
                    multiple: false,
                    label: 'label',
                    value: 'value',
                    searchable: false,
                  },
                  values: (model, schema) => {
                    return this.moduleType;
                  },
                },
              ],
            },
          ],
        },
        formOptions: {
          validateAfterLoad: false,
          validateAfterChanged: true,
          validateAsync: true,
        },
      }
    }
  };
</script>


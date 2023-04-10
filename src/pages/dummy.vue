/* eslint-disable no-tabs */
<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <va-card>
            <form-wizard
              @on-complete="onComplete"
              color="orange"
              error-color="#a94442"
              finish-button-text="Submit"
              ref="wizard"
            >
              <h3 slot="title"></h3>
              <tab-content
                icon="fa fa-user"
                title="1. Personal Particulars Of The Applicant"
                :before-change="validateSecondTab"
              >
                <vue-form-generator
                  :model="model"
                  :schema="secondTabSchema"
                  :options="formOptions"
                  ref="secondTabForm"
                  @model-updated="onModelUpdated"
                >
                </vue-form-generator><br />
                <h4>Permanent Address</h4>
                <vue-form-generator
                  :model="model"
                  :schema="permanentAddress"
                  :options="formOptions"
                  ref="secondTabForm"
                  @model-updated="onModelUpdated"
                >
                </vue-form-generator><br />
                <h4>Correspondence Address</h4>
                <vue-form-generator
                  :model="model"
                  :schema="correspondenceAddress"
                  :options="formOptions"
                  ref="secondTabForm"
                  @model-updated="onModelUpdated"
                >
                </vue-form-generator>
              </tab-content>
              <tab-content
                icon="fa fa-info"
                title="2. Types Of Consultant"
              >
                <vue-form-generator
                  :model="model"
                  :schema="thirdTabSchema"
                  :options="formOptions"
                  ref="thirdTabForm"
                  @model-updated="onModelUpdated"
                >
                </vue-form-generator>
              </tab-content>

              <tab-content
                icon="fa fa-info"
                title="3. Exam"

              >
                <vue-form-generator
                  :model="model"
                  :schema="examSchema"
                  :options="formOptions"
                  ref="fourthTabForm"
                  @model-updated="onModelUpdated"
                >
                </vue-form-generator>
                <vue-form-generator
                  v-if="visibleCatExemption == true"
                  :model="model"
                  :schema="exemptionSchema"
                  :options="formOptions"
                  ref="fourthTabForm"
                  @model-updated="onModelUpdated"
                >
                </vue-form-generator>
                <!-- selected exam table -->
                <va-card v-if="selectedExamList.length != 0 && visibleExamSession == true">
                  <h4 slot="header" class="card-title">Selected Exam Session</h4>
                  <b-table
                    hover
                    :items="selectedExamList"
                    :fields="fieldSelectedExam"
                    :current-page="currentPageSelected"
                    :per-page="perPageSelected"
                    :filter="filterSelected"
                    responsive="md"
                  >
                    <template #cell(index)="data">
                      {{ data.index + 1 }}
                    </template>
                    <template #cell()="data">
                      <span class="description">{{ data.value }}</span>
                    </template>
                    <template #cell(actions)="data">
                      <h4 class="mt-2">
                        <span
                          @click="addExamSession(data.item)"
                          class="badge badge-danger mr-1"
                        >
                          <i class="fa fa-minus-circle"></i
                          ></span>
                      </h4>
                    </template>
                  </b-table>
                </va-card>
                <!-- ///// -->
                <div v-if="visibleExamSession == true">
                  <button
                    v-b-toggle.collapse-1

                    type="button"
                    class="btn btn-warning btn-fill btn-md"
                  >
                    Choose Exam Session &nbsp;
                    <i class="fa fa-caret-square-o-down" />
                  </button>

                  <b-collapse id="collapse-1" class="mt-2">
                    <small>* Choose {{noOfSession}} exam session</small>
                    <va-card>
                      <div class="row float-right">
                        <h5 v-if="viewType == 1" class="col-2">
                          <b-badge
                            v-b-toggle.collapse-2
                            class="mr-1"
                            variant="secondary"
                          >
                            <i class="fa fa-search"></i>
                          </b-badge>
                        </h5>
                        <h5 class="col-2">
                          <b-badge
                            @click="switchView(1)"
                            class="mr-1"
                            variant="secondary"
                          >
                            <i class="fa fa-table"></i>
                          </b-badge>
                        </h5>
                        <h5 class="col-2">
                          <b-badge
                            @click="switchView(2)"
                            class="mr-1"
                            variant="secondary"
                          >
                            <i class="fa fa-calendar-o"></i>
                          </b-badge>
                        </h5>
                      </div>
                      <br /> <br />
                      <div v-if="viewType == 1" class="col-3">
                        <div class="form-group form-group-sm has-search">
                          <span class="fa fa-search form-control-feedback"></span>
                          <input
                            v-model="filter"
                            type="text"
                            class="form-control"
                            placeholder="Search"
                          />
                        </div>
                      </div>
                      <b-collapse id="collapse-2" class="mt-2">
                        <va-card>
                          <vue-form-generator
                            :model="model"
                            :schema="schema"
                          >
                          </vue-form-generator>
                          <button
                            @click.prevent="reset"
                            type="button"
                            class="ml-2 btn btn-fill btn-sm btn-danger"
                          >
                            Reset
                          </button>
                          <button type="button" class="ml-2 btn btn-fill btn-sm btn-primary">
                            Search
                          </button>
                        </va-card>
                      </b-collapse>
                      <div class="col-ml-2">
                        <FullCalendar v-if="viewType == 2" :options="calendarOptions" />
                        <b-table
                          v-if="viewType == 1"
                          hover
                          :items="examTimetableList"
                          :fields="fields"
                          :current-page="currentPage"
                          :per-page="perPage"
                          :filter="filter"
                          responsive="md"
                        >
                          <template #cell(index)="data">
                            {{ data.index + 1 }}
                          </template>
                          <template #cell()="data">
                            <span class="description">{{ data.value }}</span>
                          </template>
                          <template #cell(actions)="data">
                            <h4 class="mt-2">
                              <span
                                @click="addExamSession(data)"
                                class="badge badge-success mr-1"
                              >
                                <i class="fa fa-plus"></i
                                ></span>
                            </h4>
                          </template>
                        </b-table>
                      </div>
                      <!-- <button type="button" class="float-right ml-2 btn btn-fill btn-md btn-success">
                   <i class="fa fa-plus" /> &nbsp; Add
                  </button> -->
                      <!-- <button
                    @click.prevent="reset"
                    type="button"
                    class="ml-2 btn btn-sm btn-danger"
                  >
                    Reset
                  </button> -->
                    </va-card>
                  </b-collapse>
                </div>
              </tab-content>

              <tab-content
                icon="fa fa-info"
                title="4. Upload Photo and Document"
                :before-change="validateThirdTab"
              >
                <div class="col-12">
                  <!-- <card> -->
                  <!-- <h4 class="card-title">
                  Upload Photo and Document
                </h4> -->
                  <!-- <br /> -->
                  <div style="overflow-x:auto;">
                    <table class="table">
                      <thead>
                        <slot name="columns">
                          <tr>
                            <th></th>
                            <th>Document</th>
                            <th>Choose file</th>
                          </tr>
                        </slot>
                      </thead>
                      <tbody>
                        <tr v-for="(item, index) in photoUploadList" :key="index">
                          <slot :row="item">
                            <td>
                              <base-checkbox
                                class=""
                                v-model="item.selected"
                                disabled="true"
                              ></base-checkbox>
                            </td>
                            <td>
                              <span class="description">{{item.fileName}} &nbsp; <a v-if="item.type == 'file' && item.selected == true"
                                href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
                              >View</a></span>
                            </td>
                            <td v-if="item.type == 'photo'">
                              <form enctype="multipart/form-data">
                                <div v-if="item.applicantPhoto">
                                  <img src :ref="item.applicantPhotoDisplay" class="w-150px" />
                                </div>
                                <br v-if="item.applicantPhoto" />
                                <input type="file" accept="image/*" :ref="item.applicantPhoto" @change="uploadImage(index, item)" id="file-input1">
                              </form>
                            </td>
                            <td v-if="item.type == 'file'">
                              <form enctype="multipart/form-data">
                                <input type="file" accept="application/pdf,application/msword,
  application/vnd.openxmlformats-officedocument.wordprocessingml.document" ref="file" @change="uploadImage(index, item)" id="file-input2">
                              </form>
                            </td>
                          </slot>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <!-- </card> -->
                </div>
                <br />
                <div class="scroll">
                  <div class="row m-2">
                    <base-checkbox
                      class="col-1"
                      v-model="selected"
                    ></base-checkbox>
                    <small class="col mt-2">
                      <i>By submitting this application to FIMM, I hereby confirm that</i>
                    </small>
                  </div>
                  <div class="row m-2">
                    <!-- <base-checkbox
                            class="col-1"
                            v-model="selected"
                            ></base-checkbox> -->
                    <small class="col-1 mt-2">
                      i)
                    </small>
                    <small class="col mt-2">
                      <i>All declared information is true and up to date, and I understand the principal and FIMM reserves the rights to verify the information I have provided in this application</i>
                    </small>
                  </div>
                  <div class="row m-2">
                    <!-- <base-checkbox
                            class="col-1"
                            v-model="selected"
                            ></base-checkbox> -->
                    <small class="col-1 mt-2">
                      ii)
                    </small>
                    <small class="col mt-2">
                      <i>All declared information is true and up to date, and I understand the principal and FIMM reserves the rights to verify the information I have provided in this application</i>
                    </small>
                  </div>

                  <div class="row m-2">
                    <!-- <base-checkbox
                            class="col-1"
                            v-model="selected"
                            ></base-checkbox> -->
                    <small class="col-1 mt-2">
                      iii)
                    </small>
                    <small class="col mt-2">
                      <i>I fulfill the eligibility requirements prescribed under the rules of FIMM</i>
                    </small>
                  </div>
                  <div class="row m-2">
                    <!-- <base-checkbox
                            class="col-1"
                            v-model="unselected"
                            ></base-checkbox> -->
                    <small class="col-1 mt-2">
                      iv)
                    </small>
                    <small class="col mt-2">
                      <i>I am not an undischarged bankrupt</i>
                    </small>
                  </div>
                  <div class="row m-2">
                    <!-- <base-checkbox
                            class="col-1"
                            v-model="unselected"
                            ></base-checkbox> -->
                    <small class="col-1 mt-2">
                      v)
                    </small>
                    <small class="col mt-2">
                      <i>I agree, at all time, be bound by and comply with FIMM Rules, securities laws and other applicable laws</i>
                    </small>
                  </div>
                  <div class="row m-2">
                    <!-- <base-checkbox
                            class="col-1"
                            v-model="unselected"
                            ></base-checkbox> -->
                    <small class="col-1 mt-2">
                      vi)
                    </small>
                    <small class="col mt-2">
                      <i>I have never been subject to disciplinary proceeding or expelled by a regulatory body in respect of my professional capacity</i>
                    </small>
                  </div>
                  <div class="row m-2">
                    <!-- <base-checkbox
                            class="col-1"
                            v-model="unselected"
                            ></base-checkbox> -->
                    <small class="col-1 mt-2">
                      vii)
                    </small>
                    <small class="col mt-2">
                      <i>I have never been refused membership of a statutory professional or other body in respect to my professional capacity</i>
                    </small>
                  </div>
                  <div class="row m-2">
                    <!-- <base-checkbox
                            class="col-1"
                            v-model="unselected"
                            ></base-checkbox> -->
                    <small class="col-1 mt-2">
                      viii)
                    </small>
                    <small class="col mt-2">
                      <i>I have never been dismissed or had a proper authority withdrawn on ethical or legal grounds</i>
                    </small>
                  </div>
                  <div class="row m-2">
                    <!-- <base-checkbox
                            class="col-1"
                            v-model="unselected"
                            ></base-checkbox> -->
                    <small class="col-1 mt-2">
                      ix)
                    </small>
                    <small class="col mt-2">
                      <i>I have never had a business-related license, registration or membership revoked, denied or suspended</i>
                    </small>
                  </div>
                  <div class="row m-2">
                    <!-- <base-checkbox
                            class="col-1"
                            v-model="unselected"
                            ></base-checkbox> -->
                    <small class="col-1 mt-2">
                      x)
                    </small>
                    <small class="col mt-2">
                      <i>I have never been charged or convicted in a court of law</i>
                    </small>
                  </div>
                  <div class="row m-2">
                    <!-- <base-checkbox
                            class="col-1"
                            v-model="unselected"
                            ></base-checkbox> -->
                    <small class="col-1 mt-2">
                      xi)
                    </small>
                    <small class="col mt-2">
                      <i>I will immediately notify the principal and/or FIMM in the event that I fail to satisfy any of the fit and proper criteria prescribed by FIMM.</i>
                    </small>
                  </div>
                  <div class="row m-2">
                    <!-- <base-checkbox
                            class="col-1"
                            v-model="unselected"
                            ></base-checkbox> -->
                    <small class="col-1 mt-2">
                      xii)
                    </small>
                    <small class="col mt-2">
                      <i>I understand and agree that FIMM may:<br />
                        a)	require me to disclose and provide information and documents relating to any matter under the rules of FIMM;<br />
                        b)	require my attendance at any meeting, proceeding or hearing of FIMM;<br />
                        c)	disclose and provide information, documents and records concerning me, including any action taken and sanction imposed against me, to the Securities Commission Malaysia (SC) and other authorities or bodies for regulatory purposes <br />
                        d)	disclose, in the manner FIMM considers appropriate, my name and registration details to the public <br />
                        e)	publish, in the manner FIMM considers appropriate, any information regarding the suspension or revocation of my registration, actions taken and sanctions imposed against me, if any and <br />
                        f)	revoke my registration if this declaration is found to be, wholly or partly, false or misleading.
                      </i>
                    </small>
                  </div>
                  <div class="row m-2">
                    <!-- <base-checkbox
                            class="col-1"
                            v-model="unselected"
                            ></base-checkbox> -->
                    <small class="col-1 mt-2">
                      xiii)
                    </small>
                    <small class="col mt-2">
                      <i>I have read and understood FIMM’s Privacy Notice available on its website and I hereby consent for my personal data provided herein to be processed by FIMM for the purposes stated in the Privacy Notice and</i>
                    </small>
                  </div>
                  <!-- <div class="row m-2">
                            <base-checkbox
                            class="col-1"
                            v-model="unselected"
                            ></base-checkbox>
                        <small class="col mt-2">
                            <i>I hereby expressly consent and authorise FIMM to obtain and/or disclose any Credit Information relating to me from and/or to Credit Reporting Agency or any source deemed appropriate and reasonable for the purposes of this application for registration with FIMM. This consent shall remain in effect during the period of any registration with FIMM as a Consultant.”</i>
                        </small>
                        </div> -->
                </div>
              </tab-content>
              <template
                slot="footer"
                slot-scope="{ activeTabIndex, isLastStep, nextTab, prevTab }"
              >
                <div class="wizard-footer-left">
                  <button
                    v-if="activeTabIndex > 0"
                    @click="prevTab"
                    type="button"
                    class="btn btn-primary btn-fill btn-md"
                  >
                    <i class="fa fa-step-backward" /> &nbsp; Previous
                  </button>
                  <button
                    v-if="activeTabIndex <= 0"
                    @click="back"
                    type="button"
                    class="btn btn-primary btn-fill btn-md"
                  >
                    <i class="fa fa-step-backward" /> &nbsp; Previous
                  </button>
                </div>
                <div class="ml-2 wizard-footer-right">
                  <button
                    v-if="!isLastStep"
                    @click="nextTab"
                    type="button"
                    class="ml-2 btn btn-primary btn-fill btn-md"
                  >
                    Next &nbsp; <i class="fa fa-step-forward" />
                  </button>

                  <button
                    v-if="isLastStep"
                    @click="nextTab"
                    type="button"
                    class="mr-2 btn btn-info btn-fill btn-md"
                  >
                    <i class="fa fa-pencil-square-o" /> &nbsp; Save as draft
                  </button>
                  <b-button
                    v-b-modal.modal-prevent-closing
                    v-if="isLastStep"
                    @click="nextTab"
                    type="button"
                    class="btn btn-primary btn-fill btn-md"
                  >
                    <i class="fa fa-paper-plane" /> &nbsp; Submit
                  </b-button>
                </div>
              </template>
            </form-wizard>
          </va-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueFormGenerator from 'vue-form-generator'
import 'vue-form-generator/dist/vfg-core.css'
import 'bootstrap/dist/css/bootstrap.css'
import Vue from 'vue'
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

Vue.use(VueFormGenerator)
export default {
  components: {
    FullCalendar, // make the <FullCalendar> tag available
  },
  props: {
    value: File,
  },
  watch: {
    'model.icNo': function (val) {
      console.log('dob :' + this.model.dateOfBirth)
      if (val.substr(11, 1) != '') {
        console.log('last character :' + val.substr(11, 1))
        var Year = val.substring(0, 2)
        var Month = val.substring(2, 4)
        var Day = val.substring(4, 6)

        var cutoff = (new Date()).getFullYear() - 2000
        console.log('year :' + cutoff)

        var dob = (Year > cutoff ? '19' : '20') + Year + '-' + Month + '-' + Day
        this.model.dateOfBirth = dob
        console.log('dob :' + dob)
        console.log((Year > cutoff ? '19' : '20') + Year)
        const yearBirth = (Year > cutoff ? '19' : '20') + Year
        if (parseInt(yearBirth) <= 1970) {
          console.log('1970 and below')
          this.visibleOldIc = true
        } else {
          console.log('above')
          this.visibleOldIc = false
        }
        if (parseInt(val.substr(11, 1)) % 2 == 0) {
          console.log('The number is even. f')
          this.model.gender = '1'
        } else {
          console.log('The number is odd. l')
          this.model.gender = '2'
        }
      }

      // if(val == 1) {
      //             this.visiblePassport = false;
      //             this.visibleIc = true;
      // } else {
      //             this.visiblePassport = true;
      //             this.visibleIc = false;
      // }
    },
  },
  data () {
    return {
      postcode: [
        '1001',
        '40000',
        '40100',
        '40150',
        '40160',
        '40170',
        '40200',
        '40300',
        '40400',
        '40450',
        '40460',
        '40470',
        '40500',
        '40502',
        '40503',
        '40505',
        '40512',
        '40517',
        '40520',
        '40529',
        '40542',
        '40548',
        '40550',
        '40551',
        '40560',
        '40564',
        '40570',
        '40572',
        '40576',
        '40578',
        '40582',
        '40590',
        '40592',
        '40594',
        '40596',
        '40598',
        '40604',
        '40607',
        '40608',
        '40610',
        '40612',
        '40620',
        '40622',
        '40626',
        '40632',
        '40646',
        '40648',
        '40660',
        '40664',
        '40670',
        '40672',
        '40673',
        '40674',
        '40675',
        '40676',
        '40680',
        '40690',
        '40700',
        '40702',
        '40704',
        '40706',
        '40708',
        '40710',
        '40712',
        '40714',
        '40716',
        '40718',
        '40720',
        '40722',
        '40724',
        '40726',
        '40728',
        '40730',
        '40732',
        '40800',
        '40802',
        '40804',
        '40806',
        '40808',
        '40810',
        '40990',
        '41000',
        '41050',
        '41100',
        '41150',
        '41200',
        '41250',
        '41300',
        '41400',
        '41506',
        '41560',
        '41586',
        '41672',
        '41700',
        '41710',
        '41720',
        '41900',
        '41902',
        '41904',
        '41906',
        '41908',
        '41910',
        '41912',
        '41914',
        '41916',
        '41918',
        '41990',
        '42000',
        '42009',
        '42100',
        '42200',
        '42300',
        '42500',
        '42507',
        '42509',
        '42600',
        '42610',
        '42700',
        '42800',
        '42920',
        '42940',
        '42960',
        '43000',
        '43007',
        '43009',
        '43100',
        '43200',
        '43207',
        '43300',
        '43400',
        '43500',
        '43558',
        '43600',
        '43650',
        '43700',
        '43800',
        '43807',
        '43809',
        '43900',
        '43950',
        '44000',
        '44010',
        '44020',
        '44100',
        '44110',
        '44200',
        '44300',
        '45000',
        '45100',
        '45200',
        '45207',
        '45209',
        '45300',
        '45400',
        '45500',
        '45600',
        '45607',
        '45609',
        '45620',
        '45700',
        '45800',
        '46000',
        '46050',
        '46100',
        '46150',
        '46200',
        '46300',
        '46350',
        '46400',
        '46506',
        '46547',
        '46549',
        '46551',
        '46564',
        '46582',
        '46598',
        '46662',
        '46668',
        '46672',
        '46675',
        '46700',
        '46710',
        '46720',
        '46730',
        '46740',
        '46750',
        '46760',
        '46770',
        '46780',
        '46781',
        '46782',
        '46783',
        '46784',
        '46785',
        '46786',
        '46787',
        '46788',
        '46789',
        '46790',
        '46791',
        '46792',
        '46793',
        '46794',
        '46795',
        '46796',
        '46797',
        '46798',
        '46799',
        '46800',
        '46801',
        '46802',
        '46803',
        '46804',
        '46805',
        '46806',
        '46860',
        '46870',
        '46960',
        '46962',
        '46964',
        '46966',
        '46968',
        '46970',
        '46972',
        '46974',
        '46976',
        '46978',
        '47000',
        '47100',
        '47110',
        '47120',
        '47130',
        '47140',
        '47150',
        '47160',
        '47170',
        '47180',
        '47190',
        '47200',
        '47300',
        '47301',
        '47307',
        '47308',
        '47400',
        '47410',
        '47500',
        '47507',
        '47509',
        '47600',
        '47610',
        '47620',
        '47630',
        '47640',
        '47650',
        '47800',
        '47810',
        '47820',
        '47830',
        '48000',
        '48010',
        '48020',
        '48050',
        '48100',
        '48200',
        '48300',
        '53100',
        '55100',
        '56000',
        '56100',
        '63000',
        '63100',
        '63200',
        '63300',
        '64000',
        '68000',
        '68100',
      ],
      noOfSession: null,
      centreLocation: [
        {
          id: '1',
          name: 'I World Technology, Johor Bahru',
        },
        {
          id: '2',
          name: 'KYP, Kuantan, Pahang',
        },
      ],
      selected1: false,
      selected2: false,
      selected3: false,
      selected4: false,
      selected5: false,

      file1: '',
      file2: '',
      file3: '',
      file4: '',

      viewType: 1,
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        backgroundColor: '#ff0000',
        eventColor: '#378006',
        eventClick: this.handleDateClick,
        events: [
          { title: 'Available', date: '2020-11-01', display: 'background' },
          { title: 'Available', date: '2020-11-02', display: 'background' },
        ],
      },
      // calendarPlugins:[dayGridPlugin, interactionPlugin],
      //* * selected exam table */
      currentPageSelected: 1,
      perPageSelected: 5,
      filterSelected: null,
      fieldSelectedExam: [
        // A virtual column that doesn't exist in items
        { key: 'index', label: 'No' },
        // A column that needs custom formatting
        { key: 'refNo', label: 'Ref No' },
        { key: 'examDate', label: 'Exam Date' },
        { key: 'closingDate', label: 'Closing Date' },
        { key: 'sessionTime', label: 'Session Time' },
        { key: 'day', label: 'Day' },
        { key: 'centreName', label: 'Centre Name' },
        { key: 'centreLocation', label: 'Centre Location' },
        { key: 'availableSit', label: 'Available Sit' },
        { key: 'actions', label: 'Action' },
      ],
      selectedExamList: [],
      //* * table */
      schema: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'input',
                inputType: 'text',
                model: 'sessionYear',
                label: 'Session Year',
                styleClasses: 'col-md-6',
              },
              {
                type: 'input',
                inputType: 'text',
                model: 'sessionTime',
                label: 'Session Time',
                styleClasses: 'col-md-6',
              },
              // {
              //   type: "input",
              //   inputType: "text",
              //   model: "day",
              //   label: "Day",
              //   styleClasses: "col-md-6"
              // },
              {
                type: 'input',
                inputType: 'date',
                label: 'Start Date',
                model: 'date',
                format: 'YYYY-MM-DD HH:mm:ss',
                required: true,
                validator: 'string',
                styleClasses: 'col-md-6',
              },
              {
                type: 'input',
                inputType: 'date',
                label: 'End Date',
                model: 'date',
                format: 'YYYY-MM-DD HH:mm:ss',
                required: true,
                validator: 'string',
                styleClasses: 'col-md-6',
              },
              // {
              //   type: "input",
              //   inputType: "text",
              //   model: "centreLoc",
              //   label: "Centre Location",
              //   styleClasses: "col-md-6"
              // },
              {
                type: 'select',
                model: 'centreLoc',
                label: 'Center Location',
                values: (model, schema) => {
                  return this.centreLocation
                },
                styleClasses: 'col-md-6',
              },
            ],
          },
        ],
      },
      // search
      sessionYear: '',
      sessionTime: '',
      day: '',
      centreLoc: '',

      currentPage: 1,
      perPage: 5,
      filter: null,
      fields: [
        // A virtual column that doesn't exist in items
        { key: 'index', label: 'No' },
        // A column that needs custom formatting
        { key: 'refNo', label: 'Ref No' },
        { key: 'examDate', label: 'Exam Date' },
        { key: 'closingDate', label: 'Closing Date' },
        { key: 'sessionTime', label: 'Session Time' },
        { key: 'day', label: 'Day' },
        { key: 'centreName', label: 'Centre Name' },
        { key: 'centreLocation', label: 'Centre Location' },
        { key: 'availableSit', label: 'Available Sit' },
        { key: 'actions', label: 'Action' },
      ],
      photoUploadList: [
        {
          id: '1',
          fileName: 'Applicant Photo',
          type: 'photo',
          filePath: '',
          selected: false,
          applicantPhoto: '',
          applicantPhotoDisplay: '',
        },
        {
          id: '5',
          fileName: 'NRIC Photo - Front',
          type: 'photo',
          filePath: '',
          selected: false,
          applicantPhoto: '',
          applicantPhotoDisplay: '',
        },
        {
          id: '5',
          fileName: 'NRIC Photo - Back',
          type: 'photo',
          filePath: '',
          selected: false,
          applicantPhoto: '',
          applicantPhotoDisplay: '',

        },
        {
          id: '2',
          fileName: 'Cover letter for Former and Variation PRS consultant',
          type: 'file',
          filePath: '',
          selected: false,
          applicantPhoto: '',
          applicantPhotoDisplay: '',
        },
        {
          id: '3',
          fileName: 'Letter of Undertaking for variation due to Merger',
          type: 'file',
          filePath: '',
          selected: false,
          applicantPhoto: '',
          applicantPhotoDisplay: '',
        },
        {
          id: '4',
          fileName: 'Printed online application',
          type: 'file',
          filePath: '',
          selected: false,
          applicantPhoto: '',
          applicantPhotoDisplay: '',
        },
        {
          id: '5',
          fileName: 'Statutory Declaration',
          type: 'file',
          filePath: '',
          selected: false,
          applicantPhoto: '',
          applicantPhotoDisplay: '',
        },
      ],
      examTimetableList: [
        {
          id: '1',
          refNo: 'U-64200',
          examDate: '05/11/2020',
          closingDate: '26/10/2020',
          sessionTime: '9.00 am - 11.00 am',
          day: 'Thursday',
          centreName: 'I World Technology, Johor Bahru',
          centreLocation: 'I World, Johor Bahru',
          availableSit: '1',
          selected: false,
        },
        {
          id: '1',
          refNo: 'U-64200',
          examDate: '05/11/2020',
          closingDate: '26/10/2020',
          sessionTime: '9.00 am - 11.00 am',
          day: 'Thursday',
          centreName: 'I World Technology, Johor Bahru',
          centreLocation: 'I World, Johor Bahru',
          availableSit: '3',
          selected: false,
        },
        {
          id: '1',
          refNo: 'U-64200',
          examDate: '05/11/2020',
          closingDate: '26/10/2020',
          sessionTime: '9.00 am - 11.00 am',
          day: 'Thursday',
          centreName: 'I World Technology, Johor Bahru',
          centreLocation: 'I World, Johor Bahru',
          availableSit: '5',
          selected: false,
        },
      ],
      city: [
        {
          id: '0',
          name: 'Sydney',
        },
        {
          id: '1',
          name: 'Subang Jaya',
        },
        {
          id: '2',
          name: 'Klang',
        },
        {
          id: '3',
          name: 'Ampang Jaya',
        },
        {
          id: '3',
          name: 'Shah Alam',
        },
        {
          id: '3',
          name: 'Petaling Jaya',
        },
        {
          id: '3',
          name: 'Cheras',
        },
        {
          id: '3',
          name: 'Kajang',
        },
        {
          id: '3',
          name: 'Selayang Baru',
        },
        {
          id: '3',
          name: 'Rawang',
        },
        {
          id: '3',
          name: 'Taman Greenwood',
        },
        {
          id: '3',
          name: 'Semenyih',
        },
        {
          id: '3',
          name: 'Serdang',
        },
      ],
      //* *///// */
      states: [
        {
          id: 'MY-14',
          name: 'Wilayah Persekutuan Kuala Lumpur',
        },
        {
          id: 'MY-15',
          name: 'Wilayah Persekutuan Labuan',
        },
        {
          id: 'MY-16',
          name: 'Wilayah Persekutuan Putrajaya',
        },
        {
          id: 'MY-01',
          name: 'Johor',
        },
        {
          id: 'MY-02',
          name: 'Kedah',
        },
        {
          id: 'MY-03',
          name: 'Kelantan',
        },
        {
          id: 'MY-04',
          name: 'Melaka',
        },
        {
          id: 'MY-05',
          name: 'Negeri Sembilan',
        },
        {
          id: 'MY-06',
          name: 'Pahang',
        },
        {
          name: 'Perak',
          id: 'MY-08',
        },
        {
          id: 'MY-09',
          name: 'Perlis',
        },
        {
          id: 'MY-07',
          name: 'Pulau Pinang',
        },
        {
          id: 'MY-12',
          name: 'Sabah',
        },
        {
          id: 'MY-13',
          name: 'Sarawak',
        },
        {
          id: 'MY-10',
          name: 'Selangor',
        },
        {
          id: 'MY-11',
          name: 'Terengganu',
        },
      ],
      country: [{
        id: '1',
        name: 'Malaysia',
        selected: true,
      },
      {
        id: '1',
        name: 'Australia',
        selected: true,
      },
      ],
      gender: [
        {
          name: 'Female',
          value: '1',
          selected: true,
        },
        {
          name: 'Male',
          value: '2',
        },
      ],
      race: [
        { name: 'Malay', id: '1' },
        { name: 'Chinese', id: '2' },
        { name: 'Indian', id: '3' },
        { name: 'Others', id: '4' },
        // { name: "Former PRS Consultant / Vary Registration", id: "5" },
      ],
      applicationType: [
        //  {
        //   name: "I want to add on UTS [UTS only]",
        //   value: "1"
        // },
        // {
        //   name: "I want to add on PRS [PRS only]",
        //   value: "2"
        // },
        // {
        //   name: "I am qualified* for exemption [Exemption] ",
        //   value: "3"
        // },
        {
          name: 'I want to be both UTS and PRS Consultant [General + UTS + PRS]',
          value: '1',
        },
        {
          name: 'I want to be UTS Consultant only [General + UTS]',
          value: '2',
        },
        {
          name: 'I want to be PRS Consultant only [General + PRS]',
          value: '3',
        },
        {
          name: 'I am qualified* for exemption [Exemption]',
          value: '4',
        },
        // { name: "CUTA", value: "3" }
      ],
      catExemption: [
        {
          name: 'PRS Familarization Program. Active UTC > 3 Years',
          id: '1',
        },
        {
          name: 'Insurance Agent. Active Ceilli License > 2 Years',
          id: '2',
        },
        {
          name: 'CEO / Director of UT',
          id: '3',
        },
        {
          name: 'Professional Certificate CFP/IFP/ChFC/RFP/SRFP',
          id: '4',
        },
        {
          name: 'Fund Manager with valid CMSRL',
          id: '5',
        },
      ],

      qualification: [
        {
          name: 'SPM',
          id: '1',
          selected: true,
        },
        {
          name: 'STPM',
          id: '2',
        },
        {
          name: 'Diploma',
          id: '3',
        },
        {
          name: 'Degree',
          id: '4',
        },
        {
          name: 'Post-graduate',
          id: '5',
        },
        {
          name: 'Professional certificate',
          id: '6',
        },
        {
          name: 'Others',
          id: '6',
        },
      ],

      catConsultant: [
        {
          name: 'Employee',
          value: '1',
          selected: true,
        },
        {
          name: 'Consultant',
          value: '2',
        },
      ],

      compType: [
        {
          name: 'IUTA',
          id: '1',
          selected: true,
        },
        {
          name: 'IPRA',
          id: '2',
        },
        {
          name: 'CPRA',
          id: '3',
        },
        {
          name: 'CUTA',
          id: '4',
        },
      ],

      resitType: [
        {
          name: 'Resit',
          id: '1',
          selected: true,
        },
        {
          name: 'Reschedule',
          id: '2',
        },
        {
          name: 'First Time',
          id: '3',
        },
      ],

      compList: [
        {
          id: '1',
          name: 'A.D.Fincancial Sdn. Bhd.',
        },
        {
          id: '2',
          name: 'Affin Bank Berhad',
        },
        {
          id: '3',
          name: 'Affin Hwang Asset Management Berhad',
        },
      ],

      compBranch: [
        {
          id: '1',
          name: 'Alor Star Branch',
        },
        {
          id: '2',
          name: 'Bangsar Branch',
        },
        {
          id: '3',
          name: 'Kota Kinabalu Branch',
        },
      ],

      apprenticeshipProg: [
        {
          name: 'Yes',
          value: '1',
          selected: true,
        },
        {
          name: 'No',
          value: '2',
        },
      ],
      icTypes: [
        {
          name: 'New NRIC',
          value: '1',
        },
        {
          name: 'Old NRIC',
          value: '2',
        },
        {
          name: 'Passport',
          value: '3',
        },
      ],
      nameOptions: [
        {
          name: 'Name of CEO',
          value: '1',
        },
        {
          name: 'Director',
          value: '2',
        },
      ],
      visibleOldIc: false,
      visible: false,
      visibleDepartment: false,
      visibleCatExemption: false,
      visibleExamSession: false,
      visibleApprenticeProg: false,
      visibleResitType: false,
      citizenship: [
        {
          name: 'Malaysian',
          value: '1',
          selected: true,
        },
        {
          name: 'Non Malaysian',
          value: '2',
        },
      ],
      department: [
        {
          name: 'Sales and Marketing',
          id: '1',
        },
        {
          name: 'Training',
          id: '2',
        },
        {
          name: 'Customer Service',
          id: '3',
        },
        {
          name: 'Compliance',
          id: '4',
        },
        {
          name: 'Others',
          id: '5',
        },
      ],
      applicantPhoto: '',
      model: {
        applicationType: '',
        catExemption: '',
        qualification: '4',

        firstName: 'Mohd Saiful',
        middleName: 'Bin',
        LastName: 'Rashid',
        icPassport: '870602055866',
        icType: '1',
        dateOfBirth: '1987-11-19 00:00',
        applicantAddress: '',
        applicantAddress2: '',
        applicantAddress3: '',
        applicantPostcode: '',
        applicantCity: '',
        applicantState: '',
        applicantAddressCorrespondence: '',
        applicantAddress2Correspondence: '',
        applicantAddress3Correspondence: '',
        applicantPostcodeCorrespondence: '',
        applicantCityCorrespondence: '',
        applicantStateCorrespondence: '',
        applicantPhoneno: '01336607672',
        applicantHouseNo: '067676767',
        applicantEmail: 'saiful@gmail.com',
        otherQua: '',
        nationality: '1',
        oldICNo: '34756943',
        icNo: '550506065580',
        gender: '',
        race: '[{ name: "Malay", id: "1" }]',

        catConsultant: '',
        ApprenticeProg: '',
        companyName: '',
        companyType: '',
        companyBranch: '',

        department: '1',
        othersDepartment: '',
        distApprenticeProg: '',
        distDistPointCode: '',
        distPointName: '',
        distaddress: '',
        distaddress2: '',
        distpostcode: '',
        distcity: '',
        distState: '',
      },
      formOptions: {
        // validationErrorClass: "has-error",
        // validationSuccessClass: "has-`success`",
        validateAfterChanged: true,
      },
      firstTabSchema: {
        fields: [
          {
            type: 'radios',
            label: 'Examination Type',
            model: 'applicationType',
            required: true,
            validator: 'string',
            // styleClasses: "display-inline",
            values: () => {
              return this.applicationType
            },
          },
          {
            type: 'select',
            label: 'Category of Exemption',
            model: 'catExemption',

            values: () => {
              return this.catExemption
            },
            required: true,
            validator: 'string',
            visible: (model, field, form) => {
              return this.visibleCatExemption
            },
          },
        ],
      },
      correspondenceAddress: {
        groups: [
          {
            styleClasses: 'row',
            // legend: "A. Authorised Representative",
            fields: [
              {
                type: 'input',
                inputType: 'text',
                label: 'Address',
                model: 'applicantAddressCorrespondence',
                placeholder: 'Enter street address',
                hint: 'Street Address',
                required: true,
                styleClasses: 'col-md-12',
              },
              {
                type: 'input',
                inputType: 'text',
                model: 'applicantAddress2Correspondence',
                placeholder: 'Enter street address',
                hint: 'Street Address line 2',
                styleClasses: 'col-md-12',
              },
              {
                type: 'input',
                inputType: 'text',
                model: 'applicantAddress3Correspondence',
                placeholder: 'Enter street address',
                hint: 'Street Address line 3',
                styleClasses: 'col-md-12',
              },
              {
                type: 'vueMultiSelect',
                model: 'applicantPostcodeCorrespondence',
                label: 'Postcode',
                placeholder: 'Enter Postcode',
                required: true,
                validator: 'required',
                styleClasses: 'col-md-6',
                selectOptions: {
                  multiple: false,
                  // key: "name",
                  // label: "name",
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.postcode
                },
              },
              {
                type: 'vueMultiSelect',
                model: 'applicantCityCorrespondence',
                label: 'City',
                placeholder: 'Enter Your City',
                required: true,
                validator: 'required',
                styleClasses: 'col-md-6',
                selectOptions: {
                  multiple: false,
                  key: 'name',
                  label: 'name',
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.city
                },
              },
              {
                type: 'vueMultiSelect',
                model: 'applicantStateCorrespondence',
                label: 'State',
                placeholder: 'Enter Your State',
                required: true,
                validator: 'required',
                styleClasses: 'col-md-6',
                selectOptions: {
                  multiple: false,
                  key: 'name',
                  label: 'name',
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.states
                },
              },
              // {
              //   type: "input",
              //   inputType: "text",
              //   model: "applicantCityCorrespondence",
              //   placeholder: "Enter Your City",
              //   label: "City",
              //   required: true,
              //   validator: "string",
              //   styleClasses: "col-md-6"
              // },
              // {
              //   type: "select",
              //   model: "applicantStateCorrespondence",
              //   placeholder: "Enter Your State",
              //   label: "State",
              //   required: true,
              //   validator: "string",
              //   values: (model, schema) => {
              //     return this.states;
              //   },
              //   required: true,
              //   styleClasses: "col-md-6"
              // },
            ],
          },
        ],
      },
      permanentAddress: {
        groups: [
          {
            styleClasses: 'row',
            // legend: "A. Authorised Representative",
            fields: [
              {
                type: 'input',
                inputType: 'text',
                label: 'Address',
                model: 'applicantAddress',
                placeholder: 'Enter street address',
                hint: 'Street Address',
                required: true,
                styleClasses: 'col-md-12',
              },
              {
                type: 'input',
                inputType: 'text',
                model: 'applicantAddress2',
                placeholder: 'Enter street address',
                hint: 'Street Address line 2',
                styleClasses: 'col-md-12',
              },
              {
                type: 'input',
                inputType: 'text',
                model: 'applicantAddress3',
                placeholder: 'Enter street address',
                hint: 'Street Address line 3',
                styleClasses: 'col-md-12',
              },
              {
                type: 'vueMultiSelect',
                model: 'applicantPostcode',
                label: 'Postcode',
                placeholder: 'Enter Postcode',
                required: true,
                validator: 'required',
                styleClasses: 'col-md-6',
                selectOptions: {
                  multiple: false,
                  // key: "name",
                  // label: "name",
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.postcode
                },
              },
              {
                type: 'vueMultiSelect',
                model: 'applicantCity',
                label: 'City',
                placeholder: 'Enter Your City',
                required: true,
                validator: 'required',
                styleClasses: 'col-md-6',
                selectOptions: {
                  multiple: false,
                  key: 'name',
                  label: 'name',
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.city
                },
              },
              {
                type: 'vueMultiSelect',
                model: 'applicantState',
                label: 'State',
                placeholder: 'Enter Your State',
                required: true,
                validator: 'required',
                styleClasses: 'col-md-6',
                selectOptions: {
                  multiple: false,
                  key: 'name',
                  label: 'name',
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.states
                },
              },
              // {
              //   type: "select",
              //   model: "applicantState",
              //   placeholder: "Enter Your State",
              //   label: "State",
              //   required: true,
              //   validator: "string",
              //   values: (model, schema) => {
              //     return this.states;
              //   },
              //   required: true,
              //   styleClasses: "col-md-6"
              // },
            ],
          },
        ],

      },
      secondTabSchema: {
        groups: [
          {
            styleClasses: 'row',
            // legend: "A. Authorised Representative",
            fields: [
              // {
              //   type: "input",
              //   inputType: "text",
              //   label: "Name",
              //   model: "applicantName",
              //   placeholder: "Enter Name",
              //   required: true,
              //   validator: "string"
              // },
              {
                type: 'input',
                inputType: 'text',
                label: 'First Name',
                model: 'firstName',
                placeholder: 'Please enter name as per NRIC',
                required: true,
                validator: 'string',
                styleClasses: 'col-md-4',
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Middle Name',
                model: 'middleName',
                placeholder: 'Please enter name as per NRIC',
                required: true,
                validator: 'string',
                styleClasses: 'col-md-4',
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Last Name',
                model: 'LastName',
                placeholder: 'Please enter name as per NRIC',
                required: true,
                validator: 'string',
                styleClasses: 'col-md-4',
              },
              // {
              //   type: "radios",
              //   label: "Type of identification number",
              //   model: "icType",
              //   values: () => {
              //     return this.icTypes;
              //   },
              //   styleClasses: "col-md-5 display-inline"
              // },
              {
                type: 'radios',
                label: 'Nationality',
                model: 'nationality',
                disabled: true,
                values: () => {
                  return this.citizenship
                },
                styleClasses: 'col-md-3 display-inline',
              },
              {
                // label: "NRIC No.",
                model: 'icNo',
                type: 'vfg-the-mask',
                placeholder: 'Enter NRIC No',
                mask: '######-##-####',
                styleClasses: 'col-md-9',
                visible: (model, field, form) => {
                  return this.visibleOldIc == false && model.nationality == '1'
                },
                // required: true,
                // validator: "string",
                disabled: true,
              },
              {
                // label: "NRIC No.",
                model: 'icNo',
                type: 'vfg-the-mask',
                placeholder: 'Enter NRIC No',
                mask: '######-##-####',
                styleClasses: 'col-md-5',
                visible: (model, field, form) => {
                  return this.visibleOldIc == true && model.nationality == '1'
                },
                // required: true,
                // validator: "string",
                disabled: true,
              },

              {
                type: 'input',
                inputType: 'text',
                label: 'Old NRIC No',
                model: 'oldICNo',
                placeholder: 'Enter old NRIC No.',
                disabled: true,
                // required: true,
                // validator: "string",
                styleClasses: 'col-md-4',
                visible: (model, field, form) => {
                  return this.visibleOldIc == true && model.nationality == '1'
                },
              },

              {
                type: 'input',
                inputType: 'text',
                label: 'Passport No.',
                model: 'passportNo',
                placeholder: 'Enter Passport No.',
                required: true,
                validator: 'string',
                styleClasses: 'col-md-5',
                visible: (model, field, form) => {
                  return model.nationality == '2'
                },
              },
              {
                type: 'vfg-functional-date',
                placeholder: 'Enter passport expiry date',
                labels: 'Passport Expiry Date',
                model: 'expDate',
                noLabel: true,
                noClearButton: true,
                formatted: 'DD/MM/YYYY',
                styleClasses: 'col-md-4',
                visible: (model, field, form) => {
                  return model.nationality == '2'
                },
                required: true,
                validator: 'string',
              },
              // {
              //   type: "input",
              //   inputType: "text",
              //   label: "I.C No./ Passport No.",
              //   model: "icPassport",
              //   placeholder: "Enter I.C No./ Passport No.",
              //   required: true,
              //   validator: "string",
              //   styleClasses: "col-md-6"
              // },
              {
                type: 'radios',
                label: 'Gender',
                model: 'gender',
                values: () => {
                  return this.gender
                },
                styleClasses: 'col-md-3 display-inline',
                disabled: true,
              },
              {
                type: 'input',
                inputType: 'date',
                label: 'Date of Birth',
                model: 'dateOfBirth',
                format: 'YYYY-MM-DD HH:mm:ss',
                required: true,
                validator: 'string',
                styleClasses: 'col-md-5',

              },

              {
                type: 'vueMultiSelect',
                model: 'race',
                label: 'Race',
                placeholder: 'Enter Your Race',
                required: true,
                validator: 'required',
                styleClasses: 'col-md-4',
                selectOptions: {
                  multiple: false,
                  key: 'name',
                  label: 'name',
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.race
                },
              },
              // {
              //   type: "input",
              //   inputType: "text",
              //   label: "Address",
              //   model: "applicantAddress",
              //   placeholder: "Enter street address",
              //   hint: "Street Address",
              //   required: true,
              //   styleClasses: "col-md-12",
              // },
              // {
              //   type: "input",
              //   inputType: "text",
              //   model: "applicantAddress2",
              //   placeholder: "Enter street address",
              //   hint: "Street Address line 2",
              //   styleClasses: "col-md-12",
              // },
              // {
              //   type: "input",
              //   inputType: "text",
              //   model: "applicantAddress2",
              //   placeholder: "Enter street address",
              //   hint: "Street Address line 3",
              //   styleClasses: "col-md-12",
              // },
              // {
              //   type: "input",
              //   inputType: "text",
              //   label: "Postcode",
              //   model: "applicantPostcode",
              //   placeholder: "Enter postcode",
              //   required: true,
              //   validator: "string",
              //   styleClasses: "col-md-6"
              // },
              // {
              //   type: "input",
              //   inputType: "text",
              //   model: "applicantCity",
              //   placeholder: "Enter Your City",
              //   label: "City",
              //   required: true,
              //   validator: "string",
              //   styleClasses: "col-md-6"
              // },
              // {
              //   type: "select",
              //   model: "applicantState",
              //   placeholder: "Enter Your State",
              //   label: "State",
              //   required: true,
              //   validator: "string",
              //   values: (model, schema) => {
              //     return this.states;
              //   },
              //   required: true,
              //   styleClasses: "col-md-6"
              // },
              {
                type: 'input',
                inputType: 'number',
                label: 'Telephone Number',
                model: 'applicantPhoneno',
                placeholder: 'Enter telephone number',
                disabled: true,
                // required: true,
                // validator: "string",
                styleClasses: 'col-md-6',
              },
              {
                type: 'input',
                inputType: 'number',
                label: 'House Number',
                model: 'applicantHouseNo',
                placeholder: 'Enter house number',
                required: true,
                validator: 'string',
                styleClasses: 'col-md-6',
              },
              {
                type: 'input',
                inputType: 'email',
                label: 'Email Address',
                model: 'applicantEmail',
                placeholder: 'Enter email address',
                required: true,
                validator: 'string',
                styleClasses: 'col-md-6',
              },
              {
                type: 'vueMultiSelect',
                label: 'Highest Educational Qualification',
                model: 'qualification',
                selectOptions: {
                  multiple: false,
                  key: 'name',
                  label: 'name',
                  searchable: true,
                },
                values: () => {
                  return this.qualification
                },
                required: true,
                validator: 'required',
                styleClasses: 'col-md-6',
              },
              {
                type: 'input',
                inputType: 'text',
                model: 'otherQua',
                placeholder: 'Others (please specify)',
                required: true,
                validator: 'string',
                visible: (model, field, form) => {
                  return this.visible
                },
              },
            ],
          },
        ],
      },
      thirdTabSchema: {
        groups: [
          {
            styleClasses: 'row',
            // legend: "4. Additional Information",
            fields: [
              {
                type: 'radios',
                label: 'Registration Category',
                model: 'catConsultant',
                values: () => {
                  return this.catConsultant
                },
                styleClasses: 'col-md-3 display-inline',
                required: true,
                validator: 'string',
              },

              {
                type: 'select',
                label: 'Company Type',
                model: 'companyType',
                values: () => {
                  return this.compType
                },
                styleClasses: 'col-md-4',
                required: true,
                validator: 'string',
              },

              {
                type: 'radios',
                label: 'Apprenticeship Program',
                model: 'ApprenticeProg',
                values: () => {
                  return this.apprenticeshipProg
                },
                styleClasses: 'col-md-3 display-inline',
                required: true,
                validator: 'string',
                visible: (model, field, form) => {
                  return this.visibleApprenticeProg
                },
              },
              {
                type: 'vueMultiSelect',
                model: 'companyName',
                label: 'Company',
                placeholder: 'Select Company',
                required: true,
                styleClasses: 'col-md-5',
                selectOptions: {
                  multiple: false,
                  key: 'name',
                  label: 'name',
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.compList
                },
              },
              // {
              //   type: "vueMultiSelect",
              //   model: "companyBranch",
              //   label: "Company Branch",
              //   placeholder: "Select Company Branch",
              //   required: true,
              //   styleClasses: "col-md-4",
              //   selectOptions: {
              //     multiple: false,
              //     key: "name",
              //     label: "name",
              //     searchable: true,
              //   },
              //   values: (model, schema) => {
              //     return this.compBranch;
              //   }
              // },
            ],
          },
        ],
      },

      examSchema: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'radios',
                label: 'Examination Type',
                model: 'applicationType',
                required: true,
                validator: 'string',
                // styleClasses: "display-inline",
                values: () => {
                  return this.applicationType
                },
              },
              {
                type: 'select',
                label: 'Examination Resit Type',
                model: 'resitType',
                values: () => {
                  return this.resitType
                },
                styleClasses: 'col-md-4',
                required: true,
                validator: 'string',
                visible: (model, field, form) => {
                  return this.visibleResitType
                },
              },
              {
                type: 'select',
                label: 'Category of Exemption',
                model: 'catExemption',
                values: () => {
                  return this.catExemption
                },
                required: true,
                validator: 'string',
                visible: (model, field, form) => {
                  return this.visibleCatExemption
                },
              },
            ],
          },
        ],
      },

      exemptionSchema: {
        groups: [
          {
            styleClasses: 'row',
            // legend: "4. Additional Information",
            fields: [
              {
                type: 'select',
                label: 'Department',
                model: 'department',

                values: () => {
                  return this.department
                },
                required: true,
                validator: 'string',
                styleClasses: 'ml-1 col-md-5',
              },
              {
                type: 'input',
                inputType: 'text',
                model: 'othersDepartment',
                placeholder: 'Others (please specify)',
                required: true,
                validator: 'string',
                visible: (model, field, form) => {
                  return this.visibleDepartment
                },
              },
              {
                type: 'radios',
                label: 'Apprenticeship Program',
                model: 'distApprenticeProg',
                values: () => {
                  return this.apprenticeshipProg
                },
                required: true,
                validator: 'string',
                styleClasses: 'col-md-6 display-inline',
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Distribution Point Code',
                model: 'distDistPointCode',
                placeholder: 'Enter distribution point code',
                required: true,
                validator: 'string',
                styleClasses: 'ml-1 col-md-5',
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Distribution Point Name',
                model: 'distPointName',
                placeholder: 'Enter distribution point name',
                required: true,
                validator: 'string',
                styleClasses: 'col-md-6',
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Address',
                model: 'distaddress',
                placeholder: 'Enter street address',
                hint: 'Street Address',
                required: true,
                validator: 'string',
              },
              {
                type: 'input',
                inputType: 'text',
                model: 'distaddress2',
                placeholder: 'Enter street address',
                hint: 'Street Address line 2',
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Postcode',
                model: 'distpostcode',
                placeholder: 'Enter postcode',
                required: true,
                validator: 'string',
              },
              {
                type: 'input',
                inputType: 'text',
                model: 'distcity',
                placeholder: 'Enter Your City',
                label: 'City',
                required: true,
                validator: 'string',
                styleClasses: 'ml-1 col-md-5',
              },
              {
                type: 'select',
                model: 'distState',
                placeholder: 'Enter Your State',
                label: 'State',
                required: true,
                validator: 'string',
                values: (model, schema) => {
                  return this.states
                },
                styleClasses: 'mr-1 col-md-5',
              },
            ],
          },
        ],
      },
    }
  },
  //* * active all */
  // mounted(){
  //  var wizard = this.$refs.wizard
  //  wizard.activateAll()
  // },
  mounted () {
    // this is needed to unlock step
    this.$refs.wizard.maxStep = 1
    this.$refs.wizard.navigateToTab(1)
  },
  methods: {

    switchView (type) {
      this.viewType = type
    },
    // handleDateClick: function(arg) {
    //   alert('date click! ' + arg.dateStr)
    // },
    handleDateClick: function (calEvent, jsEvent, view) {
      // console.log(JSON.stringify(view));
      // console.log(JSON.stringify(jsEvent));
      console.log(JSON.stringify(calEvent.event))
      //  var dt = calEvent.date;
      alert('Event Clicked on : ' + this.moment(calEvent.event.start).format('DD-MM-yyyy, h:mm:ss a'))
    // var r = confirm("Delete " + calEvent.title + "\n" + dt);
    // if (r === true) {
    //    $('#calendar').fullCalendar('removeEvents', calEvent._id);
    // }
    },
    addExamSession (data) {
      console.log(JSON.stringify(data.item))
      if (this.selectedExamList.length < this.noOfSession) {
        this.selectedExamList.unshift(data.item)
      }
    },
    back () {
      this.$router.push('/consultant/consultant-uploadPhoto-and-document')
    },
    uploadImage (index, item) {
      item.selected = true
      if (index == 0) {
        // console.log(this.$refs.applicantPhoto[0].files[0]);
        item.applicantPhoto = this.$refs.item.applicantPhoto[0].files[0]
        const reader = new FileReader()
        reader.addEventListener(
          'load',
          function () {
            this.$refs.item.applicantPhotoDisplay[0].src = reader.result
          }.bind(this),
          false,
        )

        reader.readAsDataURL(item.applicantPhoto)
        console.log(item.selected)
      // item.selected = true;
      }
      // else if(index == 1){
      //   this.file1 = this.$refs.file[0].files[0];
      //   item.selected = true;
      // }else if(index == 2){
      //   this.file2 = this.$refs.file2[0].files[0];
      //   item.selected = true;
      // }else if(index == 3){
      //   this.file3 = this.$refs.file3[0].files[0];
      //   item.selected = true;
      // }else if(index == 4){
      //   this.file4 = this.$refs.file4[0].files[0];
      //   item.selected = true;
      // }
    },
    onModelUpdated (newVal, schema) {
      console.log(newVal)
      if (schema == 'applicationType') {
        this.model.resitType = ''
        this.selectedExamList = []
        this.model.applicationType = newVal
        if (newVal == '2') {
          this.visibleCatExemption = false
          this.visibleResitType = true
          this.visibleExamSession = false
        } else if (newVal == '1') {
          this.visibleCatExemption = false
          this.visibleResitType = true
          this.visibleExamSession = false
        } else if (newVal == '3') {
          this.visibleCatExemption = false
          this.visibleResitType = true
          this.visibleExamSession = false
        } else {
          this.visibleCatExemption = true
          this.visibleResitType = false
          this.visibleExamSession = false
        }
      } else if (schema == 'qualification') {
        if (newVal == '6') {
          this.visible = true
        } else {
          this.visible = false
        }
      } else if (schema == 'department') {
        if (newVal == '5') {
          this.visibleDepartment = true
        } else {
          this.visibleDepartment = false
        }
      } else if (schema == 'companyType') {
        if (newVal == '3' || newVal == '4') {
          this.visibleApprenticeProg = true
        } else {
          this.visibleApprenticeProg = false
        }
      } else if (schema == 'resitType') {
        this.visibleExamSession = true
        if (newVal == '1' || newVal == '3') {
          this.noOfSession = 3
        } else {
          this.noOfSession = 1
        }
      } else if (schema == 'race') {
        if (newVal.name == 'Others') {
          this.otherRace = true
        } else {
          this.otherRace = false
        }
      } else if (schema == 'nationality') {
        this.model.dateOfBirth = null
      } else if (schema == 'icNo') {
        console.log('dob :' + this.model.dateOfBirth)
        if (newVal.substr(11, 1) != '') {
          console.log('last character :' + newVal.substr(11, 1))
          var Year = newVal.substring(0, 2)
          var Month = newVal.substring(2, 4)
          var Day = newVal.substring(4, 6)

          var cutoff = (new Date()).getFullYear() - 2000
          console.log('year :' + cutoff)

          var dob = (Year > cutoff ? '19' : '20') + Year + '-' + Month + '-' + Day
          this.model.dateOfBirth = dob
          console.log('dob :' + dob)
          console.log((Year > cutoff ? '19' : '20') + Year)
          const yearBirth = (Year > cutoff ? '19' : '20') + Year
          if (parseInt(yearBirth) <= 1970) {
            console.log('1970 and below')
            this.visibleOldIc = true
          } else {
            console.log('above')
            this.visibleOldIc = false
          }
          if (parseInt(newVal.substr(11, 1)) % 2 == 0) {
            console.log('The number is even. f')
            this.model.gender = '1'
          } else {
            console.log('The number is odd. l')
            this.model.gender = '2'
          }
        }
      }
    },
    handleFileChange (e) {
      this.$emit('input', e.target.files[0])
      this.fileName1 = e.target.files[0].name
      console.log(e.target.files[0].name)
      // if (this.$refs.fileName1.files[0]) {
      //   console.log(this.$refs.fileName1.files[0].name);
      //   this.model.fileName1 = this.$refs.fileName1.files[0].name;
      // }
      // if (this.$refs.fileName2.files[0]) {
      //   console.log(this.$refs.fileName2.files[0].name);
      //   this.model.fileName2 = this.$refs.fileName2.files[0].name;
      // }
      // if (this.$refs.fileName3.files[0]) {
      //   console.log(this.$refs.fileName3.files[0].name);
      //   this.model.fileName3 = this.$refs.fileName3.files[0].name;
      // }
      // if (this.$refs.fileName4.files[0]) {
      //   console.log(this.$refs.fileName4.files[0].name);
      //   this.model.fileName4 = this.$refs.fileName4.files[0].name;
      // }
    },
    onComplete () {
      // alert(JSON.stringify(this.model));

    },
    validatePassword (value) {
      //* * must contain letter only (lowercase and uppercase) */
      const expression1 = /^[a-zA-Z]+$/
      const expression2 = /^[a-zA-Z]*[A-Z]+[a-zA-Z]*$/
      //* * must contain at least one uppercase letter, one lower case letter and one number */
      const expression4 = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]+)$/
      //* * must contain at least one uppercase letter, one lower case letter, one number and one character */
      const expression5 = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*?[#?!@$%^&*-])([a-zA-Z0-9#?!@$%^&*-]+)$/
      //* * must contain at least one uppercase letter, one lower case letter, one number and one character with minimum length*/
      const expression6 = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*?[#?!@$%^&*-])([a-zA-Z0-9#?!@$%^&*-]+).{8}$/

      console.log(expression1.test(value))
      if (!expression1.test(value)) {
        this.passwordStrength = ''
        return ['Password must contain letter only']
      }
    },
    isEqualTo (value, field, model) {
      if (!_.has(field, 'equals')) return ['Confirm password is required']
      const a = _.get(model, _.get(field, 'equals'))
      const b = value
      if (_.isEqual(a, b)) return []
      return ['Password do not match']
    },
    validateFirstTab () {
      return this.$refs.firstTabForm.validate()
    },
    validateSecondTab: function () {
      return this.$refs.secondTabForm.validate()
    },
    validateThirdTab: function () {
      return this.$refs.thirdTabForm.validate()
    },
    validateFourthTab () {
      return this.$refs.fourthTabForm.validate()
    },
  },
}
</script>

<style lang="scss">
.scroll {
  max-height: 200px;
  overflow: scroll;
}

/* .display-inline label {
  display: inline !important;
  padding: 5px;
} */
.w-150px {
  width: 150px;
  height: 150px;
}

.vue-form-wizard .wizard-icon-circle .wizard-icon-container {
  border-radius: 50% !important;
  margin: -4px;
}
</style>

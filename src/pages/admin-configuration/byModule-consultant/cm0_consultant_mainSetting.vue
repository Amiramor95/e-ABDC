<template>
<va-card>
          <div class="col-lg-10">
            <h4 slot="header">Settings by Module</h4>
          </div>
            <br/>
            <br/>
          <!-- 1 -->
            <h5><i class="fa fa-bank"></i>&nbsp;&nbsp; <b>CONSULTANT</b></h5>
            <hr/>
            <br/>
            <div class="ml-5">
              <!-- 1 -->
              <div>
                <span>QUALIFICATION</span>
                <button
                  v-if="visibleLogin == false"
                  v-b-toggle.collapse-1
                  type="button"
                  class="float-right btn-fill btn-md"
                >
                  <i class="fa fa-edit"></i>
                </button>
                <button
                  v-if="visibleLogin == true"
                  v-b-toggle.collapse-1
                  type="button"
                  class="float-right btn-fill btn-md"
                >
                  <i class="fa fa-times"></i>
                </button>
                <!-- <div v-for="(item, index) in fivemo  dule" :key="index"></div> -->
                <b-collapse v-model="visibleLogin" class="mt-4" id="collapse-1">
                  <va-card>
                    <div class="row">
                      <div class="ml-4 col-md-10">
                          <vue-form-generator
                          :model="model"
                          :schema="addQualficationSchema"
                          :options="formOptions"
                           ref="addqualificationForm"
                          />
                      </div>
                    </div>
                    <br />
                    <div class="row">
                      <div class="col-10">
                        <button
                          @click="submit"
                          type="button"
                          class="float-right btn btn-primary btn-fill btn-md"
                        >
                          <i class="fa fa-save" />&nbsp; SAVE
                        </button>
                      </div>
                    </div>
                    <br /><br />
                    <!-- list -->

                    <va-card class="mt-2">
                      <va-data-table
                      :fields="QualificationList"
                      :data="filteredQualification"
                      :per-page="parseInt(perPage)"
                      :datacount="QualificationCount"
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
                      class="badge badge-primary mr-1"
                      v-on:click="editQualification(props.rowData)"
                    >
                      <i class="fa fa-edit"></i
                    ></span>
                    <span
                      v-b-tooltip.hover
                      title="delete"
                      class="badge badge-danger mr-1"
                      v-on:click="deleteQualification(props.rowData)"
                    >
                      <i class="fa fa-trash"></i
                    ></span>
                  </h4>
                </template>
              </va-data-table>
              <br />
            </va-card>
                  </va-card>
                </b-collapse>
                <hr />
              </div>
              <!-- 2 -->
              <div>
                <span>DESIGNATION FOR EXEMPTION</span>
                <button
                  v-if="visibleQualification == false"
                  v-b-toggle.collapse-2
                  type="button"
                  class="float-right btn-fill btn-md"
                >
                  <i class="fa fa-edit"></i>
                </button>
                <button
                  v-if="visibleQualification == true"
                  v-b-toggle.collapse-2
                  type="button"
                  class="float-right btn-fill btn-md"
                >
                  <i class="fa fa-times"></i>
                </button>
                <!-- <div v-for="(item, index) in fivemo  dule" :key="index"></div> -->
                <b-collapse v-model="visibleQualification" class="mt-4" id="collapse-2">
                  <va-card>
                    <div class="row">
                      <div class="ml-4 col-md-10">
                        <vue-form-generator
                          :model="model"
                          :schema="addDesignationSchema"
                          :options="formOptions"
                           ref="addDesignationForm"
                          />
                      </div>
                    </div>
                    <br />
                    <div class="row">
                      <div class="col-10">
                        <button
                          @click="submitDesignation"
                          type="button"
                          class="float-right btn btn-primary btn-fill btn-md"
                        >
                          <i class="fa fa-save" />&nbsp; SAVE
                        </button>
                      </div>
                    </div>
                    <br /><br />
                    <!-- list -->
                    <va-card class="mt-2">
                      <va-data-table
                        :fields="DesignationList"
                        :data="filteredDesignation"
                        :per-page="parseInt(perPage)"
                        :datacount="DesignationCount"
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
                              class="badge badge-primary mr-1"
                              v-on:click="editDesignation(props.rowData)"
                            >
                              <i class="fa fa-edit"></i
                            ></span>
                            <span
                              v-b-tooltip.hover
                              title="delete"
                              class="badge badge-danger mr-1"
                              v-on:click="deleteDesignation(props.rowData)"
                            >
                              <i class="fa fa-trash"></i
                            ></span>
                          </h4>
                        </template>
                      </va-data-table>
                      <br />
                    </va-card>
                  </va-card>
                </b-collapse>
                <hr />
              </div>
              <!-- 3 -->
              <div>
                <span>APPEAL</span>
                <button
                  v-if="visibleAppeal == false"
                  v-b-toggle.collapse-3
                  type="button"
                  class="float-right btn-fill btn-md"
                >
                  <i class="fa fa-edit"></i>
                </button>
                <button
                  v-if="visibleAppeal == true"
                  v-b-toggle.collapse-3
                  type="button"
                  class="float-right btn-fill btn-md"
                >
                  <i class="fa fa-times"></i>
                </button>
                <!-- <div v-for="(item, index) in fivemo  dule" :key="index"></div> -->
                <b-collapse v-model="visibleAppeal" class="mt-4" id="collapse-3">
                  <va-card>
                    <div class="row">
                      <div class="ml-4 col-md-10">
                        <span class="col mt-3 description">APPEAL DAY </span>
                        <input
                          type="text"
                          v-model="model.APPEAL_DAY"
                          placeholder="ENTER APPEAL DAY"
                          class="float-right col-8 form-control form-control-md"
                          @keypress="onlyNumber"
                          required
                        />
                      </div>
                    </div>
                    <br />
                    <div class="row">
                      <div class="col-10">
                        <button
                          @click="submitAppeal"
                          type="button"
                          class="float-right btn btn-primary btn-fill btn-md"
                        >
                          <i class="fa fa-save" />&nbsp; SAVE
                        </button>
                      </div>
                    </div>
                    <br /><br />
                  </va-card>
                </b-collapse>
                <hr />
              </div>
              <!-- 5 -->
              <div>
                <span>CONSULTANT TYPE</span>
                <button
                  v-if="visibleConsultantType == false"
                  v-b-toggle.collapse-4
                  type="button"
                  class="float-right btn-fill btn-md"
                >
                  <i class="fa fa-edit"></i>
                </button>
                <button
                  v-if="visibleConsultantType == true"
                  v-b-toggle.collapse-4
                  type="button"
                  class="float-right btn-fill btn-md"
                >
                  <i class="fa fa-times"></i>
                </button>
                <!-- <div v-for="(item, index) in fivemo  dule" :key="index"></div> -->
                <b-collapse v-model="visibleConsultantType" class="mt-4" id="collapse-4">
                  <va-card>
                    <div class="row">
                      <div class="ml-4 col-md-10">
                         <vue-form-generator
                          :model="model"
                          :schema="addConsultantTypeSchema"
                          :options="formOptions"
                           ref="addConsultantTypeForm"
                          />
                      </div>
                    </div>
                    <br />
                    <div class="row">
                      <div class="col-10">
                        <button
                          @click="submitConsType"
                          type="button"
                          class="float-right btn btn-primary btn-fill btn-md"
                        >
                          <i class="fa fa-save" />&nbsp; SAVE
                        </button>
                      </div>
                    </div>
                    <br /><br />
                    <!-- list -->
                    <va-card class="mt-2">
                      <va-data-table
                        :fields="ConsultantList"
                        :data="filteredConsultant"
                        :per-page="parseInt(perPage)"
                        :datacount="ConsultantCount"
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
                              class="badge badge-primary mr-1"
                              v-on:click="editConsultantType(props.rowData)"
                            >
                              <i class="fa fa-edit"></i
                            ></span>
                            <span
                              v-b-tooltip.hover
                              title="delete"
                              class="badge badge-danger mr-1"
                              v-on:click="deleteConsultantType(props.rowData)"
                            >
                              <i class="fa fa-trash"></i
                            ></span>
                          </h4>
                        </template>
                      </va-data-table>
                      <br />
                    </va-card>
                  </va-card>
                </b-collapse>
                <hr />
              </div>
              <!-- 7 -->
              <div>
                <span>BULK UPLOAD FOR RENEWAL (TERMINATION LIST)</span>
                <toggle-button
                    class="float-right"
                    @change="onToggleChange1($event)"
                    v-model="model.BULK_STATUS"
                    :sync="true"
                    :labels="{ checked: 'ON', uncheked: 'OFF' }"
                />
                <hr />
              </div>
              <!-- 8 -->
              <div>
                <span>BANKRUPTCY CHECK</span>
                <button
                  v-if="visibleBankruptcyCheck == false"
                  v-b-toggle.collapse-5
                  type="button"
                  class="float-right btn-fill btn-md"
                >
                  <i class="fa fa-edit"></i>
                </button>
                <button
                  v-if="visibleBankruptcyCheck == true"
                  v-b-toggle.collapse-5
                  type="button"
                  class="float-right btn-fill btn-md"
                >
                  <i class="fa fa-times"></i>
                </button>
                <!-- <div v-for="(item, index) in fivemo  dule" :key="index"></div> -->
                <b-collapse v-model="visibleBankruptcyCheck" class="mt-4" id="collapse-5">
                  <va-card>
                    <div class="row">
                      <div class="ml-4 col-md-10">
                        <span class="col mt-3 description">DAYS</span>
                        <input
                          type="text"
                          v-model="model.BANKRUPTCY_DAY"
                          placeholder="ENTER DAYS"
                          class="float-right col-8 form-control form-control-md"
                          @keypress="onlyNumber"
                           required
                        />
                      </div>
                    </div>
                    <br />
                    <div class="row">
                      <div class="col-10">
                        <button
                          @click="submitBankruptcy"
                          type="button"
                          class="float-right btn btn-primary btn-fill btn-md"
                        >
                          <i class="fa fa-save" />&nbsp; SAVE
                        </button>
                      </div>
                    </div>
                    <br /><br />
                  </va-card>
                </b-collapse>
                <hr />
              </div>
              <!-- 9 -->
               <div>
                <span>EXAMINATION APPEAL</span>
                <button
                  v-if="visibleExaminationAppeal == false"
                  v-b-toggle.collapse-6
                  type="button"
                  class="float-right btn-fill btn-md"
                >
                  <i class="fa fa-edit"></i>
                </button>
                <button
                  v-if="visibleExaminationAppeal == true"
                  v-b-toggle.collapse-6
                  type="button"
                  class="float-right btn-fill btn-md"
                >
                  <i class="fa fa-times"></i>
                </button>
                <!-- <div v-for="(item, index) in fivemo  dule" :key="index"></div> -->
                <b-collapse v-model="visibleExaminationAppeal" class="mt-4" id="collapse-6">
                  <va-card>
                    <div class="row">
                      <div class="ml-4 col-md-10">
                        <span class="col mt-3 description">DAYS </span>
                        <input
                          type="text"
                          v-model="model.EXAM_APPEAL_DAY"
                          placeholder="ENTER EXAM APPEAL DAY"
                          class="float-right col-8 form-control form-control-md"
                          @keypress="onlyNumber"
                          required
                        />
                      </div>
                    </div>
                    <br />
                    <div class="row">
                      <div class="col-10">
                        <button
                          @click="submitExamAppeal"
                          type="button"
                          class="float-right btn btn-primary btn-fill btn-md"
                        >
                          <i class="fa fa-save" />&nbsp; SAVE
                        </button>
                      </div>
                    </div>
                    <br /><br />
                  </va-card>
                </b-collapse>
                <hr />
              </div>
              <!-- 10 -->
                <div>
            <span>PRS FAMILIARISATION PROGRAM</span>
            <button
              @click="prs_familirisation"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>

              <!-- 11 -->
             <div>
                <span>ACTIVE CEILLI LICENSE</span>
                <button
                  v-if="visibleCeilliLicense == false"
                  v-b-toggle.collapse-9
                  type="button"
                  class="float-right btn-fill btn-md"
                >
                  <i class="fa fa-edit"></i>
                </button>
                <button
                  v-if="visibleCeilliLicense == true"
                  v-b-toggle.collapse-9
                  type="button"
                  class="float-right btn-fill btn-md"
                >
                  <i class="fa fa-times"></i>
                </button>
                <!-- <div v-for="(item, index) in fivemo  dule" :key="index"></div> -->
                <b-collapse v-model="visibleCeilliLicense" class="mt-4" id="collapse-9">
                  <va-card>
                    <div class="row">
                      <div class="ml-4 col-md-10">
                        <span class="col mt-3 description">START DATE </span>
                        <datepicker
                              :value="term"
                              @input="searchDate"
                              placeholder="dd-MM-yyyy"
                              format="dd MMM yyyy"
                              input-class="form-control float-right bgcolor col-8"
                              v-model="model.ACTIVE_CEILLI_START_DATE"
                              :typeable="false" 
                            ></datepicker>
                      </div>
                    </div>
                    <div class="row">
                      <div class="ml-4 col-md-10">
                        <span class="col mt-3 description">END DATE </span>
                        <datepicker
                              :value="term"
                              @input="searchDate"
                              placeholder="dd-MM-yyyy"
                              format="dd MMM yyyy"
                              input-class="form-control float-right bgcolor col-8"
                              v-model="model.ACTIVE_CEILLI_END_DATE"
                              :typeable="false"
                            ></datepicker>
                      </div>
                    </div>
                     <div class="row">
                      <div class="ml-4 col-md-10">
                        <span class="col mt-3 description">EFFECTIVE DATE </span>
                        <datepicker
                              :value="term"
                              @input="searchDate"
                              placeholder="dd-MM-yyyy"
                              format="dd MMM yyyy"
                              input-class="form-control float-right bgcolor col-8"
                              v-model="model.ACTIVE_CEILLI_EFFECTIVE_DATE"
                              :typeable="false"
                            ></datepicker>
                      </div>
                    </div>
                    <br />
                    <div class="row">
                      <div class="col-10">
                        <button
                          @click="submitActiveCeilli"
                          type="button"
                          class="float-right btn btn-primary btn-fill btn-md"
                        >
                          <i class="fa fa-save" />&nbsp; SAVE
                        </button>
                      </div>
                    </div>
                    <br /><br />
                  </va-card>
                </b-collapse>
                <hr />
              </div>

     <!-- ----Exam Type ---- -->
              <div>
                <span>EXAMINATION TYPE</span>
                <button
                  v-if="visibleExamType == false"
                  v-b-toggle.collapse-10
                  type="button"
                  class="float-right btn-fill btn-md"
                >
                  <i class="fa fa-edit"></i>
                </button>
                <button
                  v-if="visibleExamType == true"
                  v-b-toggle.collapse-10
                  type="button"
                  class="float-right btn-fill btn-md"
                >
                  <i class="fa fa-times"></i>
                </button>
                <!-- <div v-for="(item, index) in fivemo  dule" :key="index"></div> -->
                <b-collapse v-model="visibleExamType" class="mt-4" id="collapse-10">
                  <va-card>
                    <div class="row">
                      <div class="ml-4 col-md-10">
                         <vue-form-generator
                          :model="model"
                          :schema="addExamTypeSchema"
                          :options="formOptions"
                           ref="addExamTypeForm"
                          />

                          
                      </div>
                    </div>
                    <br />
                    <div class="row">
                      <div class="col-10">
                        <button
                          @click="submitExamType"
                          type="button"
                          class="float-right btn btn-primary btn-fill btn-md"
                        >
                          <i class="fa fa-save" />&nbsp; SAVE
                        </button>
                      </div>
                    </div>
                    <br /><br />
                    <!-- list -->
                    <va-card class="mt-2">
                      <va-data-table
                        :fields="ExamTypeList"
                        :data="filteredExamType"
                        :per-page="parseInt(perPage)"
                        :datacount="ExamTypeCount"
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
                              class="badge badge-primary mr-1"
                              v-on:click="editExamType(props.rowData)"
                            >
                              <i class="fa fa-edit"></i
                            ></span>
                            <span
                              v-b-tooltip.hover
                              title="delete"
                              class="badge badge-danger mr-1"
                              v-on:click="deleteExamType(props.rowData)"
                            >
                              <i class="fa fa-trash"></i
                            ></span>
                          </h4>
                        </template>
                      </va-data-table>
                      <br />
                    </va-card>
                  </va-card>
                </b-collapse>
                <hr />
              </div>

      <!-- ----- Exam Session ---- -->
      <div>
                <span>EXAMINATION SESSION</span>
                <button
                  v-if="visibleExamSession == false"
                  v-b-toggle.collapse-11
                  type="button"
                  class="float-right btn-fill btn-md"
                >
                  <i class="fa fa-edit"></i>
                </button>
                <button
                  v-if="visibleExamSession == true"
                  v-b-toggle.collapse-11
                  type="button"
                  class="float-right btn-fill btn-md"
                >
                  <i class="fa fa-times"></i>
                </button>
                <!-- <div v-for="(item, index) in fivemo  dule" :key="index"></div> -->
                <b-collapse v-model="visibleExamSession" class="mt-4" id="collapse-11">
                  <va-card>
                    <div class="row">
                      <div class="ml-4 col-md-10">
                        <span class="col mt-3 description">DAYS</span>
                        <input
                          type="text"
                          v-model="model.EXAM_SESSION_DAYS"
                          placeholder="ENTER DAYS"
                          class="float-right col-8 form-control form-control-md"
                          @keypress="onlyNumber"
                          required
                        />
                      </div>
                    </div>
                    <br />
                    <div class="row">
                      <div class="col-10">
                        <button
                          @click="submitExamSession"
                          type="button"
                          class="float-right btn btn-primary btn-fill btn-md"
                        >
                          <i class="fa fa-save" />&nbsp; SAVE
                        </button>
                      </div>
                    </div>
                    <br /><br />
                  </va-card>
                </b-collapse>
                <hr />
              </div>

      <!-- Type of Application -->
               <div>
                <span>FILTER FOR TYPE OF APPLICATION</span>
                <button
                  v-if="visbleTypeAppl == false"
                  v-b-toggle.collapse-12
                  type="button"
                  class="float-right btn-fill btn-md"
                >
                  <i class="fa fa-edit"></i>
                </button>
                <button
                  v-if="visbleTypeAppl == true"
                  v-b-toggle.collapse-12
                  type="button"
                  class="float-right btn-fill btn-md"
                >
                  <i class="fa fa-times"></i>
                </button>
                <!-- <div v-for="(item, index) in fivemo  dule" :key="index"></div> -->
                <b-collapse v-model="visbleTypeAppl" class="mt-4" id="collapse-12">
                  <va-card>
                    <div class="row">
                      <div class="ml-4 col-md-10">
                          <vue-form-generator
                          :model="model"
                          :schema="addApplicationTypeSchema"
                          :options="formOptions"
                           ref="addAppTypeForm"
                          />
                      </div>
                    </div>
                    <br />
                    <div class="row">
                      <div class="col-10">
                        <button
                          @click="submitTypeAppl"
                          type="button"
                          class="float-right btn btn-primary btn-fill btn-md"
                        >
                          <i class="fa fa-save" />&nbsp; SAVE
                        </button>
                      </div>
                    </div>
                    <br /><br />
                    <br /><br />
                    <!-- list -->
                    <va-card class="mt-2">
                      <va-data-table
                        :fields="TypeApplList"
                        :data="filteredTypeAppl"
                        :per-page="parseInt(perPage)"
                        :datacount="TypeApplCount"
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
                              class="badge badge-primary mr-1"
                              v-on:click="editTypeAppl(props.rowData)"
                            >
                              <i class="fa fa-edit"></i
                            ></span>
                            <span
                              v-b-tooltip.hover
                              title="edit"
                              class="badge badge-danger mr-1"
                              v-on:click="deleteTypeAppl(props.rowData)"
                            >
                              <i class="fa fa-trash"></i
                            ></span>
                          </h4>
                        </template>
                      </va-data-table>
                      <br />
                    </va-card>
                  </va-card>
                </b-collapse>
                <hr />
              </div>

      <!-- Termination Type  -->
    <div>
                <span>TERMINATION TYPE</span>
                <button
                  v-if="visibleTermination == false"
                  v-b-toggle.collapse-13
                  type="button"
                  class="float-right btn-fill btn-md"
                >
                  <i class="fa fa-edit"></i>
                </button>
                <button
                  v-if="visibleTermination == true"
                  v-b-toggle.collapse-13
                  type="button"
                  class="float-right btn-fill btn-md"
                >
                  <i class="fa fa-times"></i>
                </button>
                <!-- <div v-for="(item, index) in fivemo  dule" :key="index"></div> -->
                <b-collapse v-model="visibleTermination" class="mt-4" id="collapse-13">
                  <va-card>
                    <div class="row">
                      <div class="ml-4 col-md-10">
                        <vue-form-generator
                        :model="model"
                        :schema="addTerminationTypeSchema"
                        :options="formOptions"
                        ref="addTerminationTypeForm"
                        />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-10">
                        <button
                          @click="submitTermination"
                          type="button"
                          class="float-right btn btn-primary btn-fill btn-md"
                        >
                          <i class="fa fa-save" />&nbsp; SAVE
                        </button>
                      </div>
                    </div>
                    <br /><br />
                    <br /><br />
                    <!-- list -->
                    <va-card class="mt-2">
                      <va-data-table
                        :fields="TerminationList"
                        :data="filteredTermination"
                        :per-page="parseInt(perPage)"
                        :datacount="TerminationCount"
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
                              class="badge badge-primary mr-1"
                              v-on:click="editTermination(props.rowData)"
                            >
                              <i class="fa fa-edit"></i
                            ></span>
                            <span
                              v-b-tooltip.hover
                              title="delete"
                              class="badge badge-danger mr-1"
                              v-on:click="deleteTermination(props.rowData)"
                            >
                              <i class="fa fa-trash"></i
                            ></span>
                          </h4>
                        </template>
                      </va-data-table>
                      <br />
                    </va-card>
                  </va-card>
                </b-collapse>
                <hr />
              </div>

        <!-- Consultant Renewal Date  -->
        <div>
                <span>CONSULTANT RENEWAL DATE</span>
                <button
                  v-if="visibleRenewal == false"
                  v-b-toggle.collapse-14
                  type="button"
                  class="float-right btn-fill btn-md"
                >
                  <i class="fa fa-edit"></i>
                </button>
                <button
                  v-if="visibleRenewal == true"
                  v-b-toggle.collapse-14
                  type="button"
                  class="float-right btn-fill btn-md"
                >
                  <i class="fa fa-times"></i>
                </button>
                <!-- <div v-for="(item, index) in fivemo  dule" :key="index"></div> -->
                <b-collapse v-model="visibleRenewal" class="mt-4" id="collapse-14">
                  <va-card>
                    <div class="row">
                      <div class="ml-4 col-md-10">
                        <span class="col mt-3 description">START DATE </span>
                        <datepicker
                              :value="term"
                              @input="searchDate"
                              placeholder="dd-MM-yyyy"
                              format="dd MMM yyyy"
                              input-class="form-control float-right bgcolor col-8"
                              v-model="model.CONSULTANT_RENEWAL_START_DATE"
                              :typeable="false"
                            ></datepicker>
                      </div>
                    </div>
                    <div class="row">
                      <div class="ml-4 col-md-10">
                        <span class="col mt-3 description">END DATE </span>
                        <datepicker
                              :value="term"
                              @input="searchDate"
                              placeholder="dd-MM-yyyy"
                              format="dd MMM yyyy"
                              input-class="form-control float-right bgcolor col-8"
                              v-model="model.CONSULTANT_RENEWAL_END_DATE"
                              :typeable="false"
                            ></datepicker>
                      </div>
                    </div>
                    <br />
                     <div class="row">
              <div class="ml-4 col-md-10">
                <span class="col mt-3 description">RENEWAL YEAR <span class="star"> * </span></span>
                <input
                  type="text"
                  v-model="model.CONSULTANT_RENEWAL_YEAR"
                  placeholder="ENTER RENEWAL YEAR"
                  class="float-right col-8 form-control form-control-md"
                  @keypress="onlyNumber"
                   required
                />
              </div>
            </div>
            <br>
                    <div class="row">
                      <div class="col-10">
                        <button
                          @click="submitRenewalDate"
                          type="button"
                          class="float-right btn btn-primary btn-fill btn-md"
                        >
                          <i class="fa fa-save" />&nbsp; SAVE
                        </button>
                      </div>
                    </div>
                    <br /><br />
                  </va-card>
                </b-collapse>
                <hr />
              </div>

            <div>
            <span>DECLARATION</span>
            <button
              @click="consultant_declaration"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>

            </div>

            <!-- --- vudal --- -->
              <!-- Qualification -->
            <vudal name="simpleModalEditQualification" class="widthModal">
              <div class="header">
                EDIT QUALIFICATION<i class="close icon">&times;</i>
              </div>
              <div class="content">
                <vue-form-generator
                  :model="model"
                  :schema="editQualficationSchema"
                  :options="formOptions"
                />
              </div>
              <div class="actions">
                <button
                  type="button"
                  class="cancel vudal-btn mr-2 btn btn-danger btn-fill btn-md"
                >
                  <i class="fa fa-times" /> &nbsp; CLOSE
                </button>
                <button
                  @click="updateQualificationAPI"
                  type="button"
                  class="cancel vudal-btn mr-2 btn btn-primary btn-fill btn-md"
                >
                  <i class="fa fa-edit" /> &nbsp; UPDATE
                </button>
              </div>
            </vudal>
            <!-- Designation -->
            <vudal name="simpleModalEditDesignation" class="widthModal">
              <div class="header">
                EDIT DESIGNATION<i class="close icon">&times;</i>
              </div>
              <div class="content">
                <vue-form-generator
                  :model="model"
                  :schema="editDesignationSchema"
                  :options="formOptions"
                />
              </div>
              <div class="actions">
                <button
                  type="button"
                  class="cancel vudal-btn mr-2 btn btn-danger btn-fill btn-md"
                >
                  <i class="fa fa-times" /> &nbsp; CLOSE
                </button>
                <button
                  @click="updateDesignationAPI"
                  type="button"
                  class="cancel vudal-btn mr-2 btn btn-primary btn-fill btn-md"
                >
                  <i class="fa fa-edit" /> &nbsp; UPDATE
                </button>
              </div>
            </vudal>

            <!-- Consultant Type -->
            <vudal name="simpleModalConsultantType" class="widthModal">
              <div class="header">
                EDIT DESIGNATION<i class="close icon">&times;</i>
              </div>
              <div class="content">
                <vue-form-generator
                  :model="model"
                  :schema="editConsTypeSchema"
                  :options="formOptions"
                />
              </div>
              <div class="actions">
                <button
                  type="button"
                  class="cancel vudal-btn mr-2 btn btn-danger btn-fill btn-md"
                >
                  <i class="fa fa-times" /> &nbsp; CLOSE
                </button>
                <button
                  @click="updateConsultantAPI"
                  type="button"
                  class="cancel vudal-btn mr-2 btn btn-primary btn-fill btn-md"
                >
                  <i class="fa fa-edit" /> &nbsp; UPDATE
                </button>
              </div>
            </vudal>
            <!-- Exam Type -->
            <vudal name="simpleModalEditExamType" class="widthModal">
              <div class="header">
                EDIT EXAMINATION TYPE<i class="close icon">&times;</i>
              </div>
              <div class="content">
                <vue-form-generator
                  :model="model"
                  :schema="editExamTypeSchema"
                  :options="formOptions"
                />
              </div>
              <div class="actions">
                <button
                  type="button"
                  class="cancel vudal-btn mr-2 btn btn-danger btn-fill btn-md"
                >
                  <i class="fa fa-times" /> &nbsp; CLOSE
                </button>
                <button
                  @click="updateExamAPI"
                  type="button"
                  class="cancel vudal-btn mr-2 btn btn-primary btn-fill btn-md"
                >
                  <i class="fa fa-edit" /> &nbsp; UPDATE
                </button>
              </div>
            </vudal>

            <!-- Type of Application  -->
            <vudal name="simpleModalEditTypeApplication" class="widthModal">
              <div class="header">
                EDIT FILTER FOR TYPE OF APPLICATION<i class="close icon">&times;</i>
              </div>
              <div class="content">
                <vue-form-generator
                  :model="model"
                  :schema="editTypeApplSchema"
                  :options="formOptions"
                />
              </div>
              <div class="actions">
                <button
                  type="button"
                  class="cancel vudal-btn mr-2 btn btn-danger btn-fill btn-md"
                >
                  <i class="fa fa-times" /> &nbsp; CLOSE
                </button>
                <button
                  @click="updateTypeApplAPI"
                  type="button"
                  class="cancel vudal-btn mr-2 btn btn-primary btn-fill btn-md"
                >
                  <i class="fa fa-edit" /> &nbsp; UPDATE
                </button>
              </div>
            </vudal>

            <!-- Termination Type  -->
            <vudal name="simpleModalEditTermination" class="widthModal">
              <div class="header">
                EDIT TERMINATION TYPE<i class="close icon">&times;</i>
              </div>
              <div class="content">
                <vue-form-generator
                  :model="model"
                  :schema="editTerminationSchema"
                  :options="formOptions"
                />
              </div>
              <div class="actions">
                <button
                  type="button"
                  class="cancel vudal-btn mr-2 btn btn-danger btn-fill btn-md"
                >
                  <i class="fa fa-times" /> &nbsp; CLOSE
                </button>
                <button
                  @click="updateTerminationAPI"
                  type="button"
                  class="cancel vudal-btn mr-2 btn btn-primary btn-fill btn-md"
                >
                  <i class="fa fa-edit" /> &nbsp; UPDATE
                </button>
              </div>
            </vudal>

        
<button
          @click="back"
          type="button"
          class="btn btn-primary btn-fill btn-md"
        >
          <i class="fa fa-step-backward" /> &nbsp; Previous
        </button>
          </va-card>

   
</template>

<script>
// eslint-disable-next-line no-unused-vars
import Vue from "vue";
import "vue-form-generator/dist/vfg.css";
import Vudal from "vudal";
import * as servicesModule0 from "../../../app/module0/services02";
Vue.component("field-vfg-functional-date", VfgFunctionalDate);
import VfgFunctionalDate from "../../component/VfgFunctionalCalendar.vue"
import FullCalendar from "@fullcalendar/vue";
import moment from "moment";



export default {
  mounted() {
    this.getAllConsultantTypeForExam();
    this.getAllConsultantType();
    this.getAllQualification();
    this.getAllDesignation();
    this.getAllAppealDay();
    
    this.getAllBankruptcyCheck();
    this.getAllExamAppeal();
    this.getAllPRS();
    this.getAllActiveCeilli();
    this.getAllExamType();
    this.getAllExamSession();
    this.getAllTypeAppl();
    this.getAllTermination();
    this.getAllRenewalDate();
    this.getAllBulkUpload();
  },
  components: {
    FullCalendar,
    Vudal,
  },
  // DATA SCHEMA
  data() {
    return {
      term: null,
    
      BULK_ID: '',
      visibleLogin: false,
      visibleQualification: false,
      visibleDesignation: false,
      visibleAppeal: false,
      visibleConsultantType: false,
      visibleBulkUpload: false,
      visibleBankruptcyCheck: false,
      visibleExaminationAppeal: false,
      visiblePRSFamiliarization: false,
      visibleCeilliLicense: false,
      visibleExamType: false,
      visibleExamSession: false,
      visbleTypeAppl: false,
      visibleTermination: false,
      visibleRenewal: false,

      qualificationList: [],
      QualificationCount: null,
      designationList: [],
      DesignationCount: null,
      consultantTypeList: [],
      ConsultantCount: null,
      examTypeList:[],
      ExamTypeCount: null,
      typeApplList:[],
      TypeApplCount: null,
      terminationList: [],
      TerminationCount: null,
      consultantType: [],

       perPage:10,


      model: {
        BULK_STATUS: true,
        QUAL_NAME: "",
        EXEM_NAME: '',
        APPEAL_DAY: '',
        TYPE_NAME: '',
        BANKRUPTCY_DAY:'',
        EXAM_APPEAL_DAY: '',
        CONSULTANT_PRS_START_DATE: '',
        CONSULTANT_PRS_END_DATE: '',
        ACTIVE_CEILLI_START_DATE:'',
        ACTIVE_CEILLI_END_DATE: '',
        ACTIVE_CEILLI_EFFECTIVE_DATE: '',
        EXAM_TYPE_NAME: '',
        EXAM_TYPE_DESC: '',
        CONSULTANT_TYPE_ID: '',
        EXAM_SESSION_DAYS: '',
        TYPE_OF_APPLICATION_NAME: '',
        TERMINATION_TYPE_STATUS: '',
        TERMINATION_TYPE_REASON: '',
        TERMINATION_TYPE_DESCRIPTION: '',
        CONSULTANT_RENEWAL_START_DATE: '',
        CONSULTANT_RENEWAL_END_DATE: '',
         	CONSULTANT_RENEWAL_YEAR: "",
        editQual: {
          QUAL_NAME: "",
        },
        editDesign: {
          EXEM_NAME: "",
        },
        editCons: {
          TYPE_NAME: "",
        },
        editExamType: {
          EXAM_TYPE_NAME: "",
           EXAM_TYPE_DESC: '',
           CONSULTANT_TYPE_ID: '',
        },
        editTypeAppl: {
          TYPE_OF_APPLICATION_NAME: "",
        },
        editTermination: {
          TERMINATION_TYPE_STATUS: '',
        TERMINATION_TYPE_REASON: '',
        TERMINATION_TYPE_DESCRIPTION: '',
        },
      },
      addQualficationSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "input",
                inputType: "Text",
                model: "QUAL_NAME",
                label: "QUALIFICATION",
                placeholder: "ENTER MODULE NAME",
                styleClasses: "col-md-12 consultant-form",
                required: true,
                validator: "required",
              },
            ],
          },
        ],
      },

      editQualficationSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "input",
                inputType: "Text",
                model: "editQual.QUAL_NAME",
                label: "QUALIFICATION ",
                placeholder: "ENTER QUALIFICATION",
                styleClasses: "col-md-12",
                required: true,
                validator: "required",
              },
            ],
          },
        ],
      },
      addDesignationSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "input",
                inputType: "Text",
                model: "EXEM_NAME",
                label: "DESIGNATION ",
                placeholder: "ENTER DESIGNATION",
                styleClasses: "col-md-12 consultant-form",
                required: true,
                validator: "required",
              },
            ],
          },
        ],
      },
      editDesignationSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "input",
                inputType: "Text",
                model: "editDesign.EXEM_NAME",
                label: "DESIGNATION ",
                placeholder: "ENTER DESIGNATION",
                styleClasses: "col-md-12",
                required: true,
                validator: "required",
              },
            ],
          },
        ],
      },
      addConsultantTypeSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "input",
                inputType: "Text",
                model: "TYPE_NAME",
                label: "CONSULTANT TYPE ",
                placeholder: "ENTER TYPE",
                styleClasses: "col-md-12 consultant-form",
                required: true,
                validator: "required",
              },
            ],
          },
        ],
      },
      editConsTypeSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "input",
                inputType: "Text",
                model: "editCons.TYPE_NAME",
                label: "CONSULTANT TYPE ",
                placeholder: "ENTER TYPE",
                styleClasses: "col-md-12",
              },
            ],
          },
        ],
      },
       addExamTypeSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
               type: "vueMultiSelect",
                inputType: "Text",
                model: "CONSULTANT_TYPE_ID",
                label: "CONSULTANT TYPE",
                placeholder: "ENTER CONSULTANT TYPE",
                styleClasses: "col-md-12 consultant-form",
                 required: true,
                 validator: "required",
                selectOptions: {
                  multiple: false,
                  key: "CONSULTANT_TYPE_ID",
                  label: "TYPE_NAME",
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.consultantType;
                },
              },
              {
                type: "input",
                inputType: "Text",
                model: "EXAM_TYPE_NAME",
                label: "EXAM TYPE ",
                placeholder: "ENTER TYPE",
                styleClasses: "col-md-12 consultant-form",
                required: true,
                validator: "required",
              },
              {
               type: "input",
                inputType: "Text",
                model: "EXAM_TYPE_DESC",
                label: "EXAM TYPE DESC",
                placeholder: "ENTER FULL NAME",
                styleClasses: "col-md-12 consultant-form",
                required: true,
                validator: "required",
              }
              
            ],
          },
        ],
      },
      editExamTypeSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
               {
               type: "vueMultiSelect",
                inputType: "Text",
                model: "editExamType.CONSULTANT_TYPE_ID",
                label: "CONSULTANT TYPE",
                placeholder: "ENTER CONSULTANT TYPE",
                styleClasses: "col-md-12",
                 required: true,
                 validator: "required",
                selectOptions: {
                  multiple: false,
                  key: "CONSULTANT_TYPE_ID",
                  label: "TYPE_NAME",
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.consultantType;
                },
              },
              {
                type: "input",
                inputType: "Text",
                model: "editExamType.EXAM_TYPE_NAME",
                label: "EXAM TYPE ",
                placeholder: "ENTER TYPE",
                styleClasses: "col-md-12",
                required: true,
                validator: "required",
              },
               {
               type: "input",
                inputType: "Text",
                model: "editExamType.EXAM_TYPE_DESC",
                label: "EXAM TYPE DESC",
                placeholder: "ENTER FULL NAME",
                styleClasses: "col-md-12",
                required: true,
                validator: "required",
              }
            ],
          },
        ],
      },
       addApplicationTypeSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "input",
                inputType: "Text",
                model: "TYPE_OF_APPLICATION_NAME",
                label: "TYPE OF APPLICATION ",
                placeholder: "ENTER TYPE",
                styleClasses: "col-md-12 consultant-form",
                required: true,
                validator: "required",
              },
            ],
          },
        ],
      },
      editTypeApplSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "input",
                inputType: "Text",
                model: "editTypeAppl.TYPE_OF_APPLICATION_NAME",
                label: "TYPE OF APPLICATION ",
                placeholder: "ENTER NAME",
                styleClasses: "col-md-12",
                required: true,
                validator: "required",
              },
            ],
          },
        ],
      },
      addTerminationTypeSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "input",
                inputType: "Text",
                model: "TERMINATION_TYPE_STATUS",
                label: "STATUS ",
                placeholder: "ENTER STATUS",
                styleClasses: "col-md-12 consultant-form",
                required: true,
                validator: "required",
              },
              {
                type: "input",
                inputType: "Text",
                model: "TERMINATION_TYPE_REASON",
                label: "REASON ",
                placeholder: "ENTER REASON",
                styleClasses: "col-md-12 consultant-form",
              },
              {
                type: "input",
                inputType: "Text",
                model: "TERMINATION_TYPE_DESCRIPTION",
                label: "DESCRIPTION",
                placeholder: "ENTER DESCRIPTION",
                styleClasses: "col-md-12 consultant-form",
                required: true,
                validator: "required",
              },
            ],
          },
        ],
      },
      editTerminationSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "input",
                inputType: "Text",
                model: "editTermination.TERMINATION_TYPE_STATUS",
                label: "STATUS ",
                placeholder: "ENTER STATUS",
                styleClasses: "col-md-12",
                required: true,
                validator: "required",
              },
              {
                type: "input",
                inputType: "Text",
                model: "editTermination.TERMINATION_TYPE_REASON",
                label: "REASON ",
                placeholder: "ENTER REASON",
                styleClasses: "col-md-12",
              },
              {
                type: "input",
                inputType: "Text",
                model: "editTermination.TERMINATION_TYPE_DESCRIPTION",
                label: "DESCRIPTION",
                placeholder: "ENTER DESCRIPTION",
                styleClasses: "col-md-12",
                required: true,
                validator: "required",
              },
            ],
          },
        ],
      },

      formOptions: {
        validateAfterChanged: true,
      },
    };
  },
  methods: {
    back() {
      this.$router.push("/fimm/bymodule-list");
    },
    async onToggleChange1(event){
      console.log("Toggle=",event);
        let value = event.value;
      console.log("Value",value);
      if(value == false)
      {
        this.model.BULK_STATUS=false;
        const data = new FormData();
        data.append("BULK_STATUS", 0);
        data.append("BULK_ID", this.BULK_ID);
        const response = await servicesModule0.updateBulkUpdateTermination(data);
        this.getAllBulkUpload();
      }
      else{
        this.model.BULK_STATUS=true;
        const data = new FormData();
        data.append("BULK_STATUS", 1);
        data.append("BULK_ID", this.BULK_ID);
        const response = await servicesModule0.updateBulkUpdateTermination(data);
        this.getAllBulkUpload();

      } 
     

    },
    searchDate(date) {
      this.term = moment(date).format("DD MMM y");
             var startdate= moment(this.model.ACTIVE_CEILLI_START_DATE).unix();
              var enddate= moment(this.model.ACTIVE_CEILLI_END_DATE).unix();
              if(startdate > enddate)
              {
                 alert("Start Date Cannot Bigger Than End Date");
              //this.model.ACTIVE_CEILLI_START_DATE="";
              // this.model.modelAdd.CALENDAR_DATE_END="";
              }
              var startdate_renewal= moment(this.model.CONSULTANT_RENEWAL_START_DATE).unix();
              var enddate_renewal= moment(this.model.CONSULTANT_RENEWAL_END_DATE).unix();
              if(startdate_renewal > enddate_renewal)
              {
                 alert("Start Date Cannot Bigger Than End Date");
              }
    },
     consultant_declaration() {
      this.$router.push("/fimm/consultant_declaration");
    },
     prs_familirisation() {
      this.$router.push("/fimm/prs_familirisation_program");
    },
      onlyNumber ($event) {
        let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
        if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) { // 46 is dot
        $event.preventDefault();
        }
      },
     

    //---------QUALIFICATION

    getAllQualification: async function () {
      const response = await servicesModule0.getAllQualificationList();
      this.qualificationList = response;
      this.QualificationCount = this.qualificationList.length;
    },

    async submit() {
      if (this.$refs.addqualificationForm.validate()) {
        let app = this;
        var param = app.model;
        const data = new FormData();
        data.append("QUAL_NAME", this.model.QUAL_NAME);
        try {
          // eslint-disable-next-line no-unused-vars
          const response = await servicesModule0.createQualification(data);
          this.getAllQualification();
          // this.$modals.simpleModal.$hide()
          this.model.QUAL_NAME="";
        } catch (error) {
          console.log(error);
        }
      }
    },

    async editQualification(data) {
      const response = await servicesModule0.getQualificationById(
        data.CONSULTANT_QUALIFICATION_ID
      );
      this.$modals.simpleModalEditQualification.$show();
      this.CONSULTANT_QUALIFICATION_ID = response.CONSULTANT_QUALIFICATION_ID;
      this.model.editQual = response;
      console.log(response);
    },

    async updateQualificationAPI() {
      try {
        const data = new FormData();
        data.append(
          "CONSULTANT_QUALIFICATION_ID",
          this.CONSULTANT_QUALIFICATION_ID
        );
        data.append("QUAL_NAME", this.model.editQual.QUAL_NAME);
        const response = await servicesModule0.updateQualification(data);
        this.getAllQualification();
      } catch (error) {
        console.log(error);
      }
    },

    async deleteQualification(data) {
      if (confirm("Are you sure you want to delete?")){
      // eslint-disable-next-line no-unused-vars
      const response = await servicesModule0.deleteQualification(
        data.CONSULTANT_QUALIFICATION_ID
      );
      this.getAllQualification();
      }
    },

    //---------- Designation 

    getAllDesignation: async function () {
      const response = await servicesModule0.getAllDesignationList();
      this.designationList = response;
      this.DesignationCount = this.designationList.length;
    },

    async submitDesignation() {
      if (this.$refs.addDesignationForm.validate()) {
        let app = this;
        var param = app.model;
        const data = new FormData();
        data.append("EXEM_NAME", this.model.EXEM_NAME);
        try {
          // eslint-disable-next-line no-unused-vars
          const response = await servicesModule0.createDesignation(data);
          this.getAllDesignation();
          this.model.EXEM_NAME="";
          // this.$modals.simpleModal.$hide()
        } catch (error) {
          console.log(error);
        }
      }
    },

    async editDesignation(data) {
      const response = await servicesModule0.getDesignationById(
        data.CONSULTANT_DESIGNATION_EXEMPTION_ID
      );
      this.$modals.simpleModalEditDesignation.$show();
      this.CONSULTANT_DESIGNATION_EXEMPTION_ID = response.CONSULTANT_DESIGNATION_EXEMPTION_ID;
      this.model.editDesign = response;
      console.log(response);
    },

    async updateDesignationAPI() {
      try {
        const data = new FormData();
        data.append(
          "CONSULTANT_DESIGNATION_EXEMPTION_ID",
          this.CONSULTANT_DESIGNATION_EXEMPTION_ID
        );
        data.append("EXEM_NAME", this.model.editDesign.EXEM_NAME);
        const response = await servicesModule0.updateDesignation(data);
        this.getAllDesignation();
      } catch (error) {
        console.log(error);
      }
    },

    async deleteDesignation(data) {
      if (confirm("Are you sure you want to delete?")){
      // eslint-disable-next-line no-unused-vars
      const response = await servicesModule0.deleteDesignation(
        data.CONSULTANT_DESIGNATION_EXEMPTION_ID
      );
      this.getAllDesignation();
      }
    },

      // -------Appeal Day

      getAllAppealDay: async function () {
      const response = await servicesModule0.getAppealDayById();
      this.CONSULTANT_APPEAL_ID = response.CONSULTANT_APPEAL_ID;
      this.model.APPEAL_DAY = response.APPEAL_DAY;

    },
  async submitAppeal() {
      let app = this;
      var param = app.model;
      const data = new FormData();
      data.append("APPEAL_DAY", this.model.APPEAL_DAY);
      try {
        // eslint-disable-next-line no-unused-vars
        const response = await servicesModule0.createAppealDay(data);
        this.getAllAppealDay();
        // this.$modals.simpleModal.$hide()
      } catch (error) {
        console.log(error);
      }
    },

    //--------consultant Type
    getAllConsultantType: async function () {
      const response = await servicesModule0.getAllConsTypeList();
      console.log("consultantTypeList=",response);
      this.consultantTypeList = response;
      this.ConsultantCount = this.consultantTypeList.length;
    },
      getAllConsultantTypeForExam: async function () {
      const response = await servicesModule0.getAllConsTypeListEXAM();
      console.log("consultantTypeList=",response);
      this.consultantType = response;
      //this.ConsultantCount = this.consultantTypeList.length;
    },

    async submitConsType() {
      if (this.$refs.addConsultantTypeForm.validate()) {
        let app = this;
        var param = app.model;
        const data = new FormData();
        data.append("TYPE_NAME", this.model.TYPE_NAME);
        try {
        // eslint-disable-next-line no-unused-vars
        const response = await servicesModule0.createConsType(data);
        this.getAllConsultantType();
        this.model.TYPE_NAME="";
        // this.$modals.simpleModal.$hide()
        } catch (error) {
         console.log(error);
        }
      }
    },

    async editConsultantType(data) {
      const response = await servicesModule0.getConsTypeById(
        data.CONSULTANT_TYPE_ID
      );
      this.$modals.simpleModalConsultantType.$show();
      this.CONSULTANT_TYPE_ID = response.CONSULTANT_TYPE_ID;
      this.model.editCons = response;
      console.log(response);
    },

    async updateConsultantAPI() {
      try {
        const data = new FormData();
        data.append(
          "CONSULTANT_TYPE_ID",
          this.CONSULTANT_TYPE_ID
        );
        data.append("TYPE_NAME", this.model.editCons.TYPE_NAME);
        const response = await servicesModule0.updateConsType(data);
        this.getAllConsultantType();
      } catch (error) {
        console.log(error);
      }
    },

    async deleteConsultantType(data) {
      if (confirm("Are you sure you want to delete?")) {
      // eslint-disable-next-line no-unused-vars
      const response = await servicesModule0.deleteConsType(
        data.CONSULTANT_TYPE_ID
      );
      this.getAllConsultantType();
      }
    },

      //--------- bankruptcy check --------
      getAllBankruptcyCheck: async function () {
      const response = await servicesModule0.getBankruptcyById();
      this.CONSULTANT_BANKRUPTCY_ID = response.CONSULTANT_BANKRUPTCY_ID;
      this.model.BANKRUPTCY_DAY = response.BANKRUPTCY_DAY;

    },
  async submitBankruptcy() {
      let app = this;
      var param = app.model;
      const data = new FormData();
      data.append("BANKRUPTCY_DAY", this.model.BANKRUPTCY_DAY);
      try {
        // eslint-disable-next-line no-unused-vars
        const response = await servicesModule0.createBankruptcyDay(data);
        this.getAllBankruptcyCheck();
        // this.$modals.simpleModal.$hide()
      } catch (error) {
        console.log(error);
      }
    },

      //-------- Exam Appeal
    

  async submitExamAppeal() {
      let app = this;
      var param = app.model;
      const data = new FormData();
      data.append("EXAM_APPEAL_DAY", this.model.EXAM_APPEAL_DAY);
      try {
        // eslint-disable-next-line no-unused-vars
        const response = await servicesModule0.createAppealExam(data);
        this.getAllExamAppeal();
        // this.$modals.simpleModal.$hide()
      } catch (error) {
        console.log(error);
      }
    },

    getAllExamAppeal: async function () {
      const response = await servicesModule0.getAppealExamById();
      console.log("getAllExamAppeal=",response);
      this.CONSULTANT_APPEAL_EXAMINATION_ID = response.CONSULTANT_APPEAL_EXAMINATION_ID;
      this.model.EXAM_APPEAL_DAY = response.EXAM_APPEAL_DAY;

    },
  

    //PRS Familiriazation 
    getAllPRS: async function () {
      const response = await servicesModule0.getPrsById();
      this.CONSULTANT_PRS_FAMILIARISATION_ID = response.CONSULTANT_PRS_FAMILIARISATION_ID;
      this.model.CONSULTANT_PRS_START_DATE = response.CONSULTANT_PRS_START_DATE;
      this.model.CONSULTANT_PRS_END_DATE = response.CONSULTANT_PRS_END_DATE;

    },
  async submitPRS() {
      let app = this;
      var param = app.model;

        var startdate= moment(this.model.CONSULTANT_PRS_START_DATE).unix();
        var enddate= moment(this.model.CONSULTANT_PRS_END_DATE).unix();
        if(startdate > enddate)
        {
          alert("Start Date Cannot Bigger Than End Date");
        }
       else{
          const data = new FormData();
          data.append("CONSULTANT_PRS_START_DATE", moment(this.model.CONSULTANT_PRS_START_DATE).format("YYYY-MM-DD"));
          data.append("CONSULTANT_PRS_END_DATE", moment(this.model.CONSULTANT_PRS_END_DATE).format("YYYY-MM-DD"));
          try {
            // eslint-disable-next-line no-unused-vars
           const response = await servicesModule0.createPrs(data);
            this.getAllPRS();
            // this.$modals.simpleModal.$hide()
          } catch (error) {
            console.log(error);
          }
       }
    },

    //------ Active Ceilli

 getAllActiveCeilli: async function () {
      const response = await servicesModule0.getActiveById();
      this.CONSULTANT_ACTIVE_CEILLI_LICENSE_ID = response.CONSULTANT_ACTIVE_CEILLI_LICENSE_ID;
      this.model.ACTIVE_CEILLI_START_DATE = response.ACTIVE_CEILLI_START_DATE;
      this.model.ACTIVE_CEILLI_END_DATE = response.ACTIVE_CEILLI_END_DATE;
      this.model.ACTIVE_CEILLI_EFFECTIVE_DATE = response.ACTIVE_CEILLI_EFFECTIVE_DATE;

    },
  async submitActiveCeilli() {
      let app = this;
      var param = app.model;
      var startdate= moment(this.model.ACTIVE_CEILLI_START_DATE).unix();
      var enddate= moment(this.model.ACTIVE_CEILLI_END_DATE).unix();
       if(startdate > enddate)
        {
          alert("Start Date Cannot Bigger Than End Date");
        }
       else{
        const data = new FormData();
        data.append("ACTIVE_CEILLI_START_DATE", moment(this.model.ACTIVE_CEILLI_START_DATE).format("YYYY-MM-DD"));
        data.append("ACTIVE_CEILLI_END_DATE", moment(this.model.ACTIVE_CEILLI_END_DATE).format("YYYY-MM-DD"));
         data.append("ACTIVE_CEILLI_EFFECTIVE_DATE", moment(this.model.ACTIVE_CEILLI_EFFECTIVE_DATE).format("YYYY-MM-DD"));
        try {
          // eslint-disable-next-line no-unused-vars
          const response = await servicesModule0.createActiveCeilli(data);
          this.getAllActiveCeilli();
          // this.$modals.simpleModal.$hide()
        } catch (error) {
          console.log(error);
        }
      }
    },

    //--------  Exam Type
    getAllExamType: async function () {
      const response = await servicesModule0.getAllExamTypeList();
      this.examTypeList = response;
      this.ExamTypeCount = this.examTypeList.length;
    },

    async submitExamType() {
      if (this.$refs.addExamTypeForm.validate()) {
        let app = this;
        var param = app.model;
        const data = new FormData();
        data.append("EXAM_TYPE_NAME", this.model.EXAM_TYPE_NAME);
         data.append("CONSULTANT_TYPE_ID", this.model.CONSULTANT_TYPE_ID);
          data.append("EXAM_TYPE_DESC", this.model.EXAM_TYPE_DESC);
        try {
          // eslint-disable-next-line no-unused-vars
          const response = await servicesModule0.createExamType(data);
          this.getAllExamType();
          this.model.EXAM_TYPE_NAME="";
          this.model.CONSULTANT_TYPE_ID="";
          this.model.EXAM_TYPE_DESC="";
          // this.$modals.simpleModal.$hide()
        } catch (error) {
          console.log(error);
        }
      }
    },

    async editExamType(data) {
      const response = await servicesModule0.getExamTypeById(
        data.CONSULTANT_EXAM_TYPE_ID
      );
      this.$modals.simpleModalEditExamType.$show();
      this.CONSULTANT_EXAM_TYPE_ID = response.CONSULTANT_EXAM_TYPE_ID;
      this.model.editExamType.EXAM_TYPE_NAME = response.EXAM_TYPE_NAME;
      this.model.editExamType.EXAM_TYPE_DESC = response.EXAM_TYPE_DESC;
       this.model.editExamType.CONSULTANT_TYPE_ID = {
          CONSULTANT_TYPE_ID: response.CONSULTANT_TYPE_ID,
          TYPE_NAME: response.TYPE_NAME,
          // CONSULTANT_TYPE_ID:response.CONSULTANT_TYPE_ID,
      };
       //this.model.editExamType = response;
     // console.log(response);
    },

    async updateExamAPI() {
      try {
        const data = new FormData();
        data.append(
          "CONSULTANT_EXAM_TYPE_ID",
          this.CONSULTANT_EXAM_TYPE_ID
        );

         data.append("EXAM_TYPE_NAME", this.model.editExamType.EXAM_TYPE_NAME);
         data.append("CONSULTANT_TYPE_ID", this.model.editExamType.CONSULTANT_TYPE_ID.CONSULTANT_TYPE_ID);
        data.append("EXAM_TYPE_DESC", this.model.editExamType.EXAM_TYPE_DESC);
        const response = await servicesModule0.updateExamType(data);
        this.getAllExamType();
      } catch (error) {
        console.log(error);
      }
    },

    async deleteExamType(data) {
      if (confirm("Are you sure you want to delete?")) {
      // eslint-disable-next-line no-unused-vars
      const response = await servicesModule0.deleteExamType(
        data.CONSULTANT_EXAM_TYPE_ID
      );
      this.getAllExamType();
      }
    },
// Exam Session 
getAllExamSession: async function () {
      const response = await servicesModule0.getExamSessionById();
      this.CONSULTANT_EXAM_SESSION_ID = response.CONSULTANT_EXAM_SESSION_ID;
      this.model.EXAM_SESSION_DAYS = response.EXAM_SESSION_DAYS;

    },
    // Bulk Upload
getAllBulkUpload: async function () {
      const response = await servicesModule0.getBulkUploadById();
      console.log("Bulk Response=",response);
      this.BULK_ID = response.BULK_ID;
      if(response.BULK_STATUS == 1)
      {
      this.model.BULK_STATUS = true;
      }
      else{
        this.model.BULK_STATUS = false;
      }
       console.log("Bulk Status=",response.BULK_STATUS);

    },
  async submitExamSession() {
      let app = this;
      var param = app.model;
      const data = new FormData();
      data.append("EXAM_SESSION_DAYS", this.model.EXAM_SESSION_DAYS);
      try {
        // eslint-disable-next-line no-unused-vars
        const response = await servicesModule0.createExamSession(data);
        this.getAllExamSession();
        // this.$modals.simpleModal.$hide()
      } catch (error) {
        console.log(error);
      }
    },
// Type of Application
getAllTypeAppl: async function () {
      const response = await servicesModule0.getAllTypeApplList();
      this.typeApplList = response;
      this.TypeApplCount = this.typeApplList.length;
    },

    async submitTypeAppl() {
      if (this.$refs.addAppTypeForm.validate()) {
        let app = this;
        var param = app.model;
        const data = new FormData();
        data.append("TYPE_OF_APPLICATION_NAME", this.model.TYPE_OF_APPLICATION_NAME);
        try {
          // eslint-disable-next-line no-unused-vars
          const response = await servicesModule0.createTypeAppl(data);
          this.getAllTypeAppl();
          this.model.TYPE_OF_APPLICATION_NAME="";
          // this.$modals.simpleModal.$hide()
        } catch (error) {
          console.log(error);
        }
      }
    },

    async editTypeAppl(data) {
      const response = await servicesModule0.getTypeApplById(
        data.TYPE_OF_APPLICATION_ID
      );
      this.$modals.simpleModalEditTypeApplication.$show();
      this.TYPE_OF_APPLICATION_ID = response.TYPE_OF_APPLICATION_ID;
      this.model.editTypeAppl = response;
      console.log(response);
    },

    async updateTypeApplAPI() {
      try {
        const data = new FormData();
        data.append(
          "TYPE_OF_APPLICATION_ID",
          this.TYPE_OF_APPLICATION_ID
        );
        data.append("TYPE_OF_APPLICATION_NAME", this.model.editTypeAppl.TYPE_OF_APPLICATION_NAME);
        const response = await servicesModule0.updateTypeAppl(data);
        this.getAllTypeAppl();
      } catch (error) {
        console.log(error);
      }
    },

    async deleteTypeAppl(data) {
      if (confirm("Are you sure you want to delete?")) {
      // eslint-disable-next-line no-unused-vars
      const response = await servicesModule0.deleteTypeAppl(
        data.TYPE_OF_APPLICATION_ID
      );
      this.getAllTypeAppl();
      }
    },

    // --------TERMINATION TYPE 

    getAllTermination: async function () {
      const response = await servicesModule0.getAllTerminationList();
      this.terminationList = response;
      this.TerminationCount = this.terminationList.length;
    },

    async submitTermination() {
      if (this.$refs.addTerminationTypeForm.validate()) {
        let app = this;
        var param = app.model;
        const data = new FormData();
        data.append("TERMINATION_TYPE_STATUS", this.model.TERMINATION_TYPE_STATUS);
        data.append("TERMINATION_TYPE_REASON", this.model.TERMINATION_TYPE_REASON);
        data.append("TERMINATION_TYPE_DESCRIPTION", this.model.TERMINATION_TYPE_DESCRIPTION);
        try {
        // eslint-disable-next-line no-unused-vars
        const response = await servicesModule0.createTermination(data);
        this.getAllTermination();
        this.model.TERMINATION_TYPE_STATUS="";
        this.model.TERMINATION_TYPE_REASON="";
        this.model.TERMINATION_TYPE_DESCRIPTION="";
        // this.$modals.simpleModal.$hide()
        } catch (error) {
          console.log(error);
        }
      }
    },

    async editTermination(data) {
      const response = await servicesModule0.getTerminationById(
        data.CONSULTANT_TERMINATION_TYPE_ID
      );
      this.$modals.simpleModalEditTermination.$show();
      this.CONSULTANT_TERMINATION_TYPE_ID = response.CONSULTANT_TERMINATION_TYPE_ID;
      this.model.editTermination = response;
      console.log(response);
    },

    async updateTerminationAPI() {
      try {
        const data = new FormData();
        data.append(
          "CONSULTANT_TERMINATION_TYPE_ID",
          this.CONSULTANT_TERMINATION_TYPE_ID
        );
        data.append("TERMINATION_TYPE_STATUS", this.model.editTermination.TERMINATION_TYPE_STATUS);
        data.append("TERMINATION_TYPE_REASON", this.model.editTermination.TERMINATION_TYPE_REASON);
        data.append("TERMINATION_TYPE_DESCRIPTION", this.model.editTermination.TERMINATION_TYPE_DESCRIPTION);
        const response = await servicesModule0.updateTermination(data);
        this.getAllTermination();
      } catch (error) {
        console.log(error);
      }
    },

    async deleteTermination(data) {
      if (confirm("Are you sure you want to delete?")) {
      // eslint-disable-next-line no-unused-vars
      const response = await servicesModule0.deleteTermination(
        data.CONSULTANT_TERMINATION_TYPE_ID
      );
      this.getAllTermination();
      }
    },

    // ----Renewal Date 
    getAllRenewalDate: async function () {
      const response = await servicesModule0.getConsRenewalById();
      this.CONSULTANT_RENEWAL_DATE_ID = response.CONSULTANT_RENEWAL_DATE_ID;
      this.model.CONSULTANT_RENEWAL_START_DATE = response.CONSULTANT_RENEWAL_START_DATE;
      this.model.CONSULTANT_RENEWAL_END_DATE = response.CONSULTANT_RENEWAL_END_DATE;
       this.model.CONSULTANT_RENEWAL_YEAR = response.CONSULTANT_RENEWAL_YEAR;

    },
  async submitRenewalDate() {
      let app = this;
      var param = app.model;
       var startdate= moment(this.model.CONSULTANT_RENEWAL_START_DATE).unix();
      var enddate= moment(this.model.CONSULTANT_RENEWAL_END_DATE).unix();
       if(startdate > enddate)
        {
          alert("Start Date Cannot Bigger Than End Date");
        }
       else{
          const data = new FormData();
            data.append("CONSULTANT_RENEWAL_START_DATE", moment(this.model.CONSULTANT_RENEWAL_START_DATE).format("YYYY-MM-DD"));
            data.append("CONSULTANT_RENEWAL_END_DATE", moment(this.model.CONSULTANT_RENEWAL_END_DATE).format("YYYY-MM-DD"));
              data.append("CONSULTANT_RENEWAL_YEAR", this.model.CONSULTANT_RENEWAL_YEAR);
          try {
            // eslint-disable-next-line no-unused-vars
            const response = await servicesModule0.createConsRenewal(data);
            this.getAllRenewalDate();
            // this.$modals.simpleModal.$hide()
          } catch (error) {
            console.log(error);
          }
       }
    },





  },
  computed: {
    QualificationList() {
      return [
        {
          name: "__slot:marker",
          width: "30px",
          dataClass: "text-center",
        },
        {
          name: "__slot:no",
          title: "No",
          width: "15%",
        },
        {
          name: "QUAL_NAME",
          title: "NAME ",
          sortField: "QUAL_NAME",
           width: "70%",
        },

        {
          name: "__slot:actions",
          title: "Action",
          dataClass: "justify-content-center",
          width: "15%",
        },
      ];
    },
    filteredQualification() {
      if (!this.term || this.term.length < 1) {
        return this.qualificationList;
      }
    },

    DesignationList() {
      return [
        {
          name: "__slot:marker",
          width: "30px",
          dataClass: "text-center",
        },
        {
          name: "__slot:no",
          title: "No",
          width: "15%",
        },
        {
          name: "EXEM_NAME",
          title: "NAME ",
          sortField: "EXEM_NAME",
           width: "70%",
        },

        {
          name: "__slot:actions",
          title: "Action",
          dataClass: "justify-content-center",
          width: "15%",
        },
      ];
    },
    filteredDesignation() {
      if (!this.term || this.term.length < 1) {
        return this.designationList;
      }
    },


    ConsultantList() {
      return [
        {
          name: "__slot:marker",
          width: "30px",
          dataClass: "text-center",
        },
        {
          name: "__slot:no",
          title: "No",
        },
        {
          name: "TYPE_NAME",
          title: "NAME ",
          sortField: "TYPE_NAME",
        },

        {
          name: "__slot:actions",
          title: "Action",
          dataClass: "justify-content-center",
          width: "15%",
        },
      ];
    },
    filteredConsultant() {
      if (!this.term || this.term.length < 1) {
        return this.consultantTypeList;
      }
    },
    ExamTypeList() {
      return [
        {
          name: "__slot:marker",
          width: "30px",
          dataClass: "text-center",
        },
        {
          name: "__slot:no",
          title: "No",
        },
         {
          name: "TYPE_NAME",
          title: "CONSULTANT TYPE",
          sortField: "TYPE_NAME",
        },
        {
          name: "EXAM_TYPE_NAME",
          title: "EXAM TYPE",
          sortField: "EXAM_TYPE_NAME",
        },
         {
          name: "EXAM_TYPE_DESC",
          title: "EXAM TYPE DESCRIPTION",
          sortField: "EXAM_TYPE_DESC",
        },

        {
          name: "__slot:actions",
          title: "Action",
          dataClass: "justify-content-center",
          width: "15%",
        },
      ];
    },
    filteredExamType() {
      if (!this.term || this.term.length < 1) {
        return this.examTypeList;
      }
    },


    TypeApplList() {
      return [
        {
          name: "__slot:marker",
          width: "30px",
          dataClass: "text-center",
        },
        {
          name: "__slot:no",
          title: "No",
        },
        {
          name: "TYPE_OF_APPLICATION_NAME",
          title: "NAME ",
          sortField: "TYPE_OF_APPLICATION_NAME",
        },

        {
          name: "__slot:actions",
          title: "Action",
          dataClass: "justify-content-center",
          width: "15%",
        },
      ];
    },
    filteredTypeAppl() {
      if (!this.term || this.term.length < 1) {
        return this.typeApplList;
      }
    },
    TerminationList() {
      return [
        {
          name: "__slot:marker",
          width: "30px",
          dataClass: "text-center",
        },
        {
          name: "__slot:no",
          title: "No",
        },
        {
          name: "TERMINATION_TYPE_STATUS",
          title: "STATUS ",
          sortField: "TERMINATION_TYPE_STATUS",
        },
        {
          name: "TERMINATION_TYPE_REASON",
          title: "REASON",
          sortField: "TERMINATION_TYPE_REASON",
        },
        {
          name: "TERMINATION_TYPE_DESCRIPTION",
          title: "DESCRIPTION",
          sortField: "TERMINATION_TYPE_DESCRIPTION",
        },
        {
          name: "__slot:actions",
          title: "Action",
          dataClass: "justify-content-center",
          width: "15%",
        },
      ];
    },
    filteredTermination() {
      if (!this.term || this.term.length < 1) {
        return this.terminationList;
      }
    },

  },
};
</script>

<style>
.consultant-form{
  margin-top: 20px;
}
.consultant-form .field-wrap{
  float: right;
  width: 80%;

}
.consultant-form .errors
{
  float: right;
  clear: both;
  width: 80%;
}
.star{
  color:red;
}
.mt-3{
    top: 20px;
}
</style>

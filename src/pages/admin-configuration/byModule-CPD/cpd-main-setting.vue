<template>
  <va-card>
    <div class="col-lg-10">
      <h4 slot="header">SETTING BY MODULE</h4>
    </div>
    <br />
    <br />

    <h5>
      <i class="fa fa-bank"></i>&nbsp;&nbsp;
      <b>CONTINUING PROFESSIONAL DEVELOPMENT (CPD)</b>
    </h5>
    <hr />

    <div class="ml-5">
      <!-- 5 module Hours -->
      <div>
        <span>FIVE MODULE CPD CALCULATION</span>
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
            <form  @submit.prevent="submit()">
            <div class="row">
              <div class="ml-4 col-md-10">
                <span class="col mt-3 description">MODULE NAME <span class="start"> * </span></span>
                <input
                  type="text"
                  v-model="model.CPD_PROGRAM_NAME"
                  placeholder="ENTER MODULE NAME"
                  class="float-right col-8 form-control form-control-md"
                   required
                />
              </div>
            </div>
            <br />
            <div class="row">
              <div class="ml-4 col-md-10">
                <span class="col mt-3 description">CPD POINT <span class="start"> * </span></span>
                <input
                  type="text"
                  v-model="model.CPD_MAX"
                  placeholder="ENTER MAXIMUM POINT"
                  class="float-right col-4 form-control form-control-md"
                  @keypress="onlyNumber"
                  required
                />
                <input
                  type="text"
                  v-model="model.CPD_MIN"
                  placeholder="ENTER MINIMUM POINT"
                  class="float-right col-4 form-control form-control-md"
                  @keypress="onlyNumber"
                  required
                />
              </div>
            </div>
            <br /><br />
            <div class="row">
              <div class="col-10">
                <button
                  type="submit"
                  class="float-right btn btn-primary btn-fill btn-md"
                >
                  <i class="fa fa-save" />&nbsp; SAVE
                </button>
              </div>
            </div>
            </form>
            <br /><br />
            <!-- list -->
            <va-card class="mt-2">
                <va-data-table
              :fields="fivemodule"
              :data="filteredFiveMod"
              :per-page="parseInt(perPage)"
              :datacount="FiveModuleCount"
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
                      v-on:click="editFiveModule(props.rowData)"
                    >
                      <i class="fa fa-edit"></i
                    ></span>
                    <span
                      v-b-tooltip.hover
                      title="delete"
                      class="badge badge-danger mr-1"
                      v-on:click="deleteFiveModule(props.rowData)"
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

    
     

       <!-- Renewal CPD Point  -->
      <div>
        <span>RENEWAL CPD POINT CALCULATION </span>
        <button
          v-if="visibleSessionTimeout == false"
          v-b-toggle.collapse-3
          type="button"
          class="float-right btn-fill btn-md"
        >
          <i class="fa fa-edit"></i>
        </button>
        <button
          v-if="visibleSessionTimeout == true"
          v-b-toggle.collapse-3
          type="button"
          class="float-right btn-fill btn-md"
        >
          <i class="fa fa-times"></i>
        </button>
        <b-collapse
          id="collapse-3"
          style="background-color: #eeeeee"
          class="mt-4"
          v-model="visibleSessionTimeout"
        >
          <va-card>
            <form  @submit.prevent="submitRenewal()">
            <div class="row">
              <div class="ml-4 col-md-10">
                <span class="col mt-3 description">JOINT MONTH <span class="start"> * </span></span>
                <input
                  type="input"
                  v-model="model.RENEWAL_MONTH"
                  placeholder="ENTER MONTH"
                  class="float-right col-8 form-control form-control-md"
                  @keypress="onlyNumber"
                  required
                />
              </div>
            </div>
            <br />
            <div class="row">
              <div class="ml-4 col-md-10">
                <span class="col mt-3 description">CPD CALCULATION <span class="start"> * </span></span>
                <input
                  type="input"
                  v-model="model.RENEWAL_CALC"
                  placeholder="ENTER CPD CALCULATION"
                  class="float-right col-8 form-control form-control-md"
                  @keypress="onlyNumber"
                  required
                />
              </div>
            </div>
            <br />
            <div class="row">
              <div class="ml-4 col-md-10">
                <span class="col mt-3 description">CPD REQUIREMENT <span class="start"> * </span></span>
                <input
                  type="input"
                  v-model="model.RENEWAL_REQUIREMENT"
                  placeholder="ENTER CPD REQUIREMENT"
                  class="float-right col-8 form-control form-control-md"
                  @keypress="onlyNumber"
                  required
                />
              </div>
            </div>
            <div class="row">
              <div class="ml-4 col-md-10">
                <span class="col mt-3 description">EFFECTIVE DATE <span class="start"> * </span></span>
                <datepicker
                              :value="this.currentDate"
                              @input="searchDate"
                              placeholder="dd-MM-yyyy"
                              format="yyyy-MM-dd"
                              input-class="form-control float-right bgcolor col-8"
                              v-model="model.EFFECTIVE_DATE"
                              :typeable="false"
                               required
                            ></datepicker>
              </div>
            </div>

            <br /><br />
            <div class="row">
              <div class="col-10">
                <button
                  type="submit"
                  class="float-right btn btn-primary btn-fill btn-md"
                >
                  <i class="fa fa-save" />&nbsp; SAVE
                </button>
              </div>
            </div>
            </form>
            <br /><br />
            <va-card class="mt-2">
              <va-data-table
                :fields="renewalCPD"
                :data="filteredRenewalCPD"
                :per-page="parseInt(perPage)"
                :datacount="RenewalCount"
                :dataperpage="parseInt(perPage)"
                clickable
              >
                <template slot="no" slot-scope="row">
                  {{ row.rowIndex + 1 }}
                </template>

                <template slot="actions" slot-scope="props">
                  <h4 class="mt-2">
                    <span
                      class="badge badge-primary mr-1"
                      title="edit"
                      v-on:click="editCPDRenewal(props.rowData)"
                    >
                      <i class="fa fa-edit"></i
                    ></span>
                    <span
                      class="badge badge-danger mr-1"
                      title="delete"
                      v-on:click="deleteCPDRenewal(props.rowData)"
                    >
                      <i class="fa fa-trash"></i
                    ></span>
                  </h4>
                </template>
              </va-data-table>
              <br />
            </va-card>
            <br /><br />
          </va-card>
        </b-collapse>
        <hr />
      </div>

      <!-- Waiver Reason -->
      <div>
        <span>WAIVER REASON</span>
        <button
          v-if="visibleBlockDuration2 == false"
          v-b-toggle.collapse-4
          type="button"
          class="float-right btn-fill btn-md"
        >
          <i class="fa fa-edit"></i>
        </button>
        <button
          v-if="visibleBlockDuration2 == true"
          v-b-toggle.collapse-4
          type="button"
          class="float-right btn-fill btn-md"
        >
          <i class="fa fa-times"></i>
        </button>
        <b-collapse
          class="mt-4"
          id="collapse-4"
          v-model="visibleBlockDuration2"
        >
          <va-card>
             <form  @submit.prevent="submitWaiver()">
            <div class="row">
              <div class="ml-4 col-md-10">
                <span class="col mt-3 description">REASON <span class="start"> * </span></span>
                <input
                  type="input"
                  v-model="model.WAIVER_REASON"
                  placeholder="ENTER REASON"
                  class="float-right col-8 form-control form-control-md"
                  required
                />
              </div>
            </div>
            <br /><br />
            <div class="row">
              <div class="col-10">
                <button
                  type="submit"
                  class="float-right btn btn-primary btn-fill btn-md"
                >
                  <i class="fa fa-save" />&nbsp; SAVE
                </button>
              </div>
            </div>
            </form>
            <br /><br />
            <va-card class="mt-2">
              <va-data-table
                :fields="waiverList"
                :data="filteredWaiver"
                :per-page="parseInt(perPage)"
                 :datacount="WaiverCount"
                :dataperpage="parseInt(perPage)"
                clickable
              >
                <template slot="no" slot-scope="row">
                  {{ row.rowIndex + 1 }}
                </template>

                <template slot="actions" slot-scope="props">
                  <h4 class="mt-2">
                    <span
                      class="badge badge-primary mr-1"
                      title="edit"
                      v-on:click="editWaiverReason(props.rowData)"
                    >
                      <i class="fa fa-edit"></i
                    ></span>
                    <span
                      class="badge badge-danger mr-1"
                      title="delete"
                      v-on:click="deleteWaiverReason(props.rowData)"
                    >
                      <i class="fa fa-trash"></i
                    ></span>
                  </h4>
                </template>
              </va-data-table>
              <br />
            </va-card>

            <div class="row col ml-2 mt-2">
              <!-- pagination later -->
            </div>

            <br /><br />
          </va-card>
        </b-collapse>
        <hr />
      </div>
         <!-- CPD Rule Point -->
      <div>
        <span>CPD RULE POINT RENEWAL REQUIREMENT</span>
        <button
          v-if="visibleBlockDuration3 == false"
          v-b-toggle.collapse-5
          type="button"
          class="float-right btn-fill btn-md"
        >
          <i class="fa fa-edit"></i>
        </button>
        <button
          v-if="visibleBlockDuration3 == true"
          v-b-toggle.collapse-5
          type="button"
          class="float-right btn-fill btn-md"
        >
          <i class="fa fa-times"></i>
        </button>
        <b-collapse
          class="mt-4"
          id="collapse-5"
          v-model="visibleBlockDuration3"
        >
          <va-card>
            <form  @submit.prevent="submitRulePoint()">
            <div class="row">
              <div class="ml-4 col-md-10">
                <span class="col mt-3 description">TYPE <span class="start"> * </span></span>
                <input
                  type="input"
                  v-model="model.CPD_RULE_TYPE"
                  placeholder="ENTER TYPE"
                  class="float-right col-8 form-control form-control-md"
                  required
                />
              </div>
            </div>
            <br />
            <div class="row">
              <div class="ml-4 col-md-10">
                <span class="col mt-3 description">CONDITION <span class="start"> * </span></span>
                <input
                  type="input"
                  v-model="model.CPD_RULE_CONDITION"
                  placeholder="ENTER CONDITION"
                  class="float-right col-8 form-control form-control-md"
                  required
                />
              </div>
            </div>
            <br />
            <div class="row">
              <div class="ml-4 col-md-10">
                <span class="col mt-3 description">CPD REQUIREMENT <span class="start"> * </span></span>
                <input
                  type="input"
                  v-model="model.CPD_RULE_POINT"
                  placeholder="ENTER CPD REQUIREMENT"
                  class="float-right col-8 form-control form-control-md"
                  @keypress="onlyNumber"
                  required
                />
              </div>
            </div>

            <br /><br />
            <div class="row">
              <div class="col-10">
                <button
                  type="submit"
                  class="float-right btn btn-primary btn-fill btn-md"
                >
                  <i class="fa fa-save" />&nbsp; SAVE
                </button>
              </div>
            </div>
            </form>
            <va-card class="mt-2">
              <va-data-table
                :fields="ruleList"
                :data="filteredRulePoint"
                :per-page="parseInt(perPage)"
                :datacount="CpdRuleCount"
               :dataperpage="parseInt(perPage)"
                clickable
              >
                <template slot="no" slot-scope="row">
                  {{ row.rowIndex + 1 }}
                </template>

                <template slot="actions" slot-scope="props">
                  <h4 class="mt-2">
                    <span
                      class="badge badge-primary mr-1"
                      title="edit"
                      v-on:click="editCPDRule(props.rowData)"
                    >
                      <i class="fa fa-edit"></i
                    ></span>
                     <span
                      class="badge badge-danger mr-1"
                      title="delete"
                      v-on:click="deleteCPDRule(props.rowData)"
                    >
                      <i class="fa fa-trash"></i
                    ></span>
                  </h4>
                </template>
              </va-data-table>
              <br />
            </va-card>

            <div class="row col ml-2 mt-2">
              <!-- pagination later -->
            </div>

            <br /><br />
          </va-card>
        </b-collapse>
        <hr />
      </div>

        <!-- CPD Program -->
   <!-- <div>
        <span>CPD PROGRAM HOUR CALCULATION</span>
        <button
          v-if="visibleBlockDuration == false"
          v-b-toggle.collapse-2
          type="button"
          class="float-right btn-fill btn-md"
        >
          <i class="fa fa-edit"></i>
        </button>
        <button
          v-if="visibleBlockDuration == true"
          v-b-toggle.collapse-2
          type="button"
          class="float-right btn-fill btn-md"
        >
          <i class="fa fa-times"></i>
        </button>
       
        <b-collapse v-model="visibleBlockDuration" class="mt-4" id="collapse-2">
          <va-card>
            <form  @submit.prevent="submitCpdProgram()">
            <div class="row">
              <div class="ml-4 col-md-10">
                <span class="col mt-3 description">MODULE NAME <span class="start"> * </span></span>
                <input
                  type="text"
                  v-model="model.addCpd.CPD_PROGRAM_NAME"
                  placeholder="ENTER MODULE NAME"
                  class="float-right col-8 form-control form-control-md"
                  required
                />
              </div>
            </div>
            <br />
            <div class="row">
              <div class="ml-4 col-md-10">
                <span class="col mt-3 description">CPD POINT <span class="start"> * </span></span>
                <input
                  type="text"
                  v-model="model.addCpd.CPD_MAX"
                  placeholder="ENTER MAXIMUM POINT"
                  class="float-right col-4 form-control form-control-md"
                  @keypress="onlyNumber"
                  required
                />
                <input
                  type="text"
                  v-model="model.addCpd.CPD_MIN"
                  placeholder="ENTER MINIMUM POINT"
                  class="float-right col-4 form-control form-control-md"
                  @keypress="onlyNumber"
                  required
                />
              </div>
            </div>
            <br /><br />
            <div class="row">
              <div class="col-10">
                <button
                  type="submit"
                  class="float-right btn btn-primary btn-fill btn-md"
                >
                  <i class="fa fa-save" />&nbsp; SAVE
                </button>
              </div>
            </div>
            </form>

            <br /><br />
            <va-card class="mt-2">
              <va-data-table
                :fields="CpdProgram"
                :data="filteredCpdProgram"
                :per-page="parseInt(perPage)"
                :datacount="CpdProgramCount"
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
                      v-on:click="editCpdProgram(props.rowData)"
                    >
                      <i class="fa fa-edit"></i
                    ></span>
                    <span
                      v-b-tooltip.hover
                      title="delete"
                      class="badge badge-danger mr-1"
                      v-on:click="deleteCpdProgram(props.rowData)"
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
      </div> -->

        <!-- Training Mode  (PRE/POST-vetting)  -->
     <div>
        <span>CPD PROGRAM HOUR CALCULATION</span>
        <button
          v-if="visibleBlockDuration4 == false"
          v-b-toggle.collapse-6
          type="button"
          class="float-right btn-fill btn-md"
        >
          <i class="fa fa-edit"></i>
        </button>
        <button
          v-if="visibleBlockDuration4 == true"
          v-b-toggle.collapse-6
          type="button"
          class="float-right btn-fill btn-md"
        >
          <i class="fa fa-times"></i>
        </button>
        <b-collapse
          class="mt-4"
          id="collapse-6"
          v-model="visibleBlockDuration4"
        >
          <va-card>
            <br />
            <form  @submit.prevent="submitTRMode()">
            <div class="row">
              <div class="ml-4 col-md-10">
                <span class="col mt-3 description">MODE NAME <span class="start"> * </span></span>
                <input
                  type="input"
                  v-model="model.TR_MODE_NAME"
                  placeholder="ENTER MODE"
                  class="float-right col-8 form-control form-control-md"
                  required
                />
              </div>
            </div>
            <br />
            <div class="row">
              <div class="ml-4 col-md-10">
                <span class="col mt-3 description">CPD POINT <span class="start"> * </span></span>
                <input
                  type="text"
                  v-model="model.MAX_POINT"
                  placeholder="ENTER MAXIMUM POINT"
                  class="float-right col-4 form-control form-control-md"
                  @keypress="onlyNumber"
                  required
                />
                <input
                  type="text"
                  v-model="model.MIN_POINT"
                  placeholder="ENTER MINIMUM POINT"
                  class="float-right col-4 form-control form-control-md"
                  @keypress="onlyNumber"
                  required
                />
              </div>
            </div>
            <br />
            <br /><br />
            <div class="row">
              <div class="col-10">
                <button
                  type="submit"
                  class="float-right btn btn-primary btn-fill btn-md"
                >
                  <i class="fa fa-save" />&nbsp; SAVE
                </button>
              </div>
            </div>
              </form>
            <br /><br />
            <va-card class="mt-2">
              <va-data-table
                :fields="TrModeList"
                :data="filteredTrMode"
                :per-page="parseInt(perPage)"
                :datacount="TrModeCount"
               :dataperpage="parseInt(perPage)"
                clickable
              >
                <template slot="no" slot-scope="row">
                  {{ row.rowIndex + 1 }}
                </template>

                <template slot="actions" slot-scope="props">
                  <h4 class="mt-2">
                    <span
                      class="badge badge-primary mr-1"
                      v-on:click="editTRMode(props.rowData)"
                    >
                      <i class="fa fa-edit"></i
                    ></span>
                    <span
                      class="badge badge-danger mr-1"
                      v-on:click="deleteTRMode(props.rowData)"
                    >
                      <i class="fa fa-trash"></i
                    ></span>
                  </h4>
                </template>
              </va-data-table>
              <br />
            </va-card>

            <div class="row col ml-2 mt-2">
            
            </div>

            <br /><br />
          </va-card>
        </b-collapse>
        <hr />
      </div>
<!-- 
      TR MODE (WRITING & 5MODULE) -->
      <div>
        <span>TRAINING MODE (5 MODULES & WRITING )</span>
        <button
          v-if="visibleBlockDuration10 == false"
          v-b-toggle.collapse-12
          type="button"
          class="float-right btn-fill btn-md"
        >
          <i class="fa fa-edit"></i>
        </button>
        <button
          v-if="visibleBlockDuration10 == true"
          v-b-toggle.collapse-12
          type="button"
          class="float-right btn-fill btn-md"
        >
          <i class="fa fa-times"></i>
        </button>
        <b-collapse
          class="mt-4"
          id="collapse-12"
          v-model="visibleBlockDuration10"
        >
          <va-card>
            <br />
            <form  @submit.prevent="submit5moduleTRMode()">
            <div class="row">
              <div class="ml-4 col-md-10">
                <span class="col mt-3 description">MODE NAME <span class="start"> * </span></span>
                <input
                  type="input"
                  v-model="model.FIVE_MODULE_TR_MODE_NAME"
                  placeholder="ENTER MODE"
                  class="float-right col-8 form-control form-control-md"
                  required
                />
              </div>
            </div>
            <br />
            <br /><br />
            <div class="row">
              <div class="col-10">
                <button
                  type="submit"
                  class="float-right btn btn-primary btn-fill btn-md"
                >
                  <i class="fa fa-save" />&nbsp; SAVE
                </button>
              </div>
            </div>
            </form>
            <br /><br />
            <va-card class="mt-2">
              <va-data-table
                :fields="FiveModuleTrModeList"
                :data="filteredDataFiveModuleTrMode"
                :per-page="parseInt(perPage)"
                :datacount="fiveModuleTrModeCount"
               :dataperpage="parseInt(perPage)"
                clickable
              >
                <template slot="no" slot-scope="row">
                  {{ row.rowIndex + 1 }}
                </template>

                <template slot="actions" slot-scope="props">
                  <h4 class="mt-2">
                    <span
                      class="badge badge-primary mr-1"
                      v-on:click="editFiveModuleTRMode(props.rowData)"
                    >
                      <i class="fa fa-edit"></i
                    ></span>
                    <span
                      class="badge badge-danger mr-1"
                      v-on:click="deleteFiveModuleTRMode(props.rowData)"
                    >
                      <i class="fa fa-trash"></i
                    ></span>
                  </h4>
                </template>
              </va-data-table>
              <br />
            </va-card>

            <div class="row col ml-2 mt-2">
              <!-- pagination later -->
            </div>

            <br /><br />
          </va-card>
        </b-collapse>
        <hr />
      </div>

<!-- TR MODE(READING) -->
<div>
        <span>TRAINING MODE (READING)</span>
        <button
          v-if="visibleBlockDuration11 == false"
          v-b-toggle.collapse-13
          type="button"
          class="float-right btn-fill btn-md"
        >
          <i class="fa fa-edit"></i>
        </button>
        <button
          v-if="visibleBlockDuration11 == true"
          v-b-toggle.collapse-13
          type="button"
          class="float-right btn-fill btn-md"
        >
          <i class="fa fa-times"></i>
        </button>
        <b-collapse
          class="mt-4"
          id="collapse-13"
          v-model="visibleBlockDuration11"
        >
          <va-card>
            <br />
            <form  @submit.prevent="submitReadingTRMode()">
            <div class="row">
              <div class="ml-4 col-md-10">
                <span class="col mt-3 description">MODE NAME <span class="start"> * </span></span>
                <input
                  type="input"
                  v-model="model.READING_TR_MODE_NAME"
                  placeholder="ENTER MODE"
                  class="float-right col-8 form-control form-control-md"
                  required
                />
              </div>
            </div>
            <br />
            <br /><br />
            <div class="row">
              <div class="col-10">
                <button
                  type="submit"
                  class="float-right btn btn-primary btn-fill btn-md"
                >
                  <i class="fa fa-save" />&nbsp; SAVE
                </button>
              </div>
            </div>
            </form>
            <br /><br />
            <va-card class="mt-2">
              <va-data-table
                :fields="ReadingTrModeList"
                :data="filteredDataReadingTrModeList"
                :per-page="parseInt(perPage)"
                :datacount="ReadingTrModeCount"
               :dataperpage="parseInt(perPage)"
                clickable
              >
                <template slot="no" slot-scope="row">
                  {{ row.rowIndex + 1 }}
                </template>

                <template slot="actions" slot-scope="props">
                  <h4 class="mt-2">
                    <span
                      class="badge badge-primary mr-1"
                      v-on:click="editReadingTRMode(props.rowData)"
                    >
                      <i class="fa fa-edit"></i
                    ></span>
                    <span
                      class="badge badge-danger mr-1"
                      v-on:click="deleteReadingTRMode(props.rowData)"
                    >
                      <i class="fa fa-trash"></i
                    ></span>
                  </h4>
                </template>
              </va-data-table>
              <br />
            </va-card>

            <div class="row col ml-2 mt-2">
              <!-- pagination later -->
            </div>

            <br /><br />
          </va-card>
        </b-collapse>
        <hr />
      </div>

 <!-- Training Program Type  -->
      <div>
        <span>TRAINING PROGRAM TYPE</span>
        <button
          v-if="visibleBlockDuration5 == false"
          v-b-toggle.collapse-7
          type="button"
          class="float-right btn-fill btn-md"
        >
          <i class="fa fa-edit"></i>
        </button>
        <button
          v-if="visibleBlockDuration5 == true"
          v-b-toggle.collapse-7
          type="button"
          class="float-right btn-fill btn-md"
        >
          <i class="fa fa-times"></i>
        </button>
        <b-collapse
          class="mt-4"
          id="collapse-7"
          v-model="visibleBlockDuration5"
        >
          <va-card>
            <form  @submit.prevent="submitTRType()">
            <div class="row">
              <div class="ml-4 col-md-10">
                <span class="col mt-3 description">PROGRAM NAME <span class="start"> * </span></span>
                <input
                  type="input"
                  v-model="model.TR_PROGRAM_TYPE_NAME"
                  placeholder="ENTER PROGRAM NAME"
                  class="float-right col-8 form-control form-control-md"
                  required
                />
              </div>
            </div>
            <br />

            <br /><br />
            <div class="row">
              <div class="col-10">
                <button
                  type="submit"
                  class="float-right btn btn-primary btn-fill btn-md"
                >
                  <i class="fa fa-save" />&nbsp; SAVE
                </button>
              </div>
            </div>
            </form>
            <br /><br />
            <va-card class="mt-2">
              <va-data-table
                :fields="TrTypeList"
                :data="filteredTrProgram"
                :per-page="parseInt(perPage)"
                :datacount="TrProgramCount"
               :dataperpage="parseInt(perPage)"
                clickable
              >
                <template slot="no" slot-scope="row">
                  {{ row.rowIndex + 1 }}
                </template>

                <template slot="actions" slot-scope="props">
                  <h4 class="mt-2">
                    <span
                      class="badge badge-primary mr-1"
                      v-on:click="editTRType(props.rowData)"
                    >
                      <i class="fa fa-edit"></i
                    ></span>
                    <span
                      class="badge badge-danger mr-1"
                      v-on:click="deleteTRType(props.rowData)"
                    >
                      <i class="fa fa-trash"></i
                    ></span>
                  </h4>
                </template>
              </va-data-table>
              <br />
            </va-card>

            <div class="row col ml-2 mt-2">
              <!-- pagination later -->
            </div>

            <br /><br />
          </va-card>
        </b-collapse>
        <hr />
      </div>
        <!-- Module Code  -->
      <div>
        <span>MODULE CODE</span>
        <button
          v-if="visibleBlockDuration6 == false"
          v-b-toggle.collapse-8
          type="button"
          class="float-right btn-fill btn-md"
        >
          <i class="fa fa-edit"></i>
        </button>
        <button
          v-if="visibleBlockDuration6 == true"
          v-b-toggle.collapse-8
          type="button"
          class="float-right btn-fill btn-md"
        >
          <i class="fa fa-times"></i>
        </button>
        <b-collapse
          class="mt-4"
          id="collapse-8"
          v-model="visibleBlockDuration6"
        >
          <va-card>
            <br />
            <form  @submit.prevent="submitModuleCode()">
            <div class="row">
              <div class="ml-4 col-md-10">
                <span class="col mt-3 description">MODULE NAME <span class="start"> * </span></span>
                <input
                  type="input"
                  v-model="model.MODULE_CODE_NAME"
                  placeholder="ENTER NAME "
                  class="float-right col-8 form-control form-control-md"
                  required
                />
              </div>
            </div>
            <br />
            <br /><br />
            <div class="row">
              <div class="col-10">
                <button
                  type="submit"
                  class="float-right btn btn-primary btn-fill btn-md"
                >
                  <i class="fa fa-save" />&nbsp; SAVE
                </button>
              </div>
            </div>
            </form>
            <br /><br />
            <va-card class="mt-2">
              <va-data-table
                :fields="ModuleCodeList"
                :data="filteredModuleCode"
                :per-page="parseInt(perPage)"
                :datacount="ModuleCodeCount"
               :dataperpage="parseInt(perPage)"
                clickable
              >
                <template slot="no" slot-scope="row">
                  {{ row.rowIndex + 1 }}
                </template>

                <template slot="actions" slot-scope="props">
                  <h4 class="mt-2">
                    <span
                      class="badge badge-primary mr-1"
                      title="edit"
                      v-on:click="editModuleCode(props.rowData)"
                    >
                      <i class="fa fa-edit"></i
                    ></span>
                    <span
                      class="badge badge-danger mr-1"
                      title="delete"
                      v-on:click="deleteModuleCode(props.rowData)"
                    >
                      <i class="fa fa-trash"></i
                    ></span>
                  </h4>
                </template>
              </va-data-table>
              <br />
            </va-card>

            <div class="row col ml-2 mt-2">
              <!-- pagination later -->
            </div>

            <br /><br />
          </va-card>
        </b-collapse>
        <hr />
      </div>
        <!-- Financial Planner  -->
      <div>
        <span>FINANCIAL PLANNER</span>
        <button
          v-if="visibleBlockDuration7 == false"
          v-b-toggle.collapse-9
          type="button"
          class="float-right btn-fill btn-md"
        >
          <i class="fa fa-edit"></i>
        </button>
        <button
          v-if="visibleBlockDuration7 == true"
          v-b-toggle.collapse-9
          type="button"
          class="float-right btn-fill btn-md"
        >
          <i class="fa fa-times"></i>
        </button>
        <b-collapse
          class="mt-4"
          id="collapse-9"
          v-model="visibleBlockDuration7"
        >
          <va-card>
            <br />
            <form  @submit.prevent="submitFinancialPlanner()">
            <div class="row">
              <div class="ml-4 col-md-10">
                <span class="col mt-3 description">PROGRAM NAME <span class="start"> * </span></span>
                <input
                  type="input"
                  v-model="model.FP_CODE_NAME"
                  placeholder="ENTER INDEX "
                  class="float-right col-8 form-control form-control-md"
                  required
                />
              </div>
            </div>
            <br />
            <br /><br />
            <div class="row">
              <div class="col-10">
                <button
                  type="submit"
                  class="float-right btn btn-primary btn-fill btn-md"
                >
                  <i class="fa fa-save" />&nbsp; SAVE
                </button>
              </div>
            </div>
            </form>
            <br /><br />
            <va-card class="mt-2">
              <va-data-table
                :fields="FinancialPlannerList"
                :data="filteredFinancialPlanner"
                :per-page="parseInt(perPage)"
                :datacount="FinancialCount"
              :dataperpage="parseInt(perPage)"
                clickable
              >
                <template slot="no" slot-scope="row">
                  {{ row.rowIndex + 1 }}
                </template>

                <template slot="actions" slot-scope="props">
                  <h4 class="mt-2">
                    <span
                      class="badge badge-primary mr-1"
                      v-on:click="editFinancialPlanner(props.rowData)"
                    >
                      <i class="fa fa-edit"></i
                    ></span>
                    <span
                      class="badge badge-danger mr-1"
                      v-on:click="deleteFinancialPlanner(props.rowData)"
                    >
                      <i class="fa fa-trash"></i
                    ></span>
                  </h4>
                </template>
              </va-data-table>
              <br />
            </va-card>

            <div class="row col ml-2 mt-2">
              <!-- pagination later -->
            </div>

            <br /><br />
          </va-card>
        </b-collapse>
        <hr />
      </div>
        <!-- Qualification Mode -->
      <div>
        <span>QUALIFICATION MODE</span>
        <button
          v-if="visibleBlockDuration8 == false"
          v-b-toggle.collapse-10
          type="button"
          class="float-right btn-fill btn-md"
        >
          <i class="fa fa-edit"></i>
        </button>
        <button
          v-if="visibleBlockDuration8 == true"
          v-b-toggle.collapse-10
          type="button"
          class="float-right btn-fill btn-md"
        >
          <i class="fa fa-times"></i>
        </button>
        <b-collapse
          class="mt-4"
          id="collapse-10"
          v-model="visibleBlockDuration8"
        >
          <va-card>
            <br />
             <form  @submit.prevent="submitQR()">
            <div class="row">
              <div class="ml-4 col-md-10">
                <span class="col mt-3 description">PROGRAM INDEX <span class="start"> * </span></span>
                <input
                  type="input"
                  v-model="model.QR_MODE_NAME"
                  placeholder="ENTER INDEX "
                  class="float-right col-8 form-control form-control-md"
                  required
                />
              </div>
            </div>
            <br />
            <br /><br />
            <div class="row">
              <div class="col-10">
                <button
                  type="submit"
                  class="float-right btn btn-primary btn-fill btn-md"
                >
                  <i class="fa fa-save" />&nbsp; SAVE
                </button>
              </div>
            </div>
            </form>
            <br /><br />
            <va-card class="mt-2">
              <va-data-table
                :fields="QRList"
                :data="filteredQR"
                :per-page="parseInt(perPage)"
                :datacount="QRCount"
              :dataperpage="parseInt(perPage)"
                clickable
              >
                <template slot="no" slot-scope="row">
                  {{ row.rowIndex + 1 }}
                </template>

                <template slot="actions" slot-scope="props">
                  <h4 class="mt-2">
                    <span
                      class="badge badge-primary mr-1"
                      v-on:click="editQR(props.rowData)"
                    >
                      <i class="fa fa-edit"></i
                    ></span>
                    <span
                      class="badge badge-danger mr-1"
                      v-on:click="deleteQR(props.rowData)"
                    >
                      <i class="fa fa-trash"></i
                    ></span>
                  </h4>
                </template>
              </va-data-table>
              <br />
            </va-card>

            <div class="row col ml-2 mt-2">
              <!-- pagination later -->
            </div>

            <br /><br />
          </va-card>
        </b-collapse>
        <hr />
      </div>
        <!-- Cpd Cut off Date -->
      <div>
        <span>CPD POINT CUT OFF DATE</span>
        <button
          v-if="visibleBlockDuration9 == false"
          v-b-toggle.collapse-11
          type="button"
          class="float-right btn-fill btn-md"
        >
          <i class="fa fa-edit"></i>
        </button>
        <button
          v-if="visibleBlockDuration9 == true"
          v-b-toggle.collapse-11
          type="button"
          class="float-right btn-fill btn-md"
        >
          <i class="fa fa-times"></i>
        </button>
        <b-collapse
          class="mt-4"
          id="collapse-11"
          v-model="visibleBlockDuration9"
        >
          <va-card>
            <br />
            <div class="row">
              <div class="ml-4 col-md-10">
                <span class="col mt-3 description">CPD POINT CUT OFF DATE</span>
                <datepicker
                              :value="term"
                              @input="searchDate"
                              placeholder="dd-MM-yyyy"
                              format="dd MMM yyyy"
                              input-class="form-control float-right bgcolor col-8"
                              v-model="model.CPD_CUT_OFF_DATE"
                              :typeable="false"
                            ></datepicker>
              </div>
            </div>

            <!-- <div class="row">
              <div class="ml-4 col-md-10">
                <span class="col mt-3 description">START DATE</span>
                <datepicker
                              :value="term"
                              @input="searchDate"
                              placeholder="dd-MM-yyyy"
                              format="dd MMM yyyy"
                              input-class="form-control float-right bgcolor col-8"
                              v-model="model.CPD_CUT_OFF_START_DATE"
                              :typeable="false"
                            ></datepicker>
              </div>
            </div>
            <br />
            <div class="row">
              <div class="ml-4 col-md-10">
                <span class="col mt-3 description">END DATE </span>
                <datepicker
                              :value="term"
                              @input="searchDate"
                              placeholder="dd-MM-yyyy"
                              format="dd MMM yyyy"
                              input-class="form-control float-right bgcolor col-8"
                              v-model="model.CPD_CUT_OFF_END_DATE"
                              :typeable="false"
                            ></datepicker>
              </div>
            </div> -->
            <br /><br />
            <div class="row">
              <div class="col-10">
                <button
                  @click="submitCutOffDate"
                  type="button"
                  class="float-right btn btn-primary btn-fill btn-md"
                >
                  <i class="fa fa-save" />&nbsp; SAVE
                </button>
              </div>
            </div>
            <br /><br />

            <div class="row col ml-2 mt-2">
              <!-- pagination later -->
            </div>

            <br /><br />
          </va-card>
        </b-collapse>
        <hr />
      </div>

  <!-- Ls Media  -->
      <!-- <div>
        <span>LEARNING SUB MEDIA</span>
        <button
          v-if="visibleBlockDuration12 == false"
          v-b-toggle.collapse-14
          type="button"
          class="float-right btn-fill btn-md"
        >
          <i class="fa fa-edit"></i>
        </button>
        <button
          v-if="visibleBlockDuration12 == true"
          v-b-toggle.collapse-14
          type="button"
          class="float-right btn-fill btn-md"
        >
          <i class="fa fa-times"></i>
        </button>
        <b-collapse
          class="mt-4"
          id="collapse-14"
          v-model="visibleBlockDuration12"
        >
          <va-card>
            <br />
            <div class="row">
              <div class="ml-4 col-md-10">
                <span class="col mt-3 description">MEDIA NAME</span>
                <input
                  type="input"
                  v-model="model.LS_MEDIA_NAME"
                  placeholder="ENTER NAME "
                  class="float-right col-8 form-control form-control-md"
                />
              </div>
            </div>
            <br />
            <br /><br />
            <div class="row">
              <div class="col-10">
                <button
                  @click="submitLsMedia"
                  type="button"
                  class="float-right btn btn-primary btn-fill btn-md"
                >
                  <i class="fa fa-save" />&nbsp; SAVE
                </button>
              </div>
            </div>
            <br /><br />
            <va-card class="mt-2">
              <va-data-table
                :fields="LsMediaList"
                :data="filteredLsMedia"
                :per-page="parseInt(perPage)"
                :datacount="LsMediaCount"
               :dataperpage="parseInt(perPage)"
                clickable
              >
                <template slot="no" slot-scope="row">
                  {{ row.rowIndex + 1 }}
                </template>

                <template slot="actions" slot-scope="props">
                  <h4 class="mt-2">
                    <span
                      class="badge badge-primary mr-1"
                      v-on:click="editLsMedia(props.rowData)"
                    >
                      <i class="fa fa-edit"></i
                    ></span>
                    <span
                      class="badge badge-danger mr-1"
                      v-on:click="deleteLsMedia(props.rowData)"
                    >
                      <i class="fa fa-trash"></i
                    ></span>
                  </h4>
                </template>
              </va-data-table>
              <br />
            </va-card>

            <div class="row col ml-2 mt-2">
            </div>

            <br /><br />
          </va-card>
        </b-collapse>
        <hr />
      </div> -->

      <!-- Ls Method -->
       <!-- <div>
        <span>LEARNING SUB METHOD</span>
        <button
          v-if="visibleBlockDuration13 == false"
          v-b-toggle.collapse-15
          type="button"
          class="float-right btn-fill btn-md"
        >
          <i class="fa fa-edit"></i>
        </button>
        <button
          v-if="visibleBlockDuration13 == true"
          v-b-toggle.collapse-15
          type="button"
          class="float-right btn-fill btn-md"
        >
          <i class="fa fa-times"></i>
        </button>
        <b-collapse
          class="mt-4"
          id="collapse-15"
          v-model="visibleBlockDuration13"
        >
          <va-card>
            <br />
            <div class="row">
              <div class="ml-4 col-md-10">
                <span class="col mt-3 description">METHOD NAME</span>
                <input
                  type="input"
                  v-model="model.LS_METHOD_NAME"
                  placeholder="ENTER NAME "
                  class="float-right col-8 form-control form-control-md"
                />
              </div>
            </div>
            <br />
            <br /><br />
            <div class="row">
              <div class="col-10">
                <button
                  @click="submitLsMethod"
                  type="button"
                  class="float-right btn btn-primary btn-fill btn-md"
                >
                  <i class="fa fa-save" />&nbsp; SAVE
                </button>
              </div>
            </div>
            <br /><br />
            <va-card class="mt-2">
              <va-data-table
                :fields="LsMethodList"
                :data="filteredLsMethod"
                :per-page="parseInt(perPage)"
                :datacount="LsMethodCount"
               :dataperpage="parseInt(perPage)"
                clickable
              >
                <template slot="no" slot-scope="row">
                  {{ row.rowIndex + 1 }}
                </template>

                <template slot="actions" slot-scope="props">
                  <h4 class="mt-2">
                    <span
                      class="badge badge-primary mr-1"
                      v-on:click="editLsMethod(props.rowData)"
                    >
                      <i class="fa fa-edit"></i
                    ></span>
                    <span
                      class="badge badge-danger mr-1"
                      v-on:click="deleteLsMethod(props.rowData)"
                    >
                      <i class="fa fa-trash"></i
                    ></span>
                  </h4>
                </template>
              </va-data-table>
              <br />
            </va-card>

            <div class="row col ml-2 mt-2">
              
            </div>

            <br /><br />
          </va-card>
        </b-collapse>
        <hr />
      </div> -->

      <!-- LS Assessment -->

       <!-- <div>
        <span>LEARNING SUB ASSESSMENT</span>
        <button
          v-if="visibleBlockDuration14 == false"
          v-b-toggle.collapse-16
          type="button"
          class="float-right btn-fill btn-md"
        >
          <i class="fa fa-edit"></i>
        </button>
        <button
          v-if="visibleBlockDuration14 == true"
          v-b-toggle.collapse-16
          type="button"
          class="float-right btn-fill btn-md"
        >
          <i class="fa fa-times"></i>
        </button>
        <b-collapse
          class="mt-4"
          id="collapse-16"
          v-model="visibleBlockDuration14"
        >
          <va-card>
            <br />
            <div class="row">
              <div class="ml-4 col-md-10">
                <span class="col mt-3 description">ASSESSMENT NAME</span>
                <input
                  type="input"
                  v-model="model.LS_ASSESSMENT_NAME"
                  placeholder="ENTER NAME "
                  class="float-right col-8 form-control form-control-md"
                />
              </div>
            </div>
            <br />
            <br /><br />
            <div class="row">
              <div class="col-10">
                <button
                  @click="submitLsAssessment"
                  type="button"
                  class="float-right btn btn-primary btn-fill btn-md"
                >
                  <i class="fa fa-save" />&nbsp; SAVE
                </button>
              </div>
            </div>
            <br /><br />
            <va-card class="mt-2">
              <va-data-table
                :fields="LsAssessmentList"
                :data="filteredLsAssessment"
                :per-page="parseInt(perPage)"
                :datacount="LsAssessmentCount"
               :dataperpage="parseInt(perPage)"
                clickable
              >
                <template slot="no" slot-scope="row">
                  {{ row.rowIndex + 1 }}
                </template>

                <template slot="actions" slot-scope="props">
                  <h4 class="mt-2">
                    <span
                      class="badge badge-primary mr-1"
                      v-on:click="editLsAssessment(props.rowData)"
                    >
                      <i class="fa fa-edit"></i
                    ></span>
                    <span
                      class="badge badge-danger mr-1"
                      v-on:click="deleteLsAssessment(props.rowData)"
                    >
                      <i class="fa fa-trash"></i
                    ></span>
                  </h4>
                </template>
              </va-data-table>
              <br />
            </va-card>

            <div class="row col ml-2 mt-2">
            </div>

            <br /><br />
          </va-card>
        </b-collapse>
        <hr />
      </div> -->

      <div>
        <span>REVOCATION APPROVAL DAYS</span>
        <button
          v-if="visibleBlockDuration15 == false"
          v-b-toggle.collapse-15
          type="button"
          class="float-right btn-fill btn-md"
        >
          <i class="fa fa-edit"></i>
        </button>
        <button
          v-if="visibleBlockDuration15 == true"
          v-b-toggle.collapse-15
          type="button"
          class="float-right btn-fill btn-md"
        >
          <i class="fa fa-times"></i>
        </button>
        <b-collapse
          class="mt-4"
          id="collapse-15"
          v-model="visibleBlockDuration15"
        >
          <va-card>
            <br />
             <form  @submit.prevent="submitREVOCATION()">
            <div class="row">
              <div class="ml-4 col-md-10">
                <span class="col mt-3 description">REVOCATION APPROVAL DAYS <span class="start"> * </span></span>
                <input
                  type="input"
                  v-model="model.REVOCATION_APPROVAL_DAYS"
                  placeholder="ENTER DAYS "
                  class="float-right col-8 form-control form-control-md"
                  required
                />
              </div>
            </div>
            <br />
            <br /><br />
            <div class="row">
              <div class="col-10">
                <button
                  type="submit"
                  class="float-right btn btn-primary btn-fill btn-md"
                >
                  <i class="fa fa-save" />&nbsp; SAVE
                </button>
              </div>
            </div>
            </form>
            <br /><br />
            <!-- <va-card class="mt-2">
              <va-data-table
                :fields="QRList"
                :data="filteredQR"
                :per-page="parseInt(perPage)"
                :datacount="QRCount"
              :dataperpage="parseInt(perPage)"
                clickable
              >
                <template slot="no" slot-scope="row">
                  {{ row.rowIndex + 1 }}
                </template>

                <template slot="actions" slot-scope="props">
                  <h4 class="mt-2">
                    <span
                      class="badge badge-primary mr-1"
                      v-on:click="editQR(props.rowData)"
                    >
                      <i class="fa fa-edit"></i
                    ></span>
                    <span
                      class="badge badge-danger mr-1"
                      v-on:click="deleteQR(props.rowData)"
                    >
                      <i class="fa fa-trash"></i
                    ></span>
                  </h4>
                </template>
              </va-data-table>
              <br />
            </va-card> -->

            <div class="row col ml-2 mt-2">
              <!-- pagination later -->
            </div>

            <br /><br />
          </va-card>
        </b-collapse>
        <hr />
      </div>
    </div>
    
    <!-- CPD Point  -->
    <vudal name="simpleModalEditFiveModule" class="widthModal">
      <div class="header">
        EDIT FIVE MODULE<i class="close icon">&times;</i>
      </div>
      <div class="content">
        <vue-form-generator
          :model="model"
          :schema="editFiveModuleSchema"
          :options="formOptions"
           ref="editFiveForm"
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
          @click="updateFiveModuleAPI"
          type="button"
          class="cancel vudal-btn mr-2 btn btn-primary btn-fill btn-md"
        >
          <i class="fa fa-edit" /> &nbsp; UPDATE
        </button>
      </div>
    </vudal>

    <!-- CPD Program  -->
    <vudal name="simpleModalEditCpdProgram" class="widthModal">
      <div class="header">
        CPD PROGRAM HOUR<i class="close icon">&times;</i>
      </div>
      <div class="content">
        <vue-form-generator
          :model="model"
          :schema="editCpdProgramSchema"
          :options="formOptions"
            ref="editCpdpForm"
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
          @click="updateCpdProgramAPI"
          type="button"
          class="cancel vudal-btn mr-2 btn btn-primary btn-fill btn-md"
        >
          <i class="fa fa-edit" /> &nbsp; UPDATE
        </button>
      </div>
    </vudal>
 

    <!-- RENEWAL CPD POINT Calculation -->
    <vudal name="simpleModalEditRenewal" class="widthModal">
      <div class="header">
        EDIT RENEWAL CPD POINT <i class="close icon">&times;</i>
      </div>
      <div class="content">
        <vue-form-generator
          :model="model"
          :schema="editRenewalSchema"
          :options="formOptions"
           ref="editRenewalForm"
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
          @click="updateRenewalAPI"
          type="button"
          class="cancel vudal-btn mr-2 btn btn-primary btn-fill btn-md"
        >
          <i class="fa fa-edit" /> &nbsp; UPDATE
        </button>
      </div>
    </vudal>


    <!-- WAIVER REASON -->
    <vudal name="simpleModalEditWaiverReason" class="widthModal">
      <div class="header">
        EDIT WAIVER REASON<i class="close icon">&times;</i>
      </div>
      <div class="content">
        <vue-form-generator
          :model="model"
          :schema="editWaiverReasonSchema"
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
          @click="updateWaiverReasonAPI"
          type="button"
          class="cancel vudal-btn mr-2 btn btn-primary btn-fill btn-md"
        >
          <i class="fa fa-edit" /> &nbsp; UPDATE
        </button>
      </div>
    </vudal>

    <!-- CPD Rule -->
    <vudal name="simpleModalEditCpdRule" class="widthModal">
      <div class="header">EDIT CPD RULE <i class="close icon">&times;</i></div>
      <div class="content">
        <vue-form-generator
          :model="model"
          :schema="editCPDRuleSchema"
          :options="formOptions"
            ref="editCPDRuleForm"
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
          @click="updateCPDRuleAPI"
          type="button"
          class="cancel vudal-btn mr-2 btn btn-primary btn-fill btn-md"
        >
          <i class="fa fa-edit" /> &nbsp; UPDATE
        </button>
      </div>
    </vudal>

    <!-- TR MODE pre and post vetting -->
    <vudal name="simpleModalEditTRMode" class="widthModal">
      <div class="header">
        EDIT TRAINING MODE <i class="close icon">&times;</i>
      </div>
      <div class="content">
        <vue-form-generator
          :model="model"
          :schema="editTRModeSchema"
          :options="formOptions"
           ref="editTRForm"
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
          @click="updateTRModeAPI"
          type="button"
          class="cancel vudal-btn mr-2 btn btn-primary btn-fill btn-md"
        >
          <i class="fa fa-edit" /> &nbsp; UPDATE
        </button>
      </div>
    </vudal>

<!-- TR MODE 5 Module and Writing -->
<vudal name="simpleModalEditFiveModuleTRMode" class="widthModal">
      <div class="header">
        EDIT 5 MODULE TRAINING MODE <i class="close icon">&times;</i>
      </div>
      <div class="content">
        <vue-form-generator
          :model="model"
          :schema="editFiveModuleTRModeSchema"
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
          @click="updateFiveModuleTRModeAPI"
          type="button"
          class="cancel vudal-btn mr-2 btn btn-primary btn-fill btn-md"
        >
          <i class="fa fa-edit" /> &nbsp; UPDATE
        </button>
      </div>
    </vudal>
    <!-- TR MODE READING -->
    <vudal name="simpleModalEditReadingTrMode" class="widthModal">
      <div class="header">
        EDIT TRAINING PROGRAM TYPE <i class="close icon">&times;</i>
      </div>
      <div class="content">
        <vue-form-generator
          :model="model"
          :schema="editReadingTrModeSchema"
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
          @click="updateReadingTRModeAPI"
          type="button"
          class="cancel vudal-btn mr-2 btn btn-primary btn-fill btn-md"
        >
          <i class="fa fa-edit" /> &nbsp; UPDATE
        </button>
      </div>
    </vudal>

    <!-- --------TR PROGRAM TYPE-------- -->
    <vudal name="simpleModalEditTRType" class="widthModal">
      <div class="header">
        EDIT TRAINING PROGRAM TYPE <i class="close icon">&times;</i>
      </div>
      <div class="content">
        <vue-form-generator
          :model="model"
          :schema="editTRTypeSchema"
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
          @click="updateTRTypeAPI"
          type="button"
          class="cancel vudal-btn mr-2 btn btn-primary btn-fill btn-md"
        >
          <i class="fa fa-edit" /> &nbsp; UPDATE
        </button>
      </div>
    </vudal>
    <!-- --------------------MODULE CODE ------------------ -->
    <vudal name="simpleModalEditModuleCode" class="widthModal">
      <div class="header">
        EDIT MODULE CODE <i class="close icon">&times;</i>
      </div>
      <div class="content">
        <vue-form-generator
          :model="model"
          :schema="editModuleCodeSchema"
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
          @click="updateModuleCodeAPI"
          type="button"
          class="cancel vudal-btn mr-2 btn btn-primary btn-fill btn-md"
        >
          <i class="fa fa-edit" /> &nbsp; UPDATE
        </button>
      </div>
    </vudal>
    <!-- -----------------Financial Planner------------------ -->
    <vudal name="simpleModalEditFinancialPlanner" class="widthModal">
      <div class="header">
        EDIT FINANCIAL PLANNER<i class="close icon">&times;</i>
      </div>
      <div class="content">
        <vue-form-generator
          :model="model"
          :schema="editFinancialPlannerSchema"
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
          @click="updateFinancialPlannerAPI"
          type="button"
          class="cancel vudal-btn mr-2 btn btn-primary btn-fill btn-md"
        >
          <i class="fa fa-edit" /> &nbsp; UPDATE
        </button>
      </div>
    </vudal>
    <!-- Qualification Mode -->

    <vudal name="simpleModalEditQRMode" class="widthModal">
      <div class="header">
        EDIT QUALIFICATION MODE<i class="close icon">&times;</i>
      </div>
      <div class="content">
        <vue-form-generator
          :model="model"
          :schema="editQRSchema"
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
          @click="updateQRAPI"
          type="button"
          class="cancel vudal-btn mr-2 btn btn-primary btn-fill btn-md"
        >
          <i class="fa fa-edit" /> &nbsp; UPDATE
        </button>
      </div>
    </vudal>
  <!-- Ls media -->
  <!-- <vudal name="simpleModalEditLsMedia" class="widthModal">
      <div class="header">
        EDIT LEARNING SUB MEDIA<i class="close icon">&times;</i>
      </div>
      <div class="content">
        <vue-form-generator
          :model="model"
          :schema="editLsMediaSchema"
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
          @click="updateLsMediaAPI"
          type="button"
          class="cancel vudal-btn mr-2 btn btn-primary btn-fill btn-md"
        >
          <i class="fa fa-edit" /> &nbsp; UPDATE
        </button>
      </div>
    </vudal> -->
    <!-- Ls method -->
    <!-- <vudal name="simpleModalEditLsMethod" class="widthModal">
      <div class="header">
        EDIT LEARNING SUB METHOD<i class="close icon">&times;</i>
      </div>
      <div class="content">
        <vue-form-generator
          :model="model"
          :schema="editLsMethodSchema"
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
          @click="updateLsMethodAPI"
          type="button"
          class="cancel vudal-btn mr-2 btn btn-primary btn-fill btn-md"
        >
          <i class="fa fa-edit" /> &nbsp; UPDATE
        </button>
      </div>
    </vudal> -->
    <!-- Ls Assessment -->
    <!-- <vudal name="simpleModalEditLsAssessment" class="widthModal">
      <div class="header">
        EDIT LEARNING SUB ASSESMENT<i class="close icon">&times;</i>
      </div>
      <div class="content">
        <vue-form-generator
          :model="model"
          :schema="editLsAssessmentSchema"
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
          @click="updateLsAssessmentAPI"
          type="button"
          class="cancel vudal-btn mr-2 btn btn-primary btn-fill btn-md"
        >
          <i class="fa fa-edit" /> &nbsp; UPDATE
        </button>
      </div>
    </vudal> -->
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
import Vudal from "vudal";
import "vue-form-generator/dist/vfg.css";
import * as servicesModule0 from "../../../app/module0/services02";
import { debounce } from "lodash";
Vue.component("field-vfg-functional-date", VfgFunctionalDate);
import VfgFunctionalDate from "../../component/VfgFunctionalCalendar.vue";
import moment from "moment";
import FullCalendar from "@fullcalendar/vue";
import interactionPlugin from "@fullcalendar/interaction";

export default {
  mounted() {
    this.getAllFiveModule();
    this.getAllCpdProgram();
    this.getAllWaiverReason();
    this.getAllRenewalCPD();
    this.getAllCPDRule();
    this.getAllTRMode();
    this.getAllTRType();
    this.getAllModuleCode();
    this.getAllFinancialPlanner();
    this.getAllQRMode();
    this.getAllFiveModuleTRMode();
    this.getAllReadingTRMode();
    this.getAllLsMedia();
    this.getAllLsMethod();
    this.getAllLsAssessment();
    // this.getAllCutOff();
    this.getDate();
    this.getRevocation();
  },
  components: {
    FullCalendar,
    Vudal,
  },
  // DATA SCHEMA
  data() {
    return {
      term: null,
      visibleLogin: false,
      visibleBlockDuration: false,
      visibleBlockDuration2: false,
      visibleBlockDuration3: false,
      visibleBlockDuration4: false,
      visibleBlockDuration5: false,
      visibleBlockDuration6: false,
      visibleBlockDuration7: false,
      visibleBlockDuration8: false,
      visibleBlockDuration9: false,
      visibleBlockDuration10: false,
      visibleBlockDuration11: false,
      visibleBlockDuration12: false,
      visibleBlockDuration13: false,
      visibleBlockDuration14: false,
      visibleBlockDuration15: false,

      visibleSessionTimeout: false,
      perPage: "10",
      perPageOptions: ["4", "6", "10", "20"],
      FiveModuleList: [],
      CpdProgramList: [],
      WaiverReasonList: [],
      RenewalCPDList: [],
      RulePointList: [],
      TRModelist: [],
      TRTypelist: [],
      ModuleCodelist: [],
      FinancialPlannerlist: [],
      LsMedialist: [],
      QRModelist: [],
      CutOffDatelist: [],
      FiveModuleTR: [],
      ReadingTrMode: [],
      LsMethodlist: [],
      LsAssessmentlist: [],
      FiveModuleCount: null,
      CpdProgramCount: null,
      RenewalCount: null,
      WaiverCount: null,
      TrModeCount: null,
      CpdRuleCount: null,
      TrProgramCount: null,
      ModuleCodeCount: null,
      FinancialCount: null,
      QRCount: null,
      fiveModuleTrModeCount: null,
      ReadingTrModeCount: null,
      LsMediaCount: null,
      LsMethodCount: null,
      LsAssessmentCount: null,
      loading: false,
      currentDate: '2018-10-04',

      count: 1,

      model: {
        // TAB 1
        CPD_PROGRAM_NAME: "",
        CPD_MAX: "",
        CPD_MIN: "",
        WAIVER_REASON: "",
        CPD_RULE_POINT: "",
        CPD_SETTING_NAME: "",
        CPD_SETTING_MODE: "",
        CPD_SETTING_INDEX: "",
        CPD_SETTING_DESCRIPTION: "",
        CPD_SETTING_TYPE: "",
        CPD_CUT_OFF_START_DATE: "",
        CPD_CUT_OFF_END_DATE: "",
        RENEWAL_MONTH: "",
        RENEWAL_CALC: "",
        RENEWAL_REQUIREMENT: "",
        EFFECTIVE_DATE: "",
        TR_MODE_NAME: '',
        MAX_POINT: "",
        MIN_POINT: "",
        FIVE_MODULE_TR_MODE_NAME: '',
        READING_TR_MODE_NAME: '',
        QR_MODE_NAME: '',
        FP_CODE_NAME: '',
        TR_PROGRAM_TYPE_NAME: '',
        MODULE_CODE_NAME: '',
        LS_MEDIA_NAME: '',
        LS_METHOD_NAME: '',
        LS_ASSESSMENT_NAME: '',
        CPD_RULE_TYPE: '',
        CPD_RULE_CONDITION: '',
        CPD_RULE_POINT: '',
        CPD_CUT_OFF_DATE: "",
        REVOCATION_APPROVAL_DAYS: "",

        addCpd:{
            CPD_PROGRAM_NAME: "",
            CPD_MAX: "",
            CPD_MIN: "",
        },


        editFiveModule: {
          CPD_PROGRAM_NAME:'',
          CPD_MIN:'',
          CPD_MAX: '',

        },

        editCpdProgram: {
          CPD_PROGRAM_NAME:'',
          CPD_MIN:'',
          CPD_MAX: '',

        },

        editRenewal: {
        RENEWAL_MONTH: "",
        RENEWAL_CALC: "",
        RENEWAL_REQUIREMENT: "",
        EFFECTIVE_DATE: "",

        },
        editWaiver: {
        WAIVER_REASON: '',

        },

        editTrMode: {
        TR_MODE_NAME: '',
         MAX_POINT: "",
        MIN_POINT: "",

        },
        editFiveModuleTrMode: {
        FIVE_MODULE_TR_MODE_NAME: '',
        },

        editReadingTrMode: {
        READING_TR_MODE_NAME: '',
        },

        editCpdRule: {
        CPD_RULE_TYPE: '',
        CPD_RULE_CONDITION: '',
        CPD_RULE_POINT: '',
        

        },

        editTrProgram: {
          TR_PROGRAM_TYPE_NAME: '',

        },

        editModuleCoded: {
       MODULE_CODE_NAME:'',

        },
        editFinancial: {
        FP_CODE_NAME:'',

        },
        editQR: {
        QR_MODE_NAME: "",

        },
        editLsMedia: {
        LS_MEDIA_NAME: "",

        },
        editLsMethod: {
        LS_METHOD_NAME: "",

        },
        editLsAssessment: {
        LS_ASSESSMENT_NAME: "",

        },
         editDate: {
        CPD_CUT_OFF_START_DATE: "",
        CPD_CUT_OFF_END_DATE: "",

        },



      },

      formOptions: {
        validateAfterChanged: true,
      },
      //5 Module CPD Calculation

      editFiveModuleSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "input",
                inputType: "Text",
                model: "editFiveModule.CPD_PROGRAM_NAME",
                label: "MODULE NAME ",
                placeholder: "ENTER MODULE NAME",
                styleClasses: "col-md-12",
                required: true,
                validator: "required",
              },
               {
                type: "input",
                inputType: "number",
                model: "editFiveModule.CPD_MIN",
                label: "CPD MINIMUM",
                placeholder: "ENTER MIN POINT",
                styleClasses: "col-md-12",
                required: true,
                validator: "number",
              },
              {
                type: "input",
                inputType: "number",
                model: "editFiveModule.CPD_MAX",
                label: "CPD MAXIMUM",
                placeholder: "ENTER MAX POINT",
                styleClasses: "col-md-12",
                required: true,
                validator: "number",
              },
             
            ],
          },
        ],
      },

      editCpdProgramSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "input",
                inputType: "Text",
                model: "editCpdProgram.CPD_PROGRAM_NAME",
                label: "MODULE NAME ",
                placeholder: "ENTER MODULE NAME",
                styleClasses: "col-md-12",
                required: true,
                validator: "required",
              },
             
              {
                type: "input",
                inputType: "number",
                model: "editCpdProgram.CPD_MIN",
                label: "CPD MINIMUM",
                placeholder: "ENTER MIN POINT",
                styleClasses: "col-md-12",
                required: true,
                validator: "number",
              },
               {
                type: "input",
                inputType: "number",
                model: "editCpdProgram.CPD_MAX",
                label: "CPD MAXIMUM",
                placeholder: "ENTER MAX POINT",
                styleClasses: "col-md-12",
                required: true,
                validator: "number",
              },
            ],
          },
        ],
      },
        // Renewal CPD Point

        editRenewalSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "input",
                inputType: "number",
                model: "editRenewal.RENEWAL_MONTH",
                label: "MONTH",
                placeholder: "ENTER MONTH",
                styleClasses: "col-md-12",
                required: true,
                validator: "number",
              },
              {
                type: "input",
                inputType: "number",
                model: "editRenewal.RENEWAL_CALC",
                label: "CALCULATION",
                placeholder: "ENTER CALCULATION",
                styleClasses: "col-md-12",
                required: true,
                validator: "number",
              },
              {
                type: "input",
                inputType: "number",
                model: "editRenewal.RENEWAL_REQUIREMENT",
                label: "REQUIREMENT",
                placeholder: "ENTER REQUIREMENT",
                styleClasses: "col-md-12",
                required: true,
                validator: "number",
              },
              {
                labels: "Start Date",
                type: "vfg-functional-date",
                placeholder: "Start Date",
                model: "editRenewal.EFFECTIVE_DATE",
                typeable: false,
                noClearButton: true,
                format: "yyyy-MM-dd",
                styleClasses: "col-md-12",
                required: true,
                validator:"date",
              },
            ],
          },
        ],
      },


      //Waiver

      editWaiverReasonSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "input",
                inputType: "Text",
                model: "editWaiver.WAIVER_REASON",
                label: "REASON ",
                placeholder: "Enter Reason",
                required: true,
                validator: "required",
                styleClasses: "col-md-12",
              },
            ],
          },
        ],
      },

      // CPD Rule
      editCPDRuleSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
               {
                type: "input",
                inputType: "Text",
                model: "editCpdRule.CPD_RULE_TYPE",
                label: "CPD RULE TYPE ",
                placeholder: "ENTER CPD RULE TYPE ",
                required: true,
                validator: "required",
                styleClasses: "col-md-12",
              },
               {
                type: "input",
                inputType: "Text",
                model: "editCpdRule.CPD_RULE_CONDITION",
                label: "CPD CONDITION ",
                placeholder: "ENTER CPD CONDITION",
                required: true,
                validator: "required",
                styleClasses: "col-md-12",
              },
              {
                type: "input",
                inputType: "number",
                model: "editCpdRule.CPD_RULE_POINT",
                label: "CPD REQUIREMENT ",
                placeholder: "ENTER CPD REQUIREMENT POINT ",
                required: true,
                validator: "number",
                styleClasses: "col-md-12",
              },
            ],
          },
        ],
      },

      // -----TR Mode----
      editTRModeSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "input",
                inputType: "Text",
                model: "editTrMode.TR_MODE_NAME",
                label: "PROGRAM NAME ",
                placeholder: "MODE NAME",
                styleClasses: "col-md-12",
                required: true,
                validator: "required",
              },
               {
                type: "input",
                inputType: "number",
                model: "editTrMode.MIN_POINT",
                label: "CPD MINIMUM",
                placeholder: "ENTER MIN POINT",
                styleClasses: "col-md-12",
                required: true,
                validator: "number",
              },
               {
                type: "input",
                inputType: "number",
                model: "editTrMode.MAX_POINT",
                label: "CPD MAXIMUM",
                placeholder: "ENTER MAX POINT",
                styleClasses: "col-md-12",
                required: true,
                validator: "number",
              },
            ],
          },
        ],
      },

        // tr Mode 5 Module
      editFiveModuleTRModeSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "input",
                inputType: "Text",
                model: "editFiveModuleTrMode.FIVE_MODULE_TR_MODE_NAME",
                label: "PROGRAM NAME ",
                placeholder: "MODE NAME",
                styleClasses: "col-md-12",
                required: true,
                validator: "required",
              },
            ],
          },
        ],
      },

      // READING TR MODE
      editReadingTrModeSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "input",
                inputType: "Text",
                model: "editReadingTrMode.READING_TR_MODE_NAME",
                label: "MODE NAME ",
                placeholder: "MODE NAME",
                styleClasses: "col-md-12",
                required: true,
                validator: "required",
              },
            ],
          },
        ],
      },
      // ------TR Program Type----
      editTRTypeSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "input",
                inputType: "Text",
                model: "editTrProgram.TR_PROGRAM_TYPE_NAME",
                label: "PROGRAM NAME ",
                placeholder: "Enter Program Name",
                styleClasses: "col-md-12",
                required: true,
                validator: "required",
              },
            ],
          },
        ],
      },

      editModuleCodeSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "input",
                inputType: "Text",
                model: "editModuleCoded.MODULE_CODE_NAME",
                label: "NAME ",
                placeholder: "Enter Name",
                styleClasses: "col-md-12",
                required: true,
                validator: "required",
              },
            ],
          },
        ],
      },

      //Financial Program
      editFinancialPlannerSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "input",
                inputType: "Text",
                model: "editFinancial.FP_CODE_NAME",
                label: "NAME ",
                placeholder: "NAME",
                required: true,
                validator: "required",
                styleClasses: "col-md-12",
              },
            ],
          },
        ],
      },

      editQRSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "input",
                inputType: "Text",
                model: "editQR.QR_MODE_NAME",
                label: "NAME ",
                placeholder: "NAME",
                required: true,
                validator: "required",
                styleClasses: "col-md-12",
              },
              // {
              //   type: "input",
              //   inputType: "Text",
              //   model: "editQR.CPD_SETTING_DESCRIPTION",
              //   label: "DESCRIPTION ",
              //   placeholder: "ENTER DESCRIPTION",
              //   required: true,
              //   styleClasses: "col-md-12",
              // },
            ],
          },
        ],
      },
      editLsMediaSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "input",
                inputType: "Text",
                model: "editLsMedia.LS_MEDIA_NAME",
                label: "NAME ",
                placeholder: "NAME",
                required: true,
                styleClasses: "col-md-12",
              },
            ],
          },
        ],
      },
      editLsMethodSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "input",
                inputType: "Text",
                model: "editLsMethod.LS_METHOD_NAME",
                label: "NAME ",
                placeholder: "NAME",
                required: true,
                styleClasses: "col-md-12",
              },
            ],
          },
        ],
      },
      editLsAssessmentSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "input",
                inputType: "Text",
                model: "editLsAssessment.LS_ASSESSMENT_NAME",
                label: "NAME ",
                placeholder: "NAME",
                required: true,
                styleClasses: "col-md-12",
              },
            ],
          },
        ],
      },

    };
  },
  methods: {
     back() {
      this.$router.push("/fimm/bymodule-list");
    },
    searchDate(date) {
      this.term = moment(date).format("DD MMM yy");
      //alert(this.term);
    },
    onlyNumber ($event) {
        let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
        if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) { // 46 is dot
        $event.preventDefault();
        }
      },
    // ---------------------5 modules hours-----------
    getAllFiveModule: async function () {
      const response = await servicesModule0.getAllFiveModuleList("506");
      this.FiveModuleList = response;
      this.FiveModuleCount = this.FiveModuleList.length;
    },

    async submit() {
      let app = this;
      var param = app.model;
      const data = new FormData();
      data.append("CPD_PROGRAM_NAME", this.model.CPD_PROGRAM_NAME);
      data.append("CPD_MIN", this.model.CPD_MIN);
      data.append("CPD_MAX", this.model.CPD_MAX);
      data.append("CPD_PROGRAM_TYPE", "506");
      try {
        // eslint-disable-next-line no-unused-vars
        const response = await servicesModule0.createFiveModule(data);
        this.getAllFiveModule();
        this.model.CPD_PROGRAM_NAME="";
         this.model.CPD_MIN="";
         this.model.CPD_MAX="";
        // this.$modals.simpleModal.$hide()
      } catch (error) {
        console.log(error);
      }
    },

    async editFiveModule(data) {
      const response = await servicesModule0.getFiveModuleById(
        data.CPD_HOURS_ID
      );
      this.$modals.simpleModalEditFiveModule.$show();
      this.CPD_HOURS_ID = response.CPD_HOURS_ID;
      this.model.editFiveModule = response;
      // this.model.CPD_PROGRAM_NAME = response;
      // this.model.CPD_MIN = response;
      // this.model.CPD_MAX = response;
      console.log(response);
    },

    async updateFiveModuleAPI() {
     
        const data = new FormData();
        data.append("CPD_HOURS_ID", this.CPD_HOURS_ID);
        data.append("CPD_PROGRAM_NAME", this.model.editFiveModule.CPD_PROGRAM_NAME);
        data.append("CPD_MIN", this.model.editFiveModule.CPD_MIN);
        data.append("CPD_MAX", this.model.editFiveModule.CPD_MAX);
        if(this.$refs.editFiveForm.validate()) {
          try {
            const response = await servicesModule0.updateFiveModule(data);
            this.getAllFiveModule();
            } catch (error) {
            console.log(error);
            }
        }
        else
        {
          this.$modals.simpleModalEditFiveModule.$show();
          this.editFiveModule(data);
        }
    },

    async deleteFiveModule(data) {
      if (confirm("Are you sure you want to delete?")) {
      // eslint-disable-next-line no-unused-vars
      const response = await servicesModule0.deleteFiveModule(
        data.CPD_HOURS_ID
      );
      this.getAllFiveModule();
      }
    },

    // CPD PROGRAM HOURS CALC

    getAllCpdProgram: async function () {
      const response = await servicesModule0.getAllCPDProgramList("507");
      this.CpdProgramList = response;
      this.CpdProgramCount = this.CpdProgramList.length;
    },

    async submitCpdProgram() {
      let app = this;
      var param = app.model;
      const data = new FormData();
      data.append("CPD_PROGRAM_NAME", this.model.addCpd.CPD_PROGRAM_NAME);
      data.append("CPD_MIN", this.model.addCpd.CPD_MIN);
      data.append("CPD_MAX", this.model.addCpd.CPD_MAX);
      data.append("CPD_PROGRAM_TYPE", "507");
      try {
        // eslint-disable-next-line no-unused-vars
        const response = await servicesModule0.createCpdProgram(data);
        this.getAllCpdProgram();
        this.model.addCpd.CPD_PROGRAM_NAME="";
        this.model.addCpd.CPD_MIN="";
        this.model.addCpd.CPD_MAX="";
        // this.$modals.simpleModal.$hide()
      } catch (error) {
        console.log(error);
      }
    },

    async editCpdProgram(data) {
      const response = await servicesModule0.getCpdProgramById(
        data.CPD_HOURS_ID
      );
      this.$modals.simpleModalEditCpdProgram.$show();
      this.CPD_HOURS_ID = response.CPD_HOURS_ID;
      this.model.editCpdProgram = response;
      // this.model.CPD_PROGRAM_NAME = response;
      // this.model.CPD_MIN = response;
      // this.model.CPD_MAX = response;
      console.log(response);
    },

    async updateCpdProgramAPI() {
      
        const data = new FormData();
        data.append("CPD_HOURS_ID", this.CPD_HOURS_ID);
        data.append("CPD_PROGRAM_NAME", this.model.editCpdProgram.CPD_PROGRAM_NAME);
        data.append("CPD_MIN", this.model.editCpdProgram.CPD_MIN);
        data.append("CPD_MAX", this.model.editCpdProgram.CPD_MAX);
         if(this.$refs.editCpdpForm.validate()) {
            try {
            const response = await servicesModule0.updateCpdProgram(data);
            this.getAllCpdProgram();
            } catch (error) {
            console.log(error);
            }
         }
         else
         {
          this.$modals.simpleModalEditCpdProgram.$show();
          this.editCpdProgram(data)
         }
    },

    async deleteCpdProgram(data) {
      if (confirm("Are you sure you want to delete?")) {
      // eslint-disable-next-line no-unused-vars
      const response = await servicesModule0.deleteCpdProgram(
        data.CPD_HOURS_ID
      );
      this.getAllCpdProgram();
      }
    },

    // Waiver Java

    getAllWaiverReason: async function () {
      const response = await servicesModule0.getAllWaiverReasonList();
      this.WaiverReasonList = response;
      this.WaiverCount = this.WaiverReasonList.length;
    },

    async submitWaiver() {
      let app = this;
      var param = app.model;
      const data = new FormData();
      data.append("WAIVER_REASON", this.model.WAIVER_REASON);
      try {
        // eslint-disable-next-line no-unused-vars
        const response = await servicesModule0.createWaiverReason(data);
        this.getAllWaiverReason();
        this.model.WAIVER_REASON="";
        // this.$modals.simpleModal.$hide()
      } catch (error) {
        console.log(error);
      }
    },
    async updateWaiverReasonAPI() {
      try {
        const data = new FormData();
        data.append("WAIVER_REASON_ID", this.WAIVER_REASON_ID);
        data.append("WAIVER_REASON", this.model.editWaiver.WAIVER_REASON);
        const response = await servicesModule0.updateWaiverReason(data);
        this.getAllWaiverReason();
      } catch (error) {
        console.log(error);
      }
    },

    async deleteWaiverReason(data) {
      if (confirm("Are you sure you want to delete?")) {
      // eslint-disable-next-line no-unused-vars
      const response = await servicesModule0.deleteWaiverReason(
        data.WAIVER_REASON_ID
      );
      this.getAllWaiverReason();
      }
    },

    async editWaiverReason(data) {
     /* const response = await servicesModule0.getWaiverReasonById(
        data.WAIVER_REASON_ID
      );*/
     // console.log("Waiver-Reason=",data);
      this.$modals.simpleModalEditWaiverReason.$show();
      this.WAIVER_REASON_ID = data.WAIVER_REASON_ID;
      this.model.editWaiver = data;
      //console.log(response)
    },

    //------------- RENEWAL CPD POINT

    getAllRenewalCPD: async function () {
      const response = await servicesModule0.getAllRenewalCPDList();
      this.RenewalCPDList = response;
      this.RenewalCount = this.RenewalCPDList.length;
    },

    async submitRenewal() {
      let app = this;
      var param = app.model;
      var cdate = "";
      const data = new FormData();
      cdate = moment(this.model.EFFECTIVE_DATE).format('YYYY-MM-DD');
      data.append("RENEWAL_MONTH", this.model.RENEWAL_MONTH);
      data.append("RENEWAL_CALC", this.model.RENEWAL_CALC);
      data.append("RENEWAL_REQUIREMENT", this.model.RENEWAL_REQUIREMENT);
       data.append("EFFECTIVE_DATE", cdate);
       //console.log("Effective Date=",cdate);
      try {
        // eslint-disable-next-line no-unused-vars
        const response = await servicesModule0.createRenewalCPD(data);
        this.getAllRenewalCPD();
        this.model.RENEWAL_MONTH="";
        this.model.RENEWAL_CALC="";
        this.model.RENEWAL_REQUIREMENT="";
        this.model.EFFECTIVE_DATE="";
        // this.$modals.simpleModal.$hide()
      } catch (error) {
        console.log(error);
      }
    },

    async updateRenewalAPI() {
     
        const data = new FormData();
        var cdate = "";
         cdate = moment(this.model.editRenewal.EFFECTIVE_DATE).format('YYYY-MM-DD');
        data.append("CPD_RENEWAL_CALC_ID", this.CPD_RENEWAL_CALC_ID);
        data.append("RENEWAL_MONTH", this.model.editRenewal.RENEWAL_MONTH);
        data.append("RENEWAL_CALC", this.model.editRenewal.RENEWAL_CALC);
        data.append("RENEWAL_REQUIREMENT", this.model.editRenewal.RENEWAL_REQUIREMENT);
        data.append("EFFECTIVE_DATE", cdate);
          if(this.$refs.editRenewalForm.validate()) {
            try {
            const response = await servicesModule0.updateCPDRenewal(data);
            this.getAllRenewalCPD();
              } catch (error) {
                console.log(error);
              }
         }
         else{
        this.$modals.simpleModalEditRenewal.$show();
          this.editCPDRenewal(data);
         }
    },

    async deleteCPDRenewal(data) {
      if (confirm("Are you sure you want to delete?")) {
      // eslint-disable-next-line no-unused-vars
      const response = await servicesModule0.deleteCPDRenewal(
        data.CPD_RENEWAL_CALC_ID
      );
      this.getAllRenewalCPD();
      }
    },

    async editCPDRenewal(data) {
      const response = await servicesModule0.getCPDRenewalById(
        data.CPD_RENEWAL_CALC_ID
      );
      this.$modals.simpleModalEditRenewal.$show();
      this.CPD_RENEWAL_CALC_ID = response.CPD_RENEWAL_CALC_ID;
      this.model.editRenewal = response;
      console.log();
    },

    // CPD RULE

    getAllCPDRule: async function () {
      const response = await servicesModule0.getAllCPDRuleList();
      console.log("CPDRULE=",response);
      this.RulePointList = response;
      this.CpdRuleCount = this.RulePointList.length;
    },
    async submitRulePoint() {
      let app = this;
      var param = app.model;
      const data = new FormData();
      data.append("CPD_RULE_TYPE", this.model.CPD_RULE_TYPE);
      data.append("CPD_RULE_CONDITION", this.model.CPD_RULE_CONDITION);
      data.append("CPD_RULE_POINT", this.model.CPD_RULE_POINT);
      try {
        // eslint-disable-next-line no-unused-vars
        const response = await servicesModule0.createCpdRulePoint(data);
        this.getAllCPDRule();
        this.model.CPD_RULE_TYPE="";
        this.model.CPD_RULE_CONDITION="";
        this.model.CPD_RULE_POINT="";
        // this.$modals.simpleModal.$hide()
      } catch (error) {
        console.log(error);
      }
    },
    async editCPDRule(data) {
      const response = await servicesModule0.getCPDRuleById(
        data.CPD_RULE_CALC_ID
      );
      this.$modals.simpleModalEditCpdRule.$show();
      this.CPD_RULE_CALC_ID = response.CPD_RULE_CALC_ID;
      this.model.editCpdRule = response;
    },
    async deleteCPDRule(data) {
    //   // eslint-disable-next-line no-unused-vars
      const response = await servicesModule0.deleteCPDRule(
        data.CPD_RULE_CALC_ID
      );
       this.getAllCPDRule();
    },
    async updateCPDRuleAPI() {
      
        const data = new FormData();
        data.append("CPD_RULE_CALC_ID", this.CPD_RULE_CALC_ID);
        data.append("CPD_RULE_POINT", this.model.editCpdRule.CPD_RULE_POINT);
        data.append("CPD_RULE_TYPE", this.model.editCpdRule.CPD_RULE_TYPE);
        data.append("CPD_RULE_CONDITION", this.model.editCpdRule.CPD_RULE_CONDITION);

        // console.log("data :" + data);
        // eslint-disable-next-line no-unused-vars
        if(this.$refs.editCPDRuleForm.validate()) {
          try {
          const response = await servicesModule0.updateCPDRule(data);
          this.getAllCPDRule();
          } catch (error) {
          console.log(error);
          }
        }
        else
        {
            this.$modals.simpleModalEditCpdRule.$show();
            this. editCPDRule(data)
        }
    },

    // -----------------TR_MODE pre and post vetting --------------
    getAllTRMode: async function () {
      const response = await servicesModule0.getAllTRModeList();
      this.TRModelist = response;
      this.TrModeCount = this. TRModelist.length;
    },

    async submitTRMode() {
      let app = this;
      var param = app.model;
      const data = new FormData();
      data.append("TR_MODE_NAME", this.model.TR_MODE_NAME);
      data.append("MIN_POINT", this.model.MIN_POINT);
       data.append("MAX_POINT", this.model.MAX_POINT);
      try {
        // eslint-disable-next-line no-unused-vars
        const response = await servicesModule0.createTRMode(data);
        this.getAllTRMode();
        this.model.TR_MODE_NAME="";
        this.model.MAX_POINT="";
        this.model.MIN_POINT="";
        // this.$modals.simpleModal.$hide()
      } catch (error) {
        console.log(error);
      }
    },
    async editTRMode(data) {
      const response = await servicesModule0.getTRModeById(data.TR_MODE_ID);
      this.$modals.simpleModalEditTRMode.$show();
      console.log("TR MODE=", response);
      this.TR_MODE_ID = response.TR_MODE_ID;
     // this.model.editTrMode.TR_MODE_NAME = response.TR_MODE_NAME;
     // this.model.editTrMode.TR_MIN = response.MIN_POINT;
      // this.model.editTrMode.TR_MAX = response.MIN_POINT;
      this.model.editTrMode = response;
      console.log(response)
    },

    async updateTRModeAPI() {
     
        const data = new FormData();
        data.append("TR_MODE_ID", this.TR_MODE_ID);
        data.append("TR_MODE_NAME", this.model.editTrMode.TR_MODE_NAME);
        data.append("MIN_POINT", this.model.editTrMode.MIN_POINT);
         data.append("MAX_POINT", this.model.editTrMode.MAX_POINT);
        // console.log("data :" + data);
        // eslint-disable-next-line no-unused-vars
        if(this.$refs.editTRForm.validate()) {
          try {
          const response = await servicesModule0.updateTRMode(data);
          this.getAllTRMode();
          } catch (error) {
             console.log(error);
          }
        }
        else
         {
          this.$modals.simpleModalEditTRMode.$show();
          this.editTRMode(data);
         }
    },

    async deleteTRMode(data) { 
      if (confirm("Are you sure you want to delete?")) {
      // eslint-disable-next-line no-unused-vars
      const response = await servicesModule0.deleteTRMode(
        data.TR_MODE_ID
      );
      this.getAllTRMode();
      }
    },

    // --------------------- 5 modules TR MODE ----------------

    getAllFiveModuleTRMode: async function () {
      const response = await servicesModule0.getAll5moduleTRModeList();
      this.FiveModuleTR = response;
      this.fiveModuleTrModeCount = this. FiveModuleTR.length;
    },
    async submit5moduleTRMode() {
      let app = this;
      var param = app.model;
      const data = new FormData();
      data.append("FIVE_MODULE_TR_MODE_NAME", this.model.FIVE_MODULE_TR_MODE_NAME);
      try {
        // eslint-disable-next-line no-unused-vars
        const response = await servicesModule0.create5moduleTRMode(data);
        this.getAllFiveModuleTRMode();
        // this.$modals.simpleModal.$hide()
        this.model.FIVE_MODULE_TR_MODE_NAME="";
      } catch (error) {
        console.log(error);
      }
    },
    async editFiveModuleTRMode(data) {
      const response = await servicesModule0.get5moduleTRModeById(data.FIVE_MODULE_TR_MODE_ID);
      this.$modals.simpleModalEditFiveModuleTRMode.$show();
      this.FIVE_MODULE_TR_MODE_NAME = response.FIVE_MODULE_TR_MODE_NAME;
      this.FIVE_MODULE_TR_MODE_ID=response.FIVE_MODULE_TR_MODE_ID;
      this.model.editFiveModuleTrMode = response;
      console.log(response)
    },

    async updateFiveModuleTRModeAPI() {
      try {
        const data = new FormData();
        data.append("FIVE_MODULE_TR_MODE_ID", this.FIVE_MODULE_TR_MODE_ID);
        data.append("FIVE_MODULE_TR_MODE_NAME", this.model.editFiveModuleTrMode.FIVE_MODULE_TR_MODE_NAME);
        // console.log("data :" + data);
        // eslint-disable-next-line no-unused-vars
        const response = await servicesModule0.update5moduleTRMode(data);
        this.getAllFiveModuleTRMode();
      } catch (error) {
        console.log(error);
      }
    },

    async deleteFiveModuleTRMode(data) {
      if (confirm("Are you sure you want to delete?")) {
      // eslint-disable-next-line no-unused-vars
      const response = await servicesModule0.delete5moduleTRMode(
        data.FIVE_MODULE_TR_MODE_ID
      );
      this.getAllFiveModuleTRMode();
      }
    },
    // --------------------- Reading TR MODE ----------------

    getAllReadingTRMode: async function () {
      const response = await servicesModule0.getAllReadingTRModeList();
      this.ReadingTrMode = response;
      this.ReadingTrModeCount = this. ReadingTrMode.length;
    },
    async submitReadingTRMode() {
      let app = this;
      var param = app.model;
      const data = new FormData();
      data.append("READING_TR_MODE_NAME", this.model.READING_TR_MODE_NAME);
      try {
        // eslint-disable-next-line no-unused-vars
        const response = await servicesModule0.createReadingTRMode(data);
        this.getAllReadingTRMode();
        this.model.READING_TR_MODE_NAME="";
        // this.$modals.simpleModal.$hide()
      } catch (error) {
        console.log(error);
      }
    },
    async editReadingTRMode(data) {
      const response = await servicesModule0.getReadingTRModeById(data.READING_TR_MODE_ID);
      this.$modals.simpleModalEditReadingTrMode.$show();
      this.READING_TR_MODE_ID = response.READING_TR_MODE_ID;
      this.model.editReadingTrMode = response;
      console.log(response)
    },

    async updateReadingTRModeAPI() {
      try {
        const data = new FormData();
        data.append("READING_TR_MODE_ID", this.READING_TR_MODE_ID);
        data.append("READING_TR_MODE_NAME", this.model.editReadingTrMode.READING_TR_MODE_NAME);
        // console.log("data :" + data);
        // eslint-disable-next-line no-unused-vars
        const response = await servicesModule0.updateReadingTRMode(data);
        this.getAllReadingTRMode();
      } catch (error) {
        console.log(error);
      }
    },

    async deleteReadingTRMode(data) {
      if (confirm("Are you sure you want to delete?")) {
      // eslint-disable-next-line no-unused-vars
      const response = await servicesModule0.deleteReadingTRMode(
        data.READING_TR_MODE_ID
      );
      this.getAllReadingTRMode();
      }
    },
    // ---------------------- TR PROGRAM TYPE --------------
    getAllTRType: async function () {
      const response = await servicesModule0.getAllTRTypeList();
      this.TRTypelist = response;
      this.TrProgramCount  = this.TRTypelist.length;
    },
    async submitTRType() {
      let app = this;
      var param = app.model;
      const data = new FormData();
      data.append("TR_PROGRAM_TYPE_NAME", this.model.TR_PROGRAM_TYPE_NAME);
      try {
        // eslint-disable-next-line no-unused-vars
        const response = await servicesModule0.createTRType(data);
        this.getAllTRType();
        this.model.TR_PROGRAM_TYPE_NAME="";
        // this.$modals.simpleModal.$hide()
      } catch (error) {
        console.log(error);
      }
    },
    async editTRType(data) {
      const response = await servicesModule0.getTRTypeById(data.TR_PROGRAM_TYPE_ID);
      this.$modals.simpleModalEditTRType.$show();
      this.TR_PROGRAM_TYPE_ID = response.TR_PROGRAM_TYPE_ID;
      this.model.editTrProgram = response;
    },
    async updateTRTypeAPI() {
      try {
        const data = new FormData();
        data.append("TR_PROGRAM_TYPE_ID", this.TR_PROGRAM_TYPE_ID);
        data.append("TR_PROGRAM_TYPE_NAME", this.model.editTrProgram.TR_PROGRAM_TYPE_NAME);
        // console.log("data :" + data);
        // eslint-disable-next-line no-unused-vars
        const response = await servicesModule0.updateTRType(data);
        this.getAllTRType();
      } catch (error) {
        console.log(error);
      }
    },

    async deleteTRType(data) {
      if (confirm("Are you sure you want to delete?")) {
      // eslint-disable-next-line no-unused-vars
      const response = await servicesModule0.deleteTRType(
        data.TR_PROGRAM_TYPE_ID
      );
      this.getAllTRType();
      }
    },

    // ------------------------ Module Code ------------------------

    getAllModuleCode: async function () {
      const response = await servicesModule0.getAllModuleCodeList();
      this.ModuleCodelist = response;
      this.ModuleCodeCount = this.ModuleCodelist.length;
    },
    async submitModuleCode() {
      let app = this;
      var param = app.model;
      const data = new FormData();
      data.append("MODULE_CODE_NAME", this.model.MODULE_CODE_NAME);
      try {
        // eslint-disable-next-line no-unused-vars
        const response = await servicesModule0.createModuleCode(data);
        this.getAllModuleCode();
        this.model.MODULE_CODE_NAME="";
        // this.$modals.simpleModal.$hide()
      } catch (error) {
        console.log(error);
      }
    },
    async editModuleCode(data) {
      const response = await servicesModule0.getModuleCodeById(
        data.MODULE_CODE_ID
      );
      this.$modals.simpleModalEditModuleCode.$show();
      this.MODULE_CODE_ID = response.MODULE_CODE_ID;
      this.model.editModuleCoded = response;
    },
    async updateModuleCodeAPI() {
      try {
        const data = new FormData();
        data.append("MODULE_CODE_ID", this.MODULE_CODE_ID);
        data.append("MODULE_CODE_NAME", this.model.editModuleCoded.MODULE_CODE_NAME);
        // console.log("data :" + data);
        // eslint-disable-next-line no-unused-vars
        const response = await servicesModule0.updateModuleCode(data);
        this.getAllModuleCode();
      } catch (error) {
        console.log(error);
      }
    },
    async deleteModuleCode(data) {
      if (confirm("Are you sure you want to delete?")) {
      // eslint-disable-next-line no-unused-vars
      const response = await servicesModule0.deleteModuleCode(
        data.MODULE_CODE_ID
      );
      this.getAllModuleCode();
      }
    },

    // ----------------- Financial Planner -------------
    getAllFinancialPlanner: async function () {
      const response = await servicesModule0.getAllFpCodeList();
      this.FinancialPlannerlist = response;
      this.FinancialCount = this.FinancialPlannerlist.length;
    },
    async submitFinancialPlanner() {
      let app = this;
      var param = app.model;
      const data = new FormData();
      data.append("FP_CODE_NAME", this.model.FP_CODE_NAME);
      // data.append("CPD_SETTING_TYPE", "FP_CODE");
      try {
        // eslint-disable-next-line no-unused-vars
        const response = await servicesModule0.createFpCode(data);
        this.getAllFinancialPlanner();
        this.model.FP_CODE_NAME="";
        // this.$modals.simpleModal.$hide()
      } catch (error) {
        console.log(error);
      }
    },

    async editFinancialPlanner(data) {
      const response = await servicesModule0.getFpCodeById(
        data.FP_CODE_ID
      );
      this.$modals.simpleModalEditFinancialPlanner.$show();
      this.FP_CODE_ID = response.FP_CODE_ID;
      this.model.editFinancial = response;
    },
    async updateFinancialPlannerAPI() {
      try {
        const data = new FormData();
        data.append("FP_CODE_ID", this.FP_CODE_ID);
        data.append("FP_CODE_NAME", this.model.editFinancial.FP_CODE_NAME);
        const response = await servicesModule0.updateFpCode(data);
        this.getAllFinancialPlanner();
      } catch (error) {
        console.log(error);
      }
    },
    async deleteFinancialPlanner(data) {
      if (confirm("Are you sure you want to delete?")) {
      // eslint-disable-next-line no-unused-vars
      const response = await servicesModule0.deleteFpCode(
        data.FP_CODE_ID
      );
      this.getAllFinancialPlanner();
      }
    },

    // ------------------------------ QR MODE --------------
    getAllQRMode: async function () {
      const response = await servicesModule0.getAllQrModeList();
      this.QRModelist = response;
      this.QRCount = this.QRModelist.length;
    },
    async submitQR() {
      let app = this;
      var param = app.model;
      const data = new FormData();
      data.append("QR_MODE_NAME", this.model.QR_MODE_NAME);
      this.model.QR_MODE_NAME="";
      // data.append(
      //   "CPD_SETTING_DESCRIPTION",
      //   this.model.CPD_SETTING_DESCRIPTION
      // );
      // data.append("CPD_SETTING_TYPE", "QRMODE");
      try {
        // eslint-disable-next-line no-unused-vars
        const response = await servicesModule0.createQrMode(data);
        this.getAllQRMode();
        // this.$modals.simpleModal.$hide()
      } catch (error) {
        console.log(error);
      }
    },
    async editQR(data) {
      const response = await servicesModule0.getQrModeById(data.QR_MODE_ID);
      this.$modals.simpleModalEditQRMode.$show();
      this.QR_MODE_ID = response.QR_MODE_ID;
      this.model.editQR = response;
    },

    async updateQRAPI() {
      try {
        const data = new FormData();
        data.append("QR_MODE_ID", this.QR_MODE_ID);
        data.append(
          "QR_MODE_NAME",
          this.model.editQR.QR_MODE_NAME
        );
        // data.append("CPD_SETTING_INDEX", this.model.editQR.CPD_SETTING_INDEX);
        const response = await servicesModule0.updateQrMode(data);
        this.getAllQRMode();
      } catch (error) {
        console.log(error);
      }
    },
    async deleteQR(data) {
      if (confirm("Are you sure you want to delete?")) {
      // eslint-disable-next-line no-unused-vars
      const response = await servicesModule0.deleteQrMode(data.QR_MODE_ID);
      this.getAllQRMode();
      }
    },

    // ---------------------- CUT OFF DATE -------------------

    // getAllCutOff: async function (data) {
    //   const response = await servicesModule0.getAllCutOffList(data);
    //   this.CutOffDatelist = response;
    // },

  getDate: async function() {
      const response = await servicesModule0.getDateById();
      this.CPD_CUT_OFF_DATE_ID = response.CPD_CUT_OFF_DATE_ID;
      this.model.CPD_CUT_OFF_DATE = response.CPD_CUT_OFF_DATE;
    },

    async submitCutOffDate() {

        let app = this;
        var param = app.model;
        var cutoffdate= moment(this.model.CPD_CUT_OFF_DATE).unix();
       // var enddate= moment(this.model.CPD_CUT_OFF_END_DATE).unix();
          const data = new FormData();
          // data.append('CPD_CUT_OFF_DATE_ID', this.CPD_CUT_OFF_DATE_ID);
          data.append(
          "CPD_CUT_OFF_DATE",
          moment(this.model.CPD_CUT_OFF_DATE).format("YYYY-MM-DD")
          );
          try {
          // eslint-disable-next-line no-unused-vars
          const response = await servicesModule0.createCutOffDate(data);
          this.getDate();
          } catch (error) {
           console.log(error);
          }
    },

    // Revocation
 getRevocation: async function() {
      const response = await servicesModule0.getCPDRevocationById();
     // this.CPD_CUT_OFF_DATE_ID = response.CPD_CUT_OFF_DATE_ID;
      this.model.REVOCATION_APPROVAL_DAYS = response.REVOCATION_APPROVAL_DAYS;
    },

    async submitREVOCATION() {
          const data = new FormData();
          data.append('REVOCATION_APPROVAL_DAYS', this.model.REVOCATION_APPROVAL_DAYS);
          try {
          // eslint-disable-next-line no-unused-vars
          const response = await servicesModule0.createCPDRevocation(data);
          this.getRevocation();
          } catch (error) {
           console.log(error);
          }
    },

    // ----------- LS MEDIA -------------
    getAllLsMedia: async function () {
      const response = await servicesModule0.getAllLsMediaList();
      this.LsMedialist = response;
      this.LsMediaCount = this.LsMedialist.length;
    },
    async submitLsMedia() {
      let app = this;
      var param = app.model;
      const data = new FormData();
      data.append("LS_MEDIA_NAME", this.model.LS_MEDIA_NAME);
      try {
        // eslint-disable-next-line no-unused-vars
        const response = await servicesModule0.createLsMedia(data);
        this.getAllLsMedia();
        // this.$modals.simpleModal.$hide()
      } catch (error) {
        console.log(error);
      }
    },
    async editLsMedia(data) {
      const response = await servicesModule0.getLsMediaById(
        data.LS_MEDIA_ID
      );
      this.$modals.simpleModalEditLsMedia.$show();
      this.LS_MEDIA_ID = response.LS_MEDIA_ID;
      this.model.editLsMedia = response;
    },
    async updateLsMediaAPI() {
      try {
        const data = new FormData();
        data.append("LS_MEDIA_ID", this.LS_MEDIA_ID);
        data.append("LS_MEDIA_NAME", this.model.editLsMedia.LS_MEDIA_NAME);
        // console.log("data :" + data);
        // eslint-disable-next-line no-unused-vars
        const response = await servicesModule0.updateModuleCode(data);
        this.getAllLsMedia();
      } catch (error) {
        console.log(error);
      }
    },
    async deleteLsMedia(data) {
      if (confirm("Are you sure you want to delete?")) {
      // eslint-disable-next-line no-unused-vars
      const response = await servicesModule0.deleteLsMedia(
        data.LS_MEDIA_ID
      );
      this.getAllLsMedia(); 
      }
    },

    // ---------- LS method --------------
     getAllLsMethod: async function () {
      const response = await servicesModule0.getAllLsMethodList();
      this.LsMethodlist = response;
      this.LsMethodCount = this.LsMethodlist.length;
    },
    async submitLsMethod() {
      let app = this;
      var param = app.model;
      const data = new FormData();
      data.append("LS_METHOD_NAME", this.model.LS_METHOD_NAME);
      try {
        // eslint-disable-next-line no-unused-vars
        const response = await servicesModule0.createLsMethod(data);
        this.getAllLsMethod();
        // this.$modals.simpleModal.$hide()
      } catch (error) {
        console.log(error);
      }
    },
    async editLsMethod(data) {
      const response = await servicesModule0.getLsMethodById(
        data.LS_METHOD_ID
      );
      this.$modals.simpleModalEditLsMethod.$show();
      this.LS_METHOD_ID = response.LS_METHOD_ID;
      this.model.editLsMethod = response;
    },
    async updateLsMethodAPI() {
      try {
        const data = new FormData();
        data.append("LS_METHOD_ID", this.LS_METHOD_ID);
        data.append("LS_METHOD_NAME", this.model.editLsMethod.LS_METHOD_NAME);
        // console.log("data :" + data);
        // eslint-disable-next-line no-unused-vars
        const response = await servicesModule0.updateLsMethod(data);
        this.getAllLsMethod();
      } catch (error) {
        console.log(error);
      }
    },
    async deleteLsMethod(data) {
      // eslint-disable-next-line no-unused-vars
      const response = await servicesModule0.deleteLsMethod(
        data.LS_METHOD_ID
      );
      this.getAllLsMethod();
    },

      // ------LS ASSESSMENT-----
     getAllLsAssessment: async function () {
      const response = await servicesModule0.getAllLsAssessmentList();
      this.LsAssessmentlist = response;
      this.LsAssessmentCount = this.LsAssessmentlist.length;
    },
    async submitLsAssessment() {
      let app = this;
      var param = app.model;
      const data = new FormData();
      data.append("LS_ASSESSMENT_NAME", this.model.LS_ASSESSMENT_NAME);
      try {
        // eslint-disable-next-line no-unused-vars
        const response = await servicesModule0.createLsAssessment(data);
        this.getAllLsAssessment();
        // this.$modals.simpleModal.$hide()
      } catch (error) {
        console.log(error);
      }
    },
    async editLsAssessment(data) {
      const response = await servicesModule0.getLsAssessmentById(
        data.LS_ASSESSMENT_ID
      );
      this.$modals.simpleModalEditLsAssessment.$show();
      this.LS_ASSESSMENT_ID = response.LS_ASSESSMENT_ID;
      this.model.editLsAssessment = response;
    },
    async updateLsAssessmentAPI() {
      try {
        const data = new FormData();
        data.append("LS_ASSESSMENT_ID", this.LS_ASSESSMENT_ID);
        data.append("LS_ASSESSMENT_NAME", this.model.editLsAssessment.LS_ASSESSMENT_NAME);
        // console.log("data :" + data);
        // eslint-disable-next-line no-unused-vars
        const response = await servicesModule0.updateLsAssessment(data);
        this.getAllLsAssessment();
      } catch (error) {
        console.log(error);
      }
    },
    async deleteLsAssessment(data) {
      // eslint-disable-next-line no-unused-vars
      const response = await servicesModule0.deleteLsAssessment(
        data.LS_METHOD_ID
      );
      this.getAllLsAssessment();
    },


  },

  computed: {
    fivemodule() {
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
          name: "PROGRAM_NAME",
          title: "MODULE ",
          sortField: "PROGRAM_NAME",
        },
        {
          name: "CPD_MIN",
          title: "CPD MINIMUM",
          sortField: "CPD_MIN",
        },
        {
          name: "CPD_MAX",
          title: "CPD MAXIMUM",
          sortField: "CPD_MAX",
        },
        {
          name: "__slot:actions",
          title: "Action",
          dataClass: "justify-content-center",
          width: "15%",
        },
      ];
    },
    filteredFiveMod() {
      if (!this.term || this.term.length < 1) {
        return this.FiveModuleList;
      }
    },

    CpdProgram() {
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
          name: "CPD_PROGRAM_NAME",
          title: "MODULE ",
          sortField: "CPD_PROGRAM_NAME",
        },
        {
          name: "CPD_MIN",
          title: "CPD MINIMUM",
          sortField: "CPD_MIN",
        },
        {
          name: "CPD_MAX",
          title: "CPD MAXIMUM",
          sortField: "CPD_MAX",
        },
        {
          name: "__slot:actions",
          title: "Action",
          dataClass: "justify-content-center",
          width: "15%",
        },
      ];
    },
    filteredCpdProgram() {
      if (!this.term || this.term.length < 1) {
        return this.CpdProgramList;
      }
    },

    waiverList() {
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
          name: "WAIVER_REASON",
          title: "REASON ",
          sortField: "WAIVER_REASON",
        },
        {
          name: "__slot:actions",
          title: "Action",
          dataClass: "justify-content-center",
          width: "15%",
        },
      ];
    },
    filteredWaiver() {
      if (!this.term || this.term.length < 1) {
        return this.WaiverReasonList;
      }
      return this.WaiverReasonList.filter((item) => {
        return item.title.toLowerCase().startsWith(this.term.toLowerCase());
      });
    },

    renewalCPD() {
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
          name: "RENEWAL_MONTH",
          title: "MONTH ",
           sortField: "RENEWAL_MONTH",
        },
        {
          name: "RENEWAL_CALC",
          title: "CPD CALCULATION",
           sortField: "RENEWAL_CALC",
        },
        {
          name: "RENEWAL_REQUIREMENT",
          title: "CPD REQUIREMENT ",
           sortField: "RENEWAL_REQUIREMENT",
        },
         {
          name: "EFFECTIVE_DATE",
          title: "EFFECTIVE DATE",
           sortField: "EFFECTIVE_DATE",
        },
        {
          name: "__slot:actions",
          title: "Action",
          dataClass: "justify-content-center",
          width: "15%",
        },
      ];
    },
    filteredRenewalCPD() {
      if (!this.term || this.term.length < 1) {
        return this.RenewalCPDList;
      }
      return this.RenewalCPDList.filter((item) => {
        return this.term
          .toLowerCase()
          .split(" ")
          .every(
            (v) =>
              item.RENEWAL_MONTH.includes(v) ||
              item.RENEWAL_CALC.includes(v) ||
              item.RENEWAL_REQUIREMENT.includes(v)
          );
      });
    },
    ruleList() {
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
          name: "CPD_RULE_TYPE",
          title: "TYPE ",
          sortField: "CPD_RULE_TYPE",
        },
        {
          name: "CPD_RULE_CONDITION",
          title: "CONDITION",
          sortField: "CPD_RULE_CONDITION",
        },
        {
          name: "CPD_RULE_POINT",
          title: "CPD REQUIREMENT",
          sortField: "CPD_RULE_POINT",
        },
        {
          name: "__slot:actions",
          title: "Action",
          dataClass: "justify-content-center",
          width: "15%",
        },
      ];
    },
    filteredRulePoint() {
      if (!this.term || this.term.length < 1) {
        return this.RulePointList;
      }
      return this.RulePointList.filter((item) => {
        return item.title.toLowerCase().startsWith(this.term.toLowerCase());
      });
    },

    TrTypeList() {
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
          name: "TR_PROGRAM_TYPE_NAME",
          title: "PROGRAM NAME ",
          sortField: "TR_PROGRAM_TYPE_NAME",
        },
        {
          name: "__slot:actions",
          title: "Action",
          dataClass: "justify-content-center",
          width: "15%",
        },
      ];
    },
    filteredTrProgram() {
      if (!this.term || this.term.length < 1) {
        return this.TRTypelist;
      }
    },

    TrModeList() {
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
          name: "TR_MODE_NAME",
          title: "MODE NAME ",
          sortField: "TR_MODE_NAME",
        },
         {
          name: "MIN_POINT",
          title: "CPD MINIMUM ",
          sortField: "MIN_POINT",
        },
         {
          name: "MAX_POINT",
          title: "CPD MAXIMUM",
          sortField: "MAX_POINT",
        },
        {
          name: "__slot:actions",
          title: "Action",
          dataClass: "justify-content-center",
          width: "15%",
        },
      ];
    },
    filteredTrMode() {
      if (!this.term || this.term.length < 1) {
        return this.TRModelist;
      }
    },

    FiveModuleTrModeList() {
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
          name: "FIVE_MODULE_TR_MODE_NAME",
          title: "MODE NAME ",
          sortField: "FIVE_MODULE_TR_MODE_NAME",
        },
        {
          name: "__slot:actions",
          title: "Action",
          dataClass: "justify-content-center",
          width: "15%",
        },
      ];
    },
    filteredDataFiveModuleTrMode() {
      if (!this.term || this.term.length < 1) {
        return this.FiveModuleTR;
      }
    },
    ReadingTrModeList() {
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
          name: "READING_TR_MODE_NAME",
          title: "MODE NAME ",
          sortField: "READING_TR_MODE_NAME",
        },
        {
          name: "__slot:actions",
          title: "Action",
          dataClass: "justify-content-center",
          width: "15%",
        },
      ];
    },
    filteredDataReadingTrModeList() {
      if (!this.term || this.term.length < 1) {
        return this.ReadingTrMode;
      }
    },

    ModuleCodeList() {
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
          name: "MODULE_CODE_NAME",
          title: "NAME",
          sortField: "MODULE_CODE_NAME",
        },
        {
          name: "__slot:actions",
          title: "Action",
          dataClass: "justify-content-center",
          width: "15%",
        },
      ];
    },
    filteredModuleCode() {
      if (!this.term || this.term.length < 1) {
        return this.ModuleCodelist;
      }
    },
    FinancialPlannerList() {
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
          name: "FP_CODE_NAME",
          title: "INDEX",
          sortField: "FP_CODE_NAME",
        },
        {
          name: "__slot:actions",
          title: "Action",
          dataClass: "justify-content-center",
          width: "15%",
        },
      ];
    },
    filteredFinancialPlanner() {
      if (!this.term || this.term.length < 1) {
        return this.FinancialPlannerlist;
      }
    },

    QRList() {
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
          name: "QR_MODE_NAME",
          title: "INDEX",
          sortField: "QR_MODE_NAME",
        },
        {
          name: "__slot:actions",
          title: "Action",
          dataClass: "justify-content-center",
          width: "15%",
        },
      ];
    },
    filteredQR() {
      if (!this.term || this.term.length < 1) {
        return this.QRModelist;
      }
    },
    LsMediaList() {
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
          name: "LS_MEDIA_NAME",
          title: "MEDIA NAME ",
          sortField: "LS_MEDIA_NAME",
        },
        {
          name: "__slot:actions",
          title: "Action",
          dataClass: "justify-content-center",
          width: "15%",
        },
      ];
    },
    filteredLsMedia() {
      if (!this.term || this.term.length < 1) {
        return this.LsMedialist;
      }
    },
    LsMethodList() {
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
          name: "LS_METHOD_NAME",
          title: "METHOD NAME ",
          sortField: "LS_METHOD_NAME",
        },
        {
          name: "__slot:actions",
          title: "Action",
          dataClass: "justify-content-center",
          width: "15%",
        },
      ];
    },
    filteredLsMethod() {
      if (!this.term || this.term.length < 1) {
        return this.LsMethodlist;
      }
    },
     LsAssessmentList() {
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
          name: "LS_ASSESSMENT_NAME",
          title: "ASSESSMENT NAME ",
          sortField: "LS_ASSESSMENT_NAME",
        },
        {
          name: "__slot:actions",
          title: "Action",
          dataClass: "justify-content-center",
          width: "15%",
        },
      ];
    },
    filteredLsAssessment() {
      if (!this.term || this.term.length < 1) {
        return this.LsAssessmentlist;
      }
    },



  },
};
</script>
<style lang="scss" scoped>
.start{
  color:red;
}
.vdp-datepicker{
  margin-top: -22px;
}
</style>>

</style>
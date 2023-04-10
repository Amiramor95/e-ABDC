<template>
   <va-card>
          <div class="col-lg-10">
            <h4 slot="header">Settings by Module</h4>
          </div>
          <br />
            <br />
          <!-- 1 -->
            <h5><i class="fa fa-bank"></i>&nbsp;&nbsp; <b>FUND MANAGEMENT </b></h5>
            <hr />

            <div class="ml-5">
              <!-- Fund Type -->
              <div>
                <span>FUND TYPE</span>
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
                    <form  @submit.prevent="submitFundType()">
                    <div class="row">
                      <div class="ml-4 col-md-10">
                        <span class="col mt-3 description">FUND TYPE NAME <span class="start"> * </span></span>
                        <input
                          type="text"
                          v-model="model.FUND_NAME"
                          placeholder="ENTER FUND TYPE NAME"
                          class="float-right col-8 form-control form-control-md"
                          required
                        />
                      </div>
                    </div>
                    <br />
                     <div class="row">
                      <div class="ml-4 col-md-10">
                        <span class="col mt-3 description">FUND TYPE FULL NAME <span class="start"> * </span></span>
                        <input
                          type="text"
                          v-model="model.FUND_TYPE_FULLNAME"
                          placeholder="ENTER FUND TYPE FULL NAME"
                          class="float-right col-8 form-control form-control-md"
                          required
                        />
                      </div>
                    </div>
                    <br>
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
                        :fields="FundTypeList"
                        :data="filteredFundType"
                        :per-page="parseInt(perPage)"
                        :datacount="FundTypeCount"
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
                              v-on:click="editFundType(props.rowData)"
                            >
                              <i class="fa fa-edit"></i
                            ></span>
                            <span
                              v-b-tooltip.hover
                              title="delete"
                              class="badge badge-danger mr-1"
                              v-on:click="deleteFundType(props.rowData)"
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
              <!-- Fund Category -->
              <div>
                <span>SALES CHARGE AND FUND CATEGORY </span>
                <button
                  v-if="visibleFundCategory == false"
                  v-b-toggle.collapse-2
                  type="button"
                  class="float-right btn-fill btn-md"
                >
                  <i class="fa fa-edit"></i>
                </button>
                <button
                  v-if="visibleFundCategory == true"
                  v-b-toggle.collapse-2
                  type="button"
                  class="float-right btn-fill btn-md"
                >
                  <i class="fa fa-times"></i>
                </button>
                <!-- <div v-for="(item, index) in fivemo  dule" :key="index"></div> -->
                <b-collapse v-model="visibleFundCategory" class="mt-4" id="collapse-2">
                  <va-card>
                    <form  @submit.prevent="submitFundCategory()">
                    <div class="row">
                    <div class="ml-4 col-md-10">
                      <span class="col mt-3 description">SALES CHARGE (%) <span class="start"> * </span></span>
                      <input
                        type="text"
                        v-model="model.SALE_TO"
                        placeholder="ENTER RANGE TO"
                        class="float-right col-4 form-control form-control-md"
                         required
                         @keypress="onlyNumber"
                      />
                      <input
                        type="text"
                        v-model="model.SALE_FROM"
                        placeholder="ENTER RANGE FROM"
                        class="float-right col-4 form-control form-control-md"
                         required
                         @keypress="onlyNumber"
                      />
                    </div>
                    <br/>
                    <br/>
                  </div>
                    <div class="row">
                      <div class="ml-4 col-md-10 form-gap">
                        <span class="col mt-3 description">FUND CATEGORY <span class="start"> * </span></span>
                        <input
                          type="text"
                          v-model="model.FUND_CATEGORY"
                          placeholder="ENTER FUND CATEGORY"
                          class="float-right col-8 form-control form-control-md"
                          required
                        />
                      </div>
                    </div>
                    <br />
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
                        :fields="FundCategoryList"
                        :data="filteredFundCategory"
                        :per-page="parseInt(perPage)"
                        :datacount="FundCategoryCount"
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
                              v-on:click="editFundCategory(props.rowData)"
                            >
                              <i class="fa fa-edit"></i
                            ></span>
                            <span
                              v-b-tooltip.hover
                              title="delete"
                              class="badge badge-danger mr-1"
                              v-on:click="deleteFundCategory(props.rowData)"
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

              <!-- Fund Group  -->
               <div>
                <span>ASSET CLASS AND FUND GROUP </span>
                <button
                  v-if="visibleFundGroup == false"
                  v-b-toggle.collapse-3
                  type="button"
                  class="float-right btn-fill btn-md"
                >
                  <i class="fa fa-edit"></i>
                </button>
                <button
                  v-if="visibleFundGroup == true"
                  v-b-toggle.collapse-3
                  type="button"
                  class="float-right btn-fill btn-md"
                >
                  <i class="fa fa-times"></i>
                </button>
                <!-- <div v-for="(item, index) in fivemo  dule" :key="index"></div> -->
                <b-collapse v-model="visibleFundGroup" class="mt-4" id="collapse-3">
                  <va-card>
                  <form  @submit.prevent="submitFundGroup()">
                    <div class="row">
                      <div class="ml-4 col-md-10">
                        <span class="col mt-3 description">ASSET GROUP <span class="start"> * </span></span>
                        <input
                          type="text"
                          v-model="model.GROUP_ASSET"
                          placeholder="ENTER ASSET GROUP"
                          class="float-right col-8 form-control form-control-md"
                          required
                        />
                      </div>
                      <br/>
                      <br/>
                    </div>
                    <div class="row">
                      <div class="ml-4 col-md-10 form-gap">
                        <span class="col mt-3 description">FUND GROUP <span class="start"> * </span></span>
                        <input
                          type="text"
                          v-model="model.GROUP_FUND"
                          placeholder="ENTER FUND GROUP"
                          class="float-right col-8 form-control form-control-md"
                          required
                        />
                      </div>
                    </div>
                    <br />
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
                        :fields="FundGroupList"
                        :data="filteredFundGroup"
                        :per-page="parseInt(perPage)"
                        :datacount="FundGroupCount"
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
                              v-on:click="editFundGroup(props.rowData)"
                            >
                              <i class="fa fa-edit"></i
                            ></span>
                            <span
                              v-b-tooltip.hover
                              title="delete"
                              class="badge badge-danger mr-1"
                              v-on:click="deleteFundGroup(props.rowData)"
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

              <!-- Nav Daily Cut off Time id-4  -->
              <div>
                <span>NAV DAILY UPDATE CUT-OFF TIME</span>
                <button
                  v-if="visibleNav == false"
                  v-b-toggle.collapse-4
                  type="button"
                  class="float-right btn-fill btn-md"
                >
                  <i class="fa fa-edit"></i>
                </button>
                <button
                  v-if="visibleNav == true"
                  v-b-toggle.collapse-4
                  type="button"
                  class="float-right btn-fill btn-md"
                >
                  <i class="fa fa-times"></i>
                </button>
                <!-- <div v-for="(item, index) in fivemo  dule" :key="index"></div> -->
                <b-collapse v-model="visibleNav" class="mt-4" id="collapse-4">
                  <va-card>
                    <span class="col mt-3 description">LOCAL TIME</span>
                    <div class="row">
                      <div class="ml-4 col-md-10">
                        <span class="col mt-3 description">START TIME </span>
                        <template>
                        <b-time :value="term" @input="searchDate" format="h:m:s" v-model="model.NAV_LOCAL_START_TIME" show-seconds locale="en"></b-time>
                        </template>
                        <span class="col mt-3 description">END TIME </span>
                        <template>
                        <b-time :value="term" @input="searchDate" format="h:m:s" v-model="model.NAV_LOCAL_END_TIME" show-seconds locale="en"></b-time>
                        </template>
                      </div>
                    </div>
                    <br/>
                    <br/>
                    <span class="col mt-3 description">FOREIGN TIME</span>
                    <div class="row">
                      <div class="ml-4 col-md-10">
                        <span class="col mt-3 description">START TIME </span>
                        <template>
                        <b-time :value="term" @input="searchDate" format="h:m:s"  v-model="model.NAV_FOREIGN_START_TIME" show-seconds locale="en"></b-time>
                        </template>
                        <span class="col mt-3 description">END TIME </span>
                        <template>
                        <b-time :value="term" @input="searchDate" format="h:m:s" v-model="model.NAV_FOREIGN_END_TIME" show-seconds locale="en"></b-time>
                        </template>
                      </div>
                    </div>
                    <br />
                    <div class="row">
                      <div class="col-10">
                        <button
                          @click="submitNav"
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

              <!-- Fund Notes -->

              <div>
                <span>FUND NOTES</span>
                <button
                  v-if="visibleFundNotes == false"
                  v-b-toggle.collapse-5
                  type="button"
                  class="float-right btn-fill btn-md"
                >
                  <i class="fa fa-edit"></i>
                </button>
                <button
                  v-if="visibleFundNotes == true"
                  v-b-toggle.collapse-5
                  type="button"
                  class="float-right btn-fill btn-md"
                >
                  <i class="fa fa-times"></i>
                </button>
                <!-- <div v-for="(item, index) in fivemo  dule" :key="index"></div> -->
                <b-collapse v-model="visibleFundNotes" class="mt-4" id="collapse-5">
                  <va-card>
                  <form  @submit.prevent="submitFundNotes()">
                    <div class="row">
                      <div class="ml-4 col-md-10">
                        <span class="col mt-3 description">FUND NOTES <span class="start"> * </span></span>
                        <input
                          type="text"
                          v-model="model.FUNDNOTES_DESC"
                          placeholder="ENTER DESCRIPTION"
                          class="float-right col-8 form-control form-control-md"
                          required
                        />
                      </div>
                    </div>
                    <br />
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
                        :fields="FundNotesList"
                        :data="filteredFundNotes"
                        :per-page="parseInt(perPage)"
                        :datacount="FundNotesCount"
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
                              v-on:click="editFundNotes(props.rowData)"
                            >
                              <i class="fa fa-edit"></i
                            ></span>
                            <span
                              v-b-tooltip.hover
                              title="delete"
                              class="badge badge-danger mr-1"
                              v-on:click="deleteFundNotes(props.rowData)"
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

              <!-- Fund Domicile -->
              <!-- <div>
                <span>FUND DOMICILE</span>
                <button
                  v-if="visibleFundDomicile == false"
                  v-b-toggle.collapse-6
                  type="button"
                  class="float-right btn-fill btn-md"
                >
                  <i class="fa fa-edit"></i>
                </button>
                <button
                  v-if="visibleFundDomicile == true"
                  v-b-toggle.collapse-6
                  type="button"
                  class="float-right btn-fill btn-md"
                >
                  <i class="fa fa-times"></i>
                </button>
                <b-collapse v-model="visibleFundDomicile" class="mt-4" id="collapse-6">
                  <va-card>
                    <div class="row">
                      <div class="ml-4 col-md-10">
                        <span class="col mt-3 description">FUND DOCIMILE NAME</span>
                        <input
                          type="text"
                          v-model="model.FUND_DOMICILE_NAME"
                          placeholder="ENTER NAME"
                          class="float-right col-8 form-control form-control-md"
                        />
                      </div>
                    </div>
                    <br />
                    <div class="row">
                      <div class="col-10">
                        <button
                          @click="submitFundDomicile"
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
                        :fields="FundDomicileList"
                        :data="filteredFundDomicile"
                        :per-page="parseInt(perPage)"
                        :datacount="FundDomicileCount"
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
                              v-on:click="editFundDomicile(props.rowData)"
                            >
                              <i class="fa fa-edit"></i
                            ></span>
                            <span
                              v-b-tooltip.hover
                              title="delete"
                              class="badge badge-danger mr-1"
                              v-on:click="deleteFundDomicile(props.rowData)"
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

             <!-- Fund Scheme Structure -->
               <div>
                <span>FUND SCHEME STRUCTURE</span>
                <button
                  v-if="visibleScheme == false"
                  v-b-toggle.collapse-7
                  type="button"
                  class="float-right btn-fill btn-md"
                >
                  <i class="fa fa-edit"></i>
                </button>
                <button
                  v-if="visibleScheme == true"
                  v-b-toggle.collapse-7
                  type="button"
                  class="float-right btn-fill btn-md"
                >
                  <i class="fa fa-times"></i>
                </button>
                <!-- <div v-for="(item, index) in fivemo  dule" :key="index"></div> -->
                <b-collapse v-model="visibleScheme" class="mt-4" id="collapse-7">
                  <va-card>
                    <form  @submit.prevent="submitScheme()">
                    <div class="row">
                      <div class="ml-4 col-md-10">
                        <span class="col mt-3 description">SCHEME STRUTURE <span class="start"> * </span></span>
                        <input
                          type="text"
                          v-model="model.FMS_SCHEME_NAME"
                          placeholder="ENTER NAME"
                          class="float-right col-8 form-control form-control-md"
                          required
                        />
                      </div>
                    </div>
                    <br />
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
                        :fields="SchemeList"
                        :data="filteredScheme"
                        :per-page="parseInt(perPage)"
                        :datacount="schemeCount"
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
                              v-on:click="editScheme(props.rowData)"
                            >
                              <i class="fa fa-edit"></i
                            ></span>
                            <span
                              v-b-tooltip.hover
                              title="delete"
                              class="badge badge-danger mr-1"
                              v-on:click="deleteScheme(props.rowData)"
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

              <!-- Fund Remark Option -->
              <div>
                <span>FUND REMARK OPTION </span>
                <button
                  v-if="visibleRemark == false"
                  v-b-toggle.collapse-8
                  type="button"
                  class="float-right btn-fill btn-md"
                >
                  <i class="fa fa-edit"></i>
                </button>
                <button
                  v-if="visibleRemark == true"
                  v-b-toggle.collapse-8
                  type="button"
                  class="float-right btn-fill btn-md"
                >
                  <i class="fa fa-times"></i>
                </button>
                <!-- <div v-for="(item, index) in fivemo  dule" :key="index"></div> -->
                <b-collapse v-model="visibleRemark" class="mt-4" id="collapse-8">
                  <va-card>
                    <form  @submit.prevent="submitRemark()">
                    <div class="row">
                      <div class="ml-4 col-md-10">
                        <span class="col mt-3 description">REMARK OPTION <span class="start"> * </span></span>
                        <input
                          type="text"
                          v-model="model.FMS_REMARK_OPTION_NAME"
                          placeholder="ENTER NAME"
                          class="float-right col-8 form-control form-control-md"
                          required
                        />
                      </div>
                    </div>
                    <br />
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
                        :fields="RemarkList"
                        :data="filteredRemark"
                        :per-page="parseInt(perPage)"
                        :datacount="RemarkCount"
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
                              v-on:click="editRemark(props.rowData)"
                            >
                              <i class="fa fa-edit"></i
                            ></span>
                            <span
                              v-b-tooltip.hover
                              title="delete"
                              class="badge badge-danger mr-1"
                              v-on:click="deleteRemark(props.rowData)"
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

              <!-- Reason Option -->
              <div>
                <span>FUND REASON OPTION </span>
                <button
                  v-if="visibleReason == false"
                  v-b-toggle.collapse-9
                  type="button"
                  class="float-right btn-fill btn-md"
                >
                  <i class="fa fa-edit"></i>
                </button>
                <button
                  v-if="visibleReason == true"
                  v-b-toggle.collapse-9
                  type="button"
                  class="float-right btn-fill btn-md"
                >
                  <i class="fa fa-times"></i>
                </button>
                <!-- <div v-for="(item, index) in fivemo  dule" :key="index"></div> -->
                <b-collapse v-model="visibleReason" class="mt-4" id="collapse-9">
                  <va-card>
                    <form  @submit.prevent="submitReason()">
                    <div class="row">
                      <div class="ml-4 col-md-10">
                        <span class="col mt-3 description">REASON OPTION <span class="start"> * </span></span>
                        <input
                          type="text"
                          v-model="model.FMS_REASON_OPTION_NAME"
                          placeholder="ENTER NAME"
                          class="float-right col-8 form-control form-control-md"
                          required
                        />
                      </div>
                    </div>
                    <br />
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
                        :fields="ReasonList"
                        :data="filteredReason"
                        :per-page="parseInt(perPage)"
                        :datacount="ReasonCount"
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
                              v-on:click="editReason(props.rowData)"
                            >
                              <i class="fa fa-edit"></i
                            ></span>
                            <span
                              v-b-tooltip.hover
                              title="delete"
                              class="badge badge-danger mr-1"
                              v-on:click="deleteReason(props.rowData)"
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

              <!-- Umbrella Fund -->
              <div>
                <span>UMBRELLA FUND </span>
                <button
                  v-if="visibleUmbrella == false"
                  v-b-toggle.collapse-10
                  type="button"
                  class="float-right btn-fill btn-md"
                >
                  <i class="fa fa-edit"></i>
                </button>
                <button
                  v-if="visibleUmbrella == true"
                  v-b-toggle.collapse-10
                  type="button"
                  class="float-right btn-fill btn-md"
                >
                  <i class="fa fa-times"></i>
                </button>
                <!-- <div v-for="(item, index) in fivemo  dule" :key="index"></div> -->
                <b-collapse v-model="visibleUmbrella" class="mt-4" id="collapse-10">
                  <va-card>
                    <form  @submit.prevent="submitUmbrella()">
                    <div class="row">
                      <div class="ml-4 col-md-10">
                        <span class="col mt-3 description">UMBRELLA FUND NAME <span class="start"> * </span></span>
                        <input
                          type="text"
                          v-model="model.UMBRELLA_FUND_NAME"
                          placeholder="ENTER NAME"
                          class="float-right col-8 form-control form-control-md"
                          required
                        />
                      </div>
                    </div>
                    <br />
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
                    <div class="float-right"></div>
                    <div class="float-right">
                    <va-input
                    :value="term1"
                    :placeholder="$t('Search')"
                    @input="search"
                    removable
                    >
                    <va-icon name="fa fa-search" slot="prepend" />
                    </va-input>
                    </div>
                    <br /><br />
                    <!-- list -->
                    <va-card class="mt-2">
                      <va-data-table
                        :fields="UmbrellaList"
                        :data="filteredUmbrella"
                        :per-page="parseInt(perPage)"
                        :datacount="UmbrellaCount"
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
                              v-on:click="editUmbrella(props.rowData)"
                            >
                              <i class="fa fa-edit"></i
                            ></span>
                            <span
                              v-b-tooltip.hover
                              title="delete"
                              class="badge badge-danger mr-1"
                              v-on:click="deleteUmbrella(props.rowData)"
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
            <div>
            <span>DECLARATION</span>
            <button
            @click="fund_declaration"
            type="button"
            class="float-right btn-fill btn-md"
            >
            <i class="fa fa-edit"></i>
            </button>
            <hr />
            </div>




            </div>

            <!-- --- vudal --- -->
              <!-- fund Type -->
            <vudal name="simpleModalEditFundType" class="widthModal">
              <div class="header">
                EDIT FUND TYPE<i class="close icon">&times;</i>
              </div>
              <div class="content">
                <vue-form-generator
                  :model="model"
                  :schema="editFundTypeSchema"
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
                  @click="updateFundTypeAPI"
                  type="button"
                  class="cancel vudal-btn mr-2 btn btn-primary btn-fill btn-md"
                >
                  <i class="fa fa-edit" /> &nbsp; UPDATE
                </button>
              </div>
            </vudal>
            <!-- fund Category  -->
            <vudal name="simpleModalEditFundCategory" class="widthModal">
              <div class="header">
                EDIT FUND CATEGORY<i class="close icon">&times;</i>
              </div>
              <div class="content">
                <vue-form-generator
                  :model="model"
                  :schema="editFundCategorySchema"
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
                  @click="updateFundCategoryAPI"
                  type="button"
                  class="cancel vudal-btn mr-2 btn btn-primary btn-fill btn-md"
                >
                  <i class="fa fa-edit" /> &nbsp; UPDATE
                </button>
              </div>
            </vudal>
            <!-- fund Group  -->
            <vudal name="simpleModalEditFundGroup" class="widthModal">
              <div class="header">
                EDIT FUND GROUP<i class="close icon">&times;</i>
              </div>
              <div class="content">
                <vue-form-generator
                  :model="model"
                  :schema="editFundGroupSchema"
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
                  @click="updateFundGroupAPI"
                  type="button"
                  class="cancel vudal-btn mr-2 btn btn-primary btn-fill btn-md"
                >
                  <i class="fa fa-edit" /> &nbsp; UPDATE
                </button>
              </div>
            </vudal>
            <!-- Fund Notes -->
            <vudal name="simpleModalEditFundNotes" class="widthModal">
              <div class="header">
                EDIT FUND NOTES<i class="close icon">&times;</i>
              </div>
              <div class="content">
                <vue-form-generator
                  :model="model"
                  :schema="editFundNotesSchema"
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
                  @click="updateFundNotesAPI"
                  type="button"
                  class="cancel vudal-btn mr-2 btn btn-primary btn-fill btn-md"
                >
                  <i class="fa fa-edit" /> &nbsp; UPDATE
                </button>
              </div>
            </vudal>

            <!-- fund Domicile -->
            <vudal name="simpleModalEditFundDomicile" class="widthModal">
              <div class="header">
                EDIT FUND DOMICILE<i class="close icon">&times;</i>
              </div>
              <div class="content">
                <vue-form-generator
                  :model="model"
                  :schema="editFundDomicileSchema"
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
                  @click="updateFundDomicileAPI"
                  type="button"
                  class="cancel vudal-btn mr-2 btn btn-primary btn-fill btn-md"
                >
                  <i class="fa fa-edit" /> &nbsp; UPDATE
                </button>
              </div>
            </vudal>
            <!-- scheme Structure -->
            <vudal name="simpleModalEditScheme" class="widthModal">
              <div class="header">
                EDIT SCHEME STRUCTURE<i class="close icon">&times;</i>
              </div>
              <div class="content">
                <vue-form-generator
                  :model="model"
                  :schema="editSchemeSchema"
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
                  @click="updateSchemeAPI"
                  type="button"
                  class="cancel vudal-btn mr-2 btn btn-primary btn-fill btn-md"
                >
                  <i class="fa fa-edit" /> &nbsp; UPDATE
                </button>
              </div>
            </vudal>

            <!-- Remark Option -->
            <vudal name="simpleModalEditRemark" class="widthModal">
              <div class="header">
                EDIT REMARK OPTION<i class="close icon">&times;</i>
              </div>
              <div class="content">
                <vue-form-generator
                  :model="model"
                  :schema="editRemarkSchema"
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
                  @click="updateRemarkAPI"
                  type="button"
                  class="cancel vudal-btn mr-2 btn btn-primary btn-fill btn-md"
                >
                  <i class="fa fa-edit" /> &nbsp; UPDATE
                </button>
              </div>
            </vudal>
            <!-- Reason Option -->
          <vudal name="simpleModalEditReason" class="widthModal">
              <div class="header">
                EDIT REASON OPTION<i class="close icon">&times;</i>
              </div>
              <div class="content">
                <vue-form-generator
                  :model="model"
                  :schema="editReasonSchema"
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
                  @click="updateReasonAPI"
                  type="button"
                  class="cancel vudal-btn mr-2 btn btn-primary btn-fill btn-md"
                >
                  <i class="fa fa-edit" /> &nbsp; UPDATE
                </button>
              </div>
            </vudal>

            <!-- Umbrella FUnd -->
            <vudal name="simpleModalEditUmbrella" class="widthModal">
              <div class="header">
                EDIT UMBRELLA FUND<i class="close icon">&times;</i>
              </div>
              <div class="content">
                <vue-form-generator
                  :model="model"
                  :schema="editUmbrellaSchema"
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
                  @click="updateUmbrellaAPI"
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
import { debounce } from "lodash";
Vue.component("field-vfg-functional-date", VfgFunctionalDate);
import VfgFunctionalDate from "../../component/VfgFunctionalCalendar.vue"
import moment from "moment";
import Datepicker from 'vuejs-datepicker';
import FullCalendar from "@fullcalendar/vue";
import { TimePlugin } from 'bootstrap-vue';
Vue.use(TimePlugin);
import { BTime } from 'bootstrap-vue';
Vue.component('b-time', BTime);



export default {
  mounted() {
    this.getAllFundType();
    this.getAllFundCategory();
    this.getAllFundGroup();
    this.getAllFundNotes();
    this.getAllFundDomicile();
    this.getAllScheme();
    this.getAllRemark();
    this.getAllReason();
    this.getAllUmbrella();
    this.getAllNavTime();
  },
  components: {
    FullCalendar,
    Vudal,
    Datepicker,
  },
  // DATA SCHEMA
  data() {
    return {
      term: null,
      term1: null,
      visibleLogin: false,
      visibleFundCategory: false,
      visibleFundGroup: false,
      visibleNav: false,
      visibleFundNotes: false,
      visibleFundDomicile: false,
      visibleScheme: false,
      visibleRemark: false,
      visibleReason: false,
      visibleUmbrella: false,
      timezone: '',
      date: new Date(),
      perPage: 10,
      //perPageOptions: ["4", "6", "10", "20"],


      fundTypeList: [],
      FundTypeCount: null,
      fundCategoryList: [],
      FundCategoryCount: null,
      fundGroupList: [],
      FundGroupCount: null,
      fundNotesList: [],
      FundNotesCount: null,
      fundDomicileList: [],
      FundDomicileCount: null,
      schemeList: [],
      schemeCount: null,
      remarkList: [],
      RemarkCount: null,
      reasonList: [],
      ReasonCount: null,
      umbrellaList: [],
      UmbrellaCount: null,



      count: 1,
      model: {
        FUND_NAME: '',
        FUND_TYPE_FULLNAME: '',
        SALE_FROM: '',
        SALE_TO: '',
        FUND_CATEGORY: '',
        GROUP_ASSET:'',
        GROUP_FUND: '',
        FUNDNOTES_DESC: '',
        FUND_DOMICILE_NAME: '',
        FMS_SCHEME_NAME: '', 
        FMS_REMARK_OPTION_NAME: '',
        FMS_REASON_OPTION_NAME: '',
        UMBRELLA_FUND_NAME: '',

        editFundType: {
          FUND_NAME: '',
          FUND_TYPE_FULLNAME: '',
        },
        editFundCategory: {
          SALE_FROM: '',
        SALE_TO: '',
        FUND_CATEGORY: '',
        },
        editFundGroup: {
          GROUP_ASSET:'',
        GROUP_FUND: '',
        },
        editFundNotes: {
          FUNDNOTES_DESC: '',
        },
        editFundDomicile: {
          FUND_DOMICILE_NAME: '',
        },
        editScheme: {
          FMS_SCHEME_NAME: '', 

        },
        editRemark: {
          FMS_REMARK_OPTION_NAME: '',

        },
        editReason: {
          FMS_REASON_OPTION_NAME: '',

        },

        editUmbrella: {
          UMBRELLA_FUND_NAME: '',

        },

        NAV_LOCAL_START_TIME:'',
        NAV_LOCAL_END_TIME: '',
        NAV_FOREIGN_START_TIME: '',
        NAV_FOREIGN_END_TIME: '',
      },



      editFundTypeSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "input",
                inputType: "Text",
                model: "editFundType.FUND_NAME",
                label: "FUND TYPE NAME ",
                placeholder: "ENTER FUND TYPE NAME",
                styleClasses: "col-md-12",
                required: true,
                validator: "required",
              },
               {
                type: "input",
                inputType: "Text",
                model: "editFundType.FUND_TYPE_FULLNAME",
                label: "FUND TYPE FULL NAME ",
                placeholder: "ENTER FUND TYPE FULL NAME",
                styleClasses: "col-md-12",
                required: true,
                validator: "required",
              },
            ],
          },
        ],
      },
      editFundCategorySchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "input",
                inputType: "number",
                model: "editFundCategory.SALE_FROM",
                label: "SALE FROM ",
                placeholder: "ENTER RANGE FROM",
                styleClasses: "col-md-12",
                required: true,
                validator: "number",
              },
              {
                type: "input",
                inputType: "number",
                model: "editFundCategory.SALE_TO",
                label: "SALE TO ",
                placeholder: "ENTER RANGE TO",
                styleClasses: "col-md-12",
                required: true,
                validator: "number",
              },
              {
                type: "input",
                inputType: "Text",
                model: "editFundCategory.FUND_CATEGORY",
                label: "FUND CATEGORY ",
                placeholder: "ENTER FUND CATEGORY",
                styleClasses: "col-md-12",
                required: true,
                validator: "required",
              },
            ],
          },
        ],
      },
      editFundGroupSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "input",
                inputType: "Text",
                model: "editFundGroup.GROUP_ASSET",
                label: "ASSET GROUP ",
                placeholder: "ENTER ASSET GROUP",
                styleClasses: "col-md-12",
                required: true,
                validator: "required",
              },
              {
                type: "input",
                inputType: "Text",
                model: "editFundGroup.GROUP_FUND",
                label: "FUND GROUP ",
                placeholder: "ENTER FUND GROUP",
                styleClasses: "col-md-12",
                required: true,
                validator: "required",
              },
            ],
          },
        ],
      },
       editFundNotesSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "input",
                inputType: "Text",
                model: "editFundNotes.FUNDNOTES_DESC",
                label: "FUND NOTES",
                placeholder: "ENTER FUND NOTES DESCRIPTION",
                styleClasses: "col-md-12",
                required: true,
                validator: "required",
              },
            ],
          },
        ],
      },
      editFundDomicileSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "input",
                inputType: "Text",
                model: "editFundDomicile.FUND_DOMICILE_NAME",
                label: "FUND DOMICILE NAME",
                placeholder: "ENTER NAME",
                styleClasses: "col-md-12",
              },
            ],
          },
        ],
      },
     editSchemeSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "input",
                inputType: "Text",
                model: "editScheme.FMS_SCHEME_NAME",
                label: "SCHEME STRUCTURE",
                placeholder: "ENTER SCHEME",
                styleClasses: "col-md-12",
                required: true,
                validator: "required",
              },
            ],
          },
        ],
      },
      editRemarkSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "input",
                inputType: "Text",
                model: "editRemark.FMS_REMARK_OPTION_NAME",
                label: "REMARK OPTION",
                placeholder: "ENTER REMARK",
                styleClasses: "col-md-12",
                required: true,
                validator: "required",
              },
            ],
          },
        ],
      },
      editReasonSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "input",
                inputType: "Text",
                model: "editReason.FMS_REASON_OPTION_NAME",
                label: "REASON OPTION",
                placeholder: "ENTER REASON",
                styleClasses: "col-md-12",
                required: true,
                validator: "required",
              },
            ],
          },
        ],
      },
      editUmbrellaSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "input",
                inputType: "Text",
                model: "editUmbrella.UMBRELLA_FUND_NAME",
                label: "UMBRELLA FUND NAME",
                placeholder: "ENTER NAME",
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
    searchDate(time) {
      this.term = moment(time).format("h:m:s");
      //alert(this.term);
    },
     fund_declaration() {
      this.$router.push("/fimm/fund_declaration");
    },
     onlyNumber ($event) {
        let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
        if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) { // 46 is dot
        $event.preventDefault();
        }
      },
  search: debounce(function (term1) {
  this.term1 = term1;
  console.log(this.term1);
  }, 400),
    //---------Fund Type

    getAllFundType: async function () {
       await servicesModule0.getAllFundTypeList()
       .then(response => {
          this.fundTypeList = response;

          this.FundTypeCount = this.fundTypeList.length;
       });

    },

    async submitFundType() {
      let app = this;
      var param = app.model;
      const data = new FormData();
      data.append("FUND_NAME", this.model.FUND_NAME);
       data.append("FUND_TYPE_FULLNAME", this.model.FUND_TYPE_FULLNAME);
      try {
        // eslint-disable-next-line no-unused-vars
        await servicesModule0.createFundType(data)
        .then(rs => {
          this.getAllFundType();
          this.model.FUND_NAME="";
          this.model.FUND_TYPE_FULLNAME="";
          this.term="";
        // this.$modals.simpleModal.$hide()
        });
      } catch (error) {
        console.log(error);
      }
    },

    async editFundType(data) {
      const response = await servicesModule0.getFundTypeById(
        data.FMS_FUNDTYPE_ID
      );
      this.$modals.simpleModalEditFundType.$show();
      this.FMS_FUNDTYPE_ID = response.FMS_FUNDTYPE_ID;
      this.model.editFundType = response;
      console.log(response);
    },

    async updateFundTypeAPI() {
      try {
        const data = new FormData();
        data.append(
          "FMS_FUNDTYPE_ID",
          this.FMS_FUNDTYPE_ID
        );
        data.append("FUND_NAME", this.model.editFundType.FUND_NAME);
         data.append("FUND_TYPE_FULLNAME", this.model.editFundType.FUND_TYPE_FULLNAME);
        const response = await servicesModule0.updateFundType(data);
        this.getAllFundType();
         this.term="";
      } catch (error) {
        console.log(error);
      }
    },

    async deleteFundType(data) {
      if (confirm("Are you sure you want to delete?")) {
      // eslint-disable-next-line no-unused-vars
      const response = await servicesModule0.deleteFundType(
        data.FMS_FUNDTYPE_ID
      );
      this.getAllFundType();
       this.term="";
      }
    },

//------ Fund Category ------
    getAllFundCategory: async function () {
      const response = await servicesModule0.getAllFundCategoryList();
      this.fundCategoryList = response;
      this.FundCategoryCount = this.fundCategoryList.length;
    },

    async submitFundCategory() {
      let app = this;
      var param = app.model;
      const data = new FormData();
      data.append("SALE_TO", this.model.SALE_TO);
      data.append("SALE_FROM", this.model.SALE_FROM);
      data.append("FUND_CATEGORY", this.model.FUND_CATEGORY);
      try {
        // eslint-disable-next-line no-unused-vars
        await servicesModule0.createFundCategory(data)
        .then(rs => {
          this.getAllFundCategory();
          this.model.SALE_TO="";
          this.model.SALE_FROM="";
          this.model.FUND_CATEGORY="";
          this.term="";
        });
        // this.$modals.simpleModal.$hide()
      } catch (error) {
        console.log(error);
      }
    },

    async editFundCategory(data) {
     const response = await servicesModule0.getFundCategoryById(
        data.AMSF_FUNDCATEGORY_ID
      );

      this.$modals.simpleModalEditFundCategory.$show();

      this.AMSF_FUNDCATEGORY_ID = response.AMSF_FUNDCATEGORY_ID;
      this.model.editFundCategory = response;
    },

    async updateFundCategoryAPI() {
      try {
        const data = new FormData();
        data.append(
          "AMSF_FUNDCATEGORY_ID",
          this.AMSF_FUNDCATEGORY_ID
        );
        data.append("SALE_TO", this.model.editFundCategory.SALE_TO);
        data.append("SALE_FROM", this.model.editFundCategory.SALE_FROM);
        data.append("FUND_CATEGORY", this.model.editFundCategory.FUND_CATEGORY);
        const response = await servicesModule0.updateFundCategory(data);
        this.getAllFundCategory();
         this.term="";
      } catch (error) {
        console.log(error);
      }
    },

    async deleteFundCategory(data) {
      if (confirm("Are you sure you want to delete?")) {
      // eslint-disable-next-line no-unused-vars
      const response = await servicesModule0.deleteFundCategory(
        data.AMSF_FUNDCATEGORY_ID
      );
      this.getAllFundCategory();
       this.term="";
      }
    },

// -- Fund Group 
 getAllFundGroup: async function () {
      const response = await servicesModule0.getAllFundGroupList();
      this.fundGroupList = response;
      this.FundGroupCount = this.fundGroupList.length;
    },

    async submitFundGroup() {
      let app = this;
      var param = app.model;
      const data = new FormData();
      data.append("GROUP_ASSET", this.model.GROUP_ASSET);
      data.append("GROUP_FUND", this.model.GROUP_FUND);
      try {
        // eslint-disable-next-line no-unused-vars
        const response = await servicesModule0.createFundGroup(data);
        this.getAllFundGroup();
        this.term="";
        this.model.GROUP_ASSET="";
        this.model.GROUP_FUND="";
        // this.$modals.simpleModal.$hide()
      } catch (error) {
        console.log(error);
      }
    },

    async editFundGroup(data) {
      const response = await servicesModule0.getFundGroupById(
        data.FMS_FUNDCATEGORY_ID
      );
      this.$modals.simpleModalEditFundGroup.$show();
      this.FMS_FUNDCATEGORY_ID = response.FMS_FUNDCATEGORY_ID;
      this.model.editFundGroup = response;
      console.log(response);
    },

    async updateFundGroupAPI() {
      try {
        const data = new FormData();
        data.append(
          "FMS_FUNDCATEGORY_ID",
          this.FMS_FUNDCATEGORY_ID
        );
        data.append("GROUP_ASSET", this.model.editFundGroup.GROUP_ASSET);
        data.append("GROUP_FUND", this.model.editFundGroup.GROUP_FUND);
        const response = await servicesModule0.updateFundGroup(data);
        this.getAllFundGroup();
        this.term="";
      } catch (error) {
        console.log(error);
      }
    },

    async deleteFundGroup(data) {
      if (confirm("Are you sure you want to delete?")) {
      // eslint-disable-next-line no-unused-vars
      const response = await servicesModule0.deleteFundGroup(
        data.FMS_FUNDCATEGORY_ID
      );
      this.getAllFundGroup();
      this.term="";
      }
    },
//--------- NAV  Cut OFF Time

getAllNavTime: async function () {

      const response = await servicesModule0.getNavTimeById();
      console.log("Time Local=",response);
      this.FMS_CUTOFF_TIME_ID = response.FMS_CUTOFF_TIME_ID;
      this.model.NAV_LOCAL_START_TIME = response.NAV_LOCAL_START_TIME;
      this.model.NAV_LOCAL_END_TIME = response.NAV_LOCAL_END_TIME;
      this.model.NAV_FOREIGN_START_TIME = response.NAV_FOREIGN_START_TIME;
      this.model.NAV_FOREIGN_END_TIME = response.NAV_FOREIGN_END_TIME;

    },
  async submitNav() {
      let app = this;
      var param = app.model;
      const data = new FormData();
      data.append("NAV_LOCAL_START_TIME", this.model.NAV_LOCAL_START_TIME);
      data.append("NAV_LOCAL_END_TIME", this.model.NAV_LOCAL_END_TIME);
      data.append("NAV_FOREIGN_START_TIME", this.model.NAV_FOREIGN_START_TIME);
      data.append("NAV_FOREIGN_END_TIME", this.model.NAV_FOREIGN_END_TIME);

     /* data.append("NAV_LOCAL_START_TIME", moment(this.model.NAV_LOCAL_START_TIME).format("h:m:s"));
      data.append("NAV_LOCAL_END_TIME", moment(this.model.NAV_LOCAL_END_TIME).format("h:m:s"));
      data.append("NAV_FOREIGN_START_TIME", moment(this.model.NAV_FOREIGN_START_TIME).format("h:m:s"));
      data.append("NAV_FOREIGN_END_TIME", moment(this.model.NAV_FOREIGN_END_TIME).format("h:m:s"));*/
      try {
        // eslint-disable-next-line no-unused-vars
        const response = await servicesModule0.createNavTime(data);
        this.getAllNavTime();
        this.term="";
        this.model.NAV_LOCAL_START_TIME="";
        this.model.NAV_LOCAL_END_TIME="";
        this.model.NAV_FOREIGN_START_TIME="";
        this.model.NAV_FOREIGN_END_TIME="";
      } catch (error) {
        console.log(error);
      }
    },
//----- fund Notes 

getAllFundNotes: async function () {
      const response = await servicesModule0.getAllFundNotesList();
      this.fundNotesList = response;
      this.FundNotesCount = this.fundNotesList.length;
    },

    async submitFundNotes() {
      let app = this;
      var param = app.model;
      const data = new FormData();
      data.append("FUNDNOTES_DESC", this.model.FUNDNOTES_DESC);
      try {
        // eslint-disable-next-line no-unused-vars
        const response = await servicesModule0.createFundNotes(data);
        this.getAllFundNotes();
        this.term="";
        this.model.FUNDNOTES_DESC="";
        // this.$modals.simpleModal.$hide()
      } catch (error) {
        console.log(error);
      }
    },

    async editFundNotes(data) {
      const response = await servicesModule0.getFundNotesById(
        data.FUNDNOTES_ID
      );
      this.$modals.simpleModalEditFundNotes.$show();
      this.FUNDNOTES_ID = response.FUNDNOTES_ID;
      this.model.editFundNotes = response;
      console.log(response);
    },

    async updateFundNotesAPI() {
      try {
        const data = new FormData();
        data.append(
          "FUNDNOTES_ID",
          this.FUNDNOTES_ID
        );
        data.append("FUNDNOTES_DESC", this.model.editFundNotes.FUNDNOTES_DESC);
        const response = await servicesModule0.updateFundNotes(data);
        this.getAllFundNotes();
         this.term="";
      } catch (error) {
        console.log(error);
      }
    },

    async deleteFundNotes(data) {
      if (confirm("Are you sure you want to delete?")) {
      // eslint-disable-next-line no-unused-vars
      const response = await servicesModule0.deleteFundNotes(
        data.FUNDNOTES_ID
      );
      this.getAllFundNotes();
       this.term="";
      }
    },

    //-------- fund Domicile 
    getAllFundDomicile: async function () {
      const response = await servicesModule0.getAllFundDomicileList();
      this.fundDomicileList = response;
      this.FundDomicileCount = this.fundDomicileList.length;
    },

    async submitFundDomicile() {
      let app = this;
      var param = app.model;
      const data = new FormData();
      data.append("FUND_DOMICILE_NAME", this.model.FUND_DOMICILE_NAME);
      try {
        // eslint-disable-next-line no-unused-vars
        const response = await servicesModule0.createFundDomicile(data);
        this.getAllFundDomicile();
        this.model.FUND_DOMICILE_NAME="";
        // this.$modals.simpleModal.$hide()
      } catch (error) {
        console.log(error);
      }
    },

    async editFundDomicile(data) {
      const response = await servicesModule0.getFundDomicileById(
        data.FUND_DOMICILE_ID
      );
      this.$modals.simpleModalEditFundDomicile.$show();
      this.FUND_DOMICILE_ID = response.FUND_DOMICILE_ID;
      this.model.editFundDomicile = response;
      console.log(response);
    },

    async updateFundDomicileAPI() {
      try {
        const data = new FormData();
        data.append(
          "FUND_DOMICILE_ID",
          this.FUND_DOMICILE_ID
        );
        data.append("FUND_DOMICILE_NAME", this.model.editFundDomicile.FUND_DOMICILE_NAME);
        const response = await servicesModule0.updateFundDomicile(data);
        this.getAllFundDomicile();
      } catch (error) {
        console.log(error);
      }
    },

    async deleteFundDomicile(data) {
      if (confirm("Are you sure you want to delete?")) {
      // eslint-disable-next-line no-unused-vars
      const response = await servicesModule0.deleteFundDomicile(
        data.FUND_DOMICILE_ID
      );
      this.getAllFundDomicile();
      }
    },
  
  // --- Scheme Structure

  getAllScheme: async function () {
      const response = await servicesModule0.getAllSchemeList();
      this.schemeList = response;
      this.schemeCount = this.schemeList.length;
      this.term="";
      console.log("schemeList=",this.schemeList);
    },

    async submitScheme() {
      let app = this;
      var param = app.model;
      const data = new FormData();
      data.append("FMS_SCHEME_NAME", this.model.FMS_SCHEME_NAME);
      try {
        // eslint-disable-next-line no-unused-vars
        const response = await servicesModule0.createScheme(data);
        this.getAllScheme();
        this.model.FMS_SCHEME_NAME="";
        this.term="";
        // this.$modals.simpleModal.$hide()
      } catch (error) {
        console.log(error);
      }
    },

    async editScheme(data) {
      const response = await servicesModule0.getSchemeById(
        data.FMS_SCHEME_ID
      );
      this.$modals.simpleModalEditScheme.$show();
      this.FMS_SCHEME_ID = response.FMS_SCHEME_ID;
      this.model.editScheme = response;
      console.log(response);
    },

    async updateSchemeAPI() {
      try {
        const data = new FormData();
        data.append(
          "FMS_SCHEME_ID",
          this.FMS_SCHEME_ID
        );
        data.append("FMS_SCHEME_NAME", this.model.editScheme.FMS_SCHEME_NAME);
        const response = await servicesModule0.updateScheme(data);
        this.getAllScheme();
         this.term="";
      } catch (error) {
        console.log(error);
      }
    },

    async deleteScheme(data) {
      if (confirm("Are you sure you want to delete?")) {
      // eslint-disable-next-line no-unused-vars
      const response = await servicesModule0.deleteScheme(
        data.FMS_SCHEME_ID
      );
      this.getAllScheme();
       this.term="";
      }
    },

//----- Remark Option 
getAllRemark: async function () {
      const response = await servicesModule0.getAllRemarkList();
      this.remarkList = response;
      this.RemarkCount = this.remarkList.length;
    },

    async submitRemark() {
      let app = this;
      var param = app.model;
      const data = new FormData();
      data.append("FMS_REMARK_OPTION_NAME", this.model.FMS_REMARK_OPTION_NAME);
      try {
        // eslint-disable-next-line no-unused-vars
        const response = await servicesModule0.createRemark(data);
        this.getAllRemark();
        this.term="";
        this.model.FMS_REMARK_OPTION_NAME="";
        // this.$modals.simpleModal.$hide()
      } catch (error) {
        console.log(error);
      }
    },

    async editRemark(data) {
      const response = await servicesModule0.getRemarkById(
        data.FMS_REMARK_OPTION_ID
      );
      this.$modals.simpleModalEditRemark.$show();
      this.FMS_REMARK_OPTION_ID = response.FMS_REMARK_OPTION_ID;
      this.model.editRemark = response;
      console.log(response);
    },

    async updateRemarkAPI() {
      try {
        const data = new FormData();
        data.append(
          "FMS_REMARK_OPTION_ID",
          this.FMS_REMARK_OPTION_ID
        );
        data.append("FMS_REMARK_OPTION_NAME", this.model.editRemark.FMS_REMARK_OPTION_NAME);
        const response = await servicesModule0.updateRemark(data);
        this.getAllRemark();
         this.term="";
      } catch (error) {
        console.log(error);
      }
    },

    async deleteRemark(data) {
      if (confirm("Are you sure you want to delete?")) {
      // eslint-disable-next-line no-unused-vars
      const response = await servicesModule0.deleteRemark(
        data.FMS_REMARK_OPTION_ID
      );
      this.getAllRemark();
       this.term="";
      }
    },

   // Reason Option

   getAllReason: async function () {
      const response = await servicesModule0.getAllReasonList();
      this.reasonList = response;
      this.ReasonCount = this.reasonList.length;
    },

    async submitReason() {
      let app = this;
      var param = app.model;
      const data = new FormData();
      data.append("FMS_REASON_OPTION_NAME", this.model.FMS_REASON_OPTION_NAME);
      try {
        // eslint-disable-next-line no-unused-vars
        const response = await servicesModule0.createReason(data);
        this.getAllReason();
        this.model.FMS_REASON_OPTION_NAME="";
        this.term="";
        // this.$modals.simpleModal.$hide()
      } catch (error) {
        console.log(error);
      }
    },

    async editReason(data) {
      const response = await servicesModule0.getReasonById(
        data.FMS_REASON_OPTION_ID
      );
      this.$modals.simpleModalEditReason.$show();
      this.FMS_REASON_OPTION_ID = response.FMS_REASON_OPTION_ID;
      this.model.editReason = response;
      console.log(response);
    },

    async updateReasonAPI() {
      try {
        const data = new FormData();
        data.append(
          "FMS_REASON_OPTION_ID",
          this.FMS_REASON_OPTION_ID
        );
        data.append("FMS_REASON_OPTION_NAME", this.model.editReason.FMS_REASON_OPTION_NAME);
        const response = await servicesModule0.updateReason(data);
        this.getAllReason();
        this.term="";
      } catch (error) {
        console.log(error);
      }
    },

    async deleteReason(data) {
      if (confirm("Are you sure you want to delete?")) {
      // eslint-disable-next-line no-unused-vars
      const response = await servicesModule0.deleteReason(
        data.FMS_REASON_OPTION_ID
      );
      this.getAllReason();
      this.term="";
      }
    },

  // Umbrella FUnd 

  getAllUmbrella: async function () {
      const response = await servicesModule0.getAllUmbrellafundList();
      this.umbrellaList = response;
      this.UmbrellaCount = this.umbrellaList.length;
      this.term="";
    },

    async submitUmbrella() {
      let app = this;
      var param = app.model;
      const data = new FormData();
      data.append("UMBRELLA_FUND_NAME", this.model.UMBRELLA_FUND_NAME);
      try {
        // eslint-disable-next-line no-unused-vars
        const response = await servicesModule0.createUmbrellafund(data);
        this.getAllUmbrella();
        this.model.UMBRELLA_FUND_NAME="";
        this.term="";
        // this.$modals.simpleModal.$hide()
      } catch (error) {
        console.log(error);
      }
    },

    async editUmbrella(data) {
      const response = await servicesModule0.getUmbrellafundById(
        data.FMS_UMBRELLA_FUND_ID
      );
      this.$modals.simpleModalEditUmbrella.$show();
      this.FMS_UMBRELLA_FUND_ID = response.FMS_UMBRELLA_FUND_ID;
      this.model.editUmbrella = response;
      console.log(response);
    },

    async updateUmbrellaAPI() {
      try {
        const data = new FormData();
        data.append(
          "FMS_UMBRELLA_FUND_ID",
          this.FMS_UMBRELLA_FUND_ID
        );
        data.append("UMBRELLA_FUND_NAME", this.model.editUmbrella.UMBRELLA_FUND_NAME);
        const response = await servicesModule0.updateUmbrellafund(data);
        this.getAllUmbrella();
        this.term="";
      } catch (error) {
        console.log(error);
      }
    },

    async deleteUmbrella(data) {
      if (confirm("Are you sure you want to delete?")) {
      // eslint-disable-next-line no-unused-vars
      const response = await servicesModule0.deleteUmbrellafund(
        data.FMS_UMBRELLA_FUND_ID
      );
      this.getAllUmbrella();
      this.term="";
      }
    },
  },
  computed: {
    FundTypeList() {
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
          name: "FUND_NAME",
          title: "NAME ",
          sortField: "FUND_NAME",
        },
         {
          name: "FUND_TYPE_FULLNAME",
          title: "FUND TYPE FULLNAME ",
          sortField: "FUND_TYPE_FULLNAME",
        },

        {
          name: "__slot:actions",
          title: "Action",
          dataClass: "justify-content-center",
          width: "15%",
        },
      ];
    },
    filteredFundType() {

     if (!this.term || this.term.length < 1) {
        return this.fundTypeList;
     }
    },

FundCategoryList() {
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
          name: "SALE_FROM",
          title: "SALES CHARGE (%) FROM ",
          sortField: "SALE_FROM",
        },
        {
          name: "SALE_TO",
          title: "SALES CHARGE (%) TO",
          sortField: "SALE_TO",
        },
        {
          name: "FUND_CATEGORY",
          title: "FUND CATEGORY ",
          sortField: "FUND_CATEGORY",
        },
        {
          name: "__slot:actions",
          title: "Action",
          dataClass: "justify-content-center",
          width: "15%",
        },
      ];
    },
    filteredFundCategory() {
      if (!this.term || this.term.length < 1) {
        return this.fundCategoryList;
      }
    },
    FundGroupList() {
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
          name: "GROUP_ASSET",
          title: "ASSET GROUP",
          sortField: "GROUP_ASSET",
        },
        {
          name: "GROUP_FUND",
          title: "FUND GROUP",
          sortField: "GROUP_FUND",
        },
        {
          name: "__slot:actions",
          title: "Action",
          dataClass: "justify-content-center",
          width: "15%",
        },
      ];
    },
    filteredFundGroup() {
      if (!this.term || this.term.length < 1) {
        return this.fundGroupList;
      }
    },
    FundNotesList() {
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
          name: "FUNDNOTES_DESC",
          title: "FUND NOTES",
          sortField: "FUNDNOTES_DESC",
        },
        {
          name: "__slot:actions",
          title: "Action",
          dataClass: "justify-content-center",
          width: "15%",
        },
      ];
    },
    filteredFundNotes() {
      if (!this.term || this.term.length < 1) {
        return this.fundNotesList;
      }
    },
    FundDomicileList() {
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
          name: "FUND_DOMICILE_NAME",
          title: "NAME ",
          sortField: "FUND_DOMICILE_NAME",
        },
        {
          name: "__slot:actions",
          title: "Action",
          dataClass: "justify-content-center",
          width: "15%",
        },
      ];
    },
    filteredFundDomicile() {
      if (!this.term || this.term.length < 1) {
        return this.fundDomicileList;
      }
    },

    SchemeList() {
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
          name: "FMS_SCHEME_NAME",
          title: "SCHEME NAME ",
          sortField: "FMS_SCHEME_NAME",
        },
        {
          name: "__slot:actions",
          title: "Action",
          dataClass: "justify-content-center",
          width: "15%",
        },
      ];
    },
    filteredScheme() {
      if (!this.term || this.term.length < 1) {
        return this.schemeList;
      }
    },

    RemarkList() {
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
          name: "FMS_REMARK_OPTION_NAME",
          title: "REASON",
          sortField: "FMS_REMARK_OPTION_NAME",
        },
        {
          name: "__slot:actions",
          title: "Action",
          dataClass: "justify-content-center",
          width: "15%",
        },
      ];
    },
    filteredRemark() {
      if (!this.term || this.term.length < 1) {
        return this.remarkList;
      }
    },
    ReasonList() {
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
          name: "FMS_REASON_OPTION_NAME",
          title: "REASON ",
          sortField: "FMS_REASON_OPTION_NAME",
        },
        {
          name: "__slot:actions",
          title: "Action",
          dataClass: "justify-content-center",
          width: "15%",
        },
      ];
    },
    filteredReason() {
      if (!this.term || this.term.length < 1) {
        return this.reasonList;
      }
    },
    UmbrellaList() {
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
          name: "UMBRELLA_FUND_NAME",
          title: "NAME ",
          sortField: "UMBRELLA_FUND_NAME",
        },
        {
          name: "__slot:actions",
          title: "Action",
          dataClass: "justify-content-center",
          width: "15%",
        },
      ];
    },
    filteredUmbrella() {
     if (!this.term1 || this.term1.length < 1) {
        return this.umbrellaList;
     }

     return this.umbrellaList.filter((item) => {
        return this.term1
          .toLowerCase()
          .split(" ")
          .every(
            (v) =>
              item.UMBRELLA_FUND_NAME.toLowerCase().includes(v) //||
             // item.FINANCE_ACC_CODE_NAME.toLowerCase().includes(v) ||
             // item.ACC_CODE.includes(v) //||
              //item.CODE_TYPE.includes(v) ||
             // item.STATUS2.includes(v)

          );
      });

    },
  },
};
</script>
<style lang="scss" scoped>
.start{
  color:red;
}
.form-gap{
  margin-top: 10px;
}
</style>>

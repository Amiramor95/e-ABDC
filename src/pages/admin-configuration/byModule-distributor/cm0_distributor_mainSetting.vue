<template>
  <va-card>
    <div class="col-lg-10">
      <h4 slot="header">SETTING BY MODULE</h4>
    </div>
    <br />
    <br />

    <h5>
      <i class="fa fa-bank"></i>&nbsp;&nbsp;
      <b>DISTRIBUTOR</b>
    </h5>
    <hr />

    <div class="ml-5">
      <!-- Marketing Approach -->
      <div>
        <span>MARKETING APPROACH</span>
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
                :schema="addmarketingApproachSchema"
                :options="formOptions"
                 ref="addmarketingForm"
                />
              </div>
            </div>
            <br />
            <br /><br />
            <div class="row">
              <div class="col-6">
                <button
                    type="button"
                    @click="submitMarketingApproach"
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
                :fields="marketingApproach"
                :data="filteredmarketingApproach"
                :per-page="parseInt(perPage)"
                :datacount="MarketingApproachCount"
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
                      v-on:click="editmarketingApproach(props.rowData)"
                    >
                      <i class="fa fa-edit"></i
                    ></span>
                    <span
                      v-b-tooltip.hover
                      title="delete"
                      class="badge badge-danger mr-1"
                      v-on:click="deletemarketingApproach(props.rowData)"
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

      <!-- Type of Structure -->
      <div>
        <span>TYPE OF STRUCTURE</span>
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
        <!-- <div v-for="(item, index) in fivemo  dule" :key="index"></div> -->
        <b-collapse v-model="visibleBlockDuration" class="mt-4" id="collapse-2">
          <va-card>
            <div class="row">
              <div class="ml-4 col-md-10">
                 <vue-form-generator
                :model="model"
                :schema="addTypeStructureSchema"
                :options="formOptions"
                 ref="addStructureForm"
                />
              </div>
            </div>
            <br />
            <br /><br />
            <div class="row">
              <div class="col-6">
                <button
                  @click="submitStructure"
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
                :fields="typeStructure"
                :data="filteredtypeStructure"
                :per-page="parseInt(perPage)"
                :datacount="TypeStructureCount"
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
                      v-on:click="editTypeStructure(props.rowData)"
                    >
                      <i class="fa fa-edit"></i
                    ></span>
                    <span
                      v-b-tooltip.hover
                      title="delete"
                      class="badge badge-danger mr-1"
                      v-on:click="deleteTypeStructure(props.rowData)"
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

      <!-- Distributor Type  -->
      <div>
        <span>DISTRIBUTOR TYPE</span>
         <button
              v-b-toggle.collapse-2
              type="button"
              class="float-right btn-fill btn-md"
              v-on:click="DistType"
            >
              <i class="fa fa-edit"></i>
            </button>
 </div>
        <!-- <b-collapse
          v-model="visibleBlockDuration2"
          class="mt-4"
          id="collapse-3"
        > -->
          <!-- <va-card>
            <div class="row">
              <div class="ml-4 col-md-10">
                <span class="col mt-3 description">DISTRIBUTOR TYPE </span>
                <input
                  type="text"
                  v-model="model.DIST_TYPE_NAME"
                  placeholder="ENTER DISTRIBUTOR TYPE"
                  class="float-right col-8 form-control form-control-md"
                />
              </div>
              <br />
              <br />
              <div class="ml-4 col-md-10">
                <span class="col mt-3 description">MARKETING APPROACH </span>
                <multiselect
                  v-model="model.DIST_MARKETING_ID"
                  :options="MarketingApproachList"
                  placeholder="Select Marketing Group"
                  label="DIST_SET_PARAM"
                  class="float-right col-8"
                ></multiselect>
              </div>
              <br />
              <br />
              <div class="ml-4 col-md-10">
                <span class="col mt-3 description">TYPE STRUCTURE </span>
                <multiselect
                  v-model="model.TYPE_STRUCTURE_ID"
                  :options="TypeStructure"
                  placeholder="Select Marketing Group"
                  label="DIST_SET_PARAM"
                  class="float-right col-8"
                ></multiselect>
              </div>
            </div>
            <br />
            <br /><br />
            <div class="row">
              <span class="col mt-3 description">TYPE OF VARIATION</span>
              <div class="col-md-9">
                <div class="row">
                  <div
                    class="col-4"
                    v-for="(item, index) in model.VARIATION"
                    :key="index"
                  >
                    <div class="row mb-2">
                      <va-checkbox
                        class="col-2"
                        v-model="item.selected"
                      ></va-checkbox>
                      <span class="col">
                        {{ item.name }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br />
              <br />
              <div class="ml-4 col-md-10">
                <span class="col mt-3 description">SCHEME</span>
                <multiselect
                  v-model="model.SCHEME"
                  :options="ConsultantTypeList"
                  placeholder="SELECT SCHEME"
                  label="TYPE_NAME"
                  class="float-right col-8"
                ></multiselect>
              </div>
            <br />
            <br /><br />
            <div class="row">
              <div class="col-10">
                <button
                  @click="submitDistributorType"
                  type="button"
                  class="float-right btn btn-primary btn-fill btn-md"
                >
                  <i class="fa fa-save" />&nbsp; SAVE
                </button>
              </div>
            </div>

            <va-card class="mt-2">
              <va-data-table
                :fields="distributorType"
                :data="filteredDistributorType"
                :per-page="parseInt(perPage)"
                :datacount="DistributorCount"
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
                      v-on:click="editDistributorType(props.rowData)"
                    >
                      <i class="fa fa-edit"></i
                    ></span>
                    <span
                      v-b-tooltip.hover
                      title="edit"
                      class="badge badge-danger mr-1"
                      v-on:click="deleteDistType(props.rowData)"
                    >
                      <i class="fa fa-trash"></i
                    ></span>
                  </h4>
                </template>
              </va-data-table>
              <br />
            </va-card>
          </va-card> -->
        <!-- </b-collapse> -->
        <hr />

      <!-- Status -->

      <div>
        <span>STATUS</span>
        <button
          v-if="visibleBlockDuration3 == false"
          v-b-toggle.collapse-4
          type="button"
          class="float-right btn-fill btn-md"
        >
          <i class="fa fa-edit"></i>
        </button>
        <button
          v-if="visibleBlockDuration3 == true"
          v-b-toggle.collapse-4
          type="button"
          class="float-right btn-fill btn-md"
        >
          <i class="fa fa-times"></i>
        </button>
        <b-collapse
          v-model="visibleBlockDuration3"
          class="mt-4"
          id="collapse-4"
        >
          <va-card>
            <div class="row">
              <div class="ml-4 col-md-10">
                <vue-form-generator
                :model="model"
                :schema="addStatusSchema"
                :options="formOptions"
                 ref="addStatusForm"
                />
              </div>
            </div>
            <br />
            <br /><br />
            <div class="row">
              <div class="col-6">
                <button
                  @click="submitStatus"
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
                :fields="Status"
                :data="filteredStatus"
                :per-page="parseInt(perPage)"
                :datacount="StatusCount"
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
                      v-on:click="editStatus(props.rowData)"
                    >
                      <i class="fa fa-edit"></i
                    ></span>
                    <span
                      v-b-tooltip.hover
                      title="deletes"
                      class="badge badge-danger mr-1"
                      v-on:click="deleteStatus(props.rowData)"
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

      <!-- Cessation type  -->
      <div>
        <span>CESSATION TYPE</span>
        <button
          v-if="visibleBlockDuration4 == false"
          v-b-toggle.collapse-5
          type="button"
          class="float-right btn-fill btn-md"
        >
          <i class="fa fa-edit"></i>
        </button>
        <button
          v-if="visibleBlockDuration4 == true"
          v-b-toggle.collapse-5
          type="button"
          class="float-right btn-fill btn-md"
        >
          <i class="fa fa-times"></i>
        </button>
        <!-- <div v-for="(item, index) in fivemo  dule" :key="index"></div> -->
        <b-collapse
          v-model="visibleBlockDuration4"
          class="mt-4"
          id="collapse-5"
        >
          <va-card>
            <div class="row">
              <div class="ml-4 col-md-10">
                 <vue-form-generator
                :model="model"
                :schema="addCessationSchema"
                :options="formOptions"
                 ref="addCessationForm"
                />
              </div>
            </div>
            <br />
            <br /><br />
            <div class="row">
              <div class="col-6">
                <button
                  @click="submitCessation"
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
                :fields="CessationList"
                :data="filteredCessationList"
                :per-page="parseInt(perPage)"
                :datacount="CessationCount"
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
                      v-on:click="editCessation(props.rowData)"
                    >
                      <i class="fa fa-edit"></i
                    ></span>
                    <span
                      v-b-tooltip.hover
                      title="delete"
                      class="badge badge-danger mr-1"
                      v-on:click="deleteCessation(props.rowData)"
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
        <!-- Appeal Duration  REVocation -->
      <div>
        <span>APPEAL DURATION REVOCATION</span>
        <button
          v-if="visibleBlockDuration11 == false"
          v-b-toggle.collapse-11
          type="button"
          class="float-right btn-fill btn-md"
        >
          <i class="fa fa-edit"></i>
        </button>
        <button
          v-if="visibleBlockDuration11 == true"
          v-b-toggle.collapse-11
          type="button"
          class="float-right btn-fill btn-md"
        >
          <i class="fa fa-times"></i>
        </button>
        <!-- <div v-for="(item, index) in fivemo  dule" :key="index"></div> -->
        <b-collapse
          v-model="visibleBlockDuration11"
          class="mt-4"
          id="collapse-11"
        >
          <va-card>
            <div class="row">
              <div class="ml-4 col-md-10">
                <vue-form-generator
                :model="model"
                :schema="addAppealRevocationSchema"
                :options="formOptions"
                 ref="addAppealForm"
                />
              </div>
            </div>
            <br />
            <br /><br />
            <div class="row">
              <div class="col-10">
                <button
                  @click="updateAppealRevokeAPI"
                  type="button"
                  class="float-right btn btn-primary btn-fill btn-md"
                >
                  <i class="fa fa-save" />&nbsp; SAVE
                </button>
              </div>
            </div>
            <br /><br />
            <!-- list -->
            <!-- <va-card class="mt-2">
              <va-data-table
                :fields="AppealList"
                :data="filteredAppealList"
                :per-page="parseInt(perPage)"
                :datacount="appealListCount"
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
                      v-on:click="editAppealData(props.rowData)"
                    >
                      <i class="fa fa-edit"></i
                    ></span>
                    <span
                      v-b-tooltip.hover
                      title="delete"
                      class="badge badge-danger mr-1"
                      v-on:click="deleteAppeal(props.rowData)"
                    >
                      <i class="fa fa-trash"></i
                    ></span>
                  </h4>
                </template>
              </va-data-table>
              <br />
            </va-card> -->
          </va-card>
        </b-collapse>
        <hr />
      </div>

       <!-- Appeal Duration  -->
      <div>
        <span>APPEAL DURATION SUSPENSION</span>
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
        <!-- <div v-for="(item, index) in fivemo  dule" :key="index"></div> -->
        <b-collapse
          v-model="visibleBlockDuration6"
          class="mt-4"
          id="collapse-8"
        >
          <va-card>
            <div class="row">
              <div class="ml-4 col-md-10">
                <vue-form-generator
                :model="model"
                :schema="addAppealSchema"
                :options="formOptions"
                 ref="addAppealForm"
                />
              </div>
            </div>
            <br />
            <br /><br />
            <div class="row">
              <div class="col-10">
                <button
                  @click="updateAppealSuspensionAPI"
                  type="button"
                  class="float-right btn btn-primary btn-fill btn-md"
                >
                  <i class="fa fa-save" />&nbsp; SAVE
                </button>
              </div>
            </div>
            <br /><br />
            <!-- list -->
            <!-- <va-card class="mt-2">
              <va-data-table
                :fields="AppealList"
                :data="filteredAppealList"
                :per-page="parseInt(perPage)"
                :datacount="appealListCount"
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
                      v-on:click="editAppealData(props.rowData)"
                    >
                      <i class="fa fa-edit"></i
                    ></span>
                    <span
                      v-b-tooltip.hover
                      title="delete"
                      class="badge badge-danger mr-1"
                      v-on:click="deleteAppeal(props.rowData)"
                    >
                      <i class="fa fa-trash"></i
                    ></span>
                  </h4>
                </template>
              </va-data-table>
              <br />
            </va-card> -->
          </va-card>
        </b-collapse>
        <hr />
      </div>


       <!-- Return Duration  -->
      <div>
        <span>RETURN DURATION</span>
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
        <!-- <div v-for="(item, index) in fivemo  dule" :key="index"></div> -->
        <b-collapse
          v-model="visibleBlockDuration7"
          class="mt-4"
          id="collapse-9"
        >
          <va-card>
            <div class="row">
              <div class="ml-4 col-md-10">
                <vue-form-generator
                :model="model"
                :schema="addReturnSchema"
                :options="formOptions"
                 ref="addReturnForm"
                />
              </div>
            </div>
            <br />
            <br /><br />
            <div class="row">
              <div class="col-6">
                <button
                  @click="updateReturnAPI"
                  type="button"
                  class="float-right btn btn-primary btn-fill btn-md"
                >
                  <i class="fa fa-save" />&nbsp; SAVE
                </button>
              </div>
            </div>
            <br /><br />
            <!-- list -->
            <!-- <va-card class="mt-2">
              <va-data-table
                :fields="ReturnDurationlList"
                :data="filteredReturnList"
                :per-page="parseInt(perPage)"
                :datacount="returnListCount"
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
                      v-on:click="editReturnData(props.rowData)"
                    >
                      <i class="fa fa-edit"></i
                    ></span>
                    <span
                      v-b-tooltip.hover
                      title="delete"
                      class="badge badge-danger mr-1"
                      v-on:click="deleteReturn(props.rowData)"
                    >
                      <i class="fa fa-trash"></i
                    ></span>
                  </h4>
                </template>
              </va-data-table>
              <br />
            </va-card> -->
          </va-card>
        </b-collapse>
        <hr />
      </div>


      <!-- DISTRIBUTOR DECLARATION  -->

      <div>
        <span>DISTRIBUTOR DECLARATION IN RENEWAL</span>
        <button
          v-if="visibleBlockDuration5 == false"
          v-b-toggle.collapse-6
          type="button"
          class="float-right btn-fill btn-md"
        >
          <i class="fa fa-edit"></i>
        </button>
        <button
          v-if="visibleBlockDuration5 == true"
          v-b-toggle.collapse-6
          type="button"
          class="float-right btn-fill btn-md"
        >
          <i class="fa fa-times"></i>
        </button>
        <!-- <div v-for="(item, index) in fivemo  dule" :key="index"></div> -->
        <b-collapse
          v-model="visibleBlockDuration5"
          class="mt-4"
          id="collapse-6"
        >
          <va-card>
            <div class="row">
              <div class="ml-4 col-md-10">
            <vue-form-generator
            :model="model"
            :schema="addDeclarationSchema"
            :options="formOptions"
            ref="addDeclarationForm"
            />
            </div>
            </div>
            <br />
            <br /><br />
            <div class="row">
              <div class="col-10">
                <button
                  @click="submitDeclaration"
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
                :fields="DeclarationList"
                :data="filteredDeclarationList"
                :per-page="parseInt(perPage)"
                :datacount="DeclarationCount"
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
                      v-on:click="editDeclaration(props.rowData)"
                    >
                      <i class="fa fa-edit"></i
                    ></span>
                    <span
                      v-b-tooltip.hover
                      title="delete"
                      class="badge badge-danger mr-1"
                      v-on:click="deleteDeclaration(props.rowData)"
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
              @click="distributor_declaration"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
    </div>
    <!-- Marketing Approach  -->
    <vudal name="simpleModalEditMarketingApproach" class="widthModal">
      <div class="header">
        EDIT MARKETING APPROACH<i class="close icon">&times;</i>
      </div>
      <div class="content">
        <vue-form-generator
          :model="model"
          :schema="editmarketingApproachSchema"
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
          @click="updatemarketingApproachAPI"
          type="button"
          class="cancel vudal-btn mr-2 btn btn-primary btn-fill btn-md"
        >
          <i class="fa fa-edit" /> &nbsp; UPDATE
        </button>
      </div>
    </vudal>

    <!-- Type of Structure -->
    <vudal name="simpleModalEditTypeStructure" class="widthModal">
      <div class="header">
        EDIT TYPE OF STRUCTURE<i class="close icon">&times;</i>
      </div>
      <div class="content">
        <vue-form-generator
          :model="model"
          :schema="editTypeStructureSchema"
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
          @click="updateTypeStructureAPI"
          type="button"
          class="cancel vudal-btn mr-2 btn btn-primary btn-fill btn-md"
        >
          <i class="fa fa-edit" /> &nbsp; UPDATE
        </button>
      </div>
    </vudal>
    <!-- ----------Distributor Type------------ -->
    <vudal name="simpleModalEditDistType" class="widthModal">
      <div class="header">
        EDIT DISTRIBUTOR TYPE<i class="close icon">&times;</i>
      </div>
      <div class="content">
        <vue-form-generator
          :model="model"
          :schema="editDistTypeSchema"
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
          @click="updateDistTypeAPI"
          type="button"
          class="cancel vudal-btn mr-2 btn btn-primary btn-fill btn-md"
        >
          <i class="fa fa-edit" /> &nbsp; UPDATE
        </button>
      </div>
    </vudal>
    <!-- STATUS  -->
    <vudal name="simpleModalEditStatus" class="widthModal">
      <div class="header">EDIT STATUS<i class="close icon">&times;</i></div>
      <div class="content">
        <vue-form-generator
          :model="model"
          :schema="editStatusSchema"
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
          @click="updateStatusAPI"
          type="button"
          class="cancel vudal-btn mr-2 btn btn-primary btn-fill btn-md"
        >
          <i class="fa fa-edit" /> &nbsp; UPDATE
        </button>
      </div>
    </vudal>
    <!-- ------- Cessation Type ------------- -->

    <vudal name="simpleModalEditCessation" class="widthModal">
      <div class="header">
        EDIT CESSATION TYPE<i class="close icon">&times;</i>
      </div>
      <div class="content">
        <vue-form-generator
          :model="model"
          :schema="editCessationSchema"
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
          @click="updateCessationAPI"
          type="button"
          class="cancel vudal-btn mr-2 btn btn-primary btn-fill btn-md"
        >
          <i class="fa fa-edit" /> &nbsp; UPDATE
        </button>
      </div>
    </vudal>

    <!-- --------------- DISTRIBUTION DECLARATION ----------- -->

    <vudal name="simpleModalEditDeclaration" class="widthModal">
      <div class="header">
        EDIT DISTRIBUTOR DECLARATION<i class="close icon">&times;</i>
      </div>
      <div class="content">
        <vue-form-generator
          :model="model"
          :schema="editDeclarationSchema"
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
          @click="updateDeclarationAPI"
          type="button"
          class="cancel vudal-btn mr-2 btn btn-primary btn-fill btn-md"
        >
          <i class="fa fa-edit" /> &nbsp; UPDATE
        </button>
      </div>
    </vudal>
        <vudal name="simpleModalEditAppeal" class="widthModal">
      <div class="header">
        EDIT APPEAL DURATION<i class="close icon">&times;</i>
      </div>
      <div class="content">
        <vue-form-generator
          :model="model"
          :schema="editAppealSchema"
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
          @click="updateAppealAPI"
          type="button"
          class="cancel vudal-btn mr-2 btn btn-primary btn-fill btn-md"
        >
          <i class="fa fa-edit" /> &nbsp; UPDATE
        </button>
      </div>
    </vudal>
     <vudal name="simpleModalEditReturn" class="widthModal">
      <div class="header">
        EDIT RETURN DURATION<i class="close icon">&times;</i>
      </div>
      <div class="content">
        <vue-form-generator
          :model="model"
          :schema="editReturnSchema"
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
          @click="updateReturnAPI"
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
import Vudal from "vudal";
import "vue-form-generator/dist/vfg.css";
import * as servicesModule0 from "../../../app/module0/services02";
import { debounce } from "lodash";
Vue.component("field-vfg-functional-date", VfgFunctionalDate);
import VfgFunctionalDate from "../../component/VfgFunctionalCalendar.vue";
import moment from "moment";
import FullCalendar from "@fullcalendar/vue";
import interactionPlugin from "@fullcalendar/interaction";
import { DeleteDistributorMarketingApproach } from "../../../app/module0/acap";

export default {
  mounted() {
    this.getAllmarketingApproach();
    this.getAllTypeStructure();
    this.getAllStatus();
    this.getAllCessation();
    this.getAllDeclaration();
    this.getAllDistributorType();
    this.getAllConsultantType();
    this.getAllAppeal();
     this.getAllAppealRevocation();
      this.getAllAppealSuspension();
     this.getAllReturn();
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
      visibleSessionTimeout: false,
      visibleBlockDuration11: false,
      perPage: 10,
     // perPageOptions: ["4", "6", "10", "20"],
      MarketingApproachList: [],
      TypeStructure: [],
      StatusList: [],
      cessationList: [],
      declarationList: [],
      distributorTypeList: [],
      ConsultantTypeList: [],
      appealList: [],
      returnList: [],


      StatusCount: null,
      MarketingApproachCount: null,
      TypeStructureCount: null,
      CessationCount: null,
      DeclarationCount: null,
      DistributorCount: null,
      appealListCount: null,
      returnListCount: null,

      loading: false,

      count: 1,

      VARIATION: [
        // { id: "1", name: "UTMC", selected: false },
        // { id: "2", name: "IUTA", selected: false },
        // { id: "3", name: "CUTA", selected: false },
        // { id: "4", name: "CPRA", selected: false },
        // { id: "5", name: "PRP", selected: false },
        // { id: "6", name: "IPRA", selected: false },
      ],
      model: {
        // TAB 1

        DIST_SET_TYPE: "",
        DIST_SET_PARAM: "",
        DIST_SET_CODE: "",
        DIST_SET_VALUE: "",
        DIST_SET_INDEX: "",
        DIST_SET_DESCRIPTION: "",
        TYPE_STRUCTURE_ID: "",
        DIST_MARKETING_ID: "",
        DIST_TYPE_VARIATION: "",
        MARKETING_APPROACH_ID: "",
        TYPE_STRUCTURE_ID: "",
        DIST_TYPE_NAME: "",
        DISTRIBUTOR_SETTING_ID: "",
        SCHEME: "",
        VARIATION: [
        { id: "1", name: "UTMC", selected: false },
        { id: "2", name: "IUTA", selected: false },
        { id: "3", name: "CUTA", selected: false },
        { id: "4", name: "CPRA", selected: false },
        { id: "5", name: "PRP", selected: false },
        { id: "6", name: "IPRA", selected: false },
        ],

        addStatus: {
          DIST_SET_PARAM: "",
        },
        addappealsus: {
        DIST_SET_PARAM: "",
         DIST_SET_VALUE: "",
          DIST_SET_TYPE: "",
       DISTRIBUTOR_SETTING_ID: "",
        },
          addreturn: {
        DIST_SET_PARAM: "",
         DIST_SET_VALUE: "",
          DIST_SET_TYPE: "",
       DISTRIBUTOR_SETTING_ID: "",
        },
      
        editMarketing: {
          DIST_SET_PARAM: "",
        },

        editStructure: {
          DIST_SET_PARAM: "",
        },
         addStructure: {
          DIST_SET_PARAM: "",
        },
        editStatus: {
          DIST_SET_PARAM: "",
        },
        editCessation: {
          DIST_SET_DESCRIPTION: "",
        },
        editDeclaration: {
          DIST_SET_VALUE: "",
          DIST_SET_DESCRIPTION: "",
        },
         editAppeal: {
          DIST_SET_VALUE: "",
          DIST_SET_DESCRIPTION: "",
        },
         editReturn: {
          DIST_SET_VALUE: "",
        },
         editDistType: {
        MARKETING_APPROACH_ID: "",
        TYPE_STRUCTURE_ID: "",
        DIST_TYPE_NAME: "",
        SCHEME: "",
        VARIATION: [
        { id: "1", name: "UTMC", selected: false },
        { id: "2", name: "IUTA", selected: false },
        { id: "3", name: "CUTA", selected: false },
        { id: "4", name: "CPRA", selected: false },
        { id: "5", name: "PRP", selected: false },
        { id: "6", name: "IPRA", selected: false },
        ],
        },
      },

      // form: {
      //   RENEWAL_MONTH: "",
      //   RENEWAL_CALC: "",
      //   RENEWAL_REQUIREMENT: "",
      // },

      formOptions: {
        validateAfterChanged: true,
      },
      //5 Module CPD Calculation
    addmarketingApproachSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "input",
                inputType: "Text",
                model: "DIST_SET_PARAM",
                label: "APPROACH NAME ",
                placeholder: "ENTER APPROACH NAME",
                styleClasses: "col-md-6",
                required: true,
                validator: "required",
              },
            ],
          },
        ],
      },
       addTypeStructureSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "input",
                inputType: "Text",
                model: "addStructure.DIST_SET_PARAM",
                label: "TYPE OF STRUCTURE",
                placeholder: "ENTER TYPE OF STRUCTURE",
                styleClasses: "col-md-6",
                required: true,
                validator: "required",
              },
            ],
          },
        ],
      },
      editmarketingApproachSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "input",
                inputType: "Text",
                model: "editMarketing.DIST_SET_PARAM",
                label: "APPROACH NAME ",
                placeholder: "ENTER APPROACH NAME",
                styleClasses: "col-md-12",
                required: true,
                validator: "required",
              },
            ],
          },
        ],
      },

      editTypeStructureSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "input",
                inputType: "Text",
                model: "editStructure.DIST_SET_PARAM",
                label: "TYPE OF STRUCTURE ",
                placeholder: "ENTER APPROACH NAME",
                styleClasses: "col-md-12",
              },
            ],
          },
        ],
      },
      editDistTypeSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "input",
                inputType: "Text",
                model: "editDistType.DIST_TYPE_NAME",
                label: "DISTRIBUTOR TYPE ",
                placeholder: "DISTRIBUTOR TYPE",
                styleClasses: "col-md-12",
              },
              {
                type: "vueMultiSelect",
                inputType: "Text",
                model: "editDistType.MARKETING_APPROACH_ID",
                label: "MARKETING APPROACH ",
                placeholder: "ENTER APPROACH NAME",
                styleClasses: "col-md-12",
                selectOptions: {
                  multiple: false,
                  key: "DISTRIBUTOR_SETTING_ID",
                  label: "MARKETING_APPROACH",
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.MarketingApproachList;
                },
              },
              {
                type: "vueMultiSelect",
                inputType: "Text",
                model: "editDistType.TYPE_STRUCTURE_ID",
                label: "TYPE OF STRUCTURE",
                placeholder: "ENTER TYPE OF STRUCTURE",
                styleClasses: "col-md-12",
                selectOptions: {
                  multiple: false,
                  key: "DISTRIBUTOR_SETTING_ID",
                  label: "TYPE_STRUCTURE",
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.TypeStructure;
                },
              },
              {
                type: "checkbox",
                inputType: "Text",
                model: "editDistType.VARIATION",
                label: "VARIATION",
                placeholder: "ENTER VARIATION",
                styleClasses: "col-md-12",
              },
              {
                type: "vueMultiSelect",
                inputType: "Text",
                model: "editDistType.SCHEME",
                label: "SCHEME",
                placeholder: "ENTER SCHEME",
                styleClasses: "col-md-12",
                selectOptions: {
                  multiple: false,
                  key: "CONSULTANT_TYPE_ID",
                  label: "CONS_NAME",
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.ConsultantTypeList;
                },
              },
            ],
          },
        ],
      },
      editStatusSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "input",
                inputType: "Text",
                model: "editStatus.DIST_SET_PARAM",
                label: "STATUS ",
                placeholder: "ENTER STATUS",
                styleClasses: "col-md-12",
              },
            ],
          },
        ],
      },
       addStatusSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "input",
                inputType: "Text",
                model: "addStatus.DIST_SET_PARAM",
                label: "STATUS ",
                placeholder: "ENTER STATUS",
                styleClasses: "col-md-6",
                required: true,
                validator: "required",
              },
            ],
          },
        ],
      },
       addCessationSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "input",
                inputType: "Text",
                model: "DIST_SET_DESCRIPTION",
                label: "CESSATION TYPE ",
                placeholder: "ENTER CESSATION YPE",
                styleClasses: "col-md-6",
                required: true,
                validator: "required",
              },
            ],
          },
        ],
      },
       addAppealSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "input",
                inputType: "number",
                model: "addappealsus.DIST_SET_VALUE",
                label: "APPEAL DAYS FOR SUSPENSION",
                placeholder: "Enter Suspension days",
                styleClasses: "col-md-6",
                required: true,
                validator: "number",
              },
              {
                type: "hidden",
                inputType: "number",
                model: "addappealsus.DISTRIBUTOR_SETTING_ID",
               // label: "APPEAL DAYS FOR SUSPENSION",
              //  placeholder: "Enter Suspension",
                styleClasses: "col-md-6",
               // required: true,
               // validator: "number",
              },
            ],
          },
        ],
      },
       addAppealRevocationSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "input",
                inputType: "number",
                model: "DIST_SET_VALUE",
                label: "APPEAL DAYS FOR REVOCATION",
                placeholder: "Enter Revocation",
                styleClasses: "col-md-10",
                required: true,
                validator: "number",
              },
              {
                type: "hidden",
                inputType: "number",
                model: "DISTRIBUTOR_SETTING_ID",
               // label: "APPEAL DAYS FOR SUSPENSION",
              //  placeholder: "Enter Suspension",
                styleClasses: "col-md-6",
               // required: true,
               // validator: "number",
              },
            ],
          },
        ],
      },
       addReturnSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "input",
                inputType: "number",
                model: "addreturn.DIST_SET_VALUE",
                label: "RETURN DURATION",
                placeholder: "Enter Duration",
                styleClasses: "col-md-6",
                required: true,
                validator: "number",
              }, 
               {
                type: "hidden",
                inputType: "number",
                model: "addreturn.DISTRIBUTOR_SETTING_ID",
               // label: "APPEAL DAYS FOR SUSPENSION",
              //  placeholder: "Enter Suspension",
                styleClasses: "col-md-6",
               // required: true,
               // validator: "number",
              },
            ],
          },
        ],
      },
       editReturnSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "input",
                inputType: "number",
                model: "editReturn.DIST_SET_VALUE",
                label: "RETURN DURATION",
                placeholder: "Enter Duration",
                styleClasses: "col-md-12",
                required: true,
                validator: "number",
              }, 
            ],
          },
        ],
      },
       editAppealSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "input",
                inputType: "number",
                model: "editAppeal.DIST_SET_VALUE",
                label: "APPEAL DAYS FOR REVOCATION",
                placeholder: "APPEAL DAYS FOR REVOCATION",
                styleClasses: "col-md-12",
                required: true,
                validator: "number",
              },
              {
                type: "input",
                inputType: "number",
                model: "editAppeal.DIST_SET_DESCRIPTION",
                label: "APPEAL DAYS FOR SUSPENSION",
                placeholder: "APPEAL DAYS FOR SUSPENSION",
                styleClasses: "col-md-12",
                required: true,
                validator: "number",
              },
            ],
          },
        ],
      },

      editCessationSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "input",
                inputType: "Text",
                model: "editCessation.DIST_SET_DESCRIPTION",
                label: "CESSATION TYPE ",
                placeholder: "ENTER CESSATION TYPE",
                styleClasses: "col-md-12",
              },
            ],
          },
        ],
      },
       addDeclarationSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "vueMultiSelect",
                inputType: "Text",
                model: "DIST_SET_VALUE",
                label: "STATUS",
                placeholder: "SELECT STATUS",
                selectOptions: {
                  multiple: false,
                  key: "DISTRIBUTOR_SETTING_ID",
                  label: "DIST_SET_PARAM",
                  searchable: true,
                },
                values: () => {
                  return this.StatusList;
                },
                styleClasses: "col-md-12",
                required: true,
                validator: "required",
              },
              {
                type: "input",
                inputType: "Text",
                model: "DIST_SET_DESCRIPTION",
                label: "DECLARATION",
                placeholder: "ENTER DECLARATION",
                styleClasses: "col-md-12",
                required: true,
                validator: "required",
              },
            ],
          },
        ],
      },
      editDeclarationSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "vueMultiSelect",
                inputType: "Text",
                model: "editDeclaration.DIST_SET_VALUE",
                label: "STATUS",
                placeholder: "SELECT STATUS",
                selectOptions: {
                  multiple: false,
                  key: "DISTRIBUTOR_SETTING_ID",
                  label: "DIST_SET_PARAM",
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.StatusList;
                },
                styleClasses: "col-md-12",
              },
              {
                type: "input",
                inputType: "Text",
                model: "editDeclaration.DIST_SET_DESCRIPTION",
                label: "DECLARATION",
                placeholder: "ENTER DECLARATION",
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
    DistType() {
      this.$router.push("/fimm/distributor-type");
    },
     distributor_declaration() {
      this.$router.push("/fimm/distributor_declaration");
    },


    getAllConsultantType: async function () {
      const response = await servicesModule0.getAllConsultantTypeList();
      this.ConsultantTypeList = response;
    },

    // ---------------------Marketing Approach-----------

    getAllmarketingApproach: async function () {
      const response = await servicesModule0.getAllDistributorSettingList(
        "MARKETING_APPROACH"
      );
      this.MarketingApproachList = response;
      this.MarketingApproachCount = this.MarketingApproachList.length;
    },

    async submitMarketingApproach() {
        if (this.$refs.addmarketingForm.validate()) {
          let app = this;
          var param = app.model;
          const data = new FormData();
          data.append("DIST_SET_PARAM", this.model.DIST_SET_PARAM);
          data.append("DIST_SET_TYPE", "MARKETING_APPROACH");
          try {
          // eslint-disable-next-line no-unused-vars
          const response = await servicesModule0.createDistributorSetting(data);
          this.getAllmarketingApproach();
          this.model.DIST_SET_PARAM='';
          // this.$modals.simpleModal.$hide()
          } catch (error) {
            console.log(error);
          }
        }
    },

    async editmarketingApproach(data) {
      const response = await servicesModule0.getDistributorSettingById(
        data.DISTRIBUTOR_SETTING_ID
      );
      this.$modals.simpleModalEditMarketingApproach.$show();
      this.DISTRIBUTOR_SETTING_ID = response.DISTRIBUTOR_SETTING_ID;
      this.model.editMarketing = response;
      console.log(response);
    },

    async updatemarketingApproachAPI() {
      try {
        const data = new FormData();
        data.append("DISTRIBUTOR_SETTING_ID", this.DISTRIBUTOR_SETTING_ID);
        data.append("DIST_SET_PARAM", this.model.editMarketing.DIST_SET_PARAM);
        const response = await servicesModule0.updateDistributorSetting(data);
        this.getAllmarketingApproach();
      } catch (error) {
        console.log(error);
      }
    },

    async deletemarketingApproach(data) {
      if (confirm("Are you sure you want to delete?")) {
      // eslint-disable-next-line no-unused-vars
      const response = await servicesModule0.deleteDistributorSetting(
        data.DISTRIBUTOR_SETTING_ID
      );
      this.getAllmarketingApproach();
      }
    },

    //-------------------------- Type Of structure -----------

    getAllTypeStructure: async function () {
      const response = await servicesModule0.getAllDistributorSettingList(
        "TYPE_STRUCTURE"
      );
      this.TypeStructure = response;
      this.TypeStructureCount = this.TypeStructure.length;
    },

    async submitStructure() {
      if (this.$refs.addStructureForm.validate()) {
        let app = this;
        var param = app.model;
        const data = new FormData();
        data.append("DIST_SET_PARAM", this.model.addStructure.DIST_SET_PARAM);
        data.append("DIST_SET_TYPE", "TYPE_STRUCTURE");
        try {
        // eslint-disable-next-line no-unused-vars
        const response = await servicesModule0.createDistributorSetting(data);
        this.getAllTypeStructure();
         this.model.addStructure.DIST_SET_PARAM='';
        // this.$modals.simpleModal.$hide()
        } catch (error) {
         console.log(error);
        }
      }
    },

    async editTypeStructure(data) {
      const response = await servicesModule0.getDistributorSettingById(
        data.DISTRIBUTOR_SETTING_ID
      );
      this.$modals.simpleModalEditTypeStructure.$show();
      this.DISTRIBUTOR_SETTING_ID = response.DISTRIBUTOR_SETTING_ID;
      this.model.editStructure = response;
      // this.model.CPD_PROGRAM_NAME = response;
      // this.model.CPD_MIN = response;
      // this.model.CPD_MAX = response;
      console.log(response);
    },

    async updateTypeStructureAPI() {
      try {
        const data = new FormData();
        data.append("DISTRIBUTOR_SETTING_ID", this.DISTRIBUTOR_SETTING_ID);
        data.append("DIST_SET_PARAM", this.model.editStructure.DIST_SET_PARAM);
        const response = await servicesModule0.updateDistributorSetting(data);
        this.getAllTypeStructure();
      } catch (error) {
        console.log(error);
      }
    },

    async deleteTypeStructure(data) {
      if (confirm("Are you sure you want to delete?")) {
      // eslint-disable-next-line no-unused-vars
      const response = await servicesModule0.deleteDistributorSetting(
        data.DISTRIBUTOR_SETTING_ID
      );
      this.getAllTypeStructure();
      }
    },

    //---------------------Distributor Type ------------

    async submitDistributorType(item) {
      // this.selectedType = [];
      this.model.VARIATION.forEach((element) => {
        if (element.selected == true) {
                this.VARIATION.push(element.name);
              }
      });
      const data = new FormData();
      data.append("VARIATION", JSON.stringify(this.selectedType));
      data.append("DIST_TYPE_NAME", this.model.DIST_TYPE_NAME);
      data.append("DIST_TYPE_VARIATION", JSON.stringify(this.VARIATION));
      data.append(
        "MARKETING_APPROACH_ID",
        this.model.MARKETING_APPROACH_ID.DISTRIBUTOR_SETTING_ID
      );
      data.append(
        "TYPE_STRUCTURE_ID",
        this.model.TYPE_STRUCTURE_ID.DISTRIBUTOR_SETTING_ID
      );
      data.append(
        "SCHEME",
        this.model.SCHEME.CONSULTANT_TYPE_ID
      );
      try {
        // eslint-disable-next-line no-unused-vars
        const response = await servicesModule0.createDistributorType(data);
        this.getAllDistributorType();
      } catch (error) {
        console.log(error);
      }
    },

    getAllDistributorType: async function () {
      const response = await servicesModule0.getAllDistributorTypeList();
      this.distributorTypeList = response;
      // this.TypeStructureCount = this.distributorType.length;
    },

      async editDistributorType(data) {
      const response = await servicesModule0.getDistributorTypeById(
        data.DISTRIBUTOR_TYPE_ID
      );
      this.$modals.simpleModalEditDistType.$show();
      this.DISTRIBUTOR_TYPE_ID = response.DISTRIBUTOR_TYPE_ID;
      this.model.editDistType = response;
      this.model.editDistType.MARKETING_APPROACH_ID = response.DIST_SET_PARAM;
      this.model.editDistType.TYPE_STRUCTURE_ID = response.DIST_SET_PARAM;
      console.log(response);
    },

    async updateDistTypeAPI() {
      try {
         this.model.VARIATION.forEach((element) => {
        if (element.selected == true) {
                this.VARIATION.push(element.name);
              }
      });
        const data = new FormData();
        data.append("DISTRIBUTOR_TYPE_ID", this.DISTRIBUTOR_TYPE_ID);
        data.append("VARIATION", JSON.stringify(this.selectedType));
        data.append("DIST_TYPE_NAME", this.model.editDistType.DIST_TYPE_NAME);
        data.append("DIST_TYPE_VARIATION", JSON.stringify(this.VARIATION));
        data.append(
          "MARKETING_APPROACH_ID",
          this.model.editDistType.MARKETING_APPROACH_ID.DISTRIBUTOR_SETTING_ID
        );
        data.append(
          "TYPE_STRUCTURE_ID",
          this.model.editDistType.TYPE_STRUCTURE_ID.DISTRIBUTOR_SETTING_ID
        );
        data.append(
          "SCHEME",
          this.model.editDistType.SCHEME.CONSULTANT_TYPE_ID
        );
      const response = await servicesModule0.updateDistributorType(data);
        this.getAllDistributorType();
      } catch (error) {
        console.log(error);
      }
    },

    async deleteDistType(data) {
      if (confirm("Are you sure you want to delete?")) {
      // eslint-disable-next-line no-unused-vars
      const response = await servicesModule0.deleteDistributorType(
        data.DISTRIBUTOR_TYPE_ID
      );
      this.getAllDistributorType();
      }
    },



    //----------------Status-----------------------
    getAllStatus: async function () {
      const response = await servicesModule0.getAllDistributorSettingList(
        "STATUS"
      );
      this.StatusList = response;
      this.StatusCount = this.StatusList.length;
    },

    async submitStatus() {
        if (this.$refs.addStatusForm.validate()) {
          let app = this;
          var param = app.model;
          const data = new FormData();
          data.append("DIST_SET_PARAM", this.model.addStatus.DIST_SET_PARAM);
          data.append("DIST_SET_TYPE", "STATUS");
          try {
          // eslint-disable-next-line no-unused-vars
          const response = await servicesModule0.createDistributorSetting(data);
          this.getAllStatus();
          this.model.addStatus.DIST_SET_PARAM="";
          // this.$modals.simpleModal.$hide()
          } catch (error) {
           console.log(error);
          }
        }
    },

    async editStatus(data) {
      const response = await servicesModule0.getDistributorSettingById(
        data.DISTRIBUTOR_SETTING_ID
      );
      this.$modals.simpleModalEditStatus.$show();
      this.DISTRIBUTOR_SETTING_ID = response.DISTRIBUTOR_SETTING_ID;
      this.model.editStatus = response;
      console.log(response);
    },

    async updateStatusAPI() {
      try {
        const data = new FormData();
        data.append("DISTRIBUTOR_SETTING_ID", this.DISTRIBUTOR_SETTING_ID);
        data.append("DIST_SET_PARAM", this.model.editStatus.DIST_SET_PARAM);
        const response = await servicesModule0.updateDistributorSetting(data);
        this.getAllStatus();
      } catch (error) {
        console.log(error);
      }
    },

    async deleteStatus(data) {
      if (confirm("Are you sure you want to delete?")) {
      // eslint-disable-next-line no-unused-vars
      const response = await servicesModule0.deleteDistributorSetting(
        data.DISTRIBUTOR_SETTING_ID
      );
      this.getAllStatus();
      }
    },

    // -------------------- Cessation Type ----------------------------
    getAllCessation: async function () {
      const response = await servicesModule0.getAllDistributorSettingList(
        "CESSATION"
      );
      this.cessationList = response;
      this.CessationCount = this.cessationList.length;
    },

    async submitCessation() {
        if (this.$refs.addCessationForm.validate()) {
          let app = this;
          var param = app.model;
          const data = new FormData();
          data.append("DIST_SET_DESCRIPTION", this.model.DIST_SET_DESCRIPTION);
          data.append("DIST_SET_TYPE", "CESSATION");
          try {
          // eslint-disable-next-line no-unused-vars
          const response = await servicesModule0.createDistributorSetting(data);
          this.getAllCessation();
          // this.$modals.simpleModal.$hide()
          this.model.DIST_SET_DESCRIPTION="";
          } catch (error) {
           console.log(error);
          }
        }
    },

    async editCessation(data) {
      const response = await servicesModule0.getDistributorSettingById(
        data.DISTRIBUTOR_SETTING_ID
      );
      this.$modals.simpleModalEditCessation.$show();
      this.DISTRIBUTOR_SETTING_ID = response.DISTRIBUTOR_SETTING_ID;
      this.model.editCessation = response;
      console.log(response);
    },

    async updateCessationAPI() {
      try {
        const data = new FormData();
        data.append("DISTRIBUTOR_SETTING_ID", this.DISTRIBUTOR_SETTING_ID);
        data.append("DIST_SET_DESRIPTION",this.model.editCessation.DIST_SET_DESCRIPTION);
        const response = await servicesModule0.updateDistributorSetting(data);
        this.getAllCessation();
      } catch (error) {
        console.log(error);
      }
    },

    async deleteCessation(data) {
      if (confirm("Are you sure you want to delete?")){
      // eslint-disable-next-line no-unused-vars
      const response = await servicesModule0.deleteDistributorSetting(
        data.DISTRIBUTOR_SETTING_ID
      );
      this.getAllCessation();
      }
    },

    // --------- DISTRIBUTOR DECLARATION ----------------

    getAllDeclaration: async function () {
      const response = await servicesModule0.getAllDistributorDeclareList(
        "DECLARATION"
      );
      this.declarationList = response;
      this.DeclarationCount = this.declarationList.length;
    },

    async submitDeclaration() {
        if (this.$refs.addDeclarationForm.validate()) {

          let app = this;
          var param = app.model;
          const data = new FormData();
          data.append("DIST_SET_DESCRIPTION", this.model.DIST_SET_DESCRIPTION);
          data.append(
            "DIST_SET_VALUE",
            this.model.DIST_SET_VALUE.DISTRIBUTOR_SETTING_ID
          );
          data.append("DIST_SET_TYPE", "DECLARATION");
          try {
          // eslint-disable-next-line no-unused-vars
            await servicesModule0.createDistributorSetting(data);
            this.getAllDeclaration();
            this.model.DIST_SET_DESCRIPTION="";
            this.model.DIST_SET_VALUE = [];

          } catch (error) {
          console.log(error);
          }
        }
    },

    async editDeclaration(data) {
      const response = await servicesModule0.getEditDistributorSettingById(
        data.DISTRIBUTOR_SETTING_ID
      );
      this.$modals.simpleModalEditDeclaration.$show();
     // console.log("response=",response);
      this.DISTRIBUTOR_SETTING_ID = response.DISTRIBUTOR_SETTING_ID;
      this.model.editDeclaration.DIST_SET_DESCRIPTION=response.DIST_SET_DESCRIPTION;
       this.model.editDeclaration.DIST_SET_VALUE = {
         DISTRIBUTOR_SETTING_ID: response.DIST_SET_VALUE,
         DIST_SET_PARAM: response.DIST_SET_PARAM,
      };
       //this.model.editDeclaration.DIST_SET_VALUE=response.DIST_SET_VALUE;
      //this.model.editDeclaration = response;
      //console.log(response);
    },

    async updateDeclarationAPI() {
      try {
        const data = new FormData();
        data.append("DISTRIBUTOR_SETTING_ID", this.DISTRIBUTOR_SETTING_ID);
        data.append(
          "DIST_SET_DESRIPTION",
          this.model.editDeclaration.DIST_SET_DESCRIPTION
        );
         data.append(
          "DIST_SET_VALUE",
          this.model.editDeclaration.DIST_SET_VALUE.DISTRIBUTOR_SETTING_ID
          );
        
        const response = await servicesModule0.updateDistributorSetting(data);
        this.getAllDeclaration();
      } catch (error) {
        console.log(error);
      }
    },

    async deleteDeclaration(data) {
      if (confirm("Are you sure you want to delete?")) {
      // eslint-disable-next-line no-unused-vars
      const response = await servicesModule0.deleteDistributorSetting(
        data.DISTRIBUTOR_SETTING_ID
      );
      this.getAllDeclaration();
      }
    },
  // --------- APPEAL DURATION ----------------
   getAllAppeal: async function () {
      const response = await servicesModule0.getAllDistributorAppealList(
        "APPEAL_DURATION"
      );
     // console.log("APPEAL",response);
      this.appealList = response;
      this.appealListCount = this.appealList.length;
    },
     getAllAppealRevocation: async function () {
      const response = await servicesModule0.getAllDistributorAppealListRevovation(
        "APPEAL_DURATION_REVOCATION"
      );
      console.log("APPEAL",response);
     // this.appealList = response;
     // this.appealListCount = this.appealList.length;
     this.model.DIST_SET_VALUE = response.DIST_SET_VALUE;
      this.model.DISTRIBUTOR_SETTING_ID = response.DISTRIBUTOR_SETTING_ID;
    },
     getAllAppealSuspension: async function () {
      const response = await servicesModule0.getAllDistributorAppealListRevovation(
        "APPEAL_DURATION_SUSPENSION"
      );
      console.log("APPEAL",response);
     // this.appealList = response;
     // this.appealListCount = this.appealList.length;
     this.model.addappealsus.DIST_SET_VALUE = response.DIST_SET_VALUE;
      this.model.addappealsus.DISTRIBUTOR_SETTING_ID = response.DISTRIBUTOR_SETTING_ID;
    },
    async submitAppeal() {
        if (this.$refs.addAppealForm.validate()) {
          let app = this;
          var param = app.model;
          const data = new FormData();
          data.append("DIST_SET_DESCRIPTION", this.model.DIST_SET_DESCRIPTION);
           data.append("DIST_SET_VALUE", this.model.DIST_SET_VALUE);
          data.append("DIST_SET_TYPE", "APPEAL_DURATION");
          try {
          // eslint-disable-next-line no-unused-vars
          const response = await servicesModule0.createDistributorSetting(data);
          this.getAllAppeal();
          // this.$modals.simpleModal.$hide()
          this.model.DIST_SET_DESCRIPTION="";
          this.model.DIST_SET_VALUE="";
          } catch (error) {
           console.log(error);
          }
        }
    },
    async editAppealData(data) {
      const response = await servicesModule0.getDistributorSettingById(
      data.DISTRIBUTOR_SETTING_ID
      );
      this.$modals.simpleModalEditAppeal.$show();
      this.DISTRIBUTOR_SETTING_ID = response.DISTRIBUTOR_SETTING_ID;
      this.model.editAppeal = response;
    },
    async updateAppealAPI() {
      try {
        const data = new FormData();
        data.append("DISTRIBUTOR_SETTING_ID", this.model.DISTRIBUTOR_SETTING_ID);
         data.append(
          "DIST_SET_VALUE",
          this.model.editAppeal.DIST_SET_VALUE
          );
        const response = await servicesModule0.updateDistributorSetting(data);
        this.getAllAppeal();
      } catch (error) {
        console.log(error);
      }
    },
    async updateAppealRevokeAPI() {
      try {
        const data = new FormData();
        data.append("DISTRIBUTOR_SETTING_ID", this.model.DISTRIBUTOR_SETTING_ID);
         data.append(
          "DIST_SET_VALUE",
          this.model.DIST_SET_VALUE
          );
           data.append(
          "DIST_SET_TYPE",
          'APPEAL_DURATION_REVOCATION'
          );
          if(this.model.DISTRIBUTOR_SETTING_ID != '')
          {
        const response = await servicesModule0.updateDistributorSetting(data);
          }
          else
          {
             const response = await servicesModule0.createDistributorSetting(data);
          }
        this.getAllAppealRevocation();
      } catch (error) {
        console.log(error);
      }
    },
     async updateAppealSuspensionAPI() {
      try {
        const data = new FormData();
        data.append("DISTRIBUTOR_SETTING_ID", this.model.addappealsus.DISTRIBUTOR_SETTING_ID);
         data.append(
          "DIST_SET_VALUE",
          this.model.addappealsus.DIST_SET_VALUE
          );
           data.append(
          "DIST_SET_TYPE",
          'APPEAL_DURATION_SUSPENSION'
          );
          if(this.model.addappealsus.DISTRIBUTOR_SETTING_ID != '')
          {
        const response = await servicesModule0.updateDistributorSetting(data);
          }
          else
          {
             const response = await servicesModule0.createDistributorSetting(data);
          }
        this.getAllAppealRevocation();
      } catch (error) {
        console.log(error);
      }
    },
    async deleteAppeal(data) {
      if (confirm("Are you sure you want to delete?")) {
      // eslint-disable-next-line no-unused-vars
      const response = await servicesModule0.deleteDistributorSetting(
        data.DISTRIBUTOR_SETTING_ID
      );
      this.getAllAppeal();
      }
    },
    // --------- Return DURATION ----------------
   getAllReturn: async function () {
      const response = await servicesModule0.getAllDistributorReturnList(
        "RETURN_DURATION"
      );
      console.log("Return",response);
      //this.returnList = response;
      //this.returnListCount = this.returnList.length;
      this.model.addreturn.DIST_SET_VALUE = response.DIST_SET_VALUE;
      this.model.addreturn.DISTRIBUTOR_SETTING_ID = response.DISTRIBUTOR_SETTING_ID;
    },
    async submitReturn() {
        if (this.$refs.addReturnForm.validate()) {
          let app = this;
          var param = app.model;
          const data = new FormData();
           data.append("DIST_SET_VALUE", this.model.DIST_SET_VALUE);
          data.append("DIST_SET_TYPE", "RETURN_DURATION");
          try {
          // eslint-disable-next-line no-unused-vars
          const response = await servicesModule0.createDistributorSetting(data);
          this.getAllReturn();
           this.model.DIST_SET_VALUE="";
          // this.$modals.simpleModal.$hide()
          } catch (error) {
           console.log(error);
          }
        }
    },
    async editReturnData(data) {
      const response = await servicesModule0.getDistributorSettingById(
      data.DISTRIBUTOR_SETTING_ID
      );
      this.$modals.simpleModalEditReturn.$show();
      this.DISTRIBUTOR_SETTING_ID = response.DISTRIBUTOR_SETTING_ID;
      this.model.editReturn = response;
    },
    async updateReturnAPI() {
      try {
        const data = new FormData();
        data.append("DISTRIBUTOR_SETTING_ID", this.model.addreturn.DISTRIBUTOR_SETTING_ID);
         data.append(
          "DIST_SET_VALUE",
          this.model.addreturn.DIST_SET_VALUE
          );
           data.append("DIST_SET_TYPE", "RETURN_DURATION");
           if(this.model.addreturn.DISTRIBUTOR_SETTING_ID != '')
          {
        const response = await servicesModule0.updateDistributorSetting(data);
          }
          else
          {
          const response = await servicesModule0.createDistributorSetting(data);
          }
        this.getAllReturn();
      } catch (error) {
        console.log(error);
      }
    },
    async deleteReturn(data) {
      if (confirm("Are you sure you want to delete?")) {
      // eslint-disable-next-line no-unused-vars
      const response = await servicesModule0.deleteDistributorSetting(
        data.DISTRIBUTOR_SETTING_ID
      );
      this.getAllReturn();
      }
    },

  },

  computed: {
    marketingApproach() {
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
          name: "DIST_SET_PARAM",
          title: "LIST ",
          sortField: "DIST_SET_PARAM",
        },

        {
          name: "__slot:actions",
          title: "Action",
          dataClass: "justify-content-center",
          width: "15%",
        },
      ];
    },
    filteredmarketingApproach() {
      if (!this.term || this.term.length < 1) {
        return this.MarketingApproachList;
      }
    },
    typeStructure() {
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
          name: "DIST_SET_PARAM",
          title: "LIST ",
          sortField: "DIST_SET_PARAM",
        },

        {
          name: "__slot:actions",
          title: "Action",
          dataClass: "justify-content-center",
          width: "15%",
        },
      ];
    },
    filteredtypeStructure() {
      if (!this.term || this.term.length < 1) {
        return this.TypeStructure;
      }
    },

    distributorType() {
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
          title: "DISTRIBUTOR TYPE ",
          sortField: "TYPE_NAME",
        },
        {
          name: "VARIATION",
          title: "VARIATION TYPE ",
          sortField: "VARIATION",
        },
        {
          name: "SCHEME",
          title: "SCHEME",
          sortField: "SCHEME",
        },
        {
          name: "MARKETING_APPROACH",
          title: "MARKETING APPROACH",
          sortField: "MARKETING_APPROACH",
        },
        {
          name: "TYPE_STRUCTURE",
          title: "TYPE OF STRUCTURE",
          sortField: "TYPE_STRUCTURE",
        },

        {
          name: "__slot:actions",
          title: "Action",
          dataClass: "justify-content-center",
          width: "15%",
        },
      ];
    },
    filteredDistributorType() {
      if (!this.term || this.term.length < 1) {
        return this.distributorTypeList;
      }
    },
    Status() {
      return [
        {
          name: "__slot:marker",
          width: "30px",
          dataClass: "text-center",
        },
        {
          name: "__slot:no",
          title: "No",
         width: "10%",
        },
        {
          name: "DIST_SET_PARAM",
          title: "LIST ",
          sortField: "DIST_SET_PARAM",
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
    filteredStatus() {
      if (!this.term || this.term.length < 1) {
        return this.StatusList;
      }
    },

    CessationList() {
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
          name: "DIST_SET_DESCRIPTION",
          title: "LIST ",
          sortField: "DIST_SET_DESCRIPTION",
        },

        {
          name: "__slot:actions",
          title: "Action",
          dataClass: "justify-content-center",
          width: "15%",
        },
      ];
    },
    filteredCessationList() {
      if (!this.term || this.term.length < 1) {
        return this.cessationList;
      }
    },
    

    DeclarationList() {
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
          name: "STATUS",
          title: "STATUS ",
          sortField: "STATUS",
        },
        {
          name: "DIST_SET_DESCRIPTION",
          title: "DESCRIPTION",
          sortField: "DIST_SET_DESCRIPTION",
        },

        {
          name: "__slot:actions",
          title: "Action",
          dataClass: "justify-content-center",
          width: "15%",
        },
      ];
    },
    filteredDeclarationList() {
      if (!this.term || this.term.length < 1) {
        return this.declarationList;
      }
    },
    filteredAppealList() {
      if (!this.term || this.term.length < 1) {
      return this.appealList;
      }
    },
    filteredReturnList() {
    if (!this.term || this.term.length < 1) {
    return this.returnList;
    }
    },
    AppealList() {
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
          name: "DIST_SET_VALUE",
          title: "REVOCATION ",
          sortField: "DIST_SET_VALUE",
        },
        {
          name: "DIST_SET_DESCRIPTION",
          title: "SUSPENTION",
          sortField: "DIST_SET_DESCRIPTION",
        },

        {
          name: "__slot:actions",
          title: "Action",
          dataClass: "justify-content-center",
          width: "15%",
        },
      ];
    },
     ReturnDurationlList() {
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
          name: "DIST_SET_VALUE",
          title: "RETURN DURATION ",
          sortField: "DIST_SET_VALUE",
        },

        {
          name: "__slot:actions",
          title: "Action",
          dataClass: "justify-content-center",
          width: "15%",
        },
      ];
    },
  },
};
</script>
<style>
.star{
  color: red;
}
</style>
<template>
  <div class="content">
    <div class="container-fluid">
      <div class="card-body">
        <div class="row justify-content-center">
          <div class="col-lg-10">
            <h4 slot="header">Settings by Module</h4>
          </div>

          <!-- 1 -->
          <va-card class=" ml-4 col-lg-10">

            <h5 class="fa fa-bank">&nbsp;&nbsp; <b>Finance</b></h5>
            <hr>

            <div class="ml-5">
              <div>
                <span>Account Code and Cost Center</span>
                <button v-if="visibleCodeTable == false" v-b-toggle.collapse-1 type="button" class="float-right  btn-fill btn-md"><i class="fa fa-edit"></i></button>
                <button v-if="visibleCodeTable == true" v-b-toggle.collapse-1 type="button" class="float-right  btn-fill btn-md"><i class="fa fa-times"></i></button>
                <b-collapse v-model="visibleCodeTable" class="mt-4" id="collapse-1">
                  <va-card style="background-color: #eeeeee;">

                  </va-card>
                </b-collapse>
                <hr>
              </div>
              <div>
                <span>New Distributor Fee Management</span>
                <button v-if="visibleDistributorFee == false" v-b-toggle.collapse-2 type="button" class="float-right  btn-fill btn-md"><i class="fa fa-edit"></i></button>
                <button v-if="visibleDistributorFee == true" v-b-toggle.collapse-2 type="button" class="float-right  btn-fill btn-md"><i class="fa fa-times"></i></button>
                <b-collapse id="collapse-2" style="background-color: #eeeeee;" class="mt-4" v-model="visibleDistributorFee">
                  <va-card style="background-color: #eeeeee;">

                    <div class="row">
                      <div class="ml-1 col-md-10">
                        <span class="col mt-2 description">Distributor Type</span>
                        <input type="text" placeholder="Enter Type" id="" class=" float-right col-8 form-control form-control-md"/>
                      </div>
                    </div>
                    <br>
                    <div class="row">
                      <div class="ml-1 col-md-10">
                        <span class="col mt-2 description">Type of Variation</span>
                        <div class=" ml-4 col-md-9">
                          <div class="row">
                            <div class="col-4" v-for="(item, index) in compType" :key="index">
                              <div class="row mb-2">
                                <base-checkbox
                                  class="col-2"
                                  v-model="item.selected"
                                  disabled="true"
                                ></base-checkbox>
                                <span class="col mt-2 description">
                                  {{item.name}}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <br>
                    <div class="row">
                      <div class="ml-1 col-md-10">
                        <span class="col mt-2 description">Marketing Approach</span>
                        <div class=" ml-4 col-md-5">
                          <div class="row">
                            <div class="col-4" v-for="(item, index) in approachType" :key="index">
                              <div class="row mb-2">
                                <base-checkbox
                                  class="col-2"
                                  v-model="item.selected"
                                  disabled="true"
                                ></base-checkbox>
                                <span class="col mt-2 description">
                                  {{item.name}}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <br>
                    <div class="row">
                      <div class="ml-1 col-md-10">
                        <span class="col mt-2 description">Type of Structure</span>
                        <div class=" ml-4 col-md-5">
                          <div class="row">
                            <div class="col-4" v-for="(item, index) in structureType" :key="index">
                              <div class="row mb-2">
                                <base-checkbox
                                  class="col-2"
                                  v-model="item.selected"
                                  disabled="true"
                                ></base-checkbox>
                                <span class="col mt-2 description">
                                  {{item.name}}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                    <br><br>
                    <div class="row">
                      <div class="ml-3 col-md-2">
                        <button @click="submit1" type="button" class="ml-2 btn btn-primary btn-fill btn-md">
                          <i class="fa fa-save" /> &nbsp; Save
                        </button>x
                      </div>
                    </div>
                    <br><br>
                    <va-card>
                      <div class="row">
                        <div class="ml-5 col-md-11">
                          <b-table
                            hover
                            :items="items3"
                            :fields="fields3"
                            :current-page="currentPage"
                            :per-page="perPage"
                            :filter="filter"
                            responsive="md">
                            <!-- A virtual column -->
                            <template #cell(index)="data">
                              {{ data.index + 1 }}
                            </template>
                            <template #cell()="data">
                              <span class="description">{{ data.value }}</span>
                            </template>
                            <template #cell(actions)="">
                              <h4 class="mt-2">
                                <span class="badge badge-primary mr-1"><i class="fa fa-edit"></i></span>
                              </h4>
                              <h4 class="mt-2">
                                <span class="badge badge-danger mr-1"><i class="fa fa-trash"></i ></span>
                              </h4>
                            </template>

                          </b-table>
                        </div>
                        <div class="row col ml-2 mt-2">
                          <b-pagination
                            size="md"
                            :total-rows="this.items.length"
                            :per-page="perPage"
                            v-model="currentPage"/>
                          <b-form-fieldset horizontal class="col-1">
                            <b-form-select
                              :options="[
                                { text: 5, value: 5 },
                                { text: 10, value: 10 },
                                { text: 15, value: 15 }
                              ]"
                              v-model="perPage"
                            >
                            </b-form-select>
                          </b-form-fieldset>
                        </div>
                      </div>
                    </va-card>
                    <br><br>

                  </va-card>
                </b-collapse>
                <hr>
              </div>
              <div>
                <span>New Consultant Fee Management</span>
                <button v-if="visibleConsultantFee == false" v-b-toggle.collapse-3 type="button" class="float-right  btn-fill btn-md"><i class="fa fa-edit"></i></button>
                <button v-if="visibleConsultantFee == true" v-b-toggle.collapse-3 type="button" class="float-right  btn-fill btn-md"><i class="fa fa-times"></i></button>
                <b-collapse id="collapse-3" style="background-color: #eeeeee;" class="mt-4" v-model="visibleConsultantFee">
                  <va-card style="background-color: #eeeeee;">

                    <div class="row">
                      <div class="ml-1 col-md-10">
                        <span class="col mt-2 description">Distributor Type</span>
                        <input type="text" placeholder="Enter Type" class=" float-right col-8 form-control form-control-md"/>
                      </div>
                    </div>
                    <br>
                    <div class="row">
                      <div class="ml-1 col-md-10">
                        <span class="col mt-2 description">Type of Variation</span>
                        <div class=" ml-4 col-md-9">
                          <div class="row">
                            <div class="col-4" v-for="(item, index) in compType" :key="index">
                              <div class="row mb-2">
                                <base-checkbox
                                  class="col-2"
                                  v-model="item.selected"
                                  disabled="true"
                                ></base-checkbox>
                                <span class="col mt-2 description">
                                  {{item.name}}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <br>
                    <div class="row">
                      <div class="ml-1 col-md-10">
                        <span class="col mt-2 description">Marketing Approach</span>
                        <div class=" ml-4 col-md-5">
                          <div class="row">
                            <div class="col-4" v-for="(item, index) in approachType" :key="index">
                              <div class="row mb-2">
                                <base-checkbox
                                  class="col-2"
                                  v-model="item.selected"
                                  disabled="true"
                                ></base-checkbox>
                                <span class="col mt-2 description">
                                  {{item.name}}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <br>
                    <div class="row">
                      <div class="ml-1 col-md-10">
                        <span class="col mt-2 description">Type of Structure</span>
                        <div class=" ml-4 col-md-5">
                          <div class="row">
                            <div class="col-4" v-for="(item, index) in structureType" :key="index">
                              <div class="row mb-2">
                                <base-checkbox
                                  class="col-2"
                                  v-model="item.selected"
                                  disabled="true"
                                ></base-checkbox>
                                <span class="col mt-2 description">
                                  {{item.name}}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                    <br><br>
                    <div class="row">
                      <div class="ml-3 col-md-2">
                        <button type="submit" class="float-left btn btn-primary btn-fill btn-md"><i class="fa fa-save" />&nbsp; save</button>
                      </div>
                    </div>
                    <br><br>
                    <va-card>
                      <div class="row">
                        <div class="ml-5 col-md-11">
                          <b-table
                            hover
                            :items="items3"
                            :fields="fields3"
                            :current-page="currentPage"
                            :per-page="perPage"
                            :filter="filter"
                            responsive="md">
                            <!-- A virtual column -->
                            <template #cell(index)="data">
                              {{ data.index + 1 }}
                            </template>
                            <template #cell()="data">
                              <span class="description">{{ data.value }}</span>
                            </template>
                            <template #cell(actions)="">
                              <h4 class="mt-2">
                                <span class="badge badge-primary mr-1"><i class="fa fa-edit"></i></span>
                              </h4>
                              <h4 class="mt-2">
                                <span class="badge badge-danger mr-1"><i class="fa fa-trash"></i ></span>
                              </h4>
                            </template>

                          </b-table>
                        </div>
                        <div class="row col ml-2 mt-2">
                          <b-pagination
                            size="md"
                            :total-rows="this.items.length"
                            :per-page="perPage"
                            v-model="currentPage"/>
                          <b-form-fieldset horizontal class="col-1">
                            <b-form-select
                              :options="[
                                { text: 5, value: 5 },
                                { text: 10, value: 10 },
                                { text: 15, value: 15 }
                              ]"
                              v-model="perPage"
                            >
                            </b-form-select>
                          </b-form-fieldset>
                        </div>
                      </div>
                    </va-card>
                    <br><br>

                  </va-card>
                </b-collapse>
                <hr>
              </div>
              <div>
                <span>Consultant Appeal Fee Management</span>
                <button v-if="visibleFeeManagement == false" v-b-toggle.collapse-3 type="button" class="float-right  btn-fill btn-md"><i class="fa fa-edit"></i></button>
                <button v-if="visibleFeeManagement == true" v-b-toggle.collapse-3 type="button" class="float-right  btn-fill btn-md"><i class="fa fa-times"></i></button>
                <b-collapse id="collapse-3" style="background-color: #eeeeee;" class="mt-4" v-model="visibleFeeManagement">
                  <va-card style="background-color: #eeeeee;">

                    <div class="row">
                      <div class="ml-1 col-md-10">
                        <span class="col mt-2 description">Distributor Type</span>
                        <input type="text" placeholder="Enter Type" class=" float-right col-8 form-control form-control-md"/>
                      </div>
                    </div>
                    <br>
                    <div class="row">
                      <div class="ml-1 col-md-10">
                        <span class="col mt-2 description">Type of Variation</span>
                        <div class=" ml-4 col-md-9">
                          <div class="row">
                            <div class="col-4" v-for="(item, index) in compType" :key="index">
                              <div class="row mb-2">
                                <base-checkbox
                                  class="col-2"
                                  v-model="item.selected"
                                  disabled="true"
                                ></base-checkbox>
                                <span class="col mt-2 description">
                                  {{item.name}}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <br>
                    <div class="row">
                      <div class="ml-1 col-md-10">
                        <span class="col mt-2 description">Marketing Approach</span>
                        <div class=" ml-4 col-md-5">
                          <div class="row">
                            <div class="col-4" v-for="(item, index) in approachType" :key="index">
                              <div class="row mb-2">
                                <base-checkbox
                                  class="col-2"
                                  v-model="item.selected"
                                  disabled="true"
                                ></base-checkbox>
                                <span class="col mt-2 description">
                                  {{item.name}}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <br>
                    <div class="row">
                      <div class="ml-1 col-md-10">
                        <span class="col mt-2 description">Type of Structure</span>
                        <div class=" ml-4 col-md-5">
                          <div class="row">
                            <div class="col-4" v-for="(item, index) in structureType" :key="index">
                              <div class="row mb-2">
                                <base-checkbox
                                  class="col-2"
                                  v-model="item.selected"
                                  disabled="true"
                                ></base-checkbox>
                                <span class="col mt-2 description">
                                  {{item.name}}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                    <br><br>
                    <div class="row">
                      <div class="ml-3 col-md-2">
                        <button type="submit" class="float-left btn btn-primary btn-fill btn-md"><i class="fa fa-save" />&nbsp; save</button>
                      </div>
                    </div>
                    <br><br>
                    <va-card>
                      <div class="row">
                        <div class="ml-5 col-md-11">
                          <b-table
                            hover
                            :items="items3"
                            :fields="fields3"
                            :current-page="currentPage"
                            :per-page="perPage"
                            :filter="filter"
                            responsive="md">
                            <!-- A virtual column -->
                            <template #cell(index)="data">
                              {{ data.index + 1 }}
                            </template>
                            <template #cell()="data">
                              <span class="description">{{ data.value }}</span>
                            </template>
                            <template #cell(actions)="">
                              <h4 class="mt-2">
                                <span class="badge badge-primary mr-1"><i class="fa fa-edit"></i></span>
                              </h4>
                              <h4 class="mt-2">
                                <span class="badge badge-danger mr-1"><i class="fa fa-trash"></i ></span>
                              </h4>
                            </template>

                          </b-table>
                        </div>
                        <div class="row col ml-2 mt-2">
                          <b-pagination
                            size="md"
                            :total-rows="this.items.length"
                            :per-page="perPage"
                            v-model="currentPage"/>
                          <b-form-fieldset horizontal class="col-1">
                            <b-form-select
                              :options="[
                                { text: 5, value: 5 },
                                { text: 10, value: 10 },
                                { text: 15, value: 15 }
                              ]"
                              v-model="perPage"
                            >
                            </b-form-select>
                          </b-form-fieldset>
                        </div>
                      </div>
                    </va-card>
                    <br><br>

                  </va-card>
                </b-collapse>
                <hr>
              </div>
              <div>
                <span>Consultant Renewal Fee Management</span>
                <button v-if="visibleFeeManagement == false" v-b-toggle.collapse-3 type="button" class="float-right  btn-fill btn-md"><i class="fa fa-edit"></i></button>
                <button v-if="visibleFeeManagement == true" v-b-toggle.collapse-3 type="button" class="float-right  btn-fill btn-md"><i class="fa fa-times"></i></button>
                <b-collapse id="collapse-3" style="background-color: #eeeeee;" class="mt-4" v-model="visibleFeeManagement">
                  <va-card style="background-color: #eeeeee;">

                    <div class="row">
                      <div class="ml-1 col-md-10">
                        <span class="col mt-2 description">Distributor Type</span>
                        <input type="text" placeholder="Enter Type" class=" float-right col-8 form-control form-control-md"/>
                      </div>
                    </div>
                    <br>
                    <div class="row">
                      <div class="ml-1 col-md-10">
                        <span class="col mt-2 description">Type of Variation</span>
                        <div class=" ml-4 col-md-9">
                          <div class="row">
                            <div class="col-4" v-for="(item, index) in compType" :key="index">
                              <div class="row mb-2">
                                <base-checkbox
                                  class="col-2"
                                  v-model="item.selected"
                                  disabled="true"
                                ></base-checkbox>
                                <span class="col mt-2 description">
                                  {{item.name}}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <br>
                    <div class="row">
                      <div class="ml-1 col-md-10">
                        <span class="col mt-2 description">Marketing Approach</span>
                        <div class=" ml-4 col-md-5">
                          <div class="row">
                            <div class="col-4" v-for="(item, index) in approachType" :key="index">
                              <div class="row mb-2">
                                <base-checkbox
                                  class="col-2"
                                  v-model="item.selected"
                                  disabled="true"
                                ></base-checkbox>
                                <span class="col mt-2 description">
                                  {{item.name}}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <br>
                    <div class="row">
                      <div class="ml-1 col-md-10">
                        <span class="col mt-2 description">Type of Structure</span>
                        <div class=" ml-4 col-md-5">
                          <div class="row">
                            <div class="col-4" v-for="(item, index) in structureType" :key="index">
                              <div class="row mb-2">
                                <base-checkbox
                                  class="col-2"
                                  v-model="item.selected"
                                  disabled="true"
                                ></base-checkbox>
                                <span class="col mt-2 description">
                                  {{item.name}}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                    <br><br>
                    <div class="row">
                      <div class="ml-3 col-md-2">
                        <button type="submit" class="float-left btn btn-primary btn-fill btn-md"><i class="fa fa-save" />&nbsp; save</button>
                      </div>
                    </div>
                    <br><br>
                    <va-card>
                      <div class="row">
                        <div class="ml-5 col-md-11">
                          <b-table
                            hover
                            :items="items3"
                            :fields="fields3"
                            :current-page="currentPage"
                            :per-page="perPage"
                            :filter="filter"
                            responsive="md">
                            <!-- A virtual column -->
                            <template #cell(index)="data">
                              {{ data.index + 1 }}
                            </template>
                            <template #cell()="data">
                              <span class="description">{{ data.value }}</span>
                            </template>
                            <template #cell(actions)="">
                              <h4 class="mt-2">
                                <span class="badge badge-primary mr-1"><i class="fa fa-edit"></i></span>
                              </h4>
                              <h4 class="mt-2">
                                <span class="badge badge-danger mr-1"><i class="fa fa-trash"></i ></span>
                              </h4>
                            </template>

                          </b-table>
                        </div>
                        <div class="row col ml-2 mt-2">
                          <b-pagination
                            size="md"
                            :total-rows="this.items.length"
                            :per-page="perPage"
                            v-model="currentPage"/>
                          <b-form-fieldset horizontal class="col-1">
                            <b-form-select
                              :options="[
                                { text: 5, value: 5 },
                                { text: 10, value: 10 },
                                { text: 15, value: 15 }
                              ]"
                              v-model="perPage"
                            >
                            </b-form-select>
                          </b-form-fieldset>
                        </div>
                      </div>
                    </va-card>
                    <br><br>

                  </va-card>
                </b-collapse>
                <hr>
              </div>

            </div>
          </va-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'vue-form-generator/dist/vfg.css'

export default {
  // DATA SCHEMA
  data () {
    return {
      visibleCodeTable: false,
      visibleDistributorFee: false,
      visibleConsultantFee: false,
      // visibleDistributorFeeManagement: false,
      // visibleDistributorFeeManagement: false,

      fields: [
        // A virtual column that doesn't exist in items
        { key: 'index', label: 'No' },
        { key: 'list', label: 'List', sortable: false },
        { key: 'actions', label: 'Actions', sortable: false },

      ],

      items: [
        { no: '1', list: '3001:Finance Company Code' },

      ],
      fields2: [
        // A virtual column that doesn't exist in items
        { key: 'index', label: 'No' },
        { key: 'list', label: 'List', sortable: false },
        { key: 'actions', label: 'Actions', sortable: false },

      ],

      items2: [
        { no: '1', list: 'Single-Tier' },
        { no: '2', list: 'Multi-Tier' },

      ],
      fields3: [
        // A virtual column that doesn't exist in items
        { key: 'index', label: 'No' },
        { key: 'type', label: 'Distributor Type', sortable: false },
        { key: 'variation', label: 'Variation Type', sortable: false },
        { key: 'approach', label: 'Marketing Approach', sortable: false },
        { key: 'structure', label: 'Structure Type', sortable: false },
        { key: 'actions', label: 'Actions', sortable: false },

      ],

      items3: [
        { no: '1', type: 'UTMC', variation: 'PRP | IUTA | IPRA', approach: 'Direct', structure: 'Single-Tier' },
        { no: '2', type: 'PRP', variation: 'UTMC | IUTA | IPRA', approach: 'Direct', structure: 'Single-Tier' },
        { no: '3', type: 'IUTA', variation: 'UTMC | PRP | IPRA', approach: 'Direct', structure: 'Single-Tier' },
        { no: '4', type: 'CUTA', variation: 'CPRA', approach: 'Dominee', structure: 'Multi-Tier' },
        { no: '5', type: 'PRP', variation: 'CUTA', approach: 'Dominee', structure: 'Multi-Tier' },

      ],

      currentPage: 1,
      perPage: 5,
      filter: null,

      compType: [
        { id: '1', name: 'UTMC' },
        { id: '2', name: 'IUTA' },
        { id: '3', name: 'CUTA' },
        { id: '4', name: 'IUTA' },
        { id: '5', name: 'CPRA' },
        { id: '6', name: 'PRP' },
      ],
      approachType: [
        { id: '1', name: 'Direct' },
        { id: '2', name: 'Dominee' },
      ],
      structureType: [
        { id: '1', name: 'Single-Tier' },
        { id: '2', name: 'Multi-Tier' },
      ],

    }
  },
  methods: {

    async submit1 () {
      if (this.$refs.RegForm.validate()) {
        const data = new FormData()
        data.append('EMAIL_SMTP_PORT', this.model.EMAIL_SMTP_PORT)
        data.append('EMAIL_LOGIN_ID', this.model.EMAIL_LOGIN_ID)
        data.append('EMAIL_SMTP_SERVER', this.model.EMAIL_SMTP_SERVER)
        data.append('EMAIL_FROM', this.model.EMAIL_FROM)
        try {
          this.getEmailSetting()
          this.$modals.simpleModal.$hide()
        } catch (error) {
          console.log(error)
        }
      }
    },
  },
}
</script>

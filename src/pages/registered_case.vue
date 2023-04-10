<template>
  <div class="content">
    <div class="container-fluid">
      <div class="card-body">
        <div class="row justify-content-center">
          <div class="col-lg-12">
            <va-card class="strpied-tabled-with-hover" body-classes="table-full-width table-responsive">
              <h4 slot="header" class="card-title">Consultant Profile</h4>
              <div class="ml-5">
                <br />
                <table class="table table-striped">
                  <tbody>
                    <tr>
                      <td style="width: 20%;">Name</td>
                      <td style="width: 1%;">:</td>
                      <td>NoorHiyadah Binti Mohd Faizal</td>
                    </tr>
                    <tr>
                      <td>Citizenship</td>
                      <td>:</td>
                      <td>Malaysian</td>
                    </tr>
                    <tr>
                      <td>NRIC No</td>
                      <td>:</td>
                      <td>890408-03-5556</td>
                    </tr>
                    <tr>
                      <td>FIMM No</td>
                      <td>:</td>
                      <td>034-S-00123</td>
                    </tr>
                    <tr>
                      <td>Phone Number</td>
                      <td>:</td>
                      <td>014-34567878</td>
                    </tr>
                    <tr>
                      <td>Email</td>
                      <td>:</td>
                      <td>hidayah@adfinance.my</td>
                    </tr>
                    <tr>
                      <td>Consultant Type</td>
                      <td>:</td>
                      <td>UTS</td>
                    </tr>
                    <tr>
                      <td>Company Distributor</td>
                      <td>:</td>
                      <td>A.D Financial Sdn Bhd</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </va-card>
            <br/><br/>
            <va-card>
              <h4 slot="header" class="card-title">Registered Case</h4>
              <br>
              <div>
                <tabs
                  :tabs="tabs"
                  :currentTab="currentTab"
                  :wrapper-class="'default-tabs'"
                  :tab-class="'default-tabs__item'"
                  :tab-active-class="'default-tabs__item_active'"
                  :line-class="'default-tabs__active-line'"
                  @onClick="handleClick"/>
                <div class="content">
                  <div v-if="currentTab === 'tab1'">
                    <div class="ml-4">
                      <br />
                      <table class="table table-striped">
                        <tbody>
                          <tr>
                            <td style="width: 20%;">Classification</td>
                            <td style="width: 2%;">:</td>
                            <td style="width: 30%;">Watchlist</td>
                            <td style="width: 10%;">Effective Date</td>
                            <td style="width: 2%;">:</td>
                            <td>05-09-2020</td>
                          </tr>

                          <tr>
                            <td>Reason</td>
                            <td>:</td>
                            <td>Sample Reason 1 Sample Reason 1 Sample Reason 1 Sample Reason 1 Sample Reason 1
                              <a href="#" @click="preview">
                                <i class="fa fa-eye" />
                              </a>

                            </td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>

                          <tr>
                            <td>Remark</td>
                            <td>:</td>
                            <td>Sample Remark 1 Sample Remark 1 Sample Remark 1 Sample Remark 1 Sample Remark 1
                              <a href="#" @click="preview">
                                <i class="fa fa-eye" />
                              </a>
                            </td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td>Document</td>
                            <td>:</td>
                            <td>
                              <div class="col">

                                <a href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" class="row" target="_blank" style="color:#007bff !important;"> Attachment 1</a>

                                <a href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" class="row" style="color:#007bff !important;"> Attachment 2</a>
                              </div>
                            </td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>

                        </tbody>
                      </table>
                    </div>
                    <br><br>
                    <form class="ml-1">
                      <vue-form-generator
                        tag="div"
                        :schema="schema"
                        :model="model"
                        :options="formOptions"
                        @model-updated="onModelUpdated"
                        ref="EntryForm">
                      </vue-form-generator>
                      <br>

                      <button type="submit" class="btn btn-primary btn-fill float-left btn-md">
                        <i class="fa fa-step-backward" /> &nbsp; Previous
                      </button>
                      <div class="float-right">
                        <button @click="saveAsDraft" type="button" class="mr-2 btn btn-info btn-fill btn-md">
                          <i class="fa fa-pencil-square-o" /> &nbsp; Save as draft
                        </button>
                        <button type="submit" class="mr-2 btn btn-warning btn-fill btn-md"  @click.prevent="submit">
                          <i class="fa fa-reply" /> &nbsp; Return
                        </button>
                        <button type="submit" class="mr-2 btn btn-danger btn-fill btn-md"  @click.prevent="submit">
                          <i class="fa fa-reply" /> &nbsp; Reject
                        </button>
                        <button @click="submit" type="button" class="ml-2 btn btn-success btn-fill btn-md">
                          <i class="fa fa-paper-plane" /> &nbsp; Verify
                        </button>
                      </div>
                    </form>

                  </div>
                  <div v-if="currentTab === 'tab2'">
                    <div class="ml-4">
                      <br>
                      <br />
                      <table class="table table-striped">
                        <tbody>
                          <tr>
                            <th>Date</th>
                            <th>Creation By</th>
                            <th>Activity</th>
                            <th>Remarks/Comments</th>
                            <th>Attachment</th>
                            <th>Latest Update</th>
                          </tr>
                          <tr>
                            <td style="width: 10%;">20/08/2020</td>
                            <td style="width: 20%;">Zulkifli Bin Zakaria</td>
                            <td style="width: 20%;">Register New Case</td>
                            <td style="width: 20%;">sample remark data  &nbsp;&nbsp;&nbsp;
                              <a href="#" @click="preview">
                                <i class="fa fa-eye" />
                              </a>
                            </td>
                            <td style="width: 20%;">-</td>
                            <td style="width: 10%;">20/08/2020</td>

                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>
              </div>

            </va-card>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import Vue from 'vue'
import VueFormGenerator from 'vue-form-generator'
import 'vue-form-generator/dist/vfg.css'
import Tabs from 'vue-tabs-with-active-line'
Vue.use(VueFormGenerator)

const TABS = [{
  title: 'Detail Information',
  value: 'tab1',
}, {
  title: 'Audit Log',
  value: 'tab2',
}]
export default {
  components: {
    Tabs,
  },

  data () {
    return {
      tabs: TABS,
      currentTab: 'tab1',

      fields: [
        // A virtual column that doesn't exist in items
        { key: 'index', label: 'No' },
        // A regular column
        { key: 'transaction', label: 'Transaction Type', sortable: false },
        { key: 'activities', label: 'Activities', sortable: false },
        { key: 'created', label: 'Created By', sortable: false },
        { key: 'date', label: 'Creation Date', sortable: true },
      ],
      items: [
        {
          transaction: 'Add',
          activities: '',
          created: 'Suhaila Binti Syukur',
          date: '25/11/2020',

        },
        {
          transaction: 'Return',
          activities: '',
          created: '',
          date: '',

        },
        {
          transaction: 'Edit',
          activities: '',
          created: '',
          date: '',

        },
        {
          transaction: 'Verify',
          activities: '',
          created: '',
          date: '',

        },
        {
          transaction: 'Approve',
          activities: '',
          created: '',
          date: '',

        },

      ],

      currentPage: 1,
      perPage: 5,
      filter: null,

      model: {

        comment: '',

      },
      schema: {
        fields: [
          {
            type: 'textArea',
            label: 'Remark/Comment',
            model: 'comment',
            hint: 'Max 500 characters',
            max: 500,
            placeholder: 'Enter remark/comment',
            rows: 5,
            validator: 'string',
            // required:true
          },
          {
            type: 'input',
            inputType: 'file',
            label: 'Upload Document',
          },

        ],
      },
      formOptions: {
        validateAfterLoad: false,
        validateAfterChanged: true,
        validateAsync: true,
      },

    }
  },
  methods: {

    preview () {
      alert(JSON.stringify(' Remark : Sample Remark.Sample Remark.Sample Remark.Sample Remark.Sample Remark.Sample Remark.Sample Remark.Sample Remark.Sample Remark.Sample Remark.Sample Remark.Sample Remark.Sample Remark.Sample Remark.Sample Remark.'))
      // this.$router.push("/admin/director-details");
    },

    handleClick (newTab) {
      this.currentTab = newTab
    },

    validateEntryForm () {
      return this.$refs.EntryForm.validate()
    },
    submit: async function () {
      const response = await this.validateEntryForm()
      if (response) {
        //
      } else {

      }
    },
  },
}
</script>

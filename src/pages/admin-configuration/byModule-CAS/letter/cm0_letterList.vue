<template>
  <va-card>
    <loder v-show="isLoader" />

    <template slot="header">
      <br />
      <div class="row">
        <div class="col">
          <h4 class="card-title">List of Letter Template</h4>
        </div>
        <div class="col float-right">
          <div class="float-right">
            <h5>
              <span
                v-b-tooltip.hover
                title="create"
                v-on:click="create"
                class="badge badge-primary"
              >
                <i class="fa fa-plus"></i
                ></span>
            </h5>
          </div>
        </div>
      </div>
    </template>

      <div class="text-center text-danger my-2" v-if="!isDataReady">
        <b-spinner class="align-middle"></b-spinner>
        <strong>Loading...</strong>
      </div>

      <div v-else>

        <br />
        <div class="row">
          <div class="flex md3 offset--md9">
            <va-input
              :value="term"
              :placeholder="$t('Search')"
              @input="search"
              removable
            >
              <va-icon name="fa fa-search" slot="prepend" />
            </va-input>
          </div>
        </div>
        <!-- <br /> -->
        <!-- <div class="float-left">
          <va-date-picker
            :value="term"
            @input="searchDate"
            :config="{ enableTime: false, dateFormat: 'd-m-Y' }"
            v-model="dateFormat"
          />
        </div> -->
        <!-- Main table element -->
        <!-- <div class="col-ml-2"> -->
        <va-data-table
          :datacount="eventListCount"
          :fields="fields"
          :data="filteredData"
          :per-page="parseInt(perPage)"
        >
          <!-- A virtual column -->
          <template slot="no" slot-scope="row">
            {{ row.rowIndex + 1 }}
          </template>
          <template slot="actions" slot-scope="props">
            <h4 class="mt-2">
              <span
                v-b-tooltip.hover
                title="edit"
                v-on:click="edit(props.rowData)"
                class="badge badge-primary mr-2"
              >
                <i class="fa fa-edit"></i
                ></span>
              <span
                v-b-tooltip.hover
                title="delete"
                v-on:click="deleteItem(props.rowData)"
                class="badge badge-danger mr-1"
              >
                <i class="fa fa-trash"></i
                ></span>
            </h4>
          </template>
        </va-data-table>
        <br/>
        <br/>
        <button
          @click="back"
          type="button"
          class="btn btn-primary btn-fill btn-md"
        >
          <i class="fa fa-step-backward" /> &nbsp; Previous
        </button>
    </div>    
  </va-card>
</template>
<script>
import Vue from 'vue'
import VueFormGenerator from 'vue-form-generator'
import 'vue-form-generator/dist/vfg.css'
import { debounce } from 'lodash'
import moment from 'moment'
import * as servicesModule0 from '../../../../app/module0/services05'
import loder from "../../../request_loader";

Vue.use(VueFormGenerator)

export default {
  components: {
    loder
  },
  mounted () {
    this.getAllList()
  },
  methods: {
    back() {
      this.$router.go(-1);
    },

    clear () {
      this.dateFormat = null
      this.term = null
    },
    async getAllList () {
      const response = await servicesModule0.getAllLetterList()
      this.items = response
      this.eventListCount = this.items.length
      // console.log("get all event : " + response);
      this.isDataReady = true; // Kill Component loader
    },

    search: debounce(function (term) {
      this.term = term
      console.log(this.term)
    }, 400),

    details () {
      console.log('jhdfj')
      this.$router.push('/admin/notification_detail')
    },

    async deleteItem (data) {
      // eslint-disable-next-line no-unused-vars
      if (confirm("Are you sure you want to delete?")) {
        this.isLoader = true; // Loder
        const response = await servicesModule0.deleteLetter(
          data.CAS_LETTER_ID
        )
        this.getAllList();
        this.isLoader = false; // Kill Loder
      }  
    },

    edit (data) {
      // this.$router.push("/admin/announcement_details");
      // this.$router.push({
      //   name: "edit-letter",
      //   params: { CAS_LETTER_ID: data.CAS_LETTER_ID }
      // });
      localStorage.setItem('edit-letter', JSON.stringify(data))
      this.$router.push({
        name: 'edit-letter',
      })
    },

    create () {
      this.$router.push('/fimm/new-letter')
    },

    reset () {},
  },

  computed: {
    fields () {
      return [
        {
          name: '__slot:marker',
          width: '30px',
          dataClass: 'text-center',
        },
        {
          name: '__slot:no',
          title: 'No',
          // width: "30px"
          // height: "45px"
          // dataClass: "text-center"
        },
        {
          name: 'CAS_LETTER_TITTLE',
          title: 'Letter Title',
        },
        {
          name: 'USER_NAME',
          title: 'Create By',
        },
        {
          name: '__slot:actions',
          title: 'Action',
          dataClass: 'justify-content-center',
          width: '15%',
        },
      ]
    },
    filteredData () {
      if (!this.term || this.term.length < 1) {
        return this.items
      }

      return this.items.filter(item => {
        return this.term
          .toLowerCase()
          .split(' ')
          .every(
            (v) =>
              item.CAS_LETTER_TITTLE.toLowerCase().includes(v),
          )
      })
    },
  },
  data () {
    return {
      // Data for loder
      isLoader: false,
      isDataReady:false,

      dateFormat: '',
      term: null,
      perPage: '6',
      perPageOptions: ['4', '6', '10', '20'],
      eventListCount: null,
      items: [],

      model: {
        title: '',
        dateCreated: '',
        createdBy: '',
        status: '',
        CAS_LETTER_TITTLE: '',
      },

    }
  },
}
</script>
<style lang="scss">
.va-data-table__pagination {
  margin-top: 1rem;
  display: -webkit-box;
  display: -ms-flexbox;
  display: inherit;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: flex-end;
}

.bgcolor {
  background-color: white !important;
}

.alignleft {
  display: flex;
  justify-content: flex-end;
}
.alignright {
  display: flex;
  justify-content: flex-start;
}
</style>

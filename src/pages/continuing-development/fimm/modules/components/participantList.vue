<template>
  <div>
    <b-row class="justify-content-end">
      <b-col cols="3">
        <va-input
          v-model="termSearch"
          :placeholder="$t('Search')"
          removable
          @input="search"
          :value="termSearch"


        >
<!--          :value="termSearch"-->

          <!--          @input="search"-->

          <va-icon name="fa fa-search" slot="prepend" />
        </va-input>
      </b-col>
      <b-col cols="3">
        <div class="input-group">
          <va-date-picker
            :value="termDate"
            @input="searchDate"
            :config="{ enableTime: false, dateFormat: 'd-m-Y' }"
            v-model="dateFormat"
            placeholder="Search date"
          />
          <div class="input-group-append">
            <button
              @click.prevent="clear"
              type="button"
              class="btn btn-md btn-primary"
            >
              <va-icon name="fa fa-refresh" />
            </button>
          </div>
        </div>
      </b-col>
    </b-row>
    <va-data-table
      :fields="fields"
      :data="filterData"
      no-data-label="No data found"
      :per-page="perPage"
      :datacount="count"
      :dataperpage="perPage"
      clickable
    >
      <template slot="no" slot-scope="row">
        {{ row.rowIndex + 1 }}
      </template>
      <template slot="DATE" slot-scope="props">
        {{ formatDate(new Date(props.rowData.DATE)) }}
      </template>
      <template slot="NRIC_NUMBER" slot-scope="props">
        {{ formatNRIC(props.rowData.NRIC_NUMBER) }}
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
    </va-data-table>
  </div>
</template>
<script>
import { debounce } from "lodash";
export default {
  methods: {
    clear() {
      console.log('cleared');
      this.dateFormat = null;
      this.termDate = null;
      this.termSearch = null;
      this.clearFilter()
    },
    clearFilter() {
      this.$emit("clear")
    },

    search: debounce(function (value) {
      console.log(value);
      this.$emit("filter", value);
    }, 400),

    searchDate: debounce(function (value) {
      this.$emit("filter-date", value);
    }, 400),

    //FUNCTION DATE
    formatDate: function (date) {
      var ms = [
        "JAN",
        "FEB",
        "MAR",
        "APR",
        "MAY",
        "JUN",
        "JUL",
        "AUG",
        "SEP",
        "OCT",
        "NOV",
        "DEC",
      ];
      return (
        date.getDate() + " " + ms[date.getMonth()] + " " + date.getFullYear()
      );
    },

    formatNRIC: function (nric) {
      let newNric = "";
      if (nric) {
        let date = nric.substr(0, 6);
        let state = nric.substr(6, 2);
        let identity = nric.substr(8, 4);
        newNric = date + "-" + state + "-" + identity;
      }
      return newNric;
    },

    viewPdf(document) {
      this.$emit("view-document", document);
    },
  },
  props: {
    fields: {
      type: Array,
      required: true,
    },
    filterData: {
      type: Array,
      required: true,
    },
    count: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      perPage: 10,
      termSearch: '',
      termDate: null,
      dateFormat: null,
    };
  },
};
</script>

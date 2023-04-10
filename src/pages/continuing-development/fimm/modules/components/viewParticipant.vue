<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">
        {{ title }}
      </h4>
    </div>
    <br />
    <va-card>
      <div class="ml-2 col-md-12">
        <div class="row">
          <div class="flex col-md-3 offset-9">
            <va-input
              :value="termSearch"
              :placeholder="$t('Search')"
              @input="search"
              removable
            >
              <va-icon name="fa fa-search" slot="prepend" />
            </va-input>
          </div>
        </div>
        <va-data-table
          :fields="ParticipantFields"
          :data="PartFilteredData"
          no-data-label="No data found"
          :per-page="parseInt(perPage)"
          :datacount="ParticipantRecordCount"
          :dataperpage="parseInt(perPage)"
          clickable
        >
          <template slot="no" slot-scope="row">
            {{ row.rowIndex + 1 }}
          </template>
          <template slot="NRIC_NUMBER" slot-scope="props">
            {{ formatNRIC(props.rowData.NRIC_NUMBER) }}
          </template>
        </va-data-table>
      </div>
    </va-card>
    <br />
    <button @click="back" type="button" class="btn btn-primary btn-fill btn-md">
      <i class="fa fa-step-backward" /> &nbsp; Previous
    </button>
  </va-card>
</template>
<script>
import { debounce } from "lodash";
export default {
  mounted() {
    this.title = localStorage.getItem("title_viewParticipant");
    var routeName = localStorage.getItem("route_name_viewParticipant");
    var data = localStorage.getItem(routeName);
    this.participantList = JSON.parse(data);
    this.ParticipantRecordCount = this.participantList.length;
  },
  data() {
    return {
      participantList: [],
      ParticipantRecordCount: 0,
      perPage: 10,
      currentPage: 1,
      term: null,
      termSearch: null,
      title: null,
    };
  },
  computed: {
    ParticipantFields() {
      return [
        {
          name: "__slot:no",
          title: "NO",
        },
        {
          name: "NAME",
          title: "CONSULTANT NAME",
          sortField: "NAME",
        },
        {
          name: "__slot:NRIC_NUMBER",
          title: "NRIC NUMBER",
          sortField: "NRIC_NUMBER",
        },
        {
          name: "PASSPORT_NUMBER",
          title: "PASSPORT NUMBER",
          sortField: "PASSPORT_NUMBER",
        },
        {
          name: "PENDING_POINT",
          title: "PENDING_POINT",
          sortField: "PENDING_POINT",
        },
        {
          name: "APPROVE_POINT",
          title: "APPROVE_POINT",
          sortField: "APPROVE_POINT",
        },
        {
          name: "REVOKE_POINT",
          title: "REVOKE_POINT",
          sortField: "REVOKE_POINT",
        },
      ];
    },
    PartFilteredData() {
      if (!this.term || this.term.length < 1) {
        return this.participantList;
      }
      return this.participantList.filter((item) => {
        if (item.PASSPORT_NUMBER) {
          return this.term
            .toLowerCase()
            .split(" ")
            .every((v) => item.PASSPORT_NUMBER.toLowerCase().includes(v));
        } else {
          return this.term
            .toLowerCase()
            .split(" ")
            .every(
              (v) =>
                item.NAME.toLowerCase().includes(v) ||
                item.NRIC_NUMBER.toLowerCase().includes(v)
            );
        }
      });
    },
  },
  methods: {
    back() {
      this.$router.go(-1);
    },

    search: debounce(function (term) {
      console.log(term);
      this.termSearch = term;

      if(term.includes('-')){
        this.term =  term.substr(0,6)+term.substr(7,2)+term.substr(10,4);
      }
      else{
        this.term = term;
      }
      // this.term = term;
      console.log(this.term);
    }, 400),

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
  },
};
</script>

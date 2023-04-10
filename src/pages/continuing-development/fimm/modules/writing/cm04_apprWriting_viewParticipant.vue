<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">
        Writing : List of Participants
      </h4>
    </div>
    <br />
    <va-card>
      <div class="ml-2 col-md-12">

          <div class="row">
            <div class="flex md2 offset--md10">
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
          <va-data-table
            :fields="PartFields"
            :data="PartFilteredData"
            no-data-label="No data found"
            :per-page="parseInt(perPage)"
            :datacount="partRecordCount"
            :dataperpage="parseInt(perPage)"
            clickable
          >
            <template slot="no" slot-scope="row">
              {{ row.rowIndex + 1 }}
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
import * as servicesModule4 from "../../../../../app/module4/services01";


export default {
  props: {},
  mounted() {

    this.getAllParticipant();
  },
  components: {},
  methods: {
    // searh
    search: debounce(function (term) {
      this.term = term;
      console.log(this.term);
    }, 400),

    //get participant
    getAllParticipant: async function () {
      const response = await servicesModule4.getParticipantByID(
        localStorage.getItem("approval-writingView-participant")
      );
      this.partList = response;
      this.partRecordCount = this.partList.length;
    },


    //general
    back() {
      this.$router.go(-1);
    },
  },
  computed: {
    //PARTICIPANT
    PartFields() {
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
          name: "NRIC_NUMBER",
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
        return this.partList;
      }
      return this.partList.filter((item) => {
        return this.term
          .toLowerCase()
          .split(" ")
          .every((v) =>
          item.NAME.toLowerCase().includes(v)||
          item.NRIC_NUMBER.toLowerCase().includes(v)||
            (item.PASSPORT_NUMBER ? item.PASSPORT_NUMBER.toLowerCase().includes(v) : false)
          );
      });
    },
  },
  data() {
    return {
      term: null,
      perPage: "10",
      currentPage: 1,
      count: 1,
      partRecordCount: null,
      partList: [],

      model: {

      },

      formOptions: {
        validateAfterChanged: true,
      },
    };
  },
};
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

.content {
  margin-top: 30px;
  font-size: 20px;
}
.inline {
  display: inline-flex;
  float: right;
}
.color {
  color: red;
}
</style>

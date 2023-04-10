<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">Distribution Point : View Record</h4>
    </div>
    <br />
    <va-card>
      <div>
        <table class="table table-striped">
          <tbody>
            <!-- <tr>
              <td style="width: 20%">DISTRIBUTION POINT CODE</td>
              <td style="width: 1%">:</td>
              <td>{{ DPDATA.DIST_POINT_CODE }}</td>
            </tr> -->
            <tr>
              <td>DISTRIBUTION POINT NAME</td>
              <td>:</td>
              <td>{{ DPDATA.DIST_POINT_NAME }}</td>
            </tr>
            <tr>
              <td>OFFICE PHONE NO</td>
              <td>:</td>
              <td>{{ DPDATA.PHONE_NUMBER }}</td>
            </tr>
            <tr>
              <td>ADDRESS</td>
              <td>:</td>
              <td>
                {{ DPDATA.DIST_ADDR_1 }}<br />
                {{ DPDATA.DIST_ADDR_2 }}<br />
                {{ DPDATA.DIST_ADDR_3 }}, {{ DPDATA.POSTCODE_NO }}<br />
                {{ DPDATA.SET_CITY_NAME }}, {{ DPDATA.STATE_NAME }}<br />
                {{ DPDATA.COUNTRY_NAME }}
              </td>
            </tr>
            <tr>
              <td>STATUS</td>
              <td>:</td>
              <td>{{ DPDATA.TS_PARAM }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </va-card>
    <br />
    <br />
    <button @click="back" type="button" class="btn btn-primary btn-fill btn-md">
      <i class="fa fa-step-backward" /> &nbsp; Previous
    </button>
  </va-card>
</template>

<script>
import "vue-form-generator/dist/vfg.css";

export default {
  mounted() {
    var data = localStorage.getItem("view-distributionPoint");
    this.DPDATA = JSON.parse(data);
  },

  components: {},
  methods: {
    async back() {
      this.$router.go(-1);
    },
  },
  computed: {},
  data() {
    return {
      DPDATA: "",
    };
  },
};
</script>


<style lang="scss">
.default-tabs {
  position: relative;
  margin: 0 auto;

  &__item {
    display: inline-block;
    margin: 0 5px;
    padding: 10px;
    padding-bottom: 8px;
    font-size: 16px;
    letter-spacing: 0.8px;
    color: gray;
    text-decoration: none;
    border: none;
    background-color: transparent;
    border-bottom: 2px solid transparent;
    cursor: pointer;
    transition: all 0.25s;

    &__active {
      color: black;
    }

    &:hover {
      border-bottom: 2px solid gray;
      color: black;
    }

    &:focus {
      outline: none;
      border-bottom: 2px solid gray;
      color: black;
    }

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }
  }

  &__active-line {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    background-color: black;
    transition: transform 0.4s ease, width 0.4s ease;
  }
}

.alignright {
  display: flex;
  justify-content: flex-end;
}

.alignleft {
  display: flex;
  justify-content: flex-start;
}
</style>

<style scoped>
.widthModal {
  width: 80%;
}
</style>


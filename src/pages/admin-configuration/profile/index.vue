<template>
  <va-card>
    <h4 slot="header" class="card-title">User Profile</h4>
    <div class="mb-2">
      <div class="row">
        <div class="flex md2">
          <b-avatar size="6rem">
            <template #badge><b-icon icon="camera-fill"></b-icon></template>
          </b-avatar>
        </div>
        <div class="flex md10">
          <div>
            <span><b>Name</b></span
            ><br />
            <span> {{ userName }}</span
            ><br />
            <span><b>Email</b></span
            ><br />
            <span> {{ userEmail }}</span
            ><br />
          </div>
        </div>
      </div>
      <!-- <div class="flex md6">
        <div class="item">md6</div>
      </div>
    </div>

      <b-avatar size="6rem">
      <template #badge><b-icon icon="camera-fill"></b-icon></template>
      </b-avatar> -->
      <br />
    </div>
  </va-card>
</template>

<script>
export default {
  mounted() {
    this.getInfo();
  },
  watch: {},

  props: {
    role: {
      type: String,
      default: "",
    },
  },

  methods: {
    async getInfo() {
      const user = localStorage.getItem("user");
      this.userName = JSON.parse(user).name;
      this.userEmail = JSON.parse(user).email;
    },
  },

  data() {
    return {
      userName: null,
      userEmail: null,
    };
  },
};
</script>

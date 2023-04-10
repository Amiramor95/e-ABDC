<template>
  <va-card>
    <h4 slot="header" class="card-title">User Profile</h4>
    <div class="mb-2">
      <div class="row">
        <div class="flex md2">
          <div>
            <span><b>User ID</b></span
            ><br />
            <span> {{ userName }}</span
            ><br />
            <span><b>Name</b></span
            ><br />
            <span> {{ userName }}</span
            ><br />
            <span><b>NRIC</b></span
            ><br />
            <span> {{ userEmail }}</span
            ><br />
            <span><b>Email</b></span
            ><br />
            <span> {{ userEmail }}</span
            ><br />
            <span><b>Phone Number</b></span
            ><br />
            <span> {{ userEmail }}</span
            ><br />
          </div>
        </div>
        <div class="flex md10">
          <va-button @click.once="editProfile">Edit Profile</va-button>
        </div>
      </div>
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
  async editProfile() {
    console.log("Redirect to edit profile");
  },

  data() {
    return {
      userName: null,
      userEmail: null,
    };
  },
};
</script>

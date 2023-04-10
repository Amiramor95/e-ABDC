<template>
  <div>
    <h1>Users</h1>
    <ul>
      <li v-for="user in users">{{ user.name }}</li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      module0Data: [],
      module1Data: [],
      module2Data: [],
      module3Data: [],
      module4Data: [],
      module5Data: [],
      module6Data: [],
      module7Data: [],
      module10Data: [],
    };
  },
  methods: {
    async testModule0() {
      const { data } = await axios.get("/api/module0/unit-test");
      this.module0Data = data;
    },
    async testModule1() {
      const { data } = await axios.get("/api/module1/unit-test");
      this.module1Data = data;
    },
    async testModule2() {
      const { data } = await axios.get("/api/module2/unit-test");
      this.module2Data = data;
    },
    async testModule3() {
      const { data } = await axios.get("/api/module3/unit-test");
      this.module3Data = data;
    },
    async testModule4() {
      const { data } = await axios.get("/api/module4/unit-test");
      this.module4Data = data;
    },
    async testModule5() {
      const { data } = await axios.get("/api/module5/unit-test");
      this.module5Data = data;
    },
    async testModule6() {
      const { data } = await axios.get("/api/module6/unit-test");
      this.module6Data = data;
    },
    async testModule7() {
      const { data } = await axios.get("/api/module7/unit-test");
      this.module7Data = data;
    },
    async testModule10() {
      const { data } = await axios.get("/api/module10/unit-test");
      this.module10Data = data;
    },
  },
};
</script>

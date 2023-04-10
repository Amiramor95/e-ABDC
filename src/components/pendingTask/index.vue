<template>
  <div>
    <span v-for="(list, index) in pendingList" :key="index">
      <b-badge pill variant="warning"
        >{{list.message}}
      </b-badge>
      <b-badge pill variant="primary">
        {{list.value}}
      </b-badge>
    </span>
  </div>
</template>

<script>
export default {
  watch: {},
  props: ["pendingList"],
  name: "pending-task"
};
</script>
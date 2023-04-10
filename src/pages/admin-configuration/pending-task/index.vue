<template>
  <va-card>
      <h4 slot="header" class="card-title">Pending Task</h4>
    <div class="">
      <div class="row">
    <div class="flex md4 lg4">
      <va-card style="background-color:#A9CCE3;">
        <va-card-title>Title</va-card-title>
        <va-card-content>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</va-card-content>
      </va-card>
    </div>
        <div class="flex md4 lg4">
      <va-card style="background-color:#A9CCE3;">
        <va-card-title>Title</va-card-title>
        <va-card-content>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</va-card-content>
      </va-card>
    </div>
        <div class="flex md4 lg4">
      <va-card style="background-color:#A9CCE3;">
        <va-card-title>Title</va-card-title>
        <va-card-content>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</va-card-content>
      </va-card>
    </div>
  </div>
    </div>
  </va-card>
</template>

<script>
export default {
  watch: {
  },
    
    props : {
        role: {
            type: String,
            default: '',
        },
    }
}
</script>
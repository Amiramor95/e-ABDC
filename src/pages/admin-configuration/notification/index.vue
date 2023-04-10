<template>
  <va-card>
      <h4 slot="header" class="card-title">Notification</h4>
    <div class="">
      <br />
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
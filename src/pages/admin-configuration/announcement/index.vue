<template>
  <va-card>
    <template slot="header">
      <br />
      <div class="row">
        <div class="col">
          <h4 class="card-title">List of Event</h4>
        </div>
        <div class="col float-right">
          <div class="float-right">
            <h5>
              <b-badge
                v-b-tooltip.hover
                title="Approval Setting"
                @click.prevent="setting"
                class="mr-1"
                variant="dark"
              >
                <i class="fa fa-cog"></i>
              </b-badge>
              <b-badge
                v-b-tooltip.hover
                title="search"
                v-b-toggle.collapse-1
                class="mr-1"
                variant="secondary"
              >
                <i class="fa fa-search"></i>
              </b-badge>
              <span
                v-b-tooltip.hover
                title="create"
                v-on:click="create"
                class="badge badge-primary"
              >
                <i class="fa fa-plus"></i
              ></span>
            </h5>
          </div>
        </div>
      </div>
    </template>
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
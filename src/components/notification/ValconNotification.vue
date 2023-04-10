<template>
<div class="box" style="position: relative;"
  @click="showNotification"
>
 <i :style="colorTextStyle" class="fa fa-bell"></i><div style="float:right;">
 <span 
 class="badge bg-danger" 
 style="color:white; 
 border-radius: 50%; 
 position: absolute;
 top: -10px;
right: -10px;
  ">{{totalNotification}}</span>
 </div>
</div>

</template>

<script>
export default {
  name: 'VaIconMessage',
  methods: {
    showNotification() {
      this.$emit('click-icon', true)
    }
  },
  data () {
    return {
      color: "white",
      totalNotification: 0,
      colorTextStyle: "color: "+this.$store.getters.paletteText
    }
  },

  watch: {
    '$store.getters.totalNotification': function() {
      this.totalNotification = this.$store.getters.totalNotification;
    },
    '$store.getters.paletteText': function() {
      this.colorTextStyle = 'color: '+this.$store.getters.paletteText;
    },
  },
}
</script>

<style lang="scss">
  .va-icon-notification {
    display: inline-block;
    width: 24px;
    height: 24px;
  }
</style>

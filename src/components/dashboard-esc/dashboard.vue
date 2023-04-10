<template>
  <div>
    <div class="dashboard">
    </div>
    <footer><div class="footer-main" style="position: relative; top: 20px;">
      <p><span>&#169; 2021 </span>Federation Of Investment Managers Malaysia [199301017839 (272577-P)]</p>
    </div></footer>
  </div>
</template>

<script>

export default {
  name: 'esc-dashboard',
  mounted () {
  },
  data () {
    return {
      userdata: {},
      settinglist: [],
    }
  },
  methods: {
  },
}
</script>

<style lang="scss">
.height {
  height: 50%;
}

.row-equal .flex {
  .va-card {
    height: 100%;
  }
}

.dashboard {
  .va-card {
    margin-bottom: 0 !important;
  }
}

.app-layout__main {
  background: #e8e8e8;
}
.footer-main {
  color: #b6b6b6 !important;
  position: absolute;
  padding: 0px;
  margin-left: 30%;
  justify-items: center;
  display: inline-block;
  -ms-flex-item-align: end;
  align-self: flex-end;
  font-weight: 800;
}
.chart_style{
    width: 450px;
    height: 450px;
    margin:0 auto
}
.card_title{
  color: #000000;
}
.box_container{
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
  margin-top: 180px;
}
.single_box{
  height: 100px;
  color: #ffffff;
  margin: 10px auto;
  width: 30%;
  border: 3px solid grey;
  padding: 10px;
  text-align: center;

}
.bgclr{
  background-color: green;
}
.bgclr1{
  background-color: #00D3FF;
}
.bgclr2{
  background-color: #0EDBB4;
}
.bgclr3{
  background-color: #0d0d0d;
}
.bgclr4{
  background-color: #940f0f;
}
.bgclr5{
   background-color: #00D3FF;
}
.bgclr6{
  background-color: #1655c9;
}
.bgclr7{
  background-color: #898f31;
}
.bgclr8{
  background-color: #7e10cc;
}

.single_box span{
  font-weight: bold;
   font-size: 20px;
  color: #ffffff;
}
.single_box .title{
  display: block;
  color: #ffffff;
  font-size: 13px;
}
.header-title{
  position: absolute;
  bottom: 16px;
  font-size: 13px;
  font-weight: lighter;
}
</style>

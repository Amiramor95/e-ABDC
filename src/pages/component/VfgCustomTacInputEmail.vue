<template>
  <div>
    <label>
      <span class="color hand"
        @click="requestTacByEmail"
        style="text-transform: uppercase; text-decoration: underline;">
        {{ schema.labels }}
      </span>
    </label>
    <!-- <div class="width">
      <input
        type="text"
        v-model="value"
        :placeholder="schema.placeholder"
        class="form-control form-control-md"
      />
    </div> -->
  </div>
</template>
<script>
import { abstractField } from 'vue-form-generator'
import * as services06Module0 from '../../app/module0/services06'
import * as services06Module1 from "../../app/module1/services06";
import jQuery from "jquery";
export default {
  mixins: [abstractField],

  methods: {
    async requestTacByEmail () {
    //   var data = {
    //     phoneNo: '60' + this.model.PHONE_NO,
    //   }
      var data = {
        useremail: this.model.USER_EMAIL,
         userid: this.model.USER_ID,
      }
      console.log("ssss=",data.useremail);
      //this.timerEnabled = true;
      //jQuery('#countdownclass').show();
      //if (this.TACEnable == true) {
          const emailRe = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!emailRe.test(data.useremail)) {
      // console.log("Email=",value);
        alert('Please Enter a Valid Email Address');
    }else{
          const response = await services06Module1.getEmailTAC(data)
          console.log("tac=",response);
          localStorage.setItem('TAC_NUMBER',response.tac);
          alert('Please Check Your Email')
          // this.timerEnabled = true;
         //  jQuery('#countdownclass').show();
          //this.TACEnable = false
         // setTimeout(() => (this.TACEnable = true), 600 * 1000)
        // setTimeout(() => (this.TACEnable = true), 60 * 1000)
          // 600 * 1000
          // alert(this.TACEnable);
        } 
    //   } else {
    //     alert('Please wait for '+this.displayTime+' minutes to request new TAC')
    //   }
    },

  },
  data () {
    return {
      TACEnable: true,
      timerEnabled: false,
      timerCount: 60,
      displayTime: 1,
    }
  },

  // data() {} -commented 2/4/21 Haizad
}
</script>
<style lang="scss">
.color {
  color: blue;
}

.width {
  width: 175%;
}

.hand {
  cursor: pointer;
}
</style>

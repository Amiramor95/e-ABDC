<template>
  <div>
    <label>
      <span class="color hand"
        @click="requestTac"
        style="text-transform: uppercase;">
        {{ schema.labels }}
      </span>
    </label>
    <div class="width">
      <input
        type="text"
        v-model="value"
        :placeholder="schema.placeholder"
        class="form-control form-control-md"
      />
    </div>
  </div>
</template>
<script>
import { abstractField } from 'vue-form-generator'
import * as services06Module1 from '../../app/module0/services06'
import jQuery from "jquery";
export default {
  mixins: [abstractField],
  watch: {

             timerEnabled(value) {
              //this.timerCount = 600;
                if (value) {
                   console.log("value1=",value);
                    setTimeout(() => {
                        this.timerCount--;
                        this.displayTime = new Date(this.timerCount * 1000).toISOString().substring(14, 19);
                       // console.log("newtime=",newtime);
                        jQuery("#countdownclass").text("Please wait for "+this.displayTime+" minutes to request a new TAC");
                    }, 1000);
                }
            },

            timerCount: {
                handler(value) {
                  console.log("value=",value);
                    if (value > 0 && this.timerEnabled) {
                        setTimeout(() => {
                            this.timerCount--;
                             this.displayTime = new Date(this.timerCount * 1000).toISOString().substring(14, 19);
                            jQuery("#countdownclass").text("Please wait for "+this.displayTime+" minutes to request a new TAC");
                        }, 1000);
                    }
                   if(value == 0 ){
                    this.timerEnabled = false;
                    jQuery('#countdownclass').hide();
                   }
                },

                immediate: true // This ensures the watcher is triggered upon creation
            }
        },
  methods: {
    async requestTac () {
      var data = {
        phoneNo: '60' + this.model.PHONE_NO,
      }
      //this.timerEnabled = true;
      //jQuery('#countdownclass').show();
      if (this.TACEnable == true) {
        if (data.phoneNo.length > 3) {
          const response = await services06Module1.getTAC(data)
          localStorage.setItem('TAC_NUMBER',response.tac);
          alert('You Have requested a TAC')
           this.timerEnabled = true;
           jQuery('#countdownclass').show();
          this.TACEnable = false
         // setTimeout(() => (this.TACEnable = true), 600 * 1000)
         setTimeout(() => (this.TACEnable = true), 60 * 1000)
          // 600 * 1000
          // alert(this.TACEnable);
        } else {
          alert('Please insert valid telepone number.')
        }
      } else {
        alert('Please wait for '+this.displayTime+' minutes to request new TAC')
      }
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

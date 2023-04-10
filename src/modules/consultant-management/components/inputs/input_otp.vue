
<template>
  <div class="width">
    <!-- {{ schema.dataValue }} -->
    <label>
      <span class="color hand" @click="requestTac">
        {{ schema.labels }}
      </span>
    </label>
    <br />
    <input
      type="text"
      v-model="value"
      :placeholder="schema.placeholder"
      class="form-control form-control-md"
    />
    <span class="sent text-success">{{ info }}</span>
  </div>
</template>
<script>
import { abstractField } from 'vue-form-generator'
import * as AuthServices from '../../services/auth'
export default {
  mixins: [abstractField],
  data () {
    return {
      info: '',
      TACEnable: true,
    }
  },
  methods: {
    async requestTac () {
      console.log(this.model.PHONE)
      var data = {
        phoneNo: '6' + this.model.PHONE.replace('+', ''),
      }
      if (this.TACEnable == true) {
        if (data.phoneNo.length > 3) {
          const response = await AuthServices.trigger_otp(data)
          this.model.GENERATED_TAC = response.tac;
          this.info = 'TAC sent'
          this.TACEnable = false
          setTimeout(() => (this.TACEnable = true), 600 * 1000)
        } else {
          alert('Please insert valid telepone number.')
        }
      } else {
        alert('Please wait for 10 minutes to request new TAC')
      }

      // if (this.validPhoneNumber(this.model.PHONE)) {
      //   var data = {
      //     PHONE: "6" + this.model.PHONE,
      //   };
      //   try {
      //     const response = await AuthServices.trigger_otp(data);
      //     this.info = "TAC sent";
      //   } catch (error) {
      //     this.info = "Error sending TAC";
      //   }
      // }
    },
    validPhoneNumber (value) {
      // https://stackoverflow.com/a/68219741
      value = '6' + value
      const pattern = /^(\+?6?01)[02-46-9]-*[0-9]{7}$|^(\+?6?01)[1]-*[0-9]{8}$/
      return pattern.test(value)
    },
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

.sent {
  font-size: 0.8em;
  font-weight: bold;
}
</style>

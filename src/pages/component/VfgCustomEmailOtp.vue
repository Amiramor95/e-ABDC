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
      <span class="sent text-success">{{ info }}</span>
    </div>
  </div>
</template>
<script>
import { abstractField } from 'vue-form-generator'
import * as services06Module1 from '../../app/module0/services06'
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
      // if (this.TACEnable === true) {
      if (this.model.EMAIL.length) {
        await services06Module1.getEmailOTP({
          email: this.model.EMAIL,
        })
        this.info = 'TAC sent'
        this.TACEnable = false
        setTimeout(() => (this.TACEnable = true), 600 * 1000)
      } else {
        alert('Please insert valid email.')
      }
      // } else {
      //   alert('Please wait for 10 minutes to request new TAC')
      // }
    },
  },
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

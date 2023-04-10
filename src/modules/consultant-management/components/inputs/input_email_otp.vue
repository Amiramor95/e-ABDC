
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
      if (this.TACEnable === true) {
        if (this.model.CONSULTANT_EMAIL.length) {
          await AuthServices.trigger_email_otp({
            email: this.model.CONSULTANT_EMAIL,
          })
          this.info = 'TAC sent'
          this.TACEnable = false
          setTimeout(() => (this.TACEnable = true), 600 * 1000)
        } else {
          alert('Please insert valid email.')
        }
      } else {
        alert('Please wait for 10 minutes to request new TAC')
      }
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

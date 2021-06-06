<template>
  <q-card style="width: 400px">
    <q-card-section>
      <div class="text-h6">
        릴레이 이름 수정
      </div>
    </q-card-section>
    <q-card-section>
      <div class="row">
        <q-input
          class="col-10"
          v-model="relayState.name"
          label="Relay Name"
          :hint="relayState.code"
          @keyup="checkCode"
        >
        </q-input>
        <q-toggle
          v-model="relayState.value"
          checked-icon="check"
          color="green"
          unchecked-icon="clear"
        />
      </div>
    </q-card-section>
    <q-separator />
    <q-card-actions align="right">
      <q-btn
        class="q-px-sm"
        label="확인"
        color="teal-14"
        @click="submit"
        v-close-popup
      />
      <q-btn
        class="q-px-sm"
        label="취소"
        color="teal-14"
        flat
        v-close-popup
      />
    </q-card-actions>
  </q-card>
</template>

<script>
import { mapState } from 'vuex'
import strToHex from '../../../mixins/strToHex'

export default {
  mixins: [strToHex],
  props: ['selectedRelay'],
  computed: {
    ...mapState({
      locals: state => state.zones.locals,
      relays: state => state.zones.relays,
      selected: state => state.zones.selected
    })
  },
  data () {
    return {
      relayState: {
        _id: '',
        id: null,
        name: '',
        code: '',
        value: false
      }
    }
  },
  mounted () {
    this.relayState.id = this.selectedRelay
    this.relayState._id = this.relays[this.selectedRelay]._id
    this.relayState.name = this.relays[this.selectedRelay].name
    this.relayState.code = this.relays[this.selectedRelay].code
    this.relayState.value = this.relays[this.selectedRelay].value
  },
  methods: {
    checkCode () {
      this.relayState.code = this.encodeUTF16(this.relayState.name)
    },
    submit () {
      console.log('OK')
      this.$store.dispatch('zones/updateRelay', this.relayState)
    }
  }
}
</script>

<style>

</style>

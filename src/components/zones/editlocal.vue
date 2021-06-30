<template>
  <q-card style="width: 400px">
    <q-card-section>
      <div class="text-h6">
        지점 이름 수정
      </div>
    </q-card-section>

    <q-card-section class="q-mx-sm">
      <div>
        <q-input
          v-model="localState.name"
          label="Local Name"
          :hint="localState.code"
          color="teal-14"
          @keyup="checkCode"
          @blur="checkCode"
        />
      </div>
      <div class="row justify-between q-mt-md">
        <q-toggle
          v-model="localState.es"
          dense
          left-label
          label="E/S"
          color="teal-14"
        />
        <q-select
          style="width: 90px"
          v-model="localState.esNum"
          dense
          label="Num of E/S"
          :options="[1,2,3,4]"
        />
      </div>
      <div class="row justify-between q-mt-md">
        <span>
          <q-input
            v-model="localState.dsp.ip"
            label="DSP IpAddress"
            dense
            type="url"
          />
        </span>
        <span>
          <q-input
            v-model="localState.dsp.port"
            label="Port"
            dense
            type="number"
          />
        </span>
      </div>
      <div class="row justify-between q-mt-md">
        <span>
          <q-input
            v-model="localState.pagecontrol.ip"
            label="PageControl IpAddress"
            dense
            type="url"
          />
        </span>
        <span>
          <q-input
            v-model="localState.pagecontrol.port"
            label="Port"
            dense
            type="number"
          />
        </span>
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
import strToHex from '../../mixins/strToHex'

export default {
  props: ['selectedLocal'],
  mixins: [strToHex],
  computed: {
    ...mapState({
      locals: state => state.zones.locals,
      selected: state => state.zones.selected
    })
  },
  data () {
    return {
      localState: {
        _id: null,
        id: null,
        name: '',
        code: '',
        es: null,
        esNum: 1,
        dsp: { ip: '', port: 1023 },
        pagecontrol: { ip: '', port: 8888 }
      }
    }
  },
  mounted () {
    this.localState.id = this.selectedLocal
    this.localState._id = this.locals[this.selectedLocal - 1]._id
    this.localState.name = this.locals[this.selectedLocal - 1].name
    this.localState.code = this.locals[this.selectedLocal - 1].code
    this.localState.es = this.locals[this.selectedLocal - 1].es
    this.localState.esNum = this.locals[this.selectedLocal - 1].esNum
    if (this.locals[this.selectedLocal - 1].dsp) {
      this.localState.dsp = this.locals[this.selectedLocal - 1].dsp
    }
    if (this.locals[this.selectedLocal - 1].pagecontrol) {
      this.localState.pagecontrol = this.locals[this.selectedLocal - 1].pagecontrol
    }
  },
  methods: {
    checkCode () {
      this.localState.code = this.encodeUTF16(this.localState.name)
    },
    submit () {
      this.$store.dispatch('zones/updateLocalName', this.localState)
    }
  }
}
</script>

<style>

</style>

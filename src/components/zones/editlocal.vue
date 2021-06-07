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
        code: ''
      }
    }
  },
  mounted () {
    this.localState._id = this.locals[this.selectedLocal - 1]._id
    this.localState.id = this.selectedLocal
    this.localState.name = this.locals[this.selectedLocal - 1].name
    this.localState.code = this.locals[this.selectedLocal - 1].code
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

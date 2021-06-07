<template>
  <q-card style="width: 400px">
    <q-card-section>
      <div class="text-h6">
        지역 이름 수정
      </div>
    </q-card-section>

    <q-card-section class="q-mx-sm">
      <div class="fit row no-wrap justify-between">
        <div class="col-7">
          <q-input
            v-model="zoneState.name"
            label="Zone Name"
            :hint="zoneState.code"
            color="teal-14"
            @keyup="checkCode"
            @blur="checkCode"
          />
        </div>
        <div class="col-3">
          <q-select
            v-model="zoneState.type"
            label="Type"
            :options="options"
            color="teal-14"
          />
        </div>
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
  props: ['selectedZone'],
  computed: {
    ...mapState({
      locals: state => state.zones.locals,
      zones: state => state.zones.zones,
      selected: state => state.zones.selected
    })
  },
  data () {
    return {
      zoneState: {
        id: null,
        name: '',
        code: '',
        type: 'zone'
      },
      options: ['zone', 'e/s']
    }
  },
  mounted () {
    this.zoneState.id = this.selectedZone
    this.zoneState.name = this.zones[this.selectedZone].name
    this.zoneState.code = this.zones[this.selectedZone].code
    this.zoneState.type = this.zones[this.selectedZone].type
  },
  methods: {
    checkCode () {
      this.zoneState.code = this.encodeUTF16(this.zoneState.name)
    },
    submit () {
      this.$store.dispatch('zones/updateZoneName', this.zoneState)
    }
  }
}
</script>

<style>

</style>

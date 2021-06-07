<template>
  <q-card style="width: 600px">
    <q-card-section class="q-pb-sm">
      <div class="row items-center">
        <div class="text-h6">
          방송 구간 추가
        </div>
        <q-space />
        <q-btn round flat icon="add_circle_outline" @click="addItem"></q-btn>
      </div>
    </q-card-section>
    <q-card-section class="q-py-sm">
      <q-scroll-area ref="scrollArea" style="height: 300px;">
        <q-list v-if="addZones">
          <q-item
            v-for="(zone, idx) in addZones"
            :key="zone.id"
            class="q-py-none"
            dense
          >
            <q-item-section avatar>
              <q-avatar
                color="teal-14"
                text-color="white"
                size="30px"
              >
                {{ zone.id + 1 }}
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <div class="fit row no-wrap justify-between">
                <div class="col-7">
                  <q-input
                    v-model="addZones[idx].name"
                    label="Zone Name"
                    :hint="addZones[idx].code"
                    color="teal-14"
                    dense
                    @keyup="checkCode(idx)"
                    @blur="checkCode(idx)"
                  />
                </div>
                <div class="col-3">
                  <q-select
                    v-model="addZones[idx].type"
                    label="Type"
                    :options="options"
                    color="teal-14"
                    dense
                  />
                </div>
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
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
  props: ['selectedzone'],
  computed: {
    ...mapState({
      locals: state => state.zones.locals,
      zones: state => state.zones.zones,
      selected: state => state.zones.selected
    })
  },
  data () {
    return {
      addZones: [],
      options: ['zone', 'e/s']
    }
  },
  mounted () {
    //
  },
  methods: {
    addItem () {
      let id
      if (this.addZones.length === 0) {
        id = this.zones.length
      } else {
        id = this.addZones[this.addZones.length - 1].id + 1
      }
      this.addZones.push({
        id: id,
        name: '',
        code: '',
        type: 'zone'
      })
    },
    checkCode (idx) {
      this.addZones[idx].code = this.encodeUTF16(this.addZones[idx].name)
    },
    submit () {
      this.$store.dispatch('zones/addZones', this.addZones)
    }
  }
}
</script>

<style scoped>

</style>

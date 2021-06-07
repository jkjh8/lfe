<template>
  <div>
    <q-card class="q-ma-sm">
      <q-card-section class="q-mt-sm q-pb-none q-pt-sm">
        <q-tabs
          v-model="tab"
          dense
          class="text-blue-grey-4"
          active-color="grey-10"
          indicator-color="teal-14"
          content-class="fit row no-wrap"
          align="justify"
        >
          <q-tab name="zone">
            <div class="row items-center">
              <div>방송구간</div>
              <q-btn
                class="absolute-rignt"
                flat
                round
                @click.prevent.stop="zone = true"
              >
                <q-icon name="add_circle_outline" />
              </q-btn>
            </div>
          </q-tab>
          <q-tab name="relay">
            <div class="row items-center">
              <div>릴레이</div>
              <q-btn
                flat
                round
                @click.prevent.stop="relay = true"
              >
                <q-icon name="add_circle_outline" />
              </q-btn>
            </div>
          </q-tab>
        </q-tabs>
      </q-card-section>

      <q-separator />

      <q-card-section class="q-py-none">
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="zone" class="q-pa-none">
            <ZonesDetail />
          </q-tab-panel>

          <q-tab-panel name="relay" class="q-pa-none">
            <RelaysDetail />
          </q-tab-panel>
        </q-tab-panels>
      </q-card-section>

      <q-dialog v-model="zone">
        <AddZones />
      </q-dialog>

      <q-dialog v-model="relay">
        <AddRelays />
      </q-dialog>
    </q-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ZonesDetail from './zone/zonesDetail'
import RelaysDetail from './relay/relaysDetail'
import AddZones from './zone/addZones'
import AddRelays from './relay/addRelays'

export default {
  components: { ZonesDetail, RelaysDetail, AddZones, AddRelays },
  computed: {
    ...mapState({
      locals: state => state.zones.locals,
      zones: state => state.zones.zones,
      relays: state => state.zones.relays,
      selected: state => state.zones.selected
    })
  },
  data () {
    return {
      tab: 'zone',
      zone: false,
      relay: false,
      editValue: ''
    }
  },
  methods: {
    //
  }
}
</script>

<style>

</style>

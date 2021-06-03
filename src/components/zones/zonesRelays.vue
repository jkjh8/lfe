<template>
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
            <div>방송구간</div>
            <q-btn
              class="absolute-rignt"
              flat
              round
              @click.prevent.stop=""
            >
              <q-icon name="add_circle_outline" />
            </q-btn>
        </q-tab>
        <q-tab name="relay">
          <div class="row items-center">
            <div>릴레이</div>
            <q-btn
              flat
              round
              @click.prevent.stop=""
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
  </q-card>
</template>

<script>
import { mapState } from 'vuex'
import ZonesDetail from './zonesDetail'
import RelaysDetail from './relaysDetail'

export default {
  components: { ZonesDetail, RelaysDetail },
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
      editValue: ''
    }
  },
  methods: {
    get () {
      this.$axios.get('/zones/get').then(res => {
        console.log(res.data.locals)
        this.$store.commit('zones/updateLocals', res.data.locals)
      })
    },
    edit (mode, id, value) {
      console.log(mode, id, value)
      this.$q.dialog({
        title: '수정',
        message: `${this.locals[id - 1].name} ${mode} ${value.id}`,
        prompt: {
          model: value.name,
          type: 'text' // optional
        },
        cancel: true,
        persistent: true
      }).onOk(data => {
        console.log('>>>> OK, received', data)
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    }
  }
}
</script>

<style>

</style>

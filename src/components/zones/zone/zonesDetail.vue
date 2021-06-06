<template>
  <div>
    <q-scroll-area ref="scrollArea" style="height: 600px;">
      <q-list>
        <q-item
          v-for="(zone, idx) in zones"
          :key="zone.id"
        >
          <q-item-section avatar>
            <q-avatar color="light-blue-6" text-color="white" size="30px">
              {{ zone.id + 1 }}
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ zone.name }}</q-item-label>
            <q-item-label caption>{{ zone.code }}</q-item-label>
          </q-item-section>

          <q-item-section side>
            <div class="row">
              <q-btn
                flat
                round
                size="sm"
                @click="setEdit(idx)"
              >
                <q-icon name="edit" />
              </q-btn>
              <q-btn
                flat
                round
                size="sm"
                @click="setDelete(idx)"
              >
                <q-icon name="delete" />
              </q-btn>
            </div>
          </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
    <q-dialog v-model="edit">
      <EditZone :selectedZone="selectedZone" />
    </q-dialog>
    <q-dialog v-model="del">
      <DeleteZone :selectedZone="selectedZone" />
    </q-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import EditZone from './editZone.vue'
import DeleteZone from './deleteZone.vue'

export default {
  components: { EditZone, DeleteZone },
  computed: {
    ...mapState({
      locals: state => state.zones.locals,
      zones: state => state.zones.zones,
      selected: state => state.zones.selected
    })
  },
  data () {
    return {
      edit: false,
      del: false,
      selectedZone: null
    }
  },
  methods: {
    setEdit (id) {
      this.selectedZone = id
      this.edit = true
    },
    setDelete (id) {
      this.selectedZone = id
      this.del = true
    }
  }
}
</script>

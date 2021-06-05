<template>
  <div>
    <q-scroll-area ref="scrollArea" style="height: 600px;">
      <q-list>
        <q-item
          v-for="(relay, idx) in relays"
          :key="relay.id"
        >
          <q-item-section avatar>
            <q-avatar color="light-green-6" text-color="white" size="30px">
              {{ relay.id + 1 }}
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ relay.name }}</q-item-label>
            <q-item-label caption>{{ relay.code }}</q-item-label>
          </q-item-section>

          <q-item-section side>
            <div class="row">
              <q-btn
                flat
                round
                size="sm"
                @click="setNameEdit(idx)"
              >
                <q-icon name="edit" />
              </q-btn>
              <q-btn
                flat
                round
                size="sm"
                @click="deleteRelay(idx)"
              >
                <q-icon name="delete" />
              </q-btn>
            </div>
          </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
    <q-dialog v-model="nameEdit">
      <RelayNameEdit :selectedRelay="selectedRelay" @close="nameEdit = false"/>
    </q-dialog>
    <q-dialog v-model="delRelay">
      <DeleteRelay :selectedRelay="selectedRelay" />
    </q-dialog>
  </div>
</template>

<script>
import RelayNameEdit from './relayNameEdit'
import DeleteRelay from './deleteRelay'
import { mapState } from 'vuex'

export default {
  components: { RelayNameEdit, DeleteRelay },
  computed: {
    ...mapState({
      locals: state => state.zones.locals,
      relays: state => state.zones.relays,
      selected: state => state.zones.selected
    })
  },
  data () {
    return {
      nameEdit: false,
      delRelay: false,
      selectedRelay: null
    }
  },
  methods: {
    setNameEdit (id) {
      this.selectedRelay = id
      this.nameEdit = true
    },
    deleteRelay (id) {
      this.selectedRelay = id
      this.delRelay = true
    }
  }
}
</script>

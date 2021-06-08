<template>
  <div>
    <q-card class="q-ma-sm">
      <!-- 제목 라인 -->
      <q-card-section class="q-py-sm">
        <div class="row items-center">
          <div class="text-subtitle1">지점</div>
          <q-space />
          <div>
            <q-btn
              round
              flat
              size="md"
              class="q-pa-none"
              @click="add = true"
            >
              <q-icon name="add_circle_outline" />
            </q-btn>
          </div>
        </div>
      </q-card-section>
      <q-separator />
      <!-- 리스트 시작 -->
      <q-card-section class="q-pa-none">
        <q-scroll-area ref="scrollArea" style="height: 600px;">
          <q-list>
            <q-item
              v-for="local in locals"
              :key="local.id"
              clickable
              v-ripple
              :active="local.id === selected"
              @click="$store.commit('zones/updateSelected', local.id)"
              active-class="zone-active-link"
            >
              <q-item-section avatar>
                <q-avatar color="teal-14" text-color="white" size="30px">
                  {{ local.id }}
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ local.name }}</q-item-label>
                <q-item-label caption>{{ local.code }}</q-item-label>
              </q-item-section>

              <q-item-section side>
                <div class="row">
                  <q-btn
                    flat
                    round
                    size="sm"
                    @click.prevent.stop="$store.dispatch('zones/refresh', local.id)"
                  >
                    <q-icon name="refresh" />
                  </q-btn>
                  <q-btn
                    flat
                    round
                    size="sm"
                    @click.prevent.stop="editLocal(local.id)"
                  >
                    <q-icon name="edit" />
                  </q-btn>
                  <q-btn
                    flat
                    round
                    size="sm"
                    @click.prevent.stop="deleteLocal(local.id)"
                  >
                    <q-icon name="delete" />
                  </q-btn>
                </div>
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </q-card-section>
    </q-card>

    <q-dialog v-model="add">
      <AddLocals />
    </q-dialog>

    <q-dialog v-model="edit">
      <EditLocal :selectedLocal="selectedLocal" />
    </q-dialog>

    <q-dialog v-model="del">
      <DeleteLocal :selectedLocal="selectedLocal" />
    </q-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import EditLocal from './editlocal.vue'
import DeleteLocal from './deleteLocal.vue'
import AddLocals from './addLocals.vue'

export default {
  components: { AddLocals, EditLocal, DeleteLocal },
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
      add: false,
      edit: false,
      del: false,
      selectedLocal: null
    }
  },
  methods: {
    editLocal (id) {
      this.selectedLocal = id
      this.edit = true
    },
    deleteLocal (id) {
      this.selectedLocal = id
      this.del = true
    }
  }
}
</script>

<style>
.zone-active-link {
  color: white;
  background: rgb(145, 165, 165);
}
</style>

<template>
  <q-page>
    <q-card class="q-mx-sm" flat>
      <q-card-section class="q-py-xs">
        <div class="fit row">
          <div>
            <div class="row flex flex-center">
              <div
                class="text-h6 text-weight-bold"
              >
                이벤트 로그
              </div>
              <q-btn flat>
                <q-icon name="settings" />
              </q-btn>
            </div>
            <div
              class="text-caption"
            >
              총 {{ pages.totalDocs }}개의 이벤트 로그
            </div>
          </div>
          <q-space />
          <div class="self-center">
            <div class="row">
              <q-input
                v-model="search"
                outlined
                dense
                clearable
                color="teal-14"
                hide-bottom-space
              ></q-input>
              <q-btn
                class="q-ml-xs"
                unelevated
                color="teal-14"
              >
                검색
              </q-btn>
            </div>
          </div>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <q-table
          :columns="columns"
          :data="logs.items"
          :loading="loading"
          hide-pagination
          ref="table"
        >
          <template v-slot:body-cell-date="props">
            <q-td :props="props">
              <div>
                {{ timeFormat(props.value) }}
              </div>
            </q-td>
          </template>
        </q-table>
        <q-pagination
          v-model="current"
          class="flex flex-center q-mt-md"
          color="grey-10"
          active-color="teal-14"
          size="sm"
          :loading="loading"
          :pagination="pagination"
          :max="pages.totalPages"
          :max-pages="10"
          direction-links
          boundary-links
          icon-first="skip_previous"
          icon-last="skip_next"
          icon-prev="fast_rewind"
          icon-next="fast_forward"
          @input="changePage"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import moment from 'moment'
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      pages: state => state.eventlog.pages,
      logs: state => state.eventlog.logs
    })
  },
  data () {
    return {
      columns: [
        { name: 'date', align: 'center', label: 'Date', field: 'date', sortable: true },
        { name: 'Source', align: 'center', label: 'Source', field: 'source', sortable: true },
        { name: 'Category', align: 'center', label: 'Category', field: 'category', sortable: true },
        { name: 'Priority', align: 'center', label: 'Priority', field: 'priority', sortable: true },
        { name: 'Zones', align: 'center', label: 'zones', field: 'zones', sortable: true },
        { name: 'Message', align: 'center', label: 'Message', field: 'message', sortable: true }
      ],
      search: '',
      current: 1,
      maxPage: 100,
      loading: false,
      pagination: {
        sortBy: 'date',
        descending: false,
        page: 1,
        rowsPerPage: 10
      }
    }
  },
  mounted () {
    this.getlog()
  },
  methods: {
    getlog () {
      this.loading = true
      let query = `page=${this.pages.page}`
      query = query + `&limit=${this.pages.limit}`
      query = query + `&search=${this.logs.search}`
      query = query + `&zones=${this.logs.zones}`

      this.$axios.get(`/log/get?${query}`).then((res) => {
        console.log(res.data)
        this.$store.commit('eventlog/updateDocs', res.data)
        // this.$store.commit('eventlog/updatelimit', res.data.limit)
        // this.$store.commit('eventlog/updateTotalPage', res.data.totalPages)
        this.$refs.table.setPagination({ rowsPerPage: res.data.limit })
        this.loading = false
      }).catch((error) => {
        console.log(error)
        this.loading = false
      })
    },
    async changePage (page) {
      console.log(page)
      await this.$store.commit('eventlog/updatePage', page)
      this.getlog()
    },
    timeFormat (time) {
      return moment(time).format('YY-MM-DD hh:mm:ss a')
    }
  }
}
</script>

<style>

</style>

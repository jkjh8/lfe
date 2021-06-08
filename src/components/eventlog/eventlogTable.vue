<template>
  <div>
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
      :loading="logs.loading"
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
  </div>
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
      page: 1,
      pagination: {
        sortBy: 'date',
        descending: false,
        page: 1,
        rowsPerPage: 10
      }
    }
  },
  mounted () {
    this.$refs.table.setPagination({ rowsPerPage: this.pages.limit })
    this.$store.dispatch('eventlog/getLog')
    this.$root.$on('changePage', (page) => {
      this.current = Number(page)
      console.log(page)
      this.$store.commit('eventlog/updatePage', page)
      this.$store.dispatch('eventlog/getLog')
    })
    this.$root.$on('changeLimit', () => {
      this.$refs.table.setPagination({ rowsPerPage: this.pages.limit })
    })
  },
  methods: {
    async changePage (page) {
      // this.current = Number(page)
      await this.$store.commit('eventlog/updatePage', page)
      this.$store.dispatch('eventlog/getLog')
    },
    timeFormat (time) {
      return moment(time).format('YY-MM-DD hh:mm:ss a')
    }
  }
}
</script>

<style>

</style>

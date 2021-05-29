<template>
  <q-page>
    <q-card class="q-mx-sm">
      <q-card-section>
        <div>이벤트 로그</div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <q-table
          :columns="columns"
          :data="logs.items"
          hide-pagination
          ref="table"
        ></q-table>
        <q-pagination
          v-model="current"
          class="flex flex-center q-mt-md"
          color="grey-10"
          active-color="teal-14"
          size="sm"
          :loading="loading"
          :pagination="pagination"
          :max="pages.totalPage"
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
      let query = `page=${this.pages.page}`
      query = query + `&limit=${this.pages.itemsPerPage}`
      query = query + `&search=${this.logs.search}`
      query = query + `&zones=${this.logs.zones}`
      console.log(query)
      this.$axios.get(`/log/get?${query}`).then((res) => {
        console.log(res.data)
        this.$store.commit('eventlog/updateLog', res.data.docs)
        this.$store.commit('eventlog/updatelimit', res.data.limit)
        this.$store.commit('eventlog/updateTotalPage', res.data.totalPages)
        this.$refs.table.setPagination({ rowsPerPage: res.data.limit })
        console.log(this.logs)
      })
    },
    async changePage (page) {
      console.log(page)
      await this.$store.commit('eventlog/updatePage', page)
      this.getlog()
    }
  }
}
</script>

<style>

</style>

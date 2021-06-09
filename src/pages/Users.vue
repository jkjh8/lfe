<template>
  <div>
    <q-card class="q-mx-sm" flat>
      <q-card-section class="q-py-xs">
        <div>
          <div class="text-h6 text-weight-bold">사용자 관리</div>
          <div class="text-caption">총 {{ usersCount }}명의 사용자</div>
        </div>
      </q-card-section>
    </q-card>

    <q-separator inset />
    <q-card-section class="q-pt-sm q-pb-none">
      <q-table
        :columns="columns"
        :data="users"
        row-key="id"
      >
        <template v-slot:body-cell-createAt="props">
          <q-td :props="props">
            <div>
              {{ timeFormat(props.value) }}
            </div>
          </q-td>
        </template>

        <template v-slot:body-cell-loginAt="props">
          <q-td :props="props">
            <div>
              {{ timeFormat(props.value) }}
            </div>
          </q-td>
        </template>

        <template v-slot:body-cell-level="props">
          <q-td :props="props">
            <q-select
              :options="levelOption"
              :value="props.value"
              dense
              borderless
              @input="levelUpdate(props.row)"
            ></q-select>
          </q-td>
        </template>

        <template v-slot:body-cell-admin="props">
          <q-td :props="props">
            <q-checkbox
              :value="props.value"
              color="teal-14"
              @input="adminUpdate(props.row)"
            />
          </q-td>
        </template>

        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn round size="sm" icon="delete" @click="deleteUser(props.row)" />
          </q-td>
        </template>
      </q-table>
    </q-card-section>
  </div>
</template>

<script>
import moment from 'moment'
import { mapState, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapState({
      users: state => state.user.users
    }),
    ...mapGetters({
      usersCount: 'user/usersCount'
    })
  },
  data () {
    return {
      columns: [
        { name: 'name', align: 'center', label: 'Name', field: 'name', sortable: true },
        { name: 'id', align: 'center', label: 'ID', field: 'id', sortable: true },
        { name: 'email', align: 'center', label: '이메일', field: 'email', sortable: true },
        { name: 'provider', align: 'center', label: '공급자', field: 'provider', sortable: true },
        { name: 'createAt', align: 'center', label: '가입일', field: 'createAt', sortable: true },
        { name: 'loginAt', align: 'center', label: '접속일', field: 'loginAt', sortable: true },
        { name: 'level', align: 'center', label: '등급', field: 'level', sortable: true },
        { name: 'admin', align: 'center', label: '관라자', field: 'admin', sortable: true },
        { name: 'actions', align: 'center', label: 'Actions', field: 'actions' }
      ],
      levelOption: [0, 1, 2, 3, 4, 5]
    }
  },
  mounted () {
    this.getUsers()
  },
  methods: {
    getUsers () {
      this.$axios.get('/auth/users').then((res) => {
        this.$store.commit('user/updateUsers', res.data.users)
        console.log(this.users)
      }).catch((err) => {
        if (err.response.status === 403) {
          console.log('권한이 없습니다.')
        }
      })
    },
    levelUpdate (idx) {
      console.log(idx)
    },
    deleteUser (idx) {
      console.log(idx)
    },
    adminUpdate (idx) {
      this.$axios.post('/auth/admin', idx).then((res) => {
        this.$store.commit('user/updateUsers', res.data.users)
      })
    },
    timeFormat (time) {
      return moment(time).format('YY-MM-DD hh:mm:ss a')
    }
  }
}
</script>

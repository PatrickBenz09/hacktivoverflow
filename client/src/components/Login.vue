<template>
  <div>
    <h4>Login</h4>
    <div class="row">
      <form class="col s12">
        <div class="row">
          <div class="input-field col s6">
            <input v-model="login.username" id="username" type="text" class="validate" required>
            <label for="first_name">Username</label>
          </div>
          <div class="input-field col s6">
            <input v-model="login.password" id="password" type="password" class="validate" required>
            <label for="first_name">Password</label>
          </div>
        </div>
        <div class="row">
          <button @click="loginUser" class="modal-action modal-close btn waves-effect waves-light" type="button" name="action">Submit
            <i class="material-icons right">send</i>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      login: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    emitEmitan () {
      this.$emit('user', localStorage.getItem('username'))
    },
    loginUser () {
      let self = this
      this.$http.post('http://localhost:3000/user/login', self.login)
      .then(resp => {
        console.log(resp)
        if (resp.data.token) {
          console.log('berhasillllllllll')
          console.log(resp.data)
          localStorage.setItem('token', resp.data.token)
          localStorage.setItem('id', resp.data.id)
          localStorage.setItem('username', resp.data.username)
          self.emitEmitan()
        } else {
          console.log('FAILUREEE')
          localStorage.clear()
        }
      })
      .catch(err => console.log(err))
    }
  }
}
</script>

<style lang="css">
</style>

<template>
  <div>
    <h4>Register</h4>
    <div class="row">
      <form class="col s12">
        <div class="row">
          <div class="input-field col s6">
            <input v-model="register.username" id="username" type="text" class="validate" required>
            <label for="username">Username</label>
          </div>
          <div class="input-field col s6">
            <input v-model="register.password" id="password" type="password" class="validate" required>
            <label for="password">Password</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s6">
            <input v-model="register.name" id="name" type="text" class="validate" required>
            <label for="first_name">Name</label>
          </div>
          <div class="input-field col s6">
            <input v-model="register.email" id="email" type="email" class="validate" required>
            <label for="email">E-Mail</label>
          </div>
        </div>
        <div class="row">
          <button @click="registerUser" class="modal-action modal-close btn waves-effect waves-light" type="button" name="action">Submit
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
      register: {
        username: '',
        password: '',
        name: '',
        email: ''
      }
    }
  },
  methods: {
    registerUser () {
      if (this.register.username === '' || this.register.password === '' || this.register.name === '' || this.register.email === '') {
        alert('Please fill the necessary form!')
      } else {
        let self = this
        this.$http.post('http://localhost:3000/user/register/', self.register)
        .then(resp => console.log(resp))
        .catch(err => console.log(err))
        alert('Successfully Created Account!')
      }
    }
  }
}
</script>

<style lang="css">
</style>

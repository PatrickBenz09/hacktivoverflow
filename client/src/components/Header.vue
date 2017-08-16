<template>
  <div>

    <nav>
      <div class="nav-wrapper indigo darken-3">
        <a href="#" class="brand-logo">Logo</a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <!-- Modal Trigger -->
          <li v-if="!user"><button class="waves-effect waves-light btn indigo darken-3 modal-trigger" data-target="modal1">Login / Register</button></li>
          <li v-else>
            <!-- Dropdown Trigger -->
            <a class='dropdown-button btn indigo darken-3' href='#' data-activates='dropdown1'>Halo {{ user }}</a>
            <!-- Dropdown Structure -->
            <ul id='dropdown1' class='dropdown-content'>
              <li><a href="#"><i class="material-icons">account_circle</i>{{ user }}'s Profile</a></li>
              <li class="divider"></li>
              <li><a @click="logout" href="#"><i class="material-icons">keyboard_return</i>Logout</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>

    <!-- Modal Structure -->
    <div id="modal1" class="modal">
      <div class="modal-content">
        <div v-if="onLogin">
          <Login @user="userChangeState"></Login>
        </div>
        <div v-else>
          <Register></Register>
        </div>
        <a v-if="onLogin" @click="onLogin = !onLogin" href="#">I don't have an account</a>
        <a v-else @click="onLogin = !onLogin" href="#">I have an account</a>
      </div>
      <div class="modal-footer">
        <a href="#" class="modal-action modal-close waves-effect waves-green btn-flat">Close</a>
      </div>
    </div>

  </div>
</template>

<script>
import Login from '@/components/Login'
import Register from '@/components/Register'

export default {
  props: ['user'],
  data () {
    return {
      onLogin: true,
      user: false
    }
  },
  methods: {
    userChangeState (payload) {
      this.user = payload
      this.$emit('user', payload)
    },
    logout () {
      // to remove specific //
      // localStorage.removeItem(key);

      // to remove all //
      localStorage.clear()
      this.userChangeState()
      this.user = false
    }
  },
  components: {
    Login,
    Register
  }
}
</script>

<style lang="css">
</style>

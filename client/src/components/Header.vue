<template>
  <div>

    <nav>
      <div class="nav-wrapper indigo darken-3">
        <img style="margin-top: 7px; height: 45px; width: 60px" src="https://cdn.sstatic.net/Sites/stackoverflow/company/img/logos/so/so-icon.svg?v=6e4af45f4d66" alt="stackoverflow logo">
        <a href="#" class="brand-logo">Hacktiv Overflow</a>
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
        <a v-if="onLogin" @click="onLogin = !onLogin" class="btn btn-small">I don't have an account</a>
        <a v-else @click="onLogin = !onLogin" class="btn btn-small">I have an account</a>
      </div>
      <div class="modal-footer">
        <a class="modal-action modal-close waves-effect waves-green btn-flat">Close</a>
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
.btn-small {
  height: 30px;
  line-height: 30px;
  padding: 0 0.5rem;
}
</style>

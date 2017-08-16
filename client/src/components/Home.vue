<template>
  <div id="body">
    <Header @user="changeUser" :user="user"></Header>
    <Main id="main" :user="user"></Main>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Main from '@/components/Main'
import Footer from '@/components/Footer'

export default {
  data () {
    return {
      user: localStorage.getItem('username')
    }
  },
  methods: {
    changeUser (payload) {
      this.user = payload
    }
  },
  components: {
    Header,
    Main,
    Footer
  }
}
</script>

<style lang="css">
  #body {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }

  #main {
    flex: 1 0 auto;
  }
</style>

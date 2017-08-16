<template>
  <div class="container">
    <div class="row" style="margin-top: 25px">
      <div class="col s8">
        <form>
          <div class="row">
            <div class="input-field col s12">
              <input v-model="title" id="title" type="text" class="validate" placeholder="Question Title">
            </div>
            <div class="input-field col s12">
              <textarea v-model="content" id="content" class="materialize-textarea" placeholder="Ask a Question.."></textarea>
            </div>
            <div class="right-align">
              <button v-if="user" @click="addQuestion" class="btn waves-effect waves-light" type="button" name="action">Submit
                <i class="material-icons right">send</i>
              </button>
              <button v-else class="btn waves-effect waves-light" type="button" name="action" disabled>Login First {{ user }}
                <i class="material-icons right">send</i>
              </button>
            </div>
          </div>
        </form>
        <router-view :questions="questions" :user="user"></router-view>
      </div>
      <div class="col s4">
        Side Profile
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['user'],
  data () {
    return {
      title: '',
      content: '',
      user: this.user,
      questions: []
    }
  },
  methods: {
    addQuestion () {
      console.log('hello')
      let self = this
      this.$http.post('http://localhost:3000/question/', {
        title: self.title,
        content: self.content
      }, {
        headers: {
          id: localStorage.getItem('id'),
          token: localStorage.getItem('token')
        }
      })
      .then(resp => self.questions.push(resp.data))
      .catch(err => console.log(err))
    }
  },
  mounted () {
    let self = this
    /*eslint-disable*/
    this.$http.get('http://localhost:3000/question/')
    .then(resp => {
      console.log(resp);
      self.questions = resp.data
    })
    .catch(err => console.log(err))
  }
}
</script>

<style lang="css">
</style>

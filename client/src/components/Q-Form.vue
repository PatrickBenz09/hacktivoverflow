<template>
  <div>
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
  </div>
</template>

<script>
export default {
  props: ['user'],
  data () {
    return {
      title: '',
      content: '',
      user: this.user
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
  }
}
</script>

<style lang="css">
</style>

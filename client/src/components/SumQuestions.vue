<template>
  <div>
    <!-- Modal Structure -->
    <div id="updateQuestion" class="modal">
      <form class="container">
        <h4 style="margin-top: 20px">Update Question</h4>
        <div class="row">
          <div class="input-field col s12">
            <input v-model="update.updateTitle" id="title" type="text" class="validate" placeholder="Question Title">
          </div>
          <div class="input-field col s12">
            <textarea v-model="update.updateContent" id="content" class="materialize-textarea" placeholder="Ask a Question.."></textarea>
          </div>
          <div class="right-align">
            <button v-if="user" @click="updateQuestion(update.updateId, update.updateIndex)" class="modal-action modal-close btn waves-effect waves-light" type="button" name="action">Submit
              <i class="material-icons right">send</i>
            </button>
            <button v-else class="btn waves-effect waves-light" type="button" name="action" disabled>Login First
              <i class="material-icons right">send</i>
            </button>
          </div>
        </div>
      </form>
    </div>
    <questionForm @addQuestion="addQuestion" :user="user"></questionForm>
    <div v-for="(question, index) in questions" class="row">
      <div class="col s12">
        <div class="card blue-grey darken-1">
          <div class="card-content white-text row" style="margin-bottom: -10px">
            <div class="col s1.5 center-align">
              <a @click="upvoteQuestion(question._id)" class="btn btn-floating grey pulse"><i class="material-icons">arrow_drop_up</i></a> <br>
              <h5 style="margin: 10px auto; color: #FFAB40">{{ question.upvotes.length - question.downvotes.length }}</h5>
              <a @click="downvoteQuestion(question._id)" class="btn btn-floating grey pulse"><i class="material-icons">arrow_drop_down</i></a> <br>
              <div style="color: #FFAB40">Vote</div>
            </div>
            <div class="col s1.5 center-align">
              <a class="btn btn-floating grey"><i class="material-icons"></i></a> <br>
              <h5 style="margin: 10px auto; color: #FFAB40">{{ question.answers.length }}</h5>
              <a class="btn btn-floating grey"><i class="material-icons"></i></a> <br>
              <div style="color: #FFAB40">Answer</div>
            </div>
            <div class="col s9">
              <span class="card-title">{{ question.title }}</span>
              <p>{{ question.content }}</p>
              <p class="blue-grey darken-1-text">Asked by {{ question.author.username }}</p>
            </div>
          </div>
          <div class="card-action">
            <router-link
            @click="emitEmitanQuestionIndex(index)"
            :id="question._id"
            :to="{ path: '/question' + '/' + question._id }"
            >Read More ></router-link>
            <div class="right-align">
              <a @click="deleteQuestion(question._id, index, question.author.username)" class="btn-floating btn waves-effect waves-light red"><i class="material-icons">delete</i></a>
              <a @click="update = { updateId: question._id, updateIndex: index, updateTitle: question.title, updateContent: question.content, authorName: question.author.username }" class="btn-floating btn waves-effect waves-light red modal-trigger" data-target="updateQuestion"><i class="material-icons">update</i></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import questionForm from '@/components/Q-Form'

export default {
  props: ['questions', 'user'],
  data () {
    return {
      vote: 0,
      update: {
        updateId: '',
        updateIndex: 0,
        updateTitle: '',
        updateContent: '',
        authorName: ''
      }
    }
  },
  methods: {
    // questionVote (upvotes, downvotes) {
    //   this.vote = upvotes - downvotes
    //   return this.vote
    // },
    upvoteQuestion (id, idx) {
      alert('Click Read More')
      // let self = this
      // self.$http.put(`http://localhost:3000/question/upvote/${id}`, {}, {
      //   headers: { id: localStorage.getItem('id') }
      // })
      // .then(resp => {
      //   self.questions[idx].upvotes.push({})
      // })
      // .catch(err => console.log(err))
    },
    downvoteQuestion (id, idx) {
      alert('Click Read More')
      // let self = this
      // self.$http.put(`http://localhost:3000/question/downvote/${id}`, {}, {
      //   headers: { id: localStorage.getItem('id') }
      // })
      // .then(resp => {
      //   self.questions[idx].downvotes.push({})
      // })
      // .catch(err => console.log(err))
    },
    addQuestion (payload) {
      payload.author = { username: localStorage.getItem('username') }
      console.log(payload)
      this.questions.push(payload)
    },
    deleteQuestion (id, idx, author) {
      let self = this
      if (author === localStorage.getItem('username')) {
        self.$http.delete(`http://localhost:3000/question/${id}`, {
          headers: { token: localStorage.getItem('token') }
        })
        .then(resp => {
          self.questions.splice(idx, 1)
        })
        .catch(err => console.log(err))
      } else {
        alert('This is not your Question!')
      }
    },
    updateQuestion (id, idx) {
      let self = this
      if (self.update.authorName === localStorage.getItem('username')) {
        self.$http.put(`http://localhost:3000/question/${id}`, {
          title: self.update.updateTitle,
          content: self.update.updateContent
        }, {
          headers: { token: localStorage.getItem('token') }
        })
        .then(resp => {
          self.questions[idx].title = self.update.updateTitle
          self.questions[idx].content = self.update.updateContent
        })
        .catch(err => console.log(err))
      } else {
        alert('This is not your Question!')
      }
    },
    emitEmitanQuestionIndex (idx) {
      console.log(idx)
      this.$emit('questionIndex', idx)
    }
  },
  components: {
    questionForm
  }
}
</script>

<style lang="css">
</style>

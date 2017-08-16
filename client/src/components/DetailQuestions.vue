<template>
  <div>
    <div class="row">
      <div class="col s12">
        <div class="card blue-grey darken-1">
          <div class="card-content white-text row">
            <div class="col s4">
              <a class="btn btn-floating pulse" @click="upvoteQuestion(question._id)"><i class="material-icons">arrow_drop_up</i></a> <br>
              <div>{{ question.upvotes.length - question.downvotes.length }}</div>
              <a class="btn btn-floating pulse" @click="downvoteQuestion(question._id)"><i class="material-icons">arrow_drop_down</i></a> <br>
              <div style="margin-left: 7px; margin-top: 7px; color: #ffab40">Vote</div>
            </div>
            <div class="col s8">
              <span class="card-title">{{ question.title }}</span>
              <p>{{ question.content }}</p>
              <p class="blue-grey darken-1-text">Asked by {{ question.author.username }}</p>
            </div>
          </div>
          <div class="card-action">
            <!-- <div>Hay {{ $route.params.id }} ~~ {{ id }}</div> -->
            <router-link :to="{ path: '/' }">Go Back</router-link>
            <div class="right-align">
            </div>
            <!-- <ul class="collapsible" data-collapsible="accordion"> -->
              <!-- <li> -->
                <!-- <div class="collapsible-header"><i class="material-icons">filter_drama</i>Add Answer</div> -->
                <!-- <div class="collapsible-body"> -->
                  <div class="row">
                    <div class="input-field col s6">
                      <input v-model="answerForm.content" id="answer" type="text" class="validate" required>
                      <label for="answer">Input your answer..</label>
                      <button v-if="user" @click="addAnswer" class="btn waves-effect waves-light" type="button" name="action">Submit
                        <i class="material-icons right">send</i>
                      </button>
                      <button v-else class="btn waves-effect waves-light" type="button" name="action" disabled>Login First {{ user }}
                        <i class="material-icons right">send</i>
                      </button>
                    </div>
                  </div>
                <!-- </div> -->
              <!-- </li> -->
            <!-- </ul> -->
            <div class="">
              <ul v-for="answer in answers" class="collection">
                <li class="collection-item avatar">
                  <span class="title">{{ answer.author.username }}'s answer</span>
                  <p>{{ answer.content }}
                    <!-- <br> -->
                  </p>
                  <!-- <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a> -->
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // props: ['id', 'user'],
  props: {
    id: { type: String },
    user: { type: String }
  },
  data () {
    return {
      question: '',
      answerForm: {
        content: ''
      },
      answers: []
    }
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      let self = this
      /*eslint-disable*/
      this.$http.get(`http://localhost:3000/question/${ self.id }`)
      .then(resp => {
        console.log(resp.data);
        self.question = resp.data
      })
      .catch(err => console.log(err))
    },
    upvoteQuestion (id, idx) {
      let self = this
      self.$http.put(`http://localhost:3000/question/upvote/${id}`, {}, {
        headers: { id: localStorage.getItem('id') }
      })
      .then(resp => {
        // self.question.upvotes.push({})
      })
      .catch(err => console.log(err))
    },
    downvoteQuestion (id, idx) {
      let self = this
      self.$http.put(`http://localhost:3000/question/downvote/${id}`, {}, {
        headers: { id: localStorage.getItem('id') }
      })
      .then(resp => {
        console.log(self.question)
        // self.question.downvotes.push({})
      })
      .catch(err => console.log(err))
    },
    addAnswer () {
      let self = this
      this.$http.post(`http://localhost:3000/question/${ self.id }`, self.answerForm, {
        headers: {
          id: localStorage.getItem('id'),
          token: localStorage.getItem('token')
        }
      })
      .then(resp => {
        console.log(resp);
        let newAnswer = {
          content: self.answerForm.content,
          author: { username: localStorage.getItem('username') }
        }
        self.answers.push(newAnswer)
      })
      .catch(err => console.log(err))
    }
  },
  mounted () {
    let self = this
    self.fetchData()
    self.$http.get(`http://localhost:3000/question/${ self.id }/answer/`)
    .then(resp => self.answers = resp.data)
    .catch(err => console.log(err))
  }
}
</script>

<style lang="css">
</style>

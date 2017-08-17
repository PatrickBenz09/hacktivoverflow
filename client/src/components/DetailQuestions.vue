<template>
  <div>
    <div class="row">
      <div class="col s12">
        <div class="card blue-grey darken-1">
          <div class="card-content white-text row" style="margin-bottom: -10px">
            <div class="col s3 center-align">
              <a @click="upvoteQuestion(question._id)" class="btn btn-floating pulse"><i class="material-icons">arrow_drop_up</i></a> <br>
              <h5 @click="emitEmitanQuestionData" class="modal-trigger" data-target="votes" style="margin: 10px auto; color: #FFAB40">{{ question.upvotes.length - question.downvotes.length }}</h5>
              <a @click="downvoteQuestion(question._id)" class="btn btn-floating pulse"><i class="material-icons">arrow_drop_down</i></a> <br>
              <div @click="emitEmitanQuestionData" class="waves-effect waves-light hoverable modal-trigger" data-target="votes" style="margin-top: 10px">
                <a style="margin-right: 5px"><span style="color: #FFAB40">{{ question.upvotes.length }}</span> <i class="material-icons">thumb_up</i></a>
                <a style="margin-left: 5px"><span style="color: #FFAB40">{{ question.downvotes.length }}</span> <i class="material-icons" style="color: red">thumb_down</i></a>
              </div>
            </div>
            <div class="col s9">
              <span class="card-title">{{ question.title }}</span>
              <p>{{ question.content }}</p>
              <p class="blue-grey darken-1-text">Asked by {{ question.author.username }}</p> <br>
              <div style="color: #9e9e9e">click the thumb to see who's upvoting / downvoting</div>
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
        if (resp.data.status === "upvote") {
          resp.data.currentUpvotes[resp.data.currentUpvotes.length - 1].username = localStorage.getItem('username')
          self.question.upvotes = resp.data.currentUpvotes
          self.question.downvotes = resp.data.currentDownvotes
        }
        else if (resp.data.status === "negateUpvote") {
          self.question.upvotes = resp.data.currentUpvotes
          self.question.downvotes = resp.data.currentDownvotes
        }
        else if (resp.data.status === "negateDownvoteThenUpvote") {
          resp.data.currentUpvotes[resp.data.currentUpvotes.length - 1].username = localStorage.getItem('username')
          self.question.upvotes = resp.data.currentUpvotes
          self.question.downvotes = resp.data.currentDownvotes
        }
      })
      .catch(err => console.log(err))
    },
    downvoteQuestion (id, idx) {
      let self = this
      self.$http.put(`http://localhost:3000/question/downvote/${id}`, {}, {
        headers: { id: localStorage.getItem('id') }
      })
      .then(resp => {
        if (resp.data.status === "downvote") {
          resp.data.currentDownvotes[resp.data.currentDownvotes.length - 1].username = localStorage.getItem('username')
          self.question.downvotes = resp.data.currentDownvotes
          self.question.upvotes = resp.data.currentUpvotes
        }
        else if (resp.data.status === "negateDownvote") {
          self.question.downvotes = resp.data.currentDownvotes
          self.question.upvotes = resp.data.currentUpvotes
        }
        else if (resp.data.status === "negateUpvoteThenDownvote") {
          resp.data.currentDownvotes[resp.data.currentDownvotes.length - 1].username = localStorage.getItem('username')
          self.question.downvotes = resp.data.currentDownvotes
          self.question.upvotes = resp.data.currentUpvotes
        }
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
    },
    emitEmitanQuestionData () {
      this.$emit('questionData', this.question)
    }
  },
  mounted () {
    let self = this
    self.fetchData()
    self.emitEmitanQuestionData()
    self.$http.get(`http://localhost:3000/question/${ self.id }/answer/`)
    .then(resp => self.answers = resp.data)
    .catch(err => console.log(err))
  }
}
</script>

<style lang="css">
</style>

<template>
  <div>
    <questionForm :user="user"></questionForm>
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
      vote: 0
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

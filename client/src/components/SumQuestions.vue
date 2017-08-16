<template>
  <div>
    <div v-for="(question, index) in questions" class="row">
      <div class="col s12">
        <div class="card blue-grey darken-1">
          <div class="card-content white-text row" style="margin-bottom: -10px">
            <div class="col s4">
              <a class="btn btn-floating pulse" @click="upvoteQuestion(question._id, index)"><i class="material-icons">arrow_drop_up</i></a> <br>
              <div>{{ question.upvotes.length - question.downvotes.length }}</div>
              <a class="btn btn-floating pulse" @click="downvoteQuestion(question._id, index)"><i class="material-icons">arrow_drop_down</i></a> <br>
              <div style="margin-left: 7px; margin-top: 7px; color: #ffab40">Vote</div>
            </div>
            <div class="col s8">
              <span class="card-title">{{ question.title }}</span>
              <p>{{ question.content }}</p>
              <p class="blue-grey darken-1-text">Asked by {{ question.author.username }}</p>
            </div>
          </div>
          <div class="card-action">
            <router-link
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
export default {
  props: ['questions'],
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
      alert('GAK BOLEH AH!!!')
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
      alert('GAK BOLEH AH!!!')
      // let self = this
      // self.$http.put(`http://localhost:3000/question/downvote/${id}`, {}, {
      //   headers: { id: localStorage.getItem('id') }
      // })
      // .then(resp => {
      //   self.questions[idx].downvotes.push({})
      // })
      // .catch(err => console.log(err))
    }
  }
}
</script>

<style lang="css">
</style>

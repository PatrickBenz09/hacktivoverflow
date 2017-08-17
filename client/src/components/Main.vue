<template>
  <div class="container">
    <div class="row" style="margin-top: 25px">
      <div class="col s12">
        <router-view @questionIndex="questionIndex" @questionData="questionData" :questions="questions" :user="user"></router-view>
      </div>
      <!-- <div class="col s4">
        Side Profile
      </div> -->
    </div>

    <!-- Modal Structure -->
    <div id="votes" class="modal">
      <div class="modal-content">
        <h4>Upvotes & Downvote</h4>
        <div class="row">
          <div class="col s6">
            <h5>Upvotes</h5>
            <ul>
              <li v-for="upvote in question.upvotes">- <b style="color: blue">{{ upvote.username }}</b></li>
            </ul>
          </div>
          <div class="col s6">
            <h5>Downvote</h5>
            <ul>
              <li v-for="downvote in question.downvotes">- <b style="color: red">{{ downvote.username }}</b></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <a class=" modal-action modal-close waves-effect waves-green btn-flat">Close</a>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  props: ['user'],
  data () {
    return {
      questions: [],
      question: '',
      questionIndex: 0
    }
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      let self = this
      /*eslint-disable*/
      this.$http.get('http://localhost:3000/question/')
      .then(resp => {
        console.log(resp)
        self.questions = resp.data
      })
      .catch(err => console.log(err))
    },
    questionIndex (payloadz) {
      console.log('hayyyyyy')
      alert(payloadz)
      this.questionIndex = payloadz
    },
    questionData (payload) {
      this.question = payload
    }
  },
  mounted () {
    this.fetchData()
  }
}
</script>

<style lang="css">
</style>

<template>
  <div class="test-survey-builder">
    <h2>This is TestSurveyBuilder component</h2>
    <QuestionsView :questions="questionsList" />
    <div>This is between list and add edit</div>
    <div v-if="addQuestion">
      <surveyBuilder :options="sampleQuestion" />
    </div>
    <div class="pt-10">
      <button type="button" class="add_another_btn br-25" v-on:click="addNewQuestion()">Add question</button>
    </div>
    <h2>This is TestSurveyBuilder component</h2>
  </div>
</template>

<script>
import surveyBuilder from './SurveyBuilder';
import QuestionsView from './QuestionsView';
import sampleQuestionObj from './survey-builder.json';

export default {
  name: 'TestSurveyBuilder',
  data() {
    return {
      questionsList: [],
      addQuestion: false,
    };
  },
  mounted() {
    this.$root.$on('send', obj => {
      this.updateQuestionsList(obj);
      this.addQuestion = false;
    });
  },
  components: { surveyBuilder, QuestionsView },
  methods: {
    updateQuestionsList(obj) {
      this.questionsList.push(JSON.parse(JSON.stringify(obj.question)));
    },
    addNewQuestion() {
      this.sampleQuestion = JSON.parse(JSON.stringify(sampleQuestionObj));
      this.addQuestion = true;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.add_another_btn {
  font-size: 14px;
  background-color: transparent;
  border-color: #4c8ce4;
  color: #4c8ce4;
  padding: 8px;
}
</style>

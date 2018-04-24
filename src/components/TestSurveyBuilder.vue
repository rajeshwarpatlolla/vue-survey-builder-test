<template>
  <div class="test-survey-builder">
    <h2>This is TestSurveyBuilder component</h2>
    <QuestionsView :questions="questionsList" />
    <div>This is between list and add edit</div>
    <surveyBuilder/>
    <h2>This is TestSurveyBuilder component</h2>
  </div>
</template>

<script>
import surveyBuilder from './SurveyBuilder';
import QuestionsView from './QuestionsView';

export default {
  name: 'TestSurveyBuilder',
  data() {
    return {
      questionsList: [],
    };
  },
  mounted() {
    this.$root.$on('send', obj => {
      this.updateQuestionsList(obj);
    });
  },
  components: { surveyBuilder, QuestionsView },
  methods: {
    updateQuestionsList(obj) {
      window.console.log(obj);
      this.questionsList.push(JSON.parse(JSON.stringify(obj.question)));
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

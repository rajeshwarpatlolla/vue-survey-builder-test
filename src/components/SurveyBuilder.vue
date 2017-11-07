<template>
  <div class="sb-content">
    <h3>This is survey component</h3>
    <select class="form-control type_select" v-model="question.type" v-on:change="questionTypeChanged(question.type)">
      <option v-for="questionType in questionTypes" :value="questionType"
      :disabled="questionType.value === 'Default'" :selected="questionType.value === 'Default'">{{questionType.label}}</option>
    </select>

    <div class="" v-if="selectedType.value === 'singleChoice'">
      <h5>Answer choices</h5>
      <div class="row form-group" v-for="(option, index) in question.options">
        <div class="col-sm-10 p-0">
          <input type="text" class="form-control input-style" placeholder="Enter an answer choice" v-model="option.body">
        </div>
        <div class="col-sm-2 p-0">
          <button class="btn btn-link color_red" v-on:click="deleteQuestionOptionItem(question.options, index)" v-if="index > 1">Remove</button>
        </div>
      </div>
      <div class="add_another_answer"><a v-on:click="addAnotherAnswer()">Add another answer</a></div>

    </div>
    <div class="" v-if="selectedType.value === 'multiChoice'">
      Multi Choice question
    </div>
  </div>
</template>

<script>
  import surveyBuilderJson from './survey-builder.json';

  export default {
    name: 'add-edit-questions',
    data() {
      return {
        selectedType: { value: '', lebel: '' },
        question: { type: '' },
        questionTypes: [
          { value: 'default', label: '- Select a question type -' },
          { value: 'customScale', label: 'Custom Scale' },
          { value: 'dateTime', label: 'Date/Time' },
          { value: 'image', label: 'Image choice' },
          { value: 'singleChoice', label: 'Single Choice' },
          { value: 'multiChoice', label: 'Multiple Choice' },
          { value: 'number', label: 'Number' },
          { value: 'numberScale', label: 'Number Scale' },
          { value: 'text', label: 'Text' },
          { value: 'boolean', label: 'Yes or No' },
          // { value: 'Email', label: 'Email' },
          // { value: 'Location', label: 'Location' },
        ],
      };
    },
    props: ['options'],
    computed: {},
    watch: {},
    beforeCreate() { },
    created() { },
    beforeMount() { },
    mounted() {
      this.question = surveyBuilderJson;
      window.console.log(this.question);
    },
    beforeUpdate() { },
    updated() { },
    beforeDestroy() { },
    destroyed() { },
    methods: {

      /**
       * @param {Number} val1
       * @param {Number} val2
       * @return {null}
       */
      clicked(inputValue) {
        window.console.log('clicked and, now in side survey builder');
        this.$root.$emit('send', inputValue);
      },

      /**
       * @param {String} type
       * @return {null}
       */
      questionTypeChanged(type) {
        this.selectedType = type;
        window.console.log(this.selectedType);
      },

    },
  };

</script>

<style scoped lang="scss">
  .sb-content {
    border: 1px solid #aaa;
    padding: 20px;
  }
</style>

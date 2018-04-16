<template>
  <div class="row">
    <div v-for="(question, index) in questions" :key="index">
      <!-- <div v-if="selectedQuestion.id === question.id">
        <SurveyBuilder :options="selectedQuestion"></SurveyBuilder>
      </div> -->
      <div class="card read_only_question cursor_grab">
        <div class="row">
          <div class="col-md-9 p-0">
            <div class="question-section">
              <p class="question_color">Question
                <span class="">{{ index + 1 }}:</span>
              </p>
              <p class="question_body">{{question.body}}</p>
            </div>
            <div class="answer-section">
              <div class="option-section" v-if="question.type.toLowerCase() === 'boolean'">
                <div class="" v-for='(option, index) in question.options' :key="index">
                  <p class="radio-option">
                    <input type="radio" name="boolean_type" disabled>
                    <label>{{option.body}}</label>
                  </p>
                </div>
              </div>
              <div class="option-section pad-top20" v-if="question.type.toLowerCase() === 'numberscale'">
                <vue-slider v-if="!question.verticalScale" ref="slider" :value="question.minValue" :piecewise="true" direction="horizontal" class="horizontal-vue-slider" :min="question.minValue" :max="question.maxValue" :disabled="true"></vue-slider>
                <vue-slider v-if="question.verticalScale" ref="slider" :value="question.minValue" :piecewise="true" direction="vertical" class="vertical-vue-slider" width="2" :min="question.minValue" :max="question.maxValue" :disabled="true"></vue-slider>
              </div>
              <div class="option-section pad-top20" v-if="question.type.toLowerCase() === 'customscale'">
                <vue-slider v-if="!question.verticalScale" ref="slider" :value="question.labels[0]" :piecewise="true" width="1" direction="horizontal" class="horizontal-vue-slider" :data="question.labels" :disabled="true"></vue-slider>
                <vue-slider v-if="question.verticalScale" ref="slider" :value="question.labels[0]" :piecewise="true" width="2" direction="vertical" class="vertical-vue-slider" :data="question.labels" :disabled="true"></vue-slider>
              </div>
              <div class="option-section" v-if="question.type.toLowerCase() === 'text'">
                <input type="text" class="input-text readonly" placeholder="" readonly />
              </div>
              <div class="option-section" v-if="question.type.toLowerCase() === 'date'">
                <div class="col-sm-3 p-0">
                  <input type="text" class="input-text readonly" placeholder="" v-model="question.dateFormat" readonly>
                </div>
              </div>
              <div class="option-section" v-if="question.type.toLowerCase() === 'time'">
                <div class="col-sm-3 p-0">
                  <input type="text" class="input-text readonly" placeholder="" :value="question.timeFormat === '12' ? 'HH:MM AM/PM':'HH:MM'" readonly>
                </div>
              </div>
              <div class="option-section" v-if="question.type.toLowerCase() === 'number'">
                <div class="">
                  <input type="text" class="input-text readonly width-90" placeholder="" readonly>
                  <span v-if="question.hasUnits">{{question.units}}</span>
                </div>
              </div>
              <div class="option-section" v-if="question.type.toLowerCase() === 'valuepicker'">
                <div class="">
                  <input type="number" class="input-text readonly" placeholder="" readonly>
                </div>
              </div>
              <div class="option-section" v-if="question.type.toLowerCase() === 'imagechoice'">
                <div class="">
                </div>
              </div>
              <div class="option-section" v-if="question.type.toLowerCase() === 'email'">
                <div class="">
                  <input type="email" class="input-text readonly" placeholder="" readonly>
                </div>
              </div>
              <div class="option-section" v-if="question.type.toLowerCase() === 'location'">
                <div class="">
                  <input type="text" class="input-text readonly" placeholder="" readonly>
                </div>
              </div>
              <div class="option-section" v-if="question.type.toLowerCase() === 'singlechoice'">
                <div v-for='(option, index) in question.options' :key="index">
                  <label>
                    <input type="radio" name="single" disabled>&nbsp;{{option.body}}
                  </label>
                  <div class="" v-if="option.imageUrl">
                    <img :src="option.imageUrl" alt="" class="">
                  </div>
                </div>
              </div>
              <div class="option-section" v-if="question.type.toLowerCase() === 'multichoice'">
                <div v-for='(option, index) in question.options' :key="index">
                  <label>
                    <input type="checkbox" disabled>&nbsp;{{option.body}}
                  </label>
                  <div class="" v-if="option.imageUrl">
                    <img :src="option.imageUrl" alt="">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-3 p-0 text-right">
            <button class="btn btn-default color_blue br-2" v-on:click="editQuestion(question, index)">Edit</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import SurveyBuilder from './SurveyBuilder';

export default {
  name: 'QuestionsList',
  data() {
    return {
      selectedQuestion: { id: null },
    };
  },
  props: ['questions'],
  components: { SurveyBuilder },
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    editQuestion(question, index) {
      this.selectedQuestion = JSON.parse(JSON.stringify(question));
      this.selectedQuestion.questionNumber = index + 1;
      if (this.selectedQuestion.type === 'MultiChoice' && !this.selectedQuestion.bodyImages) {
        this.selectedQuestion.bodyImages = [
          {
            sequence: 1,
            imageUrl: null,
            imageId: null,
          },
        ];
      }
      // this.$store.dispatch('selectedQuestionAction', _.cloneDeep(this.selectedQuestion));
    },
    clearQuestionSelection(option) {
      const optionIndex = _.findIndex(this.selectedQuestionForBranching.options, ['id', option.id]);
      this.selectedQuestionForBranching.options[optionIndex].nextQuestion = 'default'; // eslint-disable-line
      this.$forceUpdate();
    },
    deleteQuestion(question) {
      this.$api.deleteQuestionFact(this.studyId, this.surveyId, question.id).then(
        response => {
          window.console.log(response);
          window.console.success('Question deleted successfully');
          const questionIndex = _.findIndex(this.questions, ['id', question.id]);
          this.questions.splice(questionIndex, 1);
        },
        error => {
          this.errorMsg = error.body ? error.body.message : 'Erorr while deleting the question';
          window.console.error(this.errorMsg);
        },
      );
    },
  },
};
</script>

<style scoped lang="scss">
h1,
h2,
h3 {
  font-weight: 200;
}
.wid300 {
  max-width: 300px !important;
}
.img-style {
  padding-top: 20px;
  height: 300px;
  width: 500px;
  padding-bottom: 20px;
}

.question_body {
  word-break: break-all;
  color: #959fa4;
}

.read_only_question {
  border-left: 8px solid #d3dfe4 !important;
  background-color: #f5f8fa;
}

.icon-style {
  color: #57dd7a;
  font-size: 25px;
  padding-top: 20px;
  background-color: #d6f0de;
  padding: 7px;
  padding-bottom: 3px;
  border-radius: 25px;
}

.font-style {
  color: #57dd7a;
  font-size: 16px;
  padding-top: 10px;
  padding-bottom: 30px;
}

// Style for quick fixes bootstrap after migration (before redesign should be removed)

.option-section {
  &:after {
    content: '';
    clear: both;
    display: block;
  }
  .col-sm-3 {
    float: left;
  }
}

// END of style for quick fixes bootstrap after migration (before redesign should be removed)

h1,
h2,
h3 {
  font-weight: 200;
}

.img-style {
  padding-top: 20px;
  height: 300px;
  width: 500px;
  padding-bottom: 20px;
}

.question_body {
  word-break: break-all;
  color: #959fa4;
}

.read_only_question {
  border-left: 8px solid #d3dfe4 !important;
  background-color: #f5f8fa;
}

.icon-style {
  color: #57dd7a;
  font-size: 25px;
  padding-top: 20px;
  background-color: #d6f0de;
  padding: 7px;
  padding-bottom: 3px;
  border-radius: 25px;
}

.font-style {
  color: #57dd7a;
  font-size: 16px;
  padding-top: 10px;
  padding-bottom: 30px;
}

.text-style {
  color: #969090;
  text-align: right;
}

.btn-style {
  margin-top: 10px;
  width: 80px;
  height: 29px;
  margin-bottom: 50px;
}

.custom-btn {
  background: #00baf9;
  color: #fff;
  width: 220px;
}

.pad-top50 {
  padding-top: 50px;
}

.form-control {
  border-radius: 2px;
}

.custom-para {
  padding-bottom: 20px;
  font-size: 20px;
}

.mar-bot20 {
  margin-bottom: 20px;
}

.error-style {
  font-size: 12px;
  color: #ff4848;
  padding-bottom: 5px;
}
.readonly {
  background: #f7f7f7;
}
.btn-disabled {
  color: white;
  background-color: #c6c2c2;
  border: #c6c2c2;
}

.text-color {
  color: #888;
}

.survey-name {
  color: #00baf9;
  font-size: 20px;
}

.pad-left50 {
  padding-left: 50px;
}
.branching_section {
  background-color: #f5f8fa;
  border: solid 1px #d3dfe4;
  padding: 5px 10px;
  .branching_image {
    max-width: 120px;
    max-height: 120px;
    width: 100%;
    border: 1px solid #ccc;
  }
}
.custom-btn-bg {
  background: linear-gradient(to left, #4b6fe6, #00baf9);
  color: #fff;
}

.mar-bot20 {
  margin-bottom: 20px;
}

.pad-left100 {
  padding-left: 100px;
}

.mar-bot0 {
  margin-bottom: 0px !important;
}

.card {
  border: 1px solid rgba(0, 0, 0, 0.125);
  padding: 15px;
  margin-bottom: 16px;
}

.question_color,
input {
  color: #666769;
  font-size: 14px;
}

.radio-option {
  margin: 0px;
}

.input-text {
  width: 100%;
  border-radius: 2px;
  outline: none;
  border: 1px solid #ccc;
  height: 35px;
  text-indent: 10px;
}

.date-input {
  border-radius: 20px;
  outline: none;
  border: 1px solid #ccc;
  height: 35px;
  text-indent: 10px;
}

.pad-top20 {
  padding-top: 20px;
}

.vertical-vue-slider {
  height: 300px !important;
  width: 4px;
  padding: 11px;
  margin-left: 30px;
}

.horizontal-vue-slider {
  height: 8px;
  width: 100%;
}

.img-size {
  width: 100%;
  height: auto;
  float: none;
  padding: 10px 0 0;
  max-width: 120px;
  max-height: 120px;
}

label {
  font-weight: normal !important;
  word-break: break-all;
  color: #959fa4;
}

.modal-dialog {
  width: 500px !important;
}
.width-90 {
  width: 90% !important;
}
</style>

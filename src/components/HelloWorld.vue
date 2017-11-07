<template>
  <div class="hello">
    <h2>This is hello component</h2>
    <surveyBuilder></surveyBuilder>
    <h2>This is hello component</h2>
  </div>
</template>

<script>
  import surveyBuilder from './SurveyBuilder';
  
  export default {
    name: 'HelloWorld',
    data() {
      return {};
    },
    mounted() {
      this.$root.$on('send', (text) => {
        window.console.log('text is: ', text);
      });
    },
    components: { surveyBuilder },
    methods: {},
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>

<template>
  <div class="home">
    <TestSurveyBuilder  />
  </div>
</template>

<script>
// @ is an alias to /src
import TestSurveyBuilder from '@/components/TestSurveyBuilder.vue';

export default {
  name: 'HomeView',
  components: {
    TestSurveyBuilder,
  },
};
</script>

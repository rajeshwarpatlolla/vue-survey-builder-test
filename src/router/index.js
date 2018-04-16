import Vue from 'vue';
import Router from 'vue-router';
import TestSurveyBuilder from '@/components/TestSurveyBuilder';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TestSurveyBuilder',
      component: TestSurveyBuilder,
    },
  ],
});

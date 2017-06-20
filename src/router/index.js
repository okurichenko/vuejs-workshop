import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/Hello';
import Step2 from '@/components/Step2';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello,
    },
    {
      path: '/step-2',
      name: 'step-2',
      component: Step2,
    },
  ],
});

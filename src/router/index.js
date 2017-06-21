import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/Hello';
import Step2 from '@/components/Step2';
import Step3 from '@/components/Step3';

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
    {
      path: '/step-3',
      name: 'step-3',
      component: Step3,
    },
  ],
});

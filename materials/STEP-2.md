# Step 2

## Intro

We already know how to set up the Vue project and how to work with
data properties, render them in template and modify. Also, we became
familiar with Vue directives and know how to create custom one. This
step will help us dive into components' structure and functionality
deeper.

If, for any reason you don't have latest code in your project, run
under your projects' folder

```
git clone -b step-1 https://github.com/okurichenko/vuejs-workshop.git
```

Let's replace create a new component `components/Step2.vue` with the
following content to clear up a bit:

```
<template>
  <div id="step-2">
    <p>Hi from step-2</p>
  </div>
</template>

<script>
  export default {
    name: 'step-2',
  };
</script>
```

Also, make your router `src/router/index.js` look like this:

```
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
```

What we did here - we created one more route for `vue-router` which
should show up after running `npm run dev` and visiting
[http://localhost:8080/#/step-2](http://localhost:8080/#/step-2)

We'll look at `vue-router` more detailed in next steps. All we want now -
is a new component so we won't work with the mess in `components/Hello.vue`.

## Computed properties

Vue component might have computed properties which should automatically
watch the changes of the properties used in them and recompute. Computed
properties should be declared as methods under `computed` root property
of the component:

```
data() {
  return {
    msg: 'world',
  };
},
computed: {
  computedMsg() {
    return `Hello ${this.msg}`;
  },
},
```

And in the template:

```
<p>{{ computedMsg }}</p>
```

Every time we change `msg`, `computedMsg` will change too:

```
<div><button @click="msg = 'me'">Click me</button></div>
```

`@click` directive is just a shorthand for `v-on:click`.

### Computed properties with setters

Computed properties could have setters which is great when you want to
change initial data property when computed one is changed. Add one more
computed property and provide handler that changes it:

```
<div><button @click="computedWithSetter = 'Computed someone'">Change computedWithSetter</button></div>

...

computed: {
  ...
  computedWithSetter: {
    get() {
      return `Computed ${this.msg}`;
    },
    set(newValue) {
      this.msg = newValue.split(' ')[1];
    },
  },
},
...
```

If you noticed, we changed computed property from the inline handler and
it doesn't seem like a good idea and what if we gonna have huge method
to run on that button click event?

## Methods

Methods are nothing but actions that could be triggered on any event in
the component. Let's rework onclick handler with a method. Add new property
to component object called `methods` and add method to change `msg`:

```
methods: {
  changeMsg() {
    this.msg = 'me';
  },
},
```

Also replace button `@click` directive value with the name of created
method:

```
<div><button @click="changeMsg">Click me</button></div>
```

Refresh the page and click the button. Passed method worked well, as you
see. Also, method call can receive parameters and pass them to the
corresponding method:

```
<div><button @click="changeMsg('me')">Click me</button></div>
<div><button @click="changeMsg('you')">Click you</button></div>

...

methods: {
  changeMsg(value) {
    this.msg = value;
  },
},
```

Also, you can get access to event object from inline method call via
`$event` variable. Replace "Click you" button with the following and
check it by yourself:

```
<div><button @click="changeMsg($event.target.innerHTML.split(' ')[1])">Click you</button></div>
```

As you remember, on step 1 we were speaking about modifiers, and here's
a [link](https://vuejs.org/v2/guide/events.html#Event-Modifiers) where
you may find it's more advanced usage.

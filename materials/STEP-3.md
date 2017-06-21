# Step 3

## Intro

In this step we'll work with, nested components, components interaction.
Let's create another routed component `components/Step3.vue` for this step:

```
<template>
  <div id="step-3"></div>
</template>

<script>
  export default {
    name: 'step-3',
  };
</script>
```

And add it to router:

```
import Step3 from '@/components/Step3';
...
export default new Router({
  routes: [
    ...
    {
      path: '/step-3',
      name: 'step-3',
      component: Step3,
    },
  ],
});
```

Now visit [http://localhost:8080/step-3](http://localhost:8080/step-3)

## Nested components

As you already noticed, VueJS has component structure, and it's obvious
that you can nest them inside each other. For example let's create new
component which will be called `components/NestedComponent.vue` with
the following content:

```
<template>
  <div class="nested-component">
    <p>{{ greeting }}</p>
  </div>
</template>

<script>
  export default {
    name: 'nested-component',
    data() {
      return {
        greeting: 'Hello from nested component!',
      };
    },
  };
</script>

```

To render it inside `Step3` component, you'd pass it to its `components`
property:

```
<template>
  <div id="step-3">
    <nested-component></nested-component>
  </div>
</template>

<script>
  import NestedComponent from '@/components/NestedComponent';

  export default {
    name: 'step-3',
    components: {
      NestedComponent,
    },
  };
</script>
```

Look on the page and check if it has rendered :)

## Passing properties to nested component

VueJS components should be handled using "Data down, actions up" approach.
To pass some property to nested component, first of all, we could try
just add corresponding attribute.

```
<nested-component greetingFromParent="Hello from Step3 component!"></nested-component>
```
And let's try to render this data in nested component:

```
<p>{{ greetingFromParent }}</p>
```

Aaaaand... Nothing happens, but the console shows and error that
`Property or method "greetingFromParent" is not defined`. To fix this,
we should say nested component that it should accept property from
parent component by adding its name to `props` property:

```
...
  name: 'nested-component',
  props: ['greetingFromParent'],
  data() {
    ...
```

Now it renders correctly. But we've passed string as is. What if we want
to pass some property from `data` object? Just pass it using `v-bind`
directive:

```
...
  <nested-component v-bind:greetingFromParent="greet"></nested-component>
...
  data() {
    return {
      greet: 'Hello from Step3 component!',
    };
  },
```

Yep, it worked perfectly. This is the way how data is going down. How
about "actions up"?

## "Actions up"

Let's say, we want to change greeting from `Step3` component. Add a button
with onclick handler to `NestedComponent` that will do it for us:

```
...
<div><button @click="changeParentGreeting">Change greeting</button></div>
...
methods: {
  changeParentGreeting() {
    // change parent greeting here
  },
},
...
```

First, try to change it directly:

```
// inside changeParentGreeting()
this.greetingFromParent = 'Changed';
```

Click the button. You see, that `greetingFromParent` changed, but in
console you will have `console.error` with warning to "Avoid mutating
a prop directly since the value will be overwritten whenever the
parent component re-renders". And it makes sense. So how do we change
that in "right way"?

As you already could guess, if the data is passed via `v-bind` directive,
actions will be passed via `v-on` directive. Actually, we pass the name
of handler bound to custom event:

```
// Step3.vue
...
  <nested-component :greetingFromParent="greet"
                    @onChangeGreeting="changeGreeting"></nested-component>
...
  methods: {
    changeGreeting(value) {
      this.greet = value;
    },
  },
...
```

To emit the event from `NestedComponent`, rework `changeParentGreeting`
method:

```
...
  changeParentGreeting() {
    this.$emit('onChangeGreeting', 'Changed');
  },
...
```

Refresh the page and try to click the button. Parent `greeting` changed
and here is no errors or warnings in the console. Also, we could emit
that event with inline code execution right from the template using
`$emit` method:

```
<div><button @click="$emit('onChangeGreeting', 'Changed')">Change greeting</button></div>
```

And you can use this approach to keep your components more clear.

## Slots

Component could have slots to distribute template objects from parent
component to nested one. For example, in `NestedComponent`:

```
    ...
    <div><button @click="$emit('onChangeGreeting', 'Changed')">Change greeting</button></div>
    <slot></slot>
  </div>
...
```

And now in parent:

```
...
    <nested-component :greetingFromParent="greet"
                      @onChangeGreeting="changeGreeting">
      <div><button @click="changeGreeting('Changed from parent')">Change greeting from parent</button></div>
    </nested-component>
...
```

It helps to keep components more flexible and reusable. To add more
flexibility, you can use named slots:

```
// NestedComponent.vue
<template>
  <div class="nested-component">
    <slot name="namedOne"></slot>
    ...
```

```
...
    <div slot="namedOne">Will be bound to named slot.</div>
  </nested-component>
...
```

And check it out. Content of the `<div slot="namedOne">` is rendered
into `<slot name="namedOne"></slot>`. Easy-peasy, isn't it?

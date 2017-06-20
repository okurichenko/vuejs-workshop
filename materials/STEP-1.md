# Step 1

Here we'll checkout app structure and how it looks like and make few
simple changes so you'll get your first results of working with VueJS

For the beginning, let's create our new project under projects' directory:

```
vue init webpack vue-workshop
```

Dive into it and install npm packages (while it's doing smth, open project
with your favourite IDE/editor/anythingyouusetoshitcode):

```
cd vue-workshop
npm i
```

As you can see, project has pretty clear structure:

```
├── build             - scripts with build webpack instructions
├── config            - environment config files
├── node_modules
├── src               - our brilliant vue-app source
|    ├── assets
|    ├── components
|    ├── router
|    ├── App.vue
|    └── main.js
├── static
├── .babelrc
├── .editorconfig
├── .eslintignore
├── .eslintrc.js
├── .gitignore
├── .postcssrc.js
├── index.html
├── package.json
└── README.md
```

Let's run dev server and check out how it looks atm:

```
npm run dev
```

It should open your browser at `http://localhost:8080` and show some
initial page. If you look at `App.vue` and `components/Hello.vue`, you'll
notice that page contains all the data from both templates.

Also, we can see on the example of `App.vue` that `.vue` component file
contains template, js object that describes the component and layout
styles.

Let's modify `components/Hello.vue` with some additional `p` after `h1`:

```
...
<h1>{{ msg }}</h1>
<p>Some added DOM</p>
<h2>Essential Links</h2>
...
```

Development server is built using hot-reload, so you can notify changes
in browser instantly.

As you can see, pure html of the component could be described "as is"
inside the `<template>` tag. Let's look into `<script>` tag of the
component. It exports an object with options which is used to create
Vue instance. Let's check out what it contains at the moment:

```
name: 'hello', // - name of the component
data() {       // - method that return an object with data used
  return {     // in the component
    msg: 'Welcome to Your Vue.js App',
  };
},
```

Let's edit `msg` property and look if `<h1>` will react to the change.

```
msg: 'Hello world'
```

As you can see, properties from returned in `data()` method object could
be easily rendered in the template if you wrap name of that property with
double curly braces `{{ ... }}`. But what if we have html in the property?

```
msg: '<i>Hello world</i>'
```

During the template rendering, Vue is escaping special characters.
What if you really want to render data property which contains html?

In Vue component template you can use special attributes (which is
called "**directives**"). Here are some of them:

* v-html
* v-text
* v-if
* v-else
* v-else-if
* v-show
* v-for
* v-bind
* v-on
* v-once

Here we might want to use `v-html` directive:

```
<div class="hello">
    <h1 v-html="msg"></h1>
    <p>Some added DOM</p>
```

Let's move through the whole list of directives and try to use each of it.

#### v-text

Is just another way to render property "as is". Used instead of `{{ ... }}`.
`v-text` directive always has higher priority than tag content. To check it
let's add following line after `<h1>` tag:

```
<p v-text="anotherMsg">{{msg}}</p>
```

And add one more property to returned in `data()` object:

```
data() {
  return {
    msg: '<i>Hello world</i>',
    anotherMsg: '<i>Another hello world</i>',
  };
}
```

Right after the `<h1>` tag you can see `anotherMsg` property content

#### v-if, v-else, v-else-if

Implements conditional rendering in templates. As a directive values
you'd pass condition in js. Let's add two properties to data:

```
data() {
  return {
    msg: '<i>Hello world</i>',
    anotherMsg: '<i>Another hello world</i>',
    condition: true,
    anotherCondition: true,
  };
},
```

And add few objects to the template:

```
<p v-if="condition">Condition kinda true</p>
<p v-else-if="condition || anotherCondition">Another condition kinda true</p>
<p v-else>All conditions eq to false</p>
```

Then change `condition` and `anotherCondition` and check if rendered
template represented regarding properties' values.

#### v-show

Is another conditional directive. It differs from `v-if` in the way
that object with this directive is always present in the component,
but will have `style="display: none;"` attribute if condition resolves
to `false`.

```
<p v-show="condition">Check out "v-show"</p>
```

#### v-for

Represents list rendering in Vue.js:

```
data() {
  return {
    ...
    someList: [
      'one',
      'two',
      'three',
    ],
  };
},
```

And in the template:

```
<ul>
  <li v-for="item in someList">{{ item }}</li>
</ul>
```

Also, you can use iterator variable, if it's needed:

```
<ul>
  <li v-for="(item, index) in someList">{{ index + 1 }} - {{ item }}</li>
</ul>
```

#### v-bind

Helps to bind dynamic attributes:

```
<p v-bind:style="someStyles">Not black text</p>

...

someStyles: 'color: red;',

```

The name of the attribute should be passed as an **argument** to the
directive.

Let's check how it will changes according to property changes and add a
button with an event listener and next directive is going to give a hand.

#### v-on

Helps to bind event listeners:

```
<div><button v-on:click="someStyles = 'color: blue;'">Change color</button></div>
```

Yes, you can make change to data properties right from the template. So
binding event listeners are made similar to attribute binding and should
receive event name as an argument.

Also, there is such thing as **modifiers** to event bindings:

```
<div><a href="https://google.com/" v-on:click.prevent="someStyles = 'color: green;'">Leave to Google</a></div>
```

It was an example of `event.preventDefault()` usage via modifiers.

#### v-once

Sometimes, we need to interpolate data property only once during the
component lifecycle and will never change it again. Here's the point
where `v-once` directive is helpful.

```
<p v-bind:style="someStyles" v-once>Another not black text</p>
```

When you click on button or link, text color for this object won't change
because it was already interpolated once during template rendering and
listener on `someStyles` property for this object was removed.

----------------

The great thing is that we can add our own custom directives and use
it in components.

Let's try to implement one.

```
<p v-color="textColor">Some colored text</p>

...

  data() {
    return {
      ...
      textColor: 'purple',
    },
  },
...
```

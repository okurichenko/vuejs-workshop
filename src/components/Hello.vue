<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p v-text="anotherMsg">{{msg}}</p>
    <p v-if="condition">Condition kinda true</p>
    <p v-else-if="condition || anotherCondition">Another condition kinda true</p>
    <p v-else>All conditions eq to false</p>
    <p v-show="condition">Check out "v-show"</p>
    <p v-bind:style="someStyles">Not black text</p>
    <p v-bind:style="someStyles" v-once>Another not black text</p>
    <p v-color="textColor">Some colored text</p>
    <div><button v-on:click="someStyles = 'color: blue;'">Change color</button></div>
    <div><a href="https://google.com/" v-on:click.prevent="someStyles = 'color: green;'">Leave to Google</a></div>
    <ul>
      <li v-for="(item, index) in someList">{{ index + 1 }} - {{ item }}</li>
    </ul>
    <p>Some added DOM</p>
    <h2>Essential Links</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://gitter.im/vuejs/vue" target="_blank">Gitter Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
      <br>
      <li><a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data() {
    return {
      msg: '<i>Hello world</i>',
      anotherMsg: '<i>Another hello world</i>',
      condition: false,
      anotherCondition: false,
      someList: [
        'one',
        'two',
        'three',
      ],
      someStyles: 'color: red;',
      textColor: 'purple',
    };
  },
  directives: {
    color(el, binding) {
      // eslint-disable-next-line
      el.style.color = binding.value;
    },
  },
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

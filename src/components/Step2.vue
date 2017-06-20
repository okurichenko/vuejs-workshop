<template>
  <div id="step-2">
    <p>Hi from step-2</p>
    <p>{{ computedMsg }}</p>

    <div><button @click="computedWithSetter = 'Computed someone'">Change computedWithSetter</button></div>
    <div><button @click="changeMsg('me')">Click me</button></div>
    <div><button @click="changeMsg($event.target.innerHTML.split(' ')[1])">Click you</button></div>
  </div>
</template>

<script>
  export default {
    name: 'step-2',
    data() {
      return {
        msg: 'world',
      };
    },
    computed: {
      computedMsg() {
        return `Hello ${this.msg}`;
      },
      computedWithSetter: {
        get() {
          return `Computed ${this.msg}`;
        },
        set(newValue) {
          this.msg = newValue.split(' ')[1];
        },
      },
    },
    methods: {
      changeMsg(value) {
        this.msg = value;
      },
    },
  };
</script>

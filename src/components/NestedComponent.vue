<template>
  <div class="nested-component">
    <slot name="namedOne"></slot>
    <p>{{ greeting }}</p>
    <p>{{ greetingFromParent }}</p>
    <div><button @click="$emit('onChangeGreeting', 'Changed')">Change greeting</button></div>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'nested-component',
    props: ['greetingFromParent'],
    data() {
      return {
        greeting: 'Hello from nested component!',
      };
    },
    methods: {
      changeParentGreeting() {
        this.$emit('onChangeGreeting', 'Changed');
      },
    },
  };
</script>

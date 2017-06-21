<template>
  <div id="step-3">
    <nested-component :greetingFromParent="greet"
                      @onChangeGreeting="changeGreeting">
      <div><button @click="changeGreeting('Changed from parent')">Change greeting from parent</button></div>
      <div slot="namedOne">Will be bound to named slot.</div>
    </nested-component>
  </div>
</template>

<script>
  import NestedComponent from '@/components/NestedComponent';

  export default {
    name: 'step-3',
    components: {
      NestedComponent,
    },
    data() {
      return {
        greet: 'Hello from Step3 component!',
      };
    },
    methods: {
      changeGreeting(value) {
        this.greet = value;
      },
    },
  };
</script>

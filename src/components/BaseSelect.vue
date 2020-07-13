<template>
  <div :class="className">
    <label v-if="label">{{ label }}</label>
    <select :value="value" v-on="$listeners" @change="updateValue" v-bind="$attrs">
    <!-- Adding v-on enable us to inheriting event listeners here      -->
      <option
        v-for="option in options"
        :key="option"
        :selected="option === value"
        >{{ option }}</option
      >
    </select>
  </div>
</template>

<script>
export default {
  name: 'BaseSelect',
  inheritAttrs: false,
  props: {
    options: {
      type: Array,
      required: true
    },
    label: {
      type: String,
      default: ''
    },
    value: [String, Number],
    className: {
      required: false,
      default: ''
    }
  },
  methods: {
    updateValue(event) {
      this.$emit('input', event.target.value)
    }
  }
}
</script>

<style scoped></style>

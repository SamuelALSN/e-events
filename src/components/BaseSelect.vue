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
  import  { formFieldMixin} from '../mixins/formFieldMixin'

  export default {
  name: 'BaseSelect',
    mixins: [formFieldMixin],
  props: {
    options: {
      type: Array,
      required: true
    },
    className: {
      required: false,
      default: ''
    }
  },
}
</script>

<style scoped></style>

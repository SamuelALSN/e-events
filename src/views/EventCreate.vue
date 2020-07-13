<template>
  <div>
    <h1>Create an Event</h1>
    <form @submit.prevent="createEvent">
      <BaseSelect
        label="Select a category"
        :options="categories"
        v-model="event.category"
        @blur="$v.event.category.$touch()"
        :class="{ error: $v.event.category.$error }"
      />
      <!--   Ad class when $error is true    -->
      <!-- @blur triggers dirty status -->
      <template v-if="$v.event.category.$error">
        <p v-if="!$v.event.category.required" class="errorMessage">
          Category is required
        </p>
      </template>
      <!--  Check if the event.category field contains a value || because required will remain false until it contains a values  -->
      <h3>Name & describe your event</h3>
      <BaseInput
        label="Title"
        v-model.trim="event.title"
        type="text"
        class="field"
        :class="{ error: $v.event.title.$error }"
        @blur="$v.event.title.$touch()"
        placeholder="Title"
      />
      <template v-if="$v.event.title.$error">
        <p v-if="!$v.event.title.required" class="errorMessage">
          Title is required
        </p>
      </template>
      <BaseInput
        label="Description"
        v-model.trim="event.description"
        type="text"
        placeholder="Add a description"
        class="field"
        :class="{ error: $v.event.description.$error }"
        @blur="$v.event.description.$touch()"
      />
      <template v-if="$v.event.description.$error">
        <p v-if="!$v.event.description.required" class="errorMessage">
          Description is required
        </p>
      </template>
      <h3>Where is your event?</h3>

      <BaseInput
        label="Location"
        v-model.trim="event.location"
        type="text"
        placeholder="Add a location"
        class="field"
        :class="{ error: $v.event.description.$error }"
        @blur="$v.event.location.$touch()"
      />
      <template v-if="$v.event.location.$error">
        <p v-if="!$v.event.location.required" class="errorMessage">
          Location is required.
        </p>
      </template>

      <h3>When is your event?</h3>
      <div class="field">
        <label>Date</label>
        <datepicker
          placeholder="Select a date"
          v-model="event.date"
          @opened="$v.event.date.$touch()"
          :input-class="{ error: $v.event.date.$error }"
        />
      </div>
      <template v-if="$v.event.date.$error">
        <p v-if="!$v.event.date.required" class="errorMessage">
          Date is required.
        </p>
      </template>
      <BaseSelect
        label="Select a time"
        :options="times"
        v-model.trim="event.time"
        v-model="event.time"
        :class="{ error: $v.event.time.$error }"
        @blur="$v.event.time.$touch()"
        class="field"
      />
      <template v-if="$v.event.time.$error">
        <p v-if="!$v.event.time.required" class="errorMessage">
          Time is required.
        </p>
      </template>

      <!--      <div class="field">-->
      <!--        <label>Select a time</label>-->
      <!--        <select v-model="event.time">-->
      <!--          <option v-for="time in times" :key="time">{{ time }}</option>-->
      <!--        </select>-->
      <!--      </div>-->
      <!--      <input type="submit" class="button -fill-gradient" value="Submit" />-->
      <BaseButton
        type="submit"
        buttonClass="-fill-gradient"
        :disabled="$v.$anyError"
        >Submit
      </BaseButton>
      <p v-if="$v.$anyError" class="errorMessage">
        Please fill out the required field(s)
      </p>
    </form>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import NProgress from 'nprogress'
import BaseInput from '../components/BaseInput'
import BaseSelect from '../components/BaseSelect'
import BaseButton from '../components/BaseButton'
import { required } from 'vuelidate/lib/validators'
export default {
  name: 'EventCreate',
  components: {
    BaseButton,
    BaseSelect,
    BaseInput,
    Datepicker
  },
  data() {
    const times = []
    for (let i = 1; i <= 24; i++) {
      times.push(i + ':00')
    }
    return {
      times,
      categories: this.$store.state.categories,
      event: this.createFreshEventObject()
    }
  },
  methods: {
    createEvent() {
      this.$v.$touch() // touching all fields to turn them dirty, this will ensure that all fields are turned $dirty so that any $errors can be found and displayed
      if (!this.$v.$invalid) { // submit form only when all fields are valid
        NProgress.start()
        this.$store
          .dispatch('event/createEvent', this.event)
          .then(() => {
            this.$router.push({
              name: 'event-show',
              params: { id: this.event.id }
            })
            this.event = this.createFreshEventObject()
          })
          .catch(() => {
            NProgress.done()
          })
      }
    },
    createFreshEventObject() {
      const user = this.$store.state.user.user
      const id = Math.floor(Math.random() * 1000000)
      return {
        id: id,
        user: user,
        category: '',
        organizer: user,
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        attendees: []
      }
    }
  },
  validations: {
    event: {
      category: { required },
      title: { required },
      description: { required },
      location: { required },
      date: { required },
      time: { required }
    }
  }
}
</script>

<style scoped>
.field {
  margin-bottom: 24px;
}
</style>

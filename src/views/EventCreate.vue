<template>
  <div>
    <h1>Create an Event, {{ user.name }}</h1>
    <p>This event created by {{ user.id }}</p>
    <ul>
      <li v-for="cat in categories" :key="cat">{{ cat }}</li>
    </ul>
    <p>There are {{ getEventById(2) }}</p>
  </div>
</template>

<script>
import { mapState,mapGetters } from 'vuex'
export default {
  name: 'EventCreate',
  computed: {
    // getEvent() {
    //   return this.$store.getters.getEventById
    // },
    ...mapGetters(['getEventById']),
    ...mapState(['user', 'categories'])
  }
}
</script>

<style scoped></style>

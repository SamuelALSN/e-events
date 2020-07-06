<template>
  <h1>Showing event : {{ event.title }}</h1>
</template>

<script>
import EventService from '@/services/EventService'

export default {
  name: 'EventShow',
  props: ['id'],
  data() {
    return {
      event: {}
    }
  },
  created() {
    EventService.getEvent(this.id)
      .then(response => {
        this.event = response.data
      })
      .catch(error => {
        console.log('There is a error :', error.response)
      })
  }
}
</script>

<style scoped></style>

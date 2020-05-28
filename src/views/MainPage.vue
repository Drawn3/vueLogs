<template>
  <div class="home">
    <LogList />
  </div>
</template>

<script>
// @ is an alias to /src
import LogList from '@/components/LogList.vue'

export default {
  name: 'MainPage',
  components: {
    LogList
  }
}
</script>

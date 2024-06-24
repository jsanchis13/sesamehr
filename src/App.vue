<template>
  <div class="app">
    <HomeLanding />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HomeLanding from '@/components/home/HomeLanding.vue'

export default defineComponent({
  name: 'App',
  components: {
    HomeLanding
  }
})
</script>

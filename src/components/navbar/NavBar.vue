<template>
  <div class="max-w-2xl mx-auto">
    <aside class="w-64" aria-label="Sidebar">
      <NavBarItems></NavBarItems>
    </aside>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavBarItems from './NavBarItems.vue'

export default defineComponent({
  name: 'NavBar',
  components: {
    NavBarItems
  }
})
</script>

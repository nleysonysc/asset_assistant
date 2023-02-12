<script setup>
  import { useUserStore } from '../../stores/userStore';

  let userStore = useUserStore();
</script>

<template>
  <nav>
    <ul>
      <li>admin links</li>
    </ul>
  </nav>
</template>

<style scoped>
  ul {
    list-style-type: none;
  }
</style>
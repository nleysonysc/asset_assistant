<script setup>
  import { useAssetStore } from '../stores/assetStore'

  let assetStore = useAssetStore()
  defineProps({
    result: Map
  });

  
</script>

<template>
  <li>
    {{ result }}
  </li>
</template>

<style scoped>
  li {
    list-style-type: none;
  }
</style>

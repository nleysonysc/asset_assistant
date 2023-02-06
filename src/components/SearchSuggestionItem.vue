<script setup>
  import { RouterLink } from 'vue-router'
  import { useAssetStore } from '../stores/assetStore'

  let assetStore = useAssetStore()
  defineProps({
    suggestion: Array
  });

  function onClick(e, suggestion) {
    console.log(assetStore.fetchAsset(suggestion[0]))
  }
</script>

<template>
  <li>
    <RouterLink :to="`/asset/${suggestion[0]}`">{{ suggestion }}</RouterLink>
  </li>
</template>

<style scoped>
  li {
    list-style-type: none;
  }
</style>

<script setup>
  import { ref } from 'vue'
  import { RouterLink } from 'vue-router'
  import { useAssetStore } from '../stores/assetStore'

  let assetStore = useAssetStore()
  defineProps({
    result: Array
  });

  function onClick(e, result) {
    console.log(assetStore.fetchAsset(result[0]))
  }
</script>

<template>
  <li>
    <RouterLink :to="`/asset/${result[0]}`">{{ result }}</RouterLink>
  </li>
</template>

<style scoped>
  li {
    list-style-type: none;
  }
</style>

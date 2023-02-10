<script setup>
  import { useAssetStore } from '../stores/assetStore'

  let assetStore = useAssetStore();

</script>

<template>
  <div>
    <input type="text" name="search" v-model="assetStore.searchTerm" />
  </div>
</template>

<style scoped>

</style>

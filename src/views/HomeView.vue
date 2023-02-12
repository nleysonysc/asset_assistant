<script setup>
  import { useAssetStore } from '../stores/assetStore'
  import Search from "../components/Search.vue"
  
  let assetStore = useAssetStore();

</script>

<template>
  <main>
    <Search />
  </main>
</template>

<style scoped>

</style>

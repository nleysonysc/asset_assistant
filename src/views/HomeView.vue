<script setup>
  import { useAssetStore } from '../stores/assetStore'
  import Search from "../components/Search.vue"
  import SearchResults from "../components/SearchResults.vue"

  let assetStore = useAssetStore();

  function test() {
    console.log(assetStore.activeAsset)
  }
</script>

<template>
  <main>
    <Search />
    <SearchResults />
    <v-btn @click="test">test</v-btn>
  </main>
    
</template>

<style scoped>

</style>

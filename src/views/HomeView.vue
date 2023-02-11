<script setup>
  import { useAssetStore } from '../stores/assetStore'
  import Search from "../components/Search.vue"

  let assetStore = useAssetStore();


  function test() {
    console.log(assetStore.activeAsset)
  }

</script>

<template>
  <main>
    <Search />
    <v-btn @click="test">test</v-btn>
  </main>
    
</template>

<style scoped>

</style>

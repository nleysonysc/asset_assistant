<script setup>
  import {ref} from 'vue'
  import { useAssetStore } from '../stores/assetStore'

  let assetStore = useAssetStore()
  let searchValue = ref("");
  function filterResults(e){
    // 
    assetStore.searchAssets(searchValue.value)
  }
</script>

<template>
  <input type="text" name="search" v-model="searchValue" @change="filterResults" />
</template>

<style scoped>

</style>

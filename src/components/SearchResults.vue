<script setup>
  import { useAssetStore } from '../stores/assetStore'
  import SearchResultItem from './SearchResultItem.vue';
  let assetStore = useAssetStore();
</script>

<template>
  <div>
    <ul>
      <SearchResultItem v-for="result in assetStore.searchResults" :result="result" :key="result" />
    </ul>
  </div>
</template>

<style scoped>

</style>

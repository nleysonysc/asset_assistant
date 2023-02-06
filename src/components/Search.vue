<script setup>
  import { ref } from 'vue'
  import { useAssetStore } from '../stores/assetStore'
  import SearchBar from './SearchBar.vue'
  import SearchSuggestionItem from './SearchSuggestionItem.vue'

  let assetStore = useAssetStore();

</script>

<template>
  <main>
    <SearchBar />
    <ul>
      <SearchSuggestionItem v-for="suggestion in assetStore.searchSuggestions" :suggestion="suggestion" :key="suggestion[0]"  />
    </ul>
  </main>
</template>

<style scoped>

</style>

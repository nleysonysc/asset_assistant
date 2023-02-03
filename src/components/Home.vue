<script setup>
  import SearchBar from "./SearchBar.vue"
  import searchResultItem from "./searchResultItem.vue"
  import { useAssetStore } from '../stores/assetStore'

  let assetStore = useAssetStore();
  // check auth
  // show appropriate actions for auth level

  function test() {
    console.log(assetStore.activeAsset)
  }
</script>

<template>
  <div class="greetings">
    <SearchBar />
    <ul>
      <searchResultItem v-for="result in assetStore.searchResult" :result="result" :key="result[0]"  />
    </ul>
    {{ assetStore.activeAsset }}
  </div>
  <button @click="test">test</button>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>

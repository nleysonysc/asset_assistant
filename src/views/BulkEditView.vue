<script setup>
  import Search from "../components/Search.vue"
  import { useAssetStore } from '../stores/assetStore'

  let assetStore = useAssetStore();

</script>

<template>
  <main>
    <Search />
    
    <textarea name="tags">

    </textarea>
  </main>
    
</template>

<style scoped>
</style>

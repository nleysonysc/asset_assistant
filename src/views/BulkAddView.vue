<script setup>
  import { useAssetStore } from '../stores/assetStore'

  let assetStore = useAssetStore();

</script>

<template>
  <main>
    <input type="text" name="tagPrefix" />
  </main>
    
</template>

<style scoped>
</style>

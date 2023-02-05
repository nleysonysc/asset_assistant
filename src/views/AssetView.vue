<script setup>
  import { useAssetStore } from '../stores/assetStore'
  import { useRoute } from "vue-router"

  let assetStore = useAssetStore()
  let route = useRoute()
  
  assetStore.fetchAsset(route.params.rowNum)

</script>

<template>
  <div >
    {{ assetStore.activeAsset }}
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

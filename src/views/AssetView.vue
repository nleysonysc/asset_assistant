<script setup>
  import { useAssetStore } from '../stores/assetStore'
  import { useRoute } from "vue-router"

  let assetStore = useAssetStore()
  let route = useRoute()
  
  if ("rowNum" in route.params) { assetStore.fetchAssetByRow(route.params.rowNum) }
  else if ("assetTag" in route.params) { assetStore.fetchAssetByTag(route.params.assetTag) }
</script>

<template>
  <div >
    {{ assetStore.activeAsset }}
  </div>
</template>

<style>

</style>

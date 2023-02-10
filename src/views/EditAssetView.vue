<script setup>
  import { useAssetStore } from '../stores/assetStore'
  import { useRoute } from "vue-router"

  let assetStore = useAssetStore()
  let route = useRoute()
  
  if ("rowNum" in route.params) { assetStore.fetchAssetByRow(route.params.rowNum) }
  else if ("assetTag" in route.params) { assetStore.fetchAssetByTag(route.params.assetTag) }

  // check user priv
  // show admin edit options
</script>

<template>
  <div >
    {{ assetStore.activeAsset }}
    <div>
      <span>Check In</span>
    </div>
  </div>
</template>

<style scoped>

</style>

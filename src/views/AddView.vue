<script setup>
  import { useAssetStore } from '../stores/assetStore'
  import AssetForm from '../components/AssetForm.vue'

  let assetStore = useAssetStore();

  async function onSubmit(e, values) {
    let res = await e;
    console.log(res)
    assetStore.addAsset(values)
  }

</script>

<template>
  <AssetForm :onSubmit="onSubmit"/>
</template>

<style scoped>
</style>

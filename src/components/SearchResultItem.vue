<script setup>
  import {ref} from 'vue'
  import { useAssetStore } from '../stores/assetStore'

  let assetStore = useAssetStore()
  defineProps({
    result: Array
  });

  function onClick(e, result) {
    console.log(assetStore.fetchAsset(result[0]))
  }
</script>

<template>
  <li @click="(e)=>{onClick(e, result)}">
    {{ result }}
  </li>
</template>

<style scoped>

</style>

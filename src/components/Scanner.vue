<script setup>
  import { onMounted, ref } from 'vue';
import { useAssetStore } from '../stores/assetStore'
  
  let assetStore = useAssetStore();


</script>

<template>
  <div>
    <input type="text" />
  </div>
</template>

<style scoped>

</style>
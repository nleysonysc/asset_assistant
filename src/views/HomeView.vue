<script setup>
  import { ref, watch } from 'vue'
  import { useAssetStore } from '../stores/assetStore'
  import { useRouter } from 'vue-router'
  import  QuickSearch from '../components/QuickSearch.vue'

  let assetStore = useAssetStore();


</script>

<template>
  <QuickSearch />
</template>

<style scoped>

</style>

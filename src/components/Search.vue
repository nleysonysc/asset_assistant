<script setup>
  import { ref, watch } from 'vue'
  import { useAssetStore } from '../stores/assetStore'
  import { useRouter } from 'vue-router'

  let assetStore = useAssetStore();
  let rowNum = ref()
  let router = useRouter()

  watch(rowNum, async(newv, oldv) => {
    router.push({name: 'assetByRowNum', params: {"rowNum": newv}})
  });

</script>

<template>
   <v-autocomplete
    :items="assetStore.searchSuggestions"
    v-model="rowNum"
    v-model:search="assetStore.searchTerm"
    clearable
    item-title="value"
    item-value="rowNum"
    label="Search"
    hint="Type an asset or serial number"
    hide-no-data
    density="comfortable"
  ></v-autocomplete>
</template>

<style scoped>

</style>

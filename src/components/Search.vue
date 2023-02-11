<script setup>
  import { ref, watch } from 'vue'
  import { useAssetStore } from '../stores/assetStore'
  import { useRouter } from 'vue-router'

  let assetStore = useAssetStore();
  let rowNum = ref()
  let router = useRouter()

  const props = defineProps({
    onSelect: Function
  })

  watch(rowNum, async(newRow, oldRow) => {
    if (typeof props.onSelect == "function") {props.onSelect(newRow)}
    router.push({name: 'assetByRowNum', params: {rowNum: newRow}})
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
  >
    <template v-slot:item="{ props, item }">
      <v-list-item
        v-bind="props"
        append-icon="mdi-arrow-right"
        :title="item?.raw?.value"
      ></v-list-item>
    </template>
  </v-autocomplete>
</template>

<style scoped>

</style>

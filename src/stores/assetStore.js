import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useAssetStore = defineStore('asset', () => {
  let activeAsset = ref(new Map())
  const searchResult = ref([])

  function fetchAsset(rowNum) {
    activeAsset.value = new Map([["Serial", 'FE34AH4'], ["Tag", "asdf1234"], ["RowNum", rowNum]])
    return activeAsset
  }

  function searchAssets(search) {
    searchResult.value = [[3, search], [5, 'asdf4657'], [2, 'asdf5656']]
    return searchResult
  }

  return { activeAsset, fetchAsset, searchAssets, searchResult }
})

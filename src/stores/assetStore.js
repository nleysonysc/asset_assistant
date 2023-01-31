import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAssetStore = defineStore('asset', () => {
  const activeAsset = ref([])

  function fetchAsset(rowNum) {
    return new Map([["Serial", 'FE34AH4'], ["Tag", "asdf1234"], ["RowNum", rowNum]])
  }

  function searchAssets(search) {
    return [[3, search], [5, 'asdf4657'], [2, 'asdf5656']]
  }

  return { activeAsset, fetchAsset, searchAssets }
})

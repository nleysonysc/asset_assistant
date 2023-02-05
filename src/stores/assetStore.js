import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useAssetStore = defineStore('asset', () => {
  let activeAsset = ref(new Map())
  const searchResult = ref([])
  let searchTerm = ref("")

  async function fetchAsset(rowNum) {
    activeAsset.value = new Map([["Serial", 'FE34AH4'], ["Tag", "asdf1234"], ["RowNum", rowNum]])
    return new Promise((resolve, reject) => {
      resolve(activeAsset)
      reject("Could not find asset at row "+rowNum)
    })
  }

  function searchAssets(search) {
    searchResult.value = [[3, search], [5, 'asdf4657'], [2, 'asdf5656']]
    return new Promise((resolve, reject) => {
      resolve(searchResult)
      reject("Could not find assets matching "+searchTerm.value)
    })
  }

  return { activeAsset, fetchAsset, searchAssets, searchResult, searchTerm }
})

import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

export const useAssetStore = defineStore('asset', () => {
  let activeAsset = ref(new Map())
  const searchResults = ref([])
  const searchSuggestions = ref([])
  let searchTerm = ref("")

  async function fetchAssetByRow(rowNum) {
    activeAsset.value = new Map([["Serial", 'FE34AH4'], ["Location", "room 12"], ["Tag", "asdf1234"], ["RowNum", rowNum]])
    return new Promise((resolve, reject) => {
      resolve(activeAsset)
      reject("Could not find asset at row "+rowNum)
    })
  }

  async function fetchAssetByTag(tag) {
    activeAsset.value = new Map([["Serial", 'FE34AH4'], ["Location", "room 12"], ["Tag", tag], ["RowNum", 5]])
    return new Promise((resolve, reject) => {
      resolve(activeAsset)
      reject("Could not find asset with tag "+tag)
    })
  }

  async function fetchSearch(){
    searchResults.value = [
      new Map([["Serial", 'FE34AH4'], ["Tag", tag], ["RowNum", 5]]),
      new Map([["Serial", 'FE34AH4'], ["Tag", tag], ["RowNum", 5]]),
      new Map([["Serial", 'FE34AH4'], ["Tag", tag], ["RowNum", 5]]),

    ]
    return new Promise((resolve, reject) => {
      resolve(activeAsset)
      reject("Could not find asset with tag "+tag)
    })
  }

  watch(searchTerm, async(newTerm, oldTerm) => {
    // fetch from backend and update search result
    if (newTerm.length > 2) {
      searchSuggestions.value = [[3, newTerm], [5, 'asdf4657'], [2, 'asdf5656']]
    }
  })

  return { activeAsset, fetchAssetByRow, fetchAssetByTag, searchSuggestions, searchTerm }
})

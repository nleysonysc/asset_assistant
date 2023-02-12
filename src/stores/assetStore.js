import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

export const useAssetStore = defineStore('asset', () => {
  let activeAsset = ref(new Map())
  const searchResults = ref([])
  const searchSuggestions = ref([])
  let searchTerm = ref("")
  let loading = ref(false)

  async function fetchAssetByRow(rowNum) {
    if (import.meta.env.DEV) {
      activeAsset.value = new Map([["Serial", 'FE34AH4'], ["Location", "room 12"], ["Tag", "asdf1234"], ["RowNum", rowNum]])
      return new Promise((resolve, reject) => {
        resolve(activeAsset)
        reject("Could not find asset at row "+rowNum)
      })
    }
    
    google.script.run.withSuccessHandler(response=> {activeAsset.value = response.result}).getAssetByRow(rowNum);
  }

  async function fetchAssetByTag(tag) {
    if (import.meta.env.DEV) {
      activeAsset.value = new Map([["Serial", 'FE34AH4'], ["Location", "room 12"], ["Tag", tag], ["RowNum", 5]])
      return new Promise((resolve, reject) => {
        resolve(activeAsset)
        reject("Could not find asset with tag "+tag)
      })
    }

    google.script.run.withSuccessHandler(response=> {activeAsset.value = response.result}).getAssetByTag();

  }

  async function fetchAssetBySerial(serialNum) {
    if (import.meta.env.DEV) {
      activeAsset.value = new Map([["Serial", serialNum], ["Location", "room 12"], ["Tag", 'tag'], ["RowNum", 5]])
      return new Promise((resolve, reject) => {
        resolve(activeAsset)
        reject("Could not find asset with tag "+tag)
      })
    }

    google.script.run.withSuccessHandler(response=> {activeAsset.value = response.result}).getAssetBySerial();
  }

  async function fetchSearch(){
    if (import.meta.env.DEV) {
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

    google.script.run.withSuccessHandler(response=> {activeAsset.value = response.result}).getAssetBySerial();
  }

  watch(searchTerm, async(newTerm, oldTerm) => {
    // fetch from backend and update search result
    if (newTerm.length > 2) {
      if (import.meta.env.DEV) {
        searchSuggestions.value = [
          {rowNum: 1, headerName: 'Asset', value: newTerm},
          {rowNum: 7, headerName: 'Asset', value: 'asdf4657'},
          {rowNum: 4, headerName: 'Asset', value: 'asdf5656'}
        ]
      }
      google.script.run.withSuccessHandler(result=> {searchSuggestions.value = result}).searchByHeaderNames(newTerm);
    }
  })

  return { fetchAssetBySerial, activeAsset, fetchAssetByRow, fetchAssetByTag, searchSuggestions, searchTerm, loading }
})

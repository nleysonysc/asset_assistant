<script setup>
  import { ref, watch } from 'vue'
  import { useAssetStore } from '../stores/assetStore'

  let assetStore = useAssetStore();

  let serial = ref('')
  let hwType = ref('');
  let location = ref('');
  let model = ref('');
  let description = ref('');
  let owner = ref('');
  let fundingNumber = ref('');
  let fundingYear = ref('');
  let form = ref()
  let attributeSearchSuggestions = ref([])
  let attributeSearch = ref("")
  let attributeHeader = ref("")
  let loadingSearch = ref(false)


  let required = [
    (value) => {if (value) return true; return "Please fill out this field."}
  ];

  async function onSubmit(e, values) {
    let res = await e;
    console.log(res)
    assetStore.addAsset(values, addSuccess, addFailure)
  }

  async function addSuccess(e){
    form.value.reset()
  }

  async function addFailure(e){
    alert(e)
    console.log(e)
  }

  function isLoading(){

  }

  async function attributeSearchSuggestionsHandler(response) {
    loadingSearch.value = false
    response = JSON.parse(response)
    console.log(response)
    if ('error' in response) {
      console.log(response.error)
    }
    else {
      attributeSearchSuggestions.value = response.result
    }
  }

  watch(attributeSearch, async(newTerm) => {
    // fetch search suggestions from backend
    console.log(attributeSearch.value)
    console.log(attributeHeader.value)
    if (newTerm.length > 2) {
      if (import.meta.env.DEV) {
        attributeSearchSuggestions.value = ['Headphones', 'Chromebook']
      }
      else {
        loadingSearch.value = true
        google.script.run.withSuccessHandler(attributeSearchSuggestionsHandler).getAttributeSearchSuggestions(attributeSearch.value, attributeHeader.value);
      }
    }
  })

</script>

<template>
  <v-form ref="form" @submit.prevent="(e)=> {
      onSubmit(e, {
        'Serial': serial,
        'Hardware_Type': hwType,
        'Description': description,
        'Location': location,
        'Funding_Number': fundingNumber,
        'Funding_Year': fundingYear, 
        'Model': model, 
        'Owner': owner,
      })
    }"
  >
    <v-text-field
      v-model="serial"
      label="Serial Number"
    ></v-text-field>

    <v-autocomplete
      :items="attributeSearchSuggestions"
      v-model="hwType"
      v-model:search="attributeSearch"
      @update:search="_=> {attributeHeader = 'Hardware_Type'}"
      hide-no-data
      clearable
      label="Hardware Type"
      hint="Ex. Headphones, Chromebook, etc."
      :rules="required"
    >
    </v-autocomplete>

    <v-autocomplete
      :items="attributeSearchSuggestions"
      v-model="model"
      v-model:search="attributeSearch"
      @update:search="_=> {attributeHeader = 'Model'}"
      hide-no-data
      clearable
      label="Model"
      hint="Device Make/Model, ex Dell 3100"
      :rules="required"
    >
    </v-autocomplete>

    <v-autocomplete
      :items="attributeSearchSuggestions"
      v-model="location"
      v-model:search="attributeSearch"
      @update:search="_=> {attributeHeader = 'Location'}"
      hide-no-data
      clearable
      label="Location"
      hint="The location where the device should be kept."
      :rules="required"
    >
    </v-autocomplete>

    <h2>Optional Fields</h2>
    <v-expansion-panels multiple>
      <v-expansion-panel title="E-rate">
        <v-expansion-panel-text>
          <v-autocomplete
            :items="attributeSearchSuggestions"
            v-model="fundingNumber"
            v-model:search="attributeSearch"
            @update:search="_=> {attributeHeader = 'Funding_Number'}"
            hide-no-data
            clearable
            label="Funding Number"
          >
          </v-autocomplete>
          <v-text-field
            v-model="fundingYear"
            label="Funding Year"
          ></v-text-field>
        </v-expansion-panel-text>
      </v-expansion-panel>
      <v-expansion-panel title="Description">
        <v-expansion-panel-text>
          <v-textarea
            v-model="description"
            label="Description"
          ></v-textarea>
        </v-expansion-panel-text>
      </v-expansion-panel>
      <v-expansion-panel title="Owner">
        <v-expansion-panel-text>
          <v-autocomplete
            :items="attributeSearchSuggestions"
            v-model="owner"
            v-model:search="attributeSearch"
            @update:search="_=> {attributeHeader = 'Owner'}"
            hide-no-data
            clearable
            label="Owner"
          >
          </v-autocomplete>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-btn
      class="ma-4"
      type="submit"
    >
      submit
    </v-btn>
  </v-form>
</template>

<style scoped>
</style>

<script setup>
  import { ref } from 'vue'
  import { useAssetStore } from '../stores/assetStore'

  let assetStore = useAssetStore();

  let props = defineProps({
    onSubmit: Function,
    asset: Object
  });

  let serial = ref('')
  let hwType = ref('');
  let location = ref('');
  let model = ref('');
  let description = ref('');
  let owner = ref('');
  let fundingNumber = ref('');
  let fundingYear = ref('');

  let required = [
    (value) => {if (value) return true; return "Please fill out this field."}
  ];

</script>

<template>
  <v-form @submit.prevent="(e)=> {
      props.onSubmit(e, {
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
      :rules="required"
    ></v-text-field>

    <v-text-field
      v-model="hwType"
      label="Hardware Type"
      :rules="required"
    ></v-text-field>

    <v-text-field
      v-model="location"
      label="Location"
      :rules="required"
    ></v-text-field>

    <v-text-field
      v-model="model"
      label="Model"
      :rules="required"
    ></v-text-field>
    <h2>Optional Fields</h2>
    <v-expansion-panels multiple>
      <v-expansion-panel title="E-rate">
        <v-expansion-panel-text>
          <v-text-field
            v-model="fundingNumber"
            label="Funding Number"
          ></v-text-field>
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
          <v-textarea
            v-model="owner"
            label="Owner"
          ></v-textarea>
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

<script setup>
  import { watch } from 'vue'
  import { useAssetStore } from '../stores/assetStore'
  import { useRoute } from "vue-router"

  let assetStore = useAssetStore()
  let route = useRoute()
  
  if ("rowNum" in route.params) { 
    watch(_=> route.params.rowNum, async (newRowNum) => {
      if (newRowNum){
        assetStore.fetchAssetByRow(newRowNum)
      }
    }, {immediate: true})
  }
  else if ("assetTag" in route.params) { 
    assetStore.fetchAssetByTag(route.params.assetTag)
  }
</script>

<template>
    <v-row>
      <v-col>
        <span>Show basic info (location, user, checked in, etc) {{ assetStore.activeAsset.get("Location") }}</span>
      </v-col>
      <v-col>
        <v-list nav>
          <v-list-item v-if="assetStore.activeAsset.get('Checked_In')"><v-btn>Check Out</v-btn></v-list-item>
          <v-list-item v-else><v-btn>Check In</v-btn></v-list-item>
          <v-list-item>
            <v-btn :disabled="assetStore.loading">
              <a :href="`https://mail.google.com/mail/?view=cm&to=helpdesk@yescharteracademy.org&su=${encodeURIComponent('Tag: '+assetStore.activeAsset.get('Tag'))}&body=`" target="_blank">Submit Ticket</a>
            </v-btn>
          </v-list-item>
        </v-list>
      </v-col>

    </v-row>
</template>

<style scoped>
</style>

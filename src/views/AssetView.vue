<script setup>
  import { watch, ref } from 'vue'
  import { useAssetStore } from '../stores/assetStore'
  import { useRoute } from "vue-router"
  import UserSearch from '../components/UserSearch.vue'

  let assetStore = useAssetStore()
  let route = useRoute()
  let showCheckout = ref(false)

  if ("rowNum" in route.params) { 
    assetStore.fetchAssetByRow(route.params.rowNum)
  }
  else if ("assetTag" in route.params) { 
    assetStore.fetchAssetByTag(route.params.assetTag)
  }
  watch(_=> route.params.rowNum, async (newRowNum) => {
    if (newRowNum){
      assetStore.fetchAssetByRow(newRowNum)
    }
  })
  watch(_=> route.params.assetTag, async (newAssetTag) => {
    if (newAssetTag){
      assetStore.fetchAssetByTag(newAssetTag)
    }
  })

  function onUserCheckout(userVal){
    showCheckout.value = false
    assetStore.updateActiveAsset({'Checked_In': false, 'User': userVal})
  }
</script>

<template>
  <v-row justify="center" v-if="assetStore.loadingAsset">
    <v-progress-circular size="50" indeterminate></v-progress-circular>
  </v-row>
  <v-row v-else>
      <v-col>
        <v-list nav>
          <v-list-item v-if="assetStore.activeAsset.get('Checked_In')">
            <v-btn variant="outlined">Check Out
              <v-dialog
                  v-model="showCheckout"
                  activator="parent"
                  width="w-100"
              >
                  <v-card>
                  <v-card-actions>
                      <v-icon color="secondary">mdi-tag-arrow-down</v-icon>
                       <span class="text-h6 mx-2">
                        Check Out
                       </span>
                      <v-spacer></v-spacer>
                      <v-btn @click="showCheckout = false">
                      <v-icon>mdi-close-circle-outline</v-icon>
                      </v-btn>
                  </v-card-actions>
                  <UserSearch :onSubmit="onUserCheckout" buttonText="Check Out" />
                  </v-card>
              </v-dialog>
            </v-btn>
          </v-list-item>
          <v-list-item v-else>
            <v-btn variant="outlined">
              Check In
            </v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn variant="outlined">
              <a :href="'https://mail.google.com/mail/?view=cm&to=helpdesk@yescharteracademy.org&su='+encodeURIComponent('Tag: '+assetStore.activeAsset.get('Tag'))+'&body='" target="_blank">Submit Ticket</a>
            </v-btn>
          </v-list-item>
        </v-list>
      </v-col>
      <v-col>
        <v-list>
          <v-list-item v-for="entry in assetStore.activeAsset.entries()">
            {{ entry[0] }}: {{ entry[1] }}
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
</template>

<style scoped>
</style>

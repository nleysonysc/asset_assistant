<script setup>
  import { onMounted, ref } from 'vue';
  import { RouterLink, RouterView, useRouter } from 'vue-router'
  import { useUserStore } from './stores/userStore'
  import MobileScanner from "./components/MobileScanner.vue"
  import Scanner from "./components/Scanner.vue"
  import AdminNav from "./components/admin/AdminNav.vue"
  import Search from './components/Search.vue'

  let userStore = useUserStore();
  userStore.fetchActiveUser();
  let router = useRouter()

  let mobileScanner = ref(false);
  onMounted(()=>{
    mobileScanner.value = "BarcodeDetector" in window ? true : false;
  });

  let darkMode = ref(true);
  let showSearchDialog = ref(false);
  let showMobileScanner = ref(false);
  let showScanner = ref(false);
</script>

<template>
  <v-theme-provider :theme="darkMode ? 'dark' : 'light'">
  <v-app>
    <v-main>
      <v-container fluid>
        <v-app-bar app dense>
          <v-app-bar-title>
            <RouterLink to="/"><v-btn><v-icon size="x-large">mdi-home</v-icon></v-btn></RouterLink>
          </v-app-bar-title>
          
          <v-btn @click="_=> showSearchDialog = true">
            <v-icon size="x-large">mdi-magnify</v-icon>
          </v-btn>

          <v-btn @click="mobileScanner ? _=> showMobileScanner = true : _=> false">
            <v-icon size="medium" :color="mobileScanner ? '' : 'error'">{{ mobileScanner ? 'mdi-cellphone-screenshot' : 'mdi-cellphone-off' }}</v-icon>
            <v-icon size="medium" :color="mobileScanner ? '' : 'error'">mdi-barcode</v-icon>
          </v-btn>

          <v-btn @click="showScanner = true">
            <v-icon size="x-large">mdi-tag-arrow-right</v-icon>
          </v-btn>

          <v-btn @click="_=> darkMode = !darkMode">
            <v-icon size="x-large">mdi-brightness-4</v-icon>
          </v-btn>

          <AdminNav v-if="userStore.activeUser?.auth === 'ADMIN'" />

        </v-app-bar>

        <v-dialog
          v-model="showSearchDialog"
          width="w-100"
        >
          <v-card>
            <v-card-actions>
              <v-icon color="secondary">mdi-magnify</v-icon>
              <v-spacer></v-spacer>
              <v-btn @click="showSearchDialog = false">
                <v-icon>mdi-close-circle-outline</v-icon>
              </v-btn>
            </v-card-actions>
            <Search :onSelect="_=> showSearchDialog = false" />
          </v-card>
        </v-dialog>

        <v-dialog
          v-model="showMobileScanner"
          width="w-100"
        >
          <v-card>
            <v-card-actions>
              <v-icon color="secondary">mdi-barcode-scan</v-icon>
              <v-spacer></v-spacer>
              <v-btn @click="showMobileScanner = false">
                <v-icon>mdi-close-circle-outline</v-icon>
              </v-btn>
            </v-card-actions>
            <MobileScanner />
          </v-card>
        </v-dialog>

        <v-dialog
          v-model="showScanner"
          width="w-100"
        >
          <v-card>
            <v-card-actions>
              <v-icon color="secondary">mdi-tag-arrow-right</v-icon>
              <v-spacer></v-spacer>
              <v-btn @click="showScanner = false">
                <v-icon>mdi-close-circle-outline</v-icon>
              </v-btn>
            </v-card-actions>
            <Scanner :onNavigate="_=> showScanner = false" />
          </v-card>
        </v-dialog>

        <RouterView />
      </v-container>
    </v-main>
  </v-app>
</v-theme-provider>
</template>

<style scoped>
  a:visited {
    color: inherit;
  }

</style>

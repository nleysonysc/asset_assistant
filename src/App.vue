<script setup>
  import { onMounted, ref } from 'vue';
  import { RouterLink, RouterView, useRouter } from 'vue-router'
  import { useUserStore } from './stores/userStore'
  import { useDisplay } from 'vuetify'
  import MobileScanner from "./components/MobileScanner.vue"
  import QuickScan from "./components/QuickScan.vue"
  import AdminNav from "./components/admin/AdminNav.vue"
  import QuickSearch from './components/QuickSearch.vue'

  let userStore = useUserStore();
  userStore.fetchActiveUser();
  let router = useRouter()
  let drawer = ref(false)

  const { xs } = useDisplay()

  let mobileScanner = ref(false);
  onMounted(()=>{
    console.log(useDisplay.value)
    mobileScanner.value = "BarcodeDetector" in window ? true : false;
    router.push('/')
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
        <v-app-bar app :collapse="xs ? true : false">
          <v-app-bar-nav-icon v-if="xs" variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
          <v-app-bar-title>
            <RouterLink to="/"><v-btn><v-icon size="x-large">mdi-home</v-icon></v-btn></RouterLink>
          </v-app-bar-title>

          <AdminNav v-if="userStore.activeUser?.auth === 'ADMIN'" />
          
          <v-btn @click="_=> showSearchDialog = true">
            <v-icon size="x-large">mdi-magnify</v-icon>
          </v-btn>

          <v-btn @click=" _=> {if (mobileScanner) {showMobileScanner = true}}">
            <v-icon size="medium" :color="mobileScanner ? '' : 'error'">{{ mobileScanner ? 'mdi-cellphone-screenshot' : 'mdi-cellphone-off' }}</v-icon>
            <v-icon size="medium" :color="mobileScanner ? '' : 'error'">mdi-barcode</v-icon>
          </v-btn>

          <v-btn @click="showScanner = true">
            <v-icon size="x-large">mdi-tag-arrow-right</v-icon>
          </v-btn>

          <v-btn @click="_=> darkMode = !darkMode">
            <v-icon size="x-large">mdi-brightness-4</v-icon>
          </v-btn>

        </v-app-bar>

        <v-navigation-drawer
          v-model="drawer"
          location="bottom"
          temporary
        >
          <v-btn class="w-100 my-2" @click="_=> darkMode = !darkMode">
            <v-icon size="x-large">mdi-brightness-4</v-icon>
            Dark Mode
          </v-btn>

          <v-btn class="w-100  my-2" @click="_=> showSearchDialog = true">
            <v-icon size="x-large">mdi-magnify</v-icon>
            Quick Search
          </v-btn>

          <v-btn class="w-100 my-2" @click=" _=> {if (mobileScanner) {showMobileScanner = true}}">
            <v-icon size="medium" :color="mobileScanner ? '' : 'error'">{{ mobileScanner ? 'mdi-cellphone-screenshot' : 'mdi-cellphone-off' }}</v-icon>
            <v-icon size="medium" :color="mobileScanner ? '' : 'error'">mdi-barcode</v-icon>
             Mobile Scan
          </v-btn>

          <v-btn class="w-100 my-2" @click="showScanner = true">
            <v-icon size="x-large">mdi-tag-arrow-right</v-icon>
            Quick Scan
          </v-btn>
        </v-navigation-drawer>

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
            <QuickSearch :onSelect="_=> showSearchDialog = false" />
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
            <MobileScanner :onNavigate="_=> showMobileScanner = false" />
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
            <QuickScan :onNavigate="_=> showScanner = false" />
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

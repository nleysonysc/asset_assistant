<script setup>
  import { useUserStore } from '../../stores/userStore';
  import { RouterLink } from 'vue-router'

  let userStore = useUserStore();
</script>

<template>
  <v-btn
      color="secondary"
    >
      <v-icon size="x-large">mdi-tools</v-icon>
      <v-menu activator="parent">
        <v-list>
          <v-list-item>
            <RouterLink :to="{name: 'bulkcheckin'}">Check In</RouterLink>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-btn>
</template>

<style scoped>
  ul {
    list-style-type: none;
  }
</style>
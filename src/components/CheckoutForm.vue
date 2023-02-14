<script setup>
    import { ref, watch } from 'vue'
    import { useUserStore } from '../stores/userStore'
    import { useAssetStore } from '../stores/assetStore'
    import UserSearch from './UserSearch.vue'

    let assetStore = useAssetStore()
    let userStore = useUserStore()

    // user search box
    // submit update
    function onUserSelect(userVal) {
        console.log(userVal)
    }
</script>

<template>
    <UserSearch :onSelect="onUserSelect" />
</template>


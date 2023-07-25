<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useUserStore } from './stores/user'
import { storeToRefs } from 'pinia';

const useUser = useUserStore()
const { logoutUser } = useUser
const { userData } = useUser

</script>

<template>
  <a-layout>
    <a-layout-header v-if="!useUser.loadingSession">
      <nav>
        <RouterLink to="/" v-if="userData.email">Home</RouterLink>
        <RouterLink to="/login" v-if="!userData.email">login</RouterLink>
        <RouterLink to="/register" v-if="!userData.email">Register</RouterLink>
        <button @click="logoutUser" v-if="userData.email">Logout</button>
      </nav>
    </a-layout-header>
    <a-layout-content v-if="useUser.loadingSession">
      <div>
        Loading User...
      </div>
    </a-layout-content>
    <RouterView />
  </a-layout>
</template>

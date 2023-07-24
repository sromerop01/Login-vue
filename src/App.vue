<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useUserStore } from './stores/user'
import { storeToRefs } from 'pinia';

const useUser = useUserStore()
const { logoutUser } = useUser
const { userData } = useUser

</script>

<template>
  <header>

    <div class="wrapper">
      <nav v-if="!useUser.loadingSession">
        <RouterLink to="/" v-if="userData">Home</RouterLink>
        <RouterLink to="/login" v-if="!userData">login</RouterLink>
        <RouterLink to="/register" v-if="!userData">Register</RouterLink>
        <button @click="logoutUser" v-if="userData">Logout</button>
      </nav>
      <div v-else>
        Loading User...
      </div>
    </div>
  </header>
  <RouterView />
</template>

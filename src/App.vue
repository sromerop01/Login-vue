<template>
  <a-layout>
    <a-layout-header v-if="!useUser.loadingSession">
      <a-menu
        theme="dark"
        mode="horizontal"
        :style="{ lineHeight: '64px' }"
        v-model:selectedKeys="selectedKeys"
      >
        <a-menu-item v-if="userData.email" key="home">
          <RouterLink to="/">Home</RouterLink>
        </a-menu-item>
        <a-menu-item v-if="!userData.email" key="login">
          <RouterLink to="/login">login</RouterLink>
        </a-menu-item>
        <a-menu-item v-if="!userData.email" key="register">
          <RouterLink to="/register">Register</RouterLink>
        </a-menu-item>
        <a-menu-item v-if="userData.email" @click="logoutUser">
          Logout
        </a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout-content style="padding: 0 50px">
      <div :style="{ background: '#fff', padding: '24px', minHeight: '280px' }">
        <div v-if="useUser.loadingSession">Loading User...</div>
        <RouterView/>
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useUserStore } from './stores/user'
import { useRoute } from "vue-router";
import { ref, watch } from 'vue';

const route = useRoute()
const useUser = useUserStore()
const { logoutUser } = useUser
const { userData } = useUser

const selectedKeys = ref([])

watch(() => route.name, () => selectedKeys.value = [route.name])

</script>
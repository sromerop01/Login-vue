<template>
    <div>
        <h1>Home</h1>
        <p>{{userData?.email}}</p>
    </div>
</template>

<script setup>
import { useUserStore } from '../stores/user';
const useUser = useUserStore()
const { userData } = useUser
</script>
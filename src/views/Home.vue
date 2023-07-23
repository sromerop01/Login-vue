<template>
    <div>
        <h1>Home</h1>
        <p>{{userData?.email}}</p>
        <ul>
            <li v-for="(item, index) in documents" :key="item.id">
                {{ item.name }} - {{ item.id }}
                {{ item.short }}
            </li>
        </ul>
    </div>
</template>

<script setup>
import { useUserStore } from '../stores/user'
import { useDatabaseStore } from "../stores/database";
const useUser = useUserStore()
const { userData } = useUser
const useDB = useDatabaseStore()
const { documents } = useDB
const { getUrls } = useDB

getUrls()

</script>
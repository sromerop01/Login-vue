<template>
    <div>
        <h1>Home</h1>
        <p>{{userData?.email}}</p>
        <p v-if="loadingDoc">loading Doc...</p>
        <ul v-else>
            <li v-for="(item, index) in documents" :key="item.id">
                {{ item.name }} - {{ item.id }}
                {{ item.short }}
            </li>
        </ul>
    </div>
</template>

<script setup>
import { useUserStore } from '../stores/user'
import { useDatabaseStore } from "../stores/database"
import { storeToRefs } from 'pinia';

const useUser = useUserStore()
const { userData } = useUser
const useDB = useDatabaseStore()
const { documents, loadingDoc } = storeToRefs(useDB)
const { getUrls } = useDB

getUrls()

</script>
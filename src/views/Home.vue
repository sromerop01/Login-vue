<template>
    <div>
        <h1>Home</h1>
        <p>{{userData?.email}}</p>
        <form @submit.prevent="handleSubmit">
            <input type="text" placeholder="Ingrese URL" v-model="url">
            <button type="submit">Agregar</button>
        </form>

        <p v-if="loadingDoc">loading Doc...</p>
        <ul v-else>
            <li v-for="item in documents" :key="item.id">
                {{ item.id }}
                <br>
                {{ item.name }}
                <br>
                {{ item.short }}
                <br>
                <button @click="deleteUrl(item.id)">Eliminar</button>
                <button @click="router.push(`/edit/${item.id}`)">Editar</button>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { useUserStore } from '../stores/user'
import { useDatabaseStore } from "../stores/database"
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useRouter } from "vue-router";

const router = useRouter()

const useUser = useUserStore()
const { userData } = useUser

const useDB = useDatabaseStore()
const { documents, loadingDoc } = storeToRefs(useDB)
const { getUrls, addUrl, deleteUrl } = useDB

getUrls()

const url = ref('')
const handleSubmit = () => {
    //Validaciones de la url...
    addUrl(url.value)
}

</script>
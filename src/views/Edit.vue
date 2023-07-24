<template lang="">
    <div>
        <h1>EDITAR</h1>
        <form @submit.prevent="handleSubmit">
            <input type="text" placeholder="Ingrese URL" v-model="url">
            <button type="submit">Editar</button>
        </form>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router"
import { useDatabaseStore } from "../stores/database"

const route = useRoute()
const useDB = useDatabaseStore()
const { readUrl, updateUrl } = useDB

const handleSubmit = () =>{
    //validaciones del input
    updateUrl(route.params.id, url.value)
    
}

const url = ref('')
onMounted(async () => {
    url.value = await readUrl(route.params.id)
})

</script>
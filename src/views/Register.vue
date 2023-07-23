<template>
    <div>
        <h1>Register</h1>
        <form @submit.prevent="handleSubmit">
            <input type="email" placeholder="Ingrese email" v-model.trim="email">
            <input type="password" placeholder="Ingrese contraseña" v-model.trim="password">
            <button type="submit" :disabled="loadingUser">Crear Usuario</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from "../stores/user"
import { storeToRefs } from 'pinia';
//import { useRoute, useRouter } from 'vue-router'

const useUser = useUserStore()
const { loadingUser } = storeToRefs(useUser)
const { registerUser } = useUser
//const router = useRouter()

    const email = ref('')
    const password = ref('')

    const handleSubmit = async () => {
        try {
            if(!email.value || password.value.length < 6 ){
            return alert('Llena los campos')
            }
            await registerUser(email.value, password.value)
            //router.push('/')
        } catch (error) {
           console.log(error) 
        }
    }
</script>
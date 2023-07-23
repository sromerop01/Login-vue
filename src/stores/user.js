import { defineStore } from 'pinia'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from '../firebaseConfig'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

export const useUserStore = defineStore('user', () =>{
    const router = useRouter()
    const userData = reactive({
        email: null,
        uid:null
    })
    const loadingUser = ref(false)
    const loadingSession = ref(false)
    
    const registerUser = async (email, password) => {
        loadingUser.value = true
        try {
            const {user} = await createUserWithEmailAndPassword(auth, email, password)
            userData.email = user.email
            userData.uid = user.uid
            router.push('/')
        } catch (error) {
            console.log(error)
        } finally {
            loadingUser.value = false
        }
    }

    const loginUser = async (email, password) => {
        loadingUser.value = true
        try {
            const {user} = await signInWithEmailAndPassword(auth, email, password)
            userData.email = user.email
            userData.uid = user.uid
            router.push('/')
        } catch (error) {
            console.log(error)
        } finally {
            loadingUser.value = false
        }
    }

    const logoutUser = async () => {
        try {
            await signOut(auth)
            userData.email = null
            userData.uid = null
            router.push('/login')
        } catch (error) {
            console.log(error)
        }
    }
    const currentUser = () =>{
        return new Promise((resolve, reject) => {
           const unsubcribe = onAuthStateChanged(auth, user =>{
                if (user) {
                    userData.email = user.email
                    userData.uid = user.uid
                }else {
                    userData.email = null
                    userData.uid = null
                }
                resolve(user)
            }, e => reject(e))
            unsubcribe()
        })
    }

    return{
        userData,
        loadingUser,
        loadingSession,
        registerUser,
        loginUser,
        logoutUser,
        currentUser
    }
})
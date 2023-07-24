import { collection, getDocs, query, where } from "firebase/firestore/lite";
import { defineStore } from "pinia";
import { ref } from "vue";
import { auth, db } from "../firebaseConfig";

export const useDatabaseStore = defineStore('database', () =>{
    const documents = ref([])
    const loadingDoc = ref(false)

    const getUrls = async () => {
        // if (documents.value.length !== 0) {
        //     return
        // }
        loadingDoc.value = true
        try {
            const q = query(collection(db, 'urls'), where('user', '==', auth.currentUser.uid))
            const querySnapshot = await getDocs(q)
            querySnapshot.forEach(doc => {
                console.log(doc.id, doc.data())
                documents.value.push({
                    id: doc.id,
                    ...doc.data()
                })
            })
        } catch (error) {
            console.log(error)
        } finally {
            loadingDoc.value = false
        }
    }

    function $reset() {
        documents.value = []
        loadingDoc.value = false
      }

    return{
        documents,
        loadingDoc,
        getUrls,
        $reset
    }
})
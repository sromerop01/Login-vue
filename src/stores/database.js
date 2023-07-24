import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, where } from "firebase/firestore/lite";
import { defineStore } from "pinia";
import { ref } from "vue";
import { auth, db } from "../firebaseConfig";
import { nanoid } from "nanoid";

export const useDatabaseStore = defineStore('database', () =>{
    const documents = ref([])
    const loadingDoc = ref(false)

    const getUrls = async () => {
        if (documents.value.length !== 0) {
            return
        }
        loadingDoc.value = true
        try {
            const q = query(collection(db, 'urls'), where('user', '==', auth.currentUser.uid))
            const querySnapshot = await getDocs(q)
            querySnapshot.forEach(doc => {
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
    const addUrl = async (name) => {
        try {
            const objDoc = {
                name: name,
                short: nanoid(6),
                user: auth.currentUser.uid
            }
            const docRef = await addDoc(collection(db, "urls"), objDoc)
            documents.value.push({
                ...objDoc,
                id: docRef.id
            })
        } catch (error) {
            console.log(error);
        } finally {

        }
    }
    const deleteUrl = async (id) => {
        try {
            const docRef = doc(db, 'urls', id)
            const docSnap = await getDoc(docRef)
            if (!docSnap.exists()) {
                throw new Error('No existe el doc')
            }
            if(docSnap.data().user !== auth.currentUser.uid){
                throw new Error('Doc invalido en la secion')
            }
            await deleteDoc(docRef)
            documents.value = documents.value.filter(item => item.id !== id)
        } catch (error) {
            console.log(error.message);
        }finally{

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
        addUrl,
        deleteUrl,
        $reset
    }
})
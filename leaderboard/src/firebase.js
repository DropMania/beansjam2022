import { initializeApp } from 'firebase/app'
import {
    getFirestore,
    collection,
    query,
    getDocs,
    orderBy
} from 'firebase/firestore'

const app = initializeApp({
    apiKey: 'AIzaSyARrRzV7Q-j10oXV-aPlwVdzo9wEPkFvUM',
    authDomain: 'cr-leaderboard.firebaseapp.com',
    projectId: 'cr-leaderboard',
    storageBucket: 'cr-leaderboard.appspot.com',
    messagingSenderId: '419988449291',
    appId: '1:419988449291:web:c5a552f51b60407acbbf0e',
    measurementId: 'G-RXS9VBKBRB'
})
const db = getFirestore(app)

export async function getHighScores() {
    const q = query(collection(db, 'highscores'), orderBy('highscore', 'desc'))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map((doc) => doc.data())
}

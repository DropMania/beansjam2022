import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js'
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js'
import {
    getFirestore,
    collection,
    setDoc,
    doc,
    query,
    getDocs,
    getDoc,
    orderBy,
    limit
} from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js'
import fb_config from './fb_config.js'

const app = initializeApp(fb_config)
const db = getFirestore(app)
export async function setEntry(highscore) {
    if (localStorage.getItem('twitchUsername')) {
        const docRef = doc(
            db,
            'highscores',
            localStorage.getItem('twitchUsername')
        )
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            const data = docSnap.data()
            if (data.highscore < highscore) {
                await setDoc(docRef, {
                    name: localStorage.getItem('twitchUsername'),
                    highscore
                })
            }
        } else {
            await setDoc(docRef, {
                name: localStorage.getItem('twitchUsername'),
                highscore
            })
        }
    }
}
export async function getHighScores() {
    const q = query(
        collection(db, 'highscores'),
        orderBy('highscore', 'desc'),
        limit(10)
    )
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map((doc) => doc.data())
}

import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
export default await import('./serviceAccountKey.json', {
    assert: { type: 'json' }
}).then(serviceAccountKey =>
    getAuth(initializeApp({ credential: cert(serviceAccountKey) }))
).catch(_ => {
    console.log("Error getting ./serviceAccountKey.json");
    console.log("Developer mode bypass firebase");
    return {
        verifyIdToken: token => {
            console.log("Token: " + token);
            return {
                uid: token
            }
        }
    }
});
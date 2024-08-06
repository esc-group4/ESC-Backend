import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
export default await import("./serviceAccountKey.json", {
  assert: { type: "json" },
})
  .then((serviceAccountKey) => {
    console.log("Successfully loaded ./serviceAccountKey.json");
    return getAuth(
      initializeApp({ credential: cert(serviceAccountKey.default) })
    );
  })
  .catch((err) => {
    console.log("Error getting ./serviceAccountKey.json: " + err);
    console.log("Developer mode bypass firebase");
    return {
      verifyIdToken: (token) => {
        console.log("Token: " + token);
        return {
          uid: token,
        };
      },
    };
  });

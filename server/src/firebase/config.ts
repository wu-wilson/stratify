import admin from "firebase-admin";
import fs from "fs";

if (!admin.apps.length) {
  const serviceAccountJson = fs.readFileSync(
    `${__dirname}/service-account.json`,
    "utf8"
  );
  const serviceAccount = JSON.parse(serviceAccountJson);

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default admin;

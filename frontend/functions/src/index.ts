// Rails サーバーでカスタムトークンを生成するようにしたため使っていない

import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

exports.fetchCustomToken = functions
    .region("asia-northeast1")
    .runWith({
      secrets: ["FSA_PROJECT_ID", "FSA_PRIVATE_KEY", "FSA_CLIENT_EMAIL"],
    })
    .https.onRequest(async (request, response) => {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FSA_PROJECT_ID,
          privateKey: process.env.FSA_PRIVATE_KEY!.replace(/\\n/g, "\n"),
          clientEmail: process.env.FSA_CLIENT_EMAIL,
        }),
      });

      const userId = request.body.userId;

      // userIdが不正の場合はエラーで終了
      if (typeof userId !== "string") {
        console.log("userId is not string");
        response.status(404).send({
          data: {error: "userId is not string"},
        });
        return;
      }

      const customToken = await admin.auth().createCustomToken(userId);
      response.status(200).send({
        data: {customToken: customToken},
      });
    });

const { app } = require('@azure/functions');
const { initializeApp } = require('firebase-admin/app');
const { credential } = require('firebase-admin');
const { getAuth } = require('firebase-admin/auth');
const serviceAccount = require("../../patricio-website-firebase-adminsdk-qn7p6-8bc2e6b7f1.json");

app.http('saveImages', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);
        const result = await request.json()
        const idToken = '';

        const firebase = initializeApp({
            credential: credential.cert(serviceAccount)
        });
        const decodedToken = await getAuth(firebase).verifyIdToken(idToken)
        const uid = decodedToken.uid;
        context.log(`uid: "${uid}"`);


        return { body: `Hello, ${result.hey}!` };
    }
});

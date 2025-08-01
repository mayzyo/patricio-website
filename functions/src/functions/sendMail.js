const { app } = require('@azure/functions')
const { initializeApp, getApps, getApp } = require('firebase-admin/app')
const { credential } = require('firebase-admin')
const { getFirestore } = require('firebase-admin/firestore')
const { getAppCheck } = require('firebase-admin/app-check')
const sgMail = require('@sendgrid/mail')

app.http('send-mail', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        const appCheckToken = request.headers.get('Authorization');

        if (!appCheckToken) {
            context.log('No app check token found');
            return {
                status: 401,
                body: 'forbidden'
            }
        }

        // The private key listed in the Firebase JSON file need to be converted to Bas64 via btoa() first.
        // Because the Env variables set in Configuration Settings on Azure reads it wrong.
        const serviceAccount = {
            "type": "service_account",
            "project_id": "patricio-website",
            "private_key_id": process.env.FIREBASE_ADMIN_SDK_PRIVATE_KEY_ID,
            "private_key": atob(process.env.FIREBASE_ADMIN_SDK_PRIVATE_KEY_BASE64),
            "client_email": process.env.FIREBASE_ADMIN_SDK_CLIENT_EMAIL,
            "client_id": process.env.FIREBASE_ADMIN_SDK_CLIENT_ID,
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://oauth2.googleapis.com/token",
            "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
            "client_x509_cert_url": process.env.FIREBASE_ADMIN_SDK_CLIENT_X509_CERT_URL,
            "universe_domain": "googleapis.com"
        };

        const firebaseConfig = {
            credential: credential.cert(serviceAccount)
        };

        const firebase = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

        try {
            const appCheckClaims = await getAppCheck(firebase).verifyToken(appCheckToken);
            context.log('app check successful', appCheckClaims);
        } catch (err) {
            context.log('app check failed', err);
            return {
                status: 401,
                body: 'forbidden'
            }
        }

        const emailData = await request.json();
        
        const querySnapshot = await getFirestore(firebase)
            .collection('profile').doc(emailData.id).collection('private').get();
        const { emailRecipient, emailSender } = querySnapshot.docs[0].data();
        
        context.log('emailRecipient', emailRecipient);
        context.log('emailSender', emailSender);
        context.log('emailSource', emailData.sender);

        sgMail.setApiKey(process.env.SENDGRID_API_KEY);

        // Send mail
        await sgMail.send({
            from: emailSender,
            to: emailRecipient,
            subject: `${emailData.purpose} - ${emailData.senderType}`,
            text: emailData.message,
            html: `
                <div>
                    <h3 style=\"color: #4EBFD9;\">Message Received from Personal Website</h3>
                    <hr />
                    <p>${ emailData.message }</p>
                    <hr />
                    <p>Email from: ${emailData.sender}</p>
                </div>
            `
        });

        // Send confirmation mail
        await sgMail.send({
            from: emailSender,
            to: emailData.sender,
            subject: 'Thanks for taking an Interest!',
            text: 'This is an automated reply, I have received the message you left me',
            html: `
                <div>
                    <h3 style=\"color: #4EBFD9;\">Thanks For Taking an Interest</h3>
                    <hr />
                    <p>This is an automated reply, I have received the message you left me</p>
                    <p>I will get back to you as soon as I can</p>
                </div>
            `,
        });

        return { body: 'success' };
    }
});

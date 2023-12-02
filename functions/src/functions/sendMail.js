const { app } = require('@azure/functions')
const { initializeApp, getApps, getApp } = require('firebase-admin/app')
const { credential } = require('firebase-admin')
const { getFirestore } = require('firebase-admin/firestore');
const sgMail = require('@sendgrid/mail')

app.http('send-mail', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        const recaptchaToken = request.headers.get('Authorization');
        if(!recaptchaToken) {
            return {
                status: 401,
                body: 'forbidden'
            }
        }

        const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
            method: 'POST',
            body: {
                secret: process.env.RECAPTCHA_SECRET_KEY,
                response: recaptchaToken,
            }
        });

        const { success } = await response.json();
        context.log('recaptcha check successfull', success);
        if(!success) {
            return {
                status: 401,
                body: 'forbidden'
            }
        }

        const result = await request.json();

        const serviceAccount = {
            "type": "service_account",
            "project_id": "patricio-website",
            "private_key_id": process.env.FIREBASE_ADMIN_SDK_PRIVATE_KEY_ID,
            "private_key": process.env.FIREBASE_ADMIN_SDK_PRIVATE_KEY,
            "client_email": process.env.FIREBASE_ADMIN_SDK_CLIENT_EMAIL,
            "client_id": process.env.FIREBASE_ADMIN_SDK_CLIENT_ID,
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://oauth2.googleapis.com/token",
            "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
            "client_x509_cert_url": process.env.FIREBASE_ADMIN_SDK_CLIENT_X509_CERT_URL,
            "universe_domain": "googleapis.com"
        }

        const firebaseConfig = {
            credential: credential.cert(serviceAccount)
        };

        const firebase = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
        
        const querySnapshot = await getFirestore(firebase).collection('profile').doc(id).collection('private').get();
        const { emailRecipient, emailSender } = querySnapshot.docs[0].data();
        
        context.log('emailRecipient', emailRecipient);
        context.log('emailSender', emailSender);
        context.log('emailSource', result.email);

        sgMail.setApiKey(process.env.SENDGRID_API_KEY)

        const confirmMsg = {
            from: emailSender,
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
        }

        // // Send mail
        // await sgMail.send({
        //     from: emailSender,
        //     to: emailRecipient,
        //     subject: `${result.purpose} - ${result.senderType}`,
        //     text: result.content,
        //     html: `
        //         <div>
        //             <h3 style=\"color: #4EBFD9;\">Message Received from Personal Website</h3>
        //             <hr />
        //             <p>${ result.content }</p>
        //             <hr />
        //             <p>Email from: ${result.email}</p>
        //         </div>
        //     `
        // });

        // // Send confirmation mail
        // await sgMail.send({ ...confirmMsg, to: result.email });

        return { body: 'success' };
    }
});

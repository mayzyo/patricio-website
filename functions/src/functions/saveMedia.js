const { app } = require('@azure/functions')
const { initializeApp, getApps, getApp } = require('firebase-admin/app')
const { credential } = require('firebase-admin')
const { getAuth } = require('firebase-admin/auth')
const { BlobServiceClient, StorageSharedKeyCredential } = require('@azure/storage-blob')
const { v4: uuidv4 } = require('uuid')

app.http('save-media', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        const accountName = process.env.BLOB_STORAGE_ACCOUNT_NAME
        const accountKey = process.env.BLOB_STORAGE_ACCOUNT_KEY
        const containerName = process.env.BLOB_STORAGE_CONTAINER_NAME
        if (!accountName) throw Error('Azure Storage accountName not found')
        if (!accountKey) throw Error('Azure Storage accountKey not found')

        const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey)
        const blobServiceClient = new BlobServiceClient(
            `https://${accountName}.blob.core.windows.net`,
            sharedKeyCredential
        )

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
        }

        const idToken = request.headers.get('Authorization');
        if(!idToken) {
            return {
                status: 401
            }
        }

        const firebaseConfig = {
            credential: credential.cert(serviceAccount)
        };

        const firebase = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

        try {
            const decodedToken = await getAuth(firebase).verifyIdToken(idToken)
            const uid = decodedToken.uid
            context.log(`uid: "${uid}"`)
            if(uid != 'VcTV3IFldzWHhGWjU36LXe1c22w2' && uid != process.env.FIREBASE_APPROVED_USER_UID) {
                return {
                    status: 401
                }
            }
        } catch {
            return {
                status: 401
            }
        }

        const blobName = `media-${uuidv4()}`;
      
        // create container client
        const containerClient = blobServiceClient.getContainerClient(containerName);
        // create blob client
        const blobClient = containerClient.getBlockBlobClient(blobName);
        // Upload data to block blob using a readable stream
        const result = await request.formData();
        const buffer = await result.get('file').arrayBuffer();
        await blobClient.uploadData(buffer);

        return { body: blobName };
    }
});

const { app } = require('@azure/functions')
const { initializeApp, getApps, getApp } = require('firebase-admin/app')
const { credential } = require('firebase-admin')
const { getAuth } = require('firebase-admin/auth')
const { BlobServiceClient, StorageSharedKeyCredential } = require('@azure/storage-blob')
const { v4: uuidv4 } = require('uuid')

const accountName = 'patriciowebsite'
const accountKey = 'xbUNhPruQemSBv1ovj/NVsNcFmtEHfmR+3nKnzMBlGQtjHH9/OeY66kQETUh5sIvV4SEGAxTsLwy+AStLEfCOQ=='
const containerName = 'dev'
if (!accountName) throw Error('Azure Storage accountName not found')
if (!accountKey) throw Error('Azure Storage accountKey not found')

const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey)
const blobServiceClient = new BlobServiceClient(
    `https://${accountName}.blob.core.windows.net`,
    sharedKeyCredential
)
const serviceAccount = require("../../patricio-website-firebase-adminsdk-qn7p6-8bc2e6b7f1.json")

app.http('save-media', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);
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

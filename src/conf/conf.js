const conf={
    appwriteUrl:String(import.meta.env.VITE_APPWRITE_URL),
    appwriteprojectId:String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwritedbId:String(import.meta.env.VITE_APPWRITE_DB_ID),
    appwritecollId:String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBucId:String(import.meta.env.VITE_APPWRITE_BUCKET_ID)
};
export default conf;
import conf from "../conf/conf";
import {Client,ID,Storage,Databases,Query, Account} from 'appwrite';
// import appwriteService from './config';
export class Service
{
   client= new Client();
   // account;
   databases;
   bucket;

   constructor(){
     this.client
                .setEndpoint(conf.appwriteUrl)
                .setProject(conf.appwriteprojectId);
      //   this.account= new Account(this.client);  
        this.databases=new Databases(this.client);
        this.bucket=new Storage(this.client);
   }

   async createPost({title,slug,content,featuredImage,status,userId})
   {
       try {
          return await this.databases.createDocument(
            conf.appwritedbId,
            conf.appwritecollId,
            slug,
            {
               title,
               content,
               featuredImage,
               status,
               userId
            } )
       } catch (error) {
          console.log("Appwrite serive :: createPost :: error", error);
          return false;
          
       }
   }

   async updatePost(slug,{title,content,featuredImage,status,userId})
   {
      try {
         return await this.databases.updateDocument(conf.appwritedbId,conf.appwritecollId,slug,
            {title,content,featuredImage,status,userId}
         )
      } catch (error) {
         console.log(error);
         
      }
   }

   async deletePost(slug)
   {
      try {
         await this.databases.deleteDocument(conf.appwritedbId,conf.appwritecollId,slug);
         return true;
      } catch (error) {
         console.log(error);
         return false;
         
      }
   }

   async getPost(slug)
   {
      try {
        return await this.databases.getDocument(conf.appwritedbId,conf.appwritecollId,slug);
      } catch (error) {
         console.log(error);
         return false;
      }
   }

   async getAllPost(queries=[Query.equal('status','active')])
   {
      try {
         return await this.databases.listDocuments(conf.appwritedbId, conf.appwritecollId, queries)
      } catch (error) {
         console.log(error);
      }
   }

   async uploadFile(file){
      try {

         return await this.bucket.createFile(conf.appwriteBucId,ID.unique(),file);
         
      } catch (error) {
         console.log("Appwrite service:: uploadFile:: error",error);
         return false;
      }
   }
   async deleteFile(fileId)
   {
      try {
          await this.bucket.deleteFile(conf.appwriteBucId,fileId)
         return true;
      } catch (error) {
         console.log("Appwrite service:: uploadFile:: error",error);
         return false;
      }
   }
  getFilePreview(fileId)
{
 

   return this.bucket.getFileView(conf.appwriteBucId,fileId);
   
}


}
const service =new Service();
export default service;
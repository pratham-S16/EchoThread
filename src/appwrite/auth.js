import conf from "../conf/conf";
import {Client, Account , ID} from "appwrite";

export class AuthService{
    client=new Client();
    account;

    constructor()
    {
        this.client
                   .setEndpoint(conf.appwriteUrl)
                   .setProject(conf.appwriteprojectId);

        this.account=new Account(this.client);           
    }

    async createAccount({email,password,name})
    {
        try {
            const useraccount=await this.account.create(ID.unique(),email,password,name);
            if(useraccount)
            {
                return this.login({email,password});
            }
            else{
                return useraccount
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email,password})
    {
        try {
           return await this.account.createEmailPasswordSession(email,password);
        } catch (error) {
            throw error;
        }
    }
    async getCurrentUser()
    {
        try {
          return  await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
            
        }
        return null;
    }
    async logout()
    {
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            
        }
       
    }

}
const authService=new AuthService();

export default authService;

import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { client } from "./sanity/lib/client"
import { FETCH_AUTHOR_WITH_ID } from "./sanity/lib/queries"
import { writeClient } from "./sanity/lib/write-client"
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  callbacks:{
    async signIn({user,account,profile}:any){
    
      console.log(profile)
      console.log("WELL IT DOES")
      const existingUser=await client.config({useCdn:false}).fetch(FETCH_AUTHOR_WITH_ID,{id:profile?.id})
      console.log(existingUser)
      if(!existingUser){
        await writeClient.create({
          _type:"author",
          name:user.name,
          image:user.image,
          username:profile?.login,
          id:profile?.id,
          email:user.email,
        })
      }
      return true;
    },
    async jwt({token,profile,account}:any){
      if(account && profile){
        const user=await client.config({useCdn:false}).fetch(FETCH_AUTHOR_WITH_ID,{id:profile?.id});
        if(user){
        token.id=user._id
        }
      }
      return token
    },
    async session({session,token}:any){
      Object.assign(session,{id:token.id})
      return session
    }
  }
})
"use server"
import slugify from "slugify"
import { auth } from "./auth"
import { writeClient } from "./sanity/lib/write-client";
export const createPitch=async (prevState:any,form:FormData,pitch:string)=>{
    const session=await auth();
    if(!session){
        return {
            error:"No user session found, please login again",
            status:"400"
        }
    }
    const slug=slugify(form.get("title") as string,{lower:true,strict:true})
    const startup={
        title:form.get("title"),
        views:0,
        category:form.get("category"),
        image:form.get("link"),
        pitch,
        description:form.get("description"),
        author:{
            _type:"reference",
            _ref:session.id
        },
        slug:{
            _type:"slug",
            current:slug
        }
    }
    try{
        const result=await writeClient.create({_type:"startup",...startup})
        
            return {
            error:"",
            status:"200",
            ...result
        }
    }
    catch(err){
        return {
            error:"Failed to add startup info",
            status:"400"
        }
    }
}


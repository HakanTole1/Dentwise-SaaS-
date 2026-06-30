"use server"; 

import {currentUser} from "@clerk/nextjs/server";
import {prisma } from "../prisma";

export async function syncUser() {

  try {  //Take user from clerk and save to postgre db 
    const user = await currentUser() //CurrentUser coming from clerk 

    if(!user) return  //Not Authenticated

    const existingUser  = await prisma.user.findUnique({
      where:{clerkId: user.id}
    })
    if(existingUser) return  existingUser; //Dont need to save user db again

    const dbUser = await prisma.user.create({
        data:{
          clerkId: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.emailAddresses[0].emailAddress, //clerk stores as array so we get first one 
          phone: user.phoneNumbers[0]?.phoneNumber

        }
    })

    return dbUser
    
  } catch (error) {
    console.log("Error in syncUser server action", error);
    
  }
}
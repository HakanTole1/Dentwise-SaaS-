"use server";

import { prisma } from "../prisma";

//In appointments table we will display: Patient(Full Name), Doctor(Full Name), Date&Time, Reason, Status 

export async function getAppointments() {//serveraction to fecth appointments 
  try {
   const appointments = await prisma.appointment.findMany({
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true
          }
        }, 
        doctor: {
          select: {
            name: true,
            imageUrl: true
          }
        }
      },
      orderBy: { createdAt: "desc" }
    })

    return appointments;
    
  } catch (error) {
    console.log("Error fetching appointments", error);
    throw new Error("Failed to fetch appointments");
    
  }
}
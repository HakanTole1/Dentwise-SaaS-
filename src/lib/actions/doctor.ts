"use server";

import { Gender } from "@prisma/client";
import { prisma } from "../prisma";
import { generateAvatar } from "../utils";
import { revalidatePath } from "next/cache";

export async function getDoctors() {//serveraction to fecth doctors 
  try {

    //call prisma instance,from doctor table //count for appointments every single doctor  , orderby createdAt 
    const doctors = await prisma.doctor.findMany({
      include: {
        _count: { select : {appointments: true},
      }},
      orderBy: { createdAt: "desc"},
    })

    return doctors.map(doctor => ({ //return actual doctors array but get every single doctor and return object 
      ...doctor, 
      appointmentCount: doctor._count.appointments 

    }));
    
  } catch (error) {
    console.log("Error fetching doctors", error);
    throw new Error("Failed to fetch doctors");
    
  }
}


interface CreateDoctorInput {
  name: string;
  email: string;
  phone: string;
  speciality: string;
  gender: Gender;
  isActive: boolean;
}

export async function createDoctor(input: CreateDoctorInput) {
  try {
    if (!input.name || !input.email) throw new Error("Name and email are required");

    const doctor = await prisma.doctor.create({
      data: {
        ...input,
        imageUrl: generateAvatar(input.name, input.gender), //Depending on gender our generateAvatar func. creates image
      },
    });

    revalidatePath("/admin"); // when we add new doctor, refetch the doctors data and gives latest data

    return doctor;
  } catch (error: any) {
    console.error("Error creating doctor:", error);

    // handle unique constraint violation (email already exists)
    if (error?.code === "P2002") {
      throw new Error("A doctor with this email already exists");
    }

    throw new Error("Failed to create doctor");
  }
}


interface UpdateDoctorInput extends Partial<CreateDoctorInput> { //we might have some fields from CreateDoctorInput or not 
  id: string;
}

export async function updateDoctor(input: UpdateDoctorInput) { //serveraction to update doctor
  try {
    // validate required fields
    if (!input.name || !input.email) throw new Error("Name and email are required");

    const currentDoctor = await prisma.doctor.findUnique({
      where: { id: input.id },
      select: { email: true },
    });

    if (!currentDoctor) throw new Error("Doctor not found");

    // if email is changing, check if the new email already exists
    if (input.email !== currentDoctor.email) {
      const existingDoctor = await prisma.doctor.findUnique({
        where: { email: input.email },
      });

      if (existingDoctor) {
        throw new Error("A doctor with this email already exists");
      }
    }

    const doctor = await prisma.doctor.update({
      where: { id: input.id }, //which doctor we are going to update
      // ...input is going to trigger the unique constraint violation for email , in ...input case
      data: {
        name: input.name,
        email: input.email,
        phone: input.phone,
        speciality: input.speciality,
        gender: input.gender,
        isActive: input.isActive,
      },
    });

    return doctor;
  } catch (error) {
    console.error("Error updating doctor:", error);
    throw new Error("Failed to update doctor");
  }
}

export async function getAvailableDoctors() {
  try {
    const doctors = await prisma.doctor.findMany({
      where: { isActive: true },
      include: {
        _count: {
          select: { appointments: true },
        },
      },
      orderBy: { name: "asc" },
    });

    return doctors.map((doctor) => ({
      ...doctor,
      appointmentCount: doctor._count.appointments,
    }));
  } catch (error) {
    console.error("Error fetching available doctors:", error);
    throw new Error("Failed to fetch available doctors");
  }
}

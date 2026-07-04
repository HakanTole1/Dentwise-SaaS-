"use client"; //client hook 

import { getAppointments } from "@/lib/actions/appointments";
import { useQuery } from "@tanstack/react-query";

export function useGetAppointments() { //This hook calls getAppointments() server action 

   const result = useQuery({ //
    queryKey: ["getAppointments"],
    queryFn: getAppointments,// call server action 
   })


   return result; 

}
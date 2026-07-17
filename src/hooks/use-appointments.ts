"use client"; //client hook 

import { bookAppointment, getAppointments, getBookedTimeSlots, getUserAppointments } from "@/lib/actions/appointments";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useGetAppointments() { //This hook calls getAppointments() server action 

   const result = useQuery({ //
    queryKey: ["getAppointments"],
    queryFn: getAppointments,// call server action 
   })


   return result; 

}

export function useBookedTimeSlots(doctorId: string, date: string) {
  return useQuery({
    queryKey: ["getBookedTimeSlots"],
    queryFn: () => getBookedTimeSlots(doctorId!, date), //server action to call, getBookedTimeSlots()
    enabled: !!doctorId && !!date, // only run query if both doctorId and date are provided
  });
}

export function useBookAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: bookAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getUserAppointments"] });
    },
    onError: (error) => console.error("Failed to book appointment:", error),
  });
}

// Get user-specific appointments
export function useUserAppointments() {
  const result = useQuery({
    queryKey: ["getUserAppointments"],
    queryFn: getUserAppointments,
  });

  return result;
}
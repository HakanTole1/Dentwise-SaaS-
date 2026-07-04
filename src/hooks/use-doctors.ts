"use client";

import { createDoctor, getDoctors, updateDoctor } from "@/lib/actions/doctor";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useGetDoctors() { //This hook calls getDoctors() server action 

   const result = useQuery({ //
    queryKey: ["getDoctors"],
    queryFn: getDoctors,// call server action 
   })


   return result; 

}

export function useCreateDoctor() { //Hook 
  const queryClient = useQueryClient();

  const result = useMutation({ 
    mutationFn: createDoctor,
    onSuccess: () => {
      // invalidate related queries to refresh the data
      queryClient.invalidateQueries({ queryKey: ["getDoctors"] }); //run query again to get latest data
    },
    onError: (error) => console.log("Error while creating a doctor"),
  });

  return result;
}

export function useUpdateDoctor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateDoctor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getDoctors"] }); // To get latest data
      queryClient.invalidateQueries({ queryKey: ["getAvailableDoctors"] });
    },
    onError: (error) => console.error("Failed to update doctor:", error),
  });
}
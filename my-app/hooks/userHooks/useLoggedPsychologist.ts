import { useQuery } from "@tanstack/react-query";
import { fetchClient } from "@/lib/api/fetchClient";

async function fetchLoggedPsychologist() {
  const response = await fetchClient("/users/me/psychologist");

  return response.data;
}

export function useLoggedPsychologist() {
  return useQuery({
    queryKey: ["loggedPsychologist"],
    queryFn: () => fetchLoggedPsychologist(),
  });
}

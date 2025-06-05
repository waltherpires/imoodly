import { fetchClient } from "@/lib/api/fetchClient";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

async function fetchMyPatients() {
  const response = await fetchClient(`/link-requests/my-patients`, {
    method: "GET",
  });

  return response.data;
}

export default function useMyPatients() {
  const { data } = useSession();
  const userId = data?.user.id;

  return useQuery({
    queryKey: ["my-patients", userId],
    queryFn: fetchMyPatients,
  });
}

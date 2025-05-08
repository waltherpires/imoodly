import { useQuery } from "@tanstack/react-query";

import { fetchClient } from "./fetchClient";

async function fetchUser() {
  const response = await fetchClient("/auth/me", {
    method: "GET",
  });
  console.log("response: ", response.data);
  return response.data;
}

export function useUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    staleTime: 1000 * 60 * 1,
  });
}

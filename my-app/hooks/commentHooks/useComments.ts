import { useQuery } from "@tanstack/react-query";
import { fetchClient } from "@/lib/api/fetchClient";
import { EntityType } from "./entityType";

export async function fetchComments(entityId: number, entityType: EntityType) {
  const response = await fetchClient(`/comments`, {
    params: { entityId, entityType },
  });
  
  return response.data;
}

export function useComments(entityId: number, entityType: EntityType) {
  return useQuery({
    queryKey: ["comments", entityType, entityId],
    queryFn: () => fetchComments(entityId, entityType),
    enabled: !!entityId && !!entityType,
  });
}

import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../query_keys";
import { getCurrentUser } from "@/lib/appwrite/apis/auth";

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CURRENT_USER],
    queryFn: getCurrentUser,
  });
};

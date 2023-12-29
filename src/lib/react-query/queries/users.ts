import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../query_keys";
import { getCurrentUser, getUserById } from "@/lib/appwrite/apis/auth";

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CURRENT_USER],
    queryFn: getCurrentUser,
  });
};

export const useGetUserById = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_BY_ID],
    queryFn: () => getUserById(id),
    enabled: !!id,
  });
};

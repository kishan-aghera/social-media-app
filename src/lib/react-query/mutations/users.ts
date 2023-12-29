import { updateUser } from "@/lib/appwrite/apis/users";
import { IUpdateUser } from "@/types/users";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../query_keys";

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (user: IUpdateUser) => updateUser(user),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USER_BY_ID, data?.$id],
      });
    },
  });
};

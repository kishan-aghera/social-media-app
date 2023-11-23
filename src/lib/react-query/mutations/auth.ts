import {
  createUserAccount,
  signInAccount,
  signOutAccount,
} from "@/lib/appwrite/apis/auth";
import { INewUser, INewUserSession } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";

export const useCreateUserAccount = () => {
  return useMutation({
    mutationFn: (user: INewUser) => createUserAccount(user),
  });
};

export const useSignInAccount = () => {
  return useMutation({
    mutationFn: (user: INewUserSession) => signInAccount(user),
  });
};

export const useSignOutAccount = () => {
  return useMutation({
    mutationFn: signOutAccount,
  });
};

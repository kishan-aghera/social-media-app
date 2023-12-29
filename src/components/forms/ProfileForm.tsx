import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { FileUploader } from "../shared";
import { ProfileSchema } from "@/lib/schema";

import { Models } from "appwrite";
import { useUserContext } from "@/context/AuthContext";
import { useToast } from "../ui/use-toast";
import { useNavigate } from "react-router-dom";
import { PROFILE_PATH } from "@/constants/routes";
import { getUrl } from "@/lib/utils";
import { useUpdateUserProfile } from "@/lib/react-query/mutations/users";

type ProfileFormProps = {
  profile?: Models.Document;
  action?: "Create" | "Update";
};

const ProfileForm = ({ profile, action }: ProfileFormProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { mutateAsync: updateUser, isPending: isLoadingUpdate } =
    useUpdateUserProfile();

  const { user } = useUserContext();
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      file: [],
      name: profile ? profile?.name : "",
      username: profile ? profile?.username : "",
      email: profile ? profile?.email : "",
      bio: profile ? profile?.bio : "",
    },
  });

  const onSubmit = async (values: z.infer<typeof ProfileSchema>) => {
    const updatedUser = await updateUser({
      ...values,
      userId: user.id,
      imageUrl: user?.imageUrl,
      imageId: user?.imageId,
    });

    if (!updatedUser) {
      toast({
        title: "Please try again!",
      });
    } else {
      toast({
        title: "Profile updated successfully!",
      });
    }

    return navigate(getUrl(PROFILE_PATH, ":id", user.id));
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full max-w-5xl flex-col gap-9"
      >
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label"></FormLabel>
              <FormControl className="">
                <FileUploader
                  fieldChange={field.onChange}
                  mediaUrl={
                    user.imageUrl || "/assets/icons/profile-placeholder.svg"
                  }
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Username</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Name</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Email</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Bio</FormLabel>
              <FormControl>
                <Textarea
                  className="shad-textarea custom-scrollbar"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-end gap-4">
          <Button type="button" className="shad-button_dark_4">
            Cancel
          </Button>
          <Button
            type="submit"
            className="shad-button_primary whitespace-nowrap"
            disabled={isLoadingUpdate}
          >
            {isLoadingUpdate ? "Loading..." : `${action} Profile`}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProfileForm;

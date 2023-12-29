import { IUpdateUser } from "@/types/users";
import { deleteFile, getFilePreview, uploadFile } from "./file_upload";
import { appwriteConfig, databases } from "../config";

export async function updateUser(user: IUpdateUser) {
  const hasFileToUpload = user.file.length > 0;
  try {
    let image = {
      imageUrl: user.imageUrl,
      imageId: user.imageId,
    };

    if (hasFileToUpload) {
      // Upload Image to Storage

      const uploadedFile = await uploadFile(user.file[0]);

      if (!uploadedFile) throw Error;

      // Get File URL
      const fileUrl = getFilePreview(uploadedFile.$id!);

      if (!fileUrl) {
        deleteFile(uploadedFile.$id);
        throw Error;
      }

      image = { ...image, imageUrl: fileUrl, imageId: uploadedFile.$id };
    }
    const updatedUser = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      user.userId,
      {
        name: user.name,
        bio: user.bio,
        imageId: image.imageId,
        imageUrl: image.imageUrl,
        username: user.username,
      },
    );

    if (!updatedUser) {
      await deleteFile(image.imageId);
      throw Error;
    }

    return updatedUser;
  } catch (error) {
    console.log(error);
  }
}

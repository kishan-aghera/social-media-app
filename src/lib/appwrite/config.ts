import { Client, Account, Databases, Storage, Avatars } from "appwrite";
import {
  APPWRITE_DATABASE_ID,
  APPWRITE_POSTS_COLLECTION_ID,
  APPWRITE_PROJECT_ID,
  APPWRITE_SAVES_COLLECTION_ID,
  APPWRITE_STORAGE_ID,
  APPWRITE_URL,
  APPWRITE_USERS_COLLECTION_ID,
} from "../../constants";

export const appwriteConfig = {
  projectId: APPWRITE_PROJECT_ID,
  url: APPWRITE_URL,
  databaseId: APPWRITE_DATABASE_ID,
  storageId: APPWRITE_STORAGE_ID,
  userCollectionId: APPWRITE_USERS_COLLECTION_ID,
  postCollectionId: APPWRITE_POSTS_COLLECTION_ID,
  saveCollectionId: APPWRITE_SAVES_COLLECTION_ID,
};

export const client = new Client();

client.setEndpoint(appwriteConfig.url);
client.setProject(appwriteConfig.projectId);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);

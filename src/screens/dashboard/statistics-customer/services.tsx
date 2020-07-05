import { getService, postService } from "services/config";

export const getAllUsers = async () => {
  try {
    const response = await getService("account", null, false, false);
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (id: number) => {
  try {
    const response = await postService("account/delete", { id }, false, false);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getAllAddresses = async () => {
  try {
    const response = await getService("address", null, false, false);
    return response;
  } catch (error) {
    throw error;
  }
};

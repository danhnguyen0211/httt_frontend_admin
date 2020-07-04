import { getService } from "services/config";

export const getAllItems = async () => {
  try {
    const response = await getService("item", null, false, false);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getAllCategories = async () => {
  try {
    const response = await getService("category", null, false, false);
    return response;
  } catch (error) {
    throw error;
  }
};

import { getService } from "services/config";

export const getItemById = async id => {
  try {
    const response = await getService(`item/${id}`, null, false, false);
    return response;
  } catch (error) {
    throw error;
  }
};

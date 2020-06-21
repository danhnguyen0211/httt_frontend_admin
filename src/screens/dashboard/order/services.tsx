import { getService, postService } from "services/config";

export const getAllOrder = async () => {
  try {
    const response = await getService("order", null, false, false);
    return response;
  } catch (error) {
    throw error;
  }
};

export const addNewOrder = async (
  code: string,
  paymentStatus: string,
  totalCost: number,
  paymentId: number,
  shippingId: number,
  accountId: number,
  addressId: number
) => {
  try {
    const response = await postService(
      "order/add",
      { code, paymentStatus, totalCost, paymentId, shippingId, accountId, addressId },
      false,
      false
    );
    return response;
  } catch (error) {
    throw error;
  }
};

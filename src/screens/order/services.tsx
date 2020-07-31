import { getService, postService } from "services/config";

export const getAllOrder = async () => {
  try {
    const response = await getService("order", null, false, false);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getOrderByAccountId = async id => {
  try {
    const response = await getService(`order/account/${id}`, null, false, false);
    console.log(response, "r");
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

export const addNewCartItem = async itemCart => {
  try {
    console.log(itemCart, "obj");
    const response = await postService("cartItem/add", { data: itemCart }, false, false);
    return response;
  } catch (error) {
    throw error;
  }
};
